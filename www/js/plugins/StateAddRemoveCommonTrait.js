//
//  ステート付与解除時コモン特徴 ver1.03
//
// ------------------------------------------------------
// Copyright (c) 2016 Yana
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// ------------------------------------------------------
//
// author yana
//

var Imported = Imported || {};
Imported['StateAddRemoveCommonTrait'] = 1.03;
/*:
 * @plugindesc ver1.03/状态附加或解除时执行公共事件。
 * @author Yana
 *
 * @param SubjectIndex
 * @desc 起動者のインデックスを格納する変数のIDです。
 * 格納されたインデックスがエネミーの場合、+1000された値が入ります。
 * @default 0
 *
 * @help ------------------------------------------------------
 * 关于插件
 * ------------------------------------------------------
 * 该插件在状态附加或解除时执行一次指定的公共事件，
 * ◆经测试标签可用于角色、职业、敌人。
 * ------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 *
 * ・附加状态时执行
 * 在角色、职业、敌人的备注中写入:
 * <ステート○付与時コモン:□>
 * 或者、
 * <AddState○Common:□>
 * 当附加○号状态时，执行□号公共事件。
 *
 * ・解除状态时执行
 * 在角色、职业、敌人的备注中写入:
 * <ステート○解除時コモン:□>
 * 或者、
 * <RemoveState○Common:□>
 * 当解除○号状态时，执行□号公共事件。
 *
 * <ステート○自然解除時コモン:□>
 * 或者、
 * <AutoRemoveState○Common:□>
 * 当○号状态自动解除时，执行□号公共事件。
 *
 * ------------------------------------------------------
 * 使用条款
 * ------------------------------------------------------
 * 本插件已在MIT许可证上发布。
 * 使用没有限制。 商用、成人均可使用。
 * 也不限制二次分发，但不提供支持。
 * 版权所有。 不做也可以使用。
 * 总之，没有什么规定。
 * バグ報告や使用方法等のお問合せはネ実ツクールスレ、または、Twitterにお願いします。
 * https://twitter.com/yanatsuki_
 * 材料使用请自行负责。
 * ------------------------------------------------------
 * 更新履歴:
 * ver1.03:
 * 同時に予約されたコモンイベントも実行されるように処理を変更。
 * ver1.02:
 * 起動者のインデックスを変数に入れる処理を追加。
 * ver1.01:
 * 死亡時に判定が行われていなかったバグを修正。
 * ver1.00:
 * 公開
 */


(function() {
    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('StateAddRemoveCommonTrait');
    var subjectIndexVarId = Number(parameters['SubjectIndex']);

    ////////////////////////////////////////////////////////////////////////////////////

    DataManager.stateCommonEvent = function(item, stateId, type) {
        if (!item || !type) return null;
        if (item._stateCommonId && item._stateCommonId[stateId] !== undefined &&
            item._stateCommonId[stateId][type] !== undefined ) {
            return item._stateCommonId[stateId][type];
        }
        item._stateCommonId = item._stateCommonId || {};
        item._stateCommonId[stateId] = { add:null, remove:null };
        if (item.meta['ステート' + stateId + '付与時コモン']) {
            item._stateCommonId[stateId]['add'] = item.meta['ステート' + stateId + '付与時コモン'];
        } else if (item.meta['AddState' + stateId + 'Common']){
            item._stateCommonId[stateId]['add'] = item.meta['AddState' + stateId + 'Common'];
        }
        if (item.meta['ステート' + stateId + '解除時コモン']) {
            item._stateCommonId[stateId]['remove'] = item.meta['ステート' + stateId + '解除時コモン'];
        } else if (item.meta['RemoveState' + stateId + 'Common']){
            item._stateCommonId[stateId]['remove'] = item.meta['RemoveState' + stateId + 'Common'];
        }
        if (item.meta['ステート' + stateId + '自然解除時コモン']) {
            item._stateCommonId[stateId]['autoRemove'] = item.meta['ステート' + stateId + '自然解除時コモン'];
        } else if (item.meta['AutoRemoveState' + stateId + 'Common']){
            item._stateCommonId[stateId]['autoRemove'] = item.meta['AutoRemoveState' + stateId + 'Common'];
        }
        
        return item._stateCommonId[stateId][type];
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Temp.prototype.setStackCommonEvent = function(ary) {
        if (!this._commonStack) this._commonStack = [];
        this._commonStack.push(ary);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __GInterpreter_setupReservedCommonEvent = Game_Interpreter.prototype.setupReservedCommonEvent;
    Game_Interpreter.prototype.setupReservedCommonEvent = function() {
        if (!$gameTemp.isCommonEventReserved() && $gameTemp._commonStack && $gameTemp._commonStack.length > 0) {
            var ci = $gameTemp._commonStack.shift();
            if (subjectIndexVarId) $gameVariables.setValue(subjectIndexVarId, ci[1]);
            $gameTemp.reserveCommonEvent(ci[0]);
        }
        return __GInterpreter_setupReservedCommonEvent.call(this);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __GBBase_clearStates = Game_BattlerBase.prototype.clearStates;
    Game_BattlerBase.prototype.clearStates = function() {
        if (this._states) {
            this._states.forEach(function (stateId) {
                this.reserveCommonState(stateId, 'remove');
            }.bind(this));
        }
        __GBBase_clearStates.call(this);
    };

    var __GBBase_addNewState = Game_BattlerBase.prototype.addNewState;
    Game_BattlerBase.prototype.addNewState = function(stateId) {
        __GBBase_addNewState.call(this, stateId);
        this.reserveCommonState(stateId, 'add');
    };

    var __GBBase_eraseState = Game_BattlerBase.prototype.eraseState;
    Game_BattlerBase.prototype.eraseState = function(stateId) {
        __GBBase_eraseState.call(this, stateId);
        if (this._autoRemoveStates && this._autoRemoveStates.contains(stateId)) {
            this.reserveCommonState(stateId, 'autoRemove');
        }
        this.reserveCommonState(stateId, 'remove');
    };

    Game_BattlerBase.prototype.reserveCommonState = function(stateId, type) {
        var id = this.isTriggerStateCommon(stateId, type);
        if (id > 0){
            if (subjectIndexVarId) {
                var index = this.index();
                if (this.isEnemy()) index += 1000;
                $gameVariables.setValue(subjectIndexVarId, index);
            }
            $gameTemp.setStackCommonEvent([id,index]);
        }
    };

    Game_BattlerBase.prototype.isTriggerStateCommon = function(stateId, type) {
        var to = this.traitObjects();
        var v = $gameVariables._data;
        for (var i=0,max=to.length;i<max;i++) {
            var sc = DataManager.stateCommonEvent(to[i], stateId, type);
            if (sc) return eval(sc);
        }
        return 0;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __GBattler_removeStatesAuto = Game_Battler.prototype.removeStatesAuto;
    Game_Battler.prototype.removeStatesAuto = function(timing) {
        this._autoRemoveStates = [];
        this.states().forEach(function(state) {
            if (this.isStateExpired(state.id) && state.autoRemovalTiming === timing) {
                this._autoRemoveStates.push(state.id);
            }
        }, this);
        __GBattler_removeStatesAuto.call(this, timing);
        this._autoRemoveStates = [];
    };

    ////////////////////////////////////////////////////////////////////////////////////


}());