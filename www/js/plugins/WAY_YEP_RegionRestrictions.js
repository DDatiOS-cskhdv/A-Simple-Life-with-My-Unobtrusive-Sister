/* globals WAY, WAYModuleLoader, Game_SpawnEvent */
// ===========================================================================
// WAY_YEP_RegionRestrictions.js
// ===========================================================================

/*:
@plugindesc v1.2.1 Addon to Yanfly's RegionRestrictions Plugin. <WAY_YEP_RegionRestrictions>

@author waynee95

@help
==============================================================================
 ■ Notetags
==============================================================================
---Event:
<Bypass Restriction: x>
<Bypass Restriction: x, x, ...>

Use this notetag in the event's notebox and the event can bypass the specified
region.

<Force Restriction: x>
<Force Restriction: x, x...>

When you use this notetag and the event has the through flag, it will check
the setting for the specified region ids first instead of going "through"
no matter what.

==============================================================================
 ■ Terms of Use
==============================================================================
This work is licensed under the MIT license.

More info here: https://github.com/waynee95/mv-plugins/blob/master/LICENSE

==============================================================================
 ■ Contact Information
==============================================================================
Forum Link: https://forums.rpgmakerweb.com/index.php?members/waynee95.88436/
Website: http://waynee95.me/
Discord Name: waynee95#4261
*/
"use strict";

if (typeof WAY === "undefined") {
  console.error("You need to install WAY_Core!"); // eslint-disable-line no-console

  if (Utils.isNwjs() && Utils.isOptionValid("test")) {
    var gui = require("nw.gui"); //eslint-disable-line

    gui.Window.get().showDevTools();
  }

  SceneManager.stop();
} else {
  WAYModuleLoader.registerPlugin("WAY_YEP_RegionRestrictions", "1.2.1", "waynee95");
}

(function ($) {
  var _WAY$Util = WAY.Util,
      getNotetag = _WAY$Util.getNotetag,
      toArray = _WAY$Util.toArray; //==========================================================================
  // DataManager
  //==========================================================================

  $.alias.DataManager_extractMetadata = DataManager.extractMetadata;

  DataManager.extractMetadata = function (object) {
    $.alias.DataManager_extractMetadata.call(this, object);

    if (object === $dataMap) {
      var events = $dataMap.events;
      events.forEach(function (event) {
        if (event) {
          event._bypassRestriction = getNotetag(event.note, "Bypass Restriction", [], toArray);
          event._forceRestriction = getNotetag(event.note, "Force Restriction", [], toArray);
        }
      });
    }
  };

  //==========================================================================
  // Game_Event
  //==========================================================================

  // 添加以下代码来处理动态创建的事件
  var _Game_Event_initialize = Game_Event.prototype.initialize;
  Game_Event.prototype.initialize = function(mapId, eventId) {
    _Game_Event_initialize.call(this, mapId, eventId);

    var event = this.event();
    if (event) {
      event._bypassRestriction = getNotetag(event.note, "Bypass Restriction", [], toArray);
      event._forceRestriction = getNotetag(event.note, "Force Restriction", [], toArray);
    }
  };

  //==========================================================================
  // Game_CharacterBase
  //==========================================================================

  $.alias.Game_CharacterBase_isEventRegionForbid = Game_CharacterBase.prototype.isEventRegionForbid;
  $.alias.Game_CharacterBase_isEventRegionAllow = Game_CharacterBase.prototype.isEventRegionAllow;
  $.alias.Game_CharacterBase_canPass = Game_CharacterBase.prototype.canPass;

  Game_CharacterBase.prototype.isEventRegionForbid = function (x, y, d) {
    var regionId = this.getRegionId(x, y, d);
    var event = this.isEvent() ? this.event() : null;

    if (event && event._bypassRestriction && event._bypassRestriction.contains(regionId)) {
      return false;
    }

    if (this.isPlayer()) return false;

    if (event && event._forceRestriction && event._forceRestriction.contains(regionId)) {
      return true;
    }

    if (regionId === 0) return false;
    if ($gameMap.restrictEventRegions().contains(regionId)) return true;
    return false;
  };

  Game_CharacterBase.prototype.isEventRegionAllow = function (x, y, d) {
    var regionId = this.getRegionId(x, y, d);
    var event = this.isEvent() ? this.event() : null;

    if (event && event._bypassRestriction && event._bypassRestriction.contains(regionId)) {
      return true;
    }

    if (this.isPlayer()) return false;
    if (regionId === 0) return false;
    if ($gameMap.allowEventRegions().contains(regionId)) return true;
    return false;
  };

  Game_CharacterBase.prototype.canPass = function (x, y, d) {
    var x2 = $gameMap.roundXWithDirection(x, d);
    var y2 = $gameMap.roundYWithDirection(y, d);

    if (!$gameMap.isValid(x2, y2)) {
      return false;
    }

    var isThrough = this.isThrough() || this.isDebugThrough();

    if (isThrough && this.getRegionId(x, y, d) === 0) {
      return true;
    }

    if (!this.isMapPassable(x, y, d) || this.isCollidedWithCharacters(x2, y2)) {
      return false;
    }

    return true;
  };
  
  //==========================================================================
  // 与其他插件的兼容性处理（例如 Galv_EventSpawner）
  //==========================================================================

  if (Imported.Galv_EventSpawner) {
    $.alias.Game_SpawnEvent_init = Game_SpawnEvent.prototype.initialize;

    Game_SpawnEvent.prototype.initialize = function () {
      $.alias.Game_SpawnEvent_init.apply(this, arguments);
      var event = this.event();
      event._bypassRestriction = getNotetag(event.note, "Bypass Restriction", [], toArray);
      event._forceRestriction = getNotetag(event.note, "Force Restriction", [], toArray);
    };
  }
})(WAYModuleLoader.getModule("WAY_YEP_RegionRestrictions"));




(function(){
  // 兼容：在 DotMoveSystem 的角色-角色碰撞点，注入“共享标签则跳过”
  if (window.DotMoveSystem && DotMoveSystem.CharacterCollisionChecker) {
    const _checkCharacter = DotMoveSystem.CharacterCollisionChecker.prototype.checkCharacter;
    DotMoveSystem.CharacterCollisionChecker.prototype.checkCharacter = function(x, y, d, character) {
      try {
        const subj = this._character;
        if (subj && character && subj.drill_ETh_getTagList && character.drill_ETh_getTagList) {
          const a = subj.drill_ETh_getTagList();
          const b = character.drill_ETh_getTagList();
          if (Array.isArray(a) && Array.isArray(b)) {
            // 是否有任一共享标签
            const set = new Set(a);
            for (let i = 0; i < b.length; i++) {
              if (set.has(b[i])) {
                // 共享标签：视为可互相穿透 -> 不返回碰撞
                return undefined;
              }
            }
          }
        }
      } catch(e) { /* 静默兼容 */ }
      // 其余情况走原有像素碰撞
      return _checkCharacter.call(this, x, y, d, character);
    };
  }
})();
