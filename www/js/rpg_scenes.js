//=============================================================================
// rpg_scenes.js v1.6.2
//=============================================================================

//=============================================================================

/**
 * The Superclass of all scene within the game.
 * 
 * @class Scene_Base
 * @constructor 
 * @extends Stage
 */
class Scene_Base extends Stage {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    /**
     * Create a instance of Scene_Base.
     * 
     * @instance 
     * @memberof Scene_Base
     */
    initialize() {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize();
        this._active = false;
        this._fadeSign = 0;
        this._fadeDuration = 0;
        this._fadeSprite = null;
        this._imageReservationId = Utils.generateRuntimeId();
    };

    /**
     * Attach a reservation to the reserve queue.
     * 
     * @method attachReservation
     * @instance 
     * @memberof Scene_Base
     */
    attachReservation() {
        ImageManager.setDefaultReservationId(this._imageReservationId);
    };

    /**
     * Remove the reservation from the Reserve queue.
     * 
     * @method detachReservation
     * @instance 
     * @memberof Scene_Base
     */
    detachReservation() {
        ImageManager.releaseReservation(this._imageReservationId);
    };

    /**
     * Create the components and add them to the rendering process.
     * 
     * @method create
     * @instance 
     * @memberof Scene_Base
     */
    create() { };

    /**
     * Returns whether the scene is active or not.
     * 
     * @method isActive
     * @instance 
     * @memberof Scene_Base
     * @return {Boolean} return true if the scene is active
     */
    isActive() {
        return this._active;
    };

    /**
     * Return whether the scene is ready to start or not.
     * 
     * @method isReady
     * @instance 
     * @memberof Scene_Base
     * @return {Boolean} Return true if the scene is ready to start
     */
    isReady() {
        return ImageManager.isReady();
    };

    /**
     * Start the scene processing.
     * 
     * @method start
     * @instance 
     * @memberof Scene_Base
     */
    start() {
        this._active = true;
    };

    /**
     * Update the scene processing each new frame.
     * 
     * @method update
     * @instance 
     * @memberof Scene_Base
     */
    update() {
        this.updateFade();
        this.updateChildren();
    };

    /**
     * Stop the scene processing.
     * 
     * @method stop
     * @instance 
     * @memberof Scene_Base
     */
    stop() {
        this._active = false;
    };


    /**
     * Return whether the scene is busy or not.
     * 
     * @method isBusy
     * @instance
     * @memberof Scene_Base
     * @return {Boolean} Return true if the scene is currently busy
     */
    isBusy() {
        return this._fadeDuration > 0;
    };

    /**
     * Terminate the scene before switching to a another scene.
     * 
     * @method terminate
     * @instance 
     * @memberof Scene_Base
     */
    terminate() { };

    /**
     * Create the layer for the windows children
     * and add it to the rendering process.
     * 
     * @method createWindowLayer
     * @instance 
     * @memberof Scene_Base
     */
    createWindowLayer() {
        const width = Graphics.boxWidth;
        const height = Graphics.boxHeight;
        const x = (Graphics.width - width) / 2;
        const y = (Graphics.height - height) / 2;
        this._windowLayer = new WindowLayer();
        this._windowLayer.move(x, y, width, height);
        this.addChild(this._windowLayer);
    };

    /**
     * Add the children window to the windowLayer processing.
     * 
     * @method addWindow
     * @instance 
     * @memberof Scene_Base
     */
    addWindow(window) {
        this._windowLayer.addChild(window);
    };

    /**
     * Request a fadeIn screen process.
     * 
     * @method startFadeIn
     * @param {Number} [duration=30] The time the process will take for fadeIn the screen
     * @param {Boolean} [white=false] If true the fadein will be process with a white color else it's will be black
     * 
     * @instance 
     * @memberof Scene_Base
     */
    startFadeIn(duration, white) {
        this.createFadeSprite(white);
        this._fadeSign = 1;
        this._fadeDuration = duration || 30;
        this._fadeSprite.opacity = 255;
    };

    /**
     * Request a fadeOut screen process.
     * 
     * @method startFadeOut
     * @param {Number} [duration=30] The time the process will take for fadeOut the screen
     * @param {Boolean} [white=false] If true the fadeOut will be process with a white color else it's will be black
     * 
     * @instance 
     * @memberof Scene_Base
     */
    startFadeOut(duration, white) {
        this.createFadeSprite(white);
        this._fadeSign = -1;
        this._fadeDuration = duration || 30;
        this._fadeSprite.opacity = 0;
    };

    /**
     * Create a Screen sprite for the fadein and fadeOut purpose and
     * add it to the rendering process.
     * 
     * @method createFadeSprite
     * @instance 
     * @memberof Scene_Base
     */
    createFadeSprite(white) {
        if (!this._fadeSprite) {
            this._fadeSprite = new ScreenSprite();
            this.addChild(this._fadeSprite);
        }
        if (white) {
            this._fadeSprite.setWhite();
        } else {
            this._fadeSprite.setBlack();
        }
    };

    /**
     * Update the screen fade processing.
     * 
     * @method updateFade
     * @instance 
     * @memberof Scene_Base
     */
    updateFade() {
        if (this._fadeDuration > 0) {
            const d = this._fadeDuration;
            if (this._fadeSign > 0) {
                this._fadeSprite.opacity -= this._fadeSprite.opacity / d;
            } else {
                this._fadeSprite.opacity += (255 - this._fadeSprite.opacity) / d;
            }
            this._fadeDuration--;
        }
    };

    /**
     * Update the children of the scene EACH frame.
     * 
     * @method updateChildren
     * @instance 
     * @memberof Scene_Base
     */
    updateChildren() {
        for (const child of this.children) {
            child.update && child.update();
        }
    };

    /**
     * Pop the scene from the stack array and switch to the
     * previous scene.
     * 
     * @method popScene
     * @instance 
     * @memberof Scene_Base
     */
    popScene() {
        SceneManager.pop();
    };

    /**
     * Check whether the game should be triggering a gameover.
     * 
     * @method checkGameover
     * @instance 
     * @memberof Scene_Base
     */
    checkGameover() {
        if ($gameParty.isAllDead()) {
            SceneManager.goto(Scene_Gameover);
        }
    };

    /**
     * Slowly fade out all the visual and audio of the scene.
     * 
     * @method fadeOutAll
     * @instance 
     * @memberof Scene_Base
     */
    fadeOutAll() {
        const time = this.slowFadeSpeed() / 60;
        AudioManager.fadeOutBgm(time);
        AudioManager.fadeOutBgs(time);
        AudioManager.fadeOutMe(time);
        this.startFadeOut(this.slowFadeSpeed());
    };

    /**
     * Return the screen fade speed value.
     * 
     * @method fadeSpeed
     * @instance 
     * @memberof Scene_Base
     * @return {Number} Return the fade speed
     */
    fadeSpeed() {
        return 24;
    };

    /**
     * Return a slow screen fade speed value.
     * 
     * @method slowFadeSpeed
     * @instance 
     * @memberof Scene_Base
     * @return {Number} Return the fade speed
     */
    slowFadeSpeed() {
        return this.fadeSpeed() * 2;
    };
};

//-----------------------------------------------------------------------------

// Scene_Boot
//
// The scene class for initializing the entire game.
var Scene_Boot = class extends Scene_Base {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize() {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize();
        this._startDate = Date.now();
    };

    create() {
        super.create();
        DataManager.loadDatabase();
        ConfigManager.load();
        this.loadSystemWindowImage();
    };

    loadSystemWindowImage() {
        ImageManager.reserveSystem('Window');
    };

    static loadSystemImages() {
        ImageManager.reserveSystem('IconSet');
        ImageManager.reserveSystem('Balloon');
        ImageManager.reserveSystem('Shadow1');
        ImageManager.reserveSystem('Shadow2');
        ImageManager.reserveSystem('Damage');
        ImageManager.reserveSystem('States');
        ImageManager.reserveSystem('Weapons1');
        ImageManager.reserveSystem('Weapons2');
        ImageManager.reserveSystem('Weapons3');
        ImageManager.reserveSystem('ButtonSet');
    };

    isReady() {
        if (super.isReady()) {
            return DataManager.isDatabaseLoaded() && this.isGameFontLoaded();
        } else {
            return false;
        }
    };

    isGameFontLoaded() {
        if (Graphics.isFontLoaded('GameFont')) {
            return true;
        } else if (!Graphics.canUseCssFontLoading()) {
            const elapsed = Date.now() - this._startDate;
            if (elapsed >= 60000) {
                throw new Error('Failed to load GameFont');
            }
        }
    };

    start() {
        super.start();
        SoundManager.preloadImportantSounds();
        if (DataManager.isBattleTest()) {
            DataManager.setupBattleTest();
            SceneManager.goto(Scene_Battle);
        } else if (DataManager.isEventTest()) {
            DataManager.setupEventTest();
            SceneManager.goto(Scene_Map);
        } else {
            this.checkPlayerLocation();
            DataManager.setupNewGame();
            SceneManager.goto(Scene_Title);
            Window_TitleCommand.initCommandPosition();
        }
        this.updateDocumentTitle();
    };

    updateDocumentTitle() {
        document.title = $dataSystem.gameTitle;
    };

    checkPlayerLocation() {
        if ($dataSystem.startMapId === 0) {
            throw new Error('Player\'s starting position is not set');
        }
    };
};

//-----------------------------------------------------------------------------

// Scene_Title
//
// The scene class of the title screen.
var Scene_Title = class extends Scene_Base {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize() {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize();
    };

    create() {
        super.create();
        this.createBackground();
        this.createForeground();
        this.createWindowLayer();
        this.createCommandWindow();
    };

    start() {
        super.start();
        SceneManager.clearStack();
        this.centerSprite(this._backSprite1);
        this.centerSprite(this._backSprite2);
        this.playTitleMusic();
        this.startFadeIn(this.fadeSpeed(), false);
    };

    update() {
        if (!this.isBusy()) {
            this._commandWindow.open();
        }
        super.update();
    };

    isBusy() {
        return this._commandWindow.isClosing() || super.isBusy();
    };

    terminate() {
        super.terminate();
        SceneManager.snapForBackground();
    };

    createBackground() {
        this._backSprite1 = new Sprite(ImageManager.loadTitle1($dataSystem.title1Name));
        this._backSprite2 = new Sprite(ImageManager.loadTitle2($dataSystem.title2Name));
        this.addChild(this._backSprite1);
        this.addChild(this._backSprite2);
    };

    createForeground() {
        this._gameTitleSprite = new Sprite(new Bitmap(Graphics.width, Graphics.height));
        this.addChild(this._gameTitleSprite);
        if ($dataSystem.optDrawTitle) {
            this.drawGameTitle();
        }
    };

    drawGameTitle() {
        const x = 20;
        const y = Graphics.height / 4;
        const maxWidth = Graphics.width - x * 2;
        const text = $dataSystem.gameTitle;
        this._gameTitleSprite.bitmap.outlineColor = 'black';
        this._gameTitleSprite.bitmap.outlineWidth = 8;
        this._gameTitleSprite.bitmap.fontSize = 72;
        this._gameTitleSprite.bitmap.drawText(text, x, y, maxWidth, 48, 'center');
    };

    centerSprite(sprite) {
        sprite.x = Graphics.width / 2;
        sprite.y = Graphics.height / 2;
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
    };

    createCommandWindow() {
        this._commandWindow = new Window_TitleCommand();
        this._commandWindow.setHandler('newGame', this.commandNewGame.bind(this));
        this._commandWindow.setHandler('continue', this.commandContinue.bind(this));
        this._commandWindow.setHandler('options', this.commandOptions.bind(this));
        this.addWindow(this._commandWindow);
    };

    commandNewGame() {
        DataManager.setupNewGame();
        this._commandWindow.close();
        this.fadeOutAll();
        SceneManager.goto(Scene_Map);
    };

    commandContinue() {
        this._commandWindow.close();
        SceneManager.push(Scene_Load);
    };

    commandOptions() {
        this._commandWindow.close();
        SceneManager.push(Scene_Options);
    };

    playTitleMusic() {
        AudioManager.playBgm($dataSystem.titleBgm);
        AudioManager.stopBgs();
        AudioManager.stopMe();
    };
};

//-----------------------------------------------------------------------------

// Scene_Map
//
// The scene class of the map screen.
var Scene_Map = class extends Scene_Base {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize() {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize();
        this._waitCount = 0;
        this._encounterEffectDuration = 0;
        this._mapLoaded = false;
        this._touchCount = 0;
    };

    create() {
        super.create();
        this._transfer = $gamePlayer.isTransferring();
        const mapId = this._transfer ? $gamePlayer.newMapId() : $gameMap.mapId();
        DataManager.loadMapData(mapId);
    };

    isReady() {
        if (!this._mapLoaded && DataManager.isMapLoaded()) {
            this.onMapLoaded();
            this._mapLoaded = true;
        }
        return this._mapLoaded && super.isReady();
    };

    onMapLoaded() {
        if (this._transfer) {
            $gamePlayer.performTransfer();
        }
        this.createDisplayObjects();
    };

    start() {
        super.start();
        SceneManager.clearStack();
        if (this._transfer) {
            this.fadeInForTransfer();
            this._mapNameWindow.open();
            $gameMap.autoplay();
        } else if (this.needsFadeIn()) {
            this.startFadeIn(this.fadeSpeed(), false);
        }
        this.menuCalling = false;
    };

    update() {
        this.updateDestination();
        this.updateMainMultiply();
		this.checkGameover();
        if (this.isSceneChangeOk()) {
            this.updateScene();
        } else if (SceneManager.isNextScene(Scene_Battle)) {
            this.updateEncounterEffect();
        }
        this.updateWaitCount();
        super.update();
    };

    updateMainMultiply() {
        this.updateMain();
        if (this.isFastForward()) {
            if (!this.isMapTouchOk()) {
                this.updateDestination();
            }
            this.updateMain();
        }
    };

    updateMain() {
        const active = this.isActive();
        $gameMap.update(active);
        $gamePlayer.update(active);
        $gameTimer.update(active);
        $gameScreen.update();
    };

    isFastForward() {
        return ($gameMap.isEventRunning() && !SceneManager.isSceneChanging() &&
            (Input.isLongPressed('ok') || TouchInput.isLongPressed()));
    };

    stop() {
        super.stop();
        $gamePlayer.straighten();
        this._mapNameWindow.close();
        if (this.needsSlowFadeOut()) {
            this.startFadeOut(this.slowFadeSpeed(), false);
        } else if (SceneManager.isNextScene(Scene_Map)) {
            this.fadeOutForTransfer();
        } else if (SceneManager.isNextScene(Scene_Battle)) {
            this.launchBattle();
        }
    };

    isBusy() {
        return ((this._messageWindow && this._messageWindow.isClosing()) ||
            this._waitCount > 0 || this._encounterEffectDuration > 0 ||
            super.isBusy());
    };

    terminate() {
        super.terminate();
        if (!SceneManager.isNextScene(Scene_Battle)) {
            this._spriteset.update();
            this._mapNameWindow.hide();
            SceneManager.snapForBackground();
        } else {
            ImageManager.clearRequest();
        }

        if (SceneManager.isNextScene(Scene_Map)) {
            ImageManager.clearRequest();
        }

        $gameScreen.clearZoom();

        this.removeChild(this._fadeSprite);
        this.removeChild(this._mapNameWindow);
        this.removeChild(this._windowLayer);
        this.removeChild(this._spriteset);
    };

    needsFadeIn() {
        return (SceneManager.isPreviousScene(Scene_Battle) ||
            SceneManager.isPreviousScene(Scene_Load));
    };

    needsSlowFadeOut() {
        return (SceneManager.isNextScene(Scene_Title) ||
            SceneManager.isNextScene(Scene_Gameover));
    };

    updateWaitCount() {
        if (this._waitCount > 0) {
            this._waitCount--;
            return true;
        }
        return false;
    };

    updateDestination() {
        if (this.isMapTouchOk()) {
            this.processMapTouch();
        } else {
            $gameTemp.clearDestination();
            this._touchCount = 0;
        }
    };

    isMapTouchOk() {
        return this.isActive() && $gamePlayer.canMove();
    };

    processMapTouch() {
        if (TouchInput.isTriggered() || this._touchCount > 0) {
            if (TouchInput.isPressed()) {
                if (this._touchCount === 0 || this._touchCount >= 15) {
                    const x = $gameMap.canvasToMapX(TouchInput.x);
                    const y = $gameMap.canvasToMapY(TouchInput.y);
                    $gameTemp.setDestination(x, y);
                }
                this._touchCount++;
            } else {
                this._touchCount = 0;
            }
        }
    };

    isSceneChangeOk() {
        return this.isActive() && !$gameMessage.isBusy();
    };

    updateScene() {
        if (!SceneManager.isSceneChanging()) {
            this.updateTransferPlayer();
        }
		/*
        if (!SceneManager.isSceneChanging()) {
            this.updateEncounter();
        }
        if (!SceneManager.isSceneChanging()) {
            this.updateCallMenu();
        }
        if (!SceneManager.isSceneChanging()) {
            this.updateCallDebug();
        }
		*/
    };

    createDisplayObjects() {
        this.createSpriteset();
        this.createMapNameWindow();
        this.createWindowLayer();
        this.createAllWindows();
    };

    createSpriteset() {
        this._spriteset = new Spriteset_Map();
        this.addChild(this._spriteset);
    };

    createAllWindows() {
        this.createMessageWindow();
        this.createScrollTextWindow();
    };

    createMapNameWindow() {
        this._mapNameWindow = new Window_MapName();
        this.addChild(this._mapNameWindow);
    };

    createMessageWindow() {
        this._messageWindow = new Window_Message();
        this.addWindow(this._messageWindow);
        for (const window of this._messageWindow.subWindows()) {
            this.addWindow(window);
        }
    };

    createScrollTextWindow() {
        this._scrollTextWindow = new Window_ScrollText();
        this.addWindow(this._scrollTextWindow);
    };

    updateTransferPlayer() {
        if ($gamePlayer.isTransferring()) {
            SceneManager.goto(Scene_Map);
        }
    };

    updateEncounter() {
        if ($gamePlayer.executeEncounter()) {
            SceneManager.push(Scene_Battle);
        }
    };

    updateCallMenu() {
        if (this.isMenuEnabled()) {
            if (this.isMenuCalled()) {
                this.menuCalling = true;
            }
            if (this.menuCalling && !$gamePlayer.isMoving()) {
                this.callMenu();
            }
        } else {
            this.menuCalling = false;
        }
    };

    isMenuEnabled() {
        return $gameSystem.isMenuEnabled() && !$gameMap.isEventRunning();
    };

    isMenuCalled() {
        return Input.isTriggered('menu');
    };

    callMenu() {
        SoundManager.playOk();
        SceneManager.push(Scene_Menu);
        Window_MenuCommand.initCommandPosition();
        $gameTemp.clearDestination();
        this._mapNameWindow.hide();
        this._waitCount = 2;
    };

    updateCallDebug() {
        if (this.isDebugCalled()) {
            SceneManager.push(Scene_Debug);
        }
    };

    isDebugCalled() {
        return Input.isTriggered('debug') && $gameTemp.isPlaytest();
    };

    fadeInForTransfer() {
        const fadeType = $gamePlayer.fadeType();
        switch (fadeType) {
            case 0: case 1:
                this.startFadeIn(this.fadeSpeed(), fadeType === 1);
                break;
        }
    };

    fadeOutForTransfer() {
        const fadeType = $gamePlayer.fadeType();
        switch (fadeType) {
            case 0: case 1:
                this.startFadeOut(this.fadeSpeed(), fadeType === 1);
                break;
        }
    };

    launchBattle() {
        BattleManager.saveBgmAndBgs();
        this.stopAudioOnBattleStart();
        SoundManager.playBattleStart();
        this.startEncounterEffect();
        this._mapNameWindow.hide();
    };

    stopAudioOnBattleStart() {
        if (!AudioManager.isCurrentBgm($gameSystem.battleBgm())) {
            AudioManager.stopBgm();
        }
        AudioManager.stopBgs();
        AudioManager.stopMe();
        AudioManager.stopSe();
    };

    startEncounterEffect() {
        this._spriteset.hideCharacters();
        this._encounterEffectDuration = this.encounterEffectSpeed();
    };

    updateEncounterEffect() {
        if (this._encounterEffectDuration > 0) {
            this._encounterEffectDuration--;
            const speed = this.encounterEffectSpeed();
            const n = speed - this._encounterEffectDuration;
            const p = n / speed;
            const q = ((p - 1) * 20 * p + 5) * p + 1;
            const zoomX = $gamePlayer.screenX();
            const zoomY = $gamePlayer.screenY() - 24;
            if (n === 2) {
                $gameScreen.setZoom(zoomX, zoomY, 1);
                this.snapForBattleBackground();
                this.startFlashForEncounter(speed / 2);
            }
            $gameScreen.setZoom(zoomX, zoomY, q);
            if (n === Math.floor(speed / 6)) {
                this.startFlashForEncounter(speed / 2);
            }
            if (n === Math.floor(speed / 2)) {
                BattleManager.playBattleBgm();
                this.startFadeOut(this.fadeSpeed());
            }
        }
    };

    snapForBattleBackground() {
        this._windowLayer.visible = false;
        SceneManager.snapForBackground();
        this._windowLayer.visible = true;
    };

    startFlashForEncounter(duration) {
        const color = [255, 255, 255, 255];
        $gameScreen.startFlash(color, duration);
    };

    encounterEffectSpeed() {
        return 60;
    };
};

//-----------------------------------------------------------------------------

// Scene_MenuBase
//
// The superclass of all the menu-type scenes.
class Scene_MenuBase extends Scene_Base {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize() {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize();
    };

    create() {
        super.create();
        this.createBackground();
        this.updateActor();
        this.createWindowLayer();
    };

    actor() {
        return this._actor;
    };

    updateActor() {
        this._actor = $gameParty.menuActor();
    };

    createBackground() {
        this._backgroundSprite = new Sprite();
        this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
        this.addChild(this._backgroundSprite);
    };

    setBackgroundOpacity(opacity) {
        this._backgroundSprite.opacity = opacity;
    };

    createHelpWindow() {
        this._helpWindow = new Window_Help();
        this.addWindow(this._helpWindow);
    };

    nextActor() {
        $gameParty.makeMenuActorNext();
        this.updateActor();
        this.onActorChange();
    };

    previousActor() {
        $gameParty.makeMenuActorPrevious();
        this.updateActor();
        this.onActorChange();
    };

    onActorChange() { };
};

//-----------------------------------------------------------------------------

// Scene_Menu
//
// The scene class of the menu screen.
var Scene_Menu = class extends Scene_MenuBase {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize() {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize();
    };

    create() {
        super.create();
        this.createCommandWindow();
        this.createGoldWindow();
        this.createStatusWindow();
    };

    start() {
        super.start();
        this._statusWindow.refresh();
    };

    createCommandWindow() {
        this._commandWindow = new Window_MenuCommand(0, 0);
        this._commandWindow.setHandler('item', this.commandItem.bind(this));
        this._commandWindow.setHandler('skill', this.commandPersonal.bind(this));
        this._commandWindow.setHandler('equip', this.commandPersonal.bind(this));
        this._commandWindow.setHandler('status', this.commandPersonal.bind(this));
        this._commandWindow.setHandler('formation', this.commandFormation.bind(this));
        this._commandWindow.setHandler('options', this.commandOptions.bind(this));
        this._commandWindow.setHandler('save', this.commandSave.bind(this));
        this._commandWindow.setHandler('gameEnd', this.commandGameEnd.bind(this));
        this._commandWindow.setHandler('cancel', this.popScene.bind(this));
        this.addWindow(this._commandWindow);
    };

    createGoldWindow() {
        this._goldWindow = new Window_Gold(0, 0);
        this._goldWindow.y = Graphics.boxHeight - this._goldWindow.height;
        this.addWindow(this._goldWindow);
    };

    createStatusWindow() {
        this._statusWindow = new Window_MenuStatus(this._commandWindow.width, 0);
        this._statusWindow.reserveFaceImages();
        this.addWindow(this._statusWindow);
    };

    commandItem() {
        SceneManager.push(Scene_Item);
    };

    commandPersonal() {
        this._statusWindow.setFormationMode(false);
        this._statusWindow.selectLast();
        this._statusWindow.activate();
        this._statusWindow.setHandler('ok', this.onPersonalOk.bind(this));
        this._statusWindow.setHandler('cancel', this.onPersonalCancel.bind(this));
    };

    commandFormation() {
        this._statusWindow.setFormationMode(true);
        this._statusWindow.selectLast();
        this._statusWindow.activate();
        this._statusWindow.setHandler('ok', this.onFormationOk.bind(this));
        this._statusWindow.setHandler('cancel', this.onFormationCancel.bind(this));
    };

    commandOptions() {
        SceneManager.push(Scene_Options);
    };

    commandSave() {
        SceneManager.push(Scene_Save);
    };

    commandGameEnd() {
        SceneManager.push(Scene_GameEnd);
    };

    onPersonalOk() {
        switch (this._commandWindow.currentSymbol()) {
            case 'skill':
                SceneManager.push(Scene_Skill);
                break;
            case 'equip':
                SceneManager.push(Scene_Equip);
                break;
            case 'status':
                SceneManager.push(Scene_Status);
                break;
        }
    };

    onPersonalCancel() {
        this._statusWindow.deselect();
        this._commandWindow.activate();
    };

    onFormationOk() {
        const index = this._statusWindow.index();
        const actor = $gameParty.members()[index];
        const pendingIndex = this._statusWindow.pendingIndex();
        if (pendingIndex >= 0) {
            $gameParty.swapOrder(index, pendingIndex);
            this._statusWindow.setPendingIndex(-1);
            this._statusWindow.redrawItem(index);
        } else {
            this._statusWindow.setPendingIndex(index);
        }
        this._statusWindow.activate();
    };

    onFormationCancel() {
        if (this._statusWindow.pendingIndex() >= 0) {
            this._statusWindow.setPendingIndex(-1);
            this._statusWindow.activate();
        } else {
            this._statusWindow.deselect();
            this._commandWindow.activate();
        }
    };
};

//-----------------------------------------------------------------------------

// Scene_ItemBase
//
// The superclass of Scene_Item and Scene_Skill.
class Scene_ItemBase extends Scene_MenuBase {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize() {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize();
    };

    create() {
        super.create();
    };

    createActorWindow() {
        this._actorWindow = new Window_MenuActor();
        this._actorWindow.setHandler('ok', this.onActorOk.bind(this));
        this._actorWindow.setHandler('cancel', this.onActorCancel.bind(this));
        this.addWindow(this._actorWindow);
    };

    item() {
        return this._itemWindow.item();
    };

    user() {
        return null;
    };

    isCursorLeft() {
        return this._itemWindow.index() % 2 === 0;
    };

    showSubWindow(window) {
        window.x = this.isCursorLeft() ? Graphics.boxWidth - window.width : 0;
        window.show();
        window.activate();
    };

    hideSubWindow(window) {
        window.hide();
        window.deactivate();
        this.activateItemWindow();
    };

    onActorOk() {
        if (this.canUse()) {
            this.useItem();
        } else {
            SoundManager.playBuzzer();
        }
    };

    onActorCancel() {
        this.hideSubWindow(this._actorWindow);
    };

    determineItem() {
        const action = new Game_Action(this.user());
        const item = this.item();
        action.setItemObject(item);
        if (action.isForFriend()) {
            this.showSubWindow(this._actorWindow);
            this._actorWindow.selectForItem(this.item());
        } else {
            this.useItem();
            this.activateItemWindow();
        }
    };

    useItem() {
        this.playSeForItem();
        this.user().useItem(this.item());
        this.applyItem();
        this.checkCommonEvent();
        this.checkGameover();
        this._actorWindow.refresh();
    };

    activateItemWindow() {
        this._itemWindow.refresh();
        this._itemWindow.activate();
    };

    itemTargetActors() {
        const action = new Game_Action(this.user());
        action.setItemObject(this.item());
        if (!action.isForFriend()) {
            return [];
        } else if (action.isForAll()) {
            return $gameParty.members();
        } else {
            return [$gameParty.members()[this._actorWindow.index()]];
        }
    };

    canUse() {
        return this.user().canUse(this.item()) && this.isItemEffectsValid();
    };

    isItemEffectsValid() {
        const action = new Game_Action(this.user());
        action.setItemObject(this.item());
        return this.itemTargetActors().some(target => action.testApply(target));
    };

    applyItem() {
        const action = new Game_Action(this.user());
        action.setItemObject(this.item());
        
        for (const target of this.itemTargetActors()) {
            for (let i = 0; i < action.numRepeats(); i++) {
                action.apply(target);
            }
        };
        action.applyGlobal();
    };

    checkCommonEvent() {
        if ($gameTemp.isCommonEventReserved()) {
            SceneManager.goto(Scene_Map);
        }
    };
};

//-----------------------------------------------------------------------------

// Scene_Item
//
// The scene class of the item screen.
var Scene_Item = class extends Scene_ItemBase {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize() {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize();
    };

    create() {
        super.create();
        this.createHelpWindow();
        this.createCategoryWindow();
        this.createItemWindow();
        this.createActorWindow();
    };

    createCategoryWindow() {
        this._categoryWindow = new Window_ItemCategory();
        this._categoryWindow.setHelpWindow(this._helpWindow);
        this._categoryWindow.y = this._helpWindow.height;
        this._categoryWindow.setHandler('ok', this.onCategoryOk.bind(this));
        this._categoryWindow.setHandler('cancel', this.popScene.bind(this));
        this.addWindow(this._categoryWindow);
    };

    createItemWindow() {
        const wy = this._categoryWindow.y + this._categoryWindow.height;
        const wh = Graphics.boxHeight - wy;
        this._itemWindow = new Window_ItemList(0, wy, Graphics.boxWidth, wh);
        this._itemWindow.setHelpWindow(this._helpWindow);
        this._itemWindow.setHandler('ok', this.onItemOk.bind(this));
        this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
        this.addWindow(this._itemWindow);
        this._categoryWindow.setItemWindow(this._itemWindow);
    };

    user() {
        const members = $gameParty.movableMembers();
        let bestActor = members[0];
        let bestPha = 0;
        for (let i = 0; i < members.length; i++) {
            if (members[i].pha > bestPha) {
                bestPha = members[i].pha;
                bestActor = members[i];
            }
        }
        return bestActor;
    };

    onCategoryOk() {
        this._itemWindow.activate();
        this._itemWindow.selectLast();
    };

    onItemOk() {
        $gameParty.setLastItem(this.item());
        this.determineItem();
    };

    onItemCancel() {
        this._itemWindow.deselect();
        this._categoryWindow.activate();
    };

    playSeForItem() {
        SoundManager.playUseItem();
    };

    useItem() {
        super.useItem();
        this._itemWindow.redrawCurrentItem();
    };
};

//-----------------------------------------------------------------------------

// Scene_Skill
//
// The scene class of the skill screen.
var Scene_Skill = class extends Scene_ItemBase {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize() {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize();
    };

    create() {
        super.create();
        this.createHelpWindow();
        this.createSkillTypeWindow();
        this.createStatusWindow();
        this.createItemWindow();
        this.createActorWindow();
    };

    start() {
        super.start();
        this.refreshActor();
    };

    createSkillTypeWindow() {
        const wy = this._helpWindow.height;
        this._skillTypeWindow = new Window_SkillType(0, wy);
        this._skillTypeWindow.setHelpWindow(this._helpWindow);
        this._skillTypeWindow.setHandler('skill', this.commandSkill.bind(this));
        this._skillTypeWindow.setHandler('cancel', this.popScene.bind(this));
        this._skillTypeWindow.setHandler('pagedown', this.nextActor.bind(this));
        this._skillTypeWindow.setHandler('pageup', this.previousActor.bind(this));
        this.addWindow(this._skillTypeWindow);
    };

    createStatusWindow() {
        const wx = this._skillTypeWindow.width;
        const wy = this._helpWindow.height;
        const ww = Graphics.boxWidth - wx;
        const wh = this._skillTypeWindow.height;
        this._statusWindow = new Window_SkillStatus(wx, wy, ww, wh);
        this._statusWindow.reserveFaceImages();
        this.addWindow(this._statusWindow);
    };

    createItemWindow() {
        const wx = 0;
        const wy = this._statusWindow.y + this._statusWindow.height;
        const ww = Graphics.boxWidth;
        const wh = Graphics.boxHeight - wy;
        this._itemWindow = new Window_SkillList(wx, wy, ww, wh);
        this._itemWindow.setHelpWindow(this._helpWindow);
        this._itemWindow.setHandler('ok', this.onItemOk.bind(this));
        this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
        this._skillTypeWindow.setSkillWindow(this._itemWindow);
        this.addWindow(this._itemWindow);
    };

    refreshActor() {
        const actor = this.actor();
        this._skillTypeWindow.setActor(actor);
        this._statusWindow.setActor(actor);
        this._itemWindow.setActor(actor);
    };

    user() {
        return this.actor();
    };

    commandSkill() {
        this._itemWindow.activate();
        this._itemWindow.selectLast();
    };

    onItemOk() {
        this.actor().setLastMenuSkill(this.item());
        this.determineItem();
    };

    onItemCancel() {
        this._itemWindow.deselect();
        this._skillTypeWindow.activate();
    };

    playSeForItem() {
        SoundManager.playUseSkill();
    };

    useItem() {
        super.useItem();
        this._statusWindow.refresh();
        this._itemWindow.refresh();
    };

    onActorChange() {
        this.refreshActor();
        this._skillTypeWindow.activate();
    };
};

//-----------------------------------------------------------------------------

// Scene_Equip
//
// The scene class of the equipment screen.
var Scene_Equip = class extends Scene_MenuBase {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize() {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize();
    };

    create() {
        super.create();
        this.createHelpWindow();
        this.createStatusWindow();
        this.createCommandWindow();
        this.createSlotWindow();
        this.createItemWindow();
        this.refreshActor();
    };

    createStatusWindow() {
        this._statusWindow = new Window_EquipStatus(0, this._helpWindow.height);
        this.addWindow(this._statusWindow);
    };

    createCommandWindow() {
        const wx = this._statusWindow.width;
        const wy = this._helpWindow.height;
        const ww = Graphics.boxWidth - this._statusWindow.width;
        this._commandWindow = new Window_EquipCommand(wx, wy, ww);
        this._commandWindow.setHelpWindow(this._helpWindow);
        this._commandWindow.setHandler('equip', this.commandEquip.bind(this));
        this._commandWindow.setHandler('optimize', this.commandOptimize.bind(this));
        this._commandWindow.setHandler('clear', this.commandClear.bind(this));
        this._commandWindow.setHandler('cancel', this.popScene.bind(this));
        this._commandWindow.setHandler('pagedown', this.nextActor.bind(this));
        this._commandWindow.setHandler('pageup', this.previousActor.bind(this));
        this.addWindow(this._commandWindow);
    };

    createSlotWindow() {
        const wx = this._statusWindow.width;
        const wy = this._commandWindow.y + this._commandWindow.height;
        const ww = Graphics.boxWidth - this._statusWindow.width;
        const wh = this._statusWindow.height - this._commandWindow.height;
        this._slotWindow = new Window_EquipSlot(wx, wy, ww, wh);
        this._slotWindow.setHelpWindow(this._helpWindow);
        this._slotWindow.setStatusWindow(this._statusWindow);
        this._slotWindow.setHandler('ok', this.onSlotOk.bind(this));
        this._slotWindow.setHandler('cancel', this.onSlotCancel.bind(this));
        this.addWindow(this._slotWindow);
    };

    createItemWindow() {
        const wx = 0;
        const wy = this._statusWindow.y + this._statusWindow.height;
        const ww = Graphics.boxWidth;
        const wh = Graphics.boxHeight - wy;
        this._itemWindow = new Window_EquipItem(wx, wy, ww, wh);
        this._itemWindow.setHelpWindow(this._helpWindow);
        this._itemWindow.setStatusWindow(this._statusWindow);
        this._itemWindow.setHandler('ok', this.onItemOk.bind(this));
        this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
        this._slotWindow.setItemWindow(this._itemWindow);
        this.addWindow(this._itemWindow);
    };

    refreshActor() {
        const actor = this.actor();
        this._statusWindow.setActor(actor);
        this._slotWindow.setActor(actor);
        this._itemWindow.setActor(actor);
    };

    commandEquip() {
        this._slotWindow.activate();
        this._slotWindow.select(0);
    };

    commandOptimize() {
        SoundManager.playEquip();
        this.actor().optimizeEquipments();
        this._statusWindow.refresh();
        this._slotWindow.refresh();
        this._commandWindow.activate();
    };

    commandClear() {
        SoundManager.playEquip();
        this.actor().clearEquipments();
        this._statusWindow.refresh();
        this._slotWindow.refresh();
        this._commandWindow.activate();
    };

    onSlotOk() {
        this._itemWindow.activate();
        this._itemWindow.select(0);
    };

    onSlotCancel() {
        this._slotWindow.deselect();
        this._commandWindow.activate();
    };

    onItemOk() {
        SoundManager.playEquip();
        this.actor().changeEquip(this._slotWindow.index(), this._itemWindow.item());
        this._slotWindow.activate();
        this._slotWindow.refresh();
        this._itemWindow.deselect();
        this._itemWindow.refresh();
        this._statusWindow.refresh();
    };

    onItemCancel() {
        this._slotWindow.activate();
        this._itemWindow.deselect();
    };

    onActorChange() {
        this.refreshActor();
        this._commandWindow.activate();
    };
};

//-----------------------------------------------------------------------------

// Scene_Status
//
// The scene class of the status screen.
var Scene_Status = class extends Scene_MenuBase {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize() {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize();
    };

    create() {
        super.create();
        this._statusWindow = new Window_Status();
        this._statusWindow.setHandler('cancel', this.popScene.bind(this));
        this._statusWindow.setHandler('pagedown', this.nextActor.bind(this));
        this._statusWindow.setHandler('pageup', this.previousActor.bind(this));
        this._statusWindow.reserveFaceImages();
        this.addWindow(this._statusWindow);
    };

    start() {
        super.start();
        this.refreshActor();
    };

    refreshActor() {
        const actor = this.actor();
        this._statusWindow.setActor(actor);
    };

    onActorChange() {
        this.refreshActor();
        this._statusWindow.activate();
    };
};

//-----------------------------------------------------------------------------

// Scene_Options
//
// The scene class of the options screen.
var Scene_Options = class extends Scene_MenuBase {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize() {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize();
    };

    create() {
        super.create();
        this.createOptionsWindow();
    };

    terminate() {
        super.terminate();
        ConfigManager.save();
    };

    createOptionsWindow() {
        this._optionsWindow = new Window_Options();
        this._optionsWindow.setHandler('cancel', this.popScene.bind(this));
        this.addWindow(this._optionsWindow);
    };
};

//-----------------------------------------------------------------------------

// Scene_File
//
// The superclass of Scene_Save and Scene_Load.
class Scene_File extends Scene_MenuBase {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize() {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize();
    };

    create() {
        super.create();
        DataManager.loadAllSavefileImages();
        this.createHelpWindow();
        this.createListWindow();
    };

    start() {
        super.start();
        this._listWindow.refresh();
    };

    savefileId() {
        return this._listWindow.index() + 1;
    };

    createHelpWindow() {
        this._helpWindow = new Window_Help(1);
        this._helpWindow.setText(this.helpWindowText());
        this.addWindow(this._helpWindow);
    };

    createListWindow() {
        const x = 0;
        const y = this._helpWindow.height;
        const width = Graphics.boxWidth;
        const height = Graphics.boxHeight - y;
        this._listWindow = new Window_SavefileList(x, y, width, height);
        this._listWindow.setHandler('ok', this.onSavefileOk.bind(this));
        this._listWindow.setHandler('cancel', this.popScene.bind(this));
        this._listWindow.select(this.firstSavefileIndex());
        this._listWindow.setTopRow(this.firstSavefileIndex() - 2);
        this._listWindow.setMode(this.mode());
        this._listWindow.refresh();
        this.addWindow(this._listWindow);
    };

    mode() {
        return null;
    };

    activateListWindow() {
        this._listWindow.activate();
    };

    helpWindowText() {
        return '';
    };

    firstSavefileIndex() {
        return 0;
    };

    onSavefileOk() { };
};

//-----------------------------------------------------------------------------

// Scene_Save
//
// The scene class of the save screen.
var Scene_Save = class extends Scene_File {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize() {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize();
    };

    mode() {
        return 'save';
    };

    helpWindowText() {
        return TextManager.saveMessage;
    };

    firstSavefileIndex() {
        return DataManager.lastAccessedSavefileId() - 1;
    };

    onSavefileOk() {
        super.onSavefileOk();
        $gameSystem.onBeforeSave();
        if (DataManager.saveGame(this.savefileId())) {
            this.onSaveSuccess();
        } else {
            this.onSaveFailure();
        }
    };

    onSaveSuccess() {
        SoundManager.playSave();
        StorageManager.cleanBackup(this.savefileId());
        this.popScene();
    };

    onSaveFailure() {
        SoundManager.playBuzzer();
        this.activateListWindow();
    };
};

//-----------------------------------------------------------------------------

// Scene_Load
//
// The scene class of the load screen.
var Scene_Load = class extends Scene_File {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize() {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize();
        this._loadSuccess = false;
    };

    terminate() {
        super.terminate();
        if (this._loadSuccess) {
            $gameSystem.onAfterLoad();
        }
    };

    mode() {
        return 'load';
    };

    helpWindowText() {
        return TextManager.loadMessage;
    };

    firstSavefileIndex() {
        return DataManager.latestSavefileId() - 1;
    };

    onSavefileOk() {
        super.onSavefileOk();
        if (DataManager.loadGame(this.savefileId())) {
            this.onLoadSuccess();
        } else {
            this.onLoadFailure();
        }
    };

    onLoadSuccess() {
        SoundManager.playLoad();
        this.fadeOutAll();
        this.reloadMapIfUpdated();
        SceneManager.goto(Scene_Map);
        this._loadSuccess = true;
    };

    onLoadFailure() {
        SoundManager.playBuzzer();
        this.activateListWindow();
    };

    reloadMapIfUpdated() {
        if ($gameSystem.versionId() !== $dataSystem.versionId) {
            $gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
            $gamePlayer.requestMapReload();
        }
    };
};

//-----------------------------------------------------------------------------

// Scene_GameEnd
//
// The scene class of the game end screen.
var Scene_GameEnd = class extends Scene_MenuBase {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize() {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize();
    };

    create() {
        super.create();
        this.createCommandWindow();
    };

    stop() {
        super.stop();
        this._commandWindow.close();
    };

    createBackground() {
        super.createBackground();
        this.setBackgroundOpacity(128);
    };

    createCommandWindow() {
        this._commandWindow = new Window_GameEnd();
        this._commandWindow.setHandler('toTitle', this.commandToTitle.bind(this));
        this._commandWindow.setHandler('cancel', this.popScene.bind(this));
        this.addWindow(this._commandWindow);
    };

    commandToTitle() {
        this.fadeOutAll();
        SceneManager.goto(Scene_Title);
    };
};

//-----------------------------------------------------------------------------

// Scene_Shop
//
// The scene class of the shop screen.
var Scene_Shop = class extends Scene_MenuBase {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize() {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize();
    };

    prepare(goods, purchaseOnly) {
        this._goods = goods;
        this._purchaseOnly = purchaseOnly;
        this._item = null;
    };

    create() {
        super.create();
        this.createHelpWindow();
        this.createGoldWindow();
        this.createCommandWindow();
        this.createDummyWindow();
        this.createNumberWindow();
        this.createStatusWindow();
        this.createBuyWindow();
        this.createCategoryWindow();
        this.createSellWindow();
    };

    createGoldWindow() {
        this._goldWindow = new Window_Gold(0, this._helpWindow.height);
        this._goldWindow.x = Graphics.boxWidth - this._goldWindow.width;
        this.addWindow(this._goldWindow);
    };

    createCommandWindow() {
        this._commandWindow = new Window_ShopCommand(this._goldWindow.x, this._purchaseOnly);
        this._commandWindow.y = this._helpWindow.height;
        this._commandWindow.setHandler('buy', this.commandBuy.bind(this));
        this._commandWindow.setHandler('sell', this.commandSell.bind(this));
        this._commandWindow.setHandler('cancel', this.popScene.bind(this));
        this.addWindow(this._commandWindow);
    };

    createDummyWindow() {
        const wy = this._commandWindow.y + this._commandWindow.height;
        const wh = Graphics.boxHeight - wy;
        this._dummyWindow = new Window_Base(0, wy, Graphics.boxWidth, wh);
        this.addWindow(this._dummyWindow);
    };

    createNumberWindow() {
        const wy = this._dummyWindow.y;
        const wh = this._dummyWindow.height;
        this._numberWindow = new Window_ShopNumber(0, wy, wh);
        this._numberWindow.hide();
        this._numberWindow.setHandler('ok', this.onNumberOk.bind(this));
        this._numberWindow.setHandler('cancel', this.onNumberCancel.bind(this));
        this.addWindow(this._numberWindow);
    };

    createStatusWindow() {
        const wx = this._numberWindow.width;
        const wy = this._dummyWindow.y;
        const ww = Graphics.boxWidth - wx;
        const wh = this._dummyWindow.height;
        this._statusWindow = new Window_ShopStatus(wx, wy, ww, wh);
        this._statusWindow.hide();
        this.addWindow(this._statusWindow);
    };

    createBuyWindow() {
        const wy = this._dummyWindow.y;
        const wh = this._dummyWindow.height;
        this._buyWindow = new Window_ShopBuy(0, wy, wh, this._goods);
        this._buyWindow.setHelpWindow(this._helpWindow);
        this._buyWindow.setStatusWindow(this._statusWindow);
        this._buyWindow.hide();
        this._buyWindow.setHandler('ok', this.onBuyOk.bind(this));
        this._buyWindow.setHandler('cancel', this.onBuyCancel.bind(this));
        this.addWindow(this._buyWindow);
    };

    createCategoryWindow() {
        this._categoryWindow = new Window_ItemCategory();
        this._categoryWindow.setHelpWindow(this._helpWindow);
        this._categoryWindow.y = this._dummyWindow.y;
        this._categoryWindow.hide();
        this._categoryWindow.deactivate();
        this._categoryWindow.setHandler('ok', this.onCategoryOk.bind(this));
        this._categoryWindow.setHandler('cancel', this.onCategoryCancel.bind(this));
        this.addWindow(this._categoryWindow);
    };

    createSellWindow() {
        const wy = this._categoryWindow.y + this._categoryWindow.height;
        const wh = Graphics.boxHeight - wy;
        this._sellWindow = new Window_ShopSell(0, wy, Graphics.boxWidth, wh);
        this._sellWindow.setHelpWindow(this._helpWindow);
        this._sellWindow.hide();
        this._sellWindow.setHandler('ok', this.onSellOk.bind(this));
        this._sellWindow.setHandler('cancel', this.onSellCancel.bind(this));
        this._categoryWindow.setItemWindow(this._sellWindow);
        this.addWindow(this._sellWindow);
    };

    activateBuyWindow() {
        this._buyWindow.setMoney(this.money());
        this._buyWindow.show();
        this._buyWindow.activate();
        this._statusWindow.show();
    };

    activateSellWindow() {
        this._categoryWindow.show();
        this._sellWindow.refresh();
        this._sellWindow.show();
        this._sellWindow.activate();
        this._statusWindow.hide();
    };

    commandBuy() {
        this._dummyWindow.hide();
        this.activateBuyWindow();
    };

    commandSell() {
        this._dummyWindow.hide();
        this._categoryWindow.show();
        this._categoryWindow.activate();
        this._sellWindow.show();
        this._sellWindow.deselect();
        this._sellWindow.refresh();
    };

    onBuyOk() {
        this._item = this._buyWindow.item();
        this._buyWindow.hide();
        this._numberWindow.setup(this._item, this.maxBuy(), this.buyingPrice());
        this._numberWindow.setCurrencyUnit(this.currencyUnit());
        this._numberWindow.show();
        this._numberWindow.activate();
    };

    onBuyCancel() {
        this._commandWindow.activate();
        this._dummyWindow.show();
        this._buyWindow.hide();
        this._statusWindow.hide();
        this._statusWindow.setItem(null);
        this._helpWindow.clear();
    };

    onCategoryOk() {
        this.activateSellWindow();
        this._sellWindow.select(0);
    };

    onCategoryCancel() {
        this._commandWindow.activate();
        this._dummyWindow.show();
        this._categoryWindow.hide();
        this._sellWindow.hide();
    };

    onSellOk() {
        this._item = this._sellWindow.item();
        this._categoryWindow.hide();
        this._sellWindow.hide();
        this._numberWindow.setup(this._item, this.maxSell(), this.sellingPrice());
        this._numberWindow.setCurrencyUnit(this.currencyUnit());
        this._numberWindow.show();
        this._numberWindow.activate();
        this._statusWindow.setItem(this._item);
        this._statusWindow.show();
    };

    onSellCancel() {
        this._sellWindow.deselect();
        this._categoryWindow.activate();
        this._statusWindow.setItem(null);
        this._helpWindow.clear();
    };

    onNumberOk() {
        SoundManager.playShop();
        switch (this._commandWindow.currentSymbol()) {
            case 'buy':
                this.doBuy(this._numberWindow.number());
                break;
            case 'sell':
                this.doSell(this._numberWindow.number());
                break;
        }
        this.endNumberInput();
        this._goldWindow.refresh();
        this._statusWindow.refresh();
    };

    onNumberCancel() {
        SoundManager.playCancel();
        this.endNumberInput();
    };

    doBuy(number) {
        $gameParty.loseGold(number * this.buyingPrice());
        $gameParty.gainItem(this._item, number);
    };

    doSell(number) {
        $gameParty.gainGold(number * this.sellingPrice());
        $gameParty.loseItem(this._item, number);
    };

    endNumberInput() {
        this._numberWindow.hide();
        switch (this._commandWindow.currentSymbol()) {
            case 'buy':
                this.activateBuyWindow();
                break;
            case 'sell':
                this.activateSellWindow();
                break;
        }
    };

    maxBuy() {
        const max = $gameParty.maxItems(this._item) - $gameParty.numItems(this._item);
        const price = this.buyingPrice();
        if (price > 0) {
            return Math.min(max, Math.floor(this.money() / price));
        } else {
            return max;
        }
    };

    maxSell() {
        return $gameParty.numItems(this._item);
    };

    money() {
        return this._goldWindow.value();
    };

    currencyUnit() {
        return this._goldWindow.currencyUnit();
    };

    buyingPrice() {
        return this._buyWindow.price(this._item);
    };

    sellingPrice() {
        return Math.floor(this._item.price / 2);
    };
};

//-----------------------------------------------------------------------------

// Scene_Name
//
// The scene class of the name input screen.
var Scene_Name = class extends Scene_MenuBase {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize() {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize();
    };

    prepare(actorId, maxLength) {
        this._actorId = actorId;
        this._maxLength = maxLength;
    };

    create() {
        super.create();
        this._actor = $gameActors.actor(this._actorId);
        this.createEditWindow();
        this.createInputWindow();
    };

    start() {
        super.start();
        this._editWindow.refresh();
    };

    createEditWindow() {
        this._editWindow = new Window_NameEdit(this._actor, this._maxLength);
        this.addWindow(this._editWindow);
    };

    createInputWindow() {
        this._inputWindow = new Window_NameInput(this._editWindow);
        this._inputWindow.setHandler('ok', this.onInputOk.bind(this));
        this.addWindow(this._inputWindow);
    };

    onInputOk() {
        this._actor.setName(this._editWindow.name());
        this.popScene();
    };
};

//-----------------------------------------------------------------------------

// Scene_Debug
//
// The scene class of the debug screen.
var Scene_Debug = class extends Scene_MenuBase {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize() {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize();
    };

    create() {
        super.create();
        this.createRangeWindow();
        this.createEditWindow();
        this.createDebugHelpWindow();
    };

    createRangeWindow() {
        this._rangeWindow = new Window_DebugRange(0, 0);
        this._rangeWindow.setHandler('ok', this.onRangeOk.bind(this));
        this._rangeWindow.setHandler('cancel', this.popScene.bind(this));
        this.addWindow(this._rangeWindow);
    };

    createEditWindow() {
        const wx = this._rangeWindow.width;
        const ww = Graphics.boxWidth - wx;
        this._editWindow = new Window_DebugEdit(wx, 0, ww);
        this._editWindow.setHandler('cancel', this.onEditCancel.bind(this));
        this._rangeWindow.setEditWindow(this._editWindow);
        this.addWindow(this._editWindow);
    };

    createDebugHelpWindow() {
        const wx = this._editWindow.x;
        const wy = this._editWindow.height;
        const ww = this._editWindow.width;
        const wh = Graphics.boxHeight - wy;
        this._debugHelpWindow = new Window_Base(wx, wy, ww, wh);
        this.addWindow(this._debugHelpWindow);
    };

    onRangeOk() {
        this._editWindow.activate();
        this._editWindow.select(0);
        this.refreshHelpWindow();
    };

    onEditCancel() {
        this._rangeWindow.activate();
        this._editWindow.deselect();
        this.refreshHelpWindow();
    };

    refreshHelpWindow() {
        this._debugHelpWindow.contents.clear();
        if (this._editWindow.active) {
            this._debugHelpWindow.drawTextEx(this.helpText(), 4, 0);
        }
    };

    helpText() {
        if (this._rangeWindow.mode() === 'switch') {
            return 'Enter : ON / OFF';
        } else {
            return ('Left     :  -1\n' +
                'Right    :  +1\n' +
                'Pageup   : -10\n' +
                'Pagedown : +10');
        }
    };
};

//-----------------------------------------------------------------------------

// Scene_Battle
//
// The scene class of the battle screen.
var Scene_Battle = class extends Scene_Base {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize() {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize();
    };

    create() {
        super.create();
        this.createDisplayObjects();
    };

    start() {
        super.start();
        this.startFadeIn(this.fadeSpeed(), false);
        BattleManager.playBattleBgm();
        BattleManager.startBattle();
    };

    update() {
        const active = this.isActive();
        $gameTimer.update(active);
        $gameScreen.update();
        this.updateStatusWindow();
        this.updateWindowPositions();
        if (active && !this.isBusy()) {
            this.updateBattleProcess();
        }
        super.update();
    };

    updateBattleProcess() {
        if (!this.isAnyInputWindowActive() || BattleManager.isAborting() ||
            BattleManager.isBattleEnd()) {
            BattleManager.update();
            this.changeInputWindow();
        }
    };

    isAnyInputWindowActive() {
        return (this._partyCommandWindow.active ||
            this._actorCommandWindow.active ||
            this._skillWindow.active ||
            this._itemWindow.active ||
            this._actorWindow.active ||
            this._enemyWindow.active);
    };

    changeInputWindow() {
        if (BattleManager.isInputting()) {
            if (BattleManager.actor()) {
                this.startActorCommandSelection();
            } else {
                this.startPartyCommandSelection();
            }
        } else {
            this.endCommandSelection();
        }
    };

    stop() {
        super.stop();
        if (this.needsSlowFadeOut()) {
            this.startFadeOut(this.slowFadeSpeed(), false);
        } else {
            this.startFadeOut(this.fadeSpeed(), false);
        }
        this._statusWindow.close();
        this._partyCommandWindow.close();
        this._actorCommandWindow.close();
    };

    terminate() {
        super.terminate();
        $gameParty.onBattleEnd();
        $gameTroop.onBattleEnd();
        AudioManager.stopMe();

        ImageManager.clearRequest();
    };

    needsSlowFadeOut() {
        return (SceneManager.isNextScene(Scene_Title) ||
            SceneManager.isNextScene(Scene_Gameover));
    };

    updateStatusWindow() {
        if ($gameMessage.isBusy()) {
            this._statusWindow.close();
            this._partyCommandWindow.close();
            this._actorCommandWindow.close();
        } else if (this.isActive() && !this._messageWindow.isClosing()) {
            this._statusWindow.open();
        }
    };

    updateWindowPositions() {
        let statusX = 0;
        if (BattleManager.isInputting()) {
            statusX = this._partyCommandWindow.width;
        } else {
            statusX = this._partyCommandWindow.width / 2;
        }
        if (this._statusWindow.x < statusX) {
            this._statusWindow.x += 16;
            if (this._statusWindow.x > statusX) {
                this._statusWindow.x = statusX;
            }
        }
        if (this._statusWindow.x > statusX) {
            this._statusWindow.x -= 16;
            if (this._statusWindow.x < statusX) {
                this._statusWindow.x = statusX;
            }
        }
    };

    createDisplayObjects() {
        this.createSpriteset();
        this.createWindowLayer();
        this.createAllWindows();
        BattleManager.setLogWindow(this._logWindow);
        BattleManager.setStatusWindow(this._statusWindow);
        BattleManager.setSpriteset(this._spriteset);
        this._logWindow.setSpriteset(this._spriteset);
    };

    createSpriteset() {
        this._spriteset = new Spriteset_Battle();
        this.addChild(this._spriteset);
    };

    createAllWindows() {
        this.createLogWindow();
        this.createStatusWindow();
        this.createPartyCommandWindow();
        this.createActorCommandWindow();
        this.createHelpWindow();
        this.createSkillWindow();
        this.createItemWindow();
        this.createActorWindow();
        this.createEnemyWindow();
        this.createMessageWindow();
        this.createScrollTextWindow();
    };

    createLogWindow() {
        this._logWindow = new Window_BattleLog();
        this.addWindow(this._logWindow);
    };

    createStatusWindow() {
        this._statusWindow = new Window_BattleStatus();
        this.addWindow(this._statusWindow);
    };

    createPartyCommandWindow() {
        this._partyCommandWindow = new Window_PartyCommand();
        this._partyCommandWindow.setHandler('fight', this.commandFight.bind(this));
        this._partyCommandWindow.setHandler('escape', this.commandEscape.bind(this));
        this._partyCommandWindow.deselect();
        this.addWindow(this._partyCommandWindow);
    };

    createActorCommandWindow() {
        this._actorCommandWindow = new Window_ActorCommand();
        this._actorCommandWindow.setHandler('attack', this.commandAttack.bind(this));
        this._actorCommandWindow.setHandler('skill', this.commandSkill.bind(this));
        this._actorCommandWindow.setHandler('guard', this.commandGuard.bind(this));
        this._actorCommandWindow.setHandler('item', this.commandItem.bind(this));
        this._actorCommandWindow.setHandler('cancel', this.selectPreviousCommand.bind(this));
        this.addWindow(this._actorCommandWindow);
    };

    createHelpWindow() {
        this._helpWindow = new Window_Help();
        this._helpWindow.visible = false;
        this.addWindow(this._helpWindow);
    };

    createSkillWindow() {
        const wy = this._helpWindow.y + this._helpWindow.height;
        const wh = this._statusWindow.y - wy;
        this._skillWindow = new Window_BattleSkill(0, wy, Graphics.boxWidth, wh);
        this._skillWindow.setHelpWindow(this._helpWindow);
        this._skillWindow.setHandler('ok', this.onSkillOk.bind(this));
        this._skillWindow.setHandler('cancel', this.onSkillCancel.bind(this));
        this.addWindow(this._skillWindow);
    };

    createItemWindow() {
        const wy = this._helpWindow.y + this._helpWindow.height;
        const wh = this._statusWindow.y - wy;
        this._itemWindow = new Window_BattleItem(0, wy, Graphics.boxWidth, wh);
        this._itemWindow.setHelpWindow(this._helpWindow);
        this._itemWindow.setHandler('ok', this.onItemOk.bind(this));
        this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
        this.addWindow(this._itemWindow);
    };

    createActorWindow() {
        this._actorWindow = new Window_BattleActor(0, this._statusWindow.y);
        this._actorWindow.setHandler('ok', this.onActorOk.bind(this));
        this._actorWindow.setHandler('cancel', this.onActorCancel.bind(this));
        this.addWindow(this._actorWindow);
    };

    createEnemyWindow() {
        this._enemyWindow = new Window_BattleEnemy(0, this._statusWindow.y);
        this._enemyWindow.x = Graphics.boxWidth - this._enemyWindow.width;
        this._enemyWindow.setHandler('ok', this.onEnemyOk.bind(this));
        this._enemyWindow.setHandler('cancel', this.onEnemyCancel.bind(this));
        this.addWindow(this._enemyWindow);
    };

    createMessageWindow() {
        this._messageWindow = new Window_Message();
        this.addWindow(this._messageWindow);
        for (const window of this._messageWindow.subWindows()) {
            this.addWindow(window);
        };
    };

    createScrollTextWindow() {
        this._scrollTextWindow = new Window_ScrollText();
        this.addWindow(this._scrollTextWindow);
    };

    refreshStatus() {
        this._statusWindow.refresh();
    };

    startPartyCommandSelection() {
        this.refreshStatus();
        this._statusWindow.deselect();
        this._statusWindow.open();
        this._actorCommandWindow.close();
        this._partyCommandWindow.setup();
    };

    commandFight() {
        this.selectNextCommand();
    };

    commandEscape() {
        BattleManager.processEscape();
        this.changeInputWindow();
    };

    startActorCommandSelection() {
        this._statusWindow.select(BattleManager.actor().index());
        this._partyCommandWindow.close();
        this._actorCommandWindow.setup(BattleManager.actor());
    };

    commandAttack() {
        BattleManager.inputtingAction().setAttack();
        this.selectEnemySelection();
    };

    commandSkill() {
        this._skillWindow.setActor(BattleManager.actor());
        this._skillWindow.setStypeId(this._actorCommandWindow.currentExt());
        this._skillWindow.refresh();
        this._skillWindow.show();
        this._skillWindow.activate();
    };

    commandGuard() {
        BattleManager.inputtingAction().setGuard();
        this.selectNextCommand();
    };

    commandItem() {
        this._itemWindow.refresh();
        this._itemWindow.show();
        this._itemWindow.activate();
    };

    selectNextCommand() {
        BattleManager.selectNextCommand();
        this.changeInputWindow();
    };

    selectPreviousCommand() {
        BattleManager.selectPreviousCommand();
        this.changeInputWindow();
    };

    selectActorSelection() {
        this._actorWindow.refresh();
        this._actorWindow.show();
        this._actorWindow.activate();
    };

    onActorOk() {
        const action = BattleManager.inputtingAction();
        action.setTarget(this._actorWindow.index());
        this._actorWindow.hide();
        this._skillWindow.hide();
        this._itemWindow.hide();
        this.selectNextCommand();
    };

    onActorCancel() {
        this._actorWindow.hide();
        switch (this._actorCommandWindow.currentSymbol()) {
            case 'skill':
                this._skillWindow.show();
                this._skillWindow.activate();
                break;
            case 'item':
                this._itemWindow.show();
                this._itemWindow.activate();
                break;
        }
    };

    selectEnemySelection() {
        this._enemyWindow.refresh();
        this._enemyWindow.show();
        this._enemyWindow.select(0);
        this._enemyWindow.activate();
    };

    onEnemyOk() {
        const action = BattleManager.inputtingAction();
        action.setTarget(this._enemyWindow.enemyIndex());
        this._enemyWindow.hide();
        this._skillWindow.hide();
        this._itemWindow.hide();
        this.selectNextCommand();
    };

    onEnemyCancel() {
        this._enemyWindow.hide();
        switch (this._actorCommandWindow.currentSymbol()) {
            case 'attack':
                this._actorCommandWindow.activate();
                break;
            case 'skill':
                this._skillWindow.show();
                this._skillWindow.activate();
                break;
            case 'item':
                this._itemWindow.show();
                this._itemWindow.activate();
                break;
        }
    };

    onSkillOk() {
        const skill = this._skillWindow.item();
        const action = BattleManager.inputtingAction();
        action.setSkill(skill.id);
        BattleManager.actor().setLastBattleSkill(skill);
        this.onSelectAction();
    };

    onSkillCancel() {
        this._skillWindow.hide();
        this._actorCommandWindow.activate();
    };

    onItemOk() {
        const item = this._itemWindow.item();
        const action = BattleManager.inputtingAction();
        action.setItem(item.id);
        $gameParty.setLastItem(item);
        this.onSelectAction();
    };

    onItemCancel() {
        this._itemWindow.hide();
        this._actorCommandWindow.activate();
    };

    onSelectAction() {
        const action = BattleManager.inputtingAction();
        this._skillWindow.hide();
        this._itemWindow.hide();
        if (!action.needsSelection()) {
            this.selectNextCommand();
        } else if (action.isForOpponent()) {
            this.selectEnemySelection();
        } else {
            this.selectActorSelection();
        }
    };

    endCommandSelection() {
        this._partyCommandWindow.close();
        this._actorCommandWindow.close();
        this._statusWindow.deselect();
    };
};

//-----------------------------------------------------------------------------

// Scene_Gameover
//
// The scene class of the game over screen.
var Scene_Gameover = class extends Scene_Base {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize() {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize();
    };

    create() {
        super.create();
        this.playGameoverMusic();
        this.createBackground();
    };

    start() {
        super.start();
        this.startFadeIn(this.slowFadeSpeed(), false);
    };

    update() {
        if (this.isActive() && !this.isBusy() && this.isTriggered()) {
            this.gotoTitle();
        }
        super.update();
    };

    stop() {
        super.stop();
        this.fadeOutAll();
    };

    terminate() {
        super.terminate();
        AudioManager.stopAll();
    };

    playGameoverMusic() {
        AudioManager.stopBgm();
        AudioManager.stopBgs();
        AudioManager.playMe($dataSystem.gameoverMe);
    };

    createBackground() {
        this._backSprite = new Sprite();
        this._backSprite.bitmap = ImageManager.loadSystem('GameOver');
        this.addChild(this._backSprite);
    };

    isTriggered() {
        return Input.isTriggered('ok') || TouchInput.isTriggered();
    };

    gotoTitle() {
        SceneManager.goto(Scene_Title);
    };
};

//=============================================================================