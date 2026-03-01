//=============================================================================
// Drill_SceneEmpty.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        面板 - 全自定义空面板
 * @author Drill_up
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_SceneEmpty +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 一个没有任何内容的空界面。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 * 2.自定义空面板属于菜单面板，可以被菜单背景、菜单魔法圈等插件作用到。
 *   该面板关键字为：Scene_Drill_SEm
 *   更多关键字内容，见 "17.主菜单 > 菜单关键字.docx"。
 * 结构：
 *   (1.插件没有包含任何窗口、贴图。
 *      但是该插件可以被多层背景等插件装饰。
 * 设计：
 *   (1.该插件没有任何窗口、贴图，但是可以被多层背景、多层魔法圈
 *      等插件装饰。还可以作为单纯播放一个菜单GIF的界面。
 *      你也可以用来制作 地图界面中 解谜小游戏 的单纯暂停界面。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 打开全自定义空面板，使用下面的插件指令：
 * （冒号两边都有一个空格）
 *
 * 插件指令：>空面板 : 打开面板
 *
 * -----------------------------------------------------------------------------
 * ----插件性能
 * 测试仪器：   4G 内存，Intel Core i5-2520M CPU 2.5GHz 处理器
 *              Intel(R) HD Graphics 3000 集显 的垃圾笔记本
 *              (笔记本的3dmark综合分：571，鲁大师综合分：48456)
 * 总时段：     20000.00ms左右
 * 对照表：     0.00ms  - 40.00ms （几乎无消耗）
 *              40.00ms - 80.00ms （低消耗）
 *              80.00ms - 120.00ms（中消耗）
 *              120.00ms以上      （高消耗）
 * 工作类型：   持续执行
 * 时间复杂度： o(n^2)*o(场景元素) 每帧
 * 测试方法：   直接进入该信息面板进行测试。
 * 测试结果：   在菜单界面中，基本元素消耗为：【5ms以下】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.该插件为一个界面，在该插件的界面中，地图界面、战斗界面处于完全
 *   暂停状态，所以该界面占用的图形资源、计算资源充足，消耗也低。
 * 3.该界面中的元素数量有限，消耗也上不去。暂无与消耗相关的线性关系量。
 *   （地图的线性关系量：事件，因为50/100/200事件对于消耗影响较大。）
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * 
 *
 * @param ----杂项----
 * @default 
 *
 * @param 是否添加到主菜单
 * @parent ----杂项----
 * @type boolean
 * @on 添加
 * @off 不添加
 * @desc true - 添加，false - 不添加
 * @default false
 *
 * @param 主菜单显示名
 * @parent 是否添加到主菜单
 * @desc 主菜单显示的选项名。
 * @default 空面板
 *
 * @param 是否在标题窗口中显示
 * @parent ----杂项----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true-显示,false-不显示。注意数据存储的位置，如果是正常存储，标题将打开上一存档的数据。没有存档则会报错。
 * @default false
 *
 * @param 标题窗口显示名
 * @parent 是否在标题窗口中显示
 * @desc 标题窗口显示的名称。
 * @default 空面板
 *
 * 
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		SEm（Scene_Empty）
//		临时全局变量	DrillUp.g_SEm_xxx
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n) 每帧
//		★性能测试因素	直接进入信息面板进行测试。
//		★性能测试消耗	1.21ms
//		★最坏情况		无
//		★备注			无
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			->☆提示信息
//			->☆静态数据
//			->☆插件指令
//			
//			->☆主菜单选项
//			->☆标题选项
//			
//			->空面板【Scene_Drill_SEm】
//				->☆原型链规范（Scene_Drill_SEm）
//
//
//		★家谱：
//			无
//		
//		★脚本文档：
//			无
//		
//		★插件私有类：
//			* 空面板【Scene_Drill_SEm】
//		
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.本来想只演示装饰插件的那些效果，但是想想，这个插件存在的意义也不是没有，于是就写了。
//
//		★存在的问题：
//			暂无
//

//=============================================================================
// ** ☆提示信息
//=============================================================================
	//==============================
	// * 提示信息 - 参数
	//==============================
	var DrillUp = DrillUp || {}; 
	DrillUp.g_SEm_PluginTip_curName = "Drill_SceneEmpty.js 面板-全自定义空面板";
	DrillUp.g_SEm_PluginTip_baseList = [];
	
	
//=============================================================================
// ** ☆静态数据
//=============================================================================
	var Imported = Imported || {};
	Imported.Drill_SceneEmpty = true;
	var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_SceneEmpty');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_SEm_add_to_menu = String(DrillUp.parameters['是否添加到主菜单'] || "true") === "true";	
    DrillUp.g_SEm_menu_name = String(DrillUp.parameters['主菜单显示名'] || "");
	DrillUp.g_SEm_add_to_title = String(DrillUp.parameters['是否在标题窗口中显示'] || "false") === "true";	
    DrillUp.g_SEm_title_name = String(DrillUp.parameters['标题窗口显示名'] || "");


//=============================================================================
// ** ☆插件指令
//=============================================================================
//==============================
// * 插件指令 - 指令绑定
//==============================
var _drill_SEm_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function( command, args ){
	_drill_SEm_pluginCommand.call(this, command, args);
	this.drill_SEm_pluginCommand( command, args );
}
//==============================
// * 插件指令 - 指令执行
//==============================
Game_Interpreter.prototype.drill_SEm_pluginCommand = function( command, args ){
	if( command === ">空面板" ){
		
		if(args.length == 2){
			var type = String(args[1]);
			if( type == "打开面板" ){			//打开菜单
				SceneManager.push(Scene_Drill_SEm);
			}
		}
	}
};


//=============================================================================
// ** ☆主菜单选项
//
//			说明：	> 此模块专门关联主菜单选项，选项进入后跳转到 空面板 界面。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
var _drill_SEm_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
	_drill_SEm_createCommandWindow.call(this);
    this._commandWindow.setHandler('Drill_SEm',   this.drill_SEm_menuCommand.bind(this));
};
Scene_Menu.prototype.drill_SEm_menuCommand = function() {
    SceneManager.push(Scene_Drill_SEm);
};
var _drill_SEm_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
	_drill_SEm_addOriginalCommands.call(this);
	if( DrillUp.g_SEm_add_to_menu ){
		this.addCommand(DrillUp.g_SEm_menu_name, 'Drill_SEm', this.areMainCommandsEnabled());
	}
};


//=============================================================================
// ** ☆标题选项
//
//			说明：	> 此模块专门关联标题选项，选项进入后跳转到 空面板 界面。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================	
var _drill_SEm_title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
    _drill_SEm_title_createCommandWindow.call(this);
	this._commandWindow.setHandler('Drill_SEm',  this.drill_SEm_titleCommand.bind(this));
};
Scene_Title.prototype.drill_SEm_titleCommand = function() {
    this._commandWindow.close();
    SceneManager.push(Scene_Drill_SEm);
};
var _drill_SEm_title_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
    _drill_SEm_title_makeCommandList.call(this);
	if( DrillUp.g_SEm_add_to_title ){
		this.addCommand( DrillUp.g_SEm_title_name ,'Drill_SEm');
	}
};	


//=============================================================================
// ** 空面板【Scene_Drill_SEm】
// **
// **		作用域：	菜单界面
// **		主功能：	提供一个空白的面板。
// **		子功能：
// **					->界面重要函数
// **						> 初始化（initialize）
// **						> 创建（create）
// **						> 帧刷新（update）
// **						x> 开始运行（start）
// **						x> 结束运行（stop）
// **						x> 忙碌状态（isBusy）
// **						x> 析构函数（terminate）
// **						x> 判断加载完成（isReady）
// **						x> 判断是否激活/启动（isActive）
// **						x> 当前角色切换时（onActorChange）
// **						x> 创建 - 菜单背景（createBackground）
// **						x> 创建 - 帮助窗口（createHelpWindow）
// **					
// **		界面成员：
// **					无
// **				
// **		说明：	> 暂无。
//=============================================================================
//==============================
// * 空面板 - 定义
//==============================
function Scene_Drill_SEm() {
    this.initialize.apply(this, arguments);
}
Scene_Drill_SEm.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Drill_SEm.prototype.constructor = Scene_Drill_SEm;
//==============================
// * 空面板 - 初始化（继承）
//==============================
Scene_Drill_SEm.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};
//==============================
// * 空面板 - 创建（继承）
//==============================
Scene_Drill_SEm.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
};
//==============================
// * 空面板 - 帧刷新（继承）
//==============================
Scene_Drill_SEm.prototype.update = function() { 
	Scene_MenuBase.prototype.update.call(this);	
	
	this.drill_updateQuit();			//退出
};
//==============================
// * 空面板 - 退出
//==============================
Scene_Drill_SEm.prototype.drill_updateQuit = function() {
	
	// > 按键退出
	if( TouchInput.isCancelled() || Input.isTriggered("cancel") ) {
		SoundManager.playCursor();
		ConfigManager["String2"] = ConfigManager.language;
		SceneManager.pop();
	};
	
};


//=============================================================================
// ** ☆原型链规范（Scene_Drill_SEm）
//
//			说明：	> 此处专门补上缺失的原型链，未缺失的则注释掉。
//					（插件完整的功能目录去看看：功能结构树）
//=============================================================================
//==============================
// * 空面板（场景基类） - 初始化
//==============================
//Scene_Drill_SEm.prototype.initialize = function() {
//    Scene_MenuBase.prototype.initialize.call(this);
//};
//==============================
// * 空面板（场景基类） - 创建
//==============================
//Scene_Drill_SEm.prototype.create = function() {
//    Scene_MenuBase.prototype.create.call(this);
//};
//==============================
// * 空面板（场景基类） - 帧刷新
//==============================
//Scene_Drill_SEm.prototype.update = function() {
//    Scene_MenuBase.prototype.update.call(this);
//};
//==============================
// * 空面板（场景基类） - 开始运行
//==============================
Scene_Drill_SEm.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
};
//==============================
// * 空面板（场景基类） - 结束运行
//==============================
Scene_Drill_SEm.prototype.stop = function() {
    Scene_MenuBase.prototype.stop.call(this);
};
//==============================
// * 空面板（场景基类） - 忙碌状态
//==============================
Scene_Drill_SEm.prototype.isBusy = function() {
	return Scene_MenuBase.prototype.isBusy.call(this);
};
//==============================
// * 空面板（场景基类） - 析构函数
//==============================
Scene_Drill_SEm.prototype.terminate = function() {
    Scene_MenuBase.prototype.terminate.call(this);
};
//==============================
// * 空面板（场景基类） - 判断加载完成
//==============================
Scene_Drill_SEm.prototype.isReady = function() {
	return Scene_MenuBase.prototype.isReady.call(this);
};
//==============================
// * 空面板（场景基类） - 判断是否激活/启动
//==============================
Scene_Drill_SEm.prototype.isActive = function() {
	return Scene_MenuBase.prototype.isActive.call(this);
};

//==============================
// * 空面板（菜单界面基类） - 当前角色切换时
//==============================
Scene_Drill_SEm.prototype.onActorChange = function() {
	Scene_MenuBase.prototype.onActorChange.call(this);
};
//==============================
// * 空面板（菜单界面基类） - 创建 - 菜单背景
//==============================
Scene_Drill_SEm.prototype.createBackground = function() {
	Scene_MenuBase.prototype.createBackground.call(this);
};
//==============================
// * 空面板（菜单界面基类） - 创建 - 帮助窗口
//==============================
Scene_Drill_SEm.prototype.createHelpWindow = function() {
	Scene_MenuBase.prototype.createHelpWindow.call(this);
};





//============================================================================= 
// 在空面板 Scene_Drill_SEm 里添加语言切换按钮，并按官方/志愿者分组
//=============================================================================

(function() {
  'use strict';
  if (typeof Scene_Drill_SEm !== 'function') return;

// =============== 配置：分组 + 样式 ===============
const CFG = {
  style: {
    w: 200, h: 64,
    opa: 160, opaH: 255,
    fontSize: 28, textColor: '#FFFFFF',
    bg1: '#3a3a3a', bg2: '#000000',
    radius: 16, border: 0, borderColor: 'rgba(0,0,0,0.6)'
  },
  sections: {
    official: {
      title: 'Official Translated Languages',
      banner: { x: 36, y: 90, w: 1920, h: 66, textSize: 36 },
      grid:   { startY: 190, cols: 5, gapX: 28, gapY: 120 } // gapX 是按钮间的“空隙”像素
    },
    fan: {
      title: 'Fan Translated Languages',
      banner: { x: 36, y: 300, w: 1920, h: 66, textSize: 36 },
      grid:   { startY: 410, cols: 6, gapX: 24, gapY: 60 }
    }
  },
  // —— 把每个按钮归属到 official / fan 分组 —— //
    buttons: [
	  /*
      {
        section:'official', label: 'MeowMeow', imgSystem: '', fontFace: 'FOT-NewCinemaA Std D', onClick: function(){
          SoundManager.playOk();
          if (ConfigManager.language !== 99) {
			  DataManager.reloadLanguage(true);
              const s = SceneManager._scene;
              if (s && s.qjLockInput) s.qjLockInput();			  
			  setTimeout(() => SceneManager.pop(), 600);
          } else {
			  SoundManager.playBuzzer();  
		  }
		}
      },
	  */
      {
        section:'official', label: '简体中文', imgSystem: '', fontFace: 'Haiyanzhishidongdong', onClick: function(){
          SoundManager.playOk();
          if (DrillUp.g_DFF_fontFace !== 'Haiyanzhishidongdong') {
			  ConfigManager.language = 0;
			  ConfigManager.needsTC  = false;
			  ConfigManager["String2"] = ConfigManager.language;
			  DataManager.reloadLanguage(true);
              const s = SceneManager._scene;
              if (s && s.qjLockInput) s.qjLockInput();			
			  setTimeout(() => SceneManager.pop(), 600);
          } else {
			  SoundManager.playBuzzer();  
		  }
		}
      },
	  
      {
        section:'official', label: '繁體中文', imgSystem: '', fontFace: 'UoqMunThenKhung', onClick: function(){
          SoundManager.playOk();
          if (DrillUp.g_DFF_fontFace !== '未来圆SC') {
			  ConfigManager.language = 0;
			  ConfigManager.needsTC  = true;
			  ConfigManager["String2"] = ConfigManager.language;
			  DataManager.reloadLanguage(true, true);
			  let text =  ["本繁體中文版是用繁化工具從簡體版轉換過來的，",
                           "有些地方可能還沒那麼在地化，",
                           "我們之後的更新會慢慢把文字調整得更自然一點，請多包涵！"];
			  text = text.join('\n');
              alert(text);			
              const s = SceneManager._scene;
              if (s && s.qjLockInput) s.qjLockInput();			
			  setTimeout(() => SceneManager.pop(), 600);
          } else {
			  SoundManager.playBuzzer();  
		  }
		}
      },
	  
      {
        section:'official', label: '日本語', imgSystem: '', fontFace: 'FOT-NewCinemaA Std D', onClick: function(){
          SoundManager.playOk();
          if (ConfigManager.language !== 1) {
			  ConfigManager.language = 1;
			  ConfigManager["String2"] = ConfigManager.language;
			  DataManager.reloadLanguage(true);
              const s = SceneManager._scene;
              if (s && s.qjLockInput) s.qjLockInput();			  
			  setTimeout(() => SceneManager.pop(), 600);
          } else {
			  SoundManager.playBuzzer();  
		  }
		}		  
      },
	  
      {
        section:'official', label: 'English', imgSystem: '', fontFace: 'FOT-NewCinemaA Std D', onClick: function(){
          SoundManager.playOk();
          if (ConfigManager.language !== 2) {
			  ConfigManager.language = 2;
			  ConfigManager["String2"] = ConfigManager.language;
			  DataManager.reloadLanguage(true);
              const s = SceneManager._scene;
              if (s && s.qjLockInput) s.qjLockInput();			  
			  setTimeout(() => SceneManager.pop(), 600);
          } else {
			  SoundManager.playBuzzer();  
		  }
		}
      },
	  
      {
        section:'fan', label: 'Русский', imgSystem: '', fontFace: 'Huninn', onClick: function(){
          SoundManager.playOk();
          if (ConfigManager.language !== 3) {
			  ConfigManager.language = 3;
			  ConfigManager["String2"] = ConfigManager.language;
			  DataManager.reloadLanguage(true);
			  let text =  ["Текущая русская версия игры всё ещё находится в процессе перевода и разработки.",
                           "В ходе этого могут встречаться отсутствующие тексты или баги.",
                           "Пожалуйста, наберитесь терпения и дождитесь следующих обновлений и дополнений.",
						   "Благодарность переводчикам:",
						   "Wanrise",
						   "Huntero"];
			  text = text.join('\n');
              alert(text, { align: "left" });	
              const s = SceneManager._scene;
              if (s && s.qjLockInput) s.qjLockInput();			  
			  setTimeout(() => SceneManager.pop(), 600);
          } else {
			  SoundManager.playBuzzer();  
		  }
		}
      },
	  
      {
        section:'fan', label: 'Français', imgSystem: '', fontFace: 'Huninn', onClick: function(){
          SoundManager.playOk();
          if (ConfigManager.language !== 4) {
			  ConfigManager.language = 4;
			  ConfigManager["String2"] = ConfigManager.language;
			  DataManager.reloadLanguage(true);
			  let text =  ["La version française est encore en cours de traduction et de remplissage du texte. ",
                           "Il se peut donc que des textes manquent ou que des erreurs surviennent pendant le jeu.",
                           "Merci de patienter jusqu’aux prochaines mises à jour !"];
			  text = text.join('\n');
              alert(text, { align: "left" });	
              const s = SceneManager._scene;
              if (s && s.qjLockInput) s.qjLockInput();			  
			  setTimeout(() => SceneManager.pop(), 600);
          } else {
			  SoundManager.playBuzzer();  
		  }
		}
      },
	  
      {
        section:'fan', label: 'Tiếng Việt', imgSystem: '', fontFace: 'Huninn', onClick: function(){
          SoundManager.playOk();
          if (ConfigManager.language !== 5) {
			  ConfigManager.language = 5;
			  ConfigManager["String2"] = ConfigManager.language;
			  DataManager.reloadLanguage(true);
			  let text =  ["Phiên bản tiếng Việt đã được hoàn thành!",
                           "Tuy nhiên, do một số đoạn hội thoại trong trò chơi vẫn chưa được trích xuất đầy đủ bởi nhà phát triển,",
                           "nên trong quá trình chơi có thể tạm thời xuất hiện văn bản tiếng Anh.",
						   "Vui lòng kiên nhẫn chờ các bản cập nhật tiếp theo để được tối ưu hóa hoàn chỉnh hơn!",
						   "Cảm ơn những người đã dịch: ",
						   "Akamine Haruna",
						   "Nian Sprout"];
			  text = text.join('\n');
              alert(text, { width: 480, align: "left" });	
              const s = SceneManager._scene;
              if (s && s.qjLockInput) s.qjLockInput(); 			  
			  setTimeout(() => SceneManager.pop(), 600);
          } else {
			  SoundManager.playBuzzer();  
		  }
		}
      },
	  
      {
        section:'fan', label: 'Español', imgSystem: '', fontFace: 'Huninn', onClick: function(){
          SoundManager.playOk();
          if (ConfigManager.language !== 6) {
			  ConfigManager.language = 6;
			  ConfigManager["String2"] = ConfigManager.language;
			  DataManager.reloadLanguage(true);
			  let text =  ["La traducción a Español aun no está completa, ",
                           "por tanto es posible que algunas secciones del juego no se encuentren apropiadamente traducidas o incluso ocurran ciertos errores durante algunos eventos.",
                           "Arreglaremos estos problemas en nuevas actualizaciones. Muchas gracias por el apoyo!"];
			  text = text.join('\n');
              alert(text, { align: "left" });	
              const s = SceneManager._scene;
              if (s && s.qjLockInput) s.qjLockInput(); 			  
			  setTimeout(() => SceneManager.pop(), 600);
          } else {
			  SoundManager.playBuzzer();  
		  }
		}
      },
	  
      {
        section:'fan', label: 'Português Brasileiro', imgSystem: '', fontFace: 'Huninn', onClick: function(){
          SoundManager.playOk();
          if (ConfigManager.language !== 7) {
			  ConfigManager.language = 7;
			  ConfigManager["String2"] = ConfigManager.language;
			  DataManager.reloadLanguage(true);
			  let text =  ["A versão em português do Brasil ainda está em processo de tradução e inserção de textos.",
                           "Durante o jogo, podem ocorrer erros ou trechos de texto ausentes.",
                           "Agradecemos pela sua paciência enquanto trabalhamos nas próximas atualizações para melhorar a experiência!",
						   "Agradecimento aos tradutores:",
						   "GitHub(@ahwelp)",
						   "Inex",
						   "Eru",
						   "Hyphot",
						   "carlos__abreu"];
			  text = text.join('\n');
              alert(text, { width: 560, align: "left" });		  
              const s = SceneManager._scene;
              if (s && s.qjLockInput) s.qjLockInput(); 			  
			  setTimeout(() => SceneManager.pop(), 600);
          } else {
			  SoundManager.playBuzzer();  
		  }
		}
      },
	  
      {
        section:'fan', label: '한국어', imgSystem: '', fontFace: 'NanumGothic', onClick: function(){
          SoundManager.playOk();
          if (ConfigManager.language !== 8) {
			  ConfigManager.language = 8;
			  ConfigManager["String2"] = ConfigManager.language;
			  DataManager.reloadLanguage(true);
			  let text =  ["한국어 버전은 현재 번역 및 텍스트 보완 작업 중입니다.",
                           "게임 진행 중 일부 문장이 누락되거나 오류가 표시될 수 있습니다.",
                           "추후 업데이트를 기다려 주세요!"];
			  text = text.join('\n');
              alert(text, { align: "left" });	
              const s = SceneManager._scene;
              if (s && s.qjLockInput) s.qjLockInput(); 			  
			  setTimeout(() => SceneManager.pop(), 600);
          } else {
			  SoundManager.playBuzzer();  
		  }
		}
      },
	  
      {
        section:'fan', label: 'Bahasa Indonesia', imgSystem: '', fontFace: 'Huninn', onClick: function(){
          SoundManager.playOk();
          if (ConfigManager.language !== 9) {
			  ConfigManager.language = 9;
			  ConfigManager["String2"] = ConfigManager.language;
			  DataManager.reloadLanguage(true);
			  let text =  ["Karena tim pengembang tidak memahami bahasa Indonesia,",
                           "versi terjemahan ini sepenuhnya dibuat dengan Google Translate.",
                           "Mungkin ada banyak kesalahan pengetikan atau makna yang tidak tepat.",
						   "Kami sangat menyambut para relawan yang ingin membantu memperbaikinya —",
						   "jika kamu tertarik, silakan hubungi kami di Discord!"];
			  text = text.join('\n');
              alert(text, { align: "left" });	
              const s = SceneManager._scene;
              if (s && s.qjLockInput) s.qjLockInput(); 			  
			  setTimeout(() => SceneManager.pop(), 600);
          } else {
			  SoundManager.playBuzzer();  
		  }
		}
      },
      {
        section:'fan', label: 'ภาษาไทย', imgSystem: '', fontFace: 'Huninn', onClick: function(){
          SoundManager.playOk();
          if (ConfigManager.language !== 10) {
			  ConfigManager.language = 10;
			  ConfigManager["String2"] = ConfigManager.language;
			  DataManager.reloadLanguage(true);
			  let text =  ["เนื่องจากทีมพัฒนาไม่เข้าใจภาษาไทย",
                           "เวอร์ชันแปลนี้สร้างขึ้นโดยใช้ Google Translate ทั้งหมด",
                           "อาจมีข้อผิดพลาดในการสะกดหรือความหมายที่ไม่ถูกต้องอยู่หลายจุด",
						   "เรายินดีต้อนรับอาสาสมัครที่ต้องการช่วยปรับปรุงให้ดียิ่งขึ้น —",
						   "หากคุณสนใจ โปรดติดต่อเราทาง Discord!"];
			  text = text.join('\n');
              alert(text, { align: "left" });	
              const s = SceneManager._scene;
              if (s && s.qjLockInput) s.qjLockInput(); 			  
			  setTimeout(() => SceneManager.pop(), 600);
          } else {
			  SoundManager.playBuzzer();  
		  }
		}
      },
      {
        section:'fan', label: 'Український', imgSystem: '', fontFace: 'Huninn', onClick: function(){
          SoundManager.playOk();
          if (ConfigManager.language !== 11) {
			  ConfigManager.language = 11;
			  ConfigManager["String2"] = ConfigManager.language;
			  DataManager.reloadLanguage(true);
			  let text =  ["Поточна українська версія гри все ще знаходиться в процесі перекладу і розробки.",
                           "В ході цього можуть зустрічатися відсутній текст або баги.",
                           "Будь ласка, наберіться терпіння і дочекайтеся наступних оновлень і доповнень.",
						   "Подяка перекладачам:",
               "Henk",
               "Gof_de_Prush",
               "Anka_One_de_Drut"
            ];
			  text = text.join('\n');
              alert(text, { align: "left" });	
              const s = SceneManager._scene;
              if (s && s.qjLockInput) s.qjLockInput();			  
			  setTimeout(() => SceneManager.pop(), 600);
          } else {
			  SoundManager.playBuzzer();  
		  }
		}
      }	  
    ]
};

// =============== 绘制工具 ===============
function _roundPath(ctx, x, y, w, h, r) {
  const rr = Math.max(0, Math.min(r, Math.min(w, h) / 2));
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y,     x + w, y + rr, rr);
  ctx.arcTo(x + w, y + h, x + w - rr, y + h, rr);
  ctx.arcTo(x,     y + h, x,     y + h - rr, rr);
  ctx.arcTo(x,     y,     x + rr, y, rr);
  ctx.closePath();
}

function makeTextButton(label, fontFamily) {
  const S = CFG.style;
  const bmp = new Bitmap(S.w, S.h);
  const hasTM = typeof Bitmap.prototype.gradientFillRoundRect === 'function';
  if (hasTM) {
    bmp.gradientFillRoundRect(0, 0, S.w, S.h, S.radius, S.bg1, S.bg2, false);
  } else {
    const g = bmp._context.createLinearGradient(0, 0, S.w, 0);
    g.addColorStop(0, S.bg1); g.addColorStop(1, S.bg2);
    const ctx = bmp._context;
    ctx.save(); ctx.fillStyle = g; _roundPath(ctx, 0, 0, S.w, S.h, S.radius); ctx.fill(); ctx.restore();
    bmp._setDirty();
  }
  if (CFG.style.border > 0) {
    const ctx = bmp._context;
    ctx.save();
    ctx.strokeStyle = CFG.style.borderColor;
    ctx.lineWidth = CFG.style.border;
    _roundPath(ctx, 0.5, 0.5, S.w - 1, S.h - 1, Math.max(0, S.radius - 0.5));
    ctx.stroke(); ctx.restore(); bmp._setDirty();
  }
  const oldFace = bmp.fontFace, oldSize = bmp.fontSize;
  if (fontFamily) bmp.fontFace = fontFamily;
  bmp.fontSize = CFG.style.fontSize;
  bmp.textColor = CFG.style.textColor;
  bmp.drawText(label, 0, 0, S.w, S.h, 'center');
  bmp.fontFace = oldFace; bmp.fontSize = oldSize;
  return bmp;
}

// =============== 输入锁 ===============
Scene_Drill_SEm.prototype.qjLockInput = function () {
  if (this._qjLocked) return; this._qjLocked = true;
  if (this._qjLangBtns) for (const b of this._qjLangBtns) { b.disabled = true; b.hover = false; if (b.spr) b.spr.opacity = 90; }
  if (!this._qjCover) {
    const bmp = new Bitmap(Graphics.width, Graphics.height); bmp.fillAll('rgba(0,0,0,0)');
    const cover = new Sprite(bmp); cover.anchor.set(0,0); cover.x = 0; cover.y = 0; cover.z = 9999; this.addChild(cover); this._qjCover = cover;
  }
};
Scene_Drill_SEm.prototype.qjUnlockInput = function () {
  if (!this._qjLocked) return; this._qjLocked = false;
  if (this._qjCover && this._qjCover.parent) this.removeChild(this._qjCover); this._qjCover = null;
  if (this._qjLangBtns) for (const b of this._qjLangBtns) { b.disabled = false; if (b.spr) b.spr.opacity = CFG.style.opa; }
};

/* === 工具：横幅与居中排布 === */
function makeBannerSprite(text, x, y, w, h, textSize) {
  const realW = Math.max(32, w|0);
  const realH = Math.max(16, h|0);

  const sp = new Sprite(new Bitmap(realW, realH));
  const b  = sp.bitmap;
  const ctx = b._context;

  // 透明背景
  b.clear();

  // 字体与样式
  const old = {
    size: b.fontSize, face: b.fontFace, color: b.textColor,
    ow: b.outlineWidth, oc: b.outlineColor
  };
  b.fontSize = textSize || 36;
  b.fontFace = "Noto Sans JP Black";
  b.textColor = '#FFFFFF';              // 正文字色
  b.outlineWidth = 0;                   // 外发光
  b.outlineColor = 'rgba(0,0,0,0)';

  // 外发光（使用 Canvas 阴影实现）
  ctx.save();
  ctx.shadowColor = '#f3a64a';         // 发光颜色
  ctx.shadowBlur  = 8;                // 发光强度
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  // 居中绘制：一次即可；若想更亮可绘两次
  b.drawText(text, 0, 0, realW, realH, 'center');

  // 还原上下文与位图状态
  ctx.restore();
  b.fontSize = old.size; b.fontFace = old.face; b.textColor = old.color;
  b.outlineWidth = old.ow; b.outlineColor = old.oc;
  b._setDirty();

  sp.x = x; sp.y = y; sp.opacity = 255;
  return sp;
}



// 让每一行按钮“水平居中”，gapX/gapY 控制间距
function gridCenteredPositions(count, cols, startY, gapX, gapY) {
  const S = CFG.style, W = Graphics.width, HBTN = S.h;
  const pos = []; let i = 0, row = 0;
  while (i < count) {
    const n = Math.min(cols, count - i);                          // 本行个数
    const rowWidth = n * S.w + (n - 1) * gapX;                    // 本行总宽
    const rowStartX = (W - rowWidth) / 2 + S.w / 2;               // 第一个中心点
    for (let c = 0; c < n; c++) {
      pos.push({
        x: rowStartX + c * (S.w + gapX),
        y: startY + row * (HBTN + gapY) + HBTN / 2
      });
      i++;
    }
    row++;
  }
  return pos;
}

// 固定列对齐：所有行共用同一个 rowStartX（按满列数 cols 计算）
function gridFixedColumnsPositions(count, cols, startY, gapX, gapY) {
  const S = CFG.style, W = Graphics.width, HBTN = S.h;
  const baseRowWidth = cols * S.w + (cols - 1) * gapX;           // 满列时的总宽
  const baseStartX   = (W - baseRowWidth) / 2 + S.w / 2;         // 所有行的统一起点
  const pos = [];
  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;
    pos.push({
      x: baseStartX + col * (S.w + gapX),
      y: startY + row * (HBTN + gapY) + HBTN / 2
    });
  }
  return pos;
}

const _qj_sem_create = Scene_Drill_SEm.prototype.create;
Scene_Drill_SEm.prototype.create = function () {
  _qj_sem_create.call(this);
  this._qjLocked = false;
  // 1) 建立按钮层（先建层，再把横幅当“背板”丢进来，避免被外层覆盖）
  this._qjLangBtnLayer = new Sprite();
  this.addChild(this._qjLangBtnLayer);

  const secO = CFG.sections.official;
  const secF = CFG.sections.fan;

  const bannerO = makeBannerSprite(
    secO.title, secO.banner.x, secO.banner.y, secO.banner.w, secO.banner.h, secO.banner.textSize
  );
  const bannerF = makeBannerSprite(
    secF.title, secF.banner.x, secF.banner.y, secF.banner.w, secF.banner.h, secF.banner.textSize
  );

  // 把横幅放在按钮层里，且在底部（先 add 横幅，再 add 按钮，按钮自然在上面）
  this._qjLangBtnLayer.addChild(bannerO);
  this._qjLangBtnLayer.addChild(bannerF);

  this._qjLangBtns = [];

  // 3) 分组
  const ALL = CFG.buttons;
  const OFF = ALL.filter(b => b.section === 'official');
  const FAN = ALL.filter(b => b.section !== 'official');

  // 4) 官方按钮：行内水平居中
  {
    const p = gridCenteredPositions(
      OFF.length, secO.grid.cols, secO.grid.startY, secO.grid.gapX, secO.grid.gapY
    );
    OFF.forEach((btn, i) => {
      const spr = new Sprite();
      spr.anchor.set(0.5, 0.5);
      spr.opacity = CFG.style.opa;
      spr.x = p[i].x; spr.y = p[i].y;
      spr.bitmap = makeTextButton(btn.label, btn.fontFace);
      this._qjLangBtnLayer.addChild(spr);
      this._qjLangBtns.push({ spr, hover:false, onClick:btn.onClick, _hoverTs:0 });
    });
  }

  // 5) 志愿者按钮：行内水平居中
{
  const p = gridFixedColumnsPositions(
    FAN.length, secF.grid.cols, secF.grid.startY, secF.grid.gapX, secF.grid.gapY
  );
  FAN.forEach((btn, i) => {
    const spr = new Sprite();
    spr.anchor.set(0.5, 0.5);
    spr.opacity = CFG.style.opa;
    spr.x = p[i].x; spr.y = p[i].y;
    spr.bitmap = makeTextButton(btn.label, btn.fontFace);
    this._qjLangBtnLayer.addChild(spr);
    this._qjLangBtns.push({ spr, hover:false, onClick:btn.onClick, _hoverTs:0 });
  });
}
};



// =============== 帧更新：悬停高亮 + 点击 ===============
const _update_old = Scene_Drill_SEm.prototype.update;
Scene_Drill_SEm.prototype.update = function() {
  _update_old.call(this);
  if (this._qjLocked) return;
  const mx = TouchInput.x, my = TouchInput.y;

  for (const b of this._qjLangBtns) {
    const w = b.spr.bitmap?.width || 0, h = b.spr.bitmap?.height || 0;
    const x = b.spr.x - w * b.spr.anchor.x;
    const y = b.spr.y - h * b.spr.anchor.y;
    const hover = (mx >= x && mx <= x + w && my >= y && my <= y + h);
    const wasHover = !!b.hover;
    b.hover = hover;
    b.spr.opacity = hover ? CFG.style.opaH : CFG.style.opa;
    if (hover && !wasHover) SoundManager.playCursor();
  }

  if (TouchInput.isTriggered()) {
    for (const b of this._qjLangBtns) {
      if (b.hover) { try { b.onClick.call(this); } catch(e){ console.error(e); } break; }
    }
  }
};


})();
