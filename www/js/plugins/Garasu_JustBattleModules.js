/*:
 * No Modificar aqui, por favor.

 * @plugindesc Esto es un plugin que hice como agradecimiento como apoyo motivacional a un servidor de discord
 * @author Garasu Nightmare Fox
 * @help este plugin contiene comandos de script.
 * pero puedes usar los siguientes comandos que son los siguientes:
 * ------------------------------------------------------------------------------
 * ------------------------------------------------------------------------------
 * 
 * 
 * 
 * 
 * 
 * Reproducir la misma musica pero con parametros diferentes:
 *      Garasu_VarModBGM(Tono, Volumen, Panoramización);
 *      Garasu_ModBGM(Tono, Volumen, Panoramización);
 * 
 * 
 * Tono: Permite modificar el tono del BGM reproduciendo la misma música.
 * Volumen: Permite modificar el Volumen del BGM reproduciendo la misma música.
 * Panoramización: Permite modificar el lado donde escuchas
 * 
 * Garasu_VarModBGM(Tono, Volumen, Panoramización);
 * Descripción:
 * lo que te permite hacer esta función es reproducir la misma musica con
 * parametros modificados.
 * 
 * Tienes que colocar la ID de las variables.
 * 
 * ejemplo:
 * Garasu_VarModBGM(1, 2, 3);
 * 
 * la variable #001, permitira modificar el tono dependiendo del valor.
 * la variable #002, permitira modificar el volumen dependiendo del valor.
 * la variable #003, permitira modificar la Panoramización del valor.
 * (y en este)
 * 
 * si quieres hacerlo de forma manual o decimal tendrás que usar
 * el siguiente comando de script:
 * 
 * Garasu_ModBGM(Tono, Volumen, Panoramización);
 * 
 * ejemplo:
 * Garasu_ModBGM(100, 100, 0);
 * 
 * ------------------------------------------------------------------------------
 * ------------------------------------------------------------------------------
 * 
 * Efecto Congelamiento:
 * el siguiente comando de script para poder interpretarlo es el siguiente:
 * 
 * Garasu_EnfriarPantallaTemporal(tiempo de congelamiento, velocidad de fotogramas);
 * Garasu_EnfriarPantalla(velocidad de fotogramas);
 * 
 * tiempo de congelamiento: Es la velocidad en la que tardara
 * hasta volver a la normalidad
 * 
 * velocidad de fotogramas: es a la velocidad de fotogramas maximo
 * que ira el juego (60fps por defecto)
 * 
 * ejemplo de uso:
 * Garasu_EnfriarPantallaTemporal(5, 15);
 * ^ la pantalla del juego ira a 15fps durante 5 segundos ^
 * 
 * ------------------------------------------------------------------------------
 * ------------------------------------------------------------------------------
 * ------------------------------------------------------------------------------
 * ------------------------------------------------------------------------------
 * 
 * bugs que no puedo reparar:
 *  - actualmente si el efecto de congelamiento o lentitud esta activo, el juego
 *    aunque este pausado seguira yendo lento hasta que el tiempo haya pasado.
 * 
 *  - puede que se escuche un lag pequeño dependiendo de la musica.
 * 
 * advertencias:
 *      - si cambias los parametros mientras la musica
 *        tenga un efecto de reversion, el juego se crasheara (no tengo razon)
 * 
 *      - mientras menos fotogramas le pongas a la velocidad
 *        (1 fotograma en 0.02 segundos por ejemplo), el efecto terminaria hasta
 *        que el fotograma justo o despues del tiempo
 * 
 * terminos de uso:
 * - eres libre de usar y modificar este plugin.
 * - puedes usarlo de forma comercial y no comercial.
 *   (si es en comercial, ¿podrias darme creditos c:?, te lo agradeceria bastante)
 * 
 * 
 * 
 *
 * @param Tiempo afectado por el tono
 * @type boolean
 * @desc Si el parametro esta activo, la musica cambia de tono, continuara con su reproducción, y si no, se reiniciara.
 * @default false
 * 
 * 
 * @param ¿Usas Yep Frame Sync?
 * @type boolean
 * @desc Si usas el Yep Frame Sync deberias activarlo, ya que si no lo haces, si el jugador tiene desactivado la opcion de Sync de Yep
 * @default false
 * 
 * 
 */


//          params

    const Garasu_AffectsYepSync = PluginManager.parameters('Garasu_JustBattleModules')["¿Usas Yep Frame Sync?"].toLowerCase() == 'true';
    const Garasu_BGMAffectsTone = PluginManager.parameters('Garasu_JustBattleModules')["Tiempo afectado por el tono"].toLowerCase() == 'true';

//          end of params


    




//              Start the magic

function Garasu_ModBGM(MPitch, MVol, MPan){
    bgm = AudioManager._currentBgm ?? {
        name: '',
        volume: 100,
        pitch: 100,
        pan: 100
    }
    bgm.volume = MVol;
    bgm.pitch = MPitch;
    bgm.pan = MPan;
    AudioManager.playBgm(bgm);
    };



function Garasu_VarModBGM(MPitch, MVol, MPan){
    bgm = AudioManager._currentBgm ?? {
        name: '',
        volume: 100,
        pitch: 100,
        pan: 100
}
    bgm.volume = $gameVariables.value(MVol);
    bgm.pitch = $gameVariables.value(MPitch);
    bgm.pan = $gameVariables.value(MPan);
    AudioManager.playBgm(bgm);
};

if(Garasu_AffectsYepSync == true){
    if (typeof ConfigManager.synchFps === 'undefined'){
        alert("Garasu:\nDeberias Desactivar la opcion llamada \n- ¿Usas Yep Frame Sync? -");
        alert("Garasu:\nSi no desactivas esa opción,\nes probable que al usar el efecto de tiempo te de un error.");

        throw new Error("\n\nGarasu:\nDeberias Desactivar la opcion llamada \n- ¿Usas Yep Frame Sync? -\nSi no desactivas esa opción,\nes probable que al usar el efecto de tiempo te de un error.");
    }else{
        console.log("Garasu:\nel plugin seguira funcionando con el YEP Frame Sync")
    }
}

// Efecto Congelamiento

function Garasu_Descongelar(){
    SceneManager._deltaTime = 1.0 / 60.0;
    if(Garasu_AffectsYepSync == true){ ConfigManager.synchFps = Gar_IsSkipframeActivated; }

}

var Gar_IsSkipframeActivated = false;

function reactivateScreenEffectFrz(){
    Gar_IsSkipframeActivated = false;
};
function checkFPSMode(){
if(ConfigManager.synchFps){
    Gar_IsSkipframeActivated = true;

}else{
    Gar_IsSkipframeActivated = false;
}
}
function Garasu_EnfriarPantallaTemporal(time, screenspeed){
    GameSpeedEffect(time, screenspeed);

}

function Garasu_EnfriarPantalla(screenspeed){
    if(Garasu_AffectsYepSync == false){
    }else{
    checkFPSMode();
    ConfigManager.synchFps = true;
}
    SceneManager._deltaTime = 1.0 / screenspeed;
}

function GameSpeedEffect(time, screenspeed){
    if(Garasu_AffectsYepSync == true){
        checkFPSMode();
        ConfigManager.synchFps = true;
        SceneManager._deltaTime = 1.0 / screenspeed;
        setTimeout(Garasu_Descongelar, time * 1000);

    }else{
    SceneManager._deltaTime = 1.0 / screenspeed;
    setTimeout(Garasu_Descongelar, time * 1000);
    }
}

//efecto congelamiento termina

// Tono Sincronizado

var Garasu_TimeActually = 0.0;
var Garasu_BGM = 0.0;
var Garasu_BGS = 0.0;

if(Garasu_BGMAffectsTone == true){
/**
 * The pitch of the audio.
 *
 * @property pitch
 * @type Number
 */
Object.defineProperty(WebAudio.prototype, 'pitch', {
    get: function() {
        return this._pitch;
    },
    set: function(value) {
        if (this._pitch !== value) {
            this._pitch = value;
            if (this.isPlaying()) {
                this.play(this._sourceNode.loop, Garasu_TimeActually.pos);
            }
        }
    },
    configurable: true
});
}

/**  Garasu_BGS = AudioManager.saveBgs();
    Garasu_TimeActually = Garasu_BGS;

    Garasu_BGM = AudioManager.saveBgm();
    Garasu_TimeActually = Garasu_BGM;
*/

// Definicion cuando el BGM Cambia y el BGS
if(Garasu_BGMAffectsTone == true){

    AudioManager.playBgm = function(bgm, pos) {
        Garasu_BGM = AudioManager.saveBgm();
        Garasu_TimeActually = Garasu_BGM;

        if (this.isCurrentBgm(bgm)) {
            this.updateBgmParameters(bgm);
        } else {
            this.stopBgm();
            if (bgm.name) { 
                if(Decrypter.hasEncryptedAudio && this.shouldUseHtml5Audio()){
                    this.playEncryptedBgm(bgm, pos);
                }
                else {
                    this._bgmBuffer = this.createBuffer('bgm', bgm.name);
                    this.updateBgmParameters(bgm);
                    if (!this._meBuffer) {
                        this._bgmBuffer.play(true, pos || 0);
                    }
                }
            }
        }
        this.updateCurrentBgm(bgm, pos);
    };

    AudioManager.playBgs = function(bgs, pos) {
    Garasu_BGS = AudioManager.saveBgs();
    Garasu_TimeActually = Garasu_BGS;
    

        if (this.isCurrentBgs(bgs)) {
            this.updateBgsParameters(bgs);
        } else {
            this.stopBgs();
            if (bgs.name) {
                this._bgsBuffer = this.createBuffer('bgs', bgs.name);
                this.updateBgsParameters(bgs);
                this._bgsBuffer.play(true, pos || 0);
            }
        }
        this.updateCurrentBgs(bgs, pos);
    };
}




(function() {
  if (!window.AudioManager) return;

  // 统一把传入的 bgm/bgs 归一化为安全对象
  function normAudio(a) {
    if (a && typeof a === 'object') {
      return {
        name:  typeof a.name  === 'string' ? a.name  : '',
        volume: Number.isFinite(a.volume) ? a.volume : 90,
        pitch:  Number.isFinite(a.pitch)  ? a.pitch  : 100,
        pan:    Number.isFinite(a.pan)    ? a.pan    : 0
      };
    }
    return { name: '', volume: 90, pitch: 100, pan: 0 };
  }

  // 包一层，保证传给“被重写的”AudioManager.playBgm/Bgs 的参数是安全的
  const _playBgs = AudioManager.playBgs;
  AudioManager.playBgs = function(bgs, pos) {
    return _playBgs.call(this, normAudio(bgs), pos || 0);
  };

  const _playBgm = AudioManager.playBgm;
  AudioManager.playBgm = function(bgm, pos) {
    return _playBgm.call(this, normAudio(bgm), pos || 0);
  };

  // 旧存档：在回放前把 onSave 的对象也补全一下
  const _onAfterLoad = Game_System.prototype.onAfterLoad;
  Game_System.prototype.onAfterLoad = function() {
    this._bgmOnSave = normAudio(this._bgmOnSave);
    this._bgsOnSave = normAudio(this._bgsOnSave);
    _onAfterLoad.call(this);
  };
})();