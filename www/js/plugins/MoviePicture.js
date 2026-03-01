//=============================================================================
// MoviePicture.js
// ----------------------------------------------------------------------------
// (C)2017 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.8.0 2024/08/08 読み込みが完了したタイミングでONになるスイッチを追加
// 1.7.4 2022/11/20 動画ピクチャの再生でエラーになる原因不明のケースに対処
// 1.7.3 2022/09/16 動画のロード完了とマップ遷移が同一フレームで起こるとエラーになる不具合を修正
// 1.7.2 2020/09/21 autoplayをtrueに変更
// 1.7.1 2019/08/26 他のプラグインとの組み合わせによりエラーになる可能性のある記述を修正
// 1.7.0 2019/06/30 動画の取得元フォルダと拡張子を変更して動画を難読化できるようにしました。
// 1.6.0 2019/06/29 複数の動画を並行してロードしているときは、すべての動画のロードが完了してから再生するよう変更しました
//                  一定フレームで動画を中断させるコマンドを追加
// 1.5.1 2019/06/29 画面遷移したとき、動画でないピクチャまで非表示になってしまう問題を修正
// 1.5.0 2019/06/11 動画再生終了後、動画ピクチャを自動削除せず最終フレームで静止したままにする機能を追加
// 1.4.1 2019/05/21 動画を縮小表示したときのジャギを軽減
//                  ヘルプの記載を本体バージョン1.6を前提に修正
// 1.4.0 2019/01/06 movieフォルダ以外の場所に配置されている動画ファイルを再生できる機能を追加
// 1.3.3 2018/11/08 再生開始直後に停止したとき、特定条件下で正常に停止しない問題を修正
// 1.3.2 2018/06/17 ピクチャの消去によって動画再生を終了した場合に、再生速度と音量が初期化されない問題を修正
// 1.3.1 2017/08/27 二連続で再生したときに動画の音量同期機能が正常に動作しない問題を修正
// 1.3.0 2017/08/26 動画の音量をいずれかのオーディオ音量と同期させる機能を追加
// 1.2.0 2017/08/18 動画の再生速度(倍率)を変更できるプラグインコマンドを追加
// 1.1.0 2017/08/09 アルファチャンネル付き動画の再生に対応（ただし特定の手順を踏む必要あり）
// 1.0.3 2017/08/08 エラー処理を追加
// 1.0.2 2017/08/07 環境に関する制約を追加
// 1.0.1 2017/08/07 リファクタリング（仕様の変更はなし）
// 1.0.0 2017/08/06 初版
// ----------------------------------------------------------------------------
// [Blog]   : https://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:
 * @plugindesc MovieInScreenPlugin
 * @author triacontane
 *
 * @param MovieVolumeType
 * @desc 動画再生時に音声が含まれる場合、その音量を参照するオーディオ種別です。指定しない場合、常に100%で再生されます。
 * @default none
 * @type select
 * @option none
 * @option BGM
 * @option BGS
 * @option ME
 * @option SE
 *
 * @param AutoEraseOnEnd
 * @desc 動画再生終了時に動画ピクチャを自動で削除します。
 * @default true
 * @type boolean
 *
 * @param MovieFolder
 * @desc 動画ファイルの取得元フォルダです。指定しない場合は「movies」フォルダが使用されます。
 * @default
 *
 * @param WebmExt
 * @desc webm形式を再生するときの偽装拡張子です。難読化したい場合に指定します。対応フォーマットが増えるわけではありません。
 * @default nlch
 *
 * @param Mp4Ext
 * @desc mp4形式を再生するときの偽装拡張子です。難読化したい場合に指定します。対応フォーマットが増えるわけではありません。
 * @default
 *
 * @param OnLoadSwitch
 * @desc 動画ファイルの読み込み完了時にONになるスイッチ番号です。
 * @default 0
 * @type switch
 *
 * @help Play movies using the picture display frame.
 * In addition to being subject to processing by moving and rotating pictures,
 * parallel playback of multiple videos
 * It will be possible. Also, the movie will be displayed at the bottom of
 * the window. However, it does not correspond to "color tone change of picture".
 *
 * This plugin can only be used with core script ver1.5.0 or later.
 *
 * Currently there is a problem that the video may not be played properly
 * with PC Firefox. For the time being we will only support local execution.
 *
 * After preparing movie files with plug-in command "MP_SET_MOVIE"
 * Please execute the event designation "Show Picture"
 * with the file designation empty.
 *
 * Plugin Command
 *
 * MP_SET_MOVIE file  # 動画ファイル[file]を準備します。
 * MP_SET_LOOP 1 on   # ピクチャ番号[1]の動画がループ再生されます。
 * MP_SET_PAUSE 1 on  # ピクチャ番号[1]の動画が一時停止します。
 * MP_SET_WAIT 1      # ピクチャ番号[1]の動画が再生するまでイベントを待機します。
 * MP_SET_VOLUME 1 50 # ピクチャ番号[1]の動画の音量を50%に設定します。
 * MP_SET_SPEED 1 150 # ピクチャ番号[1]の動画の再生速度を150%に設定します。
 *
 * Prepare a video file that exists in a path other than the movie folder.
 * The [path] you specify is relative to the path where the save folder exists.
 * Extension is required.
 * MP_SET_OUTER_MOVIE path # 動画ファイル[path]を準備します。拡張子必須
 * MP_外部動画設定 path    # 同上
 *
 * Set the movie sound volume type.
 * MP_SET_VOLUME_TYPE BGM
 *
 * Caution：
 * If you play multiple large movies, the performance may be degraded.
 *
 * This plugin is released under the MIT License.
 */
/*:ja
 * @plugindesc 動画のピクチャ表示プラグイン
 * @author トリアコンタン
 *
 * @param 動画音量種別
 * @desc 動画再生時に音声が含まれる場合、その音量を参照するオーディオ種別です。指定しない場合、常に100%で再生されます。
 * @default none
 * @type select
 * @option none
 * @option BGM
 * @option BGS
 * @option ME
 * @option SE
 *
 * @param 終了時自動削除
 * @desc 動画再生終了時に動画ピクチャを自動で削除します。削除しない場合、動画は最終フレームで静止します。
 * @default true
 * @type boolean
 *
 * @param 動画取得フォルダ
 * @desc 動画ファイルの取得元フォルダです。指定しない場合は「movies」フォルダが使用されます。末尾のスラッシュは不要です。
 * @default
 *
 * @param webm偽装拡張子
 * @desc webm形式を再生するときの偽装拡張子です。難読化したい場合に指定します。対応フォーマットが増えるわけではありません。
 * @default
 *
 * @param mp4偽装拡張子
 * @desc mp4形式を再生するときの偽装拡張子です。難読化したい場合に指定します。対応フォーマットが増えるわけではありません。
 * @default
 *
 * @param 読み込み完了スイッチ
 * @desc 動画ファイルの読み込み完了時にONになるスイッチ番号です。
 * @default 0
 * @type switch
 *
 * @help ピクチャの表示枠を使って動画を再生します。
 * ピクチャの移動や回転による処理の対象になるほか、複数の動画の並行再生が
 * 可能になります。また、動画がウィンドウの下に表示されるようになります。
 * ただし「ピクチャの色調変更」には対応していません。
 *
 * このプラグインは本体ver1.6.0以降でのみ使用できます。
 *
 * 現在、スマートデバイスで実行したときに動画が最初のフレームで停止する
 * 現象を確認しています。
 * よって当面の間はローカル実行(Game.exe)のみをサポート対象とします。
 *
 * プラグインコマンド「MP_SET_MOVIE」で動画ファイルを準備してから
 * イベントコマンド「ピクチャの表示」をファイル指定を空で実行してください。
 *
 * プラグインコマンド詳細
 *  イベントコマンド「プラグインコマンド」から実行。
 *  （パラメータの間は半角スペースで区切る）
 *
 * MP_SET_MOVIE file    # 動画ファイル[file]を準備します。拡張子不要。
 * MP_動画設定 file     # 同上
 * MP_SET_LOOP 1 on     # ピクチャ番号[1]の動画がループ再生されます。
 * MP_ループ設定 1 on   # 同上(offでループ再生を解除します)
 * MP_SET_PAUSE 1 on    # ピクチャ番号[1]の動画が一時停止します。
 * MP_ポーズ設定 1 on   # 同上(offで再生を再開します)
 * MP_SET_WAIT 1        # ピクチャ番号[1]の動画が再生するまでイベントを待機します。
 * MP_ウェイト設定 1    # 同上
 * MP_SET_LIMIT 1 50    # ピクチャ番号[1]の動画を50フレームで中断します。
 * MP_リミット設定 1 50 # 同上
 * MP_SET_VOLUME 1 50   # ピクチャ番号[1]の動画の音量を50%に設定します。
 * MP_音量設定 1 50     # 同上
 * MP_SET_SPEED 1 150   # ピクチャ番号[1]の動画の再生速度を150%に設定します。
 * MP_速度設定 1 150    # 同上
 *
 * movieフォルダ以外のパスに存在する動画ファイルを準備します。
 * 指定する[path]は、フルパスもしくはsaveフォルダの存在するパスからの相対パスです。
 * 拡張子が必要です。
 * MP_SET_OUTER_MOVIE path # 動画ファイル[path]を準備します。拡張子必須
 * MP_外部動画設定 path    # 同上
 *
 * 動画音量種別を設定します。設定する内容はプラグインパラメータ「動画音量種別」と
 * 同じです。プラグインパラメータの設定より優先されます。
 * MP_音量種別設定 BGM
 * MP_SET_VOLUME_TYPE BGM
 *
 * アルファチャンネル付き動画を使用する場合は、
 * プラグインコマンド「MP_SET_MOVIE」実行時に二つめの引数をonにしてください。
 * MP_SET_MOVIE file on
 *
 * ※ スマートデバイス環境(.mp4を使用)では透過を使用できません。
 *    こちらはコーデック(H.264)の仕様なのでプラグイン側では対応できません。
 *
 * ・スクリプト詳細
 * 指定した番号の動画ピクチャが再生終了している場合にtrueを返します。
 * 存在しないピクチャ番号を指定するとエラーになります。
 * このスクリプトはパラメータ「終了時自動削除」が無効な場合のみ使えます。
 * $gameScreen.picture(2).isVideoEnd(); # ピクチャ[2]の再生が終了している場合にtrue
 *
 * 注意：
 * サイズの大きな動画を複数再生すると、パフォーマンスが低下する可能性があります。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 */

(function() {
    'use strict';
    var pluginName    = 'MoviePicture';
    var metaTagPrefix = 'MP_';

    //=============================================================================
    // ローカル関数
    //  プラグインパラメータやプラグインコマンドパラメータの整形やチェックをします
    //=============================================================================
    var getParamString = function(paramNames) {
        if (!Array.isArray(paramNames)) paramNames = [paramNames];
        for (var i = 0; i < paramNames.length; i++) {
            var name = PluginManager.parameters(pluginName)[paramNames[i]];
            if (name) return name;
        }
        return '';
    };

    var getParamNumber = function(paramNames, min, max) {
        var value = getParamString(paramNames);
        if (arguments.length < 2) min = -Infinity;
        if (arguments.length < 3) max = Infinity;
        return (parseInt(value) || 0).clamp(min, max);
    };

    var getParamBoolean = function(paramNames) {
        var value = getParamString(paramNames);
        return value.toUpperCase() === 'TRUE';
    };

    var convertEscapeCharacters = function(text) {
        if (isNotAString(text)) text = '';
        var windowLayer = SceneManager._scene._windowLayer;
        return windowLayer ? windowLayer.children[0].convertEscapeCharacters(text) : text;
    };

    var isNotAString = function(args) {
        return String(args) !== args;
    };

    var convertAllArguments = function(args) {
        for (var i = 0; i < args.length; i++) {
            args[i] = convertEscapeCharacters(args[i]);
        }
        return args;
    };

    var getArgNumber = function(arg, min, max) {
        if (arguments.length < 2) min = -Infinity;
        if (arguments.length < 3) max = Infinity;
        return (parseInt(arg) || 0).clamp(min, max);
    };

    var getArgBoolean = function(arg) {
        return arg && (arg.toUpperCase() === 'ON' || arg.toUpperCase() === 'TRUE');
    };

    var setPluginCommand = function(commandName, methodName) {
        pluginCommandMap.set(metaTagPrefix + commandName, methodName);
    };

    //=============================================================================
    // パラメータの取得と整形
    //=============================================================================
    var param             = {};
    param.movieVolumeType = getParamString(['MovieVolumeType', '動画音量種別']).toUpperCase();
    param.autoEraseOnEnd  = getParamBoolean(['AutoEraseOnEnd', '終了時自動削除']);
    param.movieFolder     = getParamString(['MovieFolder', '動画取得フォルダ']);
    param.webmExt         = 'nlch';
    param.mp4Ext          = '';
	param.onLoadSwitch = 125;
	
    var pluginCommandMap = new Map();
    setPluginCommand('SET_MOVIE', 'execSetVideoPicture');
    setPluginCommand('動画設定', 'execSetVideoPicture');
    setPluginCommand('SET_LOOP', 'execSetVideoLoop');
    setPluginCommand('ループ設定', 'execSetVideoLoop');
    setPluginCommand('SET_SPEED', 'execSetVideoSpeed');
    setPluginCommand('速度設定', 'execSetVideoSpeed');
    setPluginCommand('SET_PAUSE', 'execSetVideoPause');
    setPluginCommand('ポーズ設定', 'execSetVideoPause');
    setPluginCommand('SET_WAIT', 'execSetVideoWait');
    setPluginCommand('ウェイト設定', 'execSetVideoWait');
    setPluginCommand('SET_LIMIT', 'execSetVideoLimit');
    setPluginCommand('リミット設定', 'execSetVideoLimit');
    setPluginCommand('SET_VOLUME', 'execSetVideoVolume');
    setPluginCommand('音量設定', 'execSetVideoVolume');
    setPluginCommand('SET_VOLUME_TYPE', 'execSetVideoVolumeType');
    setPluginCommand('音量種別設定', 'execSetVideoVolumeType');
    setPluginCommand('SET_OUTER_MOVIE', 'execSetOuterVideoPicture');
    setPluginCommand('外部動画設定', 'execSetOuterVideoPicture');

    //=============================================================================
    // Game_Interpreter
    //  プラグインコマンドを追加定義します。
    //=============================================================================
    var _Game_Interpreter_pluginCommand      = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.apply(this, arguments);
        var pluginCommandMethod = pluginCommandMap.get(command.toUpperCase());
        if (pluginCommandMethod) {
            this[pluginCommandMethod](convertAllArguments(args));
        }
    };

    Game_Interpreter.prototype.execSetVideoPicture = function(args) {
        $gameScreen.setVideoPictureName(args[0], getArgBoolean(args[1]), false);
    };

    Game_Interpreter.prototype.execSetOuterVideoPicture = function(args) {
        $gameScreen.setVideoPictureName(args[0], getArgBoolean(args[1]), true);
    };

    Game_Interpreter.prototype.execSetVideoLoop = function(args) {
        var picture = $gameScreen.picture(getArgNumber(args[0]), 1);
        if (picture) {
            picture.setVideoLoop(getArgBoolean(args[1]));
        }
    };

    Game_Interpreter.prototype.execSetVideoPause = function(args) {
        var picture = $gameScreen.picture(getArgNumber(args[0]), 1);
        if (picture) {
            picture.setVideoPause(getArgBoolean(args[1]));
        }
    };

    Game_Interpreter.prototype.execSetVideoVolume = function(args) {
        var picture = $gameScreen.picture(getArgNumber(args[0]), 1);
        if (picture) {
            picture.setVideoVolume(getArgNumber(args[1], 0, 100));
        }
    };

    Game_Interpreter.prototype.execSetVideoLimit = function(args) {
        var picture = $gameScreen.picture(getArgNumber(args[0]), 1);
        if (picture) {
            picture.setFrameLimit(getArgNumber(args[1], 0));
        }
    };

    Game_Interpreter.prototype.execSetVideoVolumeType = function(args) {
        var picture = $gameScreen.picture(getArgNumber(args[0]), 1);
        if (picture) {
            picture.setVideoVolumeType(args[1]);
        }
    };

    Game_Interpreter.prototype.execSetVideoWait = function(args) {
        var picture = $gameScreen.picture(getArgNumber(args[0]), 1);
        if (picture) {
            picture.setVideoWait(true);
            this._waitMode = 'videoPicture';
        }
    };

    Game_Interpreter.prototype.execSetVideoSpeed = function(args) {
        var picture = $gameScreen.picture(getArgNumber(args[0]), 1);
        if (picture) {
            picture.setVideoSpeed(getArgNumber(args[1], 10, 500));
        }
    };

    var _Game_Interpreter_updateWaitMode      = Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode = function() {
        if (this._waitMode === 'videoPicture') {
            var waiting = $gameScreen.isVideoWaiting();
            if (!waiting) {
                this._waitMode = '';
            }
            return waiting;
        } else {
            return _Game_Interpreter_updateWaitMode.apply(this, arguments);
        }
    };

    //=============================================================================
    // Utils
    //  動作環境を判定します。
    //=============================================================================
    Utils.isPcChrome = function() {
        var agent = navigator.userAgent;
        return !!(!agent.match(/Android/) && agent.match(/Chrome/)) && !this.isNwjs();
    };

    //=============================================================================
    // Game_Screen
    //  動画ピクチャを準備します。
    //=============================================================================
    Game_Screen.prototype.setVideoPictureName = function(movieName, useAlpha, useOuter) {
        this._videoUseAlpha = useAlpha;
        if (useOuter && Utils.isNwjs() && !movieName.match(/^[A-Z]:/)) {
            const path             = require('path');
            this._videoPictureName = path.join(path.dirname(StorageManager.localFileDirectoryPath()), movieName);
        } else {
            this._videoPictureName = movieName;
        }
		// 重置视频播放准备开关
		$gameSwitches.setValue(param.onLoadSwitch, false);
		
    };

    Game_Screen.prototype.getVideoPictureName = function() {
        return this._videoPictureName;
    };

    Game_Screen.prototype.isVideoUseAlpha = function() {
        return this._videoUseAlpha;
    };

    Game_Screen.prototype.clearVideoPictureName = function() {
        this._videoPictureName = null;
        this._videoUseAlpha    = null;
    };

    Game_Screen.prototype.isVideoWaiting = function() {
        return this._pictures.some(function(picture) {
            return picture && picture.isVideoWait();
        });
    };

    //=============================================================================
    // Game_Picture
    //  動画ピクチャに関連するプロパティを追加定義します。
    //=============================================================================
    var _Game_Picture_show      = Game_Picture.prototype.show;
    Game_Picture.prototype.show = function(name, origin, x, y, scaleX,
                                           scaleY, opacity, blendMode) {
        _Game_Picture_show.apply(this, arguments);
        var videoName = $gameScreen.getVideoPictureName();
        if (videoName && !name) {
            this._name          = videoName;
            this._video         = true;
            this._ended         = false;
            this._videoUseAlpha = $gameScreen.isVideoUseAlpha();
            this.setVideoVolume(100);
            this.setVideoVolumeType(param.movieVolumeType);
            $gameScreen.clearVideoPictureName();
        } else {
            this._video = false;
        }
    };

    Game_Picture.prototype.isVideo = function() {
        return this._video;
    };

    Game_Picture.prototype.isVideoUseAlpha = function() {
        return this._videoUseAlpha;
    };

    Game_Picture.prototype.setVideoLoop = function(value) {
        this._loopVideo = this.isVideo() && value;
    };

    Game_Picture.prototype.isVideoLoop = function() {
        return this._loopVideo;
    };

    Game_Picture.prototype.setVideoPause = function(value) {
        this._pauseVideo = this.isVideo() && value;
    };

    Game_Picture.prototype.isVideoPause = function() {
        return this._pauseVideo;
    };

    Game_Picture.prototype.setVideoWait = function(value) {
        this._waitVideo = this.isVideo() && value;
    };

    Game_Picture.prototype.isVideoWait = function() {
        return this._waitVideo;
    };

    Game_Picture.prototype.setVideoVolume = function(value) {
        this._volumeVideo = value;
    };

    Game_Picture.prototype.getVideoRealVolume = function() {
        return this._volumeVideo * AudioManager.getVideoPictureVolume(this._volumeVideoType);
    };

    Game_Picture.prototype.setVideoVolumeType = function(value) {
        this._volumeVideoType = value;
    };

    Game_Picture.prototype.setVideoSpeed = function(value) {
        this._speedVideo = value;
    };

    Game_Picture.prototype.getVideoSpeed = function() {
        return this._speedVideo || 100;
    };

    Game_Picture.prototype.setVideoPosition = function(value) {
        this._positionVideo = value;
    };

    Game_Picture.prototype.getVideoPosition = function() {
        return this._positionVideo || 0;
    };

    // used by user script
    Game_Picture.prototype.isVideoEnd = function() {
        return this._ended
    };

    Game_Picture.prototype.setVideoEnd = function() {
        this._ended = true;
		this.setVideoWait(false);
		
    };

    Game_Picture.prototype.setFrameLimit = function(value) {
        this._frameLimit = value;
    };

    Game_Picture.prototype.getFrameLimit = function() {
        return this._frameLimit;
    };

    Game_Picture.prototype.resumeAnimationPlayback = function(options) {
		options = options || {};
		var seekToStart = (options.seekToStart !== false); // 默认回到开头
		var setLoopHasVal = (typeof options.loop === 'boolean');

		// 取当前场景的图片容器
		var scene = SceneManager._scene;
		var cont  = scene && scene._spriteset && scene._spriteset._pictureContainer;
		if (!cont || !cont.children) return false;

		// 反向查找：sprite.picture() === this
		var spr = null;
		for (var i = 0; i < cont.children.length; i++) {
		  var s = cont.children[i];
		  if (s && typeof s.picture === 'function' && s.picture() === this) { spr = s; break; }
		}
		if (!spr || !spr.bitmap) return false;

		var bmp = spr.bitmap;
		if (!(bmp && typeof bmp.isVideo === 'function' && bmp.isVideo())) return false;

		// 可选：设置循环
		if (setLoopHasVal) this.setVideoLoop(!!options.loop);

		// 清“已结束”标记（两处）
		this._ended = false;
		bmp._ended = false;

		// 回到起点更稳（避免停在尾帧仍被判 ended）
		if (seekToStart && typeof bmp.setCurrentTime === 'function') {
		  try { bmp.setCurrentTime(0.01); } catch(e) {}
		}

		// 取消暂停并开始播放
		this.setVideoPause(false);
		if (typeof bmp.play === 'function') {
		  try { bmp.play(); } catch(e) {}
		}

		return true;
	 };
	
Game_Map.prototype.getPictureVideoCurrentTime = function(pictureId) {
	
	if (!$gameScreen.picture(pictureId)) return 0;
	
	const ss = SceneManager._scene && SceneManager._scene._spriteset;
	const container = ss && ss._pictureContainer;
	if (!container) return 0;
    var sprite = container.children.find(s => s._pictureId === pictureId);
    if (sprite && sprite.bitmap && sprite.bitmap.isVideo && sprite.bitmap.isVideo()) {

        return sprite.bitmap.getCurrentTime();
    }
    return 0;
};

Game_Map.prototype.setPictureVideoCurrentTime = function(pictureId, seconds) {
	
	if (!$gameScreen.picture(pictureId)) return false;
	
	const ss = SceneManager._scene && SceneManager._scene._spriteset;
	const container = ss && ss._pictureContainer;
	if (!container) return 0;
    var sprite = container.children.find(s => s._pictureId === pictureId);
    if (sprite && sprite.bitmap && sprite.bitmap.isVideo && sprite.bitmap.isVideo()) {
		if (typeof sprite.bitmap.setCurrentTime !== 'function') {
			return;
		}
        sprite.bitmap.setCurrentTime(seconds);
    }
};

// 预加载视频并把纹理固定在首帧（0.01），避免后续 showPicture 先闪到别的帧
ImageManager.preloadVideo = function(filename, alpha, time) {
  const t = (time != null) ? Number(time) : 0.01;
  const bmp = this.loadVideo(filename, !!alpha);

  bmp.addLoadListener(() => {
    const v = bmp._video;
    if (!v) return;

    try { v.pause(); } catch (e) {}
	try { v.autoplay = false; } catch (e) {} // 保险
	  // 如果是 Bitmap_Video 路线，baseTexture 可能是 PIXI.VideoBaseTexture
	  try {
		if (bmp._baseTexture && 'autoPlay' in bmp._baseTexture) bmp._baseTexture.autoPlay = false;
	  } catch (e) {}
	  
    const onSeeked = () => {
      v.removeEventListener('seeked', onSeeked);
      // 对透明视频（drawImage 路线）这一步会把当前帧真正画进纹理里
      try { bmp.update?.(); } catch (e) {}
      try { bmp._baseTexture?.update?.(); } catch (e) {}
    };

    try {
      v.addEventListener('seeked', onSeeked, { once: true });
      v.currentTime = Math.max(0.01, t);
    } catch (e) {
      // 某些环境 seek 会 throw，就不强求
    }
  });

  return bmp;
};
    //=============================================================================
    // Sprite_Picture
    //  ムービーピクチャを読み込みます。
    //=============================================================================
    var _Sprite_Picture_loadBitmap      = Sprite_Picture.prototype.loadBitmap;
    Sprite_Picture.prototype.loadBitmap = function() {
        if (this.picture().isVideo()) {
            this.loadVideo();
        } else {
            _Sprite_Picture_loadBitmap.apply(this, arguments);
        }
    };

    Sprite_Picture.prototype.loadVideo = function() {
        if (SceneManager.isBattleStartUnexpectedLoad()) {
            return;
        }
        if (this.isVideoPicture()) {
            this.bitmap.destroy();
        }
        this.bitmap = ImageManager.loadVideo(this._pictureName, this.picture().isVideoUseAlpha());
        this.bitmap.addLoadListener(function() {
            this.prepareVideo();
        }.bind(this));
        this._loadingState = 'loading';
    };

    Sprite_Picture.prototype.prepareVideo = function() {
		
		if (!this.bitmap || typeof this.bitmap.setCurrentTime !== 'function') {
			this._loadingState = 'error';
            if (this.picture()) this.picture().setVideoWait(false); 
			return;
		}
        this.refreshForVideo();
        this._playStart = true;
        var picture     = this.picture();
        if (picture) {
            this.bitmap.setCurrentTime(picture.getVideoPosition());
            this._volume = null;
            this.updateVideoVolume();
        }
        this._loadingState = 'prepared';
    };

    Sprite_Picture.prototype.refreshForVideo = function() {
        this._refresh();
    };

    var _Sprite_Picture_updateBitmap      = Sprite_Picture.prototype.updateBitmap;
    Sprite_Picture.prototype.updateBitmap = function() {
        if (!this.picture()) {
            this.clearVideo();
        }
        _Sprite_Picture_updateBitmap.apply(this, arguments);
        this.updateVideo();
    };

    var _Sprite_Picture_setBlendColor      = Sprite_Picture.prototype.setBlendColor;
    Sprite_Picture.prototype.setBlendColor = function(color) {
        if (this.isVideoPicture()) return;
        _Sprite_Picture_setBlendColor.apply(this, arguments);
    };

  Sprite_Picture.prototype.updateVideo = function () {
    if (!this.isVideoPicture()) return
    this.bitmap.update();
    if (this.bitmap.isEnded()) {
      this.finishVideo();
      return;
    }
    if (this.picture() && this._playStart) {
      this.updateVideoSpeed();
      this.updateVideoPause();
      this.updateVideoVolume();
      this.updateVideoLoop();
      this.updateVideoWaiting();
      this.updateVideoFrameLimit();
    }
  }


    Sprite_Picture.prototype.updateVideoSpeed = function() {
        var speed = this.picture().getVideoSpeed() / 100;
        if (speed !== this._speed) {
            this._speed = speed;
            this.bitmap.setVideoSpeed(speed);
        }
    };

    Sprite_Picture.prototype.updateVideoPause = function() {
        var pause = this.picture().isVideoPause();
        if (this._pause && !pause) {
            this.bitmap.play();
        }
        if (!this._pause && pause) {
            this.bitmap.pause();
        }
        this._pause = pause;
    };

    Sprite_Picture.prototype.updateVideoLoop = function() {
        this.bitmap.setVideoLoop(this.picture().isVideoLoop());
    };

    Sprite_Picture.prototype.updateVideoVolume = function() {
        var volume = this.picture().getVideoRealVolume();
        if (volume !== this._volume) {
            this._volume = volume;
            this.bitmap.setVolume(volume / 100);
        }
    };

    Sprite_Picture.prototype.updateVideoWaiting = function() {
        var picture = this.picture();
        if (picture.isVideoWait() && !this.bitmap.isFirstLap()) {
            picture.setVideoWait(false);
        }
    };

    Sprite_Picture.prototype.updateVideoFrameLimit = function() {
        if (!this._pause) {
            this._frameCount++;
        }
        var limit = this.picture().getFrameLimit();
        if (limit > 0 && limit < this._frameCount) {
            if (this.picture().isVideoLoop()) {
                this.bitmap.setCurrentTime(0.01);
            } else {
                this.finishVideo();
            }
            this._frameCount = 0;
        }
    };

    Sprite_Picture.prototype.finishVideo = function() {
        this._frameCount = 0;
		if (this.picture()) {
            this.picture().setVideoEnd();
        }
		/*
        if (param.autoEraseOnEnd) {
            this.eraseVideo();
        } else if (this.picture()) {
            this.picture().setVideoEnd();
        }
		*/
    };

    Sprite_Picture.prototype.eraseVideo = function() {
        this.clearVideo();
        if (this.picture()) {
            $gameScreen.erasePicture(this._pictureId);
            this.visible = false;
        }
    };

    Sprite_Picture.prototype.clearVideo = function() {
        if (!this.isVideoPicture()) return;
        var picture = this.picture();
        if (picture) {
            picture.setVideoPosition(this.bitmap.getCurrentTime());
        }
        this.bitmap.destroy();
        this._volume    = null;
        this._speed     = null;
        this._pause     = null;
        this._playStart = false;
        this.bitmap     = null;
        this._loadingState = null;
    };

    Sprite_Picture.prototype.isVideoPicture = function() {
        return this.bitmap && this.bitmap.isVideo();
    };

    Sprite_Picture.prototype.isLoading = function() {
        return this._loadingState === 'loading';
    };

    Sprite_Picture.prototype.isPrepared = function() {
        return this._loadingState === 'prepared';
    };

    Sprite_Picture.prototype.startVideo = function() {
        this._loadingState = null;
        if (!this.isVideoPicture()) {
            if (this._bitmap) {
                console.error('ピクチャが消去されたため、動画ピクチャの再生に失敗しました。');
            } else {
                console.error('ピクチャが動画ではなかっため、動画ピクチャの再生に失敗しました。');
            }
            return;
        }
		
        const pic = this.picture();
        if (pic && pic.isVideoPause && pic.isVideoPause()) {   // ★ 初始需暂停
          this.bitmap.pause();
          this.bitmap.setCurrentTime(0.01);  // 保证首帧
        } else {
        this.bitmap.play();             // 维持旧行为
        }
        this._frameCount = 0;		
		
    };

    //=============================================================================
    // Spriteset_Base
    //  再生中の動画をすべて破棄します。
    //=============================================================================
    Spriteset_Base.prototype.clearAllVideo = function() {
		const cont = this._pictureContainer;
        if (!cont || !cont.children) return;
        cont.children.forEach(function(picture) {
            if (picture.clearVideo && picture.isVideoPicture()) {
                picture.clearVideo();
                picture.bitmap = null;
            }
        });
    };

    var _Spriteset_Base_update      = Spriteset_Base.prototype.update;
    Spriteset_Base.prototype.update = function() {
        _Spriteset_Base_update.apply(this, arguments);
        this.updateVideoPicture();
    };

    Spriteset_Base.prototype.updateVideoPicture = function() {
        var preparedPictures = [];
        var loading          = this._pictureContainer.children.some(function(picture) {
            if (picture.isPrepared && picture.isPrepared()) {
                preparedPictures.push(picture);
            }
            return picture.isLoading && picture.isLoading();
        });
        if (!loading) {
            preparedPictures.forEach(function(picture) {
                picture.startVideo();
            })
        }
    };

    //=============================================================================
    // Scene_Base
    //  シーン遷移時に再生中の動画をすべて破棄します。
    //=============================================================================
    var _Scene_Base_terminate      = Scene_Base.prototype.terminate;
    Scene_Base.prototype.terminate = function() {
        if (this._spriteset && this._spriteset instanceof Spriteset_Base) {
            this._spriteset.clearAllVideo();
        }
        _Scene_Base_terminate.apply(this, arguments);
    };

    //=============================================================================
    // ImageManager
    //  動画の読み込みを追加定義します。
    //=============================================================================
    ImageManager.loadVideo = function(filename, alpha) {
        if (filename) {
            return Bitmap_Video.load(this.getVideoFilePath(filename, alpha), true, this.getVideoClass(alpha));
        } else {
            return this.loadEmptyBitmap();
        }
    };

    ImageManager.getVideoFilePath = function(filename, alpha) {
        if (!filename.match(/^[A-Z]:/)) {
            return this.getVideoFileFolder() + encodeURIComponent(filename) + this.getVideoFileExt(alpha);
        } else {
            return filename;
        }
    };

    ImageManager.getVideoFileFolder = function() {		
        return 'img/movies/';
    };

    ImageManager.getVideoClass = function(alpha) {
        if ((Utils.isNwjs() || Utils.isPcChrome()) && !alpha) {
            return Bitmap_Video;
        } else {
            return Bitmap_DrawVideo;
        }
    };

	ImageManager.getVideoFileExt = function(alpha) {
		return '.nlch';
		/*
		if (alpha === false) {
			if (Graphics.canPlayVideoType && Graphics.canPlayVideoType('video/mp4')) {
				return '.nlch';
			}
			// mp4 不可用就回退到原规则
		}
		// 原规则：能播 webm 就用 webm，否则用 mp4
		if (Graphics.canPlayVideoType && Graphics.canPlayVideoType('video/webm')) {
			return '.nlch';
		} else {
			return '.nlch';
		}
		*/
	};

    //=============================================================================
    // SceneManager
    //  戦闘開始時にマップピクチャが一瞬読み込まれてしまう現象を回避します
    //=============================================================================
    SceneManager.isBattleStartUnexpectedLoad = function() {
        return this._scene instanceof Scene_Battle && !$gameParty.inBattle();
    };

    //=============================================================================
    // AudioManager
    //  動画ピクチャの音量を取得します。
    //=============================================================================
    AudioManager._movieVolumePropertyMap = {
        BGM  : 'bgmVolume',
        BGS  : 'bgsVolume',
        ME   : 'meVolume',
        SE   : 'seVolume',
        VOICE: 'voiceVolume'
    };

    AudioManager.getVideoPictureVolume = function(volumeType) {
        var property = this._movieVolumePropertyMap[volumeType];
        return Graphics.getVideoVolume() * (property ? this[property] : 100) / 100;
    };

    //=============================================================================
    // Bitmap
    //  動画かどうかを判定します。
    //=============================================================================
    Bitmap.prototype.isVideo = function() {
        return false;
    };

    /**
     * Bitmap_Video
     * 動画ビットマップクラスです。
     * @constructor
     */
    function Bitmap_Video() {
        this.initialize.apply(this, arguments);
    }

    Bitmap_Video.prototype             = Object.create(Bitmap.prototype);
    Bitmap_Video.prototype.constructor = Bitmap_Video;

    Bitmap_Video.prototype.initialize = function() {
        Bitmap.prototype.initialize.call(this);
    };

    Bitmap_Video.prototype.isVideo = function() {
        return !!this._video;
    };

    Bitmap_Video.load = function(url, smooth, loadClass) {
        var bitmap    = Object.create(loadClass.prototype);
        bitmap._defer = true;
        bitmap.initialize();
        bitmap.smooth = smooth;
        bitmap._requestVideo(url);
        return bitmap;
    };

    Bitmap_Video.prototype.update = function() {
        if (!Utils.isPcChrome()) {
            this._baseTexture.update();
        }
    };

    Bitmap_Video.prototype.setVolume = function(v) {
        v = Number(v);
        if (!Number.isFinite(v)) v = 1;           // 默认 100%
        if (v < 0) v = 0; if (v > 1) v = 1;       // 夹断到 0..1
        this._video.volume = v;
    };

    Bitmap_Video.prototype.pause = function() {
        this._video.pause();
    };

    Bitmap_Video.prototype.play = function() {
        this._video.play();
    };

    Bitmap_Video.prototype.destroy = function() {
        if (this.isReady()) {
            this.pause();
            try { this._baseTexture?.destroy?.(); } catch(e) {}
            this._video = null;
            this._baseTexture = null;			
        } else {
            this._loadingDestory = true;
        }
    };

    Bitmap_Video.prototype._requestVideo = function(url) {
        if (!this._loader) {
            this._loader = ResourceHandler.createLoader(url, this._requestVideo.bind(this, url), this._onError.bind(this));
        }
        this._createVideo(url);
        this._createVideoBaseTexture();
        this._loadingState = 'requesting';
    };

    Bitmap_Video.prototype._createVideo = function(url) {
        this._video     = document.createElement('video');
        this._video.src = url;
        this._video.addEventListener('canplaythrough', this._loadListener = this._onLoad.bind(this));
        this._video.addEventListener('ended', this._endedListener = this._onEnded.bind(this));
        this._video.addEventListener('error', this._errorListener = this._loader || this._onError.bind(this));
        this._video.load();
        this._video.autoplay = true;
        this._loadingState   = 'requesting';
    };
    /*
    Bitmap_Video.prototype._createVideoBaseTexture = function() {
        const scaleMode = this.smooth ? PIXI.SCALE_MODES.LINEAR : PIXI.SCALE_MODES.NEAREST;
        this._baseTexture = PIXI.VideoBaseTexture.fromVideo(this._video, scaleMode);
        this._baseTexture.autoPlay = true;
    };
    */
	Bitmap_Video.prototype._createVideoBaseTexture = function() {
	  const scaleMode = this.smooth ? PIXI.SCALE_MODES.LINEAR : PIXI.SCALE_MODES.NEAREST;
	  const bt = PIXI.VideoBaseTexture.fromVideo(this._video, scaleMode);

	  // 关键：你的环境里 _baseTexture 可能是“只有 getter”
	  // 所以直接赋值会 throw。这里用 defineProperty 在实例上强制建立可写字段。
	  try {
		this._baseTexture = bt; // 正常环境走这里
	  } catch (e) {
		try {
		  Object.defineProperty(this, "_baseTexture", {
			value: bt,
			writable: true,
			configurable: true
		  });
		} catch (e2) {
		  // 极端兜底：至少别崩
		  this.__videoBaseTexture = bt;
		}
	  }

	  // autoPlay
	  const tex = this._baseTexture || this.__videoBaseTexture;
	  if (tex && "autoPlay" in tex) tex.autoPlay = true;
	};
	
	
    Bitmap_Video.prototype._onLoad = function() {
        if (param.onLoadSwitch) {
            $gameSwitches.setValue(param.onLoadSwitch, true);
        }
        this._loadingState = 'loaded';
        if (!this._video) {
            return;
        }
        if (this._loadingDestory) {
            this.destroy();
            return;
        }
        var width  = this._video.videoWidth;
        var height = this._video.videoHeight;
        this.resize(width, height);
        this._callLoadListeners();
    };

    Bitmap_Video.prototype._onEnded = function() {
        this._firstLapEnded = true;
        if (this._video && !this._video.loop) {
            this._ended = true;
        }
    };

    Bitmap_Video.prototype._onError = function() {
        this._video.removeEventListener('canplaythrough', this._loadListener);
        this._video.removeEventListener('ended', this._endedListener);
        this._video.removeEventListener('error', this._errorListener);
        this._loadingState = 'error';
    };

    Bitmap_Video.prototype.isFirstLap = function() {
        return !this._firstLapEnded;
    };

    Bitmap_Video.prototype.isEnded = function() {
		const v = this._video;
		if (v) return !!(!v.loop && v.ended);
		return _isEnded ? _isEnded.call(this) : false;
    };

    Bitmap_Video.prototype.setVideoLoop = function(loop) {
        this._video.loop = loop;
    };

    Bitmap_Video.prototype.setCurrentTime = function(value) {
        this._video.currentTime = value;
    };

    Bitmap_Video.prototype.getCurrentTime = function() {
        return this._video.currentTime;
    };

    Bitmap_Video.prototype.setVideoSpeed = function(value) {
        this._video.playbackRate = value;
    };

    /**
     * Bitmap_DrawVideo
     * drawImageで実装する動画ビットマップクラスです。
     * @constructor
     */
    function Bitmap_DrawVideo() {
        this.initialize.apply(this, arguments);
    }

    Bitmap_DrawVideo.prototype             = Object.create(Bitmap_Video.prototype);
    Bitmap_DrawVideo.prototype.constructor = Bitmap_DrawVideo;

    Bitmap_DrawVideo.prototype._createVideoBaseTexture = function() {
        // do nothing
    };

    Bitmap_DrawVideo.prototype.update = function() {
		/*
        if (this.isHalfRefreshRateSize() && Graphics.frameCount % 2 !== 0) {
            return;
        }
        if (this.getCurrentTime() > 0) {
            this.clear();
        }
        this._context.drawImage(this._video, 0, 0, this.width, this.height);
        this._baseTexture.update();
		*/
		const t = this.getCurrentTime();
		const last = this._mpLastTime;
		const wrapped = (last != null && last > 0.1 && t < 0.05);
		this._mpLastTime = t;

		// 原逻辑：大视频半帧刷新会 return，可能让“残留”多停一帧
		// 这里：如果检测到回绕，就不跳帧，强制刷新一次
		if (!wrapped && this.isHalfRefreshRateSize() && Graphics.frameCount % 2 !== 0) {
		  return;
		}

		// 关键修复：不管 currentTime 是不是 0，都先清屏，避免上一帧残留
		this.clear();
		this._context.drawImage(this._video, 0, 0, this.width, this.height);
		this._baseTexture.update();		
    };

    Bitmap_DrawVideo.prototype.isHalfRefreshRateSize = function() {
        return this.width * this.height > 1000000;
    };

    //=============================================================================
    // Graphics
    //  動画の音量を取得します。
    //=============================================================================
	const _Graphics_getVideoVolume = Graphics.getVideoVolume;
    Graphics.getVideoVolume = function() {
          const v = (typeof _Graphics_getVideoVolume === 'function'
                    ? _Graphics_getVideoVolume.call(this)
                    : this._videoVolume);
          return Number.isFinite(v) ? v : 100;
    };
})();


/* =======================================================================
 * MoviePicture.js — 无闪烁缓存补丁
 * 说明：
 *  - 切换图片时，不销毁视频纹理，转入缓存；
 *  - 再次播放同一视频时复用缓存，后台 seek 完成后同帧接管，避免闪烁；
 *  - 仅在“开始地图传送”时或手动调用时清理缓存。
 * ======================================================================= */
(() => {
  // ---------- 简单缓存 ----------
  const VideoCache = {
    _pool: Object.create(null),
    key(name, alpha) { return name + (alpha ? '_a' : '_n'); },
    get(name, alpha) { return this._pool[this.key(name, alpha)]; },
    put(name, alpha, bmp) { this._pool[this.key(name, alpha)] = bmp; },
    has(name, alpha) { return !!this.get(name, alpha); },
    clear() {
      for (const k in this._pool) {
        const bmp = this._pool[k];
        try { bmp?.destroy?.(); } catch (e) {}
        delete this._pool[k];
      }
    }
  };

  // 公开给事件脚本
  if (!Game_Temp.prototype.clearVideoCache) {
    Game_Temp.prototype.clearVideoCache = function() { VideoCache.clear(); };
  }

  // ---------- 覆盖 ImageManager.loadVideo：命中缓存则直接返回 ----------
  const _IM_loadVideo = ImageManager.loadVideo;
  ImageManager.loadVideo = function(filename, alpha) {
    if (!filename) return this.loadEmptyBitmap();
    const cached = VideoCache.get(filename, alpha);
    if (cached && cached.isVideo && cached.isVideo()) return cached;
    const bmp = _IM_loadVideo.call(this, filename, alpha);
    // 载入成功后放入缓存（避免多处并发创建）
    bmp.addLoadListener(() => {
      if (!VideoCache.get(filename, alpha)) {
        VideoCache.put(filename, alpha, bmp);
      }
    });
    return bmp;
  };

  // ---------- 改写 Sprite_Picture.loadVideo：不提前 destroy；后台 seek 后同帧接管 ----------
  const SPR = Sprite_Picture.prototype;

  SPR.loadVideo = function() {
    if (SceneManager.isBattleStartUnexpectedLoad()) return;

    const pic   = this.picture();
    const name  = this._pictureName;
    const alpha = pic.isVideoUseAlpha();

    const oldBmp = this.isVideoPicture() ? this.bitmap : null;
	const oldSrc  = oldBmp && oldBmp._video && oldBmp._video.src;
	const sameVid = !!(oldSrc && oldSrc.endsWith(name));

	const inheritTime =
	  (pic && typeof pic.getVideoPosition === 'function' ? pic.getVideoPosition() : 0) ||
	  (sameVid && oldBmp && oldBmp._video ? oldBmp._video.currentTime : 0) || 0;

    // 重要：不要先 destroy 旧位图，交接成功后再释放引用
    const newBmp = ImageManager.loadVideo(name, alpha);
    this._loadingState = 'loading';

	const handover = () => {
	  this.bitmap = newBmp;
	  this.prepareVideo();

	  const pic2 = this.picture();
	  const vid  = newBmp._video;

	  if (vid) {
		// ended 状态必须先挪动 currentTime，否则 play() 可能不动
		let t = (pic2 ? pic2.getVideoPosition() : 0) || 0;
		if (vid.ended) t = 0.01;
		if (t <= 0) t = 0.01;

		const doPlay = () => {
		  if (pic2 && pic2.isVideoPause && pic2.isVideoPause()) {
			try { vid.pause(); } catch(e) {}
		  } else {
			try { vid.play(); } catch(e) {}
		  }
		};

		// 先 seek，再播放（更稳，避免停第一帧）
		try {
		  vid.pause();
		  const onSeeked = () => {
			vid.removeEventListener('seeked', onSeeked);
			doPlay();
		  };
		  vid.addEventListener('seeked', onSeeked, { once: true });
		  vid.currentTime = t;
		} catch(e) {
		  doPlay();
		}
	  }
	};

    // 如果已经加载完成，直接 seek/接管；否则等加载回调
    const doSeekAndHandover = () => {
      const vid = newBmp._video;
      if (!vid) { handover(); return; }
      vid.pause();
      if (inheritTime > 0) {
        const onSeeked = () => {
          vid.removeEventListener('seeked', onSeeked);
          handover();
        };
        vid.addEventListener('seeked', onSeeked, { once: true });
        try { vid.currentTime = inheritTime; } catch (e) { handover(); }
      } else {
        handover();
      }
    };

    if (newBmp.isReady && newBmp.isReady()) {
      doSeekAndHandover();
    } else {
      newBmp.addLoadListener(() => doSeekAndHandover());
    }
  };

  // ---------- 改写 clearVideo：改为暂停并缓存，而不是 destroy ----------
  const _clearVideo = SPR.clearVideo;
  SPR.clearVideo = function() {
    if (!this.isVideoPicture()) return;
    const picture = this.picture();
    if (picture) {
      // 记录当前位置，供下次无缝续播
      picture.setVideoPosition(this.bitmap.getCurrentTime());
    }
    // 放入缓存并暂停
    const bmp   = this.bitmap;
    const name  = this._pictureName;
    const alpha = picture ? picture.isVideoUseAlpha() : false;

    try { bmp.pause?.(); } catch (e) {}

    if (name && bmp) {
      VideoCache.put(name, alpha, bmp);
    }

    // 清除与 sprite 的绑定与状态，但不销毁底层纹理
    this._volume = this._speed = this._pause = null;
    this._playStart = false;
    this.bitmap = null;
    this._loadingState = null;
    // 注意：不要调用 bmp.destroy()
  };

  // ---------- 保留原有场景结束的“清所有视频”逻辑，但它现在只会断开引用，不会销毁 ----------
  // 原代码会在这里调用 clearAllVideo -> 再走 clearVideo；我们已让 clearVideo 不 destroy。
  // 参考：Scene_Base.prototype.terminate 中对 clearAllVideo 的调用。:contentReference[oaicite:11]{index=11}

  // ───────── 在 $gameMap.resetMapeventSequence() 中清理缓存 ─────────
  const _GM_reset = Game_Map.prototype.resetMapeventSequence;
  Game_Map.prototype.resetMapeventSequence = function() {
    const r = _GM_reset ? _GM_reset.apply(this, arguments) : undefined;
    // 然后统一清理缓存
    VideoCache.clear();
    return r;
  };
  
})();

