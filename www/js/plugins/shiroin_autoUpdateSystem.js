

    
var chahuiUtil = chahuiUtil || {};
var Imported = Imported || {};
Imported.shiroin_autoUpdateSystem = true;
//=============================================================================
//github 配置
//=============================================================================
const githubCfg = {
  owner: "shiroin000",
  repo: "RPGmaker",
  branch: "main",
  tag: Utils.isMobileDevice() ? "AndroidPatch" : "patch",
  rawTemplate: `https://raw.githubusercontent.com/${this.owner}/${this.repo}/${this.branch}/`,
  downloadURL(name) { // 下載文件名稱
    return `https://github.com/${this.owner}/${this.repo}/releases/download/${this.tag}/${encodeURIComponent(name)}`;
  },
  contentsAPI(dir) { // 目錄
    return `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${dir}?ref=${this.branch}`;
  },
  treesAPI() {
    return `https://api.github.com/repos/${this.owner}/${this.repo}/git/trees/${this.branch}?recursive=1`;
  },
  // 取得版本哈希
  async getReleaseAssetSha256(version) {
    return new Promise((resolve, reject) => {
      if (!version || typeof version !== "string") return reject(false);

      httpRequest(`https://api.github.com/repos/${this.owner}/${this.repo}/releases/tags/${this.tag}`, { responseType: "json" })
        .then(release => {
          const name = version.endsWith(".zip") ? version : `${version}.zip`;
          const asset = release?.assets?.find(item => item.name === name);

          if (!asset) return reject(false);

          resolve({
            name,
            downloadUrl: asset.browser_download_url || null,
            sha256: asset.digest.replace("sha256:", "") || null,
          })
        }).catch(err => {
          reject(false);
        })
    });
  }
};

/**
 * @author Canaan HS
 * @description 版本比較更新 (還未加入哈希比較)
 * @param {String} newVersion - 新版本號 (0.5 | 1.5C)
 * @param {String} oldVersion - 當前版本號 (0.5 | 1.5C)
 * @param {Function} updateFunc - 判斷成功後觸發函數
 * @param {Function} silentCheckFunc - 版本相同時觸發函數
 * @returns {Boolean} 是否更新
 */
function versionCompare(newVersion, oldVersion, updateFunc, silentCheckFunc) {
  if (!newVersion || !oldVersion) return false;

  const regex = /^(\d+(?:\.\d+)*)([A-Za-z]?)$/i;
  const newMatch = regex.exec(newVersion);
  const oldMatch = regex.exec(oldVersion);

  if (!newMatch || !oldMatch) return false;

  const [newNums, newWord] = [newMatch[1].split('.').map(Number), newMatch[2] || ""];
  const [oldNums, oldWord] = [oldMatch[1].split('.').map(Number), oldMatch[2] || ""];

  // 新版本號 > 老版本號
  const len = Math.max(newNums.length, oldNums.length);
  for (let i = 0; i < len; i++) {
    const newN = newNums[i] || 0;
    const oldN = oldNums[i] || 0;

    if (newN > oldN) {
      if (chahuiUtil.checkLegitimatePlayer()) {
        // 只有验证用户才允许大版本更新
	       updateFunc?.({majorUpdate: true});		
         return true;
      }
      return false;
    }
    else if (newN < oldN) return false;
  }

  // 新版本字母 > 老版本字母
  if (newWord > oldWord) {
    updateFunc?.();
    return true;
  }

  // 版本完全相同最終靜音檢查
  //silentCheckFunc?.();
  try {
    const r = silentCheckFunc?.();
    // 如果 silentCheckFunc 返回 Promise，就把 rejection 接住
    if (r && typeof r.then === 'function') {
      r.catch(e => {
        if (e !== false) console.error('[silentCheckFunc] failed:', e);
        // e === false 视为“正常中断/无事发生”，不报红
      });
    }
  } catch (e) {
    if (e !== false) console.error('[silentCheckFunc] failed:', e);
  }  
  return false;
};

/**
 * @author Canaan HS
 * @description 解壓文件工具
 * @param {String} zipName - 壓縮檔名
 * @returns 
 */
function zipFile(zipName = "patch.zip") {
  const path = require('path');
  const fs = require('fs/promises');
  const StreamZip = require('node-stream-zip');

  /* 路徑配置 */
  const saveDir = path.join(process.cwd(), "www");
  const zipPath = path.join(saveDir, zipName);
  const wwwPath = path.join(saveDir, "www");

  async function attachProgress(zip) {
    const total = await zip.entriesCount;
    let count = 0;

    zip.on('extract', () => {
      count++;
      $gameVariables.setValue(82, Math.floor((count / total) * 100));
    })
  };

  async function normalize() {
    try {
      const files = await fs.readdir(wwwPath);

      await Promise.all(files.map(async (name) => {
        const src = path.join(wwwPath, name);
        const dst = path.join(saveDir, name);

        try {
          await fs.cp(src, dst, { recursive: true, force: true });
          await fs.rm(src, { recursive: true, force: true });
        } catch (e) { throw e }
      }))

      await fs.rm(wwwPath, { recursive: true, force: true });
    } catch { }
  };

  return {
    saveDir, zipPath,
    async decompress() {
      const zip = new StreamZip.async({ file: zipPath });
      try {
        await attachProgress(zip);
        await zip.extract(null, saveDir);
        await zip.close();

        $gameVariables.setValue(82, 100);
        await fs.unlink(zipPath).catch(() => { });
        await normalize();

        return true;
      } catch (e) {
        console.error(e);
        await zip.close().catch(() => { });
        return false;
      }
    },
    async save(data) {
      try {
        await fs.mkdir(saveDir, { recursive: true });
        const content = data instanceof ArrayBuffer
          ? Buffer.from(data) : data;
        await fs.writeFile(zipPath, content);
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    }
  };
};

//=============================================================================
//重写源码以添加自动更新功能（泛用的Scene_Title_update移至shiroin_multilingualSupport.js）
//=============================================================================

// 最新版本检查
Scene_Title.prototype.autoUpdataCheck = function () {
  if (window.DISABLE_AUTO_UPDATE === true) return;

  const versionA = $dataSystem.gameVersion || 0.1;
  // 先把非法的 v2 全部重置为 0 
  let v2 = $gameVariables.value(2);
  const goodString = typeof v2 === 'string' && /^0\.\d+[A-Za-z]?$/.test(v2);
  if (v2 !== 0 && !goodString) {
    // 既不是数字 0 ，也不是合法的版本字符串 → 重置
    $gameVariables.setValue(2, 0);
    v2 = 0;
  }
  // 旧版本数据也重置
  if (goodString && versionCompare(versionA, v2)) {
      $gameVariables.setValue(2, 0);
  }
  // 有正确的版本记录的情况下，直接触发更新流程
  if (goodString) {
      this.autoUpdataConfirm();
      return;
  }

  // 当前不会有缺少小数点版本的情况
  if (versionA.split('.').length < 2) {
      return;
  }

  let userLang = ConfigManager.language;
  if (userLang > 2) userLang = 2;
  const isAndroid = Utils.isMobileDevice();

  const scene = this;
  const url = `${appScript}?mode=LatestVersion&lang=${userLang}&version=${versionA}&isAndroid=${isAndroid}`;
  httpRequest(url, {
    responseType: 'json',
    onerror() {
      $gameVariables.setValue(2, 0);
    }
  }).then(async result => {
    const versionB = result.nextVersion.trim();
    const regex = /^(\d+(?:\.\d+)*)([A-Za-z]?)$/i;
    if (!regex.exec(versionB)) {
       $gameVariables.setValue(2, 0);
       return;
    }

    versionCompare(versionB, versionA, () => {
      if (result.update) $dataSystem.updateLog = result.update; // 如果有更新履历，就预存备用
	  $gameVariables.setValue(9, result.update);  // 全局变量，兜底用，防止重开游戏看不到履历
      $gameVariables.setValue(2, versionB);
      scene.autoUpdataConfirm(versionB);
      scene._startedCustomGame = true;
    })
  }).catch(() => {
    $gameVariables.setValue(2, 0);
  })
};

Scene_Title.prototype.autoUpdataConfirm = async function (version) {
  if (window.DISABLE_AUTO_UPDATE === true) { 
    $gameVariables.setValue(2, 0);
    $gameVariables.setValue(9, "");
    return;
  }

  // 防范玩家在已经点击选项后继续弹窗
  if (this._commandWindowInitialized) {
    if (!this._commandWindow || !this._commandWindow.isOpenAndActive()) {
      return;
    }
  }

  if (!version)  version = $gameVariables.value(2);
  let textArray = window?.systemFeatureText?.autoUpdate;
  if (!textArray) textArray = [
    "Update available: Version ${} game data detected. ",
    "Would you like to download and update now?"
  ];
  let text = textArray.join('\n');

  const match = String(text).match(/\$\{([^}]*)\}/);
  if (match && version) text = String(text).replace(/\$\{[^}]*\}/g, version);
  text += "\n \n";
  // 追加显示更新履历
  text += $dataSystem.updateLog ? $dataSystem.updateLog : $gameVariables.value(9);
  // 把多余的转义字符删掉
  text = text.replace(/\\(?:fs|c)\s*\[\s*-?\d+\s*\]/gi, '');
  // 弹出是否更新的确认框
  let width = ConfigManager.language > 1 ? 640 : 420;
  const ask = await confirm(text, { width: width, align: "left" });
  if (ask) {
    // 将玩家送进小黑屋
    const preMapId = $dataSystem.startMapId;
    const preStartX = $dataSystem.startX;
    const preStartY = $dataSystem.startY;
    $dataSystem.startMapId = 33;
    $dataSystem.startX = 8;
    $dataSystem.startY = 5;
    this.commandNewGame();
    $dataSystem.startMapId = preMapId;
    $dataSystem.startX = preStartX;
    $dataSystem.startY = preStartY;
  } else {
    // 拒绝更新，重置版本记录
    $gameVariables.setValue(2, 0);
	  $gameVariables.setValue(9, "");
  }
};

//=============================================================================
//不同情景的自动更新流程
//=============================================================================

// 自动更新检测
chahuiUtil.autoUpdataCheck = async function (extra={}) {
  if (window.DISABLE_AUTO_UPDATE === true) return { ok:false };

  if (this && this instanceof Game_QJBulletMZ) {
    // SLG监听器才会触发的流程
    // 同步游戏时长
    let playedTime = $gameSystem.truePlaytimeText(false, true);
    document.title = $dataSystem.gameTitle + `    [PlayTime: ${playedTime}]`;
    if (window.nw?.Window) nw.Window.get().title = document.title;
    if (this._checked) {
      return;
    } else {
      this._checked = true;
    }
  }

  if (!appScript) return {ok:false};
  if ($gameStrings.value(1).trim() !== "" || $dataSystem.updateLog) {
     QJ.MPMZ.tl._imoutoUtilautoUpdataIcon();
  }

  $gameStrings.setValue(1, "");
  let versionA = $dataSystem.gameVersion || 0.1;
  let userLang = ConfigManager.language;
  if (userLang > 2) userLang = 2;
  const isAndroid = Utils.isMobileDevice();

  const url = `${appScript}?mode=LatestVersion&lang=${userLang}&version=${versionA}&isAndroid=${isAndroid}`;
  // 等待服务器返回最新版本信息
  const result = await httpRequest(url, { responseType: "json" });
  // 读取游戏公告
  if (result.announcement && result.announcement.trim() !== "") {
      let announcement = result.announcement;
      $gameStrings.setValue(25, announcement);
      QJ.MPMZ.tl._imoutoUtilGameAnnouncementIcon();
  }
  const lastVer  = result.lastVersion;
  const versionB = result.nextVersion;
  const log      = result.update;
	$dataSystem.updateLog = log;
	$gameVariables.setValue(9, log);
  const hasUpdate = versionCompare(
      versionB, versionA,
      (extra={}) => {
        $gameStrings.setValue(1, versionB);
        $gameVariables.setValue(2, versionB);
        $gameStrings.setValue(15, log);
        $dataSystem.updateLog = log;
        QJ.MPMZ.tl._imoutoUtilautoUpdataIcon?.();
        if(extra.majorUpdate) {
          // 要打标记，不然重启游戏就没了
          chahuiUtil.checkLegitimatePlayer({ markMajorUpdate: true });
        } 
      },
      async () => {
        await chahuiUtil.silentIncrementalUpdate(versionB);
        return {ok:true};
      }
  );
	
	if (!hasUpdate) {
		if (versionCompare(lastVer, versionA)) {
		    // 检测到过时版本/旧版本
		    chahuiUtil.showOutdatedVersionWarning(lastVer);
		    return { outdated: true, lastVer };
	    }
	}
  return { ok: hasUpdate, version:versionB };
};

// 过时版本警告
chahuiUtil.showOutdatedVersionWarning = function (version) {
	if (window.DISABLE_AUTO_UPDATE === true) return;
	if ($gameTemp._showOutdatedVersionWarning) return;
	$gameTemp._showOutdatedVersionWarning = true;
  let textArray = window.systemFeatureText && window.systemFeatureText.outdatedVersionWarning;
  if (!textArray) {
		  textArray = [
					"Your current game version is outdated. The latest version is ${}.",
					"Major version updates do not support automatic updates. ",
					"Please re-download the game from the official source."	
	    ];
	}
  let text = Array.isArray(textArray) ? textArray.join("\n") : (textArray ?? "");
  const match = String(text).match(/\$\{([^}]*)\}/);
  if (match) text = String(text).replace(/\$\{[^}]*\}/g, `${version}`);
  alert(text);
};

// 大版本更新
chahuiUtil.autoUpdateMajorVersion = async function (extra={}) {
  
  let auth = JSON.parse(localStorage.getItem('gm_patreon_verify') || '{}');
  if (!auth || !auth.subscribed) return;
  let USERNAME   = auth.userName;
  let DEVICE_ID  = auth.device_id;
  const url = `${appScript}?mode=getTicket&username=${USERNAME}&device_id=${DEVICE_ID}`;
  httpRequest(url, { responseType: "json" }).then(async result => {
      if (result.ok && result.ticket && result.ticket.trim() !== "") {
        const ticket      = result.ticket;
        const version     = `${extra.version || $gameVariables.value(2)}.zip`;
        const downloadUrl = `https://imoutogame.shiroin.workers.dev/download?ticket=${encodeURIComponent(ticket)}&ver=${encodeURIComponent(extra.version)}`;
        const ok = await chahuiUtil.tryDownloadReleaseZip(version, {name:version, downloadUrl:downloadUrl});
        if (ok) {
            // 解压安装成功时自带清理标记功能，这里只是以防万一
            localStorage.removeItem('gm_patreon_verify');
        }
      } else {
        // 更新失败的情况
        if (result.error && result.error.trim() !== "") {
            // 失败了就要清理标记和缓存
            $gameVariables.setValue(2, 0);
            localStorage.removeItem('gm_patreon_verify');        
            let textArray = window.systemFeatureText?.memberMenu?.["majorUpdateFailed"];
            if (!textArray) textArray = ["Major update failed: ${error}"];
            let text = Array.isArray(textArray) ? textArray.join("\n") : (textArray ?? ""); 
            const match = String(text).match(/\$\{([^}]*)\}/);
            if (match) text = String(text).replace(/\$\{[^}]*\}/g, String(result.error));               
            await confirm(text, { align: "left" });
        }
        setTimeout(() => location.reload(), 1000);
     }
  })
};


// 静默迭代更新
chahuiUtil.silentIncrementalUpdate = async function (version) {

  const info = await githubCfg.getReleaseAssetSha256(version);
  if (!info)  return;
  const oldSha256A = $gameStrings.value(118);
  const oldSha256B = $gameVariables.value(7);
  if (!oldSha256A && !oldSha256B) {
    // 没有记录值时初始化一次
    $gameVariables.setValue(7, info.sha256);
    $gameStrings.setValue(118, info.sha256);
    return;
  }

  if (info.sha256 === oldSha256A || info.sha256 === oldSha256B || Utils.isOptionValid("test")) return;

  const ok = await chahuiUtil.tryDownloadReleaseZip(version, Object.assign(info, { silentUpdate: true }));

  if (ok) {
    // 更新成功静默通知 
    $gameVariables.setValue(7, info.sha256);
    $gameStrings.setValue(118, info.sha256);
    let textArray = window.systemFeatureText && window.systemFeatureText.silentUpdateSuccess;
    if (!textArray) textArray = `New patch content for ${version} has been successfully installed and will take effect upon the next restart.`;
    let text = Array.isArray(textArray) ? textArray.join("\n") : (textArray ?? "");
    const match = String(text).match(/\$\{([^}]*)\}/);
    if (match) text = String(text).replace(/\$\{[^}]*\}/g, `\\fs[24]${version}`);
    text = "\\c[6]\\fs[24]" + text;
    $gameSystem._drill_GFTH_styleId = 6;
    $gameTemp.drill_GFTH_pushNewText(text);
    if ($dataSystem.updateLog) {
        QJ.MPMZ.tl._imoutoUtilautoUpdataIcon();	
	  }
  }
};

// 强制触发自动更新
chahuiUtil.forceAutoUpdateConfirm = function () {
  const versionA = $dataSystem.gameVersion || "";

  let userLang = ConfigManager.language;
  if (userLang > 2) userLang = 2;
  const isAndroid = Utils.isMobileDevice();

  const url = `${appScript}?mode=ForceRedownloadCurrent&lang=${userLang}&version=${versionA}&isAndroid=${isAndroid}`;
  httpRequest(url, { responseType: "json" }).then(async result => {
    if (result.nextVersion && result.update && result.update.trim() !== "") {
      let version = result.nextVersion;
      let log = result.update;
      $gameVariables.setValue(2, version);
      $dataSystem.updateLog = log;
      chahuiUtil.showUpdateNotification(version);
    }
  })
};

// 显示更新通知/游戏更新弹窗
chahuiUtil.showUpdateNotification = async function (version) {
      if (!version) return;
      let log = $dataSystem.updateLog || $gameVariables.value(9);
      let textArray = window.systemFeatureText && window.systemFeatureText.autoUpdate;
      if (!textArray) textArray = [
                              "Update available: Version ${} game data detected. ",
                              "Would you like to download and update now?"
                            ];
      let text = textArray.join('\n');
      const match = String(text).match(/\$\{([^}]*)\}/);
      if (match && version) {
        text = String(text).replace(/\$\{[^}]*\}/g, version);
      }
      if (log) {
        text += "\n \n";
        // 删除多余转义字符
        log   = log.replace(/\\(?:fs|c)\s*\[\s*-?\d+\s*\]/gi, '');
        text += log;
      }
      const ask = await confirm(text, { align: "left" });
      if (ask) {
        // 将玩家送进小黑屋
        if (SceneManager._scene && SceneManager._scene instanceof Scene_Map) {            
            chahuiUtil.abortEventById.call(this, -1);
            $gameMap.steupCEQJ(405, 1, { forceAutoUpdate: true });          
            return true;
        }
        const preMapId  = $dataSystem.startMapId;
        const preStartX = $dataSystem.startX;
        const preStartY = $dataSystem.startY;  
        $dataSystem.startMapId = 33;
        $dataSystem.startX = 8;
        $dataSystem.startY = 5;              
        if (SceneManager._scene && SceneManager._scene.fadeOutAll) {
            SceneManager._scene.fadeOutAll();
        }
        DataManager.setupNewGame();       
        SceneManager.goto(Scene_Map);
        $dataSystem.startMapId = preMapId;
        $dataSystem.startX = preStartX;
        $dataSystem.startY = preStartY;
        return true;        
      } else {
        // 放弃更新，清理标记
        $gameVariables.setValue(2, 0); 
      }
      return false;
};

// ------------------------------------------------------------------
// 自动更新下载与安装解压流程
// ------------------------------------------------------------------

// 自动更新主流程
chahuiUtil.autoUpdate = async function (version, isTitle) {
  // 合法玩家走大版本更新（独立流程）
  if (chahuiUtil.checkLegitimatePlayer({ allowMajorUpdate: true })) {
    // 关闭地图事件以避免干扰
    $gameSelfSwitches.setValue([33, 1, 'C'], true);
    chahuiUtil.autoUpdateMajorVersion({ version });
    return;
  }

  // 优先尝试 Releases 直链 ZIP
  const ok = await chahuiUtil.tryDownloadReleaseZip(version);
  if (ok) return;

  // 兜底：旧版 GitHub 目录下载逻辑
  return chahuiUtil.autoUpdateLegacyGitHub?.(version, isTitle);
};

// 下载补丁压缩包（默认走gitHub源）
chahuiUtil.tryDownloadReleaseZip = async function (version, opt = {}) {
  // 轻量 HEAD 探测
  async function headOk(url) {
    function disableHeadDetection(url) {
      return url.includes("imoutogame");
    }
    if (disableHeadDetection(url)) {
      // R2桶不适合探头，直接放行;
      return true;
    }
    return new Promise((resolve) => {
      httpRequest(url, { method: 'HEAD' })
        .then(() => resolve(true))
        .catch(() => resolve(false));
    })
  };

  try {
    const name = opt.name || `${version}.zip`;
    const url = opt.downloadUrl || githubCfg.downloadURL(name);

    // silentUpdate = false，代表 opt 內沒有 sha256，需要額外請求獲取
    // true 的話代表由 silentIncrementalUpdate 調用，內部已處理哈希保存
    if (!opt.silentUpdate && !opt.downloadUrl) {
      const info = await githubCfg.getReleaseAssetSha256(version);
      if (info.sha256) {
        $gameVariables.setValue(7, info.sha256);
        $gameStrings.setValue(118, info.sha256);
		    $gameSelfSwitches.setValue([33, 1, 'C'], true);
      }
    };

    if (!(await headOk(url))) return false;
    // 清理标记
    $gameVariables.setValue(83, 100);
    $gameVariables.setValue(2, 0);
	  $gameVariables.setValue(9, "");
    // 下载到 www/ 下	
    await downloadOneFile(url, `${name}`);
    // 统计成功成功次数	
    if (!opt.silentUpdate) chahuiUtil.autoUpdateSuccessCount?.();
    // 解压安装
    if (Utils.isMobileDevice()) {
      await chahuiUtil.androidExtractAndInstallPatch(undefined, opt);
    } else {
      $gameVariables.setValue(86, [`www/${name}`]);
      await chahuiUtil.extractAndInstallPatch(opt);
    }

    // 清理标记
    $gameVariables.setValue(2, 0);
    return true;
  } catch (e) {
    console.warn("[releases-zip] 下载或解压失败：", e);
    return false;
  }
};

// 解压缩 zip 安装补丁（对应PC版）
chahuiUtil.extractAndInstallPatch = async function (extra = {}) {

  function normalizeToArray(val) {
    if (Array.isArray(val)) return val.filter(Boolean).map(String);
    if (val == null) return [];
    if (typeof val === "string") {
      const s = val.trim();
      if (!s) return [];
      // JSON 数组字符串
      if (s[0] === "[" && s[s.length - 1] === "]") {
        try {
          const arr = JSON.parse(s);
          if (Array.isArray(arr)) return arr.filter(Boolean).map(String);
        } catch (e) { /* fallthrough */ }
      }
      // 逗号或空白分隔
      if (s.includes(",")) return s.split(/\s*,\s*/).filter(Boolean);
      const maybeSplit = s.split(/\s+/).filter(Boolean);
      if (maybeSplit.length > 1) return maybeSplit;
      return [s];
    }
    return [String(val)];
  }

  // —— 文本工具 ——
  function joinTextArray(textArray, fallbackArr) {
    let arr = textArray || fallbackArr;
    return Array.isArray(arr) ? arr.join("\n") : String(arr ?? "");
  }

  // —— 读取储存了压缩包文件名的变量并标准化为数组 ——
  const v86 = $gameVariables.value(86);
  const zipNamesRaw = normalizeToArray(v86);
  if (zipNamesRaw.length === 0) return;

  // —— PC / NW.js 路径 ——
  const fs = require("fs");
  const path = require("path");

  const zipNames = zipNamesRaw;

  // —— 绝对路径 & 先验证所有文件是否存在 ——
  const cwd = process.cwd();
  const zipPaths = zipNames.map(n => path.join(cwd, n));

  // 用于记录最新正在解压的文件路径
  let lastZipAbs = null;
  const missing = zipPaths
    .map((zp, i) => (!fs.existsSync(zp) ? zipNames[i] : null))
    .filter(Boolean);

  if (missing.length > 0) {
    const failText = joinTextArray(
      window.systemFeatureText && window.systemFeatureText.zipUpdateFail,
      [
        "Failed to extract and install the patch!",
        "Please try the auto-update again or",
        "manually extract the patch files to install!"
      ]
    );
    await confirm(failText + "\nMissing: " + missing.join(", "));
    $gameSelfSwitches.setValue([$gameMap.mapId(), 1, "Z"], false);
    $gameSelfSwitches.setValue([$gameMap.mapId(), 2, "Z"], false);
    return;
  }

  try {
    // —— 逐个解压 & 删除 ——（顺序即覆盖顺序）
    for (let i = 0; i < zipNames.length; i++) {
      const name = zipNames[i];
      const abs = zipPaths[i];

      // 标记压缩包所在路径，供调试用
      lastZipAbs = abs;

      // —— 解压提醒演出 ——
      let textArray = window.systemFeatureText && window.systemFeatureText.startExtractZipFile;
      if (!textArray) textArray = `Extracting ${name}…`;
      let text = Array.isArray(textArray) ? textArray.join("\n") : (textArray ?? "");
      text = "\\fs[24]" + text;
      $gameSystem._drill_GFTH_styleId = 5;
      $gameTemp.drill_GFTH_pushNewText(text);

      // —— 解压进行 ——
      const zip = zipFile(name.replace("www/", "")); // 不需要 www/ 前墜
      const result = await zip.decompress();
      if (!result) throw new Error();
    }

    if (extra.silentUpdate) return;
    if (chahuiUtil.checkLegitimatePlayer({ allowMajorUpdate: true })) {
       // 大版本更新场合下清除登录缓存
       localStorage.removeItem('gm_patreon_verify');
    }
    // —— 结束提醒 ——
    setTimeout(async () => {
      const okText = joinTextArray(
        window.systemFeatureText?.zipUpdateComplete,
        ["Patch installed successfully.", "Restarting the game to apply the update!"]
      );
      await confirm(okText);
      location.reload();
    }, 500);

  } catch {
    if (extra.silentUpdate) return;

    const failText = joinTextArray(
      window.systemFeatureText && window.systemFeatureText.zipUpdateFail,
      [
        "Failed to extract and install the patch!",
        "Please try the auto-update again or",
        "manually extract the patch files to install!"
      ]
    );
    await confirm(failText);
    // 打开失败压缩包所在路径
    if (lastZipAbs) nw.Shell.showItemInFolder(lastZipAbs);
    setTimeout(() => location.reload(), 2000);
  }
};

// 解压缩 zip 安装补丁流程
chahuiUtil.androidExtractAndInstallPatch = async function (namesOrOne, extra = {}) {
  const root = cordova.file.dataDirectory;

  // —— 工具：把输入规范成数组 —— //
  function normalizeToArray(val) {
    if (Array.isArray(val)) return val.filter(Boolean).map(String);
    if (val == null) return [];
    if (typeof val === "string") {
      const s = val.trim();
      if (!s) return [];
      if (s[0] === "[" && s[s.length - 1] === "]") {
        try { const arr = JSON.parse(s); if (Array.isArray(arr)) return arr.filter(Boolean).map(String); }
        catch { /* ignore */ }
      }
      if (s.includes(",")) return s.split(/\s*,\s*/).filter(Boolean);
      const maybeSplit = s.split(/\s+/).filter(Boolean);
      return maybeSplit.length > 1 ? maybeSplit : [s];
    }
    return [String(val)];
  }

  function joinTextArray(textArray, fallbackArr) {
    let arr = textArray || fallbackArr;
    return Array.isArray(arr) ? arr.join("\n") : String(arr ?? "");
  }

  async function alertFail(extraMsg) {
    let textArray = window.systemFeatureText?.zipUpdateFail;
    if (!textArray) {
      textArray = [
        "Failed to extract and install the patch!",
        "Please try the auto-update again or",
        "manually extract the patch files to install!"
      ];
    }
    const text = joinTextArray(textArray, textArray) + (extraMsg ? ("\n" + extraMsg) : "");
    await confirm(text);
    $gameSelfSwitches.setValue([$gameMap.mapId(), 1, "Z"], false);
    $gameSelfSwitches.setValue([$gameMap.mapId(), 2, "Z"], false);
  }

  function fsExists(fileUrl) {
    return new Promise((res, rej) => {
      window.resolveLocalFileSystemURL(fileUrl, () => res(true), err => rej(err));
    });
  }

  function fsRemove(fileUrl) {
    return new Promise((res, rej) => {
      window.resolveLocalFileSystemURL(
        fileUrl,
        fe => fe.remove(() => res(), err => rej(err)),
        err => rej(err)
      );
    });
  }

  // —— 读取来源（参数优先，否则读 86 号变量） —— //
  const raw = (typeof namesOrOne !== "undefined") ? namesOrOne : $gameVariables.value(86);
  const zipNames = normalizeToArray(raw);
  if (zipNames.length === 0) return;

  // —— 先校验所有文件是否存在（位于 dataDirectory 下） —— //
  const missing = [];
  for (const name of zipNames) {
    try { await fsExists(root + name); } catch { missing.push(name); }
  }
  if (missing.length) {
    alertFail("Missing: " + missing.join(", "));
    return;
  }

  // —— 进度聚合（整体 0~100） —— //
  const total = zipNames.length;
  const updateOverallPct = (idx, pctInCurrent) => {
    const overall = (idx + (pctInCurrent || 0)) / total;
    try { if (overall > 0) $gameVariables.setValue(82, Math.floor(overall * 100)) } catch { }
  };

  try {
    // —— 顺序解压（避免 I/O 争抢；后包覆盖先包） —— //
    for (let i = 0; i < zipNames.length; i++) {
      const name = zipNames[i];

      await chahuiUtil.androidExtractPatch(name, pct => updateOverallPct(i, pct));
      // 把该段收尾到段末
      updateOverallPct(i + 1, 0);

      // 解压完成即删除 zip（位于 dataDirectory/www/...）
      try { await fsRemove(root + name); } catch (e) { console.warn("remove failed:", name, e); }
    }

    if (extra.silentUpdate) return;

    setTimeout(async () => {
      let textArray = window.systemFeatureText?.zipUpdateComplete;
      if (!textArray) {
        textArray = [
          "Patch installed successfully.",
          "Restarting the game to apply the update!"
        ];
      }
      await confirm(joinTextArray(textArray, textArray));
      try { location.reload(); } catch { }
    }, 500);

  } catch (err) {
    if (extra.silentUpdate) return;
    console.log("Android patch install failed:", err);
    alertFail();
  }
};

// 被单独分离出来的安卓解压工具函数
chahuiUtil.androidExtractPatch = function (zipFileName, onProgress) {
  const isCordova = !!(window.cordova && window.resolveLocalFileSystemURL);
  if (!isCordova) { return Promise.reject(new Error('unsupported environment')); }
  const root = cordova.file.dataDirectory;
  function extractWithNative(zipNativePath, destNativeDir) {
    return new Promise((resolve, reject) => {
      if (!window.zip || !window.zip.unzip) { return reject(new Error('native zip plugin not available')); }
      try {
        window.zip.unzip(
          zipNativePath,
          destNativeDir,
          status => {
            if (status === 0) {
              resolve();
            } else { reject(new Error('unzip failed: ' + status)); }
          },
          rawProgress => {
            let prog;
            if (rawProgress && typeof rawProgress === 'object' && 'loaded' in rawProgress && 'total' in rawProgress) {
              prog = rawProgress.loaded / rawProgress.total * 100;
            } else { prog = Number(rawProgress); }
            if (isNaN(prog)) { prog = 0; }
            const fraction = prog / 100;
            if (onProgress) {
              try {
                onProgress(fraction);
              } catch (e) {
              }
            }
          });
      } catch (e) {
        reject(e);
      }
    });
  }
  const zipNativePath = root + zipFileName;
  const destNativeDir = root;
  return new Promise((resolve, reject) => {
    extractWithNative(zipNativePath, destNativeDir)
      .then(resolve)
      .catch(reject);
  });
};



// ------------------------------------------------------------------
// 和自动更新相关的小工具
// ------------------------------------------------------------------
// 正版玩家验证
chahuiUtil.checkLegitimatePlayer = function (extra={}) {
   const verify = localStorage.getItem('gm_patreon_verify');
   const auth   = verify ? JSON.parse(verify) : null;
   if (auth && extra.markMajorUpdate) {   
      auth.allowMajorUpdate = true;
      localStorage.setItem('gm_patreon_verify', JSON.stringify(auth));
      return;
   }
   if (extra.device_id) {
     return (auth && auth.device_id) || "undefined";
   }
   if (extra.allowMajorUpdate) {
     return auth && auth.allowMajorUpdate || false;
   }   
   return auth && auth.subscribed;
};
// 成功更新计数
chahuiUtil.autoUpdateSuccessCount = function () {
  if (!appScript) return;
  const gameTitle = $dataSystem.gameTitle;
  const match = gameTitle.match(/ver0\.(\d+)/i);
  let version;
  if (match) {
    version = parseInt(match[1], 10);
    if (version > 100) version = 72;
  } else {
    version = 75;
  }

  let userLang = ConfigManager.language;
  if (userLang > 2) userLang = 2;

  const url = `${appScript}?mode=UpdateSuccessful&lang=${userLang}&version=${version}`;
  httpRequest(url);
};

// ------------------------------------------------------------------
// 已经被废弃的屎山们
// ------------------------------------------------------------------
chahuiUtil.autoUpdateLegacyGitHub = async function (version, isTitle) {
  /* 以下均为旧版 GitHub 目录下载逻辑，保留以防万一 */ 

  const patchRoot = `${githubCfg.tag}/${version}`;
  const dirPath = `${patchRoot}/www`;

  $gameVariables.setValue(86, []);
  // ------------------------------------------------------------------
  // 为下载进度计算先统计文件总数
  // ------------------------------------------------------------------
  listAllGitHubFiles(dirPath)
    .then(files => {
      let textArray = window.systemFeatureText && window.systemFeatureText.totalFilesToUpdate;
      if (!textArray) textArray = "Detected ${} files to update—starting download process!";
      let text = Array.isArray(textArray) ? textArray.join("\n") : (textArray ?? "");
      const match = String(text).match(/\$\{([^}]*)\}/);
      if (match) text = String(text).replace(/\$\{[^}]*\}/g, String(files.length));
      text = "\\fs[24]" + text;
      $gameSystem._drill_GFTH_styleId = 5;
      $gameTemp.drill_GFTH_pushNewText(text);
      $gameVariables.setValue(83, files.length);
      return files.length;
    })
    .catch(console.error);

  // ------------------------------------------------------------------
  // 开始列表下载
  // ------------------------------------------------------------------
  downloadGitHubDirectory(dirPath)
    .then(async () => {

      $gameVariables.setValue(2, 0);
      if ($gameMap.mapId() === 33) {
        $gameSelfSwitches.setValue([$gameMap.mapId(), 1, "D"], true);
      }
      $gameSelfSwitches.setValue([$gameMap.mapId(), 2, "D"], true);

      // 没有下载压缩包时正常提示并重启
      if (!$gameSelfSwitches.value([$gameMap.mapId(), 1, "Z"])) {
        const msgArr = isTitle
          ? window.systemFeatureText.UpdateComplete2
          : window.systemFeatureText.UpdateComplete1;

        await confirm(msgArr.join("\n"));
        setTimeout(() => location.reload(), 1000);
      }
    })
    .catch(async (err) => {
      console.error(err);

      // ---------- 下载出错 ----------
      const lang = ConfigManager.language;
      const errText = {
        0: "游戏更新失败！\n请检查网络或进行手动更新！",
        1: "ゲームの更新に失敗しました！\nネットワークを確認するか、手動で更新してください！",
        2: "Game update failed!\nPlease check your network or update manually!"
      }[lang] || "Game update failed!\nPlease check your network or update manually!";
      await confirm(errText);

      // 清理标记
      $gameVariables.setValue(2, 0);
      if ($gameMap.mapId() === 33) {
        $gameSelfSwitches.setValue([$gameMap.mapId(), 1, "D"], true);
      }
      $gameSelfSwitches.setValue([$gameMap.mapId(), 2, "D"], true);
    });
};

// 只给安卓 + Cordova + zip 用
function downloadOneFileCordovaZip(remoteUrl, localPath, retries = 3) {
  return new Promise((resolve, reject) => {

    const root = (window.cordova && cordova.file && (cordova.file.dataDirectory || cordova.file.cacheDirectory)) || "";
    const normalizedLocalPath = String(localPath).replace(/^\/+/, "");
    const targetPath = root + normalizedLocalPath;

    let progressTask;
    const throttle = 400; // 轮询间隔
    httpRequest(remoteUrl, {
      method: 'HEAD',
      onload(response) {
        try {
          let total = parseInt(response.getResponseHeader('Content-Length'), 10);
          // if (!total || isNaN(total) || total <= 0) throw new Error("Content-Length not found");
          if (!total || isNaN(total) || total <= 0) total = 0; // 针对R2桶的临时兜底

          $gameVariables.setValue(85, 0);

          let lastReported = -1;
          /* ----- 轮询当前文件大小 → 计算百分比 → 写入 82 号变量 ----- */
          if (total > 0) {
            progressTask = setInterval(() => {
              try {
                window.resolveLocalFileSystemURL(
                  targetPath,
                  function (fileEntry) {
                    fileEntry.file(function (file) {
                      const cur = file.size || 0;
                      const pct = Math.min(100, Math.floor((cur * 100) / total));
                      if (pct !== lastReported) {
                        lastReported = pct;
                        $gameVariables.setValue(82, pct);   // ★ 进度回调
                      }
                    }, function () { /* ignore */ });
                  },
                  function () {
                    if (lastReported !== 0) {
                      lastReported = 0;
                      $gameVariables.setValue(82, 0);
                    }
                  }
                );
              } catch { /* 轮询失败直接忽略，不影响下载本身 */ }
            }, throttle);
          } else　{
            // 兜底的伪进度条
            let fake = 0;
            progressTask = setInterval(() => {
              fake = Math.min(69, fake + 1);
              $gameVariables.setValue(82, fake);
            }, 400);
          }

          /* ----- 真正开始下载 ----- */
          cordova.plugin.http.downloadFile(
            remoteUrl, {}, {}, targetPath,
            function () {
              clearInterval(progressTask);
              $gameVariables.setValue(85, 100);

              try {
                // 下载成功提示
                let textArray = window.systemFeatureText && window.systemFeatureText.fileDownloadedSuccessfully;
                if (!textArray) textArray = "${} downloaded successfully!";

                let text = Array.isArray(textArray) ? textArray.join("\n") : (textArray ?? "");

                const match = String(text).match(/\$\{([^}]*)\}/);
                if (match) text = String(text).replace(/\$\{[^}]*\}/g, `\\fs[24]${localPath}`);

                $gameSystem._drill_GFTH_styleId = 5;
                $gameTemp.drill_GFTH_pushNewText(text);

                $gameSelfSwitches.setValue([$gameMap.mapId(), 1, "Z"], true);
                $gameSelfSwitches.setValue([$gameMap.mapId(), 2, "Z"], true);

                let q = $gameVariables.value(86);
                if (!Array.isArray(q) || q === 0) q = [];
                q.push(String(localPath));

                $gameVariables.setValue(86, q);
              } catch (e) {
                console.warn("downloadOneFileCordovaZip success-log error:", e);
              }

              // 文件已经由插件写入 targetPath，这里不再调用 saveFile
              resolve(localPath);
            },
            function (err) {
              clearInterval(progressTask);
              retryOrReject(err || new Error("downloadFile error"));
            }
          );

        } catch (err) {
          clearInterval(progressTask);
          retryOrReject(err);
        }
      }
    }).catch(err => {
      clearInterval(progressTask); // 雖然不需要, 但為了安全
      retryOrReject(err);
    })

    function retryOrReject(err) {
      if (retries > 0) {
        console.warn(`[retry] ${localPath} (${retries} left):`, err && err.message ? err.message : err);

        let textArray = window.systemFeatureText && window.systemFeatureText.fileDownloadFailed;
        if (!textArray) textArray = "${} download failed! Try downloading again!";
        let text = Array.isArray(textArray) ? textArray.join("\n") : (textArray ?? "");
        const match = String(text).match(/\$\{([^}]*)\}/);
        if (match) text = String(text).replace(/\$\{[^}]*\}/g, `\\fs[24]\\c[10]${localPath}`);

        $gameSystem._drill_GFTH_styleId = 5;
        $gameTemp.drill_GFTH_pushNewText(text);

        setTimeout(() => {
          downloadOneFileCordovaZip(remoteUrl, localPath, retries - 1)
            .then(resolve)
            .catch(reject);
        }, 1000);
      } else {
        console.error(`[failed] ${localPath}:`, err && err.message ? err.message : err);
        reject(err instanceof Error ? err : new Error(String(err)));
      }
    }
  })
}

// 下载文件，失败时最多重试2次
function downloadOneFile(remoteUrl, localPath, retries = 3) {

  const isZip = /zip$/i.test(localPath);
  const isCordovaMobile = Utils.isMobileDevice() && window?.cordova?.plugin?.http;

  // ★ 安卓 + Cordova + zip → 用专用下载逻辑（包含进度轮询）
  if (isZip && isCordovaMobile) {
    $gameVariables.setValue(83, 10000);
    return downloadOneFileCordovaZip(remoteUrl, localPath, retries);
  }

  return new Promise((resolve, reject) => {

    httpRequest(remoteUrl, {
      // 如果是二进制文件(如 png, ogg),需要 xhr.responseType="arraybuffer"
      responseType: /(zip|png|jpg|ogg|m4a|rpgmvo|rpgmvp|webm|nlch)$/i.test(localPath)
        ? "arraybuffer" : "",
      // 反映大文件下载进度(通常指zip文件)
      onprogress: isZip ? progress => {
        if (progress.lengthComputable) {
          const percent = Math.floor((progress.loaded / progress.total) * 100);
          if (percent > 0) {
              $gameVariables.setValue(82, percent);
          }
        }
      } : null,
      onload(xhr) {
        if (xhr.status < 400) {
          try {
            // 增加下载进度
            $gameVariables.setValue(85, $gameVariables.value(85) + 1);
            // 显示下载日志
            let textArray = window.systemFeatureText && window.systemFeatureText.fileDownloadedSuccessfully;
            if (!textArray) textArray = "${} downloaded successfully!";
            let text = Array.isArray(textArray) ? textArray.join("\n") : (textArray ?? "");
            const match = String(text).match(/\$\{([^}]*)\}/);
            if (match) text = String(text).replace(/\$\{[^}]*\}/g, `\\fs[24]${localPath}`);

            $gameSystem._drill_GFTH_styleId = 5;
            $gameTemp.drill_GFTH_pushNewText(text);

            // 对象是压缩包时将激活后续解压缩流程
            if (isZip) {
              $gameSelfSwitches.setValue([$gameMap.mapId(), 1, 'Z'], true);
              $gameSelfSwitches.setValue([$gameMap.mapId(), 2, 'Z'], true);
              // 86号变量：非数组或为0 → 重置为 []
              let q = $gameVariables.value(86);
              if (!Array.isArray(q) || q === 0) q = [];
              q.push(String(localPath));
              $gameVariables.setValue(86, q);
            }

            saveFile(localPath, xhr.response, xhr.responseType)
              .then(() => resolve(localPath))
              .catch(reject);
          } catch (e) {
            retryOrReject(e);
          }
        } else {
          retryOrReject(new Error(`HTTP ${xhr.status}`));
        }
      },
      onerror: () => retryOrReject(new Error(`Network error → ${remoteUrl}`))
    })

    /* ---------------- 内部：失败处理 & 重试 ---------------- */
    function retryOrReject(err) {
      if (retries > 0) {
        console.warn(`[retry] ${localPath} (${retries} left):`, err.message);
        // 下载重试日志
        let textArray = window.systemFeatureText && window.systemFeatureText.fileDownloadFailed;
        if (!textArray) textArray = "${} download failed! Try downloading again!";
        let text = Array.isArray(textArray) ? textArray.join("\n") : (textArray ?? "");
        const match = String(text).match(/\$\{([^}]*)\}/);
        if (match) text = String(text).replace(/\$\{[^}]*\}/g, `\\fs[24]\\c[10]${localPath}`);

        $gameSystem._drill_GFTH_styleId = 5;
        $gameTemp.drill_GFTH_pushNewText(text);
        // 简单延迟 1 秒再重试；可按需改成指数退避
        setTimeout(() => {
          downloadOneFile(remoteUrl, localPath, retries - 1)
            .then(resolve)
            .catch(reject);
        }, 1000);
      } else {
        console.error(`[failed] ${localPath}:`, err.message);
        reject(err);
      }
    }
  });
};

function saveFile(localPath, fileData, responseType) {
  if (!localPath || fileData == null) {
    return Promise.reject(new Error('saveFile: invalid args'));
  }

  /* ---------- NW.js / Node ---------- */
  if (!Utils.isMobileDevice()) {
    return new Promise(async (resolve, reject) => {
      const zip = zipFile(localPath);
      const result = await zip.save(fileData);
      result ? resolve(zip.zipPath) : reject();
    })
  };

  /* ---------- Cordova / Capacitor ---------- */
  const isCordova = !!(window.cordova && window.resolveLocalFileSystemURL);
  if (!isCordova) {
    return Promise.reject(new Error('saveFile: unsupported environment'));
  }

  return new Promise((resolve, reject) => {
    const root = cordova.file.dataDirectory;              // 可写目录
    const dirs = localPath.split('/');
    const file = dirs.pop();

    // 递归建目录
    (function makeDir(base, idx) {
      return new Promise((res, rej) => {
        if (idx >= dirs.length) return res(base);
        window.resolveLocalFileSystemURL(base, dir => {
          dir.getDirectory(dirs[idx], { create: true }, sub =>
            res(makeDir(sub.nativeURL, idx + 1)), rej);
        }, rej);
      });
    })(root, 0).then(dirPath => {
      window.resolveLocalFileSystemURL(dirPath, dir => {
        dir.getFile(file, { create: true }, fe => {
          fe.createWriter(w => {
            w.onwriteend = () => resolve(fe.nativeURL);
            w.onerror = reject;
            const blob = (responseType === 'arraybuffer' && fileData instanceof ArrayBuffer)
              ? new Blob([fileData], { type: 'application/octet-stream' })
              : (fileData instanceof Blob)
                ? fileData
                : new Blob([String(fileData)], { type: 'text/plain;charset=utf-8' });
            w.write(blob);
          }, reject);
        }, reject);
      }, reject);
    }).catch(reject);
  });
}

function fetchGitHubDirectory(dirPath) {
  const apiUrl = githubCfg.contentsAPI(dirPath);
  return new Promise((resolve, reject) => {
    httpRequest(apiUrl, {
      responseType: 'json',
      onerror() {
        reject(new Error("Network Error to " + apiUrl));
      }
    }).then(arr => {
      try {
        if (!Array.isArray(arr)) {
          // 可能不是文件夹(如果dirPath指向单个文件)
          return reject(new Error("Not a directory or invalid response."));
        }
        // arr 里每项: { name, path, type, download_url, ... }

        // 准备一个空数组, 用于存储所有最终文件
        let filesList = [];

        // 我们用一个子函数,递归(或迭代)
        function processItem(item) {
          if (item.type === "file") {
            // 直接放入结果
            filesList.push({
              path: item.path,  // "066/www/data/AnsuzRevelation0.json"
              download_url: item.download_url,
              type: "file"
            });
          } else if (item.type === "dir") {
          }
        }

        // 处理 arr 每个元素
        // 这里演示"浅层"做法, 若想深层递归 => 需要在 type=dir时再次调用 fetchGitHubDirectory
        // 并合并返回
        let promises = arr.map(item => {
          if (item.type === "file") {

            if (item.name === "patchFileList.json" && item.download_url) {
              $gameSelfSwitches.setValue([$gameMap.mapId(), this._eventId, 'Z'], true);
              return fetch(item.download_url)
                .then(res => {
                  if (!res.ok) throw new Error("Failed to fetch patchFileList.json");
                  return res.json();
                })
                .then(fileList => {
                  filesList.push(...fileList);
                });
            } else {
              // 非索引文件
              // push后不需要再调, 直接resolve
              processItem(item);
              return Promise.resolve();
            }
          } else if (item.type === "dir") {
            return fetchGitHubDirectory(item.path)
              .then(subFiles => {
                filesList.push(...subFiles);
              });
          } else {
            return Promise.resolve();
          }
        });

        Promise.all(promises)
          .then(() => resolve(filesList))
          .catch(e => reject(e));

      } catch (e) {
        reject(e);
      }
    }).catch(({ status }) => {
      reject(new Error(`HTTP error ${status}`));
    })
  })
};

function downloadGitHubDirectory(dirPath) {
  return fetchGitHubDirectory(dirPath)
    .then(fileList => {
      // => 这是所有 (path, download_url)
      return batchDownloadFiles(fileList);
    });
}

// 读取下载列表的文件数
function listAllGitHubFiles(dirPath) {
  const apiUrl = githubCfg.treesAPI();
  return new Promise((resolve, reject) => {
    httpRequest(apiUrl, {
      responseType: 'json',
      onerror() {
        reject(new Error("Network Error"));
      }
    }).then(data => {
      try {
        // filter 出我们目录下的 blob（文件）
        const files = data.tree
          .filter(e => e.type === 'blob' && e.path.startsWith(dirPath))
          .map(e => ({
            path: e.path,
            download_url: githubCfg.rawTemplate + e.path
          }));
        resolve(files);
      } catch (e) { reject(e) }
    }).catch(({ status }) => {
      reject(new Error(`HTTP ${status}`));
    })
  })
};

/**
 * 批量下载
 * fileList: [ { path, download_url, type:"file" }, ... ]
 * 其中 path 例: "066/www/data/AnsuzRevelation0.json"
 */
function batchDownloadFiles(fileList) {
  let index = 0;
  function next() {
    if (index >= fileList.length) return Promise.resolve();
    let item = fileList[index++];
    return downloadGitHubFileToLocal(item.download_url, item.path).then(() => next());
  }
  return next();
}

/**
 * 例: downloadGitHubFileToLocal(url, path) => 先截取 path 里 "/www/" 后部分 => localPath
 */
function downloadGitHubFileToLocal(remoteUrl, fullPath) {
  // 1) 找 "/www/"
  let idx = fullPath.indexOf("www/");
  if (idx < 0) {
    // maybe we only handle subdir if path contain 'www/'
    console.warn("不含 www/, 跳过:", fullPath);
    return Promise.resolve();
  }
  let subPath = fullPath.substring(idx + 4); //  => "data/AnsuzRevelation0.json"

  // 2) 用之前写好的 downloadOneFile(remoteUrl, subPath)
  return downloadOneFile(remoteUrl, subPath);
}
