/*:
 * @plugindesc 为事件增加独立变量，工作原理类似独立开关。
 * <Iavra Self Variables>
 * @author Iavra
 *
 * @param Container Name
 * @desc 脚本调用独立变量的命名. 默认为: $gameSelfVariables
 * @default $gameSelfVariables
 *
 * @param Plugin Command
 * @desc 插件指令调用独立变量的命名，不能识别空格. 默认为: SelfVariable
 * @default SelfVariable
 *
 * @help
 * 为事件增加独立变量，工作原理类似独立开关。
 * 独立变量通过地图ID、事件ID和一个关键词（关键词不能包含空格）进行唯一识别。
 * 帮助文档里出现的脚本名或插件命令格式都采取默认的参数，请根据自己实际使用的格式进行适当修改。
 * mapId：事件所在的地图ID 
 * eventId：独立变量对应的事件ID 
 * key：独立变量的关键词命名（不能包含空格）
 * value：独立变量对应的值
 * 
 * 通过脚本的形式获取或改变独立变量的值：
 * $gameSelfVariables.setValue([mapId, eventId, key], value);
 * $gameSelfVariables.value([mapId, eventId, key]);
 *
 * 如果是想要获取或改变当前事件的独立变量，你可以使用以下格式的脚本：
 * $gameSelfVariables.get(this, key);
 * $gameSelfVariables.set(this, key, value);
 *
 * 独立变量也可以通过插件指令进行改变，你可以进行以下运算：
 * =   为独立变量代入一个值
 * +   对独立变量进行加法运算
 * -   对独立变量进行减法运算
 * /   对独立变量进行除法运算
 * *   对独立变量进行乘法运算
 * %   将独立变量除以操作数的余数保存进变量里（即取模）
 *
 * 要应用这些运算方式，你可以使用以下格式的插件指令（将operation替换为需要的运算符号）：
 *
 * SelfVariable key operation value             // 使用常量值并应用指定的运算方式
 * SelfVariable key operation v[value]          // 使用指定的普通变量并应用指定的运算方式
 * SelfVariable key operation self[value]       // 使用指定的独立变量并应用指定的运算方式
 * SelfVariable key operation (value1 ~ value2) // 在一个区间内取一个随机数并应用指定的运算方式
 * SelfVariable key operation "value"           // 先将文本内的JS代码运算求值再应用指定的运算方式（即脚本的用法）
 *
 * 还有延伸的插件指令：
 *
 * SelfVariable key abs                         // 令独立变量的值变为绝对值
 */

var Imported = Imported || {};
Imported.iavra_self_variables = true;

//=============================================================================
// namespace IAVRA
//=============================================================================

(function() {
    "use strict";
    
    /**
     * Plugin parameters are loaded without using the PluginManager, since it relies on the actual filename.
     */
    var _params = $plugins.filter(function(p) { return p.description.contains('<Iavra Self Variables>'); })[0].parameters;
    var _containerName = _params['Container Name'];
    var _pluginCommand = _params['Plugin Command'];
    
    /**
     * Validate plugin parameters.
     */
    if(!_containerName) { throw new Error('container name can\'t be empty'); }
    if(!_pluginCommand || /\s/.test(_pluginCommand)) { throw new Error('plugin command can\'t be empty or contain whitespaces'); }
    
    /**
     * Basic operations, that can be used.
     */
    var _operations = {
        '=': function(cur, val) { return _parseInt(val); }, 
        '+': function(cur, val) { return cur + _parseInt(val); },
        '-': function(cur, val) { return cur - _parseInt(val); },
        '/': function(cur, val) { return cur / _parseInt(val); },
        '*': function(cur, val) { return cur * _parseInt(val); },
        '%': function(cur, val) { return cur % _parseInt(val); }
    };
    
    /**
     * A list of all operations. "-" is escaped, because otherwise it will be recognized as a special character in regexes.
     */
    var _opKeys = "=+\\-/*%";
    
    /**
     * Regexes matching all plugin commands, that can be used.
     */
    var _regex = {
        // SelfVariable <key> <operation> <value>
        modifyDirect: new RegExp('^([' + _opKeys + ']) ([+-]?\\d+)$'),
        // SelfVariable <key> <operation> v[<variableId>]
        modifyVariable: new RegExp('^([' + _opKeys + ']) [vV]\\[(\\d+)\\]$'),
        // SelfVariable <key> <operation> self[<selfVariableId>]
        modifySelfVariable: new RegExp('^([' + _opKeys + ']) self\\[(.+)\\]$', 'i'),
        // SelfVariable <key> <operation> (<min> ~ <max>)
        modifyRandom: new RegExp('^([' + _opKeys + ']) \\(([+-]?\\d+) ~ ([+-]?\\d+)\\)$'),
        // SelfVariable <key> <operation> "<script>"
        modifyScript: new RegExp('^([' + _opKeys + ']) "(.*)"$'),
        // SelfVariable <key> abs
        abs: /^abs$/i
    };
    
    /**
     * Tests all regexes given above. If one of them matches, the self variable is set to its new value and the function returns.
     */
    var _handleCommand = function(key, cmd) {
        var t = _testWithCallback, o = _operations, g = window[_containerName], c = g.value(key);
        // Modify self variable directly with the given value.
        if(t(cmd, _regex.modifyDirect, function(m) { g.setValue(key, o[m[1]](c, m[2])); })) { return; }
        // Modify self variable with the value of a given game variable.
        if(t(cmd, _regex.modifyVariable, function(m) { g.setValue(key, o[m[1]](c, $gameVariables.value(m[2]))); })) { return; }
        // Modify self variable with the value of a given self variable.
        if(t(cmd, _regex.modifySelfVariable, function(m) { g.setValue(key, o[m[1]](c, g.value([key[0], key[1], m[2]]))); })) { return; }
        // Modify self variable with a random number between 2 given values.
        if(t(cmd, _regex.modifyRandom, function(m) { g.setValue(key, o[m[1]](c, _randomInt(m[2], m[3]))); })) { return; }
        // Modify self variable with the result of a given script.
        if(t(cmd, _regex.modifyScript, function(m) { g.setValue(key, o[m[1]](c, _parseInt(eval(m[2])))); })) { return; }
        // Sets self variable to its absolute value (3 -> 3, -3 -> 3).
        if(t(cmd, _regex.abs, function(m) { g.setValue(key, Math.abs(c)); })) { return; }
    };
    
    /**
     * If the given string matches the given regex, apply the given callback to it (supplying the match as a parameter). Returns
     * true on a match and false if not.
     */
    var _testWithCallback = function(string, regex, callback) {
        var match = regex.exec(string);
        if(!match) { return false; }
        callback(match);
        return true;
    };
    
    /**
     * Returns a random integer between 2 given values (both inclusive).
     */
    var _randomInt = function(min, max) {
        min = _parseInt(min), max = _parseInt(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; 
    }
    
    /**
     * A faster alternative to using parseInt(); Performance a bit-wise right shift by zero. Other alternatives would be double
     * bit-wise not (~~value) or implicit conversion (+value), although the last one needs an additional Math.floor().
     */
    var _parseInt = function(value) { return value >> 0; };
    
    /**
     * Creates a key pointing to the current event of the given Game_Interpreter instance and the given variable.
     */
    var _createKey = function(interpreter, key) { return [interpreter._mapId, interpreter._eventId, key]; };
    
    //=============================================================================
    // class Game_SelfVariables
    //=============================================================================    
    
    /**
     * This is basically a copy of Game_SelfSwitches, mixed with Game_Variables for correct value handling.
     */
    function Game_SelfVariables() { this.initialize.apply(this, arguments); };
    (function($) {
        
        $.prototype.initialize = function() { this.clear(); };
        
        $.prototype.clear = function() { this._data = {}; };
        
        $.prototype.value = function(key) { return this._data[key] || 0; };
        
        $.prototype.setValue = function(key, value) { value = _parseInt(value); this._data[key] = value; this.onChange(); };
		
		$.prototype.addValue = function(key, value) { value = _parseInt(value); var currentValue = this.value(key); this.setValue(key, currentValue + value); };
        
        $.prototype.onChange = function() { $gameMap.requestRefresh(); };
        
        /**
         * Returns a self variable of the current event. Called from a Game_Interpreter as "$gameSelfVariables.get(this, 'A')".
         */
        $.prototype.get = function(interpreter, key) { return this.value(_createKey(interpreter, key)); };
        
        /**
         * Sets a self variable of the current event, Called from a Game_Interpreter as "$gameSelfVariables.set(this, 'A', 1);
         */
        $.prototype.set = function(interpreter, key, value) { this.setValue(_createKey(interpreter, key), value); };
		
		$.prototype.add = function(interpreter, key, value) {
        var currentKey = _createKey(interpreter, key);
        var currentValue = this.value(currentKey);
        this.setValue(currentKey, currentValue + _parseInt(value)); };
		
		$.prototype.clearVariablesForEvent = function(mapId, eventId) {
			       for (var key in this._data) {
        if (this._data.hasOwnProperty(key)) {
            var storedKey = key.split(','); // 按逗号分割键字符串
            var storedMapId = parseInt(storedKey[0]);
            var storedEventId = parseInt(storedKey[1]);
            if (storedMapId === Number(mapId) && storedEventId === Number(eventId)) {
                delete this._data[key];
                                  }
                             }
                         }
	                 };	
         
    })(Game_SelfVariables);
    
    //=============================================================================
    // class Game_Interpreter
    //=============================================================================
    
    (function($) {
        
        /**
         * Creates a key pointing to the current event and the given variable.
         */
        $.prototype._iavra_selfVariables_createKey = function(key) { return [this._mapId, this._eventId, key]; }
        
        /**
         * When our plugin command matches, extract the first argument as key and join the rest together, so it can be matched. Only
         * call the original function, if our command doesn't match (performance reasons).
         */
        $.prototype._iavra_selfVariables_pluginCommand = $.prototype.pluginCommand;
        $.prototype.pluginCommand = function(command, args) {
            if(command === _pluginCommand) {
                _handleCommand(_createKey(this, args.shift()), args.join(' '));
                return;
            }
            this._iavra_selfVariables_pluginCommand(command, args);
        };
        
    })(Game_Interpreter);
    
    //=============================================================================
    // module DataManager
    //=============================================================================
    
    /**
     * Create, save and load our container object together with all other game objects.
     */
    (function($) {
        
        $._iavra_selfVariables_createGameObjects = $.createGameObjects;
        $.createGameObjects = function() {
            this._iavra_selfVariables_createGameObjects();
            window[_containerName] = new Game_SelfVariables();
        };
        
        $._iavra_selfVariables_makeSaveContents = $.makeSaveContents;
        $.makeSaveContents = function() {
            var contents = this._iavra_selfVariables_makeSaveContents();
            contents._iavra_selfVariables = window[_containerName];
            return contents;
        };
        
        $._iavra_selfVariables_extractSaveContents = $.extractSaveContents;
        $.extractSaveContents = function(contents) {
            this._iavra_selfVariables_extractSaveContents(contents);
            window[_containerName] = contents._iavra_selfVariables;
        };
        
    })(DataManager);
    
    //=============================================================================
    // export
    //=============================================================================
    
    /**
     * Export our class, so load/save can work correctly.
     */
    window.Game_SelfVariables = Game_SelfVariables;
    
})();

// 为 Game_SelfVariables 增加 deleteValue 方法
Game_SelfVariables.prototype.deleteValue = function(key) {
    // 如果传入的是数组，则转换为字符串形式（如 "1,110,deposit"）
    var keyStr = Array.isArray(key) ? key.join(',') : key;
    if (this._data.hasOwnProperty(keyStr)) {
        delete this._data[keyStr];
    }
};