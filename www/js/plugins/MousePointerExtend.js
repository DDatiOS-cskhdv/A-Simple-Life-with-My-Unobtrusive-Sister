//=============================================================================
// MousePointerExtend.js
// ----------------------------------------------------------------------------
// (C)2016 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 2.0.3 2020/10/28 マウスポインタを変更したときに画面からポインタを出して戻すと、ポインタが元に戻ってしまう問題を修正(by 奏ねこま様)
// 2.0.2 2020/10/26 2.0.0の修正以後、「キー入力で消去」のパラメータが正常に機能していなかった問題を修正
// 2.0.1 2020/03/24 ポインタに独自画像を使用する場合に発生しうる現象と対策についてヘルプに追記
// 2.0.0 2019/10/17 型指定機能に対応
//                  独自画像ファイルを指定するときにダイアログから指定すると拡張子がつかず正常に表示できない問題を修正
// 1.1.1 2016/07/20 独自画像をpictures以外のフォルダに格納できる機能を追加
// 1.1.0 2016/07/18 形状の種類と独自画像の最大数を3から5に拡張
// 1.0.0 2016/07/17 初版
// ----------------------------------------------------------------------------
// [Blog]   : https://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:
 * @plugindesc Mouse Pointer Extend Plugin
 * @author triacontane
 *
 * @param PointerType1
 * @desc スイッチ1がONになった場合のマウス形状です。
 * @default auto
 *
 * @param PointerSwitch1
 * @desc 形状タイプ1が有効になるスイッチ番号です。
 * @default 0
 *
 * @param PointerType2
 * @desc スイッチ2がONになった場合のマウス形状です。
 * @default auto
 *
 * @param PointerSwitch2
 * @desc 形状タイプ2が有効になるスイッチ番号です。
 * @default 0
 *
 * @param PointerType3
 * @desc スイッチ3がONになった場合のマウス形状です。
 * @default auto
 *
 * @param PointerSwitch3
 * @desc 形状タイプ3が有効になるスイッチ番号です。
 * @default 0
 *
 * @param PointerType4
 * @desc スイッチ4がONになった場合のマウス形状です。
 * @default auto
 *
 * @param PointerSwitch4
 * @desc 形状タイプ4が有効になるスイッチ番号です。
 * @default 0
 *
 * @param PointerType5
 * @desc スイッチ5がONになった場合のマウス形状です。
 * @default auto
 *
 * @param PointerSwitch5
 * @desc 形状タイプ5が有効になるスイッチ番号です。
 * @default 0
 *
 * @param DefaultType
 * @desc デフォルトのマウス形状です。
 * @default auto
 *
 * @param CustomImage1
 * @desc マウスポインタに使用する画像ファイル名(/img/picture/)です。正方形の32*32程度の画像を用意してください。
 * @default
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param CustomImage2
 * @desc マウスポインタに使用する画像ファイル名(/img/picture/)です。正方形の32*32程度の画像を用意してください。
 * @default
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param CustomImage3
 * @desc マウスポインタに使用する画像ファイル名(/img/picture/)です。正方形の32*32程度の画像を用意してください。
 * @default
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param CustomImage4
 * @desc マウスポインタに使用する画像ファイル名(/img/picture/)です。正方形の32*32程度の画像を用意してください。
 * @default
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param CustomImage5
 * @desc マウスポインタに使用する画像ファイル名(/img/picture/)です。正方形の32*32程度の画像を用意してください。
 * @default
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param ErasePointer
 * @desc キーもしくはパッド入力によりポインタを一時的に消去します。マウスを動かすと再び出現します。
 * @default ON
 *
 * @param PointerPath
 * @desc カーソル用の独自画像を/pictures/以外に配置したい場合にパス名を指定してください。区切り文字[/]は不要。
 * @default
 *
 * @help マウスポインタの形状や表示可否を拡張します。
 * スイッチ条件に応じた多彩な形状変化や、独自画像のポインタ利用
 * 何らかのキー・パッド入力で非表示化する機能を提供します。
 *
 * ポインタの形状タイプは以下の文字列を指定します。
 * auto : 自動(初期値)
 * none : 非表示
 * default : デフォルト
 * pointer : リンク
 * crosshair : 十字
 * move : 移動
 * text : テキスト
 * wait : 処理中
 * help : ヘルプ
 * url1 : 独自画像1(パラメータ参照)
 * url2 : 独自画像2(パラメータ参照)
 * url3 : 独自画像3(パラメータ参照)
 * url4 : 独自画像4(パラメータ参照)
 * url5 : 独自画像5(パラメータ参照)
 *
 * ※独自画像を指定する場合は、別途画像ファイル名をパラメータに設定してください。
 * ファイル名に加えて拡張子の設定が必要です。(例：icon.png)
 *
 * スイッチ条件を満たしたのに画像が表示されない場合は、ファイルパスが間違っているか
 * 指定した画像をアイコンとして利用できないかのどちらかの可能性が高いです。
 *
 * 形状変化用のスイッチは3つまで指定可能で複数の条件を満たした場合は
 * 「1」→「2」→「3」の優先度になります。
 *
 * また、「キー入力で消去」を有効にするとキーもしくはパッド入力により
 * ポインタを一時的に画面から消去できます。
 * マウス主体の操作を行わない場合にポインタが邪魔にならないための仕様です。
 * マウス関連のイベントが発生すると再びポインタが表示されます。
 *
 * このプラグインにはプラグインコマンドはありません。
 *
 * This plugin is released under the MIT License.
 */
/*:ja
 * @plugindesc マウスポインタ拡張プラグイン
 * @author トリアコンタン
 *
 * @param 形状タイプ1
 * @desc スイッチ1がONになった場合のマウス形状です。
 * @default auto
 * @type select
 * @option auto : 自動(初期値)
 * @value auto
 * @option none : 非表示
 * @value none
 * @option default : デフォルト
 * @value default
 * @option pointer : リンク
 * @value pointer
 * @option crosshair : 十字
 * @value crosshair
 * @option move : 移動
 * @value move
 * @option text : テキスト
 * @value text
 * @option wait : 処理中
 * @value wait
 * @option help : ヘルプ
 * @value help
 * @option url1 : 独自画像1(パラメータ参照)
 * @value url1
 * @option url2 : 独自画像2(パラメータ参照)
 * @value url2
 * @option url3 : 独自画像3(パラメータ参照)
 * @value url3
 * @option url4 : 独自画像4(パラメータ参照)
 * @value url4
 * @option url5 : 独自画像5(パラメータ参照)
 * @value url5
 *
 * @param スイッチ1
 * @desc 形状タイプ1が有効になるスイッチ番号です。
 * @default 0
 * @type switch
 *
 * @param 形状タイプ2
 * @desc スイッチ2がONになった場合のマウス形状です。
 * @default auto
 * @type select
 * @option auto : 自動(初期値)
 * @value auto
 * @option none : 非表示
 * @value none
 * @option default : デフォルト
 * @value default
 * @option pointer : リンク
 * @value pointer
 * @option crosshair : 十字
 * @value crosshair
 * @option move : 移動
 * @value move
 * @option text : テキスト
 * @value text
 * @option wait : 処理中
 * @value wait
 * @option help : ヘルプ
 * @value help
 * @option url1 : 独自画像1(パラメータ参照)
 * @value url1
 * @option url2 : 独自画像2(パラメータ参照)
 * @value url2
 * @option url3 : 独自画像3(パラメータ参照)
 * @value url3
 * @option url4 : 独自画像4(パラメータ参照)
 * @value url4
 * @option url5 : 独自画像5(パラメータ参照)
 * @value url5
 *
 * @param スイッチ2
 * @desc 形状タイプ2が有効になるスイッチ番号です。
 * @default 0
 * @type switch
 *
 * @param 形状タイプ3
 * @desc スイッチ3がONになった場合のマウス形状です。
 * @default auto
 * @type select
 * @option auto : 自動(初期値)
 * @value auto
 * @option none : 非表示
 * @value none
 * @option default : デフォルト
 * @value default
 * @option pointer : リンク
 * @value pointer
 * @option crosshair : 十字
 * @value crosshair
 * @option move : 移動
 * @value move
 * @option text : テキスト
 * @value text
 * @option wait : 処理中
 * @value wait
 * @option help : ヘルプ
 * @value help
 * @option url1 : 独自画像1(パラメータ参照)
 * @value url1
 * @option url2 : 独自画像2(パラメータ参照)
 * @value url2
 * @option url3 : 独自画像3(パラメータ参照)
 * @value url3
 * @option url4 : 独自画像4(パラメータ参照)
 * @value url4
 * @option url5 : 独自画像5(パラメータ参照)
 * @value url5
 *
 * @param スイッチ3
 * @desc 形状タイプ3が有効になるスイッチ番号です。
 * @default 0
 * @type switch
 *
 * @param 形状タイプ4
 * @desc スイッチ4がONになった場合のマウス形状です。
 * @default auto
 * @type select
 * @option auto : 自動(初期値)
 * @value auto
 * @option none : 非表示
 * @value none
 * @option default : デフォルト
 * @value default
 * @option pointer : リンク
 * @value pointer
 * @option crosshair : 十字
 * @value crosshair
 * @option move : 移動
 * @value move
 * @option text : テキスト
 * @value text
 * @option wait : 処理中
 * @value wait
 * @option help : ヘルプ
 * @value help
 * @option url1 : 独自画像1(パラメータ参照)
 * @value url1
 * @option url2 : 独自画像2(パラメータ参照)
 * @value url2
 * @option url3 : 独自画像3(パラメータ参照)
 * @value url3
 * @option url4 : 独自画像4(パラメータ参照)
 * @value url4
 * @option url5 : 独自画像5(パラメータ参照)
 * @value url5
 *
 * @param スイッチ4
 * @desc 形状タイプ4が有効になるスイッチ番号です。
 * @default 0
 * @type switch
 *
 * @param 形状タイプ5
 * @desc スイッチ5がONになった場合のマウス形状です。
 * @default auto
 * @type select
 * @option auto : 自動(初期値)
 * @value auto
 * @option none : 非表示
 * @value none
 * @option default : デフォルト
 * @value default
 * @option pointer : リンク
 * @value pointer
 * @option crosshair : 十字
 * @value crosshair
 * @option move : 移動
 * @value move
 * @option text : テキスト
 * @value text
 * @option wait : 処理中
 * @value wait
 * @option help : ヘルプ
 * @value help
 * @option url1 : 独自画像1(パラメータ参照)
 * @value url1
 * @option url2 : 独自画像2(パラメータ参照)
 * @value url2
 * @option url3 : 独自画像3(パラメータ参照)
 * @value url3
 * @option url4 : 独自画像4(パラメータ参照)
 * @value url4
 * @option url5 : 独自画像5(パラメータ参照)
 * @value url5
 *
 * @param スイッチ5
 * @desc 形状タイプ5が有効になるスイッチ番号です。
 * @default 0
 * @type switch
 *
 * @param デフォルト形状タイプ
 * @desc デフォルトのマウス形状です。
 * @default auto
 * @type select
 * @option auto : 自動(初期値)
 * @value auto
 * @option none : 非表示
 * @value none
 * @option default : デフォルト
 * @value default
 * @option pointer : リンク
 * @value pointer
 * @option crosshair : 十字
 * @value crosshair
 * @option move : 移動
 * @value move
 * @option text : テキスト
 * @value text
 * @option wait : 処理中
 * @value wait
 * @option help : ヘルプ
 * @value help
 * @option url1 : 独自画像1(パラメータ参照)
 * @value url1
 * @option url2 : 独自画像2(パラメータ参照)
 * @value url2
 * @option url3 : 独自画像3(パラメータ参照)
 * @value url3
 * @option url4 : 独自画像4(パラメータ参照)
 * @value url4
 * @option url5 : 独自画像5(パラメータ参照)
 * @value url5
 *
 * @param 独自画像1
 * @desc マウスポインタに使用する画像ファイル名(/img/picture/)です。正方形の32*32程度の画像を用意してください。
 * @default
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 独自画像2
 * @desc マウスポインタに使用する画像ファイル名(/img/picture/)です。正方形の32*32程度の画像を用意してください。
 * @default
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 独自画像3
 * @desc マウスポインタに使用する画像ファイル名(/img/picture/)です。正方形の32*32程度の画像を用意してください。
 * @default
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 独自画像4
 * @desc マウスポインタに使用する画像ファイル名(/img/picture/)です。正方形の32*32程度の画像を用意してください。
 * @default
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 独自画像5
 * @desc マウスポインタに使用する画像ファイル名(/img/picture/)です。正方形の32*32程度の画像を用意してください。
 * @default
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param キー入力で消去
 * @desc キーもしくはパッド入力によりポインタを一時的に消去します。マウスを動かすと再び出現します。
 * @default true
 * @type boolean
 *
 * @param ポインタファイルパス
 * @desc カーソル用の独自画像を/pictures/以外に配置したい場合にパス名を指定してください。区切り文字[/]は不要。
 * @default
 *
 * @help マウスポインタの形状や表示可否を拡張します。
 * スイッチ条件に応じた多彩な形状変化や、独自画像のポインタ利用
 * 何らかのキー・パッド入力で非表示化する機能を提供します。
 *
 * ポインタの形状タイプは以下の文字列を指定します。
 * auto : 自動(初期値)
 * none : 非表示
 * default : デフォルト
 * pointer : リンク
 * crosshair : 十字
 * move : 移動
 * text : テキスト
 * wait : 処理中
 * help : ヘルプ
 * url1 : 独自画像1(パラメータ参照)
 * url2 : 独自画像2(パラメータ参照)
 * url3 : 独自画像3(パラメータ参照)
 * url4 : 独自画像4(パラメータ参照)
 * url5 : 独自画像5(パラメータ参照)
 *
 * ※独自画像を指定する場合は、別途画像ファイル名をパラメータに設定してください。
 * ファイル名に加えて拡張子の設定が必要です。(例：icon.png)
 *
 * スイッチ条件を満たしたのに画像が表示されない場合は、ファイルパスが間違っているか
 * 指定した画像をアイコンとして利用できないかのどちらかの可能性が高いです。
 * アニメーションカーソル(.ani)は使用できません。
 * また、gifファイルは使用できますがアニメーションしません。
 *
 * 形状変化用のスイッチは複数指定可能で複数の条件を満たした場合は
 * より数字の小さい方（「1」→「2」→「3」...の順番）が優先されます。
 *
 * また、「キー入力で消去」を有効にするとキーもしくはパッド入力により
 * ポインタを一時的に画面から消去できます。
 * マウス主体の操作を行わない場合にポインタが邪魔にならないための仕様です。
 * マウス関連のイベントが発生すると再びポインタが表示されます。
 *
 * このプラグインにはプラグインコマンドはありません。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 */

(() => {
    'use strict';

    const PLUGIN_NAME = 'MousePointerExtend';

    const getParamOther = (paramNames) => {
        const names = Array.isArray(paramNames) ? paramNames : [paramNames];
        for (const name of names) {
            const value = PluginManager.parameters(PLUGIN_NAME)[name];
            if (value) return value;
        }
        return null;
    };

    const getParamString = (paramNames) => {
        return getParamOther(paramNames) ?? '';
    };

    const getParamBoolean = (paramNames) => {
        const value = (getParamOther(paramNames) || '').toUpperCase();
        return value === 'ON' || value === 'TRUE';
    };

    const paramDefaultType = getParamString(['DefaultType', 'デフォルト形状タイプ']) || 'auto';
    const paramErasePointer = getParamBoolean(['ErasePointer', 'キー入力で消去']);

    //=============================================================================
    // Input - 鍵盤輸入時隱藏指針
    //=============================================================================
    const _Input_update = Input.update;
    Input.update = function () {
        const oldDate = this.date;
        _Input_update.apply(this, arguments);
        if (paramErasePointer && this.date !== oldDate) {
            Graphics.setHiddenPointer(true);
        }
    };

    //=============================================================================
    // TouchInput - 移動時恢復指針顯示
    //=============================================================================
    const _TouchInput__onMouseMove = TouchInput._onMouseMove;
    TouchInput._onMouseMove = function (event) {
        _TouchInput__onMouseMove.apply(this, arguments);
        if (paramErasePointer) {
            Graphics.setHiddenPointer(false);
        }
    };

    //=============================================================================
    // Graphics - 指針控制
    //=============================================================================
    Object.assign(Graphics, {
        _PointerType: paramDefaultType,
        _hiddenPointer: false,

        setHiddenPointer(value) {
            this._hiddenPointer = !!value;
            this.updateMousePointer();
        },

        setPointerType(type) {
            this._PointerType = type;
            this.updateMousePointer();
        },

        updateMousePointer() {
            document.body.style.cursor = this._hiddenPointer ? 'none' : this._PointerType;
        }
    });

    //=============================================================================
    // 直接調用
    //=============================================================================
    window.CustomCursor = {
        /**
         * 直接設置指針圖片
         * @param {string} imagePath - 圖片路徑（相對於項目根目錄）
         * @example 
         * CustomCursor.setImg('img/pictures/cursor_hand.png')
         * CustomCursor.setImg('data:image/png;base64,...')
         */
        setImg(imagePath) {
            Graphics.setPointerType(`url(${imagePath}), default`);
        },

        /**
         * 設置 CSS 指針類型
         * @param {string} type - CSS cursor 類型
         * @example 
         * CustomCursor.setType('pointer')
         * CustomCursor.setType('crosshair')
         */
        setType(type) {
            Graphics.setPointerType(type);
        },

        /**
         * 隱藏指針
         */
        hide() {
            Graphics.setHiddenPointer(true);
        },

        /**
         * 顯示指針
         */
        show() {
            Graphics.setHiddenPointer(false);
        },

        /**
         * 重置為預設指針
         */
        reset() {
            Graphics.setPointerType(paramDefaultType);
        }
    };

})();