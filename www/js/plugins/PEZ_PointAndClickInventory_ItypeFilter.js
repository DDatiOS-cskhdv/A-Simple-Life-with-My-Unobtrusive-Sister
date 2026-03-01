//=============================================================================
// PEZ_PointAndClickInventory - Event Item Type Filter (Graphic Buttons)
//=============================================================================
/*:
 * @plugindesc v1.00 Add 3 graphic item-type filter buttons to the
 * "Select Item" command window customized by PEZ_PointAndClickInventory.
 * Place BELOW PEZ_PointAndClickInventory.js
 * @author ChatGPT
 *
 * @help
 * This is an add-on patch for your customized PEZ_PointAndClickInventory.js.
 *
 * What it does:
 *  - Disables the old custom "switch" button logic you added previously
 *    (createswitchButton / onswitchButtonPressed), since the new filter buttons
 *    replace that function.
 *  - Adds 3 graphic buttons that map to the Event "Select Item" categories:
 *      1) 普通物品 (Regular)  -> itypeId 1
 *      2) 重要物品 (Key)      -> itypeId 2
 *      3) 隐藏物品 (Hidden)   -> itypeId 3 or 4
 *  - When the window opens, the button matching the event command's
 *    item type will be highlighted automatically.
 *  - Clicking a button switches the list to that category.
 *
 * IMPORTANT:
 *  - This window still does NOT support showing all items at once.
 *    The buttons only switch between the three types.
 *
 * Graphic assets:
 *  Put these 3 images (no extension) into img/system/:
 *    IFilter_Normal
 *    IFilter_Key
 *    IFilter_Hidden
 *
 * You can rename them by editing IMAGE_NAMES below.
 *
 * Position tweak:
 *  Adjust BAR_OFFSET_X / BAR_OFFSET_Y / BAR_GAP_X below.
 */
//=============================================================================

var Imported = Imported || {};
Imported.PEZ_PointAndClickInventory_ItypeFilter = true;

(function() {
  if (!Imported.PEZ_PointAndClickInventory) {
    console.warn('PEZ_PointAndClickInventory_ItypeFilter: Missing base plugin.');
    return;
  }

  // --------------------------------------------------------------------------
  // Config
  // --------------------------------------------------------------------------
  const IMAGE_NAMES = {
    normal: 'IFilter_Normal',
    key:    'IFilter_Key',
    hidden: 'IFilter_Hidden'
  };

  const INACTIVE_OPACITY = 100;
  const ACTIVE_OPACITY   = 255;

  // Position of the button bar relative to the Window_EventItem origin.
  // The bar is laid out horizontally: normal, key, hidden.
  const BAR_OFFSET_X = 185;
  const BAR_OFFSET_Y = -80;
  const BAR_GAP_X    = 50;

  // If you want to hide these buttons during specific modes,
  // you can add your own condition here.
  function shouldShowItypeButtons() {
    return true;
  }

  function symbolFromItypeId(itypeId) {
	if (itypeId === 1) return 'normal';  
    if (itypeId === 2) return 'key';
    if (itypeId === 3) return 'hidden';
    return '';
  }

  function itypeIdsFromSymbol(symbol) {
	if (symbol === 'normal')   return [1];  
    if (symbol === 'key')      return [2];
    if (symbol === 'hidden')   return [3];
    return [0];
  }

  // --------------------------------------------------------------------------
  // Create new filter buttons
  // --------------------------------------------------------------------------
  const _WEI_initialize = Window_EventItem.prototype.initialize;
  Window_EventItem.prototype.initialize = function(messageWindow) {
    _WEI_initialize.call(this, messageWindow);
    this._pezItypeSymbol = null;
    this.createItypeFilterButtons();
    this.updateItypeFilterButtonVisuals();
    this.hideItypeFilterButtons();
  };

  Window_EventItem.prototype.createItypeFilterButtons = function() {
    this._pezItypeButtons = this._pezItypeButtons || {};

    const makeBtn = (symbol, index, handler) => {
      const btn = new Sprite_WindowButton();
      btn.bitmap = ImageManager.loadSystem(IMAGE_NAMES[symbol] || '');
      btn.x = BAR_OFFSET_X + BAR_GAP_X * index;
      btn.y = BAR_OFFSET_Y;
      btn.setClickHandler(handler.bind(this));
      btn.visible = false;
      this.addChild(btn);
      this._pezItypeButtons[symbol] = btn;
    };

    makeBtn('normal', 0, this.onItypeNormalPressed);
    makeBtn('key',    1, this.onItypeKeyPressed);
    makeBtn('hidden', 2, this.onItypeHiddenPressed);
  };

  Window_EventItem.prototype.showItypeFilterButtons = function() {
    if (!this._pezItypeButtons) return;
    if (!shouldShowItypeButtons()) return;
    Object.keys(this._pezItypeButtons).forEach(symbol => {
      const btn = this._pezItypeButtons[symbol];
      if (btn) btn.visible = true;
    });
  };

  Window_EventItem.prototype.hideItypeFilterButtons = function() {
    if (!this._pezItypeButtons) return;
    Object.keys(this._pezItypeButtons).forEach(symbol => {
      const btn = this._pezItypeButtons[symbol];
      if (btn) btn.visible = false;
    });
  };

  Window_EventItem.prototype.updateItypeFilterButtonVisuals = function() {
    const symbol = this._pezItypeSymbol;
    if (!this._pezItypeButtons) return;
    Object.keys(this._pezItypeButtons).forEach(s => {
      const btn = this._pezItypeButtons[s];
      if (!btn) return;
      btn.opacity = (symbol === s) ? ACTIVE_OPACITY : INACTIVE_OPACITY;
    });
  };

  Window_EventItem.prototype.applyItypeFilterSymbol = function(symbol) {

	if ( $gameSwitches.value(30) || $gameSwitches.value(55) ) {
        AudioManager.playSe({ name: "013myuu_YumeSE_SystemBuzzer02", volume: 80, pitch: 100, pan: 0 });  
		return;
	}		
	  
	if ($gameNumberArray && $gameNumberArray.value(25).length > 0) {
        AudioManager.playSe({ name: "013myuu_YumeSE_SystemBuzzer02", volume: 80, pitch: 100, pan: 0 });  
		return;
	}		

	if ($gameMessage._itemChoiceCustomType) {
        AudioManager.playSe({ name: "013myuu_YumeSE_SystemBuzzer02", volume: 80, pitch: 100, pan: 0 });  
		return;
	}
	  
	AudioManager.playSe({ name: "Equip2", volume: 80, pitch: 90+Math.randomInt(30), pan: 0 });  
    this._pezItypeSymbol = symbol || 'normal';
    this.updateItypeFilterButtonVisuals();
    // 强制重建 + 刷新
    if (this.makeItemList) this.makeItemList();
    this.refresh();
    this.select(0);
  };

  Window_EventItem.prototype.onItypeNormalPressed = function() {
    this.applyItypeFilterSymbol('normal');
  };

  Window_EventItem.prototype.onItypeKeyPressed = function() {
    this.applyItypeFilterSymbol('key');
  };

  Window_EventItem.prototype.onItypeHiddenPressed = function() {
    this.applyItypeFilterSymbol('hidden');
  };

  // --------------------------------------------------------------------------
  // Use our symbol to filter includes
  // --------------------------------------------------------------------------
  
	Window_EventItem.prototype.pezItemPassesFilter = function(item) {
		
	  if (!item || !DataManager.isItem(item) || !item.id) return false;		
	  // 存在自定义物品清单设置时
	  let goods = ($gameNumberArray && typeof $gameNumberArray.value === 'function')
		? $gameNumberArray.value(25) : [];
	  if (Array.isArray(goods) && goods.length > 0) {
		if (!goods.includes(item.id)) return false;
		return true;
	  }

	  // 存在自定义条件筛选时
	  const customType = ($gameMessage && $gameMessage.itemChoiceCustomType)
		? $gameMessage.itemChoiceCustomType() : 0;

	  const customOk = !customType || customType == 0
		? true
		: (DataManager.isItemCustomType
			? DataManager.isItemCustomType(item, customType)
			: (item.meta && item.meta.type == customType));

	  if (!customOk) return false;

	  if (this._pezItypeSymbol) {
		const allowed = itypeIdsFromSymbol(this._pezItypeSymbol);
		return allowed.includes(item.itypeId);
	  } else {
		const itypeId = ($gameMessage && $gameMessage.itemChoiceItypeId)
		  ? $gameMessage.itemChoiceItypeId() : 1;
		return item.itypeId === itypeId;
	  }
	};


	const _WEI_makeItemList = Window_EventItem.prototype.makeItemList;
	Window_EventItem.prototype.makeItemList = function() {		
	  let lst = ($gameNumberArray && typeof $gameNumberArray.value === 'function')
		? $gameNumberArray.value(25) : null;

	  if (Array.isArray(lst) && lst.length > 0) {
		this._data = lst.map(function (id) {
		  // 更稳的整数化与越界处理
		  id = (Number(id) >>> 0);
		  return ($dataItems && $dataItems[id]) ? $dataItems[id] : null;
		}).filter(function (item) {
		   return this.pezItemPassesFilter(item);
		}, this);

		if (this.includes(null)) this._data.push(null);
		return;
	  }		
		
	  if (this._pezItypeSymbol) {
		const allowed = itypeIdsFromSymbol(this._pezItypeSymbol);
		this._data = $gameParty.allItems().filter(item => {
		  return this.pezItemPassesFilter(item);
		});
		this._data.push(null);
		return;
	  }
	  _WEI_makeItemList.call(this);
	};

  // --------------------------------------------------------------------------
  // Sync default active button from event command on open
  // --------------------------------------------------------------------------
  const _WEI_start = Window_EventItem.prototype.start;
  Window_EventItem.prototype.start = function() {
    const msgItype = ($gameMessage && $gameMessage.itemChoiceItypeId)
      ? $gameMessage.itemChoiceItypeId()
      : 1;

    this._pezItypeSymbol = symbolFromItypeId(msgItype);

    _WEI_start.call(this);

    this.updateItypeFilterButtonVisuals();
    this.showItypeFilterButtons();
  };

  const _WEI_close = Window_EventItem.prototype.close;
  Window_EventItem.prototype.close = function() {
    this.hideItypeFilterButtons();
    _WEI_close.call(this);
  };

})();