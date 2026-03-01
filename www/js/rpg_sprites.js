//=============================================================================
// rpg_sprites.js v1.6.2
//=============================================================================

//=============================================================================

// Sprite_Base
//
// The sprite class with a feature which displays animations.
class Sprite_Base extends Sprite {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize() {
        if (this._initFlag) {
            this._initFlag = false;
        }
        super.initialize();
        this._animationSprites = [];
        this._effectTarget = this;
        this._hiding = false;
    };

    update() {
        super.update();
        this.updateVisibility();
        this.updateAnimationSprites();
    };

    hide() {
        this._hiding = true;
        this.updateVisibility();
    };

    show() {
        this._hiding = false;
        this.updateVisibility();
    };

    updateVisibility() {
        this.visible = !this._hiding;
    };

    updateAnimationSprites() {
        if (this._animationSprites.length > 0) {
            const sprites = this._animationSprites.clone();
            this._animationSprites = [];
            for (let sprite of sprites) {
                sprite.isPlaying()
                    ? this._animationSprites.push(sprite)
                    : sprite.remove();
            };
        }
    };

    startAnimation(animation, mirror, delay) {
        const sprite = new Sprite_Animation();
        sprite.setup(this._effectTarget, animation, mirror, delay);
        this.parent.addChild(sprite);
        this._animationSprites.push(sprite);
    };

    isAnimationPlaying() {
        return this._animationSprites.length > 0;
    };
};

//-----------------------------------------------------------------------------

// Sprite_Button
//
// The sprite for displaying a button.
class Sprite_Button extends Sprite {
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
        this._touching = false;
        this._coldFrame = null;
        this._hotFrame = null;
        this._clickHandler = null;
    };

    update() {
        super.update();
        this.updateFrame();
        this.processTouch();
    };

    updateFrame() {
        let frame;
        if (this._touching) {
            frame = this._hotFrame;
        } else {
            frame = this._coldFrame;
        }
        if (frame) {
            this.setFrame(frame.x, frame.y, frame.width, frame.height);
        }
    };

    setColdFrame(x, y, width, height) {
        this._coldFrame = new Rectangle(x, y, width, height);
    };

    setHotFrame(x, y, width, height) {
        this._hotFrame = new Rectangle(x, y, width, height);
    };

    setClickHandler(method) {
        this._clickHandler = method;
    };

    callClickHandler() {
        if (this._clickHandler) {
            this._clickHandler();
        }
    };

    processTouch() {
        if (this.isActive()) {
            if (TouchInput.isTriggered() && this.isButtonTouched()) {
                this._touching = true;
            }
            if (this._touching) {
                if (TouchInput.isReleased() || !this.isButtonTouched()) {
                    this._touching = false;
                    if (TouchInput.isReleased()) {
                        this.callClickHandler();
                    }
                }
            }
        } else {
            this._touching = false;
        }
    };

    isActive() {
        let node = this;
        while (node) {
            if (!node.visible) {
                return false;
            }
            node = node.parent;
        }
        return true;
    };

    isButtonTouched() {
        const x = this.canvasToLocalX(TouchInput.x);
        const y = this.canvasToLocalY(TouchInput.y);
        return x >= 0 && y >= 0 && x < this.width && y < this.height;
    };

    canvasToLocalX(x) {
        let node = this;
        while (node) {
            x -= node.x;
            node = node.parent;
        }
        return x;
    };

    canvasToLocalY(y) {
        let node = this;
        while (node) {
            y -= node.y;
            node = node.parent;
        }
        return y;
    };
};

//-----------------------------------------------------------------------------

// Sprite_Character
//
// The sprite for displaying a character.
class Sprite_Character extends Sprite_Base {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize(character) {
        if (this._initFlag) {
            this._initFlag = false;
        }
        super.initialize();
        this.initMembers();
        this.setCharacter(character);
    };

    initMembers() {
        this.anchor.x = 0.5;
        this.anchor.y = 1;
        this._character = null;
        this._balloonDuration = 0;
        this._tilesetId = 0;
        this._upperBody = null;
        this._lowerBody = null;
    };

    setCharacter(character) {
        this._character = character;
    };

    update() {
        super.update();
        this.updateBitmap();
        this.updateFrame();
        this.updatePosition();
        this.updateAnimation();
        this.updateBalloon();
        this.updateOther();
    };

    updateVisibility() {
        super.updateVisibility();
        if (this._character.isTransparent()) {
            this.visible = false;
        }
    };

    isTile() {
        return this._character.tileId > 0;
    };

    tilesetBitmap(tileId) {
        const tileset = $gameMap.tileset();
        const setNumber = 5 + Math.floor(tileId / 256);
        return ImageManager.loadTileset(tileset.tilesetNames[setNumber]);
    };

    updateBitmap() {
        if (this.isImageChanged()) {
            this._tilesetId = $gameMap.tilesetId();
            this._tileId = this._character.tileId();
            this._characterName = this._character.characterName();
            this._characterIndex = this._character.characterIndex();
            if (this._tileId > 0) {
                this.setTileBitmap();
            } else {
                this.setCharacterBitmap();
            }
        }
    };

    isImageChanged() {
        return (this._tilesetId !== $gameMap.tilesetId() ||
            this._tileId !== this._character.tileId() ||
            this._characterName !== this._character.characterName() ||
            this._characterIndex !== this._character.characterIndex());
    };

    setTileBitmap() {
        this.bitmap = this.tilesetBitmap(this._tileId);
    };

    setCharacterBitmap() {
        this.bitmap = ImageManager.loadCharacter(this._characterName);
        this._isBigCharacter = ImageManager.isBigCharacter(this._characterName);
    };

    updateFrame() {
        if (this._tileId > 0) {
            this.updateTileFrame();
        } else {
            this.updateCharacterFrame();
        }
    };

    updateTileFrame() {
        const pw = this.patternWidth();
        const ph = this.patternHeight();
        const sx = (Math.floor(this._tileId / 128) % 2 * 8 + this._tileId % 8) * pw;
        const sy = Math.floor(this._tileId % 256 / 8) % 16 * ph;
        this.setFrame(sx, sy, pw, ph);
    };

    updateCharacterFrame() {
        const pw = this.patternWidth();
        const ph = this.patternHeight();
        const sx = (this.characterBlockX() + this.characterPatternX()) * pw;
        const sy = (this.characterBlockY() + this.characterPatternY()) * ph;
        this.updateHalfBodySprites();
        if (this._bushDepth > 0) {
            const d = this._bushDepth;
            this._upperBody.setFrame(sx, sy, pw, ph - d);
            this._lowerBody.setFrame(sx, sy + ph - d, pw, d);
            this.setFrame(sx, sy, 0, ph);
        } else {
            this.setFrame(sx, sy, pw, ph);
        }
    };

    characterBlockX() {
        if (this._isBigCharacter) {
            return 0;
        } else {
            const index = this._character.characterIndex();
            return index % 4 * 3;
        }
    };

    characterBlockY() {
        if (this._isBigCharacter) {
            return 0;
        } else {
            const index = this._character.characterIndex();
            return Math.floor(index / 4) * 4;
        }
    };

    characterPatternX() {
        return this._character.pattern();
    };

    characterPatternY() {
        return (this._character.direction() - 2) / 2;
    };

    patternWidth() {
        if (this._tileId > 0) {
            return $gameMap.tileWidth();
        } else if (this._isBigCharacter) {
            return this.bitmap.width / 3;
        } else {
            return this.bitmap.width / 12;
        }
    };

    patternHeight() {
        if (this._tileId > 0) {
            return $gameMap.tileHeight();
        } else if (this._isBigCharacter) {
            return this.bitmap.height / 4;
        } else {
            return this.bitmap.height / 8;
        }
    };

    updateHalfBodySprites() {
        if (this._bushDepth > 0) {
            this.createHalfBodySprites();
            this._upperBody.bitmap = this.bitmap;
            this._upperBody.visible = true;
            this._upperBody.y = - this._bushDepth;
            this._lowerBody.bitmap = this.bitmap;
            this._lowerBody.visible = true;
            this._upperBody.setBlendColor(this.getBlendColor());
            this._lowerBody.setBlendColor(this.getBlendColor());
            this._upperBody.setColorTone(this.getColorTone());
            this._lowerBody.setColorTone(this.getColorTone());
        } else if (this._upperBody) {
            this._upperBody.visible = false;
            this._lowerBody.visible = false;
        }
    };

    createHalfBodySprites() {
        if (!this._upperBody) {
            this._upperBody = new Sprite();
            this._upperBody.anchor.x = 0.5;
            this._upperBody.anchor.y = 1;
            this.addChild(this._upperBody);
        }
        if (!this._lowerBody) {
            this._lowerBody = new Sprite();
            this._lowerBody.anchor.x = 0.5;
            this._lowerBody.anchor.y = 1;
            this._lowerBody.opacity = 128;
            this.addChild(this._lowerBody);
        }
    };

    updatePosition() {
        this.x = this._character.screenX();
        this.y = this._character.screenY();
        this.z = this._character.screenZ();
    };

    updateAnimation() {
        this.setupAnimation();
        if (!this.isAnimationPlaying()) {
            this._character.endAnimation();
        }
        if (!this.isBalloonPlaying()) {
            this._character.endBalloon();
        }
    };

    updateOther() {
        this.opacity = this._character.opacity();
        this.blendMode = this._character.blendMode();
        this._bushDepth = this._character.bushDepth();
    };

    setupAnimation() {
        if (this._character.animationId() > 0) {
            const animation = $dataAnimations[this._character.animationId()];
            this.startAnimation(animation, false, 0);
            this._character.startAnimation();
        }
    };

    setupBalloon() {
        if (this._character.balloonId() > 0) {
            this.startBalloon();
            this._character.startBalloon();
        }
    };

    startBalloon() {
        if (!this._balloonSprite) {
            this._balloonSprite = new Sprite_Balloon();
        }
        this._balloonSprite.setup(this._character.balloonId());
        this.parent.addChild(this._balloonSprite);
    };

    updateBalloon() {
        this.setupBalloon();
        if (this._balloonSprite) {
            if (this._balloonSprite._balloonId === 13) {
                this._balloonSprite.x = this.x;
                this._balloonSprite.y = this.y - (this.height / 4);
            } else {
                this._balloonSprite.x = this.x;
                this._balloonSprite.y = this.y - this.height;
            }
            if (!this._balloonSprite.isPlaying()) {
                this.endBalloon();
            }
        }
    };

    endBalloon() {
        if (this._balloonSprite) {
            this.parent.removeChild(this._balloonSprite);
            this._balloonSprite = null;
        }
    };

    isBalloonPlaying() {
        return !!this._balloonSprite;
    };
};

//-----------------------------------------------------------------------------

// Sprite_Battler
//
// The superclass of Sprite_Actor and Sprite_Enemy.
class Sprite_Battler extends Sprite_Base {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize(battler) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize();
        this.initMembers();
        this.setBattler(battler);
    };

    initMembers() {
        this.anchor.x = 0.5;
        this.anchor.y = 1;
        this._battler = null;
        this._damages = [];
        this._homeX = 0;
        this._homeY = 0;
        this._offsetX = 0;
        this._offsetY = 0;
        this._targetOffsetX = NaN;
        this._targetOffsetY = NaN;
        this._movementDuration = 0;
        this._selectionEffectCount = 0;
    };

    setBattler(battler) {
        this._battler = battler;
    };

    setHome(x, y) {
        this._homeX = x;
        this._homeY = y;
        this.updatePosition();
    };

    update() {
        super.update();
        if (this._battler) {
            this.updateMain();
            this.updateAnimation();
            this.updateDamagePopup();
            this.updateSelectionEffect();
        } else {
            this.bitmap = null;
        }
    };

    updateVisibility() {
        super.updateVisibility();
        if (!this._battler || !this._battler.isSpriteVisible()) {
            this.visible = false;
        }
    };

    updateMain() {
        if (this._battler.isSpriteVisible()) {
            this.updateBitmap();
            this.updateFrame();
        }
        this.updateMove();
        this.updatePosition();
    };

    updateBitmap() {
    };

    updateFrame() {
    };

    updateMove() {
        if (this._movementDuration > 0) {
            const d = this._movementDuration;
            this._offsetX = (this._offsetX * (d - 1) + this._targetOffsetX) / d;
            this._offsetY = (this._offsetY * (d - 1) + this._targetOffsetY) / d;
            this._movementDuration--;
            if (this._movementDuration === 0) {
                this.onMoveEnd();
            }
        }
    };

    updatePosition() {
        this.x = this._homeX + this._offsetX;
        this.y = this._homeY + this._offsetY;
    };

    updateAnimation() {
        this.setupAnimation();
    };

    updateDamagePopup() {
        this.setupDamagePopup();
        if (this._damages.length > 0) {
            for (let damages of this._damages) {
                damages.update();
            }
            if (!this._damages[0].isPlaying()) {
                this.parent.removeChild(this._damages[0]);
                this._damages.shift();
            }
        }
    };

    updateSelectionEffect() {
        const target = this._effectTarget;
        if (this._battler.isSelected()) {
            this._selectionEffectCount++;
            if (this._selectionEffectCount % 30 < 15) {
                target.setBlendColor([255, 255, 255, 64]);
            } else {
                target.setBlendColor([0, 0, 0, 0]);
            }
        } else if (this._selectionEffectCount > 0) {
            this._selectionEffectCount = 0;
            target.setBlendColor([0, 0, 0, 0]);
        }
    };

    setupAnimation() {
        while (this._battler.isAnimationRequested()) {
            const data = this._battler.shiftAnimation();
            const animation = $dataAnimations[data.animationId];
            const mirror = data.mirror;
            const delay = animation.position === 3 ? 0 : data.delay;
            this.startAnimation(animation, mirror, delay);
            for (let sprite of this._animationSprites) {
                sprite.visible = this._battler.isSpriteVisible();
            }
        }
    };

    setupDamagePopup() {
        if (this._battler.isDamagePopupRequested()) {
            if (this._battler.isSpriteVisible()) {
                const sprite = new Sprite_Damage();
                sprite.x = this.x + this.damageOffsetX();
                sprite.y = this.y + this.damageOffsetY();
                sprite.setup(this._battler);
                this._damages.push(sprite);
                this.parent.addChild(sprite);
            }
            this._battler.clearDamagePopup();
            this._battler.clearResult();
        }
    };

    damageOffsetX() {
        return 0;
    };

    damageOffsetY() {
        return 0;
    };

    startMove(x, y, duration) {
        if (this._targetOffsetX !== x || this._targetOffsetY !== y) {
            this._targetOffsetX = x;
            this._targetOffsetY = y;
            this._movementDuration = duration;
            if (duration === 0) {
                this._offsetX = x;
                this._offsetY = y;
            }
        }
    };

    onMoveEnd() {
    };

    isEffecting() {
        return false;
    };

    isMoving() {
        return this._movementDuration > 0;
    };

    inHomePosition() {
        return this._offsetX === 0 && this._offsetY === 0;
    };
};

//-----------------------------------------------------------------------------

// Sprite_Actor
//
// The sprite for displaying an actor.
class Sprite_Actor extends Sprite_Battler {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    static MOTIONS = {
        walk: { index: 0, loop: true },
        wait: { index: 1, loop: true },
        chant: { index: 2, loop: true },
        guard: { index: 3, loop: true },
        damage: { index: 4, loop: false },
        evade: { index: 5, loop: false },
        thrust: { index: 6, loop: false },
        swing: { index: 7, loop: false },
        missile: { index: 8, loop: false },
        skill: { index: 9, loop: false },
        spell: { index: 10, loop: false },
        item: { index: 11, loop: false },
        escape: { index: 12, loop: true },
        victory: { index: 13, loop: true },
        dying: { index: 14, loop: true },
        abnormal: { index: 15, loop: true },
        sleep: { index: 16, loop: true },
        dead: { index: 17, loop: true }
    };

    initialize(battler) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize(battler);
        this.moveToStartPosition();
    };

    initMembers() {
        super.initMembers();
        this._battlerName = '';
        this._motion = null;
        this._motionCount = 0;
        this._pattern = 0;
        this.createShadowSprite();
        this.createWeaponSprite();
        this.createMainSprite();
        this.createStateSprite();
    };

    createMainSprite() {
        this._mainSprite = new Sprite_Base();
        this._mainSprite.anchor.x = 0.5;
        this._mainSprite.anchor.y = 1;
        this.addChild(this._mainSprite);
        this._effectTarget = this._mainSprite;
    };

    createShadowSprite() {
        this._shadowSprite = new Sprite();
        this._shadowSprite.bitmap = ImageManager.loadSystem('Shadow2');
        this._shadowSprite.anchor.x = 0.5;
        this._shadowSprite.anchor.y = 0.5;
        this._shadowSprite.y = -2;
        this.addChild(this._shadowSprite);
    };

    createWeaponSprite() {
        this._weaponSprite = new Sprite_Weapon();
        this.addChild(this._weaponSprite);
    };

    createStateSprite() {
        this._stateSprite = new Sprite_StateOverlay();
        this.addChild(this._stateSprite);
    };

    setBattler(battler) {
        super.setBattler(battler);
        if (battler !== this._actor) {
            this._actor = battler;
            if (battler) {
                this.setActorHome(battler.index());
            }
            this.startEntryMotion();
            this._stateSprite.setup(battler);
        }
    };

    moveToStartPosition() {
        this.startMove(300, 0, 0);
    };

    setActorHome(index) {
        this.setHome(600 + index * 32, 280 + index * 48);
    };

    update() {
        super.update();
        this.updateShadow();
        if (this._actor) {
            this.updateMotion();
        }
    };

    updateShadow() {
        this._shadowSprite.visible = !!this._actor;
    };

    updateMain() {
        super.updateMain();
        if (this._actor.isSpriteVisible() && !this.isMoving()) {
            this.updateTargetPosition();
        }
    };

    setupMotion() {
        if (this._actor.isMotionRequested()) {
            this.startMotion(this._actor.motionType());
            this._actor.clearMotion();
        }
    };

    setupWeaponAnimation() {
        if (this._actor.isWeaponAnimationRequested()) {
            this._weaponSprite.setup(this._actor.weaponImageId());
            this._actor.clearWeaponAnimation();
        }
    };

    startMotion(motionType) {
        const newMotion = Sprite_Actor.MOTIONS[motionType];
        if (this._motion !== newMotion) {
            this._motion = newMotion;
            this._motionCount = 0;
            this._pattern = 0;
        }
    };

    updateTargetPosition() {
        if (this._actor.isInputting() || this._actor.isActing()) {
            this.stepForward();
        } else if (this._actor.canMove() && BattleManager.isEscaped()) {
            this.retreat();
        } else if (!this.inHomePosition()) {
            this.stepBack();
        }
    };

    updateBitmap() {
        super.updateBitmap();
        const name = this._actor.battlerName();
        if (this._battlerName !== name) {
            this._battlerName = name;
            this._mainSprite.bitmap = ImageManager.loadSvActor(name);
        }
    };

    updateFrame() {
        super.updateFrame();
        const bitmap = this._mainSprite.bitmap;
        if (bitmap) {
            const motionIndex = this._motion ? this._motion.index : 0;
            const pattern = this._pattern < 3 ? this._pattern : 1;
            const cw = bitmap.width / 9;
            const ch = bitmap.height / 6;
            const cx = Math.floor(motionIndex / 6) * 3 + pattern;
            const cy = motionIndex % 6;
            this._mainSprite.setFrame(cx * cw, cy * ch, cw, ch);
        }
    };

    updateMove() {
        const bitmap = this._mainSprite.bitmap;
        if (!bitmap || bitmap.isReady()) {
            super.updateMove();
        }
    };

    updateMotion() {
        this.setupMotion();
        this.setupWeaponAnimation();
        if (this._actor.isMotionRefreshRequested()) {
            this.refreshMotion();
            this._actor.clearMotion();
        }
        this.updateMotionCount();
    };

    updateMotionCount() {
        if (this._motion && ++this._motionCount >= this.motionSpeed()) {
            if (this._motion.loop) {
                this._pattern = (this._pattern + 1) % 4;
            } else if (this._pattern < 2) {
                this._pattern++;
            } else {
                this.refreshMotion();
            }
            this._motionCount = 0;
        }
    };

    motionSpeed() {
        return 12;
    };

    refreshMotion() {
        const actor = this._actor;
        const motionGuard = Sprite_Actor.MOTIONS['guard'];
        if (actor) {
            if (this._motion === motionGuard && !BattleManager.isInputting()) {
                return;
            }
            const stateMotion = actor.stateMotionIndex();
            if (actor.isInputting() || actor.isActing()) {
                this.startMotion('walk');
            } else if (stateMotion === 3) {
                this.startMotion('dead');
            } else if (stateMotion === 2) {
                this.startMotion('sleep');
            } else if (actor.isChanting()) {
                this.startMotion('chant');
            } else if (actor.isGuard() || actor.isGuardWaiting()) {
                this.startMotion('guard');
            } else if (stateMotion === 1) {
                this.startMotion('abnormal');
            } else if (actor.isDying()) {
                this.startMotion('dying');
            } else if (actor.isUndecided()) {
                this.startMotion('walk');
            } else {
                this.startMotion('wait');
            }
        }
    };

    startEntryMotion() {
        if (this._actor && this._actor.canMove()) {
            this.startMotion('walk');
            this.startMove(0, 0, 30);
        } else if (!this.isMoving()) {
            this.refreshMotion();
            this.startMove(0, 0, 0);
        }
    };

    stepForward() {
        this.startMove(-48, 0, 12);
    };

    stepBack() {
        this.startMove(0, 0, 12);
    };

    retreat() {
        this.startMove(300, 0, 30);
    };

    onMoveEnd() {
        super.onMoveEnd();
        if (!BattleManager.isBattleEnd()) {
            this.refreshMotion();
        }
    };

    damageOffsetX() {
        return -32;
    };

    damageOffsetY() {
        return 0;
    };
};

//-----------------------------------------------------------------------------

// Sprite_Enemy
//
// The sprite for displaying an enemy.
class Sprite_Enemy extends Sprite_Battler {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize(battler) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize(battler);
    };

    initMembers() {
        super.initMembers();
        this._enemy = null;
        this._appeared = false;
        this._battlerName = '';
        this._battlerHue = 0;
        this._effectType = null;
        this._effectDuration = 0;
        this._shake = 0;
        this.createStateIconSprite();
    };

    createStateIconSprite() {
        this._stateIconSprite = new Sprite_StateIcon();
        this.addChild(this._stateIconSprite);
    };

    setBattler(battler) {
        super.setBattler(battler);
        this._enemy = battler;
        this.setHome(battler.screenX(), battler.screenY());
        this._stateIconSprite.setup(battler);
    };

    update() {
        super.update();
        if (this._enemy) {
            this.updateEffect();
            this.updateStateSprite();
        }
    };

    updateBitmap() {
        super.updateBitmap();
        const name = this._enemy.battlerName();
        const hue = this._enemy.battlerHue();
        if (this._battlerName !== name || this._battlerHue !== hue) {
            this._battlerName = name;
            this._battlerHue = hue;
            this.loadBitmap(name, hue);
            this.initVisibility();
        }
    };

    loadBitmap(name, hue) {
        if ($gameSystem.isSideView()) {
            this.bitmap = ImageManager.loadSvEnemy(name, hue);
        } else {
            this.bitmap = ImageManager.loadEnemy(name, hue);
        }
    };

    updateFrame() {
        super.updateFrame();
        let frameHeight = this.bitmap.height;
        if (this._effectType === 'bossCollapse') {
            frameHeight = this._effectDuration;
        }
        this.setFrame(0, 0, this.bitmap.width, frameHeight);
    };

    updatePosition() {
        super.updatePosition();
        this.x += this._shake;
    };

    updateStateSprite() {
        this._stateIconSprite.y = -Math.round((this.bitmap.height + 40) * 0.9);
        if (this._stateIconSprite.y < 20 - this.y) {
            this._stateIconSprite.y = 20 - this.y;
        }
    };

    initVisibility() {
        this._appeared = this._enemy.isAlive();
        if (!this._appeared) {
            this.opacity = 0;
        }
    };

    setupEffect() {
        if (this._appeared && this._enemy.isEffectRequested()) {
            this.startEffect(this._enemy.effectType());
            this._enemy.clearEffect();
        }
        if (!this._appeared && this._enemy.isAlive()) {
            this.startEffect('appear');
        } else if (this._appeared && this._enemy.isHidden()) {
            this.startEffect('disappear');
        }
    };

    startEffect(effectType) {
        this._effectType = effectType;
        switch (this._effectType) {
            case 'appear':
                this.startAppear();
                break;
            case 'disappear':
                this.startDisappear();
                break;
            case 'whiten':
                this.startWhiten();
                break;
            case 'blink':
                this.startBlink();
                break;
            case 'collapse':
                this.startCollapse();
                break;
            case 'bossCollapse':
                this.startBossCollapse();
                break;
            case 'instantCollapse':
                this.startInstantCollapse();
                break;
        }
        this.revertToNormal();
    };

    startAppear() {
        this._effectDuration = 16;
        this._appeared = true;
    };

    startDisappear() {
        this._effectDuration = 32;
        this._appeared = false;
    };

    startWhiten() {
        this._effectDuration = 16;
    };

    startBlink() {
        this._effectDuration = 20;
    };

    startCollapse() {
        this._effectDuration = 32;
        this._appeared = false;
    };

    startBossCollapse() {
        this._effectDuration = this.bitmap.height;
        this._appeared = false;
    };

    startInstantCollapse() {
        this._effectDuration = 16;
        this._appeared = false;
    };

    updateEffect() {
        this.setupEffect();
        if (this._effectDuration > 0) {
            this._effectDuration--;
            switch (this._effectType) {
                case 'whiten':
                    this.updateWhiten();
                    break;
                case 'blink':
                    this.updateBlink();
                    break;
                case 'appear':
                    this.updateAppear();
                    break;
                case 'disappear':
                    this.updateDisappear();
                    break;
                case 'collapse':
                    this.updateCollapse();
                    break;
                case 'bossCollapse':
                    this.updateBossCollapse();
                    break;
                case 'instantCollapse':
                    this.updateInstantCollapse();
                    break;
            }
            if (this._effectDuration === 0) {
                this._effectType = null;
            }
        }
    };

    isEffecting() {
        return this._effectType !== null;
    };

    revertToNormal() {
        this._shake = 0;
        this.blendMode = 0;
        this.opacity = 255;
        this.setBlendColor([0, 0, 0, 0]);
    };

    updateWhiten() {
        const alpha = 128 - (16 - this._effectDuration) * 10;
        this.setBlendColor([255, 255, 255, alpha]);
    };

    updateBlink() {
        this.opacity = (this._effectDuration % 10 < 5) ? 255 : 0;
    };

    updateAppear() {
        this.opacity = (16 - this._effectDuration) * 16;
    };

    updateDisappear() {
        this.opacity = 256 - (32 - this._effectDuration) * 10;
    };

    updateCollapse() {
        this.blendMode = Graphics.BLEND_ADD;
        this.setBlendColor([255, 128, 128, 128]);
        this.opacity *= this._effectDuration / (this._effectDuration + 1);
    };

    updateBossCollapse() {
        this._shake = this._effectDuration % 2 * 4 - 2;
        this.blendMode = Graphics.BLEND_ADD;
        this.opacity *= this._effectDuration / (this._effectDuration + 1);
        this.setBlendColor([255, 255, 255, 255 - this.opacity]);
        if (this._effectDuration % 20 === 19) {
            SoundManager.playBossCollapse2();
        }
    };

    updateInstantCollapse() {
        this.opacity = 0;
    };

    damageOffsetX() {
        return 0;
    };

    damageOffsetY() {
        return -8;
    };
};

//-----------------------------------------------------------------------------

// Sprite_Animation
//
// The sprite for displaying an animation.
var Sprite_Animation = class extends Sprite {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    static _checker1 = {};
    static _checker2 = {};

    initialize() {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize();
        this._reduceArtifacts = true;
        this.initMembers();
    };

    initMembers() {
        this._target = null;
        this._animation = null;
        this._mirror = false;
        this._delay = 0;
        this._rate = 4;
        this._duration = 0;
        this._flashColor = [0, 0, 0, 0];
        this._flashDuration = 0;
        this._screenFlashDuration = 0;
        this._hidingDuration = 0;
        this._bitmap1 = null;
        this._bitmap2 = null;
        this._cellSprites = [];
        this._screenFlashSprite = null;
        this._duplicated = false;
        this.z = 8;
    };

    setup(target, animation, mirror, delay) {
        this._target = target;
        this._animation = animation;
        this._mirror = mirror;
        this._delay = delay;
        if (this._animation) {
            this.remove();
            this.setupRate();
            this.setupDuration();
            this.loadBitmaps();
            this.createSprites();
        }
    };

    remove() {
        if (this.parent && this.parent.removeChild(this)) {
            this._target.setBlendColor([0, 0, 0, 0]);
            this._target.show();
        }
    };

    setupRate() {
        this._rate = 4;
    };

    setupDuration() {
        this._duration = this._animation.frames.length * this._rate + 1;
    };

    update() {
        super.update();
        this.updateMain();
        this.updateFlash();
        this.updateScreenFlash();
        this.updateHiding();
        Sprite_Animation._checker1 = {};
        Sprite_Animation._checker2 = {};
    };

    updateFlash() {
        if (this._flashDuration > 0) {
            const d = this._flashDuration--;
            this._flashColor[3] *= (d - 1) / d;
            this._target.setBlendColor(this._flashColor);
        }
    };

    updateScreenFlash() {
        if (this._screenFlashDuration > 0) {
            const d = this._screenFlashDuration--;
            if (this._screenFlashSprite) {
                this._screenFlashSprite.x = -this.absoluteX();
                this._screenFlashSprite.y = -this.absoluteY();
                this._screenFlashSprite.opacity *= (d - 1) / d;
                this._screenFlashSprite.visible = (this._screenFlashDuration > 0);
            }
        }
    };

    absoluteX() {
        let x = 0;
        let object = this;
        while (object) {
            x += object.x;
            object = object.parent;
        }
        return x;
    };

    absoluteY() {
        let y = 0;
        let object = this;
        while (object) {
            y += object.y;
            object = object.parent;
        }
        return y;
    };

    updateHiding() {
        if (this._hidingDuration > 0) {
            this._hidingDuration--;
            if (this._hidingDuration === 0) {
                this._target.show();
            }
        }
    };

    isPlaying() {
        return this._duration > 0;
    };

    loadBitmaps() {
        const name1 = this._animation.animation1Name;
        const name2 = this._animation.animation2Name;
        const hue1 = this._animation.animation1Hue;
        const hue2 = this._animation.animation2Hue;
        this._bitmap1 = ImageManager.loadAnimation(name1, hue1);
        this._bitmap2 = ImageManager.loadAnimation(name2, hue2);
    };

    isReady() {
        return this._bitmap1 && this._bitmap1.isReady() && this._bitmap2 && this._bitmap2.isReady();
    };

    createSprites() {
        if (!Sprite_Animation._checker2[this._animation]) {
            this.createCellSprites();
            if (this._animation.position === 3) {
                Sprite_Animation._checker2[this._animation] = true;
            }
            this.createScreenFlashSprite();
        }
        if (Sprite_Animation._checker1[this._animation]) {
            this._duplicated = true;
        } else {
            this._duplicated = false;
            if (this._animation.position === 3) {
                Sprite_Animation._checker1[this._animation] = true;
            }
        }
    };

    createCellSprites() {
        this._cellSprites = [];
        for (let i = 0; i < 16; i++) {
            const sprite = new Sprite();
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;
            this._cellSprites.push(sprite);
            this.addChild(sprite);
        }
    };

    createScreenFlashSprite() {
        this._screenFlashSprite = new ScreenSprite();
        this.addChild(this._screenFlashSprite);
    };

    updateMain() {
        if (this.isPlaying() && this.isReady()) {
            if (this._delay > 0) {
                this._delay--;
            } else {
                this._duration--;
                this.updatePosition();
                if (this._duration % this._rate === 0) {
                    this.updateFrame();
                }
            }
        }
    };

    updatePosition() {
        if (this._animation.position === 3) {
            this.x = this.parent.width / 2;
            this.y = this.parent.height / 2;
        } else {
            const parent = this._target.parent;
            const grandparent = parent ? parent.parent : null;
            this.x = this._target.x;
            this.y = this._target.y;
            if (this.parent === grandparent) {
                this.x += parent.x;
                this.y += parent.y;
            }
            if (this._animation.position === 0) {
                this.y -= this._target.height;
            } else if (this._animation.position === 1) {
                this.y -= this._target.height / 2;
            }
        }
    };

    updateFrame() {
        if (this._duration > 0) {
            const frameIndex = this.currentFrameIndex();
            this.updateAllCellSprites(this._animation.frames[frameIndex]);
            for (let timing of this._animation.timings) {
                if (timing.frame === frameIndex) {
                    this.processTimingData(timing);
                }
            }
        }
    };

    currentFrameIndex() {
        return (this._animation.frames.length -
            Math.floor((this._duration + this._rate - 1) / this._rate));
    };

    updateAllCellSprites(frame) {
        for (let i = 0; i < this._cellSprites.length; i++) {
            const sprite = this._cellSprites[i];
            if (i < frame.length) {
                this.updateCellSprite(sprite, frame[i]);
            } else {
                sprite.visible = false;
            }
        }
    };

    updateCellSprite(sprite, cell) {
        const pattern = cell[0];
        if (pattern >= 0) {
            const sx = pattern % 5 * 192;
            const sy = Math.floor(pattern % 100 / 5) * 192;
            const mirror = this._mirror;
            sprite.bitmap = pattern < 100 ? this._bitmap1 : this._bitmap2;
            sprite.setFrame(sx, sy, 192, 192);
            sprite.x = cell[1];
            sprite.y = cell[2];
            sprite.rotation = cell[4] * Math.PI / 180;
            sprite.scale.x = cell[3] / 100;

            if (cell[5]) {
                sprite.scale.x *= -1;
            }
            if (mirror) {
                sprite.x *= -1;
                sprite.rotation *= -1;
                sprite.scale.x *= -1;
            }

            sprite.scale.y = cell[3] / 100;
            sprite.opacity = cell[6];
            sprite.blendMode = cell[7];
            sprite.visible = true;
        } else {
            sprite.visible = false;
        }
    };

    processTimingData(timing) {
        const duration = timing.flashDuration * this._rate;
        switch (timing.flashScope) {
            case 1:
                this.startFlash(timing.flashColor, duration);
                break;
            case 2:
                this.startScreenFlash(timing.flashColor, duration);
                break;
            case 3:
                this.startHiding(duration);
                break;
        }
        if (!this._duplicated && timing.se) {
            AudioManager.playSe(timing.se);
        }
    };

    startFlash(color, duration) {
        this._flashColor = color.clone();
        this._flashDuration = duration;
    };

    startScreenFlash(color, duration) {
        this._screenFlashDuration = duration;
        if (this._screenFlashSprite) {
            this._screenFlashSprite.setColor(color[0], color[1], color[2]);
            this._screenFlashSprite.opacity = color[3];
        }
    };

    startHiding(duration) {
        this._hidingDuration = duration;
        this._target.hide();
    };
};

//-----------------------------------------------------------------------------

// Sprite_Damage
//
// The sprite for displaying a popup damage.
var Sprite_Damage = class extends Sprite {
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
        this._duration = 90;
        this._flashColor = [0, 0, 0, 0];
        this._flashDuration = 0;
        this._damageBitmap = ImageManager.loadSystem('Damage');
    };

    setup(target) {
        const result = target.result();
        if (result.missed || result.evaded) {
            this.createMiss();
        } else if (result.hpAffected) {
            this.createDigits(0, result.hpDamage);
        } else if (target.isAlive() && result.mpDamage !== 0) {
            this.createDigits(2, result.mpDamage);
        }
        if (result.critical) {
            this.setupCriticalEffect();
        }
    };

    setupCriticalEffect() {
        this._flashColor = [255, 0, 0, 160];
        this._flashDuration = 60;
    };

    digitWidth() {
        return this._damageBitmap ? this._damageBitmap.width / 10 : 0;
    };

    digitHeight() {
        return this._damageBitmap ? this._damageBitmap.height / 5 : 0;
    };

    createMiss() {
        const w = this.digitWidth();
        const h = this.digitHeight();
        const sprite = this.createChildSprite();
        sprite.setFrame(0, 4 * h, 4 * w, h);
        sprite.dy = 0;
    };

    createDigits(baseRow, value) {
        const string = Math.abs(value).toString();
        const row = baseRow + (value < 0 ? 1 : 0);
        const w = this.digitWidth();
        const h = this.digitHeight();
        for (let i = 0; i < string.length; i++) {
            const sprite = this.createChildSprite();
            const n = Number(string[i]);
            sprite.setFrame(n * w, row * h, w, h);
            sprite.x = (i - (string.length - 1) / 2) * w;
            sprite.dy = -i;
        }
    };

    createChildSprite() {
        const sprite = new Sprite();
        sprite.bitmap = this._damageBitmap;
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 1;
        sprite.y = -40;
        sprite.ry = sprite.y;
        this.addChild(sprite);
        return sprite;
    };

    update() {
        super.update();
        if (this._duration > 0) {
            this._duration--;
            for (let children of this.children) {
                this.updateChild(children);
            }
        }
        this.updateFlash();
        this.updateOpacity();
    };

    updateChild(sprite) {
        sprite.dy += 0.5;
        sprite.ry += sprite.dy;
        if (sprite.ry >= 0) {
            sprite.ry = 0;
            sprite.dy *= -0.6;
        }
        sprite.y = Math.round(sprite.ry);
        sprite.setBlendColor(this._flashColor);
    };

    updateFlash() {
        if (this._flashDuration > 0) {
            const d = this._flashDuration--;
            this._flashColor[3] *= (d - 1) / d;
        }
    };

    updateOpacity() {
        if (this._duration < 10) {
            this.opacity = 255 * this._duration / 10;
        }
    };

    isPlaying() {
        return this._duration > 0;
    };
};

//-----------------------------------------------------------------------------

// Sprite_StateIcon
//
// The sprite for displaying state icons.
var Sprite_StateIcon = class extends Sprite {
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
        this.initMembers();
        this.loadBitmap();
    };

    static _iconWidth = 32;
    static _iconHeight = 32;

    initMembers() {
        this._battler = null;
        this._iconIndex = 0;
        this._animationCount = 0;
        this._animationIndex = 0;
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
    };

    loadBitmap() {
        this.bitmap = ImageManager.loadSystem('IconSet_large');
        this.setFrame(0, 0, 0, 0);
    };

    setup(battler) {
        this._battler = battler;
    };

    update() {
        super.update();
        this._animationCount++;
        if (this._animationCount >= this.animationWait()) {
            this.updateIcon();
            this.updateFrame();
            this._animationCount = 0;
        }
    };

    animationWait() {
        return 40;
    };

    updateIcon() {
        let icons = [];
        if (this._battler && this._battler.isAlive()) {
            icons = this._battler.allIcons();
        }
        if (icons.length > 0) {
            this._animationIndex++;
            if (this._animationIndex >= icons.length) {
                this._animationIndex = 0;
            }
            this._iconIndex = icons[this._animationIndex];
        } else {
            this._animationIndex = 0;
            this._iconIndex = 0;
        }
    };

    updateFrame() {
        const pw = Sprite_StateIcon._iconWidth;
        const ph = Sprite_StateIcon._iconHeight;
        const sx = this._iconIndex % 16 * pw;
        const sy = Math.floor(this._iconIndex / 16) * ph;
        this.setFrame(sx, sy, pw, ph);
    };
};

//-----------------------------------------------------------------------------

// Sprite_StateOverlay
//
// The sprite for displaying an overlay image for a state.
var Sprite_StateOverlay = class extends Sprite_Base {
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
        this.initMembers();
        this.loadBitmap();
    };

    initMembers() {
        this._battler = null;
        this._overlayIndex = 0;
        this._animationCount = 0;
        this._pattern = 0;
        this.anchor.x = 0.5;
        this.anchor.y = 1;
    };

    loadBitmap() {
        this.bitmap = ImageManager.loadSystem('States');
        this.setFrame(0, 0, 0, 0);
    };

    setup(battler) {
        this._battler = battler;
    };

    update() {
        super.update();
        this._animationCount++;
        if (this._animationCount >= this.animationWait()) {
            this.updatePattern();
            this.updateFrame();
            this._animationCount = 0;
        }
    };

    animationWait() {
        return 8;
    };

    updatePattern() {
        this._pattern++;
        this._pattern %= 8;
        if (this._battler) {
            this._overlayIndex = this._battler.stateOverlayIndex();
        }
    };

    updateFrame() {
        if (this._overlayIndex > 0) {
            const w = 96;
            const h = 96;
            const sx = this._pattern * w;
            const sy = (this._overlayIndex - 1) * h;
            this.setFrame(sx, sy, w, h);
        } else {
            this.setFrame(0, 0, 0, 0);
        }
    };
};

//-----------------------------------------------------------------------------

// Sprite_Weapon
//
// The sprite for displaying a weapon image for attacking.
var Sprite_Weapon = class extends Sprite_Base {
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
        this.initMembers();
    };

    initMembers() {
        this._weaponImageId = 0;
        this._animationCount = 0;
        this._pattern = 0;
        this.anchor.x = 0.5;
        this.anchor.y = 1;
        this.x = -16;
    };

    setup(weaponImageId) {
        this._weaponImageId = weaponImageId;
        this._animationCount = 0;
        this._pattern = 0;
        this.loadBitmap();
        this.updateFrame();
    };

    update() {
        super.update();
        this._animationCount++;
        if (this._animationCount >= this.animationWait()) {
            this.updatePattern();
            this.updateFrame();
            this._animationCount = 0;
        }
    };

    animationWait() {
        return 12;
    };

    updatePattern() {
        this._pattern++;
        if (this._pattern >= 3) {
            this._weaponImageId = 0;
        }
    };

    loadBitmap() {
        const pageId = Math.floor((this._weaponImageId - 1) / 12) + 1;
        if (pageId >= 1) {
            this.bitmap = ImageManager.loadSystem('Weapons' + pageId);
        } else {
            this.bitmap = ImageManager.loadSystem('');
        }
    };

    updateFrame() {
        if (this._weaponImageId > 0) {
            const index = (this._weaponImageId - 1) % 12;
            const w = 96;
            const h = 64;
            const sx = (Math.floor(index / 6) * 3 + this._pattern) * w;
            const sy = Math.floor(index % 6) * h;
            this.setFrame(sx, sy, w, h);
        } else {
            this.setFrame(0, 0, 0, 0);
        }
    };

    isPlaying() {
        return this._weaponImageId > 0;
    };
};

//-----------------------------------------------------------------------------

// Sprite_Balloon
//
// The sprite for displaying a balloon icon.
var Sprite_Balloon = class extends Sprite_Base {
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
        this.initMembers();
        this.loadBitmap();
    };

    initMembers() {
        this._balloonId = 0;
        this._duration = 0;
        this.anchor.x = 0.5;
        this.anchor.y = 1;
        this.z = 7;
    };

    loadBitmap() {
        this.bitmap = ImageManager.loadSystem('Balloon');
        this.setFrame(0, 0, 0, 0);
    };

    setup(balloonId) {
        this._balloonId = balloonId;
        this._duration = 8 * this.speed() + this.waitTime();
    };

    update() {
        super.update();
        if (this._duration > 0) {
            this._duration--;
            if (this._duration > 0) {
                this.updateFrame();
            }
        }
    };

    updateFrame() {
        const w = 48;
        const h = 48;
        const sx = this.frameIndex() * w;
        const sy = (this._balloonId - 1) * h;
        this.setFrame(sx, sy, w, h);
    };

    speed() {
        return 8;
    };

    waitTime() {
        return 12;
    };

    frameIndex() {
        const index = (this._duration - this.waitTime()) / this.speed();
        return 7 - Math.max(Math.floor(index), 0);
    };

    isPlaying() {
        return this._duration > 0;
    };
};

//-----------------------------------------------------------------------------

// Sprite_Picture
//
// The sprite for displaying a picture.
class Sprite_Picture extends Sprite {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize(pictureId) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize();
        this._pictureId = pictureId;
        this._pictureName = '';
        this._isPicture = true;
        this.update();
    };

    picture() {
        return $gameScreen.picture(this._pictureId);
    };

    update() {
        super.update();
        this.updateBitmap();
        if (this.visible) {
            this.updateOrigin();
            this.updatePosition();
            this.updateScale();
            this.updateTone();
            this.updateOther();
        }
    };

    updateBitmap() {
        const picture = this.picture();
        if (picture) {
            const pictureName = picture.name();
            if (this._pictureName !== pictureName) {
                this._pictureName = pictureName;
                this.loadBitmap();
            }
            this.visible = true;
        } else {
            this._pictureName = '';
            this.bitmap = null;
            this.visible = false;
        }
    };

    updateOrigin() {
        const picture = this.picture();
        if (picture.origin() === 0) {
            this.anchor.x = 0;
            this.anchor.y = 0;
        } else {
            this.anchor.x = 0.5;
            this.anchor.y = 0.5;
        }
    };

    updatePosition() {
        const picture = this.picture();
        this.x = Math.floor(picture.x());
        this.y = Math.floor(picture.y());
    };

    updateScale() {
        const picture = this.picture();
        this.scale.x = picture.scaleX() / 100;
        this.scale.y = picture.scaleY() / 100;
    };

    updateTone() {
        const picture = this.picture();
        if (picture.tone()) {
            this.setColorTone(picture.tone());
        } else {
            this.setColorTone([0, 0, 0, 0]);
        }
    };

    updateOther() {
        const picture = this.picture();
        this.opacity = picture.opacity();
        this.blendMode = picture.blendMode();
        this.rotation = picture.angle() * Math.PI / 180;
    };

    loadBitmap() {
        this.bitmap = ImageManager.loadPicture(this._pictureName);
    };
};

//-----------------------------------------------------------------------------

// Sprite_Timer
//
// The sprite for displaying the timer.
class Sprite_Timer extends Sprite {
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
        this._seconds = 0;
        this.createBitmap();
        this.update();
    };

    createBitmap() {
        this.bitmap = new Bitmap(96, 48);
        this.bitmap.fontSize = 32;
    };

    update() {
        super.update();
        this.updateBitmap();
        this.updatePosition();
        this.updateVisibility();
    };

    updateBitmap() {
        if (this._seconds !== $gameTimer.seconds()) {
            this._seconds = $gameTimer.seconds();
            this.redraw();
        }
    };

    redraw() {
        const text = this.timerText();
        const width = this.bitmap.width;
        const height = this.bitmap.height;
        this.bitmap.clear();
        this.bitmap.drawText(text, 0, 0, width, height, 'center');
    };

    timerText() {
        const min = Math.floor(this._seconds / 60) % 60;
        const sec = this._seconds % 60;
        return min.padZero(2) + ':' + sec.padZero(2);
    };

    updatePosition() {
        this.x = Graphics.width - this.bitmap.width;
        this.y = 0;
    };

    updateVisibility() {
        this.visible = $gameTimer.isWorking();
    };
};

//-----------------------------------------------------------------------------

// Sprite_Destination
//
// The sprite for displaying the destination place of the touch input.
class Sprite_Destination extends Sprite {
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
        this.createBitmap();
        this._frameCount = 0;
    };

    update() {
        super.update();
        if ($gameTemp.isDestinationValid()) {
            this.updatePosition();
            this.updateAnimation();
            this.visible = true;
        } else {
            this._frameCount = 0;
            this.visible = false;
        }
    };

    createBitmap() {
        const tileWidth = $gameMap.tileWidth();
        const tileHeight = $gameMap.tileHeight();
        this.bitmap = new Bitmap(tileWidth, tileHeight);
        this.bitmap.fillAll('white');
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.blendMode = Graphics.BLEND_ADD;
    };

    updatePosition() {
        const tileWidth = $gameMap.tileWidth();
        const tileHeight = $gameMap.tileHeight();
        const x = $gameTemp.destinationX();
        const y = $gameTemp.destinationY();
        this.x = ($gameMap.adjustX(x) + 0.5) * tileWidth;
        this.y = ($gameMap.adjustY(y) + 0.5) * tileHeight;
    };

    updateAnimation() {
        this._frameCount++;
        this._frameCount %= 20;
        this.opacity = (20 - this._frameCount) * 6;
        this.scale.x = 1 + this._frameCount / 20;
        this.scale.y = this.scale.x;
    };
};

//-----------------------------------------------------------------------------

// Spriteset_Base
//
// The superclass of Spriteset_Map and Spriteset_Battle.
class Spriteset_Base extends Sprite {
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
        this.setFrame(0, 0, Graphics.width, Graphics.height);
        this._tone = [0, 0, 0, 0];
        this.opaque = true;
        this.createLowerLayer();
        this.createToneChanger();
        this.createUpperLayer();
        this.update();
    };

    createLowerLayer() {
        this.createBaseSprite();
    };

    createUpperLayer() {
        this.createPictures();
        this.createTimer();
        this.createScreenSprites();
    };

    update() {
        super.update();
        this.updateScreenSprites();
        this.updateToneChanger();
        this.updatePosition();
    };

    createBaseSprite() {
        this._baseSprite = new Sprite();
        this._baseSprite.setFrame(0, 0, this.width, this.height);
        this._blackScreen = new ScreenSprite();
        this._blackScreen.opacity = 255;
        this.addChild(this._baseSprite);
        this._baseSprite.addChild(this._blackScreen);
    };

    createToneChanger() {
        if (Graphics.isWebGL()) {
            this.createWebGLToneChanger();
        } else {
            this.createCanvasToneChanger();
        }
    };

    createWebGLToneChanger() {
        const margin = 48;
        const width = Graphics.width + margin * 2;
        const height = Graphics.height + margin * 2;
        this._toneFilter = new ToneFilter();
        this._baseSprite.filters = [this._toneFilter];
        this._baseSprite.filterArea = new Rectangle(-margin, -margin, width, height);
    };

    createCanvasToneChanger() {
        this._toneSprite = new ToneSprite();
        this.addChild(this._toneSprite);
    };

    createPictures() {
        const width = Graphics.boxWidth;
        const height = Graphics.boxHeight;
        const x = (Graphics.width - width) / 2;
        const y = (Graphics.height - height) / 2;
        this._pictureContainer = new Sprite();
        this._pictureContainer.setFrame(x, y, width, height);
        for (let i = 1; i <= $gameScreen.maxPictures(); i++) {
            this._pictureContainer.addChild(new Sprite_Picture(i));
        }
        this.addChild(this._pictureContainer);
    };

    createTimer() {
        this._timerSprite = new Sprite_Timer();
        this.addChild(this._timerSprite);
    };

    createScreenSprites() {
        this._flashSprite = new ScreenSprite();
        this._fadeSprite = new ScreenSprite();
        this.addChild(this._flashSprite);
        this.addChild(this._fadeSprite);
    };

    updateScreenSprites() {
        const color = $gameScreen.flashColor();
        this._flashSprite.setColor(color[0], color[1], color[2]);
        this._flashSprite.opacity = color[3];
        this._fadeSprite.opacity = 255 - $gameScreen.brightness();
    };

    updateToneChanger() {
        const tone = $gameScreen.tone();
        if (!this._tone.equals(tone)) {
            this._tone = tone.clone();
            Graphics.isWebGL()
                ? this.updateWebGLToneChanger()
                : this.updateCanvasToneChanger();
        }
    };

    updateWebGLToneChanger() {
        const tone = this._tone;
        this._toneFilter.reset();
        this._toneFilter.adjustTone(tone[0], tone[1], tone[2]);
        this._toneFilter.adjustSaturation(-tone[3]);
    };

    updateCanvasToneChanger() {
        const tone = this._tone;
        this._toneSprite.setTone(tone[0], tone[1], tone[2], tone[3]);
    };

    updatePosition() {
        const screen = $gameScreen;
        const scale = screen.zoomScale();
        this.scale.x = scale;
        this.scale.y = scale;
        this.x = Math.round(-screen.zoomX() * (scale - 1));
        this.y = Math.round(-screen.zoomY() * (scale - 1));
        this.x += Math.round(screen.shake());
    };
};

//-----------------------------------------------------------------------------

// Spriteset_Map
//
// The set of sprites on the map screen.
var Spriteset_Map = class extends Spriteset_Base {
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

    createLowerLayer() {
        super.createLowerLayer();
        this.createParallax();
        this.createTilemap();
        this.createCharacters();
        this.createShadow();
        this.createDestination();
        this.createWeather();
    };

    update() {
        super.update();
        this.updateTileset();
        this.updateParallax();
        this.updateTilemap();
        this.updateShadow();
        this.updateWeather();
    };

    hideCharacters() {
        for (let sprite of this._characterSprites) {
            if (!sprite.isTile()) sprite.hide();
        }
    };

    createParallax() {
        this._parallax = new TilingSprite();
        this._parallax.move(0, 0, Graphics.width, Graphics.height);
        this._baseSprite.addChild(this._parallax);
    };

    createTilemap() {
        if (Graphics.isWebGL()) {
            this._tilemap = new ShaderTilemap();
        } else {
            this._tilemap = new Tilemap();
        }
        this._tilemap.tileWidth = $gameMap.tileWidth();
        this._tilemap.tileHeight = $gameMap.tileHeight();
        this._tilemap.setData($gameMap.width(), $gameMap.height(), $gameMap.data());
        this._tilemap.horizontalWrap = $gameMap.isLoopHorizontal();
        this._tilemap.verticalWrap = $gameMap.isLoopVertical();
        this.loadTileset();
        this._baseSprite.addChild(this._tilemap);
    };

    loadTileset() {
        this._tileset = $gameMap.tileset();
        if (this._tileset) {
            const tilesetNames = this._tileset.tilesetNames;
            for (let i = 0; i < tilesetNames.length; i++) {
                this._tilemap.bitmaps[i] = ImageManager.loadTileset(tilesetNames[i]);
            }
            const newTilesetFlags = $gameMap.tilesetFlags();
            this._tilemap.refreshTileset();
            if (!this._tilemap.flags.equals(newTilesetFlags)) {
                this._tilemap.refresh();
            }
            this._tilemap.flags = newTilesetFlags;
        }
    };

    createCharacters() {
        this._characterSprites = [];
        for (let event of $gameMap.events()) {
            this._characterSprites.push(new Sprite_Character(event));
        }
        for (let vehicle of $gameMap.vehicles()) {
            this._characterSprites.push(new Sprite_Character(vehicle));
        }
        $gamePlayer.followers().reverseEach(follower => {
            this._characterSprites.push(new Sprite_Character(follower));
        });
        this._characterSprites.push(new Sprite_Character($gamePlayer));
        for (let characterSprites of this._characterSprites) {
            this._tilemap.addChild(characterSprites);
        }
    };

    createShadow() {
        this._shadowSprite = new Sprite();
        this._shadowSprite.bitmap = ImageManager.loadSystem('Shadow1');
        this._shadowSprite.anchor.x = 0.5;
        this._shadowSprite.anchor.y = 1;
        this._shadowSprite.z = 6;
        this._tilemap.addChild(this._shadowSprite);
    };

    createDestination() {
        this._destinationSprite = new Sprite_Destination();
        this._destinationSprite.z = 9;
        this._tilemap.addChild(this._destinationSprite);
    };

    createWeather() {
        this._weather = new Weather();
        this.addChild(this._weather);
    };

    updateTileset() {
        if (this._tileset !== $gameMap.tileset()) {
            this.loadTileset();
        }
    };

    /*
     * Simple fix for canvas parallax issue, destroy old parallax and readd to  the tree.
     */
    _canvasReAddParallax() {
        const index = this._baseSprite.children.indexOf(this._parallax);
        this._baseSprite.removeChild(this._parallax);
        this._parallax = new TilingSprite();
        this._parallax.move(0, 0, Graphics.width, Graphics.height);
        this._parallax.bitmap = ImageManager.loadParallax(this._parallaxName);
        this._baseSprite.addChildAt(this._parallax, index);
    };

    updateParallax() {
        if (this._parallaxName !== $gameMap.parallaxName()) {
            this._parallaxName = $gameMap.parallaxName();

            if (this._parallax.bitmap && Graphics.isWebGL() != true) {
                this._canvasReAddParallax();
            } else {
                this._parallax.bitmap = ImageManager.loadParallax(this._parallaxName);
            }
        }
        if (this._parallax.bitmap) {
            this._parallax.origin.x = $gameMap.parallaxOx();
            this._parallax.origin.y = $gameMap.parallaxOy();
        }
    };

    updateTilemap() {
        this._tilemap.origin.x = $gameMap.displayX() * $gameMap.tileWidth();
        this._tilemap.origin.y = $gameMap.displayY() * $gameMap.tileHeight();
    };

    updateShadow() {
        const airship = $gameMap.airship();
        this._shadowSprite.x = airship.shadowX();
        this._shadowSprite.y = airship.shadowY();
        this._shadowSprite.opacity = airship.shadowOpacity();
    };

    updateWeather() {
        this._weather.type = $gameScreen.weatherType();
        this._weather.power = $gameScreen.weatherPower();
        this._weather.origin.x = $gameMap.displayX() * $gameMap.tileWidth();
        this._weather.origin.y = $gameMap.displayY() * $gameMap.tileHeight();
    };
};

//-----------------------------------------------------------------------------

// Spriteset_Battle
//
// The set of sprites on the battle screen.
var Spriteset_Battle = class extends Spriteset_Base {
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
        this._battlebackLocated = false;
    };

    createLowerLayer() {
        super.createLowerLayer();
        this.createBackground();
        this.createBattleField();
        this.createBattleback();
        this.createEnemies();
        this.createActors();
    };

    createBackground() {
        this._backgroundSprite = new Sprite();
        this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
        this._baseSprite.addChild(this._backgroundSprite);
    };

    update() {
        super.update();
        this.updateActors();
        this.updateBattleback();
    };

    createBattleField() {
        const width = Graphics.boxWidth;
        const height = Graphics.boxHeight;
        const x = (Graphics.width - width) / 2;
        const y = (Graphics.height - height) / 2;
        this._battleField = new Sprite();
        this._battleField.setFrame(x, y, width, height);
        this._battleField.x = x;
        this._battleField.y = y;
        this._baseSprite.addChild(this._battleField);
    };

    createBattleback() {
        const margin = 32;
        const x = -this._battleField.x - margin;
        const y = -this._battleField.y - margin;
        const width = Graphics.width + margin * 2;
        const height = Graphics.height + margin * 2;
        this._back1Sprite = new TilingSprite();
        this._back2Sprite = new TilingSprite();
        this._back1Sprite.bitmap = this.battleback1Bitmap();
        this._back2Sprite.bitmap = this.battleback2Bitmap();
        this._back1Sprite.move(x, y, width, height);
        this._back2Sprite.move(x, y, width, height);
        this._battleField.addChild(this._back1Sprite);
        this._battleField.addChild(this._back2Sprite);
    };

    updateBattleback() {
        if (!this._battlebackLocated) {
            this.locateBattleback();
            this._battlebackLocated = true;
        }
    };

    locateBattleback() {
        const width = this._battleField.width;
        const height = this._battleField.height;
        const sprite1 = this._back1Sprite;
        const sprite2 = this._back2Sprite;
        sprite1.origin.x = sprite1.x + (sprite1.bitmap.width - width) / 2;
        sprite2.origin.x = sprite1.y + (sprite2.bitmap.width - width) / 2;
        if ($gameSystem.isSideView()) {
            sprite1.origin.y = sprite1.x + sprite1.bitmap.height - height;
            sprite2.origin.y = sprite1.y + sprite2.bitmap.height - height;
        }
    };

    battleback1Bitmap() {
        return ImageManager.loadBattleback1(this.battleback1Name());
    };

    battleback2Bitmap() {
        return ImageManager.loadBattleback2(this.battleback2Name());
    };

    battleback1Name() {
        if (BattleManager.isBattleTest()) {
            return $dataSystem.battleback1Name;
        } else if ($gameMap.battleback1Name()) {
            return $gameMap.battleback1Name();
        } else if ($gameMap.isOverworld()) {
            return this.overworldBattleback1Name();
        } else {
            return '';
        }
    };

    battleback2Name() {
        if (BattleManager.isBattleTest()) {
            return $dataSystem.battleback2Name;
        } else if ($gameMap.battleback2Name()) {
            return $gameMap.battleback2Name();
        } else if ($gameMap.isOverworld()) {
            return this.overworldBattleback2Name();
        } else {
            return '';
        }
    };

    overworldBattleback1Name() {
        if ($gameMap.battleback1Name() === '') return '';
        if ($gamePlayer.isInVehicle()) {
            return this.shipBattleback1Name();
        } else {
            return this.normalBattleback1Name();
        }
    };

    overworldBattleback2Name() {
        if ($gameMap.battleback2Name() === '') return '';
        if ($gamePlayer.isInVehicle()) {
            return this.shipBattleback2Name();
        } else {
            return this.normalBattleback2Name();
        }
    };

    normalBattleback1Name() {
        return (this.terrainBattleback1Name(this.autotileType(1)) ||
            this.terrainBattleback1Name(this.autotileType(0)) ||
            this.defaultBattleback1Name());
    };

    normalBattleback2Name() {
        return (this.terrainBattleback2Name(this.autotileType(1)) ||
            this.terrainBattleback2Name(this.autotileType(0)) ||
            this.defaultBattleback2Name());
    };

    terrainBattleback1Name(type) {
        switch (type) {
            case 24: case 25:
                return 'Wasteland';
            case 26: case 27:
                return 'DirtField';
            case 32: case 33:
                return 'Desert';
            case 34:
                return 'Lava1';
            case 35:
                return 'Lava2';
            case 40: case 41:
                return 'Snowfield';
            case 42:
                return 'Clouds';
            case 4: case 5:
                return 'PoisonSwamp';
            default:
                return null;
        }
    };

    terrainBattleback2Name(type) {
        switch (type) {
            case 20: case 21:
                return 'Forest';
            case 22: case 30: case 38:
                return 'Cliff';
            case 24: case 25: case 26: case 27:
                return 'Wasteland';
            case 32: case 33:
                return 'Desert';
            case 34: case 35:
                return 'Lava';
            case 40: case 41:
                return 'Snowfield';
            case 42:
                return 'Clouds';
            case 4: case 5:
                return 'PoisonSwamp';
        }
    };

    defaultBattleback1Name() {
        return 'Grassland';
    };

    defaultBattleback2Name() {
        return 'Grassland';
    };

    shipBattleback1Name() {
        return 'Ship';
    };

    shipBattleback2Name() {
        return 'Ship';
    };

    autotileType(z) {
        return $gameMap.autotileType($gamePlayer.x, $gamePlayer.y, z);
    };

    createEnemies() {
        const enemies = $gameTroop.members();
        const sprites = [];
        for (let i = 0; i < enemies.length; i++) {
            sprites[i] = new Sprite_Enemy(enemies[i]);
        }
        sprites.sort(this.compareEnemySprite.bind(this));
        for (let sprite of sprites) {
            this._battleField.addChild(sprite);
        }
        this._enemySprites = sprites;
    };

    compareEnemySprite(a, b) {
        if (a.y !== b.y) {
            return a.y - b.y;
        } else {
            return b.spriteId - a.spriteId;
        }
    };

    createActors() {
        this._actorSprites = [];
        for (let i = 0; i < $gameParty.maxBattleMembers(); i++) {
            this._actorSprites[i] = new Sprite_Actor();
            this._battleField.addChild(this._actorSprites[i]);
        }
    };

    updateActors() {
        const members = $gameParty.battleMembers();
        for (let i = 0; i < this._actorSprites.length; i++) {
            this._actorSprites[i].setBattler(members[i]);
        }
    };

    battlerSprites() {
        return this._enemySprites.concat(this._actorSprites);
    };

    isAnimationPlaying() {
        return this.battlerSprites().some(sprite => sprite.isAnimationPlaying());
    };

    isEffecting() {
        return this.battlerSprites().some(sprite => sprite.isEffecting());
    };

    isAnyoneMoving() {
        return this.battlerSprites().some(sprite => sprite.isMoving());
    };

    isBusy() {
        return this.isAnimationPlaying() || this.isAnyoneMoving();
    };
};

//=============================================================================