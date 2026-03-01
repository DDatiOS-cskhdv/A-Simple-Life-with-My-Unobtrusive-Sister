/*******************************************************************************
 * Loot Tables v1.0.1 by dingk
 * For use in RMMV 1.6.2
 ******************************************************************************/
var Imported = Imported || {};
Imported.dingk_LootTables = true;

var dingk = dingk || {};
dingk.Loot = dingk.Loot || {};
dingk.Loot.version = '1.0.1';
dingk.Loot.filename = document.currentScript.src.match(/([^\/]+)\.js/)[1];

/*:
 * @plugindesc [v1.0.1] Create randomized tier-based loot drops within the editor.
 * @author dingk
 *
 * @param Global Loot Tables
 * @desc Pre-define some loot tables if desired, so you don't have to remake them in the Enemies editor.
 * @type struct<DropTable>[]
 * @default ["{\"Name\":\"Sample\",\"Drop Pools\":\"[\\\"{\\\\\\\"Pool Name\\\\\\\":\\\\\\\"Common\\\\\\\",\\\\\\\"Weight\\\\\\\":\\\\\\\"55\\\\\\\",\\\\\\\"Min Amount\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Max Amount\\\\\\\":\\\\\\\"1\\\\\\\"}\\\",\\\"{\\\\\\\"Pool Name\\\\\\\":\\\\\\\"Rare\\\\\\\",\\\\\\\"Weight\\\\\\\":\\\\\\\"30\\\\\\\",\\\\\\\"Min Amount\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Max Amount\\\\\\\":\\\\\\\"1\\\\\\\"}\\\",\\\"{\\\\\\\"Pool Name\\\\\\\":\\\\\\\"Epic\\\\\\\",\\\\\\\"Weight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"Min Amount\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Max Amount\\\\\\\":\\\\\\\"1\\\\\\\"}\\\",\\\"{\\\\\\\"Pool Name\\\\\\\":\\\\\\\"Legendary\\\\\\\",\\\\\\\"Weight\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"Min Amount\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Max Amount\\\\\\\":\\\\\\\"1\\\\\\\"}\\\"]\"}"]
 *
 * @param Plugin Command Settings
 *
 * @param Display Message
 * @parent Plugin Command Settings
 * @desc Allow the game to display the message of the item drop via plugin commands.
 * @on Yes
 * @off No
 * @default true
 *
 * @param Single Item Format
 * @parent Display Message
 * @desc The text to display when using the plugin command. Leave blank for none. %1 - Icon, %2 - Name
 * @default %1%2 found!
 *
 * @param Multiple Items Format
 * @parent Display Message
 * @desc The text to display when using the plugin command. Leave blank for none. %1 - Icon, %2 - Name, %3 - Count
 * @default %1%2 ×%3 found!
 *
 * @help
 * -----------------------------------------------------------------------------
 *   Introduction
 * -----------------------------------------------------------------------------
 *
 * Do you need your enemies to drop more loot or change how the game drops
 * items?
 *
 * This plugin adds a randomized tier-based loot drop mechanic to your game. 
 * You can customize loot tables in the plugin manager and set up various item 
 * pools. You can assign these loot tables to enemies or use plugin commands on
 * the map.
 *
 * Loot tables consist of different item pools, which are assigned different
 * weights. A pool with a higher weight has a higher chance of being selected.
 * A selected item pool will drop a random item that has been assigned to it.
 *
 * -----------------------------------------------------------------------------
 *   Notetags
 * -----------------------------------------------------------------------------
 *
 * In the notetags below, the keywords Item / Drop / Loot are interchangeable.
 * For example, you can use <Item Table>, <Drop Table>, or <Loot Table>.
 *
 * Item, Weapon, and Armor Notetags:
 *
 * <Loot Pool: name>
 *  - Put this item in the specified item pool.
 *  - Replace 'name' with the name of the item pool.
 *
 * Actor, Class, Weapon, Armor, and State Notetags:
 *
 * <name Weight: +n>
 * <name Weight: -n>
 * <name Weight: *n>
 *  - Adjust the weight at which an item pool is selected.
 *  - Replace 'name' with the name of the item pool.
 *  - Replace 'n' with a number (can be floating point). 
 *
 * Enemy Notetags:
 *
 * <Loot Table: name[, name, name, ...]>
 *  - Assign one or more loot tables in a comma-separated list to this enemy.
 *  - Replace 'name' with the name of the loot table.
 *
 * <Loot Table [rate]>
 * name
 * name: weight
 * name x[amount]: weight
 * name x[minAmount]-[maxAmount]: weight
 * ...
 * </Loot Table>
 *  - Create a local loot table for this enemy. Replace the following variables:
 *    - [Optional] rate : The probability that this table will drop items.
 *      Default is 100%. Replace with a decimal or percent value.
 *    - name : Name of the item or item pool. For items, you can use the names
 *      of the items or use 'Item [id]', 'Weapon [id]', or 'Armor [id]',
 *      replacing [id] with the item ID.
 *    - [amount] : Number of items to drop. Default is 1.
 *    - minAmount-maxAmount : Random range of items to drop (inclusive).
 *    - weight : Weight of the item or item pool. Default is 1.
 *  - Insert multiple of this notetag to allow multiple drops.
 * EXAMPLE:
 * <Loot Table 75%>
 * Item 3
 * Potion x2: 5
 * Common: 5
 * Common x3-5: 4
 * Rare: 1
 * </Loot Table>
 *  - There is a 75% chance that this enemy will drop an item with an ID of 3, 
 *    2 Potions, a random Common item, 3 to 5 of the same random Common item, or
 *    a random Rare item.
 *  - The total weight adds up to 16, so the Rare item has a 1/16 chance to drop,
 *    whereas the two Potions have a 5/16 chance.
 *
 * -----------------------------------------------------------------------------
 *   Plugin Commands
 * -----------------------------------------------------------------------------
 *
 * In the plugin commands below, the keywords Item / Drop / Loot are
 * interchangeable. Customize the message displayed in the plugin manager.
 *
 * GiveLootPool name [minAmount] [maxAmount]
 *  - Give the player an item from this item pool. Replace 'name' with the name
 *    of the item pool.
 *  - [Optional] Replace 'minAmount' and 'maxAmount' with the amount to give
 *    the player. Default is 1.
 *
 * GiveLootTable name
 *  - Give the player an item from this item table. Replace 'name' with the name
 *    of the item table.
 *
 * EnableLootMessage
 * DisableLootMessage
 *  - Toggle the message displayed after using the commands above on or off.
 *
 * SingleLootMessageFormat string
 * MultipleLootMessageFormat string
 *  - Change the message format. Replace 'string' with the new format.
 *    %1 - Icon, %2 - Name, %3 - Count
 *
 * ResetLootMessage
 *  - Return all loot message settings to default.
 *
 * -----------------------------------------------------------------------------
 *   Compatibility
 * -----------------------------------------------------------------------------
 * No issues found
 *
 * -----------------------------------------------------------------------------
 *   Terms of Use
 * -----------------------------------------------------------------------------
 * Free and commercial use and redistribution (under MIT License).
 *
 * -----------------------------------------------------------------------------
 *   Changelog
 * -----------------------------------------------------------------------------
 * v1.0.1 - Compatibility patch for Moghunter's Treasure Popup
 * v1.0.0 - Initial release
 */
/*~struct~DropTable:
 * @param Name
 * @desc Name of the loot table. Use <Loot Pool: name> in enemy notetags.
 *
 * @param Drop Pools
 * @desc Define one or more pools.
 * @type struct<DropPool>[]
 */
/*~struct~DropPool:
 * @param Pool Name
 * @desc Name of this loot pool. Use an item name to drop that item only.
 *
 * @param Weight
 * @desc The weight of this loot pool.
 * @type number
 * @min 1
 * @default 1
 *
 * @param Min Amount
 * @desc The minimum number of items this loot pool will drop.
 * @type number
 * @min 0
 * @default 1
 *
 * @param Max Amount
 * @desc The maximum number of items this loot pool will drop.
 * @min 0
 * @default 1
 */

//--------------------------------------------------------------------------------------------------
// Classes
//--------------------------------------------------------------------------------------------------

/** Class for item drop object */
class ItemDrop {
	/**
	 * Create item drop
	 * @param {Number} kind - Item, weapon, or armor
	 * @param {Number} dataId - ID of item
	 * @param {Number} weight 在标签池内的权重（默认100）
	 */
	constructor(kind, dataId, weight) {
		this.kind   = kind;
		this.dataId = dataId;
		this.weight = weight;
	}
	
	/**
	 * Return database object
	 * @return {Object} Database object
	 */
	getDataItem() {
		switch(this.kind) {
			case 1:
				return $dataItems[this.dataId];
			case 2: {
				let item = $dataWeapons[this.dataId];
				if (Imported.YEP_ItemCore && Imported.dingk_EquipLevels) {
					return DataManager.registerNewItem(item);
				}
				return item;
			}
			case 3: {
				let item = $dataArmors[this.dataId];
				if (Imported.YEP_ItemCore && Imported.dingk_EquipLevels) {
					return DataManager.registerNewItem(item);
				}
				return item;
			}
		}

	}
};

/** Class for the item drop pool */
class DropPool {
	/**
	 * Create drop pool
	 * @param {String} name - Name of pool
	 * @param {Number} minAmount - Minimum number of items dropped
	 * @param {Number} maxAmound - Maximum number of items dropped
	 * @param {Number} level - Level of item
	 * @param {Number} tier - Tier of item
	 */
	constructor(name, weight = 1, minAmount = 0, maxAmount = 0, level = 0, tier = 0) {
		this.name = name;
		this._weight = Math.max(0, Number(weight) || 0);
		this.minAmount = Number(minAmount) || 0;
		this.maxAmount = Number(maxAmount) || 0;
		if (this.minAmount > this.maxAmount) {
			[this.minAmount, this.maxAmount] = [this.maxAmount, this.minAmount];
		}
		this.level = level;
		this.tier = tier;
	}
	/**
	 * Set weight of pool.
	 * @param {Number} weight - Desired weight
	 */
	set weight(weight) {
		if (!weight || weight < 0) weight = 0;
		this._weight = Number(weight) || 0;
	}
	/**
	 * Get weight of pool.
	 * @return {Number} Weight of the pool.
	 */
	get weight() {
		if (this._weight < 0) this._weight = 0;
		return this._weight;
	}
	/**
	 * Return random number of items to drop
	 * @return {Number} Number between minAmount and maxAmount (inclusive)
	 */
	getAmount() {
		return dingk.Loot.randomInt(this.minAmount, this.maxAmount);
	}
};

/** Class for loot table */
class DropTable {
	/**
	 * Create loot table
	 * @param {String} name - Name of table
	 * @param {Array} pools - Array of drop pools
	 * @param {Number} minLevel - Minimum level of items in this table
	 * @param {Number} maxLevel - Maximum level of items in this table
	 * @param {Number} rate - Drop rate of items (0.0 - 1.0)
	 */
	constructor(name = '', pools = [], minLevel = 0, maxLevel = 0, rate = 1.0) {
		this.pools = pools;
		this.name = name;
		this.minLevel = minLevel;
		this.maxLevel = maxLevel;
		this.rate = rate;
	}
	/**
	 * Insert pools in this loot table
	 * @param {Object} pool - DropPool object
	 */
	insert(pool) {
		this.pools = this.pools.concat(pool);
	}
	clear() {
		this.pools = [];
	}
};

//--------------------------------------------------------------------------------------------------
// Globals
//--------------------------------------------------------------------------------------------------
dingk.Loot.Pools = {};
dingk.Loot.Tables = {};

dingk.Loot.params = PluginManager.parameters(dingk.Loot.filename);
dingk.Loot.tablesJson = dingk.Loot.params['Global Loot Tables'];
dingk.Loot.displayMsg = dingk.Loot.params['Display Message'];
dingk.Loot.displaySingle = dingk.Loot.params['Single Item Format'];
dingk.Loot.displayMultiple = dingk.Loot.params['Multiple Items Format'];
dingk.Loot.allowStack = true;

//--------------------------------------------------------------------------------------------------
// DataManager
//--------------------------------------------------------------------------------------------------

/**
 * Check if database is loaded, then process notetags
 * @return {bool} Whether database has loaded
 */
dingk.Loot.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	if (!dingk.Loot.DataManager_isDatabaseLoaded.call(this)) return false;
	if (!dingk.Loot._loaded) {
		this.process_dingk_Loot_lootTables();
		dingk.Loot.getItemNames();
		dingk.Loot.getWeaponNames();
		dingk.Loot.getArmorNames();
		this.process_dingk_Loot_items($dataItems);
		this.process_dingk_Loot_items($dataWeapons);
		this.process_dingk_Loot_items($dataArmors);
		this.process_dingk_Loot_enemies();
		this.process_dingk_Loot_weights($dataActors);
		this.process_dingk_Loot_weights($dataClasses);
		this.process_dingk_Loot_weights($dataWeapons);
		this.process_dingk_Loot_weights($dataArmors);
		this.process_dingk_Loot_weights($dataStates);
		dingk.Loot._loaded = true;
	}
	return true;
};

/** Parse json */
DataManager.process_dingk_Loot_lootTables = function() {
	let jsonTables = JSON.parse(dingk.Loot.tablesJson);
	for (let jsonTable of jsonTables) {
		let table = JSON.parse(jsonTable);
		let name = table['Name'];
		let pools = JSON.parse(table['Drop Pools']);
		let dropTable = new DropTable(name);
		for (let pool of pools) {
			let obj = JSON.parse(pool);
			dropTable.insert(new DropPool(obj['Pool Name'], obj['Weight'],
				obj['Min Amount'], obj['Max Amount'], 0, obj['Tier']));
		}
		dingk.Loot.Tables[name] = dropTable;
	}
};

/** 
 * Parse notetags
 * @param {Array} group - List of database objects
 */
DataManager.process_dingk_Loot_items = function(group) {
  const alias = '(?:drop|loot|item)';
  // 允许可选的权重数字：<Loot Pool: 名称> 或 <Loot Pool: 名称 600>
  const regex = new RegExp('<' + alias + '\\s+pool:\\s*(.+?)(?:\\s+(\\d+))?\\s*>', 'i');

  for (let n = 1; n < group.length; n++) {
    const obj = group[n];
    const notedata = obj.note.split(/[\r\n]+/);
    for (const note of notedata) {
      const m = note.match(regex);
      if (m) {
        const poolName = m[1].trim();             
        const kind = dingk.Loot.getItemType(obj);
		let w = (m[2] !== undefined && m[2] !== null && m[2] !== '')
		  ? Number(m[2])
		  : (kind === 3 ? 60 : 100);
        if (!dingk.Loot.Pools[poolName]) dingk.Loot.Pools[poolName] = [];
        dingk.Loot.Pools[poolName].push(new ItemDrop(kind, n, w));
      }
    }
  }
};

/** Parse enemy notetags */
DataManager.process_dingk_Loot_enemies = function() {
	const group = $dataEnemies;
	const alias = '(?:drop|loot|item) table';
	const longLine = '\\s*(\\d*\\.?\\d+?)?(%)?(?: level)?\\s*(\\d+)?-?(\\d+)?';
	const regex = [
		new RegExp('<' + alias + longLine + '>', 'i'),
		new RegExp('<' + alias + longLine + ': (.*)>', 'i'),
		new RegExp('</' + alias + '(.*)?>', 'i')
	];

	for (let n = 1; n < group.length; n++) {
		let obj = group[n];
		const notedata = obj.note.split(/[\r\n]+/);

		let mode = '';
		let table = [];
		obj.dropTables = [];

		for (const note of notedata) {
			let result;
			// <drop table> <drop table rate> <drop table rate level x-y>
			if ([, ...result] = note.match(regex[0]) || '') {
				mode = 'drop table';
				table = new DropTable();
				// drop rate
				if (result[0]) {
					let rate = Number(result[0]);
					// %
					if (result[1]) rate /= 100;
					table.rate = rate;
				}
				// level
				if (result[2]) {
					let minLevel = Number(result[2]);
					let maxLevel = result[3] ? Number(result[3]) : minLevel;
					if (minLevel > maxLevel) {
						[minLevel, maxLevel] = [maxLevel, minLevel];
					}
					table.minLevel = minLevel;
					table.maxLevel = maxLevel;
				}
			}
			// <drop table: name> <drop table rate: name> <drop table rate level x-y: name>
			else if ([, ...result] = note.match(regex[1]) || '') {
				let rate, minLevel, maxLevel;
				// rate
				if (result[0]) {
					rate = Number(result[0]);
					// %
					if (result[1]) rate /= 100;
				}
				// level
				if (result[2]) {
					minLevel = Number(result[2]);
					maxLevel = result[3] ? Number(result[3]) : minLevel;
					if (minLevel > maxLevel) {
						[minLevel, maxLevel] = [maxLevel, minLevel];
					}
				}
				let names = result[4].split(',').map(a => a.trim());
				for (let name of names) {
					let dropTable = dingk.Loot.Tables[name];
					if (dropTable) {
						if (rate) dropTable.rate = rate;
						if (minLevel) dropTable.minLevel = minLevel;
						if (maxLevel) dropTable.maxLevel = maxLevel;
						obj.dropTables.push(dropTable);
					}
				}
			}
			// </drop table>
			else if (note.match(regex[2])) {
				mode = '';
				obj.dropTables.push(table);
				table = [];
			} else if (mode === 'drop table') {
				// name xmin // name xmin-max // name xmin-max: weight
				if ([, ...result] = note.match(/(.*) x(\d+)-?(\d+)?:?\s*(\d+)?/i) || '') {
					let name = result[0];
					let min = Number(result[1]);
					let max = result[2] ? Number(result[2]) : min;
					let weight = result[3] ? Number(result[3]) : 1;
					table.insert(new DropPool(name, weight, min, max));
				}
				// name: weight
				else if ([, ...result] = note.match(/(.*):\s*(\d+)/) || '') {
					let name = result[0];
					let weight = Number(result[1]);
					table.insert(new DropPool(name, weight, 1, 1));
				}
				// name
				else if ([, result] = note.match(/(.*)/) || '') {
					table.insert(new DropPool(result, 1, 1, 1));
				}
			}
		}
	}
};

/** 
 * Parse notetags
 * @param {Array} group - List of database objects
 */
DataManager.process_dingk_Loot_weights = function(group) {
	const regex = /<(.*) weight:\s*([*+-])?(\d*.?\d+?)>/i;
	for (let n = 1; n < group.length; n++) {
		let obj = group[n];
		const notedata = obj.note.split(/[\r\n]+/);
		
		obj.lootBuffs = {};
		
		for (const note of notedata) {
			let result;
			// <poolName weight: +n> <poolName weight: -n> <poolName weight: *n>
			if ([, ...result] = note.match(regex) || '') {
				if (result[1] === undefined) result[1] = '+';
				let rateAdj = {operation: result[1], rate: Number(result[2])};
				obj.lootBuffs[result[0]] = rateAdj;
			}
		}
	}
}

//--------------------------------------------------------------------------------------------------
// Game_Actor
//--------------------------------------------------------------------------------------------------

/**
 * Return list of weight adjustments of the actor, class, states, and equipment
 * @param {String} name - Name of drop pool
 * @return {Array} List of weight adjustments
 */
Game_Actor.prototype.getWeightAdjustments = function(name) {
	let buff = [this.actor().lootBuffs[name]];
	buff.push(this.currentClass().lootBuffs[name]);
	
	let states = this.states();
	for (let state of states) {
		if (!state) continue;
		buff.push(state.lootBuffs[name]);
	}
	/*
	let equips = this.equips();
	for (let equip of equips) {
		if (!equip) continue;
		buff.push(equip.lootBuffs[name]);
	}
	*/
    const eqs = this.equips ? this.equips() : [];	
    for (const eq of eqs) {
      if (!eq) continue;
      let src = eq.lootBuffs;
      if (!src && typeof eq.baseItemId === 'number') {
        if (DataManager.isWeapon(eq))  src = $dataWeapons[eq.baseItemId] && $dataWeapons[eq.baseItemId].lootBuffs;
        if (DataManager.isArmor(eq))   src = $dataArmors[eq.baseItemId]  && $dataArmors[eq.baseItemId].lootBuffs;
      }
      buff.push(src ? src[name] : undefined);
    }
	
	return buff;
};

//--------------------------------------------------------------------------------------------------
// Game_Enemy
//--------------------------------------------------------------------------------------------------

/**
 * Get drops from loot table
 * @return {Array} List of drops
 */
dingk.Loot.Game_Enemy_makeDropItems = Game_Enemy.prototype.makeDropItems;
Game_Enemy.prototype.makeDropItems = function() {
	// MOG_TrPopUpBattle compatibility patch
	if (Imported.MOG_TrPopUpBattle && this._treasure.checked) {
		return this._treasure.item;
	}
	let drops = dingk.Loot.Game_Enemy_makeDropItems.call(this);
	if (this.enemy().dropTables) {
		let pools = this.getDropCategory();
		if (pools && pools.length) {
			drops = drops.concat(this.getItemsFromPool(pools));
		}
	}
	return drops;
};

/**
 * Get pools from table
 * @return {Array} List of pools
 */
Game_Enemy.prototype.getDropCategory = function() {
	let poolsToDrop = [];
	for (let table of this.enemy().dropTables) {
		if (table.rate * this.dropItemRate() < Math.random()) continue;
		let pool = dingk.Loot.getDropCategory(table);
		if (pool) poolsToDrop.push(pool);
	}
	return poolsToDrop;
};

/**
 * Get items from pools
 * @param {Array} pools - List of pools
 * @return {Array} List of items to be dropped
 */
Game_Enemy.prototype.getItemsFromPool = function(pools) {
	if (Imported.dingk_EquipLevels && dingk.EL.enableEnemyLevels) {
		// Yanfly's Enemy Levels
		if (Imported.YEP_EnemyLevels) {
			return dingk.Loot.getItemsFromPool(pools, this.level);
		}
		// Tsukihime's Enemy Levels
		if (Imported.EnemyLevels) {
			return dingk.Loot.getItemsFromPool(pools, this.level());
		}
	}
	return dingk.Loot.getItemsFromPool(pools);
};

//--------------------------------------------------------------------------------------------------
// Game_Interpreter
//--------------------------------------------------------------------------------------------------

/**
 * Add plugin commands to drop items from pools/tables
 * @param {String} command
 * @param {Array} args
 */
dingk.Loot.GI_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	dingk.Loot.GI_pluginCommand.call(this, command, args);
	let cmd = command.toUpperCase();
	let alias = '(?:drop|loot|item)';
	let rx1 = new RegExp('give' + alias + 'pool', 'i');
	let rx2 = new RegExp('give' + alias + 'table', 'i');
	dingk.Loot._event = $gameMap.event(this._eventId);
	if (cmd.match(rx1)) {
		let amountLo = Number(args[1]) || 1;
		let amountHi = Number(args[2]) || amountLo;
		let pool = new DropPool(args[0], 1, amountLo, amountHi)
		let drops = dingk.Loot.getItemsFromPool([pool]);
        drops.forEach(function(drop) {
		   if (DataManager.isItem(drop)) {
        $gameNumberArray.value(12).push(drop.id);
		  }else if (DataManager.isWeapon(drop)) {
	    $gameNumberArray.value(13).push(drop.id);
		  }else if (DataManager.isArmor(drop)) {
	    $gameNumberArray.value(14).push(drop.id);
		  }
     })
		//dingk.Loot.giveDrops(drops);
	} else if (cmd.match(rx2)) {
		let name = args[0];
		let table = dingk.Loot.Tables[name];
		let pool = dingk.Loot.getDropCategory(table);
		let drops = dingk.Loot.getItemsFromPool([pool]);		
        drops.forEach(function(drop) {
		   if (DataManager.isItem(drop)) {
        $gameNumberArray.value(12).push(drop.id);
		  }else if (DataManager.isWeapon(drop)) {
	    $gameNumberArray.value(13).push(drop.id);
		  }else if (DataManager.isArmor(drop)) {
	    $gameNumberArray.value(14).push(drop.id);
		  }
     })				
		//dingk.Loot.giveDrops(drops);
	} else if (cmd.match(/EnableLootMessage/i)) {
		dingk.Loot.displayMsg = true;
	} else if (cmd.match(/DisableLootMessage/i)) {
		dingk.Loot.displayMsg = false;
	} else if (cmd.match(/SingleLootMessageFormat/i)) {
		dingk.Loot.displaySingle = args.join(' ');
	} else if (cmd.match(/MultipleLootMessageFormat/i)) {
		dingk.Loot.displayMultiple = args.join(' ');
	} else if (cmd.match(/ResetLootMessage/i)) {
		dingk.Loot.displayMsg = dingk.Loot.params['Display Message'];
		dingk.Loot.displaySingle = dingk.Loot.params['Single Item Format'];
		dingk.Loot.displayMultiple = dingk.Loot.params['Multiple Items Format'];
	}
	dingk.Loot._event = undefined;
};

//--------------------------------------------------------------------------------------------------
// Game_Party
//--------------------------------------------------------------------------------------------------

/**
 * Adjust the weights of the loot table based on buffs on actors in party
 * @param {Object} table - Loot table
 * @return {Object} New loot table with adjusted weights
 */
Game_Party.prototype.getWeightAdjustments = function(table) {
	let dropTable = Object.assign(new DropTable(), table);
	dropTable.clear();
	for (let pool of table.pools) {
		let newPool = Object.assign(new DropPool(), pool);
		let [add, multiply] = [0, 1];
		for (let member of this.battleMembers()) {
			let buffs = member.getWeightAdjustments(pool.name);
			for (let buff of buffs) {
				if (!buff) continue;
				if (buff.operation.includes('*')) {
					multiply *= buff.rate;
				} else if (buff.operation.includes('-')) {
					add -= buff.rate;
				} else {
					add += buff.rate;
				}
			}
		}
		newPool.weight = newPool.weight * multiply + add;
		dropTable.insert(newPool);
	}
	return dropTable;
};

//--------------------------------------------------------------------------------------------------
//  dingk.Loot and Utils
//--------------------------------------------------------------------------------------------------

/** Make associative arrays of items with their IDs */
dingk.Loot.getItemNames = function() {
	if (dingk.ItemIds) return;
	dingk.ItemIds = {};
	let group = $dataItems;
	for (let n = 1; n < group.length; n++) {
		if (group[n].name) {
			dingk.ItemIds[group[n].name] = n;
		}
	}
};

/** Make associative arrays of weapons with their IDs */
dingk.Loot.getWeaponNames = function() {
	if (dingk.WeaponIds) return;
	dingk.WeaponIds = {};
	let group = $dataWeapons;
	for (let n = 1; n < group.length; n++) {
		if (group[n].name) {
			dingk.WeaponIds[group[n].name] = n;
		}
	}
};

/** Make associative arrays of armors with their IDs */
dingk.Loot.getArmorNames = function() {
	if (dingk.ArmorIds) return;
	dingk.ArmorIds = {};
	let group = $dataArmors;
	for (let n = 1; n < group.length; n++) {
		if (group[n].name) {
			dingk.ArmorIds[group[n].name] = n;
		}
	}
};

/**
 * Return item type as a number
 * @param {Object} item
 * @return {Number} Item type
 */
dingk.Loot.getItemType = function(item) {
	if (DataManager.isItem(item)) return 1;
	if (DataManager.isWeapon(item)) return 2;
	if (DataManager.isArmor(item)) return 3;
};

/**
 * Get items from pools
 * @param {Array} pools - List of pools
 * @param {Number} level - Level of items
 * @return {Array} List of items to be dropped
 */
dingk.Loot.getItemsFromPool = function(pools, level) {
	let drops = [];
	let item, result;
	for (let pool of pools) {
		let amount = dingk.Loot.randomInt(pool.minAmount, pool.maxAmount);
		if (dingk.ItemIds[pool.name]) {
			item = $dataItems[dingk.ItemIds[pool.name]];
		} else if (dingk.WeaponIds[pool.name]) {
			item = $dataWeapons[dingk.WeaponIds[pool.name]];
		} else if (dingk.ArmorIds[pool.name]) {
			item = $dataArmors[dingk.ArmorIds[pool.name]];
		} else if ([, ...result] = pool.name.match(/(ITEM|WEAPON|ARMOR)\s*(\d+)/i) || '') {
			if (result[0].match(/ITEM/i)) {
				item = $dataItems[result[1]];
			} else if (result[0].match(/WEAPON/i)) {
				item = $dataWeapons[result[1]];
			} else if (result[0].match(/ARMOR/i)) {
				item = $dataArmors[result[1]];
			}
		} else {
			let iPool = dingk.Loot.Pools[pool.name];
			if (!iPool || iPool.length === 0) continue;
			// 计算权重总和（默认100已在构造时处理）
			let total = 0;
			for (const drop of iPool) total += (drop.weight > 0 ? drop.weight : 0);
			if (total <= 0) continue;
			// 加权随机
			let r = Math.random() * total;
			let acc = 0, picked = null;
			for (const drop of iPool) {
			  const w = (drop.weight > 0 ? drop.weight : 0);
			  acc += w;
			  if (r < acc) { picked = drop; break; }
			}
			item = picked ? picked.getDataItem() : null;
		}
		
		// dingk_EquipLevels compatibility patch
		if (Imported.YEP_ItemCore && Imported.dingk_EquipLevels && !DataManager.isItem(item)) {
			let newItem = ItemManager.registerEquipLevel(item, level);
			for (let i = 0; newItem && i < amount; i++) drops.push(newItem);
		} else {
			for (let i = 0; item && i < amount; i++) drops.push(item);
		}
	}
	return drops;
};

/**
 * Return a random pool
 * @param {Object} table - Loot table
 * @return {Object} Drop pool
 */
dingk.Loot.getDropCategory = function(table) {
	if (!table) return;
	let newTable = $gameParty.getWeightAdjustments(table);
	let pools = newTable.pools;
	let totalWeight = pools.reduce((a, dp) => a + dp.weight, 0);
	let randWeight = Math.random() * totalWeight;
	let accWeight = 0;
	for (let pool of pools) {
		accWeight += pool.weight;
		if (randWeight < accWeight) {
			return pool;
		}
	}
};

/**
 * Give the party items from a list and display the message
 * @param {Array} drops - List of items to be given
 */
dingk.Loot.giveDrops = function(drops) {
	let itemCount = {}, weaponCount = {}, armorCount = {};

	for (let item of drops) {
		if (DataManager.isItem(item)) {
			itemCount[item.id] = itemCount[item.id] + 1 || 1;
		} else if (DataManager.isWeapon(item)) {
			weaponCount[item.id] = weaponCount[item.id] + 1 || 1;
		} else if (DataManager.isArmor(item)) {
			armorCount[item.id] = armorCount[item.id] + 1 || 1;
		}
	}
	for (let item of drops) {
		if (!item) continue;
		let icon = '\x1bI[' + item.iconIndex + ']';
		let name = item.textColor ?
			'\x1bC[' + item.textColor + ']' + item.name + '\x1bC[0]':
			item.name;

		if (DataManager.isItem(item)) {
			var amount = itemCount[item.id];
			if (amount > 1) itemCount[item.id] = 0;
		} else if (DataManager.isWeapon(item)) {
			var amount = weaponCount[item.id];
			if (amount > 1) weaponCount[item.id] = 0;
		} else if (DataManager.isArmor(item)) {
			var amount = armorCount[item.id];
			if (amount > 1) armorCount[item.id] = 0;
		} else {
			continue;
		}
		if (dingk.Loot.displayMsg && amount > 0) {
			if (amount === 1) {
				let fmt = dingk.Loot.displaySingle;
				if (fmt) $gameMessage.add(fmt.format(icon, name));
			} else {
				let fmt = dingk.Loot.displayMultiple;
				if (fmt) $gameMessage.add(fmt.format(icon, name, amount));
			}
		}
		$gameParty.gainItem(item, 1);
		
		// Moghunter Treasure Popup compatibility patch
		if (Imported.MOG_TreasurePopup && $gameSystem._trspupVisible) {
			if (amount > 0 && SceneManager._scene instanceof Scene_Map) {
				let [x, y] = [this._event.screenX(), this._event.screenY()];
				$gameSystem._trspupData.push([item, amount, x, y]);
			}
		}
	}
};

/**
 * Return random integer between two numbers (inclusive)
 * @param {Number} min
 * @param {Number} max
 * @return {Number} Random integer between min and max (inclusive)
 */
dingk.Loot.randomInt = function(min, max) {
	if (max < min) [min, max] = [max, min];
	return Math.floor(Math.random() * (max + 1 - min)) + min;
};

//直接计算随机物品ID
dingk.Loot.calculateRandomItemIndex = function(enemyId) {

	const tables = dingk.Loot.enemyDropTables(enemyId);
    let drops = [];

    // 确保每个敌人只处理一次掉落表
    if (tables) {
		let rate = 1;
        for (let table of tables) {
            // 根据掉落概率和权重调整来确定是否进行掉落
            if (table.rate * rate >= Math.random()) {
                let adjustedTable = dingk.Loot.adjustTableWeights(table);
                let pool = dingk.Loot.getDropCategory(adjustedTable);
                if (pool) {
                    // 合并调整后的掉落池中获取的物品
                    drops = drops.concat(dingk.Loot.getItemsFromPool([pool]));
                }
            }
        }
    }

    if (drops.length > 0) {
         return drops[0].id;
    } else {
		 return 0;
	}
};

//直接获取掉落物
dingk.Loot.directlyAcquireDrops = function(enemyId, display = false) {
    const interpreter = new Game_Interpreter();
    const enemy = $dataEnemies[enemyId];
    let drops = [];
	let needSettlement = false;

    // 确保每个敌人只处理一次掉落表
    if (enemy.dropTables) {
		let rate = 1;
        for (let table of enemy.dropTables) {
            // 根据掉落概率和权重调整来确定是否进行掉落
            if (table.rate * rate >= Math.random()) {
                let adjustedTable = dingk.Loot.adjustTableWeights(table);
                let pool = dingk.Loot.getDropCategory(adjustedTable);
                if (pool) {
                    // 合并调整后的掉落池中获取的物品
                    drops = drops.concat(dingk.Loot.getItemsFromPool([pool]));
                }
            }
        }
    }

    const languageTexts = {
        0: "找到了",  // 中文
        1: "見つけた", // 日语
        2: "Found",   // 英语
    };

    const language = $gameVariables.value(1) || 0;
    const foundText = languageTexts[language] || "Found";

    drops.forEach(function(drop) {
        if (DataManager.isItem(drop)) { // 物品
            if ($gameNumberArray.value(9).includes(drop.id)) {
                $gameSystem._drill_GFTH_styleId = 3;
            } else {
                $gameNumberArray.value(9).push(drop.id);
                $gameSystem._drill_GFTH_styleId = 2;
            }
			
			if ([4,5,6,7,8,9,10,11,12].includes(drop.id)) needSettlement = true;
            let context = interpreter.drill_GFTH_getText_item(drop.id, 1);
            $gameTemp.drill_GFTH_pushNewText(context);
            $gameParty.gainItem(drop, 1);
        } else if (DataManager.isWeapon(drop)) { // 武器
            if (!QJ.MPMZ.tl.checkplayerWeaponWeight()) {
				dingk.Loot.getMapDrops($gamePlayer,drop);				
                return; // 背包超重
            }
            if ($gameNumberArray.value(10).includes(drop.id)) {
                $gameSystem._drill_GFTH_styleId = 3;
            } else {
                $gameNumberArray.value(10).push(drop.id);
                $gameSystem._drill_GFTH_styleId = 2;
            }
            let context = interpreter.drill_GFTH_getText_weapon(drop.id, 1);
            $gameTemp.drill_GFTH_pushNewText(context);
            $gameParty.gainItem(drop, 1);
        } else if (DataManager.isArmor(drop)) { // 护甲
            if (!QJ.MPMZ.tl.checkplayerGearWeight()) {
				dingk.Loot.getMapDrops($gamePlayer,drop);					
                return; // 背包超重
            }
            if ($gameNumberArray.value(11).includes(drop.id)) {
                $gameSystem._drill_GFTH_styleId = 3;
            } else {
                $gameNumberArray.value(11).push(drop.id);
                $gameSystem._drill_GFTH_styleId = 2;
            }
            let context = interpreter.drill_GFTH_getText_armor(drop.id, 1);
            $gameTemp.drill_GFTH_pushNewText(context);
            $gameParty.gainItem(drop, 1);
        }

        if (display) { // 只有在有效掉落后才显示文本
            let itemTypeTag = DataManager.isItem(drop) ? "\\ii" : DataManager.isWeapon(drop) ? "\\iw" : "\\ia";
            let text = `${foundText} ${itemTypeTag}[${drop.id}]！`;
            $gameMessage.setBackground(0);
            $gameMessage.setPositionType(2);
            $gameMessage.add(text);
        }
    });
	
	// 处理玩家身上未清算掉的金钱道具
	if (needSettlement) {
    const itemIdArray = [4,5,6,7,8,9,10,11,12];
    const allItems = $gameParty.allItems();
    for (const item of allItems) {
        if (!item) continue;
        if (!DataManager.isItem(item)) continue;
        if (!itemIdArray.includes(item.id)) continue;
        const qty = $gameParty.numItems(item);
        for (let i = 0; i < qty; i++) {
            QJ.MPMZ.tl.ex_playerDropsValueChange(item);
        }
      }
    }		
};

// 通用的用于结算道具名称方法
dingk.Loot.generateItemNameFormat = function (item) {

    if (!item) return "";
	
	let fontSize = "\\fs[28]";
	let colorCode = "";
	let nameSuffix = "";
    let itemId = item.id;
    // 独立物品适配
    if (item.baseItemId != undefined) itemId = item.baseItemId;	
    // 判断物品类型，设置色码
    if (DataManager.isItem(item)) {
        colorCode = $gameTemp.drill_ITC_getColorCode_Item(itemId);
    }
    if (DataManager.isWeapon(item)) {
        colorCode = $gameTemp.drill_ITC_getColorCode_Weapon(itemId);
    }
    if (DataManager.isArmor(item)) {
        colorCode = $gameTemp.drill_ITC_getColorCode_Armor(item.id);
    }
    
	if (!!item.nameSuffix) {
		nameSuffix = item.nameSuffix;
	}
	
	if (colorCode != "") {
         itemName = "\\dDCOG[11:2:2:2]" + fontSize + "\x1bcsave\x1bcc[" + colorCode + "]" + item.name + nameSuffix + "\x1bcload";
     } else {
         itemName = "\\dDCOG[11:2:2:2]" + fontSize + item.name + nameSuffix;
     }

    return itemName; 	 
};

// 掉落物模板
QJ.MPMZ.eventDropItemIndicator = function(extra={}, args) {
	/*
	// 主动捡取道具
	*/	
	if (extra.pickUp) {	
        if (extra.forceItemDestroy) {
		// 强制销毁道具，比如ASABA吃掉道具
			if (!args.bulletTarget) return;
			let ownerEid = args.bulletTarget?.data?.ownerEid;
			if (!ownerEid) return;
            let srandomSeName = ["リンゴをかじる", "お菓子を食べる1", "お菓子を食べる2"];
            let seNames = srandomSeName[Math.floor(Math.random() * srandomSeName.length)];	
            let randomPitch = Math.randomInt(80) + 41;
            AudioManager.playSe({ name: seNames, volume: 90, pitch: randomPitch, pan: 0 });						
			$gameMap._backUpSpawnEventDataQJ = $gameMap._backUpSpawnEventDataQJ || {};
			delete $gameMap._backUpSpawnEventDataQJ[ownerEid];
			args.bulletTarget.setDead({t:['Time', 0], d:[1, 20, 1.5]});
			return;
		}	
        if (this.time < 40) return;
        let item     = null;
		let ownerEid = this.data.ownerEid;
		let itemId   = this.data.itemId;
		let itemType = this.data.itemType;				
		switch (itemType) {
			case 0:
				item = $dataItems[itemId];
			break;
			case 1:
				item = $dataWeapons[itemId];
			break;
			case 2:
				item = $dataArmors[itemId];
			break;		
		}		
        if ( !item ) return;		
	    // 检查背包容量
	    if (itemType == 1 && !QJ.MPMZ.tl.checkplayerWeaponWeight()) {
		    //dingk.Loot.getMapDrops($gamePlayer, item);
            this.addTimelineEffect('S', [0,24,10]);
			this.changeAttribute("moveType", ['S',0]);
		    return;
	    }		  
	    if (itemType == 2 && !QJ.MPMZ.tl.checkplayerGearWeight()) {
		   //dingk.Loot.getMapDrops($gamePlayer, item);
            this.addTimelineEffect('S', [0,24,10]);		
            this.changeAttribute("moveType", ['S',0]);			
		    return;
	    }			
	    // 检查收集物图鉴
        QJ.collectionCheck(itemType, itemId); 
        $gameParty.gainItem(item, 1, false);
		// 捡取演出
		QJ.MPMZ.tl.ex_pickupDropsAnimation.call(this, item);
		// 适配金钱转化
		if (itemType === 0) {
		    let goldItem = [4,5,6,7,8,9,10,11,12];
            if (goldItem.includes(itemId)) QJ.MPMZ.tl.ex_playerDropsValueChange(item);
		}
		// 捡取道具成功时，需要删除备份事件模板
		$gameMap._backUpSpawnEventDataQJ = $gameMap._backUpSpawnEventDataQJ || {};
		delete $gameMap._backUpSpawnEventDataQJ[ownerEid];
		this.setDead({t:['Time', 0], d:[1, 20, 1.5]});
		return;
	}
	/*
	// 自动检测是否处于无法捡取的坐标，如果是，就重新寻找可用坐标
	*/	
	if (extra.positionCheck) {	
	    if (this._ManekiNeko) return;
	    let posX = this._realX;
		let posY = this._realY;
		let oid  = this.data.ownerEid;
		if ($gameMap._backUpSpawnEventDataQJ?.[oid]) {
		  // 刷新原型事件位置
		   posX  = Math.floor(posX*10) / 10;
		   posY  = Math.floor(posY*10) / 10;
		   $gameMap._backUpSpawnEventDataQJ[oid][5]._x     = posX;
		   $gameMap._backUpSpawnEventDataQJ[oid][5]._y     = posY;
		   $gameMap._backUpSpawnEventDataQJ[oid][5]._realX = posX;
		   $gameMap._backUpSpawnEventDataQJ[oid][5]._realY = posY;
		}
		if (QJ.MPMZ.tl.isPlayerImmovable(Math.floor(posX), Math.floor(posY), {dropsCheck:true})) {			     
				 //let p  = dingk.Loot.randCleanPointInCircle(this.x, this.y, 600);				 
				 //p      = { x: p.x-24, y: p.y-24 };
				 let p  = { x: $gamePlayer.centerRealX()*48-24, y: $gamePlayer.centerRealY()*48-24 };
				 const tx = p.x;
				 const ty = p.y;	
                 const sx = this.x;		
                 const sy = this.y;				 
				 const angle = QJ.calculateAngleByTwoPointAngle(sx, sy, tx, ty);
				 const dist  = Math.hypot(tx - sx, ty - sy);
                 this.data.initialRotation = angle; 			 
				 const times = 1;
                 this.changeAttribute("moveType", ['QC', 60, times, dist / times, 45]);	              		 
		}
        return;
	}	
	/*
	// 生成掉落物判定弹幕+备份事件
	*/
	let mapId    = $gameMap.mapId();
	let eid      = this._eventId;
	let itemId   = this._dropItemId   ? this._dropItemId   : $gameSelfVariables.value([$gameMap.mapId(), eid, 'dropsId']);
	let itemType = this._dropItemType !== undefined ? this._dropItemType : $gameSelfVariables.value([$gameMap.mapId(), eid, 'dropsType']) - 1;
	let item,color,legendaryItem;
	let groupName = ["itemDrops"];

	// 备份掉落物数据
	this._dropItemId   = itemId;
	this._dropItemType = itemType;	
	if (!$gameSystem._spawnEventSaveDataListQJ[mapId]) {
        $gameSystem.initNewSaveDataSpawnEventMapQJ(mapId);
    }
	$gameSystem.addBackUpSpawnEventSaveDataQJ(eid,this.makeSaveData());
	
	switch (itemType) {
		case 0:
		    item     = $dataItems[itemId];
			color    = $gameTemp.drill_ITC_getColorCode_Item(itemId);
			if ([4,5,6,7,8,9,10,11,12].includes(itemId)) groupName.push("money");
		break;
		case 1:
		    item     = $dataWeapons[itemId];
			color    = $gameTemp.drill_ITC_getColorCode_Weapon(itemId);
			if ($gameNumberArray.value(1).includes(item?.baseItemId||item?.id)) legendaryItem = true;
		break;
		case 2:
		    item     = $dataArmors[itemId];
			color    = $gameTemp.drill_ITC_getColorCode_Armor(itemId);
			if ($gameNumberArray.value(2).includes(item?.baseItemId||item?.id)) legendaryItem = true;
		break;		
	}
	if (!item) return;
	
	let itemName = item.name;
	const wb     = new Window_Base(0, 0, 0, 0);
	itemName     = wb.convertEscapeCharacters(itemName);
    let posX     = this.centerRealX() - 0.5;
	let posY     = this.centerRealY() - 0.5;
    let angle    = this._targetPosition?.angle    || 0; 
	let distance = this._targetPosition?.distance || 4;
	let isMobile = Utils.isMobileDevice();
	// 掉落物图标
	let moveType = ['QC',60,1,distance,25];
	if (!angle || !distance)  {
		moveType = ['S',0];
	} else {
		this._x  = this._targetPosition?.targetX || this._x;
		this._y  = this._targetPosition?.targetY || this._y;
	}
	let itemIcon = QJ.MPMZ.Shoot({
						groupName: groupName,
						position: [["Map",posX], ["Map",posY]],
						img:['I',item.iconIndex],
						initialRotation: ['S',Math.floor(angle)],
						imgRotation:['S',0],
						collisionBox: ['C', isMobile ? 15 : 30],
						moveType: moveType,
						scale: isMobile ? 1 : 0.5,
						ownerEid: eid,
						itemId: itemId,
						itemType: itemType,
						z: 10,
						existData:[
							{ t:['P'], a:['F',QJ.MPMZ.eventDropItemIndicator,[{pickUp:true}]], p:[-1,false,true] },
						],
						moveF: [
						    [30,120,QJ.MPMZ.eventDropItemIndicator,[{positionCheck:true}]]
						],
						timeline:['S',0,160,[180,6,80]]
					});
	// 掉落物名称					
	QJ.MPMZ.Shoot({
		img: ['T', {
				text: itemName,
				arrangementMode: 0,
				textColor: color||"#ffffff",
				fontSize: 27,
				fontFace: DrillUp.g_DFF_fontFace,
				fontItalic: false,
				fontBold: true,
				width: -1,
				height: -1,
				textAlign: 5,
				outlineColor: "#000000",
				outlineWidth: 2,
				backgroundColor: null,
				backgroundOpacity: 1,
				shadowBlur: 0,
		}],
		position: [['B', itemIcon.index], ['B', itemIcon.index]],
		initialRotation: ['S', 0],
		imgRotation: ['S',0],
		moveType: ['D', true],
		anchor:[0.5,1.6],
		opacity: '0|0~20/1~99999999|1',
		z: 11,
		scale: 0.5,
		existData: [
			{ t: ['BE', itemIcon.index], d:[1, 20, 1.5] }
		],
		timeline:['S',0,160,[180,6,80]]
    });
    // 史诗道具动画演出
    if (legendaryItem) {
		QJ.MPMZ.Shoot({
             img:'Light4[5,6,4]',
		     moveType: ['D',true],
			 groupName: [],
             position: [['B', itemIcon.index], ['B', itemIcon.index]],
			 initialRotation:['S',0],
			 imgRotation:['F'],
			 scale:1,
			 blendMode:1,
			 opacity:0.75,
			 z:9,
			 anchor:[0.5,0.48],
             existData:[
			      { t: ['BE', itemIcon.index], d:[0, 10] }
             ],
       });	
	}
    // 是玩家扔下的道具
    if (this._playerDiscarded) {
        if (itemId === 109 || itemId === 122) {  // ASABA的草莓
		    let extraTag = itemId === 122 ? "ASABAstrawberry" : "Strawberry";
            itemIcon.data.groupName.push(extraTag);
	        $gameMap.addMapBulletsNameQJ(itemIcon.index, itemIcon.data.groupName);	
			itemIcon.addMoveData("F", [120, 120, QJ.MPMZ.tl.spawnASABAchototsumoushin]);
		}
	}		
};

// 自定义地点生成掉落物
dingk.Loot.specifiedLocationGenerateDrops = function (enemyId, XX, YY) {
    const enemy = $dataEnemies[enemyId];
    let drops = [];

    // 确保每个敌人只处理一次掉落表
    if (enemy.dropTables) {
		let rate = 1;
        for (let table of enemy.dropTables) {
            // 根据掉落概率和权重调整来确定是否进行掉落
            if (table.rate * rate >= Math.random()) {
                let adjustedTable = dingk.Loot.adjustTableWeights(table);
                let pool = dingk.Loot.getDropCategory(adjustedTable);
                if (pool) {
                    // 合并调整后的掉落池中获取的物品
                    drops = drops.concat(dingk.Loot.getItemsFromPool([pool]));
                }
            }
        }
    }
    
	if (this && this instanceof Game_QJBulletMZ) {
		XX = Math.floor(this.x / 48);
		YY = Math.floor(this.y / 48);
	}
	
    drops.forEach(function (drop) {
         QJ.MPMZ.tl.ex_getEnemyDrops(undefined,drop,{posX:XX,posY:YY,bombingFish:true});       
    });

    return drops;
};



// 自定义地点生成掉落物(商品类型)
dingk.Loot.specifiedLocationGenerateGoods = function (times) {
    const XX = this._x;
    const YY = this._y + 0.15;
    const Oid = this._eventId;

    if (!times) times = 4;

    const enemy = $dataEnemies[188];
    let drops = [];

    for (let i = 0; i < times; i++) {
        // 如果没有掉落表，直接跳过
        if (!enemy.dropTables) continue;

        let drop = null;
        let attemptCount = 0;

        // 最多尝试 10 次，寻找一个不重复的掉落
        while (attemptCount < 10) {
            attemptCount++;

            // 遍历所有掉落表，一旦抽到物品就检查并决定是否使用
            for (let table of enemy.dropTables) {
                let rand = Math.random();
				let rate = 1;
                // 先判断当前掉落表是否触发
                if (table.rate * rate >= rand) {
                    let adjustedTable = dingk.Loot.adjustTableWeights(table);
                    let pool = dingk.Loot.getDropCategory(adjustedTable);
                    if (pool) {
                        let candidate = dingk.Loot.getItemsFromPool([pool])[0];
                        if (!candidate) continue;

                        // 这里假设 candidate 有 type 字段用来标识物品类型
                        let candidateType = candidate.type;

                        // 检查是否已在 drops 里
                        let isDuplicate = drops.some(d => {
                            // 同时比较 id + 物品类型，才算真正重复
                            let dType = d.type;
                            return (d.id === candidate.id && dType === candidateType);
                        });
                        
						if (candidate.id === 19 && $gameParty.hasItem($dataItems[19])) isDuplicate = true;
						
                        if (!isDuplicate) {
                            drop = candidate;
                            break;
                        }
                    }
                }
            }

            if (drop) break;
        }

        // 如果 10 次都找不到非重复物品，则用 $dataItems[3] 作为保底物品
        if (!drop) {
            drop = $dataItems[3];
            // 如果需要在后续逻辑中使用 drop.id、drop.type 等字段，可以手动扩展：
            // drop.id = 3;
            // drop.type = 'item';
        }

        // 在这里统一 push
        drops.push(drop);
    }

    QJ.MPMZ.Shoot({
        groupName: ['chahuiGoods'],
        position: [['S',0], ['S',0]],
        initialRotation: ['S', 0],
        imgRotation: ['F'],
        opacity: 0,
        moveType: ['S', 0],
        existData: [],
        moveF: [
            [10, 36, dingk.Loot.loopGenerateGoods, [XX, YY, times, Oid]]
        ],
        dropsArray: drops
    });
};

dingk.Loot.loopGenerateGoods = function (XX,YY,times,Oid) {
      
	if (!times) times = 4;
	this._loopTimes = this._loopTimes || 0;
	this._loopTimes += 1;
	let dropsCount = $gameSelfVariables.value([$gameMap.mapId(), Oid, 'dropsCount']);
	$gameSelfVariables.setValue([$gameMap.mapId(), Oid, 'dropsCount'], dropsCount+1);
    let target = $gameMap.event(Oid);
	if (!target || $gameSelfSwitches.value([$gameMap.mapId(), Oid, 'B']) || $gameSelfSwitches.value([$gameMap.mapId(), Oid, 'D'])) {
		this.setDead({t:['Time',0]});
		return;
	}
	
            if (this._loopTimes >= times || dropsCount >= times) {
				if (target._drill_EASe_controller !== undefined) {
					target.drill_EASe_setSimpleStateNode( ["微笑"] );
				}
                this.setDead({t:['Time',0]});
                return; 
            }	   

    let randomIndex = Math.floor(Math.random() * this.data.dropsArray.length);
    let drop = this.data.dropsArray.splice(randomIndex, 1)[0]; 

            if (this.data.dropsArray.length == 0) {
				if (target._drill_EASe_controller !== undefined) {
					target.drill_EASe_setSimpleStateNode( ["微笑"] );
				}				
                this.setDead({t:['Time',0]});
                return; 
            }	

    let eid = $gameMap.spawnEventQJ(1, 100, XX, YY, true);
    let e = $gameMap.event(eid);
    if (!e) return;

    e._opacity = 0;
	e._dropItemId = drop.id;
    
    if (DataManager.isItem(drop)) {
		e._dropItemType = 1;      
    } else if (DataManager.isWeapon(drop)) {
        e._dropItemType = 2;  
    } else if (DataManager.isArmor(drop)) {
        e._dropItemType = 3;
    }

    let text = dingk.Loot.generateItemNameFormat(drop);

    $gameSelfSwitches.setValue([$gameMap.mapId(), e._eventId, "A"], true);

    let iconIndex = "$DrillEIIconSet_" + drop.iconIndex;
    e.setImage(iconIndex, e._characterIndex);
    e._opacity = 255;

    let sprite = SceneManager._scene._spriteset.findCharacterSprite(e);
    if (sprite && sprite._miniLabel) {
        sprite._miniLabel._noFresh = true;
        sprite._miniLabel._bufferY = 20;
        sprite._miniLabel.setGoodsText(text);
    }
	// 必须留下标记，否则切换地图后看不见名称
    e._miniLabelText = text;
	
    var condition = DrillUp.g_COFA_condition_list[6];
    var c_area = $gameMap.drill_COFA_getCustomPointsByIdWithCondition(Oid, 8, condition);
	
    if (c_area.length > 0) {
        var p = c_area[Math.floor(Math.random() * c_area.length)];
        var xPlus = p.x - XX;
        var yPlus = p.y - YY;
        e.jump(xPlus, yPlus);
    } else {
        e.jump(0, 0);
    }

    let se = { name: "Heal1", volume: 60, pitch: 130, pan: 0 };
    AudioManager.playSe(se);

};

// 玩家丢弃装备
dingk.Loot.playerdiscardsEquipment = function ( drop ) {	

    if (!$gamePlayer) return;
    drop.description = "";

	// 初号机会自动回归
	if (drop.baseItemId && drop.baseItemId === 100) {
		SoundManager.playBuzzer();
		return;
	}
	
	// 如果丢弃地点是星之门，标记无法删除
	if ($gameMap.mapId() === 51) {
      // 星之门内最多可丢弃200件物品		
	  if ($gameMap.getGroupBulletListQJ("itemDrops").length >= 200 || $gameMap.drill_COET_getEventsByTag_direct("掉落物").length >= 200) {
            switch (ConfigManager.language) {
                case 0:
                    lang = "不能再存放更多物品了！";
                    break;
                case 1:
                    lang = "これ以上アイテムを収納できない！";
                    break;
                default:
                    lang = "Can’t store any more items!";
                    break;
            }
	
    var text = "\\fs[28]\\c[101]\\dDCOG[11:1:1:1]" + lang;
    var x =  $gamePlayer.screenX() * $gameScreen.zoomScale();
    var y = ($gamePlayer.screenY() * $gameScreen.zoomScale()) - 48;
    $gameTemp.drill_GFTT_createSimple( [x, y], text, 5, 0, 90 );	
	AudioManager.playSe({ name: "014myuu_YumeSE_SystemBuzzer03", volume: 90, pitch: 100, pan: 0 });
         return;		 
	  }
		
	  drop.description = "不可删除";
	} 
	QJ.MPMZ.tl.ex_getEnemyDrops($gamePlayer,drop);
	// 从玩家背包移除
	$gameParty.loseItem(drop, 1);
	
};
	
	
//敌人掉落物
dingk.Loot.generateEnemyDrops = function ( target, enemyId ) {
	if (!target) return;
	if (!enemyId) {
	    enemyId = $gameSelfVariables.value([$gameMap.mapId(), target._eventId, 'enemyId']);
	}
	if (enemyId === 0) return;
	const tables = dingk.Loot.enemyDropTables(enemyId);
    let drops = [];

    // 确保每个敌人只处理一次掉落表
    if (tables) {
		let rate = 1;
        for (let table of tables) {
            // 根据掉落概率和权重调整来确定是否进行掉落
            if (table.rate * rate >= Math.random()) {
                let adjustedTable = dingk.Loot.adjustTableWeights(table);
                let pool = dingk.Loot.getDropCategory(adjustedTable);
                if (pool) {
                    // 合并调整后的掉落池中获取的物品
                    drops = drops.concat(dingk.Loot.getItemsFromPool([pool]));
                }
            }
        }
    }
    drops.forEach(function(drop) {
		QJ.MPMZ.tl.ex_getEnemyDrops(target,drop);	 		 
    });

    return drops;
};

//敌人掉落物事件模板
QJ.MPMZ.tl.ex_getEnemyDrops = function(target, drop, extra = {}) {
	
    let posX,posY;
	if (target) {
	    posX = target.centerRealX();
        posY = target.centerRealY();
	}
    if (extra.posX && extra.posY) {
		posX = extra.posX;
		posY = extra.posY;
	}
	if (!posX || !posY) return;
	if (!drop) return;
	let eid  = $gameMap.spawnEventQJ(1,82,posX,posY,true);
	let e    = $gameMap.event(eid);
    if (!e) return;	
    e._opacity = 0;
	e._dropItemId = drop.id;

    if (DataManager.isItem(drop)) {
		e._dropItemType = 0;      
    } else if (DataManager.isWeapon(drop)) {
        e._dropItemType = 1;  
    } else if (DataManager.isArmor(drop)) {
        e._dropItemType = 2;
    }
    
	if (!extra.disableAnimation) {
		let p         = {x:posX, y:posY};
		let condition = DrillUp.g_COFA_condition_list[6];
		let c_area    = {};
		if (extra.vendingMachine) {
			//condition = DrillUp.g_COFA_condition_list[10];
			c_area    = $gameMap.drill_COFA_getCustomPointsByIdWithCondition( eid, 7, condition );
            p         = c_area[Math.floor(Math.random() * c_area.length)];			
		} else {
			let range = 120;
			if (extra.mapDrops) range = 180;
			p         = dingk.Loot.randCleanPointInCircle(posX*48, posY*48, range);
			p         = { x: p.x/48, y: p.y/48 };
			c_area    = [1,2,3];
		}
		if (c_area.length > 0) {
			const tw = $gameMap.tileWidth();   
			const th = $gameMap.tileHeight(); 
			const tx = p.x * tw - tw * 0.5;
			const ty = p.y * th - th * 0.5;			
			const sx = posX * tw;
			const sy = posY * th;
			let angle   = QJ.calculateAngleByTwoPointAngle(sx, sy, tx, ty);
			const dist  = Math.hypot(tx - sx, ty - sy);		
			e._targetPosition = {angle:angle, distance:dist, targetX:p.x, targetY:p.y};
		} else {
			e._targetPosition = {angle:Math.randomInt(360), distance:4};
		}
 	
		let se = { name: "Heal1", volume: 60, pitch: 130, pan: 0 };
        if (extra.bombingFish) {
			se = { name: "魚を釣り上げる", volume: 100, pitch: 100, pan: 0 }; 
		}		
		AudioManager.playSe(se);
	}
	
	if (extra.playerDiscarded) {
		e._playerDiscarded = true;
	}
};

dingk.Loot.randCleanPointInCircle = function (cx, cy, R, maxTries = 300) {
  let last = { x: Math.round(cx), y: Math.round(cy) };

  for (let i = 0; i < maxTries; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * R;
    const x = Math.round(cx + r * Math.cos(a));
    const y = Math.round(cy + r * Math.sin(a));
    last = { x:x, y:y };

    const hit = dingk.Loot.drill_COFA_selectPoints_bullet(last);

    if (hit) return last;
  }

  // 超过上限：返回最后一次随机到的坐标
    let randomPitch = Math.randomInt(40) + 80;
    let se = { name: "014myuu_YumeSE_SystemBuzzer03", volume: 55, pitch: randomPitch, pan: 0 };
    AudioManager.playSe(se);
    let BulletText;
    switch (ConfigManager.language) {
        case 0:
            BulletText = "附近没有合适的空位啦！";
            break;
        case 1:
            BulletText = "近くに空きがありません！"
            break;
        default:
            BulletText = "There’s no suitable empty space nearby!"
            break;
    }

    let text = "\\fs[28]\\c[101]\\dDCOG[11:1:1:1]" + BulletText;
    let xx = $gamePlayer.screenX() * $gameScreen.zoomScale();
    let yy = ($gamePlayer.screenY() * $gameScreen.zoomScale()) - 48;
    $gameTemp.drill_GFTT_createSimple([xx, yy], text, 5, 0, 120);
    return last;
};

// 筛选不含掉落物的点
dingk.Loot.drill_COFA_selectPoints_bullet = function( point ) {

		let xx    = (point.x/48) - 0.5;
		let yy    = (point.y/48) - 0.5;
		if (QJ.MPMZ.tl.isPlayerImmovable(Math.floor(xx), Math.floor(yy))) return false;
		let check = QJ.MPMZ.rangeAtk([['Map', xx],['Map', yy]],['B','itemDrops'],[],['C',25]);
		if ( check.length === 0 ) {
			return true;
		}
	return false;
};

//自动贩售机掉落
dingk.Loot.generateVendingMachineDrops = function ( target ) {
	if (!target) return;
	let enemyId = 5;
    const tables = dingk.Loot.enemyDropTables(enemyId);
    let drops = [];

    // 确保每个敌人只处理一次掉落表
    if (tables) {
		let rate = 1;
        for (let table of tables) {
            // 根据掉落概率和权重调整来确定是否进行掉落
            if (table.rate * rate >= Math.random()) {
                let adjustedTable = dingk.Loot.adjustTableWeights(table);
                let pool = dingk.Loot.getDropCategory(adjustedTable);
                if (pool) {
                    // 合并调整后的掉落池中获取的物品
                    drops = drops.concat(dingk.Loot.getItemsFromPool([pool]));
                }
            }
        }
    }

    drops.forEach(function(drop) {
		//QJ.MPMZ.tl.ex_getVendingMachineDrops(target,drop);	 
        QJ.MPMZ.tl.ex_getEnemyDrops(target,drop,{vendingMachine:true});
    });

    return drops;
};

//自动贩售机掉落模板
QJ.MPMZ.tl.ex_getVendingMachineDrops = function(target, drop) {
    if (!target) return;
    
    let posX = target.centerRealX();
    let posY = target.centerRealY();

	let eid = $gameMap.spawnEventQJ(1,82,posX,posY,true);
	let e = $gameMap.event(eid);
    if (!e) return;	
    e._opacity = 0;
	e._dropItemId = drop.id;
    
    if (DataManager.isItem(drop)) {
		e._dropItemType = 0;      
    } else if (DataManager.isWeapon(drop)) {
        e._dropItemType = 1;  
    } else if (DataManager.isArmor(drop)) {
        e._dropItemType = 2;
    }

    var condition = DrillUp.g_COFA_condition_list[10];
    //var c_area = $gameMap.drill_COFA_getShapePointsWithCondition(XX, YY, "圆形区域", 6, condition);
	var c_area = $gameMap.drill_COFA_getCustomPointsByIdWithCondition( e._eventId, 7, condition );
    if (c_area.length > 0) {
        var p = c_area[Math.floor(Math.random() * c_area.length)];
        var xPlus = p.x - posX;
        var yPlus = p.y - posY;
        e.jump(xPlus, yPlus);
    } else {
        e.jump(0, 0);
    }

    var se = { name: "Heal1", volume: 60, pitch: 130, pan: 0 };
    AudioManager.playSe(se);
};

//地图掉落物模板
dingk.Loot.getMapDrops = function(target,drop,extra={}) {
	
	let playerDiscarded = false;
	if (extra.playerDiscarded) playerDiscarded = true;
	
	QJ.MPMZ.tl.ex_getEnemyDrops(target,drop,{mapDrops:true, playerDiscarded:playerDiscarded});
};

//指定地点地图掉落物模板
dingk.Loot.specifyPositionGetMapDrops = function(XX,YY,drop) {
	
    if (!XX || !YY) return;
	XX *= 48;
	YY *= 48;
    QJ.MPMZ.tl.ex_getEnemyDrops(undefined,drop,{posX:XX,posY:YY});    
};

// 调整权重的方法
dingk.Loot.adjustTableWeights = function (table) {
    let adjustedTable = Object.assign(new DropTable(), table);
    adjustedTable.clear();
    
    for (let pool of table.pools) {
        let newPool = Object.assign(new DropPool(), pool);
        let [add, multiply] = [0, 1];
        
        for (let member of $gameParty.battleMembers()) {
            let buffs = member.getWeightAdjustments(pool.name);
            for (let buff of buffs) {
                if (!buff) continue;
                if (buff.operation.includes('*')) {
                    multiply *= buff.rate;
                } else if (buff.operation.includes('-')) {
                    add -= buff.rate;
                } else {
                    add += buff.rate;
                }
            }
        }

        newPool.weight = newPool.weight * multiply + add;
        adjustedTable.insert(newPool);
    }

    return adjustedTable;
};



dingk.Loot.generateGoods = function (enemyId) {
	const enemy = new Game_Enemy(enemyId, 0, 0);
    const drops = enemy.makeDropItems();
	var item = [];
    drops.forEach(function(drop) {
		   if (DataManager.isItem(drop)) {
        item.push(1);
		item.push(drop.id);
		  }else if (DataManager.isWeapon(drop)) {
        item.push(2);
		item.push(drop.id);
		  }else if (DataManager.isArmor(drop)) {
        item.push(3);
		item.push(drop.id);
		  }
    })

    return item;
}

/* ============================================================================
 *  Runtime Enemy LootTable Overrides
 *  运行时敌人掉落表覆盖
 
// 用法参考： 修改原掉落池的配方
$gameSystem.cloneDefaultEnemyLoot(5);
let tables = $gameSystem.getEnemyLootOverride(5);
if (tables && tables[0]) {
    let t = tables[0];
    t.pools.forEach(function(pool) {
        if (pool.name === "Rare") {
            pool.weight = 999;
        }
    });
} 

// 用法参考： 重新定义掉落池内容
let t = new DropTable("Dynamic5", [], 0, 0, 1.0);
t.insert(new DropPool("Common", 10, 1, 2));
t.insert(new DropPool("Rare", 2, 1, 1));
$gameSystem.setEnemyLootOverride(5, [t]);
 
 * ==========================================================================*/

    Game_System.prototype._ensureLootOverrideStorage = function() {
        if (!this._lootEnemyDropOverrides) {
            this._lootEnemyDropOverrides = {};
        }
    };

    /**
     * 设置某个敌人的“掉落表覆盖”
     */
    Game_System.prototype.setEnemyLootOverride = function(enemyId, dropTables) {
        this._ensureLootOverrideStorage();
        this._lootEnemyDropOverrides[enemyId] = dropTables || [];
    };

    /**
     * 删除某个敌人的掉落表覆盖，恢复读取数据库原始数据
     */
    Game_System.prototype.clearEnemyLootOverride = function(enemyId) {
        this._ensureLootOverrideStorage();
        delete this._lootEnemyDropOverrides[enemyId];
    };

    /**
     * 取得某个敌人的覆盖掉落表（没有则返回 undefined）
     */
    Game_System.prototype.getEnemyLootOverride = function(enemyId) {
        this._ensureLootOverrideStorage();
        return this._lootEnemyDropOverrides[enemyId];
    };

    /**
     * 便捷函数：把数据库里的掉落表「克隆」一份写入覆盖区
     */
    Game_System.prototype.cloneDefaultEnemyLoot = function(enemyId) {
        const enemy = $dataEnemies[enemyId];
        if (!enemy || !enemy.dropTables || !enemy.dropTables.length) return;

        const copiedTables = enemy.dropTables.map(function(table) {
            const newTable = new DropTable(
                table.name,
                [],
                table.minLevel,
                table.maxLevel,
                table.rate
            );

            for (const pool of table.pools) {
                const newPool = new DropPool(
                    pool.name,
                    pool.weight,
                    pool.minAmount,
                    pool.maxAmount,
                    pool.level,
                    pool.tier
                );
                newTable.insert(newPool);
            }
            return newTable;
        });

        this.setEnemyLootOverride(enemyId, copiedTables);
    };

    /**
     * 便捷函数：用插件参数里定义的“全局掉落表”名字来覆盖某个敌人
     */
    Game_System.prototype.setEnemyLootOverrideByNames = function(enemyId, tableNames) {
        if (!Array.isArray(tableNames)) tableNames = [tableNames];
        const result = [];
        for (const name of tableNames) {
            const t = dingk.Loot.Tables[name];
            if (t) result.push(t);
        }
        this.setEnemyLootOverride(enemyId, result);
    };

    /**
     * 取得某个敌人“最终使用的掉落表数组”
     * 优先读 Game_System 的覆盖，否则用数据库里的 enemy.dropTables
     */
    dingk.Loot.enemyDropTables = function(enemyId) {
        const system = $gameSystem;
        if (system && system.getEnemyLootOverride) {
            const override = system.getEnemyLootOverride(enemyId);
            if (override && override.length) {
                return override;
            }
        }
        const enemy = $dataEnemies[enemyId];
        return (enemy && enemy.dropTables) ? enemy.dropTables : [];
    };



