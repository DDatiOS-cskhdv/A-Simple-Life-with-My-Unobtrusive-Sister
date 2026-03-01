//=============================================================================
 /*:
 * @plugindesc 动画脚本
 * @author shiroin
 */
//=============================================================================


// 哥哥自己做饭动画
QJ.MPMZ.tl.OniiChanCookingHimselfAnim = function(extra = {}) {	

   if (extra.refresh) {
		this._coolDown = this._coolDown || 0;	
		if (this._coolDown > 0) {
		   this._coolDown -= 1;
		   return;
		}

		this._frames = this._frames || 1;
		
		let IMG = "[NSFW]kitchen_Onii-chan_cookingHimself" + this._frames;
		if (ConfigManager.harmonyMode) {
			IMG = "kitchen_Onii-chan_cookingHimself" + this._frames;
		}
		$gameScreen.showPictureFromPath(24, "kitchen_event", IMG, 0, 707, 187, 100, 100, 255, 0);
		if (!ConfigManager.harmonyMode && !$gameScreen.picture(25)) {
			$gameScreen.showPictureFromPath(25, "kitchen_event", "kitchen_Onii-chan_cookingHimself_clothes", 0, 760, 470, 100, 100, 255, 0);
		}
		
		if (this._frames >= 3) {
			this._coolDown = Math.randomInt(3) + 4;
			this._frames -= 1;
			this._upend = true;
			return;
		}

		if (this._upend && this._frames <= 1) {
			this._coolDown = Math.randomInt(3) + 4;
			this._frames += 1;
			this._upend = false;
			return;
		}
		
		if (this._upend) {
			this._frames -= 1;
		} else {
			this._frames += 1;
		}
		this._coolDown = Math.randomInt(3) + 4;	
		return;
   }

   if (extra.rubbingSalt) {
		$gameScreen._particle.particleSet(0, 'salt', 'picture:24', 'monster_c');
		setTimeout(() => {
			$gameScreen._particle.particleUpdate(['salt','alpha','0.35']);
			$gameScreen._particle.particleUpdate(['salt','scale','0.4','0']);
			$gameScreen._particle.particleUpdate(['salt','color','#ffffff']);
			$gameScreen._particle.particleUpdate(['salt','pos','120','170']);
			$gameScreen._particle.particleUpdate(['salt','speed','222','322']);
			$gameScreen._particle.particleUpdate(['salt','acceleration','0','400']);
			$gameScreen._particle.particleUpdate(['salt','startRotation','0','150']);		 
		}, 20);
		return;
   }

   if (extra.isClothesDestroyed) {
	  if (extra.isClothesDestroyed === "successful") return;
	  if (!$gameScreen.picture(25) || ConfigManager.harmonyMode) return;
      let controlled_sprite = $gameTemp.drill_PSE_getPictureSpriteByPictureId( 25 );
      let controller = controlled_sprite.drill_PSE_createController( 21 );
	  setTimeout(() => {
          controller.drill_COSE_runShatter();	
      }, 200);		  
	  let animation = QJ.MPMZ.Shoot({
			img:'MGC_W2_Explosion_V4_Lv1[5,10,2]',
			position:[['S',850],['S',840]],
			scale:8,
			initialRotation:['S',0],
			imgRotation:['F'],
			opacity:1,
			onScreen: true,
			z:"A",
			collisionBox:['C',1],
			moveType:['S',0],
			blendMode:1,
			moveJS:[
			  [16,999,`AudioManager.playSe({ name: 'SummonFX04_11_BlightPollenCritical', volume: 65, pitch: 90, pan: 0 });
			           $gameScreen.startFlash([0, 0, 0, 165], 60);
	  	               $gameScreen.setShakeRandom();
	  	               $gameScreen.startShake(6, 9, 45);`]
			],
			existData:[	
			  {t:['Time',98]},
			]       
      });
      if (extra.interpreter)  extra.interpreter.wait(60);
      return;
   }	   
   // ====== 动画脚本监听器 ======   
   let listener = QJ.MPMZ.Shoot({
	  groupName: ['OniiChanCookingHimself'],
      existData: [ 
	  ],
      moveF: [
        [40,0,QJ.MPMZ.tl.OniiChanCookingHimselfAnim,[{refresh:true}]],
		[42,9999,QJ.MPMZ.tl.OniiChanCookingHimselfAnim,[{rubbingSalt:true}]],
      ]	
   });
   for (let i = 1; i <= 3; i++) {
      if (ConfigManager.harmonyMode) {
		  ImageManager.loadPicture( `kitchen_event/kitchen_Onii-chan_cookingHimself${i}` );
	  } else {
          ImageManager.loadPicture( `kitchen_event/[NSFW]kitchen_Onii-chan_cookingHimself${i}` );   
	  }
   }
   ImageManager.loadPicture( "kitchen_event/kitchen_Onii-chan_cookingHimself_clothes" );
};

// 早晨妹妹刷牙动画
QJ.MPMZ.tl.ImoutoBrushTeethAnimation = function(extra = {}) {	
	
   if (extra.refresh) {
	   this._coolDown = this._coolDown || 0;
	   if (this._coolDown > 0) {
		 this._coolDown -= 1;
		 return;
	   }
	   // ====== 动画阶段配置 ======
	   const PHASES = {
		 1: { entry: 5,   loopStart: 5,   loopEnd: 28,  type: "loop" },
		 2: { entry: 30,  loopStart: 48,  loopEnd: 78,  type: "loop" },
		 3: { entry: 80,  loopStart: 96,  loopEnd: 120, type: "loop" },
		 4: { entry: 122, loopStart: 171, loopEnd: 184, type: "loop" },
		 5: { entry: 185, loopStart: 185, loopEnd: 211, type: "once" }
	   };	   
	   
	   this._phase      = this._phase     || 1;
	   this._loopTimes  = this._loopTimes || 0;
       const cfg = PHASES[this._phase] || PHASES[1];
	   // 帧初始化
	   this._frames = this._frames || cfg.entry;	   
	   let IMG = "washroom_morning_event/brushingTeeth" + this._frames.padZero(4);
       $gameScreen.showPicture(8, IMG, 0, 200, 100, 100, 100, 255, 0);
	   
	   // 过渡帧
	   if (this._frames < cfg.loopStart) {
		   this._frames += 1;
		   this._coolDown = 3;
		   if (this._frames === 47) {
			   AudioManager.playBgs({ name: "歯磨き", volume: 95, pitch: 80, pan: 0 });
		   }		   
		   if (this._frames === 96) {
			   AudioManager.playBgs({ name: "歯磨き", volume: 95, pitch: 100, pan: 0 });
		   }		   
		   if (this._frames === 133) {
			   AudioManager.stopVoice(null, 3);
			   AudioManager.playVoice({ name: "washroom_event_sis_morning3", volume: 90, pitch: 100, pan: 0 }, false, 1);
		   }
		   if (this._frames === 161) {
			   setTimeout(() => AudioManager.playVoice({ name: "washroom_event_sis_morning4", volume: 90, pitch: 100, pan: 0 }, false, 1), 300);
			   this._coolDown += 35;
		   }		   
		   return;
	   }
	   
		// 循环动画判断
	   if (cfg.type === "loop") {
		  if (this._frames >= cfg.loopEnd) {
			  this._frames = cfg.loopStart; // 回到循环起点
			  this._loopTimes += 1;
		  } else {
			  this._frames += 1;
		  }
		  this._coolDown = 3;		  
		   // 特殊帧效果
		   if (this._frames === 5 && this._loopTimes >= 1 && !$gameMessage.isBusy()) {
			   $gameMap.event(11).steupCEQJ(2, {phaseSwitch:2});
			   QJ.MPMZ.tl.ImoutoBrushTeethAnimation({phaseSwitch:2});
			   return;
		   }		  
		   if (this._frames === 48 && this._loopTimes >= 1 && !$gameMessage.isBusy()) {
			   $gameMap.event(11).steupCEQJ(2, {phaseSwitch:3});
			   QJ.MPMZ.tl.ImoutoBrushTeethAnimation({phaseSwitch:3});
			   return;
		   }		   
		   if (this._frames === 184 && this._loopTimes > 1 && !$gameMessage.isBusy()) {
			   AudioManager.playVoice({ name: "washroom_event_sis_morning5", volume: 90, pitch: 100, pan: 0 });
			   for (let i = 186; i <= 212; i++) {
    			   let pid = String(i).padZero(4);
    			   ImageManager.loadPicture( `washroom_morning_event/brushingTeeth${pid}` );
 			   }
			   QJ.MPMZ.tl.ImoutoBrushTeethAnimation({phaseSwitch:5});
			   return;
		   }			      
		   if (this._frames === 203) {
			   this._coolDown += 40;
		   }  
		  return;
	   }
	   // 最后阶段的动画
	   if (cfg.type === "once") {
		  if (this._frames >= cfg.loopEnd) {
			  $gameMap.event(11).steupCEQJ(2, {phaseSwitch:5});
			  this.setDead({t:['Time',0]});
		  } else {
			this._frames += 1;
		  }
		  this._coolDown = 3;
		  if (this._frames === 194) {
			  setTimeout(() => AudioManager.playVoice({ name: "washroom_event_sis_morning6", volume: 90, pitch: 100, pan: 0 }, false, 1), 500);
			  this._coolDown += 35;
		  }			  
		  if (this._frames === 209) {
			  AudioManager.playVoice({ name: "washroom_event_sis_morning7", volume: 90, pitch: 100, pan: 0 }, false, 1);
		  } 		  
		  return;
		}	   
	   return;
   }
   // ====== 切换动画阶段 ======   
   if (extra.phaseSwitch) {
      let list = $gameMap.getGroupBulletListQJ('ImoutoBrushTeeth');
	  if (list.length <= 0) return;
	  let bullet = $gameMap._mapBulletsQJ[list[0]];
	  bullet._phase     = extra.phaseSwitch;
	  bullet._loopTimes = 0;
	  if (extra.phaseSwitch == 4) {
		  AudioManager.fadeOutBgs(1);
	  }
	  return;
   }	   
   // ====== 动画脚本监听器 ======   
   let listener = QJ.MPMZ.Shoot({
	  groupName: ['ImoutoBrushTeeth'],
      existData: [ 
	  ],
      moveF: [
        [15,0,QJ.MPMZ.tl.ImoutoBrushTeethAnimation,[{refresh:true}]]
      ]
   });  
   AudioManager.playBgs({ name: "歯磨き", volume: 95, pitch: 100, pan: 0 });
};



// 天气预报节目
QJ.MPMZ.tl.showWeatherForecastDisplay = function() {
    
	Graphics._createFontLoader( "Maple Mono NF CN ExtraBold" );
	//

    $gameMap.createFilter("tvFX", "crt", 0);
    $gameMap.setFilter( "tvFX" ,[1,3,0.05,0.1,0.5]);
    const vName = "weatherForecast_back";
    $gameScreen.setVideoPictureName(vName, false, false);	 // 没有透明通道
    // 绑定视频
    let pid = 60;
    $gameScreen.showPicture(pid, '', 0, 0, 0, 100, 100, 255, 0);
    let pic = $gameScreen.picture(pid);
    if (pic) {
        pic.setVideoLoop(true);
        pic.setVideoSpeed(120);
        pic.setVideoPause(false);
    }
	
	let weatherList = {
		400: 'weatherForecast_day',
		401: 'weatherForecast_cloudy',
		402: 'weatherForecast_rainy',
		403: 'weatherForecast_hotday'		 
	};
    // 初始化天气预报数组
    if ($gameNumberArray.value(30).length !== 7) {
		$gameNumberArray.setValue(30,[]);
        for (let i = 0; i < 7; i++) {
			let type = dingk.Loot.calculateRandomItemIndex(2);
			if (type == 400) {
             // 可能转化为炎热天气
             if ($gameParty.hasItem($dataItems[198]) || $gameSelfSwitches.value([24, 14, 'A'])) {
                 if (Math.random() > 0.75)  type = 403;
              } else {
                 if (Math.random() > 0.9)   type = 403;
              }			 
			}				
            $gameNumberArray.value(30).push(type);
        }
    }
    // 生成天气信息
	for (let index = 0; index < 5; index++) {
		let xx    = 16; 
		xx       += index * 224;
		let yy    = 390;
		pid       = 70 + index;
		let weatherIndex = $gameNumberArray.value(30)[index]
		let weatherName = weatherList[weatherIndex];
		let weather = 'living_room/' + weatherName;
		$gameScreen.showPicture(pid, weather, 0, xx, yy, 100, 100, 255, 0);
		if ($gameScreen.picture(pid)) {
			$gameScreen.picture(pid).drill_PCE_playSustainingBreathing( 36000,60,5 );
		}
        // 指定天数
        let dayArgs = { 
	        text: "Day" + ($gameSystem.day() + index + 1), 
		    x: xx + 90, 
		    y: yy - 55, 
		    width: 120, 
		    textAlign: 5, 
		    fontSize: 42, 
		    fontFace: "Maple Mono NF CN ExtraBold", 
		    groupName: ['WeatherForecast'],
		    opacity: 1,
		    scale: 1,
		    z: "A"
	    };
		// 最高气温
		let max = 25;
		let min = 15;
		switch (weatherIndex) {
              case 400: // 晴天
                 max = 30 + Math.randomInt(8);
				 min = 22 + Math.randomInt(5);
                 break;	
              case 401: // 阴天
                 max = 26 + Math.randomInt(6);
				 min = 16 + Math.randomInt(5);
                 break;	
              case 402: // 雨天
                 max = 22 + Math.randomInt(5);
				 min = 12 + Math.randomInt(5);
                 break;
              case 403: // 炎天
                 max = 40 + Math.randomInt(10);
				 min = 25 + Math.randomInt(5);
                 break;				 
		}
		min = Math.min(max-2, min);
        let maxArgs = { 
	        text: String(max), 
		    x: xx + 93, 
		    y: yy + 220, 
		    width: 120, 
		    textAlign: 5, 
		    fontSize: 45, 
		    fontFace: "Maple Mono NF CN ExtraBold", 
		    groupName: ['WeatherForecast'],
		    opacity: 1,
		    scale: 1,
		    z: "A"
	    };
        let minArgs = { 
	        text: String(min), 
		    x: xx + 93, 
		    y: yy + 471, 
		    width: 120, 
		    textAlign: 5, 
		    fontSize: 45, 
		    fontFace: "Maple Mono NF CN ExtraBold", 
		    groupName: ['WeatherForecast'],
		    opacity: 1,
		    scale: 1,
		    z: "A"
	    };		
		QJ.MPMZ.tl.customShootText(dayArgs);
        QJ.MPMZ.tl.customShootText(maxArgs);
		QJ.MPMZ.tl.customShootText(minArgs);
		// 绑定温度计演出
		pid     = 80 + index;
		let thermometer = 'living_room/thermometer2';
		if (max > 40)   thermometer = 'living_room/thermometer1';
		if (min < 15)   thermometer = 'living_room/thermometer3';
		let xxx = xx + 75;
		let yyy = yy + 257;
		let extraY = ((50 - max)/60) * 174;
		yyy    += extraY;
		if (index == 0) xxx += 1;
		let scaleY = Math.round(100*((max-min)/40));
		$gameScreen.showPicture(pid, thermometer, 0, xxx, yyy, 100, scaleY, 255, 0);
	}
	// 兔言兔语
	for (let i = 0; i < 10; i++) {
	    let seName = "USAUSA" + i;
	    $gameTemp.drill_VI_pushAudio( "voice", seName );
	}
	QJ.MPMZ.Shoot({
   	    existData: [ ],
   	    groupName:['usausa'],
   	    moveF:[
     	    [60,0,QJ.MPMZ.tl._USAUSAUSAUSA]
   	    ]
	});	
};

// 检测正在播放的 BGM 处于 [fromSec, toSec] 区间（含端点）
// 可选 epsilon（误差容忍，默认 0.05s）；自动兼容 Html5Audio 回退与循环点
QJ.MPMZ.tl.isBgmInWindow = function(fromSec, toSec, epsilon) {
  var a = Math.min(fromSec, toSec), b = Math.max(fromSec, toSec);
  var eps = (epsilon == null) ? 0.05 : Math.max(0, epsilon);

  var buf = AudioManager._bgmBuffer;
  var cur = AudioManager._currentBgm;

  if (!buf || !cur || !cur.name) return false;

  // 取当前播放时间（秒）
  var t = 0;
  if (typeof buf.seek === 'function' && (!buf.isReady || buf.isReady())) {
    t = buf.seek();                            // WebAudio
  } else if (window.Html5Audio && buf === Html5Audio && Html5Audio._audio) {
    t = Html5Audio._audio.currentTime || 0;    // Html5Audio 回退
  } else {
    return false;
  }

  // 处理循环：把时间折回到当前循环周内（有 loop 点才需要）
  var loopStart  = buf._loopStart  || 0;
  var loopLength = buf._loopLength || 0;
  if (loopLength > 0 && t >= loopStart) {
    t = loopStart + ((t - loopStart) % loopLength);
  }

  // 区间判定（带轻微误差容忍）
  return t >= (a - eps) && t <= (b + eps);
};


QJ.MPMZ.tl._shuffledZeroToNine = function() {
  var a = [];
  for (var i = 0; i < 10; i++) a.push(i);     // [0..9]

  for (var j = a.length - 1; j > 0; j--) {    // 洗牌
    var k = (Math.randomInt ? Math.randomInt(j + 1)
                            : Math.floor(Math.random() * (j + 1)));
    var t = a[j]; a[j] = a[k]; a[k] = t;
  }
  return a;	
};

QJ.MPMZ.tl._USAUSAUSAUSA = function() {
	
	this._coolDown = this._coolDown || 0;	
	if (this._coolDown > 0) {
	   this._coolDown -= 1;
	   return;
	}
    if (!this._USAUSAIndex || this._USAUSAIndex.length <= 0) {
		this._USAUSAIndex = QJ.MPMZ.tl._shuffledZeroToNine();
	}
	
	if (AudioManager.isExistVoiceChannel(2)) {
	   	this._coolDown = 2;
		return;
	}
	let index = this._USAUSAIndex.pop();
	let seName = "USAUSA" + index;
    AudioManager.playVoice({ name: seName, volume: 90, pitch: 100, pan: 0 }, false, 2);
	this._coolDown = 10;
	
};

// 妹妹挑选食材（构表 or 抽取）
// 用法：
// 1) 构表：QJ.MPMZ.tl._imoutoUtilImoutoCookingPickIngredients(prefKeyword)
// 2) 抽取：QJ.MPMZ.tl._imoutoUtilImoutoCookingPickIngredients({ pick: true })
QJ.MPMZ.tl._imoutoUtilImoutoCookingPickIngredients = function(preference) {
  const slot = 15;

  // -------- A) 抽取模式 --------
  const pickMode = (preference && preference === 'picking') ||
                   (preference && typeof preference === 'object' && preference.pick);

  if (pickMode) {
    const list = $gameNumberArray.value(slot);
    if (!Array.isArray(list) || list.length === 0) return null;

    // 计算总权重（跳过 hold<=0 / mul<=0）
    let total = 0;
    for (let i = 0; i < list.length; i++) {
      const e    = list[i] || {};
      const hold = Math.max(0, (e.hold | 0));
      const mul0 = Number(e.mul);
      const mul  = Number.isFinite(mul0) ? Math.max(0, mul0) : 1;
      if (hold > 0 && mul > 0) total += hold * mul;
    }
    if (total <= 0) return null;

    // 轮盘抽样
    let r = Math.random() * total;
    for (let i = 0; i < list.length; i++) {
      const e    = list[i] || {};
      const hold = Math.max(0, (e.hold | 0));
      const mul0 = Number(e.mul);
      const mul  = Number.isFinite(mul0) ? Math.max(0, mul0) : 1;
      if (hold <= 0 || mul <= 0) continue;

      const w = hold * mul;
      if (r < w) {
        // 命中：库存-1
        e.hold = hold - 1;

        // 库存 0 就移除，避免数组积累无效项
        if (e.hold <= 0) list.splice(i, 1);

        // 写回
        $gameNumberArray.setValue(slot, list);
        return e.id;
      }
      r -= w;
    }
    return null;
  }

  // -------- B) 构表模式 --------
  const pref = (typeof preference === 'string' ? preference : '').toLowerCase().trim();
  const items = $gameParty.items();
  const list  = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (!item || !item.note) continue;

    const m = item.note.match(/<Ingredients:\s*([^>]+)>/i);
    if (!m) continue;

    const lower = String(m[1] || '').toLowerCase();

    // 排除妹妹不喜欢的辣椒
    if (lower.includes('chilli')) continue;

    // 库存与倍率（带裁顶与兜底）
    let hold = $gameParty.numItems(item) | 0;
    hold = Math.max(0, Math.min(hold, 9999)); // 防极端作弊撑爆权重

    if (hold <= 0) continue;

    let mul = (pref && lower.includes(pref)) ? 20 : 1;
    mul = Number.isFinite(+mul) ? Math.max(0, +mul) : 1;

    list.push({ id: item.id, hold, mul });
  }

  $gameNumberArray.setValue(slot, list);
  return null;
};



// 妹妹自己做饭动画
QJ.MPMZ.tl._imoutoUtilImoutoCookingHerselfPhaseOne = function () {
	
	this._coolDown = this._coolDown || 0;
    this._times    = this._times || 0;	
	if (this._coolDown > 0) {
	   this._coolDown -= 1;
	   return;
	}

	this._frames = this._frames || 1;
	
	let IMG = "kitchen_sis_cookingHerself" + this._frames;
	$gameScreen.showPictureFromPath(8, "kitchen_event", IMG, 0, 360, 180, 100, 100, 255, 0);	
	
	if (this._frames >= 3) {
		this._upend = true; 
		if (this._nextPhase) {
			AudioManager.playVoice({ name: "kitchen_ImoutoCooking_start", volume: 90, pitch: 100, pan: 0 }, false, 2);
			$gameScreen.picture(11)?.drill_PLAZ_setLayer( "最顶层" );
		    QJ.MPMZ.Shoot({
		       existData: [ ],
		       moveF:[
		         [8,0,QJ.MPMZ.tl._imoutoUtilImoutoCookingHerselfPhaseTwo]
		       ]
		    });
            this.setDead();			
		}			
	}

	if (this._upend && this._frames <= 1) {
		this._upend = false;
	}
	
	if (this._upend) {
		this._frames -= 1;
	} else {
		this._frames += 1;
	}
    this._coolDown = 8;	
};

// 开始投放食材
QJ.MPMZ.tl._imoutoUtilImoutoCookingHerselfPhaseTwo = function () {
	
	this._coolDown = this._coolDown || 0;
    this._times    = this._times || 0;	
	if (this._coolDown > 0) {
	   this._coolDown -= 1;
	   return;
	}

	this._frames = this._frames || 3;
	
	let IMG = "kitchen_sis_cookingHerself" + this._frames;
	if (this._smile && this._times === 0) {
		let seName = "kitchen_ImoutoCooking_goodStuff" + (1 + Math.randomInt(2));
		AudioManager.playVoice({ name: seName, volume: 90, pitch: 100, pan: 0 }, false, 2);
		IMG = "kitchen_sis_cookingHerself_alt" + this._frames;
		this._times += 1;
	}
	if (this._times > 0 ) {
		if (this._times < (6 + Math.randomInt(12))) {
		   IMG = "kitchen_sis_cookingHerself_alt" + this._frames;
		   this._times += 1;
		} else {
		   this._times = 0;
		   this._smile = false;
		}
	}	
	
	$gameScreen.showPictureFromPath(8, "kitchen_event", IMG, 0, 360, 180, 100, 100, 255, 0);	
	
	if (this._frames >= 5) {		
		// 食材放够了就进入下阶段
		if ($gameMap.getGroupBulletListQJ('ingredient').length > 8) {			
			IMG = "kitchen_sis_cookingHerself6";
			$gameScreen.showPictureFromPath(8, "kitchen_event", IMG, 0, 360, 180, 100, 100, 255, 0);
		    QJ.MPMZ.Shoot({
		       img:"null1",
			   groupName:['ImoutoCookingHerself'],
		       existData: [ ],
		       moveF:[
		         [16,0,QJ.MPMZ.tl._imoutoUtilImoutoCookingHerselfPhaseThree]
		       ]
		    });
		    for (let i = 7; i <= 27; i++) {
    		    let fileName = "kitchen_sis_cookingHerself" + i;
    		    fileName = "kitchen_event/" + fileName;
    		    ImageManager.loadPicture(fileName);
		    }
		    for (let i = 16; i <= 21; i++) {
    		    let fileName = "kitchen_sis_cookingHerself_alt" + i;
    		    fileName = "kitchen_event/" + fileName;
    		    ImageManager.loadPicture(fileName);
		    }			
            this.setDead();				
		}
		this._frames -= 1;
		this._upend = true;	
        // 投放食材
		let isMobile = false;
		if (Utils.isMobileDevice()) isMobile = true;
        QJ.MPMZ.tl._imoutoUtilImoutoAddIngredient.call(this,850,750,isMobile);
        QJ.MPMZ.tl._imoutoUtilImoutoAddIngredient.call(this,1100,750,isMobile);
        let randomSe = "ニュッ" + (Math.randomInt(2) + 1); 
		let randomPitch = 85 + Math.randomInt(40);
        AudioManager.playSe({ name: randomSe, volume: 85, pitch: randomPitch, pan: 0 });		
	}

	if (this._upend && this._frames <= 3) {
		this._frames = 1;
		this._coolDown = 8;
		this._upend = false;
		return false;
	}
	
	if (this._upend) {
		this._frames -= 1;
	} else {
		this._frames += 1;
	}
    this._coolDown = 8;	
};

// 妹妹投放食材
QJ.MPMZ.tl._imoutoUtilImoutoAddIngredient = function(tarX, tarY, isMobile) {

  let itemId = QJ.MPMZ.tl._imoutoUtilImoutoCookingPickIngredients({ pick: true });
  let item = $dataItems[itemId];
  if (!item) item = $dataItems[3];
  // 遇到喜欢的食材
        if (item.note && item.note.includes("<Ingredients:")) {
            let ingMatch = item.note.match(/<Ingredients:\s*(.+?)>/i);
            if (ingMatch) {
                let ingText = ingMatch[1];  
                let lowerIng = ingText.toLowerCase();
                if (lowerIng.includes("meat") || lowerIng.includes("chicken") || lowerIng.includes("fish") || lowerIng.includes("egg")) {
                      this._smile = true;
                }
			}
		}
  
  let icon = item.iconIndex;
  let posX = 900 + Math.randomInt(180);
  let posY = 850 + Math.randomInt(10);  
  let peakRate = 1 + (1 * Math.random());
  let { time, xExp, yExp } = QJ.MPMZ.tl.BulletTrajectoryFormula(tarX, tarY, posX, posY, peakRate,2);
  $gameNumberArray.value(16).push(itemId);

  let scale = 1.5;
  if (isMobile) scale = 3;

   QJ.MPMZ.Shoot({
        img:['I',icon], 
		position:[['S',tarX],['S',tarY]],
        initialRotation:['S',0],
		opacity:'0|0~8/1~180/1',
		scale:scale,
		z:"A",
        imgRotation:['S',0],
		moveType:["F", xExp, yExp],
        existData:[ 
		    { t: ['Time', time], d:[1,10,1.2], a: ['F',QJ.MPMZ.tl._imoutoUtilIngredientStayInBowl,[icon, isMobile]] }  
		],
		
    });
};

// 食材留在碗里
QJ.MPMZ.tl._imoutoUtilIngredientStayInBowl = function(icon, isMobile) {

  let posX = this.inheritX();
  let posY = this.inheritY();  
  let scale = 1.5;
  if (isMobile) scale = 3;
  
   QJ.MPMZ.Shoot({
        img:['I',icon], 
		groupName:['ingredient'],
		position:[['S',posX],['S',posY]],
        initialRotation:['S',0],
		opacity:1,
		scale:scale,
		z:"A",
        imgRotation:['S',0],
		moveType:["S", 0],
        existData:[ 
		    //{ t: ['Time', time], d:[1,10,1.2], a: ['F',QJ.MPMZ.tl._imoutoUtilIngredientStayInBowl,[icon]] }  
		],		
    });
};

// 妹妹自己做饭-搅拌食材
QJ.MPMZ.tl._imoutoUtilImoutoCookingHerselfPhaseThree = function () {
	this._result    = this._result || "";
	this._coolDown = this._coolDown || 0;
    this._times    = this._times || 0;	
	if (this._coolDown > 0) {
	   this._coolDown -= 1;
	   return;
	}
	this._frames = this._frames || 7;
	
	let IMG = "kitchen_sis_cookingHerself" + this._frames;
	$gameScreen.showPictureFromPath(8, "kitchen_event", IMG, 0, 360, 180, 100, 100, 255, 0);

	if (this._frames === 7)   AudioManager.playVoice({ name: "kitchen_ImoutoCooking_mashIngredient1", volume: 90, pitch: 100, pan: 0 }, false, 2);
	
	if (this._frames >= 16 && this._frames <= 21) {
        IMG = "kitchen_sis_cookingHerself_alt" + this._frames;
	    $gameScreen.showPictureFromPath(11, "kitchen_event", IMG, 0, 760, 700, 100, 100, 255, 0);
		$gameScreen.picture(11).drill_PLAZ_setLayer( "最顶层" );
	}	
    // 让食材消失
    if (this._frames === 16) {	
	      let seName = "kitchen_ImoutoCooking_mashIngredient" + (2 + Math.randomInt(2));
          AudioManager.playVoice({ name: seName, volume: 90, pitch: 100, pan: 0 }, false, 3);	
		  let bulletList = $gameMap.getGroupBulletListQJ('ingredient');
		      bulletList.forEach(bid => {
    		    let bullet = $gameMap._mapBulletsQJ[bid];
        	    if (bullet) {
                    bullet.setDead({ t: ['Time', 0], d: [1, 30, 1.3] });
                 }
              });
			  
		function pick3(arr) {
  if (!Array.isArray(arr) || arr.length < 3) throw new Error('数组长度必须 ≥ 3');
  const a = arr.slice();                       // 拷贝，避免改原数组
  for (let i = a.length - 1; i > 0; i--) {     // Fisher–Yates 洗牌
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, 3);
}

       const arr = $gameNumberArray.value(16) || [2,2,2];
	   // 结算食材并获取料理结果
       let three = pick3(arr);
	   this._result = "failed";
	   let dish = $gameMap.checkCraftingFormula(three);
       $gameVariables.setValue(78, dish.result);
	   // 失去食材
	   three.forEach(function(i) {
           $gameParty.loseItem($dataItems[i], 1);
	   });	
	   if (dish.type && dish.type === "successful") {
		  this._result = "successful"; 
	   }
       AudioManager.playSe({ name: "xへのImpactの影響", volume: 65, pitch: 150, pan: 0 });			  
       AudioManager.playBgs({ name: "ご飯を一気にかき込む", volume: 85, pitch: 65, pan: 0 });   
	}
	
	if (this._frames >= 21 && !this._completed) {
		this._coolDown = 8;
		this._frames = 17;
		this._times += 1;
		if (this._times === 1)  AudioManager.playVoice({ name: "kitchen_ImoutoCooking_stirVigorously", volume: 90, pitch: 100, pan: 0 }, true, 2);	
		
		let point = QJ.MPMZ.tl.isBgmInWindow(3, 5) || QJ.MPMZ.tl.isBgmInWindow(10, 17) || QJ.MPMZ.tl.isBgmInWindow(21, 23) || QJ.MPMZ.tl.isBgmInWindow(29, 35);
		if (this._times > 2 && point) {
			this._completed = true;
			if (this._result && this._result === "successful") {
			  AudioManager.fadeOutBgm(3);
			}
		}
		return;
	}

	if (this._frames >= 27 && this._completed) {
		
		let dish = QJ.MPMZ.Shoot({
		                  existData: [ ],
		                  moveF:[ ]
		           });	   
		if (this._result === "successful") {
            dish.addMoveData("F",[4,0,QJ.MPMZ.tl._imoutoUtilImoutoCookingHerselfSuccessfulDish]);
		} else {
            dish.addMoveData("F",[4,0,QJ.MPMZ.tl._imoutoUtilImoutoCookingHerselfFailedDish]);
		}			
		this.setDead();	
	}

	this._frames += 1;
    this._coolDown = 8;
    if (this._frames === 15 || this._frames === 17) {
		this._coolDown += 16;
	}
	// 预加载
    if (this._frames === 22) {
		AudioManager.fadeOutBgs(1);
		AudioManager.playVoice({ name: "kitchen_ImoutoCooking_beforeResult", volume: 90, pitch: 100, pan: 0 }, false, 2);
        // 成功料理
		if ( this._result === "successful" ) {
		    for (let i = 1; i <= 5; i++) {
    		    let fileName = "kitchen_sis_cookingHerself_successful" + i;
    		    fileName = "kitchen_event/" + fileName;
    		    ImageManager.loadPicture(fileName);
		    }			
		    for (let i = 2; i <= 5; i++) {
    		    let fileName = "kitchen_sis_cookingHerself_glowingDish" + i;
    		    fileName = "kitchen_event/" + fileName;
    		    ImageManager.loadPicture(fileName);
		    }
		}
        // 失败料理
		if ( this._result === "failed" ) {			
		    for (let i = 1; i <= 7; i++) {
    		    let fileName = "kitchen_sis_cookingHerself_failed" + i;
    		    fileName = "kitchen_event/" + fileName;
    		    ImageManager.loadPicture(fileName);
		    }
		    for (let i = 1; i <= 8; i++) {
    		    let fileName = "kitchen_sis_cookingHerself_explode" + i;
    		    fileName = "kitchen_event/" + fileName;
    		    ImageManager.loadPicture(fileName);
		    }
		    for (let i = 1; i <= 8; i++) {
    		    let fileName = "kitchen_droplight" + i;
    		    fileName = "kitchen_event/" + fileName;
    		    ImageManager.loadPicture(fileName);
		    }			
		    for (let i = 1; i <= 15; i++) {
    		    let fileName = "kitchen_sis_cookingHerself_failedDish" + i;
    		    fileName = "kitchen_event/" + fileName;
    		    ImageManager.loadPicture(fileName);
		    }		
	   }
	}
};

// 妹妹自己做饭-成功料理
QJ.MPMZ.tl._imoutoUtilImoutoCookingHerselfSuccessfulDish = function () {

  this._coolDown = this._coolDown || 0;
  this._times    = this._times || 0;

  if (this._coolDown > 0) {
    this._coolDown -= 1;
    return;
  }

  this._frames = this._frames || 1;
  if (this._frames === 1)  {
	  AudioManager.playSe({ name: "キラン☆キラーン 派手なインパクト3", volume: 85, pitch: 100, pan: 0 });
      AudioManager.playVoice({ name: "kitchen_ImoutoCooking_successfulDish", volume: 90, pitch: 100, pan: 0 }, false, 2);
	  AudioManager.playBgm({ name: "Imouto’sCookingGame2", volume: 70, pitch: 100, pan: 0 });
  }
  // 妹妹成功动作帧
  let IMG = "kitchen_sis_cookingHerself_successful" + this._frames;

  $gameScreen.showPictureFromPath(
    8, "kitchen_event", IMG, 0, 0, 0, 100, 100, 255, 0
  );

  // 前景遮挡替换
  if (!this._replace) {
	   this._replace = true;
    IMG = "kitchen_sis_cookingHerself_successful_alt";
    $gameScreen.showPictureFromPath(
      14, "kitchen_event", IMG, 0, 700, 800, 100, 100, 255, 0
    );
	 $gameScreen.erasePicture(11);
  }

    // 料理光效图层
    let index = this._frames;
	if (index === 1) index = 2
    IMG = "kitchen_sis_cookingHerself_glowingDish" + index;
    $gameScreen.showPictureFromPath(
      13, "kitchen_event", IMG, 0, 0, 0, 100, 100, 255, 0
    );
    // 料理发光
    if (this._frames > 1 && !this._epicGlow) {
		this._epicGlow = true;
		$gameMap.createFilter("EpicGlow", "glow", 5013);
		$gameMap.setFilter("EpicGlow" ,[0,0,255,255,255]);
		$gameMap.moveFilter("EpicGlow", [1,1,255,226,90], 8);
	}

  if (this._frames >= 5) {
    this._coolDown = 8;
    this._frames = 2;
    return;
  }
  
  if (this._frames === 1) $gameMap.steupCEQJ(66,1,{skipAnim:true,waitTime:60,dishType:"successful"});
  
  this._frames += 1;
  this._coolDown = 8;
};

// 妹妹自己做饭-失败料理
QJ.MPMZ.tl._imoutoUtilImoutoCookingHerselfFailedDish = function () {

  this._coolDown = this._coolDown || 0;
  this._times    = this._times || 0;

  if (this._coolDown > 0) {
    this._coolDown -= 1;
    return;
  }

  this._frames = this._frames || 1;

  // 妹妹失败动作帧
  let IMG = "kitchen_sis_cookingHerself_failed" + this._frames;
  if (this._frames > 3 && this._frames < 6) IMG = "kitchen_sis_cookingHerself_failed3";
  if (this._frames > 7)                     IMG = "kitchen_sis_cookingHerself_failed7";

  $gameScreen.showPictureFromPath(
    8, "kitchen_event", IMG, 0, 360, 130, 100, 100, 255, 0
  );

  if (this._frames === 2)  {
	  AudioManager.playSe({ name: "Explosion2", volume: 85, pitch: 100, pan: 0 });
	  AudioManager.playVoice({ name: "kitchen_ImoutoCooking_failedDish", volume: 90, pitch: 100, pan: 0 }, false, 2);
      $gameScreen.showPicture(11, "kitchen_event/kitchen_sis_cookingHerself_alt21", 0, 760, 700, 100, 100, 255, 0);	  
	  // 屏幕摇晃效果
	  $gameScreen.setShakeRandom();
	  $gameScreen.startShake(6, 9, 45);
	  $gameScreen.startFlash([255,255,255,180], 30);
      // BGM降调	  
	  QJ.MPMZ.Shoot({
   	  count:100,
   	  existData: [ ],
   	  moveF:[
     	  [0,0,QJ.MPMZ.tl._imoutoSceneBgmAutoPitchLowering]
   	    ]
	  });	  
  }

  // 爆炸效果
  if (this._frames <= 9) {
    if (!this._disableEffect) {	
      if (this._frames <= 8) {
        IMG = "kitchen_sis_cookingHerself_explode" + this._frames;
        $gameScreen.showPictureFromPath(
          14, "kitchen_event", IMG, 0, 0, 0, 100, 100, 255, 0
        );
      } else {
        const pic = $gameScreen.picture(14);
        if (pic) {
          $gameScreen.movePicture(
            14, pic.origin(), pic.x(), pic.y(),
            pic.scaleX(), pic.scaleY(), 0, 0, 30
          );
        }
      }
    } else {
      $gameScreen.erasePicture(14);
    }
  }

  // 因爆炸摇晃的吊灯
  if (!this._disableEffect && this._frames >= 2 && this._frames <= 10) {
    let index = this._frames - 1;
    if (index >= 9) index = 1;
    IMG = "kitchen_droplight" + index;
    $gameScreen.showPictureFromPath(
      12, "kitchen_event", IMG, 0, 0, 0, 100, 100, 255, 0
    );
  } else {
    if (this._disableEffect && !$gameScreen.picture(12).name().includes("droplight1")) {
      $gameScreen.showPicture(
        12, "kitchen_event/kitchen_droplight1", 0, 0, 0, 100, 100, 255, 0
      );
    }
  }

  // 烧焦的料理效果
  if (this._frames >= 4) {
    const index = this._frames - 3;
    IMG = "kitchen_sis_cookingHerself_failedDish" + index;
    $gameScreen.showPictureFromPath(
      13, "kitchen_event", IMG, 0, 610, 300, 100, 100, 255, 0
    );
  }

  if (this._frames >= 18) {
    this._disableEffect = true;
    this._coolDown = 8;
    this._frames = 8;
    return;
  }
  
  if (this._frames === 7) $gameMap.steupCEQJ(66,1,{skipAnim:true,dishType:"failed"});
  
  this._frames += 1;
  this._coolDown = 8;
};


// 妹妹眨眼/挂机打瞌睡监听
QJ.MPMZ.tl._imoutoUtilImoutoBlinking = function (initialize) {

	function getDrowsyCount() {
		let Imouto = $gameActors.actor(2);
		let count  = Imouto.isStateAffected(36) ? 12 : 40;	
		if ($gameSystem.hour() >= 21)  count -= 5;
		if (this._feelingDrowsy === 1) count += 5;
		if (this._feelingDrowsy === 2) count += 10;
		return count;
	}

    if (initialize && initialize == "check") {
		if ( !$gameScreen.picture(5) ) return;
		if ( $gameScreen.picture(5)._opacity < 250 ) return;		
		if ($gameMessage.isBusy()) {
		// 退出待机状态时需重置变量	
			this._drowsyCount = 0;
            this._feelingDrowsy = 0;
            if (this._frames === 5)	this._frames = 3;				
			return;
		}
		// 让妹妹处于待机状态将累加计数
		this._drowsyCount += 1;
		// 计数累加到一定值后开始有概率犯困
        let count = getDrowsyCount();
		if (this._drowsyCount > count && Math.random() > 0.8) {
			if (!this._feelingDrowsy) {
				if (this._coolDown > 30) this._coolDown = 30;
				this._feelingDrowsy = 1;
			}
		}
		return;
	}

    if (initialize && initialize == "pinchCheek") {
		this._coolDown = this._coolDown || 0;
		if (this._coolDown > 0) {
			this._coolDown -= 1;
			return;
		}		
		const pic = $gameScreen.picture(30);
		const isVideo   = !!(pic && pic.isVideo());        
		const isPaused  = !!(pic && pic.isVideoPause());   
		const isEnded   = !!(pic && pic.isVideoEnd());     
		const isPlaying = isVideo && !isPaused && !isEnded && !$gameMessage.isBusy();
		
        if (!isPlaying && $gameScreen.isPointerInnerPicture(50)) {
			CustomCursor.setImg('img/pictures/pointer_touch.png');
			if ( TouchInput.drill_isLeftTriggerd() || TouchInput.drill_isLeftPressed() ) {	
			    $gameMap.event(15).steupCEQJ(6, {pinchCheek:true});
				CustomCursor.reset();
				this._coolDown = 210;
			}
        } else {
           CustomCursor.reset();
		   this._coolDown = 15;
		}			
		return;
	}
	
	this._coolDown = this._coolDown || 0;	
	if (this._coolDown > 0) {
	   this._coolDown -= 1;
	   return;
	}

    if ($gameVariables._data[20] < 40) {
		$gameScreen.showPicture(5, "sis_room/sis_room_angryImouto", 0, 260, 310, 100, 100, 255, 0);
		this.setDead({t:['Time',0]});
	}

	this._frames       = this._frames       || 1;
	this._speed        = this._speed        || 2;
	this._drowsyCount  = this._drowsyCount  || 0;
    
	let pic = $gameScreen.picture(5);
	if ( !pic || !pic.name().includes("dozingOff") ) {
		this.setDead({t:['Time',0]});
		return;		
	}

    if ( pic._drill_PSh_commandChangeTank.length > 0 ) {
		this._coolDown += 30;
		return;
	}

	let IMG = "sis_room/sis_room_dozingOff" + this._frames;
	$gameScreen.changePictureName(5, IMG);
	// 犯困第一阶段
	if (!this._upend && this._frames === 3 && this._feelingDrowsy === 1) {
	    this._frames = 5;
		this._coolDown += 120;
		if (this._drowsyCount >= getDrowsyCount()) {
			this._feelingDrowsy = 2;
			// 预加载
			 for (let i = 6; i <= 17; i++) {
				 ImageManager.loadPicture( `sis_room/sis_room_dozingOff${i}` );
			 }	
		}
		return;
	}
	// 犯困第二阶段
	if (this._frames >= 5 && this._feelingDrowsy === 2) {
        this._frames += 1;
		this._frames  = Math.min(9, this._frames);
		this._coolDown += 10;
		if (this._drowsyCount >= getDrowsyCount()) {
			setTimeout(() => $gameSelfSwitches.setValue([$gameMap.mapId(), 15, 'T'], true), 2000);	
			this._feelingDrowsy = 3;
		}
		// 锁住常规互动
		$gameSelfSwitches.setValue([$gameMap.mapId(), 15, 'S'], true);
		return;
	}	
	
	// 常态眨眼/犯困第三阶段	
	let max = this._feelingDrowsy === 3 ? 17 : 4;
	if (this._frames >= max) {
		let waitTime = this._feelingDrowsy === 3 ? 24 : 6;
		this._coolDown += waitTime;
		this._frames -= 1;
		this._upend = true;
		return;
	}

    let min = this._feelingDrowsy === 3 ? 9 : 1;
	if (this._upend && this._frames <= min) {
		let waitTime = this._feelingDrowsy === 3 ? 40 : Math.randomInt(120) + 180;
		this._coolDown += waitTime;
		this._frames += 1;
		this._upend = false;
		return;
	}
	
	if (this._upend) {
		this._frames -= 1;
	} else {
		this._frames += 1;
	}
	
	this._frames = Math.min(this._frames, max);
    this._coolDown += 2;	
	let waitTime = this._feelingDrowsy > 1 ? 24 : 2;
	this._coolDown += waitTime;
	
};

// 妹妹浇花
QJ.MPMZ.tl._imoutoUtilImoutoWateringTheFlowers = function () {
	
	this._coolDown = this._coolDown || 0;	
	if (this._coolDown > 0) {
	   this._coolDown -= 1;
	   return;
	}

	this._frames = this._frames || 1;

	if ( !$gameScreen.picture(5) || !$gameScreen.picture(5).name().includes("wateringTheFlowers") ) {
		this.setDead({t:['Time',0]});
		return;		
	}
	if ( $gameScreen.picture(5)._opacity < 250 ) {
		this._coolDown = 60;	
		return;		
	}
	
	let IMG = "sis_room/sis_room_wateringTheFlowers" + this._frames;
    $gameScreen.changePictureName(5, IMG);
	
	if (this._frames >= 4) {
		this._coolDown = 6;
		this._frames = 1;
		return;
	}
	
	this._frames += 1;
    this._coolDown = 6;	
	
};

// 妹妹一个人玩游戏手柄动画
QJ.MPMZ.tl._imoutoUtilImoutoSoloPlay = function () {
	
	this._coolDown = this._coolDown || 0;	
	if (this._coolDown > 0) {
	   this._coolDown -= 1;
	   return;
	}

	this._frames = this._frames || 0;
	
	let IMG = "alt_sister_normal_hand" + this._frames;
	$gameScreen.showPictureFromPath(8, "game_itazura", IMG, 0, 0, 0, 100, 100, 255, 0);	
	
	if (this._frames >= 6) {
		this._coolDown = Math.randomInt(4) + 2;
		this._frames -= 1;
		this._upend = true;
		return;
	}

	if (this._upend && this._frames <= 0) {
		this._coolDown = Math.randomInt(4) + 2;
		this._frames += 1;
		this._upend = false;
		return;
	}
	
	if (this._upend) {
		this._frames -= 1;
	} else {
		this._frames += 1;
	}
    this._coolDown = Math.randomInt(4) + 2;	
};


// 夜袭噩梦-妹妹呆毛怪物
QJ.MPMZ.tl._nightVisitImoutoAhogeMonster = function() {
	
	this._coolDown = this._coolDown || 0;

	if (this._coolDown > 0) {
	   this._coolDown -= 1;
	   return;
	}
	if ($gameMessage.hasText()) {
	   this._coolDown = 15;
	   return;
	}

	this._frames = this._frames || 1;
	this._speed = this._speed || 6;
	
	var IMG1 = "nightVisit_Imouto_AhogeMonster" + this._frames;
	
	if (this._frames > 42 && !this._scaring) {
		IMG1 = "nightVisit_Imouto_AhogeMonster_loop" + this._frames;
	}
	
	$gameScreen.showPictureFromPath(10, "nightmare", IMG1, 0, 0, 0, 100, 100, 255, 0);
    
	if (this._frames === 1) this._coolDown += 60;
	if (this._frames === 12) this._coolDown += 60;

	// 播放站立声
	if (this._frames === 2) {
        let	se = { name: "人がモンスターに変化", volume: 70, pitch: 150, pan: 0 };
    	AudioManager.playSe(se);
	}
	// 停止站立声
	if (this._frames === 15) {
        AudioManager.stopSe();
	}
	// 停止站立声
	if (this._frames === 25) {
        let	se = { name: "血がたれる1", volume: 70, pitch: 80, pan: 0 };
    	AudioManager.playSe(se);
	}
	
	// 开始低声哼唱
	if (this._frames === 29 && !this._startHumming) {
        let	voice = { name: "nightmare_humming", volume: 90, pitch: 100, pan: 0 };
    	AudioManager.playVoice(voice, true, 1);
		this._startHumming = true;
	}
	
	// 播放脚步声
	if (this._frames >= 18 && this._frames <= 58 && this._frames % 4 === 0 && !this._stopFootSteps) {
    	let seName = "nightmare_footsteps" + Math.randomInt(4);
        let	se = { name: seName, volume: 70, pitch: 100, pan: 0 };
    	AudioManager.playSe(se);
	}


   	this._frames += 1;
	this._coolDown += 6;	
	
    // 未被惊扰时循环播放夜游动画
    if (this._frames === 58 && !this._scaring) {
	    this._coolDown += 6;
		this._frames = 30;
		if (this._startled) {
		this._scaring = true;
		} 
		return;
	}

	// 惊扰音效
	if (this._frames === 50 && this._scaring) {
		AudioManager.stopSe();
        let	voice = { name: "nightmare_noticing", volume: 90, pitch: 100, pan: 0 };
    	AudioManager.playVoice(voice, false, 1);
		this._stopFootSteps = true;
	}

	// 播放奔跑声
	if (this._frames === 60) {
        let	se = { name: "プールサイドを走る", volume: 70, pitch: 150, pan: 0 };
    	AudioManager.playSe(se);
	}
	
	// 惊吓
	if (this._frames >= 73) {	  
	    this._coolDown += 999;
		this._frames = 1;
		AudioManager.stopSe();
        $gameMap.event(7).steupCEQJ(4,{followUp:true});		
		this.setDead();
	}	
};


// 实验中的吃饭动画
QJ.MPMZ.tl._imoutoUtilTest = function() {
	
	this._coolDown = this._coolDown || 0;	
	if (this._coolDown > 0) {
	   this._coolDown -= 1;
	   return;
	}
	
	this._frames = this._frames || 1;
	
	var Imouto = "辣晕" + this._frames;
	$gameScreen.showPictureFromPath(11, "diningRoom", Imouto, 0, 0, 0, 100, 100, 255, 0);

    if (this._frames == 1) this._coolDown += 60;
	if ([2,3,4].includes(this._frames)) this._coolDown += 12;

    var index = this._frames;	
	if ([1,2,3,4].includes(this._frames)) index = "1-4";
	if ([9,10].includes(this._frames)) index = "9-10";
	if ([11,12].includes(this._frames)) index = "11-12";
	if ([13,14].includes(this._frames)) index = "13-14";
	if ([15,16].includes(this._frames)) index = "15-16";
	if ([17,18,19,20,21].includes(this._frames)) index = "17";
	
	var Shadow = "影子" + index;
	$gameScreen.showPictureFromPath(10, "diningRoom", Shadow, 0, 0, 0, 100, 100, 255, 2);

	if (this._frames == 21) {
		this._frames = 1;
		this._coolDown += 90;
	}
	
	this._frames += 1;
	this._coolDown += 3;
	
};