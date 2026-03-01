//=============================================================================
//
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc [弹幕模板库][敌人模板]
 * @author 仇九
 *
 * @help 
 * 
 *
 */
//=============================================================================
//
//=============================================================================

// 敌人跌落效果处理
QJ.MPMZ.tl.ex_enemyFallCheck = function (region, etraData = {}, args) {

  if (!region || !args?.target || !(args.target instanceof Game_Event)) return;

  /* 统一成数组，方便 includes 判断 -------------------- */
  const regionList = Array.isArray(region) ? region : [region];
  
  const ev   = args.target;
  const regionId   = ev.dotRegionId();
  
  let effects = {};
  if (regionId === 248) effects = {immediateEffect:true};
  
  if (regionList.includes(regionId)) {	  
      $gameMap.steupCEQJ(133, ev._eventId, effects);     
  }
};

// 对弹幕攻击
QJ.MPMZ.tl.ex_toBulletAttack = function (weaponDamage, attackData = {}, args) {

  // 仅对弹幕对象生效
  if (args.bulletTarget instanceof Game_QJBulletMZ || args.bulletTarget instanceof Game_QJLaserMZ) {

  // 玩家无武器则直接返回
  const actor = $gameParty.leader();
  const weapon = actor && actor.equips()[0];
  if (!weapon) return;

  // 允许：正常弹/激光/纯对象 调用；否则视为无效输入
  if (
    !(this instanceof Game_QJBulletMZ) &&
    !(this instanceof Game_QJLaserMZ) &&
    Object.getPrototypeOf(this) !== Object.prototype
  ) {
    return;
  }

  // —— 炸弹魔之魂（被动触发） —— //
  if (actor.hasSkill(34)) {
    let chance = 500 + 300 * actor.skillMasteryLevel(34);
	if (this.data && this.data.effectDecay) chance *= this.data.effectDecay; 
    if (chance > Math.randomInt(10000)) QJ.MPMZ.tl.ex_bombFiendSoul.call(this);
  }

  // =========================
  // 受击特效（无受击禁用时）
  // =========================
    const baseId = (typeof weapon.baseItemId === 'number') ? weapon.baseItemId : weapon.id;

  // =========================
  // 伤害计算
  // =========================
  
  // 命中特效（PC 端显示）
  AudioManager.playSe({ name: "Damage5", volume: 20, pitch: 80 + Math.randomInt(40), pan: 0 });

  let realDamage = weaponDamage;
  if (!realDamage) return;

  // 耐久伤害（破损加成）
  let durabilityDamage = 0;
  if (!attackData.noHitEffect && !attackData.noDurLoss) {
    durabilityDamage = Math.min(realDamage, chahuiUtil.getVarianceDamage(1));
    const w = actor.equips()[0];
    if (w && (w.durability - durabilityDamage <= 0)) {
      let brokenBonus = 2;
      if (actor.hasSkill(48)) brokenBonus += 2 + actor.skillMasteryLevel(48);
      durabilityDamage *= brokenBonus;
      realDamage += durabilityDamage;
    }
  }


  // 读取敌人属性
  let enemyHP   = args.bulletTarget.data.hp || 100;
  const enemyDEF = args.bulletTarget.data.def || 10;
  const enemyMDF = args.bulletTarget.data.mdf || 80;

  // —— 物理 or 魔法 —— //
  if (!attackData.magicAttack && !attackData.independentAttack) {
    realDamage = Math.max(1, Math.min(99999999, realDamage - enemyDEF));
	// 考虑白字伤害
    if (attackData.extraAttack) {
      //SimpleMapDamageQJ.put(0, eventId, realDamage, 0, -92);
    } else {
      //SimpleMapDamageQJ.put(2, eventId, realDamage, 0, -72);
    }
  } else {
    // 魔法
    const reduction = 0.01 * chahuiUtil.magicDefenseDamageReduction(enemyMDF);
    if (!attackData.independentAttack) realDamage -= realDamage * reduction;
    realDamage = Math.floor(Math.max(1, Math.min(realDamage, 99999)));
    //const dx = 15 - Math.randomInt(30);
    //SimpleMapDamageQJ.put(3, eventId, realDamage, dx, -92);
  }

  // 结算 HP
  args.bulletTarget.data.hp -= realDamage;
  }
};

// 对敌人攻击
QJ.MPMZ.tl.ex_toEnemyAttack = function (weaponDamage, attackData = {}, args) {
  // 仅对事件对象生效
  const target = args && args.target;
  if (!(target instanceof Game_Event)) return;

  // 玩家无武器则直接返回
  const actor = $gameParty.leader();
  const weapon = actor && actor.equips()[0];
  if (!weapon) return;

  // 允许：正常弹/激光/纯对象 调用；否则视为无效输入
  if (
    !(this instanceof Game_QJBulletMZ) &&
    !(this instanceof Game_QJLaserMZ) &&
    Object.getPrototypeOf(this) !== Object.prototype
  ) {
    return;
  }

  // 防止敌人自伤
  if (attackData.immuneItself && target._eventId === attackData.immuneItself) return;
  // 弹反子弹  
  if (attackData.counteredBullet) {
	  weaponDamage = this.data.damage;
  }
  
  // —— 炸弹魔之魂（被动触发） —— //
  if (actor.hasSkill(34)) {
    let chance = 500 + 300 * actor.skillMasteryLevel(34);
	if (this.data && this.data.effectDecay) chance *= this.data.effectDecay || 1; 
    if (chance > Math.randomInt(10000)) QJ.MPMZ.tl.ex_bombFiendSoul.call(this);
  }

  // =========================
  // 受击特效（无受击禁用时）
  // =========================
    const baseId = (typeof weapon.baseItemId === 'number') ? weapon.baseItemId : weapon.id;
  if (!attackData.noHitEffect) {
    // 兼容独立装备：优先 baseItemId，否则用 id
    const weaponData = $dataWeapons[baseId] || {};
    const wtype = weaponData.wtypeId || 0;

    // 计算受击表现
    let seName, hitImg, time, posX, posY, effectScale;

    const boxX = () => target.screenBoxXShowQJ();
    const boxY = () => target.screenBoxYShowQJ();

    switch (wtype) {
      case 1: { // 刀剑
        const num = Math.randomInt(3) + 1;
        seName = `Slash${num}`;
        hitImg = 'Slash[4,4,2]';
        time = 31;
        posX = boxX();
        posY = boxY();
        effectScale = 0.8 * actor.pdr;
        break;
      }
      case 2: { // 拳套/棍棒
        let pool = ["ボグッ（殴る音・弱）", "ボグッ（殴る音・中）"];
        // 玩具锤音效
        if (weaponData.id === 40) {
          pool = [
            "ピコピコハンマーで軽く叩いた音",
            "ピコピコハンマーで強めに叩いた音",
            "ピコピコハンマーの音１（少し強め）"
          ];
        }
        seName = pool[Math.floor(Math.random() * pool.length)];
        hitImg = 'Hit[4,4,2]';
        time = 31;
        posX = boxX();
        posY = boxY();
        effectScale = 0.66 * actor.pdr;
        break;
      }
      case 3: { // 弓箭
        seName = '弓矢が刺さる';
        hitImg = 'bulletHit[4,4,2]';
        time = 31;

        if (typeof this.inheritX === 'function' && typeof this.inheritY === 'function') {
          posX = this.inheritX();
          posY = this.inheritY();
        } else {
          posX = 0; posY = 0; // 回退
        }
        const rotDeg = Number.isFinite(this.rotationMove) ? this.rotationMove : 0;
        posX += 24 * Math.sin(rotDeg * Math.PI / 180);
        posY += -24 * Math.cos(rotDeg * Math.PI / 180);
        effectScale = 0.5 * actor.pdr;
        break;
      }
      default: { // 兜底（常见于弓损坏）
        seName = '弓矢が刺さる';
        hitImg = 'bulletHit[4,4,2]';
        time = 31;
        posX = boxX();
        posY = boxY();
        effectScale = 0.5 * actor.pdr;
        break;
      }
    }

    // 被爆菊（覆盖前面的表现）
    if (attackData.sennenGoroshi) {
      seName = 'Damage3';
      hitImg = 'animehit[5,4]';
      time = 19;
      posX = boxX();
      posY = boxY();
      effectScale = 0.6 * actor.pdr;
    }

    // 受击音效
    const randomPitch = Math.randomInt(40) + 81;
    let volumeValue = 50;
    if (weaponData.id === 40) volumeValue = 90; // 修正变量名
    AudioManager.playSe({ name: seName, volume: volumeValue, pitch: randomPitch, pan: 0 });

    // 受击动画
    const angle = Math.randomInt(360);
    QJ.MPMZ.Shoot({
      img: hitImg,
      initialRotation: ['S', angle],
      position: [['S', posX], ['S', posY]],
      scale: effectScale,
      moveType: ['S', 0],
      opacity: 0.8,
      blendMode: 1,
      z: "W",
      existData: [{ t: ['Time', time] }]
    });

    // 穿透计数
    this._pierceCount = (this._pierceCount || 0) + 1;
  }

  // =========================
  // 伤害计算
  // =========================
  // 弹反子弹  
  if (attackData.counteredBullet) {

  }  
  if (!(weaponDamage > 0)) return;

  const eventId = target._eventId;

  // 命中特效（PC 端显示）
  if (!Utils.isMobileDevice()) target.requestAnimation?.(141);
  AudioManager.playSe({ name: "Damage5", volume: 20, pitch: 80 + Math.randomInt(40), pan: 0 });

  // 种族系数
  let realDamage = QJ.MPMZ.tl.getEnemyRaceDamageFactor(weaponDamage, target);
  if (!realDamage) return;

  // 穿透衰减
  if (attackData.attackFallOff) {
    const k = 0.66;
    realDamage = Math.floor(realDamage * Math.pow(k, this._pierceCount || 0));
  }

  // 耐久伤害（破损加成）
  let durabilityDamage = 0;
  if (!attackData.noHitEffect && !attackData.noDurLoss) {
    durabilityDamage = Math.min(realDamage, chahuiUtil.getVarianceDamage(1));
    const w = actor.equips()[0];
    if (w && (w.durability - durabilityDamage <= 0)) {
      let brokenBonus = 2;
      if (actor.hasSkill(48)) brokenBonus += 2 + actor.skillMasteryLevel(48);
      durabilityDamage *= brokenBonus;
      realDamage += durabilityDamage;
    }
  }

  // 潜行加成（暗杀）
  let allowAssassination = false;
  if (attackData.allowAssassination && actor.hasSkill(11) && $gameSwitches.value(145)) {
    allowAssassination = true;
  }
  if (allowAssassination) {
    const canLOS = (window.Galv && Galv.DETECT && Galv.DETECT.los)
      ? Galv.DETECT.los($gamePlayer, target) : false;
    if (!target._shouldAlert && !canLOS) {
      QJ.MPMZ.tl.backstabProficiencyChange(); // 熟练度
      let sneakDamage = Math.min(realDamage, chahuiUtil.getVarianceDamage(1));
      const bonus = Math.round(200 + (2333 - 200) * Math.pow((actor.skillMasteryLevel(11) - 1) / 9, 1.8));
      sneakDamage = Math.round(sneakDamage * ((100 + bonus) / 100)) + actor.paramFlat(2);
	  // 不可视状态伤害翻倍
	  if ($gamePlayer._opacity < 100)  sneakDamage *= 2;
      realDamage += sneakDamage;
      QJ.MPMZ.tl.ex_effectFonts("tongji", eventId);
    }
  }

  // 读取敌人属性
  let enemy = $dataEnemies[$gameSelfVariables.value([$gameMap.mapId(), eventId, 'enemyId'])];
  if (!enemy) enemy = $dataEnemies[3];

  let enemyHP   = $gameSelfVariables.value([$gameMap.mapId(), eventId, 'HP']);
  const enemyMHP = $gameSelfVariables.value([$gameMap.mapId(), eventId, 'MHP']);
  const level   = $gameSelfVariables.value([$gameMap.mapId(), eventId, 'enemyLevel']);
  const enemyDEF = Math.floor(enemy.params[3] * ((100 + level) / 100));
  const enemyMDF = Math.floor(enemy.params[5] * ((100 + level) / 100));

  // 根据敌人血量调整输入伤害
  realDamage = QJ.MPMZ.tl.damageInputPreprocess(realDamage, eventId);

  // —— 物理 or 魔法 —— //
  if (!attackData.magicAttack) {
    realDamage = Math.max(1, Math.min(99999999, realDamage - enemyDEF));
	// 考虑白字伤害
    if (attackData.extraAttack) {
      SimpleMapDamageQJ.put(0, eventId, realDamage, 0, -92);
    } else {
      SimpleMapDamageQJ.put(2, eventId, realDamage, 0, -72);
    }
  } else {
    // 魔法
    const reduction = 0.01 * chahuiUtil.magicDefenseDamageReduction(enemyMDF);
    if (!attackData.independentAttack) realDamage -= realDamage * reduction;
    realDamage = Math.floor(Math.max(1, Math.min(realDamage, 99999)));
    const dx = 15 - Math.randomInt(30);
    SimpleMapDamageQJ.put(3, eventId, realDamage, dx, -92);
  }
    
  // 结算 HP
  $gameSelfVariables.setValue([$gameMap.mapId(), eventId, 'HP'], enemyHP - realDamage);

  // 魔法混合伤害（区分独立攻击不继承法伤）
  if ( !attackData.orbitingDamage && !attackData.independentAttack && attackData.weaponAttack ) {
    const ID = baseId; 
    const inheritedMagic = (!attackData.magicAttack && weapon.traits && weapon.traits[0].dataId === 2);
	let mixDamage = 0;
	// 武器附伤	
    if (inheritedMagic ) {
	   let extra = Math.round(actor.paramKeepMainWeapon(4));	
       mixDamage += extra;
	   durabilityDamage += extra;
	}
	// 装备附伤
    if (inheritedMagic || actor.hasSkill(45)) {
	   let ratio = actor.skillMasteryLevel(45) / 100;
       let extra = Math.round(ratio * chahuiUtil.getVarianceDamage(2));	   
       mixDamage += extra;
	   durabilityDamage += extra;
	}
    if (mixDamage > 0) {	
	  // 计算法抗
      if (!actor.hasSkill(55)) {
        const r = 0.01 * chahuiUtil.magicDefenseDamageReduction(enemyMDF);
        mixDamage -= mixDamage * r;
        mixDamage = Math.floor(Math.max(1, Math.min(mixDamage, 99999)));
      }
      const dx2 = 15 - Math.randomInt(30);
      SimpleMapDamageQJ.put(3, eventId, mixDamage, dx2, -64);
      const cur = $gameSelfVariables.value([$gameMap.mapId(), eventId, 'HP']);
      $gameSelfVariables.setValue([$gameMap.mapId(), eventId, 'HP'], cur - mixDamage);
     }
  }

  // 刷新血条
  target.showHpBar?.();

  // 耐久度消耗(区分间接攻击不消耗武器耐久)
  if (!attackData.noDurLoss && durabilityDamage > 0) {
    if (actor.hasSkill(30)) {
      durabilityDamage *= Math.max(0, (100 - actor.skillMasteryLevel(30)) / 100);
    }
    if (weapon.durability != null) {
      weapon.durability -= Math.floor(durabilityDamage);
      if (weapon.durability <= 0) {
        const list = $gameMap.getGroupBulletListQJ('playerWeaponImg');
        if (list.length > 0) {
          const bulletId = list[0];
          if ($gameMap._mapBulletsQJ[bulletId]) $gameMap._mapBulletsQJ[bulletId]._broken = true;
        }
      }
    }
  }

  // 古树残骸：刷新攻击力
  if (actor.hasSkill(50)) QJ.MPMZ.tl.ex_AncientTreeRemnantEffect();

  // 死亡判定
  enemyHP = $gameSelfVariables.value([$gameMap.mapId(), eventId, 'HP']);
  if (enemyHP <= 0) {
    $gameSelfSwitches.setValue([$gameMap.mapId(), eventId, 'D'], true);
	// 击杀后结算
    QJ.MPMZ.tl.ex_enemyDeathEffectResolution.call(this, target, attackData);
    return;
  }

  // 标记需要警戒
  target._shouldAlert = true;
  // 宝石魔术
  if (attackData.weaponAttack && actor.hasSkill(75)) {
    QJ.MPMZ.tl.ex_gemMagicAttack.call(this,"start",args);
  }
  // 异常状态(区分指定特效和默认继承)
  if (attackData.specifyAddedStatus) {
    QJ.MPMZ.tl.ex_checkAddedStatus.call(this, attackData.addedStatusType, attackData.addedStatusChance, attackData.addedStatusDamage, args);
  } else {
    QJ.MPMZ.tl.ex_checkAddedStatus.call(this, undefined, undefined, undefined, args);
  }
};


// 识别敌人标签决定攻击特效
QJ.MPMZ.tl.getEnemyRaceDamageFactor = function(baseDamage,target,attackData = {}) {

  if (target.drill_COET_hasTag("无敌"))    return 0;

  if (target.drill_COET_hasTag("从者") && $gameParty.leader().hasSkill(71)) {
	    QJ.MPMZ.tl.ex_playerDamageCheck(baseDamage,2);
		return 0;
    }

  if (target.drill_COET_hasTag("树") && $gameParty.leader().hasSkill(46)) {
		baseDamage *= 3;  
	    baseDamage += 45; 
    }

  if (target.drill_COET_hasTag("虫") && $gameParty.leader().hasSkill(82)) {
	    let multiple = 12 + Math.randomInt(12);
		baseDamage  *= multiple;  
    }

  if (target.drill_COET_hasTag("出血标记") && $gameParty.leader().hasSkill(47)) {
		baseDamage = Math.floor(baseDamage * 1.3);  	     
    }

  return baseDamage;
};

// 伤害输入预处理
QJ.MPMZ.tl.damageInputPreprocess = function(baseDamage, eventId, attackData = {}) {
	
    let enemyHP = $gameSelfVariables.value([$gameMap.mapId(), eventId, 'HP']);
    let enemyMHP = $gameSelfVariables.value([$gameMap.mapId(), eventId, 'MHP']);

    // 防止除零错误
    if (!enemyMHP || enemyMHP <= 0) return baseDamage;
    let hpRate = enemyHP / enemyMHP; 
	
	// 顽皮杰克-当前HP越低，伤害越高
    if ($gameParty.leader().hasSkill(37)) {
    let damageMultiplier = 0.15 + (0.15 * $gameParty.leader().skillMasteryLevel(37));
        damageMultiplier = 1 + (1 - hpRate) * damageMultiplier; 
		baseDamage = Math.round(baseDamage * damageMultiplier);
    }
    return baseDamage;
};


// 附加异常状态
QJ.MPMZ.tl.ex_checkAddedStatus = function(specifyAddedStatu = null, addedStatusChance = 0, addedStatusDamage = undefined, args) {
	
    if (args.target && args.target instanceof Game_Event) {	
    let eventId = args.target._eventId;
	// 不能把技能释放者也算进去
	if (this.data && this.data.skillUser) {
	   if (eventId === this.data.skillUser) return;
	}
    // 定义所有异常状态
    let statusList = [
        { id: 5, varId: 120, applyFn: QJ.MPMZ.tl.ex_enemyPoison },   // 中毒
        { id: 6, varId: 122, applyFn: QJ.MPMZ.tl.ex_enemyBleeding }, // 出血
		{ id: 7, varId: 123, applyFn: QJ.MPMZ.tl.ex_enemyparalysis }, // 打雷
        { id: 8, varId: 124, applyFn: QJ.MPMZ.tl.ex_enemyBurn },     // 炎上
        { id: 9, varId: 125, applyFn: QJ.MPMZ.tl.ex_enemyFreeze },   // 冻结
        { id: 10, varId: 126, applyFn: QJ.MPMZ.tl.ex_enemyFullness }, // 饱腹感
		{ id: 11, varId: 127, applyFn: QJ.MPMZ.tl.ex_enemyDizzy } // 眩晕
    ];

    // 指定模式
    if (specifyAddedStatu !== null) {
		if (specifyAddedStatu === 0) return;
        let status = statusList.find(s => s.id === specifyAddedStatu);
        if (!status) return; // 该状态无效，直接返回

        let prob = addedStatusChance; // 使用自定义概率
		// 自定义修正
		if (this.data && this.data.effectDecay) prob *= this.data.effectDecay;
		// 计算目标抗性
        prob *= QJ.MPMZ.tl.ex_getEnemyStateEffectiveness(eventId, specifyAddedStatu);
        if (prob > Math.randomInt(10000)) {
            status.applyFn.call(args.target,addedStatusDamage);
        }
        return;
    }

	// 生锈的铁剑-破伤风
	if ($gameParty.leader().hasSkill(74)) {
		if ($gameMap.getGroupBulletListQJ(`enemyBleeding${eventId}`).length > 0) {
			statusList[0].extra = 15000;
		}
	}

    // 默认模式（遍历所有异常状态）
    for (let status of statusList) {
        let prob = $gameVariables.value(status.varId) * 100;
        if (prob <= 0) continue; // 需要放大100倍提升判断精度
        if (status.extra) prob += status.extra;   // 修正值
        if ($gameSwitches.value(181)) prob /= 3; // 旋风斩修正
		// 自定义修正
		if (this.data && this.data.effectDecay) prob *= this.data.effectDecay || 1;
        if (this.data && this.data.subBullet === true) prob /= 3; // 副弹幕修正
        prob *= QJ.MPMZ.tl.ex_getEnemyStateEffectiveness(eventId, status.id);
        if (prob > Math.randomInt(10000)) {
            status.applyFn.call(args.target);
        }
    }
  }	
};



//敌人死亡时效果结算
QJ.MPMZ.tl.ex_enemyDeathEffectResolution = function(enemy, attackData = {}) {

   if (!enemy) return;
   if (!attackData.weaponAttack) return;
   
   if ( enemy.drill_COET_hasTag("魔物") ) {
	   
	    // 击杀回复
		if ($gameParty.leader().hasSkill(49)) {
		let heal = Math.floor(1.2 * $gameParty.leader().paramPlus(2));
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
		
		// 古树残骸-武器自动修复
		if ($gameParty.leader().hasSkill(50)) {
            QJ.MPMZ.tl.ex_AncientTreeRemnantEffect(enemy);
		}
		
		// 血狩血箭回收
		if ($gameParty.leader().hasSkill(53)) {
			
			if ($gameParty.leader().equips()[0].wtypeId !== 3) {
				// 近战武器需要出血状态来触发
				if (!enemy.drill_COET_hasTag('出血标记')) return;
			}
			
			AudioManager.playSe({ name: "Ice5", volume: 60, pitch: 120, pan: 0 });
			let posX = enemy.screenBoxXShowQJ();
			let posY = enemy.screenBoxYShowQJ();
			let MHP = $gameSelfVariables.value([$gameMap.mapId(), enemy._eventId, 'MHP']);
			let heal = Math.round(MHP * 0.3);
			let count = 1;
			    count += Math.floor(heal / 10);
			for (let i = 0; i < count; i++) {
            QJ.MPMZ.Shoot({
               img:'null1',
               afterImage:['#ff0000','0|1~16/0',16,2],
               moveType:['TP',6,10,10],
               position:[['S',posX],['S',posY]],
               initialRotation:['S',Math.randomInt(360)],
               existData:[
                 {t:['Time',300],d:[1,10,1.5]},
                 {t:['P'],a:['S',
				 `$gameParty.leader().gainHp(10);
				  AudioManager.playSe({ name: "Heal3", volume: 50, pitch: 150, pan: 0 });
				   QJ.MPMZ.Shoot({
				      img:"Bleeding[6,10,1]",
				      position:[['P'],['P']],
				      initialRotation:['S',0],
				      imgRotation:['F'],
				      blendMode:1,
				      scale:0.4,
				      moveType:['D',true],
				      existData:[ 
				          {t:['Time',30],d:[0,10]}
				       ],
				   });
				 `
				 ],d:[1,10,1.5]}
               ],
            });
		  }
		}		
    }  

};

// 自定义位置击退目标
QJ.MPMZ.tl.customPositionKnockbackTarget = function(distance,args) {

    if (!distance) distance = 2;
	
	let posX = this.inheritX(); 
    let posY = this.inheritY();
	let tarX = 0;
	let tarY = 0;
    let angle = 0;
	if (!args.target) return;	
	tarX = args.target.screenShootXQJ();
	tarY = args.target.screenShootYQJ();
	
	angle = QJ.calculateAngleByTwoPointAngle(posX, posY, tarX, tarY);	

    if ( args.target instanceof Game_Event ) {
	  QJ.MPMZ.tl.ex_jumpWithAngle(args.target._eventId,angle,distance);
	  return;
	}
	
	if ( args.target instanceof Game_Player ) {	
	  QJ.MPMZ.tl.ex_jumpWithAngle(-1,angle,distance);
	  return;
	}
	
};

// 卡墙的碰撞伤害
QJ.MPMZ.tl.customEnemyDamageCalculation = function(damage,target,args) {

	if (args && args.target && args.target instanceof Game_Event) {
	 var target = args.target;
	}
	if (!target) return;	
	if ($gameMessage.isBusy()) return;	
	if (!Utils.isMobileDevice()) target.requestAnimation(141);
	let EID = target._eventId;
	let enemyHP = $gameSelfVariables.value([$gameMap.mapId(), EID, 'HP']);
	let realDamage = damage;
	$gameSelfVariables.setValue([$gameMap.mapId(), EID, 'HP'], enemyHP - realDamage);
    SimpleMapDamageQJ.put(2,EID,realDamage,0,-72);

     var seNames = "Damage3" ;
     var randomPitch = Math.randomInt(60) + 70;
     var se = { name: seNames, volume: 40, pitch: randomPitch, pan: 0 };
     AudioManager.playSe(se);	

    let posX = target.screenBoxXShowQJ();
    let posY = target.screenBoxYShowQJ();
    QJ.MPMZ.Shoot({
        img:"animehit[5,4]",
        position:[['S',posX],['S',posY]],
        initialRotation:['S',0],
        imgRotation:['F'],
        collisionBox:['C',1],
        moveType:['S',0],
        existData:[	
		  {t:['Time',19]},
        ],
    });
	
	target.showHpBar();
	enemyHP = $gameSelfVariables.value([$gameMap.mapId(), EID, 'HP']);
	   if (enemyHP <= 0) {
		 $gameSelfSwitches.setValue([$gameMap.mapId(), EID, 'D'], true);
	 }
};


//=============================================================================
//敌用模板
//=============================================================================

// 精英化触发逻辑
QJ.MPMZ.tl.ex_enemyEliteUpgrade = function(index) {
	
    if (!this) return;
    const target = $gameMap.event(this._eventId);
    if (!target) return;

    // 读取击杀数
    const k        = Math.min(200, $gameSelfVariables.value([1, index, 'KillCount']));
    const k0       = 30;   // 开始生效的击杀数
    const kMax     = 300;  // 达到最大概率时的击杀数
    const minRate  = 0.01; // 最低转化率
    const maxRate  = 0.33; // 最高转化率

    // 线性插值计算当前转化率
    let pElite = 0;
    if (k > k0) {
        const t = Math.min((k - k0) / (kMax - k0), 1);  // 归一化到 [0,1]
        pElite = minRate + t * (maxRate - minRate);
    }

    // 随机决定是否精英化
    if (Math.random() >= pElite) {
        return;
    }

    // 精英化特征
    const filters = [
        'red',
        'yellow',
        'green',
        'cyan',
        'blue',
        'purple',
        'white'
    ];
    const type = filters[Math.floor(Math.random() * filters.length)];

    // 应用滤镜效果
	if (typeof target.setAuraSticky === 'function') {
       target.setAuraSticky(type);
	}

    // 设置敌人强度
    const level = Math.randomInt(k) + 20;
    $gameSelfVariables.set(this, 'enemyLevel', level);
};

//生成敌人掉落物
QJ.MPMZ.tl.ex_enemyGenerateDrop = function(extraData = {}) { 

    if (!this) return;
	let eid = undefined;
	// 万宝槌效果
	if (extraData.magicalMallet) {
	    eid = 174;
	}
	// 正常掉落
	let target = $gameMap.event(this._eventId);
	if (!target) return;
	
	if (target.drill_COET_hasTag("从者")) return;
	
    let times = Math.max(1,$gameSelfVariables.get(this, 'lootNumber'));
	// 精英化额外奖励	
	if ( $gameSelfVariables.get(this, 'enemyLevel') > 20 ) {
		times += 1;
	}
	
    for (let i = 0; i < times; i++) {
    dingk.Loot.generateEnemyDrops(target);
	    if (!!eid) {
			dingk.Loot.generateEnemyDrops(target, eid);
		}
    }
	// 幸运兔耳
    let extraTimes = $gameParty.leader().skillMasteryLevel(80);
    if (extraTimes > 0) {
    for (let i = 0; i < extraTimes; i++) {
        if (Math.random() < 0.33) { 
            dingk.Loot.generateEnemyDrops(target);
			if (!!eid) {
			   dingk.Loot.generateEnemyDrops(target, eid);
		    }
        }
	  }
	}	
};

//敌人异常状态检查
QJ.MPMZ.tl.ex_enemyConditionCheck = function(EID) { 
  if(!$gameMap.event(EID)) return;
	let posX = $gameMap.event(EID).screenShootXQJ();
    let posY = $gameMap.event(EID).screenShootYQJ();  
	let code = "!$gameMap.event(" + EID + ")";
    QJ.MPMZ.Shoot({
        img:"null1",
        position:[['E',posX],['E',posY]],
        initialRotation:['S',0],
        imgRotation:['F'],
        collisionBox:['C',1],
        moveType:['B',EID],
        existData:[	
		{t:['S',code,true]},
        ],
		moveF:[
		[60,60,QJ.MPMZ.tl.ex_enemyStuckCheck,[EID]]
		],
    });
}

//敌人卡墙检查
QJ.MPMZ.tl.ex_enemyStuckCheck = function(EID) {  
    if(!$gameMap.event(EID)) return;
	
	let enemyIsdead = $gameSelfSwitches.value([$gameMap.mapId(), EID, 'D']) || $gameSelfSwitches.value([$gameMap.mapId(), EID, 'F']);
    //溺水检查
	if ($gameMap.event(EID).dotRegionId() === 8 && !enemyIsdead) {
		$gameMap.event(EID)._alertTimer = 0; 
        $gameMap.event(EID)._enemyState = 1;
        $gameMap.event(EID)._moveSpeed = 0
		$gameSelfSwitches.setValue([$gameMap.mapId(), EID, 'F'], true);
		$gameSelfSwitches.setValue([$gameMap.mapId(), EID, 'D'], true);
		$gameMap.steupCEQJ(205,EID,{deadType:2});
		return;
	  }

var enemyX = Math.floor($gameMap.event(EID).centerRealX());
var enemyY = Math.floor($gameMap.event(EID).centerRealY());
var canThrough = $gameMap.event(EID)._through;
var canMoveUp = $gamePlayer.canPass(enemyX, enemyY, 8);    // 上
var canMoveDown = $gamePlayer.canPass(enemyX, enemyY, 2);  // 下
var canMoveLeft = $gamePlayer.canPass(enemyX, enemyY, 4);  // 左
var canMoveRight = $gamePlayer.canPass(enemyX, enemyY, 6); // 右

// 如果四个方向都不可通行，则玩家处于一个无法移动的位置
if (!enemyIsdead && !canThrough && !canMoveUp && !canMoveDown && !canMoveLeft && !canMoveRight) {
   // 卡墙的碰撞伤害
	QJ.MPMZ.tl.ex_enemyStuckCollisionDamage(EID);
    var XX = $gameMap.event(EID).centerRealX();  
	var YY = $gameMap.event(EID).centerRealY();
    var condition = DrillUp.g_COFA_condition_list[ 10 ];
    var c_area = $gameMap.drill_COFA_getShapePointsWithCondition( XX,YY,"圆形区域",5, condition );
	   
    if(c_area.length > 0) {
       var p = c_area[ Math.floor( Math.random()*c_area.length ) ];
       var xPlus = p.x - XX;  var yPlus = p.y - YY;	
       $gameMap.event(EID).jumpEx(xPlus, yPlus, 18);
      } else {
	   $gameMap.event(EID).jumpEx(0, 0, 18);  
	  }
   }

};

// 卡墙的碰撞伤害
QJ.MPMZ.tl.ex_enemyStuckCollisionDamage = function(EID) {
    if(!$gameMap.event(EID)) return;	
	
	if (!Utils.isMobileDevice()) $gameMap.event(EID).requestAnimation(141);
	let enemyHP = $gameSelfVariables.value([$gameMap.mapId(), EID, 'HP']);
	let realDamage = 100;
	$gameSelfVariables.setValue([$gameMap.mapId(), EID, 'HP'], enemyHP - realDamage);
    SimpleMapDamageQJ.put(2,EID,realDamage,0,-72);

     var seNames = "Damage5" ;
     var randomPitch = Math.randomInt(60) + 70;
     var se = { name: seNames, volume: 80, pitch: randomPitch, pan: 0 };
     AudioManager.playSe(se);	
	
    QJ.MPMZ.Shoot({
        img:"animehit[5,4]",
        position:[['E',EID],['E',EID]],
        initialRotation:['S',0],
        imgRotation:['F'],
        collisionBox:['C',1],
        moveType:['S',0],
        existData:[	
		  {t:['Time',19]},
        ],
    });
	
	$gameMap.event(EID).showHpBar();
	enemyHP = $gameSelfVariables.value([$gameMap.mapId(), EID, 'HP']);
	   if (enemyHP <= 0) {
		 $gameSelfSwitches.setValue([$gameMap.mapId(), EID, 'D'], true);
	 }
};

// 敌人的坠落死亡判定
QJ.MPMZ.tl.ex_enemyFallHole = function(EID) {
	if(!$gameMap.event(EID)) return;
	let enemyIsdead = $gameSelfSwitches.value([$gameMap.mapId(), EID, 'D']) || $gameSelfSwitches.value([$gameMap.mapId(), EID, 'F']);
	let enemyIsFall = $gameMap.event(EID).dotRegionId() === 250 && !$gameMap.event(EID)._through && !$gameMap.event(EID).isJumping();
	  if (!enemyIsdead && enemyIsFall) {
		  $gameSelfSwitches.setValue([$gameMap.mapId(), EID, 'F'], true);
		  $gameSelfSwitches.setValue([$gameMap.mapId(), EID, 'D'], true);
		  $gameMap.steupCEQJ(205,EID,{deadType:1});
		  return true;
	  }
	      return false;
}

//检查敌人对应状态的有效度
QJ.MPMZ.tl.ex_getEnemyStateEffectiveness = function(EID,stateId) {
   if(!$gameMap.event(EID)) return 1;
   let enemyId = $gameSelfVariables.value([$gameMap.mapId(), EID, 'enemyId']);
   let enemy = $dataEnemies[enemyId];  
   if(!enemy) return 1;
   var stateRate = 1;  
    enemy.traits.forEach(function(trait) {
        if (trait.code === 13 && trait.dataId === stateId) {
            stateRate = trait.value;  
        }
    });
	return stateRate;
};

//敌人掉落物动画
QJ.MPMZ.tl.ex_pickupDropsAnimation = function(item) {
	if (!item) return;
	let colourCode,name,data;
	if (this instanceof Game_QJBulletMZ || this instanceof Game_QJLaserMZ) {
		name     = 'orb_cp' + this.index;
   		let posX = (this.x - 24) / 48;
   		let posY = (this.y - 24) / 48;
	    data = $gameScreen._particle.particleSet(0, name, 'tilemap', 'orb_cp', 'above', posX, posY);
	} else {
		name = 'orb_cp' + this._eventId;
		data = $gameScreen._particle.particleSet(0,name,'this','orb_cp');	
	}
    if (!data) return;	
	
	$gameScreen._particle.particleUpdate([name,'pos','0','-5']);
	$gameScreen._particle.particleUpdate([name,'alpha','0.7']);
    let colourMatch = item.note.match(/<颜色:([^>]+)>/i);
	colourCode = colourMatch ? colourMatch[1] : 0;

    switch (colourCode) {
		case '13': 
		  $gameScreen._particle.particleUpdate([name,'color','#FFB90F']);
			break;
		case '14': 
		  $gameScreen._particle.particleUpdate([name,'color','#FF00FF']);
			break;
		case '15': 
		  $gameScreen._particle.particleUpdate([name,'color','#B36BFF']);
			break;
		case '16': 
		  $gameScreen._particle.particleUpdate([name,'color','#63B8FF']);
			break;
    }		
    data.clear = true;	  
};

// 杰克爆弹倒计时
QJ.MPMZ.tl.ex_jackBombCountdown = function(time) {
    if (!this) return;

    let eid = this._eventId;
    let posX = `$gameMap.event(${eid}) ? $gameMap.event(${eid}).screenShootXQJ() : $gameMap.displayX()`;
    let posY = `$gameMap.event(${eid}) ? $gameMap.event(${eid}).screenShootYQJ() - 24 : $gameMap.displayY()`;
    let deadCode = `$gameSelfSwitches.value([$gameMap.mapId(), ${eid}, 'D'])`;

    if (!time) time = 180;

    QJ.MPMZ.Shoot({
        img: [
            'T',
            {
                text: '3',
                arrangementMode: 0,
                textColor: "#ffffff",
                fontSize: 14,
                outlineColor: "#000000",
                outlineWidth: 0,
                fontFace: null,
                fontItalic: false,
                fontBold: true,
                width: 300,
                height: 100,
                textAlign: 5,
                lineWidth: 0,
                lineColor: "#ffffff",
                lineRate: 1.0,
                backgroundColor: null,
                backgroundOpacity: 1,
                shadowBlur: 0,
                shadowColor: "#270000",
                shadowOffsetX: 0,
                shadowOffsetY: 0
            }
        ],
        position: [['S', posX], ['S', posY]],
        extra: eid,
        initialRotation: ['S', 0],
        imgRotation: ['F'],
        moveType: ['D', true],
        collisionBox: ['C', 12],
		opacity: 1,
        anchor: [0.5, 0.5],
        existData: [
            { t: ['S', deadCode, true] },
            { t: ['Time', time], a: ['F', QJ.MPMZ.tl.ex_changeEventSelfSwitch, [eid, 'D']] }
        ],
        moveF: [
            [10, 10, QJ.MPMZ.tl.ex_jackBombCountdownChange,[time]]
        ]
    });
};

QJ.MPMZ.tl.ex_jackBombCountdownChange = function(time) {
	if (!time) time = 180;
    let timeLeft = time - this.time;
    let result = (timeLeft / 60).toFixed(1).toString();
    let durRate = 100 * (timeLeft / this.time);
        // 根据 durRate 判断颜色
        let durColour, shadowColour;
        if (durRate > 70) {
            durColour = "#ffffff";
            shadowColour = "#000000";
        } else if (durRate > 50) {
            durColour = "#ffcfd7";
            shadowColour = "#bc8992";
        } else if (durRate > 20) {
            durColour = "#ff738a";
            shadowColour = "#b85364";
        } else {
            durColour = "#b9001f";
            shadowColour = "#b91e38";
        }

    let bulletText = {
        text: result,
        arrangementMode: 0,
        textColor: durColour,
        fontSize: 14,
        outlineColor: "#000000",
        outlineWidth: 0,
        fontFace: null,
        fontItalic: false,
        fontBold: true,
        width: 300,
        height: 100,
        textAlign: 5,
        lineWidth: 0,
        lineColor: "#ffffff",
        lineRate: 1.0,
        backgroundColor: null,
        backgroundOpacity: 1,
        shadowBlur: 8,
        shadowColor: shadowColour,
        shadowOffsetX: 0,
        shadowOffsetY: 0
    };
    this.changeAttribute("img", ["T", bulletText]);
};


// 敌人受击自动反应 
QJ.MPMZ.tl.ex_enemyAutomaticHitReaction = function (eid) {
	
  const posX = `$gameMap.event(${eid}) ? $gameMap.event(${eid}).screenBoxXShowQJ() : $gameMap.displayX()`;
  const posY = `$gameMap.event(${eid}) ? $gameMap.event(${eid}).screenBoxYShowQJ() : $gameMap.displayY()`;
  const deadCode = `!$gameMap.event(${eid})`;

  QJ.MPMZ.Shoot({
    position: [
      ['S', posX],
      ['S', posY]
    ],
    groupName: [`enemyReaction${eid}`],
    extra: eid,
    initialRotation: ['S', 0],
    imgRotation: ['F'],
    moveType: ['D', true],
    collisionBox: ['C', 12],
    anchor: [0.5, 0.5],
    existData: [
      { t: ['S', deadCode, true] },
      {
        t: ['B', ['playerSkill', 'playerBullet']],
        a: ['F', QJ.MPMZ.tl.ex_changeEventSelfSwitch, [eid, 'B']],
        p: [-1, false, true]
      }
    ]
  });
};


// 自动打开独立开关
QJ.MPMZ.tl.ex_changeEventSelfSwitch = function(eventId,switchId) {
	if (!switchId) switchId = 'B';
    if ($gameMap.event(eventId)) {
	var key = [$gameMap.mapId(), eventId, switchId];
	$gameSelfSwitches.setValue(key,true);
    }
};

// 敌人毒接触伤害 
QJ.MPMZ.tl.ex_enemyContactDamage = function(eid) {
	
    let deadCode = '!$gameMap.event('+ eid + ')';
    const posX = `$gameMap.event(${eid}) ? $gameMap.event(${eid}).screenBoxXShowQJ() : $gameMap.displayX()`;
    const posY = `$gameMap.event(${eid}) ? $gameMap.event(${eid}).screenBoxYShowQJ() : $gameMap.displayY()`;
	
	QJ.MPMZ.Shoot({
		groupName: ['contactDamage'],
		img: 'null1',
		collisionBox:['C',20],
		position:[['S',posX],['S',posY]],
		initialRotation: ['S',0],
		moveType:['D',true],
		existData: [
	        {t:['S',deadCode,true]},
	        {t:['P'],a:['F',QJ.MPMZ.tl.ex_playerDamageCheck,[2,1,5,5]],c:['T',0,30,true],p:[-1,false,true]},
	    ],       
	});
};
//=============================================================================
//异常状态
//=============================================================================

/* 出血 ------------------------------------------------------------------ */
QJ.MPMZ.tl.ex_enemyBleeding = function (damage, time) {
	
    if (!this || !(this instanceof Game_Event)) return;
    if (this.drill_COET_hasTag("免疫异常") || this.drill_COET_hasTag("免疫出血")) return;

    this.drill_COET_addTag("出血标记");
    const target = this._eventId;
	const stateName = `enemyBleeding${target}`;
    damage = damage ?? chahuiUtil.checkWeaponQuality("出血");
    time   = time   ?? 320 + Math.randomInt(160);

    // ---------------------------------------------------------------------
    // 重复叠加状态
    // ---------------------------------------------------------------------
    const groupList = $gameMap.getGroupBulletListQJ(stateName);
    if (groupList.length > 0) {
        const BID    = groupList[0];
        const bullet = $gameMap._mapBulletsQJ[BID];
        if (!bullet) return;

        bullet._extraDamage = (bullet._extraDamage || 0) + Math.max(1, Math.floor(damage / 2));
        const extraTime = Math.floor(time / 2);

        // 找到持续时间记录并累加
        for (const element of bullet.data.existData) {
            if (Array.isArray(element.t) && element.t[0] === "Time") {
                element.t[1] += extraTime;
                break;
            }
        }
        return;
    }

    const removeTagCode = `$gameMap.event(${target})?.drill_COET_removeTag('出血标记')`;
    const deadCode      = `!$gameMap.event(${target})`;
    const posX          = `$gameMap.event(${target})?.screenBoxXShowQJ()||0`;
    const posY          = `$gameMap.event(${target})?.screenBoxYShowQJ()||0`;

    // 尝试优化移动端掉帧问题
    const isAndroidBuild = Utils.isMobileDevice && Utils.isMobileDevice();
    const IMG_NAME   = isAndroidBuild ? "null1" : "Bleeding[6,10,1]";
    const BLEND_MODE = isAndroidBuild ? 0       : 1;

    QJ.MPMZ.Shoot({
        groupName:       ["enemyBleeding", "bleeding", stateName],
        img:             IMG_NAME,
        position:        [["S", posX], ["S", posY]],
        initialRotation: ["S", 0],
        imgRotation:     ["F"],
        blendMode:       BLEND_MODE,
        scale:           0.4,
        moveType:        ["D", true],
        collisionBox:    ["C", 1],
        existData: [
            { t: ["S", deadCode, true], d: [0, 30] },
            { t: ["Time", time],        d: [0, 30], a: ["S", removeTagCode] },
        ],
		moveF: [
		    [60,60,QJ.MPMZ.tl.ex_enemyBleedingEffects, [damage, target]]
		]
    });

    QJ.MPMZ.tl.ex_effectFonts("xueyan", target);
};



QJ.MPMZ.tl.ex_enemyBleedingEffects = function(damage,eventId) {
	
	     let target = $gameMap.event(eventId);
	     if (!target)  return;	
		 if (!Utils.isMobileDevice())  target.requestAnimation(186);		 
         let randomPitch = Math.randomInt(30) + 91;
         AudioManager.playSe({ name: "血がたれる1", volume: 90, pitch: randomPitch, pan: 0 });	
		 
		 let currentHp = $gameSelfVariables.value([$gameMap.mapId(), eventId, 'HP']);			 
	     //伤害结算
		 if (this._extraDamage) {
		 damage += this._extraDamage;
	     }		 
		 SimpleMapDamageQJ.put(3,eventId,damage,0,-72);
	     $gameSelfVariables.setValue([$gameMap.mapId(), eventId, 'HP'], currentHp - damage);
		 currentHp = $gameSelfVariables.value([$gameMap.mapId(), eventId, 'HP']);	
		 if (currentHp <= 0){
			 $gameSelfSwitches.setValue([$gameMap.mapId(), eventId, 'D'], true);
		 }	
};


// =========================================================================
// 中毒
// =========================================================================
QJ.MPMZ.tl.ex_enemyPoison = function (damage, time, args) {

    if (!this || !(this instanceof Game_Event)) return;
    if (this.drill_COET_hasTag("免疫异常")) return;

    damage = damage ?? chahuiUtil.checkWeaponQuality("毒伤");
    time   = time   ?? 480 + Math.randomInt(240);

    const target    = this._eventId;
    const stateName = `enemyPoison${target}`;

    // ---------------------------------------------------------------------
    // 重复叠加状态
    // ---------------------------------------------------------------------
    const groupList = $gameMap.getGroupBulletListQJ(stateName);
    if (groupList.length > 0) {
        const BID    = groupList[0];
        const bullet = $gameMap._mapBulletsQJ[BID];
        if (!bullet) return;

        bullet._extraDamage = (bullet._extraDamage || 0) + Math.max(1, Math.floor(damage / 4));
        const extraTime = Math.floor(time / 4);

        // 找到持续时间记录并累加
        for (const element of bullet.data.existData) {
            if (Array.isArray(element.t) && element.t[0] === "Time") {
                element.t[1] += extraTime;
                break;
            }
        }
        return;
    }

    // ---------------------------------------------------------------------
    // 首次附加状态
    // ---------------------------------------------------------------------
    const deadCode = `!$gameMap.event(${target})`;
    const posX     = `$gameMap.event(${target})?.screenBoxXShowQJ() || 0`;
    const posY     = `$gameMap.event(${target})?.screenBoxYShowQJ() || 0`;

    QJ.MPMZ.Shoot({
        groupName:       ["enemyPoison", "poison", stateName],
        img:             "poison[6,10,1]",
        position:        [["S", posX], ["S", posY]],
        initialRotation: ["S", 0],
        imgRotation:     ["F"],
        blendMode:       1,
        scale:           [0.4, 0.4],
        moveType:        ["D", true],
        collisionBox:    ["C", 1],
        existData: [
            { t: ["S", deadCode, true],                               d: [0, 30] },
            { t: ["Time", time],                                      d: [0, 30] }
        ],
        moveF: [
            [60, 60, QJ.MPMZ.tl.ex_enemyPoisonEffect, [damage, target]]
        ],
    });

    // 飘字
    QJ.MPMZ.tl.ex_effectFonts("zhongdu", target);
};

QJ.MPMZ.tl.ex_enemyPoisonEffect = function(damage,eventId) {
	
	     let event = $gameMap.event(eventId);
	     if (!event) return;
		 if (!Utils.isMobileDevice())  event.requestAnimation(187);	
         let randomPitch = Math.randomInt(30) + 91;
         AudioManager.playSe({ name: "Poison", volume: 40, pitch: randomPitch, pan: 0 });		 
		 
		 let currentHp = $gameSelfVariables.value([$gameMap.mapId(), eventId, 'HP']);			 
	     //伤害结算
		 if (this._extraDamage) {
		 damage += this._extraDamage;
	     }
	     damage *= 1 + (this.time / 600);
		 damage = Math.max(1,Math.floor(damage));
		 SimpleMapDamageQJ.put(3,eventId,damage,0,-72);
	     $gameSelfVariables.setValue([$gameMap.mapId(), eventId, 'HP'], currentHp - damage);
		 currentHp = $gameSelfVariables.value([$gameMap.mapId(), eventId, 'HP']);	
		 if (currentHp <= 0){
			 $gameSelfSwitches.setValue([$gameMap.mapId(), eventId, 'D'], true);
		 }	
};

//冻结
QJ.MPMZ.tl.ex_enemyFreeze = function(time,args) {

         if (!this || !(this instanceof Game_Event)) return;			
		 if (this.drill_COET_hasTag("免疫异常")) return;
		 
	//冻结音效
     var se = { name: "凍りつく時の効果音「キーーーン」", volume: 35, pitch: 100, pan: 0 };
     AudioManager.playSe(se);		

        if (!time) {
         var time = 180 + Math.randomInt(180);
          }
		  
         var ratio = Math.random() * 3;
         var weaponDamage = Math.round(chahuiUtil.getVarianceDamage(1) * (1 + ratio));

         var deadCode = '!$gameMap.event('+ this._eventId + ')';	 
         var stateName = 'enemyFreeze' + this._eventId;
		 
       if($gameMap.getGroupBulletListQJ(stateName).length > 0) {
		   if (Math.random() > 0.5) return;
		   
          let index = $gameMap.getGroupBulletListQJ(stateName)[0];
		  let bullet = $gameMap.bulletQJ(index);
          let Iscale = 1;
			 
			 if (this._boxBodyQJ.type === 0) {
				 Iscale = this._boxBodyQJ.r / 30;
			 }			 
			 
			 if (this._boxBodyQJ.type === 1) {
				 Iscale = (this._boxBodyQJ.w + this._boxBodyQJ.h) / 96;
			 }		 

		     if(this.drill_COET_hasTag("BOSS")) {
			   time = Math.floor(time / 20); 
		      } else {
		       time = Math.floor(time / 10);
		     }
		 for (var i = 0; i < bullet.data.existData.length; i++) {
		     var element = bullet.data.existData[i];
		     if (element.t && Array.isArray(element.t) && element.t[0] === "Time") {
		         element.t[1] += time;  
		         break;  
		     }
		 }		  
		 this._IsDisabledCounter += time;
		 
		 let target   = this._eventId;
         let posX     = `$gameMap.event(${target})?.screenBoxXShowQJ() || 0`;
         let posY     = `$gameMap.event(${target})?.screenBoxYShowQJ() || 0`;	
         let sName	  = "enemyFreeze" + target;	 
         QJ.MPMZ.Shoot({
             groupName:['enemyFreeze','freeze',sName],
             img:"Ice[8,6]",
             position:[['S',posX],['S',posY]],
             initialRotation:['S',0],
             imgRotation:['F'],
             blendMode:3,
			 opacity:0.4,
             scale:Iscale,
             anchor:[0.45,0.65],
             moveType:['D',true],
             collisionBox:['C',1],
             existData:[ 
                  {t:['BE',index]}
               ],
         });			 
			 
		 } else {
		 this._IsDisabledCounter += time;;
         let Iscale = 1;
			 
			 if (this._boxBodyQJ.type === 0) {
				 Iscale = this._boxBodyQJ.r / 30;
			 }			 
			 
			 if (this._boxBodyQJ.type === 1) {
				 Iscale = (this._boxBodyQJ.w + this._boxBodyQJ.h) / 96;
			 }
		 
		     /*
             if (this._boxBodyQJ.type === 1) {
            length = this._boxBodyQJ.w;
              } else {
            length = this._boxBodyQJ.r * 2;
              }
            */

		 let target = this._eventId;
         let posX     = `$gameMap.event(${target})?.screenBoxXShowQJ() || 0`;
         let posY     = `$gameMap.event(${target})?.screenBoxYShowQJ() || 0`;	

         QJ.MPMZ.Shoot({
             groupName:['enemyFreeze','freeze',stateName],
             img:"Ice[8,6]",
             position:[['S',posX],['S',posY]],
             initialRotation:['S',0],
             imgRotation:['F'],
             blendMode:1,
			 opacity:0.8,
             scale:Iscale,
             anchor:[0.45,0.65],
             moveType:['D',true],
             collisionBox:['R',115,165],
             existData:[ 
                  {t:['S',deadCode,true],d:[0,30]},
                  {t:['Time',time],a:['F',QJ.MPMZ.tl.ex_FreezeBreak,[this]]},
                  {t:['B',['playerBullet','playerSkill']],a:['F',QJ.MPMZ.tl.ex_FreezeBreak,[this,weaponDamage]],c:['S','this.time > 30 && Math.random() > 0.8']},
                  { t: ['B', ['paralysis']], a: [], p: [-1, false, true, QJ.MPMZ.tl.ex_iceElectricReaction] },
               ],
         });
	  }		 
         //效果字演出
         QJ.MPMZ.tl.ex_effectFonts("bingjie",this._eventId);
};

QJ.MPMZ.tl.ex_FreezeBreak = function(target,damage,args) {
     //结算剩余时间
	  let totalTime;
      for (var i = 0; i < this.data.existData.length; i++) {
      var element = this.data.existData[i];
      if (element.t && Array.isArray(element.t) && element.t[0] === "Time") {
         totalTime = element.t[1];  
         break;  
          }
      }	
	if (this.time < totalTime) {
	 let remaining = totalTime - this.time;
	 target._IsDisabledCounter -= remaining;
	}
	//破冰音效
     var se = { name: "氷系魔法を発動した効果音", volume: 65, pitch: 100, pan: 0 };
     AudioManager.playSe(se);	

    let posX = this.inheritX();
    let posY = this.inheritY();
	var magicScale = this.scaleX;
	
    QJ.MPMZ.Shoot({
        img:'IceBreak[8,4]',
        position:[['S',posX],['S',posY]],
        initialRotation:['S',0],
        scale:magicScale,
        moveType:['S',0],
        imgRotation:['F'],
        anchor:[0.5,0.5],
		opacity:0.8,
		blendMode:1,
        existData:[	
		{t:['Time',31]},
        ],
        collisionBox:['C',1],
    });
	//破冰伤害
	if(typeof damage === 'number') {
		 let eventId = target._eventId;	
		 let currentHp = $gameSelfVariables.value([$gameMap.mapId(), eventId, 'HP']);	
		 SimpleMapDamageQJ.put(4,eventId,damage,0,-96);
	     //伤害结算
	     $gameSelfVariables.setValue([$gameMap.mapId(), eventId, 'HP'], currentHp - damage);
		 currentHp = $gameSelfVariables.value([$gameMap.mapId(), eventId, 'HP']);	
		 if (currentHp <= 0){
			 $gameSelfSwitches.setValue([$gameMap.mapId(), eventId, 'D'], true);
		 }
	}		 
};

// 炎上
QJ.MPMZ.tl.ex_enemyBurn = function(damage, time, args) {
    if (!this || !(this instanceof Game_Event)) return;
    if (this.drill_COET_hasTag("免疫异常")) return;

    var target = this._eventId;

    // 计算伤害值
    if (!damage) {
        damage = chahuiUtil.checkWeaponQuality("炎上");
    }

    // 计算燃烧时间
    if (!time) {
        time = 240 + Math.randomInt(120);
    }

    let stateName = 'enemyBurn' + target;

    let posX      = `$gameMap.event(${target})?.screenBoxXShowQJ()||0`;
    let posY      = `$gameMap.event(${target})?.screenBoxYShowQJ()||0`;

		  let length;
             if (this._boxBodyQJ.type === 1) {
            length = Math.floor((this._boxBodyQJ.w + this._boxBodyQJ.h) / 2);
              } else {
            length = this._boxBodyQJ.r * 2;
              }		 
		  let Iscale = length / 60;

    QJ.MPMZ.Shoot({
        groupName: ['fire','enemyBurn', 'burn', stateName],
        img: "burn[6,10,1]",
        position: [['S', posX], ['S', posY]],
        initialRotation: ['S', 0],
        imgRotation: ['F'],
        blendMode: 1,
        scale: Iscale,
        anchor: [0.5, 0.5],
        moveType: ['D', true],
        collisionBox: ['C', 55],
        existData: [
            { t: ['Time', time], an: 181, d: [0, 30] },
            { t: ['B', ['freeze']], d: [0, 30], an: 181 },
            { t: ['R', 8], d: [0, 30], an: 181 },
			{ t:['G',['"enemy"','"object"'] ], a:['F',QJ.MPMZ.tl.ex_burningEffect,[damage]], p:[-1,true,true], c:['T',15,15,true] },
			{ t:['P'], a:['F',QJ.MPMZ.tl.ex_burningEffect,[damage]], p:[-1,true,true], c:['T',15,15,true] },
        ],
    });

    QJ.MPMZ.tl.ex_effectFonts("yanshang", target);
};


// 打雷
QJ.MPMZ.tl.ex_enemyparalysis = function(time = 120, args) {
    if (!this || !(this instanceof Game_Event)) return;
    if (this.drill_COET_hasTag("免疫异常")) return;

    var targetId = this._eventId;
    var stateName = 'enemyparalysis' + targetId;
    var list = $gameMap.getGroupBulletListQJ(stateName);

    let times = Math.round(this._IsDisabledCounter / 6.28);
    Fuku_Plugins.EventTremble.start(targetId, 1, 1, times);

    if (list.length > 0) {
        // 目标已存在感电状态，延长时间
		this._IsDisabledCounter += Math.round(time/2);
        let BID = list[0];
        let bullet = $gameMap._mapBulletsQJ[BID];
        if (!bullet) return;

        for (let element of bullet.data.existData) {
            if (element.t && Array.isArray(element.t) && element.t[0] === "Time") {
				let old      = element.t[1];
				let max      = bullet.time + 360;
                    old     += Math.round(time/2);
				element.t[1] = Math.min(old, max);
                break;
            }
        }
    } else {
        // 目标未感电，生成新的感电特效
		this._IsDisabledCounter += time;
        let Tcode = `($gameMap.event(${targetId}) && $gameMap.event(${targetId})._IsDisabledCounter>0)`;


        let posX = `if($gameMap.event(${targetId})){
                        $gameMap.event(${targetId}).screenBoxXShowQJ();
                    } else {
                        $gameMap.displayX();
                    }`;

        let posY = `if($gameMap.event(${targetId})){
                        $gameMap.event(${targetId}).screenBoxYShowQJ();
                    } else {
                        $gameMap.displayX();
                    }`;

		  let length;
             if (this._boxBodyQJ.type === 1) {
                length = Math.floor((this._boxBodyQJ.w + this._boxBodyQJ.h) / 2);
              } else {
                length = this._boxBodyQJ.r * 2;
              }		 
		  let Iscale = length / 75;

        QJ.MPMZ.Shoot({
            groupName: ['enemyparalysis', 'paralysis', stateName],
			img: "paralysis[6,10,1]",
            //img: "paralysis[6,10,1]",
            position: [['S', posX], ['S', posY]],
            initialRotation: ['S', 0],
            imgRotation: ['F'],
            blendMode: 1,
            extra: targetId,
            scale: Iscale,
            moveType: ['D', true],
            collisionBox: ['C', 72],
            existData: [
                { t: ['Time', time], a: ['S', `Fuku_Plugins.EventTremble.stop(${targetId})`], d: [0, 30] },
                { t: ['S', Tcode, false], d: [0, 30] },
                { t: ['G', ['"enemy"', '"object"']], a: ['C', 204], p: [-1, false, true], c: ['T', 0, 20, true], d: [0, 30] },
                { t: ['P'], a: ['S', `let probability = 100000 * $gameParty.leader().stateRate(7);
				                      if (probability >= Math.randomInt(100000)) {
				                      QJ.MPMZ.tl.ex_playerElectrified(1)}`], p: [-1, false, true], c: ['T', 20, 60, true] },
                { c: ['S', 'this.time>5'], t: ['R', 8], a: ['F', QJ.MPMZ.tl.ex_conductiveEffectOnWater, [time]], p: [-1, false, true] }
            ],
        });
    }

    // 麻痹音效
    var seNames = "バチバチ（感電したような音）";
    var se = { name: seNames, volume: 80, pitch: 100, pan: 0 };
    AudioManager.playSe(se);

    // 触发感电效果字体
    QJ.MPMZ.tl.ex_effectFonts("dalei", targetId);
};

// 眩晕
QJ.MPMZ.tl.ex_enemyDizzy = function(time = 90, args) {
    if (!this || !(this instanceof Game_Event)) return;
    if (this.drill_COET_hasTag("免疫异常")) return;

    var targetId = this._eventId;
    var stateName = 'enemyDizzy' + targetId;
    var list = $gameMap.getGroupBulletListQJ(stateName);

    this._IsDisabledCounter += time;

    if (list.length > 0) {
        // 目标已存在眩晕状态，延长时间
        let BID = list[0];
        let bullet = $gameMap._mapBulletsQJ[BID];
        if (!bullet) return;

        for (let element of bullet.data.existData) {
            if (element.t && Array.isArray(element.t) && element.t[0] === "Time") {
                element.t[1] += time;
                break;
            }
        }
    } else {
        // 目标未眩晕，生成新的眩晕演出
        let Tcode = `($gameMap.event(${targetId}) && $gameMap.event(${targetId})._IsDisabledCounter>0)`;

        let posX = `if($gameMap.event(${targetId})){
                        $gameMap.event(${targetId}).screenBoxXShowQJ();
                    } else {
                        $gameMap.displayX();
                    }`;

        let posY = `if($gameMap.event(${targetId})){
                        $gameMap.event(${targetId}).screenBoxYShowQJ();
                    } else {
                        $gameMap.displayX();
                    }`;

        QJ.MPMZ.Shoot({
            groupName: ['enemyparalysis', 'paralysis', stateName],
			img: "dizzy[5,3,4]",
            //img: "paralysis[6,10,1]",
            position: [['S', posX], ['S', posY]],
            initialRotation: ['S', 0],
            imgRotation: ['F'],
            blendMode: 0,
            extra: targetId,
            scale: 0.5,
			anchor:[0.5,1],
            moveType: ['D', true],
            collisionBox: ['C', 72],
            existData: [
                { t: ['Time', time], d: [0, 30] },
            ],
        });
    }
    // 眩晕音效
    var seNames = "ヒヨコが頭の上を回る";
    var se = { name: seNames, volume: 100, pitch: 100, pan: 0 };
    AudioManager.playSe(se);
};

//饱腹感
QJ.MPMZ.tl.ex_enemyFullness = function(extraData = {}, args) {
  if (!this || !(this instanceof Game_Event)) return;
  if (this.drill_COET_hasTag("免疫异常")) return;

  this._fullness = this._fullness || 0;

  // --- 吃东西音效 ---
  const sePool = ["リンゴをかじる", "お菓子を食べる1", "お菓子を食べる2"];
  const seName = sePool[Math.floor(Math.random() * sePool.length)];
  const se = {
    name: seName,
    volume: 90,
    pitch: Math.randomInt(80) + 41,
    pan: 0,
  };
  AudioManager.playSe(se);

  const eid = this._eventId;

  // --- 根据武器属性累积饱腹度 ---
  const leader = $gameParty.leader();
  const weapon = leader && leader.equips ? leader.equips()[0] : null;
  if (weapon && weapon.params) {
    const value = weapon.params[1] || 0;
    this._fullness += value;
  }

  const stateName = `enemyFullness${eid}`;
  const list = $gameMap.getGroupBulletListQJ(stateName) || [];
  if (list.length > 0) return;

  const posX = `($gameMap.event(${eid}) ? $gameMap.event(${eid}).screenBoxXShowQJ() : $gameMap.displayX())`;
  const posY = `($gameMap.event(${eid}) ? $gameMap.event(${eid}).screenBoxYShowQJ() - 48 : $gameMap.displayY())`;
  const deadCode = `!$gameMap.event(${eid})`;

  QJ.MPMZ.Shoot({
    groupName: ['enemyFullness', 'fullness', stateName],
    img: "fullness_1",
    position: [['S', posX], ['S', posY]],
    initialRotation: ['S', 0],
    imgRotation: ['S', 0],
    moveType: ['D', true],
    anchor: [0.5, 0.5],
    collisionBox: ['C', 1],
    extra: eid,
    existData: [
      { t: ['S', deadCode, true] },
    ],
    moveF: [
      [5, 15, QJ.MPMZ.tl.ex_enemyFullnessUpdate],
    ],
    timeline: [
      ['B', 0, 120, [0.9, 60]],
    ],
  });
};

QJ.MPMZ.tl.ex_enemyFullnessUpdate = function() {
  const targetId = this.data.extra;
  const ev = $gameMap.event(targetId);
  if (!ev) return;

  const fullness = ev._fullness || 0;
  // 吃撑了就爆炸
  if (fullness > 1000) {
    QJ.MPMZ.tl.ex_enemyFullnessExplode.call(this, ev);
    this.setDead();
    return;
  }

  let newImg = null;
  if (fullness > 950) newImg = "fullness_5";
  else if (fullness > 700) newImg = "fullness_4";
  else if (fullness > 450) newImg = "fullness_3";
  else if (fullness > 200) newImg = "fullness_2";
  else if (fullness > 50) newImg = "fullness_1";
  else if (fullness <= 0) {
    this.setDead();
    return;
  }

  if (newImg) this.changeAttribute("img", newImg);
  // 每次更新消耗饱腹度
  ev._fullness = fullness - 10;
};

QJ.MPMZ.tl.ex_enemyFullnessExplode = function(ev) {

  if (!ev) return;
  let targetId = ev._eventId;
  const posX = this.inheritX();
  const posY = this.inheritY() + 48;
  const realDamage = 99999999;

  // 爆炸音效
  AudioManager.playSe({
    name: "ゲップ音02(ミドル)",
    volume: 90,
    pitch: Math.randomInt(40) + 81,
    pan: 0,
  });

  // 爆炸演出
  QJ.MPMZ.Shoot({
    groupName: ['Bomb'],
    img: 'MGC_W2_Explosion_V4_Lv1[5,10,2]',
    position: [['S', posX], ['S', posY]],
    scale: 1,
    initialRotation: ['S', 0],
    imgRotation: ['F'],
    opacity: 1,
    hue: 0,
    moveType: ['S', 0],
    blendMode: 1,
    existData: [
      { t: ['Time', 98] },
    ],
  });

  // 伤害结算
  const key = [$gameMap.mapId(), targetId, 'HP'];
  const enemyHP = $gameSelfVariables.value(key) || 0;

  SimpleMapDamageQJ.put(2, targetId, realDamage, 0, -72);
  $gameSelfVariables.setValue(key, enemyHP - realDamage);

  // 死亡判断
  const afterHP = $gameSelfVariables.value(key) || 0;
  if (afterHP <= 0) {
    $gameSelfSwitches.setValue([$gameMap.mapId(), targetId, 'D'], true);
  }
};
//=============================================================================
//敌用技能
//=============================================================================

//水球魔法启动
QJ.MPMZ.tl.ex_enemy_waterMineStartUp = function(EID,enemyId) {

	let posX = $gameMap.event(EID).screenShootXQJ();
    let posY = $gameMap.event(EID).screenShootYQJ();

     var seNames = "Water5";
     var randomPitch = Math.randomInt(30) + 91;
     var se = { name: seNames, volume: 50, pitch: randomPitch, pan: 0 };
     AudioManager.playSe(se);	

    QJ.MPMZ.Shoot({
        img:"waterMineStartUp[5,3,6]",
        position:[['S',posX],['S',posY]],
		anchor:[0.5,0.5],
        initialRotation:['S',0],
        moveType:['S',0],
		imgRotation:['F'],
		collisionBox:['auto'],
		scale:[1,1],
		extra:enemyId,
		z:'W',
        existData:[
            {t:['Time',74]},	
        ],
        groupName:['enemyBullet'],
		deadJS:["if(this.time>70){QJ.MPMZ.tl.ex_enemy_waterMine.call(this)}"]
    });

}

//水球魔法
QJ.MPMZ.tl.ex_enemy_waterMine = function() {

	let enemyId = this.data.extra;
	let Damage = $dataEnemies[23].params[4];
    let posX = this.inheritX();
    let posY = this.inheritY();

     var seNames = "Water4";
     var randomPitch = Math.randomInt(30) + 91;
     var se = { name: seNames, volume: 50, pitch: randomPitch, pan: 0 };
     AudioManager.playSe(se);	

    QJ.MPMZ.Shoot({
        img:"waterMine[4,2,4]",
        position:[['S',posX],['S',posY]],
        initialRotation:['P'],
        moveType:['S',6],
		z:'W',
		damage:Damage,
		anchor:[0.5,0.5],
		imgRotation:['S',0],
		collisionBox:['C',10],
		scale:[1,1],
        existData:[
		    {t:['P'],a:['F',QJ.MPMZ.tl.ex_playerDamageCheck,[Damage,2]],c:['S','!QJ.MPMZ.tl.ex_playerBulletPhasing()'],},
			{t:['Time',210]},
			{t:['R',[254,255]],c:['S','this.time > 10']},	
			{t:['G','"enemy"'],a:['C',151,[Damage,0,0]],c:['S','this._countered']},
            {t:['B','cancelEnemyBullet'],d:[0,10]}
        ],
		deadJS:["QJ.MPMZ.tl.ex_enemy_waterMineBreak.call(this)"],
        groupName:['enemyBullet'],
    });
};

//水球魔法破裂
QJ.MPMZ.tl.ex_enemy_waterMineBreak = function() {

    let posX  = this.inheritX();
    let posY  = this.inheritY();
	let scale = this.scaleX; 

    QJ.MPMZ.Shoot({
        img:"waterMineBreak[5,3,2]",
        position:[['S',posX],['S',posY]],
        initialRotation:['P'],
        moveType:['S',0],
		z:'W',
		anchor:[0.5,0.5],
		imgRotation:['S',0],
		collisionBox:['auto'],
		scale:scale,
        existData:[
			{t:['Time',29]}
        ],
        groupName:['enemyBullet'],
    });

};

//水法术启动
QJ.MPMZ.tl.ex_enemy_waterMagicStartUp = function(EID) {
	
	let posX = $gamePlayer.screenShootXQJ();
    let posY = $gamePlayer.screenShootYQJ() + 10;
    QJ.MPMZ.Shoot({
        img:"Water StartUp 1 SpriteSheet[1,11,5]",
        position:[['S',posX],['S',posY]],
		anchor:[0.5,0.3],
        initialRotation:['S',0],
        moveType:['S',0],
		imgRotation:['F'],
		collisionBox:['auto'],
		scale:[1,1],
		extra:EID,
		z:'E',
        existData:[
            {t:['Time',54]},
			{t:['R',[0,5]]},	
        ],
        groupName:['enemyBullet'],
		deadJS:["if(this.time>50){QJ.MPMZ.tl.ex_enemy_waterSpike.call(this)}"]
    });

};

//水突袭
QJ.MPMZ.tl.ex_enemy_waterSpike = function() {

	let enemyId = this.data.extra;
	let Damage = $dataEnemies[23].params[4] * 2;
    let posX = this.inheritX();
    let posY = this.inheritY();

     var seNames = "Water" + (Math.randomInt(2) + 1);
     var randomPitch = Math.randomInt(30) + 91;
     var se = { name: seNames, volume: 50, pitch: randomPitch, pan: 0 };
     AudioManager.playSe(se);	
	
	if (Math.random() > 0.5) {
    QJ.MPMZ.Shoot({
        img:"Water Spike 01 - SpriteSheet[5,4,3]",
        position:[['S',posX],['S',posY]],
        initialRotation:['S',0],
        moveType:['S',0],
		z:'W',
		anchor:[0.5,0.92],
		imgRotation:['F'],
		collisionBox:['R',12,8],
		scale:[1,1],
        existData:[
            {t:['P'],a:['C',151,[Damage,0,0]],c:['S','this.time > 15 && this.time < 30'],p:[-1,false,true]},
			{t:['Time',58]}
        ],
		moveJS:[[5,10,'QJ.MPMZ.tl.ex_enemy_generalMagicZadjustment.call(this)']],
        groupName:['enemyBullet'],
    });
	} else {
    QJ.MPMZ.Shoot({
        img:"Water Splash 01 - Spritesheet[5,4,3]",
        position:[['S',posX],['S',posY]],
        initialRotation:['S',0],
        moveType:['S',0],
		z:'W',
		anchor:[0.5,0.88],
		imgRotation:['F'],
		collisionBox:['R',12,8],
		scale:[1,1],
        existData:[
            {t:['P'],a:['C',151,[Damage,0,0]],c:['S','this.time > 5 && this.time < 18'],p:[-1,false,true]},
			{t:['Time',58]}
        ],
		moveJS:[[5,10,'QJ.MPMZ.tl.ex_enemy_generalMagicZadjustment.call(this)']],
        groupName:['enemyBullet'],
    });		
	}

};

//通用魔法Z轴适配
QJ.MPMZ.tl.ex_enemy_generalMagicZadjustment = function() {
	
     let posY = this.inheritY();
	 let playerY = $gamePlayer.screenShootYQJ() + 10;
	 
	 if (playerY < posY) {
		 this.changeAttribute("z","W");
	  } else {
		 this.changeAttribute("z","E"); 
	  }


}

//兔子洞
QJ.MPMZ.tl.ex_enemy_rabbitHoleFadeIn = function() {
	
let EID = this._eventId;	
let posX = this.screenShootXQJ();
let posY = this.screenShootYQJ() - 35;
    QJ.MPMZ.Shoot({
        img:"pipofm-groundeffect05[5,4,4]",
        position:[['S',posX],['S',posY]],
        initialRotation:['S',0],
        imgRotation:['F'],
        scale:0.66,
		moveType:['S',0],
        existData:[	
          {t:['Time',75]},
        ],
		moveF:[
		  [74,999,QJ.MPMZ.tl.ex_enemy_rabbitHole,[EID]]
		],
        z:"E"
    });

};

QJ.MPMZ.tl.ex_enemy_rabbitHole = function(EID) {
	
let posX = this.inheritX();	
let posY = this.inheritY();	
let deadCode = "!$gameMap.event(" + EID +")";
let Bname = 'rabbitHole' + EID;
    QJ.MPMZ.Shoot({
        img:"pipofm-groundeffect05",
		groupName: [Bname],
        position:[['S',posX],['S',posY]],
        initialRotation:['S',0],
        imgRotation:['F'],
        scale:0.66,
		moveType:['S',0],
        existData:[	
          {t:['S',deadCode,true]}
        ],
        z:"E",
		deadF:[[QJ.MPMZ.tl.ex_enemy_rabbitHoleFadeOut]]
    });	
};

QJ.MPMZ.tl.ex_enemy_rabbitHoleFadeOut = function() {
	
	let posX = this.inheritX();	
    let posY = this.inheritY();	
	    QJ.MPMZ.Shoot({
        img:"pipofm-groundeffect05_alt[5,4,4]",
        position:[['S',posX],['S',posY]],
        initialRotation:['S',0],
        imgRotation:['F'],
        scale:0.66,
		moveType:['S',0],
        existData:[	
          {t:['Time',75]},
        ],
        z:"E"
    });
};

//女仆兔专用
QJ.MPMZ.tl.ex_enemy_carrotThrow = function () {
  if (!this) return;

  let values            = [1, 2, 3, 4];
  let weights           = [60, 10, 20, 10];
  let weaponDamage      = $dataEnemies[20].params[2];
  let posX              = 0;
  let posY              = 0;
  let initialRotation   = ['P'];
  let addedStatusType   = 0;
  let addedStatusChance = 0;

  if (this instanceof Game_Event) {
    let enemyId = $gameSelfVariables.value([$gameMap.mapId(), this._eventId, 'enemyId']);
    posX = this.screenBoxXShowQJ();
    posY = this.screenBoxYShowQJ() + 4;
  }

  if (this instanceof Game_QJBulletMZ) {
    weaponDamage    = $dataEnemies[115].params[2];
    posX            = this.inheritX();
    posY            = this.inheritY();
    initialRotation = ['S', this.inheritRotation()];
	weights         = [86, 2, 10, 2];
  }
  // 选择胡萝卜类型
  let totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  let random      = Math.random() * totalWeight;
  let carrot      = 1;
  for (let i = 0; i < values.length; i++) {
    if (random < weights[i]) {
      carrot = values[i];
      break;
    }
    random -= weights[i];
  }
  
	switch (carrot) {
       case 2:
          addedStatusType   = 9;
          addedStatusChance = 9000;
          break;	
       case 3:
          addedStatusType   = 5;
          addedStatusChance = 9000;		 
          break;		 
	}  
  
  let enemyWeapon = 'weapon/enemy_weapon28_' + carrot;
  // 投掷音效
  let seNames = ["風切り音（誇張のない音。素早く）", "剣・棒状の風切り音1 ヒュン！"];
  let randomSeName = seNames[Math.floor(Math.random() * seNames.length)];
  AudioManager.playSe({ name: randomSeName, volume: 60, pitch: Math.randomInt(40) + 81, pan: 0 });
  
  let carrotBullet = QJ.MPMZ.Shoot({
    img: enemyWeapon,
    position:        [['S', posX], ['S', posY]],
    initialRotation: initialRotation,
    moveType:        ['S', '0|10~60/6~999999|6'],
    imgRotation:     ['F'],
    collisionBox:    ['auto'],
    scale:           1,
	damage:          weaponDamage,
    existData: [
      { t: ['Time', 240] },
      { t: ['R', [255]], a: ['F', QJ.MPMZ.tl.ex_enemy_carrotThrowEffect, [weaponDamage, carrot]], c: ['S', 'this.time > 10'] },
      { t: ['P'],              a: ['F', QJ.MPMZ.tl.ex_enemy_carrotThrowEffect, [weaponDamage, carrot]], c: ['S', 'this.time > 5'] },
      {
        t: ['G', '"enemy"'],
        a: ['F', QJ.MPMZ.tl.ex_toEnemyAttack, [weaponDamage, {
          counteredBullet:      true,
          noHitEffect:          true,
          noDurLoss:            true,
          independentAttack:    true,
          specifyAddedStatus:   true,
          addedStatusType:      addedStatusType,
          addedStatusChance:    addedStatusChance
        }]],
        c: ['S', 'this._countered']
      },
      { t: ['B', 'cancelEnemyBullet'], d: [0, 10] }
    ],
    groupName: ['enemyBullet']
  });

  if (carrot === 4) {
    if (!Utils.isMobileDevice()) {
      carrotBullet.changeAttribute('tone', ['10|0~20/255~10/0', 0, 0, 0]);
    }
    carrotBullet.addExistData({
      t: ['G', ['"enemy"', '"object"']],
      a: ['F', QJ.MPMZ.tl.ex_enemy_carrotThrowEffect, [0, 4]],
      c: ['S', 'this.time > 10']
    });
  }
};


QJ.MPMZ.tl.ex_enemy_carrotThrowEffect = function(weaponDamage,effectType,args) {
	
  if ( effectType && effectType === 4 ) {
     var se = { name: 'Explosion2', volume: 90, pitch: 100, pan: 0 };
     AudioManager.playSe(se);	
     let posX = this.inheritX();	
     let posY = this.inheritY();	
	  QJ.MPMZ.Shoot({
		groupName: ['JackBomb'],
        img:'MGC_W2_Explosion_V4_Lv1[5,10,2]',
        position:[['S',posX],['S',posY]],
		scale:[1,1],
        initialRotation:['S',0],
        imgRotation:['F'],
		opacity:1,
        moveType:['S',0],
        blendMode:1,
		collisionBox:['C',45],
        existData:[	
		{t:['Time',98]},
		{t:['P'],a:['F',QJ.MPMZ.tl.ex_JackBombExplode,[1]],p:[-1,true,true],c:['S','this.time > 16 && this.time < 40']},
		{t:['G',['"enemy"','"object"']],a:['F',QJ.MPMZ.tl.ex_JackBombExplode,[1]],p:[-1,true,true],c:['S','this.time > 16 && this.time < 40']},
        ],       
    });
	return;
  }

     var se = { name: 'Blow3', volume: 70, pitch: 100, pan: 0 };
     AudioManager.playSe(se);

     let posX = this.inheritX();	
     let posY = this.inheritY();
   QJ.MPMZ.Shoot({
   img:'animehit[5,4]',
   initialRotation:['S',Math.randomInt(360)],
   position:[['S',posX],['S',posY]],
   scale:[1,1],
   moveType:['S',0],
   existData:[
   {t:['Time',19]},],		
     });
  
  if (args.target && args.target instanceof Game_Player) {

	  QJ.MPMZ.tl.ex_playerDamageCheck(weaponDamage);
	  
	  if ( effectType ) {
        switch(effectType) {	 
	    case 2:	
		  QJ.MPMZ.tl.ex_playerFreeze(5);
		  break;
        case 3:	
		  QJ.MPMZ.tl.ex_playerPoison(4,4);
		  break;
		}
	  }
  }

};


//敌标准投掷武器
QJ.MPMZ.tl.ex_enemy_weaponThrow = function( effect1 = undefined, effect2 = undefined ) {
	
  if (!this) return;
  var EID = $gameSelfVariables.get(this, 'enemyId');
  var enemyLevel = $gameSelfVariables.get(this, 'enemyLevel');
  var user = $gameMap.event(this._eventId);
  if (!user) return;
  var enemyWeapon = 'weapon/enemy_weapon' + EID;
    // 防范旧存档自变量赋值错误时，试图读取不存在的图片
	let chips = "enemy_weapon" + EID + ".rpgmvp";	
    
	if (!Utils.isMobileDevice()) { 
    if ( !QJ.MPMZ.tl.checkPictureExists(['img', 'projectiles', 'weapon'], chips) ) return;
    }
	
  var weaponDamage = $dataEnemies[Number(EID)].params[2];   
  weaponDamage = Math.floor(weaponDamage * ((100 + enemyLevel) / 100));
  if (effect2) effect2 *= 100;

	var xx = $gamePlayer.x;
    var	yy = $gamePlayer.y;
	if (user.decoyObject) {	
		xx = user.decoyObject.x;
		yy = user.decoyObject.y;
	}  
    const deg = QJ.calculateAngleByTwoPointAngle(user.x, user.y, xx, yy);
	
    QJ.MPMZ.Shoot({
        img:enemyWeapon,
        position:[['E',0],['E',0]],
        initialRotation:['S',deg],
        moveType:['S',6],
		extra:0,
		imgRotation:['R',12,true],
		collisionBox:['auto'],
		damage: weaponDamage,
		scale:0.75,
        existData:[
            {t:['Time',360]},
			{t:['R',[255]],c:['S','this.time > 10']},	
            //{t:['P'],a:['C',151,[weaponDamage,effect1,effect2]],c:['S','$gameParty.leader()._damageableCount > 0']},
			{t:['P'],a:['F',QJ.MPMZ.tl.ex_playerDamageCheck,[weaponDamage,1,effect1,effect2]],c:['S','!QJ.MPMZ.tl.ex_playerBulletPhasing()']},
			{t:['G','"enemy"'],a:['F',QJ.MPMZ.tl.ex_toEnemyAttack,[weaponDamage,{ counteredBullet:true, noHitEffect: true, noDurLoss: true, independentAttack: true, specifyAddedStatus:true, addedStatusType:effect1, addedStatusChance:effect2}]],c:['S','this._countered']},
            {t:['B','cancelEnemyBullet'],d:[0,10]}
        ],
        groupName:['enemyBullet']
    });
	
};

//敌标准挥砍武器
QJ.MPMZ.tl.enemy_meleeAttack = function(EID) {
	var enemyWeapon = 'weapon/enemy_weapon' + EID;
	var rotation = -135;
	var angle = 15;
	var scaleXY = [-0.75,0.75];
	var Anchor = [1,1];

    QJ.MPMZ.Shoot({
        img:enemyWeapon,
		groupName:['enemyWeapon'],
        position:[['E',0],['E',0]],
        initialRotation:['ED',0,rotation],
        scale:scaleXY,//动态缩放
        moveType:['D',false],
        imgRotation:['R',angle,true],//剑的旋转，速度是动态的
        anchor:Anchor,
        existData:[
            {t:['Time',10],d:[0,6]}           
        ],
        z:"E",collisionBox:['C',1],
    });
};

QJ.MPMZ.tl.enemy_meleeAttackTrail = function(EID) {

    var weaponDamage = $dataEnemies[Number(EID)].params[2];   
	var rotation = -90;
	var angle = 15;
	var scaleXY = [-0.75,0.75];

    QJ.MPMZ.Shoot({
        img:'null1',
		groupName:['enemyWeapon'],
        position:[['E',0],['E',0]],
        initialRotation:['ED',0,rotation],
        scale:scaleXY,//动态缩放
        moveType:['D',false],
		opacity:0,
        imgRotation:['R',angle,true],//剑的旋转，速度是动态的
        anchor:[0.5,0.95],
        existData:[
            {t:['Time',10]},
            //{t:['P'],a:['C',151,[weaponDamage,0,0,0]],p:[-1,false,true],c:['S','$gameParty.leader()._damageableCount > 0']},
			{t:['P'],a:['F',QJ.MPMZ.tl.ex_playerDamageCheck,[weaponDamage,1]],p:[-1,false,true],c:['S','!QJ.MPMZ.tl.ex_playerBulletPhasing()']},
        ],
        z:"E",collisionBox:['R',8,50],
        judgeAccuracyRotation:5,//判定精度，防止挥剑速度太快导致无法攻击到敌人
    });
};

//敌咆哮
QJ.MPMZ.tl.enemy_roar = function() {
   let eid  = this._eventId;
   let posX = `$gameMap.event(${eid})?$gameMap.event(${eid}).screenBoxXShowQJ():0`;
   let posY = `$gameMap.event(${eid})?$gameMap.event(${eid}).screenBoxYShowQJ():0`;
   let code = `let chance = 0.9;
               chance *= $gameParty.leader().stateRate(11);
			   if (chance > Math.random()) {
                  QJ.MPMZ.tl.ex_playerParalysis(1);
			   }`;
   QJ.MPMZ.Shoot({
     position:[['S',posX],['S',posY]],
     initialRotation:['S',0],
	 imgRotation:['F'],
     moveType:['D',true],
	 collisionBox:['C',100],
	 skillUser: eid,
     existData:[ 
	    {t:['Time',25]},
		{t:['P'],a:['S',code],p:[-1,false,true], c:['T',0,15,true]}, 
		{t:['G','"enemy"'], a:['F',QJ.MPMZ.tl.ex_checkAddedStatus,[11, 9000, undefined]], p:[-1,false,true], c:['T',0,15,true]}
	 ],
   });	
};


//黑暗吞噬弹射击
QJ.MPMZ.tl.ex_darkDevourerShoot = function(EID) { 
   if (!$gameMap.event(EID)) return;
    var posX = $gameMap.event(EID).screenShootXQJ();
	var posY = $gameMap.event(EID).screenShootYQJ();
		
    QJ.MPMZ.Shoot({
        img:"Darkness3[4,4]",
		position:[['S',posX],['S',posY]],
        initialRotation:['P'],
		imgRotation:['F'],
        scale:'0|0.1~45/1.2~999|1.2',
		opacity:0.75,
		moveType:['S',5],
        collisionBox:['C',40],
        existData:[	
		     {t:['Time',600],d:[0,30]},
             {t:['NP'],a:['S','QJ.MPMZ.tl.ex_darkDevourerExplode.call(this)'],cb:['C',5]},
             {t:['B',['playerBullet']],a:[],p:[-1,true,true,QJ.MPMZ.tl.ex_collisionDarkDevourerBullet],c:['T',0,1,true]},
             {t:['G',['"enemy"','"object"']],a:['S','QJ.MPMZ.tl.ex_darkDevourerBullet.call(this,target)'],p:[-1,true,true,QJ.MPMZ.tl.ex_collisionDarkDevourerBullet,QJ.MPMZ.tl.ex_exitDarkDevourerBullet],c:['T',0,0,true]},	
             {t:['P'],a:['S','QJ.MPMZ.tl.ex_darkDevourerBullet.call(this,target)'],p:[-1,true,true],c:['T',0,0,true]},
           ], 
		});

}
//黑暗吞噬弹
QJ.MPMZ.tl.ex_darkDevourerBullet = function(target) { 
 if(this.time < 10) return;
 
  if (target instanceof Game_Event) {
	  let fudou = $gameSelfVariables.value([$gameMap.mapId(), target.eventId(), 'fudou']);
	  if (fudou > 40) return;
   if (!target._distancePlayerX || !target._distancePlayerY) {
	  target._distancePlayerX = target.centerRealX() - this.x / 48;
	  target._distancePlayerY = target.centerRealY() - this.y / 48;
    }
	let posX = (this.x / 48) + target._distancePlayerX;
	let posY = (this.y / 48) + target._distancePlayerY;
	target.locate(posX, posY);
	return;
  }
  
  if (target instanceof Game_Player) {
	if (!this._distancePlayerX || !this._distancePlayerY) {
	  this._distancePlayerX = target.centerRealX() - this.x / 48;
	  this._distancePlayerY = target.centerRealY() - this.y / 48;
    }
	let posX = (this.x / 48) + this._distancePlayerX;
	let posY = (this.y / 48) + this._distancePlayerY;
	target.locate(posX, posY);
	return;
  }
};
//黑暗吞噬弹爆发
QJ.MPMZ.tl.ex_darkDevourerExplode = function() { 

     var seNames = "Thunder7" ;
     var randomPitch = Math.randomInt(60) + 70;
     var se = { name: seNames, volume: 80, pitch: randomPitch, pan: 0 };
     AudioManager.playSe(se);	

    let posX = this.inheritX();
    let posY = this.inheritY();
	let angle = this.inheritRotation();
	let magicScale = this.scaleX;
	
    QJ.MPMZ.rangeAtk([['S',posX],['S',posY]],['G',['"enemy"','"object"']],['C',151,[100,0,0]],['C',90]);
	QJ.MPMZ.rangeAtk([['S',posX],['S',posY]],['P'],['C',151,[70,0,0]],['C',90]);
	
    QJ.MPMZ.Shoot({
		groupName:[],
        img:"ef01_49_MagicOne_Darkness[5,8,1]",
        position:[['S',posX],['S',posY]],
        initialRotation:['S',0],
		imgRotation:['S',angle],	
		opacity:0.85,
        scale:[magicScale,magicScale],
        anchor:[0.5,0.5],
        existData:[
           	 {t:['Time',39]},	
        ],
		moveType:['S',0],
        collisionBox:['C',20],
    });
}
//黑暗吞噬弹碰撞接触
QJ.MPMZ.tl.ex_collisionDarkDevourerBullet = function(target) { 
 if(this.time < 20) return;
    if (target instanceof Game_QJBulletMZ) {
       if (target) {
	     target.setDead({t:['Time',0],a:['S','this._destroyed = true'],d:[1,15,0.1]})			   		 
    }
		 return;
	 }

    if (target instanceof Game_Event) {
		if (!target._distancePlayerX || !target._distancePlayerY) {
	  target._distancePlayerX = this.x - (target.centerRealX() * 48);
	  target._distancePlayerY = this.y - (target.centerRealY() * 48);
	  target._distancePlayerX /= 48;
	  target._distancePlayerY /= 48;
		}
	}
}
//黑暗吞噬弹碰撞离开
QJ.MPMZ.tl.ex_exitDarkDevourerBullet = function(target) { 

    if (target instanceof Game_QJBulletMZ) {
		let index = this.index;
       if (target) {			   
        target.changeAttribute("moveType",target.remMoveType);
		target.remMoveType = null;
	    target._distancePlayerX = null;
	    target._distancePlayerY = null;		
    }
		 return;
	 }

    if (target instanceof Game_Event) {
	  target._distancePlayerX = null;
	  target._distancePlayerY = null;	
	}
}

//鬼火喷射
QJ.MPMZ.tl.ex_ghostFlame = function(posId) {
	
	if (!$gameMap.event(posId)) return;
	
	let posX = $gameMap.event(posId).screenBoxXShowQJ();
    let posY = $gameMap.event(posId).screenBoxYShowQJ() + 4;
	let tarX = $gamePlayer.screenBoxXShowQJ();
	let tarY = $gamePlayer.screenBoxYShowQJ();
	let angle = QJ.calculateAngleByTwoPointAngle(posX, posY, tarX, tarY);	
        QJ.MPMZ.Shoot({
            groupName: ['ghostFlame','magic','fire'],
            img: 'null1',
            position:[["S",posX],["S",posY]],
            initialRotation: ['S',0],
            moveType:['S',0],
			opacity:0.8,			
			anchor:[0.5,0.5],
			imgRotation:['S',0],
			collisionBox:['C',16],
            existData: [
               {t:['Time',85]},
            ],       
            z: "E",
            moveF: [
			  [30,1,QJ.MPMZ.tl.ex_ghostFlameThrower,[angle]]
            ]
        });	

}
//鬼火喷射判定
QJ.MPMZ.tl.ex_ghostFlameThrower = function(angle) {
	let posX = this.inheritX();
    let posY = this.inheritY();	
	let number = 5 + Math.randomInt(5);
    let time = 30 + Math.randomInt(60);
    let speed = '0|' + (4 + Math.randomInt(6)) + '~90/0~300|0';
QJ.MPMZ.Shooter_ArcRange(['S',angle],{
	groupName: ['Flame'],
    position:[["S",posX],["S",posY]],
    img:'ghostFire[11,4]',
	imgRotation:['F'],
    blendMode:1,
	//tone:[134,53,150,0],
    opacity:'0|1.0~30/0.1~300|0.1',
    moveType:['S',speed],
	anchor:[0.5,1],
	collisionBox:['C',4],
    existData:[
    {t:['Time',time],d:[0,20]},
	{t:['P'],a:['F',QJ.MPMZ.tl.ex_playerDamageCheck,[10,2]],c:['S','!QJ.MPMZ.tl.ex_playerBulletPhasing()'],},
    ]
},-10,10,number,30,0.01,0.8);

};


//BOSS触发器
QJ.MPMZ.tl.ex_BossSummoner = function() {
	
   if ($gameMap.drill_COET_getEventsByTag_direct("BOSS前置").length > 0 ) {
	   let EID = $gameMap.drill_COET_getEventsByTag_direct("BOSS前置")[0]._eventId;
	       $gameSelfSwitches.setValue([$gameMap.mapId(), EID, 'C'], true);
		   return true; 
   } else {
	   return false; 
   }	
};

// 恶魔房召唤
QJ.MPMZ.tl.openDemonRoomPortal = function() {
	
   var XX = (this.x - 30) / 48;	
   var YY = (this.y + 30) / 48;
   var exist = true;
   var eid = $gameMap.spawnEventQJ(1,86,XX,YY,exist);
   var e = $gameMap.event(eid);
		   e._opacity = 0;	

};


// aki商店招牌演出动画
QJ.MPMZ.tl.akiSignboard = function() {
let target = $gameMap.event(this._eventId);
let posX = target.screenBoxXShowQJ() - 72;
let posY = target.screenBoxYShowQJ() - 40;
    QJ.MPMZ.Shoot({
        img:"Aki'sSignboard",
        position:[["S",posX],["S",posY]],
        initialRotation:['S',0],
        imgRotation:['F'],
		anchor:[0.465,0],
        moveType:['S',0],
        existData:[
         //{t:['Time',999]},	
        ],
        z:"W",
        moveF:[
		  [1,1,QJ.MPMZ.tl.akiSignboardSpin]
		]
    });
	
};

QJ.MPMZ.tl.akiSignboardSpin = function () {
    this._switch = this._switch || 0; // 0: 顺时针, 1: 逆时针
    this.rotationMove = this.rotationMove || 0; // 确保 rotationMove 初始化
    this._currentSpeed = this._currentSpeed || 0; // 当前旋转速度

    const targetAngle = this._switch === 0 ? 30 : -30; // 目标角度
    const acceleration = 0.1; // 加速度
    const maxSpeed = 2; // 最大速度

    // 计算目标角度与当前位置的差距
    let delta = targetAngle - this.rotationMove;

    // 判断是否接近目标角度并切换方向
    if (Math.abs(delta) < 0.5) {
        this._switch = this._switch === 0 ? 1 : 0;
        this._currentSpeed = 0; // 重置速度以实现从慢到快的效果
    }

    // 根据方向调整速度
    if (this._currentSpeed < maxSpeed) {
        this._currentSpeed += acceleration; // 加速到最大速度
    }

    // 根据方向和当前速度更新旋转角度
    this.rotationMove += delta > 0 ? this._currentSpeed : -this._currentSpeed;

    // 防止超出目标角度，强制锁定到目标角度
    if ((delta > 0 && this.rotationMove > targetAngle) || (delta < 0 && this.rotationMove < targetAngle)) {
        this.rotationMove = targetAngle;
    }
};

//大恶魔领域展开
QJ.MPMZ.tl.archdemonDomainBarrier = function () {
   let target = $gameMap.event(this._eventId);
   let posX = target.screenBoxXShowQJ();
   let posY = target.screenBoxYShowQJ();
     QJ.MPMZ.Shoot({
        img:"null1",
        position:[["S",posX],["S",posY]],
        initialRotation:['S',0],
        imgRotation:['F'],
		anchor:[0.5,0.6],
        collisionBox:['C',240],
        moveType:['S',0],
        existData:[
		  {t:['B',['enemyBullet','playerBullet','playerSkill']],p:[-1,true,true,QJ.MPMZ.tl.ex_collisionDarkDevourerBullet],c:['T',10,10,true]},
		  {t:['P'],a:['F',QJ.MPMZ.tl.restrictPlayerAttacks],p:[-1,false,true],c:['T',0,10,true]},

		  {t:['G',['"enemy"']],a:[],p:[-1,true,true,QJ.MPMZ.tl.ex_enemyInFear],c:['T',15,60,true]}	
        ],
        moveF:[
		  
		]
    });
};

// 领域效果：禁止玩家攻击行为
QJ.MPMZ.tl.restrictPlayerAttacks = function () {
	
  if ($gameSystem.hasGameTimeEvent("state55")) {
	  this._coolDown = this._coolDown || 0;
	  this._coolDown += 1;
	  if (this._coolDown > 30) {
      $gameParty.leader().addState(55);
      $gameSystem.adjustGameTimeEventDelay('state55', 1, true);
	  this._coolDown = 0;
	  }
    } else {
	  $gameParty.leader().addState(55);
      $gameSystem.addGameTimeEvent({
        key: 'state55',
        command: 'remove',
        delayMinutes: 1,
        target: 55, 
        condition: 'true' 
      });		  
	  this._coolDown = this._coolDown || 0;
  }	
};

//史莱姆黏液溅射攻击启动
QJ.MPMZ.tl.ex_enemy_SlimeMucusSplatterStartUp = function(EID,enemyId) {

	let posX = $gameMap.event(EID).screenShootXQJ();
    let posY = $gameMap.event(EID).screenShootYQJ() - 28; 
	let angle = Math.randomInt(360);

     var seNames = "Water5";
     var randomPitch = Math.randomInt(30) + 91;
     var se = { name: seNames, volume: 30, pitch: randomPitch, pan: 0 };
     AudioManager.playSe(se);	

    QJ.MPMZ.Shoot({
        img:"slime_ucus_splatter_prepare[7,4]",
        position:[['S',posX],['S',posY]],
		anchor:[0.5,0.3],
        initialRotation:['S',angle],
        moveType:['S',1],
		imgRotation:['F'],
		collisionBox:['auto'],
		scale:0.5,
		extra:enemyId,
		z:'W',
        existData:[
            {t:['Time',27]},	
        ],
        groupName:['enemyBullet'],
		deadF:[[QJ.MPMZ.tl.ex_enemy_SlimeMucusSplatter,[angle]]]
    });

}

//史莱姆黏液溅射攻击
QJ.MPMZ.tl.ex_enemy_SlimeMucusSplatter = function(angle) {

	let enemyId = this.data.extra;
	let damage = $dataEnemies[30].params[4];
    let posX = this.inheritX();
    let posY = this.inheritY();

     var seNames = "Water4";
     var randomPitch = Math.randomInt(30) + 91;
     var se = { name: seNames, volume: 15, pitch: randomPitch, pan: 0 };
     AudioManager.playSe(se);	

    QJ.MPMZ.Shoot({
        img:"slime_ucus_splatter[14,4]",
        position:[['S',posX],['S',posY]],
        initialRotation:['S',angle],
        moveType:['S',8],
		z:'W',
		anchor:[0.5,0.3],
		imgRotation:['F'],
		collisionBox:['C',10],
		scale:0.5,
        existData:[
            {t:['P'],a:['F',QJ.MPMZ.tl.ex_playerDamageCheck,[damage,2,5,20,1,4]],c:['S','!QJ.MPMZ.tl.ex_playerBulletPhasing()']},
			{t:['Time',210]},
			{t:['R',[255]],c:['S','this.time > 10']},	
			{t:['G','"enemy"'],a:['C',151,[damage,0,0]],c:['S','this._countered']},
            {t:['B','cancelEnemyBullet'],d:[0,10]}
        ],
		deadF:[
		[QJ.MPMZ.tl.ex_enemy_SlimeMucusSplatterBreak,[angle]]
		],
        groupName:['enemyBullet'],
    });
};

//史莱姆黏液溅射攻击受击效果
QJ.MPMZ.tl.ex_enemy_SlimeMucusSplatterBreak = function(angle) {

    let posX = this.inheritX();
    let posY = this.inheritY();

    QJ.MPMZ.Shoot({
        img:"slime_ucus_splatter_break[16,4]",
        position:[['S',posX],['S',posY]],
        initialRotation:['S',angle],
        moveType:['S',0],
		z:'W',
		anchor:[0.5,0.5],
		imgRotation:['F'],
		collisionBox:['auto'],
		scale:0.5,
        existData:[
			{t:['Time',63]}
        ],
    });

};
		
//恶灵史莱姆正面诅咒咬击
QJ.MPMZ.tl.ex_enemy_SlimeFrontalAttack = function(eid,state,chance) {

    let posX = `$gameMap.event(${eid})?$gameMap.event(${eid}).screenBoxXShowQJ():0`;
    let posY = `$gameMap.event(${eid})?$gameMap.event(${eid}).screenBoxYShowQJ():0`;
    let enemyId = $gameSelfVariables.value([$gameMap.mapId(), eid, 'enemyId']);
	let enemy = $dataEnemies[enemyId];
	if (!enemy) enemy = $dataEnemies[32];
    let damage = enemy.params[2]; 
	
	if (!state) state = 6;
	if (!chance) chance = 30;
	
    QJ.MPMZ.Shoot({
        img:"null1",
        position:[['S',posX],['S',posY]],
        initialRotation:['ED',0],
        moveType:['D',true],
		anchor:[0.5,0.85],
		imgRotation:['F'],
		collisionBox:['R',32,48],
        existData:[
			{t:['Time',25]},
			{t:['P'],a:['F',QJ.MPMZ.tl.ex_playerDamageCheck,[damage,1,state,chance,2,2]],p:[-1,false,true],c:['T',0,15,true]},
			//{t:['P'],a:['S',"console.log('yyyyy')"],p:[-1,false,true],c:['T',0,15,true]},
        ],
    });

};

//哔哩哔哩史莱姆的放电攻击
QJ.MPMZ.tl.ex_slimeElectricDischarge = function(eid) {
	
    let posX = `$gameMap.event(${eid})?$gameMap.event(${eid}).screenBoxXShowQJ():0`;
    let posY = `$gameMap.event(${eid})?$gameMap.event(${eid}).screenBoxYShowQJ()-28:0`;
	let enemyId = $gameSelfVariables.value([$gameMap.mapId(), eid, 'enemyId']);
	let limit = Math.randomInt(6) + 4;
	//闪电音效	 
	let seNames = "Thunder10";
    let randomPitch = Math.randomInt(60) + 70;
    let se = { name: seNames, volume: 60, pitch: randomPitch, pan: 0 };
     AudioManager.playSe(se);		

    if ($gameParty.leader().isStateAffected(9)) laserLength = ['S',60,0,[['B',['LightningReflection']],['R',[254,255]]]];
	if ($gameParty.leader().isStateAffected(67)) laserLength = ['S',480,0,[['B',['LightningReflection']],['R',[0,254,255]]]];
	
    for (let i=0;i<limit;i++) {
		const laserLength = ['S',180 + Math.randomInt(300),0,[['B',['LightningReflection']],['NP']]];
		const randomDamage = 11 + Math.randomInt(7);
        QJ.MPMZ.Laser({
			imgPoint:'null1',img:"MSE/lightning_1[9,1,2]",
			rotation:i*60+60*Math.random()-30,
			judgeWidth:10,
			judgeMode:['W',15],
			blendMode:1,
			rotationStatic:false,
	        positionStatic:false,
			positionSpread:20,
			length:laserLength,
            existData:[
			    { t: ['Time', 18] },
				{t:['G','"enemy"','"object"'],a:['F',QJ.MPMZ.tl.ex_toEnemyAttack,[4,{immuneItself:eid,magicAttack:true,orbitingDamage:true,noHitEffect:true,noDurLoss:true,specifyAddedStatus:true,addedStatusType:7,addedStatusChance:1800}]],p:[-1,false,true]},
			    {t:['P'],a:['F',QJ.MPMZ.tl.ex_playerDamageCheck,[randomDamage,2,7,18]],p:[-1,false,true],c:['S','!QJ.MPMZ.tl.ex_playerBulletPhasing()']},
			],
			position:[['S',posX],['S',posY]],
        });
    }
};

//史莱姆喷射寒流
QJ.MPMZ.tl.ex_SlimeColdStreamBlast = function() {
	
    let eid = this._eventId;	
    let posX  = `$gameMap.event(${eid})?$gameMap.event(${eid}).screenBoxXShowQJ():0`;
    let posY  = `$gameMap.event(${eid})?$gameMap.event(${eid}).screenBoxYShowQJ():0`;
	let Dcode = `$gameSelfSwitches.value([$gameMap.mapId(), ${eid}, 'D'])`;

    let angle = $gameMap.event(eid).calcDeg($gamePlayer);
	
        QJ.MPMZ.Shoot({
            groupName: ['Flame','magic'],
            position:[["S",posX],["S",posY]],
            initialRotation: ['S',0],
            moveType:['D',true],
			imgRotation:['S',0],
			Angle: angle,
			eid: eid,
            existData: [
               {t:['Time',24]},
			   {t:['S',Dcode,true]},
            ],       
            moveF: [
			  [0,0,QJ.MPMZ.tl.ex_SlimeColdStreamBlastThrower]
            ]
        });	
};

//史莱姆喷射寒流判定
QJ.MPMZ.tl.ex_SlimeColdStreamBlastThrower = function() {
	
	let posX  = this.inheritX(); 
    let posY  = this.inheritY();
    let angle = this.data.Angle;
	let number = 5 + Math.randomInt(15);
    let time = 30 + Math.randomInt(60);
    let speed = '0|' + (20 + Math.randomInt(6)) + '~90/0~300|0';
QJ.MPMZ.Shooter_ArcRange(['S',angle],{
	groupName: ['Flame'],
    position:[["S",posX],["S",posY]],
    img:'frostFlame[11,4]',
	imgRotation:['F'],
    blendMode:1,
	//tone:[134,53,150,0],
    opacity:'0|1.0~30/0.1~300|0.1',
    moveType:['S',speed],
	anchor:[0.5,1],
	collisionBox:['C',4],
    existData:[
	  {t:['R',[254, 255]]},
      {t:['Time',time],d:[0,20]},
	  {t:['P'],a:['F',QJ.MPMZ.tl.ex_playerDamageCheck,[4,2,9,1,2]],c:['S','!QJ.MPMZ.tl.ex_playerBulletPhasing()']},
	  {t:['G','"enemy"','"object"'],a:['F',QJ.MPMZ.tl.ex_toEnemyAttack,[1,{immuneItself:this.data.eid,magicAttack:true,orbitingDamage:true,noHitEffect:true,noDurLoss:true,specifyAddedStatus:true,addedStatusType:9,addedStatusChance:200}]],c:['S','Math.random() > 0.8']},
    ]
},-0.5,0.5,number,1,0.15,0.25);

};

//影子作成
QJ.MPMZ.tl.ex_objectShadowGeneration = function(OffsetX, OffsetY, Scale) {
	
    if (!this) return;
    let eid = this._eventId;
    let posX = `$gameMap.event(${eid}) ? $gameMap.event(${eid}).screenShootXQJ() + ${OffsetX} : $gameMap.displayX()`;
    let posY = `$gameMap.event(${eid}) ? $gameMap.event(${eid}).screenShootYQJ() + ${OffsetY} : $gameMap.displayY()`;  
	let deadCode = `$gameSelfSwitches.value([$gameMap.mapId(), ${eid}, 'D'])`;
	let tag = `shadow${eid}`;
	if ($gameMap.getGroupBulletListQJ(tag).length > 0) return;
	
    QJ.MPMZ.Shoot({
        img:"Shadow1",
        position:[['S',posX],['S',posY]],
		groupName:['shadow', tag],
		opacity:1,
        initialRotation:['S',0],
		scale:Scale,
        imgRotation:['F'],
        moveType:['D',true],
		blendMode:0,
        existData:[   
		   { t: ['S', `!$gameMap.event(${eid})`, true], c:['T',10,10,true] },
		   { t: ['S', deadCode, true], c:['T',10,10,true] },
		],
		z:"E",
    });
		
};

QJ.MPMZ.tl.ex_fireTrapArrow = function() {

    let posX = this.inheritX() - 432;
    let posY = this.inheritY(); 
	let angle = 90;
	
	if (Math.randomInt(101) > 0) {
		posX += 864;
		angle = 270;
	}
	
    let damage = 1;
	
    QJ.MPMZ.Shoot({
        groupName:['bullet'],
		collisionBox:['auto'],
        img:"weapon/weaponBullet101",
		moveType:['S','0|20~60/12~999/12'],
        position:[['S',posX],['S',posY]],
		initialRotation:['S',angle],
        imgRotation:['F'],
		afterImage:null,
		z:"E",
        existData:[  
			 {t:['Time',180]},
			 {t:['R',[255]],c:['S','this.time > 10']},	
      	     {t:['G',['"enemy"','"object"']],a:['F',QJ.MPMZ.tl.ex_toEnemyAttack,[damage,{noDurLoss:true}]]},
			 {t:['P'],a:['F',QJ.MPMZ.tl.ex_playerDamageCheck,[damage,1]],p:[-1,false,true]},
			 
		 ],		
    });
	
};



QJ.MPMZ.tl.bulletTimeOnKill = function () {
	
	Garasu_EnfriarPantalla(5);
	//Garasu_ModBGM(15, 80, 0);
	
    QJ.MPMZ.Shoot({
        groupName:['bulletTime'],
		moveType:['S','0'],
        existData:[  
			 { t:['Time',90] },			 
		 ],
        moveJS: [
             [ 0, 1, `
			      let value = this.time + 5;
				  Garasu_EnfriarPantalla(value);
			 `]
         ],
         deadJS: ["Garasu_Descongelar();"]		 
    });	
	
};

//邪恶斗篷-巨口吞噬
QJ.MPMZ.tl.evilCloakDevouringMaw = function() {
	
	if (!this) return;
	let eid = this._eventId; 
    let posX = `$gameMap.event(${eid})?$gameMap.event(${eid}).screenBoxXShowQJ():0`;
    let posY = `$gameMap.event(${eid})?$gameMap.event(${eid}).screenBoxYShowQJ():0`;
    let enemyId = $gameSelfVariables.value([$gameMap.mapId(), eid, 'enemyId']);
	let enemy = $dataEnemies[enemyId];
	if (!enemy) enemy = $dataEnemies[39];
    let damage = enemy.params[2]; 
	    damage += 15 + Math.floor(damage * Math.random());
	
	let angle = 90;
	if ($gameMap.event(eid).centerRealX() > $gamePlayer.centerRealX())  angle = 270;
	
    QJ.MPMZ.Shoot({
        position:[['S',posX],['S',posY]],
        initialRotation:['S',angle],
        moveType:['D',true],
		anchor:[0.5,0.85],
		imgRotation:['F'],
		collisionBox:['R', 25, 55],
        existData:[
			{t:['Time',25]},
			{t:['P'],a:['F',QJ.MPMZ.tl.ex_playerDamageCheck,[damage,1,6,40,2,2]],p:[-1,false,true],c:['T',0,15,true]},
			//{t:['P'],a:['S',"console.log('yyyyy')"],p:[-1,false,true],c:['T',0,15,true]},
        ],
    });	
	
};


//恐惧
QJ.MPMZ.tl.ex_enemyInFear = function(target) {

	  if (target instanceof Game_Event) {
	     if(target?._canBeAlerted){
			 target.requestBalloon(7);
			 target._alertTimer = 0; 
			 target._enemyState = 3;
			 target._fleeSpeed = 28;
			 
			 let seNames = "034myuu_YumeSE_MassageGag01";
			 let randomPitch = Math.randomInt(50) + 81;
			 AudioManager.playSe({ name: seNames, volume: 40, pitch: randomPitch, pan: 0 });		 
	     }
     }
};
