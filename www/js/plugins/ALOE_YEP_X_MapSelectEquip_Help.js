"use strict";

//=============================================================================
// Aloe Guvner - Map Select Equip Help Window
// ALOE_YEP_X_MapSelectEquip_Help.js
//=============================================================================

//=============================================================================
/*:
* @plugindesc v1.0.0 Extension of YEP_MapSelectEquip.
* Original author: Yanfly Engine Plugins
* @author Aloe Guvner
*
* @param helpWindowX
* @text Help Window X
* @type number
* @desc X coordinate of the help window
* @default 0
* 
* @param helpWindowY
* @text Help Window Y
* @type number
* @desc Y coordinate of the help window
* @default 0
* 
* @help
* ============================================================================
* Introduction
* ============================================================================
*
* This plugin is an extension of YEP_MapSelectEquip.js
* The purpose of the extension is to create a help window to show the
* equip description in the Map Select Equip window.
* 
* ============================================================================
* Changelog
* ============================================================================
*
* Version 1.0.0:
* - Initial version
*/
//=============================================================================

var ALOE = ALOE || {};
ALOE.YEP_X_MapSelectEquip_Help = ALOE.YEP_X_MapSelectEquip_Help || {};

var Imported = Imported || {};
Imported["ALOE_YEP_X_MapSelectEquip_Help"] = 1.00;

(function () {

    var params = PluginManager.parameters("ALOE_YEP_X_MapSelectEquip_Help");
    var x = 620;
    var y = 710;

    //=============================================================================
    // Scene_Map
    //=============================================================================
    // Alias of Scene_Map methods specific to the help window.
    // One new method to create the help window.
    //=============================================================================

    var Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function () {
        this.createMapSelectEquipHelpWindow();
        Scene_Map_createAllWindows.call(this);
    };

    var Scene_Map_createMapSelectEquipWindow = Scene_Map.prototype.createMapSelectEquipWindow;
    Scene_Map.prototype.createMapSelectEquipWindow = function () {
        Scene_Map_createMapSelectEquipWindow.call(this);
        this._MapSelectEquipWindow.setHelpWindow(this._mapSelectEquipHelpWindow);
    };

    var Scene_Map_processMapSelectEquipOk = Scene_Map.prototype.processMapSelectEquipOk;
    Scene_Map.prototype.processMapSelectEquipOk = function () {
        //this._mapSelectEquipHelpWindow.close();
        return Scene_Map_processMapSelectEquipOk.call(this);
    };

    var Scene_Map_onMapSelectEquipCancel = Scene_Map.prototype.onMapSelectEquipCancel;
    Scene_Map.prototype.onMapSelectEquipCancel = function () {
        this._mapSelectEquipHelpWindow.close();
        Scene_Map_onMapSelectEquipCancel.call(this);
    };

    var Scene_Map_setupMapSelectEquip = Scene_Map.prototype.setupMapSelectEquip;
    Scene_Map.prototype.setupMapSelectEquip = function (varId, actorId, stypeId, batchSelect) {
        Scene_Map_setupMapSelectEquip.call(this, varId, actorId, stypeId, batchSelect);
		let ew = this._MapSelectEquipWindow;
        let type = ew && ew._type ? String(ew._type) : '';
        let bgName = (type === 'WEAPONS') ? 'equip_weapon' : 'equip_gear';
		if ($gameSwitches.value(446)) bgName = 'equip_trashCan';
		if (this._mapSelectEquipHelpWindow && this._mapSelectEquipHelpWindow.setLayout) {
            this._mapSelectEquipHelpWindow.setLayout(bgName);
        }
        this._mapSelectEquipHelpWindow.open();		
    };

    Scene_Map.prototype.createMapSelectEquipHelpWindow = function () {
        this._mapSelectEquipHelpWindow = new Window_MapSelectEquipHelp(x, y);
        // 创建 Sprite 对象并加载背景图片
        let layoutSprite = new Sprite(ImageManager.loadSystem('equip_weapon'));
        layoutSprite.x = -20;
        layoutSprite.y = -630;
        layoutSprite.opacity = 255;
        //this._mapSelectEquipHelpWindow.addChild(layoutSprite);
		this._mapSelectEquipHelpWindow._layoutSprite = layoutSprite;
        this._mapSelectEquipHelpWindow.addChildAt(layoutSprite, 0);
        this.addWindow(this._mapSelectEquipHelpWindow);
    };

    //=============================================================================
    // Window_MapSelectEquipHelp
    //=============================================================================
    // New type of window which inherits prototypes from Window_Help
    //=============================================================================

    function Window_MapSelectEquipHelp() {
        this.initialize.apply(this, arguments);
    }

    Window_MapSelectEquipHelp.prototype = Object.create(Window_Help.prototype);
    Window_MapSelectEquipHelp.prototype.constructor = Window_MapSelectEquipHelp;

    Window_MapSelectEquipHelp.prototype.initialize = function (x, y) {
        Window_Help.prototype.initialize.call(this);
        this.openness = 0;
        this.x = x;
        this.y = y;
		this.width = 960;
        this.opacity = 0;  // 设置透明度为0
		
    };
	
	Window_MapSelectEquipHelp.prototype.setLayout = function(name) {
		if (!this._layoutSprite) return;
		this._layoutSprite.bitmap = ImageManager.loadSystem(name);
	};
	
})();