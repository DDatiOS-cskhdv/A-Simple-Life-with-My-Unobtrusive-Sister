
/*=============================================================================
 * CTB TouchInput
 * By CT_Bolt
 * CTB_TouchInput.js
 * Version: 0.97
 * Terms of Use:
 *   Free for commercial and non commercial use in projects.
 *
 *
/*=============================================================================*/

var CTB = CTB || {}; CTB.TouchInput  = CTB.TouchInput || {};
var Imported = Imported || {}; Imported["CT_Bolt TouchInput"] = 0.97;

//=============================================================================

/*:
 * @plugindesc CT_Bolt's TouchInput v0.97
 * @author CT_Bolt
 *
 * @param ---Turn Player---
 * @text Turn Player Settings
 *
 * @param Use TurnPlayer
 * @text Use TurnPlayer
 * @parent ---Turn Player---
 * @type Boolean
 * @desc True = will turn player toward the mouse
 * Default:
 * @default
 *
 * @param Turn Followers
 * @text Turn Followers
 * @parent ---Turn Player---
 * @type Boolean
 * @desc True = will turn followers toward the mouse
 * Default: true
 * @default true
 *
 * @param TurnPlayer_SwitchID
 * @text Game Switch ID
 * @parent ---Turn Player---
 * @type Number
 * @desc Turn Player To Mouse Game Switch ID (Optional)
 * Default:
 * @default
 *
 * @param ---Left Click Settings---
 * @text Left Click Settings
 *
 * @param Left Click Script
 * @text Left Click Script (Mouse Only)
 * @parent ---Left Click Settings---
 * @desc Left Click Script (Mouse Only) Overwrites Default
 * Default:
 * @default
 *
 * @param Left Click Up Script
 * @text Left Click Up Script (Mouse Only)
 * @parent ---Left Click Settings---
 * @desc Left Click Up Script (Mouse Only)
 * Default:
 * @default
 *
 * @param ---Right Click Settings---
 * @text Right Click Settings
 *
 * @param Disable Right Click
 * @text Disable Default Right Click/Multi Touch
 * @parent ---Right Click Settings---
 * @type Boolean
 * @desc True = will Disable Default Right Click/Multi Touch
 * Default:
 * @default
 *
 * @param DisableRightClick_SwitchID
 * @text Disable Default Action Game Switch ID
 * @parent ---Right Click Settings---
 * @type Number
 * @desc Disable Right Click Switch ID (Optional)
 * Default:
 * @default
 *
 * @param Right Click Script
 * @text Right Click Script (Mouse Only)
 * @parent ---Right Click Settings---
 * @desc Right Click Script (Mouse Only)
 * Default:
 * @default
 *
 * @param Right Click Up Script
 * @text Right Click Up Script (Mouse Only)
 * @parent ---Right Click Settings---
 * @desc Right Click Up Script (Mouse Only)
 * Default:
 * @default
 *
 * @help
 * CT_Bolt's TouchInput
 * Version 0.97
 * CT_Bolt
 *
 * ***************** Description **********************
 * Adjust parameters to suit your needs. :)
 * Happy Game Making!
 *
 * History Log:
 * Version 0.1  Alpha Release (12/08/2019)
 * Version 0.2  Added a couple new features (12/08/2019)
 * Version 0.3  Attempt to fix "UP" Sensitivity (12/08/2019)
 * Version 0.4  Added "TouchMove" Support (12/09/2019)
 * Version 0.5  Added Followers Support (12/09/2019)
 * Version 0.6  Added Right Click Down Script Call (12/09/2019)
 * Version 0.7  Added Right Click Released Script Call (12/09/2019)
 * Version 0.8  Added Left Click Script Call Calls (12/09/2019)
 * Version 0.9  Fixed message windows and sub windows (12/09/2019)
 * Version 0.93 Bugfix, left & right click fixed on "non-map" scenes (12/11/2019)
 * Version 0.97 Beta Release, new features added (12/12/2019)
 *
 */

//=============================================================================
// Core Functions
//=============================================================================
function getPluginParameters () {
    var a = document.currentScript || (function() {
        var b = document.getElementsByTagName('script');
        return b[b.length - 1];
    })();
    return PluginManager.parameters(a.src.substring((a.src.lastIndexOf('/') + 1), a.src.indexOf('.js')));
}
//=============================================================================
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================
CTB.Parameters = getPluginParameters();
var ctb = ctb || {};
ctb.useTurnPlayer = CTB.Parameters["Use TurnPlayer"] ? eval(CTB.Parameters["Use TurnPlayer"]) : null;
ctb.turnFollowers = CTB.Parameters["Turn Followers"] ? eval(CTB.Parameters["Turn Followers"]) : true;
ctb.turnPlayer_SwitchID = CTB.Parameters["TurnPlayer_SwitchID"] ? eval(CTB.Parameters["TurnPlayer_SwitchID"]) : 0;
ctb.disableRightClick = CTB.Parameters["Disable Right Click"] ? eval(CTB.Parameters["Disable Right Click"]) : null;
ctb.disableRightClick_SwitchID = CTB.Parameters["DisableRightClick_SwitchID"] ? eval(CTB.Parameters["DisableRightClick_SwitchID"]) : 0;

if (!Utils.isMobileDevice()) {
  // 安卓环境不需要这个插件的任何功能


//=============================================================================
//=============================================================================

function shootProjectile(id){
    if (id){
        id = eval(id);
        if ($gamePlayer.coolDown[id]){
            if (!$gamePlayer.coolDown[id].isCooling){
                $gameSwitches.setValue(id, true);
                console.log('...');
            }
        }else{
            $gameSwitches.setValue(id, true);
        }
    }
}

// Galv_MapProjectiles Patch
var _gmamp_ctb = Game_Map.prototype.addMapProjectile;
Game_Map.prototype.addMapProjectile = function(object) {
    if (this._mapProjectiles) _gmamp_ctb.call(this, object);
};

// Alias
var _gp_im_ctb = Game_Player.prototype.initMembers;
Game_Player.prototype.initMembers = function() {
    _gp_im_ctb.call(this);
    this.coolDown = {};
    this.coolDowns_ctb = [];
};

// Overwrite
TouchInput.isCancelled = function() {
    if (ctb.disableRightClick && SceneManager._scene instanceof Scene_Map) {
        var goOn = true;
        if (ctb.disableRightClick_SwitchID) {
            goOn = ($gameSwitches) ? $gameSwitches.value(ctb.disableRightClick_SwitchID) : false;
        }
        if (!goOn){
            return this._cancelled;
        }
    } else {
        return this._cancelled;
    }
};

// Alias
var _ti_olbd_ctb = TouchInput._onLeftButtonDown;
TouchInput._onLeftButtonDown = function(event) {
    if (!(SceneManager._scene instanceof Scene_Map)){
        _ti_olbd_ctb.call(this, event);
    } else {
        if (!CTB.Parameters["Left Click Script"] || $gamePlayer._mainMenu && $gamePlayer._mainMenu.inMenu || SceneManager._scene._messageWindow && (SceneManager._scene._messageWindow._openness > 0 || SceneManager._scene._messageWindow.isAnySubWindowActive())) {
            _ti_olbd_ctb.call(this, event);
        } else {
            var x = Graphics.pageToCanvasX(event.pageX);
            var y = Graphics.pageToCanvasY(event.pageY);
            if (Graphics.isInsideCanvas(x, y)) {
                this._mousePressed = true;
                this._pressedTime = 0;
                eval(CTB.Parameters["Left Click Script"]);
            }
        }
    }
};

// Alias
var _ti_omd_ctb = TouchInput._onMouseDown;
TouchInput._onMouseDown = function(event) {
    _ti_omd_ctb.call(this, event);

    if (event.button === 0) {

    } else if (event.button === 1) {

    } else if (event.button === 2) {
        this._x = Graphics.pageToCanvasX(event.pageX);
        this._y = Graphics.pageToCanvasY(event.pageY);
    }
};

// Alias
var _ti_omm_ctb = TouchInput._onMouseMove;
TouchInput._onMouseMove = function(event) {
    _ti_omm_ctb.call(this, event);
    this.updateTurnPlayer(event);
};

// Alias
var _ti_omu_ctb = TouchInput._onMouseUp;
TouchInput._onMouseUp = function(event) {
    if (!(SceneManager._scene instanceof Scene_Map)){
        _ti_omu_ctb.call(this, event);
    } else {
        _ti_omu_ctb.call(this, event);
        if (event.button === 0) {
            if (CTB.Parameters["Left Click Up Script"]) eval(CTB.Parameters["Left Click Up Script"]);
        }
        if (event.button === 2) {
            this._x = Graphics.pageToCanvasX(event.pageX);
            this._y = Graphics.pageToCanvasY(event.pageY);
            this._mousePressed = false;
            if (CTB.Parameters["Right Click Up Script"]) eval(CTB.Parameters["Right Click Up Script"]);
        }
    }
};

// Alias
var _ti_orbd_ctb = TouchInput._onRightButtonDown;
TouchInput._onRightButtonDown = function(event) {
    _ti_orbd_ctb.call(this, event);
    if (SceneManager._scene instanceof Scene_Map){
        var x = Graphics.pageToCanvasX(event.pageX);
        var y = Graphics.pageToCanvasY(event.pageY);
        if (Graphics.isInsideCanvas(x, y)) {
            this._mousePressed = true;
            this._pressedTime = 0;
            this._x = x;
            this._y = y;
        }
        if (SceneManager._scene._messageWindow && (SceneManager._scene._messageWindow._openness > 0 || SceneManager._scene._messageWindow.isAnySubWindowActive())) {
            var x = Graphics.pageToCanvasX(event.pageX);
            var y = Graphics.pageToCanvasY(event.pageY);
            if (Graphics.isInsideCanvas(x, y)) {
                this._onCancel(x, y);
            }
        } else {
            if (CTB.Parameters["Right Click Script"]) eval(CTB.Parameters["Right Click Script"]);
        }
    } else {
    }
};

// Alias
var _ti_u_ctb = TouchInput.update;
TouchInput.update = function() {
    _ti_u_ctb.call(this);
    if ($gamePlayer){
        if ($gamePlayer.coolDowns_ctb){
            for (var i = $gamePlayer.coolDowns_ctb.length - 1; i >= 0; i--){
                var id = eval($gamePlayer.coolDowns_ctb[i]);
                if ($gamePlayer.coolDown[id].isCooling){
                    $gamePlayer.coolDown[id].amount = $gamePlayer.coolDown[id].amount + 1;
                    $gamePlayer.coolDown[id].max = $gamePlayer.coolDown[id].max || 10;
                    if ($gamePlayer.coolDown[id].amount > $gamePlayer.coolDown[id].max){
                        $gamePlayer.coolDown[id].amount = 0;
                        $gamePlayer.coolDown[id].isCooling = false;
                        $gamePlayer.coolDowns_ctb.splice(i, 1);
                    }
                }
            }
        }
    }
};

// New
TouchInput.updateTurnPlayer = function(event) {
    if (ctb.useTurnPlayer) {		
        var goOn = true;
        if (ctb.turnPlayer_SwitchID) {
            goOn = ($gameSwitches) ? $gameSwitches.value(ctb.turnPlayer_SwitchID) : false;
        }
        if (SceneManager._scene && SceneManager._scene instanceof Scene_Map) {
            var messageWindow = SceneManager._scene._messageWindow;
            if (messageWindow && messageWindow._openness > 0) {
                goOn = false;
            } else if (messageWindow && typeof messageWindow.isAnySubWindowActive === 'function' && messageWindow.isAnySubWindowActive()) {
                goOn = false;
            }
        } else {
            goOn = false;
        }
        if (goOn) {
            if ($gamePlayer && $gameMap && $dataMap) {
                var playerX = $gamePlayer.screenX();
                var playerY = $gamePlayer.screenY();
                var mouseX = _drill_mouse_x / $gameScreen.zoomScale();
                var mouseY = _drill_mouse_y / $gameScreen.zoomScale();

                var dx = mouseX - playerX;
                var dy = mouseY - playerY;

						if ( navigator.getGamepads() && navigator.getGamepads()[0] !== null ) {
							$gamePlayer.refresh();
							return;
						}

                if (Math.abs(dx) > Math.abs(dy)) {			
						
                    if (dx > 0) {						
                        // 向右
                        if (!$gamePlayer.isMoving()) {
                            $gamePlayer._directionFix = false;
                            $gamePlayer.setDirection(6);
                        }
                        if (TouchInput.drill_isLeftPressed() || TouchInput.drill_isLeftTriggered()){
                            $gamePlayer._directionFix = false;
                            $gamePlayer.setDirection(6);
                            $gamePlayer._directionFix = true;
                        }
                    } else {
                        // 向左
                        if (!$gamePlayer.isMoving()) {
                            $gamePlayer._directionFix = false;
                            $gamePlayer.setDirection(4);
                        }
                        if (TouchInput.drill_isLeftPressed() || TouchInput.drill_isLeftTriggered()){
                            $gamePlayer._directionFix = false;
                            $gamePlayer.setDirection(4);
                            $gamePlayer._directionFix = true;
                        }
                    }
                } else {
                    if (dy > 0) {
                        // 向下
                        if (!$gamePlayer.isMoving()) {
                            $gamePlayer._directionFix = false;
                            $gamePlayer.setDirection(2);
                        }
                        if (TouchInput.drill_isLeftPressed() || TouchInput.drill_isLeftTriggered()){
                            $gamePlayer._directionFix = false;
                            $gamePlayer.setDirection(2);
                            $gamePlayer._directionFix = true;
                        }
                    } else {
                        // 向上
                        if (!$gamePlayer.isMoving()) {
                            $gamePlayer._directionFix = false;
                            $gamePlayer.setDirection(8);
                        }
                        if (TouchInput.drill_isLeftPressed() || TouchInput.drill_isLeftTriggered()){
                            $gamePlayer._directionFix = false;
                            $gamePlayer.setDirection(8);
                            $gamePlayer._directionFix = true;
                        }
                    }
                }
                $gamePlayer.refresh();
            }
        }
    }
};


}


