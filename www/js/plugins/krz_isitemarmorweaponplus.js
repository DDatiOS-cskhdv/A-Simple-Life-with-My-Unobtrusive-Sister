//=============================================================================
// krz 优化判断物品类型
// krz 优化判断物品类型.js
//=============================================================================

//=============================================================================
 /*:
 * @plugindesc 即插即用，优化判断物品类型，当物品太多的时候可能掉帧的问题被解决。
 * 如果你给一个武器加上了atypeId、stypeId、itypeId这类下会出问题v0.02
 * @author KRZ
 */
 //=============================================================================
 
DataManager.isSkill = function(item) {
	if(!item) return false;
	if(item.stypeId !=undefined) return true;
	if(item.itypeId || item.wtypeId || item.atypeId) return false;
    return item  && $dataSkills.contains(item);
};

DataManager.isItem = function(item) {
	if(!item) return false;
	if(item.itypeId !=undefined) return true;
	if(item.stypeId || item.wtypeId || item.atypeId) return false;
    return item && $dataItems.contains(item);
};

DataManager.isWeapon = function(item) {
	if(!item) return false;
	if(item.wtypeId !=undefined) return true;
	if(item.itypeId || item.stypeId || item.atypeId) return false;
    return item && $dataWeapons.contains(item);
};

DataManager.isArmor = function(item) {
	if(!item) return false;
	if(item.atypeId !=undefined) return true;
	if(item.itypeId || item.wtypeId || item.stypeId) return false;
    return item && $dataArmors.contains(item);
};
