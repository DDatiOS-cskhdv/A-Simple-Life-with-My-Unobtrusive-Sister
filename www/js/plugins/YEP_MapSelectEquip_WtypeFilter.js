//=============================================================================
// YEP_MapSelectEquip - Weapon Wtype Filter (Graphic Buttons)
//=============================================================================
/*:
 * @plugindesc v1.10 Add 4 graphic weapon-type filter buttons (by wtypeId)
 * above the Map Select Equip window when selecting WEAPONS.
 * Requires YEP_MapSelectEquip. Place below it.
 * @author You
 *
 * @help
 * This is an ADD-ON for your customized YEP_MapSelectEquip.js.
 *
 * What it does:
 *  - When the Map Select Equip window is opened with type = WEAPONS,
 *    4 graphic buttons will appear above it:
 *      剑   (wtypeId: 1,2)
 *      弓   (wtypeId: 3)
 *      法杖 (wtypeId: 5,6,7)
 *      其他 (all remaining)
 *  - Default state: no filter active, all 4 buttons semi-transparent,
 *    weapon list shows ALL weapons.
 *  - Tap/click a button:
 *      * Activates that filter and highlights the button.
 *      * Only one filter at a time.
 *  - Tap/click the highlighted button again:
 *      * Cancels filtering and returns to the default state.
 *
 * Graphic assets:
 *  Place 4 images in img/system/ with the following default names:
 *    WFilter_Sword
 *    WFilter_Bow
 *    WFilter_Staff
 *    WFilter_Other
 *
 * You may rename them by editing the IMAGE_NAMES mapping near the top.
 *
 * Compatibility:
 *  - Filtering only affects the weapon list (type === 'WEAPONS').
 *  - If your weapon instances have baseItemId (independent equips),
 *    this addon will read wtypeId from $dataWeapons[baseItemId] when possible.
 *
 * Notes:
 *  - If you previously enabled the text-button addon
 *    "YEP_MapSelectEquip_WtypeFilter.js", please DISABLE it to avoid duplicates.
 */
//=============================================================================

var Imported = Imported || {};
Imported.YEP_MapSelectEquip_WtypeFilter_Graphic = true;

var Yanfly = Yanfly || {};
Yanfly.MSE = Yanfly.MSE || {};
Yanfly.MSE.WtypeFilterG = Yanfly.MSE.WtypeFilterG || {};
Yanfly.MSE.WtypeFilterG.version = 1.10;

(function() {

  if (!Imported.YEP_MapSelectEquip) {
    console.warn('YEP_MapSelectEquip_WtypeFilter_Graphic: Missing base plugin YEP_MapSelectEquip.');
    return;
  }

  // --------------------------------------------------------------------------
  // Config (hard-coded for your game)
  // --------------------------------------------------------------------------
  const GROUPS = {
    sword:  [1, 2],
    bow:    [3],
    staff:  [4, 5, 6, 7]
  };

  // Default system image names (no extension)
  const IMAGE_NAMES = {
    sword: 'WFilter_Sword',
    bow:   'WFilter_Bow',
    staff: 'WFilter_Staff',
    //other: 'WFilter_Other'
  };

  const INACTIVE_OPACITY = 120;
  const ACTIVE_OPACITY   = 255;
  const BAR_GAP_Y        = 6;
  const BAR_GAP_X        = -16;
  const BAR_OFFSET_X     = -10;  
  const BAR_OFFSET_Y     = 18;  
  function resolveBaseWeapon(item) {
    if (!item) return item;
    if (item.baseItemId && $dataWeapons && $dataWeapons[item.baseItemId]) {
      return $dataWeapons[item.baseItemId];
    }
    return item;
  }

  function weaponWtypeId(item) {
    const base = resolveBaseWeapon(item);
    return base && base.wtypeId ? base.wtypeId : 0;
  }

  function isInGroup(wtypeId, symbol) {
    if (symbol === 'other') {
      const all = [].concat(GROUPS.sword, GROUPS.bow, GROUPS.staff);
      return all.indexOf(wtypeId) < 0;
    }
    const list = GROUPS[symbol] || [];
    return list.indexOf(wtypeId) >= 0;
  }

  // --------------------------------------------------------------------------
  // Extend Window_MapSelectEquip with filter state + logic
  // --------------------------------------------------------------------------
  const _MSE_setup = Window_MapSelectEquip.prototype.setup;
  Window_MapSelectEquip.prototype.setup = function(varId, type, base, batchSelect) {
    _MSE_setup.call(this, varId, type, base, batchSelect);
    // Reset filter whenever opening as WEAPONS
    if (String(type).toUpperCase() === 'WEAPONS') {
      this._weaponFilterSymbol = null;
    } else {
      this._weaponFilterSymbol = null;
    }
    this.refresh();

    const scene = SceneManager._scene;
    if (scene && scene.syncMapSelectWeaponFilterSprites) {
      scene.syncMapSelectWeaponFilterSprites(true);
    }
  };

  Window_MapSelectEquip.prototype.weaponFilterSymbol = function() {
    return this._weaponFilterSymbol || null;
  };

  Window_MapSelectEquip.prototype.setWeaponFilterSymbol = function(symbol) {
    this._weaponFilterSymbol = symbol || null;
  };

  Window_MapSelectEquip.prototype.toggleWeaponFilter = function(symbol) {
    symbol = symbol || null;
    if (this.weaponFilterSymbol() === symbol) {
      this.setWeaponFilterSymbol(null);
    } else {
      this.setWeaponFilterSymbol(symbol);
    }
    this.refresh();
	this.select(0);
  };

  Window_MapSelectEquip.prototype.weaponPassesWtypeFilter = function(item) {
    if (this._type !== 'WEAPONS') return true;
    const symbol = this.weaponFilterSymbol();
    if (!symbol) return true;
    const wtypeId = weaponWtypeId(item);
    return isInGroup(wtypeId, symbol);
  };

  const _MSE_includes = Window_MapSelectEquip.prototype.includes;
  Window_MapSelectEquip.prototype.includes = function(item) {
    if (!_MSE_includes.call(this, item)) return false;
    if (DataManager.isWeapon(item) && this._type === 'WEAPONS') {
      return this.weaponPassesWtypeFilter(item);
    }
    return true;
  };

  // Ensure sprites follow open/close lifecycle robustly.
  const _MSE_open = Window_MapSelectEquip.prototype.open;
  Window_MapSelectEquip.prototype.open = function() {
    _MSE_open.call(this);
    const scene = SceneManager._scene;
    if (scene && scene.syncMapSelectWeaponFilterSprites) {
      scene.syncMapSelectWeaponFilterSprites(true);
    }
  };

  const _MSE_close = Window_MapSelectEquip.prototype.close;
  Window_MapSelectEquip.prototype.close = function() {
    _MSE_close.call(this);
    const scene = SceneManager._scene;
    if (scene && scene.hideMapSelectWeaponFilterSprites) {
      scene.hideMapSelectWeaponFilterSprites();
    }
  };

  // --------------------------------------------------------------------------
  // Sprite Button (simple touch-aware sprite)
  // --------------------------------------------------------------------------
  function Sprite_MapSelectWeaponFilterButton() {
    this.initialize.apply(this, arguments);
  }

  Sprite_MapSelectWeaponFilterButton.prototype = Object.create(Sprite.prototype);
  Sprite_MapSelectWeaponFilterButton.prototype.constructor = Sprite_MapSelectWeaponFilterButton;

  Sprite_MapSelectWeaponFilterButton.prototype.initialize = function(symbol, equipWindow, onClick) {
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

  Sprite_MapSelectWeaponFilterButton.prototype.symbol = function() {
    return this._symbol;
  };

  Sprite_MapSelectWeaponFilterButton.prototype.isActiveSymbol = function() {
    const ew = this._equipWindow;
    if (!ew || !ew.weaponFilterSymbol) return false;
    return ew.weaponFilterSymbol() === this._symbol;
  };

  Sprite_MapSelectWeaponFilterButton.prototype.hasAnyFilter = function() {
    const ew = this._equipWindow;
    if (!ew || !ew.weaponFilterSymbol) return false;
    return !!ew.weaponFilterSymbol();
  };

  Sprite_MapSelectWeaponFilterButton.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateOpacity();
    this.processTouch();
  };

  Sprite_MapSelectWeaponFilterButton.prototype.updateOpacity = function() {
    if (!this.visible) return;
    if (!this.hasAnyFilter()) {
      this.opacity = INACTIVE_OPACITY;
    } else {
      this.opacity = this.isActiveSymbol() ? ACTIVE_OPACITY : INACTIVE_OPACITY;
    }
  };

  Sprite_MapSelectWeaponFilterButton.prototype.processTouch = function() {
    if (!this.visible) return;
    if (!this.bitmap || !this.bitmap.isReady()) return;

    if (TouchInput.isTriggered()) {
      if (this.isTouched()) {
        TouchInput.clear(); // prevent double trigger in same frame
        if (this._onClick) {
			this._onClick(this._symbol);
			AudioManager.playSe({ name: "Equip2", volume: 80, pitch: 90+Math.randomInt(30), pan: 0 });
		}
      }
    }
  };

  Sprite_MapSelectWeaponFilterButton.prototype.isTouched = function() {
    const x = TouchInput.x;
    const y = TouchInput.y;
    const w = this.bitmap.width;
    const h = this.bitmap.height;
    return x >= this.x && x < this.x + w && y >= this.y && y < this.y + h;
  };

  // --------------------------------------------------------------------------
  // Scene_Map integration (create + sync sprites)
  // --------------------------------------------------------------------------
  const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
  Scene_Map.prototype.createAllWindows = function() {
    _Scene_Map_createAllWindows.call(this);
    this.createMapSelectWeaponFilterSprites();
  };

  Scene_Map.prototype.createMapSelectWeaponFilterSprites = function() {
    if (this._MapSelectWeaponFilterSprites) return;
    if (!this._MapSelectEquipWindow) return;

    const ew = this._MapSelectEquipWindow;
    this._MapSelectWeaponFilterSprites = [];

    const make = (symbol) => {
      const spr = new Sprite_MapSelectWeaponFilterButton(
        symbol,
        ew,
        this.onMapSelectWeaponFilterSpriteClick.bind(this)
      );
      this._MapSelectWeaponFilterSprites.push(spr);
      this.addChild(spr);
    };

    make('sword');
    make('bow');
    make('staff');
    //make('other');

    // First placement attempt
    this.updateMapSelectWeaponFilterSpritesPlacement();
    this.hideMapSelectWeaponFilterSprites();
  };

  Scene_Map.prototype.onMapSelectWeaponFilterSpriteClick = function(symbol) {
    const ew = this._MapSelectEquipWindow;
    if (!ew) return;
    if (ew._type !== 'WEAPONS') return;

    if (ew.toggleWeaponFilter) {
      ew.toggleWeaponFilter(symbol);
    }

    // Refresh opacity states immediately
    this.syncMapSelectWeaponFilterSprites(true);

    // Keep equip window as main active window
    if (ew.activate) ew.activate();
  };

  Scene_Map.prototype.updateMapSelectWeaponFilterSpritesPlacement = function() {
    const ew = this._MapSelectEquipWindow;
    const list = this._MapSelectWeaponFilterSprites;
    if (!ew || !list || list.length === 0) return;

    // Calculate button sizes (only ready ones)
    const widths = list.map(s => (s.bitmap && s.bitmap.isReady()) ? s.bitmap.width : 0);
    const heights = list.map(s => (s.bitmap && s.bitmap.isReady()) ? s.bitmap.height : 0);
    const maxH = Math.max.apply(null, heights.concat([0]));

    // If none ready yet, delay placement
    if (maxH <= 0) return;

    const totalW = widths.reduce((a,b) => a + b, 0) + BAR_GAP_X * (list.length - 1);
    const startX = ew.x + Math.max(0, Math.floor((ew.width - totalW) / 2)) + BAR_OFFSET_X;;
    const y = ew.y - maxH - BAR_GAP_Y + BAR_OFFSET_Y;

    let x = startX;
    for (let i = 0; i < list.length; i++) {
      const spr = list[i];
      const w = widths[i] || 0;
      const h = heights[i] || maxH;
      spr.x = x;
      spr.y = y + Math.floor((maxH - h) / 2);
      x += w + BAR_GAP_X;
    }
  };

  Scene_Map.prototype.showMapSelectWeaponFilterSprites = function() {
    const list = this._MapSelectWeaponFilterSprites;
    if (!list) return;
    list.forEach(s => s.visible = true);
  };

  Scene_Map.prototype.hideMapSelectWeaponFilterSprites = function() {
    const list = this._MapSelectWeaponFilterSprites;
    if (!list) return;
    list.forEach(s => s.visible = false);
  };

  // force = true means refresh placement/opacity now
  Scene_Map.prototype.syncMapSelectWeaponFilterSprites = function(force) {
    const ew = this._MapSelectEquipWindow;
    const list = this._MapSelectWeaponFilterSprites;
    if (!ew || !list) return;

    // Only show when weapon list is intended AND window is not fully closed.
    // We avoid relying on isOpen() due to your close() animation timing.
    const shouldShow = (ew._type === 'WEAPONS') && (ew.openness > 0);

    if (shouldShow) {
      this.updateMapSelectWeaponFilterSpritesPlacement();
      this.showMapSelectWeaponFilterSprites();
      if (force) list.forEach(s => s.updateOpacity && s.updateOpacity());
    } else {
      this.hideMapSelectWeaponFilterSprites();
    }
  };

  // Update placement frequently in case window moves/size changes.
  const _Scene_Map_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function() {
    _Scene_Map_update.call(this);
    if (this._MapSelectWeaponFilterSprites && this._MapSelectEquipWindow) {
      // Light-weight sync every frame
      this.syncMapSelectWeaponFilterSprites(false);
    }
  };

  // Also hide explicitly in the main close flows inside your base plugin.
  const _onMapSelectEquipCancel = Scene_Map.prototype.onMapSelectEquipCancel;
  Scene_Map.prototype.onMapSelectEquipCancel = function() {
    _onMapSelectEquipCancel.call(this);
    this.hideMapSelectWeaponFilterSprites();
  };

  const _onActionDiscard = Scene_Map.prototype.onActionDiscard;
  Scene_Map.prototype.onActionDiscard = function() {
    _onActionDiscard.call(this);
    this.hideMapSelectWeaponFilterSprites();
  };

  const _onActionEquip = Scene_Map.prototype.onActionEquip;
  Scene_Map.prototype.onActionEquip = function() {
    _onActionEquip.call(this);
    this.hideMapSelectWeaponFilterSprites();
  };

})();