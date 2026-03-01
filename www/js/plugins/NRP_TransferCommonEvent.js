//=============================================================================
// NRP_TransferCommonEvent.js
//=============================================================================
/*:ja
 * @target MV MZ
 * @plugindesc v1.01 Call common events before and after the Transfer Player.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/482680388.html
 *
 * @help Call common events before and after the Transfer Player.
 * 
 * This is useful, for example,
 * for creating your own fade-out/fade-in process.
 * Of course, it is also useful if you want to set up a common process
 * after the Transfer Player.
 * 
 * [Usage]
 * Set the plugin parameter to the common event you want to call.
 * Once set, it will be enabled for any Transfer Player.
 * 
 * You can also force the fade type to change via the plug-in command.
 * For example, if you add your own fade process in the middle of production,
 * you will have to waste a wait if the default fade is still 'Black'.
 * In such a case, you can change the fade to "None"
 * in the "BeforeCommonEvent".
 * 
 * Alternatively, you may want to revert to normal fade processing.
 * In that case, too, you can use a switch or
 * something just before the Transfer Player
 * to switch within the "BeforeCommonEvent".
 * 
 * [Plugin Command (MZ)]
 * ◆DisableCommonEvent
 * Temporarily disable the common event on change transfer.
 * Return to the original with false.
 * 
 * ◆ChangeTransferInfo
 * You can change the fade-in type.
 * Specify it in BeforeCommonEvent, etc.
 * Note that once transferred, the setting will be cleared.
 * 
 * [Plugin Command (MV)]
 * ※No distinction is made between individual capital letters. Also, do not include [].
 * 
 * ◆DisableCommonEvent
 * NRP.TransferCommonEvent.DisableCommonEvent [true/false]
 * 
 * ◆ChangeTransferInfo
 * NRP.TransferCommonEvent.ChangeTransferInfo [Fade Type]
 * 
 * Specify the fade type as a number.
 * 0 = Black, 1 = white, 2 = None
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 * 
 * @command DisableCommonEvent
 * @desc Temporarily disable the common event on change transfer.
 * 
 * @arg Disable
 * @desc Temporarily disable the common event on change transfer.
 * Return to the original with false.
 * @type boolean
 * @default true
 * 
 * 
 * @command ChangeTransferInfo
 * @desc Change the information about Transfer Player.
 * 
 * @arg FadeType
 * @desc Change the fade type.
 * @type select
 * @option Black @value 0
 * @option White @value 1
 * @option None @value 2
 * 
 * 
 * @param BeforeCommonEvent
 * @type common_event
 * @desc A common event to be executed before the transfer.
 * To be precise, it will be executed before the default fade-out.
 * 
 * @param AfterCommonEvent
 * @type common_event
 * @desc A common event to be executed after the transfer.
 * To be precise, it will be executed before the default fade-in.
 */

/*:
 * @target MV MZ
 * @plugindesc v1.01 NRP_转移公共事件
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/482680388.html
 *
 * @help 在场所移动前后执行公共事件。
 * 
 * 例如，它对于创建自己的淡入/淡出操作非常有用。
 * 当然，想设置场所移动后的通用处理时也有效。
 * 
 * ■使用方法
 * 请在插件参数中设置要执行的公共事件。
 * 设置后，对所有的地方移动都有效。
 * 
 * 此外，还可以通过插件命令强制更改淡入淡出的方式。
 * 例如，如果在制作过程中添加了自己的淡入淡出，
 * 则如果默认淡入淡出保留为『黑色』，
 * 则会产生不必要的等待时间。
 * 这种情况下，在移动前公共事件内将淡入淡出更改为『无』即可。
 * 
 * 或者，也可能想恢复到平常的淡入淡出处理。
 * 此时，只要在即将移动场所之前使用开关等，
 * 在移动前在公共事件内进行切换即可。
 * 
 * ■插件命令（ＭＺ）
 * ◆コモンイベントの無効化
 * 一時的に場所移動時のコモンイベントを無効化します。
 * falseなら元に戻ります。
 * 
 * ◆場所移動情報の変更
 * フェードインの方法を変更できます。
 * 移動前コモンイベントなどで指定してください。
 * なお、一度場所移動すると設定はクリアされます。
 * 
 * ■插件命令（ＭＶ）
 * ※不区分大小写。 此外，请勿包含[]。
 * 
 * ◆禁用公共事件
 * NRP.TransferCommonEvent.DisableCommonEvent [true/false]
 * 
 * ◆场所移动信息的更改
 * NRP.TransferCommonEvent.ChangeTransferInfo [如何淡入淡出]
 * 
 * 请以数值设置淡入淡出的方式。
 * 　0 = 黑, 1 = 白, 2 = 无
 * 来自定义。
 * 
 * ■使用条款
 * 没有特别的限制。
 * 改变、重新分发自由、可以商用、权利表示也是任意的。
 * 作作者不负责，但关于问题将在可能的范围内处理。
 * 
 * @command DisableCommonEvent
 * @text 禁用公共事件
 * @desc 临时禁用场所移动时的公共事件。
 * 
 * @arg Disable
 * @text 无效化
 * @desc 临时禁用位置移动时的公共事件。
 * 如果为false，则恢复原状。
 * @type boolean
 * @default true
 * 
 * 
 * @command ChangeTransferInfo
 * @text 场所移动信息的更改
 * @desc 更改场所移动有关的信息。
 * 
 * @arg FadeType
 * @text フェード
 * @desc フェード方法を変更します。
 * @type select
 * @option 黒 @value 0
 * @option 白 @value 1
 * @option なし @value 2
 * 
 * 
 * @param BeforeCommonEvent
 * @text 移动前公共事件
 * @type common_event
 * @desc 场所移动前执行的公共事件。
 * 确切地说，在默认淡出前执行。
 * 
 * @param AfterCommonEvent
 * @text 移动后公共事件
 * @type common_event
 * @desc 场所移动后执行的公共事件。
 * 确切地说，它在默认淡入后执行。
 */
(function() {
"use strict";

function toBoolean(val, def) {
    // 空白なら初期値を返す
    if (val === "" || val === undefined) {
        return def;
        
    // 既にboolean型なら、そのまま返す
    } else if (typeof val === "boolean") {
        return val;
    }
    // 文字列ならboolean型に変換して返す
    return val.toLowerCase() == "true";
}
function toNumber(str, def) {
    if (str == "") {
        return def;
    }
    return isFinite(str) ? str : def;
}

const PLUGIN_NAME = "NRP_TransferCommonEvent";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pBeforeCommonEvent = toNumber(parameters["BeforeCommonEvent"]);
const pAfterCommonEvent = toNumber(parameters["AfterCommonEvent"]);

// 場所移動時のコモンイベント無効
let mDisableCommonEvent = false;
// フェード対応の変更用
let mChangeFadeType = undefined;

//----------------------------------------
// ＭＺ用プラグインコマンド
//----------------------------------------

// MVには存在しないため、空で定義しておかないとエラーになる。
if (!PluginManager.registerCommand) {
    PluginManager.registerCommand = function() {}
}

/**
 * ●【ＭＺ用プラグインコマンド】コモンイベントの無効化
 */
PluginManager.registerCommand(PLUGIN_NAME, "DisableCommonEvent", function(args) {
    mDisableCommonEvent = toBoolean(args.Disable);
});

/**
 * ●【ＭＺ用プラグインコマンド】場所移動情報の変更
 */
PluginManager.registerCommand(PLUGIN_NAME, "ChangeTransferInfo", function(args) {
    mChangeFadeType = toNumber(args.FadeType);
});

//----------------------------------------
// ＭＶ用プラグインコマンド
//----------------------------------------

const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);

    // 小文字化してから判定
    const lowerCommand = command.toLowerCase();
    
    /**
     * ●コモンイベントの無効化
     */
    if (lowerCommand === "nrp.transfercommonevent.disablecommonevent") {
        mDisableCommonEvent = toBoolean(args[0]);

    /**
     * ●場所移動情報の変更
     */
    } else if (lowerCommand === "nrp.transfercommonevent.changetransferinfo") {
        mChangeFadeType = toNumber(args[0]);
    }
};

//----------------------------------------
// 場所移動処理
//----------------------------------------

/**
 * ●コマンド実行
 */
const _Game_Interpreter_executeCommand = Game_Interpreter.prototype.executeCommand;
Game_Interpreter.prototype.executeCommand = function() {
    // 無効化されている場合は元処理を呼び出し。
    if (mDisableCommonEvent) {
        return _Game_Interpreter_executeCommand.apply(this, arguments);
    }


    // 場所移動後
    if (this._transferCommonEventMode == 2) {
        // 場所移動後のコモンイベントを実行
        if (pAfterCommonEvent) {
            this.setupChild($dataCommonEvents[pAfterCommonEvent].list, 0);
            // NRP_CallEvent.jsとの連携用
            this._childInterpreter.setCommonEventId(pBeforeCommonEvent);
        }

        // 処理終了のフラグ
        this._transferCommonEventMode = 0;

        return true;
    }

    const command = this.currentCommand();
    if (command) {
        const methodName = "command" + command.code;

        // 場所移動ならば
        if (methodName == "command201") {
            // 場所移動前
            if (!this._transferCommonEventMode) {
                // 場所移動前のコモンイベントを実行
                if (pBeforeCommonEvent) {
                    this.setupChild($dataCommonEvents[pBeforeCommonEvent].list, 0);
                    // NRP_CallEvent.jsとの連携用
                    this._childInterpreter.setCommonEventId(pBeforeCommonEvent);
                }
                // 次の処理へのフラグ
                this._transferCommonEventMode = 1;

                return true;

            // 場所移動処理実行
            } else if (this._transferCommonEventMode == 1) {
                // 次の処理へのフラグ
                this._transferCommonEventMode = 2;
            }
        }
    }

    return _Game_Interpreter_executeCommand.apply(this, arguments);
};

/**
 * ●場所移動（イベントコマンド）
 * ※MVとMZで引数が異なるので制御
 */
// MVの場合
if (Utils.RPGMAKER_NAME == "MV") {
    const _Game_Interpreter_command201 = Game_Interpreter.prototype.command201;
    Game_Interpreter.prototype.command201 = function() {
        // フェードタイプの変更が指定されている場合
        if (mChangeFadeType !== undefined) {
            this._params[5] = mChangeFadeType;
            mChangeFadeType = undefined;
        }

        return _Game_Interpreter_command201.call(this);
    };

// MZの場合
} else {
    const _Game_Interpreter_command201 = Game_Interpreter.prototype.command201;
    Game_Interpreter.prototype.command201 = function(params) {
        // フェードタイプの変更が指定されている場合
        if (mChangeFadeType !== undefined) {
            params[5] = mChangeFadeType;
            mChangeFadeType = undefined;
        }

        return _Game_Interpreter_command201.call(this, params);
    };
}

/**
 * 【独自】コモンイベントＩＤを設定する。
 * ※NRP_CallEvent.jsとの連携用
 */
Game_Interpreter.prototype.setCommonEventId = function(commonEventId) {
    this._commonEventId = commonEventId;
};

})();
