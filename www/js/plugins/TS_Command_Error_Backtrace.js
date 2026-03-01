/*:
 * @pluginname Command Error Backtrace
 * @plugindesc Adds an RPG Maker-native stack trace to error messages. (Version 1.0.1)
 *
 * @author Tamschi (tamschi.itch.io)
 *
 * @help
 *
 * ==========
 * Load Order
 * ==========
 *
 * This plugin functions most accurately when placed very late in the load order.
 *
 * ==============
 * Command Syntax
 * ==============
 *
 * This plugin does not add any Plugin Commands.
 *
 * ==============
 * JavaScript API
 * ==============
 *
 * You can set the property TSCommandErrorBacktrace_listName on either the
 * executing Game_Interpreter instance or on the Command list data array
 * itself to provide a custom Command list name for the stack trace.
 * If both are present, the latter takes precedence.
 *
 * When generating, the list name, you can use this snippet to decide whether to
 * include development information in the name:
 *
 * const showNames = ($gameTemp.isPlaytest() ||
 *     PluginManager.parameters('TS_Command_Error_Backtrace')
 *         .showNamesInDeployedGame === "true");
 *
 * ======================
 * Resolved Command Lists
 * ======================
 *
 * Common Event n (<name>)
 * Map n (<name>), Event m (<name>), Page o
 * Troop n (<name>), Page m
 *
 * ===================
 * Compatibility Notes
 * ===================
 *
 * The custom error screen option modifies private RPG Maker functions. As such,
 * the feature may be brittle regarding engine upgrades.
 *
 * Please use caution when upgrading (and please be sure to report any issues, so
 * that I can fix them!).
 *
 * =============
 * License Grant
 * =============
 *
 * This plugin can be downloaded free of charge at
 * https://tamschi.itch.io/command-error-backtrace .
 *
 * Once you have downloaded it from there, you may redistribute and sublicense
 * this plugin file as part of a game. You may not redistribute nor sublicense it
 * separately or as part of an asset- or resource-collection.
 *
 * You may modify this plugin when including it with your game, as long as the
 * attribution above and this license grant stay intact. If you do so, you must
 * add comments to indicate which changes you made from the original.
 *
 * =========
 * Changelog
 * =========
 *
 * -----
 * 1.0.1
 * -----
 *
 * 2022-05-06
 *
 * Fixes:
 * - Added support for Battle Test mode.
 *   (This previously failed due to $dataMap being null.)
 *
 * Revisions:
 * - Log the ignored error as warning when one occurs resolving a Command list.
 *
 * @param customErrorScreen
 * @text Custom Error Screen
 * @type boolean
 * @default true
 * @desc Adjusts the 'Error' screen for easier reading of stack traces, and adds a way to copy the error message.
 * @on ON
 * @off OFF
 *
 * @param showNamesInDeployedGame
 * @text Show names in deployed game?
 * @type boolean
 * @default false
 * @desc Shows (Map, (Common) Event, Troop) names also outside of testing.
 * @on Show names.
 * @off Hide names in deployed game.
*/

(function () {
  'use strict';

  const parameters = { ...PluginManager.parameters('TS_Command_Error_Backtrace') };
  parameters.showNamesInDeployedGame = parameters.showNamesInDeployedGame === "true";
  parameters.customErrorScreen = parameters.customErrorScreen === "true";

  //────────────────────────────────────────────
  // 扩展 Game_Interpreter 的错误附加堆栈信息
  //────────────────────────────────────────────

  //────────────────────────────────────────────
  // 在错误打印区域追加“Version: x.x.x”
  //────────────────────────────────────────────
  function TSCEB_appendVersion(printer) {
    if (!printer || !$dataSystem) return;
    let ver = "0.95";
    // 已插入过就别重复
    if (printer.querySelector('.tsceb-version')) return;

    const p = document.createElement('p');
    let isMobile = "";
    if (Utils.isMobileDevice()) isMobile = "(Android)";
    let match = $dataSystem.gameTitle.match(/ver([\d\.A-Za-z]+)/i);
    if (match) {
      ver = match[1];
    }

    p.className = 'tsceb-version';
    p.style.color = '#ffffff';
    p.style.fontSize = '32px';
    p.style.margin = '8px 0';
    p.textContent = `Current Version: ${ver} ${isMobile}`;
    // 放到第一行错误信息后面、栈追踪前面
    printer.insertBefore(p, printer.children[1] || null);
  }

  function getCurrentScriptForEval(interpreter, index) {
	  const list = Array.isArray(interpreter._list) ? interpreter._list : null;
	  if (!list) return null;

	  let i = index;
	  if (!list[i] || (list[i].code !== 355 && list[i].code !== 655)) return null;

	  while (i > 0 && list[i].code === 655) i--;
	  if (!list[i] || list[i].code !== 355) return null;

	  let script = (list[i].parameters && list[i].parameters[0] ? list[i].parameters[0] : "") + "\n";
	  let j = i + 1;
	  while (list[j] && list[j].code === 655) {
		script += (list[j].parameters && list[j].parameters[0] ? list[j].parameters[0] : "") + "\n";
		j++;
	  }
	  return script;
  }

  const oldUpdateChild = Game_Interpreter.prototype.updateChild;
  Game_Interpreter.prototype.updateChild = function () {
    const index = this._index - 1;
    try {
      return oldUpdateChild.call(this, ...arguments);
    } catch (error) {
      const listId = findListId(this);
      const list = Array.isArray(this._list) ? this._list : null;
      const command = list ? list[index] : null;
      let frame = `\n  at ${listId}, line ${index + 1}`;

      if (command && (command.code === 355 || command.code === 655)) {
        const script = getCurrentScriptForEval(this, index);
        if (script) {
          frame += `\n Eval Script:\n${script}`;
        }
      }

      if (error instanceof Error) {
        error.message += frame;
      } else {
        error = new Error(`${error}${frame}`);
      }
      throw error;
    }
  };

  const oldExecuteCommand = Game_Interpreter.prototype.executeCommand;
  Game_Interpreter.prototype.executeCommand = function () {
    const index = this._index;
    try {
      return oldExecuteCommand.call(this, ...arguments);
    } catch (error) {
      const listId = findListId(this);
      const list = Array.isArray(this._list) ? this._list : null;
	  const command = list ? list[index] : null;
      let frame = `\n  at ${listId}, line ${index + 1}`;

      if (command && (command.code === 355 || command.code === 655)) {
        const script = getCurrentScriptForEval(this, index);
        if (script) {
          frame += `\n Eval Script:\n${script}`;
        }
      }

      if (error instanceof Error) {
        error.message += frame;
      } else {
        error = new Error(`${error}${frame}`);
      }
      throw error;
    }
  };

  /**
   * 根据解释器当前使用的命令列表返回一个简单的来源编号，
   * 不包含地图或公共事件的名称等信息，避免剧透。
   */
  function findListId(interpreter) {
	let unknown = "unknown Command list";
	if (interpreter._sourceMapId && interpreter._sourceeventId) {
		unknown = "sourceMap " + interpreter._sourceMapId + ", sourceEvent " + interpreter._sourceeventId;
		if (interpreter._sourcePageIndex) unknown += ", Page " + (interpreter._sourcePageIndex + 1);
		return unknown;
	}
    try {
      // 尝试通过公共事件匹配
	  const commonEvents = Array.isArray($dataCommonEvents) ? $dataCommonEvents : null;
      if (commonEvents) {
		  for (const ce of commonEvents) {
			if (ce && ce.list === interpreter._list) return "Common Event " + ce.id;
		  }
	  }
      // 如果 $dataMap 存在，则检查地图事件
      if ($dataMap) {
		let errlog = "Map " + $gameMap.mapId() + ", Event " + interpreter._eventId;
		if (interpreter.pageIndex) {
			 return errlog + ", Page " + (interpreter.pageIndex + 1);
		}		  
        for (const event of $dataMap.events.filter(ev => ev)) {
          for (let i = 0; i < event.pages.length; i++) {
            if (event.pages[i].list === interpreter._list) {
              return errlog + ", Page " + (i + 1);
            }
          }
        }
      }
      return unknown;
    } catch (error) {
      console.warn("Error while resolving command list source id:", error);
      return "(failed finding source id)";
    }
  }

})();

/*:
 * - 保持原生错误流程：SceneManager.catchException -> Graphics.printError -> SceneManager.stop()
 * - 错误出现时：屏幕显示“继续游戏”按钮；按 Z / Enter / Space 也可返回（推荐）。
 * - 返回时：隐藏 ErrorPrinter、清滤镜/禁点、仅跳过出错那一条事件指令、短 rAF 拉起循环。
 * - 自动更新优先：若 window.__TSCEB_autoUpdatePending===true，将不响应返回操作。
 */

(function () {
  'use strict';

  const ERROR_THEMES = {
    // 1. 現代霧面玻璃
    modernGlass: {
      background: `linear-gradient(135deg, 
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0.02) 40%,
      rgba(0, 0, 0, 0.3) 100%)`,
      backdropFilter: 'blur(20px) saturate(180%)',
      webkitBackdropFilter: 'blur(20px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      boxShadow: `
      inset 0 0 30px rgba(255, 255, 255, 0.03),
      0 8px 32px rgba(0, 0, 0, 0.3)`,
      color: 'rgba(255, 255, 255, 0.95)'
    },

    // 2. 彩虹光澤
    rainbowGlow: {
      background: `
      linear-gradient(135deg, 
        rgba(120, 119, 198, 0.1) 0%,
        rgba(255, 119, 198, 0.05) 50%,
        rgba(255, 206, 84, 0.05) 100%),
      rgba(20, 20, 30, 0.4)`,
      backdropFilter: 'blur(25px) saturate(200%) brightness(1.1)',
      webkitBackdropFilter: 'blur(25px) saturate(200%) brightness(1.1)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      boxShadow: `
      0 0 40px rgba(120, 119, 198, 0.2),
      0 8px 32px rgba(0, 0, 0, 0.3)`,
      color: 'rgba(255, 255, 255, 0.95)'
    },

    // 3. 暗夜優雅
    darkElegant: {
      background: `
      radial-gradient(ellipse at top, 
        rgba(40, 40, 60, 0.4) 0%,
        rgba(20, 20, 30, 0.6) 100%)`,
      backdropFilter: 'blur(16px) brightness(0.9)',
      webkitBackdropFilter: 'blur(16px) brightness(0.9)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      boxShadow: `
      inset 0 1px 1px rgba(255, 255, 255, 0.05),
      0 8px 24px rgba(0, 0, 0, 0.5)`,
      color: 'rgba(255, 255, 255, 0.9)'
    },

    // 4. 極簡透明
    minimalClear: {
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(30px) saturate(150%)',
      webkitBackdropFilter: 'blur(30px) saturate(150%)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      color: 'rgba(255, 255, 255, 0.95)'
    },

    // 5. 冰霜效果
    frostedIce: {
      background: `
      linear-gradient(135deg,
        rgba(200, 230, 255, 0.08) 0%,
        rgba(150, 200, 255, 0.04) 100%),
      rgba(30, 40, 50, 0.5)`,
      backdropFilter: 'blur(20px) brightness(1.1) saturate(150%)',
      webkitBackdropFilter: 'blur(20px) brightness(1.1) saturate(150%)',
      border: '1px solid rgba(200, 230, 255, 0.15)',
      boxShadow: `
      inset 0 0 20px rgba(200, 230, 255, 0.05),
      0 8px 32px rgba(0, 20, 40, 0.3)`,
      color: 'rgba(240, 248, 255, 0.95)'
    },

    // 6. 紫羅蘭夢境
    violetDream: {
      background: `
      linear-gradient(135deg,
        rgba(138, 43, 226, 0.08) 0%,
        rgba(75, 0, 130, 0.04) 100%),
      rgba(20, 10, 30, 0.5)`,
      backdropFilter: 'blur(22px) saturate(180%)',
      webkitBackdropFilter: 'blur(22px) saturate(180%)',
      border: '1px solid rgba(138, 43, 226, 0.12)',
      boxShadow: `
      inset 0 0 25px rgba(138, 43, 226, 0.03),
      0 12px 36px rgba(20, 0, 40, 0.4)`,
      color: 'rgba(250, 245, 255, 0.95)'
    },

    // 7. 碳纖維
    carbonFiber: {
      background: `
      linear-gradient(45deg,
        rgba(50, 50, 50, 0.6) 25%,
        transparent 25%,
        transparent 75%,
        rgba(50, 50, 50, 0.6) 75%,
        rgba(50, 50, 50, 0.6)),
      linear-gradient(45deg,
        rgba(50, 50, 50, 0.6) 25%,
        transparent 25%,
        transparent 75%,
        rgba(50, 50, 50, 0.6) 75%,
        rgba(50, 50, 50, 0.6)),
      rgba(20, 20, 20, 0.7)`,
      backgroundSize: '10px 10px',
      backgroundPosition: '0 0, 5px 5px',
      backdropFilter: 'blur(15px)',
      webkitBackdropFilter: 'blur(15px)',
      border: '1px solid rgba(100, 100, 100, 0.2)',
      boxShadow: `
      inset 0 0 10px rgba(0, 0, 0, 0.3),
      0 8px 24px rgba(0, 0, 0, 0.5)`,
      color: 'rgba(255, 255, 255, 0.9)'
    },

    // 8. 晨曦漸變
    morningGradient: {
      background: `
      linear-gradient(135deg,
        rgba(255, 183, 94, 0.08) 0%,
        rgba(255, 121, 118, 0.06) 50%,
        rgba(189, 147, 249, 0.04) 100%),
      rgba(30, 30, 40, 0.4)`,
      backdropFilter: 'blur(20px) saturate(170%)',
      webkitBackdropFilter: 'blur(20px) saturate(170%)',
      border: '1px solid rgba(255, 183, 94, 0.1)',
      boxShadow: `
      0 0 30px rgba(255, 183, 94, 0.1),
      0 8px 32px rgba(0, 0, 0, 0.3)`,
      color: 'rgba(255, 252, 245, 0.95)'
    },

    // 9. 北極光
    aurora: {
      background: `
      linear-gradient(135deg,
        rgba(0, 255, 200, 0.06) 0%,
        rgba(0, 200, 255, 0.05) 33%,
        rgba(150, 100, 255, 0.04) 66%,
        rgba(255, 0, 150, 0.03) 100%),
      rgba(10, 20, 30, 0.5)`,
      backdropFilter: 'blur(25px) saturate(200%)',
      webkitBackdropFilter: 'blur(25px) saturate(200%)',
      border: '1px solid rgba(0, 255, 200, 0.08)',
      boxShadow: `
      0 0 50px rgba(0, 255, 200, 0.08),
      0 8px 32px rgba(0, 0, 0, 0.4)`,
      color: 'rgba(230, 255, 250, 0.95)'
    }
  };

  /**
   * @static
   * @method _updateErrorPrinter
   * @private
   */
  // 固定样式
  Graphics._updateErrorPrinter = function () {
    const ep = this._errorPrinter;
    if (!ep) return;

    const TSCEB_ERROR_CSS = `
      opacity: 0;
      position: fixed;
      left: 0; top: 0; right: 0; bottom: 0;
      margin: 0;
      width: 100vw; height: 100vh;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: start;
      min-height: 100vh;
      padding: 2vh 4vw;
      text-align: center;
      text-shadow: 0 2px 8px rgba(0,0,0,0.4);
      font-size: clamp(14px, 2.2vmin, 20px);
      pointer-events: auto;
      overflow-y: auto;
      transform: none; 
      -webkit-transform: none;
      z-index: 99;
    `;

    // 只在第一次写入，避免重复触发布局
    if (ep.__tsceb_cssApplied !== true) {
      ep.style.cssText = TSCEB_ERROR_CSS;
      Object.assign(ep.style, ERROR_THEMES.modernGlass); // 選擇主題

      ep.__tsceb_cssApplied = true;
    }
  };

  // =====================================================================================
  // A) 记录"出错点"的解释器与指令索引
  // =====================================================================================
  if (!window.__TSCEB_trace_hooked) {
    window.__TSCEB_trace_hooked = true;
    const _exec = Game_Interpreter.prototype.executeCommand;
    Game_Interpreter.prototype.executeCommand = function () {
      try {
        return _exec.apply(this, arguments);
      } catch (e) {
        // 记录最近一次的异常现场
        window.__TSCEB_lastFault = {
          interpreter: this,
          listRef: this._list,
          index: this._index
        };
        throw e; // 让引擎按原生流程显示错误 + 停循环
      }
    };
  }

  (function wrapPrintError() {
    let btn = null;

    const _print = Graphics.backupPrintError;
    Graphics.backupPrintError = function (name, message) {

      try {
        _print.apply(this, arguments);

        // 确保可见 & 可交互（某些主题会把错误层置灰/禁点）
        const ep = this._errorPrinter;
        Object.assign(ep.style, {
          opacity: 1,
          pointerEvents: 'auto'
        });

        // 若没有"继续游戏"按钮则补一个
        if (!btn) {
          btn = document.createElement('button');
          btn.className = 'tsceb-btn-continue';
          btn.textContent = (window.systemFeatureText && systemFeatureText.backToGame)
            ? (Array.isArray(systemFeatureText.backToGame) ? systemFeatureText.backToGame[0] : systemFeatureText.backToGame)
            : '▶ 点击继续游戏 / Click to continue the game';

          if (ConfigManager.needsTC && window.cn2tw) {
            btn.textContent = window.cn2tw(btn.textContent);
          }

          // 按鈕樣式
          Object.assign(btn.style, {
            fontSize: 'clamp(14px, 2vmin, 18px)',
            padding: '12px 28px',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            background: `linear-gradient(135deg, 
            rgba(255, 255, 255, 0.15) 0%,
            rgba(255, 255, 255, 0.05) 100%)`,
            backdropFilter: 'blur(10px) saturate(150%)',
            WebkitBackdropFilter: 'blur(10px) saturate(150%)',
            color: 'rgba(255, 255, 255, 0.95)',
            fontWeight: '500',
            cursor: 'pointer',
            touchAction: 'manipulation',
            marginTop: '20px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            minHeight: '48px',
            maxWidth: '100%',
            textAlign: 'center',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: `
              inset 0 1px 1px rgba(255, 255, 255, 0.1),
              0 8px 24px rgba(0, 0, 0, 0.15),
              0 2px 8px rgba(0, 0, 0, 0.1)`,
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
            position: 'relative',
            overflow: 'hidden'
          });

          // 懸停效果
          btn.addEventListener('mouseenter', function () {
            Object.assign(this.style, {
              background: `linear-gradient(135deg, 
              rgba(255, 255, 255, 0.25) 0%,
              rgba(255, 255, 255, 0.12) 100%)`,
              borderColor: 'rgba(255, 255, 255, 0.3)',
              transform: 'translateY(-3px) scale(1.02)',
              boxShadow: `
                inset 0 1px 2px rgba(255, 255, 255, 0.2),
                0 12px 32px rgba(0, 0, 0, 0.2),
                0 4px 12px rgba(0, 0, 0, 0.15)`
            });
          });

          btn.addEventListener('mouseleave', function () {
            Object.assign(this.style, {
              background: `linear-gradient(135deg, 
              rgba(255, 255, 255, 0.15) 0%,
              rgba(255, 255, 255, 0.05) 100%)`,
              borderColor: 'rgba(255, 255, 255, 0.18)',
              transform: 'translateY(0) scale(1)',
              boxShadow: `
                inset 0 1px 1px rgba(255, 255, 255, 0.1),
                0 8px 24px rgba(0, 0, 0, 0.15),
                0 2px 8px rgba(0, 0, 0, 0.1)`
            });
          });

          btn.addEventListener('pointerup', function (e) {
            try { window?.__TSCEB_returnToGameFromError(); } catch { }
          })
        }

        ep.insertBefore(btn, ep.children[2]); // 指定插入第二個子元素下方
      } catch (err) {
        console.warn('[TSCEB] post-printError failed:', err);
      }
    };
  })();

  // =====================================================================================
  // D) 返回游戏：隐藏面板、撤销滤镜/禁点、仅跳过出错指令、短 rAF 拉起循环
  //     —— 不删除 _errorPrinter，保证下次 printError 能正常复用与显示
  // =====================================================================================
  window.__TSCEB_returnToGameFromError ??= function () {
    // 自动更新优先：进行中则不允许返回
    if (window.__TSCEB_autoUpdatePending) { try { navigator.vibrate && navigator.vibrate(10); } catch { } return; }

    try {
	  // 清除滤镜以减少隐患
	  try {
		$gameMap?.clearAllFilters?.();
	  } catch (e) {
		console.warn('[TSCEB] clearAllFilters failed:', e);
	  }		
      // 隐藏错误面板（不要 remove）
      try {
        Graphics._errorShowed = false;
        Object.assign(Graphics._errorPrinter.style, {
          opacity: 0,
          pointerEvents: 'none'
        });
      } catch { }

      Object.assign(Graphics._canvas.style, {
        opacity: 1,
        filter: 'none',
        webkitFilter: 'none',
      });

      SceneManager.resume();
      Graphics._video?.play();

      // 仅跳过"出错的那一条事件指令"
      (function skipOnce() {
        const info = window.__TSCEB_lastFault;
        if (!info || !info.interpreter) return;
        const it = info.interpreter;

        if (!it._list || !Array.isArray(it._list) || it._list.length === 0) return;
        if (info.listRef && info.listRef !== it._list) return; // 事件已切换/结束

        // 终止子解释器（避免卡在旧状态）
        try {
          if (it._childInterpreter) {
            it._childInterpreter.terminate && it._childInterpreter.terminate();
            it._childInterpreter.clear && it._childInterpreter.clear();
            it._childInterpreter = null;
          }
        } catch (_) { }

        const next = Math.min(
          (typeof info.index === 'number' ? info.index + 1 : it._index + 1),
          it._list.length
        );
        it._index = next;

        // 只跳一次，清记录
        window.__TSCEB_lastFault = null;
      })();
    } catch (e) {
      console.warn('[TSCEB] returnToGameFromError failed:', e);
    }
  };
})();