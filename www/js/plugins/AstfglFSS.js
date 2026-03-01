//=============================================================================
// AstfglFSS
// by Astfgl
// Date: 19/10/2016  
// Free to use both commercial and non commercial. Credits not required.
// Free to edit and redistribute as long as it is on the same terms of use.
// 19/10/2016 revision: proper aliasing of the original function
// 19/10/2016 revision 2: Yanfly passive states compatibily
// 19/10/2016 revision 3: modified to apply to enemies as well
// 19/10/2016 revision 4: release version, help updated.
// 24/11/2016 revision 5: modified function to allow to refer to the user's params.
//=============================================================================
 

/*:
 * @plugindesc 通过状态注释固定提升人物的基本属性和加成系数，需要前置插件：YEP_BaseParamControl。和YEP_AutoPassiveStates兼容
 * @author Astfgl
 * @help 
 * 基于YEP_BaseParamControl的默认属性公式(base + plus) * paramRate * buffRate + flat进行扩展修改
 * 允许通过状态注释对flat值进行变数加成，此加成不受到BUFF或特性-通常能力值百分比加成的影响，含有注释的状态消失后加成才消失
 * 
 * 状态注释类型: mhpB, mmpB, atkB, defB, mdfB, matB, agiB and lukB
 * 你可以使用v(n)来调用ID:n的变量值为指定属性
 * 案例:
 * <mhpB: 100> 拥有此注释的状态会为人物增加固定100点的最大MP;
 * <atkB: 10* v(1) + 5> 拥有此注释的状态会为人物增加5点固定值+10倍1号变量值的攻击力.
 * <hpB: user.mp> 拥有此注释的状态会为人物增加当前MP值的生命值.
 * 可以在注释栏中输入javascript片段进行运算取值.
 * 【警告：不能写类似于<atkB: 0.2 * user.atk>的循环嵌套注释，这只会无限触发属性增长导致报错，需要属性百分比成长请使用RPG maker原生功能】 
 * 
 * 额外补充：
 * 追加了状态注释类型：mhpRB, mmpRB, atkRB, defRB, mdfRB, matRB, agiRB and lukRB
 * 新注释修改的是paramRate，和特性-通常能力值百分比加成互相兼容但是加算而非乘算的关系，目的是提供一种新的战斗数值平衡手段
 * 
 * 案例:
 * <atkRB: 0.5> 拥有此注释的状态会为人物额外增加0.5倍攻击力，如果人物已经拥有通常能力值-攻击力X150%的特性，实际加成会衰减为1.3倍而不是1.5倍;
 */
 (function() {
 
	var parameters = PluginManager.parameters('AstfglFSS');
	
    var _Astfgl_newBBPP_flat = Game_Battler.prototype.paramFlat;
    Game_Battler.prototype.paramFlat = function(paramId) {
        if (!this._passiveStatesRaw) { this._passiveStatesRaw = []; }
        var value = _Astfgl_newBBPP_flat.call(this, paramId);
        value += getBonusFlat(paramId, this._states, this);
        value += getBonusFlat(paramId, this._passiveStatesRaw, this);
        return value;
    };
    
    var getBonusFlat = function(paramId, states, battler) {
		var user = battler;
		var value = 0;
		var v = function(id) {
			return $gameVariables.value(id)
		}
		
		for (var i = 0; i < states.length; i++) {
			var data = $dataStates[states[i]];
			switch (paramId) {
				case 0:
					if (data.meta.mhpB) {value += eval(data.meta.mhpB)};
					break;
				case 1:
					if (data.meta.mmpB) {value += eval(data.meta.mmpB)};
					break;
				case 2:
					if (data.meta.atkB) {value += eval(data.meta.atkB)};
					break;
				case 3:
					if (data.meta.defB) {value += eval(data.meta.defB)};
					break;
				case 4:
					if (data.meta.matB) {value += eval(data.meta.matB)};
					break;
				case 5:
					if (data.meta.mdfB) {value += eval(data.meta.mdfB)};
					break;
				case 6:
					if (data.meta.agiB) {value += eval(data.meta.agiB)};
					break;
				case 7:
					if (data.meta.lukB) {value += eval(data.meta.lukB)};
					break;
				default:
					break;	
			}
		}
		return value
	}
	
    var _Astfgl_newBBPP_rate = Game_Battler.prototype.paramRate;
    Game_Battler.prototype.paramRate = function(paramId) {
        if (!this._passiveStatesRaw) { this._passiveStatesRaw = []; }
        var value = _Astfgl_newBBPP_rate.call(this, paramId);
        value += getBonusRate(paramId, this._states, this);
        value += getBonusRate(paramId, this._passiveStatesRaw, this);
        return value;
    };
    
    var getBonusRate = function(paramId, states, battler) {
		var user = battler;
		var value = 0;
		var v = function(id) {
			return $gameVariables.value(id)
		}
		
		for (var i = 0; i < states.length; i++) {
			var data = $dataStates[states[i]];
			switch (paramId) {
				case 0:
					if (data.meta.mhpRB) {value += eval(data.meta.mhpRB)};
					break;
				case 1:
					if (data.meta.mmpRB) {value += eval(data.meta.mmpRB)};
					break;
				case 2:
					if (data.meta.atkRB) {value += eval(data.meta.atkRB)};
					break;
				case 3:
					if (data.meta.defRB) {value += eval(data.meta.defRB)};
					break;
				case 4:
					if (data.meta.matRB) {value += eval(data.meta.matRB)};
					break;
				case 5:
					if (data.meta.mdfRB) {value += eval(data.meta.mdfRB)};
					break;
				case 6:
					if (data.meta.agiRB) {value += eval(data.meta.agiRB)};
					break;
				case 7:
					if (data.meta.lukRB) {value += eval(data.meta.lukRB)};
					break;
				default:
					break;	
			}
		}
		return value
	}
	
 })();