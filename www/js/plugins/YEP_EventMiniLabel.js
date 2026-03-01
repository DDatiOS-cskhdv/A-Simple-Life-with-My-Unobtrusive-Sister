//=============================================================================
// Yanfly Engine Plugins - Event Mini Label
// YEP_EventMiniLabel.js
//=============================================================================

/*:
 * @plugindesc v1.12 Creates miniature-sized labels over events to allow
 * you to insert whatever text you'd like in them. Labels persist across map transfers.
 * @author Yanfly Engine Plugins
 *
 * @param Default Show
 * @text 控制是否默认显示标签
 * @desc 默认是否显示事件的迷你标签？
 * @type boolean
 * @on YES
 * @off NO
 * @default true
 *
 * @param Minimum Width
 * @type number
 * @min 1
 * @desc 迷你标签的最小宽度（像素）。
 * @default 136
 *
 * @param Font Size
 * @type number
 * @min 1
 * @desc 迷你标签中文字的字体大小。
 * Default: 28
 * @default 20
 *
 * @param X Buffer
 * @type number
 * @desc 迷你标签的 X 位置偏移量。
 * @default 0
 *
 * @param Y Buffer
 * @type number
 * @desc 迷你标签的 Y 位置偏移量。
 * @default 36
 *
 * @param Battle Transition
 * @type boolean
 * @on YES
 * @off NO
 * @desc 在战斗转换期间是否显示事件迷你标签？
 * NO - false     YES - true
 * @default false
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin lets you place text above the heads of various events using a
 * miniature label through a comment tag. Additionally, labels set via script
 * persist across map transfers.
 *
 * ============================================================================
 * Comment Tags
 * ============================================================================
 *
 * (省略，与之前相同)
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * (省略，与之前相同)
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * (省略，与之前相同)
 */

var Imported = Imported || {};
Imported.YEP_EventMiniLabel = true;

var Yanfly = Yanfly || {};
Yanfly.EML = Yanfly.EML || {};
Yanfly.EML.version = 1.12;

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_EventMiniLabel');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.EMWDefaultShow = eval(String(Yanfly.Parameters['Default Show']));
Yanfly.Param.EMWMinWidth = Number(Yanfly.Parameters['Minimum Width']);
Yanfly.Param.EMWFontSize = 28;
Yanfly.Param.EMWBufferX = Number(Yanfly.Parameters['X Buffer']);
Yanfly.Param.EMWBufferY = Number(Yanfly.Parameters['Y Buffer']);
Yanfly.Param.EMWBatTran = eval(String(Yanfly.Parameters['Battle Transition']));

//=============================================================================
// Game_System
//=============================================================================

Yanfly.EML.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Yanfly.EML.Game_System_initialize.call(this);
    this.initEventMiniLabel();
};

Game_System.prototype.initEventMiniLabel = function() {
    this._showEventMiniLabel = Yanfly.Param.EMWDefaultShow;
};

Game_System.prototype.isShowEventMiniLabel = function() {
    if (this._showEventMiniLabel === undefined) this.initEventMiniLabel();
    return this._showEventMiniLabel;
};

Game_System.prototype.setEventMiniLabel = function(value) {
    this._showEventMiniLabel = value;
    Game_Interpreter.prototype.refreshEventMiniLabel.call(this);
};

//=============================================================================
// Game_Event
//=============================================================================

Yanfly.EML.Game_Event_initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function(mapId, eventId) {
    Yanfly.EML.Game_Event_initialize.call(this, mapId, eventId);
    this.initEventMiniLabel();
};

Game_Event.prototype.initEventMiniLabel = function() {
    this._miniLabelText = '';
};

Game_Event.prototype.setMiniLabelText = function(text) {
    this._miniLabelText = text;
    this.refreshMiniLabel();
};

Game_Event.prototype.getMiniLabelText = function() {
    return this._miniLabelText;
};

Game_Event.prototype.refreshMiniLabel = function() {
    if (SceneManager._scene instanceof Scene_Map) {
        var sprite = SceneManager._scene._spriteset.findCharacterSprite(this);
        if (sprite && sprite._miniLabel) {
			sprite._miniLabel._fontSize = 28;
            sprite._miniLabel._noFresh = true;
            sprite._miniLabel._bufferY = 20;
            sprite._miniLabel.setGoodsText(this._miniLabelText);
        }
    }
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.EML.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.EML.Game_Interpreter_pluginCommand.call(this, command, args)
  if (command === 'HideMiniLabel') $gameSystem.setEventMiniLabel(false);
  if (command === 'ShowMiniLabel') $gameSystem.setEventMiniLabel(true);
  if (command === 'RefreshMiniLabel') this.refreshEventMiniLabel();
};

Game_Interpreter.prototype.refreshEventMiniLabel = function() {
    if ($gameParty.inBattle()) return;
    var scene = SceneManager._scene;
    if (scene instanceof Scene_Map) {
      scene.refreshAllMiniLabels();
    }
};

//=============================================================================
// Window_EventMiniLabel
//=============================================================================

function Window_EventMiniLabel() {
    this.initialize.apply(this, arguments);
}

Window_EventMiniLabel.prototype = Object.create(Window_Base.prototype);
Window_EventMiniLabel.prototype.constructor = Window_EventMiniLabel;

Window_EventMiniLabel.prototype.initialize = function() {
    this._bufferX = Yanfly.Param.EMWBufferX;
    this._bufferY = 24; //Yanfly.Param.EMWBufferY;
    this._fontSize = 28;//Yanfly.Param.EMWFontSize;
    this._alwaysShow = false;
    var width = Yanfly.Param.EMWMinWidth;
    var height = this.windowHeight();
    this._range = 500;
    this._reqFacing = false;
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
    this.opacity = 0;
    this.contentsOpacity = 0;
    this._character = null;
    this._page = 0;
    this._text = '';
    this._noFresh = false;
    //this.windowskin = ImageManager.loadSystem('Window');  
};

Window_EventMiniLabel.prototype.standardFontSize = function() {
    return 28;
};

Window_EventMiniLabel.prototype.windowHeight = function() {
    var height = this.fittingHeight(1)
    height = Math.max(height, 36 + this.standardPadding() * 2);
    return height;
};

Window_EventMiniLabel.prototype.lineHeight = function() {
    return this.standardFontSize() + 8;
};

Window_EventMiniLabel.prototype.standardPadding = function() {
    return 4; 
};

Window_EventMiniLabel.prototype.bufferX = function() {
    if (this._bufferX !== undefined) return this._bufferX;
    return Yanfly.Param.EMWBufferX;
};

Window_EventMiniLabel.prototype.bufferY = function() {
    if (this._bufferY !== undefined) return this._bufferY;
    return Yanfly.Param.EMWBufferY;
};

Window_EventMiniLabel.prototype.setCharacter = function(character) {
    this.setText('');
    this._character = character;
    if (character._eventId) this.gatherDisplayData();
};

Window_EventMiniLabel.prototype.gatherDisplayData = function() {
    this._page = this._character.page();
    this._pageIndex = this._character._pageIndex;
    this._range = 500;
    this._bufferY = Yanfly.Param.EMWBufferY;
    this._fontSize = Yanfly.Param.EMWFontSize;
    this._alwaysShow = false;
    this._reqFacing = false;
    if (!this._character.page()) {
      return this.visible = false;
    }
    var list = this._character.list();
    var max = list.length;
    var comment = '';
    for (var i = 0; i < max; ++i) {
      var ev = list[i];
      if ([108, 408].contains(ev.code)) comment += ev.parameters[0] + '\n';
    }
    this.extractNotedata(comment);
};

Window_EventMiniLabel.prototype.extractNotedata = function(comment) {
  if (comment === '') return;
  var tag1 = /<(?:MINI WINDOW|MINI LABEL):[ ](.*)>/i;
  var tag2 = /<(?:MINI WINDOW FONT SIZE|MINI LABEL FONT SIZE):[ ](\d+)>/i;
  var tag3 = /<(?:MINI WINDOW Y BUFFER|MINI LABEL Y BUFFER):[ ]([\+\-]\d+)>/i;
  var tag4 = /<(?:ALWAYS SHOW MINI WINDOW|ALWAYS SHOW MINI LABEL)>/i;
  var tag5 = /<(?:MINI WINDOW RANGE|MINI LABEL RANGE):[ ](\d+)>/i;
  var tag6 = /<(?:MINI WINDOW X BUFFER|MINI LABEL X BUFFER):[ ]([\+\-]\d+)>/i;
  var tag7 = /<(?:MINI WINDOW REQUIRE FACING|MINI LABEL REQUIRE FACING)>/i;
  var tag8 = /<Mini Label Background:[ ](.+)>/i; 
  var notedata = comment.split(/[\r\n]+/);
  var text = '';
  var backgroundFilename = '';
  for (var i = 0; i < notedata.length; ++i) {
    var line = notedata[i];
    if (line.match(tag1)) {
      text = String(RegExp.$1);
    } else if (line.match(tag2)) {
      this._fontSize = parseInt(RegExp.$1);
    } else if (line.match(tag3)) {
      this._bufferY = parseInt(RegExp.$1);
    } else if (line.match(tag4)) {
      this._alwaysShow = true;
    } else if (line.match(tag5)) {
      this._range = parseInt(RegExp.$1);
    } else if (line.match(tag6)) {
      this._bufferX = parseInt(RegExp.$1);
    } else if (line.match(tag7)) {
      this._reqFacing = true;
    } else if (line.match(tag8)) {
      backgroundFilename = String(RegExp.$1); 
    }
  }
  this.setText(text);
  if (backgroundFilename !== '') {
    //this.setBackground(backgroundFilename); 
  }
  if (this._text === '' || !$gameSystem.isShowEventMiniLabel()) {
    this.visible = false;
    this.contentsOpacity = 0;
  } else {
    this.visible = true;
    if (this._reqFacing) {
      this.contentsOpacity = 0;
    } else {
      this.contentsOpacity = 255;
    }
  }

};

Window_EventMiniLabel.prototype.setBackground = function(filename) {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.anchor.x = 0.5;
    this._backgroundSprite.anchor.y = 0.5;
    this._backgroundSprite.bitmap = ImageManager.loadSystem(filename);
    this.addChildToBack(this._backgroundSprite);    
    this._backgroundSprite.bitmap.addLoadListener(function() {
        this._backgroundSprite.x = (this.width - this._backgroundSprite.bitmap.width) / 2 + this._backgroundSprite.bitmap.width / 2;
        this._backgroundSprite.y = (this.height - this._backgroundSprite.bitmap.height) / 2 + this._backgroundSprite.bitmap.height / 2;
    }.bind(this));    
};

Window_EventMiniLabel.prototype.setText = function(text) {
    if (this._text === text) return;
    this._text = text;
    this.opacity = 255;
    this.refresh();
};

Window_EventMiniLabel.prototype.setGoodsText = function(text) {
    if (this._text === text) return;
    this._alwaysShow = false;
    this._reqFacing = false;
    this._fontSize = 28; 
    //this._bufferY = 16;
    this._text = text;
    this.opacity = 255;
    this.contents.fontSize = this._fontSize; 
    this.refresh();
};

Window_EventMiniLabel.prototype.refresh = function() {
    if (Imported.YEP_SelfSwVar) {
        $gameTemp.setSelfSwVarEvent(this._character._mapId, this._character._eventId);
    }
    this.contents.clear();
    var textWidth = this.textWidthEx(this._text) + this.textPadding() * 2;
    var windowWidth = Math.max(textWidth, Yanfly.Param.EMWMinWidth);
    this.width = windowWidth + this.standardPadding() * 2;
    this.height = this.windowHeight();
    this.createContents();
    
    var textX = (this.width - textWidth) / 2 - this.standardPadding() + 4;
    var textY = 0 + 6; 
    this.drawTextEx(this._text, textX, textY);
    
    if (Imported.YEP_SelfSwVar) {
        $gameTemp.clearSelfSwVarEvent();
    }
};

Window_EventMiniLabel.prototype.forceRefresh = function() {
    this.refresh();
    this.updateOpacity();
};

Window_EventMiniLabel.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height);
};

Window_EventMiniLabel.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (!this._character || !this._character.page()) {
        this.visible = false;
        return;
    }
    if (!this._character._eventId) return;
    this.updatePage();
    if (this._text === '') return;
    this.updateOpacity();
};

Window_EventMiniLabel.prototype.updatePage = function() {
    if (this._noFresh === true) return;
    if (this._pageIndex === this._character._pageIndex) return;
    this._pageIndex = this._character._pageIndex;
    this.contents.clear();
    this._text = '';
    this.gatherDisplayData();
};

Window_EventMiniLabel.prototype.updateOpacity = function() {
    if (this.showMiniLabel()) {
      this.show();
    } else {
      this.hide();
    }
    if(this._backgroundSprite){
        this._backgroundSprite.opacity = this.contentsOpacity;
    }
};

Window_EventMiniLabel.prototype.show = function() {
    if (this.contentsOpacity >= 255) return;
    this.contentsOpacity += 16;
    this.visible = true;
};

Window_EventMiniLabel.prototype.hide = function() {
    if (this.contentsOpacity <= 0) {
      if (this.visible) this.visible = false;
      return;
    }
    this.contentsOpacity -= 16;
};

Window_EventMiniLabel.prototype.showMiniLabel = function() {
    if (this._alwaysShow) return true;
    if (!this.withinRange()) return false;
    if (!this.meetsFacingRequirements()) return false;
    if (!Yanfly.Param.EMWBatTran) {
      if (SceneManager._scene._encounterEffectDuration > 0) {
        this.contentsOpacity = 0;
        return false;
      }
    }
    return $gameSystem.isShowEventMiniLabel();
};

Window_EventMiniLabel.prototype.withinRange = function() {
    if (this._range >= 500) return true;
    var player = $gamePlayer;
    var chara = this._character;
    if (this._range >= Math.abs(player.x - chara.x)) {
      if (this._range >= Math.abs(player.y - chara.y)) {
        return true;
      }
    }
    return false;
};

Window_EventMiniLabel.prototype.meetsFacingRequirements = function() {
  if (!this._character) return true;
  if (!this._reqFacing) return true;
  var direction = $gamePlayer.direction();
  var playerX = $gamePlayer.x;
  var playerY = $gamePlayer.y;
  var eventX = this._character.x;
  var eventY = this._character.y;
  switch (direction) {
  case 1:
    return playerX >= eventX && playerY <= eventY;
    break;
  case 2:
    return playerY <= eventY;
    break;
  case 3:
    return playerX <= eventX && playerY <= eventY;
    break;
  case 4:
    return playerX >= eventX;
    break;
  case 6:
    return playerX <= eventX;
    break;
  case 7:
    return playerX >= eventX && playerY >= eventY;
    break;
  case 8:
    return playerY >= eventY;
    break;
  case 9:
    return playerX <= eventX && playerY >= eventY;
    break;
  default:
    return true;
    break;
  }
};

//=============================================================================
// Sprite_Character
//=============================================================================

Yanfly.EML.Sprite_Character_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() {
    Yanfly.EML.Sprite_Character_update.call(this);
    this.updateMiniLabel();
};

Sprite_Character.prototype.setupMiniLabel = function() {
    if (this._miniLabel) return;
    this._miniLabel = new Window_EventMiniLabel();
    this._miniLabel.setCharacter(this._character);
    this.addChild(this._miniLabel);
};

Sprite_Character.prototype.positionMiniLabel = function() {
    var win = this._miniLabel;
    var width = win.width * win.scale.x;
    win.x = -width / 2 + win.bufferX();
    var height = win.height * win.scale.y;
    var buffer = win.bufferY() * win.scale.y;
    win.y = -this.height - height + buffer;
};


Sprite_Character.prototype.updateMiniLabelZoom = function() {
    if (!this._miniLabel) return;
    var spriteset = SceneManager._scene._spriteset;
    if (spriteset && spriteset.scale) {
        this._miniLabel.scale.x = 1 / spriteset.scale.x;
        this._miniLabel.scale.y = 1 / spriteset.scale.y;
    } else {
        this._miniLabel.scale.x = 1;
        this._miniLabel.scale.y = 1;
    }
};

Sprite_Character.prototype.updateMiniLabel = function() {
    if (!this._character || !$gameMap._events[this._character._eventId]) {
        if (this._miniLabel) {
            this._miniLabel.visible = false;
        }
        return;
    }
    this.setupMiniLabel();
    if (!this._miniLabel) return;
    this.positionMiniLabel();
    this.updateMiniLabelZoom(); 
};
;


Sprite_Character.prototype.refreshMiniLabel = function() {
    if (this._miniLabel) this._miniLabel.forceRefresh();
};

//=============================================================================
// Spriteset_Map
//=============================================================================

Spriteset_Map.prototype.findCharacterSprite = function(character) {
    for (var i = 0; i < this._characterSprites.length; i++) {
        if (this._characterSprites[i]._character === character) {
            return this._characterSprites[i];
        }
    }
    return null;
};

//=============================================================================
// Scene_Map
//=============================================================================

// 保存原始的 Scene_Map.prototype.start 方法
Yanfly.EML.Scene_Map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
    Yanfly.EML.Scene_Map_start.call(this);
    this.refreshAllMiniLabels();
};

Scene_Map.prototype.refreshAllMiniLabels = function () {
  const ss = this._spriteset;
  if (!ss || !ss._characterSprites) return;

  const list = ss._characterSprites;
  for (let i = 0; i < list.length; i++) {
    const sp = list[i];
    if (!sp) continue;

    const ev = sp._character;
    if (!(ev instanceof Game_Event)) continue;

    // 读取文本（带保护）
    let text = null;
    if (ev && typeof ev.getMiniLabelText === 'function') {
      try { text = ev.getMiniLabelText(); } catch (_) {}
    }

    if (text) {
      // 有文本但还没创建窗口 → 先尝试创建
      if (!sp._miniLabel) {
        if (typeof sp.setupMiniLabel === 'function') {
          try { sp.setupMiniLabel(); } catch (_) {}
        } else if (typeof sp.refreshMiniLabel === 'function') {
          try { sp.refreshMiniLabel(); } catch (_) {}
        }
      }
      // 现在再安全地设置文字
      if (sp._miniLabel && typeof sp._miniLabel.setGoodsText === 'function') {
        sp._miniLabel._noFresh  = true;
        sp._miniLabel._bufferY = 20;
        try { sp._miniLabel.setGoodsText(text); } catch (_) {}
      }
    } else {
      // 无文本就按原逻辑刷新
      if (typeof sp.refreshMiniLabel === 'function') {
        try { sp.refreshMiniLabel(); } catch (_) {}
      }
    }
  }
};

//=============================================================================
// 结束
//=============================================================================





