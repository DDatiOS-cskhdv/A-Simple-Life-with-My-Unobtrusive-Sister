/*:
 * @plugindesc Adds an option in the Options menu to change the game's master volume.
 * @author SumRndmDde
 *
 * @param Option Name
 * @desc The name that appears in the Options menu for the master volume option.
 * @default Master Volume
 *
 * @param Default Value
 * @desc The initial value of the master volume option.
 * Make it a number between 0 and 100.
 * @default 100
 *
 * @param Option Position
 * @desc The position of the option on the options menu.
 *  Above  |  Below  |  AboveVol  |  BelowVol
 * @default AboveVol
 *
 * @help
 *
 * Master Volume
 * Version 1.00
 * SumRndmDde
 *
 *
 * Adds an option in the Options menu to change the game's master volume.
 *
 *
 * ==========================================================================
 *  End of Help File
 * ==========================================================================
 * 
 * Welcome to the bottom of the Help file.
 *
 *
 * Thanks for reading!
 * If you have questions, or if you enjoyed this Plugin, please check
 * out my YouTube channel!
 *
 * https://www.youtube.com/c/SumRndmDde
 *
 *
 * Until next time,
 *   ~ SumRndmDde
 *
 */

var SRD = SRD || {}; SRD.MasterVolume = SRD.MasterVolume || {};
var Imported = Imported || {}; Imported["SumRndmDde Master Volume"] = 1.00;

(() => {
"use strict";

/* --- 参数 ----------------------------------------------------------------- */
const p = PluginManager.parameters('SRD_MasterVolume');
const DEF_LABEL = String(p['Option Name']   || '主音量');   // 默认中文
const DEF_VAL   = Number(p['Default Value'] || 100);
const POS       = String(p['Option Position']||'belowvol').trim().toLowerCase();

/* --- ConfigManager -------------------------------------------------------- */
Object.defineProperty(ConfigManager, 'masterVolume', {
  get(){ return Math.floor(AudioManager.masterVolume * 100); },
  set(v){ AudioManager.masterVolume = v / 100;               },
  configurable:true
});

const _makeData = ConfigManager.makeData;
ConfigManager.makeData = function(){
  const cfg = _makeData.call(this);
  cfg.masterVolume = this.masterVolume;
  return cfg;
};

const _applyData = ConfigManager.applyData;
ConfigManager.applyData = function(cfg){
  _applyData.call(this,cfg);
  this.masterVolume = this.readMasterVolume(cfg,'masterVolume');
};
ConfigManager.readMasterVolume = function(cfg,name){
  const v = cfg[name];
  return (v!==undefined ? Number(v).clamp(0,100) : DEF_VAL);
};

/* --- 通过标题判断语言 ----------------------------------------------------- */
function currentLabel(){
  const sysText = window.systemFeatureText;  
  if (sysText){
    return sysText.masterVolume;
  }
  return DEF_LABEL;
}

/* --- Window_Options ------------------------------------------------------- */
function addSlider(win){ win.addCommand(currentLabel(),'masterVolume'); }

if (/vol/.test(POS)){                       // aboveVol / belowVol
  const _addVol = Window_Options.prototype.addVolumeOptions;
  Window_Options.prototype.addVolumeOptions = function(){
    if (POS==='abovevol') addSlider(this);
    _addVol.apply(this,arguments);
    if (POS==='belowvol') addSlider(this);
  };
}else{                                      // above / below
  const _makeList = Window_Options.prototype.makeCommandList;
  Window_Options.prototype.makeCommandList = function(){
    if (POS==='above') addSlider(this);
    _makeList.apply(this,arguments);
    if (POS==='below') addSlider(this);
  };
}

/* --- 滑块拖动后立即生效 --------------------------------------------------- */
const _procOk = Window_Options.prototype.processOk;
Window_Options.prototype.processOk = function(){
  _procOk.apply(this,arguments);
  if (this.commandSymbol(this.index())==='masterVolume'){
    AudioManager.masterVolume = ConfigManager.masterVolume / 100;
  }
};

})();