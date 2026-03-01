/*:
 * @plugindesc Notification window about incorrect operation on Joil Play
 * @author 2den1580
 *
 * @param Testcheck
 * @text Show the notification window forcibly
 * @type boolean
 * @default true
 * @desc if true the window will appear without any other requirements
 *
 */
 
(function() {
	
  const TEXT = {
    zh: [
      '检测到您正在使用 Joiplay 运行本游戏。',
      'Joiplay 环境存在黑屏、卡顿等兼容问题，',
      '此类 Bug 将不在官方支持范围内。',
      '请使用官方提供的 Android 版本。'
    ],
    ja: [
      '現在 Joiplay で本ゲームを起動しています。',
      'Joiplay 環境ではブラックアウトや遅延など',
      '互換性の問題が発生する可能性があります。',
      '公式配信の Android 版でのプレイを推奨します。'
    ],
    en: [
            "Using JoiPlay isn’t safe",
            "Use the official Android version;",
            "In case of bugs on JoiPlay, your issues ",
            "will not be considered for fixes."
    ]
  };

  function getLocaleText() {
    const lang = ConfigManager.language;
    if (lang === 0) return TEXT.zh;
    if (lang === 1) return TEXT.ja;
    return TEXT.en;
  }  
	
    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
	// 测试用开关
    const Testcheck = false;
    const _Scene_Title_start = Scene_Title.prototype.start;
    Scene_Title.prototype.start = function() {
        _Scene_Title_start.call(this);
        const isLocalhost = window.location.href === 'http://127.0.0.1:4263/index.html';
        if (isLocalhost || Testcheck) {
            this._commandWindow.deactivate();
            if (window.DrillUp && window.DrillUp.global_TBa_visibleTank) {
                window.DrillUp.global_TBa_visibleTank[0] = false;
                StorageManager.drill_TBa_saveData();
            }
            if (this._drill_TBa_spriteTank && this._drill_TBa_spriteTank[0]) {
                this._drill_TBa_spriteTank[0].visible = false;
            }
            this.showWelcomePopup();
        } else {
            if (window.DrillUp && window.DrillUp.global_TBa_visibleTank) {
                window.DrillUp.global_TBa_visibleTank[0] = true;
                StorageManager.drill_TBa_saveData();
            }
            if (this._drill_TBa_spriteTank && this._drill_TBa_spriteTank[0]) {
                this._drill_TBa_spriteTank[0].visible = true;
            }
            this._commandWindow.activate();
        }
    };

    Scene_Title.prototype.showWelcomePopup = function() {
        const width = 1000;
        const height = 500;
        const x = (Graphics.boxWidth - width) / 2;
        const y = (Graphics.boxHeight - height) / 2 - 20;
        const popup = new Window_Base(x, y, width, height);
        popup.open();
        popup.z = 999999999;
        this.addChild(popup);
        const pad    = popup.standardPadding();
        const innerX = pad;
        const innerY = pad;
        const innerW = width - pad * 2;
        const innerH = height - pad * 2;
        popup.contents.paintOpacity = 180;
        popup.contents.fillRect(innerX, innerY, innerW, innerH, '#444444');
        popup.contents.paintOpacity = 255;
        const white  = '#C0C0C0';
        const border = 6;
        popup.contents.fillRect(innerX, innerY, innerW, border, white);
        popup.contents.fillRect(innerX, innerY + innerH - border, innerW, border, white);
        popup.contents.fillRect(innerX, innerY, border, innerH, white);
        popup.contents.fillRect(innerX + innerW - border, innerY, border, innerH, white);
        const textLines = getLocaleText();
        const lineHeight = popup.lineHeight();
        textLines.forEach((line, i) => {
            popup.drawText(line, innerX + 10, innerY + 10 + i * lineHeight, innerW - 20, 'center');
        });
        function Window_OKButton() { this.initialize(...arguments); }
        Window_OKButton.prototype = Object.create(Window_Command.prototype);
        Window_OKButton.prototype.constructor = Window_OKButton;
        Window_OKButton.prototype.initialize = function(x, y) {
            Window_Command.prototype.initialize.call(this, x, y);
            this.select(0);
            this.activate();
        };
        Window_OKButton.prototype.windowWidth = function() { return 140; };
        Window_OKButton.prototype.numVisibleRows = function() { return 1; };
        Window_OKButton.prototype.makeCommandList = function() {
            this.addCommand("ОК", "ok");
        };
        const btnX = (Graphics.boxWidth - 140) / 2;
        const btnY = y + height - 120;
        const okButton = new Window_OKButton(btnX, btnY);
        okButton.z = 9999999999;
        okButton.setHandler("ok", () => {
            this.removeChild(popup);
            this.removeChild(okButton);
            if (window.DrillUp && window.DrillUp.global_TBa_visibleTank) {
                window.DrillUp.global_TBa_visibleTank[0] = true;
                StorageManager.drill_TBa_saveData();
            }
            if (this._drill_TBa_spriteTank && this._drill_TBa_spriteTank[0]) {
                this._drill_TBa_spriteTank[0].visible = true;
            }
            this._commandWindow.activate();
			// 直接关掉游戏
            if (window.nw && nw.App && nw.App.quit) {
                nw.App.quit();
            } else {
                window.close();
            }
        });
        this.addChild(okButton);
    };
})();

