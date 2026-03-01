//=============================================================================
// Item and Skill Sort
// TUR_Sort.js
//=============================================================================

window.Imported = window.Imported || {};
Imported.TUR_Sort = true;

window.TUR = window.TUR || {};
TUR.Sort = TUR.Sort || {};
TUR.Sort.version = 1.0;

/*:
 * @plugindesc Provide options for sorting the list of skills and items.
 * @author ATT_Turan
 * @url https://forums.rpgmakerweb.com/index.php?threads/turans-christmas-calendar-day-1.164137/
 * @version 1.0
 * @target MZ
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The default order that skills and items are displayed in battle is according
 * to their database ID. It is often inconvenient for the user to rearrange the
 * database, so this plugin provides some options for sorting those lists.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * Skill and Item notetag
 * <priority:x>
 *
 * x should be any integer value. The list will be arranged in order of
 * ascending priority. Any entries that do not have the priority notetag will
 * be at the bottom of the list in the order determined by their plugin
 * parameter.
 *
 * ============================================================================
 * Notes
 * ============================================================================
 * 
 * Choosing to sort skills by level may result in unusual results for some
 * games. It can only reference the class the actor is currently in, so if a
 * class change system is used, skills may change their order depending on the
 * current class.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.0:
 * - Release version
 *
 * @param ItemSorting
 * @type select
 * @option default
 * @option alphabetical
 * @option cost
 * @desc The sort order used for items.
 * @default default
 *
 * @param SkillSorting
 * @type select
 * @option default
 * @option alphabetical
 * @option level
 * @default default
 *
 */

TUR.SortParams = PluginManager.parameters('TUR_Sort');

Window_ItemList.prototype.makeItemList = function() {
  this._data = $gameParty.allItems().filter(function(item) {
    return this.includes(item);
  }, this);

  // —— 新的比较器（安全版） ——
  const getBaseId = obj =>
    (Imported.YEP_ItemCore && DataManager.isIndependent && DataManager.isIndependent(obj))
      ? (obj.baseItemId || obj.id || 0)
      : (obj.id || 0);

  const getPriority = obj => {
    const id = getBaseId(obj);
    let data = null;
    if (DataManager.isItem(obj))   data = $dataItems[id];
    else if (DataManager.isWeapon(obj)) data = $dataWeapons[id];
    else if (DataManager.isArmor(obj))  data = $dataArmors[id];
    const raw = data?.meta?.priority;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  };

  this._data.sort((a, b) => {
    // 先按 <priority:x> 排
    const pa = getPriority(a);
    const pb = getPriority(b);
    if (pa !== null && pb !== null) return pa - pb;
    if (pa !== null) return -1;
    if (pb !== null) return 1;

    // 再按插件参数
    switch (TUR.SortParams.ItemSorting) {
      case "alphabetical": return String(a?.name||"").localeCompare(String(b?.name||""));
      case "cost":         return (a?.price||0) - (b?.price||0);
      default:             return 0;
    }
  });

  if (this.includes(null)) this._data.push(null);
};

Window_SkillList.prototype.makeItemList = function() {
  if (this._actor) {
    // 先正确构建数据源
    this._data = this._actor.skills().filter(function(skill) {
      return this.includes(skill);
    }, this);

    // 再排序
    this._data.sort((a, b) => {
      const pa = Number(a?.meta?.priority);
      const pb = Number(b?.meta?.priority);
      const hasPa = Number.isFinite(pa);
      const hasPb = Number.isFinite(pb);
      if (hasPa && hasPb) return pa - pb;
      if (hasPa) return -1;
      if (hasPb) return 1;

      switch (TUR.SortParams.SkillSorting) {
        case "alphabetical":
          return String(a?.name || "").localeCompare(String(b?.name || ""));
        case "level": {
          const learnings = this._actor.currentClass().learnings || [];
          const la = learnings.find(l => l.skillId === a.id)?.level;
          const lb = learnings.find(l => l.skillId === b.id)?.level;
          const fa = Number.isFinite(la) ? la : (this._actor.maxLevel() + a.id);
          const fb = Number.isFinite(lb) ? lb : (this._actor.maxLevel() + b.id);
          return fa - fb;
        }
        default:
          return 0;
      }
    });
  } else {
    this._data = [];
  }
};


