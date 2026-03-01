//=============================================================================
//
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc [弹幕模板库][BOSS模板]
 * @author 仇九
 *
 * @help 
 * 
 *
 */
//=============================================================================
//
//=============================================================================

// 召唤堕落圣堂传送门
QJ.MPMZ.tl.playSummonDemonGateAnimation = async function (extra = {}) {
  let lang      = ConfigManager.language;
  let checkName = "demonSummon" + lang;

  const ok = await Promise.resolve(
    QJ.MPMZ.tl.checkPictureExists(['img','projectiles','object_name'], `${checkName}.rpgmvp`)
  );

  if (!ok) checkName = "demonSummon2";
  let imgName = "object_name/" + checkName;

  QJ.MPMZ.Shoot({
    img: imgName,
    opacity: '0|0~30/1~9999/1',
    position: [['S', 480], ['S', 270]],
    initialRotation: ['S', 0],
    imgRotation: ['F'],
    scale: 0.5,
    onScreen: true,
    moveType: ['S', 0],
    existData: [{ t:['Time',120], d:[1,30,1.25] }],
    z: "A"
  });
  
  AudioManager.playSe({
        name: '魔の時計塔の鐘',
        volume: 90,
        pitch: 100,
        pan: 0
  });    
};

// 汐音台词
QJ.MPMZ.tl.ShioneLinesEffect = function () {
	
  let textArray = window.MapEventDialogue53 && window.MapEventDialogue53?.["13"]?.["30"];
  if (!textArray) {
      textArray = [
	      "Look forward to it, little lamb ♥",
		  "I’ll squeeze you until every last trace of malice is gone~"
      ];
  }
  const zoom  = $gameScreen.zoomScale();
  const scale = 1 / zoom;
  // —— 屏幕上的目标位置（像素）——
  const baseX = 960;   
  const baseY = 720;
  // 折算成 QJ 坐标系
  const posX  = baseX / zoom;
  const posY  = baseY / zoom;
  
  let fontFace = "MPLUS2ExtraBold";
  if (ConfigManager.language === 0)  fontFace = "Mochiy Pop One";
  
  for (let i = 0; i < textArray.length; i++) {
	  let BulletText = textArray[i];
	  let yy = posY + (48*i);
	  QJ.MPMZ.Shoot({	  
		  img: ['T', {
				text: BulletText,
				arrangementMode: 0,
				textColor: "#ffffd5",
				fontSize: 54,
				outlineColor: "#e53789",
				outlineWidth: 0,
				fontFace: fontFace,
				fontItalic: false,
				fontBold: true,
				width: -1,
				height: -1,
				textAlign: 5,
				lineWidth: 0,
				lineColor: "#ffffff",
				lineRate: 1.0,
				backgroundColor: null,
				backgroundOpacity: 1,
				shadowBlur: 12,
				shadowColor: "#000000",
				shadowOffsetX: 0,
				shadowOffsetY: 0
		  }],
		  position: [['S', posX], ['S', yy]],
		  groupName: ['ShioneLines'],
		  initialRotation: ['S', 0],
		  imgRotation: ['F'],
		  opacity: '0|0~60/1~99999|1',
		  moveType: ['S', '0'],
		  z: 'A',
		  scale: scale,
		  onScreen: true,
		  anchor: [0.5, 0],         
		  existData: [
				  { t: ['Time', 360], d:[0,60] },
				  { t: ['S', "TouchInput.drill_isLeftPressed()||TouchInput.drill_isLeftTriggered()", true], d:[0,60], c:['S', `this.time > 120`] },
		  ],  
	  }); 
   }
};

// BOSS名演出
QJ.MPMZ.tl.BossSpecialNameDisplay = function (extra = {}) {
	
  if (!this) return;
  let oeid = this._eventId; 
  let boss = $gameMap.event(oeid);
  if (!boss || !boss._sourceeventId)  return;

  let bossName =  "?????";
  let subtitle =  "★${}★";
  let stext = "?????";
  
  let eid = String(boss._sourceeventId);
  let textArray1 = window?.prototypeEventTemplate?.[eid]?.bossName;
  if (textArray1) {
	  bossName = Array.isArray(textArray1) ? textArray1.join("\n") : (textArray1 ?? "");
  }
  let textArray2 = window?.prototypeEventTemplate?.[eid]?.subtitle;
  if (textArray2) {
	  stext = Array.isArray(textArray2) ? textArray2.join("\n") : (textArray2 ?? "");
  }
  if (window?.prototypeEventTemplate?.[eid]?.garble) {
  // 加密混淆  
      bossName = garble(bossName);
      stext    = garble(stext);
  }
  subtitle = subtitle.replace(/\$\{[^}]*\}/g, stext);

  // 初始化血条变量框
  let BossCount = $gameMap.drill_COET_getEventsByTag_direct("BOSS").length;
  boss.BossCount = BossCount;
  let HP  = $gameSelfVariables.get(this, 'HP');
  let MAX = $gameSelfVariables.get(this, 'MHP');
  if (HP <= 0 || MAX <= 0 ) {
	  HP  = 99999;
	  MAX = 99999; 
  }
  $gameVariables.setValue(160 + BossCount, HP);
  let bindTankId = 9 + BossCount;
  let dataBind = $gameSystem._drill_GFV_bindTank[ bindTankId ];
  dataBind['slot_list'][ 0 ]['var_id'] = 160 + BossCount;
  dataBind['slot_list'][ 0 ]['level_max'] = MAX;
  dataBind['commandParamChanged'] = true;
  dataBind.frame_x = 462;  
  dataBind.frame_y = 200 + 800 * (BossCount - 1);
  dataBind.style_id = 11;  
  if (!extra.hideHPbar) {
    dataBind.visible = true;
    $gameTemp._drill_GFV_needRefresh = true;
  }
  
  
  // 生成boss名称
  let bulletId = 0;
  for (let i = 0; i < 2; i++) {
  let shootText = QJ.MPMZ.tl.BossNameshootText({
    text: bossName,
    x: 960, 
	y: 130 + 800 * (BossCount - 1),           
    fontSize: 100,
	oeid: oeid,
	BossIndex: BossCount,
    outlineWidth: 0,
    width: 1920,
    shadowBlur: 15,
	z: extra.z?extra.z: "A",
	existData: [
	   {t: ['S', `!$gameMap.event(${oeid})?._Immortality && $gameSelfSwitches.value([$gameMap.mapId(), ${oeid}, 'D'])`, true], a: ['S','$gameVariables.setValue(82, this.time)'], d:[0,60]},
	],
    //moveJS: [[60, 60, "this.addTimelineEffect('S',[-1,4,5])"]]
  });
  if (i == 0) bulletId = shootText;
  // 副标题
  QJ.MPMZ.tl.BossNameshootText({
    text: subtitle,
    x: 960, 
	y: 55 + 800 * (BossCount - 1),
    fontSize: 34,
	oeid: oeid,
    outlineWidth: 1,
    shadowBlur: 8,
	z: extra.z?extra.z: "A",
	existData: [
	   {t: ['S', `!$gameMap.event(${oeid})?._Immortality && $gameSelfSwitches.value([$gameMap.mapId(), ${oeid}, 'D'])`, true], d:[0,60]},
	]
  });
 }
  // 追加血量监听和特殊机制
    setTimeout(() => {
		  let bullet = $gameMap._mapBulletsQJ[bulletId];
		  if (!bullet) return;
		  let bidList = $gameMap.getGroupBulletListQJ('boosBar');
		  bullet.addMoveData("F",[10,10,QJ.MPMZ.tl.ex_BossHealthCheck,[oeid,bidList]]);
		  
		  // 妹抖兔
		  if (Number(eid) == 59) {
		     bullet.addMoveData("F",[10,10,QJ.MPMZ.tl.MaidBunnyActionListener]);
		  }
		  
    }, 100); 
 
};

QJ.MPMZ.tl.BossNameshootText = function (opts) {
  opts = opts || {};
  var z = 2;
  var autoScale = (opts.autoScale !== false);     // 默认自动适配缩放

  var sx = autoScale ? (opts.x / z) : (opts.x || 0);
  var sy = autoScale ? (opts.y / z) : (opts.y || 0);
  // 为移动动画预留空间
      sy -= 120;
  var scale = autoScale ? (1 / z) : (opts.scale != null ? opts.scale : 1);

  var textCfg = {
    text: String(opts.text || ""),
    arrangementMode: 0,
    textColor: opts.textColor || "#ffffff",
    fontSize: (opts.fontSize != null ? opts.fontSize : 28),
    outlineColor: (opts.outlineColor || "#ff1818"),
    outlineWidth: (opts.outlineWidth != null ? opts.outlineWidth : 1),
    fontFace: (opts.fontFace || "Noto Sans JP Black"),
    fontItalic: !!opts.fontItalic,
    fontBold: (opts.fontBold !== false),          // 默认加粗
    width: (opts.width != null ? opts.width : -1),
    height: (opts.height != null ? opts.height : -1),
    textAlign: (opts.textAlign != null ? opts.textAlign : 5),
    lineWidth: 0,
    lineColor: "#ffffff",
    lineRate: 1.0,
    backgroundColor: null,
    backgroundOpacity: 1,
    shadowBlur: (opts.shadowBlur != null ? opts.shadowBlur : 5),
    shadowColor: (opts.shadowColor || "#ff0000"),
    shadowOffsetX: (opts.shadowOffsetX || 0),
    shadowOffsetY: (opts.shadowOffsetY || 0),
	BossIndex: (opts.BossIndex|| 1),
  };

  let bullet = QJ.MPMZ.Shoot({
    img: ['T', textCfg],
    position: [['S', sx], ['S', sy]],
	groupName: ['boosBar'],
    initialRotation: ['S', 180],
    imgRotation: ['S',0],
    opacity: (opts.opacity != null ? opts.opacity : '0|0~120/1~99999999|1'),
    moveType: ['S', '0|2~120/0~99999999|0'],
    z: (opts.z || "A"),
    scale: scale,
	oeid: opts.oeid,
	BossIndex: opts.BossIndex,
    onScreen: true,
    anchor: (opts.anchor || [0.5, 0.5]),
    existData: (opts.existData || []),
  });
  return bullet.index;
  
};


//BOSS血量监听
QJ.MPMZ.tl.ex_BossHealthCheck = function(EID,bidList) {
	
	 if (!EID) return;
	 
	 let currentHp = $gameSelfVariables.value([$gameMap.mapId(), EID, "HP"]);
	 this._recordHP = this._recordHP || currentHp;
	 let BossIndex = this.data.BossIndex || 1;
	 let Variables = 160 + BossIndex;
     $gameVariables.setValue(Variables, currentHp);
	 
	 if (currentHp < this._recordHP) {
		let value =  this._recordHP - currentHp;		 
		this._recordHP = currentHp;
		
		if (value < 200) return;
		
		if (bidList) {
			let angle = Math.randomInt(360);
			let distance = 1 + Math.randomInt(4);
    		bidList.forEach(function(bid) {
        		let bullet = $gameMap._mapBulletsQJ[bid];
				if (bullet) {
				    bullet.addTimelineEffect('S',[angle,distance,4]);
				}
    		});			
		}
	 }
	 
};

// BOSS皇冠-王权征令
QJ.MPMZ.tl.RoyalDecreeMark = function(extraData = {offsetX: 0, offsetY: 0, scale: 1}) {

    if (extraData.refresh) {
	  let eid   = this.data.eid;
	  let user  = $gameMap.event(eid); 
	  if (!user) {
		  this.setDead({ t: ["Time", 0] }); 
		  return;
	  }
	  let isDead = $gameSelfSwitches.value([$gameMap.mapId(), eid, 'D']);
	  if (!isDead) return;
	  if (!user.drill_EFOE_isPlaying()) return;
	  // 无伤逃跑
	  if (user.NoDamageEscape) {
		  this.setDead({ t: ["Time", 0], d: [0, 20] });
		  return;
	  }
	  // 在岸上无力化
	  if (user.CannotEscape) {	  
	      QJ.MPMZ.tl.RoyalDecreeMark.call(this, {checkDrops:true});
		  this.setDead({ t: ["Time", 0], d: [0, 20] });
	  }
	  this.setDead({ t: ["Time", 0] });
	  return;	
	}
	
	if (extraData.checkDrops) {
	  let eid    = this.data.eid;
	  let target = $gameMap.event(eid);
	  if (!target) return;
	  let chance = 0.05;
	  if (target._interruptSleep) chance += 0.15;
	  let regionId = $gameMap.regionId(Math.round(this.x/48), Math.round(this.y/48));
	  if (regionId !== 8) chance += 0.3;
	  if (chance < Math.random()) return;
      let item   = $dataArmors[80];
      dingk.Loot.getMapDrops(target,item);
	  AudioManager.playSe({ name: "キラン☆キラーン 派手なインパクト3", volume: 80, pitch: 100, pan: 0 });	
	  return;
	}
	
    let eid     =  this._eventId;
	let offsetX = extraData.offsetX;
	let offsetY = extraData.offsetY;
	let scale   = extraData.scale;
    let posX    = `$gameMap.event(${eid})?$gameMap.event(${eid}).screenBoxXShowQJ()+${offsetX}:0`;
    let posY    = `$gameMap.event(${eid})?$gameMap.event(${eid}).screenBoxYShowQJ()+${offsetY}-($gameMap.event(${eid}).isJumping()?64:0):0`;
	
    QJ.MPMZ.Shoot({
		img: "Magic/RoyalDecreeMark[10,7]",
		groupName: ['RoyalDecreeMark'],
        position:[['S',posX],['S',posY]],
        initialRotation:['S',0],
        moveType:['D',true],
		anchor:[0.5,0.5],
		scale: scale,
		eid: eid,
		opacity: "0|0~40/1~999999|1",
		imgRotation:['S',0],
		collisionBox:['C', 1],
		timeline:['S',0,120,[0,4,60]],
        existData:[
        ],
		moveF: [
		   [15,15,QJ.MPMZ.tl.RoyalDecreeMark,[{refresh:true}]]
		]
    });	
	
};
	

//兔子洞-出现
QJ.MPMZ.tl.rabbitHoleAppear = function(target, offsetX = 0, offsetY = 0, z = 1) {  
   
   if (!target) return;
   AudioManager.playSe({ name: "Push", volume: 70, pitch: 70, pan: 0 });
   let scale = 0.75;   
   let posX = 0;
   let posY = 0;
   
   if (target instanceof Game_Event || target instanceof Game_Player) {   
      posX = target.screenBoxXShowQJ() + offsetX;
      posY = target.screenBoxYShowQJ() + offsetY;
   } else {
      if ( Object.getPrototypeOf(target) == Object.prototype ) {
         posX = target.x + offsetX;
		 posY = target.y + offsetY;
	  }		  
   }
	 
   QJ.MPMZ.Shoot({
        img:'pipofm-groundeffect05[5,4,4]',
		position:[["S",posX],["S",posY]],
        initialRotation:['S',0],
		groupName:["rabbitHole"],
		scale:scale,
		opacity:1,
		anchor:[0.5,0.54],
        moveType:['S',0],
		z:z,
		existData:[
           {t:['Time',76]},
        ],
        collisionBox:['E', 46, 20],
		//collisionBox:['S', 48, 0, 60],
		moveF:[[74,999,QJ.MPMZ.tl.rabbitHoleEffect,["start"]]]
    });
	  	  
};

QJ.MPMZ.tl.rabbitHoleEffect = function(initialize) {  
   if (initialize && initialize === "refresh") {
     let hp = this.data.hp || 100;
	 if (hp > 0) return false;
     let posX    = this.inheritX();	
     let posY    = this.inheritY();
	 if ( QJ.MPMZ.rangeAtk([['S', posX],['S', posY]],['G','BOSS'],[],['C',8]).length > 0) { 
	     this.data.hp = 10;
	     return false;
	 }
	 return true;
   }

   if (initialize && initialize === "start") {   
    let posX    = this.inheritX();	
    let posY    = this.inheritY();
    let scale   = this.scaleX;	
	let z       = this.data.z;
    let rabbitHole = QJ.MPMZ.Shoot({
        img:'pipofm-groundeffect05',
		position:[["S",posX],["S",posY]],
	    initialRotation: ['S', 0],
        imgRotation: ['S', 0],
		groupName:["rabbitHole","Destructible","rabbitHoleEffect"],
		scale:scale,
		hp: 120,
		opacity:1,
		anchor:[0.5,0.54],
        moveType:['S',0],
		z:z,
		existData:[
           //{t:['Time',78]},
		   {t:['F',QJ.MPMZ.tl.rabbitHoleEffect,["refresh"],true], a:['F',QJ.MPMZ.tl.rabbitHoleDisappear,["needSE"]]},
		   {t:['B',["playerFeet"]],a:['C',134,[-1]],p:[-1,false,true],c:['S',"QJ.MPMZ.tl.ex_playerFallCheck('rabbitHole')"]},
		   {t:['G',['"object"','starDoor']],a:['C',134],p:[-1,false,true],c:['T',0,60,true],cb:['E',52, 26]},
        ],
        collisionBox:['E', 46, 20],
		//moveF:[[180,180,QJ.MPMZ.tl.rabbitHoleJackBomb]]
      });
   }
};

// 兔子洞投掷炸弹
QJ.MPMZ.tl.rabbitHoleJackBomb = function() { 
   
   let bid = this.index;
   if (QJ.MPMZ.rangeAtk([['B', bid],['B', bid]],['G','BOSS'],[],['C',20]).length > 0) return
   
   let posX = this.x / 48;
   let posY = this.y / 48;
   let eid = $gameMap.spawnEventQJ(1, 23, posX, posY, false);
   let e = $gameMap.event(eid);
   if (!e) return;   
   e._opacity = 0;
   
   let angle = Math.randomInt(360);
   if (Math.random() > 0.3) {
	   let tarX = $gamePlayer._x;
	   let tarY = $gamePlayer._y;
	   angle = QJ.calculateAngleByTwoPointAngle(posX, posY, tarX, tarY);
   }
   
   let dis = 1.5 + (2 * Math.random());
   QJ.MPMZ.tl.ex_jumpWithAngle(eid, angle, dis);
   AudioManager.playSe({ name: "Jump2", volume: 50, pitch: 80 + Math.randomInt(40), pan: 0 });
	  
   
};

// 兔子洞消失
QJ.MPMZ.tl.rabbitHoleDisappear = function(initialize) {  

    if (initialize && initialize === "summonCarrot") {
		let list = $gameMap.getGroupBulletListQJ('rabbitHoleEffect');
		if (list.length > 0) {
			for (const bid of list) {
			   let bullet = $gameMap._mapBulletsQJ[Number(bid)];
			   if (bullet) {
				   let xx = bullet.x / 48;
				   let yy = bullet.y / 48;
				   if ([0,5,15].includes($gameMap.regionId(Math.floor(xx), Math.floor(yy)))) {
					  xx -= 0.5;
                      yy -=	0.4; 				  
					  let eid = $gameMap.spawnEventQJ(1, 60, xx, yy, true);
					  let   e = $gameMap.event(eid);
					    if (e) {
							e._opacity = 0;
							e.drill_EFIE_playShowingEnlarge( 60, 1, false );
							AudioManager.playSe({ name: "Jump2", volume: 80, pitch: 80 + Math.randomInt(40), pan: 0 });
							break;
						}						
				   }
			   }
			}
		}
		return;
	}

    if (initialize && initialize === "needSE") {
		AudioManager.playSe({ name: "Push", volume: 30, pitch: 100, pan: 0 });
    }
	
    if (
      !(this instanceof Game_QJBulletMZ) &&
      !(this instanceof Game_QJLaserMZ) &&
      Object.getPrototypeOf(this) !== Object.prototype
    ) {
      return;
    }

    let posX    = this.inheritX();	
    let posY    = this.inheritY();
    let scale   = this.scaleX;	
	let z       = this.data.z;	 
       QJ.MPMZ.Shoot({
        img:'pipofm-groundeffect05_alt[5,4,4]',
		position:[["S",posX],["S",posY]],
        initialRotation:['S',0],
		//groupName:["rabbitHole"],
		scale:scale,
		opacity:1,
		anchor:[0.5,0.54],
        moveType:['S',0],
		z:z,
		existData:[
           {t:['Time',79]},
        ],
        collisionBox:['E', 58, 24],
      });
	  	  
};

// 连续召唤兔子洞
QJ.MPMZ.tl.spawnRabbitHoleChain = function(initialize) {

   if ( initialize && initialize === "start" ) {
	let eid = this._eventId; 
    let time = 240 + Math.randomInt(180);
    let deadCode = `!$gameMap.event(${eid}) || $gameMap.event(${eid})._IsDisabledCounter > 0`;	
    QJ.MPMZ.Shoot({
		groupName: ['spawnRabbitHole'],
        initialRotation: ['S', 0],
        position: [['E',eid], ['E',eid]],
        moveType: ['S', 0],
        existData: [
	       { t: ['Time', time] },
		   { t: ['S', deadCode,true], a:['S',`if ($gameMap.event(${eid})) {
			                                     $gameMap.event(${eid})._skillInterrupted = true;
		                                       }`]},
	    ],
		chance: 12,
	    moveF: [
	       [30,30,QJ.MPMZ.tl.spawnRabbitHoleChain,["spawn"]]
	   ]
    });
	return;
   }	

	
   if ( initialize && initialize === "spawn" ) {
     function randPointInCircle(cx, cy, R) {
       const a = Math.random() * Math.PI * 2;   // 随机角度
       const r = Math.sqrt(Math.random()) * R;  // 半径要开方，保证均匀分布
       const x = Math.round(cx + r * Math.cos(a));
       const y = Math.round(cy + r * Math.sin(a));
       return { x, y };
     }
	 
	 const playerX = $gamePlayer.screenBoxXShowQJ();
	 const playerY = $gamePlayer.screenBoxYShowQJ();
     const p = randPointInCircle(playerX, playerY, 350);
	 
	 const tileX = (p.x / 48) + $gameMap.displayX() - 0.5;
	 const tileY = (p.y / 48) + $gameMap.displayY() - 0.5;
	 const regionId = $gameMap.regionId(tileX, tileY);
     if ( QJ.MPMZ.rangeAtk([['S', p.x],['S', p.y]],['B','rabbitHole'],[],['C',40]).length == 0 && ![3,255].includes(regionId)) {
		 QJ.MPMZ.tl.rabbitHoleAppear(p);
	 } else if (this.data.chance > 0) {
        this.data.chance -= 1;		 
		QJ.MPMZ.tl.spawnRabbitHoleChain.call(this, "spawn");		
	 }
   }
   
   if ( initialize && initialize === "spawnJackBomb" ) {
	 
	 const playerX = $gamePlayer.screenBoxXShowQJ();
	 const playerY = $gamePlayer.screenBoxYShowQJ();	 
	 const list = QJ.MPMZ.rangeAtk([['S', playerX],['S', playerY]],['B','rabbitHole'],[],['C',80]);
	 if (list.length > 0) {
		 list.forEach(function(bullet) {
			 if (Math.random() > 0.7) return; 
			 if (bullet) {
				 QJ.MPMZ.tl.rabbitHoleJackBomb.call(bullet);
			 }			 
		});
	  }
   }   
};


// 随机切换兔子洞
QJ.MPMZ.tl.randomSwitchRabbitHole = function (initialize) {

  if (initialize && initialize === "check") {
    const eid  = this._eventId;
    const base = 0.1;
    const dis  = $gamePlayer.calcDistance(eid);

    // dis=600 → t=0；dis=0 → t=1
    const t = Math.max(0, Math.min(1, 1 - dis / 600));
    let chance = base + (0.8 - base) * t;
    chance = Math.min(chance, 0.99);

    return Math.random() < chance;
  }

  // BOSS进行兔子洞传送
  if (initialize && initialize === "switch") {
    const listRaw = $gameMap.getGroupBulletListQJ("rabbitHoleEffect") || [];
    const bidRaw  = $gameSelfVariables.get(this, "rabbitHoleEffect");

    // 统一成字符串比较、去空并去重
    const list = [...new Set(listRaw.filter(v => v != null).map(String))];
    const cur  = String(bidRaw);

    // 排除当前的兔子洞
    let pool = list.filter(id => id !== cur);
    if (pool.length === 0) return;

    // 打乱顺序（Fisher–Yates）
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    // 选一个存在且未触发追踪(_moved=false)的洞
    let chosen = null;
    let bullet = null;
    while (pool.length > 0) {
      const id = pool.pop();
      const b  = $gameMap._mapBulletsQJ[id];
      if (b && !b._moved) {
        chosen = id;
        bullet = b;
        break;
      }
    }
    if (!bullet) return; 

    // 更新记录 & 切换位置
    $gameSelfVariables.set(this, "rabbitHole", chosen);
    const xx = (bullet.x - 25) / 48;
    const yy = (bullet.y -  9) / 48;
    $gameMap.event(this._eventId).setPosition(xx, yy);
    return;
  }

  // 随机选一个非当前洞，让它追踪玩家
  if (initialize && initialize === "track") {
    const bulletList = $gameMap.getGroupBulletListQJ("rabbitHoleEffect") || [];
    const bidRaw     = $gameSelfVariables.get(this, "rabbitHole");

    const listKeys = [...new Set(bulletList.filter(v => v != null).map(String))];
    const bidKey   = String(bidRaw);

    // 过滤掉当前兔子洞记录
    let candidates = listKeys.filter(k => k !== bidKey);
    if (candidates.length === 0) candidates = listKeys.slice();

    let randomKey = null;
    while (candidates.length > 0) {
      const i   = Math.floor(Math.random() * candidates.length);
      const key = candidates.splice(i, 1)[0];
      const bullet = $gameMap._mapBulletsQJ[key];
      if (bullet) {
        randomKey = key;
        AudioManager.playSe({ name: "Magic2", volume: 80, pitch: 60, pan: 0 });
        bullet.changeAttribute("moveType", ["TB", "playerFeet", 1, 6, 12]);
        bullet._moved = true;
        bullet.addExistData({
          t: ["B", ["playerFeet"]],
          a: ["F", QJ.MPMZ.tl.rabbitHoleDisappear, ["needSE"]]
        });
        break;
      }
    }

    if (!randomKey) {
      console.warn("没有可用的兔子洞可选（可能都失效了）");
    }
    return;
  }

  // —— 玩家掉进兔子洞—— 
  if (initialize && initialize === "playerFall") {
	  
	function playerFallIntoAir() {
	  // 被送到了空中
      let labelName = "FallIntoAir";
      for (let i = 0; i < this._list.length; i++) {
        let command = this._list[i];
        if (command.code === 118 && command.parameters[0] === labelName) {
           this.jumpTo(i);
           break;
        }
      }		
	}			  
    const list = $gameMap.getGroupBulletListQJ("rabbitHole") || [];
    if (list.length > 1) {		
	  // 小概率还是被送去了空中		
	  if(Math.random() > 0.9) {
		playerFallIntoAir.call(this);  
        return;
	  }		  
      const bid         = this.bulletId;
      const candidates  = list.filter(v => v !== bid);
      const randomValue = candidates[Math.floor(Math.random() * candidates.length)];
      const bullet      = $gameMap._mapBulletsQJ[randomValue];

      if (bullet) {
        const xx = bullet.x / 48;
        const yy = bullet.y / 48;
        $gamePlayer.setPosition(xx, yy);
      }

      // 复原镜头位置
      drowsepost.camera.zoom($gameScreen.zoomScale(), 20, -1);
    } else {
	  playerFallIntoAir.call(this);   
    }
    return;
  }
};



// 妹抖兔BOSS行为监听
QJ.MPMZ.tl.MaidBunnyActionListener = function() {
	
	
	let eid = this.data.oeid;
	let bid = $gameSelfVariables.value([$gameMap.mapId(), eid, 'rabbitHole']);
	if (this.time % 60 > 50) {
		let posX = $gameMap.event(eid)?.screenBoxXShowQJ() || 0;
		let posY = $gameMap.event(eid)?.screenBoxYShowQJ() || 0;
		let check = QJ.MPMZ.rangeAtk([['S', posX],['S', posY]],['B','rabbitHole'],[],['C',4]);
		if (check.length > 0) {
			let newId = check[0].index;
		   // 记录值不匹配时需及时更新兔子洞ID	
		   if (newId !== bid) {
			  bid = newId; 
		      $gameSelfVariables.setValue([$gameMap.mapId(), eid, 'rabbitHole'], newId);
		   }
		}
	}
	
	let bullet = $gameMap._mapBulletsQJ[bid];
	// 妹抖兔待着的洞被破坏
	if (!bullet) {
		if ($gameMap.drill_COET_getEventsByTag_direct("妹抖兔").length > 0) {
			
		}
	}
};

// 胡萝卜导弹攻击模式
QJ.MPMZ.tl.carrotMissileAttack = function(initialize) {


   if (initialize && initialize === "MissileDropStart") {
   let offsetX = 100;  
   let offsetY = 360 + Math.randomInt(200);
   let angle = 90;   
   let posX = $gamePlayer.screenShootXQJ() - offsetX;
   let posY = $gamePlayer.screenShootYQJ() - offsetY;
   
   if (Math.random() > 0.5) {
	   posX  = $gamePlayer.screenShootXQJ() + offsetX;
	   angle = 270;
   }
   
   QJ.MPMZ.Shoot({
		position:[['S',posX],['S',posY]],
        initialRotation:['S',angle],
		imgRotation:['S',0],
		moveType:["S", '0|2~180/15~999|15'],
        existData:[ 
		    {t: ['Time', 150]}  
		],
		offsetX: offsetX,
		offsetY: offsetY,
        moveF: [
		    [0,15,QJ.MPMZ.tl.carrotMissileAttack,["MissileDrop"]]
		]
    });	
	
	return;
  }
  
  if (initialize && initialize === "MissileDrop") { 	  
  let posX = this.inheritX();
  let posY = this.inheritY(); 
  let angle = this.inheritRotation();
  let tarX = posX - this.data.offsetX;
  if (angle > 90)  tarX = posX + this.data.offsetX;
  var tarY = posY + this.data.offsetY + 32;  
  let peakRate = 0.5;
  let targetY = tarY + $gameMap.displayY() * 48;
  let { time, xExp, yExp } = QJ.MPMZ.tl.BulletMissileDropFormula(posX, posY, tarX, tarY, peakRate, 4, 40, 40);
  // 胡萝卜导弹
  let carrot = QJ.MPMZ.Shoot({
        img:'carrotMissle', 
		groupName:["carrotBomb","Stoppable"],
		position:[['S',posX],['S',posY]],
        initialRotation:['S',0],
		scale:1,
		bombType: 1,
		anchor:[0.5,1],
		collisionBox: ['R', 18, 80],
		opacity:'0|1~${time-1}|1~999|0',
        imgRotation:['S',0],
		moveType:["F", xExp, yExp],
        existData:[ 
		    // {t: ['Time', time], a:['F',QJ.MPMZ.tl.ex_enemy_carrotThrowEffect,[0,4]]}  
			{t: ['Time', time], a:['F',QJ.MPMZ.tl.ex_JackBomb]},
            {t: ['B', "rabbitHole"], a:["S","AudioManager.playSe({ name: 'Fall', volume: 70, pitch: 90+Math.randomInt(20), pan: 0 })"],d:[1,30,0], cb:['R', 4, 85], c:['S',`this.y >= ${targetY} - 4`]}			
		],
    });
   // 导弹的影子
   let scaleXY = carrot.scaleX * 0.66;
   let index = carrot.index;
   QJ.MPMZ.Shoot({
        img:'missile_shadow', 
		groupName:["Stoppable"],
		position:[['S',posX],['S',tarY]],
        initialRotation: ['S', 0],
		scale:`0|0~${time}/${scaleXY}~999|${scaleXY}`,
        imgRotation:['S',180],
		moveType: ["F", '0', yExp],
		anchor:[0.5,1],
        existData:[ 
		    {t: ['BE', index]}  
		],

    });		
	AudioManager.playSe({ name: "Fall", volume: 50, pitch: 80, pan: 0 });
	return;
  }
   // 定点打击-自由落体
   if (initialize && initialize === "TargetedBombing") {
   let offsetX = 30;  
   let offsetY = 420 + Math.randomInt(240);
   let angle   = 180;   
   let posX    = $gamePlayer.screenBoxXShowQJ() - offsetX + Math.randomInt(60);
   let posY    = $gamePlayer.screenBoxYShowQJ() - offsetY;
   let tarY    = $gamePlayer.screenBoxYShowQJ() - 10 + Math.randomInt(32);
   let targetY = tarY + $gameMap.displayY() * 48;
   let { time, xExp, yExp } = QJ.MPMZ.tl.freeFallByTime(posY, tarY, 70);
   
   let carrot  = QJ.MPMZ.Shoot({
	    img:'carrotMissle', 
		groupName:["carrotBomb","Stoppable"],
		position:[['S',posX],['S',posY]],
        initialRotation:['S',180],
		imgRotation:['S',0],
		collisionBox: ['R', 18, 80],
		scale:1,
		bombType: 1,
		anchor:[0.5,1],
		opacity:'0|1~${time}|1~999|0',
		moveType:["F", yExp, "0"],
        existData:[ 
		    //{t: ['Time', time], a:['F',QJ.MPMZ.tl.ex_enemy_carrotThrowEffect,[0,4]]}  
			{t: ['Time', time], a:['F',QJ.MPMZ.tl.ex_JackBomb]},
			{t: ['B', "rabbitHole"], a:["S","AudioManager.playSe({ name: 'Fall', volume: 70, pitch: 90+Math.randomInt(20), pan: 0 })"],d:[1,30,0], cb:['R', 4, 85], c:['S',`this.y >= ${targetY} - 4`]}
		]
    });	
   // 导弹的影子
   time -= 4;
   tarY += 18;
   let scaleXY = carrot.scaleX * 0.66;
   let index = carrot.index;
   QJ.MPMZ.Shoot({
        img:'missile_shadow',
        groupName:["Stoppable"],		
		position:[['S',posX],['S',tarY]],
        initialRotation: ['S', 0],
		scale:`0|0~${time}/${scaleXY}~999|${scaleXY}`,
        imgRotation:['S',0],
		moveType: ["S", 0],
		anchor:[0.5,0.5],
        existData:[ 
		    {t: ['BE', index]}  
		],

    });		
	AudioManager.playSe({ name: "Fall", volume: 50, pitch: 80, pan: 0 });
	return;
  }  

   // 沙皇核弹
   if (initialize && initialize === "TsarCarrotNuke") {
   let offsetX = 30;  
   let offsetY = 420 + Math.randomInt(240);
   let angle   = 180;   
   let posX    = $gamePlayer.screenBoxXShowQJ() - offsetX + Math.randomInt(60);
   let posY    = $gamePlayer.screenBoxYShowQJ() - offsetY;
   let tarY    = $gamePlayer.screenBoxYShowQJ() - 10 + Math.randomInt(32);
   let targetY = tarY + $gameMap.displayY() * 48;
   let { time, xExp, yExp } = QJ.MPMZ.tl.freeFallByTime(posY, tarY, 120);
   
   let carrot  = QJ.MPMZ.Shoot({
	    img:'carrotMissle', 
		groupName:["carrotBomb","Stoppable"],
		position:[['S',posX],['S',posY]],
        initialRotation:['S',180],
		imgRotation:['S',90],
		collisionBox: ['R', 18, 80],
		scale:12,
		bombType: 1,
		anchor:[0.75,0.5],
		opacity:'0|1~${time}|1~999|0',
		moveType:["F", yExp, "0"],
        existData:[ 
		    //{t: ['Time', time], a:['F',QJ.MPMZ.tl.ex_enemy_carrotThrowEffect,[0,4]]}  
			{t: ['Time', time], a:['C',306]},
			{t: ['B', "rabbitHole"], a:["S","AudioManager.playSe({ name: 'Fall', volume: 70, pitch: 90+Math.randomInt(20), pan: 0 })"],d:[1,30,0], cb:['R', 4, 85], c:['S',`this.y >= ${targetY} - 4`]}
		]
    });	
   // 导弹的影子
   time -= 4;
   tarY += 18;
   let scaleXY = carrot.scaleX * 0.66;
   let index = carrot.index;
   QJ.MPMZ.Shoot({
        img:'missile_shadow',
        groupName:["Stoppable"],		
		position:[['S',posX],['S',tarY]],
        initialRotation: ['S', 0],
		scale:[`0|0~${time}/${2.2*scaleXY}~999|${2.2*scaleXY}`,`0|0~${time}/${scaleXY}~999|${scaleXY}`],
        imgRotation:['S',0],
		moveType: ["S", 0],
		anchor:[0.5,0.5],
        existData:[ 
		    {t: ['BE', index]}  
		],

    });		
	AudioManager.playSe({ name: "Fall", volume: 50, pitch: 80, pan: 0 });
	return;
  }
  
};


// 冲撞攻击box
QJ.MPMZ.tl.ex_dashCollisionBulletGeneration = function(damage, collisionBox) {
    let eid = this._eventId;
    QJ.MPMZ.Shoot({
        img: "null1",
        position: [['E', eid], ['E', eid]],
        initialRotation: ['S', 0],
        imgRotation: ['F'],
        moveType: ['D', true],
        collisionBox: ['C', 25],
        existData: [
            { t: ['Time', 20] },
            { t: ['P'], a: ['F', QJ.MPMZ.tl.ex_dashCollisionBulletHitEffect], p: [-1, false, true] },
            { t: ['P'], a: ['F', QJ.MPMZ.tl.ex_playerDamageCheck, [damage, 1, 0, 0]] }
        ]
    });
};

// 冲撞攻击演出
QJ.MPMZ.tl.ex_dashCollisionBulletHitEffect = function() {
    let posX = this.inheritX();
    let posY = this.inheritY();

    QJ.MPMZ.Shoot({
        img: "animehit[5,4]",
        position: [['S', posX], ['S', posY]],
        initialRotation: ['S', 0],
        imgRotation: ['F'],
        moveType: ['S', 0],
        scale: 0.6,
        collisionBox: ['C', 1],
        z: "MF_UG",
        existData: [
            { t: ['Time', 19] }
        ]
    });
};

// 冲撞攻击移动路线
QJ.MPMZ.tl.ex_dashAttackPath = function(initialize,angle) {

  if (initialize && initialize === "start") {
  this._moveSpeed = 0;	  
  let angle = this.calcDeg($gamePlayer);
  let eid = this._eventId;  
  let posX = `$gameMap.event(${eid})?.screenBoxXShowQJ()||0`;
  let posY = `$gameMap.event(${eid})?.screenBoxYShowQJ()||0`;
  let deadCode = `let target = $gameMap.event(${eid});
                  if (target) {
                     target._skillFailed = true;
				  }`;

  
QJ.MPMZ.Shoot({
position:[['S',posX],['S',posY]],
initialRotation:['S',0],
imgRotation:['F'],
moveType:['D',true],
collisionBox:['C',26],
eid:eid,
existData:[ 
{t:['Time',25],a:["S",deadCode]},
{t:['P'],a:["F",QJ.MPMZ.tl.ex_enemy_AsabaDashCombo,["start",eid]]}
],
moveF:[
  [1,0,QJ.MPMZ.tl.ex_dashAttackPath,["move",angle]]
]
});
return;
}

  if (initialize && initialize === "move") {
let eid = this.data.eid;
let target = $gameMap.event(eid);
if (!target) return;
target._moveSpeed = 72;
target.dotMoveByDeg(angle);	
  }
};

//猫娘浅羽速攻投掷
QJ.MPMZ.tl._asabaThrowCfg = QJ.MPMZ.tl._asabaThrowCfg || (function() {
  const WEAPON_POOL = [1,2,3,8,9,10,11,12,13,14,15,16,17,18,19,20,21,27,36,42,51,53,60,62,63,70,80,81,82];

  // 魔法武器索引: attackType = 2
  const MAGIC_WEAPONS = new Set([15,16,17,19,42]);

  // 特效映射: weaponIndex -> [effect1, effect2]
  const EFFECT_MAP = {
    13: [5, 33],
    20: [5, 33],
    27: [5, 33],
    21: [6, 22],
    81: [6, 22],
    16: [7, 10],
    17: [8, 25],
    19: [8, 25],
    15: [9, 10],
    51: [9, 25],
  };

  const SE_POOL = ["キックの素振り1","パンチの素振り2","パンチの素振り3"];

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function hasStarDoor() {
    const list = $gameMap.drill_COET_getEventsByTag_direct("星之门");
    return list && list.length > 0;
  }

  return {
    WEAPON_POOL,
    MAGIC_WEAPONS,
    EFFECT_MAP,
    SE_POOL,
    pick,
    hasStarDoor,
  };
})();

QJ.MPMZ.tl.ex_enemy_AsabaWeaponThrow = function() {
  // 兼容一些“脱离事件对象直接调用”的情况
  if (!this) return;

  const cfg = QJ.MPMZ.tl._asabaThrowCfg;
  let effect1,effect2;
  // 随机武器
  const weaponIndex = cfg.pick(cfg.WEAPON_POOL);
  const weaponData = $dataWeapons && $dataWeapons[weaponIndex];
  if (!weaponData) return;

  const weaponDamage = (weaponData.params[2] || 0) + (weaponData.params[4] || 0);
  const weaponImg = "weapon/weapon" + weaponIndex;

  // 攻击类型
  const attackType = cfg.MAGIC_WEAPONS.has(weaponIndex) ? 2 : 1;

  // 特效覆盖
  const mapped = cfg.EFFECT_MAP[weaponIndex];
  if (mapped) {
    effect1 = mapped[0];
    effect2 = mapped[1];
  }

  // 发射起点
  const posX = this.screenShootXQJ();
  const posY = this.screenShootYQJ() - 5;

  // 锁定目标
  // 有星之门且概率满足 -> 朝 starDoor，否则朝玩家
  const target = (cfg.hasStarDoor() && Math.random() > 0.4)
    ? ['G','starDoor']
    : ['P'];

  // 弹道类型 + 存在时间
  const useTP = Math.random() > 0.75;
  const moveType = useTP ? ['TP', 12, 10, 12] : ['S','0|18~90/9~999/9'];
  const time = useTP ? 180 : 360;

  // 生成子弹
  const weapon = QJ.MPMZ.Shoot({
    img: weaponImg,
    position: [['S', posX], ['S', posY]],
    initialRotation: target,
    moveType: moveType,
    imgRotation: ['R', 32, true],
    collisionBox: ['R', 64, 8],
    scale: 0.8,
    existData: [
      { t: ['Time', time] },
      { t: ['R', [255]], c: ['S', 'this.time > 5'] },

      // 命中玩家
      {
        t: ['P'],
        a: ['F', QJ.MPMZ.tl.ex_playerDamageCheck, [weaponDamage, attackType, effect1, effect2]],
        c: ['S', '!QJ.MPMZ.tl.ex_playerBulletPhasing()']
      },

      // 命中敌人/物体
      {
        t: ['G', '"enemy"'],
		a: ['F', QJ.MPMZ.tl.ex_toEnemyAttack, [weaponDamage, {immuneItself: this._eventId, magicAttack:attackType>1,orbitingDamage:true,noHitEffect:true,noDurLoss:true,specifyAddedStatus:true,addedStatusType:effect1,addedStatusChance:effect2*100}]],
        c: ['S', 'this.time > 24||this._countered']
      },
      { t: ['G', '"object"'], a: ['C', 151, [weaponDamage, effect1, effect2]], c: ['S', 'this.time > 24||this._countered'] },

      // 星之门特殊处理
      { t: ['G', 'starDoor'], a: ['SS', 'C', true] },

      // 被 cancelEnemyBullet 之类击中则消失
      { t: ['B', 'cancelEnemyBullet'], d: [0, 10] },
    ],
    groupName: ['enemyBullet'],
  });

  // 音效
  const seName = cfg.pick(cfg.SE_POOL);
  const pitch = 95 + Math.randomInt(40);
  AudioManager.playSe({ name: seName, volume: 50, pitch: pitch, pan: 0 });

  return weapon;
};

// 萨卡班甲鱼王睡觉回复
QJ.MPMZ.tl.sacabambaspisSleepRecoverHP = function(initialize) {
	
	if (initialize && initialize === "sleep") {
        let eid = this.data.eid;
	    let currentHp = $gameSelfVariables.value([$gameMap.mapId(), eid, 'HP']);
	    let MHP = $gameSelfVariables.value([$gameMap.mapId(), eid, 'MHP']);
	    let name = 'enemyBleeding' + eid;
		let value = 1;
	    if ($gameMap.getGroupBulletListQJ(name).length == 0) { 
		   value = 5 + Math.randomInt(15);
	    }
		currentHp += value;
	    currentHp = Math.min(currentHp,MHP);
	    $gameSelfVariables.setValue([$gameMap.mapId(), eid, 'HP'], currentHp);
		if (currentHp < MHP) {
           QJ.MPMZ.Shoot({
               img: ['T', value, 0, '#06ff00', 12],
               position: [['S',this.inheritX()], ['S',this.inheritY()-72]],
               initialRotation: ['S', 0],
               imgRotation: ['F'],
               opacity: '0|1~90/0',
               moveType: ['S', '0|1~90/0.1~999/0.1'],
               existData: [{ t: ['Time', 90] }]
           });		
		}
		return;
	}
	
	if (initialize && initialize === "start") {	
	let eid  = this._eventId;
    let posX = `$gameMap.event(${eid}) ? $gameMap.event(${eid}).screenShootXQJ() : $gameMap.displayX()`;
    let posY = `$gameMap.event(${eid}) ? $gameMap.event(${eid}).screenShootYQJ() : $gameMap.displayY()`;
	let time = 360 + Math.randomInt(360);
    QJ.MPMZ.Shoot({
		img: "states/Regen[8,7]",
        position:[['S',posX],['S',posY]],
        moveType:['D',true],
		opacity:'0|0~90|0~60/1~9999|1',
        initialRotation:['S',0],
        imgRotation:['F'],
		anchor:[0.5,0.65],
		scale:2,
		eid: eid,
        collisionBox:['C',15],
        existData:[
            {t:['Time',time], d:[0,20]},
			{t:['S',`$gameSelfSwitches.value([$gameMap.mapId(), ${eid}, 'D'])`,true]},
            {t:['B',[`enemyparalysis${eid}`,`enemyFreeze${eid}`,`enemyDizzy${eid}`]], a:['S',`let target = $gameMap.event(${eid});
			                                                                                  if (target) {
																								  target._interruptSleep = true;																								  
																								 }`], c:['S','this.time > 120']}
        ],
		moveF: [
		    [120,10,QJ.MPMZ.tl.sacabambaspisSleepRecoverHP,["sleep"]]
		],
		deadJS: [
		    `let target = $gameMap.event(${eid});
			 if (target) {
				 target._stopSleep = true;
			 }`
		]
    });
     return;
	}
	
	if (initialize && initialize === "escape") {
        let eid = this._eventId;
        let target = $gameMap.event(this._eventId);
		// 直接水遁
		if (target.NoDamageEscape) return;		
        target.drill_EASA_setEnabled( true );
        let condition = DrillUp.g_COFA_condition_list[7];
        let c_area = $gameMap.drill_COFA_getShapePointsWithCondition(Math.floor(target._x), Math.floor(target._y), "圆形区域", 8, condition);
        if (c_area.length > 0) {
        let p      = c_area[Math.floor(Math.random() * c_area.length)];
        let xPlus  = p.x - target._x; 
		let yPlus  = p.y - target._y;
		let dis    = Math.sqrt(Math.abs(xPlus) + Math.abs(yPlus));
		let height = Math.round(60 + (dis * 6));
		let time   = Math.round(30 + (dis * 5));
        target._drill_JSp['enabled'] = true;
        target._drill_JSp['height'] = height;
        target._drill_JSp['time'] = time;
        target._drill_JSp['speed'] = -1;			
        target.jump(xPlus, yPlus);
		AudioManager.playSe({ name: "Jump2", volume: 80, pitch: 60, pan: 0 });	
        this.wait(time);        
		} else {
		  target.CannotEscape = true;	
		  for (var i = 0; i < this._list.length; i++) {
    		  let command = this._list[i];
    		  if (command.code === 118 && command.parameters[0] === "CannotEscape") {
        		  this.jumpTo(i);
        		  break;
    		  }
		  }
		}			
		return;
	}
	
};

// 萨卡班甲鱼王地震冲击
QJ.MPMZ.tl.sacabambaspisQuakeImpact = function(initialize, args) {
  

  if (initialize && initialize === "damage")  {
  let angle = 0;
  if (!args || !args.target) return;  
  const isPlayer = args.target instanceof Game_Player;
  const isEvent  = args.target instanceof Game_Event;

  const posX    = this.inheritX();
  const posY    = this.inheritY();
  const tarX    = args.target?.screenBoxXShowQJ() || 0;
  const tarY    = args.target?.screenBoxYShowQJ() || 0;
  angle = QJ.calculateAngleByTwoPointAngle(posX, posY, tarX, tarY);
  if (!Number.isFinite(angle)) angle = 0;
  if (isPlayer) {
      const damage = 233;
      QJ.MPMZ.tl.ex_playerDamageCheck(damage, 1);
      QJ.MPMZ.tl.ex_jumpWithAngle(-1, angle, 2);
  } else if (isEvent) {
	  const eventId = args.target._eventId;
	  if (this.data.eid === eventId) return;
      const damage  = 233;
      QJ.MPMZ.tl.ex_toEnemyAttack.call(
        this,
        damage,
        { noHitEffect: true, noDurLoss: true, independentAttack: true },
        args
      );
      QJ.MPMZ.tl.ex_jumpWithAngle(eventId, angle, 2);
    }
   return;
  }   

  if (initialize && initialize === "start")  {	  
	let eid  = this._eventId;
    let posX = `$gameMap.event(${eid}) ? $gameMap.event(${eid}).screenShootXQJ() : $gameMap.displayX()`;
    let posY = `$gameMap.event(${eid}) ? $gameMap.event(${eid}).screenShootYQJ() : $gameMap.displayY()`;
	let time = 15;
    QJ.MPMZ.Shoot({
        position:[['S',posX],['S',posY]],
        moveType:['D',true],
        initialRotation:['S',0],
        imgRotation:['F'],
		eid: eid,
        collisionBox:['R',200, 120],
        existData:[
            {t:['Time',time]},
			{t:['S',`$gameSelfSwitches.value([$gameMap.mapId(), ${eid}, 'D'])`,true]},
			{t:['G',['"enemy"','"object"']],a:['F',QJ.MPMZ.tl.sacabambaspisQuakeImpact,["damage"]],p:[-1,false,true]},
            {t:['P'],a:['F',QJ.MPMZ.tl.sacabambaspisQuakeImpact,["damage"]],p:[-1,false,true]}
        ],
    });	
  }
};


// 使用草莓召唤ASABA
QJ.MPMZ.tl.spawnASABAchototsumoushin = function(extra = {}) {

  if (extra.dustWalk) {
	   let posX = this.x / 48;
	   let posY = this.y / 48;
	   var name = "dust_walk" + this.time;
	   var data = $gameScreen._particle.particleSet(0, name, 'tilemap', 'dust_walk', 'below', posX, posY);   
	   $gameScreen._particle.reservePluginCommand(30,{},["clear",name],1);
	   
	   if ($gameMap.regionId(Math.floor(posX), Math.floor(posY)) === 5) {
		  var name = "grass_walk" + this.time;
		  var data = $gameScreen._particle.particleSet(0, name, 'tilemap', 'grass_walk', 'below', posX, posY);   
		  $gameScreen._particle.reservePluginCommand(30,{},["clear",name],1);	   
	   }	  
	   return;
  }

  if (extra.trySpawn) {  
      let reverseDirection = this.data.isRight;
	  let tarX = this._realX - 1 + (Math.random() * 2); 
	  let posX = tarX - (7 + Math.randomInt(6));
	  if (reverseDirection) posX = tarX + (7 + Math.randomInt(6));
	  let posY = this._realY - 2 + (Math.random() * 4);	
	  let time = 150;
	  let speed = 6;
	  let scaleX = reverseDirection ? -1 : 1;
	  let ASABAstrawberry = false;
	  if (this.data.ASABAstrawberry) ASABAstrawberry = true;
		// ASABA猪突猛进
	  let chahui = QJ.MPMZ.Shoot({
			img: "ASABA_run[5,4]",
			groupName: ['ASABA'],
			position: [['Map',posX],['Map',posY]],
			initialRotation: ['S', reverseDirection ? 270 : 90],
			imgRotation: ['S',0],
			scale: [scaleX,1],
			opacity: '0|0~20/1~9999|1',
			moveType: ['S',speed],
			blendMode: 0,
			anchor: [0.5,0.5],
			collisionBox: ['C',25],
			ASABAstrawberry: ASABAstrawberry,
			existData:[
				{t:['S',` !${reverseDirection} ? this._realX > ${tarX} : this._realX < ${tarX} `,true],a:['F',QJ.MPMZ.tl.spawnASABAchototsumoushin,[{spawnSuccess:true, strawberryX:this._realX, strawberryY:this._realY}]], d:[0, 5]},
				{t:['P'],a:['C', 326, [150,6,0]], p:[-1,false,true]},	
				{t:['P'],a:['F', QJ.MPMZ.tl.spawnASABAchototsumoushin,[{spawnSuccess:true, collisionSuccess:true}]], p:[-1,false,true]},
			],
			moveF:[	   
			   [2,2,QJ.MPMZ.tl.spawnASABAchototsumoushin,[{dustWalk:true}]]
			],
			z: 35
		});
	  return;
  }
   
  if (extra.spawnSuccess) {
	   let posX  = this.x / 48;
	   let posY  = (this.y-10) / 48;
	   let name  = "fuss_startdash" + this.time;
       $gameScreen._particle.particlePlay(0, name, 'tilemap', 'fuss_startdash', 'below', posX, posY);	   
	   let eid   = $gameMap.spawnEventQJ(1, 8, posX, posY, true);
	   let ASABA = $gameMap.event(eid);
	   if (!ASABA) return;	
       ASABA._disableRandom = true;
	   ASABA._strawberryX  = Math.round(extra.strawberryX*10) / 10;
	   ASABA._strawberryY  = Math.round(extra.strawberryY*10) / 10;
	   console.log(ASABA);
	   if (this.data.ASABAstrawberry) {
	       ASABA._ASABAstrawberry = true;
	   }
	   if (extra.collisionSuccess) {
		   ASABA._collisionSuccess = true;
		   this.setDead({t:['Time',0]});
	   }
	   return;
  }

  if (!this) return;
  let mapName = $dataMapInfos[$gameMap.mapId()].name;
  let nameWithoutNumbers = mapName.replace(/[0-9]/g, ''); 
  if ( !["冒険の遊歩道", "遺跡の森"].includes(nameWithoutNumbers) )  {
	 // ASABA只会出现在这两个地方 
	  return;
  }
  
  let posX   = this.inheritX(); 
  let posY   = this.inheritY(); 
  let bonus  = Math.min(2, this.time / 3600);  
  let range  = Math.round(180 * (1 + bonus));
  let ASABAstrawberry = false;
  let ASABA  = $gameMap.drill_COET_getEventsByTag_direct("ASABA").length;
  if (ASABA >= 2) return;  
  let num    = QJ.MPMZ.rangeAtk([['S', posX],['S', posY]],['B',"Strawberry"],[],['C',range]).length;
  num       += QJ.MPMZ.rangeAtk([['S', posX],['S', posY]],['B',"ASABAstrawberry"],[],['C',range]).length * 5;
  if (this.data.groupName.includes("ASABAstrawberry")) {
	  ASABAstrawberry = true; 
  }

  let chance = num * 500 - (ASABA * 300);
  chance    += chance * bonus;
  chance     = Math.max(1, chance);
  if (chance < Math.randomInt(10000)) return;
  
  let isRight = Math.random() > 0.5;
  let anchorX = isRight ? -0.04 : 1.04;
  let bullet = QJ.MPMZ.Shoot({
				  position:[['S',posX],['S',posY]],
                  initialRotation:['S',0], 
				  imgRotation:['F'],
                  moveType:['D',true], 
				  anchor:[anchorX,0.5],
                  collisionBox:['R', 540, 80],
				  isRight: isRight,
				  ASABAstrawberry: ASABAstrawberry,
                  existData:[				
						//{t:['NP'], a:[], cb:['R', 540, 1]},
						{t:['R', [8, 250, 254, 255]], a:[]},
						{t:['Time', 5], a:['F', QJ.MPMZ.tl.spawnASABAchototsumoushin, [{trySpawn:true}]]}			 
                  ]				  
			    });	

};

//ASABA旋转攻击
QJ.MPMZ.tl.ex_enemy_AsabaSpinAttack = function() {
	
	if (!this) return;
	let eid = this._eventId;
	let posX = `$gameMap.event(${eid})?.screenBoxXShowQJ()||0`;
	let posY = `$gameMap.event(${eid})?.screenBoxYShowQJ()||0`;
    QJ.MPMZ.Shoot({
        img:"null1",
        position:[['S',posX],['S',posY]],
        moveType:['D',true],
        initialRotation:['S',0],
        imgRotation:['F'],
        collisionBox:['C',33],
		scale:1,
        existData:[
            {t:['Time',240]},
			{t:['S',`$gameSelfSwitches.value([$gameMap.mapId(), ${eid}, 'D'])`,true]},
			{t:['P'],a:['F',QJ.MPMZ.tl.ex_playerDamageCheck,[20,1,0,0]],c:['T',0,10,true],p:[-1,false,true]},
			{t:['G','"enemy"','"object"'],a:['F',QJ.MPMZ.tl.ex_toEnemyAttack,[20,{immuneItself:eid,orbitingDamage:true,noHitEffect:true,noDurLoss:true}]],c:['T',0,10,true],p:[-1,false,true]},
            {t:['B',['enemyBullet','playerBullet']],a:['F',QJ.MPMZ.tl.ex_enemy_AsabaSpinAttackParry],p:[-1,false,true]}
        ],
		moveJS: [
		    [0,30,"AudioManager.playSe({ name: 'Raise2', volume: 50, pitch: 150, pan: 0 })"]
		]
    });
	
};

//ASABA反复横跳
QJ.MPMZ.tl.ex_enemy_AsabaZigZagMove = function() {
	
	if (!this) return;
	let eid = this._eventId;
	let posX = `$gameMap.event(${eid})?.screenBoxXShowQJ()||0`;
	let posY = `$gameMap.event(${eid})?.screenBoxYShowQJ()||0`;
    QJ.MPMZ.Shoot({
        eid: eid,
        position:[['S',posX],['S',posY]],
        moveType:['D',true],
        initialRotation:['S',0],
        imgRotation:['F'],
        collisionBox:['C',33],
		scale:1,
        existData:[
            {t:['Time',240]},
			{t:['S',`$gameSelfSwitches.value([$gameMap.mapId(), ${eid}, 'D'])`,true]},
			{t:['P'],a:['F',QJ.MPMZ.tl.ex_playerDamageCheck,[10,1,0,0]],c:['T',0,10,true],p:[-1,false,true]},
			{t:['G','"enemy"','"object"'],a:['F',QJ.MPMZ.tl.ex_toEnemyAttack,[10,{immuneItself:eid,orbitingDamage:true,noHitEffect:true,noDurLoss:true}]],c:['T',0,10,true],p:[-1,false,true]},
            {t:['B',['playerSkill','enemyBullet','playerBullet']],a:['S',`AudioManager.playSe({ name: 'Evasion1', volume: 70, pitch: 100, pan: 0 });
			                                                             let eid = this.data.eid;
			                                                             QJ.MPMZ.tl.ex_effectFonts("miss", eid); `], p:[-1,false,true]}
        ],
		moveJS: [
		    [0,30,"AudioManager.playSe({ name: 'Evasion1', volume: 60, pitch: 75, pan: 0 })"]
		]
    });
	
};

QJ.MPMZ.tl.ex_enemy_AsabaSpinAttackParry = function(args) {

	if (args && args.bulletTarget) {
		
    let posX = args.bulletTarget.inheritX();
    let posY = args.bulletTarget.inheritY();
	let angle = Math.randomInt(360);
	// 格挡演出
    QJ.MPMZ.Shoot({
      img: "animehit[5,4]",
      initialRotation: ['S', angle],
      position: [['S', posX], ['S', posY]],
      scale: 1,
      moveType: ['S', 0],
      opacity: 1,
      blendMode: 0,
      z: "MF_UG",
      existData: [
	  { t: ['Time', 19] }
	  ]
    });		
		// 反弹弹幕
		args.bulletTarget.rotationMove = (args.bulletTarget.rotationMove + 180) % 360;
		args.bulletTarget.addExistData({t:['P'],a:['F',QJ.MPMZ.tl.ex_playerDamageCheck,[8,1,0,0]],c:['S','!QJ.MPMZ.tl.ex_playerBulletPhasing()']});
		args.bulletTarget._countered = true;
        let se = {
            name: "Hammer",
            volume: 50,
            pitch: Math.randomInt(60) + 70,
            pan: 0
        };
        AudioManager.playSe(se);		
	}
};


//ASABA咬人并吃掉食物
QJ.MPMZ.tl.ex_enemy_AsabaBite = function() {
	
	if (!this) return;
	let eid = this._eventId;	
	
    let posX = `$gameMap.event(${eid})?$gameMap.event(${eid}).screenBoxXShowQJ():0`;
    let posY = `$gameMap.event(${eid})?$gameMap.event(${eid}).screenBoxYShowQJ():0`;
    let damage = Math.round($dataEnemies[45].params[2] * (1 + 3 * Math.random())); 
    let bite = QJ.MPMZ.Shoot({
        position:[['S',posX],['S',posY]],
        initialRotation:['P'],
        moveType:['D',true],
		anchor:[0.5,0.85],
		imgRotation:['F'],
		collisionBox:['R',12,40],
        existData:[
			{t:['Time',8]},
			{t:['P'],a:['F',QJ.MPMZ.tl.ex_playerDamageCheck,[damage,1]],p:[-1,false,true],c:['T',0,15,true]},
			{t:['P'],a:['F',QJ.MPMZ.tl.ex_enemy_AsabaStealFood,[eid]],p:[-1,false,true],c:['T',0,15,true]},
        ],
    });
    
};

QJ.MPMZ.tl.ex_enemy_AsabaStealFood = function(eid) {

    const items = $gameParty.items();
    // ASABA只吃食材	
    const ingredients = items.filter(item =>
        item && item.note && item.note.includes("Ingredients")
    );
    // ASABA会吃掉随机数量的食材
	if (ingredients.length > 0) {
		
    const count = Math.min(
        ingredients.length,
        Math.floor(Math.random() * 3) + 1
    );
    // 随机抽选ASABA会吃掉的食材
    for (let i = ingredients.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ingredients[i], ingredients[j]] = [ingredients[j], ingredients[i]];
    }
    let selected = ingredients.slice(0, count);
        selected.forEach(item => {			
            $gameParty.loseItem(item, 1);
			$gameSystem._drill_GFTH_styleId = 4;
			let context = "\\fs[22]\\ii[" + item.id + "]";
			if (ConfigManager.language > 1) context = "\\fs[18]\\ii[" + item.id + "]";
			$gameTemp.drill_GFTH_pushNewText( context );
			
            let srandomSeName = ["リンゴをかじる", "お菓子を食べる1", "お菓子を食べる2"];
            let seNames = srandomSeName[Math.floor(Math.random() * srandomSeName.length)];	
            let randomPitch = Math.randomInt(80) + 41;
            AudioManager.playSe({ name: seNames, volume: 90, pitch: randomPitch, pan: 0 });	
            // 恢复体力
			let value = $gameSelfVariables.value([$gameMap.mapId(), eid, 'HP']);
			value += 25 + Math.randomInt(25);
			$gameSelfVariables.setValue([$gameMap.mapId(), eid, 'HP'], value);
        });

	}
	
};

// ASABA必杀技
QJ.MPMZ.tl.ex_enemy_AsabaDashCombo = function (initialize, eid) {
	
  if (initialize && initialize === "start") {
    $gameScreen.showPicture(9, "black", 0, 0, 0, 120, 120, 0, 0);
    $gameScreen.movePicture(9, 0, 0, 0, 120, 120, 255, 0, 20);
	if ($gameMap.event(eid)) {
		$gameMap.event(eid)._moveSpeed = 18;
		$gameMap.event(eid)._IsDisabledCounter += 210;
	}
	// 玩家被控
	$gameSwitches.setValue(14, true);
	$gameSystem._drill_COI_map_mouse = false;
	$gameParty.leader().addState(69);
    TouchInput._mousePressed = false;
	$gameSystem._drill_COI_map_KPMove = false;
    QJ.MPMZ.Shoot({
	  position: [["P"], ["P"]],	
	  eid:eid,
      moveType: ["S", 0],		  
      existData: [{ t: ["Time", 150] }],
      moveF: [[30, 5, QJ.MPMZ.tl.ex_enemy_AsabaDashCombo]],
      deadF: [[QJ.MPMZ.tl.ex_enemy_AsabaDashCombo, ["end"]]]
    });
    return;
  }

  if (initialize && initialize === "end") {
	  
	  let eid = this.data.eid;
	  let target = $gameMap.event(eid);
	  if (target) {
		  target.drill_EASe_setSimpleStateNode( ["待机"] );
		  target.drill_EASA_setEnabled( true );
	  }
	  
    setTimeout(() => {
      $gameScreen.erasePicture(9);
      AudioManager.playSe({ name: "Battle3", volume: 60, pitch: 70, pan: 0 });
    let posX = this.inheritX();
    let posY = this.inheritY();
	let hp = $gameSelfVariables.value([$gameMap.mapId(), eid, 'HP']);
	let mhp = $gameSelfVariables.value([$gameMap.mapId(), eid, 'MHP']);
	let hpRate = hp / mhp;
	let damage = 199;
	damage += Math.round(damage * (1 - hpRate)); 
	setTimeout(() => QJ.MPMZ.tl.ex_playerDamageCheck(damage,1), 500);
    QJ.MPMZ.Shoot({
	  img: "Magic/kusa",
	  initialRotation: ['S', 0],
      imgRotation: ['S', 0],
	  scale: '0|0.6~60/1.2~999|1.2',
	  opacity:'0|1~60/0~999|0',
      position: [["P"], ["P"]],
      moveType: ["S", 0],	  
      existData: [{ t: ["Time", 60], a: ["S", `	$gameSwitches.setValue(14, false);
	                                            $gameParty.leader().removeState(69);
	                                            $gameSystem._drill_COI_map_mouse = true;
	                                        `] }],
    });	  
    }, 350);
	// 累加命中次数
	let count = $gameSelfVariables.value([1, 8, 'specialHitCount']);
	count += 1;
	$gameSelfVariables.setValue([1, 8, 'specialHitCount'], count);
    return;
  }

  function randPointInCircle(cx, cy, R) {
    const a = Math.random() * Math.PI * 2;     // 随机角度
    const r = Math.sqrt(Math.random()) * R;    // 半径开方，保证均匀分布
    const x = Math.round(cx + r * Math.cos(a));
    const y = Math.round(cy + r * Math.sin(a));
    return { x, y };
  }

  let angle = Math.randomInt(360);
  let posX = $gamePlayer.screenBoxXShowQJ();
  let posY = $gamePlayer.screenBoxYShowQJ();

  const p = randPointInCircle(posX, posY, 30);
  posX = p.x;
  posY = p.y;

  let scale = (66 + Math.randomInt(66)) / 100;

  if (Math.random() > 0.7) {
    QJ.MPMZ.Shoot({
      img: "Magic/HitSpecial2[5,2,4]",
      initialRotation: ["S", angle],
      existData: [{ t: ["Time", 39] }],
      position: [["S", posX], ["S", posY]],
      moveType: ["S", 0],
      blendMode: 1,
      z: "A",
      scale: scale,
      moveJS: [[
        1, 999,
        `let seName = 'Blow' + (1 + Math.randomInt(3));
         AudioManager.playSe({ name: seName, volume: 50, pitch: 80 + Math.randomInt(40), pan: 0 });`
      ]]
    });
  } else {
    QJ.MPMZ.Shoot({
      img: "Magic/Hit2[3,4]",
      initialRotation: ["S", angle],
      existData: [{ t: ["Time", 11] }],
      position: [["S", posX], ["S", posY]],
      moveType: ["S", 0],
      blendMode: 1,
      z: "A",
      scale: scale,
      moveJS: [[
        1, 999,
        `let seName = 'Blow' + (1 + Math.randomInt(3));
         AudioManager.playSe({ name: seName, volume: 50, pitch: 80 + Math.randomInt(40), pan: 0 });`
      ]]
    });
  }
};


//红兽-猩红爪击
QJ.MPMZ.tl.ex_redBeastClawStrike = function() {
	
	if (!this) return;
    let enemyId = $gameSelfVariables.value([$gameMap.mapId(), this._eventId, 'enemyId']);
    let enemy = $dataEnemies[116]; 	
    let baseDamage = enemy.params[2];
	
	let bulletX = this.screenBoxXShowQJ();
	let bulletY = this.screenBoxYShowQJ();
	let targetX = $gamePlayer.screenBoxXShowQJ();
	let targetY = $gamePlayer.screenBoxYShowQJ();
	let angle = QJ.calculateAngleByTwoPointAngle(bulletX, bulletY, targetX, targetY);	
	
    let length;
    if ((angle >= 60 && angle <= 120) || (angle >= 240 && angle <= 300)) {
		length = 128;
	} else {
		length = 48;
	}	
	
    QJ.MPMZ.Shoot({
        img:"null1",
        anchor:[0.5,1],blendMode:0,
        position:[['S',bulletX],['S',bulletY]],
		collisionBox:['R',10,length],
        imgRotation:['F'],
		scale:1,
        moveType:['S',0],
		initialRotation:['P'],
        existData:[
         {t:['Time',24]},	
         {t:['P'],a:['F',QJ.MPMZ.tl.ex_redBeastDamageEvaluation,[baseDamage,{bleed:true}]],p:[-1,true,true],c:['S','!QJ.MPMZ.tl.ex_playerBulletPhasing()']},
        ],     
    });	
};

//红兽-血裂冲击
QJ.MPMZ.tl.ex_redBeastBloodRiven = function() {
	
	if (!this) return;
    let enemyId = $gameSelfVariables.value([$gameMap.mapId(), this._eventId, 'enemyId']);
    let enemy = $dataEnemies[116]; 	
    let baseDamage = Math.floor(1.3 * enemy.params[2]);
	
	let zIndex = "MF_UG";
	if (Utils.isMobileDevice()) zIndex = "W";
	
    QJ.MPMZ.Shoot({
        img:"Blood Burst[6,6,2]",
		z:zIndex,
        anchor:[0.5,0.78],
		blendMode:0,
        position:[['E',0],['E',0]],
		collisionBox:['R',80,48],
        imgRotation:['F'],
		scale:2,
        opacity:1,
		moveType:['S',0],
        initialRotation:['S',0],
		existData:[
         {t:['Time',68]},	
         {t:['P'],a:['F',QJ.MPMZ.tl.ex_redBeastDamageEvaluation,[baseDamage,{increasedDamage:true}]],p:[-1,false,true],c:['S','!QJ.MPMZ.tl.ex_playerBulletPhasing()']},
        ],     
    });	
	
};

//红兽-攻击伤害判定
QJ.MPMZ.tl.ex_redBeastDamageEvaluation = function(damage,extraData = {}) {
	var type,probability,effect,time;
	type = 1;
	// 出血攻击
	if (extraData.bleed) {
	   probability = 66;
	   effect = 2;
	   time = 6;		
	}
    // 处于出血状态时
    if ( $gameParty.leader().isStateAffected(6) && extraData.increasedDamage) {
	   damage = Math.floor(1.25 * damage);
	   type = 2;
	   probability = 50;
	   effect = 4;
	   time = 6;
    } 
	
	QJ.MPMZ.tl.ex_playerDamageCheck(damage,type,6,probability,effect,time);
	
};

//红兽-召唤小红怪
QJ.MPMZ.tl.ex_redBeastSummonServent = function(target) {
	
	if (!target) return;
    var XX = target.centerRealX();
    var YY = target.centerRealY();	
    var condition = DrillUp.g_COFA_condition_list[10];
    //var c_area = $gameMap.drill_COFA_getShapePointsWithCondition(XX, YY, "圆形区域", 5, condition);	
	
	var p = c_area[Math.floor(Math.random() * c_area.length)];
	var eid = $gameMap.spawnEventQJ(1,101,XX,YY,false);	
	    $gameMap.event(eid)._opacity = 0;
    /*
    var posX = "$gameMap.event("+eid+").screenBoxXShowQJ()";
    var posY = "$gameMap.event("+eid+").screenBoxYShowQJ()-54";
	    QJ.MPMZ.Shoot({
        img:"Blood Summon[5,8,3]",
        position:[['S',posX],['S',posY]],
        initialRotation:['S',0],
        imgRotation:['F'],
        scale:0.4,
        opacity:0.8,
        moveType:['S',0],
        blendMode:0,
        existData:[	
		  {t:['Time',119]},
        ],
        z:"W"
    });
	*/
};

QJ.MPMZ.tl.theLustDemonBattleCommand = function(extra={}) {

    if (extra.timeCheck) {
        let eid   = this.data.eid;
        let enemy = $gameMap.event(eid);

        if ($gameSystem.minute() !== 0) {
        // 取消状态标记    
            if (!enemy?._ItsTimeMask) return;
            enemy._ItsTimeMask = false;
            enemy.clearPageAura();
            enemy._auraSticky = null;  
            if (enemy._moveSpeed >= 15) enemy._moveSpeed = 15;
            return;
        }
        enemy._ItsTimeMask = true;
        enemy.setAuraSticky('red');
        return;
    }

    if (extra.attack) {
        if (!this) return;
        let baseDamage = 66;
        let chance = 30;
        if (this._ItsTimeMask) {
            baseDamage *= 6;
            chance = 66;
        }
        let posX = this.screenBoxXShowQJ();
        let posY = this.screenBoxYShowQJ(); 
        let targetX = $gamePlayer.screenBoxXShowQJ();
        let targetY = $gamePlayer.screenBoxYShowQJ();
        let angle = QJ.calculateAngleByTwoPointAngle(posX, posY, targetX, targetY);	       
        let length = 64;
        if ((angle >= 60 && angle <= 120) || (angle >= 240 && angle <= 300)) {
            length = 120;
        }
        QJ.MPMZ.Shoot({
            anchor:[0.5,1],
            position:[['S',posX],['S',posY]],
            collisionBox:['R',10,length],
            imgRotation:['F'],
            moveType:['S',0],
            initialRotation:['P'],
            existData:[
               {t:['Time',12]},	
               {t:['P'], a:['F',QJ.MPMZ.tl.ex_playerDamageCheck,[baseDamage, 1, 11, chance]], p:[-1,false,true], c:['S','!QJ.MPMZ.tl.ex_playerBulletPhasing()']},
            ],     
        });	
        return;
    }
    if (extra.shouldResetTime) {
	    if (!this) return false;
	    let eid = this._eventId;
	    let enemy = $gameMap.event(eid);
        if (!enemy) return false;
        let dis = $gamePlayer.calcDistance(eid);
        let chance = 0.2;
        if (dis > 250) chance += 0.2;
        return chance > Math.random();
    }
    if (extra.ItsTime) {
        let randomSeArray = ["ThatRemindsMe~", "It’sTime~~"];
        let randomSe = randomSeArray[Math.floor(Math.random() * randomSeArray.length)];   
        let random = 90 + Math.randomInt(20);
        AudioManager.playSe({ name: randomSe, volume: 100, pitch: random, pan: 0 });

        let name = "ItsTime";
        $gameMap.createFilter(name, "invert", 0);
        if (!Utils.isMobileDevice()) {
            // 安卓版可能带不动两个滤镜
            let name2 = "RGB";
            $gameMap.createFilter(name2, "rgbsplit", 0);
            $gameMap.setFilter(name2 ,[4,0]);
            $gameMap.moveFilter(name2, [0,0], 40);
            $gameMap.eraseFilterAfterMove(name2);
        }
        // 让时间重置回整点
        const needsCarry = $gameSystem.minute() > 30;
        $gameSystem.set_minute(0);
        if (needsCarry) $gameSystem.add_hour(1);
        $gamePlayer.refresh();
        let eid = this._eventId;
        // 短暂的时滞
        QJ.MPMZ.Shoot({
            position:[['E',eid],['E',eid]],
            groupName:["timeStopField"],
            moveType:['D',true],
            collisionBox: ['C', 420],
            eid: eid,
            existData:[
                {t:['Time',120]},
            ]
        });        
        return;
    }

	if (!this) return;
	let eid = this._eventId;
	let posX = `$gameMap.event(${eid})?.screenBoxXShowQJ()||0`;
	let posY = `$gameMap.event(${eid})?.screenBoxYShowQJ()||0`;
    QJ.MPMZ.Shoot({
        position:[['S',posX],['S',posY]],
        groupName:["TheLustDemon"],
        moveType:['D',true],
        eid: eid,
        existData:[
			{t:['S',`$gameSelfSwitches.value([$gameMap.mapId(), ${eid}, 'D'])`,true]},
        ],
        moveF: [
            [20, 20, QJ.MPMZ.tl.theLustDemonBattleCommand, [{timeCheck:true}]]
        ]
    });    
};