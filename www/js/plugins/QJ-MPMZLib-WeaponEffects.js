//=============================================================================
//
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc [弹幕模板库][武器特效模板]
 * @author 仇九
 *
 * @help 
 * 
 *
 */
//=============================================================================
//近战武器特效
//=============================================================================


// 冲撞攻击移动路线
QJ.MPMZ.tl.ex_playerDashAttackPath = function (initialize, angle) {
	
  if (initialize && initialize === "start") {
	  let angle = 0;
	  if (Utils.isMobileDevice()) {
		 angle = Input._pressAngle['ok']?Input._pressAngle['ok']:0;
	  } else {
        let ax = ($gamePlayer._realX + 0.5 - $gameMap.displayX()) * 48;
        let ay = ($gamePlayer._realY + 0.5 - $gameMap.displayY()) * 48;
        let bx = TouchInput.x / 2 + $gameMap.displayX();
        let by = TouchInput.y / 2 + $gameMap.displayY();
        angle = QJ.calculateAngleByTwoPointAngle(ax, ay, bx, by);
	}
    let deadCode =
      `$gameParty.leader().removeState(82);
       $gamePlayer.drill_EASe_stopAct();
       $gamePlayer.drill_EASA_setEnabled( true );`;

    let color = [255, 255, 255, 255];
    if (!$gameParty.leader().isStateAffected(67)) {
      var r = 255, g = 150, b = 0;
      color = [r, g, b, 255];
    } else {
      var r = 50, g = 140, b = 200;
      color = [r, g, b, 255];
    }

    // 幽灵闪步效果
    if ($gameParty.leader().hasSkill(92)) {
      r = 144; g = 0; b = 255;
      color = [r, g, b, 255];
    }

    // 附加加速 buff
    $gameParty.leader().addState(82);

    var dash = QJ.MPMZ.Shoot({
      position:       [['P'], ['P']],
      initialRotation:['S', 0],
      imgRotation:    ['F'],
      moveType:       ['D', true],
      collisionBox:   ['C', 30],
      existData: [
        { t: ['Time', 65], a: ['S', deadCode] },
        { t: ['G', ['"enemy"', '"object"']], a: ['F', QJ.MPMZ.tl.ex_playerDashCombo, ['start']] }
      ],
      moveF: [
        [1, 0, QJ.MPMZ.tl.ex_playerDashAttackPath, ['move', angle]],
        [0, 3, QJ.MPMZ.tl.ex_senpoResidualEffect, [-1, color]]
      ]
    });
    return;
  }

  if (initialize && initialize === "move") {
    let target = $gamePlayer;
    target.dotMoveByDeg(angle);
  }
};


// 玩家必杀技
QJ.MPMZ.tl.ex_playerDashCombo = function (initialize, args) {

	
  if (initialize && initialize === "start") {
	  
    if (!args.target || !args.target instanceof Game_Event) {
	    return;
    }
	
	let posX = args.target.screenBoxXShowQJ();
    let posY = args.target.screenBoxYShowQJ(); - 4; 	
	
    $gameScreen.showPicture(9, "black", 0, 0, 0, 120, 120, 0, 0);
    $gameScreen.movePicture(9, 0, 0, 0, 120, 120, 255, 0, 20);
    // 敌人被控
	args.target._IsDisabledCounter += 210;
	// 玩家被控
	$gameSwitches.setValue(14, true);
	$gameSystem._drill_COI_map_mouse = false;
	$gameParty.leader().addState(69);
    TouchInput._mousePressed = false;
	$gameSystem._drill_COI_map_KPMove = false;
    QJ.MPMZ.Shoot({
	  position: [["S",posX], ["S",posY]],	
	  eid:args.target._eventId,
      moveType: ["S", 0],		  
      existData: [{ t: ["Time", 150] }],
      moveF: [[30, 5, QJ.MPMZ.tl.ex_playerDashCombo]],
      deadF: [[QJ.MPMZ.tl.ex_playerDashCombo, ["end"]]]
    });
    return;
  }

  if (initialize && initialize === "end") {
	  
	  $gamePlayer.drill_EASA_setEnabled( true );
	  $gamePlayer.drill_EASe_setAct( "技能动作1" );
    setTimeout(() => {
      $gameScreen.erasePicture(9);
      AudioManager.playSe({ name: "Battle3", volume: 60, pitch: 70, pan: 0 });
    let posX = this.inheritX();
    let posY = this.inheritY();
    let damage = Math.round(5 * chahuiUtil.getVarianceDamage(1) + (0.5 * $gameParty.leader().mhp));
	if ($gameParty.leader().equips()[0] && $gameParty.leader().equips()[0].baseItemId == 4) {
		damage += 20 * chahuiUtil.getVarianceDamage(1);
	}
	damage += Math.round(damage * (1 - $gameParty.leader().hpRate()));

    QJ.MPMZ.Shoot({
	  img: "Magic/kusa",
	  initialRotation: ['S', 0],
      imgRotation: ['S', 0],
	  scale: '0|0.6~60/1.2~999|1.2',
	  opacity:'0|1~60/0~999|0',
	  collisionBox:['C',4],
      position: [["S",posX], ["S",posY]],
      moveType: ["S", 0],	
      z: "A",	  
      existData: [
	                { t: ["Time", 60], a: ["S", `$gameSwitches.setValue(14, false);
					                            $gameParty.leader().removeState(69);
	                                            $gameParty.leader().removeState(82);
	                                            $gameSystem._drill_COI_map_mouse = true;
	                                        `] },
					{ t:['G',['"enemy"','"object"']], a:['F',QJ.MPMZ.tl.ex_toEnemyAttack,[damage,{noHitEffect:true,noDurLoss:true,specifyAddedStatus:true,addedStatusType:0,weaponAttack:true}]], p:[-1,false,true], c:['T',10,66,true] },						
											
				],
    });	  
    }, 350);
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
  let posX = this.inheritX();
  let posY = this.inheritY();

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

// 弹反子弹
QJ.MPMZ.tl.ex_weaponParry = function(target) {
    if (!target) return;

    let posX = target.inheritX();
    let posY = target.inheritY();
    
    if (!$gameParty.leader().equips()[0]) return;
    
    let weapon = $gameParty.leader().equips()[0];
    let wtype = weapon.wtypeId;

    if (wtype === 1) {
        // 剑类武器 - 斩断
        target.setDead({ t: ['Time', 0], d: [0, 15] });

        // 斩断音效
        let se = {
            name: "剣の必殺技発動",
            volume: 40,
            pitch: Math.randomInt(60) + 70,
            pan: 0
        };
        AudioManager.playSe(se);

        // 斩击特效
        QJ.MPMZ.Shoot({
            img: '01_斬撃[3,5,2]',
            initialRotation: ['S', Math.randomInt(360)],
            position: [['S', posX], ['S', posY]],
            scale: [1, 1],
            moveType: ['S', 0],
            alpha: 0.6,
            blendMode: 1,
            z: "W",
            existData: [{ t: ['Time', 29] }],
        });

        return;
    }

    if (wtype === 2 && !target._countered) {
        // 棍棒类武器 - 击飞
        let parryRotation = (target.rotationMove + 180) % 360;
        target.rotationMove = parryRotation;
        target._countered = true;
        if (weapon.baseItemId === 12) {
			if (target.data.damage) target.data.damage *= 2;
			if (target.data.moveType && target.data.moveType[0] == "S") {
				let speed = target.data.moveType[2].speed;
				    speed *= 2;
				target.changeAttribute("moveType",['S', speed]);
			}
	    }
		
		
        // 击飞特效
        QJ.MPMZ.Shoot({
            img: 'animehit[5,4]',
            position: [['S', posX], ['S', posY]],
            scale: [1.5, 1.5],
            moveType: ['S', 0],
            alpha: 1,
            z: "W",
            existData: [{ t: ['Time', 18] }],
        });

        // 击飞音效
        let se = {
            name: "金属バットで打つ（至近距離から録音）",
            volume: 45,
            pitch: Math.randomInt(60) + 70,
            pan: 0
        };
        AudioManager.playSe(se);
    }
};

//击退效果
QJ.MPMZ.tl.attackKnockbackEffect = function(power,args) {

	let posX = this.inheritX(); 
    let posY = this.inheritY();
	let tarX = 0;
	let tarY = 0;
    let angle = 0;
	if (!power) power = this.scaleX;
	if (!args.target) return;	
	
	tarX = args.target.screenShootXQJ();
	tarY = args.target.screenShootYQJ();
	angle = QJ.calculateAngleByTwoPointAngle(posX, posY, tarX, tarY);
	
    if ( args.target instanceof Game_Player ) {	
	
	QJ.MPMZ.tl.ex_jumpWithAngle(-1,angle,power);
	
	} else if ( args.target instanceof Game_Event ) {
		
	let eventId = args.target._eventId;
	QJ.MPMZ.tl.ex_jumpWithAngle(eventId,angle,power);
	
	}	
};


//飞行物追踪效果
QJ.MPMZ.tl.ex_projectileTrackingEffect = function() {
	

	let enabled = this._Tracking || false;
	let posX = this.inheritX();
    let posY = this.inheritY();	  
	let range = 120;
	let angle = 10;
	let skillLevel = $gameParty.leader().skillMasteryLevel(41);
	range += 20 * skillLevel;
	angle += 4 * skillLevel;
	if (QJ.MPMZ.rangeAtk([['S',posX],['S',posY]],['G','"enemy"'],[],['C',range]).length > 0) {
		if (enabled) return;
		this.remMoveType = this.data.moveType;
		this.changeAttribute("moveType",['TG','"enemy"',10,angle,Math.floor(angle/2)]);
		if (!Utils.isMobileDevice())  this.changeAttribute("tone",['20|0~70/134~20/0','20|0~70/61~20/0','20|0~70/255~20/0',0]);
		this._Tracking = true;
	} else {
		if (enabled) {
		this.changeAttribute("moveType",this.remMoveType);	
		if (!Utils.isMobileDevice())  this.changeAttribute("tone",[0,0,0,0]);
		this._Tracking = false;
		}
	}

};

// 柳叶剑-飞镖
QJ.MPMZ.tl.ex_willowLeafEffects = function(type,subBullet = false) {
    if (!type) return;

    let weaponDamage = 10 + Math.floor(0.3 * chahuiUtil.getVarianceDamage(1));

    // 近战攻击效果
    if (type === "meleeAttack") {
		
	    // 发射弹幕消耗耐久度
        if ($gameParty.leader().equips()[0]) {
	        $gameParty.leader().equips()[0].durability -= 5;
        }		
        let seNames = "Wind7";
        let randomPitch = Math.randomInt(40) + 81;
        let se = { name: seNames, volume: 60, pitch: randomPitch, pan: 0 };
        AudioManager.playSe(se);
        
        let id = this.index;
        let weaponScale = $gameParty.leader().pdr;
        let time = 180;
        if ($gameParty.leader().hasSkill(41)) {
            time += 90;
        }
        
        var bullet = QJ.MPMZ.Shoot({
            groupName: ['playerBullet'],
            collisionBox: ['C', 20],
            img: "weapon/weaponBullet80",
            moveType: ['S', 9],
            position: [['B', id], ['B', id]],
            initialRotation: ['PD'],
            imgRotation: ['R', 36, true],
            scale: weaponScale,
            //trailEffect: TrailEffect,
			afterImage:['#43db22','0|1~10/0',10,'0|10~10/0'],
            existData: [
                { t: ['Time', time] },
                { t: ['NP'], rb: [1, false, true] },
                {
                    t: ['G', ['"enemy"', '"object"']],
                    a: ['F', QJ.MPMZ.tl.ex_toEnemyAttack, [
                        weaponDamage,
                        {
                            noHitEffect: true,
                            noDurLoss: true,
                            specifyAddedStatus: true,
                            addedStatusType: 0
                        }
                    ]]
                }
            ]
        });
        
        // 追踪效果：如果拥有技能 41，则添加追踪效果数据
        if ($gameParty.leader().hasSkill(41)) {
            bullet.addMoveData("F", [10, 10, QJ.MPMZ.tl.ex_projectileTrackingEffect]);
        }
        return true;
    }

    // 旋风斩蓄力中时点
    if (type === "senpuuGiri") {
        // 检查旋转数据是否满足要求
        if (this.data.imgRotation[1].get() < 9) return;
	    // 发射弹幕消耗耐久度
        if ($gameParty.leader().equips()[0]) {
	        $gameParty.leader().equips()[0].durability -= 3;
        }
        let baseValue = 300;
        let luk = $gameParty.leader().luk;
        luk = Math.max(0, Math.min(600, luk));
        let adjustedValue = baseValue + (luk / 600) * 700;
        if (subBullet) adjustedValue *= 0.5; 
        if (Math.randomInt(1001) > adjustedValue) return;

        let seNames = "Wind7";
        let randomPitch = Math.randomInt(40) + 81;
        let se = { name: seNames, volume: 60, pitch: randomPitch, pan: 0 };
        AudioManager.playSe(se);

        let id = this.index;
        let weaponScale = $gameParty.leader().pdr;
        let time = 180;
        if ($gameParty.leader().hasSkill(41)) {
            time += 90;
        }

        var bullet = QJ.MPMZ.Shoot({
            groupName: ['playerBullet'],
            collisionBox: ['C', 20],
            img: "weapon/weaponBullet80",
            moveType: ['S', 9],
            position: [['B', id], ['B', id]],
            initialRotation: ['S', Math.randomInt(360)],
            imgRotation: ['R', 36, true],
            scale: weaponScale,
			afterImage:['#43db22','0|1~10/0',10,'0|10~10/0'],
            //trailEffect: TrailEffect,
            existData: [
                { t: ['Time', time] },
                { t: ['NP'], rb: [1, false, true] },
                {
                    t: ['G', ['"enemy"', '"object"']],
                    a: ['F', QJ.MPMZ.tl.ex_toEnemyAttack, [
                        weaponDamage,
                        {
                            noHitEffect: true,
                            noDurLoss: true,
                            specifyAddedStatus: true,
                            addedStatusType: 0
                        }
                    ]]
                }
            ]
        });

        // 追踪效果
        if ($gameParty.leader().hasSkill(41)) {
            bullet.addMoveData("F", [10, 10, QJ.MPMZ.tl.ex_projectileTrackingEffect]);
        }
        return true;
    }

    // 旋风斩投掷后（蓄力后或投掷后）
    if (type === "senpuuGiriHold" || type === "senpuuGiriThrow") {
        let baseValue = 300;
        let luk = $gameParty.leader().luk;
        luk = Math.max(0, Math.min(600, luk));
        let adjustedValue = baseValue + (luk / 600) * 700;
        if (Math.randomInt(1001) > adjustedValue) return;

	    // 发射弹幕消耗耐久度
        if ($gameParty.leader().equips()[0]) {
	        $gameParty.leader().equips()[0].durability -= 3;
        }

        let seNames = "Wind7";
        let randomPitch = Math.randomInt(40) + 81;
        let se = { name: seNames, volume: 60, pitch: randomPitch, pan: 0 };
        AudioManager.playSe(se);

        let posX = this.inheritX();
        let posY = this.inheritY();
        let weaponScale = $gameParty.leader().pdr;
        let time = 180;
        if ($gameParty.leader().hasSkill(41)) {
            time += 90;
        }

        var bullet = QJ.MPMZ.Shoot({
            groupName: ['playerBullet'],
            collisionBox: ['C', 20],
            img: "weapon/weaponBullet80",
            moveType: ['S', 9],
            position: [['S', posX], ['S', posY]],
            initialRotation: ['S', Math.randomInt(360)],
            imgRotation: ['R', 36, true],
            scale: weaponScale,
			afterImage:['#43db22','0|1~10/0',10,'0|10~10/0'],
            //trailEffect: TrailEffect,
            existData: [
                { t: ['Time', time] },
                { t: ['NP'], rb: [1, false, true] },
                {
                    t: ['G', ['"enemy"', '"object"']],
                    a: ['F', QJ.MPMZ.tl.ex_toEnemyAttack, [
                        weaponDamage,
                        {
                            noHitEffect: true,
                            noDurLoss: true,
                            specifyAddedStatus: true,
                            addedStatusType: 0
                        }
                    ]]
                }
            ]
        });

        // 追踪效果
        if ($gameParty.leader().hasSkill(41)) {
            bullet.addMoveData("F", [10, 10, QJ.MPMZ.tl.ex_projectileTrackingEffect]);
        }
        return true;
    }
};


//香蕉大剑：香蕉榴弹炮
QJ.MPMZ.tl.ex_activateBananaGrenade = function(type) {
	
  if(!type) return;	
  if (type === "senpuuGiri" && Math.random() > 0.5) {	
  
     if ( this.data.img.includes("alt") ) return;  
     if ($gameParty.leader().equips()[0]) {
		 $gameParty.leader().equips()[0].durability -= 300;
	 }
     var seNames = "Explosion1" ;
     var se = { name: seNames, volume: 80, pitch: 150, pan: 0 };
     AudioManager.playSe(se);  
	 this.changeAttribute("img","weapon/weapon60_alt");
	 QJ.MPMZ.deleteProjectile('senpuuGiriTrail');
	 
     let posX = this.inheritX();
     let posY = this.inheritY();
     let angle = this.inheritRotation();	 
     var weaponScale = this.scaleX;
     QJ.MPMZ.Shoot({
		groupName:['playerBullet','bananaGrenade'],
        img:"weapon/weaponTrail60_alt",
        position:[['S',posX],['S',posY]],
        initialRotation:['M'],
		imgRotation:['F',180],
        scale:weaponScale,
        anchor:[0.5,0.5],
        existData:[
           // {t:['R',[255]],a:['F',QJ.MPMZ.tl.ex_senpuuGiriHold]},	
			{t:['G',['"enemy"','"object"']],a:['F',QJ.MPMZ.tl.ex_bananaGrenadeExplosive]},					
        ],
		moveType:['S',7],
		moveF:[
		],
        z:"E",
		collisionBox:['R',8,64],
		judgeAccuracyMove:8,
    });	 
  }
  
};

//香蕉榴弹炮爆炸
QJ.MPMZ.tl.ex_bananaGrenadeExplosive = function() {
	
	let posX = this.inheritX(); 
    let posY = this.inheritY();
	
     var se = { name: "Explosion2", volume: 60, pitch: 100, pan: 0 };
     AudioManager.playSe(se);
	
    QJ.MPMZ.Shoot({
		groupName: ['JackBomb'],
        img:'MGC_W2_Explosion_V4_Lv1[5,10,2]',
        position:[['S',posX],['S',posY]],
		scale:[3,3],
        initialRotation:['S',0],
        imgRotation:['F'],
		collisionBox:['C',60],
		opacity:1,
        moveType:['S',0],
        blendMode:1,
        existData:[	
		{t:['Time',98]},
		{t:['P'],a:['F',QJ.MPMZ.tl.ex_JackBombExplode,[1]],p:[-1,true,true],c:['S','this.time > 16 && this.time < 24']},
		{t:['G',['"enemy"','"object"']],a:['F',QJ.MPMZ.tl.ex_JackBombExplode,[1]],p:[-1,true,true],c:['S','this.time > 16 && this.time < 24']},
        ],       
    });
	
};

//臭鱼骨-恶臭
QJ.MPMZ.tl.ex_stenchWeaponEffect = function() {
	
	if ($gameMap.getGroupBulletListQJ('stenchWeapon').length > 0) return;
      QJ.MPMZ.Shoot({
        img:"Absorb0002[5,4,4]",
		groupName: ['stenchWeapon'],
        position:[['P'],['P']],
        initialRotation:['S',0],
        imgRotation:['F'],
        scale:2,
        opacity:0.6,
        moveType:['D',true],
        collisionBox:['C',24],
        blendMode:0,
        existData:[
		  {t:['S','$gameActors.actor(1).equips()[0] && $gameActors.actor(1).equips()[0].baseItemId == 13',false],d:[1,30,0.1]},
          {t:['G',['"enemy"','"NPC"']],a:[],p:[-1,true,true,QJ.MPMZ.tl.ex_enemyInFear],d:['T',15,15,true]}	
        ],
		moveJS:[
		  [60,60,`let chance = 0.06;
		          let actor = $gameParty.leader();
		          chance *= actor.stateRate(5);
				  let condition = $gameMessage.isBusy();
				  if (chance > Math.random() && !condition) {
					 QJ.MPMZ.tl.ex_playerPoison(1);
				  }
				  if (!actor.isStateAffected(60)) {
					   actor.addState(60);
				  }`]
		],
        z:"W"
    });
};

//远程剑气斩击
QJ.MPMZ.tl.ex_swordEnergyAttack = function(rate,randomAngle) {

	if(!rate) var rate = 0.75;
	let weaponDamage = 10 + Math.round( rate * chahuiUtil.getVarianceDamage(1) * 0.6 );
	rate = "0|0~10/" + rate + "~999/" + rate;
	rate = [rate,rate];
	let posX = this.inheritX(); 
    let posY = this.inheritY();	
	let rotation;

    if (randomAngle && typeof randomAngle === 'number' ) {
		if (randomAngle == 1) {
		rotation = ['M'];
        if (Utils.isMobileDevice()) rotation = ['S',"Input._pressAngle['ok']?Input._pressAngle['ok']:0"];		
	   } else if (randomAngle == 2) {
		rotation = ['S',Math.randomInt(360)];
	  }
	} else {
		rotation = ['PD'];
	}
	
    var swordEnergy = QJ.MPMZ.Shoot({
        img:"swordEnergyAttack",
		groupName: ['playerBullet'],
        position:[['S',posX],['S',posY]],
        initialRotation:rotation,
        imgRotation:['F'],
        scale:rate,
        moveType:['S','0|0~10/10~360/16~999|16'],
		opacity:0.75,
		collisionBox:['R',192,8],
		anchor:[0.5,0.65],
        existData:[
		  {t:['R',[255]]},
          {t:['Time',120]},
          {t:['G',['"enemy"','"object"']],a:['F',QJ.MPMZ.tl.ex_toEnemyAttack,[weaponDamage,{}]],p:[4,false,true]},		  
        ],
    });
	
		//追踪效果
	if ($gameParty.leader().hasSkill(41)) {
		swordEnergy.addMoveData("F",[10,10,QJ.MPMZ.tl.ex_projectileTrackingEffect]);
	}
	 let random = 80 + Math.randomInt(40);
     let se = { name: "剣で斬る2", volume: 70, pitch: random, pan: 0 };
     AudioManager.playSe(se);
	
};

// 忍者系技能-天诛触发检查
QJ.MPMZ.tl.ex_skillTenchuuCheck = function() {
	$gamePlayer.drill_EASe_stopAct();
	$gamePlayer.drill_EASe_setSimpleStateNode( ["技能动作1"] );
	QJ.MPMZ.Shoot({
		groupName:['tenchuuCheck'],
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
            {t:['Time',60],a:['F',QJ.MPMZ.tl.ex_skillTenchuu,[{result:"fail"}]]},
			{t:['G',['"enemy"']],a:['F',QJ.MPMZ.tl.ex_skillTenchuu,[{result:"succeed"}]],c:['S','this.time > 30']},
        ],
		collisionBox:['C',24],
    });
	
    //$gameScreen._particle.particleClear('warp')
};

// 忍者系技能-天诛
QJ.MPMZ.tl.ex_skillTenchuu = function(extraData,args) {
	
	if (extraData.result && extraData.result == "fail") {
		$gameScreen._particle.particleSet(0,'warp','player','warp_hole_c');
	}
	
	
	 if (args && args.target && args.target instanceof Game_Event) {
		 
		 if (extraData.result && extraData.result == "succeed") {
			$gameScreen._particle.particleSet(0,'warp','player','warp_hole_c');
	QJ.MPMZ.Shoot({
		groupName:['tenchuuCheck'],
        img:"null1",
        moveType:['S',0],
		moveJS:[
		     [20,999,"$gameScreen._particle.particleClear('warp');$gamePlayer.drill_EFOE_playHidingVerticalFlat( 10,2, false );"]
		],
        existData:[
            {t:['Time',40],a:['F',QJ.MPMZ.tl.ex_skillTenchuuTeleportation,[args.target]]},
        ],
      });			

		 }
		 
	 }
};

// 忍者系技能-天诛瞬移
QJ.MPMZ.tl.ex_skillTenchuuTeleportation = function(target) {
	
	        if (!target) return;
            var direction = target.direction();
			var posX = target.centerRealX();
			var posY = target.centerRealY();
			
	        switch (direction) {
              case 2: // 下
              posY -= 1; 
              break;
              case 4: // 左
              posX += 1;     
              break;
              case 6: // 右
              posX -= 1;        
              break;
              case 8: // 上
              posY += 1;      
              break;
           }		
			 $gamePlayer.locate(posX, posY);	
			 $gamePlayer.startOpacity(20, 255);
			 $gameScreen._particle.particleGroupSet(0,'weapon_b6','player');
			 $gamePlayer.drill_EASA_setEnabled( true );
	
};

// 古树残骸生长效果
QJ.MPMZ.tl.ex_AncientTreeRemnantEffect = function(enemy) {
	    
		if (!$gameParty.leader().equips()[0]) return;
	
	    let weapon = $gameParty.leader().equips()[0];
		let durMax = weapon.durMax;
		
		if (enemy) {
		  let MHP = $gameSelfVariables.value([$gameMap.mapId(), enemy._eventId, 'MHP']);		  
		  let heal = Math.floor(durMax * 0.01);	
              heal += MHP;			  
		      weapon.durability += heal;	
			  weapon.durability = Math.min(weapon.durability, 114514);
		}	
		
        let durability = weapon.durability;
		let durRate = Math.floor(100 * (durability / durMax));
		
		if (durRate > 100) {
		let bonus = durRate - 100;
		    weapon.flatParams[2] = bonus;
		}
		
};

// 普通攻击燕返
QJ.MPMZ.tl.meleeAttackTsubameGaeshi = function(initialize) {
	
	if(!$gameParty.leader().equips()[0]) return;

    var weaponImage = "weapon/weapon" + $gameParty.leader().equips()[0].baseItemId;
    var weaponScale = $gameParty.leader().pdr;
	var weaponDamage = chahuiUtil.getVarianceDamage(1);
	var collisionBox = ['R',8,64];
	var	specifyAddedStatus = undefined;
    var addedStatusType = undefined;
    var addedStatusChance = undefined;
	var	addedStatusDamage = undefined;	
	var	noDurLoss = undefined;
    var noHitEffect	= undefined;
	// 胁差二刀流
	if (initialize && initialize === "wakizashi") {
	    weaponImage = "weapon/weapon30";
		weaponScale = 0.75;
		weaponDamage = 16;
		specifyAddedStatus = "true";
        addedStatusType = 6;
        addedStatusChance = 2400;
		addedStatusDamage = 6;
		noHitEffect = true;
	}
	// 剑术修行加成
    if ( $gameParty.leader().hasSkill(26) ) {
        weaponDamage *= (100 + (1.8**$gameActors.actor(1).skillMasteryLevel(26))) / 100;
	}
    let level = $gameParty.leader().skillMasteryLevel(26);
	var rotation,angle,time,trailRotation,skillTime,zz;
	
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
	
	if ($gameSwitches.value(17)) {
	rotation = -135;
	trailRotation = -90;
	scaleXY = [-weaponScale,weaponScale];
	var Anchor = [1,1];
	} else {
	rotation = 135;	
	trailRotation = 90;
	angle = -angle; 
	scaleXY = [weaponScale,weaponScale];
	var Anchor = [1,1];
	}
	
    if ($gameParty.leader().hasSkill(55)) {
		zz = "MF_BR";
	} else {
		zz = "MF_BG";
	}
	
	// 展示武器演出
    QJ.MPMZ.Shoot({
        img:weaponImage,
		groupName:['meleeAttack','playerSkill'],
        position:[['P'],['P']],
        initialRotation:['PD',rotation],
        scale:scaleXY,
		opacity:0.25,
		hue:180,
        moveType:['D',true],
        imgRotation:['R',angle,true],
        anchor:Anchor,
        existData:[
            {t:['Time',time],d:[0,10]}           
        ],
        z:zz,
		collisionBox:['C',1],
    });	
	// 实际武器碰撞体判定
   var realBullet = QJ.MPMZ.Shoot({
		groupName:['meleeAttack','playerSkill'],
        img:weaponImage,
        position:[['P'],['P']],
        initialRotation:['PD',trailRotation],
        scale:[weaponScale,weaponScale],
        moveType:['D',true],
		opacity:0,
        imgRotation:['R',angle,true],
        anchor:[0.5,0.95],
        existData:[
            {t:['Time',time]},
            {t:['G',['"enemy"','"object"']],a:['F',QJ.MPMZ.tl.ex_toEnemyAttack,[Math.floor(weaponDamage),{noHitEffect:noHitEffect,noDurLoss:noDurLoss,extraAttack:true,weaponAttack:true,specifyAddedStatus:specifyAddedStatus,addedStatusType:addedStatusType,addedStatusChance:addedStatusChance,addedStatusDamage:addedStatusDamage}]],p:[-1,false,true]},
			{t:['B','enemyBullet'],p:[-1,false,true,QJ.MPMZ.tl.ex_weaponParry]}
        ],
		collisionBox:collisionBox,
        judgeAccuracyRotation:5,				
    });	
	
};

//旋风斩燕返
QJ.MPMZ.tl.ex_senpuuGiriTsubameGaeshi = function(GamepadsAttack) {
	
	if(!$gameParty.leader().equips()[0]) return;
		
    var weaponImage = "weapon/weapon" + $gameParty.leader().equips()[0].baseItemId;
    var weaponScale = $gameParty.leader().pdr;
	
    var senpuuGiri = QJ.MPMZ.Shoot({
		groupName:['playerSkill','senpuuGiri'],
        img:weaponImage,
        position:[['P'],['P']],
        initialRotation:['S',-225],
        scale:[-weaponScale,weaponScale],//动态缩放
        moveType:['D',false],
		opacity:0.25,
		hue:180,
        imgRotation:['R','64|5.625~56|6.428~48|7.5~40|9~32|11.25~99999|15',true],//剑的旋转，速度是动态的
        anchor:[1.05,1.05],
        existData:[
		    {t:['S','$gameParty.leader().equips()[0]&&$gameParty.leader().equips()[0].baseItemId==4',true]},
			{t:['S','Fuku_Plugins.EventTremble.getRemainingCycles(-1) === 0',false]},	
            {t:['S','$gameMap.regionId( Math.floor($gamePlayer.centerRealX()), Math.floor($gamePlayer.centerRealY()) ) === 8',true]},				
        ],
        z:"MF_BG",
		collisionBox:['C',1],
    });
	
	QJ.MPMZ.tl.ex_senpuuGiriTrail.call(senpuuGiri);
		//读取操作模式
    if (GamepadsAttack) {
		var AnyPadReleased = "Input.drill_isPadPressed('右摇杆上')||Input.drill_isPadPressed('右摇杆下')||Input.drill_isPadPressed('右摇杆左')||Input.drill_isPadPressed('右摇杆右')";
		senpuuGiri.addExistData({t:['S',AnyPadReleased,false]});
	} else {
		senpuuGiri.addExistData({t:['S','!TouchInput.drill_isRightPressed()||!$gameParty.leader().equips()[0]',true]});
	}
	
		//柳叶剑特效
	if ($gameParty.leader().equips()[0].baseItemId === 80) {
		senpuuGiri.addMoveData("F",[10,10,QJ.MPMZ.tl.ex_willowLeafEffects,["senpuuGiri"]]);
	}
	//斩裂剑-斩剑波
	if ($gameParty.leader().hasSkill(44)) {
		senpuuGiri.addMoveData("JS",[64,99999,'QJ.MPMZ.tl.ex_swordEnergyAttack.call(this, undefined, 1)']);
		senpuuGiri.addMoveData("JS",[120,99999,'QJ.MPMZ.tl.ex_swordEnergyAttack.call(this, undefined, 1)']);
		senpuuGiri.addMoveData("JS",[168,99999,'QJ.MPMZ.tl.ex_swordEnergyAttack.call(this, undefined, 1)']);
		senpuuGiri.addMoveData("JS",[208,99999,'QJ.MPMZ.tl.ex_swordEnergyAttack.call(this, undefined, 1)']);
		senpuuGiri.addMoveData("JS",[240,24,'QJ.MPMZ.tl.ex_swordEnergyAttack.call(this, undefined, 1)']);
	}		
};

//旋风斩燕返判定
QJ.MPMZ.tl.ex_senpuuGiriTsubameGaeshiTrail = function() {
	
    var weaponImage = "weapon/weaponTrail" + $gameParty.leader().equips()[0].baseItemId;
    var weaponScale = $gameParty.leader().pdr;
	var weaponDamage = chahuiUtil.getVarianceDamage(1);

	// 安卓版刀光会报错
	let TrailEffect = [];

    if (!Utils.isMobileDevice()) {
        TrailEffect = [{
            img:['L',0.5,1,0,0.999999999,0.2,0,0,0],
            existTime:0,
			blendMode:1,
			alpha:Talpha,
            disappearTime:20,
            imgStretchMode:0,
			ifProjctileWait:true,
            hOrV:true,
        }];
    }
	
    QJ.MPMZ.Shoot({
		groupName:['playerSkill','senpuuGiriTrail'],
        img:weaponImage,
        position:[['P'],['P']],
        initialRotation:['S',-180],
        scale:weaponScale,//动态缩放
        moveType:['B',-1,0,0,0,0,0,0,0,0],
		opacity:0,
        imgRotation:['R','64|5.625~56|6.428~48|7.5~40|9~32|11.25~99999|15',true],//剑的旋转，速度是动态的
        anchor:[0.5,1],
        existData:[
			//{t:['G',['"enemy"','"object"']],a:['C',155,[weaponDamage,0,0,0]],p:[-1,true,true]},
			{t:['G',['"enemy"','"object"']],a:['F',QJ.MPMZ.tl.ex_toEnemyAttack,[weaponDamage,{extraAttack:true, weaponAttack:true}]],p:[-1,false,true]},
            {t:['BE',this.index]},      
            {t:['B','enemyBullet'],p:[-1,false,true,QJ.MPMZ.tl.ex_weaponParry]}			
        ],
        z:"E",
		collisionBox:['R',8,64],
        judgeAccuracyRotation:10,
        trailEffect:TrailEffect,
    });
};

// 旋风斩-回旋镖效果
QJ.MPMZ.tl.ex_senpuuGiriReturnToPlayer = function(args) {
	
    let posX = this.inheritX();
    let posY = this.inheritY();
	let angle = this.inheritRotation();
	let zz,Talpha;	
    let weaponImage = "weapon/weaponTrail" + $gameParty.leader().equips()[0].baseItemId;
    let weaponScale = this.scaleX;
	let weaponDamage = Math.round(0.5 * chahuiUtil.getVarianceDamage(1));	
	if ($gameParty.leader().hasSkill(38)) {
		weaponDamage = Math.floor(1.5 * weaponDamage);
	}
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
            img:['L',0.5,1,0,0.999999999,0.4,0,0,0],
            existTime:0,
			blendMode:1,
			alpha:Talpha,
            disappearTime:10,
            imgStretchMode:0,
            hOrV:true
        }];
    }
    
    let senpuuGiri = QJ.MPMZ.Shoot({
		groupName:['playerBullet','SenpuuGiri','weaponMarker'],
        img:weaponImage,
        position:[['S',posX],['S',posY]],
        initialRotation:['M'],
		imgRotation:['S',angle],
        scale:weaponScale,
        imgRotation:['R',45,true],
        anchor:[0.5,0.5],
        existData:[
            {t:['Time',600]},
			{t:['S',"!$gameParty.leader().equips()[0]",true]},
			{t:['P'],a:['S',"$gameMap.steupCEQJ(163,1,{rotation:8,removeStun:true})"],d:[1,30,1.2],cb:['C',2]},
			{t:['G',['"enemy"','"object"']],a:['F',QJ.MPMZ.tl.ex_toEnemyAttack,[weaponDamage,{weaponAttack:true}]],p:[-1,false,true]},
        ],
		moveType:['TP',8,12+Math.randomInt(36),12+Math.randomInt(36)],
        z:zz,
		collisionBox:['R',8,64],
        judgeAccuracyRotation:12,
		moveF:[
		],
        trailEffect:TrailEffect,
		deadJS:["AudioManager.fadeOutBgsByLine(1,9);$gameSwitches.setValue(182, false);"]
    });	
};

// 巨大蟹钳-夹住目标
QJ.MPMZ.tl.ex_giantCrabClawGrabsEnemy = function(args) {

  if (args && args.target && args.target instanceof Game_Event) {

    let weaponId = $gameParty.leader().equips()[0].id;
	$gameParty.leader().changeEquipById(1, 4);
    $gameMap.steupCEQJ(100,1,{equipChange:true,equipIndex:-1});
	let diffX = this.inheritX() - args.target.screenBoxXShowQJ();
	let diffY = this.inheritY() - args.target.screenBoxYShowQJ();
	
	let target = args.target._eventId;
    let posX = `if($gameMap.event(${target})){
                    $gameMap.event(${target}).screenBoxXShowQJ()+${diffX};
                } else {
                    $gameMap.displayX();
                }`;

    let posY = `if($gameMap.event(${target})){
                    $gameMap.event(${target}).screenBoxYShowQJ()+${diffY};
                } else {
                    $gameMap.displayX();
                }`;
    let angle = this.inheritRotation()+180;
    let weaponImage = "weapon/weaponTrail14";
    let weaponScale = this.scaleX;
	let damage = Math.abs($dataWeapons[weaponId].params[2] * weaponScale);

	QJ.MPMZ.Shoot({
		groupName:['playerBullet','giantCrabClaw'],
        img:weaponImage,
        position:[['S',posX],['S',posY]],
        initialRotation:['S',angle],
        scale:weaponScale,
        imgRotation:['F'],
		countDown:4,
        anchor:[0.5,0.75],
        existData:[
		    {t:['Time',7200],a:['F',QJ.MPMZ.tl.ex_giantCrabClawDrops,[weaponId]]},
			{t:['S',`$gameSelfSwitches.value([${$gameMap.mapId()}, ${target}, 'D'])||$gameMap.event(${target})`,true],a:['F',QJ.MPMZ.tl.ex_giantCrabClawDrops,[weaponId]]},
			{t:['S','this.data.countDown<=0',true],a:['F',QJ.MPMZ.tl.ex_giantCrabClawDrops,[weaponId]]},
			{t:['G',['"enemy"','"object"']],a:['S','this.data.countDown+=1'],p:[-1,false,true],c:['T',0,15,true]},
			{t:['G',['"enemy"','"object"']],a:['F',QJ.MPMZ.tl.ex_toEnemyAttack,[damage,{noHitEffect:true,noDurLoss:true,specifyAddedStatus:true,addedStatusType:0}]],p:[-1,false,true],c:['T',0,15,true]},
        ],
		moveType:['D',true],
        z:"W",
		collisionBox:['R',6,48],
		moveJS:[
		  [0,15,'this.data.countDown-=1']
		],

    });
	
	$gameParty.loseItem($dataWeapons[weaponId], 1);
  }
};

// 蟹钳松了，返还武器
QJ.MPMZ.tl.ex_giantCrabClawDrops = function(weaponId) {
	
    let weapon = $dataWeapons[weaponId];
	let dropX = this.x / 48;
	let dropY = this.y / 48;
    dingk.Loot.specifyPositionGetMapDrops(dropX,dropY,weapon);
};


// 剑刃风暴
QJ.MPMZ.tl.ex_skillBladestorm = function() {
	
   if (!this) return;
   let user;
   if (this instanceof Game_Player) {
	   user = -1;
   }
   if (this instanceof Game_Event) {
	   user = this._eventId;	   
   }    
   
   let posX = this.screenShootXQJ();
   let posY = this.screenShootYQJ();
   
   var damage = 15;
   
   var bladestorm = QJ.MPMZ.Shoot({
		groupName:['bladestorm'],
        img:"Magic/air_start[7,3]",
        position:[['S',posX],['S',posY]],
        initialRotation:['S',0],
        scale:1,
        imgRotation:['S',0],
        anchor:[0.4,0.7],
		opacity:0.6,
        existData:[
		    {t:['Time',180],a:['F',QJ.MPMZ.tl.ex_skillBladestormFinish]},
			{t:['R',[255]],a:['F',QJ.MPMZ.tl.ex_skillBladestormFinish],c:['S','this.time>22']},
			{t:['G',['"enemy"','"object"']],a:['F',QJ.MPMZ.tl.ex_toEnemyAttack,[damage,{noHitEffect:true,noDurLoss:true,specifyAddedStatus:true}]],p:[-1,false,true],c:['T',0,10,true]},
        ],
		moveType:['TP',4,2,10],
        z:"MF_UG",
		collisionBox:['R',20,48],
		moveJS:[
		  [20,9999,"this.changeAttribute('img','Magic/air_loop[6,3]')"]
		],
		moveF:[
		  [6,6,QJ.MPMZ.tl.ex_skillBladestormEffect]
		]
    });  
	
	if (user > 0) {
		bladestorm.addExistData();
	} else {
		bladestorm.addExistData({t:['G',['"enemy"','"object"']],a:['F',QJ.MPMZ.tl.ex_toEnemyAttack,[damage,{magicAttack:true,noHitEffect:true,noDurLoss:true,specifyAddedStatus:true}]],p:[-1,false,true],c:['T',0,10,true]});
	}
	
};

// 剑刃风暴的粒子效果
QJ.MPMZ.tl.ex_skillBladestormEffect = function() {
	
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
   
};

// 剑刃风暴结束
QJ.MPMZ.tl.ex_skillBladestormFinish = function() {
	
    let posX = this.inheritX();
    let posY = this.inheritY();
	let scale = this.scaleX;
   
 	QJ.MPMZ.Shoot({
		groupName:['bladestorm'],
        img:"Magic/air_dismiss[6,3]",
        position:[['S',posX],['S',posY]],
        initialRotation:['S',0],
        scale:scale,
        imgRotation:['F'],
        anchor:[0.5,0.5],
        existData:[
		    {t:['Time',17]},
        ],
		moveType:['S',0],
        z:"MF_UG",
		collisionBox:['C',10],
    }); 	
};


// 日轮：陨石术（直接召唤）
QJ.MPMZ.tl.ex_meteorStrike = function(posX, posY) {
     
   if (!posX && !posY) {
     function randPointInCircle(cx, cy, R) {
       const a = Math.random() * Math.PI * 2;   // 随机角度
       const r = Math.sqrt(Math.random()) * R;  // 半径要开方，保证均匀分布
       const x = Math.round(cx + r * Math.cos(a));
       const y = Math.round(cy + r * Math.sin(a));
       return { x, y };
     }
	 
	 const playerX = $gamePlayer.screenBoxXShowQJ();
	 const playerY = $gamePlayer.screenBoxYShowQJ();
     const p = randPointInCircle(playerX, playerY, 250);
     posX = p.x;
     posY = p.y;
   }
   var seNames = "Magic2";
   var randomPitch = Math.randomInt(40) + 61;
   var se = { name: seNames, volume: 70, pitch: randomPitch, pan: 0 };
   AudioManager.playSe(se);
   
   var chargeCounter = 200 + Math.randomInt(300);
   
   var baseSize = 0.2;
   var maxCorrection = 2.8;
   var correctionValue = (chargeCounter / 6000) * maxCorrection; 
   var extraSize = ($gameParty.leader().mdr - 1) * 0.25;     
   var finalSize = correctionValue + baseSize + extraSize;
   var magicScale = '0|0~60/' + baseSize + '~9999|' + baseSize;
   var circleName = "meteorStrikeCircle" + $gameMap.getGroupBulletListQJ('meteorStrikeCircle').length + 1;
   var moveType = ['S',0];
   
   if ($gameParty.leader().hasSkill(41)) {
       moveType = ['TG','"enemy"',0.5,2];
   }   
   
   var circle = QJ.MPMZ.Shoot({
        img:"MeteorStrikeCircle[5,15,2]",
		groupName:['meteorStrikeCircle','magic','Circle',circleName],
        position:[['S',posX],['S',posY]],
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
   var deadCode = `$gameMap.bulletQJ(${index}).setDead({t:['Time',0],d:[0,30]})`;
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
		    {t:['Time',600]},
		    {t:['BE',index]},
        ],
        z:"MF_UG",
		deadF:[[QJ.MPMZ.tl.ex_meteorStrikeBoom]],
		deadJS:[deadCode]		
    });

};


// 夜雾幻影
QJ.MPMZ.tl.ex_mistyNightPhantom = function(unchain) {

    QJ.MPMZ.deleteProjectile('MistyNightPhantom');
	$gamePlayer._opacity = 255;

    let actor = $gameParty.leader(); 	
    let equips = actor.equips(); 
	let count = 0;
       for (let index = 1; index < equips.length; index++) {
           let equip = equips[index];
           if (!equip) continue; // 跳过空装备
           if ( equip.baseItemId === 31 ) {
			count += 1;			
           }
	     }	 
	  // 卸除最后一个装备时，视为解除效果	 
	  if (count <= 0 && unchain) {
		  return;
	  }
	
	
	 let time = 400;
	 time -= 40 * count;
	 let reTime = time + 90;
	 // 结算状态显示的描述时长
	 let value = Math.round(time / 0.6) / 100;
	 $gameVariables.setValue(221, value);
	 
	 QJ.MPMZ.Shoot({
		groupName:['MistyNightPhantom'],
        position:[['P'],['P']],
		moveType:['D',true],
        existData:[	

        ],
		moveJS:[
		    [time, time, "$gamePlayer.startOpacity(60, 40);AudioManager.playSe({ name: 'Darkness3', volume: 50, pitch: 80, pan: 0 })"],
			[reTime, time, "$gamePlayer.startOpacity(60, 255)"],
		],
		deadJS:[]		
    });

	
};

// 连锁咒缚
QJ.MPMZ.tl.ex_chainSpellBinding = function(unchain, index) {

    let actor = $gameParty.leader(); 	
	// 解除装备效果
	if (unchain) {
    let equips = actor.equips(); 
	let count = 0;
       for (let index = 1; index < equips.length; index++) {
           let equip = equips[index];
           if (!equip) continue; // 跳过空装备
           if ( equip.baseItemId === 48 ) {
			count += 1;			
           }
	     }
	  // 卸除最后一个装备时，视为解除效果	 
	  if (count <= 1) {
		  QJ.MPMZ.deleteProjectile('spellBindingContract',{d:[0,30],a:['S',`let actor = $gameParty.leader();
		                                                                    let value = actor.xparamPlus(7);
																			value -= 0.01;
																			actor.setHrgPlus(value)`]});		
	  }
	  return;
    }	  
	
  // ---------- 契约模板 ----------
  const spawnLaserByIndex = (idx) => {
    QJ.MPMZ.Laser({
      imgPoint: 'null1',
      img: "Magic/Eletric A-Red[3,3,4]",
      groupName: ['spellBindingContract'],
      rotation: ['BT', idx],
      position: [['P'], ['P']],
      judgeWidth: 5,
      judgeMode: ['W', 5],
      blendMode: 1,
      scaleX: 0.5,
      opacity: 0.9,
      rotationStatic: false,
      positionStatic: false,
      positionSpread: 0,
      z: "E",
      length: ['D', ['P'], ['P'], ['B', idx], ['B', idx]],
      existData: [
        { t: ['BE', idx], a: ['S', "$gameParty.leader().addHrg(-0.01)"] },
      ]
    });
  };
  
  // ---------- 指定生成 ----------
  if (index && index > 0) { 
    const list = $gameMap.getGroupBulletListQJ('servant');
    let value = list.length * 0.01;
    actor.setHrgPlus(value); 
    spawnLaserByIndex(index);
    return;
  }

  if ($gameMap.getGroupBulletListQJ('spellBindingContract').length > 0) return;

  // ---------- 针对在场从者生成 ----------
  const list = $gameMap.getGroupBulletListQJ('servant');
  let value = list.length * 0.01;
  actor.setHrgPlus(value);
  for (let i = 0; i < list.length; i++) {
    spawnLaserByIndex(list[i]);
  }  
  
};	


// 站立回复体力
QJ.MPMZ.tl.ex_standHpRegen = function(initialize, regionId) {

    if (initialize && initialize === "start") {
	 QJ.MPMZ.Shoot({
		groupName:['standHpRegen'],
        position:[['P'],['P']],
		moveType:['D',true],
        existData:[	
		    { t: ["S", "$gameParty.leader().hasSkill(58)", false],a: ["S", "$gameParty.leader().removeState(90)"] }  
        ],
		moveF:[
		    [30, 30, QJ.MPMZ.tl.ex_standHpRegen, [undefined, 5]]			
		]		
     });
	}		
	
	let stand = !$gamePlayer.isMoved();
	let region = null;
	if (regionId) {
		region = $gameMap.regionId( Math.floor($gamePlayer.centerRealX()), Math.floor($gamePlayer.centerRealY()) ) !== regionId;
	}
	
	if (stand && !region) {
		$gameParty.leader().addState(90);
	} else {
		$gameParty.leader().removeState(90);
	}
	
};


// 宝石魔术-宝石攻击
QJ.MPMZ.tl.ex_gemMagicAttack = function(initialize, args) {
	
	if (initialize && initialize === "start") {

    const target = args && args.target;
    if (!(target instanceof Game_Event)) return;

	// 结算宝石属性
	let item = $dataItems[311];
	if ($gameParty.numItems(item) <= 0) return;
    
	let posX = $gamePlayer.screenBoxXShowQJ();
	let posY = $gamePlayer.screenBoxYShowQJ(); 
	let tarX = target.screenBoxXShowQJ();
	let tarY = target.screenBoxYShowQJ();
    let angle = QJ.calculateAngleByTwoPointAngle(posX, posY, tarX, tarY);
    // 播放随机 SE 音效
    let randomSeArray = ["Ice4","Ice5","Ice6","Ice7","Ice8"];
    let randomSe = randomSeArray[Math.floor(Math.random() * randomSeArray.length)];
    let randomPitch = 100 + Math.randomInt(50);
    AudioManager.playSe({ name: randomSe, volume: 45, pitch: randomPitch, pan: 0 });

	let damage = Math.round(item.price / 10);
	damage = QJ.MPMZ.tl.randIntByRatio(damage);
            QJ.MPMZ.Shoot({
               img:['I', 605],
			   initialRotation:['S',angle],
               afterImage:['#34c2fc','0|1~16/0',16,4],
               moveType:['S','0|12~30/8~999|8'],
               position:[['P'],['P']],
			   imgRotation:['F'],
			   gem: item.id,
			   scale:0.25,
			   collisionBox: ['C', 12],
               existData:[
                  {t:['Time',180],d:[1,20,0.1]},
                  {t:['G',['"enemy"','"object"']],a:['F',QJ.MPMZ.tl.ex_toEnemyAttack,[damage,{magicAttack:true,noHitEffect:true,noDurLoss:true,specifyAddedStatus:true}]]}
               ],
			   deadF:[
			      [QJ.MPMZ.tl.ex_gemMagicAttack,["broken"]]
			   ]
            });
	 return;		
	}			

   if (initialize && initialize === "broken") {
	   this.changeAttribute("opacity",0);	
       let posX = this.inheritX();
       let posY = this.inheritY();
	   let itemId = this.data.gem;
	// 武器碎片破损粒子演出
    QJ.MPMZ.Shoot({
        initialRotation: 90,
        existData: [
            { t: ['Time', 3] }
        ],
        moveType: ['S', 0],
        position: [['S', posX],['S', posY]],
        particles: [
            {
                img: "weapon/gem311[8]",
                intervalTime: 1,
                bundleNumber: 5,
                synScale: true,
                offsetMin: [-2, 0, -10],
                offsetMax: [0, 2, 10],
                existTime: 60,
                disappearTime: 20,
                disappearScale: 0.5,
                scaleXMin: 0.5,
                scaleXMax: 0.5,
                moveType: [
                    '(()=>{let a = this.remA = this.remA ? this.remA : (Math.random()*3-1.5);return a*t;})()',
                    '(()=>{let a = t<30?t:(30+(t-30)/2);return 8/60*a*(60-a);})()'
                ]
            }
        ]
    });
    // 失去宝石
	let item = $dataItems[itemId];
    $gameParty.loseItem(item, 1);
	$gameSystem._drill_GFTH_styleId = 4;
	let context = "\\fs[22]\\ii[" + itemId + "]";
	if (ConfigManager.language > 1) context = "\\fs[18]\\ii[" + itemId + "]";
	$gameTemp.drill_GFTH_pushNewText( context );      
  }
   
};

//旋风斩派生-穿刺击退
QJ.MPMZ.tl.ex_spiralThrust = function(weaponDamage, initialize, args) { 

  const target = args && args.target;
  if (!(target instanceof Game_Event)) return;
  
	  let fudou = $gameSelfVariables.value([$gameMap.mapId(), target.eventId(), 'fudou']);
	  this._coolDown = this._coolDown || 0;
	  if (this._coolDown > 0) {
	     this._coolDown -= 1;
	  }	else {
		 QJ.MPMZ.tl.ex_toEnemyAttack.call(this, weaponDamage,{weaponAttack:true}, args);
		 this._coolDown = 20;
	  }
	  if (fudou > 90) return;
	  
	  if (initialize && initialize === "fixed") {
	     this._orgX = this._orgX || target._x;
	     this._orgY = this._orgY || target._y;
         target.locate(this._orgX, this._orgY);	
         return;		 
	  }
	  
	  this._disX = this._disX || this.x;
	  this._disY = this._disY || this.y;
	  
	  let disX = this.x - this._disX;
	  let disY = this.y - this._disY;	  
	  let posX = target._x + (disX / 55);
	  let posY = target._y + (disY / 55);
	  target.locate(posX, posY);
      this._disX = this.x;
	  this._disY = this.y;

};

//旋风斩派生-钉在墙上
QJ.MPMZ.tl.ex_senpuuGiriWallPinned = function(chargeTime,args) {
	
	if(!$gameParty.leader().equips()[0]) {
	AudioManager.fadeOutBgsByLine(1,9);
	$gameSwitches.setValue(182, false);	
	return;
	}
	
    let posX = this.inheritX();
    let posY = this.inheritY();
    let angle = this.inheritRotation();
	let zz,Talpha;
    let weaponImage = "weapon/weaponTrail" + $gameParty.leader().equips()[0].baseItemId;
    let weaponScale = this.scaleX;
	let weaponDamage = Math.round(0.5 * chahuiUtil.getVarianceDamage(1));
  	
	if ($gameParty.leader().hasSkill(38)) {
		weaponDamage = Math.floor(1.5 * weaponDamage);
	}
	let time = 60;
	if (chargeTime && chargeTime > 30) {
	    time += Math.min(Math.round(chargeTime/6),210);
	}
	$gameSwitches.setValue(182, true);
	// 克里乌之光
    if ($gameParty.leader().hasSkill(55)) {
		zz = "MF_BR";
		Talpha = 0.1;
	} else {
		zz = "E";
		Talpha = 0.75;
	}	
	
    var senpuuGiriWallPinned = QJ.MPMZ.Shoot({
		groupName:['playerBullet','SenpuuGiri','weaponMarker'],
        img:weaponImage,
        position:[['S',posX],['S',posY]],
        initialRotation:['S',angle],
		imgRotation:['F',180],
        scale:weaponScale,
        anchor:[0.5,0.5],
        existData:[
            {t:['Time',time]},
			{t:['S',"!$gameParty.leader().equips()[0] || $gameParty.leader().equips()[0].baseItemId == 4",true]},
			{t:['G',['"enemy"','"object"']],a:['F',QJ.MPMZ.tl.ex_toEnemyAttack,[weaponDamage,{weaponAttack:true}]],p:[-1,false,true]},
			{t:['G',['"enemy"','"object"']],a:['F',QJ.MPMZ.tl.ex_spiralThrust,[weaponDamage,"fixed"]],p:[-1,true,true],c:['T',0,0,true]}
        ],
		moveType:['S',0],
        z:zz,
		collisionBox:['R',8,64],
        judgeAccuracyRotation:12,
		moveF:[
		],
		deadJS:["$gameSwitches.setValue(182, false)"]
    });

	//柳叶剑特效
	if ($gameParty.leader().equips()[0].baseItemId === 80) {
		senpuuGiriHold.addMoveData("F",[5,5,QJ.MPMZ.tl.ex_willowLeafEffects,["senpuuGiriHold"]]);
	}
	
};



// 玩家通过铁砧修复武器/打铁
QJ.MPMZ.tl.playerRepairWeaponWithAnvil = function(initialize) {
	
   // 刷新武器温度和锻造情况
   if (initialize && initialize === "refresh") { 
       this._residualHeat = this._residualHeat || 0;
	   let durMax = this.data.durMax;
	   let ratio = this._residualHeat / durMax;
	   let Heat = 0;
	   if (ratio > 0) {
		   Heat = Math.round(ratio * 255);
		   Heat = Math.min(255, Heat);
		   this._residualHeat -= 8;
		   if (ratio > 0.8)  this._residualHeat -= 14;
		   if (ratio > 0.4)  this._residualHeat -= 10;
		   this._residualHeat = Math.max(0, this._residualHeat);
	   }
	   if (Heat <= 0) return;
	   this.changeAttribute('tone', [Heat, 0, 0, 0]);
	   // 温度恢复、结束过热效果
       if (ratio < 0.8 && this._smoke) {
           this._smoke = false;
		   $gameScreen._particle.reservePluginCommand(20,{},['clear', 'smoke_c-A'],0);
		   AudioManager.playSe({ name: "シューという火が消える時のSE", volume: 60, pitch: 100, pan: 0 });
	   }		   
	   return;
   }
   // 敲打武器的演出
   if (initialize && initialize === "repair") {
       AudioManager.playSe({name: "Hammer",volume: 65,pitch: Math.randomInt(100) + 50,pan: 0});
	   let actor = $gameParty.leader();
  	   let eid = this.data.eid;
	   let wid = this.data.weapon;
	   let index = Math.randomInt(9999);
	   let tag = "tag:event" + index;
	   let xx = -5 + Math.randomInt(10);
       let yy = -30 + Math.randomInt(10);
       $gameScreen._particle.particleGroupSet(eid, `smithHit_cp-${index}`, `event:${eid}`, tag, "smithHit_cp");      
       setTimeout(() => $gameScreen._particle.pluginCommand(null, ['update', tag, 'pos', String(xx), String(yy)], eid), 20);
	   //let distance = 1 + Math.randomInt(2);
	   //this.addTimelineEffect('S',[Math.randomInt(360),distance,4]); 
       this._residualHeat = this._residualHeat || 0;
	   let damage = chahuiUtil.getVarianceDamage(1);
	   if (actor.hasSkill(45)) {
	     let ratio = actor.skillMasteryLevel(45) / 100;
         let extra = Math.round(ratio * chahuiUtil.getVarianceDamage(2));
         damage += extra;		 
	   }
	   this._residualHeat += damage;
	   const dx2 = 15 - Math.randomInt(30);
	   const durMax = this.data.durMax;
	   SimpleMapDamageQJ.put(1, eid, damage, dx2, -68);
	   // 武器过热-失去打磨效果
	   if (this._residualHeat >= durMax && !this._smoke) {
		 $gameScreen._particle.particleSet(0,'smoke_c-A',`event:${eid}`,'smoke_c');	
         $gameScreen._particle.particleUpdate(['smoke_c-A','pos',0,-40]);
		 AudioManager.playSe({ name: "Fire2", volume: 60, pitch: 100, pan: 0 });
         this._smoke = true;		 
	   }
	   // 获得耐久度奖励	   
	   if (!this._smoke) {
		 let ratio = this._residualHeat / durMax;   
		 let dur = Math.randomInt(3);
		 if (ratio > 0.8) dur += Math.randomInt(5);
		 if (ratio > 0.4) dur += Math.randomInt(5);
		 if (dur > 0) {
			if ($dataWeapons[wid].durability >= durMax)  return;
		    $dataWeapons[wid].durability += dur;
			let heal = "+" + dur;
			let index = this.index;
            QJ.MPMZ.Shoot({
                img: ['T', heal, 0, '#06ff00', 12],
                position: [['B',index], ['B',index]],
                initialRotation: ['S', 0],
                imgRotation: ['F'],
                opacity: '0|1~90/0',
                moveType: ['S', '0|1~90/0.1~999/0.1'],
                existData: [{ t: ['Time', 90] }]
            });			
		 }
	   }	   
	   return;
   }
   // 召唤铁砧
   if (initialize && initialize === "summon") {
	   
     let failed = false;
	 let weapon = $gameParty.leader().equips()[0];
     let wtype  = weapon.wtypeId;	 
	 // 无法修理魔法武器和美食武器
	 if (wtype >= 4)  failed = true;
	 if ($gameParty.leader().hasSkill(81))  failed = true;
	 if (weapon.traits && weapon.traits[0].dataId === 2 )  failed = true;
	 // 可能遇到的锻造锤问题
	 if (weapon.baseItemId && weapon.baseItemId === 22 )  failed = true;
	 // 无法修理史诗武器
	 if (weapon?.meta?.颜色 == "13")  failed = true;
	 
	 if (failed) {
		QJ.MPMZ.tl.ex_chahuiExpressWarning(6);
        return;		
	 }
	 
     let xx = (this.x - 25) / 48;
     let yy = (this.y + 60) / 48;
     let code = `$gameMap.spawnEventQJ(1,21,${xx},${yy},true)`;
	 // 铁砧召唤环境判定
	 QJ.MPMZ.Shoot({
        position: [['P'], ['P']],
        initialRotation: ['S', 0],
        imgRotation: ['F'],
        moveType: ['S', 0],
        anchor: [0.5, 0.5],
        collisionBox:['S', 120, 45, 90],
        existData: [
		   {t:['Time',4], a:['S', code]},
		   {t:['G',['"enemy"','"object"']],a:['S',"QJ.MPMZ.tl.ex_chahuiExpressWarning(5)"]},
		   {t:['NP'], a:['S', "QJ.MPMZ.tl.ex_chahuiExpressWarning(5)"],cb:['C',32]},
        ],
     });
	
     return;
   }
   // 移除铁砧
   if (initialize && initialize === "remove") {
     let list = $gameMap.getGroupBulletListQJ('Anvil');
	 if (list > 0) {
		 let bid = list[0];
		 let bullet = $gameMap._mapBulletsQJ[bid];
		 if (!bullet || !bullet.data) return;
		 let eid = bullet.data.eid;
		 let wid = bullet.data.weapon;		 
		 // 确保锻造锤被替换
		 let actor = $gameParty.leader();
		 if (!actor.equips()[0] || actor.equips()[0].baseItemId == 22) {
			 actor.changeEquipById(1, 4);
		 }
		 QJ.MPMZ.deleteProjectile('Anvil');
		 $gameMap.clearSpawnEventQJ(eid);
		 let weapon = $dataWeapons[wid];
		 if (weapon) {
			 $gameParty.gainItem(weapon, 1);			 
			 let weapons = $gameParty.allItems().filter(function(item) {
			     return item && DataManager.isWeapon(item) && item.baseItemId === 22;
			 });
			 weapons.forEach(function(w) {
    			 $gameParty.loseItem(w, 1);
			 });
			 // 移除特定状态并更新武器图像
			 QJ.MPMZ.tl.ex_playerWeaponImage(true);
		 }

	 }
     return;
   }   

   if (initialize && initialize === "start") {
	 // 放置铁砧和放置武器  
     AudioManager.playSe({name: "Hammer",volume: 75,pitch: Math.randomInt(60) + 70,pan: 0});	   
	 let weapon = $gameParty.leader().equips()[0];
     let weaponImage = "weapon/weapon" + weapon.baseItemId; 
     let eid = this._eventId;
     let posX = $gameMap.event(eid).screenBoxXShowQJ();
     let posY = $gameMap.event(eid).screenBoxYShowQJ() - 15;	 
     let Anvil = QJ.MPMZ.Shoot({
        img:weaponImage,
		groupName: ['Anvil'],
		position:[['S',posX],['S',posY]],
        initialRotation:['S',0],
		imgRotation:['F',-45],
        moveType:['S',0],
        scale:0.8,
		collisionBox:['R',2,32],
		weapon: weapon.id,
		eid: eid,
		z: 5,
		durMax: weapon.durMax,
        existData:[
           {t:['B',['playerSkill']], a:['F', QJ.MPMZ.tl.playerRepairWeaponWithAnvil, ["repair"]], p:[-1,false,true]},
        ],
		moveF:[
		   [16,16,QJ.MPMZ.tl.playerRepairWeaponWithAnvil, ["refresh"]]
		]
     });
     // 隐藏并替换武器
	 $gameParty.leader().changeEquipById(1, 22);
     $gameParty.loseItem(weapon, 1);
     // 移除特定状态并更新武器图像
     $gameParty.leader().removeState(62);
     QJ.MPMZ.tl.ex_playerWeaponImage(true);
	 // 标记事件
	 $gameSelfVariables.setValue([$gameMap.mapId(), eid, 'weaponId'], weapon.id);
     return;	 
   }
   
   // 检查铁砧召唤环境
   if (initialize && initialize === "environmentCheck") {
      if (!this)  return;
	  // 正在水里
	  if ( $gameParty.leader()._characterName == "$player_swim" ) {
		  QJ.MPMZ.tl.ex_chahuiExpressWarning(4);
		  return false;
	  }	  
	  // 系统忙碌状态
	  if ( !$gameSwitches.value(3) || $gameSwitches.value(14) ) {
		  QJ.MPMZ.tl.ex_chahuiExpressWarning(2);
		  return false;
	  }
	  // 正在举物
	  if ( $gamePlayer._drill_PT_is_lifting ) {
		  QJ.MPMZ.tl.ex_chahuiExpressWarning(3);
		  return false;
	  }
       return true;	  
   }	   
};


// 红色有角三倍速
QJ.MPMZ.tl.redHornRecharge = function (extra = {}) {
	
    if (extra.listener) {
      if ($gameMap.getGroupBulletListQJ('redHorn').length > 0) return		
      QJ.MPMZ.Shoot({
		groupName: ['redHorn'],
		position:[['S',0],['S',0]],
        moveType:['S',0],
        existData:[
           {t:['S',"!$gameParty.leader().hasSkill(68)",true]},
        ],
		moveF:[
		   [30,5,QJ.MPMZ.tl.redHornRecharge, [{update:true}]]
		]
     }); 
     return;	 
	}
	
	if (extra.update) {
		
	  this._coolDown = this._coolDown || 0;	
	  if (this._coolDown > 0) {
	     this._coolDown -= 1;
	     return;
	  }
	  
	   const leader = $gameParty.leader();
	   if (leader.hasSkill(68) && leader.skillMasteryUses(68) < 3 ) { 
		   AudioManager.playSe({ name: "Flash1", volume: 60, pitch: 130, pan: 0 });
		   let data = $gameScreen._particle.particleSet(0,'explode_cp_1','player');
		   $gameScreen._particle.particleUpdate(['explode_cp_1','pos','0','-12']);
		   $gameScreen._particle.particleUpdate(['explode_cp_1','color','#ff4665']);
		   if (data) data.clear = true;		   
		   leader.gainSkillMasteryUses(68, 1);
		   QJ.MPMZ.tl.redHornRecharge({redHornMark:true});
		   let baseCD = 70;
		   baseCD    -= 12 * leader.skillMasteryLevel(68);
		   baseCD    *= (100 - (15 * leader.skillMasteryLevel(28))) / 100;
		   baseCD     = Math.max(1, Math.round(baseCD));
		   this._coolDown = baseCD;
	   } else {
		   this._coolDown = 6;
	   }
		return;  
	}
	
	if (extra.redHornMark) {
	   // 更新可使用次数标记
	   for (let i = 1; i <= $gameParty.leader().skillMasteryUses(68); i++) {
		  let posX  = 10 + 20 * i;
		  let name  = `redHornMark${i}`;
		  if ($gameMap.getGroupBulletListQJ(name).length == 0) {
		  QJ.MPMZ.Shoot({
			 img: ['I', 609], 
			 groupName: [`redHornMark${i}`],
			 position: [['S',posX],['S',70]],
			 initialRotation: ["S", 0],
             imgRotation: ["S", 0],
			 moveType: ['S',0],
             opacity: 1,
             scale: 0.25,
			 onScreen:true,			 
			 existData: [
				{t:['S',`!$gameParty.leader().hasSkill(68) || $gameParty.leader().skillMasteryUses(68) < ${i}`,true]},
			 ],
			 timeline: ['B',0,120,[0.75,60]]
		  });
		 }		  
	   }
     }	   
	
};


QJ.MPMZ.tl.herculesBrokenHornEffectProcess = function (extra = {}) {
	
	let base = 30;
	const leader = $gameParty.leader();
    const weapon = leader.equips()[0];
	if (!weapon) return base;
	
	let attack   = weapon.params[2] + weapon.flatParams[2];
	attack      += leader.paramFlat(2);
	
	base         = Math.max(30, attack);
	return base;
};


// 鹿管-时间到了
QJ.MPMZ.tl.ItsTimeEffect = function (extra = {}) {
    let leader = $gameParty.leader();
    if (extra.trigger) {
        $gamePlayer.refresh();
        leader.states();
        $gamePlayer.requestAnimation(173);
        let randomSeArray = ["ThatRemindsMe~", "It’sTime~"];
        let randomSe = randomSeArray[Math.floor(Math.random() * randomSeArray.length)];   
        let random = 90 + Math.randomInt(20);
        AudioManager.playSe({ name: randomSe, volume: 100, pitch: random, pan: 0 });
        return;
    }

    if ($gameSystem.minute() === 0) {
        if (leader.isStateAffected(118)) return;
        QJ.MPMZ.tl.ItsTimeEffect({trigger:true});
    }
};

// 恶魔眼球-真视效果
QJ.MPMZ.tl.DemonEyeballEffect = function (extra = {}) {

    if (extra.clearEffect) {
        $gameScreen._particle.particleClear("tag:trueSightEye");
        return;
    }

    const particle = $gameScreen._particle;
    // 显现隐藏通道
    particle.particleSet(0, 'revealHiddenPassage', 'region:240', 'trueSightEye');
    particle.particleTag('revealHiddenPassage', 'trueSightEye');
    // 显现隐藏可互动实体
    const hiddenItem = $gameMap.drill_COET_getEventsByTag_direct("hiddenItem");
    if (hiddenItem.length > 0) {
        for (let Item of hiddenItem) {
             let xx   = Math.floor(Item.centerRealX());
             let yy   = Item.centerRealY();
             let name = 'hiddenItem' + Item._eventId;
             particle.particleSet(0, name, 'tilemap', 'trueSightEye', 'above', xx, yy);
             particle.particleTag(name, 'trueSightEye');
        }
    }
};