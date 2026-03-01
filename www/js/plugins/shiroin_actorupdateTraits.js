//=============================================================================
 /*:
 * @plugindesc 遍历角色的装备各属性和特性并进行统计
 * @author shiroin
 * @help 通过脚本$gameMap.playerupdateTraits()和$gameMap.enemyupdateTraits()来判定角色和敌人的特殊属性
 * 通过脚本$gameMap.playerstatesEstimate()和$gameMap.enemystatesEstimate()来判定角色和敌人的攻击效果
 * 通过脚本$gameMap.updatestateTurnsforActor(actorId, turns)来更新减少角色身上的状态回合数
 */
//=============================================================================
Game_Map.prototype.playerupdateTraits = function() {
    var actor = $gameActors.actor(1);
    var stateChances = {
        5: 0, // 中毒状态的概率总和
        6: 0, // 出血状态的概率总和
        7: 0, // 打雷状态的概率总和
        8: 0, // 炎上状态的概率总和
        9: 0, // 冰结状态的概率总和
        10: 0, // 饱腹状态的概率总和
		11: 0  // 眩晕状态的概率总和
    };

    var stateToVariableMap = {
        5: 120, // 中毒状态变量ID
        6: 122, // 出血状态变量ID
        7: 123, // 打雷状态变量ID
        8: 124, // 炎上状态变量ID
        9: 125, // 冰结状态变量ID
        10: 126, // 饱腹状态变量ID
		11: 127, // 眩晕状态变量ID
    };

    // 更新装备的特性
    this.playerprocessTraits(actor.equips(), stateChances);

    // 更新状态的特性
    this.playerprocessTraits(actor.states(), stateChances);
	
	for (var stateId in stateChances) {
       if (stateToVariableMap.hasOwnProperty(stateId)) {
       var variableId = stateToVariableMap[stateId];
          $gameVariables.setValue(variableId, stateChances[stateId]);
        }
      }
    };

Game_Map.prototype.playerprocessTraits = function(objects, stateChances) {
    for (var i = 0; i < objects.length; i++) {
        var obj = objects[i];
        if (obj) {
            var traits = obj.traits;
            for (var j = 0; j < traits.length; j++) {
                var trait = traits[j];
                // 处理状态概率特性
                if (trait.code === 32 && stateChances.hasOwnProperty(trait.dataId)) {
                    stateChances[trait.dataId] += 100 * trait.value;
                }
            }
        }
    }
};

Game_Map.prototype.playerstatesEstimate = function() {
            var actorId = 1;
            var targetId = 3;
           this.applyStateWithChance(actorId, targetId, 120, 5);  // 中毒状态判定
           this.applyStateWithChance(actorId, targetId, 122, 6);  // 出血状态判定
           this.applyStateWithChance(actorId, targetId, 123, 7);  // 打雷状态判定
           this.applyStateWithChance(actorId, targetId, 124, 8);  // 炎上状态判定
           this.applyStateWithChance(actorId, targetId, 125, 9);  // 冰结状态判定
           this.applyStateWithChance(actorId, targetId, 126, 10); // 咒杀状态判定
		   this.applyStateWithChance(actorId, targetId, 127, 11); // 咒杀状态判定
    };
	

Game_Map.prototype.applyStateWithChance = function(actorId, targetId, variableId, stateId) {
        var chance = $gameVariables.value(variableId);
        if (chance > 0) {
            var stateRate = $gameActors.actor(targetId).stateRate(stateId);
            var randomChance = Math.random() * 100;
            var totalChance = chance * stateRate;
            if (randomChance < totalChance) {
                $gameActors.actor(targetId).addState(stateId);
                if (stateId === 10 && actorId === 1) {
                    $gameSwitches.setValue(123, true); // 玩家触发咒杀
                } else if (stateId === 10 && actorId === 3) {
					$gameSwitches.setValue(111, true); // 敌人触发咒杀
				}
					
            }
        }
    };
	
Game_Map.prototype.updatestateTurnsforActor = function(actorId, turnsToDecrease) {
    var actor = $gameActors.actor(actorId);
    if (actor) {
        actor.states().forEach(function(state) {
            var currentTurns = actor.stateTurns(state.id);
            var newTurns = Math.max(currentTurns - turnsToDecrease, 0);
            actor.setStateTurns(state.id, newTurns);
            if (newTurns <= 0) {
                actor.removeState(state.id);
            }
        });
    }
	$gameSwitches.setValue(300, true);
};


Game_Map.prototype.getAttackExtraCount = function() {
    var actor = $gameParty.leader();
    var extraAttackCount = 0;

    // 处理装备、状态的特性
    extraAttackCount += this.processAttackExtraTraits(actor.equips());
    extraAttackCount += this.processAttackExtraTraits(actor.states());

    return extraAttackCount;
};

Game_Map.prototype.processAttackExtraTraits = function(objects) {
    var extraAttackCount = 0;
    for (var i = 0; i < objects.length; i++) {
        var obj = objects[i];
        if (obj) {
            var traits = obj.traits;
            for (var j = 0; j < traits.length; j++) {
                var trait = traits[j];
                // 处理【攻击追加次数】特性，假设trait.code为34表示【攻击追加次数】
                if (trait.code === 34) {
                    extraAttackCount += trait.value;
                }
            }
        }
    }
    return extraAttackCount;
};
