// FesSpin.js Ver.5.1.1
// MIT License (C) 2020 あわやまたな
// http://opensource.org/licenses/mit-license.php

/*:
* @target MV MZ
* @orderBefore ReplaceTargetCharacter
* @plugindesc Reproduces the spin movement of RPG Maker Fes.
* @author あわやまたな (Awaya_Matana)
* @url https://awaya3ji.seesaa.net/article/482163453.html
* @help Ver.5.1.1
* To control spin movement, use [Script] of Movement Commands,
* [Script] of Event Commands, or [Plugin Command].
* 【Scripts (Movement Command)】
* Spin Movement
* this.spin(boolean);
* Spin every time you move.
*
* Always Spin
* this.alwaysSpin(boolean);
* It continues to spin regardless of movement.
*
* Back Reverse
* this.reverseSpin(boolean);
* Spin left.
*
* Waiting for Spin
* this.setSpinWait(frames);
* Spins 90 degrees with the specified wait time.
*
* boolean: Enter true or false.
* Toggle without input.
*
* frames: Spins 90 degrees each time.
* Automatically calculated with 0 or "auto".
*
* 【Script (Event Command)】
* When controlling the main character's spin
* $gamePlayer.spin(boolean);
* $gamePlayer.alwaysSpin(boolean);
* $gamePlayer.reverseSpin(boolean);
* $gamePlayer.setSpinWait(frames);
* When controlling the spin of other characters
* this.character(characterId).spin(boolean);
* this.character(characterId).alwaysSpin(boolean);
* this.character(characterId).reverseSpin(boolean);
* this.character(characterId).setSpinWait(frames);
*
* characterId: Enter the character ID.
* Setting it to 0 will affect this event, and setting it to -1 will affect the player.
*
* 【Plugin Commands (MV)】※For MZ, please read the explanation from the event command [Plugin Command].
* Spin Movement
* fesSpin characterId boolean
*
* Always Spin
* fesSpin always characterId boolean
*
* Back Reverse
* fesSpin reverse characterId boolean
*
* Waiting for Spin
* fesSpin wait characterId frames
*
* characterId: Enter the character ID.
* Setting it to 0 will affect this event, and setting it to -1 will affect the player.
*
* boolean: Enabled with true. Disable with false.
* Toggle without input.
*
* frames: Rotates 90 degrees each time.
* Automatically calculated if 0 or not entered, auto.
*
* [Options]
* Enter a comment on the first line of the event.
* <fesSpin>
* Spin movement is set from the beginning when switching pages.
* <alwaysSpin>
* Always spins from the beginning when switching pages.
* <reverseSpin>
* Spins backwards from the beginning when switching pages.
* <spinWait:frames>
* Set the spin wait time when switching pages.
*
* [Specifications]
* Usually one spin per move.
* If you only move one step in a row with the movement command,
* it will be a half spin (unless manually configured).
* It works with or without PluginCommonBase.
* Can be used with both MV and MZ.
*
* @command spin
* @text Spin Movement
* @desc Move while spinning.
*
* @arg id
* @text Character ID
* @desc Specify the character's ID.
* This event:0  Player:-1
* @default -1
*
* @arg ope
* @text Operation
* @desc Specify the operation.
* Toggle without input.
* @default true
* @type boolean
*
* @command alwaysSpin
* @text Always Spin
* @desc It always spins regardless of whether it moves or not.
*
* @arg id
* @text Character ID
* @desc Specify the character's ID.
* This event:0  Player:-1
* @default -1
*
* @arg ope
* @text Operation
* @desc Specify the operation.
* Toggle without input.
* @default true
* @type boolean
*
* @command reverseSpin
* @text Reverse Spin
* @desc Spin left.
*
* @arg id
* @text Character ID
* @desc Specify the character's ID.
* This event:0  Player:-1
* @default -1
*
* @arg ope
* @text Operation
* @desc Specify the operation.
* Toggle without input.
* @default true
* @type boolean
*
* @command setSpinWait
* @text Set Spin Wait
* @desc Set the wait time before spinning 90 degrees.
*
* @arg id
* @text Character ID
* @desc Specify the character's ID.
* This event:0  Player:-1
* @default -1
*
* @arg frames
* @text Number of Frames
* @desc Spins 90 degrees after the specified number of frames.
* Automatic if not entered or 0, auto.
* @default auto
*
* @param tryHalfSpin
* @text Try Half Spin
* @desc If you only move one step in a row with the movement command, it will be a half spin (unless manually).
* @type boolean
* @default true
*/

/*:ja
* @target MV MZ
* @orderBefore ReplaceTargetCharacter
* @plugindesc RPGツクールフェスの回転移動を再現します。
* @author あわやまたな (Awaya_Matana)
* @url https://awaya3ji.seesaa.net/article/482163453.html
* @help 回転移動を制御するためには移動コマンドの[スクリプト]、
* もしくはイベントコマンドの[スクリプト]、[プラグインコマンド]を利用します。
* 【スクリプト（移動コマンド）】
* 回転移動
* this.spin(真偽値);
* 移動するたびに回転します。
*
* 常に回転
* this.alwaysSpin(真偽値);
* 移動に関係なく回転し続けます。
*
* 逆回転
* this.reverseSpin(真偽値);
* 左回転させます。
*
* 回転ウェイト
* this.setSpinWait(フレーム数);
* 指定したウェイトで90度回転します。
*
* 真偽値：trueまたはfalseを入力します。
* 未入力でトグル。
*
* フレーム数：経過する度に90度回転します。
* 0、"auto"で自動算出。
*
* 【スクリプト（イベントコマンド）】
* プレイヤーの回転を制御する時
* $gamePlayer.spin(真偽値);
* $gamePlayer.alwaysSpin(真偽値);
* $gamePlayer.reverseSpin(真偽値);
* $gamePlayer.setSpinWait(フレーム数);
* イベントの回転を制御する時
* this.character(キャラクターID).spin(真偽値);
* this.character(キャラクターID).alwaysSpin(真偽値);
* this.character(キャラクターID).reverseSpin(真偽値);
* this.character(キャラクターID).setSpinWait(フレーム数);
*
* キャラクターID：キャラクターIDを入力します。
* 0にするとこのイベント、-1にするとプレイヤーに効果があります。
*
* 【プラグインコマンド（MV）】※MZはイベントコマンド[プラグインコマンド]から説明を読んでください。
* 回転移動
* fesSpin キャラクターID 真偽値
*
* 常に回転
* fesSpin always キャラクターID 真偽値
*
* 逆回転
* fesSpin reverse キャラクターID 真偽値
*
* 回転ウェイト
* fesSpin wait キャラクターID フレーム数
* 
* キャラクターID：キャラクターIDを入力します。
* 0にするとこのイベント、-1にするとプレイヤーに効果があります。
*
* 真偽値：trueで有効化。falseで無効化。
* 未入力でトグル。
*
* フレーム数：経過する度に90度回転します。
* 0、未入力、またはautoで自動算出。
*
* [オプション]
* イベントの一行目に注釈を置き入力します。
* <fesSpin>
* ページ切り替え時に最初から回転移動がセットされます。
* <alwaysSpin>
* ページ切り替え時に最初から常に回転します。
* <reverseSpin>
* ページ切り替え時に最初から逆回転します。
* <spinWait:フレーム数>
* ページ切り替え時に回転のウェイトを設定します。
*
* [仕様]
* 通常、1マス移動につき一回転。
* 移動コマンドで、連続で1歩しか動かさなかった場合は半回転。
* （手動で設定した場合を除く）
* PluginCommonBaseがあっても無くても動作します。
* MV/MZ共に使用可能。
*
* [更新履歴]
* 2020/10/31：α版リリース
* 2020/11/01：β版。歩行、足踏みのアニメーションに割り込ませていた処理を独立させ、不具合を全て解消。
*           　コマンドで一歩しか動かさなかった時に半回転になる仕様を追加。
* 2020/11/01：RPGツクールMVでも動くように改良。
* 2020/11/01：不具合を修正。また、競合を減らすため、既存の関数は上書きせずフックする処理に変更した。
*           　このまま正式にリリースしてもいいかも。
* 2020/11/01：PluginCommonBaseがあっても無くても動くように。無かったらMZのデフォルトの機能を使用します。
* 2020/11/02：主に[動作を繰り返す]絡みの半回転時の挙動を修正。また、自律移動でも半回転の仕様を実現。
*           　通常の回転速度は移動速度7、半回転は速度8まで移動速度と連動可能（多分）。
*           　コードの可読性アップ。キリが良くなったのでひとまず公開。
* 2020/11/02：セルフスイッチ「ハロルド」を廃止して、独自の変数で状態を管理。処理数も少なくなった。
* 2020/11/03：Ver.1.0.0　多分まともなプラグインになったのでVer.1.0.0とします。プラグインパラメータを追加。
* 2020/11/04：Ver.1.0.1　リファクタリング。プラグインコマンドの処理とフォロワーの更新処理を最適化。
* 2020/11/06：Ver.1.1.0　プラグインコマンドの処理を変更。英語版ヘルプを追加。（DeepL翻訳を使用）
* 2020/11/10：Ver.1.2.0　バグの修正。プラグインパラメータの削除。
* 2020/11/11：Ver.1.2.1　バグの修正。
* 2020/11/12：Ver.1.3.0　バグの修正。オプションの追加。
* 2020/11/23：Ver.1.3.1　リファクタリング。
* 2020/11/23：Ver.1.3.2　リファクタリング。
* 2020/12/02：Ver.1.3.3　リファクタリング。
* 2020/12/09：Ver.1.3.4　リファクタリング。
* 2021/06/26：Ver.1.3.5　バグの修正。
* 2021/07/21：Ver.1.4.0　バグの修正。競合対策。処理の効率化。
* 2021/08/07：Ver.1.4.1　バグの修正。
* 2022/01/05：Ver.1.5.0　バグ修正。処理の効率化。distancePerFrame書き換えにも対応。
* 2022/11/23：Ver.2.0.0　ページ別設定を注釈に変更。
* 2023/02/23：Ver.3.0.0　「常に回転」を追加。移動に関わらず自由に回転を制御可能に。
* 2023/02/25：Ver.4.0.0　リニューアル。プラグインコマンドの互換性はありません。
* 2023/03/16：Ver.4.0.1　致命的な不具合を修正。
* 2023/03/19：Ver.4.0.2　イベント起動時の挙動を一貫性のあるものに修正。
* 2023/10/14：Ver.5.0.0　回転速度を自動にした時の不具合を修正。逆回転を追加。
* 2023/12/29：Ver.5.1.0　隊列メンバーの挙動修正。自動算出の条件を修正。競合対策。
* 2024/01/05：Ver.5.1.1　隊列メンバーの挙動修正。
*
* @command spin
* @text 回転移動
* @desc 回転しながら移動します。
*
* @arg id
* @text キャラクターID
* @desc キャラクターのIDを指定します。
* このイベント:0  プレイヤー:-1
* @default -1
*
* @arg ope
* @text 操作
* @desc 操作を指定します。
* 未入力でトグル。
* @default true
* @type boolean
*
* @command alwaysSpin
* @text 常に回転
* @desc 移動の有無に関わらず常に回転します。
*
* @arg id
* @text キャラクターID
* @desc キャラクターのIDを指定します。
* このイベント:0  プレイヤー:-1
* @default -1
*
* @arg ope
* @text 操作
* @desc 操作を指定します。
* 未入力でトグル。
* @default true
* @type boolean
*
* @command reverseSpin
* @text 逆回転
* @desc 左回転にします。
*
* @arg id
* @text キャラクターID
* @desc キャラクターのIDを指定します。
* このイベント:0  プレイヤー:-1
* @default -1
*
* @arg ope
* @text 操作
* @desc 操作を指定します。
* 未入力でトグル。
* @default true
* @type boolean
*
* @command setSpinWait
* @text 回転ウェイト
* @desc 90度回転するまでのウェイトを設定します。
*
* @arg id
* @text キャラクターID
* @desc キャラクターのIDを指定します。
* このイベント:0  プレイヤー:-1
* @default -1
*
* @arg frames
* @text フレーム数
* @desc 指定したフレーム数経過すると90度回転します。
* 未入力、0、autoで自動。
* @default auto
*
* @param tryHalfSpin
* @text 半回転を試みる
* @desc 移動コマンドで、連続で1歩しか動かさなかった場合は半回転します。（手動で設定した場合を除く）
* @type boolean
* @default true
*/

'use strict';
{

	//プラグイン名取得。
	const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
	const useMZ = Utils.RPGMAKER_NAME === "MZ";
	const hasPluginCommonBase = typeof PluginManagerEx === "function";
	const parameters = PluginManager.parameters(pluginName);
	const tryHalfSpin = parameters.tryHalfSpin !== "false";

	//-----------------------------------------------------------------------------
	// PluginManager
	//プラグインコマンドの定義。PluginCommonBaseの有無やMZ/MVを判別。
	if (useMZ){
		PluginManager.registerCommand(pluginName, "spin", function (args) {
			const character = this.character(+args.id);
			if (character) {
				let bool;
				if (args.ope) {
					bool = args.ope === "true"
				}
				character.spin(bool);
			}
		});
		PluginManager.registerCommand(pluginName, "alwaysSpin", function (args) {
			const character = this.character(+args.id);
			if (character) {
				let bool;
				if (args.ope) {
					bool = args.ope === "true"
				}
				character.alwaysSpin(bool);
			}
		});
		PluginManager.registerCommand(pluginName, "reverseSpin", function (args) {
			const character = this.character(+args.id);
			if (character) {
				let bool;
				if (args.ope) {
					bool = args.ope === "true"
				}
				character.reverseSpin(bool);
			}
		});
		PluginManager.registerCommand(pluginName, "setSpinWait", function (args) {
			const character = this.character(+args.id);
			if (character) {
				let frames = args.frames === "auto" ? 0 : +args.frames;
				character.setSpinWait(frames);
			}
		});
		if (hasPluginCommonBase){
			PluginManagerEx.registerCommand(document.currentScript, "spin", function (args) {
				const character = this.character(args.id);
				if (character) {
					let bool;
					if (args.ope !== "") {
						bool = args.ope;
					}
					character.spin(bool);
				}
			});
			PluginManagerEx.registerCommand(document.currentScript, "alwaysSpin", function (args) {
				const character = this.character(args.id);
				if (character) {
					let bool;
					if (args.ope !== "") {
						bool = args.ope;
					}
					character.alwaysSpin(bool);
				}
			});
			PluginManagerEx.registerCommand(document.currentScript, "reverseSpin", function (args) {
				const character = this.character(args.id);
				if (character) {
					let bool;
					if (args.ope !== "") {
						bool = args.ope;
					}
					character.reverseSpin(bool);
				}
			});
			PluginManagerEx.registerCommand(document.currentScript, "setSpinWait", function (args) {
				const character = this.character(args.id);
				if (character) {
					character.setSpinWait(args.frames || 0);
				}
			});

		}
	}

	//-----------------------------------------------------------------------------
	// Game_Interpreter

	const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.apply(this, arguments);

		if (command === "fesSpin") {
			let method = "spin";
			let arg;
			switch (args[0]) {
			case "always":
				args.shift();
				method = "alwaysSpin";
				if (args[1]) {
					arg = arg[1] === "true";
				}
				break;
			case "reverse":
				args.shift();
				method = "reverseSpin";
				if (args[1]) {
					arg = arg[1] === "true";
				}
				break;
			case "wait":
				args.shift();
				method = "setSpinWait";
				if (args[1] === "auto") {
					args[1] = 0;
				}
				arg = Number(args[1] || 0);
				break;
			default:
				if (args[1]) {
					arg = arg[1] === "true";
				}
				break;
			}
			const character = this.character(+args[0]);
			if (character) {
				this[method](arg);
			}
		}
	};

	//-----------------------------------------------------------------------------
	// Game_CharacterBase
	//スピンをカウントする変数と回転周期を管理する変数を追加。
	const _Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
	Game_CharacterBase.prototype.initMembers = function() {
		_Game_CharacterBase_initMembers.call(this);
		this._spin = false;
		this._spinCount = 0;
		this._spinWait = 0;
		this._spinCycle = 1;
		this._alwaysSpin = 0;
		this._reverseSpin = false;
	};

	//キャラクターのアップデート処理に回転のアップデートを追加。
	const _Game_CharacterBase_update = Game_CharacterBase.prototype.update;
	Game_CharacterBase.prototype.update = function() {
		_Game_CharacterBase_update.call(this);
		this.updateSpin();
	};

	//向きを変更するタイミングを定義。
	Game_CharacterBase.prototype.updateSpin = function() {
		if (this.canAlwaysSpin() || (this.canSpin() && !this._stopCount)) {
			this.updateSpinCount();
			const spinWait = this.spinWait() || this.autoSpinWait();
			if (this._spinCount >= spinWait) {
				this.updateSpinDirection(spinWait);
				this._spinCount = 0;
			}
		} else {
			this._spinCount = 0;
		}
	};

	//回転周期。歩行時に何マスで一回転するかを決定。
	Game_CharacterBase.prototype.spinWait = function() {
		return this._spinWait;
	};

	Game_CharacterBase.prototype.autoSpinWait = function() {
		return this.spinCycle() / this.distancePerFrame() / 4;
	};

	Game_CharacterBase.prototype.setSpinWait = function(num) {
		this._spinWait = num === "auto" ? 0 : num;
	};

	//フレーム数をカウントする。
	Game_CharacterBase.prototype.updateSpinCount = function() {
		this._spinCount++;
	};

	//イベントの向きを変える。
	Game_CharacterBase.prototype.updateSpinDirection = function(spinWait) {
		let times = spinWait >= 1 ? 1 : Math.floor(spinWait && 1/spinWait);
		while(times > 0) {
			if (this.canReverseSpin()) {
				this._directionFix = false;
				this.turnLeft90();
				this._directionFix = true;
			} else {
				this._directionFix = false;
				this.turnRight90();
				this._directionFix = true;
			}
			times--;
		}
	};

	//競合対策
	let stopSetDirection = false;//移動する方向に向くのをキャンセルするための変数。
	const _Game_CharacterBase_setDirection = Game_CharacterBase.prototype.setDirection;
	Game_CharacterBase.prototype.setDirection = function(d) {
		if (!stopSetDirection) {
			_Game_CharacterBase_setDirection.call(this, d);
		}
	};

	//回転直進時に進行方向に向きを変えさせない
	const _Game_CharacterBase_moveStraight = Game_CharacterBase.prototype.moveStraight;
	Game_CharacterBase.prototype.moveStraight = function(d) {
		stopSetDirection = this.isSpinning();
		_Game_CharacterBase_moveStraight.call(this, d);
		stopSetDirection = false;
	};

	//回転斜進時に進行方向に向きを変えさせない
	const _Game_CharacterBase_moveDiagonally = Game_CharacterBase.prototype.moveDiagonally;
	Game_CharacterBase.prototype.moveDiagonally = function(horz, vert) {
		stopSetDirection = this.isSpinning();
		_Game_CharacterBase_moveDiagonally.call(this, horz, vert);
		stopSetDirection = false;
	};

	//回転ジャンプ時に進行方向に向きを変えさせない。
	const _Game_CharacterBase_jump = Game_CharacterBase.prototype.jump;
	Game_CharacterBase.prototype.jump = function(xPlus, yPlus) {
		stopSetDirection = this.isSpinning();
		_Game_CharacterBase_jump.call(this, xPlus, yPlus);
		stopSetDirection = false;
	};

	//イベントの回転移動が可能かどうかを返す。
	Game_CharacterBase.prototype.isSpinning = function() {
		return this.canSpin() || this.canAlwaysSpin();
	};

	Game_CharacterBase.prototype.canSpin = function() {
		return this._spin;
	};

	//回転移動をするかどうか切り替える。未指定の時はトグル。
	Game_CharacterBase.prototype.spin = function(bool = !this.canSpin()) {
		this._spin = bool;
	};

	Game_CharacterBase.prototype.canAlwaysSpin = function() {
		return this._alwaysSpin;
	};

	Game_CharacterBase.prototype.alwaysSpin = function(bool = !this.canAlwaysSpin()) {
		this._alwaysSpin = bool;
	};

	Game_CharacterBase.prototype.canReverseSpin = function() {
		return this._reverseSpin;
	};

	Game_CharacterBase.prototype.reverseSpin = function(bool = !this.canReverseSpin()) {
		this._reverseSpin = bool;
	};

	//回転周期の取得。
	Game_CharacterBase.prototype.spinCycle = function() {
		return this._spinCycle;
	};

	//回転周期の設定。
	Game_CharacterBase.prototype.setSpinCycle = function(spinCycle) {
		this._spinCycle = spinCycle;
	};

	//-----------------------------------------------------------------------------
	// Game_Character

	//移動ルートの設定時に半回転させるか？するなら回転周期を半分に。
	Game_Character.prototype.tryHalfSpin = function() {
		const list  = this._moveRoute && this._moveRoute.list;
		const index = this._moveRouteIndex;
		let spinCycle = 1;
		if (list && this.canSpin() && !this.canAlwaysSpin() && list[index].code > 0 && list[index].code < 14) {
			//1つ前のコードを取得　動作を繰り返すならリスト最後尾を取得。
			const code1 = index === 0 ? (this._moveRoute.repeat ? list[list.length-2].code : -1) : list[index-1].code;
			//1つ後のコードを取得　動作を繰り返すならリスト最前列を取得。
			const code2 = index === list.length-2 ? (this._moveRoute.repeat ? list[0].code : -1) : list[index+1].code;
			//前後に歩行がないなら半回転
			if ((code1 < 1 || code1 > 14) && (code2 < 1 || code2 > 14)) {
				spinCycle = 2;
			}
		}
		this.setSpinCycle(spinCycle);
	};

	if (tryHalfSpin) {
		const _Game_Character_processMoveCommand = Game_Character.prototype.processMoveCommand;
		Game_Character.prototype.processMoveCommand = function(command) {
			this.tryHalfSpin();
			_Game_Character_processMoveCommand.call(this, command);
		};
	} else {
		Game_Character.prototype.tryHalfSpin = function() {};
	}

	//-----------------------------------------------------------------------------
	// Game_Follower

	//フォロワーの更新処理を拡張。
	const _Game_Follower_update = Game_Follower.prototype.update
	Game_Follower.prototype.update = function() {
		this.setSpinCycle($gamePlayer.spinCycle());
		this.spin($gamePlayer.canSpin());
		this.alwaysSpin($gamePlayer.canAlwaysSpin());
		this.reverseSpin($gamePlayer.canReverseSpin());
		this.setSpinWait($gamePlayer.spinWait());
		_Game_Follower_update.call(this);
	};

	const _Game_Follower_chaseCharacter = Game_Follower.prototype.chaseCharacter;
	Game_Follower.prototype.chaseCharacter = function(character) {
		this.spin($gamePlayer.canSpin());
		_Game_Follower_chaseCharacter.call(this, character);
	};

	//-----------------------------------------------------------------------------
	// Game_Event

	const _Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
	Game_Event.prototype.setupPageSettings = function() {
		_Game_Event_setupPageSettings.call(this);
		this.setupSettingsFesSpin();
	};

	Game_Event.prototype.setupSettingsFesSpin = function() {
		const page = this.page();
		this.spin(page.fesSpin || false);
		this.alwaysSpin(page.alwaysSpin || false);
		this.reverseSpin(page.reverseSpin || false);
		this.setSpinWait(page.spinWait || 0);
	};

	const _Game_Event_lock = Game_Event.prototype.lock;
	Game_Event.prototype.lock = function() {
		const locked = this._locked;
		stopSetDirection = this.isSpinning();
		_Game_Event_lock.call(this);
		if (!locked && stopSetDirection) {
			this._prelockDirection = 0;
		}
		stopSetDirection = false;
    };

	//-----------------------------------------------------------------------------
	// DataManager

	const _DataManager_onLoad = DataManager.onLoad;
	DataManager.onLoad = function(object) {
		_DataManager_onLoad.call(this, object);
		if (!!(object.data && object.events) && Array.isArray(object.events)) {
			for (const event of object.events) {
				if (event && event.pages){
					extractMetadata(event);
				}
			}
		}
	};

	function extractMetadata(data) {
		for (const page of data.pages) {
			const comment = findComment(page);
			const commentData = {"note": comment};
			DataManager.extractMetadata(commentData);
			addPageSettings(page, commentData.meta);
		}
	}

	function findComment(page) {
		const list = page.list;
		if (!list[0] && list[0].code !== 108) {
			return "";
		}
		let comment = list[0].parameters[0];
		for (let i = 1; list[i] && list[i].code === 408; i++) {
			comment += list[i].parameters[0];
		}
		return comment;
	}

	function addPageSettings(page, meta) {
		page.fesSpin = !!meta['fesSpin'];
		page.alwaysSpin = !!meta['alwaysSpin'];
		page.reverseSpin = !!meta['reverseSpin'];
		page.spinWait = Number(meta['spinWait'] || 0);
	}
}