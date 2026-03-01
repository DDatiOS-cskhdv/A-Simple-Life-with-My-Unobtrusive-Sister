//=============================================================================
// YEP_MapSelectEquip - Armor Atype Filter (Graphic Buttons)
//=============================================================================
/*:
 * @plugindesc v1.00 Add 3 graphic armor loot-pool filter buttons above the
 * Map Select Equip window when selecting ARMORS. Works alongside your
 * current WtypeFilter version.
 * @author You
 *
 * @help
 * ============================================================================
 * Requirements & Order
 * ============================================================================
 * 1) YEP_MapSelectEquip.js
 * 2) YEP_MapSelectEquip_WtypeFilter.js  (your current tested version)
 * 3) This plugin (Armor Atype/LootPool filter)
 *
 * Place this plugin BELOW your WtypeFilter file.
 *
 * ============================================================================
 * What it does
 * ============================================================================
 * When the Map Select Equip window is opened with type = ARMORS,
 * 3 graphic buttons appear above it:
 *
 *  - 进攻型装备  -> <Loot Pool: OffensiveGear>
 *  - 辅助型装备  -> <Loot Pool: SupportGear>
 *  - 召唤型装备  -> <Loot Pool: ServantGear>
 *
 * Default state:
 *  - No filter active
 *  - All 3 buttons semi-transparent
 *  - Armor list shows ALL armors
 *
 * Click behavior:
 *  - Click a button to activate its filter and highlight it.
 *  - Only one filter can be active at a time.
 *  - Click the highlighted button again to cancel filtering.
 *
 * ============================================================================
 * Note tag detection
 * ============================================================================
 * This filter does NOT use atypeId.
 * It checks the armor's note for the Loot Pool tag above.
 *
 * If your armor instances have baseItemId (independent equips),
 * this addon will read the note from:
 *   $dataArmors[item.baseItemId]
 *
 * ============================================================================
 * Graphic assets
 * ============================================================================
 * Place 3 images in img/system/ with the following default names:
 *
 *   AFilter_Offensive
 *   AFilter_Support
 *   AFilter_Servant
 *
 * You may rename them by editing IMAGE_NAMES below.
 *
 * ============================================================================
 * Position tweak
 * ============================================================================
 * You can adjust ABAR_GAP_X / ABAR_GAP_Y / ABAR_OFFSET_X / ABAR_OFFSET_Y
 * near the top of the code to fine-tune the icon group position.
 */
//=============================================================================

var Imported = Imported || {};
Imported.YEP_MapSelectEquip_ArmorLootPoolFilter = true;

(function() {

  if (!Imported.YEP_MapSelectEquip) {
    console.warn('ArmorLootPoolFilter: Missing base plugin YEP_MapSelectEquip.');
    return;
  }

  // --------------------------------------------------------------------------
  // Config
  // --------------------------------------------------------------------------
  const TAGS = {
    offensive: 'OffensiveGear',
    support:   'SupportGear',
    servant:   'ServantGear'
  };

  // Default system image names (no extension)
  const IMAGE_NAMES = {
    offensive: 'AFilter_Offensive',
    support:   'AFilter_Support',
    servant:   'AFilter_Servant'
  };

  const INACTIVE_OPACITY = 100;
  const ACTIVE_OPACITY   = 255;

  const ABAR_GAP_Y        = 6;
  const ABAR_GAP_X        = -16;
  const ABAR_OFFSET_X     = -15;
  const ABAR_OFFSET_Y     = 18;

  // --------------------------------------------------------------------------
  // Helpers
  // --------------------------------------------------------------------------
  function resolveBaseArmor(item) {
    if (!item) return item;
    if (item.baseItemId && $dataArmors && $dataArmors[item.baseItemId]) {
      return $dataArmors[item.baseItemId];
    }
    return item;
  }

  function armorNote(item) {
    const base = resolveBaseArmor(item);
    return base && base.note ? String(base.note) : '';
  }

  function hasLootPoolTag(note, poolName) {
    if (!note || !poolName) return false;
    const re = new RegExp('<\\s*Loot\\s*Pool\\s*:\\s*' + poolName + '\\s*>', 'i');
    return re.test(note);
  }

  // --------------------------------------------------------------------------
  // Extend Window_MapSelectEquip with armor filter state + logic
  // --------------------------------------------------------------------------
  const _MSE_setup_Armor = Window_MapSelectEquip.prototype.setup;
  Window_MapSelectEquip.prototype.setup = function(varId, type, base, batchSelect) {
    _MSE_setup_Armor.call(this, varId, type, base, batchSelect);

    const upper = String(type || '').toUpperCase();
    if (upper === 'ARMORS') {
      this._armorFilterSymbol = null;
    } else {
      this._armorFilterSymbol = null;
    }

    const scene = SceneManager._scene;
    if (scene && scene.syncMapSelectArmorFilterSprites) {
      scene.syncMapSelectArmorFilterSprites(true);
    }
  };

  Window_MapSelectEquip.prototype.armorFilterSymbol = function() {
    return this._armorFilterSymbol || null;
  };

  Window_MapSelectEquip.prototype.setArmorFilterSymbol = function(symbol) {
    this._armorFilterSymbol = symbol || null;
  };

  Window_MapSelectEquip.prototype.toggleArmorFilter = function(symbol) {
    symbol = symbol || null;
    if (this.armorFilterSymbol() === symbol) {
      this.setArmorFilterSymbol(null);
    } else {
      this.setArmorFilterSymbol(symbol);
    }
    this.refresh();
	this.select(0);
  };

  Window_MapSelectEquip.prototype.armorPassesLootPoolFilter = function(item) {
    if (this._type !== 'ARMORS') return true;
    const symbol = this.armorFilterSymbol();
    if (!symbol) return true;

    const poolName = TAGS[symbol];
    if (!poolName) return true;

    const note = armorNote(item);
    return hasLootPoolTag(note, poolName);
  };

  const _MSE_includes_Armor = Window_MapSelectEquip.prototype.includes;
  Window_MapSelectEquip.prototype.includes = function(item) {
    if (!_MSE_includes_Armor.call(this, item)) return false;

    if (DataManager.isArmor(item) && this._type === 'ARMORS') {
      return this.armorPassesLootPoolFilter(item);
    }
    return true;
  };

  // Ensure sprites follow open/close lifecycle.
  const _MSE_open_Armor = Window_MapSelectEquip.prototype.open;
  Window_MapSelectEquip.prototype.open = function() {
    _MSE_open_Armor.call(this);
    const scene = SceneManager._scene;
    if (scene && scene.syncMapSelectArmorFilterSprites) {
      scene.syncMapSelectArmorFilterSprites(true);
    }
  };

  const _MSE_close_Armor = Window_MapSelectEquip.prototype.close;
  Window_MapSelectEquip.prototype.close = function() {
    _MSE_close_Armor.call(this);
    const scene = SceneManager._scene;
    if (scene && scene.hideMapSelectArmorFilterSprites) {
      scene.hideMapSelectArmorFilterSprites();
    }
  };

  // --------------------------------------------------------------------------
  // Sprite Button
  // --------------------------------------------------------------------------
  function Sprite_MapSelectArmorFilterButton() {
    this.initialize.apply(this, arguments);
  }

  Sprite_MapSelectArmorFilterButton.prototype = Object.create(Sprite.prototype);
  Sprite_MapSelectArmorFilterButton.prototype.constructor = Sprite_MapSelectArmorFilterButton;

  Sprite_MapSelectArmorFilterButton.prototype.initialize = function(symbol, equipWindow, onClick) {
    Sprite.prototype.initialize.call(this);
    this._symbol = symbol;
    this._equipWindow = equipWindow;
    this._onClick = onClick;
    this.anchor.x = 0;
    this.anchor.y = 0;
    this.bitmap = ImageManager.loadSystem(IMAGE_NAMES[symbol] || '');
    this.visible = false;
    this.opacity = INACTIVE_OPACITY;
  };

  Sprite_MapSelectArmorFilterButton.prototype.symbol = function() {
    return this._symbol;
  };

  Sprite_MapSelectArmorFilterButton.prototype.isActiveSymbol = function() {
    const ew = this._equipWindow;
    if (!ew || !ew.armorFilterSymbol) return false;
    return ew.armorFilterSymbol() === this._symbol;
  };

  Sprite_MapSelectArmorFilterButton.prototype.hasAnyFilter = function() {
    const ew = this._equipWindow;
    if (!ew || !ew.armorFilterSymbol) return false;
    return !!ew.armorFilterSymbol();
  };

  Sprite_MapSelectArmorFilterButton.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateOpacity();
    this.processTouch();
  };

  Sprite_MapSelectArmorFilterButton.prototype.updateOpacity = function() {
    if (!this.visible) return;
    if (!this.hasAnyFilter()) {
      this.opacity = INACTIVE_OPACITY;
    } else {
      this.opacity = this.isActiveSymbol() ? ACTIVE_OPACITY : INACTIVE_OPACITY;
    }
  };

  Sprite_MapSelectArmorFilterButton.prototype.processTouch = function() {
    if (!this.visible) return;
    if (!this.bitmap || !this.bitmap.isReady()) return;

    if (TouchInput.isTriggered()) {
      if (this.isTouched()) {
        TouchInput.clear();
        if (this._onClick) {
			this._onClick(this._symbol);
			AudioManager.playSe({ name: "Equip2", volume: 80, pitch: 90+Math.randomInt(30), pan: 0 });
		}
      }
    }
  };

  Sprite_MapSelectArmorFilterButton.prototype.isTouched = function() {
    const x = TouchInput.x;
    const y = TouchInput.y;
    const w = this.bitmap.width;
    const h = this.bitmap.height;
    return x >= this.x && x < this.x + w && y >= this.y && y < this.y + h;
  };

  // --------------------------------------------------------------------------
  // Scene_Map integration (create + sync sprites)
  // --------------------------------------------------------------------------
  const _Scene_Map_createAllWindows_Armor = Scene_Map.prototype.createAllWindows;
  Scene_Map.prototype.createAllWindows = function() {
    _Scene_Map_createAllWindows_Armor.call(this);
    this.createMapSelectArmorFilterSprites();
  };

  Scene_Map.prototype.createMapSelectArmorFilterSprites = function() {
    if (this._MapSelectArmorFilterSprites) return;
    if (!this._MapSelectEquipWindow) return;

    const ew = this._MapSelectEquipWindow;
    this._MapSelectArmorFilterSprites = [];

    const make = (symbol) => {
      const spr = new Sprite_MapSelectArmorFilterButton(
        symbol,
        ew,
        this.onMapSelectArmorFilterSpriteClick.bind(this)
      );
      this._MapSelectArmorFilterSprites.push(spr);
      this.addChild(spr);
    };

    make('offensive');
    make('support');
    make('servant');

    this.updateMapSelectArmorFilterSpritesPlacement();
    this.hideMapSelectArmorFilterSprites();
  };

  Scene_Map.prototype.onMapSelectArmorFilterSpriteClick = function(symbol) {
    const ew = this._MapSelectEquipWindow;
    if (!ew) return;
    if (ew._type !== 'ARMORS') return;

    if (ew.toggleArmorFilter) {
      ew.toggleArmorFilter(symbol);
    }

    this.syncMapSelectArmorFilterSprites(true);
    if (ew.activate) ew.activate();
  };

  Scene_Map.prototype.updateMapSelectArmorFilterSpritesPlacement = function() {
    const ew = this._MapSelectEquipWindow;
    const list = this._MapSelectArmorFilterSprites;
    if (!ew || !list || list.length === 0) return;

    const widths = list.map(s => (s.bitmap && s.bitmap.isReady()) ? s.bitmap.width : 0);
    const heights = list.map(s => (s.bitmap && s.bitmap.isReady()) ? s.bitmap.height : 0);
    const maxH = Math.max.apply(null, heights.concat([0]));
    if (maxH <= 0) return;

    const totalW = widths.reduce((a,b) => a + b, 0) + ABAR_GAP_X * (list.length - 1);
    const startX = ew.x + Math.max(0, Math.floor((ew.width - totalW) / 2)) + ABAR_OFFSET_X;
    const y = ew.y - maxH - ABAR_GAP_Y + ABAR_OFFSET_Y;

    let x = startX;
    for (let i = 0; i < list.length; i++) {
      const spr = list[i];
      const w = widths[i] || 0;
      const h = heights[i] || maxH;
      spr.x = x;
      spr.y = y + Math.floor((maxH - h) / 2);
      x += w + ABAR_GAP_X;
    }
  };

  Scene_Map.prototype.showMapSelectArmorFilterSprites = function() {
    const list = this._MapSelectArmorFilterSprites;
    if (!list) return;
    list.forEach(s => s.visible = true);
  };

  Scene_Map.prototype.hideMapSelectArmorFilterSprites = function() {
    const list = this._MapSelectArmorFilterSprites;
    if (!list) return;
    list.forEach(s => s.visible = false);
  };

  Scene_Map.prototype.syncMapSelectArmorFilterSprites = function(force) {
    const ew = this._MapSelectEquipWindow;
    const list = this._MapSelectArmorFilterSprites;
    if (!ew || !list) return;

    const shouldShow = (ew._type === 'ARMORS') && (ew.openness > 0);

    if (shouldShow) {
      this.updateMapSelectArmorFilterSpritesPlacement();
      this.showMapSelectArmorFilterSprites();
      if (force) list.forEach(s => s.updateOpacity && s.updateOpacity());
    } else {
      this.hideMapSelectArmorFilterSprites();
    }
  };

  const _Scene_Map_update_Armor = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function() {
    _Scene_Map_update_Armor.call(this);
    if (this._MapSelectArmorFilterSprites && this._MapSelectEquipWindow) {
      this.syncMapSelectArmorFilterSprites(false);
    }
  };

  // Also hide in explicit close flows
  const _onMapSelectEquipCancel_Armor = Scene_Map.prototype.onMapSelectEquipCancel;
  Scene_Map.prototype.onMapSelectEquipCancel = function() {
    _onMapSelectEquipCancel_Armor.call(this);
    this.hideMapSelectArmorFilterSprites();
  };

  const _onActionDiscard_Armor = Scene_Map.prototype.onActionDiscard;
  Scene_Map.prototype.onActionDiscard = function() {
    _onActionDiscard_Armor.call(this);
    this.hideMapSelectArmorFilterSprites();
  };

  const _onActionEquip_Armor = Scene_Map.prototype.onActionEquip;
  Scene_Map.prototype.onActionEquip = function() {
    _onActionEquip_Armor.call(this);
    this.hideMapSelectArmorFilterSprites();
  };

})();