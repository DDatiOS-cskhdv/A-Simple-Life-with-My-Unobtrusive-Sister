//=============================================================================
// rpg_windows.js v1.6.2
//=============================================================================

//=============================================================================

// Window_Base
//
// The superclass of all windows within the game.
var Window_Base = class extends Window {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize(x, y, width, height) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize();
        this.loadWindowskin();
        this.move(x, y, width, height);
        this.updatePadding();
        this.updateBackOpacity();
        this.updateTone();
        this.createContents();
        this._opening = false;
        this._closing = false;
        this._dimmerSprite = null;
    };

    static _iconWidth = 32;
    static _iconHeight = 32;
    static _faceWidth = 144;
    static _faceHeight = 144;

    lineHeight() {
        return 72;
    };

    standardFontFace() {
        if ($gameSystem.isChinese()) {
            return 'SimHei, Heiti TC, sans-serif';
        } else if ($gameSystem.isKorean()) {
            return 'Dotum, AppleGothic, sans-serif';
        } else {
            return 'GameFont, RiiTegakiFude, FOT-NewCinemaA Std D';
        }
    };

    standardFontSize() {
        return 28;
    };

    standardPadding() {
        return 18;
    };

    textPadding() {
        return 6;
    };

    standardBackOpacity() {
        return 192;
    };

    loadWindowskin() {
        this.windowskin = ImageManager.loadSystem('Window');
    };

    updatePadding() {
        this.padding = this.standardPadding();
    };

    updateBackOpacity() {
        this.backOpacity = this.standardBackOpacity();
    };

    contentsWidth() {
        return this.width - this.standardPadding() * 2;
    };

    contentsHeight() {
        return this.height - this.standardPadding() * 2;
    };

    fittingHeight(numLines) {
        return numLines * this.lineHeight() + this.standardPadding() * 2;
    };

    updateTone() {
        const tone = $gameSystem.windowTone();
        this.setTone(tone[0], tone[1], tone[2]);
    };

    createContents() {
        this.contents = new Bitmap(this.contentsWidth(), this.contentsHeight());
        this.resetFontSettings();
    };

    resetFontSettings() {
        this.contents.fontFace = this.standardFontFace();
        this.contents.fontSize = this.standardFontSize();
        this.resetTextColor();
    };

    resetTextColor() {
        this.changeTextColor(this.normalColor());
    };

    update() {
        super.update();
        this.updateTone();
        this.updateOpen();
        this.updateClose();
        this.updateBackgroundDimmer();
    };

    updateOpen() {
        if (this._opening) {
            this.openness += 32;
            if (this.isOpen()) {
                this._opening = false;
            }
        }
    };

    updateClose() {
        if (this._closing) {
            this.openness -= 32;
            if (this.isClosed()) {
                this._closing = false;
            }
        }
    };

    open() {
        if (!this.isOpen()) {
            this._opening = true;
        }
        this._closing = false;
    };

    close() {
        if (!this.isClosed()) {
            this._closing = true;
        }
        this._opening = false;
    };

    isOpening() {
        return this._opening;
    };

    isClosing() {
        return this._closing;
    };

    show() {
        this.visible = true;
    };

    hide() {
        this.visible = false;
    };

    activate() {
        this.active = true;
    };

    deactivate() {
        this.active = false;
    };

    textColor(n) {
        const px = 96 + (n % 8) * 12 + 6;
        const py = 144 + Math.floor(n / 8) * 12 + 6;
        return this.windowskin.getPixel(px, py);
    };

    normalColor() {
        return this.textColor(0);
    };

    systemColor() {
        return this.textColor(16);
    };

    crisisColor() {
        return this.textColor(17);
    };

    deathColor() {
        return this.textColor(18);
    };

    gaugeBackColor() {
        return this.textColor(19);
    };

    hpGaugeColor1() {
        return this.textColor(20);
    };

    hpGaugeColor2() {
        return this.textColor(21);
    };

    mpGaugeColor1() {
        return this.textColor(22);
    };

    mpGaugeColor2() {
        return this.textColor(23);
    };

    mpCostColor() {
        return this.textColor(23);
    };

    powerUpColor() {
        return this.textColor(24);
    };

    powerDownColor() {
        return this.textColor(25);
    };

    tpGaugeColor1() {
        return this.textColor(28);
    };

    tpGaugeColor2() {
        return this.textColor(29);
    };

    tpCostColor() {
        return this.textColor(29);
    };

    pendingColor() {
        return this.windowskin.getPixel(120, 120);
    };

    translucentOpacity() {
        return 160;
    };

    changeTextColor(color) {
        this.contents.textColor = color;
    };

    changePaintOpacity(enabled) {
        this.contents.paintOpacity = enabled ? 255 : this.translucentOpacity();
    };

    drawText(text, x, y, maxWidth, align) {
        this.contents.drawText(text, x, y, maxWidth, this.lineHeight(), align);
    };

    textWidth(text) {
        return this.contents.measureTextWidth(text);
    };

    drawTextEx(text, x, y) {
        if (text) {
            const textState = { index: 0, x: x, y: y, left: x };
            textState.text = this.convertEscapeCharacters(text);
            textState.height = this.calcTextHeight(textState, false);
            this.resetFontSettings();
            while (textState.index < textState.text.length) {
                this.processCharacter(textState);
            }
            return textState.x - x;
        } else {
            return 0;
        }
    };

    convertEscapeCharacters(text) {
        text = text.replace(/\\/g, '\x1b');
        text = text.replace(/\x1b\x1b/g, '\\');
        text = text.replace(/\x1bV\[(\d+)\]/gi, (_, num) => $gameVariables.value(parseInt(num)));
        text = text.replace(/\x1bN\[(\d+)\]/gi, (_, num) => this.actorName(parseInt(num)));
        text = text.replace(/\x1bP\[(\d+)\]/gi, (_, num) => this.partyMemberName(parseInt(num)));
        text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
        return text;
    };

    actorName(n) {
        const actor = n >= 1 ? $gameActors.actor(n) : null;
        return actor ? actor.name() : '';
    };

    partyMemberName(n) {
        const actor = n >= 1 ? $gameParty.members()[n - 1] : null;
        return actor ? actor.name() : '';
    };

    processCharacter(textState) {
        switch (textState.text[textState.index]) {
            case '\n':
                this.processNewLine(textState);
                break;
            case '\f':
                this.processNewPage(textState);
                break;
            case '\x1b':
                this.processEscapeCharacter(this.obtainEscapeCode(textState), textState);
                break;
            default:
                this.processNormalCharacter(textState);
                break;
        }
    };

    processNormalCharacter(textState) {
        const c = textState.text[textState.index++];
        const w = this.textWidth(c);
        this.contents.drawText(c, textState.x, textState.y, w * 2, textState.height);
        textState.x += w;
    };

    processNewLine(textState) {
        textState.x = textState.left;
        textState.y += textState.height;
        textState.height = this.calcTextHeight(textState, false);
        textState.index++;
    };

    processNewPage(textState) {
        textState.index++;
    };

    obtainEscapeCode(textState) {
        textState.index++;
        const regExp = /^[\$\.\|\^!><\{\}\\]|^[A-Z]+/i;
        const arr = regExp.exec(textState.text.slice(textState.index));
        if (arr) {
            textState.index += arr[0].length;
            return arr[0].toUpperCase();
        } else {
            return '';
        }
    };

    obtainEscapeParam(textState) {
        const arr = /^\[\d+\]/.exec(textState.text.slice(textState.index));
        if (arr) {
            textState.index += arr[0].length;
            return parseInt(arr[0].slice(1));
        } else {
            return '';
        }
    };

    processEscapeCharacter(code, textState) {
        switch (code) {
            case 'C':
                this.changeTextColor(this.textColor(this.obtainEscapeParam(textState)));
                break;
            case 'I':
                this.processDrawIcon(this.obtainEscapeParam(textState), textState);
                break;
            case '{':
                this.makeFontBigger();
                break;
            case '}':
                this.makeFontSmaller();
                break;
        }
    };

    processDrawIcon(iconIndex, textState) {
        this.drawIcon(iconIndex, textState.x + 2, textState.y + 2);
        textState.x += Window_Base._iconWidth + 4;
    };

    makeFontBigger() {
        if (this.contents.fontSize <= 96) {
            this.contents.fontSize += 12;
        }
    };

    makeFontSmaller() {
        if (this.contents.fontSize >= 24) {
            this.contents.fontSize -= 12;
        }
    };

    calcTextHeight(textState, all) {
        const lastFontSize = this.contents.fontSize;
        let textHeight = 0;
        const lines = textState.text.slice(textState.index).split('\n');
        const maxLines = all ? lines.length : 1;

        for (let i = 0; i < maxLines; i++) {
            let maxFontSize = this.contents.fontSize;
            const regExp = /\x1b[\{\}]/g;
            for (; ;) {
                const array = regExp.exec(lines[i]);
                if (array) {
                    if (array[0] === '\x1b{') {
                        this.makeFontBigger();
                    }
                    if (array[0] === '\x1b}') {
                        this.makeFontSmaller();
                    }
                    if (maxFontSize < this.contents.fontSize) {
                        maxFontSize = this.contents.fontSize;
                    }
                } else {
                    break;
                }
            }
            textHeight += maxFontSize + 8;
        }

        this.contents.fontSize = lastFontSize;
        return textHeight;
    };

    drawIcon(iconIndex, x, y) {
        const bitmap = ImageManager.loadSystem('IconSet');
        const pw = Window_Base._iconWidth;
        const ph = Window_Base._iconHeight;
        const sx = iconIndex % 16 * pw;
        const sy = Math.floor(iconIndex / 16) * ph;
        this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
    };

    drawFace(faceName, faceIndex, x, y, width, height) {
        width = width || Window_Base._faceWidth;
        height = height || Window_Base._faceHeight;
        const bitmap = ImageManager.loadFace(faceName);
        const pw = Window_Base._faceWidth;
        const ph = Window_Base._faceHeight;
        const sw = Math.min(width, pw);
        const sh = Math.min(height, ph);
        const dx = Math.floor(x + Math.max(width - pw, 0) / 2);
        const dy = Math.floor(y + Math.max(height - ph, 0) / 2);
        const sx = faceIndex % 4 * pw + (pw - sw) / 2;
        const sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
        this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy);
    };

    drawCharacter(characterName, characterIndex, x, y) {
        const bitmap = ImageManager.loadCharacter(characterName);
        const big = ImageManager.isBigCharacter(characterName);
        const pw = bitmap.width / (big ? 3 : 12);
        const ph = bitmap.height / (big ? 4 : 8);
        const n = characterIndex;
        const sx = (n % 4 * 3 + 1) * pw;
        const sy = (Math.floor(n / 4) * 4) * ph;
        this.contents.blt(bitmap, sx, sy, pw, ph, x - pw / 2, y - ph);
    };

    drawGauge(x, y, width, rate, color1, color2) {
        const fillW = Math.floor(width * rate);
        const gaugeY = y + this.lineHeight() - 8;
        this.contents.fillRect(x, gaugeY, width, 6, this.gaugeBackColor());
        this.contents.gradientFillRect(x, gaugeY, fillW, 6, color1, color2);
    };

    hpColor(actor) {
        if (actor.isDead()) {
            return this.deathColor();
        } else if (actor.isDying()) {
            return this.crisisColor();
        } else {
            return this.normalColor();
        }
    };

    mpColor(actor) {
        return this.normalColor();
    };

    tpColor(actor) {
        return this.normalColor();
    };

    drawActorCharacter(actor, x, y) {
        this.drawCharacter(actor.characterName(), actor.characterIndex(), x, y);
    };

    drawActorFace(actor, x, y, width, height) {
        this.drawFace(actor.faceName(), actor.faceIndex(), x, y, width, height);
    };

    drawActorName(actor, x, y, width) {
        width = width || 168;
        this.changeTextColor(this.hpColor(actor));
        this.drawText(actor.name(), x, y, width);
    };

    drawActorClass(actor, x, y, width) {
        width = width || 168;
        this.resetTextColor();
        this.drawText(actor.currentClass().name, x, y, width);
    };

    drawActorNickname(actor, x, y, width) {
        width = width || 270;
        this.resetTextColor();
        this.drawText(actor.nickname(), x, y, width);
    };

    drawActorLevel(actor, x, y) {
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.levelA, x, y, 48);
        this.resetTextColor();
        this.drawText(actor.level, x + 84, y, 36, 'right');
    };

    drawActorIcons(actor, x, y, width) {
        width = width || 144;
        const icons = actor.allIcons().slice(0, Math.floor(width / Window_Base._iconWidth));
        for (let i = 0; i < icons.length; i++) {
            this.drawIcon(icons[i], x + Window_Base._iconWidth * i, y + 2);
        }
    };

    drawCurrentAndMax(current, max, x, y, width, color1, color2) {
        const labelWidth = this.textWidth('HP');
        const valueWidth = this.textWidth('0000');
        const slashWidth = this.textWidth('/');
        const x1 = x + width - valueWidth;
        const x2 = x1 - slashWidth;
        const x3 = x2 - valueWidth;
        if (x3 >= x + labelWidth) {
            this.changeTextColor(color1);
            this.drawText(current, x3, y, valueWidth, 'right');
            this.changeTextColor(color2);
            this.drawText('/', x2, y, slashWidth, 'right');
            this.drawText(max, x1, y, valueWidth, 'right');
        } else {
            this.changeTextColor(color1);
            this.drawText(current, x1, y, valueWidth, 'right');
        }
    };

    drawActorHp(actor, x, y, width) {
        width = width || 186;
        const color1 = this.hpGaugeColor1();
        const color2 = this.hpGaugeColor2();
        this.drawGauge(x, y, width, actor.hpRate(), color1, color2);
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.hpA, x, y, 44);
        this.drawCurrentAndMax(actor.hp, actor.mhp, x, y, width,
            this.hpColor(actor), this.normalColor());
    };

    drawActorMp(actor, x, y, width) {
        width = width || 186;
        const color1 = this.mpGaugeColor1();
        const color2 = this.mpGaugeColor2();
        this.drawGauge(x, y, width, actor.mpRate(), color1, color2);
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.mpA, x, y, 44);
        this.drawCurrentAndMax(actor.mp, actor.mmp, x, y, width,
            this.mpColor(actor), this.normalColor());
    };

    drawActorTp(actor, x, y, width) {
        width = width || 96;
        const color1 = this.tpGaugeColor1();
        const color2 = this.tpGaugeColor2();
        this.drawGauge(x, y, width, actor.tpRate(), color1, color2);
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.tpA, x, y, 44);
        this.changeTextColor(this.tpColor(actor));
        this.drawText(actor.tp, x + width - 64, y, 64, 'right');
    };

    drawActorSimpleStatus(actor, x, y, width) {
        const lineHeight = this.lineHeight();
        const x2 = x + 180;
        const width2 = Math.min(200, width - 180 - this.textPadding());
        this.drawActorName(actor, x, y);
        this.drawActorLevel(actor, x, y + lineHeight * 1);
        this.drawActorIcons(actor, x, y + lineHeight * 2);
        this.drawActorClass(actor, x2, y);
        this.drawActorHp(actor, x2, y + lineHeight * 1, width2);
        this.drawActorMp(actor, x2, y + lineHeight * 2, width2);
    };

    drawItemName(item, x, y, width) {
        width = width || 312;
        if (item) {
            const iconBoxWidth = Window_Base._iconWidth + 4;
            this.resetTextColor();
            this.drawIcon(item.iconIndex, x + 2, y + 2);
            this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
        }
    };

    drawItemNameWithoutIcon(item, x, y, width) {
        width = width || 312;
        if (item) {
            const iconBoxWidth = Window_Base._iconWidth + 4;
            this.resetTextColor();
            this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
        }
    };

    drawCurrencyValue(value, unit, x, y, width) {
        const unitWidth = Math.min(80, this.textWidth(unit));
        this.resetTextColor();
        this.drawText(value, x, y, width - unitWidth - 6, 'right');
        this.changeTextColor(this.systemColor());
        this.drawText(unit, x + width - unitWidth, y, unitWidth, 'right');
    };

    paramchangeTextColor(change) {
        if (change > 0) {
            return this.powerUpColor();
        } else if (change < 0) {
            return this.powerDownColor();
        } else {
            return this.normalColor();
        }
    };

    setBackgroundType(type) {
        if (type === 0) {
            this.opacity = 255;
        } else {
            this.opacity = 0;
        }
        if (type === 1) {
            this.showBackgroundDimmer();
        } else {
            this.hideBackgroundDimmer();
        }
    };

    showBackgroundDimmer() {
        if (!this._dimmerSprite) {
            this._dimmerSprite = new Sprite();
            this._dimmerSprite.bitmap = new Bitmap(0, 0);
            this.addChildToBack(this._dimmerSprite);
        }
        const bitmap = this._dimmerSprite.bitmap;
        if (bitmap.width !== this.width || bitmap.height !== this.height) {
            this.refreshDimmerBitmap();
        }
        this._dimmerSprite.visible = true;
        this.updateBackgroundDimmer();
    };

    hideBackgroundDimmer() {
        if (this._dimmerSprite) {
            this._dimmerSprite.visible = false;
        }
    };

    updateBackgroundDimmer() {
        if (this._dimmerSprite) {
            this._dimmerSprite.opacity = this.openness;
        }
    };

    refreshDimmerBitmap() {
        if (this._dimmerSprite) {
            const bitmap = this._dimmerSprite.bitmap;
            const w = this.width;
            const h = this.height;
            const m = this.padding;
            const c1 = this.dimColor1();
            const c2 = this.dimColor2();
            bitmap.resize(w, h);
            bitmap.gradientFillRect(0, 0, w, m, c2, c1, true);
            bitmap.fillRect(0, m, w, h - m * 2, c1);
            bitmap.gradientFillRect(0, h - m, w, m, c1, c2, true);
            this._dimmerSprite.setFrame(0, 0, w, h);
        }
    };

    dimColor1() {
        return 'rgba(0, 0, 0, 0.6)';
    };

    dimColor2() {
        return 'rgba(0, 0, 0, 0)';
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

    reserveFaceImages() {
        for (const actor of $gameParty.members()) {
            ImageManager.reserveFace(actor.faceName());
        }
    };
};

//-----------------------------------------------------------------------------

// Window_Selectable
//
// The window class with cursor movement and scroll functions.
class Window_Selectable extends Window_Base {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize(x, y, width, height) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize(x, y, width, height);
        this._index = -1;
        this._cursorFixed = false;
        this._cursorAll = false;
        this._stayCount = 0;
        this._helpWindow = null;
        this._handlers = {};
        this._touching = false;
        this._scrollX = 0;
        this._scrollY = 0;
        this.deactivate();
    };

    index() {
        return this._index;
    };

    cursorFixed() {
        return this._cursorFixed;
    };

    setCursorFixed(cursorFixed) {
        this._cursorFixed = cursorFixed;
    };

    cursorAll() {
        return this._cursorAll;
    };

    setCursorAll(cursorAll) {
        this._cursorAll = cursorAll;
    };

    maxCols() {
        return 1;
    };

    maxItems() {
        return 0;
    };

    spacing() {
        return 12;
    };

    itemWidth() {
        return Math.floor((this.width - this.padding * 2 +
            this.spacing()) / this.maxCols() - this.spacing());
    };

    itemHeight() {
        return this.lineHeight();
    };

    maxRows() {
        return Math.max(Math.ceil(this.maxItems() / this.maxCols()), 1);
    };

    activate() {
        super.activate();
        this.reselect();
    };

    deactivate() {
        super.deactivate();
        this.reselect();
    };

    select(index) {
        this._index = index;
        this._stayCount = 0;
        this.ensureCursorVisible();
        this.updateCursor();
        this.callUpdateHelp();
    };

    deselect() {
        this.select(-1);
    };

    reselect() {
        this.select(this._index);
    };

    row() {
        return Math.floor(this.index() / this.maxCols());
    };

    topRow() {
        return Math.floor(this._scrollY / this.itemHeight());
    };

    maxTopRow() {
        return Math.max(0, this.maxRows() - this.maxPageRows());
    };

    setTopRow(row) {
        const scrollY = row.clamp(0, this.maxTopRow()) * this.itemHeight();
        if (this._scrollY !== scrollY) {
            this._scrollY = scrollY;
            this.refresh();
            this.updateCursor();
        }
    };

    resetScroll() {
        this.setTopRow(0);
    };

    maxPageRows() {
        const pageHeight = this.height - this.padding * 2;
        return Math.floor(pageHeight / this.itemHeight());
    };

    maxPageItems() {
        return this.maxPageRows() * this.maxCols();
    };

    isHorizontal() {
        return this.maxPageRows() === 1;
    };

    bottomRow() {
        return Math.max(0, this.topRow() + this.maxPageRows() - 1);
    };

    setBottomRow(row) {
        this.setTopRow(row - (this.maxPageRows() - 1));
    };

    topIndex() {
        return this.topRow() * this.maxCols();
    };

    itemRect(index) {
        const rect = new Rectangle();
        const maxCols = this.maxCols();
        rect.width = this.itemWidth();
        rect.height = this.itemHeight();
        rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX;
        rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY;
        return rect;
    };

    itemRectForText(index) {
        const rect = this.itemRect(index);
        rect.x += this.textPadding();
        rect.width -= this.textPadding() * 2;
        return rect;
    };

    setHelpWindow(helpWindow) {
        this._helpWindow = helpWindow;
        this.callUpdateHelp();
    };

    showHelpWindow() {
        if (this._helpWindow) {
            this._helpWindow.show();
        }
    };

    hideHelpWindow() {
        if (this._helpWindow) {
            this._helpWindow.hide();
        }
    };

    setHandler(symbol, method) {
        this._handlers[symbol] = method;
    };

    isHandled(symbol) {
        return !!this._handlers[symbol];
    };

    callHandler(symbol) {
        if (this.isHandled(symbol)) {
            this._handlers[symbol]();
        }
    };

    isOpenAndActive() {
        return this.isOpen() && this.active;
    };

    isCursorMovable() {
        return (this.isOpenAndActive() && !this._cursorFixed &&
            !this._cursorAll && this.maxItems() > 0);
    };

    cursorDown(wrap) {
        const index = this.index();
        const maxItems = this.maxItems();
        const maxCols = this.maxCols();
        if (index < maxItems - maxCols || (wrap && maxCols === 1)) {
            this.select((index + maxCols) % maxItems);
        }
    };

    cursorUp(wrap) {
        const index = this.index();
        const maxItems = this.maxItems();
        const maxCols = this.maxCols();
        if (index >= maxCols || (wrap && maxCols === 1)) {
            this.select((index - maxCols + maxItems) % maxItems);
        }
    };

    cursorRight(wrap) {
        const index = this.index();
        const maxItems = this.maxItems();
        const maxCols = this.maxCols();
        if (maxCols >= 2 && (index < maxItems - 1 || (wrap && this.isHorizontal()))) {
            this.select((index + 1) % maxItems);
        }
    };

    cursorLeft(wrap) {
        const index = this.index();
        const maxItems = this.maxItems();
        const maxCols = this.maxCols();
        if (maxCols >= 2 && (index > 0 || (wrap && this.isHorizontal()))) {
            this.select((index - 1 + maxItems) % maxItems);
        }
    };

    cursorPagedown() {
        const index = this.index();
        const maxItems = this.maxItems();
        if (this.topRow() + this.maxPageRows() < this.maxRows()) {
            this.setTopRow(this.topRow() + this.maxPageRows());
            this.select(Math.min(index + this.maxPageItems(), maxItems - 1));
        }
    };

    cursorPageup() {
        const index = this.index();
        if (this.topRow() > 0) {
            this.setTopRow(this.topRow() - this.maxPageRows());
            this.select(Math.max(index - this.maxPageItems(), 0));
        }
    };

    scrollDown() {
        if (this.topRow() + 1 < this.maxRows()) {
            this.setTopRow(this.topRow() + 1);
        }
    };

    scrollUp() {
        if (this.topRow() > 0) {
            this.setTopRow(this.topRow() - 1);
        }
    };

    update() {
        super.update();
        this.updateArrows();
        this.processCursorMove();
        this.processHandling();
        this.processWheel();
        this.processTouch();
        this._stayCount++;
    };

    updateArrows() {
        const topRow = this.topRow();
        const maxTopRow = this.maxTopRow();
        this.downArrowVisible = maxTopRow > 0 && topRow < maxTopRow;
        this.upArrowVisible = topRow > 0;
    };

    processCursorMove() {
        if (this.isCursorMovable()) {
            const lastIndex = this.index();
            if (Input.isRepeated('down')) {
                this.cursorDown(Input.isTriggered('down'));
            }
            if (Input.isRepeated('up')) {
                this.cursorUp(Input.isTriggered('up'));
            }
            if (Input.isRepeated('right')) {
                this.cursorRight(Input.isTriggered('right'));
            }
            if (Input.isRepeated('left')) {
                this.cursorLeft(Input.isTriggered('left'));
            }
            if (!this.isHandled('pagedown') && Input.isTriggered('pagedown')) {
                this.cursorPagedown();
            }
            if (!this.isHandled('pageup') && Input.isTriggered('pageup')) {
                this.cursorPageup();
            }
            if (this.index() !== lastIndex) {
                SoundManager.playCursor();
            }
        }
    };

    processHandling() {
        if (this.isOpenAndActive()) {
            if (this.isOkEnabled() && this.isOkTriggered()) {
                this.processOk();
            } else if (this.isCancelEnabled() && this.isCancelTriggered()) {
                this.processCancel();
            } else if (this.isHandled('pagedown') && Input.isTriggered('pagedown')) {
                this.processPagedown();
            } else if (this.isHandled('pageup') && Input.isTriggered('pageup')) {
                this.processPageup();
            }
        }
    };

    processWheel() {
        if (this.isOpenAndActive()) {
            const threshold = 20;
            if (TouchInput.wheelY >= threshold) {
                this.scrollDown();
            }
            if (TouchInput.wheelY <= -threshold) {
                this.scrollUp();
            }
        }
    };

    processTouch() {
        if (this.isOpenAndActive()) {
            if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
                this._touching = true;
                this.onTouch(true);
            } else if (TouchInput.isCancelled()) {
                if (this.isCancelEnabled()) {
                    this.processCancel();
                }
            }
            if (this._touching) {
                if (TouchInput.isPressed()) {
                    this.onTouch(false);
                } else {
                    this._touching = false;
                }
            }
        } else {
            this._touching = false;
        }
    };

    isTouchedInsideFrame() {
        const x = this.canvasToLocalX(TouchInput.x);
        const y = this.canvasToLocalY(TouchInput.y);
        return x >= 0 && y >= 0 && x < this.width && y < this.height;
    };

    onTouch(triggered) {
        const lastIndex = this.index();
        const x = this.canvasToLocalX(TouchInput.x);
        const y = this.canvasToLocalY(TouchInput.y);
        const hitIndex = this.hitTest(x, y);
        if (hitIndex >= 0) {
            if (hitIndex === this.index()) {
                if (triggered && this.isTouchOkEnabled()) {
                    this.processOk();
                }
            } else if (this.isCursorMovable()) {
                this.select(hitIndex);
            }
        } else if (this._stayCount >= 10) {
            if (y < this.padding) {
                this.cursorUp();
            } else if (y >= this.height - this.padding) {
                this.cursorDown();
            }
        }
        if (this.index() !== lastIndex) {
            SoundManager.playCursor();
        }
    };

    hitTest(x, y) {
        if (this.isContentsArea(x, y)) {
            const cx = x - this.padding;
            const cy = y - this.padding;
            const topIndex = this.topIndex();
            for (let i = 0; i < this.maxPageItems(); i++) {
                const index = topIndex + i;
                if (index < this.maxItems()) {
                    const rect = this.itemRect(index);
                    const right = rect.x + rect.width;
                    const bottom = rect.y + rect.height;
                    if (cx >= rect.x && cy >= rect.y && cx < right && cy < bottom) {
                        return index;
                    }
                }
            }
        }
        return -1;
    };

    isContentsArea(x, y) {
        const left = this.padding;
        const top = this.padding;
        const right = this.width - this.padding;
        const bottom = this.height - this.padding;
        return (x >= left && y >= top && x < right && y < bottom);
    };

    isTouchOkEnabled() {
        return this.isOkEnabled();
    };

    isOkEnabled() {
        return this.isHandled('ok');
    };

    isCancelEnabled() {
        return this.isHandled('cancel');
    };

    isOkTriggered() {
        return Input.isRepeated('ok');
    };

    isCancelTriggered() {
        return Input.isRepeated('cancel');
    };

    processOk() {
        if (this.isCurrentItemEnabled()) {
            this.playOkSound();
            this.updateInputData();
            this.deactivate();
            this.callOkHandler();
        } else {
            this.playBuzzerSound();
        }
    };

    playOkSound() {
        SoundManager.playOk();
    };

    playBuzzerSound() {
        SoundManager.playBuzzer();
    };

    callOkHandler() {
        this.callHandler('ok');
    };

    processCancel() {
        SoundManager.playCancel();
        this.updateInputData();
        this.deactivate();
        this.callCancelHandler();
    };

    callCancelHandler() {
        this.callHandler('cancel');
    };

    processPageup() {
        SoundManager.playCursor();
        this.updateInputData();
        this.deactivate();
        this.callHandler('pageup');
    };

    processPagedown() {
        SoundManager.playCursor();
        this.updateInputData();
        this.deactivate();
        this.callHandler('pagedown');
    };

    updateInputData() {
        Input.update();
        TouchInput.update();
    };

    updateCursor() {
        if (this._cursorAll) {
            const allRowsHeight = this.maxRows() * this.itemHeight();
            this.setCursorRect(0, 0, this.contents.width, allRowsHeight);
            this.setTopRow(0);
        } else if (this.isCursorVisible()) {
            const rect = this.itemRect(this.index());
            this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
        } else {
            this.setCursorRect(0, 0, 0, 0);
        }
    };

    isCursorVisible() {
        const row = this.row();
        return row >= this.topRow() && row <= this.bottomRow();
    };

    ensureCursorVisible() {
        const row = this.row();
        if (row < this.topRow()) {
            this.setTopRow(row);
        } else if (row > this.bottomRow()) {
            this.setBottomRow(row);
        }
    };

    callUpdateHelp() {
        if (this.active && this._helpWindow) {
            this.updateHelp();
        }
    };

    updateHelp() {
        this._helpWindow.clear();
    };

    setHelpWindowItem(item) {
        if (this._helpWindow) {
            this._helpWindow.setItem(item);
        }
    };

    isCurrentItemEnabled() {
        return true;
    };

    drawAllItems() {
        const topIndex = this.topIndex();
        for (let i = 0; i < this.maxPageItems(); i++) {
            const index = topIndex + i;
            if (index < this.maxItems()) {
                this.drawItem(index);
            }
        }
    };

    drawItem(index) { };

    clearItem(index) {
        const rect = this.itemRect(index);
        this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
    };

    redrawItem(index) {
        if (index >= 0) {
            this.clearItem(index);
            this.drawItem(index);
        }
    };

    redrawCurrentItem() {
        this.redrawItem(this.index());
    };

    refresh() {
        if (this.contents) {
            this.contents.clear();
            this.drawAllItems();
        }
    };
};

//-----------------------------------------------------------------------------

// Window_Command
//
// The superclass of windows for selecting a command.
class Window_Command extends Window_Selectable {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize(x, y) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        this.clearCommandList();
        this.makeCommandList();
        const width = this.windowWidth();
        const height = this.windowHeight();
        super.initialize(x, y, width, height);
        this.refresh();
        this.select(0);
        this.activate();
    };

    windowWidth() {
        return 240;
    };

    windowHeight() {
        return this.fittingHeight(this.numVisibleRows());
    };

    numVisibleRows() {
        return Math.ceil(this.maxItems() / this.maxCols());
    };

    maxItems() {
        return this._list.length;
    };

    clearCommandList() {
        this._list = [];
    };

    makeCommandList() {
    };

    addCommand(name, symbol, enabled, ext) {
        if (enabled === undefined) {
            enabled = true;
        }
        if (ext === undefined) {
            ext = null;
        }
        this._list.push({ name: name, symbol: symbol, enabled: enabled, ext: ext });
    };

    commandName(index) {
        return this._list[index].name;
    };

    commandSymbol(index) {
        return this._list[index].symbol;
    };

    isCommandEnabled(index) {
        return this._list[index].enabled;
    };

    currentData() {
        return this.index() >= 0 ? this._list[this.index()] : null;
    };

    isCurrentItemEnabled() {
        return this.currentData() ? this.currentData().enabled : false;
    };

    currentSymbol() {
        return this.currentData() ? this.currentData().symbol : null;
    };

    currentExt() {
        return this.currentData() ? this.currentData().ext : null;
    };

    findSymbol(symbol) {
        for (let i = 0; i < this._list.length; i++) {
            if (this._list[i].symbol === symbol) {
                return i;
            }
        }
        return -1;
    };

    selectSymbol(symbol) {
        const index = this.findSymbol(symbol);
        if (index >= 0) {
            this.select(index);
        } else {
            this.select(0);
        }
    };

    findExt(ext) {
        for (let i = 0; i < this._list.length; i++) {
            if (this._list[i].ext === ext) {
                return i;
            }
        }
        return -1;
    };

    selectExt(ext) {
        const index = this.findExt(ext);
        if (index >= 0) {
            this.select(index);
        } else {
            this.select(0);
        }
    };

    drawItem(index) {
        const rect = this.itemRectForText(index);
        const align = this.itemTextAlign();
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
    };

    itemTextAlign() {
        return 'left';
    };

    isOkEnabled() {
        return true;
    };

    callOkHandler() {
        const symbol = this.currentSymbol();
        if (this.isHandled(symbol)) {
            this.callHandler(symbol);
        } else if (this.isHandled('ok')) {
            super.callOkHandler();
        } else {
            this.activate();
        }
    };

    refresh() {
        this.clearCommandList();
        this.makeCommandList();
        this.createContents();
        super.refresh();
    };
};

//-----------------------------------------------------------------------------

// Window_HorzCommand
//
// The command window for the horizontal selection format.
class Window_HorzCommand extends Window_Command {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize(x, y) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize(x, y);
    };

    numVisibleRows() {
        return 1;
    };

    maxCols() {
        return 4;
    };

    itemTextAlign() {
        return 'center';
    };
};

//-----------------------------------------------------------------------------

// Window_Help
//
// The window for displaying the description of the selected item.
var Window_Help = class extends Window_Base {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize(numLines) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        const width = Graphics.boxWidth;
        const height = this.fittingHeight(numLines || 2);
        super.initialize(0, 0, width, height);
        this._text = '';
    };

    setText(text) {
        if (this._text !== text) {
            this._text = text;
            this.refresh();
        }
    };

    clear() {
        this.setText('');
    };

    setItem(item) {
        this.setText(item ? item.infoTextTop : '');
    };

    refresh() {
        this.contents.clear();
        this.drawTextEx(this._text, this.textPadding(), 0);
    };
};

//-----------------------------------------------------------------------------

// Window_Gold
//
// The window for displaying the party's gold.
var Window_Gold = class extends Window_Base {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize(x, y) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        const width = this.windowWidth();
        const height = this.windowHeight();
        super.initialize(x, y, width, height);
        this.refresh();
    };

    windowWidth() {
        return 240;
    };

    windowHeight() {
        return this.fittingHeight(1);
    };

    refresh() {
        const x = this.textPadding();
        const width = this.contents.width - this.textPadding() * 2;
        this.contents.clear();
        this.drawCurrencyValue(this.value(), this.currencyUnit(), x, 0, width);
    };

    value() {
        return $gameParty.gold();
    };

    currencyUnit() {
        return TextManager.currencyUnit;
    };

    open() {
        this.refresh();
        super.open();
    };
};

//-----------------------------------------------------------------------------

// Window_MenuCommand
//
// The window for selecting a command on the menu screen.
var Window_MenuCommand = class extends Window_Command {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize(x, y) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize(x, y);
        this.selectLast();
    };

    static _lastCommandSymbol = null;
    static initCommandPosition() {
        this._lastCommandSymbol = null;
    };

    windowWidth() {
        return 240;
    };

    numVisibleRows() {
        return this.maxItems();
    };

    makeCommandList() {
        this.addMainCommands();
        this.addFormationCommand();
        this.addOriginalCommands();
        this.addOptionsCommand();
        this.addSaveCommand();
        this.addGameEndCommand();
    };

    addMainCommands() {
        const enabled = this.areMainCommandsEnabled();
        if (this.needsCommand('item')) {
            this.addCommand(TextManager.item, 'item', enabled);
        }
        if (this.needsCommand('skill')) {
            this.addCommand(TextManager.skill, 'skill', enabled);
        }
        if (this.needsCommand('equip')) {
            this.addCommand(TextManager.equip, 'equip', enabled);
        }
        if (this.needsCommand('status')) {
            this.addCommand(TextManager.status, 'status', enabled);
        }
    };

    addFormationCommand() {
        if (this.needsCommand('formation')) {
            const enabled = this.isFormationEnabled();
            this.addCommand(TextManager.formation, 'formation', enabled);
        }
    };

    addOriginalCommands() {
    };

    addOptionsCommand() {
        if (this.needsCommand('options')) {
            const enabled = this.isOptionsEnabled();
            this.addCommand(TextManager.options, 'options', enabled);
        }
    };

    addSaveCommand() {
        if (this.needsCommand('save')) {
            const enabled = this.isSaveEnabled();
            this.addCommand(TextManager.save, 'save', enabled);
        }
    };

    addGameEndCommand() {
        const enabled = this.isGameEndEnabled();
        this.addCommand(TextManager.gameEnd, 'gameEnd', enabled);
    };

    needsCommand(name) {
        const flags = $dataSystem.menuCommands;
        if (flags) {
            switch (name) {
                case 'item':
                    return flags[0];
                case 'skill':
                    return flags[1];
                case 'equip':
                    return flags[2];
                case 'status':
                    return flags[3];
                case 'formation':
                    return flags[4];
                case 'save':
                    return flags[5];
            }
        }
        return true;
    };

    areMainCommandsEnabled() {
        return $gameParty.exists();
    };

    isFormationEnabled() {
        return $gameParty.size() >= 2 && $gameSystem.isFormationEnabled();
    };

    isOptionsEnabled() {
        return true;
    };

    isSaveEnabled() {
        return !DataManager.isEventTest() && $gameSystem.isSaveEnabled();
    };

    isGameEndEnabled() {
        return true;
    };

    processOk() {
        Window_MenuCommand._lastCommandSymbol = this.currentSymbol();
        super.processOk();
    };

    selectLast() {
        this.selectSymbol(Window_MenuCommand._lastCommandSymbol);
    };
};

//-----------------------------------------------------------------------------

// Window_MenuStatus
//
// The window for displaying party member status on the menu screen.
var Window_MenuStatus = class extends Window_Selectable {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize(x, y) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        const width = this.windowWidth();
        const height = this.windowHeight();
        super.initialize(x, y, width, height);
        this._formationMode = false;
        this._pendingIndex = -1;
        this.refresh();
    };

    windowWidth() {
        return Graphics.boxWidth - 240;
    };

    windowHeight() {
        return Graphics.boxHeight;
    };

    maxItems() {
        return $gameParty.size();
    };

    itemHeight() {
        const clientHeight = this.height - this.padding * 2;
        return Math.floor(clientHeight / this.numVisibleRows());
    };

    numVisibleRows() {
        return 4;
    };

    loadImages() {
        for (const actor of $gameParty.members()) {
            ImageManager.reserveFace(actor.faceName());
        }
    };

    drawItem(index) {
        this.drawItemBackground(index);
        this.drawItemImage(index);
        this.drawItemStatus(index);
    };

    drawItemBackground(index) {
        if (index === this._pendingIndex) {
            const rect = this.itemRect(index);
            const color = this.pendingColor();
            this.changePaintOpacity(false);
            this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color);
            this.changePaintOpacity(true);
        }
    };

    drawItemImage(index) {
        const actor = $gameParty.members()[index];
        const rect = this.itemRect(index);
        this.changePaintOpacity(actor.isBattleMember());
        this.drawActorFace(actor, rect.x + 1, rect.y + 1, Window_Base._faceWidth, Window_Base._faceHeight);
        this.changePaintOpacity(true);
    };

    drawItemStatus(index) {
        const actor = $gameParty.members()[index];
        const rect = this.itemRect(index);
        const x = rect.x + 162;
        const y = rect.y + rect.height / 2 - this.lineHeight() * 1.5;
        const width = rect.width - x - this.textPadding();
        this.drawActorSimpleStatus(actor, x, y, width);
    };


    processOk() {
        super.processOk();
        $gameParty.setMenuActor($gameParty.members()[this.index()]);
    };

    isCurrentItemEnabled() {
        if (this._formationMode) {
            const actor = $gameParty.members()[this.index()];
            return actor && actor.isFormationChangeOk();
        } else {
            return true;
        }
    };

    selectLast() {
        this.select($gameParty.menuActor().index() || 0);
    };

    formationMode() {
        return this._formationMode;
    };

    setFormationMode(formationMode) {
        this._formationMode = formationMode;
    };

    pendingIndex() {
        return this._pendingIndex;
    };

    setPendingIndex(index) {
        const lastPendingIndex = this._pendingIndex;
        this._pendingIndex = index;
        this.redrawItem(this._pendingIndex);
        this.redrawItem(lastPendingIndex);
    };
};

//-----------------------------------------------------------------------------

// Window_MenuActor
//
// The window for selecting a target actor on the item and skill screens.
class Window_MenuActor extends Window_MenuStatus {
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
        super.initialize(0, 0);
        this.hide();
    };

    processOk() {
        if (!this.cursorAll()) {
            $gameParty.setTargetActor($gameParty.members()[this.index()]);
        }
        this.callOkHandler();
    };

    selectLast() {
        this.select($gameParty.targetActor().index() || 0);
    };

    selectForItem(item) {
        const actor = $gameParty.menuActor();
        const action = new Game_Action(actor);
        action.setItemObject(item);
        this.setCursorFixed(false);
        this.setCursorAll(false);
        if (action.isForUser()) {
            if (DataManager.isSkill(item)) {
                this.setCursorFixed(true);
                this.select(actor.index());
            } else {
                this.selectLast();
            }
        } else if (action.isForAll()) {
            this.setCursorAll(true);
            this.select(0);
        } else {
            this.selectLast();
        }
    };
};

//-----------------------------------------------------------------------------

// Window_ItemCategory
//
// The window for selecting a category of items on the item and shop screens.
var Window_ItemCategory = class extends Window_HorzCommand {
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
        super.initialize(0, 0);
    };

    windowWidth() {
        return Graphics.boxWidth;
    };

    maxCols() {
        return 4;
    };

    update() {
        super.update();
        if (this._itemWindow) {
            this._itemWindow.setCategory(this.currentSymbol());
        }
    };

    makeCommandList() {
        this.addCommand(TextManager.item, 'item');
        this.addCommand(TextManager.weapon, 'weapon');
        this.addCommand(TextManager.armor, 'armor');
        this.addCommand(TextManager.keyItem, 'keyItem');
    };

    setItemWindow(itemWindow) {
        this._itemWindow = itemWindow;
    };
};

//-----------------------------------------------------------------------------

// Window_ItemList
//
// The window for selecting an item on the item screen.
var Window_ItemList = class extends Window_Selectable {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize(x, y, width, height) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize(x, y, width, height);
        this._category = 'none';
        this._data = [];
    };

    setCategory(category) {
        if (this._category !== category) {
            this._category = category;
            this.refresh();
            this.resetScroll();
        }
    };

    maxCols() {
        return 2;
    };

    spacing() {
        return 48;
    };

    maxItems() {
        return this._data ? this._data.length : 1;
    };

    item() {
        const index = this.index();
        return this._data && index >= 0 ? this._data[index] : null;
    };

    isCurrentItemEnabled() {
        return this.isEnabled(this.item());
    };

    includes(item) {
        switch (this._category) {
            case 'item':
                return DataManager.isItem(item) && item.itypeId === 1;
            case 'weapon':
                return DataManager.isWeapon(item);
            case 'armor':
                return DataManager.isArmor(item);
            case 'keyItem':
                return DataManager.isItem(item) && item.itypeId === 2;
            default:
                return false;
        }
    };

    needsNumber() {
        return true;
    };

    isEnabled(item) {
        return $gameParty.canUse(item);
    };

    makeItemList() {
        this._data = $gameParty.allItems().filter(item => this.includes(item));
        if (this.includes(null)) {
            this._data.push(null);
        }
    };

    selectLast() {
        const index = this._data.indexOf($gameParty.lastItem());
        this.select(index >= 0 ? index : 0);
    };

    drawItem(index) {
        const item = this._data[index];
        if (item) {
            const numberWidth = this.numberWidth();
            const rect = this.itemRect(index);
            rect.width -= this.textPadding();
            this.changePaintOpacity(this.isEnabled(item));
            this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth);
            this.drawItemNumber(item, rect.x, rect.y, rect.width);
            this.changePaintOpacity(1);
        }
    };

    numberWidth() {
        return this.textWidth('000');
    };

    drawItemNumber(item, x, y, width) {
        if (this.needsNumber()) {
            this.drawText(':', x, y, width - this.textWidth('00'), 'right');
            this.drawText($gameParty.numItems(item), x, y, width, 'right');
        }
    };

    updateHelp() {
        this.setHelpWindowItem(this.item());
    };

    refresh() {
        this.makeItemList();
        this.createContents();
        this.drawAllItems();
    };
};

//-----------------------------------------------------------------------------

// Window_SkillType
//
// The window for selecting a skill type on the skill screen.
var Window_SkillType = class extends Window_Command {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize(x, y) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize(x, y);
        this._actor = null;
    };

    windowWidth() {
        return 240;
    };

    setActor(actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
            this.selectLast();
        }
    };

    numVisibleRows() {
        return 4;
    };

    makeCommandList() {
        if (this._actor) {
            const skillTypes = this._actor.addedSkillTypes();
            skillTypes.sort((a, b) => a - b);
            for (const stypeId of skillTypes) {
                const name = $dataSystem.skillTypes[stypeId];
                this.addCommand(name, 'skill', true, stypeId);
            }
        }
    };

    update() {
        super.update();
        if (this._skillWindow) {
            this._skillWindow.setStypeId(this.currentExt());
        }
    };

    setSkillWindow(skillWindow) {
        this._skillWindow = skillWindow;
    };

    selectLast() {
        const skill = this._actor.lastMenuSkill();
        if (skill) {
            this.selectExt(skill.stypeId);
        } else {
            this.select(0);
        }
    };
};

//-----------------------------------------------------------------------------

// Window_SkillStatus
//
// The window for displaying the skill user's status on the skill screen.
var Window_SkillStatus = class extends Window_Base {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize(x, y, width, height) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize(x, y, width, height);
        this._actor = null;
    };

    setActor(actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
        }
    };

    refresh() {
        this.contents.clear();
        if (this._actor) {
            const w = this.width - this.padding * 2;
            const h = this.height - this.padding * 2;
            const y = h / 2 - this.lineHeight() * 1.5;
            const width = w - 162 - this.textPadding();
            this.drawActorFace(this._actor, 0, 0, 144, h);
            this.drawActorSimpleStatus(this._actor, 162, y, width);
        }
    };
};

//-----------------------------------------------------------------------------

// Window_SkillList
//
// The window for selecting a skill on the skill screen.
var Window_SkillList = class extends Window_Selectable {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize(x, y, width, height) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize(x, y, width, height);
        this._actor = null;
        this._stypeId = 0;
        this._data = [];
    };

    setActor(actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
            this.resetScroll();
        }
    };

    setStypeId(stypeId) {
        if (this._stypeId !== stypeId) {
            this._stypeId = stypeId;
            this.refresh();
            this.resetScroll();
        }
    };

    maxCols() {
        return 2;
    };

    spacing() {
        return 48;
    };

    maxItems() {
        return this._data ? this._data.length : 1;
    };

    item() {
        return this._data && this.index() >= 0 ? this._data[this.index()] : null;
    };

    isCurrentItemEnabled() {
        return this.isEnabled(this._data[this.index()]);
    };

    includes(item) {
        return item && item.stypeId === this._stypeId;
    };

    isEnabled(item) {
        return this._actor && this._actor.canUse(item);
    };

    makeItemList() {
        if (this._actor) {
            this._data = this._actor.skills().filter(item => this.includes(item));
        } else {
            this._data = [];
        }
    };

    selectLast() {
        let skill;
        if ($gameParty.inBattle()) {
            skill = this._actor.lastBattleSkill();
        } else {
            skill = this._actor.lastMenuSkill();
        }
        const index = this._data.indexOf(skill);
        this.select(index >= 0 ? index : 0);
    };

    drawItem(index) {
        const skill = this._data[index];
        if (skill) {
            const costWidth = this.costWidth();
            const rect = this.itemRect(index);
            rect.width -= this.textPadding();
            this.changePaintOpacity(this.isEnabled(skill));
            this.drawItemName(skill, rect.x, rect.y, rect.width - costWidth);
            this.drawSkillCost(skill, rect.x, rect.y, rect.width);
            this.changePaintOpacity(1);
        }
    };

    costWidth() {
        return this.textWidth('000');
    };

    drawSkillCost(skill, x, y, width) {
        if (this._actor.skillTpCost(skill) > 0) {
            this.changeTextColor(this.tpCostColor());
            this.drawText(this._actor.skillTpCost(skill), x, y, width, 'right');
        } else if (this._actor.skillMpCost(skill) > 0) {
            this.changeTextColor(this.mpCostColor());
            this.drawText(this._actor.skillMpCost(skill), x, y, width, 'right');
        }
    };

    updateHelp() {
        this.setHelpWindowItem(this.item());
    };

    refresh() {
        this.makeItemList();
        this.createContents();
        this.drawAllItems();
    };
};

//-----------------------------------------------------------------------------

// Window_EquipStatus
//
// The window for displaying parameter changes on the equipment screen.
var Window_EquipStatus = class extends Window_Base {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize(x, y) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        const width = this.windowWidth();
        const height = this.windowHeight();
        super.initialize(x, y, width, height);
        this._actor = null;
        this._tempActor = null;
        this.refresh();
    };

    windowWidth() {
        return 312;
    };

    windowHeight() {
        return this.fittingHeight(this.numVisibleRows());
    };

    numVisibleRows() {
        return 7;
    };

    setActor(actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
        }
    };

    refresh() {
        this.contents.clear();
        if (this._actor) {
            this.drawActorName(this._actor, this.textPadding(), 0);
            for (let i = 0; i < 6; i++) {
                this.drawItem(0, this.lineHeight() * (1 + i), 2 + i);
            }
        }
    };

    setTempActor(tempActor) {
        if (this._tempActor !== tempActor) {
            this._tempActor = tempActor;
            this.refresh();
        }
    };

    drawItem(x, y, paramId) {
        this.drawParamName(x + this.textPadding(), y, paramId);
        if (this._actor) {
            this.drawCurrentParam(x + 140, y, paramId);
        }
        this.drawRightArrow(x + 188, y);
        if (this._tempActor) {
            this.drawNewParam(x + 222, y, paramId);
        }
    };

    drawParamName(x, y, paramId) {
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.param(paramId), x, y, 120);
    };

    drawCurrentParam(x, y, paramId) {
        this.resetTextColor();
        this.drawText(this._actor.param(paramId), x, y, 48, 'right');
    };

    drawRightArrow(x, y) {
        this.changeTextColor(this.systemColor());
        this.drawText('\u2192', x, y, 32, 'center');
    };

    drawNewParam(x, y, paramId) {
        const newValue = this._tempActor.param(paramId);
        const diffvalue = newValue - this._actor.param(paramId);
        this.changeTextColor(this.paramchangeTextColor(diffvalue));
        this.drawText(newValue, x, y, 48, 'right');
    };
};

//-----------------------------------------------------------------------------

// Window_EquipCommand
//
// The window for selecting a command on the equipment screen.
var Window_EquipCommand = class extends Window_HorzCommand {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize(x, y, width) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        this._windowWidth = width;
        super.initialize(x, y);
    };

    windowWidth() {
        return this._windowWidth;
    };

    maxCols() {
        return 3;
    };

    makeCommandList() {
        this.addCommand(TextManager.equip2, 'equip');
        this.addCommand(TextManager.optimize, 'optimize');
        this.addCommand(TextManager.clear, 'clear');
    };
};

//-----------------------------------------------------------------------------

// Window_EquipSlot
//
// The window for selecting an equipment slot on the equipment screen.
var Window_EquipSlot = class extends Window_Selectable {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize(x, y, width, height) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize(x, y, width, height);
        this._actor = null;
        this.refresh();
    };

    setActor(actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
        }
    };

    update() {
        super.update();
        if (this._itemWindow) {
            this._itemWindow.setSlotId(this.index());
        }
    };

    maxItems() {
        return this._actor ? this._actor.equipSlots().length : 0;
    };

    item() {
        return this._actor ? this._actor.equips()[this.index()] : null;
    };

    drawItem(index) {
        if (this._actor) {
            const rect = this.itemRectForText(index);
            this.changeTextColor(this.systemColor());
            this.changePaintOpacity(this.isEnabled(index));
            this.drawText(this.slotName(index), rect.x, rect.y, 138, this.lineHeight());
            this.drawItemName(this._actor.equips()[index], rect.x + 138, rect.y);
            this.changePaintOpacity(true);
        }
    };

    slotName(index) {
        const slots = this._actor.equipSlots();
        return this._actor ? $dataSystem.equipTypes[slots[index]] : '';
    };

    isEnabled(index) {
        return this._actor ? this._actor.isEquipChangeOk(index) : false;
    };

    isCurrentItemEnabled() {
        return this.isEnabled(this.index());
    };

    setStatusWindow(statusWindow) {
        this._statusWindow = statusWindow;
        this.callUpdateHelp();
    };

    setItemWindow(itemWindow) {
        this._itemWindow = itemWindow;
    };

    updateHelp() {
        super.updateHelp();
        this.setHelpWindowItem(this.item());
        if (this._statusWindow) {
            this._statusWindow.setTempActor(null);
        }
    };
};

//-----------------------------------------------------------------------------

// Window_EquipItem
//
// The window for selecting an equipment item on the equipment screen.
var Window_EquipItem = class extends Window_ItemList {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize(x, y, width, height) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize(x, y, width, height);
        this._actor = null;
        this._slotId = 0;
    };

    setActor(actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
            this.resetScroll();
        }
    };

    setSlotId(slotId) {
        if (this._slotId !== slotId) {
            this._slotId = slotId;
            this.refresh();
            this.resetScroll();
        }
    };

    includes(item) {
        if (item === null) {
            return true;
        }
        if (this._slotId < 0 || item.etypeId !== this._actor.equipSlots()[this._slotId]) {
            return false;
        }
        return this._actor.canEquip(item);
    };

    isEnabled(item) {
        return true;
    };

    selectLast() {
    };

    setStatusWindow(statusWindow) {
        this._statusWindow = statusWindow;
        this.callUpdateHelp();
    };

    updateHelp() {
        super.updateHelp();
        if (this._actor && this._statusWindow) {
            const actor = JsonEx.makeDeepCopy(this._actor);
            actor.forceChangeEquip(this._slotId, this.item());
            this._statusWindow.setTempActor(actor);
        }
    };

    playOkSound() { };
};

//-----------------------------------------------------------------------------

// Window_Status
//
// The window for displaying full status on the status screen.
var Window_Status = class extends Window_Selectable {
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
        const width = Graphics.boxWidth;
        const height = Graphics.boxHeight;
        super.initialize(0, 0, width, height);
        this._actor = null;
        this.refresh();
        this.activate();
    };

    setActor(actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
        }
    };

    refresh() {
        this.contents.clear();
        if (this._actor) {
            const lineHeight = this.lineHeight();
            this.drawBlock1(lineHeight * 0);
            this.drawHorzLine(lineHeight * 1);
            this.drawBlock2(lineHeight * 2);
            this.drawHorzLine(lineHeight * 6);
            this.drawBlock3(lineHeight * 7);
            this.drawHorzLine(lineHeight * 13);
            this.drawBlock4(lineHeight * 14);
        }
    };

    drawBlock1(y) {
        this.drawActorName(this._actor, 6, y);
        this.drawActorClass(this._actor, 192, y);
        this.drawActorNickname(this._actor, 432, y);
    };

    drawBlock2(y) {
        this.drawActorFace(this._actor, 12, y);
        this.drawBasicInfo(204, y);
        this.drawExpInfo(456, y);
    };

    drawBlock3(y) {
        this.drawParameters(48, y);
        this.drawEquipments(432, y);
    };

    drawBlock4(y) {
        this.drawProfile(6, y);
    };

    drawHorzLine(y) {
        const lineY = y + this.lineHeight() / 2 - 1;
        this.contents.paintOpacity = 48;
        this.contents.fillRect(0, lineY, this.contentsWidth(), 2, this.lineColor());
        this.contents.paintOpacity = 255;
    };

    lineColor() {
        return this.normalColor();
    };

    drawBasicInfo(x, y) {
        const lineHeight = this.lineHeight();
        this.drawActorLevel(this._actor, x, y + lineHeight * 0);
        this.drawActorIcons(this._actor, x, y + lineHeight * 1);
        this.drawActorHp(this._actor, x, y + lineHeight * 2);
        this.drawActorMp(this._actor, x, y + lineHeight * 3);
    };

    drawParameters(x, y) {
        const lineHeight = this.lineHeight();
        for (let i = 0; i < 6; i++) {
            const paramId = i + 2;
            const y2 = y + lineHeight * i;
            this.changeTextColor(this.systemColor());
            this.drawText(TextManager.param(paramId), x, y2, 160);
            this.resetTextColor();
            this.drawText(this._actor.param(paramId), x + 160, y2, 60, 'right');
        }
    };

    drawExpInfo(x, y) {
        const lineHeight = this.lineHeight();
        const expTotal = TextManager.expTotal.format(TextManager.exp);
        const expNext = TextManager.expNext.format(TextManager.level);
        let value1 = this._actor.currentExp();
        let value2 = this._actor.nextRequiredExp();
        if (this._actor.isMaxLevel()) {
            value1 = '-------';
            value2 = '-------';
        }
        this.changeTextColor(this.systemColor());
        this.drawText(expTotal, x, y + lineHeight * 0, 270);
        this.drawText(expNext, x, y + lineHeight * 2, 270);
        this.resetTextColor();
        this.drawText(value1, x, y + lineHeight * 1, 270, 'right');
        this.drawText(value2, x, y + lineHeight * 3, 270, 'right');
    };

    drawEquipments(x, y) {
        const equips = this._actor.equips();
        const count = Math.min(equips.length, this.maxEquipmentLines());
        for (let i = 0; i < count; i++) {
            this.drawItemName(equips[i], x, y + this.lineHeight() * i);
        }
    };

    drawProfile(x, y) {
        this.drawTextEx(this._actor.profile(), x, y);
    };

    maxEquipmentLines() {
        return 6;
    };
};

//-----------------------------------------------------------------------------

// Window_Options
//
// The window for changing various settings on the options screen.
var Window_Options = class extends Window_Command {
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
        super.initialize(0, 0);
        this.updatePlacement();
    };

    windowWidth() {
        return 400;
    };

    windowHeight() {
        return this.fittingHeight(Math.min(this.numVisibleRows(), 12));
    };

    updatePlacement() {
        this.x = (Graphics.boxWidth - this.width) / 2;
        this.y = (Graphics.boxHeight - this.height) / 2;
    };

    makeCommandList() {
        this.addGeneralOptions();
        this.addVolumeOptions();
    };

    addGeneralOptions() {
        this.addCommand(TextManager.alwaysDash, 'alwaysDash');
        this.addCommand(TextManager.commandRemember, 'commandRemember');
    };

    addVolumeOptions() {
        this.addCommand(TextManager.bgmVolume, 'bgmVolume');
        this.addCommand(TextManager.bgsVolume, 'bgsVolume');
        this.addCommand(TextManager.meVolume, 'meVolume');
        this.addCommand(TextManager.seVolume, 'seVolume');
    };

    drawItem(index) {
        const rect = this.itemRectForText(index);
        const statusWidth = this.statusWidth();
        const titleWidth = rect.width - statusWidth;
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.drawText(this.commandName(index), rect.x, rect.y, titleWidth, 'left');
        this.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'right');
    };

    statusWidth() {
        return 120;
    };

    statusText(index) {
        const symbol = this.commandSymbol(index);
        const value = this.getConfigValue(symbol);
        if (this.isVolumeSymbol(symbol)) {
            return this.volumeStatusText(value);
        } else {
            return this.booleanStatusText(value);
        }
    };

    isVolumeSymbol(symbol) {
        return symbol.contains('Volume');
    };

    booleanStatusText(value) {
        return value ? 'ON' : 'OFF';
    };

    volumeStatusText(value) {
        return value + '%';
    };

    processOk() {
        const index = this.index();
        const symbol = this.commandSymbol(index);
        let value = this.getConfigValue(symbol);
        if (this.isVolumeSymbol(symbol)) {
            value += this.volumeOffset();
            if (value > 100) {
                value = 0;
            }
            value = value.clamp(0, 100);
            this.changeValue(symbol, value);
        } else {
            this.changeValue(symbol, !value);
        }
    };

    cursorRight(wrap) {
        const index = this.index();
        const symbol = this.commandSymbol(index);
        let value = this.getConfigValue(symbol);
        if (this.isVolumeSymbol(symbol)) {
            value += this.volumeOffset();
            value = value.clamp(0, 100);
            this.changeValue(symbol, value);
        } else {
            this.changeValue(symbol, true);
        }
    };

    cursorLeft(wrap) {
        const index = this.index();
        const symbol = this.commandSymbol(index);
        let value = this.getConfigValue(symbol);
        if (this.isVolumeSymbol(symbol)) {
            value -= this.volumeOffset();
            value = value.clamp(0, 100);
            this.changeValue(symbol, value);
        } else {
            this.changeValue(symbol, false);
        }
    };

    volumeOffset() {
        return 5;
    };

    changeValue(symbol, value) {
        const lastValue = this.getConfigValue(symbol);
        if (lastValue !== value) {
            this.setConfigValue(symbol, value);
            this.redrawItem(this.findSymbol(symbol));
            SoundManager.playCursor();
        }
    };

    getConfigValue(symbol) {
        return ConfigManager[symbol];
    };

    setConfigValue(symbol, volume) {
        ConfigManager[symbol] = volume;
    };
};

//-----------------------------------------------------------------------------

// Window_SavefileList
//
// The window for selecting a save file on the save and load screens.
var Window_SavefileList = class extends Window_Selectable {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize(x, y, width, height) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize(x, y, width, height);
        this.activate();
        this._mode = null;
    };

    setMode(mode) {
        this._mode = mode;
    };

    maxItems() {
        return DataManager.maxSavefiles();
    };

    maxVisibleItems() {
        return 5;
    };

    itemHeight() {
        const innerHeight = this.height - this.padding * 2;
        return Math.floor(innerHeight / this.maxVisibleItems());
    };

    drawItem(index) {
        const id = index + 1;
        const valid = DataManager.isThisGameFile(id);
        const info = DataManager.loadSavefileInfo(id);
        const rect = this.itemRectForText(index);
        this.resetTextColor();
        if (this._mode === 'load') {
            this.changePaintOpacity(valid);
        }
        this.drawFileId(id, rect.x, rect.y);
        if (info) {
            this.changePaintOpacity(valid);
            this.drawContents(info, rect, valid);
            this.changePaintOpacity(true);
        }
    };

    drawFileId(id, x, y) {
        this.drawText(TextManager.file + ' ' + id, x, y, 180);
    };

    drawContents(info, rect, valid) {
        const bottom = rect.y + rect.height;
        if (rect.width >= 420) {
            this.drawGameTitle(info, rect.x + 192, rect.y, rect.width - 192);
            if (valid) {
                this.drawPartyCharacters(info, rect.x + 220, bottom - 4);
            }
        }
        const lineHeight = this.lineHeight();
        const y2 = bottom - lineHeight;
        if (y2 >= lineHeight) {
            this.drawPlaytime(info, rect.x, y2, rect.width);
        }
    };

    drawGameTitle(info, x, y, width) {
        if (info.title) {
            this.drawText(info.title, x, y, width);
        }
    };

    drawPartyCharacters(info, x, y) {
        if (info.characters) {
            for (let i = 0; i < info.characters.length; i++) {
                const data = info.characters[i];
                this.drawCharacter(data[0], data[1], x + i * 48, y);
            }
        }
    };

    drawPlaytime(info, x, y, width) {
        if (info.playtime) {
            this.drawText(info.playtime, x, y, width, 'right');
        }
    };

    playOkSound() { };
};

//-----------------------------------------------------------------------------

// Window_ShopCommand
//
// The window for selecting buy/sell on the shop screen.
var Window_ShopCommand = class extends Window_HorzCommand {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize(width, purchaseOnly) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        this._windowWidth = width;
        this._purchaseOnly = purchaseOnly;
        super.initialize(0, 0);
    };

    windowWidth() {
        return this._windowWidth;
    };

    maxCols() {
        return 3;
    };

    makeCommandList() {
        this.addCommand(TextManager.buy, 'buy');
        this.addCommand(TextManager.sell, 'sell', !this._purchaseOnly);
        this.addCommand(TextManager.cancel, 'cancel');
    };
};

//-----------------------------------------------------------------------------

// Window_ShopBuy
//
// The window for selecting an item to buy on the shop screen.
var Window_ShopBuy = class extends Window_Selectable {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize(x, y, height, shopGoods) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        const width = this.windowWidth();
        super.initialize(x, y, width, height);
        this._shopGoods = shopGoods;
        this._money = 0;
        this.refresh();
        this.select(0);
    };

    windowWidth() {
        return 456;
    };

    maxItems() {
        return this._data ? this._data.length : 1;
    };

    item() {
        return this._data[this.index()];
    };

    setMoney(money) {
        this._money = money;
        this.refresh();
    };

    isCurrentItemEnabled() {
        return this.isEnabled(this._data[this.index()]);
    };

    price(item) {
        return this._price[this._data.indexOf(item)] || 0;
    };

    isEnabled(item) {
        return (item && this.price(item) <= this._money &&
            !$gameParty.hasMaxItems(item));
    };

    refresh() {
        this.makeItemList();
        this.createContents();
        this.drawAllItems();
    };

    makeItemList() {
        this._data = [];
        this._price = [];
        for (const goods of this._shopGoods) {
            let item = null;
            switch (goods[0]) {
                case 0:
                    item = $dataItems[goods[1]];
                    break;
                case 1:
                    item = $dataWeapons[goods[1]];
                    break;
                case 2:
                    item = $dataArmors[goods[1]];
                    break;
            }
            if (item) {
                this._data.push(item);
                this._price.push(goods[2] === 0 ? item.price : goods[3]);
            }
        }
    };

    drawItem(index) {
        const item = this._data[index];
        const rect = this.itemRect(index);
        const priceWidth = 96;
        rect.width -= this.textPadding();
        this.changePaintOpacity(this.isEnabled(item));
        this.drawItemName(item, rect.x, rect.y, rect.width - priceWidth);
        this.drawText(this.price(item), rect.x + rect.width - priceWidth, rect.y, priceWidth, 'right');
        this.changePaintOpacity(true);
    };

    setStatusWindow(statusWindow) {
        this._statusWindow = statusWindow;
        this.callUpdateHelp();
    };

    updateHelp() {
        this.setHelpWindowItem(this.item());
        if (this._statusWindow) {
            this._statusWindow.setItem(this.item());
        }
    };
};

//-----------------------------------------------------------------------------

// Window_ShopSell
//
// The window for selecting an item to sell on the shop screen.
var Window_ShopSell = class extends Window_ItemList {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize(x, y, width, height) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize(x, y, width, height);
    };

    isEnabled(item) {
        return item && item.price > 0;
    };
};

//-----------------------------------------------------------------------------

// Window_ShopNumber
//
// The window for inputting quantity of items to buy or sell on the shop
// screen.
var Window_ShopNumber = class extends Window_Selectable {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize(x, y, height) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        const width = this.windowWidth();
        super.initialize(x, y, width, height);
        this._item = null;
        this._max = 1;
        this._price = 0;
        this._number = 1;
        this._currencyUnit = TextManager.currencyUnit;
        this.createButtons();
    };

    windowWidth() {
        return 456;
    };

    number() {
        return this._number;
    };

    setup(item, max, price) {
        this._item = item;
        this._max = Math.floor(max);
        this._price = price;
        this._number = 1;
        this.placeButtons();
        this.updateButtonsVisiblity();
        this.refresh();
    };

    setCurrencyUnit(currencyUnit) {
        this._currencyUnit = currencyUnit;
        this.refresh();
    };

    createButtons() {
        const bitmap = ImageManager.loadSystem('ButtonSet');
        const buttonWidth = 48;
        const buttonHeight = 48;
        this._buttons = [];
        for (let i = 0; i < 5; i++) {
            const button = new Sprite_Button();
            const x = buttonWidth * i;
            const w = buttonWidth * (i === 4 ? 2 : 1);
            button.bitmap = bitmap;
            button.setColdFrame(x, 0, w, buttonHeight);
            button.setHotFrame(x, buttonHeight, w, buttonHeight);
            button.visible = false;
            this._buttons.push(button);
            this.addChild(button);
        }
        this._buttons[0].setClickHandler(this.onButtonDown2.bind(this));
        this._buttons[1].setClickHandler(this.onButtonDown.bind(this));
        this._buttons[2].setClickHandler(this.onButtonUp.bind(this));
        this._buttons[3].setClickHandler(this.onButtonUp2.bind(this));
        this._buttons[4].setClickHandler(this.onButtonOk.bind(this));
    };

    placeButtons() {
        const numButtons = this._buttons.length;
        const spacing = 16;
        let totalWidth = -spacing;
        for (let i = 0; i < numButtons; i++) {
            totalWidth += this._buttons[i].width + spacing;
        }
        let x = (this.width - totalWidth) / 2;
        for (let j = 0; j < numButtons; j++) {
            const button = this._buttons[j];
            button.x = x;
            button.y = this.buttonY();
            x += button.width + spacing;
        }
    };

    updateButtonsVisiblity() {
        if (TouchInput.date > Input.date) {
            this.showButtons();
        } else {
            this.hideButtons();
        }
    };

    showButtons() {
        for (const button of this._buttons) {
            button.visible = true;
        }
    };

    hideButtons() {
        for (const button of this._buttons) {
            button.visible = false;
        }
    };

    refresh() {
        this.contents.clear();
        this.drawItemName(this._item, 0, this.itemY());
        this.drawMultiplicationSign();
        this.drawNumber();
        this.drawTotalPrice();
    };

    drawMultiplicationSign() {
        const sign = '\u00d7';
        const width = this.textWidth(sign);
        const x = this.cursorX() - width * 2;
        const y = this.itemY();
        this.resetTextColor();
        this.drawText(sign, x, y, width);
    };

    drawNumber() {
        const x = this.cursorX();
        const y = this.itemY();
        const width = this.cursorWidth() - this.textPadding();
        this.resetTextColor();
        this.drawText(this._number, x, y, width, 'right');
    };

    drawTotalPrice() {
        const total = this._price * this._number;
        const width = this.contentsWidth() - this.textPadding();
        this.drawCurrencyValue(total, this._currencyUnit, 0, this.priceY(), width);
    };

    itemY() {
        return Math.round(this.contentsHeight() / 2 - this.lineHeight() * 1.5);
    };

    priceY() {
        return Math.round(this.contentsHeight() / 2 + this.lineHeight() / 2);
    };

    buttonY() {
        return Math.round(this.priceY() + this.lineHeight() * 2.5);
    };

    cursorWidth() {
        const digitWidth = this.textWidth('0');
        return this.maxDigits() * digitWidth + this.textPadding() * 2;
    };

    cursorX() {
        return this.contentsWidth() - this.cursorWidth() - this.textPadding();
    };

    maxDigits() {
        return 2;
    };

    update() {
        super.update();
        this.processNumberChange();
    };

    isOkTriggered() {
        return Input.isTriggered('ok');
    };

    playOkSound() {
    };

    processNumberChange() {
        if (this.isOpenAndActive()) {
            if (Input.isRepeated('right')) {
                this.changeNumber(1);
            }
            if (Input.isRepeated('left')) {
                this.changeNumber(-1);
            }
            if (Input.isRepeated('up')) {
                this.changeNumber(10);
            }
            if (Input.isRepeated('down')) {
                this.changeNumber(-10);
            }
        }
    };

    changeNumber(amount) {
        const lastNumber = this._number;
        this._number = (this._number + amount).clamp(1, this._max);
        if (this._number !== lastNumber) {
            SoundManager.playCursor();
            this.refresh();
        }
    };

    updateCursor() {
        this.setCursorRect(this.cursorX(), this.itemY(),
            this.cursorWidth(), this.lineHeight());
    };

    onButtonUp() {
        this.changeNumber(1);
    };

    onButtonUp2() {
        this.changeNumber(10);
    };

    onButtonDown() {
        this.changeNumber(-1);
    };

    onButtonDown2() {
        this.changeNumber(-10);
    };

    onButtonOk() {
        this.processOk();
    };
};

//-----------------------------------------------------------------------------

// Window_ShopStatus
//
// The window for displaying number of items in possession and the actor's
// equipment on the shop screen.
var Window_ShopStatus = class extends Window_Base {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize(x, y, width, height) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize(x, y, width, height);
        this._item = null;
        this._pageIndex = 0;
        this.refresh();
    };

    refresh() {
        this.contents.clear();
        if (this._item) {
            const x = this.textPadding();
            this.drawPossession(x, 0);
            if (this.isEquipItem()) {
                this.drawEquipInfo(x, this.lineHeight() * 2);
            }
        }
    };

    setItem(item) {
        this._item = item;
        this.refresh();
    };

    isEquipItem() {
        return DataManager.isWeapon(this._item) || DataManager.isArmor(this._item);
    };

    drawPossession(x, y) {
        const width = this.contents.width - this.textPadding() - x;
        const possessionWidth = this.textWidth('0000');
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.possession, x, y, width - possessionWidth);
        this.resetTextColor();
        this.drawText($gameParty.numItems(this._item), x, y, width, 'right');
    };

    drawEquipInfo(x, y) {
        const members = this.statusMembers();
        for (let i = 0; i < members.length; i++) {
            this.drawActorEquipInfo(x, y + this.lineHeight() * (i * 2.4), members[i]);
        }
    };

    statusMembers() {
        const start = this._pageIndex * this.pageSize();
        const end = start + this.pageSize();
        return $gameParty.members().slice(start, end);
    };

    pageSize() {
        return 4;
    };

    maxPages() {
        return Math.floor(($gameParty.size() + this.pageSize() - 1) / this.pageSize());
    };

    drawActorEquipInfo(x, y, actor) {
        const enabled = actor.canEquip(this._item);
        this.changePaintOpacity(enabled);
        this.resetTextColor();
        this.drawText(actor.name(), x, y, 168);
        const item1 = this.currentEquippedItem(actor, this._item.etypeId);
        if (enabled) {
            this.drawActorParamChange(x, y, actor, item1);
        }
        this.drawItemName(item1, x, y + this.lineHeight());
        this.changePaintOpacity(true);
    };

    drawActorParamChange(x, y, actor, item1) {
        const width = this.contents.width - this.textPadding() - x;
        const paramId = this.paramId();
        const change = this._item.params[paramId] - (item1 ? item1.params[paramId] : 0);
        this.changeTextColor(this.paramchangeTextColor(change));
        this.drawText((change > 0 ? '+' : '') + change, x, y, width, 'right');
    };

    paramId() {
        return DataManager.isWeapon(this._item) ? 2 : 3;
    };

    currentEquippedItem(actor, etypeId) {
        const list = [];
        const equips = actor.equips();
        const slots = actor.equipSlots();
        for (let i = 0; i < slots.length; i++) {
            if (slots[i] === etypeId) {
                list.push(equips[i]);
            }
        }
        const paramId = this.paramId();
        let worstParam = Number.MAX_VALUE;
        let worstItem = null;
        for (const l of list) {
            if (l?.params[paramId] < worstParam) {
                worstParam = l.params[paramId];
                worstItem = l;
            }
        }
        return worstItem;
    };

    update() {
        super.update();
        this.updatePage();
    };

    updatePage() {
        if (this.isPageChangeEnabled() && this.isPageChangeRequested()) {
            this.changePage();
        }
    };

    isPageChangeEnabled() {
        return this.visible && this.maxPages() >= 2;
    };

    isPageChangeRequested() {
        if (Input.isTriggered('shift')) {
            return true;
        }
        if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
            return true;
        }
        return false;
    };

    isTouchedInsideFrame() {
        const x = this.canvasToLocalX(TouchInput.x);
        const y = this.canvasToLocalY(TouchInput.y);
        return x >= 0 && y >= 0 && x < this.width && y < this.height;
    };

    changePage() {
        this._pageIndex = (this._pageIndex + 1) % this.maxPages();
        this.refresh();
        SoundManager.playCursor();
    };
};

//-----------------------------------------------------------------------------

// Window_NameEdit
//
// The window for editing an actor's name on the name input screen.
var Window_NameEdit = class extends Window_Base {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize(actor, maxLength) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        const width = this.windowWidth();
        const height = this.windowHeight();
        const x = (Graphics.boxWidth - width) / 2;
        const y = (Graphics.boxHeight - (height + this.fittingHeight(9) + 8)) / 2;
        super.initialize(x, y, width, height);
        this._actor = actor;
        this._name = actor.name().slice(0, this._maxLength);
        this._index = this._name.length;
        this._maxLength = maxLength;
        this._defaultName = this._name;
        this.deactivate();
        this.refresh();
        ImageManager.reserveFace(actor.faceName());
    };

    windowWidth() {
        return 480;
    };

    windowHeight() {
        return this.fittingHeight(4);
    };

    name() {
        return this._name;
    };

    restoreDefault() {
        this._name = this._defaultName;
        this._index = this._name.length;
        this.refresh();
        return this._name.length > 0;
    };

    add(ch) {
        if (this._index < this._maxLength) {
            this._name += ch;
            this._index++;
            this.refresh();
            return true;
        } else {
            return false;
        }
    };

    back() {
        if (this._index > 0) {
            this._index--;
            this._name = this._name.slice(0, this._index);
            this.refresh();
            return true;
        } else {
            return false;
        }
    };

    faceWidth() {
        return 144;
    };

    charWidth() {
        const text = $gameSystem.isJapanese() ? '\uff21' : 'A';
        return this.textWidth(text);
    };

    left() {
        const nameCenter = (this.contentsWidth() + this.faceWidth()) / 2;
        const nameWidth = (this._maxLength + 1) * this.charWidth();
        return Math.min(nameCenter - nameWidth / 2, this.contentsWidth() - nameWidth);
    };

    itemRect(index) {
        return {
            x: this.left() + index * this.charWidth(),
            y: 54,
            width: this.charWidth(),
            height: this.lineHeight()
        };
    };

    underlineRect(index) {
        const rect = this.itemRect(index);
        rect.x++;
        rect.y += rect.height - 4;
        rect.width -= 2;
        rect.height = 2;
        return rect;
    };

    underlineColor() {
        return this.normalColor();
    };

    drawUnderline(index) {
        const rect = this.underlineRect(index);
        const color = this.underlineColor();
        this.contents.paintOpacity = 48;
        this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color);
        this.contents.paintOpacity = 255;
    };

    drawChar(index) {
        const rect = this.itemRect(index);
        this.resetTextColor();
        this.drawText(this._name[index] || '', rect.x, rect.y);
    };

    refresh() {
        this.contents.clear();
        this.drawActorFace(this._actor, 0, 0);
        for (let i = 0; i < this._maxLength; i++) {
            this.drawUnderline(i);
        }
        for (let j = 0; j < this._name.length; j++) {
            this.drawChar(j);
        }
        const rect = this.itemRect(this._index);
        this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
    };
};

//-----------------------------------------------------------------------------

// Window_NameInput
//
// The window for selecting text characters on the name input screen.
var Window_NameInput = class extends Window_Selectable {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    static LATIN1 =
        [
            'A', 'B', 'C', 'D', 'E', 'a', 'b', 'c', 'd', 'e',
            'F', 'G', 'H', 'I', 'J', 'f', 'g', 'h', 'i', 'j',
            'K', 'L', 'M', 'N', 'O', 'k', 'l', 'm', 'n', 'o',
            'P', 'Q', 'R', 'S', 'T', 'p', 'q', 'r', 's', 't',
            'U', 'V', 'W', 'X', 'Y', 'u', 'v', 'w', 'x', 'y',
            'Z', '[', ']', '^', '_', 'z', '{', '}', '|', '~',
            '0', '1', '2', '3', '4', '!', '#', '$', '%', '&',
            '5', '6', '7', '8', '9', '(', ')', '*', '+', '-',
            '/', '=', '@', '<', '>', ':', ';', ' ', 'Page', 'OK'
        ];
    static LATIN2 =
        [
            'Á', 'É', 'Í', 'Ó', 'Ú', 'á', 'é', 'í', 'ó', 'ú',
            'À', 'È', 'Ì', 'Ò', 'Ù', 'à', 'è', 'ì', 'ò', 'ù',
            'Â', 'Ê', 'Î', 'Ô', 'Û', 'â', 'ê', 'î', 'ô', 'û',
            'Ä', 'Ë', 'Ï', 'Ö', 'Ü', 'ä', 'ë', 'ï', 'ö', 'ü',
            'Ā', 'Ē', 'Ī', 'Ō', 'Ū', 'ā', 'ē', 'ī', 'ō', 'ū',
            'Ã', 'Å', 'Æ', 'Ç', 'Ð', 'ã', 'å', 'æ', 'ç', 'ð',
            'Ñ', 'Õ', 'Ø', 'Š', 'Ŵ', 'ñ', 'õ', 'ø', 'š', 'ŵ',
            'Ý', 'Ŷ', 'Ÿ', 'Ž', 'Þ', 'ý', 'ÿ', 'ŷ', 'ž', 'þ',
            'Ĳ', 'Œ', 'ĳ', 'œ', 'ß', '«', '»', ' ', 'Page', 'OK'
        ];
    static RUSSIA =
        [
            'А', 'Б', 'В', 'Г', 'Д', 'а', 'б', 'в', 'г', 'д',
            'Е', 'Ё', 'Ж', 'З', 'И', 'е', 'ё', 'ж', 'з', 'и',
            'Й', 'К', 'Л', 'М', 'Н', 'й', 'к', 'л', 'м', 'н',
            'О', 'П', 'Р', 'С', 'Т', 'о', 'п', 'р', 'с', 'т',
            'У', 'Ф', 'Х', 'Ц', 'Ч', 'у', 'ф', 'х', 'ц', 'ч',
            'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'ш', 'щ', 'ъ', 'ы', 'ь',
            'Э', 'Ю', 'Я', '^', '_', 'э', 'ю', 'я', '%', '&',
            '0', '1', '2', '3', '4', '(', ')', '*', '+', '-',
            '5', '6', '7', '8', '9', ':', ';', ' ', '', 'OK'
        ];
    static JAPAN1 =
        [
            'あ', 'い', 'う', 'え', 'お', 'が', 'ぎ', 'ぐ', 'げ', 'ご',
            'か', 'き', 'く', 'け', 'こ', 'ざ', 'じ', 'ず', 'ぜ', 'ぞ',
            'さ', 'し', 'す', 'せ', 'そ', 'だ', 'ぢ', 'づ', 'で', 'ど',
            'た', 'ち', 'つ', 'て', 'と', 'ば', 'び', 'ぶ', 'べ', 'ぼ',
            'な', 'に', 'ぬ', 'ね', 'の', 'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ',
            'は', 'ひ', 'ふ', 'へ', 'ほ', 'ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ',
            'ま', 'み', 'む', 'め', 'も', 'っ', 'ゃ', 'ゅ', 'ょ', 'ゎ',
            'や', 'ゆ', 'よ', 'わ', 'ん', 'ー', '～', '・', '＝', '☆',
            'ら', 'り', 'る', 'れ', 'ろ', 'ゔ', 'を', '　', 'カナ', '決定'
        ];
    static JAPAN2 =
        [
            'ア', 'イ', 'ウ', 'エ', 'オ', 'ガ', 'ギ', 'グ', 'ゲ', 'ゴ',
            'カ', 'キ', 'ク', 'ケ', 'コ', 'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ',
            'サ', 'シ', 'ス', 'セ', 'ソ', 'ダ', 'ヂ', 'ヅ', 'デ', 'ド',
            'タ', 'チ', 'ツ', 'テ', 'ト', 'バ', 'ビ', 'ブ', 'ベ', 'ボ',
            'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'パ', 'ピ', 'プ', 'ペ', 'ポ',
            'ハ', 'ヒ', 'フ', 'ヘ', 'ホ', 'ァ', 'ィ', 'ゥ', 'ェ', 'ォ',
            'マ', 'ミ', 'ム', 'メ', 'モ', 'ッ', 'ャ', 'ュ', 'ョ', 'ヮ',
            'ヤ', 'ユ', 'ヨ', 'ワ', 'ン', 'ー', '～', '・', '＝', '☆',
            'ラ', 'リ', 'ル', 'レ', 'ロ', 'ヴ', 'ヲ', '　', '英数', '決定'
        ];
    static JAPAN3 =
        [
            'Ａ', 'Ｂ', 'Ｃ', 'Ｄ', 'Ｅ', 'ａ', 'ｂ', 'ｃ', 'ｄ', 'ｅ',
            'Ｆ', 'Ｇ', 'Ｈ', 'Ｉ', 'Ｊ', 'ｆ', 'ｇ', 'ｈ', 'ｉ', 'ｊ',
            'Ｋ', 'Ｌ', 'Ｍ', 'Ｎ', 'Ｏ', 'ｋ', 'ｌ', 'ｍ', 'ｎ', 'ｏ',
            'Ｐ', 'Ｑ', 'Ｒ', 'Ｓ', 'Ｔ', 'ｐ', 'ｑ', 'ｒ', 'ｓ', 'ｔ',
            'Ｕ', 'Ｖ', 'Ｗ', 'Ｘ', 'Ｙ', 'ｕ', 'ｖ', 'ｗ', 'ｘ', 'ｙ',
            'Ｚ', '［', '］', '＾', '＿', 'ｚ', '｛', '｝', '｜', '～',
            '０', '１', '２', '３', '４', '！', '＃', '＄', '％', '＆',
            '５', '６', '７', '８', '９', '（', '）', '＊', '＋', '－',
            '／', '＝', '＠', '＜', '＞', '：', '；', '　', 'かな', '決定'
        ];

    initialize(editWindow) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        const x = editWindow.x;
        const y = editWindow.y + editWindow.height + 8;
        const width = editWindow.width;
        const height = this.windowHeight();
        super.initialize(x, y, width, height);
        this._editWindow = editWindow;
        this._page = 0;
        this._index = 0;
        this.refresh();
        this.updateCursor();
        this.activate();
    };

    windowHeight() {
        return this.fittingHeight(9);
    };

    table() {
        if ($gameSystem.isJapanese()) {
            return [Window_NameInput.JAPAN1,
            Window_NameInput.JAPAN2,
            Window_NameInput.JAPAN3];
        } else if ($gameSystem.isRussian()) {
            return [Window_NameInput.RUSSIA];
        } else {
            return [Window_NameInput.LATIN1,
            Window_NameInput.LATIN2];
        }
    };

    maxCols() {
        return 10;
    };

    maxItems() {
        return 90;
    };

    character() {
        return this._index < 88 ? this.table()[this._page][this._index] : '';
    };

    isPageChange() {
        return this._index === 88;
    };

    isOk() {
        return this._index === 89;
    };

    itemRect(index) {
        return {
            x: index % 10 * 42 + Math.floor(index % 10 / 5) * 24,
            y: Math.floor(index / 10) * this.lineHeight(),
            width: 42,
            height: this.lineHeight()
        };
    };

    refresh() {
        const table = this.table();
        this.contents.clear();
        this.resetTextColor();
        for (let i = 0; i < 90; i++) {
            const rect = this.itemRect(i);
            rect.x += 3;
            rect.width -= 6;
            this.drawText(table[this._page][i], rect.x, rect.y, rect.width, 'center');
        }
    };

    updateCursor() {
        const rect = this.itemRect(this._index);
        this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
    };

    isCursorMovable() {
        return this.active;
    };

    cursorDown(wrap) {
        if (this._index < 80 || wrap) {
            this._index = (this._index + 10) % 90;
        }
    };

    cursorUp(wrap) {
        if (this._index >= 10 || wrap) {
            this._index = (this._index + 80) % 90;
        }
    };

    cursorRight(wrap) {
        if (this._index % 10 < 9) {
            this._index++;
        } else if (wrap) {
            this._index -= 9;
        }
    };

    cursorLeft(wrap) {
        if (this._index % 10 > 0) {
            this._index--;
        } else if (wrap) {
            this._index += 9;
        }
    };

    cursorPagedown() {
        this._page = (this._page + 1) % this.table().length;
        this.refresh();
    };

    cursorPageup() {
        this._page = (this._page + this.table().length - 1) % this.table().length;
        this.refresh();
    };

    processCursorMove() {
        const lastPage = this._page;
        super.processCursorMove();
        this.updateCursor();
        if (this._page !== lastPage) {
            SoundManager.playCursor();
        }
    };

    processHandling() {
        if (this.isOpen() && this.active) {
            if (Input.isTriggered('shift')) {
                this.processJump();
            }
            if (Input.isRepeated('cancel')) {
                this.processBack();
            }
            if (Input.isRepeated('ok')) {
                this.processOk();
            }
        }
    };

    isCancelEnabled() {
        return true;
    };

    processCancel() {
        this.processBack();
    };

    processJump() {
        if (this._index !== 89) {
            this._index = 89;
            SoundManager.playCursor();
        }
    };

    processBack() {
        if (this._editWindow.back()) {
            SoundManager.playCancel();
        }
    };

    processOk() {
        if (this.character()) {
            this.onNameAdd();
        } else if (this.isPageChange()) {
            SoundManager.playOk();
            this.cursorPagedown();
        } else if (this.isOk()) {
            this.onNameOk();
        }
    };

    onNameAdd() {
        if (this._editWindow.add(this.character())) {
            SoundManager.playOk();
        } else {
            SoundManager.playBuzzer();
        }
    };

    onNameOk() {
        if (this._editWindow.name() === '') {
            if (this._editWindow.restoreDefault()) {
                SoundManager.playOk();
            } else {
                SoundManager.playBuzzer();
            }
        } else {
            SoundManager.playOk();
            this.callOkHandler();
        }
    };
};

//-----------------------------------------------------------------------------

// Window_ChoiceList
//
// The window used for the event command [Show Choices].
class Window_ChoiceList extends Window_Command {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize(messageWindow) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        this._messageWindow = messageWindow;
        super.initialize(0, 0);
        this.openness = 0;
        this.deactivate();
        this._background = 0;
    };

    start() {
        this.updatePlacement();
        this.updateBackground();
        this.refresh();
        this.selectDefault();
        this.open();
        this.activate();
    };

    selectDefault() {
        this.select($gameMessage.choiceDefaultType());
    };

    updatePlacement() {
        const positionType = $gameMessage.choicePositionType();
        const messageY = this._messageWindow.y;
        this.width = this.windowWidth();
        this.height = this.windowHeight();
        switch (positionType) {
            case 0:
                this.x = 0;
                break;
            case 1:
                this.x = (Graphics.boxWidth - this.width) / 2;
                break;
            case 2:
                this.x = Graphics.boxWidth - this.width;
                break;
        }
        if (messageY >= Graphics.boxHeight / 2) {
            this.y = messageY - this.height;
        } else {
            this.y = messageY + this._messageWindow.height;
        }
    };

    updateBackground() {
        this._background = $gameMessage.choiceBackground();
        this.setBackgroundType(this._background);
    };

    windowWidth() {
        const width = this.maxChoiceWidth() + this.padding * 2;
        return Math.min(width, Graphics.boxWidth);
    };

    numVisibleRows() {
        const messageY = this._messageWindow.y;
        const messageHeight = this._messageWindow.height;
        const centerY = Graphics.boxHeight / 2;
        const choices = $gameMessage.choices();
        let numLines = choices.length;
        let maxLines = 8;
        if (messageY < centerY && messageY + messageHeight > centerY) {
            maxLines = 4;
        }
        if (numLines > maxLines) {
            numLines = maxLines;
        }
        return numLines;
    };

    maxChoiceWidth() {
        let maxWidth = 96;
        for (const choices of $gameMessage.choices()) {
            const choiceWidth = this.textWidthEx(choices) + this.textPadding() * 2;
            if (maxWidth < choiceWidth) {
                maxWidth = choiceWidth;
            }
        }
        return maxWidth;
    };

    textWidthEx(text) {
        return this.drawTextEx(text, 0, this.contents.height);
    };

    contentsHeight() {
        return this.maxItems() * this.itemHeight();
    };

    makeCommandList() {
        for (const choices of $gameMessage.choices()) {
            this.addCommand(choices, 'choice');
        }
    };

    drawItem(index) {
        const rect = this.itemRectForText(index);
        this.drawTextEx(this.commandName(index), rect.x, rect.y);
    };

    isCancelEnabled() {
        return $gameMessage.choiceCancelType() !== -1;
    };

    isOkTriggered() {
        return Input.isTriggered('ok');
    };

    callOkHandler() {
        $gameMessage.onChoice(this.index());
        this._messageWindow.terminateMessage();
        this.close();
    };

    callCancelHandler() {
        $gameMessage.onChoice($gameMessage.choiceCancelType());
        this._messageWindow.terminateMessage();
        this.close();
    };
};

//-----------------------------------------------------------------------------

// Window_NumberInput
//
// The window used for the event command [Input Number].
class Window_NumberInput extends Window_Selectable {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize(messageWindow) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        this._messageWindow = messageWindow;
        super.initialize(0, 0, 0, 0);
        this._number = 0;
        this._maxDigits = 1;
        this.openness = 0;
        this.createButtons();
        this.deactivate();
    };

    start() {
        this._maxDigits = $gameMessage.numInputMaxDigits();
        this._number = $gameVariables.value($gameMessage.numInputVariableId());
        this._number = this._number.clamp(0, Math.pow(10, this._maxDigits) - 1);
        this.updatePlacement();
        this.placeButtons();
        this.updateButtonsVisiblity();
        this.createContents();
        this.refresh();
        this.open();
        this.activate();
        this.select(0);
    };

    updatePlacement() {
        const messageY = this._messageWindow.y;
        const spacing = 8;
        this.width = this.windowWidth();
        this.height = this.windowHeight();
        this.x = (Graphics.boxWidth - this.width) / 2;
        if (messageY >= Graphics.boxHeight / 2) {
            this.y = messageY - this.height - spacing;
        } else {
            this.y = messageY + this._messageWindow.height + spacing;
        }
    };

    windowWidth() {
        return this.maxCols() * this.itemWidth() + this.padding * 2;
    };

    windowHeight() {
        return this.fittingHeight(1);
    };

    maxCols() {
        return this._maxDigits;
    };

    maxItems() {
        return this._maxDigits;
    };

    spacing() {
        return 0;
    };

    itemWidth() {
        return 32;
    };

    createButtons() {
        const bitmap = ImageManager.loadSystem('ButtonSet');
        const buttonWidth = 48;
        const buttonHeight = 48;
        this._buttons = [];
        for (let i = 0; i < 3; i++) {
            const button = new Sprite_Button();
            const x = buttonWidth * [1, 2, 4][i];
            const w = buttonWidth * (i === 2 ? 2 : 1);
            button.bitmap = bitmap;
            button.setColdFrame(x, 0, w, buttonHeight);
            button.setHotFrame(x, buttonHeight, w, buttonHeight);
            button.visible = false;
            this._buttons.push(button);
            this.addChild(button);
        }
        this._buttons[0].setClickHandler(this.onButtonDown.bind(this));
        this._buttons[1].setClickHandler(this.onButtonUp.bind(this));
        this._buttons[2].setClickHandler(this.onButtonOk.bind(this));
    };

    placeButtons() {
        const numButtons = this._buttons.length;
        const spacing = 16;
        let totalWidth = -spacing;
        for (let i = 0; i < numButtons; i++) {
            totalWidth += this._buttons[i].width + spacing;
        }
        let x = (this.width - totalWidth) / 2;
        for (let j = 0; j < numButtons; j++) {
            const button = this._buttons[j];
            button.x = x;
            button.y = this.buttonY();
            x += button.width + spacing;
        }
    };

    updateButtonsVisiblity() {
        if (TouchInput.date > Input.date) {
            this.showButtons();
        } else {
            this.hideButtons();
        }
    };

    showButtons() {
        for (const button of this._buttons) {
            button.visible = true;
        }
    };

    hideButtons() {
        for (const button of this._buttons) {
            button.visible = false;
        }
    };

    buttonY() {
        const spacing = 8;
        if (this._messageWindow.y >= Graphics.boxHeight / 2) {
            return 0 - this._buttons[0].height - spacing;
        } else {
            return this.height + spacing;
        }
    };

    update() {
        super.update();
        this.processDigitChange();
    };

    processDigitChange() {
        if (this.isOpenAndActive()) {
            if (Input.isRepeated('up')) {
                this.changeDigit(true);
            } else if (Input.isRepeated('down')) {
                this.changeDigit(false);
            }
        }
    };

    changeDigit(up) {
        const index = this.index();
        const place = Math.pow(10, this._maxDigits - 1 - index);
        let n = Math.floor(this._number / place) % 10;
        this._number -= n * place;
        if (up) {
            n = (n + 1) % 10;
        } else {
            n = (n + 9) % 10;
        }
        this._number += n * place;
        this.refresh();
        SoundManager.playCursor();
    };

    isTouchOkEnabled() {
        return false;
    };

    isOkEnabled() {
        return true;
    };

    isCancelEnabled() {
        return false;
    };

    isOkTriggered() {
        return Input.isTriggered('ok');
    };

    processOk() {
        SoundManager.playOk();
        $gameVariables.setValue($gameMessage.numInputVariableId(), this._number);
        this._messageWindow.terminateMessage();
        this.updateInputData();
        this.deactivate();
        this.close();
    };

    drawItem(index) {
        const rect = this.itemRect(index);
        const align = 'center';
        const s = this._number.padZero(this._maxDigits);
        const c = s.slice(index, index + 1);
        this.resetTextColor();
        this.drawText(c, rect.x, rect.y, rect.width, align);
    };

    onButtonUp() {
        this.changeDigit(true);
    };

    onButtonDown() {
        this.changeDigit(false);
    };

    onButtonOk() {
        this.processOk();
        this.hideButtons();
    };
};

//-----------------------------------------------------------------------------

// Window_EventItem
//
// The window used for the event command [Select Item].
class Window_EventItem extends Window_ItemList {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize(messageWindow) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        this._messageWindow = messageWindow;
        const width = Graphics.boxWidth;
        const height = this.windowHeight();
        super.initialize(0, 0, width, height);
        this.openness = 0;
        this.deactivate();
        this.setHandler('ok', this.onOk.bind(this));
        this.setHandler('cancel', this.onCancel.bind(this));
    };

    windowHeight() {
        return this.fittingHeight(this.numVisibleRows());
    };

    numVisibleRows() {
        return 4;
    };

    start() {
        this.refresh();
        this.updatePlacement();
        this.select(0);
        this.open();
        this.activate();
    };

    updatePlacement() {
        if (this._messageWindow.y >= Graphics.boxHeight / 2) {
            this.y = 0;
        } else {
            this.y = Graphics.boxHeight - this.height;
        }
    };

    includes(item) {
        const itypeId = $gameMessage.itemChoiceItypeId();
        return DataManager.isItem(item) && item.itypeId === itypeId;
    };

    isEnabled(item) {
        return true;
    };

    onOk() {
        const item = this.item();
        const itemId = item ? item.id : 0;
        $gameVariables.setValue($gameMessage.itemChoiceVariableId(), itemId);
        this._messageWindow.terminateMessage();
        this.close();
    };

    onCancel() {
        $gameVariables.setValue($gameMessage.itemChoiceVariableId(), 0);
        this._messageWindow.terminateMessage();
        this.close();
    };
};

//-----------------------------------------------------------------------------

// Window_Message
//
// The window for displaying text messages.
var Window_Message = class extends Window_Base {
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
        const width = this.windowWidth();
        const height = this.windowHeight();
        const x = (Graphics.boxWidth - width) / 2;
        super.initialize(x, 0, width, height);
        this.openness = 0;
        this.initMembers();
        this.createSubWindows();
        this.updatePlacement();
    };

    initMembers() {
        this._imageReservationId = Utils.generateRuntimeId();
        this._background = 0;
        this._positionType = 2;
        this._waitCount = 0;
        this._faceBitmap = null;
        this._textState = null;
        this.clearFlags();
    };

    subWindows() {
        return [this._goldWindow, this._choiceWindow,
        this._numberWindow, this._itemWindow];
    };

    createSubWindows() {
        this._goldWindow = new Window_Gold(0, 0);
        this._goldWindow.x = Graphics.boxWidth - this._goldWindow.width;
        this._goldWindow.openness = 0;
        this._choiceWindow = new Window_ChoiceList(this);
        this._numberWindow = new Window_NumberInput(this);
        this._itemWindow = new Window_EventItem(this);
    };

    windowWidth() {
        return Graphics.boxWidth;
    };

    windowHeight() {
        return this.fittingHeight(this.numVisibleRows());
    };

    clearFlags() {
        this._showFast = false;
        this._lineShowFast = false;
        this._pauseSkip = false;
    };

    numVisibleRows() {
        return 4;
    };

    update() {
        this.checkToNotClose();
        super.update();
        while (!this.isOpening() && !this.isClosing()) {
            if (this.updateWait()) {
                return;
            } else if (this.updateLoading()) {
                return;
            } else if (this.updateInput()) {
                return;
            } else if (this.updateMessage()) {
                return;
            } else if (this.canStart()) {
                this.startMessage();
            } else {
                this.startInput();
                return;
            }
        }
    };

    checkToNotClose() {
        if (this.isClosing() && this.isOpen()) {
            if (this.doesContinue()) {
                this.open();
            }
        }
    };

    canStart() {
        return $gameMessage.hasText() && !$gameMessage.scrollMode();
    };

    startMessage() {
        this._textState = {};
        this._textState.index = 0;
        this._textState.text = this.convertEscapeCharacters($gameMessage.allText());
        this.newPage(this._textState);
        this.updatePlacement();
        this.updateBackground();
        this.open();
    };

    updatePlacement() {
        this._positionType = $gameMessage.positionType();
        this.y = this._positionType * (Graphics.boxHeight - this.height) / 2;
        this._goldWindow.y = this.y > 0 ? 0 : Graphics.boxHeight - this._goldWindow.height;
    };

    updateBackground() {
        this._background = $gameMessage.background();
        this.setBackgroundType(this._background);
    };

    terminateMessage() {
        this.close();
        this._goldWindow.close();
        $gameMessage.clear();
    };

    updateWait() {
        if (this._waitCount > 0) {
            this._waitCount--;
            return true;
        } else {
            return false;
        }
    };

    updateLoading() {
        if (this._faceBitmap) {
            if (this._faceBitmap.isReady()) {
                this.drawMessageFace();
                this._faceBitmap = null;
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    };

    updateInput() {
        if (this.isAnySubWindowActive()) {
            return true;
        }
        if (this.pause) {
            if (this.isTriggered()) {
                Input.update();
                this.pause = false;
                if (!this._textState) {
                    this.terminateMessage();
                }
            }
            return true;
        }
        return false;
    };

    isAnySubWindowActive() {
        return (this._choiceWindow.active ||
            this._numberWindow.active ||
            this._itemWindow.active);
    };

    updateMessage() {
        if (this._textState) {
            while (!this.isEndOfText(this._textState)) {
                if (this.needsNewPage(this._textState)) {
                    this.newPage(this._textState);
                }
                this.updateShowFast();
                this.processCharacter(this._textState);
                if (!this._showFast && !this._lineShowFast) {
                    break;
                }
                if (this.pause || this._waitCount > 0) {
                    break;
                }
            }
            if (this.isEndOfText(this._textState)) {
                this.onEndOfText();
            }
            return true;
        } else {
            return false;
        }
    };

    onEndOfText() {
        if (!this.startInput()) {
            if (!this._pauseSkip) {
                this.startPause();
            } else {
                this.terminateMessage();
            }
        }
        this._textState = null;
    };

    startInput() {
        if ($gameMessage.isChoice()) {
            this._choiceWindow.start();
            return true;
        } else if ($gameMessage.isNumberInput()) {
            this._numberWindow.start();
            return true;
        } else if ($gameMessage.isItemChoice()) {
            this._itemWindow.start();
            return true;
        } else {
            return false;
        }
    };

    isTriggered() {
        return (Input.isRepeated('ok') ||
            TouchInput.isRepeated());
    };

    doesContinue() {
        return ($gameMessage.hasText() && !$gameMessage.scrollMode() &&
            !this.areSettingsChanged());
    };

    areSettingsChanged() {
        return (this._background !== $gameMessage.background() ||
            this._positionType !== $gameMessage.positionType());
    };

    updateShowFast() {
        if (this.isTriggered()) {
            this._showFast = true;
        }
    };

    newPage(textState) {
        this.contents.clear();
        this.resetFontSettings();
        this.clearFlags();
        this.loadMessageFace();
        textState.x = this.newLineX();
        textState.y = 0;
        textState.left = this.newLineX();
        textState.height = this.calcTextHeight(textState, false);
    };

    loadMessageFace() {
        this._faceBitmap = ImageManager.reserveFace($gameMessage.faceName(), 0, this._imageReservationId);
    };

    drawMessageFace() {
        this.drawFace($gameMessage.faceName(), $gameMessage.faceIndex(), 0, 0);
        ImageManager.releaseReservation(this._imageReservationId);
    };

    newLineX() {
        return $gameMessage.faceName() === '' ? 0 : 168;
    };

    processNewLine(textState) {
        this._lineShowFast = false;
        super.processNewLine(textState);
        if (this.needsNewPage(textState)) {
            this.startPause();
        }
    };

    processNewPage(textState) {
        super.processNewPage(textState);
        if (textState.text[textState.index] === '\n') {
            textState.index++;
        }
        textState.y = this.contents.height;
        this.startPause();
    };

    isEndOfText(textState) {
        return textState.index >= textState.text.length;
    };

    needsNewPage(textState) {
        return (!this.isEndOfText(textState) &&
            textState.y + textState.height > this.contents.height);
    };

    processEscapeCharacter(code, textState) {
        switch (code) {
            case '$':
                this._goldWindow.open();
                break;
            case '.':
                this.startWait(15);
                break;
            case '|':
                this.startWait(60);
                break;
            case '!':
                this.startPause();
                break;
            case '>':
                this._lineShowFast = true;
                break;
            case '<':
                this._lineShowFast = false;
                break;
            case '^':
                this._pauseSkip = true;
                break;
            default:
                super.processEscapeCharacter(code, textState);
                break;
        }
    };

    startWait(count) {
        this._waitCount = count;
    };

    startPause() {
        this.startWait(10);
        this.pause = true;
    };
};

//-----------------------------------------------------------------------------

// Window_ScrollText
//
// The window for displaying scrolling text. No frame is displayed, but it
// is handled as a window for convenience.
var Window_ScrollText = class extends Window_Base {
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
        const width = Graphics.boxWidth;
        const height = Graphics.boxHeight;
        super.initialize(0, 0, width, height);
        this.opacity = 0;
        this.hide();
        this._text = '';
        this._allTextHeight = 0;
    };

    update() {
        super.update();
        if ($gameMessage.scrollMode()) {
            if (this._text) {
                this.updateMessage();
            }
            if (!this._text && $gameMessage.hasText()) {
                this.startMessage();
            }
        }
    };

    startMessage() {
        this._text = $gameMessage.allText();
        this.refresh();
        this.show();
    };

    refresh() {
        const textState = { index: 0 };
        textState.text = this.convertEscapeCharacters(this._text);
        this.resetFontSettings();
        this._allTextHeight = this.calcTextHeight(textState, true);
        this.createContents();
        this.origin.y = -this.height;
        this.drawTextEx(this._text, this.textPadding(), 1);
    };

    contentsHeight() {
        return Math.max(this._allTextHeight, 1);
    };

    updateMessage() {
        this.origin.y += this.scrollSpeed();
        if (this.origin.y >= this.contents.height) {
            this.terminateMessage();
        }
    };

    scrollSpeed() {
        let speed = $gameMessage.scrollSpeed() / 2;
        if (this.isFastForward()) {
            speed *= this.fastForwardRate();
        }
        return speed;
    };

    isFastForward() {
        if ($gameMessage.scrollNoFast()) {
            return false;
        } else {
            return (Input.isPressed('ok') || Input.isPressed('shift') ||
                TouchInput.isPressed());
        }
    };

    fastForwardRate() {
        return 3;
    };

    terminateMessage() {
        this._text = null;
        $gameMessage.clear();
        this.hide();
    };
};

//-----------------------------------------------------------------------------

// Window_MapName
//
// The window for displaying the map name on the map screen.
var Window_MapName = class extends Window_Base {
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
        const wight = this.windowWidth();
        const height = this.windowHeight();
        super.initialize(0, 0, wight, height);
        this.opacity = 0;
        this.contentsOpacity = 0;
        this._showCount = 0;
        this.refresh();
    };

    windowWidth() {
        return 360;
    };

    windowHeight() {
        return this.fittingHeight(1);
    };

    update() {
        super.update();
        if (this._showCount > 0 && $gameMap.isNameDisplayEnabled()) {
            this.updateFadeIn();
            this._showCount--;
        } else {
            this.updateFadeOut();
        }
    };

    updateFadeIn() {
        this.contentsOpacity += 16;
    };

    updateFadeOut() {
        this.contentsOpacity -= 16;
    };

    open() {
        this.refresh();
        this._showCount = 150;
    };

    close() {
        this._showCount = 0;
    };

    refresh() {
        this.contents.clear();
        if ($gameMap.displayName()) {
            const width = this.contentsWidth();
            this.drawBackground(0, 0, width, this.lineHeight());
            this.drawText($gameMap.displayName(), 0, 0, width, 'center');
        }
    };

    drawBackground(x, y, width, height) {
        const color1 = this.dimColor1();
        const color2 = this.dimColor2();
        this.contents.gradientFillRect(x, y, width / 2, height, color2, color1);
        this.contents.gradientFillRect(x + width / 2, y, width / 2, height, color1, color2);
    };
};

//-----------------------------------------------------------------------------

// Window_BattleLog
//
// The window for displaying battle progress. No frame is displayed, but it is
// handled as a window for convenience.
var Window_BattleLog = class extends Window_Selectable {
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
        const width = this.windowWidth();
        const height = this.windowHeight();
        super.initialize(0, 0, width, height);
        this.opacity = 0;
        this._lines = [];
        this._methods = [];
        this._waitCount = 0;
        this._waitMode = '';
        this._baseLineStack = [];
        this._spriteset = null;
        this.createBackBitmap();
        this.createBackSprite();
        this.refresh();
    };

    setSpriteset(spriteset) {
        this._spriteset = spriteset;
    };

    windowWidth() {
        return Graphics.boxWidth;
    };

    windowHeight() {
        return this.fittingHeight(this.maxLines());
    };

    maxLines() {
        return 10;
    };

    createBackBitmap() {
        this._backBitmap = new Bitmap(this.width, this.height);
    };

    createBackSprite() {
        this._backSprite = new Sprite();
        this._backSprite.bitmap = this._backBitmap;
        this._backSprite.y = this.y;
        this.addChildToBack(this._backSprite);
    };

    numLines() {
        return this._lines.length;
    };

    messageSpeed() {
        return 16;
    };

    isBusy() {
        return this._waitCount > 0 || this._waitMode || this._methods.length > 0;
    };

    update() {
        if (!this.updateWait()) {
            this.callNextMethod();
        }
    };

    updateWait() {
        return this.updateWaitCount() || this.updateWaitMode();
    };

    updateWaitCount() {
        if (this._waitCount > 0) {
            this._waitCount -= this.isFastForward() ? 3 : 1;
            if (this._waitCount < 0) {
                this._waitCount = 0;
            }
            return true;
        }
        return false;
    };

    updateWaitMode() {
        let waiting = false;
        switch (this._waitMode) {
            case 'effect':
                waiting = this._spriteset.isEffecting();
                break;
            case 'movement':
                waiting = this._spriteset.isAnyoneMoving();
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

    callNextMethod() {
        if (this._methods.length > 0) {
            const method = this._methods.shift();
            if (method.name && this[method.name]) {
                this[method.name].apply(this, method.params);
            } else {
                throw new Error('Method not found: ' + method.name);
            }
        }
    };

    isFastForward() {
        return (Input.isLongPressed('ok') || Input.isPressed('shift') ||
            TouchInput.isLongPressed());
    };

    push(methodName) {
        const methodArgs = Array.prototype.slice.call(arguments, 1);
        this._methods.push({ name: methodName, params: methodArgs });
    };

    clear() {
        this._lines = [];
        this._baseLineStack = [];
        this.refresh();
    };

    wait() {
        this._waitCount = this.messageSpeed();
    };

    waitForEffect() {
        this.setWaitMode('effect');
    };

    waitForMovement() {
        this.setWaitMode('movement');
    };

    addText(text) {
        this._lines.push(text);
        this.refresh();
        this.wait();
    };

    pushBaseLine() {
        this._baseLineStack.push(this._lines.length);
    };

    popBaseLine() {
        const baseLine = this._baseLineStack.pop();
        while (this._lines.length > baseLine) {
            this._lines.pop();
        }
    };

    waitForNewLine() {
        let baseLine = 0;
        if (this._baseLineStack.length > 0) {
            baseLine = this._baseLineStack[this._baseLineStack.length - 1];
        }
        if (this._lines.length > baseLine) {
            this.wait();
        }
    };

    popupDamage(target) {
        target.startDamagePopup();
    };

    performActionStart(subject, action) {
        subject.performActionStart(action);
    };

    performAction(subject, action) {
        subject.performAction(action);
    };

    performActionEnd(subject) {
        subject.performActionEnd();
    };

    performDamage(target) {
        target.performDamage();
    };

    performMiss(target) {
        target.performMiss();
    };

    performRecovery(target) {
        target.performRecovery();
    };

    performEvasion(target) {
        target.performEvasion();
    };

    performMagicEvasion(target) {
        target.performMagicEvasion();
    };

    performCounter(target) {
        target.performCounter();
    };

    performReflection(target) {
        target.performReflection();
    };

    performSubstitute(substitute, target) {
        substitute.performSubstitute(target);
    };

    performCollapse(target) {
        target.performCollapse();
    };

    showAnimation(subject, targets, animationId) {
        if (animationId < 0) {
            this.showAttackAnimation(subject, targets);
        } else {
            this.showNormalAnimation(targets, animationId);
        }
    };

    showAttackAnimation(subject, targets) {
        if (subject.isActor()) {
            this.showActorAttackAnimation(subject, targets);
        } else {
            this.showEnemyAttackAnimation(subject, targets);
        }
    };

    showActorAttackAnimation(subject, targets) {
        this.showNormalAnimation(targets, subject.attackAnimationId1(), false);
        this.showNormalAnimation(targets, subject.attackAnimationId2(), true);
    };

    showEnemyAttackAnimation(subject, targets) {
        SoundManager.playEnemyAttack();
    };

    showNormalAnimation(targets, animationId, mirror) {
        const animation = $dataAnimations[animationId];
        if (animation) {
            let delay = this.animationBaseDelay();
            const nextDelay = this.animationNextDelay();
            for (const target of targets) {
                target.startAnimation(animationId, mirror, delay);
                delay += nextDelay;
            }
        }
    };

    animationBaseDelay() {
        return 8;
    };

    animationNextDelay() {
        return 12;
    };

    refresh() {
        this.drawBackground();
        this.contents.clear();
        for (let i = 0; i < this._lines.length; i++) {
            this.drawLineText(i);
        }
    };

    drawBackground() {
        const rect = this.backRect();
        const color = this.backColor();
        this._backBitmap.clear();
        this._backBitmap.paintOpacity = this.backPaintOpacity();
        this._backBitmap.fillRect(rect.x, rect.y, rect.width, rect.height, color);
        this._backBitmap.paintOpacity = 255;
    };

    backRect() {
        return {
            x: 0,
            y: this.padding,
            width: this.width,
            height: this.numLines() * this.lineHeight()
        };
    };

    backColor() {
        return '#000000';
    };

    backPaintOpacity() {
        return 64;
    };

    drawLineText(index) {
        const rect = this.itemRectForText(index);
        this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
        this.drawTextEx(this._lines[index], rect.x, rect.y, rect.width);
    };

    startTurn() {
        this.push('wait');
    };

    startAction(subject, action, targets) {
        const item = action.item();
        this.push('performActionStart', subject, action);
        this.push('waitForMovement');
        this.push('performAction', subject, action);
        this.push('showAnimation', subject, targets.clone(), item.animationId);
        this.displayAction(subject, item);
    };

    endAction(subject) {
        this.push('waitForNewLine');
        this.push('clear');
        this.push('performActionEnd', subject);
    };

    displayCurrentState(subject) {
        const stateText = subject.mostImportantStateText();
        if (stateText) {
            this.push('addText', subject.name() + stateText);
            this.push('wait');
            this.push('clear');
        }
    };

    displayRegeneration(subject) {
        this.push('popupDamage', subject);
    };

    displayAction(subject, item) {
        const numMethods = this._methods.length;
        if (DataManager.isSkill(item)) {
            if (item.message1) {
                this.push('addText', subject.name() + item.message1.format(item.name));
            }
            if (item.message2) {
                this.push('addText', item.message2.format(item.name));
            }
        } else {
            this.push('addText', TextManager.useItem.format(subject.name(), item.name));
        }
        if (this._methods.length === numMethods) {
            this.push('wait');
        }
    };

    displayCounter(target) {
        this.push('performCounter', target);
        this.push('addText', TextManager.counterAttack.format(target.name()));
    };

    displayReflection(target) {
        this.push('performReflection', target);
        this.push('addText', TextManager.magicReflection.format(target.name()));
    };

    displaySubstitute(substitute, target) {
        const substName = substitute.name();
        this.push('performSubstitute', substitute, target);
        this.push('addText', TextManager.substitute.format(substName, target.name()));
    };

    displayActionResults(subject, target) {
        if (target.result().used) {
            this.push('pushBaseLine');
            this.displayCritical(target);
            this.push('popupDamage', target);
            this.push('popupDamage', subject);
            this.displayDamage(target);
            this.displayAffectedStatus(target);
            this.displayFailure(target);
            this.push('waitForNewLine');
            this.push('popBaseLine');
        }
    };

    displayFailure(target) {
        if (target.result().isHit() && !target.result().success) {
            this.push('addText', TextManager.actionFailure.format(target.name()));
        }
    };

    displayCritical(target) {
        if (target.result().critical) {
            if (target.isActor()) {
                this.push('addText', TextManager.criticalToActor);
            } else {
                this.push('addText', TextManager.criticalToEnemy);
            }
        }
    };

    displayDamage(target) {
        if (target.result().missed) {
            this.displayMiss(target);
        } else if (target.result().evaded) {
            this.displayEvasion(target);
        } else {
            this.displayHpDamage(target);
            this.displayMpDamage(target);
            this.displayTpDamage(target);
        }
    };

    displayMiss(target) {
        let fmt;
        if (target.result().physical) {
            fmt = target.isActor() ? TextManager.actorNoHit : TextManager.enemyNoHit;
            this.push('performMiss', target);
        } else {
            fmt = TextManager.actionFailure;
        }
        this.push('addText', fmt.format(target.name()));
    };

    displayEvasion(target) {
        let fmt;
        if (target.result().physical) {
            fmt = TextManager.evasion;
            this.push('performEvasion', target);
        } else {
            fmt = TextManager.magicEvasion;
            this.push('performMagicEvasion', target);
        }
        this.push('addText', fmt.format(target.name()));
    };

    displayHpDamage(target) {
        if (target.result().hpAffected) {
            if (target.result().hpDamage > 0 && !target.result().drain) {
                this.push('performDamage', target);
            }
            if (target.result().hpDamage < 0) {
                this.push('performRecovery', target);
            }
            this.push('addText', this.makeHpDamageText(target));
        }
    };

    displayMpDamage(target) {
        if (target.isAlive() && target.result().mpDamage !== 0) {
            if (target.result().mpDamage < 0) {
                this.push('performRecovery', target);
            }
            this.push('addText', this.makeMpDamageText(target));
        }
    };

    displayTpDamage(target) {
        if (target.isAlive() && target.result().tpDamage !== 0) {
            if (target.result().tpDamage < 0) {
                this.push('performRecovery', target);
            }
            this.push('addText', this.makeTpDamageText(target));
        }
    };

    displayAffectedStatus(target) {
        if (target.result().isStatusAffected()) {
            this.push('pushBaseLine');
            this.displayChangedStates(target);
            this.displayChangedBuffs(target);
            this.push('waitForNewLine');
            this.push('popBaseLine');
        }
    };

    displayAutoAffectedStatus(target) {
        if (target.result().isStatusAffected()) {
            this.displayAffectedStatus(target, null);
            this.push('clear');
        }
    };

    displayChangedStates(target) {
        this.displayAddedStates(target);
        this.displayRemovedStates(target);
    };

    displayAddedStates(target) {
        for (const state of target.result().addedStateObjects()) {
            const stateMsg = target.isActor() ? state.message1 : state.message2;
            if (state.id === target.deathStateId()) {
                this.push('performCollapse', target);
            }
            if (stateMsg) {
                this.push('popBaseLine');
                this.push('pushBaseLine');
                this.push('addText', target.name() + stateMsg);
                this.push('waitForEffect');
            }
        }
    };

    displayRemovedStates(target) {
        for (const state of target.result().removedStateObjects()) {
            if (state.message4) {
                this.push('popBaseLine');
                this.push('pushBaseLine');
                this.push('addText', target.name() + state.message4);
            }
        };
    };

    displayChangedBuffs(target) {
        const result = target.result();
        this.displayBuffs(target, result.addedBuffs, TextManager.buffAdd);
        this.displayBuffs(target, result.addedDebuffs, TextManager.debuffAdd);
        this.displayBuffs(target, result.removedBuffs, TextManager.buffRemove);
    };

    displayBuffs(target, buffs, fmt) {
        for (const paramId of buffs) {
            this.push('popBaseLine');
            this.push('pushBaseLine');
            this.push('addText', fmt.format(target.name(), TextManager.param(paramId)));
        };
    };

    makeHpDamageText(target) {
        const result = target.result();
        const damage = result.hpDamage;
        const isActor = target.isActor();
        let fmt;
        if (damage > 0 && result.drain) {
            fmt = isActor ? TextManager.actorDrain : TextManager.enemyDrain;
            return fmt.format(target.name(), TextManager.hp, damage);
        } else if (damage > 0) {
            fmt = isActor ? TextManager.actorDamage : TextManager.enemyDamage;
            return fmt.format(target.name(), damage);
        } else if (damage < 0) {
            fmt = isActor ? TextManager.actorRecovery : TextManager.enemyRecovery;
            return fmt.format(target.name(), TextManager.hp, -damage);
        } else {
            fmt = isActor ? TextManager.actorNoDamage : TextManager.enemyNoDamage;
            return fmt.format(target.name());
        }
    };

    makeMpDamageText(target) {
        const result = target.result();
        const damage = result.mpDamage;
        const isActor = target.isActor();
        let fmt;
        if (damage > 0 && result.drain) {
            fmt = isActor ? TextManager.actorDrain : TextManager.enemyDrain;
            return fmt.format(target.name(), TextManager.mp, damage);
        } else if (damage > 0) {
            fmt = isActor ? TextManager.actorLoss : TextManager.enemyLoss;
            return fmt.format(target.name(), TextManager.mp, damage);
        } else if (damage < 0) {
            fmt = isActor ? TextManager.actorRecovery : TextManager.enemyRecovery;
            return fmt.format(target.name(), TextManager.mp, -damage);
        } else {
            return '';
        }
    };

    makeTpDamageText(target) {
        const result = target.result();
        const damage = result.tpDamage;
        const isActor = target.isActor();
        let fmt;
        if (damage > 0) {
            fmt = isActor ? TextManager.actorLoss : TextManager.enemyLoss;
            return fmt.format(target.name(), TextManager.tp, damage);
        } else if (damage < 0) {
            fmt = isActor ? TextManager.actorGain : TextManager.enemyGain;
            return fmt.format(target.name(), TextManager.tp, -damage);
        } else {
            return '';
        }
    };
};

//-----------------------------------------------------------------------------

// Window_PartyCommand
//
// The window for selecting whether to fight or escape on the battle screen.
var Window_PartyCommand = class extends Window_Command {
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
        const y = Graphics.boxHeight - this.windowHeight();
        super.initialize(0, y);
        this.openness = 0;
        this.deactivate();
    };

    windowWidth() {
        return 192;
    };

    numVisibleRows() {
        return 4;
    };

    makeCommandList() {
        this.addCommand(TextManager.fight, 'fight');
        this.addCommand(TextManager.escape, 'escape', BattleManager.canEscape());
    };

    setup() {
        this.clearCommandList();
        this.makeCommandList();
        this.refresh();
        this.select(0);
        this.activate();
        this.open();
    };
};

//-----------------------------------------------------------------------------

// Window_ActorCommand
//
// The window for selecting an actor's action on the battle screen.
var Window_ActorCommand = class extends Window_Command {
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
        const y = Graphics.boxHeight - this.windowHeight();
        super.initialize(0, y);
        this.openness = 0;
        this.deactivate();
        this._actor = null;
    };

    windowWidth() {
        return 192;
    };

    numVisibleRows() {
        return 4;
    };

    makeCommandList() {
        if (this._actor) {
            this.addAttackCommand();
            this.addSkillCommands();
            this.addGuardCommand();
            this.addItemCommand();
        }
    };

    addAttackCommand() {
        this.addCommand(TextManager.attack, 'attack', this._actor.canAttack());
    };

    addSkillCommands() {
        const skillTypes = this._actor.addedSkillTypes();
        skillTypes.sort((a, b) => a - b);
        for (const stypeId of skillTypes) {
            const name = $dataSystem.skillTypes[stypeId];
            this.addCommand(name, 'skill', true, stypeId);
        }
    };

    addGuardCommand() {
        this.addCommand(TextManager.guard, 'guard', this._actor.canGuard());
    };

    addItemCommand() {
        this.addCommand(TextManager.item, 'item');
    };

    setup(actor) {
        this._actor = actor;
        this.clearCommandList();
        this.makeCommandList();
        this.refresh();
        this.selectLast();
        this.activate();
        this.open();
    };

    processOk() {
        if (this._actor) {
            if (ConfigManager.commandRemember) {
                this._actor.setLastCommandSymbol(this.currentSymbol());
            } else {
                this._actor.setLastCommandSymbol('');
            }
        }
        super.processOk();
    };

    selectLast() {
        this.select(0);
        if (this._actor && ConfigManager.commandRemember) {
            const symbol = this._actor.lastCommandSymbol();
            this.selectSymbol(symbol);
            if (symbol === 'skill') {
                const skill = this._actor.lastBattleSkill();
                if (skill) {
                    this.selectExt(skill.stypeId);
                }
            }
        }
    };
};

//-----------------------------------------------------------------------------

// Window_BattleStatus
//
// The window for displaying the status of party members on the battle screen.
var Window_BattleStatus = class extends Window_Selectable {
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
        const width = this.windowWidth();
        const height = this.windowHeight();
        const x = Graphics.boxWidth - width;
        const y = Graphics.boxHeight - height;
        super.initialize(x, y, width, height);
        this.refresh();
        this.openness = 0;
    };

    windowWidth() {
        return Graphics.boxWidth - 192;
    };

    windowHeight() {
        return this.fittingHeight(this.numVisibleRows());
    };

    numVisibleRows() {
        return 4;
    };

    maxItems() {
        return $gameParty.battleMembers().length;
    };

    refresh() {
        this.contents.clear();
        this.drawAllItems();
    };

    drawItem(index) {
        const actor = $gameParty.battleMembers()[index];
        this.drawBasicArea(this.basicAreaRect(index), actor);
        this.drawGaugeArea(this.gaugeAreaRect(index), actor);
    };

    basicAreaRect(index) {
        const rect = this.itemRectForText(index);
        rect.width -= this.gaugeAreaWidth() + 15;
        return rect;
    };

    gaugeAreaRect(index) {
        const rect = this.itemRectForText(index);
        rect.x += rect.width - this.gaugeAreaWidth();
        rect.width = this.gaugeAreaWidth();
        return rect;
    };

    gaugeAreaWidth() {
        return 330;
    };

    drawBasicArea(rect, actor) {
        this.drawActorName(actor, rect.x + 0, rect.y, 150);
        this.drawActorIcons(actor, rect.x + 156, rect.y, rect.width - 156);
    };

    drawGaugeArea(rect, actor) {
        if ($dataSystem.optDisplayTp) {
            this.drawGaugeAreaWithTp(rect, actor);
        } else {
            this.drawGaugeAreaWithoutTp(rect, actor);
        }
    };

    drawGaugeAreaWithTp(rect, actor) {
        this.drawActorHp(actor, rect.x + 0, rect.y, 108);
        this.drawActorMp(actor, rect.x + 123, rect.y, 96);
        this.drawActorTp(actor, rect.x + 234, rect.y, 96);
    };

    drawGaugeAreaWithoutTp(rect, actor) {
        this.drawActorHp(actor, rect.x + 0, rect.y, 201);
        this.drawActorMp(actor, rect.x + 216, rect.y, 114);
    };
};

//-----------------------------------------------------------------------------

// Window_BattleActor
//
// The window for selecting a target actor on the battle screen.
var Window_BattleActor = class extends Window_BattleStatus {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize(x, y) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize();
        this.x = x;
        this.y = y;
        this.openness = 255;
        this.hide();
    };

    show() {
        this.select(0);
        super.show();
    };

    hide() {
        super.hide();
        $gameParty.select(null);
    };

    select(index) {
        super.select(index);
        $gameParty.select(this.actor());
    };

    actor() {
        return $gameParty.members()[this.index()];
    };
};

//-----------------------------------------------------------------------------

// Window_BattleEnemy
//
// The window for selecting a target enemy on the battle screen.
var Window_BattleEnemy = class extends Window_Selectable {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize(x, y) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        this._enemies = [];
        const width = this.windowWidth();
        const height = this.windowHeight();
        super.initialize(x, y, width, height);
        this.refresh();
        this.hide();
    };

    windowWidth() {
        return Graphics.boxWidth - 192;
    };

    windowHeight() {
        return this.fittingHeight(this.numVisibleRows());
    };

    numVisibleRows() {
        return 4;
    };

    maxCols() {
        return 2;
    };

    maxItems() {
        return this._enemies.length;
    };

    enemy() {
        return this._enemies[this.index()];
    };

    enemyIndex() {
        const enemy = this.enemy();
        return enemy ? enemy.index() : -1;
    };

    drawItem(index) {
        this.resetTextColor();
        const name = this._enemies[index].name();
        const rect = this.itemRectForText(index);
        this.drawText(name, rect.x, rect.y, rect.width);
    };

    show() {
        this.refresh();
        this.select(0);
        super.show();
    };

    hide() {
        super.hide();
        $gameTroop.select(null);
    };

    refresh() {
        this._enemies = $gameTroop.aliveMembers();
        super.refresh();
    };

    select(index) {
        super.select(index);
        $gameTroop.select(this.enemy());
    };
};

//-----------------------------------------------------------------------------

// Window_BattleSkill
//
// The window for selecting a skill to use on the battle screen.
var Window_BattleSkill = class extends Window_SkillList {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize(x, y, width, height) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize(x, y, width, height);
        this.hide();
    };

    show() {
        this.selectLast();
        this.showHelpWindow();
        super.show();
    };

    hide() {
        this.hideHelpWindow();
        super.hide();
    };
};

//-----------------------------------------------------------------------------

// Window_BattleItem
//
// The window for selecting an item to use on the battle screen.
var Window_BattleItem = class extends Window_ItemList {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize(x, y, width, height) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        super.initialize(x, y, width, height);
        this.hide();
    };

    includes(item) {
        return $gameParty.canUse(item);
    };

    show() {
        this.selectLast();
        this.showHelpWindow();
        super.show();
    };

    hide() {
        this.hideHelpWindow();
        super.hide();
    };
};

//-----------------------------------------------------------------------------

// Window_TitleCommand
//
// The window for selecting New Game/Continue on the title screen.
var Window_TitleCommand = class extends Window_Command {
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
        super.initialize(0, 0);
        this.updatePlacement();
        this.openness = 0;
        this.selectLast();
    };

    static _lastCommandSymbol = null;
    static initCommandPosition() {
        this._lastCommandSymbol = null;
    };

    windowWidth() {
        return 240;
    };

    updatePlacement() {
        this.x = (Graphics.boxWidth - this.width) / 2;
        this.y = Graphics.boxHeight - this.height - 96;
    };

    makeCommandList() {
        this.addCommand(TextManager.newGame, 'newGame');
        this.addCommand(TextManager.continue_, 'continue', this.isContinueEnabled());
        this.addCommand(TextManager.options, 'options');
    };

    isContinueEnabled() {
        return DataManager.isAnySavefileExists();
    };

    processOk() {
        Window_TitleCommand._lastCommandSymbol = this.currentSymbol();
        super.processOk();
    };

    selectLast() {
        if (Window_TitleCommand._lastCommandSymbol) {
            this.selectSymbol(Window_TitleCommand._lastCommandSymbol);
        } else if (this.isContinueEnabled()) {
            this.selectSymbol('continue');
        }
    };
};

//-----------------------------------------------------------------------------

// Window_GameEnd
//
// The window for selecting "Go to Title" on the game end screen.
var Window_GameEnd = class extends Window_Command {
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
        super.initialize(0, 0);
        this.updatePlacement();
        this.openness = 0;
        this.open();
    };

    windowWidth() {
        return 240;
    };

    updatePlacement() {
        this.x = (Graphics.boxWidth - this.width) / 2;
        this.y = (Graphics.boxHeight - this.height) / 2;
    };

    makeCommandList() {
        this.addCommand(TextManager.toTitle, 'toTitle');
        this.addCommand(TextManager.cancel, 'cancel');
    };
};

//-----------------------------------------------------------------------------

// Window_DebugRange
//
// The window for selecting a block of switches/variables on the debug screen.
var Window_DebugRange = class extends Window_Selectable {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    static lastTopRow = 0;
    static lastIndex = 0;

    initialize(x, y) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        this._maxSwitches = Math.ceil(($dataSystem.switches.length - 1) / 10);
        this._maxVariables = Math.ceil(($dataSystem.variables.length - 1) / 10);
        const width = this.windowWidth();
        const height = this.windowHeight();
        super.initialize(x, y, width, height);
        this.refresh();
        this.setTopRow(Window_DebugRange.lastTopRow);
        this.select(Window_DebugRange.lastIndex);
        this.activate();
    };

    windowWidth() {
        return 246;
    };

    windowHeight() {
        return Graphics.boxHeight;
    };

    maxItems() {
        return this._maxSwitches + this._maxVariables;
    };

    update() {
        super.update();
        if (this._editWindow) {
            this._editWindow.setMode(this.mode());
            this._editWindow.setTopId(this.topId());
        }
    };

    mode() {
        return this.index() < this._maxSwitches ? 'switch' : 'variable';
    };

    topId() {
        const index = this.index();
        if (index < this._maxSwitches) {
            return index * 10 + 1;
        } else {
            return (index - this._maxSwitches) * 10 + 1;
        }
    };

    refresh() {
        this.createContents();
        this.drawAllItems();
    };

    drawItem(index) {
        const rect = this.itemRectForText(index);
        let start;
        let text;
        if (index < this._maxSwitches) {
            start = index * 10 + 1;
            text = 'S';
        } else {
            start = (index - this._maxSwitches) * 10 + 1;
            text = 'V';
        }
        const end = start + 9;
        text += ' [' + start.padZero(4) + '-' + end.padZero(4) + ']';
        this.drawText(text, rect.x, rect.y, rect.width);
    };

    isCancelTriggered() {
        return (Window_Selectable.prototype.isCancelTriggered() ||
            Input.isTriggered('debug'));
    };

    processCancel() {
        super.processCancel();
        Window_DebugRange.lastTopRow = this.topRow();
        Window_DebugRange.lastIndex = this.index();
    };

    setEditWindow(editWindow) {
        this._editWindow = editWindow;
    };
};

//-----------------------------------------------------------------------------

// Window_DebugEdit
//
// The window for displaying switches and variables on the debug screen.
var Window_DebugEdit = class extends Window_Selectable {
    constructor(...args) {
        super(...args);
        this._initFlag = true;
        this.initialize(...args);
    };

    initialize(x, y, width) {
        if (this._initFlag) {
            this._initFlag = false;
            return;
        }
        const height = this.fittingHeight(10);
        super.initialize(x, y, width, height);
        this._mode = 'switch';
        this._topId = 1;
        this.refresh();
    };

    maxItems() {
        return 10;
    };

    refresh() {
        this.contents.clear();
        this.drawAllItems();
    };

    drawItem(index) {
        const dataId = this._topId + index;
        const idText = dataId.padZero(4) + ':';
        const idWidth = this.textWidth(idText);
        const statusWidth = this.textWidth('-00000000');
        const name = this.itemName(dataId);
        const status = this.itemStatus(dataId);
        const rect = this.itemRectForText(index);
        this.resetTextColor();
        this.drawText(idText, rect.x, rect.y, rect.width);
        rect.x += idWidth;
        rect.width -= idWidth + statusWidth;
        this.drawText(name, rect.x, rect.y, rect.width);
        this.drawText(status, rect.x + rect.width, rect.y, statusWidth, 'right');
    };

    itemName(dataId) {
        if (this._mode === 'switch') {
            return $dataSystem.switches[dataId];
        } else {
            return $dataSystem.variables[dataId];
        }
    };

    itemStatus(dataId) {
        if (this._mode === 'switch') {
            return $gameSwitches.value(dataId) ? '[ON]' : '[OFF]';
        } else {
            return String($gameVariables.value(dataId));
        }
    };

    setMode(mode) {
        if (this._mode !== mode) {
            this._mode = mode;
            this.refresh();
        }
    };

    setTopId(id) {
        if (this._topId !== id) {
            this._topId = id;
            this.refresh();
        }
    };

    currentId() {
        return this._topId + this.index();
    };

    update() {
        super.update();
        if (this.active) {
            if (this._mode === 'switch') {
                this.updateSwitch();
            } else {
                this.updateVariable();
            }
        }
    };

    updateSwitch() {
        if (Input.isRepeated('ok')) {
            const switchId = this.currentId();
            SoundManager.playCursor();
            $gameSwitches.setValue(switchId, !$gameSwitches.value(switchId));
            this.redrawCurrentItem();
        }
    };

    updateVariable() {
        const variableId = this.currentId();
        let value = $gameVariables.value(variableId);
        if (typeof value === 'number') {
            if (Input.isRepeated('right')) {
                value++;
            }
            if (Input.isRepeated('left')) {
                value--;
            }
            if (Input.isRepeated('pagedown')) {
                value += 10;
            }
            if (Input.isRepeated('pageup')) {
                value -= 10;
            }
            if ($gameVariables.value(variableId) !== value) {
                $gameVariables.setValue(variableId, value);
                SoundManager.playCursor();
                this.redrawCurrentItem();
            }
        }
    };
};

//=============================================================================