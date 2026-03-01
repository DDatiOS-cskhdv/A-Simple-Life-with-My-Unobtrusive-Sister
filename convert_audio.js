const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const os = require('os');

const FFMPEG = 'C:\\Users\\Admin\\AppData\\Local\\Microsoft\\WinGet\\Links\\ffmpeg.exe';

const audioDir = path.join(__dirname, 'www', 'audio');
const KEY_HEX = 'd41d8cd98f00b204e9800998ecf8427e';
const keyBytes = Buffer.from(KEY_HEX, 'hex'); // 16 bytes
// Fake header: "RPGMV" + 11 zero bytes = 16 bytes
const FAKE_HEADER = Buffer.from('5250474d560000000000000000000000', 'hex');

function decrypt(encBuf) {
    const out = Buffer.allocUnsafe(encBuf.length - 16);
    for (let i = 0; i < 16; i++) out[i] = encBuf[16 + i] ^ keyBytes[i];
    encBuf.copy(out, 16, 32);
    return out;
}

function encrypt(dataBuf) {
    const out = Buffer.allocUnsafe(16 + dataBuf.length);
    FAKE_HEADER.copy(out, 0);
    for (let i = 0; i < 16; i++) out[16 + i] = dataBuf[i] ^ keyBytes[i];
    dataBuf.copy(out, 32, 16);
    return out;
}

function walk(dir) {
    const results = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) results.push(...walk(full));
        else if (entry.name.endsWith('.rpgmvo')) results.push(full);
    }
    return results;
}

const files = walk(audioDir);
console.log(`Found ${files.length} .rpgmvo files. Starting conversion...`);

let converted = 0, skipped = 0, failed = 0;

for (const file of files) {
    const tmpOgg = path.join(os.tmpdir(), `rpgmv_${process.pid}_${converted}.ogg`);
    const tmpM4a = path.join(os.tmpdir(), `rpgmv_${process.pid}_${converted}.m4a`);

    try {
        const encBuf = fs.readFileSync(file);
        if (encBuf.length < 32) { skipped++; continue; }

        // Check if already M4A inside (ftyp magic at offset 4 after decryption)
        const firstBytes = Buffer.allocUnsafe(16);
        for (let i = 0; i < 16; i++) firstBytes[i] = encBuf[16 + i] ^ keyBytes[i];
        const isAlreadyM4a = firstBytes.slice(4, 8).toString('ascii') === 'ftyp';
        if (isAlreadyM4a) { skipped++; continue; }

        const oggBuf = decrypt(encBuf);
        fs.writeFileSync(tmpOgg, oggBuf);

        const r = spawnSync(FFMPEG, [
            '-y', '-i', tmpOgg,
            '-c:a', 'aac', '-b:a', '128k', '-vn',
            tmpM4a
        ], { stdio: 'pipe' });

        if (r.status === 0 && fs.existsSync(tmpM4a)) {
            const m4aBuf = fs.readFileSync(tmpM4a);
            fs.writeFileSync(file, encrypt(m4aBuf));
            converted++;
        } else {
            failed++;
            console.error(`FAIL [${failed}]: ${path.relative(audioDir, file)}`);
        }
    } catch (e) {
        failed++;
        console.error(`ERR: ${path.relative(audioDir, file)}: ${e.message}`);
    } finally {
        try { fs.unlinkSync(tmpOgg); } catch {}
        try { fs.unlinkSync(tmpM4a); } catch {}
    }

    const done = converted + skipped + failed;
    if (done % 50 === 0) process.stdout.write(`\r${done}/${files.length} (ok:${converted} skip:${skipped} fail:${failed})`);
}

console.log(`\n\nDone! Converted: ${converted} | Already M4A (skipped): ${skipped} | Failed: ${failed}`);
