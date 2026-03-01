//=============================================================================
//
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc [弹幕模板库][道具特效模板]
 * @author 仇九
 *
 * @help 
 * 
 *
 */
//=============================================================================
//
//=============================================================================

// 封术卷轴
QJ.MPMZ.tl.sealingScrollEffects = function(extra = {}) {
	
	let actor  = $gameParty.leader();
	
	if (extra.sealToScroll) {
		let record = actor._equips.map(e => {
			return {_dataClass: e._dataClass, _itemId: e._itemId};
		  });
		this.sealingItems = record;
		// 封印完成，收掉玩家的装备
		const eqs = actor.equips();
		for (let slotIndex = 0; slotIndex <= 5; slotIndex++) {
			 let equips = eqs[slotIndex];
			 let target = slotIndex === 0 ? 4 : null;
			 actor.changeEquipById(slotIndex+1, target);
			 if (equips)  {
				 equips.isSealed = true;
				 $gameParty.loseItem(equips, 1);
				 $gameMap.steupCEQJ(100,1,{equipChange:true, equipIndex:slotIndex, equipFadeOut:true, isSealed:true});
			 }
		}
	    return;
	}

	if (extra.releaseSeal) {
		for (let i = 0; i < this.sealingItems.length; i++) {
		  const e = this.sealingItems[i];
		  if (!e) continue;

		  let obj = null;
		  if (e._dataClass === 'weapon') obj = $dataWeapons[e._itemId];
		  else if (e._dataClass === 'armor') obj = $dataArmors[e._itemId];

		  if (obj) {
			console.log(i, obj);  
			$gameParty.gainItem(obj, 1);
			obj.isSealed = undefined;
			actor.changeEquip(i, obj);
			$gameMap.steupCEQJ(100,1,{equipChange:true, equipIndex:i, isSealed:true});
		  }
		}
		this.sealingItems = undefined;
	    return;
	}
	
	if (!this) return;
	let textArray = window.mapCommonEventDialogue?.sealingScroll;
	if (!textArray) textArray = [ "No items sealed yet",
                                  "Under Seal:"];
	let text      = textArray[0];							  
	// 若存在被封印的物品，显示出来							  								  
	if (this.sealingItems) {
		text = textArray[1];
		let sealing = "";
		for (let i = 0; i < this.sealingItems.length; i++) {
		  const e = this.sealingItems[i];
		  if (!e) continue;

		  let obj = null;
		  if (e._dataClass === 'weapon') obj = $dataWeapons[e._itemId];
		  else if (e._dataClass === 'armor') obj = $dataArmors[e._itemId];

		  if (obj && obj.iconIndex != null) {
			sealing += ` \\fs[34]\\i[${obj.iconIndex}]`;
		  }
		}		
		text += sealing;
	}
	$gameStrings.setValue(110, text);
};

// 稻草人/训练假人状态初始化
QJ.MPMZ.tl.initializeScarecrowState = async function(extra = {}) {
	
	if (!this) return;
	
	let OffsetX = 0;
	let OffsetY = -10;
	let scale   = 0.8;
	QJ.MPMZ.tl.ex_objectShadowGeneration.call(this,OffsetX,OffsetY,scale);
	
	let posX = this.screenShootXQJ(); 
	let posY = this.screenShootYQJ() - 80;
	let lang = ConfigManager.language; 
	let checkName = "Scarecrow" + lang;
    const ok = await Promise.resolve(
      QJ.MPMZ.tl.checkPictureExists(['img','projectiles','object_name'], `${checkName}.rpgmvp`)
    );

    if (!ok) lang = 2;	
	let imgName = "object_name/Scarecrow" + lang;
	QJ.MPMZ.Shoot({
		 img:imgName,
		 groupName:['Scarecrow'],
		 position:[['S',posX],['S',posY]],
		 anchor:[0.5,0.5],
		 initialRotation:['S',0],
		 scale:0.5,
		 existData:[   ],
		 imgRotation:['F'],
		 z:"W",
		 moveType:['S',0],
		 blendMode:0,
		 collisionBox:['C',420],
		 moveF:[
			[20,20,QJ.MPMZ.tl.ex_AnuszEffectActivationCheck,["Scarecrow"]]
		 ]
	});	
};

// 奇怪的骑士状态初始化
QJ.MPMZ.tl.initializeWeirdKnightState = async function(extra = {}) {
	
    if (extra.groupName) {
		// 监听名称框显示/隐藏
		let value = 0.6;
		if ($gameMessage.isBusy()) {
			if (this.opacity >= value) this.changeAttribute("opacity", `0|${value}~30/0~99999|0`);
			return;
		}
		let tag   = extra.groupName;
        let check = QJ.MPMZ.getBulletNumberBM(-1, ['C', 24], [tag]);
        if (check === 0) {
           if (this.opacity >= value)  this.changeAttribute("opacity", `0|${value}~30/0~99999|0`);
        } else {
           if (this.opacity <= 0)      this.changeAttribute("opacity", `0|0~30/${value}~99999|${value}`);   
        }
		return;
    }

    if (extra.dialogueOpeningLine) {
        // 扭蛋检测必须最开始进行
		let gachaArray = $gameMap.drill_COET_getEventsByTag_direct("扭蛋");
		let throwArray = []; 
		let eid = this._eventId;
		if (gachaArray.length > 0) {
		  for (let idx = 0; idx < gachaArray.length; idx++) {
			   const i = gachaArray[idx];
			   if ($gameMap.event(eid)?.calcDistance(i._eventId) < 48) {
				   throwArray.push(i._eventId);
				   this._preventOptionDisplay = true;
			   }  
		    }
		}
		// 刷新选项文本
		QJ.MPMZ.tl._imoutoUtilGenerateOptionText.call(this, 30, undefined, {specifiedKey: "prototypeEventTemplate"});
        // 开场白后紧接着选项显示
		let type = String(this._sourceeventId);
		let index = 32;
		if ($gameSwitches.value(500)) index = 31;
		this.showPrototypeEventDialogue(type,String(index));
		if ($gameSwitches.value(500) && Math.random() > 0.7) {
			index = 33;
			if (throwArray.length > 0) this._preventOptionDisplay = true;
			this.showPrototypeEventDialogue(type,String(index));
		}
        // 如果实际存在扭蛋，切断选项显示的流程
		if (throwArray.length > 0) {
		this._gachaArray = throwArray;
		let labelName = "gachaProxyOpen";
			for (let i = 0; i < this._list.length; i++) {
				let command = this._list[i];
				if (command.code === 118 && command.parameters[0] === labelName) {
					this.jumpTo(i);
					return;
				}
			}
		}
		return;
	} 

    if (extra.checkItemPurchase) {
		let target = $gameMap.event(this._eventId);
        let itemId = this._shopItemId;
        let item   = $dataItems[itemId];
		let price  = item.price;
		let type   = String(this._sourceeventId);
		if ($gameParty.gold() < price) {
            // 钱不够，购买失败
		    let index = 49 + Math.randomInt(2);
		    this.showPrototypeEventDialogue(type,String(index));
			return;
		}
		$gameParty.gainGold(-price);
		$gameParty.gainItem(item, 1);
		QJ.collectionCheck(0, itemId); 
		AudioManager.playSe({ name: "Shop1", volume: 80, pitch: 100, pan: 0 });
		let index = target._productList.indexOf(itemId);
        target._productList.splice(index, 1); 
		// 成功购买游戏机标记
        if (itemId === 15) this.hasPurchased = true;	
        if (!this.hasPurchase) {
		    index = 47 + Math.randomInt(2);
		    this.showPrototypeEventDialogue(type,String(index));
		}		
		return;
	}
 
	if (!this) return;
	if ($gameMap.getGroupBulletListQJ('Knight').length > 0) return;
	let target = this._eventId;
	// 初次接触的自动监听
	if (!$gameSelfSwitches.value([1, 11, 'A'])) {
		if ($gameParty.hasItem($dataItems[15])) {
		// 旧存档适配	
	        $gameSelfSwitches.setValue([$gameMap.mapId(), target, 'A'], true);
			$gameSelfSwitches.setValue([1, 11, 'A'], true);
		}		
		QJ.MPMZ.Shoot({
			position: [['Map', 21],['Map', 5]],
			initialRotation: ['S', 0],
			imgRotation: ['F'],
			moveType: ['S', 0],
			collisionBox: ['R',288,144],
			existData: [	
			   { t:['S', "$gameSelfSwitches.value([1, 11, 'A'])", true] }, 
			   { t:['P'], a:['S', `if (!$gameTemp._isInBattle) {
									  $gameMap.event(${target})?.start();							  
								  }`] 
			   }
			],
		});
	} else {
		$gameSelfSwitches.setValue([$gameMap.mapId(), target, 'A'], true);
	}
	// 名称框
	let lang = ConfigManager.language; 
    let checkName = "Knight" + lang;
    const ok = await Promise.resolve(
        QJ.MPMZ.tl.checkPictureExists(['img','projectiles','object_name'], `${checkName}.rpgmvp`)
    );	
	if (!ok) lang = 2;
	let imgName = "object_name/Knight" + lang;
	let posX = this.screenShootXQJ() - 4; 
	let posY = this.screenShootYQJ() - 54;
	QJ.MPMZ.Shoot({
		img:imgName,
		groupName:['Knight'],
		position:[['S',posX],['S',posY]],
		initialRotation:['S',0],
		scale:0.5,
		opacity: 0.6,
		imgRotation:['F'],
		z:"W",
		collisionBox:['C',420],
		moveType:['S',0],
		existData:[   
		],
		moveF:[
		   [30,30,QJ.MPMZ.tl.initializeWeirdKnightState, [{groupName:"Knight"}]]
		],
	});
	// 重置动作和朝向
	setTimeout(() => {
        // 影子
        QJ.MPMZ.tl.ex_objectShadowGeneration.call(this, 1, -1, 1.1);
        this.setDirection(6);		
		if (!$gameParty.hasItem($dataItems[15]) && this._drill_EASe_controller !== undefined) {
			this.drill_EASe_setSimpleStateNode( ["记笔记"] );			
		}
    }, 200);	
    // 骑士商店的商品布局	
	if (!this._productList) {
		this._productList = [];
		if (!$gameParty.hasItem($dataItems[15])) {
			this._productList.push(15);  // 游戏主机
		}
		if (!$gameParty.hasItem($dataItems[16]) && $gameNumberArray.value(37).length > 6) {
			this._productList.push(16);  // DLC道具
		}
		if (!$gameParty.hasItem($dataItems[188]) && $gameSelfSwitches.value([1, 11, 'V'])) { 
			//this._productList.push(187);
			this._productList.push(188);  // 恐怖录像带
		}
		// 常规商品
		for (let i = 0; i < 10 + Math.randomInt(15); i++) {
			let id = dingk.Loot.calculateRandomItemIndex(191);
			this._productList.push(id);
		}
	}

};

QJ.MPMZ.tl.summonSealingPillar = function(extra = {}) {

    if (extra.challengeSuccess) {
		let name = this.data.particleName;
		$gameScreen._particle.particleClear(name);
		return;
	}
		
	if (extra.tarotSummon) {
		
		let mapName = $dataMapInfos[$gameMap.mapId()]?.name;
		let nameWithoutNumbers = mapName.replace(/[0-9]/g, ''); 
		if ( !["浅层遗迹迷宫", "遗忘的墓穴"].includes(nameWithoutNumbers) )  {
			return false;
		}		
		if ( $gameMap.drill_COET_getEventsByTag_direct("pillar").length > 0 || $gameSelfSwitches.value([1, 121, 'A'])) {
			return false;
		}
		let condition = DrillUp.g_COFA_condition_list[10];
		const playerX = Math.floor($gamePlayer.centerRealX());
		const playerY = Math.floor($gamePlayer.centerRealY());
		let c_area    = $gameMap.drill_COFA_getShapePointsWithCondition(playerX, playerY, "圆形区域", 6, condition);
		if (c_area.length > 0) {
			let p     = c_area[Math.floor(Math.random() * c_area.length)];
			let eid   = $gameMap.spawnEventQJ(1, 121, p.x, p.y, false);
			$gameMap.event(eid)?.setOpacity(0);
			return true;
		} else {

		}
		return false;
	}
	
	if (extra.AbyssSummon) {
		QJ.SE.spawnRegionNum(1,121,[66],1,true);
		return;
	}	
};

// 封印之柱-解除封印
QJ.MPMZ.tl.sealingPillarDomainExpansion = function(cx, cy, range = 9) {

  function getOuterRingCoordsByCenterOddSize(cx, cy, size = 9) {
    if (size < 3 || size % 2 === 0) return [];

    const w = $gameMap.width();
    const h = $gameMap.height();
    const blocked = { 8: true, 250: true, 254: true, 255: true };

    const r = (size - 1) / 2;
    const x0 = cx - r, x1 = cx + r;
    const y0 = cy - r, y1 = cy + r;

    const out = [];
    function pushIfValid(x, y) {
      if (x < 0 || y < 0 || x >= w || y >= h) return;
      const rid = $gameMap.regionId(x, y);
      if (blocked[rid]) return;
      out.push({ x, y });
    }

    for (let x = x0; x <= x1; x++) pushIfValid(x, y0);
    for (let x = x0; x <= x1; x++) pushIfValid(x, y1);
    for (let y = y0 + 1; y <= y1 - 1; y++) pushIfValid(x0, y);
    for (let y = y0 + 1; y <= y1 - 1; y++) pushIfValid(x1, y);

    return out;
  }

  // 新增：获取围栏内部(不含外圈)的可用坐标池
  function getInnerCoordsByCenterOddSize(cx, cy, size = 9) {
    if (size < 3 || size % 2 === 0) return [];

    const w = $gameMap.width();
    const h = $gameMap.height();
    const blocked = { 8: true, 250: true, 254: true, 255: true };

    const r = (size - 1) / 2;
    const x0 = cx - r, x1 = cx + r;
    const y0 = cy - r, y1 = cy + r;

    const out = [];
    for (let x = x0 + 1; x <= x1 - 1; x++) {
      for (let y = y0 + 1; y <= y1 - 1; y++) {
        if (x < 0 || y < 0 || x >= w || y >= h) continue;
        const rid = $gameMap.regionId(x, y);
        if (blocked[rid]) continue;

        // 避免刷在玩家/已有事件上
        if ($gamePlayer.x === x && $gamePlayer.y === y) continue;
        if ($gameMap.eventsXy(x, y).length > 0) continue;

        // 粗略判定：至少有一个方向可通行（更像“能站人”）
        // 如果你项目里有更严格的可通行/地形判断，建议替换这里
        const passable =
          $gameMap.isPassable(x, y, 2) ||
          $gameMap.isPassable(x, y, 4) ||
          $gameMap.isPassable(x, y, 6) ||
          $gameMap.isPassable(x, y, 8);
        if (!passable) continue;

        out.push({ x, y });
      }
    }
    return out;
  }

  // 1) 先做外圈火焰围栏
  const coords = getOuterRingCoordsByCenterOddSize(cx, cy, range);
  for (let i = 0; i < coords.length; i++) {
    const p = coords[i];
    let name = "fire_pillar_c" + i;
    $gameScreen._particle.particleSet(0, name, 'tilemap', 'fire_pillar_c', 'above', p.x, p.y);
    $gameScreen._particle.particleUpdate([name, 'color', '#4a0000', '#8a1d00@0.6', '#ffb9ad']);
    let posX = (p.x + 0.5 - $gameMap.displayX()) * 48;
    let posY = (p.y + 0.5 - $gameMap.displayY()) * 48 - 24;

    QJ.MPMZ.Shoot({
      position: [['S', posX], ['S', posY]],
      initialRotation: ['S', 0],
      imgRotation: ['F'],
      groupName: ["firePillar"],
      particleName: name,
      moveType: ['S', 0],
      mapPassable: [false, false, false, false],
      collisionBox: ['R', 48, 64],
      existData: [
        { t: ['P'], a: ['F', QJ.MPMZ.tl.ex_playerDamageCheck, [12, 2, 8, 10]], c: ['T', 0, 10, true], p: [-1, false, true] },
        { t: ['G', ['"enemy"', '"object"']], a: ['F', QJ.MPMZ.tl.ex_burningEffect, [20]], p: [-1, true, true], c: ['T', 0, 10, true] },
      ]
    });
  }

  // 2) 新增：在围栏内部随机召唤怪
  const inner = getInnerCoordsByCenterOddSize(cx, cy, range);
  if (inner.length > 0) {
    const spawnCount = 5 + Math.randomInt(4); 

    // 随机抽点（不重复）
    const pool = inner.slice();
    for (let i = pool.length - 1; i > 0; i--) { // Fisher-Yates 洗牌
      const j = Math.randomInt(i + 1);
      const tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
    }

    const n = Math.min(spawnCount, pool.length);
	const specialIndex = Math.randomInt(n);
    for (let k = 0; k < n; k++) {
      const s = pool[k];
	  const enemyTemplateId = (k === specialIndex) ? 29 : 22;
      let eid = $gameMap.spawnEventQJ(1, enemyTemplateId, s.x, s.y, false);
	  let e   = $gameMap.event(eid);
	  if (e) {
		  e._pillarSummon = true;
		  $gameSelfVariables.setValue([$gameMap.mapId(), eid, 'enemyLevel'], 200+Math.randomInt(200));
		  setTimeout(() => e.enterChaseState(), 1000);		  
	  }
    }
  }
};

// 拍立得收藏集数量检查
QJ.MPMZ.tl.checkPolaroidCount = function() {
    
    let count = 0;
    for (let id = 200; id <= 234; id++) {
      if ($gameParty.hasItem($dataItems[id], false)) count++;
    }

	// 失去全收集道具时要同时没收道具
    if (count === 35 && !$gameParty.hasItem($dataItems[236], false) && $gameSwitches.value(474)) {	
        for (let id = 200; id <= 234; id++) {
          $gameParty.gainItem($dataItems[id], -1);
        }
       // 重新计算收集情况
       count = 0;
       for (let id = 200; id <= 234; id++) {
         if ($gameParty.hasItem($dataItems[id], false)) count++;
       }	   
	}
	
	if (count > 0 && count < 35 && !$gameParty.hasItem($dataItems[235], false)) {
		$gameParty.gainItem($dataItems[235], 1);
		$gameParty.gainItem($dataItems[236], -1);
	}
	
	if (count === 35 && !$gameParty.hasItem($dataItems[236], false)) {
		$gameParty.gainItem($dataItems[235], -1);
		$gameParty.gainItem($dataItems[236], 1);
		if (!$gameSwitches.value(474)) {
		  $gameSwitches.setValue(474, true);
		  $gameParty.leader().addLuk(35);		
		}
	}
	
    return count;
	
};

// 篝火音效音量变化
QJ.MPMZ.tl.bonfireSoundVolumeChange = function(eid) {
    
	let target = $gameMap.event(eid);
	if (!target) return;

    $gameTemp._drill_ESo_event = eid;
    $gameTemp._drill_ESo_isOff = $gameTemp._drill_ESo_nextSEOff;
	$gameTemp._drill_ESo_nextSEOff = false;
    let volume = 60;
    let se = { name: "木が燃える音", volume: volume, pitch: 100, pan: 0 };
    AudioManager.playSe(se);
	
};

// 忍者的肚子咕噜声
QJ.MPMZ.tl.weirdBellyBuzzingSound = function(eid) {
    
	let target = $gameMap.event(eid);
	if (!target) return;
	// 标记子弹
	 const randomX = Math.randomInt(1600) - 300;
	 const name = 'guuuu' + randomX;
     let bullet = QJ.MPMZ.Shoot({
        img:"null1",
		groupName: [name],
		position:[['S',randomX],['S',0]],
        initialRotation:['S',0],
		imgRotation:['F'],
		onScreen:true,
        moveType:['S',0],
        scale:0.5,
        existData:[
        {t:['Time',61]}	
        ],
    });	
	
	let index = bullet.index;	
	let posX = target.screenBoxXShowQJ();
	let posY = target.screenBoxYShowQJ();
	let distance = $gamePlayer.calcDistance(eid);
	let opacityMax = 100;
    if (distance > 96) {
        opacityMax -= Math.floor((distance - 96) / 3);
    }
	opacityMax *= 0.01;
	if (opacityMax <= 0) opacityMax = 0.1;
    QJ.MPMZ.Shoot({
        img:"guuuu",
		position:[['S',posX],['S',posY]],
        initialRotation:['S',0],
		imgRotation:['S',0],
        moveType:['TB',name,0.9,10,20],
		opacity:`0|0~70/${opacityMax}~80/0`,
        scale:'0|0.2~150/0.8',
		z:"W",
        existData:[
          {t:['Time',150],d:[0,10]}	
        ],
		moveF:[
		  //[90,999,QJ.MPMZ.tl.ex_sushiPuddingSummonAki]
		],
		timeline:['S',0,10,[-1,4,5]],
    });		
    // 肚子饿了的音效
    let random = 1 + Math.randomInt(4);
    let seName = "Hungry03-" + random;
    let randomPitch = Math.randomInt(40) + 80;

    // 计算音量
    let volume = 50;
    if (distance > 96) {
        volume -= Math.floor((distance - 96) / 6);
    }
    if (volume <= 0) return; // 音量为0则不播放
    let se = { name: seName, volume: volume, pitch: randomPitch, pan: 0 };
    AudioManager.playSe(se);
	
};


//召唤星之门的前置工作
QJ.MPMZ.tl.ex_summonStarDoorPreset = function () {
	
    var gachagacha = QJ.MPMZ.Shoot({
       img:"object_name/StarDoor",
	   groupName: ['summonStarDoor'],
	   position:[['M'],['M']],
       initialRotation:['S',0],
       imgRotation:['F'],
	   moveType:['D',true],
	   opacity: '0|0.6~60/0.2~60/0.6',
       existData:[
         {t:['S','TouchInput.drill_isRightPressed()||TouchInput.drill_isRightTriggered()',true],d:[0,10]}, 		
       ],
	   moveF: [
	     [6,6,QJ.MPMZ.tl.ex_summonPointDetection,[null,"StarDoor"]]
	   ],
	   z:"MF_UG"
    });
    if ($gameMap.getGroupBulletListQJ('chantingTarotCard').length > 0) {	
	   var index = $gameMap.getGroupBulletListQJ('chantingTarotCard')[0];
        QJ.MPMZ.Laser({
			imgPoint:'null1',
			img:"electricity[4,5]",
			rotation:['BT',index],
			position:[['M'],['M']],
			judgeWidth:10,
			judgeMode:['W',5],
			blendMode:0,
			opacity: '0|0.9~60/0.35~60/0.9',
			rotationStatic:false,
	        positionStatic:false,
			positionSpread:0,
            z:"MF_UG",
			length:['D',['M'],['M'],['B',index],['B',index]],
            existData:[
			    { t: ['BE', index] },
			],
        });	
	}
};

//召唤扭蛋机的前置工作
QJ.MPMZ.tl.ex_summonGachaMachinePreset = function () {
	
    var gachagacha = QJ.MPMZ.Shoot({
       img:"object_name/gachagacha",
	   groupName: ['summonGachaMachine'],
	   position:[['M'],['M']],
       initialRotation:['S',0],
       imgRotation:['F'],
	   moveType:['D',true],
	   opacity: '0|0.6~60/0.2~60/0.6',
       existData:[
         {t:['S','TouchInput.drill_isRightPressed()||TouchInput.drill_isRightTriggered()',true],d:[0,10]}, 		
       ],
	   moveF: [
	     [6,6,QJ.MPMZ.tl.ex_summonPointDetection,[null,"gachagacha"]]
	   ],
	   z:"MF_UG"
    });
    if ($gameMap.getGroupBulletListQJ('chantingTarotCard').length > 0) {	
	   var index = $gameMap.getGroupBulletListQJ('chantingTarotCard')[0];
        QJ.MPMZ.Laser({
			imgPoint:'null1',
			img:"electricity[4,5]",
			rotation:['BT',index],
			position:[['M'],['M']],
			judgeWidth:10,
			judgeMode:['W',5],
			blendMode:1,
			opacity: '0|0.9~60/0.35~60/0.9',
			rotationStatic:false,
	        positionStatic:false,
			positionSpread:0,
            z:"MF_UG",
			length:['D',['M'],['M'],['B',index],['B',index]],
            existData:[
			    { t: ['BE', index] },
			],
        });	
	}
};

QJ.MPMZ.tl.ex_summonPointDetection = function (result,type) {
	
	this._coolDown = this._coolDown || 0;	
	if (this._coolDown > 0) {
	   this._coolDown -= 1;
	   return;
	}	

    if (result && result == "succeed") {
		QJ.MPMZ.deleteProjectile("chantingTarotCard",{d:[1,30,1.5]});
		  if (type && type == "gachagacha") {
		    QJ.MPMZ.deleteProjectile("summonGachaMachine",{a:['F',QJ.MPMZ.tl.ex_summonGachaMachine],d:[0,30]});
		  }
		  if (type && type == "StarDoor") {
		    QJ.MPMZ.deleteProjectile("summonStarDoor",{a:['F',QJ.MPMZ.tl.ex_summonGateOfStars],d:[0,30]});
		  }		  
		 return;	   
	}

    if (result && result == "defeated") {
           const lang = ConfigManager.language;
           var BulletText;
           switch(lang) {
              case 0:
              BulletText = "\\c[2]\\dDCOG[11:2:2:2]\\fs[28]这里无法进行召唤！!";
           break;
           case 1:
              BulletText = "\\c[2]\\dDCOG[11:2:2:2]\\fs[28]ここでは召喚できない！！"
              break;
           default:
              BulletText = "\\c[2]\\dDCOG[11:2:2:2]\\fs[28]Summoning is not possible here!!"
              break;
           }		
		   this._coolDown = 10;
		   var posX = this.inheritX() * $gameScreen.zoomScale();
           var posY = ( this.inheritY() - 36 ) * $gameScreen.zoomScale();	
           $gameTemp.drill_GFTT_createSimple( [posX,posY], BulletText, 5, 0, 90);
           AudioManager.playSe({ name: "012myuu_YumeSE_SystemBuzzer01", volume: 70, pitch: 100, pan: 0 });		   
		   return;
	}
	
	if (TouchInput.drill_isLeftPressed() || TouchInput.drill_isLeftTriggered()) {
		this._coolDown = 4;
    QJ.MPMZ.Shoot({
       img:"null1",
	   position:[['M'],['M']],
       initialRotation:['S',0],
       imgRotation:['F'],
	   moveType:['S',0],
	   collisionBox:['C',27],
	   anchor:[0.55,0.25],
       existData:[
	      {t:['Time',10],a:['F',QJ.MPMZ.tl.ex_summonPointDetection,["succeed",type]]},
          {t:['NP'],a:['F',QJ.MPMZ.tl.ex_summonPointDetection,["defeated",type]]}, 	
		  {t:['P'],a:['F',QJ.MPMZ.tl.ex_summonPointDetection,["defeated",type]]}, 
          {t:['G',['"enemy"','"object"','NPC']],a:['F',QJ.MPMZ.tl.ex_summonPointDetection,["defeated",type]]},		  
       ],
    });

	}
};

//星之门召唤
QJ.MPMZ.tl.ex_summonGateOfStars = function() {  

   if ($gameMap.drill_COET_getEventsByTag_direct("星之门").length > 0 ) {
	   return false; 
   }
	   var xx = (this.x - 36) / 48;
	   var yy = (this.y + 3) / 48;
       var eid = $gameMap.spawnEventQJ(1,47,xx,yy,false);
       $gameMap.event(eid)?.setOpacity(0);
};

//召唤扭蛋机
QJ.MPMZ.tl.ex_summonGachaMachine = function () {
	   var xx = (this.x - 24) / 48;
	   var yy = (this.y - 1) / 48;
       var eid = $gameMap.spawnEventQJ(1,32,xx,yy,true);
       $gameMap.event(eid)?.setOpacity(0);
};

//生成树上的采集物
QJ.MPMZ.tl.ex_treeHarvestables = function (item, count) {
    if (!this) return;
    let eid = this._eventId;
    if (DataManager.isItem(item) || DataManager.isWeapon(item) || DataManager.isArmor(item)) {
        if (!count) count = Math.randomInt(5) + 0;
        if (count < 1) return;
        const eveX = $gameMap.event(eid).centerRealX();
        const eveY = $gameMap.event(eid).centerRealY();

        // 定义最小距离和尝试次数
        const minDistance = 0.8;  // 最小间隔距离，可根据需要调整
        const maxTries = 20;      // 最大尝试次数
        const placedPositions = []; // 记录已经放置的果实坐标

        for (let i = 0; i < count; i++) {
            let posX, posY;
            let foundPosition = false;

            // 多次尝试寻找合适的坐标
            for (let attempt = 0; attempt < maxTries; attempt++) {
                const xx = (1.6 * Math.random()) - 1.2;
                const yy = (-1.4 * Math.random()) - 1.4;
                const tryX = eveX + xx;
                const tryY = eveY + yy;

                // 检查与已放置果实的距离
                let tooClose = false;
                for (const [px, py] of placedPositions) {
                    const dx = tryX - px;
                    const dy = tryY - py;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < minDistance) {
                        tooClose = true;
                        break;
                    }
                }

                if (!tooClose) {
                    // 找到了满足距离要求的坐标
                    posX = tryX;
                    posY = tryY;
                    foundPosition = true;
                    break;
                }
            }

            // 如果尝试多次仍未找到合适坐标，就直接使用最后一次随机生成的结果
            if (!foundPosition) {
                const xx = (1.6 * Math.random()) - 1.2;
                const yy = (-1.4 * Math.random()) - 1.4;
                posX = eveX + xx;
                posY = eveY + yy;
            }

            // 创建果实事件
            const tagName = "Harvestables" + eid;
            const copy = $gameMap.spawnEventQJ(1, 86, posX, posY, true);
            const e = $gameMap.event(copy);
            if (!e) return;
            e._opacity = 0;
            e.drill_COET_addTag(tagName);
            $gameSelfVariables.setValue([$gameMap.mapId(), copy, "HP"], 40);

			e._dropItemId = item.id;
			
			if (DataManager.isItem(item)) {
				e._dropItemType = 0;      
			} else if (DataManager.isWeapon(item)) {
				e._dropItemType = 1;  
			} else if (DataManager.isArmor(item)) {
				e._dropItemType = 2;
			}

            $gameSelfVariables.setValue([$gameMap.mapId(), copy, "fudou"], 99);
            $gameSelfSwitches.setValue([$gameMap.mapId(), copy, "A"], true);

            const iconIndex = "$DrillEIIconSet_" + item.iconIndex;
            e.setImage(iconIndex, e._characterIndex);
            e._opacity = 255;

            // 将已放置的果实坐标记录下来
            placedPositions.push([posX, posY]);
        }
    }
};

//树上的采集物掉落
QJ.MPMZ.tl.ex_treeHarvestableDrops = function(drop) {
	
	let XX = this.x / 48;
	let YY = this.y / 48;
            // 正常掉落生成
            let text;

			var eid = $gameMap.spawnEventQJ(1,85,XX,YY,true);
			var e = $gameMap.event(eid);

            e._opacity = 0;
            $gameSelfVariables.setValue([$gameMap.mapId(), e._eventId, 'dropsId'], drop.id);

            if (DataManager.isItem(drop)) {
                $gameSelfVariables.setValue([$gameMap.mapId(), e._eventId, 'dropsType'], 1);
                //text = "\\fs[14]\\dDCOG[11:2:2:2]\\si[" + drop.id + "]";
            } else if (DataManager.isWeapon(drop)) {
                $gameSelfVariables.setValue([$gameMap.mapId(), e._eventId, 'dropsType'], 2);
                //text = "\\fs[14]\\dDCOG[11:2:2:2]\\sw[" + drop.id + "]";
            } else if (DataManager.isArmor(drop)) {
                $gameSelfVariables.setValue([$gameMap.mapId(), e._eventId, 'dropsType'], 3);
               // text = "\\fs[14]\\dDCOG[11:2:2:2]\\sa[" + drop.id + "]";
            }

            $gameSelfSwitches.setValue([$gameMap.mapId(), e._eventId, 'A'], true);
            var iconIndex = "$DrillEIIconSet_" + drop.iconIndex;
            e.setImage(iconIndex, e._characterIndex);
            e._opacity = 255;

            //e.setMiniLabelText(text);

            var condition = DrillUp.g_COFA_condition_list[10];
            var c_area = $gameMap.drill_COFA_getShapePointsWithCondition(XX, YY, "圆形区域", 3, condition);
            if (c_area.length > 0) {
                var p = c_area[Math.floor(Math.random() * c_area.length)];
                var xPlus = p.x - XX;
                var yPlus = p.y - YY;
                e.jump(xPlus, yPlus);
            } else {
                e.jump(0, 0);
            }

            var se = { name: "Heal1", volume: 60, pitch: 130, pan: 0 };
            AudioManager.playSe(se);	
};		
	
	
//星之门传送
QJ.MPMZ.tl.ex_starGateTeleportationObject = function(extra = {},args) {

	if (extra.isAbsorbed) {
		 if (args.target && args.target instanceof Game_Event) {
			 
			 if (args.target.drill_COET_hasTag("星之门")) return;
			 
			 args.target.drill_EFOE_playHidingHorizonFlat( 20,1.5, false );
			 var se = { name: "Darkness3", volume: 90, pitch: 100, pan: 0 };
			 AudioManager.playSe(se);

			  let EID = args.target._eventId;
			  let Event = "event:" + EID;
			  let Ename = "monster_sp-" + EID;
			  let Ecode = "$gameMap.eraseEvent(" + EID + ")";
			  $gameScreen._particle.particleSet(0,Ename,Event,"monster_sp");
		   QJ.MPMZ.Shoot({
			img:"null1",
			moveType:['D',false],
			existData:[
				{t:['Time',20],a:['S',Ecode]}, 		
			  ],
			});		  
			  
			  return;		 
		 }

		if (args.bulletTarget && args.bulletTarget instanceof Game_QJBulletMZ) {

			  this._hitcount = this._hitcount || 0;
			  this._hitcount += 1;
			  args.bulletTarget.setDead({t:['Time',0],d:[1,15,0.1]})			   		 			 
		 }
		 return;
	}
	
	if (extra.SuccessfullyStolen) {
		if (args.target && args.target instanceof Game_Event) {
		    if (args.target.isJumping() || args.target._SuccessfullyStolen) return;
			args.target._SuccessfullyStolen = true;
		    args.target.steupCEQJ(2, {SuccessfullyStolen:true});
		}
		return;
	}
	
    if (!this || !(this instanceof Game_Event)) return;
	let eid   = this._eventId;
	let Ecode = `$gameMap.event(${eid})?.start()`;
    let posX = this.screenBoxXShowQJ();
	let posY = this.screenBoxYShowQJ();	
        QJ.MPMZ.Shoot({
            groupName: ['tarot', 'starGate'],
            position:[['S',posX],['S',posY]],
            initialRotation: ['S', 0],
            imgRotation: ['F'],
            blendMode: 0,
            opacity: 1,
            scale: 1,
            anchor: [0.5, 0.5],
            moveType: ['S', 0],
            collisionBox: ['C', 20],
            existData: [
			  {t:['P'],a:['S',Ecode],c:['S','this.time > 30'],p:[-1,true,true],cb:['C',8]},
			  {t:['G',['goods']], a:['F',QJ.MPMZ.tl.ex_starGateTeleportationObject,[{SuccessfullyStolen:true}]],p:[-1,true,true], c: ['T', 0, 10, true]},
			  {t:['G',['"object"','"NPC"','object']],a:['F',QJ.MPMZ.tl.ex_starGateTeleportationObject,[{isAbsorbed:true}]],p:[-1,true,true]},
			  {t:['B',['playerBullet','evemyBullet']],a:['F',QJ.MPMZ.tl.ex_starGateTeleportationObject,[{isAbsorbed:true}]],p:[-1,true,true]},
			],
			moveF:[
			  [15,15,QJ.MPMZ.tl.ex_starGateDurabilityCheck]
			]
        });   		
};

//星之门耐久度检测
QJ.MPMZ.tl.ex_starGateDurabilityCheck = function() {
    this._hitcount = this._hitcount || 0;
	if ( this._hitcount > 10 && this._hitcount < 30) {
		if ( $gameMap.drill_COET_getEventsByTag_direct("星之门").length > 0 ) {
			let gate = $gameMap.drill_COET_getEventsByTag_direct("星之门")[0];
			this._hitcount = 99;
			$gameMap.event(gate._eventId).steupCEQJ(4);
		}
	}
};

//星之门传送效果-已被废弃
QJ.MPMZ.tl.ex_starGateTeleportationObjectEffect = function(args) {

     if (args.target && args.target instanceof Game_Event) {
		 
		 if (args.target.drill_COET_hasTag("星之门")) return;
		 
		 args.target.drill_EFOE_playHidingHorizonFlat( 20,1.5, false );
		 var se = { name: "Darkness3", volume: 90, pitch: 100, pan: 0 };
		 AudioManager.playSe(se);

		  let EID = args.target._eventId;
		  let Event = "event:" + EID;
		  let Ename = "monster_sp-" + EID;
		  let Ecode = "$gameMap.eraseEvent(" + EID + ")";
		  $gameScreen._particle.particleSet(0,Ename,Event,"monster_sp");
       QJ.MPMZ.Shoot({
        img:"null1",
        moveType:['D',false],
        existData:[
            {t:['Time',20],a:['S',Ecode]}, 		
          ],
        });		  
		  
		  return;		 
	 }

    if (args.bulletTarget && args.bulletTarget instanceof Game_QJBulletMZ) {

		  this._hitcount = this._hitcount || 0;
		  this._hitcount += 1;
	      args.bulletTarget.setDead({t:['Time',0],d:[1,15,0.1]})			   		 
		  return;
	 }

};
//塔罗牌激活演出
QJ.MPMZ.tl.ex_chantingTarotCard = function(imgIndex,itemId,starDoor=false) {

   if (!imgIndex) {
	   imgIndex = $gameParty.lastItem().iconIndex;
   }
   if (!itemId) {
	   itemId = $gameParty.lastItem().id;
   }   
   let posX = "$gamePlayer.screenBoxXShowQJ() + 1";
   let posY = "$gamePlayer.screenBoxYShowQJ() - 30";  
 
   var iconScale = 0.4;
   if (Utils.isMobileDevice()) iconScale = 0.8;
   
   var card = QJ.MPMZ.Shoot({
        img:['I',imgIndex],
		groupName: ['chantingTarotCard'],
		position:[['S',posX],['S',posY]],
        initialRotation:['S',0],
		imgRotation:['F'],
        moveType:['D',true],
        scale:0.4,
        existData:[
        ],
		deadJS:["$gameSystem._drill_PAlM_enabled = true;$gamePlayer.drill_EASA_setEnabled(true);$gameSwitches.setValue(14, false)"]
    });
	// 皇帝
	if (itemId == 50) {
	  card.addExistData({t:['Time',60],d:[1,30,20]});
      return;	  
	}
	// 战车
	if (itemId == 53) {
	   QJ.MPMZ.tl.ex_chahuiExpressPreprocess();	
  
	}	
	// 节制
	if (itemId == 60) {
	  card.addExistData({t:['S','TouchInput.drill_isRightPressed()||TouchInput.drill_isRightTriggered()',true],d:[1,30,1.5]});
      return;	  
	}
	// 星
	if (itemId == 63 && starDoor) {
	  card.addExistData({t:['S','TouchInput.drill_isRightPressed()||TouchInput.drill_isRightTriggered()',true],d:[1,30,1.5]});
      return;	  
	}	
    // 默认效果	
	  card.addExistData({t:['Time',60],d:[1,30,1.5]});
};

//塔罗牌"日"：火鸟的祝福
QJ.MPMZ.tl.ex_fireBirdBlessing = function() {

     	var se = { name: "Fire1", volume: 80, pitch: 50, pan: 0 };
        AudioManager.playSe(se);

        QJ.MPMZ.Shoot({
            groupName: ['tarot', 'fireBirdBlessing'],
            img: "Minto_Magic_90[5,14,2]",
            position: [['P'], ['P']],
            initialRotation: ['S', 0],
            imgRotation: ['F'],
            blendMode: 3,
            opacity: 1,
            scale: 1,
            anchor: [0.5, 0.5],
            moveType: ['D', true],
            collisionBox: ['C', 1],
            existData: [
			{ t: ['Time', 138] }
			],
			moveF:[
			   [80,999,QJ.MPMZ.tl.ex_fireBirdBlessingEffect]
			]
        });   

};

QJ.MPMZ.tl.ex_fireBirdBlessingEffect = function() {

    var se = { name: "Fire3", volume: 80, pitch: 60, pan: 0 };
    AudioManager.playSe(se);
	
    if ($gameSystem.hasGameTimeEvent("state77")) {
        $gameParty.leader().addState(77);
        $gameSystem.adjustGameTimeEventDelay('state77', 15, true);
    } else {
	    $gameScreen._particle.particleSet(0,'fireBirdBlessing','player','sparks_c');
        $gameParty.leader().addState(77);
        $gameSystem.addGameTimeEvent({
            key: 'state77',
            command: 'remove',
            delayMinutes: 15,
            target: 77,
            condition: 'true'
        });
    }	
	
	//$gameScreen._particle.particleClear('fireBirdBlessing')
	
};

//龙吼魔法
QJ.MPMZ.tl.ex_dragonShouts = function() {

var id = "zoomBlur-T" ;
var filterTarget = 1;
var posX = $gamePlayer.screenBoxXShowQJ() * $gameScreen.zoomScale();
var posY = $gamePlayer.screenBoxYShowQJ() * $gameScreen.zoomScale();
$gameMap.createFilter(id, "zoomblur", filterTarget);
$gameMap.setFilter( id ,[posX,posY,0,0]);
$gameMap.moveFilter(id, [posX,posY,0,0.3], 40);
$gameMap.eraseFilterAfterMove(id);
	
    QJ.MPMZ.Shoot({
		groupName:['tarot','Shouts'],
        img:'null1',
        position:[['P'],['P']],
        initialRotation:['S',0],
        moveType:['S',0],
        imgRotation:['F'],
        existData:[	
		{t:['Time',40]},
		{t:['G',['"enemy"','"NPC"']],a:['C',239,[0,0,0]],p:[-1,true,true]}
        ],
		collisionBox:['C',450],
    });
}

//卢恩之石:Raido
QJ.MPMZ.tl.ex_runes_Raido = function() {
	var deadCode = "!$gameMap.event(" + this._eventId + ")";
	var eraseCode = "$gameMap.eraseEvent(" + this._eventId + ")";
	
	QJ.MPMZ.Shoot({
		groupName:['runes','Raido'],
        img:"null1",
        position:[['E',0],['E',0]],
        initialRotation:['S',0],
        scale:1,
        moveType:['D',true],
        opacity:1,
        blendMode:0,
        imgRotation:['F'],
        anchor:[0.5,0.5],
        existData:[
            {t:['Time',3600],a:['S',eraseCode],d:[0,30]},
			{t:['S',deadCode,true]},
        ],
        moveF:[
          [60,10,QJ.MPMZ.tl.ex_runes_RaidoCheck]
        ],
		collisionBox:['C',10],
    });
};

QJ.MPMZ.tl.ex_runes_RaidoCheck = function() {

if (TouchInput.drill_isLeftPressed()) {
	  
	QJ.MPMZ.Shoot({
		groupName:['RaidoCheck'],
        img:"null1",
        position:[['M'],['M']],
        initialRotation:['S',0],
        scale:1,
        moveType:['S',0],
        opacity:1,
        blendMode:0,
        imgRotation:['F'],
        anchor:[0.5,0.5],
        existData:[
            {t:['Time',10]},
			{t:['G',['Raido']],a:['EP',3]},
        ],
		collisionBox:['C',5],
    });
}

};

//卢恩之石:Kenaz
QJ.MPMZ.tl.ex_runes_Kenaz = function() {
	
   let ImgIndex = $gameParty.lastItem().iconIndex;   
   QJ.MPMZ.Shoot({
        img:['I',ImgIndex],position:[['P'],['P']],
        initialRotation:['S',0],imgRotation:['F'],
        moveType:['B',-1,0,-30,0,-30,0,-30,0,-30],
        scale:[0.5,0.5],
        existData:[
        {t:['Time',1200]},
		{t:['S','TouchInput.drill_isLeftPressed()',true],a:['F',QJ.MPMZ.tl.ex_runes_KenazShoot]},  
        ],
		trailEffect:[],
    });
	
};

QJ.MPMZ.tl.ex_runes_KenazShoot = function() {
	$gamePlayer.drill_EASA_setEnabled( true );
    let ImgIndex = $gameParty.lastItem().iconIndex; 
    QJ.MPMZ.Shoot({
		groupName:['runes','Ehwaz'],
        img:['I',ImgIndex],
        position:[['P'],['P']],
        initialRotation:['M'],
        moveType:['S','0|9~120/0~999/0'],
		scale:[0.5,0.5],
        imgRotation:['R',16,true],
        existData:[	
		{t:['Time',120]},
		{t:['R',[255]]},
		{t:['G',['"enemy"','"object"']],a:['S','QJ.MPMZ.tl.ex_turnIntoBomb.call(this,target)'], d:[1,30,2]}
        ],
		collisionBox:['C',32],
    });
	
};

// 变成炸弹
QJ.MPMZ.tl.ex_turnIntoBomb = function(target) {
	
	  if (target instanceof Game_Event) {
		  let eid = target._eventId;
		  let id = "adjustment" + eid;
		  let filterTarget = 4000 + eid;
		  $gameMap.createFilter(id, "adjustment", filterTarget);
		  $gameMap.setFilter( id ,[1,1,1,1,1,1,1,1]);
		  $gameMap.moveFilter(id, [1,1,1,2,0.6,0,0,1], 180);
		  let scale = 1;
		  if (target._boxBodyQJ) {
			  if (target._boxBodyQJ.type === 1) {
				 scale = (target._boxBodyQJ.w + target._boxBodyQJ.h) / 64; 
			  } else {
				 scale = target._boxBodyQJ.r / 20; 
			  }
		  }
		  let code = "QJ.MPMZ.tl.ex_JackBomb(" + eid + ",1,"+ scale +")";

		  var se = { name: "爆弾の燃焼", volume: 70, pitch: 100, pan: 0 };
		  AudioManager.playSe(se);
          
		  let posX = `$gameMap.event(${eid}) ? $gameMap.event(${eid}).screenShootXQJ() : $gameMap.displayX()`;
		  let posY = `$gameMap.event(${eid}) ? $gameMap.event(${eid}).screenShootYQJ()-12 : $gameMap.displayY()`;
		  QJ.MPMZ.Shoot({
   		      //img: ["I",1093], 
			  moveType: ['D', true],
   		      scale:0.4, 
			  anchor:[0.5,1], 
			  initialRotation: ['S', 0],
    	      position: [['S',posX], ['S',posY]], 
			  imgRotation: ['F'],
   		      groupName: ['turnIntoBomb'], 
			  collisionBox: ['C', 6],
			  //timeline:['S',0,12,[-1,1,6]],
   		      existData: [
      		      //{ t:['G',['"enemy"','"object"']], a:['F',QJ.MPMZ.tl.ex_JackBombExplode,[1]], c:['S','this.time > 180'] }
				  { t:['Time',180] }
   		      ],
			  deadJS:[
                  `let id = "adjustment" + ${eid};$gameMap.eraseFilter(id);
				  AudioManager.playSe({ name: "Explosion2", volume: 85, pitch: 100, pan: 0 });
				  ${code}`			  
			  ]
		  });
	 }	
};


//卢恩之石:Ehwaz
QJ.MPMZ.tl.ex_runes_Ehwaz = function() {
	
   let ImgIndex = $gameParty.lastItem().iconIndex;   
   QJ.MPMZ.Shoot({
        img:['I',ImgIndex],position:[['P'],['P']],
        initialRotation:['S',0],imgRotation:['F'],
        moveType:['B',-1,0,-30,0,-30,0,-30,0,-30],
        scale:[0.5,0.5],
        existData:[
        {t:['Time',1200]},
		{t:['S','TouchInput.drill_isLeftPressed()',true],a:['F',QJ.MPMZ.tl.ex_runes_EhwazShoot]},  
        ],
		trailEffect:[],
    });
	
};

QJ.MPMZ.tl.ex_runes_EhwazShoot = function() {
	$gamePlayer.drill_EASA_setEnabled( true );
    let ImgIndex = $gameParty.lastItem().iconIndex; 
    QJ.MPMZ.Shoot({
		groupName:['runes','Ehwaz'],
        img:['I',ImgIndex],
        position:[['P'],['P']],
        initialRotation:['M'],
        moveType:['S','0|9~120/0~999/0'],
		scale:[0.5,0.5],
        imgRotation:['R',16,true],
        existData:[	
		{t:['Time',120]},
		{t:['NP']},
		{t:['G',['"enemy"','"NPC"']],a:['S','QJ.MPMZ.tl.ex_runes_EhwazSwap.call(this,target)']}
        ],
		collisionBox:['C',32],
    });
	
};

QJ.MPMZ.tl.ex_runes_EhwazSwap = function(target) {
	  if (target instanceof Game_Event) {
		  let AX = target.centerRealX(); 
		  let AY = target.centerRealY();
          let BX = $gamePlayer.centerRealX(); 
		  let BY = $gamePlayer.centerRealY();

		  var se = { name: "Darkness3", volume: 90, pitch: 100, pan: 0 };
		  AudioManager.playSe(se);

		  let EID = target._eventId;
		  let Event = "event:" + EID;
		  let Ename = "monster_sp-" + EID;
		  $gameScreen._particle.particleSet(0,Ename,Event,"monster_sp");
		  $gameScreen._particle.particleSet(0,"monster_sp-P","player","monster_sp");
          $gamePlayer.locate(AX, AY);
          target.locate(BX, BY);
	 }
};


//爆炸物
QJ.MPMZ.tl.ex_explosiveBullet = function(eid) {
    
    let position = [['P'],['P']];
	if (eid) {
		let posX = `$gameMap.event(${eid}) ? $gameMap.event(${eid}).screenShootXQJ() : $gameMap.displayX()`;
		let posY = `$gameMap.event(${eid}) ? $gameMap.event(${eid}).screenShootYQJ() - 24 : $gameMap.displayY()`;	
		position = [['S',posX],['S',posY]];
	}

    QJ.MPMZ.Shoot({
		groupName: ['JackBomb'],
        img:'MGC_W2_Explosion_V4_Lv1[5,10,2]',
        position:position,
		scale:[1,1],
        initialRotation:['S',0],
        imgRotation:['F'],
		opacity:1,
		hue:0,
        moveType:['S',0],
        blendMode:1,
        existData:[	
		   {t:['Time',98]},
        ],       
		moveF:[[16,999,QJ.MPMZ.tl.ex_JackBombExplode,[0,200,1]]],
    });
}	

//杰克爆弹演出
QJ.MPMZ.tl.ex_JackBombEffect = function(xx,yy,type,boomScale) {
	
	let eveX = Math.floor((xx / 48) + $gameMap.displayX()); 
    let eveY = Math.floor((yy / 48) + $gameMap.displayY()); 
	
	var HUE;
	var damage;
	if (!boomScale) var boomScale = 1;
    switch(type) {
    case 1:
        HUE = 0;
		damage = 200; 
        break;
    case 2:
        HUE = 171;
		damage = 40; 
        break;
    case 3:
        HUE = 244;
		damage = 40; 
        break;
    default:
        HUE = 0;
		damage = 200; 
        break;
    }
	var animation = QJ.MPMZ.Shoot({
        img:'MGC_W2_Explosion_V4_Lv1[5,10,2]',
        position:[['S',xx],['S',yy]],
		scale:boomScale,
        initialRotation:['S',0],
        imgRotation:['F'],
		opacity:1,
		hue:HUE,
		collisionBox:['C',1],
        moveType:['S',0],
        blendMode:1,
        existData:[	
		{t:['Time',98]},
        ],       
    });
		
    var effect = QJ.MPMZ.Shoot({
		groupName: ['JackBomb'],
        position:[['S',xx],['S',yy]],
		scale:boomScale,
        initialRotation:['S',0],
        imgRotation:['F'],
		opacity:0,
		hue:HUE,
		collisionBox:['C',60],
        moveType:['S',0],
        blendMode:1,
        existData:[	
		{t:['Time',98]},
		{t:['P'],a:['F',QJ.MPMZ.tl.ex_JackBombExplode,[type]],p:[-1,false,true],c:['S','this.time > 12 && this.time < 24']},
		{t:['G',['"enemy"','"object"']],a:['F',QJ.MPMZ.tl.ex_JackBombExplode,[type]],p:[-1,false,true],c:['S','this.time > 12 && this.time < 24']},
		{t:['R',[8,248]],a:['F',QJ.MPMZ.tl.bombInWaterEffect],p:[-1,false,true],cb:['C',1],c:['S','this.time > 12 && this.time < 24']},
        ],       
    });
};

// 炸弹在水中的效果/炸鱼
QJ.MPMZ.tl.bombInWaterEffect = function(xx,yy) {

    if (!xx || !yy) {
	    xx = this.x / 48; 
        yy = this.y / 48; 		
	}
	
	let chance = 500 + Math.randomInt(2000);
    let luk = $gameParty.leader().luk;
        luk = Math.max(0, Math.min(999, luk));
        chance = chance + (luk / 999) * 9000;
    // 阴天气概率增加
	if ($gameVariables.value(60) == 1) chance += 1000 + Math.randomInt(1000);		
	// 下雨天气概率增加
	if (hasRainParticle()) chance += 3000 + Math.randomInt(2000);
	//  诱饵效果
	let bait = QJ.MPMZ.rangeAtk([['S', this.inheritX()],['S', this.inheritY()]],['B','bait'],[],['C',20]).length;
	if (bait > 0) {
		chance += 3000 + bait * 2000;
	}
	
	if (Math.randomInt(10000) > chance) return;
	let maxFishing = $gameSelfVariables.value([$gameMap.mapId(), 1, 'maxFishing']);
	if (maxFishing <= 0) return;
	// 避开初始化标记的1
	if (maxFishing <= 2) {
		maxFishing = 0;
	} else {
		maxFishing -= 1;
	}
	$gameSelfVariables.setValue([$gameMap.mapId(), 1, 'maxFishing'], maxFishing);
    let value = $gameSelfVariables.value([1, 1, 'bombFishing']);
	    value += 1;
	$gameSelfVariables.setValue([1, 1, 'bombFishing'], value);	
	// 炸出敌人	
	let enemyChance = 0.2;	
	// 诱饵效果会提升敌人出现概率
	//enemyChance = enemyChance + (Math.max(0, chance) / 18000 * 0.9);
	enemyChance += bait * 0.2;
	
	if(enemyChance > Math.random()) {
    let posX = this.inheritX();
    let posY = this.inheritY();
    QJ.MPMZ.Shoot({
        img:"60FPS_ASWater_04_Geyser[5,6,1]",
        position:[['S',posX],['S',posY]],
        initialRotation:['S',0],
		scale:[0.8,0.8],
        imgRotation:['F'],
		anchor:[0.5,0.65],
        collisionBox:['C',1],
		opacity:0.8,
        moveType:['S',0],
		blendMode:3,
        existData:[	
           {t:['Time',29]},
        ],
    });		
	 AudioManager.playSe({ name: "Water1", volume: 70, pitch: 100, pan: 0 });
	 
function weightedPickEid(list) {
  if (!list || !list.length) return null;

  // 过滤非法/非正权重，并把权重转成数值
  var pool = [];
  for (var i = 0; i < list.length; i++) {
    var w = Number(list[i].weight);
    if (isFinite(w) && w > 0) pool.push({ eid: list[i].eid, weight: w });
  }
  if (!pool.length) return null;

  // 求总权重并在 [0, total) 上采样
  var total = 0;
  for (var j = 0; j < pool.length; j++) total += pool[j].weight;

  var r = Math.random() * total;
  for (var k = 0; k < pool.length; k++) {
    if (r < pool[k].weight) return pool[k].eid;
    r -= pool[k].weight;
  }
  // 理论到不了这里，容错返回最后一个
  return pool[pool.length - 1].eid;
}	 
	 
     let enemyList = [
            {eid: 26, weight: 40},
            {eid: 73, weight: 50},
            {eid: 42, weight: 10}
        ];
	 // 渔力超过上限值后开始出现新的敌人分布
	 if (chance > 10000) {
		 if ($gameSelfVariables.value([$gameMap.mapId(), 1, 'waterArea']) > 20) { 
		     let value = 5;
			 value +=  Math.round((chance - 10000) / 100);
			 let reSpawn = $gameSelfVariables.value([1, 28, 'reSpawn']);
			 if ($gameSystem.day() >= reSpawn) { 
		         enemyList.push({eid: 28, weight: value});
			 }
		}
	 }
     let enemy = weightedPickEid(enemyList);
	 let eid = $gameMap.spawnEventQJ(1,enemy,xx,yy,false);
	 let e   = $gameMap.event(eid);
	 if (!e) return;
     let condition = DrillUp.g_COFA_condition_list[10];
     let c_area = $gameMap.drill_COFA_getShapePointsWithCondition(Math.floor(xx), Math.floor(yy), "圆形区域", 5, condition);	 
        if (c_area.length > 0) {
                let p = c_area[Math.floor(Math.random() * c_area.length)];
                let xPlus = p.x - xx;
                let yPlus = p.y - yy;
                e.jump(xPlus, yPlus);
        } else {
                e.jump(0, 0);
        }	 
	 AudioManager.playSe({ name: "Jump2", volume: 80, pitch: 80 + Math.randomInt(40), pan: 0 });		
		return;
	}	
	
	// 炸鱼出货演出
    let posX = this.inheritX();
    let posY = this.inheritY();	
    QJ.MPMZ.Shoot({
        img:"Water_Spell_1[13,4]",
        position:[['S',posX],['S',posY]],
        initialRotation:['S',0],
		scale:1,
        imgRotation:['F'],
		anchor:[0.5,0.65],
        collisionBox:['C',1],
		opacity:1,
        moveType:['S',0],
		blendMode:1,
        existData:[	
           {t:['Time',51]},
        ],
		moveF: [
		   [16,999,dingk.Loot.specifiedLocationGenerateDrops,[110,Math.floor(xx),Math.floor(yy)]]
		]
    });	
}

//杰克爆弹演出
QJ.MPMZ.tl.ex_JackBomb = function(user, type = 1, scale) {

    let posX = 0;
    let posY = 0;
    let bombScale = 1;	
	let HUE = 0;
	let damage = 200;
	let isBullet = this && this instanceof Game_QJBulletMZ;
	
	if (isBullet) {
		posX      = this.inheritX(); 
		posY      = this.inheritY(); 
		bombScale = this.scaleX;
		type      = this.data.bombType;
	} else {
	if (!$gameMap.event(user)) return;

    posX = `$gameMap.event(${user}) ? $gameMap.event(${user}).screenShootXQJ() : $gameMap.displayX()`;
    posY = `$gameMap.event(${user}) ? $gameMap.event(${user}).screenShootYQJ() : $gameMap.displayY()`;	
	if (scale) {
		bombScale = scale;
	}
	if ($gameParty.leader().hasSkill(33)) {
		bombScale += $gameParty.leader().skillMasteryLevel(33) / 100;
	 }
	}

    switch(type) {
    case 1:
        HUE = 0;
		damage = 200; 
		AudioManager.playSe({ name: "Explosion2", volume: 80, pitch: 90+Math.randomInt(20), pan: 0 });
        break;
    case 2:
        HUE = 171;
		damage = 40;
        AudioManager.playSe({ name: "Ice6", volume: 80, pitch: 90+Math.randomInt(20), pan: 0 });		
        break;
    case 3:
        HUE = 244;
		damage = 40;
        AudioManager.playSe({ name: "Explosion1", volume: 80, pitch: 90+Math.randomInt(20), pan: 0 });		
        break;
     }
	
    let bombeffect = QJ.MPMZ.Shoot({
		groupName: ['JackBomb'],
        img:'MGC_W2_Explosion_V4_Lv1[5,10,2]',
        position:[['S',posX],['S',posY]],
		scale:bombScale,
        initialRotation:['S',0],
        imgRotation:['F'],
		opacity:1,
		hue:HUE,
		collisionBox:['C',60],
        moveType:['S',0],
        blendMode:1,
        existData:[	
			{t:['Time',98]},
			{t:['P'],a:['F',QJ.MPMZ.tl.ex_JackBombExplode,[type]],p:[-1,false,true],c:['S','this.time > 12 && this.time < 24']},
			{t:['G',['"enemy"','"object"','isExplodable']],a:['F',QJ.MPMZ.tl.ex_JackBombExplode,[type]],p:[-1,false,true],c:['S','this.time > 12 && this.time < 24']},
    	    {t:['B',['Destructible']],a:['F',QJ.MPMZ.tl.ex_JackBombExplode,[type]],p:[-1,false,true],c:['S','this.time > 12 && this.time < 24']},
			{t:['R',[8,248]],a:['F',QJ.MPMZ.tl.bombInWaterEffect],p:[-1,false,true],cb:['C',1],c:['S','this.time > 12 && this.time < 24']},
        ],       
    });
	
	if (type === 2) {
		// 冰霜杰克爆弹的冰地板
		bombeffect.addMoveData("F",[10,999,QJ.MPMZ.tl.ex_frozenEarth]);
	}	
	if (type === 3) {
		// 剧毒杰克爆弹的毒雾
		bombeffect.addMoveData("F",[40,999,QJ.MPMZ.tl.generatePoisonFog]);
	}
	// 纵火狂手套
	if (!isBullet && $gameParty.leader().hasSkill(33)) {		
		let chance = 10 + 8 * ($gameParty.leader().skillMasteryLevel(33)/30);
		if (chance > Math.randomInt(100)) {
        bombeffect.addMoveData("F",[24,999,QJ.MPMZ.tl.ex_bombFiendSoul,[null,null,true,true]]);
	  }
	}	
};

//杰克爆弹爆炸伤害判定
QJ.MPMZ.tl.ex_JackBombExplode = function (type, args) {
  if (!(this instanceof Game_QJBulletMZ)) return;
  if (!args) return;

  const posX    = this.inheritX();
  const posY    = this.inheritY();
  const tarX    = args.target?.screenBoxXShowQJ() || 0;
  const tarY    = args.target?.screenBoxYShowQJ() || 0;
  const scaleXY = this.scaleX;

  // 炸弹魔抗性
  const resist = 1 * (0.5 ** $gameParty.leader().skillMasteryLevel(34));
  
  // 命中弹幕的场合
  if (args.bulletTarget && args.bulletTarget instanceof Game_QJBulletMZ) {
	  const damage = Math.floor(233 * scaleXY * resist);
	  QJ.MPMZ.tl.ex_toBulletAttack.call(this, damage, {noHitEffect:true, independentAttack:true, noDurLoss:true}, args);
	  return;
  }

  let angle = 0;
  const isPlayer = args.target instanceof Game_Player;
  const isEvent  = args.target instanceof Game_Event;

  // 普通炸弹的通用击退流程
  const knockback = () => {
    angle = QJ.calculateAngleByTwoPointAngle(posX, posY, tarX, tarY);
    if (!Number.isFinite(angle)) angle = 0;

    if (isPlayer) {
      const damage = Math.floor(233 * scaleXY * resist);
      QJ.MPMZ.tl.ex_playerDamageCheck(damage, 2);
      QJ.MPMZ.tl.ex_jumpWithAngle(-1, angle, 2);
    } else if (isEvent) {
      const eventId = args.target._eventId;
      const damage  = Math.floor(233 * scaleXY);
      QJ.MPMZ.tl.ex_toEnemyAttack.call(
        this,
        damage,
        { noHitEffect: true, noDurLoss: true, magicAttack: true, independentAttack: true },
        args
      );
      QJ.MPMZ.tl.ex_jumpWithAngle(eventId, angle, 2);
    }
  };

  switch (type || 1) {
    case 1: {
      // 普通炸弹（击退）
      knockback();
      break;
    }
    case 2: {
      // 冰霜炸弹
      if (isPlayer) {
        const damage = Math.floor(66 * scaleXY);
        QJ.MPMZ.tl.ex_playerDamageCheck(damage, 3, 9, 100); // 必定冻结
      } else if (isEvent) {
        const eventId = args.target._eventId;
        const damage  = Math.floor(66 * scaleXY * resist);
        $gameMap.steupCEQJ(151, eventId, { sendValue: [damage] });
        QJ.MPMZ.tl.ex_enemyFreeze.call(args.target);
      }
      break;
    }
    case 3: {
      // 猛毒炸弹
      if (isPlayer) {
        const damage = Math.floor(66 * scaleXY * resist);
        QJ.MPMZ.tl.ex_playerDamageCheck(damage, 3, 5, 100); // 必定中毒
      } else if (isEvent) {
        const eventId = args.target._eventId;
        const damage  = Math.floor(66 * scaleXY);
        $gameMap.steupCEQJ(151, eventId, { sendValue: [damage] });
        QJ.MPMZ.tl.ex_enemyPoison.call(args.target, 5);
      }	  
      break;
    }
    default: {
      // 默认：普通炸弹（击退）
      knockback();
      break;
    }
  }
};


// 生成毒雾
QJ.MPMZ.tl.generatePoisonFog = function(extraData = {},args) {

    if (extraData && extraData.dustExplosion) {
	  const target = args && args.bulletTarget;
      if (target) {
		// 清除诱饵演出
		let name = "PoisonFog" + this.data.decoyIndex;
		$gameScreen._particle.reservePluginCommand(1,{},["clear",name],1);
		// 粉尘爆炸
		QJ.MPMZ.tl.ex_bombFiendSoul.call(this,null,null,{scaleFix:1.3});
	  }
	  return;
	}
    let posX    = this.inheritX();
    let posY    = this.inheritY();
    let time    = 360;
	let index   = Math.randomInt(10000);
	let name    = "PoisonFog" + index;
	let range   = 80;
    QJ.MPMZ.Shoot({
        position:[['S',posX],['S',posY]],
		groupName: ['PoisonFog'],
        initialRotation:['S',0],
        moveType:['S',0],
		imgRotation:['F'],
		collisionBox:['C', range],
		scale:1,
		decoyIndex: index,
        existData:[
			{t:['Time',time]},
			{t:['G','"enemy"'],a:['F',QJ.MPMZ.tl.ex_toEnemyAttack, [
            1,
            {
			  magicAttack:true,
              orbitingDamage:true,
              noHitEffect:true,
              noDurLoss:true,
              specifyAddedStatus:true,
              addedStatusType:5,
              addedStatusChance:6600,
			  addedStatusDamage:2
            }
          ]],p:[-1,false,true], c:['T',0,30,true]},
			{t:['B','fire'],a:['F',QJ.MPMZ.tl.generatePoisonFog,[{dustExplosion:true}]],cb:['C',Math.round(range/2.5)]}
        ],
    });
    // 毒雾动画演出
      let xx   = (this.x - 30) / 48;
      let yy   = (this.y - 12) / 48;
      $gameScreen._particle.particleSet(0, name, 'tilemap', 'aura_static_b', 'above', xx, yy);
	  $gameScreen._particle.particleUpdate([name,'scale',"0","3@0.5","0.1@1.5","0"]);
	  $gameScreen._particle.particleUpdate([name,'alpha',"1"]);
	  $gameScreen._particle.particleUpdate([name,'color',"#460276"]);
      $gameScreen._particle.reservePluginCommand(360,{},["clear",name],1);	  
};

//炸弹魔之魂
QJ.MPMZ.tl.ex_bombFiendSoul = function(posX,posY,extraData = {}) {
	
	if (!posX || !posY) {
	  if (!this) return;
	  if (!(this instanceof Game_QJBulletMZ)) return;
    var posX = this.inheritX();
    var posY = this.inheritY();
	}	
	// 飞行道具需要校准坐标
	if (![1,2].includes($gameParty.leader().equips()[0].wtypeId) && !extraData.posFix) {
        posX +=  24 * Math.sin(this.rotationMove*Math.PI/180);
        posY += -24 * Math.cos(this.rotationMove*Math.PI/180);	
	}

	let bombScale = 1;
	if (extraData.scaleFix) {
	    bombScale *= extraData.scaleFix;
	}
	if ($gameParty.leader().hasSkill(33)) {
		bombScale += $gameParty.leader().skillMasteryLevel(33) / 100;
	}
		
	var type = 1;
	var HUE,damage;
    switch(type) {
    case 1:
        HUE = 0;
		damage = 200; 
        break;
    case 2:
        HUE = 171;
		damage = 40; 
        break;
    case 3:
        HUE = 244;
		damage = 40; 
        break;
    default:
        HUE = 0;
		damage = 200; 
        break;
    }
	var animation = QJ.MPMZ.Shoot({
        img:'MGC_W2_Explosion_V4_Lv1[5,10,2]',
        position:[['S',posX],['S',posY]],
		scale:bombScale,
        initialRotation:['S',0],
        imgRotation:['F'],
		opacity:1,
		hue:HUE,
		collisionBox:['C',1],
        moveType:['S',0],
        blendMode:1,
        existData:[	
		   {t:['Time',98]},
        ],
		moveJS:[
		   [12,999,"AudioManager.playSe({ name: 'Explosion2', volume: 80, pitch: 100, pan: 0 })"]
		]
    });
		
    var bombeffect = QJ.MPMZ.Shoot({
		groupName: ['JackBomb'],
        img:'null1',
        position:[['S',posX],['S',posY]],
		scale:bombScale,
        initialRotation:['S',0],
        imgRotation:['F'],
		opacity:0,
		hue:HUE,
		collisionBox:['C',60],
        moveType:['S',0],
        blendMode:1,
        existData:[	
		{t:['Time',98]},
		{t:['P'],a:['F',QJ.MPMZ.tl.ex_JackBombExplode,[type]],p:[-1,false,true],c:['S','this.time > 12 && this.time < 24']},
		{t:['G',['"enemy"','"object"','isExplodable']],a:['F',QJ.MPMZ.tl.ex_JackBombExplode,[type]],p:[-1,false,true],c:['S','this.time > 12 && this.time < 24']},
		{t:['R',[8,248]],a:['F',dingk.Loot.specifiedLocationGenerateDrops,[110,posX,posY]],p:[-1,false,true],cb:['C',1],c:['S','this.time > 12 && this.time < 24']},
        ],       
    });
	
	// 纵火狂手套
	if ($gameParty.leader().hasSkill(33) && !extraData.canTrigger) {
		let chance = 10 + 8 * ($gameParty.leader().skillMasteryLevel(33)/30);
		if (chance > Math.randomInt(100)) {
        bombeffect.addMoveData("F",[24,999,QJ.MPMZ.tl.ex_bombFiendSoul,[null,null,{posFix:true,canTrigger:true}]]);
	  }
	}		
	
};


//迟钝魔法，局部时停
QJ.MPMZ.tl.ex_SluggishFieldSpell = function() {

    if (!this) return;
	
	let posX = this.screenBoxXShowQJ();
    let posY = this.screenBoxYShowQJ();
    
	 var seNames = "Magic3";
     var randomPitch = 80;
     var se = { name: seNames, volume: 70, pitch: randomPitch, pan: 0 };
     AudioManager.playSe(se);	
	
    QJ.MPMZ.Shoot({
        img:'pipo-btleffect212_192[5,3,6]',
        scale:[2,1.5],
        position:[['S',posX],['S',posY]],
        initialRotation:0,
        moveType:['S',0],
        existData:[
            {t:['Time',80]}
        ],
        z:"MF_BG",
        opacity:0.66,
        blendMode:1,
        collisionBox:['C',1],
		moveF:[
		    [75,999,QJ.MPMZ.tl.ex_SluggishField]
		 ],
    });
}

QJ.MPMZ.tl.ex_SluggishField = function() {

	 var seNames = "Switch3";
     var randomPitch = 60;
     var se = { name: seNames, volume: 60, pitch: randomPitch, pan: 0 };
     AudioManager.playSe(se);		

	
	let posX = this.inheritX();
    let posY = this.inheritY();
	let time = 360;
	let inCode = 'QJ.MPMZ.tl.ex_eventHalt(1,' + time + ',this.time,target)';
	let outCode = 'QJ.MPMZ.tl.ex_eventHalt(2,' + time + ',this.time,target)';
    QJ.MPMZ.Shoot({
        img:'pipo-btleffect212_192[5,2,8]',
		groupName: ["timeStopField"],
        scale:[2,1.5],
        position:[['S',posX],['S',posY]],
        initialRotation:0,
        moveType:['S',0],
        existData:[
            {t:['Time',time],d:[1,30,0]},
			{t:['G',['"enemy"','"object"']],a:[],p:[-1,false,true,QJ.MPMZ.tl.ex_eventHalt,QJ.MPMZ.tl.ex_eventRestart]},
            {t:['B',['Stoppable','enemyBullet','playerBullet']],p:[-1,false,true,QJ.MPMZ.tl.ex_20_inFunc,QJ.MPMZ.tl.ex_20_outFunc]}
        ],
        z:"MF_BG",
        opacity:0.66,
        blendMode:1,
        collisionBox:['C',60],
    });
}

//时停：事件停止
QJ.MPMZ.tl.ex_eventHalt = function(target) {
	
	let totalTime = this.data.existData[1].t[1];
    let leftover = totalTime - this.time;
  if (target instanceof Game_Event) {
	 let eid = 4000 + target._eventId;
	 let tag = "invert" + eid;
	 $gameMap.createFilter(tag, "invert", eid);
     $gameMap.setFilter(tag ,[1]);
	 target._IsDisabledCounter += leftover;
   }
}
//时停：事件恢复
QJ.MPMZ.tl.ex_eventRestart = function(target) {

   if (target instanceof Game_Event) {
	   let eventID = target._eventId;
	   let eid = 4000 + eventID;
	   let tag = "invert" + eid;
       $gameMap.eraseFilter(tag);
	 if ($gameSelfVariables.value([$gameMap.mapId(), eventID, 'preStored']) > 0) {
		 
		 var realDamage = $gameSelfVariables.value([$gameMap.mapId(), eventID, 'preStored']);
		 var currentHp = $gameSelfVariables.value([$gameMap.mapId(), eventID, 'HP']);
		 
		 $gameSelfVariables.setValue([$gameMap.mapId(), eventID, 'preStored'], 0); 
		$gameSelfVariables.setValue([$gameMap.mapId(), eventID, 'HP'], currentHp-realDamage);
		 target.showHpBar();
		 
		  if ($gameSelfVariables.value([$gameMap.mapId(), eventID, 'HP']) <= 0) {
			  $gameSelfSwitches.setValue([$gameMap.mapId(), eventID, 'D'], true);
		     }
		 }
	 }	  
};	  


//进入领域子弹减速
QJ.MPMZ.tl.ex_20_inFunc = function(target) {

    if (target) {
        //if (!target.remMoveType) {
        //    target.remMoveType = target.data.moveType;//记录原moveType
       // }
       // target.changeAttribute("moveType",['S',0.05]);//改变敌人弹幕，让其降速
       // if (!target.remRotation) {
      //      target.remRotation = target.data.imgRotation;//记录原转速
		// if(target.data.imgRotation[0] === 'R'){
		//	target.changeAttribute("imgRotation",['R',1,false]);//改变敌人弹幕的转速，让其降速
		//	}
		if (!target.remHue) {
          target.remHue = target.data.hue;//记录原色相
        }
        target.changeAttribute("hue",180);//改变敌人弹幕的色相，使其变成冷色调
		target.data.paused = true;
        }		   
};
//离开领域子弹恢复
QJ.MPMZ.tl.ex_20_outFunc = function(target) {
    if (target) {
        //target.changeAttribute("moveType",target.remMoveType);//立场不和敌人弹幕碰撞时复原moveType
		//target.changeAttribute("imgRotation",target.remRotation);//复原转速
		target.data.paused = false;
		target.changeAttribute("hue",target.remHue);//复原色相
    }
};



//巨蜗吸尘器使用监听
QJ.MPMZ.tl.ex_giantSnailVacuumsListener = function() {

	 if(!$gameParty.leader().equips()[0]) return;
	 if($gameMap.getGroupBulletListQJ('attackMonitoring').length > 0) return;
	 
       QJ.MPMZ.Shoot({
            groupName: ['attackMonitoring'],
            img: "null1",
            position: [['P'], ['P']],
            initialRotation: ['S',0],
            moveType: ['B',-1],
			opacity:0,
			collisionBox:['C',1],
            existData: [
            ],          
            moveJS: [
			   [30,10,"if(TouchInput.drill_isLeftPressed()){QJ.MPMZ.tl.ex_giantSnailVacuums()}"],
            ],
        });	
};

//巨蜗吸尘器
QJ.MPMZ.tl.ex_giantSnailVacuums = function(extra = {}, args) {
	
	
	if (extra.vacuumPulling) {
	  const target = args && args.bulletTarget;
	  if (target && !target._ManekiNeko) {
		  const dx = this.x - target.x;
		  const dy = this.y - target.y;
		  const dist = Math.hypot(dx, dy);

		  const nearDist = 40;   // 近距离阈值：<=40 时吸力最强
		  const farDist  = 480;  // 远距离阈值：>=240 时吸力最弱

		  // t: 0(远) -> 1(近)
		  const t = Math.max(0, Math.min(1, (farDist - dist) / (farDist - nearDist)));
		  const speed = 1 + 3 * (t * t);

		  const inv = 1 / (dist || 1);
		  target.x += dx * inv * speed;
		  target.y += dy * inv * speed;
		  return;
	  }
	  
	  const EVENT = args && args.target;
	  if (EVENT) {
		  let fudou = $gameSelfVariables.value([$gameMap.mapId(), EVENT._eventId, 'fudou']);
		  if (fudou > 20) return;
		  let dis = $gamePlayer.calcDistance(EVENT._eventId);
		  EVENT.dotMoveToPlayer();
		  if (dis < 450)  EVENT.dotMoveToPlayer();
		  if (dis < 250)  EVENT.dotMoveToPlayer();
		  // 吸引猫车商品的情形
		  if (Math.random() > 0.95 && EVENT.drill_COET_hasTag("商品")) {
			  let Asaba = $gameMap.drill_COET_getEventsByTag_direct("猫耳浅羽");
			  if (Asaba.length > 0) {
				 let eventId = Asaba[0]._eventId;
				 setTimeout(() => {
				     $gameSelfSwitches.setValue([$gameMap.mapId(), eventId, 'B'], true);
				 }, 400);
			  }
	      }			  
	  }
		  return;
	}
	

	if($gameMap.getGroupBulletListQJ('giantSnailVacuums').length > 0) return;
    var weaponImage = "weapon/weapon61";
	$dataMap.disableDashing = true;
	$gameSystem.setBgsLine(9);
    AudioManager.playBgs({ name: "掃除機の電源を入れる", volume: 60, pitch: 100, pan: 0 });
	
			QJ.MPMZ.Shoot({
			groupName:['giantSnailVacuums'],
			img:weaponImage,
			scale:[1,1],
			position:[['P'],['P']],
			initialRotation:['M'],
			imgRotation:['F'],
			moveType:['D',-1,0,0,0,0,0,0,0,0],
			anchor:[0.5,1],
			imgRotation:['F'],
			blendMode:0,
			z:"W",
			collisionBox:['C',5],
			existData:[
				{t:['S','!TouchInput.drill_isLeftPressed()',true],a:['S',"$dataMap.disableDashing = false"]},   
			],
			moveF:[[4,4,QJ.MPMZ.tl.ex_checkStickAlignment]],
			deadJS:["$dataMap.disableDashing=false;AudioManager.stopBgsByLine(9);AudioManager.playSe({ name: '掃除機の電源を切る', volume: 60, pitch: 100, pan: 0 })"]
		});	

			QJ.MPMZ.Shoot({
			groupName:['giantSnailVacuums'],
			img:"giantSnailVacuumsEffect[6,3]",
			scale:[1,1],
			position:[['P'],['P']],
			initialRotation:['M'],
			imgRotation:['F'],
			moveType:['D',-1,0,0,0,0,0,0,0,0],
			anchor:[0.4,1.87],
			opacity:0.75,
			imgRotation:['F'],
			blendMode:0,
			z:"W",collisionBox:['C',5],
			existData:[
				{t:['S','!TouchInput.drill_isLeftPressed()',true]},   
			],
		});	
	
            QJ.MPMZ.Laser({
                imgPoint:'null1',
                img:"null1",
				groupName:['giantSnailVacuums'],
                rotation:['M'],
                positionStatic:false,
                rotationStatic:false,
                z:"W",
				judgeMode:['W',1],
                position:[['P'],['P']],
                judgeWidth:42,length:['S',420,0,[]],
				positionSpread:60,
                existData:[
				   {t:['G',['"object"','drops','money','"enemy"','goods']],a:['F',QJ.MPMZ.tl.ex_giantSnailVacuums,[{vacuumPulling:true}]],p:[-1,true,true],c: ['T', 0, 1, true]},
				   {t:['B',['itemDrops']],a:['F',QJ.MPMZ.tl.ex_giantSnailVacuums,[{vacuumPulling:true}]],p:[-1,true,true],c: ['T', 0, 1, true]},
				   {t:['S','!TouchInput.drill_isLeftPressed()',true]},
                ],
                
            })
};

//吸尘器吸引效果
QJ.MPMZ.tl.ex_giantSnailVacuumsEffect = function(target) {
	
    let fudou = $gameSelfVariables.value([$gameMap.mapId(), target._eventId, 'fudou']);	
	if (!$gameMap.event(target._eventId) || fudou > 20) {
	  return;
	}
	
	if ($gamePlayer.calcDistance(target._eventId) > 450 ) {
	target.dotMoveToPlayer();
	} else if ( $gamePlayer.calcDistance(target._eventId) > 250 ) {
	target.dotMoveToPlayer();
	target.dotMoveToPlayer();	
	}  else if ( $gamePlayer.calcDistance(target._eventId) > 0 ) {
	target.dotMoveToPlayer();
	target.dotMoveToPlayer();
	target.dotMoveToPlayer();
	target.dotMoveToPlayer();		
	}
};


//=============================================================================
//环绕物
//=============================================================================

// 初始化环绕物、从者弹幕配置
QJ.MPMZ.tl.bulletConfig = {
  // 毒蛇之拥
  serpentEmbrace: function() {
    let level = 1 + $gameParty.leader().skillMasteryLevel(101);
    let actor = $gameParty.leader();
    let bulletDamage = Math.floor(actor.mat * 0.1) * level;
	let scale = 0.75 + (0.25 * level);
	let chance = 4000 + (level * 2000);
    let poisonDamage = level;
	// 安卓版刀光会报错
	let TrailEffect = [];
    if (!Utils.isMobileDevice()) {
        TrailEffect = [{
        img: ['L', 0.5, 1, 0, 0.999999999, 0.4, 0, 0, 0],
        existTime: 0,
        blendMode: 1,
        alpha: 0.75,
        scale:scale,
        disappearTime: 20,
        imgStretchMode: 0,
        hOrV: true,
        aboveProjectile: true
      }];
    }	
	
	
    return {
      groupName: ['serpentEmbrace', 'surrounds','playerBullet','servant'],
      img: 'armor/armor45',
      moveEllipse: [64, 21],
      rotationSpeed: 3,
      scale: scale,

      existData: [
        {
          t:['G',['"enemy"']],
          a: ['F', QJ.MPMZ.tl.ex_toEnemyAttack, [
            bulletDamage,
            {
			  magicAttack:true,
              orbitingDamage:true,
              noHitEffect:true,
              noDurLoss:true,
              specifyAddedStatus:true,
              addedStatusType:5,
              addedStatusChance:chance,
			  addedStatusDamage:poisonDamage
            }
          ]],
          p: [-1, false, true],
		  c:['S','!$gameMessage.isBusy()']
        }
      ],

      trailEffect: TrailEffect,
      collisionBox: ['C', 8]
    };
  },

  // 愤怒的拳头
  FacePunchGloves: function() {
    let level = 1 + $gameParty.leader().skillMasteryLevel(101);	  
    let actor = $gameParty.leader();
    let bulletDamage = (10 + Math.floor(actor.atk * 0.1)) * level;
	let scale = 0.5 + (0.2 * level);
	let power = level;
    return {
      groupName: ['FacePunchGloves', 'surrounds','servant'],
      img: 'armor/armor46',
      moveEllipse: [72, 32],
      rotationSpeed: 3,
      scale: scale,
      existData: [
        { t: ['G', '"enemy"'], a: ['F', QJ.MPMZ.tl.customPositionKnockbackTarget, [power]], p: [-1, false, true], c:['S','!$gameMessage.isBusy()'] },
        {
          t:['G',['"enemy"']],
		  c:['S','!$gameMessage.isBusy()'],
          a:['F',QJ.MPMZ.tl.ex_toEnemyAttack,[ bulletDamage, {orbitingDamage:true, noHitEffect:true, noDurLoss:true, specifyAddedStatus:true,addedStatusType:0} ]],
          p:[-1,false,true]
        },
      ],
      collisionBox: ['C', 16]
    };
  }
};


// 玩家环绕物初始化
QJ.MPMZ.tl.ex_orbitingBulletInitialization = function(bulletTypes) {
	
    const numBullets = bulletTypes.length;
    // 先消灭环绕物
    QJ.MPMZ.deleteProjectile("surrounds");
    if (numBullets <= 0) return;
	
    for (let i = 0; i < numBullets; i++) {
        let bulletType = bulletTypes[i];
        let bulletGetter = QJ.MPMZ.tl.bulletConfig[bulletType];
        if (!bulletGetter) {
            console.warn(`未找到 '${bulletType}' 的配置`);
            continue;
        }

        // 如果 bulletGetter 是函数，则调用它得到配置对象
        let cfg = (typeof bulletGetter === "function") ? bulletGetter() : bulletGetter;

        let initialRotationValue = (360 / numBullets) * i;
        let bulletName = bulletType + '_' + i;

        // 深拷贝, 以防多次弹幕对 cfg 存在改动
        let clonedExistData = QJ.makeDeepCopy(cfg.existData);
       
        var surrounds = QJ.MPMZ.Shoot({
            groupName: cfg.groupName.concat(bulletName),
            img: cfg.img,
            position: [['P'], ['P']],
            initialRotation: ['S', initialRotationValue],
            moveType: ['C', -1, cfg.moveEllipse || [64, 21], cfg.rotationSpeed || 3,3],
            scale: cfg.scale || 1.0,
            collisionBox: cfg.collisionBox || ['C', 4],
            existData: clonedExistData || [],
			trailEffect: cfg.trailEffect || [],
            z: 'E',
            moveJS: [
              [2, 2, "var angle = ((this.rotationMove % 360) + 360) % 360;if (angle >= 60 && angle <= 100) {this.changeAttribute('z','E');} else {this.changeAttribute('z','W')}"]
            ]
        });
		// 逆咒缚契约
		if ($gameParty.leader().hasSkill(71)) {	 
	       let index = surrounds.index;
		   QJ.MPMZ.tl.ex_chainSpellBinding(undefined, index);		
		}		
    }
};


// 招财猫
QJ.MPMZ.tl.ex_ManekiNeko = function(target, extra={}, args) {
    
	if (extra.pickUp) {
	   const target = args && args.bulletTarget;	
	   if (!target || target._ManekiNeko) return;
	   target._ManekiNeko = true;	
	   target.changeAttribute("moveType",['TP',6,10,15]);
	   return;
	}
    let actor = $gameParty.leader(); 
	let eid = target._eventId;
	let equips = actor.equips().filter(equip => equip && equip.baseItemId === 36);
	    equips = equips.length;
	let level = 1 + $gameParty.leader().skillMasteryLevel(101);
	let range = 60 + (40 * level);
	    range = Math.round(range * (1 + equips * 0.5));
	
    let posX = `$gameMap.event(${eid}) ? $gameMap.event(${eid}).screenShootXQJ() : $gameMap.displayX()`;
    let posY = `$gameMap.event(${eid}) ? $gameMap.event(${eid}).screenShootYQJ() : $gameMap.displayY()`;
	let dCode = "if(this._needJS){$gameMap.clearSpawnEventQJ(" + eid + ")}";
	  var manekiNeko = QJ.MPMZ.Shoot({
             img:'null1',
		     moveType:['D',false],
			 groupName:['servant','manekiNeko'],
             position:[['S',posX],['S',posY]],
			 initialRotation:['S',0],
			 imgRotation:['F'],
			 extra:eid,
			 anchor:[0.5,0.5],
             existData:[
			      {t:['S',"$gameMap.drill_COET_getEventsByTag_direct('招财猫').length === 0",true],c:['T',60,60,true]},  
                  {t:['G',['drops']],a:[],p:[-1,true,true,QJ.MPMZ.tl.ex_ManekiNekoAttractsItems],c:['T',0,60,true]},
				  {t:['B',['itemDrops']],a:['F',QJ.MPMZ.tl.ex_ManekiNeko,[1, {pickUp:true}]],p:[-1,true,true],c:['T',0,60,true]},
             ],
			 moveF: [
			      [60,60,QJ.MPMZ.tl.ex_ManekiNekoRefreshDetectionRange]
			 ],
             collisionBox:['C',range],
			 deadJS:[dCode],
       });

		// 逆咒缚契约
		if ($gameParty.leader().hasSkill(71)) {	 
	       let index = manekiNeko.index;
		   QJ.MPMZ.tl.ex_chainSpellBinding(undefined, index);		
		}	   

};

// 招财猫-刷新探测范围
QJ.MPMZ.tl.ex_ManekiNekoRefreshDetectionRange = function(target) {

    if (!this) return;
    let actor = $gameParty.leader(); 
	let eid = target._eventId;
	let equips = actor.equips().filter(equip => equip && equip.baseItemId === 36);
	    equips = equips.length;
	let level = 1 + $gameParty.leader().skillMasteryLevel(101);
	let range = 70 + (40 * level);
	    range = Math.round(range * (1 + equips * 1));
	this.data.collisionBox = ['C',range];
    this.refreshBox();
	
};

// 招财猫-吸引物品
QJ.MPMZ.tl.ex_ManekiNekoAttractsItems = function(target, force) {
	
	if (target && target instanceof Game_Event) {
		
		if (target._drawn || (target.isJumping() && !force)) return;
		
		target._drawn = true;
		let eid = target._eventId; 		
		let itemType = $gameSelfVariables.value([$gameMap.mapId(), eid, 'dropsType']);
		itemType -= 1;
		// 检测武器格大小
		if (itemType === 1) {
		const limit = $gameParty.leader()._weaponAmountLimit + $gameParty.leader()._weaponAmountBonus;
	    const weapons = Object.values($gameParty._weapons).length;
	      if (weapons >= limit) {
		    target._drawn = false;
			return;
		  }
		}

		// 检测装备格大小
		if (itemType === 2) {
		const limit = $gameParty.leader()._armorAmountLimit + $gameParty.leader()._armorAmountBonus;
	    const armors = Object.values($gameParty._armors).length;
	      if (armors >= limit) {
		    target._drawn = false;
			return;
		  }
		}
		
		let itemId = $gameSelfVariables.value([$gameMap.mapId(), eid, 'dropsId']);		
		QJ.MPMZ.itemGiverCharacter(itemType,itemId,eid,1);
		$gameMap.clearSpawnEventQJ(eid);
		
	}
};


// 猪猪存钱罐
QJ.MPMZ.tl.ex_piggyBank = function(target) {
    
	if (!target) return;
    let actor = $gameParty.leader(); 
	let eid = target._eventId;
	let level = 1 + $gameParty.leader().skillMasteryLevel(101);
    let equips = actor.equips().filter(equip => equip && equip.baseItemId === 37);
	let range = 180 + (60 * level);

    for (var equip of equips) {
    var tag = "GearBinding" + equip.id; 
	var BName = 'piggyBank' + equip.id; 
    if ($gameMap.drill_COET_getEventsByTag_direct(tag).length == 0) { 
        target.drill_COET_addTag(tag); 
		$gameTemp._drill_COET_needRestatistics = true;
		break;
       }
    }
	
    let posX = `$gameMap.event(${eid}) ? $gameMap.event(${eid}).screenShootXQJ() : $gameMap.displayX()`;
    let posY = `$gameMap.event(${eid}) ? $gameMap.event(${eid}).screenShootYQJ() : $gameMap.displayY()`;
	let dCode = "if(this._needJS){$gameMap.clearSpawnEventQJ(" + eid + ")}";
	  var piggyBank = QJ.MPMZ.Shoot({
             img:'null1',
		     moveType:['D',false],
			 groupName:['servant','piggyBank',BName],
             position:[['S',posX],['S',posY]],
			 initialRotation:['S',0],
			 imgRotation:['F'],
			 extra:eid,
			 anchor:[0.5,0.55],
             existData:[
			      {t:['S',`$gameMap.event(${eid})`,false]},  
                  //{t:['G',['drops']],a:[],p:[-1,true,true,QJ.MPMZ.tl.ex_piggyBankChasingMoney],c:['T',0,30,true]},
				  {t:['B',['money']],a:['F',QJ.MPMZ.tl.ex_piggyBankChasingMoney],p:[-1,true,true],c:['T',0,30,true]},
				  {t:['B',['money']],a:['F',QJ.MPMZ.tl.ex_piggyBankCollectingMoney],p:[-1,true,true,],cb:['C',15]}
             ],
             collisionBox:['C',range],
			 deadJS:[dCode],
			 deadF:[
			    //[QJ.MPMZ.tl.ex_piggyBankDisappear,[tag]]
			 ]
       });		

		// 逆咒缚契约
		if ($gameParty.leader().hasSkill(71)) {	 
	       let index = piggyBank.index;
		   QJ.MPMZ.tl.ex_chainSpellBinding(undefined, index);		
		}      	 
};

// 猪猪存钱罐-拆卸装备消失
QJ.MPMZ.tl.ex_piggyBankDisappear = function(tag) {
	
	if (!this._needJS) return;
	
    if ($gameMap.drill_COET_getEventsByTag_direct(tag).length > 0) {
	    let eid = $gameMap.drill_COET_getEventsByTag_direct(tag)[0]._eventId;
		$gameMap.clearSpawnEventQJ(eid);
	}
};

// 猪猪存钱罐-追逐金钱
QJ.MPMZ.tl.ex_piggyBankChasingMoney = function(args) {

    if (args.bulletTarget instanceof Game_QJBulletMZ || args.bulletTarget instanceof Game_QJLaserMZ) {
		let eid = this.data.extra;
		let piggyBank = $gameMap.event(eid);
		if (!piggyBank) return;
		if (piggyBank._evolution) return;
		if (piggyBank._chasingMoney) {
			let mid = piggyBank._chasingMoney;
			if (!$gameMap._mapBulletsQJ[mid]) {				
				piggyBank._chasingMoney = null;
				return;	
			}		
		}
		let XX = args.bulletTarget.x / 48; 
		let YY = args.bulletTarget.y / 48; 
		piggyBank.moveToTarget(XX,YY);
		piggyBank._chasingMoney = args.bulletTarget.index;		
		
		return;
	}

	if (args.target && args.target instanceof Game_Event) {
		let target = args.target;
		if (!target.drill_COET_hasTag("money") || target.isJumping()) return;
		
		let eid = this.data.extra;
		let piggyBank = $gameMap.event(eid);
		if (!piggyBank) return;
		if (piggyBank._evolution) return;
		if (piggyBank._chasingMoney) {
			let mid = piggyBank._chasingMoney;
			if ($gameMap.event(mid)) {
				if (piggyBank._moverData && piggyBank._moverData.targetFar == 0) {
					piggyBank._chasingMoney = null;
				}
			} else {
				piggyBank._chasingMoney = null;
			}
            return;			
		}
		let XX = (target.screenBoxXShowQJ() / 48) + $gameMap.displayX(); 
		let YY = (target.screenBoxYShowQJ() / 48) + $gameMap.displayY();
		piggyBank.moveToTarget(XX,YY);
		piggyBank._chasingMoney = target._eventId;
		return;
	}

	if (args && args instanceof Game_Event) {
		let target = args;
		if (!target.drill_COET_hasTag("money") || target.isJumping()) return;
		
		let eid = this.data.extra;
		let piggyBank = $gameMap.event(eid);
		if (!piggyBank) return;
		if (piggyBank._evolution) return;
		if (piggyBank._chasingMoney) {
			let mid = piggyBank._chasingMoney;
			if ($gameMap.event(mid)) {
				if (piggyBank._moverData && piggyBank._moverData.targetFar == 0) {
					piggyBank._chasingMoney = null;
				}
			} else {
				piggyBank._chasingMoney = null;
			}
            return;			
		}
		let XX = (target.screenBoxXShowQJ() / 48) + $gameMap.displayX(); 
		let YY = (target.screenBoxYShowQJ() / 48) + $gameMap.displayY();
		piggyBank.moveToTarget(XX,YY);
		piggyBank._chasingMoney = target._eventId;
		return;
	}
};

// 猪猪存钱罐-吸收金钱
QJ.MPMZ.tl.ex_piggyBankCollectingMoney = function(args) {

    if (args.bulletTarget instanceof Game_QJBulletMZ || args.bulletTarget instanceof Game_QJLaserMZ) {
		let eid = this.data.extra;
		let piggyBank = $gameMap.event(eid);
		if (!piggyBank) return;
		
		let soundName = "ANIMAL-PIG-Grunt-" + Math.randomInt(3); 
		AudioManager.playSe({name: soundName, volume: 90, pitch: 100, pan: 0}); 
		
		piggyBank.drill_EASe_stopAct();
		
		if (piggyBank.drill_COET_hasTag("贪欲存钱罐")) {
		    piggyBank.drill_EASe_setSimpleStateNode( ["变身待机"] );
	        piggyBank.drill_EASe_setAct( "捡金币2" );			
		} else {
	        piggyBank.drill_EASe_setAct( "捡金币" );			
		}
		setTimeout(() => {
		   let soundName = "ANIMAL-PIG-Grunt-" + Math.randomInt(3); 
		   AudioManager.playSe({name: soundName, volume: 90, pitch: 100, pan: 0}); 	
        }, 330);		
        AudioManager.playSe({ name: "レジスターで精算", volume: 80, pitch: Math.randomInt(30) + 91, pan: 0 });
		let itemId = args.bulletTarget.data.itemId;
		let money  = $dataItems[itemId];
		if (!money) return;
		let price = money.price;
		let deposit = $gameSelfVariables.value([1, 110, 'deposit']);
		// 增加总存款
		$gameSelfVariables.setValue([1, 110, 'deposit'], deposit + price);
		// 额外计算单个存钱罐存款	
	    let tags = piggyBank._drill_COET_tag || [];
	    for (let tag of tags) {
		   let match = tag.match(/^GearBinding(\d+)$/); 
		   if (match) { 
		       let extractedNumber = parseInt(match[1], 10); 
			   let depositIndex    = "deposit" + extractedNumber; 
			   let singleValue     = $gameSelfVariables.value([1, 110, depositIndex]);
			   singleValue += price;
			   $gameSelfVariables.setValue([1, 110, depositIndex], singleValue);
			   break;   
			}  
		}		
		
		let ownerEid = args.bulletTarget.data.ownerEid;
		$gameMap._backUpSpawnEventDataQJ = $gameMap._backUpSpawnEventDataQJ || {};
		delete $gameMap._backUpSpawnEventDataQJ[ownerEid];
		args.bulletTarget.setDead({t:['Time', 0], d:[1, 20, 1.5]});	

	    if ( piggyBank.drill_COET_hasTag("贪欲存钱罐") ) return;
        // 猪猪存钱罐进化
        if ( deposit + price >= 1000000 ) {
		    piggyBank._evolution = true;
		    $gameSelfSwitches.setValue([$gameMap.mapId(), piggyBank._eventId, 'B'], true); 
	    }		
		return;
	}
	
};

// 猪猪存钱罐-吸收金钱效果
QJ.MPMZ.tl.ex_piggyBankCollectingMoneyEffect = function(piggyBank) {
	/*
   if (!piggyBank) return;
   let tags = piggyBank._drill_COET_tag || [];
   for (let tag of tags) {
       let match = tag.match(/^GearBinding(\d+)$/); 
       if (match) { 
	   var extractedNumber = parseInt(match[1], 10); 
           break;   
		}  
	}
	let depositIndex = "deposit" + extractedNumber; 
	let dropsId = $gameSelfVariables.get(this, 'dropsId');
	let item = $dataItems[dropsId]; 
	let price = item.price;
	let value = $gameSelfVariables.value([1, 110, depositIndex]);  
	value += price;
	$gameSelfVariables.setValue([1, 110, depositIndex],value);
	
	if ( piggyBank.drill_COET_hasTag("贪欲存钱罐") ) return;
	
    // 猪猪存钱罐进化
     if ( $gameSelfVariables.value([1, 110, 'deposit']) >= 1000000 ) {
		piggyBank._evolution = true;
		$gameSelfSwitches.setValue([$gameMap.mapId(), piggyBank._eventId, 'B'], true); 
		//$gameSelfVariables.setValue([1, 110, 'deposit'],0);
		//piggyBank.steupCEQJ(3);
	 }
	 */
};

// 猪猪存钱罐-失去存款
QJ.MPMZ.tl.ex_piggyBankLosesMoney = function(target) {
    if (!target) return;
    let eid = target._eventId;
    let tags = target._drill_COET_tag || []; 
    let extractedNumber = null;
    for (let tag of tags) {
        let match = tag.match(/^GearBinding(\d+)$/); 
        if (match) {
            extractedNumber = parseInt(match[1], 10); 
            break; // 只提取第一个匹配项
        }
    }	

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
    // 猪猪存钱罐物品破碎
    let armor = $dataArmors[extractedNumber];
    QJ.MPMZ.tl.ex_unequipPlayerSpecifiedEquipment(armor);
    // 累计被摧毁的次数
    $gameSelfVariables.addValue([1, 111, 'KillCount'], 1);
    // 失去存款
    let totalDeposit = $gameSelfVariables.value([1, 110, 'deposit']);  
    let depositIndex = "deposit" + extractedNumber;
    let deposit = $gameSelfVariables.value([1, 110, depositIndex]); 
    totalDeposit -= deposit;
    $gameSelfVariables.setValue([1, 110, depositIndex], 0);
	$gameSelfVariables.deleteValue([1, 110, depositIndex]);
    $gameSelfVariables.setValue([1, 110, 'deposit'], totalDeposit);
	let lossRate = (20 + Math.randomInt(30)) / 100;
	deposit = Math.floor(deposit * ( 1 - lossRate ));

    let posX = target.screenBoxXShowQJ();
    let posY = target.screenBoxYShowQJ();
    let pieces = splitDeposit(deposit); 
    // 例如 deposit=12400 => pieces=[ {coinValue:10000,count:1},{coinValue:1000,count:2},{coinValue:100,count:4} ]
    for (let piece of pieces) {
        let coinValue = piece.coinValue;
        let c = piece.count;
        if (c <= 0) continue;

        // 获取 itemId
        let itemId = coinValueToItemId(coinValue);
        QJ.MPMZ.Shoot({
            img:"null1",
            position:[['S',posX],['S',posY]],
            initialRotation:['S',0],
            imgRotation:['F'],
            collisionBox:['C',1],
            moveType:['S',0],
            existData:[	
                { t:['S',`$gameMap.event(${eid})`,false] },
				{ t:['Time',c]},
            ],
            moveJS:[
                [1,0,`
                   dingk.Loot.getMapDrops($gameMap.event(${eid}), $dataItems[${itemId}]);
                `],
                [1,0,"AudioManager.playSe({ name: 'Heal1', volume: 40, pitch: 130, pan: 0 })"],
            ]
        });
    }	
    // 消灭绑定子弹	
    let BName = 'piggyBank' + extractedNumber; 
    QJ.MPMZ.deleteProjectile(BName,{});		
};


// 黄金猪猪存钱罐-光环效果 
QJ.MPMZ.tl.ex_piggyBankGoldenHalo = function(target) {
	
    let actor = $gameParty.leader(); 
	let eid = target._eventId;
	let level = 1 + $gameParty.leader().skillMasteryLevel(101);
    let equips = actor.equips().filter(equip => equip && equip.baseItemId === 37);
	let scale = 1 + (level * 0.25);
	
    for (let equip of equips) {
    let tag = "GearBinding" + equip.id; 
	var BName = 'goldenPiggyBank' + equip.id; 
    if ($gameMap.drill_COET_getEventsByTag_direct(tag).length == 0) { 
        target.drill_COET_addTag(tag); 
		$gameTemp._drill_COET_needRestatistics = true;
		break;
       }
    }
	
    let posX = `$gameMap.event(${eid}) ? $gameMap.event(${eid}).screenShootXQJ() : $gameMap.displayX()`;
    let posY = `$gameMap.event(${eid}) ? $gameMap.event(${eid}).screenShootYQJ() : $gameMap.displayY()`;
	let dCode = "if(this._needJS){$gameMap.clearSpawnEventQJ(" + eid + ");$gameActors.actor(1).removeState(116);}";
	  var piggyBank = QJ.MPMZ.Shoot({
             img:'Light4[5,6,4]',
		     moveType:['D',true],
			 groupName:['servant','MamonAura','goldenPiggyBank',BName],
             position:[['S',posX],['S',posY]],
			 initialRotation:['S',0],
			 imgRotation:['F'],
			 extra:eid,
			 scale:scale,
			 blendMode:1,
			 opacity:0.75,
			 z:"E",
			 anchor:[0.5,0.52],
             existData:[
			      {t:['S',`$gameMap.event(${eid})`,false]},
				  {t:['B',['money']],a:['F',QJ.MPMZ.tl.ex_piggyBankChasingMoney],p:[-1,true,true],c:['T',0,30,true],cb:['C',240]},
				  //{t:['G',['drops']],a:['F',QJ.MPMZ.tl.ex_piggyBankChasingMoney],p:[-1,true,true],c:['T',0,30,true]},
				  {t:['B',['money']],a:['F',QJ.MPMZ.tl.ex_piggyBankCollectingMoney],p:[-1,true,true,],cb:['C',15]}
             ],
             collisionBox:['C',80],
			 moveF:[
			    [4,30,QJ.MPMZ.tl.ex_auraMamonsDemand],
				[300,600,QJ.MPMZ.tl.ex_piggyBankGenerateInterest],
			 ],
			 deadJS:[
			      dCode
			 ]
       });		
};

// 玛门的索取
QJ.MPMZ.tl.ex_auraMamonsDemand = function() {
	
	let check = QJ.MPMZ.getBulletNumberBM(-1,['C',15],["MamonAura"]);
	if (check > 0) {
		$gameActors.actor(1).addState(116);
	} else {
		$gameActors.actor(1).removeState(116);
	}
	
};

// 贪欲存钱罐-吐利息
QJ.MPMZ.tl.ex_piggyBankGenerateInterest = function() {
	
    let eid = this.data.extra;
	let target = $gameMap.event(eid);
	if (!target) return;
	
	let totalDeposit = $gameSelfVariables.value([1, 110, 'deposit']);
 	    totalDeposit *= (1 + 0.5 * $gameParty.leader().skillMasteryLevel(101));
	let interest = Math.floor(totalDeposit * 0.00015);
	if (interest < 10) return;
	
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
	
    let pieces = splitDeposit(interest); 
    // 例如 deposit=12400 => pieces=[ {coinValue:10000,count:1},{coinValue:1000,count:2},{coinValue:100,count:4} ]
    for (let piece of pieces) {
        let coinValue = piece.coinValue;
        let c = piece.count;
        if (c <= 0) continue;

        // 获取 itemId
        let itemId = coinValueToItemId(coinValue);
        QJ.MPMZ.Shoot({
            img:"null1",
            position:[['E',eid],['E',eid]],
            initialRotation:['S',0],
            imgRotation:['F'],
            collisionBox:['C',1],
            moveType:['S',0],
            existData:[	
                { t:['S',`$gameMap.event(${eid})`,false] },
				{ t:['Time',c]},
            ],
            moveJS:[
                [1,0,`
                   dingk.Loot.getMapDrops($gameMap.event(${eid}), $dataItems[${itemId}]);
                `],
                [1,0,"AudioManager.playSe({ name: 'Heal1', volume: 40, pitch: 130, pan: 0 })"],
            ]
        });
    }	
   	
};

//石像喷火(疑似废弃
QJ.MPMZ.tl.ex_flameSpewingStatueTrap1 = function(posId) {
	let posX = $gameMap.event(posId).screenBoxXShowQJ();
    let posY = $gameMap.event(posId).screenBoxYShowQJ() - 32;
	let angle = 120;
	if ($gameMap.event(posId).direction() === 4) {
		posX -= 15;		
		angle = 240;
	}
	if ($gameMap.event(posId).direction() === 6) {
		posX += 5;
		angle = 120;
	}
        QJ.MPMZ.Shoot({
            groupName: ['Flame','magic'],
            img: 'null1',
            position:[["S",posX],["S",posY]],
            initialRotation: ['S',0],
            moveType:['D',true],
			opacity:0.8,			
			anchor:[0.5,0.5],
			imgRotation:['S',0],
			collisionBox:['C',16],
            existData: [
               {t:['Time',190]},
            ],       
            z: "E",
            moveF: [
			  [0,1,QJ.MPMZ.tl.ex_flameSpewingStatueThrower1,[posId]]
            ]
        });	
};

//石像喷火
QJ.MPMZ.tl.ex_flameSpewingStatueTrap = function(initialize) {

   	this._coolDown = this._coolDown || 0;	
	if (this._coolDown > 0) {
	   this._coolDown -= 1;
	   if (this._coolDown == 0) {
		   this._actived = false;
		   this.changeAttribute("img","pressurePlate_off");
	   }
	}
    
    if ( initialize && initialize === "fire" ) {
	   if (!this._actived) {
		    this._actived = true;
			this.changeAttribute("img","pressurePlate_on");
			AudioManager.playSe( { name: "Switch3", volume: 65, pitch: 80, pan: 0 } );
	   }
       this._coolDown = 3;	   
	   let angle = 180;	
        QJ.MPMZ.Shoot({
            groupName: ['Flame','magic','Trap'],
            img: 'null1',
            position:[['Map',52],['Map',63]],
            initialRotation: ['S',0],
            moveType:['S',0],
			opacity:0.8,			
			anchor:[0.5,0.5],
			imgRotation:['S',0],
			collisionBox:['C',16],
            existData: [
               {t:['Time',6]},
            ],       
            z: "E",
            moveF: [
			  [1,1,QJ.MPMZ.tl.ex_flameSpewingStatueThrower,[angle]]
            ]
        });
	   if (this.time % 24 > 20) {	
		  AudioManager.playSe( { name: "Fire1", volume: 70, pitch: 100, pan: 0 } );
	   }
    }		
};

//石像喷火判定(疑似废弃
QJ.MPMZ.tl.ex_flameSpewingStatueThrower1 = function(posId) {
	
	let posX = $gameMap.event(posId).screenBoxXShowQJ();
    let posY = $gameMap.event(posId).screenBoxYShowQJ() - 32;
	let angle = 120;
	if ($gameMap.event(posId).direction() === 4) {
		//posX -= 5;
		angle = 235;
	}
	if ($gameMap.event(posId).direction() === 6) {
		//posX -= 5;
		angle = 125;
	}
	angle = 180;
	let number = 15 + Math.randomInt(15);
    let time = 30 + Math.randomInt(60);
    let speed = '0|' + (20 + Math.randomInt(6)) + '~90/0~300|0';
QJ.MPMZ.Shooter_ArcRange(['S',angle],{
	groupName: ['Flame'],
    position:[["S",posX],["S",posY]],
    img:'fire[11,4]',
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
},-6,6,number,6,0.5,1.5);

};

//石像喷火判定
QJ.MPMZ.tl.ex_flameSpewingStatueThrower = function(angle) {
	let posX = this.inheritX();
    let posY = this.inheritY();	
	let number = 5 + Math.randomInt(5);
    let time = 30 + Math.randomInt(60);
    let speed = '0|' + (4 + Math.randomInt(6)) + '~90/0~300|0';
QJ.MPMZ.Shooter_ArcRange(['S',angle],{
	groupName: ['Flame','fire'],
    position:[["S",posX],["S",posY]],
    img:'fire[11,4]',
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
	{t:['G',['"enemy"','"object"']],a:['C',151,[10,0,0]],p:[-1,false,true]},
    ]
},-5,5,number,15,0.01,0.8);

};

//茶会地狱宅急便预处理/猫车商店
QJ.MPMZ.tl.ex_chahuiExpressPreprocess = function(extra = {}) {	

  let posX = $gamePlayer.screenBoxXShowQJ();  
  let posY = $gamePlayer.screenBoxYShowQJ();  
  
  if (extra.WarningText) {
      let tag     = "nekoTruck";
      let index   = extra.WarningText || 10;	  
	  let langText = window.mapCommonEventDialogue?.[tag]?.[String(index)] || "There isn’t a wide enough lane!";
	  let text = "\\c[101]\\dDCOG[11:2:2:2]\\fs[28]" + langText;
	  // 弹出提示 + 音效
	  if ($gameTemp && $gameTemp.drill_GFTT_createSimple) {
		posX *= $gameScreen.zoomScale();
		posY *= $gameScreen.zoomScale();
		$gameTemp.drill_GFTT_createSimple([posX, posY], text, 5, 0, 60);
	  }
	  AudioManager.playSe({ name: "012myuu_YumeSE_SystemBuzzer01", volume: 100, pitch: 100, pan: 0 });
      return;
  }
  
  
  if ( [51, 53].includes($gameMap.mapId()) )  {
	  QJ.MPMZ.tl.ex_chahuiExpressPreprocess({WarningText:13});
	  return;
  }
  
  QJ.MPMZ.tl.removeAllBulletHitboxes();
  let bullet = QJ.MPMZ.Shoot({
				  position:[['S',posX],['S',posY]],
                  initialRotation:['S',0], 
				  imgRotation:['F'],
                  moveType:['D',true], 
				  anchor:[-0.04,0.5],
                  collisionBox:['R', 720, 150],
                  deadJS: [
				     ["QJ.MPMZ.tl.removeBulletHitbox(this._index)"]
				  ],
                  existData:[
						{t:['S',"$gameSelfSwitches.value([1, 41, 'A'])",true], a:['F',QJ.MPMZ.tl.ex_chahuiExpressPreprocess,[{WarningText:12}]], c:['S', "this.time > 29"]},
						{t:['NP'], a:['F',QJ.MPMZ.tl.ex_chahuiExpressPreprocess,[{WarningText:11}]], cb:['R',720, 48], c:['S', "this.time > 30"]},
						{t:['R',[8, 250, 254, 255]], a:['F',QJ.MPMZ.tl.ex_chahuiExpressPreprocess,[{WarningText:10}]], c:['S', "this.time > 30"]},
						{t:['Time',70], a:['F',QJ.MPMZ.tl.ex_chahuiExpress]}			 
                  ],
				  moveJS: [
						[35, 999, `let seName = Math.random() > 0.5 ? "車の警nk" : "車のクラクション";
								   AudioManager.playSe({name:seName, volume: 60, pitch: 100, pan: 0}); `]
				  ]				  
			    });	
  QJ.MPMZ.tl.showBulletHitbox( bullet.index, { color:0xff2a00, alpha:0.4 });

	
};

//茶会地狱宅急便警告
QJ.MPMZ.tl.ex_chahuiExpressWarning = function(type){

  var posX = $gamePlayer.screenShootXQJ() * $gameScreen.zoomScale();
  var posY = $gamePlayer.screenShootYQJ() * $gameScreen.zoomScale();


  var t = Number(type) | 0;
  if (t < 1 || t > 6) t = 1;

  // 语言：0=中文 1=日文 2=英文（其他值回退英文）
  var L = ConfigManager.language;
  if (L > 2)  L = 2;


  var MSG = {
    1: {
      0: "没有足够的空间进行召唤！",
      1: "召喚スペース不足！",
      2: "Not enough space to summon!"
    },
    2: {
      0: "系统忙碌中！请等待其他事件结束！",
      1: "システムがビジーです！他のイベント終了を待ってください！",
      2: "System busy! Please wait for other events to finish!"
    },
    3: {
      0: "正在举着其他物品！",
      1: "他の物を持ち上げています！",
      2: "Holding another item!"
    },
    4: {
      0: "水中无法召唤！",
      1: "水中では召喚できません！",
      2: "Cannot summon in water!"
    },
    5: {
      0: "附近有障碍物！",
      1: "近くに障害物がある！",
      2: "There’s an obstacle nearby!"
    },
    6: {
      0: "该武器无法使用铁砧修复！",
      1: "この武器は金床で修復できない！",
      2: "This weapon cannot be repaired with the anvil!"
    }
  };

  var langText = (MSG[t][L] != null) ? MSG[t][L] : MSG[t][2]; // 回退英文
  var text = "\\c[101]\\dDCOG[11:2:2:2]\\fs[28]" + langText;

  // 弹出提示 + 音效
  if ($gameTemp && $gameTemp.drill_GFTT_createSimple) {
    $gameTemp.drill_GFTT_createSimple([posX, posY], text, 5, 0, 60);
  }
  AudioManager.playSe({ name: "012myuu_YumeSE_SystemBuzzer01", volume: 100, pitch: 100, pan: 0 });
};

//茶会地狱宅急便监听器
QJ.MPMZ.tl.ex_chahuiExpressListener = function() {
	
	if (!this) return;
	let eid = this._eventId;
	let posX = this.screenBoxXShowQJ();
    let posY = this.screenBoxYShowQJ();
	let code = `$gameSelfSwitches.value([$gameMap.mapId(), ${eid}, 'D'])`;	
         QJ.MPMZ.Shoot({
            groupName: ['BossMonitor'],
            img: 'null1',
            position:[["S",posX],["S",posY]],
            initialRotation: ['S',0],
            moveType:['S',0],
			imgRotation:['S',0],
			collisionBox:['C',1],
            existData: [
               {t:['S',code,true]},
            ],       
            moveF: [
			  [30,20,QJ.MPMZ.tl.ex_chahuiExpressHealthCheck,[eid]]
            ]			
        });	  		
};

//茶会地狱宅急便血量监听
QJ.MPMZ.tl.ex_chahuiExpressHealthCheck = function(eid) {
	
	if (!$gameMap.event(eid)) return;
	let hp = $gameSelfVariables.value([$gameMap.mapId(), eid, 'HP']);
	let mhp = $gameSelfVariables.value([$gameMap.mapId(), eid, 'MHP']);
	let hpRate = hp / mhp;
	
	if ( hpRate < 0.98 && !this._hatred ) {
         var events = $gameMap.drill_COET_getEventsByTag_direct("猫耳浅羽");
         if (events.length > 0) {
         let eventId = events[0]._eventId;
         $gameSelfSwitches.setValue([$gameMap.mapId(), eventId, 'B'], true);
	     this._hatred = true;
		 this._asaba = eventId;
      } 		
	}

    if (!this._asaba || !$gameMap.event(this._asaba)) return;
	
	if ($gameMap.event(eid)._IsDisabledCounter > 0) {
		$gameMap.event(this._asaba)._IsDisabledCounter = $gameMap.event(eid)._IsDisabledCounter;
	}
	
};

//茶会地狱宅急便
QJ.MPMZ.tl.ex_chahuiExpress = function(extra = {}) {

  if (extra.exhaustFumes) {
     let posX = this._realX + 1;
     let posY = this._realY + 1.5;
     let name = "dust_walk" + this.time;
     $gameScreen._particle.particleSet(0, name, 'tilemap', 'dust_walk', 'below', posX, posY);     
	 $gameScreen._particle.reservePluginCommand(30,{},["clear",name],1);
     return;
  }

  if (extra.cryingCatgirls) {
	 let eid  = this._eventId; 
     let posX = `$gameMap.event(${eid})?.screenShootXQJ() + 144`;
     let posY = `$gameMap.event(${eid})?.screenShootYQJ() + 20`;
     QJ.MPMZ.Shoot({
         img:"NekoAsaba_Defeat", anchor:[0.22,1], 
         position:[['S',posX],['S',posY]], z:4,existData:[], 
         initialRotation:['S',0],imgRotation:['S',0],
         mapPassable:[false, false, false, false],
         collisionBox:['C',20],moveType:['D',true],
         moveJS: [
            [20, 20, `if (this._realY+0.4 >$gamePlayer.centerRealY()) {this.changeAttribute("z",4)} else {this.changeAttribute("z","E")}`]			
         ]
     });
     posX += "+40";
     posY += "-9";	 
     QJ.MPMZ.Shoot({
         img:"NekoMio_Defeat", anchor:[0.22,1], 
         position:[['S',posX],['S',posY]], z:4,existData:[], 
         initialRotation:['S',0],imgRotation:['S',0],
         mapPassable:[false, false, false, false],
         collisionBox:['C',20],moveType:['D',true],
         moveJS: [
            [20, 20, `if (this._realY+0.4 >$gamePlayer.centerRealY()) {this.changeAttribute("z",4)} else {this.changeAttribute("z","E")}`]
         ]
     });  
     return;
  }
	
  if (extra.commonOccurrence) {
      if ($gameSelfSwitches.value([1, 41, 'A'])) return;
      if ($gameVariables.value(60) > 1 || $gameSwitches.value(123)) return;
      if (Math.random() > 0.9) {
          $gameSelfSwitches.setValue([1, 41, 'A'], true);
          QJ.SE.spawnRegionNum(1,41,[110],1,true);
      }	  
     return;
  }	  
	
  $gameParty.gainItem($dataItems[53], -1);
  $gameSelfSwitches.setValue([1, 41, 'A'], true);
  let posX = this.inheritX() + 720;
  let posY = this.inheritY() - 24;	
  let time = 150;
  let speed = '0|11~' + time + '/0~999/0';
  
	// 车车本体
  let chahui = QJ.MPMZ.Shoot({
        img:"chahui_express[6,8]",
		groupName: ['chahuiExpress'],
        position:[['S',posX],['S',posY]],
        initialRotation:['S',270],
        imgRotation:['S',0],
        scale:1,
        opacity:'0|0~20/1~99999/0',
        moveType:['S',speed],
        blendMode:0,
		anchor:[0.5,0.5],
		collisionBox:['C',1],
        existData:[
          	{t:['S',"$gamePlayer.screenShootXQJ()>=this.inheritX()",true],a:['F',QJ.MPMZ.tl.ex_chahuiExpressNormalParking,[null]]},
        ],
		moveF:[
		   [1,1,QJ.MPMZ.tl.ex_chahuiExpress,[{exhaustFumes:true}]],
		   [time,99999,QJ.MPMZ.tl.ex_chahuiExpressNormalParking,[null]]
		],
        timeline:['S',0,10,[180,2,5]],
		//afterImage:['#bfb095','0|1~25/0~999/0',45,120],
        z: 5
    });
	
	let Bindex = chahui.index;
          posX = chahui.inheritX() + 12;
          posY = chahui.inheritY() - 76;	
     // 车车阴影
     QJ.MPMZ.Shoot({
        img:"chahui_express_shadow",
		groupName: ['chahuiExpressShadow'],
        position:[['S',posX],['S',posY]],
        initialRotation:['S',270],
        imgRotation:['S',0],
        scale:1,
		anchor:[0.5,0,5],
        opacity:0.6,
		collisionBox:['C',1],
        moveType:['S',speed],
        blendMode:2,
        existData:[
		  {t:['BE',Bindex]},  
        ],
        z:"E"
    });	
	
    posY = chahui.inheritY();		
	// 碰撞判定
     QJ.MPMZ.Shoot({
		groupName: ['chahuiExpressHitBox'],
        position:[['S',posX],['S',posY]],
        initialRotation:['S',270],
        imgRotation:['S',0],
        scale:1,
		anchor:[0.5,0],
        opacity:0,
		collisionBox:['R',260,60],
        moveType:['S',speed],
        blendMode:0,
        existData:[
		  {t:['BE',Bindex]},
          {t:['P'],a:['F',QJ.MPMZ.tl.ex_playerDamageCheck,[250,2]],p:[-1,false,true]},	  
		  {t:['P'],a: ['F', QJ.MPMZ.tl.customPositionKnockbackTarget, [3]],p:[-1,false,true]},
		  {t:['P'],a:['F',QJ.MPMZ.tl.ex_chahuiExpressNormalParking,[Bindex]]},	
		  {t:['G',['"enemy"','"object"']],a:['F',QJ.MPMZ.tl.ex_JackBombExplode,[0]],p:[-1,false,true]},	
        ],
    });	

};	

//茶会地狱宅急便-正常停车	
QJ.MPMZ.tl.ex_chahuiExpressNormalParking = function(bid) {

 let eveX = (this.x - 130) / 48;
 let eveY = (this.y - 4) / 48;
 let eid = $gameMap.spawnEventQJ(1,41,eveX,eveY,true);
 //this.changeAttribute("opacity",0);
 this.changeAttribute("moveType",['S',0]);
 if (!bid) return;
  // 和玩家发生了碰撞
 if ($gameMap.event(eid)) {
	 
     AudioManager.playSe({ name: "靴でブレーキ", volume: 60, pitch: 100, pan: 0 });	 
	 $gameMap.event(eid)._directionFix = false;
	 $gameMap.event(eid).setDirection(8);
	 $gameMap.event(eid)._directionFix = true;
	 $gameMap.event(eid).drill_COET_addTag('撞人');
	 $gameTemp._drill_COET_needRestatistics = true;
 }
 
    QJ.MPMZ.Shoot({
      img: "animehit[5,4]",
      initialRotation: ['S', 0],
      position: [['P'], ['P']],
      scale: 2,
      moveType: ['S', 0],
      opacity: 1,
      blendMode: 0,
      z: "MF_UG",
      existData: [
	  { t: ['Time', 19] }
	  ]
    }); 

 let bullet = $gameMap._mapBulletsQJ[bid];
  if (bullet) {
     bullet.changeAttribute("moveType",['S',0]);
  }

};

//茶会地狱宅急便-猫耳澪判定生成
QJ.MPMZ.tl.ex_chahuiExpressNPCDialogueTrigger = function() {
	
	if (!this) return;
    let posX = this.screenBoxXShowQJ() - 60;
    let posY = this.screenBoxYShowQJ();
    QJ.MPMZ.Shoot({
        img:"null1",
		groupName: ['shopkeeperMio'],
        position:[['S',posX],['S',posY]],
        initialRotation:['S',0],
        imgRotation:['F'],
        collisionBox:['R',48,72],
		anchor: [0.6, 0.2],
        moveType:['S',0],
        existData:[	
		  //{t:['Time',19]},
        ],
    });
};

//茶会地狱宅急便-商品互动文本
QJ.MPMZ.tl.ex_chahuiExpressGoodsTrigger = function() {
	if (!this) return;
    let eid = this._eventId;
    let itemId = this._dropItemId   || $gameSelfVariables.value([$gameMap.mapId(), eid, 'dropsId']);
	let type   = this._dropItemType || $gameSelfVariables.value([$gameMap.mapId(), eid, 'dropsType']);
	let lang   = ConfigManager.language;
	let item,colorCode,descTable,itemName;
	
	switch (type) {
       case 1:
	      descTable = window.itemsDescription;
		  item = $dataItems[itemId];
		  colorCode = ($gameTemp.drill_ITC_getColorCode_Item && $gameTemp.drill_ITC_getColorCode_Item(itemId)) || "";
          break;	
       case 2:	 
	      descTable = window.weaponsDescription;
          item = $dataWeapons[itemId];
          colorCode = ($gameTemp.drill_ITC_getColorCode_Weapon && $gameTemp.drill_ITC_getColorCode_Weapon(itemId)) || "";			 
          break;
       case 3: 
	      descTable = window.armorsDescription;
          item = $dataArmors[itemId];
          colorCode = ($gameTemp.drill_ITC_getColorCode_Armor && $gameTemp.drill_ITC_getColorCode_Armor(item.id)) || "";			 
          break;		 
	}
    if (!item) item = $dataItems[3];
	
	let price = item.price * 2;
	    price = Math.max(500, price);
	this._itemPrice = price;
	
	const nameSuffix = item.nameSuffix || "";
	const descObj = (descTable && descTable[String(itemId)]) ? descTable[String(itemId)] : null;
    const displayName = descObj ? (descObj["name"] || item.name) : (item.name || "");
    if (colorCode) {
        itemName = "\x1bcsave\x1bcc[" + colorCode + "]" + displayName + nameSuffix + "\x1bcload";
    } else {
        itemName = displayName + nameSuffix;
    }

	$gameVariables.setValue(84, itemName);
	$gameVariables.setValue(85, price);

    let tag     = "nekoTruck";
    let index   = 1;	
    let option1 = window.mapCommonEventDialogue?.[tag]?.[String(index)]?.[0] || "buy it!";
    let option2 = window.mapCommonEventDialogue?.[tag]?.[String(index)]?.[1] || "Never mind…";	
    let option3 = window.mapCommonEventDialogue?.[tag]?.[String(index)]?.[2] || "Sneakily take it…";	
    $gameStrings.setValue(6,option1);
    $gameStrings.setValue(7,option2);	
	$gameStrings.setValue(8,option3);

};

// 放生寿司布丁
QJ.MPMZ.tl.ex_sushiPudding = function(initialize) {
	
   if (initialize && initialize == "standByAki") {
     let posX = this.screenBoxXShowQJ() + 100;
     let posY = this.screenBoxYShowQJ() - 45;	 
     QJ.MPMZ.Shoot({
        img:"Sushi Pudding[3,10]",
		groupName: ['sushiPudding'],
		position:[['S', posX],['S', posY]],
        initialRotation:['S',0],
		imgRotation:['S',0],
        moveType:['S',0],
        scale:[-0.5,0.5],
        existData:[
        ],
		 timeline:['S',0,60,[0,4,30]],
     });
     return;	 
   }
	

    let voice = "Sushi Pudding_voice" + Math.randomInt(2);
    AudioManager.playSe({ name: voice, volume: 90, pitch: 100, pan: 0 });
	
   QJ.MPMZ.Shoot({
        img:"Sushi Pudding[3,10]",
		groupName: ['sushiPudding'],
		position:[['P'],['P']],
        initialRotation:['S',0],
		imgRotation:['S',0],
        moveType:['B',-1,0,-20,0,-20,0,-20,0,-20],
        scale:0.5,
        existData:[
          {t:['Time',150],a:['F',QJ.MPMZ.tl.ex_sushiPuddingSummonAki]}	
        ],
		moveF:[
		  //[90,999,QJ.MPMZ.tl.ex_sushiPuddingSummonAki]
		],
		//timeline:['S',0,40,[-1,8,20]],
    });	
};

QJ.MPMZ.tl.ex_sushiPuddingSummonAki = function() {
	// 标记子弹
   var bullet = QJ.MPMZ.Shoot({
        img:"null1",
		groupName: ['sushiPuddingTarget'],
		position:[['S',1300],['S',0]],
        initialRotation:['S',0],
		imgRotation:['F'],
		onScreen:true,
        moveType:['S',0],
        scale:0.5,
        existData:[
        //{t:['Time',60]}	
        ],
    });	
	
	var index = bullet.index;

    let voice = "Sushi Pudding_voice" + (3 + Math.randomInt(2));
    AudioManager.playSe({ name: voice, volume: 90, pitch: 100, pan: 0 });	
	
	let posX = $gamePlayer.screenBoxXShowQJ();
	let posY = $gamePlayer.screenBoxYShowQJ() - 20;
   QJ.MPMZ.Shoot({
        img:"Sushi Pudding[3,10]",
		groupName: ['sushiPudding'],
		position:[['S',posX],['S',posY]],
        initialRotation:['S',0],
		imgRotation:['S',0],
        moveType:['TB','sushiPuddingTarget',3,10,20],
        scale:0.5,
        existData:[
          {t:['Time',999],d:[0,30]}	
        ],
		moveF:[
		  //[90,999,QJ.MPMZ.tl.ex_sushiPuddingSummonAki]
		],
		timeline:['S',0,40,[-1,8,20]],
    });		
	//this.changeAttribute('moveType',['TB','sushiPuddingTarget',2,8,16]);
	//this.addTimeline(['S',0,40,[-1,8,20]]);  
	//this.addTimeline(['F',0,30,[0,10]]);
	
};


// 玩家乘坐公共交通工具
QJ.MPMZ.tl.playerRideVehicle = function() {

    let eid   = this._eventId;    
    let posX = `$gameMap.event(${eid}) ? $gameMap.event(${eid}).screenBoxXShowQJ() : $gameMap.displayX()`;
    let posY = `$gameMap.event(${eid}) ? $gameMap.event(${eid}).screenBoxYShowQJ() : $gameMap.displayY()`;
	let listener = QJ.MPMZ.Shoot({
		groupName:['Vehicle'],
		position:[['S',posX],['S',posY]],
		initialRotation:['S',0],
		imgRotation:['F'],
		anchor:[0.5,0.5],
		eid: eid,
		moveType:['D',true],
		collisionBox:['C',18],
		existData:[ 
		    {t:['B',['playerFeet']],a:['F',QJ.MPMZ.tl.playerRideVehicleDetection],p:[-1,false,true],c:['T',0,0,true]}, 		  
		],
		moveF:[
		  [15,15,QJ.MPMZ.tl.ex_exitVehicleDetection]
		]
	});	
};

// 按压式石板陷阱
QJ.MPMZ.tl.ex_pressurePlateTrap = function(XX,YY) {
   	
   QJ.MPMZ.Shoot({
        img:"pressurePlate_off",
		groupName: ['pressurePlate'],
		position:[['Map',XX],['Map',YY]],
        initialRotation:['S',0],
		imgRotation:['S',0],
        moveType:['S',0],
        scale:1,
		collisionBox:['C',18],
		anchor:[0.5,0.65],
		trapTaget: [],
		z: "E",
        existData:[
            {t:['B',["playerFeet"]],a:['F',QJ.MPMZ.tl.ex_flameSpewingStatueTrap,["fire"]],p:[-1,false,true],c:['T',0,6,true]},
			{t:['G',['"enemy"','"object"']],a:['F',QJ.MPMZ.tl.ex_flameSpewingStatueTrap,["fire"]],p:[-1,false,true],c:['T',0,6,true]},
        ],
		moveF:[
		    [10,10,QJ.MPMZ.tl.ex_flameSpewingStatueTrap]
		]
    });   
	
};

// 萨卡班甲鱼回旋攻击
QJ.MPMZ.tl.SacabambaspisCycloneJetCannon = function(initialize,args) {
  
  if (initialize && initialize === "damage") { 
     let posX   = this.inheritX();
     let posY   = this.inheritY();
	 let scale  = this.scaleX;
 	 let damage = 5;
	 damage    += Math.randomInt(this.data.extraDamage);
	 //const rotDeg = Number.isFinite(this.rotationMove) ? this.rotationMove : 0;
	 //posX += 24 * Math.sin(rotDeg * Math.PI / 180);
	 //posY += -24 * Math.cos(rotDeg * Math.PI / 180);
	 let randomSeArray = ["軽いパンチ1","軽いパンチ2"];
	 let randomSe = randomSeArray[Math.floor(Math.random() * randomSeArray.length)];
	 AudioManager.playSe({ name: randomSe, volume: 80, pitch: 80 + Math.randomInt(40), pan: 0 });
	 // 撞墙演出
     QJ.MPMZ.Shoot({
          img: "animehit[5,4]",
          initialRotation: ['S', Math.randomInt(360)],
          position: [['S', posX], ['S', posY]],
          scale: scale,
          moveType: ['S', 0],
          opacity: 1,
          blendMode: 0,
          z: "E",
          existData: [
    	    { t: ['Time', 19] }
    	  ]
     });	 
	 // 撞击到目标后减速
	 if (!this._collided) {
		 this._collided = true;
		 this.changeAttribute('moveType',['S', '0|7~10/0~999/0']);
	 }
	 // 伤害并击退目标
     const target = args && args.target;
     if (!(target instanceof Game_Event)) return;
	 let fudou = $gameSelfVariables.value([$gameMap.mapId(), target.eventId(), 'fudou']);
	 QJ.MPMZ.tl.ex_toEnemyAttack.call(this, damage,{orbitingDamage:true,noHitEffect:true,noDurLoss:true,specifyAddedStatus:true,addedStatusType:0}, args);
	 if (fudou > 80) return;
	  this._disX = this._disX || this.x;
	  this._disY = this._disY || this.y;
	  
	  let disX = this.x - this._disX;
	  let disY = this.y - this._disY;	  
	  let tarX = target._x + (disX / 50);
	  let tarY = target._y + (disY / 50);
	  target.locate(tarX, tarY);
      this._disX = this.x;
	  this._disY = this.y;
	 
     return;
  }

  if (initialize && initialize === "shoot") {
	  // 发射鱼雷
	 $gameMap.steupCEQJ(140,1,{throwObject:true});
     let posX        = this.inheritX();
     let posY        = this.inheritY();
	 let scale       = this.scaleY;
	 let extraDamage = 5 + $gameParty.leader().skillMasteryLevel(101) * 5;
	    extraDamage += 7 * (this.data.servantLevel || 1);
	 AudioManager.playSe({ name: "Explosion1", volume: 70, pitch: 150, pan: 0 });
     QJ.MPMZ.Shoot({
        img:"Sacabambaspis_attack[4,4]",
		groupName: ['Sacabambaspis'],
		position:[['S',posX],['S',posY]],
        initialRotation:['M'],
		imgRotation:['F'],
        moveType:['S','0|10~40/7~999/7'],
        scale:scale,
		extraDamage: extraDamage,
		aid: this.data.aid,
		collisionBox:['R', 6, 48],
		anchor:[0.5,0.5],
		z: 500,
        existData:[
		    {t:['Time', 180],a:['F',QJ.MPMZ.tl.SacabambaspisCycloneJetCannon,["crash"]]},
			{t:['G',['"enemy"','"object"']],a:['F',QJ.MPMZ.tl.SacabambaspisCycloneJetCannon,["damage"]],p:[-1,false,true],c:['T',0,4,true]},
        ],
		moveJS:[
		    [4,4,`if (!this._collided) {
				    let xx = this.x / 48;
					let yy = this.y / 48;
				    let regionId = $gameMap.regionId( xx, yy );
					if ([254,255].includes(regionId)) {
						this._collided = true;
						this.changeAttribute('moveType',['S', 0]);
					}
			     }
		    `]
		]
     });
     return;
  }

  if (initialize && initialize === "crash") {
	  
     // 动作重置
	 if ( $gameMap.getGroupBulletListQJ('SacabambaspisCycloneJetCannon').length <= 1 ) {		 
	   if ($gamePlayer._drill_EASe_controller && $gamePlayer._drill_EASe_controller._drill_curBitmapName.includes("lift")) {
		   setTimeout(() => $gamePlayer.drill_EASA_setEnabled( true ), 200);
	   }
	 }
	 
	 // 考虑玩家有没有临时拆掉装备
     let lives = $gameMap.drill_COET_getEventsByTag_direct("萨卡班甲鱼").length;
	 let equipped = 0;
	 const eqs = $gameParty.leader().equips();
     for (let i = 1; i < eqs.length; i++) {
        const a = eqs[i];
        if (a && DataManager.isArmor(a)) {
          const baseId = (typeof a.baseItemId === 'number') ? a.baseItemId : a.id; 
          if (baseId == 44) equipped += 1;
        }
     }	 
	 if (lives >= equipped) return;
     this.changeAttribute('opacity',0);	  
     let XX  = this.x / 48;
     let YY  = this.y / 48;
	 let eid = $gameMap.spawnEventQJ(1,56,XX,YY,false);
	 let e   = $gameMap.event(eid);
	 if (!e) return;
	 let aid = this.data.aid;
     let tag = "bindArmor" + aid;
	 e.servantLevel = $dataArmors[aid].servantLevel || 1;
     e.drill_COET_addTag(tag);
     let condition = DrillUp.g_COFA_condition_list[10];
     let c_area = $gameMap.drill_COFA_getShapePointsWithCondition(Math.floor(XX), Math.floor(YY), "圆形区域", 3, condition);	 
        if (c_area.length > 0) {
                let p = c_area[Math.floor(Math.random() * c_area.length)];
                let xPlus = p.x - XX;
                let yPlus = p.y - YY;
                e.jump(xPlus, yPlus);
            } else {
                e.jump(0, 0);
        }	 
	 AudioManager.playSe({ name: "Jump2", volume: 80, pitch: 80 + Math.randomInt(40), pan: 0 });	 
	 
     return;
  }

  if (initialize && initialize === "start") {
	 // 举物动作 
	 $gameMap.steupCEQJ(140,1,{liftObject:true}); 
     let posX         = "$gamePlayer.screenBoxXShowQJ()";
	 let fixY         = 24 + (this._Drill_ECE.scale_x * 18);
	 let posY         = "$gamePlayer.screenBoxYShowQJ()-" + fixY; 	
	 let scale        = 1 + this._Drill_ECE.scale_x;
	 let scaleX       = scale;
	 let servantLevel = this.servantLevel || 1;
     let cur_dir      = this.direction();
	 if (cur_dir     == 2 || cur_dir == 4) scaleX = -scale;
	 // 捕获装备ID
	 const tags = this._drill_COET_tag || [];
     let ItemId = null;
     for (var i = 0; i < tags.length; i++) {
       let t = String(tags[i]);
       let m = t.match(/bindArmor\s*(\d+)/);
       if (m) { ItemId = Number(m[1]); break; }
     }
     QJ.MPMZ.Shoot({
        img:"Sacabambaspis",
		groupName: ['SacabambaspisCycloneJetCannon'],
		position:[['S',posX],['S',posY]],
        initialRotation:['S',0],
		imgRotation:['S',0],
        moveType:['D',true],
        scale:[scaleX,scale],
		collisionBox:['C', 1],
		servantLevel: servantLevel,
		anchor:[0.5,0.5],
		aid: ItemId,
		z: 500,
        existData:[
		    {t:['S','TouchInput.drill_isLeftPressed()',true],a:['F',QJ.MPMZ.tl.SacabambaspisCycloneJetCannon,["shoot"]]},  
			{t:['S','TouchInput.drill_isRightPressed()||$gamePlayer.drill_EFOE_isPlaying()',true],a:['F',QJ.MPMZ.tl.SacabambaspisCycloneJetCannon,["crash"]]}, 
        ],
		moveJS:[
		    
		]
     });
      return;	  
  }

  if (initialize && initialize === "summon") {
	  let XX = $gamePlayer._x;
      let YY = $gamePlayer._y;
	  let eid = $gameMap.spawnEventQJ(1,56,XX,YY,false);
	  let e   = $gameMap.event(eid);
	  if (!e) return;
	  let condition = DrillUp.g_COFA_condition_list[10];
      let c_area = $gameMap.drill_COFA_getShapePointsWithCondition(Math.floor(XX), Math.floor(YY), "圆形区域", 3, condition);
        if (c_area.length > 0) {	  
		   let p = c_area[Math.floor(Math.random() * c_area.length)];
		   e.locate(p.x, p.y);
		}
	  let tag = "bindArmor" + this.id;
	  e.servantLevel = this.servantLevel || 1;
      e.drill_COET_addTag(tag);
      return;	  
  }
  
  if (initialize && initialize === "listener") {	  
	  if (!this) return;
	  this._Drill_ECE = this._Drill_ECE || {};
	  let servantLevel = this.servantLevel || 1;
	  let level = $gameParty.leader().skillMasteryLevel(101) + (this.servantLevel - 1);
	  // 适配王权征令
	  this._Drill_ECE.scale_x = 0.25 * level;
      this._Drill_ECE.scale_y = 0.25 * level;
      this._Drill_ECE.playing_type = "王权征令";
	  // 生成影子
	  let OffsetY = 3; 
	  let scale   = 0.9;
	  scale      *= (1 + this._Drill_ECE.scale_x);
	  OffsetY    -= this._Drill_ECE.scale_x  * 16;
	  QJ.MPMZ.tl.ex_objectShadowGeneration.call(this,0,OffsetY,scale);
	  // 事件碰撞体设置
	  let width   = 1 + (0.25 * level);
	  let height  = 0.5 + (0.125 * level);
	  this.setWidth(width);
	  this.setHeight(height);
	  this.setOffsetX(0.125 * level);
	  this.setOffsetY(-0.5 + 0.1 * level);
	  // 移动方式设定
	  this.setDpf(0.05);
      this.setAcc(40, 3);
      this.setInertia(0.5);	  
	  // 子弹碰撞体设置
	  setTimeout(() => {
		  let range = 8 + level * 2;
		  let ox    = 5 * level;
		  let oy    = -15 + 2 * level;;
		  this.changeCBQJ(['C',range],ox,oy);
	  // 从者监听器
	  let eid   =  this._eventId;
      let posX  = `$gameMap.event(${eid}) ? $gameMap.event(${eid}).screenShootXQJ() : $gameMap.displayX()`;
      let posY  = `$gameMap.event(${eid}) ? $gameMap.event(${eid}).screenShootYQJ() : $gameMap.displayY()`;
	  let sCode = `$gameMap.steupCEQJ(205, ${eid}, {deadType:2})`;
	  let dCode = "if(this._needJS){$gameMap.clearSpawnEventQJ(" + eid + ")}";
	  let Sacabambaspis = QJ.MPMZ.Shoot({
		     moveType:['D',false],
			 groupName:['servant','Sacabambaspis',`Sacabambaspis${eid}`],
             position:[['S',posX],['S',posY]],
			 initialRotation:['S',0],
			 imgRotation:['F'],
			 extra:eid,
			 anchor:[0.5,0.5],
             existData:[
			      {t:['S',`!$gameMap.event(${eid})`,true], c:['T',10,10,true]},  
			      {t:['S',`$gameSelfSwitches.value([$gameMap.mapId(), ${eid}, 'D'])`,true], c:['T',10,10,true]},  
				  {t:['S',`$gameMap.event(${eid}) && !$gameMap.event(${eid}).isJumping() && $gameMap.regionId( $gameMap.event(${eid}).centerRealX(), $gameMap.event(${eid}).centerRealY() ) === 8
				  `,true], a:['S', sCode], c:['T',20,20,true]}, 
             ],
			 moveF: [	
			 ],
             collisionBox:['C',2],
			 deadJS:[dCode],
       });
	   
		// 逆咒缚契约
		if ($gameParty.leader().hasSkill(71)) {	 
	       let index = Sacabambaspis.index;
		   QJ.MPMZ.tl.ex_chainSpellBinding(undefined, index);		
		}
      }, 400);		
      return;	  
  }  
};

// 变成河里的祭品
QJ.MPMZ.tl.becomeWaterSacrifice = function() {
	
	if (!this) return;
	let eid    = this._eventId;
	let target = $gameMap.event(eid);
	if (!target) return;
    let posX   = target.screenBoxXShowQJ();
    let posY   = target.screenBoxYShowQJ() + 6; 
    
    QJ.MPMZ.Shoot({
        position:[['S',posX],['S',posY]],
		img:"baitAnimation[4,18]",
        groupName: ['bait'],
		collisionBox:['C',45],
        initialRotation:['S',0],
		imgRotation:['F'],
		opacity: '0|0~30/1~7200|1',
        moveType:['S',0],
		anchor:[0.5,0.4],
		blendMode: 0,
		z:"E",
        existData:[
           {t:['Time',7200], d:[0,30]}
        ],
    });    	
	// 增加河内掉落物
	let maxFishing = $gameSelfVariables.value([$gameMap.mapId(), 1, 'maxFishing']);
	maxFishing += 2 + Math.randomInt(3);
	$gameSelfVariables.setValue([$gameMap.mapId(), 1, 'maxFishing'], maxFishing);
};

// 放置诱饵
QJ.MPMZ.tl.generateDecoyObject = function() {
	
	if (!this) return;
    let posX    = this.screenBoxXShowQJ();
    let posY    = this.screenBoxYShowQJ();
	let time    = 720;
	let range   = 180;
	let inWater = $gameMap.regionId( this._x, this._y ) === 8;
	// 在水里持续时间更长
	if (inWater) {
		time += 720;
		range = 90;
	}
	
    let Decoy = QJ.MPMZ.Shoot({
        position:[['S',posX],['S',posY]],
		groupName: ['bait'],
        initialRotation:['S',0],
        moveType:['S',0],
		imgRotation:['F'],
		collisionBox:['C', range],
		scale:1,
        existData:[
			{t:['Time',time]},
			{t:['G','"enemy"'],a:['F',QJ.MPMZ.tl.decoyAffectsEnemy,[undefined]],p:[-1,false,true,QJ.MPMZ.tl.decoyAffectsEnemy,QJ.MPMZ.tl.decoyStopsAffectingEnemy], c:['T',0,30,true]},
			{t:['B','fire'],a:['F',QJ.MPMZ.tl.decoyStopsAffectingEnemy,[undefined]],cb:['C',Math.round(range/2.5)]}
        ],
    });
	time -= 100;
    posX  = this._x;
    posY  = this._y;
	let name    = "aura_static_b" + Decoy.index;
    $gameScreen._particle.particleSet(0, name, 'tilemap', 'aura_static_b', 'above', posX, posY);
	if (inWater) {
		$gameScreen._particle.particleUpdate([name,'scale',"0","2@1","0.1@1.5","0"]);
	} else {
		$gameScreen._particle.particleUpdate([name,'scale',"0","5@1","0.1@1.5","0"]);
	}
	$gameScreen._particle.particleUpdate([name,'alpha',"0.05"]);
    $gameScreen._particle.reservePluginCommand(time,{},["clear",name],1);
    AudioManager.playSe({ name: "Fire1", volume: 75, pitch: 50, pan: 0 });	
};
// 诱饵生效
QJ.MPMZ.tl.decoyAffectsEnemy = function(user,args) {
	
    const target = args && args.target;
    if (target instanceof Game_Event) {
		// 非深渊魔物也会被引诱
		if (!target._canBeAlerted) {
			target._waitCount += 3;
			if (!target.isMoved() && target._moveType > 0) {
			  let xx = this.x / 48;
			  let yy = this.y / 48;
			  target.moveToTarget(xx,yy);
			}
	  }
	  return;
	}
	
	if (user instanceof Game_Event) {
	  let xx = Math.floor(this.x / 4.8) / 10;
      let yy = Math.floor(this.y / 4.8) / 10;
	  user.decoyObject = {x:xx, y:yy};
	}

};
// 诱饵失效
QJ.MPMZ.tl.decoyStopsAffectingEnemy = function(user,args) {
	
	const target = args && args.bulletTarget;
    if (target) {
		// 清除诱饵演出
		let name = "aura_static_b" + this.index;
		$gameScreen._particle.reservePluginCommand(1,{},["clear",name],1);
		// 粉尘爆炸
		QJ.MPMZ.tl.ex_bombFiendSoul.call(this,null,null,{scaleFix:2});
		return;
	}
	
	if (user instanceof Game_Event) {
	  if (user._moveType > 0) {
	    user.decoyObject = null;
	    user.requestBalloon(7);
	    user.enterNormalState();
	  }
	}
};

//玩家接近伤害监听器
QJ.MPMZ.tl.ex_playerCloseRangePiercingAttackListeners = function() {

	 if($gameMap.getGroupBulletListQJ('playerCloseRangePiercingAttack').length > 0) return;
	 
       let listeners = QJ.MPMZ.Shoot({
            groupName: ['playerCloseRangePiercingAttack','equipmentEffect'],
            img: "null1",
            position: [['P'], ['P']],
            initialRotation: ['S',0],
            moveType: ['B',-1],
			opacity:0,
			collisionBox:['C',28],
            existData: [			  
            ],          
        });	
		
		 if ($gameParty.leader().hasSkill(89)) {
		 listeners.addExistData({t:['G',['"enemy"']],a:['F',QJ.MPMZ.tl.ex_playerCloseRangePiercingAttack,[{type:"auto"}]],p:[-1,false,true],c:['T',0,20,true]});
		 }		
		 if ($gameParty.leader().hasSkill(90)) {
		 listeners.addExistData({t:['G',['"enemy"']],a:['F',QJ.MPMZ.tl.ex_playerCloseRangePiercingAttack,[{type:"attack"}]],p:[-1,false,true],c:['T',0,20,true]});
		 }
		 if ($gameParty.leader().hasSkill(91)) {
		 listeners.addExistData({t:['G',['"enemy"']],a:['F',QJ.MPMZ.tl.ex_playerCloseRangePiercingAttack,[{type:"move"}]],p:[-1,false,true],c:['T',0,20,true]});
		 }		 
		 
};

//玩家接近伤害
QJ.MPMZ.tl.ex_playerCloseRangePiercingAttack = function(extraData = {},args) {
	
   if (args && args.target && args.target instanceof Game_Event) {	
	if (extraData.type && extraData.type == "auto") {
		let damage = 1 + $gameParty.leader().skillMasteryLevel(89);
	    QJ.MPMZ.tl.customEnemyDamageCalculation(damage,args.target);
		return;
	 }
	 
	if (extraData.type && extraData.type == "attack") {
		if (TouchInput.drill_isLeftPressed()) {
		let damage = 2 + $gameParty.leader().skillMasteryLevel(90);
	    QJ.MPMZ.tl.customEnemyDamageCalculation(damage,args.target);
	   }
        return;
	 }	 

	if (extraData.type && extraData.type == "move") {
		if ($gamePlayer.isMoved()) {
		let damage = 5 + $gameParty.leader().skillMasteryLevel(91);
	    QJ.MPMZ.tl.customEnemyDamageCalculation(damage,args.target);
	   }
        return;
	 }
	 
   }
};

//矿车监听器
QJ.MPMZ.tl.ex_minecartListener = function(ID) {
	
	let Mcode = "$gameMap.event(" + ID + ").isMoved()";
	let Dcode = "!$gameMap.event(" + ID + ")";	
	
	QJ.MPMZ.Shoot({
		img:"null1",
		groupName:['minecart'],
		position:[['E',ID],['E',ID]],
		initialRotation:['S',0],
		imgRotation:['F'],
		anchor:[0.5,2.0],
		eid: ID,
		moveType:['D',true],
		collisionBox:['C',18],
		existData:[ 
		  {t:['S',Dcode,true]},
		  {t:['P'],a:['F',QJ.MPMZ.tl.playerRideVehicleDetection],p:[-1,false,true],c:['T',0,0,true]}, 
		  {t:['G',['"enemy"',]],a:['F',QJ.MPMZ.tl.customEnemyDamageCalculation,[100,{}]],p:[-1,false,true],c:['S',Mcode]},
		],
		moveF:[
		  [15,15,QJ.MPMZ.tl.ex_exitVehicleDetection]
		]
	});
	
};

//乘坐交通工具检测
QJ.MPMZ.tl.playerRideVehicleDetection = function() {
	 
	 let eid    = this.data.eid;
	 let target = $gameMap.event(eid);
	 if (!target) return;
	 
	 if (!this._playerRiding) {
	 // 标记乘坐状态 
       this._playerRiding = true;
	   $gameSwitches.setValue(188, true);
	 }
     this._oldrealX = this._oldrealX || target._realX;
     this._oldrealY = this._oldrealY || target._realY; 
	 
	 if (target.isMoved()) {
     let difX = target._realX - this._oldrealX;
     let difY = target._realY - this._oldrealY;
     difX += $gamePlayer._realX;
     difY += $gamePlayer._realY;
     // 让玩家强制移动
     $gamePlayer.locate(difX, difY);
     this._oldrealX = target._realX;
     this._oldrealY = target._realY;	 
   }
};

//离开交通工具检测
QJ.MPMZ.tl.ex_exitVehicleDetection = function() {
	
	if (!this._playerRiding) return;
	let xx = this.inheritX(); 
    let yy = this.inheritY();

	if (QJ.MPMZ.rangeAtk([['S', xx],['S', yy]],['B','playerFeet'],[],['C',24]).length == 0) {
	   this._oldrealX = undefined;
	   this._oldrealY = undefined;
	   this._playerRiding = false;
	   $gameSwitches.setValue(188, false);
    }	
	
};

//芳草心-效果结算
QJ.MPMZ.tl.ex_fragrantGrassRingEffectResolve = function() {
	
	let actor = $gameParty.leader();
	let value = actor.skillMasteryLevel(35);
	let hp = 20;
	if ( value > 0 ) {
	 	hp = ((value*(value + 1)/2)*20) / value;
	}
	return Math.round(hp);
	
};

(function() {

    //-----------------------------------------------------------------------------
    // Window_NameEdit
    //-----------------------------------------------------------------------------
    // 1) 初始姓名为空。
    // 2) 不显示角色头像，顶部显示提示文本及“已输入 X / Y 个字符”。
    // 3) 输入框行进一步下移以避免遮挡提示。

    function Window_NameEdit() {
        this.initialize.apply(this, arguments);
    }

    Window_NameEdit.prototype = Object.create(Window_Base.prototype);
    Window_NameEdit.prototype.constructor = Window_NameEdit;

    Window_NameEdit.prototype.initialize = function(actor, maxLength) {
        // 设置窗口宽高
        var width = this.windowWidth();
        var height = this.windowHeight();

        // 将窗口居中
        var x = (Graphics.boxWidth - width) / 2;
        var y = 50;//(Graphics.boxHeight - height) / 2;
        Window_Base.prototype.initialize.call(this, x, y, width, height);

        // 初始姓名设为空
        this._actor = actor;  
        this._maxLength = maxLength; 
        this._defaultName = ''; 
        this._name = ''; 
        this._index = 0;

        this.deactivate();
        this.refresh();
    };

    // 窗口宽度，可自行修改
    Window_NameEdit.prototype.windowWidth = function() {
        return 800;
    };

    // 窗口高度（4 行作为示例）
    Window_NameEdit.prototype.windowHeight = function() {
        return this.fittingHeight(4);
    };

    // 获取当前输入内容
    Window_NameEdit.prototype.name = function() {
        return this._name;
    };

    // 如果“恢复默认”则清空
    Window_NameEdit.prototype.restoreDefault = function() {
        this._name = '';
        this._index = 0;
        this.refresh();
        return false;
    };

    // 添加一个短语（或字符）
    Window_NameEdit.prototype.add = function(ch) {
        if (this._index < this._maxLength) {
            this._name += ch; 
            this._index = this._name.length;
            this.refresh();
            return true;
        } else {
            return false;
        }
    };

    // 退格
    Window_NameEdit.prototype.back = function() {
        if (this._index > 0) {
            this._index--;
            this._name = this._name.slice(0, this._index);
            this.refresh();
            return true;
        } else {
            return false;
        }
    };

    // 不显示头像
    Window_NameEdit.prototype.faceWidth = function() {
        return 0;
    };

    // 每个“字符格”宽度，可根据需求加大
    Window_NameEdit.prototype.charWidth = function() {
		
		let value = 34;
		if ($gameVariables.value(1) === 2) value = 16;
		
        return value;
    };

    // 输入区域距离左边的像素
    Window_NameEdit.prototype.left = function() {
        return 20;
    };

    // 调整输入区域向下移动：让出顶部 2 行（行0: 提示文本，行1: “X/Y”字样）
    Window_NameEdit.prototype.itemRect = function(index) {
        var rect = {};
        rect.x = this.left() + index * this.charWidth();
        rect.y = this.lineHeight() * 2 + 8; // 第二行提示后再往下一个行距
        rect.width = this.charWidth();
        rect.height = this.lineHeight();
        return rect;
    };

    // 下划线相关
    Window_NameEdit.prototype.underlineRect = function(index) {
        var rect = this.itemRect(index);
        rect.x++;
        rect.y += rect.height - 4;
        rect.width -= 2;
        rect.height = 2;
        return rect;
    };

    Window_NameEdit.prototype.underlineColor = function() {
        return this.normalColor();
    };

    Window_NameEdit.prototype.drawUnderline = function(index) {
        var rect = this.underlineRect(index);
        var color = this.underlineColor();
        this.contents.paintOpacity = 48;
        this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color);
        this.contents.paintOpacity = 255;
    };

    // 绘制单个字符
    Window_NameEdit.prototype.drawChar = function(index) {
        var rect = this.itemRect(index);
        this.resetTextColor();
        this.drawText(this._name[index] || '', rect.x, rect.y);
    };


Window_NameEdit.prototype.refresh = function() {
	
    this.contents.clear();
    // 1) 根据语言版本切换不同文本
    var lang = ConfigManager.language; // 0=CN, 1=JP, 2=EN
    var prompt = "";
    var counterFormat = ""; // 计数字样

    switch(lang) {
        case 0: // 中文
            prompt = "请输入想要留下的讯息内容：";
            counterFormat = "已输入 %1 / %2 个字符";
            break;
        case 1: // 日语
            prompt = "メッセージを入力してください：";
            counterFormat = "現在の入力：%1 / %2 文字";
            break;
        case 2: // 英文
            prompt = "Please input your message:";
            counterFormat = "Current input: %1 / %2 characters";
            break;
        default:
            prompt = "Please input your message:";
            counterFormat = "Current input: %1 / %2 characters";
            break;
    }

    // 2) 绘制提示文本
    this.drawText(prompt, 0, 0, this.contentsWidth(), 'center');

    // 3) 绘制字符计数
    var current = this._name.length;
    var max = this._maxLength;
    // 用占位符 %1 / %2 来替换数字
    var counterText = counterFormat.replace("%1", current).replace("%2", max);
    this.drawText(counterText, 0, this.lineHeight(), this.contentsWidth(), 'center');

    // 4) 绘制可输入位置下划线
    for (var i = 0; i < this._maxLength; i++) {
        this.drawUnderline(i);
    }

    // 5) 绘制已输入的每个字符
    for (var j = 0; j < current; j++) {
        this.drawChar(j);
    }

    // 6) 光标
    var rect = this.itemRect(this._index);
    this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
};
window.Window_NameEdit = Window_NameEdit;
// 修改下划线绘制函数，加大线条厚度、更明显的颜色等
Window_NameEdit.prototype.drawUnderline = function(index) {
    var rect = this.itemRect(index);

    // 让线条厚一点，例如 4 像素
    var underlineThickness = 2;
    // 下划线位置：将 y 坐标移动到字符底部
    rect.y += rect.height - underlineThickness;
    rect.height = underlineThickness;

    // 设为常规颜色或自定义颜色
    var color = this.underlineColor();
    // 提高透明度以便更明显（原版是 48）
    this.contents.paintOpacity = 150;

    this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color);
    this.contents.paintOpacity = 255; // 恢复
};



    //-----------------------------------------------------------------------------
    // Scene_Name
    //-----------------------------------------------------------------------------
    // 当玩家按下 OK，将输入内容写入 $gameStrings.value(5)

    var _Scene_Name_onInputOk = Scene_Name.prototype.onInputOk;
    Scene_Name.prototype.onInputOk = function() {
        var text = this._editWindow.name();
        $gameStrings.setValue(5, text);
        SceneManager.pop(); 
    };

})();


(function() {

	
Window_NameInput.prototype.initialize = function(editWindow) {
    var x = 400;//editWindow.x;
    var y = 300;//editWindow.y + editWindow.height + 8;
    var width = 1200;
    var height = this.windowHeight();
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._editWindow = editWindow;
    this._page = 0;
    this._index = 0;
    this.refresh();
    this.updateCursor();
    this.activate();
};

Window_NameInput.prototype.table = function() {
	
            const lang = ConfigManager.language;
			switch (lang) {
                case 0: 
                return [Window_NameInput.CHINESE1,
                        Window_NameInput.CHINESE2];
                break;
                case 1: 
                return [Window_NameInput.JAPANESE1,
                        Window_NameInput.JAPANESE2];
                break;	
                default: 
                return [Window_NameInput.ENGLISH1,
                        Window_NameInput.ENGLISH2];
                break;           
			}	
	
};

    Window_NameInput.prototype.maxCols = function() {
        return 9;
    };

    // 根据预设短句计算每个键位所需的最小宽度
    Window_NameInput.prototype.itemWidth = function() {
		
		return 120;
		/*
        // 仅计算谏言短句部分，不包含末尾的“Page”和“OK”
        var phrases = Window_NameInput.CHINESE1.slice(0, Window_NameInput.CHINESE1.length - 2);
        var maxWidth = 0;
        for (var i = 0; i < phrases.length; i++) {
            maxWidth = Math.max(maxWidth, this.textWidth(phrases[i]));
        }
        return maxWidth + 20; // 加上左右各10px边距，共20px
		*/
    };

    Window_NameInput.prototype.windowWidth = function() {
         return 1920;
		//return this.maxCols() * this.itemWidth() + this.padding * 2;
    };

    // 覆盖 itemRect 方法，使用自定义的 itemWidth 来计算每个键位的区域
    Window_NameInput.prototype.itemRect = function(index) {
        var rect = {};
        var cellWidth = this.itemWidth();
        rect.width = cellWidth;
        rect.height = this.itemHeight();
        rect.x = (index % this.maxCols()) * cellWidth;
        rect.y = Math.floor(index / this.maxCols()) * rect.height;
		// 120 72
        return rect;
    };


    Window_NameInput.prototype.windowHeight = function() {
        return this.fittingHeight(10);
    };

Window_NameInput.prototype.onNameAdd = function() {
	
	var charWithSpace = this.character();
	if ($gameVariables.value(1) === 2) {
		charWithSpace = charWithSpace + " ";
	}
	
    if (this._editWindow.add(charWithSpace)) {
        SoundManager.playOk();
    } else {
        SoundManager.playBuzzer();
    }
};

Window_NameInput.CHINESE1 = (function(){

        var phrases = [
            "是", "了", "的", "吗", "啊",
            "不是", "和", "或", "在", "吧",			
            "因为", "所以", "虽然", "都是", "不过",
            "这里", "那里", "哪里", "正确", "错误",			
            "前面", "左边", "右边", "下面", "中间",
            "全部", "终于", "有", "没有", "不知道",
            "做", "看", "拿", "用", "要",			
            "攻击", "防御", "移动", "冲刺", "技能",
            "你", "我", "敌人", "伙伴", "骗子",
            "强敌", "杂鱼", "敌群", "中立", "陷阱",
            "属性", "抗性", "上限", "下限", "商人",
            "武器", "装备", "道具", "符文", "塔罗牌",
            "魔法", "炸弹", "状态", "有益", "有害",			
            "钱", "食材", "饮料", "肉", "牛奶",
            "有效", "无效", "目标", "河里", "地上",
            "中毒", "眩晕", "麻痹", "炎上", "冻结",
            "正面", "背面", "侧面",
            "，", "。", "！", "？", "…"
        ];
        phrases.push("换页", "完成编辑");
		return phrases;
})();		
	
Window_NameInput.CHINESE2 = (function(){

     var phrases = [
            "加油", "做到了", "小心", "注意", "可以",
            "哥哥", "妹妹", "睡觉", "回家", "吃饭",
            "赞美", "伤心", "喜欢", "思考", "休息",
            "剑圣", "骑士", "忍者", "恶魔", "商人",
            "力量", "梦", "道路", "房间", "深渊",
            "安全", "危险", "现在", "过去", "未来",
            "茶会", "", "", "", "",
            "", "", "", "", "",
            "", "", "", "", "",
            "", "", "", "", "",
            "", "", "", "", "",
            "", "", "", "", "",
            "", "", "", "", "",
            "", "", "", "", "",
            "", "", "", "", "",
            "", "", "", "", "",
            "", "", ""
        ];
        phrases = phrases.concat([
            "", "", "", "", ""
        ]);
        phrases.push("换页", "完成编辑");
        return phrases;
})();

Window_NameInput.JAPANESE1 = (function(){
    var phrases = [
        "です", "だ", "の", "か", "ね",
        "ではない", "と", "または", "に", "だろう",			
        "なぜなら", "だから", "だけど", "すべて", "しかし",
        "ここ", "そこ", "どこ", "正しい", "間違い",			
        "前", "左", "右", "下", "中央",
        "全部", "ついに", "ある", "ない", "知らない",
        "する", "見る", "取る", "使う", "必要",			
        "攻撃", "防御", "移動", "ダッシュ", "スキル",
        "君", "私", "敵", "仲間", "詐欺師",
        "強敵", "雑魚", "敵集団", "中立", "罠",
        "属性", "耐性", "上限", "下限", "商人",
        "武器", "装備", "アイテム", "ルーン", "タロット",
        "魔法", "爆弾", "状態", "有利", "不利",			
        "お金", "食材", "飲み物", "肉", "牛乳",
        "有効", "無効", "目標", "川の中", "地面",
        "毒", "めまい", "麻痺", "炎上", "凍結",
        "正面", "背後", "側面",
        "、", "。", "！", "？", "…"
    ];
    phrases.push("ページ変更", "編集完了");
    return phrases;
})();

Window_NameInput.JAPANESE2 = (function(){
    var phrases = [
        "頑張れ", "やった", "気をつけろ", "注意", "できる",
        "お兄ちゃん", "妹", "寝る", "帰る", "食べる",
        "称賛", "悲しい", "愛", "考える", "休む",
        "剣聖", "騎士", "忍者", "悪魔", "商人",
        "力", "夢", "道", "部屋", "深淵",
        "安全", "危険", "今", "過去", "未来",
        "お茶会", "", "", "", "",
        "", "", "", "", "",
        "", "", "", "", "",
        "", "", "", "", "",
        "", "", "", "", "",
        "", "", "", "", "",
        "", "", "", "", "",
        "", "", "", "", "",
        "", "", "", "", "",
        "", "", "", "", "",
        "", "", ""
    ];
    phrases = phrases.concat([
        "", "", "", "", ""
    ]);
    phrases.push("ページ変更", "編集完了");
    return phrases;
})();


Window_NameInput.ENGLISH1 = (function(){

        var phrases = [
            "Yes", "Done", "The", "What", "Ah",
            "Not", "And", "Or", "At", "Be",			
            "Because", "So", "Although", "All", "But",
            "Here", "There", "Where", "Correct", "Wrong",			
            "Ahead", "Left", "Right", "Below", "Middle",
            "All", "Finally", "Have", "None", "Unknown",
            "Do", "See", "Take", "Use", "Need",			
            "Attack", "Defend", "Move", "Dash", "Skill",
            "You", "Me", "Enemy", "Ally", "Liar",
            "Boss", "Minion", "Enemies", "Neutral", "Trap",
            "Stats", "Resist", "Max", "Min", "Merchant",
            "Weapon", "Gear", "Item", "Rune", "Tarot",
            "Magic", "Bomb", "Status", "Buff", "Debuff",			
            "Gold", "Food", "Drink", "Meat", "Milk",
            "Valid", "Invalid", "Target", "River", "Ground",
            "Poisoned", "Stunned", "Paralyzed", "Burned", "Frozen",
            "Front", "Back", "Side",
            ",", ".", "!", "?", "…"
        ];
        phrases.push("Next Page", "Finish Editing");
		return phrases;
})();

Window_NameInput.ENGLISH2 = (function(){

        var phrases = [
            "Go", "Success", "Careful", "Watch Out", "Can",
            "Onii-chan", "Imouto", "Sleep", "Go Home", "Eat",
            "Praise", "Sad", "Love", "Think", "Rest",
            "Swordmaster", "Knight", "Ninja", "Demon", "Merchant",
            "Power", "Dream", "Path", "Room", "Abyss",
            "Safe", "Danger", "Now", "Past", "Future",
            "NLCH", "", "", "", "",
            "", "", "", "", "",
            "", "", "", "", "",
            "", "", "", "", "",
            "", "", "", "", "",
            "", "", "", "", "",
            "", "", "", "", "",
            "", "", "", "", "",
            "", "", "", "", "",
			"", "", "", "", "",
            "", "", ""
        ];
        phrases = phrases.concat([
            "", "", "", "", ""
        ]);
        phrases.push("Next Page", "Finish Editing");
		return phrases;
})();


})();