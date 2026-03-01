/*:
 * @plugindesc v1.03 TheWorld 砸瓦鲁多
 * @author 流逝的岁月
 *
 * @help
 * ============================================================================
 * 介绍
 * ============================================================================
 *
 *
 *
 * 砸瓦鲁多，网络流行词，出自《JOJO的奇妙冒险：星尘斗士》
 * 是反派迪奥·布兰度（DIO）的替身“The world”（世界）读音的中文空耳。
 * 因为“世界”的能力是将时间停止，因此许多玩梗者会在“时间暂停”的相关元素出现时以这句“砸瓦鲁多”调侃。
 * 每当游戏卡顿、视频加载又或主角呆滞时，都会在屏幕中飘出一连串的“砸瓦鲁多”弹幕。
 *
 *
 *
 *---------------------------------------------------------
 *
 *使用条例：本插件完全免费，随意魔改
 *
 *---------------------------------------------------------
 *
 *
 *
 * 
 *以下是用到的插件命令
 *---------------------Plugin Command--------------------
 *
 * ZzyTWF TheWorld x                                            //这会使游戏世界时间静止x帧
 * ZzyTWF Setup x(true/false)                                   //这会开启/关闭插件功能,关闭后使所有指令失效
 * ZzyTWF CommonId x                                            //使世界事件静止结束后调用的公共事件ID值
 * ZzyTWF IsEventTrigger x(true/false)                          //这将会使事件暂停期间触碰事件是否会执行事件中的内容,x可替换,返回值应为true或false
 * ZzyTWF IsRandomEnemy x(true/false)                           //这将会使暂停期间是否还拥有随机遇敌的功能,x可替换,返回值应为true或false
 * ZzyTWF IsTimerStop x(true/false)                             //这将会使暂停期间计时器计数是否停止,返回值应为true或false
 *
 *
 *
 *以下是可能会用到的一些脚本函数
 *-------------------------Script-----------------------------------------
 *
 * Zzy.TWF.TheWorld(x)                                     //这会使游戏世界时间静止x帧
 * Zzy.TWF.Setup(isEnable)                                 //这会开启/关闭插件功能,关闭后使所有指令失效
 * Zzy.TWF.CommonId(commonId)                              //使世界事件静止结束后调用的公共事件ID值
 * Zzy.TWF.IsEventTrigger(enable)                          //这将会使事件暂停期间触碰事件是否会执行事件中的内容,x可替换,返回值应为true或false
 * Zzy.TWF.IsRandomEnemy(enable)                           //这将会使暂停期间是否还拥有随机遇敌的功能,x可替换,返回值应为true或false
 * Zzy.TWF.IsTimerStop(enable)                             //这将会使暂停期间计时器计数是否停止,返回值应为true或false
 *
 * Zzy.TWF.SurplusTime()                                   //调用脚本的返回值为暂停世界时剩余的帧数,如果未处于世界时间暂停中,则返回-1
 *
 *
 *---------------------------------------------------------------------------
 *
 *
 *
 *
 *
 *
 *
 *以下是一些插件用到的便签信息
 *---------------------Data Case--------------------
 *可以在数据库 角色 职业 技能 物品 武器 护甲 状态 中添加以下内容: 
 *
 * <ZzyTWF TheWorld: x(true/false)>             //这将会使对象是否会受到时间静止的执行效果,x可替换,如果不会则设置为false,默认会是true的效果
 *
 *
 *
 *
 *
 *以下是一些事件用到的便签信息
 *---------------------Event Page--------------------
 * 可以在事件-事件指令-注释 中添加以下内容
 * <ZzyTWF TheWorld: x(true/false)>              //这将会使事件是否会受到时间静止的执行效果,x可替换,如果不会则设置为false,默认会是true的效果
 * <ZzyTWF IsTrigger: x(true/false)>             //这将会使事件暂停期间触碰事件是否会执行事件中的内容,优先级高于插件参数中的设置,x可替换,返回值应为true或false
 *
 *
 *
 *
 *
 *
 *---------------------------------------------------------------------------
 *
 *
 *
 *
 *
 * 我叫坂本：v1.03 拓展脚本函数
 * 我叫坂本：v1.02 兼容旧存档,添加暂停时的事件触发,添加暂停时的随机遇敌
 * 我叫坂本：v1.01 对天气,晃动 效果添加静止
 * 我叫坂本：v1.00 完成插件功能
 *
 *---------------------------------------------------------------------------
 *
 *
 * @param ---设置---
 * @default
 *
 * @param IsSetup
 * @parent ---设置---
 * @text 是否开启插件效果
 * @type boolean
 * @on YES
 * @off NO
 * @desc 开启后插件指令将会声效
 * YES - true     NO - false
 * @default true
 *
 *
 *
 * @param IsEventTrigger
 * @parent ---设置---
 * @text 暂停触碰是否有效果
 * @type boolean
 * @on YES
 * @off NO
 * @desc 暂停期间触碰事件是否会执行事件中的内容,默认值为true
 * YES - true     NO - false
 * @default true
 *
 *
 * @param IsRandomEnemy
 * @parent ---设置---
 * @text 暂停是否随机遇敌
 * @type boolean
 * @on YES
 * @off NO
 * @desc 暂停期间,是否在地图中会随机遇敌,默认值为false
 * YES - true     NO - false
 * @default false
 *
 * @param IsTimerStop
 * @parent ---设置---
 * @text 暂停是否停止计时器
 * @type boolean
 * @on YES
 * @off NO
 * @desc 暂停期间,是否在地图中会暂停计时器,默认值为false
 * YES - true     NO - false
 * @default false
 *
 *
 * @param EndCommonId
 * @text 结束时调用公共事件
 * @parent ---设置---
 * @type Number
 * @desc 这是在调用暂停结束时会调用的公共事件,填写调用的公共事件ID值,填写0则不会调用
 * @default 0
 *
 * @param EndScript
 * @text 结束时调用脚本
 * @parent ---设置---
 * @type note
 * @desc 这是在调用暂停结束时会调用的脚本
 * @default ""
 *
 *
 */


var LiuYue = LiuYue || {};
LiuYue.LiuYue_TheWorld = true;//插件启动


var Zzy = Zzy || {};
Zzy.TWF = Zzy.TWF || {};
Zzy.TWF.version = 1.03;  
Zzy.Parameters = PluginManager.parameters('LiuYue_TheWorld');
Zzy.Param = Zzy.Param || {};

Zzy.Param.TWFIsSetup = eval(String(Zzy.Parameters['IsSetup']));//开启/关闭插件功能
Zzy.Param.TWFEndCommonId = parseInt(Zzy.Parameters['EndCommonId']);//结束时调用公共事件
Zzy.Param.TWFEndScript = new Function(JSON.parse(Zzy.Parameters['EndScript']) + '\nreturn true;');//结束时脚本
Zzy.Param.TWFIsEventTrigger = eval(String(Zzy.Parameters['IsEventTrigger']));//开启/关闭触碰
Zzy.Param.TWFIsRandomEnemy = eval(String(Zzy.Parameters['IsRandomEnemy']));//开启/关闭随机遇敌
Zzy.Param.TWFIsTimerStop = eval(String(Zzy.Parameters['IsTimerStop']));//开启/关闭计时器


//=================================================================
//Game_System
//=================================================================
Zzy.TWF.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() 
{
    Zzy.TWF.Game_System_initialize.call(this);
	this.ZzyTWFInitData();//初始化颜色
};

Game_System.prototype.ZzyTWFInitData = function()
{
	this._ZzyTWFIsSetup = Zzy.Param.TWFIsSetup;
	this._ZzyTWFCommonId = Zzy.Param.TWFEndCommonId;//公共事件ID
	this._ZzyTWFTheWorldTime = 0;
	this._ZzyTWFTheWorlding = false;//暂停时间中
	this._ZzyTWFFrameCount = 0;//暂停的时间
	
	this._ZzyTWFIsEventTrigger = Zzy.Param.TWFIsEventTrigger;
	this._ZzyTWFIsRandomEnemy = Zzy.Param.TWFIsRandomEnemy;
	this._ZzyTWFIsTimerStop = Zzy.Param.TWFIsTimerStop;
	
}

Game_System.prototype.GetZzyTWFIsTimerStop = function()
{
	if(this._ZzyTWFIsTimerStop === undefined)
	{this._ZzyTWFIsTimerStop = Zzy.Param.TWFIsTimerStop;}
	return this._ZzyTWFIsTimerStop;
}

Game_System.prototype.SetZzyTWFIsTimerStop = function(enable)
{
	this._ZzyTWFIsTimerStop = enable;
}

Game_System.prototype.GetZzyTWFIsRandomEnemy = function()
{
	if(this._ZzyTWFIsRandomEnemy === undefined)
	{this._ZzyTWFIsRandomEnemy = Zzy.Param.TWFIsRandomEnemy;}
	return this._ZzyTWFIsRandomEnemy;
}

Game_System.prototype.SetZzyTWFIsRandomEnemy = function(enable)
{
	this._ZzyTWFIsRandomEnemy = enable;
}



Game_System.prototype.GetZzyTWFIsEventTrigger = function()
{
	if(this._ZzyTWFIsEventTrigger === undefined)
	{this._ZzyTWFIsEventTrigger = Zzy.Param.TWFIsEventTrigger;}
	return this._ZzyTWFIsEventTrigger;
}

Game_System.prototype.SetZzyTWFIsEventTrigger = function(enable)
{
	this._ZzyTWFIsEventTrigger = enable;
}



Game_System.prototype.GetZzyTWFCommonId = function()
{
	if(this._ZzyTWFCommonId === undefined)
	{this._ZzyTWFCommonId = Zzy.Param.TWFEndCommonId}
	return this._ZzyTWFCommonId;
}

Game_System.prototype.SetZzyTWFCommonId = function(id)
{
	this._ZzyTWFCommonId = id;
}




Game_System.prototype.setZzyTWFTheWorldTime = function(value)
{
	this._ZzyTWFTheWorldTime = value;
}

Game_System.prototype.getZzyTWFTheWorldTime = function()
{
	if(this._ZzyTWFTheWorldTime === undefined)
	{this._ZzyTWFTheWorldTime = 0}
	return this._ZzyTWFTheWorldTime;
}

Game_System.prototype.getZzyTWFIsSetup = function()//开启插件
{
	return this._ZzyTWFIsSetup;
}

Game_System.prototype.setZzyTWFIsSetup = function(isEnable)
{
	this._ZzyTWFIsSetup = isEnable;
}



Game_System.prototype.getZzyTWFTheWorlding = function()
{
	if(this._ZzyTWFTheWorlding === undefined)
	{this._ZzyTWFTheWorlding = false;}
	return this._ZzyTWFTheWorlding;
}

Game_System.prototype.setZzyTWFTheWorlding = function(isEnable)
{
	this._ZzyTWFTheWorlding = isEnable;
}



Game_System.prototype.IsZzyTWFPartyCantheWorld = function()
{
	var tItems = $gameParty.items();
	for(var i=0;i<tItems.length;i++)//检测队伍是否有道具
	{
		var tItem = tItems[i];
		if(!this.IsZzyTWFCantheWorld(tItem))
		{return false;}
	}
	
	//判断玩家小队是否满足记录
	for(var i=0;i<$gameParty._actors.length;i++)
	{
		var actorId = $gameParty._actors[i];
		var actor = $gameActors.actor(actorId);
		if(!this.IsZzyTWFCantheWorldOfActor(actor))
		{return false;}
	}	
	
	return true;
}




Game_System.prototype.IsZzyTWFCantheWorldOfActor = function(actor)
{
	var tActor = actor.actor();
	
	if(!this.IsZzyTWFCantheWorld(tActor))return false;//角色

	var tClass = $dataClasses[tActor.classId];
	if(!this.IsZzyTWFCantheWorld(tClass))return false;//职业
	
	var tSkills = actor.skills();
	for(var i=0;i<tSkills.length;i++)
	{
		var tSkill = tSkills[i];
		if(!this.IsZzyTWFCantheWorld(tSkill))return false;//技能
	}
	
	var tWeapons = actor.weapons();
	for(var i=0;i<tWeapons.length;i++)
	{
		var tWeapon = tWeapons[i];
		if(!this.IsZzyTWFCantheWorld(tWeapon))return false;//武器
	}	
	
	var tArmors = actor.armors();
	for(var i=0;i<tArmors.length;i++)
	{
		var tArmor = tArmors[i];
		if(!this.IsZzyTWFCantheWorld(tArmor))return false;//护甲
	}	
	
	var tStates = actor.states();
	for(var i=0;i<tStates.length;i++)
	{
		var tState = tStates[i];
		if(!this.IsZzyTWFCantheWorld(tState))return false;//状态
	}		
	
	return true;
	
}

Game_System.prototype.IsZzyTWFCantheWorld = function(obj)
{
	if(obj && obj.zzyTWF && obj.zzyTWF.theWorld !== undefined)
	{
		return obj.zzyTWF.theWorld;
	}
	return true;
}

Game_System.prototype.ZzyTWFRecordTime = function()//记录静止的时间点
{
	if(this._ZzyTWFTheWorlding)return;
	
	this._ZzyTWFFrameCount = Graphics.frameCount;//暂停的时间
	
}

Game_System.prototype.ZzyTWFReadTime = function()
{
	Graphics.frameCount = this._ZzyTWFFrameCount;//读取时间
}




//========================================================================
//SceneManager
//========================================================================
Zzy.TWF.SceneManager_updateMain = SceneManager.updateMain;
SceneManager.updateMain = function() 
{
	
	this.updateZzyTWFtheWorld();
	Zzy.TWF.SceneManager_updateMain.call(this);
};



SceneManager.updateZzyTWFtheWorld = function()
{
	if(!$gameSystem || !$gameSystem.getZzyTWFIsSetup())return false;
	if(!$gameSystem.getZzyTWFTheWorlding())return false;
	
	if($gameSystem._ZzyTWFTheWorldTime > 0)
	{
		$gameSystem._ZzyTWFTheWorldTime--;
	}
	else
	{
		$gameSystem.setZzyTWFTheWorlding(false);
		$gameSystem._ZzyTWFTheWorldTime = 0;
		$gameSystem.ZzyTWFReadTime();//读取之前时间
		
		this.CallZzyTWFAfter();//完成回调
	}
	return true;
}


SceneManager.CallZzyTWFAfter = function()//完成回调
{
	//调用事件
	var id = $gameSystem.GetZzyTWFCommonId();
	if(id)
	{
		$gameTemp.reserveCommonEvent(id);
	}
	//调用脚本
	Zzy.Param.TWFEndScript();
}



//========================================================================
//Game_Interpreter
//========================================================================
Zzy.TWF.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args)//插件命令
{
	Zzy.TWF.Game_Interpreter_pluginCommand.call(this,command,args);

	if(command === 'ZzyTWF')
	{
		this.ZzyTWFCommand(args);
	}
}

Game_Interpreter.prototype.ZzyTWFCommand = function(args)
{
	var command = String(args[0]);

	switch(command)
	{
		case 'Setup':
		var isEnable = eval(String(args[1]));
		Zzy.TWF.Setup(isEnable);
		
		//$gameSystem.setZzyTWFIsSetup(isEnable);
		break;
		
		case 'TheWorld':
		var time = parseInt(args[1]);
		Zzy.TWF.TheWorld(time);
		break;
		
		case 'CommonId':
		var commonId = parseInt(args[1]);
		Zzy.TWF.CommonId(commonId);
		
		//$gameSystem.SetZzyTWFCommonId(commonId);
		break;
		
		case 'IsEventTrigger':
		var enable = eval(String(args[1]));
		Zzy.TWF.IsEventTrigger(enable);
		
		//$gameSystem.SetZzyTWFIsEventTrigger(enable);
		break;
		
		case 'IsRandomEnemy':
		var enable = eval(String(args[1]));
		Zzy.TWF.IsRandomEnemy(enable);
		
		//$gameSystem.SetZzyTWFIsRandomEnemy(enable);
		break;
		
		case 'IsTimerStop':
		var enable = eval(String(args[1]));
		Zzy.TWF.IsTimerStop(enable);
		
		//$gameSystem.SetZzyTWFIsTimerStop(enable);
		break;
	}
}


//================================================================
//DataManager
//================================================================
Zzy.TWF.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function()
{
	if (!Zzy.TWF.DataManager_isDatabaseLoaded.call(this)) return false;
	
	//添加标签内容
	this.ZzyTWFLoadNoteCase1($dataActors);//角色
	this.ZzyTWFLoadNoteCase1($dataClasses);//职业
	this.ZzyTWFLoadNoteCase1($dataSkills);//技能
	this.ZzyTWFLoadNoteCase1($dataItems);//物品
	this.ZzyTWFLoadNoteCase1($dataWeapons);//武器
	this.ZzyTWFLoadNoteCase1($dataArmors);//护甲
	this.ZzyTWFLoadNoteCase1($dataStates);//状态

	return true;
}



DataManager.ZzyTWFLoadNoteCase1 = function(objArr)
{
  for (var i = 1; i < objArr.length; i++) 
  {
    var obj = objArr[i];
    var noteData = obj.note.split(/[\r\n]+/);
	
	obj.zzyTWF = obj.zzyTWF || {};

	for(var j=0;j<noteData.length;j++)
	{
		var lineStr = noteData[j];
		
		if(lineStr.match(/<ZZYTWF THEWORLD:[ ](.*)>/i))//记录情况
		{
			var isEnable = eval(String(RegExp.$1));
			obj.zzyTWF['theWorld'] = isEnable;
		}
	}
  }	
}

//================================================================
//Game_Timer
//================================================================
Zzy.TWF.Game_Timer_update = Game_Timer.prototype.update;
Game_Timer.prototype.update = function(sceneActive) 
{
	if($gameSystem.getZzyTWFIsSetup() && $gameSystem.getZzyTWFTheWorlding() && $gameSystem.GetZzyTWFIsTimerStop())
	{return;}
	Zzy.TWF.Game_Timer_update.call(this,sceneActive);
	
};


//================================================================
//Game_Player
//================================================================
Zzy.TWF.Game_Player_canEncounter = Game_Player.prototype.canEncounter;
Game_Player.prototype.canEncounter = function() 
{
	if($gameSystem.getZzyTWFIsSetup() && $gameSystem.getZzyTWFTheWorlding())
	{
		return $gameSystem.GetZzyTWFIsRandomEnemy();
	}
	return Zzy.TWF.Game_Player_canEncounter.call(this);	
};



//================================================================
//Game_Character
//================================================================
Game_Character.prototype.IsZzyTWFTheWorld = function()//是否可以记录
{
	if(this.zzyTWF && this.zzyTWF.theWorld !== undefined)
	{
		return this.zzyTWF.theWorld;
	}
	return true;
}

Game_Character.prototype.IsZzyTWFTigger = function()
{
	if(this.zzyTWF && this.zzyTWF.isTigger !== undefined)
	{
		return this.zzyTWF.isTigger;
	}
	return $gameSystem.GetZzyTWFIsEventTrigger();
}

Zzy.TWF.Game_Character_turnTowardCharacter = Game_Character.prototype.turnTowardCharacter;
Game_Character.prototype.turnTowardCharacter = function(character) 
{
	if($gameSystem.getZzyTWFIsSetup() && $gameSystem.getZzyTWFTheWorlding())
	{
		if(this.IsZzyTWFTheWorld())
		{return;}
	}
	Zzy.TWF.Game_Character_turnTowardCharacter.call(this,character);
	
};

Zzy.TWF.Game_Character_turnAwayFromCharacter = Game_Character.prototype.turnAwayFromCharacter;
Game_Character.prototype.turnAwayFromCharacter = function(character) 
{
	if($gameSystem.getZzyTWFIsSetup() && $gameSystem.getZzyTWFTheWorlding())
	{
		if(this.IsZzyTWFTheWorld())
		{return;}
	}
	Zzy.TWF.Game_Character_turnAwayFromCharacter.call(this,character);
	
};

//================================================================
//Game_Event
//================================================================
Zzy.TWF.Game_Event_initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function(mapId, eventId) {
    Zzy.TWF.Game_Event_initialize.call(this, mapId, eventId);
    this._IsDisabled = false;
    this._IsDisabledCounter = 0;
};

Zzy.TWF.Game_Event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() //加载事件信息
{
	Zzy.TWF.Game_Event_setupPage.call(this);
	this.ZzyTWFInitData();//调用初始化数据
}

Game_Event.prototype.ZzyTWFInitData = function()
{
	if (!this.page()) return;
	
  var list = this.list();
  var len = list.length;
	
  for (var i = 0; i < len; ++i) 
  {
    var ev = list[i];
	this.zzyTWF = this.zzyTWF || {};
	
    if ([108, 408].contains(ev.code)) 
	{
		
      if(ev.parameters[0].match(/<ZZYTWF THEWORLD:[ ](.*)>/i))//这将会从本事件产生一条引导线,延长至主人公的位置
	  {
			var isEnable = eval(String(RegExp.$1));
			this.zzyTWF['theWorld'] = isEnable;
      }
	  else if(ev.parameters[0].match(/<ZZYTWF ISTRIGGER:[ ](.*)>/i))
	  {
		  var isEnable = eval(String(RegExp.$1));
		  this.zzyTWF['isTigger'] = isEnable;
	  }
	}	
  }

}

Zzy.TWF.Game_Event_update = Game_Event.prototype.update;
Game_Event.prototype.update = function()
{
	
	if($gameSystem.getZzyTWFIsSetup() && $gameSystem.getZzyTWFTheWorlding())
	{
		if(this.IsZzyTWFTheWorld())
		{return;}
	}
	
    if (this._IsDisabledCounter > 0) {
        this._IsDisabled = true;
        this._IsDisabledCounter--;
		
    if ($gameSelfSwitches.value([this._mapId, this._eventId, 'D'])) {
        this._IsDisabledCounter = 0;
        this._IsDisabled = false;
    }		
		
    if (this._IsDisabledCounter === 0) {
            this._IsDisabled = false;
      }
		
    } else {
        this._IsDisabled = false;
    }

    if (this._IsDisabled) {
        return;
    }	
	
	Zzy.TWF.Game_Event_update.call(this);
};


Zzy.TWF.Game_Event_start = Game_Event.prototype.start;
Game_Event.prototype.start = function()
{
	if($gameSystem.getZzyTWFIsSetup() && $gameSystem.getZzyTWFTheWorlding())
	{
		if(!this.IsZzyTWFTigger())
		{return;}
	}
	Zzy.TWF.Game_Event_start.call(this);
}

//========================================================================
//Sprite_Animation
//========================================================================
Zzy.TWF.Sprite_Animation_update = Sprite_Animation.prototype.update;
Sprite_Animation.prototype.update = function() 
{
	if($gameSystem.getZzyTWFIsSetup() && $gameSystem.getZzyTWFTheWorlding())
	{return;}	
	Zzy.TWF.Sprite_Animation_update.call(this);
	
	
};

//========================================================================
//Weather
//========================================================================
Zzy.TWF.Weather_update = Weather.prototype.update;
Weather.prototype.update = function()
{
	if($gameSystem.getZzyTWFIsSetup() && $gameSystem.getZzyTWFTheWorlding())
	{return;}		
	
	Zzy.TWF.Weather_update.call(this);
}

//========================================================================
//Game_Screen
//========================================================================
Zzy.TWF.Game_Screen_updateShake = Game_Screen.prototype.updateShake;
Game_Screen.prototype.updateShake = function() 
{
	if($gameSystem.getZzyTWFIsSetup() && $gameSystem.getZzyTWFTheWorlding())
	{return;}		
	Zzy.TWF.Game_Screen_updateShake.call(this);
};

Zzy.TWF.Game_Screen_updateTone = Game_Screen.prototype.updateTone;
Game_Screen.prototype.updateTone = function() 
{
	if($gameSystem.getZzyTWFIsSetup() && $gameSystem.getZzyTWFTheWorlding())
	{return;}	
	Zzy.TWF.Game_Screen_updateTone.call(this);
};


//========================================================================
//Game_Player
//========================================================================

Zzy.TWF.Game_Player_update = Game_Player.prototype.update;
Game_Player.prototype.update = function(sceneActive)
{
	if($gameSystem.getZzyTWFIsSetup() && $gameSystem.getZzyTWFTheWorlding())
	{
		if($gameSystem.IsZzyTWFPartyCantheWorld())
		{return;}
		
	}
	Zzy.TWF.Game_Player_update.call(this,sceneActive);
}

//========================================================================
//Sprite_Destination
//========================================================================
Zzy.TWF.Sprite_Destination_update = Sprite_Destination.prototype.update;
Sprite_Destination.prototype.update = function() 
{
	if($gameSystem.getZzyTWFIsSetup() && $gameSystem.getZzyTWFTheWorlding())
	{
		if($gameSystem.IsZzyTWFPartyCantheWorld())
		{return;}
	}	
	Zzy.TWF.Sprite_Destination_update.call(this);
	
};


//========================================================================
//Spriteset_Map
//========================================================================
Zzy.TWF.Sprite_Character_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() 
{
    const ev = this._character;
    const off = !!ev && !!ev._perfOffscreen;

    if (off) {
      // 仍然保持位置/透明度等轻量同步
      this.updatePosition();
      this.updateOther();

      // 可见性直接关掉 → 不进渲染队列（真正省）
      this.visible = false;
      return;
    } else {
      this.visible = true;
    }
	Zzy.TWF.Sprite_Character_update.call(this);
};

//========================================================================
//Tilemap
//========================================================================

Zzy.TWF.Tilemap_update = Tilemap.prototype.update;
Tilemap.prototype.update = function() //暂停动态位图
{
	
	Zzy.TWF.Tilemap_update.call(this);
	
	if($gameSystem.getZzyTWFIsSetup() && $gameSystem.getZzyTWFTheWorlding())
	{
		this.animationCount = 0;
	}

};


//========================================================================
//Zzy.TWF.Function
//========================================================================

Zzy.TWF.TheWorldTime = function(value)
{
	if($gameSystem.getZzyTWFIsSetup())
	{
		$gameSystem.ZzyTWFRecordTime();//记录时间
		$gameSystem.setZzyTWFTheWorlding(true);
		$gameSystem.setZzyTWFTheWorldTime(value);
	}
}

Zzy.TWF.SurplusTime = function()//返回剩余时长
{
	if(!$gameSystem.getZzyTWFTheWorlding())return -1;	
	return $gameSystem.getZzyTWFTheWorldTime();
}

Zzy.TWF.Setup = function(isEnable)
{
	$gameSystem.setZzyTWFIsSetup(isEnable);
}

Zzy.TWF.TheWorld = function(value)
{
	Zzy.TWF.TheWorldTime(value);
}


Zzy.TWF.CommonId = function(commonId)
{
	$gameSystem.SetZzyTWFCommonId(commonId);
}

Zzy.TWF.IsEventTrigger = function(enable)
{
	$gameSystem.SetZzyTWFIsEventTrigger(enable);
}

Zzy.TWF.IsRandomEnemy = function(enable)
{
	$gameSystem.SetZzyTWFIsRandomEnemy(enable);
}

Zzy.TWF.IsTimerStop = function(enable)
{
	$gameSystem.SetZzyTWFIsTimerStop(enable);
}

Zzy.TWF.ToTheWorld = function(enable) {
    if ($gameSystem.getZzyTWFIsSetup()) {
        if (enable) {
            // 开始无限时间的暂停效果
            $gameSystem.ZzyTWFRecordTime(); // 记录时间
            $gameSystem.setZzyTWFTheWorlding(true);
            $gameSystem.setZzyTWFTheWorldTime(Infinity); // 设置无限时间
        } else {
            // 恢复正常时间流动
            $gameSystem.setZzyTWFTheWorlding(false);
            $gameSystem.setZzyTWFTheWorldTime(0);
            $gameSystem.ZzyTWFReadTime(); // 读取之前时间
            SceneManager.CallZzyTWFAfter(); // 完成回调
        }
    }
}

SceneManager.updateZzyTWFtheWorld = function() {
    if (!$gameSystem || !$gameSystem.getZzyTWFIsSetup()) return false;
    if (!$gameSystem.getZzyTWFTheWorlding()) return false;

    if ($gameSystem._ZzyTWFTheWorldTime !== Infinity) {
        if ($gameSystem._ZzyTWFTheWorldTime > 0) {
            $gameSystem._ZzyTWFTheWorldTime--;
        } else {
            $gameSystem.setZzyTWFTheWorlding(false);
            $gameSystem._ZzyTWFTheWorldTime = 0;
            $gameSystem.ZzyTWFReadTime(); // 读取时间
            this.CallZzyTWFAfter(); // 完成回调
        }
    }
    return true;
}


