/*:
 * @url https://gbrogames.itch.io/
 * @target MV
 * @author coffeenahc (GBRO Games)
 * @plugindesc (v.1.0) Add a canvas that allows for free-form drawing. Basically MS Paint in RPGM.
 * 
 * @help
 * ======================================================================================
 * 
 * VERSION HISTORY: 
 * - 1.0: Initial release
 * 
 * ======================================================================================
 * 
 * TERMS OF USAGE (As of 10/10/2023):
 * 
 * If you got this plugin FOR FREE on itch.io:
 * - Attribution / credit to 'GBRO Games' is required.
 * - Commercial or Non-commercial use
 * 
 * If you have PAID/DONATED AT LEAST 5$ for this plugin on itch.io:
 * - No attribution or credit is required. 
 * - Commercial or Non-commercial use
 * 
 * You may edit the plugin's code however you want, but do not claim ownership of it, and 
 * remember to still give credits as stated above.
 * 
 * Any acts with the intention of rebranding the plugin, such as changing the plugin 
 * filename and the comments at the top of the file that include the plugin description 
 * and author information, are forbidden. 
 * 
 * I am open for commissions should you wish to upgrade the plugin or change parts of it 
 * according to your preference. Contact me at the above link, visit my fiverr page 
 * (https://www.fiverr.com/coffee_chan), or dm on discord (Username: coffeenahc).
 * 
 * ======================================================================================
 * 
 * A.) ADDING A CANVAS SPRITE:
 * 
 * GBRO.Canvas.createSprite("id", x, y, width, height, dataVarId, "filename");
 * - id is a string (wrapped in quotation marks) to identify the canvas.
 * - x, y, width, height are integer parameters. Should be self explanatory.
 * - dataVarId is the id of a variable if you wish to save the canvas and load it later on.
 * Omit this parameter if you don't need to save/load canvas data.
 * - filename is a string (wrapped in quotation marks) to specify filename of image
 * when canvas is saved as image. You can omit this parameter and one will be automatically
 * generated when the canvas is saved as an image. 
 * 
 * The above script call returns the created canvas sprite so you can assign it to a variable
 * like so: 
 * 
 * const canvasSprite = GBRO.Canvas.createSprite("id");
 * 
 * and use it later on. You can also reference a canvas sprite with the below script call:
 * 
 * const canvasSprite = GBRO.Canvas.getSprite("id");
 * 
 * To remove a canvas sprite from the scene:
 * 
 * GBRO.Canvas.removeSprite("id");
 * - Note that the above script call doesn't call the exit method of the canvas sprite.
 * 
 * There are several methods available for you to use once you have a reference to a canvas
 * sprite object:
 * 
 * 1.) If you wish to enable mouse trail (this one's disabled by default):
 * 
 * canvasSprite.enableTrail(); //Enables the mouse trail effect
 * canvasSprite.disableTrail(); //Disables mouse trail effect
 * 
 * 2.) Set canvas as editable or not:
 * 
 * canvasSprite.setEditable(bool); //Replace bool with true or false.
 * 
 * 3.) Set canvas as one stroke or:
 * 
 * canvasSprite.setAsOneStroke(); 
 * - One stroke canvases, as the name implies, are used for one stroke and then removed when
 * you lift the mouse. This was implemented in Persona 5 Phantom X signature prompt and was the
 * inspiration for the creation of this plugin.
 * 
 * 4.) Save the canvas as an image when the image is "exited". An image is "exited" when the 
 * exit command is triggered from the tool window:
 * 
 * canvasSprite.saveImageOnExit();
 * 
 * 5.) You can also prematurely/force save the canvas as an image with:
 * 
 * canvasSprite.saveImage();
 * 
 * 6.) Set the variable where the canvas data wil be stored:
 * 
 * canvasSprite.setDataVarId(varId);
 * 
 * 7.) Explicitly save canvas data:
 * 
 * canvasSprite.saveData();
 * 
 * 8.) Load canvas data:
 * 
 * canvasSprite.loadData(varId);
 * 
 * 9.) Exit the canvas:
 * 
 * canvasSprite.exit();
 * 
 * 10.) Set background image:
 *  
 * canvasSprite.setBgImage("filename");
 * - Where filename is the name of an image in your img/pictures/ folder
 * 
 * 11.) Set background color:
 * 
 * canvasSprite.setBgColor("colorName");
 * - Where colorName is either a hex color (#ffffff), color nam (blue, red, black, etc.), or rgba format (rgba(r,g,b,a));
 * 
 * 12.) Set stroke width:
 * 
 * canvasSprite.setStrokeWidth(width);
 * - Replace width with a number
 * 
 * 13.) Set stroke color:
 * 
 * canvasSprite.setStrokeColor("colorName");
 * 
 * B.) ADDING A TOOL WINDOW
 * 
 * Only do so after you have added a canvas sprite. To create a tool window:
 * 
 * GBRO.Canvas.createToolWindow("id", x, y, width, height);
 * - Parameters are the same as adding a canvas sprite.
 * 
 * To reference a tool window:
 * 
 * The above script returns the tool window created, so you can store that in a variable like so:
 * 
 * const toolWindow = GBRO.Canvas.createToolWindow("id");
 * 
 * or you can also do :
 * 
 * const toolWindow = GBRO.Canvas.getToolWindow("id");
 * 
 * Available methods for tool window:
 * 
 * 1.) To hook up the window to a canvas sprite:
 * 
 * toolWindow.setup(canvasSprite);
 * - Where canvasSprite is a canvas sprite object. Read above on how to reference
 * a canvas sprite object.
 * 
 * 2.) Exit the tool window:
 * 
 * toolWindow.commandExit();
 * - Note that this script call will also exit the hooked up canvas sprite.
 * 
 * 3.) If you want to remove certain commands:
 * 
 * toolWindow.removeCommand("symbol");
 * - Replace symbol with any of the default commands: pen, eraser, color, decSize, b.size, incSize, save, exit
 * 
 * Note that for each command, you will need an image in your 'img/system' folder with the symbol as its filename 
 * to represent the command with an icon.
 * 
 * @param colors
 * @type text[]
 * @text Colors
 * @desc Cycleable color selection. You can use hex format (#ffffff), rgba (rgba(r,g,b,a)), or color names (red, blue, etc.).
 * @default ["black", "white", "red", "green", "blue", "yellow", "pink", "violet", "gray", "teal", "orange"]
 */

var GBRO = GBRO || {};
GBRO.Canvas = {
    colors: JSON.parse(PluginManager.parameters("GBRO_Canvas")["colors"])
};

GBRO.Canvas.createSprite = function(id, x = 0, y = 0, w, h, v, filename) {
    const spriteInScene = SceneManager._scene.children.find(s => s && s instanceof Sprite_Canvas && s._id === id);
    if (spriteInScene) {
        spriteInScene.position.set(x, y);
        return spriteInScene;
    } else {
        const sprite = new Sprite_Canvas(id, w, h, v, filename);
        sprite.position.set(x, y);
        SceneManager._scene.addChild(sprite);
        return sprite;
    }
};

GBRO.Canvas.createToolWindow = function(id, x = 0, y = 0, w = 500, h = 95) {
    const windowInScene = SceneManager._scene.children.find(w => w && w instanceof Window_CanvasTools && w._id === id);
    if (windowInScene) {
        windowInScene.x = x;
        windowInScene.y = y;
        return windowInScene;
    } else {
        const window = new Window_CanvasTools(id, new Rectangle(x, y, w, h));
        SceneManager._scene.addChild(window);
        return window;
    }
};

GBRO.Canvas.removeSprite = function(id) {
    const sprite = SceneManager._scene.children.find(s => s && s._id === id && s instanceof Sprite_Canvas);
    if (sprite && sprite.parent) sprite.parent.removeChild(sprite);
};

GBRO.Canvas.removeToolWindow = function(id) {
    const sprite = SceneManager._scene.children.find(s => s && s._id === id && s instanceof Window_CanvasTools);
    if (sprite && sprite.parent) sprite.parent.removeChild(sprite);
};

GBRO.Canvas.getSprite = function(id) {
    return SceneManager._scene.children.find(s => s && s._id === id && s instanceof Sprite_Canvas);
};

GBRO.Canvas.getToolWindow = function(id) {
    return SceneManager._scene.children.find(s => s && s._id === id && s instanceof Window_CanvasTools);
};

let gbro_canvas_gameplayer_canmove = Game_Player.prototype.canMove;
Game_Player.prototype.canMove = function() {
    return gbro_canvas_gameplayer_canmove.call(this) && 
    (SceneManager._scene instanceof Scene_Map ? !SceneManager._scene.children.some(c => c instanceof Sprite_Canvas) : false);
};

let gbro_canvas_scenemap_ismenuenabled = Scene_Map.prototype.isMenuEnabled;
Scene_Map.prototype.isMenuEnabled = function() {
    return gbro_canvas_scenemap_ismenuenabled.call(this) && !this.children.some(c => c instanceof Sprite_Canvas);
};

function Sprite_Canvas() {
    this.initialize(...arguments);
}

Sprite_Canvas.prototype = Object.create(Sprite.prototype);
Sprite_Canvas.prototype.constructor = Sprite_Canvas;

Sprite_Canvas.prototype.initialize = function(id, w, h, v, filename) {
    Sprite.prototype.initialize.call(this);
    this._id = id;
    this._history = [];
    this._curStroke = null;
    this._isDrawing = false;
    this._bgColor = "transparent";
    this._bgImage = "";
    this._strokeColor = "black";
    this._strokeWidth = 2;
    this._filename = filename;
    this._dataVarId = v;
    this._toolWindow = null;
    this._isOneStroke = false;
    this._exitEvent = null;
    this._exitCe = null;
    this._isEditable = true;
    this._isTrailEnabled = false;
    this._saveImgOnExit = false;

    this.x = 0;
    this.y = 0;
    this._startPosition = null;
    this._targetPosition = null;
    this._moveDuration = 0;
    this._moveElapsed = 0;
    this._moveEaseType = "easeOut";

    this.alpha = 1;
    this._startAlpha = null;
    this._targetAlpha = null;
    this._alphaDuration = 0;
    this._alphaElapsed = 0;
    this._alphaEaseType = "easeOut";

    this.setupBitmap(w, h);
    this.setupTrail();
    this.setTool("pen");
};

Sprite_Canvas.prototype.setupBitmap = function(w, h) {
    this.bitmap = new Bitmap(w, h);
    this.bitmap.fillRect(0,0,w,h, this._bgColor);
};

Sprite_Canvas.prototype.setupTrail = function() {
    const texture = PIXI.Texture.from("img/system/trail.png"); 
    this._historyX = [];
    this._historyY = [];
    this._historySize = 20;
    this._ropeSize = 50;
    this._points = [];

    for (let i = 0; i < this._historySize; i++) {
        this._historyX[i] = 0;
        this._historyY[i] = 0;
    }
    
    for (let i = 0; i < this._ropeSize; i++) {
        this._points.push(new PIXI.Point(0, 0));
    }

    this._rope = new PIXI.mesh.Rope(texture, this._points);
    this._rope.blendMode = PIXI.BLEND_MODES.ADD;
    this.addChild(this._rope);
    this._rope.visible = this._isTrailEnabled;
};

Sprite_Canvas.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateDraw();
    this.updateTrail();
    this.updateTargetPosition();
    this.updateTargetAlpha();
};

Sprite_Canvas.prototype.updateDraw = function() {
    if (!this.bitmap || !this._isEditable) return;

    const touchPos = new Point(TouchInput.x, TouchInput.y);
    const localPos = this.worldTransform.applyInverse(touchPos);

    if (!this.hitTest(localPos.x, localPos.y)) return;

    if (!this._isDrawing) {
        if (TouchInput.isPressed()) {
            this._isDrawing = true;
            this.onCanvasTouch(localPos.x, localPos.y, this._tool);
        }
    } else {
        if (!TouchInput.isPressed()) {
            if (this._curStroke) {
                this._history.push(this._curStroke);
                this._curStroke = null;
            }
            this._isDrawing = false;
            if (this._isOneStroke) this.exit();
        } else {
            this.onCanvasTouch(localPos.x, localPos.y, this._tool);
        }
    }
};

Sprite_Canvas.prototype.updateTrail = function() {
    this._rope.visible = this._isTrailEnabled && this.isBeingTouched();

    if (!this._isTrailEnabled) return;

    const touchPos = new Point(TouchInput.x, TouchInput.y);
    const localPos = this.worldTransform.applyInverse(touchPos);

    this._historyX.pop();
    this._historyX.unshift(localPos.x);
    this._historyY.pop();
    this._historyY.unshift(localPos.y);

    for (let i = 0; i < this._ropeSize; i++) {
        const p = this._points[i];
        p.x = this.cubicInterpolation(this._historyX, (i / this._ropeSize) * this._historySize);
        p.y = this.cubicInterpolation(this._historyY, (i / this._ropeSize) * this._historySize);
    }
};

Sprite_Canvas.prototype.updateTargetPosition = function() {
    if (!this._targetPosition || this._moveDuration <= 0) return;
    this._moveElapsed = (this._moveElapsed || 0) + 1;
    const t = Math.min(this._moveElapsed / this._moveDuration, 1);
    const easedT = GBRO.Utils !== undefined ? GBRO.Utils.applyEasing(t, this._moveEaseType) : t;

    const startX = this._startPosition.x;
    const startY = this._startPosition.y;
    const targetX = this._targetPosition.x;
    const targetY = this._targetPosition.y;

    this.x = startX + (targetX - startX) * easedT;
    this.y = startY + (targetY - startY) * easedT;

    if (t >= 1) {
        this._targetPosition = null;
        this._moveDuration = 0;
    }
};

Sprite_Canvas.prototype.setTargetPosition = function(x, y, duration, easeType) {
    if (this.x == x && this.y == y) return;
    if (duration !== null && duration <= 0) {
        this.x = x;
        this.y = y;
        return;
    }
    this._startPosition = { x: this.x, y: this.y };
    this._targetPosition = { x, y };
    this._moveDuration = duration || 30;
    this._moveElapsed = 0;
    this._moveEaseType = easeType;
};

Sprite_Canvas.prototype.updateTargetAlpha = function() {
    if (this._targetAlpha == null || this._alphaDuration <= 0) return;

    this._alphaElapsed = (this._alphaElapsed || 0) + 1;
    const t = Math.min(this._alphaElapsed / this._alphaDuration, 1);
    const easedT = GBRO.Utils !== undefined ? GBRO.Utils.applyEasing(t, this._alphaEaseType) : t;

    const newAlpha = this._startAlpha + (this._targetAlpha - this._startAlpha) * easedT;
    this.alpha = newAlpha;

    if (t >= 1) {
        this._targetAlpha = null;
        this._alphaDuration = 0;
    }
};

Sprite_Canvas.prototype.setTargetAlpha = function(alpha, duration, easeType) {
    if (this.alpha == alpha) return;
    if (duration !== null && duration <= 0) {
        this.alpha = alpha;
        return;
    }
    this._startAlpha = this.alpha;
    this._targetAlpha = alpha;
    this._alphaDuration = duration || 30;
    this._alphaElapsed = 0;
    this._alphaEaseType = easeType;
};

Sprite_Canvas.prototype.clipInput = function(k, arr) {
    if (k < 0) k = 0;
    if (k > arr.length - 1) k = arr.length - 1;
    return arr[k];
};

Sprite_Canvas.prototype.getTangent = function(k, factor, array) {
    return (factor * (this.clipInput(k + 1, array) - this.clipInput(k - 1, array))) / 2;
};

Sprite_Canvas.prototype.cubicInterpolation = function(array, t, tangentFactor = 1) {
    const k = Math.floor(t);
    const m = [
        this.getTangent(k, tangentFactor, array),
        this.getTangent(k + 1, tangentFactor, array)
    ];
    const p = [this.clipInput(k, array), this.clipInput(k + 1, array)];

    t -= k;
    const t2 = t * t;
    const t3 = t * t2;

    return (2 * t3 - 3 * t2 + 1) * p[0] +
           (t3 - 2 * t2 + t) * m[0] +
           (-2 * t3 + 3 * t2) * p[1] +
           (t3 - t2) * m[1];
};

Sprite_Canvas.prototype.hitTest = function(x, y) {
    const rect = new Rectangle(
        -this.anchor.x * this.width,
        -this.anchor.y * this.height,
        this.width,
        this.height
    );
    return rect.contains(x, y);
};

Sprite_Canvas.prototype.isBeingTouched = function() {
    const touchPos = new Point(TouchInput.x, TouchInput.y);
    const localPos = this.worldTransform.applyInverse(touchPos);
    return this.hitTest(localPos.x, localPos.y);
};

Sprite_Canvas.prototype.onCanvasTouch = function(x, y, tool) {
    if (!this._curStroke) {
        this._curStroke = {
            tool: tool,
            color: this._strokeColor,
            width: this._strokeWidth,
            points: []
        };
    }

    this._curStroke.points.push({x, y});
    this.refresh();
};

Sprite_Canvas.prototype.refresh = function() {
    if (!this.bitmap) return;
    this.bitmap.clear();

    const redraw = () => {
        const ctx = this.bitmap.context;
        this._history.forEach(s => {
            if (s.tool === "eraser") {
                ctx.globalCompositeOperation = "destination-out";
            } else {
                ctx.globalCompositeOperation = "source-over";
                ctx.strokeStyle = s.color;
            }
            ctx.lineWidth = s.width;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            ctx.beginPath();
            s.points.forEach((p, i) => {
                if (i === 0) ctx.moveTo(p.x, p.y);
                else ctx.lineTo(p.x, p.y);
            })
            ctx.stroke();
        });

        if (this._curStroke) {
            if (this._curStroke.tool === "eraser") {
                ctx.globalCompositeOperation = "destination-out";
            } else {
                ctx.globalCompositeOperation = "source-over";
                ctx.strokeStyle = this._curStroke.color;
            }       
            ctx.lineWidth = this._curStroke.width;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            ctx.beginPath();
            this._curStroke.points.forEach((p,i) => {
                if (i === 0) ctx.moveTo(p.x, p.y);
                else ctx.lineTo(p.x, p.y);
            })
            ctx.stroke();
        };
    }
    
    if (this._bgImage !== "") {
        const bitmap = ImageManager.loadPicture(this._bgImage);
        bitmap.addLoadListener(() => {
            this.bitmap.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0, this.bitmap.width, this.bitmap.height);
            redraw();
            this.bitmap._baseTexture.update(); 
        })
    } else {
        this.bitmap.fillRect(0, 0, this.bitmap.width, this.bitmap.height, this._bgColor);
        redraw();
        this.bitmap._baseTexture.update(); 
    }

};

Sprite_Canvas.prototype.clear = function() {
    this._history = [];
    this._curStroke = null;
    this.refresh();
};

Sprite_Canvas.prototype.setExitEvent = function(eventId) {
    this._exitEvent = eventId;
};

Sprite_Canvas.prototype.setExitCe = function(ce) {
    this._exitCe = ce;
};

Sprite_Canvas.prototype.enableTrail = function() {
    this._isTrailEnabled = true;
};

Sprite_Canvas.prototype.disableTrail = function() {
    this._isTrailEnabled = false;
};

Sprite_Canvas.prototype.setEditable = function(b) {
    this._isEditable = b;
};

Sprite_Canvas.prototype.setAsOneStroke = function() {
    this._isOneStroke = true;
};

Sprite_Canvas.prototype.saveImageOnExit = function() {
    this._saveImgOnExit = true;
};

Sprite_Canvas.prototype.setFilename = function(filename) {
    this._filename = filename;
};

Sprite_Canvas.prototype.saveImage = function() {
    if (!this.bitmap || !this.bitmap.canvas) return;
    const filename = this._filename || this.generateFilename();

    const fs = require('fs');
    const path = require('path');
    const dataURL = this.bitmap.canvas.toDataURL("image/png");
    const base64Data = dataURL.replace(/^data:image\/png;base64,/, "");
    const dir = path.join(process.cwd(), "img/pictures");
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    const filePath = path.join(dir, filename+".png");
    fs.writeFileSync(filePath, base64Data, 'base64');
};

Sprite_Canvas.prototype.setDataVarId = function(varId) {
    this._dataVarId = varId;
};

Sprite_Canvas.prototype.saveData = function() {
    if (this._dataVarId) {
        $gameVariables.setValue(this._dataVarId, {
            history: this._history,
            bgColor: this._bgColor,
            bgImage: this._bgImage,
            strokeColor: this._strokeColor,
            strokeWidth: this._strokeWidth,
            filename: this._filename,
            isCanvasData: true
        });
    }
};

Sprite_Canvas.prototype.loadData = function(varId) {
    const data = $gameVariables.value(varId);
    if (!data || !data.isCanvasData) return;

    this._history = data.history;
    this._bgColor = data.bgColor;
    this._bgImage = data.bgImage;
    this._strokeColor = data.strokeColor;
    this._strokeWidth = data.strokeWidth;
    this._filename = data.filename;
    this.refresh();
};

Sprite_Canvas.prototype.exit = function() {
    if (this._saveImgOnExit) this.saveImage();
    this.saveData();
    if (this._exitEvent && SceneManager._scene instanceof Scene_Map) {
        const event = $gameMap.event(this._exitEvent);
        if (event) event.start();
    } else if (this._exitCe != null) {
        $gameTemp.reserveCommonEvent(this._exitCe);
    }
    if (this.parent) this.parent.removeChild(this);
};

Sprite_Canvas.prototype.generateFilename = function()  {
    const now = new Date();

    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");

    const hh = String(now.getHours()).padStart(2, "0");
    const min = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");

    return `${"canvas"}_${yyyy}${mm}${dd}_${hh}${min}${ss}`;
};

Sprite_Canvas.prototype.setBgColor = function(color) {
    this._bgColor = color;
    this._bgImage = "";
    this.refresh();
};

Sprite_Canvas.prototype.setBgImage = function(filename) {
    this._bgImage = filename;
    this._bgColor = "";
    this.refresh();
};

Sprite_Canvas.prototype.setStrokeWidth = function(width) {
    this._strokeWidth = width;
};

Sprite_Canvas.prototype.setStrokeColor = function(color) {
    this._strokeColor = color;
};

Sprite_Canvas.prototype.incStrokeWidth = function(width = 1) {
    this._strokeWidth += width;
};

Sprite_Canvas.prototype.decStrokeWidth = function(width = 1) {
    this._strokeWidth = Math.max(this._strokeWidth - width, 1);
};

Sprite_Canvas.prototype.setTool = function(tool) {
    this._tool = tool;
};

Sprite_Canvas.prototype.setToolWindow = function(tw) {
    this._toolWindow = tw;
};

Sprite_Canvas.prototype.hitTest = function(x, y) {
    const rect = new Rectangle(
        -this.anchor.x * this.width,
        -this.anchor.y * this.height,
        this.width,
        this.height
    );
    return rect.contains(x, y);
};

function Window_CanvasTools() {
    this.initialize(...arguments);
}

Window_CanvasTools.prototype = Object.create(Window_Command.prototype);
Window_CanvasTools.prototype.constructor = Window_CanvasTools;

Window_CanvasTools.prototype.initialize = function(id, rect) {
    this._commands = ["pen", "eraser", "color", "decSize", "b.size", "incSize", "save", "exit"];
    this._width = rect.width;
    this._height = rect.height;
    Window_Command.prototype.initialize.call(this, rect.x, rect.y, rect.width, rect.height);
    this._id = id;
    this._canvasSprite = null;
    this._colorArr = [...GBRO.Canvas.colors];
    this._colorIndex = 0;
    this._orientation = "horz";
    this._areImageAssetsLoaded = false;
    this._imageAssets = [];
    this._commands.forEach(s => {
        if (s !== "b.size") this._imageAssets.push(ImageManager.loadSystem(s));
    })
};

Window_CanvasTools.prototype.update = function() {
    Window_Command.prototype.update.call(this);
    this.updateImageAssetsLoading();
};

Window_CanvasTools.prototype.updateImageAssetsLoading = function() {
    if (this._areImageAssetsLoaded) return;

    if (this._imageAssets.every(b => b.isReady())) {
        this._areImageAssetsLoaded = true;
        this._imageAssets = null;
        this.refresh();
    }
};

Window_CanvasTools.prototype.windowWidth = function() {
    return this._width;
};

Window_CanvasTools.prototype.windowHeight = function() {
    return this._height;
};

Window_CanvasTools.prototype.itemRect = function(index) {
    const rect = Window_Selectable.prototype.itemRect.call(this, index);
    if (this._orientation === "vert") rect.y += (index * 10); 
    return rect;
};

Window_CanvasTools.prototype.removeCommand = function(...symbols) {
    symbols.forEach(symbol => {
        this._commands.splice(this._commands.indexOf(symbol), 1);
    })
    this.refresh();
};

Window_CanvasTools.prototype.setOrientation = function(o) {
    this._orientation = o;
    this.refresh();
};

Window_CanvasTools.prototype.setup = function(cs) {
    if (!cs || !(cs instanceof Sprite_Canvas)) return;
    this._canvasSprite = cs;
    cs.setToolWindow(this);
    cs.setStrokeColor(this._colorArr[this._colorIndex]);
    this.refresh();
    this.select(0);
    this.activate();
};

Window_CanvasTools.prototype.makeCommandList = function() {
    const commands = this._commands;
    commands.forEach(c => this.addCommand("", c));
    if (!this._handlers) this._handlers = {};
    this.setHandler("pen", this.commandPen.bind(this));
    this.setHandler("eraser", this.commandEraser.bind(this));
    this.setHandler("color", this.commandColor.bind(this));
    this.setHandler("decSize", this.commandDecSize.bind(this));
    this.setHandler("incSize", this.commandIncSize.bind(this));
    this.setHandler("save", this.commandSave.bind(this));
    this.setHandler("exit", this.commandExit.bind(this));
};

Window_CanvasTools.prototype.commandPen = function() {
    if (!this._canvasSprite) {
        this.activate();
        return;
    }
    this._canvasSprite.setTool("pen");
    this.activate();
    this.refresh();
};

Window_CanvasTools.prototype.commandEraser = function() {
    if (!this._canvasSprite) {
        this.activate();
        return;
    }
    this._canvasSprite.setTool("eraser");
    this.activate();
    this.refresh();
};

Window_CanvasTools.prototype.commandColor = function() {
    if (!this._canvasSprite) {
        this.activate();
        return;
    }

    if (this._colorIndex < this._colorArr.length - 1) this._colorIndex++;
    else this._colorIndex = 0;

    this._canvasSprite.setStrokeColor(this._colorArr[this._colorIndex]);
    this.activate();
    this.refresh();
};

Window_CanvasTools.prototype.commandDecSize = function() {
    if (!this._canvasSprite) {
        this.activate();
        return;
    }
    this._canvasSprite.decStrokeWidth();
    this.activate();
    this.refresh();
};

Window_CanvasTools.prototype.commandIncSize = function() {
    if (!this._canvasSprite) {
        this.activate();
        return;
    }
    this._canvasSprite.incStrokeWidth();
    this.activate();
    this.refresh();
};

Window_CanvasTools.prototype.commandSave = function() {
    if (!this._canvasSprite) {
        this.activate();
        return;
    }
    this._canvasSprite.saveImage();
    this.activate();
};

Window_CanvasTools.prototype.commandExit = function() {
    if (!this._canvasSprite) {
        this.activate();
        return;
    }
    this._canvasSprite.exit();
    if (this.parent) this.parent.removeChild(this);
};

Window_CanvasTools.prototype.drawItem = function(index) {
    const rect = this.itemRect(index);
    const symbol = this.commandSymbol(index);
    const pad = 12;
    if (symbol === "b.size") {
        this.resetFontSettings();
        if (this._canvasSprite) this.drawText(this._canvasSprite._strokeWidth, rect.x, rect.y + 10, rect.width, "center");
        this.contents.fontSize = 12;
        this.changeTextColor(this.systemColor());
        this.drawText(symbol.toUpperCase(), rect.x, rect.y + 37, rect.width, "center");        
    } else if (symbol === "color") {
        const color = this._colorArr ? this._colorArr[this._colorIndex] : "black";
        this.contents.fillRect(rect.x + (pad / 2), rect.y + (pad / 2), rect.width - pad, rect.height - pad, color);
        this.contents.fontSize = 12;
        this.changeTextColor(this.systemColor());
        this.drawText(symbol.toUpperCase(), rect.x, rect.y + 37, rect.width, "center");        
    } else {
        const b = ImageManager.loadSystem(symbol);
        if (symbol === "pen" || symbol === "eraser") {
            if (this._canvasSprite && this._canvasSprite._tool === symbol) {
                this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, "rgba(0,0,0,0.5)");
            }
        }
        const scale = ((rect.width-pad) / b.width);
        const scaledW = b.width * scale;
        const scaledH = b.height * scale;
        this.contents.blt(b, 0, 0, b.width, b.height, rect.x + ((rect.width - scaledW) / 2), rect.y + ((rect.height - scaledH) / 2), scaledW, scaledH);
        this.contents.fontSize = 12;
        this.changeTextColor(this.systemColor());
        this.drawText(symbol.toUpperCase(), rect.x, rect.y + 37, rect.width, "center");
    }
};

Window_CanvasTools.prototype.itemHeight = function() {
    return this.itemWidth();
};

Window_CanvasTools.prototype.maxCols = function() {
    return this._orientation === "vert" ? 1 : (this._list ? this._list.length : 1);
};
