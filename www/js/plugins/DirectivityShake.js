//=============================================================================
// DirectivityShake.js
// ----------------------------------------------------------------------------
// Copyright (c) 2015-2016 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2016/11/03 初版
// ----------------------------------------------------------------------------
// [Blog]   : http://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:ja
 * @plugindesc DirectivityShakePlugin
 * @author triacontane
 *
 * @help イベントコマンド「画面のシェイク」に指向性を持たせることができます。
 * 角度を指定して縦や斜めに振動させることが可能です。
 *
 * また、振動方法を通常の方法以外にsin波に設定できます。独特の抑揚がつきます。
 *
 * 「画面のシェイク」を行う直前に、必要に応じて以下のコマンドを実行してください。
 * なお、シェイクが終了すると設定は自動でリセットされます。
 *
 * プラグインコマンド詳細
 *  イベントコマンド「プラグインコマンド」から実行。
 *  （パラメータの間は半角スペースで区切る）
 *
 * DS_方向設定 90     # 角度[90度]で振動します。(角度:0...360)
 * DS_SET_ROTATION 90 # 同上
 * DS_SIN振動         # 振動をsin波に設定します。
 * DS_SIN_WAVE        # 同上
 *
 * This plugin is released under the MIT License.
 */
/*:
 * @plugindesc 设置震动方向插件
 * @author トリアコンタン
 *
 * @help 可以为事件指令「震动屏幕」设置震动的方向。
 * 可设置角度纵向或倾斜震动。
 *
 * 此外，除了通常的方法以外，震动方法可以设置为sin波。有独特的感觉。
 *
 * 在执行「震动屏幕」之前，请根据需要执行以下命令:
 * 此外，震动结束后，设置会自动复原。
 *
 * 插件命令详细信息
 *  通过事件命令「插件命令」执行。
 *  （参数之间用半角空格分隔）
 *
 * DS_方向設定 90     # 以角度[90度]震动。(角度:0...360)
 * DS_SET_ROTATION 90 # 同上
 * DS_SIN振動         # 将震动设置为sin波。
 * DS_SIN_WAVE        # 同上
 *
 * 使用条款:
 *  可擅自修改、重新发布给作者，使用方式(商用、18禁使用等)
 *  也没有限制。
 *  这个插件已经是你的了。
 */

(function() {
    'use strict';
    var metaTagPrefix = 'DS_';

    var getCommandName = function(command) {
        return (command || '').toUpperCase();
    };

    var getArgNumber = function(arg, min, max) {
        if (arguments.length < 2) min = -Infinity;
        if (arguments.length < 3) max = Infinity;
        return (parseInt(convertEscapeCharacters(arg), 10) || 0).clamp(min, max);
    };

    var convertEscapeCharacters = function(text) {
        if (text == null) text = '';
        var windowLayer = SceneManager._scene._windowLayer;
        return windowLayer ? windowLayer.children[0].convertEscapeCharacters(text) : text;
    };

    //=============================================================================
    // Game_Interpreter
    //  プラグインコマンドを追加定義します。
    //=============================================================================
    var _Game_Interpreter_pluginCommand      = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.apply(this, arguments);
        var commandPrefix = new RegExp('^' + metaTagPrefix);
        if (!command.match(commandPrefix)) return;
        try {
            this.pluginCommandDirectivityShake(command.replace(commandPrefix, ''), args);
        } catch (e) {
            if ($gameTemp.isPlaytest() && Utils.isNwjs()) {
                var window = require('nw.gui').Window.get();
                if (!window.isDevToolsOpen()) {
                    var devTool = window.showDevTools();
                    devTool.moveTo(0, 0);
                    devTool.resizeTo(window.screenX + window.outerWidth, window.screenY + window.outerHeight);
                    window.focus();
                }
            }
            console.log('プラグインコマンドの実行中にエラーが発生しました。');
            console.log('- コマンド名 　: ' + command);
            console.log('- コマンド引数 : ' + args);
            console.log('- エラー原因   : ' + e.stack || e.toString());
        }
    };

    Game_Interpreter.prototype.pluginCommandDirectivityShake = function(command, args) {
        switch (getCommandName(command)) {
            case '方向設定' :
            case 'SET_ROTATION' :
                $gameScreen.setShakeRotation(getArgNumber(args[0]));
                break;
            case 'SIN振動' :
            case 'SIN_WAVE' :
                $gameScreen.setShakeSinWave();
                break;
			case '随机角度' :
			case 'RANDOM_ROTATION' :
			    $gameScreen.setShakeRandom();
			    break;	
        }
    };

    //=============================================================================
    // Game_Screen
    //  シェイクの方向を保持します。
    //=============================================================================
    Game_Screen.prototype.getShakeRotation = function() {
		if (this._shakeRandom) {
        // Math.random()*2π → 0–360°
        return Math.random() * Math.PI * 2;
      }
        return this._shakeRotation;
    };

    // 开启随机角度模式
    Game_Screen.prototype.setShakeRandom = function() {
        this._shakeRandom = true;
    };

    Game_Screen.prototype.setShakeRotation = function(value) {
        this._shakeRotation = value * Math.PI / 180;
    };

    Game_Screen.prototype.setShakeSinWave = function() {
        this._shakeSinWave = true;
    };

    var _Game_Screen_clearShake = Game_Screen.prototype.clearShake;
    Game_Screen.prototype.clearShake = function() {
        _Game_Screen_clearShake.apply(this, arguments);
        this.clearDirectivityShake();
    };

    Game_Screen.prototype.clearDirectivityShake = function() {
        this._shakeRotation = 0;
        this._shakeSinWave  = false;
		this._shakeRandom   = false;   // 重置随机震动标记
    };

    var _Game_Screen_updateShake = Game_Screen.prototype.updateShake;
    Game_Screen.prototype.updateShake = function() {
        var wasShake = this.isNeedShakeUpdate();
        if (this._shakeSinWave && wasShake) {
            this.updateSinShake();
        } else {
            _Game_Screen_updateShake.apply(this, arguments);
        }
        if (wasShake && !this.isNeedShakeUpdate()) {
            this.clearDirectivityShake();
        }
    };

    Game_Screen.prototype.updateSinShake = function() {
        this._shake = Math.sin(3 * this._shakeDuration * this._shakeSpeed * Math.PI / 180) * this._shakePower * 3;
        this._shakeDuration--;
    };

    Game_Screen.prototype.isNeedShakeUpdate = function() {
        return this._shakeDuration > 0 || this._shake !== 0;
    };

    //=============================================================================
    // Spriteset_Base
    //  シェイクの方向を反映します。
    //=============================================================================
    var _Spriteset_Base_updatePosition = Spriteset_Base.prototype.updatePosition;
    Spriteset_Base.prototype.updatePosition = function() {
        _Spriteset_Base_updatePosition.apply(this, arguments);
        var shakeRotation  = $gameScreen.getShakeRotation();
        if (shakeRotation) {
            var shakeDistance = Math.round($gameScreen.shake());
            this.x -= shakeDistance;
            this.x += Math.cos(shakeRotation) * shakeDistance;
            this.y += Math.sin(shakeRotation) * shakeDistance;
        }
    };
})();
