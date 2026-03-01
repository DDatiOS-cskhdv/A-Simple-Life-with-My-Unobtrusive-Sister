/*:
 * @plugindesc Only show specific custom types of items in the Select Item window.
 * @author LadyBaskerville
 *
 * @help
 * LB_CustomItemChoices.js
 * Version 1.1.1
 * by LadyBaskerville
 *
 * ===================== 
 *     How to use 
 * ===================== 
 *
 * To specify a custom item type, add a notetag of the format 
 * <type:X>
 * to the item, where X is the custom item type (can be any string that does
 * not contain spaces).
 *
 * You can change the brackets in the plugin parameters, e.g. set prefix to [
 * and postfix to ] to only write [X] in the item note field in order to 
 * specify custom type X. If you leave both parameters empty, an item will 
 * belong to custom type X if the string X appears anywhere in the note field.
 * 
 * Items can have multiple custom types. Simply add more notetags, e.g.
 * <type:food>
 * <type:fish>
 * <type:cooked>
 *
 * ----------------------
 *    Plugin commands
 * ----------------------
 *
 * Before using the Select Item command in an event, use the plugin command
 * SetSelectItemType X
 * to only show items of the type X in the Select Item window.
 *
 * Use the plugin command
 * SetSelectItemType 0
 * to return to the default behavior (showing all items in the selection window).
 *
 * -----------------------
 * Script calls (advanced)
 * -----------------------
 * These script calls will probably be most useful in the Script fields of the
 * Change Variables and Conditional Branch event commands.
 *
 * Use the script call
 * $gameParty.customItemTypeCount('X')
 * to get the number of items from custom type X in the party's inventory.
 *
 * The script call
 * DataManager.isItemCustomType($dataItems[n], 'X')
 * returns true if the item with ID n has the custom type X, otherwise false.
 *
 *
 * ===================== 
 *     Terms of use 
 * ===================== 
 * - Free for use in both non-commercial and commercial games. 
 * - Please credit me as LadyBaskerville if you use this plugin (version 1.1.0 
 *   and higher). 
 * - You may edit this plugin. 
 * - You may redistribute this plugin and edits of it. In that case, please 
 *   give credit and, if possible, link back to the original plugin thread. 
 *
 * ===================== 
 *      Changelog 
 * ===================== 
 * Version 1.1.1
 * - Fixed a bug where the item selection screen would come up empty
 *   if no select item type was set.
 * Version 1.1.0 
 * - Added parameters for prefix and postfix.
 * - Added support for more than one custom type per item.
 * - Added script calls for advanced functionality 
 * Version 1.0.0 
 * - Finished the plugin. 
 *
 * @param Item Note Prefix
 * @desc Prefix/Opening bracket for custom types in the item notes.
 * @default <type:
 *
 * @param Item Note Postfix
 * @desc Postfix/Closing bracket for custom types in the item notes.
 * @default >
 *
 */
 
(function() {
 
var LB = LB || {};
LB.MoreItemChoices = LB.MoreItemChoices || {};

LB.MoreItemChoices.prefix = String(PluginManager.parameters('LB_CustomItemChoices')['Item Note Prefix']);
LB.MoreItemChoices.postfix = String(PluginManager.parameters('LB_CustomItemChoices')['Item Note Postfix']);


LB.MoreItemChoices.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    LB.MoreItemChoices.Game_Interpreter_pluginCommand.call(this, command, args);
	
	if (command == 'SetSelectItemType') {
		if (args[0] == '0') {
			$gameNumberArray.setValue(25,[]);
			$gameMessage.setItemChoiceCustomType(0);
		}
		else {
			$gameMessage.setItemChoiceCustomType(args[0]);
		}
    }
    return false;
};

Game_Message.prototype.setItemChoiceCustomType = function(customType) {
	this._itemChoiceCustomType = customType;
	if (customType !== 0) {
		$gameTemp._lastEventItemIndex = undefined;
	}
};

Game_Message.prototype.itemChoiceCustomType = function(customType) {
	return this._itemChoiceCustomType;
};


DataManager.isItemCustomType = function(item, customType) {
	if (!item || !customType) return false;
    return item.note.includes(LB.MoreItemChoices.prefix + customType + LB.MoreItemChoices.postfix);
};

Window_EventItem.prototype.includes = function(item) {
	
	var goods = $gameNumberArray.value(25);
	if (goods.length > 0) {
		if (!DataManager.isItem(item) || !item.id || !goods.includes(item.id)) return false;
		return true;
	}
	
    var itypeId = $gameMessage.itemChoiceItypeId();
	var customType = $gameMessage.itemChoiceCustomType();
	if (!customType || customType == 0) {
		return DataManager.isItem(item) && item.itypeId === itypeId;
	} else {
		//return DataManager.isItem(item) && item.itypeId === itypeId && item.meta.type === customType;
		return DataManager.isItem(item) && item.itypeId === itypeId && DataManager.isItemCustomType(item, customType);
	}
};

Game_Party.prototype.customItemTypeCount = function(customType) {
    var count = 0;
    for (var id in this._items) {
        if (DataManager.isItemCustomType($dataItems[id], customType)) count += this.numItems($dataItems[id]);
    }
    return count;
};

Game_Party.prototype.customItemTypeList = function(customType) {
    let List = [];
    for (let id in this._items) {
        if (DataManager.isItemCustomType($dataItems[id], customType)) {
			List.push(Number(id));
		}
    }
    return List;
};

})();