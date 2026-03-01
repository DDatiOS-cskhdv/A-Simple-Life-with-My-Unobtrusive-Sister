//=============================================================================
 /*:
 * @plugindesc 为敌人事件显示自变量HP槽
 * @author shiroin
 */
//=============================================================================

(function() {

function Sprite_HpGauge() {
    this.initialize.apply(this, arguments);
}

Sprite_HpGauge.prototype = Object.create(Sprite.prototype);
Sprite_HpGauge.prototype.constructor = Sprite_HpGauge;

Sprite_HpGauge.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this._currentHp = 0; 
    this._maxHp = 0; 
    this._fadeDuration = 120; 
    this._fadeTimer = this._fadeDuration;
    this._hpBarWidth = 64;
    this._hpBarHeight = 6;
    this._frameHeight = 48;
    this._needsRemoval = false; // 添加这一行
};

Sprite_HpGauge.prototype.checkCharacterFrameSize = function(event) {
    var characterName = event.characterName();
    // 添加检查，如果 characterName 不存在，使用默认值
    if (!characterName || characterName.trim() === '') {
        this._frameHeight = 48; // 默认值
        this._hpBarWidth = 64; // 默认值
        return;
    }
    
    var bitmap = ImageManager.loadCharacter(characterName);
    var frameRows = characterName.startsWith('!$') || characterName.startsWith('$') ? 4 : 8;
    var frameColumns = characterName.startsWith('!$') || characterName.startsWith('$') ? 3 : 12;
    if (bitmap && bitmap.isReady()) {
        this._frameHeight = bitmap.height / frameRows;
        this._frameHeight = Math.max(this._frameHeight, 24);
        this._hpBarWidth = Math.round(1.5 * (bitmap.width / frameColumns));
    } else if (bitmap) {
        bitmap.addLoadListener(function() {
            this._frameHeight = bitmap.height / frameRows;
            this._frameHeight = Math.max(this._frameHeight, 24);
            this._hpBarWidth = Math.round(1.2 * (bitmap.width / frameColumns));
        }.bind(this));
    }
};


Sprite_HpGauge.prototype.createnemyHpBar = function(eventId) {
    this._eventId = eventId;  
    var event = $gameMap.event(eventId);
    if (!event){ return; }
    this.checkCharacterFrameSize(event);

    var currentHp = $gameSelfVariables.value([$gameMap._mapId, eventId, "HP"]);
    var maxHp = $gameSelfVariables.value([$gameMap._mapId, eventId, "MHP"]);

    // 添加检查，确保 currentHp 和 maxHp 有效
    if (currentHp == null || maxHp == null || maxHp <= 0) {
        return;
    }

    var frameHeightOffset = this._frameHeight + 6;
    var hpBarHeight = Math.round(this._hpBarWidth / 12);
	    hpBarHeight = Math.max(4, Math.min(hpBarHeight, 12));
    var radius = Math.min(Math.round(hpBarHeight / 2), 6);

    this._currentHp = currentHp; 
    this._maxHp = maxHp; 

    this.bitmap = new Bitmap(this._hpBarWidth, hpBarHeight);
    this.bitmap.fillRoundRect(0, 0, this._hpBarWidth, hpBarHeight, radius, 'rgba(0,0,0,0.4)'); 
    this.bitmap.gradientFillRoundRect(0, 0, (currentHp / maxHp) * this._hpBarWidth, hpBarHeight, radius, 'rgba(255,0,0,0.8)' ,'rgba(255,90,0,0.8)'); 

    this.x = $gameScreen.zoomScale() * event.screenX() - this._hpBarWidth / 2;
    this.y = $gameScreen.zoomScale() * (event.screenY());// - frameHeightOffset);
    this.z = 5; 
};

Sprite_HpGauge.prototype.update = function() {
    Sprite.prototype.update.call(this);

    var event = $gameMap.event(this._eventId);
    if (!event) {
        this._needsRemoval = true; // 设置为需要移除
        return;
    }

    var newCurrentHp = $gameSelfVariables.value([$gameMap._mapId, this._eventId, "HP"]);
    if (newCurrentHp == null || newCurrentHp <= 0) {
        this._needsRemoval = true; // 设置为需要移除
        return;
    }       
    this.updatePosition();
    this.refresh();

    if (this._fadeTimer > 0) {
        this._fadeTimer--;
        this.visible = true; 
    } else {
        this.opacity -= 255 / this._fadeDuration;
        if (this.opacity <= 0) {
            this.visible = false; 
            this.opacity = 255; 
            this._fadeTimer = this._fadeDuration; 
            this.clear();
        }
    }
};


Sprite_HpGauge.prototype.updatePosition = function() {
    var event = $gameMap.event(this._eventId); 
    if (event) {
        var frameHeightOffset = this._frameHeight + 6;
        this.x = $gameScreen.zoomScale() * event.screenX() - this._hpBarWidth / 2;
        this.y = $gameScreen.zoomScale() * (event.screenY() - frameHeightOffset); 
    }
};


Sprite_HpGauge.prototype.refresh = function() {
    var event = $gameMap.event(this._eventId);
    if (!event) {
        this._needsRemoval = true; // 设置为需要移除
        return;
    }

    var newCurrentHp = $gameSelfVariables.value([$gameMap._mapId, this._eventId, "HP"]);
    var newMaxHp = $gameSelfVariables.value([$gameMap._mapId, this._eventId, "MHP"]);

    if (newCurrentHp == null || newMaxHp == null || newMaxHp <= 0) {
        this._needsRemoval = true; // 设置为需要移除
        return;
    }

    if (newCurrentHp !== this._currentHp || newMaxHp !== this._maxHp) {
        this._currentHp = newCurrentHp; 
        this._maxHp = newMaxHp; 
        this.clear(); 
        this.createnemyHpBar(this._eventId);		
        this.opacity = 255;
        this._fadeTimer = this._fadeDuration;
    }
};

Sprite_HpGauge.prototype.clear = function() {
    if (this.bitmap) {
        this.bitmap.clear();
    }
};

Sprite_HpGauge.prototype.remove = function() {
    this._needsRemoval = true;
};

Game_CharacterBase.prototype.showHpBar = function() {
    if (this instanceof Game_Event) { 
        this.createHpGauge();
    }
};


Game_Event.prototype.createHpGauge = function() {
    var page = this.page();
    
    // 检查页面是否存在，防止报错
    if (!page || !page.list) {
        return null; // 如果页面不存在，直接返回
    }

    var list = page.list;
    for (var i = 0; i < list.length; i++) {
        if (list[i].code === 108 || list[i].code === 408) {
            var comment = list[i].parameters[0];
            if (comment.contains("<No HPGauge>")) {
                return null; // 如果找到注释，则不创建 HP 条
            }
        }
    }

    var currentHp = $gameSelfVariables.value([$gameMap._mapId, this._eventId, "HP"]);
    if (currentHp == null || currentHp <= 0) return null; // 如果 HP 无效或为 0 或以下，不创建 HP 条

    // 调用场景的方法来创建 HP 条
    SceneManager._scene.createHpGaugeForEvent(this._eventId);
};

Scene_Map.prototype.createHpGaugeForEvent = function(eventId) {
    if (!this._hpGaugeSprites) this._hpGaugeSprites = {};
    if (this._hpGaugeSprites[eventId]) return; // 已经有了，不需要再创建

    var sprite = new Sprite_HpGauge();
    sprite.createnemyHpBar(eventId);
    this._hpGaugeSprites[eventId] = sprite;
    this.addChild(sprite);
};

var _Scene_Map_update_HpGauge = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _Scene_Map_update_HpGauge.call(this);

    if (this._hpGaugeSprites) {
        for (var eventId in this._hpGaugeSprites) {
            var sprite = this._hpGaugeSprites[eventId];
            if (sprite) {
                sprite.update();

                if (sprite._needsRemoval) {
                    // 移除精灵
                    this.removeChild(sprite);
                    delete this._hpGaugeSprites[eventId];
                }
            }
        }
    }
};

var _Scene_Map_terminate_HpGauge = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
    if (this._hpGaugeSprites) {
        for (var eventId in this._hpGaugeSprites) {
            var sprite = this._hpGaugeSprites[eventId];
            if (sprite) {
                this.removeChild(sprite);
            }
        }
        this._hpGaugeSprites = null;
    }
    _Scene_Map_terminate_HpGauge.call(this);
};

})();

