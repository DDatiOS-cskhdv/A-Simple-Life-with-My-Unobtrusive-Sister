//=============================================================================
// RPG Maker MZ - QJ-MapProjectileMZ.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc [Projectile on Map][V3.7.9]
 * @author Qiu Jiu
 * @base QJ-CoreMZ
 * @orderAfter QJ-Lighting
 *
 * @help QJ-MapProjectileMZ.js
 * ======================================================
 * ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫ
 * ======================================================
 * Ⅰ.url:
 *   wiki:     https://qiujiu-9.github.io
 *   wiki in china: https://mapprojectile.qiujiu.xyz/ 
 *   itch.io:  https://qiujiu.itch.io/
 *   Project1: https://rpg.blue/home.php?mod=space&uid=2709153
 *   WeiXin:   qiujiuqihongyi
 *
 *   QQ:       975866141
 * ======================================================
 * Ⅱ.base help
 *    you can see help here:   https://qiujiu-9.github.io
 *    in china:    https://mapprojectile.qiujiu.xyz/
 * ======================================================
 * Ⅲ.terms of use
 *    This plugin is free for non-commercial or commercial use.
 *    You are not allowed to modify and publish this plugin again.
 * ======================================================
 *
 * @param ======player======
 * @text player setting
 *
 * @param playerInitBox
 * @type text
 * @text player initial collision
 * @desc suggest ['R',36,36] or ['C',18]
 * @default ['C',18]
 * @parent ======player======
 *
 * @param playerInitBoxOffsetX
 * @type text
 * @text offset x of collision
 * @desc offset x of collision
 * @default 0
 * @parent ======player======
 *
 * @param playerInitBoxOffsetY
 * @type text
 * @text offset y of collision
 * @desc offset y of collision
 * @default 0
 * @parent ======player======
 *
 * @param ======event======
 * @text event setting
 *
 * @param eventInitBox
 * @type text
 * @text event initial collision
 * @desc suggest ['R',36,36] or ['C',18]
 * @default ['C',18]
 * @parent ======event======
 *
 * @param eventInitBoxOffsetX
 * @type text
 * @text offset x of collision
 * @desc offset x of collision
 * @default 0
 * @parent ======event======
 *
 * @param eventInitBoxOffsetY
 * @type text
 * @text offset y of collision
 * @desc offset y of collision
 * @default 0
 * @parent ======event======
 *
 * @param ======chaos======
 * @text chaos
 *
 * @param forBidDestination
 * @type boolean
 * @text forbid destination
 * @desc forbid destination.After forbidding destination, it is no longer possible to directly interact with the event, but it can be restored with commands.
 * @default true
 * @parent ======chaos======
 *
 * @param offsetGY
 * @type boolean
 * @text if float 6 pixel for character image
 * @desc if float 6 pixel for character image
 * @default false
 * @parent ======chaos======
 *
 * @param canShowBox
 * @type boolean
 * @text if show collision
 * @desc if show collision
 * @default false
 * @parent ======chaos======
 *
 * @param showBox
 * @type boolean
 * @text if show collision by default
 * @desc if show collision by default
 * @default false
 * @parent ======chaos======
 *
 * @param editKey
 * @type select
 * @text key to show collision
 * @desc key to show collision
 * @default F7
 * @option F1
 * @option F6
 * @option F7
 * @option F8
 * @option F9
 * @option F10
 * @parent ======chaos======
 *
 * @param ======setting======
 * @text extra setting
 *
 * @param preloadImg
 * @type text[]
 * @text list of preload image
 * @desc list of preload image
 * @default []
 * @parent ======setting======
 *
 * @param textDefault
 * @type struct<textDefaultData>
 * @text default attributes of font
 * @desc default attributes of font
 * @default {"textColor":"null","fontSize":"null","outlineColor":"null","outlineWidth":"null","fontFace":"null","fontItalic":"null","fontBold":"null"}
 * @parent ======setting======
 *
 * @param fontFaceList
 * @type struct<fontFaceData>[]
 * @text extra fontFamily
 * @text extra fontFamily
 * @default []
 * @parent ======setting======
 *
*/
/*~struct~textDefaultData:
 *
 * @param textColor
 * @type text
 * @text text color
 * @desc default text color. null means system default. such as #00ff00.
 * @default null
 *
 * @param fontSize
 * @type text
 * @text font size
 * @desc default text color. null means system default.
 * @default null
 *
 * @param outlineColor
 * @type text
 * @text outline color
 * @desc default outline color. null means system default. such as #00ff00.
 * @default null
 *
 * @param outlineWidth
 * @type text
 * @text outline width
 * @desc default outline width. null means system default. such as #00ff00.
 * @default null
 *
 * @param fontFace
 * @type text
 * @text fontFace
 * @desc default fontFace of text projectiles. null means system default.
 * @default null
 *
 * @param fontItalic
 * @type text
 * @text italic font
 * @desc does text projectiles default to be italic. null means system default.
 * @default null
 *
 * @param fontBold
 * @type text
 * @text bold font
 * @desc does text projectiles default to be bold. null means system default.
 * @default null
 *
 * @param shadowBlur
 * @type text
 * @text shadowBlur
 * @desc shadowBlur by default. null means system default.
 * @default 0
 *
 * @param shadowColor
 * @type text
 * @text shadowColor
 * @desc shadowColor by default. null means system default.
 * @default #000000
 *
 * @param shadowOffsetX
 * @type text
 * @text offset x of shadow
 * @desc offset x of shadow by default. null means system default.
 * @default 0
 *
 * @param shadowOffsetY
 * @type text
 * @text offset y of shadow
 * @desc offset y of shadow by default. null means system default.
 * @default 0
 *
 */
/*~struct~fontFaceData:
 *
 * @param fontFace
 * @type text
 * @text fontFace
 * @desc fontFace
 * @default 
 *
 * @param fontFile
 * @type text
 * @text font file
 * @desc fonts/*.tff
 * @default 
 *
 */

/*:zh
 * @target MV MZ
 * @plugindesc [在地图上显示弹幕][V3.7.9]
 * @author Qiu Jiu
 * @base QJ-CoreMZ
 * @orderAfter QJ-Lighting
 *
 * @help QJ-MapProjectileMZ.js
 * ======================================================
 * ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫ
 * ======================================================
 * Ⅰ.链接:
 *   wiki:     https://qiujiu-9.github.io
 *   wiki in china: https://mapprojectile.qiujiu.xyz/ 
 *   itch.io:  https://qiujiu.itch.io/
 *   Project1: https://rpg.blue/home.php?mod=space&uid=2709153
 *   WeiXin:   qiujiuqihongyi
 *
 *   QQ:       975866141
 * ======================================================
 * Ⅱ.基础说明
 *    详细的使用方式可在   https://qiujiu-9.github.io    中查看
 *    在中国大陆的话可以使用    https://mapprojectile.qiujiu.xyz/
 * ======================================================
 * Ⅲ.使用条例
 *    您可以免费将此插件用于商业和非商业用途，但不可二次修改，发布。
 * ======================================================
 *
 * @param ======player======
 * @default 玩家初始设置
 *
 * @param playerInitBox
 * @type text
 * @text 玩家预设刚体
 * @desc 建议写['R',36,36]或者['C',18]
 * @default ['C',18]
 * @parent ======player======
 *
 * @param playerInitBoxOffsetX
 * @type text
 * @text 玩家预设刚体X偏移
 * @desc 玩家预设刚体X偏移
 * @default 0
 * @parent ======player======
 *
 * @param playerInitBoxOffsetY
 * @type text
 * @text 玩家预设刚体Y偏移
 * @desc 玩家预设刚体Y偏移
 * @default 0
 * @parent ======player======
 *
 * @param ======event======
 * @default 事件默认设置
 *
 * @param eventInitBox
 * @type text
 * @text 事件默认刚体
 * @desc 建议写['R',36,36]或者['C',18]
 * @default ['C',18]
 * @parent ======event======
 *
 * @param eventInitBoxOffsetX
 * @type text
 * @text 事件预设刚体X偏移
 * @desc 事件预设刚体X偏移
 * @default 0
 * @parent ======event======
 *
 * @param eventInitBoxOffsetY
 * @type text
 * @text 事件预设刚体Y偏移
 * @desc 事件预设刚体Y偏移
 * @default 0
 * @parent ======event======
 *
 * @param ======chaos======
 * @default 杂项
 *
 * @param forBidDestination
 * @type boolean
 * @text 取消掉点击移动
 * @desc 初始时是否取消掉点击移动，注意，取消掉后也无法再直接与事件进行互动，但可以用指令恢复。
 * @default true
 * @parent ======chaos======
 *
 * @param offsetGY
 * @type boolean
 * @text 行走图自动上浮
 * @desc 是否让碰撞体随着角色行走图向上浮动6个像素。
 * @default false
 * @parent ======chaos======
 *
 * @param canShowBox
 * @type boolean
 * @text 是否可以显示碰撞体
 * @desc 是否可以显示碰撞体。在游戏正式发布时可以关闭此选项。
 * @default false
 * @parent ======chaos======
 *
 * @param showBox
 * @type boolean
 * @text 是否默认显示碰撞体
 * @desc 是否默认显示碰撞体
 * @default false
 * @parent ======chaos======
 *
 * @param editKey
 * @type select
 * @text 碰撞体显示按键
 * @desc 碰撞体显示按键
 * @default F7
 * @option F1
 * @option F6
 * @option F7
 * @option F8
 * @option F9
 * @option F10
 * @parent ======chaos======
 *
 * @param ======setting======
 * @default
 *
 * @param preloadImg
 * @type text[]
 * @text 需要预载的图片列表
 * @desc 需要预载的图片列表
 * @default []
 * @parent ======setting======
 *
 * @param textDefault
 * @type struct<textDefaultData>
 * @text 文字默认属性值
 * @desc 文字默认属性值
 * @default {"textColor":"null","fontSize":"null","outlineColor":"null","outlineWidth":"null","fontFace":"null","fontItalic":"null","fontBold":"null"}
 * @parent ======setting======
 *
 * @param fontFaceList
 * @type struct<fontFaceData>[]
 * @text 文字字体扩展
 * @desc 文字字体扩展
 * @default []
 * @parent ======setting======
 *
*/
/*~struct~textDefaultData:zh
 *
 * @param textColor
 * @type text
 * @text 文本颜色
 * @desc 默认文字颜色，写null时使用系统默认值。注意此处不加引号。例如直接写#00ff00即可。
 * @default null
 *
 * @param fontSize
 * @type text
 * @text 文本大小
 * @desc 默认文本大小，写null时代表使用系统默认值。写数字。
 * @default null
 *
 * @param outlineColor
 * @type text
 * @text 描边颜色
 * @desc 默认描边颜色，写null时使用系统默认值。注意此处不加引号。例如直接写#00ff00即可。
 * @default null
 *
 * @param outlineWidth
 * @type text
 * @text 描边宽度
 * @desc 默认描边宽度，写null时使用系统默认值。写数字。
 * @default null
 *
 * @param fontFace
 * @type text
 * @text 字体
 * @desc 默认字体，写null时使用系统默认值。
 * @default null
 *
 * @param fontItalic
 * @type text
 * @text 斜体
 * @desc 默认是否使用启用斜体，写null时使用系统默认值。写true时启用，写false时不启用。
 * @default null
 *
 * @param fontBold
 * @type text
 * @text 加粗
 * @desc 默认字体是否加粗，写null时使用系统默认值。写true时启用，写false时不启用。
 * @default null
 *
 * @param shadowBlur
 * @type text
 * @text 文字阴影显示的程度
 * @desc 默认字体显示阴影的程度。
 * @default 0
 *
 * @param shadowColor
 * @type text
 * @text 文字阴影颜色
 * @desc 默认文字阴影的颜色。
 * @default #000000
 *
 * @param shadowOffsetX
 * @type text
 * @text 文字阴影x偏移
 * @desc 默认文字阴影x偏移。
 * @default 0
 *
 * @param shadowOffsetY
 * @type text
 * @text 文字阴影y偏移
 * @desc 默认文字阴影y偏移。
 * @default 0
 *
 */
/*~struct~fontFaceData:zh
 *
 * @param fontFace
 * @type text
 * @text 字体名
 * @desc 字体名，在弹幕图片是文字时，若想用该字体，则fontFace填写该值。
 * @default 
 *
 * @param fontFile
 * @type text
 * @text 字体文件名
 * @desc fonts/下的字体文件名，带后缀。若没有此文件夹则可以自行创建，文件夹与img文件夹同层。
 * @default 
 *
 */
//=============================================================================
//Traditional Habit.
//=============================================================================
var QJ = QJ || {};
QJ.MPMZ = QJ.MPMZ || {
    reWrite:{},
    tl:{},//玩家函数模板
    template:{}//定制函数模板
};
var Imported = Imported || {};
Imported.QJMapProjectile = true;
//================================================
//单纯为了测试测试功能的报错。
QJ.MPMZ.showError = false;
//================================================
QJ.MPMZ.sprite = null;
//The handling code for circular references in MZ has been removed.
//So the data needed to save can`t be transmitted to other data needed to save.
//
//When I want to save a bundle of codes to execute them after a while, 
//I can`t directly save codes as a function (Anonymous functions or not) because 
//they can`t be encoded and decoded.
//I can stringfy them or ......
//save them in a list and save a index, then I can use index to call them in list......
QJ.MPMZ.saveFunction = [

];
QJ.MPMZ.addSaveFunction = function(fun) {
    QJ.MPMZ.saveFunction.push(fun);
    return ['saveFunction',QJ.MPMZ.saveFunction.length-1];
}
QJ.MPMZ.getSaveFunction = function(data) {
    if (typeof data == 'object'&&data[0]=='saveFunction') {
        return QJ.MPMZ.saveFunction[data[1]];
    } else {
        return null;
    }
}
QJ.MPMZ.isMV = QJ.MPMZ.isMV = Utils.RPGMAKER_NAME === 'MV';
//QJ.MPMZ.isMobile = QJ.MPMZ.isMobile = Utils.isMobileDevice();
//=============================================================================
//
//=============================================================================
function Game_QJBulletMZ() {
    this.initialize.apply(this, arguments);
}
function Sprite_QJBulletMZ() {
    this.initialize.apply(this, arguments);
};
function Game_QJLaserMZ() {
    this.initialize.apply(this, arguments);
}
function Sprite_QJLaserMZ() {
    this.initialize.apply(this, arguments);
};
function Sprite_ProjectileContainerQJMZ() {
    this.initialize.apply(this, arguments);
};
function Sprite_ParticleContainerQJMZ() {
    this.initialize.apply(this, arguments);
};
function Sprite_QJParticleMZ() {
    this.initialize.apply(this, arguments);
};
function Sprite_Animation_MPMZ() {
    this.initialize.apply(this, arguments);
}
function Window_ForImgText_MPMZ() {
    this.initialize.apply(this, arguments);
}
//=============================================================================
//
//=============================================================================
//isCore 核心帧节点，每帧只执行一次。
function Game_QJRemData(isCore,x,y,r,ir,sx,sy,ax,ay) {
    this.ic = isCore;
    this.x = x;
    this.y = y;
    this.r = r;
    this.ir = ir;
    this.sx = sx;
    this.sy = sy;
    this.ax = ax;
    this.ay = ay;
}
Game_QJRemData.prototype.clone = function() {
    return new Game_QJRemData(this.ic,this.x,this.y,this.r,this.ir,this.sx,this.sy,this.ax,this.ay);
};
Game_QJRemData.prototype.isEqual = function(data) {
    return data.ir===this.ir 
        && data.x===this.x && data.y===this.y && data.r===this.r && data.ir===this.ir
        && data.sx===this.sx && data.sy===this.sy && data.ax===this.ax && data.ay===this.ay
};
//=============================================================================
//
//=============================================================================
function Game_EvalToFunctionMPMZ(text,argsArr) {
    this.text = text;
    this.argsArr = argsArr;
    this.fun = null;//这个值在存档时不会被存入存档，在读档后被重新创建。
}
Game_EvalToFunctionMPMZ.prototype.getFun = function() {
    if (!this.fun) this.fun = new Function(...this.argsArr, this.text);
    return this.fun;
};
//=============================================================================
//
//=============================================================================
if (QJ.MPMZ.isMV) {
function Sprite_MPMZ_Rope() {
    this.initialize(...arguments);
}
function Sprite_MPMZ_Rope_Renderer() {
    this.initialize(...arguments);
}
} else {
function Sprite_MPMZ_Rope() {
    this.initialize(...arguments);
}
function Geometry_MPMZ_Rope() {
    this.initialize(...arguments);
}
}
//=============================================================================
//
//=============================================================================
(($) => {
//=============================================================================
//
//=============================================================================
const pluginName = "QJ-MapProjectileMZ";
const parameters = PluginManager.parameters(pluginName);
const offsetGY = eval(parameters.offsetGY);
const editKey = String(parameters.editKey);
const preloadImgList = parameters.preloadImg?eval(parameters.preloadImg):[];
//=============================================================================
//
//=============================================================================
let tileSize = QJ.tileSize || 48;
let textDefault = QJ.MPMZ.textDefault = JsonEx.parse(parameters.textDefault||"{}");
textDefault = QJ.MPMZ.textDefault = {
    textColor:textDefault.textColor==="null"?null:textDefault.textColor,
    fontSize:textDefault.fontSize==="null"?null:Number(textDefault.fontSize),
    outlineColor:textDefault.outlineColor==="null"?null:textDefault.outlineColor,
    outlineWidth:textDefault.outlineWidth==="null"?null:Number(textDefault.outlineWidth),
    fontFace:textDefault.fontFace==="null"?null:textDefault.fontFace,
    fontItalic:textDefault.fontItalic==="null"?null:(textDefault.fontItalic==="true"?true:false),
    fontBold:textDefault.fontBold==="null"?null:(textDefault.fontBold==="true"?true:false),
    shadowBlur:textDefault.shadowBlur==="0"?0:Number(textDefault.shadowBlur || 0),
    shadowColor:textDefault.shadowColor||"#000000",
    shadowOffsetX:textDefault.shadowOffsetX==="0"?0:Number(textDefault.shadowOffsetX || 0),
    shadowOffsetY:textDefault.shadowOffsetY==="0"?0:Number(textDefault.shadowOffsetY || 0)
};
let isMV = QJ.MPMZ.isMV;
let isMobile = Utils.isMobileDevice();
//=============================================================================
//
//=============================================================================
let fontFaceList = QJ.MPMZ.fontFaceList = JsonEx.parse(parameters.fontFaceList||"[]");
//=============================================================================
//MV适配
//=============================================================================
let mouseX = 0;
let mouseY = 0;
if (isMV) {
    let orginList = { 112: 'F1',117: 'F6',118: 'F7',119: 'F8',120: 'F9',121: 'F10'};
    for (let i in orginList) {
        if (orginList[i] === editKey) {
            Input.keyMapper[i] = orginList[i];
            break;
        }
    }
    $.TouchInput__onTouchMove = TouchInput._onTouchMove;
    TouchInput._onTouchMove = function(event) {
        $.TouchInput__onTouchMove.call(this,event);
        mouseX = Graphics.pageToCanvasX(event.pageX);
        mouseY = Graphics.pageToCanvasY(event.pageY);
    };
    $.TouchInput__onMouseMove = TouchInput._onMouseMove;
    TouchInput._onMouseMove = function(event) {
        $.TouchInput__onMouseMove.call(this,event);
        mouseX = Graphics.pageToCanvasX(event.pageX);
        mouseY = Graphics.pageToCanvasY(event.pageY);
    };
    if (!Spriteset_Map.prototype.findTargetSprite) {
        Spriteset_Map.prototype.findTargetSprite = function(target) {
            return this._characterSprites.find(sprite => sprite.checkCharacter(target));
        };
        Sprite_Character.prototype.checkCharacter = function(character) {
            return this._character === character;
        };
    }
}
//=============================================================================
//
//=============================================================================
if (isMV) {
$.DataManager_loadDatabase = DataManager.loadDatabase;
DataManager.loadDatabase = function() {
    $.DataManager_loadDatabase.apply(this,arguments);
    if (!this._fontFaceExMPMZ) {
        let list = this._fontFaceExMPMZ = [];
        for (let detail of fontFaceList) {
            detail = JsonEx.parse(detail);
            let fontData = new FontFace(detail.fontFace,"url(fonts/"+detail.fontFile+")");
            fontData.load();
            list.push(fontData);
            document.fonts.add(fontData);
        }
    }
};
$.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!$.DataManager_isDatabaseLoaded.apply(this,arguments)) return false;
    if (this._fontFaceExMPMZ) {
        for (let font of this._fontFaceExMPMZ) {
            if (font.status==="unloaded") {
                return false;
            }
        }
        //加载完成，销毁记录。
        this._fontFaceExMPMZ = null;
    }
    return true;
};
} else {
$.Scene_Boot_loadGameFonts = Scene_Boot.prototype.loadGameFonts;
Scene_Boot.prototype.loadGameFonts = function() {
    $.Scene_Boot_loadGameFonts.apply(this,arguments);
    this.loadFontFaceMPMZ();
};
Scene_Boot.prototype.loadFontFaceMPMZ = function() {
    for (let detail of fontFaceList) {
        detail = JsonEx.parse(detail);
        FontManager.load(detail.fontFace, detail.fontFile);
    }
};
}
//=============================================================================
//
//=============================================================================
QJ.MPMZ.text1 = [
'The projectile attribute`s value error.'
];
QJ.MPMZ.text2 = [
'子弹的属性值错误.'
];
QJ.MPMZ.text = QJ.MPMZ.text2;
QJ.MPMZ.error = function(index,value,e) {
    //throw new Error(QJ.MPMZ.text[index]+'相关值为：\n'+value);
    console.trace(QJ.MPMZ.text[index]+'相关值为：\n'+value);
    if (!!e) throw e;
}
//=============================================================================
//
//=============================================================================
QJ.MPMZ.ClearAll = function() {
    $gameMap.initProjectileDataQJ();
    if (!SceneManager._scene) return;
    if (!SceneManager._scene._spriteset) return;
    if (!SceneManager._scene._spriteset.clearAllBulletMPMZ) return;
    SceneManager._scene._spriteset.clearAllBulletMPMZ();
}
QJ.MPMZ.getGroupIdInRange = function(name,ox,oy,range) {
    let eventData,ax,ay;
    range=range*range;
    ox+=$gameMap.displayX()*tileSize;
    oy+=$gameMap.displayY()*tileSize;
    return $gameMap._groupListQJ[name].filter((event)=>{
        if (!event) return false;
        eventData = $gameMap.event(event);
        if (!eventData) return false;
        ax = eventData.screenBoxXQJ() - ox;
        ay = eventData.screenBoxYQJ() - oy;
        return ax*ax+ay*ay<=range;
    });
};
QJ.MPMZ.getMinEventId = function(x,y,group,num,range) {
    let basedata=null,min=9999999,id=0,dis,ax,ay;
    let mapPointer = $gameMap;
    num=num||1;
    range=range||null;
    if (group) {
        let eventList = mapPointer._groupListQJ[group]||[];
        basedata = [];
        for (let i=0,il=eventList.length;i<il;i++) {
            if (eventList[i]) {
                basedata.push(mapPointer.event(eventList[i]));
            }
        }
    } else {
        basedata=mapPointer.events();
    }
    let lengthRem = {};
    if (range) range=range*range;
    basedata = basedata.filter((event)=>{
        ax = event.screenBoxXQJ()-x;
        ay = event.screenBoxYQJ()-y;
        dis = ax*ax+ay*ay;
        lengthRem[event.eventId()] = dis;
        return range?dis<=range:true;
    });
    if (num<=1) {
        for (let i of basedata) {
            dis = lengthRem[i.eventId()];
            if (dis<min) {
                min = dis;
                id=i.eventId();
            }
        }
    } else {
        basedata = basedata.sort((a,b)=>{
            dis = lengthRem[a.eventId()]-lengthRem[b.eventId()];
            return dis>0?1:(dis<0?-1:0);
        });
        id = basedata[Math.min(num,basedata.length)-1].eventId();
    }
    return id;
};
QJ.MPMZ.getMinBulletId = function(x,y,group,num,range) {
    let basedata=[],min=9999999,id=0,dis,ax,ay;
    num=num||1;
    range=range||null;
    if (group) {
        let mapPointer = $gameMap;
        let bulletList = mapPointer._mapBulletsNameQJ[group]||[];
        let allBulletList = mapPointer._mapBulletsQJ||[];
        for (let i in bulletList) {
            if (allBulletList[i]) {
                basedata.push(allBulletList[i]);
            }
        }
    } else {
        let mapPointer = $gameMap;
        let bulletList = mapPointer._mapBulletsQJ||[];
        for (let i in bulletList) {
            if (bulletList[i]) {
                basedata.push(bulletList[i]);
            }
        }
    }
    let lengthRem = {};
    if (range) range=range*range;
    basedata = basedata.filter((bullet)=>{
        ax = bullet.x-x;
        ay = bullet.y-y;
        dis = ax*ax+ay*ay;
        lengthRem[bullet.index] = dis;
        return range?dis<=range:true;
    });
    if (num<=1) {
        for (let i of basedata) {
            dis = lengthRem[i.index];
            if (dis<min) {
                min = dis;
                id=i.index;
            }
        }
    } else {
        basedata = basedata.sort((a,b)=>{
            dis = lengthRem[a.index]-lengthRem[b.index];
            return dis>0?1:(dis<0?-1:0);
        });
        id = basedata[Math.min(num,basedata.length)-1].index;
    }
    return id;
};
//=============================================================================
//
//=============================================================================
QJ.buildProjectile = function(bulletTarget) {
    return "b"+bulletTarget.index;
};
QJ.getCharAndProj = function(id) {
    if (typeof id === 'string' && id[0]==='b') {
        return $gameMap.bulletQJ(Number(id.slice(1)));
    } else {
        return QJ.getCharacter(id);
    }
};
//=============================================
let lineTexture = QJ.lineTexture = {};
//=============================================
QJ.createTextureLineForTrailEffect = function(bit,name,container,posStartX,posW,posStartY,posH,cutDown = 0,cutLeft = 0,cutRight = 0,cutUp = 0) {
    let lsCanvas = document.createElement('canvas');
    let lscontext = lsCanvas.getContext('2d');
    let lsBaseTexture = null;
    //===========================================================================================
    posStartX = (posStartX<1?Math.floor(bit.width*posStartX):posStartX).clamp(0,bit.width);
    posStartY = (posStartY<1?Math.floor(bit.height*posStartY):posStartY).clamp(0,bit.height);
    posW = (posW<1?Math.floor(bit.width*posW):posW).clamp(0,bit.width);
    posH = (posH<1?Math.floor(bit.height*posH):posW).clamp(0,bit.height);
    //===========================================================================================
    cutDown = (cutDown<1?Math.floor(bit.height*cutDown):cutDown).clamp(0,bit.height);
    cutUp = (cutUp<1?Math.floor(bit.height*cutUp):cutUp).clamp(0,bit.height);
    cutLeft = (cutLeft<1?Math.floor(bit.width*cutLeft):cutLeft).clamp(0,bit.width);
    cutRight = (cutRight<1?Math.floor(bit.width*cutRight):cutRight).clamp(0,bit.width);
    //===========================================================================================
    let w = posW.clamp(0,bit.width-posStartX);
    let h = posH.clamp(0,bit.height-posStartY);
    lsCanvas.width = w;
    lsCanvas.height = h;
    lsBaseTexture = new PIXI.BaseTexture(lsCanvas);
    lsBaseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
    lsBaseTexture.width = w;
    lsBaseTexture.height = h;
    lscontext.globalCompositeOperation = 'source-over';
    lscontext.drawImage(bit._canvas?bit._canvas:bit._image,posStartX,posStartY,w,h,0,0,w,h);
    //===========================================================================================
    if (cutUp>0)    lscontext.clearRect(0, 0, w, cutUp);
    if (cutDown>0)  lscontext.clearRect(0, h-cutDown, w, cutDown);
    if (cutLeft>0)  lscontext.clearRect(0, 0, cutLeft, h);
    if (cutRight>0) lscontext.clearRect(w-cutRight, 0, cutRight, h);
    //===========================================================================================
    lsBaseTexture.update();
    if (name&&container) container[name] = lsBaseTexture;
    return lsBaseTexture;
};
//=============================================================================
//
//=============================================================================
QJ.MPMZ.forBidDestination = eval(parameters.forBidDestination);
$.Game_Temp_setDestination = Game_Temp.prototype.setDestination
Game_Temp.prototype.setDestination = function(x, y) {
    if (QJ.MPMZ.forBidDestination) return;
    $.Game_Temp_setDestination.call(this,x,y);
};
$.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    $.Game_System_initialize.apply(this);
    this._playerBoxData = {
        offsetX:Number(parameters.playerInitBoxOffsetX),
        offsetY:Number(parameters.playerInitBoxOffsetY),
        body:eval(parameters.playerInitBox)
    };
    /*this._followerBoxData = {
        offsetX:0,
        offsetY:0,
        body:['C',tileSize/2]
    };*/
    this._eventBoxData = {
        offsetX:Number(parameters.eventInitBoxOffsetX),
        offsetY:Number(parameters.eventInitBoxOffsetY),
        body:eval(parameters.eventInitBox)
    };
};
//=============================================================================
//
//=============================================================================
if (isMV) {
ImageManager.loadProjectileQJ = function(filename, hue = 0) {
    if (filename) {
        const url = 'img/projectiles/' + encodeURIComponent(filename).replace(/%2F/g, "/") + ".png";
        let bitmap = this.loadNormalBitmap(url, hue || 0);
        bitmap.smooth = false;
        return bitmap;
    } else {
        return this.loadEmptyBitmap();
    }
};

ImageManager.loadActionSeq = function(filename, hue) {
    return this.loadBitmap('img/Special__actionSeq/', filename, hue, true);
};

} else {
ImageManager.loadProjectileQJ = function(filename) {
    return this.loadBitmap('img/projectiles/', filename);
};
ImageManager._projectiles = {};
$.ImageManager_loadBitmapFromUrl = ImageManager.loadBitmapFromUrl;
ImageManager.loadBitmapFromUrl = function(url) {
    if (url.includes("/projectiles/")) {
        const cache = this._projectiles;
        if (!cache[url]) {
            cache[url] = Bitmap.load(url);
        }
        return cache[url];
    } else {
        return $.ImageManager_loadBitmapFromUrl.apply(this,arguments);
    }
};
$.ImageManager_isReady = ImageManager.isReady;
ImageManager.isReady = function() {
    if (!$.ImageManager_isReady.call(this)) return false;
    let cache = this._projectiles;
    for (const url in cache) {
        const bitmap = cache[url];
        if (bitmap.isError()) {
            this.throwLoadError(bitmap);
        }
        if (!bitmap.isReady()) {
            return false;
        }
    }
    return true;
};
}
//=============================================================================
//
//=============================================================================
QJ.MPMZ.createDEFrameQJ = function(value,type,noFadeCopy = false,name = null) {
    if (typeof value === "number" || typeof value === "string") return new DEFrameQJ(name,value,type,noFadeCopy);
    else return value;
};
//=============================================================================
//
//=============================================================================
$.Scene_Map_create = Scene_Map.prototype.create;
Scene_Map.prototype.create = function() {
    $.Scene_Map_create.apply(this,arguments);
    this.preloadImgQJ();
};
Scene_Map.prototype.preloadImgQJ = function() {
    if (!this._transfer) return;
    this._needPreloadMPMZ = true;
    let loadFunc = ImageManager.loadProjectileQJ.bind(ImageManager);
    for (let path of preloadImgList) {
        loadFunc(path);
    }
};
$.Scene_Map_start = Scene_Map.prototype.start;
 Scene_Map.prototype.start = function() {
    $.Scene_Map_start.apply(this,arguments);
    if (this._needPreloadMPMZ) this.preloadImgQJ_toGPU();
};
Scene_Map.prototype.preloadImgQJ_toGPU = function() {
    this._needPreloadMPMZ = false;
    let loadFunc = ImageManager.loadProjectileQJ.bind(ImageManager);
    let baseTexture;
    if (isMV) {
        let renderer = Graphics._renderer;
        for (let path of preloadImgList) {
            baseTexture = loadFunc(path).baseTexture;
            if (baseTexture instanceof PIXI.BaseTexture) {
                if (!baseTexture._glTextures[renderer.CONTEXT_UID]) {
                    renderer.textureManager.updateTexture(baseTexture);
                }
            }
        }
    } else {
        let renderer = Graphics._app.renderer;
        for (let path of preloadImgList) {
            baseTexture = loadFunc(path).baseTexture;
            if (baseTexture instanceof PIXI.BaseTexture) {
                if (!baseTexture._glTextures[renderer.CONTEXT_UID]) {
                    renderer.texture.bind(baseTexture);
                }
            }
        }
    }
};
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
Game_QJBulletMZ.prototype.initialize = function(data,index) {
    //==========================================
    this.data=data;
    this.index=index;
    this.bulletMode = 0;
    this.type = 0;
    //==========================================
    this.calculateData();
    //==========================================
};
Game_QJBulletMZ.prototype.calculateData = function() {
    //==========================================
    this.dead=false;
    this.time = 0;
    this.timeLineX = 0;
    this.timeLineY = 0;
    this._x = this.data.position[0];
    this._y = this.data.position[1];
    if (this.data.onScreen) {
        this._orginDisplayX = $gameMap.displayX()*tileSize;
        this._orginDisplayY = $gameMap.displayY()*tileSize;
    }
    this.x = this._x;
    this.y = this._y;
    this.scaleX = 0;
    this.scaleY = 0;
    this.anchorX = 0;
    this.anchorY = 0;
    this.opacity = 0;
    this.rotationMove = this.data.initialRotation;
    if (this.data.imgRotation[0]=="R") {
        let imgRSynData = this.data.imgRotation[2];
        if (typeof imgRSynData == "number") {
            this.rotationImg = imgRSynData
        } else if (!!imgRSynData) {
            this.rotationImg = this.rotationMove;
        } else {
            this.rotationImg = 0;
        }
    } else {
        this.rotationImg = 0;
    }
    this._animationPlaying = false;
    //R T NP | G P | SW S Time
    //==========================================
    let existData = this.data.existData[0];
    this.needBody = existData.G||existData.P||existData.R||existData.T||existData.N||existData.B||existData.NP||
        (this.data.groupName&&this.data.groupName.length>0);
    this.QJBody = null;
    //==========================================
    this.needAccuracy = this.data.judgeAccuracyMove>0||this.data.judgeAccuracyRotation>0||this.data.judgeAccuracyScale>0||this.data.judgeAccuracyAnchor>0;
    //==========================================
    this.needRemData = (this.data.extra&&this.data.extra.needRemData)||this.data.afterImage||
        (this.data.particles&&this.data.particles.length>0)||this.needAccuracy||(this.data.trailEffect&&this.data.trailEffect.length>0);
    this.dataRem = [];
    //==========================================
    this.needAdvancedData = this.data.moveJS.length>0||this.data.moveCE.length>0||this.data.moveF.length>0||
        this.data.deadJS.length>0||this.data.deadCE.length>0||this.data.deadF.length>0;
    //==========================================
    $gameMap.addMapBulletsNameQJ(this.index,this.data.groupName);
    //==========================================
    //动画图像，初始时设为true
    if (this.data.img && typeof this.data.img === "object") {
        if (this.data.img[0]==='A') {
            if (this.data.img.length<=2) {
                this.data.img.push(1);
            }
            if (this.data.img[1]>0) {
                this.selfAnimtationPlaying = true;
            }
        }
    }
    //==========================================
    this.timelineEffectList = {
        B:[],
        S:[],
        F:[]
    };
    this.freeScale = 1;
    //==========================================
    this.checkColorToneStatic();
    this.setDBStatus(true);
    //==========================================
    this.update(true);
    //==========================================
}
Game_QJBulletMZ.prototype.checkColorToneStatic = function() {
    let value = this.data.tone;
    this.isColorToneDynamic = typeof value[0] !== "number"||typeof value[1] !== "number"||typeof value[2] !== "number"||typeof value[3] !== "number";
    if (this.isColorToneDynamic) this._colorTone = [0,0,0,0];
    else this._colorTone = value.slice();
};
Game_QJBulletMZ.prototype.afterDeal = function() {

};
Game_QJBulletMZ.prototype.screenXQJ = function() {
    return this.x;
};
Game_QJBulletMZ.prototype.screenYQJ = function() {
    return this.y;
};
Game_QJBulletMZ.prototype.scrolledX = function() {
    return $gameMap.adjustX(this.x/tileSize);
};
Game_QJBulletMZ.prototype.scrolledY = function() {
    return $gameMap.adjustY(this.y/tileSize);
};
Game_QJBulletMZ.prototype.screenXShowQJ = function() {
    return Math.floor(this.scrolledX() * $gameMap.tileWidth());
};
Game_QJBulletMZ.prototype.screenYShowQJ = function() {
    return Math.floor(this.scrolledY() * $gameMap.tileHeight());
};
/*Game_QJBulletMZ.prototype.canvasScrollMapXQJ = function() {
    return Math.floor((this.scrolledX() + $gameMap.displayX()) * $gameMap.tileWidth());
};
Game_QJBulletMZ.prototype.canvasScrollMapYQJ = function() {
    return Math.floor((this.scrolledY() + $gameMap.displayY())* $gameMap.tileHeight());
};
Object.defineProperties(Game_QJBulletMZ.prototype, {
    x: {
        enumerable: false,
        get:function() {
            return this.__x;
        },
        set:function(v) {
            this.__x = v;
            if ($gameMap.isLoopHorizontal()) {
                this.__x = this.canvasScrollMapXQJ();
            }
        }
    },
    y: {
        enumerable: false,
        get:function() {
            return this.__y;
        },
        set:function(v) {
            this.__y = v;
            if ($gameMap.isLoopVertical()) {
                this.__y = this.canvasScrollMapYQJ();
            }
        }
    }
});*/
Game_QJBulletMZ.prototype.inheritX = function() {
    return this.x - $gameMap.displayX()*tileSize;
};
Game_QJBulletMZ.prototype.inheritY = function() {
    return this.y - $gameMap.displayY()*tileSize;
};
Game_QJBulletMZ.prototype.screenBoxXQJ = function() {
    return this.screenXQJ();
};
Game_QJBulletMZ.prototype.screenBoxYQJ = function() {
    return this.screenYQJ();
};
Game_QJBulletMZ.prototype.inheritRotation = function() {
    return this.rotationMove;
};
Game_QJBulletMZ.prototype.inheritImgRotation = function() {
    return this.rotationImg;
};
Game_QJBulletMZ.prototype.screenRotationShowQJ = function() {
    return this.rotationMove*Math.PI/180;
};
Game_QJBulletMZ.prototype.destroy = function() {
    this.deadOver = true;
    $gameMap.removeBulletQJ(this.index);
    $gameMap.deleteMapBulletsNameQJ(this.index,this.data.groupName);
    this.data.extra = null;//专门清理一下额外
    for (let ed of this.data.existData) {
        ed.a = null;//专门清理一下行动
    }
    for (let i in this.data) {
        this.data[i] = null;
    }
    this.data = null;
};
Game_QJBulletMZ.prototype.refreshBox = function(justMakeData) {
    let body;
    if (justMakeData) {
        body = justMakeData;
    } else {
        if (this.data.collisionBox[0]=='auto') {
            if (this.data.bitmapWidth&&this.data.bitmapHeight) {
                this.data.collisionBox = body = ['R',this.data.bitmapWidth,this.data.bitmapHeight];
            } else {
                body = ['R',1,1];
                this.autoCollisionBoxRefresh = 1;
            }
        } else {
            body = this.data.collisionBox;
        }
    }
    let newSATBody;
    if (body[0]=='C') {
        newSATBody = QJ.SAT.box(this.x,this.y,['C',body[1]*(Math.abs(this.scaleX)+Math.abs(this.scaleY))/2]);
        let ro = this.rotationImg*Math.PI/180;
        let w = body[1]*Math.abs(this.scaleX)*(0.5-(body[3]==undefined?this.anchorX:body[3]));
        let h = body[1]*Math.abs(this.scaleY)*(0.5-(body[4]==undefined?this.anchorY:body[4]));
        let len = Math.sqrt(w*w+h*h);
        newSATBody.setOffset(new SATVector(len*Math.sin(ro),-len*Math.cos(ro)));
    } else if (body[0]=='R') {
        newSATBody = QJ.SAT.box(this.x,this.y,['R',body[1]*this.scaleX,body[2]*this.scaleY],this.scaleX*this.scaleY<0);
        newSATBody.angle = this.rotationImg*Math.PI/180;//直接赋值，不用重新刷新。
        newSATBody.setOffset(new SATVector(
            body[1]*this.scaleX*(0.5-(body[3]==undefined?this.anchorX:body[3])),
            body[2]*this.scaleY*(0.5-(body[4]==undefined?this.anchorY:body[4]))
        ));
    } else if (body[0] == 'E') {
        // 按矩形相同的缩放/镜像规则把宽高带符号传进 QJ.SAT.box
        // 允许把可选分段数放在 body[5]，会原样传入
        const boxArg = ['E', body[1] * this.scaleX, body[2] * this.scaleY, body[3], body[4], body[5]];
        const isCCW = this.scaleX * this.scaleY < 0;
        newSATBody = QJ.SAT.box(this.x, this.y, boxArg, isCCW);

        // 直接赋值角度
        newSATBody.angle = this.rotationImg * Math.PI / 180;

        // 椭圆的锚点偏移与矩形一致（使用宽/高作为基准）
        newSATBody.setOffset(new SATVector(
            body[1] * this.scaleX * (0.5 - (body[3] == undefined ? this.anchorX : body[3])),
            body[2] * this.scaleY * (0.5 - (body[4] == undefined ? this.anchorY : body[4]))
        ));
} else if (body[0]=='S') {
    // ['S', R, startDeg, sweepDeg, anchorX?, anchorY?, segments?]
    const R = Math.abs(body[1]) * ((Math.abs(this.scaleX) + Math.abs(this.scaleY)) / 2);
    const startDeg = body[2];
    const sweepDeg = body[3];
    const ax = (body[4] == undefined ? this.anchorX : body[4]);
    const ay = (body[5] == undefined ? this.anchorY : body[5]);
    const segs = body[6];

    let newSATBody = QJ.SAT.box(this.x, this.y, ['S', R, startDeg, sweepDeg, ax, ay, segs], this.scaleX*this.scaleY < 0);

    // 旋转与偏移（与矩形一致）
    newSATBody.angle = this.rotationImg * Math.PI / 180;
    const width  = 2 * R * (this.scaleX >= 0 ? 1 : -1);
    const height = 2 * R * (this.scaleY >= 0 ? 1 : -1);
    newSATBody.setOffset(new SATVector(
        width  * (0.5 - ax),
        height * (0.5 - ay)
    ));

    if (justMakeData) return newSATBody;
    else this.QJBody = newSATBody;
    return; // 提前结束，避免落到后面的默认处理
}

    if (justMakeData) return newSATBody;
    else this.QJBody = newSATBody;
};
Game_QJBulletMZ.prototype.updateBodyPosition = function(extraBodyData) {
    QJ.SAT.setPostion(extraBodyData?extraBodyData:this.QJBody,this.x,this.y);
};
Game_QJBulletMZ.prototype.directSetBodyPosition = function(extraBodyData,x,y) {
    QJ.SAT.setPostion(extraBodyData?extraBodyData:this.QJBody,x,y);
};
Game_QJBulletMZ.prototype.updateFadeValue = function() {
	if (!this || !this.data || this.dead) return;
    let data = this.data;
    //=========================================================
    let timelineF = this.getTimelineEffect("F");
    this.opacity = data.opacity.get() * timelineF;
    //=========================================================
    let timelineB = this.getTimelineEffect("B");
    let newScaleX = data.scale[0].get() * timelineB * this.freeScale;
    let newScaleY = data.scale[1].get() * timelineB * this.freeScale;
    let newAnchorX = data.anchor[0].get();
    let newAnchorY = data.anchor[1].get();
    //=========================================================
    if (this.scaleX!=newScaleX||this.scaleY!=newScaleY||
        this.anchorX!=newAnchorX||this.anchorY!=newAnchorY) {
        this.scaleX = newScaleX;
        this.scaleY = newScaleY;
        this.anchorX = newAnchorX;
        this.anchorY = newAnchorY;
        this._needRefreshBox = true;
    }
    //=========================================================
    if (this.isColorToneDynamic) {
        this.updateColorTone();
    }
    //=========================================================
};
Game_QJBulletMZ.prototype.updateJSAndQT = function() {
    //=======================
    let data = this.data;
    //=======================
    if (data.moveF) {
        for (let i=0,il=data.moveF.length,detail;i<il;i++) {
            if (this.dead) return;
            detail = data.moveF[i];
            if (detail[0]<=0) {
                if (detail[1]==-2) {
                    //
                } else if (detail[1]==-1) {
                    let args = detail[3].slice();
                    args.push(detail);
                    detail[2].apply(this,args);
                    detail[1] = -2;
                } else if (detail[1]==0) {
                    let args = detail[3].slice();
                    args.push(detail);
                    detail[2].apply(this,args);
                    detail[1] = detail[4];
                } else {
                    detail[1]--;
                }
            } else {
                detail[0]--;
            }
        }
    }
    if (this.dead) return;
    //=======================
    if (data.moveJS) {
        for (let i=0,il=data.moveJS.length,detail;i<il;i++) {
            if (this.dead) return;
            detail = data.moveJS[i];
            if (detail[0]<=0) {
                if (detail[1]==-2) {
                    //
                } else if (detail[1]==-1) {
                    eval(detail[2]);
                    detail[1] = -2;
                } else if (detail[1]==0) {
                    eval(detail[2]);
                    detail[1] = detail[4];
                } else {
                    detail[1]--;
                }
            } else {
                detail[0]--;
            }
        }
    }
    if (this.dead) return;
    //=======================
    if (data.moveCE.length>0) {
        for (let i=0,il=data.moveCE.length,detail;i<il;i++) {
            if (this.dead) return;
            detail = data.moveCE[i];
            if (detail[0]<=0) {
                if (detail[1]==-2) {
                    //
                } else if (detail[1]==-1) {
                    $gameMap.steupCEQJ(detail[2],null,{bulletId:this.index,targetId:0,sendValue:detail[3]},{});
                    detail[1] = -2;
                } else if (detail[1]==0) {
                    $gameMap.steupCEQJ(detail[2],null,{bulletId:this.index,targetId:0,sendValue:detail[3]},{});
                    detail[1] = detail[4];
                } else {
                    detail[1]--;
                }
            } else {
                detail[0]--;
            }
        }
    }
    //=======================
};
Game_QJBulletMZ.prototype.updateColorTone = function() {
    //this._colorTone
    let data = this.data.tone;
    let currentData = this._colorTone;
    let r = data[0].get();
    let g = data[1].get();
    let b = data[2].get();
    let gray = data[3].get();
    if (currentData[0]!==r||currentData[1]!==g||currentData[2]!==b||currentData[3]!==gray) {
        this._colorTone = [r,g,b,gray];
    }
};
Game_QJBulletMZ.prototype.remData = function(isCore = true) {
    //=======================x,y,r,ir,sx,sy,ax,ay
    this.dataRem.push(new Game_QJRemData(isCore,this.x,this.y,this.rotationMove,this.rotationImg,this.scaleX,this.scaleY,this.anchorX,this.anchorY));
    //=======================
};
Game_QJBulletMZ.prototype.remDataGet = function(index) {
    //=======================
    return this.dataRem[Math.max(0,this.dataRem.length-1+index)]
    //=======================
};
Game_QJBulletMZ.prototype.remDataGetAt = function(index) {
    //=======================
    return this.dataRem[index.clamp(0,this.dataRem.length-1)]
    //=======================
};
Game_QJBulletMZ.prototype.updateDynamicBitmap = function() {
    //=======================
    if (this.dynamicBitmap && this._dynamicBitmapRunning) this.dynamicBitmap.add();
    //=======================
};
Game_QJBulletMZ.prototype.buildDynamicBitmap = function(name,bitmap) {
    //=======================
    this.dynamicBitmap = new AnimatedQJ(name);
    this.dynamicBitmap.saveWH(bitmap.width,bitmap.height);
    //=======================
};
Game_QJBulletMZ.prototype.setDynamicBitmap = function(sprite) {
    //=======================
    if (this.dynamicBitmap) this.dynamicBitmap.setSaveWH(sprite,true);
    //=======================
};
Game_QJBulletMZ.prototype.refreshDynamicBitmap = function(sprite) {
    //=======================
    if (this.dynamicBitmap) this.dynamicBitmap.setSaveWH(sprite,false);
    //=======================
};
Game_QJBulletMZ.prototype.update = function (ifInit) {
    //这里的return是说update会不会中途中断，若没中断，则可以往后写一些其他指令。
    //console.time("bulletUpdate");
    //=======================	
	// 时停检测
	if(this.data.paused) return;	
    //=======================	
    if (this.dead) {
        this.updateDead();
        this.updateDynamicBitmap();
        return true;
    }
    if (this.autoCollisionBoxRefresh>0) {//为读取自动碰撞体积
        this.autoCollisionBoxRefresh--;
        if (this.autoCollisionBoxRefresh===0) {
            this.refreshBox();
        }
    }	
    this.time++;
    if (!ifInit) this.updateExistDataConditionT();
    this._needRefreshBox = false;
    this.updateTimelineEffect();
    this.updateFadeValue();
    this.updateMove();
    if (this.dead) return true;//必须，不可删。此项上方有可能dead
    if (this.needAdvancedData) this.updateJSAndQT();
    if (this.dead) return true;//必须，不可删。此项上方有可能dead
    if (this.data.timeline.length>0) this.updateTimeline();
    this.updateImgRotation();
    if (this.needRemData) this.remData();
    if (this.dead) return true;//必须，不可删。此项上方有可能dead
    this.updateAdvancedExistData();
    if (this.dead) return true;//必须，不可删。此项上方有可能dead
    this.updateDynamicBitmap();
    //=======================
    //console.timeEnd("bulletUpdate");
    return false;
};
Game_QJBulletMZ.prototype.updateAdvancedExistData = function() {
    if (this.needAccuracy && this.dataRem.length>1) {
        let math = Math;
        let lastPoint = this.dataRem[this.dataRem.length-2];
        let nowPoint = this.dataRem[this.dataRem.length-1];
        let dx = nowPoint.x - lastPoint.x;
        let dy = nowPoint.y - lastPoint.y;
        let dr = nowPoint.ir- lastPoint.ir;
        let dsx= nowPoint.sx- lastPoint.sx;
        let dsy= nowPoint.sy- lastPoint.sy;
        let dax= nowPoint.ax- lastPoint.ax;
        let day= nowPoint.ay- lastPoint.ay;
        let len = math.round(math.sqrt(dx*dx+dy*dy)*100)/100;
        let stepNum = 0;
        if (this.data.judgeAccuracyMove>0) {
            stepNum = math.max(stepNum,math.floor(len/this.data.judgeAccuracyMove));
        }
        if (this.data.judgeAccuracyRotation>0) {
            stepNum = math.max(stepNum,math.floor(math.abs(dr)/this.data.judgeAccuracyRotation));
        }
        if (this.data.judgeAccuracyScale>0) {
            stepNum = math.max(stepNum,math.floor(math.abs(dsx)/this.data.judgeAccuracyScale));
            stepNum = math.max(stepNum,math.floor(math.abs(dsy)/this.data.judgeAccuracyScale));
        }
        if (this.data.judgeAccuracyAnchor>0) {
            stepNum = math.max(stepNum,math.floor(math.abs(dax)/this.data.judgeAccuracyAnchor));
            stepNum = math.max(stepNum,math.floor(math.abs(day)/this.data.judgeAccuracyAnchor));
        }
        if (stepNum>1) {
            this.dataRem.splice(this.dataRem.length-1,1);
            dx /= stepNum;
            dy /= stepNum;
            dr /= stepNum;
            dsx/= stepNum;
            dsy/= stepNum;
            dax/= stepNum;
            day/= stepNum;
            this.x = lastPoint.x;
            this.y = lastPoint.y;
            this.rotationImg = lastPoint.ir;
            this.scaleX = lastPoint.sx;
            this.scaleY = lastPoint.sy;
            this.anchorX = lastPoint.ax;
            this.anchorY = lastPoint.ay;
            //注意，不能从上一原始位置开始判定，因为从该位置判定会导致无法反弹。
            for (let m=0,ml=stepNum-1;m<ml;m++) {//从下一步开始到最后一步之前的一步
                this.x+=dx;
                this.y+=dy;
                this.rotationImg+=dr;
                this.scaleX+= dsx;
                this.scaleY+= dsy;
                this.anchorX+=dax;
                this.anchorY+=day;
                this.remData(false);
                this.refreshBox();
                this.updateExistData(true,true,false,true,true);
                if (this.dead || nowPoint.r!==this.rotationMove) {
                    return;
                }
            }
            //正常来说上面这个函数直接将对应数据归位了，但为了精准，还是直接再赋一次值的好。
            this.x = nowPoint.x;
            this.y = nowPoint.y;
            this.rotationImg = nowPoint.ir;
            this.scaleX = nowPoint.sx;
            this.scaleY = nowPoint.sy;
            this.anchorX = nowPoint.ax;
            this.anchorY = nowPoint.ay;
            this.remData();
            //console.log(this.dataRem,nowPoint.ir,lastPoint.ir);
        }
    }
    //永远执行，为的是目标/最后一步。
    if (this.needBody) {
        if (this._needRefreshBox) {
            this.refreshBox();
        } else {
            this.updateBodyPosition();
        }
    }
    this.updateExistData();
};
Game_QJBulletMZ.prototype.updateDead = function(ifWaitAnimation) {
    let deadDeal1 = this.updateImgDeadAnim();
    let deadDeal2 = this.updateAfterImageDelay();
    let deadDeal3 = ifWaitAnimation?false:this.updateSystemAnim();
    let deadDeal4 = this.updateTrailDelay();
    if (deadDeal1&&deadDeal2&&deadDeal3&&deadDeal4) this.destroy();
};
Game_QJBulletMZ.prototype.updateMove = function() {
    //=======================
    let data = this.data,moveType = data.moveType;
    let lastRemX = this.x,lastRemY = this.y;
    //=======================
    switch(moveType[0]) {
    case 'S':{
        let dataObject;
        if (!moveType[2]) {
            if (moveType.length===2) moveType.push(0);
            dataObject = moveType[2] = {speed:0,oldSpeed:0,moveX:0,moveY:0,rotation:NaN};
            moveType[1] = new DEFrameQJ(null,moveType[1],0);
        } else {
            dataObject = moveType[2];
        }
        dataObject.speed = moveType[1].get();
        if (dataObject.rotation!=this.rotationMove||dataObject.speed!=dataObject.oldSpeed) {
            dataObject.oldSpeed=dataObject.speed;
            dataObject.rotation = this.rotationMove;
            let radian = dataObject.rotation*Math.PI/180;
            let speed = dataObject.speed;
            dataObject.moveX = speed*Math.sin(radian);
            dataObject.moveY = -speed*Math.cos(radian);
        }
        this.x += dataObject.moveX;
        this.y += dataObject.moveY;
        break;
    }
    case 'TP':
    case 'TG':
    case 'TB':{
        let target,dealData,newRotation,newSpeed;
        if (moveType[0]=='TP') {
            if (moveType.length<=4) {
                if (moveType.length==3) moveType.push(0);
                moveType[4] = {speed:0,maxRotation:0,rd:0};
                moveType[1] = new DEFrameQJ(null,moveType[1],0);
                moveType[2] = new DEFrameQJ(null,moveType[2],0);
                moveType[3] = new DEFrameQJ(null,moveType[3],0);
            }
            dealData = moveType[4];
            dealData.speed = moveType[1].get();
            dealData.maxRotation = moveType[2].get();
            dealData.rd = moveType[3].get();
            target = $gamePlayer;
        } else if (moveType[0]=='TG') {
            if (moveType.length<=5) {
                if (moveType.length==4) moveType.push(0);
                moveType[5] = {speed:0,maxRotation:0,rd:0};
                moveType[2] = new DEFrameQJ(null,moveType[2],0);
                moveType[3] = new DEFrameQJ(null,moveType[3],0);
                moveType[4] = new DEFrameQJ(null,moveType[4],0);
            }
            dealData = moveType[5];
            dealData.speed = moveType[2].get();
            dealData.maxRotation = moveType[3].get();
            dealData.rd = moveType[4].get();
            let id = QJ.MPMZ.getMinEventId(this.x,this.y,moveType[1]);
            target = id>0?QJ.getCharacter(id):null;
        } else if (moveType[0]=='TB') {
            if (moveType.length<=5) {
                if (moveType.length==4) moveType.push(0);
                moveType[5] = {speed:0,maxRotation:0,rd:0};
                moveType[2] = new DEFrameQJ(null,moveType[2],0);
                moveType[3] = new DEFrameQJ(null,moveType[3],0);
                moveType[4] = new DEFrameQJ(null,moveType[4],0);
            }
            dealData = moveType[5];
            dealData.speed = moveType[2].get();
            dealData.maxRotation = moveType[3].get();
            dealData.rd = moveType[4].get();
            let id = QJ.MPMZ.getMinBulletId(this.x,this.y,moveType[1]);
            target = $gameMap.bulletQJ(id);
        }
        let math = Math;
        if (target) {
            //2023-10-8重写，使跟踪算法支持rotationMove在变化时不归约为0~360，
            //这样rotationMove的变化就同时能代表方向。
            //主要是为了修正judgeAccuraryRotation中的角度判定方位。
            //需要注意的是，以后若写类似功能，一定要考虑到角度的变化顺序问题。
            //=========================================================
            let targetX = target.screenBoxXQJ();
            let targetY = target.screenBoxYQJ();
            //=========================================================
            let orginLastRo =  this.rotationMove;
            //=========================================================
            let standardTargetRo = math.angleStandard_MPMZ(QJ.calculateAngleByTwoPointAngle(this.x,this.y,targetX,targetY)+math.floor(math.random()*dealData.rd));
            let standardLastRo = math.angleStandard_MPMZ(this.rotationMove);
            //=========================================================
            let judgeTargetRo = standardTargetRo;
            let judgeLastRo = standardLastRo;
            //=========================================================
            if (judgeTargetRo<judgeLastRo) judgeTargetRo+=360;
            if (judgeTargetRo-judgeLastRo>=180) {//逆时针
                this.rotationMove=orginLastRo-dealData.maxRotation;
                //=========================================================
                let judgeTargetRoRevise = standardTargetRo;
                let judgeLastRoRevise = math.angleStandard_MPMZ(this.rotationMove);
                //=========================================================
                if (judgeTargetRoRevise<judgeLastRoRevise) judgeTargetRoRevise+=360;
                if (judgeTargetRoRevise-judgeLastRoRevise<180) {
                    let du = math.abs(standardLastRo-standardTargetRo);
                    if (du>=180) du = 360-du;
                    this.rotationMove=orginLastRo-du;
                }
            } else {//顺时针
                this.rotationMove=orginLastRo+dealData.maxRotation;
                //=========================================================
                let judgeTargetRoRevise = standardTargetRo;
                let judgeLastRoRevise = math.angleStandard_MPMZ(this.rotationMove);
                //=========================================================
                if (judgeTargetRoRevise<judgeLastRoRevise) judgeTargetRoRevise+=360;
                if (judgeTargetRoRevise-judgeLastRoRevise>=180) {
                    let du = math.abs(standardLastRo-standardTargetRo);
                    if (du>=180) du = 360-du;
                    this.rotationMove=orginLastRo+du;
                }
            }
            //=========================================================
        }
        //无论角度是否变化，都执行。
        let radian = this.rotationMove*math.PI/180;
        dealData.moveX = dealData.speed*math.sin(radian);
        dealData.moveY = -dealData.speed*math.cos(radian);
        this.x += dealData.moveX;
        this.y += dealData.moveY;
        break;
    }
    case 'F':{
        if (moveType.length==3) {
            moveType.push({});
        }
        let t = this.time;
        let xL = Number(eval(moveType[1]));
        let yL = Number(eval(moveType[2]));
        let rotation = this.data.initialRotation*Math.PI/180;
        let lastX = this.x,lastY = this.y;
        if (isNaN(xL)||isNaN(yL)) {
            this.setDead();
            return;
        } else {
            this.x = xL*Math.sin(rotation)+ yL*Math.sin(rotation+Math.PI/2)+this._x;
            this.y = -xL*Math.cos(rotation)-yL*Math.cos(rotation+Math.PI/2)+this._y;
        }
        let newRotation = QJ.calculateAngleByTwoPointAngle(lastX,lastY,this.x,this.y);
        if (!isNaN(newRotation)) this.rotationMove = newRotation;
        break;
    }
    case 'QC':{
        if (moveType.length==5) {
            moveType[1] = moveType[1].clamp(1,89)*Math.PI/180;
            moveType.push({
                ground:this.data.initialRotation*Math.PI/180,
                times:moveType[2],
                time:0,
                kx:moveType[3]/moveType[4],
            });
            let data = moveType[5];
            data.disAll = data.times*moveType[3];
            data.timeAll = data.times*moveType[4];
            data.a = -Math.tan(moveType[1])/(moveType[2]*moveType[3]);
            data.f = data.a+'*x*x+'+(-1*data.a)+'*x*'+data.disAll;
        }
        let lastX = this.x,lastY = this.y;
        if (moveType[5].times>0) {
            let data = moveType[5];
            data.time++;
            if (data.time>data.timeAll) {
                data.times--;
                data.time = 0;
                data.disAll = data.times*moveType[3];
                data.timeAll = data.times*moveType[4];
                data.a = -Math.tan(moveType[1])/(moveType[2]*moveType[3]);
                data.f = data.a+'*x*x+'+(-1*data.a)+'*x*'+data.disAll;
                this._x = this.x;
                this._y = this.y;
            } else {
                let x = data.kx*data.time;
                let y = -Number(eval(data.f));
                let lx = x*Math.cos(Math.PI/2-data.ground);
                let ly = -x*Math.sin(Math.PI/2-data.ground)+y;
                this.x = this._x + lx;
                this.y = this._y + ly;
            }
        }
        let newRotation = QJ.calculateAngleByTwoPointAngle(lastX,lastY,this.x,this.y);
        if (!isNaN(newRotation)) this.rotationMove = newRotation;
        break;
    }
    case 'B':{
        if (moveType.length===2) {
            moveType = moveType.concat([0,0,0,0,0,0,0,0,true]);
        } else if (moveType.length===10) {
            moveType.push(true);
        }
        let lastX = this.x,lastY = this.y;
        let character = QJ.getCharacter(moveType[1]===0?this.data.eventId:moveType[1]),cx,cy;
        if (character) {
            cx = character.screenBoxXShowQJ();
            cy = character.screenBoxYShowQJ();
            let dir = Math.floor(character.direction()/2)*2;
            this.x = cx+$gameMap.displayX()*tileSize+moveType[dir];//character._realX*tileSize+tileSize/2+moveType[dir];
            this.y = cy+$gameMap.displayY()*tileSize+moveType[dir+1]//character._realY*tileSize+tileSize/2+moveType[dir+1];
        } else {
            this.setDead();
            return;
        }
        if (moveType[10]) {
            this.rotationMove = QJ.MPMZ.model[0].initialRotationExtra(QJ.makeDeepCopy(data.initialRotationRem),character,[cx,cy]);
        }
        break;
    }
    case 'C':{
        let noOriginData = true;
        if (moveType.length<=5) {
            if (moveType.length==4) moveType.push(0);
            else moveType[4] = Math.max(0.1,moveType[4]);
            moveType[2] = Array.isArray(moveType[2])?moveType[2].map((a)=>(new DEFrameQJ(null,a,0))):[new DEFrameQJ(null,moveType[2],0)];
            moveType[3] = new DEFrameQJ(null,moveType[3],0);
            moveType.push({rotation:this.rotationMove*Math.PI/180,radiusA:0,radiusB:0,speed:0});
            noOriginData = false;
        }
        let lastX = this.x,lastY = this.y;
        let character = QJ.getCharacter(moveType[1]);
        let newRotation;
        if (character) {
            moveType[5].radiusA=moveType[2][0].get();
            moveType[5].radiusB=moveType[2][1]===undefined?moveType[5].radiusA:moveType[2][1].get();
            moveType[5].speed=moveType[3].get();
            moveType[5].rotation+=moveType[5].speed*Math.PI/180;
            if (moveType[4]&&noOriginData) {
                let tarX = (character._realX-0.4)*tileSize+tileSize/2+moveType[5].radiusA*Math.sin(moveType[5].rotation);
                let tarY = (character._realY-0.6)*tileSize+tileSize/2-moveType[5].radiusB*Math.cos(moveType[5].rotation);
                if (this.x-tarX<=moveType[4]+0.2) {
                    this.x = tarX;
                } else {
                    this.x += (tarX-this.x)/Math.abs(this.x-tarX)*(moveType[4]+0.1);
                }
                if (this.y-tarY<=moveType[4]+0.2) {
                    this.y = tarY;
                } else {
                    this.y += (tarY-this.y)/Math.abs(this.y-tarY)*(moveType[4]+0.1);
                }
                newRotation = QJ.calculateAngleByTwoPointAngle(lastX,lastY,this.x,this.y);
            } else {
                this.x = (character._realX+character._offsetX)*tileSize+tileSize/2+moveType[5].radiusA*Math.sin(moveType[5].rotation);
                this.y = (character._realY+character._offsetY)*tileSize+tileSize/2-moveType[5].radiusB*Math.cos(moveType[5].rotation);
                newRotation = moveType[5].rotation*180/Math.PI+90;//QJ.calculateAngleByTwoPointAngle(lastX,lastY,this.x,this.y);
            }
        } else {
            this.setDead();
            return;
        }
        if (!isNaN(newRotation)) this.rotationMove = newRotation;
        break;
    }
    case 'D':{
        let lastX = this.x;
        let lastY = this.y;
        let event = QJ.getCharacter(data.eventId);
        let position = QJ.MPMZ.model[0].posExtra(QJ.makeDeepCopy(data.positionRem),event);
        this.x = position[0]+$gameMap.displayX()*tileSize;
        this.y = position[1]+$gameMap.displayY()*tileSize;
        if (moveType[1]) {
            this.rotationMove = QJ.MPMZ.model[0].initialRotationExtra(QJ.makeDeepCopy(data.initialRotationRem),event,position);
        } else if (lastX!==this.x || lastY!==this.y) {
            this.rotationMove = QJ.calculateAngleByTwoPointAngle(lastX,lastY,this.x,this.y);
        }
        break;
    }
    case 'QBG':{
        //target speedRate lengthRate 4ifRefreshWhenTargetMove
        let dealData = moveType[5];
        let needRecalData = false;
        if (!dealData) {
            moveType[2] = new DEFrameQJ(null,moveType[2],0);
            moveType[3] = new DEFrameQJ(null,moveType[3],0);
            moveType[4] = !!moveType[4];
            dealData = moveType[5] = {};
            if (moveType[4]) {
                //刷新轨迹
            } else {
                //不刷新轨迹
            }
            needRecalData = true;
        }
        if (moveType[4]||needRecalData) {
            let speedRate = moveType[2].get();
            let lengthRate = moveType[3].get();
            if (dealData.speedRate!==speedRate||dealData.lengthRate!==lengthRate) {
                needRecalData = true;
                dealData.speedRate=speedRate;
                dealData.lengthRate=lengthRate;
            }
            let id = QJ.MPMZ.getMinEventId(this.x,this.y,moveType[1]);
            let tempTarget = id>0?QJ.getCharacter(id):null;
            let target = dealData.id>0?QJ.getCharacter(dealData.id):null;
            if (dealData.id!==id) {
                if (!target) {
                    needRecalData = true;
                    dealData.id=id;
                    target = tempTarget;
                }
            }
            let tx = 0,ty = 0;
            if (target) {
                tx = target.screenBoxXQJ();
                ty = target.screenBoxYQJ();
                if (dealData.tx!=tx||dealData.ty!=ty) {
                    needRecalData = true;
                    dealData.tx=tx;
                    dealData.ty=ty;
                }
            } else {
                needRecalData = true;
            }
            if (!target&&dealData.t===undefined) {
                dealData.lM = true;
                dealData.ox = speedRate/2*Math.sin(this.rotationMove*Math.PI/180);
                dealData.oy =-speedRate/2*Math.cos(this.rotationMove*Math.PI/180);
                this.x += dealData.ox;
                this.y += dealData.oy;
            } else {
                if (target && needRecalData) {
                    dealData.t = 0;
                    let x = dealData.x = this.x;
                    let y = dealData.y = this.y;
                    let len = Math.sqrt((x-tx)*(x-tx)+(y-ty)*(y-ty));
                    dealData.cx = x+len*Math.sin(this.rotationMove*Math.PI/180)*lengthRate;
                    dealData.cy = y-len*Math.cos(this.rotationMove*Math.PI/180)*lengthRate;
                    dealData.tx = tx;
                    dealData.ty = ty;
                }
                dealData.t += (speedRate/600).clamp(0.0001,1);
                let t = dealData.t;
                this.x = (1-t)*(1-t)*dealData.x+2*t*(1-t)*dealData.cx+t*t*dealData.tx;
                this.y = (1-t)*(1-t)*dealData.y+2*t*(1-t)*dealData.cy+t*t*dealData.ty;
                this.rotationMove = (Math.atan2(
                    (2*dealData.ty+2*dealData.y-4*dealData.cy)*t-2*dealData.y+2*dealData.cy,
                    (2*dealData.tx+2*dealData.x-4*dealData.cx)*t-2*dealData.x+2*dealData.cx)+Math.PI/2)*180/Math.PI;
            }
        } else {
            let speedRate = moveType[2].get();
            if (dealData.lM) {
                this.x += dealData.ox;
                this.y += dealData.oy;
            } else {
                dealData.t += (speedRate/600).clamp(0.0001,1);
                let t = dealData.t;
                this.x = (1-t)*(1-t)*dealData.x+2*t*(1-t)*dealData.cx+t*t*dealData.tx;
                this.y = (1-t)*(1-t)*dealData.y+2*t*(1-t)*dealData.cy+t*t*dealData.ty;
                this.rotationMove = (Math.atan2(
                    (2*dealData.ty+2*dealData.y-4*dealData.cy)*t-2*dealData.y+2*dealData.cy,
                    (2*dealData.tx+2*dealData.x-4*dealData.cx)*t-2*dealData.x+2*dealData.cx)+Math.PI/2)*180/Math.PI;
            }
        }
        break;
    }
    case 'BL':{
        let math = Math;
        let angleToRadius = math.PI/180;
        if (moveType.length<7) {
            moveType[6] = {
                floorX:this.x,
                floorY:this.y,
                moveSin:math.sin(this.rotationMove*angleToRadius),
                moveCos:-math.cos(this.rotationMove*angleToRadius),
                widthDir:1,
                lastLen:0,
                speed:0
            };
            moveType[1] = new DEFrameQJ(null,moveType[1],0);
        }
        //['BL',speed,2stepMin,3stepMax,4widthMin,5widthMax]
        let detail = moveType[6];
        let speed = detail.speed = moveType[1].get();
        let moveLen;
        while(speed>0) {
            if (detail.lastLen<=0) {
                let step = moveType[2]+math.random()*(moveType[3]-moveType[2]);
                let width = moveType[4]+math.random()*(moveType[5]-moveType[4]);
                detail.ox = this.x;
                detail.oy = this.y;
                detail.tx = detail.floorX+step*detail.moveSin-width*detail.moveCos*detail.widthDir;
                detail.ty = detail.floorY-step*detail.moveCos+width*detail.moveSin*detail.widthDir;
                detail.lastLen = math.sqrt((detail.tx-detail.ox)*(detail.tx-detail.ox)+(detail.ty-detail.oy)*(detail.ty-detail.oy));
                detail.realSin = (detail.tx - detail.ox)/detail.lastLen;
                detail.realCos = (detail.ty - detail.oy)/detail.lastLen;
                detail.floorX += detail.moveSin*step;
                detail.floorY += detail.moveCos*step;
                detail.widthDir = -detail.widthDir;
                this.rotationMove = QJ.calculateAngleByTwoPoint(detail.ox,detail.oy,detail.tx,detail.ty);
                if (detail.lastLen<=0) break;//正常来说不可能，这没法移动。
            }
            moveLen = math.min(speed,detail.lastLen);
            this.x += moveLen*detail.realSin;
            this.y += moveLen*detail.realCos;
            detail.lastLen = math.max(0,detail.lastLen-moveLen);
            speed -= moveLen;
        }
        break;
    }
    case 'Free':{
        let math = Math;
        let lastX = this.x;
        let lastY = this.y;
        this.x = moveType[1].x;
        this.y = moveType[1].y;
        this.freeScale = moveType[1].s;
        if (moveType[1].r==="c") {
            let newRotation = QJ.calculateAngleByTwoPointAngle(lastX,lastY,this.x,this.y);
            if (!isNaN(newRotation)) this.rotationMove = newRotation;
        } else {
            this.rotationMove = moveType[1].r;
        }
        break;
    }
    case 'BB':{
        let event = QJ.getCharacter(data.eventId);
        let position = QJ.MPMZ.model[0].posExtra(QJ.makeDeepCopy(data.positionRem),event);
        let ox = position[0];
        let oy = position[1];
        let or = QJ.MPMZ.model[0].initialRotationExtra(QJ.makeDeepCopy(data.initialRotationRem),event,position);
        let x = 0;
        let y = 0;
        let r = 0;
        let target = $gameMap.bulletQJ(moveType[1]);
        if (target) {
            if (moveType[2]===false) {
                x += ox + target.x;
                y += oy + target.y;
            } else {
                let sin = Math.sin(target.rotationImg*Math.PI/180);
                let cos = Math.cos(target.rotationImg*Math.PI/180);
                x += oy * sin + ox * cos + target.x;
                y += - oy * cos + ox * sin + target.y;
            }
            if (moveType[3]!==false) {
                r += target.rotationImg + or;
            }
        } else {
            x += ox;
            y += oy;
            r += or;
        }
        this.x = x;
        this.y = y;
        this.rotationMove = r;
        break;
    }
    }
    //=========================================================================================
    if (data.onScreen) {
        let tx = $gameMap.displayX()*tileSize;
        let ty = $gameMap.displayY()*tileSize;
        let ox = tx - this._orginDisplayX;
        let oy = ty - this._orginDisplayY;
        this.x += ox;
        this.y += oy;
        this._orginDisplayX = tx;
        this._orginDisplayY = ty;
    }
    this._realX = this.x / tileSize-0.5;
    this._realY = this.y / tileSize-0.5;
    //=========================================================================================
};
Game_QJBulletMZ.prototype.updateImgRotation = function() {
    //rotationImg的大小一定不能归约为0~360，因为归约后无法表现出角度的变化方向（放大还是缩小）。
    //没有方向的话，judgeAccuraryRotation和trailEffect等需要角度的属性将出现错误。
    //=======================
    let data = this.data;
    let remData = this.rotationImg;
    switch(data.imgRotation[0]) {
        case 'F':this.rotationImg = this.rotationMove + data.imgRotation[1].get();break;
        case 'R':this.rotationImg += data.imgRotation[1].get();break;
        case 'S':this.rotationImg = data.imgRotation[1].get();break;
    }
    if (remData!=this.rotationImg) {
        this._needRefreshBox = true;
    }
    //=======================
};
Game_QJBulletMZ.prototype.JudgeReBound = function (sat,tb,cb,detail,target = null,bulletTarget = null) {
    if (!detail.rb||detail.rb[0]==0) {
        if (detail.t[0]=='P'||detail.t[0]=='G'||detail.t[0]=='B') {
            return true;
        } else {
            return this.setDead(detail);
        }
    } else {
        detail.rb[0]--;
        //====================================
        if (!detail.rb[3]) {
            if (detail.a&&(detail.rb[0]==0||(detail.rb[0]!=0&&detail.rb[2]))) {
                this.dealAction(detail.a,target,bulletTarget,false,true);
            }
            //====================================
            if (detail.an&&(detail.rb[0]==0||(detail.rb[0]!=0&&detail.rb[1]))) {
                this.playAnimation(detail.an);
            }
        }
        //====================================
        this.x -= Math.ceil(Math.sign(sat.overlapV.x)*(Math.abs(sat.overlapV.x)+0.5));
        this.y -= Math.ceil(Math.sign(sat.overlapV.y)*(Math.abs(sat.overlapV.y)+0.5));
        this.remData();
        QJ.SAT.setPostion(tb,this.x,this.y);
        //====================================
        if (this.data.moveType[0]=='QC') {
            let moveType = this.data.moveType;
            if (moveType.length<=5) this.updateMove();
            moveType[5].time=moveType[5].timeAll;
            this.updateMove();
            moveType[5].ground = moveType[5].ground*180/Math.PI;
            let oldR = moveType[5].ground,tbp=tb.pos,cbp=cb.pos,dl=45;
            let du = QJ.calculateAngleByTwoPointAngle(cbp.x,cbp.y,tbp.x,tbp.y);
            if (du<dl) moveType[5].ground=180-oldR;
            else if (du<180-dl) moveType[5].ground=-oldR;
            else if (du<180+dl) moveType[5].ground=180-oldR;
            else if (du<2*180-dl) moveType[5].ground=-oldR;
            else moveType[5].ground=180-oldR;
            if (moveType[5].ground>2*180) moveType[5].ground-=2*180;
            if (moveType[5].ground<0) moveType[5].ground+=2*180;
            moveType[5].ground = moveType[5].ground*Math.PI/180;
        } else if (cb.type===0) {
            this.rotationMove = QJ.calculateAngleByTwoPointAngle(0,0,-sat.overlapV.x,-sat.overlapV.y);
        } else if (cb.type===1) {
            let oldR = this.rotationMove,tbp=tb.pos,cbp=cb.pos,dl=45;
            let du = QJ.calculateAngleByTwoPointAngle(cbp.x,cbp.y,tbp.x,tbp.y);
            if (du<dl) this.rotationMove=180-oldR;
            else if (du<180-dl) this.rotationMove=-oldR;
            else if (du<180+dl) this.rotationMove=180-oldR;
            else if (du<2*180-dl) this.rotationMove=-oldR;
            else this.rotationMove=180-oldR;
            if (this.rotationMove>2*180) this.rotationMove-=2*180;
            if (this.rotationMove<0) this.rotationMove+=2*180;
        }
        //====================================
        if (detail.rb[3]) {
            if (detail.a&&(detail.rb[0]==0||(detail.rb[0]!=0&&detail.rb[2]))) {
                this.dealAction(detail.a,target,bulletTarget,false,true);
            }
            //====================================
            if (detail.an&&(detail.rb[0]==0||(detail.rb[0]!=0&&detail.rb[1]))) {
                this.playAnimation(detail.an);
            }
        }
        //====================================
        return false;
        //====================================
    }
}
Game_QJBulletMZ.prototype.setDead = function(data,target = null,bulletTarget = null) {
    //==============================================
    if (this.dead) return true;
    if (!data) {
        this.dead = true;
        this.dealPierceOutJSAll();
        this.destroy();
        return true;
    } else {
        if (!data.$) {//未初始化时强制初始化
            QJ.MPMZ.model[0].dealExistData(data);
        }
        if (target||bulletTarget) {
            let tempId = target?QJ.buildCharacter(target):QJ.buildProjectile(bulletTarget);
            if (data.havePierceCharacters[tempId]) {
                data.havePierceCharacters[tempId] = 2;
                return false;
            }
        }
        //==============================================
        if (data.d) {
            if (data.d[1]==0) {
                this.opacity = 0;
            } else {
                if (data.d[0]==0) {
                    if (data.d.length==2) {
                        data.d.push(null);
                        data.d.push({t:0,
                            fadeFun:new DEFrameQJ(null,'0|'+this.opacity+'~'+data.d[1]+'/0',0)});
                    }
                } else if (data.d[0]==1) {
                    if (data.d.length==3) {
                        data.d.push({t:0,
                            fadeFun:new DEFrameQJ(null,'0|'+this.opacity+'~'+data.d[1]+'/0',0),
                            scaleXFun:new DEFrameQJ(null,'0|'+this.scaleX+'~'+data.d[1]+'/'+(this.scaleX*data.d[2]),0),
                            scaleYFun:new DEFrameQJ(null,'0|'+this.scaleY+'~'+data.d[1]+'/'+(this.scaleY*data.d[2]),0)});
                    }
                }
                this.imgDeadAnimData = data.d;
            }
        }
        //==============================================
        if (data.an&&(data.p[0]==0||(data.p[0]!=0&&data.p[1]))) {
            this.playAnimation(data.an);
        }
        //==============================================
        if (data.r&&(data.p[0]==0||(data.p[0]!=0&&data.p[2]))) {
            this.rangeDeal(data);
        }
        //==============================================
        if (data.a&&(data.p[0]==0||(data.p[0]!=0&&data.p[2]))) {
            this.dealAction(data.a,target,bulletTarget,data.p[0]!=0,false);
        }
        //==============================================
        //==============================================
        //==============================================
        if (this.data.afterImage&&this.data.afterImage[4]) {
            this.afterImageDelay = [this.data.afterImage[2],0];
        }
        //==============================================
        if (data.p[0]<=0) {
            this.dealDeadJSAndQT();
        }
        //==============================================
    }
    //==============================================
    //console.log("dead");
    if (data.p[0]===0) {
        this.remData();//死亡之前进行判定，这样强制记录死亡点，防止各种效果出瑕疵。
        //当然直接destroy的那种就不用了，因为弹幕直接没。
        this.dead = true;
        this.dealPierceOutJSAll();
        return true;
    } else {
        if ((target||bulletTarget)&&(data.t[0]==='G'||data.t[0]==='P'||data.t[0]==='B')) {
            let index = target?QJ.buildCharacter(target):QJ.buildProjectile(bulletTarget);
            data.havePierceCharacters[index] = 2;
            if (data.p[3]) {
                if (typeof data.p[3] === "string") {
                    let target = target || bulletTarget;//局域变量，方便判定。
                    eval(data.p[3]);
                } else if (typeof data.p[3] === "function") {
                    data.p[3].call(this,target||bulletTarget||null);
                }
            }
            if (data.p[4]) {
                data.pierceCharactersOutJS[index] = data.p[4];
            }
            data.p[0]--;
        }
        return false;
    }
    //==============================================
};
Game_QJBulletMZ.prototype.dealPierceOutJSAll = function() {
    for (let k=1,kdata=this.data.existData,kl=kdata.length,detail;k<kl;k++) {
        detail = kdata[k];
        this.dealPierceOutJS(detail);
    }
};
Game_QJBulletMZ.prototype.dealPierceOutJS = function(detail) {
    let getFun = QJ.getCharAndProj;
    let judegeData = detail.havePierceCharacters;
    for (let i in judegeData) {
        if (judegeData[i]===1) {
            delete judegeData[i];
            if (detail.pierceCharactersOutJS[i]) {
                let target = getFun(i);
                if (typeof detail.pierceCharactersOutJS[i] === "string") {
                    eval(detail.pierceCharactersOutJS[i]);
                } else if (typeof detail.pierceCharactersOutJS[i] === "function") {
                    detail.pierceCharactersOutJS[i].call(this,target);
                }
                delete detail.pierceCharactersOutJS[i];
            }
        } else {
            judegeData[i] = 1;
        }
    }
};
Game_QJBulletMZ.prototype.dealDeadJSAndQT = function() {
    //=======================
    let data = this.data;
    //=======================[[函数,参数]]
    if (data.deadF.length>0) {
        let args;
        for (let detail of data.deadF) {
            args = detail[1].slice();
            args.push(detail);
            detail[0].apply(this,args);
        }
    }
    //=======================[字符串]
    if (data.deadJS.length>0) {
        for (let detail of data.deadJS) {
            eval(detail);
        }
    }
    //=======================[[公共事件编号,数据]]
    if (data.deadCE.length>0) {
        for (let detail of data.deadCE) {
            $gameMap.steupCEQJ(detail[0],null,{bulletId:this.index,targetId:0,sendValue:detail[1]},{});
        }
    }
    //=======================
};
Game_QJBulletMZ.prototype.playAnimation = function(anim) {
    if (typeof anim === "number" && anim>0) {
        this.requestAnimationId = anim;
        this.startAnimation();
    } else if (typeof anim === "object") {
        //{name,time,fadeIn:0,fadeOut:0}
        if (!anim.fadeIn) anim.fadeIn = 0;
        if (!anim.fadeOut) anim.fadeOut = 0;
        QJ.MPMZ.Shoot({img:anim.name,initialRotation:0,moveType:['S',0],
            position:[this.inheritX(),this.inheritY()],existData:[{t:['Time',anim.time]}],
            z:anim.z?anim.z:this.data.z,opacity:(anim.fadeIn||anim.fadeOut)?("0|1~"+anim.fadeIn+"/1~"+(anim.time-anim.fadeIn-anim.fadeOut)+"|1~"+anim.fadeOut+"/0"):1,
        });
        if (anim.se&&anim.se.length>0) {
            QJ.se(...anim.se);
        }
    }
}
Game_QJBulletMZ.prototype.dealAction = function(actionListData = [],target = null,bulletTarget = null,ifPierce = false,ifRebound = false) {
    if (actionListData.length === 0) {
        return;
    }
    if (typeof actionListData[0] === 'string') {
        actionListData = [actionListData];
    }
    for (let actionData of actionListData) {
        if (target) {
            if (target==$gamePlayer) {
                if (actionData[0]=='C'||actionData[0]=='CommonEvent') {
                    $gameMap.steupCEQJ(actionData[1],QJ.buildCharacter(target),{
                        bulletId:this.index,
                        ifPierce:ifPierce,
                        ifRebound:ifRebound,
                        targetId:-1,
                        sendValue:actionData[2]||[]
                    },{});
                } else if (actionData[0]=='SW'||actionData[0]=='Switch') {
                    $gameSwitches.setValue(actionData[1],!!actionData[2]);
                } else if (actionData[0]=='S'||actionData[0]=='Script') {
                    if (typeof actionData[1] == 'string') {
                        eval(actionData[1]);
                    } else {
                        let callFunction = QJ.MPMZ.getSaveFunction(actionData[1]);
                        if (callFunction) {
                            callFunction.call(this,target,bulletTarget,actionData);
                        }
                    }
                } else if (actionData[0]=='F'||actionData[0]=='Function') {
                    let argu = actionData[2]===undefined?[]:(Array.isArray(actionData[2])?actionData[2].slice():[actionData[2]]);
                    argu.push({
                        actionData:actionData,
                        target:target,
                        bulletTarget:bulletTarget,
                        ifPierce:ifPierce,
                        ifRebound:ifRebound
                    });
                    actionData[1].apply(this,argu);
                }
            } else if (target.constructor.name.toLowerCase().includes("event")) {
                if (actionData[0]=='EP'||actionData[0]=='EventPage') {
                    target.steupCEQJ(actionData[1],{
                        bulletId:this.index,
                        ifPierce:ifPierce,
                        ifRebound:ifRebound,
                        sendValue:actionData[2]||[]
                    },{});
                } else if (actionData[0]=='C'||actionData[0]=='CommonEvent') {
                    $gameMap.steupCEQJ(actionData[1],QJ.buildCharacter(target),{
                        bulletId:this.index,
                        ifPierce:ifPierce,
                        ifRebound:ifRebound,
                        targetId:QJ.buildCharacter(target),
                        sendValue:actionData[2]||[]
                    },{});
                } else if (actionData[0]=='SW'||actionData[0]=='Switch') {
                    $gameSwitches.setValue(actionData[1],!!actionData[2]);
                } else if (actionData[0]=='SS'||actionData[0]=='SelfSwitch') {
                    $gameSelfSwitches.setValue([$gameMap.mapId(),target.eventId(),actionData[1].toUpperCase()],!!actionData[2]);
                } else if (actionData[0]=='E'||actionData[0]=='Erase') {
                    $gameMap.eraseEvent(target.eventId());
                } else if (actionData[0]=='S'||actionData[0]=='Script') {
                    if (typeof actionData[1] == 'string') {
                        eval(actionData[1]);
                    } else {
                        let callFunction = QJ.MPMZ.getSaveFunction(actionData[1]);
                        if (callFunction) {
                            callFunction.call(this,target,bulletTarget,actionData);
                        }
                    }
                } else if (actionData[0]=='F'||actionData[0]=='Function') {
                    let argu = actionData[2]===undefined?[]:(Array.isArray(actionData[2])?actionData[2].slice():[actionData[2]]);
                    argu.push({
                        actionData:actionData,
                        target:target,
                        bulletTarget:bulletTarget,
                        ifPierce:ifPierce,
                        ifRebound:ifRebound
                    });
                    actionData[1].apply(this,argu);
                }
            }
        } else {
            if (actionData[0]=='C'||actionData[0]=='CommonEvent') {
                $gameMap.steupCEQJ(actionData[1],QJ.buildCharacter(target),{
                    bulletId:this.index,
                    ifPierce:ifPierce,
                    ifRebound:ifRebound,
                    targetId:bulletTarget?bulletTarget.index:0,
                    sendValue:actionData[2]||[]
                },{});
            } else if (actionData[0]=='SW'||actionData[0]=='Switch') {
                $gameSwitches.setValue(actionData[1],!!actionData[2]);
            } else if (actionData[0]=='S'||actionData[0]=='Script') {
                if (typeof actionData[1] == 'string') {
                        eval(actionData[1]);
                    } else {
                        let callFunction = QJ.MPMZ.getSaveFunction(actionData[1]);
                        if (callFunction) {
                            callFunction.call(this,target,bulletTarget,actionData);
                        }
                    }
            } else if (actionData[0]=='F'||actionData[0]=='Function') {
                let argu = actionData[2]===undefined?[]:(Array.isArray(actionData[2])?actionData[2].slice():[actionData[2]]);
                argu.push({
                    actionData:actionData,
                    target:target,
                    bulletTarget:bulletTarget,
                    ifPierce:ifPierce,
                    ifRebound:ifRebound
                });
                actionData[1].apply(this,argu);
            }
        }
    }
}
Game_QJBulletMZ.prototype.rangeDeal = function(data) {
    for (let i of data.r) {//范围碰撞体，existData碰撞体，弹幕碰撞体
        this.rangeAtk([this.x,this.y],i.t,i.a,i.cb||data.cb||this.QJBody||['C',1]);
    }
}
Game_QJBulletMZ.prototype.rangeAtk = function(position,target,action,collisionBox,lastAtkCharacter = {}) {
    let body,result = QJ.SAT.sat;
    if (collisionBox.constructor === Array) {
        body = QJ.SAT.boxX(position[0],position[1],collisionBox,this.scaleX||1,this.scaleY||1,this.anchorX||0.5,this.anchorY||0.5,this.rotationImg||0);
    } else {
        body = collisionBox;
        QJ.SAT.setPostion(body,position[0],position[1]);
    }
    let resultList = [];
    if (target[0]==='P') {
        //=============================================================
        QJ.SAT.judge(body,$gamePlayer._boxBodyQJ);
        if (result.result) {
            Game_QJBulletMZ.prototype.dealAction.call(this,action,$gamePlayer);
            resultList.push($gamePlayer);
        }
        //=============================================================
    } else if (target[0]==='G') {
        //=============================================================
        if (typeof target[1] !== 'object') target[1] = [target[1]];
        let haveAtkList = {},character;
        let getChar = QJ.getCharacter;
        let judge = QJ.SAT.judge;
        for (let i of target[1]) {
            if ($gameMap._groupListQJ[i]) {
                 for (let j of $gameMap._groupListQJ[i]) {
                    if (haveAtkList[j]||lastAtkCharacter[j]) continue;
                    haveAtkList[j] = true;
                    character = getChar(j);
                    if (character&&character._boxBodyQJ) {
                        judge(body,character._boxBodyQJ);
                        if (result.result) {
                            Game_QJBulletMZ.prototype.dealAction.call(this,action,character);
                            resultList.push(character);
                        }
                    }
                 }
            } 
        }
        //=============================================================
    } else if (target[0]==='B') {
        //=============================================================
        if (typeof target[1] !== 'object') target[1] = [target[1]];
        let haveAtkList = {},character;
        let judge = QJ.SAT.judge;
        let getBullet = $gameMap.bulletQJ.bind($gameMap);
        for (let i of target[1]) {
            if ($gameMap._mapBulletsNameQJ[i]) {
                 for (let j in $gameMap._mapBulletsNameQJ[i]) {
                    if (haveAtkList[j]||lastAtkCharacter[j]) continue;
                    haveAtkList[j] = true;
                    character = getBullet(j);
                    if (character!=this&&character&&(character.QJBody||character.QJBodies)) {
                        let bodyList = character.QJBodies?character.QJBodies:[character.QJBody];
                        for (let QJBody of bodyList) {
                            judge(body,QJBody);
                            if (result.result) {
                                Game_QJBulletMZ.prototype.dealAction.call(this,action,null,character);
                                resultList.push(character);
                            }
                        }
                    }
                 }
            }
        }
        //=============================================================
    }
    return resultList;
}
Game_QJBulletMZ.prototype.updateImgDeadAnim = function() {
    if (this.imgDeadAnimData) {
        let data = this.imgDeadAnimData[3];
        if (data.t>=this.imgDeadAnimData[1]) {
            return true;
        } else {
            data.t++;
            if (data.fadeFun) {this.opacity = data.fadeFun.get();}
            if (data.scaleXFun) {this.scaleX = data.scaleXFun.get();}
            if (data.scaleYFun) {this.scaleY = data.scaleYFun.get();}
            return data.t>=this.imgDeadAnimData[1];
        }
    } else return true;
}
Game_QJBulletMZ.prototype.updateSystemAnim = function() {
    return !this.isAnimationPlaying();
}
Game_QJBulletMZ.prototype.updateAfterImageDelay = function() {
    if (this.afterImageDelay) {
        this.afterImageDelay[1]++;
        return this.afterImageDelay[1]>this.afterImageDelay[0];
    } else return true;
}
Game_QJBulletMZ.prototype.updateTrailDelay = function() {
    if (this.data.trailEffect) {
        return this.data.trailEffect.every((d)=>((!d.ifProjctileWait)||(d.ifProjctileWait&&d.dataRemLength<=d.dataRemStart)));
    } else return true;
}
Game_QJBulletMZ.prototype.getJudgeBoxAABB = function(box) {
    let points = box.calcPoints;
    let math = Math;
    //endX和endY是【达不到】的上限，故后面的地图宽高不用减一。
    if (points) {
        let cx = (points[0].x+points[1].x+points[2].x+points[3].x)/4+box.pos.x;
        let cy = (points[0].y+points[1].y+points[2].y+points[3].y)/4+box.pos.y;
        return {
            startX:math.max(math.min(math.floor((cx-box.dia)/tileSize),$gameMap.width()-1),0),
            startY:math.max(math.min(math.floor((cy-box.dia)/tileSize),$gameMap.height()-1),0),
            endX:math.max(math.min(math.ceil((cx+box.dia)/tileSize),$gameMap.width()),0),
            endY:math.max(math.min(math.ceil((cy+box.dia)/tileSize),$gameMap.height()),0)
        };
    } else {
        return {
            startX:math.max(math.min(math.floor((box.pos.x-box.dia)/tileSize),$gameMap.width()-1),0),
            startY:math.max(math.min(math.floor((box.pos.y-box.dia)/tileSize),$gameMap.height()-1),0),
            endX:math.max(math.min(math.ceil((box.pos.x+box.dia)/tileSize),$gameMap.width()),0),
            endY:math.max(math.min(math.ceil((box.pos.y+box.dia)/tileSize),$gameMap.height()),0)
        };
    }
}
Game_QJBulletMZ.prototype.updateExistData = function(haveTile = true,haveRebound = true,haveTime = true,ifPierce = true,ifTarget = true) {
    //=============================================================
    let result = QJ.SAT.sat;
    let setPostion = QJ.SAT.setPostion;
    let judge = QJ.SAT.judge;
    //=============================================================
    let getTT = $gameMap.terrainTag.bind($gameMap);
    let getRI = $gameMap.regionId.bind($gameMap);
    let nP = $gameMap._noPassBoxQJ;
    let mapBox = $gameMap._gridBodyQJ;
    //=============================================================
    let judgeBody;
    let sendDataArray = [result,setPostion,judge,getTT,getRI,nP,mapBox,haveTile,haveRebound,haveTime,ifPierce,ifTarget];
    //=============================================================
    for (let k=1,kdata=this.data.existData,kl=kdata.length,detail;k<kl;k++) {
        detail = kdata[k];
        //==============================================
        if (this.isExistDataConditionNotMeet(detail)) continue;
        if (haveTile) {
            if (detail.t[0]=='NP') {
                judgeBody = this.getRealExistDataCollisionBox(detail);
                if (this.isBodyNice(judgeBody) && this.dealCollisionAll("dealNoPassCollision",detail,judgeBody,sendDataArray)) {
                    if (this.dead) return;
                }
            } else if (detail.t[0]=='R') {
                judgeBody = this.getRealExistDataCollisionBox(detail);
                if (typeof detail.t[1] != 'object') detail.t[1] = [detail.t[1]];
                if (this.isBodyNice(judgeBody) && this.dealCollisionAll("dealRegionCollision",detail,judgeBody,sendDataArray)) {
                    if (this.dead) return;
                }
            } else if (detail.t[0]=='T') {
                judgeBody = this.getRealExistDataCollisionBox(detail);
                if (typeof detail.t[1] != 'object') detail.t[1] = [detail.t[1]];
                if (this.isBodyNice(judgeBody) && this.dealCollisionAll("dealTerrainCollision",detail,judgeBody,sendDataArray)) {
                    if (this.dead) return;
                }
            }
        }
        if (haveTime) {
            if (detail.t[0]=='SW') {
                //=============================================================
                if ($gameSwitches.value(detail.t[1])==detail.t[2]) {
                    if (this.setDead(detail)) {
                        if (this.dead) return;
                    }
                } 
                //=============================================================
            } else if (detail.t[0]=='Time') {
                //=============================================================
                if (this.time>detail.t[1]) {
                    if (this.setDead(detail)) {
                        if (this.dead) return;
                    }
                } 
                //=============================================================
            } else if (detail.t[0]=='S') {
                let calculateResult = null;
                if (typeof detail.t[1] == 'string') {
                    calculateResult = eval(detail.t[1]);
                } else {
                    let callFunction = QJ.MPMZ.getSaveFunction(detail.t[1]);
                    if (callFunction) {
                        calculateResult = callFunction.call(this);
                    }
                }
                //=============================================================
                if (calculateResult==detail.t[2]) {
                    if (this.setDead(detail)) {
                        if (this.dead) return;
                    }
                } 
                //=============================================================
            }
        }
        if (ifTarget) {
            if (detail.t[0]=='P') {
                judgeBody  = this.getRealExistDataCollisionBox(detail);
                //=============================================================
                if (this.isBodyNice(judgeBody) && this.isBodyNice($gamePlayer._boxBodyQJ)) {
                    judge(judgeBody,$gamePlayer._boxBodyQJ);
                    if (haveRebound) {
                        if (result.result&&this.JudgeReBound(result,judgeBody,$gamePlayer._boxBodyQJ,detail,$gamePlayer,null)) {
                            if (this.setDead(detail,$gamePlayer,null)) {
                                if (this.dead) return;
                            }
                        }
                    } else {
                        if (result.result) {
                            if (this.setDead(detail,$gamePlayer,null)) {
                                if (this.dead) return;
                            }
                        }
                    }
                }
                //=============================================================
            } else if (detail.t[0]=='G') {
                judgeBody  = this.getRealExistDataCollisionBox(detail);
                //=============================================================
                if (this.isBodyNice(judgeBody)) {
                    if (typeof detail.t[1] != 'object') detail.t[1] = [detail.t[1]];
                    let haveAtkList = {},character;
                    let getChar = QJ.getCharacter;
                    let jumpOut = false;
                    for (let i of detail.t[1]) {
                        if ($gameMap._groupListQJ[i]) {
                            for (let j of $gameMap._groupListQJ[i]) {
                                if (haveAtkList[j]) continue;
                                haveAtkList[j] = true;
                                character = getChar(j);
                                if (character && character._boxBodyQJ && this.isBodyNice(character._boxBodyQJ)) {
                                    judge(judgeBody,character._boxBodyQJ);
                                    if (haveRebound) {
                                        if (result.result&&this.JudgeReBound(result,judgeBody,character._boxBodyQJ,detail,character,null)) {
                                            if (this.setDead(detail,character,null)) {
                                                if (this.dead) return;
                                                jumpOut = true;
                                                break;
                                            }
                                        }
                                    } else {
                                        if (result.result) {
                                            if (this.setDead(detail,character,null)) {
                                                if (this.dead) return;
                                                jumpOut = true;
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                            if (jumpOut) break;
                        }
                        if (jumpOut) break;
                    }
                }
                //=============================================================
            } else if (detail.t[0]=='B') {
                judgeBody  = this.getRealExistDataCollisionBox(detail);
                //=============================================================
                if (this.isBodyNice(judgeBody)) {
                    if (typeof detail.t[1] != 'object') detail.t[1] = [detail.t[1]];
                    let haveAtkList = {},character;
                    let getBullet = $gameMap.bulletQJ.bind($gameMap);
                    for (let i of detail.t[1]) {
                        if ($gameMap._mapBulletsNameQJ[i]) {
                             for (let j in $gameMap._mapBulletsNameQJ[i]) {
                                if (haveAtkList[j]) continue;
                                haveAtkList[j] = true;
                                character = getBullet(j);
                                if (character!=this&&character&&(character.QJBody||character.QJBodies)) {
                                    let bodyList = character.QJBodies?character.QJBodies:[character.QJBody];
                                    for (let QJBody of bodyList) {
                                        if (!this.isBodyNice(QJBody)) continue;
                                        judge(judgeBody,QJBody);
                                        if (haveRebound) {
                                            if (result.result&&this.JudgeReBound(result,judgeBody,QJBody,detail,null,character)) {
                                                if (this.setDead(detail,null,character)) return;
                                            }
                                        } else {
                                            if (result.result) {
                                                if (this.setDead(detail,null,character)) return;
                                            }
                                        }
                                    }
                                }
                             }
                        } 
                    }
                }
                //=============================================================
            }
        }
        if (detail.t[0]==='BE') {
            let bullet = $gameMap.bulletQJ(detail.t[1]);
            if (!bullet || bullet.dead) {
                if (this.setDead(detail,null,null)) {
                    if (this.dead) return;
                }
            }
        }
        if (detail.t[0]==='AE') {
            if (!this.selfAnimtationPlaying) {
                if (this.setDead(detail,null,null)) {
                    if (this.dead) return;
                }
            }
        }
        if (detail.t[0]==='F') {
            let argu = detail.t[2]===undefined?[]:(Array.isArray(detail.t[2])?detail.t[2].slice():[detail.t[2]]);
            if (detail.t[1].apply(this,argu) == (detail.t[3]===undefined?true:detail.t[3])) {
                if (this.setDead(detail,null,null)) {
                    if (this.dead) return;
                }
            }
        }
        //=====================================================================
        if (ifPierce) {
            this.dealPierceOutJS(detail);
        }
        //=====================================================================
    }
    //=====================================================================
};
Game_QJBulletMZ.prototype.isExistDataConditionNotMeet = function(detail) {
    if (detail.c) {
        if (detail.c[0]==='T'||detail.c[0]==='Time') {
            if (detail.c[1]>0||detail.c[2]>0||detail.c[2]===-2) {
                return true;
            }
        } else if (detail.c[0]==='SW'||detail.c[0]==='Switch') {
            if ($gameSwitches.value(detail.c[1])!==detail.c[2]) {
                return true;
            }
        } else if (detail.c[0]==='S'||detail.c[0]=='Script') {
            if (typeof detail.c[1] === 'string') {
                if (!eval(detail.c[1])) {
                    return true;
                }
            } else {
                let callFunction = QJ.MPMZ.getSaveFunction(detail.c[1]);
                if (!(callFunction&&!callFunction.call(this,detail))) {
                    return true;
                }
            }
        } else if (detail.c[0]==='F') {
            let argu = detail.c[2]===undefined?[]:(Array.isArray(detail.c[2])?detail.c[2].slice():[detail.c[2]]);
            if (detail.c[1].apply(this,argu) != (detail.c[3]===undefined?true:detail.c[3])) {
                return true;
            }
        }
    }
    return false;
};
Game_QJBulletMZ.prototype.updateExistDataConditionT = function() {
    this.data.existData.forEach((detail)=>{
        if (detail.c) {
            if (detail.c[0]==='T'||detail.c[0]==='Time') {
                if (detail.c[1]>0) {
                    detail.c[1]--;
                } else if (detail.c[2]>0) {
                    detail.c[2]--;
                } else if (detail.c[2]===0) {
                    detail.c[2] = detail.c[4]===-1?-2:detail.c[4];
                }
                if (detail.c[1]===0&&detail.c[2]===0&&detail.c[3]) {//重置穿透次数
                    detail.p[0] = detail.c[5];
                    detail.havePierceCharacters = {};
                    detail.pierceCharactersOutJS = {};
                }
            }
        }
    });
};
Game_QJBulletMZ.prototype.dealCollisionAll = function(type,detail,judgeBody,sendDataArray) {
    let {startX,startY,endX,endY} = this.getJudgeBoxAABB(judgeBody);
    for (let x=startX;x<endX;x++) {
        for (let y=startY;y<endY;y++) {
            if (this[type](x,y,detail,judgeBody,...sendDataArray)) {
                return true;
            }
        }
    }
    return false;
};
//haveRebound是说用不用判断反弹和死亡，用途只有一个就是为激光laser的碰撞进行判定。所以无haveRebound的那边不用谢this.setDead()什么的。
Game_QJBulletMZ.prototype.dealRegionCollision = function(x,y,detail,judgeBody,result,setPostion,judge,getTT,getRI,nP,mapBox,haveTile,haveRebound,haveTime,ifPierce,ifTarget) {
    if (detail.t[1].includes(getRI(x,y))) {
        setPostion(mapBox,x*tileSize+tileSize/2,y*tileSize+tileSize/2);
        judge(judgeBody,mapBox);
        if (haveRebound) {
            if (result.result&&this.JudgeReBound(result,judgeBody,mapBox,detail,null,null)) return true;
        } else {
            if (result.result) return true;
        }
    }
    return false;
};
Game_QJBulletMZ.prototype.dealTerrainCollision = function(x,y,detail,judgeBody,result,setPostion,judge,getTT,getRI,nP,mapBox,haveTile,haveRebound,haveTime,ifPierce,ifTarget) {
    if (detail.t[1].includes(getTT(x,y))) {
        setPostion(mapBox,x*tileSize+tileSize/2,y*tileSize+tileSize/2);
        judge(judgeBody,mapBox);
        if (haveRebound) {
            if (result.result&&this.JudgeReBound(result,judgeBody,mapBox,detail,null,null)) return true;
        } else {
            if (result.result) return true;
        }
    }
    return false;
};
Game_QJBulletMZ.prototype.dealNoPassCollision = function(x,y,detail,judgeBody,result,setPostion,judge,getTT,getRI,nP,mapBox,haveTile,haveRebound,haveTime,ifPierce,ifTarget) {
    if (!nP[x][y]) {
        setPostion(mapBox,x*tileSize+tileSize/2,y*tileSize+tileSize/2);
        judge(judgeBody,mapBox);
        if (haveRebound) {
            if (result.result&&this.JudgeReBound(result,judgeBody,mapBox,detail,null,null)) return true;
        } else {
            if (result.result) return true;
        }
    }
    return false;
};
Game_QJBulletMZ.prototype.getRealExistDataCollisionBox = function(detail) {
    if (!detail.cb) {
        return this.QJBody;
    } else {
        return this.refreshBox(detail.cb);
    }
};
Game_QJBulletMZ.prototype.dealExistDataCollisionBox = function(detail) {
    if (!detail.cb) {
        return this.QJBody;
    } else {
        return this.refreshBox(detail.cb);
    }
};
Game_QJBulletMZ.prototype.startAnimation = function() {
    this._animationPlaying = true;
};
Game_QJBulletMZ.prototype.isAnimationPlaying = function() {
    return this._animationPlaying;
};
Game_QJBulletMZ.prototype.endAnimation = function() {
    this._animationPlaying = false;
};
//=================================================
Game_QJBulletMZ.prototype.updateTimeline = function() {
    for (let data=this.data.timeline,i=0,il=data.length,detail,realValue;i<il;i++) {
        detail = data[i];
        //[0类型,1前置时间,2循环时间,3实际值,4循环次数,5记忆时间]
        if (detail[4]===-2) {
            continue;
        }
        if (detail[1]>0) {//前置时间解决
            detail[1]--;
            continue;
        }
        if (detail[4]>0) {
            detail[4]--;
        }
        if (detail[4]===0) {
            detail[4] = -2;
        }
        if (typeof detail[3] === "object" && !Array.isArray(detail[3])) {
            realValue = detail[3][detail[2]];
            if (realValue!==undefined) {
                this.dealTimeline(detail,realValue);
            }
        } else {
            if (detail[2]===0) {
                this.dealTimeline(detail,detail[3]);
            }
        }
        detail[2]++;
        if (detail[2]>=detail[5]) {
            detail[2] = 0;
        }
    }
};
Game_QJBulletMZ.prototype.dealTimeline = function(detail,value) {
    //console.log(detail,value);
    switch(detail[0]) {
    case 'R':{
        this.rotationMove += value;
        return;
    }
    case 'B':
    case 'S':
    case 'F':{
        this.addTimelineEffect(detail[0],value);
        return;
    }
    }
};
//=================================================
Game_QJBulletMZ.prototype.addTimelineEffect = function(type,value) {
    let data;
    switch(type) {
    case 'R':{
        this.rotationMove += value;
        return;//执行完就好了。
    }
    case 'B':{//[0目标值,1计时,2目标计时,3目标缩放]
        data = [1,0,Math.max(1,value[1]),value[0]];
        break;
    }
    case 'S':{//[0目标值x,1目标值y,2计时,3目标计时,4目标方位,5目标距离]
        let targetRotation = value[0];
        if (targetRotation===-1) targetRotation = Math.random()*Math.PI*2;
        else if (targetRotation===-2) targetRotation = this.rotationMove*Math.PI/180;
        else if (targetRotation===-3) targetRotation = this.rotationImg*Math.PI/180;
        else targetRotation = targetRotation*Math.PI/180;
        data = [0,0,0,Math.max(1,value[2]),targetRotation,value[1]];
        break;
    }
    case 'F':{//[0目标值,1计时,2目标计时,3目标不透明度]
        data = [1,0,Math.max(1,value[1]),value[0]];
        data = data;
        break;
    }
    }
    this.timelineEffectList[type].push(data);
};
Game_QJBulletMZ.prototype.updateTimelineEffect = function(type) {
    let list = this.timelineEffectList;
    if (list.B.length>0) {
        let newList = [];
        for (let data=list.B,i=0,il=data.length,dt;i<il;i++) {
            dt = data[i];
            dt[1]++;
            if (dt[1]===dt[2]*2) {
                continue;
            }
            dt[0] = dt[1]<dt[2]?(1+(dt[3]-1)*dt[1]/dt[2]):(dt[3]+(1-dt[3])*(dt[1]-dt[2])/dt[2]);
            newList.push(dt);
        }
        list.B = newList;
    }
    if (list.S.length>0) {
        let newList = [];
        for (let data=list.S,i=0,il=data.length,dt,realLen,ro,math=Math;i<il;i++) {
            dt = data[i];
            dt[2]++;
            if (dt[2]===dt[3]*2) {
                continue;
            }
            realLen = dt[2]<dt[3]?(1+(dt[5]-1)*dt[2]/dt[3]):(dt[5]+(1-dt[5])*(dt[2]-dt[3])/dt[3]);
            dt[0] = realLen*math.sin(dt[4]);
            dt[1] =-realLen*math.cos(dt[4]);
            newList.push(dt);
        }
        list.S = newList;
    }
    if (list.F.length>0) {
        let newList = [];
        for (let data=list.F,i=0,il=data.length,dt;i<il;i++) {
            dt = data[i];
            dt[1]++;
            if (dt[1]===dt[2]*2) {
                continue;
            }
            dt[0] = dt[1]<dt[2]?(1+(dt[3]-1)*dt[1]/dt[2]):(dt[3]+(1-dt[3])*(dt[1]-dt[2])/dt[2]);
            newList.push(dt);
        }
        list.F = newList;
    }
    let xyData = this.getTimelineEffect("S");
    this.timeLineX = xyData.x;
    this.timeLineY = xyData.y;
};
Game_QJBulletMZ.prototype.getTimelineEffect = function(type) {
    let list = this.timelineEffectList[type];
    if (!list) return 0;
    switch(type) {
    case 'B':{
        if (list.length<=0) return 1;
        return list.reduce((t,v)=>(t*v[0]),1);
    }
    case 'S':{
        if (list.length<=0) return {x:0,y:0};
        return list.reduce((t,v)=>{t.x += v[0];t.y += v[1];return t;},{x:0,y:0});
    }
    case 'F':{
        if (list.length<=0) return 1;
        return list.reduce((t,v)=>(t*v[0]),1);
    }
    }
    return 0;
};
Game_QJBulletMZ.prototype.getTimeLineX = function() {
    return this.timeLineX;
};
Game_QJBulletMZ.prototype.getTimeLineY = function() {
    return this.timeLineY;
};
//=============================================================================
Game_QJBulletMZ.prototype.changeAttribute = function(name,value) {
	
	if (!this || this.dead || !this.data) return;
	
    switch(name) {
    case "moveType":{
        this.data.moveType = value;
        break;
    }
    case "hue":{
        this.data.hue = value;
        let sprite = $gameMap.findBulletSpriteQJ(this);
        if (sprite) {
            if (isMV) {
                sprite.loadBitmap();
            } else {
                sprite.setHue(value);
            }
        }
        break;
    }
    case "light":{
        this.data.light = value;
        if (this.createLightingData) this.createLightingData();
        break;
    }
    case "img":{
        this.data.img = QJ.MPMZ.model[0].img(value);
        this.dynamicBitmap = undefined;//删除动态图像设置
        let sprite = $gameMap.findBulletSpriteQJ(this);
        if (sprite) sprite.loadBitmap();
        break;
    }
    case "imgRotation":{
        this.data.imgRotation = QJ.MPMZ.model[0].imgRotation(value);
        this.updateImgRotation();//防止闪烁
        let sprite = $gameMap.findBulletSpriteQJ(this);
        if (sprite) sprite.refreshRotationMPMZ();
        break;
    }
    case "afterImage":{
        this.data.afterImage = QJ.MPMZ.model[0].afterImage(value);
        break;
    }
    case "scale":
    case "opacity":
    case "anchor":{
        this.data[name] = QJ.MPMZ.model[0][name](value);
        this.updateFadeValue();
        break;
    }
    case "z":{
        $gameMap.reAddBulletToContainerForZQJ(this,value);
        break;
    }
    case "tone":{
        this.data.tone = QJ.MPMZ.model[0].tone(value);
        this.checkColorToneStatic();
        if (this.isColorToneDynamic) {
            this.updateColorTone();
        }
        let sprite = $gameMap.findBulletSpriteQJ(this);
        if (sprite) {
            sprite.isColorToneDynamic = this.isColorToneDynamic;
            if (sprite.isColorToneDynamic) {
                sprite.updateColorToneMPMZ();
            } else {
                sprite.setColorTone(this._colorTone);
            }
        }
        break;
    }
    default:{
        this.data[name] = value;
    }
}
};
Game_QJBulletMZ.prototype.addMoveData = function(name,value) {
    this.needAdvancedData = true;
    QJ.MPMZ.model[0].dealMoveSet(value);
    switch(name) {
    case "JS":{
        this.data.moveJS.push(value);
        break;
    }
    case "CE":{
        this.data.moveCE.push(value);
        break;
    }
    case "F":{
        this.data.moveF.push(value);
        break;
    }
    }
};
Game_QJBulletMZ.prototype.addExistData = function(value) {
    QJ.MPMZ.model[0].dealExistData(value,this.data.existData[0]);
    this.data.existData.push(value);
};
Game_QJBulletMZ.prototype.addTimeline = function(value) {
    value = QJ.MPMZ.model[0].dealTimeline(value);
    this.data.timeline.push(value);
};
Game_QJBulletMZ.prototype.isBodyNice = function(body) {
	if (!body) return false;
    return body.dia>0;
};
//=============================================================================Dynamic Bitmap
Game_QJBulletMZ.prototype.setDBStatus = function(isRunning = true) {
    //=======================
    this._dynamicBitmapRunning = isRunning;
    //=======================
};
Game_QJBulletMZ.prototype.setDBFrame = function(value = 0) {
    //=======================
    if (this.dynamicBitmap) {
        this.dynamicBitmap.c = 0;
        this.dynamicBitmap.n = value===-1?(this.dynamicBitmap.m-1):value;
    }
    //=======================
};
//=============================================================================
//
//=============================================================================
const spriteParentPointer = isMV ? Sprite_Base : Sprite;
Sprite_QJBulletMZ.blankBitmap = new Bitmap(2,2);
Sprite_QJBulletMZ.prototype = Object.create(spriteParentPointer.prototype);
Sprite_QJBulletMZ.prototype.constructor = Sprite_QJBulletMZ;
Sprite_QJBulletMZ.prototype.initialize = function(index) {
    spriteParentPointer.prototype.initialize.call(this);
    this.data=$gameMap.bulletQJ(index);
    this.z = this.data.data.z;
    this.anim = null;
    this.isColorToneDynamic = this.data.isColorToneDynamic;
    if (!this.isColorToneDynamic) {
        this.setColorTone(this.data._colorTone);
    }
    if (isMV) {
        //nothing
    } else {
        this.setHue(this.data.data.hue);
    }
    this.blendMode = this.data.data.blendMode;
    this.trailEffectList = this.data.data.trailEffect.length>0?[]:null;
    this.loadBitmap();
    this.updateBaseData();
};
Sprite_QJBulletMZ.prototype.setBitmap = function(bitmap) {
    if (!this || !this.data || this.data.deadOver) {
        return;
    }
    bitmap.smooth = false;//像素化放大
    this.bitmap = bitmap;
    let img = this.data.data.img;
    if (typeof img == "string"||img[0]=='P') {
        let name = typeof img == "string"?img:img[1];
        if (!this.data.dynamicBitmap) {
            this.data.buildDynamicBitmap(name,bitmap);
        }
        this.data.setDynamicBitmap(this);
    } else if (img[0]=='I') {
		if (Utils.isMobileDevice())  {
		  this.setFrame(img[1]%16*32,Math.floor(img[1]/16)*32, 32, 32);			
		} else {
		  this.setFrame(img[1]%16*64,Math.floor(img[1]/16)*64, 64, 64);
		}
    } else if (img[0]=='C') {
        this.setFrame(img[3],img[4],img[5],img[6]);
    } else if (img[0]=='T') {
        //nothing
    } else if (img[0]=='A') {
        //nothing
    }
    this.data.data.bitmapWidth = this.width;
    this.data.data.bitmapHeight = this.height;
};
Sprite_QJBulletMZ.prototype.loadBitmap = function() {
    this.imgUpdate = false;
    let img = this.data.data.img;
    if (img===''||!img) {
        return;
    }
    if (typeof img === "string"||img[0]==='P') {
        let name = typeof img == "string"?img:img[1];
        let bitmap = isMV?ImageManager.loadProjectileQJ(name, this.data.data.hue):ImageManager.loadProjectileQJ(name);
        if (bitmap&&bitmap.isReady()) {
            this.setBitmap(bitmap);
        } else {
            this.imgUpdate = true;
        }
    } else if (img[0]==='I') {
		let iconSetType = 'IconSet_large';
		if (Utils.isMobileDevice()) iconSetType = 'IconSet';
        let bitmap = ImageManager.loadSystem(iconSetType);
        this.setBitmap(bitmap);
    } else if (img[0]==='C') {
		// 加载行走图资源
		let bitmap;
		if (this.data.data.isActionSequence) {
		  bitmap = ImageManager.loadActionSeq(img[2]);	
		} else {
          bitmap = ImageManager.loadCharacter(img[2]);
		}
        if (bitmap&&bitmap.isReady()) {
            this.setBitmap(bitmap);
        } else {
            this.imgUpdate = true;
        }
    } else if (img[0]==='T') {
        this.drawBulletTextData(img[1]);
    } else if (img[0]==='A') {//['A',编号,次数]
        this.setBitmap(Sprite_QJBulletMZ.blankBitmap);
        this.createEffectData(img);
    } else if (img[0]==='pictures') {
		let bitmap = ImageManager.loadPicture(img[1]);
        this.setBitmap(bitmap);
    }
};
Sprite_QJBulletMZ.prototype.getDrawTextWindow = function() {
    if (!Sprite_QJBulletMZ._drawTextWindow) {
        Sprite_QJBulletMZ._drawTextWindow = new Window_ForImgText_MPMZ();
    }
    return Sprite_QJBulletMZ._drawTextWindow;
};
Sprite_QJBulletMZ.prototype.drawBulletTextData = function(imgData) {
    //========================================================================================
    //(text,arrangement,fontSize,fontFace,fontItalic,fontBold,outlineWidth = 0)
    let tempCal,win;
    if (imgData.advanced && [0,2].includes(imgData.arrangementMode)) {
        tempCal = {};
        win = this.getDrawTextWindow();
        win.contents.clear();
        win.resetFontSettings_MPMZ(imgData.textColor,imgData.fontSize,imgData.outlineColor,imgData.outlineWidth,imgData.fontFace,imgData.fontItalic,imgData.fontBold);
        tempCal.width = win.getTextWidthEx_MPMZ(imgData.text);
        win.resetFontSettings_MPMZ(imgData.textColor,imgData.fontSize,imgData.outlineColor,imgData.outlineWidth,imgData.fontFace,imgData.fontItalic,imgData.fontBold);
        tempCal.height = win.getTextHeightEx_MPMZ(imgData.text);
        if (imgData.update) {
            this.imgUpdate = true;
            if (this.bitmap) {//只在这个情况下清除
                this.bitmap.clear();
            }
        }
    } else {
        tempCal = Bitmap.measureTextSizeForBulletQJ(
            imgData.text,
            imgData.arrangementMode===2?0:imgData.arrangementMode,
            imgData.fontSize,
            imgData.fontFace,
            imgData.fontItalic,
            imgData.fontBold,
            imgData.outlineWidth
        );
    }
    //========================================================================================
    let realWidth = tempCal.width;
    let realHeight = tempCal.height;
    let bitmapWidth = imgData.width===-1?realWidth:imgData.width;
    let bitmapHeight = imgData.height===-1?realHeight:imgData.height;
    let bitmap = (imgData.update&&this.bitmap&&this.bitmap.width===bitmapWidth&&this.bitmap.height===bitmapHeight)?
        this.bitmap:new Bitmap(bitmapWidth,bitmapHeight);
    if (realWidth>bitmapWidth) realWidth = bitmapWidth;
    if (realHeight>bitmapHeight) realHeight = bitmapHeight;
    //[0'T',1text,2arrangement mode,3text color,4text size,[5stroke color,6stroke thickness,7font face]老方法
    //========================================================================================
    let drawX = 0;
    let drawY = 0;
    switch(imgData.textAlign) {
        //==================================================================
    case 1:drawX = 0;drawY = bitmapHeight - realHeight;break;
    case 2:drawX = (bitmapWidth - realWidth)/2;drawY = bitmapHeight - realHeight;break;
    case 3:drawX = bitmapWidth - realWidth;drawY = bitmapHeight - realHeight;break;
        //==================================================================
    case 4:drawX = 0;drawY = (bitmapHeight - realHeight)/2;break;
    case 5:drawX = (bitmapWidth - realWidth)/2;drawY = (bitmapHeight - realHeight)/2;break;
    case 6:drawX = bitmapWidth - realWidth;drawY = (bitmapHeight - realHeight)/2;break;
        //==================================================================
    case 7:drawX = 0;drawY = 0;break;
    case 8:drawX = (bitmapWidth - realWidth)/2;drawY = 0;break;
    case 9:drawX = bitmapWidth - realWidth;drawY = 0;break;
        //==================================================================
    }
    //========================================================================================
    if (imgData.backgroundColor) {
        bitmap.paintOpacity = imgData.backgroundOpacity*255;
        bitmap.fillAll(imgData.backgroundColor);
        bitmap.paintOpacity = 255;
    }
    //========================================================================================
    if (imgData.advanced && [0,2].includes(imgData.arrangementMode)) {
        //========================================================================================
        bitmap.blt(win.contents,0,0,realWidth,realHeight,drawX,drawY,realWidth,realHeight);
        //========================================================================================
    } else {
        //========================================================================================
        bitmap.textColor = typeof imgData.textColor === "object"?
            QJ.colorGrad(bitmap,imgData.textColor[0],drawX,drawY,realWidth,realHeight,imgData.textColor[1]*Math.PI/180):
            QJ.colorGrad(bitmap,imgData.textColor,drawX,drawY,realWidth,realHeight,0);
        //========================================================================================
        bitmap.fontSize = imgData.fontSize;
        //========================================================================================
        bitmap.outlineColor = typeof imgData.outlineColor === "object"?
            QJ.colorGrad(bitmap,imgData.outlineColor[0],drawX,drawY,realWidth,realHeight,imgData.outlineColor[1]*Math.PI/180):
            QJ.colorGrad(bitmap,imgData.outlineColor,drawX,drawY,realWidth,realHeight,0);
        //========================================================================================
        bitmap.outlineWidth = imgData.outlineWidth;
        //========================================================================================
        bitmap.fontFace = imgData.fontFace;
        //========================================================================================
        bitmap.fontItalic = imgData.fontItalic;
        //========================================================================================
        bitmap.fontBold = imgData.fontBold;
        //========================================================================================
        let ctx = bitmap.context;
        ctx.shadowBlur = imgData.shadowBlur;
        ctx.shadowColor = imgData.shadowColor;
        ctx.shadowOffsetX = imgData.shadowOffsetX;
        ctx.shadowOffsetY = imgData.shadowOffsetY;
        //========================================================================================
        if (imgData.arrangementMode===1) {
            bitmap.drawTextVerticalForBulletQJ(imgData.text,drawX,drawY,realWidth,realHeight,"center");
        } else {
            bitmap.drawText(imgData.text,drawX,drawY,realWidth,realHeight,"center");
        }
        //========================================================================================
    }
    //========================================================================================
    if (imgData.lineWidth>0) {
        let x,y,w,h;
        if (imgData.arrangementMode===0) {
            x = drawX;
            y = drawY+realHeight*imgData.lineRate-imgData.lineWidth/2;
            w = realWidth;
            h = imgData.lineWidth;
        } else {
            x = drawX+realWidth*imgData.lineRate-imgData.lineWidth/2;
            y = drawY;
            w = imgData.lineWidth;
            h = realHeight;
        }
        let lineColor = imgData.lineColor===null?bitmap.textColor:(typeof imgData.lineColor === "object"?
            QJ.colorGrad(bitmap,imgData.lineColor[0],x,y,w,h,imgData.lineColor[1]*Math.PI/180):
            QJ.colorGrad(bitmap,imgData.lineColor,x,y,w,h,0));
        bitmap.fillRect(x,y,w,h,lineColor);
    }
    //========================================================================================
    if (imgData.arrangementMode===2) {
        bitmap = Bitmap.rotateBitmapQJ_D90(bitmap);
    }
    //========================================================================================
    this.setBitmap(bitmap);
    //========================================================================================
};
Sprite_QJBulletMZ.prototype.createEffectData = function(img) {
    if (this.data.dead) return;
    let id = img[1];
    if (!img[2]) {
        this.data.selfAnimtationPlaying = false;
        return;
    }
    if (QJ.MPMZ.saveEffect && QJ.MPMZ.saveEffect[this.data.index]) {
        this.selfAnimationSprite = QJ.MPMZ.saveEffect[this.data.index];
        QJ.MPMZ.saveEffect[this.data.index] = null;
    } else {
        if (isMV) throw new Error("MV不支持图像为动画！"); 
        let animationData = $dataAnimations[id];
        if (animationData) {
            if (!!animationData.frames) throw new Error("不支持旧版MV的动画格式");
            let sprite = this.selfAnimationSprite = new Sprite_Animation_MPMZ();
            sprite.setup(null, animationData,false,0,null);
        }
    }
    if (this.selfAnimationSprite) {
        this.selfAnimationSprite._targets = [this];
    }
};
Sprite_QJBulletMZ.prototype.updateBaseData = function() {
    let data = this.data;
    this.x=data.screenXShowQJ()+data.getTimeLineX();
    this.y=data.screenYShowQJ()+data.getTimeLineY();
    this.refreshRotationMPMZ();
    this.scale.x = data.scaleX;
    this.scale.y = data.scaleY;
    this.alpha=data.opacity;
    this.anchor.x=data.anchorX;
    this.anchor.y=data.anchorY;
    data.refreshDynamicBitmap(this);
    if (this.isColorToneDynamic) {
        this.updateColorToneMPMZ();
    }
};
Sprite_QJBulletMZ.prototype.updateColorToneMPMZ = function() {
    if (this.remColorTone!==this.data._colorTone) {//至于tone变化判定，写在game里即可。
        this.remColorTone = this.data._colorTone;
        this.setColorTone(this.remColorTone);
    }
};
Sprite_QJBulletMZ.prototype.refreshRotationMPMZ = function() {
    this.rotation=this.data.rotationImg*Math.PI/180;
};
Sprite_QJBulletMZ.prototype.update = function() {
    //========================================
    if (this.data.deadOver) {
        this.destroy();
        return;
    }
    if (this.imgUpdate) {
        this.loadBitmap();
    }
    if (this.data.requestAnimationId>0) {
        let spriteset = SceneManager._scene._spriteset;
        if (this.anim) {
            if (this.anim.isPlaying && this.anim.isPlaying()) {
                if (isMV) {
                    this.anim.remove();
                } else {
                    spriteset.removeAnimation(this.anim);
                }
            }
            this.anim = null;
        }
        if (isMV) {
            this.startAnimation($dataAnimations[Number(this.data.requestAnimationId)], false, 0);
            this.anim = this._animationSprites[this._animationSprites.length-1];
        } else {
            this.anim = spriteset.startAnimationQJ(this.data,this,this.data.requestAnimationId);
        }
        this.data.requestAnimationId = 0;
    }
    if (isMV) {
        this.updateAnimationSprites();
        if (!this.isAnimationPlaying() && this.data.isAnimationPlaying()) {
            this.data.endAnimation();
        }
    }
    this.updateBaseData();
    this.updateEffectAnimation();
    if (this.trailEffectList!==null) {
        this.updateTrailEffect();
    }
    //========================================
};
Sprite_QJBulletMZ.prototype.updateEffectAnimation = function() {
    if (this.data.dead) return;
    if (this.selfAnimationSprite) {
        this.selfAnimationSprite.update();
        if (!this.selfAnimationSprite.isPlaying()) {
            let img = this.data.data.img;
            let isContinue = false;
            if (img[2]<0) {
                isContinue = true;
            } else if (img[2] === 0) {
                isContinue = false;
            } else {
                img[2]--;
                if (img[2] === 0) {
                    isContinue = false;
                } else {
                    isContinue = true;
                }
            }
            if (isContinue) {
                let animationData = this.selfAnimationSprite._animation;
                this.selfAnimationSprite.initMembers();
                this.selfAnimationSprite.setup(null, animationData,false,0,null);
                this.selfAnimationSprite._targets = [this];
            } else {
                this.data.selfAnimtationPlaying = false;
                this.selfAnimationSprite.destroyReal();
                this.selfAnimationSprite = null;
            }
        }
    }
};
Sprite_QJBulletMZ.prototype.destroy = function() {
    if (this._destroyed) return;
    spriteParentPointer.prototype.destroy.call(this);
    if (this.data.deadOver && this.selfAnimationSprite) {
        this.selfAnimationSprite.destroyReal();
        this.selfAnimationSprite = null;
    }
    if (this.trailEffectList!==null) {
        this.trailEffectList.forEach((a)=>{
            if (a) a.needDestroy = true;
        });
        this.trailEffectList = null;
    }
};
Sprite_QJBulletMZ.prototype.dealAfterAddChildAction = function() {
    if (this.selfAnimationSprite && this.parent && !this.data.dead) {
        this.parent.addChild(this.selfAnimationSprite);
    }
};
Sprite_QJBulletMZ.prototype.updateTrailEffect = function() {
    let list = this.trailEffectList;
    let effectList = this.data.data.trailEffect,img;
    for (let i=0,il=Math.max(list.length,effectList.length);i<il;i++) {
        if (effectList[i]) {
            if (list[i]===undefined) {
                img = effectList[i].img;
                if (typeof img === "object") {
                    if (Array.isArray(img)) {
                        let tag = img.join("_")+"_"+this.data.index;
                        if (lineTexture[tag]) {
                            list[i] = this.addTrailRopeSprite(lineTexture[tag],effectList[i]);
                        } else {
                            if (this.bitmap && this.bitmap.isReady()) {
                                QJ.createTextureLineForTrailEffect(this.bitmap,tag,lineTexture,img[1],img[2],img[3],img[4],
                                    img[5]||0,img[6]||0,img[7]||0,img[8]||0);
                                i--;//已缓存图片数据，重新加载
                            }
                        }
                    }
                } else {
                    if (particleTexture[img]) {
                        list[i] = this.addTrailRopeSprite(particleTexture[img],effectList[i]);
                    } else {
                        let bit = ImageManager.loadProjectileQJ(img);
                        if (bit.isReady()) {
                            QJ.createTexture(bit,img,particleTexture);
                            i--;//已缓存图片数据，重新加载
                        }
                    }
                }
            }
        } else {
            if (list[i]) {//注意，为了防止突然消失，这里不直接删除，Sprite_MPMZ_Rope自己进行相关判定。
                list[i] = null;
            }
        }
    }
};
Sprite_QJBulletMZ.prototype.addTrailRopeSprite = function(canvas,effectData) {
    if (!this.parent) {
        return undefined;
    }
    let sprite;
    if (typeof this.z === "number") {//加入tilemap
        this.parent.addChild(sprite = new Sprite_MPMZ_Rope(new PIXI.Texture(canvas),effectData,this.data.dataRem,this.z));
    } else {
        if (effectData.aboveProjectile) {
            this.parent.addChildAt(sprite = new Sprite_MPMZ_Rope(new PIXI.Texture(canvas),effectData,this.data.dataRem,this.z),
                this.parent.children.indexOf(this)+1);
        } else {
            this.parent.addChildAt(sprite = new Sprite_MPMZ_Rope(new PIXI.Texture(canvas),effectData,this.data.dataRem,this.z),
                this.parent.children.indexOf(this));
        }
    }
    return sprite;
};
//=============================================================================
//
//=============================================================================
Game_QJLaserMZ.prototype.initialize = function(data,index) {
    //==========================================
    this.data=data;
    this.index=index;
    this.bulletMode = 1;
    this.type = 1;
    //==========================================
    this.calculateData();
    //==========================================
};
Game_QJLaserMZ.prototype.calculateData = function() {
    //==========================================
    this.dead=false;
    this.time = 0;
    this.scaleX = 0;
    this.scaleY = 0;
    this.opacity = 0;
    this.rotation = 0;
    //==========================================
    this.QJBody = null;
    //==========================================
    this.rotationBase = 0;
    this.rotationAdd = 0;
    //==========================================
    this.needAdvancedData = this.data.moveJS.length>0||this.data.moveCE.length>0||this.data.moveF.length>0||
        this.data.deadJS.length>0||this.data.deadCE.length>0||this.data.deadF.length>0;
    //==========================================
    $gameMap.addMapBulletsNameQJ(this.index,this.data.groupName);
    //==========================================
    this.checkColorToneStatic();
    this.update(true);
    //==========================================
};
Game_QJLaserMZ.prototype.afterDeal = function() {

};
Game_QJLaserMZ.prototype.checkColorToneStatic = function() {
    let value = this.data.tone;
    this.isColorToneDynamic = typeof value[0] !== "number"||typeof value[1] !== "number"||typeof value[2] !== "number"||typeof value[3] !== "number";
    if (this.isColorToneDynamic) this._colorTone = [0,0,0,0];
    else this._colorTone = value.slice();
};
Game_QJLaserMZ.prototype.screenXQJ = function() {
    return this.x;
}
Game_QJLaserMZ.prototype.screenYQJ = function() {
    return this.y;
}
Game_QJLaserMZ.prototype.screenXShowQJ = function() {
    return this.x - $gameMap.displayX()*tileSize;
}
Game_QJLaserMZ.prototype.screenYShowQJ = function() {
    return this.y - $gameMap.displayY()*tileSize;
}
Game_QJLaserMZ.prototype.inheritX = function() {
    return this.x - $gameMap.displayX()*tileSize;
}
Game_QJLaserMZ.prototype.inheritY = function() {
    return this.y - $gameMap.displayY()*tileSize;
}
Game_QJLaserMZ.prototype.inheritRotation = function() {
    return this.rotation;
}
Game_QJLaserMZ.prototype.inheritImgRotation = function() {
    return this.rotation;
};
Game_QJLaserMZ.prototype.screenRotationShowQJ = function() {
    return this.rotation/180*Math.PI;
}
Game_QJLaserMZ.prototype.destroy = function() {
    this.deadOver = true;
    $gameMap.removeBulletQJ(this.index);
    $gameMap.deleteMapBulletsNameQJ(this.index,this.data.groupName);
    this.data = null;
};
Game_QJLaserMZ.prototype.updateFadeValue = function() {
    let data = this.data;
    this.opacity = data.opacity.get();
    this.scaleX = data.scaleX.get();
    if (this.isColorToneDynamic) {
        this.updateColorTone();
    }
};
Game_QJLaserMZ.prototype.updateColorTone = function() {
    //this._colorTone
    let data = this.data.tone;
    let currentData = this._colorTone;
    let r = data[0].get();
    let g = data[1].get();
    let b = data[2].get();
    let gray = data[3].get();
    if (currentData[0]!==r||currentData[1]!==g||currentData[2]!==b||currentData[3]!==gray) {
        this._colorTone = [r,g,b,gray];
    }
};
Game_QJLaserMZ.prototype.updateJSAndQT = function() {
    Game_QJBulletMZ.prototype.updateJSAndQT.apply(this);
};
Game_QJLaserMZ.prototype.update = function (ifInit) {
    //console.time("bulletUpdate");
	// 时停检测
	if(this.data.paused) return;		
    //=======================
    if (this.dead) {
        this.updaeXYR();
        this.updaeLength(ifInit);
        this.updateDead();
        return;
    }
    //=======================
    this.time++;
    if (!ifInit) this.updateExistDataConditionT();
    this.updateFadeValue();
    this.updaeXYR(ifInit);
    this.updaeLength(ifInit);
    this.updateExistData();
    if (this.dead) return;
    if (this.needAdvancedData) {
        this.updateJSAndQT();
        if (this.dead) return;
    }
    //=======================
    //console.timeEnd("bulletUpdate");
};
Game_QJLaserMZ.prototype.updateDead = function(ifWaitAnimation) {
    let deadDeal1 = this.updateImgDeadAnim();
    if (deadDeal1) this.destroy();
};
Game_QJLaserMZ.prototype.updateImgDeadAnim = function() {
    if (this.imgDeadAnimData) {
        let data = this.imgDeadAnimData[3];
        if (data.t>=this.imgDeadAnimData[1]) {
            return true;
        } else {
            data.t++;
            if (data.fadeFun) {this.opacity = data.fadeFun.get();}
            if (data.scaleXFun) {this.scaleX = data.scaleXFun.get();}
            if (data.scaleYFun) {this.scaleY = data.scaleYFun.get();}
            return data.t>=this.imgDeadAnimData[1];
        }
    } else return true;
};
Game_QJLaserMZ.prototype.updaeXYR = function(ifInit) {
    let data = this.data;
    let xyGet = QJ.MPMZ.model[1].posExtra;
    let dx = $gameMap.displayX(),dx48=dx*tileSize;
    let dy = $gameMap.displayY(),dy48=dy*tileSize;
    //==============================================
    if (ifInit||!data.positionStatic) {
        let newPosition,getWell = true;
        try{
            newPosition = xyGet(QJ.makeDeepCopy(data.position),data.eventId>0?QJ.getCharacter(data.eventId):null);
        } catch(e) {
            getWell = false;
        }
        if (getWell) {
            if (!isNaN(newPosition[0])) this.x = newPosition[0]+dx48;
            if (!isNaN(newPosition[1])) this.y = newPosition[1]+dy48;
        }
    }
    //==============================================
    if (ifInit||!data.rotationStatic) {
        let newRotation,getWell = true;
        try{
            newRotation = QJ.MPMZ.model[1].rotationExtra(QJ.makeDeepCopy(data.rotation),
                data.eventId>0?QJ.getCharacter(data.eventId):null,[this.x-dx48,this.y-dy48]);
        } catch(e) {
            getWell = false;
        }
        if (getWell) {
            this.rotationBase = newRotation;
        }
    }
    //==============================================
    this.claculateRotationAdd();
    this.rotation = this.rotationBase + this.rotationAdd;
    //==============================================
    if (data.positionSpread!==0) {
        this.x += data.positionSpread*Math.sin(this.rotation*Math.PI/180);
        this.y +=-data.positionSpread*Math.cos(this.rotation*Math.PI/180);
    }
    //==============================================
};
Game_QJLaserMZ.prototype.claculateRotationAdd = function() {
    if (this.data.rotationAdd===false) return;
    switch(this.data.rotationAdd[0]) {
        case 'F':this.rotationAdd  = this.data.rotationAdd[1].get();break;
        case 'R':this.rotationAdd += this.data.rotationAdd[1].get();break;
    }
};
Game_QJLaserMZ.prototype.updaeLength = function(ifInit) {
    let data = this.data;
    let xyGet = QJ.MPMZ.model[1].posExtra;
    let dx = $gameMap.displayX(),dx48=dx*tileSize;
    let dy = $gameMap.displayY(),dy48=dy*tileSize;
    //==============================================
    if (data.length[0]=='S') {
        let x = this.x,y = this.y,r = this.rotation%360*Math.PI/180,maxLength=0;
        if (data.length[1][0]==='L') {
            maxLength = this.dead?data.length[1][1].getOnly():data.length[1][1].get();
        } else if (data.length[1][0]==='S') {
            maxLength = Number(eval(data.length[1][1]));
        } else if (data.length[1][0]==='D') {
            let startPosition = xyGet([data.length[1][1],data.length[1][2]],data.eventId>0?QJ.getCharacter(data.eventId):null);
            let endPosition = xyGet([data.length[1][3],data.length[1][4]],data.eventId>0?QJ.getCharacter(data.eventId):null);
            maxLength = Math.sqrt((startPosition[0]-endPosition[0])*(startPosition[0]-endPosition[0])+(startPosition[1]-endPosition[1])*(startPosition[1]-endPosition[1]));
            if (data.length[1][5]) maxLength+=data.length[1][5];
            if (data.length[1][6]) maxLength*=data.length[1][6];
        }
        this.lineList = [];
        this.lineList.push([x-dx48,y-dy48,r]);
        for (let result1,result2,i=data.length[2];i>=0;i--) {
            result1 = this.getTarGrid(maxLength,data.length[3],r,x/tileSize,y/tileSize);
            if (result1) {
                result1 = [...this.getPixelPosition(result1[0],result1[1],dx,dy,x-dx48,y-dy48,r),result1[2]];
            }
            result2 = this.getTargetCollision(maxLength,data.length[3],r,x,y);
            if (result1&&result2) {
                if (result1[3]>result2[3]) {
                    this.lineList.push([result2[0]-dx48,result2[1]-dy48,result2[2]]);
                    x = result2[0];
                    y = result2[1];
                    r = result2[2];
                    maxLength -= result2[3];
                } else {
                    this.lineList.push([result1[0]-dx48,result1[1]-dy48,result1[2]]);
                    x = result1[0];
                    y = result1[1];
                    r = result1[2];
                    maxLength -= result1[3];
                }
            } else if (result1) {
                this.lineList.push([result1[0]-dx48,result1[1]-dy48,result1[2]]);
                x = result1[0];
                y = result1[1];
                r = result1[2];
                maxLength -= result1[3];
            } else if (result2) {
                this.lineList.push([result2[0]-dx48,result2[1]-dy48,result2[2]]);
                x = result2[0];
                y = result2[1];
                r = result2[2];
                maxLength -= result2[3];
            } else {
                this.lineList.push([Math.floor(x+maxLength*Math.sin(r))-dx48,Math.floor(y-maxLength*Math.cos(r))-dy48,this.lineList[this.lineList.length-1][2]]);
                maxLength = 0;
            }
            if (maxLength<=0) break;
        }
        //console.log(this.lineList);
    } else if (data.length[0]=='D') {
        let startPosition = xyGet([data.length[1],data.length[2]],data.eventId>0?QJ.getCharacter(data.eventId):null);
        let endPosition = xyGet([data.length[3],data.length[4]],data.eventId>0?QJ.getCharacter(data.eventId):null);
        let du = this.rotation*Math.PI/180;
        this.distanceLength = Math.sqrt((startPosition[0]-endPosition[0])*(startPosition[0]-endPosition[0])+
            (startPosition[1]-endPosition[1])*(startPosition[1]-endPosition[1]))+(data.length[5]||0);
        startPosition.push(du);
        endPosition.push(du);
        this.lineList = [[this.x-dx48,this.y-dy48,du],[this.x+Math.sin(du)*this.distanceLength-dx48,this.y-Math.cos(du)*this.distanceLength-dy48,du]];
    }
    //==============================================
};
Game_QJLaserMZ.prototype.getTargetCollision = function(il,condition,r,x,y) {
    let temp,character,resultList=[];
    let a = Math.sin(r);
    let b = -Math.cos(r);
    for (let detail of condition) {
        if (detail[0]==='G') {
            if (typeof detail[1] != 'object') detail[1] = [detail[1]];
            let getChar = QJ.getCharacter;
            for (let i of detail[1]) {
                if ($gameMap._groupListQJ[i]) {
                     for (let j of $gameMap._groupListQJ[i]) {
                        character = getChar(j);
                        if (character&&character._boxBodyQJ) {
                            temp = this.getLineBodyCollisionPoint(x,y,r,character._boxBodyQJ,a,b,il);
                            if (temp) {
                                resultList.push(temp);
                            }
                        }
                     }
                } 
            }
        } else if (detail[0]==='P') {
            character = QJ.getCharacter(-1);
            if (character&&character._boxBodyQJ) {
                temp = this.getLineBodyCollisionPoint(x,y,r,character._boxBodyQJ,a,b,il);
                if (temp) {
                    resultList.push(temp);
                }
            }
        } else if (detail[0]==='B') {
            //=============================================================
            if (typeof detail[1] !== 'object') detail[1] = [detail[1]];
            let getBullet = $gameMap.bulletQJ.bind($gameMap);
            for (let i of detail[1]) {
                if ($gameMap._mapBulletsNameQJ[i]) {
                     for (let j in $gameMap._mapBulletsNameQJ[i]) {
                        character = getBullet(j);
                        if (character!=this&&character&&(character.QJBody||character.QJBodies)) {
                            let bodyList = character.QJBodies?character.QJBodies:[character.QJBody];
                            for (let QJBody of bodyList) {
                                temp = this.getLineBodyCollisionPoint(x,y,r,QJBody,a,b,il);
                                if (temp) {
                                    resultList.push(temp);
                                }
                            }
                        }
                     }
                }
            }
            //=============================================================
        }
    }
    if (resultList.length===0) {
        return null;
    } else {
        if (resultList.length!==1) {
            resultList.sort((a,b)=>a[3]-b[3]);
        }
        temp = resultList[0];
        return [temp[0],temp[1],temp[2],Math.sqrt(temp[3])];
    }
};
Game_QJLaserMZ.prototype.getLineBodyCollisionPoint = function(x,y,r,body,a,b,il) {
    let il2 = il*il;
    if (body.type === 0) {
        let math = Math;
        let pi = math.PI;
        let yD = body.pos.y-y;
        let xD = body.pos.x-x;
        let n = math.sqrt(xD*xD+yD*yD)//点到圆心距离
        if (math.floor(n*10000)/10000<=body.r) {
            return null;
        }
        let rc = math.atan2(xD,-yD);//实际朝圆心的角度
        let rD = (rc-r)%(pi*2);//角度差
        if (rD<-pi) rD+=pi*2;
        if (rD> pi) rD-=pi*2;
        rD = math.abs(rD);
        if (rD>=pi/2) {
            return null;
        }
        let sin = math.sin(rD);
        let cos = math.cos(rD);
        if (math.abs(n*sin)>=body.r) {
            return null;
        }
        let m = math.abs(n*cos)-math.sqrt(body.r*body.r-n*n*sin*sin);//点到边距离
        let xr = x+m*math.sin(r);
        let yr = y-m*math.cos(r);
        if (m<=il) {
            return [xr,yr,2*math.atan2(xr-body.pos.x,body.pos.y-yr)-r+pi,m*m];
        } else {
            return null;
        }
    } else if (body.type === 1) {
        let points = body.calcPoints;
        let pos = body.pos;
        let judgeList = [[points[0],points[1]],[points[1],points[2]],[points[2],points[3]],[points[3],points[0]]];
        let i=0,x1,y1,x2,y2,A,B,C,D,xr,yr,len;
        let resultList = [];
        for (let point of judgeList) {
            x1 = point[0].x+pos.x-x;
            y1 = point[0].y+pos.y-y;
            x2 = point[1].x+pos.x-x;
            y2 = point[1].y+pos.y-y;
            if ((b*x1-a*y1)*(b*x2-a*y2)>0) {
                //点同向，不相交。
            } else {// 是判断是否与矩形相交的办法，对于原点在矩形上或者内的射线来说无效。
                A = y2-y1;
                B = x1-x2;
                C = x2*y1-x1*y2;
                D = A*a+B*b;
                if (C!==0&&C*D<0) {
                    xr = -a*C/D;
                    yr = -b*C/D;
                    len = (xr*xr+yr*yr);
                    if (len<il2) {//小于最大距离
                        //这里的A===0和B===0都只是为了保证精度而简化的结果。JS不适合复杂的数学运算。
                        resultList.push([(B===0?x1:xr)+x,(A===0?y1:yr)+y,2*Math.atan2(B,-A)-r,len]);
                    }
                }
            }
            i++;
        }
        //这里实际上还有一些问题：
        //射线与边平行时导致的3线4点
        //射线穿过点导致的混乱
        //多个点并排时导致的混乱
        if (resultList.length===0) {
            return null;
        } else if (resultList.length===2) {
            return resultList[0][3]>resultList[1][3]?resultList[1]:resultList[0];
        } else if (resultList.length===1) {
            return resultList[0];
        } else if (resultList.length===3) {//选取不重合的独立点
            if (resultList[0][0]===resultList[1][0]&&resultList[0][1]===resultList[1][1]) {
                return resultList[2];
            } else if (resultList[1][0]===resultList[2][0]&&resultList[1][1]===resultList[2][1]) {
                return resultList[0];
            } else {
                return resultList[1];
            }
        } else {
            if (QJ.MPMZ.showError) {
                throw new Error("点与敌人相交错误！");
            }
        }
    }
    return null;
};
Game_QJLaserMZ.prototype.getTarGrid = function(il,condition,r,ox,oy) {
    //==============================================
    if (condition.length==0) return null;
    let x,y,lastX=-1,lastY=-1;
    let w=Math.sin(r)/tileSize,h=-Math.cos(r)/tileSize,ifPixel=false;
    let jumpDistance = 16;
    //==============================================
    let getTT = $gameMap.terrainTag.bind($gameMap);
    let getRI = $gameMap.regionId.bind($gameMap);
    let nPL = $gameMap.noPassBoxLaserQJ.bind($gameMap);
    //==============================================
    for (let i=1;i<=il;i+=ifPixel?1:jumpDistance) {
        x=Math.floor(ox+i*w);
        y=Math.floor(oy+i*h);
        if (lastX==x&&lastY==y) {
            continue;
        } else {
            if (ifPixel||i<=jumpDistance) {
                ifPixel = false;
                lastX=x;
                lastY=y;
            } else {
                i-=jumpDistance-1;
                ifPixel = true;
                continue;
            }
        }
        if (this.getGridCollision(condition,x,y,getTT,getRI,nPL)) {
            return [x,y,i];
        }
    }
    return null;
    //==============================================
};
Game_QJLaserMZ.prototype.getGridCollision = function(detailList,resultX,resultY,getTT,getRI,nPL) {
    //==============================================
    for (let detail of detailList) {
        if (detail[0]=='T') {
            if (detail[1].includes(getTT(resultX,resultY))) return true; 
        } else if (detail[0]=='R') {
            if (detail[1].includes(getRI(resultX,resultY))) return true; 
        } else if (detail[0]=='NP') {
            if (!nPL(resultX,resultY)) return true; 
        }
    }
    return false;
    //==============================================
};
Game_QJLaserMZ.prototype.getPixelPosition = function(x,y,dx,dy,ox,oy,or) {
    x=(x-dx)*tileSize+tileSize/2;
    y=(y-dy)*tileSize+tileSize/2;
    let k=Math.tan(or-Math.PI/2);
    let b=oy-k*ox;
    let judgeLsit;
    let halfSize = tileSize/2;
    if (ox<=x+halfSize&&ox>=x-halfSize) {
        if (oy<y) judgeLsit=[8];
        else judgeLsit=[2];
    } else if (oy<=y+halfSize&&oy>=y-halfSize) {
        if (ox<x) judgeLsit=[4];
        else judgeLsit=[6];
    } else if (ox<x-halfSize&&oy<y-halfSize) {
        judgeLsit=[4,8];
    } else if (ox>x+halfSize&&oy<y-halfSize) {
        judgeLsit=[6,8];
    } else if (ox<x-halfSize&&oy>y+halfSize) {
        judgeLsit=[2,4];
    } else if (ox>x+halfSize&&oy>y+halfSize) {
        judgeLsit=[2,6];
    } else {
        return null;
    }
    let tx=-1,ty=-1,ro;
    for (let d=0;d<judgeLsit.length;d++) {
        if (judgeLsit[d]==2) {
            ty=y+halfSize;
            tx=(ty-b==0)?0:(ty-b)/k;
            ro=Math.PI-or;
            if (Math.abs(tx-x)<=halfSize) break;
        } else if (judgeLsit[d]==4) {
            tx=x-halfSize;
            ty=k*tx+b;
            ro=2*Math.PI-or;
            if (Math.abs(ty-y)<=halfSize) break;
        } else if (judgeLsit[d]==6) {
            tx=x+halfSize;
            ty=k*tx+b;
            ro=2*Math.PI-or;
            if (Math.abs(ty-y)<= halfSize) break;
        } else if (judgeLsit[d]==8) {
            ty=y-halfSize;
            tx=(ty-b==0)?0:(ty-b)/k;
            ro=Math.PI-or;
            if (Math.abs(tx-x)<=halfSize) break;
        }
    }
    return [Math.round(tx+dx*tileSize),Math.round(ty+dy*tileSize),ro];
};
Game_QJLaserMZ.prototype.setDead = function(data,target = null,bulletTarget = null) {
    //==============================================
    if (!data) {
        this.dead = true;
        this.dealPierceOutJSAll();
        this.destroy();
        return true;
    } else {
        if (!data.$) {//未初始化时强制初始化
            QJ.MPMZ.model[0].dealExistData(data);
        }
        //==============================================
        if (this.data.judgeMode[0] == 'T'&&(target||bulletTarget)) {
            let tempId = target?QJ.buildCharacter(target):QJ.buildProjectile(bulletTarget);
            if (data.havePierceCharacters[tempId]) {
                data.havePierceCharacters[tempId] = 2;
                return false;
            }
        }
        //==============================================
        if (data.d) {
            if (data.d[0]==0) {
                if (data.d.length==2) {
                    data.d.push(null);
                    data.d.push({t:0,
                        fadeFun:new DEFrameQJ(null,'0|'+this.opacity+'~'+data.d[1]+'/0',0)});
                }
            } else if (data.d[0]==1) {
                if (data.d.length==3) {
                    data.d.push({t:0,
                        fadeFun:new DEFrameQJ(null,'0|'+this.opacity+'~'+data.d[1]+'/0',0),
                        scaleXFun:new DEFrameQJ(null,'0|'+this.scaleX+'~'+data.d[1]+'/'+(this.scaleX*data.d[2]),0),
                        scaleYFun:new DEFrameQJ(null,'0|'+this.scaleY+'~'+data.d[1]+'/'+(this.scaleY*data.d[2]),0)});
                }
            }
            this.imgDeadAnimData = data.d;
        }
        if (data.a) {
            if (data.p[0]<=0||(data.p[0]>0&&data.p[2])) {
                this.dealAction(data.a,target,bulletTarget);
            }
        }
        //==============================================
    }
    //==============================================
    if (data.p[0]===0) {
        this.dead = true;
        this.dealPierceOutJSAll();
        return true;
    } else {
        if ((target||bulletTarget)&&(data.t[0]==='G'||data.t[0]==='P'||data.t[0]==='B')) {
            if (this.data.judgeMode[0] === 'T') {
                let index = target?QJ.buildCharacter(target):QJ.buildProjectile(bulletTarget);
                data.havePierceCharacters[index] = 2;
                if (data.p[3]) {
                    if (typeof data.p[3] === "string") {
                        let target = target || bulletTarget;//局域变量，方便判定。
                        eval(data.p[3]);
                    } else if (typeof data.p[3] === "function") {
                        data.p[3].call(this,target||bulletTarget||null);
                    }
                }
                if (data.p[4]) {
                    data.pierceCharactersOutJS[index] = data.p[4];
                }
            }
            data.p[0]--;
        }
        return false;
    }
    //==============================================
};
Game_QJLaserMZ.prototype.dealDeadJSAndQT = function() {
    Game_QJBulletMZ.prototype.dealDeadJSAndQT.apply(this,arguments);
};
Game_QJLaserMZ.prototype.dealPierceOutJSAll = function() {
    return Game_QJBulletMZ.prototype.dealPierceOutJSAll.apply(this,arguments);
};
Game_QJLaserMZ.prototype.dealPierceOutJS = function() {
    return Game_QJBulletMZ.prototype.dealPierceOutJS.apply(this,arguments);
};
Game_QJLaserMZ.prototype.dealAction = function(actionData,target = null,bulletTarget = null) {
    Game_QJBulletMZ.prototype.dealAction.apply(this,arguments);
}
Game_QJLaserMZ.prototype.updateExistData = function() {//haveTile = true,haveRebound = true,haveTime = true,ifPierce = true,ifTarget = true
    let data = this.data;
    let judgeWidth = data.judgeWidth.get()*this.scaleX;
    let dx48 = $gameMap.displayX()*tileSize;
    let dy48 = $gameMap.displayY()*tileSize;
    if (data.length[0]=='S') {
        this.QJBodies = [];
        for (let idata=this.lineList,il=idata.length-1,detail,detailNext,i=0,timefirst=true,body;i<il;i++) {
            detail = idata[i];
            detailNext = idata[i+1];
            let lll = Math.sqrt((detail[0]-detailNext[0])*(detail[0]-detailNext[0])+
                (detail[1]-detailNext[1])*(detail[1]-detailNext[1]));
            body = QJ.SAT.box((detail[0]+detailNext[0])/2+dx48,(detail[1]+detailNext[1])/2+dy48,['R',judgeWidth,lll]);
            body.setAngle(detail[2]);
            this.QJBodies.push(body);
        }
    } else if (data.length[0]=='D') {
        let r = this.rotation*Math.PI/180;
        let lll = this.distanceLength;
        this.QJBody = QJ.SAT.box((this.x+lll*Math.sin(r)/2),(this.y-lll*Math.cos(r)/2),['R',judgeWidth,lll]);
        this.QJBody.setAngle(r);
    }
    let existDataFun = Game_QJBulletMZ.prototype.updateExistData;
    if (data.judgeMode[0] === 'W') {
        //先处理时间有关的，然后再管敌人
        existDataFun.call(this,false,false,true,false,false);
        if (this.dead) return;
        if (data.judgeMode[2]==0) {
            data.judgeMode[2] = data.judgeMode[1];
        } else {
            data.judgeMode[2]--;
            return;
        }
        if (data.length[0]==='S') {
            for (let idata=this.lineList,il=idata.length-1,detail,detailNext,i=0;i<il;i++) {
                this.QJBody = this.QJBodies[i];
                existDataFun.call(this,false,false,false,i===il-1,true);
                if (this.dead) return;
            }
        } else if (data.length[0]==='D') {
            existDataFun.call(this,false,false,false,true,true);
        }
    } else if (data.judgeMode[0] === 'T') {
        if (data.length[0]==='S') {
            for (let idata=this.lineList,il=idata.length-1,detail,detailNext,i=0,timefirst=true;i<il;i++) {
                this.QJBody = this.QJBodies[i];
                existDataFun.call(this,false,false,timefirst,i===il-1,true);
                if (this.dead) return;
                timefirst = false;
            }
        } else if (data.length[0]==='D') {
            existDataFun.call(this,false,false,true,true,true);
        }
    }
};
Game_QJLaserMZ.prototype.isExistDataConditionNotMeet = function(detail) {
    return Game_QJBulletMZ.prototype.isExistDataConditionNotMeet.apply(this,arguments);
};
Game_QJLaserMZ.prototype.updateExistDataConditionT = function() {
    return Game_QJBulletMZ.prototype.updateExistDataConditionT.apply(this,arguments);
};
Game_QJLaserMZ.prototype.getRealExistDataCollisionBox = function(detail) {
    return Game_QJBulletMZ.prototype.getRealExistDataCollisionBox.apply(this,arguments);
};
Game_QJLaserMZ.prototype.dealExistDataCollisionBox = function(detail) {
    return Game_QJBulletMZ.prototype.dealExistDataCollisionBox.apply(this,arguments);
};
Game_QJLaserMZ.prototype.changeAttribute = function(name,value) {
    switch(name) {
    case "hue":{
        this.data.hue = value;
        let sprite = $gameMap.findBulletSpriteQJ(this);
        sprite.setHue(value);
        break;
    }
    case "light":{
        this.data.light = value;
        if (this.createLightingData) this.createLightingData();
        break;
    }
    default:{
        this.data[name] = value;
    }
}
};
Game_QJLaserMZ.prototype.addMoveData = function(name,value) {
    return Game_QJBulletMZ.prototype.addMoveData.apply(this,arguments);
};
Game_QJLaserMZ.prototype.addExistData = function(value) {
    return Game_QJBulletMZ.prototype.addExistData.apply(this,arguments);
};
Game_QJLaserMZ.prototype.isBodyNice = function(body) {
    return Game_QJBulletMZ.prototype.isBodyNice.call(this,body);
};
//=============================================================================
//
//=============================================================================
Sprite_QJLaserMZ.prototype = Object.create(spriteParentPointer.prototype);
Sprite_QJLaserMZ.prototype.constructor = Sprite_QJLaserMZ;
Sprite_QJLaserMZ.prototype.initialize = function(index) {
    spriteParentPointer.prototype.initialize.call(this);
    this.data=$gameMap.bulletQJ(index);
    this.z = this.data.data.z;
    this.loadBitmapWait = 2;
    this.bitmaps = [null,null];
    this.lineList = [];
    this.pointList = [];
    this.initForceRefreshFrame = true;
    this.loadBitmap();
    this.updateData();
};
Sprite_QJLaserMZ.prototype.setBitmap = function(type,bit) {
    let dyName = type===0?"dymaticBitmap1":"dymaticBitmap2";
    if (this.data[dyName] === undefined) {
        this.data[[dyName]] = null;
        let data=this.data.data[type===0?"img":"imgPoint"].match(/\[[^\]]*\]/i);
        if (data) {
            data = eval(data[0]);
            if (data.length==2) {
                this.data[dyName] = [0,Number(data[0])*1,0,Number(data[1]),Number(data[0]),bit.width/Number(data[0]),bit.height/1];
            } else if (data.length==3) {
                this.data[dyName] = [0,Number(data[0])*Number(data[1]),0,Number(data[2]),Number(data[0]),bit.width/Number(data[0]),bit.height/Number(data[1])];
            }
        }
    }
    this.loadBitmapWait--;
    this.initForceRefreshFrame = true;
}
Sprite_QJLaserMZ.prototype.loadBitmap = function() {
    this.imgUpdate = false;
    if (this.data.data.img) {
        let img = ImageManager.loadProjectileQJ(this.data.data.img);
        this.bitmaps[0] = img;
        if (img.isReady()) {
            this.setBitmap(0,img);
        } else {
            this.imgUpdate = true;
        }
    } else {
        this.loadBitmapWait--;
    }
    if (this.data.data.imgPoint) {
        let img = ImageManager.loadProjectileQJ(this.data.data.imgPoint);
        this.bitmaps[1] = img;
        if (img.isReady()) {
            this.setBitmap(1,img);
        } else {
            this.imgUpdate = true;
        }
    } else {
        this.loadBitmapWait--;
    }
};
Sprite_QJLaserMZ.prototype.refresDymaticBitmap = function(dB) {
    dB[2]++;
    if (dB[2]==dB[3]) {
        dB[2]=0;
        dB[0]++;
        if (dB[0]==dB[1]) dB[0]=0;
        return true;
    }
    return false;
}
Sprite_QJLaserMZ.prototype.update = function() {
    //========================================
    if (this.data.deadOver) {
        this.destroy();
        return;
    }
    if (this.imgUpdate) {
        this.loadBitmap();
    }
    this.updateData();
    //========================================
};
Sprite_QJLaserMZ.prototype.updateData = function() {
    //========================================
    if (this.loadBitmapWait>0) {
        return;
    }
    //========================================
    let refreshDB1=false,refreshDB2=false,drl,drp;
    if (this.data.dymaticBitmap1) {
        drl = this.data.dymaticBitmap1;
        refreshDB1 = this.refresDymaticBitmap(drl);
        if (this.initForceRefreshFrame) refreshDB1 = true;
    }
    if (this.data.dymaticBitmap2) {
        drp = this.data.dymaticBitmap2;
        refreshDB2 = this.refresDymaticBitmap(drp);
        if (this.initForceRefreshFrame) refreshDB2 = true;
    }
    this.initForceRefreshFrame = false;
    //========================================
    let ifTile = this.data.data.imgStretchMode=='T';
    let scaleX = this.data.scaleX;
    let alpha = this.data.opacity;
    let tone = this.data._colorTone;
    let lineData = this.data.lineList,il=lineData.length,sprite;
    //========================================
    if (this.data.data.length[0]=='S') {
        //========================================
        for (let i=0;i<il;i++) {
            //========================================
            if (this.bitmaps[0] && i<il-1) {
                sprite = this.lineList[i];
                if (!sprite) sprite = this.lineList[i] = this.createLineSprite(this.data.data,ifTile);
                this.updateLineSprite(sprite,lineData,i,refreshDB1,drl,scaleX,alpha,tone,ifTile);
            }
            //========================================
            if (this.bitmaps[1]) {
                sprite = this.pointList[i];
                if (!sprite) sprite = this.pointList[i] = this.createPointSprite(this.data.data);
                this.updatePointSprite(sprite,lineData,i,refreshDB2,drp,scaleX,alpha,tone,ifTile);
            }
            //========================================
        }
        //========================================
        for (let i=il-1,ill=this.lineList.length;i<ill;i++) {
            this.lineList[i].visible = false;
        }
        for (let i=il,ill=this.pointList.length;i<ill;i++) {
            this.pointList[i].visible = false;
        }
        //========================================
    } else if (this.data.data.length[0]=='D') {
        if (this.lineList.length===0&&this.pointList.length===0) {
            if (this.bitmaps[0]) {
                this.lineList.push(this.createLineSprite(this.data.data,ifTile))
            }
            if (this.bitmaps[1]) {
                this.pointList.push(this.createPointSprite(this.data.data))
                this.pointList.push(this.createPointSprite(this.data.data))
            }
        }
        if (this.lineList[0]) this.updateLineSprite(this.lineList[0],lineData,0,refreshDB1,drl,scaleX,alpha,tone,ifTile);
        if (this.pointList[0]) this.updatePointSprite(this.pointList[0],lineData,0,refreshDB2,drp,scaleX,alpha,tone,ifTile);
        if (this.pointList[1]) this.updatePointSprite(this.pointList[1],lineData,1,refreshDB2,drp,scaleX,alpha,tone,ifTile);
    }
    //========================================
};
Sprite_QJLaserMZ.prototype.createLineSprite = function(data,ifTile) {
    let sprite = new (ifTile?TilingSprite:Sprite)(this.bitmaps[0]);
    sprite.blendMode = data.blendMode;
    sprite.anchor.x=0.5;
    sprite.anchor.y=1;
    this.addChild(sprite);
    return sprite;
};
Sprite_QJLaserMZ.prototype.createPointSprite = function(data) {
    let sprite = new Sprite(this.bitmaps[1]);
    sprite.blendMode = data.blendMode;
    sprite.anchor.x=0.5;
    sprite.anchor.y=0.5;
    this.addChild(sprite);
    return sprite;
};
Sprite_QJLaserMZ.prototype.updateLineSprite = function(sprite,lineData,i,refreshDB,dr,scaleX,alpha,tone,ifTile) {
    sprite.visible = true;
    if (ifTile) {
        if (refreshDB) {
            sprite.setFrame((dr[0]%dr[4])*dr[5],Math.floor(dr[0]/dr[4])*dr[6],dr[5],dr[6]);
        }
        sprite.move(0, 0, this.bitmaps[0].width,Math.floor(Math.sqrt(
            (lineData[i][0]-lineData[i+1][0])*(lineData[i][0]-lineData[i+1][0])+
            (lineData[i][1]-lineData[i+1][1])*(lineData[i][1]-lineData[i+1][1]))));
    } else {
        if (refreshDB) {
            sprite.setFrame((dr[0]%dr[4])*dr[5],Math.floor(dr[0]/dr[4])*dr[6],dr[5],dr[6]);
        }
        if (dr) {
            sprite.scale.y = Math.sqrt(
                (lineData[i][0]-lineData[i+1][0])*(lineData[i][0]-lineData[i+1][0])+
                (lineData[i][1]-lineData[i+1][1])*(lineData[i][1]-lineData[i+1][1])
            )/dr[6];
        } else {
            sprite.scale.y = Math.sqrt(
                (lineData[i][0]-lineData[i+1][0])*(lineData[i][0]-lineData[i+1][0])+
                (lineData[i][1]-lineData[i+1][1])*(lineData[i][1]-lineData[i+1][1]))/this.bitmaps[0].height;
        }
        sprite.setColorTone(tone);
    }
    sprite.x = lineData[i][0];
    sprite.y = lineData[i][1];
    sprite.rotation = lineData[i][2];
    sprite.scale.x = scaleX;
    sprite.alpha = alpha;
};
Sprite_QJLaserMZ.prototype.updatePointSprite = function(sprite,lineData,i,refreshDB,dr,scaleX,alpha,tone,ifTile) {
    sprite.visible = true;
    sprite.x = lineData[i][0];
    sprite.y = lineData[i][1];
    if (refreshDB) sprite.setFrame(dr[0],dr[1],dr[2],dr[3]);
    sprite.scale.x = scaleX;
    sprite.scale.y = scaleX;
    sprite.alpha = alpha;
    sprite.rotation = lineData[i][2];
    sprite.setColorTone(tone);
};
//=============================================================================
//
//=============================================================================
let particleTexture = QJ.particleTexture = {};
//=============================================
Sprite_ProjectileContainerQJMZ.prototype = Object.create(Sprite.prototype);
Sprite_ProjectileContainerQJMZ.prototype.constructor = Sprite_ProjectileContainerQJMZ;
Sprite_ProjectileContainerQJMZ.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.setFrame(0, 0, Graphics.width, Graphics.height);
    this.particleContainers={};
    this.onlyEffectSprites = [];
}
Sprite_ProjectileContainerQJMZ.prototype.update = function() {
    if (this.bitmap) this.bitmap.clear();
    let pointer = null;
    this.children.forEach((child)=>{
        if (child.update) {
            child.update();
        }
        pointer = child.data;
        if (pointer) {
            if (!pointer.deadOver) {
                if (pointer.data.afterImage) {
                    this.drawAfterImage(child);
                }
                if (pointer.data.particles&&pointer.data.particles.length>0) {
                    this.updateParticle(child);
                }
            }
        }
    });
    if (this.onlyEffectSprites.length>0) {
        this.onlyEffectSprites.forEach((child)=>{
            pointer = child.data;
            if (pointer) {
                if (pointer.deadOver) {
                    this.removeOnlyEffectChild(child);
                } else {
                    if (pointer.data.afterImage) {
                        this.drawAfterImage(child);
                    }
                    if (pointer.data.particles&&pointer.data.particles.length>0) {
                        this.updateParticle(child);
                    }
                }
            }
        });
    }
};
Sprite_ProjectileContainerQJMZ.prototype.addOnlyEffectChild = function(child) {
    this.onlyEffectSprites.push(child);
};
Sprite_ProjectileContainerQJMZ.prototype.removeOnlyEffectChild = function(child) {
    let index = this.onlyEffectSprites.indexOf(child);
    if (index>=0) this.onlyEffectSprites.splice(index,1);
};
Sprite_ProjectileContainerQJMZ.prototype.drawAfterImage = function(child) {
    if (!this.bitmap) {
        this.bitmap = new Bitmap(Graphics.width+QJ.tileSize*2,Graphics.height+QJ.tileSize*2);
    }
    let data = child.data.data.afterImage;
    let remData = child.data.dataRem;
    let remDataLength = remData.length;
    let width;
    let ctx = this.bitmap._context;
    let posX = -$gameMap.displayX()*QJ.tileSize;
    let posY = -$gameMap.displayY()*QJ.tileSize;
    let fun = QJ.calculateAngleByTwoPoint;
    for (let i=0,iDelay=child.data.afterImageDelay?child.data.afterImageDelay[1]:0,
        il=data[2],detail,detailLast;i+iDelay<il;i++) {
        detail = remData[remDataLength-1-i];
        detailLast = remData[remDataLength-1-i-1];
        if (detail&&detailLast&&remData[i+iDelay]) {
            if (detail.x===detailLast.x&&detail.y===detailLast.y) iDelay++;
            ctx.save();
            ctx.translate(detail.x+posX,detail.y+posY);
            if (!detail.roAI) {
                detail.roAI = fun(detail.x,detail.y,detailLast.x,detailLast.y)+Math.PI;
            }
            ctx.rotate(detail.roAI);
            ctx.globalAlpha = data[1].getTar(i+iDelay)*child.alpha;
            width = data[3].getTar(i+iDelay);
            if (!detail.dis) {
                detail.dis = Math.sqrt((detail.x-detailLast.x)*(detail.x-detailLast.x)+(detail.y-detailLast.y)*(detail.y-detailLast.y));
            }
            if (data[0][0] === "C") {
                ctx.fillStyle = data[0][1].getTar(i+iDelay);
                ctx.fillRect(-width/2,0,width,detail.dis);
            } else if (data[0][0] === "P" && data[0][1].isReady()) {
                const image = data[0][1]._canvas || data[0][1]._image;
                ctx.globalCompositeOperation = "source-over";
                ctx.drawImage(image, 0, 0, image.width, image.height, -width/2, 0, width, detail.dis);
            }
            ctx.restore();
        } else {
            break;
        }
    }
};
Sprite_ProjectileContainerQJMZ.prototype.addChildrenAtId = function(name,sprite,blendMode = 0) {
    let tag = name + '_bm:' + blendMode;
    if (this.particleContainers[tag]) {
        this.particleContainers[tag].addChild(sprite);
    } else{
        let newContainer = new Sprite_ParticleContainerQJMZ(blendMode);
        this.addChildAt(newContainer,0);
        this.particleContainers[tag] = newContainer;
        newContainer.addChild(sprite);
    }
};
Sprite_ProjectileContainerQJMZ.prototype.updateParticle = function(child) {
    let particleData = child.data.data.particles;
    let dx48 = $gameMap.displayX()*tileSize;
    let dy48 = $gameMap.displayY()*tileSize;
    let math = Math;
    let sendData = [0,0,child.rotation,math.sin(child.rotation),math.cos(child.rotation),dx48,dy48,null,0,0,0,0,
        0,0,0];
    //[0x,1y,2ro,3sin,4cos,5dx,6dy,7img,8生成队列中的编号,9sheetSpriteSet,10anchorX,11anchorY,
    //  12ox,13oy,14or,15opacity,16scaleX,17scaleY]
    let particleSprite = Sprite_QJParticleMZ;
    for (let i of particleData) {
        if (i.count===0) {
            if (particleTexture[i.img]) {
                sendData[7] = particleTexture[i.img];
                sendData[9] = i.sheetSpriteSet;
                sendData[10]= i.anchorX;
                sendData[11]= i.anchorY;
                if (!sendData[7].frameDataMPMZ) {
                    this.calculateTextureFrameDataMPMZ(i.img,sendData[7]);
                }
                if (i.intervalTime>=0) {
                    i.count = i.intervalTime;
                    sendData[0] = child.x;
                    sendData[1] = child.y;
                    for (let k=0,kl=i.bundleNumber;k<kl;k++) {
                        sendData[8] = k;
                        this.calculateParticleData(i,math,sendData);
                        this.addChildrenAtId(i.img,new particleSprite(sendData),i.blendMode);
                    }
                } else {
                    let nowData = child.data.remDataGet(0);
                    let lastData = child.data.remDataGet(-1);
                    if (nowData&&lastData) {
                        let sx = lastData.x-dx48;
                        let sy = lastData.y-dy48;
                        let dx = nowData.x - lastData.x;
                        let dy = nowData.y - lastData.y;
                        let len = math.sqrt(dx*dx+dy*dy);
                        let lastLen = i.lastLen||0;
                        let lastX = math.floor(len*10000)===0?0:(lastLen*dx/len);
                        let lastY = math.floor(len*10000)===0?0:(lastLen*dy/len);
                        let stepNum = math.max(0,math.floor(-(len+lastLen)/i.intervalTime));
                        if (stepNum>0) {
                            dx = -i.intervalTime*dx/len;
                            dy = -i.intervalTime*dy/len;
                            let x = sx - lastX;
                            let y = sy - lastY;
                            for (let m=0;m<stepNum;m++) {
                                x+=dx;
                                y+=dy;
                                sendData[0] = x;
                                sendData[1] = y;
                                for (let k=0,kl=i.bundleNumber;k<kl;k++) {
                                    sendData[8] = k;
                                    this.calculateParticleData(i,math,sendData);
                                    this.addChildrenAtId(i.img,new particleSprite(sendData),i.blendMode);
                                }
                            }
                        }
                        //记录上次距离，防止intervalTime小于单次移动距离时不产生粒子。
                        i.lastLen = math.max(0,len+lastLen-math.floor(-stepNum*i.intervalTime));
                    }
                }
            } else {
                let bit = ImageManager.loadProjectileQJ(i.img);
                if (bit.isReady()) QJ.createTexture(bit,i.img,particleTexture);
            }
        } else {
            i.count--;
        }
    }
    sendData.length = 0;
    sendData = null;
};
Sprite_ProjectileContainerQJMZ.prototype.calculateParticleData = function(i,math,sendData) {
    sendData[12] = i.offset[0]+math.floor((math.random()*(i.offsetMax[0]-i.offsetMin[0])+i.offsetMin[0])*100)/100;
    sendData[13] = i.offset[1]+math.floor((math.random()*(i.offsetMax[1]-i.offsetMin[1])+i.offsetMin[1])*100)/100;
    sendData[14] = (i.offset[2]+math.floor((math.random()*(i.offsetMax[2]-i.offsetMin[2])+i.offsetMin[2])*100)/100)*math.PI/180;
    sendData[15] = math.floor((math.random()*(i.opacityMax-i.opacityMin)+i.opacityMin)*100)/100;
    sendData[16] = math.floor((math.random()*(i.scaleXMax-i.scaleXMin)+i.scaleXMin)*100)/100;
    sendData[17] = i.synScale?sendData[16]:(math.floor((math.random()*(i.scaleYMax-i.scaleYMin)+i.scaleYMin)*100)/100),
    sendData[18] = i.existTime;
    sendData[19] = i.disappearTime;
    sendData[20] = i.disappearScale;
    sendData[21] = i.moveType.slice();
};
Sprite_ProjectileContainerQJMZ.prototype.calculateTextureFrameDataMPMZ = function(name,texture) {
    let frameList = name.match(/\[([^\]]*)\]/i);
    let frameData = false;
    if (frameList && frameList[1]) {
        frameList = frameList[1].split(",").map((a)=>Number(a));
        if (frameList.length===1) {
            frameData = [1,texture.width,texture.height/frameList[0],frameList[0]];
        } else if (frameList.length===2) {
            frameData = [2,texture.width/frameList[0],texture.height,1,frameList[0],frameList[1]];
        } else if (frameList.length===3) {
            frameData = [2,texture.width/frameList[0],texture.height/frameList[1],frameList[1],frameList[0],frameList[2]];
        }
    }
    texture.frameDataMPMZ = frameData||[0,texture.width,texture.height];
};
//=============================================================================
//new Sprite_ParticleContainerQJMZ
//=============================================================================
const particleParentPointer = isMV ? PIXI.particles.ParticleContainer : PIXI.ParticleContainer;
Sprite_ParticleContainerQJMZ.prototype = Object.create(particleParentPointer.prototype);
Sprite_ParticleContainerQJMZ.prototype.constructor = Sprite_ParticleContainerQJMZ;
Sprite_ParticleContainerQJMZ.prototype.initialize = function(blendMode = 0) {
    particleParentPointer.call(this,163840,{//一batch是16384。
        rotation:true,
        scale:true,
        alpha:true,
        uvs:true
    });
    this.blendMode = blendMode;
};
Sprite_ParticleContainerQJMZ.prototype.destroy = function() {
    particleParentPointer.prototype.destroy.call(this,{
        children: true
    });
};
Sprite_ParticleContainerQJMZ.prototype.update = function() {
    let dx48 = $gameMap.displayX()*tileSize;
    let dy48 = $gameMap.displayY()*tileSize;
    for (let data=this.children,il=data.length,i=0,child;i<il;i++) {
        child = data[i];
        child.update(dx48,dy48);
        if (child!=data[i]) {
            i--;
            il--;
        }
    }
};
//=============================================================================
//
//=============================================================================
Sprite_QJParticleMZ.prototype = Object.create(PIXI.Sprite.prototype);
Sprite_QJParticleMZ.prototype.constructor = Sprite_QJParticleMZ;
Sprite_QJParticleMZ.prototype.initialize = function(sendData) {
    PIXI.Sprite.call(this,new PIXI.Texture(sendData[7],new PIXI.Rectangle(0,0,0,0)));
    this.anchor.set(sendData[10],sendData[11]);
    this.rotation = sendData[2]+sendData[14];
    this._x = sendData[0]+sendData[12]*sendData[4]-sendData[13]*sendData[3]+sendData[5];
    this._y = sendData[1]+sendData[13]*sendData[4]-sendData[12]*sendData[3]+sendData[6];
    this.roSin = Math.sin(this.rotation);
    this.roCos = Math.cos(this.rotation);
    this.existTime = sendData[18];
    this.disappearTime = sendData[19];
    this.disappearScale = sendData[20];
    this.moveType = sendData[21];
    this.time = this.existTime+this.disappearTime;
    this.scale = new PIXI.ObservablePoint(null,null,sendData[16],sendData[17]);
    this.alpha = sendData[15];
    this.fadeList = [this.disappearTime,this.alpha,0,this.scale.x,this.scale.x*this.disappearScale,this.scale.y,this.scale.y*this.disappearScale];
    this.setupFrameData(sendData,sendData[7].frameDataMPMZ);
    this.update();
};
Sprite_QJParticleMZ.prototype.setupFrameData = function(sendData,frameData) {
    //[0类型,1宽度,2高度,3横分(类型),4竖分(动画),5等待帧]
    switch(frameData[0]) {
    case 0:{
        this.dymaticBitmap = false;
        this.setFrame(0,0,frameData[1],frameData[2]);
        break;
    }
    case 1:{
        let verticalIndex = sendData[9]===-1?Math.randomInt(frameData[3]):(sendData[9]===-2?(sendData[8]%frameData[3]):sendData[9]);
        this.dymaticBitmap = false;
        this.setFrame(0,verticalIndex*frameData[2],frameData[1],frameData[2]);
        break;
    }
    case 2:{
        this.dymaticBitmap = [0,frameData[4],0,frameData[5]];
        this.setFrame(0,0,frameData[1],frameData[2]);
        break;
    }
    case 3:{
        let verticalIndex = sendData[9]===-1?Math.randomInt(frameData[3]):(sendData[9]===-2?(sendData[8]%frameData[3]):sendData[9]);
        this.dymaticBitmap = [0,frameData[4],0,frameData[5]];
        this.setFrame(0,verticalIndex*frameData[2],frameData[1],frameData[2]);
        break;
    }
    }
};
Sprite_QJParticleMZ.prototype.setFrame = function(x,y,w,h) {
    this._texture.frame = new PIXI.Rectangle(Math.floor(x),Math.floor(y),Math.floor(w),Math.floor(h));
};
Sprite_QJParticleMZ.prototype.update = function(dx48,dy48) {
    this.time--;
    if (this.time<=0) {
        this.destroy();
        return;
    } else if (this.time<=this.disappearTime) {
        let fadeData = this.fadeList;
        this.alpha = fadeData[2]+(fadeData[1]-fadeData[2])*this.time/fadeData[0];
        this.scale.x = fadeData[4]+(fadeData[3]-fadeData[4])*this.time/fadeData[0];
        this.scale.y = fadeData[6]+(fadeData[5]-fadeData[6])*this.time/fadeData[0];
    }
    let t = this.existTime+this.disappearTime-this.time;
    let xL = this.moveType[0].getFun().call(this,t,this.moveType);
    let yL = this.moveType[1].getFun().call(this,t,this.moveType);
    this.x = this._x+xL*this.roSin+yL*this.roCos-dx48;
    this.y = this._y-xL*this.roCos+yL*this.roSin-dy48;
    if (this.dymaticBitmap) {
        let dB = this.dymaticBitmap;
        dB[2]++;
        if (dB[2]===dB[3]) {
            dB[2]=0;
            dB[0]++;
            if (dB[0]===dB[1]) {
                dB[0]=0;
            }
            let oldFrame = this._texture.frame;
            this.setFrame(dB[0]*oldFrame.width,oldFrame.y,oldFrame.width,oldFrame.height);
        }
    }
};
//=============================================================================
//
//=============================================================================
if (isMV) {
    //nothing
} else {
    Sprite_Animation_MPMZ.prototype = Object.create(Sprite_Animation.prototype);
    Sprite_Animation_MPMZ.prototype.constructor = Sprite_Animation_MPMZ;
    Sprite_Animation_MPMZ.prototype.initialize = function() {
        Sprite_Animation.prototype.initialize.call(this);
    };
    Sprite_Animation_MPMZ.prototype.setup = function(targets, animation, mirror, delay, previous) {
        this._targets = targets;
        this._animation = animation;
        this._mirror = mirror;
        this._delay = delay;
        this._previous = previous;
        this._effect = EffectManager.loadMPMZ(animation.effectName);
        this._playing = true;
        const timings = animation.soundTimings.concat(animation.flashTimings);
        for (const timing of timings) {
            if (timing.frame > this._maxTimingFrames) {
                this._maxTimingFrames = timing.frame;
            }
        }
    };
    Sprite_Animation_MPMZ.prototype.targetPosition = function(renderer) {
        if (this._animation.displayType === 2) {
            const pos = new Point();
            pos.x = renderer.view.width / 2;
            pos.y = renderer.view.height / 2;
            return pos;
        } else {
            return this.targetSpritePosition(this._targets[0]);
        }
    };
    Sprite_Animation_MPMZ.prototype.updateEffectGeometry = function() {
        const target = this._targets[0];
        const scale = this._animation.scale / 100;
        const r = Math.PI / 180;
        const rx = this._animation.rotation.x * r;
        const ry = this._animation.rotation.y * r;
        const rz = this._animation.rotation.z * r - target.rotation;
        if (this._handle) {
            this._handle.setLocation(0, 0, 0);
            this._handle.setRotation(rx, ry, rz);
            this._handle.setScale(scale*target.scale.x, scale*target.scale.y, scale);
            this._handle.setSpeed(this._animation.speed / 100);
        }
    };
    Sprite_Animation_MPMZ.prototype.destroy = function() {
        if (!QJ.MPMZ.saveEffect) QJ.MPMZ.saveEffect = [];
        QJ.MPMZ.saveEffect[this._targets[0].data.index] = this;
        this._targets[0].selfAnimationSprite = null;
        this._targets = null;
    };
    Sprite_Animation_MPMZ.prototype.destroyReal = function() {
        Sprite_Animation.prototype.destroy.apply(this,arguments);
    };
    Sprite_Animation_MPMZ.prototype.update = function() {
        Sprite.prototype.update.call(this);
        if (this._delay > 0) {
            this._delay--;
        } else if (this._playing) {
            if (!this._started && this.canStart()) {
                if (this._effect) {
                    if (this._effect.isLoaded) {
                        this._handle = Graphics.effekseerMPMZ.play(this._effect);
                        this._started = true;
                    } else {
                        EffectManager.checkErrors();
                    }
                } else {
                    this._started = true;
                }
            }
            if (this._started) {
                this.updateEffectGeometry();
                this.updateMain();
                this.updateFlash();
            }
        }
    };
    Sprite_Animation_MPMZ.prototype._render = function(renderer) {
        if (this._targets.length > 0 && this._handle && this._handle.exists) {
            this.onBeforeRender(renderer);
            this.setProjectionMatrix(renderer);
            this.setCameraMatrix(renderer);
            this.setViewport(renderer);
            Graphics.effekseerMPMZ.beginDraw();
            Graphics.effekseerMPMZ.drawHandle(this._handle);
            Graphics.effekseerMPMZ.endDraw();
            this.resetViewport(renderer);
            this.onAfterRender(renderer);
        }
    };
    Sprite_Animation_MPMZ.prototype.setProjectionMatrix = function(renderer) {
        const x = this._mirror ? -1 : 1;
        const y = -1;
        const p = -(this._viewportSize / renderer.view.height);
        // prettier-ignore
        Graphics.effekseerMPMZ.setProjectionMatrix([
            x, 0, 0, 0,
            0, y, 0, 0,
            0, 0, 1, p,
            0, 0, 0, 1,
        ]);
    };
    Sprite_Animation_MPMZ.prototype.setCameraMatrix = function(/*renderer*/) {
        // prettier-ignore
        Graphics.effekseerMPMZ.setCameraMatrix([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, -10, 1
        ]);
    };
}
//=============================================================================
//
//=============================================================================
if (isMV) {
    //nothing
} else {
    $.Graphics__createEffekseerContext = Graphics._createEffekseerContext;
    Graphics._createEffekseerContext = function() {
        $.Graphics__createEffekseerContext.apply(this,arguments);
        if (this._app && window.effekseer) {
            try {
                this._effekseerForMPMZ = effekseer.createContext();
                if (this._effekseerForMPMZ) {
                    this._effekseerForMPMZ.init(this._app.renderer.gl);
                    this._effekseerForMPMZ.setRestorationOfStatesFlag(false);
                }
            } catch (e) {
                this._app = null;
            }
        }
    };
    Object.defineProperty(Graphics, "effekseerMPMZ", {
        get: function() {
            return this._effekseerForMPMZ;
        },
        configurable: true
    });
    EffectManager._cacheMPMZ = {};
    EffectManager.loadMPMZ = function(filename) {
        if (filename) {
            const url = this.makeUrl(filename);
            const cache = this._cacheMPMZ;
            if (!cache[url] && Graphics.effekseerMPMZ) {
                this.startLoadingMPMZ(url);
            }
            return cache[url];
        } else {
            return null;
        }
    };
    EffectManager.startLoadingMPMZ = function(url) {
        const onLoad = () => this.onLoad(url);
        const onError = (message, url) => this.onError(url);
        const effect = Graphics.effekseerMPMZ.loadEffect(url, 1, onLoad, onError);
        this._cacheMPMZ[url] = effect;
        return effect;
    };
    EffectManager.clearMPMZ = function() {
        for (const url in this._cacheMPMZ) {
            const effect = this._cacheMPMZ[url];
            Graphics.effekseerMPMZ.releaseEffect(effect);
        }
        this._cacheMPMZ = {};
    };
    $.SceneManager_updateEffekseer = SceneManager.updateEffekseer;
    SceneManager.updateEffekseer = function() {
        $.SceneManager_updateEffekseer.apply(this,arguments);
        if (Graphics.effekseerMPMZ && this.isGameActive()) {
            if (SceneManager._scene && SceneManager._scene.constructor.name === "Scene_Map") {
                Graphics.effekseerMPMZ.update();
            }
        }
    };
    $.SceneManager_onUnload = SceneManager.onUnload;
    SceneManager.onUnload = function() {
        $.SceneManager_onUnload.apply(this,arguments);
        EffectManager.clearMPMZ();
    };
    $.Scene_Map_onTransfer = Scene_Map.prototype.onTransfer;
    Scene_Map.prototype.onTransfer = function() {
        $.Scene_Map_onTransfer.apply(this,arguments);
        EffectManager.clearMPMZ();
    };
}
//=============================================================================
//
//=============================================================================
if (isMV) {
//=============================================================================
//
//=============================================================================
Sprite_MPMZ_Rope.prototype = Object.create(PIXI.mesh.Mesh.prototype);
Sprite_MPMZ_Rope.prototype.constructor = Sprite_MPMZ_Rope;
Sprite_MPMZ_Rope.prototype.initialize = function(texture, effectData, dataRem, z) {
    let batchSize = 256;//无需太大
    let textureHeight = effectData.hOrV?texture.height:texture.width;
    let geo = this.addGeometry(textureHeight, batchSize, effectData);//加装默认数据
    PIXI.mesh.Mesh.call(this,texture,geo.vertices,geo.uvs,geo.indices,PIXI.mesh.Mesh.DRAW_MODES.TRIANGLE);
    this.batchSize = batchSize;
    this.effectData = effectData;
    this.dataRem = dataRem;
    this.textureHeight = textureHeight;
    this.geometryBatchList = [geo];
    if (!effectData.hasInit) {//这里放的是需要储存的数据。需要保证这些数据能使Sprite_MPMZ_Rope在重创建时复原。
        effectData.hasInit = true;
        effectData.dataRemStart = 0;//this.dataRem中已经处理完的下标。从这里之前的位置的数据已经处理过不再进行处理。
        effectData.disappearPreTime = effectData.existTime+effectData.disappearTime;
        effectData.dataRemLength = dataRem.length;
    }
    this.pluginName = 'MPMZRope';
    this.z = (typeof z === "number")?(effectData.aboveProjectile?(z+0.001):(z-0.001)):z;//保证加入tilemap时拖尾在图片上/下。
    this.update();
};
Sprite_MPMZ_Rope.prototype.destroy = function() {
    if (this._destroyed) return;
    PIXI.mesh.Mesh.prototype.destroy.apply(this,arguments);
    this.effectData = null;
    this.dataRem = null;
};
Sprite_MPMZ_Rope.prototype._renderCanvas = function() {
    //nothing
    //就不进行兼容了。
};
Sprite_MPMZ_Rope.prototype._renderWebGL = function(renderer) {
    if (this.needDestroy && this.dataRem.length<=this.effectData.dataRemStart) {
        return;
    }
    this.blendMode = this.effectData.blendMode;
    //this.roundPixels = this.effectData.roundPixels;mv无效，所以加上也无用。
    this.tint = this.effectData.tint;
    let gl = renderer.gl;
    let shader = Sprite_MPMZ_Rope.getProgramMPMZ(this.effectData.imgStretchMode,this.effectData.hOrV,gl);
    let realRenderer = renderer.plugins[this.pluginName];
    //千万要将这一句拿出来，否则缓存区将异常，导致缓存溢出和显示错误。
    renderer.setObjectRenderer(realRenderer);
    //一包batchSize，可自动根据数量延长缓存区。
    for (let dataList=this.geometryBatchList,i=0,il=dataList.length,data;i<il;i++) {
        data = dataList[i];
        if (data.realBatchSize<=0) break;
        //传入实际数据
        //=======================================================
        if (!data.glData) {
            let glData = data.glData = {
                shader:shader,
                indexBuffer: PIXI.glCore.GLBuffer.createIndexBuffer(gl, data.indices, gl.STATIC_DRAW),
                vertexBuffer: PIXI.glCore.GLBuffer.createVertexBuffer(gl, data.vertices, gl.STREAM_DRAW),
                uvBuffer: PIXI.glCore.GLBuffer.createVertexBuffer(gl, data.uvs, gl.STREAM_DRAW),
                lineAlphaBuffer: PIXI.glCore.GLBuffer.createVertexBuffer(gl, data.lineAlpha, gl.STREAM_DRAW),
                partIndexBuffer: PIXI.glCore.GLBuffer.createVertexBuffer(gl, data.partIndex, gl.STREAM_DRAW),
                indexDirty: true,//除了indices外其他的都每帧更新，故而只标记indices即可。
                vao:null
            };
            glData.vao = new PIXI.glCore.VertexArrayObject(gl).
                addAttribute(glData.vertexBuffer, glData.shader.attributes.aVertexPosition, gl.FLOAT, false, 2 * 4, 0).
                addAttribute(glData.uvBuffer, glData.shader.attributes.aTextureCoord, gl.FLOAT, false, 2 * 4, 0).
                addIndex(glData.indexBuffer).
                addAttribute(glData.lineAlphaBuffer, glData.shader.attributes.lineAlpha, gl.FLOAT, false, 2 * 2, 0).
                addAttribute(glData.partIndexBuffer, glData.shader.attributes.partIndex, gl.FLOAT, false, 2 * 2, 0);
        }
        //=======================================================
        realRenderer.render(this,data);
        //=======================================================
    }
};
Sprite_MPMZ_Rope.prototype.update = function() {//写在这里，保证运算的帧率。故而记得不能写在_render中。
    if (this.effectData.lastDisappearTime>0) {
        this.effectData.lastDisappearTime--;
    }
    let dataRem = this.dataRem;
    let totalLength = dataRem.length;
    let effectData = this.effectData;
    let geometryList = this.geometryBatchList;
    effectData.dataRemLength = totalLength;
    //第一步，步进开始节点。
    if (effectData.disappearPreTime>0) {
        effectData.disappearPreTime--;
    } else {
        effectData.dataRemStart++;
        //保证核心节点（每帧只加一次）时才停止。
        while(totalLength>effectData.dataRemStart && dataRem[effectData.dataRemStart].ic===false) effectData.dataRemStart++;
    }
    if (totalLength<=effectData.dataRemStart) {//未开始或暂时结束
        if (this.needDestroy) {
            this.destroy();
        }
        return;
    }
    //第二步，将数据载入刷新，每帧将数据起始点传入数据解析器，得到解析器解析到的终点，直到终点是现在的终点。
    let currentIndex = effectData.dataRemStart,batchIndex = 0;
    while(currentIndex<totalLength) {
        if (!geometryList[batchIndex]) {
            geometryList.push(this.addGeometry(this.textureHeight, this.batchSize, effectData));
        }
        currentIndex = this.updateGeometry.call(geometryList[batchIndex],dataRem,currentIndex,effectData);
        batchIndex++;
    }
    while(geometryList[batchIndex]!==undefined) {
        geometryList[batchIndex].realBatchSize = 0;
        batchIndex++;
    }
    this.multiplyUvs();
    //console.log(totalLength-effectData.dataRemStart,totalLength,effectData.dataRemStart,geometryList.length);
};
Sprite_MPMZ_Rope.prototype.addGeometry = function(width = 200, batchSize, effectData) {
    let geometryData = {
        vertices:new Float32Array(batchSize * 4),//2
        uvs:new Float32Array(batchSize * 4),//2
        indices:new Uint16Array(batchSize * 6),//2
        lineAlpha:new Float32Array(batchSize * 2),//1
        partIndex:new Float32Array(batchSize * 2),//1
        _width:width,
        batchSize:batchSize,
        realBatchSize:0,
        glData:null//渲染时创建，记得销毁
    };    
    let indexCount = 0;
    let indices = geometryData.indices;
    let uvs = geometryData.uvs;
    let hOrV = effectData.hOrV;
    let imgStretchMode = effectData.imgStretchMode;
    for (let i = 0, index, dx, dy, distance; i < batchSize; i++) {
        index = i * 4;
        if (hOrV) {
            if (imgStretchMode===1) {
                uvs[index + 1] = 0;
                uvs[index + 3] = 1;
            } else {
                uvs[index + 1] = 0;
                uvs[index + 3] = 1;
            }
        } else {
            if (imgStretchMode===1) {
                uvs[index + 0] = 1;
                uvs[index + 2] = 0;
            } else {
                uvs[index + 0] = 1;
                uvs[index + 2] = 0;
            }
        }
    }
    //绘制index
    for (let i = 0,index; i < batchSize; i++) {
        index = i * 2;
        indices[indexCount++] = index;
        indices[indexCount++] = index + 1;
        indices[indexCount++] = index + 2;
        indices[indexCount++] = index + 2;
        indices[indexCount++] = index + 1;
        indices[indexCount++] = index + 3;
    }
    return geometryData;
};
Sprite_MPMZ_Rope.prototype.updateGeometry = function(dataRem,currentIndex,effectData) {
    let dataRemStart = effectData.dataRemStart;
    let alphaRate = effectData.disappearTime/(effectData.existTime+effectData.disappearTime);
    let maxLength = dataRem.length;
    let batchSize = this.batchSize;
    let hOrV = effectData.hOrV;
    let imgStretchMode = effectData.imgStretchMode;
    let math = Math;
    let point;
    let index;
    let angle;
    let amount;
    let angleToRadius = math.PI/180;
    let vertices = this.vertices;
    let uvs = this.uvs;
    let lineAlpha = this.lineAlpha;
    let partIndex = this.partIndex;
    let dx48 = $gameMap.displayX()*tileSize;
    let dy48 = $gameMap.displayY()*tileSize;
    let width = this._width;
    let i = 0;
    let sinLength;
    let cosLength;
    let tempAlpha;
    let alpha = effectData.alpha;
    //x,y,r,ir,sx,sy,ax,ay
    while(i < batchSize && currentIndex < maxLength) {
        //====================================================================
        point = dataRem[currentIndex];
        index = i*4;
        //====================================================================
        if (hOrV) {
            //====================================================================
            angle = point.ir*angleToRadius;
            sinLength = width*math.sin(angle)*point.sy;
            cosLength =-width*math.cos(angle)*point.sy;
            vertices[index + 0] = point.x-dx48+sinLength*(point.ay);
            vertices[index + 1] = point.y-dy48+cosLength*(point.ay);
            vertices[index + 2] = point.x-dx48;
            vertices[index + 3] = point.y-dy48;
            //====================================================================
            if (imgStretchMode===1) {
                uvs[index + 0] = uvs[index + 2] = currentIndex%2;
            } else {
                amount = (currentIndex-dataRemStart) / (maxLength-dataRemStart-1);
                uvs[index + 0] = uvs[index + 2] = 1-amount;
            }
            //====================================================================
        } else {
            //====================================================================
            angle = point.r*angleToRadius;
            sinLength = width*math.sin(angle+math.PI/2)*point.sx;
            cosLength =-width*math.cos(angle+math.PI/2)*point.sx;
            vertices[index + 0] = point.x-dx48-sinLength*(point.ax);
            vertices[index + 1] = point.y-dy48-cosLength*(point.ax);
            vertices[index + 2] = point.x-dx48-sinLength*(point.ax-1);
            vertices[index + 3] = point.y-dy48-cosLength*(point.ax-1);
            //====================================================================
            if (imgStretchMode===1) {
                uvs[index + 1] = uvs[index + 3] = currentIndex%2;
            } else {
                amount = (currentIndex-dataRemStart) / (maxLength-dataRemStart-1);
                uvs[index + 1] = uvs[index + 3] = 1-amount;
            }
            //====================================================================
        }
        //====================================================================
        tempAlpha = (currentIndex-dataRemStart) / (maxLength-dataRemStart-1);
        lineAlpha[i*2 + 0] = lineAlpha[i*2 + 1] = (tempAlpha<alphaRate?(tempAlpha/alphaRate):1)*alpha;
        //====================================================================
        partIndex[i*2 + 0] = partIndex[i*2 + 1] = currentIndex;
        //====================================================================
        currentIndex++;
        i++;
        //====================================================================
    }
    if (currentIndex < maxLength) {
        if (i<=1) {
            this.realBatchSize = 0;
            return currentIndex-1;
        } else {
            this.realBatchSize = i*6;//此处实际值是indexBuffer
            return currentIndex-1;//还有batch时需要有起始节点
        }
    } else {
        if (i<=1) {
            this.realBatchSize = 0;
            return currentIndex;
        } else {
            this.realBatchSize = (i-1)*6;
            return currentIndex;//再无batch时不需起始节点。
        }
    }
};
Sprite_MPMZ_Rope.prototype.updateTransform = function() {
    this.containerUpdateTransform();
};
//Program缓存
Sprite_MPMZ_Rope.getProgramMPMZ = function(imgStretchMode,hOrV,gl) {
    let index = 0;
    if (imgStretchMode===1) {
        if (hOrV) {
            index = 1;
        } else {
            index = 2;
        }
    } else {
        index = 0;
    }
    if (!Sprite_MPMZ_Rope.programListMPMZ) {
        Sprite_MPMZ_Rope.programListMPMZ = [];
    }
    if (!Sprite_MPMZ_Rope.programListMPMZ[index]) {
        Sprite_MPMZ_Rope.programListMPMZ[index] = Sprite_MPMZ_Rope.generateProgramMPMZ(imgStretchMode,hOrV,gl);
    } else if (Sprite_MPMZ_Rope.programListMPMZ[index].gl!==gl) {
        Sprite_MPMZ_Rope.programListMPMZ[index].destroy();
        Sprite_MPMZ_Rope.programListMPMZ[index] = Sprite_MPMZ_Rope.generateProgramMPMZ(imgStretchMode,hOrV,gl);
    }
    return Sprite_MPMZ_Rope.programListMPMZ[index];
};
Sprite_MPMZ_Rope.generateProgramMPMZ = function(imgStretchMode,hOrV,gl) {
    let vertex = `
        attribute vec2 aVertexPosition;
        attribute vec2 aTextureCoord;
        attribute float lineAlpha;
        attribute float partIndex;
        uniform mat3 projectionMatrix;
        uniform mat3 translationMatrix;
        uniform mat3 uTextureMatrix;
        varying vec2 vTextureCoord;
        varying float aLineAlpha;
        varying float aPartIndex;
        void main(void){
            gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
            vTextureCoord = (uTextureMatrix * vec3(aTextureCoord, 1.0)).xy;
            aLineAlpha = lineAlpha;
            aPartIndex = partIndex;
        }
    `;
    let fragment = imgStretchMode===0?`
        uniform vec4 uColor;
        uniform sampler2D uSampler;
        varying vec2 vTextureCoord;
        varying float aLineAlpha;
        varying float aPartIndex;
        void main(void) {
            gl_FragColor = texture2D(uSampler, vTextureCoord) * uColor * aLineAlpha;
        }
    `:`
        uniform vec4 uColor;
        uniform sampler2D uSampler;
        varying vec2 vTextureCoord;
        varying float aLineAlpha;
        varying float aPartIndex;
        void main(void) {
            if (mod(aPartIndex,2.0)>1.0) {
                gl_FragColor = texture2D(uSampler, `+
                    (hOrV?"vec2(1.0-vTextureCoord.x,vTextureCoord.y)":"vec2(vTextureCoord.x,1.0-vTextureCoord.y)")+
                `) * uColor * aLineAlpha;
            } else {
                gl_FragColor = texture2D(uSampler, vTextureCoord) * uColor * aLineAlpha;
            }
        }
    `;
    return new PIXI.Shader(gl, vertex, fragment);
};
//=============================================================================
//
//=============================================================================
Sprite_MPMZ_Rope_Renderer.prototype = Object.create(PIXI.ObjectRenderer.prototype);
Sprite_MPMZ_Rope_Renderer.prototype.constructor = Sprite_MPMZ_Rope_Renderer;
Sprite_MPMZ_Rope_Renderer.prototype.initialize = function(renderer) {
    PIXI.ObjectRenderer.call(this,renderer);
};
Sprite_MPMZ_Rope_Renderer.prototype.onContextChange = function() {
    //nothing
    //shader每次渲染时赋予渲染器
};
Sprite_MPMZ_Rope_Renderer.prototype.render = function(mesh,geometryData) {
    //===========================================================================
    var renderer = this.renderer;
    var gl = renderer.gl;
    var texture = mesh._texture;
    if (!texture.valid) return;
    //===========================================================================
    var glData = geometryData.glData;
    if (!glData.vao) return;
    //===========================================================================
    renderer.bindVao(glData.vao);
    //===========================================================================
    glData.vertexBuffer.upload(geometryData.vertices);
    glData.uvBuffer.upload(geometryData.uvs);
    if (glData.indexDirty) {
        glData.indexDirty = false;
        glData.indexBuffer.upload(geometryData.indices);
    }
    glData.lineAlphaBuffer.upload(geometryData.lineAlpha);
    glData.partIndexBuffer.upload(geometryData.partIndex);
    //===========================================================================
    this.shader = glData.shader;
    renderer.bindShader(glData.shader);
    glData.shader.uniforms.uSampler = renderer.bindTexture(texture);
    //===========================================================================
    renderer.state.setBlendMode(PIXI.utils.correctBlendMode(mesh.blendMode, texture.baseTexture.premultipliedAlpha));
    //===========================================================================
    if (glData.shader.uniforms.uTextureMatrix) {
        if (mesh.uploadUvTransform) {
            glData.shader.uniforms.uTextureMatrix = mesh._uvTransform.mapCoord.toArray(true);
        } else {
            glData.shader.uniforms.uTextureMatrix = PIXI.Matrix.IDENTITY.toArray(true);
        }
    }
    //===========================================================================
    glData.shader.uniforms.translationMatrix = mesh.worldTransform.toArray(true);
    glData.shader.uniforms.uColor = PIXI.utils.premultiplyRgba(mesh.tintRgb, mesh.worldAlpha, glData.shader.uniforms.uColor, texture.baseTexture.premultipliedAlpha);
    //===========================================================================
    var drawMode = mesh.drawMode === PIXI.DRAW_MODES.TRIANGLE_MESH ? gl.TRIANGLE_STRIP : gl.TRIANGLES;
    glData.vao.draw(drawMode, geometryData.realBatchSize, 0);
    //===========================================================================
};
PIXI.WebGLRenderer.registerPlugin('MPMZRope', Sprite_MPMZ_Rope_Renderer);
//=============================================================================
//
//=============================================================================
} else {
//=============================================================================
//
//=============================================================================
Sprite_MPMZ_Rope.prototype = Object.create(PIXI.Mesh.prototype);
Sprite_MPMZ_Rope.prototype.constructor = Sprite_MPMZ_Rope;
Sprite_MPMZ_Rope.prototype.initialize = function(texture, effectData, dataRem, z) {
    //effectData:设定的拖尾数据   dataRem:弹幕的位置记录
    //注意，这两个量这里只记录地址。
    //Geometry_MPMZ_Rope是专门写的，但在rmmv中不需要
    let batchSize = 256;//无需太大
    let textureHeight = effectData.hOrV?texture.height:texture.width;
    let ropeGeometry = new Geometry_MPMZ_Rope(textureHeight, batchSize, effectData);//必须先初始化一个
    PIXI.Mesh.call(this,ropeGeometry, new PIXI.MeshMaterial(texture,{program:Sprite_MPMZ_Rope.getProgramMPMZ(effectData.imgStretchMode,effectData.hOrV)}));
    this.batchSize = batchSize;
    this.effectData = effectData;
    this.dataRem = dataRem;
    this.z = (typeof z === "number")?(effectData.aboveProjectile?(z+0.001):(z-0.001)):z;//保证加入tilemap时拖尾在图片上/下。
    this.textureHeight = textureHeight;
    this.geometryBatchList = [ropeGeometry];
    if (!effectData.hasInit) {//这里放的是需要储存的数据。需要保证这些数据能使Sprite_MPMZ_Rope在重创建时复原。
        effectData.hasInit = true;
        effectData.dataRemStart = 0;//this.dataRem中已经处理完的下标。从这里之前的位置的数据已经处理过不再进行处理。
        effectData.disappearPreTime = effectData.existTime+effectData.disappearTime;
        effectData.dataRemLength = dataRem.length;
    }
    this.update();
};
Sprite_MPMZ_Rope.prototype._render = function(renderer) {
    if (this.needDestroy && this.dataRem.length<=this.effectData.dataRemStart) {
        return;
    }
    this.blendMode = this.effectData.blendMode;
    this.roundPixels = this.effectData.roundPixels;
    this.tint = this.effectData.tint;
    //一包batchSize，可自动根据数量延长缓存区。
    for (let dataList=this.geometryBatchList,i=0,il=dataList.length,data;i<il;i++) {
        data = dataList[i];
        if (data.realBatchSize<=0) break;
        this.geometry = data;
        this.size = data.realBatchSize;
        PIXI.Mesh.prototype._render.call(this,renderer);
    }
}
Sprite_MPMZ_Rope.prototype.update = function() {//写在这里，保证运算的帧率。故而记得不能写在_render中。
    if (this.effectData.lastDisappearTime>0) {
        this.effectData.lastDisappearTime--;
    }
    let dataRem = this.dataRem;
    let totalLength = dataRem.length;
    let effectData = this.effectData;
    let geometryList = this.geometryBatchList;
    effectData.dataRemLength = totalLength;
    //第一步，步进开始节点。
    if (effectData.disappearPreTime>0) {
        effectData.disappearPreTime--;
    } else {
        effectData.dataRemStart++;
        //保证核心节点（每帧只加一次）时才停止。
        while(totalLength>effectData.dataRemStart && dataRem[effectData.dataRemStart].ic===false) effectData.dataRemStart++;
    }
    if (totalLength<=effectData.dataRemStart) {//未开始或暂时结束
        if (this.needDestroy) {
            this.destroy();
        }
        return;
    }
    //第二步，将数据载入刷新，每帧将数据起始点传入数据解析器，得到解析器解析到的终点，直到终点是现在的终点。
    let currentIndex = effectData.dataRemStart,batchIndex = 0;
    while(currentIndex<totalLength) {
        if (!geometryList[batchIndex]) {
            geometryList.push(new Geometry_MPMZ_Rope(this.textureHeight, this.batchSize, effectData));
        }
        currentIndex = geometryList[batchIndex].update(dataRem,currentIndex,effectData);
        batchIndex++;
    }
    while(geometryList[batchIndex]!==undefined) {
        geometryList[batchIndex].realBatchSize = 0;
        batchIndex++;
    }
    //console.log(totalLength-effectData.dataRemStart,totalLength,effectData.dataRemStart,geometryList.length);
}
Sprite_MPMZ_Rope.prototype.destroy = function() {
    if (this._destroyed) return;
    PIXI.Mesh.prototype.destroy.apply(this,arguments);
    this.effectData = null;
    this.dataRem = null;
}
//Program缓存
Sprite_MPMZ_Rope.getProgramMPMZ = function(imgStretchMode,hOrV) {
    let index = 0;
    if (imgStretchMode===1) {
        if (hOrV) {
            index = 1;
        } else {
            index = 2;
        }
    } else {
        index = 0;
    }
    if (!Sprite_MPMZ_Rope.programListMPMZ) {
        Sprite_MPMZ_Rope.programListMPMZ = [];
    }
    if (!Sprite_MPMZ_Rope.programListMPMZ[index]) {
        Sprite_MPMZ_Rope.programListMPMZ[index] = Sprite_MPMZ_Rope.generateProgramMPMZ(imgStretchMode,hOrV);
    }
    return Sprite_MPMZ_Rope.programListMPMZ[index];
};
Sprite_MPMZ_Rope.generateProgramMPMZ = function(imgStretchMode,hOrV) {
    let vertex = `
        attribute vec2 aVertexPosition;
        attribute vec2 aTextureCoord;
        attribute float lineAlpha;
        attribute float partIndex;
        uniform mat3 projectionMatrix;
        uniform mat3 translationMatrix;
        uniform mat3 uTextureMatrix;
        varying vec2 vTextureCoord;
        varying float aLineAlpha;
        varying float aPartIndex;
        void main(void){
            gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
            vTextureCoord = (uTextureMatrix * vec3(aTextureCoord, 1.0)).xy;
            aLineAlpha = lineAlpha;
            aPartIndex = partIndex;
        }
    `;
    let fragment = imgStretchMode===0?`
        uniform vec4 uColor;
        uniform sampler2D uSampler;
        varying vec2 vTextureCoord;
        varying float aLineAlpha;
        varying float aPartIndex;
        void main(void) {
            gl_FragColor = texture2D(uSampler, vTextureCoord) * uColor * aLineAlpha;
        }
    `:`
        uniform vec4 uColor;
        uniform sampler2D uSampler;
        varying vec2 vTextureCoord;
        varying float aLineAlpha;
        varying float aPartIndex;
        void main(void) {
            if (mod(aPartIndex,2.0)>1.0) {
                gl_FragColor = texture2D(uSampler, `+
                    (hOrV?"vec2(1.0-vTextureCoord.x,vTextureCoord.y)":"vec2(vTextureCoord.x,1.0-vTextureCoord.y)")+
                `) * uColor * aLineAlpha;
            } else {
                gl_FragColor = texture2D(uSampler, vTextureCoord) * uColor * aLineAlpha;
            }
        }
    `;
    return PIXI.Program.from(vertex, fragment);
};
//=============================================================================
//
//=============================================================================
Geometry_MPMZ_Rope.prototype = Object.create(PIXI.MeshGeometry.prototype);
Geometry_MPMZ_Rope.prototype.constructor = Geometry_MPMZ_Rope;
Geometry_MPMZ_Rope.prototype.initialize = function(width = 200, batchSize, effectData) {
    PIXI.MeshGeometry.call(this,
        new Float32Array(batchSize * 4),
        new Float32Array(batchSize * 4),
        new Uint16Array(batchSize * 6));
    this.addAttribute('lineAlpha', new PIXI.Buffer(new Float32Array(batchSize * 2)),1);
    this.addAttribute('partIndex', new PIXI.Buffer(new Float32Array(batchSize * 2)),1);
    this._width = width;
    this.batchSize = batchSize;
    this.realBatchSize = batchSize;//可能有后半部分不使用，只实际渲染前一半
    this.build(effectData);
};
Geometry_MPMZ_Rope.prototype.build = function(effectData) {
    let batchSize = this.batchSize;
    let uvBuffer = this.getBuffer('aTextureCoord');
    let indexBuffer = this.getIndex();
    //部分初始化
    let indexCount = 0;
    let indices = indexBuffer.data;
    let uvs = uvBuffer.data;
    let hOrV = effectData.hOrV;
    let imgStretchMode = effectData.imgStretchMode;
    for (let i = 0, index, dx, dy, distance; i < batchSize; i++) {
        index = i * 4;
        if (hOrV) {
            if (imgStretchMode===1) {
                uvs[index + 1] = 0;
                uvs[index + 3] = 1;
            } else {
                uvs[index + 1] = 0;
                uvs[index + 3] = 1;
            }
        } else {
            if (imgStretchMode===1) {
                uvs[index + 0] = 1;
                uvs[index + 2] = 0;
            } else {
                uvs[index + 0] = 1;
                uvs[index + 2] = 0;
            }
        }
    }
    //绘制index
    for (let i = 0,index; i < batchSize; i++) {
        index = i * 2;
        indices[indexCount++] = index;
        indices[indexCount++] = index + 1;
        indices[indexCount++] = index + 2;
        indices[indexCount++] = index + 2;
        indices[indexCount++] = index + 1;
        indices[indexCount++] = index + 3;
    }
    indexBuffer.update();
    uvBuffer.update();
}
Geometry_MPMZ_Rope.prototype.update = function(dataRem = null,currentIndex = 0,effectData = null) {
    if (dataRem!==null) {//防止有其他地方调用更新函数。
        return this.updateVertices(dataRem,currentIndex,effectData);
    }
}
Geometry_MPMZ_Rope.prototype.updateVertices = function(dataRem,currentIndex,effectData) {
    let dataRemStart = effectData.dataRemStart;
    let alphaRate = effectData.disappearTime/(effectData.existTime+effectData.disappearTime);
    let maxLength = dataRem.length;
    let batchSize = this.batchSize;
    let hOrV = effectData.hOrV;
    let imgStretchMode = effectData.imgStretchMode;
    let math = Math;
    let point;
    let index;
    let angle;
    let amount;
    let angleToRadius = math.PI/180;
    let vertices = this.buffers[0].data;
    let uvs = this.buffers[1].data;
    let lineAlpha = this.buffers[3].data;
    let partIndex = this.buffers[4].data;
    let dx48 = $gameMap.displayX()*tileSize;
    let dy48 = $gameMap.displayY()*tileSize;
    let width = this._width;
    let i = 0;
    let sinLength;
    let cosLength;
    let tempAlpha;
    let alpha = effectData.alpha;
    //x,y,r,ir,sx,sy,ax,ay
    while(i < batchSize && currentIndex < maxLength) {
        //====================================================================
        point = dataRem[currentIndex];
        index = i*4;
        //====================================================================
        if (hOrV) {
            //====================================================================
            angle = point.ir*angleToRadius;
            sinLength = width*math.sin(angle)*point.sy;
            cosLength =-width*math.cos(angle)*point.sy;
            vertices[index + 0] = point.x-dx48+sinLength*(point.ay);
            vertices[index + 1] = point.y-dy48+cosLength*(point.ay);
            vertices[index + 2] = point.x-dx48;
            vertices[index + 3] = point.y-dy48;
            //====================================================================
            if (imgStretchMode===1) {
                uvs[index + 0] = uvs[index + 2] = currentIndex%2;
            } else {
                amount = (currentIndex-dataRemStart) / (maxLength-dataRemStart-1);
                uvs[index + 0] = uvs[index + 2] = 1-amount;
            }
            //====================================================================
        } else {
            //====================================================================
            angle = point.r*angleToRadius;
            sinLength = width*math.sin(angle+math.PI/2)*point.sx;
            cosLength =-width*math.cos(angle+math.PI/2)*point.sx;
            vertices[index + 0] = point.x-dx48-sinLength*(point.ax);
            vertices[index + 1] = point.y-dy48-cosLength*(point.ax);
            vertices[index + 2] = point.x-dx48-sinLength*(point.ax-1);
            vertices[index + 3] = point.y-dy48-cosLength*(point.ax-1);
            //====================================================================
            if (imgStretchMode===1) {
                uvs[index + 1] = uvs[index + 3] = currentIndex%2;
            } else {
                amount = (currentIndex-dataRemStart) / (maxLength-dataRemStart-1);
                uvs[index + 1] = uvs[index + 3] = 1-amount;
            }
            //====================================================================
        }
        //====================================================================
        tempAlpha = (currentIndex-dataRemStart) / (maxLength-dataRemStart-1);
        lineAlpha[i*2 + 0] = lineAlpha[i*2 + 1] = (tempAlpha<alphaRate?(tempAlpha/alphaRate):1)*alpha;
        //====================================================================
        partIndex[i*2 + 0] = partIndex[i*2 + 1] = currentIndex;
        //====================================================================
        currentIndex++;
        i++;
        //====================================================================
    }
    this.buffers[0].update();
    this.buffers[1].update();
    this.buffers[3].update();
    this.buffers[4].update();
    if (currentIndex < maxLength) {
        if (i<=1) {
            this.realBatchSize = 0;
            return currentIndex-1;
        } else {
            this.realBatchSize = i*6;//此处实际值是indexBuffer
            return currentIndex-1;//还有batch时需要有起始节点
        }
    } else {
        if (i<=1) {
            this.realBatchSize = 0;
            return currentIndex;
        } else {
            this.realBatchSize = (i-1)*6;
            return currentIndex;//再无batch时不需起始节点。
        }
    }
}
//=============================================================================
//
//=============================================================================
}
//=============================================================================
//
//=============================================================================
/*
专门的深拷贝方法，具体的拷贝策略为： 
完全不可深拷贝的值直接赋予过去，包括Boolean，Number，String，Symbol，Null，Undefined，Function。
基础的{}和[]进行深拷贝，其他对象直接赋过去。

在用于弹幕复制时，这样恰好。
*/
QJ.makeDeepCopy = function(d,f = null) {
    if (typeof d !== 'object' || d === null) return d;
    if (f===null) f = QJ.makeDeepCopy;
    switch(d.constructor.name) {
    case 'Object':{
        let nd = {};
        for (let i in d) {
            nd[i] = f(d[i],f);
        }
        return nd;
    }
    case 'Array':{
        let nd = [];
        for (let i=0,il=d.length;i<il;i++) {
            nd.push(f(d[i],f));
        }
        return nd;
    }
    }
    return d;
};
//=============================================================================
//
//=============================================================================
Math.angleStandard_MPMZ = function(a) {
    a %= 360;
    if (a<0) a+=360;
    return a;
};
Math.radianStandard_MPMZ = function(a) {
    a %= this.PI*2;
    if (a<0) a+=this.PI*2;
    return a;
};
Math.angleDis_MPMZ = function(a,b) {
    if (this.abs(a-b)>180) return this.abs(360-(a>b?(a-b):(b-a)));
    else return this.abs(a-b);
};
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
if (eval(parameters.canShowBox) && Utils.isOptionValid('test')) {
    $.Spriteset_Map_createUpperLayer = Spriteset_Map.prototype.createUpperLayer;
    Spriteset_Map.prototype.createUpperLayer = function() {
        $.Spriteset_Map_createUpperLayer.apply(this,arguments);
        this._collisionBoxSpriteQJMZ = new Sprite_CollisiobBoxQJ();
        this.addChild(this._collisionBoxSpriteQJMZ);
    };
}
//=============================================================================
//
//=============================================================================
let showBox = eval(parameters.showBox);
//==================================================
function Sprite_CollisiobBoxQJ() {
    this.initialize.apply(this, arguments);
}
Sprite_CollisiobBoxQJ.prototype = Object.create(Sprite.prototype);
Sprite_CollisiobBoxQJ.prototype.constructor = Sprite_CollisiobBoxQJ;
Sprite_CollisiobBoxQJ.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.visible = showBox;
    this.bitmap = new Bitmap(Graphics.width,Graphics.height);
    this.bitmap.paintOpacity = 80;
    QJ.MPMZ.sprite = this;
};
Sprite_CollisiobBoxQJ.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (Input.drill_isKeyPressed('F6')) {
        showBox=!showBox;
        this.bitmap.clear();
        this.visible = showBox;
    }
    if (this.visible) {
        this.bitmap.clear();
        let dx = -$gameMap.displayX()*tileSize;
        let dy = -$gameMap.displayY()*tileSize;
        if ($gamePlayer._boxBodyQJ) {
            this.drawBody($gamePlayer._boxBodyQJ,this.bitmap._context,dx,dy,'#ff0000');
        }
        for (let i=0,el=$gameMap._events,ell=el.length;i<ell;i++) {
            if (!el[i]||!el[i]._boxBodyQJ) continue;
            this.drawBody(el[i]._boxBodyQJ,this.bitmap._context,dx,dy,'#ff0000');
        }
        for (let i in $gameMap._mapBulletsQJ) {
            let detail = $gameMap._mapBulletsQJ[i];
            if (!detail||!detail.QJBody) continue;
            this.drawBody(detail.QJBody,this.bitmap._context,dx,dy);
        }
    }
};
//QJ.MPMZ.sprite.aBody(body);
Sprite_CollisiobBoxQJ.prototype.aBody = function(body) {
    this.bitmap.clear();
    let dx = -$gameMap.displayX()*tileSize;
    let dy = -$gameMap.displayY()*tileSize;
    this.drawBody(body,this.bitmap._context,dx,dy);
};
Sprite_CollisiobBoxQJ.prototype.drawBodies = function(list,c,dx,dy,color) {
    for (let i of list) {
        if (i) {
            this.drawBody(i,c,dx,dy,color);
        }
    }
};
Sprite_CollisiobBoxQJ.prototype.drawBody = function(body,c,dx,dy,color) {
    let posX = body.pos.x+dx,posY = body.pos.y+dy;
    c.beginPath();
    if (body.type==0) {//Circle 
        c.arc(posX+body.offset.x,posY+body.offset.y,body.r,0,2*Math.PI);
    } else if (body.type==1) {//Rectangle
        let bounds = body.calcPoints;
        c.moveTo(bounds[0].x+posX,bounds[0].y+posY);
        for (let j=1,jl=bounds.length;j<jl;j++) {
            c.lineTo(bounds[j].x+posX,bounds[j].y+posY);
        }
        c.lineTo(bounds[0].x+posX,bounds[0].y+posY);
    }
    c.closePath();
    c.fillStyle = color?color:(body.color?body.color:"#00FF00");
    c.fill();
    c.lineWidth = 2;
    c.strokeStyle = "#000000";
    c.stroke();
};
window.Sprite_CollisiobBoxQJ = Sprite_CollisiobBoxQJ;
//=============================================================================
//Game_Map
//=============================================================================
$.Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    this._groupListQJ = {};
    this.initProjectileDataQJ();
    this._gridBodyQJ = QJ.SAT.box(0,0,['R',tileSize,tileSize]);
    $.Game_Map_setup.apply(this,arguments);
    this.refreshMapBoxQJ();
    this.refreshUpdateBoxDataQJ();
};
Game_Map.prototype.initProjectileDataQJ = function() {
    this._mapBulletsQJ = {};
    this._mapBulletsNameQJ = {};
    this._mapBulletsQJLength = 0;
}
Game_Map.prototype.refreshUpdateBoxDataQJ = function() {
    let newNumber = ++this._noPassIndexLaserNowQJ;
    let math = Math;
    this._groupListQJ = {};
    for (let i=0,idata=$gameMap._events,il=idata.length,event;i<il;i++) {
        event = idata[i];
        if (event) {
            if (event._groupListQJ.length>0) {
                for (let j of event._groupListQJ) {
                    if (!this._groupListQJ[j]) {
                        this._groupListQJ[j] = [];
                    }
                    this._groupListQJ[j].push(event.eventId());
                }
            }
            if (event.laserObstacle) {
                this._noPassBoxQJLaser[math.floor(i.x+0.5)][math.floor(i.y+0.5)] = newNumber;
            }
        }
    }
}
Game_Map.prototype.getGroupEventListQJ = function(groupName) {
    return this._groupListQJ?(this._groupListQJ[groupName]?this._groupListQJ[groupName]:[]):[];
}
Game_Map.prototype.getGroupBulletListQJ = function(groupName) {
    return this._mapBulletsNameQJ?(this._mapBulletsNameQJ[groupName]?Object.keys(this._mapBulletsNameQJ[groupName]):[]):[];
}

Game_Map.prototype.getGroupsBulletListQJ = function(groupNames) {
    var result = new Set();  // 使用 Set 来保证唯一性

    // 确保传递的 groupNames 是一个数组
    if (!Array.isArray(groupNames)) {
        groupNames = [groupNames];  // 如果传递的是单个字符串，将其转换为数组
    }

    // 遍历每个标签进行检查
    groupNames.forEach(groupName => {
        if (this._mapBulletsNameQJ && this._mapBulletsNameQJ[groupName]) {
            var bullets = Object.keys(this._mapBulletsNameQJ[groupName]);
            bullets.forEach(bullet => result.add(bullet));  // 将子弹集合加入 Set，自动排除重复
        }
    });

    return Array.from(result);  // 将 Set 转换回数组并返回
};

Game_Map.prototype.updateProjectilesQJ = function() {
    //====================================
    this.refreshUpdateBoxDataQJ();
    //====================================
    //console.time("allTime");
    for (let i in this._mapBulletsQJ) {
        let detail = this._mapBulletsQJ[i];
        if (detail) {
            detail.update();
        }
    }
    //console.timeEnd("allTime");
    //====================================
}
$.Scene_Map_updateMain = Scene_Map.prototype.updateMain;
Scene_Map.prototype.updateMain = function() {
    $.Scene_Map_updateMain.apply(this,arguments);
    $gameMap.updateProjectilesQJ();
};
Game_Map.prototype.refreshMapBoxQJ = function() {
    //console.time("allTime");
    //========================================
    this._noPassBoxQJ=[];
    this._noPassBoxQJLaser=[];
    let nP = this._noPassBoxQJ,nPL = this._noPassBoxQJLaser,g2,g4,g6,g8;
    for (let x=0,xl=$dataMap.width;x<xl;x++) {
        nP.push([]);
        nPL.push([]);
        for (let y=0,yl=$dataMap.height;y<yl;y++) {
            g2=this.isPassable(x,y,2);
            g4=this.isPassable(x,y,4);
            g6=this.isPassable(x,y,6);
            g8=this.isPassable(x,y,8);
            nP[x].push(g2&&g4&&g6&&g8);
            nPL[x].push(0);
        }
    }
    this._noPassIndexLaserNowQJ = 1; 
    //========================================
    //console.timeEnd("allTime");
    //========================================
};
Game_Map.prototype.terrainBoxQJ = function(id) {
    return this._terrainBoxQJ[id]||[];
};
Game_Map.prototype.noPassBoxQJ = function(x,y) {
    x = Math.floor(x+0.5);
    y = Math.floor(y+0.5);
    if (x<0||x>=$gameMap.width()||y<0||y>=$gameMap.height()) return true;
    return this._noPassBoxQJ[x][y];
};
Game_Map.prototype.noPassBoxLaserQJ = function(x,y) {
    x = Math.round(x);
    y = Math.round(y);
    if (x<0||x>=$gameMap.width()||y<0||y>=$gameMap.height()) return true;
    return this._noPassBoxQJ[x][y]&&this._noPassBoxQJLaser[x][y]!=this._noPassIndexLaserNowQJ;
};
Game_Map.prototype.addMapBulletsNameQJ = function(index,name) {
    if (!name) return;
    for (let i=0,il=name.length;i<il;i++) {
        if (!this._mapBulletsNameQJ[name[i]]) {
            this._mapBulletsNameQJ[name[i]] = {};
        }
        this._mapBulletsNameQJ[name[i]][index] = index;
    }
};
Game_Map.prototype.deleteMapBulletsNameQJ = function(index,name) {
    if (!name) return;
    for (let i=0,il=name.length;i<il;i++) {
        if (!this._mapBulletsNameQJ[name[i]]) {
            this._mapBulletsNameQJ[name[i]] = {};
            return;
        }
        delete this._mapBulletsNameQJ[name[i]][index];
    }
};
Game_Map.prototype.addBulletQJ = function(bullet,type) {
    let bulletsTarget,index = this._mapBulletsQJLength;//this._mapBulletsQJ.length;
    this._mapBulletsQJLength++;
    bulletsTarget = this.generateGameMPMZ(index,bullet,type);
    if (!bulletsTarget.deadOver) {
        this._mapBulletsQJ[index] = bulletsTarget;
        if (SceneManager._scene&&SceneManager._scene._spriteset) {
            SceneManager._scene._spriteset.createBulletQJ(index,type);
        }
        if (bulletsTarget.afterDeal) {
            bulletsTarget.afterDeal();
        }
        return bulletsTarget;
    } else {
        return null;
    }    
};
Game_Map.prototype.generateGameMPMZ = function(index,data,type) {
    if (type === 0) return new Game_QJBulletMZ(data,index);
    if (type === 1) return new Game_QJLaserMZ(data,index);
};
Game_Map.prototype.removeBulletQJ = function(index) {
    let data=this._mapBulletsQJ[index];
    if (data) {
        let sprite = this.findBulletSpriteQJ(data);
        if (sprite) sprite.destroy();
        this._mapBulletsQJ[index] = null;
        delete this._mapBulletsQJ[index];
    }
};
Game_Map.prototype.bulletQJ = function(index) {
    return this._mapBulletsQJ[index];
};
Game_Map.prototype.findBulletSpriteQJ = function(data) {
    if (!SceneManager._scene._spriteset||SceneManager._scene.constructor!==Scene_Map) {
        return null;
    }
    return SceneManager._scene._spriteset.findBulletSpriteQJ(data.index);
};
Game_Map.prototype.reAddBulletToContainerQJ = function(data) {
    if (!SceneManager._scene._spriteset||SceneManager._scene.constructor!==Scene_Map) {
        return null;
    }
    return SceneManager._scene._spriteset.reAddBulletToContainerQJ(data.index);
};
Game_Map.prototype.reAddBulletToContainerForZQJ = function(data,targetZ) {
    if (!SceneManager._scene._spriteset||SceneManager._scene.constructor!==Scene_Map) {
        return null;
    }
    return SceneManager._scene._spriteset.reAddBulletToContainerForZQJ(data.index,targetZ);
};
Game_Map.prototype.findBulletSpriteByIndexQJ = function(index) {
    let data = this.bulletQJ(index);
    return (!!data)?this.findBulletSpriteQJ(data):null;
};
Game_Map.prototype.reAddBulletToContainerByIndexQJ = function(index) {
    let data = this.bulletQJ(index);
    if (!!data) {
        this.reAddBulletToContainerQJ(data);
    }
};
Game_Map.prototype.reAddBulletToContainerForZByIndexQJ = function(index,targetZ) {
    let data = this.bulletQJ(index);
    if (!!data) {
        this.reAddBulletToContainerForZQJ(data,targetZ);
    }
};
//=============================================================================
//Game_Character
//=============================================================================
$.Game_Character_initMembers = Game_Character.prototype.initMembers;
Game_Character.prototype.initMembers = function() {
    $.Game_Character_initMembers.apply(this);
    this.refreshScreenBoxDataQJ();
}
Game_Character.prototype.refreshScreenBoxDataQJ = function() {
    //nothing
    //this._boxOffsetXQJ = 0;
    //this._boxOffsetYQJ = 0;
    //this._boxBodyQJ = null;
    //this.updateBoxBodyPositionQJ();
};
Game_Character.prototype.screenBoxXQJ = function() {
    return (this._realX + 0.5) * tileSize + this._boxOffsetX;
};
Game_Character.prototype.screenBoxYQJ = function() {
    return (this._realY + 0.5) * tileSize + this._boxOffsetY - (offsetGY?this.shiftY():0);
};
Game_Character.prototype.screenBoxXShowQJ = function() {
    return (this._realX + 0.5 - $gameMap.displayX()) * tileSize + this._boxOffsetX;
};
Game_Character.prototype.screenBoxYShowQJ = function() {
    return (this._realY + 0.5 - $gameMap.displayY()) * tileSize + this._boxOffsetY - (offsetGY?this.shiftY():0);
};
Game_Character.prototype.screenShootXQJ = function() {
    return this.screenX();
};
Game_Character.prototype.screenShootYQJ = function() {
    return this.screenY() - tileSize/2 + this.shiftY();//屏蔽掉上浮。
};
Game_Character.prototype.updateBoxBodyPositionQJ = function() {
    QJ.SAT.setPostion(this._boxBodyQJ,this.screenBoxXQJ(),this.screenBoxYQJ());
};
Game_Character.prototype.updateBoxDataQJ = function() {
    if (this._boxBodyQJ) {
        this.updateBoxBodyPositionQJ();
    } else {
        this.refreshScreenBoxDataQJ();
    }
};
Game_Character.prototype.changeCBQJ = function(cb,ox,oy) {
    //========================================
    if (ox!==undefined) this._boxOffsetX = ox;
    if (oy!==undefined) this._boxOffsetY = oy;
    this._boxBodyQJ = QJ.SAT.box(0,0,cb);
    this.updateBoxBodyPositionQJ();
    //========================================
};
//=============================================================================
//
//=============================================================================
/*Game_Character.prototype.addShadowCircle = function(character,data,time,delta) {
    if (typeof time == "number") {
        this.shadowCircle = [0,1,delta,time,character,data];
    } else {
        if (time[0]==0&&this==$gamePlayer) return;
        this.shadowCircle = [1,1,delta,time,character,data];
    }
    this.updateShadowCirccle();
};
Game_Character.prototype.updateShadowCirccle = function() {
    let sc = this.shadowCircle;
    if (sc[0]==0) {
        sc[1]--;
        if (sc[1]<=0) {
            sc[3]--;
            sc[1]=sc[2];
            QJ.MPMZ.Shadow(sc[4],sc[5]);
            if (sc[3]<=0) {
                this.shadowCircle = null;
            }
        }
    } else {
        if (QJ.MPMZ.dealTimeBoolean(sc[3],this)) this.shadowCircle = null;
        else {
            sc[1]--;
            if (sc[1]<=0) {
                sc[1]=sc[2];
                QJ.MPMZ.Shadow(sc[4],sc[5]);
            }
        }
    }
};*/
//=============================================================================
//Game_Player
//=============================================================================
Game_Player.prototype.refreshScreenBoxDataQJ = function() {
    //========================================
    this._boxOffsetX = $gameSystem._playerBoxData.offsetX;
    this._boxOffsetY = $gameSystem._playerBoxData.offsetY;
    this._boxBodyQJ = QJ.SAT.box(0,0,$gameSystem._playerBoxData.body);
    this.updateBoxBodyPositionQJ();
    //========================================
};
$.Game_Player_update = Game_Player.prototype.update;
Game_Player.prototype.update = function(sceneActive) {
    $.Game_Player_update.apply(this,arguments);
    this.updateBoxDataQJ();
};
//=============================================================================
//Game_Event
//=============================================================================
Game_Event.prototype.refreshScreenBoxDataQJ = function() {
    //========================================
    let ox =   $gameSystem._eventBoxData.offsetX;
    let oy =   $gameSystem._eventBoxData.offsetY;
    let body = $gameSystem._eventBoxData.body;
    //========================================
    let content=QJ.calculateAnnotation(this),detail;
    //========================================
    detail = content.match(/<BoxOffset:([^\,]+)\,([^\,\>]+)>/i);
    if (detail) {
        if (!isNaN(Number(detail[1]))&&!isNaN(Number(detail[2]))) {
            ox = Number(detail[1]);
            oy = Number(detail[2]);
        } 
    }
    //========================================
    detail = content.match(/<BoxType:([^\>]+)>/i);
    if (detail) {
        if (isMV) {
            if (detail[1][0]==='[') {
                body = eval(detail[1]);
 //           } else {
 //               body = QJ.BL.dealCollisionBox(eval(detail[1]));
  //              if (body[0] === 0) body[0] = 'C';
  //              else if (body[0] === 1) body[0] = 'R';
            }
        } else {
            body = eval(detail[1]);
        }
    }
    //========================================
    this.calculateOtherTagQJ(content);
    //========================================
    this._boxOffsetX = ox;
    this._boxOffsetY = oy;
    this._boxBodyQJ = QJ.SAT.box(0,0,body);
    this.updateBoxBodyPositionQJ();
    //========================================
};
Game_Event.prototype.calculateOtherTagQJ = function(content) {
    //========================================
    let detail = null;
    //========================================
    detail=content.match(/<laserObstacle>/i);
    if (detail) {
        this.laserObstacle = true;
    } else this.laserObstacle = false;
    //========================================
    detail=content.match(/<Group:([^\>]+)>/i);
    if (detail) {
        this._groupListQJ = [];
        detail=detail[1].split(',');
        for (let i of detail) {
            this._groupListQJ.push(i);
        }
    } else this._groupListQJ = [];
    //========================================
};
$.Game_Event_update = Game_Event.prototype.update;
Game_Event.prototype.update = function() {
    $.Game_Event_update.apply(this,arguments);
    this.updateBoxDataQJ();
};
$.Game_Event_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
    this._groupListQJ = null;
    $.Game_Event_initMembers.apply(this,arguments);
};
$.Game_Event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
    $.Game_Event_setupPage.apply(this,arguments);
    this.refreshScreenBoxDataQJ();
};
//=============================================================================
//
//=============================================================================
/*Game_Follower.prototype.refreshScreenBoxDataQJ = function() {
    //========================================
    this._boxOffsetX = $gameSystem._followerBoxData.offsetX;
    this._boxOffsetY = $gameSystem._followerBoxData.offsetY;
    this._boxBodyQJ = QJ.SAT.box(0,0,$gameSystem._followerBoxData.body);
    this.updateBoxBodyPositionQJ();
    //========================================
};
$.Game_Follower_update = Game_Follower.prototype.update;
Game_Follower.prototype.update = function(sceneActive) {
    $.Game_Follower_update.apply(this,arguments);
    this.updateBoxDataQJ();
};*/
//=============================================================================
//
//=============================================================================
Spriteset_Map.prototype.clearAllBulletMPMZ = function() {
    this._1ContainerQJ.removeChildren();//below parallax/map/event/picture
    this._2ContainerQJ.removeChildren();//below map/event/picture
    this._3ContainerQJ.removeChildren();//below event/picture
    this._4ContainerQJ.removeChildren();//below picture
    this._5ContainerQJ.removeChildren();//above all
    this._6ContainerQJ.removeChildren();//above all extra (screen)
};
$.Spriteset_Map_createParallax = Spriteset_Map.prototype.createParallax;
Spriteset_Map.prototype.createParallax = function() {
    this._1ContainerQJ = new Sprite_ProjectileContainerQJMZ();
    this._baseSprite.addChild(this._1ContainerQJ);
    $.Spriteset_Map_createParallax.call(this);
    this._2ContainerQJ = new Sprite_ProjectileContainerQJMZ();
    this._baseSprite.addChild(this._2ContainerQJ);
};
$.Spriteset_Map_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
    this._3ContainerQJ = new Sprite_ProjectileContainerQJMZ();
    this._3ContainerQJ.z = 0;
    this._tilemap.addChild(this._3ContainerQJ);
    $.Spriteset_Map_createCharacters.call(this);
    this._4ContainerQJ = new Sprite_ProjectileContainerQJMZ();
    this.addChild(this._4ContainerQJ);
};
$.Spriteset_Map_createTimer = Spriteset_Map.prototype.createTimer;
Spriteset_Map.prototype.createTimer = function() {
    $.Spriteset_Map_createTimer.call(this);
    if (this.constructor === Spriteset_Map) {
        this._5ContainerQJ = new Sprite_ProjectileContainerQJMZ();
        this.addChild(this._5ContainerQJ);
    }
};
$.Spriteset_Map_initialize = Spriteset_Map.prototype.initialize;
Spriteset_Map.prototype.initialize = function() {
    $.Spriteset_Map_initialize.call(this);
    this._6ContainerQJ = new Sprite_ProjectileContainerQJMZ();
    this.addChild(this._6ContainerQJ);
    this.recreateMapProjectileQJ();
};
Spriteset_Map.prototype.recreateMapProjectileQJ = function() {
    let listArray = $gameMap._mapBulletsQJ;
    for (let i in listArray) {
        if (listArray[i]) {
            this.createBulletQJ(i,listArray[i].bulletMode);
        }
    }
    this.clearSaveEffectDataMPMZ();
};
Spriteset_Map.prototype.clearSaveEffectDataMPMZ = function() {
    if (QJ.MPMZ.saveEffect) {
        let pointer = QJ.MPMZ.saveEffect;
        for (let i in pointer) {
            if (pointer[i]) pointer[i].destroyReal();
            pointer[i] = null;
        }
    }
    QJ.MPMZ.saveEffect = null;
};
Spriteset_Map.prototype.createBulletQJ = function(index,type) {
    let data = $gameMap.bulletQJ(index);
    let spriteData = this.generateSpriteMPMZ(index,data,type);
    this.addBulletToContainerQJ(index,spriteData);
};
Spriteset_Map.prototype.addBulletToContainerQJ = function(index,spriteData) {
    let data = $gameMap.bulletQJ(index);
    if (typeof data.data.z === 'number') {//将子弹放到角色容器中
        //只显示特效的弹幕。当弹幕的z值是数字时弹幕将被放在事件容器中，此时需要其他原生弹幕容器来
        //承接它的拖尾和粒子效果的显示。此处使用了W号容器来承接。
        this._tilemap.addChild(spriteData);
        this._4ContainerQJ.addOnlyEffectChild(spriteData);
    } else if (data.data.z==="P") {
        this._1ContainerQJ.addChild(spriteData);
    } else if (data.data.z==="M") {
        this._2ContainerQJ.addChild(spriteData);
    } else if (data.data.z==="E") {
        this._3ContainerQJ.addChild(spriteData);
    } else if (data.data.z==="W") {
        this._4ContainerQJ.addChild(spriteData);
    } else if (data.data.z==="A") {
        this._5ContainerQJ.addChild(spriteData);
    } else if (data.data.z==="S") {
        this._6ContainerQJ.addChild(spriteData);
    } else {
        this.createBulletQJExtra(index,data.type,data,spriteData);
    }
    if (spriteData.dealAfterAddChildAction) {
        spriteData.dealAfterAddChildAction();
    }
};
//不要被createBulletQJExtra误导，实际上这个函数只是将弹幕精灵加到容器里的扩展，主要是在mz灯光插件中起效。
Spriteset_Map.prototype.createBulletQJExtra = function(index,type,data,spriteData) {
    //nothing 用于扩展。
};
Spriteset_Map.prototype.generateSpriteMPMZ = function(index,data,type) {
    if (type === 0) return new Sprite_QJBulletMZ(index);
    if (type === 1) return new Sprite_QJLaserMZ(index);
};
Spriteset_Map.prototype.reAddBulletToContainerQJ = function(index) {
    let data = $gameMap.bulletQJ(index);
    let container = this.findBulletContainerQJ(index);
    if (!container) return;
    let spriteData = this.findBulletSpriteQJ(index);
    if (spriteData && container===this._tilemap) {
        this._4ContainerQJ.removeOnlyEffectChild(spriteData);
    }
    container.removeChild(spriteData);
    this.addBulletToContainerQJ(index,spriteData);
};
Spriteset_Map.prototype.reAddBulletToContainerForZQJ = function(index,targetZ) {
    let data = $gameMap.bulletQJ(index);
    let container = this.findBulletContainerQJ(index);
    if (!container) return;
    let spriteData = this.findBulletSpriteQJ(index);
    if (spriteData && container===this._tilemap) {
        this._4ContainerQJ.removeOnlyEffectChild(spriteData);
    }
    container.removeChild(spriteData);
    data.data.z = targetZ;
    this.addBulletToContainerQJ(index,spriteData);
};
Spriteset_Map.prototype.findBulletContainerQJ = function(index) {
    let data = $gameMap.bulletQJ(index);
	if (!data || !data.data) return null;           // ← 新增：空值保护
    if (typeof data.data.z === "number") {
        return this._tilemap;
    } else {
        switch(data.data.z) {
            case "P" :return this._1ContainerQJ;
            case "M" :return this._2ContainerQJ;
            case "E" :return this._3ContainerQJ;
            case "W" :return this._4ContainerQJ;
            case "A" :return this._5ContainerQJ;
            case "S" :return this._6ContainerQJ;
            default:return null;
        } 
    }
    return null;
};
Spriteset_Map.prototype.findBulletSpriteQJ = function(index) {
    let container = this.findBulletContainerQJ(index);
    let data = $gameMap.bulletQJ(index);
    if (container && container.children) {
        for (let i of container.children) {
            if (i.data===data) {
                return i;
            }
        }
    }
    return null;
};
//=============================================================================
//
//=============================================================================
QJ.MPMZ.model = [{},{}];
//=============================================================================
//
//=============================================================================
QJ.MPMZ.defaultData1 = {
    //==========================================
    initialRotation:['PD'],
    position:[['P'],['P']],
    z:'W',
    img:'null1',
    imgRotation:['F'],
    blendMode:0,
    tone:[0,0,0,0],
    hue:0,
    opacity:1,
    scale:[1,1],
    anchor:[0.5,0.5],
    afterImage:null,
    particles:[],
    trailEffect:[],
    //==========================================
    moveJS:[],
    moveCE:[],
    moveF:[],
    deadJS:[],
    deadCE:[],
    deadF:[],
    groupName:[],
    //==========================================
    collisionBox:['C',8],
    moveType:['S',4],
    //==================================================================
    extra:null,
    existData:[{t:['Time',180],d:[1,30,2]}],
    //==================================================================
    light:null,
    //==================================================================
    isPluginObject:false,//隐藏的属性，此属性是true时代表这是插件子弹。
    onScreen:false,
    judgeAccuracyMove:0,
    judgeAccuracyRotation:0,
    judgeAccuracyScale:0,
    judgeAccuracyAnchor:0,
    //==========================================
    timeline:[]
    //==========================================
};
//======================================================
if (true) {
    let model1 = QJ.MPMZ.model[0];
    //Extra for no read directly.
    let standardExistData = model1.standardExistData_standard = {
        t:null,
        c:null,
        a:null,
        r:null,
        d:null,
        an:0,
        p:null,
        rb:0,
        r:null,
        cb:null
    };
    model1.initialRotationExtra = ((value,event,pos)=>{//传入的是画面坐标
        if (typeof value !== 'number') {
            let eventData,addValue;
            switch(value[0]) {
                case 'PD':{
                    value[0] = QJ.calculateAngleByDirectionAngle($gamePlayer.direction());addValue = value[1]?value[1]:0;break;
                }
                case 'P' :{
                    value[0] = QJ.calculateAngleByTwoPointAngle(pos[0],pos[1],
                    $gamePlayer.screenShootXQJ(),$gamePlayer.screenShootYQJ());addValue = value[1]?value[1]:0;break;
                }
                case 'M' :{
						let targetX = mouseX / $gameScreen.zoomScale();
						let targetY = mouseY / $gameScreen.zoomScale();
						if (isMobile) {
							targetX = TouchInput.x / $gameScreen.zoomScale();
							targetY = TouchInput.y / $gameScreen.zoomScale();
						}
                        value[0] = QJ.calculateAngleByTwoPointAngle(pos[0],pos[1],targetX,targetY);addValue = value[1]?value[1]:0;                    
                    break;
                }
                case 'E' :{
                    eventData = value[1]===0?event:$gameMap.event(value[1]);
                    if (eventData) value[0] = QJ.calculateAngleByTwoPointAngle(pos[0],pos[1],eventData.screenShootXQJ(),eventData.screenShootYQJ());
                    else if (value[3]) {let subValue = model1.initialRotationExtra(value[3],event,pos);value[3] = null;return subValue;}
                    else value[0] = 0;
                    addValue = value[2]?value[2]:0;
                    break;
                }
                case 'ED' :{
                    eventData = value[1]==0?event:$gameMap.event(value[1]);
                    if (eventData) value[0] = QJ.calculateAngleByDirectionAngle(eventData.direction());
                    else if (value[3]) {let subValue = model1.initialRotationExtra(value[3],event,pos);value[3] = null;return subValue;}
                    else value[0] = 0;
                    addValue = value[2]?value[2]:0;
                    break;
                }
                case 'G' :{
                    let id = QJ.MPMZ.getMinEventId(pos[0]+$gameMap.displayX()*tileSize,pos[1]+$gameMap.displayY()*tileSize,value[1]);
                    eventData = $gameMap.event(id);
                    if (eventData) value[0] = QJ.calculateAngleByTwoPointAngle(pos[0],pos[1],eventData.screenShootXQJ(),eventData.screenShootYQJ());
                    else if (value[3]) {let subValue = model1.initialRotationExtra(value[3],event,pos);value[3] = null;return subValue;}
                    else value[0] = 0;
                    addValue = value[2]?value[2]:0;
                    break;
                }
                case 'S':{
                    value[0] = Number(eval(value[1]));addValue = value[2]?value[2]:0;
                    break;
                }
                case 'PO':{
                    let tarPos = model1.posExtra(value[1],event);
                    value[0] = QJ.calculateAngleByTwoPointAngle(pos[0],pos[1],tarPos[0],tarPos[1]);
                    addValue = value[2]?value[2]:0;
                    break;
                }
                case 'B':{
                    let bulletData = $gameMap.bulletQJ(value[1]);
                    if (bulletData) value[0] = bulletData.inheritRotation();
                    else if (value[3]) {let subValue = model1.initialRotationExtra(value[3],event,pos);value[3] = null;return subValue;}
                    else value[0] = 0;
                    addValue = value[2]?value[2]:0;
                    break;
                }
                case 'F':{
                    let argu = value[2]===undefined?[]:(Array.isArray(value[2])?value[2].slice():[value[2]]);
                    value[1].apply(this,argu);
                    addValue = value[3]?value[3]:0;
                    break;
                }
                case 'BT':{
                    let bulletData = $gameMap.bulletQJ(value[1]);
                    if (bulletData) value[0] = QJ.calculateAngleByTwoPointAngle(pos[0],pos[1],bulletData.screenXShowQJ(),bulletData.screenYShowQJ());
                    else if (value[3]) {let subValue = model1.initialRotationExtra(value[3],event,pos);value[3] = null;return subValue;}
                    else value[0] = 0;
                    addValue = value[2]?value[2]:0;
                    break;
                }

            }
            if (isNaN(value[0])) value[0] = 0;
            value[0]+=addValue;
            return value[0];
        }
        return value;
    });
    model1.getRotationAddValueIndex = ((value)=>{
        if (typeof value === 'number') return -1;
        switch(value[0]) {
            case 'PD':return 1;
            case 'P' :return 1;
            case 'M' :return 1;
            case 'E' :return 2;
            case 'ED' :return 2;
            case 'G' :return 2;
            case 'S':return 2;
            case 'PO':return 2;
            case 'B':return 2;
            case 'F':return 3;
            case 'BT':return 2;
        }
        return -1;
    });
    model1.posExtra = ((value,event)=>{
        if (typeof value[0] !== 'number') value[0] = model1.x(value[0],event);
        if (typeof value[1] !== 'number') value[1] = model1.y(value[1],event);
        return value;
    });
    model1.x = ((value,event)=>{
        let addValue = 0,charTemp = null;
        switch(value[0]) {
            case 'P':{
                addValue = value[1]?value[1]:0;
                charTemp = $gamePlayer;
                value = charTemp.screenShootXQJ();
                break;
            }
            case 'M':{
                addValue = value[1]?value[1]:0;
					if (Utils.isMobileDevice()) {
						value = TouchInput.x / $gameScreen.zoomScale();
					} else {
						value = mouseX / $gameScreen.zoomScale();
					}
                break;
            }
            case 'E':{
                addValue = value[2]?value[2]:0;
                charTemp = value[1]===0?event:$gameMap.event(value[1]);
                if (charTemp) value = charTemp.screenShootXQJ();
                else if (value[3]) {let subValue = model1.x(value[3],event);value[3] = null;return subValue;}
                else value = 0;
                break;
            }
            case 'B':{
                addValue = value[2]?value[2]:0;
                let bulletData = $gameMap.bulletQJ(value[1]);
                if (bulletData) value = bulletData.screenXShowQJ();
                else if (value[3]) {let subValue = model1.x(value[3],event);value[3] = null;return subValue;}
                else value = 0;
                break;
            }
            case 'S':{
                addValue = value[2]?value[2]:0;
                value = Number(eval(value[1]));
                break;
            }
            case 'F':{
                let argu = value[2]===undefined?[]:(Array.isArray(value[2])?value[2].slice():[value[2]]);
                addValue = value[3]?value[3]:0;
                value = value[1].apply(this,value,argu);
                break;
            }
            case 'Map':{
                addValue = value[2]?value[2]:0;
                value = (value[1]-$gameMap.displayX())*tileSize+tileSize/2;
                break;
            }
        }
        if (isNaN(value)) value = 0;
        if (typeof addValue === "number") value += addValue;
        else if (charTemp!==null) value += addValue[charTemp.direction()/2-1];
        return value;
    });
    model1.y = ((value,event)=>{
        let addValue = 0,charTemp = null;
        switch(value[0]) {
            case 'P':{
                addValue = value[1]?value[1]:0;
                charTemp = $gamePlayer;
                value = charTemp.screenShootYQJ();
                break;
            }
            case 'M':{
                addValue = value[1]?value[1]:0;
					if (Utils.isMobileDevice()) {
						value = TouchInput.y / $gameScreen.zoomScale();
					} else {
						value = mouseY / $gameScreen.zoomScale();
					}				
                break;
            }
            case 'E':{
                addValue = value[2]?value[2]:0;
                charTemp = value[1]===0?event:$gameMap.event(value[1]);
                if (charTemp) value = charTemp.screenShootYQJ();
                else if (value[3]) {let subValue = model1.y(value[3],event);value[3] = null;return subValue;}
                else value = 0;
                break;
            }
            case 'B':{
                addValue = value[2]?value[2]:0;
                let bulletData = $gameMap.bulletQJ(value[1]);
                if (bulletData) value = bulletData.screenYShowQJ();
                else if (value[3]) {let subValue = model1.y(value[3],event);value[3] = null;return subValue;}
                else value = 0;
                break;
            }
            case 'S':{
                addValue = value[2]?value[2]:0;
                value = Number(eval(value[1]));
                break;
            }
            case 'F':{
                let argu = value[2]===undefined?[]:(Array.isArray(value[2])?value[2].slice():[value[2]]);
                addValue = value[3]?value[3]:0;
                value = value[1].apply(this,value,argu);
                break;
            }
            case 'Map':{
                addValue = value[2]?value[2]:0;
                value = (value[1]-$gameMap.displayY())*tileSize+tileSize/2;
                break;
            }
        }
        if (isNaN(value)) value = 0;
        if (typeof addValue === "number") value += addValue;
        else if (charTemp!==null) value += addValue[charTemp.direction()/2-1];
        return value;
    });
    model1.getPositionAddValueIndex = ((value)=>{
        if (typeof value === 'number') return -1;
        switch(value[0]) {
            case 'P':return 1;
            case 'M':return 1;
            case 'E':return 2;
            case 'B':return 2;
            case 'S':return 2;
            case 'F':return 3;
            case 'Map':return 2;
        }
        return -1;
    });
    /*model1.z = ((value)=>{
        return value;
    });*/
    model1.img = ((value)=>{
        if (typeof value === 'object'&&value[0]==='C') {
            if (value.length>2) return value;
            let character = QJ.getCharacter(value[1]);
            let sprite = SceneManager._scene._spriteset.findTargetSprite(character);
            if (sprite) {
			// 追加对多帧行走图动画的适配
			if (character._drill_EASe_controller !== undefined) {
               let pw,ph,y_index;
               let sx = 0;
               let sy = 0;	
               let cur_dir = character._direction;	
			   if (!sprite._drill_ESE_bitmap) {
				   value=value.concat([null,0,0,0,0]);
				   return value;
			   }
                if ( character._drill_EASe_type === "2dir" ) {
                    // 二方向                    					
                    pw = sprite._drill_ESE_bitmap.width;
                    ph = sprite._drill_ESE_bitmap.height / 2;
			        // > 默认朝向右
			        if( character._drill_EASe_controller._drill_EASe_lastSpriteDir == undefined ){ character._drill_EASe_controller._drill_EASe_lastSpriteDir = 6; }
					let cur_sp_dir = 6;
			        if( cur_dir == 4 ){ character._drill_EASe_controller._drill_EASe_lastSpriteDir = 4; cur_sp_dir = 4; }
			        if( cur_dir == 6 ){ character._drill_EASe_controller._drill_EASe_lastSpriteDir = 6; cur_sp_dir = 6; }
			        if( cur_dir == 2 ){ cur_sp_dir = character._drill_EASe_controller._drill_EASe_lastSpriteDir; }
			        if( cur_dir == 8 ){ cur_sp_dir = character._drill_EASe_controller._drill_EASe_lastSpriteDir; }
			        y_index = 0;
			        if( cur_sp_dir == 6 ){ y_index = 0; }	//（二方向资源：先朝右，后朝左）
			        if( cur_sp_dir == 4 ){ y_index = 1; }			
				} else {
                    // 四方向					
                    pw = sprite._drill_ESE_bitmap.width;
                    ph = sprite._drill_ESE_bitmap.height / 4;
					y_index = (cur_dir - 2) / 2;
				}		
								
			    sy = y_index * ph;				
				let characterName = character._drill_EASe_controller._drill_curBitmapName;
				value=value.concat([characterName,sx,sy,pw,ph]);
				
			  } else {				
                const pw = sprite.patternWidth();
                const ph = sprite.patternHeight();
                const sx = (sprite.characterBlockX() + sprite.characterPatternX()) * pw;
                const sy = (sprite.characterBlockY() + sprite.characterPatternY()) * ph;
				const characterName = character.characterName();
				value=value.concat([characterName,sx,sy,pw,ph]);
              }
            } else {
                value=value.concat([null,0,0,0,0]);
            }
        } else if (typeof value === 'object'&&value[0]==='T') {
            if (value[1] && typeof value[1] === "object" && value[1].$) return value;
            let realObjSample = {
                text:"",
                arrangementMode:0,
                textColor:null,
                fontSize:null,
                outlineColor:null,
                outlineWidth:null,
                fontFace:null,
                fontItalic:null,
                fontBold:null,
                width:-1,
                height:-1,
                textAlign:5,//0到9代表9个偏向
                lineWidth:0,//厚度或者宽度，由arrangementMode决定
                lineColor:null,//null指与textColor一致
                lineRate:0.5,//相对位置，0.5是中间线，1是下划线
                backgroundColor:null,//null时是无
                backgroundOpacity:1,
                advanced:false,
                shadowBlur:0,
                shadowColor:"#000000",
                shadowOffsetX:0,
                shadowOffsetY:0,
                update:false,
                $:true//记录已经处理过
            };
            if (typeof value[1] === 'object') {//新方法
                Object.assign(realObjSample,value[1]);
            } else {//[0'T',1text,2arrangement mode,3text color,4text size,[5stroke color,stroke thickness,font face]老方法
                if (value.length>1) realObjSample.text = value[1];
                if (value.length>2) realObjSample.arrangementMode = value[2];
                if (value.length>3) realObjSample.textColor = value[3];
                if (value.length>4) realObjSample.fontSize = value[4];
                if (value.length>5) realObjSample.outlineColor = value[5];
                if (value.length>6) realObjSample.outlineWidth = value[6];
                if (value.length>7) realObjSample.fontFace = value[7];
            }
            //在这里创建以让游戏在默认字体加载后再生成范例bitmap
            if (!Bitmap.blankBitmapForBulletQJ) Bitmap.blankBitmapForBulletQJ = new Bitmap(0,0);
            for (let attributeNameList = ["textColor","fontSize","outlineColor","outlineWidth","fontFace","fontItalic","fontBold",
                    "shadowBlur","shadowColor","shadowOffsetX","shadowOffsetY"],attributeName,
                pluginTextDefault = QJ.MPMZ.textDefault,
                i=0,il=attributeNameList.length,defaultBitmap = Bitmap.blankBitmapForBulletQJ;i<il;i++) {
                attributeName = attributeNameList[i];
                if (realObjSample[attributeName]===null) {
                    if (pluginTextDefault[attributeName]===null) {
                        realObjSample[attributeName] = defaultBitmap[attributeName];
                    } else {
                        realObjSample[attributeName] = pluginTextDefault[attributeName];
                    }
                }
            }
            if (isMV) {
                realObjSample.fontBold = false;
            }
            value = ['T',realObjSample];
        }
        return value;
    });
    model1.imgRotation = ((value)=>{
        if (value[0]==="R"||value[0]==="S") value[1] = QJ.MPMZ.createDEFrameQJ(value[1],0);
        if (value[0]==="F") {
            if (value[1]===undefined) {
                value[1] = value[1]||QJ.MPMZ.createDEFrameQJ(0,0);
            } else {
                value[1] = QJ.MPMZ.createDEFrameQJ(value[1],0);
            }
        }
        return value;
    });
    /*model1.blendMode = ((value)=>{
        return value;
    });*/
    model1.tone = ((value)=>{
        if (!value) value = [0,0,0,0];
        if (typeof value[0] === "number"&&typeof value[1] === "number"&&typeof value[2] === "number"&&typeof value[3] === "number") {
            return value;//都是数字的话进行缓存。
        }
        return value.map((a)=>QJ.MPMZ.createDEFrameQJ(a,0));
    });
    model1.opacity = ((value)=>{
        value = QJ.MPMZ.createDEFrameQJ(value,0);
        return value;
    });
    model1.scale = ((value)=>{
        if (typeof value != 'object') value = [value,value];
        value[0] = QJ.MPMZ.createDEFrameQJ(value[0],0);
        value[1] = QJ.MPMZ.createDEFrameQJ(value[1],0);
        return value;
    });
    model1.anchor = ((value)=>{
        if (typeof value !== 'object') value = [value,value];
        value[0] = QJ.MPMZ.createDEFrameQJ(value[0],0);
        value[1] = QJ.MPMZ.createDEFrameQJ(value[1],0);
        return value;
    });
    model1.afterImage = ((value)=>{
        if (value&&value.length>0) {
            if (typeof value[0] === "string" || typeof value[0] === "number") {
                value[0] = ['C',QJ.MPMZ.createDEFrameQJ(value[0],1)];
            } else if (typeof value[0] === "object") {
                if (Array.isArray(value[0])) {
                    if (value[0][0] === "C") {
                        value[0][1] = QJ.MPMZ.createDEFrameQJ(value[0][1],1);
                    } else if (value[0][0] === "P") {
                        value[0][1] = ImageManager.loadProjectileQJ(value[0][1]);
                    }
                }
            }
            value[1] = QJ.MPMZ.createDEFrameQJ(value[1],0);
            value[3] = QJ.MPMZ.createDEFrameQJ(value[3],0);
            if (value[4]==null||value[4]==undefined) value[4] = true;
        }
        return value;
    });
    model1.particles = ((value)=>{
        value = (!value)?[]:value;
        let resultList = [];
        for (let i of value) {
            if (i && i.$) {
                resultList.push(list);
                continue;
            }
            let list = {
                img:'circle-blue',
                offset:[0,0,180],
                offsetMin:[0,0,-30],
                offsetMax:[0,0,30],
                existTime:120,
                disappearTime:10,
                disappearScale:2,
                opacityMin:0.5,
                opacityMax:1,
                scaleXMin:1,
                scaleXMax:2,
                scaleYMin:1,
                scaleYMax:2,
                moveType:['-1*t','0'],
                intervalTime:2,
                intervalRotation:0,//只在intervalTime是负数时起效
                bundleNumber:2,
                anchorX:0.5,
                anchorY:0.5,
                synScale:false,
                sheetSpriteSet:-1,
                blendMode:0,
                $:true
            };            
            for (let j in i) list[j] = i[j];
            if (!list.img) continue;
            list.count = 0;
            list.moveType[0] = new Game_EvalToFunctionMPMZ('return -Number('+list.moveType[0]+');',['t','m']);
            list.moveType[1] = new Game_EvalToFunctionMPMZ('return  Number('+list.moveType[1]+');',['t','m']);
            resultList.push(list);
        }
        return resultList;
    });
    model1.trailEffect = ((value)=>{
        value = (!value)?[]:value;
        let resultList = [],index = 0;
        for (let i of value) {
            if (i && i.$) {
                resultList.push(list);
                continue;
            }
            let list = {
                img:'circle-blue',
                existTime:5,
                disappearTime:15,
                ifProjctileWait:true,
                imgStretchMode:0,
                hOrV:false,
                alpha:1,
                tint:"#ffffff",
                blendMode:0,
                roundPixels:false,//mv无效
                aboveProjectile:false,
                $:true
            };            
            for (let j in i) list[j] = i[j];
            if (!list.img) continue;
            if (list.existTime+list.disappearTime<=0) {
                list.existTime = 0;
                list.disappearTime = 1;
            }
            if (typeof list.tint!=='number') {
                list.tint = Number("0x"+list.tint.slice(1));
            }
            index++;
            resultList.push(list);
        }
        return resultList;
    });
    model1.moveJS = ((value)=>{
        if (!value) {
            return [];
        }
        if (!Array.isArray(value) || (typeof value === "object" && value[0] && !Array.isArray(value[0]))) {
            value = [value];
        }
        for (let i of value) {
            model1.dealMoveSet(i);
        }
        return value;
    });
    model1.moveCE = ((value)=>{
        if (!value) {
            return [];
        }
        if (!Array.isArray(value) || (typeof value === "object" && value[0] && !Array.isArray(value[0]))) {
            value = [value];
        }
        for (let i of value) {
            model1.dealMoveSet(i);
        }
        return value;
    });
    model1.moveF = ((value)=>{
        if (!value) {
            return [];
        }
        if (!Array.isArray(value) || (typeof value === "object" && value[0] && !Array.isArray(value[0]))) {
            value = [value];
        }
        for (let i of value) {
            model1.dealMoveSet(i);
        }
        return value;
    });
    model1.dealMoveSet = ((value)=>{
        if (!value[3]) value[3] = [];
        if (value.length<=4) {
            value[4] = value[1];
            value[1] = value[1]>=0?0:-1;
        }
    });
    /*model1.deadJS = ((value)=>{
        return value;
    });*/
    /*model1.deadCE = ((value)=>{
        return value;
    });*/
    model1.deadF = ((value)=>{
        for (let i of value) {
            if (!i[1]) i[1] = [];
        }
        return value;
    });
    /*model1.groupName = ((value)=>{
        return value;
    });*/
    model1.collisionBox = ((value)=>{
        if (value==='auto') value = ['auto'];
        if (value[0]==='auto' && value.length===1) {
            value.push(0);
            value.push(0);
        }
        return value;
    });
    /*model1.moveType = ((value)=>{
        return value;
    });*/
    model1.existData = ((value)=>{
        if (value[0] && value[0].$) {
            return value;
        }
        let newList = {$:true};
        for (let i of value) {
            model1.dealExistData(i,newList);
        }
        value.unshift(newList);
        return value;
    });
    model1.dealExistData = ((i,newList = null)=>{
        //================================
        i.$ = true;//代表已经初始化
        if (!i.t) i.t = ['Time',0];//未设置时设置一个默认的
        //================================
        for (let j in standardExistData) {
            i[j] = i[j]?i[j]:standardExistData[j];
        }
        if (i.t[0]=='Region') i.t[0] = 'R';
        else if (i.t[0]=='Terrai') i.t[0] = 'T';
        else if (i.t[0]=='Group') i.t[0] = 'G';
        else if (i.t[0]=='Switch') i.t[0] = 'SW';
        else if (i.t[0]=='Script') i.t[0] = 'S';
        else if (i.t[0]=='Player') i.t[0] = 'P';
        else if (i.t[0]=='Bullet') i.t[0] = 'B';
        else if (i.t[0]=='EventPage') i.t[0] = 'EP';
        else if (i.t[0]=='BulletExist') i.t[0] = 'BE';
        //================================
        if (!i.p||!(i.t[0]=='G'||i.t[0]=='P'||i.t[0]=='B')) i.p = [0,true,true,true];
        else if (i.p.length==1) i.p = [i.p[0],true,true,true];
        else if (typeof i.p != 'object') i.p = [i.p,true,true,true];
        //================================
        if (!i.rb||!(i.t[0]=='R'||i.t[0]=='T'||i.t[0]=='NP'||i.t[0]=='G'||i.t[0]=='P'||i.t[0]=='B')) i.rb = [0,true,true,true];
        else if (typeof i.rb != 'object') i.rb = [i.rb,true,true,true];
        if (i.rb.length===1) i.rb.push(true);
        if (i.rb.length===2) i.rb.push(true);
        if (i.rb.length===3) i.rb.push(true);
        //================================
        if (i.c) {
            if (i.c[0]=='T'||i.c[0]==='Time') {//['T',第一次时间,间隔,是否重置穿透]
                if (i.c.length===3) i.c.push(true);
                i.c[4] = i.c[2];
                i.c[2] = 0;
                if (i.c[3]) i.c[5] = i.p[0];//记录穿透次数以使穿透可重置
            }
        }
        //================================
        i.havePierceCharacters = {};
        i.pierceCharactersOutJS = {};
        //================================
        if (newList!==null) {
            if (!newList[i.t[0]]) newList[i.t[0]] = 1;
            else newList[i.t[0]] += 1;
        }
        //================================
    });
    model1.light = ((value)=>{
        if (value && !value.$) {
            if ((!value.miniLightId&&!value.lightId)||!(Imported.QJLighting||Imported.QJLayerLight)) return null;
            value.synRotation = !!value.synRotation;
            value.$ = true;
        }
        return value;
    });
    /*model1.extra = ((value)=>{
        return value;
    });*/
    model1.timeline = ((value)=>{
        if (value.length===0) return value;
        if (!Array.isArray(value[0])) value = [value];
        for (let i=0,il=value.length;i<il;i++) {
            model1.dealTimeline(value[i]);
        }
        return value;
    });
    model1.dealTimeline = ((detail)=>{
        if (detail.$) {
            return detail;
        }
        if (detail.length<=4) detail[4] = -1;
        if (detail[2]===-1) detail[4] = 0;//循环只执行一次时循环次数强制设置为0
        detail[5] = detail[2];//记录循环时间
        detail[2] = 0;//保证在初始时间结束后就执行一次。
        detail.$ = true;
        return detail;
    });
}
//======================================================
QJ.MPMZ.Shoot = function(data) {//=====================Shoot================
    //======================================
    let model = QJ.MPMZ.model[0];
    let orginObj = QJ.MPMZ.defaultData1;
    let copyFun = QJ.makeDeepCopy;
    let eventId = QJ.getPointerId();
    let event = QJ.getCharacter(eventId);
    //======================================
    try {
        //======================================
        data.eventId = eventId;
        //======================================
        if (data.judgeAccuracy !== undefined && data.judgeAccuracyMove === undefined) data.judgeAccuracyMove = data.judgeAccuracy;
        //======================================
        if (data.position === undefined) data.position = copyFun(orginObj.position);
        data.positionRem = copyFun(data.position);
        data.position = model.posExtra(data.position,event);
        //======================================
        if (data.initialRotation === undefined) data.initialRotation = copyFun(orginObj.initialRotation);
        data.initialRotationRem = copyFun(data.initialRotation);
        data.initialRotation = model.initialRotationExtra(data.initialRotation,event,data.position);
        //======================================
        data.position[0] += $gameMap.displayX()*tileSize;
        data.position[1] += $gameMap.displayY()*tileSize;
        //======================================
        for (let i in orginObj) {
            if (i in data) {
                //nothing
            } else {
                data[i] = copyFun(orginObj[i]);
            }
            if (model[i] !== undefined) {
                data[i] = model[i](data[i]);
            }
        }
        //======================================
    } catch(e) {
        QJ.MPMZ.error(0,e.name+' '+e.message,e);
        return;
    }
    return $gameMap.addBulletQJ(data,0);
    //======================================
};
//=============================================================================
//
//=============================================================================
QJ.MPMZ.defaultData2 = {
    //==========================================
    rotation:['M'],
    rotationStatic:true,
    position:[['P'],['P']],
    positionStatic:true,
    judgeWidth:12,
    judgeMode:['T'],
    existData:[{t:['Time',180],d:[1,30,2]}],
    length:['S',280],
    z:'E',
    img:'null1',
    imgStretchMode:'C',
    imgPoint:'LaserCircle',
    blendMode:0,
    tone:[0,0,0,0],
    opacity:1,
    scaleX:1,
    moveJS:[],
    moveF:[],
    moveCE:[],
    deadJS:[],
    deadCE:[],
    deadF:[],
    groupName:[],
    extra:null,
    //==========================================
    rotationAdd:null,
    positionSpread:0
    //==========================================
};
//======================================================
if (true) {
    let model1 = QJ.MPMZ.model[0];
    let model2 = QJ.MPMZ.model[1];
    let standardExistData = model1.standardExistData_standard;
    model2.posExtra = model1.posExtra;
    model2.rotationExtra = model1.initialRotationExtra;
    model2.opacity = model1.opacity;
    model2.tone = model1.tone;
    model2.scaleX = ((value)=>{
        return QJ.MPMZ.createDEFrameQJ(value,0);
    });
    model2.judgeWidth = ((value)=>{
        return QJ.MPMZ.createDEFrameQJ(value,0);
    });
    model2.judgeMode = ((value)=>{
        if (value[0]=='W') {
            value.push(0);
        }
        return value;
    });
    model2.length = ((value)=>{
        if (value[0]=='S') {
            if (typeof value[1] !== "array") {
                if (typeof value[1] === "string" || typeof value[1] === "number") {
                    value[1] = ['L',QJ.MPMZ.createDEFrameQJ(value[1],0)];
                }
            }
            if (value.length<=2) {
                value.push(0);
                value.push([]);
            } else if (value.length<=3) {
                value.push([]);
            }
            for (let i of value[3]) {
                if (i[0]=='T'||i[0]=='R') {
                    if (typeof i[1] != 'object') {
                        i[1] = [i[1]];
                    }
                }
            }
            if (value[2]===-1) value[2] = 99;
        } else if (value[1]=='D') {
            //nothing
        }
        return value;
    });
    model2.moveJS = model1.moveJS;
    model2.moveCE = model1.moveCE;
    model2.moveF = model1.moveF;
    model2.dealDeadSet = model1.dealDeadSet;
    model2.deadJS = model1.deadJS;
    model2.deadCE = model1.deadCE;
    model2.deadF = model1.deadF;
    model2.existData = model1.existData;
    model2.rotationAdd = ((value)=>{
        if (!!value) {
            if (value[0]==='F'||value[0]==='R') {
                value[1] = QJ.MPMZ.createDEFrameQJ(value[1],0);
                return value;
            }
        }
        return false;//用于快速判定，不用类型转换
    });
}
//======================================================
QJ.MPMZ.Laser = function(data) {//=====================Laser================
    //======================================
    let model = QJ.MPMZ.model[1];
    let orginObj = QJ.MPMZ.defaultData2;
    let copyFun = QJ.makeDeepCopy;
    let eventId = QJ.getPointerId();
    let event = QJ.getCharacter(eventId);
    //======================================
    try {
        //======================================
        data.eventId = eventId;
        //======================================
        for (let i in orginObj) {
            if (i in data) {
                //nothing
            } else {
                data[i] = copyFun(orginObj[i]);
            }
            if (model[i] !== undefined) {
                data[i] = model[i](data[i]);
            }
        }
        //======================================
    } catch(e) {
        QJ.MPMZ.error(0,e.name+' '+e.message,e);
        return;
    }
    return $gameMap.addBulletQJ(data,1);
    //======================================
};
//=============================================================================
//
//=============================================================================
QJ.MPMZ.defaultData_RC = {
    childPosition:['PY',5,72],
    rotation:[0,0,0],
    scale:[1,1,1],
    translate:[0,0,0],
    pitchDistance:[0,0,0],
    mainDeadToChild:{t:['BE',0],d:[0,10]},
    childDeadToMain:{t:['BE',0],d:[0,10]}
};
QJ.MPMZ.RC = function(mainProjData,childProjData,rcData) {
    //==================================================
    let shootFun = QJ.MPMZ.Shoot;
    let math = Math;
    let copyFun = QJ.makeDeepCopy;
    //==================================================
    let defaultData = QJ.MPMZ.defaultData_RC;
    for (let i in defaultData) {
        if (rcData[i]===undefined) {
            rcData[i] = copyFun(defaultData[i]);
        }
    }
    //==================================================
    rcData.rotation = rcData.rotation.map((a)=>(new DEFrameQJ(null,a,0)));
    rcData.scale = rcData.scale.map((a)=>(new DEFrameQJ(null,a,0)));
    rcData.translate = rcData.translate.map((a)=>(new DEFrameQJ(null,a,0)));
    rcData.pitchDistance = rcData.pitchDistance.map((a)=>(new DEFrameQJ(null,a,0)));
    //==================================================
    let childDataList = rcData.childDataList = [];
    let detail;
    //==================================================
    switch(rcData.childPosition[0]) {
    case 'D1':{
        for (let data = rcData.childPosition,i=1,il=data.length;i<il;i++) {
            detail = {x:0,y:0,r:0,s:1,d:[data[i],0,0]};
            childDataList.push(detail);
        }
        break;
    }
    case 'D2':{
        for (let data = rcData.childPosition,i=1,il=data.length;i<il;i++) {
            detail = {x:0,y:0,r:0,s:1,d:[data[i][0],data[i][1],0]};
            childDataList.push(detail);
        }
        break;
    }
    case 'D3':{
        for (let data = rcData.childPosition,i=1,il=data.length;i<il;i++) {
            detail = {x:0,y:0,r:0,s:1,d:data[i]};
            childDataList.push(detail);
        }
        break;
    }
    case 'CB':{
        //先看边上中间的点，再看8个顶点。
        let linePointNum = rcData.childPosition[1] = math.max(2,rcData.childPosition[1]);
        let linePointNumNoCorner = linePointNum - 2;
        let halfLen = rcData.childPosition[2]/2;
        if (linePointNumNoCorner>0) {
            for (let dl=halfLen*2/(linePointNum-1),dd=0,i=0,il=linePointNumNoCorner;i<il;i++) {
                dd+=dl;
                //=======================================
                detail = {x:0,y:0,r:0,s:1,d:[halfLen-dd,halfLen,halfLen]};
                childDataList.push(detail);
                detail = {x:0,y:0,r:0,s:1,d:[-halfLen,halfLen-dd,halfLen]};
                childDataList.push(detail);
                detail = {x:0,y:0,r:0,s:1,d:[-halfLen+dd,-halfLen,halfLen]};
                childDataList.push(detail);
                detail = {x:0,y:0,r:0,s:1,d:[halfLen,-halfLen+dd,halfLen]};
                childDataList.push(detail);
                //=======================================
                detail = {x:0,y:0,r:0,s:1,d:[halfLen,halfLen,halfLen-dd]};
                childDataList.push(detail);
                detail = {x:0,y:0,r:0,s:1,d:[-halfLen,halfLen,halfLen-dd]};
                childDataList.push(detail);
                detail = {x:0,y:0,r:0,s:1,d:[-halfLen,-halfLen,halfLen-dd]};
                childDataList.push(detail);
                detail = {x:0,y:0,r:0,s:1,d:[halfLen,-halfLen,halfLen-dd]};
                childDataList.push(detail);
                //=======================================
                detail = {x:0,y:0,r:0,s:1,d:[halfLen-dd,halfLen,-halfLen]};
                childDataList.push(detail);
                detail = {x:0,y:0,r:0,s:1,d:[-halfLen,halfLen-dd,-halfLen]};
                childDataList.push(detail);
                detail = {x:0,y:0,r:0,s:1,d:[-halfLen+dd,-halfLen,-halfLen]};
                childDataList.push(detail);
                detail = {x:0,y:0,r:0,s:1,d:[halfLen,-halfLen+dd,-halfLen]};
                childDataList.push(detail);
                //=======================================
            }
        }
        //=======================================
        detail = {x:0,y:0,r:0,s:1,d:[halfLen,halfLen,halfLen]};
        childDataList.push(detail);
        //=======================================
        detail = {x:0,y:0,r:0,s:1,d:[-halfLen,halfLen,halfLen]};
        childDataList.push(detail);
        //=======================================
        detail = {x:0,y:0,r:0,s:1,d:[-halfLen,-halfLen,halfLen]};
        childDataList.push(detail);
        //=======================================
        detail = {x:0,y:0,r:0,s:1,d:[halfLen,-halfLen,halfLen]};
        childDataList.push(detail);
        //=======================================
        detail = {x:0,y:0,r:0,s:1,d:[halfLen,halfLen,-halfLen]};
        childDataList.push(detail);
        //=======================================
        detail = {x:0,y:0,r:0,s:1,d:[-halfLen,halfLen,-halfLen]};
        childDataList.push(detail);
        //=======================================
        detail = {x:0,y:0,r:0,s:1,d:[-halfLen,-halfLen,-halfLen]};
        childDataList.push(detail);
        //=======================================
        detail = {x:0,y:0,r:0,s:1,d:[halfLen,-halfLen,-halfLen]};
        childDataList.push(detail);
        //=======================================
        break;
    }
    case 'PY':{
        let pointNum = rcData.childPosition[1] = math.max(2,rcData.childPosition[1]);
        let radius = rcData.childPosition[2];
        for (let i=0,il=pointNum,du=math.PI*2/il;i<il;i++) {
            detail = {x:0,y:0,r:0,s:1,d:[radius*math.sin(i*du),-radius*math.cos(i*du),0]};
            childDataList.push(detail);
        }
        break;
    }
    case 'ED':{
        let pointNum = rcData.childPosition[1] = math.max(1,rcData.childPosition[1]);
        let radius = rcData.childPosition[2];
        for (let i=0,il=pointNum;i<il;i++) {
            detail = {x:0,y:0,r:0,s:1,d:[(i-(pointNum-1)/2)*radius,0,0]};
            childDataList.push(detail);
        }
        break;
    }
    }
    //==================================================
    if (mainProjData.moveF===undefined) mainProjData.moveF = [];
    else if (!Array.isArray(mainProjData.moveF[0])) mainProjData.moveF = [mainProjData.moveF];
    mainProjData.moveF.push([0,0,QJ.MPMZ.RC_update,[rcData]]);
    //==================================================
    let mainIndex = rcData.mainIndex = shootFun(mainProjData).index;
    //==================================================
    let childIndexList = rcData.childIndexList = [];
    //==================================================
    childProjData.moveType = ['Free',null];
    //==================================================
    if (childProjData.existData===undefined) {
        childProjData.existData = [];
    }
    if (rcData.mainDeadToChild) {
        rcData.mainDeadToChild.t = ['BE',mainIndex];
        childProjData.existData.push(rcData.mainDeadToChild);
        rcData.mainDeadToChild = undefined;
    }
    //==================================================
    for (let i=0,il=childDataList.length,realChildProjData;i<il;i++) {
        realChildProjData = copyFun(childProjData);
        childDataList[i].r = "c";
        realChildProjData.moveType[1] = childDataList[i];
        childIndexList.push(shootFun(realChildProjData).index);
    }
    //==================================================
};
QJ.MPMZ.RC_update = function(rcData) {
    //shootFun(mainProjData);
    //==================================================
    let childDataList = rcData.childDataList;
    let childIndexList = rcData.childIndexList;
    let detail;
    let translateFun = QJ.MPMZ.RC_translate;
    let scaleFun = QJ.MPMZ.RC_scale;
    let rotateFun = QJ.MPMZ.RC_rotate;
    let pitchDistanceFun = QJ.MPMZ.RC_pitchDistance;
    let math = Math;
    let angleToRadius = math.PI/180;
    let getBulletFun = $gameMap.bulletQJ.bind($gameMap);
    //==================================================
    let x = this.x;
    let y = this.y;
    let translateMatrix = rcData.translate.map((a)=>a.get());
    let scaleMatrix = rcData.scale.map((a)=>a.get());
    let rotateMatrix = rcData.rotation.map((a)=>a.get());
    let pitchDistanceMatrix = rcData.pitchDistance.map((a)=>a.get());
    rotateMatrix[2] += this.rotationImg;
    //==================================================
    let needCheckDead = childIndexList && rcData.childDeadToMain;
    let allChildDead = needCheckDead;
    //==================================================
    for (let i=0,il=childDataList.length,pos,bullet;i<il;i++) {
        if (needCheckDead) {
            bullet = getBulletFun(childIndexList[i]);
            if (!bullet || bullet.dead) continue;
        }
        allChildDead = false;
        detail = childDataList[i];
        pos = detail.d.slice();
        detail.s = 1;//每次归1后计算pitchDistance。
        rotateFun(pos,rotateMatrix[0]*angleToRadius,0);
        rotateFun(pos,rotateMatrix[1]*angleToRadius,1);
        rotateFun(pos,rotateMatrix[2]*angleToRadius,2);
        scaleFun(pos,scaleMatrix);
        translateFun(pos,translateMatrix);
        pitchDistanceFun(pos,pitchDistanceMatrix,detail);
        detail.x = x + pos[0];
        detail.y = y + pos[1];
    }
    //==================================================
    if (needCheckDead && allChildDead) {
        let deadExistData = rcData.childDeadToMain;
        deadExistData.t = ['Time',0];
        QJ.MPMZ.model[0].dealExistData(deadExistData);
        this.setDead(deadExistData,null,null);
    }
    //==================================================
    //==================================================
    //==================================================
};
QJ.MPMZ.RC_translate = function(pos,v) {
    pos[0] += v[0];
    pos[1] += v[1];
    pos[2] += v[2];
};
QJ.MPMZ.RC_scale = function(pos,v) {
    pos[0] *= v[0];
    pos[1] *= v[1];
    pos[2] *= v[2];
};
QJ.MPMZ.RC_rotate = function(pos,v,t) {
    let s = Math.sin(v);
    let c = Math.cos(v);
    let x = pos[0];
    let y = pos[1];
    let z = pos[2];
    if (t===0) {
        pos[1] = y*c-z*s;
        pos[2] = y*s+z*c;
    } else if (t===1) {
        pos[0] = x*c-z*s;
        pos[2] = x*s+z*c
    } else if (t===2) {
        pos[0] = x*c-y*s;
        pos[1] = x*s+y*c;
    }
};
QJ.MPMZ.RC_pitchDistance = function(pos,v,detail) {
    let math = Math;
    let xr = v[0]===0?1:(1+pos[0]/v[0]);
    let yr = v[1]===0?1:(1+pos[1]/v[1]);
    let zr = v[2]===0?1:(1+pos[2]/v[2]);
    pos[0] *= yr * zr;
    pos[1] *= xr * zr;
    pos[2] *= xr * yr;
    detail.s *= xr * yr * zr;
};
//=============================================================================
//
//=============================================================================
QJ.MPMZ.deleteProjectile = function(name,detailExistData = null,target = null,bulletTarget = null) {
    if (detailExistData!==null) {
        if (!detailExistData.t) detailExistData.t = ['Time',0];
        QJ.MPMZ.model[0].dealExistData(detailExistData);
    }
    let list = $gameMap._mapBulletsQJ;
    for (let i in list) {
        let detail = list[i];
        if (detail) {
            if (!detail.data.isPluginObject&&detail.data.groupName.indexOf(name)>-1) {
                detail.setDead(detailExistData,target,bulletTarget);
            }
        }
    }
};
QJ.MPMZ.setDestinationForBid = function(value) {
    QJ.MPMZ.forBidDestination = !!value;
};
//=============================================================================
//
//=============================================================================
//=================================================================
//不能有offset value
QJ.MPMZ.Shooter_ArcRange = function(initialRotation,data,minRotation,maxRotation,num = 3,disturbance = 0,minScale = 1,maxScale = 1) {
    //====================================
    let shootFun = QJ.MPMZ.Shoot;
    let copyFun = QJ.makeDeepCopy;
    let math = Math;
    //====================================
    let irOffsetIndex = QJ.MPMZ.model[0].getRotationAddValueIndex(initialRotation);
    if (initialRotation.length<=irOffsetIndex) initialRotation.push(0);
    data.initialRotation = initialRotation;
    initialRotation = null;
    //====================================
    for (let i = minRotation,delta = (maxRotation - minRotation) / num,realData,size;i<maxRotation;i+=delta) {
        realData = copyFun(data);
        size = minScale+math.random()*(maxScale-minScale);
        realData.scale = size;
        if (irOffsetIndex===-1) {
            realData.initialRotation += (i+(math.random()-0.5)*disturbance);
        } else {
            realData.initialRotation[irOffsetIndex] += (i+(math.random()-0.5)*disturbance);
        }
        shootFun(realData);
    }
    //====================================
};
QJ.MPMZ.shrapnel = function(dataOrgin,charId,num,sr,er,sl,el,ox,oy,ss = 1,se = 1) {
    let char = QJ.getCharacter(charId);
    let initAngle = QJ.calculateAngleByDirectionAngle(char.direction());
    let math = Math,shoot = QJ.MPMZ.Shoot;
    let jsonEx = JsonEx.makeDeepCopy.bind(JsonEx);
    let x = char.screenShootXQJ()+ox;
    let y = char.screenShootYQJ()+oy;
    for (let i=0,r,l,data;i<num;i++) {
        r = initAngle + sr + (er-sr)*math.random();
        l = sl + (el-sl)*math.random();
        data = jsonEx(dataOrgin);
        data.position = [x+l*math.sin(r),y-l*math.cos(r)];
        data.initialRotation = r;
        data.scale = dataOrgin.scale?dataOrgin.scale:(ss+(se-ss)*math.random());
        shoot(data);
    }
}
//=================================================================
QJ.MPMZ.itemGiverCharacter = function(type,itemId,charId,num = 1) {
    //====================================
    let itemData;
    if (type==0||type=="item") {itemData = $dataItems[itemId];type=0; var bulletName = charId + "iteam" + itemId;}
    else if (type==1||type=="weapon") {itemData = $dataWeapons[itemId];type=1; var bulletName = charId + "weapon" + itemId;}
    else if (type==2||type=="armor") {itemData = $dataArmors[itemId];type=2; var bulletName = charId + "armor" + itemId;}
    else if (type==3||type=="gold") {itemData = null;type=3;}
    else return;
    if (type==3||type=="gold") {
        QJ.MPMZ.Shoot({
            position:charId==-1?[["P"],["P"]]:[["E",charId],["E",charId]],
            img:['I',itemId],
            initialRotation:0,
            imgRotation:['S',0],
            moveType:['TP',6,10,15],
            existData:[{t:['P'],c:['T',30,0,true],a:['F',QJ.gainItemEx,[3,0,num]],d:[1,15,1.1]},
                {t:['Time',3600],d:[1,15,1.1]}]
        });
    } else {
		
        QJ.MPMZ.Shoot({
			groupName:['itemDrops',bulletName],
            position:charId==-1?[["P"],["P"]]:[["E",charId],["E",charId]],
            img:['I',itemData.iconIndex],
            initialRotation:0,
			scale:[0.5,0.5],
            imgRotation:['S',0],
            moveType:['TP',6,10,15],
            existData:[{t:['P'],c:['T',30,0,true],a:['F',QJ.gainItemEx,[type,itemId,num]],d:[1,15,1.1]},
                {t:['Time',3600],d:[1,15,1.1],d:[0,30]}]
        });
    }
    //====================================
};
//=================================================================

//=================================================================
QJ.MPMZ.itemGiverXy = function(type,itemId,x,y,num = 1) {
    //====================================
    let itemData;
    if (type==0||type=="item") {itemData = $dataItems[itemId];type=0;}
    else if (type==1||type=="weapon") {itemData = $dataWeapons[itemId];type=1;}
    else if (type==2||type=="armor") {itemData = $dataArmors[itemId];type=2;}
    else if (type==3||type=="gold") {itemData = null;type=3;}
    else return;
    if (type==3||type=="gold") {
        QJ.MPMZ.Shoot({
            position:[x,y],
            img:['I',itemId],
            initialRotation:0,
            imgRotation:['S',0],
            moveType:['TP',6,10,15],
            existData:[{t:['P'],c:['T',30,0,true],a:['F',QJ.gainItemEx,[3,0,num]],d:[1,15,1.1]},
                {t:['Time',3600],d:[1,15,1.1]}]
        });
    } else {
        QJ.MPMZ.Shoot({
            position:[x,y],
            img:['I',itemData.iconIndex],
            initialRotation:0,
            imgRotation:['S',0],
            moveType:['TP',6,10,15],
            existData:[{t:['P'],c:['T',30,0,true],a:['F',QJ.gainItemEx,[type,itemId,num]],d:[1,15,1.1]},
                {t:['Time',3600],d:[1,15,1.1]}]
        });
    }
    //====================================
};
//=================================================================
QJ.MPMZ.rangeAtk = function(position,target,action,collisionBox,detailData = {}) {
    let eventId=QJ.getPointerId();
    let event = QJ.getCharacter(eventId);
    position = QJ.MPMZ.model[0].posExtra(position,event);
    position[0] += $gameMap.displayX()*tileSize;
    position[1] += $gameMap.displayY()*tileSize;
    return Game_QJBulletMZ.prototype.rangeAtk.call({
        index:-2,
        scaleX:detailData.scaleX,
        scaleY:detailData.scaleY,
        anchorX:detailData.anchorX,
        anchorY:detailData.anchorY,
        rotationImg:detailData.rotationImg
    },position,target,action,collisionBox,detailData.lastAtkCharacter);
};
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
Bitmap.prototype.drawTextVerticalForBulletQJ = function(text, x, y, maxWidth, maxHeight, align) {
    const context = this.context;
    const alpha = context.globalAlpha;
    let lineHeight = Math.floor(this.fontSize+this.outlineWidth*2);
    let tx = x;
    let ty = Math.round(y + this.fontSize * 0.35);
    if (align === "center") {tx += maxWidth / 2;ty += lineHeight / 2;}
    else if (align === "right")  {tx += maxWidth;ty += lineHeight;}
    context.save();
    context.font = this._makeFontNameText();
    context.textAlign = align;
    context.textBaseline = "alphabetic";
    context.globalAlpha = 1;
    for (let i=0;i<text.length;i++) {
        this._drawTextOutline(text[i], tx, ty+i*lineHeight, maxWidth);
        context.globalAlpha = alpha;
        this._drawTextBody(text[i], tx, ty+i*lineHeight, maxWidth);
    }
    context.restore();
    this._baseTexture.update();
};
Bitmap.measureTextSizeForBulletQJ = function(text,arrangement,fontSize,fontFace,fontItalic,fontBold,outlineWidth = 0) {
    let tempData = {width:0,height:0};
    let tempCanvas = document.createElement("canvas");
    let tempCtx = tempCanvas.getContext("2d");
    tempCtx.font = Bitmap.prototype._makeFontNameText.call({
        fontSize:fontSize,
        fontFace:fontFace,
        fontItalic:fontItalic,
        fontBold:fontBold
    });
    if (arrangement==0) {//横排
        let result = tempCtx.measureText(text);
        tempData.width = result.width;
        tempData.height = Math.floor(fontSize*96/72);
    } else {//竖排
        let maxWidth = 0;
        for (let i=0,result;i<text.length;i++) {
            result = tempCtx.measureText(text[i]);
            if (result.width>maxWidth) {
                maxWidth=result.width;
            }
        }
        tempData.width = maxWidth;
        tempData.height = Math.floor(fontSize * text.length + 2*outlineWidth*(text.length - 1));
    }
    //增加描边宽度
    tempData.width += outlineWidth*2;
    tempData.height += outlineWidth*2;
    return tempData;
};
Bitmap.rotateBitmapQJ_D90 = function(orginBitmap) {
    const w = orginBitmap.width;
    const h = orginBitmap.height;
    const bitmap = new Bitmap(h,w);
    const context = bitmap._context;
    context.save();
    context.translate(0,w);
    context.rotate(-90*Math.PI/180);
    context.drawImage(orginBitmap._canvas?orginBitmap._canvas:orginBitmap._image,0,0,w,h,0,0,w,h);
    context.restore();
    bitmap._baseTexture.update();
    return bitmap;
};
Bitmap.prototype._makeFontNameText = function() {
    const italic = this.fontItalic ? "Italic " : "";
    const bold = this.fontBold ? "Bold " : "";
    return italic + bold + this.fontSize + "px " + this.fontFace;
};
//=============================================================================
//
//=============================================================================
Window_ForImgText_MPMZ.prototype = Object.create(Window_Base.prototype);
Window_ForImgText_MPMZ.prototype.constructor = Window_ForImgText_MPMZ;
Window_ForImgText_MPMZ.prototype.initialize = function() {
    this._MPMZMode = true;
    if (isMV) Window_Base.prototype.initialize.call(this, 0, 0, 1000, 1000);
    else Window_Base.prototype.initialize.call(this,new Rectangle(0, 0, 1000, 1000));
};
Window_ForImgText_MPMZ.prototype.getTextWidthEx_MPMZ = function(text) {
    return this.drawTextEx(text, 0, 0)+
            Math.max(((this.contents.fontItalic||this.contents.fontBold)?this.contents.fontSize*0.14:0),this.contents.outlineWidth+2);
};
Window_ForImgText_MPMZ.prototype.getTextHeightEx_MPMZ = function(text) {
    return this.calcTextHeight({index:0,x:0,y:0,left:0,text:this.convertEscapeCharacters(text)}, false);
};
Window_ForImgText_MPMZ.prototype.resetFontSettings_MPMZ = function(fontColor,fontSize,outlineColor,outlineWidth,
    fontFace,fontItalic,fontBold) {
    this.contents.textColor = fontColor;
    this.contents.fontSize = fontSize;
    this.contents.outlineColor = outlineColor;
    this.contents.outlineWidth = outlineWidth;
    this.contents.fontFace = fontFace;
    this.contents.fontItalic = fontItalic;
    this.contents.fontBold = fontBold;
};
Window_ForImgText_MPMZ.prototype.resetFontSettings = function() {
    //nothing
};
Window_ForImgText_MPMZ.prototype.processEscapeCharacter = function(code, textState) {
    Window_Base.prototype.processEscapeCharacter.apply(this, arguments);
    if (!this._MPMZMode) return;
    switch (code) {
    case 'TC':
        this.contents.textColor = this.obtainEscapeParamNormal_MPMZ(textState);
        break;
    case 'FS':
        this.contents.fontSize = parseInt(this.obtainEscapeParamNormal_MPMZ(textState));
        textState.x += Math.max(
            ((this.contents.fontItalic||this.contents.fontBold)?this.contents.fontSize*0.14:this.contents.fontSize*0.05),
            this.contents.outlineWidth+2);
        break;
    case 'OC':
        this.contents.outlineColor = this.obtainEscapeParamNormal_MPMZ(textState);
        break;
    case 'OW':
        this.contents.outlineWidth = parseInt(this.obtainEscapeParamNormal_MPMZ(textState));
        break;
    case 'FF':
        this.contents.fontFace = this.obtainEscapeParamNormal_MPMZ(textState);
        break;
    case 'FI':
        this.contents.fontItalic = this.obtainEscapeParamNormal_MPMZ(textState)==="1";
        break;
    case 'FB':
        this.contents.fontBold = this.obtainEscapeParamNormal_MPMZ(textState)==="1";
        break;
    }
};
Window_ForImgText_MPMZ.prototype.obtainEscapeParamNormal_MPMZ = function(textState) {
    var arr = /\[([^\]]*)\]/.exec(textState.text.slice(textState.index));
    if (arr) {
        textState.index += arr[0].length;
        return arr[0].slice(1,-1);
    } else {
        return '';
    }
};
if (isMV) {
Window_ForImgText_MPMZ.prototype.calcTextHeight = function(textState, all) {
    var lastHeight = Window_Base.prototype.calcTextHeight.apply(this,arguments);
    var lastFontSize = this.contents.fontSize;
    var textHeight = 0;
    var lines = textState.text.slice(textState.index).split('\n');
    var maxLines = all ? lines.length : 1;
    for (var i = 0; i < maxLines; i++) {
        var maxFontSize = this.contents.fontSize;
        var regExp = /\x1b({|}|FS)(\[(\d+)])?/gi;
        for (;;) {
            var array = regExp.exec(lines[i]);
            if (array) {
                if (array[1] === 'FS') {
                    this.contents.fontSize = parseInt(array[3]);
                }
                if (maxFontSize < this.contents.fontSize) {
                    maxFontSize = this.contents.fontSize;
                }
            } else {
                break;
            }
        }
        textHeight += maxFontSize + 8;
    }

    this.contents.fontSize = lastFontSize;
    return Math.max(textHeight,lastHeight);
};
}
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//mz
//=============================================================================
if (Imported.QJLighting) {
(()=>{
//=============================================================================
//mapProjectile to lightning layer
//=============================================================================
$.Spriteset_Map_createTimer_Lightning = Spriteset_Map.prototype.createTimer;
Spriteset_Map.prototype.createTimer = function() {
    let container = this.lightSystemSprite.mapProjectileLightningContainer = new PIXI.Sprite();
    container.x = QJ.LL.standardExpand/2;
    container.y = QJ.LL.standardExpand/2;
    this.lightSystemSprite.addChildAt(container,Math.max(this.lightSystemSprite.children.length-2,0));
    $.Spriteset_Map_createTimer_Lightning.call(this);
};
$.Spriteset_Map_createBulletQJExtra_Lightning = Spriteset_Map.prototype.createBulletQJExtra;
Spriteset_Map.prototype.createBulletQJExtra = function(index,type,data,spriteData) {
    $.Spriteset_Map_createBulletQJExtra_Lightning.apply(this,arguments);
    if (data.data.z==="L") {
        if (this.lightSystemSprite) {
            this.lightSystemSprite.mapProjectileLightningContainer.addChild(spriteData);
            this._4ContainerQJ.addOnlyEffectChild(spriteData);
        } else {
            this._4ContainerQJ.addChild(spriteData);
        }
    }
};
$.Spriteset_Map_findBulletContainerQJ = Spriteset_Map.prototype.findBulletContainerQJ;
Spriteset_Map.prototype.findBulletContainerQJ = function(index) {
    let data = $gameMap.bulletQJ(index);
    let container = $.Spriteset_Map_findBulletContainerQJ.apply(this,arguments);
    if (!!container) return container;
    else if (data.data.z==="L") return this.lightSystemSprite.mapProjectileLightningContainer;
    else return null;
};
$.Sprite_QJLightSystem_update = Sprite_QJLightSystem.prototype.update;
Sprite_QJLightSystem.prototype.update = function() {
    $.Sprite_QJLightSystem_update.apply(this,arguments);
    if (this.visible) {
        this.mapProjectileLightningContainer.children.forEach((child)=>{
            if (child.update) child.update();
        });
    }
};
//=============================================================================
//mini light
//=============================================================================
Game_QJBulletMZ.prototype.createLightingData = function() {
    if (!this.data.light) return;
    if (this.data.light.miniLightId) {
        QJ.LL.miniLightObject(this.data.light.miniLightId,"QJMapProjectileMZ",{
            bulletIndex:this.index
        });
    } else if (this.data.light.lightId) {
        QJ.LL.lightObject(this.data.light.lightId,this.index,"QJMapProjectileMZ",{
            bulletIndex:this.index
        });
    }
}
$.Game_QJBulletMZ_afterDeal_ForQJLighting = Game_QJBulletMZ.prototype.afterDeal;
Game_QJBulletMZ.prototype.afterDeal = function() {
    $.Game_QJBulletMZ_afterDeal_ForQJLighting.apply(this,arguments);
    this.createLightingData();
}
Game_QJBulletMZ.prototype.direction = function() {
    return 2;
}
Game_QJBulletMZ.prototype.screenX = function() {
    return this.screenXShowQJ();
}
Game_QJBulletMZ.prototype.screenY = function() {
    return this.screenYShowQJ();
}
//=============================================================================
//mini light
//=============================================================================
QJ.LL.miniLightObjectFunction["QJMapProjectileMZ"] = {
    //update:function() {},
    updatePosition:function(od) {
        let bulletData = $gameMap.bulletQJ(this.attach.bulletIndex);
        if (!bulletData) {
            this.setDead();
            return;
        }
        this.x = bulletData.screenXQJ()+od.offsetX.get();
        this.y = bulletData.screenYQJ()+od.offsetY.get();
    },
    updateRotation:function(od) {
        let bulletData = $gameMap.bulletQJ(this.attach.bulletIndex);
        if (!bulletData) {
            this.setDead();
            return;
        }
        if (bulletData.data.light.synRotation) {
            this.rotation = bulletData.rotationMove*Math.PI/180;
        } else {
            this.rotation = od.rotation.get();
        }
    },
    //updateScale:function() {},
    //updateOpacity:function() {},
    //setDead:function() {}
}
//=============================================================================
//light
//=============================================================================
$.QJ_LL_getCharacter = QJ.LL.getCharacter;
QJ.LL.getCharacter = function(id) {
    if (typeof id === 'string'&&id[0]==='b') {
        return $gameMap.bulletQJ(Number(id.slice(1)));
    } else {
        return $.QJ_LL_getCharacter(id);
    }
}
QJ.LL.lightObjectFunction["QJMapProjectileMZ"] = {
    makeName:(value)=>'b'+value,
    updateRotation:function(od,character,d) {
        let bulletData = $gameMap.bulletQJ(this.attach.bulletIndex);
        if (!bulletData) return;
        if (bulletData.data.light.synRotation) {
            this.rotation = bulletData.rotationMove*Math.PI/180;
        }
    }
}
//=============================================================================
//
//=============================================================================
})();
}
//=============================================================================
//mv
//=============================================================================
if (Imported.QJLayerLight) {
//==========================================================
//
//==========================================================
(()=>{
//==========================================================
//
//==========================================================
$.Game_QJBulletMZ_afterDeal_ForQJLighting = Game_QJBulletMZ.prototype.afterDeal;
Game_QJBulletMZ.prototype.afterDeal = function() {
    $.Game_QJBulletMZ_afterDeal_ForQJLighting.apply(this,arguments);
    this.createLightingData();
};
Game_QJBulletMZ.prototype.createLightingData = function() {
    if (!this.data.light) return;
    if (this.data.light.miniLightId) {
        QJ.LL.tempLightObject(this.data.light.miniLightId,this,this.data.light);
    } else if (this.data.light.lightId) {
        QJ.LL.tempLightObjectNormal(this.data.light.lightId,"b"+this.index,"QJMapProjectileMZ",{
            bulletIndex:this.index
        });
    }
};
Game_QJBulletMZ.prototype.isDeadQJ = function() {
    return this.dead;
};
Game_QJBulletMZ.prototype.lightRotation = function() {
    return this.rotationMove*Math.PI/180;
};
Game_QJBulletMZ.prototype.needSynRotation = function() {
    return this.data.light && this.data.light.synRotation === true;
};
Game_QJBulletMZ.prototype.mapShowXQJ = function() {
    return this.x;
};
Game_QJBulletMZ.prototype.mapShowYQJ = function() {
    return this.y;
};
Game_QJBulletMZ.prototype.direction = function() {
    return 0;
};
//==========================================================
//
//==========================================================
$.QJ_LL_getCharacter = QJ.LL.getCharacter;
QJ.LL.getCharacter = function(id) {
    if (typeof id === 'string'&&id[0]==='b') {
        return $gameMap.bulletQJ(Number(id.slice(1)));
    } else {
        return $.QJ_LL_getCharacter(id);
    }
}
//==========================================================
//
//==========================================================
$.Spriteset_Map_createTimer_Lightning = Spriteset_Map.prototype.createTimer;
Spriteset_Map.prototype.createTimer = function() {
    let container = this.lightSystemSprite.mapProjectileLightningContainer = new PIXI.Sprite();
    container.x = QJ.LL.standardExpand/2;
    container.y = QJ.LL.standardExpand/2;
    this.lightSystemSprite.addChildAt(container,Math.max(this.lightSystemSprite.children.length-2,0));
    $.Spriteset_Map_createTimer_Lightning.call(this);
};
$.Spriteset_Map_createBulletQJExtra_Lightning = Spriteset_Map.prototype.createBulletQJExtra;
Spriteset_Map.prototype.createBulletQJExtra = function(index,type,data,spriteData) {
    $.Spriteset_Map_createBulletQJExtra_Lightning.apply(this,arguments);
    if (data.data.z==="L") {
        if (this.lightSystemSprite) {
            this.lightSystemSprite.mapProjectileLightningContainer.addChild(spriteData);
            this._4ContainerQJ.addOnlyEffectChild(spriteData);
        } else {
            this._4ContainerQJ.addChild(spriteData);
        }
    }
};
$.Spriteset_Map_findBulletContainerQJ = Spriteset_Map.prototype.findBulletContainerQJ;
Spriteset_Map.prototype.findBulletContainerQJ = function(index) {
    let data = $gameMap.bulletQJ(index);
    let container = $.Spriteset_Map_findBulletContainerQJ.apply(this,arguments);
    if (!!container) return container;
    else if (data.data.z==="L") return this.lightSystemSprite.mapProjectileLightningContainer;
    else return null;
};
$.Sprite_QJLightSystem_update = Sprite_QJLightSystem.prototype.update;
Sprite_QJLightSystem.prototype.update = function() {
    $.Sprite_QJLightSystem_update.apply(this,arguments);
    if (this.visible) {
        this.mapProjectileLightningContainer.children.forEach((child)=>{
            if (child.update) child.update();
        });
    }
};
//==========================================================
//
//==========================================================
})();
//==========================================================
//
//==========================================================
}
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
if (isMV) {
    $.Game_Event_initialize = Game_Event.prototype.initialize;
    Game_Event.prototype.initialize = function(mapId, eventId) {
        this._commonEventQJ = new Array();
        $.Game_Event_initialize.apply(this,arguments);
    };
    Game_Event.prototype.steupCEQJ = function(value,reSetData,extraData) {
        let listData = this.event().pages[value-1];
        if (listData) {
            let interpreter = new Game_InterpreterCEQJ(value-1,reSetData,extraData);
            interpreter.setup(listData.list,this.eventId());
            if (!interpreter.isRunning()) interpreter.terminate();
            this._commonEventQJ.push(interpreter);
        }
    };
    $.Game_Event_updateParallel = Game_Event.prototype.updateParallel;
    Game_Event.prototype.updateParallel = function() {
        $.Game_Event_updateParallel.apply(this,arguments);
        this.updateCEQJ();
    };
	/*
    Game_Event.prototype.updateCEQJ = function() {
        if (this._commonEventQJ.length>0) {
            for (let idata=this._commonEventQJ,il=idata.length,i=0;i<il;i++) {
                if (idata[i]) {
                    idata[i].update();
                    if (idata[i].overLifeQJ) {
                        idata.splice(i,1);
                        i--;
                        il--;
                    }
                }
            }
        }
    };
	*/
	Game_Event.prototype.updateCEQJ = function() {
	  const idata = this._commonEventQJ;
	  if (!Array.isArray(idata) || idata.length === 0) return;
	  for (let i = idata.length - 1; i >= 0; i--) {
		const itp = idata[i];
		if (!itp) { idata.splice(i, 1); continue; }

		itp.update();

		if (itp.overLifeQJ) {
		  idata.splice(i, 1);
		}
	  }
	};
	
    //=============================================================================
    //
    //=============================================================================
    $.Game_Map_initialize = Game_Map.prototype.initialize;
    Game_Map.prototype.initialize = function() {
        this._commonEventQJ = new Array();
        $.Game_Map_initialize.apply(this,arguments);
    };
    Game_Map.prototype.steupCEQJ = function(value,eid,reSetData,extraData) {
        if (!!$dataCommonEvents[value]) {
            let interpreter = new Game_InterpreterCEQJX(value,reSetData||{},extraData||{});
            interpreter.setup($dataCommonEvents[value].list,eid);
            if (!interpreter.isRunning()) interpreter.terminate();
            this._commonEventQJ.push(interpreter);
        }
    };

    $.Game_Map_update = Game_Map.prototype.update;
    Game_Map.prototype.update = function(sceneActive) {
        $.Game_Map_update.apply(this,arguments);
        if (this._commonEventQJ.length>0) {
            for (let idata=this._commonEventQJ,il=idata.length,i=0;i<il;i++) {
                if (idata[i]) {
                    idata[i].update();
                    if (idata[i].overLifeQJ) {
                        idata.splice(i,1);
                        i--;
                        il--;
                    }
                }
            }
        }
    }
/*
    $.Game_Map_update = Game_Map.prototype.update;
    Game_Map.prototype.update = function(sceneActive) {
      $.Game_Map_update.apply(this, arguments);
      const list = this._commonEventQJ || (this._commonEventQJ = []);
      for (let i = list.length - 1; i >= 0; i--) {
        const obj = list[i];
        if (!obj) { list.splice(i, 1); continue; }
        if (typeof obj.update === 'function') obj.update();
        if (obj.overLifeQJ) {
          list.splice(i, 1);
        }
      }
    };
*/
	
    $.Game_Interpreter_executeCommand = Game_Interpreter.prototype.executeCommand;
    Game_Interpreter.prototype.executeCommand = function() {
        QJ.Pointer=this;
        return $.Game_Interpreter_executeCommand.apply(this,arguments);
    };
}
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
})(QJ.MPMZ.reWrite);
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
if (true) {
//=============================================================================
//适配MV，来自QJ-CoreMZ.js
//=============================================================================
/*!
 * SAT.js - v0.9.0
 * License MIT
 * url https://github.com/jriecken/sat-js
 * build by QiuJiu
*/
//这里的命名空间与mv的弹幕插件冲突，为保证兼容我已修改mv的弹幕插件。
if (QJ.MPMZ.isMV) {
    //=================================================
    function SATVector(x, y) {
        this['x'] = x || 0;
        this['y'] = y || 0;
    }
    SATVector.prototype.copy = function (other) {
        this['x'] = other['x'];
        this['y'] = other['y'];
        return this;
    };
    SATVector.prototype.clone = function () {
        return new SATVector(this['x'], this['y']);
    };
    SATVector.prototype.perp = function () {
        var x = this['x'];
        this['x'] = this['y'];
        this['y'] = -x;
        return this;
    };
    SATVector.prototype.rotate = function (angle) {
        var x = this['x'];
        var y = this['y'];
        this['x'] = x * Math.cos(angle) - y * Math.sin(angle);
        this['y'] = x * Math.sin(angle) + y * Math.cos(angle);
        return this;
    };
    SATVector.prototype.reverse = function () {
        this['x'] = -this['x'];
        this['y'] = -this['y'];
        return this;
    };
    SATVector.prototype.normalize = function () {
        var d = this.len();
        if (d > 0) {
            this['x'] = this['x'] / d;
            this['y'] = this['y'] / d;
        }
        return this;
    };
    SATVector.prototype.add = function (other) {
        this['x'] += other['x'];
        this['y'] += other['y'];
        return this;
    };
    SATVector.prototype.sub = function (other) {
        this['x'] -= other['x'];
        this['y'] -= other['y'];
        return this;
    };
    SATVector.prototype.scale = function (x, y) {
        this['x'] *= x;
        this['y'] *= typeof y != 'undefined' ? y : x;
        return this;
    };
    SATVector.prototype.project = function (other) {
        var amt = this.dot(other) / other.len2();
        this['x'] = amt * other['x'];
        this['y'] = amt * other['y'];
        return this;
    };
    SATVector.prototype.projectN = function (other) {
        var amt = this.dot(other);
        this['x'] = amt * other['x'];
        this['y'] = amt * other['y'];
        return this;
    };
    SATVector.prototype.reflect = function (axis) {
        var x = this['x'];
        var y = this['y'];
        this.project(axis).scale(2);
        this['x'] -= x;
        this['y'] -= y;
        return this;
    };
    SATVector.prototype.reflectN = function (axis) {
        var x = this['x'];
        var y = this['y'];
        this.projectN(axis).scale(2);
        this['x'] -= x;
        this['y'] -= y;
        return this;
    };
    SATVector.prototype.dot = function (other) {
        return this['x'] * other['x'] + this['y'] * other['y'];
    };
    SATVector.prototype.len2 = function () {
        return this.dot(this);
    };
    SATVector.prototype.len = function () {
        return Math.sqrt(this.len2());
    };
    //=================================================
    function SATCircle(pos, r) {
        this['pos'] = pos || new SATVector();
        this['r'] = r || 0;
        this['offset'] = new SATVector();
    }
    SATCircle.prototype.getAABBAsBox = function () {
        var r = this['r'];
        var corner = this['pos'].clone().add(this['offset']).sub(new SATVector(r, r));
        return new SATBox(corner, r * 2, r * 2);
    };
    SATCircle.prototype.getAABB = function () {
        return this.getAABBAsBox().toPolygon();
    };
    SATCircle.prototype.setOffset = function (offset) {
        this['offset'] = offset;
        return this;
    };
    //=================================================
    function SATPolygon(pos, points) {
        this['pos'] = pos || new SATVector();
        this['angle'] = 0;
        this['offset'] = new SATVector();
        this.setPoints(points || []);
    }
    SATPolygon.prototype.setPoints = function (points) {
        var lengthChanged = !this['points'] || this['points'].length !== points.length;
        if (lengthChanged) {
            var i;
            var calcPoints = this['calcPoints'] = []; 
            var edges = this['edges'] = [];
            var normals = this['normals'] = [];
            for (i = 0; i < points.length; i++) {
                var p1 = points[i];
                var p2 = i < points.length - 1 ? points[i + 1] : points[0];
                if (p1 !== p2 && p1.x === p2.x && p1.y === p2.y) {
                    points.splice(i, 1);
                    i -= 1;
                    continue;
                }
                calcPoints.push(new SATVector());
                edges.push(new SATVector());
                normals.push(new SATVector());
            }
        }
        this['points'] = points;
        this._recalc();
        return this;
    };
    SATPolygon.prototype.setAngle = function (angle) {
        this['angle'] = angle;
        this._recalc();
        return this;
    };
    SATPolygon.prototype.setOffset = function (offset) {
        this['offset'] = offset;
        this._recalc();
        return this;
    };
    SATPolygon.prototype.rotate = function (angle) {
        var points = this['points'];
        var len = points.length;
        for (var i = 0; i < len; i++) {    
            points[i].rotate(angle);  
        }  
        this._recalc();  
        return this;
    };
    SATPolygon.prototype.translate = function (x, y) {  
        var points = this['points'];  
        var len = points.length;  
        for (var i = 0; i < len; i++) {    
            points[i]['x'] += x;    
            points[i]['y'] += y;  
        }  
        this._recalc();  
        return this;
    };
    SATPolygon.prototype._recalc = function () {  
        var calcPoints = this['calcPoints'];  
        var edges = this['edges'];  
        var normals = this['normals'];  
        var points = this['points'];  
        var offset = this['offset'];  
        var angle = this['angle'];  
        var len = points.length;  
        var i;  
        for (i = 0; i < len; i++) {    
            var calcPoint = calcPoints[i].copy(points[i]);    
            calcPoint['x'] += offset['x'];    
            calcPoint['y'] += offset['y'];    
            if (angle !== 0) {      
                calcPoint.rotate(angle);    
            }  
        }  
        for (i = 0; i < len; i++) {    
            var p1 = calcPoints[i];    
            var p2 = i < len - 1 ? calcPoints[i + 1] : calcPoints[0];    
            var e = edges[i].copy(p2).sub(p1);    
            normals[i].copy(e).perp().normalize();  
        }  
        return this;
    };
    SATPolygon.prototype.centerWithOffsetAndRotation = function () {  
        var calcPoints = this['calcPoints'];
        var centerPoint = [0,0]; 
        for (let i of calcPoints) {
            centerPoint[0]+=i.x;
            centerPoint[1]+=i.y;
        }
        centerPoint[0]/=calcPoints.length;
        centerPoint[1]/=calcPoints.length;
        centerPoint[0]+=this.pos.x;
        centerPoint[1]+=this.pos.y;
        return centerPoint;
    };
    SATPolygon.prototype.getAABBAsBox = function () {  
        var points = this['calcPoints'];  
        var len = points.length;  
        var xMin = points[0]['x'];  
        var yMin = points[0]['y'];  
        var xMax = points[0]['x'];  
        var yMax = points[0]['y'];  
        for (var i = 1; i < len; i++) {    
            var point = points[i];    
            if (point['x'] < xMin) {      
                xMin = point['x'];    
            } else if (point['x'] > xMax) {      
                xMax = point['x'];    
            }    
            if (point['y'] < yMin) {      
                yMin = point['y'];    
            } else if (point['y'] > yMax) {      
                yMax = point['y'];    
            }  
        }
        return new SATBox(this['pos'].clone().add(new SATVector(xMin, yMin)), xMax - xMin, yMax - yMin);
    };
    SATPolygon.prototype.getAABB = function () {  
        return this.getAABBAsBox().toPolygon();
    };
    SATPolygon.prototype.getCentroid = function () {  
        var points = this['calcPoints'];  
        var len = points.length;  
        var cx = 0;  
        var cy = 0;  
        var ar = 0;  
        for (var i = 0; i < len; i++) {    
            var p1 = points[i];    
            var p2 = i === len - 1 ? points[0] : points[i + 1];    
            var a = p1['x'] * p2['y'] - p2['x'] * p1['y'];    
            cx += (p1['x'] + p2['x']) * a;    
            cy += (p1['y'] + p2['y']) * a;    
            ar += a;  
        }  
        ar = ar * 3;  
        cx = cx / ar;  
        cy = cy / ar;  
        return new SATVector(cx, cy);
    };
    //=================================================
    function SATBox(pos, w, h) {  
        this['pos'] = pos || new SATVector();  
        this['w'] = w || 0;  
        this['h'] = h || 0;
    }
    SATBox.prototype.toPolygon = function () {  
        var pos = this['pos'];  
        var w = this['w'];  
        var h = this['h'];  
        return new SATPolygon(new SATVector(pos['x'], pos['y']), [    
            new SATVector(), new SATVector(w, 0),    
            new SATVector(w, h), 
            new SATVector(0, h)  ]);
    };
    //=================================================
    function SATResponse() {  
        this['a'] = null;  
        this['b'] = null;  
        this['overlapN'] = new SATVector();  
        this['overlapV'] = new SATVector();  
        this.clear();
    }
    SATResponse.prototype.clear = function () {  
        this['aInB'] = true;  
        this['bInA'] = true;  
        this['overlap'] = Number.MAX_VALUE;  
        return this;
    };
    //=================================================
    var T_VECTORS = [];
    for (var i = 0; i < 10; i++) { 
        T_VECTORS.push(new SATVector()); 
    }
    var T_ARRAYS = [];
    for (var i = 0; i < 5; i++) { 
        T_ARRAYS.push([]); 
    }
    var T_RESPONSE = new SATResponse();
    var TEST_POINT = new SATBox(new SATVector(), 0.000001, 0.000001).toPolygon();
    //=================================================
    function flattenPointsOn(points, normal, result) {  
        var min = Number.MAX_VALUE;  
        var max = -Number.MAX_VALUE;  
        var len = points.length;  
        for (var i = 0; i < len; i++) {    
            var dot = points[i].dot(normal);    
            if (dot < min) { 
                min = dot; 
            }    
            if (dot > max) { 
                max = dot; 
            }  
        }  
        result[0] = min; 
        result[1] = max;
    }
    //=================================================
    function isSeparatingAxis(aPos, bPos, aPoints, bPoints, axis, response) {  
        var rangeA = T_ARRAYS.pop();  
        var rangeB = T_ARRAYS.pop();  
        var offsetV = T_VECTORS.pop().copy(bPos).sub(aPos);  
        var projectedOffset = offsetV.dot(axis);  
        flattenPointsOn(aPoints, axis, rangeA);  
        flattenPointsOn(bPoints, axis, rangeB);  
        rangeB[0] += projectedOffset;  
        rangeB[1] += projectedOffset;  
        if (rangeA[0] > rangeB[1] || rangeB[0] > rangeA[1]) {    
            T_VECTORS.push(offsetV);    
            T_ARRAYS.push(rangeA);    
            T_ARRAYS.push(rangeB);    
            return true;  
        }  
        if (response) {    
            var overlap = 0;    
            if (rangeA[0] < rangeB[0]) {      
                response['aInB'] = false;      
                if (rangeA[1] < rangeB[1]) {        
                    overlap = rangeA[1] - rangeB[0];        
                    response['bInA'] = false;      
                } else {        
                    var option1 = rangeA[1] - rangeB[0];        
                    var option2 = rangeB[1] - rangeA[0];        
                    overlap = option1 < option2 ? option1 : -option2;      
                }    
            } else {      
                response['bInA'] = false;      
                if (rangeA[1] > rangeB[1]) {        
                    overlap = rangeA[0] - rangeB[1];        
                    response['aInB'] = false;      
                } else {        
                    var option1 = rangeA[1] - rangeB[0];        
                    var option2 = rangeB[1] - rangeA[0];        
                    overlap = option1 < option2 ? option1 : -option2;      
                }    
            }    
            var absOverlap = Math.abs(overlap);    
            if (absOverlap < response['overlap']) {      
                response['overlap'] = absOverlap;      
                response['overlapN'].copy(axis);      
                if (overlap < 0) {        
                    response['overlapN'].reverse();
                }    
            }  
        }  
        T_VECTORS.push(offsetV);  
        T_ARRAYS.push(rangeA);  
        T_ARRAYS.push(rangeB);  
        return false;
    }
    //=================================================
    function voronoiRegion(line, point) {  
        var len2 = line.len2();  
        var dp = point.dot(line);  
        if (dp < 0) { 
            return LEFT_VORONOI_REGION; 
        } else if (dp > len2) { 
            return RIGHT_VORONOI_REGION; 
        } else { 
            return MIDDLE_VORONOI_REGION; 
        }
    }
    //=================================================
    var LEFT_VORONOI_REGION = -1;
    var MIDDLE_VORONOI_REGION = 0;
    var RIGHT_VORONOI_REGION = 1;
    //=================================================
    function pointInCircle(p, c) {  
        var differenceV = T_VECTORS.pop().copy(p).sub(c['pos']).sub(c['offset']);  
        var radiusSq = c['r'] * c['r'];  
        var distanceSq = differenceV.len2();  
        T_VECTORS.push(differenceV);  
        return distanceSq <= radiusSq;
    }
    //=================================================
    function pointInPolygon(p, poly) {  
        TEST_POINT['pos'].copy(p);  
        T_RESPONSE.clear();  
        var result = SATtestPolygonPolygon(TEST_POINT, poly, T_RESPONSE);  
        if (result) {    
            result = T_RESPONSE['aInB'];  
        }  
        return result;
    }
    //=================================================
    function SATtestCircleCircle(a, b, response) {  
        var differenceV = T_VECTORS.pop().copy(b['pos']).add(b['offset']).sub(a['pos']).sub(a['offset']);  
        var totalRadius = a['r'] + b['r'];  
        var totalRadiusSq = totalRadius * totalRadius;  
        var distanceSq = differenceV.len2();  
        if (distanceSq > totalRadiusSq) {    
            T_VECTORS.push(differenceV);    
            return false;  
        }  
        if (response) {    
            var dist = Math.sqrt(distanceSq);    
            response['a'] = a;    
            response['b'] = b;    
            response['overlap'] = totalRadius - dist;    
            response['overlapN'].copy(differenceV.normalize());    
            response['overlapV'].copy(differenceV).scale(response['overlap']);    
            response['aInB'] = a['r'] <= b['r'] && dist <= b['r'] - a['r'];    
            response['bInA'] = b['r'] <= a['r'] && dist <= a['r'] - b['r'];  
        }  
        T_VECTORS.push(differenceV);  
        return true;
    }
    //=================================================
    function SATtestPolygonCircle(polygon, circle, response) {  
        var circlePos = T_VECTORS.pop().copy(circle['pos']).add(circle['offset']).sub(polygon['pos']);  
        var radius = circle['r'];  
        var radius2 = radius * radius;  
        var points = polygon['calcPoints'];  
        var len = points.length;  
        var edge = T_VECTORS.pop();  
        var point = T_VECTORS.pop();  
        for (var i = 0; i < len; i++) {    
            var next = i === len - 1 ? 0 : i + 1;    
            var prev = i === 0 ? len - 1 : i - 1;    
            var overlap = 0;    var overlapN = null;    
            edge.copy(polygon['edges'][i]);    
            point.copy(circlePos).sub(points[i]);    
            if (response && point.len2() > radius2) {      
                response['aInB'] = false;    
            }    
            var region = voronoiRegion(edge, point);    
            if (region === LEFT_VORONOI_REGION) {      
                edge.copy(polygon['edges'][prev]);      
                var point2 = T_VECTORS.pop().copy(circlePos).sub(points[prev]);      
                region = voronoiRegion(edge, point2);      
                if (region === RIGHT_VORONOI_REGION) {        
                    var dist = point.len();        
                    if (dist > radius) {          
                        T_VECTORS.push(circlePos);          
                        T_VECTORS.push(edge);          
                        T_VECTORS.push(point);          
                        T_VECTORS.push(point2);          
                        return false;        
                    } else if (response) {          
                        response['bInA'] = false;          
                        overlapN = point.normalize();          
                        overlap = radius - dist;        
                    }      
                }      
                T_VECTORS.push(point2);    
            } else if (region === RIGHT_VORONOI_REGION) {      
                edge.copy(polygon['edges'][next]);      
                point.copy(circlePos).sub(points[next]);      
                region = voronoiRegion(edge, point);      
                if (region === LEFT_VORONOI_REGION) {        
                    var dist = point.len();        
                    if (dist > radius) {          
                        T_VECTORS.push(circlePos);          
                        T_VECTORS.push(edge);          
                        T_VECTORS.push(point);          
                        return false;        
                    } else if (response) {          
                        response['bInA'] = false;          
                        overlapN = point.normalize();          
                        overlap = radius - dist;        
                    }      
                }    
            } else {      
                var normal = edge.perp().normalize();      
                var dist = point.dot(normal);      
                var distAbs = Math.abs(dist);      
                if (dist > 0 && distAbs > radius) {        
                    T_VECTORS.push(circlePos);        
                    T_VECTORS.push(normal);        
                    T_VECTORS.push(point);        
                    return false;      
                } else if (response) {        
                    overlapN = normal;        
                    overlap = radius - dist;        
                    if (dist >= 0 || overlap < 2 * radius) {          
                        response['bInA'] = false;        
                    }      
                }    
            }    
            if (overlapN && response && Math.abs(overlap) < Math.abs(response['overlap'])) {      
                response['overlap'] = overlap;      
                response['overlapN'].copy(overlapN);    
            }  
        }  
        if (response) {    
            response['a'] = polygon;    
            response['b'] = circle;    
            response['overlapV'].copy(response['overlapN']).scale(response['overlap']);  
        }
        T_VECTORS.push(circlePos);  
        T_VECTORS.push(edge);  
        T_VECTORS.push(point);  
        return true;
    }
    //=================================================
    function SATtestCirclePolygon(circle, polygon, response) {  
        var result = SATtestPolygonCircle(polygon, circle, response);  
        if (result && response) {    
            var a = response['a'];    
            var aInB = response['aInB'];    
            response['overlapN'].reverse();    
            response['overlapV'].reverse();    
            response['a'] = response['b'];    
            response['b'] = a;    
            response['aInB'] = response['bInA'];    
            response['bInA'] = aInB;  
        }  
        return result;
    }
    //=================================================
    function SATtestPolygonPolygon(a, b, response) {  
        var aPoints = a['calcPoints'];  
        var aLen = aPoints.length;  
        var bPoints = b['calcPoints'];  
        var bLen = bPoints.length;  
        for (var i = 0; i < aLen; i++) {    
            if (isSeparatingAxis(a['pos'], b['pos'], aPoints, bPoints, a['normals'][i], response)) {      
                return false;    
            }  
        }  
        for (var i = 0; i < bLen; i++) {    
            if (isSeparatingAxis(a['pos'], b['pos'], aPoints, bPoints, b['normals'][i], response)) {      
                return false;    
            }  
        }  
        if (response) {    
            response['a'] = a;    
            response['b'] = b;    
            response['overlapV'].copy(response['overlapN']).scale(response['overlap']);  
        }  
        return true;
    }
    //=================================================
}
if (QJ.MPMZ.isMV) {
    QJ.SAT = QJ.SAT || {};
    QJ.SAT.sat = new SATResponse();
    QJ.SAT.judge = function(bodyA,bodyB){
        QJ.SAT.sat.clear();
        if (bodyA.type==0&&bodyB.type==0) {
            QJ.SAT.sat.result = SATtestCircleCircle(bodyA,bodyB,QJ.SAT.sat);
        } else if (bodyA.type==1&&bodyB.type==1) {
            QJ.SAT.sat.result = SATtestPolygonPolygon(bodyA,bodyB,QJ.SAT.sat);
        } else if (bodyA.type==1&&bodyB.type==0) {
            QJ.SAT.sat.result = SATtestPolygonCircle(bodyA,bodyB,QJ.SAT.sat);
        }  else if (bodyA.type==0&&bodyB.type==1) {
            QJ.SAT.sat.result = SATtestCirclePolygon(bodyA,bodyB,QJ.SAT.sat);
        } 
        return QJ.SAT.sat;
    };
    QJ.SAT.setPostion = function(body,x,y){
        body.pos.x = x;
        body.pos.y = y;
    };
    QJ.SAT.pointInBody = function(point,body){
        if (body.type===0) {
            return this.pointInCircle(point,body);
        } else if (body.type===1) {
            return this.pointInPolygon(point,body);
        }
        return false;
    };
}
//=========================================================================
//=========================================================================
//=========================================================================
QJ.SAT.box = function(x,y,boxType,isCCW = false){
    let body = null;
    if (boxType[0]=='C') {
        body = new SATCircle(new SATVector(x,y),boxType[1]);
        body.type = 0;
        body.dia = boxType[1];
    } else if (boxType[0]=='R') {
        body = isCCW?new SATPolygon(
            new SATVector(x,y), [
            new SATVector(-boxType[1]/2,-boxType[2]/2),
            new SATVector(-boxType[1]/2,+boxType[2]/2),
            new SATVector(+boxType[1]/2,+boxType[2]/2),
            new SATVector(+boxType[1]/2,-boxType[2]/2)
        ]):new SATPolygon(
            new SATVector(x,y), [
            new SATVector(-boxType[1]/2,-boxType[2]/2),
            new SATVector(+boxType[1]/2,-boxType[2]/2),
            new SATVector(+boxType[1]/2,+boxType[2]/2),
            new SATVector(-boxType[1]/2,+boxType[2]/2)
        ]);
        body.type = 1;
        body.w = boxType[1];
        body.h = boxType[2];
        body.dl = Math.atan(body.w/body.h);                      //对角线角度
        body.dia = Math.sqrt(body.w*body.w+body.h*body.h)/2;     //对角线长度
    } else if (boxType[0] === 'E') {
    const w = Number(boxType[1]);
    const h = Number(boxType[2]);
    const rx = w / 2;
    const ry = h / 2;

    // 分段数：可传 boxType[5]；否则按尺寸自适应，最低 12 段
    const n = Math.max(12, Number(boxType[5]) || Math.ceil((Math.abs(w) + Math.abs(h)) / 8));

    const pts = [];
    for (let i = 0; i < n; i++) {
        const t = (i / n) * Math.PI * 2;
        // 直接使用 w/2、h/2，负缩放会自然镜像
        pts.push(new SATVector(rx * Math.cos(t), ry * Math.sin(t)));
    }
    if (isCCW) pts.reverse();

    body = new SATPolygon(new SATVector(x, y), pts);
    body.type = 1;      // 多边形
    body.w = w;         // 供调试/计算用
    body.h = h;
    body.dia = Math.sqrt(w * w + h * h) / 2; // 统一风格的对角半径
    } else if (boxType[0] === 'S') {
        // ['S', R, startDeg, sweepDeg, anchorX?, anchorY?, segments?]
        const R = Number(boxType[1]);
        let startDeg = Number(boxType[2]) || 0;
        let sweepDeg = Number(boxType[3]) || 0;

        // 约束 sweep（SAT 要求凸多边形，推荐 ≤180°）
        const absSweep = Math.abs(sweepDeg);
        if (absSweep <= 0) {
        // 退化：当作点 / 极小三角，避免异常
        sweepDeg = 1;
        } else if (absSweep > 180) {
            // 你可以选择抛错 / 警告；这里自动夹到 180（更大角度建议拆两段）
            sweepDeg = (sweepDeg > 0 ? 180 : -180);
        }

        // 分段数（基于角度自适应；可被 boxType[6] 覆盖）
        const segHint = Number(boxType[6]) || 0;
        const nArc = segHint > 0 ? segHint : Math.max(6, Math.ceil(absSweep / 12)); // 每 ~12° 一个点

        // 角度转弧度
        const start = startDeg * Math.PI / 180;
        const sweep = sweepDeg * Math.PI / 180;
        const step = sweep / nArc;

        // 采样点：以中心为 (0,0)，先放中心点，再沿弧线采样，最后回到起点形成扇形
        const pts = [];
        pts.push(new SATVector(0, 0)); // 中心
        for (let i = 0; i <= nArc; i++) {
            const t = start + step * i;
            pts.push(new SATVector(R * Math.cos(t), R * Math.sin(t)));
        }

        // 负缩放导致的顶点方向纠正
        if (isCCW) pts.reverse();

        body = new SATPolygon(new SATVector(x, y), pts);
        body.type = 1; // 多边形
        // 可选：存储 R 供调试
        body.r = R;
		body.dia = R;
    }

    return body;
};
QJ.SAT.boxX = function(x,y,body,sx,sy,ax,ay,r){
    let newSATBody;
    if (body[0]=='C') {
        newSATBody = QJ.SAT.box(x,y,['C',body[1]*(sx+sy)/2]);
    } else if (body[0]=='R') {
        newSATBody = QJ.SAT.box(x,y,['R',body[1]*sx,body[2]*sy],sx*sy<0);
        newSATBody.setOffset(
            new SATVector(
                body[1]*sx*(0.5-ax),
                body[2]*sy*(0.5-ay)
            )
        );
        newSATBody.setAngle(r);
    } else if (body[0]=='E') {
     // ——— 新增：椭圆 —— ['E', w, h, anchorX?, anchorY?, segments?]		
        newSATBody = QJ.SAT.box(x, y, ['E', body[1]*sx, body[2]*sy, body[3], body[4], body[5]], sx*sy < 0);
        newSATBody.setOffset(new SATVector(
            body[1]*sx*(0.5-ax),
            body[2]*sy*(0.5-ay)
        ));
        newSATBody.setAngle(r);
    }
    // ——— 新增：扇形/扇区 —— ['S', R, startDeg, sweepDeg, anchorX?, anchorY?, segments?]
    else if (body[0]=='S') {
        // 圆半径按缩放取平均，和圆形分支保持一致（避免非等比缩放导致椭圆扇形）
        const R = body[1] * ((Math.abs(sx) + Math.abs(sy)) / 2);
        const startDeg = body[2];
        const sweepDeg = body[3];
        const segs     = body[6];

        newSATBody = QJ.SAT.box(x, y, ['S', R, startDeg, sweepDeg, ax, ay, segs], sx*sy < 0);

        // 用 2R × 2R 作为“宽高基准”做锚点偏移（与矩形逻辑一致）
        const width  = 2 * R * (sx >= 0 ? 1 : -1);
        const height = 2 * R * (sy >= 0 ? 1 : -1);
        newSATBody.setOffset(new SATVector(
            width  * (0.5 - ax),
            height * (0.5 - ay)
        ));
        newSATBody.setAngle(r);
    }

    return newSATBody;
};
//=========================================================================
//=========================================================================
//=========================================================================
if (QJ.MPMZ.isMV) {
    function AnimatedQJ() {
        this.initialize.apply(this, arguments);
    }
    AnimatedQJ.prototype.initialize = function(nameOrVertical,horizontal,frames,skipFrames = 0) {
        this.v = 1;
        this.h = 1;
        this.f = 1;
        this.s = 0;
        if (typeof nameOrVertical == 'number') {
            this.v = nameOrVertical;
            this.h = horizontal;
            this.f = frames;
            this.s = skipFrames;
        } else if (typeof nameOrVertical == 'string') {
            let detail = nameOrVertical.match(/\[([\d]*),([\d]*),([\d]*)\]/i);
            if (detail) {
                this.v = Number(detail[1]);
                this.h = Number(detail[2]);
                this.f = Number(detail[3]);
            } else {
                detail = nameOrVertical.match(/\[([\d]*),([\d]*)\]/i);
                if (detail) {
                    this.v = Number(detail[1]);
                    this.h = 1;
                    this.f = Number(detail[2]);
                } else {
                    detail = nameOrVertical.match(/\[([\d]*),([\d]*),([\d]*),([\d]*)\]/i);
                    if (detail) {
                        this.v = Number(detail[1]);
                        this.h = Number(detail[2]);
                        this.f = Number(detail[3]);
                        this.s = Number(detail[4]);
                    }
                }
            }
        }
        this.m = this.h*this.v-this.s;
        this.reset();
    };
    //=========================================================================
    AnimatedQJ.prototype.reset = function() {
        this.n = 0;
        this.c = 0;
    };
    AnimatedQJ.prototype.add = function() {
        this.c++;
        if (this.c>=this.f) {
            this.c = 0;
            this.n++;
            if (this.n>=this.m) {
                this.n = 0;
            }
            return true;
        }
        return false;
    };
    //=========================================================================
    AnimatedQJ.prototype.get = function(w,h) {
        return {x:w/this.v*(this.n%this.v),y:h/this.h*Math.floor(this.n/this.v),w:w/this.v,h:h/this.h};
    };
    AnimatedQJ.prototype.set = function(objectData,w,h,force = false) {
        if (objectData.AnimatedQJIndex!=this.n || force) {
            objectData.setFrame(w/this.v*(this.n%this.v),h/this.h*Math.floor(this.n/this.v),w/this.v,h/this.h);
            objectData.AnimatedQJIndex = this.n;
        }
    };
    //=========================================================================
    AnimatedQJ.prototype.saveWH = function(w,h) {
        this.wi = w;
        this.he = h;
    };
    AnimatedQJ.prototype.getSaveWH = function() {
        return {x:this.wi/this.v*(this.n%this.v),y:this.he/this.h*Math.floor(this.n/this.v),w:this.wi/this.v,h:this.he/this.h};
    };
    AnimatedQJ.prototype.setSaveWH = function(objectData,force = false) {
        if (objectData.AnimatedQJIndex!=this.n || force) {
            objectData.setFrame(this.wi/this.v*(this.n%this.v),this.he/this.h*Math.floor(this.n/this.v),this.wi/this.v,this.he/this.h);
            objectData.AnimatedQJIndex = this.n;
        }
    };
    //======================================================================
    AnimatedQJ.prototype.addGetSetBaseSaveWH = function(objectData,force = false) {
        this.c++;
        if (this.c>=this.f) {
            this.c = 0;
            this.n++;
            if (this.n>=this.m) {
                this.n = 0;
            }
        }
        if (objectData.AnimatedQJIndex!=this.n || force) {
            objectData.frame = new Rectangle(
                this.wi/this.v*(this.n%this.v),
                this.he/this.h*Math.floor(this.n/this.v),
                this.wi/this.v,
                this.he/this.h
            );
        }
    };
    //======================================================================
    AnimatedQJ.isAnimated = function(name) {
        return name.includes('[')&&name.includes(']');
    };
    //=============================================================================
    //Dramtic effect   |direction effect    /fade effect    %circle effect
    //=============================================================================
    function DEFrameQJ() {
        this.initialize.apply(this, arguments);
    }
    DEFrameQJ.prototype.initialize = function(name,originData,dataType,noFadeCopy) {
        noFadeCopy = noFadeCopy||false;
        this.i = dataType;//0-number 1-text 2-degree
        this.n = name;
        this.d = {};
        this.m = 0;
        this.t = 0;
        this.rt = 0;
        this.isMode = true;
        if (typeof originData == "string"&&originData.includes("~")) {
            let data = originData.split("~"),num=0,fadeT=0,last;
            for (let i=0,il=data.length,detail;i<il;i++) {
                if (data[i].includes("|")) {
                    detail = data[i].split("|");
                    if (dataType==0) num = Number(detail[1]);
                    else if (dataType==1) num = detail[1];
                    else if (dataType==2) num = Number(detail[1])*Math.PI/180;
                    this.d[this.m] = num;
                    if (noFadeCopy) {
                        for (let i=this.m,ll=i+Number(detail[0]);i<ll;i++) {
                            this.d[i] = num;
                        }
                    }
                    this.m+=Number(detail[0]);
                    this.d[this.m] = num;
                } else if (data[i].includes("/")) {
                    detail = data[i].split("/");
                    fadeT = Number(detail[0]);
                    if (dataType==0) {
                        num = Number(detail[1]);
                        last = this.d[this.m];
                        for (let j=1;j<=fadeT;j++) {
                            this.d[this.m+j] = last+(num-last)*j/fadeT;
                        }
                        this.m+=fadeT;
                        this.d[this.m] = num;
                    } else if (dataType==1) {
                        num = QJ.hexToRgb(detail[1]);
                        last = QJ.hexToRgb(this.d[this.m])//[0,{r:0,g:0,b:0}];
                        for (let j=1;j<=fadeT;j++) {
                            this.d[this.m+j] = QJ.rgbToHex({
                                r:Math.floor(last.r+(num.r-last.r)*j/fadeT),
                                g:Math.floor(last.g+(num.g-last.g)*j/fadeT),
                                b:Math.floor(last.b+(num.b-last.b)*j/fadeT)
                            });
                        }
                        this.m+=fadeT;
                        this.d[this.m] = detail[1];
                    } else if (dataType==2) {
                        num = Number(detail[1])*Math.PI/180;
                        last = this.d[this.m];
                        for (let j=1;j<=fadeT;j++) {
                            this.d[this.m+j] = last+(num-last)*j/fadeT;
                        }
                        this.m+=fadeT;
                        this.d[this.m] = num;
                    }
                } else if (data[i].includes("%")) {
                    detail = data[i].split("%");
                    fadeT = Number(detail[0]);
                    if (dataType==0) {
                        num = Number(detail[1]);
                        last = this.d[this.m];
                        for (let j=1;j<=fadeT;j++) {
                            this.d[this.m+j] = num-(num-last)*Math.sqrt(1-Math.pow(j/fadeT,2));
                        }
                        this.m+=fadeT;
                        this.d[this.m] = num;
                    } else if (dataType==1) {
                        num = QJ.hexToRgb(detail[1]);
                        last = QJ.hexToRgb(this.d[this.m])//[0,{r:0,g:0,b:0}];
                        for (let j=1,xs;j<=fadeT;j++) {
                            xs = Math.sqrt(1-Math.pow(j/fadeT,2));
                            this.d[this.m+j] = QJ.rgbToHex({
                                r:Math.floor(num.r-(num.r-last.r)*xs),
                                g:Math.floor(num.g-(num.g-last.g)*xs),
                                b:Math.floor(num.b-(num.b-last.b)*xs)
                            });
                        }
                        this.m+=fadeT;
                        this.d[this.m] = detail[1];
                    } else if (dataType==2) {
                        num = Number(detail[1])*Math.PI/180;
                        last = this.d[this.m];
                        for (let j=1;j<=fadeT;j++) {
                            this.d[this.m+j] = num-(num-last)*Math.sqrt(1-Math.pow(j/fadeT,2));
                        }
                        this.m+=fadeT;
                        this.d[this.m] = num;
                    }
                }
            }
        } else {
            this.isMode = false;
            let num;
            if (dataType==0) num = Number(originData);
            else if (dataType==1) num = originData;
            else if (dataType==2) num = Number(originData)*Math.PI/180;
            this.d[this.m] = num;
        }
    };
    DEFrameQJ.prototype.get = function() {
        if (this.t>this.m) this.t = 0;
        if (this.d[this.t]!=undefined) this.rt = this.t;
        this.t++;
        return this.d[this.rt];
    };
    DEFrameQJ.prototype.getOnly = function() {
        return this.d[this.rt];
    };
    DEFrameQJ.prototype.getTar = function(i) {
        return this.d[i>this.m?0:i];
    };
    DEFrameQJ.prototype.setZero = function() {
        this.t = 0;
        if (this.d[0]!=undefined) {
            this.rt = 0;
        }
    };
    window.AnimatedQJ = AnimatedQJ;
    window.DEFrameQJ = DEFrameQJ;
}
if (QJ.MPMZ.isMV) {
    function Game_InterpreterCEQJ() {
        this.initialize.apply(this, arguments);
    }
    Game_InterpreterCEQJ.prototype = Object.create(Game_Interpreter.prototype);
    Game_InterpreterCEQJ.prototype.constructor = Game_InterpreterCEQJ;
    Game_InterpreterCEQJ.prototype.initialize = function(pageIndex,reSetData,extraData) {
        Game_Interpreter.prototype.initialize.call(this,0);
        this.pageIndex=pageIndex;
        for (let i in reSetData) this[i] = reSetData[i];
        this.extraData = extraData;
    };
    Game_InterpreterCEQJ.prototype.terminate = function() {
        //$gameMap.event(this.eventId())._commonEventQJ.splice($gameMap.event(this.eventId())._commonEventQJ.indexOf(this),1);
        this.overLifeQJ = true;
        Game_Interpreter.prototype.terminate.call(this);
    };
    //============================================================
    function Game_InterpreterCEQJX() {
        this.initialize.apply(this, arguments);
    }
    Game_InterpreterCEQJX.prototype = Object.create(Game_Interpreter.prototype);
    Game_InterpreterCEQJX.prototype.constructor = Game_InterpreterCEQJX;
    Game_InterpreterCEQJX.prototype.initialize = function(id,reSetData,extraData) {
        Game_Interpreter.prototype.initialize.call(this,0);
        this.commonEventId=id;
        for (let i in reSetData) this[i] = reSetData[i];
        this.extraData = extraData;
    };
    Game_InterpreterCEQJX.prototype.terminate = function() {
        //$gameMap._commonEventQJ.splice($gameMap._commonEventQJ.indexOf(this),1);
        this.overLifeQJ = true;
        Game_Interpreter.prototype.terminate.call(this);
    };
    window.Game_InterpreterCEQJ = Game_InterpreterCEQJ;
    window.Game_InterpreterCEQJX = Game_InterpreterCEQJX;
}
if (QJ.MPMZ.isMV) {
    QJ.Pointer = null;//The pointer.
    QJ.tileSize = 48;
    QJ.PI180 = Math.PI/180;
    QJ.getPointer = function() {
        if (!!QJ.Pointer) {
            if (typeof QJ.Pointer == "number") {
                if (QJ.Pointer>0) {
                    return QJ.getCharacter(QJ.Pointer);
                } else if (QJ.Pointer==-1) {
                    return $gamePlayer;
                } else {
                    return null;
                }
            } else if (QJ.Pointer.eventId) {
                return $gameMap.event(QJ.Pointer.eventId());
            }
        }
        return null;
    };
    QJ.getPointerId = function() {
        if (!!QJ.Pointer) {
            if (typeof QJ.Pointer == "number"&&QJ.Pointer>0) {
                let eData = $gameMap.event(QJ.Pointer);
                return eData?eData.eventId():0;
            } else if (QJ.Pointer.eventId()>0) {
                let eData = $gameMap.event(QJ.Pointer.eventId());
                return eData?eData.eventId():0;
            }
        }
        return 0;
    };
    QJ.getCharacter = function(value) {
        return value==0?QJ.getPointer():(value==-1?$gamePlayer:(value>0?$gameMap.event(value):null));
    };
    QJ.buildCharacter = function(target) {
        return target?(target===$gamePlayer?-1:target.eventId()):0;
    };
    QJ.createTexture = function(bit,name,container) {
        let lsCanvas = document.createElement('canvas');
        let lscontext = lsCanvas.getContext('2d');
        let lsBaseTexture = null;
        let w=bit.width,h=bit.height;
        lsCanvas.width = w;
        lsCanvas.height = h;
        lsBaseTexture = new PIXI.BaseTexture(lsCanvas);
        lsBaseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        lsBaseTexture.width = w;
        lsBaseTexture.height = h;
        lscontext.globalCompositeOperation = 'source-over';
        lscontext.drawImage(bit._canvas?bit._canvas:bit._image,0,0);//,w,h,0,0,w,h
        lsBaseTexture.update();
        if (name&&container) container[name] = lsBaseTexture;
        return lsBaseTexture;
    };
    QJ.gainItemEx = function(type,itemId,number) {
        //====================================
        let itemData;
        if (type==0||type=="item") itemData = $dataItems[itemId];
        else if (type==1||type=="weapon") itemData = $dataWeapons[itemId];
        else if (type==2||type=="armor") itemData = $dataArmors[itemId];
        else if (type==3||type=="gold") itemData = null;
        else return;
        //====================================
		
	  // 插入新功能：检查背包容量
      if (type == 1 && !QJ.MPMZ.tl.checkplayerWeaponWeight()) {
         dingk.Loot.getMapDrops($gamePlayer,itemData);	
		 return;
	  }		  
      if (type == 2 && !QJ.MPMZ.tl.checkplayerGearWeight()) {
         dingk.Loot.getMapDrops($gamePlayer,itemData);	
		 return;
	  }			
	  // 插入新功能：检查收集物图鉴
      QJ.collectionCheck(type, itemId); 
	  
        if (type==3||type=="gold") $gameParty.gainGold(number);
        else $gameParty.gainItem(itemData,number,false);
        //====================================
		// 插入新功能：适配物品转化
		 if (type==0||type=="item") {
		let goldItem = [4,5,6,7,8,9,10,11,12];
        if (goldItem.includes(itemId)) {
          QJ.MPMZ.tl.ex_playerDropsValueChange(itemData);
            }
		 }
    }
	
  QJ.collectionCheck = function(type, itemId) {
    const typeMap = {
        0: { arrayId: 9, contextPrefix: "\\ii[" },
        1: { arrayId: 10, contextPrefix: "\\iw[" },
        2: { arrayId: 11, contextPrefix: "\\ia[" }
    };

    const typeInfo = typeMap[type];
    if (!typeInfo) return;

    const itemArray = $gameNumberArray.value(typeInfo.arrayId);
    if (itemArray.includes(itemId)) {
        $gameSystem._drill_GFTH_styleId = 3;
    } else {
        itemArray.push(itemId);
        $gameSystem._drill_GFTH_styleId = 2;
    }

    const context = typeInfo.contextPrefix + itemId + "]";
    $gameTemp.drill_GFTH_pushNewText(context);
	var seNames = "キラーン（ひらめき・アイテム発見・獲得）";
    AudioManager.playSe({ name: seNames, volume: 60, pitch: 100, pan: 0 });
}; 
    QJ.gainItem = function(value1,value2,value3) {
        for(var i=value1;i<=value2;i++){
            $gameParty.gainItem($dataItems[i],value3);
      }
    };
    QJ.gainWeapon = function(value1,value2,value3) {
        for(var i=value1;i<=value2;i++){
            $gameParty.gainItem($dataWeapons[i],value3,true);
      }
    };
    QJ.gainArmor = function(value1,value2,value3) {
        for(var i=value1;i<=value2;i++){
            $gameParty.gainItem($dataArmors[i],value3,true);
      }
    };
    QJ.ss = function(eventId,name,value,mapId) {
        $gameSelfSwitches.setValue([mapId||$gameMap.mapId(),eventId,name.toUpperCase()],value);
    };
    QJ.ssv = function(eid,name,mapId) {
        return $gameSelfSwitches.value([mapId?mapId:$gameMap.mapId(),eid==0?QJPointer:eid,name]);
    };
    QJ.se = function(name,pan = 0,pitch = 100,volume = 100) {
        AudioManager.playSe({name:name,pan:pan,pitch:pitch,volume:volume});
    };
    QJ.calculateDirectionValueGet = function(value,direction) {
        value = String(value);
        if (value.includes('~')) {
            let detail = value.split('~');
            if (detail.length==4) {
                return [0,0,Number(detail[0]),0,Number(detail[1]),0,Number(detail[2]),0,Number(detail[3]),0][direction];
            } else if (detail.length==8) {
                return [0,Number(detail[0]),Number(detail[1]),Number(detail[2]),Number(detail[3]),
                    0,Number(detail[4]),Number(detail[5]),Number(detail[6]),Number(detail[7])][direction];
            }
        }
        return Number(value);
    };
    QJ.buildDirectionValue = function(value) {
        value = String(value);
        if (value.includes('~')) {
            let detail = value.split('~');
    
            if (detail.length==4) {
                return [0,0,Number(detail[0]),0,Number(detail[1]),0,Number(detail[2]),0,Number(detail[3]),0];
            } else if (detail.length==8) {
                return [0,Number(detail[0]),Number(detail[1]),Number(detail[2]),Number(detail[3]),
                    0,Number(detail[4]),Number(detail[5]),Number(detail[6]),Number(detail[7])];
            }
        }
        value = Number(value);
        return [0,value,value,value,value,0,value,value,value,value];
    };
    QJ.gainItemData = function(type,id) {
        if (type=='skill') {
            return $dataSkills[id];
        } else if (type=='item') {
            return $dataItems[id];
        } else if (type=='weapon') {
            return $dataWeapons[id];
        } else if (type=='armor') {
            return $dataArmors[id];
        } else {
            return null;
        }
    };
}
if (QJ.MPMZ.isMV) {
    QJ.randomColor = function(start,length) {
        return QJ.rgbToHex({
            r:start+Math.floor(Math.random()*length),
            g:start+Math.floor(Math.random()*length),
            b:start+Math.floor(Math.random()*length)});
    }
    QJ.colorGrad = function(bitmap,content,x,y,w,h,ro = 0,offset = 0) {
        if (content.constructor == Bitmap) {
            const grad = bitmap._context.createPattern(content._canvas || content._image,"repeat");
            if (grad&&grad.setTransform) {
                grad.setTransform(new DOMMatrix().
                    translateSelf(x+offset*Math.sin(ro),y-offset*Math.cos(ro),0).
                    rotateSelf(ro*180/Math.PI));
            }
            return grad;
        } else if (content.includes("|")) {
            const list=content.split("~");
            const colorNum = list.length;
            let k = Math.atan(w/h),diaL = Math.sqrt(w*w+h*h)/2,noSoildRadius;
            ro = ro%(Math.PI*2);
            if (ro<Math.PI/2) noSoildRadius = diaL*Math.cos(k-ro);
            else if (ro<Math.PI) noSoildRadius = -diaL*Math.cos(k+ro);
            else if (ro<Math.PI*3/2) noSoildRadius = -diaL*Math.cos(k-ro);
            else noSoildRadius = diaL*Math.cos(k+ro);
            const grad = bitmap._context.createLinearGradient(
                Math.floor(x+w/2+noSoildRadius*Math.sin(ro)),Math.floor(y+h/2-noSoildRadius*Math.cos(ro)),
                Math.floor(x+w/2-noSoildRadius*Math.sin(ro)),Math.floor(y+h/2+noSoildRadius*Math.cos(ro)));
            if (offset==0) {
                for(let i=0,detail,point;i<colorNum; i++) {
                    detail = list[i].split("|");
                    grad.addColorStop(detail[0],detail[1]);
                }
            } else {
                offset %= 1;//转为小数
                let hasNotMoveUp = true;
                //let listConsole = {};
                for(let i=0,detail,point; i<colorNum; i++) {
                    detail = list[i].split("|");
                    detail[0] = Number(detail[0]);
                    point = Math.floor((detail[0]+offset)*100)/100;
                    if (hasNotMoveUp&&point>1) {
                        hasNotMoveUp = false;
                        let lastColorDetail = list[(i-1<0)?(colorNum-1):(i-1)].split("|");
                        lastColorDetail[0] = Number(lastColorDetail[0]);
                        let trueColor = QJ.gradientPointCalculate(lastColorDetail[1],detail[1],(1-lastColorDetail[0]-offset)/(detail[0]-lastColorDetail[0]));
                        grad.addColorStop(1,trueColor);
                        grad.addColorStop(Math.round((point==1?1:point%1)*100)/100,detail[1]);
                        grad.addColorStop(0,trueColor);
                    } else {
                        grad.addColorStop(Math.round((point==1?1:point%1)*100)/100,detail[1]);
                    }
                }
            }
            return grad;
        } else {
            return content;
        }
    }
    QJ.gradientPointCalculate = function (start,end,rate) {
        let rgb1 = QJ.hexToRgb(start);
        let rgb2 = QJ.hexToRgb(end);
        let r = Math.floor(rgb1.r-(rgb1.r-rgb2.r)*rate).clamp(0,255);
        let g = Math.floor(rgb1.g-(rgb1.g-rgb2.g)*rate).clamp(0,255);
        let b = Math.floor(rgb1.b-(rgb1.b-rgb2.b)*rate).clamp(0,255);
        return QJ.rgbToHex({r:r,g:g,b:b});
    }
    QJ.hexToRgb = function (hex) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return {r: parseInt(result[1],16),g: parseInt(result[2], 16),b: parseInt(result[3], 16)};
    }
    QJ.rgbToHex = function (rgb) {
        let r=rgb.r.toString(16),g=rgb.g.toString(16),b=rgb.b.toString(16);
        return "#"+(r.length==1?("0"+r):r)+(g.length==1?("0"+g):g)+(b.length==1?("0"+b):b);
    }
    QJ.calculateAngleByTwoPoint=function(x,y,ex,ey){
        let ro;
        if (ex>x&&ey<y)  ro=(-Math.atan((x-ex)/(y-ey)));
        if (ex>x&&ey>y)  ro=(Math.PI-Math.atan((x-ex)/(y-ey)));
        if (ex<x&&ey>y)  ro=(Math.PI-Math.atan((x-ex)/(y-ey)));
        if (ex<x&&ey<y)  ro=(2*Math.PI-Math.atan((x-ex)/(y-ey)));
        if (ex==x&&ey>y) ro=Math.PI;
        if (ex==x&&ey<y) ro=0;
        if (ex>x&&ey==y) ro=Math.PI/2;
        if (ex<x&&ey==y) ro=Math.PI*3/2;
        if (ex==x&&ey==y)ro=NaN;
        return ro;
    };
    QJ.calculateAngleByDirection=function(direction){
        if (direction==1) return Math.PI*5/4;//左下
        if (direction==2) return Math.PI;
        if (direction==3) return Math.PI*3/4;//右下
        if (direction==4) return Math.PI*3/2;
        if (direction==6) return Math.PI/2;
        if (direction==7) return Math.PI*7/4;//左上
        if (direction==8) return 0;
        if (direction==9) return Math.PI/4;//右上
        return 0;
    };
    let transAngle = 180/Math.PI;
    QJ.calculateAngleByTwoPointAngle=function(x,y,ex,ey){
        let ro;
        if (ex>x&&ey<y)  ro=(-Math.atan((x-ex)/(y-ey)))         *transAngle;
        if (ex>x&&ey>y)  ro=(Math.PI-Math.atan((x-ex)/(y-ey)))  *transAngle;
        if (ex<x&&ey>y)  ro=(Math.PI-Math.atan((x-ex)/(y-ey)))  *transAngle;
        if (ex<x&&ey<y)  ro=(2*Math.PI-Math.atan((x-ex)/(y-ey)))*transAngle;
        if (ex==x&&ey>y) ro=180;
        if (ex==x&&ey<y) ro=0;
        if (ex>x&&ey==y) ro=90;
        if (ex<x&&ey==y) ro=270;
        if (ex==x&&ey==y)ro=NaN;
        return ro;
    };
    QJ.calculateAngleByDirectionAngle=function(direction){
        if (direction==1) return 225;//左下
        if (direction==2) return 180;
        if (direction==3) return 135;//右下
        if (direction==4) return 270;
        if (direction==6) return 90;
        if (direction==7) return 315;//左上
        if (direction==8) return 0;
        if (direction==9) return 45;//右上
        return 0;
    };
    QJ.calculateAnnotation = function(event) {
        let page=null,content="";
        try{
            page=event.page();
        } catch(e) {
            page=null;
        }
        if (page) {
            if (page.list[0].code === 108) {
                let i=0;
                while (page.list[i].code === 408 || page.list[i].code === 108) {
                    content=content + page.list[i].parameters[0];
                    i++;
                }
            }
        }
        return content;
    };
    QJ.calculateRangeAndInt = function(list) {
        let standardList = [],detail;
        for (let i of list) {
            if (typeof i == "number") {
                standardList.push(i);
            } else if (typeof i == "string") {
                detail = i.split('-');
                for (let j=Number(detail[0]),jl=Number(detail[1]);j<=jl;j++) {
                    standardList.push(j);
                }
            }
        }
        return standardList;
    }
    //=============================================================================
    //
    //=============================================================================
}
//=============================================================================
//
//=============================================================================
}
//=============================================================================
//
//=============================================================================
QJ.MPMZ.blankBullet = {
    inheritX:()=>0,
    inheritY:()=>0,
    inheritRotation:()=>0
};
Object.defineProperty(Game_InterpreterCEQJX.prototype,'bullet',{
    set:function() {
        //nothing
    },
    get:function() {
        return $gameMap.bulletQJ(this.bulletId)||QJ.MPMZ.blankBullet;
    }
});
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================

/* 检测：index 指定子弹的“以子弹中心为圆心、半径=range 的圆形范围”
 * 是否命中指定的 region 图块（任一命中即为 true）
 *
 * 参数：
 *   index      : 子弹索引（$gameMap._mapBulletsQJ 的键）
 *   regionIds  : 单个 id 或 id 数组，例如 8 或 [8,12,15]
 *   range      : 检测半径（单位：像素；想用格子数就传 range*tileWidth）
 *
 * 返回：true / false
 */
(function(){
  if (!QJ.MPMZ) QJ.MPMZ = {};
  if (!QJ.MPMZ.tl) QJ.MPMZ.tl = {};

  function circleIntersectsTile(cx, cy, r, gx, gy, tw, th){
    // tile 左上角像素
    var rx = gx * tw, ry = gy * th;
    var nx = Math.max(rx, Math.min(cx, rx + tw));
    var ny = Math.max(ry, Math.min(cy, ry + th));
    var dx = cx - nx, dy = cy - ny;
    return (dx*dx + dy*dy) <= r*r;
  }

  QJ.MPMZ.tl.hitRegionAroundBullet = function(index, regionIds, range){
    var bullets = $gameMap && $gameMap._mapBulletsQJ;
    var b = bullets ? bullets[index] : null;
    if (!b) return false;

    // 归一化 region 集
    var ids = Array.isArray(regionIds) ? regionIds : [regionIds];
    var set = {};
    for (var i=0;i<ids.length;i++) set[Number(ids[i])] = true;

    var tw = $gameMap.tileWidth(), th = $gameMap.tileHeight();
    var cx = b.x, cy = b.y;           // 子弹中心（像素）
    var r  = Math.max(0, Number(range)||0);

    // 圆的包围格范围
    var left   = Math.floor((cx - r) / tw);
    var right  = Math.floor((cx + r) / tw);
    var top    = Math.floor((cy - r) / th);
    var bottom = Math.floor((cy + r) / th);

    // 边界裁剪
    left   = Math.max(0, left);
    top    = Math.max(0, top);
    right  = Math.min($gameMap.width()  - 1, right);
    bottom = Math.min($gameMap.height() - 1, bottom);

    for (var gy = top; gy <= bottom; gy++){
      for (var gx = left; gx <= right; gx++){
        var rid = $gameMap.regionId(gx, gy);
        if (!set[rid]) continue;
        if (circleIntersectsTile(cx, cy, r, gx, gy, tw, th)) return true;
      }
    }
    return false;
  };
})();


(function(){
  'use strict';
  if (!window.QJ || !QJ.MPMZ) return;

  // 只删显示：bullet/laser/rope/particle/afterimage，不动 $gameMap._mapBulletsQJ
  QJ.MPMZ.refreshProjectileVisualOnly = function() {
    const scene = SceneManager._scene;
    const ss = scene && scene._spriteset;
    if (!ss) return;

    // 1) 清理 tilemap 上“直接挂着”的弹幕精灵（z 是 number 的那类会 addChild 到 _tilemap）
    const tilemap = ss._tilemap;
    if (tilemap && tilemap.children) {
      for (let i = tilemap.children.length - 1; i >= 0; i--) {
        const s = tilemap.children[i];
        if (!s) continue;
        if ((window.Sprite_QJBulletMZ && s instanceof Sprite_QJBulletMZ) ||
            (window.Sprite_QJLaserMZ  && s instanceof Sprite_QJLaserMZ)) {
          tilemap.removeChild(s);
          if (s.destroy) s.destroy();
        }
      }
    }

    // 2) 清理 QJ 的各层容器（P/M/E/W/A/S）
    const containers = [
      ss._1ContainerQJ, ss._2ContainerQJ, ss._3ContainerQJ,
      ss._4ContainerQJ, ss._5ContainerQJ, ss._6ContainerQJ
    ];

    for (const c of containers) {
      if (!c) continue;

      if (c.removeChildren) {
        const arr = c.removeChildren();
        for (const s of arr) { if (s && s.destroy) s.destroy(); }
      }

      if (c.bitmap && c.bitmap.clear) c.bitmap.clear();
      c.bitmap = null;

      if (c.onlyEffectSprites) c.onlyEffectSprites.length = 0;
      if (c.particleContainers) c.particleContainers = {};
    }

    // 3) 重新根据现存 bullet 数据把精灵创建回来
    if (ss.recreateMapProjectileQJ) {
      ss.recreateMapProjectileQJ();
    }
  };

  // 只在“关闭设置菜单 -> 回到地图”时触发一次
  QJ.MPMZ._needProjectileVisualRefresh = false;

  if (window.Scene_Options) {
    const _Scene_Options_terminate = Scene_Options.prototype.terminate;
    Scene_Options.prototype.terminate = function() {
      // 这里只打标记：因为此刻 SceneManager._scene 仍是 Scene_Options，没法拿到地图 spriteset
      QJ.MPMZ._needProjectileVisualRefresh = true;
      _Scene_Options_terminate.call(this);
    };
  }

  // 回到 Scene_Map 时执行一次
  if (window.Scene_Map) {
    const _Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
      _Scene_Map_start.call(this);
      if (QJ.MPMZ._needProjectileVisualRefresh) {
        QJ.MPMZ._needProjectileVisualRefresh = false;
        QJ.MPMZ.refreshProjectileVisualOnly();
      }
    };
  }

})();