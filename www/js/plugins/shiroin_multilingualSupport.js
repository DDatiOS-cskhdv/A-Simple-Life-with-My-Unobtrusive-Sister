//=============================================================================
/*:
* @plugindesc 多语言适配
* @author shiroin
*/
//=============================================================================

// 修复新版本NWjs关闭程序的写法问题
SceneManager.exit = function () {
  if (window.nw && nw.App && nw.App.quit) {
    nw.App.quit();
  } else {
    window.close();
  }
};

const LANG_CODE   = ["CN", "JP", "EN", "RU", "FR", "VN", "ES", "PTBR", "KR", "ID", "TH", "UA"];
const IS_IMOUTO   = ["妹妹", "妹", "imouto", "sister", "sis", "сестра", "сестренка"];
const LANG_LOCALE = [
            { allowMemory:true,  titleLOGO: true,  titleOpt: true,  saveLoadConfirm: true,  saveLoadTips:true,  equipConfirm: true },   // CN
            { allowMemory:true,  titleLOGO: true,  titleOpt: true,  saveLoadConfirm: true,  saveLoadTips:true,  equipConfirm: true },   // JP
            { allowMemory:true,  titleLOGO: true,  titleOpt: true,  saveLoadConfirm: true,  saveLoadTips:true,  equipConfirm: true },   // EN
            { allowMemory:true,  titleLOGO: true,  titleOpt: true,  saveLoadConfirm: true,  saveLoadTips:true,  equipConfirm: true },   // RU
            { allowMemory:false, titleLOGO: false, titleOpt: false, saveLoadConfirm: false, saveLoadTips:false, equipConfirm: false},   // FR
            { allowMemory:true,  titleLOGO: false, titleOpt: false, saveLoadConfirm: true,  saveLoadTips:false, equipConfirm: true },   // VN
            { allowMemory:false, titleLOGO: false, titleOpt: false, saveLoadConfirm: false, saveLoadTips:false, equipConfirm: false},   // ES
            { allowMemory:true,  titleLOGO: false, titleOpt: false, saveLoadConfirm: false, saveLoadTips:false, equipConfirm: false},   // PTBR
            { allowMemory:false, titleLOGO: true,  titleOpt: false, saveLoadConfirm: false, saveLoadTips:false, equipConfirm: false},   // KR
            { allowMemory:false, titleLOGO: false, titleOpt: false, saveLoadConfirm: false, saveLoadTips:false, equipConfirm: false},   // ID
            { allowMemory:false, titleLOGO: false, titleOpt: false, saveLoadConfirm: false, saveLoadTips:false, equipConfirm: false},   // TH	
            { allowMemory:true,  titleLOGO: false, titleOpt: true,  saveLoadConfirm: true,  saveLoadTips:true,  equipConfirm: false}    // UA			
];
window.LANG_LOCALE = LANG_LOCALE;

// 系统功能文本需要最先载入
DataManager._databaseFiles.unshift({
  name: 'systemFeatureText',
  src: 'EN/systemFeatureText_EN.json'
});

DataManager.loadDataFile(
  'systemFeatureText',
  'EN/systemFeatureText_EN.json'
);
// --- 初始化 ---	
ConfigManager.language = 2;
ConfigManager.needsTC = false;
ConfigManager.scaleResolution = false;
ConfigManager.harmonyMode = false;
ConfigManager.FPS_LOCK_MODE = true;
ConfigManager.isImouto = false;
// --- 保存时写入 language ---
const _Config_makeData = ConfigManager.makeData;
ConfigManager.makeData = function () {
  const config = _Config_makeData.call(this);
  config.language = this.language;
  config.needsTC = this.needsTC;
  config.FPS_LOCK_MODE = this.FPS_LOCK_MODE;
  config.scaleResolution = this.scaleResolution;
  config.isImouto = this.isImouto;
  return config;
};
// --- 加载时应用 language：优先读配置，否则自动检测 ---
const _Config_applyData = ConfigManager.applyData;
ConfigManager.applyData = function (config) {
  _Config_applyData.call(this, config);
  if (config.language !== undefined) {
    this.language = Number(config.language);
    this.needsTC = config.needsTC;
    this.scaleResolution = config.scaleResolution;
    this.isImouto = config.isImouto;
    // 保险装置：以防触发小语种缺少对应语言UI素材的问题
	let allowed        = window?.LANG_LOCALE?.[this.language]?.allowMemory;
	if (!allowed)  this.language = 2;
    this.FPS_LOCK_MODE = config.FPS_LOCK_MODE;
  } else {
    // 第一次运行或未配置时，根据系统语言检测
    const nav = navigator.language.toLowerCase();
    if (nav.startsWith('zh')) this.language = 0;
    else if (nav.startsWith('ja')) this.language = 1;
	else if (nav.startsWith('ru')||nav.startsWith('uk')) this.language = 3;
    else if (nav.startsWith('vi')) this.language = 5;
    else this.language = 2;
  }
  // 适配系统语言修正默认字体
  if (ConfigManager.language === 0) {
    if (navigator.language.toLowerCase().includes('tw')) {
      DrillUp.g_DFF_fontFace = "未来圆SC";
    } else {
      DrillUp.g_DFF_fontFace = "Haiyanzhishidongdong";
    }
  } else {
    DrillUp.g_DFF_fontFace = "FOT-NewCinemaA Std D";
    //DrillUp.g_DFF_fontFace = "Huninn";
  }

  const ln = LANG_CODE[this.language] || "EN";

  /* 英文就不用再覆盖 */
  if (ln === "EN") return;

  /* 动态加载目标语言 JSON */
  const url = universalUrl + `data/${ln}/systemFeatureText_${ln}.json`;

  httpRequest(url, { responseType: "json" })
    .then(obj => {
      Object.assign(window.systemFeatureText || {}, obj);
    }).catch(e => {
      console.warn(`[MultiLang] 解析 ${url} 失败，继续使用英文基准`, e);
    });

  // --- 根据对应语言改变标题按钮贴图 ---
  let a = ['NEW_', 'LOAD_', 'SETTING_', 'CREDITS_', 'SUPPORT_', 'EXIT_'];
  let curLang = this.language;
  let allowed = window?.LANG_LOCALE?.[curLang]?.titleOpt;
  if (!allowed) curLang = 2;
  let ext = curLang === 0 && ConfigManager.needsTC ? `${curLang}tcn` : String(curLang);
  DrillUp.g_TSc_command_button["btn_src"] = a.map(function (s) { return String(s) + ext; });

  /*	
 if (DrillUp.g_TSc_command_button && !ConfigManager.editTitleButton) {
 ConfigManager.editTitleButton = true;  
 if (ConfigManager.language == 0) {
   let a = ['NEW_', 'LOAD_', 'SETTING_', 'CREDITS_', 'SUPPORT_', 'EXIT_'];			
   let ext = ConfigManager.needsTC ? "0tcn" : "0";
   DrillUp.g_TSc_command_button["btn_src"] = a.map(function(s){ return String(s) + ext; });
 }
 }
 */
};

// --- 根据 ConfigManager.language 加载对应语言的数据文件 ---
const _Data_loadDatabase = DataManager.loadDatabase;
DataManager.loadDatabase = function () {
  // 保证先把配置读进来（并执行 applyData）
  ConfigManager.load();
  //const lang = ConfigManager.language;
  const test = this.isBattleTest() || this.isEventTest();
  const prefix = test ? 'Test_' : '';
  for (let i = 0; i < this._databaseFiles.length; i++) {
    const name = this._databaseFiles[i].name;
    let src = this._databaseFiles[i].src;
    //if ( ['States.json'].includes(src) ) {
    // 从 GameLanguage文件夹读取
    //src = `GameLanguage${lang}/${src}`;
    //}
    this.loadDataFile(name, prefix + src);
  }
  if (this.isEventTest()) {
    this.loadDataFile('$testEvent', prefix + 'Event.json');
  }
};


const _DM_loadMapData = DataManager.loadMapData;
DataManager.loadMapData = function (mapId) {
  // 多语言适配
  let lang = ConfigManager.language;

  // 多语言模块建设完成前，以英语版为主
  if (lang > 3) lang = 2;

  if (mapId > 0) {

    const padded = String(mapId).padStart(3, '0');
    let filename = `Map${padded}.json`;
    // 还未提取完的部分
    const mapIdArray = [3, 7, 19, 20];
    if (mapIdArray.includes(mapId)) {
      filename = `GameLanguage${lang}/Map${padded}.json`;
    }
    // 开发者用
    if (Utils.isOptionValid("test")) filename = `Map${padded}.json`;

    this._mapLoader = ResourceHandler.createLoader(
      'data/' + filename,
      this.loadDataFile.bind(this, '$dataMap', filename)
    );
    this.loadDataFile('$dataMap', filename);

  } else {
    this.makeEmptyMap();
  }
};

//=============================================================================
// 适配QJ事件复制插件和多语言模块
//=============================================================================

DataManager.loadSpawnMapData = function (mapId) {
  if (mapId <= 0) return null;
  // 多语言适配
  const lang = ConfigManager.language;
  const padded = String(mapId).padStart(3, '0');
  //let src = `GameLanguage${lang}/Map${padded}.json`;
  let src = `Map${padded}.json`;

  const url = universalUrl + 'data/' + src;
  httpRequest(url, { responseType: 'json' })
    .then(data => {
      $dataSpawnMapList[mapId] = data;
      DataManager.onLoadSpawnMapData($dataSpawnMapList[mapId]);
    })
};


//=============================================================================
// 根据语言加载指定公共事件和场景物件语料库
//=============================================================================
var shiroin_Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function () {

  shiroin_Scene_Boot_start.call(this);
  // 运行环境检测
  this.detectLaunchEnvironment();
  (async () => {
    try {
      const [isSFW, isJP] = await Promise.all([
        DataManager.checkPlaceholderExists("SFW.json"),
        DataManager.checkPlaceholderExists("DLsite.json"),
      ]);

      if (isSFW) ConfigManager.harmonyMode = true;

      if (isJP || ConfigManager.harmonyMode || ConfigManager.isImouto) {
        ConfigManager.isImouto = true;
        if (DrillUp && DrillUp.g_COSt_list && DrillUp.g_COSt_list[119]) {
          DrillUp.g_COSt_list[119]['context'] = "妹";
        }
      }

      // 刷新语言有标记识别需要确保执行顺序
      DataManager.reloadLanguage(false);

    } catch (e) {
      console.error(e);
    }
  })();
  // 标记游戏版本号
  chahuiUtil.cacheCurrentGameVersion();
  // 手机端适配，需要使用更大号的UI
  if (Utils.isMobileDevice()) {

    if ($gameSystem._drill_SCo_list[12]) $gameSystem._drill_SCo_list[12]['enable'] = true;

    DrillUp.g_DOp_defaultStyleId = 9;
    $gameSystem._drill_DOp_curStyle = JSON.parse(JSON.stringify(DrillUp.g_DOp_list[8]));
    DrillUp.g_DOp_list[7]['fontSize'] = 28;
    DrillUp.g_COSB_btn[0] = DrillUp.g_COSB_btn[19];
    DrillUp.g_COSB_btn[20] = DrillUp.g_COSB_btn[21];
    //地图事件描述框
    DrillUp.g_MPFE_defaultStyle = 4;
    DrillUp.g_MPFE_fontsize = 20;
    DrillUp.g_MBB_default["style_id"] = 2;
    // 掉落物演出UI
    if (DrillUp.g_GFTH_style) {
      for (let i = 0; i < DrillUp.g_GFTH_style.length; i++) {
        if (i === 4) continue;
        const style = DrillUp.g_GFTH_style[i];
        if (!style) continue;
        style.regist_x = 1090;
        style.regist_y = 880;
      }
    }
  }

  $gameStrings.setValue(20, "");
  // 玩家不需要看见开关变量数据
  $dataSystem.variables.fill('きさま！見ているなッ！', 1);  // 索引0本来就是空
  $dataSystem.switches.fill('きさま！見ているなッ！', 1);

  const invisibleTasks = [
    // 玩家也不需要看见公共事件数据
    $dataCommonEvents,
    // 玩家也不需要看见状态数据
    $dataStates,
    // 玩家也不需要看见技能数据
    $dataSkills
  ];

  for (const tasks of invisibleTasks) {
    if (!tasks) continue;
    for (const task of tasks) {
      if (task) task.name = 'きさま！見ているなッ！';
    }
  }
};

Scene_Boot.prototype.detectLaunchEnvironment = async function () {
  if (!Utils.isNwjs || !Utils.isNwjs()) return;

  // 防止重复弹窗
  if (this._launchEnvChecked) return;
  this._launchEnvChecked = true;

  const os = require("os");
  const path = require("path");

  // 统一成小写 + 正斜杠
  const toNorm = (p) => String(p || "").replace(/\\/g, "/").replace(/\/+$/g, "").toLowerCase();

  // cwd 通常是 www, 用 rootDir 做提示更直观
  const getRootDir = () => {
    let cwd = "";
    try { cwd = process.cwd(); } catch (e) { cwd = ""; }
    if (!cwd) return "";
    const base = path.basename(cwd).toLowerCase();
    if (base === "www") return path.dirname(cwd);
    return cwd;
  };

  const tempRoot = toNorm(os.tmpdir());
  const cwdNorm  = toNorm(process.cwd());
  const rootDir  = getRootDir();
  const rootNorm = toNorm(rootDir);

  // 判断某路径是否在某根目录之下
  const isUnder = (dir, root) => {
    if (!dir || !root) return false;
    return dir === root || dir.indexOf(root + "/") === 0;
  };

  // 检测是否从临时目录启动(通常是直接从压缩包/临时解压启动)
  if (isUnder(cwdNorm, tempRoot)) {
    let lines = ["检测到游戏通过压缩包直接启动！", "请正常解压文件再启动游戏！"];
    if (ConfigManager.language > 0) {
      lines = [
        "Game detected as being launched directly from an archive!",
        "Please extract all files properly before running the game!"
      ];
    }
    await confirm (lines.join("\n"), { align: "left" });
    try { nw.App.quit(); } catch (e) { window.close(); }
    return;
  }

  // 先判断是否在系统盘（通常是 C:）。不在系统盘则直接跳过敏感路径检测。
  // 优先使用 SystemDrive（更准确），不行再退回 C:
  const sysDrive = (process.env.SystemDrive || "C:").toLowerCase(); // "C:"
  let rootDrive = "";
  try {
    // Windows: path.parse("C:\\Games\\X").root => "C:\\"
    rootDrive = (path.parse(rootDir).root || "").replace(/\\+$/g, ""); // "C:"
    rootDrive = rootDrive.toLowerCase();
  } catch (e) {
    rootDrive = "";
  }

  // 非 Windows 或取不到盘符时：不做“必须 C 盘”过滤
  const isWindows = process.platform === "win32";
  if (isWindows && rootDrive && rootDrive !== sysDrive) return;

  // 敏感路径检测: 命中只警告，不退出
  const riskyRules = [
    { key: "/onedrive/", reasonCN: "OneDrive 同步目录可能拦截写入", reasonEN: "OneDrive synced folders may block write access" },
    { key: "/program files/", reasonCN: "Program Files 通常需要管理员权限", reasonEN: "Program Files often requires admin permission" },
    { key: "/program files (x86)/", reasonCN: "Program Files 通常需要管理员权限", reasonEN: "Program Files often requires admin permission" },
    { key: "/windows/",  reasonCN: "系统目录不可写", reasonEN: "Windows system folders are not writable" }
  ];

  let hit = null;
  for (let i = 0; i < riskyRules.length; i++) {
    if (rootNorm.indexOf(riskyRules[i].key) !== -1) { hit = riskyRules[i]; break; }
  }

  if (hit) {
    let text = "";
    if (ConfigManager.language > 0) {
      text =
        "Warning: The game seems to be running in a restricted folder.\n" +
        "Saving settings or save files may fail.\n\n" +
        "Path:\n" + rootDir + "\n\n" +
        "Reason:\n" + hit.reasonEN + "\n\n" +
        "Suggestion:\n" +
        "Move the whole game folder to a normal location, for example:\n" +
        "D:/Games/YourGameName\n";
    } else {
      text =
        "警告: 检测到游戏可能运行在受限制的目录中。\n" +
        "可能导致无法保存设置或存档。\n\n" +
        "路径:\n" + rootDir + "\n\n" +
        "原因:\n" + hit.reasonCN + "\n\n" +
        "建议:\n" +
        "请将整个游戏文件夹移动到普通目录，例如:\n" +
        "D:/Games/YourGameName\n";
    }
    alert(text, { align: "left" });
  }
};

// 重置设置选项的显示并放置更新检查点
const _ST_update = Scene_Title.prototype.update;
Scene_Title.prototype.update = function () {
  _ST_update.call(this);
  // 只发一次 XHR
  if (this._commandWindow && this._commandWindow.isOpenAndActive()) {
    this._commandWindowInitialized = true;
  }
  if (!this._hasCheckedUpdate) {
    this._hasCheckedUpdate = true;
    // 确保语言选项始终是正常指向
    ConfigManager["String2"] = ConfigManager.language;
    // 重置锁60帧设置选项
    ConfigManager['Boolean2'] = ConfigManager.FPS_LOCK_MODE;
    // 低清模式
    ConfigManager['Boolean3'] = ConfigManager.scaleResolution;    
    this.autoUpdataCheck?.();
  }
};

//=============================================================================
// 地图事件多语言适配
//=============================================================================
var chahuiUtil = chahuiUtil || {};

// 检查地图数据是否真实存在
chahuiUtil.checkMapEventExists = function (mapId) {

  $gameSelfSwitches.setValue([$gameMap.mapId(), 2, 'D'], true);
  return;
  
  // 烂摊子的实验品，先放着
  if (!this || !mapId) return;

  const fs = require('fs');
  const path = require('path');
  // process.cwd() 在 NW.js 下就是游戏部署 exe 所在的目录
  const base = process.cwd();

  const filename = `Map${String(mapId).padStart(3, '0')}.json`;
  const file = path.join(base, 'data', filename);

  try {
    const json = fs.readFileSync(file, 'utf8');
    const map = JSON.parse(json);
    const eventId = this._eventId;
    if (map.events.length > 1) {
      $gameSelfSwitches.setValue([$gameMap.mapId(), eventId, 'D'], true);
    }
  } catch (e) {
    console.error('读取失败：', e);
  }
};

// 快捷显示原型事件文本  
Game_Interpreter.prototype.showPrototypeEventDialogue = function (type, idx, subIdx) {

  const key = "prototypeEventTemplate";
  const table = window[key] || {};
  const entry = table[type]?.[String(idx)];
  let textArray;

  if (subIdx !== undefined) {
    // 如果传了 subIdx，就取第二层
    const sub = entry?.[String(subIdx)];
    // 无论取到的是字符串还是对象，都要包成数组
    textArray = sub !== undefined ? [sub] : [];
  } else {
    // 原先的整体数组
    textArray = Array.isArray(entry) ? entry : [];
  }
  if (textArray.length === 0) {
    textArray = ["\\c[10]Text missing — unable to display!",
      "Please wait for a future update or switch back to the English version."
    ];
  }
  chahuiUtil.multilingualCompatibleDisplayText.call(this, textArray);
};

// 快捷显示公共事件文本
Game_Interpreter.prototype.showCommonEventDialogue = function (type, idx, subIdx, extra={}) {


  const key = "mapCommonEventDialogue";
  const table = window[key] || {};
  const entry = table[type]?.[String(idx)];
  let textArray;

  if (subIdx !== undefined) {
    // 如果传了 subIdx，就取第二层
    const sub = entry?.[String(subIdx)];
    // 无论取到的是字符串还是对象，都要包成数组
    textArray = sub !== undefined ? [sub] : [];
  } else {
    // 原先的整体数组
    textArray = Array.isArray(entry) ? entry : [];
  }
  
  if (extra.cookingSystemCompatibility) {
    // 料理环节特殊适配
    let slot = $gameVariables.value($gameVariables.value(85));
    let ii   = `\\ii[${slot}]\\c[0]`;
    textArray = textArray.map(t => t.replace("\\ii[\\v[\\v[85]]]", ii));
    textArray = textArray.map(t => t.replace("\\ii[\\v[85]]", ii));
  }

  if (textArray.length === 0) {
    textArray = ["\\c[10]Text missing — unable to display!",
      "Please wait for a future update or switch back to the English version."
    ];
  }  
  chahuiUtil.multilingualCompatibleDisplayText.call(this, textArray);
};

// 快捷显示地图事件文本
Game_Interpreter.prototype.showMapEventDialogue = function (idx, subIdx, setEventId, extra= {}) {

  if ($gameTemp._forceSkipText) {
    // 跳过文本显示，为纯动画演出流程而实验的功能
    return;
  }

  // 修改对话框样式
  if (!$dataMap.note.includes("<深渊>") && $gameSystem._drill_DOp_curStyle.id !== 1) {
    $gameSystem._drill_DOp_curStyle = JSON.parse(JSON.stringify(DrillUp.g_DOp_list[0]));
    $gameSystem._drill_DSk_messageStyleId = 3;
  }

  let eid = String(this._eventId);
  if (setEventId) eid = String(setEventId);
  let mapId = $gameMap.mapId();
  // 检测是否为复制事件
  let event = $gameMap.event(this._eventId);
  if (event && event._sourceeventId) {
    eid = event._sourceeventId;
    mapId = event._sourceMapId;
  }

  const key = `MapEventDialogue${mapId}`;
  const table = window[key] || {};
  const entry = table[eid]?.[String(idx)];
  let textArray;

  if (subIdx !== undefined) {
    // 如果传了 subIdx，就取第二层
    const sub = entry?.[String(subIdx)];
    // 无论取到的是字符串还是对象，都要包成数组
    textArray = sub !== undefined ? [sub] : [];
  } else {
    // 原先的整体数组
    textArray = Array.isArray(entry) ? entry : [];
  }

  /* ---------- 如果没取到 & 未重试过 ---------- */
  if (textArray.length === 0) {
    //chahuiUtil.loadMapEventDialogue(2); 	
    textArray = ["\\c[10]Text missing — unable to display!",
      "The language you selected has not been fully translated yet.",
      "Please wait for a future update or switch back to the English version. "
    ];
  }

  chahuiUtil.multilingualCompatibleDisplayText.call(this, textArray, false, extra);
};

// 重置语言标记
chahuiUtil.resetSystemLanguageFlag = function () {
  let titleText = $dataSystem.gameTitle;
  if (titleText.includes("和存在感薄弱")) {
    $gameVariables.setValue(1, 0);
  } else if (titleText.includes("存在感薄い")) {
    $gameVariables.setValue(1, 1);
  } else {
    $gameVariables.setValue(1, 2);
  }
};

// 多语言适配显示文本
chahuiUtil.multilingualCompatibleDisplayText = function (textArray, isBlackBackground, extra = {}) {
  /*
 // $gameSystem._drill_VIMC_curSound = 0;	
 // 喵的诅咒
 let meowCurse = false;
 if (meowCurse) {  
    textArray = chahuiUtil.meowifyArrayCapped(textArray);
   if ( textArray.some( s => typeof s === 'string' && s.includes("\\nl< >")) ) {
     // $gameSystem._drill_VIMC_curSound = 1;
   }
 }
 */

  // 基本设置：清头像区、背景、位置
  let type = 0;
  if (isBlackBackground) type = 1;
  $gameMessage.setFaceImage('', 0);
  $gameMessage.setBackground(type);
  $gameMessage.setPositionType(2);

  // 每页最多显示 4 行
  let maxLines = 4;
  const chunks = [];
  for (let i = 0; i < textArray.length; i += maxLines) {
    chunks.push(textArray.slice(i, i + maxLines));
  }

  let waitFrames = 0;
  if (extra.waitTime) {
    waitFrames = Number(extra.waitTime);
    if (!isFinite(waitFrames) || waitFrames < 0) waitFrames = 0;
    waitFrames = Math.floor(waitFrames);
  }

  chunks.forEach(function (lines, pageIndex) {
    if (pageIndex > 0) {
      // 非第一页，先插入翻页符
      $gameMessage.add('\f');
    }
    let text = lines.join('\n');
    // 只在最后一页末尾追加等待，确保文本显示完才延迟
    if (waitFrames > 0 && pageIndex === chunks.length - 1) {
      text += "\\w[" + waitFrames + "]  ";
    }	
    $gameMessage.add(text);
  });
  // 选项适配
  if (!this._preventOptionDisplay && this.nextEventCode() === 102) {
    this._index++;
    this.setupChoices(this.currentCommand().parameters);
  }
  this.setWaitMode('message');
  this._preventOptionDisplay = undefined;
};

// 居中警告文本演出
Game_Interpreter.prototype.showMapEventCenterWarningText = function (idx, subIdx) {

  let eid = String(this._eventId);
  let mapId = $gameMap.mapId();
  // 检测是否为复制事件
  let event = $gameMap.event(this._eventId);
  if (event._sourceeventId) {
    eid = event._sourceeventId;
    mapId = event._sourceMapId;
  }

  const key = `MapEventDialogue${mapId}`;
  const table = window[key] || {};
  const entry = table[eid]?.[String(idx)];
  let textArray;

  if (subIdx !== undefined) {
    // 如果传了 subIdx，就取第二层
    const sub = entry?.[String(subIdx)];
    // 无论取到的是字符串还是对象，都要包成数组
    textArray = sub !== undefined ? [sub] : [];
  } else {
    // 原先的整体数组
    textArray = Array.isArray(entry) ? entry : [];
  }
  /* ---------- 如果没取到 & 未重试过 ---------- */
  if (textArray.length === 0) {
    textArray = ["\\c[10]Text missing — unable to display!",
      "The language you selected has not been fully translated yet.",
      "Please wait for a future update or switch back to the English version. "
    ];
  }
  // 附加居中效果转义字符		
  let template = "\\dac\\c[2]\\px[-150]%TEXT%";
  textArray = textArray.map(t => template.replace("%TEXT%", t));
  // 调整文本排版
  const n = textArray.length;                 // 实际行数
  const py = n < 5 ? `${2*(5 - n)}0` : "15";       // 不足5行就上移，够5行固定15
  textArray[0] = `\\py[${py}]\\{` + textArray[0];
  chahuiUtil.multilingualCompatibleDisplayText.call(this, textArray, true);
};

// 妹妹气泡文字演出
Game_Interpreter.prototype.showChibiBubbleText = function (idx, extra = { x: 960, y: 400, time: 180 }) {

  const scene = SceneManager._scene;
  if (scene && scene._drill_GFTT_windowTank) {
    for (const w of scene._drill_GFTT_windowTank) {
      w._drill_destroyed = true;
    }
  }

  let eid = String(this._eventId);
  let mapId = $gameMap.mapId();
  // 检测是否为复制事件
  let event = $gameMap.event(this._eventId);
  if (event._sourceeventId) {
    eid = event._sourceeventId;
    mapId = event._sourceMapId;
  }

  const key = `MapEventDialogue${mapId}`;
  const table = window[key] || {};
  const entry = table[eid]?.[String(idx)];
  let textArray = Array.isArray(entry) ? entry : [];

  if (textArray.length === 0) {
    textArray = ["Text missing — unable to display!"];
  }
  textArray[0] = "\\cc[#d2d2d1]\\dDCOG[1:0:0:0]" + textArray[0];
  let text = textArray.join();
  let typeId = 7;
  if (ConfigManager.language > 0) typeId = 8;
  $gameTemp.drill_GFTT_setBuffer(typeId, 7);
  $gameTemp.drill_GFTT_setStyle_context(text);
  $gameTemp.drill_GFTT_createByBuffer([extra.x, extra.y], extra.time);
  let waitTime = extra.time + 20;
  textArray[0] = `\\w[${waitTime}]\\^`;
  chahuiUtil.multilingualCompatibleDisplayText.call(this, textArray);
};

// 抖动动画文本演出
Game_Interpreter.prototype.showMapEventShakeText = function (idx, subIdx, extraData = {}) {

  let eid = String(this._eventId);
  let mapId = $gameMap.mapId();
  // 检测是否为复制事件
  let event = $gameMap.event(this._eventId);
  if (event._sourceeventId) {
    eid = event._sourceeventId;
    mapId = event._sourceMapId;
  }

  const key = `MapEventDialogue${mapId}`;
  const table = window[key] || {};
  const entry = table[eid]?.[String(idx)];
  let textArray;

  if (subIdx !== undefined) {
    // 如果传了 subIdx，就取第二层
    const sub = entry?.[String(subIdx)];
    // 无论取到的是字符串还是对象，都要包成数组
    textArray = sub !== undefined ? [sub] : [];
  } else {
    // 原先的整体数组
    textArray = Array.isArray(entry) ? entry : [];
  }

  /* ---------- 如果没取到 & 未重试过 ---------- */
  if (textArray.length === 0) {
    textArray = ["\\c[10]Text missing — unable to display!",
      "The language you selected has not been fully translated yet.",
      "Please wait for a future update or switch back to the English version. "
    ];
  }
  // 附加抖动效果转义字符	
  let extra = '';
  if (extraData.colorCode)  extra = extraData.colorCode;
  let template = `${extra}\\{\\dDCCE[文本[%TEXT%]:预设[11]]\\}`;
  textArray = textArray.map(t => t.replace("\\{", "")); // 兜底: 字符块效果内不能出现特定转义字符
  textArray = textArray.map(t => template.replace("%TEXT%", t));
  // 自动结束文本
  let length = textArray.length - 1;
  let waitTime = 240;
  if (extraData.waitTime)  waitTime = extraData.waitTime;  
  textArray[length] += `\\w[${waitTime}]\\^`;
  chahuiUtil.multilingualCompatibleDisplayText.call(this, textArray);
};


// 为防止坏档或读档失败而采取的措施
const _DM_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function (contents) {
  _DM_extractSaveContents.call(this, contents);

  if (!$gameMap) return;
  // 清除子弹数据防止找不到函数索引报错
  $gameMap._mapBulletsQJ = {};
  $gameMap._mapBulletsNameQJ = {};
  $gameMap._mapBulletsQJLength = 0;
  // 因多语言模块不写入存档，每次读档必须重新加载
  const allowMap = [4, 11, 21, 24, 54];
  const mapId = $gameMap.mapId();
  if (allowMap.includes(mapId)) {
    const key = 'MapEventDialogue' + mapId;
    if (!window[key]) {
      chahuiUtil.loadMapEventDialogue();
    }
  }
  // 初始化游玩时间统计
  let time = Math.round(performance.now());
  $gameSystem._startTime = time;

};

// 检测占位符标记
DataManager.checkPlaceholderExists = function (fileName) {
  fileName = fileName || 'Map001.json';

  // ① NW.js（PC）：用 Node fs，避免任何网络请求/404日志
  if (Utils.isNwjs && Utils.isNwjs()) {
    try {
      const fs = require('fs');
      const path = require('path');
      const base = path.dirname(process.mainModule.filename); // 游戏根目录（含 www）
      // 兼容两种目录结构：根/www/data 与根/data
      let p = path.join(base, 'www', 'data', fileName);
      if (!fs.existsSync(p)) p = path.join(base, 'data', fileName);
      return Promise.resolve(fs.existsSync(p));
    } catch (e) {
      // 极端情况下（被沙箱限制等）继续走回退逻辑
    }
  }

  // ②Cordova/Android：不读取文件内容，只校验URL是否可解析
  if (window.cordova && window.resolveLocalFileSystemURL && cordova.file && cordova.file.applicationDirectory) {
    const url = cordova.file.applicationDirectory + 'www/data/' + fileName;
    return new Promise(res => {
      window.resolveLocalFileSystemURL(url, () => res(true), () => res(false));
    });
  }

  // ③ 其它环境：回退到 XHR
  return new Promise((resolve) => {
    let settled = false;
    const done = (v) => { if (!settled) { settled = true; resolve(v); } };

    httpRequest('data/' + fileName, {
      timeout: 8e3,
      ontimeout: () => done(false),
    })
      .then(text => {
        if (!text) return done(false);
        done(true);
      })
      .catch(() => done(false));
  });
};

// 根据语言重置数据库信息
DataManager.updateLocalizedNames = async function () {

  // 检测到法语系统，提醒切换AZERTY键盘
  if (!Utils.isMobileDevice()) {
    const nav = navigator.language.toLowerCase();
    if (nav.includes('fr') && $gameSystem._drill_OKe_keyboard_ok.includes("z")) {
      let textArray = ["Système en français détecté. Si vous utilisez un clavier en disposition AZERTY,",
        "le jeu adaptera automatiquement les touches de déplacement en ZQSD.",
        "Voulez-vous appliquer ce changement immédiatement ?"];
      let text = textArray.join('\n');
      const ask = await confirm(text);
      if (ask) {
        DrillUp.drill_OKe_addStringInList($gameSystem._drill_OKe_keyboard_up, "z");
        DrillUp.drill_OKe_addStringInList($gameSystem._drill_OKe_keyboard_left, "q");
        $gameSystem._drill_OKe_keyboard_ok = DrillUp.drill_OKe_removeStringInList($gameSystem._drill_OKe_keyboard_ok, "z");
        $gameSystem._drill_OKe_keyboard_pageup = DrillUp.drill_OKe_removeStringInList($gameSystem._drill_OKe_keyboard_pageup, "q");
        $gameSystem._drill_OKe_keyboard_up = DrillUp.drill_OKe_removeStringInList($gameSystem._drill_OKe_keyboard_up, "w");
        $gameSystem._drill_OKe_keyboard_left = DrillUp.drill_OKe_removeStringInList($gameSystem._drill_OKe_keyboard_left, "a");
        $gameTemp.drill_OKe_keyboardKeys_RefreshData();
        $gameTemp.drill_OKe_keyboardKeys_RefreshMapper();
      }
    }
  }

  // 还原正常版本
  if (ConfigManager.isImouto || DrillUp.g_COSt_list[119]['context'] !== "Mio") {
    let heroineName = window.systemFeatureText.heroineName || "Imouto";
    $gameStrings.setValue(120, String(heroineName));
    $gameVariables.setValue(10, String(heroineName));
    $gameSwitches.setValue(332, true);
    let heroName = window.systemFeatureText.heroName || "onii-chan";
    $gameStrings.setValue(121, String(heroName));
  }
  const name = $gameStrings.value(120);
  DrillUp.g_DNB_nameBox_suffix = `\\fb\\dDCOG[8:6:0:0]${name}`;
  if (TZ.hasTraditional(name)) {
    DrillUp.g_DNB_nameBox_suffix = `\\fn[未来圆SC]\\fb\\dDCOG[8:6:0:0]${name}`;
  }

  // 状态
  const sd = window.statesDescription || {};
  const states = $dataStates;
  for (let n = 1; n < states.length; n++) {
    const obj = states[n];
    if (!obj) continue;
    const entry = sd[obj.id] || {};
    let textArray = [];

    if (entry.subtitle && entry.subtitle.length >= 1 && entry.subtitle[0] !== "") {
      let subtitleArray = entry.subtitle;
      let template = "\\c[110]\\fi%TEXT%\\fr";
      subtitleArray = subtitleArray.map(t => template.replace("%TEXT%", t));
      textArray.push(...subtitleArray);
    }
    if (entry.description && entry.description.length >= 1 && entry.description[0] !== "") {
      let descriptionArray = entry.description;
      textArray.push(...descriptionArray);
    }
    obj.description = textArray.join("\n");
  }

  // 物品
  for (let i = 1; i < $dataItems.length; i++) {
    const desc = window.itemsDescription[String(i)];
    if (desc && desc.name) {
      $dataItems[i].name = desc.name.join();
    }
  }
  // 武器
  for (let i = 1; i < $dataWeapons.length; i++) {
    const desc = window.weaponsDescription[String(i)];
    if (desc && desc.name) {
      $dataWeapons[i].name = desc.name.join();
    }
  }
  // 装备
  for (let i = 1; i < $dataArmors.length; i++) {
    const desc = window.armorsDescription[String(i)];
    if (desc && desc.name) {
      $dataArmors[i].name = desc.name.join();
    }
  }

  function getLocalizedName(descObj, id) {
    const entry = descObj?.[String(id)];
    if (!entry?.name) return null;
    return typeof entry.name === 'string'
      ? entry.name
      : Array.isArray(entry.name) && entry.name.length
        ? entry.name.join('')
        : null;
  }

  function refreshNames(dataArray, descObj) {
    if (!Array.isArray(dataArray)) return;
    dataArray.forEach(item => {
      // —— 跳过空值或没有 baseItemId 的条目 —— 
      if (!item || item.baseItemId == null) return;

      const newName = getLocalizedName(descObj, item.baseItemId);
      if (newName) {
        item.name = newName;
      }
    });
  }

  refreshNames(DataManager._independentWeapons, window.weaponsDescription);
  refreshNames(DataManager._independentArmors, window.armorsDescription);
};

DataManager.convertTitleToImouto = function () {
    let rawTitle = window.systemFeatureText.gameTitle;
    let titleStr = Array.isArray(rawTitle) ? rawTitle.join("") : String(rawTitle);
    let newTitle = titleStr
        .replace(/少女/g, "妹妹")
        .replace(/彼女/g, "妹")
        .replace(/girl/gi, "Sister")
		    .replace(/девушкой/gi, "сестрой");
    window.systemFeatureText.gameTitle = [newTitle];
    /* 确保标记始终存在 */
    ConfigManager.isImouto = true; 
};

DataManager.reloadLanguage = async function (needSave = false, needTC = false) {

  let needTW = false;
  const curLang = ConfigManager.language;
  const nav = navigator.language.toLowerCase();
  // 自动繁化
  if ((nav.includes('tw') && curLang == 0) || needTC || (ConfigManager.needsTC && curLang == 0)) needTW = true;

  if (needSave) ConfigManager.save();

  const key = LANG_CODE[curLang] ?? "EN";
  /* ① 先保证 systemFeatureText 已加载目标语言 ---------------- */
  await extraJsonLoad(
    'systemFeatureText',                           // 变量名
    `data/${key}/systemFeatureText_${key}.json`,   // 可能缺；函数内部会 fallback
    undefined,
    needTW
  );

  const sysText = window.systemFeatureText;
  if (sysText) {
    const ln = String(curLang);

    /* 自动修改女主角认知 */
    const raw = $gameVariables.value(10);
    const input = raw != null ? String(raw).toLowerCase() : "";
    let isImouto = IS_IMOUTO.some(keyword =>
      input.includes(keyword.toLowerCase())
    );
    if (ConfigManager.isImouto || DrillUp.g_COSt_list[119]['context'] !== "Mio") isImouto = true;

    if (isImouto) DataManager.convertTitleToImouto();
    /* 刷新音量设置文本 */
    $dataSystem.terms.messages.bgmVolume = sysText.BgmVolume;
    $dataSystem.terms.messages.bgsVolume = sysText.BgsVolume;
    $dataSystem.terms.messages.seVolume = sysText.SeVolume;

    /* 刷新自定义选项文本 */
    ConfigManager.customParams = null;
    ConfigManager.getCustomParams();

    /* 刷新游戏标题 */
    const ver = ($dataSystem.gameTitle.match(/(ver[\d.]+[A-Za-z]*)$/i) || [])[1] || "";
    $dataSystem.gameTitle = sysText.gameTitle + (ver ? ` ${ver}` : "");
    document.title = $dataSystem.gameTitle;
    console.log(
      "%c" + `🌸 ${document.title} 🌸`,
      `
        background: linear-gradient(90deg, #ffeaf3 0%, #ffb6d5 40%, #ff7aa2 70%, #e6457a 100%);
        color: #fff;
        font-weight: 800;
        font-size: 18px;
        padding: 6px 16px;
        border-radius: 12px;
        letter-spacing: 1.2px;
        font-family: 'Segoe UI', 'Noto Sans TC', sans-serif;
        text-shadow:
          0 0 4px #ff7aa2,
          0 0 8px #ff7aa2,
          0 0 12px #e6457a,
          0 0 18px #e6457a;
      `
    );
    if (window.nw?.Window) nw.Window.get().title = document.title;
  }

  /* 刷新标题选项贴图    */

  let a = ['NEW_', 'LOAD_', 'SETTING_', 'CREDITS_', 'SUPPORT_', 'EXIT_'];
  let ext = curLang == 0 && ConfigManager.needsTC ? `${curLang}tcn` : String(curLang);
  if (window?.LANG_LOCALE?.[curLang]?.titleOpt) {
    DrillUp.g_TSc_command_button["btn_src"] = a.map(function (s) { return String(s) + ext; });
  } else {
    DrillUp.g_TSc_command_button["btn_src"] = a.map(function (s) { return String(s) + "2"; });
  }

  /* 根据系统语言刷新字体使用格式 */
  if (window.DrillUp) {
    switch (curLang) {
      case 0:		   // 中文
        if (needTW) {
          DrillUp.g_DFF_fontFace = "未来圆SC";
          Graphics._createFontLoader(DrillUp.g_DFF_fontFace);
        } else {
          DrillUp.g_DFF_fontFace = "Haiyanzhishidongdong";
        }
        break;

      case 1:                             // 日语
      case 2:                             // 英语
      case 7:                             // 巴西葡萄牙语 	  
        DrillUp.g_DFF_fontFace = "FOT-NewCinemaA Std D";
        break;
      case 5:                             // 越南语 
        DrillUp.g_DFF_fontFace = "Mali";
        Graphics._createFontLoader(DrillUp.g_DFF_fontFace);
        break;
      case 8:                             // 韩语 
        DrillUp.g_DFF_fontFace = "NanumGothic";
        Graphics._createFontLoader(DrillUp.g_DFF_fontFace);
        break;
      default:                            // 其他小语种
        DrillUp.g_DFF_fontFace = "Huninn";
        Graphics._createFontLoader(DrillUp.g_DFF_fontFace);
    }
  }
  if ($gameMap && $gameMap.mapId() > 0) {
    const mark = 'MapEventDialogue' + $gameMap.mapId();
    if (window[mark]) chahuiUtil.loadMapEventDialogue();
	  chahuiUtil.clearOtherMapEventDialogueCache(); // 清理掉其他地图的缓存文本
  }

  /*  批量加载多语 JSON --------------------------------------*/
  if (curLang > 2) {
	  await Promise.all([
		extraJsonLoad('dataSceneObjectDescriptionText', `data/EN/sceneObjectDescriptionText_EN.json`, undefined, needTW),
		extraJsonLoad('mapCommonEventDialogue', `data/EN/MapCommonEventDialogueEN.json`, undefined, needTW),
		extraJsonLoad('systemFeatureText', `data/EN/systemFeatureText_EN.json`, undefined, needTW),
		extraJsonLoad('prototypeEventTemplate', `data/EN/MapEventDialogueEN001.json`, undefined, needTW),
		extraJsonLoad('skillDescription', `data/EN/skillDescriptionEN.json`, undefined, needTW),
		extraJsonLoad('itemsDescription', `data/EN/ItemsDescriptionEN.json`, undefined, needTW),
		extraJsonLoad('weaponsDescription', `data/EN/WeaponsDescriptionEN.json`, undefined, needTW),
		extraJsonLoad('armorsDescription', `data/EN/ArmorsDescriptionEN.json`, undefined, needTW),
		extraJsonLoad('statesDescription', `data/EN/statesDescriptionEN.json`, undefined, needTW)
	  ]);  
  }
  
  await Promise.all([
    extraJsonLoad('dataSceneObjectDescriptionText', `data/${key}/sceneObjectDescriptionText_${key}.json`, undefined, needTW),
    extraJsonLoad('mapCommonEventDialogue', `data/${key}/MapCommonEventDialogue${key}.json`, undefined, needTW),
    extraJsonLoad('systemFeatureText', `data/${key}/systemFeatureText_${key}.json`, undefined, needTW),
    extraJsonLoad('prototypeEventTemplate', `data/${key}/MapEventDialogue${key}001.json`, undefined, needTW),
    extraJsonLoad('skillDescription', `data/${key}/skillDescription${key}.json`, undefined, needTW),
    extraJsonLoad('itemsDescription', `data/${key}/ItemsDescription${key}.json`, undefined, needTW),
    extraJsonLoad('weaponsDescription', `data/${key}/WeaponsDescription${key}.json`, undefined, needTW),
    extraJsonLoad('armorsDescription', `data/${key}/ArmorsDescription${key}.json`, undefined, needTW),
    extraJsonLoad('statesDescription', `data/${key}/statesDescription${key}.json`, undefined, needTW)
  ]);
  DataManager.loadSpawnMapData(1);
  if (needSave) {
    setTimeout(() => DataManager.updateLocalizedNames(), 500);
  }
};

/*───────────────────────────────────────────────────────────────────
  为兼容更多语言，优先读取英语，然后覆盖正在选择的语言模块，可兼容未完成的文本
 *──────────────────────────────────────────────────────────────────*/
function extraJsonLoad(targetVar, url, { fallback = {} } = {}, needTW) {
  return new Promise(resolve => {

    const prev = window[targetVar] || {};          // 先保存旧内容
    url = universalUrl + url;

    httpRequest(url, {
      onload(xhr) {
        try {
          let text = xhr.responseText;
          if (needTW && ConfigManager.language === 0) {
            text = window.cn2tw(text);
          }
          const data = JSON.parse(text);
          window[targetVar] = Object.assign(prev, data); // 合并到旧内容
        } catch (e) {
          console.warn(`[extraJsonLoad] JSON parse error in ${url}`, e);
          window[targetVar] = prev;                          // 回滚
        }
        resolve(window[targetVar]);
      }
    }).catch(() => {
      console.warn(`[extraJsonLoad] Missing ${url} → keep previous`);                         
      resolve(prev);
    });
  });
}

window.chahuiUtil = window.chahuiUtil || {};

chahuiUtil.loadMapEventDialogue = async function (Specified, mapId, extra = {}) {

  let needTW = false;
  if (extra.needTW || ConfigManager.needsTC) needTW = true;

  if (!Specified) Specified = ConfigManager.language;

  let mapIdRaw = mapId ? mapId : $gameMap.mapId();                
  const mapIdPad = String(mapIdRaw).padStart(3, '0'); 
  const key = `MapEventDialogue${mapIdRaw}`;     

  // 小语种默认优先加载英语
  if (Specified > 2) {
    await extraJsonLoad(key, `data/EN/MapEventDialogueEN${mapIdPad}.json`, {});
  }

  // ② 目标语言（可能缺）
  const ln = LANG_CODE[Specified] || "EN";
  extraJsonLoad(key, `data/${ln}/MapEventDialogue${ln}${mapIdPad}.json`, undefined, needTW);

};

// 清空除当前地图外的所有 MapEventDialogueXXX 缓存
chahuiUtil.clearOtherMapEventDialogueCache = function(keepMapId) {
  keepMapId = (keepMapId != null) ? keepMapId : ($gameMap ? $gameMap.mapId() : 0);
  let keepKey = 'MapEventDialogue' + keepMapId;
  let re = /^MapEventDialogue\d+$/;

  for (let k in window) {
    if (!Object.prototype.hasOwnProperty.call(window, k)) continue;
    if (!re.test(k)) continue;
    if (k === keepKey) continue;

    try { delete window[k]; } catch (e) { window[k] = undefined; }
  }
};

// 动态变化状态描述文本
DataManager.changeDifferenceStateDescription = function (id, index) {
  const obj = $dataStates[id];
  const sd = window.statesDescription[String(id)]["variants"];
  const entry = sd[String(index)] || {};
  let textArray = [];

  if (entry.subtitle && entry.subtitle.length >= 1 && entry.subtitle[0] !== "") {
    let subtitleArray = entry.subtitle;
    let template = "\\c[110]\\fi%TEXT%\\fr";
    subtitleArray = subtitleArray.map(t => template.replace("%TEXT%", t));
    textArray.push(...subtitleArray);
  }
  if (entry.description && entry.description.length >= 1 && entry.description[0] !== "") {
    let descriptionArray = entry.description;
    textArray.push(...descriptionArray);
  }
  obj.description = textArray.join("\n");
};


/* 乱码混淆 */
(() => {

  /* ---------- 乱码字符池 ---------- */
  const POOLS = [
    [...'ｦｧｨｩｪｫｬｭｮｯﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓ'],
    [...'БГДЖЙЛПФЩЪЫЬ'],
    [...'ΔΞΠΣΦΨΩΘΛΓ'],
    [...'辟ｶ閠鯉ｼ悟叉萓ｿ蜿ｪ譏ｯ霑吝ｾｮ荳崎ｶｳ驕鍋噪谿句桃鬲費ｼ檎ｻ晞撼閭ｽ豁｣遑ｮ譏ｾ遉ｺ荳堺ｼ壻ｹｱ遐りｿ呎弍蝗蜃｡'],
    [...'莠ｺ謇閭ｽ霓ｻ譏灘小蜚､窶披霑吩ｸｪ鬘ｵ髱｢荳ｻ隕∫畑譚･隗ょｯ滉ｸ谿ｵ譁'],
    [...'餈嗘葵憿菟𢒰銝餉賣迤蝖格遬蝷箔堒銁蝻𣇉糓隞冊摮㛖泵銝'],
    [...'abcdefghijklmnopqrstuvwxyz'],
    [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']
  ];

  function garbleOne(str) {
    let out = '';
    for (const ch of str) {
      if (/[\s]/.test(ch)) { out += ch; continue; }

      const pool = POOLS[Math.floor(Math.random() * POOLS.length)];
      out += pool[Math.floor(Math.random() * pool.length)];
    }
    return out;
  }

  /** garble(textOrArray) → 同类型乱码 */
  function garble(input) {
    return Array.isArray(input)
      ? input.map(s => garbleOne(String(s)))
      : garbleOne(String(input));
  }

  // 导出到全局
  if (typeof module !== 'undefined') module.exports = garble;
  else window.garble = garble;

})();



// 优化设置界面不同语言的显示效果
(function () {

  const GAP = 100;                               // 额外间距值

  Window_Options.prototype.windowWidth = function () {
    let value = 500;
    if (ConfigManager.language > 1) value = 640;   // 中日语不提升窗口宽度
    return value;
  };

  const _drawItem = Window_Options.prototype.drawItem;
  Window_Options.prototype.drawItem = function (index) {

    const title = this.commandName(index);
    const status = this.statusText(index);
    const rect = this.itemRectForText(index);
    const sw = this.statusWidth();

    // 标题区域 = 总宽 - 数值宽 - GAP
    let tw = rect.width - sw - GAP;
    if (ConfigManager.language <= 1) tw += GAP;

    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(title, rect.x, rect.y, tw);
    this.drawText(status, rect.x, rect.y, rect.width, 'right');
  };

})();



//修改了item描述的显示格式
Window_Help.prototype.setItem = function (item) {

  if (item) {
    const combinedText = DataManager.isSkill(item)
      ? QJ.MPMZ.tl.ex_playerSetSkillDescription(item)
      : QJ.MPMZ.tl.ex_playerSetItemDescription(item);
    this.setText(combinedText);
	this.refresh();
  } else {
    this.setText("");
  }

};

// 修改妹妹名称/改名
chahuiUtil.customizeImoutoName = async function (oldSave) {

  let textArray = window.systemFeatureText && window.systemFeatureText.renameCharacter;
  if (!textArray) textArray = ["I remember now—", "she is..."];

  if (oldSave) {
    switch (ConfigManager.language) {
      case 0:
        textArray.push("（请重新设定你对女主角的称呼！）");
        break;
      case 1:
        textArray.push("（ヒロインの呼び方をもう一度設定してください！）");
        break;
      case 2:
      default:
        textArray.push("(Please reassign how you refer to the heroine!)");
        break;
    }
  }
  let text = Array.isArray(textArray) ? textArray.join("\n") : (textArray ?? "");

  let ss = await prompt(text, $gameStrings.value(120));
  if (ss == null) {
    chahuiUtil.customizeImoutoName();
    return false;
  }
  //if ( ss != undefined ) {

  // 加权长度计算：汉字/假名算 2，其它算 1
  const weightedLength = str => {
    let len = 0;
    const reWide = /[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF\u3040-\u309F\u30A0-\u30FF\uFF66-\uFF9F]/;
    for (const ch of str) {
      len += reWide.test(ch) ? 2 : 1;
    }
    return len;
  };
  // 超过 8 点位，重新输入
  if (weightedLength(ss) > 8 || weightedLength(ss) <= 0) {
    chahuiUtil.customizeImoutoName();
    return false;
  }

  $gameSwitches.setValue(332, true);
  $gameStrings.setValue(120, ss);
  $gameVariables.setValue(10, ss);
  DrillUp.g_DNB_nameBox_suffix = `\\fb\\dDCOG[8:6:0:0]${ss}`;
  if (TZ.hasTraditional(ss)) {
    DrillUp.g_DNB_nameBox_suffix = `\\fn[未来圆SC]\\fb\\dDCOG[8:6:0:0]${ss}`;
  }

  // }

  /* 自动修改女主角认知 */
  const raw = $gameVariables.value(10);
  const input = raw != null ? String(raw).toLowerCase() : "";
  const isImouto = IS_IMOUTO.some(keyword =>
    input.includes(keyword.toLowerCase())
  );
  if (isImouto) {
    DataManager.convertTitleToImouto();
    /* 刷新游戏标题 */
    const ver = ($dataSystem.gameTitle.match(/(ver[\d.]+[A-Za-z]*)$/i) || [])[1] || "";
    $dataSystem.gameTitle = window.systemFeatureText.gameTitle + (ver ? ` ${ver}` : "");
    document.title = $dataSystem.gameTitle;
    if (window.nw?.Window) nw.Window.get().title = document.title;
    /* 自动修改男主角认知 */
    let heroName = window.systemFeatureText.heroName || "onii-chan";
    $gameStrings.setValue(121, heroName);
  }

  return true;
};


/*
// 繁化工具
*/
(() => {
  window.TZ ??= {};
  window.cn2tw ??= window.OpenCC ? OpenCC.Converter({ from: 'cn', to: 'tw' }) : (s => s);

  Object.assign(window.TZ, {
    // —— 原有：检测是否包含繁体 —— //
    hasTraditional(str) {
      if (!str) return false;
      if (/[\u3105-\u312F\u31A0-\u31BF]/.test(str)) return true;         // 注音
      if (typeof t2s === 'function') return t2s(str) !== str;            // 繁->简对比
      const TC_HINTS = /[國臺灣廣門風馬魚龍愛體學藝後裡裏鄭謝鍾劉陳張楊黃吳趙蘇葉羅許韓龔龜鳳鵬]/;
      return TC_HINTS.test(str);
    },
    // —— 新增：把任意 JSON 对象里的字符串就地简→繁 —— //
    cn2twJson(obj, opts) {
      opts = opts || {};

      const skip = new Set(opts.skipKeys || []);                      // 不转换这些键
      const only = opts.onlyKeys ? new Set(opts.onlyKeys) : null;     // 只转换这些键

      const seen = new WeakSet();
      function walk(v, key) {
        if (typeof v === 'string') {
          if (only && !only.has(key)) return v;
          if (skip.has(key)) return v;
          return window.cn2tw(v);
        }

        if (typeof v !== 'object' || seen.has(v)) return v;

        seen.add(v);

        if (Array.isArray(v)) {
          for (let i = 0; i < v.length; i++) v[i] = walk(v[i], key);
        } else {
          for (const k in v) if (Object.prototype.hasOwnProperty.call(v, k)) {
            v[k] = walk(v[k], k);
          }
        }

        return v;
      }

      walk(obj, null);
    }
  });
})();


/* ===========================================================
 * 喵化工具（保留标点/空白/MV 转义码）
 * =========================================================== */

chahuiUtil.meowVariants = [
  ["Meow", 2], ["Meow~", 1],
  ["Mew", 2], ["Mew~", 1],
  ["Meo", 2], ["Meo~", 1],
  ["Miaow", 2], ["Miaow~", 1],
  ["meow", 2], ["meow~", 1],
  ["Nya", 2], ["Nya~", 1],
  ["mew", 2], ["mew~", 1]
];

chahuiUtil._pickMeow = function () {
  const list = this.meowVariants.map(v => Array.isArray(v) ? v : [v, 1]);
  const total = list.reduce((s, [, w]) => s + (w | 0 || 1), 0);
  let r = Math.random() * total;
  for (const [word, w0] of list) {
    const w = (w0 | 0) || 1;
    if ((r -= w) <= 0) return word;
  }
  return "Meow";
};

// 保护 MV 转义码（\X 或 \X[...]/\{ \} \! \. \| \> \< \^ 等）
chahuiUtil._protectEscapes = function (s) {
  const bucket = [];
  const escRE = /\\(?:[A-Za-z]+(?:\[[^\]]*\])?|[{}]|[.!><^|])/g;
  const marked = String(s ?? "").replace(escRE, m => {
    const key = `\uE000${bucket.length}\uE001`; // 私用占位
    bucket.push(m);
    return key;
  });
  return { marked, bucket };
};
chahuiUtil._restoreEscapes = function (s, bucket) {
  return s.replace(/\uE000(\d+)\uE001/g, (_, i) => bucket[+i] || "");
};


// 是否保留当前字符（标点/空白）
chahuiUtil._isKeepChar = function (ch) {
  // 空白（含全角空格）、常见中英文标点
  return /[\s\u3000,，.。!?！？:：;；'"“”‘’()（）\[【\]】{}《》「」<>·、…—\-–_]/.test(ch);
};

/** 单行喵化（超出直接截断，不换行） */
chahuiUtil.meowifyLineCapped = function (line, limit = 14) {
  const { marked, bucket } = this._protectEscapes(line);
  let out = "", visible = 0;

  for (let i = 0; i < marked.length; i++) {
    const ch = marked[i];

    // 碰到占位块（转义码）：整体保留且不计入上限
    if (ch === "\uE000") {
      const j = marked.indexOf("\uE001", i + 1);
      if (j === -1) break;                 // 理论不会发生：防御
      out += marked.slice(i, j + 1);
      i = j;
      continue;
    }

    // 已达上限：截断（不再写入任何内容）
    if (visible >= limit) break;

    // 生成本次 token
    const token = this._isKeepChar(ch) ? ch : this._pickMeow();

    out += token;
    visible += 1;                           // 转义不计数；标点/空白计数
  }
  return this._restoreEscapes(out, bucket);
};

/** 多行（数组）喵化：保持与原数组同长度 */
chahuiUtil.meowifyArrayCapped = function (arr, limit = 14) {
  return arr.map(line => this.meowifyLineCapped(String(line ?? ""), limit));
};
