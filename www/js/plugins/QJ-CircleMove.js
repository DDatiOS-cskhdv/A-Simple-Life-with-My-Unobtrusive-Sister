//=============================================================================
// RPG Maker MV
//=============================================================================
/*:
 * @plugindesc 添加事件的旋转轨迹
 * @author Qiu Jiu
 *
 *
 * @help
 *
 * this.rotateMove(centerCharacter,initR,radius,speed,force);
 *
 *
 *
*/
//=============================================================================
//
//=============================================================================
Game_Character.prototype.rotateMove = function(centerCharacter,initR,radius,speed,force) {
    //if (this.isMoved()) return;
    if (centerCharacter==-1) centerCharacter = $gamePlayer;
    else if (centerCharacter>0) centerCharacter = $gameMap.event(centerCharacter);
    else return;
    if (this.rotateDegree==undefined) this.rotateDegree = initR*Math.PI/180;
    if (force==undefined) force = true;
    this._x = centerCharacter._realX + radius/48*Math.sin(this.rotateDegree);
    this._y = centerCharacter._realY - radius/48*Math.cos(this.rotateDegree);
    if (force) {
        this._realX = this._x;
        this._realY = this._y;
    }
    this.rotateDegree += speed*Math.PI/180;
};

Game_Character.prototype.familiarMove = function(baseSpeed, needJump) {
	//if (this.isMoved()) return;
	
	if (this._moverData && this._moverData.targetFar > 0) return;
	
	const far = this.calcDistance(-1);
	
	// 距离过远时直接跳跃
	if (far >= 420 && needJump) {
	  if (this.isJumping())	return;
	  let XX = $gamePlayer._x;
      let YY = $gamePlayer._y;	  
	  let condition = DrillUp.g_COFA_condition_list[10];
      let c_area = $gameMap.drill_COFA_getShapePointsWithCondition(Math.floor(XX), Math.floor(YY), "圆形区域", 2, condition);
        if (c_area.length > 0) {	  
		   let p = c_area[Math.floor(Math.random() * c_area.length)];
		   let xPlus = Math.floor(p.x - this._x);
		   let yPlus = Math.floor(p.y - this._y);
           let height = Math.round(60 + (far / 40));
           let time = Math.round(30 + (far / 20));
           this._drill_JSp['enabled'] = true;
           this._drill_JSp['height'] = height;
           this._drill_JSp['time'] = time;
           this._drill_JSp['speed'] = -1;	 		   
		   this.jump(xPlus, yPlus);
		   AudioManager.playSe({ name: "Jump2", volume: 80, pitch: 80 + Math.randomInt(40), pan: 0 });
		   return;
		}		
	}
	
	if (far >= 120) {
		this.changeFollowerSpeed(baseSpeed, far);
		const tempData = this.dotMoveTempData();
	   if (far >= 240) {
           const deg = this.calcDeg($gamePlayer);
           this.dotMoveByDeg(deg);
		   tempData.sameDirectionTotalDpf = 0;
         }
        else if (far >= 360 ) {
		   const dir = this.findDirectionTo($gamePlayer.x, $gamePlayer.y, 6);
           this.mover().moveByDirection(dir, 1);
		   tempData.sameDirectionTotalDpf = 0;
            } else {
            const deg = this.calcDeg($gamePlayer);
            this.dotMoveByDeg(deg);
            if (this.isPrecedingCharacterNearDirection($gamePlayer, deg)) {
                tempData.sameDirectionTotalDpf += this.distancePerFrame();
                if (tempData.sameDirectionTotalDpf >= 1) {
                    this.setDirection($gamePlayer.direction());
                    tempData.sameDirectionTotalDpf = 0;  
                }
            }
            else {
                tempData.sameDirectionTotalDpf = 0;
            }
        }
    }
};

Game_Character.prototype.isPrecedingCharacterNearDirection = function (character, moveDeg) {
        const dir8 = (new Degree(moveDeg)).toDirection8();
        if (dir8 % 2 === 0) {
            if (dir8 === character.direction())
                return true;
        }
        else {
            switch (dir8) {
                case 9:
                    if (character.direction() === 8 || character.direction() === 6)
                        return true;
                    break;
                case 3:
                    if (character.direction() === 6 || character.direction() === 2)
                        return true;
                    break;
                case 1:
                    if (character.direction() === 2 || character.direction() === 4)
                        return true;
                    break;
                case 7:
                    if (character.direction() === 4 || character.direction() === 8)
                        return true;
                    break;
            }
        }
        return false;
    };

    class Degree {
        get value() {
            return this._value;
        }
        static fromDirection(direction) {
            switch (direction) {
                case 8:
                    return Degree.UP;
                case 9:
                    return Degree.UP_RIGHT;
                case 6:
                    return Degree.RIGHT;
                case 3:
                    return Degree.RIGHT_DOWN;
                case 2:
                    return Degree.DOWN;
                case 1:
                    return Degree.DOWN_LEFT;
                case 4:
                    return Degree.LEFT;
                case 7:
                    return Degree.LEFT_UP;
                default:
                    throw new Error(`${direction} is not found`);
            }
        }
        static fromRad(rad) {
            return new Degree((rad * 180 / Math.PI) + 90);
        }
        constructor(...args) {
            this.initialize(...args);
        }
        initialize(value) {
            value %= 360;
            if (value < 0)
                value = 360 + value;
            this._value = value;
        }
        toRad() {
            return (this._value - 90) * Math.PI / 180;
        }
        toDirection8() {
            const t = Math.round(this._value / 45);
            if (t === 0 || t === 8) {
                return 8;
            }
            else if (t === 1) {
                return 9;
            }
            else if (t === 2) {
                return 6;
            }
            else if (t === 3) {
                return 3;
            }
            else if (t === 4) {
                return 2;
            }
            else if (t === 5) {
                return 1;
            }
            else if (t === 6) {
                return 4;
            }
            else if (t === 7) {
                return 7;
            }
            else {
                throw new Error(`${this._value} is not found`);
            }
        }
        toDirection4(lastDirection) {
            const t = Math.round(this._value / 45);
            if (t === 0 || t === 8) {
                return 8;
            }
            else if (t === 1) {
                if (lastDirection === 8)
                    return 8;
                return 6;
            }
            else if (t === 2) {
                return 6;
            }
            else if (t === 3) {
                if (lastDirection === 6)
                    return 6;
                return 2;
            }
            else if (t === 4) {
                return 2;
            }
            else if (t === 5) {
                if (lastDirection === 2)
                    return 2;
                return 4;
            }
            else if (t === 6) {
                return 4;
            }
            else if (t === 7) {
                if (lastDirection === 4)
                    return 4;
                return 8;
            }
            else {
                throw new Error(`${this._value} is not found`);
            }
        }
    }
    Degree.UP = new Degree(0);
    Degree.UP_RIGHT = new Degree(45);
    Degree.RIGHT = new Degree(90);
    Degree.RIGHT_DOWN = new Degree(135);
    Degree.DOWN = new Degree(180);
    Degree.DOWN_LEFT = new Degree(225);
    Degree.LEFT = new Degree(270);
    Degree.LEFT_UP = new Degree(315);
    DotMoveSystem.Degree = Degree;

    Game_Character.prototype.changeFollowerSpeed = function (baseSpeed, precedingCharacterFar) {
        this.setMoveSpeed(this.calcFollowerSpeed(baseSpeed, precedingCharacterFar));
    };
    Game_Character.prototype.calcFollowerSpeed = function (baseSpeed, precedingCharacterFar) {
        if (precedingCharacterFar >= 192) {
            return baseSpeed + 12;
        }
        else if (precedingCharacterFar >= 128) {
            return baseSpeed + 6;
        }
        else if (precedingCharacterFar >= 64) {
            return baseSpeed;
        }
        else if (precedingCharacterFar >= 48) {
            return baseSpeed - 4;
        }
        else {
            return 0;
        }
    };

Game_Map.prototype.checkEventDistances = function(targetId, dis) {
    var targetEvent = this.event(targetId);
    var closeEvents = [];
    this.events().forEach(function(event) {
        // Skip the target event itself
        if (event.eventId() === targetId) {
            return;
        }
        var distance = targetEvent.calcDistance(event.eventId());
        if (distance <= dis) {
            closeEvents.push(event.eventId());
        }
    });
    $gameNumberArray.setValue(33, closeEvents);
};

Game_Map.prototype.KnockBack = function(user, target, distance) {
    // 预处理 user 对象
    if (user === -1) {
        user = $gamePlayer;
    } else if (user > 0) {
        user = $gameMap.event(user);
    }

    // 如果 user 对象不存在，直接返回
    if (!user) {
        return;
    }

    // 预处理 target 对象
    if (target === -1) {
        target = $gamePlayer;
    } else if (target > 0) {
        target = $gameMap.event(target);
    }

    // 如果 target 对象不存在，直接返回
    if (!target) {
        return;
    }

    // 计算 user 和 target 的位置
    let ax = (user._realX + 0.5 - $gameMap.displayX()) * 48;
    let ay = (user._realY + 0.5 - $gameMap.displayY()) * 48;
    let bx = (target._realX + 0.5 - $gameMap.displayX()) * 48;
    let by = (target._realY + 0.5 - $gameMap.displayY()) * 48;

    // 计算角度并执行 KnockBack
    let deg = QJ.calculateAngleByTwoPointAngle(ax, ay, bx, by);
    deg = Math.round((deg * 180) / Math.PI);
    target.smartJumpByDeg(deg, distance, 14, false);
};


//=============================================================================
//
//=============================================================================