//=============================================================================
// TRP_CORE.js
//=============================================================================
// このソフトウェアの一部にMITライセンスで配布されている製作物が含まれています。
// http://www.opensource.org/licenses/mit-license



//================================================
// [TRP_CORE]
//================================================
// Core Class Extend
// Other Utils
// Random Number
// FadableSprite
// DrawTileImage
// RectPacker
// MapMock


//================================================
// [TRP_Sprite]
//================================================
// TRP_Animator
// AnimationBase
// Sequence
// Set
// Skew
// TRP_Container
// TRP_Sprite
// TRP_TouchableSprite
// TRP_UIPartsSprite
// TRP_Switch
// TRP_Slider
// TRP_TilingSprites
// ApplyBlendFilter

//================================================
// [DevFuncs]
//================================================
// File Access
// Window_TrpDevToolsBase
// Debug Text
// Tonner > _Dev.tonnerTiles()
// Resize Window
// Clipboard
// Save Image
// Save Map
// AssetRegister
// Others


//================================================
// [EditorBase]
//================================================
// EditorBase
// EditorLine
// ColorPicker
// PickerBase
// DataPicker






//============================================================================= 
/*:
 * @target MZ
 * @plugindesc 基盤プラグイン(なるべく前に配置)
 * @author Thirop
 * @help
 * 基盤関数の定義を行っているプラグイン。
 * プラグイン設定にてなるべく前に配置
 *
 * 【更新履歴】
 * 1.50 2025/04/30 天候プラグイン用の機能追加
 * 1.40 2023/05/17 関数仕様の微修正
 * 1.38 2023/04/08 追加:スプライトシート作成関数の追加
 * 1.33 2023/03/25 追加:オブジェグループ、アセット登録など対応
 * 1.32 2023/03/22 追加:テクスチャパッキング機能
 * 1.31 2022/03/13 自動装飾プラグイン本体の追加機能対応
 * 1.28 2022/01/28 修正:pixi-picture_for_MZ_160.js導入順の依存解消
 * 1.25 2022/01/20 追加:プラグインパラメータのパース機能
 * 1.24 2022/01/19 追加:ブレンドフィルターサポート。独自TilingSprite。
 * 1.17 2022/01/10 修正:MVでの画像書き出し機能不具合
 * 1.14 2022/12/24 修正:ウィンドウリサイズ不具合@コアv1.6.0
 * 1.07 2022/11/14 追加:タイル画像の描画関数
 *
 * 
 *
 * @param backupPath
 * @text バックアップ保存パス
 * @desc マップ保存時のバックアップファイルの保存パス。デフォ値は「_dev/backup/」
 * @default _dev/backup/
 * @type string
 *
 * @param backupMapNum
 * @text マップバックアップ数
 * @desc マップファイルのバックアップ保存数。デフォルトは3
 * @default 3
 * @type number 
 *
 *
 * @param assetPlugin
 * @text アセット登録プラグイン名
 * @desc デプロイメント除外を回避するためのアセット登録用プラグインファイル名。デフォはTRP_CORE_RequiredAsset
 * @default TRP_CORE_RequiredAsset
 * @type string
 *
 * 
 * @param mapMockTilesetId
 * @text モック保存用タイルセットID
 * @desc モック保存用の空のタイルセットID。デフォ値は0で機能無効状態。
 * @default 0
 * @type number
 * @min 0
 *
 *
 * @param redefineCoreWindows
 * @text Windowクラスの内部再定義
 * @desc Windowクラスを改造してる人のために、内部使用のため再定義
 * @default false
 * @type boolean
 *
 *
 *
 */
//============================================================================= 
// nw.Window.get().showDevTools();


var TRP_CORE = TRP_CORE||{};
function TRP_Animator(){
	this.initialize.apply(this, arguments);
}




//=============================================================================
// [TRP_CORE]
//=============================================================================
(function(){
'use strict';

var pluginName = 'TRP_CORE';
var parameters = PluginManager.parameters(pluginName);
var isMZ = Utils.RPGMAKER_NAME==="MZ";



var _Scene_Boot_initialize = Scene_Boot.prototype.initialize;
Scene_Boot.prototype.initialize = function(){
	TRP_CORE.USE_BLEND_FILTER = !!(PIXI.picture&&PIXI.picture.getBlendFilter);
	_Scene_Boot_initialize.call(this,...arguments);
};


TRP_CORE.BACK_UP_DIR = parameters.backupPath||'_dev/backup/'
if(TRP_CORE.BACK_UP_DIR[TRP_CORE.BACK_UP_DIR.length-1]!=='/'){
	TRP_CORE.BACK_UP_DIR = TRP_CORE.BACK_UP_DIR+'/';
}

TRP_CORE.mapFileName = function(mapId=$gameMap._mapId){
	return 'Map'+mapId.padZero(3)+'.json';
};
TRP_CORE.mapFilePath = function(mapId=$gameMap._mapId){
	return 'data/'+this.mapFileName(mapId);
};
TRP_CORE.backupMapFilePath = function(mapId=$gameMap._mapId,backupIdx=0){
	var filePath = TRP_CORE.BACK_UP_DIR+this.mapFileName(mapId);
	if(backupIdx>0){
		filePath = filePath.replace('.json','-'+backupIdx+'.json');
	}
	return filePath;
}



/* supplement
===================================*/
var supplement = TRP_CORE.supplement = function(defaultValue,optionArg){
	if(optionArg === undefined){
		return defaultValue;
	}
	return optionArg;
};
var supplementNum = TRP_CORE.supplementNum = function(defaultValue,optionArg){
	return Number(TRP_CORE.supplement(defaultValue,optionArg));
};

var supplementDef = TRP_CORE.supplementDef = function(defaultValue, optionArg, otherWords) {
	var value = TRP_CORE.supplement(defaultValue,optionArg);

	var defTargetWords = otherWords || [];
	defTargetWords.push('default');
	defTargetWords.push('def');
	defTargetWords.push('d');
	for(var i=0; i<defTargetWords.length; i++){
		var target = defTargetWords[i];
		if(value === target){
			value = defaultValue;
			break;
		}
	}
	return value;
};
var supplementDefNum = TRP_CORE.supplementDefNum = function(defaultValue, optionArg, otherWords) {
	var value = TRP_CORE.supplementDef(defaultValue,optionArg,otherWords);
	return Number(value);
};
var supplementDefBool = TRP_CORE.supplementDefBool = function(defaultValue, optionArg, otherWords) {
	var value = TRP_CORE.supplementDef(defaultValue,optionArg,otherWords);
	if(value==='true' || value==='t'){
		value = true;
	}else if(value==='false' || value==='f'){
		value = false;
	}else if(value){
		value = true;
	}else{
		value = false;
	}
	return value;
};


//=============================================================================
// Core Class Extend
//=============================================================================
TRP_CORE.randomRateWithRange = function(range=0.0,rand=Math.random()){
	return 1-range+2*range*rand;
};

TRP_CORE.randomRound = function(value,rand=Math.random()){
	var lower = Math.floor(value);
	var decimal = value-lower;
	return (rand<=decimal) ? lower : lower+1;
};



/* Array
===================================*/
TRP_CORE.packValues = function(arr,value,length=arr.length){
	for(var i=0;i<length;i=(i+1)|0){
		arr[i] = value;
	}
	return arr;
};
TRP_CORE.packSequence = function(arr,length,v0=0){
	for(var i=0; i<length; i=(i+1)|0){
		arr[i] = v0+i;
	}
	return arr;
}

TRP_CORE.last = function(arr){
	return arr.length>0 ? arr[arr.length-1] : null;
}
TRP_CORE.remove = function(arr,target){
	for(var i=arr.length-1; i>=0; i=(i-1)|0){
		if(arr[i]===target){
			arr.splice(i,1);
			return true;
		}
	}
	return false;
};
TRP_CORE.removeAll = function(arr,target){
	var removed = false;
	for(var i=arr.length-1; i>=0; i=(i-1)|0){
		if(arr[i]===target){
			arr.splice(i,1);
			removed = true;
		}
	}
	return removed;
};

TRP_CORE.random = function(arr,rand=Math.random()){
	if(arr.length<=0)return null;
	var n = Math.floor(rand*arr.length);
	return arr[n];
};
TRP_CORE.randomShift = function(arr,rand=Math.random()){
	if(arr.length<=0)return null;
	var n = Math.floor(rand*arr.length);
	var ret = arr[n];
	arr.splice(n,1);
	return ret;
};
TRP_CORE.removeArray = function(arr,arr2){
	if(!arr || !arr2)return;
	for(var i=arr.length-1; i>=0; i=(i-1)|0){
		if(arr2.indexOf(arr[i])>=0){
			arr.splice(i,1);
			if(arr2.length===0)return;
		}
	}
};
TRP_CORE.uniquePush = function(arr,target){
	if(!arr)return false;
	if(arr.indexOf(target)<0){
		arr.push(target);
		return true;
	}
	return false;
};
TRP_CORE.uniquePushArray = function(arr,target){
	for(const elem of target){
		this.uniquePush(arr,elem);
    }
};
TRP_CORE.shuffle = function(arr){
  	var length = arr.length;
	for(var i = length - 1; i > 0; i=(i-1)|0){
	    var r = Math.floor(Math.random() * (i + 1));
	    var tmp = arr[i];
	    arr[i] = arr[r];
	    arr[r] = tmp;
	}
	return arr;
};
TRP_CORE.prepareArray = function(arr){
	arr.length = 0;
	return arr;
};

TRP_CORE.containsEqual = function(arr,target){
	return this.indexOfEqual(arr,target)>=0;
};
TRP_CORE.indexOfEqual = function(arr,target){
	if(!arr)return -1;
	for(var i=arr.length-1; i>=0; i=(i-1)|0){
		var elem = arr[i];
		if(Array.isArray(elem)){
			if(elem.equals(target))return i;
		}else if(elem===target){
			return i;
		}
	}
	return -1;
};
TRP_CORE.search = function(arr,handler){
	for(var i=arr.length-1; i>=0; i=(i-1)|0){
		if(handler(arr[i])){
			return arr[i];
		}
	}
	return null;
};



/* str
===================================*/
TRP_CORE.capitalize = function(str){
	return str[0].toUpperCase() + str.substring(1);
}
TRP_CORE.isNumberStr = function(str){
	return /^[+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/.test(str.trim());
}


/* Number
===================================*/
TRP_CORE.decimal = function(num){
	var numStr = String(num);
	var index = numStr.indexOf('.');
    if(index<0){
        return 0;
    }else{
        return numStr.length-(index+1);
    }
};
TRP_CORE.withDecimal = function(num,length){
	if(length<=0)return String(num);

	num = Number(num);
	for(var i=0; i<length; i=(i+1)|0){
		num *= 10;
	}
	num = Math.round(num);

	var sign = num<0 ? '-' : '';
	num = Math.abs(num);

	var numStr = String(num);
	var numLen = numStr.length;
	while(numStr.length<length){
		numStr = '0'+numStr;
	}

	numStr = numStr.substring(0,numStr.length-length)+'.'+numStr.substr(numStr.length-length);
	if(numStr[0]==='.'){
		numStr = '0'+numStr;
	}
	return sign+numStr;
};




//=============================================================================
// Other Utils
//=============================================================================
TRP_CORE.snap = function(stage,width=Graphics.width,height=Graphics.height){
    var bitmap = new Bitmap(width, height);
    var renderTexture = PIXI.RenderTexture.create(width, height);
    if(stage){
    	var renderer = isMZ ? Graphics.app.renderer : Graphics._renderer;
        renderer.render(stage, renderTexture);
        stage.worldTransform.identity();
        var canvas;
        if(isMZ){
        	canvas = renderer.extract.canvas(renderTexture);
        }else{
	        if (Graphics.isWebGL()) {
	            canvas = Graphics._renderer.extract.canvas(renderTexture);
	        } else {
	            canvas = renderTexture.baseTexture._canvasRenderTarget.canvas;
	        }
        }
        bitmap.context.drawImage(canvas, 0, 0);
        canvas.width = 0;
        canvas.height = 0;
    }
    renderTexture.destroy({ destroyBase: true });
    
    if(isMZ){
    	bitmap.baseTexture.update();	
    }else{
    	bitmap._setDirty();
    }
    return bitmap;
};

TRP_CORE.parsePluginParameters = function(parameters){
	return JSON.parse(JSON.stringify(parameters,function(key, value){
		try {
			if(typeof value === 'string'){
				if(value[0]==='"'){
					return value.substring(1,value.length-1);
				}else if(value[0]==='['||value[0]==='{'){
					return JSON.parse(value)
				}else if(!isNaN(value)){
					return Number(value);
				}else if(value==='true'){
					return true;
				}else if(value==='false'){
					return false;
				}else{
					return value;
				}
			}else{
				return value;
			}
		} catch (e) {
			return value;
		}
	}));
};

TRP_CORE.changeMouseCursor = function(cursor='inherit'){
	var body = document.getElementsByTagName('body')[0];
	if(body){
		body.style.cursor = cursor;
	}
};

TRP_CORE.removeFromParent = function(sprite){
	if(!sprite || !sprite.parent)return;
	sprite.parent.removeChild(sprite);
}

TRP_CORE.convertEscapeCharacters = function(text,subject=null,meta=null){
    text = text.replace(/\\/g, "\x1b");
    text = text.replace(/\x1b\x1b/g, "\\");

    //Meta
    if(!!meta){
	    text = text.replace(/\x1b(?:MT|ME)\[([a-zA-Z0-9]+)(?:@([a-zA-Z0-9]+))?\]/gi, (_, p1, p2) =>
	    	(meta[p1]!==undefined ? meta[p1] : p2)
	    );
    }

    //variable x2
    text = text.replace(/\x1bV\[(\d+)\]/gi, (_, p1) =>
        $gameVariables.value(parseInt(p1))
    );
    text = text.replace(/\x1bV\[(\d+)\]/gi, (_, p1) =>
        $gameVariables.value(parseInt(p1))
    );

    //random
    text = text.replace(/\x1b(?:RN|RD)\[([\-0-9\.]+)(?:,([\-0-9\.]+))?\]/gi, (_, p1,p2) => {
    	if(p2){
    		if(p1.contains('.')||p2.contains('.')){
    			return (Number(p1)+Math.random()*(Number(p2)-Number(p1)))||0;
    		}else{
    			return (Number(p1)+Math.randomInt(Number(p2)-Number(p1)+1))||0;
    		}
    	}else{
    		if(p1.contains('.')){
    			return (Number(p1)*Math.random())||0;
    		}else{
    			return (Math.randomInt(Number(p1)+1))||0;
    		}
    	}
    });

    //switch
    text = text.replace(/\x1bSW\[([0-9]+)\]/gi, (_, p1) =>
    	$gameSwitches.value(Number(p1))
    );
    //self switch
    if(!!subject && (subject instanceof Game_Event)){
	    text = text.replace(/\x1bSS\[([a-zA-Z0-9]+)\]/gi, (_, p1) =>
	    	$gameSelfSwitches.value([subject._mapId,subject._eventId,p1])
	    );
    }

    //eventId
    text = text.replace(/\x1bEID/gi, 
    	subject instanceof Game_Event ? subject._eventId : 0
    );
    text = text.replace(/\x1bCID/gi, 
    	TRP_CommandManager.characterId(subject)
    );
    return text;
};

//=============================================================================
// Random Number
//=============================================================================
TRP_CORE.randomFloat = function(max,min){
	return new RandomFloat(max,min);
}
var RandomFloat = TRP_CORE.RandomFloat = function RandomFloat(){
	this.initialize.apply(this, arguments);
};
RandomFloat.prototype = Object.create(Number.prototype);
RandomFloat.prototype.constructor = RandomFloat;

RandomFloat.prototype.initialize = function(max,min=0){
	this._max = max;
	this._min = min;
};
RandomFloat.prototype.valueOf = function(){
	return Math.random()*(this._max-this._min)+this._min;
};
RandomFloat.prototype.toString = function(){
	return String(this.valueOf());
};


TRP_CORE.randomInt = function(max,min){
	return new RandomInt(max,min);
}
var RandomInt = TRP_CORE.RandomInt = function RandomInt(){
	this.initialize.apply(this, arguments);
};
RandomInt.prototype = Object.create(Number.prototype);
RandomInt.prototype.constructor = RandomInt;

RandomInt.prototype.initialize = function(max,min=0){
	this._max = max;
	this._min = min;
};
RandomInt.prototype.valueOf = function(){
	return Math.randomInt(this._max-this._min+1)+this._min
};
RandomInt.prototype.toString = function(){
	return String(this.valueOf());
};







//=============================================================================
// FadableSprite
//=============================================================================
var FadableSprite = TRP_CORE.FadableSprite = function FadableSprite(){
	this.initialize.apply(this, arguments);
}
FadableSprite.prototype = Object.create(Sprite.prototype);
FadableSprite.prototype.constructor = FadableSprite;
FadableSprite.prototype.initialize = function(bitmap){
	Sprite.prototype.initialize.call(this,bitmap);
	this.clearFade();
};
FadableSprite.prototype.terminate = function(){
	this._fadeCompletion = null;
};

FadableSprite.prototype.update = function(){
	if(this._fadeDelay>0){
		this._fadeDelay -= 1;
	}else if(this._fadeCount>0){
		this.opacity -= this.opacity/this._fadeCount;
		this._fadeCount -= 1;
		if(this._fadeCount<=0){
			this._fadeCount = 0;
			this.opacity -= this.opacity/this._fadeCount;
			this.visible = false;

			if(this._fadeCompletion){
				this._fadeCompletion(this);
				this._fadeCompletion = null;
			}
		}
	}

	if(this.children.length>0){
		for(var i=this.children.length-1; i>=0; i=(i-1)|0){
			var child = this.children[i];
			if(child.update)child.update();
		}
	}
};
FadableSprite.prototype.clearFade = function(){
	this._fadeDelay = 0;
	this._fadeCount = -1;
	this._fadeCompletion = null;
	this.visible = true;
};
FadableSprite.prototype.startFadeOut = function(duration,delay=0,completion=null){
	this._fadeDelay = delay;
	this._fadeCount = duration;
	this._fadeCompletion = completion;

	this.opacity = 255;
	this.visible = true;
};




//=============================================================================
// DrawTileImage
//=============================================================================
TRP_CORE.activeTilemap = function(){
	return SceneManager._scene._spriteset._tilemap
};
TRP_CORE.bltImage = function(bitmap,source,sx,sy,sw,sh,dx,dy,dw,dh){
	if(isMZ){
		bitmap.blt(source,sx,sy,sw,sh,dx,dy,dw,dh);
	}else{
		if(source._canvas){
			bitmap.blt(source,sx,sy,sw,sh,dx,dy,dw,dh);
		}else{
			bitmap.bltImage(source,sx,sy,sw,sh,dx,dy,dw,dh);
		}
	}
}
TRP_CORE._drawTile = function(bitmap,tileId,dx,dy,bitmaps){
	if (Tilemap.isVisibleTile(tileId)) {
        if (Tilemap.isAutotile(tileId)) {
            this._drawAutotile(bitmap, tileId, dx, dy,bitmaps);
        } else {
            this._drawNormalTile(bitmap, tileId, dx, dy,bitmaps);
        }
    }
};
TRP_CORE._drawNormalTile = function(bitmap,tileId,dx,dy,bitmaps){
    var setNumber = 0;
    if (Tilemap.isTileA5(tileId)) {
        setNumber = 4;
    } else {
        setNumber = 5 + Math.floor(tileId / 256);
    }
    var w = $gameMap.tileWidth();
    var h = $gameMap.tileHeight();
    var sx = (Math.floor(tileId / 128) % 2 * 8 + tileId % 8) * w;
    var sy = (Math.floor(tileId % 256 / 8) % 16) * h;
    var source = bitmaps[setNumber];
    if (source) {
        TRP_CORE.bltImage(bitmap,source, sx, sy, w, h, dx, dy, w, h);
    }
};
TRP_CORE._drawAutotile = function(bitmap, tileId, dx, dy,bitmaps){
    var autotileTable = Tilemap.FLOOR_AUTOTILE_TABLE;
    var kind = Tilemap.getAutotileKind(tileId);
    var shape = Tilemap.getAutotileShape(tileId);
    var tx = kind % 8;
    var ty = Math.floor(kind / 8);
    var bx = 0;
    var by = 0;
    var setNumber = 0;
    var isTable = false;
    if (Tilemap.isTileA1(tileId)) {
        var waterSurfaceIndex = 0; //[0, 1, 2, 1][this.animationFrame % 4];
        setNumber = 0;
        if (kind === 0) {
            bx = waterSurfaceIndex * 2;
            by = 0;
        } else if (kind === 1) {
            bx = waterSurfaceIndex * 2;
            by = 3;
        } else if (kind === 2) {
            bx = 6;
            by = 0;
        } else if (kind === 3) {
            bx = 6;
            by = 3;
        } else {
            bx = Math.floor(tx / 4) * 8;
            by = ty * 6 + Math.floor(tx / 2) % 2 * 3;
            if (kind % 2 === 0) {
                bx += waterSurfaceIndex * 2;
            }
            else {
                bx += 6;
                autotileTable = Tilemap.WATERFALL_AUTOTILE_TABLE;
                by += 0; //this.animationFrame % 3;
            }
        }
    } else if (Tilemap.isTileA2(tileId)) {
        setNumber = 1;
        bx = tx * 2;
        by = (ty - 2) * 3;
        isTable = this.activeTilemap()._isTableTile(tileId);
    } else if (Tilemap.isTileA3(tileId)) {
        setNumber = 2;
        bx = tx * 2;
        by = (ty - 6) * 2;
        autotileTable = Tilemap.WALL_AUTOTILE_TABLE;
    } else if (Tilemap.isTileA4(tileId)) {
        setNumber = 3;
        bx = tx * 2;
        by = Math.floor((ty - 10) * 2.5 + (ty % 2 === 1 ? 0.5 : 0));
        if (ty % 2 === 1) {
            autotileTable = Tilemap.WALL_AUTOTILE_TABLE;
        }
    }

    var table = autotileTable[shape];
    var source = bitmaps[setNumber];

    if (table && source) {
        var w1 = $gameMap.tileWidth() / 2;
        var h1 = $gameMap.tileHeight() / 2;
        for (var i = 0; i < 4; i++) {
            var qsx = table[i][0];
            var qsy = table[i][1];
            var sx1 = (bx * 2 + qsx) * w1;
            var sy1 = (by * 2 + qsy) * h1;
            var dx1 = dx + (i % 2) * w1;
            var dy1 = dy + Math.floor(i / 2) * h1;
            if (isTable && (qsy === 1 || qsy === 5)) {
                var qsx2 = qsx;
                var qsy2 = 3;
                if (qsy === 1) {
                    qsx2 = [0,3,2,1][qsx];
                }
                var sx2 = (bx * 2 + qsx2) * w1;
                var sy2 = (by * 2 + qsy2) * h1;
                TRP_CORE.bltImage(bitmap,source, sx2, sy2, w1, h1, dx1, dy1, w1, h1);
                dy1 += h1/2;
                TRP_CORE.bltImage(bitmap,source, sx1, sy1, w1, h1/2, dx1, dy1, w1, h1/2);
            } else {
                TRP_CORE.bltImage(bitmap,source, sx1, sy1, w1, h1, dx1, dy1, w1, h1);
            }
        }
    }
};
TRP_CORE._drawTableEdge = function(bitmap,tileId,dx,dy,bitmaps){
    if (Tilemap.isTileA2(tileId)) {
        var autotileTable = Tilemap.FLOOR_AUTOTILE_TABLE;
        var kind = Tilemap.getAutotileKind(tileId);
        var shape = Tilemap.getAutotileShape(tileId);
        var tx = kind % 8;
        var ty = Math.floor(kind / 8);
        var setNumber = 1;
        var bx = tx * 2;
        var by = (ty - 2) * 3;
        var table = autotileTable[shape];
        if (table) {
            var source = bitmaps[setNumber];
            var w1 = $gameMap.tileWidth() / 2;
            var h1 = $gameMap.tileHeight() / 2;
            for (var i = 0; i < 2; i++) {
                var qsx = table[2 + i][0];
                var qsy = table[2 + i][1];
                var sx1 = (bx * 2 + qsx) * w1;
                var sy1 = (by * 2 + qsy) * h1 + h1/2;
                var dx1 = dx + (i % 2) * w1;
                var dy1 = dy + Math.floor(i / 2) * h1;
                TRP_CORE.bltImage(bitmap,source, sx1, sy1, w1, h1/2, dx1, dy1, w1, h1/2);
            }
        }
    }
};



/* instance cache
===================================*/
TRP_CORE._cache = {};
TRP_CORE.get = function(targetClass){
	var key = targetClass.prototype.constructor.name;
	if(key){
		if(this._cache[key] && this._cache[key].length>0){
			return this._cache[key].pop();
		}
	}
	return new targetClass();
};
TRP_CORE.cache = function(instance){
	instance.clearForCache();

	var key = instance.constructor.name;
	if(!this._cache[key]){
		this._cache[key] = []
	}
	if(!this._cache[key].includes(instance)){
		this._cache[key].push(instance);
	}
};



//=============================================================================
// RectPacker
//=============================================================================
(()=>{
	var RectPacker = TRP_CORE.RectPacker = function(){};
	// RectPacker.test = function(num=30){
	// 	var max = 512;
	// 	var min = 16;
	// 	var rects = [];
	// 	for(var i=0; i<num; i=(i+1)|0){
	// 		var w = min+Math.floor((max-min+1)*(Math.random()*Math.random()));
	// 		var h = min+Math.floor((max-min+1)*(Math.random()*Math.random()));
	// 		rects.push(new Rect(0,0,w,h));
	// 	}

	// 	var size = this.pack(rects);

	// 	var graphics = new PIXI.Graphics();
	// 	SceneManager._scene.addChild(graphics);

	// 	for(var i=0; i<num; i=(i+1)|0){
	// 		var rect = rects[i];
	// 		var color = Math.randomInt(256)+256*Math.randomInt(256)+256*256*Math.randomInt(256)
	// 		graphics.beginFill(color)
	// 			.drawRect(rect.x,rect.y,rect.w,rect.h);
	// 	}
	// };
	RectPacker.devDrawNodes = function(node,rects){
		var graphics = new PIXI.Graphics();
		SceneManager._scene.addChild(graphics);
		graphics.scale.set(0.5,0.5);

		// varnum = rects.length;
		// for(var i=0; i<num; i=(i+1)|0){
		// 	var rect = rects[i];
			// var color = Math.randomInt(256)+256*Math.randomInt(256)+256*256*Math.randomInt(256)
			// graphics.beginFill(color)
			// 	.drawRect(rect.x,rect.y,rect.w,rect.h);
		// }
 
		var nexts = [node];
		var currents = [];
		while(nexts.length){
			var temp = currents;
			currents = nexts;
			nexts = temp;
			nexts.length = 0;
			for(const n of currents){
				if(n.rect){
					var color = Math.randomInt(256)+256*Math.randomInt(256)+256*256*Math.randomInt(256)
					graphics.beginFill(color)
						.drawRect(n.rect.x,n.rect.y,n.rect.w,n.rect.h);
				}
				if(n.left)nexts.push(n.left);
				if(n.right)nexts.push(n.right);
			}
		}
	};

	RectPacker.packBitmaps = function(bitmaps,m=1,fixSize=0){
		var allData = [];
		var rects = [];
		for(const bitmap of bitmaps){
			var data = {
				rect:new Rect(0,0,bitmap.width,bitmap.height),
				bitmap:bitmap,
			};
			allData.push(data);
			rects.push(data.rect);
		}
		var result = this.pack(rects.concat(),m,fixSize);
		if(!result){
			SoundManager.playBuzzer();
			return null;
		}

		var [w,h,root] = result;
		var bitmap = new Bitmap(w,h);

		for(const data of allData){
			var src = data.bitmap;
			var rect = data.rect;
			TRP_CORE.bltImage(bitmap,src,0,0,src.width,src.height, rect.x,rect.y);
		}

		return {bitmap,w,h,root,rects};
	};
	
	RectPacker.pack = function(imageRects,m=1,fixSize=0){
		this.sortImageRects(imageRects);

		var result = null;
		var [w, h] = this.calcInitialRect(imageRects);
		if(fixSize){
			w = Math.max(w,fixSize);
			h = Math.max(h,fixSize);
		}

		while(true){
			var root = new Node(new Rect(0, 0, w, h));
			result = this.insertImagesToRoot(imageRects,root,m,w,h);
			if(result){
				if(fixSize){
					if((w>fixSize||h>fixSize))return null;
				}
				return [w, h,root];
			}else if(fixSize){
				return null;
			}else{
				w *= 2;
				h *= 2;
			}
		}
	};
	RectPacker.sortImageRects = function(imageRects){
		imageRects.sort((a,b)=>{
			var a0,a1,b0,b1;
			if(a.w>=a.h){
				a0 = a.w;
				a1 = a.h;
			}else{
				a0 = a.h;
				a1 = a.w;
			}
			if(b.w>=b.h){
				b0 = b.w;
				b1 = b.h;
			}else{
				b0 = b.h;
				b1 = b.w;
			}
			if(a0>b0)return -1;
			else if(b0>a0)return 1;

			return b1-a1;
		});
	};

	RectPacker.insertImagesToRoot = function(imageRects, root, margin=1){
		for(const imageRect of imageRects){
			if (!root.insert(imageRect, margin)) {
				return false;
			}
		}

		// if(_Dev && _Dev.inDev){
		// 	this.devDrawNodes(root,imageRects);
		// }

		return true;
	};

	RectPacker.calcInitialRect = function(images) {
		var totalPixel = this.calcTotalPixel(images);
		var w = this.powerOfTwo(Math.floor(Math.sqrt(totalPixel)) / 2);
		var h = w;
		while (w * h < totalPixel) {
			w *= 2;
			h *= 2;
		}
		return [w, h];
	};
	RectPacker.calcTotalPixel = function(images){
		var size = 0;
		for(const image of images){
			size += image.w*image.h;
		}
		return size;
	};
	RectPacker.powerOfTwo = function(value){
		var size = 1;
		while(size<value){
			size *= 2;
		}
		return size;
	};


	/* Rect
	===================================*/
	var Rect = RectPacker.Rect = function(x,y,w,h){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	};

	/* Node
	===================================*/
	var Node = RectPacker.Node = function(rect){
		this.left = this.right = null;
		this.rect = rect;
	};
	Node.prototype.insert = function(rect,m){
		//すでに分割済みなら左右ノードに振る
		if(!this.rect){
			if(this.left.insert(rect,m))return true;
			return this.right.insert(rect,m);
		}

		//自身のrectサイズより大きかったら失敗
		if(rect.w+m > this.rect.w
			|| rect.h+m > this.rect.h
		){
			return false;
		}

		//画像(rect)は自身のorigin位置に
		rect.x = this.rect.x;
		rect.y = this.rect.y;

		var w = rect.w+m;
		var h = rect.h+m;
		var dw = this.rect.w-w;
		var dh = this.rect.h-h;

		//自身を３分割(画像Rect+左右)
		//□□
		//□□
		if(dw>dh){
			//画右
			//左右
			this.left = new Node(
				new Rect(this.rect.x,this.rect.y+h,w,dh)
			);
			this.right = new Node(
				new Rect(this.rect.x+w,this.rect.y,dw,this.rect.h)
			);
		}else{
			//画左
			//右右
			this.left = new Node(
				new Rect(this.rect.x+w,this.rect.y,dw,h)
			);
			this.right = new Node(
				new Rect(this.rect.x ,this.rect.y+h,this.rect.w,dh)
			);
		}
		//自身はrectを失って判断は左右に委ねる
		//└実際のrectは対応する画像rectが保持
		this.rect = null;
		return true;
	};

})();






//=============================================================================
// MapMock
//=============================================================================
TRP_CORE.isMapMockEnabled = function(){
	return Number(parameters.mapMockTilesetId)>0 && !!$dataTilesets[Number(parameters.mapMockTilesetId)];
};
if(Number(parameters.mapMockTilesetId)>0)(()=>{
	TRP_CORE.MOCK_IMAGE_DIR = '_trpMapMock/';

	var _DataManager_onLoad = DataManager.onLoad;
	DataManager.onLoad = function(object){
		_DataManager_onLoad.call(this,...arguments);
		if(object===$dataMap && TRP_CORE.isMapMockEnabled()){
			if($dataMap.parallaxName.indexOf(TRP_CORE.MOCK_IMAGE_DIR)===0){
				$dataMap.parallaxName = $dataMap.meta.originalParallaxName||'';
				if($dataMap.parallaxName==='null'){
					$dataMap.parallaxName = '';
				}
				$dataMap.tilesetId = Number($dataMap.meta.originalTilesetId);
				if(isNaN($dataMap.tilesetId)||!$dataMap.tilesetId){
					if(_Dev){
						_Dev.showText([
							'モック復元用データが破損しています。',
							'マップメモ欄<originalTilesetId:タイルセットID>',
						],'red')
					}
				}
			}
		}
	};
})();



//=============================================================================
// [TRP_Sprite]
//=============================================================================

//=============================================================================
// TRP_Animator
//=============================================================================
TRP_Animator.prototype.initialize = function() {
	this._animations = [];

	this.alpha = 1;
	this._arcAlpha = 0;
	this._opacity = null;
};
TRP_Animator.prototype.clearForCache = function(){
	for(var i=this._animations.length-1; i>=0; i=(i-1)|0){
		TRP_CORE.cache(this._animations[i]);
	}
	this._animations.length = 0;
};

TRP_Animator.prototype.update = function(parent){
	if(this._srcAlpha){
		parent.alpha = this._srcAlpha;
	}

	var animation = this._animations[0];
	if(animation){
		if(!animation.isStarted()){
			animation.start(parent);
		}
		animation.update(parent,this);
		if(animation.isEnd()){
			this._animations.shift();
			TRP_CORE.cache(animation);
		}
	}

	if(this._opacity){
		this.updateOpacity(parent);
	}else if(this.alpha!==1){
		this._srcAlpha = parent.alpha||this._srcAlpha;
		parent.alpha *= this.alpha;
	}
};

TRP_Animator.prototype.push = function(animation){
	this._animations.push(animation);
	return this;
};
TRP_Animator.prototype.add = TRP_Animator.prototype.push;
TRP_Animator.prototype.unshift = function(animation){
	this._animations.unshift(animation);
	return this;
};


/* opacity rate
===================================*/
TRP_Animator.prototype.setOpacityRate = function(opacityRate,sprite){
	//set opacityRate without effect to animation
	if(this.alpha){
		sprite.opacity /= this.alpha;
	}
	if(sprite){
		if(this._srcAlpha){
			sprite.alpha = this._srcAlpha;
		}else{
			this._srcAlpha = sprite.alpha;
		}
		this.alpha = opacityRate/255;
	}
	sprite.opacity *= this.alpha;
};

TRP_Animator.prototype.opacityRate = function(duration,opacity,easing,sprite=null){
	if(this._opacity)TRP_CORE.cache(this._opacity);
	this._opacity = null;

	if(!duration){
		this.alpha = opacity/255;
		if(sprite){
			if(this._srcAlpha){
				sprite.alpha = this._srcAlpha;
			}else{
				this._srcAlpha = sprite.alpha;
			}
			sprite.opacity *= this.alpha;
		}
	}else{
		this._opacity = TRP_CORE.get($.Opacity).setup(duration,opacity,easing);
	}
	return this;
};
TRP_Animator.prototype.updateOpacity = function(parent){
	var opacity = this._opacity;
	if(!opacity.isStarted()){
		this._srcAlpha = parent.alpha||this._arcAlpha;
		opacity.start(this);
	}

	opacity.update(this);

	parent.alpha *= this.alpha;
	if(opacity.isEnd()){
		TRP_CORE.cache(opacity);
		this._opacity = null;
	}
};


/* helper
===================================*/
TRP_Animator.prototype.setSrcPosition = function(x,y,relative){
	for(const anim of this._animations){
		anim.setSrcPosition(x,y,relative);
	}
};


/* factory
===================================*/
TRP_Animator.animationsWithArray = function(array){
	var animations = [];
	for(const anim of array){
		var type = anim[0];
		switch(type){
		case 'sequence':
		case 'loop':
		case 'set':
			animations.push(
				this[type](
					this.animationsWithArray(anim.slice(1))
				)
			);
			break;
		default:
			animations.push(
				this[type](...(anim.slice(1)))
			);
			break;
		}
	}

	return animations;
};





//=============================================================================
// AnimationBase
//=============================================================================
var $ = TRP_Animator;
var Base = $.Base = function Animation___Base(){
	this.initialize.apply(this, arguments);
}
$.Wait = $.Base;
function AnimationBase(){
	this.initialize.apply(this, arguments);
}

$.wait = function(duration){
	return TRP_CORE.get($.Wait).setup(duration);
};
$.prototype.wait = function(){
	return this.add($.wait(...arguments));
};

/* initialize
===================================*/
Base.prototype.initialize = function(){
	this._durationValue = 0;
	this._easing = null;
	this._loop = false;

	this._duration = 0;
	this._count = 0;
};
Base.prototype.clearForCache = function(){};
Base.prototype.setup = function(duration=0,easing=null,loop=false){
	this._durationValue = duration;
	this._easing = easing;
	this._loop = loop;

	this._duration = 0;
	this._count = 0;

	return this;
};

Base.prototype.isStarted = function(){
	return (this._count !== 0)? true : false;
};
Base.prototype.isEnd = function(){
	return (this._count >= this._duration) ? true : false;
};

Base.prototype.update = function(parent){
	this._count += 1;
};
Base.prototype.frameRate = function(){
	if(!this._easing)return this._count/this._duration;
	return TRP_CORE.easing[this._easing](this._count/this._duration);
};

Base.prototype.start = function(parent){
	this._isStarted = true;
	this._duration = this._duration || Number(this._durationValue)||1;
};
Base.prototype.reset = function(){
	this._count = 0;
	this._duration = 0;
	this._isStarted = false;
};
Base.prototype.duration = function(){
	if(!this._duration)this._duration = Number(this._durationValue);
	return this._duration;
};
Base.prototype.stopLoop = function(){};

Base.prototype.setSrcPosition = function(x,y,relative){};


//=============================================================================
// Stop
//=============================================================================
var Stop = $.Stop = function Animation___Stop(){
    this.initialize.apply(this, arguments);
};
$.stop = function(){
    return TRP_CORE.get($.Stop).setup();
}
$.prototype.stop = function(){
	if(this._animations[0] instanceof Stop)return this;
	return this.add($.stop(...arguments));
};

Stop.prototype = Object.create(Base.prototype);
Stop.prototype.constructor = Stop;
Stop.prototype.initialize = function(){
    Base.prototype.initialize.call(this);
    this._end = false;
};
Stop.prototype.setup = function(){
    Base.prototype.setup.call(this);
    return this;
};
Stop.prototype.start = function(parent){
	Base.prototype.start.call(this,parent);
};
Stop.prototype.update = function(parent){
    Base.prototype.update.call(this,parent);
};
Stop.prototype.isEnd = function(){
	return this._end;
};
Stop.prototype.end = function(){
	this._end = true;
};


//=============================================================================
// Sequence
//=============================================================================
var Sequence = $.Sequence = function Animation___Sequence(){
    this.initialize.apply(this, arguments);
};

$.sequence = function(animations,loop,easing){
    return TRP_CORE.get($.Sequence).setup(animations,loop,easing);
};
$.prototype.sequence = function(animations,loop,easing){
	return this.add($.sequence(...arguments));
};
$.loop = function(animations,easing){
	return TRP_CORE.get($.Sequence).setup(animations,true,easing);
};
$.prototype.loop = function(animations,easing){
	return this.add($.sequence(animations,true,easing));
};
$.prototype.stopLoop = function(forceEnd=false){
	for(const anim of this._animations){
		if(!(anim instanceof Sequence) || !anim._loop)continue;
		var last = TRP_CORE.last(anim._animations);
		if(last instanceof Stop){
			last._end = false;
		}else{
			anim._animations.push($.stop());
		}

		if(forceEnd || (anim._currentIndex===0&&!anim._currentAnimation)){
			anim._currentIndex = anim._animations.length-1;
			anim._currentAnimation = TRP_CORE.last(anim._animations);
			this._animations = [anim];
			break;
		}
	}
};
$.prototype.resumeLoop = function(){
	for(const anim of this._animations){
		if(!(anim instanceof Sequence) || !anim._loop)continue;
		var last = TRP_CORE.last(anim._animations);
		if(last instanceof Stop){
			last._end = true;
		}
	}
};

/* initialize
===================================*/
Sequence.prototype = Object.create($.Base.prototype);
Sequence.prototype.constructor = Sequence;
Sequence.prototype.initialize = function() {
    Base.prototype.initialize.call(this);
    this._animations = null;
    this._currentIndex = 0;
    this._currentAnimation = null;
    this._loop = false;
};

Sequence.prototype.clearForCache = function(){
   	Base.prototype.clearForCache.call(this);

   	if(this._animations){
   		for(var i=this._animations.length-1; i>=0; i=(i-1)|0){
			TRP_CORE.cache(this._animations[i]);
		}
   	}
    this._animations = null;
    this._currentAnimation = null;
};
Sequence.prototype.setup = function(animations,loop,easing) {
    var duration = 0;
    for(const animation of animations){
        duration += animation.duration();
    }
    Base.prototype.setup.call(this,duration,easing,loop);

    this._animations = animations.concat();
    this._currentIndex = 0;
    this._currentAnimation = null;
    return this;
};
Sequence.prototype.update = function(parent){
    var length = this._animations.length;
    var animation = this._currentAnimation;
    if(!animation){
        animation = this._animations[this._currentIndex];
        this._currentAnimation = animation;
        animation.reset();
        animation.start(parent);
    }
    animation.update(parent);   
    if(animation.isEnd()){
        animation._count = 0;
        animation._isStarted = false;

        this._currentAnimation = null;
        this._currentIndex += 1;
    }

    if(this.isEnd() && this._loop){
        this._currentIndex=0;
        this._count = 0;
    }else{
        this._count += 1;
    }
};
Sequence.prototype.stopLoop = function(){
    this._loop = false;
};
Sequence.prototype.isEnd = function(){
    return (this._currentIndex === this._animations.length);
};
Sequence.prototype.start = function(parent){
    this._currentIndex = 0;
};
Sequence.prototype.releaseHandler = function(){
    this._animations.forEach(function(animation){
        if(animation.releaseHandler)animation.releaseHandler();
    });
};

Sequence.prototype.duration = function(){
    var frame = 0;
    var length = this._animations.length;
    for(var i=length-1; i>=0; i--){
        var animation = this._animations[i];
        frame += animation.duration();
    }

    return frame;
};
Sequence.prototype.setSrcPosition = function(x,y,relative=false){
	var anim = this._animations ? this._animations[this._currentIndex] : null;
	if(anim){
		anim.setSrcPosition(x,y,relative);
	}
};


//=============================================================================
// Animation.Set
//=============================================================================
var Set = $.Set = function Animation___Set(){
    this.initialize.apply(this, arguments);
};
$.set = function(animations){
    return TRP_CORE.get($.Set).setup(...arguments);
};
$.prototype.set = function(animations){
	return this.add($.set(...arguments));
};

Set.prototype = Object.create($.Base.prototype);
Set.prototype.constructor = Set;
Set.prototype.initialize = function() {
    Base.prototype.initialize.call(this);
    this._animations = null;
    this._isStarted = false;
    this._isEnd = false;
};
Set.prototype.clearForCache = function(){
    Base.prototype.clearForCache.call(this);
    this._animations = null;
};
Set.prototype.setup = function(animations) {
    this._animations = animations;
    this._isStarted = false;
    this._isEnd = false;
    return this;
};

Set.prototype.update = function(parent){
    if(this._isEnd)return ;

    var length = this._animations.length;
    var isEnd = true;
    for(var i=length-1; i>=0; i-=1){
        var animation = this._animations[i];
        if(!animation.isEnd()){
            animation.update(parent);
        }

        if(!animation._loop &&
            !animation.isEnd())
        {
            isEnd = false;
        }
    } 
    this._isEnd = isEnd;
};
Set.prototype.isEnd = function(){
    return this._isEnd;
};
Set.prototype.reset = function(){
    this._animations.forEach(function(animation){
        animation.reset();
    });
    this._isStarted = false;
    this._isEnd = false;
};
Set.prototype.start = function(parent){
    this._isStarted = true;
    var length = this._animations.length;
    for(var i=0; i<length ; i++){
        var animation = this._animations[i];
        animation.start(parent);
    } 
};
Set.prototype.isStarted = function(){
    return this._isStarted;
};
Set.prototype.releaseHandler = function(){
    this._animations.forEach(function(animation){
        if(animation.releaseHandler)animation.releaseHandler();
    });
};
Set.prototype.duration = function(){
    var maxFrame = 0;
    var length = this._animations.length;
    for(var i=length-1; i>=0; i--){
        var animation = this._animations[i];
        var frame = animation.duration();
        if(maxFrame<frame){
            maxFrame = frame;
        }
    } 
    return maxFrame;
};
Set.prototype.setSrcPosition = function(x,y,relative){
	if(!this._animations)return;
	for(const anim of this._animations){
		anim.setSrcPosition(x,y,relative);
	}
};


//=============================================================================
// Move
//=============================================================================
var Move = $.Move = function Animation___Move(){
    this.initialize.apply(this, arguments);
}
$.move = function(duration, x,y, relative,easing){
    return TRP_CORE.get($.Move).setup(...arguments);
}
$.prototype.move = function(){
	return this.add($.move(...arguments))
}
Move.prototype = Object.create(Base.prototype);
Move.prototype.constructor = Move;
Move.prototype.initialize = function() {
    Base.prototype.initialize.call(this);
    this._xValue = 0;
    this._yValue = 0;
    this._relative = true;
    this._srcX = 0;
    this._srcY = 0;
    this._dstX = 0;
    this._dstY = 0;
};
Move.prototype.setup = function(duration, x,y, relative=true,easing){
    Base.prototype.setup.call(this,duration,easing);
    this._xValue = x;
    this._yValue = y;
    this._relative = relative;
    return this;
};
Move.prototype.start = function(parent){
	Base.prototype.start.call(this,parent);
    this._srcX = parent.x;
    this._srcY = parent.y;
    this._dstX = Number(this._xValue);
    this._dstY = Number(this._yValue);
    if(this._relative){
        this._dstX += parent.x;
        this._dstY += parent.y;
    }
};
Move.prototype.update = function(parent){
    Base.prototype.update.call(this,parent);

    var fr = this.frameRate();
    parent.x = this._srcX + ((this._dstX - this._srcX) * fr); 
    parent.y = this._srcY + ((this._dstY - this._srcY) * fr);
};

Move.prototype.setSrcPosition = function(x,y,relative=false){
	var dx,dy;
	if(relative){
		dx = x;
		dy = y;
	}else{
		dx = x-this._srcX;
		dy = y-this._srcY;
	}
	this._srcX += dx;
	this._srcY += dy;
	if(this._relative){
		this._dstX += dx;
		this._dstY += dy;
	}
};



//=============================================================================
// Scale
//=============================================================================
var Scale = $.Scale = function Animation___Scale(){
    this.initialize.apply(this, arguments);
};
$.scale = function(duration,scaleX,scaleY,relative,easing){
    return TRP_CORE.get($.Scale).setup(...arguments);
};
$.prototype.scale = function(duration,scaleX,scaleY,relative,easing){
	return this.ad($.scale(...arguments));
};

Scale.prototype = Object.create(Base.prototype);
Scale.prototype.constructor = Scale;
Scale.prototype.initialize = function() {
    Base.prototype.initialize.call(this);

    this._xValue = 0;
    this._yValue = 0;
    this._relative = false;

    this._dstX = 0;
    this._dstY = 0;
    this._srcX = 0;
    this._srcY = 0;
};
Scale.prototype.setup = function(duration,scaleX,scaleY,relative=false,easing){
    Base.prototype.setup.call(this,duration,easing);
    this._xValue = scaleX;
    this._yValue = scaleY;
    this._relative = relative;
    return this;
};
Scale.prototype.start = function(parent){
	Base.prototype.start.call(this,parent);
    this._srcX = parent.scale.x;
    this._srcY = parent.scale.y;
    this._dstX = Number(this._xValue);
    this._dstY = Number(this._yValue);
    if(this._relative){
    	this._dstX *= this._srcX;
    	this._dstY *= this._srcY;
    }
};
Scale.prototype.update = function(parent){
    Base.prototype.update.call(this,parent);

    var fr = this.frameRate();
    parent.scale.set(
        this._srcX + ((this._dstX - this._srcX) * fr)
        ,this._srcY + ((this._dstY - this._srcY) * fr)
    );
};




//=============================================================================
// Rotation
//=============================================================================
var Rotation = $.Rotation = function Animation___Rotation(){
    this.initialize.apply(this, arguments);
};
$.rotation = function(duration,rotation,relative,easing){
    return TRP_CORE.get($.Rotation).setup(duration,rotation,relative,easing);
};
$.rotate = $.rotation;

$.prototype.rotation = function(duration,rotation,relative,easing){
	return this.add($.rotation(...arguments));
};
$.prototype.rotate = $.prototype.rotation;

$.angle = function(duration,angle,relative,easing){
	return TRP_CORE.get($.Rotation).setup(duration,angle*Math.PI/180,relative,easing);
};
$.prototype.angle = function(){
	return this.add($.angle(...arguments));
};

Rotation.prototype = Object.create(Base.prototype);
Rotation.prototype.constructor = Rotation;
Rotation.prototype.initialize = function(){
    Base.prototype.initialize.call(this);
    this._relative = true;
    this._rotationValue = 0;
    this._srcRotation = 0;
    this._dstRotation = 0;
};
Rotation.prototype.setup = function(duration,rotation,relative=true,easing) {
    Base.prototype.setup.call(this,duration,easing);
    this._relative = relative;
    this._rotationValue = rotation;
    return this;
};
Rotation.prototype.start = function(parent){
	Base.prototype.start.call(this,parent);
    this._srcRotation = parent.rotation;
    this._dstRotation = Number(this._rotationValue);

    if(this._relative){
        this._dstRotation += parent.rotation;
    }
};
Rotation.prototype.update = function(parent){
    Base.prototype.update.call(this,parent);

    if(parent.rotation !== undefined){
        parent.rotation = this._srcRotation + ((this._dstRotation - this._srcRotation) * this.frameRate());
    }
};




//=============================================================================
// Opacity
//=============================================================================
var Opacity = $.Opacity = function Animation___Opacity(){
    this.initialize.apply(this, arguments);
};
$.opacity = function(duration,opacity,easing){
    return TRP_CORE.get($.Opacity).setup(duration,opacity,easing);
}
$.prototype.opacity = function(duration,opacity,easing){
	return this.add($.opacity(...arguments));
};

Opacity.prototype = Object.create(Base.prototype);
Opacity.prototype.constructor = Opacity;
Opacity.prototype.initialize = function(){
    Base.prototype.initialize.call(this);
    this._opacityValue = 0;
    this._dstAlpha = 0;
    this._srcAlpha = 0;
};
Opacity.prototype.setup = function(duration,opacity,easing){
    Base.prototype.setup.call(this,duration,easing);

    this._opacityValue = opacity;
    return this;
};
Opacity.prototype.start = function(parent){
	Base.prototype.start.call(this,parent);
    this._dstAlpha = Number(this._opacityValue)/255;
    this._srcAlpha = parent.alpha;
};
Opacity.prototype.update = function(parent,animator=null){
    Base.prototype.update.call(this,parent);
    if(parent.alpha !== undefined){
        parent.alpha = this._srcAlpha + ((this._dstAlpha - this._srcAlpha) * this.frameRate());

        if(animator){
        	parent.alpha *= animator.alpha;
        }
    }
};





//=============================================================================
// Skew
//=============================================================================
var Skew = $.Skew = function Animation___Skew(){
	this.initialize.apply(this, arguments);
};
$.skew = function(duration,x,y,relative,easing){
	return TRP_CORE.get($.Skew).setup(...arguments);
}
$.prototype.skew = function(duration,x,y,relative,easing){
	return this.add($.skew(...arguments));
};

/* initialize
===================================*/
$.Skew.prototype = Object.create(Base.prototype);
$.Skew.prototype.constructor = $.Skew;

Skew.prototype.initialize = function(){
	Base.prototype.initialize.call(this);
	this._relative = false;
	this._xValue = 0;
	this._yValue = 0;
};
Skew.prototype.setup = function(duration,x=0,y=0,relative=false,easing=null){
	Base.prototype.setup.call(this,duration,easing);
	this._relative = !!relative;
	this._xValue = x;
	this._yValue = y;
	return this;
};
Skew.prototype.start = function(parent){
	Base.prototype.start.call(this,parent);
	
	this._srcX = parent.skew.x;
	this._srcY = parent.skew.y;
	this._dstX = Number(this._xValue)*Math.PI/180;
	this._dstY = Number(this._yValue)*Math.PI/180;
	if(this._relative){
		this._dstX += parent.skew.x;
		this._dstY += parent.skew.y;
	}
};
Skew.prototype.update = function(parent){
	Base.prototype.update.call(this,parent);

	var fr = this.frameRate();
	parent.skew.set(
		this._srcX + ((this._dstX - this._srcX) * fr),
		this._srcY + ((this._dstY - this._srcY) * fr),
	);
};











//=============================================================================
// TRP_Container
//=============================================================================
var TRP_Container = TRP_CORE.TRP_Container = function TRP_Container(){
	this.initialize.apply(this, arguments);
}

TRP_Container.prototype = Object.create(PIXI.Container.prototype);
TRP_Container.prototype.constructor = TRP_Container;

TRP_Container.prototype.initialize = function(texture){
	PIXI.Container.call(this,texture);

	this.width = Graphics.width;
	this.height = Graphics.height;
	this._animator = null;
};
Object.defineProperty(TRP_Container.prototype, 'opacity', {
	get: function() {
		return this.alpha * 255;
	},
	set: function(value) {
		this.alpha = value.clamp(0, 255) / 255;
	},
	configurable: true
});

Object.defineProperty(TRP_Container.prototype, 'animator', {
	get: function() {
		if(!this._animator){
			this._animator = new TRP_Animator();
		}
		return this._animator;
	},set: function(value){
		this._animator = value;
	},
	configurable: true
});


TRP_Container.prototype.update = function() {
	if(this._animator && (this._animator._animations.length||this._animator._opacity)){
		this._animator.update(this);
	}

	var children = this.children;
	var length = children.length;
	var i=length-1;
	for(;i>=0;i-=1){
		var child = children[i];
		if (child && child.update){
			child.update();
		}
	}
};

TRP_Container.prototype.processTouch = function(alreadyTouch){
	for(var i=this.children.length-1; i>=0; i=(i-1)|0){
		var child = this.children[i];
		if(child.processTouch){
			alreadyTouch = child.processTouch(alreadyTouch);
		}
	}
	return alreadyTouch;
};
TRP_Container.prototype.canvasToLocalX = function(x){
    var node = this;
    while (node) {
        x -= node.x;
        node = node.parent;
    }
    return x;
};
TRP_Container.prototype.canvasToLocalY = function(y) {
    var node = this;
    while (node) {
        y -= node.y;
        node = node.parent;
    }
    return y;
};


//=============================================================================
// TRP_Sprite
//=============================================================================
var TRP_Sprite = TRP_CORE.TRP_Sprite = function TRP_Sprite(){
	this.initialize.apply(this, arguments);
};

TRP_Sprite.prototype = Object.create(Sprite.prototype);
TRP_Sprite.prototype.constructor = TRP_Sprite;
TRP_Sprite.prototype.initialize = function(bitmap){
	Sprite.prototype.initialize.call(this,bitmap);
	this._animator = null;
};
TRP_Sprite.prototype.clear = function(){
	if(this._animator){
		TRP_CORE.cache(this._animator);
	}
	this.x = this.y = 0;
	this.rotation = 0;

	this.anchor.set(0,0);
	this.scale.set(1,1);
	this.skew.set(0,0);

	this.tint = 0xffffff;
	this.filters = null;

	if(!isMZ){
		this._isPicture = false;
	}
};

Object.defineProperty(TRP_Sprite.prototype, 'animator', {
	get: function() {
		if(!this._animator){
			this._animator = new TRP_Animator();
		}
		return this._animator;
	},set: function(value){
		this._animator = value;
	},
	configurable: true
});


TRP_Sprite.prototype.update = function() {
	if(this._animator && (this._animator._animations.length||this._animator._opacity)){
		this._animator.update(this);
	}

	var children = this.children;
	var length = children.length;
	var i=length-1;
	for(;i>=0;i-=1){
		var child = children[i];
		if (child && child.update){
			child.update();
		}
	}
};
TRP_Sprite.prototype.processTouch = TRP_Container.prototype.processTouch;
TRP_Sprite.prototype.canvasToLocalX = TRP_Container.prototype.canvasToLocalX;
TRP_Sprite.prototype.canvasToLocalY = TRP_Container.prototype.canvasToLocalY;



//=============================================================================
// IF_HandlerOwner
//=============================================================================
function IF_HandlerOwner(){
	this.initialize.apply(this, arguments);
}
IF_HandlerOwner.prototype.initializeHandlers = function(){
    this._handlers = {};
};
IF_HandlerOwner.prototype.releaseHandlers = function(){
    this._handlers = {};
};
IF_HandlerOwner.prototype.setHandler = function(key,handler){
	this._handlers[key] = handler;
}
IF_HandlerOwner.prototype.callHandler = function(name,...args){
	var command = 'command'+TRP_CORE.capitalize(name);
    if(this[command]){
    	this[command](...args);
    }
    if(this._handlers[name]){
        return this._handlers[name](...args);
    }
    return null;
};
IF_HandlerOwner.prototype.isHandled = function(name){
	var command = 'command'+TRP_CORE.capitalize(name);
    if(this[command])return true;
    if(this._handlers[name])return true;
	return false;
};


//=============================================================================
// TRP_TouchableSprite
//=============================================================================
var TRP_TouchableSprite = TRP_CORE.TRP_TouchableSprite = function TRP_TouchableSprite(){
	this.initialize.apply(this, arguments);
};
TRP_TouchableSprite.prototype = Object.create(TRP_Sprite.prototype);
Object.assign(TRP_TouchableSprite.prototype,IF_HandlerOwner.prototype);
TRP_TouchableSprite.prototype.constructor = TRP_TouchableSprite;
TRP_TouchableSprite.prototype.initialize = function(bitmap){
	TRP_Sprite.prototype.initialize.call(this,bitmap);

	this.initializeHandlers();
	this.disabled = false;
	this.clearTouch();
};
TRP_TouchableSprite.prototype.clearTouch = function(){
	this._touching = null;
    this._pressMotion = false;

    this._buttonRepeatInterval = 0;
    this._buttonRepeatDuration = 0;
    this._buttonRepeatCount = 0;

    this._touchMarginX = 0;
    this._touchMarginY = 0;
};

TRP_TouchableSprite.prototype.clearButtonTouching = function(){
    this._touching = null;
    if(this._pressMotion){
        this.clearPressMotion();
    }
};

TRP_TouchableSprite.DEFAULT_REPEAT_INTERVAL = 10;
TRP_TouchableSprite.prototype.setButtonRepeatInterval = function(interval=TRP_TouchableSprite.DEFAULT_REPEAT_INTERVAL){
    this._buttonRepeatInterval = interval;
};

TRP_TouchableSprite.prototype.pressMotion = function(){};
TRP_TouchableSprite.prototype.clearPressMotion = function(){};

TRP_TouchableSprite.prototype.processTouch = function(alreadyTouch=false){
	alreadyTouch = TRP_Sprite.prototype.processTouch.call(this,alreadyTouch);

	if(!this.isActive()){
		this._touching = null;
	}else{
		var buttonTouched;
		var tx = TouchInput.x;
    	var ty = TouchInput.y;
        if(alreadyTouch===false
        	&& (TouchInput.isTriggered()||TouchInput.isPressed())
            && this.isTouchedInsideFrame())
        {
            alreadyTouch = true;
            if(TouchInput.isTriggered()){
                if(this.disabled){
                    return alreadyTouch;
                }

            	this.callHandler('touch');

                this._touching = {
                	x0:tx,
                	y0:ty,
                	x:tx,
                	y:ty,
                	count:-1,
                	moveOutside:false,
                };
                this.pressMotion();

                if(this._buttonRepeatInterval>0){
                    this._buttonRepeatCount = 1;
                    this._buttonRepeatDuration = this._buttonRepeatInterval;
                    this.callClickHandler();
                }
            }
        }else if(this._touching){
        	alreadyTouch = true;
        	this._touching.moveOutside = true;
        }
        
        if (this._touching) {
        	this._touching.count += 1;
            if (TouchInput.isReleased()){
            	this.clearPressMotion();

                if(!this._touching.moveOutside && !this._buttonRepeatInterval){
                	this.callHandler('click')
                }
                this._touching = null;
            }else{
            	if(this._touching.x!==tx || this._touching.y!==ty){
	        		this.callHandler('move',tx-this._touching.x,ty-this._touching.y,tx,ty,this._touching.x0,this._touching.y0);
	        		this._touching.x = tx;
	        		this._touching.y = ty;
            	}

	            if(!this.isTouchedInsideFrame()){
	            	this._touching.moveOutside = true;
	            }else if(this._touching.count>=20 && (this.isHandled('press'))){
	            	if(this.callHandler('click')){
	                }else if (this.isHandled('press')){
	                	this.callHandler('press');
	                }
	                this.clearButtonTouching();
	            }else if(this._buttonRepeatInterval>0){
	                this._buttonRepeatDuration -= 1;
	                if(this._buttonRepeatDuration<=0){
	                    this._buttonRepeatCount += 1;
	                    if(this._buttonRepeatCount>=10){
	                        this._buttonRepeatDuration = Math.ceil(this._buttonRepeatInterval/3);
	                    }else{
	                        this._buttonRepeatDuration = this._buttonRepeatInterval;
	                    }
	                    this.callHandler('click');
	                }
	            }
	        }
        }
	}

	return alreadyTouch;
};
TRP_TouchableSprite.prototype.isTouchedInsideFrame = function() {
    var x = this.canvasToLocalX(TouchInput.x) + (this.anchor.x * this.width);
    var marginX = this._touchMarginX||0;
    if(x<-marginX || x>this.width+marginX)return false;
    
    var y = this.canvasToLocalY(TouchInput.y) + (this.anchor.y * this.height);
    var marginY = this._touchMarginY||0;
    return y >= -marginY && y < this.height+marginY;
};


/* handler
===================================*/
TRP_TouchableSprite.prototype.setClickHandler = function(handler){
    this.setHandler('click',handler);
};
TRP_TouchableSprite.prototype.setPressHandler = function(handler){
	this.setHandler('press',handler);
};
TRP_TouchableSprite.prototype.setTouchHandler = function(handler){
	this.setHandler('touch',handler);
};


/* helper
===================================*/
TRP_TouchableSprite.prototype.isActive = function() {
    var node = this;
    while (node) {
        if (!node.visible) {
            return false;
        }
        node = node.parent;
    }
    return true;
};

//==================
// TRP_TouchableSprite===========================================================
// TRP_UIPartsSpriteSprite
//=============================================================================
function TRP_UIPartsSprite(){
	this.initialize.apply(this, arguments);
}
TRP_UIPartsSprite.prototype = Object.create(TRP_TouchableSprite.prototype);
TRP_UIPartsSprite.prototype.constructor = TRP_UIPartsSprite;
TRP_UIPartsSprite.prototype.initialize = function(value=null){
	TRP_TouchableSprite.prototype.initialize.call(this);
	this._value = value;
};
Object.defineProperty(TRP_UIPartsSprite.prototype, 'value', {
    get: function() {
        return this._value;
    },set: function(value){
    	if(this._value===value)return;
        this._value = value;
        this.refresh();
        this.callHandler('valueChange',value);
    },
    configurable: true
});
TRP_UIPartsSprite.prototype.refresh = function(){};
TRP_UIPartsSprite.prototype.setValueChangeHandler = function(handler){
	this.setHandler('valueChange',handler);
};

TRP_UIPartsSprite.prototype.setValueWithoutCallHandler = function(value){
	this._value = value;
	this.refresh();
};

//=============================================================================
// TRP_Switch
//=============================================================================
var TRP_Switch = TRP_CORE.TRP_Switch = function TRP_Switch(){
	this.initialize.apply(this, arguments);
}
TRP_Switch.prototype = Object.create(TRP_UIPartsSprite.prototype);
TRP_Switch.prototype.constructor = TRP_Switch;
TRP_Switch.prototype.initialize = function(w=48,h=24){
	TRP_UIPartsSprite.prototype.initialize.call(this);

	this._value = false;
	this.touchSwitch = false;
	this.setSize(w,h);
};
Object.defineProperty(TRP_Switch.prototype, 'on', {
    get: function() {
    	return this.value;
    },set: function(value){
    	this.value = value;
    },
    configurable: true
});
TRP_Switch.prototype.setSize = function(w,h){
	this._w = w;
	this._h = h;
	this.refreshBitmap();
	this.refresh();
};
TRP_Switch.prototype.refreshBitmap = function(){
	var w = this._w;
	var h = this._h;
	var bitmap = this.bitmap = new Bitmap(w,h*2);

	for(var i=0; i<2; i=(i+1)|0){
		var on = i===1;
		var by = i*h;
		var rm = 0;
		var r = h/2-rm;
		var rectW = (w-2*rm-2*r)-4;

		//fill base
		var c = 'rgb(100,100,100)';
		bitmap.drawCircle(rm+r,by+rm+r,r,c);
		bitmap.fillRect(rm+r,by+rm,rectW,2*r,c);
		bitmap.drawCircle(rm+r+rectW,by+rm+r,r,c);

		//fill value area
		rm += 2; r -= 2;
		c = on ? 'rgb(100,255,100)' : 'rgb(150,150,150)';
		bitmap.drawCircle(rm+r,by+rm+r,r,c);
		bitmap.fillRect(rm+r,by+rm,rectW,2*r,c);
		bitmap.drawCircle(rm+r+rectW,by+rm+r,r,c);

		//fill switch nob
		c = 'rgb(0,0,0)';
		bitmap.drawCircle(rm+r+(on?rectW:0),by+rm+r,r,c);

		rm += 1;r -= 1;
		c = 'rgb(255,255,255)';
		bitmap.drawCircle(rm+r+(on?rectW:0),by+rm+r,r,c);
	}
};
TRP_Switch.prototype.refresh = function(){
	var w = this._w;
	var h = this._h;
	this.setFrame(0,this.on?h:0,w,h);
};
TRP_Switch.prototype.commandTouch = function(){
	if(!this.touchSwitch)return;
	this.on = !this.on;
	SoundManager.playCursor();
};
TRP_Switch.prototype.commandClick = function(){
	if(this.touchSwitch)return;
	this.on = !this.on;
	SoundManager.playCursor();
};


//=============================================================================
// TRP_Slider
//=============================================================================
var TRP_Slider = TRP_CORE.TRP_Slider = function TRP_Slider(){
	this.initialize.apply(this, arguments);
}
TRP_Slider.prototype = Object.create(TRP_UIPartsSprite.prototype);
TRP_Slider.prototype.constructor = TRP_Slider;
TRP_Slider.prototype.initialize = function(w=100,h=20,value=0,opt=null){
	TRP_UIPartsSprite.prototype.initialize.call(this,value);

	this.disabled = true;
	this._w = w;
	this._h = h;
	this._r = Math.floor(h/2)
	this.anchor.set(0,0.5);

	this.width = w;
	this.height = h;
	this._integer = opt?.integer||false;
	this._log = opt?.log||0;

	this._list = opt?.list;
	if(this._list){
		this._min = Number(this._list[0]);
		this._max = Number(TRP_CORE.last(this._list));
	}else{
		this._min = TRP_CORE.supplement(0,opt?.min);
		this._max = TRP_CORE.supplement(1,opt?.max);
	}

	this.createSprites();
	this.refresh();
};

TRP_Slider.prototype.createSprites = function(){
	var container = this.container = new TRP_CORE.TRP_Container();
	this.addChild(container);

	var w = this._w;
	var h = this._h;
	var r = this._r;


	/* bar base
	===================================*/
	var br = 4;
	var bw = w-2*r-br*2;
	var bh = br*2;
	var bar = this._barSprite = new TRP_TouchableSprite();
	container.addChild(bar);
	var bitmap = bar.bitmap = new Bitmap(bw+2*br,bh);
	bar.anchor.set(0,0.5);
	bar.x = r-br;
	this._x0 = r;
	this._x1 = r+bw;

	//bar outline
	var c = 'black';
	bitmap.drawCircle(br,br,br,c);
	bitmap.fillRect(br,0,bw,bh,c);
	bitmap.drawCircle(br+bw,br,br,c);
	var bm = 1;
	c = 'rgb(150,150,150)';
	bitmap.drawCircle(br,br,br-bm,c);
	bitmap.fillRect(br,bm,bw,bh-2*bm,c);
	bitmap.drawCircle(br+bw,br,br-bm,c);
	bar.setHandler('touch',()=>{
		var x = TouchInput.x-this.x;
		setNobPos(x);
	});


	/* bar active
	===================================*/
	bh = br*2;
	var barActive = this._barActiveSprite = new TRP_Sprite();
	container.addChild(barActive);
	var bitmap = barActive.bitmap = new Bitmap(bw+2*br,bh);
	barActive.anchor.set(0,0.5);
	barActive.x = r-br;

	//bar
	bm = 1;
	c = 'rgb(100,255,100)';
	bitmap.drawCircle(br,br,br-bm,c);
	bitmap.fillRect(br,bm,bw,bh-2*bm,c);
	bitmap.drawCircle(br+bw,br,br-bm,c);

	/* scale number
	===================================*/
	var scaleW = bh+4;
	bitmap = new Bitmap(scaleW+bw+2*br,bh+2);
	var scaleSprite = new TRP_Sprite(bitmap);
	container.addChild(scaleSprite);
	scaleSprite.anchor.set(0,0.5);
	scaleSprite.x = barActive.x-scaleW/2;
	bitmap.fontSize = bh+2;
	bitmap.outlineColor = 'black';
	var scales = [];
	if(this._log===2){
		var min = Math.ceil(Math.log2(this._min));
		var max = Math.floor(Math.log2(this._max));
		for(var i=min+1; i<=max-1; i=(i+1)|0){
			var v = Math.pow(2,i);
			var rate = this.sliderRateForLogValue(v);
			var scale = v>=1 ? String(v) : String('/'+Math.pow(2,-i));
			scales.push([scale,rate]);
		}
	}else{
	}
	for(const scaleData of scales){
		var [scale,rate] = scaleData;
		var x = Math.floor(rate*(barActive.bitmap.width));
		bitmap.drawText(scale,x,1,scaleW,bh,'center');
	}


	/* nob sprite
	===================================*/
	var nob = this._nobSprite = new TRP_TouchableSprite();
	container.addChild(nob);
	bitmap = nob.bitmap = new Bitmap(2*r,2*r);
	var nr = r;
	bitmap.drawCircle(r,r,nr,'black');
	nr -= 2;
	bitmap.drawCircle(r,r,nr,'white');
	nob.anchor.set(0.5,0.5);
	nob.x = r;

	var setNobPos = (x)=>{
		nob.x = x.clamp(this._x0,this._x1);
		var valueRate = (nob.x-this._x0)/(this._x1-this._x0);
		var value;
		if(this._log===2){
			value = Math.pow(2,(Math.log2(this._min)+valueRate*(Math.log2(this._max)-Math.log2(this._min))));
		}else if(this._log===10){
			value = Math.pow(10,(Math.log10(this._min)+valueRate*(Math.log10(this._max)-Math.log2(this._min))));
		}else{
			value = this._min+(this._max-this._min)*valueRate;
		}
		if(this._list){
			//auto fit
			var bestV = 0;
			var bestFit = Number.MAX_SAFE_INTEGER;
			for(const v of this._list){
				var fit;
				if(this._log===2){
					fit = Math.abs(Math.log2(v)-Math.log2(value));
				}else if(this._log===10){
					fit = Math.abs(Math.log10(v)-Math.log10(value));
				}else{
					fit = Math.abs(v-value);
				}
				if(fit<bestFit){
					bestFit = fit;
					bestV = v;
				}
			}
			value = bestV;
			// if(this.value!==value){
			// 	SoundManager.playCursor();
			// }
		}else if(this._integer){
			value = Math.round(value);
		}
		this.value = value;
	};
	nob.setHandler('move',(dx,dy,tx,ty,tx0,ty0)=>{
		setNobPos(tx-this.x);
	});
};


TRP_Slider.prototype.refresh = function(){
	var rate = this.sliderRateForLogValue();
	var nob = this._nobSprite;
	nob.x = Math.floor(this._x0+(this._x1-this._x0)*rate);

	var bar = this._barActiveSprite;
	var w = Math.floor(rate*bar.bitmap.width);
	var h = bar.height;
	bar.setFrame(0,0,w,h);
};

TRP_Slider.prototype.sliderRateForLogValue = function(value=this._value){
	var rate;
	if(this._log===2){
		rate = (Math.log2(value)-Math.log2(this._min))/(Math.log2(this._max)-Math.log2(this._min));
	}else if(this._log===10){
		rate = (Math.log10(value)-Math.log10(this._min))/(Math.log10(this._max)-Math.log10(this._min));
	}else{
		rate = ((value-this._min)/(this._max-this._min));
	}
	return rate.clamp(0,1);
};





// --------------------------------------------------
// easing.js v0.5.4
// Generic set of easing functions with AMD support
// https://github.com/danro/easing-js
// This code may be freely distributed under the MIT license
// http://danro.mit-license.org/
// --------------------------------------------------
// All functions adapted from Thomas Fuchs & Jeremy Kahn
// Easing Equations (c) 2003 Robert Penner, BSD license
// https://raw.github.com/danro/easing-js/master/LICENSE
// --------------------------------------------------
TRP_CORE.easing = {
  linear: function(pos) {return pos},

  easeIn: function(pos) {return Math.pow(pos, 2);},
  easeOut: function(pos) {return -(Math.pow((pos-1), 2) -1);},
  easeInOut: function(pos) {
	if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,2);
	return -0.5 * ((pos-=2)*pos - 2);
  },

  quadIn: function(pos) {return Math.pow(pos, 2);},
  quadOut: function(pos) {return -(Math.pow((pos-1), 2) -1);},
  quadInOut: function(pos) {
	if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,2);
	return -0.5 * ((pos-=2)*pos - 2);
  },

  cubicIn: function(pos) {return Math.pow(pos, 3);},
  cubicOut: function(pos) {return (Math.pow((pos-1), 3) +1);},
  cubicInOut: function(pos) {
	if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,3);
	return 0.5 * (Math.pow((pos-2),3) + 2);
  },

  quartIn: function(pos) {return Math.pow(pos, 4);},
  quartOut: function(pos) {return -(Math.pow((pos-1), 4) -1);},
  quartInOut: function(pos) {
	if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,4);
	return -0.5 * ((pos-=2)*Math.pow(pos,3) - 2);
  },

  quintIn: function(pos) {return Math.pow(pos, 5);},
  quintOut: function(pos) {return (Math.pow((pos-1), 5) +1);},
  quintInOut: function(pos) {
	if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,5);
	return 0.5 * (Math.pow((pos-2),5) + 2);
  },

  sineIn: function(pos) {return -Math.cos(pos * (Math.PI/2)) + 1;},
  sineOut: function(pos) {return Math.sin(pos * (Math.PI/2));},
  sineInOut: function(pos) {
	return (-0.5 * (Math.cos(Math.PI*pos) -1));
  },

  expoIn: function(pos) {return (pos===0) ? 0 : Math.pow(2, 10 * (pos - 1));},
  expoOut: function(pos) {return (pos===1) ? 1 : -Math.pow(2, -10 * pos) + 1;},
  expoInOut: function(pos) {
	if(pos===0) return 0;
	if(pos===1) return 1;
	if((pos/=0.5) < 1) return 0.5 * Math.pow(2,10 * (pos-1));
	return 0.5 * (-Math.pow(2, -10 * --pos) + 2);
  },

  circIn: function(pos) {return -(Math.sqrt(1 - (pos*pos)) - 1);},
  circOut: function(pos) {return Math.sqrt(1 - Math.pow((pos-1), 2));},
  circInOut: function(pos) {
	if((pos/=0.5) < 1) return -0.5 * (Math.sqrt(1 - pos*pos) - 1);
	return 0.5 * (Math.sqrt(1 - (pos-=2)*pos) + 1);
  },

  bounceOut: function(pos) {
	if ((pos) < (1/2.75)) {
	  return (7.5625*pos*pos);
	} else if (pos < (2/2.75)) {
	  return (7.5625*(pos-=(1.5/2.75))*pos + 0.75);
	} else if (pos < (2.5/2.75)) {
	  return (7.5625*(pos-=(2.25/2.75))*pos + 0.9375);
	} else {
	  return (7.5625*(pos-=(2.625/2.75))*pos + 0.984375);
	}
  },

  backIn: function(pos) {
	return (pos)*pos*((1.70158+1)*pos - 1.70158);
  },
  backOut: function(pos) {
	return (pos=pos-1)*pos*((2.70158)*pos + 1.70158) + 1;
  },
  backInOut: function(pos) {
	var s = 1.70158;
	if((pos/=0.5) < 1) return 0.5*(pos*pos*(((s*=(1.525))+1)*pos -s));
	return 0.5*((pos-=2)*pos*(((s*=(1.525))+1)*pos +s) +2);
  },

  elastic: function(pos) {return -1 * Math.pow(4,-8*pos) * Math.sin((pos*6-1)*(2*Math.PI)/2) + 1;},

  swingFromTo: function(pos) {
	var s = 1.70158;
	return ((pos/=0.5) < 1) ? 0.5*(pos*pos*(((s*=(1.525))+1)*pos - s)) :
	0.5*((pos-=2)*pos*(((s*=(1.525))+1)*pos + s) + 2);
  },

  swingFrom: function(pos) {
	var s = 1.70158;
	return pos*pos*((s+1)*pos - s);
  },

  swingTo: function(pos) {
	var s = 1.70158;
	return (pos-=1)*pos*((s+1)*pos + s) + 1;
  },

  bounce: function(pos) {
	if (pos < (1/2.75)) {
	  return (7.5625*pos*pos);
	} else if (pos < (2/2.75)) {
	  return (7.5625*(pos-=(1.5/2.75))*pos + 0.75);
	} else if (pos < (2.5/2.75)) {
	  return (7.5625*(pos-=(2.25/2.75))*pos + 0.9375);
	} else {
	  return (7.5625*(pos-=(2.625/2.75))*pos + 0.984375);
	}
  },

  bouncePast: function(pos) {
	if (pos < (1/2.75)) {
	  return (7.5625*pos*pos);
	} else if (pos < (2/2.75)) {
	  return 2 - (7.5625*(pos-=(1.5/2.75))*pos + 0.75);
	} else if (pos < (2.5/2.75)) {
	  return 2 - (7.5625*(pos-=(2.25/2.75))*pos + 0.9375);
	} else {
	  return 2 - (7.5625*(pos-=(2.625/2.75))*pos + 0.984375);
	}
  },

  easeFromTo: function(pos) {
	if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,4);
	return -0.5 * ((pos-=2)*Math.pow(pos,3) - 2);
  },

  easeFrom: function(pos) {
	return Math.pow(pos,4);
  },

  easeTo: function(pos) {
	return Math.pow(pos,0.25);
  }
};


//=============================================================================
// TRP_TilingSprites
//=============================================================================
var TRP_TilingSprites = TRP_CORE.TRP_TilingSprites = function TRP_TilingSprites(){
    this.initialize.apply(this, arguments);
};


TRP_TilingSprites.prototype = Object.create(TRP_Container.prototype);
TRP_TilingSprites.prototype.constructor = TRP_TilingSprites;
TRP_TilingSprites.prototype.initialize = function(width=Graphics.width,height=Graphics.height){
	TRP_Container.prototype.initialize.call(this);
	this._width = width;
	this._height = height;
	this._blendMode = 0;

	this.noMask = false;
	this._maskSprite = null;

	this._bitmap = null;
	this._container = new TRP_Container();
	this.addChild(this._container);
	this._sprites = [];

    this._scaleX = 1;
    this._scaleY = 1;

    this.origin = new Point(0,0);
    this._lastOx = Number.MAX_SAFE_INTEGER;
    this._lastOy = Number.MAX_SAFE_INTEGER;
};


Object.defineProperty(TRP_TilingSprites.prototype, 'bitmap', {
    get: function() {
        return this._bitmap
    },set: function(value){
    	if(this._bitmap!==value){
	        this._bitmap = value;
	        this.refresh();
	    }
    },
    configurable: true
});

TRP_TilingSprites.prototype.setScale = function(scaleX=1,scaleY=1,noRefresh=false){
	if(this._scaleX===scaleX && this._scaleY===this._scaleY)return;
	this._scaleX = scaleX;
	this._scaleY = scaleY;
	if(!noRefresh){
		this.refresh();
	}
};

Object.defineProperty(TRP_TilingSprites.prototype, 'blendMode', {
    get: function() {
        return this._blendMode;
    },set: function(value){
    	if(this._blendMode===value)return;
    	this._blendMode = value;

    	TRP_CORE.setBlendMode(this,value);
    	if(this._sprites){
    		for(const sprite of this._sprites){
				sprite.blendMode = value;
			}
    	}
    },
    configurable: true
});


TRP_TilingSprites.prototype.refresh = function(){
	var bitmap = this.bitmap;
	if(!bitmap)return;
	if(!bitmap.isReady()){
		bitmap.addLoadListener(this.refresh.bind(this));
		return;
	}

	var width = this._width;
	var height = this._height;

	var w = bitmap.width * this._scaleX;
	var h = bitmap.height * this._scaleY;
	var col = Math.ceil(width/w)+1;
	var row = Math.ceil(height/h)+1;
	this._col = col;
	this._row = row;
	this._elemW = w;
	this._elemH = h;

	this.setupSprites(bitmap,col,row);
	this.setupMask()
	this.updateOrigin();

	this._container.scale.set(this._scaleX,this._scaleY);
};

TRP_TilingSprites.prototype.update = function(){
	if(this._animator && (this._animator._animations.length||this._animator._opacity)){
		this._animator.update(this);
	}
	if(!this.bitmap || !this.visible || this.opacity===0)return;

	if(this.origin.x!==this._lastOx || this.origin.y!==this._lastOy){
		this.updateOrigin();
	}
};

TRP_TilingSprites.prototype.updateOrigin = function(){
	this._lastOx = this.origin.x;
    this._lastOy = this.origin.y;

    var ox = this.origin.x%this._elemW;
    var oy = this.origin.y%this._elemH;
    if(ox<0){
    	ox += this._elemW;
    }
    if(oy<0){
    	oy += this._elemH;
    }
    this._container.x = -ox;
    this._container.y = -oy;
};

TRP_TilingSprites.MASK_SIZE = 100;
TRP_TilingSprites.prototype.setupMask = function(){
	if(this.noMask){
		if(this._maskSprite){
			this._container.mask = null;
			this.removeChild(this._maskSprite);
			this._maskSprite.destroy();
			this._maskSprite = null;
		}
	}else{
		var size = TRP_TilingSprites.MASK_SIZE;
		if(!this._maskSprite){
			var mask = new PIXI.Graphics();
			mask.beginFill(0xffffff)
				.drawRect(0,0,size,size)
				.endFill();

			this._maskSprite = mask;
			this._container.mask = mask;
			this.addChild(mask);
		}
		this._maskSprite.scale.set(
			this._width/size,this._height/size
		);
	}
};

TRP_TilingSprites.prototype.setupSprites = function(bitmap,col,row){
	var num = col*row;
	var w = this.bitmap.width;
	var h = this.bitmap.height;
	for(var i=this._sprites.length; i<num; i=(i+1)|0){
		var sprite = new Sprite();
		this._sprites.push(sprite);
		this._container.addChild(sprite);
	}
	for(var i=0; i<num; i=(i+1)|0){
		var sprite = this._sprites[i];
		sprite.bitmap = bitmap;
		
		var c = i%col;
		var r = Math.floor(i/col);
		sprite.x = c*w;
		sprite.y = r*h;
	}
	for(var i=num; i<this._sprites.length; i=(i+1)|0){
		sprite = this._sprites[i];
		sprite.parent.removeChild(sprite);
		sprite.destroy();
	}
	this._sprites.length = num;
};




//=============================================================================
// ApplyBlendFilter
//=============================================================================
TRP_CORE.USE_BLEND_FILTER = !!(PIXI.picture&&PIXI.picture.getBlendFilter);
TRP_CORE.useBlendFilter = function(blendMode=0){
	if(!TRP_CORE.USE_BLEND_FILTER)return false;
	return blendMode===4;
};
if(TRP_CORE.USE_BLEND_FILTER){
	TRP_CORE.setBlendMode = function(target,blendMode=0){
		if(target.blendMode===blendMode)return;
		if(TRP_CORE.useBlendFilter(target.blendMode) && target.filters){
			this.tryRemoveBlendFilter(target);
		}

		target.blendMode = blendMode;
		if(TRP_CORE.useBlendFilter(blendMode)){
			target.filters = target.filters||[];
			var filter = PIXI.picture.getBlendFilter(blendMode);
			if(filter){
				target.filters.push(filter);
			}
		}
	};
	TRP_CORE.tryRemoveBlendFilter = function(target){
		for(var i=target.filters.length-1; i>=0; i=(i-1)|0){
			var filter = target.filters[i];
			if(filter instanceof PIXI.picture.BlendFilter){
				this.remove(target.filters,filter);
			}
		}
	};
}else{
	TRP_CORE.tryRemoveBlendFilter = function(target){};

	if(!isMZ){
		TRP_CORE.setBlendMode = function(target,blendMode=0){
			target.blendMode = blendMode;
			if(target._isPicture !== undefined){
				target._isPicture = blendMode===4;
			}
		};
	}else{
		TRP_CORE.setBlendMode = function(target,blendMode=0){
			target.blendMode = blendMode;
		};
	}
}





//=============================================================================
// [DevFuncs]
//=============================================================================
var _Dev = null;

if(!Utils.isNwjs() || !Utils.isOptionValid('test'))return;
_Dev = TRP_CORE.DevFuncs = function(){};


_Dev.inDev = false;
_Dev.throwError = function(error){
	console.log.apply(console,arguments);
	debugger;
	throw new Error(error);
}
_Dev.throwNewError = _Dev.throwError;

var isMac = navigator.userAgent.contains('Macintosh');
var ctrlKey = isMac ? 'Cmd' : 'Ctrl';
var optKey = isMac ? 'Opt' : 'Alt';



//=============================================================================
// File Access
//=============================================================================
_Dev.saveFile = function(data,url){
	if(typeof data !== 'string'){
		data = JSON.stringify(data);
	}
	this._saveFile(data,url);
};
_Dev._saveFile = function(data,url){
	var fs = require('fs');
	var path = require('path');
	var base = path.dirname(process.mainModule.filename);
	var filePath = path.join(base,url);
	fs.writeFileSync(filePath, data);
};
_Dev.removeFile = function(url){
	var fs = require('fs');
	var path = require('path');
	var base = path.dirname(process.mainModule.filename);
	var filePath = path.join(base,url);
	fs.unlinkSync(filePath);
};
_Dev.readFile = function(url,opt={encoding:'utf8'}){
	var fs = require('fs');
	var path = require('path');
	var base = path.dirname(process.mainModule.filename);
	var filePath = path.join(base,url);

	if(!fs.existsSync(filePath))return null;
	return fs.readFileSync(filePath, opt);
};
_Dev.readdirSync = function(url){
	var fs = require('fs');
	var path = require('path');
	var base = path.dirname(process.mainModule.filename);
	var dirPath = path.join(base,url);
	var files = fs.readdirSync(dirPath)
	return files;
};

_Dev.checkDirectoriesExists = function(url){
	return this.ensureDirectoriesWithFilePath(url,true);
};
_Dev.ensureDirectoriesWithFilePath = function(url,onlyCheck=false){
	var dirs = url.split('/');
	dirs.pop();

	var fs = require('fs');
	var path = require('path');
	var base = path.dirname(process.mainModule.filename);
	var dirPath = base;

	for(const dir of dirs){
		dirPath = path.join(dirPath,dir);
		if(!fs.existsSync(dirPath)){
			if(onlyCheck)return false;
			fs.mkdirSync(dirPath);
		}
	}
	return true;
};
_Dev.existsSync = function(url){
	var fs = require('fs');
	var path = require('path');
	var base = path.dirname(process.mainModule.filename);
	var dirPath = path.join(base,url);
	return fs.existsSync(dirPath);
};





//=============================================================================
// Window_TrpDevToolsBase
//=============================================================================
var _SceneManager_onKeyDown = SceneManager.onKeyDown;
SceneManager.onKeyDown = function(event) {
	if(event.ctrlKey||event.metaKey){
		if(_Dev.onKeyDownForDevTools(event)){
			return;
		}
	}
	_SceneManager_onKeyDown.call(this,...arguments);
};

_Dev.isKeyDownDisabled = function(){
	if(TRP_CORE.devToolsDisabled)return true;
	if(TRP_CORE.showingToolsWindow)return true;

	if(SceneManager._scene){
		if(SceneManager._scene.update!==SceneManager._scene.constructor.prototype.update){
			//update override maybe for any devTool
			return true;
		}
		if(SceneManager._scene._particleEditor || SceneManager._scene._particleGroupEditor){
			//particle editor
			return true;
		}
	}
	if(window.TRP_SkitDevPicker && TRP_SkitDevPicker._expPicker){
		//exp picker
		return true;
	}
	return false;
}

_Dev.onKeyDownForDevTools = function(event){
	if(this.isKeyDownDisabled())return;

	var key = event.key;
	if(event.shiftKey){
		key = key.toUpperCase();
	}
	if(key.length===1){
		var oppositeKey = (key===key.toLowerCase() ? key.toUpperCase() : key.toLowerCase());
		var name1 = this.keyTargetName(key);
		var name2 = this.keyTargetName(oppositeKey);
		if(name1 || name2){
			this.showTempText('commandHelp',[
				(name1||'なし'),
				'↔ '+(name2||'なし'),
			],'rgb(255,255,200)');
		}
	}
	
	if(key==='t'){
		_Dev.showToolsWindow(key);
		return true;
	}else if(keyToolWindowMap[key]){
		_Dev.showToolsWindow(key);
		return true;
	}else if(keyCommandMap[key]){
		_Dev.processToolsCommand(keyCommandMap[key]);
		SoundManager.playCursor();
		return true;
	}
	return false;
}

_Dev.keyTargetName = function(key){
	var window = keyToolWindowMap[key];
	if(window){
		return window.name;
	}
	var command = keyCommandMap[key];
	if(command){
		if(command.name)return command.name;
		return command.param.substring(0,10);
	}

	return null;
};


var keyToolWindowMap = _Dev.keyToolWindowMap = {};
var keyCommandMap = _Dev.keyCommandMap = {};
var idToolWindowMap = _Dev.idToolWindowMap = {};
_Dev.registerToolCommands = function(setting){
	if(setting.key !== undefined){
		keyToolWindowMap[setting.key] = setting;
	}
	if(setting.id !== undefined){
		idToolWindowMap[setting.id] = setting;
	}
	var commands = setting.commands;
	for(var j=commands.length-1; j>=0; j=(j-1)|0){
		var command = commands[j];
		if(command.key){
			keyCommandMap[command.key] = command;
		}
	}
};

_Dev.showingToolsSettings = [];
_Dev.showingToolsWindow = null;
_Dev.showToolsWindow = function(key){
	var setting = keyToolWindowMap[key];
	if(!setting){
		SoundManager.playBuzzer();
		return;
	}
	SoundManager.playOk();

	this._showToolsWindow(setting);
};

_Dev._updateSwappedForDevTools = false;

_Dev._showToolsWindowAsync = async function(setting){
	return new Promise(resolve=>this._showToolsWindow(setting,resolve));
};
_Dev._showToolsWindow = function(setting,completion){
	if(!_Dev.showingToolsSettings.contains(setting)){
		_Dev.showingToolsSettings.push(setting);
	}

	var window = new Window_TrpDevToolsBase(setting);
	_Dev.showingToolsWindow = window;

	var scene = SceneManager._scene;
	scene.addChild(window);
	window.setup();

	if(!_Dev._updateSwappedForDevTools){
		_Dev._updateSwappedForDevTools = true;

		var onKeyDown = this._onKeyDownToolsWindow.bind(this);
		document.addEventListener('keydown',onKeyDown);

		var update = scene.update;
		scene.update = function(){
			var w = _Dev.showingToolsWindow;
			if(!w)return;

			w.update();
			if(w.isClosed()){
				_Dev.showingToolsWindow = null;
				_Dev.showingToolsSettings.pop();
				if(!w.processed && _Dev.showingToolsSettings.length){
					var next = TRP_CORE.last(_Dev.showingToolsSettings);
					_Dev._showToolsWindow(next,completion);
				}else{
					scene.update = update;
					_Dev._updateSwappedForDevTools = false;
					document.removeEventListener('keydown',onKeyDown);

					if(completion){
						completion();
					}
				}
			}
		}
	}
};
_Dev._onKeyDownToolsWindow = function(event){
	var window = _Dev.showingToolsWindow;
	var setting = window?._setting;
	if(!setting)return;

	for(var i=setting.commands.length-1; i>=0; i=(i-1)|0){
		var command = setting.commands[i];
		if(event.key===command.key){
			window.selectSymbol('command:'+i);
			window.callOkHandler();
			break;
		}
	}
};

_Dev.showToolsWindowWithIdAsync = async function(symbol){
	return new Promise(resolve=>this.showToolsWindowWithId(symbol,resolve));
};
_Dev.showToolsWindowWithId = function(symbol,completion=null){
	var setting = idToolWindowMap[symbol];
	if(!setting){
		SoundManager.playBuzzer();
		return;
	}
	this._showToolsWindow(setting,completion);
};

_Dev.showToolsWindowWithSymbolsAsync = async function(symbols,names,windowName,opt=null){
	return new Promise(resolve=>this.showToolsWindowWithSymbols(symbols,names,resolve,windowName,opt));
};
_Dev.showToolsWindowWithSymbols = function(symbols,names,completion,windowName='',opt=null){
	var commands = [];
	for(var i=0; i<symbols.length; i=(i+1)|0){
		var symbol = symbols[i];
		var name = names[i];
		var key = '';
		var keyMatch = name.match(/<([a-zA-Z0-9])>$/);
		if(keyMatch){
			key = keyMatch[1];
			name = name.replace(/<([a-zA-Z0-9])>$/,'');
		}
		commands.push({
			name,
			type:'function',
			param:function(symbol){
				completion(symbol);
			}.bind(this,symbol),
			key:key,
			closeWindow:true,
		})
	};
	var setting = {
		key:'',
		id:null,
		name:windowName,
		commands,
		fontSize:opt?.fontSize,
		lineHeight:opt?.lineHeight,
	};
	this._showToolsWindow(setting,completion);
};


_Dev.processToolsCommand = function(command){
	switch(command.type){
	case 'commonEvent':
		$gameTemp.reserveCommonEvent(Number(command.param));
		break;
	case 'window':
		this.showToolsWindowWithId(command.param);
		break;
	case 'script':
		this.processEval(command.param);
		break;
	case 'handler':
	case 'function':
		command.param();
		break;
	case 'input':
		var script = window.prompt('スクリプトを入力',command.param||'');
		this.processEval(script);

		if(parameters.redoKey){
			var newCommand = JsonEx.makeDeepCopy(command);
			newCommand.param = script;
			ConfigManager.trpDevLastCommand = newCommand;
			ConfigManager.save();
		}
		break;
	};
};
_Dev.processEval = function(script){
	try{
		eval(script);
	}catch(e){
		var lines = [
			'【スクリプトエラー】',
			'スクリプト:'+script,
			'エラー:'+e.message
		];
		this.showTempAlert(lines);
		SoundManager.playBuzzer();
	}
};


var Window_Selectable = window["Window_Selectable"];
var Window_Command = window["Window_Command"];
(()=>{
	if(parameters.redefineCoreWindows!=='true')return;
	function _Window_Selectable(){this.initialize.apply(this,arguments)}_Window_Selectable.prototype=Object.create(Window_Base.prototype),_Window_Selectable.prototype.constructor=_Window_Selectable,_Window_Selectable.prototype.initialize=function(a,b,c,d){Window_Base.prototype.initialize.call(this,a,b,c,d),this._index=-1,this._cursorFixed=!1,this._cursorAll=!1,this._stayCount=0,this._helpWindow=null,this._handlers={},this._touching=!1,this._scrollX=0,this._scrollY=0,this.deactivate()},_Window_Selectable.prototype.index=function(){return this._index},_Window_Selectable.prototype.cursorFixed=function(){return this._cursorFixed},_Window_Selectable.prototype.setCursorFixed=function(a){this._cursorFixed=a},_Window_Selectable.prototype.cursorAll=function(){return this._cursorAll},_Window_Selectable.prototype.setCursorAll=function(a){this._cursorAll=a},_Window_Selectable.prototype.maxCols=function(){return 1},_Window_Selectable.prototype.maxItems=function(){return 0},_Window_Selectable.prototype.spacing=function(){return 12},_Window_Selectable.prototype.itemWidth=function(){return Math.floor((this.width-2*this.padding+this.spacing())/this.maxCols()-this.spacing())},_Window_Selectable.prototype.itemHeight=function(){return this.lineHeight()},_Window_Selectable.prototype.maxRows=function(){return Math.max(Math.ceil(this.maxItems()/this.maxCols()),1)},_Window_Selectable.prototype.activate=function(){Window_Base.prototype.activate.call(this),this.reselect()},_Window_Selectable.prototype.deactivate=function(){Window_Base.prototype.deactivate.call(this),this.reselect()},_Window_Selectable.prototype.select=function(a){this._index=a,this._stayCount=0,this.ensureCursorVisible(),this.updateCursor(),this.callUpdateHelp()},_Window_Selectable.prototype.deselect=function(){this.select(-1)},_Window_Selectable.prototype.reselect=function(){this.select(this._index)},_Window_Selectable.prototype.row=function(){return Math.floor(this.index()/this.maxCols())},_Window_Selectable.prototype.topRow=function(){return Math.floor(this._scrollY/this.itemHeight())},_Window_Selectable.prototype.maxTopRow=function(){return Math.max(0,this.maxRows()-this.maxPageRows())},_Window_Selectable.prototype.setTopRow=function(b){var a=b.clamp(0,this.maxTopRow())*this.itemHeight();this._scrollY!==a&&(this._scrollY=a,this.refresh(),this.updateCursor())},_Window_Selectable.prototype.resetScroll=function(){this.setTopRow(0)},_Window_Selectable.prototype.maxPageRows=function(){return Math.floor((this.height-2*this.padding)/this.itemHeight())},_Window_Selectable.prototype.maxPageItems=function(){return this.maxPageRows()*this.maxCols()},_Window_Selectable.prototype.isHorizontal=function(){return 1===this.maxPageRows()},_Window_Selectable.prototype.bottomRow=function(){return Math.max(0,this.topRow()+this.maxPageRows()-1)},_Window_Selectable.prototype.setBottomRow=function(a){this.setTopRow(a-(this.maxPageRows()-1))},_Window_Selectable.prototype.topIndex=function(){return this.topRow()*this.maxCols()},_Window_Selectable.prototype.itemRect=function(b){var a=new Rectangle,c=this.maxCols();return a.width=this.itemWidth(),a.height=this.itemHeight(),a.x=b%c*(a.width+this.spacing())-this._scrollX,a.y=Math.floor(b/c)*a.height-this._scrollY,a},_Window_Selectable.prototype.itemRectForText=function(b){var a=this.itemRect(b);return a.x+=6,a.width-=2*6,a},_Window_Selectable.prototype.setHelpWindow=function(a){this._helpWindow=a,this.callUpdateHelp()},_Window_Selectable.prototype.showHelpWindow=function(){this._helpWindow&&this._helpWindow.show()},_Window_Selectable.prototype.hideHelpWindow=function(){this._helpWindow&&this._helpWindow.hide()},_Window_Selectable.prototype.setHandler=function(a,b){this._handlers[a]=b},_Window_Selectable.prototype.isHandled=function(a){return!!this._handlers[a]},_Window_Selectable.prototype.callHandler=function(a){this.isHandled(a)&&this._handlers[a]()},_Window_Selectable.prototype.isOpenAndActive=function(){return this.isOpen()&&this.active},_Window_Selectable.prototype.isCursorMovable=function(){return this.isOpenAndActive()&&!this._cursorFixed&&!this._cursorAll&&this.maxItems()>0},_Window_Selectable.prototype.cursorDown=function(d){var b=this.index(),c=this.maxItems(),a=this.maxCols();(b<c-a||d&&1===a)&&this.select((b+a)%c)},_Window_Selectable.prototype.cursorUp=function(d){var b=this.index(),c=this.maxItems(),a=this.maxCols();(b>=a||d&&1===a)&&this.select((b-a+c)%c)},_Window_Selectable.prototype.cursorRight=function(c){var a=this.index(),b=this.maxItems();this.maxCols()>=2&&(a<b-1||c&&this.isHorizontal())&&this.select((a+1)%b)},_Window_Selectable.prototype.cursorLeft=function(c){var a=this.index(),b=this.maxItems();this.maxCols()>=2&&(a>0||c&&this.isHorizontal())&&this.select((a-1+b)%b)},_Window_Selectable.prototype.cursorPagedown=function(){var a=this.index(),b=this.maxItems();this.topRow()+this.maxPageRows()<this.maxRows()&&(this.setTopRow(this.topRow()+this.maxPageRows()),this.select(Math.min(a+this.maxPageItems(),b-1)))},_Window_Selectable.prototype.cursorPageup=function(){var a=this.index();this.topRow()>0&&(this.setTopRow(this.topRow()-this.maxPageRows()),this.select(Math.max(a-this.maxPageItems(),0)))},_Window_Selectable.prototype.scrollDown=function(){this.topRow()+1<this.maxRows()&&this.setTopRow(this.topRow()+1)},_Window_Selectable.prototype.scrollUp=function(){this.topRow()>0&&this.setTopRow(this.topRow()-1)},_Window_Selectable.prototype.update=function(){Window_Base.prototype.update.call(this),this.updateArrows(),this.processCursorMove(),this.processHandling(),this.processWheel(),this.processTouch(),this._stayCount++},_Window_Selectable.prototype.updateArrows=function(){var a=this.topRow(),b=this.maxTopRow();this.downArrowVisible=b>0&&a<b,this.upArrowVisible=a>0},_Window_Selectable.prototype.processCursorMove=function(){if(this.isCursorMovable()){var a=this.index();Input.isRepeated("down")&&this.cursorDown(Input.isTriggered("down")),Input.isRepeated("up")&&this.cursorUp(Input.isTriggered("up")),Input.isRepeated("right")&&this.cursorRight(Input.isTriggered("right")),Input.isRepeated("left")&&this.cursorLeft(Input.isTriggered("left")),!this.isHandled("pagedown")&&Input.isTriggered("pagedown")&&this.cursorPagedown(),!this.isHandled("pageup")&&Input.isTriggered("pageup")&&this.cursorPageup(),this.index()!==a&&SoundManager.playCursor()}},_Window_Selectable.prototype.processHandling=function(){this.isOpenAndActive()&&(this.isOkEnabled()&&this.isOkTriggered()?this.processOk():this.isCancelEnabled()&&this.isCancelTriggered()?this.processCancel():this.isHandled("pagedown")&&Input.isTriggered("pagedown")?this.processPagedown():this.isHandled("pageup")&&Input.isTriggered("pageup")&&this.processPageup())},_Window_Selectable.prototype.processWheel=function(){if(this.isOpenAndActive()){var a=20;TouchInput.wheelY>=a&&this.scrollDown(),TouchInput.wheelY<= -a&&this.scrollUp()}},_Window_Selectable.prototype.processTouch=function(){this.isOpenAndActive()?(TouchInput.isTriggered()&&this.isTouchedInsideFrame()?(this._touching=!0,this.onTouch(!0)):TouchInput.isCancelled()&&this.isCancelEnabled()&&this.processCancel(),this._touching&&(TouchInput.isPressed()?this.onTouch(!1):this._touching=!1)):this._touching=!1},_Window_Selectable.prototype.isTouchedInsideFrame=function(){var a=this.canvasToLocalX(TouchInput.x),b=this.canvasToLocalY(TouchInput.y);return a>=0&&b>=0&&a<this.width&&b<this.height},_Window_Selectable.prototype.onTouch=function(c){var d=this.index(),e=this.canvasToLocalX(TouchInput.x),a=this.canvasToLocalY(TouchInput.y),b=this.hitTest(e,a);b>=0?b===this.index()?c&&this.isTouchOkEnabled()&&this.processOk():this.isCursorMovable()&&this.select(b):this._stayCount>=10&&(a<this.padding?this.cursorUp():a>=this.height-this.padding&&this.cursorDown()),this.index()!==d&&SoundManager.playCursor()},_Window_Selectable.prototype.hitTest=function(d,e){if(this.isContentsArea(d,e))for(var f=d-this.padding,g=e-this.padding,h=this.topIndex(),b=0;b<this.maxPageItems();b++){var c=h+b;if(c<this.maxItems()){var a=this.itemRect(c),i=a.x+a.width,j=a.y+a.height;if(f>=a.x&&g>=a.y&&f<i&&g<j)return c}}return -1},_Window_Selectable.prototype.isContentsArea=function(a,b){var c=this.padding,d=this.padding,e=this.width-this.padding,f=this.height-this.padding;return a>=c&&b>=d&&a<e&&b<f},_Window_Selectable.prototype.isTouchOkEnabled=function(){return this.isOkEnabled()},_Window_Selectable.prototype.isOkEnabled=function(){return this.isHandled("ok")},_Window_Selectable.prototype.isCancelEnabled=function(){return this.isHandled("cancel")},_Window_Selectable.prototype.isOkTriggered=function(){return Input.isRepeated("ok")},_Window_Selectable.prototype.isCancelTriggered=function(){return Input.isRepeated("cancel")},_Window_Selectable.prototype.processOk=function(){this.isCurrentItemEnabled()?(this.playOkSound(),this.updateInputData(),this.deactivate(),this.callOkHandler()):this.playBuzzerSound()},_Window_Selectable.prototype.playOkSound=function(){SoundManager.playOk()},_Window_Selectable.prototype.playBuzzerSound=function(){SoundManager.playBuzzer()},_Window_Selectable.prototype.callOkHandler=function(){this.callHandler("ok")},_Window_Selectable.prototype.processCancel=function(){SoundManager.playCancel(),this.updateInputData(),this.deactivate(),this.callCancelHandler()},_Window_Selectable.prototype.callCancelHandler=function(){this.callHandler("cancel")},_Window_Selectable.prototype.processPageup=function(){SoundManager.playCursor(),this.updateInputData(),this.deactivate(),this.callHandler("pageup")},_Window_Selectable.prototype.processPagedown=function(){SoundManager.playCursor(),this.updateInputData(),this.deactivate(),this.callHandler("pagedown")},_Window_Selectable.prototype.updateInputData=function(){Input.update(),TouchInput.update()},_Window_Selectable.prototype.updateCursor=function(){if(this._cursorAll){var b=this.maxRows()*this.itemHeight();this.setCursorRect(0,0,this.contents.width,b),this.setTopRow(0)}else if(this.isCursorVisible()){var a=this.itemRect(this.index());this.setCursorRect(a.x,a.y,a.width,a.height)}else this.setCursorRect(0,0,0,0)},_Window_Selectable.prototype.isCursorVisible=function(){var a=this.row();return a>=this.topRow()&&a<=this.bottomRow()},_Window_Selectable.prototype.ensureCursorVisible=function(){var a=this.row();a<this.topRow()?this.setTopRow(a):a>this.bottomRow()&&this.setBottomRow(a)},_Window_Selectable.prototype.callUpdateHelp=function(){this.active&&this._helpWindow&&this.updateHelp()},_Window_Selectable.prototype.updateHelp=function(){this._helpWindow.clear()},_Window_Selectable.prototype.setHelpWindowItem=function(a){this._helpWindow&&this._helpWindow.setItem(a)},_Window_Selectable.prototype.isCurrentItemEnabled=function(){return!0},_Window_Selectable.prototype.drawAllItems=function(){for(var c=this.topIndex(),a=0;a<this.maxPageItems();a++){var b=c+a;b<this.maxItems()&&this.drawItem(b)}},_Window_Selectable.prototype.clearItem=function(b){var a=this.itemRect(b);this.contents.clearRect(a.x,a.y,a.width,a.height)},_Window_Selectable.prototype.redrawItem=function(a){a>=0&&(this.clearItem(a),this.drawItem(a))},_Window_Selectable.prototype.redrawCurrentItem=function(){this.redrawItem(this.index())},_Window_Selectable.prototype.refresh=function(){this.contents&&(this.contents.clear(),this.drawAllItems())};
	function _Window_Command(){this.initialize.apply(this,arguments)}_Window_Command.prototype=Object.create(_Window_Selectable.prototype),_Window_Command.prototype.constructor=_Window_Command,_Window_Command.prototype.initialize=function(a,b){this.clearCommandList(),this.makeCommandList();var c=this.windowWidth(),d=this.windowHeight();_Window_Selectable.prototype.initialize.call(this,a,b,c,d),this.refresh(),this.select(0),this.activate()},_Window_Command.prototype.windowWidth=function(){return 240},_Window_Command.prototype.windowHeight=function(){return this.fittingHeight(this.numVisibleRows())},_Window_Command.prototype.numVisibleRows=function(){return Math.ceil(this.maxItems()/this.maxCols())},_Window_Command.prototype.maxItems=function(){return this._list.length},_Window_Command.prototype.clearCommandList=function(){this._list=[]},_Window_Command.prototype.makeCommandList=function(){},_Window_Command.prototype.addCommand=function(c,d,a,b){void 0===a&&(a=!0),void 0===b&&(b=null),this._list.push({name:c,symbol:d,enabled:a,ext:b})},_Window_Command.prototype.commandName=function(a){return this._list[a].name},_Window_Command.prototype.commandSymbol=function(a){return this._list[a].symbol},_Window_Command.prototype.isCommandEnabled=function(a){return this._list[a].enabled},_Window_Command.prototype.currentData=function(){return this.index()>=0?this._list[this.index()]:null},_Window_Command.prototype.isCurrentItemEnabled=function(){return!!this.currentData()&&this.currentData().enabled},_Window_Command.prototype.currentSymbol=function(){return this.currentData()?this.currentData().symbol:null},_Window_Command.prototype.currentExt=function(){return this.currentData()?this.currentData().ext:null},_Window_Command.prototype.findSymbol=function(b){for(var a=0;a<this._list.length;a++)if(this._list[a].symbol===b)return a;return -1},_Window_Command.prototype.selectSymbol=function(b){var a=this.findSymbol(b);a>=0?this.select(a):this.select(0)},_Window_Command.prototype.findExt=function(b){for(var a=0;a<this._list.length;a++)if(this._list[a].ext===b)return a;return -1},_Window_Command.prototype.selectExt=function(b){var a=this.findExt(b);a>=0?this.select(a):this.select(0)},_Window_Command.prototype.drawItem=function(a){var b=this.itemRectForText(a),c=this.itemTextAlign();this.resetTextColor(),this.changePaintOpacity(this.isCommandEnabled(a)),this.drawText(this.commandName(a),b.x,b.y,b.width,c)},_Window_Command.prototype.itemTextAlign=function(){return"left"},_Window_Command.prototype.isOkEnabled=function(){return!0},_Window_Command.prototype.callOkHandler=function(){var a=this.currentSymbol();this.isHandled(a)?this.callHandler(a):this.isHandled("ok")?_Window_Selectable.prototype.callOkHandler.call(this):this.activate()},_Window_Command.prototype.refresh=function(){this.clearCommandList(),this.makeCommandList(),this.createContents(),_Window_Selectable.prototype.refresh.call(this)}

	Window_Selectable = TRP_CORE.Window_Selectable = _Window_Selectable;
	Window_Command = TRP_CORE.Window_Command  = _Window_Command;
})();






/* Window_TrpDevToolsBase
===================================*/
function Window_TrpDevToolsBase(){
	this.initialize.apply(this, arguments);
}
Window_TrpDevToolsBase.prototype = Object.create(Window_Command.prototype);
Window_TrpDevToolsBase.prototype.constructor = Window_TrpDevToolsBase;
Window_TrpDevToolsBase.prototype.initialize = function(setting){
	this._setting = setting;
	this.processed = false;

	var width = this.windowWidth();
	var height = this.windowHeight();
	var x = (Graphics.width-width)/2;
	var y = (Graphics.height-height)/2;

	if(isMZ){
		var rect = new Rectangle(x,y,width,height)
		Window_Command.prototype.initialize.call(this, rect);
	}else{
		Window_Command.prototype.initialize.call(this,x,y);
	}

	this.openness = 0;
	this.deactivate();


	var commands = setting.commands;
	var length = commands.length;
	for(var i=0; i<length; i=(i+1)|0){
		this.registerCommandHandler(i,commands[i]);
	}
	this.setHandler('cancel', ()=>{
		this.close();
	});
};
Window_TrpDevToolsBase.prototype.registerCommandHandler = function(i,command){
	this.setHandler('command:'+i,()=>{
		_Dev.processToolsCommand(command);

		if(command.closeWindow){
			this.processed = true;
			this.visible = false;
			this.close();
		}else{
			this.activate();
		}
	});
};

Window_TrpDevToolsBase.prototype.resetFontSettings = function() {
    this.contents.fontFace = isMZ ? $gameSystem.mainFontFace() : this.standardFontFace();
    this.contents.fontSize = this._setting.fontSize||(isMZ ? $gameSystem.mainFontSize() : this.standardFontSize());
    this.resetTextColor();
};
Window_TrpDevToolsBase.prototype.lineHeight = function() {
    return this._setting.lineHeight || 36;
};

Window_TrpDevToolsBase.prototype.windowWidth = function(){
	return Math.min(Graphics.width-100,500);
};
Window_TrpDevToolsBase.prototype.windowHeight = function(){
	var lines = this.commands().length;

	var height;
	do{
		height = this.fittingHeight(lines);
		lines -= 1;
	}while(height>Graphics.height-10 && lines>0);

	return height;
};
Window_TrpDevToolsBase.prototype.makeCommandList = function() {
	var commands = this.commands();
	var names = this.commandNames(commands);
	var length = commands.length;
	for(var i=0; i<length; i=(i+1)|0){
		var command = commands[i];
		var name = names[i];
		this.addCommand(name,command);
	}
};
Window_TrpDevToolsBase.prototype.setup = function() {
	this.refresh();
	if(isMZ){
		this.forceSelect(0);
	}else{
		this.select(0);
	}
	this.activate();
	this.open();
};

Window_TrpDevToolsBase.prototype.commands = function(){
	var commands = [];
	var length = this._setting.commands.length;
	for(var i=0; i<length; i=(i+1)|0){
		commands.push('command:'+i)
	}
	commands.push('cancel');

	return commands;
};
Window_TrpDevToolsBase.prototype.commandNames = function(commands){
	var names = [];
	var commands = this._setting.commands;
	for(const command of commands){
		var name = Window_TrpDevToolsBase.commandName(command);
		if(command.key){
			name += '<'+command.key+'>';
		}
		names.push(name);
	}
	if(_Dev.showingToolsSettings.length>1){
		names.push('戻る');
	}else{
		names.push('キャンセル');
	}
	return names;
};

Window_TrpDevToolsBase.commandName = function(command){
	return command.name;
};



//================================================
// TestTypeSetup <T>
//================================================
_Dev.registerToolCommands({
	key:'t',
	id:'test1',
	name:'テストタイプSetup',
	commands:[{
		name:'次のウィンドウ',
		type:'window',
		param:'test2'
		,key:'',
		closeWindow:true,
	}]
});
_Dev.registerToolCommands({
	key:'',
	id:'test2',
	name:'テストタイプSetup',
	commands:[{
		name:'あう',
		type:'script',
		param:'SoundManager.playSave()'
		,key:'',
		closeWindow:true,
	}]
});









//=============================================================================
// Window_TrpDevTools
//=============================================================================
function Window_TrpDevTools() {
	this.initialize(...arguments);
};
Window_TrpDevTools.prototype = Object.create(Window_TrpDevToolsBase.prototype);
Window_TrpDevTools.prototype.constructor = Window_TrpDevTools;

Window_TrpDevTools.prototype.initialize = function(){
	Window_TrpDevToolsBase.prototype.initialize.call(this);

	this.setHandler('animation', ()=>{
		this.close();
		TRP_CORE.AnimationViewer.start(0,null);
	});
	this.setHandler('se',()=>{
		TRP_CORE.SeEditor.start('',null);
		this.visible = false;
		this.close();
	});
	this.setHandler('particle', ()=>{
		TRP_CORE.ParticleViewer.start(null,true,false);
		this.visible = false;
		this.close();
	});
	this.setHandler('particleGroup', ()=>{
		TRP_CORE.ParticleViewer.start(null,true,true);
		this.visible = false;
		this.close();
	});
};

Window_TrpDevTools.prototype.commands = function(){
	var commands = [];
	if(PluginManager._scripts.contains('TRP_AnimationEx')){
		commands.push('animation');
	}
	if(PluginManager._scripts.contains('TRP_SEPicker')){
		commands.push('se');	
	}
	if(PluginManager._scripts.contains('TRP_ParticleMZ_ExViewer')){
		commands.push('particle');
		if(PluginManager._scripts.contains('TRP_ParticleMZ_Group')
			|| PluginManager._scripts.contains('TRP_Particle_Group')
		){
			commands.push('particleGroup');
		}
	}
	commands.push('cancel');

	return commands;
}
Window_TrpDevTools.COMMAND_NAMES = {
	animation:'アニメーションピッカー',
	se:'SEピッカー',
	particle:'パーティクルピッカー',
	particleGroup:'パーティクルグループピッカー',
	cancel:'キャンセル',
};
Window_TrpDevTools.prototype.commandNames = function(commands=this.commands()){
	var names = [];
	for(const command of commands){
		names.push(Window_TrpDevTools.COMMAND_NAMES[command]);
	}
	return names;
}







//=============================================================================
// Debug Text
//=============================================================================
_Dev._debugTexts = [];
_Dev._debugTextUId = 0;
var DEBUG_TEXT_FONT_SIZE = 17;
var DEBUG_TEXT_LINE_HEIGHT = DEBUG_TEXT_FONT_SIZE+4;
var DEBUG_TEXT_HEIGHT_MARGIN = 4;
var DEBUG_TEXT_WIDTH = 400;
var DEBUG_TEXT_MARGIN = DEBUG_TEXT_LINE_HEIGHT/2;

_Dev.showTempAlert = function(value,buzzer=false){
	this.showTempText(null,value,'red');
	console.log(value);
	if(buzzer){
		SoundManager.playBuzzer();
	}
}
_Dev.showTempText = function(key,value,color){
	if(value===undefined){
		value = key;
		key = 'AUTO:'+(this._debugTextUId++);
	}else if(key===null){
		key = 'AUTO:'+(this._debugTextUId++);
	}
	this.showText(key,value,color,true);
}
_Dev.textSprites = function(){
	return this._debugTexts.map(t=>t.sprite);
}
_Dev.hideText = function(key,value,color){
	return this._debugTexts.some(i=>{
		if(i.key===key){
			this.showText(key,null);
			return true;
		}
		return false;
	});
};
_Dev.hideTextsAll = function(){
	for(var i=this._debugTexts.length-1; i>=0; i=(i-1)|0){
		var info = this._debugTexts[i];
		this.hideText(info.key);
	}
};
_Dev.showText = function(key,value,color='white',autoHide=false){
	this.prepareDebugTextContainer();

	var info = this.textInfo(key);
	if(!info){
		if(!value)return;
		info = this.makeDebugTextInfo(key,value,color,autoHide);
	}
	this.setDebugText(info,value,color,autoHide);
};
_Dev.textInfo = function(key){
	return this._debugTexts.find(t=>t?.key===key);
};
_Dev.saveAndHideTexts = function(){
	var keys = Object.keys(this._debugTexts);
	var save = [];
	for(const key of keys){
		var data = this._debugTexts[key];
		if(data.autoHide)continue;
		save.push([data.key,data.value,data.color]);
	}
	this.hideTextsAll();
	return save;
};
_Dev.restoreTexts = function(save){
	if(!save)return;
	for(const data of save){
		this.showText(...data);
	}
};

_Dev.updateTexts = function(){
	this._debugTexts.forEach(t=>t.sprite.update());
};

_Dev.debugTextContainer = null;
_Dev.prepareDebugTextContainer = function(){
	var container = _Dev.debugTextContainer;
	if(!container || !container.transform){
		container = _Dev.debugTextContainer = new TRP_CORE.TRP_Container();

		var texts = this._debugTexts;
		this._debugTexts = [];
		
		for(const info of texts){
			this.showText(info.key,info.value,info.color,info.autoHide);
		}
	}
	SceneManager._scene.addChild(container);
};

_Dev.makeDebugTextInfo = function(key,value,color,autoHide){
	var width = DEBUG_TEXT_WIDTH;
	var height = DEBUG_TEXT_LINE_HEIGHT;
	if(Array.isArray(value)){
		height *= value.length;
	}
	height += DEBUG_TEXT_HEIGHT_MARGIN;

	var sprite = this.debugTextSprite(width,height);
	this.debugTextContainer.addChild(sprite);

	var index = this._debugTexts.length;
	sprite.x = 4;

	for(const i of this._debugTexts){
		sprite.y += i.sprite.height + DEBUG_TEXT_MARGIN;
	}

	var info = {
		key,
		value:null,
		sprite,
		color,
		autoHide
	};
	this._debugTexts.push(info);

	return info;
};
_Dev.debugTextSprite = function(width,height){
	var sprite = new TRP_CORE.FadableSprite();
	sprite.bitmap = new Bitmap(width,height);
	return sprite;
};

_Dev.setDebugText = function(info,value,color='white',autoHide=false){
	if(color==='red'){
		color = 'rgb(255,100,100)';
	}

	var needsRefresh = true;
	if(Array.isArray(value)){
		value = value.concat();
		if(value.equals(info.value)){
			needsRefresh = false;
		}
	}else{
		if(info.value===value){
			needsRefresh = false;
		}
	}

	if(!needsRefresh && !autoHide)return;

	info.value = value;
	info.color = color;
	info.autoHide = autoHide;

	var sprite = info.sprite;
	sprite.clearFade();

	if((!value && value!==0)){
		var height = sprite.height;
		sprite.parent.removeChild(sprite);
		sprite.terminate();

		var idx = this._debugTexts.indexOf(info);
		this._debugTexts.splice(idx,1);

		var length = this._debugTexts.length;
		for(; idx<length; idx=(idx+1)|0){
			var i = this._debugTexts[idx];
			i.sprite.y -= height+DEBUG_TEXT_MARGIN;
		}
		return info;
	}

	var lineH = DEBUG_TEXT_LINE_HEIGHT;
	var values = Array.isArray(value) ? value : [value];
	var length = values.length;
	var width = DEBUG_TEXT_WIDTH;

	if(needsRefresh){
		var height = lineH*length+DEBUG_TEXT_HEIGHT_MARGIN;
		if(sprite._frame.height !== height){
			var dy = height-sprite._frame.height;

			var idx = this._debugTexts.indexOf(info)+1;
			var length = this._debugTexts.length;
			for(; idx<length; idx=(idx+1)|0){
				var i = this._debugTexts[idx];
				i.sprite.y += dy;
			}

			sprite.bitmap = new Bitmap(width,height);
		}


		var fr = sprite._frame;
		var bitmap = sprite.bitmap;
		bitmap.clearRect(fr.x,fr.y,fr.width,fr.height);
		bitmap.fontSize = DEBUG_TEXT_FONT_SIZE;
		bitmap.textColor = color||'white';
		bitmap.outlineWidth = 5;
		bitmap.outlineColor = 'black';

		length = values.length;
		var maxW = 0;
		for(var i=0; i<length; i=(i+1)|0){
			var value = values[i];
			var y = i*lineH;
			var x = 2;
			bitmap.textColor = color||'white';

			if(value.indexOf('【')===0){
				bitmap.textColor = 'rgb(255,200,0)';
			}

			var elems = value.split('\\');
			var elemExW = 0;
			for(var ei=0; ei<elems.length; ei=(ei+1)|0){
				var elem = elems[ei];
				elemExW = 0
				if(ei>0){
					var isEscC = elem.indexOf('C[')===0;
					var isEscH = elem.indexOf('H[')===0;
					if(isEscC || isEscH){
						elem = elem.replace('C[','');
						elem = elem.replace('H[','');
						var colorStr = elem.substr(0,elem.indexOf(']'));
						elem = elem.replace(colorStr+']','');

						var elemColor;
						if(colorStr.indexOf(',')>=0){
							if(colorStr.split(',').length===4){
								elemColor = 'rgba('+colorStr+')';
							}else{
								elemColor = 'rgb('+colorStr+')';
							}
						}else if(isNaN(colorStr)){
							// elemColor = colorStr;
						}else{
							if(window["ColorManager"]){
								elemColor = ColorManager.textColor(Number(colorStr));
							}else{
								this.windowskin = ImageManager.loadSystem('Window');
								elemColor = Window_Base.prototype.textColor.call(this,Number(colorStr));
							}
						}
						if(isEscC){
							bitmap.textColor = elemColor;
						}else if(isEscH){
							//highlight
							elemExW = 10;
							var tw = (bitmap.measureTextWidth(elem)+4+elemExW).clamp(0,DEBUG_TEXT_WIDTH);
							bitmap.fillRect(fr.x+x-2,fr.y+y,tw,lineH+2,elemColor);
						}
					}
				}
				bitmap.drawText(elem,fr.x+x,fr.y+y+2,width-x-2,lineH);
				x += bitmap.measureTextWidth(elem);
			}
			maxW = Math.max(maxW,x+2+elemExW);
		}
		maxW = (maxW+4).clamp(0,DEBUG_TEXT_WIDTH);
		sprite._frame.width = maxW;
		sprite._refresh();
	}

	if(autoHide){
		sprite.startFadeOut(30,60*length,()=>{
			this._debugTexts.some(i=>{
				if(i.key===info.key && i.value===info.value){
					_Dev.showText(info.key,null);
					return true;
				}
			});
		});
	}

	return info;
};




//=============================================================================
// Tonner > _Dev.tonnerTiles()
//=============================================================================
_Dev.tonnerSprite = null;
_Dev.tonnerTilesIndexes = function(indexes,autoRemove=false,color='red',texts=null,tonnerTiles=null,drawText=null){
	var positions = [];
	var width = $dataMap.width;
	var length = indexes.length;
	for(var i=0; i<length; i=(i+1)|0){
		var pos = indexes[i];
		positions.push(pos%width);
		positions.push(Math.floor(pos/width));
	}
	return this.tonnerTiles(positions,autoRemove,color,texts,tonnerTiles,drawText);
};
_Dev.tonnerTilesRegionIndexes = function(indexes,autoRemove=false,color='red'){
	var positions = [];
	var width = $dataMap.width;
	var length = indexes.length;
	for(var i=0; i<length; i=(i+1)|0){
		var pos = indexes[i];
		positions.push(pos%1000);
		positions.push(Math.floor(pos/1000));
	}
	return this.tonnerTiles(positions,autoRemove,color);
};
_Dev.tonnerTiles = function(positions,autoRemove=false,color='red',texts=null,tonnerTiles=null,drawText=null){
	if(positions.length===0)return null;
	var length = positions.length;

	//check is indexes
	var width = $dataMap.width;
	var height = $dataMap.height;
	for(var i=0; i<length; i=(i+2)|0){
		var x = positions[i];
		var y = positions[i+1];
		if(x>=width || y>=height){
			return this.tonnerTilesIndexes(positions,autoRemove,color,texts,tonnerTiles,drawText);
		}
	}

	var x0 = Number.MAX_SAFE_INTEGER;
	var y0 = Number.MAX_SAFE_INTEGER;
	var x1 = 0;
	var y1 = 0;
	var tileW = $gameMap.tileWidth();
	var tileH = $gameMap.tileHeight();
	for(var i=0; i<length; i=(i+2)|0){
		var x = positions[i];
		var y = positions[i+1];

		if(x<x0)x0 = x;
		if(x>x1)x1 = x;
		if(y<y0)y0 = y;
		if(y>y1)y1 = y;
	}

	var bitmap = new Bitmap(tileW*(x1-x0+1),tileH*(y1-y0+1));
	var ctx = bitmap._context;
	ctx.save();

	var isColorArr = Array.isArray(color);
	if(!isColorArr){
		ctx.fillStyle = color;
	}

	if(tonnerTiles){
		tonnerTiles(ctx,x0,y0);
	}else{
		ctx.beginPath();
		for(var i=0; i<length; i=(i+2)|0){
			var x = (positions[i]-x0)*tileW;
			var y = (positions[i+1]-y0)*tileH;
			ctx.moveTo(x,y);
			ctx.lineTo(x+tileW,y);
			ctx.lineTo(x+tileW,y+tileH);
			ctx.lineTo(x,y+tileH);
			ctx.lineTo(x,y);
			if(isColorArr){
				ctx.closePath();
				ctx.fillStyle = color[i/2];
				ctx.fill();
				ctx.restore();
				if(i<length-1){
					ctx.beginPath();
				}
			}
		}

		if(!isColorArr){
			ctx.closePath();
			ctx.fill();
		}
	}
	ctx.restore();

	if(bitmap._setDirty){
     	bitmap._setDirty();   
    }

	bitmap.fontSize = 20;
	for(var i=0; i<length; i=(i+2)|0){
		var x = (positions[i]-x0)*tileW;
		var y = (positions[i+1]-y0)*tileH;
		var text = texts?texts[i/2]:i/2;
		if(drawText){
			drawText(bitmap,x,y,text,i/2);
		}else{
			bitmap.drawText(text,x,y,tileW,tileH,'center');
		}
	}


	if(!_Dev.tonnerSprite){
		_Dev.tonnerSprite = new Sprite();
	}
	var sprite = _Dev.tonnerSprite;
	sprite.bitmap = bitmap;
	sprite.z = 9;
	sprite.update = function(){
		for(var i=this.children.length-1; i>=0; i=(i-1)|0){
			if(this.children[i].update){
				this.children[i].update();
			}
		}
		
		this.x = Math.ceil($gameMap.adjustX(x0) * tileW);
		this.y = Math.ceil($gameMap.adjustY(y0) * tileH);
	};

	sprite.opacity = 180;
	if(autoRemove && sprite.addAnimation){
		sprite.clearAnimations();
		sprite.addAnimation(Animation.wait(90))
		sprite.addAnimation(Animation.opacity(60,0));
		sprite.addAnimation(Animation.remove(0));
	}

	SceneManager._scene._spriteset._tilemap.addChild(sprite);

	return sprite;
}



//=============================================================================
// Resize Window
//=============================================================================
_Dev._originalW = 0;
_Dev._originalH = 0;
_Dev.resizeWindow = function(width=0,height=Graphics.height){
	if(!width){
		width = this._originalW||450;
		this._originalW = 0;
	}else{
		this._originalW = this._originalW||Graphics.width;
	}
	if(!height){
		height = this._originalH||800;
		this._originalH = 0;
	}else{
		this._originalH = this._originalH||Graphics.height;
	}

	var w0 = window.innerWidth;
	var h0 = window.innerHeight;
	var dw = Graphics.width-Graphics.boxWidth;
	var dh = Graphics.height-Graphics.boxHeight;

	if(isMZ){
		Graphics.resize(width,height);
	}else{
		SceneManager._screenWidth = width;
		SceneManager._boxWidth = width;
		SceneManager._screenHeight = height;
		SceneManager._boxHeight = height;
		Graphics.width = width;
		Graphics.height = height;
	}
	Graphics.boxWidth = width-dw;
	Graphics.boxHeight = height-dh;

	Graphics._updateAllElements();

	var dw = width-w0;
	var dh = height-h0;

	
	if(width>w0){
		window.moveBy(-dw/2,-dh/2);
	}

	window.resizeBy(dw,dh);
	if(width<w0){
		window.moveBy(-dw/2,-dh/2);
	}

	if(!isMZ){
		var sprset = SceneManager._scene._spriteset;
		sprset.setFrame(0,0,width,height);
		if(sprset._baseSprite){
			sprset._baseSprite.setFrame(0,0,width,height);
		}
		if(Graphics.isWebGL()){
			sprset.createToneChanger();
		}

		var windowLayer = SceneManager._scene._windowLayer;
		if(windowLayer){
			windowLayer.width = width;
			windowLayer.height = height;
		}
	}
};



//=============================================================================
// Clipboard
//=============================================================================
_Dev.copyToClipboard = function(text,noLog=false){
	if(typeof text === 'object'){
		text = JSON.stringify(text);
	}

	var listener = function(e){
		e.clipboardData.setData('text/plain' , text);
		e.preventDefault();
		document.removeEventListener('copy', listener);
	}
	document.addEventListener('copy' , listener);
	document.execCommand('copy');

	if(!noLog){
		this.showTempText('clip','クリップボードにコピー')
		console.log(text);
	}
};




//=============================================================================
// Save Image
//=============================================================================
_Dev.saveSpriteImage = function(sprite,filePath,zeroPos=false){
	if(!filePath){
		SoundManager.playBuzzer();
		return null;
	}
	if(!filePath.contains('.png')){
		filePath = filePath + '.png';
	}

	var w = sprite.width*sprite.scale.x;
	var h = sprite.height*sprite.scale.y;
	var ax = sprite.anchor.x;
	var ay = sprite.anchor.y;
	sprite.anchor.set(0,0);

	var x = sprite.x;
	var y = sprite.y;
	if(zeroPos){
		sprite.x = 0;
		sprite.y = 0;	
	}
	
	var bitmap = TRP_CORE.snap(sprite,w,h);
	_Dev.saveCanvas(bitmap,filePath);

	sprite.x = x;
	sprite.y = y;

	sprite.anchor.set(ax,ay);
	return bitmap;
};

_Dev.saveCanvas = function(bitmap,name,folder){
    name = (name||"image");
    if(!name.contains('.png'))name += '.png';

    if(folder){
    	if(folder[folder.length-1]!=='/'){
    		folder += '/';
    	}
    	name = folder+name;
    }

    var fs = require('fs');
    var path = require('path');
    var base = path.dirname(process.mainModule.filename);        
    var filePath = path.join(base,name);
    var base64Data = this.bitmapBase64Data(bitmap);
    fs.writeFileSync(filePath, base64Data, 'base64');
};

_Dev.bitmapBase64Data = function(bitmap){
    var urlData = bitmap._canvas.toDataURL('image/png')
    var regex = (/^data:image\/png;base64,/);
    var base64Data = urlData.replace(regex, "");
    return base64Data;
};



//=============================================================================
// Save Map
//=============================================================================
var MAP_SAVE_FLAGS = {};
_Dev.saveMapFile = function(dataMap=$dataMap,mapId=$gameMap._mapId,mockSave=false){
	var onceSaved = !!MAP_SAVE_FLAGS[mapId];
	MAP_SAVE_FLAGS[mapId] = true;

	var filePath = TRP_CORE.mapFilePath(mapId);
	var backupPath = TRP_CORE.backupMapFilePath(mapId);

	if(!onceSaved){
		//save backup
		this.incrementBackupMapFiles(mapId);

		var lastFile = _Dev.readFile(filePath);
		_Dev.ensureDirectoriesWithFilePath(backupPath);
		_Dev.saveFile(lastFile,backupPath);
	}

	
	//delete meta
	var mapMeta = dataMap.meta;
	delete dataMap.meta;

	var metas = [];
	for(const event of dataMap.events){
		if(!event)continue;
		metas.push(event.meta);
		delete event.meta;	
	}


	//save data
	if(mockSave){
		var mockData = JsonEx.makeDeepCopy(dataMap)

		var note = mockData.note;
		var match = note.match(/<originalTilesetId:[0-9]+>/);
		var metaTilesetId = '<originalTilesetId:'+mockData.tilesetId+'>';
		if(match){
			note = note.replace(match[0],metaTilesetId);
		}else{
			note += '\n'+metaTilesetId;
		}

		var match = note.match(/<originalParallaxName:[^>]+>/);
		var metaParallaxName = '<originalParallaxName:'+(mockData.parallaxName||'null')+'>';
		if(match){
			note = note.replace(match[0],metaParallaxName);
		}else{
			note += '\n'+metaParallaxName;
		}
		mockData.note = note;
		mockData.tilesetId = Number(parameters.mapMockTilesetId)
		mockData.parallaxName = TRP_CORE.MOCK_IMAGE_DIR+TRP_CORE.mapFileName(mapId).replace('.json','');

		var file = JSON.stringify(mockData);
		_Dev.saveFile(file,filePath);

	}else{
		var file = JSON.stringify(dataMap);
		_Dev.saveFile(file,filePath);
	}


	//restore meta
	dataMap.meta = mapMeta;
	for(const event of dataMap.events){
		if(!event)continue;
		event.meta = metas.shift();
	}


	//info text
	var texts = ['マップデータを保存&バックアップしました！'];
	if(!isMZ){
		texts.push('ゲームを閉じてプロジェクトを開き直してください。')
	}
	_Dev.showTempAlert(texts);
	SoundManager.playSave();
};

var backupMapNum = TRP_CORE.supplementDefNum(3,parameters.backupMapNum)||1;
_Dev.incrementBackupMapFiles = function(mapId){
	var fs = require('fs');
	var path = require('path');
	var base = path.dirname(process.mainModule.filename);
	var dirPath = path.join(base,TRP_CORE.BACK_UP_DIR);

	var baseName = TRP_CORE.mapFileName(mapId);
	for(var i=backupMapNum-1; i>=0; i=(i-1)|0){
		var fileName = baseName;
		if(i>0){
			fileName = fileName.replace('.json','-'+i+'.json');
		}

		var filePath = path.join(dirPath,fileName);
		if(!fs.existsSync(filePath))continue;

		if(i===backupMapNum-1){
			//remove oldest
			fs.unlinkSync(filePath);

			if(_Dev.inDev){
				console.log('delete: '+filePath);
			}
			continue;
		}


		var src = filePath;
		var dstName = baseName.replace('.json','-'+(i+1)+'.json');
		var dst = path.join(dirPath,dstName);
		fs.renameSync(src,dst);

		if(_Dev.inDev){
			console.log(src+' → '+dst);
		}
	}
};

_Dev.restoreFromBackup = function(completion=null,mapId=$gameMap.mapId()){
	var fs = require('fs');
	var path = require('path');
	var base = path.dirname(process.mainModule.filename);
	var dirPath = path.join(base,TRP_CORE.BACK_UP_DIR);

	var baseName = TRP_CORE.mapFileName(mapId);

	var symbols = [];
	var names = [];
	for(var i=0; i<backupMapNum; i=(i+1)|0){
		var fileName = baseName;
		if(i>0){
			fileName = fileName.replace('.json','-'+i+'.json');
		}

		var filePath = path.join(dirPath,fileName);
		if(!fs.existsSync(filePath))break;;


		var name = '';
		if(i===0)name = '最新の編集前';
		else if(i===1)name = '前回の編集前';
		else if(i===2)name = '前々回の編集前';

		var stat = fs.statSync(filePath);
		var date = new Date(stat.mtime);
		var time = '%1月%2日%3:%4'.format(
		    date.getMonth()+1,
		    date.getDate(),
		    date.getHours(),
		    date.getMinutes(),
		);
		name = '-'+time+'-' + (name ? ' <%1>'.format(name) : '');

		symbols.push(i);
		names.push(name)
	}

	if(!symbols.length){
		SoundManager.playBuzzer();
		this.showTempAlert('このマップのバックアップファイルが存在しません');
		return;
	}

	_Dev.showToolsWindowWithSymbols(symbols,names,result=>{
		var idx = result;
		if(isNaN(idx)||idx<0)return;

		this._executeRestoreFromBackup(idx,mapId);

		if(completion){
			completion();
		}
	});
};

_Dev._executeRestoreFromBackup = function(backupIdx=0,mapId){
	var filePath = TRP_CORE.mapFilePath(mapId);
	var backupPath = TRP_CORE.backupMapFilePath(mapId,backupIdx);

	var file = null;
	if(_Dev.checkDirectoriesExists(backupPath)){
		file = _Dev.readFile(backupPath);
	}	
	if(!file){
		SoundManager.playBuzzer();
		_Dev.showTempAlert('このマップのバックアップデータが存在しません。');
		return;
	}

	_Dev.saveFile(file,filePath);

	//info text
	var texts = ['バックアップから復元しました。'];
	if(!isMZ){
		texts.push('ゲームを閉じてプロジェクトを開き直してください。')
	}
	_Dev.showTempAlert(texts);
	SoundManager.playLoad();
};





//=============================================================================
// AssetRegister
//=============================================================================
parameters.assetPlugin = parameters.assetPlugin||'TRP_CORE_RequiredAsset';
parameters.assetPlugin=parameters.assetPlugin.replace('.js','');
_Dev.assetParameters = null;

_Dev.setCategoryAllAssets = function(category,urls){
	this.assetParameters = this.assetParameters||PluginManager.parameters(parameters.assetPlugin);
	urls.sort();

	var registered = this.assetParameters[category];
	if(registered)registered.sort();
	if(urls.equals(registered))return;

	this.assetParameters[category] = urls;
	this.saveAssetRegisterPlugin();
};

_Dev.registerAssets = function(category,urls){
	for(var i=urls.length-1; i>=0; i=(i-1)|0){
		var noSave = i>0;
		this.registerAsset(category,urls[i],noSave);
	}
};
_Dev.registerAsset = function(category,url,noSave=false){
	if(!parameters.assetPlugin)return;

	this.assetParameters = this.assetParameters||PluginManager.parameters(parameters.assetPlugin);
	this.assetParameters[category] = this.assetParameters[category]||[];
	if(this.assetParameters[category].contains(url))return;

	this.assetParameters[category].push(url);
	if(!noSave){
		this.saveAssetRegisterPlugin();
	}
};

_Dev.saveAssetRegisterPlugin = function(){
	if(!parameters.assetPlugin)return;

	var assets = [];
	var categories = Object.keys(this.assetParameters);
	for(const category of categories){
		TRP_CORE.uniquePushArray(assets,this.assetParameters[category]);
	}
	assets.sort();

	
	var file = `
	//=============================================================================
	// %1.js
	//=============================================================================
	/*`.format(parameters.assetPlugin)
		+':\n'
  +` * @author Thirop
	 * @plugindesc requiredAssets登録用プラグイン
	 *
	`.format(parameters.assetPlugin);

	for(var asset of assets){
		if(asset.indexOf('.')>=0){
			var elems = asset.split('.');
			elems.pop();
			asset = elems.join('.')	;
		}
		file += ' * @requiredAssets '+asset+'\n';
	}
	
	file += ` */
	//============================================================================= 
	PluginManager._parameters["%1"] = %2;
	`.format(parameters.assetPlugin.toLowerCase(),JSON.stringify(this.assetParameters));
	file = file.replace(/\t/gi,'');


	var filePath = 'js/plugins/' + parameters.assetPlugin+'.js';
	this.saveFile(file,filePath);


	if(!PluginManager._parameters[parameters.assetPlugin.toLowerCase()]){
		_Dev.showTempText(['アセット登録用プラグインを生成しました！','%1.jsをインポートしてください。'.format(parameters.assetPlugin)],'red');
	}
};





//=============================================================================
// Others
//=============================================================================
_Dev.isAnyDevToolsBusy = function(){
	if(TRP_CORE.devToolsDisabled)return true;
    if(TRP_CORE.showingToolsWindow)return true;

    if(SceneManager._scene){
        if(SceneManager._scene.update!==SceneManager._scene.constructor.prototype.update){
            //update override maybe for any devTool
            return true;
        }
        if(SceneManager._scene._particleEditor || SceneManager._scene._particleGroupEditor){
            //particle editor
            return true;
        }
    }
    if(window.TRP_SkitDevPicker && TRP_SkitDevPicker._expPicker){
        //exp picker
        return true;
    }
    return false;
};







//=============================================================================
// [EditorBase]
//=============================================================================
//=============================================================================
// EditorBase
//=============================================================================
var EditorBase = TRP_CORE.EditorBase = function EditorBase(){
	this.initialize.apply(this, arguments);
};

EditorBase.prototype = Object.create(Sprite.prototype);
EditorBase.prototype.constructor = EditorBase;

EditorBase._uid = 0;
EditorBase.prototype.initialize = function(data,opt=null){
	Sprite.prototype.initialize.call(this);
	this.initMembers();

	this._allData = data;
	this._autoHelpStyle = opt?.autoHelpStyle || false;
	this._canEndByShortcut = supplementDefBool(true,opt?.canEndByShortcut);
	this._uid = EditorBase._uid++;

	SoundManager.playOk();

	this.registerKeyListeners();

	this.createSprites();
	this.prepareInputtingCandidates();
};

EditorBase.prototype.initMembers = function(){
	this.clearKeyDownListeneres();

	this.active = true;
	this.notTouching = false;
	this._onValueChange = null;
	this._end = false;
	this._exHelp = null;
	this._autoHelpStyle = false;
	this._uid = -1;

	this._lastEditingIndex = -1;
	this._editingIndex = -1;

	this._allData = null;

	this._parts = null;
	this._commands = null;

	this._inputtingWords = '';
	this._inputtingCandidates = null;
};

EditorBase.prototype.isExclusiveInput = function(){
	if(this.editingParts()?.isExclusiveInput())return true;
	return false;
};
EditorBase.prototype.activate = function(data=null){
	if(data){
		this.setData(data);
	}
	if(this.active)return;
	this.active = true;
	this.opacity = 255;
	this.visible = true;

	this.showHelp();
};


EditorBase.prototype.setAllData = function(data){
	this._allData = data;
	this.cacheAllParts();
	this.createLines();
	this.prepareInputtingCandidates();

	if(this._editingIndex>=this._parts.length){
		this._editingIndex = -1;
	}
};
EditorBase.prototype.cacheAllParts = function(){
	for(const parts of this._parts){
		if(parts.parent)parts.parent.removeChild(parts);
		TRP_CORE.cache(parts);
	}
	this._parts = [];
};




//=============================================================================
//duprecated
EditorBase.prototype.setData = function(data,force=false){
	for(const parts of this._parts){
		parts.setData(data,force);
	}
};
//=============================================================================

EditorBase.prototype.deactivate = function(){
	if(!this.active)return;
	this.active = false;
	this.opacity = 150;

	var parts = this.editingParts();
	if(parts && parts._picker){
		parts.endPicker();
	}

	_Dev.showText('editHelpBase'+this._uid,null);
	_Dev.showText('editorParts'+this._uid,null);
	_Dev.showText('editorAlert'+this._uid,null);
};

EditorBase.prototype.showHelp = function(){
	_Dev.showText('editHelpBase'+this._uid,this.baseHelpData());
};
EditorBase.prototype.hideEditorPartsHelp = function(){
	_Dev.showText('editorParts'+this._uid,null);
}
EditorBase.prototype.showAlert = function(alert=null){
	if(typeof alert === 'string'){
		alert = alert.split('\n');
	}
	_Dev.showText('editorAlert'+this._uid,alert,'orange');
}
EditorBase.prototype.baseHelpData = function(){
	if(this._exHelp){
		return this._exHelp;
	}
	return [
		'↑↓：パラメータ選択',
		'←→：値の調整(+Shiftで微調整)',
	];
};
EditorBase.prototype.setHelp = function(exHelp){
	this._exHelp = exHelp;
	if(this.active)this.showHelp();
};

EditorBase.prototype.update = function(){
	if(!this.active)return;

	if(this.editingParts()?.update())return;
	this._selectorSprite.update();
			
	this.processTouch();
	if(TouchInput.isTriggered()||TouchInput.isPressed()){	
	}else if(Input._latestButton || this._keyCode){
		this.processInput();
	}

	this._keyCode = 0;
	this._key = '';
	return !this._end;
};
EditorBase.prototype.processTouch = function(){
	var touching = TouchInput.isTriggered() || TouchInput.isPressed();
	this.notTouching = !touching;

	var allParts = this._parts;
	var length = allParts.length;
	var x = TouchInput.x;
	var y = TouchInput.y;

	var margin = EditorBase.SELECTOR_MARGIN;
	for(var i = 0; i<length; i=(i+1)|0){
		var parts = allParts[i];
		if(parts.processTouch(touching,x,y,margin)){
			if(!parts.headParts){
				TouchInput.clear();
			}
			this.startEditing(i);
			return;
		}
	}
	this.notTouching = true;
};

EditorBase.prototype.processInput = function(){
	if(!this.active)return;
	if(this._end)return;

	if(Input.isRepeated('down') && this._keyCode!==98){
		var index = this._editingIndex;
		index = (index+1)%this._parts.length;

		this.startEditing(index);
		this.resetInputingWords();
	}else if(Input.isRepeated('up') && this._keyCode!==104){
		var index = this._editingIndex;
		index -= 1;
		if(index<0)index = this._parts.length-1;

		this.startEditing(index);
		this.resetInputingWords();
	}else if(Input.isRepeated('right')){
		this.addValue(Input.isPressed('shift')?0.1:1);
	}else if(Input.isRepeated('left')){
		this.addValue(Input.isPressed('shift')?-0.1:-1);
	}else if(this._keyCode>=KEY_CODE.alphabet && this._keyCode<=KEY_CODE.alphabetEnd){
		this.pushInputtingCharacter(String.fromCharCode(this._keyCode));
	}else if(Input.isTriggered('cancel')&&this._keyCode!==96){
		//delete key
	}else{
		var editing = this._editingIndex>=0 ? this.editingParts() : null;
		if(editing){
			if(!editing.processInput(this._keyCode,this._key)){
				this.endEditing();  
			}else{
				this.selectParts(this._editingIndex);
			}
		}
		if(this._keyCode!==0){
			this.resetInputingWords();
		}
	}
};

EditorBase.prototype.addValue = function(rate){
	var parts = this.editingParts()
	var innerData = parts?._innerData;
	if(!parts || !innerData)return;

	parts.addValue(rate);
};

EditorBase.prototype.end = function(){
	this._end = true;
	this.deactivate();

	this.resignKeyListeners();
};


EditorBase.prototype.startEditing = function(index){
	if(index<0)return;

	if(this._editingIndex === index)return;
	SoundManager.playCursor(); 

	var target = this._parts[index];
	if(this._editingIndex>=0){
		this._endEditing();
		index = this._parts.indexOf(target);
		if(index<0){
			this._editingIndex = -1;
			this.deselectParts();
			return;
		}
	}

	this._editingIndex = index;
	target.startEditing();
	this.selectParts(index);
};
EditorBase.prototype.endEditing = function(){
	SoundManager.playCancel();

	this._lastEditingIndex = this._editingIndex;
	this._endEditing();

	this._editingIndex = -1;
	this.deselectParts();
};
EditorBase.prototype._endEditing = function(){
	var editing = this.editingParts();
	if(editing){
		editing.endEditing();
	}
}
EditorBase.prototype.editingParts = function(){
	return this._parts[this._editingIndex];
};



EditorBase.prototype.registerKeyListeners = function(){
	var listener = this._onKeyDown.bind(this);
	this._keydownListener = listener;
	document.addEventListener('keydown', listener);
};
EditorBase.prototype.clearKeyDownListeneres = function(){
	this._keydownListener = null;
	this._copyListener = null;
};
EditorBase.prototype.resignKeyListeners = function(){
	if(this._keydownListener){
		document.removeEventListener('keydown',this._keydownListener);	
	}
	if(this._copyListener){
		document.removeEventListener('copy',this._copyListener);	
	}

	this.clearKeyDownListeneres();
};

EditorBase.prototype._onKeyDown = function(event){
	if(!this.active)return;
	if(this.editingParts()?.isExclusiveInput?.())return;

	if(event.ctrlKey||event.metaKey){
		if(event.key==='g'){
			this.switchHalfOpacity();
		}else if(event.key==='w'){
			if(this.canEndByShortcut()){
				this.end();
			}
		}

		var parts = this.editingParts();
		parts?.onKeyDown(event);
	}else if(!event.ctrlKey && !event.altKey) {
		this._keyCode = event.keyCode;
		this._key = event.key;
	}
};
EditorBase.prototype.canEndByShortcut = function(){
	return this._canEndByShortcut;
};
EditorBase.prototype.switchHalfOpacity = function(halfen=(this.alpha===1)){
	if(halfen){
		this.alpha = 0.25;
	}else{
		this.alpha = 1;
	}
	SoundManager.playCursor()
};


/* sprites
===================================*/
EditorBase.prototype.createSprites = function(){
	this.createSelectorSprite();
	this.createLines();
};

/* selector
===================================*/
EditorBase.prototype.createSelectorSprite = function(){
	var size = EditorLine.LINE_HEIGHT;
	var bitmap = new Bitmap(size,size);
	bitmap.fillAll('rgb(255,255,100)');

	var sprite = new TRP_Sprite(bitmap);
	sprite.opacity = 200;
	this._selectorSprite = sprite;
	this.addChild(sprite);
	sprite.visible = false;

	sprite.animator.loop([
		TRP_Animator.opacity(60,100,'easeInOut'),
		TRP_Animator.opacity(60,255,'easeInOut'),
	]);
};
EditorBase.SELECTOR_MARGIN = 10;
EditorBase.prototype.selectParts = function(index){
	var parts = this._parts[index];
	var sprite = this._selectorSprite;
	
	var size = sprite.bitmap.height;
	sprite.y = parts.y;
	
	sprite.anchor.set(1,0);
	sprite.x = Graphics.width;
	
	sprite.scale.x = (parts.totalWidth()+EditorBase.SELECTOR_MARGIN)/size;
	sprite.visible = true;


	this._allData.some(innerData=>{
		if(innerData.key !== parts._key)return false;

		var help = [];
		if(innerData.help){
			if(Array.isArray(innerData.help)){
				help.push(...innerData.help);
			}else{
				help.push(innerData.help);
			}

			if(this._autoHelpStyle){
				help.unshift('\\C[4][%1]\\C[0]'.format(parts._key));
			}
		}
		if(innerData.input){
			help.push(ctrlKey+'+I:値をダイアログから入力');
		}
		if(innerData.tryDelete){
			help.push('Backspace:要素の削除');
		}
		if(innerData.type==='color'){
			help.push('Enter:カラーピッカー表示');
		}

		if(help.length && this.active){
			_Dev.showText('editorParts'+this._uid,help);
		}
		return true;
	});
};

EditorBase.prototype.deselectParts = function(){
	this._selectorSprite.visible = false;
};


/* editor line
===================================*/
EditorBase.SELECTION_WIDHT = 24;
EditorBase.LINE_HEIGHT = 24;
EditorBase.lineParam = function(key,data,unit=0.1,integer=(unit===1),newLine=false,help=null,opt=null){
	return {
		key,unit,integer,data,help,newLine,

		type:opt?.type||null,
		title:opt?.title,
		placeholder:opt?.placeholder,
		keySplitter:opt?.keySplitter||'_',
		value:opt?.value,
		noValue:opt?.noValue,
		max:opt ? opt.max : Number.MAX_SAFE_INTEGER,
		min:opt ? opt.min : Number.MIN_SAFE_INTEGER,
		fixedWidth:opt?.fixedWidth||0,
		maxWidth:opt?.maxWidth||0,
		button:opt?.button||null,
		tryDelete:opt?.tryDelete||null,
		onValueChange:opt?.onValueChange,
		validator:opt?.validator,
		onKeyDown:opt?.onKeyDown,
		disabled:opt?.disabled,

		tag:opt?.tag,
		tabNames:opt?.tabNames,
		list:opt?.list,
		noLoop:opt?.noLoop,
		input:opt?.input,
		slider:opt?.slider,
		picker:opt?.picker,
		exSprite:opt?.exSprite,

		sprite:null,
	};
};
EditorBase.prototype.disableParams = function(tag,value=true){
	for(const parts of this._parts){
		if(parts && parts._innerData.tag === tag){
			parts.setDisabled(value);
		}
	}
};
EditorBase.prototype.setParamsData = function(tag,data=null){
	for(const parts of this._parts){
		if(parts && parts._innerData.tag === tag){
			parts._data = data;
			parts.clearInputting();
			parts.refreshParts();
		}
	}
};
EditorBase.prototype.setParamsKeyPrefix = function(tag,keyPrefix){
	for(const parts of this._parts){
		if(parts && parts._innerData.tag === tag){
			parts.setKey(keyPrefix+parts._key);
			parts.clearInputting();

			if(parts._innerData.exSprite){
				parts._innerData.exSprite.setKeyPrefix?.(keyPrefix);
			}
			parts.refreshParts();
		}
	}
};

EditorBase.prototype.createLines = function(){
	var y = 20;
	var lineH = EditorBase.LINE_HEIGHT;
	var categoryMargin = 14;
	this._parts = [];
	this._commands = [];


	var opt = {
		autoHelpStyle:this._autoHelpStyle,
	};
	for(const innerData of this._allData){
		if(innerData.newLine){
			y += categoryMargin;
		}

		if(innerData.sprite){
			var sprite = innerData.sprite;
			this.addChild(sprite);
			sprite.x = Graphics.width;
			sprite.y = y;
			y += sprite.height*sprite.scale.y;
			continue;
		}else if(innerData.category){
			var sprite = EditorBase.categorySprite(innerData.category);
			this.addChild(sprite);
			sprite.x = Graphics.width;
			sprite.y = y;
			y += sprite.height*sprite.scale.y;
			continue;
		}

		var key = innerData.key;
		var line = new EditorLine(innerData,opt);

		line.y = y;
		line.refresh();

		this._parts.push(line);
		this._commands.push(TRP_CORE.last(key.split(innerData.keySplitter)).toUpperCase());

		this.addChild(line);

		y += lineH;
	}
};
EditorBase.categorySprite = function(text){
	var lineH = EditorBase.LINE_HEIGHT;

	var width = 512;
	var bitmap = new Bitmap(width,lineH);
	var sprite = new Sprite(bitmap);
	sprite.anchor.set(1,0);

	bitmap.fontSize = EditorBase.LINE_HEIGHT-6;
	bitmap.outlineWidth = 6;
	bitmap.textColor = 'rgb(255,255,255)';
	bitmap.drawText(text,1,0,width-2,lineH,'right');
	return sprite;
};




/* word inputting
===================================*/
EditorBase.prototype.resetInputingWords = function(){
	if(this._inputtingWords==='')return;

	this._inputtingWords = '';
	this.prepareInputtingCandidates();
};
EditorBase.prototype.prepareInputtingCandidates = function(){
	this._inputtingCandidates = this._commands.concat();
};
EditorBase.prototype.pushInputtingCharacter = function(chara){
	this._inputtingWords += chara;
	var words = this._inputtingWords;
	var candidates = this._inputtingCandidates;
	var length = candidates.length;
	var firstHit = null;
	for(var i = 0; i<length; i=(i+1)|0){
		var word = candidates[i];
		if(word.indexOf(words)!==0){
			candidates.splice(i,1);
			i -= 1;
			length -= 1;
		}else{
			firstHit = firstHit || word;
		}
	}
	
	if(!firstHit){
		this.prepareInputtingCandidates();
		candidates = this._inputtingCandidates
		var length = candidates.length;
		while(words.length>0 && !firstHit){
			for(var i=0; i<length; i=(i+1)|0){
				if(candidates[i].indexOf(words)!==0)continue;
				firstHit = candidates[i];
				break;
			}
			if(!firstHit){
				words = words.substr(1);
			}
		}
		if(firstHit){
			for(var i=length-1; i>=0; i=(i-1)|0){
				if(candidates[i].indexOf(words)!==0)continue;
				candidates.splice(i,1);
			}   
		}
		this._inputtingWords = words;
	}

	if(firstHit){
		this.tryInputtingFirstHit(firstHit)
	}
};
EditorBase.prototype.tryInputtingFirstHit = function(firstHit){
	var perfectHit = this._inputtingWords===firstHit;
	var index = this._commands.indexOf(firstHit);
	this.startEditing(index);
};




//=============================================================================
// EditorLine
//=============================================================================
var EditorLine = TRP_CORE.EditorLine = function EditorLine(){
	this.initialize.apply(this, arguments);
};
EditorLine.FONT_SIZE = 18;
EditorLine.LINE_HEIGHT = EditorLine.FONT_SIZE+4;

EditorLine.prototype = Object.create(PIXI.Container.prototype);
EditorLine.prototype.constructor = EditorLine;
EditorLine.prototype.initialize = function(innerData,opt=null){
	PIXI.Container.call(this);
	this.width = Graphics.width;
	this.height = Graphics.height;

	this.initMembers();
	this._innerData = innerData;
	this._keySplitter = innerData.keySplitter || '_';
	this.setKey(innerData.key);
	this._title = innerData.title || this._key;
	this._autoHelpStyle = opt?.autoHelpStyle||false;
　
	this.setData(innerData.data);

	if(innerData.disabled){
		this.setDisabled();
	}
};
EditorLine.prototype.setKey = function(key){
	this._keys = key.split(this._keySplitter);
	this._key = TRP_CORE.last(this._keys);
	this._innerData?.setKey?.(key);
};
EditorLine.prototype.clearForCache = function(){
	if(this.headParts && this.headParts.parents){
		this.headParts.parent.remove(this.headParts);
	}
	if(this.exSprite && this.exSprite.parents){
		this.exSprite.parent.remove(this.exSprite);
	}
	if(this._picker){
		if(this._picker.parent){
			this._picker.parent.removeChild(this._picker);
		}
	}
	for(const parts of this._parts){
		parts.opacity = 255;
		EditorLine.partsCache.push(parts);
		this.removeChild(parts);
	}
	this.initMembers();
};
EditorLine.prototype.initMembers = function(){
	this._innerData = null;
	this._key = null;
	this._keys = null;
	this._title = null;
	this._data = undefined;
	this._valueType = 'number';
	this._disabled = false;
	this._width = 0;
	this._height = EditorLine.LINE_HEIGHT;
	this._titleWidth = 0;
	this._titleSprite = null;
	this._parts = [];
	this._textsCache = [];
	this._autoHelpStyle = false
	this._editingIndex = -1;
	this._inputting = null;
	this._picker = null;
	this.headParts = null
};

EditorLine.prototype.totalWidth = function(){
	return this._width + (this.headParts?.width||0)
};
EditorLine.prototype.update = function(){
	if(this._picker){
		if(this._picker.update())return true;
	}
	return false;
};

EditorLine.prototype.setDisabled = function(value=true){;
	if(this._disabled===value)return;
	this._disabled = value;

	this.alpha = this._disabled ? 0.5 : 1;
}

EditorLine.prototype.titleText = function(){
	return '['+this._title+']';
};
EditorLine.prototype.refreshWithConfigData = function(config){
	this.refresh();
};
EditorLine.prototype.refresh = function(){
	this.refreshParts();
};
EditorLine.prototype.setData = function(data,force=false){
	if(!force && this._data === data)return;
	this._data = data;
	this.clearInputting();

	var value = this.value();

	if(this._innerData.type){
		this._valueType = this._innerData.type;
	}else if(!isNaN(value)){
		this._valueType = 'number';
	}else if(Array.isArray(value)){
		this._valueType = 'array';
	}else{
		this._valueType = 'string';
	}

	this.refreshParts();
};
EditorLine.prototype.titleColor = function(){
	return 'rgb(100,200,255)';
};
EditorLine.prototype.partsColor = function(){
	return 'rgb(255,255,255)';
};
EditorLine.prototype.createTitleSprite = function(){
	var sprite = new Sprite();
	this.addChild(sprite);
	this._titleSprite = sprite;

	this.refreshTitleSprite();
};
EditorLine.prototype.refreshTitleSprite = function(){
	var text = this.titleText();

	var sprite = this._titleSprite;
	var bitmap = sprite.bitmap;

	var fontSize = EditorLine.FONT_SIZE;
	var width = text.length*fontSize+4;
	var height = fontSize+4;
	if(bitmap && bitmap.width<width){
		bitmap.clear();
	}else{
		bitmap = new Bitmap(width,height);
		sprite.bitmap = bitmap;
	}

	sprite.anchor.set(1,0);

	bitmap.fontSize = fontSize;
	bitmap.outlineColor = 'black';
	bitmap.outlineWidth = 5;
	bitmap.textColor = this.titleColor();
	bitmap.drawText(text,0,0,width,height,'right');

	this._titleWidth = bitmap.measureTextWidth(text);
};

EditorLine.prototype.refreshParts = function(force=false){
	var parts = this._parts;
	var length = this.partsNum();
	if(force)this._textsCache = [];

	for(var i = 0; i<length; i=(i+1)|0){
		var text = this.partsText(i);
		var sprite = parts[i];
		if(!sprite){
			sprite = this.createPartsSprite();
			this.addChild(sprite);
			parts[i] = sprite;
			this._textsCache[i] = null;
		}else{
			sprite.visible = true;
		}
		if(this.checkChangeFromCache(text,i)){
			this.refreshPartsText(sprite,text,i);
		}
	}
	
	var partsLen = parts.length;
	for(;i<partsLen;i=(i+1)|0){
		parts[i].parent.removeChild(parts[i]);
	}
	parts.length = length;

	this.layout();
};

EditorLine.prototype.checkChangeFromCache = function(text,i){
	if(this._valueType==='tab')return true;

	var onEditing = this._inputting!==null
	var key = (onEditing ? '__EDITING:' : '__DEFINITED:') + text;

	if(this._textsCache[i] === key){
		return false;
	}
	this._textsCache[i] = key;
	return true;
};

EditorLine.prototype.partsNum = function(){
	if(this._valueType==='tab'){
		return this._innerData.tabNames.length;
	}
	return 1;
};

EditorLine.prototype.partsText = function(index){
	if(this._valueType==='tab'){
		return this._innerData.tabNames[index];
	}
	if(this._innerData.value!==undefined){
		if(typeof this._innerData.value === 'function'){
			return this._innerData.value(this._innerData.data);
		}
		return this._innerData.value;
	}

	var value = this._inputting || this.value();
	if(!value && this._innerData.placeholder){
		return this._innerData.placeholder;
	}
	return value;
};

EditorLine.prototype.addValue = function(rate){
	if(this._disabled)return;

	if(this._innerData.list){
		var idx = this._innerData.list.indexOf(this.value());
		idx += (rate>0) ? 1 : -1;
		if(this._innerData.noLoop){
			idx = idx.clamp(0,this._innerData.list.length-1);
		}else{
			if(idx<0)idx=this._innerData.list.length-1;
			if(idx>=this._innerData.list.length)idx=0;
		}

		this.setValue(this._innerData.list[idx]);
		SoundManager.playCursor();
		return;
	}

	if(this._innerData.button){
		return;
	}
	if(this._innerData.picker){
		return;
	};

	switch(this._valueType){
	case 'array':
	case 'object':
		SoundManager.playBuzzer();
		return;
	case 'switch':
		this.setValue(rate>0);
		return;
	case 'tab':
		var v = (this.value()+(rate>0 ? 1 : -1)).clamp(0,this._innerData.tabNames.length-1);
		if(this.value()===v)return;
		SoundManager.playCursor();
		this.setValue(v);
		return;
	case 'color':
		return;
	}

	var unit = supplementNum(0.1,this._innerData.unit);
	if(!unit)return;

	var value = this.value();
	value += unit*rate;
	value = Math.round(value/unit*10)*unit/10+0.000000001;
	if(this._innerData.integer){
		value = Math.round(value);
	}

	this.setValue(value);
};

EditorLine.prototype.setValue = function(value){
	if(this._innerData.noValue)return;
	if(typeof value==='number'&&Math.abs(value)<=0.000001){
		value = 0;
	}

	switch(this._valueType){
	case 'switch':
		if(value!==this.value())SoundManager.playCursor()
		break;
	case 'string':
	case 'color':
	case 'object':
		break;
	default:
		if(this._innerData.integer){
		}else{
			var unit = this._innerData.unit||0.1;
			var decimal = TRP_CORE.decimal(unit)+1;
			value = value.toFixed(decimal);
		}
	}

	if(value===this.value())return;
	
	switch(this._valueType){
	case 'object':
		this._inputting = JSON.stringify(value);
		break;
	default:
		this._inputting = String(value);
	}

	var idx = this._editingIndex;
	if(this._valueType=='tab'){
		this._editingIndex = Math.max(0,this._editingIndex);
	}else{
		this._editingIndex = 0;
	}
	this.applyEditing();
	if(this._valueType!=='tab'){
		this._editingIndex = idx;
	}
};

EditorLine.prototype.callButtonHandler = function(){
	if(typeof this._innerData.button==='function'){
		this._innerData.button(this._key,this.value(),this);
		SoundManager.playCursor();
	}else if(this._innerData.input){
		this.startInput();
	}
};


EditorLine.MAX_PARTS_WIDTH = 128;
EditorLine.prototype.maxPartsWidth = function(){
	if(this._innerData.fixedWidth){
		if(typeof this._innerData.fixedWidth === 'string'){
			var p = EditorLine.getParts(EditorLine.MAX_PARTS_WIDTH);
			var w = p.bitmap.measureTextWidth(this._innerData.fixedWidth)+2;
			EditorLine.partsCache.push(p);
			return w;
		}else{
			return this._innerData.fixedWidth;
		}
	}else if(this._innerData.maxWidth){
		return this._innerData.maxWidth;
	}
	return EditorLine.MAX_PARTS_WIDTH;
};

EditorLine.partsCache = [];
EditorLine.getParts = function(width=EditorLine.MAX_PARTS_WIDTH){
	var fontSize = EditorLine.FONT_SIZE
	var parts = EditorLine.partsCache.find(p=>p.bitmap.width>=width);
	if(parts){
		TRP_CORE.remove(EditorLine.partsCache,parts);
		parts.bitmap.clear();
	}else{;
		var height = fontSize+6;
		parts = new Sprite(new Bitmap(width,height));
	}
	var bitmap = parts.bitmap;
	bitmap.fontSize = fontSize;
	bitmap.outlineColor = 'black';
	bitmap.outlineWidth = 5;
	bitmap.textColor = 'rgb(200,255,255)';
	return parts;
}

EditorLine.prototype.createPartsSprite = function(){
	var w = this.maxPartsWidth();
	var parts = EditorLine.getParts(w);
	parts.bitmap.textColor = this.partsColor();
	return parts;
};

EditorLine.prototype.refreshPartsText = function(sprite,text,i){
	var bitmap = sprite.bitmap;
	bitmap.clear();
	bitmap.textColor = this.partsColor();

	var width = bitmap.width;
	var height = bitmap.height;
	var textWidth;
	if(this._innerData.fixedWidth){
		if(typeof this._innerData.fixedWidth === 'string'){
			textWidth = bitmap.measureTextWidth(this._innerData.fixedWidth)+2;
		}else{
			textWidth = this._innerData.fixedWidth;
		}
	}else{
		textWidth = Math.min(width,bitmap.measureTextWidth(text)+2);
	}

	var m = 1;
	var x = 0;

	var align = 'right';
	if(this._innerData.fixedWidth){
		align = 'center';
	}

	//tab
	if(this._valueType==='tab'){
		m = 6;
		align = 'center';
		if(i===this.value()){
			bitmap.fillRect(0,0,textWidth+2*m,height,'rgba(0,255,0,1)');
			bitmap.clearRect(1,1,textWidth+2*m-2,height-2);
			bitmap.fillRect(1,1,textWidth+2*m-2,height-2,'rgba(100,255,100,0.85)');
		}else{
			bitmap.textColor = 'rgba(255,255,255,0.8)'
		}
	}
	//switch
	if(this._valueType==='switch'){
		if(!this.headParts){
			this.headParts = new TRP_CORE.TRP_Switch(48,height);
			this.headParts.touchSwitch = true;
			this.headParts.setValueChangeHandler(value=>this.setValue(value));
			this.addChild(this.headParts);
		}

		var on = text==='true'||text===true;
		this.headParts.on = on;
		if(on){
			textWidth = Math.min(width,bitmap.measureTextWidth('false')+2);
		}
	}

	//slider
	if(this._innerData.slider){
		if(!this.headParts){
			var sliderMin = supplementNum(this.min(),this._innerData.slider?.min);
			var sliderMax = supplementNum(this.max(),this._innerData.slider?.max);
			this.headParts = new TRP_CORE.TRP_Slider(140,20,Number(text),{
				min:sliderMin,max:sliderMax,list:this._innerData.list,
				log:this._innerData.slider?.log||0,
				integer:this._innerData.integer,
			});
			this.headParts.setValueChangeHandler(value=>this.setValue(value));
			this.addChild(this.headParts);
			this.headParts.y = height/2;
		}
	}

	//color
	if(this._valueType==='color'){
		bitmap.fillRect(0,1,height-2,height-2,'black');
		bitmap.fillRect(1,2,height-4,height-4,text);
		x = height+2;
	};

	//head parts (switch/slider/etc...)
	if(this.headParts){
		this.headParts.x = Graphics.width - this.headParts.width - x - textWidth - 10;
		if(this._valueType!=='switch'){
			this.headParts.setValueWithoutCallHandler(this.value());
		}
	}


	//validator
	if(this._innerData.validator && !this._innerData.validator(text,this.value())){
		bitmap.textColor = 'rgb(255,150,150)';
	}else{
		if(this._inputting!==null){
			//editing
			bitmap.textColor = 'rgb(150,255,150)';
		}
	}

	//draw
	bitmap.drawText(text,x+m,1,textWidth,height-2,align);

	sprite._frame.width = x+textWidth+2*m+1;
	sprite._refresh();
};


EditorLine.prototype.layout = function(){
	if(!this._titleSprite){
		this.createTitleSprite();
	}

	var margin = 5;
	var x;
	var rightAlign = true;

	var title = this._titleSprite;
	if(rightAlign){
		x = Graphics.width-margin;
	}else{
		x = margin;
		title.x = x;
		x += this._titleWidth + margin;

		if(this.headParts){
			x += this.headParts.width+0;
		}
	}
	
	var allParts = this._parts;
	var length = allParts.length;
	if(rightAlign){
		for(var i=length-1; i>=0; i=(i-1)|0){
			var parts = allParts[i];
			parts.visible = !this._hidden;
			if(!parts.visible)continue;

			x -= parts.width;
			parts.x = x;
			x -= margin;
		}
	}else{
		for(var i = 0; i<length; i=(i+1)|0){
			var parts = allParts[i];
			parts.visible = !this._hidden;
			if(!parts.visible)continue;

			parts.x = x;
			x += parts.width + margin;
		}
	}
   
	var title = this._titleSprite;
	if(rightAlign){
		title.x = x;
		if(this.headParts){
			this.headParts.x = x-this.headParts.width+6;
			title.x -= this.headParts.width;
		}
		this._width = Graphics.width-x + this._titleWidth;
	}else{
		this._width = x-margin;
	}

	if(this._innerData.exSprite){
		this.addChild(this._innerData.exSprite);
		this._innerData.exSprite.x = Graphics.boxWidth-this._width-2
			- (this.headParts ? this.headParts.width : 0);
		this._innerData.exSprite.refresh(this);
	}
};

EditorLine.prototype.show = function(){
	if(!this._hidden)return;
	this._hidden = false;
	this.layout();
};
EditorLine.prototype.hide = function(){
	if(this._hidden)return;
	this._hidden = true;
	this.layout();
};


/* edit
===================================*/
EditorLine.prototype.isExclusiveInput = function(){
	return this._picker?.isExclusiveInput?.()||false;
};

EditorLine.prototype.processTouch = function(touching,x,y,margin){
	if(this._disabled)return;
	if(this.headParts?.processTouch?.()){
		return true;
	}
	if(!touching)return false;

	// if(this._picker){
	// 	var color = this._picker.color();
	// 	if(color !== this.value()){
	// 		this.setValue(color);
	// 	}
	// }

	if(y<this.y)return false;
	if(y>this.y+this._height)return false;

	var rightAlign = true;
	if(rightAlign){
		if(x<Graphics.width-this.totalWidth()-margin)return false;
	}else{
		if(this.totalWidth()+margin<x)return false;
	}

	var allParts = this._parts;
	var length = allParts.length;
	for(var i = 0; i<length; i=(i+1)|0){
		var parts = allParts[i];
		if(parts.x<=x && x<=parts.x+parts.width){
			if(this._innerData.button){
				this.callButtonHandler();
			}else if(this._valueType==='color'){
				this.startColorPicker();
			}else if(this._valueType==='switch'){
				this.setValue(!this.value());
			}else{
				this.setEditing(i);
			}
			return true;
		}
	}

	var ts = this._titleSprite;
	if(ts.x-ts.anchor.x*ts.width<=x && x+(ts.anchor.x-1)*ts.width<=ts.x+ts.width){
		this.setEditing(0);
	}
	return true;
};

EditorLine.prototype.startEditing = function(){
	if(this._valueType==='tab'){
		this.refreshParts();
	}else{
		this.setEditing(Math.max(0,this._editingIndex));
	}
};
EditorLine.prototype.setEditing = function(index){
	var parts = this._parts;
	var length = parts.length;
	index = index % length; 
	if(this._editingIndex===index)return;

	this._editingIndex = index;
	this.clearInputting();

	for(var i = 0; i<length; i=(i+1)|0){
		parts[i].opacity = i===index ? 255 : 150;
	}

	if(this._valueType==='tab'){
		if(this.value()!==index){
			this.setValue(index);
			SoundManager.playCursor();
			return;
		}
	}

	this.refreshParts();
};
EditorLine.prototype.endEditing = function(){
	if(this._inputting){
		this.applyEditing();
	}

	var needsRefresh = this._editingIndex>=0;
	this._editingIndex = -1;
	var parts = this._parts;
	var length = parts.length;
	for(var i = 0; i<length; i=(i+1)|0){
		parts[i].opacity = 255;
	}

	this.clearInputting();

	if(this._picker){
		this.endPicker();
	}

	if(needsRefresh){
		this.refreshParts();
	}
};

var KEY_CODE = EditorLine.KEY_CODE = {
	backSpace:8,
	tab:9,
	delete:46,
	num:48,
	alphabet:65,
	a:65,
	c:67,
	d:68,
	e:69,
	f:70,
	g:71,
	i:73,
	l:76,
	p:80,
	s:83,
	t:84,
	v:86,
	w:87,
	alphabetEnd: 90,
	tenkey:96,
	minus:189,
	tenkeyMinus:109,
	dot:190,
	comma:188,
	tenkeyDot:110,
	at: 192,
	bracket: 219
};

EditorLine.prototype.onKeyDown = function(event){
	if(event.metaKey||event.ctrlKey){
		if(event.key==='i'){
			if(this._innerData.input){
				this.statrInput();
			}
		}
	}
	this._innerData.onKeyDown?.(event,this,this._innerData.data);
};
EditorLine.prototype.startInput = function(){
	var value = prompt('パラメータ<%1>の値を入力'.format(this._key),this.value()||"");
	if(value!==null){
		this.setValue(value);
	}
};

EditorLine.prototype.processInput = function(keyCode,key){
	if(this._disabled)return true;

	if(Input.isTriggered('ok')){
		if(this._innerData.button){
			this.callButtonHandler();
		}else if(this._valueType==='color'){
			if(this._picker?.visible){
				this.endPicker();
			}else{
				this.startColorPicker();
			}
			SoundManager.playCursor();
		}else if(this._innerData.picker){
			this.startDataPicker();
		}else{
			this.applyEditing();
			this.clearInputting();
			SoundManager.playCursor();
		}
	}else if(keyCode===KEY_CODE.backSpace){
		if(this._innerData.tryDelete){
			if(this._innerData.tryDelete===true){
				this._inputting = "";
				this.applyEditing();
				SoundManager.playCursor();
			}else{
				this._innerData.tryDelete?.(this._key,this);
			}
		}else{
			this.clearInputting();
			this.applyEditing();
		}
	}else{
		this._processCharacterInput(keyCode,key);
	}

	return true;
};
EditorLine.prototype._processCharacterInput = function(keyCode){
	var numKeyCode = KEY_CODE.num;
	var tenKeyCode = KEY_CODE.tenkey;
	var chara = null;

	switch(this._valueType){
	case 'switch':
	case 'tab':
	case 'color':
		return;
	}


	if(keyCode>=numKeyCode&&keyCode<numKeyCode+10){
		chara = Number(keyCode-numKeyCode);
	}else if(keyCode>=tenKeyCode&&keyCode<tenKeyCode+10){
		chara = Number(keyCode-tenKeyCode);
	}else if(keyCode===KEY_CODE.minus||keyCode===KEY_CODE.tenkeyMinus){
		chara = '-';
		this._inputting = '';
	}else if(keyCode===KEY_CODE.dot||keyCode===KEY_CODE.tenkeyDot){
		if(!this._inputting.contains('.')){
			chara = '.';
		}
	}else if(keyCode===KEY_CODE.comma){
		if(this._valueType==='array'){
			chara = ',';
		}
	}
	if(chara!==null){
		this._inputting = this._inputting||'';
		this._inputting += chara;
		// this.applyEditing();
		this.refreshParts();
	}
};

EditorLine.prototype.clearInputting = function(){
	this._inputting = null;
};

EditorLine.prototype.applyEditing = function(force=false){
	if(this._inputting===null)return;

	var index = this._editingIndex;
	if(index<0)return;

	var value;
	switch(this._valueType){
	case 'array':
		this._inputting = this._inputting||'';
		value = this._inputting.split(',').map(v=>Number(v)||0);
		if(value.length===0)value = [0];
		break;
	case 'object':
		value = JSON.parse(this._inputting);
		break;
	case 'switch':
		value = this._inputting==='true';
		break;
	case 'string':
	case 'color':
		value = this._inputting;
		break;
	default:
		value = Number(this._inputting)||0;
		var innerData = this._innerData;
		if(innerData.min!==undefined){
			value = Math.max(this.min(),value);
		}
		if(innerData.max!==undefined){
			value = Math.min(this.max(),value);
		}

		if(!this._innerData.integer){
			var unit = this._innerData.unit||0.1;
			var decimal = TRP_CORE.decimal(unit)+1;
			if(TRP_CORE.decimal(value)>decimal){
				value = value.toFixed(decimal);
			}
		}
	}

	var key = this._key;
	var keys = this._keys;
	var obj = this._data;
	var length = keys.length;
	var lastValue = this.value();
	for(var i=0; i<length; i=(i+1)|0){
		var key = keys[i];
		if(i<length-1){
			obj = obj[key];
		}else{
			obj[key] = value;
		}
	}

	this._innerData.onValueChange?.(this._key,value,lastValue,this._innerData);
	if(this._key===null){
		//quit @onValueChange
		return;
	}

	this.clearInputting();

	if(this._valueType==='tab'){
		this.setEditing(this.value());
	}else{
		this.refreshParts();
	}
};

EditorLine.prototype.value = function(){
	var obj = this._data;
	if(!obj)return null;
	
	var length = this._keys.length;
	for(var i=0; i<length-1; i=(i+1)|0){
		obj = obj[this._keys[i]];
	}
	return obj[TRP_CORE.last(this._keys)];
};


EditorLine.prototype.min = function(){
	if(typeof this._innerData.min==='function')return this._innerData.min();
	return this._innerData.min;
};
EditorLine.prototype.max = function(){
	if(typeof this._innerData.max==='function')return this._innerData.max();
	return this._innerData.max;
};


/* picker
===================================*/
EditorLine.prototype.startPicker = function(picker){
	this._picker = picker;
	if(picker.parent)return;

	this.parent.addChild(picker);
	picker.visible = true;

	_Dev.debugTextContainer.visible = false;
};
EditorLine.prototype.endPicker = function(){
	var picker = this._picker;
	if(!picker)return;
	this._picker = null;
	picker.parent.removeChild(picker);

	_Dev.debugTextContainer.visible = true;
};

/* DataPicker
===================================*/
EditorLine.prototype.startDataPicker = function(){
	if(!this._picker){
		var pickerData = this._innerData.picker;
		var picker = new TRP_CORE.DataPicker(pickerData);
		this._picker = picker;
		picker.visible = false;
		picker.setHandler('end',()=>{
			this.endPicker();
		});
	}

	picker.startPicking(this._key,this._data);
	this.startPicker(picker);
};


/* ColorPicker
===================================*/
EditorLine.cache = {
	colorPicker:null,
};
EditorLine.prototype.startColorPicker = function(){
	if(!this._picker){
		if(!EditorLine.cache.colorPicker){
			var size = 144;
			var picker = EditorLine.cache.colorPicker = new ColorPicker(size);
			picker.x = 10;
			picker.y = 30;
			picker.visible = false;
		}
		this._picker = EditorLine.cache.colorPicker;
	}

	var picker = this._picker;
	picker.setHandler('applyData',(color)=>{
		this.setValue(color);
	});
	picker.setHandler('end',()=>{
		picker.releaseHandlers();
	});

	picker.setColor(this.value());
	this.startPicker(picker);
};



//=============================================================================
// ColorPicker
//=============================================================================
TRP_CORE.ColorPicker = function ColorPicker(){
    this.initialize.apply(this, arguments);
};
var ColorPicker = TRP_CORE.ColorPicker;

ColorPicker.colorWithHsv = function(h,s,v){
	var max = v;
	var min = max-((s/255)*max);
	var r,g,b;
	if(h<=60){
		r = max;
		g = (h/60)*(max-min)+min;
		b = min;
	}else if(h<=120){
		r = ((120-h)/60)*(max-min)+min;
		g = max;
		b = min;
	}else if(h<=180){
		r = min;
		g = max;
		b = ((h-120)/60)*(max-min)+min;
	}else if(h<=240){
		r = min;
		g = ((240-h)/60)*(max-min)+min;
		b = max;
	}else if(h<=300){
		r = ((h-240)/60)*(max-min)+min;
		g = min;
		b = max;
	}else{
		r = max;
		g = min;
		b = ((360-h)/60)*(max-min)+min;
	}
	r = Math.round(r).toString(16);
	g = Math.round(g).toString(16);
	b = Math.round(b).toString(16);
	if(r.length===1)r='0'+r;
	if(g.length===1)g='0'+g;
	if(b.length===1)b='0'+b;
	var color = '#'+r+g+b;
	return color;
};


ColorPicker.HUE_WIDTH = 20;
ColorPicker.MARGIN = 3;
ColorPicker.prototype = Object.create(PIXI.Container.prototype);
Object.assign(ColorPicker.prototype,IF_HandlerOwner.prototype);
ColorPicker.prototype.constructor = ColorPicker;
ColorPicker.prototype.initialize = function(size){
    PIXI.Container.call(this);
    this.initializeHandlers();

    this._size = size;

    this._hue = -1;
    this._saturation = -1;
    this._value = -1;
    this._color = null;

    this._touchingHue = false;
    this._touchingSv = false;


    var margin = ColorPicker.MARGIN;
    var hueWidth = ColorPicker.HUE_WIDTH;
    var totalWidth = margin*3 + size + hueWidth;
    var totalHeight = margin*2 + size;

    var bitmap,sprite;

    //this > backBitmap
    bitmap = new Bitmap(16,16);
    bitmap.fillAll('rgba(0,0,0,0.5)');
    sprite = new Sprite(bitmap);
    this.addChild(sprite);
    sprite.scale.set(totalWidth/16,totalHeight/16);
    this._backSprite = sprite;


  	//pickerSprite
    bitmap = new Bitmap(size,size);
    sprite = new Sprite(bitmap);
    this.addChild(sprite);
    sprite.x = margin;
    sprite.y = margin;
    this._pickerSprite = sprite;
    this.bitmap = bitmap;

    //huePicker
    bitmap = new Bitmap(hueWidth,size);
    sprite = new Sprite(bitmap);
    this.addChild(sprite);
    sprite.x = margin*2 + size;
    sprite.y = margin;
    this._huePicker = sprite;

    //pointer
    bitmap = new Bitmap(16,16);
    sprite = new Sprite(bitmap);
    this.addChild(sprite);
    sprite.anchor.set(0.5,0.5);
    this._pointer = sprite;
    var ctx = bitmap._context;
    ctx.beginPath();
    ctx.arc(8,8,6,0,360*Math.PI/180,false);
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(8,8,3,0,360*Math.PI/180,false);
    ctx.globalCompositeOperation = "destination-out";
    ctx.fill();

    //huePointer
    var lineWidth = 2;
    var spaceHeight = 2;
    bitmap = new Bitmap(hueWidth+lineWidth*2,spaceHeight+lineWidth*2);
    sprite = new Sprite(bitmap);
    this.addChild(sprite);
    sprite.anchor.set(0.5,0.5);
    this._huePointer = sprite;
    bitmap.fillAll('black');
    bitmap.clearRect(lineWidth,lineWidth,bitmap.width-lineWidth*2,bitmap.height-lineWidth*2);


    this.setupHuePicker();
    this.setColor('rgb(255,255,255)');
};

ColorPicker.prototype.setupHuePicker = function(){
	var bitmap = this._huePicker.bitmap;
	var width = bitmap.width;
	var height = bitmap.height;

	var s = 255;
	var v = 255;
	for(var y=0; y<height; y=(y+1)|0){
		var h = 360*(y/height);
		var color = ColorPicker.colorWithHsv(h,s,v);
		bitmap.fillRect(0,y,width,1,color);
	}
};

ColorPicker.prototype.setupPallete = function(h){
	var bitmap = this._pickerSprite.bitmap;
	bitmap.clear();

	var width = this.width;
	var height = this.height;

	var r,g,b;
	for(var x=0; x<width; x=(x+1)|0){
		var s = 255*x/width;
		for(var y=0; y<height; y=(y+1)|0){
			var v = 255*y/height;
			var color = ColorPicker.colorWithHsv(h,s,v);
			bitmap.fillRect(x,height-y-1,1,1,color);
		}
	}
};

ColorPicker.prototype.setColor = function(color){
	var r,g,b;
	if(color.indexOf('rgb')!==0){
        if(color[0] == "#"){
            color = color.substr(1);
        }else if(color.indexOf("0x")===0){
            color = color.substr(2);
        }
        if(color.length == 8){
            color = color.substr(2);
        }
        r = parseInt(color.substr(0, 2), 16);
        g = parseInt(color.substr(2, 2), 16);
        b = parseInt(color.substr(4, 2), 16);
	}else{
		var args = color.match(/\((.+)\)/)[1].split(',');
		r = Number(args[0]);
		g = Number(args[1]);
		b = Number(args[2]);
	}

	var h,s,v;
	var max = Math.max(r,g,b);
	var min = Math.min(r,g,b);
	if(r===g && g===b){
		h = Math.max(0,this._hue);
	}else if(r>=g && r>=b){
		h = 60*(g-b)/(max-min);		
	}else if(g>=r && g>=b){
		h = 60*(b-r)/(max-min)+120;
	}else{
		h = 60*(r-g)/(max-min)+240;
	}

	s = (max-min)/max*255;
	v = max;

	if(h<0){
		h += 360;
	}else if(h>360){
		h -= 360;
	}

	this.setHue(h);
	this.setSV(s,v);
};

ColorPicker.prototype.updateResultColor = function(){
	this._color = ColorPicker.colorWithHsv(this._hue,this._saturation,this._value);
};

ColorPicker.prototype.color = function(){
	return this._color;
};

ColorPicker.prototype.setHue = function(h){
	h = h.clamp(0,360);
	if(this._hue === h)return;

	var dh = h-this._hue;
	this._hue = h;
	this.setupPallete(this._hue);

	var sprite = this._huePicker;
	var pointer = this._huePointer;
	pointer.x = sprite.x+sprite.width/2;
	pointer.y = sprite.y+sprite.height*h/360;

	this.updateResultColor();
};

ColorPicker.prototype.setSV = function(s,v){
	if(this._saturation===s && this._value===v)return;

	this._saturation = s;
	this._value = v;

	var margin = ColorPicker.MARGIN
	var size = this._size;

	var pointer = this._pointer;
	pointer.x = margin+Math.round((s/255)*size);
	pointer.y = margin+Math.round(size-(v/255)*size-1);

	this.updateResultColor();
};

ColorPicker.prototype.update = function(){
	if(!this.visible){
		this._touchingHue = false;
		this._touchingSv = false;
		return;
	}
	if(!TouchInput.isTriggered() && !TouchInput.isPressed()){
		this._touchingHue = false;
		this._touchingSv = false;
		return;
	}

	var x = TouchInput.x-this.x;
	var y = TouchInput.y-this.y;
	var dx,dy,touchInside;

	var hPicker = this._huePicker;
	dx = x-hPicker.x;
	dy = y-hPicker.y;

	touchInside = (dx>=0 && dx<=hPicker.width && dy>=0 && dy<=hPicker.height);
    if(this._touchingHue || (!this._touchingSv&&touchInside)){
		dy = dy.clamp(0,hPicker.height-1);
		var hue = Math.round(dy/(hPicker.height-1)*360);
		this.setHue(hue);
		this._touchingHue = true;
		this.callHandler('applyData',this.color());
		return;
	}

	var svPicker = this._pickerSprite;
	dx = x-svPicker.x;
	dy = y-svPicker.y;
	touchInside = (dx>=0 && dx<=svPicker.width && dy>=0 && dy<=svPicker.height);
	if(this._touchingSv || (!this._touchingHue&&touchInside)){
		dx = dx.clamp(0,svPicker.width-1);
		dy = dy.clamp(0,svPicker.height-1);
		var s = Math.round(dx/(svPicker.width-1)*255);
		var v = Math.round((svPicker.height-1-dy)/(svPicker.height-1)*255);
		this.setSV(s,v);
		this._touchingSv = true;
		this.callHandler('applyData',this.color());
		return;
	}
	return false;
};



//=============================================================================
// PickerBase
//=============================================================================
var PickerBase = TRP_CORE.PickerBase = function PickerBase(){
    this.initialize.apply(this, arguments);
};
PickerBase.TINT_SEVERAL = 0xaaffff;
PickerBase.TINT_NORMAL = 0xffffaa;
PickerBase.TINT_SEARCH = 0xaaffaa;
PickerBase.LAYOUT = {
	marginTopBottom:5
};
PickerBase.prototype = Object.create(PIXI.Container.prototype);
Object.assign(PickerBase.prototype,IF_HandlerOwner.prototype);
PickerBase.prototype.constructor = PickerBase;
PickerBase.prototype.initialize = function() {
    PIXI.Container.call(this);
	this.initMembers();
};
PickerBase.prototype.createBaseSprites = function(){
	this.createBackSprite();
	this.createHighlightBitmap();
	this.createGuideSprite();
	this.createHeaderSprite();
};

PickerBase.prototype.initMembers = function(){
	this.initializeHandlers();

	this._header = '';
	this._headerSprite = null;

	this._topRow = 0;
	this._maxRow = 0;
	this._dispRows = 0;
	this._maxTopRow = 0;

	this._owner = null;
    this._severalMode = false;
    this._severalModeSwitched = false;
    this._selectingIndexes = [];

    this._backSprite = null;
    this._highlightSprites = [];
    this._highlightBitmap = null;
    this._guideSprite = null;
    this._searchSprite = null;

    this._listType = null;

    this._categoryIndex = 0;
};

PickerBase.prototype.startPicking = function(){
	this.visible = true;

	Input.clear();
	TouchInput.clear();
	this.registerWheelListener();

	this._onKeyDown = this.onKeyDown.bind(this);
	document.addEventListener('keydown',this._onKeyDown);

	this.refresh();
	if(!this._names.length){
		this.processPageUp();
	}

	this._headerSprite.opacity = 255;
	this._headerSprite.visible = true;

	if(this._guideSprite){
		var sprite = this._guideSprite;
		sprite.x = this._width + 10;
		sprite.y = Graphics.height-50+(this._topRow*this.itemHeight());
	}
};

PickerBase.prototype.end = function(cancel=false){
	this.didEndPicking(cancel);

	document.removeEventListener('keydown', this._onKeyDown);
	this._onKeyDown = null;

	this.resignWheelListener();
	this.visible = false;

	SoundManager.playCancel();
	Input.clear();
	TouchInput.clear();

	this.callHandler('end',cancel);
};
PickerBase.prototype.didEndPicking = function(cancel=false){};

PickerBase.prototype.refresh = function(){
	var type = this.categoryType();
	if(this._listType === type)return;
	this.setListType(type);

	if(this.isReady()){
		this._refresh();
	}
};

PickerBase.prototype.isReady = function(){
	return true;
};

PickerBase.prototype._refresh = function(){
	var col = this.maxColumns();

	var itemWidth = this.itemWidth();
	var itemHeight = this.itemHeight();

	var margin = PickerBase.LAYOUT.marginTopBottom;
	var itemNum = this.maxItems();

	var mx = this.itemMarginX();
	var my = this.itemMarginY();

	this._maxRow = Math.ceil(itemNum/col);
	this._dispRows = Math.floor((Graphics.height-2*margin)/(itemHeight+my));
	this._maxTopRow = Math.max(0,this._maxRow-this._dispRows-1);

	var row = this._maxRow;
    var width = itemWidth*col+mx*(col-1)+margin*2;
    this._width = width;
    this._height = Graphics.height;

    this.refreshBackSprite();
	this.refreshItems();
};
PickerBase.prototype.setListType = function(type){
	this._listType = type;
	this.refreshHeaderSprite();
};

PickerBase.prototype.refreshItems = function(){};


/* needs overwrite
===================================*/
PickerBase.prototype.maxColumns = function(){return 4;};
PickerBase.prototype.itemHeight = function(){return 48;};
PickerBase.prototype.itemWidth = function(){return 48;};
PickerBase.prototype.maxItems = function(){return 0;};
PickerBase.prototype.guideTexts = function(){return null;};
PickerBase.prototype.itemMarginX = function(){return 0;};
PickerBase.prototype.itemMarginY = function(){return 0;};
PickerBase.prototype.categoryType = function(){
	return 1;
};
PickerBase.prototype.headerText = function(){return '';}

//category
PickerBase.prototype.maxCategories = function(){return 1};
PickerBase.prototype.isCategoryValid = function(index){return true};
PickerBase.prototype.isSeveralModeValid = function(){return true};
PickerBase.prototype.applyData = function(){};


/* select
===================================*/
PickerBase.prototype.deselectIndex = function(index){
	if(index<0)return;
	var arrayIdx = this._selectingIndexes.indexOf(index);
	if(arrayIdx<0)return;

	this._selectingIndexes.splice(arrayIdx,1);
	var sprite = this._highlightSprites[arrayIdx];
	if(sprite){
		this._highlightSprites.splice(arrayIdx,1);
		sprite.parent.removeChild(sprite);
	}
};

PickerBase.prototype.didPickData = function(index){
	if(this._selectingIndexes.contains(index)){
		this.deselectIndex(index);
	}else{
		this.setSelectingIndex(index);
	}
	this.applyData();
};


/* update
===================================*/
PickerBase.prototype.update = function(){
	if(this._headerSprite.visible){
		this.updateHeaderSprite();
	}
	if(this._searchSprite && this._searchSprite.opacity>0){
		this._searchSprite.opacity -= 3;
	}

	if(Input._latestButton){
		this.processInput();
	}else if(TouchInput.isLongPressed() && this.isSeveralModeValid()){
		if(!this._severalModeSwitched){
			this.switchSelectingMode();
			this._severalModeSwitched = true;
			if(this._selectingIndexes.length===0){
				this.processTouch();
			}
			this.applyData();
		}
	}else if(TouchInput.isTriggered()){
		this.processTouch();
		this._severalModeSwitched = false;
	}
	return true;
};
PickerBase.prototype.onKeyDown = function(event){
	var keyCode = event.keyCode;
	if((!event.ctrlKey&&!event.metaKey) && keyCode>=KEY_CODE.alphabet && keyCode<=KEY_CODE.alphabetEnd){
		var chara = event.key;
		this.search(chara);
	}
};
PickerBase.prototype.search = function(chara){};
PickerBase.prototype.didSuccessSearch = function(index){
	this.setTopIndex(index);
	var sprite = this._searchSprite;
	if(!sprite){
		sprite = this.createHighlightSprite();
		this._searchSprite = sprite;
		sprite.tint = PickerBase.TINT_SEARCH;
	}
	this.setHighlightSpritePosition(sprite,index);
	sprite.opacity = 150;

	if(!this._selectingIndexes.contains(index)){
		this.didPickData(index);
	}
};

PickerBase.prototype.processTouch = function(){
	var x = TouchInput.x - this.x;
	var y = TouchInput.y - this.y;

	if(x<0 || x>this._width){
		this.end();
		return;
	}

	var maxCol = this.maxColumns();
	var length = this.maxItems();
	var margin = PickerBase.LAYOUT.marginTopBottom;
	var mx = this.itemMarginX();
	var my = this.itemMarginY();
	var itemWidth = this.itemWidth();
	var itemHeight = this.itemHeight();
	var colW = itemWidth+mx;
	var rowH = itemHeight+my;
	var x0 = margin/2;

	var ix = x0;
	var iy = margin/2;
    for(var i = 0; i<length; i=(i+1)|0){
    	if(i===0){
    	}else if(i%maxCol === 0){
    		ix = margin/2;
    		iy += rowH;
    	}else{
    		ix += colW;
    	}
    	if(ix<=x && x<=ix+colW && iy<=y && y<=iy+rowH){
    		this.didPickData(i);
    		return;
    	}
    }
};

PickerBase.prototype.setSelectingIndex = function(index){
	SoundManager.playCursor();
	var sprite = null;
	var noSelect = index<0;

	if(this._severalMode){
		if(this._selectingIndexes.contains(index)){
			return;
		}
		this._selectingIndexes.push(index);
	}else{
		this._selectingIndexes[0] = index;
		sprite = this._highlightSprites[0];
		if(noSelect){
			if(sprite){
				this._highlightSprites.length = 0;
				sprite.parent.removeChild(sprite);
			}
			return;
		}
	}
	if(noSelect)return;

	if(!sprite){
		sprite = this.createHighlightSprite();
		this._highlightSprites.push(sprite);
	}
	sprite.tint = this._severalMode?PickerBase.TINT_SEVERAL:PickerBase.TINT_NORMAL;
	this.setHighlightSpritePosition(sprite,index);
};

PickerBase.prototype.setHighlightSpritePosition = function(sprite,index){
	var maxCol = this.maxColumns();
	var margin = PickerBase.LAYOUT.marginTopBottom;
	var mx = this.itemMarginX();
	var my = this.itemMarginY();
	var itemWidth = this.itemWidth();
	var itemHeight = this.itemHeight();

	var col = index%maxCol;
	var row = Math.floor(index/maxCol);
	sprite.visible = true;
	sprite.x = margin + col*itemWidth+(col-1)*mx;
	sprite.y = margin + row*itemHeight+(row-1)*my;
};

PickerBase.prototype.deselectAll = function(){
	var sprites = this._highlightSprites;
	var length = sprites.length;
    for(var i = 0; i<length; i=(i+1)|0){
        var sprite = sprites[i];
        sprite.parent.removeChild(sprite);
    }
    sprites.length = 0;
    this._selectingIndexes.length = 0;
};

/* headerSprite
===================================*/
PickerBase.prototype.createHeaderSprite = function(){
	var bitmap = new Bitmap(256,24);
	var sprite = new Sprite(bitmap);
	bitmap.fontSize = 21;
	bitmap.textColor = 'white'
	bitmap.outlineWidth = 6;
	this.addChild(sprite);
	this._headerSprite = sprite;
};
PickerBase.prototype.refreshHeaderSprite = function(){
	var header = this.headerText();
	this.showHeaderSprite(header);
};
PickerBase.prototype.showHeaderSprite = function(header,color='rgb(0,0,200)'){
	if(header === this._header)return;
	this._header = header;
	var sprite = this._headerSprite;
	var bitmap = sprite.bitmap;
	bitmap.clear();
	bitmap.outlineColor = color;
	bitmap.drawText(header,1,0,bitmap.width-2,bitmap.height);
	sprite.opacity = 255;
	sprite.visible = true;

	this.addChild(sprite);
};
PickerBase.prototype.updateHeaderSprite = function(){
	if(this._headerSprite.opacity>200){
		this._headerSprite.opacity -= 1;
	}else{
		this._headerSprite.opacity -= 5;
	}
	if(this._headerSprite.opacity<=0){
		this._headerSprite.visible = false;
	}
};


/* backSprite
===================================*/
PickerBase.prototype.createBackSprite = function(){
	var sprite,bitmap;
	bitmap = new Bitmap(16,16);
	sprite = new Sprite(bitmap);
	this.addChild(sprite);
	this._backSprite = sprite;
	sprite.opacity = 150;
	bitmap.fillAll('black');
};
PickerBase.prototype.refreshBackSprite = function(){
	var width = this._width;
	var height = Graphics.height;
	var sprite = this._backSprite;
	sprite.scale.set(width/16,height/16);
};


/* highlight sprites
===================================*/
PickerBase.prototype.createHighlightBitmap = function(){
	var bitmap = new Bitmap(16,16);
	bitmap.fillAll('white');
	this._highlightBitmap = bitmap;
};
PickerBase.prototype.createHighlightSprite = function(){
	var itemHeight = this.itemHeight();
	var itemWidth = this._width / this.maxColumns();

	var bitmap = this._highlightBitmap;
	var sprite = new Sprite(bitmap);
	this.addChild(sprite);
	sprite.opacity = 100;
	sprite.scale.set(itemWidth/bitmap.width,itemHeight/bitmap.height);
	return sprite;
};

/* guide sprite
===================================*/
PickerBase.prototype.createGuideSprite = function(){
	var texts = this.guideTexts();
	if(!texts)return;

	var fontSize = 14;
	var width = $gameSystem.isJapanese() ? 200 : 400;
	var lineHeight = fontSize + 4;
	var lines = texts.length;
	var height = lineHeight*lines;
	var bitmap = new Bitmap(width,height);
	var sprite = new Sprite(bitmap);
	this.addChild(sprite);
	this._guideSprite = sprite;

	sprite.anchor.set(0,1);

	bitmap.fontSize =  fontSize;
	bitmap.fillAll('rgb(0,0,150,0.6)');

	var y = 0;
	var length = texts.length;
    for(var i = 0; i<length; i=(i+1)|0){
        var text = texts[i];
		bitmap.drawText(text,1,y,width-2,lineHeight);
		y += lineHeight;
	};
};

/* scroll
===================================*/
PickerBase.prototype.setTopIndex = function(i){
	var row = Math.floor(i/this.maxColumns());
	var newRow = row.clamp(0,this._maxTopRow);
	if(this._topRow === newRow)return;
	this._topRow = newRow;
	this.refreshPosition();
};
PickerBase.prototype.setTopRowNext = function(){
	var index = (this._topRow-1)*this.maxColumns()
	this.setTopIndex(index);
};
PickerBase.prototype.setTopRowPrevious = function(){
	var index = (this._topRow+1)*this.maxColumns();
	this.setTopIndex(index);
};
PickerBase.prototype.refreshPosition = function(){
	var oldY = this.y
	this.y = -this._topRow*this.itemHeight();
	if(this._topRow!==0){
		this.y -= PickerBase.LAYOUT.marginTopBottom;
	}

	var dy = this.y - oldY;
	this._backSprite.y -= dy;
	if(this._guideSprite){
		this._guideSprite.y -= dy;
	}
	if(this._headerSprite){
		this._headerSprite.y -= dy;	
	}
};

PickerBase.prototype.processInput = function(){
	if(Input.isTriggered('ok')){
		this.end();
	}else if(Input.isTriggered('cancel')){
		this.end(true);
	}else if(Input.isRepeated('up')){
		SoundManager.playCursor();
		this.setTopRowNext();
	}else if(Input.isRepeated('down')){
		SoundManager.playCursor();
		this.setTopRowPrevious();
	}else if(Input.isRepeated('left')){
		this.processPageDown();
	}else if(Input.isRepeated('right')){
		this.processPageUp();
	}
};

PickerBase.prototype.processPageUp = function(){
	SoundManager.playCursor();
	if(this.maxCategories()>1){
		this._topRow = 0;
		var index = this._categoryIndex;
		do{
			index += 1;
			if(index>=this.maxCategories()){
				index = 0;
			}
		}while(index!==this._categoryIndex && !this.isCategoryValid(index));
		this._categoryIndex = index;
		this.refreshCategory();
	}else{
		this._topRow = Math.min(this._maxTopRow,this._topRow+this._dispRows);
		this.refreshPosition();
	}
};
PickerBase.prototype.processPageDown = function(){
	SoundManager.playCursor();
	if(this.maxCategories()>1){
		this._topRow = 0;
		var index = this._categoryIndex;
		do{
			index -= 1;
			if(index<0){
				index = this.maxCategories()-1;
			}
		}while(index!==this._categoryIndex && !this.isCategoryValid(index));
		this._categoryIndex = index;
		this.refreshCategory();
	}else{
		this._topRow = Math.max(0,this._topRow-this._dispRows);
		this.refreshPosition();	
	}
};

PickerBase.prototype.refreshCategory = function(){
	this.deselectAll();
	this.refresh();
	this.refreshPosition();
};



/* several mode
===================================*/
PickerBase.prototype.switchSelectingMode = function(){
	this.setSeveralMode(!this._severalMode);
};
PickerBase.prototype.setSeveralMode = function(valid){
	if(this._severalMode===valid)return;
	this._severalMode = valid;

	this.deselectAll();
};

/* wheel
===================================*/
PickerBase.prototype.registerWheelListener = function(){
	var listener = this._onWheel.bind(this);
    this._wheelListener = listener;
    document.addEventListener('wheel', listener);
};
PickerBase.prototype.resignWheelListener = function(){
	if(!this._wheelListener)return;

	document.removeEventListener('wheel', this._wheelListener);
	this._wheelListener = null;
};

PickerBase.prototype._onWheel = function(event) {
	if(event.deltaY>0){
		this.setTopRowNext();
	}else if(event.deltaY<0){
		this.setTopRowPrevious();
	}
    event.stopPropagation();
};
PickerBase.prototype.isExclusiveInput = function(){
	return true;
};

//=============================================================================
// DataPicker
//=============================================================================
var DataPicker = TRP_CORE.DataPicker = function DataPicker(){
    this.initialize.apply(this, arguments);
};

DataPicker.MARGIN = 5;
DataPicker.ROW_HEIGHT = 20;
DataPicker.COL_WIDTH = 300;
DataPicker.COL_WIDTH_ENG = 380;
DataPicker.MAX_COL = 1;

DataPicker.prototype = Object.create(PickerBase.prototype);
DataPicker.prototype.constructor = DataPicker;
DataPicker.prototype.initialize = function(pickerData={}){
    PickerBase.prototype.initialize.call(this);

    this._key = null;
    this._data = null;
    this._originalValue = null;

    this._handlers = pickerData.handlers||{};
    this._dataSet = (typeof pickerData.dataSet==='function')?pickerData.dataSet():pickerData.dataSet;
    this._categories = pickerData.categories||null;
    this._categoryNames = pickerData.categoryNames||null;
    this._categoryKey = null;
    this._categoryKeyFunc = null;
    if(pickerData.categoryKey){
    	if(typeof pickerData.categoryKey === 'string'){
    		this._categoryKey = pickerData.categoryKey;
    	}else{
    		this._categoryKeyFunc = pickerData.categoryKey;
    	}
    }

    this._isInvalidFunc = pickerData.isInvalid||null;
    this._nameForKeyFunc = pickerData.nameForKey || null;
    this._commentFunc = pickerData.comment || null;
    this._filterFunc = pickerData.filterMode || null;

    this._list = [];
    this._names = [];
    this._contentsSprite = null;
    this._allData = null;
    this._allNames = null;
    this._filterMode = '';

    this.createAllData();
    this.createBaseSprites();
    this.createContentsSprite();
};


DataPicker.prototype.createContentsSprite = function(){
	var maxNum = 0;
	var allData = this.allData();
	var length = allData.length;
    for(var i = 0; i<length; i=(i+1)|0){
    	var categoryData = allData[i];
    	maxNum = Math.max(maxNum,Object.keys(categoryData).length);
    }

    var width = this.itemWidth();
    var height = this.itemHeight()*maxNum;

	var bitmap = new Bitmap(width,height);
	var sprite = new Sprite(bitmap);
	this.addChild(sprite);
	this._contentsSprite = sprite;
	sprite.y = PickerBase.LAYOUT.marginTopBottom;
};
DataPicker.prototype.rawData = function(){
	return this._dataSet;
};
DataPicker.prototype.createAllData = function(){
	return this._createAllData(this.rawData());
};
DataPicker.prototype._createAllData = function(database){
	var allData = [];
	var allNames = [];
	this._allData = allData;
	this._allNames = allNames;
	var categories = this._categories;
	var categoryLength = categories.length;
    for(var i = 0; i<categoryLength; i=(i+1)|0){
    	allData.push([]);
    	allNames.push([]);
    }

    var keys;
    var isArray = Array.isArray(database);
    if(isArray){
    	keys = TRP_CORE.packSequence([],database.length);
    }else{
    	keys = Object.keys(database).sort();
    }
    //sort
    keys = keys.sort((a,b)=>{
    	if(a.includes?.('/h'))return 1;
    	if(b.includes?.('/h'))return -1;
    	return a-b;
    });

	var length = keys.length;
    for(var i = 0; i<length; i=(i+1)|0){
        var key = keys[i];
        if(this._isInvalidFunc?.(key))continue;

        var data = database[key];
        var category;
        if(this._categoryKeyFunc){
        	category = this._categoryKeyFunc(data);
        }else{
        	category = data[this._categoryKey]||null;
        }

        var categoryIdx = categories.indexOf(category);

        allData[categoryIdx].push(data);
        if(isArray){
        	allNames[categoryIdx].push(data);
        }else{
        	allNames[categoryIdx].push(key);
        }
    }
};
DataPicker.prototype.allData = function(){
	return this._allData;
};


/* overwrite setting
===================================*/
DataPicker.prototype.maxItems = function(){
	return this._list.length;
};
DataPicker.prototype.maxColumns = function(){
	return DataPicker.MAX_COL;
};
DataPicker.prototype.itemHeight = function(){
	return DataPicker.ROW_HEIGHT;
};
DataPicker.prototype.itemWidth = function(){
	return $gameSystem.isJapanese() ? DataPicker.COL_WIDTH : DataPicker.COL_WIDTH_ENG;
};
DataPicker.prototype.itemMarginX = function(){
	return DataPicker.MARGIN;
};
DataPicker.prototype.itemMarginY = function(){
	return 0;
};
DataPicker.prototype.guideTexts = function(){
	var guide = [
		'↑↓キー、マウスホイールでスクロール',
		'←→キー、カテゴリー切り替え',
		'決定キー、リスト外クリックで選択終了'
	];
	if(this.isHandled('tryDeleteData')){
		guide.push(ctrlKey+'+Backspace：データ削除');
	}
	return guide;
};
DataPicker.prototype.headerText = function(){
	var category = this._categories[this._categoryIndex];
	var name = this._categoryNames?.[category]||category;
	return '【'+name+'】';
};
DataPicker.prototype.categoryType = function(){
	return this._categoryIndex;
};
DataPicker.prototype.maxCategories = function(){
	return this._categories.length;
};
DataPicker.prototype.isCategoryValid = function(index){
	return index===0 || (this._allData[index]&&this._allData[index].length>0);
}
DataPicker.prototype.isSeveralModeValid = function(){return false};

DataPicker.prototype.applyData = function(){
	var index = this._selectingIndexes[0];
	var data = this._list[index];
	if(!data)return;

	var name = this._names[index];
	if(!this.callHandler('applyData',name)){
		this.setDataValue();
	}
};
DataPicker.prototype.setDataValue = function(){
	var index = this._selectingIndexes[0];
	var data = this._list[index];
	var name = this._names[index];
	if(this._data && data){
		this._data[this._key] = name;
	}
};

DataPicker.prototype.didEndPicking = function(cancel=false){
	if(cancel && this._data){
		this._data[this._key] = this._originalValue;
	}
	var index = this._selectingIndexes[0];
	var name = this._names[index];
	this.callHandler('finiteData',name,cancel,this);
};


/* refresh
===================================*/
DataPicker.prototype.setListType = function(type){
	PickerBase.prototype.setListType.call(this,type);

	var names = this._allNames[this._categoryIndex];
	var list = this.allData()[this._categoryIndex];
	if(this._filterMode && this._filterFunc){
		names = names.concat();
		list = list.concat();
		var length = names.length;
	    for(var i=length-1; i>=0; i=(i-1)|0){
	        var data = list[i];
	        if(!data)continue
        	var mode = this._filterFunc(data);
        	if(this._filterMode!==mode){
        		list.splice(i,1);
        		names.splice(i,1);
	        }
	    }
	}

	this._names = names;
	this._list = list;
};

DataPicker.prototype.refreshItems = function(){
	var width = this.itemWidth();
	var lineHeight = this.itemHeight();
	var list = this._list;
	var length = list.length;
	var height = lineHeight * length;

	var bitmap = this._contentsSprite.bitmap;
	bitmap.clear();

	var margin = 5;
	var names = this._names;
	var length = list.length;
	var hasComment = this._commentFunc || list.some(d=>d&&d.comment);
    for(var i = 0; i<length; i=(i+1)|0){
        var data = list[i];
        var name = names[i];
        var x = margin;
        var y = i*lineHeight;

        var elemWidth = hasComment ? 100 : width;
        bitmap.fontSize = lineHeight-3;

        //name
        if(this._nameForKeyFunc){
        	name = this._nameForKeyFunc(key,data);
        }
        bitmap.drawText(name,x,y,elemWidth,lineHeight);
        x += elemWidth + margin;

        //comment(target)
        var text;
        if(this._commentFunc){
        	text = this._commentFunc(key,data);
        }else{
        	text = data.comment||null;
        }
        if(text){
        	bitmap.drawText(text,x,y,width-x,lineHeight);
        }
    }
};

/* start picking
===================================*/
DataPicker.prototype.startPicking = function(key,data){
	this._categoryIndex = 0;

	this._key = key;
	this._data = data;
	this._originalValue = JsonEx.makeDeepCopy(data[key]);

	this.deselectAll();

	PickerBase.prototype.startPicking.call(this);
};



/* search
===================================*/
DataPicker.prototype.search = function(chara){
	var names = this._names;
	var length = names.length;
    for(var i = 0; i<length; i=(i+1)|0){
        var name = names[i];
        if(name[0] === chara){
        	this.didSuccessSearch(i);
        	return;
        }
    }
    for(var i = 0; i<length; i=(i+1)|0){
        var name = names[i];
        if(name[0].toLowerCase() === chara){
        	this.didSuccessSearch(i);
        	return;
        }
    }
};

/* filter
===================================*/
DataPicker.prototype.onKeyDown = function(event){
	if(event.ctrlKey||event.metaKey){
		if(event.key==='Backspace'){
			this.tryDeleteData();
		}else if(event.key==='f'){
			this.changeFilterMode();
		}else{
			PickerBase.prototype.onKeyDown.call(this,event);
		}
	}else{
		PickerBase.prototype.onKeyDown.call(this,event);
	}
};
PickerBase.prototype.tryDeleteData = function(){
	var index = this._selectingIndexes[0];
	var name = this._names[index];
	if(!name)return;

	if(this._data){
		this._data[this._key] = this._originalValue;
	}
	if(this.callHandler('tryDeleteData',name)){
		this.createAllData();
		this._listType = null;
		this.refresh();	
	}else{
		this._data[this._key] = name;
	}
};
PickerBase.prototype.changeFilterMode = function(){
	var header;
	if(this._filterMode==='set'){
		this._filterMode = 'play';
		header = '《フィルター=play用》';
	}else if(this._filterMode==='play'){
		this._filterMode = '';
		header = '《フィルター=なし》';
	}else{
		this._filterMode = 'set';
		header = '《フィルター=set用》';

	}

	this._listType = -1;
	SoundManager.playCursor();

	this.refreshCategory();
	this.showHeaderSprite(header,'rgb(0,150,0)');
};


/* input
===================================*/
DataPicker.prototype.processInput = function(){
	if(Input.isRepeated('down')){
		this.selectNext();
	}else if(Input.isRepeated('up')){
		this.selectPrevious();
	}else{
		PickerBase.prototype.processInput.call(this);
	}
};
DataPicker.prototype.selectNext = function(){
	var index = this._selectingIndexes.length ? this._selectingIndexes[0] : -1;
	index += 1;
	if(index>=this.maxItems()){
		SoundManager.playBuzzer();
		return;
	}
	this.didPickData(index);
	if(index > this._topRow+this._dispRows){
		this.setTopRowPrevious();
	}
};
DataPicker.prototype.selectPrevious = function(){
	var index = this._selectingIndexes.length ? this._selectingIndexes[0] : this.maxItems();
	index -= 1;
	if(index<0){
		SoundManager.playBuzzer();
		return;
	}
	this.didPickData(index);
	if(index < this._topRow){
		this.setTopRowNext();
	}
};












})();