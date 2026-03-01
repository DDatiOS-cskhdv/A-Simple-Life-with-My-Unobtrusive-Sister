//=============================================================================
 /*:
 * @plugindesc 动画脚本（NSFW）
 * @author shiroin
 */
//=============================================================================

// 检查哥哥能否再战
QJ.MPMZ.tl.canOniiChanContinueSegs = function(extra = {}) {
	
	let Oniichan = $gameParty.leader();
	let HP       = Oniichan.hp;
	
	if (extra.shasei) {
	   // 根据射精量扣除体力
       let seieki = extra.seiekiRyo ? extra.seiekiRyo : 4 + Math.randomInt(4);	
       let damage = -seieki * 15;
	   this.changeHp(Oniichan, damage, false);
	   $gameScreen.startFlash([255, 255, 255, 105], 30);
	   // 进入贤者模式
	   $gameVariables.setValue(25, -10);
	   // 记录哥哥总射精量
	   $gameSelfVariables.addValue([1, 1, "shaseiRyo"], seieki);
	   // 提供给后续事件指令的标记
	   this.shaseiRyo = seieki;	   
	}
	
	let limit    = 100;
    if (Utils.isOptionValid("test")) limit = 200;	
    if (HP >= limit) {
       return true;	
	}
	// 进入贤者模式
	$gameVariables.setValue(25, -10);
    return false;	
};

// 检查妹妹能否接受Hentai请求
QJ.MPMZ.tl.canImoutoAcceptHentaiRequest = function(extra = {needValue:5, needkeiken:0, begImouto:false}) {

	const Imouto    = $gameActors.actor(2);
    const heart     = Number($gameVariables.value(17)) || 0;
	const isHeat    = Imouto.isStateAffected(35); // 发情状态
	const purple    = Number($gameVariables.value(18)) || 0;
	const moodValue = Number($gameVariables.value(20)) || 0;
	let needValue   = extra.needValue;
    let Seikeiken   = Imouto.skillMasteryUses?.(190) || 0;

    if (extra.begImouto) {
	// 直接对妹妹死缠烂打地请求	
		const oniichan = $gameActors.actor(1);
		const lucky    = oniichan.luk;
		function randHighByLuckSmooth(luck, strength = 6) {
			luck = Math.max(0, Math.min(999, luck));
			const luck01 = luck / 999;

			const k = 1 + luck01 * strength;   // 1..(1+strength)
			const u = Math.random();
			return Math.pow(u, 1 / k);         // 越接近1越容易
		}
        const check = (heart + purple) * (1.25 * randHighByLuckSmooth(lucky));
		return check > needValue;
	}

	if (isHeat) needValue -= 2;
	if (moodValue >= 75) needValue -= Math.randomInt(3);
	if (moodValue <= 35) needValue += Math.randomInt(3);
    if (extra.HScene) Seikeiken = $gameSelfVariables.value([1, 2, String(extra.HScene)]);

    needValue -= heart + purple;
	const isSkilled = Seikeiken >= (Number(extra.needkeiken) || 0);
	// 需要考虑妹妹既要满足好感要求也要满足熟练度要求
	return needValue <= 0 && isSkilled;
};

// 浴室-帮哥哥洗澡-口交
QJ.MPMZ.tl.bathroomBatheOniiChanBlowjob = function(extraData = {}) {
    const BASE_PATH = "[NSFW]bathroom_blowjob/bathroom_blowjob";

    // 帧刷新逻辑
    if (extraData.refresh) {
        this._coolDown = this._coolDown || 0;
        if (this._coolDown > 0) {
            this._coolDown--;
            return;
        }
		
        this._frames = this._frames || 1;
        this._speed = this._speed || 4;
        // 显示关键帧
        let imgName = BASE_PATH + this._frames;
        if (this._frames >= 90) {
            if (this._cumInMouth) imgName = BASE_PATH + "_cum" + this._frames;
            $gameScreen.showPicture(5, imgName, 0, 180, 380, 100, 100, 255, 0);
        } else {
            $gameScreen.showPicture(5, imgName, 0, 180, 0, 100, 100, 255, 0);
        }

        // --- 剖面图 ---
        if ($gameTemp._xrayVisionEffect && this._frames >= 27 && this._frames <= 81) {
            let cutawayImg = BASE_PATH + "_cutawayView" + this._frames;
			let opacity = Number($gameTemp._xrayVisionEffect) || 0;
            $gameScreen.showPicture(7, cutawayImg, 0, 380, 200, 100, 100, opacity, 0);
        }

        this._frames++;

        // --- 配置不同阶段的结束帧 ---
        const phaseEndMap = { 
		      2: 17, 
			  5: 23, 
			  9: 42, 
			  11: 68, 
			  13: 74, 
			  14: 88, 
			  20: 101 
		};
        this._endFrames = phaseEndMap[this._setPhase] || 12;

        // --- 特殊帧触发逻辑 (动作切换/射精) ---
        const triggers = [
		    { cond: this._frames === 5, voice:2 }, // 舔音效
			{ cond: this._frames === 99, voice:20 }, // 撸肉棒音效
			{ cond: this._frames === 41, voice:10 }, // 口交-浅入音效
			{ cond: this._frames === 48, voice:11 }, // 口交-浅转深音效
			{ cond: this._frames === 65, voice:13 }, // 口交-深入音效
            { cond: this._frames === 36 && this._switchPhase === 11, phase: 11, frame: 43 }, // 浅入 -> 深入
            { cond: this._frames === 64 && this._switchPhase === 13, phase: 13, frame: 69 }, // 深入 -> 浅入
            { cond: this._frames === 63 && this._shasei, phase: 14, frame: 75, ceqj: 15, ceqjType: 4 }, // 深喉射精预备
            { cond: this._frames === 91 && this._cumInMouth && this._shasei, frame: 90, ceqj: 23, ceqjType: 3, pause: true }, // 二次颜射
			{ cond: this._frames === 91 && this._switchPhase === 1, frame: 1, ceqj: 1, ceqjType: 1, pause: true }, // 结束初始爱抚动作
            { cond: this._frames === 95 && !this._cumInMouth && this._shasei, frame: 90, ceqj: 21, ceqjType: 3, pause: true, setCum: true } // 一次颜射
        ];

        for (let t of triggers) {
            if (t.cond) {
                if (t.phase !== undefined) {
					this._setPhase     = t.phase;
					console.log(t.phase);
					this._disableReset = undefined;
				}
                if (t.frame !== undefined) this._frames = t.frame;
                if (t.ceqj) $gameMap.event(4)?.steupCEQJ(t.ceqjType, { setPhase: t.ceqj, listenerId: this.index });
                if (t.pause) this._coolDown = 99999;
                else this._coolDown += this._speed;
                /*
                if (this._frames !== 43) {
					// 浅入抽插拥有射精标记时需跳过重置
					this._shasei = undefined;
				}
				*/
                if (!this._disableReset) this._switchPhase = undefined;
                if (t.setCum) this._cumInMouth = true;
				
				if (t.voice !== undefined) {
				 // 口交效果音	
				   let action = t.voice;
				   if (action === 10) action = 11;
				   let voice  = `[NSFW]bathroom_blowjob_action${action}_` + Math.randomInt(4);
				   AudioManager.playVoice({ name: voice, volume: 60, pitch: 100, pan: 0 }, false, 6);
				}
                return;
            }
        }

        // --- 循环与阶段跳转逻辑 ---
        if (this._frames > this._endFrames) {
            const jumpLogic = {
                2:  { nextPhase: 4, ceqj: 1 },
                5:  { nextPhase: 6, ceqj: 1 },
                9:  { resetFrame: 27 },
                11: { resetFrame: 53 },
                13: { resetFrame: 27, nextPhase: 9 },
                14: { nextPhase: 15, ceqj: 2 },
                20: { resetFrame: 90 }
            };

            let logic = jumpLogic[this._setPhase];
            if (logic) {
                if (logic.ceqj) {
                    this._coolDown = 99999;
                    $gameMap.event(4).steupCEQJ(logic.ceqj, { setPhase: logic.nextPhase, listenerId: this.index });
                    return;
                }
                if (logic.resetFrame) this._frames = logic.resetFrame;
                if (logic.nextPhase) this._setPhase = logic.nextPhase;
				if (this._setPhase === 9 && this._shasei) this._switchPhase = 11;
                this._coolDown += this._speed;
                return;
            }
            this._frames = 1;
        }

        this._coolDown += this._speed;
        return;
    }


    if (extraData.videoSe) {
        this._coolDown = this._coolDown || 0;
        if (this._coolDown > 0) {
            this._coolDown--;
            return;
        }
		
		let phase = extraData.phase;
		const timeRange = {
			4:  { min: 0.36,  max: 0.43, coolDown: 70},
			6:  { min: 0.15,  max: 0.66, coolDown: 55},
			8:  { min: 0.15,  max: 0.66, coolDown: 40}
		};		
		let seRange = timeRange[phase];
		if (!seRange) return;
		
		let pid = extraData.videoPid || 6;
		let pic = $gameScreen.picture(pid);
		if (!pic?.isVideo()) {
			this.setDead({ t: ["Time", 0] });
			return;
		}	
		let time  = $gameMap.getPictureVideoCurrentTime(pid);
		//console.log(extraData, time);	
		if (time >= seRange.min && time <= seRange.max) {
			if (phase === 8) phase = 6;
		    let voice  = `[NSFW]bathroom_blowjob_action${phase}_` + Math.randomInt(5);
		    AudioManager.playVoice({ name: voice, volume: 60, pitch: 100, pan: 0 }, false, 6);
			this._coolDown = seRange.coolDown;
		}	        		
		return;
	}

    // 动画帧预加载逻辑
    if (extraData.preloadAnimationFrames) {
        const p = extraData.preloadAnimationFrames;
        const load = (f) => ImageManager.loadPicture(BASE_PATH + f);
        const loadCut = (f) => ImageManager.loadPicture(BASE_PATH + "_cutawayView" + f);
        const loadCum = (f) => ImageManager.loadPicture(BASE_PATH + "_cum" + f);

        const preloadConfigs = {
			2:  () => { for (let i = 1;   i <= 12; i++) load(i); },
            3:  () => { for (let i = 13;  i <= 17; i++) load(i); },
            5:  () => { for (let i = 18;  i <= 23; i++) load(i); },
            9:  () => { for (let i = 24;  i <= 42; i++) { load(i); if (i >= 27) loadCut(i); } },
            11: () => { for (let i = 43;  i <= 68; i++) { load(i); loadCut(i); } },
            20: () => { for (let i = 90; i <= 101; i++) { load(i); loadCum(i); } }
        };

        if (preloadConfigs[p]) preloadConfigs[p]();
        return;
    }

    // 动画监听器
	QJ.MPMZ.deleteProjectile('blowjob');
    let listener = QJ.MPMZ.Shoot({
        groupName: ['blowjob', 'segs'],
        existData: [],
        moveF: [
		    [1, 0, QJ.MPMZ.tl.bathroomBatheOniiChanBlowjob, [{ refresh: true }]]
		],
        moveJS: [],
    });
    this.listenerId = listener.index;
	
	if(extraData.initialAction) {
	   listener._setPhase = 20;
       listener._frames   = 90;
	   listener._disableReset = true;
       //listener._cumInMouth = true;  
	} else {
	  setTimeout(() => $gameScreen.erasePicture(6), 30);
	}

};

// 客厅-一起看电视-背面座位(抱)segs
QJ.MPMZ.tl.livingRoomWatchTVTogetherHaimenzaiAlter = function(extraData = {}) {
	
   if (extraData.refresh) {
	// 帧刷新流程   
	  this._coolDown = this._coolDown || 0;	
	  if (this._coolDown > 0) {
	     this._coolDown -= 1;
	     return;
	  }
	  this._frames = this._frames || 1;
      this._speed  = this._speed  || 4;	  
	  let type     = this._kaoType ? this._kaoType : "";
      let target   = $gameScreen.picture(1);
      let scale    = target?._scaleX || 100;
      let posX     = scale > 50 ? 1920 : 960; 
      let posY     = scale > 50 ? 760  : 380;
  	      posX    += target?._x || -1400;
		  posY    += target?._y || -700;
	  let IMG      = `living_room/[NSFW]livingRoom_watchTVTogether_reverseCowgirl_alt_action${type}` + this._frames;
	  
	  if (this._needSwitchKao) {
		  if (this._needSwitchKao === "A") {
			  IMG = `living_room/[NSFW]livingRoom_watchTVTogether_reverseCowgirl_alt_action_ahegao_switchA` + this._frames;
			  if (this._frames === 6) {
			      this._needSwitchKao = undefined;
			      this._kaoType = "_ahegaoA";	
				  AudioManager.stopVoice(null, 6);  
			  }
		  }
		  if (this._needSwitchKao === "B") {
			  IMG = `living_room/[NSFW]livingRoom_watchTVTogether_reverseCowgirl_alt_action_ahegaoB` + this._frames;
			  this._needSwitchKao = undefined;
			  this._kaoType = "_ahegaoB";
			  AudioManager.stopVoice(null, 6);
		  }		  
	  }
	  
	  if (!this._shasei) $gameScreen.showPicture(6, IMG, 0, posX, posY, scale, scale, 255, 0);
	  
	  let seName   = `[NSFW]livingRoom_ImoutoScared_segs_A` + Math.randomInt(5);
	  let volume   =  80;   
		  
	  // 中出判断
	  if (this._shasei) {
		  this._needShasei   = undefined;
		  this._shaseiFrames = this._shaseiFrames || 1;
		  this._shaseiTimes  = this._shaseiTimes  || 0;
		  IMG                = "living_room/[NSFW]livingRoom_watchTVTogether_reverseCowgirl_alt_shasei" + this._shaseiFrames;
		  
		  if (!!type) {
			  IMG            = "living_room/[NSFW]livingRoom_watchTVTogether_reverseCowgirl_alt_ahegao_shasei" + this._shaseiFrames;
		  }		  
	      $gameScreen.showPicture(6, IMG, 0, posX, posY, scale, scale, 255, 0);
		  
		  if (!this._shaseSe) {
			  // 射精音效
			  this._shaseSe   = true;
              let shaseiTimes = Math.min(2, this._shaseiTimes);			  
			  let shaseSe     = `[NSFW]livingRoom_ImoutoScared_segs_shasei` + (shaseiTimes * 2 + Math.randomInt(2));
			  AudioManager.playVoice({ name: shaseSe, volume: 60, pitch: 100, pan: 0 }, false, 7);			  
			  setTimeout( () => {
				   AudioManager.stopVoice();
				   let se = "[NSFW]living_room_watchHorrorMovie_segs" + ( 9 + Math.randomInt(2) );
				   AudioManager.playVoice({ name: se, volume: 90, pitch: 100, pan: 0 }, false, 3);
			  }, 300);		  
		  }
		  this._shaseiFrames  += 1; 
		  let limit = !!type ? 16 : 9;		  
		  if (this._shaseiFrames > limit) {
			  
			  if (!!type && !this._aftertaste) {
				  // 同时高潮后的余韵状态
				  this._aftertaste = true;
				  QJ.MPMZ.Shoot({
					 img: "imoutoUtil/[NSFW]livingRoom_watchTVTogether_reverseCowgirl_alt_aftertaste[4,30]",
	                 groupName: ['aftertaste','segs'],
					 position:[['S', posX + 380],['S', posY + 160]],
                     existData: [ 
	                 ],
                     moveJS: [],		
                     z:"A",		
                     moveType:['S',0],
					 anchor:[0,0],
                     initialRotation:['S',0],
                     onScreen:true					 
                  });
				  QJ.MPMZ.Shoot({
					 img: "imoutoUtil/[NSFW]livingRoom_watchTVTogether_reverseCowgirl_alt_aftertaste[2,6]",
	                 groupName: ['aftertaste','segs'],
					 position:[['S', posX + 380],['S', posY + 160]],
                     existData: [ 
	                 ],
                     moveJS: [
					     [90,  180, "this.changeAttribute('opacity', 1)"],
						 [108, 180, "this.changeAttribute('opacity', 0)"],
					 ],		
					 opacity: 0,
                     z:"A",		
                     moveType:['S',0],
					 anchor:[0,0],
                     initialRotation:['S',0],
                     onScreen:true					 
                  });				  
			  }
			  
			  // 射精结束
			  this._coolDown    += 9999999;
			  this._shasei       = undefined;
			  this._needSeieki   = true;
			  this._shaseiTimes += 1;  // 射精次数+1
			  this._shaseiFrames = undefined;
			  this._shaseSe      = undefined;
			  this._aftertaste   = undefined;
              return;			  
		  }
	  } else {
		$gameScreen.erasePicture(10);
	  }
	  
	  if (this._needSeieki) {
		  // 射精后的精液残留图层
		  IMG      = "living_room/[NSFW]livingRoom_watchTVTogether_reverseCowgirl_alt_seiekiA" + this._frames;
		  seName   = "[NSFW]livingRoom_ImoutoScared_segs_fillUpA" + Math.randomInt(5);
		  volume   = 45;
	      $gameScreen.showPicture(8, IMG, 0, posX, posY, scale, scale, 255, 0);
		  if (this._shaseiTimes > 1 && !this._needSeiekii) {
			  // 多次射精后的精液累加效果
			  IMG = "living_room/[NSFW]livingRoom_watchTVTogether_reverseCowgirl_alt_seiekiB";
			  $gameScreen.showPicture(9, IMG, 0, posX, posY, scale, scale, 255, 0);
			  this._needSeiekii = true;
		  }
	  }
	  
      if (!this._shasei)  this._frames += 1;
	  // 表情切换监听
      if (this._frames === 7 && this._needSwitchKao === "Aready") {
      	  this._needSwitchKao = "A";
	  }
	  // 妹妹娇喘
	  this._gaspsCount = this._gaspsCount || 0;
	  this._gaspsCount += 1; 
	  let gaspsCountLimt = 3;
	  if (this._kaoType === "_ahegaoA" || this._kaoType === "_ahegaoB") gaspsCountLimt = 0;
	  if (this._gaspsCount > gaspsCountLimt) {
		  if (!AudioManager.isExistVoiceChannel(6) && !AudioManager.isExistVoiceChannel(1)) {
			  let base = 1, span = 5;
			  if (this._kaoType === "_ahegaoA")      { base = 6;  span = 5; }
			  else if (this._kaoType === "_ahegaoB") { base = 11; span = 5; }
				let newgasps;
				do {
				  newgasps = base + Math.randomInt(span);
				} while (newgasps === this._oldgasps && span > 1); // span==1 时避免死循环
			  let gasps = "[NSFW]livingRoom_watchAdultMovie_gasps" + newgasps;
			  this._oldgasps = newgasps;
			  AudioManager.playVoice({ name: gasps, volume: 90, pitch: 100, pan: 0 }, false, 6);
			  this._gaspsCount = 0;
		  } else {
			  this._gaspsCount = 0;
		  }
	  }		  
	  // 体外射精判断	  
      if (this._frames === 2 && this._sotodashi) {
		  this.setDead({t:['Time',0]});
		  $gameMap.event(12)?.steupCEQJ(2, {kaoType: this._kaoType});
		  return;
	  }
	  if (this._frames === 9) AudioManager.playVoice({ name: seName, volume: 60, pitch: 100, pan: 0 }, false, 7);
      if (this._frames === 7 && this._needShasei) this._shasei = true;	 		  
	  if (this._frames > 8)  this._frames = 1;

	  
	  this._coolDown += this._speed;	  
	  return; 
   }
   
   // 背面座位（抱）动画播放器/监听器
   let listener = QJ.MPMZ.Shoot({
	                 groupName: ['haimenzaiKai','segs'],
                     existData: [ 
	                 ],
                     moveF: [
                        [30,0,QJ.MPMZ.tl.livingRoomWatchTVTogetherHaimenzaiAlter,[{refresh:true}]],
                     ],
                     moveJS: [
                        //[240,99999,"this._needSwitchKao = 'Aready';"],
						//[520,99999,"this._needSwitchKao = 'B';"],			
                        //[720,600,"this._needShasei = true;"],					
                     ],					 
                  });
    this.listenerId = listener.index;
    if (!$gameScreen.picture(1)) {
        $gameScreen.showPicture(1, 'living_room/living_S_N_RL', 0, -1400, -700, 100, 100, 255, 0);
	}
    if ($gameTemp._semenAppears) {
		listener._needSeieki    = true;
		listener._shaseiTimes   = 1;
		listener._needSwitchKao = 'Aready';
		$gameTemp._semenAppears = undefined;
		if ($gameScreen.picture(8)) {
		    $gameScreen.changePictureName(8, "living_room/[NSFW]livingRoom_watchTVTogether_reverseCowgirl_alt_seiekiA1");
		}		
	}
	
    // 预加载
    for (let i = 1; i <= 8; i++) {
	    ImageManager.loadPicture( "living_room/[NSFW]livingRoom_watchTVTogether_reverseCowgirl_alt_action" + i );
		ImageManager.loadPicture( "living_room/[NSFW]livingRoom_watchTVTogether_reverseCowgirl_alt_action_ahegaoA" + i );
		ImageManager.loadPicture( "living_room/[NSFW]livingRoom_watchTVTogether_reverseCowgirl_alt_action_ahegaoB" + i );
    }    
};

// 客厅-一起看电视-背面座位segs
QJ.MPMZ.tl.livingRoomWatchTVTogetherHaimenzai = function(extraData = {}) {

   if (extraData.refresh) {
	// 帧刷新流程   
	  this._coolDown = this._coolDown || 0;	
	  if (this._coolDown > 0) {
	     this._coolDown -= 1;
	     return;
	  }
	  this._frames = this._frames || 6;
      this._speed  = this._speed  || 4;	  
	  let type     = this._kaoType ? this._kaoType : "";
      let target   = $gameScreen.picture(1);
      let scale    = target?._scaleX || 100;
      let posX     = scale > 50 ? 1920 : 960; 
      let posY     = scale > 50 ? 760  : 380;
  	      posX    += target?._x || -1400;
		  posY    += target?._y || -700;
	  let IMG      = `living_room/[NSFW]livingRoom_watchTVTogether_reverseCowgirl_action${type}` + this._frames;
	  
	  if (this._needSwitchKao) {
		  if (this._needSwitchKao === "A") {
			  IMG = `living_room/[NSFW]livingRoom_watchTVTogether_reverseCowgirl_action_ahegao_switchA` + this._frames;
			  if (this._frames >= 11) {
			      this._needSwitchKao = undefined;
			      this._kaoType = "_ahegaoA";
                  AudioManager.stopVoice(null, 6);				  
			  }
		  }
		  if (this._needSwitchKao === "B" && this._frames >= 11) {
			  IMG = "living_room/[NSFW]livingRoom_watchTVTogether_reverseCowgirl_action_ahegao_switchB";
			  this._needSwitchKao = undefined;
			  this._kaoType = "_ahegaoB";
			  AudioManager.stopVoice(null, 6);
		  }		  
	  }
	  
	  $gameScreen.showPicture(6, IMG, 0, posX, posY, scale, scale, 255, 0);
	  
	  let seName   = `[NSFW]livingRoom_ImoutoScared_segs_A` + Math.randomInt(5);
	  let volume   =  80;   
		  
	  // 中出判断
	  if (this._shasei) {
		  this._needShasei   = undefined;
		  this._shaseiFrames = this._shaseiFrames || 1;
		  this._shaseiTimes  = this._shaseiTimes  || 0;
		  $gameTemp._semenAppears = true;
		  IMG                = "living_room/[NSFW]livingRoom_watchTVTogether_reverseCowgirl_shasei" + this._shaseiFrames;
	      $gameScreen.showPicture(6, IMG, 0, posX, posY, scale, scale, 255, 0);
		  
		  if (!!type) {
			  type           = "_ahegaoB" ? 3 : 2;
			  IMG            = "living_room/[NSFW]livingRoom_watchTVTogether_reverseCowgirl_kao" + type;
			  $gameScreen.showPicture(10, IMG, 0, posX, posY, scale, scale, 255, 0);
		  }
		  if (!this._shaseSe) {
			  // 射精音效
			  this._shaseSe   = true;
              let shaseiTimes = Math.min(2, this._shaseiTimes);			  
			  let shaseSe     = `[NSFW]livingRoom_ImoutoScared_segs_shasei` + (shaseiTimes * 2 + Math.randomInt(2));
			  AudioManager.playVoice({ name: shaseSe, volume: 60, pitch: 100, pan: 0 }, false, 7);			  
			  setTimeout( () => {
				   AudioManager.stopVoice();
				   let se = "[NSFW]living_room_watchHorrorMovie_segs" + ( 9 + Math.randomInt(2) );
				   AudioManager.playVoice({ name: se, volume: 90, pitch: 100, pan: 0 }, false, 3);
			  }, 300);		  
		  }
		  this._shaseiFrames  += 1; 
		  if (this._shaseiFrames > 9) {
			  if (!this._aftertaste) {
				  // 同时高潮后的余韵状态
				  this._aftertaste = true;
				  QJ.MPMZ.Shoot({
					 img: "imoutoUtil/[NSFW]livingRoom_watchTVTogether_reverseCowgirl_aftertaste[2,6]",
	                 groupName: ['aftertaste','segs'],
					 position:[['S', posX + 400],['S', posY + 175]],
                     existData: [ 
	                 ],
                     moveJS: [
					     [0,  180, "this.changeAttribute('opacity', 1)"],
						 [18,  180, "this.changeAttribute('opacity', 0)"],
					 ],		
					 opacity: 0,
                     z:"A",		
                     moveType:['S',0],
					 anchor:[0,0],
                     initialRotation:['S',0],
                     onScreen:true					 
                  });				  
			  }			  
			  // 射精结束
			  this._coolDown    += 9999999;
			  this._shasei       = undefined;
			  this._needSeieki   = true;
			  this._shaseiTimes += 1;  // 射精次数+1
			  this._shaseiFrames = undefined;
			  this._shaseSe      = undefined;
			  this._aftertaste   = undefined;
              return;			  
		  }
	  } else {
		$gameScreen.erasePicture(10);
	  }
	  
	  if (this._needSeieki) {
		  // 射精后的精液残留图层
		  IMG      = "living_room/[NSFW]livingRoom_watchTVTogether_reverseCowgirl_seiekiA" + this._frames;
		  seName   = "[NSFW]livingRoom_ImoutoScared_segs_fillUpA" + Math.randomInt(5);
		  volume   = 45;
	      $gameScreen.showPicture(8, IMG, 0, posX, posY, scale, scale, 255, 0);
		  if (this._shaseiTimes > 1 && !this._needSeiekii) {
			  // 多次射精后的精液累加效果
			  IMG = "living_room/[NSFW]livingRoom_watchTVTogether_reverseCowgirl_seiekiB";
			  $gameScreen.showPicture(9, IMG, 0, posX, posY, scale, scale, 255, 0);
			  this._needSeiekii = true;
		  }
	  }
	  
      if (!this._shasei)  this._frames += 1;
	  // 表情切换监听
      if (this._frames === 9 && this._needSwitchKao === "Aready") {
      	  this._needSwitchKao = "A";
	  }
	  // 体外射精判断	  
      if (this._frames === 2 && this._sotodashi) {
		  this.setDead({t:['Time',0]});
		  $gameMap.event(12)?.steupCEQJ(4, {sotodashiAnim:true, kaoType: this._kaoType});
		  return;
	  }
	  // 妹妹娇喘
	  this._gaspsCount = this._gaspsCount || 0;
	  this._gaspsCount += 1; 
	  let gaspsCountLimt = 3;
	  if (this._kaoType === "_ahegaoA" || this._kaoType === "_ahegaoB") gaspsCountLimt = 0;
	  if (this._gaspsCount > gaspsCountLimt) {
		  if (!AudioManager.isExistVoiceChannel(6) && !AudioManager.isExistVoiceChannel(1)) {
			  let base = 1, span = 5;
			  if (this._kaoType === "_ahegaoA")      { base = 6;  span = 5; }
			  else if (this._kaoType === "_ahegaoB") { base = 11; span = 5; }
				let newgasps;
				do {
				  newgasps = base + Math.randomInt(span);
				} while (newgasps === this._oldgasps && span > 1); // span==1 时避免死循环
			  let gasps = "[NSFW]livingRoom_watchAdultMovie_gasps" + newgasps;
			  this._oldgasps = newgasps;
			  AudioManager.playVoice({ name: gasps, volume: 90, pitch: 100, pan: 0 }, false, 6);
			  this._gaspsCount = 0;
		  } else {
			  this._gaspsCount = 0;
		  }
	  }	
	  
	  if (this._frames === 6) AudioManager.playVoice({ name: seName, volume: 60, pitch: 100, pan: 0 }, false, 7);
      if (this._frames === 8 && this._needShasei) this._shasei = true;	 		  
	  if (this._frames > 11)  {
		  // 切入到背面座位(抱)状态
		  if (this._switchPose) {
			  this.setDead({t:['Time',0]});
			  $gameMap.event(12)?.steupCEQJ(7, {});
			  return;
		  }
		  this._frames = 1;
	  }

	  
	  this._coolDown += this._speed;	  
	  return; 
   }

   if (extraData.bubbleText) {
	    // 妹妹气泡文字  
		if (this._disableBubbleText || this._shasei) return;
		let textArray = window.MapEventDialogue54?.["11"]?.["34"] ?? ['Missing translation'];
		let bubbleText = textArray[Math.floor(Math.random() * textArray.length)];
		$gameTemp.drill_GFTT_setBuffer( 7, 7 );
		$gameTemp.drill_GFTT_setStyle_context(bubbleText); 
		$gameTemp.drill_GFTT_createByBuffer( [1000,75], 180 );	
        return;		
   }

   if (extraData.ejaculationCountdown) {
	  // 射精倒计时和强制射精
	   if (extraData.autoEjaculation) {		   
		   let scene = SceneManager._scene;
		   let win   = scene._messageWindow._choiceWindow;
		   if (win && win.active) {
			   extraData.autoEjaculation.autoEjaculation = true;
			   let index = Math.randomInt(2);
			   win.select(index);
			   win.processOk();
		   }		   
		   return;
	   }	
	    let waitTime = 210;
		if (ConfigManager.language > 1) waitTime = 280;
        QJ.MPMZ.Shoot({
	       groupName: ['haimenzai','segs'],
           existData: [ 
		      {t:['Time',waitTime], a:['F',QJ.MPMZ.tl.livingRoomImoutoScaredKijoui,[{ejaculationCountdown:true, autoEjaculation:this}]]}
	       ],
        });	
        return;		
   }
	
   // 背面座位动画播放器/监听器
   let listener = QJ.MPMZ.Shoot({
	                 groupName: ['haimenzai','segs'],
                     existData: [ 
	                 ],
                     moveF: [
                        [80,0,QJ.MPMZ.tl.livingRoomWatchTVTogetherHaimenzai,[{refresh:true}]],
						[200,180,QJ.MPMZ.tl.livingRoomWatchTVTogetherHaimenzai,[{bubbleText:true}]]
                     ],
                     moveJS: [
						//[240,99999,"this._switchPose = true"],
                        //[240,99999,"this._needSwitchKao = 'Aready';"],
						//[520,99999,"this._needSwitchKao = 'B';"],
						//[800,460,"this._sotodashi = true;"],
                     ],					 
                  });
    this.listenerId = listener.index;
    if ($gameScreen.picture(1)) {
        $gameScreen.movePicture(1, 0, -1400, -700, 100, 100, 255, 0, 1);
    } else {
        $gameScreen.showPicture(1, 'living_room/living_S_N_RL', 0, -1400, -700, 100, 100, 255, 0);
	}		
    // 预加载
    for (let i = 1; i <= 11; i++) {
	    ImageManager.loadPicture( "living_room/[NSFW]livingRoom_watchTVTogether_reverseCowgirl_action" + i );
		ImageManager.loadPicture( "living_room/[NSFW]livingRoom_watchTVTogether_reverseCowgirl_action_ahegaoA" + i );
		ImageManager.loadPicture( "living_room/[NSFW]livingRoom_watchTVTogether_reverseCowgirl_action_ahegaoB" + i );
     } 
};

// 一起玩游戏-妹妹输掉游戏-口交
QJ.MPMZ.tl.gameItazuraBlowJob = function(extraData = {}) {

   if (extraData.massagePenis) {
	   
	  this._MPcoolDown = this._MPcoolDown || 0;	
	  if (this._MPcoolDown > 0) {
	     this._MPcoolDown -= 1;
	     return;
	  }
      this._MPframes = this._MPframes || 1; 
	  let penis = "[NSFW]game_itazura_POV/game_itazura_oniichan_lowerBody_massagePenis" + this._MPframes;
	  let hands = "[NSFW]game_itazura_POV/game_itazura_fera_massagePenis" + this._MPframes;
	  $gameScreen.showPicture(7, penis, 0, 550, 380, 100, 100, 255, 0);
      $gameScreen.showPicture(8, hands, 0, 550, 380, 100, 100, 255, 0);	  

      if (!this._MPplayback) {
   	    this._MPframes += 1;
	  } else {
	    this._MPframes -= 1;
	  }
	  if (this._MPframes <= 0) {
		  this._MPplayback = false;
		  this._MPframes = 1;
	  }
	  if (this._MPframes >= 8) {
		  this._MPplayback = true;
		  this._MPframes = 7;
	  }
	  this._MPcoolDown = 1;
	  return;
   }

   if (extraData.Blinking) {
	   
	  this._BcoolDown = this._BcoolDown || 0;	
	  if (this._BcoolDown > 0) {
	     this._BcoolDown -= 1;
	     return;
	  }
      this._Bframes = this._Bframes || 1; 
	  let eyes = "[NSFW]game_itazura_POV/game_itazura_fera_ImoutoFace_eyes" + this._Bframes;
	  $gameScreen.showPicture(6, eyes, 0, 700, 200, 100, 100, 255, 0);

      if (!this._Bplayback) {
   	    this._Bframes += 1;
	  } else {
	    this._Bframes -= 1;
	  }
	  if (this._Bframes <= 0) {
		  this._Bplayback = false;
		  this._BcoolDown = Math.randomInt(50) + 50;
		  this._Bframes = 1;
		  return;
	  }
	  if (this._Bframes >= 5) {
		  this._Bplayback = true;
		  this._Bframes = 3;
	  }
	  this._BcoolDown = 1;
	  return;
   }
   
	  let back      = "[NSFW]game_itazura_POV/game_itazura_background";
	  $gameScreen.showPicture(1, back, 0, 0, 0, 100, 100, 255, 0);
	  let item      = "[NSFW]game_itazura_POV/game_itazura_gameController";
	  $gameScreen.showPicture(2, item, 0, 0, 0, 100, 100, 255, 0);
	  let face      = "[NSFW]game_itazura_POV/game_itazura_fera_ImoutoFace";
	  $gameScreen.showPicture(3, face, 0, 250, 0, 100, 100, 255, 0);	  
	  let lowerBody = "[NSFW]game_itazura_POV/game_itazura_oniichan_lowerBody_NOpenis";
	  $gameScreen.showPicture(5, lowerBody, 0, 0, 380, 100, 100, 255, 0);		  
	  let eyes      = "[NSFW]game_itazura_POV/game_itazura_fera_ImoutoFace_eyes1";
	  $gameScreen.showPicture(6, eyes, 0, 700, 200, 100, 100, 255, 0);
	  let penis     = "[NSFW]game_itazura_POV/game_itazura_oniichan_lowerBody_massagePenis1";
	  $gameScreen.showPicture(7, penis, 0, 550, 380, 100, 100, 255, 0);	  
	  let hands     = "[NSFW]game_itazura_POV/game_itazura_fera_massagePenis1";
	  $gameScreen.showPicture(8, hands, 0, 550, 380, 100, 100, 255, 0);

	  QJ.MPMZ.Shoot({
		  groupName: ['fera','massagePenis'],
		  existData: [ 
		  ],
		  moveF: [
		    [90,1,QJ.MPMZ.tl.gameItazuraBlowJob,[{Blinking:true}]],
			[15,1,QJ.MPMZ.tl.gameItazuraBlowJob,[{massagePenis:true}]]
		  ]
	  });	  
};

// 哥哥自己洗头发
QJ.MPMZ.tl.oniiChanWashHair = function(extraData = {}) {
   
   if (extraData.refresh) {
	   
	  this._coolDown = this._coolDown || 0;	
	  if (this._coolDown > 0) {
	     this._coolDown -= 1;
	     return;
	  }
      this._frames = this._frames || 0; 
	  let IMG = "bathroom_event/bathroom_oniichan_washHair" + this._frames;
	  $gameScreen.showPicture(9, IMG, 0, 960, 380, 100, 100, 255, 0);

      if (!this._playback) {
   	    this._frames += 1;
	  } else {
	    this._frames -= 1;
	  }
	  if (this._frames <= -1) {
		  this._playback = false;
		  this._coolDown = Math.randomInt(4) + 4;
		  this._frames = 0;
		  return;
	  }
	  if (this._frames >= 4) {
		  this._playback = true;
		  this._coolDown = Math.randomInt(4) + 4;
		  this._frames = 3;
		  return;
	  }
	  this._coolDown = 4;
	  return;
   }

   for (let i = 0; i < 4; i++) {
       ImageManager.loadPicture("bathroom_event/bathroom_oniichan_washHair" + i);
   }
   
   QJ.MPMZ.Shoot({
	  groupName: ['oniiChanWashHair'],
      existData: [ 
	  ],
      moveF: [
        [15,0,QJ.MPMZ.tl.oniiChanWashHair,[{refresh:true}]]
      ]
   });   
   
};


// 客厅-妹妹被惊吓-女上位segs
QJ.MPMZ.tl.livingRoomImoutoScaredKijoui = function(extraData = {}) {

   if (extraData.refresh) {
	// 帧刷新流程   
	  this._coolDown = this._coolDown || 0;	
	  if (this._coolDown > 0) {
	     this._coolDown -= 1;
	     return;
	  }
	  this._frames = this._frames || 1;
      this._speed  = this._speed  || 4;	  
	  let type     = this.data.actionType || "A";	
      let target   = $gameScreen.picture(1);
      let scale    = target?._scaleX || 100;
      let posX     = scale > 50 ? 1920 : 960; 
      let posY     = scale > 50 ? 760  : 380;
  	      posX    += target?._x || -1400;
		  posY    += target?._y || -700;
	  let IMG      = `living_room/[NSFW]livingRoom_ImoutoScared_segs_action${type}` + this._frames;
	  $gameScreen.showPicture(6, IMG, 0, posX, posY, scale, scale, 255, 0);
	  
	  let seName   = `[NSFW]livingRoom_ImoutoScared_segs_${type}` + Math.randomInt(5);
	  let volume   =  80;   
	  
	  // 体外射精判断
	  if (this._sotodashi) {
		  this.setDead({t:['Time',0]});
		  const pic = $gameScreen.picture(7);
		  if (pic) {
			  pic._opacity = 255;
			  pic.setVideoPause(false);
		  }
		  $gameScreen.erasePicture(6);
		  return;	
	  }
		  
	  // 中出判断
	  if (this._shasei) {
		  this._needShasei   = undefined;
		  this._shaseiFrames = this._shaseiFrames || 1;
		  this._shaseiTimes  = this._shaseiTimes  || 0;
		  let sType          = this._shaseiTimes > 0 ? "B" : "A";
		  IMG                = `living_room/[NSFW]livingRoom_ImoutoScared_segs_action${type}_shasei${sType}` + this._shaseiFrames;
	      $gameScreen.showPicture(7, IMG, 0, posX, posY, scale, scale, 255, 0);
		  if (!this._shaseSe) {
			  // 射精音效
			  this._shaseSe   = true;
              let shaseiTimes = Math.min(2, this._shaseiTimes);			  
			  let shaseSe     = `[NSFW]livingRoom_ImoutoScared_segs_shasei` + (shaseiTimes * 2 + Math.randomInt(2));
			  AudioManager.playVoice({ name: shaseSe, volume: 60, pitch: 100, pan: 0 }, false, 7);			  
			  setTimeout( () => {
				   AudioManager.stopVoice();
				   let se = "[NSFW]living_room_watchHorrorMovie_segs" + ( 9 + Math.randomInt(2) );
				   AudioManager.playVoice({ name: se, volume: 90, pitch: 100, pan: 0 }, false, 3);
			  }, 300);		  
		  }
		  this._shaseiFrames  += 1; 
		  if (this._shaseiFrames > 8) {
			  // 射精结束
			  this._coolDown    += 9999999999;
			  this._shasei       = undefined;
			  this._needSeieki   = true;
			  this._shaseiTimes += 1;  // 射精次数+1
			  this._shaseiFrames = undefined;
			  this._shaseSe      = undefined;
              return;			  
		  }
	  }
	  if (this._needSeieki) {
		  // 射精后的精液残留图层
		  let num  = this._frames;
		  if (type == "B") num = Math.min(9, this._frames);
		  IMG      = `living_room/[NSFW]livingRoom_ImoutoScared_segs_action${type}_seieki` + num;
		  seName   = `[NSFW]livingRoom_ImoutoScared_segs_fillUp${type}` + Math.randomInt(5);
		  volume   = 45;
	      $gameScreen.showPicture(8, IMG, 0, posX, posY, scale, scale, 255, 0);
		  if (this._shaseiTimes > 1 && !this._needSeiekii) {
			  // 多次射精后的精液累加效果
			  IMG = `living_room/[NSFW]livingRoom_ImoutoScared_segs_action${type}_seiekii`;
			  $gameScreen.showPicture(9, IMG, 0, posX, posY, scale, scale, 255, 0);
			  this._needSeiekii = true;
		  }
	  }
      this._frames += 1;
      if (!this._shasei && this._frames == 9) {
      	// 播放音效
		AudioManager.playVoice({ name: seName, volume: volume, pitch: 100, pan: 0 }, false, 8);
	  }
	  
	  let limt = 9;
	  if (type == "A") limt = 12;
	  if (this._frames > limt) {		  
		  // 射精判断
		  if (this._needShasei)  this._shasei = true;
	      if (!this._shasei) {
			  this._frames = 1;
			  // 切换动作
			  if (this._needSwitch) {
				  this._needSwitch = undefined;
				  const t = this.data.actionType;
                  this.data.actionType = (t === "A") ? "B" : (t === "B") ? "A" : t;
			  }			  
		  } else {
			// 触发射精时停留在最后一帧  
			  this._frames = limt;
			  if (type == "B" && this._shasei !== undefined)  this._frames += 1; 
		  }
		  this._coolDown += this._speed;
	  }	  
	  this._coolDown += this._speed;	  
	  return; 
   }

   if (extraData.bubbleText) {
	    // 妹妹气泡文字  
		if (this._disableBubbleText || this._shasei) return;
		let textArray = window.MapEventDialogue54?.["11"]?.["34"] ?? ['Missing translation'];
		let bubbleText = textArray[Math.floor(Math.random() * textArray.length)];
		$gameTemp.drill_GFTT_setBuffer( 7, 7 );
		$gameTemp.drill_GFTT_setStyle_context(bubbleText); 
		$gameTemp.drill_GFTT_createByBuffer( [1040,90], 180 );	
        return;		
   }

   if (extraData.ejaculationCountdown) {
	  // 射精倒计时和强制射精
	   if (extraData.autoEjaculation) {		   
		   let scene = SceneManager._scene;
		   let win   = scene._messageWindow._choiceWindow;
		   if (win && win.active) {
			   extraData.autoEjaculation.autoEjaculation = true;
			   let index = Math.randomInt(2);
			   win.select(index);
			   win.processOk();
		   }		   
		   return;
	   }	
	    let waitTime = 210;
		if (ConfigManager.language > 1) waitTime = 280;
        QJ.MPMZ.Shoot({
	       groupName: ['kijoui','segs'],
           existData: [ 
		      {t:['Time',waitTime], a:['F',QJ.MPMZ.tl.livingRoomImoutoScaredKijoui,[{ejaculationCountdown:true, autoEjaculation:this}]]}
	       ],
        });	
        return;		
   }
	
   // 骑乘位动画播放器/监听器
   let listener = QJ.MPMZ.Shoot({
	                 groupName: ['kijoui','segs'],
                     existData: [ 
	                 ],
	                 actionType: "A",
                     moveF: [
                        [30,0,QJ.MPMZ.tl.livingRoomImoutoScaredKijoui,[{refresh:true}]],
						[120,180,QJ.MPMZ.tl.livingRoomImoutoScaredKijoui,[{bubbleText:true}]]
                     ]  
                  });
    this.listenerId = listener.index;
    if ($gameScreen.picture(1)) {
        $gameScreen.movePicture(1, 0, -1400, -700, 100, 100, 255, 0, 30);
    } else {
        $gameScreen.showPicture(1, 'living_room/living_S_N_RL', 0, -1400, -700, 100, 100, 255, 0);
	}		
    // 预加载
    for (let i = 1; i <= 12; i++) {
	    ImageManager.loadPicture( "living_room/[NSFW]livingRoom_ImoutoScared_segs_actionA" + i );
		ImageManager.loadPicture( "living_room/[NSFW]livingRoom_ImoutoScared_segs_actionA_seieki" + i );
     }
    for (let i = 1; i <= 8; i++) {
	    ImageManager.loadPicture( "living_room/[NSFW]livingRoom_ImoutoScared_segs_actionA_shaseiA" + i );
		ImageManager.loadPicture( "living_room/[NSFW]livingRoom_ImoutoScared_segs_actionA_shaseiB" + i );
		ImageManager.loadPicture( "living_room/[NSFW]livingRoom_ImoutoScared_segs_actionB_shaseiA" + i );
		ImageManager.loadPicture( "living_room/[NSFW]livingRoom_ImoutoScared_segs_actionB_shaseiB" + i );
     }	 
    for (let i = 1; i <= 9; i++) {
	    ImageManager.loadPicture( "living_room/[NSFW]livingRoom_ImoutoScared_segs_actionB" + i );
		ImageManager.loadPicture( "living_room/[NSFW]livingRoom_ImoutoScared_segs_actionB_seieki" + i );
     }	 
};

// 浴室素股
QJ.MPMZ.tl.bathroomSumataRiding = function(extraData = {}) {
	
   if (extraData.refresh) {

	  this._coolDown = this._coolDown || 0;	
	  if (this._coolDown > 0) {
	     this._coolDown -= 1;
	     return;
	  }
	  this._frames = this._frames || 1;
      this._speed  = this._speed  || 4;	  
	  let type     = this.data.actionType || "A";
	  let yy       = $gameScreen.picture(2)?._y || 0;
	  
	  let IMG = `bathroom_sumata/bathroom_sumata_riding${type}` + this._frames;
	  $gameScreen.showPicture(12, IMG, 0, 0, yy, 100, 100, 255, 0);
	  
	  // 素股音效
	  if (this._frames === 1) {
		 let seName = "bathroom_sumata_SE" + (1 + Math.randomInt(4));
		 if (type === "B") seName = "bathroom_sumata_SE" + (5 + Math.randomInt(5));
	     AudioManager.playVoice({ name: seName, volume: 60, pitch: 100, pan: 0 }, false, 8);
	  }
	  // 精液图层
	  if (this._seieki) {
		 this._shasei = null;	 
	     let seieki = `bathroom_sumata/bathroom_sumata_riding${type}seieki` + this._frames;
	     $gameScreen.showPicture(13, seieki, 0, 700, yy, 100, 100, 255, 0);		  		  
	  }
	  // 射精图层
	  if (this._shasei) {		  		  
		 let xx     = 700; 
         let stype   = this._shasei;		 
	     let shasei = `bathroom_sumata/bathroom_sumata_riding${type}${stype}` + this._frames;
		 if (stype === "shaseii" && this._frames === 12) {
			this._shasei = null;
			this._seieki = true;
		 }
		 if (stype === "shasei" && this._frames === 12) {
			// 进入第二段射精动画 
			this._shasei = "shaseii"; 
		 }
	     $gameScreen.showPicture(13, shasei, 0, xx, yy, 100, 100, 255, 0);	
	     // 射精音效
	     if (this._frames === 1) {
		     let seName = "bathroom_sumata_shasei1";
			 let index  = 10;
		     if (stype === "shaseii") seName = "bathroom_sumata_shasei2"; index = 11;
	         AudioManager.playVoice({ name: seName, volume: 75, pitch: 100, pan: 0 }, false, index);
	     }		 		 
	  }
	  
      this._frames += 1;
	  if (this._frames > 12) {
		  this._frames = 1;
		if (!this._shasei && this._selected) {
			if (this._selected === "auto") {
			  this.data.actionType = Math.random() > 0.5 ? "A" : "B";	
			} else {
			  this.data.actionType = this._selected; 
			}			  
	    }
	  }
	  
	  this._coolDown = this._speed;
	  if (this._frames == 1 || this._frames == 7)  this._coolDown += 3;
      return;
   }


   // 素股动画播放器/监听器
   let listener = QJ.MPMZ.Shoot({
	  groupName: ['bathroomSumataRiding'],
      existData: [ 
	  ],
	  actionType: "A",
      moveF: [
        [60,0,QJ.MPMZ.tl.bathroomSumataRiding,[{refresh:true}]]
      ],
	  moveJS: [	    
	    [120,4,`if (this._shaseiMark && !this._shasei && !this._seieki && this._frames == 1) {
			             this._shasei = 'shasei';
		            }`]
	  ]
   });
   // 标记监听器ID
   this.listenerId = listener.index;
   // 创建镜头位置标记图层
   $gameScreen.showPicture(2, "", 0, 0, 0, 100, 100, 0, 0);	
   // 预加载   
   for (let i = 1; i <= 12; i++) {
	   ImageManager.loadPicture( `bathroom_sumata/bathroom_sumata_ridingAseieki${i}` );
	   ImageManager.loadPicture( `bathroom_sumata/bathroom_sumata_ridingBseieki${i}` );
	   ImageManager.loadPicture( `bathroom_sumata/bathroom_sumata_ridingAshasei${i}` );
	   ImageManager.loadPicture( `bathroom_sumata/bathroom_sumata_ridingBshasei${i}` );
	   ImageManager.loadPicture( `bathroom_sumata/bathroom_sumata_ridingAshaseii${i}` );
	   ImageManager.loadPicture( `bathroom_sumata/bathroom_sumata_ridingBshaseii${i}` );
    }   
};


// 洗面所偷窥妹妹脱衣服拉门监听
QJ.MPMZ.tl._imoutoUtilDragToOpenWashroomDoorDetection = function (Reverse) {

    const pic = $gameScreen.picture(50);
    if (!pic) return;

    let type  = 0;
    const dx  = pic.drill_PDr_getDraggingXOffset_Private();
	
	// 被妹妹发现关上门的情形
	if (Reverse) {
		if ( (pic.drill_PDr_isDraging() && dx >= 660) ) {
			type  = 1;
		}
	}	
	
    if (pic.drill_PDr_isDraging()) {
        if      (dx < -1000) type = 1;          //  对应开门闯入
        else if (dx < -800) type = 2;          //  对应慢慢拉开门但触发了妹妹警觉
    } else if (dx < -200) {
        type = 3;                //  最低限度触发偷窥的距离
    }
    if (type === 0) return;                         

    // 锁定拖拽 
    pic.drill_PDr_setCanDrag(false);
    pic.drill_PDr_mergeDragPosition();

	// 被妹妹发现关上门的情形
	if (Reverse) {
		pic.drill_PCE_playSustainingShakeLR( 18,6,1 );		
		AudioManager.playSe({ name: "窓を閉める", volume: 70, pitch: 100, pan: 0 });
		$gameSelfSwitches.setValue([$gameMap.mapId(), 23, 'B'], false);
		$gameSelfSwitches.setValue([$gameMap.mapId(), 23, 'D'], true);
		this.setDead({t:['Time',0]});
		return;
	}
	
	let RushIn = false;
	
	if (type == 1 || pic._x < -1800) {
		RushIn = true;
        $gameSelfSwitches.setValue([$gameMap.mapId(), 23, 'B'], true);
        // 门贴图淡出 
        [49, 50].forEach(id => {
          const data = { type: 'opacity', value: -255, time: 60 };
          $gameScreen.picture(id)?._drill_PSh_commandChangeTank.push(data);
      });
        AudioManager.playSe({ name: "ふすまを開ける2", volume: 70, pitch: 100, pan: 0 });	   
    } else if (type == 2) {
        $gameSelfSwitches.setValue([$gameMap.mapId(), 23, 'B'], true);
        AudioManager.playSe({ name: "窓を閉める", volume: 70, pitch: 100, pan: 0 });	 
        pic.drill_PCE_playSustainingShakeLR( 18,6,1 );		
    } 

    // 移除模糊滤镜 
    [1, 10, 12, 13].forEach(id => {
        const p = $gameScreen.picture(id);
        if (p) {
            const filterId = `blur${id}`;
            $gameMap.moveFilter(filterId, [0], 30);
            $gameMap.eraseFilterAfterMove(filterId);
        }
    });
    // 计算偷窥成功的概率
	let result = false;
    let distance = pic._x + 920;
        distance = Math.min(Math.abs(distance), 800); 
    let adjustment = ((distance - 200) / 600) * 900;
    let probability = Math.round(100 + adjustment);
    if ( Math.randomInt(1000) > probability ) {
       result = true;
	   // 未被妹妹发现，成功偷窥
	   let pName = $gameScreen.picture(10).name();
	   if (!pName.includes("ura")) {
	   if ($gameActors.actor(2).equips()[1]) {		   
           pName = pName.replace(/_bareta$/, "_successful");
	   } else {
		   pName = "washroom_Imouto_datsui_nude_successful";
	   }
       $gameScreen.setVideoPictureName(pName, true, false);
	   $gameScreen.showPicture(10, '', 0, 960, 180, 50, 50, 255, 0);
       $gameScreen.picture(10).setVideoPause(true);		
	  }	   
    } else {
		// 背后视角被妹妹察觉时，存在特殊分歧
		let pName = $gameScreen.picture(10).name();
		if (pName.includes("ura") && $gameVariables.value(18) > 3) {
		  pName = pName.replace(/normal$/, "seduction");
		  $gameScreen.setVideoPictureName(pName, true, false);
		  $gameScreen.showPicture(10, '', 0, 1100, 180, 50, 50, 255, 0);
		  $gameScreen.picture(10).setVideoPause(true);
		}
	}
	
	$gameMap.event(23).steupCEQJ(2,{peekResult:result,isRushIn:RushIn});
	this.setDead({t:['Time',0]});
	this._end = true;
};

//妹妹胖次款式检查
QJ.MPMZ.tl._imoutoUtilPantiesTpyeCheck = function(noPrefix) {
	let type   = "whitePanties";
	let Imouto = $gameActors.actor(2);
	let pic    = $gameScreen.picture(5);

	if (Imouto.equips()[1]) {
		let itemId = Imouto.equips()[1].baseItemId;
		switch (itemId) {
                case 154: 
				type = "bluePanties";
                break;
                case 155: 
				type = "pinkPanties";			
                break;	         
		}
	}
		
    if (pic) {
	   let picName = $gameScreen.picture(5).name();
	   if (picName.includes("bluePanties")) {
		   type = "bluePanties";
	   }
	   if (picName.includes("pinkPanties")) {
		   type = "pinkPanties";
	   }	   
	   if (picName.includes("whitePanties")) {
		   type = "whitePanties";
	   }	   
	}
	
    if (!noPrefix)	type = "washroom_sis_" + type;
	return type;
};

//胖次点击判定
QJ.MPMZ.tl._imoutoUtilIconClickPanties = function() {
	
	if ($gameMessage.isBusy() || SceneManager._scene._messageWindow._choiceWindow.active) return;
	
     $gameScreen.setPictureRemoveCommon(2);
     $gameScreen.setPictureRemoveCommon(4);
     $gameScreen.setPictureRemoveCommon(5);
     $gameMap.event(6).steupCEQJ(1);	
	 this.setDead({t:['Time',0]});
	
};

//洗面所点击空白处判定
QJ.MPMZ.tl._imoutoUtilWashRoomClickBlankSpace = function() {
	
  if ($gameScreen.isPointerInnerPicture(2)) return;
  if ($gameScreen.isPointerInnerPicture(4)) return;
  if ($gameScreen.isPointerInnerPicture(7)) return;
  if ($gameScreen.isPointerInnerPicture(8)) return;
  
  if (TouchInput.drill_isLeftPressed() || TouchInput.drill_isLeftTriggered()) {

	 QJ.MPMZ.Shoot({
		groupName:['RaidoCheck'],
        img:"null1",
        position:[['M'],['M']],
        initialRotation:['S',0],
        moveType:['S',0],
        imgRotation:['F'],
        existData:[
            {t:['Time',6]},
			{t:['B',['buttonnull']],a:['F',QJ.MPMZ.tl._imoutoUtilWashRoomClickBlankSpaceEffect],p:[-1,false,true],c:['T',0,6,true]},
        ],
		collisionBox:['C',2],
     });	  

	
  }
  
};

//洗面所点击空白处判定
QJ.MPMZ.tl._imoutoUtilWashRoomClickBlankSpaceEffect = function() {
	
	if ($gameMessage.isBusy() || SceneManager._scene._messageWindow._choiceWindow.active) return;
	$gameScreen.setPictureRemoveCommon(2);
    $gameScreen.setPictureRemoveCommon(4);
    $gameScreen.setPictureRemoveCommon(5);
    $gameMap.event(3).steupCEQJ(4);	
};
	
//第一次潜入洗面所的退出判断
QJ.MPMZ.tl._imoutoUtilWashRoomFirstTimePeeking = function() {

    let condition1 = $gameSelfSwitches.value([$gameMap.mapId(), 6, 'F']);
    let condition2 = $gameSelfSwitches.value([$gameMap.mapId(), 17, 'F']);
    let condition3 = $gameSelfSwitches.value([$gameMap.mapId(), 20, 'B']);
	
        if (condition1 && condition2 && !condition3) {
            $gameSelfSwitches.setValue([$gameMap.mapId(), 20, 'B'], true);
            $gameScreen._pictureCidArray = [];
            $gameMap.event(20).steupCEQJ(1);
            this.setDead({t:['Time',0]});
        }

};

// 监听妹妹洗澡时间阶段
QJ.MPMZ.tl._imoutoUtilWashRoomPeekingTimeCalculation = function() {
	
    // 若尚未设置过基准时间
    if (!this._fixedHour && !this._fixedMinute) {
        const currentHour = $gameSystem.hour();
        const currentMinute = $gameSystem.minute();
        let newMinute = currentMinute + 25;
        let newHour   = currentHour;
        if (newMinute >= 60) {
            newMinute -= 60;
            newHour += 1;
        }
        this._fixedHour = newHour;
        this._fixedMinute = newMinute;
		this._eventLevel = this._eventLevel || 1;
    }

    // 当前时间(总分钟)
    const nowTotal = $gameSystem.hour() * 60 + $gameSystem.minute();
    // 目标时间(总分钟)
    const fixedTotal = this._fixedHour * 60 + this._fixedMinute;
    // 剩余多少分钟
    let remain = fixedTotal - nowTotal;
    // 妹妹出浴
    if (remain <= 0) {
       $gameVariables.setValue(19, 99999);	
	   $gameMap.event(7).steupCEQJ(1);	
       this.setDead({t:['Time',0]});
        return;
    }
	// 分阶段划分妹妹的行动
    const passed = 25 - remain;	
    let currentLevel;
    if (passed < 3) {
        currentLevel = 1;
    } else if (passed < 6) {
        currentLevel = 2;
    } else if (passed < 9) {
        currentLevel = 3;
    } else if (passed < 12) {
        currentLevel = 4;
    } else if (passed < 15) {
        currentLevel = 5;
    } else if (passed < 18) {
        currentLevel = 6;
	} else if (passed < 21) {
		// 妹妹开始泡澡
		$gameSelfSwitches.setValue([$gameMap.mapId(), 17, 'D'], true);
		currentLevel = 7;
    } else if (passed < 24) {
		$gameSelfSwitches.setValue([$gameMap.mapId(), 17, 'D'], true);
		currentLevel = 8;
    } else {	
		$gameSelfSwitches.setValue([$gameMap.mapId(), 17, 'D'], true);		
		currentLevel = 9;
	} 
    // 阶段检查
    if (this._eventLevel !== currentLevel) {
        $gameMap.event(29).steupCEQJ(1);
    }	

    // 适配洗发水事件
    if (currentLevel >= 2 && $gameSelfSwitches.value([4, 14, 'B'])) {
        $gameSelfSwitches.setValue([$gameMap.mapId(), 6, 'D'], true);
    }	
	
	// 记录阶段和剩余时间
	this._eventLevel = currentLevel;
	this._remainTime = remain;
	
};

//浴室花洒动画播放器
QJ.MPMZ.tl.bathroomShowerheadAnimation = function() {
   this._frames = this._frames || 0;
   var IMG;
   if ($gameScreen.picture(40) && $gameScreen.picture(40).name().includes("actionH")) {
         IMG = "ShowerheadB" + this._frames;
    } else {
         IMG = "ShowerheadA" + this._frames;
    }
	
   var path = "washroom_nozoku";
   $gameScreen.showPictureFromPath(45, path, IMG, 0, 0, 0, 100, 100, 255, 0);
   
   this._frames += 1;
   if (this._frames >= 8) this._frames = 0;
   
};

//浴室花洒动画
QJ.MPMZ.tl.bathroomShowerheadAnimationPlayer = function() {

    if($gameMap.getGroupBulletListQJ('showerhead').length > 0) return;
	
    QJ.MPMZ.Shoot({
        img:"null1",
		groupName:['showerhead'],
        position:[['P'],['P']],
        initialRotation:['S',0],
        imgRotation:['F'],
        collisionBox:['C',1],
        moveType:['D',false],
		immuneTimeStop:true,
        existData:[	
        ],
		moveF:[
			[6,6,QJ.MPMZ.tl.bathroomShowerheadAnimation], 
		],
		deadJS:["$gameScreen.erasePicture(45)"]
    });
	
};

// 妹妹一个人泡澡的泡泡动画
QJ.MPMZ.tl._imoutoUtilBathRoomSoloOfuroBubble = function() {
	
	this._coolDown = this._coolDown || 0;	
	if (this._coolDown > 0) {
	   this._coolDown -= 1;
	   return;
	}
	
	this._frames = this._frames || 1;
	
	if (!$gameScreen.picture(10) || !$gameScreen.picture(10).name().includes("solo_bubble")) {
	var IMG = 'bathroom_sis_solo_bubble1';
	$gameScreen.showPictureFromPath(10, "bathroom_event", IMG, 0, 0, 540, 50, 50, 255, 0);
	} else {
    var IMG = "bathroom_event/bathroom_sis_solo_bubble" + this._frames;
    $gameScreen.changePictureName(10, IMG);
    $gameScreen.picture(10)._opacity = 255;	
	}
	
	this._frames += 1;
	this._coolDown = 4;
	
	if (this._frames >= 8) {
	  $gameScreen.picture(10)._opacity = 0;
	  this._frames = 1;	
      this._coolDown = 30 + Math.randomInt(20);
	}	
	
};

// 妹妹一个人泡澡的摇头哼歌动画
QJ.MPMZ.tl._imoutoUtilBathRoomSoloHumming = function() {
	
	this._coolDown = this._coolDown || 0;	
	if (this._coolDown > 0) {
	   this._coolDown -= 1;
	   return;
	}

    if (this._startSmile) {
	 this._startSmile = false;
	 this._eyesOpened = true;
	 var IMG = "bathroom_sis_solo_smile";
	 $gameScreen.showPictureFromPath(8, "bathroom_event", IMG, 0, 0, 540, 50, 50, 255, 0);
	 this._coolDown = 60;
	 return;
	}
	
	this._frames = this._frames || 4;
	
	if (!this._backwards && this._switchSmile && this._frames == 5) {
	  this._switchSmile = false;	
	  this._coolDown = 6;
	  this._frames = 4;
      this._startSmile = true;
	  return;
	}
	
	var action;
	  if (this._eyesOpened) {
          action = 'bathroom_sis_solo_shake_eyesOpened';
	  } else {
          action = 'bathroom_sis_solo_shake_eyesClosed';
	  }		
	if (!$gameScreen.picture(8) || !$gameScreen.picture(8).name().includes("solo_shake")) {	  		
	var IMG = action + this._frames;
	$gameScreen.showPictureFromPath(8, "bathroom_event", IMG, 0, 0, 540, 50, 50, 255, 0);
	} else {
    var IMG = "bathroom_event/" + action + this._frames;
    $gameScreen.changePictureName(8, IMG);
	}
	
	if (this._backwards) {
	this._frames -= 1;
	} else {
	this._frames += 1;	
	}
	this._coolDown = 2;

	if (this._backwards && this._frames <= 0 ) {
	  this._frames += 1;	
	  this._backwards = false;
      this._coolDown = 3 + Math.randomInt(3);	  
	}
	
	if (this._frames >= 8 ) {
	  this._frames -= 1;
	  this._backwards = true;	
      this._coolDown = 3 + Math.randomInt(3);	  
	}	
	
};

// 妹妹一个人泡澡的笑眯眯动画
QJ.MPMZ.tl._imoutoUtilBathRoomSoloSmile = function() {
	
	if (!$gameScreen.picture(8) || !$gameScreen.picture(8).name().includes("solo_smile")) {
	var IMG = 'bathroom_sis_solo_smile' + this._frames;
	$gameScreen.showPictureFromPath(8, "bathroom_event", IMG, 0, 0, 540, 50, 50, 255, 0);
	} else {
    var IMG = "bathroom_event/bathroom_sis_solo_smile" + this._frames;
    $gameScreen.changePictureName(8, IMG);
	}	
	
	
};

// 妹妹一个人泡澡玩小黄鸭动画
QJ.MPMZ.tl._imoutoUtilBathRoomSoloPlayingRubberDuck = function() {
	
	this._coolDown = this._coolDown || 0;	
	if (this._coolDown > 0) {
	   this._coolDown -= 1;
	   return;
	}
	
	this._frames = this._frames || 2;
	
	if (!$gameScreen.picture(5) || !$gameScreen.picture(5).name().includes("playWithRubberDuck")) {
	var IMG = 'bathroom_sis_solo_playWithRubberDuck' + this._frames;
	$gameScreen.showPictureFromPath(5, "bathroom_event", IMG, 0, 0, 540, 50, 50, 255, 0);
	} else {
    var IMG = "bathroom_event/bathroom_sis_solo_playWithRubberDuck" + this._frames;
    $gameScreen.changePictureName(5, IMG);
	}
	
	if (this._backwards) {
	this._frames -= 1;
	} else {
	this._frames += 1;	
	}
	this._coolDown = 2;

	if (this._backwards && this._frames <= 1 ) {
	  this._frames += 1;	
	  this._backwards = false;
      this._coolDown = 2 + Math.randomInt(3);	  
	}
	
	if (this._frames >= 7 ) {
	  this._frames -= 1;
	  this._backwards = true;	
      this._coolDown = 2 + Math.randomInt(3);	  
	}	
	
};


// 妹妹喝可乐
QJ.MPMZ.tl._imoutoUtilImoutoDrinksCola = function() {
	//console.log(this._coolDown);
	this._coolDown = this._coolDown || 0;	
	if (this._coolDown > 0) {
	   this._coolDown -= 1;
	   return;
	}
	
	this._frames = this._frames || 1;
	var lang = ConfigManager.language;
	if (lang > 2) lang = 2;
	var text = "";
	
	if (this._fizzingUp) {
		QJ.MPMZ.tl._imoutoUtilImoutoDrinksColaFizzingUp.call(this);
		return;
	}
	
	var IMG = "sis_room_drinkCola/sis_room_hotWeather_cola" + this._frames;
	$gameScreen.showPicture(6, IMG, 0, 600, 300, 50, 50, 255, 0);
	
    // 拿到可乐停顿
	if ( this._frames == 4 || this._frames == 11 || this._frames == 14 || this._frames == 15 ) {
		this._coolDown += 10;
	}	

	if ( this._frames == 13 ) {
		this._coolDown += 90;
			switch (lang) {
                case 0: 
                text = "我开动了|";
                break;
                case 1: 
                text = "いただきます|";
                break;	
                case 2: 
                text = "Itadakimasu!";
                break;	            
			}
          let posX = 850 + Math.randomInt(180);
		  let posY = 400 + Math.randomInt(80);
          QJ.MPMZ.tl._imoutoUtilCustomMoodText(posX,posY,text);	
		  var voice = { name: "hotWeatherEvent_31", volume: 90, pitch: 100, pan: 0 };
          AudioManager.playVoice(voice, false, 2);  
		
	}

    // 旋瓶盖，循环动作
	if (this._frames == 8) {
		this._loopType1 = this._loopType1 || 3;
		if (this._loopType1 > 1) {
			this._loopType1 -= 1;
			this._frames = 6;
			this._coolDown += 35;
			    // 旋瓶盖音效
			if (!this._loopType1Voice) {
			   var voice = { name: "hotWeatherEvent_32", volume: 90, pitch: 100, pan: 0 };
               AudioManager.playVoice(voice, false, 2);
			   this._loopType1Voice = true;
			}
					
		}
		// 摇可乐导致喷发
		if (this.data.fizzingUp && this._loopType1 && this._loopType1 == 1 ) {
		   this._fizzingUp = true;
	   }
		
	}

    // 喝可乐第一阶段
	if (this._frames == 17) {
		this._loopType2 = this._loopType2 || 4;
		if (this._loopType2 > 1) {
			this._loopType2 -= 1;
			this._frames = 15;
			this._coolDown += 15;
			this._moodText = true;
		}
	}

    // 喝可乐第二阶段
	if (this._frames == 19) {
		this._loopType3 = this._loopType3 || 4;
		if (this._loopType3 > 1) {
			this._loopType3 -= 1;
			this._frames = 17;
			this._coolDown += 15;
			this._moodText = true;
		}
	}

    // 喝可乐第三阶段
	if (this._frames == 21) {
		this._loopType4 = this._loopType4 || 4;
		if (this._loopType4 > 1) {
			this._loopType4 -= 1;
			this._frames = 19;
			this._coolDown += 15;
			this._moodText = true;
		}
	}

    // 喝可乐第四阶段
	if (this._frames == 23) {
		this._loopType5 = this._loopType5 || 4;
		if (this._loopType5 > 1) {
			this._loopType5 -= 1;
			this._frames = 21;
			this._coolDown += 15;
			this._moodText = true;
		}
	}
	
    // 喝可乐第五阶段
	if (this._frames == 25) {
		this._loopType6 = this._loopType6 || 4;
		if (this._loopType6 > 1) {
			this._loopType6 -= 1;
			this._frames = 23;
			this._coolDown += 15;
			this._moodText = true;
		}
	}

		if ( this._moodText && Math.random() > 0.3 )	{
			switch (lang) {
                case 0: 
                text = "咕咚|";
                break;
                case 1: 
                text = "ゴクン|";
                break;	
                case 2: 
                text = "Gulp~";
                break;	            
			}
          let posX = 850 + Math.randomInt(180);
		  let posY = 400 + Math.randomInt(80);
          QJ.MPMZ.tl._imoutoUtilCustomMoodText(posX,posY,text);	
		  var sname = "hotWeatherEvent_33_" + Math.randomInt(5);
		  var voice = { name: sname, volume: 90, pitch: 100, pan: 0 };
          AudioManager.playVoice(voice, false, 2); 		  
          this._moodText = undefined;		  
		}

	if ( this._frames == 27 ) {
		this._coolDown += 60;
			switch (lang) {
                case 0: 
                text = "噗哈|";
                break;
                case 1: 
                text = "ぷはぁ|";
                break;	
                case 2: 
                text = "Puhah—";
                break;	            
			}
          let posX = 850 + Math.randomInt(180);
		  let posY = 400 + Math.randomInt(80);
          QJ.MPMZ.tl._imoutoUtilCustomMoodText(posX,posY,text);	
		  var sname = "hotWeatherEvent_34_" + Math.randomInt(2);
		  var voice = { name: sname, volume: 90, pitch: 100, pan: 0 };
          AudioManager.playVoice(voice, false, 2); 			  
		
	}


   // 喝饱了
	if (this._frames >= 28) {
		if ($gameMap.mapId() === 4) {
			$gameSelfSwitches.setValue([$gameMap.mapId(), 50, 'C'], false);	
		} else {
			$gameSelfSwitches.setValue([$gameMap.mapId(), 9, 'C'], false);
		}	
	    this._coolDown += 120;		
			switch (lang) {
                case 0: 
                text = "嗝|";
                break;
                case 1: 
                text = " ゲップ|";
                break;	
                case 2: 
                text = "Burp~";
                break;	            
			}
          let posX = 850 + Math.randomInt(180);
		  let posY = 400 + Math.randomInt(80);
          QJ.MPMZ.tl._imoutoUtilCustomMoodText(posX,posY,text);	
		  var sname = "hotWeatherEvent_35_" + Math.randomInt(2);
		  var voice = { name: sname, volume: 90, pitch: 100, pan: 0 };		  
		  AudioManager.playVoice(voice, false, 2); 
	      this.setDead({t:['Time',0]});		
	}

    if (this._frames >= 16) {
	this._coolDown += 5;	
	}
	
   	this._frames += 1;
	this._coolDown += 5;	
	
};

// 可乐喷射
QJ.MPMZ.tl._imoutoUtilImoutoDrinksColaFizzingUp = function() {

	var lang = ConfigManager.language;
	if (lang > 2)  lang = 2;
	var text = "";
	
    // 喝可乐
	var IMG = "sis_room_hotWeather_colaFizzingUp" + this._frames;
	$gameScreen.showPictureFromPath(6, "sis_room_drinkCola", IMG, 0, 600, 300, 50, 50, 255, 0);
	
    // 拿到可乐停顿
	if ( this._frames == 7 ) {
		this._coolDown += 30;
    // 可乐冒气
	var IMG1 = "sis_room_hotWeather_colaFizzingUp_bubbles";
	$gameScreen.showPictureFromPath(7, "sis_room_drinkCola", IMG1, 0, 834, 511, 50, 50, 0, 0);
	   var pic = $gameScreen.picture(7);
      if (pic) {
		  $gameScreen.movePicture(7, pic.origin(), pic.x(), pic.y(), pic.scaleX(), pic.scaleY(), 255, 0, 60);
	  }
	  
		  var voice = { name: "hotWeatherEvent_37_0", volume: 90, pitch: 100, pan: 0 };		  
		  AudioManager.playVoice(voice, false, 2); 	  
	  
	}
	if ( this._frames == 8 ) {
		this._coolDown += 40;
		
		if (!this._switchFrames) {
			switch (lang) {
                case 0: 
                text = "...呼诶？";
                break;
                case 1: 
                text = "...ふえっ？";
                break;	
                case 2: 
                text = "...Huh?";
                break;	            
			}
          let posX = 850 + Math.randomInt(180);
		  let posY = 400 + Math.randomInt(80);
          QJ.MPMZ.tl._imoutoUtilCustomMoodText(posX,posY,text);	
		  var voice = { name: "hotWeatherEvent_36", volume: 90, pitch: 100, pan: 0 };		  
		  AudioManager.playVoice(voice, false, 3); 		  


      // 用嘴堵住可乐
	    var condition = $gameSelfVariables.value([1, 2, 'colaSpray']) > 1;
        if ( condition && Math.random() > 0.25 ) {
			$gameMap.event(9).steupCEQJ(5);
			this.setDead({t:['Time',0]});
		}
		  
	}		
		
		
		if (this._switchFrames) {
			this._coolDown += 20;
			this._frames = 14;
	        return;			
		}
	}	

    // 可乐喷射动画
	if (this._frames == 13) {
		this._loopType2 = this._loopType2 || 24;
		if (this._loopType2 > 1) {
			this._loopType2 -= 1;
			this._frames = 10;
			this._coolDown -= 2;
		}

			    // 可乐喷射音效
			if (!this._loopType2Voice) {
			   var voice = { name: "hotWeatherEvent_37_1", volume: 90, pitch: 100, pan: 0 };
               AudioManager.playVoice(voice, false, 2);
			   this._loopType2Voice = true;
			}
		
		if (this._loopType2 == 6) {
       // 弄湿衣服的演出
	   var IMG1 = "sis_room_hotWeather_colaFizzingUp_wet";
	   $gameScreen.showPictureFromPath(8, "sis_room_drinkCola", IMG1, 0, 810, 481, 50, 50, 0, 0);
	      var pic = $gameScreen.picture(8);
         if (pic) {
		  $gameScreen.movePicture(8, pic.origin(), pic.x(), pic.y(), pic.scaleX(), pic.scaleY(), 255, 0, 60);
	      }
		}		
		
		if (this._loopType2 == 1) {
			this._frames = 7;
			this._switchFrames = true;
		}
	}

	if ( this._frames == 14 ) {
		
			switch (lang) {
                case 0: 
                text = "...哥哥";
                break;
                case 1: 
                text = "...お兄ちゃん";
                break;	
                case 2: 
                text = "...Onii-chan";
                break;	            
			}
          let posX = 850 + Math.randomInt(180);
		  let posY = 400 + Math.randomInt(80);
          QJ.MPMZ.tl._imoutoUtilCustomMoodText(posX,posY,text);	
		  var voice = { name: "hotWeatherEvent_38", volume: 90, pitch: 100, pan: 0 };
          AudioManager.playVoice(voice, false, 2);		  
		
		this._coolDown += 120;
	}

	if ( this._frames == 15 ) {
		this._frames = 0;
		this._coolDown += 180;	
		if ($gameMap.mapId() === 4) {
			$gameSelfSwitches.setValue([$gameMap.mapId(), 50, 'C'], false);	
		} else {
			$gameSelfSwitches.setValue([$gameMap.mapId(), 9, 'C'], false);
		}
					
	    this.setDead({t:['Time',0]});	
		
			switch (lang) {
                case 0: 
                text = "是哥哥搞得恶作剧吧！？";
                break;
                case 1: 
                text = "お兄ちゃんのイタズラでしょ！？";
                break;	
                case 2: 
                text = "This was your prank, wasn’t it!?";
                break;	            
			}
          let posX = 850 + Math.randomInt(180);
		  let posY = 400 + Math.randomInt(80);
          QJ.MPMZ.tl._imoutoUtilCustomMoodText(posX,posY,text);	
		  var voice = { name: "hotWeatherEvent_39", volume: 90, pitch: 100, pan: 0 };
          AudioManager.playVoice(voice, false, 2);			  
		  this.setDead({t:['Time',0]});	
	}

   	this._frames += 1;
	this._coolDown += 5;	
};

// 侧视角懵懂妹妹手交
QJ.MPMZ.tl._imoutoUtilWashRoomImoutoTekokiSideviewAction = function() {
	
	this._coolDown = this._coolDown || 0;	
	if (this._coolDown > 0) {
	   this._coolDown -= 1;
	   return;
	}
	
	this._frames = this._frames || 1;
	this._speed = this._speed || 4;

	var IMG = "washroom_tekoki/washroom_tekoki_sideview_action" + this._frames;
	$gameScreen.showPicture(25, IMG, 0, 0, 540, 100, 100, 255, 0);

    if (!$gameScreen.picture(24)) {	
		// 腮红		
        QJ.MPMZ.Shoot({
            groupName: ['blush'],
            img: "imoutoUtil/washroom_tekoki_sideview_blush",
            position: [['S',989], ['S',384]],
            initialRotation: ['S', 0],
            imgRotation: ['F'],
            opacity: 1,
            scale: 1,
			onScreen:true,
            anchor: [0, 0],
            moveType: ['S', 0],
            collisionBox: ['C', 1],
            existData: [
			
			],
			timeline:['S',0,12,[-1,1,6]],
			z:"A",
        }); 		
		$gameScreen.showPicture(24, "washroom_tekoki/washroom_tekoki_sideview_back", 0, 920, 0, 100, 100, 255, 0);
		// 初始需要保持静止帧状态
		this._coolDown = 99999;
		return;
	}

    if (this._frames == 2 && this._shasei) {   
		  // 满足条件切入射精动画
		  $gameSwitches.setValue(125, false);
		  let pid = 23;
		  $gameScreen.setVideoPictureName("washroom_tekoki_shasei_sideview", true, false);
		  $gameScreen.showPicture(pid, '', 0, 0, 0, 100, 100, 255, 0);
		  
          if ($gameScreen.picture(pid)) {
            $gameScreen.picture(pid).setVideoLoop(false);
            $gameScreen.picture(pid).setVideoPause(true);
          }		  
          QJ.MPMZ.Shoot({
             img:"null1",groupName: ['sideview'],
             existData: [ 
			   {t:['SW',125,true],a:['S',`$gameScreen.picture(${pid}).setVideoPause(false);$gameScreen.erasePicture(24);$gameScreen.erasePicture(25);QJ.MPMZ.deleteProjectile('blush')`],c:['T',0,6,true]}
			 ],
          });
		  $gameMap.event(13).steupCEQJ(3);
          this.setDead({t:['Time',0]}); 		  	   
	}

	if (this._frames == 2) {
		this._coolDown += 4 + Math.randomInt(4);
	}
	if (this._frames == 6) {
		this._coolDown += Math.randomInt(8);
	}


	if (this._frames >= 8) {
		this._coolDown += this._speed;
		this._frames = 2;
		return;
	}	

   	this._frames += 1;
	this._coolDown += this._speed;	
	
};


// 哥哥胖次自慰动画
QJ.MPMZ.tl._imoutoUtilOniichanPantiesOnanii = function() {

	this._coolDown = this._coolDown || 0;
    this._passedTime = this._passedTime || 0;	
	if (this._coolDown > 0) {
	   this._coolDown -= 1;
	   this._passedTime += 1;
	   return;
	}
	
	this._frames = this._frames || 0;
	this._speed = this._speed || 4;
	var value;
	var bareta = $gameSelfSwitches.value([$gameMap.mapId(), 6, 'D']);
	var type = QJ.MPMZ.tl._imoutoUtilPantiesTpyeCheck(true);
	    type = "washroom_onichann_" + type + "_onani";
	var IMG = type + this._frames;
	$gameScreen.showPictureFromPath(22, "washroom_event", IMG, 0, 0, 0, 100, 100, 255, 0);

	
    // 时间流逝和妹妹警戒度变化
	if (!bareta && !this._zetchou && this._passedTime > 180) {
        this._passedTime = 0;
		chahuiUtil.systemTimeProgression(1);
		$gameMap.steupCEQJ(8,1);
		value = $gameVariables.value(19);
		let skillFix = 100 - (15 * $gameParty.leader().skillMasteryLevel(10));
		let boost = (4 + Math.randomInt(6)) * skillFix;
		value += Math.max(1,boost);
		$gameVariables.setValue(19, value);	
		if ($gameSelfSwitches.value([4, 14, 'B']))  value += 7000;
		if (value >= 9500) {
			$gameSelfSwitches.setValue([$gameMap.mapId(), 6, 'D'], true);
			$gameMap.event(16).steupCEQJ(1);
		}
	}
    // 哥哥快感计量条结算
    if (!bareta && !this._zetchou && this._frames == 0 && Math.random() > 0.5 ) {
		value = $gameVariables.value(25);
		value += 1;
        $gameVariables.setValue(25, value);	
       if (value > 120 && !$gameSelfSwitches.value([$gameMap.mapId(), 7, 'D'])) {
          this._speed = 1;
		  this._zetchou = true;
		  $gameMap.event(18).steupCEQJ(1);
	   }		   
	}

    // 切换射精演出
    if ( !bareta && this._shasei && this._frames == 5 ) {
		$gameMap.event(18).steupCEQJ(2);
		this.setDead({t:['Time',0]});
	}
	
	if (this._backwards) {
	this._frames -= 1;
	} else {
	this._frames += 1;	
	}
	this._coolDown = this._speed;

	if ( this._backwards && this._frames <= -1 ) {
	  this._frames = 0;	
	  this._backwards = false;
      this._coolDown = this._speed + Math.randomInt(2);	  
	}
    // 变速播放分歧
    if (this._backwards && this._frames <= 3 && Math.random() > 0.8 ) {
	  this._frames = 0;  
	  this._coolDown = this._speed;
      return;	  
	}
	
	if ( this._frames >= 6 ) {
	  this._frames -= 1;
	  this._backwards = true;	
      this._coolDown = this._speed + Math.randomInt(2);	
	}	
};

// 洗面所手交事件-妹妹的红晕
QJ.MPMZ.tl._imoutoUtilWashRoomImoutoTekokiBlush = function() {
	
        QJ.MPMZ.Shoot({
            groupName: ['blush'],
            img: "imoutoUtil/washroom_tekoki_blush",
            position: [['S',0], ['S',0]],
            initialRotation: ['S', 0],
            imgRotation: ['F'],
            opacity: 1,
            scale: 1,
			onScreen:true,
            anchor: [0, 0],
            moveType: ['S', 0],
            collisionBox: ['C', 1],
            existData: [
			
			],
			timeline:['S',0,12,[-1,1,6]],
			z:"A",
        });  
		
};


// 洗面所手交事件-妹妹的呼吸气雾
QJ.MPMZ.tl._imoutoUtilWashRoomImoutoTekokiVisibleBreath = function() {
	
	this._coolDown = this._coolDown || 0;	
	if (this._coolDown > 0) {
	   this._coolDown -= 1;
	   return;
	}
	
	this._frames = this._frames || 0;
	
	var IMG = "washroom_tekoki/washroom_tekoki_visibleBreath" + this._frames;
	var index = 11;	
	$gameScreen.showPicture(index, IMG, 0, 0, 0, 100, 100, 255, 0);
	
	this._frames += 1;
	this._coolDown = 4;
	// 执行不透明度淡出指令
	if (this._frames >= 8) {
		var pic = $gameScreen.picture(index);
		if (pic) $gameScreen.movePicture(index, pic.origin(), pic.x(), pic.y(), pic.scaleX(), pic.scaleY(), 0, 0, 60);
	    this._frames = 0;	
        this._coolDown = 32;
	}	
	
};

// 洗面所手交事件-妹妹的撸撸动作
QJ.MPMZ.tl._imoutoUtilWashRoomImoutoTekokiAction = function(type) {
	
	if (!type) return;
	var index = 18;
	
	let noPanties = $gameVariables.value(18) >= 4;
	
	if (noPanties) {
	    index = 15;
		type = "washroom_tekoki_penis";
	} else {
    switch (type) {
        case "bluePanties":  
            type = "washroom_tekoki_bluePanties";
            break;
        case "pinkPanties":  
            type = "washroom_tekoki_pinkPanties";
            break;
        case "whitePanties":  
            type = "washroom_tekoki_whitePanties";
            break;
        default: 
            type = "washroom_tekoki_whitePanties";
            break;
        }
	}
		
	this._coolDown = this._coolDown || 0;	
	if (this._coolDown > 0) {
	   this._coolDown -= 1;
	   return;
	}
	
	this._frames = this._frames || 0;
	this._speed = this._speed || 5;
    
	if (!noPanties) {
	  let panties = type + this._frames;
	  $gameScreen.showPictureFromPath(19, "washroom_tekoki", panties, 0, 360, 0, 100, 100, 255, 0);
	}

	var IMG2 = "washroom_tekoki_hand" + this._frames;
	$gameScreen.showPictureFromPath(16, "washroom_tekoki", IMG2, 0, 360, 0, 100, 100, 255, 0);
	//$gameScreen.picture(12).drill_PLAZ_setLayer( "最顶层" );
	
	var IMG1 = type + this._frames;
	$gameScreen.showPictureFromPath(index, "washroom_tekoki", IMG1, 0, 360, 0, 100, 100, 255, 0);
	//$gameScreen.picture(index).drill_PLAZ_setLayer( "最顶层" );

    if (this._frames == 5) {   
       if ( $gameVariables.value(25) > 40 ) {
		  // 满足条件后切换到第二个动作
          QJ.MPMZ.Shoot({
             img:"null1",groupName: ['tekokiAction2'],
             existData: [ ],
             moveF:[
               [this._speed,0,QJ.MPMZ.tl._imoutoUtilWashRoomImoutoTekokiAction2,[noPanties,type]]
             ],
          });
          this.setDead({t:['Time',0]}); 		  
	   }
	}

	if (this._frames >= 9) {
		this._speed = 3 + Math.randomInt(5);
		this._coolDown = this._speed;
		this._frames = 0;
		return;
	}	

   	this._frames += 1;
	this._coolDown = this._speed;

    // 后续动作关键帧的预加载
	if (!this._preload && !noPanties) {
		this._preload = true;
		// 动作音效
		let	voice = { name: "washroom_event_sis_tekoki_panties1", volume: 90, pitch: 100, pan: 0 };
    	AudioManager.playVoice(voice, true, 3);
		let action = type.replace(/(tekoki_)/, '$1action2_');
		for (let i = 1; i <= 26; i++) {
           ImageManager.loadPicture(`washroom_tekoki/${action}_` + i);
		   ImageManager.loadPicture("washroom_tekoki/washroom_tekoki_action2_" + i);
        }
	}
	
    // 和白手套冲突的临时对策
	if (!this._conflict) {	
	   this._conflict = true;    
	   if ( $gameParty.leader().hasSkill(61) ) {
		  if ($gameMap.getGroupBulletListQJ('imoutoUtil').length > 0) { 
		     let bullets = $gameMap.getGroupBulletListQJ('imoutoUtil');
			     bullets.forEach(bid => {
                 let bullet = $gameMap._mapBulletsQJ[bid];
                     if (bullet) {
                          bullet._skillEffect61 = true;
                      }
                }); 
		  }
		  $gameVariables.setValue(25, 39);
	  }             
    }	
	
};

// 洗面所手交事件-妹妹第二动作
QJ.MPMZ.tl._imoutoUtilWashRoomImoutoTekokiAction2 = function(noPanties,type) {
	
	this._coolDown = this._coolDown || 0;	
	if (this._coolDown > 0) {
	   this._coolDown -= 1;
	   return;
	}
	
	$gameScreen.erasePicture(16);
	$gameScreen.erasePicture(18);
	
	this._frames = this._frames || 1;
	this._speed = this._speed || 5;


	if (!noPanties) {
	  let action = type.replace(/(tekoki_)/, '$1action2_');
	  let panties = action + "_" + this._frames; 
	  $gameScreen.showPictureFromPath(19, "washroom_tekoki", panties, 0, 360, 0, 100, 100, 255, 0);
	}
	
    // 手的动作
	var IMG2 = "washroom_tekoki_action2_" + this._frames;
	$gameScreen.showPictureFromPath(15, "washroom_tekoki", IMG2, 0, 360, 0, 100, 100, 255, 0);

    if (this._frames == 23) {   
       if ( $gameVariables.value(25) > 50) {
		  // 满足条件后切换到第三个动作
          QJ.MPMZ.Shoot({
             img:"null1",groupName: ['tekokiAction3'],
             existData: [ ],
             moveF:[
               [this._speed,0,QJ.MPMZ.tl._imoutoUtilWashRoomImoutoTekokiAction3,[noPanties,type]]
             ],
          });
          this.setDead({t:['Time',0]}); 		  
	   }
	}

	if (this._frames >= 26) {
		this._coolDown = 5;
		this._frames = 8;
		return;
	}	

   	this._frames += 1;
	this._coolDown = this._speed;

    // 后续动作关键帧的预加载
	if (!this._preload && !noPanties) {
		this._preload = true;
        AudioManager.stopVoice(null, 3);		
		let action = type.replace(/(tekoki_)/, '$1action3_');
		for (let i = 1; i <= 44; i++) {
           ImageManager.loadPicture(`washroom_tekoki/${action}_` + i);
		   ImageManager.loadPicture("washroom_tekoki/washroom_tekoki_action3_" + i);
        }
	}
	
	if (!this._preVoice && !noPanties && this._frames > 7) {
		// 动作音效
		this._preVoice = true;
		let	voice = { name: "washroom_event_sis_tekoki_panties2", volume: 70, pitch: 100, pan: 0 };
    	AudioManager.playVoice(voice, true, 3);		
	}	
};

// 洗面所手交事件-妹妹第三动作
QJ.MPMZ.tl._imoutoUtilWashRoomImoutoTekokiAction3 = function(noPanties,type) {
	
	this._coolDown = this._coolDown || 0;	
	if (this._coolDown > 0) {
	   this._coolDown -= 1;
	   return;
	}
	
	this._frames = this._frames || 1;
	this._speed = this._speed || 5;

	if (!noPanties) {
	  let action = type.replace(/(tekoki_)/, '$1action3_');
	  let panties = action + "_" + this._frames; 
	  $gameScreen.showPictureFromPath(19, "washroom_tekoki", panties, 0, 360, 0, 100, 100, 255, 0);
	}
	
    // 手的动作
	var IMG2 = "washroom_tekoki_action3_" + this._frames;
	$gameScreen.showPictureFromPath(15, "washroom_tekoki", IMG2, 0, 360, 0, 100, 100, 255, 0);

	if (this._frames >= 44) {
		
       if ( $gameVariables.value(25) > 70) {
		  // 满足条件后切换到第四个动作
          QJ.MPMZ.Shoot({
             img:"null1",groupName: ['tekokiAction4'],
             existData: [ ],
             moveF:[
               [this._speed,0,QJ.MPMZ.tl._imoutoUtilWashRoomImoutoTekokiAction4,[noPanties,type]]
             ],
          });
          this.setDead({t:['Time',0]}); 		  
	   }
	   
		this._coolDown = 5;
		this._frames = 16;
		return;
	}	

   	this._frames += 1;
	this._coolDown = this._speed;

    // 后续动作关键帧的预加载
	if (!this._preload && !noPanties) {
		this._preload = true;
        AudioManager.stopVoice(null, 3);			
		let action = type.replace(/(tekoki_)/, '$1action4_');
		for (let i = 1; i <= 28; i++) {
           ImageManager.loadPicture(`washroom_tekoki/${action}_` + i);
		   ImageManager.loadPicture("washroom_tekoki/washroom_tekoki_action4_" + i);
        }
	}
	
	if (!this._preVoice && !noPanties && this._frames > 15) {
		// 动作音效
		this._preVoice = true;
		let	voice = { name: "washroom_event_sis_tekoki_panties3", volume: 70, pitch: 100, pan: 0 };
    	AudioManager.playVoice(voice, true, 3);		
	}	
};

// 洗面所手交事件-妹妹第四动作
QJ.MPMZ.tl._imoutoUtilWashRoomImoutoTekokiAction4 = function(noPanties,type) {
	
	this._coolDown = this._coolDown || 0;	
	if (this._coolDown > 0) {
	   this._coolDown -= 1;
	   return;
	}
	
	this._frames = this._frames || 1;
	this._speed = this._speed || 5;
	this._times = this._frames || 1;
	
	if (!noPanties) {
	  let action = type.replace(/(tekoki_)/, '$1action4_');
	  let panties = action + "_" + this._frames; 
	  $gameScreen.showPictureFromPath(19, "washroom_tekoki", panties, 0, 360, 0, 100, 100, 255, 0);
	}
	
    // 手的动作
	var IMG2 = "washroom_tekoki_action4_" + this._frames;
	$gameScreen.showPictureFromPath(15, "washroom_tekoki", IMG2, 0, 360, 0, 100, 100, 255, 0);

	if (this._frames == 19) {
		
       if ( $gameVariables.value(25) > 80 && noPanties) {
		  // 满足条件后哥哥射爆
          AudioManager.stopVoice(null, 3);			  
          QJ.MPMZ.Shoot({
             img:"null1",groupName: ['tekokiActionShasei'],
             existData: [ ],
             moveF:[
               [this._speed,0,QJ.MPMZ.tl._imoutoUtilWashRoomImoutoTekokiShasei,[noPanties,type]]
             ],
          });
		  if (!$gameScreen.picture(14)) {
             $gameScreen.showPicture(14, "washroom_tekoki/washroom_tekoki_kao2", 0, 0, 0, 100, 100, 255, 0);
             $gameScreen.showPicture(55, "washroom_tekoki/washroom_tekoki_blush", 0, 0, 0, 100, 100, 255, 0);	
             $gameScreen.picture(55).drill_PLAZ_setZIndex( 13 );			 
		  }
		  
          this.setDead({t:['Time',0]}); 		  
	   }
	}

	if (this._frames >= 28) {
        this._times += 1;	
        if (this._times > 4) this._speed = 3;		
		this._coolDown = 6;
		this._frames = 15;
		return;
	}	

   	this._frames += 1;
	this._coolDown = this._speed;

	if (!this._preload && !noPanties && this._frames > 14) {
		this._preload = true;
		// 动作音效
		let	voice = { name: "washroom_event_sis_tekoki_panties4", volume: 70, pitch: 100, pan: 0 };
    	AudioManager.playVoice(voice, true, 3);		
	}	
	
};

// 洗面所手交事件-哥哥射爆
QJ.MPMZ.tl._imoutoUtilWashRoomImoutoTekokiShasei = function(noPanties,type) {
	
	if (!noPanties) return;		
	this._coolDown = this._coolDown || 0;	
	if (this._coolDown > 0) {
	   this._coolDown -= 1;
	   return;
	}
	
	this._frames = this._frames || 6;
	this._speed = this._speed || 5;
	
    // 射精
	var IMG2 = "washroom_tekoki_shasei" + this._frames;
	$gameScreen.showPictureFromPath(15, "washroom_tekoki", IMG2, 0, 360, 0, 100, 100, 255, 0);
	
    // 射在妹妹头上的精液
	if (this._frames >= 14 && this._frames <= 52) {
	var duplicateArray = [21,22,23,24,26,27,28,30,31,32,38,40,41,42,43,45,46];
	if (!duplicateArray.includes(this._frames)) {
	var IMG1 = "washroom_tekoki_shasei_hairSeieki" + this._frames;
	$gameScreen.showPictureFromPath(12, "washroom_tekoki", IMG1, 0, 360, 0, 100, 100, 255, 0);
	  }
    } else if (this._frames > 51 && !$gameScreen.picture(12)) {
	$gameScreen.showPictureFromPath(12, "washroom_tekoki", "washroom_tekoki_shasei_hairSeieki51", 0, 360, 0, 100, 100, 255, 0);	
	}

    // 妹妹眨眼动作
	if (this._frames >= 6 && this._frames <= 14) {		
	var duplicateArray = [8,9,12];	
	if (!duplicateArray.includes(this._frames)) {
	var IMG0 = "washroom_tekoki_shasei_back" + this._frames;
	$gameScreen.showPictureFromPath(10, "washroom_tekoki", IMG0, 0, 0, 0, 100, 100, 255, 0);
	  }
	}

	if (this._frames >= 67) {
		
		this.setDead({t:['Time',0]}); 
		//this._speed = 3 + Math.randomInt(5);
		//this._coolDown = 150;
		//this._frames = 0;
		//return;
	}	

   	this._frames += 1;
	this._coolDown = this._speed;	
};

// 洗面所妹妹胖次结算
QJ.MPMZ.tl._imoutoUtilWashRoomImoutoPantiesSelect = function() {
	
	//var chest = $gameNumberArray.value(44);
	var panties;
	var imageName = "";
	
	if (!$gameActors.actor(2).equips()[1]) {
		$gameScreen.erasePicture(5);
		$gameSelfSwitches.setValue([$gameMap.mapId(), 18, 'D'], true);
		return;
	} else {
		panties = $gameActors.actor(2).equips()[1].baseItemId;
	}
	
      switch (panties) {
        case 154:  
            imageName = "washroom_sis_clothes_bluePanties";
            break;
        case 155:  
            imageName = "washroom_sis_clothes_pinkPanties";
            break;
        case 156:  
            imageName = "washroom_sis_clothes_whitePanties";
            break;
        default: 
            imageName = "washroom_sis_clothes_whitePanties";
            break;
     }	
    $gameScreen.showPictureFromPath(5, "washroom_event", imageName, 0, 0, 0, 50, 50, 255, 0)		
		
}; 

// 厕所口交事件-妹妹隔着胖次自慰
QJ.MPMZ.tl._imoutoUtilToiletImoutoFeraPantsuOnanii = function() {
	
	this._coolDown = this._coolDown || 0;	
	if (this._coolDown > 0) {
	   this._coolDown -= 1;
	   return;
	}
	
	this._frames = this._frames || 0;
	this._speed = this._speed || 3;
	
    const pic = $gameScreen.picture(1);	
	if (!pic) return;
	if (pic._drill_PSh_commandChangeTank.length > 0) return;
	
	let xx = pic._x;
	let yy = pic._y;
	let scale = pic._scaleX;
    let xxx =  xx + (1000 * (scale / 100));
	let yyy =  yy + (800 * (scale / 100));	
	
    // 自慰动作
	var IMG1 = "toilet_sister_onanii0_back" + this._frames;
	$gameScreen.showPictureFromPath(6, "toilet_nozoku", IMG1, 0, xxx, yyy, scale, scale, 255, 0);	

    if (!this._playback) {
   	  this._frames += 1;
	} else {
	  this._frames -= 1;
	}
	
	if (!this._playback && this._frames >= 5) {	  
	    this._coolDown += 10 + Math.randomInt(15);
		this._frames -= 1;
		this._playback = true;
		return;
	}

	if (this._playback && this._frames <= -1) {	  
	    this._coolDown += 10 + Math.randomInt(15);
		this._frames = 0;
		this._playback = false;
		return;
	}
    this._coolDown += 7;		
};

// 厕所口交事件-妹妹自慰
QJ.MPMZ.tl._imoutoUtilToiletImoutoFeraNoopanOnanii = function() {
	
	this._coolDown = this._coolDown || 0;	
	if (this._coolDown > 0) {
	   this._coolDown -= 1;
	   return;
	}
	
	this._frames = this._frames || 1;
	this._speed = this._speed || 3;
	
    const pic = $gameScreen.picture(1);	
    if (!pic) return;
	if (pic._drill_PSh_commandChangeTank.length > 0) return;
	
	let xx = pic._x;
	let yy = pic._y;
	let scale = pic._scaleX;
    let xxx =  xx + (1000 * (scale / 100));
	let yyy =  yy + (800 * (scale / 100));
	
    // 绝顶结束
	if (this._zetchou) {
		var IMG1 = "toilet_sister_onanii_back10_aieki";
		$gameScreen.showPictureFromPath(8, "toilet_nozoku", IMG1, 0, xxx, yyy, scale, scale, 255, 0);
		if ($gameScreen.picture(10) && $gameScreen.picture(10).name().includes("onanii")) {
		$gameScreen.showPictureFromPath(10, "toilet_nozoku", "toilet_sister_onanii_head3", 0, xx, yy, scale, scale, 255, 0);
		}
        this.setDead();
        return;		
	}
	
    // 自慰动作
	if (this._aieki && [7,8,9,10].includes(this._frames)) {
		var IMG1 = "toilet_sister_onanii_back" + this._frames + "_aieki";
		$gameScreen.showPictureFromPath(8, "toilet_nozoku", IMG1, 0, xxx, yyy, scale, scale, 255, 0);		
	} else {
		var IMG1 = "toilet_sister_onanii_back" + this._frames;
		$gameScreen.showPictureFromPath(8, "toilet_nozoku", IMG1, 0, xxx, yyy, scale, scale, 255, 0);
	}	

   	this._frames += 1;
	this._coolDown = this._speed;	

	if (this._frames === 11) {	   
		this._coolDown += 2 * this._speed;
	}	
	if (this._frames === 15 && Math.random() > 0.9) {	   
		this._coolDown += this._speed;
		this._frames = 7;
		return;
	}
	if (this._frames === 16 && Math.random() > 0.85) {	   
		this._coolDown += this._speed;
		this._frames = 6;
		return;
	}	
	if (this._frames >= 18) {	  
	    this._coolDown += 2 * this._speed;
		this._frames = 1;
	}	
};


// 妹妹语音自动播放
QJ.MPMZ.tl._imoutoUtilVoiceAutoPlayListener = function() {
	
        QJ.MPMZ.Shoot({
            img:"null1",
			groupName:['voiceAutoPlay'],
            position: [['S',0], ['S',0]],
            initialRotation: ['S', 0],
            imgRotation: ['F'],
			onScreen:true,
            moveType: ['S', 0],
            existData: [
			{t:['S','$gameScreen.picture(30)',true]}
			],
			moveF:[
			  [60,15,QJ.MPMZ.tl._imoutoUtilVoiceAutoPlay1]
			]
        });		
	
};

QJ.MPMZ.tl._imoutoUtilVoiceAutoPlay1 = function() {
	
		this._coolDown = this._coolDown || 0;
        if (this._coolDown > 0) {
	      this._coolDown -= 1;
	      return;
        }
	
	this._count = this._count || 1;
    let random,waitTime;
    do {
        random = 1 + Math.randomInt(5);
    } while (random === this._count);
	this._count = random;
	
    switch (random) {
        case 1:  
            waitTime = 12;
            break;
        case 2:  
            waitTime = 16;
            break;
        case 3:  // 右
            waitTime = 32;
            break;
        case 4:  // 上
            waitTime = 20;
            break;
        case 5: 
            waitTime = 32;
            break;
    }		
        var voice    = {};
        voice.name   = "toilet_event_onani" + random;
        voice.volume = 40;
        voice.pitch  = 100;
        voice.pan    = 0;
        var channel  = 1;
        AudioManager.playVoice(voice, false, channel);	

    this._coolDown = waitTime;
	this._coolDown += Math.randomInt(20);
};

// 厕所口交事件-舔肉棒
QJ.MPMZ.tl._imoutoUtilToiletImoutoFeraAction1 = function() {
	
	this._coolDown = this._coolDown || 0;	
	if (this._coolDown > 0) {
	   this._coolDown -= 1;
	   return;
	}

    const pic = $gameScreen.picture(1);		
	if (!pic) return;
	if (pic._drill_PSh_commandChangeTank.length > 0) return;

	if (this._shasei) {
	   QJ.MPMZ.tl._imoutoUtilToiletImoutoFeraShasei.call(this);
	   return;
	}
	
	this._frames = this._frames || 1;
	this._speed = this._speed || 3;
	let xx = pic._x;
	let yy = pic._y;
	let scale = pic._scaleX;
    let xxx =  xx + (1400 * (scale / 100));
	let yyy =  yy + (1000 * (scale / 100));
	
    // 肉棒动作	
	var IMG1 = "toilet_sister_fera_action" + this._frames;
	$gameScreen.showPictureFromPath(12, "toilet_nozoku", IMG1, 0, xxx, yyy, scale, scale, 255, 0);

   	this._frames += 1;
	this._coolDown = 3;	
    
	if (this._shaseiJumbi ) {
		this._count = this._count || 0;
		this._count++;
		if (this._count > 20) {
		  this._shasei = true;
		  let name = 'NoopanOnanii';
		  if ($gameMap.getGroupBulletListQJ(name).length > 0) {
    		  let id = $gameMap.getGroupBulletListQJ(name)[0];
    		  let bullet = $gameMap.bulletQJ(Number(id)); 
    		  bullet._zetchou = true;
		    }		  
		}
	}

    
	if (this._frames >= 10) {		  
	    this._coolDown += 3;
		this._frames = 1;
	}	
};

// 厕所口交事件-射精
QJ.MPMZ.tl._imoutoUtilToiletImoutoFeraShasei = function() {
	


	this._frames = this._frames || 1;
	//this._speed = this._speed || 4;
	this._speed = 5;

    const pic = $gameScreen.picture(1);
    if (!pic) return;	
	if (pic._drill_PSh_commandChangeTank.length > 0) return;

	let xx = pic._x;
	let yy = pic._y;
	let scale = pic._scaleX;
    let xxx =  xx + (1018 * (scale / 100));
	let yyy =  yy + (580 * (scale / 100));
	
	$gameScreen.erasePicture(10);
	var IMG1 = "toilet_sister_fera_shasei" + this._frames;
	$gameScreen.showPictureFromPath(4, "toilet_nozoku", "toilet_sister_fera_shasei_back", 0, xxx, yyy, scale, scale, 255, 0);
	$gameScreen.showPictureFromPath(12, "toilet_nozoku", IMG1, 0, xxx, yyy, scale, scale, 255, 0);

   	this._frames += 1;
	this._coolDown = this._speed;	

	if (this._frames === 2) {	  
	    AudioManager.playSe({name: "射精音1", volume: 100, pitch: 100, pan: 0});	
	}
    
	if (this._frames === 17) {	  
	    this._coolDown += 9999999;	
	}
	
	if (this._frames >= 25) {	  
	    this.setDead();
	}	
};

// 哥哥自己动手自慰
QJ.MPMZ.tl._OniichanNoopanOnanii = function() {

	this._coolDown = this._coolDown || 0;	
	if (this._coolDown > 0) {
	   this._coolDown -= 1;
	   return;
	}

    if ( this._shasei && !this._shaseiStart) {
		this._shaseiStart = true;
		this._frames = 1;
		this._speed = 6;
		$gameMap.event(22).steupCEQJ(4,{shasei:true})
	}
	
	this._frames = this._frames || 1;
	this._speed = this._speed || 6;
	var IMG1;
	
	if (this._shasei) {
       IMG1 = "oniichan_action/toilet_oniichan_noopan_onanii_shasei" + this._frames;
	   $gameScreen.showPicture(16, IMG1, 0, 450, 80, 100, 100, 255, 0);		
	} else {
       IMG1 = "oniichan_action/toilet_oniichan_noopan_onanii" + this._frames;
	   $gameScreen.showPicture(16, IMG1, 0, 450, 620, 100, 100, 255, 0);		
	}

   	this._frames += 1;
	this._coolDown = this._speed;	
    
	if (this._shasei) {

	if (this._frames >= 19) {	  
		this.setDead();
	}
		
	} else {

	if (this._frames >= 6) {	  
		this._frames = 1;
	}
		
	}
	/*
    // 累积射精感
    if ( Math.random() > 0.5 ) {
		let value = $gameVariables.value(25);
		value += Math.randomInt(3);
		$gameVariables.setValue(25, value);
	}
	*/
};

// 妹妹立绘脱衣动画
QJ.MPMZ.tl._imoutoUtilTuggingOnTshirt = function(type) {
	
	this._coolDown = this._coolDown || 0;	
	if (this._coolDown > 0) {
	   this._coolDown -= 1;
	   return;
	}
	
	if (this._boobShake) {
		QJ.MPMZ.tl._imoutoUtilTachieBoobShake.call(this);
		return;
	}
	
	
    let max = 4;
	if (this._frames === undefined) this._frames = 1;
	
	var IMG1 = "imoto_tachie/mio_tachie_T-shirt_dragging" + type + this._frames;	
	if (this._frames === 0) IMG1 = "mio_tachie_T-shirt1";
	$gameScreen.showPicture(15, IMG1, 0, 1000, 150, 100, 100, 255, 0);	


	if (this._upend && this._frames == 0) {
		this.setDead({ t: ['Time', 0] });
		this._coolDown += 90;
		this._upend = false;
	}

    if (type === "B") max = 5;
	
	if (!this._upend && this._frames == max) {		
		this._frames -= 1;
		if (type === "A") {
		//掀起T恤停留的时间
		this._coolDown += 10;
		}
		this._upend = true;
		if (type === "B") {
		this._frames = 1;
		this._boobShake = true;
		return;
	  }
	}
	
	if (this._upend) {
		this._frames -= 1;
	} else {
		this._frames += 1;
	}

	this._coolDown += 2;	
		
};

// 妹妹立绘乳摇
QJ.MPMZ.tl._imoutoUtilTachieBoobShake = function() {
	
	if (this._frames === undefined) this._frames = 1;

	if (this._frames >= 7) {
		//$gameScreen.showPicture(11, 'mio_tachie_nudepose1_1', 0, 1000, 150, 100, 100, 255, 0);	
		//$gameScreen.erasePicture(15);
		this.setDead({ t: ['Time', 0] });
		this._frames = 4;
		this._coolDown += 30;
		this._boobShake = false;
		return;
	}
	
	var IMG2 = "imoto_tachie/mio_tachie_boobShake" + this._frames;	

	$gameScreen.showPicture(14, IMG2, 0, 1000, 150, 100, 100, 255, 0);		
	//$gameScreen.showPicture(11, "mio_tachie_handpose1", 0, 1000, 150, 100, 100, 255, 0);
	if (!$gameScreen.picture(21)) {
		$gameScreen.showPicture(21, "imoto_tachie/mio_tachie_T-shirt_dragging_extra", 0, 1000, 150, 100, 100, 255, 0);
	}
	 $gameScreen.picture(21).drill_PLAZ_setZIndex( 13.5 );
	this._frames += 1;
	this._coolDown += 4;
	
};


QJ.MPMZ.tl._batchProcessImageZoomEffects = function (picIds, targetX, targetY, scale) {
	
    const DURATION = 30;               

    // 判断参数是否为有限数字
    const hasX     = Number.isFinite(targetX);
    const hasY     = Number.isFinite(targetY);
    const hasScale = Number.isFinite(scale);

    picIds.forEach(id => {
        const pic = $gameScreen.picture(id);
        if (!pic) return;              // 槽位为空时直接跳过

        const cmdTank = pic._drill_PSh_commandChangeTank;

        if (hasX) {
            cmdTank.push({
                type : 'posX',
                value: targetX - pic._x,
                time : DURATION,
            });
        }
        if (hasY) {
            cmdTank.push({
                type : 'posY',
                value: targetY - pic._y,
                time : DURATION,
            });
        }
        if (hasScale) {
            cmdTank.push({
                type : 'scaleX',
                value: scale - pic._scaleX,
                time : DURATION,
            });
            cmdTank.push({
                type : 'scaleY',
                value: scale - pic._scaleY,
                time : DURATION,
            });
        }
    });
};

// 洗面所偷窥事件ZOOM效果
QJ.MPMZ.tl._washroomNozokuSceneZoomEffects = function () {
	
  const P = id => $gameScreen.picture(id);
  const Z = QJ.MPMZ.tl._batchProcessImageZoomEffects;   
  
  var currentX = 0;
  if (!$gameScreen.picture(50)._currentX) {
        $gameScreen.picture(50)._currentX = $gameScreen.picture(50)._x;
	    currentX = $gameScreen.picture(50)._currentX;
  }	else {
	    currentX = $gameScreen.picture(50)._currentX;
  }
  
  const TABLE = {
    /*=========== 近景：picture(1) < 60% = 镜头推进 ============*/
    IN: {
      common: [
        { pic:[1],             x:-1800, y:-800, s:100 },
		{ pic:[10],             x:400, y:-440, s:100 },
		{ pic:[49,50],             x:null, y:null, s:150 },
		{ pic:[49],             x:-950, y:null, s:null },
		{ pic:[50],             x:-2800, y:-300, s:null }
      ]
    },

    /*=========== 远景：picture(1) ≥ 60% = 镜头拉远 ============*/
    OUT: {
      common: [
        { pic:[1],             x:0, y:0, s:50 },
		{ pic:[10],             x:1100, y:180, s:50 },
		{ pic:[49,50],             x:null, y:null, s:100 },
		{ pic:[49],             x:0, y:null, s:null },
		{ pic:[50],             x:currentX, y:0, s:null }
      ]
    }
  };

  /*—— 主流程 ——*/
  const mode  = P(1)._scaleX < 60 ? 'IN' : 'OUT';
  const block = TABLE[mode];

  /* 1) 公用步骤 */
  block.common.forEach(c => Z(c.pic, c.x, c.y, c.s));

};


// 厕所口交事件ZOOM效果
QJ.MPMZ.tl._toiLetFeraSceneZoomEffects = function () {

  const P = id => $gameScreen.picture(id);
  const Z = QJ.MPMZ.tl._batchProcessImageZoomEffects;   

  const TABLE = {
    /*=========== 近景：picture(1) < 60% = 镜头推进 ============*/
    IN: {
      common: [
        { pic:[1,2,3,4,6,8,10,11,12],             x:null, y:null, s:100 },
        { pic:[1,2,3,6,10,11],                    x:-600, y:-800, s:null }
      ],
      cases: [
        {
          cond : () => P(12)?.name().includes('fera_shasei'),
          steps: [
            { pic:[8],       x: 400, y:   0,  s:null },
            { pic:[4,12],    x: 418, y:-220, s:null }
          ]
        },
        {
          cond : () => P(12)?.name().includes('fera_action'),
          steps: [
            { pic:[4],       x:-600, y:-800, s:null },
            { pic:[8],       x: 400, y:   0, s:null },
            { pic:[12],      x: 800, y: 200, s:null }
          ]
        },
        {
          cond : () => P(12)?.name().includes('toilet_sister_fera1'),
          steps: () => {
            const dx = P(12).name().includes('shasei') ? 500 : 400;
            return [{ pic:[8,12], x:dx, y:-800, s:null }];
          }
        }
      ]
    },

    /*=========== 远景：picture(1) ≥ 60% = 镜头拉远 ============*/
    OUT: {
      common: [
        { pic:[1,2,3,4,6,8,10,11,12],             x:null, y:null, s:50 },
        { pic:[1,2,3,6,10,11],                    x:   0, y:   0, s:null }
      ],
      cases: [
        {
          cond : () => P(12)?.name().includes('fera_shasei'),
          steps: [
            { pic:[8],       x: 500, y: 400, s:null },
            { pic:[4,12],    x: 509, y: 290, s:null }
          ]
        },
        {
          cond : () => P(12)?.name().includes('fera_action'),
          steps: [
            { pic:[4],       x:   0, y:   0, s:null },
            { pic:[8],       x: 500, y: 400, s:null },
            { pic:[12],      x: 700, y: 500, s:null }
          ]
        },
        {
          cond : () => P(12)?.name().includes('toilet_sister_fera1'),
          steps: () => {
            const dx = P(12).name().includes('shasei') ? 550 : 500;
            return [{ pic:[8,12], x:dx, y:0, s:null }];
          }
        }
      ]
    }
  };

  /*—— 主流程 ——*/
  const mode  = P(1)._scaleX < 60 ? 'IN' : 'OUT';
  const block = TABLE[mode];

  /* 1) 公用步骤 */
  block.common.forEach(c => Z(c.pic, c.x, c.y, c.s));

  /* 2) 条件分支（命中一条即退出） */
  for (const branch of block.cases) {
    if (branch.cond()) {
      const steps = (typeof branch.steps === 'function') ? branch.steps() : branch.steps;
      steps.forEach(s => Z(s.pic, s.x, s.y, s.s));
      return;            // 只执行首个匹配分支
    }
  }
};

QJ.MPMZ.tl._sceneZoomInAndZoomOut = function () {
  let picArray;
  let targetX;
  let targetY;
  let scale;

  if ($gameScreen.picture(1)._scaleX < 60) {
    picArray = [1, 2, 3, 4, 6, 8, 10, 11, 12];
    targetX = null;
    targetY = null;
    scale   = 100;
    QJ.MPMZ.tl._batchProcessImageZoomEffects(picArray, targetX, targetY, scale);

    picArray = [1, 2, 3, 6, 10, 11];
    targetX  = -600;
    targetY  = -800;
    scale    = null;
    QJ.MPMZ.tl._batchProcessImageZoomEffects(picArray, targetX, targetY, scale);

    if ($gameScreen.picture(12) && $gameScreen.picture(12).name().includes("fera_shasei")) {
      picArray = [8];
      targetX  = 400;
      targetY  = 0;
      scale    = null;
      QJ.MPMZ.tl._batchProcessImageZoomEffects(picArray, targetX, targetY, scale);

      picArray = [4, 12];
      targetX  = 418;
      targetY  = -220;
      scale    = null;
      QJ.MPMZ.tl._batchProcessImageZoomEffects(picArray, targetX, targetY, scale);
      return;
    }

    picArray = [4];
    targetX  = -600;
    targetY  = -800;
    scale    = null;
    QJ.MPMZ.tl._batchProcessImageZoomEffects(picArray, targetX, targetY, scale);

    if ($gameScreen.picture(12) && $gameScreen.picture(12).name().includes("fera_action")) {
      picArray = [8];
      targetX  = 400;
      targetY  = 0;
      scale    = null;
      QJ.MPMZ.tl._batchProcessImageZoomEffects(picArray, targetX, targetY, scale);

      picArray = [12];
      targetX  = 800;
      targetY  = 200;
      scale    = null;
      QJ.MPMZ.tl._batchProcessImageZoomEffects(picArray, targetX, targetY, scale);
      return;
    }

    if ($gameScreen.picture(12) && $gameScreen.picture(12).name().includes("toilet_sister_fera1")) {
      if ($gameScreen.picture(12).name().includes("shasei")) {
        picArray = [8, 12];
        targetX  = 500;
        targetY  = -800;
        scale    = null;
        QJ.MPMZ.tl._batchProcessImageZoomEffects(picArray, targetX, targetY, scale);
        return;
      }
      picArray = [8, 12];
      targetX  = 400;
      targetY  = -800;
      scale    = null;
      QJ.MPMZ.tl._batchProcessImageZoomEffects(picArray, targetX, targetY, scale);
      return;
    }
  } else {
    picArray = [1, 2, 3, 4, 6, 8, 10, 11, 12];
    targetX  = null;
    targetY  = null;
    scale    = 50;
    QJ.MPMZ.tl._batchProcessImageZoomEffects(picArray, targetX, targetY, scale);

    picArray = [1, 2, 3, 6, 10, 11];
    targetX  = 0;
    targetY  = 0;
    scale    = null;
    QJ.MPMZ.tl._batchProcessImageZoomEffects(picArray, targetX, targetY, scale);

    if ($gameScreen.picture(12) && $gameScreen.picture(12).name().includes("fera_shasei")) {
      picArray = [8];
      targetX  = 500;
      targetY  = 400;
      scale    = null;
      QJ.MPMZ.tl._batchProcessImageZoomEffects(picArray, targetX, targetY, scale);

      picArray = [4, 12];
      targetX  = 509;
      targetY  = 290;
      scale    = null;
      QJ.MPMZ.tl._batchProcessImageZoomEffects(picArray, targetX, targetY, scale);
      return;
    }

    picArray = [4];
    targetX  = 0;
    targetY  = 0;
    scale    = null;
    QJ.MPMZ.tl._batchProcessImageZoomEffects(picArray, targetX, targetY, scale);

    if ($gameScreen.picture(12) && $gameScreen.picture(12).name().includes("fera_action")) {
      picArray = [8];
      targetX  = 500;
      targetY  = 400;
      scale    = null;
      QJ.MPMZ.tl._batchProcessImageZoomEffects(picArray, targetX, targetY, scale);

      picArray = [12];
      targetX  = 700;
      targetY  = 500;
      scale    = null;
      QJ.MPMZ.tl._batchProcessImageZoomEffects(picArray, targetX, targetY, scale);
      return;
    }

    if ($gameScreen.picture(12) && $gameScreen.picture(12).name().includes("toilet_sister_fera1")) {
      if ($gameScreen.picture(12).name().includes("shasei")) {
        picArray = [8, 12];
        targetX  = 550;
        targetY  = 0;
        scale    = null;
        QJ.MPMZ.tl._batchProcessImageZoomEffects(picArray, targetX, targetY, scale);
        return;
      }
      picArray = [8, 12];
      targetX  = 500;
      targetY  = 0;
      scale    = null;
      QJ.MPMZ.tl._batchProcessImageZoomEffects(picArray, targetX, targetY, scale);
      return;
    }
  }
};