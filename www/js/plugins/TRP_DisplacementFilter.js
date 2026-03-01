//=============================================================================
// TRP_DisplacementFilter.js
//=============================================================================
/*:
 * @plugindesc 水中マップ用のゆらぎフィルター
 * @author Thirop
 * @help
 *
 * 1.img/systemフォルダに指定する画像名の変形用画像ファイルを配置
 * 2.マップのメモ欄に設定を記述
 * <displacement:x方向スピード,y方向スピード,拡大率,画像名>
 * 拡大率を省略時のデフォルト値は20
 * 画像名を省略時のデフォルト値はDisplacementMap
 *
 */
//============================================================================= 

(function () {
	var parameters = PluginManager.parameters('TRP_DisplacementFilter');


	//=============================================================================
	// Game_Screen
	//=============================================================================
	var _Game_Screen_clear = Game_Screen.prototype.clear;
	Game_Screen.prototype.clear = function () {
		_Game_Screen_clear.call(this);
		this._displacementSetting = null;
	};

	// Game_Screen.prototype.startDisplacementFilter = function(sx,sy,scale,image){			// modified by nekoma from
	Game_Screen.prototype.startDisplacementFilter = function (sx, sy, scale, image, parallax) {	// modified by nekoma to
		this._displacementSetting = {
			sx: sx || 0,
			sy: sy || 0,
			scale: scale || 20,
			// image:image||'DisplacementMap'	// modified by nekoma from
			image: image || 'DisplacementMap',
			parallax: parallax					// modified by nekoma to
		};
	};
	Game_Screen.prototype.clearDisplacementFilter = function (sx, sy, scale, image) {
		this._displacementSetting = null;
	};


	//=============================================================================
	// Game_Map
	//=============================================================================
	var _Game_Map_setup = Game_Map.prototype.setup;
	Game_Map.prototype.setup = function (mapId) {
		_Game_Map_setup.call(this, mapId);

		var displacement = $dataMap.meta ? $dataMap.meta.displacement : null;
		var parallax_displacement = $dataMap.meta ? $dataMap.meta.parallax_displacement : null;	// added by nekoma
		if (displacement) {
			this.setupDisplacement(displacement);
		} else if (parallax_displacement) {							// added by nekoma from
			this.setupDisplacement(parallax_displacement, true);	// added by nekoma to
		} else {
			$gameScreen.clearDisplacementFilter();
		}
	};

	// Game_Map.prototype.setupDisplacement = function(displacement){			// modified by nekoma from
	Game_Map.prototype.setupDisplacement = function (displacement, parallax) {	// modified by nekoma to
		var dispArgs = displacement.split(',');
		var sx = Number(dispArgs[0]);
		var sy = Number(dispArgs[1]);
		var scale = Number(dispArgs[2]) || 0;
		var image = dispArgs[3];
		// $gameScreen.startDisplacementFilter(sx,sy,scale,image);			// modified by nekoma from
		$gameScreen.startDisplacementFilter(sx, sy, scale, image, parallax);	// modified by nekoma to
	};


	//=============================================================================
	// Scene_Map
	//=============================================================================
	var _Scene_Map_initialize = Scene_Map.prototype.initialize;
	Scene_Map.prototype.initialize = function () {
		_Scene_Map_initialize.call(this);
		this.clearDisplacement();
	};

	Scene_Map.prototype.clearDisplacement = function () {
		this._displacement = {
			image: '',
			scale: 0,
			filter: null,
			dx: -1,
			dy: -1
		};
	};

	var _Scene_Map_update = Scene_Map.prototype.update;
	Scene_Map.prototype.update = function () {
		_Scene_Map_update.call(this);

		this.updateDisplacementFilter();
	};

	Scene_Map.prototype.updateDisplacementFilter = function () {
		var setting = $gameScreen._displacementSetting;
		if (setting) {
			if (this._displacement.image !== setting.image) {
				this._displacement.image = setting.image;
				this.setupDisplacementFilters(setting);
			} else if (this._displacement.filter) {
				this._updateDisplacemenFilters(setting);
			}
		} else if (this._displacement.filter) {
			ths.removeDisplacementFilter();
		}
	};
	Scene_Map.prototype._updateDisplacemenFilters = function (setting) {
		var displacement = this._displacement;
		var filter = displacement.filter;
		filter.maskSprite.x += setting.sx;
		filter.maskSprite.y += setting.sy;

		var dx = $gameMap.displayX();
		if (displacement.dx !== dx) {
			filter.maskSprite.x += (displacement.dx - dx) * 48;
			displacement.dx = dx;
		}
		var dy = $gameMap.displayY();
		if (displacement.dy !== dy) {
			filter.maskSprite.y += (displacement.dy - dy) * 48;
			displacement.dy = dy;
		}


		if (this._displacement.scale !== setting.scale) {
			this._displacement.scale = setting.scale;
			filter.scale = new PIXI.Point(setting.scale, setting.scale);
		}
	};

	Scene_Map.prototype.setupDisplacementFilters = function (setting) {
		if (!ConfigManager.screenEffect) return;
		if (!this._displacement.filter) {
			this.createDisplacementFilter(setting);
		}
		var bitmap = ImageManager.loadSystem(setting.image);
		bitmap.addLoadListener(function (bitmap) {
			bitmap.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
		});

		this._displacement.filter.maskSprite.bitmap = bitmap;

		this._displacement.scale = setting.scale;
		this._displacement.filter.scale = new PIXI.Point(setting.scale, setting.scale);
	};

	Scene_Map.prototype.createDisplacementFilter = function (setting) {
		var sprite = new Sprite();
		var filter = new PIXI.filters.DisplacementFilter(sprite);
		this.addChild(sprite);
		this._displacement.filter = filter;
        // 设置 zIndex
        filter.zIndex = 10;
		if (setting.parallax) {											// added by nekoma from
			var allFilters = this._spriteset._parallax.filters || [];
			allFilters.push(filter);
			this._spriteset._parallax.filters = allFilters;
			return;
		}																// added by nekoma to

		var allFilters = this.filters || [];
		allFilters.push(filter);
		this.filters = allFilters;
	};

	Scene_Map.prototype.removeDisplacementFilter = function () {
		var setting = $gameScreen._displacementSetting;	// added by nekoma
		// var allFilters = this.filters;														// modified by nekoma from
		var allFilters = setting.parallax ? this._spriteset._parallax.filters : this.filters;	// modified by nekoma to
		var filter = this._displacement.filter;
		var index = allFilters.indexOf(filter);
		if (index >= 0) {
			allFilters.splice(index, 1);
		}
		// this.filters = allFilters;						// modified by nekoma from
		if (setting.parallax) {
			this._spriteset._parallax.filters = allFilters;
		} else {
			this.filters = allFilters;
		}													// modified by nekoma to

		if (filter.maskSprite.parent) {
			filter.maskSprite.parent.removeChild(filter.maskSprite);
		}

		this.clearDisplacement();

	};


	var Alias_ConfigManager_makeData = ConfigManager.makeData;
	ConfigManager.makeData = function () {
		var config = Alias_ConfigManager_makeData.call(this);
		config.screenEffect = true;
		return config;
	};

	var Alias_ConfigManager_applyData = ConfigManager.applyData;
	ConfigManager.applyData = function (config) {
		Alias_ConfigManager_applyData.call(this, config);
		if (config.screenEffect === undefined) config.screenEffect = true;
		this.screenEffect = this.readFlag(config, 'screenEffect');
	};

	/*var Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
	Window_Options.prototype.addGeneralOptions = function () {
		Window_Options_addGeneralOptions.call(this);
		this.addCommand('画面効果', 'screenEffect');
	};
    */


})();
