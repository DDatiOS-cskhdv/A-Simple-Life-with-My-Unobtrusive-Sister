//=============================================================================
//
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc [弹幕模板库][放在QJ-MapProjectileMZ.js下][您可自由修改]
 * @author 仇九
 *
 * @help 
 * 1.需要装有QJ-MapProjectileMZ.js时才能使用此插件，否则报错。
 * 2.此插件需要放在放在QJ-MapProjectileMZ.js下。
 * 3.您可以按照此插件中的说明（请打开此插件文件查看）来修改此插件。
 * 4.插件详细教程：
 *https://qiujiu-9.github.io
 *
 */
//=============================================================================
//
//=============================================================================




// RPG场景通用生成物件
QJ.MPMZ.tl.generateAdventureMapRegularObjects = function() {
	let mapId         = $gameMap.mapId();
	let daily         = false;
	let rainyCreation = false;
	
	if ($gameSelfVariables.value([mapId, 1, 'rainyCreation']) > 0 ) {
		rainyCreation = true;
		$gameSelfVariables.setValue([mapId, 1, 'rainyCreation'], 0);
	}
	
	if ($gameSelfVariables.value([mapId, 1, 'day']) < $gameSystem.day()) {
		daily   = true;
		let day = $gameSystem.day();
		$gameSelfVariables.setValue([mapId, 1, 'day'], day);	
	}
	
	if ([15,29,30,31,32,35,39,41,42,43].includes(mapId)) {
	    // 迷失森林
	    if (daily) {
		   // 生成G
	       let num = 1 + Math.randomInt(5);
		   if (Math.random() > 0.3) QJ.SE.spawnRegionNum(1,16,[0],num,true);
		   if (mapId === 43)  QJ.MPMZ.tl.ex_chahuiExpress({commonOccurrence:true});
		}
	}
	
};

// 浅层遗迹迷宫坑洞生成
QJ.MPMZ.tl.ex_LabyrinthScenePreload = function() {

	if (!Utils.isMobileDevice()) {
    var regionArray1 = [];
    var regionArray2 = [];
    for (var y = 0; y < $dataMap.height; y++) {
        for (var x = 0; x < $dataMap.width; x++) {
            if ($gameMap.regionId(x, y) === 214) {
                regionArray1.push({ x: x, y: y });
            }
            if ($gameMap.regionId(x, y) === 215) {
                regionArray2.push({ x: x, y: y });
            }
        }
    }

    for (var i = 0; i < regionArray1.length; i++) {
        var pos = regionArray1[i];
        var name = "window_lay_c" + i;
        var xx = pos.x; 
        var yy = pos.y + 0.3; 
        $gameScreen._particle.particleSet(0, name, 'tilemap', 'window_lay_c', 'above', xx, yy);
    }


    for (var i = 0; i < regionArray2.length; i++) {
        var pos = regionArray2[i];
        var name = "light_orange_c" + i;
        var xx = pos.x;
        var yy = pos.y + 0.4;
        $gameScreen._particle.particleSet(0, name, 'tilemap', 'light_orange_c', 'below', xx, yy);
     }
	}

    QJ.MPMZ.Shoot({
        position: [['Map', 10], ['Map', 55]],
        initialRotation: ['S', 0],
        imgRotation: ['F'],
        moveType: ['S', 0],
        anchor: [0.4, 0.85],
        collisionBox: ['R', 248, 65],
        existData: [
            { t: ['G', ['"enemy"', '"object"']], a: ['C', 133, [4, 0, 0]], p: [-1, false, true], c: ['T', 0, 4, true] },
            { t: ['B', ['playerFeet']], a: ['C', 133, [28, 7, 30]], p: [-1, false, true], c: ['T', 0, 15, true] }
        ]
    });
	
    QJ.MPMZ.Shoot({
        img: "null1",
        position: [['Map', 8], ['Map', 28]],
        initialRotation: ['S', 0],
        imgRotation: ['F'],
        moveType: ['S', 0],
        anchor: [0.5, 0.7],
        collisionBox: ['R', 96, 96],
        existData: [
            { t: ['G', ['"enemy"', '"object"']], a: ['C', 133, [4, 0, 0]], p: [-1, false, true], c: ['T', 0, 4, true] },
            { t: ['P'], a: ['C', 133, [28, 4, 10]], p: [-1, false, true], c: ['T', 0, 15, true] }
        ]
    });

    QJ.MPMZ.Shoot({
        img: "null1",
        position: [['Map', 7], ['Map', 29]],
        initialRotation: ['S', 0],
        imgRotation: ['F'],
        moveType: ['S', 0],
        anchor: [0.3, 0.75],
        collisionBox: ['R', 75, 120],
        existData: [
            { t: ['G', ['"enemy"', '"object"']], a: ['C', 133, [4, 0, 0]], p: [-1, false, true], c: ['T', 0, 4, true] },
            { t: ['P'], a: ['C', 133, [28, 4, 10]], p: [-1, false, true], c: ['T', 0, 15, true] }
        ]
    });

    QJ.MPMZ.Shoot({
        img: "null1",
        position: [['Map', 11], ['Map', 28]],
        initialRotation: ['S', 0],
        imgRotation: ['F'],
        moveType: ['S', 0],
        anchor: [0.5, 3.2],
        collisionBox: ['R', 200, 8],
        existData: [
            { t: ['G', ['"enemy"', '"object"']], a: ['C', 133, [4, 0, 0]], p: [-1, false, true], c: ['T', 0, 4, true] },
            { t: ['P'], a: ['C', 133, [28, 4, 10]], p: [-1, false, true], c: ['T', 0, 15, true] }
        ]
    });

    QJ.MPMZ.Shoot({
        img: "null1",
        position: [['Map', 12], ['Map', 30]],
        initialRotation: ['S', 0],
        imgRotation: ['F'],
        moveType: ['S', 0],
        anchor: [0.05, 14],
        collisionBox: ['R', 54, 1],
        existData: [
            { t: ['G', ['"enemy"', '"object"']], a: ['C', 133, [4, 0, 0]], p: [-1, false, true], c: ['T', 0, 4, true] },
            { t: ['P'], a: ['C', 133, [28, 4, 10]], p: [-1, false, true], c: ['T', 0, 15, true] }
        ]
    });

    QJ.MPMZ.Shoot({
        img: "null1",
        position: [['Map', 59], ['Map', 45]],
        initialRotation: ['S', 0],
        imgRotation: ['F'],
        moveType: ['S', 0],
        anchor: [0.05, 0.5],
        collisionBox: ['R', 54, 118],
        existData: [
            { t: ['G', ['"enemy"', '"object"']], a: ['C', 133, [4, 0, 0]], p: [-1, false, true] },
            { t: ['P'], a: ['C', 133, [5, 40, 23]], p: [-1, false, true], c: ['T', 0, 15, true] }
        ]
    });

    QJ.MPMZ.Shoot({
        img: "null1",
        position: [['Map', 56], ['Map', 35]],
        initialRotation: ['S', 0],
        imgRotation: ['F'],
        moveType: ['S', 0],
        collisionBox: ['R', 600, 500],
        existData: [
            { t: ['G', ['"enemy"', '"object"']], a: ['C', 133, [5, 40, 23]], p: [-1, false, true], c: ['T', 0, 15, true] },
            { t: ['P'], a: ['C', 133, [5, 40, 23]], p: [-1, false, true], c: ['T', 0, 15, true] }
        ]
    });
};


// 地图转场演出
QJ.MPMZ.tl.ex_mapThemeNameFadeIn = async function() {

    const mapId = $gameMap.mapId();
    const mapInfo = $dataMapInfos[mapId];
    const mapName = mapInfo.name;

    if (mapName.includes($gameVariables.value(88))) {
		// 同主题地图立即显示右上角地图名并跳过演出
        QJ.MPMZ.tl.ex_mapThemeNameDisplay();
        return;
    }

    // 每天最多播放一次特殊转场CG
    let transitionCG = false;
    if (!$gameSelfSwitches.value([mapId, 1, 'S'])) {
		$gameSelfSwitches.setValue([mapId, 1, 'S'], true);
        transitionCG = true;
    }

    const MAP_IMAGE_MAP = [
        { mapName: '冒険の遊歩道',        key: 'AdventurersPathway' },
        { mapName: '遗迹迷宫',           key: 'ShallowRuinsLabyrinth' },
        { mapName: '遗忘的墓穴',         key: 'ForgottenCatacombe' },
        { mapName: '遺跡の森',            key: 'ForestofRuins' },
        { mapName: '迷いの森',            key: 'AbandonedForest' },
        { mapName: '開発中エリア',         key: 'ExcavationSite' },
        { mapName: '堕落の聖堂',          key: 'TheFallenChurch' },
        { mapName: '不思議な隙間',        key: 'fushiginasukima' },
        { mapName: '大焦熱溶岩帯',        key: 'ScorchingLavaZone' },
        { mapName: '星之门',             key: 'DoorofStar' },
		{ mapName: '尼伯龙根',           key: 'Nibelungen' }
    ];

    let target = null;
    for (const entry of MAP_IMAGE_MAP) {
        if (mapName.includes(entry.mapName)) {
            target = entry.key;
            break;
        }
    }

    // 尼伯龙根特殊处理
    if (mapName.includes('尼伯龙根')) {
        const sw = $gameSelfVariables.value([mapId, 14, 'switch']);
         target = sw > 0 ? 'AbandonedForest' : 'Nibelungen';
    }
    if (!target) return;

    // 检查是否存在CG图像来决定演出风格
    const fileName = `${target}CG.rpgmvp`;
    const exists = await QJ.MPMZ.tl.checkPictureExists(
        ['img', 'projectiles', 'map_name'],
        fileName
    );
	if (exists && transitionCG) {
	    QJ.MPMZ.tl.showMapNameWithCGEffect(target);
	    return;
	}

  let fontFace = "MPLUS2ExtraBold";
  if (ConfigManager.language > 2)  fontFace = DrillUp.g_DFF_fontFace;
  let textArray = window.systemFeatureText && window.systemFeatureText[target];
  if (!textArray) return;
    // 播放音效
  AudioManager.playSe({
        name: 'サウンドロゴ　クール系　ファーン',
        volume: 90,
        pitch: 100,
        pan: 0
  });  
  
  let BulletText = textArray.mapName;
	  QJ.MPMZ.Shoot({	  
		  img: ['T', {
				text: BulletText,
				arrangementMode: 0,
				textColor: "#fffef2",
				fontSize: 100,
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
				shadowBlur: 8,
				shadowColor: "#000000",
				shadowOffsetX: 0,
				shadowOffsetY: 0
		  }],
		  position: [['S', 480], ['S', 50]],
		  groupName: ['ShioneLines'],
		  initialRotation: ['S', 0],
		  imgRotation: ['F'],
		  opacity: '0|0~120/1~60|1~120/0',
		  moveType: ['S', '0'],
		  z: 'A',
		  scale: 0.5,
		  onScreen: true,
		  anchor: [0.5, 0],         
		  existData: [
				  { t: ['Time', 300] }		  
		  ],  
	  }); 
	  return; 
};

// 带有CG的地图名演出效果
QJ.MPMZ.tl.showMapNameWithCGEffect = function(imgName) {
        $gameTemp._waitForPerformanceEnd = true;
        let finalImgPath = `map_name/${imgName}CG`;
		let needText = true;
		Zzy.TWF.ToTheWorld(true);
		
		let waitTime  = 1;
		let mapDescription = window.systemFeatureText && window.systemFeatureText[imgName]?.mapDescription;
		if (!mapDescription) needText = false;
		let fontFace     = "Kaisei Decol";
		/*
		if (!chahuiUtil.checkFontLoaded(fontFace) && needText) {
		    Graphics._createFontLoader(fontFace);
		    waitTime = 20;
		}		
		*/
		setTimeout( () => {
			// 播放转场CG
			let moveSpeed = 0;
			if (imgName == "ShallowRuinsLabyrinth") moveSpeed = 0.3;
			const CG = QJ.MPMZ.Shoot({
				groupName: ['mapThemeCG'],
				img: finalImgPath,
				position: [['S', 0], ['S', 0]],
				initialRotation: ['S', 0],
				imgRotation: ['F'],
				scale: 0.5,
				opacity: '0|1~180|1~60/0',
				onScreen: true,
				anchor: [0, 0],
				moveType: ['S', moveSpeed],
				existData: [
					{ t: ['Time', 240], a: ['F', QJ.MPMZ.tl.ex_mapThemeNameDisplay] }
				],
				moveF: [
					[60, 0, QJ.MPMZ.tl.ex_mapThemeNameCheckIfNeedSkipped]
				],
				deadJS:[
				   'Zzy.TWF.ToTheWorld(false);$gameTemp._waitForPerformanceEnd = false;'
				],
				z: 'A'
			});

            // 播放地图名
            if (!needText) return;			
		    const wb = new Window_Base(0, 0, 0, 0);
				chahuiUtil.gainAchievementFullscreenEffect({
					text1: wb.convertEscapeCharacters(mapDescription),
					fileName: `map_name/${imgName}CGtext`,
					fontFace: fontFace, 
					imgY:  480,
					posX1: 960, 
					posY1: 625, 
					fontSize: 28,
					waitTime: 60,
					duration:240
				});
		}, waitTime);
};


// 检测是否需要跳过转场CG演出
QJ.MPMZ.tl.ex_mapThemeNameCheckIfNeedSkipped = function() {

   if ( TouchInput.drill_isLeftPressed() || TouchInput.drill_isLeftTriggered() ) {
	   
	   if ($gameMap.getGroupBulletListQJ('mapThemeName').length > 0) {
		  let bid = $gameMap.getGroupBulletListQJ('mapThemeName')[0];
          let bullet = $gameMap._mapBulletsQJ[bid];
		  bullet.setDead({ t: ["Time", 0], d: [0, 30] });
	   }
	   
	   this.setDead({ t: ["Time", 0], d: [0, 30] , a:['F',QJ.MPMZ.tl.ex_mapThemeNameDisplay] });
   }
	
};

// 右上角显示地图名
QJ.MPMZ.tl.ex_mapThemeNameDisplay = function() {
  let mapId = $gameMap.mapId();
  if (!mapId || !($dataMapInfos[mapId])) return;

  const MAP_NAME_DATA = [
  {
    mapId: 5,
    cn: "忘却的墓穴 下層",
    jp: "忘却のカタコンベ 下層",
    en: "Forgotten Catacombe:Lower Layer"
  },
  {
    mapId: 9,
    cn: "沈眠之所…",
    jp: "眠りの地…",
    en: "Land of Slumber…"
  },  
  {
    mapId: 10,
    cn: "遺跡之森",
    jp: "遺跡の森",
    en: "Forest of Ruins"
  },
  {
    mapId: 13,
    cn: "遺跡之森",
    jp: "遺跡の森",
    en: "Forest of Ruins"
  },
  {
    mapId: 16,
    cn: "遺跡之森",
    jp: "遺跡の森",
    en: "Forest of Ruins"
  },
  {
    mapId: 18,
    cn: "冒險者小道 集結地",
    jp: "冒険の遊歩道 集結地",
    en: "Adventurer's Path: Gathering Point"
  },
  {
    mapId: 26,
    cn: "遺跡之森",
    jp: "遺跡の森",
    en: "Forest of Ruins"
  },  
  {
    mapId: 27,
    cn: "遺跡之森",
    jp: "遺跡の森",
    en: "Forest of Ruins"
  },
  {
    mapId: 28,
    cn: "忘却的墓穴 上層",
    jp: "忘却のカタコンベ 上層",
    en: "Forgotten Catacombe:Upper Layer"
  },
  {
    mapId: 37,
    cn: "浅層遺跡迷宮",
    jp: "浅層遺跡迷宮", 
    en: "Shallow Ruins Labyrinth"
  },
  {
    mapId: 40,
    cn: "開拓中区域",
    jp: "開発中エリア",
    en: "Excavation Site"
  },  
  {
    mapId: 46,
    cn: "開拓中区域",
    jp: "開発中エリア",
    en: "Excavation Site"
  },  
  {
    mapId: 59,
    cn: "開拓中区域",
    jp: "開発中エリア",
    en: "Excavation Site"
  }, 
  {
    mapId: 60,
    cn: "開拓中区域",
    jp: "開発中エリア",
    en: "Excavation Site"
  }, 
  {
    mapId: 61,
    cn: "開拓中区域",
    jp: "開発中エリア",
    en: "Excavation Site"
  },
  {
    mapId: 47,
    cn: "遺跡之森",
    jp: "遺跡の森",
    en: "Forest of Ruins"
  },
  {
    mapId: 48,
    cn: "冒險者小道:記念碑",
    jp: "冒険の遊歩道:記念碑",
    en: "Adventurer's Path:Monument"
  },
  {
    mapId: 49,
    cn: "冒險者小道:林間",
    jp: "冒険の遊歩道:林間",
    en: "Adventurer's Path:Grove"
  },
  {
    mapId: 58,
    cn: "冒險者小道:林間",
    jp: "冒険の遊歩道:林間",
    en: "Adventurer's Path:Grove"
  },
  {
    mapId: 62,
    cn: "冒險者小道:林間",
    jp: "冒険の遊歩道:林間",
    en: "Adventurer's Path:Grove"
  },
  {
    mapId: 50,
    cn: "？？？墓穴",
    jp: "？？？の墓穴",
    en: "??? Tomb"
  }, 
  {  
    mapId: 51,
    cn: "星之門",
    jp: "星の門",
    en: "Star Door"
  },   
  {
    mapId: 52,
    cn: "忘却的墓穴:藏身處",
    jp: "忘却のカタコンベ:隠れ家",
    en: "Forgotten Catacombe:Hideout"
  },
  {
    mapId: 53,
    cn: "堕落的聖堂",
    jp: "堕落の聖堂",
    en: "The Fallen Church"
  }, 
  {
    mapId: 55,
    cn: "大焦熱熔岩帯",
    jp: "大焦熱溶岩帯",
    en: "Scorching Lava Zone"
  },  
  {
    mapId: 56,
    cn: "遺跡之森:隠秘的箱庭",
    jp: "遺跡の森:隠された箱庭",
    en: "Forest of Ruins:The Hidden Garden"
  },  
];
  const entry = MAP_NAME_DATA.find(e => e.mapId === mapId);
  if (!entry)  return 
  // 选择语言
  let text = "";
  switch (ConfigManager.language) {
    case 0: text = entry.cn; break;
    case 1: text = entry.jp; break;
    case 2: text = entry.en; break;
    default:
      text = entry.en;
      break;
  }    
  
  QJ.MPMZ.tl._imoutoUtilSceneNameDisplay(text);
  
};

//=============================================================================
//增益状态
//=============================================================================


QJ.MPMZ.tl.ex_playerRegenerationBullet = function() {
	
QJ.MPMZ.Shoot({
groupName:['playerRegeneration'],
img:"回復γ[6,10,1]",
position:[['P'],['P']],
initialRotation:['S',0],
imgRotation:['F'],
blendMode:1,
scale:[0.75,0.75],
anchor:[0.55,0.6],
moveType:['B',-1],
collisionBox:['C',1],
existData:[ 
{t:['SW',105,false],d:[0,30]},
],
moveF:[[60,60,QJ.MPMZ.tl.ex_playerRegeneration]],
});	

}

QJ.MPMZ.tl.ex_playerRegeneration = function() {	

let heal = Math.round(100 * $gameParty.leader().hrg);
$gameParty.leader().gainHp(heal);

heal = heal.toString();
    QJ.MPMZ.Shoot({
     img:['T',heal,0,'#06ff00',12],
     position:[['P'],['P']],initialRotation:['S',0],
     imgRotation:['F'],opacity:'0|1~90/0',
     moveType:['S','0|1~90/0.1~999/0.1'],
     existData:[	
     {t:['Time',90]},
        ],       
    });
}


// 子弹抛物线轨迹运动参数方程运算
QJ.MPMZ.tl.BulletTrajectoryFormula = function(oriX, oriY, tarX, tarY, peakRate,extra = 10) {
  if (!peakRate) peakRate = 1.0;
  const dx = tarX - oriX;
  const dy = tarY - oriY;
  const distance = Math.sqrt(dx*dx + dy*dy);
  const time = Math.floor(extra + (distance / 15));
  const peak = distance * peakRate;  // 抛物线顶点可调

  const Xexp = `${dx}*(t/${time})`;
  const Yexp = `${dy}*(t/${time}) - ${peak}*(t/${time})*(1 - t/${time})`;

  const xExp = `- ( ${Yexp} )`;
  const yExp = `(${Xexp})`;

  return { time, xExp, yExp };
};

// 模拟导弹坠落抛物线轨迹
QJ.MPMZ.tl.BulletMissileDropFormula = function(
  oriX, oriY, tarX, tarY,
  peakRate = 0.5,   // 弧度强度：0.3~0.6 常用
  skew = 3,         // 后段陡峭度：2~4 常用
  extra = 10,       // 额外时长（帧）
  speedDiv = 15,    // 跟距离成正比的时长系数（数值越大越慢）
  slowScale = 1.0   // 额外的全局减速倍率（>1 更慢，<1 更快）
) {
  const dx = tarX - oriX;
  const dy = tarY - oriY;
  const distance = Math.sqrt(dx*dx + dy*dy);

  // 目标总时长：随距离线性增长 + 额外补正，再乘一个全局减速倍率
  const T = Math.max(1, Math.floor((extra + distance / speedDiv) * slowScale));

  const peak = distance * peakRate;

  // 归一化参数 s，并**夹到 [0,1]**，防止 t > T 后爆速
  const s  = `Math.min(1, (t/${T}))`;
  const u  = `Math.pow(${s}, ${skew})`;  // 偏置时间：后程更陡

  // 原始（未旋转）轨迹：直线插值 + 偏置抛物
  const Xexp = `${dx}*${s}`;
  const Yexp = `${dy}*${s} - ${peak}*(${u})*(1 - ${u})`;

  // 旋转 90°
  const xExp = `-(${Yexp})`;
  const yExp = `(${Xexp})`;

  return { time: T, xExp, yExp };
};

// 模拟自由落体轨迹
QJ.MPMZ.tl.freeFallByTime = function(posY, tarY, T){
  const H = Math.max(0, tarY - posY);
  const time = Math.max(1, Math.floor(T));
  const xExp = '0';
  const yExp = `${H} * Math.pow(t/${time}, 2)`;   // Δy(t) = H*(t/T)^2
  return { time, xExp, yExp };
};


// 丢垃圾演出
QJ.MPMZ.tl.playerThrowsTrash = function(type, itemId) {
	
  if (!itemId) return;
  if (!this) return;

  let icon;
    switch(type) {
    case 0:
        icon = $dataItems[itemId]?.iconIndex || 90;
        break;
    case 1:
        icon = $dataWeapons[itemId]?.iconIndex || 90; 
        break;
    case 2:
        icon = $dataArmors[itemId]?.iconIndex || 90; 
        break;
    default:
        icon = 90;
        break;
    }  
  let posX = $gamePlayer.screenShootXQJ();
  let posY = $gamePlayer.screenShootYQJ() - 24;
  let tarX = this.screenShootXQJ();
  let tarY = this.screenShootYQJ() - 40;  	  
  let peakRate = 1 + (1.5 * Math.random());
  let { time, xExp, yExp } = QJ.MPMZ.tl.BulletTrajectoryFormula(posX, posY, tarX, tarY, peakRate);
  let pitch = 100+Math.randomInt(50);
   QJ.MPMZ.Shoot({
        img:['I',icon], 
		position:[['S',posX],['S',posY]],
        initialRotation:['S',0],
		scale:0.5,
        imgRotation:['S',0],
		moveType:["F", xExp, yExp],
        existData:[ 
		    {t: ['Time', time], d:[1,15,1.2]}  
		],
		deadJS:["AudioManager.playSe({ name: 'ドゥン。衝突・転ぶ・尻餅の音（シンプル）', volume: 50, pitch:"+pitch+", pan: 0 })"]
    });
};

//=============================================================================
//近战动作
//=============================================================================


//跳跃
QJ.MPMZ.tl.ex_jumpWithAngle = function(character, angle, distance, force) {
     let fudou;
     if (character === -1) {
	  if ($gameSwitches.value(100)) return;
	  if ($gameParty.leader().isStateAffected(69)) return;
      character = $gamePlayer;	  
       } else if (character > 0) {
      character = $gameMap.event(character);
	   fudou = $gameSelfVariables.value([$gameMap.mapId(), character._eventId, 'fudou']);

	   if (!force && fudou > 20) return;
     }
   if (!character) return;	 
   var height = Math.round(60 + (distance * 8));
   var time = Math.round(30 + (distance * 2));
   character._drill_JSp['enabled'] = true;
   character._drill_JSp['height'] = height;
   character._drill_JSp['time'] = time;
   character._drill_JSp['speed'] = -1;	 
	 
  var radian = angle * Math.PI / 180; // 将角度转换为弧度
  var xPlus = distance * Math.sin(radian); // 计算 x 方向增量
  var yPlus = -distance * Math.cos(radian); // 计算 y 方向增量（取反）
  character.jump(xPlus, yPlus); // 执行跳跃
}

//崩山击范围检查
QJ.MPMZ.tl.ex_rocketJumpCheck = function() {
	QJ.MPMZ.Shoot({
        img:"Circle",
        position:[['P'],['P']],
        initialRotation:['S',0],
        scale:'0|0.01~900/3~9999|3',
        moveType:['S',0],
		opacity:0.6,
		blendMode:2,
        imgRotation:['F'],
        anchor:[0.5,0.5],
        existData:[
            {t:['S','!TouchInput.drill_isLeftPressed()',true],d:[1,10,0.01]},  
        ],
        z:"E",collisionBox:['C',1],
	deadF:[[QJ.MPMZ.tl.ex_rocketJump]]
    });
}

//火箭跳
QJ.MPMZ.tl.ex_rocketJump = function() {	
    if(this.time < 20) return;
	var range = (this.scaleX * 400) / 48;
	var character = $gamePlayer;
    var r = 255;
    var g = 150;
    var b = 0;
    var color = [r, g, b, 255];
    character.residual().setPeriod(4);
    character.residual().setDuration(60);
    character.residual().setOpacity(128);
    character.residual().setColorTone(color);
    character.residual().setValid(true);
    Fuku_Plugins.EventTremble.stop(-1);
	character.drill_EASA_setEnabled( true );
    // 内部函数: 计算两个点之间的角度
    function calculateAngleByTwoPoint(x, y, ex, ey) {
        let ro;
        if (ex > x && ey < y) ro = (-Math.atan((x - ex) / (y - ey)));
        if (ex > x && ey > y) ro = (Math.PI - Math.atan((x - ex) / (y - ey)));
        if (ex < x && ey > y) ro = (Math.PI - Math.atan((x - ex) / (y - ey)));
        if (ex < x && ey < y) ro = (2 * Math.PI - Math.atan((x - ex) / (y - ey)));
        if (ex == x && ey > y) ro = Math.PI;
        if (ex == x && ey < y) ro = 0;
        if (ex > x && ey == y) ro = Math.PI / 2;
        if (ex < x && ey == y) ro = Math.PI * 3 / 2;
        if (ex == x && ey == y) ro = null; // 说明在同一点
        return ro;
    }
	let mouseX = TouchInput.x / $gameScreen.zoomScale();
	let mouseY = TouchInput.y / $gameScreen.zoomScale();
	let ax = $gamePlayer.centerRealX();
    let ay = $gamePlayer.centerRealY();
    let bx = (mouseX / 48) + $gameMap.displayX();
    let by = (mouseY / 48) + $gameMap.displayY();
    //计算距离
    let xDiff = $gameMap.deltaX(ax, bx);
    let yDiff = $gameMap.deltaY(ay, by);
    var distance = Math.sqrt(xDiff ** 2 + yDiff ** 2);
	distance = Math.min(distance, range);
	let deg = calculateAngleByTwoPoint(ax, ay, bx, by);
    deg = Math.round((deg * 180) / Math.PI);
	
	QJ.MPMZ.Shoot({
        img:"Updraft[5,4,2]",
        position:[['P'],['P']],
        initialRotation:['S',0],
        scale:[0.5,0.5],
        moveType:['S',0],
		opacity:1,
		blendMode:1,
        imgRotation:['F'],
        anchor:[0.5,0.8],
        existData:[
            {t:['Time',38]},
        ],
    });	
	QJ.MPMZ.tl.ex_jumpWithAngle(-1,deg,distance);

    var se = { name: "Jump1", volume: 70, pitch: 100, pan: 0 };
    AudioManager.playSe(se);
	   
    var Duration = $gamePlayer._drill_JSp['time'];
	QJ.MPMZ.Shoot({
        img:"null1",
        position:[['P'],['P']],
        initialRotation:['PD'],
        scale:[1,1],
        moveType:['S',0],
		opacity:0,
        imgRotation:['F'],
        anchor:[0.5,0.5],
        existData:[
            {t:['Time',Duration]},
        ],
        z:"E",collisionBox:['C',1],
	deadF:[[QJ.MPMZ.tl.ex_rocketJumpImpact,[distance]]]
    });
	
};

QJ.MPMZ.tl.ex_rocketJumpImpact = function(distance) {
	$gamePlayer.residual().setValid(false);
	
	//跳进了水里的情况
	var playerX = Math.floor($gamePlayer.centerRealX());
    var playerY = Math.floor($gamePlayer.centerRealY());
	var regionId = $gameMap.regionId( playerX, playerY );
    if ( regionId === 8 ) {

    var se = { name: "Water1", volume: 70, pitch: 100, pan: 0 };
    AudioManager.playSe(se);
     QJ.MPMZ.Shoot({
        img:"60FPS_ASWater_04_Geyser[5,6,1]",
        position:[['P'],['P']],
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
		moveF:[[15,999,QJ.MPMZ.tl.ex_playerSwimmingCheck]]
       });	
       return false;	   
	} else if ( regionId === 254 || regionId === 255 ) {
	//跳进了墙里的情况
       QJ.MPMZ.tl.ex_playerStuckCheck();
	   return false;
	}	
	
	var weaponDamage = chahuiUtil.getVarianceDamage(1);	 
	var power = Math.round(60 + (distance * 50));
	
    var se = { name: "Fire3", volume: 70, pitch: 110, pan: 0 };
    AudioManager.playSe(se);
	
	QJ.MPMZ.Shoot({
        img:"EVFX03_01_MightySmash[5,3,3]",
        position:[['P'],['P']],
        initialRotation:['S',0],
        scale:[1,1],
        moveType:['S',0],
		opacity:1,
        imgRotation:['F'],
        anchor:[0.5,0.6],
		blendMode:1,
        existData:[
            {t:['Time',44]},
            {t:['G',['"enemy"','"object"']],a:['C',155,[weaponDamage,distance,power,0]],p:[-1,false,true],c:['S','this.time>15']},
        ],
        z:"E",
		collisionBox:['C',50],
	   moveF:[
	   [28,999,QJ.MPMZ.tl.ex_rocketJumpTrace]
	   ]
    });
}

QJ.MPMZ.tl.ex_rocketJumpTrace = function() {
	
   var posX = this.inheritX();	
   var posY = this.inheritY();	
   var Mscale = this.scaleX;
	QJ.MPMZ.Shoot({
        img:"EVFX03_01_MightySmash",
        position:[['S',posX],['S',posY]],
        initialRotation:['S',0],
        scale:Mscale,
        moveType:['S',0],
		opacity:1,
		blendMode:1,
        imgRotation:['F'],
        anchor:[0.5,0.6],
        existData:[
            {t:['Time',60],d:[0,90]},
        ],
        z:"E",collisionBox:['C',1],
    });
}


QJ.MPMZ.tl.ex_dashIai = function() {
	
	if($gameParty.leader().equips()[0].baseItemId === 2) return;	  
	  var weaponImage = "weapon/weaponTrail" + $gameParty.leader().equips()[0].baseItemId;
      var weaponScale = $gameParty.leader().pdr * 1.5;
	  var weaponDamage = chahuiUtil.getVarianceDamage(1);		
		
		QJ.MPMZ.Shoot({
        img:weaponImage,
        position:[['P'],['P']],
        initialRotation:['PD',235],
        scale:[weaponScale,weaponScale],//动态缩放
        moveType:['B',-1],
		opacity:0,
        imgRotation:['R',8,true],
        anchor:[0.5,0.5],
        existData:[
            {t:['Time',20]},
            {t:['G',['"enemy"','"object"']],a:['C',155,[weaponDamage,20,0,0]],p:[-1,false,true]},
			{t:['B','enemyBullet'],p:[-1,false,true,QJ.MPMZ.tl.ex_weaponParry]}
        ],
        z:"E",collisionBox:['R',8,64],
        trailEffect:[],
	deadJS:["$gameParty.leader().removeState(63);"]
    });
	
}

/*
QJ.MPMZ.tl.ex_senpuuGiriThrow = function() {
	
	if(!$gameParty.leader().equips()[0]) return;
    if (this.time <= 180) return;
    let posX = this.inheritX();
    let posY = this.inheritY();
    let angle = this.inheritRotation();

    var weaponImage = "weapon/weaponTrail" + $gameParty.leader().equips()[0].baseItemId;
    var weaponScale = this.scaleX;
	var weaponDamage = chahuiUtil.getVarianceDamage(1);
	
	$gameSwitches.setValue(182, true);
    QJ.MPMZ.Shoot({
		groupName:['playerBullet','playerSenpuuGiri','meleeAttack'],
        img:weaponImage,
        position:[['S',posX],['S',posY]],
        initialRotation:['M'],
		imgRotation:['F',180],
        scale:[weaponScale,weaponScale],//动态缩放
        anchor:[0.5,0.5],
        existData:[
            {t:['R',[255]]},	
			 {t:['time',90]},
			{t:['G',['"enemy"','"object"']],a:['C',155,[weaponDamage,0,0,0]],p:[-1,true,true]},		
            {t:['G',['"enemy"','"object"']],a:['S','QJ.MPMZ.tl.ex_spiralThrust.call(this,target)'],p:[-1,true,true],c:['T',0,1,true]},			
        ],
		moveType:['S','0|12~90/0~999/0'],
        z:"E",collisionBox:['R',8,64],
        judgeAccuracyRotation:0,//判定精度，防止挥剑速度太快导致无法攻击到敌人
		judgeAccuracyMove:8,
        trailEffect:[{
            img:['L',0.5,1,0,0.999999999,0.4,0,0,0],
            existTime:0,
			blendMode:1,
			alpha:0.75,
            disappearTime:30,
            imgStretchMode:0,
            hOrV:true
        }],
		//deadJS:["QJ.MPMZ.tl.ex_senpuuGiriHold.call(this);"]
    });
};
*/





//=============================================================================
//物理远程
//=============================================================================




/*QJ.MPMZ.tl.ex_explosiveArrows = function() {

     var seNames = "Fire3";
     var randomPitch = Math.randomInt(40) + 81;
     var se = { name: seNames, volume: 80, pitch: randomPitch, pan: 0 };
     AudioManager.playSe(se);	

    var weaponImage = "flame_01[7,4]";
	var Ratio = Math.min($gameVariables.value(129), 300);
	    Ratio = 1 + (Ratio / 100);
	var weaponDamage = Math.round(chahuiUtil.getVarianceDamage(1) * Ratio);		 

    QJ.MPMZ.Shoot({
        groupName:['playerBullet'],collisionBox:['R',9,48],
        img:weaponImage,
		scale:[Ratio,Ratio],//动态缩放
		anchor:[0.5,0.3],
		moveType:['S','0|12~0/6~999/6'],
        position:[['P'],['P']],initialRotation:['M'],
        imgRotation:['F'],imgRotation:['F'],
        existData:[  
		 {t:['R',[255]],c:['S','this.time > 30']},	
         {t:['G',['"enemy"','"object"']],a:['C',155,[weaponDamage,0,0,0]],an:2,p:[-1,true,true]}
		 ],	
		 //deadJS:["QJ.MPMZ.tl.ex_stickMagicExplode.call(this)"]
    });
}
*/

//=============================================================================
//魔法
//=============================================================================

// 二号机
QJ.MPMZ.tl.unitIICommunicationTerminal = function(initialize, args) {

    if (initialize && initialize == "telescopicSight") {
	   this._coolDown = this._coolDown || 0;
	   if (this._coolDown > 0) {
	       this._coolDown -= 1;
		   return;
	   }			
	   let condition = $gameMessage.isBusy() || $gameSwitches.value(14) || !$gamePlayer._drill_EASA_enabled;
	   if (condition) {
		   this._coolDown = 15;
		   if ($gameMap.getGroupBulletListQJ('telescopicSight').length > 0) this._coolDown += 40;
		   return;
	   }
	   if (TouchInput.drill_isRightPressed()) {
		   
	      if ($gameParty.gold() < 400) {
			  // 钱不够的警告
			  let x    =  $gamePlayer.screenX() * $gameScreen.zoomScale();
              let y    = ($gamePlayer.screenY() * $gameScreen.zoomScale()) - 48;
			  const lang = ConfigManager.language;
              let text = "Not enough money!";
              switch(lang) {
                  case 0:
                      text = "钱不够啦！";
                      break;
                  case 1:
                      text = "お金が足りないよ！"
                      break;
              }
			  text = `\\fs[28]\\c[101]\\dDCOG[11:1:1:1]${text}`;
			  $gameTemp.drill_GFTT_createSimple( [x, y], text, 5, 0, 120 );
			  AudioManager.playSe({ name: "012myuu_YumeSE_SystemBuzzer01", volume: 70, pitch: 100, pan: 0 });	
			  this._coolDown = 10;
			  return;
		  }
		  AudioManager.playSe({ name: "Phone", volume: 20, pitch: 100, pan: 0 });
		  $gameSystem._drill_PAlM_enabled = false;
		  if ($gameParty.leader()._characterName === "$player") {
			  $gamePlayer.drill_ECE_stopEffect();
              $gamePlayer.drill_EASe_stopAct();
              $gamePlayer.drill_EASe_setSimpleStateNode(["技能动作1"]);
          }
		  setTimeout(() => {
		     // 狙击手准备
		      AudioManager.playSe({ name: "012myuu_YumeSE_SystemBuzzer01", volume: 70, pitch: 100, pan: 0 });
    		  QJ.MPMZ.Shoot({
				  groupName:['telescopicSight'],
        		  img:'telescopicSight',
        		  position:[['M'],['M']],
        		  initialRotation:['S',0],
        		  moveType:['D',true],
        		  imgRotation:['F'],
				  z:"A",
        		  existData:[	
				     {t:['S','TouchInput.drill_isRightPressed()',true], d:[1,30,1.5], c:['S','this.time > 70']},
					 {t:['S','!($gameActors.actor(1).equips()[0] && $gameActors.actor(1).equips()[0].baseItemId == 52)',true], d:[1,30,1.5], c:['S','this.time > 70']},
        		  ],
				  moveF:[
				     [30,2,QJ.MPMZ.tl.ex_chahuiUnitSniping]
				  ],
				  timeline:[
				     ['B',0,480,[1.1,240]]
				  ],
				  deadJS:['$gameSystem._drill_PAlM_enabled=true;$gamePlayer.drill_EASA_setEnabled( true )']
    		  });
           this._coolDown = 10;			  
	      }, 1000);
	   } 
       return;		
	}
	
	if (initialize && initialize == "assistedShootingUpdate") {	
	      if (this._coolDown) return;
          let enabled = this._Tracking || false;	
		  let posX   = this.inheritX();
          let posY   = this.inheritY();
	      if (QJ.MPMZ.rangeAtk([['P'],['P']],['G','"enemy"'],[],['C',250]).length > 0) {
			  if (enabled) return;
		      this.changeAttribute("moveType",['TG','"enemy"',3,15]);		
		      this._Tracking = true;
			  return;
	      } else {
		     if (enabled) {
		      this.changeAttribute("moveType",['S',3]);	
		      this._Tracking = false;
			  return;
		     }			 
			 // 离太近就要沿惯性前进
			 let player = QJ.MPMZ.rangeAtk([['S',posX],['S',posY]],['P'],[],['C',40]);
			 if (player.length > 0) {
				 this.changeAttribute("moveType",['S',3]);
                 this._returning = false;				 
			 }
             // 离太远就要回来			 
			 if (QJ.MPMZ.rangeAtk([['S',posX],['S',posY]],['P'],[],['C',240]).length == 0) { 
				 this.changeAttribute("moveType",['TP',5,4]);
                 this._returning = true;				 
			 }
			 
	      }
		 return;
    }
	
	if (initialize && initialize == "assistedShooting") {
		
	   this._coolDown = this._coolDown || 0;
	   if (this._coolDown > 0) {
	       this._coolDown -= 1;
		   return;
	   }			
	   let condition = $gameMessage.isBusy() || $gameSwitches.value(14) || !$gamePlayer._drill_EASA_enabled;
	   if (condition) {
		   this._coolDown = 15;
		   return;
	   }
	   
	   let isMobile = this.data.isMobile;
	   let Triggered = false;
	   if (isMobile) {
		   Triggered = $gameSwitches.value(201);
	   } else {
		   Triggered = TouchInput.drill_isLeftPressed();
	   }
	   if (Triggered) {
		   
	      if ($gameParty.gold() < 1000) {
			  // 钱不够的警告
			  let x    =  $gamePlayer.screenX() * $gameScreen.zoomScale();
              let y    = ($gamePlayer.screenY() * $gameScreen.zoomScale()) - 48;
			  const lang = ConfigManager.language;
              let text = "Not enough money!";
              switch(lang) {
                  case 0:
                      text = "钱不够啦！";
                      break;
                  case 1:
                      text = "お金が足りないよ！"
                      break;
              }
			  text = `\\fs[28]\\c[101]\\dDCOG[11:1:1:1]${text}`;
			  $gameTemp.drill_GFTT_createSimple( [x, y], text, 5, 0, 120 );
			  AudioManager.playSe({ name: "012myuu_YumeSE_SystemBuzzer01", volume: 70, pitch: 100, pan: 0 });	
			  this._coolDown = 10;
			  return;
		  }
		  $gameParty.gainGold(-1000);
		  AudioManager.playSe({ name: "Phone", volume: 20, pitch: 100, pan: 0 });
		  $gameSystem._drill_PAlM_enabled = false;
		  if ($gameParty.leader()._characterName === "$player") {
			  $gamePlayer.drill_ECE_stopEffect();
              $gamePlayer.drill_EASe_stopAct();
              $gamePlayer.drill_EASe_setSimpleStateNode(["技能动作1"]);
          }		
		  setTimeout(() => {
		     // 援助射击准备
		   let posX   = this.inheritX() + (Math.randomInt(400) - 200);
           let posY   = this.inheritY() + (Math.randomInt(300) - 150);		  
           QJ.MPMZ.Shoot({
			    img: "laser3",
		        groupName:['assistedShooting'],
                position:[['S',posX],['S',posY]],
                initialRotation:['S',Math.randomInt(300)],
				opacity:"0|0~40/1~999999|1",
                moveType:['S',3],
                imgRotation:['F'],
				scale: 0.5,
				afterImage:['#bf1531','0|1~18/0',18,'0|5~18/0'],
				collisionBox: ['C', 6],
                existData:[	
		           {t:['Time', 3600]},
				   {t:['G','"enemy"'],a:['F',QJ.MPMZ.tl.unitIICommunicationTerminal, ["assistedShootingEffects"]],p:[-1,false,true], c:['S','!this._coolDown']},
                ],
		        moveF:[
				   [4,30,QJ.MPMZ.tl.unitIICommunicationTerminal, ["assistedShootingUpdate"]]
		        ],
           });
           this._coolDown = 60;
           $gameSystem._drill_PAlM_enabled=true;
		   $gamePlayer.drill_EASA_setEnabled( true );
           $gameParty.leader().equips()[0].durability -= 10;		   
	      }, 1000);		   
	   }
	   return;
	}
    if (initialize && initialize == "assistedShootingEffects") {
       const target = args && args.target;
       if (!(target instanceof Game_Event)) return;
       if (this._coolDown) return;	   
	   this._coolDown = true;
       this.changeAttribute("moveType",['S',0]);
	   this.addTimelineEffect('S',[-1,4,10]);
       AudioManager.playSe({ name: "ライフル銃の銃声（バーン）", volume: 45, pitch: Math.randomInt(40) + 81, pan: 0 });
       let imgName = 'brokenGlass' + Math.randomInt(3);
	   let posX   = this.inheritX();
       let posY   = this.inheritY();
	   let damage    = 25 + Math.randomInt(40);
	   let extraData = {orbitingDamage:true,noHitEffect:true,noDurLoss:true,specifyAddedStatus:true,addedStatusType:11,addedStatusChance:800};	   
       QJ.MPMZ.Shoot({
		   groupName:['chahuiUnitIIBullet'],
           img:imgName,
           position:[['S',posX],['S',posY]],
           initialRotation:['S',Math.randomInt(360)],
           moveType:['S',0],
		   scale: 0.5,
           imgRotation:['F'],
           existData:[	
		     {t:['Time',10],d:[0,60]},
			 {t:['G','"enemy"'],a:['F',QJ.MPMZ.tl.ex_toEnemyAttack, [damage,extraData]], p:[-1,false,true], c:['T',0,30,true]},
		     {t:['P'],a:['F',QJ.MPMZ.tl.ex_playerDamageCheck,[20,1]], c:['T',0,30,true], p:[-1,false,true]},
           ],
		   collisionBox:['C',12],
		   blendMode:2,
       });	

       setTimeout(() => {
          this._coolDown = false;
		  // 瞄准时有可能脱离目标			 
		  //if ( QJ.MPMZ.rangeAtk([['S',posX],['S',posY]],['G','"enemy"'],[],['C',2]).length == 0 ) {
				 this.changeAttribute("moveType",['TG','"enemy"',3,15]);		 
			// }
       }, 500);		   

	   return;
	}
	// 初始化监听器
	let isMobile = Utils.isMobileDevice();
	if (initialize && initialize == "listener") {
       QJ.MPMZ.Shoot({
		   groupName:['chahuiUnit','chahuiUnitII'],
           position:[['P'],['P']],
           initialRotation:['S',0],
           moveType:['D',true],
           imgRotation:['F'],
		   isMobile: isMobile,
           existData:[	
		      {t:['S','!($gameActors.actor(1).equips()[0] && $gameActors.actor(1).equips()[0].baseItemId == 52)',true]},
           ],
		   moveF:[
		      [20,20,QJ.MPMZ.tl.unitIICommunicationTerminal,["assistedShooting"]],
			  [20,1,QJ.MPMZ.tl.unitIICommunicationTerminal,["telescopicSight"]]
		   ],
       });
       return;	   
	}
};

//茶会支援：2号机攻击效果
QJ.MPMZ.tl.ex_chahuiUnitSniping = function() {
	
	this._coolDown = this._coolDown || 0;
	  if (this._coolDown > 0) {
	     this._coolDown -= 1;
		 return;
	}
	
	if (TouchInput.drill_isLeftPressed()) {
	let cost = 500;
	if ($gameParty.gold() >= cost) {
	    $gameParty.gainGold(-cost);
	} else {
     // 钱不够
	 		  let x    =  $gamePlayer.screenX() * $gameScreen.zoomScale();
              let y    = ($gamePlayer.screenY() * $gameScreen.zoomScale()) - 48;
			  const lang = ConfigManager.language;
              let text = "Not enough money!";
              switch(lang) {
                  case 0:
                      text = "钱不够啦！";
                      break;
                  case 1:
                      text = "お金が足りないよ！"
                      break;
              }
			  text = `\\fs[28]\\c[101]\\dDCOG[11:1:1:1]${text}`;
			  $gameTemp.drill_GFTT_createSimple( [x, y], text, 5, 0, 120 );
			  AudioManager.playSe({ name: "012myuu_YumeSE_SystemBuzzer01", volume: 70, pitch: 100, pan: 0 });	 
	  this._coolDown = 20;
	  return;
	}
		
    AudioManager.playSe({ name: "ライフル銃の銃声（バーン）", volume: 45, pitch: Math.randomInt(40) + 81, pan: 0 });
	let damage    = 100 + Math.randomInt(200);
	let extraData = {orbitingDamage:true,noHitEffect:true,noDurLoss:true,specifyAddedStatus:true,addedStatusType:11,addedStatusChance:5000};
    let imgName = 'brokenGlass' + Math.randomInt(3);
    QJ.MPMZ.Shoot({
		groupName:['chahuiUnitIIBullet'],
        img:imgName,
        position:[['M'],['M']],
        initialRotation:['S',Math.randomInt(360)],
        moveType:['S',0],
        imgRotation:['F'],
        existData:[	
		  {t:['S','this.time>10',true],d:[0,60]},
		  {t:['G',['"enemy"','"object"']],a:['F',QJ.MPMZ.tl.ex_toEnemyAttack, [damage,extraData]], p:[-1,false,true], c:['T',0,30,true]},
		  {t:['P'],a:['C',149,[20,0,0]],p:[-1,true,true]}
        ],
		collisionBox:['C',24],
		blendMode:2,
    });

         this.addTimelineEffect('B',[1.5,10]);
		
	}
	$gameParty.leader().equips()[0].durability -= 1;
	this._coolDown = 15;
};



QJ.MPMZ.tl.ex_static = function() {
        QJ.MPMZ.Laser({
			imgPoint:'',img:"MSE/lightning_1[9,1,2]",
			rotation:['G','enemy'],
			judgeWidth:10,
			blendMode:1,
			length:['D',['M'],['M'],['P'],['P']],
            existData:[{t:['Time',17]},{t:['G','"enemy"'],a:['C',152,7],p:[-1,false,true]},],position:[['P'],['P']],
        });
}




//校准法杖Z轴
QJ.MPMZ.tl.ex_checkStickAlignment = function() {

	if (this.rotationImg <= 90 || this.rotationImg >= 270) {
	this.changeAttribute("z","E");
	} else {
	this.changeAttribute("z","W");
	}
	
}

//法术准备中
QJ.MPMZ.tl.ex_stickMagicSpell = function() {
 
 
         QJ.MPMZ.Laser({
                imgPoint:'null1',
                img:"fireBall[60,2]",
                rotation:['M'],
                positionStatic:false,
                rotationStatic:false,
                z:"W",
                position:[['P'],['P']],
                judgeWidth:21,length:['S',42,0,[]],
                existData:[
                {t:['S','!TouchInput.drill_isLeftPressed()',true],a:['S','QJ.MPMZ.tl.ex_stickMagic.call(this)']}, 
				{t:['G',['"enemy"','"object"']],a:['S','QJ.MPMZ.tl.ex_stickMagicFaultyExplode.call(this)']}
                ],
                positionSpread:64,
                moveJS:[10,3,'if(this.time < 600){this.data.length[1][1].d[0]+=0.84;this.data.scaleX.d[0]+=0.0198}'],
				deadJS:['QJ.MPMZ.tl.ex_stickMagic.call(this)']
            })



 /*QJ.MPMZ.Shoot({
        img:'fireBall[60,2]',
        scale:[1,1],
        position:[['P'],['P']],
        initialRotation:['M'],
        moveType:['D',-1,0,0,0,0,0,0,0,0],
        anchor:[0.5,1.8],
		imgRotation:['F'],
		blendMode:1,
        existData:[],
        z:"W",collisionBox:['C',5],
        existData:[
			{t:['S','!TouchInput.drill_isLeftPressed()',true]},   
			{t:['G',['"enemy"','"object"']],a:['S','QJ.MPMZ.tl.ex_stickMagicExplode.call(this)']}
        ],
        moveF:[[0,0,QJ.MPMZ.tl.ex_stickMagicSpellChange]],
		deadJS:["{QJ.MPMZ.tl.ex_stickMagic.call(this)}"]
    });*/
}

//法术准备中的蓄力演出
QJ.MPMZ.tl.ex_stickMagicSpellChange = function() {

    if (this.time >= 600) return;
	if (!this) return;
	var newAnchorX = this.anchorX;
	var newAnchorY = this.anchorY - 0.0015;
	var newScale = this.scaleX + 0.0066;
	this.changeAttribute('anchor',[newAnchorX,newAnchorY]);
	this.changeAttribute('scale',[newScale,newScale]);
}


//成功发射后的法术弹幕
QJ.MPMZ.tl.ex_stickMagic = function() {
    let posX = this.x - $gameMap.displayX() * 48;  //this.inheritX();
    let posY = this.y - $gameMap.displayY() * 48;  //this.inheritY();
    let angle = this.rotation; //this.inheritRotation();
    var magicImage = "fireBall[60,2]";
    var magicScale = 1;//this.data.scaleX.d[0];  //this.scaleX;

    var speed = 9;
	
    QJ.MPMZ.Shoot({
		groupName:['playerBullet'],
        img:magicImage,
        position:[['S',posX],['S',posY]],
        initialRotation:['M'],
		imgRotation:['S',angle],
        scale:[magicScale,magicScale],//动态缩放
        moveType:['S',speed],
		blendMode:1,
        imgRotation:['F'],
        anchor:[0.5,0.5],
        existData:[	
		{t:['R',255],c:['S','this.anchorY <= 0.6']}
        ],
        z:"W",collisionBox:['C',10],
		moveF:[[0,0,QJ.MPMZ.tl.ex_bulletTrajectoryCorrection]],
		deadJS:["QJ.MPMZ.tl.ex_stickMagicExplode.call(this);QJ.MPMZ.tl.ex_conductiveEffectOnWater.call(this)"]
    });
}

QJ.MPMZ.tl.ex_stickMagicFaultyExplode = function() {

    let posX = this.x - $gameMap.displayX() * 48;  //this.inheritX();
    let posY = this.y - $gameMap.displayY() * 48;  //this.inheritY();
    var magicImage = "Fire2[5,2,4]";
    var magicScale = this.data.scaleX.d[0] * 0.5;  //this.scaleX;
	var magicDamage = Math.round(chahuiUtil.getVarianceDamage(2) * magicScale * 2);
	
    QJ.MPMZ.Shoot({
		groupName:['playerBullet'],
        img:magicImage,
        position:[['S',posX],['S',posY]],
        initialRotation:['S',0],
        scale:[magicScale,magicScale],//动态缩放
        moveType:['S',0],
        imgRotation:['F'],
        anchor:[0.5,0.65],
		blendMode:1,
        existData:[	
		{t:['Time',28]},
		{t:['G',['"enemy"','"object"']],a:['C',152,[magicDamage,0,0,0]],p:[-1,true,true]}
        ],
        z:"W",collisionBox:['C',40],
    });
	
     var seNames = "Fire3";
     var randomPitch = Math.randomInt(40) + 81;
     var se = { name: seNames, volume: 80, pitch: randomPitch, pan: 0 };
     AudioManager.playSe(se);	
	
}

QJ.MPMZ.tl.ex_bulletTrajectoryCorrection = function() {

    if (this.anchorY <= 0.4) return;
	var magicScale = this.scaleX;
	var speed = 0.08 - ((magicScale - 1) / 4) * 0.04;
	var newAnchorY = this.anchorY - speed;
	this.changeAttribute('anchor',[0.5,newAnchorY]);
	if (this.anchorY <= 0.5 && !this.oneTimeEffect){
	this.oneTimeEffect = true;
	var magicDamage = Math.round(chahuiUtil.getVarianceDamage(2) * magicScale);	
	var newExistData = {t:['G',['"enemy"','"object"']]};
	this.addExistData(newExistData);
    }	


}

//在鼠标指向处定向释放AOE法术
QJ.MPMZ.tl.ex_designatedAreaMagic = function() {
	
    var magicImage = "EE10+1_ThunderOne3[5,6,3]";
    var magicScale = 1;  //this.scaleX;

    var speed = 0;
	
    QJ.MPMZ.Shoot({
		groupName:['playerBullet'],
        img:magicImage,
        position:[['M'],['M']],
        initialRotation:['S',0],
		imgRotation:['F'],
        scale:[magicScale,magicScale],//动态缩放
        moveType:['S',speed],
		blendMode:1,
        anchor:[0.5,0.7],
        existData:[	
		{t:['Time',88]},
		{c:['S','this.time>21'],t:['R',8],a:['S','QJ.MPMZ.tl.ex_conductiveEffectOnWater.call(this)'],p:[-1,false,true]}
        ],
        z:"W",collisionBox:['C',20],
    });
}




//电系法术在水面的传导
QJ.MPMZ.tl.ex_conductiveEffectOnWater = function() {
    let posX = this.inheritX();
    let posY = this.inheritY();
	let index = this.index;
	let limit = Math.randomInt(4) + 4;
	let laserLength = ['S',480,0,[['B',['LightningReflection']],['R',[0,254,255]]]];
	//闪电音效
	 
	let seNames = "Thunder10";
    let randomPitch = Math.randomInt(60) + 70;
    let se = { name: seNames, volume: 60, pitch: randomPitch, pan: 0 };
     AudioManager.playSe(se);		

    if ($gameParty.leader().isStateAffected(9)) laserLength = ['S',60,0,[['B',['LightningReflection']],['R',[254,255]]]];
	if ($gameParty.leader().isStateAffected(67)) laserLength = ['S',480,0,[['B',['LightningReflection']],['R',[0,254,255]]]];
	
    for (let i=0;i<limit;i++) {
        QJ.MPMZ.Laser({
			imgPoint:'',img:"MSE/lightning_1[9,1,2]",
			rotation:i*60+60*Math.random()-30,
			judgeWidth:10,
			judgeMode:['W',15],
			blendMode:1,
			length:laserLength,
            existData:[
			{ t: ['Time', 18] },
			{t:['G','"enemy"'],a:['F',QJ.MPMZ.tl.ex_toEnemyAttack,[2,{}]],p:[-1,false,true]},
			{t:['P'],a:['F',QJ.MPMZ.tl.ex_playerDamageCheck,[2,2,0,0]],p:[-1,false,true]},
			],
			position:[posX,posY]
        });
    }
};





//旧版闪步太刀
QJ.MPMZ.tl.APC_dashIai = function(damage) {
	
    let weaponImage = "weapon/weaponTrail30";
	let weaponDamage = damage;	
        weaponDamage += Math.randomInt(15);	  

	// 安卓版刀光会报错
	let TrailEffect = [];
    if (!Utils.isMobileDevice()) {
        TrailEffect = [{
            img:['L',0.5,72,0,0.999999999,0.4,0,0,0],
            existTime:0,
			blendMode:1,
			alpha:0.75,
            disappearTime:20,
            imgStretchMode:0,
			ifProjctileWait:true,
            hOrV:true
        }];
    }
	let eid  = this._eventId;
    let posX = `$gameMap.event(${eid})?.screenBoxXShowQJ()||0`;
    let posY = `$gameMap.event(${eid})?.screenBoxYShowQJ()||0`;
	
	let dashIai = QJ.MPMZ.Shoot({
        img:weaponImage,
        position:[['S',posX],['S',posY]],
        initialRotation:['ED',eid,235],
        moveType:['D',true],
		opacity:0,
		scale:3,
        imgRotation:['R',10,true],
        anchor:[0.5,0.5],
        existData:[
            {t:['Time',36]},
            {t:['P'],a:['F',QJ.MPMZ.tl.ex_playerDamageCheck,[weaponDamage,1,0,0]],p:[-1,false,true],c:['S','!QJ.MPMZ.tl.ex_playerBulletPhasing()']}
        ],
        moveJS: [
		    [25,999,`this.changeAttribute("imgRotation",['S',this.rotationImg])`]
		],
		collisionBox:['R',8,64],
        trailEffect:TrailEffect,
	
    });
	
}


//=============================================================================
//异常状态
//=============================================================================


//冰电反应
QJ.MPMZ.tl.ex_iceElectricReaction = function(target) {
    
	if (target) {
    var events = $gameMap.event(target.data.extra);
	  if (!events) {
		  return;
	  }
	events._IsDisabledCounter += 120;
	let times = Math.round(events._IsDisabledCounter / 6.28);
    Fuku_Plugins.EventTremble.start(target.data.extra, 1, 1, times);
	target.changeAttribute('scale',[1,1]);

    let posX = target.inheritX();
    let posY = target.inheritY();
	var limit = Math.randomInt(4) + 8;
	
	//闪电音效
	 var seNames = "Thunder10";
     var randomPitch = Math.randomInt(60) + 70;
     var se = { name: seNames, volume: 60, pitch: randomPitch, pan: 0 };
     AudioManager.playSe(se);		
	
    for (let i=0;i<limit;i++) {
        QJ.MPMZ.Laser({
			imgPoint:'',img:"MSE/lightning_1[9,1,2]",
			rotation:i*60+60*Math.random()-30,
			judgeWidth:10,	
			scaleX:0.2,
			blendMode:1,
			judgeMode:['W',30],
			length:['S',96,0,[['B',['LightningReflection']],['R',[254,255]]]],
            existData:[{t:['BE',target.index]},{t:['G','"enemy"'],a:['C',152,[7,0,0,0]],p:[-1,false,true]},],position:[posX,posY]
        });
    }	
	
	}
}
	


/*
//玩家炎上
QJ.MPMZ.tl.ex_playerBurn = function(damage) {

$gameParty.leader().addState(8);

if (!damage) {
 var damage = 1;
}

if(!$gameMap.getGroupBulletListQJ('playerBurn').length > 0){

QJ.MPMZ.Shoot({
groupName:['playerBurn','burn'],
img:"burn[6,10,1]",
position:[['P'],['P']],
initialRotation:['S',0],
imgRotation:['F'],
blendMode:1,
scale:[0.4,0.4],
anchor:[0.5,0.5],
moveType:['B',-1],
collisionBox:['C',72],
existData:[ 
{t:['S','!$gameParty.leader().isStateAffected(8)',true],d:[0,30],c:['S','this.time>20']},
{t:['P'],a:['C',202,[damage,0,0,0]],p:[-1,false,true],c:['T',0,30,true],d:[0,30]},
 {t:['G',['"enemy"','"object"']],a:['C',202,[damage,0,0,0]],p:[-1,false,true],c:['T',0,30,true],d:[0,30]},
 {t:['B',['freeze']],a:['S','$gameParty.leader().removeState(8)'],d:[0,30],an:181},
 {t:['R',8],a:['S','$gameParty.leader().removeState(8)'],d:[0,30],an:181},
],

});	

   }
}
*/

//=============================================================================
//第三方模板
//=============================================================================





//效果字
QJ.MPMZ.tl.ex_effectFonts = function(type, target) {
    let language = navigator.language || navigator.userLanguage
	let path;
	if (language === "ja") {
      path = "RPG_effectFonts/" + type;			
	} else {
      path = "RPG_effectFonts\\" + type;		
	}
     if (target === -1) {
      target = $gamePlayer;
       } else if (target > 0) {
      target = $gameMap.event(target);
     } 
	if (!target) return;
	
    QJ.MPMZ.Shoot({
        img:path,
        position:[['S',target.screenShootXQJ()],['S',target.screenShootYQJ()]],
		scale:[0.5,0.5],
        initialRotation:['S',0],
        imgRotation:['F'],
		opacity:'0|1~90/0',
        moveType:['S','0|1~90/0.1~999/0.1'],
        blendMode:0,
        existData:[	
		{t:['Time',90]},
        ],       
    });
}

//坠落杀
QJ.MPMZ.tl.ex_fallingDeath = function(XX,YY) {
    let posX = this.inheritX();
    let posY = this.inheritY();
	let action = ['C',134,[4,0,0]];
	let collisionBox = ['R',XX,YY];
	
	QJ.MPMZ.rangeAtk([['S',posX],['S',posY]],['G',['"enemy"','"object"']],action,collisionBox);
	QJ.MPMZ.rangeAtk([['S',posX],['S',posY]],['P'],action,collisionBox);
	
}

QJ.MPMZ.tl.ex_stealPlayerChips = function() {
	
    var actor = $gameParty.leader();  
	var armorId = 50;
    var equips = actor.equips();  
	var found = false;
	
    for (var i = 0; i < equips.length; i++) {
        var item = equips[i];
        if (item && item.etypeId === 2 && item.baseItemId === armorId) {       
		found = true;
        //偷掉薯条的演出
	    var name_str = $dataItems[170].name;
		var color_code = $gameTemp.drill_ITC_getColorCode_Item( 170 );
		if( color_code != "" ){ name_str = "\\cc[" + color_code + "]" + name_str + "\\c[0]"; }
		var context = "\\fs[32]\\i[" + $dataItems[170].iconIndex + "]\\fr";
		    context += name_str;
			$gameSystem._drill_GFTH_styleId = 4;
			$gameTemp.drill_GFTH_pushNewText( context );
		    //减少薯条耐久度
            $dataArmors[item.id].durability -= 1;
			$gameVariables.setValue(290, $gameVariables.value(290) + 1);
            if ($dataArmors[item.id].durability <= 0) {
	         actor.changeEquipById(i+1, null);
             $gameParty.loseItem($dataArmors[item.id], 1);		
			 $gameTemp.reserveCommonEvent(100);
			}
            break;
        }
    }	
     //玩家不再拥有薯条后海鸥退场
     if (!found) {
       this.changeAttribute("moveType",['S',5]);
	   var fadeOut = this.time + 120;
	   var deadJS = 'this.time>' + fadeOut;
	   this.addExistData({t:['S',deadJS,true],d:[0,30]});
	   var se = { name: 'Seagull Cry', volume: 80, pitch: 100, pan: 0 };
       AudioManager.playSe(se);
    }
    
	
};

QJ.MPMZ.tl.ex_additionalDamageBonus = function() {
var stateName = 'enemyBurn' + this.targetId;
if($gameMap.getGroupBulletListQJ(stateName).length > 0){
this.sendValue[0] *= 1.2;
this.sendValue[0] = Math.round(this.sendValue[0]);
  }
}

// 天上之石碎片获取演出
QJ.MPMZ.tl.getPhilosophersFragmentTextDisplay = function () {
	
	let textArray = window.mapCommonEventDialogue && window.mapCommonEventDialogue.PhilosophersFragment;
    if (!textArray) {
		textArray = {
        	"title": [
            	"Philosopher's Fragment"
			],
        	"description50": [
            	"A special shard obtained from the Red Beast",
				"If various shards can be collected",
				"it might help improve ${}'s condition"
			],
        	"description56": [
            	"A special shard obtained from the Maid Bunny",
				"If various shards can be collected",
				"it might help improve ${}'s condition"
			]		
       	};	
	}
	// 标题名显示
	let titleText = textArray.title;
	    titleText = Array.isArray(titleText) ? titleText.join("\n") : (titleText ?? "");
	let titleArgs = { text: titleText, x:1120, y:480, width:550, textAlign:4, fontSize:25, fontFace:"MPLUS2ExtraBold", };
	QJ.MPMZ.tl.customShootText(titleArgs);
	// 描述显示
    let desc      = "description" + $gameMap.mapId();
	let descArray = textArray[desc];
	let font      = DrillUp.g_DFF_fontFace;
	if (ConfigManager.language == 0)  font = "未来圆SC";
	let fontSize  = 14;
	if (ConfigManager.language < 2)  fontSize = 16;
    let lineGap   = fontSize + 6;	
	if (Array.isArray(descArray)) {
		for (let i = 0; i < descArray.length; i++) {
		  if (descArray[i] == null) continue;     
		  let descText = descArray[i];
		  // 检查是否需要替换妹妹名称
          const match  = String(descText).match(/\$\{([^}]*)\}/);
	      if (match)  {
			  let name = String($gameStrings.value(120));
			  descText = String(descText).replace(/\$\{[^}]*\}/g, name);	
	      }		  
		  let height   = 535 + (i * lineGap);
		  let descArgs = { text: descText, x:1120, y:height, width:550, height:lineGap, textAlign:4, fontSize:fontSize, fontFace:font, fontBold:"false"};
		  QJ.MPMZ.tl.customShootText(descArgs);
	    }
	}
};


// 自定义显示文字
QJ.MPMZ.tl.customShootText = function (opts) {
	
  opts = opts || {};
  let z = $gameScreen.zoomScale();
  let autoScale = (opts.autoScale !== false);     // 默认自动适配缩放

  let sx = autoScale ? (opts.x / z) : (opts.x || 0);
  let sy = autoScale ? (opts.y / z) : (opts.y || 0);
  let scale = autoScale ? (1 / z) : (opts.scale != null ? opts.scale : 1);

  let textCfg = {
    text: String(opts.text || ""),
    arrangementMode: 0,
    textColor: opts.textColor || "#ffffff",
    fontSize: (opts.fontSize != null ? opts.fontSize : 16),
    outlineColor: (opts.outlineColor || "#ff1818"),
    outlineWidth: (opts.outlineWidth != null ? opts.outlineWidth : 0),
    fontFace: (opts.fontFace || "Noto Sans JP Black"),
    fontItalic: !!opts.fontItalic,
    fontBold: (opts.fontBold == false),          // 默认加粗
    width: (opts.width != null ? opts.width : -1),
    height: (opts.height != null ? opts.height : -1),
    textAlign: (opts.textAlign != null ? opts.textAlign : 5),
    lineWidth: 0,
    lineColor: "#ffffff",
    lineRate: 1.0,
    backgroundColor: null,
    backgroundOpacity: 1,
    shadowBlur: (opts.shadowBlur != null ? opts.shadowBlur : 0),
    shadowColor: (opts.shadowColor || "#ff0000"),
    shadowOffsetX: (opts.shadowOffsetX || 0),
    shadowOffsetY: (opts.shadowOffsetY || 0),
	BossIndex: (opts.BossIndex|| 1),
  };
  
  let bullet = QJ.MPMZ.Shoot({
    img: ['T', textCfg],
    position: [['S', sx], ['S', sy]],
	groupName: (opts.groupName || ['customText']),
    initialRotation: ['S', 180],
    imgRotation: ['S',0],
    opacity: (opts.opacity != null ? opts.opacity : '0|0~240/1~99999999|1'),
    moveType: opts.moveType || ['S', 0],
    z: (opts.z || "A"),
    //scale: scale,
	scale: (scale || '0|0.75~90/0.5~99999999|0.5'),
    onScreen: true,
    anchor: (opts.anchor || [0.5, 0.5]),
    existData: (opts.existData || []),
	moveF: (opts.moveF || [])
  });
  return bullet.index;
  
};

//有害地形
QJ.MPMZ.tl.ex_hazardousTerrainDamage = function(baseDamage,terrainType,args) {
     let damageType;
	 let effectId;
     let realDamage = baseDamage || 1;
     let randomPitch = Math.randomInt(30) + 91;
     AudioManager.playSe({ name: "Damage5", volume: 70, pitch: randomPitch, pan: 0 });
          switch (terrainType) {
    case "poison": // 毒沼泽
        damageType = 3;       
        effectId = 5;     
        break;
    case "lava": // 熔浆
        damageType = 2;       
        effectId = 8;      
        break;
    case "ice": // 冰地板
        damageType = 3;       
        effectId = 9;    
        break;
      }	
	 
     if (args.target && args.target instanceof Game_Event) {
		 args.target.requestAnimation(141);	
		 let eventId = args.target._eventId;	
		 let currentHp = $gameSelfVariables.value([$gameMap.mapId(), eventId, 'HP']);	
		 SimpleMapDamageQJ.put(damageType,eventId,realDamage,0,-72);
	     //伤害结算
	     $gameSelfVariables.setValue([$gameMap.mapId(), eventId, 'HP'], currentHp - realDamage);
		 currentHp = $gameSelfVariables.value([$gameMap.mapId(), eventId, 'HP']);	
		 if (currentHp <= 0){
			 $gameSelfSwitches.setValue([$gameMap.mapId(), eventId, 'D'], true);
		 }
		 let chance = 0.1 * QJ.MPMZ.tl.ex_getEnemyStateEffectiveness(eventId,effectId);
		 if (chance > Math.random()){

          switch (terrainType) {
    case "poison": // 毒沼泽
        QJ.MPMZ.tl.ex_enemyPoison.call(args.target,10,360);    
        break;
    case "lava": // 熔浆
        QJ.MPMZ.tl.ex_enemyBurn(eventId,6);       
        break;
    case "ice": // 冰地板
        QJ.MPMZ.tl.ex_enemyFreeze(eventId,120);    
        break;
      }				 
			 
		 }
		 return true;
	 }
	
    if (args.target && args.target instanceof Game_Player) {
		$gamePlayer.requestAnimation(141);	
		SimpleMapDamageQJ.put(damageType,-1,realDamage,0,-72);	 
	    $gameParty.leader().gainHp(-realDamage);
	   //重伤判定
 	   if( $gameParty.leader().hpRate() <= 0.2 ) {
		 $gameScreen.startShake(1, 8, 30);	
		 QJ.MPMZ.tl.ex_playerDamageFlash();
 	       }		
		let chance = 0.1 * $gameParty.leader().stateRate(effectId);
		if (chance > Math.random()){
          switch (terrainType) {
    case "poison": // 毒沼泽
        QJ.MPMZ.tl.ex_playerPoison(4,3);   
        break;
    case "lava": // 熔浆
        QJ.MPMZ.tl.ex_enemyBurn(eventId,6);       
        break;
    case "ice": // 冰地板
        QJ.MPMZ.tl.ex_enemyFreeze(eventId,120);    
        break;
      }				
		}			
	}

};


QJ.MPMZ.tl.ex_spaceTimeRiftActivate = function() {

    let posX = 400;
    let posY = 300;
    QJ.MPMZ.Shoot({
        img:'30FPS_AC2Q011_Delete[5,10,4]',
        position:[['S',posX],['S',posY]],
		scale:[0.5,0.5],
        initialRotation:['S',0],
        imgRotation:['F'],
		opacity:1,
        moveType:['S',0],
        blendMode:0,
        existData:[	
		{t:['Time',199]},
        ],       
		moveF:[
		[190,999,QJ.MPMZ.tl.ex_spaceTimeRift]
		]
    });
	
};

QJ.MPMZ.tl.ex_spaceTimeRift = function() {
	
    let posX = this.inheritX();
    let posY = this.inheritY();
    QJ.MPMZ.Shoot({
        img:'30FPS_AC2Q011_Delete',
        position:[['S',posX],['S',posY]],
		scale:[0.5,0.5],
        initialRotation:['S',0],
        imgRotation:['F'],
		opacity:1,
        moveType:['S',0],
        blendMode:0,
        existData:[	
		//{t:['Time',199]},
        ],       
		deadF:[[]]
    });
}




/*
    var _DataManager_loadDataFile = DataManager.loadDataFile;
    DataManager.loadDataFile = function(name, src) {

		var lang = 2;
        var langFolder = "";
        if (lang === 0) {
            langFolder = "cn/";
        } else if (lang === 1) {
            langFolder = "jp/";
        } else if (lang === 2) {
            langFolder = "en/";
        }
        _DataManager_loadDataFile.call(this, name, langFolder + src);
    };
*/

// 大熔岩地带-绳子判定
QJ.MPMZ.tl.ex_ropeCollisionBox = function() {
	
    QJ.MPMZ.Shoot({
        img: "null1",
		groupName: ['rope'],
        position: [['Map', 2], ['Map', 6]],
        initialRotation: ['S', 0],
        imgRotation: ['F'],
        moveType: ['S', 0],
        anchor: [0.65, 0.5],
        collisionBox: ['R', 192, 6],
        existData: [
        ],
		moveF:[
		  [15,10,QJ.MPMZ.tl.ex_checkPlayerIsOnRope,[]]
		]
    });
	
    QJ.MPMZ.Shoot({
        img: "null1",
		groupName: ['rope'],
        position: [['Map', 29], ['Map', 8]],
        initialRotation: ['S', 0],
        imgRotation: ['F'],
        moveType: ['S', 0],
        anchor: [0.5, 0.5],
        collisionBox: ['R', 144, 6],
        existData: [
        ],
    });

    QJ.MPMZ.Shoot({
        img: "null1",
		groupName: ['rope'],
        position: [['Map', 32], ['Map', 9]],
        initialRotation: ['S', 0],
        imgRotation: ['F'],
        moveType: ['S', 0],
        anchor: [0.5, 0.5],
        collisionBox: ['R', 144, 6],
        existData: [
        ],
    });
	
};

// 熔岩带-玩家是否站在绳子上
QJ.MPMZ.tl.ex_checkPlayerIsOnRope = function() {
	
	    if (!this) return;
		
		if ( $gameMap.regionId( Math.floor($gamePlayer.centerRealX()), Math.floor($gamePlayer.centerRealY()) ) !== 250 || $gamePlayer.isJumping() )  return;
	
		let xx = $gamePlayer.screenShootXQJ();
		let yy = $gamePlayer.screenShootYQJ() + 18;
	
	if ( QJ.MPMZ.rangeAtk([['S', xx],['S', yy]],['B','rope'],[],['R',20,4],{anchorX:0.5,anchorY:0.86}).length == 0 ) {
		
		if ($gameStrings.value(20).trim() == "" ) {
			
		$gameMap.steupCEQJ(135,1,{skipFall:true});
		
	   }	   
	}
};

Game_Map.prototype.isAnyEventStartingQJ = function() {
    return this.events().some(function(event) {
        //return event.isStarting() || (event._interpreter&&event._interpreter.isRunning()) || event._commonEventQJ.length > 0;
		return event.isStarting() || event._commonEventQJ.length > 0;
    });
};

Game_Map.prototype.isEventRunningQJ = function() {
    return this._commonEventQJ.length > 0 || this._interpreter.isRunning() || this.isAnyEventStartingQJ();
};


Game_Map.prototype.cleanCommonEventQJ = function(keepMapId = 4) {
  const q = this._commonEventQJ;
  if (!q) return 0;

  let marked = 0;

  // 小工具：对一个条目做判断并打标
  const markIfNeed = (it) => {
    if (!it || typeof it !== 'object') return;
    const id = it._mapId;           // 可能是 undefined
    if (id !== keepMapId) {         // 不等于要保留的 mapId 都打标
      it.overLifeQJ = true;
      marked++;
    }
  };

  if (Array.isArray(q)) {
    for (let i = 0, n = q.length; i < n; i++) markIfNeed(q[i]);
  } else if (q && typeof q === 'object') {
    for (const k of Object.keys(q)) markIfNeed(q[k]);
  }
  return marked; // 返回标记数量，便于调试
};


// 打开存档界面前消灭所有子弹
Game_Interpreter.prototype.command352 = function() {
	
    // 1. 先清空子弹数据
    QJ.MPMZ.ClearAll();

    // 2. 确认清空成功
    const lengthOk = $gameMap._mapBulletsQJLength === 0;
    const objOk    = Object.keys($gameMap._mapBulletsQJ  || {}).length === 0;
    const nameOk   = Object.keys($gameMap._mapBulletsNameQJ|| {}).length === 0;

    if (lengthOk && objOk && nameOk) {
      if (!$gameParty.inBattle()) {
        SceneManager.push(Scene_Save);
      }
	}
    return true;
};


QJ.MPMZ.tl.fixedItemDataErrors = function() {
	
var independentWeaponIds = [];
if (DataManager._independentWeapons && Array.isArray(DataManager._independentWeapons)) {
  DataManager._independentWeapons.forEach(function(weapon) {
    if (weapon && weapon.baseItemId) {  
      independentWeaponIds.push(weapon.baseItemId);
    }
  });
}
$gameNumberArray.setValue(66,independentWeaponIds);

var independentArmorIds = [];
if (DataManager._independentArmors && Array.isArray(DataManager._independentArmors)) {
  DataManager._independentArmors.forEach(function(armor) {
    if (armor && armor.baseItemId) {  
      independentArmorIds.push(armor.baseItemId);
    }
  });
}
$gameNumberArray.setValue(67,independentArmorIds);

QJ.MPMZ.Shoot({
   img:"null1",
   existData: [
     { t: ['Time', 60] }  
   ],
   moveJS:[
     [15,9999,"DataManager.cleanupIndependentDatabaseItems();$gameParty.cleanupIndependentPartyItems()"],
	 [25,9999,"$gameNumberArray.value(66).forEach(function(id) {$gameParty.gainItem($dataWeapons[id], 1)})"],
	 [30,9999,"$gameNumberArray.value(67).forEach(function(id) {$gameParty.gainItem($dataArmors[id], 1)})"]
   ]
});


};

//针对旧存档玩家重置装备
QJ.MPMZ.tl._refreshEquipByBaseIds = function(kind, baseIds, opt) {
  opt = opt || {};
  var ids = Array.from(new Set((baseIds || []).map(function(n){ return Number(n) || 0; }).filter(function(n){ return n > 0; })));
  if (ids.length === 0) return;

  var isWeapon = (kind === 'weapon');
  var isArmor  = (kind === 'armor');

  var idSet    = new Set(ids);
  var members  = opt.allActors ? $gameParty.members() : [$gameParty.leader()].filter(Boolean);

  // 帮助函数：判定与取数据库原型
  function isKind(item){
    return isWeapon ? DataManager.isWeapon(item) : DataManager.isArmor(item);
  }
  function protoOf(baseId){
    return isWeapon ? $dataWeapons[baseId] : $dataArmors[baseId];
  }
  function partyList(){
    return isWeapon ? $gameParty.weapons() : $gameParty.armors();
  }
  function gainBase(baseId, n){
    var data = protoOf(baseId);
    if (data) $gameParty.gainItem(data, n, false);
  }

  //  卸下匹配的已装备
  members.forEach(function(actor){
    var eqs = actor.equips();
    for (var i = 0; i < eqs.length; i++){
      var it = eqs[i];
      if (it && isKind(it)) {
        var baseId = (typeof it.baseItemId === 'number') ? it.baseItemId : it.id; // 非独立：用自身 id
        if (idSet.has(baseId)) actor.changeEquip(i, null);
      }
    }
  });

  //  背包处理（快照避免遍历时增删）
  var snapshot = partyList().slice();

  if (opt.resetAttribute) {
    // —— 不删除，只重置 —— //
    snapshot.forEach(function(it){
      if (!it || !isKind(it)) return;
      var baseId = (typeof it.baseItemId === 'number') ? it.baseItemId : it.id;
      if (!idSet.has(baseId)) return;

      var proto = protoOf(baseId);
      if (!proto) return;

      it.params = proto.params ? proto.params.slice() : it.params;
      it.traits = proto.traits ? JSON.parse(JSON.stringify(proto.traits)) : it.traits;
      it.customOnEquipEval        = proto.customOnEquipEval;
      it.customOnRemoveEquipEval  = proto.customOnRemoveEquipEval;


    });
    return;
  }

  // —— 删除旧装备并重新生成 —— //
  snapshot.forEach(function(it){
    if (!it || !isKind(it)) return;
    var baseId = (typeof it.baseItemId === 'number') ? it.baseItemId : it.id;
    if (!idSet.has(baseId)) return;

    var n = $gameParty.numItems(it);
    if (n > 0) {
      $gameParty.loseItem(it, n, false);
      gainBase(baseId, n);
    }
  });
};

// 检查垃圾桶是否包含不可丢弃物品
QJ.MPMZ.tl.checkTrashCanForUndroppableItems = function() {
	
   let eid = this._eventId;
   let event = $gameMap.event(eid);
   let discardArmors = event._discardArmors || [];
   let itemId = 0;
   // 寻找初号机
   for (let discardArmor of discardArmors) {
   let armor = $dataArmors[discardArmor];
   if (armor && armor.baseItemId && armor.baseItemId == 100) {
       itemId = discardArmor;
       break;
      }
   }
   
   if (itemId > 0)  {
	   // 返还道具
	   QJ.MPMZ.itemGiverCharacter(2,itemId,eid,1);
	   // 移除丢弃记录
	   let index = discardArmors.indexOf(itemId);
	   if (index > -1) discardArmors.splice(index, 1);
	   event._discardArmors = discardArmors;
   }
	
};

//拍立得退出监听
QJ.MPMZ.tl.polaroidModeExitListener = function() {

     QJ.MPMZ.Shoot({
        img:"null1",
        groupName: ['polaroid'],
        existData: [
          { t: ["S", "Input.isPressed('cancel')||TouchInput.isCancelled() || Input.drill_isKeyPressed('esc')", true],a: ["C", 267] }  
        ],
        moveJS: [
         [4, 4, `
         let pictureIds = [22,23,24,25,26,27,28,29,30,31,32,33];
         pictureIds.forEach(id => {
           const pic = $gameScreen.picture(id);
           if (pic && pic.drill_PDr_isDraging()) {
             pic.drill_PLAZ_restore();
             pic.drill_PLAZ_setZIndex(99);
           }
         });
       `]
	   ]
    });
};


// 检查是否为下雨天气
function hasRainParticle() {
  var particle   = $gameScreen && $gameScreen._particle;
  var data       = particle && particle._data;
  if (!data) return false;                               

  var keys = Object.keys(data);
  for (var i = 0; i < keys.length; i++) {
    if (/rain/i.test(keys[i])) return true;
  }
  return false;
}

// 初始化水里的掉落情况/炸鱼
QJ.MPMZ.tl.initializeWaterDropState = function() {
   
   let mapId = $gameMap.mapId();
   let maxFishing = $gameSelfVariables.value([mapId, 1, 'maxFishing']);
   if (maxFishing <= 0) return 0;
	// 1意味着需要初始化计数
   if (maxFishing == 1) {
	  let w = $gameMap.width();
	  let h = $gameMap.height();
	  let total = w * h;
	  let cnt = 0;
  	  for (var y = 0; y < h; y++) {
    	  for (var x = 0; x < w; x++) {
      	  if ($gameMap.regionId(x, y) === 8) cnt++;
    	  }
  	  }
      maxFishing = Math.round(cnt / 15);
	  maxFishing = Math.min(maxFishing, 50);
	  maxFishing = Math.max(maxFishing, 2);
	  $gameSelfVariables.setValue([mapId, 1, 'maxFishing'], maxFishing);
	  $gameSelfVariables.setValue([mapId, 1, 'waterArea'], cnt);
      return maxFishing;	  
	}   
    return maxFishing;
};

// 死亡宣告
QJ.MPMZ.tl.deathAnnouncementTextEffect = function () {
	
  let BulletText = "The name of Death shall be carved into all that lives";
		switch (ConfigManager.language) {
                case 0: 
				BulletText = "死之名将銘刻在一切有形之物上";
                break;
                case 1: 
				BulletText = "命あるすべてに「死」の名が刻まれる";			
                break;	         
		}
		
  const zoom  = $gameScreen.zoomScale();
  const scale = 1 / zoom;

  // —— 屏幕上的目标位置（像素）——
  const baseX = 960;   
  const baseY = 240;
  // 折算成 QJ 坐标系
  const posX = baseX / zoom;
  const posY = baseY / zoom;
  // 黑色遮罩
  QJ.MPMZ.Shoot({	  
      img: "blackk",
      position: [['S', 0], ['S', 0]],
      initialRotation: ['S', 0],
      imgRotation: ['F'],
      opacity: '0|0~60/0.55~120|0.55~30/0~120|0',
      moveType: ['S', '0'],
      z: 'A',
      scale: 10,
      onScreen: true,
      anchor: [0, 0],         
      existData: [{ t: ['Time', 210] }],  
  });  
  QJ.MPMZ.Shoot({	  
      img: ['T', {
		    text: BulletText,
			arrangementMode: 0,
			textColor: "#bdbab7",
			fontSize: 60,
			outlineColor: "#e53789",
			outlineWidth: 0,
			fontFace: "Nagurigaki Crayon",
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
			shadowBlur: 0,
			shadowColor: "#d1075b",
			shadowOffsetX: 0,
			shadowOffsetY: 0
      }],
      position: [['S', posX], ['S', baseY]],
      initialRotation: ['S', 0],
      imgRotation: ['F'],
      opacity: '0|0~60/1~120|1~30/0~120|0',
      moveType: ['S', '0'],
      z: 'A',
      scale: scale,
      onScreen: true,
      anchor: [0.5, 0],         
      existData: [{ t: ['Time', 210] }],
      timeline: ['S', 0, 12, [-1, 1, 6]]	  
  }); 
};

// 深渊大迷宫文字演出
QJ.MPMZ.tl.AbysspreprocessCutscene = function() {
	
  if (!this) return;	
  // 文本源
  const fallback = { 0: [" The Forsaken Eternal Tower "] };
  const textArray = (window.mapCommonEventDialogue && window.mapCommonEventDialogue.Abyss) || fallback;

  // 参数
  let fontFace;
  let fontSize = 28;
  
  switch(ConfigManager.language) {
	case 3:  
	case 11: 
        fontFace = "Natsuzemi Maru Gothic Black";
		break;	  
	default:
		fontFace = "Kaisei Decol";
		break;	  
  }
  
  // 字体未加载时给更长时间
  let waitFrames = 1;
  if (!chahuiUtil.checkFontLoaded(fontFace)) {
    Graphics._createFontLoader(fontFace);
    waitFrames = 30;
  }

  const run = () => {
    const rawText = Array.isArray(textArray[0]) ? textArray[0].join('') : String(textArray[0] ?? '');
	const wb = new Window_Base(0, 0, 0, 0);
    const text1 = wb.convertEscapeCharacters(rawText);

    chahuiUtil.gainAchievementFullscreenEffect({
      text1,
      fileName: "map_name/Abyss",
      fontFace,
      imgY: 480,
      posX1: 960,
      posY1: 595,
      fontSize,
      waitTime: 1000,
      duration: 1000
    });
  };

  const delayMs = waitFrames * (1000 / 60);
  setTimeout(run, delayMs);

  this.wait(waitFrames);
};

// 显示哥哥战败次数
QJ.MPMZ.tl.displayOniichanDefeatCount = function () {
  const zoom  = $gameScreen.zoomScale();
  const scale = 1 / zoom;

  // —— 屏幕上的目标位置（像素）——
  const baseX = 960;   
  const baseY = 440;

  // 两行的垂直间距
  const gapPx = 120; 

  // 折算成 QJ 坐标系
  const posX1 = baseX / zoom;
  const posY1 = baseY / zoom;
  const posX2 = baseX / zoom;
  const posY2 = (baseY + gapPx) / zoom;

  const BulletText1 = ($gameParty.leader()._deadCount = $gameParty.leader()._deadCount || 0);
  let BulletText2 = "Apocalypse";
		switch (ConfigManager.language) {
                case 0: 
				BulletText2 = "無法逃避的終末";
                break;
                case 1: 
				BulletText2 = "不可避の終末";			
                break;	         
		}  

  // 公共的文本样式
  const baseTextStyle = {
    arrangementMode: 0,
    textColor: "#bdbab7",
    fontSize: 96,
    outlineColor: "#e53789",
    outlineWidth: 0,
    fontFace: "Nagurigaki Crayon",
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
    shadowBlur: 0,
    shadowColor: "#d1075b",
    shadowOffsetX: 0,
    shadowOffsetY: 0
  };

  function shootLabel(text, x, y, styleOverride) {
    QJ.MPMZ.Shoot({
      img: ['T', Object.assign({}, baseTextStyle, { text }, styleOverride || {})],
      position: [['S', x], ['S', y]],
      initialRotation: ['S', 0],
      imgRotation: ['F'],
      opacity: '0|0~30|0~60/1~9999999/1',
      moveType: ['S', '0'],
      z: 'A',
      scale: scale,
      onScreen: true,
      anchor: [0.5, 0],         
      existData: [{ t: ['Time', 240], d: [0, 30] }],
      timeline: ['S', 0, 12, [-1, 1, 6]]
    });
  }

  // 第一行（计数）
  shootLabel(String(BulletText1), posX1, posY1);
  // 第二行（文字）
  shootLabel(BulletText2, posX2, posY2, {
    fontSize: 64,              
    textColor: '#bdbab7'
  });
};


/*
 玩家掉帧问题检测（检测玩家配置）: GPUProbe.warnByPolicies({ hasVp9Assets: true })
 获取完整情报： GPUProbe.detectAll().then(console.log)
 */
(function () {
  const Env = {
    isNW: !!(window?.process?.versions?.node && typeof require === 'function')
  };

  // --- WebGL 采样 --- //
  function getGL(powerPreference) {
    const c = document.createElement('canvas');
    const attrs = { powerPreference, antialias: false, preserveDrawingBuffer: false };
    return c.getContext('webgl2', attrs)
        || c.getContext('webgl', attrs)
        || c.getContext('experimental-webgl', attrs);
  }
  function readGLInfo(gl) {
    if (!gl) return null;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const vendor   = ext ? gl.getParameter(ext.UNMASKED_VENDOR_WEBGL)   : gl.getParameter(gl.VENDOR);
    const renderer = ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
    const version  = gl.getParameter(gl.VERSION);
    const webgl2   = !!(window.WebGL2RenderingContext && gl instanceof WebGL2RenderingContext);
    return {
      vendor: String(vendor || ''),
      renderer: String(renderer || ''),
      version: String(version || ''),
      webgl2
    };
  }

  // --- GPU 名称分类（更细化：区分 AMD 集显 vs 独显） --- //
  function classifyGpuName(name, vendorHint='') {
    const s = (name || '').toLowerCase();
    const v = vendorHint.toLowerCase();

    const isSwift  = /swiftshader|software|basic render/.test(s);
    const isNvidia = /nvidia|geforce|rtx|gtx|quadro/.test(s) || v.includes('nvidia');
    const isIntel  = /intel|iris|uhd|xe|hd\s*graphics/.test(s) || v.includes('intel');

    // AMD：区分集显与独显
    const isAmd = /amd|radeon|vega|gfx\d+/i.test(s) || v.includes('advanced micro');
    // 常见 AMD 集显命名：Radeon(TM) Graphics / Vega 6/8/11 / “Radeon Graphics” 不带 RX/XT
    const isAmdIgp = isAmd && (
      /radeon\(tm\)\s*graphics/.test(s) ||
      /\bvega\s?\d+\b/.test(s) ||
      /\bradeon\s+graphics\b/.test(s) ||
      /\brdna\b/.test(s) && /gfx\d+/.test(s) && !/\brx\b/.test(s)
    );
    // 常见 AMD 独显：RX/PRO/W/XT/“Radeon VII”等
    const isAmdDgpu = isAmd && (
      /\brx\s?\d{3,4}\b/.test(s) ||
      /\bradeon\s+(pro|w)\b/.test(s) ||
      /\b(vii|fury|nano)\b/.test(s) ||
      /xt\b/.test(s)
    );

    let tier = 'unknown';
    if (isSwift) tier = 'software';
    else if (isNvidia || isAmdDgpu) tier = 'dedicated';
    else if (isIntel || isAmdIgp) tier = 'integrated';

    return {
      tier, isSwift, isNvidia, isIntel, isAmd,
      isAmdIgp, isAmdDgpu
    };
  }

  function classifyRenderer(info) {
    if (!info) return { tier: 'unknown' };
    return classifyGpuName(info.renderer, info.vendor);
  }

  // --- CPU 供应商（仅作参考，不直接决定提示） --- //
  function detectCpuVendor() {
    if (Env.isNW) {
      try {
        const os = require('os');
        const m = (os.cpus()?.[0]?.model || '').toLowerCase();
        if (m.includes('amd'))   return { vendor: 'amd',   model: os.cpus()[0].model };
        if (m.includes('intel')) return { vendor: 'intel', model: os.cpus()[0].model };
        if (m.includes('apple') || m.includes('m1') || m.includes('m2') || m.includes('m3'))
          return { vendor: 'apple', model: os.cpus()[0].model };
        return { vendor: 'unknown', model: os.cpus()[0].model || '' };
      } catch {}
    }
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('amd')) return { vendor: 'amd', model: '' };
    if (ua.includes('intel')) return { vendor: 'intel', model: '' };
    return { vendor: 'unknown', model: '' };
  }

  // --- 枚举系统中可用显卡（NW.js 可用；其他平台返回空） --- //
  function listSystemGpus() {
    if (!Env.isNW) return [];
    const { execSync } = require('child_process');
    const plat = process.platform;
    try {
      let out = '';
      if (plat === 'win32') {
        try {
          out = execSync('wmic path win32_VideoController get Name', { encoding: 'utf8' });
        } catch {
          out = execSync('powershell -Command "Get-CimInstance Win32_VideoController | Select-Object -ExpandProperty Name"', { encoding: 'utf8' });
        }
      } else if (plat === 'darwin') {
        out = execSync('system_profiler SPDisplaysDataType', { encoding: 'utf8' });
      } else {
        out = execSync('sh -lc "lspci | grep -iE \'VGA|3D|Display\'"', { encoding: 'utf8' });
      }
      // 粗略拆行取名称
      const lines = String(out).split(/\r?\n/).map(s => s.trim()).filter(Boolean);
      const names = [];
      for (const line of lines) {
        // Windows: 直接就是名称行；macOS/Linux: 行内包含厂商与型号
        const m = line.replace(/^Name\s*|\s*AdapterCompatibility.*$/i, '').trim();
        names.push(m);
      }
      // 去重、清洗
      const uniq = [...new Set(names)]
        .filter(s => s && !/microsoft basic render|vga compatible controller/i.test(s));
      return uniq.map(n => ({ name: n, class: classifyGpuName(n) }));
    } catch {
      return [];
    }
  }

  // --- 媒体能力（可选） --- //
  async function probeVp9Power() {
    if (!navigator.mediaCapabilities?.decodingInfo) return { supported: null, powerEfficient: null };
    try {
      const conf = {
        type: 'file',
        video: {
          contentType: 'video/webm; codecs="vp09.00.10.08"',
          width: 1280, height: 720, bitrate: 2_000_000, framerate: 30
        }
      };
      const r = await navigator.mediaCapabilities.decodingInfo(conf);
      return { supported: !!r.supported, powerEfficient: !!r.powerEfficient };
    } catch {
      return { supported: null, powerEfficient: null };
    }
  }

  // --- 总探测 --- //
  async function detectAll() {
    const glHi = getGL('high-performance');
    const glLo = getGL('low-power');
    const hi = readGLInfo(glHi), lo = readGLInfo(glLo) || hi;
    const cur = hi || lo;
    const cls = classifyRenderer(cur);
    const honoredPowerPref = !!(hi && lo && hi.renderer && lo.renderer && hi.renderer !== lo.renderer);
    const hwAccelerated = !!cur && cls.tier !== 'software';
    const cpu = detectCpuVendor();

    const available = listSystemGpus(); // [{name, class:{tier,...}}]
    const hasDedicatedAvailable = available.some(g => g.class.tier === 'dedicated');
    const hasIntegratedAvailable = available.some(g => g.class.tier === 'integrated');

    const currentIsIntegrated = cls.tier === 'integrated';
    const currentIsAmdIgp = !!cls.isAmd && !!cls.isAmdIgp && currentIsIntegrated;

    const likelyWrongGpu =
      // 当前是集显或软件渲染
      (currentIsIntegrated || cls.tier === 'software')
      // 并且系统里存在独显
      && hasDedicatedAvailable
      // 并且 powerPreference 没被尊重（很多用户默认这种情况）
      && !honoredPowerPref;

    const vp9 = await probeVp9Power();

    return {
      curInfo: cur,           // 当前 WebGL 渲染器信息
      curClass: cls,          // 当前渲染器分类
      honoredPowerPref,       // 浏览器是否会在 hi/low 之间切换
      hwAccelerated,          // 是否硬件加速
      cpu,                    // CPU 信息（仅参考）
      vp9,                    // VP9 能力
      availableGpus: available,
      hasDedicatedAvailable,
      hasIntegratedAvailable,
      currentlyUsingIntegrated: currentIsIntegrated,
      currentlyUsingAmdIntegrated: currentIsAmdIgp,
      likelyWrongGpu
    };
  }

  // --- 统一提示 --- //
  function joinLines(arrOrStr) {
    if (Array.isArray(arrOrStr)) return arrOrStr.join('\n');
    return String(arrOrStr || '');
  }

  async function warnByPolicies(opts = {}) {
    const { hasVp9Assets = true } = opts; // 你的工程是否有 VP9(WebM) 视频
    const r = await detectAll();

    // A) 系统装了独显但当前跑在集显/软件渲染（最大可能的掉帧根因）
    if (r.likelyWrongGpu) {
      let text = window.systemFeatureText?.nonHardwareAccelerated;
      if (!text) {
        text = [
          "The game is currently running on integrated or software rendering.",
          "A dedicated GPU is detected in your system, but it's not being used.",
          "Please force 'Game.exe' to use the high-performance GPU in your graphics control panel."
        ];
      }
      alert(joinLines(text));
    }

    // B) 仅当“当前为 AMD 集显路径”且存在 VP9 风险时提示
    const vp9Risk = hasVp9Assets || (r.vp9.supported === true && r.vp9.powerEfficient === false);
    if (r.currentlyUsingAmdIntegrated && vp9Risk) {
      let text = window.systemFeatureText?.amdIgpVp9;
      if (!text) {
        text = [
          "Detected AMD integrated graphics in use.",
          "VP9 (WebM) playback on some AMD iGPUs may drop frames in Chromium environments.",
          "If you encounter stutter, please force 'Game.exe' to use your dedicated GPU or update drivers."
        ];
      }
      alert(joinLines(text));
    }

    // C) 兜底：完全软渲染（SwiftShader）也提示
    if (!r.hwAccelerated || r.curClass.tier === 'software') {
      let text = window.systemFeatureText?.softwareRendering;
      if (!text) {
        text = [
          "Hardware acceleration is not active (software rendering detected).",
          "Please enable GPU acceleration or force the game to use a dedicated GPU."
        ];
      }
      alert(joinLines(text));
    }

    return r;
  }

  // 导出
  window.GPUProbe = Object.assign(window.GPUProbe || {}, { detectAll, warnByPolicies });
})();

// 事件继承行走图样式
(function() {
    var _Game_Event_setupPage = Game_Event.prototype.setupPage;
    Game_Event.prototype.setupPage = function() {
        if (this._pageIndex > 0 && this.hasInheritImageComment()) {
            // 保存当前的图像设置
            var lastImage = this._characterName;
            var lastIndex = this._characterIndex;
            _Game_Event_setupPage.call(this);
            // 恢复图像设置
            this.setImage(lastImage, lastIndex);
        } else {
            _Game_Event_setupPage.call(this);
        }
    };

    Game_Event.prototype.hasInheritImageComment = function() {
        var list = this.list();
        if (list) {
            for (var i = 0; i < list.length; i++) {
                var command = list[i];
                if (command && command.code === 108 || command.code === 408) {
                    if (command.parameters[0].contains('Inherit Image')) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
})();