//=============================================================================
// Yanfly Engine Plugins - Event Chase Player
// YEP_EventChasePlayer.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_EventChasePlayer = true;

var Yanfly = Yanfly || {};
Yanfly.ECP = Yanfly.ECP || {};
Yanfly.ECP.version = 1.05;

//=============================================================================
 /*:
 * @plugindesc v1.05 事件追逐
 * @author Yanfly Engine Plugins
 *
 * @param Sight Lock
 * @desc This is the number of frames for how long an event chases
 * the player if 'this._seePlayer = true' is used.
 * @default 300
 *
 * @param See Player
 * @desc Does the event have to be able to see the player by default?
 * NO - false     YES - true
 * @default true
 *
 * @param Alert Timer
 * @desc This is the number of frames that must occur before the
 * alert balloon will show up on the same event.
 * @default 120
 *
 * @param Alert Balloon
 * @desc This is the default balloon used when the player is seen.
 * Refer to balloon ID's.
 * @default 1
 *
 * @param Alert Sound
 * @desc This is the default sound played when the player is seen.
 * @default Attack1
 *
 * @param Alert Common Event
 * @desc The default common event played when the player is seen.
 * Use 0 if you do not wish to use a Common Event.
 * @default 0
 *
 * @param Return After
 * @desc After chasing/fleeing from a player, the event returns
 * to its original spot. NO - false   YES - true
 * @default true
 *
 * @param Return Wait
 * @desc The frames to wait after finishing a chase/flee.
 * @default 180
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * 目前事件只拥有传统乏味的移动行为。他们站在一个地方，追寻你，远离你，随
 * 机移动，或者在一个设定路径行走。这个插件让你的事件可以迅速切换靠近角色
 * 和远离角色.
 * 在你靠近事件范围或者事件看到角色时，这个插件可以让你的事件追寻或者逃离
 * 角色。
 *
 * ============================================================================
 * How to Use
 * ============================================================================
 *
 * 把下面这些脚本语句插入事件移动路线里，让其生效。
 *
 * Note: This doesn’t work with players.注意：这些对角色不生效。
 *
 * Script Call lines
 *  this._chaseRange = x       如果角色距离事件x，事件追逐角色。
 *  this._fleeRange = x        如果角色距离事件x，事件逃离角色。
 *  this._chaseSpeed = x       事件追逐速度
 *  this._fleeSpeed = x        事件逃离速度
 *  this._sightLock = x        事件追逐或者逃离角色时间
 *  this._seePlayer = true     需要事件能够看到角色
 *  this._seePlayer = false    不需要事件能够看到角色
 *  this._alertBalloon = x     当看到角色时弹出对白框
 *  this._alertSound = x       当看到角色时播放音乐
 *  this._alertSoundVol = x    当看到角色时播放音乐的音量
 *  this._alertSoundPitch = x  The pitch used by the alert sound.
 *  this._alertSoundPan = x    The pan used by the alert sound.
 *  this._alertCommonEvent = x 当看到角色时执行公共事件
 *  this._returnAfter = true   Returns the event back to its original spot.
 *  this._returnAfter = false  Event stays where it is when finished chasing.
 *  this._returnWait = x       How long event waits after finishing chase/flee.
 *
 * 这个最适合用来自定义移动路线的速度。记住这个效果需要事件被设置为移动
 * 这意味着载入地图时，如果事件没有被载入命令，这个事件永远不会追逐角色。
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.05:
 * - Optimization update.
 *
 * Version 1.04:
 * - Fixed a bug with this._seePlayer causing them to see stealthed players.
 *
 * Version 1.03:
 * - Improved pathfinding for chasing events. They will get stuck less by walls
 * and/or events that may be blocking the event.
 * - Added random factor for fleeing events. Fleeing events won't simply just
 * run away 180 degrees away from the player. They will sometimes move in a
 * random direction.
 *
 * Version 1.02:
 * - Added 'Return After' parameter where events will return to their original
 * spot after chasing/fleeing from a player.
 * - Added 'Return Wait' parameter to determine how long an event will wait in
 * place before returning after a finished chase/flee.
 * - Added 'this._returnAfter' and 'this._returnWait' to the list of available
 * movement route script calls.
 *
 * Version 1.01:
 * - Added 'this._alertSoundPitch' 'this._alertSoundVol' 'this._alertSoundPan'
 * to the settings you can alter to adjust the alert sound.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_EventChasePlayer');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.ECPSeePlayer = eval(Yanfly.Param.ECPSeePlayer);
Yanfly.Param.ECPAlertTimer = Number(Yanfly.Parameters['Alert Timer']);
Yanfly.Param.ECPAlertBalloon = Number(Yanfly.Parameters['Alert Balloon']);
Yanfly.Param.ECPAlertSound = String(Yanfly.Parameters['Alert Sound']);
Yanfly.Param.ECPAlertEvent = Number(Yanfly.Parameters['Alert Common Event']);
Yanfly.Param.ECPReturn = eval(String(Yanfly.Parameters['Return After']));
Yanfly.Param.ECPReturnWait = Number(Yanfly.Parameters['Return Wait']);

//=============================================================================
// Main Code
//=============================================================================

    // 定义敌人状态常量
    Game_Event.ENEMY_STATE_NORMAL = 0;
    Game_Event.ENEMY_STATE_ALERT = 1;
    Game_Event.ENEMY_STATE_CHASE = 2;
    Game_Event.ENEMY_STATE_FLEE = 3;

Yanfly.ECP.Game_Event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
    Yanfly.ECP.Game_Event_setupPage.call(this);
        this.clearChaseSettings();
};

    Game_Event.prototype.clearChaseSettings = function() {
        this._alertBalloon = 2;
        this._alertCommonEvent = Yanfly.Param.ECPAlertEvent;
        this._alertSound = Yanfly.Param.ECPAlertSound;
        this._alertSoundVol = 70;
        this._alertSoundPitch = 100;
        this._alertSoundPan = 0;
        this._returnAfter = Yanfly.Param.ECPReturn;
        this._returnWait = Yanfly.Param.ECPReturnWait;
        this._returnPhase = false;
        this._returnFrames = 0;
        this._startLocationX = this._realX;
        this._startLocationY = this._realY;
        this._startLocationDir = this._direction;
        this._moveSpeed = this._moveSpeed;
        this._defaultSpeed = this._moveSpeed;
        this._chaseSpeed = this._moveSpeed;
        this._alertSpeed = this._moveSpeed;
        this._moveFrequency = this._moveFrequency;
        this._originalMoveFrequency = this._moveFrequency;
        this._originalChaseRange = this._chaseRange || 0;
        this._enemyState = Game_Event.ENEMY_STATE_NORMAL; // 当前敌人状态
        this._alertTimer = 0; // 警戒状态计时器
        this._canBeAlerted = false; // 是否可以进入警戒状态
        this._alertedOnce = false;  // 用于控制警戒气球只显示一次
        this._shouldAlert = false;  // 标志位，表示是否应该进入警戒状态
        this._chaseRange = this._chaseRange || 0;
        this._fleeRange = this._fleeRange || 0;
    };

    // 当敌人受到攻击时，调用此方法
    Game_Event.prototype.onAttacked = function() {
        this._shouldAlert = true;
    };

Yanfly.ECP.Game_Event_updateSelfMovement =
    Game_Event.prototype.updateSelfMovement;
Game_Event.prototype.updateSelfMovement = function() {
        if (Imported.YEP_StopAllMove && $gameSystem.isEventMoveStopped()) return;

        // 更新敌人状态
        this.updateEnemyState();
		
    if (!this._canBeAlerted) {
        this.updateNormalMovement();
        return;
    }
        // 根据当前状态执行对应的移动逻辑
        switch (this._enemyState) {
            case Game_Event.ENEMY_STATE_NORMAL:
                // 正常状态下的移动
                this.updateNormalMovement();
                break;
            case Game_Event.ENEMY_STATE_ALERT:
                // 警戒状态下的移动
                this.updateAlertMovement();
                break;
            case Game_Event.ENEMY_STATE_CHASE:
                // 追击状态下的移动
                this.updateChaseMovement();
                break;
            case Game_Event.ENEMY_STATE_FLEE:
                // 逃离状态下的移动
                this.updateFleeMovement();
                break;
        }
};

    Game_Event.prototype.updateEnemyState = function() {
		
		    if (!this._canBeAlerted) {
        return;
    }
        switch (this._enemyState) {
            case Game_Event.ENEMY_STATE_NORMAL:
                // 检查是否进入警戒状态
                if (this.shouldEnterAlertState()) {
                    this.enterAlertState();
                } else if (this.canSeePlayer()) {
                    this.enterChaseState();
                }
                break;
            case Game_Event.ENEMY_STATE_ALERT:
                // 检查是否进入追击状态
                if (this.canSeePlayer()) {
                    this.enterChaseState();
                } else if (this._alertTimer <= 0) {
                    this.enterNormalState();
                } else {
                    this._alertTimer--;
                }
                break;
            case Game_Event.ENEMY_STATE_CHASE:
                // 检查是否失去玩家
                if (this.lostPlayer()) {
                    this.enterNormalState();
                } 
                break;
            case Game_Event.ENEMY_STATE_FLEE:
                // 检查是否结束逃离状态
                if (this.shouldExitFleeState()) {
                    this.enterFleeState();
                } else {
					this.enterNormalState();
				}
                break;
        }
    };

    Game_Event.prototype.enterNormalState = function() {
        this._enemyState = Game_Event.ENEMY_STATE_NORMAL;
        this._moveSpeed = this._defaultSpeed;
        this._moveFrequency = this._originalMoveFrequency;
        this._chaseRange = this._originalChaseRange;
        // 重置其他相关变量
        this._alertTimer = 0;
        this._alertedOnce = false;
        this._shouldAlert = false;
        this._returnPhase = true;
        this._returnFrames = this._returnWait;
    };

Game_Event.prototype.enterAlertState = function() {
    if (!this._canBeAlerted) return;
    this._enemyState = Game_Event.ENEMY_STATE_ALERT;
    this._moveSpeed = this._alertSpeed;
    this._moveFrequency = 6; // 最高频率
    if (this._chaseRange < 7) {
        this._chaseRange = 7;
    }
    this._alertTimer = Yanfly.Param.ECPAlertTimer; // 警戒状态持续时间
    if (!this._alertedOnce) {
        this.requestBalloon(2);
		this._alertSound = '';
        this.playAlertSound();
        //this.playAlertCommonEvent();
        this._alertedOnce = true;
    }
    // 重置标志位
    this._shouldAlert = false;
};


    Game_Event.prototype.enterChaseState = function() {
		this.requestBalloon(1);
		this._alertSound = '036myuu_YumeSE_FukidashiBikkuri02';
        this.playAlertSound();
        this._enemyState = Game_Event.ENEMY_STATE_CHASE;
        this._moveSpeed = this._chaseSpeed;
        // 结束警戒状态的效果
        this._alertTimer = 0;
    };

    Game_Event.prototype.enterFleeState = function() {
        this._enemyState = Game_Event.ENEMY_STATE_FLEE;
        this._moveSpeed = this._fleeSpeed;
    };

    Game_Event.prototype.shouldEnterAlertState = function() {
        // 检查是否满足进入警戒状态的条件
        return this._shouldAlert;
    };

    Game_Event.prototype.shouldEnterFleeState = function() {
        // 检查是否满足进入逃离状态的条件
		
	var xx = $gamePlayer.x;
    var	yy = $gamePlayer.y;
	if (this.decoyObject) {	
		xx = this.decoyObject.x;
		yy = this.decoyObject.y;
	}		
		
        var dx = this.deltaXFrom(xx);
        var dy = this.deltaYFrom(yy);
        var dis = Math.hypot(dx, dy);
        if (dis > this._fleeRange) {
			return true;
		  }
		return false;
    };

    Game_Event.prototype.shouldExitFleeState = function() {
        // 检查是否结束逃离状态，回到正常状态
	var xx = $gamePlayer.x;
    var	yy = $gamePlayer.y;
	if (this.decoyObject) {	
		xx = this.decoyObject.x;
		yy = this.decoyObject.y;
	}		
        var fx = Math.abs(this.deltaXFrom(xx));
        var fy = Math.abs(this.deltaYFrom(yy));
		var dis = Math.hypot(fx, fy);
        return dis < this._fleeRange;
    };

    Game_Event.prototype.lostPlayer = function() {
        // 检查是否失去了玩家的踪迹
		
	var xx = $gamePlayer.x;
    var	yy = $gamePlayer.y;
	if (this.decoyObject) {	
		xx = this.decoyObject.x;
		yy = this.decoyObject.y;
	}
    var dx = this.deltaXFrom(xx);
    var dy = this.deltaYFrom(yy);
    var dis = Math.hypot(dx, dy);     
		if (dis > this._fleeRange) {
			this.requestBalloon(7);
			return true;		
		}
        return false;
    };

    Game_Event.prototype.updateNormalMovement = function() {
        // 正常状态下的移动逻辑
        Yanfly.ECP.Game_Event_updateSelfMovement.call(this);
    };

    Game_Event.prototype.updateAlertMovement = function() {
        // 警戒状态下的移动逻辑，例如随机移动
        if (this.canMove()) {
            this.moveRandom();
            this.resetStopCount(); 
        }
    };





Yanfly.ECP.Game_Event_update = Game_Event.prototype.update;
Game_Event.prototype.update = function() {
    Yanfly.ECP.Game_Event_update.call(this);
    //this.updateReturnPhase();
};

Game_Event.prototype.canSeePlayer = function () {


  if ($gamePlayer._opacity < 10) return false;

	var xx = $gamePlayer.x;
    var	yy = $gamePlayer.y;
	if (this.decoyObject) {	
		xx = this.decoyObject.x;
		yy = this.decoyObject.y;
	}

  var dx = this.deltaXFrom(xx);
  var dy = this.deltaYFrom(yy);
  var tileDist = Math.hypot(dx, dy);

  // 走路/潜行降低可视半径
  var corrected = 2;
  if (!ConfigManager.alwaysDash) {
    corrected -= 2;
    if ($gameSwitches.value(145) && $gameParty.leader() && $gameParty.leader().skillMasteryLevel) {
      corrected -= $gameParty.leader().skillMasteryLevel(10);
    }
  }
  var range = Math.max(1, (this._chaseRange || 0) + corrected);

  // “警戒”状态：忽略朝向，但仍判断“是否被遮挡”
  if (this._enemyState === Game_Event.ENEMY_STATE_ALERT) {
    if (tileDist <= range) {
      return Galv.DETECT.losNoFacing($gamePlayer, this); // 只移除朝向，保留阻挡判断
    }
    return false;
  }

  // 普通状态：距离 + Galv 的前方半圆 + 阻挡
  if (tileDist <= range) {
    return Galv.DETECT.los($gamePlayer, this);
  }
  return false;
};

Game_Event.prototype.updateChaseMovement = function() {
	      // 追击状态下的移动逻辑，追踪玩家
        if (this._stopCount > 0) {
			
	var xx = $gamePlayer.x;
    var	yy = $gamePlayer.y;
	if (this.decoyObject) {	
		xx = this.decoyObject.x;
		yy = this.decoyObject.y;
	}			
		 if (Math.random() > 0.9) {
        var direction = this.findDirectionTo(xx, yy);
        if (direction > 0) {
            this.moveStraight(direction);
		 }
       } else {
		const deg = QJ.calculateAngleByTwoPointAngle(this.x, this.y, xx, yy);
        this.dotMoveByDeg(deg); 
       }
	}
	
};

Game_Event.prototype.updateFleeMovement = function() {
    switch (Math.randomInt(6)) {
    case 0: case 1: case 2: case 3: case 4:
      this.moveAwayFromPlayer();
      break;
    case 5:
      this.moveRandom();
      break;
    }
};

Game_Event.prototype.canMove = function() {
    return this._stopCount >= 10;
};

    // 播放警戒状态的声音效果
    Game_Event.prototype.playAlertSound = function() {
        if (this._alertSound === '') return;
        var sound = {
          name:   this._alertSound,
          volume: 30,
          pitch:  Math.randomInt(40) + 81,
          pan:    0
        };
        AudioManager.playSe(sound);
    };

Game_Event.prototype.startReturnPhase = function() {
    if (!this._returnAfter) return;
    this._returnPhase = true;
    this._returnFrames = this._returnWait;
};

/*
    Game_Event.prototype.updateReturnPhase = function() {
        if (this._returnPhase) {
            this._returnFrames--;
            if (this._returnFrames <= 0) {
                this.updateMoveReturnAfter();
            }
        }
    };

    Game_Event.prototype.updateMoveReturnAfter = function() {
        var sx = this._startLocationX;
        var sy = this._startLocationY;

        var direction = this.findDirectionTo(sx, sy);
        if (direction > 0) this.moveStraight(direction);

        if ($gameMap.distance(this._realX, this._realY, sx, sy) < 1) {
            this._returnPhase = false;
            this._returnFrames = 0;
            this._direction = this._startLocationDir;
        }
    };
*/

Game_Event.prototype.activateAlertStatus = function() {
    if (!this._canBeAlerted) return; // 只有在可以警戒的情况下才继续
    if (this._alertEverything || this._chasePlayer) return;
    this._alertEverything = true;
    this._alertLock = 300; // 警戒状态持续时间，可根据需要调整
    this._moveSpeed = this._alertSpeed;
    // 存储原始的移动频率和追击范围（已在 clearChaseSettings 中处理）
    // 设置移动频率为最快
    this._moveFrequency = 6;
    // 调整追击范围
    if (this._chaseRange < 10) {
        this._chaseRange = 10;
    }
    // 警戒气球只显示一次
    if (!this._alertedOnce) {
        this.requestBalloon(2);
        this._alertedOnce = true;
    }
};


Game_Event.prototype.deactivateAlertStatus = function() {
    this._alertEverything = false; 
    this._alertLock = 0; 
    if (!this._chasePlayer) this._moveSpeed = (this._defaultSpeed);
    // 恢复原始的移动频率
    this._moveFrequency = this._originalMoveFrequency;
    // 恢复原始的追击范围
    this._chaseRange = this._originalChaseRange;
    // 重置警戒气球触发状态
    this._alertedOnce = false;
    this._returnPhase = true; // 启动返回原位的阶段
    this._returnFrames = this._returnWait;
};




//=============================================================================
// End of File
//=============================================================================
