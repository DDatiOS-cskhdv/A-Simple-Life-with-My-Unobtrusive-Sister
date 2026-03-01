//=============================================================================
// rpg_managers.js v1.6.2
//=============================================================================

//=============================================================================

var $dataActors = null;
var $dataClasses = null;
var $dataSkills = null;
var $dataItems = null;
var $dataWeapons = null;
var $dataArmors = null;
var $dataEnemies = null;
var $dataTroops = null;
var $dataStates = null;
var $dataAnimations = null;
var $dataTilesets = null;
var $dataCommonEvents = null;
var $dataSystem = null;
var $dataMapInfos = null;
var $dataMap = null;
var $gameTemp = null;
var $gameSystem = null;
var $gameScreen = null;
var $gameTimer = null;
var $gameMessage = null;
var $gameSwitches = null;
var $gameVariables = null;
var $gameSelfSwitches = null;
var $gameActors = null;
var $gameParty = null;
var $gameTroop = null;
var $gameMap = null;
var $gamePlayer = null;
var $testEvent = null;

// DataManager
//
// The static class that manages the database and game objects.
class DataManager {
    static _globalId = 'RPGMV';
    static _lastAccessedId = 1;
    static _errorUrl = null;

    static _databaseFiles = [
        { name: '$dataActors', src: 'Actors.json' },
        { name: '$dataClasses', src: 'Classes.json' },
        { name: '$dataSkills', src: 'Skills.json' },
        { name: '$dataItems', src: 'Items.json' },
        { name: '$dataWeapons', src: 'Weapons.json' },
        { name: '$dataArmors', src: 'Armors.json' },
        { name: '$dataEnemies', src: 'Enemies.json' },
        { name: '$dataTroops', src: 'Troops.json' },
        { name: '$dataStates', src: 'States.json' },
        { name: '$dataAnimations', src: 'Animations.json' },
        { name: '$dataTilesets', src: 'Tilesets.json' },
        { name: '$dataCommonEvents', src: 'CommonEvents.json' },
        { name: '$dataSystem', src: 'System.json' },
        { name: '$dataMapInfos', src: 'MapInfos.json' }
    ];

    static loadDatabase() {
        const test = this.isBattleTest() || this.isEventTest();
        const prefix = test ? 'Test_' : '';
        for (const file of this._databaseFiles) {
            this.loadDataFile(file.name, prefix + file.src);
        }
        if (this.isEventTest()) {
            this.loadDataFile('$testEvent', prefix + 'Event.json');
        }
    };

    static loadDataFile(name, src) {
        const xhr = new XMLHttpRequest();
        const url = 'data/' + src;
        xhr.open('GET', url);
        xhr.overrideMimeType('application/json');
        xhr.onload = function () {
            if (xhr.status < 400) {
                window[name] = JSON.parse(xhr.responseText);
                DataManager.onLoad(window[name]);
            }
        };
        xhr.onerror = this._mapLoader || function () {
            DataManager._errorUrl = DataManager._errorUrl || url;
        };
        window[name] = null;
        xhr.send();
    };

    static isDatabaseLoaded() {
        this.checkError();
        for (const file of this._databaseFiles) {
            if (!window[file.name]) {
                return false;
            }
        }
        return true;
    };

    static loadMapData(mapId) {
        if (mapId > 0) {
            const filename = 'Map%1.json'.format(mapId.padZero(3));
            this._mapLoader = ResourceHandler.createLoader('data/' + filename, this.loadDataFile.bind(this, '$dataMap', filename));
            this.loadDataFile('$dataMap', filename);
        } else {
            this.makeEmptyMap();
        }
    };

    static makeEmptyMap() {
        $dataMap = {};
        $dataMap.data = [];
        $dataMap.events = [];
        $dataMap.width = 100;
        $dataMap.height = 100;
        $dataMap.scrollType = 3;
    };

    static isMapLoaded() {
        this.checkError();
        return !!$dataMap;
    };

    static onLoad(object) {
        let array;
        if (object === $dataMap) {
            this.extractMetadata(object);
            array = object.events;
        } else {
            array = object;
        }
        if (Array.isArray(array)) {
            for (const data of array) {
                if (data && data.note !== undefined) {
                    this.extractMetadata(data);
                }
            }
        }
        if (object === $dataSystem) {
            Decrypter.hasEncryptedImages = !!object.hasEncryptedImages;
            Decrypter.hasEncryptedAudio = !!object.hasEncryptedAudio;
            Scene_Boot.loadSystemImages();
        }
    };

    static extractMetadata(data) {
        const re = /<([^<>:]+)(:?)([^>]*)>/g;
        data.meta = {};
        for (; ;) {
            const match = re.exec(data.note);
            if (match) {
                if (match[2] === ':') {
                    data.meta[match[1]] = match[3];
                } else {
                    data.meta[match[1]] = true;
                }
            } else {
                break;
            }
        }
    };

    static checkError() {
        if (DataManager._errorUrl) {
            throw new Error('Failed to load: ' + DataManager._errorUrl);
        }
    };

    static isBattleTest() {
        return Utils.isOptionValid('btest');
    };

    static isEventTest() {
        return Utils.isOptionValid('etest');
    };

    static isSkill(item) {
        return item && $dataSkills.contains(item);
    };

    static isItem(item) {
        return item && $dataItems.contains(item);
    };

    static isWeapon(item) {
        return item && $dataWeapons.contains(item);
    };

    static isArmor(item) {
        return item && $dataArmors.contains(item);
    };

    static createGameObjects() {
        $gameTemp = new Game_Temp();
        $gameSystem = new Game_System();
        $gameScreen = new Game_Screen();
        $gameTimer = new Game_Timer();
        $gameMessage = new Game_Message();
        $gameSwitches = new Game_Switches();
        $gameVariables = new Game_Variables();
        $gameSelfSwitches = new Game_SelfSwitches();
        $gameActors = new Game_Actors();
        $gameParty = new Game_Party();
        $gameTroop = new Game_Troop();
        $gameMap = new Game_Map();
        $gamePlayer = new Game_Player();
    };

    static setupNewGame() {
        this.createGameObjects();
        this.selectSavefileForNewGame();
        $gameParty.setupStartingMembers();
        $gamePlayer.reserveTransfer($dataSystem.startMapId,
            $dataSystem.startX, $dataSystem.startY);
        Graphics.frameCount = 0;
    };

    static setupBattleTest() {
        this.createGameObjects();
        $gameParty.setupBattleTest();
        BattleManager.setup($dataSystem.testTroopId, true, false);
        BattleManager.setBattleTest(true);
        BattleManager.playBattleBgm();
    };

    static setupEventTest() {
        this.createGameObjects();
        this.selectSavefileForNewGame();
        $gameParty.setupStartingMembers();
        $gamePlayer.reserveTransfer(-1, 8, 6);
        $gamePlayer.setTransparent(false);
    };

    static loadGlobalInfo() {
        let json;
        try {
            json = StorageManager.load(0);
        } catch (e) {
            console.error(e);
            return [];
        }
        if (json) {
            const globalInfo = JSON.parse(json);
            for (let i = 1; i <= this.maxSavefiles(); i++) {
                if (!StorageManager.exists(i)) {
                    delete globalInfo[i];
                }
            }
            return globalInfo;
        } else {
            return [];
        }
    };

    static saveGlobalInfo(info) {
        StorageManager.save(0, JSON.stringify(info));
    };

    static isThisGameFile(savefileId) {
        const globalInfo = this.loadGlobalInfo();
        if (globalInfo && globalInfo[savefileId]) {
            if (StorageManager.isLocalMode()) {
                return true;
            } else {
                return true;
            }
        } else {
            return false;
        }
    };

    static isAnySavefileExists() {
        const globalInfo = this.loadGlobalInfo();
        if (globalInfo) {
            for (let i = 1; i < globalInfo.length; i++) {
                if (this.isThisGameFile(i)) {
                    return true;
                }
            }
        }
        return false;
    };

    static latestSavefileId() {
        const globalInfo = this.loadGlobalInfo();
        let savefileId = 1;
        let timestamp = 0;
        if (globalInfo) {
            for (let i = 1; i < globalInfo.length; i++) {
                if (this.isThisGameFile(i) && globalInfo[i].timestamp > timestamp) {
                    timestamp = globalInfo[i].timestamp;
                    savefileId = i;
                }
            }
        }
        return savefileId;
    };

    static loadAllSavefileImages() {
        const globalInfo = this.loadGlobalInfo();
        if (globalInfo) {
            for (let i = 1; i < globalInfo.length; i++) {
                if (this.isThisGameFile(i)) {
                    const info = globalInfo[i];
                    this.loadSavefileImages(info);
                }
            }
        }
    };

    static loadSavefileImages(info) {
        if (info.characters) {
            for (let i = 0; i < info.characters.length; i++) {
                ImageManager.reserveCharacter(info.characters[i][0]);
            }
        }
        if (info.faces) {
            for (let j = 0; j < info.faces.length; j++) {
                ImageManager.reserveFace(info.faces[j][0]);
            }
        }
    };

    static maxSavefiles() {
        return 20;
    };

    static saveGame(savefileId) {
        try {
            StorageManager.backup(savefileId);
            return this.saveGameWithoutRescue(savefileId);
        } catch (e) {
            console.error(e);
            try {
                StorageManager.remove(savefileId);
                StorageManager.restoreBackup(savefileId);
            } catch (e2) {
            }
            return false;
        }
    };

    static loadGame(savefileId) {
        try {
            return this.loadGameWithoutRescue(savefileId);
        } catch (e) {
            console.error(e);
            return false;
        }
    };

    static loadSavefileInfo(savefileId) {
        const globalInfo = this.loadGlobalInfo();
        return (globalInfo && globalInfo[savefileId]) ? globalInfo[savefileId] : null;
    };

    static lastAccessedSavefileId() {
        return this._lastAccessedId;
    };

    static saveGameWithoutRescue(savefileId) {
        const json = JsonEx.stringify(this.makeSaveContents());
        if (json.length >= 200000) {
            console.warn('Save data too big!');
        }
        StorageManager.save(savefileId, json);
        this._lastAccessedId = savefileId;
        const globalInfo = this.loadGlobalInfo() || [];
        globalInfo[savefileId] = this.makeSavefileInfo();
        this.saveGlobalInfo(globalInfo);
        return true;
    };

    static loadGameWithoutRescue(savefileId) {
        if (this.isThisGameFile(savefileId)) {
            const json = StorageManager.load(savefileId);
            this.createGameObjects();
            this.extractSaveContents(JsonEx.parse(json));
            this._lastAccessedId = savefileId;
            return true;
        } else {
            return false;
        }
    };

    static selectSavefileForNewGame() {
        const globalInfo = this.loadGlobalInfo();
        this._lastAccessedId = 1;
        if (globalInfo) {
            const numSavefiles = Math.max(0, globalInfo.length - 1);
            if (numSavefiles < this.maxSavefiles()) {
                this._lastAccessedId = numSavefiles + 1;
            } else {
                let timestamp = Number.MAX_VALUE;
                for (let i = 1; i < globalInfo.length; i++) {
                    if (!globalInfo[i]) {
                        this._lastAccessedId = i;
                        break;
                    }
                    if (globalInfo[i].timestamp < timestamp) {
                        timestamp = globalInfo[i].timestamp;
                        this._lastAccessedId = i;
                    }
                }
            }
        }
    };

    static makeSavefileInfo() {
        const info = {};
        info.globalId = this._globalId;
        info.title = $dataSystem.gameTitle;
        info.characters = $gameParty.charactersForSavefile();
        info.faces = $gameParty.facesForSavefile();
        info.playtime = $gameSystem.playtimeText();
        info.timestamp = Date.now();
        return info;
    };

    static makeSaveContents() {
        // A save data does not contain $gameTemp, $gameMessage, and $gameTroop.
        const contents = {};
        contents.system = $gameSystem;
        contents.screen = $gameScreen;
        contents.timer = $gameTimer;
        contents.switches = $gameSwitches;
        contents.variables = $gameVariables;
        contents.selfSwitches = $gameSelfSwitches;
        contents.actors = $gameActors;
        contents.party = $gameParty;
        contents.map = $gameMap;
        contents.player = $gamePlayer;
        return contents;
    };

    static extractSaveContents(contents) {
        $gameSystem = contents.system;
        $gameScreen = contents.screen;
        $gameTimer = contents.timer;
        $gameSwitches = contents.switches;
        $gameVariables = contents.variables;
        $gameSelfSwitches = contents.selfSwitches;
        $gameActors = contents.actors;
        $gameParty = contents.party;
        $gameMap = contents.map;
        $gamePlayer = contents.player;
    };
};

//-----------------------------------------------------------------------------

// ConfigManager
//
// The static class that manages the configuration data.
class ConfigManager {
    static alwaysDash = false;
    static commandRemember = false;

    static get bgmVolume() {
        return AudioManager._bgmVolume;
    };
    static set bgmVolume(value) {
        AudioManager.bgmVolume = value;
    };

    static get bgsVolume() {
        return AudioManager.bgsVolume;
    };
    static set bgsVolume(value) {
        AudioManager.bgsVolume = value;
    };

    static get meVolume() {
        return AudioManager.meVolume;
    };
    static set meVolume(value) {
        AudioManager.meVolume = value;
    };

    static get seVolume() {
        return AudioManager.seVolume;
    };
    static set seVolume(value) {
        AudioManager.seVolume = value;
    };

    static load() {
        let json;
        let config = {};
        try {
            json = StorageManager.load(-1);
        } catch (e) {
            console.error(e);
        }
        if (json) {
            config = JSON.parse(json);
        }
        this.applyData(config);
    };

    static save() {
        StorageManager.save(-1, JSON.stringify(this.makeData()));
    };

    static makeData() {
        const config = {};
        config.alwaysDash = this.alwaysDash;
        config.commandRemember = this.commandRemember;
        config.bgmVolume = this.bgmVolume;
        config.bgsVolume = this.bgsVolume;
        config.meVolume = this.meVolume;
        config.seVolume = this.seVolume;
        return config;
    };

    static applyData(config) {
        this.alwaysDash = this.readFlag(config, 'alwaysDash');
        this.commandRemember = this.readFlag(config, 'commandRemember');
        this.bgmVolume = this.readVolume(config, 'bgmVolume');
        this.bgsVolume = this.readVolume(config, 'bgsVolume');
        this.meVolume = this.readVolume(config, 'meVolume');
        this.seVolume = this.readVolume(config, 'seVolume');
    };

    static readFlag(config, name) {
        return !!config[name];
    };

    static readVolume(config, name) {
        const value = config[name];
        if (value !== undefined) {
            return Number(value).clamp(0, 100);
        } else {
            return 100;
        }
    };
};

//-----------------------------------------------------------------------------

// StorageManager
//
// The static class that manages storage for saving game data.
class StorageManager {
    static save(savefileId, json) {
        if (this.isLocalMode()) {
            this.saveToLocalFile(savefileId, json);
        } else {
            this.saveToWebStorage(savefileId, json);
        }
    };

    static load(savefileId) {
        if (this.isLocalMode()) {
            return this.loadFromLocalFile(savefileId);
        } else {
            return this.loadFromWebStorage(savefileId);
        }
    };

    static exists(savefileId) {
        if (this.isLocalMode()) {
            return this.localFileExists(savefileId);
        } else {
            return this.webStorageExists(savefileId);
        }
    };

    static remove(savefileId) {
        if (this.isLocalMode()) {
            this.removeLocalFile(savefileId);
        } else {
            this.removeWebStorage(savefileId);
        }
    };

    static backup(savefileId) {
        if (this.exists(savefileId)) {
            if (this.isLocalMode()) {
                const data = this.loadFromLocalFile(savefileId);
                const compressed = LZString.compressToBase64(data);
                const fs = require('fs');
                const dirPath = this.localFileDirectoryPath();
                const filePath = this.localFilePath(savefileId) + ".bak";
                if (!fs.existsSync(dirPath)) {
                    fs.mkdirSync(dirPath);
                }
                fs.writeFileSync(filePath, compressed);
            } else {
                const data = this.loadFromWebStorage(savefileId);
                const compressed = LZString.compressToBase64(data);
                const key = this.webStorageKey(savefileId) + "bak";
                localStorage.setItem(key, compressed);
            }
        }
    };

    static backupExists(savefileId) {
        if (this.isLocalMode()) {
            return this.localFileBackupExists(savefileId);
        } else {
            return this.webStorageBackupExists(savefileId);
        }
    };

    static cleanBackup(savefileId) {
        if (this.backupExists(savefileId)) {
            if (this.isLocalMode()) {
                const fs = require('fs');
                const dirPath = this.localFileDirectoryPath();
                const filePath = this.localFilePath(savefileId);
                fs.unlinkSync(filePath + ".bak");
            } else {
                const key = this.webStorageKey(savefileId);
                localStorage.removeItem(key + "bak");
            }
        }
    };

    static restoreBackup(savefileId) {
        if (this.backupExists(savefileId)) {
            if (this.isLocalMode()) {
                const data = this.loadFromLocalBackupFile(savefileId);
                const compressed = LZString.compressToBase64(data);
                const fs = require('fs');
                const dirPath = this.localFileDirectoryPath();
                const filePath = this.localFilePath(savefileId);
                if (!fs.existsSync(dirPath)) {
                    fs.mkdirSync(dirPath);
                }
                fs.writeFileSync(filePath, compressed);
                fs.unlinkSync(filePath + ".bak");
            } else {
                const data = this.loadFromWebStorageBackup(savefileId);
                const compressed = LZString.compressToBase64(data);
                const key = this.webStorageKey(savefileId);
                localStorage.setItem(key, compressed);
                localStorage.removeItem(key + "bak");
            }
        }
    };

    static isLocalMode() {
        return Utils.isNwjs();
    };

    static saveToLocalFile(savefileId, json) {
        const data = LZString.compressToBase64(json);
        const fs = require('fs');
        const dirPath = this.localFileDirectoryPath();
        const filePath = this.localFilePath(savefileId);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }
        fs.writeFileSync(filePath, data);
    };

    static loadFromLocalFile(savefileId) {
        let data = null;
        const fs = require('fs');
        const filePath = this.localFilePath(savefileId);
        if (fs.existsSync(filePath)) {
            data = fs.readFileSync(filePath, { encoding: 'utf8' });
        }
        return LZString.decompressFromBase64(data);
    };

    static loadFromLocalBackupFile(savefileId) {
        let data = null;
        const fs = require('fs');
        const filePath = this.localFilePath(savefileId) + ".bak";
        if (fs.existsSync(filePath)) {
            data = fs.readFileSync(filePath, { encoding: 'utf8' });
        }
        return LZString.decompressFromBase64(data);
    };

    static localFileBackupExists(savefileId) {
        const fs = require('fs');
        return fs.existsSync(this.localFilePath(savefileId) + ".bak");
    };

    static localFileExists(savefileId) {
        const fs = require('fs');
        return fs.existsSync(this.localFilePath(savefileId));
    };

    static removeLocalFile(savefileId) {
        const fs = require('fs');
        const filePath = this.localFilePath(savefileId);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    };

    static saveToWebStorage(savefileId, json) {
        const key = this.webStorageKey(savefileId);
        const data = LZString.compressToBase64(json);
        localStorage.setItem(key, data);
    };

    static loadFromWebStorage(savefileId) {
        const key = this.webStorageKey(savefileId);
        const data = localStorage.getItem(key);
        return LZString.decompressFromBase64(data);
    };

    static loadFromWebStorageBackup(savefileId) {
        const key = this.webStorageKey(savefileId) + "bak";
        const data = localStorage.getItem(key);
        return LZString.decompressFromBase64(data);
    };

    static webStorageBackupExists(savefileId) {
        const key = this.webStorageKey(savefileId) + "bak";
        return !!localStorage.getItem(key);
    };

    static webStorageExists(savefileId) {
        const key = this.webStorageKey(savefileId);
        return !!localStorage.getItem(key);
    };

    static removeWebStorage(savefileId) {
        const key = this.webStorageKey(savefileId);
        localStorage.removeItem(key);
    };

    static localFileDirectoryPath() {
        const path = require('path');
        const base = path.dirname(process.mainModule.filename);
        return path.join(base, 'save/');
    };

    static localFilePath(savefileId) {
        let name;
        if (savefileId < 0) {
            name = 'config.rpgsave';
        } else if (savefileId === 0) {
            name = 'global.rpgsave';
        } else {
            name = 'file%1.rpgsave'.format(savefileId);
        }
        return this.localFileDirectoryPath() + name;
    };

    static webStorageKey(savefileId) {
        if (savefileId < 0) {
            return 'RPG Config';
        } else if (savefileId === 0) {
            return 'RPG Global';
        } else {
            return 'RPG File%1'.format(savefileId);
        }
    };
};

//-----------------------------------------------------------------------------

// ImageManager
//
// The static class that loads images, creates bitmap objects and retains them.
class ImageManager {
    static cache = new CacheMap(ImageManager);

    static _imageCache = new ImageCache();
    static _requestQueue = new RequestQueue();
    static _systemReservationId = Utils.generateRuntimeId();

    static _generateCacheKey(path, hue) {
        return path + ':' + hue;
    };

    static loadAnimation(filename, hue) {
        return this.loadBitmap('img/animations/', filename, hue, true);
    };

    static loadBattleback1(filename, hue) {
        return this.loadBitmap('img/battlebacks1/', filename, hue, true);
    };

    static loadBattleback2(filename, hue) {
        return this.loadBitmap('img/battlebacks2/', filename, hue, true);
    };

    static loadEnemy(filename, hue) {
        return this.loadBitmap('img/enemies/', filename, hue, true);
    };

    static loadCharacter(filename, hue) {
        return this.loadBitmap('img/characters/', filename, hue, false);
    };

    static loadFace(filename, hue) {
        return this.loadBitmap('img/faces/', filename, hue, true);
    };

    static loadParallax(filename, hue) {
        return this.loadBitmap('img/parallaxes/', filename, hue, true);
    };

    static loadPicture(filename, hue) {
        return this.loadBitmap('img/pictures/', filename, hue, true);
    };

    static loadSvActor(filename, hue) {
        return this.loadBitmap('img/sv_actors/', filename, hue, false);
    };

    static loadSvEnemy(filename, hue) {
        return this.loadBitmap('img/sv_enemies/', filename, hue, true);
    };

    static loadSystem(filename, hue) {
        return this.loadBitmap('img/system/', filename, hue, false);
    };

    static loadTileset(filename, hue) {
        return this.loadBitmap('img/tilesets/', filename, hue, false);
    };

    static loadTitle1(filename, hue) {
        return this.loadBitmap('img/titles1/', filename, hue, true);
    };

    static loadTitle2(filename, hue) {
        return this.loadBitmap('img/titles2/', filename, hue, true);
    };

    static loadActionSeq(filename, hue) {
        return this.loadBitmap('', filename, hue, true);
    };

    static loadBitmap(folder, filename, hue, smooth) {
        if (filename) {
            const path = folder + encodeURIComponent(filename) + '.png';
            const bitmap = this.loadNormalBitmap(path, hue || 0);
            bitmap.smooth = smooth;
            return bitmap;
        } else {
            return this.loadEmptyBitmap();
        }
    };

    static loadEmptyBitmap() {
        let empty = this._imageCache.get('empty');
        if (!empty) {
            empty = new Bitmap();
            this._imageCache.add('empty', empty);
            this._imageCache.reserve('empty', empty, this._systemReservationId);
        }

        return empty;
    };

    static loadNormalBitmap(path, hue) {
        const key = this._generateCacheKey(path, hue);
        let bitmap = this._imageCache.get(key);
        if (!bitmap) {
            bitmap = Bitmap.load(decodeURIComponent(path));
            bitmap.addLoadListener(() => {
                bitmap.rotateHue(hue);
            });
            this._imageCache.add(key, bitmap);
        } else if (!bitmap.isReady()) {
            bitmap.decode();
        }

        return bitmap;
    };

    static clear() {
        this._imageCache = new ImageCache();
    };

    static isReady() {
        return this._imageCache.isReady();
    };

    static isObjectCharacter(filename) {
        const sign = filename.match(/^[\!\$]+/);
        return sign?.[0].contains('!');
    };

    static isBigCharacter(filename) {
        const sign = filename.match(/^[\!\$]+/);
        return sign?.[0].contains('$');
    };

    static isZeroParallax(filename) {
        return filename.charAt(0) === '!';
    };


    static reserveAnimation(filename, hue, reservationId) {
        return this.reserveBitmap('img/animations/', filename, hue, true, reservationId);
    };

    static reserveBattleback1(filename, hue, reservationId) {
        return this.reserveBitmap('img/battlebacks1/', filename, hue, true, reservationId);
    };

    static reserveBattleback2(filename, hue, reservationId) {
        return this.reserveBitmap('img/battlebacks2/', filename, hue, true, reservationId);
    };

    static reserveEnemy(filename, hue, reservationId) {
        return this.reserveBitmap('img/enemies/', filename, hue, true, reservationId);
    };

    static reserveCharacter(filename, hue, reservationId) {
        return this.reserveBitmap('img/characters/', filename, hue, false, reservationId);
    };

    static reserveFace(filename, hue, reservationId) {
        return this.reserveBitmap('img/faces/', filename, hue, true, reservationId);
    };

    static reserveParallax(filename, hue, reservationId) {
        return this.reserveBitmap('img/parallaxes/', filename, hue, true, reservationId);
    };

    static reservePicture(filename, hue, reservationId) {
        return this.reserveBitmap('img/pictures/', filename, hue, true, reservationId);
    };

    static reserveSvActor(filename, hue, reservationId) {
        return this.reserveBitmap('img/sv_actors/', filename, hue, false, reservationId);
    };

    static reserveSvEnemy(filename, hue, reservationId) {
        return this.reserveBitmap('img/sv_enemies/', filename, hue, true, reservationId);
    };

    static reserveSystem(filename, hue, reservationId) {
        return this.reserveBitmap('img/system/', filename, hue, false, reservationId || this._systemReservationId);
    };

    static reserveTileset(filename, hue, reservationId) {
        return this.reserveBitmap('img/tilesets/', filename, hue, false, reservationId);
    };

    static reserveTitle1(filename, hue, reservationId) {
        return this.reserveBitmap('img/titles1/', filename, hue, true, reservationId);
    };

    static reserveTitle2(filename, hue, reservationId) {
        return this.reserveBitmap('img/titles2/', filename, hue, true, reservationId);
    };

    static reserveBitmap(folder, filename, hue, smooth, reservationId) {
        if (filename) {
            const path = folder + encodeURIComponent(filename) + '.png';
            const bitmap = this.reserveNormalBitmap(path, hue || 0, reservationId || this._defaultReservationId);
            bitmap.smooth = smooth;
            return bitmap;
        } else {
            return this.loadEmptyBitmap();
        }
    };

    static reserveNormalBitmap(path, hue, reservationId) {
        const bitmap = this.loadNormalBitmap(path, hue);
        this._imageCache.reserve(this._generateCacheKey(path, hue), bitmap, reservationId);

        return bitmap;
    };

    static releaseReservation(reservationId) {
        this._imageCache.releaseReservation(reservationId);
    };

    static setDefaultReservationId(reservationId) {
        this._defaultReservationId = reservationId;
    };

    static requestAnimation(filename, hue) {
        return this.requestBitmap('img/animations/', filename, hue, true);
    };

    static requestBattleback1(filename, hue) {
        return this.requestBitmap('img/battlebacks1/', filename, hue, true);
    };

    static requestBattleback2(filename, hue) {
        return this.requestBitmap('img/battlebacks2/', filename, hue, true);
    };

    static requestEnemy(filename, hue) {
        return this.requestBitmap('img/enemies/', filename, hue, true);
    };

    static requestCharacter(filename, hue) {
        return this.requestBitmap('img/characters/', filename, hue, false);
    };

    static requestFace(filename, hue) {
        return this.requestBitmap('img/faces/', filename, hue, true);
    };

    static requestParallax(filename, hue) {
        return this.requestBitmap('img/parallaxes/', filename, hue, true);
    };

    static requestPicture(filename, hue) {
        return this.requestBitmap('img/pictures/', filename, hue, true);
    };

    static requestSvActor(filename, hue) {
        return this.requestBitmap('img/sv_actors/', filename, hue, false);
    };

    static requestSvEnemy(filename, hue) {
        return this.requestBitmap('img/sv_enemies/', filename, hue, true);
    };

    static requestSystem(filename, hue) {
        return this.requestBitmap('img/system/', filename, hue, false);
    };

    static requestTileset(filename, hue) {
        return this.requestBitmap('img/tilesets/', filename, hue, false);
    };

    static requestTitle1(filename, hue) {
        return this.requestBitmap('img/titles1/', filename, hue, true);
    };

    static requestTitle2(filename, hue) {
        return this.requestBitmap('img/titles2/', filename, hue, true);
    };

    static requestBitmap(folder, filename, hue, smooth) {
        if (filename) {
            const path = folder + encodeURIComponent(filename) + '.png';
            const bitmap = this.requestNormalBitmap(path, hue || 0);
            bitmap.smooth = smooth;
            return bitmap;
        } else {
            return this.loadEmptyBitmap();
        }
    };

    static requestNormalBitmap(path, hue) {
        const key = this._generateCacheKey(path, hue);
        let bitmap = this._imageCache.get(key);
        if (!bitmap) {
            bitmap = Bitmap.request(path);
            bitmap.addLoadListener(() => {
                bitmap.rotateHue(hue);
            });
            this._imageCache.add(key, bitmap);
            this._requestQueue.enqueue(key, bitmap);
        } else {
            this._requestQueue.raisePriority(key);
        }

        return bitmap;
    };

    static update() {
        this._requestQueue.update();
    };

    static clearRequest() {
        this._requestQueue.clear();
    };
};

//-----------------------------------------------------------------------------

// AudioManager
//
// The static class that handles BGM, BGS, ME and SE.
class AudioManager {
    static _masterVolume = 1;   // (min: 0, max: 1)
    static _bgmVolume = 100;
    static _bgsVolume = 100;
    static _meVolume = 100;
    static _seVolume = 100;
    static _currentBgm = null;
    static _currentBgs = null;
    static _bgmBuffer = null;
    static _bgsBuffer = null;
    static _meBuffer = null;
    static _seBuffers = [];
    static _staticBuffers = [];
    static _replayFadeTime = 0.5;
    static _path = 'audio/';
    static _blobUrl = null;

    static get masterVolume() {
        return this._masterVolume;
    };
    static set masterVolume(value) {
        this._masterVolume = value;
        WebAudio.setMasterVolume(this._masterVolume);
        Graphics.setVideoVolume(this._masterVolume);
    };

    static get bgmVolume() {
        return this._bgmVolume;
    };
    static set bgmVolume(value) {
        this._bgmVolume = value;
        this.updateBgmParameters(this._currentBgm);
    };

    static get bgsVolume() {
        return this._bgsVolume;
    };
    static set bgsVolume(value) {
        this._bgsVolume = value;
        this.updateBgsParameters(this._currentBgs);
    };

    static get meVolume() {
        return this._meVolume;
    };
    static set meVolume(value) {
        this._meVolume = value;
        this.updateMeParameters(this._currentMe);
    };

    static get seVolume() {
        return this._seVolume;
    };
    static set seVolume(value) {
        this._seVolume = value;
    };

    static playBgm(bgm, pos) {
        if (this.isCurrentBgm(bgm)) {
            this.updateBgmParameters(bgm);
        } else {
            this.stopBgm();
            if (bgm.name) {
                if (Decrypter.hasEncryptedAudio && this.shouldUseHtml5Audio()) {
                    this.playEncryptedBgm(bgm, pos);
                }
                else {
                    this._bgmBuffer = this.createBuffer('bgm', bgm.name);
                    this.updateBgmParameters(bgm);
                    if (!this._meBuffer) {
                        this._bgmBuffer.play(true, pos || 0);
                    }
                }
            }
        }
        this.updateCurrentBgm(bgm, pos);
    };

    static playEncryptedBgm(bgm, pos) {
        const ext = this.audioFileExt();
        let url = this._path + 'bgm/' + encodeURIComponent(bgm.name) + ext;
        url = Decrypter.extToEncryptExt(url);
        Decrypter.decryptHTML5Audio(url, bgm, pos);
    };

    static createDecryptBuffer(url, bgm, pos) {
        this._blobUrl = url;
        this._bgmBuffer = this.createBuffer('bgm', bgm.name);
        this.updateBgmParameters(bgm);
        if (!this._meBuffer) {
            this._bgmBuffer.play(true, pos || 0);
        }
        this.updateCurrentBgm(bgm, pos);
    };

    static replayBgm(bgm) {
        if (this.isCurrentBgm(bgm)) {
            this.updateBgmParameters(bgm);
        } else {
            this.playBgm(bgm, bgm.pos);
            if (this._bgmBuffer) {
                this._bgmBuffer.fadeIn(this._replayFadeTime);
            }
        }
    };

    static isCurrentBgm(bgm) {
        return (this._currentBgm && this._bgmBuffer &&
            this._currentBgm.name === bgm.name);
    };

    static updateBgmParameters(bgm) {
        this.updateBufferParameters(this._bgmBuffer, this._bgmVolume, bgm);
    };

    static updateCurrentBgm(bgm, pos) {
        this._currentBgm = {
            name: bgm.name,
            volume: bgm.volume,
            pitch: bgm.pitch,
            pan: bgm.pan,
            pos: pos
        };
    };

    static stopBgm() {
        if (this._bgmBuffer) {
            this._bgmBuffer.stop();
            this._bgmBuffer = null;
            this._currentBgm = null;
        }
    };

    static fadeOutBgm(duration) {
        if (this._bgmBuffer && this._currentBgm) {
            this._bgmBuffer.fadeOut(duration);
            this._currentBgm = null;
        }
    };

    static fadeInBgm(duration) {
        if (this._bgmBuffer && this._currentBgm) {
            this._bgmBuffer.fadeIn(duration);
        }
    };

    static playBgs(bgs, pos) {
        if (this.isCurrentBgs(bgs)) {
            this.updateBgsParameters(bgs);
        } else {
            this.stopBgs();
            if (bgs.name) {
                this._bgsBuffer = this.createBuffer('bgs', bgs.name);
                this.updateBgsParameters(bgs);
                this._bgsBuffer.play(true, pos || 0);
            }
        }
        this.updateCurrentBgs(bgs, pos);
    };

    static replayBgs(bgs) {
        if (this.isCurrentBgs(bgs)) {
            this.updateBgsParameters(bgs);
        } else {
            this.playBgs(bgs, bgs.pos);
            if (this._bgsBuffer) {
                this._bgsBuffer.fadeIn(this._replayFadeTime);
            }
        }
    };

    static isCurrentBgs(bgs) {
        return (this._currentBgs && this._bgsBuffer &&
            this._currentBgs.name === bgs.name);
    };

    static updateBgsParameters(bgs) {
        this.updateBufferParameters(this._bgsBuffer, this._bgsVolume, bgs);
    };

    static updateCurrentBgs(bgs, pos) {
        this._currentBgs = {
            name: bgs.name,
            volume: bgs.volume,
            pitch: bgs.pitch,
            pan: bgs.pan,
            pos: pos
        };
    };

    static stopBgs() {
        if (this._bgsBuffer) {
            this._bgsBuffer.stop();
            this._bgsBuffer = null;
            this._currentBgs = null;
        }
    };

    static fadeOutBgs(duration) {
        if (this._bgsBuffer && this._currentBgs) {
            this._bgsBuffer.fadeOut(duration);
            this._currentBgs = null;
        }
    };

    static fadeInBgs(duration) {
        if (this._bgsBuffer && this._currentBgs) {
            this._bgsBuffer.fadeIn(duration);
        }
    };

    static playMe(me) {
        this.stopMe();
        if (me.name) {
            if (this._bgmBuffer && this._currentBgm) {
                this._currentBgm.pos = this._bgmBuffer.seek();
                this._bgmBuffer.stop();
            }
            this._meBuffer = this.createBuffer('me', me.name);
            this.updateMeParameters(me);
            this._meBuffer.play(false);
            this._meBuffer.addStopListener(this.stopMe.bind(this));
        }
    };

    static updateMeParameters(me) {
        this.updateBufferParameters(this._meBuffer, this._meVolume, me);
    };

    static fadeOutMe(duration) {
        if (this._meBuffer) {
            this._meBuffer.fadeOut(duration);
        }
    };

    static stopMe() {
        if (this._meBuffer) {
            this._meBuffer.stop();
            this._meBuffer = null;
            if (this._bgmBuffer && this._currentBgm && !this._bgmBuffer.isPlaying()) {
                this._bgmBuffer.play(true, this._currentBgm.pos);
                this._bgmBuffer.fadeIn(this._replayFadeTime);
            }
        }
    };

    static playSe(se) {
        if (se.name) {
            this._seBuffers = this._seBuffers.filter(audio => audio.isPlaying());
            const buffer = this.createBuffer('se', se.name);
            this.updateSeParameters(buffer, se);
            buffer.play(false);
            this._seBuffers.push(buffer);
        }
    };

    static updateSeParameters(buffer, se) {
        this.updateBufferParameters(buffer, this._seVolume, se);
    };

    static stopSe() {
        for (const buffer of this._seBuffers) {
            buffer.stop();
        }
        this._seBuffers = [];
    };

    static playStaticSe(se) {
        if (se.name) {
            this.loadStaticSe(se);
            for (const buffer of this._staticBuffers) {
                if (buffer._reservedSeName === se.name) {
                    buffer.stop();
                    this.updateSeParameters(buffer, se);
                    buffer.play(false);
                    break;
                }
            }
        }
    };

    static loadStaticSe(se) {
        if (se.name && !this.isStaticSe(se)) {
            const buffer = this.createBuffer('se', se.name);
            buffer._reservedSeName = se.name;
            this._staticBuffers.push(buffer);
            if (this.shouldUseHtml5Audio()) {
                Html5Audio.setStaticSe(buffer._url);
            }
        }
    };

    static isStaticSe(se) {
        for (const buffer of this._staticBuffers) {
            if (buffer._reservedSeName === se.name) {
                return true;
            }
        }
        return false;
    };

    static stopAll() {
        this.stopMe();
        this.stopBgm();
        this.stopBgs();
        this.stopSe();
    };

    static saveBgm() {
        if (this._currentBgm) {
            const bgm = this._currentBgm;
            return {
                name: bgm.name,
                volume: bgm.volume,
                pitch: bgm.pitch,
                pan: bgm.pan,
                pos: this._bgmBuffer ? this._bgmBuffer.seek() : 0
            };
        } else {
            return this.makeEmptyAudioObject();
        }
    };

    static saveBgs() {
        if (this._currentBgs) {
            const bgs = this._currentBgs;
            return {
                name: bgs.name,
                volume: bgs.volume,
                pitch: bgs.pitch,
                pan: bgs.pan,
                pos: this._bgsBuffer ? this._bgsBuffer.seek() : 0
            };
        } else {
            return this.makeEmptyAudioObject();
        }
    };

    static makeEmptyAudioObject() {
        return { name: '', volume: 0, pitch: 0 };
    };

    static createBuffer(folder, name) {
        const ext = this.audioFileExt();
        const url = this._path + folder + '/' + encodeURIComponent(name) + ext;
        if (this.shouldUseHtml5Audio() && folder === 'bgm') {
            if (this._blobUrl) Html5Audio.setup(this._blobUrl);
            else Html5Audio.setup(url);
            return Html5Audio;
        } else {
            return new WebAudio(url);
        }
    };

    static updateBufferParameters(buffer, configVolume, audio) {
        if (buffer && audio) {
            buffer.volume = configVolume * (audio.volume || 0) / 10000;
            buffer.pitch = (audio.pitch || 0) / 100;
            buffer.pan = (audio.pan || 0) / 100;
        }
    };

    static audioFileExt() {
        if (WebAudio.canPlayOgg() && !Utils.isMobileDevice()) {
            return '.ogg';
        } else {
            return '.m4a';
        }
    };

    static shouldUseHtml5Audio() {
        // The only case where we wanted html5audio was android/ no encrypt
        // Atsuma-ru asked to force webaudio there too, so just return false for ALL    // return Utils.isAndroidChrome() && !Decrypter.hasEncryptedAudio;
        return false;
    };

    static checkErrors() {
        this.checkWebAudioError(this._bgmBuffer);
        this.checkWebAudioError(this._bgsBuffer);
        this.checkWebAudioError(this._meBuffer);
        for (const buffer of this._seBuffers) {
            this.checkWebAudioError(buffer);
        }
        for (const buffer of this._staticBuffers) {
            this.checkWebAudioError(buffer);
        }
    };

    static checkWebAudioError(webAudio) {
        if (webAudio && webAudio.isError()) {
            throw new Error('Failed to load: ' + webAudio.url);
        }
    };
};

//-----------------------------------------------------------------------------

// SoundManager
//
// The static class that plays sound effects defined in the database.
class SoundManager {
    static preloadImportantSounds() {
        this.loadSystemSound(0);
        this.loadSystemSound(1);
        this.loadSystemSound(2);
        this.loadSystemSound(3);
    };

    static loadSystemSound(n) {
        if ($dataSystem) {
            AudioManager.loadStaticSe($dataSystem.sounds[n]);
        }
    };

    static playSystemSound(n) {
        if ($dataSystem) {
            AudioManager.playStaticSe($dataSystem.sounds[n]);
        }
    };

    static playCursor() {
        this.playSystemSound(0);
    };

    static playOk() {
        this.playSystemSound(1);
    };

    static playCancel() {
        this.playSystemSound(2);
    };

    static playBuzzer() {
        this.playSystemSound(3);
    };

    static playEquip() {
        this.playSystemSound(4);
    };

    static playSave() {
        this.playSystemSound(5);
    };

    static playLoad() {
        this.playSystemSound(6);
    };

    static playBattleStart() {
        this.playSystemSound(7);
    };

    static playEscape() {
        this.playSystemSound(8);
    };

    static playEnemyAttack() {
        this.playSystemSound(9);
    };

    static playEnemyDamage() {
        this.playSystemSound(10);
    };

    static playEnemyCollapse() {
        this.playSystemSound(11);
    };

    static playBossCollapse1() {
        this.playSystemSound(12);
    };

    static playBossCollapse2() {
        this.playSystemSound(13);
    };

    static playActorDamage() {
        this.playSystemSound(14);
    };

    static playActorCollapse() {
        this.playSystemSound(15);
    };

    static playRecovery() {
        this.playSystemSound(16);
    };

    static playMiss() {
        this.playSystemSound(17);
    };

    static playEvasion() {
        this.playSystemSound(18);
    };

    static playMagicEvasion() {
        this.playSystemSound(19);
    };

    static playReflection() {
        this.playSystemSound(20);
    };

    static playShop() {
        this.playSystemSound(21);
    };

    static playUseItem() {
        this.playSystemSound(22);
    };

    static playUseSkill() {
        this.playSystemSound(23);
    };
};

//-----------------------------------------------------------------------------

// TextManager
//
// The static class that handles terms and messages.
class TextManager {
    static basic(basicId) {
        return $dataSystem.terms.basic[basicId] || '';
    };

    static param(paramId) {
        return $dataSystem.terms.params[paramId] || '';
    };

    static command(commandId) {
        return $dataSystem.terms.commands[commandId] || '';
    };

    static message(messageId) {
        return $dataSystem.terms.messages[messageId] || '';
    };

    static get currencyUnit() { return $dataSystem.currencyUnit; }

    static get level() { return this.basic(0); }
    static get levelA() { return this.basic(1); }
    static get hp() { return this.basic(2); }
    static get hpA() { return this.basic(3); }
    static get mp() { return this.basic(4); }
    static get mpA() { return this.basic(5); }
    static get tp() { return this.basic(6); }
    static get tpA() { return this.basic(7); }
    static get exp() { return this.basic(8); }
    static get expA() { return this.basic(9); }

    static get fight() { return this.command(0); }
    static get escape() { return this.command(1); }
    static get attack() { return this.command(2); }
    static get guard() { return this.command(3); }
    static get item() { return this.command(4); }
    static get skill() { return this.command(5); }
    static get equip() { return this.command(6); }
    static get status() { return this.command(7); }
    static get formation() { return this.command(8); }
    static get save() { return this.command(9); }
    static get gameEnd() { return this.command(10); }
    static get options() { return this.command(11); }
    static get weapon() { return this.command(12); }
    static get armor() { return this.command(13); }
    static get keyItem() { return this.command(14); }
    static get equip2() { return this.command(15); }
    static get optimize() { return this.command(16); }
    static get clear() { return this.command(17); }
    static get newGame() { return this.command(18); }
    static get continue_() { return this.command(19); }
    static get toTitle() { return this.command(21); }
    static get cancel() { return this.command(22); }
    static get buy() { return this.command(24); }
    static get sell() { return this.command(25); }

    static get alwaysDash() { return this.message('alwaysDash'); }
    static get commandRemember() { return this.message('commandRemember'); }
    static get bgmVolume() { return this.message('bgmVolume'); }
    static get bgsVolume() { return this.message('bgsVolume'); }
    static get meVolume() { return this.message('meVolume'); }
    static get seVolume() { return this.message('seVolume'); }
    static get possession() { return this.message('possession'); }
    static get expTotal() { return this.message('expTotal'); }
    static get expNext() { return this.message('expNext'); }
    static get saveMessage() { return this.message('saveMessage'); }
    static get loadMessage() { return this.message('loadMessage'); }
    static get file() { return this.message('file'); }
    static get partyName() { return this.message('partyName'); }
    static get emerge() { return this.message('emerge'); }
    static get preemptive() { return this.message('preemptive'); }
    static get surprise() { return this.message('surprise'); }
    static get escapeStart() { return this.message('escapeStart'); }
    static get escapeFailure() { return this.message('escapeFailure'); }
    static get victory() { return this.message('victory'); }
    static get defeat() { return this.message('defeat'); }
    static get obtainExp() { return this.message('obtainExp'); }
    static get obtainGold() { return this.message('obtainGold'); }
    static get obtainItem() { return this.message('obtainItem'); }
    static get levelUp() { return this.message('levelUp'); }
    static get obtainSkill() { return this.message('obtainSkill'); }
    static get useItem() { return this.message('useItem'); }
    static get criticalToEnemy() { return this.message('criticalToEnemy'); }
    static get criticalToActor() { return this.message('criticalToActor'); }
    static get actorDamage() { return this.message('actorDamage'); }
    static get actorRecovery() { return this.message('actorRecovery'); }
    static get actorGain() { return this.message('actorGain'); }
    static get actorLoss() { return this.message('actorLoss'); }
    static get actorDrain() { return this.message('actorDrain'); }
    static get actorNoDamage() { return this.message('actorNoDamage'); }
    static get actorNoHit() { return this.message('actorNoHit'); }
    static get enemyDamage() { return this.message('enemyDamage'); }
    static get enemyRecovery() { return this.message('enemyRecovery'); }
    static get enemyGain() { return this.message('enemyGain'); }
    static get enemyLoss() { return this.message('enemyLoss'); }
    static get enemyDrain() { return this.message('enemyDrain'); }
    static get enemyNoDamage() { return this.message('enemyNoDamage'); }
    static get enemyNoHit() { return this.message('enemyNoHit'); }
    static get evasion() { return this.message('evasion'); }
    static get magicEvasion() { return this.message('magicEvasion'); }
    static get magicReflection() { return this.message('magicReflection'); }
    static get counterAttack() { return this.message('counterAttack'); }
    static get substitute() { return this.message('substitute'); }
    static get buffAdd() { return this.message('buffAdd'); }
    static get debuffAdd() { return this.message('debuffAdd'); }
    static get buffRemove() { return this.message('buffRemove'); }
    static get actionFailure() { return this.message('actionFailure'); }
};

//-----------------------------------------------------------------------------

// SceneManager
//
// The static class that manages scene transitions.
class SceneManager {
    /*
     * Gets the current time in ms without on iOS Safari.
     * @private
     */
    static _getTimeInMsWithoutMobileSafari() {
        return performance.now();
    };

    static _scene = null;
    static _nextScene = null;
    static _stack = [];
    static _stopped = false;
    static _sceneStarted = false;
    static _exiting = false;
    static _previousClass = null;
    static _backgroundBitmap = null;
    static _screenWidth = 816;
    static _screenHeight = 624;
    static _boxWidth = 816;
    static _boxHeight = 624;
    static _deltaTime = 1.0 / 60.0;
    static _accumulator = 0.0;

    static _currentTime = Utils.isMobileSafari() ? undefined : this._getTimeInMsWithoutMobileSafari();

    static run(sceneClass) {
        try {
            this.initialize();
            this.goto(sceneClass);
            this.requestUpdate();
        } catch (e) {
            this.catchException(e);
        }
    };

    static initialize() {
        this.initGraphics();
        this.checkFileAccess();
        this.initAudio();
        this.initInput();
        this.initNwjs();
        this.checkPluginErrors();
        this.setupErrorHandlers();
    };

    static initGraphics() {
        const type = this.preferableRendererType();
        Graphics.initialize(this._screenWidth, this._screenHeight, type);
        Graphics.boxWidth = this._boxWidth;
        Graphics.boxHeight = this._boxHeight;
        Graphics.setLoadingImage('img/system/Loading.png');
        if (Utils.isOptionValid('showfps')) {
            Graphics.showFps();
        }
        if (type === 'webgl') {
            this.checkWebGL();
        }
    };

    static preferableRendererType() {
        if (Utils.isOptionValid('canvas')) {
            return 'canvas';
        } else if (Utils.isOptionValid('webgl')) {
            return 'webgl';
        } else {
            return 'auto';
        }
    };

    static shouldUseCanvasRenderer() {
        return Utils.isMobileDevice();
    };

    static checkWebGL() {
        if (!Graphics.hasWebGL()) {
            throw new Error('Your browser does not support WebGL.');
        }
    };

    static checkFileAccess() {
        if (!Utils.canReadGameFiles()) {
            throw new Error('Your browser does not allow to read local files.');
        }
    };

    static initAudio() {
        const noAudio = Utils.isOptionValid('noaudio');
        if (!WebAudio.initialize(noAudio) && !noAudio) {
            throw new Error('Your browser does not support Web Audio API.');
        }
    };

    static initInput() {
        Input.initialize();
        TouchInput.initialize();
    };

    static initNwjs() {
        if (Utils.isNwjs()) {
            const gui = require('nw.gui');
            const win = gui.Window.get();
            if (process.platform === 'darwin' && !win.menu) {
                const menubar = new gui.Menu({ type: 'menubar' });
                const option = { hideEdit: true, hideWindow: true };
                menubar.createMacBuiltin('Game', option);
                win.menu = menubar;
            }
        }
    };

    static checkPluginErrors() {
        PluginManager.checkErrors();
    };

    static setupErrorHandlers() {
        window.addEventListener('error', this.onError.bind(this));
        document.addEventListener('keydown', this.onKeyDown.bind(this));
    };

    static requestUpdate() {
        if (!this._stopped) {
            requestAnimationFrame(this.update.bind(this));
        }
    };

    static update() {
        try {
            this.tickStart();
            if (Utils.isMobileSafari()) {
                this.updateInputData();
            }
            this.updateManagers();
            this.updateMain();
            this.tickEnd();
        } catch (e) {
            this.catchException(e);
        }
    };

    static terminate() {
        window.close();
    };

    static onError(e) {
        console.error(e.message);
        console.error(e.filename, e.lineno);
        try {
            this.stop();
            Graphics.printError('Error', e.message);
            AudioManager.stopAll();
        } catch (e2) { }
    };

    static onKeyDown(event) {
        if (!event.ctrlKey && !event.altKey) {
            switch (event.keyCode) {
                case 116:   // F5
                    if (Utils.isNwjs()) {
                        location.reload();
                    }
                    break;
                case 119:   // F8
                    if (Utils.isNwjs() && Utils.isOptionValid('test')) {
                        require('nw.gui').Window.get().showDevTools();
                    }
                    break;
            }
        }
    };

    static catchException(e) {
        if (e instanceof Error) {
            Graphics.printError(e.name, e.message);
            console.error(e.stack);
        } else {
            Graphics.printError('UnknownError', e);
        }
        AudioManager.stopAll();
        this.stop();
    };

    static tickStart() {
        Graphics.tickStart();
    };

    static tickEnd() {
        Graphics.tickEnd();
    };

    static updateInputData() {
        Input.update();
        TouchInput.update();
    };

    static updateMain() {
        if (Utils.isMobileSafari()) {
            this.changeScene();
            this.updateScene();
        } else {
            const newTime = this._getTimeInMsWithoutMobileSafari();
            let fTime = (newTime - this._currentTime) / 1000;
            if (fTime > 0.25) fTime = 0.25;
            this._currentTime = newTime;
            this._accumulator += fTime;
            while (this._accumulator >= this._deltaTime) {
                this.updateInputData();
                this.changeScene();
                this.updateScene();
                this._accumulator -= this._deltaTime;
            }
        }
        this.renderScene();
        this.requestUpdate();
    };

    static updateManagers() {
        ImageManager.update();
    };

    static changeScene() {
        if (this.isSceneChanging() && !this.isCurrentSceneBusy()) {
            if (this._scene) {
                this._scene.terminate();
                this._scene.detachReservation();
                this._previousClass = this._scene.constructor;
            }
            this._scene = this._nextScene;
            if (this._scene) {
                this._scene.attachReservation();
                this._scene.create();
                this._nextScene = null;
                this._sceneStarted = false;
                this.onSceneCreate();
            }
            if (this._exiting) {
                this.terminate();
            }
        }
    };

    static updateScene() {
        if (this._scene) {
            if (!this._sceneStarted && this._scene.isReady()) {
                this._scene.start();
                this._sceneStarted = true;
                this.onSceneStart();
            }
            if (this.isCurrentSceneStarted()) {
                this._scene.update();
            }
        }
    };

    static renderScene() {
        if (this.isCurrentSceneStarted()) {
            Graphics.render(this._scene);
        } else if (this._scene) {
            this.onSceneLoading();
        }
    };

    static onSceneCreate() {
        Graphics.startLoading();
    };

    static onSceneStart() {
        Graphics.endLoading();
    };

    static onSceneLoading() {
        Graphics.updateLoading();
    };

    static isSceneChanging() {
        return this._exiting || !!this._nextScene;
    };

    static isCurrentSceneBusy() {
        return this._scene && this._scene.isBusy();
    };

    static isCurrentSceneStarted() {
        return this._scene && this._sceneStarted;
    };

    static isNextScene(sceneClass) {
        return this._nextScene && this._nextScene.constructor === sceneClass;
    };

    static isPreviousScene(sceneClass) {
        return this._previousClass === sceneClass;
    };

    static goto(sceneClass) {
        if (sceneClass) {
            this._nextScene = new sceneClass();
        }
        if (this._scene) {
            this._scene.stop();
        }
    };

    static push(sceneClass) {
        this._stack.push(this._scene.constructor);
        this.goto(sceneClass);
    };

    static pop() {
        if (this._stack.length > 0) {
            this.goto(this._stack.pop());
        } else {
            this.exit();
        }
    };

    static exit() {
        this.goto(null);
        this._exiting = true;
    };

    static clearStack() {
        this._stack = [];
    };

    static stop() {
        this._stopped = true;
    };

    static prepareNextScene() {
        this._nextScene.prepare.apply(this._nextScene, arguments);
    };

    static snap() {
        return Bitmap.snap(this._scene);
    };

    static snapForBackground() {
        this._backgroundBitmap = this.snap();
        this._backgroundBitmap.blur();
    };

    static backgroundBitmap() {
        return this._backgroundBitmap;
    };

    static resume() {
        this._stopped = false;
        this.requestUpdate();
        if (!Utils.isMobileSafari()) {
            this._currentTime = this._getTimeInMsWithoutMobileSafari();
            this._accumulator = 0;
        }
    };
};

//-----------------------------------------------------------------------------

// BattleManager
//
// The static class that manages battle progress.
class BattleManager {
    static setup(troopId, canEscape, canLose) {
        this.initMembers();
        this._canEscape = canEscape;
        this._canLose = canLose;
        $gameTroop.setup(troopId);
        $gameScreen.onBattleStart();
        this.makeEscapeRatio();
    };

    static initMembers() {
        this._phase = 'init';
        this._canEscape = false;
        this._canLose = false;
        this._battleTest = false;
        this._eventCallback = null;
        this._preemptive = false;
        this._surprise = false;
        this._actorIndex = -1;
        this._actionForcedBattler = null;
        this._mapBgm = null;
        this._mapBgs = null;
        this._actionBattlers = [];
        this._subject = null;
        this._action = null;
        this._targets = [];
        this._logWindow = null;
        this._statusWindow = null;
        this._spriteset = null;
        this._escapeRatio = 0;
        this._escaped = false;
        this._rewards = {};
        this._turnForced = false;
    };

    static isBattleTest() {
        return this._battleTest;
    };

    static setBattleTest(battleTest) {
        this._battleTest = battleTest;
    };

    static setEventCallback(callback) {
        this._eventCallback = callback;
    };

    static setLogWindow(logWindow) {
        this._logWindow = logWindow;
    };

    static setStatusWindow(statusWindow) {
        this._statusWindow = statusWindow;
    };

    static setSpriteset(spriteset) {
        this._spriteset = spriteset;
    };

    static onEncounter() {
        this._preemptive = (Math.random() < this.ratePreemptive());
        this._surprise = (Math.random() < this.rateSurprise() && !this._preemptive);
    };

    static ratePreemptive() {
        return $gameParty.ratePreemptive($gameTroop.agility());
    };

    static rateSurprise() {
        return $gameParty.rateSurprise($gameTroop.agility());
    };

    static saveBgmAndBgs() {
        this._mapBgm = AudioManager.saveBgm();
        this._mapBgs = AudioManager.saveBgs();
    };

    static playBattleBgm() {
        AudioManager.playBgm($gameSystem.battleBgm());
        AudioManager.stopBgs();
    };

    static playVictoryMe() {
        AudioManager.playMe($gameSystem.victoryMe());
    };

    static playDefeatMe() {
        AudioManager.playMe($gameSystem.defeatMe());
    };

    static replayBgmAndBgs() {
        if (this._mapBgm) {
            AudioManager.replayBgm(this._mapBgm);
        } else {
            AudioManager.stopBgm();
        }
        if (this._mapBgs) {
            AudioManager.replayBgs(this._mapBgs);
        }
    };

    static makeEscapeRatio() {
        this._escapeRatio = 0.5 * $gameParty.agility() / $gameTroop.agility();
    };

    static update() {
        if (!this.isBusy() && !this.updateEvent()) {
            switch (this._phase) {
                case 'start':
                    this.startInput();
                    break;
                case 'turn':
                    this.updateTurn();
                    break;
                case 'action':
                    this.updateAction();
                    break;
                case 'turnEnd':
                    this.updateTurnEnd();
                    break;
                case 'battleEnd':
                    this.updateBattleEnd();
                    break;
            }
        }
    };

    static updateEvent() {
        switch (this._phase) {
            case 'start':
            case 'turn':
            case 'turnEnd':
                if (this.isActionForced()) {
                    this.processForcedAction();
                    return true;
                } else {
                    return this.updateEventMain();
                }
        }
        return this.checkAbort();
    };

    static updateEventMain() {
        $gameTroop.updateInterpreter();
        $gameParty.requestMotionRefresh();
        if ($gameTroop.isEventRunning() || this.checkBattleEnd()) {
            return true;
        }
        $gameTroop.setupBattleEvent();
        if ($gameTroop.isEventRunning() || SceneManager.isSceneChanging()) {
            return true;
        }
        return false;
    };

    static isBusy() {
        return ($gameMessage.isBusy() || this._spriteset.isBusy() ||
            this._logWindow.isBusy());
    };

    static isInputting() {
        return this._phase === 'input';
    };

    static isInTurn() {
        return this._phase === 'turn';
    };

    static isTurnEnd() {
        return this._phase === 'turnEnd';
    };

    static isAborting() {
        return this._phase === 'aborting';
    };

    static isBattleEnd() {
        return this._phase === 'battleEnd';
    };

    static canEscape() {
        return this._canEscape;
    };

    static canLose() {
        return this._canLose;
    };

    static isEscaped() {
        return this._escaped;
    };

    static actor() {
        return this._actorIndex >= 0 ? $gameParty.members()[this._actorIndex] : null;
    };

    static clearActor() {
        this.changeActor(-1, '');
    };

    static changeActor(newActorIndex, lastActorActionState) {
        const lastActor = this.actor();
        this._actorIndex = newActorIndex;
        const newActor = this.actor();
        if (lastActor) {
            lastActor.setActionState(lastActorActionState);
        }
        if (newActor) {
            newActor.setActionState('inputting');
        }
    };

    static startBattle() {
        this._phase = 'start';
        $gameSystem.onBattleStart();
        $gameParty.onBattleStart();
        $gameTroop.onBattleStart();
        this.displayStartMessages();
    };

    static displayStartMessages() {
        for (const name of $gameTroop.enemyNames()) {
            $gameMessage.add(TextManager.emerge.format(name));
        }
        if (this._preemptive) {
            $gameMessage.add(TextManager.preemptive.format($gameParty.name()));
        } else if (this._surprise) {
            $gameMessage.add(TextManager.surprise.format($gameParty.name()));
        }
    };

    static startInput() {
        this._phase = 'input';
        $gameParty.makeActions();
        $gameTroop.makeActions();
        this.clearActor();
        if (this._surprise || !$gameParty.canInput()) {
            this.startTurn();
        }
    };

    static inputtingAction() {
        return this.actor() ? this.actor().inputtingAction() : null;
    };

    static selectNextCommand() {
        do {
            if (!this.actor() || !this.actor().selectNextCommand()) {
                this.changeActor(this._actorIndex + 1, 'waiting');
                if (this._actorIndex >= $gameParty.size()) {
                    this.startTurn();
                    break;
                }
            }
        } while (!this.actor().canInput());
    };

    static selectPreviousCommand() {
        do {
            if (!this.actor() || !this.actor().selectPreviousCommand()) {
                this.changeActor(this._actorIndex - 1, 'undecided');
                if (this._actorIndex < 0) {
                    return;
                }
            }
        } while (!this.actor().canInput());
    };

    static refreshStatus() {
        this._statusWindow.refresh();
    };

    static startTurn() {
        this._phase = 'turn';
        this.clearActor();
        $gameTroop.increaseTurn();
        this.makeActionOrders();
        $gameParty.requestMotionRefresh();
        this._logWindow.startTurn();
    };

    static updateTurn() {
        $gameParty.requestMotionRefresh();
        if (!this._subject) {
            this._subject = this.getNextSubject();
        }
        if (this._subject) {
            this.processTurn();
        } else {
            this.endTurn();
        }
    };

    static processTurn() {
        const subject = this._subject;
        const action = subject.currentAction();
        if (action) {
            action.prepare();
            if (action.isValid()) {
                this.startAction();
            }
            subject.removeCurrentAction();
        } else {
            subject.onAllActionsEnd();
            this.refreshStatus();
            this._logWindow.displayAutoAffectedStatus(subject);
            this._logWindow.displayCurrentState(subject);
            this._logWindow.displayRegeneration(subject);
            this._subject = this.getNextSubject();
        }
    };

    static endTurn() {
        this._phase = 'turnEnd';
        this._preemptive = false;
        this._surprise = false;
        for (const battler of this.allBattleMembers()) {
            battler.onTurnEnd();
            this.refreshStatus();
            this._logWindow.displayAutoAffectedStatus(battler);
            this._logWindow.displayRegeneration(battler);
        }
        if (this.isForcedTurn()) {
            this._turnForced = false;
        }
    };

    static isForcedTurn() {
        return this._turnForced;
    };

    static updateTurnEnd() {
        this.startInput();
    };

    static getNextSubject() {
        for (; ;) {
            const battler = this._actionBattlers.shift();
            if (!battler) {
                return null;
            }
            if (battler.isBattleMember() && battler.isAlive()) {
                return battler;
            }
        }
    };

    static allBattleMembers() {
        return $gameParty.members().concat($gameTroop.members());
    };

    static makeActionOrders() {
        let battlers = [];
        if (!this._surprise) {
            battlers = battlers.concat($gameParty.members());
        }
        if (!this._preemptive) {
            battlers = battlers.concat($gameTroop.members());
        }
        for (const battler of battlers) {
            battler.makeSpeed();
        }
        battlers.sort((a, b) => b.speed() - a.speed());
        this._actionBattlers = battlers;
    };

    static startAction() {
        const subject = this._subject;
        const action = subject.currentAction();
        const targets = action.makeTargets();
        this._phase = 'action';
        this._action = action;
        this._targets = targets;
        subject.useItem(action.item());
        this._action.applyGlobal();
        this.refreshStatus();
        this._logWindow.startAction(subject, action, targets);
    };

    static updateAction() {
        const target = this._targets.shift();
        if (target) {
            this.invokeAction(this._subject, target);
        } else {
            this.endAction();
        }
    };

    static endAction() {
        this._logWindow.endAction(this._subject);
        this._phase = 'turn';
    };

    static invokeAction(subject, target) {
        this._logWindow.push('pushBaseLine');
        if (Math.random() < this._action.itemCnt(target)) {
            this.invokeCounterAttack(subject, target);
        } else if (Math.random() < this._action.itemMrf(target)) {
            this.invokeMagicReflection(subject, target);
        } else {
            this.invokeNormalAction(subject, target);
        }
        subject.setLastTarget(target);
        this._logWindow.push('popBaseLine');
        this.refreshStatus();
    };

    static invokeNormalAction(subject, target) {
        const realTarget = this.applySubstitute(target);
        this._action.apply(realTarget);
        this._logWindow.displayActionResults(subject, realTarget);
    };

    static invokeCounterAttack(subject, target) {
        const action = new Game_Action(target);
        action.setAttack();
        action.apply(subject);
        this._logWindow.displayCounter(target);
        this._logWindow.displayActionResults(target, subject);
    };

    static invokeMagicReflection(subject, target) {
        this._action._reflectionTarget = target;
        this._logWindow.displayReflection(target);
        this._action.apply(subject);
        this._logWindow.displayActionResults(target, subject);
    };

    static applySubstitute(target) {
        if (this.checkSubstitute(target)) {
            const substitute = target.friendsUnit().substituteBattler();
            if (substitute && target !== substitute) {
                this._logWindow.displaySubstitute(substitute, target);
                return substitute;
            }
        }
        return target;
    };

    static checkSubstitute(target) {
        return target.isDying() && !this._action.isCertainHit();
    };

    static isActionForced() {
        return !!this._actionForcedBattler;
    };

    static forceAction(battler) {
        this._actionForcedBattler = battler;
        const index = this._actionBattlers.indexOf(battler);
        if (index >= 0) {
            this._actionBattlers.splice(index, 1);
        }
    };

    static processForcedAction() {
        if (this._actionForcedBattler) {
            this._turnForced = true;
            this._subject = this._actionForcedBattler;
            this._actionForcedBattler = null;
            this.startAction();
            this._subject.removeCurrentAction();
        }
    };

    static abort() {
        this._phase = 'aborting';
    };

    static checkBattleEnd() {
        if (this._phase) {
            if (this.checkAbort()) {
                return true;
            } else if ($gameParty.isAllDead()) {
                this.processDefeat();
                return true;
            } else if ($gameTroop.isAllDead()) {
                this.processVictory();
                return true;
            }
        }
        return false;
    };

    static checkAbort() {
        if ($gameParty.isEmpty() || this.isAborting()) {
            SoundManager.playEscape();
            this._escaped = true;
            this.processAbort();
        }
        return false;
    };

    static processVictory() {
        $gameParty.removeBattleStates();
        $gameParty.performVictory();
        this.playVictoryMe();
        this.replayBgmAndBgs();
        this.makeRewards();
        this.displayVictoryMessage();
        this.displayRewards();
        this.gainRewards();
        this.endBattle(0);
    };

    static processEscape() {
        $gameParty.performEscape();
        SoundManager.playEscape();
        const success = this._preemptive ? true : (Math.random() < this._escapeRatio);
        if (success) {
            this.displayEscapeSuccessMessage();
            this._escaped = true;
            this.processAbort();
        } else {
            this.displayEscapeFailureMessage();
            this._escapeRatio += 0.1;
            $gameParty.clearActions();
            this.startTurn();
        }
        return success;
    };

    static processAbort() {
        $gameParty.removeBattleStates();
        this.replayBgmAndBgs();
        this.endBattle(1);
    };

    static processDefeat() {
        this.displayDefeatMessage();
        this.playDefeatMe();
        if (this._canLose) {
            this.replayBgmAndBgs();
        } else {
            AudioManager.stopBgm();
        }
        this.endBattle(2);
    };

    static endBattle(result) {
        this._phase = 'battleEnd';
        if (this._eventCallback) {
            this._eventCallback(result);
        }
        if (result === 0) {
            $gameSystem.onBattleWin();
        } else if (this._escaped) {
            $gameSystem.onBattleEscape();
        }
    };

    static updateBattleEnd() {
        if (this.isBattleTest()) {
            AudioManager.stopBgm();
            SceneManager.exit();
        } else if (!this._escaped && $gameParty.isAllDead()) {
            if (this._canLose) {
                $gameParty.reviveBattleMembers();
                SceneManager.pop();
            } else {
                SceneManager.goto(Scene_Gameover);
            }
        } else {
            SceneManager.pop();
        }
        this._phase = null;
    };

    static makeRewards() {
        this._rewards = {};
        this._rewards.gold = $gameTroop.goldTotal();
        this._rewards.exp = $gameTroop.expTotal();
        this._rewards.items = $gameTroop.makeDropItems();
    };

    static displayVictoryMessage() {
        $gameMessage.add(TextManager.victory.format($gameParty.name()));
    };

    static displayDefeatMessage() {
        $gameMessage.add(TextManager.defeat.format($gameParty.name()));
    };

    static displayEscapeSuccessMessage() {
        $gameMessage.add(TextManager.escapeStart.format($gameParty.name()));
    };

    static displayEscapeFailureMessage() {
        $gameMessage.add(TextManager.escapeStart.format($gameParty.name()));
        $gameMessage.add('\\.' + TextManager.escapeFailure);
    };

    static displayRewards() {
        this.displayExp();
        this.displayGold();
        this.displayDropItems();
    };

    static displayExp() {
        const exp = this._rewards.exp;
        if (exp > 0) {
            const text = TextManager.obtainExp.format(exp, TextManager.exp);
            $gameMessage.add('\\.' + text);
        }
    };

    static displayGold() {
        const gold = this._rewards.gold;
        if (gold > 0) {
            $gameMessage.add('\\.' + TextManager.obtainGold.format(gold));
        }
    };

    static displayDropItems() {
        const items = this._rewards.items;
        if (items.length > 0) {
            $gameMessage.newPage();
            for (const item of items) {
                $gameMessage.add(TextManager.obtainItem.format(item.name));
            }
        }
    };

    static gainRewards() {
        this.gainExp();
        this.gainGold();
        this.gainDropItems();
    };

    static gainExp() {
        const exp = this._rewards.exp;
        for (const actor of $gameParty.allMembers()) {
            actor.gainExp(exp);
        }
    };

    static gainGold() {
        $gameParty.gainGold(this._rewards.gold);
    };

    static gainDropItems() {
        for (const item of this._rewards.items) {
            $gameParty.gainItem(item, 1);
        }
    };
};

//-----------------------------------------------------------------------------

// PluginManager
//
// The static class that manages the plugins.
class PluginManager {
    static _path = 'js/plugins/';
    static _scripts = [];
    static _errorUrls = [];
    static _parameters = {};

    static setup(plugins) {
        for (const plugin of plugins) {
            if (plugin.status && !this._scripts.contains(plugin.name)) {
                this.setParameters(plugin.name, plugin.parameters);
                this.loadScript(plugin.name + '.js');
                this._scripts.push(plugin.name);
            }
        }
    };

    static checkErrors() {
        const url = this._errorUrls.shift();
        if (url) {
            throw new Error('Failed to load: ' + url);
        }
    };

    static parameters(name) {
        return this._parameters[name.toLowerCase()] || {};
    };

    static setParameters(name, parameters) {
        this._parameters[name.toLowerCase()] = parameters;
    };

    static loadScript(name) {
        const url = this._path + name;
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.async = false;
        script.onerror = this.onError.bind(this);
        script._url = url;
        document.body.appendChild(script);
    };

    static onError(e) {
        this._errorUrls.push(e.target._url);
    };
};

//=============================================================================