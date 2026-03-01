/*=============================================================================
* Fullscreen_Options.js
*=============================================================================*/

/*:=============================================================================
* @plugindesc v1.0 Add fullscreen option, force fullscreen in Stretch Mode and disable F3.
* @author Krimer
*
* @param fullscreenOptionName
* @desc Fullscreen option name
* Default: Fullscreen
* @default Fullscreen
*
* @param forceFullscreen
* @desc Force fullscreen during first game start? true or false Default: false
* @default false
*
* @help
* "config.rpgsave" from "save" folder must be deleted to perform clean
* first start.
* After clean first start the "config.rpgsave" would be created
* and all changes in 'Options' would be saved there.
* =============================================================================*/

const forceFullscreen = false;   // true = 首次启动即进入全屏
/* ----------------------------------------- */

(() => {
  /* ------------------------------------------------------------------ *
   *  ConfigManager : 保存 / 读取 callFullscreen 设定
   * ------------------------------------------------------------------ */
  const _CM_makeData  = ConfigManager.makeData;
  ConfigManager.makeData = function () {
    const config = _CM_makeData.call(this);
    config.callFullscreen = this.callFullscreen;
    return config;
  };

  const _CM_applyData = ConfigManager.applyData;
  ConfigManager.applyData = function (config) {
    this.callFullscreen = this.readFlag(config, 'callFullscreen');
    _CM_applyData.call(this, config);
  };

  /* ------------------------------------------------------------------ *
   *  Graphics : 默认拉伸、禁用 F3
   * ------------------------------------------------------------------ */
  Graphics._defaultStretchMode = () => true;

  Graphics._onKeyDown = function (event) {
    if (event.ctrlKey || event.altKey) return;
    switch (event.keyCode) {
      case 113: event.preventDefault(); this._switchFPSMeter(); break;   // F2
      case 115: event.preventDefault(); this._switchFullScreen(); break; // F4
      /* F3（114）被移除 */
    }
  };

  /* ------------------------------------------------------------------ *
   *  Scene_Title : 启动时根据配置进入 / 退出全屏
   * ------------------------------------------------------------------ */
  const _ST_start = Scene_Title.prototype.start;
  Scene_Title.prototype.start = function () {

    if (StorageManager.exists(-1)) {                   // 非第一次启动
      if (ConfigManager.callFullscreen)  Graphics._requestFullScreen();
      else                                Graphics._cancelFullScreen();
    } else if (forceFullscreen) {                      // 第一次且强制
      Graphics._switchFullScreen();
      ConfigManager.callFullscreen = true;
    }
    ConfigManager.save();

    _ST_start.call(this);
  };

  /* ------------------------------------------------------------------ *
   *  Window_Options : 动态插入【全屏】选项
   * ------------------------------------------------------------------ */
const _WO_makeList = Window_Options.prototype.makeCommandList;
Window_Options.prototype.makeCommandList = function () {

  /* ① 先判定语言与标签 */
  const title  = $dataSystem?.gameTitle ?? '';
  let   label  = 'Full Screen';
  
  const sysText = window.systemFeatureText;  
  if (sysText){
    label = sysText.fullScreen;
  }  

  /* ② 先插入“全屏”，再调用原方法，确保排在最上面 */
  this.addCommand(label, 'callFullscreen');
  _WO_makeList.call(this);           // 其余默认选项随后加入
};

  /* ------------------------------------------------------------------ *
   *  点击/确定时切换全屏
   * ------------------------------------------------------------------ */
  const _WO_processOk = Window_Options.prototype.processOk;
  Window_Options.prototype.processOk = function () {
    _WO_processOk.call(this);

    if (this.commandSymbol(this.index()) === 'callFullscreen') {
      if (ConfigManager.callFullscreen) Graphics._requestFullScreen();
      else                              Graphics._cancelFullScreen();
    }
  };

})();