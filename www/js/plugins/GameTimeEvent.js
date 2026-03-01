/*:
 * @plugindesc [v1.7] 基于游戏内时间的定时事件插件，支持跨天时间计算（兼容 MOG Time System）
 * @author
 *
 * @help
 * 这个插件允许您基于游戏内时间（小时和分钟）来设置定时事件。
 *
 * **功能特点：**
 * - 支持为定时事件添加标识码（key），用于事件的管理和查询。
 * - 可以添加延迟事件（经过一定的游戏内分钟后触发）和定时事件（在特定的时间点触发）。
 * - 支持在事件触发时执行指定的命令（如开关控制、变量操作、执行公共事件、移除状态等）。
 * - 支持添加纯倒计时标记，不执行任何操作，只用于判断时间是否到达。
 * - 提供方法检查事件是否存在、是否已触发、调整等待时间、立即触发事件、获取剩余时间等。
 * - 考虑了天数的变化，确保延迟事件在跨越午夜时能够正确触发。
 * - 兼容 **MOG Time System** 插件，需要在其之后加载。
 *
 * **使用方法：**
 * - 通过脚本调用来添加、移除和管理定时事件。
 *
 * **脚本示例：**
 *
 * 1. **添加延迟事件（经过一定分钟后触发），并指定 key：**
 *    ```javascript
 *    $gameSystem.addGameTimeEvent({
 *        key: 'delayedEvent',
 *        command: 'common',
 *        delayMinutes: 5,
 *        target: 5,
 *        condition: '$gameVariables.value(1) > 10'
 *    });
 *    ```
 *
 * 2. **添加倒计时标记，不执行任何操作：**
 *    ```javascript
 *    $gameSystem.addGameTimeEvent({
 *        key: 'countdownMarker',
 *        delayMinutes: 10
 *    });
 *    ```
 *
 * 3. **检查指定 key 的事件是否存在：**
 *    ```javascript
 *    if ($gameSystem.hasGameTimeEvent('delayedEvent')) {
 *        // 事件存在，执行相关逻辑
 *    }
 *    ```
 *
 * 4. **检查倒计时是否结束：**
 *    ```javascript
 *    var isTriggered = $gameSystem.isTimeEventTriggered('countdownMarker');
 *    if (isTriggered === true) {
 *        // 倒计时已结束，执行相关逻辑
 *    }
 *    ```
 *
 * 5. **调整延迟事件的等待时间：**
 *    - **直接设置新的等待时间：**
 *      ```javascript
 *      $gameSystem.adjustGameTimeEventDelay('delayedEvent', 15); // 设置等待时间为 15 分钟
 *      ```
 *    - **在剩余时间基础上增加 5 分钟：**
 *      ```javascript
 *      $gameSystem.adjustGameTimeEventDelay('delayedEvent', 5, true); // 剩余时间增加 5 分钟
 *      ```
 *
 * 6. **立即触发指定 key 的事件：**
 *    ```javascript
 *    $gameSystem.triggerGameTimeEventNow('delayedEvent');
 *    ```
 *
 * 7. **获取指定事件距离触发的剩余分钟数：**
 *    ```javascript
 *    var remainingMinutes = $gameSystem.getTimeEventRemainingMinutes('delayedEvent');
 *    if (remainingMinutes !== null) {
 *        console.log('事件将在 ' + remainingMinutes + ' 分钟后触发。');
 *    } else {
 *        console.log('未找到指定的事件。');
 *    }
 *    ```
 *
 * **注意：**
 * - `key` 应该是唯一的，用于标识每个定时事件。
 * - 当 `command` 未指定时，事件触发时不执行任何操作，仅更新触发状态，可用于倒计时标记。
 * - 需要确保 **MOG Time System** 插件已经安装并正常运行。
 * - 该插件需要在 **MOG Time System** 插件之后加载。
 */

(function() {
    'use strict';

    //=============================================================================
    // Game_System
    //  定义存储和管理定时事件的方法。
    //=============================================================================

    Game_System.prototype.initializeTimeEvents = function() {
        if (!this._gameTimeEvents) {
            this._gameTimeEvents = [];
        }
    };

    /**
     * 添加定时事件
     * @param {Object} timeEvent 定时事件的配置对象
     * - key: 事件的标识码（字符串或数字），可选
     * - command: 执行的命令，如 'on'、'off'、'add'、'common'、'remove' 等，可选
     * - hour: 触发事件的小时（0-23），可选
     * - minute: 触发事件的分钟（0-59），可选
     * - delayMinutes: 经过的游戏内分钟数（正整数），可选
     * - target: 目标开关、变量、状态或公共事件的 ID，可选
     * - condition: 触发条件，JavaScript 表达式，返回 true 或 false，默认为 'true'
     */
    Game_System.prototype.addGameTimeEvent = function(timeEvent) {
        this.initializeTimeEvents();

        // 设置默认值
        timeEvent.condition = timeEvent.condition || 'true';
        timeEvent.triggered = false;

        if (timeEvent.delayMinutes !== undefined) {
            // 添加延迟事件
            var delayMinutes = parseInt(timeEvent.delayMinutes);
            if (isNaN(delayMinutes)) delayMinutes = 0;
            var currentHour = $gameSystem.hour();
            var currentMinute = $gameSystem.minute();
            var currentDay = $gameSystem.day(); // 获取当前天数

            // 计算触发时间
            var totalMinutes = currentHour * 60 + currentMinute + delayMinutes;
            var extraDays = Math.floor(totalMinutes / 1440);
            var triggerHour = Math.floor(totalMinutes / 60) % 24;
            var triggerMinute = totalMinutes % 60;

            timeEvent.hour = triggerHour;
            timeEvent.minute = triggerMinute;
            timeEvent.isAfter = true; // 标记为延迟事件
            timeEvent.startTime = {
                hour: currentHour,
                minute: currentMinute,
                day: currentDay // 记录开始的天数
            };
            timeEvent.delayMinutes = delayMinutes;
            timeEvent.triggerDay = currentDay + extraDays; // 计算触发的天数

        } else {
            // 添加定时事件
            timeEvent.isAfter = false;
        }

        // 检查 key 是否唯一
        if (timeEvent.key !== undefined) {
            if (this.hasGameTimeEvent(timeEvent.key)) {
                // 已存在相同 key 的事件，移除旧的，添加新的
                this.removeGameTimeEventByKey(timeEvent.key);
            }
        }

        this._gameTimeEvents.push(timeEvent);
    };

    /**
     * 移除定时事件（通过索引）
     * @param {number} index 定时事件的索引
     */
    Game_System.prototype.removeGameTimeEvent = function(index) {
        this.initializeTimeEvents();
        this._gameTimeEvents.splice(index, 1);
    };

    /**
     * 移除定时事件（通过 key）
     * @param {string|number} key 定时事件的标识码
     * @returns {boolean} 成功移除返回 true，未找到返回 false
     */
    Game_System.prototype.removeGameTimeEventByKey = function(key) {
        this.initializeTimeEvents();
        for (var i = this._gameTimeEvents.length - 1; i >= 0; i--) {
            var timeEvent = this._gameTimeEvents[i];
            if (timeEvent.key === key) {
                this._gameTimeEvents.splice(i, 1);
                return true;
            }
        }
        return false;
    };

    /**
     * 检查指定 key 的定时事件是否存在
     * @param {string|number} key 定时事件的标识码
     * @returns {boolean} 存在返回 true，否则返回 false
     */
    Game_System.prototype.hasGameTimeEvent = function(key) {
        this.initializeTimeEvents();
        return this._gameTimeEvents.some(function(timeEvent) {
            return timeEvent.key === key;
        });
    };

    /**
     * 获取指定 key 的定时事件
     * @param {string|number} key 定时事件的标识码
     * @returns {Object|null} 定时事件对象，若不存在则返回 null
     */
    Game_System.prototype.getGameTimeEventByKey = function(key) {
        this.initializeTimeEvents();
        for (var i = 0; i < this._gameTimeEvents.length; i++) {
            var timeEvent = this._gameTimeEvents[i];
            if (timeEvent.key === key) {
                return timeEvent;
            }
        }
        return null;
    };

    /**
     * 调整延迟事件的等待时间
     * @param {string|number} key 定时事件的标识码
     * @param {number} delayMinutes 新的等待时间（分钟）或调整的时间（分钟）
     * @param {boolean} isAdjust 是否在剩余时间基础上调整，默认为 false
     * @returns {boolean} 成功调整返回 true，失败返回 false
     */
    Game_System.prototype.adjustGameTimeEventDelay = function(key, delayMinutes, isAdjust) {
        var timeEvent = this.getGameTimeEventByKey(key);
        if (timeEvent && timeEvent.isAfter) {
            var currentHour = $gameSystem.hour();
            var currentMinute = $gameSystem.minute();
            var currentDay = $gameSystem.day();

            // 计算剩余时间
            var totalCurrentMinutes = currentDay * 1440 + currentHour * 60 + currentMinute;
            var totalStartMinutes = timeEvent.startTime.day * 1440 + timeEvent.startTime.hour * 60 + timeEvent.startTime.minute;
            var elapsedMinutes = totalCurrentMinutes - totalStartMinutes;
            var remainingMinutes = timeEvent.delayMinutes - elapsedMinutes;
            if (isNaN(remainingMinutes)) remainingMinutes = 0;
            if (isAdjust) {
                // 在剩余时间基础上进行调整
                remainingMinutes += delayMinutes;
            } else {
                // 直接设置新的等待时间
                remainingMinutes = delayMinutes;
            }
            if (remainingMinutes <= 0) {
                // 立即触发事件
                this.triggerGameTimeEventNow(key);
                return true;
            }

            // 更新开始时间为当前时间
            timeEvent.startTime = {
                hour: currentHour,
                minute: currentMinute,
                day: currentDay
            };

            // 计算新的触发时间
            var totalMinutes = currentDay * 1440 + currentHour * 60 + currentMinute + remainingMinutes;
            var triggerDay = Math.floor(totalMinutes / 1440);
            var triggerHour = Math.floor((totalMinutes % 1440) / 60);
            var triggerMinute = totalMinutes % 60;

            timeEvent.hour = triggerHour;
            timeEvent.minute = triggerMinute;
            timeEvent.delayMinutes = remainingMinutes;
            timeEvent.triggerDay = triggerDay;
            timeEvent.triggered = false; // 重置触发标记

            return true;
        } else {
            // 未找到指定的延迟事件
            return false;
        }
    };

    /**
     * 立即触发指定 key 的事件
     * @param {string|number} key 定时事件的标识码
     * @returns {boolean} 成功触发返回 true，未找到返回 false
     */
    Game_System.prototype.triggerGameTimeEventNow = function(key) {
        var timeEvent = this.getGameTimeEventByKey(key);
        if (timeEvent) {
            this.executeGameTimeEvent(timeEvent);
            // 对于延迟事件，立即触发后，从列表中移除
            if (timeEvent.isAfter) {
                this.removeGameTimeEventByKey(key);
            } else {
                timeEvent.triggered = true; // 标记为已触发
            }
            return true;
        } else {
            // 未找到指定的事件
            return false;
        }
    };

    /**
     * 检查指定 key 的事件是否已触发
     * @param {string|number} key 定时事件的标识码
     * @returns {boolean|null} 已触发返回 true，未触发返回 false，未找到返回 null
     */
    Game_System.prototype.isTimeEventTriggered = function(key) {
        var timeEvent = this.getGameTimeEventByKey(key);
        if (timeEvent) {
            return !!timeEvent.triggered;
        } else {
            return null; // 未找到指定事件
        }
    };

    /**
     * 获取指定 key 的事件距离触发还剩多少分钟
     * @param {string|number} key 定时事件的标识码
     * @returns {number|null} 剩余分钟数，未找到返回 null，已触发返回 0
     */
    Game_System.prototype.getTimeEventRemainingMinutes = function(key) {
        var timeEvent = this.getGameTimeEventByKey(key);
        if (timeEvent) {
            if (timeEvent.triggered) {
                return -1; // 事件已触发
            }

            var currentHour = $gameSystem.hour();
            var currentMinute = $gameSystem.minute();
            var currentDay = $gameSystem.day();

            var totalCurrentMinutes = currentDay * 1440 + currentHour * 60 + currentMinute;
            var eventDay = timeEvent.triggerDay || currentDay;
            var totalEventMinutes = eventDay * 1440 + timeEvent.hour * 60 + timeEvent.minute;
            var remainingMinutes = totalEventMinutes - totalCurrentMinutes;
            if (isNaN(remainingMinutes)) remainingMinutes = 0;
            if (remainingMinutes < 0) {
                remainingMinutes = 0;
            }

            return remainingMinutes;
        } else {
            return 0; // 未找到指定的事件
        }
    };

    /**
     * 执行定时事件的操作
     * @param {Object} timeEvent 定时事件对象
     */
    Game_System.prototype.executeGameTimeEvent = function(timeEvent) {
        if (eval(timeEvent.condition)) {
            var target = timeEvent.target;
            var charId = timeEvent.charId || 1; // 若未指定 charId，默认使用角色1
 
           if (timeEvent.command) {
                switch (timeEvent.command) {
                    case 'on':
                        $gameSwitches.setValue(target, true);
                        break;
                    case 'off':
                        $gameSwitches.setValue(target, false);
                        break;
                    case 'add':
                        var value = $gameVariables.value(target);
                        $gameVariables.setValue(target, value + 1);
                        break;
                    case 'common':
                        $gameTemp.reserveCommonEvent(target);
                        break;
                    case 'remove':
                        $gameActors.actor(charId).removeState(target);
                        break;
                    case 'script':
                        eval(target);
                        break;						
                    // 可以根据需要添加更多命令
                    default:
                        // 未知的命令，不执行任何操作
                        break;
                }
            }
            // 标记为已触发
            timeEvent.triggered = true;
        }
    };

    /**
     * 列出所有定时事件
     * @returns {Array} 定时事件列表
     */
    Game_System.prototype.listGameTimeEvents = function() {
        this.initializeTimeEvents();
        return this._gameTimeEvents;
    };

    /**
     * 检查并执行定时事件
     */
    Game_System.prototype.checkGameTimeEvents = function() {
        this.initializeTimeEvents();

        var currentHour = $gameSystem.hour();
        var currentMinute = $gameSystem.minute();
        var currentDay = $gameSystem.day();

        var totalCurrentMinutes = currentDay * 1440 + currentHour * 60 + currentMinute;

        // 使用传统的 for 循环，以便在移除事件时不会出错
        for (var i = this._gameTimeEvents.length - 1; i >= 0; i--) {
            var timeEvent = this._gameTimeEvents[i];

            if (timeEvent.triggered) {
                continue; // 已经触发过的事件不再触发
            }

            var eventDay = timeEvent.triggerDay || currentDay;
            var totalEventMinutes = eventDay * 1440 + timeEvent.hour * 60 + timeEvent.minute;
            if (isNaN(totalEventMinutes)) totalEventMinutes = 0;
            if (totalCurrentMinutes >= totalEventMinutes) {
                this.executeGameTimeEvent(timeEvent);

                // 如果是延迟事件，触发后自动移除
                if (timeEvent.isAfter) {
                    this._gameTimeEvents.splice(i, 1);
                } else {
                    timeEvent.triggered = true; // 标记为已触发
                }
            } else {
                timeEvent.triggered = false; // 时间不匹配时，重置触发标记
            }
        }
    };

    //=============================================================================
    // Scene_Map
    //  在每帧更新时检查定时事件。
    //=============================================================================

    var _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        $gameSystem.checkGameTimeEvents();
    };

    //=============================================================================
    // DataManager
    //  存档时保存定时事件数据。
    //=============================================================================

    var _DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        var contents = _DataManager_makeSaveContents.call(this);
        contents.gameTimeEvents = $gameSystem._gameTimeEvents;
        return contents;
    };

    var _DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        _DataManager_extractSaveContents.call(this, contents);
        $gameSystem._gameTimeEvents = contents.gameTimeEvents || [];
    };

})();








