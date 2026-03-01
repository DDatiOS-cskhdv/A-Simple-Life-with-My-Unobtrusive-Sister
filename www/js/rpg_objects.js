//=============================================================================
// rpg_objects.js v1.6.2
//=============================================================================

//=============================================================================

// Game_Temp
//
// The game object class for temporary data that is not included in save data.
var Game_Temp = class {
    constructor(...args) {
        this.initialize(...args);
    };

    initialize() {
        this._isPlaytest = Utils.isOptionValid('test');
        this._commonEventId = 0;
        this._destinationX = null;
        this._destinationY = null;
    };

    isPlaytest() {
        return this._isPlaytest;
    };

    reserveCommonEvent(commonEventId) {
        this._commonEventId = commonEventId;
    };

    clearCommonEvent() {
        this._commonEventId = 0;
    };

    isCommonEventReserved() {
        return this._commonEventId > 0;
    };

    reservedCommonEvent() {
        return $dataCommonEvents[this._commonEventId];
    };

    setDestination(x, y) {
        this._destinationX = x;
        this._destinationY = y;
    };

    clearDestination() {
        this._destinationX = null;
        this._destinationY = null;
    };

    isDestinationValid() {
        return this._destinationX !== null;
    };

    destinationX() {
        return this._destinationX;
    };

    destinationY() {
        return this._destinationY;
    };
};

//-----------------------------------------------------------------------------

// Game_System
//
// The game object class for the system data.
var Game_System = class {
    constructor(...args) {
        this.initialize(...args);
    };

    initialize() {
        this._saveEnabled = true;
        this._menuEnabled = true;
        this._encounterEnabled = true;
        this._formationEnabled = true;
        this._battleCount = 0;
        this._winCount = 0;
        this._escapeCount = 0;
        this._saveCount = 0;
        this._versionId = 0;
        this._framesOnSave = 0;
        this._bgmOnSave = null;
        this._bgsOnSave = null;
        this._windowTone = null;
        this._battleBgm = null;
        this._victoryMe = null;
        this._defeatMe = null;
        this._savedBgm = null;
        this._walkingBgm = null;
    };

    isJapanese() {
        return $dataSystem.locale.match(/^ja/);
    };

    isChinese() {
        return $dataSystem.locale.match(/^zh/);
    };

    isKorean() {
        return $dataSystem.locale.match(/^ko/);
    };

    isCJK() {
        return $dataSystem.locale.match(/^(ja|zh|ko)/);
    };

    isRussian() {
        return $dataSystem.locale.match(/^ru/);
    };

    isSideView() {
        return $dataSystem.optSideView;
    };

    isSaveEnabled() {
        return this._saveEnabled;
    };

    disableSave() {
        this._saveEnabled = false;
    };

    enableSave() {
        this._saveEnabled = true;
    };

    isMenuEnabled() {
        return this._menuEnabled;
    };

    disableMenu() {
        this._menuEnabled = false;
    };

    enableMenu() {
        this._menuEnabled = true;
    };

    isEncounterEnabled() {
        return this._encounterEnabled;
    };

    disableEncounter() {
        this._encounterEnabled = false;
    };

    enableEncounter() {
        this._encounterEnabled = true;
    };

    isFormationEnabled() {
        return this._formationEnabled;
    };

    disableFormation() {
        this._formationEnabled = false;
    };

    enableFormation() {
        this._formationEnabled = true;
    };

    battleCount() {
        return this._battleCount;
    };

    winCount() {
        return this._winCount;
    };

    escapeCount() {
        return this._escapeCount;
    };

    saveCount() {
        return this._saveCount;
    };

    versionId() {
        return this._versionId;
    };

    windowTone() {
        return this._windowTone || $dataSystem.windowTone;
    };

    setWindowTone(value) {
        this._windowTone = value;
    };

    battleBgm() {
        return this._battleBgm || $dataSystem.battleBgm;
    };

    setBattleBgm(value) {
        this._battleBgm = value;
    };

    victoryMe() {
        return this._victoryMe || $dataSystem.victoryMe;
    };

    setVictoryMe(value) {
        this._victoryMe = value;
    };

    defeatMe() {
        return this._defeatMe || $dataSystem.defeatMe;
    };

    setDefeatMe(value) {
        this._defeatMe = value;
    };

    onBattleStart() {
        this._battleCount++;
    };

    onBattleWin() {
        this._winCount++;
    };

    onBattleEscape() {
        this._escapeCount++;
    };

    onBeforeSave() {
        this._saveCount++;
        this._versionId = $dataSystem.versionId;
        this._framesOnSave = Graphics.frameCount;
        this._bgmOnSave = AudioManager.saveBgm();
        this._bgsOnSave = AudioManager.saveBgs();
    };

    onAfterLoad() {
        Graphics.frameCount = this._framesOnSave;
        AudioManager.playBgm(this._bgmOnSave);
        AudioManager.playBgs(this._bgsOnSave);
    };

    playtime() {
        return Math.floor(Graphics.frameCount / 60);
    };

    playtimeText() {
        const hour = Math.floor(this.playtime() / 60 / 60);
        const min = Math.floor(this.playtime() / 60) % 60;
        const sec = this.playtime() % 60;
        return `${hour.padZero(2)}:${min.padZero(2)}:${sec.padZero(2)}`;
    };

    saveBgm() {
        this._savedBgm = AudioManager.saveBgm();
    };

    replayBgm() {
        if (this._savedBgm) {
            AudioManager.replayBgm(this._savedBgm);
        }
    };

    saveWalkingBgm() {
        this._walkingBgm = AudioManager.saveBgm();
    };

    replayWalkingBgm() {
        if (this._walkingBgm) {
            AudioManager.playBgm(this._walkingBgm);
        }
    };

    saveWalkingBgm2() {
        this._walkingBgm = $dataMap.bgm;
    };
};

//-----------------------------------------------------------------------------

// Game_Timer
//
// The game object class for the timer.
var Game_Timer = class {
    constructor(...args) {
        this.initialize(...args);
    };

    initialize() {
        this._frames = 0;
        this._working = false;
    };

    update(sceneActive) {
        if (sceneActive && this._working && this._frames > 0) {
            this._frames--;
            if (this._frames === 0) {
                this.onExpire();
            }
        }
    };

    start(count) {
        this._frames = count;
        this._working = true;
    };

    stop() {
        this._working = false;
    };

    isWorking() {
        return this._working;
    };

    seconds() {
        return Math.floor(this._frames / 60);
    };

    onExpire() {
        BattleManager.abort();
    };
};

//-----------------------------------------------------------------------------

// Game_Message
//
// The game object class for the state of the message window that displays text
// or selections, etc.
var Game_Message = class {
    constructor(...args) {
        this.initialize(...args);
    };

    initialize() {
        this.clear();
    };

    clear() {
        this._texts = [];
        this._choices = [];
        this._faceName = '';
        this._faceIndex = 0;
        this._background = 0;
        this._positionType = 2;
        this._choiceDefaultType = 0;
        this._choiceCancelType = 0;
        this._choiceBackground = 0;
        this._choicePositionType = 2;
        this._numInputVariableId = 0;
        this._numInputMaxDigits = 0;
        this._itemChoiceVariableId = 0;
        this._itemChoiceItypeId = 0;
        this._scrollMode = false;
        this._scrollSpeed = 2;
        this._scrollNoFast = false;
        this._choiceCallback = null;
    };

    choices() {
        return this._choices;
    };

    faceName() {
        return this._faceName;
    };

    faceIndex() {
        return this._faceIndex;
    };

    background() {
        return this._background;
    };

    positionType() {
        return this._positionType;
    };

    choiceDefaultType() {
        return this._choiceDefaultType;
    };

    choiceCancelType() {
        return this._choiceCancelType;
    };

    choiceBackground() {
        return this._choiceBackground;
    };

    choicePositionType() {
        return this._choicePositionType;
    };

    numInputVariableId() {
        return this._numInputVariableId;
    };

    numInputMaxDigits() {
        return this._numInputMaxDigits;
    };

    itemChoiceVariableId() {
        return this._itemChoiceVariableId;
    };

    itemChoiceItypeId() {
        return this._itemChoiceItypeId;
    };

    scrollMode() {
        return this._scrollMode;
    };

    scrollSpeed() {
        return this._scrollSpeed;
    };

    scrollNoFast() {
        return this._scrollNoFast;
    };

    add(text) {
        this._texts.push(text);
    };

    setFaceImage(faceName, faceIndex) {
        this._faceName = faceName;
        this._faceIndex = faceIndex;
    };

    setBackground(background) {
        this._background = background;
    };

    setPositionType(positionType) {
        this._positionType = positionType;
    };

    setChoices(choices, defaultType, cancelType) {
        this._choices = choices;
        this._choiceDefaultType = defaultType;
        this._choiceCancelType = cancelType;
    };

    setChoiceBackground(background) {
        this._choiceBackground = background;
    };

    setChoicePositionType(positionType) {
        this._choicePositionType = positionType;
    };

    setNumberInput(variableId, maxDigits) {
        this._numInputVariableId = variableId;
        this._numInputMaxDigits = maxDigits;
    };

    setItemChoice(variableId, itemType) {
        this._itemChoiceVariableId = variableId;
        this._itemChoiceItypeId = itemType;
    };

    setScroll(speed, noFast) {
        this._scrollMode = true;
        this._scrollSpeed = speed;
        this._scrollNoFast = noFast;
    };

    setChoiceCallback(callback) {
        this._choiceCallback = callback;
    };

    onChoice(n) {
        if (this._choiceCallback) {
            this._choiceCallback(n);
            this._choiceCallback = null;
        }
    };

    hasText() {
        return this._texts.length > 0;
    };

    isChoice() {
        return this._choices.length > 0;
    };

    isNumberInput() {
        return this._numInputVariableId > 0;
    };

    isItemChoice() {
        return this._itemChoiceVariableId > 0;
    };

    isBusy() {
        return (this.hasText() || this.isChoice() ||
            this.isNumberInput() || this.isItemChoice());
    };

    newPage() {
        if (this._texts.length > 0) {
            this._texts[this._texts.length - 1] += '\f';
        }
    };

    allText() {
        return this._texts.join('\n');
    };
};

//-----------------------------------------------------------------------------

// Game_Switches
//
// The game object class for switches.
var Game_Switches = class {
    constructor(...args) {
        this.initialize(...args);
    };

    initialize() {
        this.clear();
    };

    clear() {
        this._data = [];
    };

    value(switchId) {
        return !!this._data[switchId];
    };

    setValue(switchId, value) {
        if (switchId > 0 && switchId < $dataSystem.switches.length) {
            this._data[switchId] = value;
            this.onChange();
        }
    };

    onChange() {
        $gameMap.requestRefresh();
    };
};

//-----------------------------------------------------------------------------

// Game_Variables
//
// The game object class for variables.
var Game_Variables = class {
    constructor(...args) {
        this.initialize(...args);
    };

    initialize() {
        this.clear();
    };

    clear() {
        this._data = [];
    };

    value(variableId) {
        return this._data[variableId] || 0;
    };

    setValue(variableId, value) {
        if (variableId > 0 && variableId < $dataSystem.variables.length) {
            if (typeof value === 'number') {
                value = Math.floor(value);
            }
            this._data[variableId] = value;
            this.onChange();
        }
    };

    addValue(variableId, value) {
        if (variableId > 0 && variableId < $dataSystem.variables.length) {
            const currentValue = Number(this._data[variableId] || 0);
            const newValue = Math.floor(currentValue + value);
            this.setValue(variableId, newValue);
        }
    };


    onChange() {
        $gameMap.requestRefresh();
    };
};

//-----------------------------------------------------------------------------

// Game_SelfSwitches
//
// The game object class for self switches.
var Game_SelfSwitches = class {
    constructor(...args) {
        this.initialize(...args);
    };

    initialize() {
        this.clear();
    };

    clear() {
        this._data = {};
    };

    value(key) {
        return !!this._data[key];
    };

    setValue(key, value) {
        if (value) {
            this._data[key] = true;
        } else {
            delete this._data[key];
        }
        this.onChange();
    };

    onChange() {
        $gameMap.requestRefresh();
    };
};

//-----------------------------------------------------------------------------

// Game_Screen
//
// The game object class for screen effect data, such as changes in color tone
// and flashes.
var Game_Screen = class {
    constructor(...args) {
        this.initialize(...args);
    };

    initialize() {
        this.clear();
    };

    clear() {
        this.clearFade();
        this.clearTone();
        this.clearFlash();
        this.clearShake();
        this.clearZoom();
        this.clearWeather();
        this.clearPictures();
    };

    onBattleStart() {
        this.clearFade();
        this.clearFlash();
        this.clearShake();
        this.clearZoom();
        this.eraseBattlePictures();
    };

    brightness() {
        return this._brightness;
    };

    tone() {
        return this._tone;
    };

    flashColor() {
        return this._flashColor;
    };

    shake() {
        return this._shake;
    };

    zoomX() {
        return this._zoomX;
    };

    zoomY() {
        return this._zoomY;
    };

    zoomScale() {
        return this._zoomScale;
    };

    weatherType() {
        return this._weatherType;
    };

    weatherPower() {
        return this._weatherPower;
    };

    picture(pictureId) {
        const realPictureId = this.realPictureId(pictureId);
        return this._pictures[realPictureId];
    };

    realPictureId(pictureId) {
        if ($gameParty.inBattle()) {
            return pictureId + this.maxPictures();
        } else {
            return pictureId;
        }
    };

    clearFade() {
        this._brightness = 255;
        this._fadeOutDuration = 0;
        this._fadeInDuration = 0;
    };

    clearTone() {
        this._tone = [0, 0, 0, 0];
        this._toneTarget = [0, 0, 0, 0];
        this._toneDuration = 0;
    };

    clearFlash() {
        this._flashColor = [0, 0, 0, 0];
        this._flashDuration = 0;
    };

    clearShake() {
        this._shakePower = 0;
        this._shakeSpeed = 0;
        this._shakeDuration = 0;
        this._shakeDirection = 1;
        this._shake = 0;
    };

    clearZoom() {
        this._zoomX = 0;
        this._zoomY = 0;
        this._zoomScale = 1;
        this._zoomScaleTarget = 1;
        this._zoomDuration = 0;
    };

    clearWeather() {
        this._weatherType = 'none';
        this._weatherPower = 0;
        this._weatherPowerTarget = 0;
        this._weatherDuration = 0;
    };

    clearPictures() {
        this._pictures = [];
    };

    eraseBattlePictures() {
        this._pictures = this._pictures.slice(0, this.maxPictures() + 1);
    };

    maxPictures() {
        return 120;
    };

    startFadeOut(duration) {
        this._fadeOutDuration = duration;
        this._fadeInDuration = 0;
    };

    startFadeIn(duration) {
        this._fadeInDuration = duration;
        this._fadeOutDuration = 0;
    };

    startTint(tone, duration) {
        this._toneTarget = tone.clone();
        this._toneDuration = duration;
        if (this._toneDuration === 0) {
            this._tone = this._toneTarget.clone();
        }
    };

    startFlash(color, duration) {
        this._flashColor = color.clone();
        this._flashDuration = duration;
    };

    startShake(power, speed, duration) {
        this._shakePower = power;
        this._shakeSpeed = speed;
        this._shakeDuration = duration;
    };

    startZoom(x, y, scale, duration) {
        this._zoomX = x;
        this._zoomY = y;
        this._zoomScaleTarget = scale;
        this._zoomDuration = duration;
    };

    setZoom(x, y, scale) {
        this._zoomX = x;
        this._zoomY = y;
        this._zoomScale = scale;
    };

    changeWeather(type, power, duration) {
        if (type !== 'none' || duration === 0) {
            this._weatherType = type;
        }
        this._weatherPowerTarget = type === 'none' ? 0 : power;
        this._weatherDuration = duration;
        if (duration === 0) {
            this._weatherPower = this._weatherPowerTarget;
        }
    };

    update() {
        this.updateFadeOut();
        this.updateFadeIn();
        this.updateTone();
        this.updateFlash();
        this.updateShake();
        this.updateZoom();
        this.updateWeather();
        this.updatePictures();
    };

    updateFadeOut() {
        if (this._fadeOutDuration > 0) {
            const d = this._fadeOutDuration;
            this._brightness = (this._brightness * (d - 1)) / d;
            this._fadeOutDuration--;
        }
    };

    updateFadeIn() {
        if (this._fadeInDuration > 0) {
            const d = this._fadeInDuration;
            this._brightness = (this._brightness * (d - 1) + 255) / d;
            this._fadeInDuration--;
        }
    };

    updateTone() {
        if (this._toneDuration > 0) {
            const d = this._toneDuration;
            for (let i = 0; i < 4; i++) {
                this._tone[i] = (this._tone[i] * (d - 1) + this._toneTarget[i]) / d;
            }
            this._toneDuration--;
        }
    };

    updateFlash() {
        if (this._flashDuration > 0) {
            const d = this._flashDuration;
            this._flashColor[3] *= (d - 1) / d;
            this._flashDuration--;
        }
    };

    updateShake() {
        if (this._shakeDuration > 0 || this._shake !== 0) {
            const delta = (this._shakePower * this._shakeSpeed * this._shakeDirection) / 10;
            if (this._shakeDuration <= 1 && this._shake * (this._shake + delta) < 0) {
                this._shake = 0;
            } else {
                this._shake += delta;
            }
            if (this._shake > this._shakePower * 2) {
                this._shakeDirection = -1;
            }
            if (this._shake < - this._shakePower * 2) {
                this._shakeDirection = 1;
            }
            this._shakeDuration--;
        }
    };

    updateZoom() {
        if (this._zoomDuration > 0) {
            const d = this._zoomDuration;
            const t = this._zoomScaleTarget;
            this._zoomScale = (this._zoomScale * (d - 1) + t) / d;
            this._zoomDuration--;
        }
    };

    updateWeather() {
        if (this._weatherDuration > 0) {
            const d = this._weatherDuration;
            const t = this._weatherPowerTarget;
            this._weatherPower = (this._weatherPower * (d - 1) + t) / d;
            this._weatherDuration--;
            if (this._weatherDuration === 0 && this._weatherPowerTarget === 0) {
                this._weatherType = 'none';
            }
        }
    };

    updatePictures() {
        for (const picture of this._pictures) {
            picture && picture.update();
        }
    };

    startFlashForDamage() {
        this.startFlash([255, 0, 0, 128], 8);
    };

    showPicture(pictureId, name, origin, x, y, scaleX, scaleY, opacity, blendMode) {
        const realPictureId = this.realPictureId(pictureId);
        const picture = new Game_Picture();
        picture.show(name, origin, x, y, scaleX, scaleY, opacity, blendMode);
        this._pictures[realPictureId] = picture;
    };

    movePicture(pictureId, origin, x, y, scaleX, scaleY, opacity, blendMode, duration) {
        const picture = this.picture(pictureId);
        if (picture) {
            picture.move(origin, x, y, scaleX, scaleY, opacity, blendMode, duration);
        }
    };

    rotatePicture(pictureId, speed) {
        const picture = this.picture(pictureId);
        if (picture) {
            picture.rotate(speed);
        }
    };

    tintPicture(pictureId, tone, duration) {
        const picture = this.picture(pictureId);
        if (picture) {
            picture.tint(tone, duration);
        }
    };

    erasePicture(pictureId) {
        const realPictureId = this.realPictureId(pictureId);
        this._pictures[realPictureId] = null;

    };
};

//-----------------------------------------------------------------------------

// Game_Picture
//
// The game object class for a picture.
var Game_Picture = class {
    constructor(...args) {
        this.initialize(...args);
    };

    initialize() {
        this.initBasic();
        this.initTarget();
        this.initTone();
        this.initRotation();
    };

    name() {
        return this._name;
    };

    origin() {
        return this._origin;
    };

    x() {
        return this._x;
    };

    y() {
        return this._y;
    };

    scaleX() {
        return this._scaleX;
    };

    scaleY() {
        return this._scaleY;
    };

    opacity() {
        return this._opacity;
    };

    blendMode() {
        return this._blendMode;
    };

    tone() {
        return this._tone;
    };

    angle() {
        return this._angle;
    };

    initBasic() {
        this._name = '';
        this._origin = 0;
        this._x = 0;
        this._y = 0;
        this._scaleX = 100;
        this._scaleY = 100;
        this._opacity = 255;
        this._blendMode = 0;
    };

    initTarget() {
        this._targetX = this._x;
        this._targetY = this._y;
        this._targetScaleX = this._scaleX;
        this._targetScaleY = this._scaleY;
        this._targetOpacity = this._opacity;
        this._duration = 0;
    };

    initTone() {
        this._tone = null;
        this._toneTarget = null;
        this._toneDuration = 0;
    };

    initRotation() {
        this._angle = 0;
        this._rotationSpeed = 0;
    };

    show(name, origin, x, y, scaleX, scaleY, opacity, blendMode) {
        this._name = name;
        this._origin = origin;
        this._x = x;
        this._y = y;
        this._scaleX = scaleX;
        this._scaleY = scaleY;
        this._opacity = opacity;
        this._blendMode = blendMode;
        this.initTarget();
        this.initTone();
        this.initRotation();
    };

    move(origin, x, y, scaleX, scaleY, opacity, blendMode, duration) {
        this._origin = origin;
        this._targetX = x;
        this._targetY = y;
        this._targetScaleX = scaleX;
        this._targetScaleY = scaleY;
        this._targetOpacity = opacity;
        this._blendMode = blendMode;
        this._duration = duration;
    };

    rotate(speed) {
        this._rotationSpeed = speed;
    };

    tint(tone, duration) {
        if (!this._tone) {
            this._tone = [0, 0, 0, 0];
        }
        this._toneTarget = tone.clone();
        this._toneDuration = duration;
        if (this._toneDuration === 0) {
            this._tone = this._toneTarget.clone();
        }
    };

    erase() {
        this._name = '';
        this._origin = 0;
        this.initTarget();
        this.initTone();
        this.initRotation();
    };

    update() {
        this.updateMove();
        this.updateTone();
        this.updateRotation();
    };

    updateMove() {
        if (this._duration > 0) {
            const d = this._duration;
            this._x = (this._x * (d - 1) + this._targetX) / d;
            this._y = (this._y * (d - 1) + this._targetY) / d;
            this._scaleX = (this._scaleX * (d - 1) + this._targetScaleX) / d;
            this._scaleY = (this._scaleY * (d - 1) + this._targetScaleY) / d;
            this._opacity = (this._opacity * (d - 1) + this._targetOpacity) / d;
            this._duration--;
        }
    };

    updateTone() {
        if (this._toneDuration > 0) {
            const d = this._toneDuration;
            for (let i = 0; i < 4; i++) {
                this._tone[i] = (this._tone[i] * (d - 1) + this._toneTarget[i]) / d;
            }
            this._toneDuration--;
        }
    };

    updateRotation() {
        if (this._rotationSpeed !== 0) {
            this._angle += this._rotationSpeed / 2;
        }
    };
};

//-----------------------------------------------------------------------------

// Game_Item
//
// The game object class for handling skills, items, weapons, and armor. It is
// required because save data should not include the database object itself.
var Game_Item = class {
    constructor(...args) {
        this.initialize(...args);
    };

    initialize(item) {
        this._dataClass = '';
        this._itemId = 0;
        if (item) this.setObject(item);
    };

    isSkill() {
        return this._dataClass === 'skill';
    };

    isItem() {
        return this._dataClass === 'item';
    };

    isUsableItem() {
        return this.isSkill() || this.isItem();
    };

    isWeapon() {
        return this._dataClass === 'weapon';
    };

    isArmor() {
        return this._dataClass === 'armor';
    };

    isEquipItem() {
        return this.isWeapon() || this.isArmor();
    };

    isNull() {
        return this._dataClass === '';
    };

    itemId() {
        return this._itemId;
    };

    object() {
        if (this.isSkill()) {
            return $dataSkills[this._itemId];
        } else if (this.isItem()) {
            return $dataItems[this._itemId];
        } else if (this.isWeapon()) {
            return $dataWeapons[this._itemId];
        } else if (this.isArmor()) {
            return $dataArmors[this._itemId];
        } else {
            return null;
        }
    };

    setObject(item) {
        if (DataManager.isSkill(item)) {
            this._dataClass = 'skill';
        } else if (DataManager.isItem(item)) {
            this._dataClass = 'item';
        } else if (DataManager.isWeapon(item)) {
            this._dataClass = 'weapon';
        } else if (DataManager.isArmor(item)) {
            this._dataClass = 'armor';
        } else {
            this._dataClass = '';
        }
        this._itemId = item ? item.id : 0;
    };

    setEquip(isWeapon, itemId) {
        this._dataClass = isWeapon ? 'weapon' : 'armor';
        this._itemId = itemId;
    };
};

//-----------------------------------------------------------------------------

// Game_Action
//
// The game object class for a battle action.
var Game_Action = class {
    constructor(...args) {
        this.initialize(...args);
    };

    static EFFECT_RECOVER_HP = 11;
    static EFFECT_RECOVER_MP = 12;
    static EFFECT_GAIN_TP = 13;
    static EFFECT_ADD_STATE = 21;
    static EFFECT_REMOVE_STATE = 22;
    static EFFECT_ADD_BUFF = 31;
    static EFFECT_ADD_DEBUFF = 32;
    static EFFECT_REMOVE_BUFF = 33;
    static EFFECT_REMOVE_DEBUFF = 34;
    static EFFECT_SPECIAL = 41;
    static EFFECT_GROW = 42;
    static EFFECT_LEARN_SKILL = 43;
    static EFFECT_COMMON_EVENT = 44;
    static SPECIAL_EFFECT_ESCAPE = 0;
    static HITTYPE_CERTAIN = 0;
    static HITTYPE_PHYSICAL = 1;
    static HITTYPE_MAGICAL = 2;

    initialize(subject, forcing) {
        this._subjectActorId = 0;
        this._subjectEnemyIndex = -1;
        this._forcing = forcing || false;
        this.setSubject(subject);
        this.clear();
    };

    clear() {
        this._item = new Game_Item();
        this._targetIndex = -1;
    };

    setSubject(subject) {
        if (subject.isActor()) {
            this._subjectActorId = subject.actorId();
            this._subjectEnemyIndex = -1;
        } else {
            this._subjectEnemyIndex = subject.index();
            this._subjectActorId = 0;
        }
    };

    subject() {
        if (this._subjectActorId > 0) {
            return $gameActors.actor(this._subjectActorId);
        } else {
            return $gameTroop.members()[this._subjectEnemyIndex];
        }
    };

    friendsUnit() {
        return this.subject().friendsUnit();
    };

    opponentsUnit() {
        return this.subject().opponentsUnit();
    };

    setEnemyAction(action) {
        if (action) {
            this.setSkill(action.skillId);
        } else {
            this.clear();
        }
    };

    setAttack() {
        this.setSkill(this.subject().attackSkillId());
    };

    setGuard() {
        this.setSkill(this.subject().guardSkillId());
    };

    setSkill(skillId) {
        this._item.setObject($dataSkills[skillId]);
    };

    setItem(itemId) {
        this._item.setObject($dataItems[itemId]);
    };

    setItemObject(object) {
        this._item.setObject(object);
    };

    setTarget(targetIndex) {
        this._targetIndex = targetIndex;
    };

    item() {
        return this._item.object();
    };

    isSkill() {
        return this._item.isSkill();
    };

    isItem() {
        return this._item.isItem();
    };

    numRepeats() {
        let repeats = this.item().repeats;
        if (this.isAttack()) {
            repeats += this.subject().attackTimesAdd();
        }
        return Math.floor(repeats);
    };

    checkItemScope(list) {
        return list.contains(this.item().scope);
    };

    isForOpponent() {
        return this.checkItemScope([1, 2, 3, 4, 5, 6]);
    };

    isForFriend() {
        return this.checkItemScope([7, 8, 9, 10, 11]);
    };

    isForDeadFriend() {
        return this.checkItemScope([9, 10]);
    };

    isForUser() {
        return this.checkItemScope([11]);
    };

    isForOne() {
        return this.checkItemScope([1, 3, 7, 9, 11]);
    };

    isForRandom() {
        return this.checkItemScope([3, 4, 5, 6]);
    };

    isForAll() {
        return this.checkItemScope([2, 8, 10]);
    };

    needsSelection() {
        return this.checkItemScope([1, 7, 9]);
    };

    numTargets() {
        return this.isForRandom() ? this.item().scope - 2 : 0;
    };

    checkDamageType(list) {
        return list.contains(this.item().damage.type);
    };

    isHpEffect() {
        return this.checkDamageType([1, 3, 5]);
    };

    isMpEffect() {
        return this.checkDamageType([2, 4, 6]);
    };

    isDamage() {
        return this.checkDamageType([1, 2]);
    };

    isRecover() {
        return this.checkDamageType([3, 4]);
    };

    isDrain() {
        return this.checkDamageType([5, 6]);
    };

    isHpRecover() {
        return this.checkDamageType([3]);
    };

    isMpRecover() {
        return this.checkDamageType([4]);
    };

    isCertainHit() {
        return this.item().hitType === Game_Action.HITTYPE_CERTAIN;
    };

    isPhysical() {
        return this.item().hitType === Game_Action.HITTYPE_PHYSICAL;
    };

    isMagical() {
        return this.item().hitType === Game_Action.HITTYPE_MAGICAL;
    };

    isAttack() {
        return this.item() === $dataSkills[this.subject().attackSkillId()];
    };

    isGuard() {
        return this.item() === $dataSkills[this.subject().guardSkillId()];
    };

    isMagicSkill() {
        if (this.isSkill()) {
            return $dataSystem.magicSkills.contains(this.item().stypeId);
        } else {
            return false;
        }
    };

    decideRandomTarget() {
        let target;
        if (this.isForDeadFriend()) {
            target = this.friendsUnit().randomDeadTarget();
        } else if (this.isForFriend()) {
            target = this.friendsUnit().randomTarget();
        } else {
            target = this.opponentsUnit().randomTarget();
        }
        if (target) {
            this._targetIndex = target.index();
        } else {
            this.clear();
        }
    };

    setConfusion() {
        this.setAttack();
    };

    prepare() {
        if (this.subject().isConfused() && !this._forcing) {
            this.setConfusion();
        }
    };

    isValid() {
        return (this._forcing && this.item()) || this.subject().canUse(this.item());
    };

    speed() {
        const agi = this.subject().agi;
        let speed = agi + Math.randomInt(Math.floor(5 + agi / 4));
        if (this.item()) {
            speed += this.item().speed;
        }
        if (this.isAttack()) {
            speed += this.subject().attackSpeed();
        }
        return speed;
    };

    makeTargets() {
        let targets = [];
        if (!this._forcing && this.subject().isConfused()) {
            targets = [this.confusionTarget()];
        } else if (this.isForOpponent()) {
            targets = this.targetsForOpponents();
        } else if (this.isForFriend()) {
            targets = this.targetsForFriends();
        }
        return this.repeatTargets(targets);
    };

    repeatTargets(targets) {
        const repeatedTargets = [];
        const repeats = this.numRepeats();
        for (const target of targets) {
            if (target) {
                for (let j = 0; j < repeats; j++) {
                    repeatedTargets.push(target);
                }
            }
        }
        return repeatedTargets;
    };

    confusionTarget() {
        switch (this.subject().confusionLevel()) {
            case 1:
                return this.opponentsUnit().randomTarget();
            case 2:
                if (Math.randomInt(2) === 0) {
                    return this.opponentsUnit().randomTarget();
                }
                return this.friendsUnit().randomTarget();
            default:
                return this.friendsUnit().randomTarget();
        }
    };

    targetsForOpponents() {
        let targets = [];
        const unit = this.opponentsUnit();
        if (this.isForRandom()) {
            for (let i = 0; i < this.numTargets(); i++) {
                targets.push(unit.randomTarget());
            }
        } else if (this.isForOne()) {
            if (this._targetIndex < 0) {
                targets.push(unit.randomTarget());
            } else {
                targets.push(unit.smoothTarget(this._targetIndex));
            }
        } else {
            targets = unit.aliveMembers();
        }
        return targets;
    };

    targetsForFriends() {
        let targets = [];
        const unit = this.friendsUnit();
        if (this.isForUser()) {
            return [this.subject()];
        } else if (this.isForDeadFriend()) {
            if (this.isForOne()) {
                targets.push(unit.smoothDeadTarget(this._targetIndex));
            } else {
                targets = unit.deadMembers();
            }
        } else if (this.isForOne()) {
            if (this._targetIndex < 0) {
                targets.push(unit.randomTarget());
            } else {
                targets.push(unit.smoothTarget(this._targetIndex));
            }
        } else {
            targets = unit.aliveMembers();
        }
        return targets;
    };

    evaluate() {
        let value = 0;
        for (const target of this.itemTargetCandidates()) {
            const targetValue = this.evaluateWithTarget(target);
            if (this.isForAll()) {
                value += targetValue;
            } else if (targetValue > value) {
                value = targetValue;
                this._targetIndex = target.index();
            }
        }
        value *= this.numRepeats();
        if (value > 0) {
            value += Math.random();
        }
        return value;
    };

    itemTargetCandidates() {
        if (!this.isValid()) {
            return [];
        } else if (this.isForOpponent()) {
            return this.opponentsUnit().aliveMembers();
        } else if (this.isForUser()) {
            return [this.subject()];
        } else if (this.isForDeadFriend()) {
            return this.friendsUnit().deadMembers();
        } else {
            return this.friendsUnit().aliveMembers();
        }
    };

    evaluateWithTarget(target) {
        if (this.isHpEffect()) {
            const value = this.makeDamageValue(target, false);
            if (this.isForOpponent()) {
                return value / Math.max(target.hp, 1);
            } else {
                const recovery = Math.min(-value, target.mhp - target.hp);
                return recovery / target.mhp;
            }
        }
    };

    testApply(target) {
        return (this.isForDeadFriend() === target.isDead() &&
            ($gameParty.inBattle() || this.isForOpponent() ||
                (this.isHpRecover() && target.hp < target.mhp) ||
                (this.isMpRecover() && target.mp < target.mmp) ||
                (this.hasItemAnyValidEffects(target))));
    };

    hasItemAnyValidEffects(target) {
        return this.item().effects.some(effect => this.testItemEffect(target, effect));
    };

    testItemEffect(target, effect) {
        switch (effect.code) {
            case Game_Action.EFFECT_RECOVER_HP:
                return target.hp < target.mhp || effect.value1 < 0 || effect.value2 < 0;
            case Game_Action.EFFECT_RECOVER_MP:
                return target.mp < target.mmp || effect.value1 < 0 || effect.value2 < 0;
            case Game_Action.EFFECT_ADD_STATE:
                return !target.isStateAffected(effect.dataId);
            case Game_Action.EFFECT_REMOVE_STATE:
                return target.isStateAffected(effect.dataId);
            case Game_Action.EFFECT_ADD_BUFF:
                return !target.isMaxBuffAffected(effect.dataId);
            case Game_Action.EFFECT_ADD_DEBUFF:
                return !target.isMaxDebuffAffected(effect.dataId);
            case Game_Action.EFFECT_REMOVE_BUFF:
                return target.isBuffAffected(effect.dataId);
            case Game_Action.EFFECT_REMOVE_DEBUFF:
                return target.isDebuffAffected(effect.dataId);
            case Game_Action.EFFECT_LEARN_SKILL:
                return target.isActor() && !target.isLearnedSkill(effect.dataId);
            default:
                return true;
        }
    };

    itemCnt(target) {
        if (this.isPhysical() && target.canMove()) {
            return target.cnt;
        } else {
            return 0;
        }
    };

    itemMrf(target) {
        if (this.isMagical()) {
            return target.mrf;
        } else {
            return 0;
        }
    };

    itemHit(target) {
        if (this.isPhysical()) {
            return this.item().successRate * 0.01 * this.subject().hit;
        } else {
            return this.item().successRate * 0.01;
        }
    };

    itemEva(target) {
        if (this.isPhysical()) {
            return target.eva;
        } else if (this.isMagical()) {
            return target.mev;
        } else {
            return 0;
        }
    };

    itemCri(target) {
        return this.item().damage.critical ? this.subject().cri * (1 - target.cev) : 0;
    };

    apply(target) {
        const result = target.result();
        this.subject().clearResult();
        result.clear();
        result.used = this.testApply(target);
        result.missed = (result.used && Math.random() >= this.itemHit(target));
        result.evaded = (!result.missed && Math.random() < this.itemEva(target));
        result.physical = this.isPhysical();
        result.drain = this.isDrain();
        if (result.isHit()) {
            if (this.item().damage.type > 0) {
                result.critical = (Math.random() < this.itemCri(target));
                const value = this.makeDamageValue(target, result.critical);
                this.executeDamage(target, value);
            }
            for (const effect of this.item().effects) {
                this.applyItemEffect(target, effect);
            }
            this.applyItemUserEffect(target);
        }
    };

    makeDamageValue(target, critical) {
        const item = this.item();
        const baseValue = this.evalDamageFormula(target);
        let value = baseValue * this.calcElementRate(target);
        if (this.isPhysical()) {
            value *= target.pdr;
        }
        if (this.isMagical()) {
            value *= target.mdr;
        }
        if (baseValue < 0) {
            value *= target.rec;
        }
        if (critical) {
            value = this.applyCritical(value);
        }
        value = this.applyVariance(value, item.damage.variance);
        value = this.applyGuard(value, target);
        value = Math.round(value);
        return value;
    };

    evalDamageFormula(target) {
        try {
            const item = this.item();
            const a = this.subject();
            const b = target;
            const v = $gameVariables._data;
            const sign = ([3, 4].contains(item.damage.type) ? -1 : 1);
            let value = Math.max(eval(item.damage.formula), 0) * sign;
            if (isNaN(value)) value = 0;
            return value;
        } catch (e) {
            return 0;
        }
    };

    calcElementRate(target) {
        if (this.item().damage.elementId < 0) {
            return this.elementsMaxRate(target, this.subject().attackElements());
        } else {
            return target.elementRate(this.item().damage.elementId);
        }
    };

    elementsMaxRate(target, elements) {
        if (elements.length > 0) {
            return Math.max.apply(null, elements.map(elementId => target.elementRate(elementId)));
        } else {
            return 1;
        }
    };

    applyCritical(damage) {
        return damage * 3;
    };

    applyVariance(damage, variance) {
        const amp = Math.floor(Math.max(Math.abs(damage) * variance / 100, 0));
        const v = Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;
        return damage >= 0 ? damage + v : damage - v;
    };

    applyGuard(damage, target) {
        return damage / (damage > 0 && target.isGuard() ? 2 * target.grd : 1);
    };

    executeDamage(target, value) {
        const result = target.result();
        if (value === 0) {
            result.critical = false;
        }
        if (this.isHpEffect()) {
            this.executeHpDamage(target, value);
        }
        if (this.isMpEffect()) {
            this.executeMpDamage(target, value);
        }
    };

    executeHpDamage(target, value) {
        if (this.isDrain()) {
            value = Math.min(target.hp, value);
        }
        this.makeSuccess(target);
        target.gainHp(-value);
        if (value > 0) {
            target.onDamage(value);
        }
        this.gainDrainedHp(value);
    };

    executeMpDamage(target, value) {
        if (!this.isMpRecover()) {
            value = Math.min(target.mp, value);
        }
        if (value !== 0) {
            this.makeSuccess(target);
        }
        target.gainMp(-value);
        this.gainDrainedMp(value);
    };

    gainDrainedHp(value) {
        if (this.isDrain()) {
            let gainTarget = this.subject();
            if (this._reflectionTarget !== undefined) {
                gainTarget = this._reflectionTarget;
            }
            gainTarget.gainHp(value);
        }
    };

    gainDrainedMp(value) {
        if (this.isDrain()) {
            let gainTarget = this.subject();
            if (this._reflectionTarget !== undefined) {
                gainTarget = this._reflectionTarget;
            }
            gainTarget.gainMp(value);
        }
    };

    applyItemEffect(target, effect) {
        switch (effect.code) {
            case Game_Action.EFFECT_RECOVER_HP:
                this.itemEffectRecoverHp(target, effect);
                break;
            case Game_Action.EFFECT_RECOVER_MP:
                this.itemEffectRecoverMp(target, effect);
                break;
            case Game_Action.EFFECT_GAIN_TP:
                this.itemEffectGainTp(target, effect);
                break;
            case Game_Action.EFFECT_ADD_STATE:
                this.itemEffectAddState(target, effect);
                break;
            case Game_Action.EFFECT_REMOVE_STATE:
                this.itemEffectRemoveState(target, effect);
                break;
            case Game_Action.EFFECT_ADD_BUFF:
                this.itemEffectAddBuff(target, effect);
                break;
            case Game_Action.EFFECT_ADD_DEBUFF:
                this.itemEffectAddDebuff(target, effect);
                break;
            case Game_Action.EFFECT_REMOVE_BUFF:
                this.itemEffectRemoveBuff(target, effect);
                break;
            case Game_Action.EFFECT_REMOVE_DEBUFF:
                this.itemEffectRemoveDebuff(target, effect);
                break;
            case Game_Action.EFFECT_SPECIAL:
                this.itemEffectSpecial(target, effect);
                break;
            case Game_Action.EFFECT_GROW:
                this.itemEffectGrow(target, effect);
                break;
            case Game_Action.EFFECT_LEARN_SKILL:
                this.itemEffectLearnSkill(target, effect);
                break;
            case Game_Action.EFFECT_COMMON_EVENT:
                this.itemEffectCommonEvent(target, effect);
                break;
        }
    };

    itemEffectRecoverHp(target, effect) {
        let value = (target.mhp * effect.value1 + effect.value2) * target.rec;
        if (this.isItem()) {
            value *= this.subject().pha;
        }
        value = Math.floor(value);
        if (value !== 0) {
            target.gainHp(value);
            this.makeSuccess(target);
        }
    };

    itemEffectRecoverMp(target, effect) {
        let value = (target.mmp * effect.value1 + effect.value2) * target.rec;
        if (this.isItem()) {
            value *= this.subject().pha;
        }
        value = Math.floor(value);
        if (value !== 0) {
            target.gainMp(value);
            this.makeSuccess(target);
        }
    };

    itemEffectGainTp(target, effect) {
        const value = Math.floor(effect.value1);
        if (value !== 0) {
            target.gainTp(value);
            this.makeSuccess(target);
        }
    };

    itemEffectAddState(target, effect) {
        if (effect.dataId === 0) {
            this.itemEffectAddAttackState(target, effect);
        } else {
            this.itemEffectAddNormalState(target, effect);
        }
    };

    itemEffectAddAttackState(target, effect) {
        for (const stateId of this.subject().attackStates()) {
            let chance = effect.value1;
            chance *= target.stateRate(stateId);
            chance *= this.subject().attackStatesRate(stateId);
            chance *= this.lukEffectRate(target);
            if (Math.random() < chance) {
                target.addState(stateId);
                this.makeSuccess(target);
            }
        }
    };

    itemEffectAddNormalState(target, effect) {
        let chance = effect.value1;
        if (!this.isCertainHit()) {
            chance *= target.stateRate(effect.dataId);
            chance *= this.lukEffectRate(target);
        }
        if (Math.random() < chance) {
            target.addState(effect.dataId);
            this.makeSuccess(target);
        }
    };

    itemEffectRemoveState(target, effect) {
        const chance = effect.value1;
        if (Math.random() < chance) {
            target.removeState(effect.dataId);
            this.makeSuccess(target);
        }
    };

    itemEffectAddBuff(target, effect) {
        target.addBuff(effect.dataId, effect.value1);
        this.makeSuccess(target);
    };

    itemEffectAddDebuff(target, effect) {
        const chance = target.debuffRate(effect.dataId) * this.lukEffectRate(target);
        if (Math.random() < chance) {
            target.addDebuff(effect.dataId, effect.value1);
            this.makeSuccess(target);
        }
    };

    itemEffectRemoveBuff(target, effect) {
        if (target.isBuffAffected(effect.dataId)) {
            target.removeBuff(effect.dataId);
            this.makeSuccess(target);
        }
    };

    itemEffectRemoveDebuff(target, effect) {
        if (target.isDebuffAffected(effect.dataId)) {
            target.removeBuff(effect.dataId);
            this.makeSuccess(target);
        }
    };

    itemEffectSpecial(target, effect) {
        if (effect.dataId === Game_Action.SPECIAL_EFFECT_ESCAPE) {
            target.escape();
            this.makeSuccess(target);
        }
    };

    itemEffectGrow(target, effect) {
        target.addParam(effect.dataId, Math.floor(effect.value1));
        this.makeSuccess(target);
    };

    itemEffectLearnSkill(target, effect) {
        if (target.isActor()) {
            target.learnSkill(effect.dataId);
            this.makeSuccess(target);
        }
    };

    itemEffectCommonEvent(target, effect) {
    };

    makeSuccess(target) {
        target.result().success = true;
    };

    applyItemUserEffect(target) {
        const value = Math.floor(this.item().tpGain * this.subject().tcr);
        this.subject().gainSilentTp(value);
    };

    lukEffectRate(target) {
        return Math.max(1.0 + (this.subject().luk - target.luk) * 0.001, 0.0);
    };

    applyGlobal() {
        for (const effect of this.item().effects) {
            if (effect.code === Game_Action.EFFECT_COMMON_EVENT) {
                $gameTemp.reserveCommonEvent(effect.dataId);
            }
        }
    };
};

//-----------------------------------------------------------------------------

// Game_ActionResult
//
// The game object class for a result of a battle action. For convinience, all
// member variables in this class are public.
var Game_ActionResult = class {
    constructor(...args) {
        this.initialize(...args);
    };

    initialize() {
        this.clear();
    };

    clear() {
        this.used = false;
        this.missed = false;
        this.evaded = false;
        this.physical = false;
        this.drain = false;
        this.critical = false;
        this.success = false;
        this.hpAffected = false;
        this.hpDamage = 0;
        this.mpDamage = 0;
        this.tpDamage = 0;
        this.addedStates = [];
        this.removedStates = [];
        this.addedBuffs = [];
        this.addedDebuffs = [];
        this.removedBuffs = [];
    };

    addedStateObjects() {
        return this.addedStates.map(id => $dataStates[id]);
    };

    removedStateObjects() {
        return this.removedStates.map(id => $dataStates[id]);
    };

    isStatusAffected() {
        return (this.addedStates.length > 0 || this.removedStates.length > 0 ||
            this.addedBuffs.length > 0 || this.addedDebuffs.length > 0 ||
            this.removedBuffs.length > 0);
    };

    isHit() {
        return this.used && !this.missed && !this.evaded;
    };

    isStateAdded(stateId) {
        return this.addedStates.contains(stateId);
    };

    pushAddedState(stateId) {
        if (!this.isStateAdded(stateId)) {
            this.addedStates.push(stateId);
        }
    };

    isStateRemoved(stateId) {
        return this.removedStates.contains(stateId);
    };

    pushRemovedState(stateId) {
        if (!this.isStateRemoved(stateId)) {
            this.removedStates.push(stateId);
        }
    };

    isBuffAdded(paramId) {
        return this.addedBuffs.contains(paramId);
    };

    pushAddedBuff(paramId) {
        if (!this.isBuffAdded(paramId)) {
            this.addedBuffs.push(paramId);
        }
    };

    isDebuffAdded(paramId) {
        return this.addedDebuffs.contains(paramId);
    };

    pushAddedDebuff(paramId) {
        if (!this.isDebuffAdded(paramId)) {
            this.addedDebuffs.push(paramId);
        }
    };

    isBuffRemoved(paramId) {
        return this.removedBuffs.contains(paramId);
    };

    pushRemovedBuff(paramId) {
        if (!this.isBuffRemoved(paramId)) {
            this.removedBuffs.push(paramId);
        }
    };
};

//-----------------------------------------------------------------------------

// Game_BattlerBase
//
// The superclass of Game_Battler. It mainly contains parameters calculation.
var Game_BattlerBase = class {
    constructor(...args) {
        this.initialize(...args);
    };

    static TRAIT_ELEMENT_RATE = 11;
    static TRAIT_DEBUFF_RATE = 12;
    static TRAIT_STATE_RATE = 13;
    static TRAIT_STATE_RESIST = 14;
    static TRAIT_PARAM = 21;
    static TRAIT_XPARAM = 22;
    static TRAIT_SPARAM = 23;
    static TRAIT_ATTACK_ELEMENT = 31;
    static TRAIT_ATTACK_STATE = 32;
    static TRAIT_ATTACK_SPEED = 33;
    static TRAIT_ATTACK_TIMES = 34;
    static TRAIT_STYPE_ADD = 41;
    static TRAIT_STYPE_SEAL = 42;
    static TRAIT_SKILL_ADD = 43;
    static TRAIT_SKILL_SEAL = 44;
    static TRAIT_EQUIP_WTYPE = 51;
    static TRAIT_EQUIP_ATYPE = 52;
    static TRAIT_EQUIP_LOCK = 53;
    static TRAIT_EQUIP_SEAL = 54;
    static TRAIT_SLOT_TYPE = 55;
    static TRAIT_ACTION_PLUS = 61;
    static TRAIT_SPECIAL_FLAG = 62;
    static TRAIT_COLLAPSE_TYPE = 63;
    static TRAIT_PARTY_ABILITY = 64;
    static FLAG_ID_AUTO_BATTLE = 0;
    static FLAG_ID_GUARD = 1;
    static FLAG_ID_SUBSTITUTE = 2;
    static FLAG_ID_PRESERVE_TP = 3;
    static ICON_BUFF_START = 32;
    static ICON_DEBUFF_START = 48;

    // Hit Points
    get hp() { return this._hp; }
    // Magic Points
    get mp() { return this._mp; }
    // Tactical Points
    get tp() { return this._tp; }
    // Maximum Hit Points
    get mhp() { return this.param(0); }
    // Maximum Magic Points
    get mmp() { return this.param(1); }
    // ATtacK power
    get atk() { return this.param(2); }
    // DEFense power
    get def() { return this.param(3); }
    // Magic ATtack power
    get mat() { return this.param(4); }
    // Magic DeFense power
    get mdf() { return this.param(5); }
    // AGIlity
    get agi() { return this.param(6); }
    // LUcK
    get luk() { return this.param(7); }
    // HIT rate
    get hit() { return this.xparam(0); }
    // EVAsion rate
    get eva() { return this.xparam(1); }
    // CRItical rate
    get cri() { return this.xparam(2); }
    // Critical EVasion rate
    get cev() { return this.xparam(3); }
    // Magic EVasion rate
    get mev() { return this.xparam(4); }
    // Magic ReFlection rate
    get mrf() { return this.xparam(5); }
    // CouNTer attack rate
    get cnt() { return this.xparam(6); }
    // Hp ReGeneration rate
    get hrg() { return this.xparam(7); }
    // Mp ReGeneration rate
    get mrg() { return this.xparam(8); }
    // Tp ReGeneration rate
    get trg() { return this.xparam(9); }
    // TarGet Rate
    get tgr() { return this.sparam(0); }
    // GuaRD effect rate
    get grd() { return this.sparam(1); }
    // RECovery effect rate
    get rec() { return this.sparam(2); }
    // PHArmacology
    get pha() { return this.sparam(3); }
    // Mp Cost Rate
    get mcr() { return this.sparam(4); }
    // Tp Charge Rate
    get tcr() { return this.sparam(5); }
    // Physical Damage Rate
    get pdr() { return this.sparam(6); }
    // Magical Damage Rate
    get mdr() { return this.sparam(7); }
    // Floor Damage Rate
    get fdr() { return this.sparam(8); }
    // EXperience Rate
    get exr() { return this.sparam(9); }

    initialize() {
        this.initMembers();
    };

    initMembers() {
        this._hp = 1;
        this._mp = 0;
        this._tp = 0;
        this._hidden = false;
        this.clearParamPlus();
        this.clearStates();
        this.clearBuffs();
    };

    clearParamPlus() {
        this._paramPlus = [0, 0, 0, 0, 0, 0, 0, 0];
    };

    clearStates() {
        this._states = [];
        this._stateTurns = {};
    };

    eraseState(stateId) {
        const index = this._states.indexOf(stateId);
        if (index >= 0) {
            this._states.splice(index, 1);
        }
        delete this._stateTurns[stateId];
    };

    isStateAffected(stateId) {
        return this._states.contains(stateId);
    };

    isDeathStateAffected() {
        return this.isStateAffected(this.deathStateId());
    };

    deathStateId() {
        return 1;
    };

    resetStateCounts(stateId) {
        const state = $dataStates[stateId];
        const variance = 1 + Math.max(state.maxTurns - state.minTurns, 0);
        this._stateTurns[stateId] = state.minTurns + Math.randomInt(variance);
    };

    isStateExpired(stateId) {
        return this._stateTurns[stateId] === 0;
    };

    updateStateTurns() {
        for (const stateId in this._states) {
            if (this._stateTurns[stateId] > 0) {
                this._stateTurns[stateId]--;
            }
        }
    };

    clearBuffs() {
        this._buffs = [0, 0, 0, 0, 0, 0, 0, 0];
        this._buffTurns = [0, 0, 0, 0, 0, 0, 0, 0];
    };

    eraseBuff(paramId) {
        this._buffs[paramId] = 0;
        this._buffTurns[paramId] = 0;
    };

    buffLength() {
        return this._buffs.length;
    };

    buff(paramId) {
        return this._buffs[paramId];
    };

    isBuffAffected(paramId) {
        return this._buffs[paramId] > 0;
    };

    isDebuffAffected(paramId) {
        return this._buffs[paramId] < 0;
    };

    isBuffOrDebuffAffected(paramId) {
        return this._buffs[paramId] !== 0;
    };

    isMaxBuffAffected(paramId) {
        return this._buffs[paramId] === 2;
    };

    isMaxDebuffAffected(paramId) {
        return this._buffs[paramId] === -2;
    };

    increaseBuff(paramId) {
        if (!this.isMaxBuffAffected(paramId)) {
            this._buffs[paramId]++;
        }
    };

    decreaseBuff(paramId) {
        if (!this.isMaxDebuffAffected(paramId)) {
            this._buffs[paramId]--;
        }
    };

    overwriteBuffTurns(paramId, turns) {
        if (this._buffTurns[paramId] < turns) {
            this._buffTurns[paramId] = turns;
        }
    };

    isBuffExpired(paramId) {
        return this._buffTurns[paramId] === 0;
    };

    updateBuffTurns() {
        for (let i = 0; i < this._buffTurns.length; i++) {
            if (this._buffTurns[i] > 0) {
                this._buffTurns[i]--;
            }
        }
    };

    die() {
        this._hp = 0;
        this.clearStates();
        this.clearBuffs();
    };

    revive() {
        if (this._hp === 0) {
            this._hp = 1;
        }
    };

    states() {
        if (!Array.isArray(this._states)) return [];
		return this._states
			.map(id => $dataStates[id])
			.filter(state => !!state);	
    };

    stateIcons() {
        return this.states().map(state => Number(state.iconIndex) || 0);
    };

    buffIcons() {
        const icons = [];
        for (let i = 0; i < this._buffs.length; i++) {
            if (this._buffs[i] !== 0) {
                icons.push(this.buffIconIndex(this._buffs[i], i));
            }
        }
        return icons;
    };

    buffIconIndex(buffLevel, paramId) {
        if (buffLevel > 0) {
            return Game_BattlerBase.ICON_BUFF_START + (buffLevel - 1) * 8 + paramId;
        } else if (buffLevel < 0) {
            return Game_BattlerBase.ICON_DEBUFF_START + (-buffLevel - 1) * 8 + paramId;
        } else {
            return 0;
        }
    };

    allIcons() {
        return this.stateIcons().concat(this.buffIcons());
    };

    traitObjects() {
        // Returns an array of the all objects having traits. States only here.
        return this.states();
    };

    allTraits() {
        return this.traitObjects().reduce((r, obj) => r.concat(obj.traits), []);
    };

    traits(code) {
        return this.allTraits().filter(trait => trait.code === code);
    };

    traitsWithId(code, id) {
        return this.allTraits().filter(trait => trait.code === code && trait.dataId === id);
    };

    traitsPi(code, id) {
        return this.traitsWithId(code, id).reduce((r, trait) => r * trait.value, 1);
    };

    traitsSum(code, id) {
        return this.traitsWithId(code, id).reduce((r, trait) => r + trait.value, 0);
    };

    traitsSumAll(code) {
        return this.traits(code).reduce((r, trait) => r + trait.value, 0);
    };

    traitsSet(code) {
        return this.traits(code).reduce((r, trait) => r.concat(trait.dataId), []);
    };

    paramBase(paramId) {
        return 0;
    };

    paramPlus(paramId) {
        return this._paramPlus[paramId];
    };

    paramMin(paramId) {
        if (paramId === 1) {
            return 0;   // MMP
        } else {
            return 1;
        }
    };

    paramMax(paramId) {
        if (paramId === 0) {
            return 999999;  // MHP
        } else if (paramId === 1) {
            return 9999;    // MMP
        } else {
            return 999;
        }
    };

    paramRate(paramId) {
        return this.traitsPi(Game_BattlerBase.TRAIT_PARAM, paramId);
    };

    paramBuffRate(paramId) {
        return this._buffs[paramId] * 0.25 + 1.0;
    };

    param(paramId) {
        let value = this.paramBase(paramId) + this.paramPlus(paramId);
        value *= this.paramRate(paramId) * this.paramBuffRate(paramId);
        const maxValue = this.paramMax(paramId);
        const minValue = this.paramMin(paramId);
        return Math.round(value.clamp(minValue, maxValue));
    };

    xparam(xparamId) {
        return this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);
    };

    sparam(sparamId) {
        return this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);
    };

    elementRate(elementId) {
        return this.traitsPi(Game_BattlerBase.TRAIT_ELEMENT_RATE, elementId);
    };

    debuffRate(paramId) {
        return this.traitsPi(Game_BattlerBase.TRAIT_DEBUFF_RATE, paramId);
    };

    stateRate(stateId) {
        return this.traitsPi(Game_BattlerBase.TRAIT_STATE_RATE, stateId);
    };

    stateResistSet() {
        return this.traitsSet(Game_BattlerBase.TRAIT_STATE_RESIST);
    };

    isStateResist(stateId) {
        return this.stateResistSet().contains(stateId);
    };

    attackElements() {
        return this.traitsSet(Game_BattlerBase.TRAIT_ATTACK_ELEMENT);
    };

    attackStates() {
        return this.traitsSet(Game_BattlerBase.TRAIT_ATTACK_STATE);
    };

    attackStatesRate(stateId) {
        return this.traitsSum(Game_BattlerBase.TRAIT_ATTACK_STATE, stateId);
    };

    attackSpeed() {
        return this.traitsSumAll(Game_BattlerBase.TRAIT_ATTACK_SPEED);
    };

    attackTimesAdd() {
        return Math.max(this.traitsSumAll(Game_BattlerBase.TRAIT_ATTACK_TIMES), 0);
    };

    addedSkillTypes() {
        return this.traitsSet(Game_BattlerBase.TRAIT_STYPE_ADD);
    };

    isSkillTypeSealed(stypeId) {
        return this.traitsSet(Game_BattlerBase.TRAIT_STYPE_SEAL).contains(stypeId);
    };

    addedSkills() {
        return this.traitsSet(Game_BattlerBase.TRAIT_SKILL_ADD);
    };

    isSkillSealed(skillId) {
        return this.traitsSet(Game_BattlerBase.TRAIT_SKILL_SEAL).contains(skillId);
    };

    isEquipWtypeOk(wtypeId) {
        return this.traitsSet(Game_BattlerBase.TRAIT_EQUIP_WTYPE).contains(wtypeId);
    };

    isEquipAtypeOk(atypeId) {
        return this.traitsSet(Game_BattlerBase.TRAIT_EQUIP_ATYPE).contains(atypeId);
    };

    isEquipTypeLocked(etypeId) {
        return this.traitsSet(Game_BattlerBase.TRAIT_EQUIP_LOCK).contains(etypeId);
    };

    isEquipTypeSealed(etypeId) {
        return this.traitsSet(Game_BattlerBase.TRAIT_EQUIP_SEAL).contains(etypeId);
    };

    slotType() {
        const set = this.traitsSet(Game_BattlerBase.TRAIT_SLOT_TYPE);
        return set.length > 0 ? Math.max.apply(null, set) : 0;
    };

    isDualWield() {
        return this.slotType() === 1;
    };

    actionPlusSet() {
        return this.traits(Game_BattlerBase.TRAIT_ACTION_PLUS).map(trait => trait.value);
    };

    specialFlag(flagId) {
        return this.traits(Game_BattlerBase.TRAIT_SPECIAL_FLAG).some(trait => trait.dataId === flagId);
    };

    collapseType() {
        const set = this.traitsSet(Game_BattlerBase.TRAIT_COLLAPSE_TYPE);
        return set.length > 0 ? Math.max.apply(null, set) : 0;
    };

    partyAbility(abilityId) {
        return this.traits(Game_BattlerBase.TRAIT_PARTY_ABILITY).some(trait => trait.dataId === abilityId);
    };

    isAutoBattle() {
        return this.specialFlag(Game_BattlerBase.FLAG_ID_AUTO_BATTLE);
    };

    isGuard() {
        return this.specialFlag(Game_BattlerBase.FLAG_ID_GUARD) && this.canMove();
    };

    isSubstitute() {
        return this.specialFlag(Game_BattlerBase.FLAG_ID_SUBSTITUTE) && this.canMove();
    };

    isPreserveTp() {
        return this.specialFlag(Game_BattlerBase.FLAG_ID_PRESERVE_TP);
    };

    addParam(paramId, value) {
        this._paramPlus[paramId] += value;
        this.refresh();
    };

    setHp(hp) {
        this._hp = hp;
        this.refresh();
    };

    setMp(mp) {
        this._mp = mp;
        this.refresh();
    };

    setTp(tp) {
        this._tp = tp;
        this.refresh();
    };

    maxTp() {
        return 100;
    };

    refresh() {
        for (const stateId of this.stateResistSet()) {
            this.eraseState(stateId);
        }

        this._hp = Number(this._hp) || 0;
        this._mp = Number(this._mp) || 0;
        this._tp = Number(this._tp) || 0;

        this._hp = this._hp.clamp(0, this.mhp);
        this._mp = this._mp.clamp(0, this.mmp);
        this._tp = this._tp.clamp(0, this.maxTp());
    };

    recoverAll() {
        this.clearStates();
        this._hp = this.mhp;
        this._mp = this.mmp;
    };

    hpRate() {
        return this.hp / this.mhp;
    };

    mpRate() {
        return this.mmp > 0 ? this.mp / this.mmp : 0;
    };

    tpRate() {
        return this.tp / this.maxTp();
    };

    hide() {
        this._hidden = true;
    };

    appear() {
        this._hidden = false;
    };

    isHidden() {
        return this._hidden;
    };

    isAppeared() {
        return !this.isHidden();
    };

    isDead() {
        return this.isAppeared() && this.isDeathStateAffected();
    };

    isAlive() {
        return this.isAppeared() && !this.isDeathStateAffected();
    };

    isDying() {
        return this.isAlive() && this._hp < this.mhp / 4;
    };

    isRestricted() {
        return this.isAppeared() && this.restriction() > 0;
    };

    canInput() {
        return this.isAppeared() && !this.isRestricted() && !this.isAutoBattle();
    };

    canMove() {
        return this.isAppeared() && this.restriction() < 4;
    };

    isConfused() {
        return this.isAppeared() && this.restriction() >= 1 && this.restriction() <= 3;
    };

    confusionLevel() {
        return this.isConfused() ? this.restriction() : 0;
    };

    isActor() {
        return false;
    };

    isEnemy() {
        return false;
    };

    sortStates() {
        this._states.sort((a, b) => {
            const p1 = $dataStates[a].priority;
            const p2 = $dataStates[b].priority;
            if (p1 !== p2) {
                return p2 - p1;
            }
            return a - b;
        });
    };

    restriction() {
        return Math.max.apply(null, this.states().map(state => state.restriction).concat(0));
    };

    addNewState(stateId) {
        if (stateId === this.deathStateId()) {
            this.die();
        }
        const restricted = this.isRestricted();
        this._states.push(stateId);
        this.sortStates();
        if (!restricted && this.isRestricted()) {
            this.onRestrict();
        }
    };

    onRestrict() { };

    mostImportantStateText() {
        for (const state of this.states()) {
            if (state.message3) return state.message3;
        }
        return '';
    };

    stateMotionIndex() {
        const states = this.states();
        if (states.length > 0) {
            return states[0].motion;
        } else {
            return 0;
        }
    };

    stateOverlayIndex() {
        const states = this.states();
        if (states.length > 0) {
            return states[0].overlay;
        } else {
            return 0;
        }
    };

    isSkillWtypeOk(skill) {
        return true;
    };

    skillMpCost(skill) {
        return Math.floor(skill.mpCost * this.mcr);
    };

    skillTpCost(skill) {
        return skill.tpCost;
    };

    canPaySkillCost(skill) {
        return this._tp >= this.skillTpCost(skill) && this._mp >= this.skillMpCost(skill);
    };

    paySkillCost(skill) {
        this._mp -= this.skillMpCost(skill);
        this._tp -= this.skillTpCost(skill);
    };

    isOccasionOk(item) {
        if ($gameParty.inBattle()) {
            return item.occasion === 0 || item.occasion === 1;
        } else {
            return item.occasion === 0 || item.occasion === 2;
        }
    };

    meetsUsableItemConditions(item) {
        return this.canMove() && this.isOccasionOk(item);
    };

    meetsSkillConditions(skill) {
        return (this.meetsUsableItemConditions(skill) &&
            this.isSkillWtypeOk(skill) && this.canPaySkillCost(skill) &&
            !this.isSkillSealed(skill.id) && !this.isSkillTypeSealed(skill.stypeId));
    };

    meetsItemConditions(item) {
        return this.meetsUsableItemConditions(item) && $gameParty.hasItem(item);
    };

    canUse(item) {
        if (!item) {
            return false;
        } else if (DataManager.isSkill(item)) {
            return this.meetsSkillConditions(item);
        } else if (DataManager.isItem(item)) {
            return this.meetsItemConditions(item);
        } else {
            return false;
        }
    };

    canEquip(item) {
        if (!item) {
            return false;
        } else if (DataManager.isWeapon(item)) {
            return this.canEquipWeapon(item);
        } else if (DataManager.isArmor(item)) {
            return this.canEquipArmor(item);
        } else {
            return false;
        }
    };

    canEquipWeapon(item) {
        return this.isEquipWtypeOk(item.wtypeId) && !this.isEquipTypeSealed(item.etypeId);
    };

    canEquipArmor(item) {
        return this.isEquipAtypeOk(item.atypeId) && !this.isEquipTypeSealed(item.etypeId);
    };

    attackSkillId() {
        return 1;
    };

    guardSkillId() {
        return 2;
    };

    canAttack() {
        return this.canUse($dataSkills[this.attackSkillId()]);
    };

    canGuard() {
        return this.canUse($dataSkills[this.guardSkillId()]);
    };
};

//-----------------------------------------------------------------------------

// Game_Battler
//
// The superclass of Game_Actor and Game_Enemy. It contains methods for sprites
// and actions.
var Game_Battler = class extends Game_BattlerBase {
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

    initMembers() {
        super.initMembers();
        this._actions = [];
        this._speed = 0;
        this._result = new Game_ActionResult();
        this._actionState = '';
        this._lastTargetIndex = 0;
        this._animations = [];
        this._damagePopup = false;
        this._effectType = null;
        this._motionType = null;
        this._weaponImageId = 0;
        this._motionRefresh = false;
        this._selected = false;
    };

    clearAnimations() {
        this._animations = [];
    };

    clearDamagePopup() {
        this._damagePopup = false;
    };

    clearWeaponAnimation() {
        this._weaponImageId = 0;
    };

    clearEffect() {
        this._effectType = null;
    };

    clearMotion() {
        this._motionType = null;
        this._motionRefresh = false;
    };

    requestEffect(effectType) {
        this._effectType = effectType;
    };

    requestMotion(motionType) {
        this._motionType = motionType;
    };

    requestMotionRefresh() {
        this._motionRefresh = true;
    };

    select() {
        this._selected = true;
    };

    deselect() {
        this._selected = false;
    };

    isAnimationRequested() {
        return this._animations.length > 0;
    };

    isDamagePopupRequested() {
        return this._damagePopup;
    };

    isEffectRequested() {
        return !!this._effectType;
    };

    isMotionRequested() {
        return !!this._motionType;
    };

    isWeaponAnimationRequested() {
        return this._weaponImageId > 0;
    };

    isMotionRefreshRequested() {
        return this._motionRefresh;
    };

    isSelected() {
        return this._selected;
    };

    effectType() {
        return this._effectType;
    };

    motionType() {
        return this._motionType;
    };

    weaponImageId() {
        return this._weaponImageId;
    };

    shiftAnimation() {
        return this._animations.shift();
    };

    startAnimation(animationId, mirror, delay) {
        this._animations.push({ animationId, mirror, delay });
    };

    startDamagePopup() {
        this._damagePopup = true;
    };

    startWeaponAnimation(weaponImageId) {
        this._weaponImageId = weaponImageId;
    };

    action(index) {
        return this._actions[index];
    };

    setAction(index, action) {
        this._actions[index] = action;
    };

    numActions() {
        return this._actions.length;
    };

    clearActions() {
        this._actions = [];
    };

    result() {
        return this._result;
    };

    clearResult() {
        this._result.clear();
    };

    refresh() {
        super.refresh();
        if (this.hp === 0) {
            this.addState(this.deathStateId());
        } else {
            this.removeState(this.deathStateId());
        }
    };

    addState(stateId) {
        if (this.isStateAddable(stateId)) {
            if (!this.isStateAffected(stateId)) {
                this.addNewState(stateId);
                this.refresh();
            }
            this.resetStateCounts(stateId);
            this._result.pushAddedState(stateId);
        }
    };

    isStateAddable(stateId) {
        return (this.isAlive() && $dataStates[stateId] &&
            !this.isStateResist(stateId) &&
            !this._result.isStateRemoved(stateId) &&
            !this.isStateRestrict(stateId));
    };

    isStateRestrict(stateId) {
        return $dataStates[stateId].removeByRestriction && this.isRestricted();
    };

    onRestrict() {
        super.onRestrict();
        this.clearActions();
        for (const state of this.states()) {
            if (state.removeByRestriction) {
                this.removeState(state.id);
            }
        }
    };

    removeState(stateId) {
        if (this.isStateAffected(stateId)) {
            if (stateId === this.deathStateId()) {
                this.revive();
            }
            this.eraseState(stateId);
            this.refresh();
            this._result.pushRemovedState(stateId);
        }
    };

    escape() {
        if ($gameParty.inBattle()) {
            this.hide();
        }
        this.clearActions();
        this.clearStates();
        SoundManager.playEscape();
    };

    addBuff(paramId, turns) {
        if (this.isAlive()) {
            this.increaseBuff(paramId);
            if (this.isBuffAffected(paramId)) {
                this.overwriteBuffTurns(paramId, turns);
            }
            this._result.pushAddedBuff(paramId);
            this.refresh();
        }
    };

    addDebuff(paramId, turns) {
        if (this.isAlive()) {
            this.decreaseBuff(paramId);
            if (this.isDebuffAffected(paramId)) {
                this.overwriteBuffTurns(paramId, turns);
            }
            this._result.pushAddedDebuff(paramId);
            this.refresh();
        }
    };

    removeBuff(paramId) {
        if (this.isAlive() && this.isBuffOrDebuffAffected(paramId)) {
            this.eraseBuff(paramId);
            this._result.pushRemovedBuff(paramId);
            this.refresh();
        }
    };

    removeBattleStates() {
        for (const state of this.states()) {
            if (state.removeAtBattleEnd) {
                this.removeState(state.id);
            }
        }
    };

    removeAllBuffs() {
        for (let i = 0; i < this.buffLength(); i++) {
            this.removeBuff(i);
        }
    };

    removeStatesAuto(timing) {
        for (const state of this.states()) {
            if (this.isStateExpired(state.id) && state.autoRemovalTiming === timing) {
                this.removeState(state.id);
            }
        }
    };

    removeBuffsAuto() {
        for (let i = 0; i < this.buffLength(); i++) {
            if (this.isBuffExpired(i)) {
                this.removeBuff(i);
            }
        }
    };

    removeStatesByDamage() {
        for (const state of this.states()) {
            if (state.removeByDamage && Math.randomInt(100) < state.chanceByDamage) {
                this.removeState(state.id);
            }
        }
    };

    makeActionTimes() {
        return this.actionPlusSet().reduce((r, p) => {
            return Math.random() < p ? r + 1 : r;
        }, 1);
    };

    makeActions() {
        this.clearActions();
        if (this.canMove()) {
            const actionTimes = this.makeActionTimes();
            this._actions = [];
            for (let i = 0; i < actionTimes; i++) {
                this._actions.push(new Game_Action(this));
            }
        }
    };

    speed() {
        return this._speed;
    };

    makeSpeed() {
        this._speed = Math.min.apply(null, this._actions.map(action => {
            return action.speed();
        })) || 0;
    };

    currentAction() {
        return this._actions[0];
    };

    removeCurrentAction() {
        this._actions.shift();
    };

    setLastTarget(target) {
        if (target) {
            this._lastTargetIndex = target.index();
        } else {
            this._lastTargetIndex = 0;
        }
    };

    forceAction(skillId, targetIndex) {
        this.clearActions();
        const action = new Game_Action(this, true);
        action.setSkill(skillId);
        if (targetIndex === -2) {
            action.setTarget(this._lastTargetIndex);
        } else if (targetIndex === -1) {
            action.decideRandomTarget();
        } else {
            action.setTarget(targetIndex);
        }
        this._actions.push(action);
    };

    useItem(item) {
        if (DataManager.isSkill(item)) {
            this.paySkillCost(item);
        } else if (DataManager.isItem(item)) {
            this.consumeItem(item);
        }
    };

    consumeItem(item) {
        $gameParty.consumeItem(item);
    };

    gainHp(value) {
        this._result.hpDamage = -value;
        this._result.hpAffected = true;
        this.setHp(this.hp + value);
    };

    gainMp(value) {
        this._result.mpDamage = -value;
        this.setMp(this.mp + value);
    };

    gainTp(value) {
        this._result.tpDamage = -value;
        this.setTp(this.tp + value);
    };

    gainSilentTp(value) {
        this.setTp(this.tp + value);
    };

    initTp() {
        this.setTp(Math.randomInt(25));
    };

    clearTp() {
        this.setTp(0);
    };

    chargeTpByDamage(damageRate) {
        this.gainSilentTp(Math.floor(50 * damageRate * this.tcr));
    };

    regenerateHp() {
        let value = Math.floor(this.mhp * this.hrg);
        value = Math.max(value, -this.maxSlipDamage());
        if (value !== 0) {
            this.gainHp(value);
        }
    };

    maxSlipDamage() {
        return $dataSystem.optSlipDeath ? this.hp : Math.max(this.hp - 1, 0);
    };

    regenerateMp() {
        const value = Math.floor(this.mmp * this.mrg);
        if (value !== 0) {
            this.gainMp(value);
        }
    };

    regenerateTp() {
        this.gainSilentTp(Math.floor(100 * this.trg));
    };

    regenerateAll() {
        if (this.isAlive()) {
            this.regenerateHp();
            this.regenerateMp();
            this.regenerateTp();
        }
    };

    onBattleStart() {
        this.setActionState('undecided');
        this.clearMotion();
        if (!this.isPreserveTp()) {
            this.initTp();
        }
    };

    onAllActionsEnd() {
        this.clearResult();
        this.removeStatesAuto(1);
        this.removeBuffsAuto();
    };

    onTurnEnd() {
        this.clearResult();
        this.regenerateAll();
        if (!BattleManager.isForcedTurn()) {
            this.updateStateTurns();
            this.updateBuffTurns();
        }
        this.removeStatesAuto(2);
    };

    onBattleEnd() {
        this.clearResult();
        this.removeBattleStates();
        this.removeAllBuffs();
        this.clearActions();
        if (!this.isPreserveTp()) {
            this.clearTp();
        }
        this.appear();
    };

    onDamage(value) {
        this.removeStatesByDamage();
        this.chargeTpByDamage(value / this.mhp);
    };

    setActionState(actionState) {
        this._actionState = actionState;
        this.requestMotionRefresh();
    };

    isUndecided() {
        return this._actionState === 'undecided';
    };

    isInputting() {
        return this._actionState === 'inputting';
    };

    isWaiting() {
        return this._actionState === 'waiting';
    };

    isActing() {
        return this._actionState === 'acting';
    };

    isChanting() {
        if (this.isWaiting()) {
            return this._actions.some(action => action.isMagicSkill());
        }
        return false;
    };

    isGuardWaiting() {
        if (this.isWaiting()) {
            return this._actions.some(action => action.isGuard());
        }
        return false;
    };

    performActionStart(action) {
        if (!action.isGuard()) {
            this.setActionState('acting');
        }
    };

    performAction(action) { };

    performActionEnd() {
        this.setActionState('done');
    };

    performDamage() { };

    performMiss() {
        SoundManager.playMiss();
    };

    performRecovery() {
        SoundManager.playRecovery();
    };

    performEvasion() {
        SoundManager.playEvasion();
    };

    performMagicEvasion() {
        SoundManager.playMagicEvasion();
    };

    performCounter() {
        SoundManager.playEvasion();
    };

    performReflection() {
        SoundManager.playReflection();
    };

    performSubstitute(target) { };

    performCollapse() { };
};

//-----------------------------------------------------------------------------

// Game_Actor
//
// The game object class for an actor.
var Game_Actor = class extends Game_Battler {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    get level() {
        return this._level;
    };

    initialize(actorId) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize();

        this.setup(actorId);
    };

    initMembers() {
        super.initMembers();
        this._actorId = 0;
        this._name = '';
        this._nickname = '';
        this._classId = 0;
        this._level = 0;
        this._characterName = '';
        this._characterIndex = 0;
        this._faceName = '';
        this._faceIndex = 0;
        this._battlerName = '';
        this._exp = {};
        this._skills = [];
        this._equips = [];
        this._actionInputIndex = 0;
        this._lastMenuSkill = new Game_Item();
        this._lastBattleSkill = new Game_Item();
        this._lastCommandSymbol = '';
    };

    setup(actorId) {
        const actor = $dataActors[actorId];
        this._actorId = actorId;
        this._name = actor.name;
        this._nickname = actor.nickname;
        this._profile = actor.profile;
        this._classId = actor.classId;
        this._level = actor.initialLevel;
        this.initImages();
        this.initExp();
        this.initSkills();
        this.initEquips(actor.equips);
        this.clearParamPlus();
        this.recoverAll();
    };

    actorId() {
        return this._actorId;
    };

    actor() {
        return $dataActors[this._actorId];
    };

    name() {
        return this._name;
    };

    setName(name) {
        this._name = name;
    };

    nickname() {
        return this._nickname;
    };

    setNickname(nickname) {
        this._nickname = nickname;
    };

    profile() {
        return this._profile;
    };

    setProfile(profile) {
        this._profile = profile;
    };

    characterName() {
        return this._characterName;
    };

    characterIndex() {
        return this._characterIndex;
    };

    faceName() {
        return this._faceName;
    };

    faceIndex() {
        return this._faceIndex;
    };

    battlerName() {
        return this._battlerName;
    };

    clearStates() {
        super.clearStates();
        this._stateSteps = {};
    };

    eraseState(stateId) {
        super.eraseState(stateId);
        delete this._stateSteps[stateId];
    };

    resetStateCounts(stateId) {
        super.resetStateCounts(stateId);
        this._stateSteps[stateId] = $dataStates[stateId].stepsToRemove;
    };

    initImages() {
        const actor = this.actor();
        this._characterName = actor.characterName;
        this._characterIndex = actor.characterIndex;
        this._faceName = actor.faceName;
        this._faceIndex = actor.faceIndex;
        this._battlerName = actor.battlerName;
    };

    expForLevel(level) {
        const c = this.currentClass();
        const basis = c.expParams[0];
        const extra = c.expParams[1];
        const acc_a = c.expParams[2];
        const acc_b = c.expParams[3];
        return Math.round(basis * (Math.pow(level - 1, 0.9 + acc_a / 250)) * level *
            (level + 1) / (6 + Math.pow(level, 2) / 50 / acc_b) + (level - 1) * extra);
    };

    initExp() {
        this._exp[this._classId] = this.currentLevelExp();
    };

    currentExp() {
        return this._exp[this._classId];
    };

    currentLevelExp() {
        return this.expForLevel(this._level);
    };

    nextLevelExp() {
        return this.expForLevel(this._level + 1);
    };

    nextRequiredExp() {
        return this.nextLevelExp() - this.currentExp();
    };

    maxLevel() {
        return this.actor().maxLevel;
    };

    isMaxLevel() {
        return this._level >= this.maxLevel();
    };

    initSkills() {
        this._skills = [];
        for (const current of this.currentClass().learnings) {
            if (current.level <= this._level) {
                this.learnSkill(current.skillId);
            }
        }
    };

    initEquips(equips) {
        const slots = this.equipSlots();
        const maxSlots = slots.length;
        this._equips = [];
        for (let i = 0; i < maxSlots; i++) {
            this._equips[i] = new Game_Item();
        }
        for (let j = 0; j < equips.length; j++) {
            if (j < maxSlots) {
                this._equips[j].setEquip(slots[j] === 1, equips[j]);
            }
        }
        this.releaseUnequippableItems(true);
        this.refresh();
    };

    equipSlots() {
        const slots = [];
        for (let i = 1; i < $dataSystem.equipTypes.length; i++) {
            slots.push(i);
        }
        if (slots.length >= 2 && this.isDualWield()) {
            slots[1] = 1;
        }
        return slots;
    };

    equips() {
        return this._equips.map(item => item.object());
    };

    weapons() {
        return this.equips().filter(item => item && DataManager.isWeapon(item));
    };

    armors() {
        return this.equips().filter(item => item && DataManager.isArmor(item));
    };

    hasWeapon(weapon) {
        return this.weapons().contains(weapon);
    };

    hasArmor(armor) {
        return this.armors().contains(armor);
    };

    isEquipChangeOk(slotId) {
        return (!this.isEquipTypeLocked(this.equipSlots()[slotId]) &&
            !this.isEquipTypeSealed(this.equipSlots()[slotId]));
    };

    changeEquip(slotId, item) {
        if (this.tradeItemWithParty(item, this.equips()[slotId]) &&
            (!item || this.equipSlots()[slotId] === item.etypeId)) {
            this._equips[slotId].setObject(item);
            this.refresh();
        }
    };

    forceChangeEquip(slotId, item) {
        this._equips[slotId].setObject(item);
        this.releaseUnequippableItems(true);
        this.refresh();
    };

    tradeItemWithParty(newItem, oldItem) {
        if (newItem && !$gameParty.hasItem(newItem)) {
            return false;
        } else {
            $gameParty.gainItem(oldItem, 1);
            $gameParty.loseItem(newItem, 1);
            return true;
        }
    };

    changeEquipById(etypeId, itemId) {
        const slotId = etypeId - 1;
        if (this.equipSlots()[slotId] === 1) {
            this.changeEquip(slotId, $dataWeapons[itemId]);
        } else {
            this.changeEquip(slotId, $dataArmors[itemId]);
        }
    };

    isEquipped(item) {
        return this.equips().contains(item);
    };

    discardEquip(item) {
        const slotId = this.equips().indexOf(item);
        if (slotId >= 0) {
            this._equips[slotId].setObject(null);
        }
    };

    releaseUnequippableItems(forcing) {
        for (; ;) {
            const slots = this.equipSlots();
            const equips = this.equips();
            let changed = false;
            for (let i = 0; i < equips.length; i++) {
                const item = equips[i];
                if (item && (!this.canEquip(item) || item.etypeId !== slots[i])) {
                    if (!forcing) {
                        this.tradeItemWithParty(null, item);
                    }
                    this._equips[i].setObject(null);
                    changed = true;
                }
            }
            if (!changed) {
                break;
            }
        }
    };

    clearEquipments() {
        const maxSlots = this.equipSlots().length;
        for (let i = 0; i < maxSlots; i++) {
            if (this.isEquipChangeOk(i)) {
                this.changeEquip(i, null);
            }
        }
    };

    optimizeEquipments() {
        const maxSlots = this.equipSlots().length;
        this.clearEquipments();
        for (let i = 0; i < maxSlots; i++) {
            if (this.isEquipChangeOk(i)) {
                this.changeEquip(i, this.bestEquipItem(i));
            }
        }
    };

    bestEquipItem(slotId) {
        const etypeId = this.equipSlots()[slotId];
        const items = $gameParty.equipItems().filter(item => {
            return item.etypeId === etypeId && this.canEquip(item);
        });
        let bestItem = null;
        let bestPerformance = -1000;
        for (const item of items) {
            const performance = this.calcEquipItemPerformance(item);
            if (performance > bestPerformance) {
                bestPerformance = performance;
                bestItem = item;
            }
        }
        return bestItem;
    };

    calcEquipItemPerformance(item) {
        return item.params.reduce((a, b) => a + b);
    };

    isSkillWtypeOk(skill) {
        const wtypeId1 = skill.requiredWtypeId1;
        const wtypeId2 = skill.requiredWtypeId2;
        if ((wtypeId1 === 0 && wtypeId2 === 0) ||
            (wtypeId1 > 0 && this.isWtypeEquipped(wtypeId1)) ||
            (wtypeId2 > 0 && this.isWtypeEquipped(wtypeId2))) {
            return true;
        } else {
            return false;
        }
    };

    isWtypeEquipped(wtypeId) {
        return this.weapons().some(weapon => weapon.wtypeId === wtypeId);
    };

    refresh() {
        this.releaseUnequippableItems(false);
        super.refresh();
    };

    isActor() {
        return true;
    };

    friendsUnit() {
        return $gameParty;
    };

    opponentsUnit() {
        return $gameTroop;
    };

    index() {
        return $gameParty.members().indexOf(this);
    };

    isBattleMember() {
        return $gameParty.battleMembers().contains(this);
    };

    isFormationChangeOk() {
        return true;
    };

    currentClass() {
        return $dataClasses[this._classId];
    };

    isClass(gameClass) {
        return gameClass && this._classId === gameClass.id;
    };

    skills() {
        const list = [];
        for (const id of this._skills.concat(this.addedSkills())) {
            if (!list.contains($dataSkills[id])) {
                list.push($dataSkills[id]);
            }
        }
        return list;
    };

    usableSkills() {
        return this.skills().filter(skill => this.canUse(skill));
    };

    traitObjects() {
        let objects = super.traitObjects();
        objects = objects.concat([this.actor(), this.currentClass()]);
        const equips = this.equips();
        for (const item of equips) {
            item && objects.push(item);
        }
        return objects;
    };

    attackElements() {
        const set = super.attackElements();
        if (this.hasNoWeapons() && !set.contains(this.bareHandsElementId())) {
            set.push(this.bareHandsElementId());
        }
        return set;
    };

    hasNoWeapons() {
        return this.weapons().length === 0;
    };

    bareHandsElementId() {
        return 1;
    };

    paramMax(paramId) {
        if (paramId === 0) {
            return 9999;    // MHP
        }
        return super.paramMax(paramId);
    };

    paramBase(paramId) {
        return this.currentClass().params[paramId][this._level];
    };

    paramPlus(paramId) {
        let value = super.paramPlus(paramId);
        const equips = this.equips();
        for (const item of equips) {
            if (item) value += item.params[paramId];
        }
        return value;
    };

    attackAnimationId1() {
        if (this.hasNoWeapons()) {
            return this.bareHandsAnimationId();
        } else {
            const weapons = this.weapons();
            return weapons[0] ? weapons[0].animationId : 0;
        }
    };

    attackAnimationId2() {
        const weapons = this.weapons();
        return weapons[1] ? weapons[1].animationId : 0;
    };

    bareHandsAnimationId() {
        return 1;
    };

    changeExp(exp, show) {
        this._exp[this._classId] = Math.max(exp, 0);
        const lastLevel = this._level;
        const lastSkills = this.skills();
        while (!this.isMaxLevel() && this.currentExp() >= this.nextLevelExp()) {
            this.levelUp();
        }
        while (this.currentExp() < this.currentLevelExp()) {
            this.levelDown();
        }
        if (show && this._level > lastLevel) {
            this.displayLevelUp(this.findNewSkills(lastSkills));
        }
        this.refresh();
    };

    levelUp() {
        this._level++;
        for (const current of this.currentClass().learnings) {
            if (current.level === this._level) {
                this.learnSkill(current.skillId);
            }
        }
    };

    levelDown() {
        this._level--;
    };

    findNewSkills(lastSkills) {
        const newSkills = this.skills();
        for (const lastSkill of lastSkills) {
            const index = newSkills.indexOf(lastSkill);
            if (index >= 0) {
                newSkills.splice(index, 1);
            }
        }
        return newSkills;
    };

    displayLevelUp(newSkills) {
        const text = TextManager.levelUp.format(this._name, TextManager.level, this._level);
        $gameMessage.newPage();
        $gameMessage.add(text);
        for (const skill of newSkills) {
            $gameMessage.add(TextManager.obtainSkill.format(skill.name));
        }
    };

    gainExp(exp) {
        const newExp = this.currentExp() + Math.round(exp * this.finalExpRate());
        this.changeExp(newExp, this.shouldDisplayLevelUp());
    };

    finalExpRate() {
        return this.exr * (this.isBattleMember() ? 1 : this.benchMembersExpRate());
    };

    benchMembersExpRate() {
        return $dataSystem.optExtraExp ? 1 : 0;
    };

    shouldDisplayLevelUp() {
        return true;
    };

    changeLevel(level, show) {
        level = level.clamp(1, this.maxLevel());
        this.changeExp(this.expForLevel(level), show);
    };

    learnSkill(skillId) {
        if (!this.isLearnedSkill(skillId)) {
            this._skills.push(skillId);
            this._skills.sort((a, b) => a - b);
        }
    };

    forgetSkill(skillId) {
        const index = this._skills.indexOf(skillId);
        if (index >= 0) {
            this._skills.splice(index, 1);
        }
    };

    isLearnedSkill(skillId) {
        return this._skills.contains(skillId);
    };

    hasSkill(skillId) {
        return this.skills().contains($dataSkills[skillId]);
    };

    changeClass(classId, keepExp) {
        if (keepExp) {
            this._exp[classId] = this.currentExp();
        }
        this._classId = classId;
        this.changeExp(this._exp[this._classId] || 0, false);
        this.refresh();
    };

    setCharacterImage(characterName, characterIndex) {
        this._characterName = characterName;
        this._characterIndex = characterIndex;
    };

    setFaceImage(faceName, faceIndex) {
        this._faceName = faceName;
        this._faceIndex = faceIndex;
    };

    setBattlerImage(battlerName) {
        this._battlerName = battlerName;
    };

    isSpriteVisible() {
        return $gameSystem.isSideView();
    };

    startAnimation(animationId, mirror, delay) {
        mirror = !mirror;
        super.startAnimation(animationId, mirror, delay);
    };

    performActionStart(action) {
        super.performActionStart(action);
    };

    performAction(action) {
        super.performAction(action);
        if (action.isAttack()) {
            this.performAttack();
        } else if (action.isGuard()) {
            this.requestMotion('guard');
        } else if (action.isMagicSkill()) {
            this.requestMotion('spell');
        } else if (action.isSkill()) {
            this.requestMotion('skill');
        } else if (action.isItem()) {
            this.requestMotion('item');
        }
    };

    performActionEnd() {
        super.performActionEnd();
    };

    performAttack() {
        const weapons = this.weapons();
        const wtypeId = weapons[0] ? weapons[0].wtypeId : 0;
        const attackMotion = $dataSystem.attackMotions[wtypeId];
        if (attackMotion) {
            if (attackMotion.type === 0) {
                this.requestMotion('thrust');
            } else if (attackMotion.type === 1) {
                this.requestMotion('swing');
            } else if (attackMotion.type === 2) {
                this.requestMotion('missile');
            }
            this.startWeaponAnimation(attackMotion.weaponImageId);
        }
    };

    performDamage() {
        super.performDamage();
        if (this.isSpriteVisible()) {
            this.requestMotion('damage');
        } else {
            $gameScreen.startShake(5, 5, 10);
        }
        SoundManager.playActorDamage();
    };

    performEvasion() {
        super.performEvasion();
        this.requestMotion('evade');
    };

    performMagicEvasion() {
        super.performMagicEvasion();
        this.requestMotion('evade');
    };

    performCounter() {
        super.performCounter();
        this.performAttack();
    };

    performCollapse() {
        super.performCollapse();
        if ($gameParty.inBattle()) {
            SoundManager.playActorCollapse();
        }
    };

    performVictory() {
        if (this.canMove()) {
            this.requestMotion('victory');
        }
    };

    performEscape() {
        if (this.canMove()) {
            this.requestMotion('escape');
        }
    };

    makeActionList() {
        const list = [];
        let action = new Game_Action(this);
        action.setAttack();
        list.push(action);
        for (const skill of this.usableSkills()) {
            action = new Game_Action(this);
            action.setSkill(skill.id);
            list.push(action);
        }
        return list;
    };

    makeAutoBattleActions() {
        for (let i = 0; i < this.numActions(); i++) {
            const list = this.makeActionList();
            let maxValue = Number.MIN_VALUE;
            for (const l of list) {
                const value = l.evaluate();
                if (value > maxValue) {
                    maxValue = value;
                    this.setAction(i, l);
                }
            }
        }
        this.setActionState('waiting');
    };

    makeConfusionActions() {
        for (let i = 0; i < this.numActions(); i++) {
            this.action(i).setConfusion();
        }
        this.setActionState('waiting');
    };

    makeActions() {
        super.makeActions();
        if (this.numActions() > 0) {
            this.setActionState('undecided');
        } else {
            this.setActionState('waiting');
        }
        if (this.isAutoBattle()) {
            this.makeAutoBattleActions();
        } else if (this.isConfused()) {
            this.makeConfusionActions();
        }
    };

    onPlayerWalk() {
        this.clearResult();
        this.checkFloorEffect();
        if ($gamePlayer.isNormal()) {
            this.turnEndOnMap();
            for (const state of this.states()) {
                this.updateStateSteps(state);
            }
            this.showAddedStates();
            this.showRemovedStates();
        }
    };

    updateStateSteps(state) {
        if (state.removeByWalking) {
            if (this._stateSteps[state.id] > 0) {
                if (--this._stateSteps[state.id] === 0) {
                    this.removeState(state.id);
                }
            }
        }
    };

    showAddedStates() {
        for (const state of this.result().addedStateObjects()) {
            if (state.message1) {
                $gameMessage.add(this._name + state.message1);
            }
        }
    };

    showRemovedStates() {
        for (const state of this.result().removedStateObjects()) {
            if (state.message4) {
                $gameMessage.add(this._name + state.message4);
            }
        }
    };

    stepsForTurn() {
        return 20;
    };

    turnEndOnMap() {
        if ($gameParty.steps() % this.stepsForTurn() === 0) {
            this.onTurnEnd();
            if (this.result().hpDamage > 0) {
                this.performMapDamage();
            }
        }
    };

    checkFloorEffect() {
        if ($gamePlayer.isOnDamageFloor()) {
            this.executeFloorDamage();
        }
    };

    executeFloorDamage() {
        let damage = Math.floor(this.basicFloorDamage() * this.fdr);
        damage = Math.min(damage, this.maxFloorDamage());
        this.gainHp(-damage);
        if (damage > 0) {
            this.performMapDamage();
        }
    };

    basicFloorDamage() {
        return 10;
    };

    maxFloorDamage() {
        return $dataSystem.optFloorDeath ? this.hp : Math.max(this.hp - 1, 0);
    };

    performMapDamage() {
        if (!$gameParty.inBattle()) {
            $gameScreen.startFlashForDamage();
        }
    };

    clearActions() {
        super.clearActions();
        this._actionInputIndex = 0;
    };

    inputtingAction() {
        return this.action(this._actionInputIndex);
    };

    selectNextCommand() {
        if (this._actionInputIndex < this.numActions() - 1) {
            this._actionInputIndex++;
            return true;
        } else {
            return false;
        }
    };

    selectPreviousCommand() {
        if (this._actionInputIndex > 0) {
            this._actionInputIndex--;
            return true;
        } else {
            return false;
        }
    };

    lastMenuSkill() {
        return this._lastMenuSkill.object();
    };

    setLastMenuSkill(skill) {
        this._lastMenuSkill.setObject(skill);
    };

    lastBattleSkill() {
        return this._lastBattleSkill.object();
    };

    setLastBattleSkill(skill) {
        this._lastBattleSkill.setObject(skill);
    };

    lastCommandSymbol() {
        return this._lastCommandSymbol;
    };

    setLastCommandSymbol(symbol) {
        this._lastCommandSymbol = symbol;
    };

    testEscape(item) {
        return item.effects.some(effect => effect && effect.code === Game_Action.EFFECT_SPECIAL);
    };

    meetsUsableItemConditions(item) {
        if ($gameParty.inBattle() && !BattleManager.canEscape() && this.testEscape(item)) {
            return false;
        }
        return Game_BattlerBase.prototype.meetsUsableItemConditions.call(this, item);
    };
};

//-----------------------------------------------------------------------------

// Game_Enemy
//
// The game object class for an enemy.
var Game_Enemy = class extends Game_Battler {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize(enemyId, x, y) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize();
        this.setup(enemyId, x, y);
    };

    initMembers() {
        super.initMembers();
        this._enemyId = 0;
        this._letter = '';
        this._plural = false;
        this._screenX = 0;
        this._screenY = 0;
    };

    setup(enemyId, x, y) {
        this._enemyId = enemyId;
        this._screenX = x;
        this._screenY = y;
        this.recoverAll();
    };

    isEnemy() {
        return true;
    };

    friendsUnit() {
        return $gameTroop;
    };

    opponentsUnit() {
        return $gameParty;
    };

    index() {
        return $gameTroop.members().indexOf(this);
    };

    isBattleMember() {
        return this.index() >= 0;
    };

    enemyId() {
        return this._enemyId;
    };

    enemy() {
        return $dataEnemies[this._enemyId];
    };

    traitObjects() {
        return super.traitObjects().concat(this.enemy());
    };

    paramBase(paramId) {
        return this.enemy().params[paramId];
    };

    exp() {
        return this.enemy().exp;
    };

    gold() {
        return this.enemy().gold;
    };

    makeDropItems() {
        return this.enemy().dropItems.reduce((r, di) => {
            if (di.kind > 0 && Math.random() * di.denominator < this.dropItemRate()) {
                return r.concat(this.itemObject(di.kind, di.dataId));
            } else {
                return r;
            }
        }, []);
    };

    dropItemRate() {
        return $gameParty.hasDropItemDouble() ? 2 : 1;
    };

    itemObject(kind, dataId) {
        if (kind === 1) {
            return $dataItems[dataId];
        } else if (kind === 2) {
            return $dataWeapons[dataId];
        } else if (kind === 3) {
            return $dataArmors[dataId];
        } else {
            return null;
        }
    };

    isSpriteVisible() {
        return true;
    };

    screenX() {
        return this._screenX;
    };

    screenY() {
        return this._screenY;
    };

    battlerName() {
        return this.enemy().battlerName;
    };

    battlerHue() {
        return this.enemy().battlerHue;
    };

    originalName() {
        return this.enemy().name;
    };

    name() {
        return this.originalName() + (this._plural ? this._letter : '');
    };

    isLetterEmpty() {
        return this._letter === '';
    };

    setLetter(letter) {
        this._letter = letter;
    };

    setPlural(plural) {
        this._plural = plural;
    };

    performActionStart(action) {
        super.performActionStart(action);
        this.requestEffect('whiten');
    };

    performAction(action) {
        super.performAction(action);
    };

    performActionEnd() {
        super.performActionEnd();
    };

    performDamage() {
        super.performDamage();
        SoundManager.playEnemyDamage();
        this.requestEffect('blink');
    };

    performCollapse() {
        super.performCollapse();
        switch (this.collapseType()) {
            case 0:
                this.requestEffect('collapse');
                SoundManager.playEnemyCollapse();
                break;
            case 1:
                this.requestEffect('bossCollapse');
                SoundManager.playBossCollapse1();
                break;
            case 2:
                this.requestEffect('instantCollapse');
                break;
        }
    };

    transform(enemyId) {
        const name = this.originalName();
        this._enemyId = enemyId;
        if (this.originalName() !== name) {
            this._letter = '';
            this._plural = false;
        }
        this.refresh();
        if (this.numActions() > 0) {
            this.makeActions();
        }
    };

    meetsCondition(action) {
        const param1 = action.conditionParam1;
        const param2 = action.conditionParam2;
        switch (action.conditionType) {
            case 1:
                return this.meetsTurnCondition(param1, param2);
            case 2:
                return this.meetsHpCondition(param1, param2);
            case 3:
                return this.meetsMpCondition(param1, param2);
            case 4:
                return this.meetsStateCondition(param1);
            case 5:
                return this.meetsPartyLevelCondition(param1);
            case 6:
                return this.meetsSwitchCondition(param1);
            default:
                return true;
        }
    };

    meetsTurnCondition(param1, param2) {
        const n = $gameTroop.turnCount();
        if (param2 === 0) {
            return n === param1;
        } else {
            return n > 0 && n >= param1 && n % param2 === param1 % param2;
        }
    };

    meetsHpCondition(param1, param2) {
        return this.hpRate() >= param1 && this.hpRate() <= param2;
    };

    meetsMpCondition(param1, param2) {
        return this.mpRate() >= param1 && this.mpRate() <= param2;
    };

    meetsStateCondition(param) {
        return this.isStateAffected(param);
    };

    meetsPartyLevelCondition(param) {
        return $gameParty.highestLevel() >= param;
    };

    meetsSwitchCondition(param) {
        return $gameSwitches.value(param);
    };

    isActionValid(action) {
        return this.meetsCondition(action) && this.canUse($dataSkills[action.skillId]);
    };

    selectAction(actionList, ratingZero) {
        const sum = actionList.reduce((r, a) => r + a.rating - ratingZero, 0);
        if (sum > 0) {
            let value = Math.randomInt(sum);
            for (const action of actionList) {
                value -= action.rating - ratingZero;
                if (value < 0) {
                    return action;
                }
            }
        } else {
            return null;
        }
    };

    selectAllActions(actionList) {
        const ratingMax = Math.max.apply(null, actionList.map(a => a.rating));
        const ratingZero = ratingMax - 3;
        actionList = actionList.filter(a => a.rating > ratingZero);
        for (let i = 0; i < this.numActions(); i++) {
            this.action(i).setEnemyAction(this.selectAction(actionList, ratingZero));
        }
    };

    makeActions() {
        super.makeActions();
        if (this.numActions() > 0) {
            const actionList = this.enemy().actions.filter(a => this.isActionValid(a));
            if (actionList.length > 0) {
                this.selectAllActions(actionList);
            }
        }
        this.setActionState('waiting');
    };
};

//-----------------------------------------------------------------------------

// Game_Actors
//
// The wrapper class for an actor array.
var Game_Actors = class {
    constructor(...args) {
        this.initialize(...args);
    };

    initialize() {
        this._data = [];
    };

    actor(actorId) {
        if ($dataActors[actorId]) {
            if (!this._data[actorId]) {
                this._data[actorId] = new Game_Actor(actorId);
            }
            return this._data[actorId];
        }
        return null;
    };
};

//-----------------------------------------------------------------------------

// Game_Unit
//
// The superclass of Game_Party and Game_Troop.
var Game_Unit = class {
    constructor(...args) {
        this.initialize(...args);
    };

    initialize() {
        this._inBattle = false;
    };

    inBattle() {
        return this._inBattle;
    };

    members() {
        return [];
    };

    aliveMembers() {
        return this.members().filter(member => member.isAlive());
    };

    deadMembers() {
        return this.members().filter(member => member.isDead());
    };

    movableMembers() {
        return this.members().filter(member => member.canMove());
    };

    clearActions() {
        return this.members().forEach(member => member.clearActions());
    };

    agility() {
        const members = this.members();
        if (members.length === 0) {
            return 1;
        }
        const sum = members.reduce((r, member) => r + member.agi, 0);
        return sum / members.length;
    };

    tgrSum() {
        return this.aliveMembers().reduce((r, member) => r + member.tgr, 0);
    };

    randomTarget() {
        let tgrRand = Math.random() * this.tgrSum();
        let target = null;
        for (const member of this.aliveMembers()) {
            tgrRand -= member.tgr;
            if (tgrRand <= 0 && !target) {
                target = member;
            }
        }
        return target;
    };

    randomDeadTarget() {
        const members = this.deadMembers();
        if (members.length === 0) {
            return null;
        }
        return members[Math.floor(Math.random() * members.length)];
    };

    smoothTarget(index) {
        if (index < 0) {
            index = 0;
        }
        const member = this.members()[index];
        return (member && member.isAlive()) ? member : this.aliveMembers()[0];
    };

    smoothDeadTarget(index) {
        if (index < 0) {
            index = 0;
        }
        const member = this.members()[index];
        return (member && member.isDead()) ? member : this.deadMembers()[0];
    };

    clearResults() {
        for (const member of this.members()) {
            member.clearResult();
        }
    };

    onBattleStart() {
        for (const member of this.members()) {
            member.onBattleStart();
        }
        this._inBattle = true;
    };

    onBattleEnd() {
        this._inBattle = false;
        for (const member of this.members()) {
            member.onBattleEnd();
        }
    };

    makeActions() {
        for (const member of this.members()) {
            member.makeActions();
        }
    };

    select(activeMember) {
        for (const member of this.members()) {
            if (member === activeMember) {
                member.select();
            } else {
                member.deselect();
            }
        }
    };

    isAllDead() {
        return this.aliveMembers().length === 0;
    };

    substituteBattler() {
        for (const member of this.members()) {
            if (member.isSubstitute()) {
                return member;
            }
        }
    };
};

//-----------------------------------------------------------------------------

// Game_Party
//
// The game object class for the party. Information such as gold and items is
// included.
var Game_Party = class extends Game_Unit {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    static ABILITY_ENCOUNTER_HALF = 0;
    static ABILITY_ENCOUNTER_NONE = 1;
    static ABILITY_CANCEL_SURPRISE = 2;
    static ABILITY_RAISE_PREEMPTIVE = 3;
    static ABILITY_GOLD_DOUBLE = 4;
    static ABILITY_DROP_ITEM_DOUBLE = 5;

    initialize() {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize();

        this._gold = 0;
        this._steps = 0;
        this._lastItem = new Game_Item();
        this._menuActorId = 0;
        this._targetActorId = 0;
        this._actors = [];
        this.initAllItems();
    };

    initAllItems() {
        this._items = {};
        this._weapons = {};
        this._armors = {};
    };

    exists() {
        return this._actors.length > 0;
    };

    size() {
        return this.members().length;
    };

    isEmpty() {
        return this.size() === 0;
    };

    members() {
        return this.inBattle() ? this.battleMembers() : this.allMembers();
    };

    allMembers() {
        return this._actors.map(id => $gameActors.actor(id));
    };

    battleMembers() {
        return this.allMembers().slice(0, this.maxBattleMembers()).filter(actor => actor.isAppeared());
    };

    maxBattleMembers() {
        return 4;
    };

    leader() {
        return this.battleMembers()[0];
    };

    reviveBattleMembers() {
        for (const actor of this.battleMembers()) {
            actor.isDead() && actor.setHp(1);
        }
    };

    items() {
        const list = [];
        for (let id in this._items) {
            list.push($dataItems[id]);
        }
        return list;
    };

    weapons() {
        const list = [];
        for (let id in this._weapons) {
            list.push($dataWeapons[id]);
        }
        return list;
    };

    armors() {
        const list = [];
        for (let id in this._armors) {
            list.push($dataArmors[id]);
        }
        return list;
    };

    equipItems() {
        return this.weapons().concat(this.armors());
    };

    allItems() {
        return this.items().concat(this.equipItems());
    };

    itemContainer(item) {
        if (!item) {
            return null;
        } else if (DataManager.isItem(item)) {
            return this._items;
        } else if (DataManager.isWeapon(item)) {
            return this._weapons;
        } else if (DataManager.isArmor(item)) {
            return this._armors;
        } else {
            return null;
        }
    };

    setupStartingMembers() {
        this._actors = [];
        for (const actorId of $dataSystem.partyMembers) {
            if ($gameActors.actor(actorId)) {
                this._actors.push(actorId);
            }
        }
    };

    name() {
        const numBattleMembers = this.battleMembers().length;
        if (numBattleMembers === 0) {
            return '';
        } else if (numBattleMembers === 1) {
            return this.leader().name();
        } else {
            return TextManager.partyName.format(this.leader().name());
        }
    };

    setupBattleTest() {
        this.setupBattleTestMembers();
        this.setupBattleTestItems();
    };

    setupBattleTestMembers() {
        for (const battler of $dataSystem.testBattlers) {
            const actor = $gameActors.actor(battler.actorId);
            if (actor) {
                actor.changeLevel(battler.level, false);
                actor.initEquips(battler.equips);
                actor.recoverAll();
                this.addActor(battler.actorId);
            }
        }
    };

    setupBattleTestItems() {
        for (const item of $dataItems) {
            if (item && item.name.length > 0) {
                this.gainItem(item, this.maxItems(item));
            }
        }
    };

    highestLevel() {
        return Math.max.apply(null, this.members().map(actor => actor.level));
    };

    addActor(actorId) {
        if (!this._actors.contains(actorId)) {
            this._actors.push(actorId);
            $gamePlayer.refresh();
            $gameMap.requestRefresh();
        }
    };

    removeActor(actorId) {
        if (this._actors.contains(actorId)) {
            this._actors.splice(this._actors.indexOf(actorId), 1);
            $gamePlayer.refresh();
            $gameMap.requestRefresh();
        }
    };

    gold() {
        return this._gold;
    };

    gainGold(amount) {
	    const newGold = (Number(this._gold) || 0) + (Number(amount) || 0);
	    this._gold = Math.max(0, Math.min(this.maxGold(), newGold));
    };

    loseGold(amount) {
        this.gainGold(-amount);
    };

    maxGold() {
        return 99999999;
    };

    steps() {
        return this._steps;
    };

    increaseSteps() {
        this._steps++;
    };

    numItems(item) {
        const container = this.itemContainer(item);
        return container ? container[item.id] || 0 : 0;
    };

    maxItems(item) {
        return 999;
    };

    hasMaxItems(item) {
        return this.numItems(item) >= this.maxItems(item);
    };

    hasItem(item, includeEquip) {
        if (includeEquip === undefined) {
            includeEquip = false;
        }
        if (this.numItems(item) > 0) {
            return true;
        } else if (includeEquip && this.isAnyMemberEquipped(item)) {
            return true;
        } else {
            return false;
        }
    };

    isAnyMemberEquipped(item) {
        return this.members().some(actor => actor.equips().contains(item));
    };
    /*
    gainItem(item, amount, includeEquip) {
        const container = this.itemContainer(item);
        if (container) {
            const lastNumber = this.numItems(item);
			let addNumber = Number(amount) || 0;
            const newNumber = lastNumber + addNumber;
            container[item.id] = newNumber.clamp(0, this.maxItems(item));
            if (container[item.id] === 0) {
                delete container[item.id];
            }
            if (includeEquip && newNumber < 0) {
                this.discardMembersEquip(item, -newNumber);
            }
            $gameMap.requestRefresh();
        }
    };
	*/
	gainItem(item, amount, includeEquip) {	
		  const container = this.itemContainer(item);
		  if (!container || !item) return;

		  const last = Number(this.numItems(item));
		  const add  = Number(amount);

		  const lastNumber = Number.isFinite(last) ? last : 0;
		  const addNumber  = Number.isFinite(add)  ? add  : 0;

		  const newNumber = lastNumber + addNumber;

		  const maxRaw = Number(this.maxItems(item));
		  const max = Number.isFinite(maxRaw) ? maxRaw : 0;

		  const clamped = Math.max(0, Math.min(max, newNumber));
		  container[item.id] = clamped;

		  if (container[item.id] === 0) delete container[item.id];

		  if (includeEquip && newNumber < 0) {
			this.discardMembersEquip(item, -newNumber);
		  }
		  $gameMap.requestRefresh();
	};
    discardMembersEquip(item, amount) {
        let n = amount;
        for (const actor of this.members()) {
            while (n > 0 && actor.isEquipped(item)) {
                actor.discardEquip(item);
                n--;
            }
        }
    };

    loseItem(item, amount, includeEquip) {
        this.gainItem(item, -amount, includeEquip);
    };

    consumeItem(item) {
        if (DataManager.isItem(item) && item.consumable) {
            this.loseItem(item, 1);
        }
    };

    canUse(item) {
        return this.members().some(actor => actor.canUse(item));
    };

    canInput() {
        return this.members().some(actor => actor.canInput());
    };

    isAllDead() {
        if (super.isAllDead()) {
            return this.inBattle() || !this.isEmpty();
        } else {
            return false;
        }
    };

    onPlayerWalk() {
        this.members().forEach(actor => actor.onPlayerWalk());
    };

    menuActor() {
        let actor = $gameActors.actor(this._menuActorId);
        if (!this.members().contains(actor)) {
            actor = this.members()[0];
        }
        return actor;
    };

    setMenuActor(actor) {
        this._menuActorId = actor.actorId();
    };

    makeMenuActorNext() {
        let index = this.members().indexOf(this.menuActor());
        if (index >= 0) {
            index = (index + 1) % this.members().length;
            this.setMenuActor(this.members()[index]);
        } else {
            this.setMenuActor(this.members()[0]);
        }
    };

    makeMenuActorPrevious() {
        let index = this.members().indexOf(this.menuActor());
        if (index >= 0) {
            index = (index + this.members().length - 1) % this.members().length;
            this.setMenuActor(this.members()[index]);
        } else {
            this.setMenuActor(this.members()[0]);
        }
    };

    targetActor() {
        let actor = $gameActors.actor(this._targetActorId);
        if (!this.members().contains(actor)) {
            actor = this.members()[0];
        }
        return actor;
    };

    setTargetActor(actor) {
        this._targetActorId = actor.actorId();
    };

    lastItem() {
        return this._lastItem.object();
    };

    setLastItem(item) {
        this._lastItem.setObject(item);
    };

    swapOrder(index1, index2) {
        const temp = this._actors[index1];
        this._actors[index1] = this._actors[index2];
        this._actors[index2] = temp;
        $gamePlayer.refresh();
    };

    charactersForSavefile() {
        return this.battleMembers().map(actor => [actor.characterName(), actor.characterIndex()]);
    };

    facesForSavefile() {
        return this.battleMembers().map(actor => [actor.faceName(), actor.faceIndex()]);
    };

    partyAbility(abilityId) {
        return this.battleMembers().some(actor => actor.partyAbility(abilityId));
    };

    hasEncounterHalf() {
        return this.partyAbility(Game_Party.ABILITY_ENCOUNTER_HALF);
    };

    hasEncounterNone() {
        return this.partyAbility(Game_Party.ABILITY_ENCOUNTER_NONE);
    };

    hasCancelSurprise() {
        return this.partyAbility(Game_Party.ABILITY_CANCEL_SURPRISE);
    };

    hasRaisePreemptive() {
        return this.partyAbility(Game_Party.ABILITY_RAISE_PREEMPTIVE);
    };

    hasGoldDouble() {
        return this.partyAbility(Game_Party.ABILITY_GOLD_DOUBLE);
    };

    hasDropItemDouble() {
        return this.partyAbility(Game_Party.ABILITY_DROP_ITEM_DOUBLE);
    };

    ratePreemptive(troopAgi) {
        let rate = this.agility() >= troopAgi ? 0.05 : 0.03;
        if (this.hasRaisePreemptive()) {
            rate *= 4;
        }
        return rate;
    };

    rateSurprise(troopAgi) {
        let rate = this.agility() >= troopAgi ? 0.03 : 0.05;
        if (this.hasCancelSurprise()) {
            rate = 0;
        }
        return rate;
    };

    performVictory() {
        for (const actor of this.members()) {
            actor.performVictory();
        }
    };

    performEscape() {
        for (const actor of this.members()) {
            actor.performEscape();
        }
    };

    removeBattleStates() {
        for (const actor of this.members()) {
            actor.removeBattleStates();
        }
    };

    requestMotionRefresh() {
        for (const actor of this.members()) {
            actor.requestMotionRefresh();
        }
    };
};

//-----------------------------------------------------------------------------

// Game_Troop
//
// The game object class for a troop and the battle-related data.
var Game_Troop = class extends Game_Unit {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    static LETTER_TABLE_HALF = [
        ' A', ' B', ' C', ' D', ' E', ' F', ' G', ' H', ' I', ' J', ' K', ' L', ' M',
        ' N', ' O', ' P', ' Q', ' R', ' S', ' T', ' U', ' V', ' W', ' X', ' Y', ' Z'
    ];
    static LETTER_TABLE_FULL = [
        'Ａ', 'Ｂ', 'Ｃ', 'Ｄ', 'Ｅ', 'Ｆ', 'Ｇ', 'Ｈ', 'Ｉ', 'Ｊ', 'Ｋ', 'Ｌ', 'Ｍ',
        'Ｎ', 'Ｏ', 'Ｐ', 'Ｑ', 'Ｒ', 'Ｓ', 'Ｔ', 'Ｕ', 'Ｖ', 'Ｗ', 'Ｘ', 'Ｙ', 'Ｚ'
    ];

    initialize() {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize();

        this._interpreter = new Game_Interpreter();
        this.clear();
    };

    isEventRunning() {
        return this._interpreter.isRunning();
    };

    updateInterpreter() {
        this._interpreter.update();
    };

    turnCount() {
        return this._turnCount;
    };

    members() {
        return this._enemies;
    };

    clear() {
        this._interpreter.clear();
        this._troopId = 0;
        this._eventFlags = {};
        this._enemies = [];
        this._turnCount = 0;
        this._namesCount = {};
    };

    troop() {
        return $dataTroops[this._troopId];
    };

    setup(troopId) {
        this.clear();
        this._troopId = troopId;
        this._enemies = [];
        for (const member of this.troop().members) {
            if ($dataEnemies[member.enemyId]) {
                const enemyId = member.enemyId;
                const x = member.x;
                const y = member.y;
                const enemy = new Game_Enemy(enemyId, x, y);
                if (member.hidden) {
                    enemy.hide();
                }
                this._enemies.push(enemy);
            }
        }
        this.makeUniqueNames();
    };

    makeUniqueNames() {
        const table = this.letterTable();
        for (const enemy of this.members()) {
            if (enemy.isAlive() && enemy.isLetterEmpty()) {
                const name = enemy.originalName();
                const n = this._namesCount[name] || 0;
                enemy.setLetter(table[n % table.length]);
                this._namesCount[name] = n + 1;
            }
        }
        for (const enemy of this.members()) {
            const name = enemy.originalName();
            if (this._namesCount[name] >= 2) {
                enemy.setPlural(true);
            }
        }
    };

    letterTable() {
        return $gameSystem.isCJK()
            ? Game_Troop.LETTER_TABLE_FULL
            : Game_Troop.LETTER_TABLE_HALF;
    };

    enemyNames() {
        const names = [];
        for (const enemy of this.members()) {
            const name = enemy.originalName();
            if (enemy.isAlive() && !names.contains(name)) {
                names.push(name);
            }
        }
        return names;
    };

    meetsConditions(page) {
        const c = page.conditions;
        if (!c.turnEnding && !c.turnValid && !c.enemyValid &&
            !c.actorValid && !c.switchValid) {
            return false;  // Conditions not set
        }
        if (c.turnEnding) {
            if (!BattleManager.isTurnEnd()) {
                return false;
            }
        }
        if (c.turnValid) {
            const n = this._turnCount;
            const a = c.turnA;
            const b = c.turnB;
            if ((b === 0 && n !== a)) {
                return false;
            }
            if ((b > 0 && (n < 1 || n < a || n % b !== a % b))) {
                return false;
            }
        }
        if (c.enemyValid) {
            const enemy = $gameTroop.members()[c.enemyIndex];
            if (!enemy || enemy.hpRate() * 100 > c.enemyHp) {
                return false;
            }
        }
        if (c.actorValid) {
            const actor = $gameActors.actor(c.actorId);
            if (!actor || actor.hpRate() * 100 > c.actorHp) {
                return false;
            }
        }
        if (c.switchValid) {
            if (!$gameSwitches.value(c.switchId)) {
                return false;
            }
        }
        return true;
    };

    setupBattleEvent() {
        if (!this._interpreter.isRunning()) {
            if (this._interpreter.setupReservedCommonEvent()) {
                return;
            }
            const pages = this.troop().pages;
            for (let i = 0; i < pages.length; i++) {
                const page = pages[i];
                if (this.meetsConditions(page) && !this._eventFlags[i]) {
                    this._interpreter.setup(page.list);
                    if (page.span <= 1) {
                        this._eventFlags[i] = true;
                    }
                    break;
                }
            }
        }
    };

    increaseTurn() {
        const pages = this.troop().pages;
        for (let i = 0; i < pages.length; i++) {
            const page = pages[i];
            if (page.span === 1) {
                this._eventFlags[i] = false;
            }
        }
        this._turnCount++;
    };

    expTotal() {
        return this.deadMembers().reduce((r, enemy) => r + enemy.exp(), 0);
    };

    goldTotal() {
        return this.deadMembers().reduce((r, enemy) => r + enemy.gold(), 0) * this.goldRate();
    };

    goldRate() {
        return $gameParty.hasGoldDouble() ? 2 : 1;
    };

    makeDropItems() {
        return this.deadMembers().reduce((r, enemy) => r.concat(enemy.makeDropItems()), []);
    };
};

//-----------------------------------------------------------------------------

// Game_Map
//
// The game object class for a map. It contains scrolling and passage
// determination functions.
var Game_Map = class {
    constructor(...args) {
        this.initialize(...args);
    };

    initialize() {
        this._interpreter = new Game_Interpreter();
        this._mapId = 0;
        this._tilesetId = 0;
        this._events = [];
        this._commonEvents = [];
        this._vehicles = [];
        this._displayX = 0;
        this._displayY = 0;
        this._nameDisplay = true;
        this._scrollDirection = 2;
        this._scrollRest = 0;
        this._scrollSpeed = 4;
        this._parallaxName = '';
        this._parallaxZero = false;
        this._parallaxLoopX = false;
        this._parallaxLoopY = false;
        this._parallaxSx = 0;
        this._parallaxSy = 0;
        this._parallaxX = 0;
        this._parallaxY = 0;
        this._battleback1Name = null;
        this._battleback2Name = null;
        this.createVehicles();
    };

    setup(mapId) {
        if (!$dataMap) {
            throw new Error('The map data is not available');
        }
        this._mapId = mapId;
        this._tilesetId = $dataMap.tilesetId;
        this._displayX = 0;
        this._displayY = 0;
        this.refereshVehicles();
        this.setupEvents();
        this.setupScroll();
        this.setupParallax();
        this.setupBattleback();
        this._needsRefresh = false;
    };

    isEventRunning() {
        return this._interpreter.isRunning() || this.isAnyEventStarting();
    };

    tileWidth() {
        return 48;
    };

    tileHeight() {
        return 48;
    };

    mapId() {
        return this._mapId;
    };

    tilesetId() {
        return this._tilesetId;
    };

    displayX() {
        return this._displayX;
    };

    displayY() {
        return this._displayY;
    };

    parallaxName() {
        return this._parallaxName;
    };

    battleback1Name() {
        return this._battleback1Name;
    };

    battleback2Name() {
        return this._battleback2Name;
    };

    requestRefresh(mapId) {
        this._needsRefresh = true;
    };

    isNameDisplayEnabled() {
        return this._nameDisplay;
    };

    disableNameDisplay() {
        this._nameDisplay = false;
    };

    enableNameDisplay() {
        this._nameDisplay = true;
    };

    createVehicles() {
        this._vehicles = [];
        this._vehicles[0] = new Game_Vehicle('boat');
        this._vehicles[1] = new Game_Vehicle('ship');
        this._vehicles[2] = new Game_Vehicle('airship');
    };

    refereshVehicles() {
        for (const vehicle of this._vehicles) {
            vehicle.refresh();
        }
    };

    vehicles() {
        return this._vehicles;
    };

    vehicle(type) {
        if (type === 0 || type === 'boat') {
            return this.boat();
        } else if (type === 1 || type === 'ship') {
            return this.ship();
        } else if (type === 2 || type === 'airship') {
            return this.airship();
        } else {
            return null;
        }
    };

    boat() {
        return this._vehicles[0];
    };

    ship() {
        return this._vehicles[1];
    };

    airship() {
        return this._vehicles[2];
    };

    setupEvents() {
        this._events = [];
        for (let i = 0; i < $dataMap.events.length; i++) {
            if ($dataMap.events[i]) {
                this._events[i] = new Game_Event(this._mapId, i);
            }
        }
        this._commonEvents = this.parallelCommonEvents().map(commonEvent => new Game_CommonEvent(commonEvent.id));
        this.refreshTileEvents();
    };

    events() {
        return this._events.filter(event => !!event);
    };

    event(eventId) {
        return this._events[eventId];
    };

    eraseEvent(eventId) {
        this._events[eventId].erase();
    };

    parallelCommonEvents() {
        return $dataCommonEvents.filter(commonEvent => commonEvent && commonEvent.trigger === 2);
    };

    setupScroll() {
        this._scrollDirection = 2;
        this._scrollRest = 0;
        this._scrollSpeed = 4;
    };

    setupParallax() {
        this._parallaxName = $dataMap.parallaxName || '';
        this._parallaxZero = ImageManager.isZeroParallax(this._parallaxName);
        this._parallaxLoopX = $dataMap.parallaxLoopX;
        this._parallaxLoopY = $dataMap.parallaxLoopY;
        this._parallaxSx = $dataMap.parallaxSx;
        this._parallaxSy = $dataMap.parallaxSy;
        this._parallaxX = 0;
        this._parallaxY = 0;
    };

    setupBattleback() {
        if ($dataMap.specifyBattleback) {
            this._battleback1Name = $dataMap.battleback1Name;
            this._battleback2Name = $dataMap.battleback2Name;
        } else {
            this._battleback1Name = null;
            this._battleback2Name = null;
        }
    };

    setDisplayPos(x, y) {
        if (this.isLoopHorizontal()) {
            this._displayX = x.mod(this.width());
            this._parallaxX = x;
        } else {
            const endX = this.width() - this.screenTileX();
            this._displayX = endX < 0 ? endX / 2 : x.clamp(0, endX);
            this._parallaxX = this._displayX;
        }
        if (this.isLoopVertical()) {
            this._displayY = y.mod(this.height());
            this._parallaxY = y;
        } else {
            const endY = this.height() - this.screenTileY();
            this._displayY = endY < 0 ? endY / 2 : y.clamp(0, endY);
            this._parallaxY = this._displayY;
        }
    };

    parallaxOx() {
        if (this._parallaxZero) {
            return this._parallaxX * this.tileWidth();
        } else if (this._parallaxLoopX) {
            return this._parallaxX * this.tileWidth() / 2;
        } else {
            return 0;
        }
    };

    parallaxOy() {
        if (this._parallaxZero) {
            return this._parallaxY * this.tileHeight();
        } else if (this._parallaxLoopY) {
            return this._parallaxY * this.tileHeight() / 2;
        } else {
            return 0;
        }
    };

    tileset() {
        return $dataTilesets[this._tilesetId];
    };

    tilesetFlags() {
        const tileset = this.tileset();
        if (tileset) {
            return tileset.flags;
        } else {
            return [];
        }
    };

    displayName() {
        return $dataMap.displayName;
    };

    width() {
        return $dataMap.width;
    };

    height() {
        return $dataMap.height;
    };

    data() {
        return $dataMap.data;
    };

    isLoopHorizontal() {
        return $dataMap
            ? ($dataMap.scrollType === 2 || $dataMap.scrollType === 3)
            : false;
    };

    isLoopVertical() {
        return $dataMap
            ? ($dataMap.scrollType === 1 || $dataMap.scrollType === 3)
            : false;
    };

    isDashDisabled() {
        return $dataMap.disableDashing;
    };

    encounterList() {
        return $dataMap.encounterList;
    };

    encounterStep() {
        return $dataMap.encounterStep;
    };

    isOverworld() {
        return this.tileset() && this.tileset().mode === 0;
    };

    screenTileX() {
        return Graphics.width / this.tileWidth();
    };

    screenTileY() {
        return Graphics.height / this.tileHeight();
    };

    adjustX(x) {
        if (this.isLoopHorizontal() && x < this._displayX -
            (this.width() - this.screenTileX()) / 2) {
            return x - this._displayX + $dataMap.width;
        } else {
            return x - this._displayX;
        }
    };

    adjustY(y) {
        if (this.isLoopVertical() && y < this._displayY -
            (this.height() - this.screenTileY()) / 2) {
            return y - this._displayY + $dataMap.height;
        } else {
            return y - this._displayY;
        }
    };

    roundX(x) {
        return this.isLoopHorizontal() ? x.mod(this.width()) : x;
    };

    roundY(y) {
        return this.isLoopVertical() ? y.mod(this.height()) : y;
    };

    xWithDirection(x, d) {
        return x + (d === 6 ? 1 : d === 4 ? -1 : 0);
    };

    yWithDirection(y, d) {
        return y + (d === 2 ? 1 : d === 8 ? -1 : 0);
    };

    roundXWithDirection(x, d) {
        return this.roundX(x + (d === 6 ? 1 : d === 4 ? -1 : 0));
    };

    roundYWithDirection(y, d) {
        return this.roundY(y + (d === 2 ? 1 : d === 8 ? -1 : 0));
    };

    deltaX(x1, x2) {
        let result = x1 - x2;
        if (this.isLoopHorizontal() && Math.abs(result) > this.width() / 2) {
            if (result < 0) {
                result += this.width();
            } else {
                result -= this.width();
            }
        }
        return result;
    };

    deltaY(y1, y2) {
        let result = y1 - y2;
        if (this.isLoopVertical() && Math.abs(result) > this.height() / 2) {
            if (result < 0) {
                result += this.height();
            } else {
                result -= this.height();
            }
        }
        return result;
    };

    distance(x1, y1, x2, y2) {
        return Math.abs(this.deltaX(x1, x2)) + Math.abs(this.deltaY(y1, y2));
    };

    canvasToMapX(x) {
        const tileWidth = this.tileWidth();
        const originX = this._displayX * tileWidth;
        const mapX = Math.floor((originX + x) / tileWidth);
        return this.roundX(mapX);
    };

    canvasToMapY(y) {
        const tileHeight = this.tileHeight();
        const originY = this._displayY * tileHeight;
        const mapY = Math.floor((originY + y) / tileHeight);
        return this.roundY(mapY);
    };

    autoplay() {
        if ($dataMap.autoplayBgm) {
            if ($gamePlayer.isInVehicle()) {
                $gameSystem.saveWalkingBgm2();
            } else {
                AudioManager.playBgm($dataMap.bgm);
            }
        }
        if ($dataMap.autoplayBgs) {
            AudioManager.playBgs($dataMap.bgs);
        }
    };

    refreshIfNeeded() {
        if (this._needsRefresh) {
            this.refresh();
        }
    };

    refresh() {
        for (const event of this.events()) {
            event.refresh();
        }
        for (const event of this._commonEvents) {
            event.refresh();
        };
        this.refreshTileEvents();
        this._needsRefresh = false;
    };

    refreshTileEvents() {
        this.tileEvents = this.events().filter(event => event.isTile());
    };

    eventsXy(x, y) {
        return this.events().filter(event => event.pos(x, y));
    };

    eventsXyNt(x, y) {
        return this.events().filter(event => event.posNt(x, y));
    };

    tileEventsXy(x, y) {
        return this.tileEvents.filter(event => event.posNt(x, y));
    };

    eventIdXy(x, y) {
        const list = this.eventsXy(x, y);
        return list.length === 0 ? 0 : list[0].eventId();
    };

    scrollDown(distance) {
        if (this.isLoopVertical()) {
            this._displayY += distance;
            this._displayY %= $dataMap.height;
            if (this._parallaxLoopY) {
                this._parallaxY += distance;
            }
        } else if (this.height() >= this.screenTileY()) {
            const lastY = this._displayY;
            this._displayY = Math.min(this._displayY + distance,
                this.height() - this.screenTileY());
            this._parallaxY += this._displayY - lastY;
        }
    };

    scrollLeft(distance) {
        if (this.isLoopHorizontal()) {
            this._displayX += $dataMap.width - distance;
            this._displayX %= $dataMap.width;
            if (this._parallaxLoopX) {
                this._parallaxX -= distance;
            }
        } else if (this.width() >= this.screenTileX()) {
            const lastX = this._displayX;
            this._displayX = Math.max(this._displayX - distance, 0);
            this._parallaxX += this._displayX - lastX;
        }
    };

    scrollRight(distance) {
        if (this.isLoopHorizontal()) {
            this._displayX += distance;
            this._displayX %= $dataMap.width;
            if (this._parallaxLoopX) {
                this._parallaxX += distance;
            }
        } else if (this.width() >= this.screenTileX()) {
            const lastX = this._displayX;
            this._displayX = Math.min(this._displayX + distance,
                this.width() - this.screenTileX());
            this._parallaxX += this._displayX - lastX;
        }
    };

    scrollUp(distance) {
        if (this.isLoopVertical()) {
            this._displayY += $dataMap.height - distance;
            this._displayY %= $dataMap.height;
            if (this._parallaxLoopY) {
                this._parallaxY -= distance;
            }
        } else if (this.height() >= this.screenTileY()) {
            const lastY = this._displayY;
            this._displayY = Math.max(this._displayY - distance, 0);
            this._parallaxY += this._displayY - lastY;
        }
    };

    isValid(x, y) {
        return x >= 0 && x < this.width() && y >= 0 && y < this.height();
    };

    checkPassage(x, y, bit) {
        const flags = this.tilesetFlags();
        const tiles = this.allTiles(x, y);
        for (const tile of tiles) {
            const flag = flags[tile];
            if ((flag & 0x10) !== 0)  // [*] No effect on passage
                continue;
            if ((flag & bit) === 0)   // [o] Passable
                return true;
            if ((flag & bit) === bit) // [x] Impassable
                return false;
        }
        return false;
    };

    tileId(x, y, z) {
        const width = $dataMap.width;
        const height = $dataMap.height;
        const ix = Math.round(x);
        const iy = Math.round(y);
        return $dataMap.data[(z * height + iy) * width + ix] || 0;
    };

    layeredTiles(x, y) {
        const tiles = [];
        for (let i = 0; i < 4; i++) {
            tiles.push(this.tileId(x, y, 3 - i));
        }
        return tiles;
    };

    allTiles(x, y) {
        const tiles = this.tileEventsXy(x, y).map(event => event.tileId());
        return tiles.concat(this.layeredTiles(x, y));
    };

    autotileType(x, y, z) {
        const tileId = this.tileId(x, y, z);
        return tileId >= 2048 ? Math.floor((tileId - 2048) / 48) : -1;
    };

    isPassable(x, y, d) {
        return this.checkPassage(x, y, (1 << (d / 2 - 1)) & 0x0f);
    };

    isBoatPassable(x, y) {
        return this.checkPassage(x, y, 0x0200);
    };

    isShipPassable(x, y) {
        return this.checkPassage(x, y, 0x0400);
    };

    isAirshipLandOk(x, y) {
        return this.checkPassage(x, y, 0x0800) && this.checkPassage(x, y, 0x0f);
    };

    checkLayeredTilesFlags(x, y, bit) {
        const flags = this.tilesetFlags();
        return this.layeredTiles(x, y).some(tileId => (flags[tileId] & bit) !== 0);
    };

    isLadder(x, y) {
        return this.isValid(x, y) && this.checkLayeredTilesFlags(x, y, 0x20);
    };

    isBush(x, y) {
        return this.isValid(x, y) && this.checkLayeredTilesFlags(x, y, 0x40);
    };

    isCounter(x, y) {
        return this.isValid(x, y) && this.checkLayeredTilesFlags(x, y, 0x80);
    };

    isDamageFloor(x, y) {
        return this.isValid(x, y) && this.checkLayeredTilesFlags(x, y, 0x100);
    };

    terrainTag(x, y) {
        if (this.isValid(x, y)) {
            const flags = this.tilesetFlags();
            const tiles = this.layeredTiles(x, y);
            for (let i = 0; i < tiles.length; i++) {
                const tag = flags[tiles[i]] >> 12;
                if (tag > 0) {
                    return tag;
                }
            }
        }
        return 0;
    };

    regionId(x, y) {
        return this.isValid(x, y) ? this.tileId(x, y, 5) : 0;
    };

    startScroll(direction, distance, speed) {
        this._scrollDirection = direction;
        this._scrollRest = distance;
        this._scrollSpeed = speed;
    };

    isScrolling() {
        return this._scrollRest > 0;
    };

    update(sceneActive) {
        this.refreshIfNeeded();
        if (sceneActive) {
            this.updateInterpreter();
        }
        this.updateScroll();
        this.updateEvents();
        this.updateVehicles();
        this.updateParallax();
    };

    updateScroll() {
        if (this.isScrolling()) {
            const lastX = this._displayX;
            const lastY = this._displayY;
            this.doScroll(this._scrollDirection, this.scrollDistance());
            if (this._displayX === lastX && this._displayY === lastY) {
                this._scrollRest = 0;
            } else {
                this._scrollRest -= this.scrollDistance();
            }
        }
    };

    scrollDistance() {
        return Math.pow(2, this._scrollSpeed) / 256;
    };

    doScroll(direction, distance) {
        switch (direction) {
            case 2:
                this.scrollDown(distance);
                break;
            case 4:
                this.scrollLeft(distance);
                break;
            case 6:
                this.scrollRight(distance);
                break;
            case 8:
                this.scrollUp(distance);
                break;
        }
    };

    updateEvents() {
        for (const event of this.events()) {
            event.update();
        };
        for (const event of this._commonEvents) {
            event.update();
        };
    };

    updateVehicles() {
        for (const vehicle of this._vehicles) {
            vehicle.update();
        };
    };

    updateParallax() {
        if (this._parallaxLoopX) {
            this._parallaxX += this._parallaxSx / this.tileWidth() / 2;
        }
        if (this._parallaxLoopY) {
            this._parallaxY += this._parallaxSy / this.tileHeight() / 2;
        }
    };

    changeTileset(tilesetId) {
        this._tilesetId = tilesetId;
        this.refresh();
    };

    changeBattleback(battleback1Name, battleback2Name) {
        this._battleback1Name = battleback1Name;
        this._battleback2Name = battleback2Name;
    };

    changeParallax(name, loopX, loopY, sx, sy) {
        this._parallaxName = name;
        this._parallaxZero = ImageManager.isZeroParallax(this._parallaxName);
        if (this._parallaxLoopX && !loopX) {
            this._parallaxX = 0;
        }
        if (this._parallaxLoopY && !loopY) {
            this._parallaxY = 0;
        }
        this._parallaxLoopX = loopX;
        this._parallaxLoopY = loopY;
        this._parallaxSx = sx;
        this._parallaxSy = sy;
    };

    updateInterpreter() {
        for (; ;) {
            this._interpreter.update();
            if (this._interpreter.isRunning()) {
                return;
            }
            if (this._interpreter.eventId() > 0) {
                this.unlockEvent(this._interpreter.eventId());
                this._interpreter.clear();
            }
            if (!this.setupStartingEvent()) {
                return;
            }
        }
    };

    unlockEvent(eventId) {
        if (this._events[eventId]) {
            this._events[eventId].unlock();
        }
    };

    setupStartingEvent() {
        this.refreshIfNeeded();
        if (this._interpreter.setupReservedCommonEvent()) {
            return true;
        }
        if (this.setupTestEvent()) {
            return true;
        }
        if (this.setupStartingMapEvent()) {
            return true;
        }
        if (this.setupAutorunCommonEvent()) {
            return true;
        }
        return false;
    };

    setupTestEvent() {
        if ($testEvent) {
            this._interpreter.setup($testEvent, 0);
            $testEvent = null;
            return true;
        }
        return false;
    };

    setupStartingMapEvent() {
        for (const event of this.events()) {
            if (event.isStarting()) {
                event.clearStartingFlag();
                this._interpreter.setup(event.list(), event.eventId());
                return true;
            }
        }
        return false;
    };

    setupAutorunCommonEvent() {
        for (const event of $dataCommonEvents) {
            if (event && event.trigger === 1 && $gameSwitches.value(event.switchId)) {
                this._interpreter.setup(event.list);
                return true;
            }
        }
        return false;
    };

    isAnyEventStarting() {
        return this.events().some(event => event.isStarting());
    };
};

//-----------------------------------------------------------------------------

// Game_CommonEvent
//
// The game object class for a common event. It contains functionality for
// running parallel process events.
var Game_CommonEvent = class {
    constructor(...args) {
        this.initialize(...args);
    };

    initialize(commonEventId) {
        this._commonEventId = commonEventId;
        this.refresh();
    };

    event() {
        return $dataCommonEvents[this._commonEventId];
    };

    list() {
        return this.event().list;
    };

    refresh() {
        if (this.isActive()) {
            if (!this._interpreter) {
                this._interpreter = new Game_Interpreter();
            }
        } else {
            this._interpreter = null;
        }
    };

    isActive() {
        const event = this.event();
        return event.trigger === 2 && $gameSwitches.value(event.switchId);
    };

    update() {
        if (this._interpreter) {
            if (!this._interpreter.isRunning()) {
                this._interpreter.setup(this.list());
            }
            this._interpreter.update();
        }
    };
};

//-----------------------------------------------------------------------------

// Game_CharacterBase
//
// The superclass of Game_Character. It handles basic information, such as
// coordinates and images, shared by all characters.
var Game_CharacterBase = class {
    constructor(...args) {
        this.initialize(...args);
    };

    get x() { return this._x; };
    get y() { return this._y; };

    initialize() {
        this.initMembers();
    };

    initMembers() {
        this._x = 0;
        this._y = 0;
        this._realX = 0;
        this._realY = 0;
        this._moveSpeed = 4;
        this._moveFrequency = 6;
        this._opacity = 255;
        this._blendMode = 0;
        this._direction = 2;
        this._pattern = 1;
        this._priorityType = 1;
        this._tileId = 0;
        this._characterName = '';
        this._characterIndex = 0;
        this._isObjectCharacter = false;
        this._walkAnime = true;
        this._stepAnime = false;
        this._directionFix = false;
        this._through = false;
        this._transparent = false;
        this._bushDepth = 0;
        this._animationId = 0;
        this._balloonId = 0;
        this._animationPlaying = false;
        this._balloonPlaying = false;
        this._animationCount = 0;
        this._stopCount = 0;
        this._jumpCount = 0;
        this._jumpPeak = 0;
        this._movementSuccess = true;
    };

    pos(x, y) {
        return this._x === x && this._y === y;
    };

    posNt(x, y) {
        // No through
        return this.pos(x, y) && !this.isThrough();
    };

    moveSpeed() {
        return this._moveSpeed;
    };

    setMoveSpeed(moveSpeed) {
        this._moveSpeed = moveSpeed;
    };

    moveFrequency() {
        return this._moveFrequency;
    };

    setMoveFrequency(moveFrequency) {
        this._moveFrequency = moveFrequency;
    };

    opacity() {
        return this._opacity;
    };

    setOpacity(opacity) {
        this._opacity = opacity;
    };

    blendMode() {
        return this._blendMode;
    };

    setBlendMode(blendMode) {
        this._blendMode = blendMode;
    };

    isNormalPriority() {
        return this._priorityType === 1;
    };

    setPriorityType(priorityType) {
        this._priorityType = priorityType;
    };

    isMoving() {
        return this._realX !== this._x || this._realY !== this._y;
    };

    isJumping() {
        return this._jumpCount > 0;
    };

    jumpHeight() {
        return (this._jumpPeak * this._jumpPeak -
            Math.pow(Math.abs(this._jumpCount - this._jumpPeak), 2)) / 2;
    };

    isStopping() {
        return !this.isMoving() && !this.isJumping();
    };

    checkStop(threshold) {
        return this._stopCount > threshold;
    };

    resetStopCount() {
        this._stopCount = 0;
    };

    realMoveSpeed() {
        return this._moveSpeed + (this.isDashing() ? 12 : 0);
    };

    distancePerFrame() {
        return this.realMoveSpeed() / 256;
    };

    isDashing() {
        return false;
    };

    isDebugThrough() {
        return false;
    };

    straighten() {
        if (this.hasWalkAnime() || this.hasStepAnime()) {
            this._pattern = 1;
        }
        this._animationCount = 0;
    };

    reverseDir(d) {
        return 10 - d;
    };

    canPass(x, y, d) {
        const x2 = $gameMap.roundXWithDirection(x, d);
        const y2 = $gameMap.roundYWithDirection(y, d);
        if (!$gameMap.isValid(x2, y2)) {
            return false;
        }
        if (this.isThrough() || this.isDebugThrough()) {
            return true;
        }
        if (!this.isMapPassable(x, y, d)) {
            return false;
        }
        if (this.isCollidedWithCharacters(x2, y2)) {
            return false;
        }
        return true;
    };

    canPassDiagonally(x, y, horz, vert) {
        const x2 = $gameMap.roundXWithDirection(x, horz);
        const y2 = $gameMap.roundYWithDirection(y, vert);
        if (this.canPass(x, y, vert) && this.canPass(x, y2, horz)) {
            return true;
        }
        if (this.canPass(x, y, horz) && this.canPass(x2, y, vert)) {
            return true;
        }
        return false;
    };

    isMapPassable(x, y, d) {
        const x2 = $gameMap.roundXWithDirection(x, d);
        const y2 = $gameMap.roundYWithDirection(y, d);
        const d2 = this.reverseDir(d);
        return $gameMap.isPassable(x, y, d) && $gameMap.isPassable(x2, y2, d2);
    };

    isCollidedWithCharacters(x, y) {
        return this.isCollidedWithEvents(x, y) || this.isCollidedWithVehicles(x, y);
    };

    isCollidedWithEvents(x, y) {
        const events = $gameMap.eventsXyNt(x, y);
        return events.some(event => event.isNormalPriority());
    };

    isCollidedWithVehicles(x, y) {
        return $gameMap.boat().posNt(x, y) || $gameMap.ship().posNt(x, y);
    };

    setPosition(x, y) {
        this._x = x;
        this._y = y;
        this._realX = x;
        this._realY = y;
    };

    copyPosition(character) {
        this._x = character._x;
        this._y = character._y;
        this._realX = character._realX;
        this._realY = character._realY;
        this._direction = character._direction;
    };

    locate(x, y) {
        this.setPosition(x, y);
        this.straighten();
        this.refreshBushDepth();
    };

    direction() {
        return this._direction;
    };

    setDirection(d) {
        if (!this.isDirectionFixed() && d) {
            this._direction = d;
        }
        this.resetStopCount();
    };

    isTile() {
        return this._tileId > 0 && this._priorityType === 0;
    };

    isObjectCharacter() {
        return this._isObjectCharacter;
    };

    shiftY() {
        return this.isObjectCharacter() ? 0 : 6;
    };

    scrolledX() {
        return $gameMap.adjustX(this._realX);
    };

    scrolledY() {
        return $gameMap.adjustY(this._realY);
    };

    screenX() {
        const tw = $gameMap.tileWidth();
        return Math.round(this.scrolledX() * tw + tw / 2);
    };

    screenY() {
        const th = $gameMap.tileHeight();
        return Math.round(this.scrolledY() * th + th -
            this.shiftY() - this.jumpHeight());
    };

    screenZ() {
        return this._priorityType * 2 + 1;
    };

    isNearTheScreen() {
        const gw = Graphics.width;
        const gh = Graphics.height;
        const tw = $gameMap.tileWidth();
        const th = $gameMap.tileHeight();
        const px = this.scrolledX() * tw + tw / 2 - gw / 2;
        const py = this.scrolledY() * th + th / 2 - gh / 2;
        return px >= -gw && px <= gw && py >= -gh && py <= gh;
    };

    update() {
        if (this.isStopping()) {
            this.updateStop();
        }
        if (this.isJumping()) {
            this.updateJump();
        } else if (this.isMoving()) {
            this.updateMove();
        }
        this.updateAnimation();
    };

    updateStop() {
        this._stopCount++;
    };

    updateJump() {
        this._jumpCount--;
        this._realX = (this._realX * this._jumpCount + this._x) / (this._jumpCount + 1.0);
        this._realY = (this._realY * this._jumpCount + this._y) / (this._jumpCount + 1.0);
        this.refreshBushDepth();
        if (this._jumpCount === 0) {
            this._realX = this._x = $gameMap.roundX(this._x);
            this._realY = this._y = $gameMap.roundY(this._y);
        }
    };

    updateMove() {
        if (this._x < this._realX) {
            this._realX = Math.max(this._realX - this.distancePerFrame(), this._x);
        }
        if (this._x > this._realX) {
            this._realX = Math.min(this._realX + this.distancePerFrame(), this._x);
        }
        if (this._y < this._realY) {
            this._realY = Math.max(this._realY - this.distancePerFrame(), this._y);
        }
        if (this._y > this._realY) {
            this._realY = Math.min(this._realY + this.distancePerFrame(), this._y);
        }
        if (!this.isMoving()) {
            this.refreshBushDepth();
        }
    };

    updateAnimation() {
        this.updateAnimationCount();
        if (this._animationCount >= this.animationWait()) {
            this.updatePattern();
            this._animationCount = 0;
        }
    };

    animationWait() {
        return (9 - this.realMoveSpeed()) * 3;
    };

    updateAnimationCount() {
        if (this.isMoving() && this.hasWalkAnime()) {
            this._animationCount += 1.5;
        } else if (this.hasStepAnime() || !this.isOriginalPattern()) {
            this._animationCount++;
        }
    };

    updatePattern() {
        if (!this.hasStepAnime() && this._stopCount > 0) {
            this.resetPattern();
        } else {
            this._pattern = (this._pattern + 1) % this.maxPattern();
        }
    };

    maxPattern() {
        return 4;
    };

    pattern() {
        return this._pattern < 3 ? this._pattern : 1;
    };

    setPattern(pattern) {
        this._pattern = pattern;
    };

    isOriginalPattern() {
        return this.pattern() === 1;
    };

    resetPattern() {
        this.setPattern(1);
    };

    refreshBushDepth() {
        if (this.isNormalPriority() && !this.isObjectCharacter() &&
            this.isOnBush() && !this.isJumping()) {
            if (!this.isMoving()) {
                this._bushDepth = 12;
            }
        } else {
            this._bushDepth = 0;
        }
    };

    isOnLadder() {
        return $gameMap.isLadder(this._x, this._y);
    };

    isOnBush() {
        return $gameMap.isBush(this._x, this._y);
    };

    terrainTag() {
        return $gameMap.terrainTag(this._x, this._y);
    };

    regionId() {
        return $gameMap.regionId(this._x, this._y);
    };

    dotRegionId() {
        return $gameMap.regionId(Math.floor(this.centerRealX()), Math.floor(this.centerRealY()));
    };

    increaseSteps() {
        if (this.isOnLadder()) {
            this.setDirection(8);
        }
        this.resetStopCount();
        this.refreshBushDepth();
    };

    tileId() {
        return this._tileId;
    };

    characterName() {
        return this._characterName;
    };

    characterIndex() {
        return this._characterIndex;
    };

    setImage(characterName, characterIndex) {
        this._tileId = 0;
        this._characterName = characterName;
        this._characterIndex = characterIndex;
        this._isObjectCharacter = ImageManager.isObjectCharacter(characterName);
    };

    setTileImage(tileId) {
        this._tileId = tileId;
        this._characterName = '';
        this._characterIndex = 0;
        this._isObjectCharacter = true;
    };

    checkEventTriggerTouchFront(d) {
        const x2 = $gameMap.roundXWithDirection(this._x, d);
        const y2 = $gameMap.roundYWithDirection(this._y, d);
        this.checkEventTriggerTouch(x2, y2);
    };

    checkEventTriggerTouch(x, y) {
        return false;
    };

    isMovementSucceeded(x, y) {
        return this._movementSuccess;
    };

    setMovementSuccess(success) {
        this._movementSuccess = success;
    };

    moveStraight(d) {
        this.setMovementSuccess(this.canPass(this._x, this._y, d));
        if (this.isMovementSucceeded()) {
            this.setDirection(d);
            this._x = $gameMap.roundXWithDirection(this._x, d);
            this._y = $gameMap.roundYWithDirection(this._y, d);
            this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(d));
            this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(d));
            this.increaseSteps();
        } else {
            this.setDirection(d);
            this.checkEventTriggerTouchFront(d);
        }
    };

    moveDiagonally(horz, vert) {
        this.setMovementSuccess(this.canPassDiagonally(this._x, this._y, horz, vert));
        if (this.isMovementSucceeded()) {
            this._x = $gameMap.roundXWithDirection(this._x, horz);
            this._y = $gameMap.roundYWithDirection(this._y, vert);
            this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(horz));
            this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(vert));
            this.increaseSteps();
        }
        if (this._direction === this.reverseDir(horz)) {
            this.setDirection(horz);
        }
        if (this._direction === this.reverseDir(vert)) {
            this.setDirection(vert);
        }
    };

    jump(xPlus, yPlus) {
        if (Math.abs(xPlus) > Math.abs(yPlus)) {
            if (xPlus !== 0) {
                this.setDirection(xPlus < 0 ? 4 : 6);
            }
        } else {
            if (yPlus !== 0) {
                this.setDirection(yPlus < 0 ? 8 : 2);
            }
        }
        this._x += xPlus;
        this._y += yPlus;
        const distance = Math.round(Math.sqrt(xPlus * xPlus + yPlus * yPlus));
        this._jumpPeak = 10 + distance - 4;
        this._jumpCount = this._jumpPeak * 2;
        this.resetStopCount();
        this.straighten();
    };

    hasWalkAnime() {
        return this._walkAnime;
    };

    setWalkAnime(walkAnime) {
        this._walkAnime = walkAnime;
    };

    hasStepAnime() {
        return this._stepAnime;
    };

    setStepAnime(stepAnime) {
        this._stepAnime = stepAnime;
    };

    isDirectionFixed() {
        return this._directionFix;
    };

    setDirectionFix(directionFix) {
        this._directionFix = directionFix;
    };

    isThrough() {
        return this._through;
    };

    setThrough(through) {
        this._through = through;
    };

    isTransparent() {
        return this._transparent;
    };

    bushDepth() {
        return this._bushDepth;
    };

    setTransparent(transparent) {
        this._transparent = transparent;
    };

    requestAnimation(animationId) {
        this._animationId = animationId;
    };

    requestBalloon(balloonId) {
        this._balloonId = balloonId;
    };

    animationId() {
        return this._animationId;
    };

    balloonId() {
        return this._balloonId;
    };

    startAnimation() {
        this._animationId = 0;
        this._animationPlaying = true;
    };

    startBalloon() {
        this._balloonId = 0;
        this._balloonPlaying = true;
    };

    isAnimationPlaying() {
        return this._animationId > 0 || this._animationPlaying;
    };

    isBalloonPlaying() {
        return this._balloonId > 0 || this._balloonPlaying;
    };

    endAnimation() {
        this._animationPlaying = false;
    };

    endBalloon() {
        this._balloonPlaying = false;
    };
};

//-----------------------------------------------------------------------------

// Game_Character
//
// The superclass of Game_Player, Game_Follower, GameVehicle, and Game_Event.
var Game_Character = class extends Game_CharacterBase {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    static ROUTE_END = 0;
    static ROUTE_MOVE_DOWN = 1;
    static ROUTE_MOVE_LEFT = 2;
    static ROUTE_MOVE_RIGHT = 3;
    static ROUTE_MOVE_UP = 4;
    static ROUTE_MOVE_LOWER_L = 5;
    static ROUTE_MOVE_LOWER_R = 6;
    static ROUTE_MOVE_UPPER_L = 7;
    static ROUTE_MOVE_UPPER_R = 8;
    static ROUTE_MOVE_RANDOM = 9;
    static ROUTE_MOVE_TOWARD = 10;
    static ROUTE_MOVE_AWAY = 11;
    static ROUTE_MOVE_FORWARD = 12;
    static ROUTE_MOVE_BACKWARD = 13;
    static ROUTE_JUMP = 14;
    static ROUTE_WAIT = 15;
    static ROUTE_TURN_DOWN = 16;
    static ROUTE_TURN_LEFT = 17;
    static ROUTE_TURN_RIGHT = 18;
    static ROUTE_TURN_UP = 19;
    static ROUTE_TURN_90D_R = 20;
    static ROUTE_TURN_90D_L = 21;
    static ROUTE_TURN_180D = 22;
    static ROUTE_TURN_90D_R_L = 23;
    static ROUTE_TURN_RANDOM = 24;
    static ROUTE_TURN_TOWARD = 25;
    static ROUTE_TURN_AWAY = 26;
    static ROUTE_SWITCH_ON = 27;
    static ROUTE_SWITCH_OFF = 28;
    static ROUTE_CHANGE_SPEED = 29;
    static ROUTE_CHANGE_FREQ = 30;
    static ROUTE_WALK_ANIME_ON = 31;
    static ROUTE_WALK_ANIME_OFF = 32;
    static ROUTE_STEP_ANIME_ON = 33;
    static ROUTE_STEP_ANIME_OFF = 34;
    static ROUTE_DIR_FIX_ON = 35;
    static ROUTE_DIR_FIX_OFF = 36;
    static ROUTE_THROUGH_ON = 37;
    static ROUTE_THROUGH_OFF = 38;
    static ROUTE_TRANSPARENT_ON = 39;
    static ROUTE_TRANSPARENT_OFF = 40;
    static ROUTE_CHANGE_IMAGE = 41;
    static ROUTE_CHANGE_OPACITY = 42;
    static ROUTE_CHANGE_BLEND_MODE = 43;
    static ROUTE_PLAY_SE = 44;
    static ROUTE_SCRIPT = 45;

    initialize() {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize();
    };

    initMembers() {
        super.initMembers();
        this._moveRouteForcing = false;
        this._moveRoute = null;
        this._moveRouteIndex = 0;
        this._originalMoveRoute = null;
        this._originalMoveRouteIndex = 0;
        this._waitCount = 0;
    };

    memorizeMoveRoute() {
        this._originalMoveRoute = this._moveRoute;
        this._originalMoveRouteIndex = this._moveRouteIndex;
    };

    restoreMoveRoute() {
        this._moveRoute = this._originalMoveRoute;
        this._moveRouteIndex = this._originalMoveRouteIndex;
        this._originalMoveRoute = null;
    };

    isMoveRouteForcing() {
        return this._moveRouteForcing;
    };

    setMoveRoute(moveRoute) {
        this._moveRoute = moveRoute;
        this._moveRouteIndex = 0;
        this._moveRouteForcing = false;
    };

    forceMoveRoute(moveRoute) {
        if (!this._originalMoveRoute) {
            this.memorizeMoveRoute();
        }
        this._moveRoute = moveRoute;
        this._moveRouteIndex = 0;
        this._moveRouteForcing = true;
        this._waitCount = 0;
    };

    updateStop() {
        super.updateStop();
        if (this._moveRouteForcing) {
            this.updateRoutineMove();
        }
    };

    updateRoutineMove() {
        if (this._waitCount > 0) {
            this._waitCount--;
        } else {
            this.setMovementSuccess(true);
            const command = this._moveRoute.list[this._moveRouteIndex];
            if (command) {
                this.processMoveCommand(command);
                this.advanceMoveRouteIndex();
            }
        }
    };

    processMoveCommand(command) {
        const gc = Game_Character;
        const params = command.parameters;
        switch (command.code) {
            case gc.ROUTE_END:
                this.processRouteEnd();
                break;
            case gc.ROUTE_MOVE_DOWN:
                this.moveStraight(2);
                break;
            case gc.ROUTE_MOVE_LEFT:
                this.moveStraight(4);
                break;
            case gc.ROUTE_MOVE_RIGHT:
                this.moveStraight(6);
                break;
            case gc.ROUTE_MOVE_UP:
                this.moveStraight(8);
                break;
            case gc.ROUTE_MOVE_LOWER_L:
                this.moveDiagonally(4, 2);
                break;
            case gc.ROUTE_MOVE_LOWER_R:
                this.moveDiagonally(6, 2);
                break;
            case gc.ROUTE_MOVE_UPPER_L:
                this.moveDiagonally(4, 8);
                break;
            case gc.ROUTE_MOVE_UPPER_R:
                this.moveDiagonally(6, 8);
                break;
            case gc.ROUTE_MOVE_RANDOM:
                this.moveRandom();
                break;
            case gc.ROUTE_MOVE_TOWARD:
                this.moveTowardPlayer();
                break;
            case gc.ROUTE_MOVE_AWAY:
                this.moveAwayFromPlayer();
                break;
            case gc.ROUTE_MOVE_FORWARD:
                this.moveForward();
                break;
            case gc.ROUTE_MOVE_BACKWARD:
                this.moveBackward();
                break;
            case gc.ROUTE_JUMP:
                this.jump(params[0], params[1]);
                break;
            case gc.ROUTE_WAIT:
                this._waitCount = params[0] - 1;
                break;
            case gc.ROUTE_TURN_DOWN:
                this.setDirection(2);
                break;
            case gc.ROUTE_TURN_LEFT:
                this.setDirection(4);
                break;
            case gc.ROUTE_TURN_RIGHT:
                this.setDirection(6);
                break;
            case gc.ROUTE_TURN_UP:
                this.setDirection(8);
                break;
            case gc.ROUTE_TURN_90D_R:
                this.turnRight90();
                break;
            case gc.ROUTE_TURN_90D_L:
                this.turnLeft90();
                break;
            case gc.ROUTE_TURN_180D:
                this.turn180();
                break;
            case gc.ROUTE_TURN_90D_R_L:
                this.turnRightOrLeft90();
                break;
            case gc.ROUTE_TURN_RANDOM:
                this.turnRandom();
                break;
            case gc.ROUTE_TURN_TOWARD:
                this.turnTowardPlayer();
                break;
            case gc.ROUTE_TURN_AWAY:
                this.turnAwayFromPlayer();
                break;
            case gc.ROUTE_SWITCH_ON:
                $gameSwitches.setValue(params[0], true);
                break;
            case gc.ROUTE_SWITCH_OFF:
                $gameSwitches.setValue(params[0], false);
                break;
            case gc.ROUTE_CHANGE_SPEED:
                this.setMoveSpeed(params[0]);
                break;
            case gc.ROUTE_CHANGE_FREQ:
                this.setMoveFrequency(params[0]);
                break;
            case gc.ROUTE_WALK_ANIME_ON:
                this.setWalkAnime(true);
                break;
            case gc.ROUTE_WALK_ANIME_OFF:
                this.setWalkAnime(false);
                break;
            case gc.ROUTE_STEP_ANIME_ON:
                this.setStepAnime(true);
                break;
            case gc.ROUTE_STEP_ANIME_OFF:
                this.setStepAnime(false);
                break;
            case gc.ROUTE_DIR_FIX_ON:
                this.setDirectionFix(true);
                break;
            case gc.ROUTE_DIR_FIX_OFF:
                this.setDirectionFix(false);
                break;
            case gc.ROUTE_THROUGH_ON:
                this.setThrough(true);
                break;
            case gc.ROUTE_THROUGH_OFF:
                this.setThrough(false);
                break;
            case gc.ROUTE_TRANSPARENT_ON:
                this.setTransparent(true);
                break;
            case gc.ROUTE_TRANSPARENT_OFF:
                this.setTransparent(false);
                break;
            case gc.ROUTE_CHANGE_IMAGE:
                this.setImage(params[0], params[1]);
                break;
            case gc.ROUTE_CHANGE_OPACITY:
                this.setOpacity(params[0]);
                break;
            case gc.ROUTE_CHANGE_BLEND_MODE:
                this.setBlendMode(params[0]);
                break;
            case gc.ROUTE_PLAY_SE:
                AudioManager.playSe(params[0]);
                break;
            case gc.ROUTE_SCRIPT:
                eval(params[0]);
                break;
        }
    };

    deltaXFrom(x) {
        return $gameMap.deltaX(this.x, x);
    };

    deltaYFrom(y) {
        return $gameMap.deltaY(this.y, y);
    };

    moveRandom() {
        const d = 2 + Math.randomInt(4) * 2;
        if (this.canPass(this.x, this.y, d)) {
            this.moveStraight(d);
        }
    };

    moveTowardCharacter(character) {
        const sx = this.deltaXFrom(character.x);
        const sy = this.deltaYFrom(character.y);
        if (Math.abs(sx) > Math.abs(sy)) {
            this.moveStraight(sx > 0 ? 4 : 6);
            if (!this.isMovementSucceeded() && sy !== 0) {
                this.moveStraight(sy > 0 ? 8 : 2);
            }
        } else if (sy !== 0) {
            this.moveStraight(sy > 0 ? 8 : 2);
            if (!this.isMovementSucceeded() && sx !== 0) {
                this.moveStraight(sx > 0 ? 4 : 6);
            }
        }
    };

    moveAwayFromCharacter(character) {
        const sx = this.deltaXFrom(character.x);
        const sy = this.deltaYFrom(character.y);
        if (Math.abs(sx) > Math.abs(sy)) {
            this.moveStraight(sx > 0 ? 6 : 4);
            if (!this.isMovementSucceeded() && sy !== 0) {
                this.moveStraight(sy > 0 ? 2 : 8);
            }
        } else if (sy !== 0) {
            this.moveStraight(sy > 0 ? 2 : 8);
            if (!this.isMovementSucceeded() && sx !== 0) {
                this.moveStraight(sx > 0 ? 6 : 4);
            }
        }
    };

    turnTowardCharacter(character) {
        const sx = this.deltaXFrom(character.x);
        const sy = this.deltaYFrom(character.y);
        if (Math.abs(sx) > Math.abs(sy)) {
            this.setDirection(sx > 0 ? 4 : 6);
        } else if (sy !== 0) {
            this.setDirection(sy > 0 ? 8 : 2);
        }
    };

    turnAwayFromCharacter(character) {
        const sx = this.deltaXFrom(character.x);
        const sy = this.deltaYFrom(character.y);
        if (Math.abs(sx) > Math.abs(sy)) {
            this.setDirection(sx > 0 ? 6 : 4);
        } else if (sy !== 0) {
            this.setDirection(sy > 0 ? 2 : 8);
        }
    };

    turnTowardPlayer() {
        this.turnTowardCharacter($gamePlayer);
    };

    turnAwayFromPlayer() {
        this.turnAwayFromCharacter($gamePlayer);
    };

    moveTowardPlayer() {
        this.moveTowardCharacter($gamePlayer);
    };

    moveAwayFromPlayer() {
        this.moveAwayFromCharacter($gamePlayer);
    };

    moveForward() {
        this.moveStraight(this.direction());
    };

    moveBackward() {
        const lastDirectionFix = this.isDirectionFixed();
        this.setDirectionFix(true);
        this.moveStraight(this.reverseDir(this.direction()));
        this.setDirectionFix(lastDirectionFix);
    };

    processRouteEnd() {
        if (this._moveRoute.repeat) {
            this._moveRouteIndex = -1;
        } else if (this._moveRouteForcing) {
            this._moveRouteForcing = false;
            this.restoreMoveRoute();
        }
    };

    advanceMoveRouteIndex() {
        const moveRoute = this._moveRoute;
        if (moveRoute && (this.isMovementSucceeded() || moveRoute.skippable)) {
            const numCommands = moveRoute.list.length - 1;
            this._moveRouteIndex++;
            if (moveRoute.repeat && this._moveRouteIndex >= numCommands) {
                this._moveRouteIndex = 0;
            }
        }
    };

    turnRight90() {
        switch (this.direction()) {
            case 2:
                this.setDirection(4);
                break;
            case 4:
                this.setDirection(8);
                break;
            case 6:
                this.setDirection(2);
                break;
            case 8:
                this.setDirection(6);
                break;
        }
    };

    turnLeft90() {
        switch (this.direction()) {
            case 2:
                this.setDirection(6);
                break;
            case 4:
                this.setDirection(2);
                break;
            case 6:
                this.setDirection(8);
                break;
            case 8:
                this.setDirection(4);
                break;
        }
    };

    turn180() {
        this.setDirection(this.reverseDir(this.direction()));
    };

    turnRightOrLeft90() {
        switch (Math.randomInt(2)) {
            case 0:
                this.turnRight90();
                break;
            case 1:
                this.turnLeft90();
                break;
        }
    };

    turnRandom() {
        this.setDirection(2 + Math.randomInt(4) * 2);
    };

    swap(character) {
        const newX = character.x;
        const newY = character.y;
        character.locate(this.x, this.y);
        this.locate(newX, newY);
    };

    findDirectionTo(goalX, goalY) {
        const searchLimit = this.searchLimit();
        const mapWidth = $gameMap.width();
        const nodeList = [];
        const openList = [];
        const closedList = [];
        const start = {};
        let best = start;

        if (this.x === goalX && this.y === goalY) {
            return 0;
        }

        start.parent = null;
        start.x = this.x;
        start.y = this.y;
        start.g = 0;
        start.f = $gameMap.distance(start.x, start.y, goalX, goalY);
        nodeList.push(start);
        openList.push(start.y * mapWidth + start.x);

        while (nodeList.length > 0) {
            let bestIndex = 0;
            for (let i = 0; i < nodeList.length; i++) {
                if (nodeList[i].f < nodeList[bestIndex].f) {
                    bestIndex = i;
                }
            }

            const current = nodeList[bestIndex];
            const x1 = current.x;
            const y1 = current.y;
            const pos1 = y1 * mapWidth + x1;
            const g1 = current.g;

            nodeList.splice(bestIndex, 1);
            openList.splice(openList.indexOf(pos1), 1);
            closedList.push(pos1);

            if (current.x === goalX && current.y === goalY) {
                best = current;
                break;
            }

            if (g1 >= searchLimit) {
                continue;
            }

            for (let j = 0; j < 4; j++) {
                const direction = 2 + j * 2;
                const x2 = $gameMap.roundXWithDirection(x1, direction);
                const y2 = $gameMap.roundYWithDirection(y1, direction);
                const pos2 = y2 * mapWidth + x2;

                if (closedList.contains(pos2)) {
                    continue;
                }
                if (!this.canPass(x1, y1, direction)) {
                    continue;
                }

                const g2 = g1 + 1;
                const index2 = openList.indexOf(pos2);

                if (index2 < 0 || g2 < nodeList[index2].g) {
                    let neighbor;
                    if (index2 >= 0) {
                        neighbor = nodeList[index2];
                    } else {
                        neighbor = {};
                        nodeList.push(neighbor);
                        openList.push(pos2);
                    }
                    neighbor.parent = current;
                    neighbor.x = x2;
                    neighbor.y = y2;
                    neighbor.g = g2;
                    neighbor.f = g2 + $gameMap.distance(x2, y2, goalX, goalY);
                    if (!best || neighbor.f - neighbor.g < best.f - best.g) {
                        best = neighbor;
                    }
                }
            }
        }

        let node = best;
        while (node.parent && node.parent !== start) {
            node = node.parent;
        }

        const deltaX1 = $gameMap.deltaX(node.x, start.x);
        const deltaY1 = $gameMap.deltaY(node.y, start.y);
        if (deltaY1 > 0) {
            return 2;
        } else if (deltaX1 < 0) {
            return 4;
        } else if (deltaX1 > 0) {
            return 6;
        } else if (deltaY1 < 0) {
            return 8;
        }

        const deltaX2 = this.deltaXFrom(goalX);
        const deltaY2 = this.deltaYFrom(goalY);
        if (Math.abs(deltaX2) > Math.abs(deltaY2)) {
            return deltaX2 > 0 ? 4 : 6;
        } else if (deltaY2 !== 0) {
            return deltaY2 > 0 ? 8 : 2;
        }

        return 0;
    };

    searchLimit() {
        return 12;
    };
};

//-----------------------------------------------------------------------------

// Game_Player
//
// The game object class for the player. It contains event starting
// determinants and map scrolling functions.
var Game_Player = class extends Game_Character {
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
        this.setTransparent($dataSystem.optTransparent);
    };

    initMembers() {
        super.initMembers();
        this._vehicleType = 'walk';
        this._vehicleGettingOn = false;
        this._vehicleGettingOff = false;
        this._dashing = false;
        this._needsMapReload = false;
        this._transferring = false;
        this._newMapId = 0;
        this._newX = 0;
        this._newY = 0;
        this._newDirection = 0;
        this._fadeType = 0;
        this._followers = new Game_Followers();
        this._encounterCount = 0;
        this._isPushing = false;
    };

    clearTransferInfo() {
        this._transferring = false;
        this._newMapId = 0;
        this._newX = 0;
        this._newY = 0;
        this._newDirection = 0;
    };

    followers() {
        return this._followers;
    };

    refresh() {
        const actor = $gameParty.leader();
        const characterName = actor ? actor.characterName() : '';
        const characterIndex = actor ? actor.characterIndex() : 0;
        this.setImage(characterName, characterIndex);
        this._followers.refresh();
    };

    isStopping() {
        if (this._vehicleGettingOn || this._vehicleGettingOff) {
            return false;
        }
        return super.isStopping();
    };

    reserveTransfer(mapId, x, y, d, fadeType) {
        this._transferring = true;
        this._newMapId = mapId;
        this._newX = x;
        this._newY = y;
        this._newDirection = d;
        this._fadeType = fadeType;
    };

    requestMapReload() {
        this._needsMapReload = true;
    };

    isTransferring() {
        return this._transferring;
    };

    newMapId() {
        return this._newMapId;
    };

    fadeType() {
        return this._fadeType;
    };

    performTransfer() {
        if (this.isTransferring()) {
            this.setDirection(this._newDirection);
            if (this._newMapId !== $gameMap.mapId() || this._needsMapReload) {
                $gameMap.setup(this._newMapId);
                this._needsMapReload = false;
            }
            this.locate(this._newX, this._newY);
            this.refresh();
            this.clearTransferInfo();
        }
    };

    isMapPassable(x, y, d) {
        const vehicle = this.vehicle();
        if (vehicle) {
            return vehicle.isMapPassable(x, y, d);
        } else {
            return super.isMapPassable(x, y, d);
        }
    };

    vehicle() {
        return $gameMap.vehicle(this._vehicleType);
    };

    isInBoat() {
        return this._vehicleType === 'boat';
    };

    isInShip() {
        return this._vehicleType === 'ship';
    };

    isInAirship() {
        return this._vehicleType === 'airship';
    };

    isInVehicle() {
        return this.isInBoat() || this.isInShip() || this.isInAirship();
    };

    isNormal() {
        return this._vehicleType === 'walk' && !this.isMoveRouteForcing();
    };

    isDashing() {
        return this._dashing;
    };

    realMoveSpeed() {
        const dashingSpeed = Math.max(this._moveSpeed, 16);
        const SpeedRatio = $gameParty.leader().eva;
        let realSpeed = (this._moveSpeed + (this.isDashing() ? dashingSpeed : 0)) * SpeedRatio;
        realSpeed = Math.max(0, Math.round(realSpeed));
        return realSpeed;
    };

    isDebugThrough() {
        return Input.isPressed('control') && $gameTemp.isPlaytest();
    };

    isCollided(x, y) {
        if (this.isThrough()) {
            return false;
        } else {
            return this.pos(x, y) || this._followers.isSomeoneCollided(x, y);
        }
    };

    centerX() {
        return (Graphics.width / $gameMap.tileWidth() - 1) / 2.0;
    };

    centerY() {
        return (Graphics.height / $gameMap.tileHeight() - 1) / 2.0;
    };

    center(x, y) {
        return $gameMap.setDisplayPos(x - this.centerX(), y - this.centerY());
    };

    locate(x, y) {
        super.locate(x, y);
        this.center(x, y);
        this.makeEncounterCount();
        if (this.isInVehicle()) {
            this.vehicle().refresh();
        }
        this._followers.synchronize(x, y, this.direction());
    };

    increaseSteps() {
        super.increaseSteps();
        if (this.isNormal()) {
            $gameParty.increaseSteps();
        }
    };

    makeEncounterCount() {
        const n = $gameMap.encounterStep();
        this._encounterCount = Math.randomInt(n) + Math.randomInt(n) + 1;
    };

    makeEncounterTroopId() {
        const encounterList = [];
        let weightSum = 0;
        for (const encounter of $gameMap.encounterList()) {
            if (this.meetsEncounterConditions(encounter)) {
                encounterList.push(encounter);
                weightSum += encounter.weight;
            }
        };
        if (weightSum > 0) {
            let value = Math.randomInt(weightSum);
            for (let i = 0; i < encounterList.length; i++) {
                value -= encounterList[i].weight;
                if (value < 0) {
                    return encounterList[i].troopId;
                }
            }
        }
        return 0;
    };

    meetsEncounterConditions(encounter) {
        return (encounter.regionSet.length === 0 ||
            encounter.regionSet.contains(this.regionId()));
    };

    executeEncounter() {
        if (!$gameMap.isEventRunning() && this._encounterCount <= 0) {
            this.makeEncounterCount();
            const troopId = this.makeEncounterTroopId();
            if ($dataTroops[troopId]) {
                BattleManager.setup(troopId, true, false);
                BattleManager.onEncounter();
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    startMapEvent(x, y, triggers, normal) {
        if (!$gameMap.isEventRunning()) {
            for (const event of $gameMap.eventsXy(x, y)) {
                if (event.isTriggerIn(triggers) && event.isNormalPriority() === normal) {
                    event.start();
                }
            }
        }
    };

    moveByInput() {
        if (!this.isMoving() && this.canMove()) {
            let direction = this.getInputDirection();
            if (direction > 0) {
                $gameTemp.clearDestination();
            } else if ($gameTemp.isDestinationValid()) {
                const x = $gameTemp.destinationX();
                const y = $gameTemp.destinationY();
                direction = this.findDirectionTo(x, y);
            }
            if (direction > 0) {
                this.executeMove(direction);
            }
        }
    };

    canMove() {
        if (this._jumpCount > 0) {
            return false;
        }
        if ($gameMap.isEventRunning() || $gameMessage.isBusy()) {
            return false;
        }
        if (this.isMoveRouteForcing() || this.areFollowersGathering()) {
            return false;
        }
        if (this._vehicleGettingOn || this._vehicleGettingOff) {
            return false;
        }
        if (this.isInVehicle() && !this.vehicle().canMove()) {
            return false;
        }
        return true;
    };

    getInputDirection() {
        return Input.dir4;
    };

    executeMove(direction) {
        this.moveStraight(direction);
    };

    update(sceneActive) {
        const lastScrolledX = this.scrolledX();
        const lastScrolledY = this.scrolledY();
        const wasMoving = this.isMoving();
        this.updateDashing();
        if (sceneActive) {
            this.moveByInput();
        }
        super.update();
        this.updateScroll(lastScrolledX, lastScrolledY);
        this.updateVehicle();
        if (!this.isMoving()) {
            this.updateNonmoving(wasMoving);
        }
        this._followers.update();
    };

    updateDashing() {
        if (this.isMoving()) {
            return;
        }
        if (this.canMove() && !this.isInVehicle() && !$gameMap.isDashDisabled()) {
            this._dashing = this.isDashButtonPressed() || $gameTemp.isDestinationValid();
        } else {
            this._dashing = false;
        }
    };

    isDashButtonPressed() {
        const shift = Input.isPressed('shift');
        if (ConfigManager.alwaysDash) {
            return shift;
        } else {
            return shift;
        }
    };

    updateScroll(lastScrolledX, lastScrolledY) {
        const x1 = lastScrolledX;
        const y1 = lastScrolledY;
        const x2 = this.scrolledX();
        const y2 = this.scrolledY();
        if (y2 > y1 && y2 > this.centerY()) {
            $gameMap.scrollDown(y2 - y1);
        }
        if (x2 < x1 && x2 < this.centerX()) {
            $gameMap.scrollLeft(x1 - x2);
        }
        if (x2 > x1 && x2 > this.centerX()) {
            $gameMap.scrollRight(x2 - x1);
        }
        if (y2 < y1 && y2 < this.centerY()) {
            $gameMap.scrollUp(y1 - y2);
        }
    };

    updateVehicle() {
        if (this.isInVehicle() && !this.areFollowersGathering()) {
            if (this._vehicleGettingOn) {
                this.updateVehicleGetOn();
            } else if (this._vehicleGettingOff) {
                this.updateVehicleGetOff();
            } else {
                this.vehicle().syncWithPlayer();
            }
        }
    };

    updateVehicleGetOn() {
        if (!this.areFollowersGathering() && !this.isMoving()) {
            this.setDirection(this.vehicle().direction());
            this.setMoveSpeed(this.vehicle().moveSpeed());
            this._vehicleGettingOn = false;
            this.setTransparent(true);
            if (this.isInAirship()) {
                this.setThrough(true);
            }
            this.vehicle().getOn();
        }
    };

    updateVehicleGetOff() {
        if (!this.areFollowersGathering() && this.vehicle().isLowest()) {
            this._vehicleGettingOff = false;
            this._vehicleType = 'walk';
            this.setTransparent(false);
        }
    };

    updateNonmoving(wasMoving) {
        if (!$gameMap.isEventRunning()) {
            if (wasMoving) {
                $gameParty.onPlayerWalk();
                this.checkEventTriggerHere([1, 2]);
                if ($gameMap.setupStartingEvent()) {
                    return;
                }
            }
            if (this.triggerAction()) {
                return;
            }
            if (wasMoving) {
                this.updateEncounterCount();
            } else {
                $gameTemp.clearDestination();
            }
        }
    };

    triggerAction() {
        if (this.canMove()) {
            if (this.triggerButtonAction()) {
                return true;
            }
            if (this.triggerTouchAction()) {
                return true;
            }
        }
        return false;
    };

    triggerButtonAction() {
        if (Input.isTriggered('ok')) {
            if (this.getOnOffVehicle()) {
                return true;
            }
            this.checkEventTriggerHere([0]);
            if ($gameMap.setupStartingEvent()) {
                return true;
            }
            this.checkEventTriggerThere([0, 1, 2]);
            if ($gameMap.setupStartingEvent()) {
                return true;
            }
        }
        return false;
    };

    triggerTouchAction() {
        if ($gameTemp.isDestinationValid()) {
            const direction = this.direction();
            const x1 = this.x;
            const y1 = this.y;
            const x2 = $gameMap.roundXWithDirection(x1, direction);
            const y2 = $gameMap.roundYWithDirection(y1, direction);
            const x3 = $gameMap.roundXWithDirection(x2, direction);
            const y3 = $gameMap.roundYWithDirection(y2, direction);
            const destX = $gameTemp.destinationX();
            const destY = $gameTemp.destinationY();
            if (destX === x1 && destY === y1) {
                return this.triggerTouchActionD1(x1, y1);
            } else if (destX === x2 && destY === y2) {
                return this.triggerTouchActionD2(x2, y2);
            } else if (destX === x3 && destY === y3) {
                return this.triggerTouchActionD3(x2, y2);
            }
        }
        return false;
    };

    triggerTouchActionD1(x1, y1) {
        if ($gameMap.airship().pos(x1, y1)) {
            if (TouchInput.isTriggered() && this.getOnOffVehicle()) {
                return true;
            }
        }
        this.checkEventTriggerHere([0]);
        return $gameMap.setupStartingEvent();
    };

    triggerTouchActionD2(x2, y2) {
        if ($gameMap.boat().pos(x2, y2) || $gameMap.ship().pos(x2, y2)) {
            if (TouchInput.isTriggered() && this.getOnVehicle()) {
                return true;
            }
        }
        if (this.isInBoat() || this.isInShip()) {
            if (TouchInput.isTriggered() && this.getOffVehicle()) {
                return true;
            }
        }
        this.checkEventTriggerThere([0, 1, 2]);
        return $gameMap.setupStartingEvent();
    };

    triggerTouchActionD3(x2, y2) {
        if ($gameMap.isCounter(x2, y2)) {
            this.checkEventTriggerThere([0, 1, 2]);
        }
        return $gameMap.setupStartingEvent();
    };

    updateEncounterCount() {
        if (this.canEncounter()) {
            this._encounterCount -= this.encounterProgressValue();
        }
    };

    canEncounter() {
        return (!$gameParty.hasEncounterNone() && $gameSystem.isEncounterEnabled() &&
            !this.isInAirship() && !this.isMoveRouteForcing() && !this.isDebugThrough());
    };

    encounterProgressValue() {
        let value = $gameMap.isBush(this.x, this.y) ? 2 : 1;
        if ($gameParty.hasEncounterHalf()) {
            value *= 0.5;
        }
        if (this.isInShip()) {
            value *= 0.5;
        }
        return value;
    };

    checkEventTriggerHere(triggers) {
        if (this.canStartLocalEvents()) {
            this.startMapEvent(this.x, this.y, triggers, false);
        }
    };

    checkEventTriggerThere(triggers) {
        if (this.canStartLocalEvents()) {
            const direction = this.direction();
            const x1 = this.x;
            const y1 = this.y;
            const x2 = $gameMap.roundXWithDirection(x1, direction);
            const y2 = $gameMap.roundYWithDirection(y1, direction);
            this.startMapEvent(x2, y2, triggers, true);
            if (!$gameMap.isAnyEventStarting() && $gameMap.isCounter(x2, y2)) {
                const x3 = $gameMap.roundXWithDirection(x2, direction);
                const y3 = $gameMap.roundYWithDirection(y2, direction);
                this.startMapEvent(x3, y3, triggers, true);
            }
        }
    };

    checkEventTriggerTouch(x, y) {
        if (this.canStartLocalEvents()) {
            this.startMapEvent(x, y, [1, 2], true);
        }
    };

    canStartLocalEvents() {
        return !this.isInAirship();
    };

    getOnOffVehicle() {
        if (this.isInVehicle()) {
            return this.getOffVehicle();
        } else {
            return this.getOnVehicle();
        }
    };

    getOnVehicle() {
        const direction = this.direction();
        const x1 = this.x;
        const y1 = this.y;
        const x2 = $gameMap.roundXWithDirection(x1, direction);
        const y2 = $gameMap.roundYWithDirection(y1, direction);
        if ($gameMap.airship().pos(x1, y1)) {
            this._vehicleType = 'airship';
        } else if ($gameMap.ship().pos(x2, y2)) {
            this._vehicleType = 'ship';
        } else if ($gameMap.boat().pos(x2, y2)) {
            this._vehicleType = 'boat';
        }
        if (this.isInVehicle()) {
            this._vehicleGettingOn = true;
            if (!this.isInAirship()) {
                this.forceMoveForward();
            }
            this.gatherFollowers();
        }
        return this._vehicleGettingOn;
    };

    getOffVehicle() {
        if (this.vehicle().isLandOk(this.x, this.y, this.direction())) {
            if (this.isInAirship()) {
                this.setDirection(2);
            }
            this._followers.synchronize(this.x, this.y, this.direction());
            this.vehicle().getOff();
            if (!this.isInAirship()) {
                this.forceMoveForward();
                this.setTransparent(false);
            }
            this._vehicleGettingOff = true;
            this.setMoveSpeed(4);
            this.setThrough(false);
            this.makeEncounterCount();
            this.gatherFollowers();
        }
        return this._vehicleGettingOff;
    };

    forceMoveForward() {
        this.setThrough(true);
        this.moveForward();
        this.setThrough(false);
    };

    isOnDamageFloor() {
        return $gameMap.isDamageFloor(this.x, this.y) && !this.isInAirship();
    };

    moveStraight(d) {
        if (this.canPass(this.x, this.y, d)) {
            this._followers.updateMove();
        }
        super.moveStraight(d);
    };

    moveDiagonally(horz, vert) {
        if (this.canPassDiagonally(this.x, this.y, horz, vert)) {
            this._followers.updateMove();
        }
        super.moveDiagonally(horz, vert);
    };

    jump(xPlus, yPlus) {
        super.jump(xPlus, yPlus);
        this._followers.jumpAll();
    };

    showFollowers() {
        this._followers.show();
    };

    hideFollowers() {
        this._followers.hide();
    };

    gatherFollowers() {
        this._followers.gather();
    };

    areFollowersGathering() {
        return this._followers.areGathering();
    };

    areFollowersGathered() {
        return this._followers.areGathered();
    };
};

//-----------------------------------------------------------------------------

// Game_Follower
//
// The game object class for a follower. A follower is an allied character,
// other than the front character, displayed in the party.
var Game_Follower = class extends Game_Character {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize(memberIndex) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize();
        this._memberIndex = memberIndex;
        this.setTransparent($dataSystem.optTransparent);
        this.setThrough(true);
    };

    refresh() {
        const characterName = this.isVisible() ? this.actor().characterName() : '';
        const characterIndex = this.isVisible() ? this.actor().characterIndex() : 0;
        this.setImage(characterName, characterIndex);
    };

    actor() {
        return $gameParty.battleMembers()[this._memberIndex];
    };

    isVisible() {
        return this.actor() && $gamePlayer.followers().isVisible();
    };

    update() {
        super.update();
        this.setMoveSpeed($gamePlayer.realMoveSpeed());
        this.setOpacity($gamePlayer.opacity());
        this.setBlendMode($gamePlayer.blendMode());
        this.setWalkAnime($gamePlayer.hasWalkAnime());
        this.setStepAnime($gamePlayer.hasStepAnime());
        this.setDirectionFix($gamePlayer.isDirectionFixed());
        this.setTransparent($gamePlayer.isTransparent());
    };

    chaseCharacter(character) {
        const sx = this.deltaXFrom(character.x);
        const sy = this.deltaYFrom(character.y);
        if (sx !== 0 && sy !== 0) {
            this.moveDiagonally(sx > 0 ? 4 : 6, sy > 0 ? 8 : 2);
        } else if (sx !== 0) {
            this.moveStraight(sx > 0 ? 4 : 6);
        } else if (sy !== 0) {
            this.moveStraight(sy > 0 ? 8 : 2);
        }
        this.setMoveSpeed($gamePlayer.realMoveSpeed());
    };
};

//-----------------------------------------------------------------------------

// Game_Followers
//
// The wrapper class for a follower array.
var Game_Followers = class Game_Followers {
    constructor(...args) {
        this.initialize(...args);
    };

    initialize() {
        this._visible = $dataSystem.optFollowers;
        this._gathering = false;
        this._data = [];
        for (let i = 1; i < $gameParty.maxBattleMembers(); i++) {
            this._data.push(new Game_Follower(i));
        }
    };

    isVisible() {
        return this._visible;
    };

    show() {
        this._visible = true;
    };

    hide() {
        this._visible = false;
    };

    follower(index) {
        return this._data[index];
    };

    forEach(callback, thisObject) {
        this._data.forEach(callback, thisObject);
    };

    reverseEach(callback, thisObject) {
        this._data.reverse();
        this._data.forEach(callback, thisObject);
        this._data.reverse();
    };

    refresh() {
        this.forEach(follower => follower.refresh());
    };

    update() {
        if (this.areGathering()) {
            if (!this.areMoving()) {
                this.updateMove();
            }
            if (this.areGathered()) {
                this._gathering = false;
            }
        }
        this.forEach(follower => follower.update());
    };

    updateMove() {
        for (let i = this._data.length - 1; i >= 0; i--) {
            const precedingCharacter = (i > 0 ? this._data[i - 1] : $gamePlayer);
            this._data[i].chaseCharacter(precedingCharacter);
        }
    };

    jumpAll() {
        if ($gamePlayer.isJumping()) {
            for (const follower of this._data) {
                const sx = $gamePlayer.deltaXFrom(follower.x);
                const sy = $gamePlayer.deltaYFrom(follower.y);
                follower.jump(sx, sy);
            }
        }
    };

    synchronize(x, y, d) {
        this.forEach(follower => {
            follower.locate(x, y);
            follower.setDirection(d);
        });
    };

    gather() {
        this._gathering = true;
    };

    areGathering() {
        return this._gathering;
    };

    visibleFollowers() {
        return this._data.filter(follower => follower.isVisible());
    };

    areMoving() {
        return this.visibleFollowers().some(follower => follower.isMoving());
    };

    areGathered() {
        return this.visibleFollowers().every(follower => {
            return !follower.isMoving() && follower.pos($gamePlayer.x, $gamePlayer.y);
        });
    };

    isSomeoneCollided(x, y) {
        return this.visibleFollowers().some(follower => follower.pos(x, y));
    };
};

//-----------------------------------------------------------------------------

// Game_Vehicle
//
// The game object class for a vehicle.
var Game_Vehicle = class extends Game_Character {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize(type) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize();
        this._type = type;
        this.resetDirection();
        this.initMoveSpeed();
        this.loadSystemSettings();
    };

    initMembers() {
        super.initMembers();
        this._type = '';
        this._mapId = 0;
        this._altitude = 0;
        this._driving = false;
        this._bgm = null;
    };

    isBoat() {
        return this._type === 'boat';
    };

    isShip() {
        return this._type === 'ship';
    };

    isAirship() {
        return this._type === 'airship';
    };

    resetDirection() {
        this.setDirection(4);
    };

    initMoveSpeed() {
        if (this.isBoat()) {
            this.setMoveSpeed(4);
        } else if (this.isShip()) {
            this.setMoveSpeed(5);
        } else if (this.isAirship()) {
            this.setMoveSpeed(6);
        }
    };

    vehicle() {
        if (this.isBoat()) {
            return $dataSystem.boat;
        } else if (this.isShip()) {
            return $dataSystem.ship;
        } else if (this.isAirship()) {
            return $dataSystem.airship;
        } else {
            return null;
        }
    };

    loadSystemSettings() {
        const vehicle = this.vehicle();
        this._mapId = vehicle.startMapId;
        this.setPosition(vehicle.startX, vehicle.startY);
        this.setImage(vehicle.characterName, vehicle.characterIndex);
    };

    refresh() {
        if (this._driving) {
            this._mapId = $gameMap.mapId();
            this.syncWithPlayer();
        } else if (this._mapId === $gameMap.mapId()) {
            this.locate(this.x, this.y);
        }
        if (this.isAirship()) {
            this.setPriorityType(this._driving ? 2 : 0);
        } else {
            this.setPriorityType(1);
        }
        this.setWalkAnime(this._driving);
        this.setStepAnime(this._driving);
        this.setTransparent(this._mapId !== $gameMap.mapId());
    };

    setLocation(mapId, x, y) {
        this._mapId = mapId;
        this.setPosition(x, y);
        this.refresh();
    };

    pos(x, y) {
        if (this._mapId === $gameMap.mapId()) {
            return super.pos(x, y);
        } else {
            return false;
        }
    };

    isMapPassable(x, y, d) {
        const x2 = $gameMap.roundXWithDirection(x, d);
        const y2 = $gameMap.roundYWithDirection(y, d);
        if (this.isBoat()) {
            return $gameMap.isBoatPassable(x2, y2);
        } else if (this.isShip()) {
            return $gameMap.isShipPassable(x2, y2);
        } else if (this.isAirship()) {
            return true;
        } else {
            return false;
        }
    };

    getOn() {
        this._driving = true;
        this.setWalkAnime(true);
        this.setStepAnime(true);
        $gameSystem.saveWalkingBgm();
        this.playBgm();
    };

    getOff() {
        this._driving = false;
        this.setWalkAnime(false);
        this.setStepAnime(false);
        this.resetDirection();
        $gameSystem.replayWalkingBgm();
    };

    setBgm(bgm) {
        this._bgm = bgm;
    };

    playBgm() {
        AudioManager.playBgm(this._bgm || this.vehicle().bgm);
    };

    syncWithPlayer() {
        this.copyPosition($gamePlayer);
        this.refreshBushDepth();
    };

    screenY() {
        return super.screenY() - this._altitude;
    };

    shadowX() {
        return this.screenX();
    };

    shadowY() {
        return this.screenY() + this._altitude;
    };

    shadowOpacity() {
        return 255 * this._altitude / this.maxAltitude();
    };

    canMove() {
        if (this.isAirship()) {
            return this.isHighest();
        } else {
            return true;
        }
    };

    update() {
        super.update();
        if (this.isAirship()) {
            this.updateAirship();
        }
    };

    updateAirship() {
        this.updateAirshipAltitude();
        this.setStepAnime(this.isHighest());
        this.setPriorityType(this.isLowest() ? 0 : 2);
    };

    updateAirshipAltitude() {
        if (this._driving && !this.isHighest()) {
            this._altitude++;
        }
        if (!this._driving && !this.isLowest()) {
            this._altitude--;
        }
    };

    maxAltitude() {
        return 48;
    };

    isLowest() {
        return this._altitude <= 0;
    };

    isHighest() {
        return this._altitude >= this.maxAltitude();
    };

    isTakeoffOk() {
        return $gamePlayer.areFollowersGathered();
    };

    isLandOk(x, y, d) {
        if (this.isAirship()) {
            if (!$gameMap.isAirshipLandOk(x, y)) {
                return false;
            }
            if ($gameMap.eventsXy(x, y).length > 0) {
                return false;
            }
        } else {
            const x2 = $gameMap.roundXWithDirection(x, d);
            const y2 = $gameMap.roundYWithDirection(y, d);
            if (!$gameMap.isValid(x2, y2)) {
                return false;
            }
            if (!$gameMap.isPassable(x2, y2, this.reverseDir(d))) {
                return false;
            }
            if (this.isCollidedWithCharacters(x2, y2)) {
                return false;
            }
        }
        return true;
    };
};

//-----------------------------------------------------------------------------

// Game_Event
//
// The game object class for an event. It contains functionality for event page
// switching and running parallel process events.
var Game_Event = class extends Game_Character {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize(mapId, eventId) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize();
        this._mapId = mapId;
        this._eventId = eventId;
        this.locate(this.event().x, this.event().y);
        this._oldrealX = 0;
        this._oldrealY = 0;
        this.refresh();
        this._MPFE_NoFresh = false;
    };

    initMembers() {
        super.initMembers();
        this._moveType = 0;
        this._trigger = 0;
        this._starting = false;
        this._erased = false;
        this._pageIndex = -2;
        this._originalPattern = 1;
        this._originalDirection = 2;
        this._prelockDirection = 0;
        this._locked = false;
        this._freezeResistance = 0;
    };

    eventId() {
        return this._eventId;
    };

    event() {
        return $dataMap.events[this._eventId];
    };

    page() {
        return this.event().pages[this._pageIndex];
    };

    list() {
        return this.page().list;
    };

    isCollidedWithCharacters(x, y) {
        return (super.isCollidedWithCharacters(x, y) ||
            this.isCollidedWithPlayerCharacters(x, y));
    };

    isCollidedWithEvents(x, y) {
        const events = $gameMap.eventsXyNt(x, y);
        return events.length > 0;
    };

    isCollidedWithPlayerCharacters(x, y) {
        return this.isNormalPriority() && $gamePlayer.isCollided(x, y);
    };

    lock() {
        if (!this._locked) {
            this._prelockDirection = this.direction();
            this.turnTowardPlayer();
            this._locked = true;
        }
    };

    unlock() {
        if (this._locked) {
            this._locked = false;
            this.setDirection(this._prelockDirection);
        }
    };

    updateStop() {
        if (this._locked) {
            this.resetStopCount();
        }
        super.updateStop();
        if (!this.isMoveRouteForcing()) {
            this.updateSelfMovement();
        }
    };

    updateSelfMovement() {
        if (!this._locked && this.isNearTheScreen() &&
            this.checkStop(this.stopCountThreshold())) {
            switch (this._moveType) {
                case 1:
                    this.moveTypeRandom();
                    break;
                case 2:
                    this.moveTypeTowardPlayer();
                    break;
                case 3:
                    this.moveTypeCustom();
                    break;
            }
        }
    };

    stopCountThreshold() {
        return 5 - (this.moveFrequency());
    };

    moveTypeRandom() {
        switch (Math.randomInt(6)) {
            case 0: case 1:
                this.moveRandom();
                break;
            case 2: case 3: case 4:
                this.moveForward();
                break;
            case 5:
                this.resetStopCount();
                break;
        }
    };

    moveTypeTowardPlayer() {
        if (this.isNearThePlayer()) {
            switch (Math.randomInt(6)) {
                case 0: case 1: case 2: case 3:
                    this.moveTowardPlayer();
                    break;
                case 4:
                    this.moveRandom();
                    break;
                case 5:
                    this.moveForward();
                    break;
            }
        } else {
            this.moveRandom();
        }
    };

    isNearThePlayer() {
        const sx = Math.abs(this.deltaXFrom($gamePlayer.x));
        const sy = Math.abs(this.deltaYFrom($gamePlayer.y));
        return sx + sy < 20;
    };

    moveTypeCustom() {
        this.updateRoutineMove();
    };

    isStarting() {
        return this._starting;
    };

    clearStartingFlag() {
        this._starting = false;
    };

    isTriggerIn(triggers) {
        return triggers.contains(this._trigger);
    };

    start() {
        const list = this.list();
        if (list && list.length > 1) {
            this._starting = true;
            if (this.isTriggerIn([0, 1, 2])) {
                this.lock();
            }
        }
    };

    erase() {
        this._erased = true;
        this.refresh();
    };

    refresh() {
        const newPageIndex = this._erased ? -1 : this.findProperPageIndex();
        if (this._pageIndex !== newPageIndex) {
            this._pageIndex = newPageIndex;
            this.setupPage();
        }
    };

    findProperPageIndex() {
        const pages = this.event().pages;
        for (let i = pages.length - 1; i >= 0; i--) {
            const page = pages[i];
            if (this.meetsConditions(page)) {
                return i;
            }
        }
        return -1;
    };

    meetsConditions(page) {
        const c = page.conditions;
        if (c.switch1Valid) {
            if (!$gameSwitches.value(c.switch1Id)) {
                return false;
            }
        }
        if (c.switch2Valid) {
            if (!$gameSwitches.value(c.switch2Id)) {
                return false;
            }
        }
        if (c.variableValid) {
            if ($gameVariables.value(c.variableId) < c.variableValue) {
                return false;
            }
        }
        if (c.selfSwitchValid) {
            const key = [this._mapId, this._eventId, c.selfSwitchCh];
            if ($gameSelfSwitches.value(key) !== true) {
                return false;
            }
        }
        if (c.itemValid) {
            const item = $dataItems[c.itemId];
            if (!$gameParty.hasItem(item)) {
                return false;
            }
        }
        if (c.actorValid) {
            const actor = $gameActors.actor(c.actorId);
            if (!$gameParty.members().contains(actor)) {
                return false;
            }
        }
        return true;
    };

    setupPage() {
        if (this._pageIndex >= 0) {
            this.setupPageSettings();
        } else {
            this.clearPageSettings();
        }
        this.refreshBushDepth();
        this.clearStartingFlag();
        this.checkEventTriggerAuto();
    };

    clearPageSettings() {
        this.setImage('', 0);
        this._moveType = 0;
        this._trigger = null;
        this._interpreter = null;
        this.setThrough(true);
    };

    setupPageSettings() {
        const page = this.page();
        const image = page.image;
        if (image.tileId > 0) {
            this.setTileImage(image.tileId);
        } else {
            this.setImage(image.characterName, image.characterIndex);
        }
        if (this._originalDirection !== image.direction) {
            this._originalDirection = image.direction;
            this._prelockDirection = 0;
            this.setDirectionFix(false);
            this.setDirection(image.direction);
        }
        if (this._originalPattern !== image.pattern) {
            this._originalPattern = image.pattern;
            this.setPattern(image.pattern);
        }
        this.setMoveSpeed(page.moveSpeed);
        this.setMoveFrequency(page.moveFrequency);
        this.setPriorityType(page.priorityType);
        this.setWalkAnime(page.walkAnime);
        this.setStepAnime(page.stepAnime);
        this.setDirectionFix(page.directionFix);
        this.setThrough(page.through);
        this.setMoveRoute(page.moveRoute);
        this._moveType = page.moveType;
        this._trigger = page.trigger;
        if (this._trigger === 4) {
            this._interpreter = new Game_Interpreter();
        } else {
            this._interpreter = null;
        }
    };

    isOriginalPattern() {
        return this.pattern() === this._originalPattern;
    };

    resetPattern() {
        this.setPattern(this._originalPattern);
    };

    checkEventTriggerTouch(x, y) {
        if (!$gameMap.isEventRunning()) {
            if (this._trigger === 2 && $gamePlayer.pos(x, y)) {
                if (!this.isJumping() && this.isNormalPriority()) {
                    this.start();
                }
            }
        }
    };

    checkEventTriggerAuto() {
        if (this._trigger === 3) {
            this.start();
        }
    };

    update() {
        super.update();
        this.checkEventTriggerAuto();
        this.updateParallel();
    };

    updateParallel() {
        if (this._interpreter) {
            if (!this._interpreter.isRunning()) {
                this._interpreter.setup(this.list(), this._eventId);
            }
            this._interpreter.update();
        }
    };

    locate(x, y) {
        super.locate(x, y);
        this._prelockDirection = 0;
    };

    forceMoveRoute(moveRoute) {
        super.forceMoveRoute(moveRoute);
        this._prelockDirection = 0;
    };
};

//-----------------------------------------------------------------------------

// Game_Interpreter
//
// The interpreter for running event commands.
var Game_Interpreter = class {
    constructor(...args) {
        this.initialize(...args);
    };

    initialize(depth) {
        this._depth = depth || 0;
        this.checkOverflow();
        this.clear();
        this._branch = {};
        this._params = [];
        this._indent = 0;
        this._frameCount = 0;
        this._freezeChecker = 0;
    };

    checkOverflow() {
        if (this._depth >= 100) {
            throw new Error('Common event calls exceeded the limit');
        }
    };

    clear() {
        this._mapId = 0;
        this._eventId = 0;
        this._list = null;
        this._index = 0;
        this._waitCount = 0;
        this._waitMode = '';
        this._comments = '';
        this._character = null;
        this._childInterpreter = null;
    };

    setup(list, eventId) {
        this.clear();
        this._mapId = $gameMap.mapId();
        this._eventId = eventId || 0;
        this._list = list;
        Game_Interpreter.requestImages(list);
    };

    eventId() {
        return this._eventId;
    };

    isOnCurrentMap() {
        return this._mapId === $gameMap.mapId();
    };

    setupReservedCommonEvent() {
        if ($gameTemp.isCommonEventReserved()) {
            this.setup($gameTemp.reservedCommonEvent().list);
            $gameTemp.clearCommonEvent();
            return true;
        } else {
            return false;
        }
    };

    isRunning() {
        return !!this._list;
    };

    update() {
        while (this.isRunning()) {
            if (this.updateChild() || this.updateWait()) {
                break;
            }
            if (SceneManager.isSceneChanging()) {
                break;
            }
            if (!this.executeCommand()) {
                break;
            }
            if (this.checkFreeze()) {
                break;
            }
        }
    };

    updateChild() {
        if (this._childInterpreter) {
            this._childInterpreter.update();
            if (this._childInterpreter.isRunning()) {
                return true;
            } else {
                this._childInterpreter = null;
            }
        }
        return false;
    };

    updateWait() {
        return this.updateWaitCount() || this.updateWaitMode();
    };

    updateWaitCount() {
        if (this._waitCount > 0) {
            this._waitCount--;
            return true;
        }
        return false;
    };

    updateWaitMode() {
        let waiting = false;
        switch (this._waitMode) {
            case 'message':
                waiting = $gameMessage.isBusy();
                break;
            case 'transfer':
                waiting = $gamePlayer.isTransferring();
                break;
            case 'scroll':
                waiting = $gameMap.isScrolling();
                break;
            case 'route':
                waiting = this._character.isMoveRouteForcing();
                break;
            case 'animation':
                waiting = this._character.isAnimationPlaying();
                break;
            case 'balloon':
                waiting = this._character.isBalloonPlaying();
                break;
            case 'gather':
                waiting = $gamePlayer.areFollowersGathering();
                break;
            case 'action':
                waiting = BattleManager.isActionForced();
                break;
            case 'video':
                waiting = Graphics.isVideoPlaying();
                break;
            case 'image':
                waiting = !ImageManager.isReady();
                break;
        }
        if (!waiting) {
            this._waitMode = '';
        }
        return waiting;
    };

    setWaitMode(waitMode) {
        this._waitMode = waitMode;
    };

    wait(duration) {
        this._waitCount = duration;
    };

    fadeSpeed() {
        return 24;
    };

    executeCommand() {
        const command = this.currentCommand();
        if (command) {
            this._params = command.parameters;
            this._indent = command.indent;
            const methodName = 'command' + command.code;
            if (typeof this[methodName] === 'function') {
                if (!this[methodName]()) {
                    return false;
                }
            }
            this._index++;
        } else {
            this.terminate();
        }
        return true;
    };

    checkFreeze() {
        if (this._frameCount !== Graphics.frameCount) {
            this._frameCount = Graphics.frameCount;
            this._freezeChecker = 0;
        }
        if (this._freezeChecker++ >= 100000) {
            return true;
        } else {
            return false;
        }
    };

    terminate() {
        this._list = null;
        this._comments = '';
    };

    skipBranch() {
        while (this._list[this._index + 1].indent > this._indent) {
            this._index++;
        }
    };

    currentCommand() {
        return this._list[this._index];
    };

    nextEventCode() {
        const command = this._list[this._index + 1];
        if (command) {
            return command.code;
        } else {
            return 0;
        }
    };

    iterateActorId(param, callback) {
        if (param === 0) {
            $gameParty.members().forEach(callback);
        } else {
            const actor = $gameActors.actor(param);
            actor && callback(actor);
        }
    };

    iterateActorEx(param1, param2, callback) {
        if (param1 === 0) {
            this.iterateActorId(param2, callback);
        } else {
            this.iterateActorId($gameVariables.value(param2), callback);
        }
    };

    iterateActorIndex(param, callback) {
        if (param < 0) {
            $gameParty.members().forEach(callback);
        } else {
            const actor = $gameParty.members()[param];
            actor && callback(actor);
        }
    };

    iterateEnemyIndex(param, callback) {
        if (param < 0) {
            $gameTroop.members().forEach(callback);
        } else {
            const enemy = $gameTroop.members()[param];
            enemy && callback(enemy);
        }
    };

    iterateBattler(param1, param2, callback) {
        if ($gameParty.inBattle()) {
            if (param1 === 0) {
                this.iterateEnemyIndex(param2, callback);
            } else {
                this.iterateActorId(param2, callback);
            }
        }
    };

    character(param) {
        if ($gameParty.inBattle()) {
            return null;
        } else if (param < 0) {
            return $gamePlayer;
        } else if (this.isOnCurrentMap()) {
            return $gameMap.event(param > 0 ? param : this._eventId);
        } else {
            return null;
        }
    };

    operateValue(operation, operandType, operand) {
        const value = operandType === 0 ? operand : $gameVariables.value(operand);
        return operation === 0 ? value : -value;
    };

    changeHp(target, value, allowDeath) {
        if (target.isAlive()) {
            if (!allowDeath && target.hp <= -value) {
                value = 1 - target.hp;
            }
            target.gainHp(value);
            if (target.isDead()) {
                target.performCollapse();
            }
        }
    };

    // Show Text
    command101() {
        if (!$gameMessage.isBusy()) {
            $gameMessage.setFaceImage(this._params[0], this._params[1]);
            $gameMessage.setBackground(this._params[2]);
            $gameMessage.setPositionType(this._params[3]);
            while (this.nextEventCode() === 401) {  // Text data
                this._index++;
                $gameMessage.add(this.currentCommand().parameters[0]);
            }
            switch (this.nextEventCode()) {
                case 102:  // Show Choices
                    this._index++;
                    this.setupChoices(this.currentCommand().parameters);
                    break;
                case 103:  // Input Number
                    this._index++;
                    this.setupNumInput(this.currentCommand().parameters);
                    break;
                case 104:  // Select Item
                    this._index++;
                    this.setupItemChoice(this.currentCommand().parameters);
                    break;
            }
            this._index++;
            this.setWaitMode('message');
        }
        return false;
    };

    // Show Choices
    command102() {
        if (!$gameMessage.isBusy()) {
            this.setupChoices(this._params);
            this._index++;
            this.setWaitMode('message');
        }
        return false;
    };

    setupChoices(params) {
        const choices = params[0].clone();
        let cancelType = params[1];
        const defaultType = params.length > 2 ? params[2] : 0;
        const positionType = params.length > 3 ? params[3] : 2;
        const background = params.length > 4 ? params[4] : 0;
        if (cancelType >= choices.length) {
            cancelType = -2;
        }
        $gameMessage.setChoices(choices, defaultType, cancelType);
        $gameMessage.setChoiceBackground(background);
        $gameMessage.setChoicePositionType(positionType);
        $gameMessage.setChoiceCallback(n => {
            this._branch[this._indent] = n;
        });
    };

    // When [**]
    command402() {
        if (this._branch[this._indent] !== this._params[0]) {
            this.skipBranch();
        }
        return true;
    };

    // When Cancel
    command403() {
        if (this._branch[this._indent] >= 0) {
            this.skipBranch();
        }
        return true;
    };

    // Input Number
    command103() {
        if (!$gameMessage.isBusy()) {
            this.setupNumInput(this._params);
            this._index++;
            this.setWaitMode('message');
        }
        return false;
    };

    setupNumInput(params) {
        $gameMessage.setNumberInput(params[0], params[1]);
    };

    // Select Item
    command104() {
        if (!$gameMessage.isBusy()) {
            this.setupItemChoice(this._params);
            this._index++;
            this.setWaitMode('message');
        }
        return false;
    };

    setupItemChoice(params) {
        $gameMessage.setItemChoice(params[0], params[1] || 2);
    };

    // Show Scrolling Text
    command105() {
        if (!$gameMessage.isBusy()) {
            $gameMessage.setScroll(this._params[0], this._params[1]);
            while (this.nextEventCode() === 405) {
                this._index++;
                $gameMessage.add(this.currentCommand().parameters[0]);
            }
            this._index++;
            this.setWaitMode('message');
        }
        return false;
    };

    // Comment
    command108() {
        this._comments = [this._params[0]];
        while (this.nextEventCode() === 408) {
            this._index++;
            this._comments.push(this.currentCommand().parameters[0]);
        }
        return true;
    };

    command111() {
        let result = false;
        try {
            switch (this._params[0]) {
                case 0:  // Switch
                    result = ($gameSwitches.value(this._params[1]) === (this._params[2] === 0));
                    break;
                case 1:  // Variable
                    const value1 = $gameVariables.value(this._params[1]);
                    let value2;
                    if (this._params[2] === 0) {
                        value2 = this._params[3];
                    } else {
                        value2 = $gameVariables.value(this._params[3]);
                    }
                    switch (this._params[4]) {
                        case 0:  // Equal to
                            result = (value1 === value2);
                            break;
                        case 1:  // Greater than or Equal to
                            result = (value1 >= value2);
                            break;
                        case 2:  // Less than or Equal to
                            result = (value1 <= value2);
                            break;
                        case 3:  // Greater than
                            result = (value1 > value2);
                            break;
                        case 4:  // Less than
                            result = (value1 < value2);
                            break;
                        case 5:  // Not Equal to
                            result = (value1 !== value2);
                            break;
                    }
                    break;
                case 2:  // Self Switch
                    if (this._eventId > 0) {
                        const key = [this._mapId, this._eventId, this._params[1]];
                        result = ($gameSelfSwitches.value(key) === (this._params[2] === 0));
                    }
                    break;
                case 3:  // Timer
                    if ($gameTimer.isWorking()) {
                        if (this._params[2] === 0) {
                            result = ($gameTimer.seconds() >= this._params[1]);
                        } else {
                            result = ($gameTimer.seconds() <= this._params[1]);
                        }
                    }
                    break;
                case 4:  // Actor
                    const actor = $gameActors.actor(this._params[1]);
                    if (actor) {
                        const n = this._params[3];
                        switch (this._params[2]) {
                            case 0:  // In the Party
                                result = $gameParty.members().contains(actor);
                                break;
                            case 1:  // Name
                                result = (actor.name() === n);
                                break;
                            case 2:  // Class
                                result = actor.isClass($dataClasses[n]);
                                break;
                            case 3:  // Skill
                                result = actor.hasSkill(n);
                                break;
                            case 4:  // Weapon
                                result = actor.hasWeapon($dataWeapons[n]);
                                break;
                            case 5:  // Armor
                                result = actor.hasArmor($dataArmors[n]);
                                break;
                            case 6:  // State
                                result = actor.isStateAffected(n);
                                break;
                        }
                    }
                    break;
                case 5:  // Enemy
                    const enemy = $gameTroop.members()[this._params[1]];
                    if (enemy) {
                        switch (this._params[2]) {
                            case 0:  // Appeared
                                result = enemy.isAlive();
                                break;
                            case 1:  // State
                                result = enemy.isStateAffected(this._params[3]);
                                break;
                        }
                    }
                    break;
                case 6:  // Character
                    const character = this.character(this._params[1]);
                    if (character) {
                        result = (character.direction() === this._params[2]);
                    }
                    break;
                case 7:  // Gold
                    switch (this._params[2]) {
                        case 0:  // Greater than or equal to
                            result = ($gameParty.gold() >= this._params[1]);
                            break;
                        case 1:  // Less than or equal to
                            result = ($gameParty.gold() <= this._params[1]);
                            break;
                        case 2:  // Less than
                            result = ($gameParty.gold() < this._params[1]);
                            break;
                    }
                    break;
                case 8:  // Item
                    result = $gameParty.hasItem($dataItems[this._params[1]]);
                    break;
                case 9:  // Weapon
                    result = $gameParty.hasItem($dataWeapons[this._params[1]], this._params[2]);
                    break;
                case 10:  // Armor
                    result = $gameParty.hasItem($dataArmors[this._params[1]], this._params[2]);
                    break;
                case 11:  // Button
                    result = Input.isPressed(this._params[1]);
                    break;
                case 12:  // Script
                    try {
                        result = !!eval(this._params[1]);
                    } catch (error) {
                        console.error("Error in command111 (Script condition):");
                        console.error("Event ID: ", this._eventId);
                        console.error("Map ID: ", $gameMap.mapId());
                        console.error("Script: ", this._params[1]);
                        console.error("Error: ", error.message);
                        console.error("Stack Trace: ", error.stack);
                    }
                    break;
                case 13:  // Vehicle
                    result = ($gamePlayer.vehicle() === $gameMap.vehicle(this._params[1]));
                    break;
            }
        } catch (error) {
            console.error("Error in command111:");
            console.error("Event ID: ", this._eventId);
            console.error("Map ID: ", $gameMap.mapId());
            console.error("Command Parameters: ", this._params);
            console.error("Error: ", error.message);
            console.error("Stack Trace: ", error.stack);
        }
        this._branch[this._indent] = result;
        if (this._branch[this._indent] === false) {
            this.skipBranch();
        }
        return true;
    };


    // Else
    command411() {
        if (this._branch[this._indent] !== false) {
            this.skipBranch();
        }
        return true;
    };

    // Loop
    command112() {
        return true;
    };

    // Repeat Above
    command413() {
        do {
            this._index--;
        } while (this.currentCommand().indent !== this._indent);
        return true;
    };

    // Break Loop
    command113() {
        let depth = 0;
        while (this._index < this._list.length - 1) {
            this._index++;
            const command = this.currentCommand();

            if (command.code === 112)
                depth++;

            if (command.code === 413) {
                if (depth > 0)
                    depth--;
                else
                    break;
            }
        }
        return true;
    };

    // Exit Event Processing
    command115() {
        this._index = this._list.length;
        return true;
    };

    // Common Event
    command117() {
        const commonEvent = $dataCommonEvents[this._params[0]];
        if (commonEvent) {
            const eventId = this.isOnCurrentMap() ? this._eventId : 0;
            this.setupChild(commonEvent.list, eventId);
        }
        return true;
    };

    setupChild(list, eventId) {
        this._childInterpreter = new Game_Interpreter(this._depth + 1);
        this._childInterpreter.setup(list, eventId);
    };

    // Label
    command118() {
        return true;
    };

    // Jump to Label
    command119() {
        const labelName = this._params[0];
        for (let i = 0; i < this._list.length; i++) {
            const command = this._list[i];
            if (command.code === 118 && command.parameters[0] === labelName) {
                this.jumpTo(i);
                return;
            }
        }
        return true;
    };

    jumpTo(index) {
        const lastIndex = this._index;
        const startIndex = Math.min(index, lastIndex);
        const endIndex = Math.max(index, lastIndex);
        let indent = this._indent;
        for (let i = startIndex; i <= endIndex; i++) {
            const newIndent = this._list[i].indent;
            if (newIndent !== indent) {
                this._branch[indent] = null;
                indent = newIndent;
            }
        }
        this._index = index;
    };

    // Control Switches
    command121() {
        for (let i = this._params[0]; i <= this._params[1]; i++) {
            $gameSwitches.setValue(i, this._params[2] === 0);
        }
        return true;
    };

    // Control Variables
    command122() {
        let value = 0;
        switch (this._params[3]) { // Operand
            case 0: // Constant
                value = this._params[4];
                break;
            case 1: // Variable
                value = $gameVariables.value(this._params[4]);
                break;
            case 2: // Random
                value = this._params[5] - this._params[4] + 1;
                for (let i = this._params[0]; i <= this._params[1]; i++) {
                    this.operateVariable(i, this._params[2], this._params[4] + Math.randomInt(value));
                }
                return true;
                break;
            case 3: // Game Data
                value = this.gameDataOperand(this._params[4], this._params[5], this._params[6]);
                break;
            case 4: // Script
                value = eval(this._params[4]);
                break;
        }
        for (let i = this._params[0]; i <= this._params[1]; i++) {
            this.operateVariable(i, this._params[2], value);
        }
        return true;
    };

    gameDataOperand(type, param1, param2) {
        switch (type) {
            case 0:  // Item
                return $gameParty.numItems($dataItems[param1]);
            case 1:  // Weapon
                return $gameParty.numItems($dataWeapons[param1]);
            case 2:  // Armor
                return $gameParty.numItems($dataArmors[param1]);
            case 3:  // Actor
                var actor = $gameActors.actor(param1);
                if (actor) {
                    switch (param2) {
                        case 0:  // Level
                            return actor.level;
                        case 1:  // EXP
                            return actor.currentExp();
                        case 2:  // HP
                            return actor.hp;
                        case 3:  // MP
                            return actor.mp;
                        default:    // Parameter
                            if (param2 >= 4 && param2 <= 11) {
                                return actor.param(param2 - 4);
                            }
                    }
                }
                break;
            case 4:  // Enemy
                const enemy = $gameTroop.members()[param1];
                if (enemy) {
                    switch (param2) {
                        case 0:  // HP
                            return enemy.hp;
                        case 1:  // MP
                            return enemy.mp;
                        default:    // Parameter
                            if (param2 >= 2 && param2 <= 9) {
                                return enemy.param(param2 - 2);
                            }
                    }
                }
                break;
            case 5:  // Character
                const character = this.character(param1);
                if (character) {
                    switch (param2) {
                        case 0:  // Map X
                            return character.x;
                        case 1:  // Map Y
                            return character.y;
                        case 2:  // Direction
                            return character.direction();
                        case 3:  // Screen X
                            return character.screenX();
                        case 4:  // Screen Y
                            return character.screenY();
                    }
                }
                break;
            case 6:  // Party
                actor = $gameParty.members()[param1];
                return actor ? actor.actorId() : 0;
            case 7:  // Other
                switch (param1) {
                    case 0:  // Map ID
                        return $gameMap.mapId();
                    case 1:  // Party Members
                        return $gameParty.size();
                    case 2:  // Gold
                        return $gameParty.gold();
                    case 3:  // Steps
                        return $gameParty.steps();
                    case 4:  // Play Time
                        return $gameSystem.playtime();
                    case 5:  // Timer
                        return $gameTimer.seconds();
                    case 6:  // Save Count
                        return $gameSystem.saveCount();
                    case 7:  // Battle Count
                        return $gameSystem.battleCount();
                    case 8:  // Win Count
                        return $gameSystem.winCount();
                    case 9:  // Escape Count
                        return $gameSystem.escapeCount();
                }
                break;
        }
        return 0;
    };

    operateVariable(variableId, operationType, value) {
        try {
            let oldValue = $gameVariables.value(variableId);
            switch (operationType) {
                case 0:  // Set
                    $gameVariables.setValue(variableId, oldValue = value);
                    break;
                case 1:  // Add
                    $gameVariables.setValue(variableId, oldValue + value);
                    break;
                case 2:  // Sub
                    $gameVariables.setValue(variableId, oldValue - value);
                    break;
                case 3:  // Mul
                    $gameVariables.setValue(variableId, oldValue * value);
                    break;
                case 4:  // Div
                    $gameVariables.setValue(variableId, oldValue / value);
                    break;
                case 5:  // Mod
                    $gameVariables.setValue(variableId, oldValue % value);
                    break;
            }
        } catch (e) {
            $gameVariables.setValue(variableId, 0);
        }
    };

    // Control Self Switch
    command123() {
        if (this._eventId > 0) {
            const key = [this._mapId, this._eventId, this._params[0]];
            $gameSelfSwitches.setValue(key, this._params[1] === 0);
        }
        return true;
    };

    // Control Timer
    command124() {
        if (this._params[0] === 0) {  // Start
            $gameTimer.start(this._params[1] * 60);
        } else {  // Stop
            $gameTimer.stop();
        }
        return true;
    };

    // Change Gold
    command125() {
        const value = this.operateValue(this._params[0], this._params[1], this._params[2]);
        $gameParty.gainGold(value);
        return true;
    };

    // Change Items
    command126() {
        const value = this.operateValue(this._params[1], this._params[2], this._params[3]);
        $gameParty.gainItem($dataItems[this._params[0]], value);
        return true;
    };

    // Change Weapons
    command127() {
        const value = this.operateValue(this._params[1], this._params[2], this._params[3]);
        $gameParty.gainItem($dataWeapons[this._params[0]], value, this._params[4]);
        return true;
    };

    // Change Armors
    command128() {
        const value = this.operateValue(this._params[1], this._params[2], this._params[3]);
        $gameParty.gainItem($dataArmors[this._params[0]], value, this._params[4]);
        return true;
    };

    // Change Party Member
    command129() {
        const actor = $gameActors.actor(this._params[0]);
        if (actor) {
            if (this._params[1] === 0) {  // Add
                if (this._params[2]) {   // Initialize
                    $gameActors.actor(this._params[0]).setup(this._params[0]);
                }
                $gameParty.addActor(this._params[0]);
            } else {  // Remove
                $gameParty.removeActor(this._params[0]);
            }
        }
        return true;
    };

    // Change Battle BGM
    command132() {
        $gameSystem.setBattleBgm(this._params[0]);
        return true;
    };

    // Change Victory ME
    command133() {
        $gameSystem.setVictoryMe(this._params[0]);
        return true;
    };

    // Change Save Access
    command134() {
        if (this._params[0] === 0) {
            $gameSystem.disableSave();
        } else {
            $gameSystem.enableSave();
        }
        return true;
    };

    // Change Menu Access
    command135() {
        if (this._params[0] === 0) {
            $gameSystem.disableMenu();
        } else {
            $gameSystem.enableMenu();
        }
        return true;
    };

    // Change Encounter Disable
    command136() {
        if (this._params[0] === 0) {
            $gameSystem.disableEncounter();
        } else {
            $gameSystem.enableEncounter();
        }
        $gamePlayer.makeEncounterCount();
        return true;
    };

    // Change Formation Access
    command137() {
        if (this._params[0] === 0) {
            $gameSystem.disableFormation();
        } else {
            $gameSystem.enableFormation();
        }
        return true;
    };

    // Change Window Color
    command138() {
        $gameSystem.setWindowTone(this._params[0]);
        return true;
    };

    // Change Defeat ME
    command139() {
        $gameSystem.setDefeatMe(this._params[0]);
        return true;
    };

    // Change Vehicle BGM
    command140() {
        const vehicle = $gameMap.vehicle(this._params[0]);
        if (vehicle) {
            vehicle.setBgm(this._params[1]);
        }
        return true;
    };

    // Transfer Player
    command201() {
        if (!$gameParty.inBattle() && !$gameMessage.isBusy()) {
            let mapId, x, y;
            if (this._params[0] === 0) {  // Direct designation
                mapId = this._params[1];
                x = this._params[2];
                y = this._params[3];
            } else {  // Designation with variables
                mapId = $gameVariables.value(this._params[1]);
                x = $gameVariables.value(this._params[2]);
                y = $gameVariables.value(this._params[3]);
            }
            $gamePlayer.reserveTransfer(mapId, x, y, this._params[4], this._params[5]);
            this.setWaitMode('transfer');
            this._index++;
        }
        return false;
    };

    // Set Vehicle Location
    command202() {
        let mapId, x, y;
        if (this._params[1] === 0) {  // Direct designation
            mapId = this._params[2];
            x = this._params[3];
            y = this._params[4];
        } else {  // Designation with variables
            mapId = $gameVariables.value(this._params[2]);
            x = $gameVariables.value(this._params[3]);
            y = $gameVariables.value(this._params[4]);
        }
        const vehicle = $gameMap.vehicle(this._params[0]);
        if (vehicle) {
            vehicle.setLocation(mapId, x, y);
        }
        return true;
    };

    // Set Event Location
    command203() {
        const character = this.character(this._params[0]);
        if (character) {
            if (this._params[1] === 0) {  // Direct designation
                character.locate(this._params[2], this._params[3]);
            } else if (this._params[1] === 1) {  // Designation with variables
                const x = $gameVariables.value(this._params[2]);
                const y = $gameVariables.value(this._params[3]);
                character.locate(x, y);
            } else {  // Exchange with another event
                const character2 = this.character(this._params[2]);
                if (character2) {
                    character.swap(character2);
                }
            }
            if (this._params[4] > 0) {
                character.setDirection(this._params[4]);
            }
        }
        return true;
    };

    // Scroll Map
    command204() {
        if (!$gameParty.inBattle()) {
            if ($gameMap.isScrolling()) {
                this.setWaitMode('scroll');
                return false;
            }
            $gameMap.startScroll(this._params[0], this._params[1], this._params[2]);
        }
        return true;
    };

    // Set Movement Route
    command205() {
        $gameMap.refreshIfNeeded();
        this._character = this.character(this._params[0]);
        if (this._character) {
            this._character.forceMoveRoute(this._params[1]);
            if (this._params[1].wait) {
                this.setWaitMode('route');
            }
        }
        return true;
    };

    // Getting On and Off Vehicles
    command206() {
        $gamePlayer.getOnOffVehicle();
        return true;
    };

    // Change Transparency
    command211() {
        $gamePlayer.setTransparent(this._params[0] === 0);
        return true;
    };

    // Show Animation
    command212() {
        this._character = this.character(this._params[0]);
        if (this._character) {
            this._character.requestAnimation(this._params[1]);
            if (this._params[2]) {
                this.setWaitMode('animation');
            }
        }
        return true;
    };

    // Show Balloon Icon
    command213() {
        this._character = this.character(this._params[0]);
        if (this._character) {
            this._character.requestBalloon(this._params[1]);
            if (this._params[2]) {
                this.setWaitMode('balloon');
            }
        }
        return true;
    };

    // Erase Event
    command214() {
        if (this.isOnCurrentMap() && this._eventId > 0) {
            $gameMap.eraseEvent(this._eventId);
        }
        return true;
    };

    // Change Player Followers
    command216() {
        if (this._params[0] === 0) {
            $gamePlayer.showFollowers();
        } else {
            $gamePlayer.hideFollowers();
        }
        $gamePlayer.refresh();
        return true;
    };

    // Gather Followers
    command217() {
        if (!$gameParty.inBattle()) {
            $gamePlayer.gatherFollowers();
            this.setWaitMode('gather');
        }
        return true;
    };

    // Fadeout Screen
    command221() {
        if (!$gameMessage.isBusy()) {
            $gameScreen.startFadeOut(this.fadeSpeed());
            this.wait(this.fadeSpeed());
            this._index++;
        }
        return false;
    };

    // Fadein Screen
    command222() {
        if (!$gameMessage.isBusy()) {
            $gameScreen.startFadeIn(this.fadeSpeed());
            this.wait(this.fadeSpeed());
            this._index++;
        }
        return false;
    };

    // Tint Screen
    command223() {
        $gameScreen.startTint(this._params[0], this._params[1]);
        if (this._params[2]) {
            this.wait(this._params[1]);
        }
        return true;
    };

    // Flash Screen
    command224() {
        $gameScreen.startFlash(this._params[0], this._params[1]);
        if (this._params[2]) {
            this.wait(this._params[1]);
        }
        return true;
    };

    // Shake Screen
    command225() {
        $gameScreen.startShake(this._params[0], this._params[1], this._params[2]);
        if (this._params[3]) {
            this.wait(this._params[2]);
        }
        return true;
    };

    // Wait
    command230() {
        this.wait(this._params[0]);
        return true;
    };

    // Show Picture
    command231() {
        let x, y;
        if (this._params[3] === 0) {  // Direct designation
            x = this._params[4];
            y = this._params[5];
        } else {  // Designation with variables
            x = $gameVariables.value(this._params[4]);
            y = $gameVariables.value(this._params[5]);
        }
        $gameScreen.showPicture(this._params[0], this._params[1], this._params[2],
            x, y, this._params[6], this._params[7], this._params[8], this._params[9]);
        return true;
    };

    // Move Picture
    command232() {
        let x, y;
        if (this._params[3] === 0) {  // Direct designation
            x = this._params[4];
            y = this._params[5];
        } else {  // Designation with variables
            x = $gameVariables.value(this._params[4]);
            y = $gameVariables.value(this._params[5]);
        }
        $gameScreen.movePicture(this._params[0], this._params[2], x, y, this._params[6],
            this._params[7], this._params[8], this._params[9], this._params[10]);
        if (this._params[11]) {
            this.wait(this._params[10]);
        }
        return true;
    };

    // Rotate Picture
    command233() {
        $gameScreen.rotatePicture(this._params[0], this._params[1]);
        return true;
    };

    // Tint Picture
    command234() {
        $gameScreen.tintPicture(this._params[0], this._params[1], this._params[2]);
        if (this._params[3]) {
            this.wait(this._params[2]);
        }
        return true;
    };

    // Erase Picture
    command235() {
        $gameScreen.erasePicture(this._params[0]);
        return true;
    };

    // Set Weather Effect
    command236() {
        if (!$gameParty.inBattle()) {
            $gameScreen.changeWeather(this._params[0], this._params[1], this._params[2]);
            if (this._params[3]) {
                this.wait(this._params[2]);
            }
        }
        return true;
    };

    // Play BGM
    command241() {
        AudioManager.playBgm(this._params[0]);
        return true;
    };

    // Fadeout BGM
    command242() {
        AudioManager.fadeOutBgm(this._params[0]);
        return true;
    };

    // Save BGM
    command243() {
        $gameSystem.saveBgm();
        return true;
    };

    // Resume BGM
    command244() {
        $gameSystem.replayBgm();
        return true;
    };

    // Play BGS
    command245() {
        AudioManager.playBgs(this._params[0]);
        return true;
    };

    // Fadeout BGS
    command246() {
        AudioManager.fadeOutBgs(this._params[0]);
        return true;
    };

    // Play ME
    command249() {
        AudioManager.playMe(this._params[0]);
        return true;
    };

    // Play SE
    command250() {
        AudioManager.playSe(this._params[0]);
        return true;
    };

    // Stop SE
    command251() {
        AudioManager.stopSe();
        return true;
    };

    // Play Movie
    command261() {
        if (!$gameMessage.isBusy()) {
            const name = this._params[0];
            if (name.length > 0) {
                const ext = this.videoFileExt();
                Graphics.playVideo('movies/' + name + ext);
                this.setWaitMode('video');
            }
            this._index++;
        }
        return false;
    };

    videoFileExt() {
        if (Graphics.canPlayVideoType('video/webm') && !Utils.isMobileDevice()) {
            return '.webm';
        } else {
            return '.mp4';
        }
    };

    // Change Map Name Display
    command281() {
        if (this._params[0] === 0) {
            $gameMap.enableNameDisplay();
        } else {
            $gameMap.disableNameDisplay();
        }
        return true;
    };

    // Change Tileset
    command282() {
        const tileset = $dataTilesets[this._params[0]];
        if (!this._imageReservationId) {
            this._imageReservationId = Utils.generateRuntimeId();
        }

        const allReady = tileset.tilesetNames.map(tilesetName =>
            ImageManager.reserveTileset(tilesetName, 0, this._imageReservationId)
        ).every(bitmap => bitmap.isReady());

        if (allReady) {
            $gameMap.changeTileset(this._params[0]);
            ImageManager.releaseReservation(this._imageReservationId);
            this._imageReservationId = null;

            return true;
        } else {
            return false;
        }
    };

    // Change Battle Back
    command283() {
        $gameMap.changeBattleback(this._params[0], this._params[1]);
        return true;
    };

    // Change Parallax
    command284() {
        $gameMap.changeParallax(this._params[0], this._params[1],
            this._params[2], this._params[3], this._params[4]);
        return true;
    };

    // Get Location Info
    command285() {
        let x, y, value;
        if (this._params[2] === 0) {  // Direct designation
            x = this._params[3];
            y = this._params[4];
        } else {  // Designation with variables
            x = $gameVariables.value(this._params[3]);
            y = $gameVariables.value(this._params[4]);
        }
        switch (this._params[1]) {
            case 0:     // Terrain Tag
                value = $gameMap.terrainTag(x, y);
                break;
            case 1:     // Event ID
                value = $gameMap.eventIdXy(x, y);
                break;
            case 2:     // Tile ID (Layer 1)
            case 3:     // Tile ID (Layer 2)
            case 4:     // Tile ID (Layer 3)
            case 5:     // Tile ID (Layer 4)
                value = $gameMap.tileId(x, y, this._params[1] - 2);
                break;
            default:    // Region ID
                value = $gameMap.regionId(x, y);
                break;
        }
        $gameVariables.setValue(this._params[0], value);
        return true;
    };

    // Battle Processing
    command301() {
        if (!$gameParty.inBattle()) {
            let troopId;
            if (this._params[0] === 0) {  // Direct designation
                troopId = this._params[1];
            } else if (this._params[0] === 1) {  // Designation with a variable
                troopId = $gameVariables.value(this._params[1]);
            } else {  // Same as Random Encounter
                troopId = $gamePlayer.makeEncounterTroopId();
            }
            if ($dataTroops[troopId]) {
                BattleManager.setup(troopId, this._params[2], this._params[3]);
                BattleManager.setEventCallback(n => {
                    this._branch[this._indent] = n;
                });
                $gamePlayer.makeEncounterCount();
                SceneManager.push(Scene_Battle);
            }
        }
        return true;
    };

    // If Win
    command601() {
        if (this._branch[this._indent] !== 0) {
            this.skipBranch();
        }
        return true;
    };

    // If Escape
    command602() {
        if (this._branch[this._indent] !== 1) {
            this.skipBranch();
        }
        return true;
    };

    // If Lose
    command603() {
        if (this._branch[this._indent] !== 2) {
            this.skipBranch();
        }
        return true;
    };

    // Shop Processing
    command302() {
        if (!$gameParty.inBattle()) {
            const goods = [this._params];
            while (this.nextEventCode() === 605) {
                this._index++;
                goods.push(this.currentCommand().parameters);
            }
            SceneManager.push(Scene_Shop);
            SceneManager.prepareNextScene(goods, this._params[4]);
        }
        return true;
    };

    // Name Input Processing
    command303() {
        if (!$gameParty.inBattle()) {
            if ($dataActors[this._params[0]]) {
                SceneManager.push(Scene_Name);
                SceneManager.prepareNextScene(this._params[0], this._params[1]);
            }
        }
        return true;
    };

    // Change HP
    command311() {
        const value = this.operateValue(this._params[2], this._params[3], this._params[4]);
        this.iterateActorEx(this._params[0], this._params[1], actor => {
            this.changeHp(actor, value, this._params[5]);
        });
        return true;
    };

    // Change MP
    command312() {
        const value = this.operateValue(this._params[2], this._params[3], this._params[4]);
        this.iterateActorEx(this._params[0], this._params[1], actor => {
            actor.gainMp(value);
        });
        return true;
    };

    // Change TP
    command326() {
        const value = this.operateValue(this._params[2], this._params[3], this._params[4]);
        this.iterateActorEx(this._params[0], this._params[1], actor => {
            actor.gainTp(value);
        });
        return true;
    };

    // Change State
    command313() {
        this.iterateActorEx(this._params[0], this._params[1], actor => {
            const alreadyDead = actor.isDead();
            if (this._params[2] === 0) {
                actor.addState(this._params[3]);
            } else {
                actor.removeState(this._params[3]);
            }
            if (actor.isDead() && !alreadyDead) {
                actor.performCollapse();
            }
            actor.clearResult();
        });
        return true;
    };

    // Recover All
    command314() {
        this.iterateActorEx(this._params[0], this._params[1], actor => {
            actor.recoverAll();
        });
        return true;
    };

    // Change EXP
    command315() {
        const value = this.operateValue(this._params[2], this._params[3], this._params[4]);
        this.iterateActorEx(this._params[0], this._params[1], actor => {
            actor.changeExp(actor.currentExp() + value, this._params[5]);
        });
        return true;
    };

    // Change Level
    command316() {
        const value = this.operateValue(this._params[2], this._params[3], this._params[4]);
        this.iterateActorEx(this._params[0], this._params[1], actor => {
            actor.changeLevel(actor.level + value, this._params[5]);
        });
        return true;
    };

    // Change Parameter
    command317() {
        const value = this.operateValue(this._params[3], this._params[4], this._params[5]);
        this.iterateActorEx(this._params[0], this._params[1], actor => {
            actor.addParam(this._params[2], value);
        });
        return true;
    };

    // Change Skill
    command318() {
        this.iterateActorEx(this._params[0], this._params[1], actor => {
            if (this._params[2] === 0) {
                actor.learnSkill(this._params[3]);
            } else {
                actor.forgetSkill(this._params[3]);
            }
        });
        return true;
    };

    // Change Equipment
    command319() {
        const actor = $gameActors.actor(this._params[0]);
        if (actor) {
            actor.changeEquipById(this._params[1], this._params[2]);
        }
        return true;
    };

    // Change Name
    command320() {
        const actor = $gameActors.actor(this._params[0]);
        if (actor) {
            actor.setName(this._params[1]);
        }
        return true;
    };

    // Change Class
    command321() {
        const actor = $gameActors.actor(this._params[0]);
        if (actor && $dataClasses[this._params[1]]) {
            actor.changeClass(this._params[1], this._params[2]);
        }
        return true;
    };

    // Change Actor Images
    command322() {
        const actor = $gameActors.actor(this._params[0]);
        if (actor) {
            actor.setCharacterImage(this._params[1], this._params[2]);
            actor.setFaceImage(this._params[3], this._params[4]);
            actor.setBattlerImage(this._params[5]);
        }
        $gamePlayer.refresh();
        return true;
    };

    // Change Vehicle Image
    command323() {
        const vehicle = $gameMap.vehicle(this._params[0]);
        if (vehicle) {
            vehicle.setImage(this._params[1], this._params[2]);
        }
        return true;
    };

    // Change Nickname
    command324() {
        const actor = $gameActors.actor(this._params[0]);
        if (actor) {
            actor.setNickname(this._params[1]);
        }
        return true;
    };

    // Change Profile
    command325() {
        const actor = $gameActors.actor(this._params[0]);
        if (actor) {
            actor.setProfile(this._params[1]);
        }
        return true;
    };

    // Change Enemy HP
    command331() {
        const value = this.operateValue(this._params[1], this._params[2], this._params[3]);
        this.iterateEnemyIndex(this._params[0], enemy => {
            this.changeHp(enemy, value, this._params[4]);
        });
        return true;
    };

    // Change Enemy MP
    command332() {
        const value = this.operateValue(this._params[1], this._params[2], this._params[3]);
        this.iterateEnemyIndex(this._params[0], enemy => {
            enemy.gainMp(value);
        });
        return true;
    };

    // Change Enemy TP
    command342() {
        const value = this.operateValue(this._params[1], this._params[2], this._params[3]);
        this.iterateEnemyIndex(this._params[0], enemy => {
            enemy.gainTp(value);
        });
        return true;
    };

    // Change Enemy State
    command333() {
        this.iterateEnemyIndex(this._params[0], enemy => {
            const alreadyDead = enemy.isDead();
            if (this._params[1] === 0) {
                enemy.addState(this._params[2]);
            } else {
                enemy.removeState(this._params[2]);
            }
            if (enemy.isDead() && !alreadyDead) {
                enemy.performCollapse();
            }
            enemy.clearResult();
        });
        return true;
    };

    // Enemy Recover All
    command334() {
        this.iterateEnemyIndex(this._params[0], enemy => {
            enemy.recoverAll();
        });
        return true;
    };

    // Enemy Appear
    command335() {
        this.iterateEnemyIndex(this._params[0], enemy => {
            enemy.appear();
            $gameTroop.makeUniqueNames();
        });
        return true;
    };

    // Enemy Transform
    command336() {
        this.iterateEnemyIndex(this._params[0], enemy => {
            enemy.transform(this._params[1]);
            $gameTroop.makeUniqueNames();
        });
        return true;
    };

    // Show Battle Animation
    command337() {
        if (this._params[2] == true) {
            this.iterateEnemyIndex(-1, enemy => {
                if (enemy.isAlive()) {
                    enemy.startAnimation(this._params[1], false, 0);
                }
            });
        } else {
            this.iterateEnemyIndex(this._params[0], enemy => {
                if (enemy.isAlive()) {
                    enemy.startAnimation(this._params[1], false, 0);
                }
            });
        }
        return true;
    };

    // Force Action
    command339() {
        this.iterateBattler(this._params[0], this._params[1], battler => {
            if (!battler.isDeathStateAffected()) {
                battler.forceAction(this._params[2], this._params[3]);
                BattleManager.forceAction(battler);
                this.setWaitMode('action');
            }
        });
        return true;
    };

    // Abort Battle
    command340() {
        BattleManager.abort();
        return true;
    };

    // Open Menu Screen
    command351() {
        if (!$gameParty.inBattle()) {
            SceneManager.push(Scene_Menu);
            Window_MenuCommand.initCommandPosition();
        }
        return true;
    };

    // Open Save Screen
    command352() {
        if (!$gameParty.inBattle()) {
            SceneManager.push(Scene_Save);
        }
        return true;
    };

    // Game Over
    command353() {
        SceneManager.goto(Scene_Gameover);
        return true;
    };

    // Return to Title Screen
    command354() {
        SceneManager.goto(Scene_Title);
        return true;
    };

    // Script
    command355() {
        let script = this.currentCommand().parameters[0] + '\n';
        while (this.nextEventCode() === 655) {
            this._index++;
            script += this.currentCommand().parameters[0] + '\n';
        }
        eval(script);
        return true;
    };

    // Plugin Command
    command356() {
        const args = this._params[0].split(" ");
        const command = args.shift();
        this.pluginCommand(command, args);
        return true;
    };

    pluginCommand(command, args) {
        // to be overridden by plugins
    };

    static requestImages(list, commonList) {
        if (!list) return;

        for (const command of list) {
            const params = command.parameters;
            switch (command.code) {
                // Show Text
                case 101:
                    ImageManager.requestFace(params[0]);
                    break;

                // Common Event
                case 117:
                    const commonEvent = $dataCommonEvents[params[0]];
                    if (commonEvent) {
                        if (!commonList) {
                            commonList = [];
                        }
                        if (!commonList.contains(params[0])) {
                            commonList.push(params[0]);
                            Game_Interpreter.requestImages(commonEvent.list, commonList);
                        }
                    }
                    break;

                // Change Party Member
                case 129:
                    const actor = $gameActors.actor(params[0]);
                    if (actor && params[1] === 0) {
                        const name = actor.characterName();
                        ImageManager.requestCharacter(name);
                    }
                    break;

                // Set Movement Route
                case 205:
                    if (params[1]) {
                        for (const command of params[1].list) {
                            const params = command.parameters;
                            if (command.code === Game_Character.ROUTE_CHANGE_IMAGE) {
                                ImageManager.requestCharacter(params[0]);
                            }
                        };
                    }
                    break;

                // Show Animation, Show Battle Animation
                case 212: case 337:
                    if (params[1]) {
                        const animation = $dataAnimations[params[1]];
                        const name1 = animation.animation1Name;
                        const name2 = animation.animation2Name;
                        const hue1 = animation.animation1Hue;
                        const hue2 = animation.animation2Hue;
                        ImageManager.requestAnimation(name1, hue1);
                        ImageManager.requestAnimation(name2, hue2);
                    }
                    break;

                // Change Player Followers
                case 216:
                    if (params[0] === 0) {
                        for (const follower of $gamePlayer.followers()) {
                            const name = follower.characterName();
                            ImageManager.requestCharacter(name);
                        };
                    }
                    break;

                // Show Picture
                case 231:
                    ImageManager.requestPicture(params[1]);
                    break;

                // Change Tileset
                case 282:
                    const tileset = $dataTilesets[params[0]];
                    for (const tilesetName of tileset.tilesetNames) {
                        ImageManager.requestTileset(tilesetName);
                    };
                    break;

                // Change Battle Back
                case 283:
                    if ($gameParty.inBattle()) {
                        ImageManager.requestBattleback1(params[0]);
                        ImageManager.requestBattleback2(params[1]);
                    }
                    break;

                // Change Parallax
                case 284:
                    if (!$gameParty.inBattle()) {
                        ImageManager.requestParallax(params[0]);
                    }
                    break;

                // Change Actor Images
                case 322:
                    ImageManager.requestCharacter(params[1]);
                    ImageManager.requestFace(params[3]);
                    ImageManager.requestSvActor(params[5]);
                    break;

                // Change Vehicle Image
                case 323:
                    const vehicle = $gameMap.vehicle(params[0]);
                    if (vehicle) {
                        ImageManager.requestCharacter(params[1]);
                    }
                    break;

                // Enemy Transform
                case 336:
                    const enemy = $dataEnemies[params[1]];
                    const name = enemy.battlerName;
                    const hue = enemy.battlerHue;
                    if ($gameSystem.isSideView()) {
                        ImageManager.requestSvEnemy(name, hue);
                    } else {
                        ImageManager.requestEnemy(name, hue);
                    }
                    break;
            }
        };
    };
};

//=============================================================================