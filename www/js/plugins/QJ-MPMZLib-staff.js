//=============================================================================
//
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc [弹幕模板库][法杖模板]
 * @author 仇九
 *
 * @help 
 *
 */
//=============================================================================
//
//=============================================================================

//=============================================================================
//法杖
//=============================================================================



//法杖跟随
QJ.MPMZ.tl.ex_staffAlwaysVisible = function() {
        const staff = $gameParty.leader().equips()[0];
	    if(!staff) return;
		let staffType = [5,6,7];
		if (!staffType.includes(staff.wtypeId)) return;
		if($gameMap.getGroupBulletListQJ('playerStaff').length > 0) return;

        $gameParty.leader().removeState(65);
		$gameParty.leader().removeState(68);
		$gamePlayer.drill_EASA_setEnabled(true);
		
        let direction = $gamePlayer.direction();	
        let offsetX = 0;
        let offsetY = 0;
        switch (direction) {
			case 2: // 下
				offsetX = 0;       
				offsetY = -32;     
				break;
			case 4: // 左
				offsetX = +32;     
				offsetY = 0;      
				break;
			case 6: // 右
				offsetX = -32;     
				offsetY = 0;      
				break;
			case 8: // 上
				offsetX = 0;      
				offsetY = 32;     
				break;
        }		
		let NormalAttack = true;
		let specialSkill = false;
	    let posX = $gamePlayer.screenShootXQJ() + offsetX;
        let posY = $gamePlayer.screenShootYQJ() + offsetY;
        let weaponImage = "weapon/weapon" + staff.baseItemId;

	    let skillMatch = $dataWeapons[staff.baseItemId]?.note?.match(/<specialSkill:([^>]+)>/i);
	    if (skillMatch) {
			specialSkill = true;
	    }
	
        let listener = QJ.MPMZ.Shoot({
            groupName: ['playerStaff','attackMonitoring','weaponMarker'],
            img: weaponImage,
            position: [['S',posX], ['S',posY]],
            initialRotation: ['S',0],
            moveType: ['S',0],
			imgRotation:['S',-15],
			scale:[-1,1],
			opacity:'0|0~20|0~40/1~999999|1',
			collisionBox:['C',16],
            existData: [
              //{t:['S','TouchInput.drill_isLeftPressed()',true],a:['S','QJ.MPMZ.tl.ex_staffAim()'],p:[-1,false,true],d:[0,30],t:['F',QJ.MPMZ.tl.ex_staffConditionCheck ,[],true],},     
			 // {t:['S','TouchInput.drill_isRightPressed()',true],a:['S','QJ.MPMZ.tl.ex_stickSpecialAttack()'],p:[-1,false,true],d:[0,30]},  
            ],         
            z: "W",
            moveF: [
			   [30,4,QJ.MPMZ.tl.ex_staffConditionCheck,[NormalAttack,specialSkill]],
			   [20,20,QJ.MPMZ.tl.ex_staffFollowsPlayer],
			 //[20,40,QJ.MPMZ.tl.ex_staffNormalAttack],
            ],
			timeline:[['S',0,119,[0,8,60]]]
        });
				
}	
	
//法杖攻击行为检测
QJ.MPMZ.tl.ex_staffConditionCheck = function(NormalAttack,specialSkill) {
	let condition1 = !$gameSwitches.value(3) || $gameSwitches.value(14) || $gameMessage.isBusy() || $gamePlayer._drill_PT_is_lifting;
	if (condition1) return;
	const staff = $gameParty.leader().equips()[0];
	if (!staff) return;
	let staffType = [5,6,7];
	if (!staffType.includes(staff.wtypeId)) {
	   this.setDead({t:['Time',0],d:[0,10]});
       return;	   
	}

	let Triggered = false;
	if (Utils.isMobileDevice()) {
	  Triggered = $gameSwitches.value(201);
	} else {
	  Triggered = TouchInput.drill_isLeftPressed();
	}

    if( Triggered ) {
	  QJ.MPMZ.tl.ex_staffAim();
	  this.setDead({t:['Time',0],d:[0,10]});
	  return;  
	}
	
	if (!specialSkill) return;
	
    if( TouchInput.drill_isRightPressed() ) {
	  QJ.MPMZ.tl.ex_stickSpecialAttack();
	  this.setDead({t:['Time',0],d:[0,10]});
	  return;
	}   
}

//法杖跟随玩家
QJ.MPMZ.tl.ex_staffFollowsPlayer = function() {
	/*
	if (this.inheritX() > $gamePlayer.screenShootXQJ()) {
		this.changeAttribute("scale",[1,1]);
	} else {
	   this.changeAttribute("scale",[-1,1]);
	}
	*/
	
	let index = this.index;
	if ( QJ.MPMZ.rangeAtk([['B',index],['B',index]],['P'],[],['C',50]).length > 0 ) {
         this.changeAttribute("moveType",['S',0]);
    } else {
		this.changeAttribute("moveType",['TP',3,15]);
	}
	if (this.inheritY() > $gamePlayer.screenShootYQJ()){
	this.changeAttribute("z","W");
	} else {
	this.changeAttribute("z","E");
	}
}

//法杖左键攻击瞄准
QJ.MPMZ.tl.ex_staffAim = function() {
	$gamePlayer.drill_EASe_stopAct();
	$gameParty.leader().addState(68);
	if($gameParty.leader()._characterName === "$player") {
	$gamePlayer.drill_EASe_setSimpleStateNode( ["法杖瞄准"] );
	}
	$gamePlayer.drill_ECE_playSustainingFloating( 518400000,30,4,120,2 );

	var intervalTime = Math.round( 90 * (1 - $gameParty.leader().cnt) );
		intervalTime = Math.max(intervalTime,5);
	
    var weaponImage = "weapon/weaponTrail" + $gameParty.leader().equips()[0].baseItemId;
	var iniRotation = ['M'];
	var cancelCode = '!TouchInput.drill_isLeftPressed()';
	
	if (Utils.isMobileDevice()) {
		iniRotation = ['S',"Input._pressAngle['ok']?Input._pressAngle['ok']:0"];
		cancelCode = '!$gameSwitches.value(201)';	
	}		

    var playerIndex = $gameMap.getGroupBulletListQJ('playerFeet');
	if (playerIndex.length > 0) {
		playerIndex = playerIndex[0];
	} else {
		playerIndex = 0;
	}
	
    QJ.MPMZ.Laser({
	   rotation: iniRotation,
	   groupName: ['staffAim','attackMonitoring','weaponMarker'],
	   img:weaponImage,
	   judgeWidth:20,
       length:['S',72],	
	   z:'W',
	   playerIndex: playerIndex,
	   opacity:'0|0~20/1~999999|1',
	   rotationStatic:false,
	   positionStatic:false,
	   imgPoint:'null1',
	   existData:[
            {t:['S',cancelCode,true],a:['S','$gamePlayer.drill_ECE_endSustainingFloating();QJ.MPMZ.tl.ex_staffAlwaysVisible()'],p:[-1,false,true],d:[0,20],c:['S','this.time > 30']},   			
       ],	
       moveF: [
			[60,0,QJ.MPMZ.tl.ex_staffNormalAttack],
        ],		
	   positionSpread:24,
	});
}

//法杖左键攻击弹幕
QJ.MPMZ.tl.ex_staffNormalAttack = function() {

    this._coolDown = this._coolDown || 0;
    if (this._coolDown > 0) {
        this._coolDown -= 1;
        return;
    }

    let actor = $gameParty.leader();
    let intervalTime = Math.round(90 * (1 - (actor.cnt || 0)));
    if (this._CDReduction) intervalTime -= this._CDReduction;
    intervalTime = Math.max(intervalTime, 5);

    let triggered = false;
    if (Utils.isMobileDevice()) {
        triggered = $gameSwitches.value(201);
    } else {
        triggered = TouchInput.drill_isLeftPressed();
    }

    if (!triggered) return;

    let weapon = actor.equips()[0];
    if (!weapon) {
        this._coolDown = intervalTime;
        return;
    }

    let weaponId = weapon.baseItemId;
    let wdata = $dataWeapons[weaponId];
    if (!wdata || !wdata.note) {
        this._coolDown = intervalTime;
        return;
    }

    let m = wdata.note.match(/<NormalAttack:([^>]+)>/i);
    if (!m) {
        this._coolDown = intervalTime;
        return;
    }

    let skillKey = String(m[1]).trim();
    if (!skillKey) {
        this._coolDown = intervalTime;
        return;
    }

    let fnName = "ex_" + skillKey + "Bullet";
    let fn = QJ.MPMZ.tl && QJ.MPMZ.tl[fnName];

    if (typeof fn === "function") {
        fn.call(this);
    } else {
        console.warn("[staffNormalAttack] Missing function:", fnName, "weaponId:", weaponId);
    }

    this._coolDown = intervalTime;
};

//弹幕爆发结算
QJ.MPMZ.tl.ex_staffMagicExplode = function() {
	
    const actor = $gameParty.leader();
    const staff = actor.equips()[0];
    if (!staff) return;

    const weaponId = staff.baseItemId;
    const weapon = $dataWeapons[weaponId];
    if (!weapon || !weapon.note) return;

    const m = weapon.note.match(/<NormalAttack:([^>]+)>/i);
    if (!m) return;

    const skillKey = String(m[1]).trim();
    if (!skillKey) return;

    const fnName = "ex_" + skillKey;
    const fn = QJ.MPMZ.tl && QJ.MPMZ.tl[fnName];

    if (typeof fn === "function") {
        return fn.call(this);
    } else {
        console.warn("[staffMagicExplode] Missing function:", fnName, "for weaponId:", weaponId);
        return;
    }
};

//法杖右键特殊攻击
QJ.MPMZ.tl.ex_stickSpecialAttack = function () {

  const staff = $gameParty.leader().equips()[0];
  if (!staff) return;
  let code = "";
  let skillMatch = $dataWeapons[staff.baseItemId]?.note?.match(/<specialSkill:([^>]+)>/i);
  if (skillMatch) {
      skillMatch = skillMatch[1];
      code = "QJ.MPMZ.tl.ex_" + skillMatch + "Circle.call(this);destroyTemporaryBar(-1);";
  } else {
	 return; 
  }
  // 需要防范和拆除武器指令冲突
  if ($gameScreen.isPointerInnerPicture(74)) return;  
  $gamePlayer.drill_ECE_stopEffect();
  $gamePlayer.drill_EASe_stopAct();
  $gameParty.leader().addState(68);
  $gameVariables.setValue(129, 0);
  createTemporaryBar(-1, 129, 1000);

  if ($gameParty.leader()._characterName === "$player") {
    $gamePlayer.drill_EASe_setSimpleStateNode(["吟唱中"]);
  }

  $gamePlayer.drill_ECE_playSustainingFloating(518400000, 30, 24, 120, 2);
  $gameScreen._particle.particleSet(0, "mahoujin_c-P", "player", "mahoujin_c");

  let weaponImage  = "weapon/weaponTrail" + staff.baseItemId;
  let magicCircle  = staff.note.match(/<magicCircle:([^>]+)>/i);  
  if (magicCircle) {
      magicCircle = magicCircle[1];
  } else {
	  magicCircle = "null1";
  }  
  // 标记玩家监听器
  var playerIndex = $gameMap.getGroupBulletListQJ("playerFeet");
  if (playerIndex.length > 0) {
    playerIndex = playerIndex[0];
  } else {
    playerIndex = 0;
  }

  QJ.MPMZ.Shoot({
    groupName: ["ChantingCircle", "attackMonitoring", "weaponMarker", "playerInAir"],
    img: magicCircle,
    position: [["P"], ["P"]],
    initialRotation: ["S", 0],
    moveType: ["D", true],
    opacity: "0|0~10|0~40/0.8~999999|0.8",
    scale: [0.2, 0.2],
    anchor: [0.5, 0.4],
    playerIndex: playerIndex,
    blendMode: 1,
    imgRotation: ["S", 0],
    collisionBox: ["C", 16],
    existData: [
      {
        t: ["S", "!TouchInput.drill_isRightPressed()", true],
        a: ["S", "$gamePlayer.drill_ECE_endSustainingFloating();$gameScreen._particle.particleClear('mahoujin_c-P')"],
        d: [0, 30],
        c: ["S", "this.time > 30"]
      }
    ],
    z: "E",
    moveF: [
      [10, 6, QJ.MPMZ.tl.ex_magicChantingEffect]
    ],
    deadJS: [code]
  });

  QJ.MPMZ.Shoot({
    groupName: ["RitualStaff"],
    img: weaponImage,
    position: [["P"], ["P"]],
    initialRotation: ["S", 0],
    moveType: ["C", -1, [56, 12], -6],
    scale: [1, 1],
    anchor: [0.5, 1.0],
    imgRotation: ["S", 0],
    collisionBox: ["C", 16],
    existData: [
      {
        t: ["S", "!TouchInput.drill_isRightPressed()", true],
        a: ["S", "QJ.MPMZ.tl.ex_staffAlwaysVisible()"],
        p: [-1, false, true],
        d: [0, 20],
        c: ["S", "this.time > 30"]
      }
    ],
    z: "E",
    moveJS: [
      [15, 45, 'this.changeAttribute("z","W")'],
      [45, 60, 'this.changeAttribute("z","E")']
    ]
  });

};

//吟唱中效果
QJ.MPMZ.tl.ex_magicChantingEffect = function() {
	
	this._chargeCounter = this._chargeCounter||0;
	
	let value = Math.floor(12 * (1 + $gameParty.leader().mev));
	this._chargeCounter += value;
	$gameVariables.setValue( 129, this._chargeCounter );
	
};

//熔岩杖:陨石术
QJ.MPMZ.tl.ex_meteorStrikeCircle = function() {

  if(!this || this._chargeCounter < 60) return;
   var seNames = "Magic2";
   var randomPitch = Math.randomInt(40) + 61;
   var se = { name: seNames, volume: 70, pitch: randomPitch, pan: 0 };
   AudioManager.playSe(se);

   var baseSize = 0.2;
   var maxCorrection = 2.8;
   var correctionValue = (this._chargeCounter / 6000) * maxCorrection; 
   var extraSize = ($gameParty.leader().mdr - 1) * 0.25;     
   var finalSize = correctionValue + baseSize + extraSize;
   var magicScale = '0|0~60/' + baseSize + '~9999|' + baseSize;
   var moveType = ['S',0];
   var circleName = "meteorStrikeCircle" + $gameMap.getGroupBulletListQJ('meteorStrikeCircle').length + 1;
   if ($gameParty.leader().hasSkill(41)) {
       moveType = ['TG','"enemy"',0.5,2];
   }    
   var circle = QJ.MPMZ.Shoot({
        img:"MeteorStrikeCircle[5,15,2]",
		groupName:['meteorStrikeCircle','magic','Circle',circleName],
        position:[['M'],['M']],
        initialRotation:['S',0],
		collisionBox:['C',4],
        imgRotation:['S',0],
        scale:finalSize,
		anchor:[0.5,0.5],
        opacity:1,
        moveType:moveType,
        blendMode:1,
        existData:[	
		{t:['Time',600]},
		{t:['B','meteorStrikeCircle']},
        ],
        z:"E"
    });	

   var posX = circle.inheritX() + (Math.randomInt(600) - 300);	
   var posY = circle.inheritY() - 1200;	
   var index = circle.index;
       magicScale = circle.scaleX * 3;
   var deadCode = "$gameMap.bulletQJ(" + index + ").setDead({t:['Time',0],d:[0,30]})";
   var speed = 5;
       speed += $gameParty.leader().cnt * 5;
	   moveType = ['S',speed];
   if ($gameParty.leader().hasSkill(41)) {
       moveType = ['TB',circleName,speed,6];
   }	   
	    QJ.MPMZ.Shoot({
        img:"MeteorStrike[8,6,2]",
		groupName:['meteorStrikeBullet','magic'],
        position:[['S',posX],['S',posY]],
        initialRotation:['BT',index],
        imgRotation:['F'],
		collisionBox:['C',40],
        scale:magicScale,
        opacity:1,
		anchor:[0.5,0.3],
        moveType:moveType,
        blendMode:0,
        existData:[	
		{t:['B',circleName]},
		{t:['Time',3000]},
		{t:['BE',index]},
        ],
        z:"MF_UG",
		deadF:[[QJ.MPMZ.tl.ex_meteorStrikeBoom]],
		deadJS:[deadCode]
		
    });
	// 耐久度结算
 if ($gameParty.leader().equips()[0]) {
   var damageCorrection = $gameParty.leader().mdr;
   var baseDamage = 120 + chahuiUtil.getVarianceDamage(2);
   var magicDamage = 2 * Math.floor(baseDamage * magicScale * damageCorrection);

    if ($gameParty.leader().hasSkill(31)) {
	    let rate = (100 - $gameParty.leader().skillMasteryLevel(31)) / 100;
		rate     = Math.max(0.005, rate);
		magicDamage *= rate;
	}
   
	$gameParty.leader().equips()[0].durability -= Math.floor(magicDamage);   
	// 法杖因耐久度归零破损
	if ($gameParty.leader().equips()[0].durability <= 0) {
		$gamePlayer.drill_ECE_endSustainingFloating();
		$gameScreen._particle.particleClear('mahoujin_c-P');
        $gameParty.leader().removeState(65);
		$gameParty.leader().removeState(68);	
        $gamePlayer.drill_EASA_setEnabled(true);		
        if ($gameMap.getGroupBulletListQJ('playerWeaponImg').length > 0) {
          let bulletId = $gameMap.getGroupBulletListQJ('playerWeaponImg')[0];
           $gameMap._mapBulletsQJ[bulletId]._broken = true;
        }		
	}	
  }
}


//熔岩杖:陨石冲击
QJ.MPMZ.tl.ex_meteorStrikeBoom = function() {

   var seNames = "Explosion2";
   var randomPitch = Math.randomInt(40) + 61;
   var se = { name: seNames, volume: 70, pitch: randomPitch, pan: 0 };
   AudioManager.playSe(se);
	
   var posX = this.inheritX();	
   var posY = this.inheritY() + 32;	
   var magicScale = this.scaleX;
   var damageCorrection = $gameParty.leader().mdr;
   var baseDamage = 120 + chahuiUtil.getVarianceDamage(2);
    if ($gameParty.leader().hasSkill(72)) {
		baseDamage += Math.floor(baseDamage * $gameParty.leader().skillMasteryLevel(72) * 0.1);
	}   
   var magicDamage = Math.floor(baseDamage * this.scaleX * damageCorrection);
   
    QJ.MPMZ.Shoot({
        img:"MeteorStrike_Boom[5,8,2]",
		groupName:['meteorStrikeBoom','magic','explosion','fire'],
        position:[['S',posX],['S',posY]],
        initialRotation:['S',0],
        imgRotation:['S',0],
        scale:magicScale,
        opacity:1,
        moveType:['S',0],
		anchor:[0.5,0.55],
		//collisionBox:['C',60],
		collisionBox:['R',140,80],
        blendMode:0,
		damage:magicDamage,
        existData:[	
		   {t:['Time',45]},
		   {t:['G',['"enemy"','"object"','isExplodable']],a:['F',QJ.MPMZ.tl.ex_toEnemyAttack,[magicDamage,{magicAttack:true,noHitEffect:true,noDurLoss:true,specifyAddedStatus:true}]],p:[-1,true,true]},
		   {t:['B',["Destructible"]],a:['F',QJ.MPMZ.tl.ex_toBulletAttack,[magicDamage,{noHitEffect:true, independentAttack:true, noDurLoss:true}]],p:[-1,false,true]},
		   {t:['P'],a:['F',QJ.MPMZ.tl.ex_playerDamageCheck,[magicDamage,2]],p:[-1,true,true]}
        ],
        z:"MF_UG",
    });
	//QJ.MPMZ.deleteProjectile("meteorStrikeCircle",{d:[1,30,0.1],});
}


//熔岩杖:焰弹冲击
QJ.MPMZ.tl.ex_fireballImpactBullet = function() {
	if (!TouchInput.drill_isLeftPressed()) return;
	if (!this) return;
    let posX = this.inheritX();
    let posY = this.inheritY();
    posX += 72 * Math.sin(this.rotation * Math.PI/180);
    posY += -72 * Math.cos(this.rotation * Math.PI/180);
    var magicImage = "fireballImpact_bullet[6,2,2]";
    var magicScale = 0.3 * $gameParty.leader().mdr;
	if ($gameParty.leader().hasSkill(72)) {
		magicScale += $gameParty.leader().skillMasteryLevel(72) * 0.1;
	}
    var speed = 9;

    var se = { name: "火炎魔法1", volume: 70, pitch: 100, pan: 0 };
    AudioManager.playSe(se);	
	
	var iniRotation = ['M']; 
	if (Utils.isMobileDevice())  {
		iniRotation = ['S',"Input._pressAngle['ok']?Input._pressAngle['ok']:0"];
	}	
	
    var Bullet = QJ.MPMZ.Shoot({
		groupName:['playerBullet','magic','fire'],
        img:magicImage,
        position:[['S',posX],['S',posY]],
        initialRotation:iniRotation,
		imgRotation:['F'],
		opacity:1,//'0|0~20/1~999999|1',
        scale:magicScale,
        moveType:['S',speed],
		blendMode:0,
        imgRotation:['F'],
        anchor:[0.5,0.5],
        existData:[	
		{t:['R',255],a:['F',QJ.MPMZ.tl.ex_staffMagicExplode]},
		{t:['Time',180]},
		{t:['G',['"enemy"','"object"']],a:['F',QJ.MPMZ.tl.ex_staffMagicExplode]},
        ],
        z:"MF_UG",
		collisionBox:['C',40],
		moveF:[
		//[10,10,QJ.MPMZ.tl.ex_bulletTrajectoryCorrection]
		],
      });	

        //追踪效果
	    if ($gameParty.leader().hasSkill(41) || $gameParty.leader().hasSkill(72)) {
		    Bullet.addMoveData("F",[10,10,QJ.MPMZ.tl.ex_projectileTrackingEffect]);
	     }		  

	// 耐久度结算
 if ($gameParty.leader().equips()[0]) {
   var durabilityDamage = 30 + (0.4 * chahuiUtil.getVarianceDamage(2));
   
    if ($gameParty.leader().hasSkill(31)) {
	    let rate = (100 - $gameParty.leader().skillMasteryLevel(31)) / 100;
		rate     = Math.max(0.005, rate);
		durabilityDamage *= rate;
	}
   
	$gameParty.leader().equips()[0].durability -= Math.floor(durabilityDamage);
	// 法杖因耐久度归零破损
	if ($gameParty.leader().equips()[0].durability <= 0) {
		$gamePlayer.drill_ECE_endSustainingFloating();
		$gameScreen._particle.particleClear('mahoujin_c-P');
        $gameParty.leader().removeState(65);
		$gameParty.leader().removeState(68);	
        $gamePlayer.drill_EASA_setEnabled(true);		
        if ($gameMap.getGroupBulletListQJ('playerWeaponImg').length > 0) {
          let bulletId = $gameMap.getGroupBulletListQJ('playerWeaponImg')[0];
           $gameMap._mapBulletsQJ[bulletId]._broken = true;
        }		
	}	
  }	
		
}

//熔岩杖:焰弹冲击爆发
QJ.MPMZ.tl.ex_fireballImpact = function() { 
    //let bullet = $gameMap.bulletQJ(index);
	if (!this) return;
    let posX = this.inheritX();
    let posY = this.inheritY();
    var magicScale = this.scaleX * 1.5;  
	var magicDamage = Math.floor(30 + (0.7 * chahuiUtil.getVarianceDamage(2)));
	if ($gameParty.leader().hasSkill(72)) {
		magicDamage += Math.floor(magicDamage * $gameParty.leader().skillMasteryLevel(72) * 0.1);
	}
    QJ.MPMZ.Shoot({
		groupName:['playerBullet','magic','fire'],
        img:"fireballImpact[7,6,2]",
        position:[['S',posX],['S',posY]],
        initialRotation:['M'],
		imgRotation:['F'],
		opacity:1,
        scale:magicScale,
        moveType:['S',0],
		blendMode:0,
        imgRotation:['F'],
        anchor:[0.5,0.5],
        existData:[	
		  {t:['Time',58]},
		  {t:['G',['"enemy"','"object"']],a:['F',QJ.MPMZ.tl.ex_toEnemyAttack,[magicDamage,{magicAttack:true,noHitEffect:true,noDurLoss:true,specifyAddedStatus:true}]],p:[-1,true,true]},
		  {t:['B',["Destructible"]],a:['F',QJ.MPMZ.tl.ex_toBulletAttack,[magicDamage,{noHitEffect:true, independentAttack:true, noDurLoss:true}]],p:[-1,false,true]},
		  {t:['P'],a:['F',QJ.MPMZ.tl.ex_playerDamageCheck,[magicDamage,2]],p:[-1,true,true]}
        ],
        z:"MF_UG",
		collisionBox:['C',50],
		moveF:[
		//[10,10,QJ.MPMZ.tl.ex_bulletTrajectoryCorrection]
		],
      });		
};	

//星月夜:黑暗冲击
QJ.MPMZ.tl.ex_darkBlastBullet = function() {

	if (!TouchInput.drill_isLeftPressed()) return;
	if (!this) return;
    let posX = this.inheritX();
    let posY = this.inheritY();
    posX += 72 * Math.sin(this.rotation * Math.PI/180);
    posY += -72 * Math.cos(this.rotation * Math.PI/180);
    var magicImage = "Dark Blast_Bullet[7,2,3]";
    var magicScale = 0.3 * $gameParty.leader().mdr;
    var speed = 9;
	
	var iniRotation = ['M']; 
	if (Utils.isMobileDevice())  {
		iniRotation = ['S',"Input._pressAngle['ok']?Input._pressAngle['ok']:0"];
	}
	
    var se = { name: "Darkness3", volume: 60, pitch: 120, pan: 0 };
    AudioManager.playSe(se);	
	
   var Bullet = QJ.MPMZ.Shoot({
		groupName:['playerBullet','magic'],
        img:magicImage,
        position:[['S',posX],['S',posY]],
        initialRotation:iniRotation,
		imgRotation:['F'],
		opacity:1,//'0|0~20/1~999999|1',
        scale:magicScale,
        moveType:['S',speed],
		blendMode:0,
        imgRotation:['F'],
        anchor:[0.5,0.5],
        existData:[	
		{t:['R',255],a:['F',QJ.MPMZ.tl.ex_darkBlast]},
		{t:['Time',300]},
		{t:['G',['"enemy"','"object"']],a:['F',QJ.MPMZ.tl.ex_darkBlast]},
        ],
        z:"MF_UG",
		collisionBox:['C',40],
		moveF:[
		//[10,10,QJ.MPMZ.tl.ex_bulletTrajectoryCorrection]
		]
      });

        //追踪效果
	    if ($gameParty.leader().hasSkill(41)) {
		    Bullet.addMoveData("F",[10,10,QJ.MPMZ.tl.ex_projectileTrackingEffect]);
	     }		  

	// 耐久度结算
 if ($gameParty.leader().equips()[0]) {
   var durabilityDamage = Math.floor(0.65 * chahuiUtil.getVarianceDamage(2));
   
    if ($gameParty.leader().hasSkill(31)) {
	    let rate = (100 - $gameParty.leader().skillMasteryLevel(31)) / 100;
		rate     = Math.max(0.005, rate);		
		durabilityDamage *= rate;
	}
   
	$gameParty.leader().equips()[0].durability -= Math.floor(durabilityDamage);
	// 法杖因耐久度归零破损
	if ($gameParty.leader().equips()[0].durability <= 0) {
		$gamePlayer.drill_ECE_endSustainingFloating();
		$gameScreen._particle.particleClear('mahoujin_c-P');
        $gameParty.leader().removeState(65);
		$gameParty.leader().removeState(68);	
        $gamePlayer.drill_EASA_setEnabled(true);		
        if ($gameMap.getGroupBulletListQJ('playerWeaponImg').length > 0) {
          let bulletId = $gameMap.getGroupBulletListQJ('playerWeaponImg')[0];
           $gameMap._mapBulletsQJ[bulletId]._broken = true;
        }		
	}	
  }

		
};

//星月夜:黑暗冲击爆发
QJ.MPMZ.tl.ex_darkBlast = function() {   
    if (!this) return;
    let posX = this.inheritX();
    let posY = this.inheritY();
    var magicImage = "Dark Blast[6,5,2]";
    var magicScale = this.scaleX * 1.5;  
	var magicDamage = 20 + Math.floor(0.85 * chahuiUtil.getVarianceDamage(2));
	
    var se = { name: "Darkness4", volume: 80, pitch: 100, pan: 0 };
    AudioManager.playSe(se);	

    QJ.MPMZ.Shoot({
		groupName:['playerBullet','magic'],
        img:magicImage,
        position:[['S',posX],['S',posY]],
        initialRotation:['M'],
		imgRotation:['F'],
		opacity:1,
        scale:magicScale,
        moveType:['S',0],
		blendMode:0,
        imgRotation:['F'],
        anchor:[0.5,0.5],
        existData:[	
		{t:['Time',58]},
		{t:['G',['"enemy"','"object"']],a:['F',QJ.MPMZ.tl.ex_toEnemyAttack,[magicDamage,{magicAttack:true,noHitEffect:true,noDurLoss:true,specifyAddedStatus:true}]],p:[-1,true,true]},
		{t:['P'],a:['C',152,[magicDamage,0,0,0]],p:[-1,true,true]}
        ],
        z:"MF_UG",
		collisionBox:['C',50],
		moveF:[
		//[10,10,QJ.MPMZ.tl.ex_bulletTrajectoryCorrection]
		],
      });		
};	

//黑洞魔法
QJ.MPMZ.tl.ex_blackHoleCircle = function() {   
  if(!this || this._chargeCounter < 60) return;
   var seNames = "Magic2";
   var randomPitch = Math.randomInt(40) + 61;
   var se = { name: seNames, volume: 70, pitch: randomPitch, pan: 0 };
   AudioManager.playSe(se);

   var baseSize = 0.2;
   var maxCorrection = 2.8;
   var correctionValue = (this._chargeCounter / 6000) * maxCorrection; 
   var extraSize = ($gameParty.leader().mdr - 1) * 0.25;
   var finalSize = correctionValue + baseSize + extraSize;
   var circle = QJ.MPMZ.Shoot({
        img:"blackHoleCircle[5,5,5]",
		groupName:['blackHole','magic','Circle'],
        position:[['M'],['M']],
        initialRotation:['S',0],
		collisionBox:['C',4],
        imgRotation:['F'],
        scale:finalSize,
		anchor:[0.5,0.5],
        opacity:1,
        moveType:['S',0],
        blendMode:1,
        existData:[	
		{t:['Time',1],d:[1,120,0.01]},
        ],
        z:"MF_BG",
    });	

   var posX = circle.inheritX();	
   var posY = circle.inheritY();	
   var magicScaleX = circle.scaleX * 2;
   var magicScaleY = magicScaleX * 0.7;
   var baseDamage = 12 + (0.75 * chahuiUtil.getVarianceDamage(2));
   var magicDamage = Math.floor(baseDamage * this.scaleX);   
 
    var se = { name: "暗黒魔法", volume: 100, pitch: 100, pan: 0 };
    AudioManager.playSe(se);	
 
	    QJ.MPMZ.Shoot({
        img:"MNT_death[5,20,3]",
		groupName:['blackHoleBullet','magic'],
        position:[['S',posX],['S',posY]],
        initialRotation:['S',0],
        imgRotation:['F'],
		collisionBox:['R',140,100],
        scale:[magicScaleX,magicScaleY],
        opacity:1,
		anchor:[0.5,0.5],
        moveType:['S',0],
        blendMode:0,
        existData:[	
		{t:['Time',250]},
		{t:['G',['"enemy"','"object"']],a:['F',QJ.MPMZ.tl.ex_blackHoleEffects],p:[-1,false,true],c:['T',1,1,true]},
		{t:['G',['"enemy"','"object"']],a:['F',QJ.MPMZ.tl.ex_toEnemyAttack,[magicDamage,{magicAttack:true,noHitEffect:true,noDurLoss:true,specifyAddedStatus:true}]],p:[-1,false,true],c:['T',10,10,true],cb:['R',70,50]},
		{t:['P'],a:['F',QJ.MPMZ.tl.ex_blackHoleEffects],p:[-1,false,true],c:['T',1,1,true]},
		{t:['P'],a:['C',152,[magicDamage,0,0,0]],p:[-1,false,true],c:['T',10,10,true],cb:['R',70,50]},
        ],
        z:"MF_BG",
		//deadF:[[QJ.MPMZ.tl.ex_meteorStrikeBoom]],	
    });
	
	// 耐久度结算
 if ($gameParty.leader().equips()[0]) {
    var durabilityDamage = 30 * magicDamage;
   
    if ($gameParty.leader().hasSkill(31)) {
	    let rate = (100 - $gameParty.leader().skillMasteryLevel(31)) / 100;
		rate     = Math.max(0.005, rate);		
		durabilityDamage *= rate;
	}
   
	$gameParty.leader().equips()[0].durability -= Math.floor(durabilityDamage);
	// 法杖因耐久度归零破损
	if ($gameParty.leader().equips()[0].durability <= 0) {
		$gamePlayer.drill_ECE_endSustainingFloating();
		$gameScreen._particle.particleClear('mahoujin_c-P');
        $gameParty.leader().removeState(65);
		$gameParty.leader().removeState(68);	
        $gamePlayer.drill_EASA_setEnabled(true);		
        if ($gameMap.getGroupBulletListQJ('playerWeaponImg').length > 0) {
          let bulletId = $gameMap.getGroupBulletListQJ('playerWeaponImg')[0];
           $gameMap._mapBulletsQJ[bulletId]._broken = true;
        }		
	}	
  }	
	
};

//黑洞魔法吸扯判定
QJ.MPMZ.tl.ex_blackHoleEffects = function(args) {  
    if (args.target && args.target instanceof Game_Event) {
      let eventId = args.target._eventId;
    let fudou = $gameSelfVariables.value([$gameMap.mapId(), eventId, 'fudou']);	
	if (!$gameMap.event(eventId) || fudou > 45) {
	  return;
	}
	let bulletX = this.inheritX();
	let bulletY = this.inheritY();
	let targetX = args.target.screenShootXQJ();
	let targetY = args.target.screenShootYQJ();
	let angle = QJ.calculateAngleByTwoPointAngle(targetX, targetY, bulletX, bulletY);
	if (this.time < 240) {
	$gameMap.event(eventId).dotMoveByDeg(angle);
	$gameMap.event(eventId).dotMoveByDeg(angle);
	} else {
		if (this.time > 245 && this.time < 250 && !$gameMap.event(eventId).isJumping()) {
		angle = angle % 360;
	let oppositeAngle = (angle + 180) % 360;	
	let distance = 1.5 * this.scaleX;
	QJ.MPMZ.tl.ex_jumpWithAngle(eventId,oppositeAngle,distance);
		}
	}
	return;
  }
  
    if (args.target && args.target instanceof Game_Player) {
	let bulletX = this.inheritX();
	let bulletY = this.inheritY();
	let targetX = $gamePlayer.screenShootXQJ();
	let targetY = $gamePlayer.screenShootYQJ();
	let angle = QJ.calculateAngleByTwoPointAngle(targetX, targetY, bulletX, bulletY);
	$gamePlayer.dotMoveByDeg(angle);
	$gamePlayer.dotMoveByDeg(angle);
	return;
  }
};


//灭虫魔法
QJ.MPMZ.tl.ex_exterminationMagicBullet = function(posId) {
	if (!TouchInput.drill_isLeftPressed()) return;
	if (!this) return;
    //let posX = this.inheritX();
    //let posY = this.inheritY();
   // posX += 72 * Math.sin(this.rotation * Math.PI/180);
   // posY += -72 * Math.cos(this.rotation * Math.PI/180);
    var staff = $gameMap.getGroupBulletListQJ('staffAim');
	    staff = staff[0];
	var time = Math.round( 90 * (1 - $gameParty.leader().cnt) );
		time = Math.max(time,5);	
        QJ.MPMZ.Shoot({
            groupName: ['frostFlame','magic'],
            img: 'null1',
            position:[["P"],["P"]],
            initialRotation: ['S',0],
            moveType:['D',true],			
			anchor:[0.5,0.5],
			imgRotation:['S',0],
			collisionBox:['C',16],
            existData: [
               {t:['Time',time]},
            ],       
            z: "E",
            moveF: [
			  [1,1,QJ.MPMZ.tl.ex_exterminationMagicThrower,[staff]]
            ]
        });	
	
	
	// 耐久度结算
 if ($gameParty.leader().equips()[0]) {
   var durabilityDamage = 15 * Math.floor( 1 + ($gameParty.leader().mat * 0.03));
   
    if ($gameParty.leader().hasSkill(31)) {
	    let rate = (100 - $gameParty.leader().skillMasteryLevel(31)) / 100;
		rate     = Math.max(0.005, rate);		
		durabilityDamage *= rate;
	}
   
	$gameParty.leader().equips()[0].durability -= Math.floor(durabilityDamage);
	// 法杖因耐久度归零破损
	if ($gameParty.leader().equips()[0].durability <= 0) {
		$gamePlayer.drill_ECE_endSustainingFloating();
		$gameScreen._particle.particleClear('mahoujin_c-P');
        $gameParty.leader().removeState(65);
		$gameParty.leader().removeState(68);	
        $gamePlayer.drill_EASA_setEnabled(true);		
        if ($gameMap.getGroupBulletListQJ('playerWeaponImg').length > 0) {
          let bulletId = $gameMap.getGroupBulletListQJ('playerWeaponImg')[0];
           $gameMap._mapBulletsQJ[bulletId].setDead({t:['Time',0],a:['F',QJ.MPMZ.tl.ex_playerWeaponBroken],d:[0,20]});
        }		
	}	
  }	
	
};
//灭虫魔法判定
QJ.MPMZ.tl.ex_exterminationMagicThrower = function(BID) {
	//var bullet = $gameMap.getGroupBulletListQJ('staffAim');
	   // blllet = bullet[0];
	var bullet = $gameMap._mapBulletsQJ[BID];

	if(!bullet) return;
	let posX = bullet.inheritX();
    let posY = bullet.inheritY();	
    posX += 72 * Math.sin(bullet.rotation * Math.PI/180);
    posY += -72 * Math.cos(bullet.rotation * Math.PI/180);
	let number = 6 + Math.randomInt(4);
    let time = 10;
    let speed = '0|' + (8 + Math.randomInt(12)) + '~90/0~300|0';
	let angle = Math.floor(6 * $gameParty.leader().mdr);
	let bulletMin = 0.1 * $gameParty.leader().mdr;
	let bulletMax = 0.6 * $gameParty.leader().mdr;
	let magicDamage = Math.floor( 1 + ($gameParty.leader().mat * 0.1));

	let iniRotation = ['M']; 
	if (Utils.isMobileDevice())  {
		iniRotation = ['S',"Input._pressAngle['ok']?Input._pressAngle['ok']:0"];
	}
	
  QJ.MPMZ.Shooter_ArcRange(iniRotation,{
	groupName: ['exterminationMagic'],
    position:[["S",posX],["S",posY]],
    img:'Magic/poisonGas[11,4]',
    blendMode:1,
	//tone:[134,53,150,0],
	effectDecay: 0.1, 
    opacity:'0|1.0~30/0.1~300|0.1',
    moveType:['S',speed],
	anchor:[0.5,1],
	collisionBox:['C',4],
    existData:[
    {t:['Time',time],d:[1,10,2]},
	{t:['G',['"enemy"','"object"']],a:['F',QJ.MPMZ.tl.ex_toEnemyAttack,[magicDamage,{magicAttack:true,noHitEffect:true,noDurLoss:true,specifyAddedStatus:true}]],c:['S','Math.random()>0.85']},
	{t:['P'],a:['F',QJ.MPMZ.tl.ex_playerDamageCheck,[2,2]],p:[-1,false,true]},
	//{t:['P'],a:['C',152,[2,0,0]]},
    ]
},-angle,angle,number,30,bulletMin,bulletMax);

};

//冰霜喷射
QJ.MPMZ.tl.ex_frostFlameBullet = function(posId) {
	if (!TouchInput.drill_isLeftPressed()) return;
	if (!this) return;
    //let posX = this.inheritX();
    //let posY = this.inheritY();
   // posX += 72 * Math.sin(this.rotation * Math.PI/180);
   // posY += -72 * Math.cos(this.rotation * Math.PI/180);
    var staff = $gameMap.getGroupBulletListQJ('staffAim');
	    staff = staff[0];
	var time = Math.round( 90 * (1 - $gameParty.leader().cnt) );
		time = Math.max(time,5);	
        QJ.MPMZ.Shoot({
            groupName: ['frostFlame','magic'],
            img: 'null1',
            position:[["P"],["P"]],
            initialRotation: ['S',0],
            moveType:['D',true],			
			anchor:[0.5,0.5],
			imgRotation:['S',0],
			collisionBox:['C',16],
            existData: [
               {t:['Time',time]},
            ],       
            z: "E",
            moveF: [
			  [1,1,QJ.MPMZ.tl.ex_frostFlameThrower,[staff]]
            ]
        });	
	
	
	// 耐久度结算
 if ($gameParty.leader().equips()[0]) {
   var durabilityDamage = 15 * Math.floor( 1 + ($gameParty.leader().mat * 0.03));
   
    if ($gameParty.leader().hasSkill(31)) {
	    let rate = (100 - $gameParty.leader().skillMasteryLevel(31)) / 100;
		rate     = Math.max(0.005, rate);		
		durabilityDamage *= rate;
	}
   
	$gameParty.leader().equips()[0].durability -= Math.floor(durabilityDamage);
	// 法杖因耐久度归零破损
	if ($gameParty.leader().equips()[0].durability <= 0) {
		$gamePlayer.drill_ECE_endSustainingFloating();
		$gameScreen._particle.particleClear('mahoujin_c-P');
        $gameParty.leader().removeState(65);
		$gameParty.leader().removeState(68);	
        $gamePlayer.drill_EASA_setEnabled(true);		
        if ($gameMap.getGroupBulletListQJ('playerWeaponImg').length > 0) {
          let bulletId = $gameMap.getGroupBulletListQJ('playerWeaponImg')[0];
           $gameMap._mapBulletsQJ[bulletId].setDead({t:['Time',0],a:['F',QJ.MPMZ.tl.ex_playerWeaponBroken],d:[0,20]});
        }		
	}	
  }	
	
};
//冰霜喷射判定
QJ.MPMZ.tl.ex_frostFlameThrower = function(BID) {
	//var bullet = $gameMap.getGroupBulletListQJ('staffAim');
	   // blllet = bullet[0];
	var bullet = $gameMap._mapBulletsQJ[BID];

	if(!bullet) return;
	let posX = bullet.inheritX();
    let posY = bullet.inheritY();	
    posX += 72 * Math.sin(bullet.rotation * Math.PI/180);
    posY += -72 * Math.cos(bullet.rotation * Math.PI/180);
	let number = 2 + Math.randomInt(3);
    let time = 30 + Math.randomInt(60);
    let speed = '0|' + (5 + Math.randomInt(6)) + '~90/0~300|0';
	let angle = Math.floor(10 * $gameParty.leader().mdr);
	let bulletMin = 0.01 * $gameParty.leader().mdr;
	let bulletMax = 0.6 * $gameParty.leader().mdr;
	let magicDamage = Math.floor( 1 + ($gameParty.leader().mat * 0.03));

	let iniRotation = ['M']; 
	if (Utils.isMobileDevice())  {
		iniRotation = ['S',"Input._pressAngle['ok']?Input._pressAngle['ok']:0"];
	}
	
  QJ.MPMZ.Shooter_ArcRange(iniRotation,{
	groupName: ['frostFlame'],
    position:[["S",posX],["S",posY]],
    img:'frostFlame[11,4]',
    blendMode:1,
	//tone:[134,53,150,0],
	effectDecay: 0.1, 
    opacity:'0|1.0~30/0.1~300|0.1',
    moveType:['S',speed],
	anchor:[0.5,1],
	collisionBox:['C',4],
    existData:[
    {t:['Time',time],d:[0,20]},
	{t:['G',['"enemy"','"object"']],a:['F',QJ.MPMZ.tl.ex_toEnemyAttack,[magicDamage,{magicAttack:true,noHitEffect:true,noDurLoss:true,specifyAddedStatus:true}]],c:['S','Math.random()>0.7']},
	{t:['P'],a:['F',QJ.MPMZ.tl.ex_playerDamageCheck,[2,2]],p:[-1,false,true]},
	//{t:['P'],a:['C',152,[2,0,0]]},
    ]
},-angle,angle,number,30,bulletMin,bulletMax);

};

//冰封术
QJ.MPMZ.tl.ex_frozenEarthCircle = function() {  

  if(!this || this._chargeCounter < 60) return;
   var seNames = "凍りつく時の効果音「キーーーン」";
   var randomPitch = Math.randomInt(40) + 61;
   var se = { name: seNames, volume: 70, pitch: randomPitch, pan: 0 };
   AudioManager.playSe(se);

   var baseSize = 0.2;
   var maxCorrection = 2.8;
   var correctionValue = (this._chargeCounter / 6000) * maxCorrection; 
   var extraSize = ($gameParty.leader().mdr - 1) * 0.25;  
   var finalSize = (correctionValue + baseSize) * $gameParty.leader().mdr;
       finalSize += extraSize;
	   
   var circle = QJ.MPMZ.Shoot({
        img:"Frozen EarthCircle[5,8,3]",
		groupName:['blackHole','magic','Circle'],
        position:[['M'],['M']],
        initialRotation:['S',0],
		collisionBox:['C',4],
        imgRotation:['F'],
        scale:finalSize,
		anchor:[0.5,0.5],
        opacity:1,
        moveType:['S',0],
        blendMode:1,
        existData:[	
		{t:['Time',1],d:[1,120,0.01]},
        ],
        z:"E"
    });	

     let posX = circle.inheritX();
     let posY = circle.inheritY() - 10;
	 finalSize *= 2.5;
	 let time = 360;
	 
       QJ.MPMZ.Shoot({
        img:'pipofm-groundeffect10[5,4,4]',
		position:[["S",posX],["S",posY]],
        initialRotation:['S',0],
		groupName:[name],
		scale:finalSize,
		opacity:0.65,
        moveType:['S',0],
		z:"MF_BG",
		existData:[
         {t:['Time',78]},
        ],
        collisionBox:['R',100,40],
		moveF:[[74,999,QJ.MPMZ.tl.ex_frozenEarth]]
      });
	  
	// 耐久度结算
 if ($gameParty.leader().equips()[0]) {
    var durabilityDamage = this._chargeCounter;
	
    if ($gameParty.leader().hasSkill(31)) {
	    let rate = (100 - $gameParty.leader().skillMasteryLevel(31)) / 100;
		rate     = Math.max(0.005, rate);		
		durabilityDamage *= rate;
	}
   
	$gameParty.leader().equips()[0].durability -= Math.floor(durabilityDamage);
	// 法杖因耐久度归零破损
	if ($gameParty.leader().equips()[0].durability <= 0) {
		$gamePlayer.drill_ECE_endSustainingFloating();
		$gameScreen._particle.particleClear('mahoujin_c-P');
        $gameParty.leader().removeState(65);
		$gameParty.leader().removeState(68);	
        $gamePlayer.drill_EASA_setEnabled(true);		
        if ($gameMap.getGroupBulletListQJ('playerWeaponImg').length > 0) {
          let bulletId = $gameMap.getGroupBulletListQJ('playerWeaponImg')[0];
           $gameMap._mapBulletsQJ[bulletId]._broken = true;
        }		
	}	
  }	  
	  
};

//冰地板判定
QJ.MPMZ.tl.ex_frozenEarth = function() { 

     let posX = this.inheritX();
     let posY = this.inheritY();
	 let magicScale = this.scaleX;
	 let time = 360;
	 
	 if ($gameMap.regionId( (this.x/48), (this.y/48) ) == 8) {
		 time += 1440;
	 }
	 
	 let deadTime = time - 2;
       QJ.MPMZ.Shoot({
        img:'pipofm-groundeffect10',
		position:[["S",posX],["S",posY]],
        initialRotation:['S',0],
		groupName:['frozenEarth','magic'],
        moveType:['S',0],
		scale:magicScale,
		opacity:0.65,
		z:"MF_BG",
		existData:[
		{t:['NP'],a:['F',QJ.MPMZ.tl.ex_frozenEarthDisappear],cb:['R',40,16]},
        {t:['Time',time]},
        {t:['P'],a:['F',QJ.MPMZ.tl.ex_slipOnIce],p:[-1,false,true,QJ.MPMZ.tl.ex_intoIceFloors,QJ.MPMZ.tl.ex_outofIceFloors],c:['T',1,2,true]},
        {t:['G',['"enemy"']],a:['F',QJ.MPMZ.tl.ex_slipOnIce],p:[-1,false,true,QJ.MPMZ.tl.ex_intoIceFloors,QJ.MPMZ.tl.ex_outofIceFloors],c:['T',1,2,true]},
        ],
        collisionBox:['R',100,40],
		anchor:[0.5,0.5],
		moveF:[[deadTime,99999,QJ.MPMZ.tl.ex_frozenEarthDisappear]]
    });
};

//冰地板判定
QJ.MPMZ.tl.ex_frozenEarthDisappear = function() { 
     let posX = this.inheritX();
     let posY = this.inheritY();
	 let magicScale = this.scaleX;
       QJ.MPMZ.Shoot({
        img:'pipofm-groundeffect10_alt[5,4,4]',
		position:[["S",posX],["S",posY]],
        initialRotation:['S',0],
		groupName:[name],
		scale:magicScale,
		opacity:0.65,
        moveType:['S',0],
		z:"MF_BG",
		existData:[
         {t:['Time',78]},
        ],
      });
};

//冰上滑行
QJ.MPMZ.tl.ex_slipOnIce = function(args) { 

    if (args.target && args.target instanceof Game_Event) {
		
		if (!args.target.isMoved()) return;
		
		if (args.target._chaseSpeed >= 30 || args.target._moveSpeed >= 30) {
         let eventId = args.target._eventId;
         var angle = chahuiUtil.getCharacterAngle(eventId);
         var randomMultiplier = Math.random() * (1.25 - 0.75) + 0.75;
         angle = Math.round(angle * randomMultiplier);
          if (args.target._chasePlayer) {
          var distance = args.target._chaseSpeed / 6;
       } else {
         var distance = args.target._moveSpeed / 6;
       } 
         QJ.MPMZ.tl.ex_jumpWithAngle(eventId,angle,distance);		 
     } else {
		 var d = args.target.direction();
         args.target.moveByDirection(d);
	  }
          var se = { name: "Fall", volume: 50, pitch: 150, pan: 0 };
          AudioManager.playSe(se);
		  
		return;  
	}
     // 玩家滑行
    if (args.target && args.target instanceof Game_Player) {
	     if ($gamePlayer.isMoved() && !$gamePlayer.isJumping()) {
			 
		  if($gameParty.leader()._characterName == "$player_swim") {
			$gameActors.actor(1).removeState(67);
		    $gameParty.leader()._characterName = "$player";
    	    $gamePlayer.refresh();			 
		  }  
			 if ($gamePlayer.realMoveSpeed() >= 30) {
				 var angle = chahuiUtil.getCharacterAngle(-1);
                 var randomMultiplier = Math.random() * (1.25 - 0.75) + 0.75;
                 angle = Math.round(angle * randomMultiplier);
                 var event = $gamePlayer;
                 var distance = event.realMoveSpeed() / 6;
                  QJ.MPMZ.tl.ex_jumpWithAngle(-1,angle,distance);	
			 } else {
				 var d = $gamePlayer.direction();
				 $gamePlayer.moveByDirection(d);
			 }
               var se = { name: "Fall", volume: 50, pitch: 150, pan: 0 };
               AudioManager.playSe(se);			 
			 
		 }
  }
};

//进入冰地板
QJ.MPMZ.tl.ex_intoIceFloors = function(target) {

  if (target instanceof Game_Event && target.isMoved()) {
	   if (target._chaseSpeed < 24 && target._moveSpeed < 24) {
	  var eventID = target._eventId;
	  if (!target._remSpeed || target._remSpeed === 0){
	  target._remSpeed = target._moveSpeed;
	  target._moveSpeed = 23;
	     }
	   }
     } else if (target instanceof Game_Player && target.isMoved()) {
       $gameMap.steupCEQJ(318,1);
	   if (target.realMoveSpeed() < 24) {
      $gameParty.leader().addState(81);
	  $gamePlayer.drill_EASe_stopAct();
	  target.drill_EASe_setSimpleStateNode( ["虚弱"] );
	   }
	 }
	 
}
//离开冰地板
QJ.MPMZ.tl.ex_outofIceFloors = function(target) {

  if (target instanceof Game_Event) {
	  var eventID = target._eventId;
	  target._moveSpeed = target._remSpeed;
	  target._remSpeed = 0;
     } else if (target instanceof Game_Player) {
      QJ.MPMZ.tl.ex_playerSwimmingCheck.call(this);
      $gameParty.leader().removeState(66);
	  target.drill_EASA_setEnabled( true );
	 }

}

// 水爆弹
QJ.MPMZ.tl.ex_AquaBlastCannonBullet = function(initialize) {
	
	if (initialize && initialize === "blast") {
	  let magicDamage  = this.data.damage;
      let posX         = this.inheritX();
      let posY         = this.inheritY();
	  let angle        = this.inheritRotation();
	  let magicScale   = this.scaleX;

      AudioManager.playSe({ name: "Water4", volume: 50, pitch: Math.randomInt(30) + 91, pan: 0 });	

      let Bullet = QJ.MPMZ.Shoot({
        img:"waterMine[4,2,4]",
		groupName:['playerBullet'],
        position:[['S',posX],['S',posY]],
        initialRotation:['S',angle],
        moveType:['S',7],
		z:'W',
		damage:magicDamage,
		anchor:[0.5,0.5],
		imgRotation:['S',0],
		collisionBox:['C',10],
		scale:magicScale,
        existData:[
			{t:['Time',210]},
			{t:['R',[255]],c:['S','this.time > 10']},	
			{t:['G',['"enemy"','"object"']],a:['F',QJ.MPMZ.tl.ex_toEnemyAttack,[magicDamage,{magicAttack:true,noHitEffect:true,noDurLoss:true,specifyAddedStatus:true}]]},
        ],
		deadJS:["QJ.MPMZ.tl.ex_enemy_waterMineBreak.call(this)"],
      });

        //追踪效果
	    if ($gameParty.leader().hasSkill(41) || $gameParty.leader().hasSkill(72)) {
		    Bullet.addMoveData("F",[10,10,QJ.MPMZ.tl.ex_projectileTrackingEffect]);
	     }
	  
		return;
	}
	
	if (!TouchInput.drill_isLeftPressed()) return;
	let weapon = $gameParty.leader().equips()[0];
	if (!weapon || !this) return;
		
    function randPointInCircle(cx, cy, R) {
       const a = Math.random() * Math.PI * 2;   // 随机角度
       const r = Math.sqrt(Math.random()) * R;  // 半径要开方，保证均匀分布
       const x = Math.round(cx + r * Math.cos(a));
       const y = Math.round(cy + r * Math.sin(a));
       return { x, y };
    }	
	const playerX = $gamePlayer.screenBoxXShowQJ();
	const playerY = $gamePlayer.screenBoxYShowQJ();
    const p = randPointInCircle(playerX, playerY, 75);
    let posX = p.x;
    let posY = p.y;
    let magicScale = 1 * $gameParty.leader().mdr;
	let playerIndex = this.data.playerIndex;
	// 在水域环境附近施法
	let onWater = QJ.MPMZ.tl.hitRegionAroundBullet(playerIndex, [8], 40);
	if (onWater) {
		this._CDReduction = 33;
		magicScale += 0.2 + (Math.round(Math.random() * 10) / 10);
	} else {
		this._CDReduction = 0;
	}
    let baseDamage = Math.floor(25 + (0.3 * chahuiUtil.getVarianceDamage(2)));
	let magicDamage = baseDamage * magicScale;
	
    AudioManager.playSe({ name: "Water5", volume: 50, pitch: Math.randomInt(30) + 91, pan: 0 });	
	
	var iniRotation = ['M']; 
	if (Utils.isMobileDevice())  {
		iniRotation = ['S',"Input._pressAngle['ok']?Input._pressAngle['ok']:0"];
	}	
	
    let Bullet = QJ.MPMZ.Shoot({
		groupName:['playerBullet','magic','water'],
        img:"waterMineStartUp[5,3,6]",
        position:[['S',posX],['S',posY]],
        initialRotation:iniRotation,
		imgRotation:['S',0],
		opacity:1,
        scale:magicScale,
        moveType:['S',0],
		blendMode:0,
		damage: Math.round(magicDamage),
        imgRotation:['F'],
        anchor:[0.5,0.5],
        existData:[	
		   {t:['Time',74],a:['F',QJ.MPMZ.tl.ex_AquaBlastCannonBullet,["blast"]]},
		   //{t:['R',[8]],a:['F',QJ.MPMZ.tl.ex_AquaBlastCannonBullet],p:[-1,true,true],c:['T',20,20,true],cb:['C',48]},
        ],
        z:"W",
		collisionBox:['C',1],
		moveF:[
		//[10,10,QJ.MPMZ.tl.ex_bulletTrajectoryCorrection]
		],
      });			  

    if (initialize && initialize === "noTrigger") {
		return;
	}

	// 耐久度结算
    let durabilityDamage = baseDamage;   
    if ($gameParty.leader().hasSkill(31)) {
	    let rate = (100 - $gameParty.leader().skillMasteryLevel(31)) / 100;
		rate     = Math.max(0.005, rate);		
		durabilityDamage *= rate;
	}   
	weapon.durability -= Math.floor(durabilityDamage);
	// 法杖因耐久度归零破损
	if (weapon.durability <= 0) {
		$gamePlayer.drill_ECE_endSustainingFloating();
		$gameScreen._particle.particleClear('mahoujin_c-P');
        $gameParty.leader().removeState(65);
		$gameParty.leader().removeState(68);	
        $gamePlayer.drill_EASA_setEnabled(true);		
        if ($gameMap.getGroupBulletListQJ('playerWeaponImg').length > 0) {
          let bulletId = $gameMap.getGroupBulletListQJ('playerWeaponImg')[0];
           $gameMap._mapBulletsQJ[bulletId]._broken = true;
        }		
	}
    
	// 在水域环境附近施法
	if (onWater && Math.random() > 0.7) {
		QJ.MPMZ.tl.ex_AquaBlastCannonBullet.call(this, "noTrigger")
	}
	
};


//穿刺波纹
QJ.MPMZ.tl.ex_rippleThrustCircle = function() {   

  if(!this || this._chargeCounter < 60) return;
   let weapon = $gameParty.leader().equips()[0];
   var baseSize = 1;
   var maxCorrection = 3;
   var correctionValue = (this._chargeCounter / 6000) * maxCorrection; 
   var extraSize = ($gameParty.leader().mdr - 1) * 0.25;
   var finalSize = correctionValue + baseSize + extraSize;
   let baseDamage = 20 + (0.85 * chahuiUtil.getVarianceDamage(2));
   let magicDamage = Math.floor(baseDamage * finalSize);  
   let img = "Magic/Water_Spell_6[15,4]";
   let time = 59;
   let cCode = "this.time>28 && this.time<35";   
   let mAnchor = [0.5,0.5];
   	// 在水域环境附近施法
   let mouseX = TouchInput.x / $gameScreen.zoomScale();
   let mouseY = TouchInput.y / $gameScreen.zoomScale();
   let xx = (mouseX / 48) + $gameMap.displayX();
   let yy = (mouseY / 48) + $gameMap.displayY(); 
   let onWater = $gameMap.regionId( Math.floor(xx), Math.floor(yy) ) === 8;
   if (onWater) {
	   magicDamage *= 2.5;
	   finalSize += 0.5;
	   img = "Magic/Water_Spell_3[12,4]";
	   time = 47;
	   cCode = "this.time>24 && this.time<32";
	   mAnchor = [0.5,0.7];
   }
   
   AudioManager.playSe({ name: "Water3", volume: 90, pitch: 100, pan: 0 });	
 
   let rippleThrust = QJ.MPMZ.Shoot({
        img:img,
		groupName:['rippleThrust','magic'],
        position:[['M'],['M']],
        initialRotation:['S',0],
        imgRotation:['F'],
		collisionBox:['C',30],
        scale: finalSize,
        opacity:1,
		anchor:mAnchor,
        moveType:['S',0],
        blendMode:0,
        existData:[	
		  {t:['Time',time]},
		  {t:['G',['"enemy"','"object"','waterSpellEffective']],a:['F',QJ.MPMZ.tl.ex_toEnemyAttack,[magicDamage,{magicAttack:true,noHitEffect:true,noDurLoss:true,specifyAddedStatus:true}]],p:[-1,false,true],c:['S',cCode]},
        ],
        z:10,
		//deadF:[[QJ.MPMZ.tl.ex_meteorStrikeBoom]],	
    });
	
	if (onWater && magicDamage > 233) {
	   rippleThrust.addExistData({t:['R',[8,248]],a:['F',QJ.MPMZ.tl.bombInWaterEffect],p:[-1,false,true],cb:['C',1],c:['S','this.time > 40']});
	}
	// 耐久度结算
 if (weapon) {
    var durabilityDamage = magicDamage;
    if (onWater) durabilityDamage / 2;
    if ($gameParty.leader().hasSkill(31)) {
	    let rate = (100 - $gameParty.leader().skillMasteryLevel(31)) / 100;
		rate     = Math.max(0.005, rate);		
		durabilityDamage *= rate;
	}
   
	weapon.durability -= Math.floor(durabilityDamage);
	// 法杖因耐久度归零破损
	if (weapon.durability <= 0) {
		$gamePlayer.drill_ECE_endSustainingFloating();
		$gameScreen._particle.particleClear('mahoujin_c-P');
        $gameParty.leader().removeState(65);
		$gameParty.leader().removeState(68);	
        $gamePlayer.drill_EASA_setEnabled(true);		
        if ($gameMap.getGroupBulletListQJ('playerWeaponImg').length > 0) {
          let bulletId = $gameMap.getGroupBulletListQJ('playerWeaponImg')[0];
           $gameMap._mapBulletsQJ[bulletId]._broken = true;
        }		
	}	
  }	
	
};


QJ.MPMZ.tl.ex_XerisesCursedHand = function() {
	
	QJ.MPMZ.deleteProjectile("XerisesCursedHand",{});

   let equips = $gameParty.leader().equips();  
   let result = 0;
   
   for (var i = 0; i < equips.length; i++) {
        var item = equips[i];
        if (item && item.etypeId === 2 && item.baseItemId === 47) {
            result += 1; // 计算装备中数量
        }
    } 
	
	if (result == 0) return; 
	
	let iniRotation = ['M'];
	
	if (Utils.isMobileDevice()) {
		iniRotation = ['S',"Input._pressAngle['ok']?Input._pressAngle['ok']:0"];
	}		
	
    let XerisesCursedHand = QJ.MPMZ.Laser({
	   rotation: iniRotation,
	   groupName: ['servant','XerisesCursedHand'],
	   img:'armor/armor47',
	   judgeWidth:20,
       length:['S',32],	
	   z:'W',
	   opacity:'0|0~20/1~999999|1',
	   rotationStatic:false,
	   positionStatic:false,
	   imgPoint:'null1',
	   existData:[
            //{t:['S',cancelCode,true],a:['S','$gamePlayer.drill_ECE_endSustainingFloating();QJ.MPMZ.tl.ex_staffAlwaysVisible()'],p:[-1,false,true],d:[0,20],c:['S','this.time > 30']},   			
       ],	
       moveF: [
			[30,60,QJ.MPMZ.tl.ex_XerisesCursedHandEffects,[result,iniRotation]]
        ],
       moveJS: [
			[0,0,"this.data.positionSpread = 32 + 4 * Math.sin((2 * Math.PI / 60) * this.time)"]
        ],      		
	   positionSpread:32,
	});
  
};


QJ.MPMZ.tl.ex_XerisesCursedHandEffects = function(result,iniRotation) {

    let damage = (3 * result) + Math.round(chahuiUtil.getVarianceDamage(2) * 0.01 * (2 + result * 4));	
	
    QJ.MPMZ.Laser({
	   rotation: iniRotation,
	   groupName: ['XerisesCursedHand'],
	   //img:'null1',
	   //img: 'Magic/kiddolink_VFX_beam_loop[12,2]',
	   judgeWidth:5,
       length:['S',420,0,[['R',[255]]]],	
	   opacity: 1,
	   rotationStatic:false,
	   positionStatic:false,
	   imgStretchMode:'C',
	   imgPoint:'null1',
	   judgeMode:['W',15],
	   existData:[
	        { t:['Time',60] },
            { t:['G',['"enemy"','"object"']], c:['S','!$gameMessage.isBusy()'], a: ['F', QJ.MPMZ.tl.ex_toEnemyAttack, [damage,{magicAttack:true,orbitingDamage:true,noHitEffect:true,noDurLoss:true,specifyAddedStatus:true,addedStatusType:0}]], p: [-1, false, true] },   			
       ],	
       moveF: [
			
        ],
       moveJS: [
			
        ],      		
	   positionSpread:36,
	});
	
};
