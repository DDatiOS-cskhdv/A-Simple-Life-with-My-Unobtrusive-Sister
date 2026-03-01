//=============================================================================
//
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc [弹幕模板库][玩家模板]
 * @author 仇九
 *
 * @help 
 * 
 *
 */
//=============================================================================
//
//=============================================================================

QJ.MPMZ.tl.checkPictureExists = function (pathSegments, fileNameWithExtension) {

  // PC / NW.js：保持同步返回
  if (Utils.isNwjs && Utils.isNwjs()) {
    const fs = require('fs');
    const path = require('path');
    const base = path.dirname(process.mainModule.filename);
    const filePath = path.join(base, ...pathSegments, fileNameWithExtension);
    return fs.existsSync(filePath);
  }

  // Mobile / Cordova：异步检查
  if (Utils.isMobileDevice && Utils.isMobileDevice()
      && window.cordova && window.resolveLocalFileSystemURL
      && cordova.file) {

    const rel = pathSegments.join('/') + '/' + fileNameWithExtension;

    // 先查 dataDirectory（自动更新用临时文件区），再查 applicationDirectory（包内原资源）
    const urls = [];
    if (cordova.file.dataDirectory) {
      urls.push(cordova.file.dataDirectory + rel);
    }
    if (cordova.file.applicationDirectory) {
      urls.push(cordova.file.applicationDirectory + 'www/' + rel);
    }

    return new Promise(resolve => {
      (function tryNext(i) {
        if (i >= urls.length) return resolve(false);
        window.resolveLocalFileSystemURL(
          urls[i],
          () => resolve(true),
          () => tryNext(i + 1)
        );
      })(0);
    });
  }

  // 其他环境
  return false;
};

Spriteset_Map.prototype.findTargetSprite = function (target) {
    return this._characterSprites.find(sprite => sprite._character === target);
};

//清除玩家冗余存档数据
QJ.MPMZ.tl.clearPlayerSaveRedundantData = function () {
    const TAG = "不可删除";

    function clearIndependent(independentList, dataTable, partyStore) {
        if (!Array.isArray(independentList) || !dataTable || !partyStore) return;

        for (let i = 0, len = independentList.length; i < len; i++) {
            const item = independentList[i];
            if (!item || typeof item !== "object") continue;

            const id = item.id;
            if (!id) continue;

            if (item.isSealed) continue;

            const baseData = dataTable[id];
            if (!baseData) continue;

            const desc = baseData.description;
            if (desc && desc.indexOf(TAG) !== -1) continue;

            const count = partyStore[id] || 0;
            if (count <= 0) {
                DataManager.removeIndependentItem(baseData);
            }
        }
    }

    clearIndependent(DataManager._independentWeapons, $dataWeapons, $gameParty._weapons);
    clearIndependent(DataManager._independentArmors,  $dataArmors,  $gameParty._armors);
};

//玩家异常状态检查
QJ.MPMZ.tl.ex_playerConditionCheck = function () {

    QJ.MPMZ.deleteProjectile('system');
	if (!$gameTemp._waitForPerformanceEnd) {
      for (let pictureId = 100; pictureId <= 119; pictureId++) {
          $gameScreen.erasePicture(pictureId);
      }
	}
    // 修正帧率
    Garasu_Descongelar();
    // 同步游戏时长
    let playedTime = $gameSystem.truePlaytimeText(false, true);
    document.title = $dataSystem.gameTitle + `    [PlayTime: ${playedTime}]`;
    if (window.nw?.Window) nw.Window.get().title = document.title;

    if ($gameMap.mapId() === 51) return;

    $gameSwitches.setValue(118, false);
	// 加载建言
	QJ.MPMZ.tl.ex_summonAnuszRune?.();	
    // 重置死因统计
    $gameStrings.setValue(20, "");
	// 重置特殊标记
	$gameTemp._isInBattle = false;
	$gamePlayer.drill_EFLAZ_restore();
    // 重置从者穿透标签
    $gamePlayer.drill_ETh_removeTagsByPattern("servant");
    // 显示时间
    QJ.MPMZ.tl.showGameTimeAndDays();
	// 强制显示虚拟按钮布局
	if (window.QJ) QJ.VB.controlVisible = true;
    // 重置武器栏
	if ($gameMap.getGroupBulletListQJ('playerEquipment').length == 0) {
	    $gameMap.steupCEQJ(100,1);
	}	

    let posX = "$gamePlayer.screenShootXQJ()";
    let posY = "$gamePlayer.screenShootYQJ() + 18";
    let actor = $gameParty.leader();

    let system = QJ.MPMZ.Shoot({
        img: "Shadow1",
        groupName: ['system', 'playerFeet'],
        position: [['S', posX], ['S', posY]],
        initialRotation: ['S', 0],
        imgRotation: ['F'],
        blendMode: 2,
        z: "E",
        opacity: 0.8,
        anchor: [0.5, 0.86],
        collisionBox: ['R', 20, 4],
        moveType: ['D', true],
        existData: [
        ],
        moveF: [
            [90, 30, QJ.MPMZ.tl.ex_abyssTimeFlow], // 在深渊时间自动流逝
            [20, 20, QJ.MPMZ.tl.ex_PlayerHitCheck], // 受击检测和无敌帧重置
            [60, 60, QJ.MPMZ.tl.ex_playerStuckCheck], // 玩家卡墙检测
            [60, 120, QJ.MPMZ.tl.ex_playerAttributeRefresh], // 玩家属性框刷新
			[5, 5, QJ.MPMZ.tl.ex_playerSwimmingCheck], // 检测是否处于水面
        ],
    });
	
    // 解决无武器问题 / 锻造锤卡手 
    if (!actor.equips()[0] || actor.equips()[0]?.baseItemId === 22) {
        actor.changeEquipById(1, 4);
    }
    // 右下角持有金UI
    let goldArgs = {
        text: window.systemFeatureText?.goldHeld?.join() || "Gold",
        x: 1890,
        y: 1050,
        width: 100,
        textAlign: 4,
        fontSize: ConfigManager.language > 1 ? 28 : 24,
        fontFace: "RiiTegakiFude",
        groupName: ['gold'],
        opacity: 1,
        scale: 1,
        z: "A"
    };
    QJ.MPMZ.tl.customShootText(goldArgs);
    QJ.MPMZ.Shoot({
        img: "imoutoUtil/gold",
        position: [['S', 905], ['S', 526]],
        initialRotation: ['S', 0],
        moveType: ['S', 0],
        existData: [],
        moveType: ['S', 0],
        scale: 0.5,
        onScreen: true
    });
    // 处理玩家身上未清算掉的金钱道具	
    const itemIdArray = [4, 5, 6, 7, 8, 9, 10, 11, 12];
    const allItems = $gameParty.allItems();
    for (const item of allItems) {
        if (!item) continue;
        if (!DataManager.isItem(item)) continue;
        if (!itemIdArray.includes(item.id)) continue;
        const qty = $gameParty.numItems(item);
        for (let i = 0; i < qty; i++) {
            QJ.MPMZ.tl.ex_playerDropsValueChange(item);
        }
    }
    // 初始化一些信息
    QJ.MPMZ.tl.initializeWaterDropState();

    // 生成从者
    QJ.MPMZ.tl.ServantResetAndRegeneration();
    // 防范行走图标记丢失
    QJ.MPMZ.tl.ex_playerSwitchesSpiritType();

    if (actor.isStateAffected(77)) {
        if ($gameSystem.hasGameTimeEvent("state77")) {
            $gameScreen._particle.particleSet(0, 'fireBirdBlessing', 'player', 'sparks_c');
        } else {
            actor.removeState(77);
        }
    }

    // 优化策略： 在大地图降低视野外事件的刷新频率
    if ([5, 28, 37, 47, 48].includes($gameMap.mapId())) {
		let startTime = $gameTemp._waitForPerformanceEnd ? 180 : 60;
        system.addMoveData("F", [startTime, 10, QJ.MPMZ.tl.ex_refreshFarEventDisabledCounters]);
    }

    // 临时方案：重制HP回复
    if (actor.hrg < 0) {
        actor.setHrg(0);
    }
    // 恶魔眼球
    if (actor.hasSkill(17)) {
        QJ.MPMZ.tl.DemonEyeballEffect();
    }    
    // 夜雾幻影
    if (actor.hasSkill(36)) {
        QJ.MPMZ.tl.ex_mistyNightPhantom();
    }
    // 猎人服
    if (actor.hasSkill(58)) {
        QJ.MPMZ.tl.ex_standHpRegen("start");
    }
    // 初号机枢
    if (actor.hasSkill(5)) {
        QJ.MPMZ.tl.InitializeUnitINexusFunction();
    }
    // 红色的角
    if (actor.hasSkill(68)) {
        QJ.MPMZ.tl.redHornRecharge({listener:true});
    }

};

// 要事件不在当前画面内（考虑缩放），就标记为屏外
QJ.MPMZ.tl.ex_refreshFarEventDisabledCounters = function () {
    const list = $gameMap.events();
    if (!list || !list.length) return;

    //console.log("所有事件："+count);  
    // 取当前可视范围（以未缩放的地图像素为单位）
    const rs = (window.drowsepost && drowsepost.rendersize) || null;
    const scale = rs?.scale || ($gameScreen.zoomScale ? $gameScreen.zoomScale() : 1) || 1;
    const viewW = rs?.width || Math.ceil(Graphics.width / scale);
    const viewH = rs?.height || Math.ceil(Graphics.height / scale);

    const tw = $gameMap.tileWidth(), th = $gameMap.tileHeight();
    const margin = tw + 48; // 边缘缓冲一格，避免抖动频繁进出

    for (let i = 0; i < list.length; i++) {
        const ev = list[i];
        if (!ev || !ev.page()) continue;
        if (ev.event()?.note?.includes('<ImmuneSlow>')) continue;
        // 事件相对屏幕左上角的像素坐标（已考虑滚动/循环）
        const x = ev.scrolledX() * tw;
        const y = ev.scrolledY() * th;

        const onScreen = (x >= -margin && x <= viewW + margin &&
            y >= -margin && y <= viewH + margin);

        ev._perfOffscreen = !onScreen;
        if (!onScreen) {
            ev._IsDisabledCounter = (ev._IsDisabledCounter || 0) + 9;
        }
    }

};

// 显示游戏内时间和天数
QJ.MPMZ.tl.showGameTimeAndDays = function (extraData = {}) {

    if (extraData.updateTime) {
        //$gameSystem.add_minute(1);
        let img = this.data.img;
        let time = $gameSystem.hour().padZero(2) + ":" + $gameSystem.minute().padZero(2);
        img[1].text = time;
        this.changeAttribute("img", img);
        return;
    }

    if ($gameMap.getGroupBulletListQJ('gameTime').length > 0) return;

    let time = $gameSystem.hour().padZero(2) + ":" + $gameSystem.minute().padZero(2);
    let timeArgs = {
        text: time,
        x: 1816,
        y: 72,
        width: -1,
        textAlign: 5,
        fontSize: 32,
        fontFace: "RiiTegakiFude",
        groupName: ['gameTime'],
        opacity: 1,
        scale: 1,
        moveF: [60, 60, QJ.MPMZ.tl.showGameTimeAndDays, [{ updateTime: true }]],
    };
    QJ.MPMZ.tl.customShootText(timeArgs);

    /*
    let day = "Day " + $gameSystem.day();	
    let dayArgs = { 
        text: day, 
        x:1700, 
        y:30, 
        width:240, 
        textAlign:6, 
        fontSize:42, 
        fontFace:"RiiTegakiFude", 
        opacity: 1,
        scale: 1,
        //moveF: [60,60,QJ.MPMZ.tl.showGameTimeAndDays,[{updateTime:true}]],
    };		
    QJ.MPMZ.tl.customShootText(dayArgs);
    */
};

// 从者重置-生成
QJ.MPMZ.tl.ServantResetAndRegeneration = function () {
    // 清理从者对象
    if ($gameMap.drill_COET_getEventsByTag_direct("从者").length > 0) {
        QJ.MPMZ.deleteProjectile('servant', { a: ['S', "this._needJS=true"] });
        setTimeout(() => QJ.MPMZ.tl.ServantResetAndRegeneration(), 100);
        return;
    }

    const actor = $gameParty.leader();
    const eqs = actor.equips();
    let sacabambaspis = [], cursedHand = 0, manekiNeko = 0;

    for (let i = 1; i < eqs.length; i++) {
        const a = eqs[i];
        if (a && DataManager.isArmor(a)) {
            const baseId = (typeof a.baseItemId === 'number') ? a.baseItemId : a.id;
            if (baseId === 36) manekiNeko++;
            if (baseId === 44) sacabambaspis.push(a.id);
            if (baseId === 47) cursedHand++;
        }
    }

    // 自动环绕型从者
    const bullets = $gameNumberArray.value(22);
    if (bullets.length > 0) QJ.MPMZ.tl.ex_orbitingBulletInitialization(bullets);

    // 招财猫
    if (manekiNeko > 0) {
        const { _x: XX, _y: YY } = $gamePlayer;
        $gameMap.spawnEventQJ(1, 118, XX, YY, false);
    }

    // 猪猪存钱罐
    if (actor.hasSkill(32)) {
        const { _x: XX, _y: YY } = $gamePlayer;
        const piggyBankCount = actor.equips().filter(e => e && DataManager.isArmor(e) && e.baseItemId === 37).length;
        QJ.MPMZ.Shoot({
            groupName: ['skinshipListeners'],
            extra: piggyBankCount,
            existData: [{ t: ['Time', 10] }],
            moveJS: [[1, 1, `let count = this.data.extra || 0;
		              if (count > 0) {
						  $gameMap.spawnEventQJ(1,111,${XX},${YY},false);
						  this.data.extra-=1;
					  }`]]
        });

        if (actor.equips().some(e => e && DataManager.isArmor(e) && e.baseItemId === 38)) {
            const eid = $gameMap.spawnEventQJ(1, 112, XX, YY, false);
            const e = $gameMap.event(eid);
            if (e) {
                e._needSE = false;
                const cond = DrillUp.g_COFA_condition_list[6];
                const pts = $gameMap.drill_COFA_getShapePointsWithCondition(Math.floor(XX), Math.floor(YY), "圆形区域", 3, cond);
                if (pts.length) { const p = pts[(Math.random() * pts.length) | 0]; e.locate(p.x, p.y); }
            }
        }
    }

    // 薯条和海鸥
    if ($gameSwitches.value(223)) $gameMap.steupCEQJ(291, 1);

    // 谢里斯的诅咒手
    if (cursedHand > 0) QJ.MPMZ.tl.ex_XerisesCursedHand();

    // 萨卡班甲鱼
    if (sacabambaspis.length) {
        sacabambaspis.forEach(aid => {
            QJ.MPMZ.tl.SacabambaspisCycloneJetCannon.call($dataArmors[aid], "summon");
        });
    }
};



//玩家攻击模式检测
QJ.MPMZ.tl.ex_playerAttackModeDetection = function () {

    if (!$gameParty.leader().equips()[0]) return;
    if ($gamePlayer.isStealthMode()) return;

    if ($gameMap.getGroupBulletListQJ('attackMonitoring').length > 0) return;
    let weaponType = $gameParty.leader().equips()[0].wtypeId;
    let swordType = [1, 2];
    let bowType = [3];
    let staffType = [5, 6, 7];
    // 剑攻击监听
    if (swordType.includes(weaponType)) {
        if ($gameMap.getGroupBulletListQJ('playerWeapon').length > 0) return;
        QJ.MPMZ.tl.ex_playermeleeAttackCheck();
        return;
    }
    // 弓攻击监听
    if (bowType.includes(weaponType)) {
        if ($gameMap.getGroupBulletListQJ('playerSkill').length > 0) return;
        if ($gameMap.getGroupBulletListQJ('playerBow').length > 0) return;
        QJ.MPMZ.tl.ex_playerBowAttackCheck();
        return;
    }
    // 法杖攻击监听
    if (staffType.includes(weaponType)) {
        if ($gameMap.getGroupBulletListQJ('playerStaff').length > 0) return;
        QJ.MPMZ.tl.ex_staffAlwaysVisible();
        return;
    }

    // 特殊武器
    if ($gameParty.leader().equips()[0].baseItemId === 61) {  //巨蜗吸尘器
        QJ.MPMZ.tl.ex_giantSnailVacuumsListener();
    }
    // 拳头
    if ($gameParty.leader().equips()[0].baseItemId === 4) {
        QJ.MPMZ.tl.ex_punchAttackListener();
    }

};

// 捡取物品转化为金钱
QJ.MPMZ.tl.ex_playerDropsValueChange = function (item) {

    if (!item) return;

    const itemType = DataManager.isItem(item)
        ? "item"
        : DataManager.isWeapon(item)
            ? "weapon"
            : DataManager.isArmor(item)
                ? "armor"
                : null;

    if (!itemType) return;

    let yieldRate = 1;

    if ($gameParty.leader().hasSkill(43)) {
        yieldRate *= 2;
    }

    const price = item.price || 0;
    const totalValue = Math.floor(price * yieldRate);

    if ($gameParty.hasItem(item, false)) {
        $gameParty.gainGold(totalValue);
        $gameParty.loseItem(item, 1);
    }
};

// 背包大小描述
QJ.MPMZ.tl.ex_playerCheckInventory = function (type) {

    //保险
    if ($gameParty.leader()._weaponAmountBonus < 0) {
        $gameParty.leader()._weaponAmountBonus = 0;
    }
    if ($gameParty.leader()._armorAmountBonus < 0) {
        $gameParty.leader()._armorAmountBonus = 0;
    }

    const MAP = {
        weapon: {
            pool: () => $gameParty._weapons,               // 所有武器实例
            capacity: () => $gameParty.leader()._weaponAmountLimit
                + $gameParty.leader()._weaponAmountBonus
        },
        gear: {
            pool: () => $gameParty._armors,                // 所有防具实例
            capacity: () => $gameParty.leader()._armorAmountLimit
                + $gameParty.leader()._armorAmountBonus
        }
    };

    const cfg = MAP[type];
    if (!cfg) return "";

    // 统计数量 / 上限
    const currentValue = Object.values(cfg.pool()).length;
    const maximumValue = cfg.capacity();
    const rate = currentValue / maximumValue;

    // 颜色与超限提示
    let color = 6, extraDesc = "";
    if (rate >= 0.5) color = 14;
    if (rate >= 0.7) color = 2;
    if (rate >= 1) {
        color = 10;
        let lang = ConfigManager.language;
        extraDesc = "\\fs[18]\\c[10]" + window.systemFeatureText.bagFull;
    }

    return `\\c[${color}]${currentValue}\\c[0]/${maximumValue}  ${extraDesc}`;
};

// 技能描述生成
QJ.MPMZ.tl.ex_playerSetSkillDescription = function (item) {

    if (!window.skillDescription) return "";
    let lines = [];
    let skillId = item.id;
    let skill = window.skillDescription[String(skillId)];
    if (!skill) return "";

    let fontSize = "\\fs[18]";
    if (ConfigManager.language >= 2) fontSize = "\\fs[16]";
    let skillName = skill.name;
    let skillLevel = "";
    // 技能等级显示
    if (skill.subtitle && skill.subtitle.join() === "true") {
        skillLevel = QJ.MPMZ.tl.playerSkillLevelDisplay(skillId);
    }
    // 技能开关状态
    if (item.animationId > 0) {
        let skillToggle = item.animationId - 1;
        skillToggle = window.skillDescription["skillToggle"][String(skillToggle)];
        skillLevel += `  \\fr\\fs[18]<${skillToggle}>`;
    }
    lines.push(`\\c[27]\\fs[28]${skillName} ${skillLevel}\\c[0]\\py[16]`);
    // 导入描述文本
    let descriptionArray = skill.description;
    let template = fontSize + "%TEXT%";
    descriptionArray = descriptionArray.map(t => template.replace("%TEXT%", t));
    descriptionArray[0] = "\\fr•" + descriptionArray[0];
    lines.push(...descriptionArray);

    // 技能特殊效果
    if (skill["ability"].length >= 1 && skill["ability"][0] !== "") {
        let abilityArray = skill["ability"];
        let template = "\\fr•\\c[108]" + fontSize + "%TEXT%";
        abilityArray = abilityArray.map(t => template.replace("%TEXT%", t));
        lines.push(...abilityArray);
    }

    let combinedText = lines.join("\n");
    return combinedText;

};


// 物品、武器、装备描述生成
QJ.MPMZ.tl.ex_playerSetItemDescription = function (item) {
  if (!item) return "";

  const lines = [];
  const fontSize = (ConfigManager.language >= 2) ? "\\fr\\fs[16]" : "\\fr\\fs[18]";

  // 独立物品适配
  let itemId = item.baseItemId != null ? item.baseItemId : item.id;

  let descTable = null;
  let colorCode = "";
  let showQuantity = false;

  // 判定类型 + 取颜色/描述表
  if (DataManager.isItem(item)) {
    descTable = window.itemsDescription;
    colorCode = ($gameTemp.drill_ITC_getColorCode_Item && $gameTemp.drill_ITC_getColorCode_Item(itemId)) || "";
    if (!!$gameTemp._shouldShowSwitchButton || $gameNumberArray.value(25).length === 0) showQuantity = true;
  } else if (DataManager.isWeapon(item)) {
    descTable = window.weaponsDescription;
    colorCode = ($gameTemp.drill_ITC_getColorCode_Weapon && $gameTemp.drill_ITC_getColorCode_Weapon(itemId)) || "";
  } else if (DataManager.isArmor(item)) {
    descTable = window.armorsDescription;
    colorCode = ($gameTemp.drill_ITC_getColorCode_Armor && $gameTemp.drill_ITC_getColorCode_Armor(item.id)) || "";
  }

  // 安全取：多语言描述对象
  const descObj = (descTable && descTable[String(itemId)]) ? descTable[String(itemId)] : null;

  // 工具：安全数组（避免 undefined.length）
  const asArray = (v) => Array.isArray(v) ? v : [];

  // 工具：把数组渲染成 bullet 列表（可选前缀/颜色等）
  function pushBulletLines(arr, template, bulletPrefix) {
    const a = asArray(arr).filter(t => t != null && String(t) !== "");
    if (a.length <= 0) return;

    const firstPrefix = bulletPrefix || "";
    const mapped = a.map(t => template.replace("%TEXT%", t));
    mapped[0] = firstPrefix + mapped[0];
    lines.push(...mapped);
  }

  // 道具名（descObj 有则用 descObj.name，否则用 item.name）
  const nameSuffix = item.nameSuffix || "";
  const displayName = descObj ? (descObj["name"] || item.name) : (item.name || "");

  let itemName = "";
  if (colorCode) {
    itemName = "\\fs[28]\x1bcsave\x1bcc[" + colorCode + "]" + displayName + nameSuffix + "\x1bcload";
  } else {
    itemName = "\\fs[28]" + displayName + nameSuffix;
  }
  itemName += `${fontSize}\\py[12]`;
  lines.push(itemName);

  // 显示道具持有数
  if (showQuantity) {
    //const needToHide = [2, 13, 14, 19, 77, 197, 235, 236, 80, 185];
    //const shouldHide = descObj && needToHide.includes(item.id) && $gameNumberArray.value(25).length === 0;
	const shouldHide = descObj?.["beIndependent"];
    if (!shouldHide) {
      const num = $gameParty.numItems(item);
      let quantityText = (window.systemFeatureText && window.systemFeatureText["quantityHeld"])
        ? window.systemFeatureText["quantityHeld"].join()
        : "";
      quantityText = quantityText.replace(/\$\{[^}]*\}/g, num);
      if (quantityText) lines.push(quantityText + "\\py[10]");
    }
  }

  // 没有多语言记录：走旧逻辑（同样做安全处理）
  if (!descObj) {
    const bottom = item.infoTextBottom || "";
    const top = item.infoTextTop || "";
    if (bottom && top) {
      lines.push(bottom, top);
    } else if (bottom) {
      lines.push(bottom);
    } else if (top) {
      lines.push(top);
    }
  } else {
    // subtitle
    pushBulletLines(
      descObj["subtitle"],
      fontSize + "\\c[110]\\fi%TEXT%",
      `${fontSize}•`
    );

    // 道具描述文本
    pushBulletLines(
      descObj["description"],
      fontSize + "%TEXT%",
      `${fontSize}•`
    );

    // 道具效果/能力
    const iconIndex = item.iconIndex || 0;
    pushBulletLines(
      descObj["ability"],
      fontSize + "•\\{\\i[" + iconIndex + "]\\}%TEXT%",
      "" // 这里模板已经带 bullet，不再额外加
    );
  }

  // 装备属性
  if (DataManager.isWeapon(item) || DataManager.isArmor(item)) {
    const paramIndices = [2, 3, 4, 5, 7];
    const paramIcons = ["\\i[17]", "\\i[19]", "\\i[18]", "\\i[20]", "\\i[22]"];
    const flat = item.flatParams || [0,0,0,0,0,0,0,0];
    // 强制使用像素字体标记面板数值
    const statsParts = ["\\fn[Madou Futo Maru Gothic]\\fs[20]"];

    for (let i = 0; i < paramIndices.length; i++) {
      const idx = paramIndices[i];
      const baseVal = (item.params && item.params[idx]) ? item.params[idx] : 0;
      const flatVal = flat[idx] || 0;
      const val = baseVal + flatVal;

      if (val > 0) {
        statsParts.push(flatVal > 0 ? ("\\c[10]" + paramIcons[i] + val + "\\c[0]") : (paramIcons[i] + val));
      }
    }

    if (statsParts.length > 1) {
      lines.push("•" + statsParts.join("  "));
    }
  }

  return lines.join("\n");
};



// 玩家武器换装
QJ.MPMZ.tl.ex_playerWeaponImage = function (fadeOut, weaponBroken) {
    
	let leader = $gameParty.leader();
	let weapon = leader.equips()[0];
    leader.removeStateCategoryAll('refreshNeeded');
    QJ.MPMZ.deleteProjectile('attackMonitoring');

    if (fadeOut) {
        QJ.MPMZ.deleteProjectile('playerWeaponImg', { d: [1, 10, 0] });
    } else {
        QJ.MPMZ.deleteProjectile('playerWeaponImg');
    }
    if (weapon) {
        let xx = 1872;
        let yy = 228;
        $gameScreen.showPicture(74, 'equip slot', 1, xx, yy, 100, 100, 255, 0);

        let posX = xx / $gameScreen.zoomScale();
        let posY = yy / $gameScreen.zoomScale();
        let index = weapon.id;
        // 武器描述
        let text = QJ.MPMZ.tl.ex_playerSetItemDescription(weapon);
        text = text.split("\n");
        index = weapon.iconIndex;

        if (leader.hasSkill(55)) {
		// 不可视效果	
            zz = "MF_UR";
        } else {
            zz = "A";
        }

        let iconScale = 0.5;
        if (Utils.isMobileDevice()) iconScale = 1;

        let playerWeaponImg = QJ.MPMZ.Shoot({
            groupName: ['playerWeaponImg', 'playerEquipment'],
            img: ['I', index],
            position: [['S', posX], ['S', posY]],
            initialRotation: ['S', 0],
            imgRotation: ['F'],
            scale: `0|0~10/1~5/${iconScale}~999999999|${iconScale}`,
            opacity: 1,
            immuneTimeStop: true,
            onScreen: true,
            moveType: ['S', 0],
            existData: [
                { t: ['S', 'this._broken', true], a: ['F', QJ.MPMZ.tl.ex_playerWeaponBroken], d: [0, 20] }
            ],
            moveF: [
                [4, 30, QJ.MPMZ.tl.ex_playerWeaponDurabilityMonitoring,[weapon]],
                [4, 60, QJ.MPMZ.tl.ex_playerWeaponDescriptionRefresh],
				[4, 30, QJ.MPMZ.tl.ex_playerWeaponDescriptionRefresh,[{durabilityReminder:true}]],
            ],
            z: zz
        });
        
		if ($gameSwitches.value(444)) {
			QJ.MPMZ.deleteProjectile('weaponDurabilityReminder');
			QJ.MPMZ.tl.ex_playerWeaponDurabilityText(weapon);
		}
		
        let picture = $gameScreen.picture(74);
        let bind = DrillUp.g_MPFP_list[2];

        if (!picture._drill_MPFP_bean) {
            picture._drill_MPFP_bean = new Drill_MPFP_Bean();
            $gameTemp._drill_MPFP_needRestatistics = true;
            picture.drill_COPWM_checkData();
        }
        // 武器描述窗口
        picture._drill_MPFP_bean.drill_bean_setVisible(true);
        picture._drill_MPFP_bean.drill_bean_setContextList(text);
        picture._drill_MPFP_bean.drill_bean_setSkinStyle(bind['style_mode'], bind['style_lockedId']);
        // 刷新攻击模组
        if (weaponBroken) {
            setTimeout(() => QJ.MPMZ.tl.ex_playerAttackModeDetection(), 500);
            return;
        }
        QJ.MPMZ.tl.ex_playerAttackModeDetection();

    } else {
        let xx = 1872;
        let yy = 228;
        $gameScreen.showPicture(74, 'equip slot_null', 1, xx, yy, 100, 100, 255, 0);

        let picture = $gameScreen.picture(74);

        if (picture._drill_MPFP_bean) {
            picture._drill_MPFP_bean.drill_bean_setVisible(false);
        }
    }
};

// 玩家武器描述刷新
QJ.MPMZ.tl.ex_playerWeaponDescriptionRefresh = function (extra = {}) {

	let leader  = $gameParty.leader();
	let weapon  = leader.equips()[0];
    let picture = $gameScreen.picture(74);	
    if (!weapon || !picture) return;

	if (extra.durabilityReminder) {
		// 武器耐久度显示器
        if (!$gameScreen.isPointerInnerPicture(74)) return;
		if ($gameMap.getGroupBulletListQJ('weaponDurabilityReminder').length > 0) return;
		QJ.MPMZ.tl.ex_playerWeaponDurabilityText(weapon);
		return;
	}
	
	if (extra.descriptionRefresh) {
		// 武器描述刷新		
		if ($gameScreen.isPointerInnerPicture(74)) return;
		let text = QJ.MPMZ.tl.ex_playerSetItemDescription(weapon);
		text = text.split("\n");
		let bind = DrillUp.g_MPFP_list[2];

		if (!picture._drill_MPFP_bean) {
			picture._drill_MPFP_bean = new Drill_MPFP_Bean();
			$gameTemp._drill_MPFP_needRestatistics = true;
			picture.drill_COPWM_checkData();
		}

		picture._drill_MPFP_bean.drill_bean_setVisible(true);
		picture._drill_MPFP_bean.drill_bean_setContextList(text);
		picture._drill_MPFP_bean.drill_bean_setSkinStyle(bind['style_mode'], bind['style_lockedId']);
		return;
	}

};

// 武器耐久度显示器文本
QJ.MPMZ.tl.ex_playerWeaponDurabilityText = function (weapon, extra = {}) {

  const DUR_INFINITY   = 114514;
  const POINTER_PIC_ID = 74;

  // 颜色阈值表
  const RULES = [
    { min: 40, text: "#ffffff", shadow: "#000000" },
    { min: 20, text: "#ffcfd7", shadow: "#bc8992" },
    { min:  5, text: "#ff738a", shadow: "#b85364" },
    { min: -Infinity, text: "#b9001f", shadow: "#b91e38" },
  ];

  const fadeOutAndKill = () => this.setDead({ t: ["Time", 0], d: [0, 30] });

  const getWeapon = () => weapon || $gameParty.leader().equips()[0];

  const buildDurImg = (wpn) => {
    if (!wpn) return null;

    const durMax = Number(wpn.durMax || 0);
    const dur    = Number(wpn.durability || 0);

    let rate = durMax > 0 ? (dur / durMax) * 100 : 0;

    let text = "";
    let fontSize = 12;

    if (dur === DUR_INFINITY) {
      text = "∞";
      rate = 100;
      fontSize = 20;
    } else {
      text = Math.floor(rate) + "%";
    }

    const rule = RULES.find(r => rate > r.min) || RULES[RULES.length - 1];

    return {
      text,
      arrangementMode: 0,
      textColor: rule.text,
      fontSize,
      outlineColor: "#000000",
      outlineWidth: 0,
      fontFace: "MPLUS2ExtraBold",
      fontItalic: false,
      fontBold: true,
      immuneTimeStop: true,
      width: 60,
      height: 100,
      textAlign: 4,
      lineWidth: 0,
      lineColor: "#ffffff",
      lineRate: 1.0,
      backgroundColor: null,
      backgroundOpacity: 1,
      shadowBlur: 8,
      shadowColor: rule.shadow,
      shadowOffsetX: 0,
      shadowOffsetY: 0
    };
  };

  // =========================
  // 刷新耐久度
  // =========================
  if (extra.durabilityTextChange) { 
    const alwaysShow = $gameSwitches.value(444);
    const shouldShow = alwaysShow || $gameScreen.isPointerInnerPicture(POINTER_PIC_ID);
    if (!shouldShow) return fadeOutAndKill();

    const wpn = getWeapon();
    if (!wpn) {
      if (alwaysShow) fadeOutAndKill();
      return;
    }

    const durImg = buildDurImg(wpn);
    if (durImg) this.changeAttribute("img", ["T", durImg]);
    return;
  }

  // =========================
  // 监听器初始化
  // =========================
  const wpn = getWeapon();
  if (!wpn) return;

  const zoom = $gameScreen.zoomScale() || 2;
  const durImg = buildDurImg(wpn);
  if (!durImg) return;
  QJ.MPMZ.Shoot({
    img: ['T', durImg],
    position: [['S', 1905 / zoom], ['S', 302 / zoom]],
    groupName: ['weaponDurabilityReminder', 'playerEquipment'],
    initialRotation: ['S', 0],
    imgRotation: ['F'],
    opacity: '0|0~30/1~999999|1',
    moveType: ['S', 0],
    z: "A",
    scale: 1 / zoom,
    onScreen: true,
    anchor: [1, 1],
    existData: [],
    moveF: [
      [30, 30, QJ.MPMZ.tl.ex_playerWeaponDurabilityText, [wpn, { durabilityTextChange: true }]]
    ]
  });
};

// 耐久度归零玩家武器被破坏
QJ.MPMZ.tl.ex_playerWeaponBroken = function () {
	let player = $gameParty.leader();
	let obj    = player.equips()[0];
	if (!player || !obj) return;
    // 播放随机 SE 音效
    let randomSeArray = ["剣で打ち合う3"];
    let randomSe = randomSeArray[Math.floor(Math.random() * randomSeArray.length)];
    let randomPitch = 85 + Math.randomInt(40);
    AudioManager.playSe({
        name: randomSe,
        volume: 100,
        pitch: randomPitch,
        pan: 0
    });

    // 取消攻击能力
    QJ.MPMZ.deleteProjectile('attackMonitoring');
    let posX, posY, mapX, mapY;
    // 标记武器破损的演出位置
    if ($gameMap.getGroupBulletListQJ('weaponMarker').length > 0) {
        let bulletId = $gameMap.getGroupBulletListQJ('weaponMarker')[0];
		posX = $gameMap._mapBulletsQJ[bulletId].inheritX();
		posY = $gameMap._mapBulletsQJ[bulletId].inheritY();
        mapX = $gameMap._mapBulletsQJ[bulletId]._realX;
        mapY = $gameMap._mapBulletsQJ[bulletId]._realY;
    } else {
		posX = $gamePlayer.screenBoxXShowQJ();
		posX = $gamePlayer.screenBoxYShowQJ();
        mapX = $gamePlayer.centerRealX()-0.5;
        mapY = $gamePlayer.centerRealY()-0.5;
    }

    // 武器破损闪光演出
	let name = "weaponBroken" + Math.randomInt(300);
    let data = $gameScreen._particle.particleSet(0, name, 'tilemap', 'aura_bp', 'above', mapX, mapY);  
    //$gameScreen._particle.particleUpdate(['aura_bp', 'pos', '0', '-12']);
    // $gameScreen._particle.particleUpdate(['aura_bp', 'color', '#ff4665']);
    if (data) data.clear = true;

    let chips = "weapon/weaponChip" + obj.baseItemId + "[6]";

    // 武器碎片破损粒子演出
    QJ.MPMZ.Shoot({
        initialRotation: 90,
        existData: [
            { t: ['Time', 6] }
        ],
        moveType: ['S', 0],
        position: [
            ['S', posX],
            ['S', posY]
        ],
        particles: [
            {
                img: chips,
                intervalTime: 1,
                bundleNumber: 5,
                synScale: true,
                offsetMin: [-36, -24, -10],
                offsetMax: [0, 24, 10],
                existTime: 80,
                disappearTime: 20,
                disappearScale: 0.5,
                scaleXMin: 1,
                scaleXMax: 1,
                moveType: [
                    '(()=>{let a = this.remA = this.remA ? this.remA : (Math.random()*3-1.5);return a*t;})()',
                    '(()=>{let a = t<30?t:(30+(t-30)/2);return 8/60*a*(60-a);})()'
                ]
            }
        ]
    });

    // 清理耐久度文本
    QJ.MPMZ.deleteProjectile('weaponDurabilityReminder');
    player.durabilityBreakItem(obj);

    // 移除特定状态并更新武器图像
    player.removeState(62);
    QJ.MPMZ.tl.ex_playerWeaponImage(true, true);
	
	// 记录被破坏武器数量
	let weaponBroken = $gameSelfVariables.value([1, 1, "weaponBroken"]);
    weaponBroken += 1;
	$gameSelfVariables.setValue([1, 1, "weaponBroken"], weaponBroken);
	
    // 武器破坏后且播放完演出效果强制唤出换装栏
	setTimeout(() => {
      $gameMap.steupCEQJ(101,1);
	}, 600);
};

// 玩家武器耐久度监听
QJ.MPMZ.tl.ex_playerWeaponDurabilityMonitoring = async function (weapon) {

  // --- 初始化状态（只做一次）---
  if (this._lastAboutToBreak == null) this._lastAboutToBreak = false;
  if (this._lastPower == null) this._lastPower = 0;

  // --- 无武器：清理并注销 ---
  if (!weapon) {
    QJ.MPMZ.deleteProjectile('playerWeaponImg');
    this._broken = false;
    this._aboutToBreak = false;
    return;
  }

  const durMax = Number(weapon.durMax || 0);
  const dur = Number(weapon.durability || 0);

  if (durMax <= 0 || dur < 0) {
    this._broken = true;
    return;
  }

  // 安卓版扛不住tone渐变效果性能消耗，关了
  if (Utils.isMobileDevice()) return;

  // --- 计算阶段 ---
  const rate = dur / durMax;
  this._broken = (dur <= 0);

  let aboutToBreak = false;
  let power = 0;

  if (rate < 0.05) {
    aboutToBreak = true;
    power = 250;
    // 低耐久弹提示（仅一次）
    if (!this._brokenWarning) {
      this._brokenWarning = true;

      let lang = ConfigManager.language;
	  let checkName = "durabilityLow" + lang;
	  const ok = await Promise.resolve(
		  QJ.MPMZ.tl.checkPictureExists(['img','projectiles','weapon'], `${checkName}.rpgmvp`)
	  );	  
      if (!ok) lang = 2;
      const imgName = 'weapon/durabilityLow' + lang;

      QJ.MPMZ.Shoot({
        groupName: ['durabilityLow'],
        img: imgName,
        position: [['S', 480], ['S', 270]],
        initialRotation: ['S', 0],
        imgRotation: ['F'],
        scale: 0.5,
        opacity: '0|0~30/1~9999/1',
        onScreen: true,
        moveType: ['S', 0],
        existData: [{ t: ['Time', 120], d: [1, 30, 1.25] }],
        z: "A"
      });
    }
  } else if (rate < 0.20) {
    aboutToBreak = true;
    power = 100;
  } else if (rate < 0.40) {
    aboutToBreak = true;
    power = 40;
  }

  // --- tone 只在状态变更时更新 ---
  if (aboutToBreak !== this._lastAboutToBreak || power !== this._lastPower) {
    if (aboutToBreak) {
      const change = `0|0~45/${power}~45/0`;
      this.changeAttribute('tone', [change, 0, 0, 0]);
    } else {
      this.changeAttribute('tone', [0, 0, 0, 0]);
    }
    this._lastAboutToBreak = aboutToBreak;
    this._lastPower = power;
  }

  this._aboutToBreak = aboutToBreak;
};



// 玩家装备换装
QJ.MPMZ.tl.ex_playerArmorImage = function (id, extra={}) {

  const actor = $gameParty.leader();
  actor.removeStateCategoryAll('refreshNeeded');

  const imgIndex = 74 + id;
  const bulletName = 'playerArmorImg' + id;

  const xx = 1872;
  const yy = 228 + id * 80;

  const zoom = $gameScreen.zoomScale() || 2;
  const posX = xx / zoom;
  const posY = yy / zoom;

  // 先清理旧显示
  QJ.MPMZ.deleteProjectile(bulletName, extra.fadeOut ? { d: [1, 10, 0] } : undefined);
  QJ.MPMZ.deleteProjectile("equipmentEffect");

  // 当前装备
  const equip = actor.equips && actor.equips()[id];

  // 小工具：取得 picture 并初始化/更新 MPFP bean
  const setupBean = (picture, lines, bind) => {
    if (!picture) return;

    if (!picture._drill_MPFP_bean) {
      picture._drill_MPFP_bean = new Drill_MPFP_Bean();
      $gameTemp._drill_MPFP_needRestatistics = true;
      picture.drill_COPWM_checkData && picture.drill_COPWM_checkData();
    }

    const bean = picture._drill_MPFP_bean;
    bean.drill_bean_setVisible(true);
    bean.drill_bean_setContextList(lines);
    bean.drill_bean_setSkinStyle(bind['style_mode'], bind['style_lockedId']);
  };

  const hideBean = (picture) => {
    if (picture && picture._drill_MPFP_bean) {
      picture._drill_MPFP_bean.drill_bean_setVisible(false);
    }
  };

  if (equip) {
    // 槽位底图
    $gameScreen.showPicture(imgIndex, 'equip slot', 1, xx, yy, 100, 100, 255, 0);

    // 装备描述文本
    let text = QJ.MPMZ.tl.ex_playerSetItemDescription(equip);
    const lines = String(text || "").split("\n");

    const icon = equip.iconIndex;
    const iconScale = Utils.isMobileDevice() ? 1 : 0.5;

    const gear = QJ.MPMZ.Shoot({
      groupName: [bulletName, 'playerEquipment'],
      img: ['I', icon],
      position: [['S', posX], ['S', posY]],
      initialRotation: ['S', 0],
      imgRotation: ['F'],
      scale: `0|0~10/1~5/${iconScale}~999999999|${iconScale}`,
      opacity: 1,
      onScreen: true,
      immuneTimeStop: true,
      moveType: ['S', 0],
      existData: [],
      z: "A"
    });

    // 部分装备需要持续刷新描述
    const needRefresh = !!(equip && equip.note && /<needRefresh>/i.test(equip.note));
    if (needRefresh && gear && gear.addMoveData) {
      gear.addMoveData("F", [60, 60, QJ.MPMZ.tl.ex_playerGearDescriptionRefresh, [id]]);
    }

    // 绑定装备描述窗口
    const picture = $gameScreen.picture(imgIndex);
    const bind = DrillUp.g_MPFP_list[2];
    setupBean(picture, lines, bind);

  } else {
    // 空槽
    $gameScreen.showPicture(imgIndex, 'equip slot_null', 1, xx, yy, 100, 100, 255, 0);
    hideBean($gameScreen.picture(imgIndex));
	/*
	// 闪烁效果，但看起来性能消耗太高了
	if ($gameScreen.picture(imgIndex) && !Utils.isMobileDevice()) {
		$gameScreen.picture(imgIndex).drill_PCE_playSustainingFlickerCos( 518400000, 120 );
	}
	*/
  }

  // 技能监听
  if (actor.hasSkill(89) || actor.hasSkill(90) || actor.hasSkill(91)) {
    QJ.MPMZ.tl.ex_playerCloseRangePiercingAttackListeners();
  }
};


// 玩家装备描述刷新
QJ.MPMZ.tl.ex_playerGearDescriptionRefresh = function (gid) {

    let imgIndex = 74 + gid;
    let picture = $gameScreen.picture(imgIndex);	
    if (!picture) return;
    if ($gameScreen.isPointerInnerPicture(imgIndex)) return;
	let gear = $gameParty.leader().equips()[gid];
    // 武器描述
    let text = QJ.MPMZ.tl.ex_playerSetItemDescription(gear);
    text = text.split("\n");
    let bind = DrillUp.g_MPFP_list[2];

    if (!picture._drill_MPFP_bean) {
        picture._drill_MPFP_bean = new Drill_MPFP_Bean();
        $gameTemp._drill_MPFP_needRestatistics = true;
        picture.drill_COPWM_checkData();
    }

    picture._drill_MPFP_bean.drill_bean_setVisible(true);
    picture._drill_MPFP_bean.drill_bean_setContextList(text);
    picture._drill_MPFP_bean.drill_bean_setSkinStyle(bind['style_mode'], bind['style_lockedId']);

};

// 玩家拆卸装备时触发特殊效果
QJ.MPMZ.tl.ex_playerUnequippingSpecialEffects = function (index, Equip, effect) {

    if (effect != null) return;

    let actor = $gameParty.leader();
    if (!actor) return;
    if (!Equip) {
        Equip = actor.equips()[index];
    }
    if (!Equip) return;

    if (DataManager.isWeapon(Equip)) {
        return;
    }

    if (DataManager.isArmor(Equip)) {
        // 招财猫
        if (Equip.baseItemId == 36) {
            let equips = actor.equips().filter(equip => equip && equip.baseItemId === 36);
            equips = equips.length;
            if (equips <= 0) {
                let BName = 'manekiNeko';
                QJ.MPMZ.deleteProjectile(BName, { a: ['S', 'this._needJS=true'] });
            }
            return;
        }
        // 猪猪存钱罐
        if (Equip.baseItemId == 37) {
            let BName = 'piggyBank' + Equip.id;
            QJ.MPMZ.deleteProjectile(BName, { a: ['S', 'this._needJS=true'] });
            return;
        }
        // 贪欲存钱罐
        if (Equip.baseItemId == 38) {
            let BName = 'goldenPiggyBank';
            QJ.MPMZ.deleteProjectile(BName, { a: ['S', 'this._needJS=true'] });
            return;
        }
    }

};

// 拆卸玩家身上的指定装备
QJ.MPMZ.tl.ex_unequipPlayerSpecifiedEquipment = function (item, effect, KeepIt) {

    let actor = $gameActors.actor(1);
    let equips = actor.equips();
    let isWeapon = DataManager.isWeapon(item);
    let isArmor = DataManager.isArmor(item);
    //console.log(isArmor);
    for (let index = 1; index < equips.length; index++) {
        let equip = equips[index];

        if (!equip) continue; // 跳过空装备
        if (isArmor && equip.id === item.id) {
            actor.changeEquipById(index + 1, null, effect);
            $gameMap.steupCEQJ(100, index, { equipFadeOut: true, equipChange: true, equipIndex: index });
            if (!KeepIt) $gameParty.loseItem(equip, 1);
            //console.log(`成功卸下装备: ${item.name} (槽位: ${index+1})`);
            return;
        }
    }

    //console.log(`未找到需要卸下的装备: ${item.name}`);
};

// 玩家在深渊的时间流动
QJ.MPMZ.tl.ex_abyssTimeFlow = function () {
    
    this._timeCoolDown = this._timeCoolDown || 0;
    if (this._timeCoolDown > 0) {
        this._timeCoolDown--;
        return;
    }
    
    this._timeCoolDown = 5;
    if (this.time % 3600 > 3300) {
        // 同步游戏时长
        let playedTime = $gameSystem.truePlaytimeText(false, true);
        document.title = $dataSystem.gameTitle + `    [PlayTime: ${playedTime}]`;
        if (window.nw?.Window) nw.Window.get().title = document.title;
    }

    $gamePlayer.refresh();

    // 检查是否处于时停条件
    if (!$gameSwitches.value(118) && !QJ.MPMZ.tl.ex_playerAntiClickDetection("timeFlow")) {

        if (QJ.MPMZ.rangeAtk([['P'],['P']],['B','timeStopField'],[],['C',10]).length == 0) {
            // 如果身处时停领域内，时间不流动
            $gameSystem.add_minute(1);
        }

        // 强制结束当天行程(玩家不可移动状态不触发)
        if ($gameSystem.hour() >= 17 && $gameSystem._drill_PAlM_enabled && !Utils.isOptionValid("test")) {
            $gameSwitches.setValue(16, true);
            $gameSwitches.setValue(3, false);
        }
    }

    // 动态监听玩家可能持有的异常状态
    let leader = $gameParty.leader();
	let equippedWeapon = leader.equips()[0];
    // 法杖吟唱状态
    if (leader.isStateAffected(68)) {
        let clearStatesAndEffects = () => {
            leader.removeState(65);
            leader.removeState(68);
            $gamePlayer.drill_ECE_endSustainingFloating();
            $gameScreen._particle.particleClear('mahoujin_c-P');
            $gamePlayer.drill_EASA_setEnabled(true);
        };
        if (!equippedWeapon) {
            clearStatesAndEffects();
            return;
        }
        let weaponType = equippedWeapon?.wtypeId;
        let staffTypes = [5, 6, 7];
        if (!staffTypes.includes(weaponType)) {
            clearStatesAndEffects();
        }
    }
    // 玩家攻击模式检测
    QJ.MPMZ.tl.ex_playerAttackModeDetection.call(this);

    // 防止闪步BUFF持续
    if (leader.isStateAffected(63)) {
        if ($gameMap.getGroupBulletListQJ('senPo').length == 0) {
            leader.removeState(63);
        }
    }
    // 防止闪步太刀BUFF持续
    if (leader.isStateAffected(80)) {
        if ($gameMap.getGroupBulletListQJ('senpoTach').length == 0) {
            leader.removeState(80);
        }
    }
    // 麻痹状态-如果计时器不存在了，需要立即删除状态
    if (leader.isStateAffected(7)) {
        if (!$gameSystem.hasGameTimeEvent("state7")) {
            leader.removeState(7);
        }
    }
    // 冻结状态-如果计时器不存在了，需要立即删除状态
    if (leader.isStateAffected(9)) {
        if (!$gameSystem.hasGameTimeEvent("state9")) {
            leader.removeState(9);
        }
    }
    // 眩晕状态-如果计时器不存在了，需要立即删除状态
    if (leader.isStateAffected(11)) {
        if (!$gameSystem.hasGameTimeEvent("state11")) {
            leader.removeState(11);
        }
    }
    // 美食武器-随时间融化
    if (equippedWeapon) {
        let weaponId = leader.equips()[0]?.baseItemId;
        if ([51, 53].includes(weaponId)) {
            let value = 1;
            if (leader.isStateAffected(14)) value += 1;
            equippedWeapon.durability -= value;
        }
    }
    // 鹿管-时间到了
    if (leader.hasSkill(85)) {
        QJ.MPMZ.tl.ItsTimeEffect();
    }
};


//玩家穿透子弹
QJ.MPMZ.tl.ex_playerBulletPhasing = function () {

    if ($gameSystem._ZzyTWFTheWorlding) return true;
    if ($gameSwitches.value(100)) return true;
    if ($gamePlayer.isJumping() || $gamePlayer._opacity < 150) return true;
    return false;

};

//玩家受伤判定
QJ.MPMZ.tl.ex_playerDamageCheck = function (baseDamage, damageType, effectId, probability, effectValue1, effectValue2) {

    // 无敌
    if ($gameSwitches.value(100)) return;

    let actor = $gameParty.leader();
    let player = $gamePlayer;

    if (player.drill_EFIE_isPlaying() || player.drill_EFOE_isPlaying()) return;

    if (actor._damageableCount > 0) {
        actor._damageableCount -= 1;

        let randomPitch = Math.randomInt(30) + 91;
        AudioManager.playSe({ name: "Damage5", volume: 40, pitch: randomPitch, pan: 0 });

        if (!Utils.isMobileDevice()) player.requestAnimation(141);

        if (!damageType) damageType = 1;
        // 伤害衰减
        if (this.opacity) {
            baseDamage *= this.opacity;
        }
        // 物理伤害
        if (damageType === 1) {
            baseDamage -= actor.def;
            baseDamage *= actor.grd;
            baseDamage = Math.max(1, Math.min(baseDamage, 99999));
        }
        // 魔法伤害
        if (damageType === 2) {
            let damageReduction = 0.01 * chahuiUtil.magicDefenseDamageReduction(actor.mdf);
            baseDamage -= baseDamage * damageReduction;
            baseDamage *= actor.grd;
            baseDamage = Math.max(1, Math.min(baseDamage, 99999));
        }

        let finalDamage = Math.floor(baseDamage);

        //伤害演出和实际受伤
        let posX = Math.randomInt(25) - 12;
        if (damageType === 1) {
            SimpleMapDamageQJ.put(2, -1, finalDamage, posX, -64);   //物理伤害演出
        } else if (damageType === 2) {
            SimpleMapDamageQJ.put(3, -1, finalDamage, posX, -72);	 //魔法伤害演出 
        }
        actor.gainHp(-finalDamage);

        //装备效果判定
        if (finalDamage > 0) {
            QJ.MPMZ.tl.ex_playerHitTriggerEffect(finalDamage);
        }
        //重伤判定
        if (actor.hpRate() <= 0.2 && finalDamage > 1) {
            $gameScreen.startShake(1, 8, 30);
            QJ.MPMZ.tl.ex_playerDamageFlash();
        }
    }

    // 异常状态判定
    if (!effectId || !probability) return;
    if (effectId <= 0) return;
    probability = probability * 1000 * actor.stateRate(effectId);
    if (probability < Math.randomInt(100000)) return;
    // 中毒
    if (effectId === 5) {
        if (!effectValue1) effectValue1 = 1;
        if (!effectValue2) effectValue1 = 4;
        QJ.MPMZ.tl.ex_playerPoison(effectValue1, effectValue2);
    }
    // 出血
    if (effectId === 6) {
        if (!effectValue1) effectValue1 = 1;
        if (!effectValue2) effectValue1 = 4;
        QJ.MPMZ.tl.ex_playerBleeding(effectValue1, effectValue2);
    }
    // 打雷
    if (effectId === 7) {
        if (!effectValue1) effectValue1 = 1;
        QJ.MPMZ.tl.ex_playerElectrified(effectValue1);
    }
    // 炎上
    if (effectId === 8) {
        if (!effectValue1) effectValue1 = 1;
        if (!effectValue2) effectValue1 = 4;
        QJ.MPMZ.tl.ex_playerBurning(effectValue1, effectValue2);
    }
    // 冰结
    if (effectId === 9) {
        if (!effectValue1) effectValue1 = 1;
        QJ.MPMZ.tl.ex_playerFreeze(effectValue1);
    }
    // 眩晕
    if (effectId === 11) {
        if (!effectValue1) effectValue1 = 1;
        QJ.MPMZ.tl.ex_playerParalysis(effectValue1);
    }    
};

// 玩家受击触发特效
QJ.MPMZ.tl.ex_playerHitTriggerEffect = function (damage) {

    //炸弹魔自爆	
    if ($gameParty.leader().hasSkill(34)) {
        let chance = 10 + 6 * $gameParty.leader().skillMasteryLevel(34);
        if (chance > Math.randomInt(100)) {
            let posX = $gamePlayer.screenBoxXShowQJ();
            let posY = $gamePlayer.screenBoxYShowQJ();
            QJ.MPMZ.tl.ex_bombFiendSoul(posX, posY, { posFix: true });
        }
    }
    //苹果头套的回复效果	
    if ($gameParty.leader().hasSkill(52)) {
        if (Math.random() > 0.5) {
            let extra = 10 + 2 * $gameParty.leader().skillMasteryLevel(52);
            let heal = Math.randomInt(extra) + extra - 9;
            heal = Math.round(heal * $gameParty.leader().pha);
            $gameParty.leader().gainHp(heal);
            heal = heal.toString();
            QJ.MPMZ.Shoot({
                img: ['T', heal, 0, '#06ff00', 12],
                position: [['P'], ['P']],
                initialRotation: ['S', 0],
                imgRotation: ['F'],
                opacity: '0|1~90/0',
                moveType: ['S', '0|1~90/0.1~999/0.1'],
                existData: [{ t: ['Time', 90] }]
            });
        }
    }
    //贪欲存钱罐-玛门的索取	
    if ($gameParty.leader().isStateAffected(116)) {

        if (damage < 10) damage = 10;
        if ($gameParty._gold <= 0) return;
        $gameParty.gainGold(-damage);
        function splitDeposit(deposit) {
            // 递减顺序的大额优先面值
            const coinValues = [50000, 10000, 5000, 1000, 500, 100, 50, 10];
            let result = [];

            for (let coin of coinValues) {
                let c = Math.floor(deposit / coin);
                if (c > 0) {
                    result.push({ coinValue: coin, count: c });
                    deposit -= c * coin;
                }
            }
            return result;
        }

        function coinValueToItemId(coinValue) {

            let coinArr = [10, 50, 100, 500, 1000, 5000, 10000, 50000];
            let index = coinArr.indexOf(coinValue);
            // 找到后 itemId = index + 4
            if (index >= 0) {
                return index + 4;
            }
            return 6;
        }

        let pieces = splitDeposit(damage);
        for (let piece of pieces) {
            let coinValue = piece.coinValue;
            let c = piece.count;
            if (c <= 0) continue;

            // 获取 itemId
            let itemId = coinValueToItemId(coinValue);
            QJ.MPMZ.Shoot({
                img: "null1",
                position: [['P'], ['P']],
                initialRotation: ['S', 0],
                imgRotation: ['F'],
                collisionBox: ['C', 1],
                moveType: ['S', 0],
                existData: [
                    { t: ['Time', c] },
                ],
                moveJS: [
                    [1, 0, `
                   dingk.Loot.getMapDrops($gamePlayer, $dataItems[${itemId}]);
                `],
                    [1, 0, "AudioManager.playSe({ name: 'Heal1', volume: 40, pitch: 130, pan: 0 })"],
                ]
            });
        }
    }
};

//玩家重伤演出
QJ.MPMZ.tl.ex_playerDamageFlash = function () {
	
	if ($gameMap.getGroupBulletListQJ('damageFlash').length > 5) return;
	
    QJ.MPMZ.Shoot({
        img: "damageFlash",
        groupName: ['damageFlash'],
        position: [['S', 0], ['S', 0]], 
		scale: 0.5,
        initialRotation: ['S', 0], 
		moveType: ['S', 0],
        opacity: '0|0~30/1~30/0', 
		anchor: [0, 0],
        imgRotation: ['F'], 
		existData: [
            { t: ['Time', 59] },
        ],
        z: "A", 
		onScreen: true
    })
};

//玩家感到兴奋
QJ.MPMZ.tl.ex_playerFeelsExcited = function () {
    var random = 80 + Math.randomInt(40);
    var se = { name: "039myuu_YumeSE_FukidashiHeart01", volume: 70, pitch: random, pan: 0 };
    AudioManager.playSe(se);

    let zoom = 1 / $gameScreen.zoomScale();

    QJ.MPMZ.Shoot({
        img: "imoutoUtil/feelsExcited",
        groupName: ['feelsExcited'],
        position: [['S', 0], ['S', 0]],
        scale: zoom,
        initialRotation: ['S', 0],
        moveType: ['S', 0],
        opacity: '0|0~30/1~30/0',
        anchor: [0, 0],
        imgRotation: ['F'],
        existData: [
            { t: ['Time', 59] },
        ],
        z: "A",
        onScreen: true
    })
};

//玩家可复活检测
QJ.MPMZ.tl.ex_playerCanRevive = function () {
    var actor = $gameParty.leader();
    // 火鸟的祝福
    if (actor.isStateAffected(77)) {
        $gameSystem.triggerGameTimeEventNow('fireBirdBlessing');
        actor.removeState(77);
        return 1;
    }

    var armorId = 26;
    var equips = actor.equips();
    var result = 0;

    for (var i = 0; i < equips.length; i++) {
        var item = equips[i];
        if (item && item.etypeId === 2 && item.baseItemId === armorId) {
            result = 1; // 拥有火鸟的羽毛
            break;
        }
    }

    return result;
};

//玩家防连点检测
QJ.MPMZ.tl.ex_playerAntiClickDetection = function (type) {
    let condition;
    switch (type) {
        case "generic":
            condition = !$gameSwitches.value(3) || $gameSwitches.value(14) || $gameMessage.isBusy() || $gamePlayer._drill_PT_is_lifting;
            break;

        case "itemUsing":
            condition = !$gameSwitches.value(3) || $gameSwitches.value(14) || $gameMessage.isBusy() || $gamePlayer._drill_PT_is_lifting || !$gamePlayer._drill_EASA_enabled;
            break;

        case "throwing":
            condition = !$gameSwitches.value(3) || $gameSwitches.value(14) || $gameMessage.isBusy() || $gamePlayer._drill_PT_is_lifting || !$gamePlayer._drill_EASA_enabled;
            break;

        case "lifting":
            condition = $gameSwitches.value(14) || $gamePlayer._drill_PT_is_lifting || !$gamePlayer._drill_EASA_enabled || $gamePlayer.drill_EASe_isPlayingAct();
            break;

        case "normalAttack":
            condition = !$gameSwitches.value(3) || $gameSwitches.value(14) || $gameMessage.isBusy() || $gamePlayer._drill_PT_is_lifting || $gameMap.isEventRunning() || $gameParty.leader()._characterName == "$player_swim" || $gameParty.leader()._characterName == "$player_maid";
            break;
        case "timeFlow":
            condition = $gameSystem._ZzyTWFTheWorlding;
            break;

        default:
            return true;
    }
    return condition;
};

//玩家快捷道具栏刷新
QJ.MPMZ.tl.ex_playerItemRefresh = function () {

    let useableItems = [];
    $gameParty.allItems().forEach(function (item) {
        if (item && item.note.includes('<useableItem>')) {
            useableItems.push(item.id);
        }
    });
    Ritter.ActiveItem_System.updateActiveIds(useableItems);
}

//玩家受击情况检查
QJ.MPMZ.tl.ex_PlayerHitCheck = function () {

    //玩家自动回复能力
    if ($gameParty.leader().hrg > 0) {
        QJ.MPMZ.tl.ex_playerAutoRecovery();
    }
    //玩家可受伤次数刷新 
    let damageableCount = 5;
    if ($gameParty.leader()._damageableCount !== damageableCount) {
        $gameParty.leader()._damageableCount = damageableCount;
    }

    //防止玩家没死成
    if (!$gameTemp._eventReserved && ($gameActors.actor(1).isStateAffected(1) || $gameActors.actor(1).hp <= 0)) {
        // 稻草人发动
        if (!$gameSystem.hasGameTimeEvent('scarecrowHeart') && $gameActors.actor(1).isStateAffected(115)) {
            if (!$gameSystem.hasGameTimeEvent('scarecrowHeartActivated')) {
                $gameSystem.addGameTimeEvent({ key: 'scarecrowHeart', delayMinutes: 3 });
                $gameSystem.addGameTimeEvent({ key: 'scarecrowHeartActivated', delayMinutes: 60 });
                $gameScreen._particle.particleSet(0, 'dark_hole_r_3', 'player');
                $gameScreen.startTint([-100, -100, -100, 0], 450);
            }
        }

        $gameMap.steupCEQJ(4, 1);

    }
    // 举物状态重置
    if ($gamePlayer._drill_PT_is_lifting) {
        $gameSwitches.setValue(195, true);
    }

    // 长按触发闪步
    if (Input.drill_isKeyPressed('空格')) {
        if (!$gameSwitches.value(203)) {
            QJ.MPMZ.tl.ex_senpo.call(this);
        }
    }


};

// 玩家自动回复能力
QJ.MPMZ.tl.ex_playerAutoRecovery = function () {

    // 死亡条件下不发动
    if ($gameTemp._eventReserved) return;

    if ($gameMap.getGroupBulletListQJ('playerAutoRecovery').length > 0) {
        let player = $gameParty.leader();
        let heal = 100 * player.hrg * player.pha;
        heal = Math.floor(heal);
		if (heal <= 0) return;
        player.gainHp(heal);
        if (player.hpRate() < 1) {
            heal = heal.toString();
            QJ.MPMZ.Shoot({
                img: ['T', heal, 0, '#06ff00', 12],
                position: [['P'], ['P']],
                initialRotation: ['S', 0],
                imgRotation: ['F'],
                opacity: '0|1~90/0',
                moveType: ['S', '0|1~90/0.1~999/0.1'],
                existData: [{ t: ['Time', 90] }]
            });
        }

    } else {

        QJ.MPMZ.Shoot({
            groupName: ['playerAutoRecovery'],
            img: "states/Regen[8,7]",
            position: [['P'], ['P']],
            initialRotation: ['S', 0],
            imgRotation: ['F'],
            blendMode: 0,
            scale: 1,
            anchor: [0.5, 0.6],
            moveType: ['D', true],
            collisionBox: ['C', 1],
            existData: [
                { t: ['S', '$gameParty.leader().hrg > 0 && $gameTemp._eventReserved', false], d: [0, 30] }
            ],
            moveJS: [
                [0, 60, "if ($gameParty.leader().hpRate() < 1) {this.changeAttribute('opacity',1)} else {this.changeAttribute('opacity',0)}"]
            ],
            //deadJS:["$gameScreen._particle.particleClear('mahoujin_c-H')"]
        });
    }
};

//玩家刷新攻击模式
QJ.MPMZ.tl.ex_playerUpdatesAttackMode = function () {

    QJ.MPMZ.deleteProjectile('playerWeapon');
    QJ.MPMZ.deleteProjectile('playerStaff');
    QJ.MPMZ.deleteProjectile('playerPunch');

    if ($gamePlayer.isStealthMode()) return;
    if (!$gameParty.leader().equips()[0]) return;

    let weaponType = $gameParty.leader().equips()[0].wtypeId;
    let swordType = [1, 2];
    let staffType = [5, 6, 7];

    if (swordType.includes(weaponType)) {
        QJ.MPMZ.tl.ex_playermeleeAttackCheck();
    }
    if (staffType.includes(weaponType)) {
        QJ.MPMZ.tl.ex_staffAlwaysVisible();
    }

    // 拳头
    if (!$gameParty.leader().equips()[0].baseItemId) {
        if ($gameParty.leader().equips()[0].id == 4) {
            QJ.MPMZ.tl.ex_punchAttackListener();
        }
    } else {
        if ($gameParty.leader().equips()[0].baseItemId == 4) {
            QJ.MPMZ.tl.ex_punchAttackListener();
        }
    }

};

QJ.MPMZ.tl.ex_playerAttributeRefresh = function () {
    const PIC_ID = 70;
    const pic = $gameScreen.picture(PIC_ID);

    // 已存在信息框：仅更新文本
    if (pic && pic._drill_MPFP_bean) {
        if ($gameScreen.isPointerInnerPicture(PIC_ID)) return;

        const actor = $gameActors.actor(1);
        if (!actor) return;

        // 生成参数文本
        const lineOf = (iconId, value, plusIdx, flatIdx, flatPosC, flatNegC) => {
            let s = `\\fn[RiiTegakiFude]\\fs[26]\\i[${iconId}]\\fs[22]: ${value}`;
            if (value >= 999) {
                s += " \\c[10]\\fs[18]\\fi REACHLIMIT! ";
            } else {
                const p = actor.paramPlus(plusIdx);
                const f = actor.paramFlat(flatIdx);
                if (p > 0) s += ` \\c[110]\\fs[18]\\fi(+${p}) `;
                if (f > 0) s += ` \\c[${flatPosC}](+${f})\\c[0] `;
                if (f < 0) s += ` \\c[${flatNegC}](${f})\\c[0] `;
            }
            return s;
        };

        const lines = [];
        // 攻击（idx 2）
        lines.push(lineOf(17, actor.atk, 2, 2, 10, 2));
        // 魔攻（idx 4）
        lines.push(lineOf(18, actor.mat, 4, 4, 23, 22));
        // 防御（idx 3）
        lines.push(lineOf(19, actor.def, 3, 3, 6, 14));
        // 魔抗（idx 5）+ 伤害减免提示
        {
            let mdfLine = `\\fn[RiiTegakiFude]\\fs[26]\\i[20]\\fs[22]: ${actor.mdf}`;
            mdfLine += ` \\c[31][-${chahuiUtil.magicDefenseDamageReduction(actor.mdf)}%]\\c[0]`;
            if (actor.mdf < 999) {
                const p = actor.paramPlus(5), f = actor.paramFlat(5);
                if (p > 0) mdfLine += ` \\c[110]\\fs[18]\\fi(+${p}) `;
                if (f > 0) mdfLine += ` \\c[6](+${f})\\c[0] `;
                if (f < 0) mdfLine += ` \\c[14](${f})\\c[0] `;
            }
            lines.push(mdfLine);
        }
        // 幸运、移动速度
        lines.push(`\\fn[RiiTegakiFude]\\fs[26]\\i[22]\\fs[22]: ${actor.luk}`);
        lines.push(`\\fn[RiiTegakiFude]\\fs[26]\\i[21]\\fs[22]: ${$gamePlayer.realMoveSpeed()}`);

        pic._drill_MPFP_bean.drill_bean_setVisible(true);
        pic._drill_MPFP_bean.drill_bean_setContextList(lines);
        return;
    }

    const isMobile = Utils.isMobileDevice();
    // 未创建：初始化图片与信息框
    if (isMobile) {
        $gameScreen.showPicture(PIC_ID, "OniichanHPBar", 0, 25, 12, 100, 350, 0, 0);
    } else {
        $gameScreen.showPicture(PIC_ID, "OniichanHPBar", 0, 25, 32, 100, 100, 0, 0);
    }

    const np = $gameScreen.picture(PIC_ID);
    np._drill_MPFP_bean = new Drill_MPFP_Bean();
    $gameTemp._drill_MPFP_needRestatistics = true;
    if (np.drill_COPWM_checkData) np.drill_COPWM_checkData();

    np._drill_MPFP_bean.drill_bean_setVisible(true);
    np._drill_MPFP_bean.drill_bean_setContextList(" ");
    np._drill_MPFP_bean.drill_bean_setSkinStyle("锁定皮肤样式", 3);

    // 绑定作弊码输入器（移动端）
    if (isMobile) {
        $gameScreen.setPictureCallCommon(PIC_ID, 18, 1, false);
        $gameScreen.setPictureCallCommon(PIC_ID, 405, 3, false);
    }
};

//玩家水中检查
QJ.MPMZ.tl.ex_playerSwimmingCheck = function () {

    if (!this || !$gamePlayer._drill_EASA_enabled) return;

    const canChangeOpacity = typeof this.changeAttribute === 'function';
    const leader = $gameParty.leader();
    const playerX = Math.floor($gamePlayer.centerRealX());
    const playerY = Math.floor($gamePlayer.centerRealY());
    const inWater = $gameMap.regionId(playerX, playerY) === 8 && !$gamePlayer.isJumping();

    /* 玩家在水中 -------------------------------------------------- */
    if (inWater) {

        if (canChangeOpacity) this.changeAttribute('opacity', 0);
		
        if (!$gameTemp._isPlayerInWater) {
			$gameTemp._isPlayerInWater = true;
			$gameMap.steupCEQJ(317, 1);
			return;
		}
        if (leader._characterName !== '$player_swim') {
            $gameScreen._particle.particleGroupSet(0, 'splash_cp', 'player');
            $gamePlayer.drill_EASe_stopAct();
            leader._characterName = '$player_swim';
            $gamePlayer.refresh();
            $gamePlayer.drill_EASA_setEnabled(true);
            leader.addState(67);
            $gameSwitches.setValue(14, true);
        }

        /* 玩家离开水面 ----------------------------------------------- */
    } else {

        if ($gameStrings.value(20).trim() === '' && canChangeOpacity) {
            this.changeAttribute('opacity', 0.8);
        }
		
        if ($gameTemp._isPlayerInWater) {
			$gameTemp._isPlayerInWater = false;
			$gameMap.steupCEQJ(318, 1);
			return;
		}

        if (leader._characterName === '$player_swim') {
            $gameMap.steupCEQJ(318, 1);
        }
    }
};
// 玩家是否可移动（返回true就是卡墙里了）
QJ.MPMZ.tl.isPlayerImmovable = function (playerX, playerY, extra = {}) {

    let noPass = false;
    let region = $gameMap.regionId(playerX, playerY);
    if ($gameNumberArray.value(5).includes(region)) {
        noPass = true;
    }
    let canThrough = $gamePlayer._through || $gamePlayer.isJumping() || $gameSwitches.value(100);
	
	if (extra.dropsCheck) {
		return	noPass && !canThrough;
	}
	
    let canMove = $gamePlayer.canPass(playerX, playerY, 2) ||
        $gamePlayer.canPass(playerX, playerY, 4) ||
        $gamePlayer.canPass(playerX, playerY, 6) ||
        $gamePlayer.canPass(playerX, playerY, 8);
    return	(noPass && !canThrough) || !canMove;
};
// 玩家卡墙检查
QJ.MPMZ.tl.ex_playerStuckCheck = function () {

    if ($gameMessage.isBusy()) {
        QJ.MPMZ.tl.ex_playerAttackCommandBlock();
    }

    let playerX = Math.floor($gamePlayer.centerRealX());
    let playerY = Math.floor($gamePlayer.centerRealY());

    if (QJ.MPMZ.tl.isPlayerImmovable(playerX, playerY)) {

        // 卡墙的碰撞伤害
        QJ.MPMZ.tl.ex_playerStuckCollisionDamage();

        var condition = DrillUp.g_COFA_condition_list[10];
        var c_area = $gameMap.drill_COFA_getShapePointsWithCondition(playerX, playerY, "圆形区域", 8, condition);

        if (c_area.length > 0) {
            var p = c_area[Math.floor(Math.random() * c_area.length)];
            var xPlus = p.x - playerX;
            var yPlus = p.y - playerY;
            $gamePlayer.jump(xPlus, yPlus);
        } else {
            $gamePlayer.jump(0, 0);
        }
    }

};

// 视情况切换行走图动画类型
QJ.MPMZ.tl.ex_playerSwitchesSpiritType = function () {

    let player = $gamePlayer;
    if (!player._drill_EASe_controller) return;
    let controller = player._drill_EASe_controller.drill_data();
    if (!controller) return;

    // 初始化移速记录
    $gameParty.leader()._baseSpeed = $gameParty.leader()._baseSpeed || 8;
    let baseSpeed = $gameParty.leader()._baseSpeed;
    let extraSpeed = 0;

    // 处于奔跑状态
    if (ConfigManager.alwaysDash) {
        player._moveSpeed = baseSpeed + extraSpeed;
        return;
    }
    // 处于走路或潜行状态
    if ($gameParty.leader().hasSkill(10) && $gameSwitches.value(145)) {
        // 忍者潜行
        controller.state_tank[0].tag_tank = [];
        controller.state_tank[31].tag_tank = ["<行走图-移动>"];
        extraSpeed += Math.floor($gameParty.leader().skillMasteryLevel(10) / 2) - 4;
        // 激活潜行检测脚本
        QJ.MPMZ.Shoot({
            img: "null1",
            groupName: ['playerStealth'],
            position: [['P'], ['P']],
            initialRotation: ['S', 0],
            imgRotation: ['F'],
            anchor: [0.5, 0.5],
            collisionBox: ['C', 60],
            moveType: ['D', true],
            existData: [
                { t: ['S', '$gameSwitches.value(145)', false] },
                { t: ['G', ['"enemy"']], a: ['F', QJ.MPMZ.tl.ex_playerStealthDetectionRange], p: [-1, true, true], c: ['T', 0, 30, true] },
            ],
            moveF: [
                [30, 15, QJ.MPMZ.tl.ex_playerStealthDetectionRange]
            ],
        });
    } else {
        controller.state_tank[0].tag_tank = ["<行走图-移动>"];
        controller.state_tank[31].tag_tank = [""];
    }

    player._moveSpeed = baseSpeed + extraSpeed;
};

// 玩家潜行中范围检测
QJ.MPMZ.tl.ex_playerStealthDetectionRange = function (args) {

    if (args.target instanceof Game_Event) {

        let chasing = false;
        let moved = $gamePlayer.isMoved();
        let alerted = !args.target._shouldAlert && args.target._canBeAlerted;
        if (args.target._enemyState && args.target._enemyState === 2) {
            chasing = true;
        }

        if (moved && alerted && !chasing) {

            // 标记子弹
            const randomX = Math.randomInt(1600) - 300;
            const name = 'stealth' + randomX;
            let bullet = QJ.MPMZ.Shoot({
                img: "null1",
                groupName: [name],
                position: [['S', randomX], ['S', 0]],
                initialRotation: ['S', 0],
                imgRotation: ['F'],
                onScreen: true,
                moveType: ['S', 0],
                scale: 0.5,
                existData: [
                    { t: ['Time', 61] }
                ],
            });

            let index = bullet.index;
            let posX = $gamePlayer.screenBoxXShowQJ();
            let posY = $gamePlayer.screenBoxYShowQJ() + 20;
            QJ.MPMZ.Shoot({
                img: "kosokoso",
                //groupName: ['sushiPudding'],
                position: [['S', posX], ['S', posY]],
                initialRotation: ['S', 0],
                imgRotation: ['S', 0],
                moveType: ['TB', name, 1.5, 10, 20],
                opacity: '0|0~30/1~60/0',
                scale: 0.5,
                z: "W",
                existData: [
                    { t: ['Time', 60], d: [0, 30] }
                ],
                moveF: [
                    //[90,999,QJ.MPMZ.tl.ex_sushiPuddingSummonAki]
                ],
                timeline: ['S', 0, 40, [-1, 8, 20]],
            });
            // 增加熟练度
            if (Math.random() > 0.4) {
                QJ.MPMZ.tl.ex_playerStealthProficiencyIncreased(1);
            }
        }
    }

};

// 潜行技能熟练度变化
QJ.MPMZ.tl.ex_playerStealthProficiencyIncreased = function (value) {

    $gameParty.leader().gainSkillMasteryUses(10, value);
    const uses = $gameParty.leader().skillMasteryUses(10);
    const masteryTable = [4, 15, 50, 150, 500, 1600, 4800, 12000, 24000, 36000];
    let newLevel = 0;
    for (let i = 0; i < masteryTable.length; i++) {
        if (uses >= masteryTable[i]) {
            newLevel = i + 1;
        } else {
            break;
        }
    }
    $gameParty.leader().setSkillMasteryLevel(10, newLevel);
    $gameParty.leader().setSkillMasteryUses(10, uses);

};

// 卡墙的碰撞伤害
QJ.MPMZ.tl.ex_playerStuckCollisionDamage = function () {

    if (!Utils.isMobileDevice()) $gamePlayer.requestAnimation(140);
    var realDamage = Math.floor($gameParty.leader().mhp * 0.05);
    SimpleMapDamageQJ.put(2, -1, realDamage, 0, -72);
    $gameParty.leader().gainHp(-realDamage);

    QJ.MPMZ.Shoot({
        img: "animehit[5,4]",
        position: [['P'], ['P']],
        initialRotation: ['S', 0],
        imgRotation: ['F'],
        collisionBox: ['C', 1],
        moveType: ['S', 0],
        existData: [
            { t: ['Time', 19] },
        ],
    });
};

//玩家坠落检测
QJ.MPMZ.tl.ex_playerFallCheck = function (Terrain) {

    // 确实处于踩空状态没有借助落脚点
    var condition1 = !$gameSwitches.value(188) && (Terrain || $gameMap.regionId(Math.floor($gamePlayer.centerRealX()), Math.floor($gamePlayer.centerRealY())) === 250);

    // 没有死因记录也不是虚无状态
    var condition2 = $gameStrings.value(20).trim() == "" && $gamePlayer._opacity > 100 && !$gamePlayer.isJumping() && !$gameTemp._eventReserved;

    var condition3 = $gameMap.getGroupBulletListQJ('playerInAir').length === 0

    return condition1 && condition2 && condition3;

};

//玩家攻击指令阻塞（防止对话框关闭时失误攻击）
QJ.MPMZ.tl.ex_playerAttackCommandBlock = function () {

    if ($gameMap.getGroupBulletListQJ('attackBlock').length == 0) {

        $gameSwitches.setValue(14, true);
        QJ.MPMZ.Shoot({
            img: "null1",
            groupName: ['attackBlock'],
            extra: 0,
            existData: [
                { t: ['Time', 600] },
                { t: ['S', "this.data.extra > 4", true] },
            ],
            moveJS: [
                [30, 15, "if($gameMessage.isBusy()){this.data.extra=0}else{this.data.extra+=1}"]
            ],
            deadJS: [
                "$gameSwitches.setValue(14, false)"
            ]
        });

    }

};

//检查玩家背包中武器容量
QJ.MPMZ.tl.checkplayerWeaponWeight = function () {
    if ($gameParty.leader()._weaponAmountLimit === undefined) $gameParty.leader()._weaponAmountLimit = 10;
    if (!$gameParty.leader()._weaponAmountBonus) $gameParty.leader()._weaponAmountBonus = 0;
    const limit = $gameParty.leader()._weaponAmountLimit + $gameParty.leader()._weaponAmountBonus;
    const weapons = Object.values($gameParty._weapons).length;

    if (weapons < limit) return true;

    var randomPitch = Math.randomInt(40) + 80;
    var se = { name: "014myuu_YumeSE_SystemBuzzer03", volume: 55, pitch: randomPitch, pan: 0 };
    AudioManager.playSe(se);

	let textArray = window.mapCommonEventDialogue?.inventoryOverweight?.weapon;
	if (!textArray) textArray = "Can’t carry more weapons!";
	let text = Array.isArray(textArray) ? textArray.join("\n") : (textArray ?? "");
	text = "\\fs[28]\\c[101]\\dDCOG[11:1:1:1]" + text;
    let posX = $gamePlayer.screenX() * $gameScreen.zoomScale();
    let posY = ($gamePlayer.screenY() * $gameScreen.zoomScale()) - 48;
    $gameTemp.drill_GFTT_createSimple([posX, posY], text, 5, 0, 120);

};


//检查玩家背包中装备容量
QJ.MPMZ.tl.checkplayerGearWeight = function () {
    if ($gameParty.leader()._armorAmountLimit === undefined) $gameParty.leader()._armorAmountLimit = 20;
    if (!$gameParty.leader()._armorAmountBonus) $gameParty.leader()._armorAmountBonus = 20;
    const limit = $gameParty.leader()._armorAmountLimit + $gameParty.leader()._armorAmountBonus;
    const armors = Object.values($gameParty._armors).length;

    if (armors < limit) return true;

    var randomPitch = Math.randomInt(40) + 80;
    var se = { name: "014myuu_YumeSE_SystemBuzzer03", volume: 55, pitch: randomPitch, pan: 0 };
    AudioManager.playSe(se);

	let textArray = window.mapCommonEventDialogue?.inventoryOverweight?.gear;
	if (!textArray) textArray = "Can’t carry more gears!";
	let text = Array.isArray(textArray) ? textArray.join("\n") : (textArray ?? "");
	text = "\\fs[28]\\c[101]\\dDCOG[11:1:1:1]" + text;
    let posX = $gamePlayer.screenX() * $gameScreen.zoomScale();
    let posY = ($gamePlayer.screenY() * $gameScreen.zoomScale()) - 48;
    $gameTemp.drill_GFTT_createSimple([posX, posY], text, 5, 0, 120);
};

//检查玩家背包中装备容量
QJ.MPMZ.tl.upgradeWeaponArmorLimit = function (type) {

    const isWeapon = (type === 'weapon');
    const isArmor = (type === 'armor');
    if (!isWeapon && !isArmor) {
        return false;
    }

    const actor = $gameParty.leader();
    if (!actor) return false;


    if (actor._weaponAmountLimit === undefined) actor._weaponAmountLimit = 10;
    if (actor._armorAmountLimit === undefined) actor._armorAmountLimit = 20;

    const limitKey = isWeapon ? '_weaponAmountLimit' : '_armorAmountLimit';
    let currentLimit = actor[limitKey];
    const maxLimit = 50;

    if (currentLimit >= maxLimit) {
        return false;
    }

    const base = isWeapon ? 10 : 20;
    const upgrades = currentLimit - base;        // 已经扩容过多少次
    const cost = Math.min(128, Math.pow(2, upgrades));

    if ($gameParty.numItems($dataItems[312]) < cost) {
        return false;
    }

    $gameParty.loseItem($dataItems[312], cost);

    actor[limitKey] = currentLimit + 1;
    return true;
};


//=============================================================================
//体术
//=============================================================================



//闪步
QJ.MPMZ.tl.ex_senpo = function () {

    if (!$dataMap?.note?.startsWith("<深渊>")) return;
    const leader = $gameParty.leader();

    // 屁股痛
    if (leader.isStateAffected(61)) return;

    if ($gameMessage.isBusy() || $gameSwitches.value(14) && !leader.isStateAffected(67)) return;
    // 潜行状态不允许冲刺
    if (!ConfigManager.alwaysDash && $gameSwitches.value(145)) return;

    if ($gameSwitches.value(203) || $gameSwitches.value(95) || $dataMap.disableDashing) {
		
		let textArray = window.mapCommonEventDialogue && window.mapCommonEventDialogue.skillOnCooldown?.[0];
        if (!textArray) textArray = "Skill On Cooldown!!";
        let text = Array.isArray(textArray) ? textArray.join("\n") : (textArray ?? "");
        text = "\\fs[28]\\c[101]\\dDCOG[11:1:1:1]" + text;
        const x = $gamePlayer.screenX() * $gameScreen.zoomScale();
        const y = ($gamePlayer.screenY() * $gameScreen.zoomScale()) - 48;
        $gameTemp.drill_GFTT_createSimple([x, y], text, 5, 0, 90);
        AudioManager.playSe({ name: "012myuu_YumeSE_SystemBuzzer01", volume: 70, pitch: 100, pan: 0 });
        return;
    }

    if ($gameMap.getGroupBulletListQJ('senpoTachi').length > 0) return;
    if ($gameMap.getGroupBulletListQJ('playerSkill').length > 0) return;
    // 铁砧打铁
    if (leader.hasSkill(77) && $gameMap.getGroupBulletListQJ('Anvil').length <= 0) {
        $gameTemp.reserveCommonEvent(307);
        return;
    }

    // 技能持续时间，基于玩家技能熟练度增加
    let skillDuration = 15 + leader.skillMasteryLevel(39);
    let time = 10;

    // 根据状态选择演出效果
    const isSpecialState = leader.isStateAffected(67);
    let r, g, b;

    if (!isSpecialState) {
        $gameScreen._particle.particlePlay(0, "fuss_startdash", "player", "def", "0.9");
        [r, g, b] = [255, 150, 0];
    } else {
        $gameScreen._particle.particleGroupSet(0, "splash_cp", "player");
        [r, g, b] = [50, 140, 200];
    }
    let color = [r, g, b, 255];

    // 播放音效
    AudioManager.playSe({ name: "Wind1", volume: 60, pitch: 140, pan: 0 });

    // 设置闪步状态开关
    $gameSwitches.setValue(95, false);
    $gameSwitches.setValue(100, true);
    $gameSwitches.setValue(203, true);
    leader.addState(63);

    // 保证走路时触发闪步时有最低位移
    if ($gamePlayer.realMoveSpeed() < 25) {
        $gamePlayer._moveSpeed = 20;
    }

    // 幽灵闪步效果：改变颜色、透明度和穿透性
    if (leader.hasSkill(92) || leader.hasSkill(73)) {
        color = [144, 0, 255, 255];
        if (leader.hasSkill(73)) {
            time += 30 + (20 * leader.skillMasteryLevel(73));
        }
        if (leader.hasSkill(92)) {
            $gamePlayer._through = true;
        }
    }

    // 红色有角三倍速效果：改变颜色、提升速度
    let redHorn = false;
    if (leader.hasSkill(68)) {
        if (leader.skillMasteryUses(68) > 0) {
            leader.gainSkillMasteryUses(68, -1);
            redHorn = true;
            color = [255, 0, 0, 255];
            skillDuration += 120;
            $gamePlayer._moveSpeed += 4;
            let tag = "tag:dash-P";
            $gameScreen._particle.particleGroupSet(0, tag, "screen", tag, "warp_s");
            setTimeout(() => $gameScreen._particle.pluginCommand(null, ['update', tag, 'color', '#ff0000'], 0), 1);
            AudioManager.playSe({ name: "Wind6", volume: 60, pitch: 140, pan: 0 });
        }
    }
    // 设置运动滤镜效果
    if (!Utils.isMobileDevice() && $gamePlayer.isMoved()) {
        $gameMap.createFilter("モーションブラー", "motionblur", 3999);
        $gameMap.setFilter("モーションブラー", [30, 0]);
        $gameMap.moveFilter("モーションブラー", [0, 0], skillDuration);
        $gameMap.eraseFilterAfterMove("モーションブラー");
    }
    // 计算残影间隔（根据移动速度）
    const moveSpeed = $gamePlayer.realMoveSpeed();
    const period = Math.max(0, 4 - Math.floor(moveSpeed / 48));

    let Senpo = QJ.MPMZ.Shoot({
        img: "null1",
        groupName: ['senPo', 'playerInAir'],
        position: [['P'], ['P']],
        initialRotation: ['PD'],
        scale: [1, 1],
        moveType: ['B', -1],
        opacity: 0,
        imgRotation: ['F'],
        anchor: [0.5, 0.5],
        existData: [
            { t: ['Time', skillDuration] }
        ],
        moveF: [
            [0, period, QJ.MPMZ.tl.ex_senpoResidualEffect, [-1, color, true, undefined, time]]
        ],
        z: "E",
        collisionBox: ['C', 1],
        deadF: [[QJ.MPMZ.tl.ex_senpoFinish, [{ redHorn: redHorn }]]]
    });

    // 女仆装状态下禁止以下操作
    if ($gamePlayer.isStealthMode()) return;

    // 闪步太刀监听器
    if (leader.hasSkill(3)) {
        QJ.MPMZ.Shoot({
            img: "null1",
            groupName: ['senpoTachiListener'],
            position: [['P'], ['P']],
            initialRotation: ['PD'],
            moveType: ['B', -1],
            opacity: 0,
            existData: [{ t: ['Time', 60] }],
            moveF: [[0, 0, QJ.MPMZ.tl.ex_senpoTachiListener]]
        });
    }

    // 适配荆棘套装的接近攻击能力
    if (leader.hasSkill(91)) {
        let damage = 5 + leader.skillMasteryLevel(91);
        damage += Math.floor(damage * (moveSpeed / 20));
        QJ.MPMZ.Shoot({
            img: "null1",
            groupName: ['2'],
            position: [['P'], ['P']],
            initialRotation: ['PD'],
            collisionBox: ['C', 30],
            moveType: ['B', -1],
            opacity: 0,
            existData: [
                { t: ['Time', skillDuration] },
                { t: ['G', ['"enemy"']], a: ['F', QJ.MPMZ.tl.customEnemyDamageCalculation, [damage, false]], p: [-1, false, true] }
            ]
        });
    }

    if (redHorn) {
        Senpo.addExistData({ t: ['S', "!$gamePlayer.isMoved()", true], a: ['S', "$gameMap.eraseFilter('モーションブラー')"], c: ['S', "this.time > 40"] });
    }
};

// 闪步残像生成
QJ.MPMZ.tl.ex_senpoResidualEffect = function (user, color = [0, 0, 0, 0], IsActionSequence = null, zIndex, time) {
    let finalZIndex = Utils.isMobileDevice() ? "W" : "MF_UG";
    if (typeof zIndex === "string") {
        finalZIndex = zIndex;
    }

    const target = (user > 0) ? $gameMap.event(user) : $gamePlayer;
    if (!target || !target.isMoved()) return;

    const posX = target.screenBoxXShowQJ();
    const posY = target.screenBoxYShowQJ();
    const isActionSequenceValue = (user > 0) ? !!IsActionSequence : !!$gamePlayer._drill_EASe_controller;
    const duration = (typeof time === 'number' && time > 0 && time <= 300) ? time : 10;

    const residual = QJ.MPMZ.Shoot({
        img: ['C', user],
        position: [['S', posX], ['S', posY]],
        initialRotation: ['S', 0],
        imgRotation: ['F'],
        moveType: ['S', 0],
        opacity: 0.3,
        blendMode: 0,
        tone: color,
        collisionBox: ['R', 22, 28],
        existData: [
            { t: ['Time', duration], d: [0, 60] },
            { t: ['G', ['"enemy"', '"object"']], a: [], p: [-1, false, true] }
        ],
        isActionSequence: isActionSequenceValue,
        z: finalZIndex,
    });

    if (user < 0 && $gameParty.leader().hasSkill(73)) {
        const commonParams = { p: [-1, false, true, undefined, undefined], cb: ['R', 48, 34] };
        residual.addExistData({ t: ['G', ['"enemy"', '"object"']], a: [], ...commonParams, p: [-1, false, true, QJ.MPMZ.tl.ex_eventHalt, QJ.MPMZ.tl.ex_eventRestart] });
        residual.addExistData({ t: ['B', ['enemyBullet', 'playerBullet']], p: [-1, false, true, QJ.MPMZ.tl.ex_20_inFunc, QJ.MPMZ.tl.ex_20_outFunc], cb: ['R', 48, 34] });
    }
    /*
    if ( $gameParty.leader().hasSkill(52) ) {
        residual.addTimeline(['S',0,2,[-1,1,1]]);
    }		
    */
};

//闪步太刀攻击模式监听
QJ.MPMZ.tl.ex_senpoTachiListener = function () {
    if ($gameSwitches.value(14) || $gameParty.leader()._characterName == "$player_swim") return;

    if ($gamePlayer.isDashing()) {
        $gamePlayer._moveSpeed = 8;
    }

    if ($gameSwitches.value(95) || $gameMap.getGroupBulletListQJ('playerSkill').length > 0) {
        return;
    }

    const performAttack = (attackFunction) => {
        QJ.MPMZ.deleteProjectile('senpoTachEffects');
        attackFunction();
        QJ.MPMZ.deleteProjectile('senpoTachiListener');
    };

    // 手柄检测
    const gamepads = navigator.getGamepads();
    if (gamepads && gamepads[0]) {
        const isPadAttack = Input.drill_isPadPressed('右摇杆上') || Input.drill_isPadPressed('右摇杆下') || Input.drill_isPadPressed('右摇杆左') || Input.drill_isPadPressed('右摇杆右');
        if (isPadAttack) {
            QJ.MPMZ.tl.ex_GamepadsChangePlayerDirection();
            performAttack(QJ.MPMZ.tl.ex_senpoTachiRelease);
        }
        return;
    }

    if (TouchInput.drill_isLeftPressed()) {
        performAttack(QJ.MPMZ.tl.ex_senpoTachiRelease);
    } else if (TouchInput.drill_isRightPressed()) {
        performAttack(QJ.MPMZ.tl.ex_senpoTachi);
    }
};


//闪步结束效果
QJ.MPMZ.tl.ex_senpoFinish = function (extra = {}) {
    const character = $gamePlayer;
    const leader = $gameParty.leader();

    if (!leader.hasSkill(36)) character._opacity = 255;
    character._moveSpeed = 8;
    character._through = false;
    $gameSwitches.setValue(95, false);
    $gameSwitches.setValue(100, false);
    leader.removeState(63);

    const isSpecialState = leader.isStateAffected(67);
    const type = isSpecialState ? 1 : 0;
    let coolDown = isSpecialState ? 120 : 60;

    if (leader.hasSkill(28)) {
        coolDown -= 15 * leader.skillMasteryLevel(28);
    }
    coolDown = Math.max(1, coolDown);
    // 红色有角三倍速
    if (extra.redHorn) {
        coolDown = 0;
        let tag = "tag:dash-P";
        $gameScreen._particle.reservePluginCommand(4, {}, ['clear', tag], 0);
    }
    leader.addState(64);
    const senPokinshi = QJ.MPMZ.Shoot({
        groupName: ['senPokinshi'],
        position: [['P'], ['P']],
        initialRotation: ['S', 0],
        imgRotation: ['F'],
        extra: type,
        collisionBox: ['C', 1],
        moveType: ['D', false],
        existData: [{ t: ['Time', coolDown] }],
        deadJS: ["$gameParty.leader().removeState(64);$gameSwitches.setValue(203, false)"]
    });

    if (coolDown > 10) {
        const animationId = (type === 1) ? 183 : 147;
        senPokinshi.addMoveData("JS", [coolDown - 10, 99999, `$gamePlayer.requestAnimation(${animationId})`]);
    }
};

//=============================================================================
//玩家技能
//=============================================================================

//近战普通攻击行为检测
QJ.MPMZ.tl.ex_playermeleeAttackCheck = function () {

    if (!$gameParty.leader().equips()[0]) return;
    let weaponType = $gameParty.leader().equips()[0].wtypeId;
    let swordType = [1, 2];
    if (!swordType.includes(weaponType)) return;
    if ($gameMap.getGroupBulletListQJ('playerWeapon').length > 0) return;

    var Monitor = QJ.MPMZ.Shoot({
        groupName: ['playerWeapon', 'attackMonitoring'],
        img: "null1",
        position: [['P'], ['P']],
        initialRotation: ['S', 0],
        moveType: ['B', -1],
        opacity: 0,
        collisionBox: ['C', 1],
        existData: [
        ],
        moveF: [
            [30, 2, QJ.MPMZ.tl.ex_playerMeleeAttackTrigger],
            [30, 2, QJ.MPMZ.tl.ex_playerSpecialAttackTrigger],
        ],
    });

    // 标记移动端
    if (Utils.isMobileDevice()) {
        Monitor._isMobile = true;
    }
};

// 手柄控制玩家朝向
QJ.MPMZ.tl.ex_GamepadsChangePlayerDirection = function () {

    $gamePlayer._directionFix = false;
    // 检测右摇杆
    const up = Input.drill_isPadPressed('右摇杆上');
    const down = Input.drill_isPadPressed('右摇杆下');
    const left = Input.drill_isPadPressed('右摇杆左');
    const right = Input.drill_isPadPressed('右摇杆右');

    // 是否有任何方向输入
    const isPadPressed = up || down || left || right;

    // 若玩家有推动右摇杆，则按4方向进行朝向
    if (isPadPressed) {
        // 优先级： 上 > 下 > 左 > 右
        // 如果按上+左 或 上+右，也都视作“上”。
        // 如果按下+左 或 下+右，也都视作“下”。
        if (up) {
            $gamePlayer.setDirection(8); // 向上
        } else if (down) {
            $gamePlayer.setDirection(2); // 向下
        } else if (left) {
            $gamePlayer.setDirection(4); // 向左
        } else if (right) {
            $gamePlayer.setDirection(6); // 向右
        }
    }
    $gamePlayer._directionFix = true;
};


// 近战普通攻击行为检测
QJ.MPMZ.tl.ex_playerMeleeAttackTrigger = function () {
    this._coolDown = this._coolDown || 0;
    if (this._coolDown > 0) {
        this._coolDown -= 1;
        return;
    }

    var GamepadsAttack = false;
    // 手柄检测
    if (navigator.getGamepads() && navigator.getGamepads()[0] !== null) {
        GamepadsAttack = !Input.drill_isPadPressed('LT') && (
            Input.drill_isPadPressed('右摇杆上') ||
            Input.drill_isPadPressed('右摇杆下') ||
            Input.drill_isPadPressed('右摇杆左') ||
            Input.drill_isPadPressed('右摇杆右')
        );
        if (GamepadsAttack) QJ.MPMZ.tl.ex_GamepadsChangePlayerDirection();
    }

    let Triggered = false;
    if (Utils.isMobileDevice()) {
        Triggered = $gameSwitches.value(201);
    } else {
        Triggered = TouchInput.drill_isLeftPressed();
    }

    if (!$gameSystem._drill_PAlM_enabled) return;

    if (Triggered || GamepadsAttack) {
        if (!$gameParty.leader().equips()[0]) return;
        let weaponType = $gameParty.leader().equips()[0].wtypeId;
        let swordType = [1, 2];
        if (!swordType.includes(weaponType)) return;

        if (QJ.MPMZ.tl.ex_playerAntiClickDetection("normalAttack")) return;
        if ($gameMap.getGroupBulletListQJ('playerSkill').length > 0) return;
        if (SceneManager._scene.drill_GBu_isOnGaugeButton()) return;
        if ($gameSwitches.value(181)) return;
        
        QJ.MPMZ.tl.ex_playerMeleeAttack();
        let level = $gameParty.leader().skillMasteryLevel(26);

        if (level > 8) {
            this._coolDown = 2;
        } else if (level > 6) {
            this._coolDown = 5;
        } else if (level > 4) {
            this._coolDown = 9;
        } else if (level > 2) {
            this._coolDown = 12;
        } else {
            this._coolDown = 14;
        }

        // 攻速修正
        this._coolDown = Math.round(this._coolDown * (1 - $gameParty.leader().cnt));
        this._coolDown = Math.max(this._coolDown, 1);
    }
};

// 近战普通攻击演出
QJ.MPMZ.tl.ex_playerMeleeAttack = function (extra={}) {
	    $gameSystem._drill_PAlM_enabled = false;
		const player = $gamePlayer;  
		let level    = $gameParty.leader().skillMasteryUses(26); 
		let phase    = "";
		let weapon   = extra.weaponId ? extra.weaponId : undefined;
		let waitTime = 8;
		if (level > 20) {
			phase    = 2;
			waitTime = 4;
		} else if (level > 8) {
			phase    = 1;
			waitTime = 6;
		} 
		let actName = $gameSwitches.value(17) ? "逆砍" + phase : "正砍" + phase;
		player.drill_EASe_stopAct();
		player.drill_EASe_setAct( actName );

        const extraSource = JSON.stringify(extra || {});
		QJ.MPMZ.Shoot({
		   existData: [ 
			 {t:['Time',waitTime*2],a:['S',`$gameSystem._drill_PAlM_enabled = true;
			                                if (Utils.isMobileDevice()) {
                                                $gamePlayer._directionFix = false;
                                            }`]}
		   ],
		   // 素振音效和斩击碰撞盒
		   moveJS:[
			 [waitTime,999,`let seNames = ["風切り音（誇張のない音。素早く）", "剣・棒状の風切り音1 ヒュン！"];
							let randomSeName = seNames[Math.floor(Math.random() * seNames.length)];
							let randomPitch = Math.randomInt(40) + 81;
							AudioManager.playSe({ name: randomSeName, volume: 60, pitch: randomPitch, pan: 0 });
							QJ.MPMZ.deleteProjectile('meleeAttack');
							QJ.MPMZ.tl.meleeAttack(${extraSource});
							$gameSwitches.setValue(17, !$gameSwitches.value(17));`]
		   ]
		});
};


// 近战特殊攻击行为检测
QJ.MPMZ.tl.ex_playerSpecialAttackTrigger = function () {
    var GamepadsAttack = false;

    if (this._isMobile) {
        if (Input.getPressTime('ok') > 30) GamepadsAttack = true;
    }

    // 手柄检测
    if (navigator.getGamepads() && navigator.getGamepads()[0] !== null) {
        GamepadsAttack = Input.drill_isPadPressed('LT') && (
            Input.drill_isPadPressed('右摇杆上') ||
            Input.drill_isPadPressed('右摇杆下') ||
            Input.drill_isPadPressed('右摇杆左') ||
            Input.drill_isPadPressed('右摇杆右')
        );
        if (GamepadsAttack) {
            QJ.MPMZ.tl.ex_GamepadsChangePlayerDirection();
            GamepadsAttack = 'Gamepad';
        }
    }

    if (TouchInput.drill_isRightPressed() || GamepadsAttack) {
        if (!$gamePlayer._drill_EASA_enabled) return;
        if (QJ.MPMZ.tl.ex_playerAntiClickDetection("normalAttack")) return;
        if ($gameSwitches.value(181)) return;
        if ($gameMap.getGroupBulletListQJ('Senpo').length > 0) return;
        if (!$gameParty.leader().equips()[0]) return;
        let weaponType = $gameParty.leader().equips()[0].wtypeId;
        let swordType = [1, 2];
        if (!swordType.includes(weaponType)) return;
        // 旋风斩
        QJ.MPMZ.tl.ex_senpuuGiri(GamepadsAttack);
    }
};


//近战普通攻击
QJ.MPMZ.tl.meleeAttack = function (extra={}) {

    let actor  = $gameParty.leader();
	
	if (extra.attackMiss) {
		if (!this || this._effectiveHit) return;
		// 剑术修行: 空挥
		if (actor.hasSkill(26)) {
			let value = Math.floor(1 * actor.pdr);
			actor.gainSkillMasteryUses(26, value);
			const uses = actor.skillMasteryUses(26);
			const masteryTable = [4, 15, 50, 150, 500, 1600, 4800, 12000, 24000, 36000];
			let newLevel = 0;
			for (let i = 0; i < masteryTable.length; i++) {
				if (uses >= masteryTable[i]) {
					newLevel = i + 1;
				} else {
					break;
				}
			}
			actor.setSkillMasteryLevel(26, newLevel);
			actor.setSkillMasteryUses(26, uses);
			$gamePlayer._directionFix = false;
		}
        return;		
	}
	
    let weapon = actor.equips()[0];
	if (extra.weaponId) weapon = $dataWeapons[extra.weaponId];
    if (!weapon) return;
    if ($gameMap.getGroupBulletListQJ('playerSkill').length > 0) return;

    let wid          = weapon.baseItemId ? weapon.baseItemId : weapon.id;
    let weaponImage  = "weapon/weapon" + wid;
    let weaponTrail  = "weapon/weaponTrail" + wid;
    let weaponScale  = actor.pdr;
    let weaponDamage = chahuiUtil.getVarianceDamage(1);
    let opacity      = $gamePlayer._opacity / 255;

    // 剑术修行加成
    if (actor.hasSkill(26)) {
        weaponDamage *= (100 + (1.8 ** actor.skillMasteryLevel(26))) / 100;
    }
    let level = actor.skillMasteryLevel(26);
    var rotation, angle, time, trailRotation, skillTime, zz, Talpha;

    if (level > 4) {
        angle = 25;
        time = 6;
        skillTime = 4;
    } else if (level > 2) {
        angle = 16.7;
        time = 9;
        skillTime = 6;
    } else {
        angle = 12.5;
        time = 12;
        skillTime = 8;
    }

    if (!$gameSwitches.value(17)) {
        rotation = -135;
        trailRotation = -90;
        scaleXY = [-weaponScale, weaponScale];
        var Anchor = [1, 1];
    } else {
        rotation = 135;
        trailRotation = 90;
        angle = -angle;
        scaleXY = [weaponScale, weaponScale];
        var Anchor = [1, 1];
    }

    if ($gameParty.leader().hasSkill(55)) {
        zz = "MF_BR";
        Talpha = 0.1 * opacity;
    } else {
        zz = "E";
        Talpha = 0.75 * opacity;
    }

    // 展示武器演出
    QJ.MPMZ.Shoot({
        img: weaponImage,
        groupName: ['meleeAttack', 'playerSkill'],
        position: [['P'], ['P']],
        initialRotation: ['PD', rotation],
        scale: scaleXY,
        opacity: opacity,
        moveType: ['D', true],
        imgRotation: ['R', angle, true],
        anchor: Anchor,
        existData: [
            { t: ['Time', time], d: [0, 10] }
        ],
        z: zz,
        collisionBox: ['C', 1],
    });

    // 安卓版刀光会报错
    let TrailEffect = [];

    if (!Utils.isMobileDevice()) {
        TrailEffect = [{
            img: ['L', 0.5, 1, 0, 0.999999999, 0.2, 0, 0, 0],
            existTime: 0,
            blendMode: 1,
            alpha: Talpha,
            disappearTime: 6,
            imgStretchMode: 0,
            ifProjctileWait: true,
            hOrV: true,
        }];
    }

    //武器伤害判定宽度
    let hitBoxWidth = 8;
    if (wid === 42) hitBoxWidth = 30;

    // 实际武器碰撞体判定
    var realBullet = QJ.MPMZ.Shoot({
        groupName: ['meleeAttack', 'playerSkill'],
        img: weaponTrail,
        position: [['P'], ['P']],
        initialRotation: ['PD', trailRotation],
        scale: [weaponScale, weaponScale],
        moveType: ['D', true],
        opacity: 0,
        imgRotation: ['R', angle, true],
        anchor: [0.5, 0.95],
        existData: [
            { t: ['Time', time], a: ['F', QJ.MPMZ.tl.meleeAttack, [{attackMiss:true}]] },
            { t: ['G', ['"enemy"', '"object"']], a: ['S', "this._effectiveHit = true"], p: [-1, false, true] },
            { t: ['G', ['"enemy"', '"object"']], a: ['F', QJ.MPMZ.tl.ex_toEnemyAttack, [Math.floor(weaponDamage), { allowAssassination: true, weaponAttack: true }]], p: [-1, false, true] },
            { t: ['B', 'enemyBullet'], p: [-1, false, true, QJ.MPMZ.tl.ex_weaponParry] }
        ],
        z: "E",
        collisionBox: ['R', hitBoxWidth, 64],
        judgeAccuracyRotation: 5,
        trailEffect: TrailEffect,
    });
    // 火属性
    if ([17, 19].includes(wid)) {
        realBullet.data.groupName.push("fire");
        $gameMap.addMapBulletsNameQJ(realBullet.index, realBullet.data.groupName);
    }

    //日轮-陨石术
    if (actor.hasSkill(57)) {
        let baseValue = 300;
        let luk = actor.luk;
        luk = Math.max(0, Math.min(600, luk));
        let adjustedValue = baseValue + (luk / 660) * 660;
        if (Math.randomInt(1001) < adjustedValue) {
            weapon.durability -= 40;
            realBullet.addMoveData("JS", [skillTime, 999, 'QJ.MPMZ.tl.ex_meteorStrike.call(this)']);
        }
    }

    //斩裂剑-斩剑波
    if (actor.hasSkill(44)) {
        realBullet.addMoveData("JS", [skillTime, 999, 'QJ.MPMZ.tl.ex_swordEnergyAttack.call(this)']);
    }

    //暴风兽人斧-剑刃风暴
    if (actor.hasSkill(56)) {
        realBullet.addMoveData("JS", [skillTime, 999, 'QJ.MPMZ.tl.ex_skillBladestorm.call($gamePlayer)']);
    }

    //柳叶剑特效
    if (wid === 80) {
        realBullet.addMoveData("F", [skillTime, 999, QJ.MPMZ.tl.ex_willowLeafEffects, ["meleeAttack"]]);
    }

    //多次攻击次数-燕返斩
    if (actor.hasSkill(99)) {
        var tsubameGaeshi = actor.skillMasteryLevel(99);
        var tsubameGaeshiTime = time;
        for (var i = 1; i <= tsubameGaeshi; i++) {
            tsubameGaeshiTime = Math.round(tsubameGaeshiTime / 2);
            realBullet.addMoveData("JS", [tsubameGaeshiTime, 999, 'QJ.MPMZ.tl.meleeAttackTsubameGaeshi.call(this)']);
        }
    }

    //多次攻击次数-胁差
    if (actor.hasSkill(78)) {
        var tsubameGaeshi = actor.skillMasteryLevel(78);
        var tsubameGaeshiTime = time;
        for (var i = 1; i <= tsubameGaeshi; i++) {
            tsubameGaeshiTime = Math.round(tsubameGaeshiTime / 2);
            realBullet.addMoveData("JS", [tsubameGaeshiTime, 999, "QJ.MPMZ.tl.meleeAttackTsubameGaeshi.call(this,'wakizashi')"]);
        }
    }

};

// 忍者技能-背刺熟练度变化
QJ.MPMZ.tl.backstabProficiencyChange = function () {
    let actor = $gameParty.leader();
    actor.gainSkillMasteryUses(11, 1);
    const uses = actor.skillMasteryUses(11);
    const masteryTable = [5, 27, 60, 120, 256, 530, 960, 1587, 2452, 3600];
    let newLevel = 1;
    for (let i = 0; i < masteryTable.length; i++) {
        if (uses >= masteryTable[i]) {
            newLevel = i + 2;
        } else {
            break;
        }
    }
    actor.setSkillMasteryLevel(11, newLevel);
    actor.setSkillMasteryUses(11, uses);
};

// 玩家技能等级显示
QJ.MPMZ.tl.playerSkillLevelDisplay = function (skillId) {

    let level = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'][
        $gameActors.actor(1).skillMasteryLevel(skillId).clamp(0, 11)
    ];
    return level
};

//闪步太刀-准备动作
QJ.MPMZ.tl.ex_senpoTachi = function (extra={}) {

    if (extra.Charge) {
        this._chargeCounter = this._chargeCounter || 0;
		if (this._chargeCounter < 999) {
			$gameScreen._particle.particleGroupSet(0, 'weapon_b1', 'player');
			let se = { name: "Up4", volume: 20, pitch: 120, pan: 0 };
			AudioManager.playSe(se);
			this._chargeCounter = this._chargeCounter || 0;
			this._chargeCounter += 150;
			this._chargeCounter = Math.min(1000, this._chargeCounter);
			this._chargeTone = Math.floor(Math.min(250, this._chargeCounter / 4));
			this.changeAttribute("tone", [this._chargeTone, 0, 0, 0]);
		} else if (!this._charged && this._chargeCounter > 999) {
			let se = { name: "Skill2", volume: 60, pitch: 100, pan: 0 };
			AudioManager.playSe(se);
			this._charged = true;
			this._chargeCounter = 1000;
			let data = $gameScreen._particle.particleSet(0, 'aura_bp2', 'player');
			$gameScreen._particle.particleUpdate(['aura_bp2', 'pos', '0', '-12']);
			$gameScreen._particle.particleUpdate(['aura_bp2', 'color', '#ff4665']);
			data.clear = true;
		}		
		return;
	}

    let actor = $gameParty.leader();
    if (actor._characterName !== "$player") return;
    if ($gameMap.getGroupBulletListQJ('playerSkill').length > 0) return;
	let weapon = actor.equips()[0];
    if (!weapon) return;
    let weaponType = weapon.wtypeId;
    let staffType = [1, 2];
    if (!staffType.includes(weaponType)) return;

    let se = { name: "剣を鞘にしまう", volume: 60, pitch: 100, pan: 0 };
    AudioManager.playSe(se);

    $gameSystem._drill_PAlM_enabled = false;
    $gamePlayer.drill_EASe_stopAct();
    $gamePlayer.drill_EASe_setSimpleStateNode(["闪步太刀准备"]);

    let zz          = actor.hasSkill(55) ? "MF_BR" : "E";
    let baseItemId  = weapon.baseItemId || 1;
    let weaponImage = "weapon/weaponTrail" + baseItemId;
    let weaponScale = actor.pdr;
    let Tachi = QJ.MPMZ.Shoot({
        img: weaponImage,
        groupName: ['playerSkill', 'senpoTachi'],
        position: [['P'], ['P']],
        initialRotation: ['S', 45],
        moveType: ['D', true],
        opacity: 1,
        scale: weaponScale,
        imgRotation: ['F'],
        anchor: [0.5, 0.7],
        existData: [
            { t: ['S', '!TouchInput.drill_isRightPressed()', true], a: ['F', QJ.MPMZ.tl.ex_senpoTachiRelease], c: ['S', 'this.time > 30'] },
            //{t:['P'],a:['C',269,[weaponDamage,0,0,0]],p:[-1,false,true]}
        ],
        z: zz,
        collisionBox: ['R', 8, 64],
        moveF: [
            [60, 60, QJ.MPMZ.tl.ex_senpoTachi, [{Charge:true}]],
        ],
        deadF: [[QJ.MPMZ.tl.ex_senpoTachiEffects]]
    });
};

//闪步太刀-释放
QJ.MPMZ.tl.ex_senpoTachiRelease = function () {
    let actor = $gameParty.leader();
    if (actor._characterName !== "$player") return;
    let weapon = actor.equips()[0];
    if (!weapon) return;
    let weaponType = weapon.wtypeId;
    let staffType = [1, 2];
    if (!staffType.includes(weaponType)) return;

    $gameSystem._drill_PAlM_enabled = true;
    actor.addState(80);

    let se = { name: "剣を抜く", volume: 80, pitch: 100, pan: 0 };
    AudioManager.playSe(se);

    let character = $gamePlayer;
    if (!$gameSwitches.value(191)) {
        var r = 255;
        var g = 150;
        var b = 0;
        var color = [r, g, b, 255];
    } else {
        var r = 50;
        var g = 140;
        var b = 200;
        var color = [r, g, b, 255];
    }

    //检测移动方向
    let mouseX = TouchInput.x / $gameScreen.zoomScale();
    let mouseY = TouchInput.y / $gameScreen.zoomScale();
    let ax = character.centerRealX();
    let ay = character.centerRealY();
    let bx = (mouseX / 48) + $gameMap.displayX();
    let by = (mouseY / 48) + $gameMap.displayY();
    let deg = QJ.calculateAngleByTwoPointAngle(ax, ay, bx, by);

    character.drill_EASe_stopAct();
    let direction;
    let angle;
    let speed;
    if (deg > 180) {
        character.drill_EASe_setAct(["闪步太刀-左"]);
        direction = 1;
        angle = 60;
        speed = 28.3;
    } else {
        character.drill_EASe_setAct(["闪步太刀-右"]);
        direction = 2;
        angle = 300;
        speed = -28.3;
    }
    character.drill_EASA_setEnabled(true);
    let posX = "$gamePlayer.screenBoxXShowQJ() - 10";
    let posY = "$gamePlayer.screenBoxYShowQJ() + 8";
    let weaponImage = "weapon/weaponTrail" + weapon.baseItemId;
    let weaponDamage = chahuiUtil.getVarianceDamage(1);
    let weaponScale = actor.pdr;
    let knockUp = 0;
    let knockUpHight = 0;
    //蓄力的情况
    if (this && this._chargeCounter) {
        let extraDamage = weapon.params[2];
        extraDamage *= (1.02 ** (this._chargeCounter / 10)) - 1;
        weaponDamage += Math.floor(extraDamage);
        knockUp = 20;
        knockUpHight = Math.floor(this._chargeCounter / 2);
    }

    let zz, Talpha;
    if (actor.hasSkill(55)) {
	// 无影剑	
        zz = "MF_UR";
        Talpha = 0.1;
    } else {
        zz = "W";
        Talpha = 0.75;
    }
    // 安卓版刀光会报错
    let TrailEffect = [];
    if (!Utils.isMobileDevice()) {
        TrailEffect = [{
            img: ['L', 0.5, 72, 0, 0.999999999, 0.2, 0, 0, 0],
            existTime: 0,
            blendMode: 1,
            alpha: Talpha,
            disappearTime: 20,
            imgStretchMode: 0,
            ifProjctileWait: true,
            hOrV: true
        }];
    }

    let Tachi = QJ.MPMZ.Shoot({
        groupName: ['senpoTach', 'playerSkill'],
        img: weaponImage,
        position: [['S', posX], ['S', posY]],
        initialRotation: ['S', angle],
        moveType: ['D', true],
        opacity: '0|1~10|1~14/0',
        scale: weaponScale,
        extra: direction,
        imgRotation: ['R', speed, true],
        judgeAccuracyAnchor: 0.04,
        anchor: [0.5, 0.8],
        existData: [
            { t: ['Time', 24] },
            { t: ['G', ['"enemy"', '"object"']], a: ['F', QJ.MPMZ.tl.ex_toEnemyAttack, [weaponDamage, { fullPower: true, weaponAttack: true }]], p: [-1, false, true] },
            { t: ['G', ['"enemy"', '"object"']], a: ['C', 148, [0, knockUp, knockUpHight, 0]], p: [-1, false, true] },
            { t: ['B', 'enemyBullet'], p: [-1, false, true, QJ.MPMZ.tl.ex_weaponParry] }
        ],
        z: zz,
        collisionBox: ['R', 8, 64],
        trailEffect: TrailEffect,
        moveF: [
            [1, 0, QJ.MPMZ.tl.ex_senpoTachiFix],
            [0, 2, QJ.MPMZ.tl.ex_senpoResidualEffect, [-1, color]]
        ],
        deadJS: ["$gameParty.leader().removeState(80);$gameSystem._drill_PAlM_enabled = true;"]
    });

    // 火属性
    if ([17, 19].includes(weapon.baseItemId)) {
        Tachi.data.groupName.push("fire");
        $gameMap.addMapBulletsNameQJ(Tachi.index, Tachi.data.groupName);
    }

    //柳叶剑特效
    if (weapon.baseItemId === 80) {
        Tachi.addMoveData("F", [5, 5, QJ.MPMZ.tl.ex_willowLeafEffects, ["meleeAttack"]]);
    }

    //斩裂剑-斩剑波
    if (actor.hasSkill(44)) {
        let swordEnergyAttackScale = 0.75 * actor.pdr;
        if (this && this._chargeCounter && this._chargeCounter > 0) {
            swordEnergyAttackScale += this._chargeCounter / 500;
        }
        let swordEnergyAttackCode = 'QJ.MPMZ.tl.ex_swordEnergyAttack.call(this,' + swordEnergyAttackScale + ')';
        Tachi.addMoveData("JS", [5, 999, swordEnergyAttackCode]);
    }

    //日轮-陨石术
    if (actor.hasSkill(57)) {
        const playerX = $gamePlayer.screenBoxXShowQJ();
        const playerY = $gamePlayer.screenBoxYShowQJ();
        weapon.durability -= 40;
        Tachi.addMoveData("JS", [20, 999, `QJ.MPMZ.tl.ex_meteorStrike.call(this,${playerX},${playerY})`]);
    }

    //剑圣-免许皆传
    if (actor.hasSkill(100)) {
        QJ.MPMZ.Shoot({
            groupName: ['senpoTach', 'playerSkill'],
            img: weaponImage,
            position: [['S', posX], ['S', posY]],
            initialRotation: ['S', angle],
            moveType: ['D', true],
            opacity: 0,
            scale: weaponScale * 3,
            imgRotation: ['R', speed, true],
            judgeAccuracyAnchor: 0.04,
            anchor: [0.5, 0.8],
            existData: [
                { t: ['Time', 24] },
                { t: ['G', ['"enemy"', '"object"']], a: ['F', QJ.MPMZ.tl.ex_toEnemyAttack, [weaponDamage, { fullPower: true, weaponAttack: true }]], p: [-1, false, true] },
                { t: ['G', ['"enemy"', '"object"']], a: ['C', 148, [0, knockUp, knockUpHight, 0]], p: [-1, false, true] },
                { t: ['B', 'enemyBullet'], p: [-1, false, true, QJ.MPMZ.tl.ex_weaponParry] }
            ],
            z: "MF_UR",
            collisionBox: ['R', 8, 64],
            trailEffect: TrailEffect,
            moveF: [
                [1, 0, QJ.MPMZ.tl.ex_senpoTachiFix],
            ],
        });
    }

};

//闪步太刀特效
QJ.MPMZ.tl.ex_senpoTachiEffects = function (extra={}) {
	
	if (extra.clickDetection) {
		if (TouchInput.drill_isLeftPressed() || TouchInput.drill_isLeftTriggered()) {
			QJ.MPMZ.deleteProjectile('senpoTach');
			QJ.MPMZ.deleteProjectile('meleeAttack');
			QJ.MPMZ.tl.ex_senpoTachiRelease();
		}		
		return;
	}
	
    if (this.time < 30) {
        return;
    }
    QJ.MPMZ.deleteProjectile('senpoTachEffects');
    let extraCount = 0;

    if (!this._charged) {
        extraCount += Math.floor(this.time / 90);
    } else {
        extraCount += 3;
    }
    extraCount += $gameMap.getAttackExtraCount();

    if (extraCount > 0) {
        let time = extraCount * 40;
        let effects = QJ.MPMZ.Shoot({
            img: "null1",
            groupName: ['senpoTachEffects'],
            position: [['P'], ['P']],
            initialRotation: ['S', 0],
            imgRotation: ['F'],
            collisionBox: ['C', 1],
            moveType: ['D', false],
            existData: [
                { t: ['Time', time] },
            ],
            moveF: [
                [37, 30, QJ.MPMZ.tl.ex_senpoTachiEffects, [{clickDetection:true}]],
            ],
        });
    }

};

//闪步太刀演出矫正
QJ.MPMZ.tl.ex_senpoTachiFix = function () {

    let newAnchorX = this.anchorX;
    let newAnchorY = this.anchorY;
    if (this.data.extra && this.data.extra < 2) {

        if (this.anchorY < 1.0) {
            newAnchorX = this.anchorX - 0.03;
            newAnchorY = this.anchorY + 0.022;
        }
        if (this.rotationImg > 270 || this.rotationImg <= 40) {
            if ($gameParty.leader().hasSkill(55)) {
                this.changeAttribute("z", "MF_BR");
            } else {
                this.changeAttribute("z", "E");
            }
        } else {
            if ($gameParty.leader().hasSkill(55)) {
                this.changeAttribute("z", "MF_UR");
            } else {
                this.changeAttribute("z", "W");
            }
        }

        if (this.rotationImg > 390) {
            this.changeAttribute("imgRotation", ['S', 40]);
        }

    } else { //分歧


        if (this.anchorY < 1.1) {
            newAnchorX = this.anchorX - 0.03;
            newAnchorY = this.anchorY + 0.022;
        }
        if (this.rotationImg > 90) {
            if ($gameParty.leader().hasSkill(55)) {
                this.changeAttribute("z", "MF_UR");
            } else {
                this.changeAttribute("z", "W");
            }
        } else {
            if ($gameParty.leader().hasSkill(55)) {
                this.changeAttribute("z", "MF_BR");
            } else {
                this.changeAttribute("z", "E");
            }
        }

        if (this.rotationImg < -30) {
            this.changeAttribute("imgRotation", ['S', -40]);
        }

    }
    this.changeAttribute("anchor", [newAnchorX, newAnchorY]);

    this.y = $gamePlayer.centerRealY() * 48;
    if (this.data.extra && this.data.extra < 2) {
        this.x = $gamePlayer.centerRealX() * 48 - 10;
    } else {
        this.x = $gamePlayer.centerRealX() * 48;
    }


    if (this.time > 14) {
        $gameParty.leader().removeState(80);
        //$gameSystem._drill_PAlM_enabled = false;
    }
};


//旋风斩演出
QJ.MPMZ.tl.ex_senpuuGiri = function (GamepadsAttack, Tsubame = false) {

    let weapon = $gameParty.leader().equips()[0];

    if (!weapon) return;
    if (!Tsubame) {
        if ($gameMap.getGroupBulletListQJ('playerSkill').length > 0) return;
        $gameSwitches.setValue(14, true);
        $gameSwitches.setValue(181, true);
        $gameParty.leader().addState(62);
        $dataMap.disableDashing = true;

        if ($gamePlayer._drill_EASe_controller !== undefined) {
            var curSpeed = 1 + $gameParty.leader().cnt;
            $gamePlayer.drill_EASe_setStateNode("旋风斩");
            $gamePlayer._drill_EASe_controller._drill_curSpeed = Math.round(curSpeed);
        }
    } else {
        var curSpeed = 1 + $gameParty.leader().cnt;
    }
    var wid = weapon.baseItemId;
    var weaponImage = "weapon/weapon" + wid;
    var weaponScale = $gameParty.leader().pdr;

    var Phase1 = Math.round(64 / curSpeed);
    var Phase2 = Math.round(120 / curSpeed);
    var Phase3 = Math.round(168 / curSpeed);
    var Phase4 = Math.round(200 / curSpeed);
    var Phase5 = Math.round(224 / curSpeed);
    var PhaseMax = Phase5 - Phase4;

    var rotationTrajectory = `${Phase1}|${5.625 * curSpeed}~${Phase2 - Phase1}|${6.428 * curSpeed}~${Phase3 - Phase2}|${7.5 * curSpeed}~${Phase4 - Phase3}|${9 * curSpeed}~${Phase5 - Phase4}|${11.25 * curSpeed}~99999|${15 * curSpeed}`;

    var hueValue, Opacity, SubBullet, zz;
    if (Tsubame) {
        hueValue = 180;
        Opacity = 0.25 * ($gamePlayer._opacity / 255);
        zz = "MF_BG";
        SubBullet: true;
    } else {
        hueValue = 0;
        Opacity = $gamePlayer._opacity / 255;
        zz = "E";
        SubBullet: false;
    }

    var senpuuGiri = QJ.MPMZ.Shoot({
        groupName: ['playerSkill', 'senpuuGiri'],
        img: weaponImage,
        position: [['P'], ['P']],
        initialRotation: ['S', -225],
        scale: [-weaponScale, weaponScale], // 动态缩放
        moveType: ['D', false],
        imgRotation: ['R', rotationTrajectory, true],
        anchor: [1.05, 1.05],
        opacity: Opacity,
        hue: hueValue,
        subBullet: SubBullet,
        existData: [
            { t: ['S', 'Fuku_Plugins.EventTremble.getRemainingCycles(-1) > 0 || $gamePlayer._moveSpeed <= 0', true] },
            { t: ['S', '!$gameParty.leader().equips()[0] || $gameParty.leader().equips()[0].baseItemId == 4', true] },
            { t: ['S', '$gameMap.regionId(Math.floor($gamePlayer.centerRealX()), Math.floor($gamePlayer.centerRealY())) === 8', true], a: ['S', '$gamePlayer.drill_EASA_setEnabled( true )'] },
            { t: ['B', 'throwImmediately'], a: ['F', QJ.MPMZ.tl.ex_senpuuGiriThrow, [GamepadsAttack, Tsubame, { throwImmediately: true }]] }
        ],
        z: zz,
        collisionBox: ['C', 1],
        moveF: [
            [2, 2, QJ.MPMZ.tl.ex_checkSenpuuGiriAlignment, [GamepadsAttack, Tsubame]],
            [Phase1, 99999, QJ.MPMZ.tl.ex_senpuuGiriAccelerationEffect, [1, Tsubame]],
            [Phase2, 99999, QJ.MPMZ.tl.ex_senpuuGiriAccelerationEffect, [2, Tsubame]],
            [Phase3, 99999, QJ.MPMZ.tl.ex_senpuuGiriAccelerationEffect, [3, Tsubame]],
            [Phase4, 99999, QJ.MPMZ.tl.ex_senpuuGiriAccelerationEffect, [4, Tsubame]],
            [Phase5, PhaseMax, QJ.MPMZ.tl.ex_senpuuGiriAccelerationEffect, [5, Tsubame]]
        ],
        deadF: [
            [QJ.MPMZ.tl.ex_senpuuGiriFinishAction, [GamepadsAttack, Tsubame]]
        ]
    });

    // 火属性
    if ([17, 19].includes(weapon.baseItemId)) {
        senpuuGiri.data.groupName.push("fire");
        $gameMap.addMapBulletsNameQJ(senpuuGiri.index, senpuuGiri.data.groupName);
    }

    // 读取操作模式
    if (GamepadsAttack && GamepadsAttack === 'Gamepad') {
        var AnyPadReleased =
            "Input.drill_isPadPressed('右摇杆上') || " +
            "Input.drill_isPadPressed('右摇杆下') || " +
            "Input.drill_isPadPressed('右摇杆左') || " +
            "Input.drill_isPadPressed('右摇杆右')";
        senpuuGiri.addExistData({
            t: ['S', AnyPadReleased, false],
            a: ['F', QJ.MPMZ.tl.ex_senpuuGiriThrow, [GamepadsAttack, Tsubame]]
        });
    } else {
        if (!Utils.isMobileDevice()) {
            senpuuGiri.addExistData({
                t: ['S', '!TouchInput.drill_isRightPressed()', true],
                a: ['F', QJ.MPMZ.tl.ex_senpuuGiriThrow, [false, Tsubame]]
            });
        } else {
            senpuuGiri.addExistData({
                t: ['S', '!TouchInput.drill_isLeftPressed()', true],
                a: ['F', QJ.MPMZ.tl.ex_senpuuGiriThrow, [GamepadsAttack, Tsubame]]
            });
        }
    }

    // 接住回旋镖的场合，立即投掷
    if ($gameParty.leader().hasSkill(70)) {
        if ($gameMap.getGroupBulletListQJ('throwImmediately').length > 0) {
            senpuuGiri._throwImmediately = true;
            senpuuGiri.addExistData({
                t: ['Time', 1],
                a: ['F', QJ.MPMZ.tl.ex_senpuuGiriThrow, [GamepadsAttack, Tsubame, { throwImmediately: true }]]
            });
        }
    }

    // 柳叶剑特效
    if (weapon.baseItemId === 80) {
        senpuuGiri.addMoveData("F", [10, 10, QJ.MPMZ.tl.ex_willowLeafEffects, ["senpuuGiri", Tsubame]]);
    }
    // 香蕉大剑特效
    if (!Tsubame && weapon.baseItemId === 60) {
        senpuuGiri.addMoveData("F", [Phase4, 60, QJ.MPMZ.tl.ex_activateBananaGrenade, ["senpuuGiri"]]);
    }
    // 多次攻击次数 - 燕返斩
    if (!Tsubame && $gameParty.leader().hasSkill(99)) {
        var tsubameGaeshi = $gameParty.leader().skillMasteryLevel(99);
        var tsubameGaeshiTime = 2;
        for (var i = 1; i <= tsubameGaeshi; i++) {
            tsubameGaeshiTime += 4;
            senpuuGiri.addMoveData("F", [tsubameGaeshiTime, 99999, QJ.MPMZ.tl.ex_senpuuGiri, [GamepadsAttack, true]]);
        }
    }

    // hitbox生成
    weaponImage = "weapon/weaponTrail" + wid;
    var weaponDamage = chahuiUtil.getVarianceDamage(1);
    var Talpha, TrailEffect;

    if ($gameParty.leader().hasSkill(55)) {
        Talpha = 0.1;
    } else {
        Talpha = 0.75;
    }

    if (!Tsubame && !Utils.isMobileDevice()) {
        TrailEffect = [{
            img: ['L', 0.5, 1, 0, 0.999999999, 0.2, 0, 0, 0],
            existTime: 0,
            blendMode: 1,
            alpha: Talpha,
            disappearTime: 10,
            imgStretchMode: 0,
            ifProjctileWait: true,
            hOrV: true
        }];
    } else {
        TrailEffect = [];
    }

    // 安卓版刀光会报错
    if (Utils.isMobileDevice()) {
        TrailEffect = [];
    }

    //武器伤害判定宽度
    let hitBoxWidth = 8;
    if (wid === 42) hitBoxWidth = 30;

    QJ.MPMZ.Shoot({
        groupName: ['playerSkill', 'senpuuGiriTrail'],
        img: weaponImage,
        position: [['P'], ['P']],
        initialRotation: ['S', -180],
        scale: weaponScale,//动态缩放
        moveType: ['D', false],
        opacity: 0,
        imgRotation: ['R', rotationTrajectory, true],//剑的旋转，速度是动态的
        anchor: [0.5, 1],
        existData: [
            { t: ['G', ['"enemy"', '"object"']], a: ['F', QJ.MPMZ.tl.ex_toEnemyAttack, [weaponDamage, { weaponAttack: true }]], p: [-1, false, true] },
            { t: ['BE', senpuuGiri.index] },
            { t: ['B', 'enemyBullet'], p: [-1, false, true, QJ.MPMZ.tl.ex_weaponParry] }
        ],
        z: "E",
        collisionBox: ['R', hitBoxWidth, 64],
        judgeAccuracyRotation: 10,
        trailEffect: TrailEffect,
    });
};

QJ.MPMZ.tl.playerAttackInterruptedCheck = function () {

    let actor = $gameParty.leader();

    let check1 = Fuku_Plugins.EventTremble.getRemainingCycles(-1) > 0 || $gamePlayer._moveSpeed <= 0;
    let check2 = !actor.equips()[0] || actor.equips()[0].baseItemId == 4;
    let check3 = $gameMap.regionId(Math.floor($gamePlayer.centerRealX()), Math.floor($gamePlayer.centerRealY())) === 8;

    return check1 || check2 || check3 || check4;
};

//旋风斩加速过程效果
QJ.MPMZ.tl.ex_senpuuGiriAccelerationEffect = function (Phase, Tsubame) {

    let actor = $gameParty.leader();

    if (!Tsubame) {
        if (!actor.equips()[0]) return;
        var wid = actor.equips()[0].baseItemId;
        var weapon = $dataWeapons[wid];

        var seNames = '剣の素振り（大剣を振る）'
        var randomPitch = Math.randomInt(40) + 110;
        AudioManager.playSe({ name: seNames, volume: 60, pitch: randomPitch, pan: 0 });

        var speed = 1;
        if (Phase) {
            speed += 0.15 * Phase;
            // 怪鸟的羽毛
            if (weapon?.note?.includes("<旋风斩加速>")) {
                speed += 0.35 * Phase;
                if (Phase === 3) {
                    this.data.groupName.push("playerInAir");
                    $gameMap.addMapBulletsNameQJ(this.index, this.data.groupName);
                    $gamePlayer.drill_ECE_playSustainingFloating(518400000, 30, 12, 120, 2);
                }
            }
        }
        // 额外受到旋风斩攻速影响
        if ($gamePlayer._drill_EASe_controller !== undefined) {
            speed *= 1 + actor.cnt;
        }

        speed = Math.round(speed * 35) / 100;
        $dataStates[62].rateXParams[1] = speed;
        $gameParty.refreshMembers();
    }
    // 斩裂剑 - 斩剑波
    if (actor.hasSkill(44)) {
        QJ.MPMZ.tl.ex_swordEnergyAttack.call(this, undefined, 1);
    }

    //日轮-陨石术
    if (actor.hasSkill(57)) {
        let baseValue = 450;
        let luk = actor.luk;
        luk = Math.max(0, Math.min(600, luk));
        let adjustedValue = baseValue + (luk / 550) * 550;
        if (Math.randomInt(1001) < adjustedValue) {
            actor.equips()[0].durability -= 40;
            QJ.MPMZ.tl.ex_meteorStrike.call(this);
        }
    }
};

//旋风斩结束动作
QJ.MPMZ.tl.ex_senpuuGiriFinishAction = function (GamepadsAttack, Tsubame) {

    if (Tsubame) return;

    if ($gamePlayer._drill_EASe_controller !== undefined) {
        $gamePlayer._drill_EASe_controller._drill_curSpeed = 1;
    }
    // 停止漂浮效果
    $gamePlayer.drill_ECE_endSustainingFloating();
    $gameSystem.addGameTimeEvent({ key: 'state11', delayMinutes: 10 });
    $gameParty.leader().addState(11);
    $gameParty.leader().removeState(62);
    $dataMap.disableDashing = false;
    let rotationSpeed = this.data.imgRotation[1].get();

    if (this._throwImmediately) {
        rotationSpeed = Math.max(rotationSpeed, 9);
    }

    $gameMap.steupCEQJ(163, 1, { rotation: rotationSpeed });

};

//旋风斩Z轴适配
QJ.MPMZ.tl.ex_checkSenpuuGiriAlignment = function (GamepadsAttack, Tsubame) {

    if (Tsubame) return;

    var fullPower = 240;
    fullPower = Math.round(fullPower / (1 + $gameParty.leader().cnt));

    if (this.time > fullPower && !this._fullPower) {
        this._fullPower = true;
        $gamePlayer.drill_EASe_setSimpleStateNode(["旋转中(全速)"]);
    }

    var adjustedRotation = (this.rotationImg + 405) % 360;
    if (adjustedRotation <= 90 || adjustedRotation >= 270) {
        if ($gameParty.leader().hasSkill(55)) {
            this.changeAttribute("z", "MF_BR");
        } else {
            this.changeAttribute("z", "E");
        }
    } else {
        if ($gameParty.leader().hasSkill(55)) {
            this.changeAttribute("z", "MF_UR");
        } else {
            this.changeAttribute("z", "W");
        }
    }

    var opacity = $gamePlayer._opacity / 255;
    this.changeAttribute("opacity", opacity);
};

//投掷出去的旋风斩
QJ.MPMZ.tl.ex_senpuuGiriThrow = function (GamepadsAttack, Tsubame, extraData = {}) {

    if (Tsubame) return;
    let weapon = $gameParty.leader().equips()[0];
    if (!weapon) return;
    let rotationSpeed = this.data.imgRotation[1].get();

    if (extraData.throwImmediately) {
        rotationSpeed = 12;
    }
    if (rotationSpeed < 9) return;
    var BulletImage = "weapon/weapon" + weapon.baseItemId;
    if (this.data.img != BulletImage) return;

    let posX = this.inheritX();
    let posY = this.inheritY();
    rotationSpeed = Math.max(30, rotationSpeed * 3);
    let throwSpeed = 4 + (rotationSpeed / 8);
    let zz, Talpha;

    $gameSystem.setBgsLine(9);
    var weaponImage = "weapon/weaponTrail" + weapon.baseItemId;
    var weaponScale = this.scaleX;
    var weaponDamage = Math.floor(0.75 * chahuiUtil.getVarianceDamage(1));
    let imgRotation = ['R', rotationSpeed, true];
    let particles = [
        {
            img: weaponImage,
            scaleXMin: 1, scaleXMax: 1,
            intervalTime: -4,
            synScale: true,
            existTime: 0,
            offsetMin: [0, 0, 0],
            offsetMax: [0, 0, 0],
            offset: [0, 0, 0],
            disappearScale: 1, disappearTime: 30,
            opacityMax: 0.4,
            opacityMin: 0.4,
            moveType: ['0', '0']
        }
    ];
    // 旋风斩突刺形态
    if ($gameParty.leader().hasSkill(76)) {
        AudioManager.playSe({ name: "Sword4", volume: 90, pitch: 150, pan: 0 });
        particles = null;
        imgRotation = ['F', 180];
        weaponDamage *= 2;
    } else {
        AudioManager.playBgs({ name: "繰り返し風を切るほどの回転音", volume: 60, pitch: 100, pan: 0 });
    }
    // 兽人斧
    if ($gameParty.leader().hasSkill(38)) {
        weaponDamage = Math.floor(1.5 * weaponDamage);
    }
    // 克里乌之光
    if ($gameParty.leader().hasSkill(55)) {
        zz = "MF_BR";
        Talpha = 0.1;
    } else {
        zz = "E";
        Talpha = 0.75;
    }

    var iniRotation = ['M'];

    if (GamepadsAttack) {
        if (GamepadsAttack === 'Gamepad') {
            iniRotation = ['S', 'QJ.MPMZ.tl.ex_gamepadsCheckDirection(true)'];
        } else {
            iniRotation = ['S', "Input._pressAngle['ok']?Input._pressAngle['ok']:0"];
        }
    }

    let time = 60 + this.time;
    time = Math.min(time, 180);


    // 安卓版刀光会报错
    let TrailEffect = [];
    if (!Utils.isMobileDevice()) {
        TrailEffect = [{
            img: ['L', 0.5, 1, 0, 0.999999999, 0.4, 0, 0, 0],
            existTime: 0,
            blendMode: 1,
            alpha: Talpha,
            disappearTime: 10,
            imgStretchMode: 0,
            hOrV: true
        }];
    }

    var senpuuGiriThrow = QJ.MPMZ.Shoot({
        groupName: ['playerBullet', 'SenpuuGiri', 'weaponMarker'],
        img: weaponImage,
        position: [['S', posX], ['S', posY]],
        initialRotation: iniRotation,
        scale: weaponScale,
        imgRotation: imgRotation,
        anchor: [0.5, 0.5],
        existData: [
            { t: ['S', "!$gameParty.leader().equips()[0] || $gameParty.leader().equips()[0].baseItemId == 4", true] },
            { t: ['Time', time], a: ['S', 'AudioManager.fadeOutBgsByLine(1,9);$gameSwitches.setValue(182, false)'] },
            { t: ['G', ['"enemy"', '"object"']], a: [], p: [-1, true, true], c: ['T', 0, 60, true] },
        ],
        moveType: ['S', throwSpeed],
        moveF: [
        ],
        z: zz,
        collisionBox: ['R', 8, 64],
        judgeAccuracyRotation: 0,//判定精度，防止挥剑速度太快导致无法攻击到敌人
        judgeAccuracyMove: 8,
        particles: particles,
        trailEffect: TrailEffect,
        deadJS: [
            "if (this._destroyed) {AudioManager.stopBgsByLine(9)}"
        ]
    });

    // 火属性
    if ([17, 19].includes(weapon.baseItemId)) {
        senpuuGiriThrow.data.groupName.push("fire");
        $gameMap.addMapBulletsNameQJ(senpuuGiriThrow.index, senpuuGiriThrow.data.groupName);
    }

    // 旋风斩突刺形态
    if ($gameParty.leader().hasSkill(76)) {
        // senpuuGiriThrow.addExistData({t:['G',['"enemy"','"object"']],a:['F',QJ.MPMZ.tl.ex_toEnemyAttack,[weaponDamage,{weaponAttack:true}]],p:[-1,true,true]});	
        senpuuGiriThrow.addExistData({ t: ['NP'], a: ['F', QJ.MPMZ.tl.ex_senpuuGiriWallPinned, [this.time]], c: ['S', 'this.time>10'], cb: ['C', 4] });
        senpuuGiriThrow.addExistData({ t: ['G', ['"enemy"', '"object"']], a: ['F', QJ.MPMZ.tl.ex_spiralThrust, [weaponDamage, "knockback"]], p: [-1, true, true], c: ['T', 0, 0, true] });
    } else {
        senpuuGiriThrow.addExistData({ t: ['G', ['"enemy"', '"object"']], a: ['F', QJ.MPMZ.tl.ex_senpuuGiriHold, [this.time]] });
        senpuuGiriThrow.addExistData({ t: ['R', [255]], a: ['F', QJ.MPMZ.tl.ex_senpuuGiriHold, [this.time]], c: ['S', 'this.time>10'] });
    }

    //柳叶剑特效
    if (weapon.baseItemId === 80) {
        senpuuGiriThrow.addMoveData("F", [5, 5, QJ.MPMZ.tl.ex_willowLeafEffects, ["senpuuGiriThrow", false]]);
    }

    //追踪效果
    if ($gameParty.leader().hasSkill(41)) {
        senpuuGiriThrow.addMoveData("F", [10, 10, QJ.MPMZ.tl.ex_projectileTrackingEffect]);
    }

    //斩裂剑-斩剑波
    if ($gameParty.leader().hasSkill(44)) {
        senpuuGiriThrow.addMoveData("JS", [10, 10, 'QJ.MPMZ.tl.ex_swordEnergyAttack.call(this, undefined, 2)']);
    }

};

//旋风斩三段效果
QJ.MPMZ.tl.ex_senpuuGiriHold = function (chargeTime, args) {

    if (!$gameParty.leader().equips()[0]) {
        AudioManager.fadeOutBgsByLine(1, 9);
        $gameSwitches.setValue(182, false);
        return;
    }

    // 回旋镖
    if ($gameParty.leader().hasSkill(70)) {
        QJ.MPMZ.tl.ex_senpuuGiriReturnToPlayer.call(this, args);
        return;
    }
    // 巨大蟹钳	
    if ($gameParty.leader().equips()[0].baseItemId === 14) {
        AudioManager.fadeOutBgsByLine(1, 9);
        $gameSwitches.setValue(182, false);
        QJ.MPMZ.tl.ex_giantCrabClawGrabsEnemy.call(this, args);
        return;
    }

    let posX = this.inheritX();
    let posY = this.inheritY();
    let angle = this.inheritRotation();
    let zz, Talpha;
    let weaponImage = "weapon/weaponTrail" + $gameParty.leader().equips()[0].baseItemId;
    let weaponScale = this.scaleX;
    let weaponDamage = Math.round(0.5 * chahuiUtil.getVarianceDamage(1));
    if ($gameParty.leader().hasSkill(38)) {
        weaponDamage = Math.floor(1.5 * weaponDamage);
    }
    let time = 30;
    if (chargeTime && chargeTime > 30) {
        time += Math.min(Math.round(chargeTime / 6), 150);
    }
    if ($gameParty.leader().hasSkill(41)) {
        time += 120;
    }
    $gameSwitches.setValue(182, true);

    if ($gameParty.leader().hasSkill(55)) {
        zz = "MF_BR";
        Talpha = 0.1;
    } else {
        zz = "E";
        Talpha = 0.75;
    }

    // 安卓版刀光会报错
    let TrailEffect = [];
    if (!Utils.isMobileDevice()) {
        TrailEffect = [{
            img: ['L', 0.5, 1, 0, 0.999999999, 0.4, 0, 0, 0],
            existTime: 0,
            blendMode: 1,
            alpha: Talpha,
            disappearTime: 10,
            imgStretchMode: 0,
            hOrV: true
        }];
    }

    var senpuuGiriHold = QJ.MPMZ.Shoot({
        groupName: this.data.groupName,
        img: weaponImage,
        position: [['S', posX], ['S', posY]],
        initialRotation: ['M'],
        imgRotation: ['S', angle],
        scale: weaponScale,
        imgRotation: ['R', 36, true],
        anchor: [0.5, 0.5],
        existData: [
            { t: ['Time', time] },
            { t: ['S', "!$gameParty.leader().equips()[0] || $gameParty.leader().equips()[0].baseItemId == 4", true] },
            //{t:['G',['"enemy"','"object"']],a:['C',155,[weaponDamage,0,0,0]],p:[-1,true,true]},
            { t: ['G', ['"enemy"', '"object"']], a: ['F', QJ.MPMZ.tl.ex_toEnemyAttack, [weaponDamage, { weaponAttack: true }]], p: [-1, false, true], c: ['T', 0, 6, true] },
        ],
        moveType: ['S', 0],
        z: zz,
        collisionBox: ['C', 32],
        moveF: [
        ],
        trailEffect: TrailEffect,
        deadJS: ["AudioManager.fadeOutBgsByLine(1,9);$gameSwitches.setValue(182, false);"]
    });

    //柳叶剑特效
    if ($gameParty.leader().equips()[0].baseItemId === 80) {
        senpuuGiriHold.addMoveData("F", [5, 5, QJ.MPMZ.tl.ex_willowLeafEffects, ["senpuuGiriHold"]]);
    }

    //追踪效果
    if ($gameParty.leader().hasSkill(41)) {
        senpuuGiriHold.addMoveData("F", [10, 10, QJ.MPMZ.tl.ex_projectileTrackingEffect]);
    }

};

//旋风斩结束效果
QJ.MPMZ.tl.ex_senpuuGiriFinishEffect = function () {
    AudioManager.fadeOutBgsByLine(1, 9);
    $gameSwitches.setValue(182, false);
};

//=============================================================================
//玩家异常状态
//=============================================================================


//玩家中毒
QJ.MPMZ.tl.ex_playerPoison = function (damage, time) {
    if (!damage) var damage = 1;
    if (!time) var time = 4;

    if ($gameSystem.hasGameTimeEvent("state5")) {
        $gameParty.leader().addState(5);
        time = Math.floor(time / 2);
        $gameSystem.adjustGameTimeEventDelay('state5', time, true);
    } else {
        $gameParty.leader().addState(5);
        $gameSystem.addGameTimeEvent({
            key: 'state5',
            command: 'remove',
            delayMinutes: time,
            target: 5,
            condition: 'true'
        });
    }

    if ($gameMap.getGroupBulletListQJ('playerPoison').length > 0) {
        let BID = $gameMap.getGroupBulletListQJ('playerPoison')[0];
        let bullet = $gameMap._mapBulletsQJ[BID];
        if (!bullet) return;
        bullet._extraDamage = bullet._extraDamage || 0;
        bullet._extraDamage += damage;
    } else {
        var Poison = QJ.MPMZ.Shoot({
            groupName: ['playerPoison', 'poison', 'Status'],
            img: "poison[6,10,1]",
            position: [['P'], ['P']],
            initialRotation: ['S', 0],
            imgRotation: ['F'],
            blendMode: 1,
            scale: [0.4, 0.4],
            moveType: ['B', -1],
            collisionBox: ['C', 1],
            existData: [
                { t: ['S', '!$gameParty.leader().isStateAffected(5)', true], d: [0, 30], c: ['S', 'this.time>30'] },
            ],
            moveF: [
                [60, 60, QJ.MPMZ.tl.ex_playerPoisonEffect, [damage]]
            ],
        });

        //中毒时的全屏幕演出
        if (!Utils.isMobileDevice()) {
            let index = Poison.index;
            QJ.MPMZ.Shoot({
                groupName: ['playerPoisonEffect',],
                img: "pipofm-fullscreeneffect_020[5,4,5]",
                position: [['S', 0], ['S', 0]],
                initialRotation: ['S', 0],
                imgRotation: ['F'],
                blendMode: 3,
                immuneTimeStop: true,
                opacity: 1,
                scale: 0.75,
                onScreen: true,
                anchor: [0, 0],
                moveType: ['S', 0],
                collisionBox: ['C', 1],
                existData: [{ t: ['BE', index] }]
            });
        }

    }
    //获取异常状态的演出
    QJ.MPMZ.tl.ex_effectFonts("zhongdu", -1);
};

//玩家中毒效果
QJ.MPMZ.tl.ex_playerPoisonEffect = function (damage) {

    if ($gameMessage.isBusy() || $gameMap.isEventRunning() || $gameSystem._ZzyTWFTheWorlding) return;

    let randomPitch = Math.randomInt(30) + 91;
    AudioManager.playSe({ name: "Poison", volume: 40, pitch: randomPitch, pan: 0 });
    if (!Utils.isMobileDevice()) $gamePlayer.requestAnimation(187);
    let finalDamage = damage;
    if (this._extraDamage) {
        finalDamage += this._extraDamage;
    }
    finalDamage *= 1 + (this.time / 600);
    finalDamage = Math.max(1, Math.floor(finalDamage));
    SimpleMapDamageQJ.put(3, -1, finalDamage, 0, -72);
    $gameParty.leader().gainHp(-finalDamage);
    //重伤判定
    if ($gameParty.leader().hpRate() <= 0.2) {
        $gameScreen.startShake(1, 8, 30);
        QJ.MPMZ.tl.ex_playerDamageFlash();
    }
};

//打雷
QJ.MPMZ.tl.ex_playerElectrified = function (time = 1) {

    $gameSwitches.setValue(14, true);
    if (typeof time !== 'number' || !Number.isFinite(time)) {
        time = 1;
    }
    if ($gameSystem.hasGameTimeEvent("state7")) {
        // $gameParty.leader().addState(7);
        // $gameSystem.adjustGameTimeEventDelay('state7', time, true);
    } else {
        $gameParty.leader().addState(7);
        $gameSystem.addGameTimeEvent({
            key: 'state7',
            command: 'remove',
            delayMinutes: time,
            target: 7,
            condition: 'true'
        });
    }

    if ($gameMap.getGroupBulletListQJ('playerElectrified').length === 0) {

        // 电流音效
        var se = { name: "バチバチ（感電したような音）", volume: 70, pitch: 100, pan: 0 };
        AudioManager.playSe(se);

        $gamePlayer.drill_EASe_stopAct();
        if (!$gameParty.leader().isStateAffected(9) && !$gameParty.leader().isStateAffected(67)) {
            $gamePlayer.drill_EASe_setSimpleStateNode(["被雷劈"]);
        }
        Fuku_Plugins.EventTremble.start(-1, 1, 8);

        var Electrified = QJ.MPMZ.Shoot({
            groupName: ['playerElectrified', 'electrified'],
            img: "paralysis[6,10,1]",
            position: [['P'], ['P']],
            initialRotation: ['S', 0],
            imgRotation: ['F'],
            blendMode: 1,
            scale: 0.5,
            anchor: [0.5, 0.5],
            moveType: ['D', true],
            collisionBox: ['C', 48],
            existData: [
                { t: ['S', '!$gameParty.leader().isStateAffected(7)', true], a: [], c: ['S', 'this.time > 30'] },
                //{ t: ['B', ['enemyBullet']], a: ['F', QJ.MPMZ.tl.ex_FreezeBreak, [damage]], c: ['S', 'this.time > 30 && Math.random() > 0.8'] },
                //{t:['S','$gameParty.leader().isStateAffected(67)',true],a:[],p: [-1, false, true],c:['T',15,15,true]},	
            ],
            moveF: [
                [20, 20, QJ.MPMZ.tl.ex_playerElectrifiedEffect]
            ],
            deadJS: ["$gamePlayer.drill_EASA_setEnabled(true);$gameSwitches.setValue(14, false);Fuku_Plugins.EventTremble.stop(-1)"]
        });
        //打雷时的全屏幕演出
        if (!Utils.isMobileDevice()) {
            let index = Electrified.index;
            QJ.MPMZ.Shoot({
                groupName: ['playerElectrifiedEffect',],
                img: "pipofm-fullscreeneffect_019[5,4,5]",
                position: [['S', 0], ['S', 0]],
                initialRotation: ['S', 0],
                imgRotation: ['F'],
                blendMode: 3,
                opacity: 1,
                scale: 0.75,
                onScreen: true,
                anchor: [0, 0],
                moveType: ['S', 0],
                collisionBox: ['C', 1],
                existData: [{ t: ['BE', index] }]
            });
        }
    }

};

//打雷中效果判定
QJ.MPMZ.tl.ex_playerElectrifiedEffect = function () {
    this._count = this._count || 0;
    this._count += 1;
    if (this._count >= 5) {
        // 电流音效
        var se = { name: "バチバチ（感電したような音）", volume: 70, pitch: 100, pan: 0 };
        AudioManager.playSe(se);
        this._count = 0;
    }

    if ($gameParty.leader().isStateAffected(9) || $gameParty.leader().isStateAffected(67)) {
        QJ.MPMZ.tl.ex_conductiveEffectOnWater.call(this);
    }
};

//冰结
QJ.MPMZ.tl.ex_playerFreeze = function (time) {
    $gameSwitches.setValue(14, true);
    if (!time) var time = 5;

    if ($gameSystem.hasGameTimeEvent("state9")) {
        $gameParty.leader().addState(9);
        time = Math.floor(time / 2);
        $gameSystem.adjustGameTimeEventDelay('state9', time, true);
    } else {
        $gameParty.leader().addState(9);
        $gameSystem.addGameTimeEvent({
            key: 'state9',
            command: 'remove',
            delayMinutes: time,
            target: 9,
            condition: 'true'
        });
    }

    // 冻结音效
    var se = { name: "凍りつく時の効果音「キーーーン」", volume: 60, pitch: 100, pan: 0 };
    AudioManager.playSe(se);

    $gamePlayer.drill_EASe_stopAct();
    if (!$gameParty.leader().isStateAffected(67) && $gameParty.leader()._characterName !== "$player_swim") {
        $gamePlayer.drill_EASe_setSimpleStateNode(["被冻结"]);
    }

    if ($gameMap.getGroupBulletListQJ('playerFreeze').length > 0) {
        let index = $gameMap.getGroupBulletListQJ('playerFreeze')[0];
        QJ.MPMZ.Shoot({
            groupName: ['playerFreezeExa', 'freeze'],
            img: "Ice[8,6]",
            position: [['P'], ['P']],
            initialRotation: ['S', 0],
            imgRotation: ['F'],
            blendMode: 3,
            opacity: 0.4,
            scale: 0.5,
            anchor: [0.45, 0.55],
            moveType: ['D', true],
            collisionBox: ['C', 1],
            existData: [{ t: ['BE', index] }]
        });
    } else {
        let damage = Math.floor($gameParty.leader().mhp * 0.15);

        var Frozen = QJ.MPMZ.Shoot({
            groupName: ['playerFreeze', 'freeze'],
            img: "Ice[8,6]",
            position: [['P'], ['P']],
            initialRotation: ['S', 0],
            imgRotation: ['F'],
            blendMode: 1,
            scale: [0.5, 0.5],
            anchor: [0.45, 0.55],
            moveType: ['B', -1],
            collisionBox: ['C', 48],
            existData: [
                { t: ['S', '!$gameParty.leader().isStateAffected(9)', true], a: ['F', QJ.MPMZ.tl.ex_playFreezeBreak, [0]], c: ['S', 'this.time > 30'] },
                { t: ['B', ['enemyBullet']], a: ['F', QJ.MPMZ.tl.ex_playFreezeBreak, [damage]], c: ['S', 'this.time > 30 && Math.random() > 0.8'] }
            ],
            moveF: [
                [30, 3, QJ.MPMZ.tl.ex_playerFrozenStruggle]
            ]
        });
        //冻结时的全屏幕演出
        if (!Utils.isMobileDevice()) {
            let index = Frozen.index;
            QJ.MPMZ.Shoot({
                groupName: ['playerFreezeEffect',],
                img: "pipofm-fullscreeneffect_017[5,6,5]",
                position: [['S', 0], ['S', 0]],
                initialRotation: ['S', 0],
                imgRotation: ['F'],
                blendMode: 3,
                opacity: 1,
                scale: 0.75,
                onScreen: true,
                anchor: [0, 0],
                moveType: ['S', 0],
                collisionBox: ['C', 1],
                existData: [{ t: ['BE', index] }]
            });
        }

    }

    // 效果字演出
    QJ.MPMZ.tl.ex_effectFonts("bingjie", -1);
};

//被冻结时的挣扎行动
QJ.MPMZ.tl.ex_playerFrozenStruggle = function () {

    let triggered = Input.drill_isKeyTriggered('w') ||
        Input.drill_isKeyTriggered('s') ||
        Input.drill_isKeyTriggered('a') ||
        Input.drill_isKeyTriggered('d');

    if (triggered && Math.random() > 0.3) {
        if (Fuku_Plugins.EventTremble.getRemainingCycles(-1) === 0) {
            Fuku_Plugins.EventTremble.start(-1, 2, 1, 4);

            if ($gameSystem.hasGameTimeEvent("state9")) {
                $gameSystem.adjustGameTimeEventDelay('state9', -1, true);
            }
        }
    }
};

QJ.MPMZ.tl.ex_playFreezeBreak = function (damage, args) {
    var se = { name: "氷系魔法を発動した効果音", volume: 65, pitch: 100, pan: 0 };
    AudioManager.playSe(se);

    let posX = this.inheritX();
    let posY = this.inheritY();
    var magicScale = this.scaleX;

    QJ.MPMZ.Shoot({
        img: 'IceBreak[8,4]',
        position: [['S', posX], ['S', posY]],
        initialRotation: ['S', 0],
        scale: magicScale,
        moveType: ['S', 0],
        imgRotation: ['F'],
        anchor: [0.5, 0.5],
        opacity: 0.8,
        blendMode: 1,
        existData: [
            { t: ['Time', 31] },
        ],
        collisionBox: ['C', 1],
    });
    $gamePlayer.drill_EASA_setEnabled(true);
    if ($gameParty.leader()._characterName !== "$player_swim") {
        let character = $gamePlayer;
        character._drill_JSp['enabled'] = true;
        character._drill_JSp['height'] = 64;
        character._drill_JSp['time'] = 45;
        character._drill_JSp['speed'] = -1;
        $gamePlayer.jump(0, 0);
    }
    $gameSwitches.setValue(14, false);

    if (damage && typeof damage === 'number' && damage > 0) {
        QJ.MPMZ.tl.ex_playerDamageCheck(damage, 2);
    }

};

//玩家出血
QJ.MPMZ.tl.ex_playerBleeding = function (damage, time) {

    if (!damage) var damage = 1;
    if (!time) var time = 4;

    if ($gameSystem.hasGameTimeEvent("state6")) {
        $gameParty.leader().addState(6);
        time = Math.floor(time / 2);
        $gameSystem.adjustGameTimeEventDelay('state6', time, true);
    } else {
        $gameParty.leader().addState(6);
        $gameSystem.addGameTimeEvent({
            key: 'state6',
            command: 'remove',
            delayMinutes: time,
            target: 6,
            condition: 'true'
        });
    }



    if ($gameMap.getGroupBulletListQJ('playerBleeding').length > 0) {
        let BID = $gameMap.getGroupBulletListQJ('playerBleeding')[0];
        let bullet = $gameMap._mapBulletsQJ[BID];
        if (!bullet) return;
        bullet._extraDamage = bullet._extraDamage || 0;
        bullet._extraDamage += damage;
    } else {
        var Bleeding = QJ.MPMZ.Shoot({
            groupName: ['playerBleeding', 'bleeding', 'Status'],
            img: "Bleeding[6,10,1]",
            position: [['P'], ['P']],
            initialRotation: ['S', 0],
            imgRotation: ['F'],
            blendMode: 1,
            scale: [0.4, 0.4],
            moveType: ['B', -1],
            collisionBox: ['C', 1],
            existData: [
                { t: ['S', '!$gameParty.leader().isStateAffected(6)', true], d: [0, 30], c: ['S', 'this.time>30'] },
            ],
            moveF: [
                [60, 60, QJ.MPMZ.tl.ex_playerBleedingEffect, [damage]]
            ],
        });

        //出血时的全屏幕演出
        if (!Utils.isMobileDevice()) {
            let index = Bleeding.index;
            QJ.MPMZ.Shoot({
                groupName: ['playerBleedingEffect',],
                img: "pipofm-fullscreeneffect_024[5,6,5]",
                position: [['S', 0], ['S', 0]],
                initialRotation: ['S', 0],
                imgRotation: ['F'],
                blendMode: 0,
                opacity: 0.8,
                scale: 0.75,
                onScreen: true,
                anchor: [0, 0],
                moveType: ['S', 0],
                collisionBox: ['C', 1],
                existData: [{ t: ['BE', index] }]
            });
        }
    }
    //获取异常状态的演出
    QJ.MPMZ.tl.ex_effectFonts("xueyan", -1);
};

//玩家出血效果
QJ.MPMZ.tl.ex_playerBleedingEffect = function (damage) {

    if ($gameMessage.isBusy() || $gameMap.isEventRunning() || $gameSystem._ZzyTWFTheWorlding) return;
    if (!Utils.isMobileDevice()) $gamePlayer.requestAnimation(186);
    let randomPitch = Math.randomInt(30) + 91;
    AudioManager.playSe({ name: "血がたれる1", volume: 90, pitch: randomPitch, pan: 0 });

    let finalDamage = damage;
    if (this._extraDamage) {
        finalDamage += this._extraDamage;
    }
    finalDamage += 0.005 * $gameParty.leader().mhp;
    // 结算玩家的出血抵抗
    if ($gameParty.leader().hasSkill(53)) {
        finalDamage *= 0.7 ** $gameParty.leader().skillMasteryLevel(53);
    }

    finalDamage = Math.max(1, Math.floor(finalDamage));
    SimpleMapDamageQJ.put(2, -1, finalDamage, 0, -64);
    $gameParty.leader().gainHp(-finalDamage);
    //重伤判定
    if ($gameParty.leader().hpRate() <= 0.2) {
        $gameScreen.startShake(1, 8, 30);
        QJ.MPMZ.tl.ex_playerDamageFlash();
    }
};

//玩家炎上
QJ.MPMZ.tl.ex_playerBurning = function (damage, time) {

    if (!damage) var damage = 1;
    if (!time) var time = 4;

    if ($gameSystem.hasGameTimeEvent("state8")) {
        $gameParty.leader().addState(8);
        time = Math.floor(time / 2);
        $gameSystem.adjustGameTimeEventDelay('state8', time, true);
    } else {
        $gameParty.leader().addState(8);
        $gameSystem.addGameTimeEvent({
            key: 'state8',
            command: 'remove',
            delayMinutes: time,
            target: 8,
            condition: 'true'
        });
    }



    if ($gameMap.getGroupBulletListQJ('playerBurning').length > 0) {
        let BID = $gameMap.getGroupBulletListQJ('playerBurning')[0];
        let bullet = $gameMap._mapBulletsQJ[BID];
        if (!bullet) return;
        bullet._extraDamage = bullet._extraDamage || 0;
        bullet._extraDamage += damage;
    } else {
        var Burning = QJ.MPMZ.Shoot({
            groupName: ['playerBurning', 'burning', 'Status', 'fire'],
            img: "burn[6,10,1]",
            position: [['P'], ['P']],
            initialRotation: ['S', 0],
            imgRotation: ['F'],
            blendMode: 1,
            scale: [0.4, 0.4],
            moveType: ['D', true],
            collisionBox: ['C', 80],
            existData: [
                { t: ['S', '!$gameParty.leader().isStateAffected(8)', true], d: [0, 30], c: ['S', 'this.time>30'] },
                { t: ['G', ['"enemy"', '"object"']], a: ['F', QJ.MPMZ.tl.ex_burningEffect, [damage]], p: [-1, true, true], c: ['T', 15, 15, true] },
                { t: ['P'], a: ['F', QJ.MPMZ.tl.ex_burningEffect, [damage]], p: [-1, true, true], c: ['T', 15, 15, true] },
                { t: ['B', ['freeze']], a: ['S', "$gameSystem.triggerGameTimeEventNow('state8')"], d: [0, 30], an: 181, cb: ['C', 1] },
                { t: ['S', '$gameParty.leader().isStateAffected(67)', true], a: ['S', "$gameSystem.triggerGameTimeEventNow('state8')"], d: [0, 30], an: 181 },
            ],
            deadF: [[QJ.MPMZ.tl.ex_playerBurningEndEffect]]
        });

        //炎上时的全屏幕演出
        if (!Utils.isMobileDevice()) {
            let index = Burning.index;
            QJ.MPMZ.Shoot({
                groupName: ['playerBurningEffect',],
                img: "pipofm-fullscreeneffect_016[5,4,5]",
                position: [['S', 0], ['S', 0]],
                initialRotation: ['S', 0],
                imgRotation: ['F'],
                blendMode: 3,
                opacity: 1,
                scale: 0.75,
                onScreen: true,
                anchor: [0, 0],
                moveType: ['S', 0],
                collisionBox: ['C', 1],
                existData: [{ t: ['BE', index] }]
            });
        }
    }
    //获取异常状态的演出
    QJ.MPMZ.tl.ex_effectFonts("yanshang", -1);
};

//玩家炎上结束效果
QJ.MPMZ.tl.ex_playerBurningEndEffect = function () {
    if (!$gameParty.leader().isStateAffected(8)) {
        //$gamePlayer.drill_EASe_stopAct();
        //$gamePlayer.drill_EASe_setSimpleStateNode( ["被烧焦"] );
        var id = "Scorched";
        var filterTarget = 3999;
        $gameMap.createFilter(id, "adjustment", filterTarget);
        $gameMap.setFilter(id, [1, 1, 1, 0.8, 0.4, 0.4, 0.4, 1]);
        $gameMap.moveFilter(id, [1, 1, 1, 1, 1, 1, 1, 1], 120);
        $gameMap.eraseFilterAfterMove(id);
        $gameScreen._particle.particleSet(0, 'smoke_c-P', 'player', 'smoke_c');
        $gameScreen._particle.particleUpdate(['smoke_c-P', 'pos', 0, -20]);
        $gameScreen._particle.reservePluginCommand(120, {}, ['clear', 'smoke_c-P'], 0);
    }
};


//炎上效果
QJ.MPMZ.tl.ex_burningEffect = function (damage, args) {

    if (args.target && args.target instanceof Game_Player) {
        if (!Utils.isMobileDevice()) $gamePlayer.requestAnimation(188);
        let randomPitch = Math.randomInt(30) + 91;
        AudioManager.playSe({ name: "Fire2", volume: 30, pitch: randomPitch, pan: 0 });

        let finalDamage = damage;
        if (this._extraDamage) {
            finalDamage += this._extraDamage;
        }
        finalDamage = Math.max(1, Math.floor(finalDamage));
        SimpleMapDamageQJ.put(2, -1, finalDamage, 0, -64);
        $gameParty.leader().gainHp(-finalDamage);

        // 重伤判定
        if ($gameParty.leader().hpRate() <= 0.2) {
            $gameScreen.startShake(1, 8, 30);
            QJ.MPMZ.tl.ex_playerDamageFlash();
        }
        return;
    }

    if (args.target && args.target instanceof Game_Event) {
        let eventId = args.target._eventId;
        if (!Utils.isMobileDevice()) args.target.requestAnimation(188);
        let randomPitch = Math.randomInt(30) + 91;
        AudioManager.playSe({ name: "Fire2", volume: 30, pitch: randomPitch, pan: 0 });

        let finalDamage = damage;
        if (this._extraDamage) {
            finalDamage += this._extraDamage;
        }

        // 伤害计算
        let enemyDEF = $gameSelfVariables.value([$gameMap.mapId(), eventId, 'DEF']);
        let enemyHP = $gameSelfVariables.value([$gameMap.mapId(), eventId, 'HP']);

        finalDamage -= enemyDEF;
        finalDamage = Math.max(1, finalDamage);
        finalDamage = Math.min(99999999, finalDamage);
        finalDamage = Math.max(1, Math.floor(finalDamage));
        SimpleMapDamageQJ.put(2, eventId, finalDamage, 0, -64);

        // 伤害结算
        $gameSelfVariables.setValue([$gameMap.mapId(), eventId, 'HP'], enemyHP - finalDamage);

        // 显示血条变化
        args.target.showHpBar();

        // 死亡判断
        enemyHP = $gameSelfVariables.value([$gameMap.mapId(), eventId, 'HP']);
        if (enemyHP <= 0) {
            $gameSelfSwitches.setValue([$gameMap.mapId(), eventId, 'D'], true);
            return;
        }
    }
};

//眩晕
QJ.MPMZ.tl.ex_playerParalysis = function (time) {

    $gameSwitches.setValue(14, true);
    if (!time) var time = 1;

    if ($gameSystem.hasGameTimeEvent("state11")) {
        // $gameParty.leader().addState(7);
        // $gameSystem.adjustGameTimeEventDelay('state7', time, true);
    } else {
        $gameParty.leader().addState(11);
        $gameSystem.addGameTimeEvent({
            key: 'state11',
            command: 'remove',
            delayMinutes: time,
            target: 11,
            condition: 'true'
        });
    }

    if ($gameMap.getGroupBulletListQJ('playerParalysis').length > 0) return;

    // 眩晕音效
    let seNames = "ヒヨコが頭の上を回る";
    let se = { name: seNames, volume: 100, pitch: 100, pan: 0 };
    AudioManager.playSe(se);

    $gamePlayer.drill_EASe_stopAct();
    if (!$gameParty.leader()._drill_EASA_enabled && !$gameParty.leader().isStateAffected(67)) {
        $gamePlayer.drill_EASe_setSimpleStateNode(["虚弱"]);
    }
    let paralysis = QJ.MPMZ.Shoot({
        groupName: ['playerParalysis', 'paralysis'],
        img: "dizzy[5,3,4]",
        position: [['P'], ['P']],
        initialRotation: ['S', 0],
        imgRotation: ['F'],
        blendMode: 1,
        scale: 0.5,
        anchor: [0.5, 0.7],
        moveType: ['D', true],
        collisionBox: ['C', 48],
        existData: [
            { t: ['S', '!$gameParty.leader().isStateAffected(11)', true], a: [], c: ['S', 'this.time > 30'] },
        ],
        deadJS: ["$gamePlayer.drill_EASA_setEnabled(true);$gameSwitches.setValue(14, false)"]
    });
};


//玩家穿越星之门
QJ.MPMZ.tl.ex_playerTravelsthroughStarGate = function () {

    //Zzy.TWF.ToTheWorld(true);


    var angle;
    switch ($gamePlayer.direction()) {
        case 2:  // 下
            angle = 90;
            break;
        case 4:  // 左
            angle = 180;
            break;
        case 6:  // 右
            angle = 0;
            break;
        case 8:  // 上
            angle = 270;
            break;
        default:
            angle = 270;
            break;
    }
    $gamePlayer.drill_EFOE_playHidingMoveDisappear(45, angle, 24);

    if (!this) return;
    let MHP = $gameSelfVariables.get(this, 'MHP');
    let HP = $gameSelfVariables.get(this, 'HP');
    let rate = HP / MHP;
    if (rate < 0.5) {
        $gameVariables.setValue(13, 3);
    } else {
        $gameVariables.setValue(13, 3);
    }

};

/*
var data = $gameSystem._drill_GFPT_dataTank[ 10 ];
var text = "\\str[41]妹 \n";
text += "\\{\\i[2]\\} ??? \n";
text += "\\py[-8]" + $dataStates[$gameActors.actor(2)._states[0]].description;
text += "\n\\fs[16]\\py[20]✦ドロップアイテム:  \n";
text += "\\fs[14]\\py[-10]" + $dataArmors[$gameActors.actor(2)._equips[1]._itemId].infoTextTop;
data['context'] = text;
$gameTemp._drill_GFPT_windowTank[ 10 ].drill_initMessage();
*/


//=============================================================================
//妹妹场景相关
//=============================================================================

//妹妹状态hud
QJ.MPMZ.tl._imoutoUtilStatesHud = function () {
    if ($gameSystem._drill_GFPT_dataTank[10]) {
        var data = $gameSystem._drill_GFPT_dataTank[10];

        var text = "\\str[41]妹 \n";
        text += "\\fs[28]\\i[2]\\fr ??? ";
        var stateList = $gameActors.actor(2).getStateCategoryAffectedList('imoutoState');
        if (stateList.length > 0) {
            stateList.forEach(function (stateId) {
                text += "\n${$dataStates[" + stateId + "].description}";
                //text += "\n"+$dataStates[ stateId ].description;
            });
        }

        text += "\n\\fs[16]\\py[20]✦ドロップアイテム:  \n";
        if ($gameActors.actor(2).equips()[1]) {
            text += "\\fs[14]\\py[-10]" + $dataArmors[$gameActors.actor(2)._equips[1]._itemId].infoTextTop;
        } else {
            text += "\\fs[14]\\py[-10]" + $dataArmors[159].infoTextTop;
        }
        //data['context'] = text;
        $gameTemp._drill_GFPT_windowTank[10].drill_refreshMessage(text);
    }
};

//拳头武器攻击行为监听
QJ.MPMZ.tl.ex_punchAttackListener = function () {

    if (!$gameParty.leader().equips()[0]) return;
    if ($gameMap.getGroupBulletListQJ('attackMonitoring').length > 0) return;

    let time = 10;
    if ($gameMap.getGroupBulletListQJ('weaponBroken').length > 0) {
        time = 70;
    }

    let type = "PC";
    if (Utils.isMobileDevice()) type = "Mobile";

    QJ.MPMZ.Shoot({
        groupName: ['playerPunch', 'attackMonitoring'],
        img: "null1",
        position: [['P'], ['P']],
        initialRotation: ['S', 0],
        moveType: ['B', -1],
        opacity: 0,
        collisionBox: ['C', 1],
        existData: [
        ],
        moveF: [
            [time, 0, QJ.MPMZ.tl.ex_playerLeftPunchAttack, [type]],
            [time, 120, QJ.MPMZ.tl.ex_PunchAttackEffectRefresh],
        ],
    });

};

QJ.MPMZ.tl.ex_PunchAttackEffectRefresh = function () {

    if (!$gameParty.leader().equips()[0]) return;
    let weapon = $gameParty.leader().equips()[0];
    if (weapon.baseItemId !== 4) return;

    let bonus = Math.floor($gameParty.leader().mhp * 0.01);
    weapon.flatParams[2] = bonus;

};

//左拳普通攻击连打
QJ.MPMZ.tl.ex_playerLeftPunchAttack = function (type) {

    this._coolDown = this._coolDown || 0;
    if (this._coolDown > 0) {
        this._coolDown -= 100;
        return;
    }

    let triggered = false;

    if (type && type === "Mobile") {
        triggered = $gameSwitches.value(201);
    } else {
        triggered = TouchInput.drill_isLeftPressed() || TouchInput.drill_isLeftTriggered();
    }
    if (triggered) {

        if (QJ.MPMZ.tl.ex_playerAntiClickDetection("normalAttack")) return;
        if ($gameSystem.isMapSelectEquipOpen()) return;
        if ($gameParty.leader()._characterName !== "$player") return;

        // 忍杀动作
        if (!ConfigManager.alwaysDash) {
            if ($gameParty.leader().hasSkill(10) && $gameSystem._drill_PAlM_enabled) {
                $gameMap.steupCEQJ(164, 1);
                this._coolDown += 10000;
                return;
            }
        }

        if ($gamePlayer._drill_EASA_enabled) {
            $gamePlayer.drill_EASe_setSimpleStateNode(["普通拳连打"]);
        }

        $gameSystem._drill_PAlM_enabled = false;
        let type;
        let posX = $gamePlayer.screenBoxXShowQJ();
        let posY = $gamePlayer.screenBoxYShowQJ();
        // 发射拳头数，会影响攻击范围面积
        let PunchCount = 1;
        PunchCount += $gameParty.leader().skillMasteryLevel(99);
        let baseangle = 10 + PunchCount * 2;
        let startAngle = -baseangle;
        let endAngle = baseangle;
        switch ($gamePlayer.direction()) {
            case 2:  // 下
                type = "W";
                posX += 10;
                startAngle += baseangle + 15;
                endAngle += baseangle + 15;
                break;
            case 4:  // 左
                type = "W";
                posY += 6;
                startAngle += 8;
                endAngle += 8;
                break;
            case 6:  // 右
                type = "W";
                posY += 8;
                break;
            case 8:  // 上
                type = "E";
                posX -= 5;
                posY += 2;
                startAngle += baseangle + 5;
                endAngle += baseangle + 5;
                break;
            default:
                type = "W";
                break;
        }

        let time = 3 + Math.randomInt(3);
        //time *= $gameParty.leader().pdr;
        let speed = 7 + Math.randomInt(4);
        speed *= $gameParty.leader().pdr;
        speed = '0|' + speed + '~10/0~10|0';

        let coolDown = Math.round(2000 * (1 - $gameParty.leader().cnt));
        coolDown = Math.max(coolDown, 50);

        let randomSeArray = ["キックの素振り1", "パンチの素振り2", "パンチの素振り3"];
        let randomSe = randomSeArray[Math.floor(Math.random() * randomSeArray.length)];
        let randomPitch = 95 + Math.randomInt(40);
        AudioManager.playSe({ name: randomSe, volume: 80, pitch: randomPitch, pan: 0 });

        let minScale = $gameParty.leader().pdr * 0.5;
        let maxScale = $gameParty.leader().pdr * 0.7;
        let damage = chahuiUtil.getVarianceDamage(1);
        var leftPunch = QJ.MPMZ.Shooter_ArcRange(["PD"], {
            groupName: ['leftPunch', 'playerBullet'],
            position: [["S", posX], ["S", posY]],
            img: 'weapon/player_fist[5,4]',
            blendMode: 0,
            //tone:[134,53,150,0],
            opacity: 1,
            moveType: ['S', speed],
            anchor: [0.5, 0.3],
            collisionBox: ['C', 6],
            z: type,
            existData: [
                { t: ['Time', time], d: [0, 10] },
                { t: ['G', ['"enemy"', '"object"']], a: ['F', QJ.MPMZ.tl.ex_toEnemyPunchAttack, [damage, {}]], p: [2, false, true] },
            ],
        }, startAngle, endAngle, PunchCount, baseangle * 3, minScale, maxScale);

        time *= 2;
        QJ.MPMZ.Shoot({
            img: "null1",
            position: [['P'], ['P']],
            initialRotation: ['S', 0],
            moveType: ['B', -1],
            opacity: 0,
            collisionBox: ['C', 1],
            existData: [
                { t: ['Time', time] },
            ],
            deadF: [
                [QJ.MPMZ.tl.ex_playerRightPunchAttack]
            ],
        });

        this._coolDown = coolDown;
    } else {
        if (!$gamePlayer._drill_EASA_enabled && $gamePlayer._drill_EASe_controller && $gamePlayer._drill_EASe_controller._drill_curBitmapName.includes("boxing")) {
            $gamePlayer.drill_EASA_setEnabled(true);
            $gameSystem._drill_PAlM_enabled = true;
        }
    }
};

//右拳普通攻击连打
QJ.MPMZ.tl.ex_playerRightPunchAttack = function () {

    let posX = $gamePlayer.screenBoxXShowQJ();
    let posY = $gamePlayer.screenBoxYShowQJ();
    // 发射拳头数，会影响攻击范围面积
    let PunchCount = 1;
    PunchCount += $gameParty.leader().skillMasteryLevel(99);
    let baseangle = 10 + PunchCount * 2;
    let startAngle = -baseangle;
    let endAngle = baseangle;
    switch ($gamePlayer.direction()) {
        case 2:  // 下
            type = "W";
            posX -= 10;
            startAngle -= baseangle;
            endAngle -= baseangle;
            break;
        case 4:  // 左
            type = "W";
            posY += 6;
            startAngle += 8;
            endAngle += 8;
            break;
        case 6:  // 右
            type = "W";
            posY += 8;
            break;
        case 8:  // 上
            type = "E";
            posX += 10;
            posY += 2;
            startAngle -= baseangle;
            endAngle -= baseangle;
            break;
        default:
            type = "W";
            break;
    }

    let time = 3 + Math.randomInt(3);
    time *= $gameParty.leader().pdr;
    let speed = 7 + Math.randomInt(4);
    speed *= $gameParty.leader().pdr;
    speed = '0|' + speed + '~10/0~10|0';
    let coolDown = Math.round(2000 * (1 - $gameParty.leader().cnt));
    coolDown = Math.max(coolDown, 50);

    let randomSeArray = ["キックの素振り1", "パンチの素振り2", "パンチの素振り3"];
    let randomSe = randomSeArray[Math.floor(Math.random() * randomSeArray.length)];
    let randomPitch = 95 + Math.randomInt(40);
    AudioManager.playSe({ name: randomSe, volume: 80, pitch: randomPitch, pan: 0 });

    let minScale = $gameParty.leader().pdr * 0.5;
    let maxScale = $gameParty.leader().pdr * 0.7;
    let damage = chahuiUtil.getVarianceDamage(1);
    var RightPunch = QJ.MPMZ.Shooter_ArcRange(["PD"], {
        groupName: ['rightPunch', 'playerBullet'],
        position: [["S", posX], ["S", posY]],
        img: 'weapon/player_fist[5,4]',
        blendMode: 0,
        //tone:[134,53,150,0],
        opacity: 1,
        moveType: ['S', speed],
        anchor: [0.5, 0.3],
        collisionBox: ['C', 6],
        z: type,
        existData: [
            { t: ['Time', time], d: [0, 10] },
            { t: ['G', ['"enemy"', '"object"']], a: ['F', QJ.MPMZ.tl.ex_toEnemyPunchAttack, [damage, {}]], p: [2, false, true] },
        ]
    }, startAngle, endAngle, PunchCount, baseangle * 3, minScale, maxScale);

};

//对敌人格斗攻击反馈
QJ.MPMZ.tl.ex_toEnemyPunchAttack = function (Damage, attackData = {}, args) {

    // 若主角无武器则直接返回
    if (!$gameParty.leader().equips()[0]) return;

    if (!args || !args.target || !args.target instanceof Game_Event) return;

    let UjoHagan = false;
    // 受击动画参数
    let angle = Math.randomInt(360);
    let posX = this.inheritX();
    let posY = this.inheritY();
    let fixValue = 20 * this.scaleX;
    posX += fixValue * Math.sin(this.rotationMove * Math.PI / 180);
    posY += -fixValue * Math.cos(this.rotationMove * Math.PI / 180);

    let effectScale = this.scaleX;
    // 暴击的情形
    if ($gameParty.leader().hasSkill(69)) {
        let chance = 4 + $gameParty.leader().skillMasteryLevel(69) * 4;
        if (Math.randomInt(101) < chance) {
            UjoHagan = true;
            effectScale *= 3;
        }
    }
    // 受击音效
    let randomSeArray = ["軽いパンチ1", "軽いパンチ2"];
    let randomSe = randomSeArray[Math.floor(Math.random() * randomSeArray.length)];
    let randomPitch = 80 + Math.randomInt(40);
    if (UjoHagan) randomSe = "Damage3";
    AudioManager.playSe({ name: randomSe, volume: 80, pitch: randomPitch, pan: 0 });
    // 受击演出
    QJ.MPMZ.Shoot({
        img: "animehit[5,4]",
        initialRotation: ['S', angle],
        position: [['S', posX], ['S', posY]],
        scale: effectScale,
        moveType: ['S', 0],
        opacity: 1,
        blendMode: 0,
        z: "MF_UG",
        existData: [
            { t: ['Time', 19] }
        ]
    });

    // 伤害计算
    let eventId = args.target._eventId;
    // 破颜拳适配
    if (UjoHagan) {
        let MHP = $gameSelfVariables.value([$gameMap.mapId(), eventId, 'MHP']);
        let extraDamage = Math.round(MHP * 0.01);
        extraDamage = Math.max(Damage * 3, Math.min(extraDamage, 999999));
        Damage += extraDamage;
    }
    let realDamage = QJ.MPMZ.tl.getEnemyRaceDamageFactor(Damage, args.target);
    if (!realDamage) return;

    // 敌人的 DEF、HP
    let enemy = $dataEnemies[$gameSelfVariables.value([$gameMap.mapId(), eventId, 'enemyId'])];
    if (!enemy) enemy = $dataEnemies[3];
    let enemyDEF = enemy.params[3];
    let enemyHP = $gameSelfVariables.value([$gameMap.mapId(), eventId, 'HP']);
    realDamage -= enemyDEF;
    realDamage = Math.max(1, realDamage);
    realDamage = Math.min(99999999, realDamage);

    // 显示伤害数字
    SimpleMapDamageQJ.put(2, eventId, realDamage, 0, -72);

    // 魔法混合伤害
    let ID = $gameParty.leader().equips()[0].baseItemId;
    if ($dataWeapons[ID]?.traits?.[0]?.dataId === 2 || $gameParty.leader().hasSkill(45)) {
        let mixDamage = Math.round(chahuiUtil.getVarianceDamage(2));
        if (!$gameParty.leader().hasSkill(55)) {
            let enemyMDF = enemy.params[5];
            let damageReduction = 0.01 * chahuiUtil.magicDefenseDamageReduction(enemyMDF);
            mixDamage -= mixDamage * damageReduction;
            mixDamage = Math.floor(Math.max(1, Math.min(mixDamage, 99999)));
        }
        let posX2 = 15 - Math.randomInt(30); // 让伤害数字稍微偏移
        SimpleMapDamageQJ.put(3, eventId, mixDamage, posX2, -64);
        let newHP = $gameSelfVariables.value([$gameMap.mapId(), eventId, 'HP']);
        $gameSelfVariables.setValue([$gameMap.mapId(), eventId, 'HP'], newHP - mixDamage);
    }

    // 伤害结算
    $gameSelfVariables.setValue([$gameMap.mapId(), eventId, 'HP'], enemyHP - realDamage);
    // 刷新血条
    args.target.showHpBar();
    // 死亡判断
    enemyHP = $gameSelfVariables.value([$gameMap.mapId(), eventId, 'HP']);
    if (enemyHP <= 0) {
        $gameSelfSwitches.setValue([$gameMap.mapId(), eventId, 'D'], true);
        QJ.MPMZ.tl.ex_enemyDeathEffectResolution.call(this, args.target);
        return;
    }
};

// 兄杀演出
QJ.MPMZ.tl.ex_oniichanExecutionAnimation = function () {

    // 临时措施，优化玩家未捡取掉落物就被杀死
    $gameParty.leader().removeStateCategory('ijou', 1);

    $gameSwitches.setValue(14, true);
    // 演出期间禁止玩家移动
    $gameSystem._drill_PAlM_enabled = false;

    QJ.MPMZ.Shoot({
        groupName: ['oniichanExecution'],
        img: "object_name/OniichanExecution",
        position: [['S', 0], ['S', 0]],
        initialRotation: ['S', 0],
        imgRotation: ['F'],
        blendMode: 0,
        opacity: "0|0~120/1~999|1",
        scale: 0.5,
        onScreen: true,
        anchor: [0, 0],
        moveType: ['S', 0],
        collisionBox: ['C', 1],
        z: 'A',
        existData: [
            { t: ['Time', 300], d: [0, 60] }
        ],
        moveJS: [
            [10, 999, "AudioManager.playSe({ name: 'Collapse2', volume: 90, pitch: 50, pan: 0 })"]
        ],
        deadJS: [
            `$gameMap.moveFilter('mapBlur', [0], 60);
			  $gameMap.eraseFilterAfterMove('mapBlur');
			  AudioManager.fadeInBgm(4);
			  setTimeout(() => {
			     $gameSwitches.setValue(14, false);
			     $gameSystem._drill_PAlM_enabled = true;
	          }, 1000);	 `
        ]
    });
    // 地图模糊滤镜
    var id = "mapBlur";
    var filterTarget = 21;
    $gameMap.createFilter(id, "blur", filterTarget);
    $gameMap.setFilter(id, [0]);
    $gameMap.moveFilter(id, [2], 90);

};


// 检测玩家是否应该死亡，适配各种特殊生存手段
QJ.MPMZ.tl.ex_shouldPlayerDieCheck = function () {

    if (!this) return;
    // 防止死亡事件重复触发

    if ($gameTemp._eventReserved || $gameParty.leader()._deadness) {
        this._index = this._list.length;
        return;
    }

    // 特殊死亡方式无法激活保命手段
    if ($gameStrings.value(20).trim() !== "") return;
    let player = $gameParty.leader();

    //  稻草人之心适配
    if (player.isStateAffected(115)) {
        if ($gameSystem.hasGameTimeEvent('scarecrowHeart')) {
            this._index = this._list.length;
            return;
        }
    }

    //  毅力头巾-毅力效果
    if (player.hasSkill(42)) {
        let chance = 5 + player.skillMasteryLevel(42) * 10;
        if (chance > Math.randomInt(101)) {
            // 受到致命伤锁血
            player.setHp(1);
            AudioManager.playSe({ name: "Skill3", volume: 60, pitch: 85, pan: 0 });
            QJ.MPMZ.tl.ex_effectFonts("buqu", -1);
            this._index = this._list.length;
            return;
        }
    }

};

// 玩家死亡清理多余演出效果
QJ.MPMZ.tl.ex_cleanupDeathExtraEffects = async function (extra={}) {

    if (extra.weakAnim) {
		const zoom  = $gameScreen.zoomScale();
		let posX    = 960 / zoom; 
		let posY    = 540 / zoom;
		let lang    = ConfigManager.language; 
		const scale = 1 / zoom;
		let checkName = "WEAK" + lang;
		const ok = await Promise.resolve(
		  QJ.MPMZ.tl.checkPictureExists(['img','projectiles','object_name'], `${checkName}.rpgmvp`)
		);

		if (!ok) lang = 2;	
		let imgName = "object_name/WEAK" + lang;
		// 黑色遮罩
		QJ.MPMZ.Shoot({	  
			  img: "blackk",
			  position: [['S', 0], ['S', 0]],
			  initialRotation: ['S', 0],
			  imgRotation: ['F'],
			  opacity: '0|0~120/1~9999999/1',
			  moveType: ['S', '0'],
			  z: 'A',
			  scale: 10,
			  onScreen: true,
			  anchor: [0, 0],         
			  existData:[   ],
			  moveJS:[
			     [30,999999, `AudioManager.playSe({name: '魔の時計塔の鐘',volume: 90,pitch: 100,pan: 0});`]
			  ]
		});		
		// 弱字演出
		QJ.MPMZ.Shoot({
			 img:imgName,
			 groupName:['WEAK'],
			 position:[['S',posX],['S',posY]],
			 anchor:[0.5,0.5],
			 initialRotation:['S',0],
			 opacity: '0|0~120|0~150/1~9999999/1',
			 scale:scale,
			 existData:[   ],
			 imgRotation:['F'],
			 z:"A",
			 onScreen:true,
			 moveType:['S',0]
		});	
        return;		
	}

    // 清除掉存在的选项和对话框以及正在执行的事件
    resetMessageWindow();

    $gamePlayer.mppHidPasZ = 0;
    // 死亡事件锁
    $gameTemp._eventReserved = true;
    $gameSystem._drill_COI_map_mouse = false;
    TouchInput._mousePressed = false;
    $gameScreen._pictureCidArray = [];
    $gamePlayer.drill_PT_clearLifting();
    ctb.useTurnPlayer = false;
    // 强制恢复鼠标权限
    $gameSystem._drill_COI_map_mouse = true;
    $gameSwitches.setValue(3, false);
    // 禁止玩家移动
    $gameSystem._drill_PAlM_enabled = false;
    Zzy.TWF.ToTheWorld(true);
};

// 玩家复活跳跃演出
QJ.MPMZ.tl.ex_oniichanReviveJump = function () {

    if (!this) return;

    let player = $gamePlayer;
    // 玩家当前坐标区域
    let regionId = $gameMap.regionId(player._realX + player.offsetX(), player._realY - 0.3);
    let noPassable = !$gameMap.checkPlayerIsPassable();
    // 玩家处于无法移动的状态
    if ($gameNumberArray.value(5).includes(regionId) || noPassable) {
        player._drill_JSp['enabled'] = true;
        player._drill_JSp['height'] = -1;
        player._drill_JSp['time'] = 35;
        player._drill_JSp['speed'] = 10;

        let XX = Math.round(player.centerRealX());
        let YY = Math.round(player.centerRealY());
        let condition = DrillUp.g_COFA_condition_list[10];
        let c_area = $gameMap.drill_COFA_getShapePointsWithCondition(XX, YY, "圆形区域", 12, condition);
        // 跳出不可通行区域		
        if (c_area.length > 0) {
            let p = c_area[Math.floor(Math.random() * c_area.length)];
            let xPlus = p.x - XX;
            let yPlus = p.y - YY;
            player.jump(xPlus, yPlus);
        } else {
            player.jump(0, 0);
        }
    }
};

// 方差工具
QJ.MPMZ.tl.randIntByRatio = function (base, ratios) {
    if (!Array.isArray(ratios)) ratios = [Number(ratios) || 0.1, Number(ratios) || 0.1];
    var down = Math.max(0, Number(ratios[0]) || 0);
    var up = Math.max(0, Number(ratios[1] != null ? ratios[1] : ratios[0]) || 0);

    // 计算浮动区间，并取整到整数边界
    var min = Math.floor(base * (1 - down));
    var max = Math.ceil(base * (1 + up));

    // 随机整数 [min, max]
    return Math.floor(Math.random() * (max - min + 1)) + min;
};



// 初号机功能初始化
QJ.MPMZ.tl.InitializeUnitINexusFunction = function (initialize) {

    const actor = $gameParty.leader();
    // 坐标显示
    if (actor.hasSkill(21)) {
        QJ.MPMZ.tl.ShowPlayerCoordinates();
    }
    // 采集物探测
    if (actor.hasSkill(22)) {
        QJ.MPMZ.tl.ShowCollectibleObjectCount();
    }

};


// 初号机-显示玩家坐标
QJ.MPMZ.tl.ShowPlayerCoordinates = function (initialize) {
    if (!$gameScreen.picture(101)) {
        var picY = 160;
        let picName = "characters/" + "LocationDisplay";
        $gameScreen.showPicture(101, picName, 0, 30, picY, 100, 100, 255, 0);
    }

    function to1Trunc(x) {
        let n = Number(x);
        if (!Number.isFinite(n)) return "0.0";
        let t = (n < 0 ? Math.ceil(n * 10) : Math.floor(n * 10)) / 10; // 向零截断
        return t.toFixed(1); // 始终保留1位小数（字符串）
    }

    let playerX = to1Trunc($gamePlayer.centerRealX());
    let playerY = to1Trunc($gamePlayer.centerRealY());
    let BulletText = " X" + playerX + " Y" + playerY + " ";

    let img = [
        "T",
        {
            text: BulletText,
            arrangementMode: 0,
            textColor: "#ffffff",
            fontSize: 26,
            outlineColor: "#000000",
            outlineWidth: 1,
            fontFace: "RiiTegakiFude",
            fontItalic: false,
            fontBold: true,
            width: 420,
            height: 100,
            textAlign: 4,
            lineWidth: 0,
            lineColor: "#ffffff",
            lineRate: 1.0,
            backgroundColor: null,
            backgroundOpacity: 1,
            shadowBlur: 8,
            shadowColor: "#000000",
            shadowOffsetX: 0,
            shadowOffsetY: 0
        }
    ];

    if (initialize && initialize === "refresh") {
        this.changeAttribute("img", img);
        return;
    }

    let zoom = $gameScreen.zoomScale();
    let posX = 500 / zoom;
    let posY = (picY + 85) / zoom;
    let Scale = 1 / zoom;

    for (let i = 0; i < 1; i++) {
        QJ.MPMZ.Shoot({
            img: img,
            groupName: ['ShowPlayerCoordinates', 'UnitINexus'],
            position: [["S", posX], ["S", posY]],
            initialRotation: ["S", 0],
            imgRotation: ["S", 0],
            opacity: 1,
            moveType: ["S", 0],
            z: "A",
            scale: Scale,
            onScreen: true,
            anchor: [1, 1],
            existData: [],
            moveF: [
                [30, 30, QJ.MPMZ.tl.ShowPlayerCoordinates, ["refresh"]]
            ],
            deadJS: [
                "$gameScreen.erasePicture(101)"
            ]
        });
    }
};


QJ.MPMZ.tl.refreshPrototypeCoreDisplayText = function (initialize) {

    let count = 0;
    let treasure = 0;
    let inWater = $gameSelfVariables.value([$gameMap.mapId(), 1, 'maxFishing']);
    if (inWater == 2) inWater = 1;
    if (inWater <= 1) inWater = 0;
    let enemy = $gameMap.drill_COET_getEventsByTag_direct("魔物").length;
    let treasureList = $gameMap.drill_COET_getEventsByTag_direct("宝箱");
    if (treasureList.length > 0) {
        for (let target of treasureList) {
            let eid = target._eventId;
            if ($gameSelfSwitches.value([$gameMap.mapId(), eid, 'A']) || $gameSelfSwitches.value([$gameMap.mapId(), eid, 'D'])) {
                continue;
            }
            treasure += 1;
        }
    }
    count += inWater + enemy + treasure;
    $gameVariables._data[250] = count;

    let enemyText = window.systemFeatureText && window.systemFeatureText.nearbyMonstersCount;
    if (!enemyText) enemyText = "Detected nearby monsters";
    enemyText = Array.isArray(enemyText) ? enemyText.join("\n") : (enemyText ?? "");

    let treasureText = window.systemFeatureText && window.systemFeatureText.nearbyTreasuresCount;
    if (!treasureText) treasureText = "Detected nearby treasures";
    treasureText = Array.isArray(treasureText) ? treasureText.join("\n") : (treasureText ?? "");

    let inWaterText = window.systemFeatureText && window.systemFeatureText.underwaterTreasuresCount;
    if (!inWaterText) inWaterText = "Detected underwater treasures";
    inWaterText = Array.isArray(inWaterText) ? inWaterText.join("\n") : (inWaterText ?? "");

    let textArray = [];
    textArray.push(`${enemyText}: ${enemy}`);
    textArray.push(`${treasureText}: ${treasure}`);
    textArray.push(`${inWaterText}: ${inWater}`);
    return textArray;

};

// 初号机-显示可采集对象数量
QJ.MPMZ.tl.ShowCollectibleObjectCount = function (initialize) {

    let picture = $gameScreen.picture(102);
    if (!picture) {
        var picY = 230;
        let picName = "characters/" + "LootDetection";
        $gameScreen.showPicture(102, picName, 0, 30, picY, 100, 100, 255, 0);
    } else {
        // 刷新描述窗口
        let text = QJ.MPMZ.tl.refreshPrototypeCoreDisplayText.call(this);
        let bind = DrillUp.g_MPFP_list[6];
        if (!picture._drill_MPFP_bean) {
            picture._drill_MPFP_bean = new Drill_MPFP_Bean();
            $gameTemp._drill_MPFP_needRestatistics = true;
            picture.drill_COPWM_checkData();
        }
        if ($gameScreen.isPointerInnerPicture(102)) return;
        picture._drill_MPFP_bean.drill_bean_setVisible(true);
        picture._drill_MPFP_bean.drill_bean_setContextList(text);
        picture._drill_MPFP_bean.drill_bean_setSkinStyle(bind['style_mode'], bind['style_lockedId']);
    }
    let count = $gameVariables._data[250];
    let BulletText = ` ${count} `;
    let img = [
        "T",
        {
            text: BulletText,
            arrangementMode: 0,
            textColor: "#ffffff",
            fontSize: 26,
            outlineColor: "#000000",
            outlineWidth: 1,
            fontFace: "RiiTegakiFude",
            fontItalic: false,
            fontBold: true,
            width: 420,
            height: 100,
            textAlign: 4,
            lineWidth: 0,
            lineColor: "#ffffff",
            lineRate: 1.0,
            backgroundColor: null,
            backgroundOpacity: 1,
            shadowBlur: 8,
            shadowColor: "#000000",
            shadowOffsetX: 0,
            shadowOffsetY: 0
        }
    ];

    if (initialize && initialize === "refresh") {
        this.changeAttribute("img", img);
        return;
    }
    let zoom = $gameScreen.zoomScale();
    let posX = 500 / zoom;
    let posY = (picY + 85) / zoom;
    let Scale = 1 / zoom;

    for (let i = 0; i < 1; i++) {
        QJ.MPMZ.Shoot({
            img: img,
            groupName: ['ShowCollectibleObjectCount', 'UnitINexus'],
            position: [["S", posX], ["S", posY]],
            initialRotation: ["S", 0],
            imgRotation: ["F"],
            opacity: 1,
            moveType: ["S", 0],
            z: "A",
            scale: Scale,
            onScreen: true,
            anchor: [1, 1],
            existData: [],
            moveF: [
                [60, 60, QJ.MPMZ.tl.ShowCollectibleObjectCount, ["refresh"]]
            ],
            deadJS: [
                "$gameScreen.erasePicture(102)"
            ]
        });
    }
};

(() => {
    // ==================== 配置常量 ====================
    const CONFIG = {
        // ===== 區域安全性配置 =====

        // 說明：不安全區域的 Region ID 列表
        // 作用：逃脫時會避開這些區域，防止跳入危險地帶（如岩漿、毒沼等）
        // 修改：添加或移除 Region ID，例如 new Set([250, 251, 252])
        UNSAFE_REGION_IDS: new Set([250]),

        // ===== 逃脫系統配置 =====

        // 說明：尋找安全出口的最大搜索半徑（格子數）
        // 作用：限制逃脫搜索範圍，避免性能消耗
        // 修改：調大 → 能找到更遠的逃脫點，調小 → 僅搜索附近
        // 建議：10-20（會隨重試次數動態增加）
        MAX_SEARCH_RANGE: 15,

        // 說明：逃脫失敗後的最大重試次數
        // 作用：超過此次數後，傳送玩家到地圖起始點（終極保護）
        // 修改：調大 → 更多重試機會，調小 → 更快觸發終極傳送
        // 建議：5-15
        MAX_RETRY_COUNT: 10,

        // ===== 緩存管理配置 =====

        // 說明：最多緩存的地圖數量（LRU 策略）
        // 作用：保留最近訪問的 N 張地圖數據，超過時自動清除最舊的
        // 修改：調大 → 更多緩存（佔用更多內存），調小 → 更頻繁重新計算
        // 建議：3-5
        MAX_CACHED_MAPS: 5,

        // ===== 內存配置 =====

        // 說明：支持的最大地圖尺寸（單邊長度）
        // 作用：預分配緩衝區大小 = MAX_MAP_SIZE × MAX_MAP_SIZE × 2
        // 修改：調大 → 支持更大地圖（佔用更多內存），調小 → 節省內存
        // 建議：150-250（150 = 360KB，200 = 640KB，250 = 1MB）
        // 注意：超過此尺寸的地圖會導致預處理失敗
        MAX_MAP_SIZE: 200,

        // 說明：逃脫搜索的最大範圍（格子數）
        // 作用：預分配搜索緩衝區大小
        // 修改：通常不需要改動，除非 MAX_RETRY_COUNT 很大
        // 建議：保持 100（足以覆蓋半徑 100 的搜索，佔用 120KB）
        MAX_SEARCH_CELLS: 100,

        // ===== 性能優化配置 =====

        // 說明：通行性檢查模式
        // true：使用 $gamePlayer.canPass（嚴格，考慮事件碰撞）
        // false：使用 $gameMap.checkPassage（寬鬆，僅檢查圖塊通行性，性能更好）
        // 作用：影響所有 isPassable 判斷
        // 修改：false 可提昇 20-30% 性能，但可能無視某些事件阻擋
        // 建議：有複雜事件阻擋邏輯時用 true，否則用 false
        USE_STRICT_CHECK: true
    };

    // 降級跳躍方向（固定模式，由近到遠）
    const FALLBACK_JUMPS = [
        [0, -4], [0, 4], [-4, 0], [4, 0],
        [0, -3], [0, 3], [-3, 0], [3, 0],
        [0, -2], [0, 2], [-2, 0], [2, 0]
    ];

    // 四方向偏移量（避免在循環中重複創建）
    const DIR_OFFSETS = [
        [0, -1],  // 上
        [0, 1],   // 下
        [-1, 0],  // 左
        [1, 0]    // 右
    ];

    // ==================== 核心工具函式 ====================

    // 快取玩家碰撞忽略狀態
    let _canIgnoreCollision = false;

    // 預分配共享緩衝區，避免重複創建
    const _sharedVisited = new Set();
    const _sharedQueue = new Int32Array(CONFIG.MAX_SEARCH_CELLS ** 2 * 3);
    const _preprocessQueue = new Int32Array(CONFIG.MAX_MAP_SIZE ** 2 * 2);

    // 預分配候選點緩衝區（避免在 findSafeExit 中重複創建數組）
    const _candidatesBuffer = new Array(100);
    for (let i = 0; i < 100; i++) {
        _candidatesBuffer[i] = { x: 0, y: 0, openness: 0 };
    }

    // ==================== 地圖預處理系統 ====================

    // LRU 多地圖緩存
    const _mapCacheStore = new Map();
    const _lruOrder = [];

    /**
     * 將座標轉換為整數 Key，避免字串拼接造成的 GC 壓力
     * 假設地圖寬高不超過 65535
     */
    function coordToKey(x, y) {
        return (y << 16) | x;
    }

    /**
     * 檢查指定座標是否可通行
     * @param {number} x - X座標
     * @param {number} y - Y座標
     * @param {boolean} avoidUnsafe - 是否避開不安全區域（僅在尋找逃脫點時使用）
     * @returns {boolean}
     */
    function isPassable(x, y, avoidUnsafe = false) {
        if (!$gameMap.isValid(x, y)) return false;

        const region = $gameMap.regionId(x, y);

        // 檢查禁行區域
        if (!_canIgnoreCollision) {
            const isNoPassRegion = $gameNumberArray.value(5).includes(region);
            if (isNoPassRegion) return false;
        }

        // 避開不安全區域
        if (avoidUnsafe && CONFIG.UNSAFE_REGION_IDS.has(region)) return false;

        return CONFIG.USE_STRICT_CHECK
            ? $gamePlayer.canPass(x, y, 2)
            || $gamePlayer.canPass(x, y, 4)
            || $gamePlayer.canPass(x, y, 6)
            || $gamePlayer.canPass(x, y, 8)
            : $gameMap.checkPassage(x, y, 2)
            || $gameMap.checkPassage(x, y, 4)
            || $gameMap.checkPassage(x, y, 6)
            || $gameMap.checkPassage(x, y, 8);
    }

    /**
     * 檢查玩家是否完全被困（四方向都無法移動）
     */
    function isPlayerTrapped(x, y) {
        return !isPassable(x, y, false);
    }

    /**
     * 計算位置的開放度（周圍可通行方向的加權分數）
     * 四方向權重2，對角線權重1，最高 12 分
     */
    function calculateOpennessScore(x, y, avoidUnsafe = false) {
        let score = 0;

        // 四方向（各 2 分）
        if (isPassable(x, y - 1, avoidUnsafe)) score += 2;
        if (isPassable(x, y + 1, avoidUnsafe)) score += 2;
        if (isPassable(x - 1, y, avoidUnsafe)) score += 2;
        if (isPassable(x + 1, y, avoidUnsafe)) score += 2;

        // 對角線（各 1 分）
        if (isPassable(x - 1, y - 1, avoidUnsafe)) score += 1;
        if (isPassable(x + 1, y - 1, avoidUnsafe)) score += 1;
        if (isPassable(x - 1, y + 1, avoidUnsafe)) score += 1;
        if (isPassable(x + 1, y + 1, avoidUnsafe)) score += 1;

        return score;
    }

    /**
     * 檢查連通分量是否為完全封閉的孤島
     * 邏輯：遍歷該分量的所有格子，檢查其四周是否完全被牆壁包圍
     * 如果有任何一個格子的相鄰位置是主地圖或其他連通區域，則不是孤島
     * @param {number} componentId - 連通分量 ID
     * @param {Int32Array} componentMap - 連通分量地圖
     * @param {number} mainComponentId - 主地圖 ID
     * @param {number} width - 地圖寬度
     * @param {number} height - 地圖高度
     * @returns {boolean} true = 完全封閉的孤島，false = 有出口連接
     */
    function isComponentFullyIsolated(componentId, componentMap, mainComponentId, width, height) {
        // 主地圖本身不可能是孤島
        if (componentId === mainComponentId) return false;

        // 遍歷地圖，檢查該分量的所有格子
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const index = y * width + x;

                // 只檢查屬於該分量的格子
                if (componentMap[index] !== componentId) continue;

                // 檢查四個方向的相鄰格子（使用預定義的方向數組，避免創建臨時對象）
                for (let d = 0; d < 4; d++) {
                    const nx = x + DIR_OFFSETS[d][0];
                    const ny = y + DIR_OFFSETS[d][1];

                    // 邊界外視為牆壁，跳過
                    if (!$gameMap.isValid(nx, ny)) continue;

                    const nIndex = ny * width + nx;
                    const nComponentId = componentMap[nIndex];

                    // 如果相鄰格子屬於主地圖，說明有出口
                    if (nComponentId === mainComponentId) {
                        return false; // 不是孤島，有連接到主地圖
                    }

                    // 如果相鄰格子屬於其他連通區域（不是牆壁），也算有出口
                    // 這可以處理多個房間通過門互相連接的情況
                    if (nComponentId !== 0 && nComponentId !== componentId) {
                        return false; // 有連接到其他區域
                    }
                }
            }
        }

        // 所有邊界格子的外圍都是牆壁（componentId = 0），判定為孤島
        return true;
    }

    /**
     * 地圖預處理：建立完整的連通分量圖
     * 使用 Flood Fill 算法標記所有連通區域，找出主地圖
     */
    function preprocessMap() {
        const mapId = $gameMap.mapId();

        // 檢查緩存是否存在
        if (_mapCacheStore.has(mapId)) {
            const index = _lruOrder.indexOf(mapId);
            if (index !== -1) _lruOrder.splice(index, 1);
            _lruOrder.push(mapId);
            return;
        }

        // 緩存未命中，檢查是否需要淘汰
        if (_mapCacheStore.size >= CONFIG.MAX_CACHED_MAPS) {
            const oldestMapId = _lruOrder.shift();
            _mapCacheStore.delete(oldestMapId);
        }

        const width = $gameMap.width();
        const height = $gameMap.height();

        const cache = {
            width: width,
            height: height,
            componentMap: null,
            componentSizes: new Map(),
            mainComponentId: -1,
            componentIsIsolated: new Map()
        };

        const totalCells = width * height;
        cache.componentMap = new Int32Array(totalCells);

        const componentMap = cache.componentMap;
        const componentSizes = cache.componentSizes;

        let currentComponentId = 1;
        const queue = _preprocessQueue;

        const rightBound = width - 1;
        const bottomBound = height - 1;

        // Flood Fill 建立所有連通份量
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const index = y * width + x;

                if (componentMap[index] !== 0 || !isPassable(x, y, false)) {
                    continue;
                }

                let head = 0;
                let tail = 0;
                let componentSize = 0;

                queue[tail++] = x;
                queue[tail++] = y;
                componentMap[index] = currentComponentId;

                while (head < tail) {
                    const cx = queue[head++];
                    const cy = queue[head++];
                    componentSize++;

                    if (cy > 0) {
                        const nIndex = (cy - 1) * width + cx;
                        if (componentMap[nIndex] === 0 && isPassable(cx, cy - 1, false)) {
                            componentMap[nIndex] = currentComponentId;
                            queue[tail++] = cx;
                            queue[tail++] = cy - 1;
                        }
                    }

                    if (cy < bottomBound) {
                        const nIndex = (cy + 1) * width + cx;
                        if (componentMap[nIndex] === 0 && isPassable(cx, cy + 1, false)) {
                            componentMap[nIndex] = currentComponentId;
                            queue[tail++] = cx;
                            queue[tail++] = cy + 1;
                        }
                    }

                    if (cx > 0) {
                        const nIndex = cy * width + (cx - 1);
                        if (componentMap[nIndex] === 0 && isPassable(cx - 1, cy, false)) {
                            componentMap[nIndex] = currentComponentId;
                            queue[tail++] = cx - 1;
                            queue[tail++] = cy;
                        }
                    }

                    if (cx < rightBound) {
                        const nIndex = cy * width + (cx + 1);
                        if (componentMap[nIndex] === 0 && isPassable(cx + 1, cy, false)) {
                            componentMap[nIndex] = currentComponentId;
                            queue[tail++] = cx + 1;
                            queue[tail++] = cy;
                        }
                    }
                }

                componentSizes.set(currentComponentId, componentSize);
                currentComponentId++;
            }
        }

        // 找出主地圖（最大連通份量）
        let mainComponentId = -1;
        let maxSize = 0;

        for (const [id, size] of componentSizes.entries()) {
            if (size > maxSize) {
                maxSize = size;
                mainComponentId = id;
            }
        }

        cache.mainComponentId = mainComponentId;

        // 預先判斷每個連通份量是否為孤島
        for (const [id] of componentSizes.entries()) {
            const isIsolated = isComponentFullyIsolated(
                id, componentMap, mainComponentId, width, height
            );
            cache.componentIsIsolated.set(id, isIsolated);
        }

        _mapCacheStore.set(mapId, cache);
        _lruOrder.push(mapId);
    }

    /**
     * 綜合判斷玩家是否處於孤立區域
     * 完全依賴預處理數據 (O(1) 高效查表)
     */
    function isInIsolatedArea(x, y) {
        if (_canIgnoreCollision) return false;

        const mapId = $gameMap.mapId();
        const cache = _mapCacheStore.get(mapId);
        if (!cache) return false;

        const floorX = Math.floor(x);
        const floorY = Math.floor(y);

        // 邊界檢查
        if (floorX < 0 || floorX >= cache.width || floorY < 0 || floorY >= cache.height) return false;

        const index = floorY * cache.width + floorX;
        const componentId = cache.componentMap[index];

        // 障礙物中（視為被困）
        if (componentId === 0) return true;

        // 在主地圖區域（絕對安全）
        if (componentId === cache.mainComponentId) return false;

        // 直接查表該連通分量是否為孤島
        return cache.componentIsIsolated.get(componentId) || false;
    }

    // ==================== 逃脫系統 ====================

    /**
     * 尋找最近的安全出口
     * 邏輯：BFS 擴展，利用預處理數據快速判斷點位是否安全
     */
    function findSafeExit(startX, startY, maxRange) {
        _sharedVisited.clear();
        const queue = _sharedQueue;
        let head = 0;
        let tail = 0;

        _sharedVisited.add(coordToKey(startX, startY));
        queue[tail++] = startX;
        queue[tail++] = startY;
        queue[tail++] = 0;

        const mapId = $gameMap.mapId();
        const cache = _mapCacheStore.get(mapId);
        if (!cache) return null;

        // 使用預分配的候選點緩衝區，避免創建新數組
        let candidatesCount = 0;
        let foundCandidatesDist = -1;

        while (head < tail) {
            const x = queue[head++];
            const y = queue[head++];
            const dist = queue[head++];

            // 嚴格最短路徑控制：如果已經在更近的距離找到了候選點，立刻停止
            if (candidatesCount > 0 && dist > foundCandidatesDist) {
                break;
            }

            if (dist > maxRange) break;

            // 檢查點位有效性 (避開自身，且物理可通行)
            if (!(x === startX && y === startY) && isPassable(x, y, true)) {
                // 利用預處理數據進行 O(1) 判斷
                const index = y * cache.width + x;
                const componentId = cache.componentMap[index];

                // 必須是 主地圖 OR 不是孤島的區域
                let isSafe = false;
                if (componentId === cache.mainComponentId) {
                    isSafe = true;
                } else {
                    const isIsolated = cache.componentIsIsolated.get(componentId);
                    if (!isIsolated) {
                        isSafe = true;
                    }
                }

                if (isSafe) {
                    if (foundCandidatesDist === -1 || dist === foundCandidatesDist) {
                        foundCandidatesDist = dist;
                        // 複用緩衝區對象，避免創建新對象
                        if (candidatesCount < _candidatesBuffer.length) {
                            const candidate = _candidatesBuffer[candidatesCount++];
                            candidate.x = x;
                            candidate.y = y;
                            candidate.openness = calculateOpennessScore(x, y, true);
                        }
                    }
                }
            }

            // BFS 擴展（使用內聯計算，避免創建臨時變量）
            if (dist < maxRange) {
                const nextDist = dist + 1;

                // 上
                let nx = x;
                let ny = y - 1;
                let nKey = coordToKey(nx, ny);
                if (!_sharedVisited.has(nKey) && $gameMap.isValid(nx, ny)) {
                    _sharedVisited.add(nKey);
                    queue[tail++] = nx;
                    queue[tail++] = ny;
                    queue[tail++] = nextDist;
                }

                // 下
                ny = y + 1;
                nKey = coordToKey(nx, ny);
                if (!_sharedVisited.has(nKey) && $gameMap.isValid(nx, ny)) {
                    _sharedVisited.add(nKey);
                    queue[tail++] = nx;
                    queue[tail++] = ny;
                    queue[tail++] = nextDist;
                }

                // 左
                nx = x - 1;
                ny = y;
                nKey = coordToKey(nx, ny);
                if (!_sharedVisited.has(nKey) && $gameMap.isValid(nx, ny)) {
                    _sharedVisited.add(nKey);
                    queue[tail++] = nx;
                    queue[tail++] = ny;
                    queue[tail++] = nextDist;
                }

                // 右
                nx = x + 1;
                nKey = coordToKey(nx, ny);
                if (!_sharedVisited.has(nKey) && $gameMap.isValid(nx, ny)) {
                    _sharedVisited.add(nKey);
                    queue[tail++] = nx;
                    queue[tail++] = ny;
                    queue[tail++] = nextDist;
                }
            }
        }

        // 在所有「最短距離」的候選點中，選擇地形最開闊的一個
        if (candidatesCount > 0) {
            let bestCandidate = _candidatesBuffer[0];
            for (let i = 1; i < candidatesCount; i++) {
                if (_candidatesBuffer[i].openness > bestCandidate.openness) {
                    bestCandidate = _candidatesBuffer[i];
                }
            }
            // 返回最佳候選點的副本
            return { x: bestCandidate.x, y: bestCandidate.y, openness: bestCandidate.openness };
        }

        return null;
    }

    /**
     * 降級策略：固定方向跳躍
     */
    function tryFallbackJump(playerX, playerY) {
        const mapId = $gameMap.mapId();
        const cache = _mapCacheStore.get(mapId);
        if (!cache) return false;

        for (let i = 0; i < FALLBACK_JUMPS.length; i++) {
            const dx = FALLBACK_JUMPS[i][0];
            const dy = FALLBACK_JUMPS[i][1];
            const tx = playerX + dx;
            const ty = playerY + dy;

            if (isPassable(tx, ty, true)) {
                const index = ty * cache.width + tx;
                const componentId = cache.componentMap[index];

                if (componentId === cache.mainComponentId) {
                    $gamePlayer.jump(dx, dy);
                    return true;
                }

                const isIsolated = cache.componentIsIsolated.get(componentId);
                if (!isIsolated) {
                    $gamePlayer.jump(dx, dy);
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * 執行逃脫流程
     */
    function performEscape(playerX, playerY, retryCount) {
        QJ.MPMZ.tl.ex_playerStuckCollisionDamage();

        const searchRange = CONFIG.MAX_SEARCH_RANGE + (retryCount * 3);
        const exit = findSafeExit(playerX, playerY, searchRange);

        if (exit) {
            $gamePlayer.jump(exit.x - playerX, exit.y - playerY);
            return true;
        }

        return tryFallbackJump(playerX, playerY);
    }

    // ==================== 主檢查邏輯 ====================

    let _lastCheckX = -1;
    let _lastCheckY = -1;
    let _lastMapId = -1;

    let _stuckRetryCount = 0;
    let _lastStuckX = -1;
    let _lastStuckY = -1;

    QJ.MPMZ.tl.ex_playerStuckCheck = function () {
        const currentMapId = $gameMap.mapId();
        const playerX = Math.floor($gamePlayer.x);
        const playerY = Math.floor($gamePlayer.y);

        if ($gameMessage.isBusy()) QJ.MPMZ.tl.ex_playerAttackCommandBlock();

        // 更新碰撞忽略狀態
        _canIgnoreCollision = $gamePlayer._through || $gamePlayer.isJumping() || $gameSwitches.value(100);

        // 切換地圖時，執行一次預處理
        if (currentMapId !== _lastMapId && currentMapId > 0) preprocessMap();

        const isTrapped = isPlayerTrapped(playerX, playerY);

        // 如果不被困 & 座標沒變 & 地圖也沒變，才跳過
        if (!isTrapped &&
            playerX === _lastCheckX &&
            playerY === _lastCheckY &&
            currentMapId === _lastMapId) {
            return;
        }

        // 孤立區域檢測
        const isIsolated = !isTrapped && isInIsolatedArea(playerX, playerY);

        if (isTrapped || isIsolated) {
            if (playerX === _lastStuckX && playerY === _lastStuckY) {
                _stuckRetryCount++;
            } else {
                _stuckRetryCount = 1;
                _lastStuckX = playerX;
                _lastStuckY = playerY;
            }

            if (_stuckRetryCount > CONFIG.MAX_RETRY_COUNT) {
                $gamePlayer.reserveTransfer(
                    currentMapId,
                    $dataMap.startX || 0,
                    $dataMap.startY || 0
                );
                _stuckRetryCount = 0;
                _lastStuckX = -1;
                _lastStuckY = -1;
                return;
            }

            performEscape(playerX, playerY, _stuckRetryCount);

        } else {
            if (_stuckRetryCount > 0) {
                _stuckRetryCount = 0;
                _lastStuckX = -1;
                _lastStuckY = -1;
            }
        }

        _lastCheckX = playerX;
        _lastCheckY = playerY;
        _lastMapId = currentMapId;
    };
})();