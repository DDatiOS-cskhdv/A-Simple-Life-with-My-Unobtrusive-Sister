//=============================================================================
// RPG Maker MV QJ-SimpleMapDamage.js
//=============================================================================
/*:
 * @plugindesc Simple Map Damage[23-10-17]
 * @author Qiu Jiu
 * @help
 * QJ-SimpleMapDamage.js
 *
 * 一个极度简单的伤害显示插件。
 * 需要将一个名叫damageQJ.png的图片放在img/system下。
 *
 * SimpleMapDamageQJ.put(index,eventId,number,ox,oy);
 *
 * index:行数，img/system/damageQJ.png图中第几行的伤害数字
 * eventId:显示在谁的头顶上，写-1时代表玩家，写0时代表当前事件
 * number:伤害数字
 * ox:起始点x偏移
 * oy:起始点y偏移，默认为-96
 *
 * @param switch
 * @text 显示开关
 * @desc 打开此开关后才会显示
 * @type switch
 * @default 7
 *
*/
//=============================================================================
// 
//=============================================================================
let SMDPointer = null;
const SMD_Game_Interpreter_executeCommand = Game_Interpreter.prototype.executeCommand;
Game_Interpreter.prototype.executeCommand = function() {
    SMDPointer=this._eventId;
    return SMD_Game_Interpreter_executeCommand.call(this);
};
const SimpleMapDamageQJ = {
    damageTextList:[],
    saveDamagePosition:[
        [0,-2],[0,-4],[0,-6],[0,-8],[0,-10],[0,-12],[0,-14],[0,-16],
        [0,-12],[0,-8],[0,-4],[0,0],
        [0,-2],[0,-4],[0,-6],[0,-8],[0,-10],[0,-12],
        [0,-8],[0,-4],[0,0],       
        [0,0],[0,0],[0,0],[0,0],
        [0,-2],[0,-4],[0,-6],[0,-8],[0,-10],[0,-12],[0,-14],[0,-16],[0,-18],[0,-20],[0,-22],[0,-24],[0,-26],
    ],
    createTexture:function(bitmap) {
        let lsCanvas = document.createElement('canvas');
        let lscontext = lsCanvas.getContext('2d');
        let lsBaseTexture = null;
        let w=bitmap.width;
        let h=bitmap.height;
        lsCanvas.width = w;
        lsCanvas.height = h;
        lsBaseTexture = new PIXI.BaseTexture(lsCanvas);
        lsBaseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        lsBaseTexture.width = w;
        lsBaseTexture.height = h;
        lscontext.globalCompositeOperation = 'source-over';
        lscontext.drawImage(bitmap._canvas,0,0,w,h,0,0,w,h);
        lsBaseTexture.update();
        return lsBaseTexture;
    },
    baseTexture:null,
    put:function(index,eventId,number,ox = 0,oy = -96) {
        if (eventId===-1) {
            ox+=$gamePlayer.screenX()+$gameMap.displayX()*48;
            oy+=$gamePlayer.screenY()+$gameMap.displayY()*48;
        } else {
            if (eventId===0) eventId = SMDPointer;
            if ($gameMap.event(eventId)) {
                ox+=$gameMap.event(eventId).screenX()+$gameMap.displayX()*48;
                oy+=$gameMap.event(eventId).screenY()+$gameMap.displayY()*48;
            } else {
                return;
            }
        }
        SimpleMapDamageQJ.damageTextList.push([index,typeof number === "number"?number:null,ox,oy]);
    },
    switchId:Number(PluginManager.parameters("QJ-SimpleMapDamage").switch)
};
//=============================================================================
//
//=============================================================================
SimpleMapDamageQJ.Spriteset_Map_createUpperLayer = Spriteset_Map.prototype.createUpperLayer;
Spriteset_Map.prototype.createUpperLayer = function() {
    SimpleMapDamageQJ.Spriteset_Map_createUpperLayer.apply(this,arguments);
    this.createSimpleMapDamageQJ();
};
Spriteset_Map.prototype.createSimpleMapDamageQJ = function() {
    let sprite = new Spriteset_SimpleMapDamageQJ();
    this._simpleMapDamageQJ = sprite;
    this.addChild(sprite);
}
//=============================================================================
//
//=============================================================================
//[type,value,x,y]  [type,nullx,y]
//type:0-hp 1-hpCritical 2-hpRecovery 3-mp 4-tp 5-miss 6-critical 7-evade
function Spriteset_SimpleMapDamageQJ() {
    this.initialize(...arguments);
}
Spriteset_SimpleMapDamageQJ.prototype = Object.create(PIXI.particles.ParticleContainer.prototype);
Spriteset_SimpleMapDamageQJ.prototype.constructor = Spriteset_SimpleMapDamageQJ;
Spriteset_SimpleMapDamageQJ.prototype.initialize = function() {
    PIXI.particles.ParticleContainer.call(this,10000,{
        rotation:false,
        scale:false,
        alpha:true,
        uvs:true
    });
    if (!SimpleMapDamageQJ.baseTexture) {
        ImageManager.loadSystem("damageQJ").addLoadListener((bit)=>{
            SimpleMapDamageQJ.baseTexture = SimpleMapDamageQJ.createTexture(bit);
            this._saveDamageTextTexture = SimpleMapDamageQJ.baseTexture;
            this._kSize = [this._saveDamageTextTexture.width/10,this._saveDamageTextTexture.height/6];
            SimpleMapDamageQJ.damageTextList = [];
        });
    } else {
        this._saveDamageTextTexture = SimpleMapDamageQJ.baseTexture;
        this._kSize = [this._saveDamageTextTexture.width/10,this._saveDamageTextTexture.height/6];
        SimpleMapDamageQJ.damageTextList = [];
    }
};
Spriteset_SimpleMapDamageQJ.prototype.destroy = function() {
    PIXI.particles.ParticleContainer.destroy.call(this,{
        children: true
    });
};
Spriteset_SimpleMapDamageQJ.prototype.update = function() {
    if (!this._saveDamageTextTexture) {
        return;
    }
    while (SimpleMapDamageQJ.damageTextList.length>0) {
        this.createNewDamageText(SimpleMapDamageQJ.damageTextList.shift());
    }
    let dx = $gameMap.displayX()*48;
    let dy = $gameMap.displayY()*48;
    this.children.forEach((child)=>{
        if (child) {
            this.updateDamage(child,dx,dy);
        }
    });
};
Spriteset_SimpleMapDamageQJ.prototype.createNewDamageText = function(data) {
    //console.log(SimpleMapDamageQJ.switchId);
    if (!$gameSwitches.value(SimpleMapDamageQJ.switchId)) {
        return;
    }
    let dir = (Math.random()-0.5);
    if (data[1]===null) {
        let rect = new PIXI.Rectangle(0,this._kSize[1]*data[0],this._kSize[0]*10,this._kSize[1]);
        let texture = new PIXI.Texture(this._saveDamageTextTexture,rect);
        let sprite = new PIXI.Sprite(texture);
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 1;
        sprite.time = -1;
        sprite._data = [data[2],data[3]-this._kSize[1],dir,0];
        this.addChild(sprite);
    } else {
        for (let stringData=String(data[1]),il=stringData.length,sx=-il*this._kSize[0]/2,i=0;i<il;i++) {
            let detail = Number(stringData[i]);
            let rect = new PIXI.Rectangle(detail*this._kSize[0],this._kSize[1]*data[0],this._kSize[0],this._kSize[1]);
            let texture = new PIXI.Texture(this._saveDamageTextTexture,rect);
            let sprite = new PIXI.Sprite(texture);
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 1;
            sprite.time = -1;
            sprite._data = [data[2]+sx+i*this._kSize[0],data[3],dir,0];
            this.addChild(sprite);
        }
    }
};
Spriteset_SimpleMapDamageQJ.prototype.updateDamage = function(child,dx,dy) {
    child.time++;
    if (child.time>=SimpleMapDamageQJ.saveDamagePosition.length) {
        child.destroy();
    } else {
        child.x = child._data[0]+SimpleMapDamageQJ.saveDamagePosition[child.time][0]-dx+child._data[3];
        child.y = child._data[1]+SimpleMapDamageQJ.saveDamagePosition[child.time][1]-dy;
        child._data[3]+=child._data[2];
        if (child.time>=SimpleMapDamageQJ.saveDamagePosition.length*2/3) {
            child.alpha -= 3/SimpleMapDamageQJ.saveDamagePosition.length;
        }
    }
};
//=============================================================================
//
//=============================================================================