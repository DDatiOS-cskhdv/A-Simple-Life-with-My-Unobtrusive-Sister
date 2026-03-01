const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * @typedef {Object} FileHasher
 * @property {(targetPath: string, outputFileName?: string) => Promise<void>} generate - 生成文件哈希清單
 * @property {(targetPath: string, manifestPath: string) => Promise<Object>} compare - 比較並生成差異報告
 * @property {Set<string>} excludes - 排除列表
 */

/**
 * 創建一個文件哈希處理器工廠
 * @param {object} [options] - 配置選項
 * @param {string[]} [options.initialExcludes=['node_modules', '.git', 'save']] - 初始排除列表，可以是文件名或文件夾名
 * @returns {FileHasher} 返回一個包含 generate 和 compare 方法的對象
 */
function createFileHasher(options = {}) {
    const { initialExcludes = ['.git', '.gitignore', 'save', 'node_modules'], concurrencyLimit = 100 } = options;
    const excludes = new Set(initialExcludes);

    /**
     * 使用流式處理計算文件的 SHA256 哈希值
     * @param {string} filePath - 文件的完整路徑
     * @returns {Promise<string>} 文件的哈希值
     */
    function getFileHash(filePath) {
        return new Promise((resolve, reject) => {
            const hash = crypto.createHash('sha256');
            const stream = fs.createReadStream(filePath);
            stream.on('data', (chunk) => hash.update(chunk));
            stream.on('end', () => resolve(hash.digest('hex')));
            stream.on('error', (err) => {
                reject(new Error(`Error hashing file ${filePath}: ${err.message}`));
            });
        });
    }

    /**
     * 遞歸遍歷目錄，並行生成扁平化的文件哈希 Map，帶有並發限制
     * @param {string} dirPath - 要處理的文件夾的絕對路徑
     * @param {string} rootPath - 掃描的根路徑，用於計算相對路徑
     * @param {Map<string, string>} fileHashMap - 用於存儲結果的 Map
     */
    async function generateFlatHashMap(dirPath, rootPath, fileHashMap) {
        let dirents;
        try {
            dirents = await fs.promises.readdir(dirPath, { withFileTypes: true });
        } catch (err) {
            console.error(`無法讀取目錄 ${dirPath}:`, err);
            return;
        }

        const queue = [...dirents];

        // 創建一組並發的工作 "worker"
        const workers = Array(concurrencyLimit).fill(null).map(async () => {
            while (queue.length > 0) {
                // 從隊列頭部原子性地取出一個任務
                const dirent = queue.shift();
                if (!dirent) continue;

                const fullPath = path.join(dirPath, dirent.name);

                if (excludes.has(dirent.name)) {
                    continue;
                }

                if (dirent.isDirectory()) {
                    await generateFlatHashMap(fullPath, rootPath, fileHashMap);
                } else if (dirent.isFile()) {
                    try {
                        const relativePath = path.relative(rootPath, fullPath).replace(/\\/g, '/');
                        const hash = await getFileHash(fullPath);
                        fileHashMap.set(relativePath, hash);
                    } catch (err) {
                        // 即使單個文件哈希失敗，也只打印錯誤，不讓整個進程崩潰
                        console.error(err);
                    }
                }
            }
        });

        await Promise.all(workers);
    }

    return {
        /**
         * 生成文件夾的哈希清單 (manifest) JSON 文件
         * @param {string} targetPath - 要生成哈希的目標文件夾路徑
         * @param {string} [outputFileName] - 輸出的文件名
         */
        async generate(targetPath, outputFileName = 'manifest.json') {
            console.log(`[Generator] 正在為 "${targetPath}" 生成哈希清單...`);
            try {
                const absoluteTargetPath = path.resolve(targetPath);
                const fileHashMap = new Map();

                await generateFlatHashMap(absoluteTargetPath, absoluteTargetPath, fileHashMap);

                // 將 Map 轉換為可序列化的對象
                const manifest = {
                    createdAt: new Date().toISOString(),
                    root: targetPath,
                    files: Object.fromEntries(fileHashMap)
                };

                // === 新增：总哈希 ===
                (function(files){
                  const keys = Object.keys(files).sort();
                  let s = '';
                  for (let i = 0; i < keys.length; i++) {
                    const k = keys[i];
                    s += k + ':' + files[k] + '\n';
                  }
                  manifest.rootHash = crypto.createHash('sha256').update(s).digest('hex');
                })(manifest.files);
                
                const outputPath = path.join(process.cwd(), outputFileName);
                await fs.promises.writeFile(outputPath, JSON.stringify(manifest, null, 2));
                console.log(`[Generator] 哈希清單已成功生成: ${outputPath}`);
            } catch (error) {
                console.error('[Generator] 生成哈希清單時出錯:', error);
            }
        },

        /**
         * 比較文件夾與哈希清單，並生成差異報告
         * @param {string} targetPath - 要比較的文件夾路徑
         * @param {string} manifestPath - 用於比較的哈希清單 JSON 文件路徑
         * @returns {Promise<Object>} 差異對象
         */
        async compare(targetPath, manifestPath) {
            console.log(`[Comparator] 正在將 "${targetPath}" 與 "${manifestPath}" 進行比較...`);
            const differences = {
                added: [],
                deleted: [],
                modified: [],
            };

            try {
                const manifestContent = await fs.promises.readFile(manifestPath, 'utf8');
                const baselineManifest = JSON.parse(manifestContent);
                const baselineFiles = new Map(Object.entries(baselineManifest.files));

                const absoluteTargetPath = path.resolve(targetPath);
                const currentFiles = new Map();
                await generateFlatHashMap(absoluteTargetPath, absoluteTargetPath, currentFiles);

                for (const [relativePath, currentHash] of currentFiles.entries()) {
                    if (baselineFiles.has(relativePath)) {
                        if (baselineFiles.get(relativePath) !== currentHash) {
                            differences.modified.push(relativePath);
                        }
                        baselineFiles.delete(relativePath);
                    } else {
                        differences.added.push(relativePath);
                    }
                }

                differences.deleted = [...baselineFiles.keys()];

                const totalDiffs = differences.added.length + differences.deleted.length + differences.modified.length;
                if (totalDiffs > 0) {
                    console.log(`[Comparator] 比較完成，發現 ${totalDiffs} 處差異。`);
                } else {
                    console.log('[Comparator] 比較完成，未發現任何差異。');
                }

                return differences;

            } catch (error) {
                console.error('[Comparator] 比較哈希時出錯:', error);
                return differences;
            }
        }
    };
};

// --- 使用示例 ---
async function main() {
    // 創建 hasher 實例
    const hasher = createFileHasher({
        initialExcludes: ['manifest.json', 'differences.json']
    });

    // 創建後動態添加排除項
    // hasher.excludes.add('other_folder');

    const targetDirectory = path.resolve(__dirname); // 當前執行路徑
    const targetFiles = targetDirectory; // 整個文件夾
    // const targetFiles = path.join(targetDirectory, 'js'); // 單獨 js 目錄
    const manifestFile = path.join(targetDirectory, 'manifest.json');

    await hasher.generate(targetFiles); // 生成文件夾的哈希清單

    const diffs = await hasher.compare(targetFiles, manifestFile); // 比較文件夾與哈希清單
    if (diffs.added.length > 0 || diffs.deleted.length > 0 || diffs.modified.length > 0) {
        const diffOutputPath = path.join(process.cwd(), 'differences.json');
        await fs.promises.writeFile(diffOutputPath, JSON.stringify(diffs, null, 2));
        console.log(`差異報告已生成: ${diffOutputPath}`);
    }
}

// 直接運行此文件
if (require.main === module) {
    main().catch(console.error);
}

// 導出工廠函數，以便在其他模塊中使用
module.exports = createFileHasher;