//=============================================================================
// TRP_WeatherEditor
//=============================================================================
// Weather_Editor
// MODE: Main
// MODE: Elem

// Param Editor

// EFFECT -> particle 
// EFFECT -> particleGroup
// EFFECT -> weather
// EFFECT -> TRP_Filter
// EFFECT -> TRP_FogTexture
// EFFECT -> BGS
// EFFECT -> tint
// EFFECT -> defWeather
// EFFECT -> mapObject
// EFFECT -> command


//=============================================================================
/*:
 * @author Thirop
 * @plugindesc 天候プラグインの開発用エディタ
 * @base TRP_CORE
 * @base TRP_Weather
 * @orderAfter TRP_Weather
 *
 * @help
 * 【更新履歴】
 * 1.52 2025/05/03 変更:フォグ/フィルタエディタをEscで終了するよう変更
 *                 追加:天候の全要素を新規天候に分離する機能
 * 1.51 2025/05/01 修正:段階変更でフォグ表示が反映されない不具合
 * 1.50 2025/04/02 初版
 *
 *
 *
 *
 */







(function(){
if(!Utils.isNwjs() || !Utils.isOptionValid('test'))return;

var $trpWeathers = window["$trpWeathers"];

var _Dev = TRP_CORE.DevFuncs;
var isMac = navigator.userAgent.contains('Macintosh');
var ctrlKey = isMac ? 'Cmd' : 'Ctrl';
var optKey = isMac ? 'Opt' : 'Alt';

var EFFECTS = TRP_Weathers.EFFECTS;

TRP_Weathers.prototype.commandEdit = function(id){
	TRP_Weathers.tryCreateNewData(id);
	this.commandSet(...arguments);
	Editor.start(id);
};

var _TRP_Weathers_set = TRP_Weathers.prototype.set;
TRP_Weathers.prototype.set = function(id,...args){
	if(!$dataTrpWeathers[id]){
		this.commandEdit(id,...args)
		return;
	}
	_TRP_Weathers_set.call(this,...arguments);
};

TRP_Weathers.tryCreateNewData = function(id){
	if(!$dataTrpWeathers[id]){
		$dataTrpWeathers[id] = {
			value:10,
			speed:10,
			ignoreMiddle:false,
			tag:"",
			elems:[],
		}
	}
}

var _TRP_Weather_setSrcValue = TRP_Weather.prototype.setSrcValue;
TRP_Weather.prototype.setSrcValue = function(value,duration,easing){
	if(this._id===Editor._id){
		this.setValue(...arguments);
	}else{
		_TRP_Weather_setSrcValue.call(this,...arguments);
	}
};

//for testplay
TRP_Weathers.edit = TRP_Weathers.prototype.edit = function(id,weathers){
	TRP_Weathers.Editor.start(id,weathers);
};

//=============================================================================
// Editor
//=============================================================================
var Editor = TRP_Weathers.Editor = function Editor(){
	this.initialize.apply(this, arguments);
};

Editor.clear = function(){
	this.ui = null;
	this._id = null;
	this._mode = null;
	this._modeStack = [];
	this._playerMoveByInput = null;
	this._sceneUpdate = null;
	this._keyDownListener = null;
	this._keyUpListener = null;
	this._mouseDownListener = null;
	this._mouseUpListener = null;
	this._pasteListener = null;

	this._picker = null;
	this._valuePointerSprite = null;
};

Editor.start = function(id,weathers=window["$trpWeathers"]){
	if(this._mode)return;
	$trpWeathers = weathers;
	if(!id){
		//noId -> most bigger weather in active
		id = $trpWeathers._keys.reduce((a,b)=>{
			if(!a)return b;
			var va = $trpWeathers._data[a]._value;
			var vb = $trpWeathers._data[b]._value;
			if(va>=vb)return a;
			else return b;
		},null)
		if(!id){
			id = prompt('編集する天候IDを指定','test');
			if(id){
				TRP_Weathers.tryCreateNewData(id);
				$trpWeathers.commandSet(id,10,0);
			}
		}
	}
	if(!id || !$dataTrpWeathers[id]){
		SoundManager.playBuzzer();
		return;
	}

	this.setWeatherRegionsNone();

	Editor.clear();
	this._lastSavedData = JsonEx.stringify($dataTrpWeathers);

	this.setWeatherData(id);


	/* scene setting
	===================================*/
	var scene = SceneManager._scene;
	this._sceneUpdate = scene.update;

	if(SceneManager._scene._menuButton){
		SceneManager._scene._menuButton.visible = false;
	}

	SceneManager._scene.update = ()=>{
		this.update();
	};

	/* register listners
	===================================*/
	this._keyDownListener = this.onKeyDown.bind(this);
	this._keyUpListener = (event=>{
		if(event.key==='Alt'){
			this.onKeyAlt = false;
		}else if(event.key==='Meta'){
			this.onKeyMeta = false;
		}else if(event.key==='Control'){
			this.onKeyControl = false;
			if(this.showingObjOutline){
				this.removeObjectsOutline();
			}
		}
	});
	this._mouseDownListener = this.onMouseDown.bind(this);
	this._mouseUpListener = this.onMouseUp.bind(this);
	this._pasteListener = this.pasteData.bind(this);
	document.addEventListener('keydown',this._keyDownListener);
	document.addEventListener('keyup',this._keyUpListener);
	document.addEventListener('mousedown',this._mouseDownListener);
	document.addEventListener('mouseup',this._mouseUpListener);
	document.addEventListener('paste',this._pasteListener);

	this._clearSceneFade();

	/* baseUI
	===================================*/
	this.ui = new PIXI.Container();
	SceneManager._scene.addChild(this.ui);
	this.setupBaseUI();

	/* start mode
	===================================*/
	this.setMode('main',{
		id,
		data:this._data,
		lastEditingIdx:6,
	});
};
Editor.end = function(){
	this.setWeatherRegionsNone(true);
	this.hideParamEditor();

	// SceneManager._scene.isMenuEnabled = this._sceneIsMenuEnabled;
	// this._sceneIsMenuEnabled = null;
	SceneManager._scene.update = this._sceneUpdate;
	this._sceneUpdate = null;

	// $gameMap.updateInterpreter = this._updateInterpreter;
	// this._updateInterpreter = null;
	// Game_Event.prototype.updateParallel = this._updateParallel;
	// this._updateParallel = null;

	if(SceneManager._scene._menuButton){
		SceneManager._scene._menuButton.visible = true;
	}

	this.ui.parent.removeChild(this.ui);
	this.uid = null;


	document.removeEventListener('keydown',this._keyDownListener);
	document.removeEventListener('keyup',this._keyUpListener);
	document.removeEventListener('mousedown',this._mouseDownListener);
	document.removeEventListener('mouseup',this._mouseUpListener);
	document.removeEventListener('paste',this._pasteListener);

	this.clear();
	_Dev.showText('modeGuide',null);
	_Dev.showText('elemExGuide',null);
};

Editor._weatherRegions = {};
Editor.setWeatherRegionsNone = function(restore=false){
	for(var key of $trpWeathers._keys){
		var weather = $trpWeathers._data[key];
		if(restore){
			weather._region = Editor._weatherRegions[key]||weather._region||null;
			Editor._weatherRegions[key] = null;
		}else{
			Editor._weatherRegions[key] = weather._region;
			weather._region = null;
		}
	};
};


Editor._hidingTexts = null;
Editor.hideTextsTemporally = function(){
	this._hidingTexts = _Dev.saveAndHideTexts();
};
Editor.showTemporallyHiddenTexts = function(){
	_Dev.hideTextsAll();
	_Dev.restoreTexts(Editor._hidingTexts);
	Editor._hidingTexts = null;
};

Editor._clearSceneFade = function(){
	var scene = SceneManager._scene;
	scene._fadeDuration = 0;
	scene._fadeOpacity = 0;
	if(scene.updateColorFilter){
		scene.updateColorFilter();
	}
};

Editor.supplyUndefinedParams = function(data){
	for(const elem of data.elems){
		var effect = EFFECTS[elem.type];
		if(effect.typeParams){
			for(const tp of effect.typeParams){
				if(elem.typeParams[tp.key]===undefined){
					elem.typeParams[tp.key] = tp.default;
				}
			}
		}
		if(effect.supplyValueParams){
			effect.supplyValueParams(elem);
		}else{
			var effectValueParams = this.effectValueParams(effect,elem);
			if(effectValueParams){
				for(const valueData of elem.values){
					if(!valueData.params)continue;
					for(const vp of effectValueParams){
						if(valueData.params[vp.key]===undefined){
							if(vp.defaultValue){
								valueData.params[vp.key] = vp.defaultValue(elem.typeParams);
							}else if(vp.v1){
								valueData.params[vp.key] = vp.v0+(vp.v1-vp.v0)*valueData.value/10;
							}else{
								valueData.params[vp.key] = vp.v0;
							}
						}
					}
				}
			}
		}
	}
};
Editor.effectValueParams = function(effect,elem,type){
	if(effect.valueParamKey){
		if(!type){
			if(!elem){
				//use default type
				type = effect.typeParams.find(tp=>tp.key===effect.valueParamKey).default;
			}else{
				type = elem.typeParams[effect.valueParamKey]
			}
		}
		return effect.valueParamsForType[type]||[];
	}else{
		return effect.valueParams;
	}	
};

//=============================================================================
// Editor: BaseUI
//=============================================================================
Editor.setupBaseUI = function(){
	var ui = new PIXI.Container();
	SceneManager._scene.addChild(ui);
	this.ui.addChild(ui);
};

Editor.testBitmap = new Bitmap(1,1);
Editor.textSprite = function(text,fontSize,color='white',outlineWidth=5,outlineColor='black'){
	var m = outlineWidth;
	var w = Editor.testBitmap.measureTextWidth(text);
	var h = fontSize;

	var bitmap = new Bitmap(w+2*m,h+2*m);
	bitmap.fontSize = fontSize;
	bitmap.textColor = color;
	bitmap.outlineWidth = outlineWidth;
	bitmap.outlineColor = outlineColor;
	bitmap.drawText(text,m,m,w,h);

	var sprite = new Sprite(bitmap);
	return sprite;
};


//=============================================================================
// Mode / Update
//=============================================================================
Editor.popMode = function(){
	var lastMode = this._mode;
	if(lastMode){
		this.endMode();
	}

	var next = this._modeStack.pop();
	this.setMode(next.mode,next);
};

Editor.setMode = function(mode,modeData=null,force=false){
	if(this._mode === mode && !force)return;
	Input.clear();

	_Dev.showText('modeGuide',' ');

	var lastMode = this._mode;
	var lastModeData = this.modeData;
	if(lastMode){
		this.endMode();
		lastModeData = lastModeData||{};
		lastModeData.mode = lastMode;
		lastModeData.lastEditingIdx = -1;
		if(this.paramEditor){
			lastModeData.lastEditingIdx = this.paramEditor._editingIndex;
		}
	}

	modeData = modeData||{};
	modeData.mode = mode;

	this.modeData = modeData;
	this.modeUICache = {};
	this.cantShowMenu = false;
	this.cantScroll = false;

	this.showParamEditor(mode,modeData);


	if(![null].contains(lastMode) && lastMode!==mode)
	{
		this._modeStack.push(lastModeData);
	}
	if([].contains(mode)){
		this.cantShowMenu = true;
	}

	this._mode = mode;

	var setModeFunc = 'setMode'+TRP_CORE.capitalize(mode);
	if(this[setModeFunc]){
		this[setModeFunc](modeData);
	}

	//refreshGuideText
	var refreshGuide = 'refreshGuide'+TRP_CORE.capitalize(mode);
	if(this[refreshGuide]){
		this[refreshGuide]();
	}else{
		var guide = this.modeGuide(mode);
		_Dev.showText('modeGuide',guide);
	}
};

Editor.endMode = function(){
	if(!this._mode)return;
	var endHandler = 'endMode'+TRP_CORE.capitalize(this._mode);
	if(this[endHandler]){
		this[endHandler]();
	}
	this._mode = null;
	this.hideParamEditor();
};


Editor.restoreMode = function(noSaveState=false){
	var mode = this._modeStack.pop();
	if(!mode)return;

	this.endMode();
	this.setMode(mode);

	if(!noSaveState){
		this.saveState('モード終了');
	}
};

Editor.modeGuide = function(mode=this._mode){
	var command = 'modeGuide'+TRP_CORE.capitalize(mode);
	if(this[command])return this[command]();
	return null;
};

Editor.refreshAlert = function(){
	if(!this.paramEditor)return;
	var effect = this.elemEffect();
	if(!effect)return;

	var alert = effect.alertGuide?.()||null;
	this.paramEditor.showAlert(alert);
};




Editor.onKeyControl = false;
Editor.onKeyMeta = false;
Editor.onKeyAlt = false;
Editor.onKeyDown = function(event){
	if(this._picker){
		this._picker.onKeyDown?.(event.keyCode,event);
		return;
	}

	if(event.key==='Alt'){
		this.onKeyAlt = true;
	}else if(event.key==='Meta'){
		this.onKeyMeta = true;
	}else if(event.key==='Control'){
		this.onKeyControl = true;
	}
	if(!event.ctrlKey){
		this.onKeyControl = false;
	}

	if(_Dev.showingToolsWindow)return false;


	var exUIActive = false;
	if(this.paramEditor){
		if(this.paramEditor.active){
			if(this.onKeyDownParamEditor(event))return;
		}
	}

	if(this.onKeyAlt)return;

	if(!exUIActive){
		if(event.metaKey || event.ctrlKey){
			if(event.key === 's'){
				if(this.isSaveEnabled()){
					this.processSave(event.shiftKey);
				}else{
					SoundManager.playBuzzer();
				}
				return true;	
			}
		}
	}

	var command =  this._mode ? 'onKeyDown'+TRP_CORE.capitalize(this._mode) : null;
	if(command && this[command]){
		this[command](event);
		return true;
	}
};

Editor.isSaveEnabled = function(){
	if(this._picker)return false;

	switch(this._mode){
	default: 
		return true;
	}
};

Editor.processSave = function(onlyCheck=false){
	var data = this._data;
	var modified = this.modifiedDataForSave(data);

	$dataTrpWeathers[this._id] = modified;
	

	var strData = JSON.stringify($dataTrpWeathers);
	if(onlyCheck){
		$dataTrpWeathers[this._id] = data;
		return strData!==this._lastSavedData;
	}

	//execute save
	this._lastSavedData = strData;
	SoundManager.playSave();

	var date = new Date();
	var year = (date.getFullYear()%100).padZero(2);
	var month = (date.getMonth()+1).padZero(2);
	var day = date.getDate().padZero(2);
	data.comment = year+month+day;

    var file = JSON.stringify($dataTrpWeathers,null,4);
	_Dev.saveFile(file,TRP_Weathers.DATA_FILE_PATH.replace('../',''));

	$dataTrpWeathers[this._id] = data;
	return true;
};
Editor.modifiedDataForSave = function(data=this._data){
	var modified = JsonEx.makeDeepCopy(data);

	//modify elem data
	for(const elem of modified.elems){
		var effect = EFFECTS[elem.type];
		effect.modifyData?.(elem);
	}
	return modified;
};


Editor.onMouseDown = function(event){
	if(this._picker)return;
	if(_Dev.showingToolsWindow)return;
	if(this.paramEditor && this.paramEditor.active)return;
	
	var tx = Graphics.pageToCanvasX(event.pageX);
    var ty = Graphics.pageToCanvasY(event.pageY);

    var name = null;
    if(event.button===0)name = 'Left';
    else if(event.button===1)name = 'Middle';
    else if(event.button===2)name = 'Right';

	var command =  this._mode ? ('onMouseDown'+name+TRP_CORE.capitalize(this._mode)) : null;
	if(!command || !this[command])return;
	this[command](event,tx,ty);
};
Editor.onMouseUp = function(event){	
	var tx = Graphics.pageToCanvasX(event.pageX);
    var ty = Graphics.pageToCanvasY(event.pageY);

	if(event.button!==0)return;

	var command =  this._mode ? ('onMouseUp'+TRP_CORE.capitalize(this._mode)) : null;
	if(!command || !this[command])return;
	this[command](event,roomId,tx,ty);
};

Editor.tryCallOnMousePress = function(){
	var tx = TouchInput.x;
    var ty = TouchInput.y;

	var command =  this._mode ? 'onMousePress'+TRP_CORE.capitalize(this._mode) : null;
	if(!command || !this[command])return;

	this[command](null,roomId,tx,ty);
}

Editor.updateList = [];

Editor.updateForPreview = function(){
	var scene = SceneManager._scene;
	
	//update game objects
	$gameScreen.update();
	if($gameMap._trpFogTextures){
		$gameMap.updateTrpFogTextures?.();
	}
	$trpWeathers.update();

	if(Editor._data){
		var updated = [];
		for(const elem of Editor._data.elems){
			var effect = TRP_Weathers.EFFECTS[elem.type]
			if(!effect?.editorUpdate)continue;
			if(updated.includes(effect.editorUpdate))continue;
			updated.push(effect.editorUpdate);
			effect.editorUpdate(elem);
		}
	}

	//upate display objects
	scene._particleSystem?.update(scene);
	window.TRP_FilterManager?.update(scene);

	scene._spriteset?.update();
}
Editor.update = function(){
	this.updateForPreview();

	_Dev.updateTexts();
	if(this.paramEditor && this.paramEditor.active){
		this.paramEditor.update();
		return;
	}
	if(this._picker){
		this._picker.update();
		return;
	}

	this.updateWheel();

	/* update input
	===================================*/
	if(Input._latestButton){
		var updateInput =  this._mode ? "updateInput"+TRP_CORE.capitalize(this._mode) : null;
		if(updateInput && this[updateInput] && this[updateInput]()){
			//mode input
		}else if(Input.isTriggered('cancel')){
			if(!this.cantShowMenu){
				this.showMenu();
			}
		}
	}


	/* update main
	===================================*/
	var command = 'update'+TRP_CORE.capitalize(this._mode);
	if(this[command])this[command]();

	/* mouse press
	===================================*/
	if(TouchInput.isPressed()){
		this.tryCallOnMousePress();
	}

	/* main mode update
	===================================*/
	var command =  this._mode ? "update"+TRP_CORE.capitalize(this._mode) : null;
	if(command && this[command]){
		this[command]();
	}

	/* extra registered update objects
	===================================*/
	for(var i=Editor.updateList.length-1; i>=0; i=(i-1)|0){
		Editor.updateList[i].update();
	}
};


Editor.wheelThreshold = 4;
Editor.updateWheel = function(){
	if(this._picker)return;

	var value = TouchInput.wheelY;
	if(!value)return;

	var command = 'onWheelValueChange'+TRP_CORE.capitalize(this._mode);
	if(this[command]){
		this[command](value);
	}

	var idx = Math.floor(value/this.wheelThreshold);
	if(idx){
		var command = 'onWheelIdxChange'+TRP_CORE.capitalize(this._mode);
		if(this[command]){
			this[command](idx);
		}
	}
};


/* picker
===================================*/
Editor.startPicking = function(picker){
	this.tryDeactivateParamEditor();

	this._picker = picker;
	this.ui.addChild(picker);

	_Dev.debugTextContainer.visible = false;
};
Editor.didEndPicking = function(){
	this._picker.parent.removeChild(this._picker);
	this._picker = null;
	_Dev.debugTextContainer.visible = true;
	this.paramEditor?.activate();

	this.resetElemValue();
};




//=============================================================================
// MODE: Main
//=============================================================================
Editor.modeGuideMain = function(){
	var id = '';
	for(const stack of this._modeStack){
		if(stack.mode!=='main')continue;
		id += stack.id+' → ';
	}
	id += this._id;
	return [
		'【天候ID<%1>】'.format(id),
		ctrlKey+'+s:データを保存',
		ctrlKey+'+w:エディタを終了',
		ctrlKey+'+c/p:天候のコピー&ペースト',
		ctrlKey+'+r:天候のリネーム',
		ctrlKey+'+Shift+e:新規天候に分離',
		ctrlKey+'+Backspace:編集中の天候データ削除'

	];
};

Editor.setModeMain = function(modeData){
	this.setWeatherData(modeData.id)
};
Editor.setWeatherData = function(id){
	this._id = id;
	this._data = $dataTrpWeathers[id];
	this.supplyUndefinedParams(this._data);
};

Editor.endModeMain = function(){

};


Editor.previewValue = 5;
Editor.previewEasing = "linear";
Editor.paramEditorDataMain = function(modeData){
	var params = [];
	var data = modeData.data;
	var elems = data.elems;

	var INT = true;
	var NO_INT = false;
	var NEW_LINE = true;
	var NO_NEW_LINE = false;

	//init previewValue
	var weather = $trpWeathers._data[this._id];
	if(weather){
		this.previewValue = weather.baseValue();
	}else{
		this.previewValue = 5;
	}

	//preview
	params.push(EditorBase.lineParam(
		'previewValue',this,1,INT,false,
		'プレビュー表示する強さの値(1~10)',
		{
			slider:{log:0},
			title:'preview',min:0,max:10,
			fixedWidth:'1.0',
			onValueChange:(key,value,lastValue,innerData)=>{
				Editor.setPreviewValue(value,true);
				// $trpWeathers.set(this._id,Number(value))
			},
			list:[0,0.1,1,2,3,4,5,6,7,8,9,10],
			noLoop:true,
		},
	));
	params.push(EditorBase.lineParam(
		'previewEasing',this,1,INT,false,
		'プレビュー表示するイージング',
		{
			title:'previewEasing',min:0,max:10,
			list:["linear","easeIn","easeOut","easeInOut","cubicIn","cubicOut","cubicInOut","quartIn","quartOut","quartInOut","quintIn","quintOut","quintInOut","sineIn","sineOut","sineInOut","expoIn","expoOut","expoInOut","circIn","circOut","circInOut","bounceOut","backIn","backOut","backInOut","elastic","swingFromTo","swingFrom","swingTo","bounce","bouncePast","easeFromTo","easeFrom","easeTo"],
			type:'string',
		},
	));

	//main params
	params.push(EditorBase.lineParam(
		'value',data,1,INT,NEW_LINE,
		'強さ指定なし時のデフォルトのvalue(1~10)',
		{title:'value(デフォ値)',min:1,max:10},
	));
	params.push(EditorBase.lineParam(
		'ignoreMiddle',data,true,NO_INT,false,
		['false:段階設定ずつ変化。中間段階も反映','true:中間段階を無視して1回で変化'],
		{type:'switch',onValueChange:(key,value,lastValue)=>{
			if($trpWeathers._data[this._id]){
				$trpWeathers._data[this._id].smoothValue = value;
			}
		}}
	));
	params.push(EditorBase.lineParam(
		'speed',data,1,INT,false,
		'1段階分の変化にかかるデフォルトのフレーム数',
		{min:0,onValueChange:(key,value,lastValue)=>{
			if($trpWeathers._data[this._id]){
				$trpWeathers._data[this._id]._speed = value;
			}
		}}
	));
	params.push(EditorBase.lineParam(
		'tag',data,1,INT,false,
		['データリスト表示の整理用',
			'タグを使用したデータは自動カテゴリ分類から除外されます',
			'place:固有の場所のエフェクトまとめなど',
			'core:組み合わせてよく使うものなど',
			'effect:イベントシーンの汎用エフェクトなど',
		],{
			type:'string',
			list:['','place','core','effect'],
			placeholder:'─',
		}
	));

	//elems
	var idx = 0;
	var newLine = true;
	for(const elem of elems){
		var effect = TRP_Weathers.EFFECTS[elem.type];
		var summary = effect.editorLineSummary(elem);
		params.push(EditorBase.lineParam(
			('elem:'+idx),elem,0,NO_INT,newLine,
			[//help
				ctrlKey+'+D:要素を無効化/有効化',
				ctrlKey+'+[]:要素の順番入れ替え'
			],{
				title:idx+': '+summary,
				type:'string',
				value:'編集',
				disabled:elem.disabled,
				button:(key)=>{
					var idx = Number(key.replace('elem:',''));
					this.startEditingElem(idx)
				},
				onKeyDown:(event,parts,elem)=>{
					if(event.metaKey||event.ctrlKey){
						if(event.key==='d'){
							SoundManager.playCursor();

							var idx = Number(parts._title.split(':')[0])
							var weather = $trpWeathers._data[Editor._id];
							if(weather){
								var elemData = weather.data().elems[idx];
								weather.clear(0);
								setTimeout(()=>{
									$trpWeathers.set(Editor._id,Editor.previewValue);
								},16)
							}
							elem.disabled = !elem.disabled;
							parts.setDisabled(elem.disabled);
						}else if(event.key==='['){
							this.tryChangeElemOrder(elem,parts,-1);
						}else if(event.key===']'){
							this.tryChangeElemOrder(elem,parts,1);
						}
					}
					return false;
				},
				tryDelete:(key)=>{
					var idx = Number(key.replace('elem:',''));
					var elem = elems[idx];
					var effect = TRP_Weathers.EFFECTS[elem.type];
					var summary = effect.editorLineSummary(elem);
					if(!confirm('要素:'+idx+'を削除しますか？\n'+summary))return;

					$trpWeathers.clear(Editor._id,0);

					elems.splice(idx,1);
					this.resetModeMain();
				},
			}
		));
		newLine = false;
		idx++;
	}
	params.push(EditorBase.lineParam(
		('elem:'+idx),null,0,NO_INT,false,
		null,
		{
			title:'要素の追加',
			noValue:true,
			value:'＋',
			button:()=>{
				this.addNewElem();
			}
		}
	));
	return params;
};


Editor.updateInputMain = function(){
	return true;
};
Editor.onKeyDownMain = function(event){
	if(event.key==='Escape'){
		if(this._modeStack.length){
			Editor.popMode();
		}
	}else if(event.ctrlKey||event.metaKey){
		if(!isNaN(event.key)){
			//number -> set preview value
			if(event.shiftKey){
				if(event.key==='1')this.setPreviewValue(0.1);
				else if(event.key==='0')this.setPreviewValue(10);
				else return true;
			}else{
				this.setPreviewValue(Number(event.key));
			}
		}else if(event.key==='Backspace'){
			this.tryDeleteData(this._id);
		}else if(event.key==='w'){
			if(this.processSave(true)){
				if(confirm('編集中のデータを保存しますか？)')){
					this.processSave();
				}
			}
			this.end();
		}else if(event.key==='c'){
			this.copyData();
		}else if(event.key==='r'){
			this.renameData();
		}else if(event.code==='KeyE'){
			if(event.shiftKey){
				this.startEditInnerWeatherWhole();
			}
		}else{
			return false;
		}
	}else{
		return false;
	}
	return true;
};


/* delete
===================================*/
Editor.tryDeleteData = function(id){
	if(!id)return false;

	var text = (id===this._id) ? '現在編集中の' : '';
	text += '天候データ「%1」を削除しますか？'.format(id);
	if(!confirm(text)){
		SoundManager.playCancel();
		return false;
	}
	if(id!==this._id){
		$trpWeathers.clear(id,0);
	}

	var data = $dataTrpWeathers[id];
	delete $dataTrpWeathers[id];
	this.processSave();
	_Dev.showTempAlert('天候データ「%1」を削除しました。'.format(id));

	if(id===this._id){
		$dataTrpWeathers[id] = data;
	}
	return true;
};


/* add and edit elem
===================================*/
Editor.addNewElem = async function(type=null){
	if(!type){
		var names = [];
		var symbols = [];
		for(const key in TRP_Weathers.EFFECTS){
			var effect = TRP_Weathers.EFFECTS[key];
			if(!effect || effect.invalid)continue;

			var name = effect.typeName;
			if(effect.key){
				name += '<'+effect.key+'>';
			}
			names.push(name);
			symbols.push(key);
		}
		type = await _Dev.showToolsWindowWithSymbolsAsync(
			symbols,names,'selectElemType',{
				fontSize:22,
				lineHeight:30,
			}
		);
		if(!type){
			SoundManager.playCancel();
			return;
		}
	}

	var elem = this.createNewElem(type);
	this._data.elems.push(elem);

	var idx = this._data.elems.indexOf(elem)
	$trpWeathers._data[this._id]?.addElem(elem);

	this.startEditingElem(idx);
};
Editor.createNewElem = function(type){
	if(!type)return null;
	var effect = TRP_Weathers.EFFECTS[type];
	var typeParams = {};
	var values = [];
	for(const tp of effect.typeParams){
		typeParams[tp.key] = tp.default;
	}
	for(var i=0; i<2; i=(i+1)|0){
		values.push(this.valueParams(effect,i));
	}
	return {type,disabled:false,typeParams,values};
};
Editor.resetValueParamsForType = function(typeValue){
	var elem = this.editingElem();
	if(!elem)return;

	var effect = this.elemEffect();
	var values = elem.values;
	values.length = 0;
	for(var i=0; i<2; i=(i+1)|0){
		values.push(this.valueParams(effect,i,typeValue));
	}
	Editor.modeData.editingValueIdx = 1;
};

Editor.valueParams = function(effect,idx=0,typeValue){
	if(effect!==EFFECTS.particleGroup){
		return this._valueParams(effect,idx,typeValue);
	}
	//particleGroup => supply at setupModeData
	return {
		value:idx===0 ? 0 : 10,
		on:true,
		params:undefined,
	};
};

Editor._valueParams = function(effect,idx=0,typeValue){
	var vParams = {};
	var effectValueParams = this.effectValueParams(effect,null,typeValue);
	for(const v of effectValueParams){
		if(v.defaultValue){
			vParams[v.key] = v.defaultValue(idx);
		}else if(v['v'+idx]!==undefined){
			vParams[v.key] = v['v'+idx];
		}else{
			vParams[v.key] = v.v0;
		}
	}
	return {
		value:idx===0 ? 0 : 10,
		on:true,
		params:vParams
	};
};

Editor.tryChangeElemOrder = function(elem,parts,value=1){
	var elems = this._data.elems;
	var srcIdx = elems.indexOf(elem);
	var dstIdx = srcIdx + value;
	if(dstIdx<0 || dstIdx>elems.length-1){
		return;
	}

	var preview = Editor.previewValue;
	$trpWeathers.clear(Editor._id,0,0);

	elems.splice(srcIdx,1);
	elems.splice(dstIdx,0,elem);


	var paramIdx = this.paramEditor._parts.indexOf(parts);
	this.paramEditor.startEditing(paramIdx+value);

	this.resetModeMain(preview);
};

Editor.resetModeMain = function(preview=this.previewValue){
	$trpWeathers.clear(Editor._id,0,0);

	Editor.setMode('main',this.modeData,true);
	setTimeout(()=>{
		Editor.setPreviewValue(preview);
	},);
};

Editor.resetModeElem = function(){
	Editor.clearElem();
	Editor.resetElemValue();
	Editor.setMode('elem',this.modeData,true);
};

/* copy & paste
===================================*/
Editor.copyData = function(){
	var copyData = {
		"__id__":this._id,
	};

	//check child weathers
	var nexts = [this._id];
	var text = '天候データ「%1」をコピーしました。'.format(this._id);
	var space = 0;
	while(nexts.length){
		var currents = nexts;
		nexts = [];
		space += 1;
		for(const id of currents){
			var data = $dataTrpWeathers[id];
			if(!data)continue;

			copyData[id] = this.modifiedDataForSave(data);

			if(id!==this._id){
				text+='\n';
				for(var i=0; i<space; i=(i+1)|0){
					text += ' ';
				}
				text+='└'+id;
			}


			for(const elem of data.elems){
				if(elem.type!=='weather')continue;
				var childId = elem.typeParams.configName;
				if(copyData[childId])continue;
				nexts.push(childId);
			}
		}
	}

	_Dev.copyToClipboard(JSON.stringify(copyData,null,4));
	SoundManager.playSave();

	alert(text);
};


Editor.pasteData = function(e){
	if(this._mode!=='main')return;

	e.preventDefault();
    var clipboardData = e.clipboardData;
    if(!clipboardData){
    	SoundManager.playBuzzer();
    	return;
    }

    var text = clipboardData.getData("text/plain");    
    
    try{
    	var copyData = JSON.parse(text);
    	var rootId = copyData["__id__"];
    	if(!rootId)throw new Error();

    	//check data
    	var needsRenameList = [];
    	var addingNameList = [];

    	var keys = Object.keys(copyData);
    	var allData = [];
		for(const key of keys){
			if(key==='__id__')continue;
			var data = copyData[key];

			//check data
			var assertionError = this.assertDataValue(data);
			if(assertionError){
				throw new Error(assertionError);
			}

			//prepare for next process
			allData.push(data);
			if(key===rootId)continue;
			
			if($dataTrpWeathers[key]){
				needsRenameList.push(key);
			}else{
				addingNameList.push(key);
			}
		}
		if(!confirm('クリップボードの天候データ「%1」で上書きしますか？'.format(rootId))){
	    	SoundManager.playCancel();
	    	return;
	    }

	    //rename
		for(const key of needsRenameList){
			var newName = prompt('ペーストする入れ子の天候名の名前がすでに存在するのでリネームが必要です。',key);
			var renamed = false;
			do{
				if(!newName){
					SoundManager.playCancel();
					return;
				}
				if($dataTrpWeathers[newName] || addingNameList.includes(newName)){
					newName = prompt('すでに存在するか、ほかに追加予定の天候名です',key);
				}else{
					addingNameList.push(newName);
					copyData[newName] = copyData[key];
					delete copyData[newName];

					//rename all weather elems
					for(const weather of allData){
						for(const elem of weather.elems){
							if(elem.type!=='weather')continue;
							if(elem.typeParams.configName===key){
								elem.typeParams.configName = newName;
							}
						}
					}

					renamed = true;
				}
			}while(!renamed);
		}

		/* exec paste
		===================================*/
		var keys = Object.keys(copyData);
		for(const key of keys){
			if(key==='__id__')continue;
			var data = copyData[key];

			if(key===rootId){
				$dataTrpWeathers[this._id] = data;
				this._data = data;
				this.supplyUndefinedParams(this._data);
				this.modeData.data = data;
			}else{
				//child weathers
				$dataTrpWeathers[key] = data;
			}
		}

		SoundManager.playLoad();
		this.resetModeMain();
    }catch(err){
    	alert('不正なデータ形式です。\n'+err.message+'\n'+text);
    }
};

Editor.DATA_ASSERTION_LIST = [
	["value","number"],
	["speed","number"],
	["tag","string"],
	["elems","array",[
		["type","string"],
		["disabled","boolean"],
		["typeParams","object"],
		["values","array",[
			["value","number"],
			["on","boolean"],
			["params","object"]
		]]
	]],
];
Editor.assertDataValue = function(obj,assertionList=Editor.DATA_ASSERTION_LIST){
	for(const assertion of assertionList){
		var [key,type,childAssertionList] = assertion;
		var value = obj[key];
		var typeOfValue = typeof value;
		var errorText = "key:%1,type:%2,valueType:%3".format(key,type,typeOfValue);

		if(typeOfValue==='object'){
			if(type==='array'){
				if(!Array.isArray(value))return errorText;
				if(childAssertionList){
					for(const child of value){
						var childAssertionError = this.assertDataValue(child,childAssertionList);
						if(childAssertionError)return childAssertionError;
					}
				}
			}else{
				if(type!=='object')return errorText;
			}
		}else{
			if(type!==typeOfValue)return errorText;
		}
	}
	return null;
};

/* rename
===================================*/
Editor.renameData = function(){
	var name = prompt('天候名の変更。(※イベントコマンドの天候名は修正が必要なので注意)',this._id);
	if(!name || this._id===name){
		SoundManager.playCancel();
		return;
	}
	if($dataTrpWeathers[name]){
		confirm('既に存在する天候名です。');
		return null;
	}

	//rewrite weather elems
	for(const weather in $dataTrpWeathers){
		for(const elem of weather.elems){
			if(elem.type!=='weather')continue;
			if(elem.typeParams.configName===this._id){
				elem.typeParams.configName = name;
			}
		}
	}

	confirm('天候名を変更しました。\nCtrl+Sで保存時に反映されます。')

	delete $dataTrpWeathers[this._id];
	this._id = name;
	this.modeData.id = name;
	$dataTrpWeathers[name] = this._data;

	this.resetModeMain();
};
Editor.startEditInnerWeatherWhole = function(){
	var elems = this.modeData.data.elems;
	if(!elems.length)return;

	var confirmText = '現在の全要素から新しい天候を作成';
	var isNest = this._id.includes('inner_');
	var id = this._id.replace('inner_','').replace('/h','');
	var inputName = 'inner_'+id;
	if(isNest){
		var nest = this._id.match(/_([0-9]+)$/);
		inputName += '_'+ (Number(nest?.[0])||2); 
	}
	inputName += '/h';

	configName = this.tryCreateNewWeather(confirmText,inputName);
	if(!configName)return;

	$trpWeathers.clear(this._id,0);

	var data = $dataTrpWeathers[configName];
	data.elems.push(...elems);
	elems.length = 0;

	var weatherElem = Editor.createNewElem('weather');
	weatherElem.typeParams.configName = configName;
	elems.push(weatherElem);
	
	$trpWeathers.set(this._id,this.previewValue,0);

	if(!configName)return;
	this.modeData.lastEditingIdx = 5;
	this.resetModeMain();
	SoundManager.playCursor();
};



//=============================================================================
// MODE: Elem
//=============================================================================
Editor.modeGuideElem = function(){
	var guide = [
		'【%1→要素%2<%3>】'.format(this._id,this.modeData.idx,this.modeData.effect.typeName),
		'(Shift+)Tab:次(前)の段階設定へ',
		ctrlKey+'+n/e:段階設定を追加/編集',
		ctrlKey+'+Backspace:段階設定を削除',
		ctrlKey+'+v:段階設定をペースト',
		ctrlKey+'+0-9:プレビュー表示強さ変更',
		ctrlKey+'Shift+1/0: └0.1/10'
	];

	var effect = this.elemEffect();
	if(effect.modeGuide){
		guide.push('');
		if(Array.isArray(effect.modeGuide)){
			guide.push(...effect.modeGuide);
		}else{
			guide.push(effect.modeGuide);
		}
	}

	switch(this.modeData.type){
	case 'weather':
		guide.push('',ctrlKey+'+Shift+E:天候データを編集');
		break;
	default:
		guide.push('',ctrlKey+'+Shift+E:新規天候に分離');
		break;		
	}

	return guide;
};
Editor.startEditingElem = function(idx){
	var elem = this._data.elems[idx];
	if(!elem){
		SoundManager.playBuzzer();
		return;
	}

	var valueData = elem.values[0];
	var effect = TRP_Weathers.EFFECTS[elem.type];
	var modeData = {
		id:this._id,

		idx:idx,
		elem,
		type:elem.type,
		effect,

		solo:false,
		editingValueIdx:0,
		valueParams:valueData.params,

		lastEditingIdx:1,
	};
	effect.setupModeData?.(modeData,elem);


	this.setMode('elem',modeData);

	var idx = this.modeData.elem.values.length-1;
	this.paramEditor._parts
			.find(p=>p&&p._key==='editingValueIdx')
			?.setValue(idx);

	this.refreshAlert();

	// var valueData = TRP_CORE.last(this.modeData.elem.values);
	// this.setPreviewValue(valueData.value);
};

Editor.setModeElem = function(modeData){
	this.setWeatherData(modeData.id)
};

Editor.endModeElem = function(){
	this._valuePointerSprite.visible = false;
	_Dev.showText('elemExGuide',null);

	_Dev.showText('mzCommandError',null);
	_Dev.showText('mzCommandError2',null);
};

Editor.paramEditorDataElem = function(){
	var params = [];
	var data = this._data;
	var modeData = this.modeData;
	var {idx,elem,type,effect} = modeData;

	var INT = true;
	var NO_INT = false;
	var NEW_LINE = true;


	//preview
	params.push(EditorBase.lineParam(
		'previewValue',this,1,INT,false,
		'プレビュー表示する強さの値(1~10)',
		{
			slider:{log:0},
			title:'preview',min:0,max:10,
			fixedWidth:'1.0',
			onValueChange:(key,value,lastValue,innerData)=>{
				this.setPreviewValue(value,true);
			},
			list:[0,0.1,1,2,3,4,5,6,7,8,9,10],
			noLoop:true,
		},
	));

	//typeParams
	var newLine = true;
	for(const tp of effect.typeParams){
		params.push(EditorBase.lineParam(
			tp.key,elem.typeParams,tp.unit,tp.integer||false,newLine,tp.help,
			{
				...tp,
				onValueChange:(key,value,lastValue)=>{
					tp.onValueChange?.(value,lastValue,this._id,idx,elem,effect);

					if(key===effect.valueParamKey){
						//onChangeValueParamType
						Editor.resetValueParamsForType(value);
						Editor.resetModeElem();
						Editor.resetElemValue();
					}
				},
			},
		));
		newLine = false;
	}

	//valueTabParams
	var tabNames = elem.values.map(v=>v.value);

	modeData.tabNames = tabNames;
	params.push(EditorBase.lineParam(
		'editingValueIdx',modeData,1,true,true,
		'設定する段階を選択',
		{
			min:0,max:()=>(this.editingElem()||elem).values.length-1,
			type:'tab',tabNames,
			title:'段階設定',
			onValueChange:(key,value,lastValue,innerData)=>{
				this.setValueIndex(value,elem);
			},
		}
	));

	var editingValue = elem.values[modeData.editingValueIdx];
	params.push(EditorBase.lineParam(
		'on',editingValue,1,true,false,
		'現在の設定値でこの要素のエフェクトをon/off',
		{
			min:0,max:1,
			type:'switch',
			tag:'on',
			onValueChange:(key,value,lastValue,innerData)=>{
				this.resetElemValue();
			}
		}
	));


	/* valueDataParams
	===================================*/
	newLine = true;
	var valueKeyPrefix = effect.valueKeyPrefix?.(modeData,elem)||'';

	var effectValueParams = this.effectValueParams(effect,elem);
	for(const vp of effectValueParams){
		var exSprite = null;
		if(!vp.noExSprite){
			exSprite = new ValueGraphSprite(elem.values,valueKeyPrefix+vp.key,'__');
		}

		var onValueChange = vp.onValueChange;
		params.push(EditorBase.lineParam(
			valueKeyPrefix+vp.key,editingValue.params,vp.unit,vp.integer||false,newLine,vp.help,
			{
				tag:'valueParam',
				...vp,

				keySplitter:'__',
				onValueChange:(key,value,lastValue,innerData)=>{
					onValueChange?.call(effect,key,value,lastValue,innerData);
					this.resetElemValue();
				},
				exSprite,
			},
		));
		newLine = false;
	}


	// if(!editingValue.params){
	// 	this.paramEditorData.disableParams('valueParams',true);
	// }

	return params;
};

Editor.startEditInnerWeather = function(){
	var elem = this.modeData.elem;
	var configName = null;
	switch(elem.type){
	case 'weather':
		configName = elem.typeParams.configName;
		if(!configName){
			configName = this.tryCreateNewWeather();
			if(!configName)return;

			this.editingElem().typeParams.configName = configName;
		}
		break;
	default:
		var confirmText = '編集中の要素<%1>から新しい天候を作成'
				.format(EFFECTS[Editor.editingElem().type].typeName)

		var effect = EFFECTS[elem.type];
		var type = effect?.innerWeatherNameSummay?.(elem) || elem.type;
		var isNest = this._id.indexOf(type+'_')===0;
		var id = this._id.replace(type+'_','').replace('/h','');
		var inputName = type+'_'+id;
		if(isNest){
			var nest = this._id.match(/_([0-9]+)$/);
			inputName += '_'+ (Number(nest?.[0])||2); 
		}
		inputName += '/h';

		configName = this.tryCreateNewWeather(confirmText,inputName);
		if(!configName)return;

		$trpWeathers.clear(this._id,0);

		var data = $dataTrpWeathers[configName];
		data.elems.push(elem);

		var weatherElem = Editor.createNewElem('weather');
		weatherElem.typeParams.configName = configName;
		this.modeData.elem = weatherElem;
		this.modeData.type = 'weather';
		this.modeData.effect = EFFECTS.weather;
		this.modeData.editingValueIdx = 1;
		this.modeData.valueParams = weatherElem.values[1];
		this.modeData.lastEditingIdx = 1;
		
		var idx = this._data.elems.indexOf(elem);
		this._data.elems.splice(idx,1,weatherElem);

		$trpWeathers.set(this._id,this.previewValue,0);
	}

	if(!configName)return;
	this.setMode('main',{
		id:configName,
		data:$dataTrpWeathers[configName],
		lastEditingIdx:6,
	});
	SoundManager.playCursor();
};
Editor.tryCreateNewWeather = function(confirmText,placeholder){
	var configName = prompt('新規天候名を入力'+(confirmText?'\n'+confirmText:''),placeholder);
	if($dataTrpWeathers[configName]){
		confirm('既に存在する天候名です。');
		return null;
	}
	if(!configName)return null;

	TRP_Weathers.tryCreateNewData(configName);
	return configName;
};

Editor.startEditParticle = function(){
	var elem = this.modeData.elem;
	var isGroup = false;
	switch(elem.type){
	case 'particleGroup':
		isGroup = true;
	case 'particle':
		break;
	default:
		return;
	}

	var configName = elem.typeParams.configName;
	if(!configName){
		configName = prompt('新規パーティクル%1設定名を入力'.format(elem.type==='particleGroup'?'グループ':''));
		if(isGroup ? $dataTrpParticleGroups[configName] : $dataTrpParticles[configName]){
			confirm('既に存在する設定名です');
			configName = null;
		}
		if(!configName){
			SoundManager.playCancel();
			return;
		}
	}

	var id = '_weatherEdit:'+configName;
	var target = elem.typeParams.target;
	var editor;
	if(!isGroup){
		$gameScreen._particle.particleEdit(0,id,target,configName);
		editor = SceneManager._scene._particleEditor;
	}else{
		$gameScreen._particle.particleGroupEdit(0,id,target,null,configName);
		editor = SceneManager._scene._particleGroupEditor;
	}

	//clear elem playing particle
	this.resetElemValue(0,0);

	this.ui.visible = false;
	this.paramEditor.visible = false;
	_Dev.debugTextContainer.visible = false;

	var updateForWeatherEdit = SceneManager._scene.update;
	SceneManager._scene.update = ()=>{
		this._sceneUpdate.call(SceneManager._scene);
		if(editor.isTerminated()){
			SceneManager._scene.update = updateForWeatherEdit;
			if(isGroup){
				$gameScreen._particle.particleClear('group:'+id,true);
			}else{
				$gameScreen._particle.particleClear(id,true);
			}
			this.ui.visible = true;
			this.paramEditor.visible = true;
			_Dev.debugTextContainer.visible = true;

			EFFECTS[elem.type].changeConfigName(configName);
			this.resetElemValue(undefined,0);
		}
	};
};

Editor.setValueIndex = function(idx,elem=this.editingElem()){
	var valueData = elem.values[idx];
	// this.paramEditor.setParamsData('valueParam',valueData.params);
	this.paramEditor.setParamsData('valueParam',valueData.params);
	this.paramEditor.setParamsData('on',valueData);

	this.setPreviewValue(valueData.value||0.1);
};
Editor.updateInputElem = function(){
	return true;
};

Editor.onKeyDownElem = function(event){
	if(event.key==='Escape'){
		Editor.popMode();
	}else if(event.key==='Tab'){
		if(event.altKey||event.ctrlKey){
			var effect = this.modeData.effect;
			if(!effect.shiftEditingTarget)return false;
			//shift editingTarget (group:id)
			effect.shiftEditingTarget(event.shiftKey);
			SoundManager.playCursor();
		}else{
			//shift editingValue
			var idx = this.modeData.editingValueIdx + (event.shiftKey?-1:1);
			if(idx<0)idx = this.modeData.elem.values.length-1;
			if(idx>=this.modeData.elem.values.length)idx = 0;

			this.paramEditor._parts
				.find(p=>p&&p._key==='editingValueIdx')
				?.setValue(idx);
			SoundManager.playCursor();
		}
	}else if(event.ctrlKey||event.metaKey){
		if(!isNaN(event.key)){
			if(event.shiftKey){
				if(event.key==='1')this.setPreviewValue(0.1);
				else if(event.key==='0')this.setPreviewValue(10);
				else return true;
			}else{
				this.setPreviewValue(Number(event.key));
			}
		}else if(event.key==='n'){
			this.addNewValue();
		}else if(event.key==='Backspace'){
			this.deleteValue();
		}else if(event.code==='KeyE'){
			if(event.shiftKey){
				this.startEditInnerWeather();
			}else if(event.altKey){
				this.startEditParticle();
			}else{
				this.editValue();
			}
		}else if(event.key==='l'){
			this.tryShowDataList();
		}else if(event.key==='p'){
			this.tryShowPresetList();
		}else if(event.key==='v'){
			this.tryPasteElemValue();
		}else if(event.key==='w'){
			this.popMode();
		}else{
			return false;
		}
	}else{
		return false;
	}
	return true;
}

Editor.addNewValue = function(){	
	var value = prompt('追加する段階設定のvalueを入力してください。(0~10の整数)');
	if(!value)return;

	value = Number(value);
	if(isNaN(value) || value<0 || value>10){
		_Dev.showTempAlert('0~10の数値を入力してください');
		SoundManager.playBuzzer();
		return 
	}

	var {elem} = this.modeData;
	if(elem.values.find(v=>v&&v.value===value)){
		_Dev.showTempAlert('value:'+value+'の段階設定はすでに存在しています');
		SoundManager.playBuzzer();
		return;
	}

	SoundManager.playOk();

	var params = TRP_Weather.paramsForValue(value,elem);
	delete params.keys
	var valueData = {
		value,
		on:true,
		params
	};
	var idx = 0;
	var length = elem.values.length;
	for(var i=0; i<length; i=(i+1)|0){
		if(value>elem.values[i].value){
			idx = i+1;
		}else{
			break;
		}
	}

	elem.values.splice(idx,0,valueData);
	this.modeData.tabNames.splice(idx,0,value);
	this.modeData.editingValueIdx = -1;
	this.paramEditor._parts.forEach(p=>{
		if(!p)return;
		if(p._key==='editingValueIdx'){
			p.setValue(idx);
			p.refreshParts();
			this.updateValuePointerSprite();
		}
	});
};
Editor.editValue = function(){
	var value = prompt('現在の段階設定の変更後のvalueを入力してください。(0~10の整数)');
	if(!value)return;

	value = Number(value);
	if(isNaN(value) || value<0 || value>10){
		_Dev.showTempAlert('0~10の数値を入力してください');
		SoundManager.playBuzzer();
		return 
	}

	var {elem,editingValueIdx} = this.modeData;
	var currentValue = elem.values[editingValueIdx];
	if(currentValue.value===value){
		SoundManager.playOk();
		return;
	}
	if(elem.values.find(v=>v&&v.value===value)){
		_Dev.showTempAlert('value:'+value+'の段階設定はすでに存在しています');
		SoundManager.playBuzzer();
		return;
	}

	SoundManager.playOk();
	elem.values.splice(editingValueIdx,1);
	this.modeData.tabNames.splice(editingValueIdx,1);

	var idx = 0;
	var length = elem.values.length;
	for(var i=0; i<length; i=(i+1)|0){
		if(value>elem.values[i].value){
			idx = i+1;
		}else{
			break;
		}
	}

	currentValue.value = value;
	elem.values.splice(idx,0,currentValue);
	this.modeData.tabNames.splice(idx,0,value);
	this.modeData.editingValueIdx = -1;
	this.paramEditor._parts.forEach(p=>{
		if(!p)return;
		if(p._key==='editingValueIdx'){
			p.setValue(idx);
			p.refreshParts();
			this.updateValuePointerSprite();
		}
	});
};

Editor.deleteValue = function(){
	var modeData = this.modeData;
	var {elem,tabNames} = modeData;

	var idx = modeData.editingValueIdx;
	var editingValue = elem.values[idx];
	var value = editingValue.value;

	if(elem.values.length===1){
		SoundManager.playBuzzer();
		_Dev.showTempAlert('最低１つは段階設定が必要です');
		return;
	}
	if(!confirm('現在の設定段階<value:%1>を削除しますか？'.format(value)))return;

	elem.values.splice(idx,1);
	tabNames.splice(idx,1);

	idx = Math.min(idx,elem.values.length-1);
	var p = this.paramEditor._parts
		.find(p=>p&&p._key==='editingValueIdx')
	if(p){
		p.setValue(idx);
		p.refreshParts();
		this.setValueIndex(idx);
	}
	this.updateValuePointerSprite();

	SoundManager.playOk();
};


/* paste
===================================*/
Editor.tryPasteElemValue = async function(){
	if(this._mode!=='elem')return;
	var elem = this.editingElem();
	var current = this.editingValue();
	var idx = elem.values.indexOf(current);

	var names = [];
	var symbols = [];
	var prev = null;
	var next = null;
	if(idx>0){
		//add prev
		prev = elem.values[idx-1];
		names.push('前の段階設定<%1>をコピー'.format(prev.value));
		symbols.push(idx-1);
	}

	if(idx<elem.values.length-1){
		next = elem.values[idx+1];
		names.push('次の段階設定<%1>をコピー'.format(next.value));
		symbols.push(idx+1);
	}
	for(const value of elem.values){
		if(value===current)continue;
		names.push('段階設定<%1>をコピー'.format(value.value));
		symbols.push(elem.values.indexOf(value));
	}

	var srcIdx = await _Dev.showToolsWindowWithSymbolsAsync(
		symbols,names,'pasteValueTarget'
	);
	if(typeof srcIdx!=='number'){
		return;
	}

	var src = elem.values[srcIdx];
	current.params = JsonEx.makeDeepCopy(src.params);
	this.paramEditor?.setParamsData('valueParam',current.params);
	this.resetElemValue();

	this.refreshAlert();
};



/* list
===================================*/
Editor.tryShowDataList = function(){
	var effect = this.elemEffect();
	if(effect?.showDataList){
		effect.showDataList();
		SoundManager.playCursor();
	}else{
		SoundManager.playBuzzer();
		_Dev.showTempAlert('表示するデータリストがありません。');
	}
};
Editor.tryShowPresetList = function(){
	var effect = this.elemEffect();
	if(effect?.showPresetList){
		effect.showPresetList();
		SoundManager.playCursor();
	}else{
		SoundManager.playBuzzer();
		_Dev.showTempAlert('表示するプリセットリストがありません。');
	}
};


/* accessor
===================================*/
Editor.editingWeather = function(){
	return $trpWeathers._data[this._id];
};
Editor.editingElem = function(){
	if(this._mode!=='elem')return null;
	return this.modeData.elem;
};
Editor.editingValue = function(){
	if(this._mode!=='elem')return null;
	var elem = this.editingElem();
	return elem.values[this.modeData.editingValueIdx];	
};
Editor.elemTypeParam = function(key){
	var elem = this.editingElem();
	return elem.typeParams[key];
};
Editor.elemEffect = function(){
	if(this._mode!=='elem')return null;
	return EFFECTS[this.modeData.elem.type]
};
Editor.resetElemValue = function(value=this.previewValue,duration){
	if(this._mode!=='elem')return;

	var weather = this.editingWeather();
	if(!weather)return;

	var idx = this.modeData.idx;
	var elem = weather._elems[idx];
	if(!elem)return;

	if(elem.value>0){
		elem.value += 0.001;
	}

	weather.setElemValue(idx,elem,this.modeData.elem,value,duration);
	this.clearElemCache();
};
Editor.clearElemCache = function(elemData=this.editingElem()){
	if(this._mode!=='elem')return;
	var elemIdx = Editor._data.elems.indexOf(elemData);
	var elem = $trpWeathers._data[Editor._id]._elems[elemIdx];
	elem.cache = null;
};
Editor.clearElem = function(){
	var weather = this.editingWeather();
	if(!weather)return;
	if(this._mode!=='elem')return;
	weather.clearElem(null,this.modeData.idx);	
};

Editor.setPreviewValue = function(value=this.previewValue,noPartsRefresh=false,duration){
	SoundManager.playCursor();

	$trpWeathers.set(this._id,Number(value),duration,this.previewEasing);
	this.previewValue = value;
	if(!noPartsRefresh){
		this.paramEditor._parts.find(p=>p._key==='previewValue')?.refreshParts();
	}

	if(this._mode==='elem'){
		this.updateValuePointerSprite();
	}
}

Editor.updateValuePointerSprite = function(){
	var value = this.previewValue;
	var pointer = this.valuePointerSprite();

	pointer.visible = true;
	var parts = this.paramEditor._parts.find(p=>p._key==='editingValueIdx');
	if(!parts){
		pointer.visible = false;
		return;
	}

	var x = 0;
	var elem = this.modeData.elem;
	var length = parts._parts.length;
	for(var i=0; i<length; i=(i+1)|0){
		var p = parts._parts[i];
		var pv = parts._innerData.tabNames[i];
		if(value<pv){
			continue;
		}
		pointer.x = p.x+p.width/2-1;
		if(value>pv){
			var next = parts._parts[i+1];
			if(next){
				var dx = next.x+next.width/2 -p.x-p.width/2;
				pointer.x += dx*(value-pv)/(parts._innerData.tabNames[i+1]-pv);
			}else{
				pointer.x += 12;
			}
		}
	}
	pointer.y = parts.y;
}
Editor.valuePointerSprite = function(){
	if(!this._valuePointerSprite){
		var pointer = this._valuePointerSprite = new Sprite();
		var w = 20;
		var h = 16;
		var bitmap = new Bitmap(w,h);
		pointer.bitmap = bitmap;
		pointer.anchor.set(0.5,1);
		this.ui.addChild(pointer);

		bitmap.fontSize = h-2;
		bitmap.outlineWidth = 4;
		bitmap.outlineColor = 'black';
		bitmap.textColor = 'rgb(255,200,100)';
		bitmap.drawText('▼',0,0,w,h,'center');

		bitmap.textColor = 'white';
		bitmap.fontSize = 7;
		bitmap.drawText('P',0,0,w,h-2,'center');
	}
	return this._valuePointerSprite;
};




/* ValueGraphSprite
===================================*/
var ValueGraphSprite = Editor.ValueGraphSprite = function ValueGraphSprite(){
	this.initialize.apply(this, arguments);
}
ValueGraphSprite.prototype = Object.create(Sprite.prototype);
ValueGraphSprite.prototype.constructor = ValueGraphSprite;

ValueGraphSprite.WIDTH = 48;
ValueGraphSprite.HEIGHT = 20;
ValueGraphSprite.prototype.initialize = function(values,key,keySplitter='_'){
	Sprite.prototype.initialize.call(this);
	this._values = values;
	this._keySplitter = keySplitter;
	this.setKey(key);

	this.bitmap = new Bitmap(ValueGraphSprite.WIDTH,ValueGraphSprite.HEIGHT);

	this._cacheValues = null;
	this._cacheParams = null;

	this.anchor.x = 1;
};

ValueGraphSprite.prototype.setKey = function(key){
	this._keys = key.split(this._keySplitter);
	this._key = TRP_CORE.last(this._keys);
};
ValueGraphSprite.prototype.setKeyPrefix = function(keyPrefix){
	this.setKey(keyPrefix+this._key);
	this.refresh();
};

ValueGraphSprite.prototype.refresh = function(){
	var pValues = [];
	var values = [];
	var max = Number.MIN_SAFE_INTEGER;
	var min = Number.MAX_SAFE_INTEGER;
	var keyLength = this._keys.length;
	for(const valueData of this._values){
		values.push(valueData.value);
		if(!valueData.params){
			pValues.push(null);
			continue;
		}
		var obj = valueData.params;
		for(var i=0; i<keyLength-1; i=(i+1)|0){
			obj = obj[this._keys[i]];
		}
		var v = obj[this._keys[keyLength-1]];
		pValues.push(v);
		max = Math.max(max,v);
		min = Math.min(min,v);
	}
	if(max===min && !pValues.contains(null)){
		this.visible = false;
		return;
	}
	this.visible = true;


	if(TRP_CORE.last(values)!==10){
		values.push(10);
		values.push(null);
	}
	
	if(this._cacheValues){
		if(this._cacheValues.equals(values) && this._cacheParams.equals(pValues)){
			//no change
			return;
		}
	}
	this._cacheValues = values;
	this._cacheParams = pValues;


	/* draw graph
	===================================*/
	var w = ValueGraphSprite.WIDTH;
	var h = ValueGraphSprite.HEIGHT;
	var bitmap = this.bitmap;
	bitmap.clear();
	bitmap.fillAll('rgba(255,255,255,0.5)')
	
	var ctx = bitmap._context;
	var length = pValues.length;
	ctx.strokeStyle = 'rgb(0,0,255)';
	ctx.lineWidth = 2;
	for(var i=0; i<length-1; i=(i+1)|0){
		var pValue = pValues[i];
		if(pValue===null)continue;

		var pValue1 = pValues[i+1];
		if(pValue1===null){
			pValue1=pValue;
		}

		var v0 = values[i];
		var v1 = values[i+1];
		var p0 = max===min ? 0.5 : (pValue-min)/(max-min);
		var p1 = max===min ? 0.5 : (pValue1-min)/(max-min);

		var x0 = w*v0/10;
		var x1 = w*v1/10;
		var y0 = h*(1-p0);
		var y1 = h*(1-p1);

		ctx.beginPath();
		ctx.moveTo(x0,y0);
		ctx.lineTo(x1,y1);
		ctx.stroke();
	}
};





//=============================================================================
// Param Editor
//=============================================================================
var EditorBase = TRP_CORE.EditorBase;
Editor._paramEditors = {};
Editor.paramEditor = null;

Editor.editorBack = null;
Editor.showParamEditor = function(mode,modeData){
	var editor = this._paramEditors[mode];
	if(this._paramEditors[mode] === undefined){
		editor = this._paramEditors[mode] = this._tryCreateParamEditor(mode);
	}else{
		var modeParams = this.paramEditorData(mode,modeData);
		editor.setAllData(modeParams);
	}

	if(!editor)return;

	if(this.paramEditor === editor)return;
	this.paramEditor = editor;
	this.ui.addChild(editor);
	editor.activate();

	if(modeData?.lastEditingIdx>=0){
		editor.startEditing(modeData.lastEditingIdx);
	}
}; 
Editor.hideParamEditor = function(){
	if(!this.paramEditor)return;
	this.tryDeactivateParamEditor();
	if(this.paramEditor.parent){
		this.paramEditor.parent.removeChild(this.paramEditor)
	}
	this.paramEditor = null;
};

Editor.paramEditorData = function(mode=this._mode,modeData=this.modeData){
	var command = 'paramEditorData'+TRP_CORE.capitalize(mode);
	if(!this[command])return null;
	return this[command](modeData);
};
Editor.tryDeactivateParamEditor = function(){
	if(!this.paramEditor || !this.paramEditor.active)return;

	SoundManager.playCursor();
	this.paramEditor.deactivate();
	if(this.editorBack && this.editorBack.parent){
		this.editorBack.parent.removeChild(this.editorBack)
	}
};

Editor.paramInfoIdx = 0;
Editor.onKeyDownParamEditor = function(event){
	if(this.paramEditor.isExclusiveInput())return true;

	
	if(this._mode==='main'){
	}else if(this._mode==='elem'){
		if(this.onKeyDownElem(event)){
			return true;
		}
	}
	return false;
};

/* helper
===================================*/
Editor._paramEditorInfoSprite = null;
Editor._tryCreateParamEditor = function(mode){
	var modeParams = this.paramEditorData(mode);
	if(!modeParams){
		return null;
	}

	var editor = new EditorBase(modeParams,{autoHelpStyle:true,canEndByShortcut:false});
	return editor;
};







//=============================================================================
// EFFECT -> particle 
//=============================================================================
if(window.Game_Particle)Object.assign(EFFECTS.particle,{
	key:'p',
	editorLineSummary:function(elem){
		var {configName,target,z} = elem.typeParams;
		return 'パーティクル %1 %2'.format(configName||'未設定',target,z);
	},
	modeGuide:[
		ctrlKey+'+P:プリセットリスト表示',
		ctrlKey+'+L:データリスト表示',
		ctrlKey+'+'+optKey+'E:パーティクル編集',
	],
	modifyData:function(elemData){
		var validKeys = [];
		for(const v of elemData.values){
			if(!v.params)continue;
			var keys = Object.keys(v.params);
			for(const key of keys){
				if(v.params[key]!==1){
					validKeys.push(key);
				}
			}
		}
		for(const v of elemData.values){
			if(!v.params)continue;
			var keys = Object.keys(v.params);
			for(const key of keys){
				if(!validKeys.contains(key)){
					delete v.params[key];
				}
			}
		}
	},
	typeParams:[
		{
			key:'configName',default:'',
			help:'パーティクル設定名',
			unit:0,integer:false,
			type:'string',
			button:function(){		
				EFFECTS.particle.showPresetList();
			},	
			onValueChange:function(value,lastValue,id,idx,elem,effect){
				EFFECTS.particle.changeConfigName(value);
			},
			tryDelete:true,
			placeholder:'未設定',
			validator:(value)=>Game_Particle.configDataWithName(value),
		},{
			key:'target',default:'weather',
			help:'パーティクルの表示対象。weather/screenなど',
			unit:0,integer:false,
			type:'string',
			list:['weather','screen','player'],
			input:true,
		},{
			key:'z',default:'above',
			help:'パーティクルを表示するZレイヤー層。above/below/spritesetなど',
			unit:1,integer:false,
			type:'string',
			list:['above','below','spriteset'],
			input:true
		},{
			key:'hue',default:0,
			help:'色調の回転。(-180~180)',
			unit:10,integer:true,
			slider:{log:0},
			min:-180,
			max:180,
			fixedWidth:'-180',
			onValueChange:function(value,lastValue,id,idx,elem,effect){
				var particleId = TRP_Weathers.elemId(id,idx);
				var color = elem.typeParams.color;
				$gameScreen._particle.rotateHue(particleId,value,color);
			},
		},{
			key:'color',default:'#ffffff',
			help:'色味の乗算。デフォルトは左上の白。もともと色(tint)がついてる場合はhueの色調回転を推奨。',
			unit:1,integer:false,
			type:'color',
			onValueChange:function(value,lastValue,id,idx,elem,effect){
				var particleId = TRP_Weathers.elemId(id,idx);
				var hue = elem.typeParams.hue;
				$gameScreen._particle.rotateHue(particleId,hue,value);
			},
		},{
			key:'loop',default:48,
			help:['画面端でループさせるピクセル数。0で無効。※対象:weatherのみ有効'],
			unit:10,integer:true,
			onValueChange:function(value,lastValue,id,idx,elem,effect){
				Editor.clearElem();
				var particleId = TRP_Weathers.elemId(Editor._id,Editor.modeData.idx);
				$gameScreen._particle.particleClear(particleId,true);
				setTimeout(()=>{
					Editor.resetElemValue();
				},16);
			},
		},{
			key:'exceed',default:0,
			help:['発生直後に指定秒数だけ時間を進める。','※イベント名「WEATHER」でマップ開始時に実行する場合のみ有効'],
			unit:1,integer:true,min:0,
			onValueChange:function(value,lastValue,id,idx,elem,effect){
				Editor.clearElem();
				var particleId = TRP_Weathers.elemId(Editor._id,Editor.modeData.idx);
				$gameScreen._particle.particleClear(particleId,true);
				setTimeout(()=>{
					var onTransfer = TRP_Weathers._onTransfer;
					TRP_Weathers._onTransfer = true;
					Editor.resetElemValue();
					TRP_Weathers._onTransfer = onTransfer;
				},16);
			},
		}
	],
	valueParams:[
		{key:'alpha',v0:1,v1:1,unit:0.1,min:0,
			help:'パーティクルの不透明度。通常再生時を1としたときの倍率。',
			fixedWidth:'10.0',
			slider:{log:2,min:1/8,max:8},
			onValueChange:function(){
				Editor.clearElemCache();
			},
		},{key:'scale',v0:1,v1:1,unit:0.1,
			help:'パーティクルの大きさ。通常再生時を1としたときの倍率。',
			fixedWidth:'10.0',
			slider:{log:2,min:1/8,max:8},
			onValueChange:function(){
				Editor.clearElemCache();
			},
		},{key:'speed',v0:1,v1:1,unit:0.1,
			help:'パーティクルの速度。通常再生時を1としたときの倍率。0は不可',
			validator:(value)=>value,
			fixedWidth:'10.0',
			slider:{log:2,min:1/8,max:8},
			onValueChange:function(){
				Editor.clearElemCache();
			},
		},{key:'acceleration',v0:1,v1:1,unit:0.1,
			help:'パーティクルの加速度。通常再生時を1としたときの倍率。',
			fixedWidth:'10.0',
			slider:{log:2,min:1/8,max:8},
			onValueChange:function(){
				Editor.clearElemCache();
			},
		},{key:'frequency',v0:1,v1:1,unit:0.1,min:0.01,
			help:'パーティクルの出現頻度。通常再生時を1としたときの倍率。0より大きい数値',
			validator:(value)=>value>0,
			fixedWidth:'10.0',
			slider:{log:2,min:1/8,max:8},
			onValueChange:function(){
				Editor.clearElemCache();
			},
		},{key:'lifetime',v0:1,v1:1,unit:0.1,min:0.01,
			help:'パーティクルの寿命。通常再生時を1としたときの倍率。0より大きい数値',
			fixedWidth:'10.0',
			slider:{log:2,min:1/8,max:8},
			onValueChange:function(){
				Editor.clearElemCache();
			},
		},{key:'spawnChance',v0:1,v1:1,unit:0.1,min:0,
			help:'パーティクルの出現確率。通常再生時を1としたときの倍率。',
			fixedWidth:'10.0',
			slider:{log:2,min:1/8,max:8},
			onValueChange:function(){
				Editor.clearElemCache();
			},
		},{key:'particlesPerWave',v0:1,v1:1,unit:0.1,integer:false,min:0,
			help:'パーティクルが一度に発生する数。通常再生時を1としたときの倍率。',
			fixedWidth:'10.0',
			slider:{log:2,min:1/8,max:8},
			onValueChange:function(){
				Editor.clearElemCache();
			},
		// },{key:'emitterLifetime',v0:1,v1:1,unit:0.1,min:0,
		// 	help:'エミッターの寿命。通常再生時を1としたときの倍率。',
			// fixedWidth:'10.0',
			// slider:{log:2,min:1/8,max:8},
	}],



	/* particle: showList for load
	===================================*/
	showPresetList:function(){
		this._showList('_presetPicker',ParticleEditor.PresetPicker);
	},
	showDataList:function(){
		this._showList('_dataPicker',ParticleEditor.LoadPicker);
	},
	_showList:function(key,PickerClass){
		var elem = Editor.modeData.elem;
		var typeParams = elem.typeParams;
		var {configName,target,z} = typeParams;

		var picker = this[key];
		function particleId(exceed=false){
			var parId = 'WEATHER_EDITOR:PARTICLE:'+picker._showingId;
			if(exceed)picker._showingId+=1
			return parId
		};
		if(!picker){
			picker = this[key] = new PickerClass();
			picker._showingId = 0;
			picker.processDelete = ()=>{};
			picker.applyData = ()=>{
				if(!picker._owner)return;
				Editor.resetElemValue(0,0);

				var parId = particleId(true);
				$gameScreen._particle.particleClear(parId,true);

				parId = particleId();
				var name = picker._names[picker._selectingIndexes[0]];
				if(name){
					$gameScreen._particle.particleSet(0,parId,target,name,z);
				}
			};

			var pickerEnd = picker.end;
			picker.end = ()=>{
				var cancelled = Input.isTriggered('cancel');
				pickerEnd.call(picker);

				parId = particleId();
				$gameScreen._particle.particleClear(parId,true);

				var name = picker._names[picker._selectingIndexes[0]];
				if(name && !cancelled){
					this.changeConfigName(name);
				}else{
					Editor.resetElemValue();
				}
			};
		}

		var currentData = typeParams;
		var targetType = ParticleEmitter.TARGET_TYPES[target];
		picker.startPicking(Editor,targetType,currentData,configName);
		Editor.startPicking(picker);
	},
	changeConfigName:function(name){
		//off particle
		if(Editor._mode!=='elem')return;

		Editor.resetElemValue(0,0);
		var particleId = TRP_Weathers.elemId(Editor._id,Editor.modeData.idx);
		$gameScreen._particle.particleClear(particleId,true);

		//reset value
		var typeParams = Editor.modeData.elem.typeParams;
		typeParams.configName = name;

		//parts text
		Editor.paramEditor._parts
			.find(p=>p&&p._key==='configName')
			?.refreshParts();

		setTimeout(function(){
			Editor.resetElemValue();
	    },1000/60*2);
	}
});

//picker handler
Editor.applyData = function(){};



//=============================================================================
// EFFECT -> particleGroup 
//=============================================================================
if(window.Game_Particle?.ParticleGroup)Object.assign(EFFECTS.particleGroup,{
	key:'g',
	editorLineSummary:(elem)=>{
		var {configName,target} = elem.typeParams;
		return 'パーティクルグループ %1 %2'.format(configName,target);
	},

	valueKeyPrefix:function(modeData,elem){
		var idData = modeData.idList[modeData.parIdx];
		if(!idData)return '';

		var id = idData.id;
		return 'data__'+id+'__';
	},
	shiftEditingTarget:function(descend=false){
		var modeData = Editor.modeData;
		var elem = modeData.elem;

		var idx = modeData.parIdx + (descend?-1:1);
		var length = modeData.idList.length;
		if(idx<0)idx = length-1;
		if(idx>=length)idx = 0;
		this.setParIdx(idx,modeData,elem);
	},
	setParIdx:function(idx,modeData,elem){
		if(modeData.parIdx===idx)return;
		modeData.parIdx = idx;
		var idPrefix = this.valueKeyPrefix(modeData,elem);
		Editor.paramEditor.setParamsKeyPrefix('valueParam',idPrefix);

		//guide
		var guide = ['【グループ編集】',optKey+'+Tab:編集対象の変更'];
		var length = modeData.idList.length;
		for(var i=0; i<length; i=(i+1)|0){
			var idData = modeData.idList[i];
			var id = idData.id;
			if(id.contains('::')){
				id = '　・'+TRP_CORE.last(id.split('::'));
			}else{
				id = '・'+id;
			}
			if(i===idx){
				id = '\\C[20]'+id+' ◀';
			}else{
				id = '\\C[8]'+id;
			}
			guide.push(id);
		}
		_Dev.showText('elemExGuide',guide);
	},
	setupModeData:function(modeData,elem){
		modeData.parIdx = 0;

		EFFECTS.particleGroup._setupIdList(modeData,elem);
		var idList = modeData.idList;
		if(!idList || !idList.length)return;

		//supply elemValueParams
		var validKeys = idList.map(d=>d.id);
		for(const value of elem.values){
			if(value.params===null)continue;
			if(value.params===undefined){
				value.params = {
					data:{}
				};
			}
			var params = value.params;
			for(const idData of idList){
				var {id,name} = idData;
				if(params.data[id])continue;
				params.data[id] = Editor._valueParams(EFFECTS.particle,0).params;
			}
			//delete invalide params
			var paramKeys = Object.keys(params.data);
			TRP_CORE.removeArray(paramKeys,validKeys);
			for(const key of paramKeys){
				delete params.data[key];
			}
		}

		modeData.parIdx = -1;
		EFFECTS.particleGroup.setParIdx(0,modeData,elem);
	},
	_setupIdList:function(modeData,elem){
		var configName = elem.typeParams.configName;
		var group = Game_Particle.groupDataWithName(configName);
		if(!group){
			modeData.idList = [{id:'【DUMMY】',name:'【DUMMY】'}];
			return;
		}

		var replacedName = configName.replace('/h','');
		var list = group.list;
		var length = list.length;

		var allIds = [];
		var data = modeData.idList = [];
		for(var i=0; i<length; i=(i+1)|0){
			var line = list[i];
			var elems = line.split(' ');
			if(elems[0]==='set'||elems[0]==='play'){
				var id = elems[1];
				var name = TRP_CORE.supplementDef(id,elems[3]);
				// if(/^_auto:[0-9]+$/.test(id)){
				// 	id += ':'+replacedName+'/h';
				// }
				// if(/^_auto:[0-9]+$/.test(name)){
				// 	name += ':'+replacedName+'/h';
				// }
				if(TRP_CORE.uniquePush(allIds,id)){
					data.push({id,name});
				}
			}else if(elems[0]==='sub'){
				var targetId = elems[2];
				var name = elems[3];
				// if(/_auto:[0-9]+$/.test(targetId)){
				// 	targetId += ':'+replacedName+'/h';
				// }
				// if(/_sub:[0-9]+$/.test(name)){
				// 	name += ':'+replacedName+'/h';
				// }
				var id = targetId+'::'+name;
				if(TRP_CORE.uniquePush(allIds,id)){
					data.push({id,name});
				}
			}
		}
		data.sort((a,b)=>a.id-b.id);
	},
	modeGuide:EFFECTS.particle.modeGuide,
	modifyData:function(elem){
		var validIds = [];
		var validKeys = {};
		for(const v of elem.values){
			if(!v.params)continue;
			var ids = Object.keys(v.params.data);
			for(const id of ids){
				var params = v.params.data[id];
				delete params.keys;
				var keys = Object.keys(params);
				for(const key of keys){
					if(params[key]!==1){
						validIds.push(id)
						validKeys[id] = validKeys[id]||[];
						validKeys[id].push(key);
					}
				}
			}
		}
		for(const v of elem.values){
			if(!v.params)continue;
			var ids = Object.keys(v.params.data);
			for(const id of ids){
				if(!validIds.contains(id)){
					delete v.params.data[id];
					continue;
				}
				var params = v.params.data[id];
				var keys = Object.keys(params);
				for(const key of keys){
					if(!validKeys[id].contains(key)){
						delete params[key];
					}
				}
			}
		}
	},
	supplyValueParams:function(elem){
		for(const valueData of elem.values){
			if(!valueData.params)continue;
			var data = valueData.params.data;
			var value = valueData.value;
			for(const id in data){
				var params = data[id];
				for(const vp of this.valueParams){
					if(params[vp.key]===undefined){
						if(vp.defaultValue){
							params[vp.key] = vp.defaultValue(elem.typeParams);
						}else if(vp.v1){
							params[vp.key] = vp.v0+(vp.v1-vp.v0)*value/10;
						}else{
							params[vp.key] = vp.v0;
						}
					}
				}
			}
		}
	},
	typeParams:[
		{
			key:'configName',default:'',
			help:'グループ設定名',
			placeholder:'未設定',
			unit:0,integer:false,
			type:'string',
			button:function(){		
				EFFECTS.particleGroup.showPresetList();
			},
			onValueChange:function(value,lastValue,id,idx,elem,effect){
				EFFECTS.particleGroup.changeConfigName(value);
			},
			tryDelete:true,
			placeholder:'未設定',
			validator:(value)=>Game_Particle.groupDataWithName(value),
		},{
			key:'target',default:'weather',
			help:'パーティクルの表示対象。weather/screenなど',
			unit:0,integer:false,
			type:'string',
			list:['weather','screen','player'],
			input:true,
		},{
			key:'hue',default:0,
			help:'色調の回転。(-180~180)',
			unit:10,integer:true,
			slider:{log:0},
			min:-180,
			max:180,
			fixedWidth:'-180',
			onValueChange:function(value,lastValue,id,idx,elem,effect){
				var groupId = TRP_Weathers.elemId(id,idx);
				var {hue,color} = elem.typeParams;
				effect.rotateColor(Editor._id,groupId,elem,hue,color);
			},
		},{
			key:'color',default:'#ffffff',
			help:'色味の乗算。デフォルトは左上の白。もともと色(tint)がついてる場合はhueの色調回転を推奨。',
			unit:1,integer:false,
			type:'color',
			onValueChange:function(value,lastValue,id,idx,elem,effect){
				var groupId = TRP_Weathers.elemId(id,idx);
				var {hue,color} = elem.typeParams;
				effect.rotateColor(Editor._id,groupId,elem,hue,color);
			},
		},{
			key:'loop',default:48,
			help:['画面端でループさせるピクセル数。0で無効。','※対象:weatherのみ有効。','※グループ内でwaitを挟まず実行するパーティクルのみ有効'],
			unit:10,integer:true,
			onValueChange:function(value,lastValue,id,idx,elem,effect){
				Editor.clearElem();
				var groupId = TRP_Weathers.elemId(Editor._id,Editor.modeData.idx);
				$gameScreen._particle.particleClear(groupId,true);
				setTimeout(()=>{
					var onTransfer = TRP_Weathers._onTransfer;
					TRP_Weathers._onTransfer = true;
					Editor.resetElemValue();
					TRP_Weathers._onTransfer = onTransfer;
				},16);
			},
		},{
			key:'exceed',default:0,
			help:['発生直後に指定秒数だけ時間を進める。','※イベント名「WEATHER」でマップ開始時に実行する場合のみ有効','※グループ内でwaitを挟まず実行するパーティクルのみ有効'],
			unit:1,integer:true,min:0,
			onValueChange:function(value,lastValue,id,idx,elem,effect){
				Editor.clearElem();
				var groupId = TRP_Weathers.elemId(Editor._id,Editor.modeData.idx);
				$gameScreen._particle.particleClear(groupId,true);
				setTimeout(()=>{
					var onTransfer = TRP_Weathers._onTransfer;
					TRP_Weathers._onTransfer = true;
					Editor.resetElemValue();
					TRP_Weathers._onTransfer = onTransfer;
				},16);
			},
		}
	],
	valueParams:EFFECTS.particle.valueParams,


	/* particleGroup: showList for load
	===================================*/
	showPresetList:function(){
		this._showList('_presetPicker',ParticleGroupEditor.GroupPresetPicker);
	},
	showDataList:function(){
		this._showList('_dataPicker',ParticleGroupEditor.GroupLoadPicker);
	},
	_showList:function(key,PickerClass){
		var typeParams = Editor.modeData.elem.typeParams;
		var {configName,target} = typeParams;

		var picker = this[key];
		function particleId(exceed=false){
			var parId = 'WEATHER_EDITOR:PARTICLE:'+picker._showingId;
			if(exceed)picker._showingId+=1
			return parId
		};
		if(!picker){
			picker = this[key] = new PickerClass();
			picker._showingId = 0;
			picker.processDelete = ()=>{};
			picker.applyData = ()=>{
				if(!picker._owner)return;
				Editor.resetElemValue(0,0);

				var parId = particleId(true);
				$gameScreen._particle.particleGroupClear(parId,true);
				$gameScreen._particle.particleClear('group:'+parId,true);

				parId = particleId();
				var name = picker._names[picker._selectingIndexes[0]];
				if(name){
					$gameScreen._particle.particleGroupSet(0,parId,target,null,name);
				}
			};

			var pickerEnd = picker.end;
			picker.end = ()=>{
				var cancelled = Input.isTriggered('cancel');
				pickerEnd.call(picker);

				parId = particleId();
				$gameScreen._particle.particleClear('group:'+parId,true);

				var name = picker._names[picker._selectingIndexes[0]];
				if(name && !cancelled){
					this.changeConfigName(name);
				}else{
					Editor.resetElemValue(Editor.previewValue,0);
				}
			};
		}

		Editor.setPreviewValue(Editor.previewValue,true,0);

		var currentData = typeParams;
		var targetType = ParticleEmitter.TARGET_TYPES[target];
		picker.startPicking(Editor,targetType,currentData,configName);
		Editor.startPicking(picker);
	},

	changeConfigName:function(name){
		//off particle
		Editor.resetElemValue(0,0);
		var groupId = TRP_Weathers.elemId(Editor._id,Editor.modeData.idx);
		$gameScreen._particle.particleClear('group:'+groupId,true);

		//reset value
		var typeParams = Editor.modeData.elem.typeParams;
		typeParams.configName = name;

		this.setupModeData(Editor.modeData,Editor.modeData.elem);

		//parts text
		Editor.paramEditor._parts
			.find(p=>p&&p._key==='configName')
			?.refreshParts();
		setTimeout(function(){
			Editor.resetElemValue();
	    },1000/60*2);
	}
});
	



//=============================================================================
// EFFECT -> weather (TRP_Weather)
//=============================================================================
EFFECTS.weather = Object.assign(EFFECTS.weather,{
	key:'w',
	editorLineSummary:function(elem){
		var {configName} = elem.typeParams;
		return '天候 %1'.format(configName);
	},

	modeGuide:null,
	modifyData:null,
	typeParams:[
		{
			key:'configName',default:'',
			help:'天候設定名',
			unit:0,integer:false,
			type:'string',
			placeholder:'未設定',
			validator:(value)=>!!$dataTrpWeathers[value],

			picker:{
				dataSet:()=>$dataTrpWeathers,
				isInvalid:(key)=>{
					if(TRP_Weathers.relatedWeatherIds(key).includes(Editor._id))return true;
					if(TRP_Weathers.relatedWeatherIds(Editor._id).includes(key))return true;
					return false;
				},
				categories:[
					'tag:core',
					'particle','filter/tint','fog','weather','tkoolWeather','multiple','others',
					'tag:place','tag:effect',
				],
				categoryNames:{
					particle:'パーティクル',
					"filter/tint":'フィルタ/色調',
					fog:'フォグ',
					weather:'天候',
					tkoolWeather:'ツクール天候',
					multiple:'組み合わせ',
					others:'その他',
					"tag:core":'タグ:core',
					"tag:place":'タグ:place',
					"tag:effect":'タグ:effect',
				},
				categoryKey:(data)=>{
					if(data.tag)return 'tag:'+data.tag;
					var type = null;
					data.elems.forEach(elem=>{
						var t = null;
						switch(elem.type){
						case 'particle':
						case 'particleGroup':
							t = 'particle';break;
						case 'fog':
							t = 'fog';break;
						case 'filter':
						case 'tint':
							t = 'filter/tint';break;
						case 'defWeather':
							t = 'tkoolWeather';break;
						}
						if(t){
							if(type && type!==t){
								type = 'multiple';
							}else{
								type = t;
							}
						}
					});
					return type||'others';
				},
				handlers:{
					_lastPreviewId:null,
					tryDeleteData:function(value){
						return Editor.tryDeleteData(value);
					},
					applyData:function(value){
						Editor.resetElemValue(0,0);
						if(this._lastPreviewId)$trpWeathers.clear(this._lastPreviewId,0);
						this._lastPreviewId = value;
						$trpWeathers.set(value,10);
					},
					finiteData:function(value,cancel,picker){
						if(this._lastPreviewId)$trpWeathers.clear(this._lastPreviewId,0);
						this._lastPreviewId = null;

						if(!cancel){
							//off weawther
							Editor.resetElemValue(0,0);

							//reset value
							picker.setDataValue();
							
							//parts text
							Editor.paramEditor._parts
								.find(p=>p&&p._key==='configName')
								?.refreshParts();
						}

						setTimeout(function(){
							Editor.resetElemValue();
					    },1000/60*2);
					}
				},
			},

		},{
			key:'wiggleStrength',default:0,
			help:['ウィグラー(ゆらぎ)の強さ。0で無効'],
			unit:1,integer:false,min:0,max:10,
			onValueChange:function(value,lastValue,id,idx,elem,effect){
				effect._resetWiggler(elem);
			},
		},{
			key:'wiggleInterval',default:10,
			help:'ウィグラー間隔(フレーム数)',
			unit:1,integer:true,min:1,
			onValueChange:function(value,lastValue,id,idx,elem,effect){
				effect._resetWiggler(elem);
			},
		},{
			key:'wiggleIntWidth',default:0.3,
			help:'ウィグラー間隔の振れ幅',
			unit:0.1,integer:false,min:0,max:1,
			onValueChange:function(value,lastValue,id,idx,elem,effect){
				effect._resetWiggler(elem);
			},
		},{
			key:'wiggleWait',default:0,
			help:'ウィグラーゆらぎ間のウェイト(フレーム数)',
			unit:1,integer:true,min:0,
			onValueChange:function(value,lastValue,id,idx,elem,effect){
				effect._resetWiggler(elem);
			},
		},{
			key:'wiggleWaitWidth',default:0.3,
			help:'ウィグラーゆらぎ間のウェイト幅',
			unit:0.1,integer:false,min:0,max:1,
			onValueChange:function(value,lastValue,id,idx,elem,effect){
				effect._resetWiggler(elem);
			},
		},{
			key:'wiggleDir',default:'normal',unit:1,integer:true,
			help:['ウィグラーゆらぎ方向','normal:交互','random:ランダム','plus:正方向のみ','minus:負方向のみ'],
			onValueChange:function(value,lastValue,id,idx,elem,effect){
				effect._resetWiggler(elem);
			},
			type:'string',
			list:['normal','random','plus','minus'],
		},{
			key:'wiggleBack',default:'none',unit:1,integer:true,
			help:['ウィグラーゆらぎ戻り方法','none:なし','back:ゆらぎごとに中央に戻る','flashIn:0フレで揺らいでintervalで戻る','flashOut:intervalでゆらいで0フレで戻る'],
			onValueChange:function(value,lastValue,id,idx,elem,effect){
				effect._resetWiggler(elem);
			},
			type:'string',
			list:['none','back','flashIn','flashOut'],
		},{
			key:'wiggleOptions',default:0,
			help:['ウィグラー特殊オプション','1:離散変化','2:振れ幅固定','3:離散変化&振れ幅固定'],
			unit:1,integer:true,min:0,max:3,
			onValueChange:function(value,lastValue,id,idx,elem,effect){
				effect._resetWiggler(elem);
			}
		}
	],
	_resetWiggler:function(elem){
		var {configName,wiggleStrength,wiggleInterval,wiggleIntWidth,wiggleWait,wiggleWaitWidth,wiggleBack,wiggleDir,wiggleOptions} = elem.typeParams;
		var weather = $trpWeathers._data[configName];
		weather?.startWiggler(wiggleStrength,wiggleInterval,wiggleIntWidth,wiggleWait,wiggleWaitWidth,wiggleBack,wiggleDir,wiggleOptions);
	},

	/* valueParams
	===================================*/
	valueParams:[
		{key:'strength',v0:0,v1:10,unit:1,min:0,max:10,
			help:'天候の強さ。(0~10)',
			fixedWidth:'10', 
			slider:{log:0},
		}
	],
});



//=============================================================================
// EFFECT -> TRP_Filter
//=============================================================================
if(window.TRP_FilterManager){Object.assign(TRP_Weathers.EFFECTS.filter,{
	key:'f',
	editorLineSummary:(elem)=>{
		var types = [];
		for(const value of elem.values){
			if(!value.params)continue;
			if(!value.params.args)continue;
			for(const arg of value.params.args){
				if(typeof arg === 'string'){
					TRP_CORE.uniquePush(types,arg);
				}
			}
		}
		return 'フィルタ '+types.join(' ');
	},

	modeGuide:null,
	modifyData:null,
	typeParams:[
		{key:'synthesize',default:'add',min:0,integer:false,unit:1,
			type:'string',
			input:true,
			help:['パラメータ合成',
				'パラメータを合成して１つのフィルタで表現するための設定。',
				'separate:合成せず個別にフィルタ追加',
				'add:パラメータを加算(二乗和の平方根。一部パラメータは平均)',
				'average:average同士を平均(キーパラメータの重み平均)',
				'ignore:add/averageがある場合は無視',
			],
			list:['separate','add','average','ignore'],
			onValueChange:function(value,lastValue,id,idx,elem,effect){
				TRP_FilterManager.updateMapFilters('<filter:>',0,undefined,lastValue);

				var pv = Editor.previewValue;
				Editor.setPreviewValue(0,true,0);
				;setTimeout(function(){
					Editor.setPreviewValue(pv,true,0);
			    },16)
			}
		},
		{key:'mapFilterId',default:'auto',min:0,integer:false,unit:1,
			type:'string',
			input:true,
			help:['編集するマップフィルタID',
				'auto:自動(他のフィルタと共有なし)',
				'map:ノート設定などで使われるフィルタと共有',
				'その他:他の天候などとフィルタを共有するときに入力',
			],
			list:['auto','map'],
			onValueChange:function(value,lastValue,id,idx,elem,effect){
				TRP_FilterManager.updateMapFilters('<filter:>',0,undefined,lastValue);

				var pv = Editor.previewValue;
				Editor.setPreviewValue(0,true,0);
				Editor.setPreviewValue(pv,true,0);
				// Editor.resetElemValue(undefined,0);
			}
		},
		{key:'target',default:'baseSprite',min:0,integer:false,unit:1,
			type:'string',
			input:true,
			help:['フィルター適用対象(基本はbaseSprite固定)'],
			list:['baseSprite','tilemap','spriteset'],
			onValueChange:function(value,lastValue,id,idx,elem,effect){
				TRP_FilterManager.updateMapFilters('<filter:>',0,undefined,lastValue);

				var pv = Editor.previewValue;
				Editor.setPreviewValue(0,true,0);
				Editor.setPreviewValue(pv,true,0);
				// Editor.resetElemValue(undefined,0);
			}
		},
	],
	valueParams:[
		{key:'args',unit:1,integer:false,
			defaultValue:function(){
				var values = [];
				var DEFAULTS = TRP_FilterManager.DEFAULT_PARAMS;
				var adj = DEFAULTS.adjustment.concat();
				var bloom = DEFAULTS.bloom.concat();
				var tiltshift = DEFAULTS.tiltshift.concat();
				var vignette = DEFAULTS.vignette.concat();
				bloom[1] = 0;
				bloom[3] = 1;
				tiltshift[0] = 0;
				vignette[0] = 0;

				values.push(['adjustment',...adj]);
				values.push(['bloom',...bloom])
				values.push(['tiltshift',...tiltshift])
				values.push(['vignette',...vignette])
				return values;
			},
			help:'マップ用フィルタエディタで編集開始',
			type:'object',value:'編集',noExSprite:true,
			button:function(key,value,line){
				var idx = Editor.elemTypeParam('mapFilterId');
				if(idx==='auto'){
					idx = TRP_Weathers.elemId(Editor._id,Editor.modeData.idx);
				}

				//filterSet(if not created)
				var args = value.concat();
				TRP_FilterManager.processCommandEdit(['edit',idx],null,args,result=>{
					line.endPicker();
					var args = result.replace('<filter:','').replace('>','');
					args = args.split(',');
					for(var i=args.length-1; i>=0; i=(i-1)|0){
						args[i] = args[i].split(' ').map(a=>isNaN(a)?a:Number(a));
					}

					TRP_FilterManager.updateMapFilters('<filter:>',0,undefined,idx);
					line.setValue(args);
					Editor.ui.visible = true;
				});

				Editor.ui.visible = false;
				var editor = TRP_FilterManager.Editor.instance;
				line.startPicker(editor);
				editor.isExclusiveInput = function(){return true};
			}
		}
	],
})

/* modify Filter Editor
===================================*/
let FilterEditor = TRP_FilterManager.Editor;
if(FilterEditor){
	var _FilterEditor_initialize = FilterEditor.prototype.initialize;
	FilterEditor.prototype.initialize = function(filterDataArr,completion=null){
		_FilterEditor_initialize.call(this,...arguments);

		_Dev.showText('filterEditHelp',[
			'←→：値の調整(+Shiftで微調整)',
			'Shift+Esc：現在のフィルターを初期化',
			ctrlKey+'+D：現在のフィルター無効化',
			ctrlKey+'+I：タイルセット画像書き出し',
			'Esc：編集終了',
		]);
	};
	var _FilterEditor_processInput = FilterEditor.prototype.processInput;
	FilterEditor.prototype.processInput = function(){
		if(Input.isTriggered('cancel')&&this._keyCode!==96){
			if(Input.isPressed('shift')||Input.isPressed('control')){
				this.initCurrentFilterParams();
			}else{
				this.end();
			}
			return;
		}
		_FilterEditor_processInput.call(this);
	}
}


};




//=============================================================================
// EFFECT -> TRP_FogTexture
//=============================================================================
if(TRP_CORE.FogSprite){Object.assign(EFFECTS.fog,{
	key:'F',
	editorLineSummary:function(elem){
		var idxes = [];
		for(const value of elem.values){
			if(!value.params)continue;
			for(const args of value.params.args){
				TRP_CORE.uniquePush(idxes,TRP_CORE.last(args).replace('idx:',''));
			}
		}
		return 'フォグ fogIdx:'+idxes.sort().join(',');
	},

	modeGuide:null,
	modifyData:null,
	typeParams:[],


	valueParams:[
		{key:'args',unit:1,integer:false,
			help:[
				'フォグエディタで編集開始',
				'\\C[14]※alpha/speedX・Y以外は各段階揃える必要',
				'（各段階にデータペースト「'+ctrlKey+'+V」し、alpha/speedX・Yのみ変えると◯）'
			],
			defaultValue:function(idx=0){
				var values = Object.values(TRP_CORE.FogTextureSprite.DEFAULT_PARAMS);
				values.push('idx:auto:0');
				return [values];
			},
			validator:function(text,value){
				return !EFFECTS.fog.alertGuide();
			},
			type:'object',value:'編集',noExSprite:true,
			button:function(key,value,line){
				var idxes = [];
				for(var args of value){
					var idx = EFFECTS.fog.fogIdx(TRP_CORE.last(args).replace('idx:',''),Editor._id,Editor._data.elems.indexOf(Editor.modeData.elem));
					TRP_CORE.uniquePush(idxes,idx);
				}

				Editor.resetElemValue(Editor.editingValue().value,0);

				var spriteOwner = EFFECTS.fog.fogSpriteOwner();
				var dataOwner = EFFECTS.fog.fogDataOwner();
				var trpFogSprites = spriteOwner._trpFogSprites;
				var sprites = idxes.map(idx=>{
					var sprite = trpFogSprites.find(spr=>spr&&spr._fogIdx===idx);
					if(!sprite){
						sprite = new TRP_CORE.FogTextureSprite(idx);
						spriteOwner._tilemap.addChild(sprite);
						trpFogSprites.push(sprite);
						sprite.setup();
					}else{
						var data = dataOwner._trpFogTextures?.[sprite._fogIdx];
						if(data)sprite.updateParameters(data);
						while(data?.[0]>0){
							if(data?.[0]>0){
								data[0]-=1;
								if(data[0]<=0)data[0]=0;
							}
							if(data?.[0]<0){
								data[0]+=1;
								if(data[0]>=0)data[0]=0;
							}
						}
						sprite.updateParameters(data);
					}
					return sprite;
				});

				Editor.hideTextsTemporally();
				
				var FogEditor = TRP_CORE.FogTextureSprite.Editor;
				FogEditor.autoIdx = TRP_Weathers.elemId(Editor._id,Editor._data.elems.indexOf(Editor.editingElem()));
				FogEditor.start(sprites,(result)=>{
					line.endPicker();
					line.setValue(result);
					Editor.ui.visible = true;
					Editor.showTemporallyHiddenTexts();

					var idxDuplicate = EFFECTS.fog.alertGuide();
					if(idxDuplicate)alert(idxDuplicate);

					Editor.refreshAlert();
				},args);

				Editor.ui.visible = false;
				var editor = TRP_CORE.FogTextureSprite.Editor.instance;
				line.startPicker(editor);
				editor.isExclusiveInput = function(){return true};
			}
		}
	],

	/* helper
	===================================*/
	fogSpriteOwner:()=>SceneManager._scene._spriteset,
	alertGuide:function(elem = Editor.modeData.elem){
		//check idxes same
		var idxes = null;
		var alert = '';
		var duplicated = false;
		for(const value of elem.values){
			if(!value.params)continue;
			var valueIdxes = [];
			for(const args of value.params.args){
				valueIdxes.push(TRP_CORE.last(args).replace('idx:',''));
			}
			valueIdxes.sort();
			if(!idxes){
				idxes = valueIdxes;
			}else{
				if(!idxes.equals(valueIdxes)){
					duplicated = true;
				}
			}
			alert += 'value:%1<fogIdx:%2>\n'.format(value.value,valueIdxes.join(','));
		}
		if(!duplicated)return null;
		return '注意:各設定段階で使用するfogIdxは揃える必要があります。\n'+alert;
	},
})


/* modify Fog Editor
===================================*/
let FogEditor = TRP_CORE.FogTextureSprite?.Editor;
if(FogEditor){
	var _FogEditor_initialize = FogEditor.prototype.initialize;
	FogEditor.prototype.initialize = function(FogDataArr,completion=null){
		_FogEditor_initialize.call(this,...arguments);

		_Dev.showText('fogEditHelp',[
			'←→：値の調整(+Shiftで微調整)',
			ctrlKey+'+I：画像選択',
			ctrlKey+'+D：一時的に表示/非表示',
			ctrlKey+'+W：編集終了&パラメータコピー',
			ctrlKey+'+N：フォグの追加',
			ctrlKey+'+Backspace：フォグの削除',
			ctrlKey+'+左右キー：フォグの切り替え',
			'Esc：編集終了',
		]);
	};
	var _FogEditor_processInput = FogEditor.prototype.processInput;
	FogEditor.prototype.processInput = function(){
		if(Input.isTriggered('cancel')&&this._keyCode!==96){
			this.end();
			return;
		}
		_FogEditor_processInput.call(this);
	}
}


};


//=============================================================================
// EFFECT -> BGS
//=============================================================================
var TRP_Bgs = TRP_CORE?.TRP_Audio?.BGS || null;
TRP_Weathers.EFFECTS.bgs = Object.assign(EFFECTS.bgs,{
	...EFFECTS.bgs,

	key:'b',
	editorLineSummary:function(elem){
		var {name} = elem.typeParams ? elem.typeParams : "なし";
		return 'BGS <%1>'.format(name);
	},
	modeGuide:null,
	modifyData:null,
	typeParams:[{
		key:'name',default:'',
		help:'BGS名',
		unit:0,integer:false,
		type:'string',
		placeholder:'未設定',
		onValueChange:function(value,lastValue,id,idx,elem,effect){
			Editor.resetElemValue();
		},
		picker:{
			dataSet:()=>{
				if(!this.BGS_LIST){
					var files = _Dev.readdirSync('audio/bgs')
						.filter(f=>f.includes('.mp3')||f.includes('.wav')||f.includes('.ogg')||f.includes('.m4a'))
						.map(f=>f.split('.')[0])
					this.BGS_LIST = [...new Set(files)];
				}
				return this.BGS_LIST;
			},
			categories:[
				'allBgs'
			],
			categoryNames:{
				allBgs:'BGS'
			},
			categoryKey:(data)=>'allBgs',
			handlers:{
				_lastPreviewId:null,
				applyData:function(value){
					Editor.resetElemValue(0,0);
					this.stopBgs();

					if(TRP_Bgs){
						TRP_Bgs.play(value);
					}else{
						AudioManager.playBgs({name:value,volume:90,pitch:100,pan:0});
					}
					this._lastPreviewId = value;
				},
				stopBgs:function(){
					if(this._lastPreviewId){
						if(TRP_Bgs){
							TRP_Bgs.stop(this._lastPreviewId);
						}else{
							AudioManager.stopBgs();
						}
					}
					this._lastPreviewId = null;
				},
				finiteData:function(value,cancel,picker){
					if(this._lastPreviewId)this.stopBgs();
					if(!cancel){
						//off weawther
						Editor.resetElemValue(0,0);

						//reset value
						picker.setDataValue();
						
						//parts text
						Editor.paramEditor._parts
							.find(p=>p&&p._key==='name')
							?.refreshParts();
					}

					setTimeout(function(){
						Editor.resetElemValue();
				    },1000/60*2);
				}
			},
		}
	},{
		key:'pitch',default:100,
		help:'ピッチ',
		unit:10,integer:true,
		onValueChange:function(value,lastValue,id,idx,elem,effect){
			Editor.clearElem();
			Editor.resetElemValue();
		},
	}],
	valueParams:[
		{key:'volume',v0:0,v1:90,unit:10,min:0,max:200,
			help:'音量',
			fixedWidth:'100',
			slider:{log:0},
		},{key:'pan',v0:0,v1:0,unit:10,min:-100,max:100,
			help:'パン',
			fixedWidth:'-100',
			slider:{log:0},
		}
	],
});


//=============================================================================
// EFFECT -> tint
//=============================================================================
TRP_Weathers.EFFECTS.tint = Object.assign(EFFECTS.tint,{
	key:'t',
	editorLineSummary:function(elem){
		var params = (TRP_CORE.last(elem.values)?.params);
		var {r,g,b,gray} = params ? params : {r:0,g:0,b:0,gray:0};
		return '色調 <r:%1,g:%2,b:%3,g:%4>'.format(r,g,b,gray);
	},
	modeGuide:null,
	modifyData:null,
	typeParams:[],
	valueParams:[
		{key:'r',v0:0,v1:0,unit:10,min:-255,max:255,
			help:'色調の赤み',
			fixedWidth:'-255',
			slider:{log:0},
		},{key:'g',v0:0,v1:0,unit:10,min:-255,max:255,
			help:'色調の緑',
			fixedWidth:'-255',
			slider:{log:0},
		},{key:'b',v0:0,v1:0,unit:10,min:-255,max:255,
			help:'色調の青み',
			fixedWidth:'-255',
			slider:{log:0},
		},{key:'gray',v0:0,v1:0,unit:10,min:-255,max:255,
			help:'色調の赤み',
			fixedWidth:'10',
			slider:{log:0},
		}
	],
});


//=============================================================================
// EFFECT -> defWeather
//=============================================================================
EFFECTS.defWeather = Object.assign(EFFECTS.defWeather,{
	key:'W',
	editorLineSummary:function(elem){
		var type = elem.values[0]?.params?.type || '';
		var typeName = this.TYPE_NAMES[type];
		return '天候(ツクールデフォ) %1'.format(typeName);
	},
	TYPE_NAMES:{
		rain:'雨',
		snow:'雪',
		storm:'嵐',
	},

	modeGuide:null,
	modifyData:null,
	typeParams:[],

	/* valueParams
	===================================*/
	valueParams:[
		{key:'type',v0:'rain',v1:'rain',unit:1,integer:false,
			help:'天候のタイプ',
			type:'string',
			list:['rain','storm','snow'],
		},
		{key:'power',v0:0,v1:10,unit:1,min:0,max:10,
			help:'天候の強さ(0~10)',
			fixedWidth:'10',
			slider:{log:0},
		}
	],
});


//=============================================================================
// EFFECT -> mapObject
//=============================================================================
if(TRP_CORE.MapObject)Object.assign(EFFECTS.mapObject,{
	key:'o',
	editorLineSummary:function(elem){
		return 'マップオブジェ操作 ' + elem.typeParams.target;
	},
	modeGuide:null,
	modifyData:null,
	typeParams:[
		{
			key:'target',default:'all',
			help:['操作対象','all:すべてのオブジェクト','name:キャラクター画像名','namePrefix:キャラ画像名先頭一致','nameTailfix:キャラ画像名語尾一致','blend:ブレンドモード(数字)'],
			unit:0,integer:false,
			type:'string',
			placeholder:'未設定',
			input:true,
			picker:{
				dataSet:()=>{
					var set = {
						all:'all',
						chara:'chara',
						tile:'tile',
					};
					var blendModes = [];
					var names = [];
					var prefixes = {};
					for(const obj of $dataTrpMapObjects){
						TRP_CORE.uniquePush(blendModes,obj.blendMode);
						var name = obj.characterName;
						if(name){
							TRP_CORE.uniquePush(names,name);
							var prefix = name.split('-')[0].split('_')[0];
							var numDeleted = prefix.replace(/[0-9]/gi,'');
							if(prefix[0]===numDeleted[0]){
								prefix = numDeleted;
							}
							if(prefix!==name){
								prefixes[prefix] = (prefixes[prefix]||0)+1;
							}
						}
					}
					blendModes.sort();
					for(const blend of blendModes){
						set['blend:'+blend] = 'blend:'+blend;
					}
					names.sort();
					for(const name of names){
						set['name:'+name] = 'name:'+name;
					}
					for(const prefix in prefixes){
						if(prefixes[prefix]<2)continue;
						set['prefix:'+prefix] = 'prefix:'+prefix;
					}
					return set;
				},
				categories:['main'],
				categoryNames:{main:''},
				categoryKey:(data)=>'main',
				handlers:{
					tryDeleteData:null,
					applyData:function(value){return true},
					finiteData:function(value,cancel,picker){
						if(cancel)return;

						//off weather
						Editor.resetElemValue(0,0);

						//reset value
						picker.setDataValue();
						
						//parts text
						Editor.paramEditor._parts
							.find(p=>p&&p._key==='target')
							?.refreshParts();

						setTimeout(function(){
							Editor.resetElemValue();
					    },1000/60*2);
					}
				},
			},
			validator:(value)=>{
				return !isNaN(TRP_CORE.MapObject.TARGET_TYPES[value.split(':')[0]]);
			},
			onValueChange:function(value,lastValue,id,idx,elem,effect){
				Editor.resetElemValue();
			},
		},{
			key:'changeOpacity',default:true,
			help:['不透明度の変更を有効','変化させないときはfalse推奨'],
			type:'switch',
			fixedWidth:'false',
		},{
			key:'changeLoop',default:true,
			help:['アニメーションループ変更を有効','変化させないときはfalse推奨'],
			type:'switch',
			fixedWidth:'false',
		}
	],

	/* valueParams
	===================================*/
	valueParams:[
		{key:'opacity',v0:255,v1:255,integer:true,unit:10,
			help:['不透明度。元の不透明度に「設定値/256」で乗算される。','初期非表示にしたい場合はイベントメモ欄に<opacity:変化後不透明度><hidden>'],
			fixedWidth:'255',
			min:0,max:255,
			slider:true,
		},{key:'loop',v0:true,v1:true,integer:false,unit:1,
			type:'switch',
			help:'アニメーションループ有効。初期停止させたい場合はイベントメモ欄に<stop>',
			fixedWidth:'false',
		}
	],
});





//=============================================================================
// EFFECT -> command
//=============================================================================
EFFECTS.command = Object.assign(EFFECTS.command,{

	key:'c',
	editorUpdate:function(elem){
		var {editorUpdate} = elem.typeParams;
		try{
			eval(editorUpdate);
		}catch(e){

		}
	},

	editorLineSummary:function(elem){
		var value = TRP_CORE.last(elem.values);
		var name = "";
		if(value){
			name = value.params.command.substring(0,15)
			if(name!==value.command){
				name += '…';
			}
		}
		return 'コマンド %1'.format(name);
	},
	modeGuide:null,
	modifyData:null,
	typeParams:[
		{
			key:'type',default:'MV',
			help:'コマンド形式',
			unit:0,integer:false,
			type:'string',
			list:['MV','MZ','script'],
			onValueChange:function(value,lastValue,id,idx,elem,effect){
				Editor.resetElemValue();
			},
		},{
			key:'pluginName',default:'',
			help:'プラグイン名(MZ形式でのみ使用)',
			unit:0,integer:false,
			type:'string',
			placeholder:'(MZ形式のみ使用)',
			input:true,
			button:true,
			onValueChange:function(value,lastValue,id,idx,elem,effect){
				Editor.clearElem();
				setTimeout(function(){
					Editor.resetElemValue();
			    },100);
			},
			validator:(value)=>{
				var elem = Editor.editingElem();
				if(elem?.typeParams.type==='MZ'){
					return !!value;
				}
				return true;
			},
		},{
			key:'on',default:"",
			integer:false,unit:0,
			help:['天候ON時のコマンド。','セミコロン(;)区切りで複数コマンド。','MZ形式は「command:コマンド名 キー名:値 キー名:値 ...」の形式で記述'],
			maxWidth:512,
			type:'string',
			placeholder:'(Enterで入力)',
			input:true,
			button:true,
			onValueChange:function(value,lastValue,id,idx,elem,effect){
				Editor.clearElem();
				setTimeout(function(){
					Editor.resetElemValue();
			    },100);
			},
		},{
			key:'off',default:"",
			integer:false,unit:0,
			help:['天候OFF時のコマンド。','セミコロン(;)区切りで複数コマンド。','MZ形式は「command:コマンド名 キー名:値 キー名:値 ...」の形式で記述'],
			maxWidth:512,
			placeholder:'(Enterで入力)',
			type:'string',
			input:true,
			button:true,
		},{
			key:'onAfterTransfer',default:0,
			integer:true,unit:1,min:0,max:1,
			help:'(リテインON時)マップ移動後にon/setコマンドを再実行',
		},{
			key:'onAfterSceneStart',default:0,
			integer:true,unit:1,min:0,max:1,
			help:'シーン再開時にon/setコマンドを再実行',
		},{
			key:'editorUpdate',default:"",
			integer:false,unit:0,
			help:['エディタ起動時に実行するupdate系関数の実行スクリプト(上級者向け)。','指定しないとエディタ上でエフェクトが反映されない可能性が高いです。'],
			maxWidth:512,
			type:'string',
			input:true,
			button:true,
		}
	],

	/* valueParams
	===================================*/
	valueParams:[
		{key:'command',default:"",
			integer:false,unit:0,v0:"",v10:"",
			help:['天候強さ変更時のコマンド。','セミコロン(;)区切りで複数コマンド。','「_DUR_」は所要時間(フレーム)に置換。','「_SEC_」は秒数に置換。MZ形式は「command:コマンド名 キー名:値 キー名:値 ...」の形式で記述'],
			maxWidth:512,
			type:'string',
			placeholder:'(Enterで入力)',
			input:true,
			button:true,
		}
	],
});







//──────────────────────────────────────────
//end editor scope
})();
//──────────────────────────────────────────