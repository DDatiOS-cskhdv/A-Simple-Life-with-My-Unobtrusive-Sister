//=============================================================================
//
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc [弹幕模板库][远程武器-弓]
 * @author 仇九
 *
 * @help 
 * 
 *
 */
//=============================================================================
//
//=============================================================================

//=============================================================================
//弓箭
//=============================================================================

QJ.MPMZ.tl.ex_playerBowAttackCheck = function() {
	
     $dataMap.disableDashing = false;
	 $gamePlayer.drill_EASA_setEnabled( true );
	 let bow = $gameParty.leader().equips()[0];
	 if(!bow) return;
	 let weaponType = bow.wtypeId;
	 if (weaponType !== 3) return;	 
	 
	 if($gameMap.getGroupBulletListQJ('playerBow').length > 0) return;
     $gameParty.leader().removeState(62);
	 destroyTemporaryBar(-1);	   
       QJ.MPMZ.Shoot({
            groupName: ['playerBow','attackMonitoring'],
            img: "null1",
            position: [['P'], ['P']],
            initialRotation: ['S',0],
            moveType: ['B',-1],
			opacity:0,
			collisionBox:['C',1],
            existData: [
            ],          
            moveF: [
			[2,2,QJ.MPMZ.tl.ex_playerBowAttackTypeCheck],
            //[2,2,QJ.MPMZ.tl.ex_playerSpecialAttackTrigger],
            ],
        });
	
};

//弓攻击行为检测
QJ.MPMZ.tl.ex_playerBowAttackTypeCheck = function() {

 var GamepadsAttack = false;
 // 手柄检测
 if ( navigator.getGamepads() && navigator.getGamepads()[0] !== null ) {
	 $gamePlayer._directionFix = false;
	 GamepadsAttack = Input.drill_isPadPressed('右摇杆上') || Input.drill_isPadPressed('右摇杆下') || Input.drill_isPadPressed('右摇杆左') || Input.drill_isPadPressed('右摇杆右');
     QJ.MPMZ.tl.ex_GamepadsChangePlayerDirection();
 }

 let Triggered = false;
 if (Utils.isMobileDevice()) {
	 Triggered = $gameSwitches.value(201);
 } else {
	 Triggered = TouchInput.drill_isLeftPressed();
 }

 if ( Triggered || GamepadsAttack) {
	 
	 let bow = $gameParty.leader().equips()[0];
	 if(!bow) return;
	 let weaponType = bow.wtypeId;
	 // 不是装备着弓
	 if (weaponType !== 3) {
		this.setDead({t:['Time',0]});	
        return;		
	 }
     if ( QJ.MPMZ.tl.ex_playerAntiClickDetection("normalAttack") )  return;

     if (SceneManager._scene.drill_GBu_isOnGaugeButton()) return;
	 
	 $dataMap.disableDashing = true;
	 if ($gamePlayer && $gamePlayer._drill_EASe_controller !== undefined) {
	    $gamePlayer.drill_EASe_setSimpleStateNode( ["弓箭蓄力"] );
	 }
	 QJ.MPMZ.tl.ex_bowReady(GamepadsAttack);
     this.setDead({t:['Time',0]});	
	 return;
   }
   
 if ( TouchInput.drill_isRightPressed() ) {
	 let bow = $gameParty.leader().equips()[0];
	 if(!bow) return;
	 let weaponType = bow.wtypeId;
	 // 不是装备着弓
	 if (weaponType !== 3) {
		this.setDead({t:['Time',0]});	
        return;		
	 }
     if ( QJ.MPMZ.tl.ex_playerAntiClickDetection("normalAttack") )  return;
	 $gameParty.leader().addState(62);
	 $gameVariables.setValue(129, 0);
	 $dataMap.disableDashing = true;
	 if ($gamePlayer && $gamePlayer._drill_EASe_controller !== undefined) {
	    $gamePlayer.drill_EASe_setSimpleStateNode( ["弓箭蓄力"] );
	 }	 
	 QJ.MPMZ.tl.ex_chargedBowDraw();
	 createTemporaryBar(-1,129,300);
     this.setDead({t:['Time',0]});	
   }	 
   
};	
	

//左键拉弓
QJ.MPMZ.tl.ex_bowReady = function(GamepadsAttack) {

		 var seNames = "弓を引き絞る1";
		 var randomPitch = Math.randomInt(20) + 90;
		 var se = { name: seNames, volume: 90, pitch: randomPitch, pan: 0 };
		 AudioManager.playSe(se);	

	     var intervalTime = Math.round( 90 * (1 - $gameParty.leader().cnt) );
		     intervalTime = Math.max(intervalTime,5);
         var iniRotation = ['M'];
		 if (Utils.isMobileDevice())  {
			 iniRotation = ['S',"Input._pressAngle['ok']?Input._pressAngle['ok']:0"];
		 }
         if (GamepadsAttack)  iniRotation = ['S','QJ.MPMZ.tl.ex_gamepadsCheckDirection()']; 
		
		var weaponImage = "weapon/weapon" + $gameParty.leader().equips()[0].baseItemId;
		var bowReady = QJ.MPMZ.Shoot({
			groupName:['playerBullet','playerSkill','weaponMarker'],
			img:weaponImage,
			scale:1,
			position:[['P'],['P']],
			initialRotation:iniRotation,
			imgRotation:['F'],
			moveType:['D',true],
			anchor:[0.5,1],
			blendMode:0,
			z:"W",
			collisionBox:['C',5],
			existData:[
				{ t:['S','$gameParty.leader().equips()[0]&&$gameParty.leader().equips()[0].baseItemId==4',true] },	
                { t: ['S', '$gameMap.regionId(Math.floor($gamePlayer.centerRealX()), Math.floor($gamePlayer.centerRealY())) === 8', true], a:['S','$gamePlayer.drill_EASA_setEnabled( true )'] },				
			],
			moveF:[
			   [60,intervalTime,QJ.MPMZ.tl.ex_shootArrows,[GamepadsAttack]]
			],
			deadJS:["QJ.MPMZ.tl.ex_playerBowAttackCheck()"]
		});

       if (Utils.isMobileDevice()) {
			bowReady.addExistData({t:['S','$gameSwitches.value(201)',false]});
      } else {
		if (TouchInput.drill_isLeftPressed()) {
			bowReady.addExistData({t:['S','!TouchInput.drill_isLeftPressed()',true]});
		}
	  } 
	    bowReady.addMoveData('F',[4,4,QJ.MPMZ.tl.ex_checkBowAlignment]);
		
		if (GamepadsAttack) {
			var AnyPadReleased = "Input.drill_isPadPressed('右摇杆上')||Input.drill_isPadPressed('右摇杆下')||Input.drill_isPadPressed('右摇杆左')||Input.drill_isPadPressed('右摇杆右')";
			bowReady.addExistData({t:['S',AnyPadReleased,false]});
			bowReady.addMoveData('F',[4,4,QJ.MPMZ.tl.ex_checkBowAlignment],[GamepadsAttack]);
		}		
};

//手柄状态校准弓箭Z轴
QJ.MPMZ.tl.ex_gamepadsCheckDirection = function(change) {
   if (change) {
    var up    = Input.drill_isPadPressed('左摇杆上');
    var down  = Input.drill_isPadPressed('左摇杆下');
    var left  = Input.drill_isPadPressed('左摇杆左');
    var right = Input.drill_isPadPressed('左摇杆右');	   
   } else {
    var up    = Input.drill_isPadPressed('右摇杆上');
    var down  = Input.drill_isPadPressed('右摇杆下');
    var left  = Input.drill_isPadPressed('右摇杆左');
    var right = Input.drill_isPadPressed('右摇杆右');
   }
    var isPadPressed = up || down || left || right;
    if (isPadPressed) {
        // 上下优先判断
        if (up) {
            if (left) {
                return 315;	  // ↖(上左)
            } else if (right) {
                return 45;	// ↗(上右)
            } else {
                return 0;	// ↑(上)
            }
        } else if (down) {
            if (left) {
                return 225;	// ↙(下左)
            } else if (right) {
                return 135;	// ↘(下右)
            } else {
                return 180;	// ↓(下)
            }
        } else {
            // 这里说明既没上也没下，但检测到左右
            if (left) {
                return 270;	// ←(左)
            } else if (right) {
                return 90;	// →(右)
            }
        }
    } else {
		return 0;
	}
};

//校准弓箭Z轴
QJ.MPMZ.tl.ex_checkBowAlignment = function(GamepadsAttack) {

    if (GamepadsAttack) {
		QJ.MPMZ.tl.ex_GamepadsChangePlayerDirection();
	}

	if (this.rotationImg <= 90 || this.rotationImg >= 270) {
	this.changeAttribute("z","E");
	} else {
	this.changeAttribute("z","W");
	}
	
	if ($gameVariables.value(129) >= 60 && TouchInput.drill_isRightPressed()){ 
	var red = $gameVariables.value(129) - 45;
	this.changeAttribute("tone",[red,0,0,0]);
	}
	
}

//箭矢发射
QJ.MPMZ.tl.ex_shootArrows = function(GamepadsAttack) {
	
     let weapon = $gameParty.leader().equips()[0];	
	 if(!weapon) return;
     $gamePlayer.drill_EASe_setAct( "弓箭射击" );
     var seNames = "弓矢を放つ";
     var randomPitch = Math.randomInt(40) + 81;
     var se = { name: seNames, volume: 90, pitch: randomPitch, pan: 0 };
     AudioManager.playSe(se);	
	 
    var weaponImage = "weapon/weaponBullet" + weapon.baseItemId;
	var weaponDamage = chahuiUtil.getVarianceDamage(1);	
	var AfterImage = null;
	 //连发箭
	var extraCount = $gameParty.leader().skillMasteryLevel(99);    
	// 血箭
    if ($gameParty.leader().hasSkill(53)) {
		AfterImage = ['#ff0000','0|1~10/0',10,3];
		let costHp = Math.round($gameParty.leader().mhp * 0.03);
		weaponDamage += 4 * costHp;
		    costHp *= (1 + extraCount);
		// 要延迟扣血
		QJ.MPMZ.Shoot({
            img:"null1",groupName: ['costHp'],
            existData: [ 
			   {t:['Time',20],a:['S',`$gameParty.leader().gainHp(${-costHp})`]}
			],
        });
	}
	    var iniRotation = ['M']; 

		 if (Utils.isMobileDevice())  {
			iniRotation = ['S',"Input._pressAngle['ok']?Input._pressAngle['ok']:0"];
		 }
        if (GamepadsAttack) {
		    // iniRotation = ['S','QJ.MPMZ.tl.ex_gamepadsCheckBowAlignment()'];
		}
		
    var Arrows = QJ.MPMZ.Shoot({
        groupName:['playerBullet'],
		collisionBox:['auto'],
        img:weaponImage,
		moveType:['S','0|12~60/7~999/7'],
        position:[['P'],['P']],
		initialRotation:iniRotation,
        imgRotation:['F'],
		afterImage:AfterImage,
        existData:[  
			 {t:['Time',180]},
			 {t:['R',[255]],c:['S','this.time > 10']},	
      	     {t:['G',['"enemy"','"object"']],a:['F',QJ.MPMZ.tl.ex_toEnemyAttack,[weaponDamage,{noDurLoss:true,weaponAttack:true}]]},
		 ],		
    });
	// 火箭属性
	if (weapon.baseItemId == 103) {
        Arrows.data.groupName.push("fire");
	    $gameMap.addMapBulletsNameQJ(Arrows.index, Arrows.data.groupName);
	}

        //追踪效果
	    if ($gameParty.leader().hasSkill(41)) {
		    Arrows.addMoveData("F",[10,10,QJ.MPMZ.tl.ex_projectileTrackingEffect]);
	     }	

	    if (extraCount > 0) {
		
	QJ.MPMZ.Shooter_ArcRange(
		['M'],{
        groupName: Arrows.data.groupName,
		collisionBox:['auto'],
        img:weaponImage,
		moveType:['S','0|10~60/6~999/6'],
        position:[['P'],['P']],
		initialRotation:['M'],
        imgRotation:['F'],
		subBullet:true,
        moveF:Arrows.data.moveF,
        existData:[  
		 {t:['Time',180]},
		 {t:['R',[255]],c:['S','this.time > 10']},	
         {t:['G',['"enemy"','"object"']],a:['F',QJ.MPMZ.tl.ex_toEnemyAttack,[weaponDamage,{noDurLoss:true,weaponAttack:true}]]},
		 ],		
       },-30,30,extraCount,30,1,1);
	}
	// 射箭直接消耗耐久度，并根据箭矢数量增加消耗
 if ($gameParty.leader().equips()[0]) {
   var durabilityDamage = weaponDamage;
       weaponDamage += extraCount * weaponDamage;
	 if ($gameParty.leader().hasSkill(30)) {
		durabilityDamage *= Math.max(0,(100 - $gameParty.leader().skillMasteryLevel(30)) / 100);
	 }	   
	$gameParty.leader().equips()[0].durability -= Math.floor(durabilityDamage);
	// 弓因耐久度归零破损
	if ($gameParty.leader().equips()[0].durability <= 0) {
        if ($gameMap.getGroupBulletListQJ('playerWeaponImg').length > 0) {
          let bulletId = $gameMap.getGroupBulletListQJ('playerWeaponImg')[0];
           $gameMap._mapBulletsQJ[bulletId]._broken = true;
         }
	   }		
     }		
};

//右键蓄力拉弓
QJ.MPMZ.tl.ex_chargedBowDraw = function() {

		 var seNames = "弓を引き絞る1";
		 var randomPitch = Math.randomInt(20) + 90;
		 var se = { name: seNames, volume: 90, pitch: randomPitch, pan: 0 };
		 AudioManager.playSe(se);	
		 
		var weaponImage = "weapon/weapon" + $gameParty.leader().equips()[0].baseItemId;
			QJ.MPMZ.Shoot({
			groupName:['playerBullet','playerSkill'],
			img:weaponImage,
			scale:[1,1],
			position:[['P'],['P']],
			initialRotation:['M'],
			imgRotation:['F'],
			moveType:['D',true],
			anchor:[0.5,1],
			imgRotation:['F'],
			blendMode:0,
			z:"W",
			collisionBox:['C',5],
			existData:[
			    { t:['S','$gameParty.leader().equips()[0]&&$gameParty.leader().equips()[0].baseItemId==4',true] },	
				{ t:['S','!TouchInput.drill_isRightPressed()',true],a:['F',QJ.MPMZ.tl.ex_shootChargedArrows],c:['S','this.time>90'] }, 
                { t: ['S', '$gameMap.regionId(Math.floor($gamePlayer.centerRealX()), Math.floor($gamePlayer.centerRealY())) === 8', true], a:['S','$gamePlayer.drill_EASA_setEnabled( true )'] },					
			],
			moveF:[[4,4,QJ.MPMZ.tl.ex_checkBowAlignment]],
			moveJS:[[60,10,'var number = Math.round( 10 * (1 + $gameParty.leader().cnt));$gameVariables.setValue(129, $gameVariables.value(129)+number)']],
			deadJS:["QJ.MPMZ.tl.ex_playerBowAttackCheck()"]
		});
	}

//蓄力箭矢发射
QJ.MPMZ.tl.ex_shootChargedArrows = function() {
     let weapon = $gameParty.leader().equips()[0];	
	 if(!weapon) return;
     $gamePlayer.drill_EASe_setAct( "弓箭射击" );
     var seNames = "弓矢を放つ";
     var randomPitch = Math.randomInt(40) + 81;
     var se = { name: seNames, volume: 90, pitch: randomPitch, pan: 0 };
     AudioManager.playSe(se);	
	destroyTemporaryBar(-1);
    var weaponImage = "weapon/weaponBullet" + weapon.baseItemId;
	var damageRatio = Math.min($gameVariables.value(129), 300);
	    damageRatio = 1.5 * (1 + (damageRatio / 100));
	var weaponDamage = Math.round(chahuiUtil.getVarianceDamage(1) * damageRatio);
    var	AfterImage = [['P',weaponImage],'0|1~16/0',16,2];
	//连发箭
	var extraCount = $gameParty.leader().skillMasteryLevel(99);

    var specialSkill = null;
	var skillMatch = $dataWeapons[weapon.baseItemId]?.note?.match(/<specialSkill:([^>]+)>/i);
	if (skillMatch) {
		specialSkill = skillMatch[1];
		specialSkill = eval("QJ.MPMZ.tl.ex_" + specialSkill);
	}

	// 血箭
    if ($gameParty.leader().hasSkill(53)) {
		AfterImage = ['#ff0000','0|1~16/0',16,3];
		let costHp = Math.round($gameParty.leader().mhp * 0.03);
		    costHp *= Math.min($gameVariables.value(129)/10, 30);
		    weaponDamage += Math.round(4 * costHp);
		    costHp *= (1 + extraCount);
		let time = 9;		
		if (costHp > 60) {
			time = 60;
			costHp = Math.round(costHp / 6);
		}
		// 要延迟扣血
		QJ.MPMZ.Shoot({
            img:"null1",groupName: ['costHp'],
            existData: [ 
			   {t:['Time',time]}
			],
			moveJS: [
			   [0,10,`$gameParty.leader().gainHp(${-costHp})`]
			]
        });
	}
	
    var ChargedArrows = QJ.MPMZ.Shoot({
        groupName:['playerBullet'],
		collisionBox:['auto'],
        img:weaponImage,
		moveType:['S','0|20~120/7~999/7'],
        position:[['P'],['P']],
		initialRotation:['M'],
        imgRotation:['F'],
        afterImage:AfterImage,
        existData:[  
		 {t:['Time',120]},
		 {t:['R',[255]],c:['S','this.time > 10']},	
         //{t:['G',['"enemy"','"object"']],a:['C',174,[weaponDamage,0,0,0]],p:[3,false,true]}
		 {t:['G',['"enemy"','"object"']],a:['F',QJ.MPMZ.tl.ex_toEnemyAttack,[weaponDamage,{noDurLoss:true,attackFallOff:true,specifyAddedStatus:true,addedStatusType:true,weaponAttack:true}]],p:[3,false,true,specialSkill]},
		 ],		
    });

	// 火箭属性
	if (weapon.baseItemId == 103) {
        ChargedArrows.data.groupName.push("fire");
	    $gameMap.addMapBulletsNameQJ(ChargedArrows.index, ChargedArrows.data.groupName);
	}
        //追踪效果
	    if ($gameParty.leader().hasSkill(41)) {
		    ChargedArrows.addMoveData("F",[10,10,QJ.MPMZ.tl.ex_projectileTrackingEffect]);
	     }	
		 
	if (extraCount > 0) {
		
	  QJ.MPMZ.Shooter_ArcRange(
		['M'],{
        groupName:ChargedArrows.data.groupName,
		collisionBox:['auto'],
        img:weaponImage,
		moveType:['S','0|20~60/6~999/6'],
        position:[['P'],['P']],initialRotation:['M'],
        imgRotation:['F'],
		subBullet:true,
		moveF:ChargedArrows.data.moveF,
        afterImage:[['P',weaponImage],'0|1~16/0',16,2],
        existData:[ 		
		 {t:['Time',360]},
		 {t:['R',[255]],c:['S','this.time > 10']},	
         //{t:['G',['"enemy"','"object"']],a:['C',174,[weaponDamage,0,0,0]],p:[3,false,true]}
		 {t:['G',['"enemy"','"object"']],a:['F',QJ.MPMZ.tl.ex_toEnemyAttack,[weaponDamage,{noDurLoss:true,attackFallOff:true,weaponAttack:true}]],p:[3,false,true,specialSkill]},
		 ],		
       },-5,5,extraCount,2,1,1);
	   	   
	}

	// 射箭直接消耗耐久度，并根据箭矢数量增加消耗
 if (weapon) {
   var durabilityDamage = weaponDamage * 1.5;
   
    if (specialSkill) durabilityDamage *= 1.2;
   
       weaponDamage += extraCount * weaponDamage;
	 if ($gameParty.leader().hasSkill(30)) {
		durabilityDamage *= Math.max(0,(100 - $gameParty.leader().skillMasteryLevel(30)) / 100);
	 }	   
	weapon.durability -= Math.floor(durabilityDamage);
	// 弓因耐久度归零破损
	if (weapon.durability <= 0) {
        if ($gameMap.getGroupBulletListQJ('playerWeaponImg').length > 0) {
          let bulletId = $gameMap.getGroupBulletListQJ('playerWeaponImg')[0];
           $gameMap._mapBulletsQJ[bulletId]._broken = true;
         }
	   }		
     }	
	
}

//火烧云：爆炸箭
QJ.MPMZ.tl.ex_explosiveArrows = function() {

    let posX = this.inheritX();
    let posY = this.inheritY();
        posX +=  24 * Math.sin(this.rotationMove*Math.PI/180);
        posY += -24 * Math.cos(this.rotationMove*Math.PI/180);		
    var magicImage = "Magic/GoVFX_Fire1[4,3,4]";
    var magicScale = 0.5 + ($gameVariables.value(129) / 300);
	magicScale = Math.min(magicScale, 5);
	var magicDamage = 80 + chahuiUtil.getVarianceDamage(3) * 4;
	    magicDamage = Math.round(magicDamage * magicScale);
	
    QJ.MPMZ.Shoot({
		groupName:['playerBullet','fire'],
        img:magicImage,
        position:[['S',posX],['S',posY]],
        initialRotation:['S',0],
        scale:magicScale,
        moveType:['S',0],
        imgRotation:['F'],
        anchor:[0.5,0.5],
		blendMode:1,
        existData:[	
			{t:['Time',47]},
			{t:['G',['"enemy"','"object"']],a:['C',152,[magicDamage,0,0,0]],p:[-1,true,true],c:['S','this.time > 3 && this.time < 24']},
			{t:['G',['"enemy"','"object"']],a:['F',QJ.MPMZ.tl.attackKnockbackEffect,[null]],p:[-1,false,true],c:['S','this.time > 3 && this.time < 24']},
			{t:['P'],a:['F',QJ.MPMZ.tl.ex_playerDamageCheck,[magicDamage,2]],p:[-1,false,true],c:['S','this.time > 3 && this.time < 24']},
			{t:['P'],a:['F',QJ.MPMZ.tl.attackKnockbackEffect,[null]],p:[-1,false,true],c:['S','this.time > 3 && this.time < 24']},
        ],
        z:"W",
		collisionBox:['C',70],
    });
	
     var seNames = "Fire3";
     var randomPitch = Math.randomInt(40) + 81;
     var se = { name: seNames, volume: 80, pitch: randomPitch, pan: 0 };
     AudioManager.playSe(se);	
	this.setDead({t:['Time',0]});
};

//雪见：冰封箭
QJ.MPMZ.tl.ex_iceboundArrows = function() {

    let posX = this.inheritX();
    let posY = this.inheritY();
        posX +=  24 * Math.sin(this.rotationMove*Math.PI/180);
        posY += -24 * Math.cos(this.rotationMove*Math.PI/180);		
    var magicImage = "Magic/PapoyCore_IceEffect2[6,4]";
    var magicScale = 1 + ($gameVariables.value(129) / 200);
	magicScale = Math.min(magicScale, 3);
	var magicDamage = 20 + chahuiUtil.getVarianceDamage(3) * 0.5;
	    magicDamage = Math.round(magicDamage * magicScale);

    QJ.MPMZ.Shoot({
		groupName:['playerBullet'],
        img:magicImage,
        position:[['S',posX],['S',posY]],
        initialRotation:['S',0],
        scale:[magicScale,magicScale],//动态缩放
        moveType:['S',0],
        imgRotation:['F'],
        anchor:[0.5,0.8],
		blendMode:0,
        existData:[	
			{t:['Time',23]},
			{t:['G',['"enemy"','"object"']],a:['F',QJ.MPMZ.tl.ex_toEnemyAttack,[magicDamage,{noHitEffect:true,magicAttack:true,specifyAddedStatus:true,addedStatusType:9,addedStatusChance:15000}]],p:[-1,true,true],c:['S','this.time > 10']},
        ],
        z:"MF_UG",
		collisionBox:['R',20,60],
		deadF:[[QJ.MPMZ.tl.ex_iceboundArrowsEffect,[magicDamage]]]
    });
	
     var seNames = "氷が砕ける音・氷系の魔法SE（中レベル）";
     var randomPitch = Math.randomInt(40) + 81;
     var se = { name: seNames, volume: 70, pitch: randomPitch, pan: 0 };
     AudioManager.playSe(se);	
	 this.setDead({t:['Time',0]});
	
};

//冰封箭效果
QJ.MPMZ.tl.ex_iceboundArrowsEffect = function(damage) {
	
    let posX = this.inheritX();
    let posY = this.inheritY();
    let magicScale = this.scaleX;
    let	time = Math.floor(60 + 150 * magicScale);
	let endTime = time - 1;
	if (damage && damage > 0) {
		damage = Math.floor(damage * 0.15);
	} else {
		damage = 1;
	}
    QJ.MPMZ.Shoot({
		groupName:['playerBullet'],
        img:"Magic/PapoyCore_IceEffect2",
        position:[['S',posX],['S',posY]],
        initialRotation:['S',0],
        scale:magicScale,
        moveType:['S',0],
		opacity:0.75,
        imgRotation:['F'],
        anchor:[0.5,0.8],
		blendMode:0,
        existData:[	
			{t:['Time',time]},
			{t:['G',['"enemy"','"object"']],a:['F',QJ.MPMZ.tl.ex_toEnemyAttack,[damage,{noHitEffect:true,magicAttack:true,specifyAddedStatus:true,addedStatusType:9,addedStatusChance:5000}]],p:[-1,true,true],c:['T',0,40,true]},
			//{t:['G',['"enemy"','"object"']],a:['C',152,[magicDamage,0,0,0]],p:[-1,true,true],c:['S','this.time > 20']},
        ],
		moveF:[
		  [endTime,9999,QJ.MPMZ.tl.ex_iceboundArrowsEnd]
		],
        z:"MF_UG",
		collisionBox:['R',20,60],
		//dead:[[QJ.MPMZ.tl.ex_iceboundArrowsEnd]]
    });
};

//冰封箭消失
QJ.MPMZ.tl.ex_iceboundArrowsEnd = function() {
	
    let posX = this.inheritX();
    let posY = this.inheritY();
    let magicScale = this.scaleX; 
	
    QJ.MPMZ.Shoot({
		groupName:['playerBullet'],
        img:"Magic/PapoyCore_IceEffect2_end[6,2,4]",
        position:[['S',posX],['S',posY]],
        initialRotation:['S',0],
        scale:magicScale,
        moveType:['S',0],
		opacity:0.75,
        imgRotation:['F'],
        anchor:[0.5,0.8],
		blendMode:0,
        existData:[	
			{t:['Time',47]},
			//{t:['G',['"enemy"','"object"']],a:['C',152,[magicDamage,0,0,0]],p:[-1,true,true],c:['S','this.time > 20']},
        ],
        z:"MF_UG",
		collisionBox:['R',20,60],
		//dead:[[QJ.MPMZ.tl.ex_iceboundArrowsEnd]]
    });
};

//千鸟-雷击箭
QJ.MPMZ.tl.ex_lightningBolt = function() {


    let posX = this.inheritX();
    let posY = this.inheritY();
    var magicScale = 0.2 + ($gameVariables.value(129) / 200);
	magicScale = Math.min(magicScale, 1.5);
	if(Math.random() > 0.5) magicScaleX = -magicScale;
	var magicDamage = Math.round((20 + chahuiUtil.getVarianceDamage(3)) * magicScale);	
	
    let bullet = QJ.MPMZ.Shoot({
        img:"ef01_54_MagicAll_Thunder[6,5,2]",
        position:[['S',posX],['S',posY]],
        initialRotation:['S',0],
        imgRotation:['F'],
        scale:magicScale,
        opacity:1,
		anchor:[0.5,0.82],
        moveType:['S',0],
		collisionBox:['E', 200, 150],
        blendMode:1,
        existData:[	
		    {t:['Time',59]},
			{t:['G',['"enemy"','"object"']],a:['F',QJ.MPMZ.tl.ex_toEnemyAttack,[magicDamage,{noDurLoss:true,noHitEffect:true,magicAttack:true,specifyAddedStatus:true,addedStatusType:7,addedStatusChance:5000}]],p:[-1,true,true],c:['S',"this.time > 30 && this.time < 38"]},
        ],
        z:"W",
		moveJS:[[1,9999,'$gamePlayer.requestAnimation(184)']],
    });
	
	let chance = 8000;
	let onWater = $gameMap.regionId(Math.round(this.x/48), Math.round(this.y/48)) === 8;
	if( onWater || chance > Math.randomInt(10000) ){
	    bullet.addMoveData("F",[30,9999,QJ.MPMZ.tl.ex_electricTrap]);
	}
}

//电击陷阱
QJ.MPMZ.tl.ex_electricTrap = function() {
    let posX = this.inheritX();
    let posY = this.inheritY();
	let magicScaleX = this.scaleY;
	let magicScaleY = magicScaleX * 0.6;
	let damage = Math.round(0.2 * chahuiUtil.getVarianceDamage(2) * magicScaleX);
	   QJ.MPMZ.Shoot({
        img:"electricTrap[22,2,2]",
        position:[['S',posX],['S',posY]],
        initialRotation:['S',0],
        imgRotation:['F'],
        scale:[magicScaleX,magicScaleY],
        opacity:1,
        moveType:['S',0],
        blendMode:3,
		collisionBox:['E', 200, 150],
		//collisionBox:['R',160,160],
        existData:[	
		    {t:['Time',300]},
			{t:['G',['"enemy"','"object"']],
          a: ['F', QJ.MPMZ.tl.ex_toEnemyAttack, [
            damage,
            {
			  magicAttack:true,
              orbitingDamage:true,
              noHitEffect:true,
              noDurLoss:true,
              specifyAddedStatus:true,
              addedStatusType:7,
              addedStatusChance:3300
            }
          ]],p:[-1,true,true],c:['T',0,15,true]},
		    {t:['B',['playerFeet']],a:['F',QJ.MPMZ.tl.ex_playerDamageCheck,[10,2,7,3300]],p:[-1,true,true],c:['T',0,15,true]}
        ],
        z:"E",
        moveF: [ 
        ]
    });
}