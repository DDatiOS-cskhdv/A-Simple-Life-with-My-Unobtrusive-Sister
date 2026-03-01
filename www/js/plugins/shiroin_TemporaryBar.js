//=============================================================================
 /*:
 * @plugindesc 蓄力条的实现
 * @author 
 */
//=============================================================================

(function() {
    var activeBars = {};

    function Sprite_TemporaryBar(eventId, playerVariableId, fillValueMax) {
        this.initialize.apply(this, arguments);
    }

    Sprite_TemporaryBar.prototype = Object.create(Sprite.prototype);
    Sprite_TemporaryBar.prototype.constructor = Sprite_TemporaryBar;

    Sprite_TemporaryBar.prototype.initialize = function(eventId, playerVariableId, fillValueMax) {
        Sprite.prototype.initialize.call(this);
        this._active = true;
        this._eventId = eventId;
        this._playerVariableId = playerVariableId;
        this._fillValueMax = fillValueMax || 100;
        this._target = eventId === -1 ? $gamePlayer : $gameMap.event(eventId);
        this._fillVariableId = eventId === -1 ? this._playerVariableId : $gameSelfVariables.value([$gameMap._mapId, this._eventId, "cost"]);
        this.createBitmap();
        this.update();
        SceneManager._scene.addChild(this);
    };

    Sprite_TemporaryBar.prototype.createBitmap = function() {
        this.bitmap = new Bitmap(48, 4); // Assuming fixed size for simplicity
        this.anchor.x = 0.5;
        this.anchor.y = 1;
        this.opacity = 0;
    };

    Sprite_TemporaryBar.prototype.update = function() {
        if (!this._active) return;
        Sprite.prototype.update.call(this);
        var fillValue = this._eventId === -1 ? $gameVariables.value(this._fillVariableId) : $gameSelfVariables.value([$gameMap._mapId, this._eventId, "cost"]);
        var fillWidth = fillValue / this._fillValueMax * this.bitmap.width;
        this.bitmap.clear();
        this.bitmap.fillAll('rgba(0,0,0,0.6)');

        // 检查fillValue是否达到或超过了fillValueMax，并设置相应的颜色
        var fillColor = fillValue >= this._fillValueMax ? 'rgba(0,255,0,0.8)' : 'rgba(255,255,255,1)';
        this.bitmap.fillRect((this.bitmap.width - fillWidth) / 2, 0, fillWidth, this.bitmap.height, fillColor);

        this.x = $gameScreen.zoomScale() * this._target.screenX();
        this.y = $gameScreen.zoomScale() * (this._target.screenY() + 12); 

        if (fillValue < this._fillValueMax) {
            this.opacity = Math.min(this.opacity + 8, 255); 
        }
    };

    Sprite_TemporaryBar.prototype.destroy = function() {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.bitmap = null;
        this._active = false;
        if (activeBars[this._eventId]) {
            delete activeBars[this._eventId];
        }
    };

    window.createTemporaryBar = function(eventId, playerVariableId, fillValueMax) {
        if (activeBars[eventId]) {
            return;
        }
        var newBar = new Sprite_TemporaryBar(eventId, playerVariableId, fillValueMax);
        activeBars[eventId] = newBar;
    };

    window.destroyTemporaryBar = function(eventId) {
        if (activeBars[eventId]) {
            activeBars[eventId].destroy();
        }
    };

})();
