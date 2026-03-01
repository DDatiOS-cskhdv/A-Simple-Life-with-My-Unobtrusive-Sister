//=============================================================================
// rpg_core.js v1.6.2
//=============================================================================

//=============================================================================

Object.assign(Number.prototype, {
    /**
     * Returns a number whose value is limited to the given range.
     *
     * @method Number.prototype.clamp
     * @param {Number} min The lower boundary
     * @param {Number} max The upper boundary
     * @return {Number} A number in the range (min, max)
     */
    clamp(min, max) {
        return Math.min(Math.max(this, min), max);
    },

    /**
     * Returns a modulo value which is always positive.
     *
     * @method Number.prototype.mod
     * @param {Number} n The divisor
     * @return {Number} A modulo value
     */
    mod(n) {
        return ((this % n) + n) % n;
    },

    /**
     * Makes a number string with leading zeros.
     *
     * @method Number.prototype.padZero
     * @param {Number} length The length of the output string
     * @return {String} A string with leading zeros
     */
    padZero(length) {
        return String(this).padZero(length);
    }
});

Object.assign(String.prototype, {
    /**
     * Replaces %1, %2 and so on in the string to the arguments.
     *
     * @method String.prototype.format
     * @param {Any} ...args The objects to format
     * @return {String} A formatted string
     */
    format() {
        return this.replace(/%([0-9]+)/g, (s, n) => arguments[Number(n) - 1]);
    },

    /**
     * Makes a number string with leading zeros.
     *
     * @method String.prototype.padZero
     * @param {Number} length The length of the output string
     * @return {String} A string with leading zeros
     */
    padZero(length) {
        return this.padStart(length, "0");
    },

    /**
     * Checks whether the string contains a given string.
     *
     * @method String.prototype.contains
     * @param {String} string The string to search for
     * @return {Boolean} True if the string contains a given string
     */
    contains(string) {
        return this.includes(string);
    }
});

Object.defineProperties(Array.prototype, {
    /**
     * Checks whether the two arrays are same.
     *
     * @method Array.prototype.equals
     * @param {Array} array The array to compare to
     * @return {Boolean} True if the two arrays are same
     */
    equals: {
        enumerable: false,
        value: function (array) {
            if (!array || this.length !== array.length) {
                return false;
            }
            for (let i = 0; i < this.length; i++) {
                if (this[i] instanceof Array && array[i] instanceof Array) {
                    if (!this[i].equals(array[i])) {
                        return false;
                    }
                } else if (this[i] !== array[i]) {
                    return false;
                }
            }
            return true;
        }
    },
    /**
     * Makes a shallow copy of the array.
     *
     * @method Array.prototype.clone
     * @return {Array} A shallow copy of the array
     */
    clone: {
        enumerable: false,
        value: function () {
            return this.slice(0);
        }
    },
    /**
     * Checks whether the array contains a given element.
     *
     * @method Array.prototype.contains
     * @param {Any} element The element to search for
     * @return {Boolean} True if the array contains a given element
     */
    contains: {
        enumerable: false,
        value: function (element) {
            return this.includes(element);
        }
    },
    /**
     * Removes a given element from the array (in place).
     *
     * @memberof JsExtensions
     * @param {any} element - The element to remove.
     * @returns {array} The array after remove.
     */
    remove: {
        enumerable: false,
        value: function (element) {
            for (; ;) {
                const index = this.indexOf(element);
                if (index >= 0) {
                    this.splice(index, 1);
                } else {
                    return this;
                }
            }
        }
    }
});

/**
 * Generates a random integer in the range (0, max-1).
 *
 * @static
 * @method Math.randomInt
 * @param {Number} max The upper boundary (excluded)
 * @return {Number} A random integer
 */
Math.randomInt = (max) => Math.floor(max * Math.random());

//-----------------------------------------------------------------------------

/**
 * The static class that defines utility methods.
 *
 * @class Utils
 */
class Utils {
    /**
     * The name of the RPG Maker. 'MV' in the current version.
     *
     * @static
     * @property RPGMAKER_NAME
     * @type String
     * @final
     */
    static RPGMAKER_NAME = 'MV';

    /**
     * The version of the RPG Maker.
     *
     * @static
     * @property RPGMAKER_VERSION
     * @type String
     * @final
     */
    static RPGMAKER_VERSION = "1.6.2";

    /**
     * Checks whether the option is in the query string.
     *
     * @static
     * @method isOptionValid
     * @param {String} name The option name
     * @return {Boolean} True if the option is in the query string
     */
    static isOptionValid(name) {
        const args = location.search.slice(1);
        if (args.split("&").includes(name)) {
            return true;
        }
        if (this.isNwjs() && nw.App.argv.length > 0) {
            return nw.App.argv[0].split("&").includes(name);
        }
        return false;
    };

    /**
     * Checks whether the platform is NW.js.
     *
     * @static
     * @method isNwjs
     * @return {Boolean} True if the platform is NW.js
     */
    static isNwjs() {
        return typeof require === 'function' && typeof process === 'object';
    };

    /**
     * Checks whether the platform is a mobile device.
     *
     * @static
     * @method isMobileDevice
     * @return {Boolean} True if the platform is a mobile device
     */
    static isMobileDevice() {
        const isDesktopApp = typeof require === 'function' && typeof process === 'object';
        const isMobile = !isDesktopApp && (
            window.matchMedia?.('(pointer: coarse)')?.matches
            || window.matchMedia?.('(hover: none)')?.matches
            || /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        );

        Utils.isMobileDevice = () => isMobile;
        return isMobile;
    };

    /**
     * Checks whether the browser is Mobile Safari.
     *
     * @static
     * @method isMobileSafari
     * @return {Boolean} True if the browser is Mobile Safari
     */
    static isMobileSafari() {
        let isMobileSafari = false;
        const agent = navigator.userAgent;

        if (/iPhone|iPad|iPod/i.test(agent) &&
            /AppleWebKit/i.test(agent) &&
            !/CriOS/i.test(agent)
        ) {
            isMobileSafari = true;
        }

        Utils.isMobileSafari = () => isMobileSafari;
        return isMobileSafari;
    };

    /**
     * Checks whether the browser is Android Chrome.
     *
     * @static
     * @method isAndroidChrome
     * @return {Boolean} True if the browser is Android Chrome
     */
    static isAndroidChrome() {
        const agent = navigator.userAgent;
        return /Android/i.test(agent) && /Chrome/i.test(agent);
    };

    /**
     * Checks whether the browser can read files in the game folder.
     *
     * @static
     * @method canReadGameFiles
     * @return {Boolean} True if the browser can read files in the game folder
     */
    static canReadGameFiles() {
        const scripts = document.getElementsByTagName('script');
        const lastScript = scripts[scripts.length - 1];
        const xhr = new XMLHttpRequest();
        try {
            xhr.open('GET', lastScript.src);
            xhr.overrideMimeType('text/javascript');
            xhr.send();
            return true;
        } catch (e) {
            return false;
        }
    };

    /**
     * Makes a CSS color string from RGB values.
     *
     * @static
     * @method rgbToCssColor
     * @param {Number} r The red value in the range (0, 255)
     * @param {Number} g The green value in the range (0, 255)
     * @param {Number} b The blue value in the range (0, 255)
     * @return {String} CSS color string
     */
    static rgbToCssColor(r, g, b) {
        return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
    };

    static _id = 1;
    static generateRuntimeId = () => this._id++;

    static _supportPassiveEvent = null;
    /**
     * Test this browser support passive event feature
     * 
     * @static
     * @method isSupportPassiveEvent
     * @return {Boolean} this browser support passive event or not
     */
    static isSupportPassiveEvent() {
        if (typeof this._supportPassiveEvent === "boolean") {
            return this._supportPassiveEvent;
        }
        // test support passive event
        // https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
        let passive = false;
        const options = Object.defineProperty({}, "passive", {
            get: function () { passive = true; }
        });
        window.addEventListener("test", null, options);
        this._supportPassiveEvent = passive;
        return passive;
    };
};

//-----------------------------------------------------------------------------

class CacheEntry {
    /**
     * The resource class. Allows to be collected as a garbage if not use for some time or ticks
     *
     * @class CacheEntry
     * @constructor
     * @param {ResourceManager} resource manager
     * @param {string} key, url of the resource
     * @param {string} item - Bitmap, HTML5Audio, WebAudio - whatever you want to store in the cache
     */
    constructor(cache, key, item) {
        this.cache = cache;
        this.key = key;
        this.item = item;
        this.cached = false;
        this.touchTicks = 0;
        this.touchSeconds = 0;
        this.ttlTicks = 0;
        this.ttlSeconds = 0;
        this.freedByTTL = false;
    };

    /**
     * frees the resource
     */
    free(byTTL) {
        this.freedByTTL = byTTL || false;
        if (this.cached) {
            this.cached = false;
            delete this.cache._inner[this.key];
        }
    };

    /**
     * Allocates the resource
     * @returns {CacheEntry}
     */
    allocate() {
        if (!this.cached) {
            this.cache._inner[this.key] = this;
            this.cached = true;
        }
        this.touch();
        return this;
    };

    /**
     * Sets the time to live
     * @param {number} ticks TTL in ticks, 0 if not set
     * @param {number} time TTL in seconds, 0 if not set
     * @returns {CacheEntry}
     */
    setTimeToLive(ticks, seconds) {
        this.ttlTicks = ticks || 0;
        this.ttlSeconds = seconds || 0;
        return this;
    };

    isStillAlive() {
        const cache = this.cache;
        return ((this.ttlTicks == 0) || (this.touchTicks + this.ttlTicks < cache.updateTicks)) &&
            ((this.ttlSeconds == 0) || (this.touchSeconds + this.ttlSeconds < cache.updateSeconds));
    };

    /**
     * makes sure that resource wont freed by Time To Live
     * if resource was already freed by TTL, put it in cache again
     */
    touch() {
        const cache = this.cache;
        if (this.cached) {
            this.touchTicks = cache.updateTicks;
            this.touchSeconds = cache.updateSeconds;
        } else if (this.freedByTTL) {
            this.freedByTTL = false;
            if (!cache._inner[this.key]) {
                cache._inner[this.key] = this;
            }
        }
    };
};

class CacheMap {
    /**
     * Cache for images, audio, or any other kind of resource
     * @param manager
     * @constructor
     */
    constructor(manager) {
        this.manager = manager;
        this._inner = {};
        this._lastRemovedEntries = {};
        this.updateTicks = 0;
        this.lastCheckTTL = 0;
        this.delayCheckTTL = 100.0;
        this.updateSeconds = Date.now();
    };

    /**
     * checks ttl of all elements and removes dead ones
     */
    checkTTL() {
        const cache = this._inner;
        let temp = this._lastRemovedEntries;
        if (!temp) {
            temp = [];
            this._lastRemovedEntries = temp;
        }
        for (let key in cache) {
            const entry = cache[key];
            if (!entry.isStillAlive()) {
                temp.push(entry);
            }
        }
        for (let i = 0; i < temp.length; i++) {
            temp[i].free(true);
        }
        temp.length = 0;
    };

    /**
     * cache item
     * @param key url of cache element
     * @returns {*|null}
     */
    getItem(key) {
        return this?._inner[key]?.item ?? null;
    };

    clear() {
        for (const keys of Object.keys(this._inner)) {
            this._inner[keys].free();
        }
    };

    setItem(key, item) {
        return new CacheEntry(this, key, item).allocate();
    };

    update(ticks, delta) {
        this.updateTicks += ticks;
        this.updateSeconds += delta;
        if (this.updateSeconds >= this.delayCheckTTL + this.lastCheckTTL) {
            this.lastCheckTTL = this.updateSeconds;
            this.checkTTL();
        }
    };
};

class ImageCache {
    constructor(...args) {
        this.initialize(...args);
    };

    static limit = 10 * 1000 * 1000;

    initialize() {
        this._items = {};
    };

    add(key, value) {
        this._items[key] = {
            bitmap: value,
            touch: Date.now(),
            key: key
        };

        this._truncateCache();
    };

    get(key) {
        if (this._items[key]) {
            const item = this._items[key];
            item.touch = Date.now();
            return item.bitmap;
        }

        return null;
    };

    reserve(key, value, reservationId) {
        if (!this._items[key]) {
            this._items[key] = {
                bitmap: value,
                touch: Date.now(),
                key: key
            };
        }

        this._items[key].reservationId = reservationId;
    };

    releaseReservation(reservationId) {
        const items = this._items;

        for (const item of Object.keys(items).map(key => items[key])) {
            if (item.reservationId === reservationId) {
                delete item.reservationId;
            }
        }
    };

    _truncateCache() {
        const items = this._items;
        let sizeLeft = ImageCache.limit;

        for (const item of Object.keys(items)
            .map(key => items[key])
            .sort((a, b) => b.touch - a.touch)) {
            if (sizeLeft > 0 || this._mustBeHeld(item)) {
                const bitmap = item.bitmap;
                sizeLeft -= bitmap.width * bitmap.height;
            } else {
                delete items[item.key];
            }
        }
    };

    _mustBeHeld(item) {
        // request only is weak so It's purgeable
        if (item.bitmap.isRequestOnly()) return false;
        // reserved item must be held
        if (item.reservationId) return true;
        // not ready bitmap must be held (because of checking isReady())
        if (!item.bitmap.isReady()) return true;
        // then the item may purgeable
        return false;
    };

    isReady() {
        const items = this._items;
        return !Object.keys(items).some(key =>
            !items[key].bitmap.isRequestOnly() && !items[key].bitmap.isReady()
        )
    };

    getErrorBitmap() {
        const items = this._items;
        let bitmap = null;
        if (Object.keys(items).some(key => {
            if (items[key].bitmap.isError()) {
                bitmap = items[key].bitmap;
                return true;
            }
            return false;
        })) {
            return bitmap;
        }

        return null;
    };
};

class RequestQueue {
    constructor(...args) {
        this.initialize(...args);
    };

    initialize() {
        this._queue = [];
    };

    enqueue(key, value) {
        this._queue.push({
            key: key,
            value: value,
        });
    };

    update() {
        if (this._queue.length === 0) return;

        const top = this._queue[0];
        if (top.value.isRequestReady()) {
            this._queue.shift();
            if (this._queue.length !== 0) {
                this._queue[0].value.startRequest();
            }
        } else {
            top.value.startRequest();
        }
    };

    raisePriority(key) {
        for (let n = 0; n < this._queue.length; n++) {
            const item = this._queue[n];
            if (item.key === key) {
                this._queue.splice(n, 1);
                this._queue.unshift(item);
                break;
            }
        }
    };

    clear() {
        this._queue.splice(0);
    };
};

//-----------------------------------------------------------------------------

class Point extends PIXI.Point {
    /**
     * The point class.
     * @param {Number} x The x coordinate
     * @param {Number} y The y coordinate
     */
    constructor(...args) {
        super(...args);
    };
};

//-----------------------------------------------------------------------------

class Rectangle extends PIXI.Rectangle {
    /**
     * @static
     * @property emptyRectangle
     * @type Rectangle
     * @private
     */
    static emptyRectangle = new Rectangle(0, 0, 0, 0);

    /**
     * The rectangle class.
     * @param {Number} x The x coordinate for the upper-left corner
     * @param {Number} y The y coordinate for the upper-left corner
     * @param {Number} width The width of the rectangle
     * @param {Number} height The height of the rectangle
     */
    constructor(...args) {
        super(...args);
    };
};

//-----------------------------------------------------------------------------

class Bitmap {
    /**
     * The basic object that represents an image.
     *
     * @class Bitmap
     * @constructor
     * @param {Number} width The width of the bitmap
     * @param {Number} height The height of the bitmap
     */
    constructor(...args) {
        this.initialize(...args);
    };

    // for iOS. img consumes memory. so reuse it.
    static _reuseImages = [];

    _createCanvas(width, height) {
        this.__canvas = this.__canvas || document.createElement('canvas');
        this.__context = this.__canvas.getContext('2d', { willReadFrequently: true });

        this.__canvas.width = Math.max(width || 0, 1);
        this.__canvas.height = Math.max(height || 0, 1);

        if (this._image) {
            this.__canvas.width = Math.max(this._image.width || 0, 1);
            this.__canvas.height = Math.max(this._image.height || 0, 1);
            this._createBaseTexture(this._canvas);

            this.__context.drawImage(this._image, 0, 0);
        }

        this._setDirty();
    };

    _createBaseTexture(source) {
        this.__baseTexture = new PIXI.BaseTexture(source);
        this.__baseTexture.mipmap = false;
        this.__baseTexture.width = source.width;
        this.__baseTexture.height = source.height;

        if (this._smooth) {
            this._baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
        } else {
            this._baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        }
    };

    _clearImgInstance() {
        this._image.src = "";
        this._image.onload = null;
        this._image.onerror = null;
        this._errorListener = null;
        this._loadListener = null;

        Bitmap._reuseImages.push(this._image);
        this._image = null;
    };

    /* We don't want to waste memory, so creating canvas is deferred. */
    get _canvas() {
        if (!this.__canvas) this._createCanvas();
        return this.__canvas;
    };

    get _context() {
        if (!this.__context) this._createCanvas();
        return this.__context;
    };

    get _baseTexture() {
        if (!this.__baseTexture) {
            this._createBaseTexture(this._image || this.__canvas);
        }
        return this.__baseTexture;
    };

    _renewCanvas() {
        const newImage = this._image;
        if (newImage && this.__canvas && (this.__canvas.width < newImage.width || this.__canvas.height < newImage.height)) {
            this._createCanvas();
        }
    };

    initialize(width, height) {
        if (!this._defer) this._createCanvas(width, height);

        this._image = null;
        this._url = '';
        this._paintOpacity = 255;
        this._smooth = false;
        this._loadListeners = [];
        this._loadingState = 'none';
        this._decodeAfterRequest = false;

        /**
         * Cache entry, for images. In all cases _url is the same as cacheEntry.key
         * @type CacheEntry
         */
        this.cacheEntry = null;

        /**
         * The face name of the font.
         *
         * @property fontFace
         * @type String
         */
        this.fontFace = 'GameFont';

        /**
         * The size of the font in pixels.
         *
         * @property fontSize
         * @type Number
         */
        this.fontSize = 28;

        /**
         * Whether the font is italic.
         *
         * @property fontItalic
         * @type Boolean
         */
        this.fontItalic = false;

        /**
         * The color of the text in CSS format.
         *
         * @property textColor
         * @type String
         */
        this.textColor = '#ffffff';

        /**
         * The color of the outline of the text in CSS format.
         *
         * @property outlineColor
         * @type String
         */
        this.outlineColor = 'rgba(0, 0, 0, 0.5)';

        /**
         * The width of the outline of the text.
         *
         * @property outlineWidth
         * @type Number
         */
        this.outlineWidth = 4;
    };

    /**
     * Loads a image file and returns a new bitmap object.
     *
     * @static
     * @method load
     * @param {String} url The image url of the texture
     * @return Bitmap
     */
    static load(url) {
        const bitmap = Object.create(Bitmap.prototype);
        bitmap._defer = true;
        bitmap.initialize();

        bitmap._decodeAfterRequest = true;
        bitmap._requestImage(url);

        return bitmap;
    };

    /**
     * Takes a snapshot of the game screen and returns a new bitmap object.
     *
     * @static
     * @method snap
     * @param {Stage} stage The stage object
     * @return Bitmap
     */
    static snap(stage) {
        const width = Graphics.width;
        const height = Graphics.height;
        const bitmap = new Bitmap(width, height);
        const context = bitmap._context;
        const renderTexture = PIXI.RenderTexture.create(width, height);
        if (stage) {
            Graphics._renderer.render(stage, renderTexture);
            stage.worldTransform.identity();
            let canvas = null;
            if (Graphics.isWebGL()) {
                canvas = Graphics._renderer.extract.canvas(renderTexture);
            } else {
                canvas = renderTexture.baseTexture._canvasRenderTarget.canvas;
            }
            context.drawImage(canvas, 0, 0);
        } else {

        }
        renderTexture.destroy({ destroyBase: true });
        bitmap._setDirty();
        return bitmap;
    };

    /**
     * Checks whether the bitmap is ready to render.
     *
     * @method isReady
     * @return {Boolean} True if the bitmap is ready to render
     */
    isReady() {
        return this._loadingState === 'loaded' || this._loadingState === 'none';
    };

    /**
     * Checks whether a loading error has occurred.
     *
     * @method isError
     * @return {Boolean} True if a loading error has occurred
     */
    isError() {
        return this._loadingState === 'error';
    };

    /**
     * touch the resource
     * @method touch
     */
    touch() {
        if (this.cacheEntry) {
            this.cacheEntry.touch();
        }
    };

    /**
         * [read-only] The url of the image file.
         *
         * @property url
         * @type String
         */
    get url() {
        return this._url;
    };

    /**
     * [read-only] The base texture that holds the image.
     *
     * @property baseTexture
     * @type PIXI.BaseTexture
     */
    get baseTexture() {
        return this._baseTexture;
    };

    /**
     * [read-only] The bitmap canvas.
     *
     * @property canvas
     * @type HTMLCanvasElement
     */
    get canvas() {
        return this._canvas;
    };

    /**
     * [read-only] The 2d context of the bitmap canvas.
     *
     * @property context
     * @type CanvasRenderingContext2D
     */
    get context() {
        return this._context;
    };

    /**
     * [read-only] The width of the bitmap.
     *
     * @property width
     * @type Number
     */
    get width() {
        if (this.isReady()) {
            return this._image ? this._image.width : this._canvas.width;
        }

        return 0;
    };

    /**
     * [read-only] The height of the bitmap.
     *
     * @property height
     * @type Number
     */
    get height() {
        if (this.isReady()) {
            return this._image ? this._image.height : this._canvas.height;
        }

        return 0;
    };

    /**
     * [read-only] The rectangle of the bitmap.
     *
     * @property rect
     * @type Rectangle
     */
    get rect() {
        return new Rectangle(0, 0, this.width, this.height);
    };

    /**
     * Whether the smooth scaling is applied.
     *
     * @property smooth
     * @type Boolean
     */
    get smooth() {
        return this._smooth;
    };
    set smooth(value) {
        if (this._smooth !== value) {
            this._smooth = value;
            if (this.__baseTexture) {
                if (this._smooth) {
                    this._baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
                } else {
                    this._baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
                }
            }
        }
    };

    /**
     * The opacity of the drawing object in the range (0, 255).
     *
     * @property paintOpacity
     * @type Number
     */
    get paintOpacity() {
        return this._paintOpacity;
    };
    set paintOpacity(value) {
        if (this._paintOpacity !== value) {
            this._paintOpacity = value;
            this._context.globalAlpha = this._paintOpacity / 255;
        }
    };

    /**
     * Resizes the bitmap.
     *
     * @method resize
     * @param {Number} width The new width of the bitmap
     * @param {Number} height The new height of the bitmap
     */
    resize(width, height) {
        width = Math.max(width || 0, 1);
        height = Math.max(height || 0, 1);
        this._canvas.width = width;
        this._canvas.height = height;
        this._baseTexture.width = width;
        this._baseTexture.height = height;
    };

    /**
     * Performs a block transfer.
     *
     * @method blt
     * @param {Bitmap} source The bitmap to draw
     * @param {Number} sx The x coordinate in the source
     * @param {Number} sy The y coordinate in the source
     * @param {Number} sw The width of the source image
     * @param {Number} sh The height of the source image
     * @param {Number} dx The x coordinate in the destination
     * @param {Number} dy The y coordinate in the destination
     * @param {Number} [dw=sw] The width to draw the image in the destination
     * @param {Number} [dh=sh] The height to draw the image in the destination
     */
    blt(source, sx, sy, sw, sh, dx, dy, dw, dh) {
        dw = dw || sw;
        dh = dh || sh;
        if (sx >= 0 && sy >= 0 && sw > 0 && sh > 0 && dw > 0 && dh > 0 &&
            sx + sw <= source.width && sy + sh <= source.height) {
            this._context.globalCompositeOperation = 'source-over';
            this._context.drawImage(source._canvas, sx, sy, sw, sh, dx, dy, dw, dh);
            this._setDirty();
        }
    };

    /**
     * Performs a block transfer, using assumption that original image was not modified (no hue)
     *
     * @method blt
     * @param {Bitmap} source The bitmap to draw
     * @param {Number} sx The x coordinate in the source
     * @param {Number} sy The y coordinate in the source
     * @param {Number} sw The width of the source image
     * @param {Number} sh The height of the source image
     * @param {Number} dx The x coordinate in the destination
     * @param {Number} dy The y coordinate in the destination
     * @param {Number} [dw=sw] The width to draw the image in the destination
     * @param {Number} [dh=sh] The height to draw the image in the destination
     */
    bltImage(source, sx, sy, sw, sh, dx, dy, dw, dh) {
        dw = dw || sw;
        dh = dh || sh;
        if (sx >= 0 && sy >= 0 && sw > 0 && sh > 0 && dw > 0 && dh > 0 &&
            sx + sw <= source.width && sy + sh <= source.height) {
            this._context.globalCompositeOperation = 'source-over';
            this._context.drawImage(source._image, sx, sy, sw, sh, dx, dy, dw, dh);
            this._setDirty();
        }
    };

    /**
     * Returns pixel color at the specified point.
     *
     * @method getPixel
     * @param {Number} x The x coordinate of the pixel in the bitmap
     * @param {Number} y The y coordinate of the pixel in the bitmap
     * @return {String} The pixel color (hex format)
     */
    getPixel(x, y) {
        const data = this._context.getImageData(x, y, 1, 1).data;
        let result = '#';
        for (let i = 0; i < 3; i++) {
            result += data[i].toString(16).padZero(2);
        }
        return result;
    };

    /**
     * Returns alpha pixel value at the specified point.
     *
     * @method getAlphaPixel
     * @param {Number} x The x coordinate of the pixel in the bitmap
     * @param {Number} y The y coordinate of the pixel in the bitmap
     * @return {String} The alpha value
     */
    getAlphaPixel(x, y) {
        const data = this._context.getImageData(x, y, 1, 1).data;
        return data[3];
    };

    /**
     * Clears the specified rectangle.
     *
     * @method clearRect
     * @param {Number} x The x coordinate for the upper-left corner
     * @param {Number} y The y coordinate for the upper-left corner
     * @param {Number} width The width of the rectangle to clear
     * @param {Number} height The height of the rectangle to clear
     */
    clearRect(x, y, width, height) {
        this._context.clearRect(x, y, width, height);
        this._setDirty();
    };

    /**
     * Clears the entire bitmap.
     *
     * @method clear
     */
    clear() {
        this.clearRect(0, 0, this.width, this.height);
    };

    /**
     * Fills the specified rectangle.
     *
     * @method fillRect
     * @param {Number} x The x coordinate for the upper-left corner
     * @param {Number} y The y coordinate for the upper-left corner
     * @param {Number} width The width of the rectangle to fill
     * @param {Number} height The height of the rectangle to fill
     * @param {String} color The color of the rectangle in CSS format
     */
    fillRect(x, y, width, height, color) {
        const context = this._context;
        context.save();
        context.fillStyle = color;
        context.fillRect(x, y, width, height);
        context.restore();
        this._setDirty();
    };

    /**
     * Fills the entire bitmap.
     *
     * @method fillAll
     * @param {String} color The color of the rectangle in CSS format
     */
    fillAll(color) {
        this.fillRect(0, 0, this.width, this.height, color);
    };

    /**
     * Draws the rectangle with a gradation.
     *
     * @method gradientFillRect
     * @param {Number} x The x coordinate for the upper-left corner
     * @param {Number} y The y coordinate for the upper-left corner
     * @param {Number} width The width of the rectangle to fill
     * @param {Number} height The height of the rectangle to fill
     * @param {String} color1 The gradient starting color
     * @param {String} color2 The gradient ending color
     * @param {Boolean} vertical Wether the gradient should be draw as vertical or not
     */
    gradientFillRect(x, y, width, height, color1, color2, vertical) {
        const context = this._context;
        let grad;
        if (vertical) {
            grad = context.createLinearGradient(x, y, x, y + height);
        } else {
            grad = context.createLinearGradient(x, y, x + width, y);
        }
        grad.addColorStop(0, color1);
        grad.addColorStop(1, color2);
        context.save();
        context.fillStyle = grad;
        context.fillRect(x, y, width, height);
        context.restore();
        this._setDirty();
    };

    /**
     * Draw a bitmap in the shape of a circle
     *
     * @method drawCircle
     * @param {Number} x The x coordinate based on the circle center
     * @param {Number} y The y coordinate based on the circle center
     * @param {Number} radius The radius of the circle
     * @param {String} color The color of the circle in CSS format
     */
    drawCircle(x, y, radius, color) {
        const context = this._context;
        context.save();
        context.fillStyle = color;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2, false);
        context.fill();
        context.restore();
        this._setDirty();
    };

    /**
     * Draws the outline text to the bitmap.
     *
     * @method drawText
     * @param {String} text The text that will be drawn
     * @param {Number} x The x coordinate for the left of the text
     * @param {Number} y The y coordinate for the top of the text
     * @param {Number} maxWidth The maximum allowed width of the text
     * @param {Number} lineHeight The height of the text line
     * @param {String} align The alignment of the text
     */
    drawText(text, x, y, maxWidth, lineHeight, align) {
        // Note: Firefox has a bug with textBaseline: Bug 737852
        //       So we use 'alphabetic' here.
        if (text !== undefined) {
            let tx = x;
            const ty = y + lineHeight - (lineHeight - this.fontSize * 0.7) / 2;
            const context = this._context;
            const alpha = context.globalAlpha;
            maxWidth = maxWidth || 0xffffffff;
            if (align === 'center') {
                tx += maxWidth / 2;
            }
            if (align === 'right') {
                tx += maxWidth;
            }
            context.save();
            context.font = this._makeFontNameText();
            context.textAlign = align || 'left';
            context.textBaseline = 'alphabetic';
            context.globalAlpha = 1;
            this._drawTextOutline(text, tx, ty, maxWidth);
            context.globalAlpha = alpha;
            this._drawTextBody(text, tx, ty, maxWidth);
            context.restore();
            this._setDirty();
        }
    };

    /**
     * Returns the width of the specified text.
     *
     * @method measureTextWidth
     * @param {String} text The text to be measured
     * @return {Number} The width of the text in pixels
     */
    measureTextWidth(text) {
        const context = this._context;
        context.save();
        context.font = this._makeFontNameText();
        const width = context.measureText(text).width;
        context.restore();
        return width;
    };

    /**
     * Changes the color tone of the entire bitmap.
     *
     * @method adjustTone
     * @param {Number} r The red strength in the range (-255, 255)
     * @param {Number} g The green strength in the range (-255, 255)
     * @param {Number} b The blue strength in the range (-255, 255)
     */
    adjustTone(r, g, b) {
        if ((r || g || b) && this.width > 0 && this.height > 0) {
            const context = this._context;
            const imageData = context.getImageData(0, 0, this.width, this.height);
            const pixels = imageData.data;
            for (let i = 0; i < pixels.length; i += 4) {
                pixels[i + 0] += r;
                pixels[i + 1] += g;
                pixels[i + 2] += b;
            }
            context.putImageData(imageData, 0, 0);
            this._setDirty();
        }
    };

    /**
     * Rotates the hue of the entire bitmap.
     *
     * @method rotateHue
     * @param {Number} offset The hue offset in 360 degrees
     */
    rotateHue(offset) {
        function rgbToHsl(r, g, b) {
            const cmin = Math.min(r, g, b);
            const cmax = Math.max(r, g, b);
            let h = 0;
            let s = 0;
            let l = (cmin + cmax) / 2;
            const delta = cmax - cmin;

            if (delta > 0) {
                if (r === cmax) {
                    h = 60 * (((g - b) / delta + 6) % 6);
                } else if (g === cmax) {
                    h = 60 * ((b - r) / delta + 2);
                } else {
                    h = 60 * ((r - g) / delta + 4);
                }
                s = delta / (255 - Math.abs(2 * l - 255));
            }
            return [h, s, l];
        }

        function hslToRgb(h, s, l) {
            const c = (255 - Math.abs(2 * l - 255)) * s;
            const x = c * (1 - Math.abs((h / 60) % 2 - 1));
            const m = l - c / 2;
            const cm = c + m;
            const xm = x + m;

            if (h < 60) {
                return [cm, xm, m];
            } else if (h < 120) {
                return [xm, cm, m];
            } else if (h < 180) {
                return [m, cm, xm];
            } else if (h < 240) {
                return [m, xm, cm];
            } else if (h < 300) {
                return [xm, m, cm];
            } else {
                return [cm, m, xm];
            }
        }

        if (offset && this.width > 0 && this.height > 0) {
            offset = ((offset % 360) + 360) % 360;
            const context = this._context;
            const imageData = context.getImageData(0, 0, this.width, this.height);
            const pixels = imageData.data;
            for (let i = 0; i < pixels.length; i += 4) {
                const hsl = rgbToHsl(pixels[i + 0], pixels[i + 1], pixels[i + 2]);
                const h = (hsl[0] + offset) % 360;
                const s = hsl[1];
                const l = hsl[2];
                const rgb = hslToRgb(h, s, l);
                pixels[i + 0] = rgb[0];
                pixels[i + 1] = rgb[1];
                pixels[i + 2] = rgb[2];
            }
            context.putImageData(imageData, 0, 0);
            this._setDirty();
        }
    };

    /**
     * Applies a blur effect to the bitmap.
     *
     * @method blur
     */
    blur() {
        for (let i = 0; i < 2; i++) {
            const w = this.width;
            const h = this.height;
            const canvas = this._canvas;
            const context = this._context;
            const tempCanvas = document.createElement('canvas');
            const tempContext = tempCanvas.getContext('2d', { willReadFrequently: true });
            tempCanvas.width = w + 2;
            tempCanvas.height = h + 2;
            tempContext.drawImage(canvas, 0, 0, w, h, 1, 1, w, h);
            tempContext.drawImage(canvas, 0, 0, w, 1, 1, 0, w, 1);
            tempContext.drawImage(canvas, 0, 0, 1, h, 0, 1, 1, h);
            tempContext.drawImage(canvas, 0, h - 1, w, 1, 1, h + 1, w, 1);
            tempContext.drawImage(canvas, w - 1, 0, 1, h, w + 1, 1, 1, h);
            context.save();
            context.fillStyle = 'black';
            context.fillRect(0, 0, w, h);
            context.globalCompositeOperation = 'lighter';
            context.globalAlpha = 1 / 9;
            for (let y = 0; y < 3; y++) {
                for (let x = 0; x < 3; x++) {
                    context.drawImage(tempCanvas, x, y, w, h, 0, 0, w, h);
                }
            }
            context.restore();
        }
        this._setDirty();
    };

    /**
     * Add a callback function that will be called when the bitmap is loaded.
     *
     * @method addLoadListener
     * @param {Function} listner The callback function
     */
    addLoadListener(listner) {
        if (!this.isReady()) {
            this._loadListeners.push(listner);
        } else {
            listner(this);
        }
    };

    /**
     * @method _makeFontNameText
     * @private
     */
    _makeFontNameText() {
        return (this.fontItalic ? 'Italic ' : '') +
            this.fontSize + 'px ' + this.fontFace;
    };

    /**
     * @method _drawTextOutline
     * @param {String} text
     * @param {Number} tx
     * @param {Number} ty
     * @param {Number} maxWidth
     * @private
     */
    _drawTextOutline(text, tx, ty, maxWidth) {
        const context = this._context;
        context.strokeStyle = this.outlineColor;
        context.lineWidth = this.outlineWidth;
        context.lineJoin = 'round';
        context.strokeText(text, tx, ty, maxWidth);
    };

    /**
     * @method _drawTextBody
     * @param {String} text
     * @param {Number} tx
     * @param {Number} ty
     * @param {Number} maxWidth
     * @private
     */
    _drawTextBody(text, tx, ty, maxWidth) {
        const context = this._context;
        context.fillStyle = this.textColor;
        context.fillText(text, tx, ty, maxWidth);
    };

    /**
     * @method _onLoad
     * @private
     */
    _onLoad() {
        this._image.removeEventListener('load', this._loadListener);
        this._image.removeEventListener('error', this._errorListener);

        this._renewCanvas();

        switch (this._loadingState) {
            case 'requesting':
                this._loadingState = 'requestCompleted';
                if (this._decodeAfterRequest) {
                    this.decode();
                } else {
                    this._loadingState = 'purged';
                    this._clearImgInstance();
                }
                break;

            case 'decrypting':
                window.URL.revokeObjectURL(this._image.src);
                this._loadingState = 'decryptCompleted';
                if (this._decodeAfterRequest) {
                    this.decode();
                } else {
                    this._loadingState = 'purged';
                    this._clearImgInstance();
                }
                break;
        }
    };

    decode() {
        switch (this._loadingState) {
            case 'requestCompleted': case 'decryptCompleted':
                this._loadingState = 'loaded';

                if (!this.__canvas) this._createBaseTexture(this._image);
                this._setDirty();
                this._callLoadListeners();
                break;

            case 'requesting': case 'decrypting':
                this._decodeAfterRequest = true;
                if (!this._loader) {
                    this._loader = ResourceHandler.createLoader(this._url, this._requestImage.bind(this, this._url), this._onError.bind(this));
                    this._image.removeEventListener('error', this._errorListener);
                    this._image.addEventListener('error', this._errorListener = this._loader);
                }
                break;

            case 'pending': case 'purged': case 'error':
                this._decodeAfterRequest = true;
                this._requestImage(this._url);
                break;
        }
    };

    /**
     * @method _callLoadListeners
     * @private
     */
    _callLoadListeners() {
        while (this._loadListeners.length > 0) {
            const listener = this._loadListeners.shift();
            listener(this);
        }
    };

    /**
     * @method _onError
     * @private
     */
    _onError() {
        this._image.removeEventListener('load', this._loadListener);
        this._image.removeEventListener('error', this._errorListener);
        this._loadingState = 'error';
    };

    /**
     * @method _setDirty
     * @private
     */
    _setDirty() {
        this._dirty = true;
    };

    /**
     * updates texture is bitmap was dirty
     * @method checkDirty
     */
    checkDirty() {
        if (this._dirty) {
            this._baseTexture.update();
            this._dirty = false;
        }
    };

    static request(url) {
        const bitmap = Object.create(Bitmap.prototype);
        bitmap._defer = true;
        bitmap.initialize();

        bitmap._url = url;
        bitmap._loadingState = 'pending';

        return bitmap;
    };

    _requestImage(url) {
        if (Bitmap._reuseImages.length !== 0) {
            this._image = Bitmap._reuseImages.pop();
        } else {
            this._image = new Image();
        }

        if (this._decodeAfterRequest && !this._loader) {
            this._loader = ResourceHandler.createLoader(url, this._requestImage.bind(this, url), this._onError.bind(this));
        }

        this._url = url;
        this._loadingState = 'requesting';

        if (!Decrypter.checkImgIgnore(url) && Decrypter.hasEncryptedImages) {
            this._loadingState = 'decrypting';
            Decrypter.decryptImg(url, this);
        } else {
            this._image.src = url;

            this._image.addEventListener('load', this._loadListener = Bitmap.prototype._onLoad.bind(this));
            this._image.addEventListener('error', this._errorListener = this._loader || Bitmap.prototype._onError.bind(this));
        }
    };

    isRequestOnly() {
        return !(this._decodeAfterRequest || this.isReady());
    };

    isRequestReady() {
        return this._loadingState !== 'pending' &&
            this._loadingState !== 'requesting' &&
            this._loadingState !== 'decrypting';
    };

    startRequest() {
        if (this._loadingState === 'pending') {
            this._decodeAfterRequest = false;
            this._requestImage(this._url);
        }
    };
};

//-----------------------------------------------------------------------------

// FPSCounter
//
// This is based on Darsain's FPSMeter which is under the MIT license.
// The original can be found at https://github.com/Darsain/fpsmeter.
class FPSCounter {
    constructor(...args) {
        this.initialize(...args);
    };

    initialize(box) {
        this._tickCount = 0;
        this._frameTime = 100;
        this._frameStart = 0;
        this._lastLoop = performance.now() - 100;
        this._showFps = true;
        this.fps = 0;
        this.duration = 0;
        this.pauseDetection = true;
        this._createElements(box);
        this._update();
    };

    startTick() {
        this._frameStart = performance.now();
    };

    endTick() {
        if (this.pauseDetection) return;

        const time = performance.now();
        const thisFrameTime = time - this._lastLoop;

        this._frameTime += (thisFrameTime - this._frameTime) / 16;

        this.fps = 1000 / this._frameTime;
        this.duration = Math.max(0, time - this._frameStart);
        this._lastLoop = time;

        if (this._tickCount++ % 15 === 0) {
            this._update();
        }
    };

    switchMode() {
        if (this._boxDiv.style.display === "none") {
            this._boxDiv.style.display = "block";
            this._showFps = true;
            this.pauseDetection = false;
        } else if (this._showFps) {
            this._showFps = false;
            this.pauseDetection = false
        } else {
            this._boxDiv.style.display = "none";
            this.pauseDetection = true;
        }

        if (this.pauseDetection) return;
        this._update();
    };

    _createElements(box) {
        this._boxDiv = box;
        this._labelDiv = document.createElement("div");
        this._numberDiv = document.createElement("div");
        this._boxDiv.id = "fpsCounterBox";

        this._labelDiv.id = "fpsCounterLabel";
        this._labelDiv.style.cssText = `
            position: absolute;
            left: 30px;
            top: 10px;
            width: 119px;
            font-size: 22px;
            font-family: monospace;
            color: white;
            text-align: center;
            text-shadow: rgba(0, 0, 0, 0.5) 1px 1px 0px;
        `;

        this._numberDiv.id = "fpsCounterNumber";
        this._numberDiv.style.cssText = `
            position: absolute;
            left: -15px;
            top: 6px;
            width: 119px;
            font-size: 26px;
            font-family: monospace;
            color: white;
            text-align: center;
            text-shadow: rgba(0, 0, 0, 0.5) 1px 1px 0px;
        `;

        this._boxDiv.appendChild(this._labelDiv);
        this._boxDiv.appendChild(this._numberDiv);
    };

    _update() {
        const count = this._showFps ? this.fps : this.duration;
        this._labelDiv.textContent = this._showFps ? "FPS" : "ms";
        this._numberDiv.textContent = count.toFixed(0);
    };
};

//-----------------------------------------------------------------------------

/**
 * The static class that carries out graphics processing.
 *
 * @class Graphics
 */
class Graphics {
    static _cssFontLoading = document.fonts && document.fonts.ready;
    static _fontLoaded = null;
    static _videoVolume = 1;

    /**
     * Initializes the graphics system.
     *
     * @static
     * @method initialize
     * @param {Number} width The width of the game screen
     * @param {Number} height The height of the game screen
     * @param {String} type The type of the renderer.
     *                 'canvas', 'webgl', or 'auto'.
     */
    static initialize(width, height, type) {
        this._width = width || 800;
        this._height = height || 600;
        this._rendererType = type || 'auto';
        this._boxWidth = this._width;
        this._boxHeight = this._height;

        this._scale = 1;
        this._realScale = 1;

        this._errorShowed = false;
        this._errorPrinter = null;
        this._canvas = null;
        this._video = null;
        this._videoUnlocked = false;
        this._videoLoading = false;
        this._upperCanvas = null;
        this._renderer = null;
        this._fpsCounter = null;
        this._modeBox = null;
        this._skipCount = 0;
        this._maxSkip = 3;
        this._rendered = false;
        this._loadingImage = null;
        this._loadingCount = 0;
        this._fpsMeterToggled = false;
        this._stretchEnabled = this._defaultStretchMode();

        this._canUseDifferenceBlend = false;
        this._canUseSaturationBlend = false;
        this._hiddenCanvas = null;

        this._testCanvasBlendModes();
        this._modifyExistingElements();
        this._updateRealScale();
        this._createAllElements();
        this._disableTextSelection();
        this._disableContextMenu();
        this._setupEventHandlers();
        this._setupCssFontLoading();
    };

    static _setupCssFontLoading() {
        if (Graphics._cssFontLoading) {
            document.fonts.ready.then(fonts => {
                Graphics._fontLoaded = fonts;
            }).catch(error => {
                SceneManager.onError(error);
            });
        }
    };

    static canUseCssFontLoading() {
        return !!this._cssFontLoading;
    };

    /**
     * The total frame count of the game screen.
     *
     * @static
     * @property frameCount
     * @type Number
     */
    static frameCount = 0;

    /**
     * The alias of PIXI.blendModes.NORMAL.
     *
     * @static
     * @property BLEND_NORMAL
     * @type Number
     * @final
     */
    static BLEND_NORMAL = 0;

    /**
     * The alias of PIXI.blendModes.ADD.
     *
     * @static
     * @property BLEND_ADD
     * @type Number
     * @final
     */
    static BLEND_ADD = 1;

    /**
     * The alias of PIXI.blendModes.MULTIPLY.
     *
     * @static
     * @property BLEND_MULTIPLY
     * @type Number
     * @final
     */
    static BLEND_MULTIPLY = 2;

    /**
     * The alias of PIXI.blendModes.SCREEN.
     *
     * @static
     * @property BLEND_SCREEN
     * @type Number
     * @final
     */
    static BLEND_SCREEN = 3;

    /**
     * Marks the beginning of each frame for FPSCounter.
     *
     * @static
     * @method tickStart
     */
    static tickStart() {
        if (this._fpsCounter) {
            this._fpsCounter.startTick();
        }
    };

    /**
     * Marks the end of each frame for FPSCounter.
     *
     * @static
     * @method tickEnd
     */
    static tickEnd() {
        if (this._fpsCounter && this._rendered) {
            this._fpsCounter.endTick();
        }
    };

    /**
     * Renders the stage to the game screen.
     *
     * @static
     * @method render
     * @param {Stage} stage The stage object to be rendered
     */
    static render(stage) {
        if (this._skipCount <= 0) {
            const startTime = performance.now();;
            if (stage) {
                this._renderer.render(stage);
                if (this._renderer.gl && this._renderer.gl.flush) {
                    this._renderer.gl.flush();
                }
            }
            const endTime = performance.now();
            const elapsed = endTime - startTime;
            this._skipCount = Math.min(Math.floor(elapsed / 15), this._maxSkip);
            this._rendered = true;
        } else {
            this._skipCount--;
            this._rendered = false;
        }
        this.frameCount++;
    };

    /**
     * Checks whether the renderer type is WebGL.
     *
     * @static
     * @method isWebGL
     * @return {Boolean} True if the renderer type is WebGL
     */
    static isWebGL() {
        return this._renderer && this._renderer.type === PIXI.RENDERER_TYPE.WEBGL;
    };

    /**
     * Checks whether the current browser supports WebGL.
     *
     * @static
     * @method hasWebGL
     * @return {Boolean} True if the current browser supports WebGL.
     */
    static hasWebGL() {
        try {
            const canvas = document.createElement('canvas');
            return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
        } catch (e) {
            return false;
        }
    };

    /**
     * Checks whether the canvas blend mode 'difference' is supported.
     *
     * @static
     * @method canUseDifferenceBlend
     * @return {Boolean} True if the canvas blend mode 'difference' is supported
     */
    static canUseDifferenceBlend() {
        return this._canUseDifferenceBlend;
    };

    /**
     * Checks whether the canvas blend mode 'saturation' is supported.
     *
     * @static
     * @method canUseSaturationBlend
     * @return {Boolean} True if the canvas blend mode 'saturation' is supported
     */
    static canUseSaturationBlend() {
        return this._canUseSaturationBlend;
    };

    /**
     * Sets the source of the "Now Loading" image.
     *
     * @static
     * @method setLoadingImage
     */
    static setLoadingImage(src) {
        this._loadingImage = new Image();
        this._loadingImage.src = src;
    };

    /**
     * Initializes the counter for displaying the "Now Loading" image.
     *
     * @static
     * @method startLoading
     */
    static startLoading() {
        this._loadingCount = 0;
    };

    /**
     * Increments the loading counter and displays the "Now Loading" image if necessary.
     *
     * @static
     * @method updateLoading
     */
    static updateLoading() {
        this._loadingCount++;
        this._paintUpperCanvas();
        this._upperCanvas.style.opacity = 1;
    };

    /**
     * Erases the "Now Loading" image.
     *
     * @static
     * @method endLoading
     */
    static endLoading() {
        this._clearUpperCanvas();
        this._upperCanvas.style.opacity = 0;
    };

    /**
     * Displays the loading error text to the screen.
     *
     * @static
     * @method printLoadingError
     * @param {String} url The url of the resource failed to load
     */
    static printLoadingError(url) {
        if (this._errorPrinter && !this._errorShowed) {
            this._errorPrinter.innerHTML = this._makeErrorHtml('Loading Error', 'Failed to load: ' + url);
            const button = document.createElement('button');
            button.textContent = 'Retry';
            button.style.cssText = `
                font-size: 24px;
                color: #ffffff;
                background-color: #000000;
            `;
            button.onmousedown = button.ontouchstart = function (event) {
                ResourceHandler.retry();
                event.stopPropagation();
            };
            this._errorPrinter.appendChild(button);
            this._loadingCount = -Infinity;
        }
    };

    /**
     * Erases the loading error text.
     *
     * @static
     * @method eraseLoadingError
     */
    static eraseLoadingError() {
        if (this._errorPrinter && !this._errorShowed) {
            this._errorPrinter.innerHTML = '';
            this.startLoading();
        }
    };

    /**
     * Displays the error text to the screen.
     *
     * @static
     * @method printError
     * @param {String} name The name of the error
     * @param {String} message The message of the error
     */
    static printError(name, message) {
        this._errorShowed = true;
        if (this._errorPrinter) {
            this._errorPrinter.innerHTML = this._makeErrorHtml(name, message);
        }
        this._applyCanvasFilter();
        this._clearUpperCanvas();
    };

    /**
     * Shows the FPSCounter element.
     *
     * @static
     * @method showFps
     */
    static showFps() {
        if (this._fpsCounter) {
            this._fpsCounter.switchMode();
        }
    };

    /**
     * Hides the FPSCounter element.
     *
     * @static
     * @method hideFps
     */
    static hideFps() {
        if (this._fpsCounter) {
            this._fpsCounter.switchMode();
        }
    };

    /**
     * Loads a font file.
     *
     * @static
     * @method loadFont
     * @param {String} name The face name of the font
     * @param {String} url The url of the font file
     */
    static loadFont(name, url) {
        const style = document.createElement('style');
        const head = document.getElementsByTagName('head');
        const rule = `@font-face {font-family: "${name}"; src: url("${url}");}`;
        head.item(0).appendChild(style);
        style.sheet.insertRule(rule, 0);
        this._createFontLoader(name);
    };

    /**
     * Checks whether the font file is loaded.
     *
     * @static
     * @method isFontLoaded
     * @param {String} name The face name of the font
     * @return {Boolean} True if the font file is loaded
     */
    static isFontLoaded(name) {
        if (Graphics._cssFontLoading) {
            if (Graphics._fontLoaded) {
                return Graphics._fontLoaded.check(`10px "${name}"`);
            }

            return false;
        } else {
            if (!this._hiddenCanvas) {
                this._hiddenCanvas = document.createElement('canvas');
            }
            const context = this._hiddenCanvas.getContext('2d', { willReadFrequently: true });
            const text = 'abcdefghijklmnopqrstuvwxyz';
            let width1, width2;
            context.font = `40px ${name}, sans-serif`;
            width1 = context.measureText(text).width;
            context.font = '40px sans-serif';
            width2 = context.measureText(text).width;
            return width1 !== width2;
        }
    };

    /**
     * Starts playback of a video.
     *
     * @static
     * @method playVideo
     * @param {String} src
     */
    static playVideo(src) {
        this._videoLoader = ResourceHandler.createLoader(null, this._playVideo.bind(this, src), this._onVideoError.bind(this));
        this._playVideo(src);
    };

    /**
     * @static
     * @method _playVideo
     * @param {String} src
     * @private
     */
    static _playVideo(src) {
        this._video.src = src;
        this._video.onloadeddata = this._onVideoLoad.bind(this);
        this._video.onerror = this._videoLoader;
        this._video.onended = this._onVideoEnd.bind(this);
        this._video.load();
        this._videoLoading = true;
    };

    /**
     * Checks whether the video is playing.
     *
     * @static
     * @method isVideoPlaying
     * @return {Boolean} True if the video is playing
     */
    static isVideoPlaying() {
        return this._videoLoading || this._isVideoVisible();
    };

    /**
     * Checks whether the browser can play the specified video type.
     *
     * @static
     * @method canPlayVideoType
     * @param {String} type The video type to test support for
     * @return {Boolean} True if the browser can play the specified video type
     */
    static canPlayVideoType(type) {
        return this._video && this._video.canPlayType(type);
    };

    /**
     * Sets volume of a video.
     *
     * @static
     * @method setVideoVolume
     * @param {Number} value
     */
    static setVideoVolume(value) {
        this._videoVolume = value;
        if (this._video) {
            this._video.volume = this._videoVolume;
        }
    };

    /**
     * Converts an x coordinate on the page to the corresponding
     * x coordinate on the canvas area.
     *
     * @static
     * @method pageToCanvasX
     * @param {Number} x The x coordinate on the page to be converted
     * @return {Number} The x coordinate on the canvas area
     */
    static pageToCanvasX(x) {
        if (this._canvas) {
            const left = this._canvas.offsetLeft;
            return Math.round((x - left) / this._realScale);
        } else {
            return 0;
        }
    };

    /**
     * Converts a y coordinate on the page to the corresponding
     * y coordinate on the canvas area.
     *
     * @static
     * @method pageToCanvasY
     * @param {Number} y The y coordinate on the page to be converted
     * @return {Number} The y coordinate on the canvas area
     */
    static pageToCanvasY(y) {
        if (this._canvas) {
            const top = this._canvas.offsetTop;
            return Math.round((y - top) / this._realScale);
        } else {
            return 0;
        }
    };

    /**
     * Checks whether the specified point is inside the game canvas area.
     *
     * @static
     * @method isInsideCanvas
     * @param {Number} x The x coordinate on the canvas area
     * @param {Number} y The y coordinate on the canvas area
     * @return {Boolean} True if the specified point is inside the game canvas area
     */
    static isInsideCanvas(x, y) {
        return (x >= 0 && x < this._width && y >= 0 && y < this._height);
    };

    /**
     * Calls pixi.js garbage collector
     */
    static callGC() {
        if (Graphics.isWebGL()) {
            Graphics._renderer.textureGC.run();
        }
    };


    /**
     * The width of the game screen.
     *
     * @static
     * @property width
     * @type Number
     */
    static get width() {
        return this._width;
    };
    static set width(value) {
        if (this._width !== value) {
            this._width = value;
            this._updateAllElements();
        }
    };

    /**
     * The height of the game screen.
     *
     * @static
     * @property height
     * @type Number
     */
    static get height() {
        return this._height;
    };
    static set height(value) {
        if (this._height !== value) {
            this._height = value;
            this._updateAllElements();
        }
    };

    /**
     * The width of the window display area.
     *
     * @static
     * @property boxWidth
     * @type Number
     */
    static get boxWidth() {
        return this._boxWidth;
    };
    static set boxWidth(value) {
        this._boxWidth = value;
    };

    /**
     * The height of the window display area.
     *
     * @static
     * @property boxHeight
     * @type Number
     */
    static get boxHeight() {
        return this._boxHeight;
    };
    static set boxHeight(value) {
        this._boxHeight = value;
    };


    /**
     * The zoom scale of the game screen.
     *
     * @static
     * @property scale
     * @type Number
     */
    static get scale() {
        return this._scale;
    };
    static set scale(value) {
        if (this._scale !== value) {
            this._scale = value;
            this._updateAllElements();
        }
    };

    /**
     * @static
     * @method _createAllElements
     * @private
     */
    static _createAllElements() {
        this._createErrorPrinter();
        this._createCanvas();
        this._createVideo();
        this._createUpperCanvas();
        this._createRenderer();
        this._createModeBox();
        this._createFPSMeter();
        this._createGameFontLoader();
    };

    /**
     * @static
     * @method _updateAllElements
     * @private
     */
    static _updateAllElements() {
        this._updateRealScale();
        this._updateErrorPrinter();
        this._updateCanvas();
        this._updateVideo();
        this._updateUpperCanvas();
        this._updateRenderer();
        this._paintUpperCanvas();
    };

    /**
     * @static
     * @method _updateRealScale
     * @private
     */
    static _updateRealScale() {
        if (this._stretchEnabled) {
            let h = window.innerWidth / this._width;
            let v = window.innerHeight / this._height;
            if (h >= 1 && h - 0.01 <= 1) h = 1;
            if (v >= 1 && v - 0.01 <= 1) v = 1;
            this._realScale = Math.min(h, v);
        } else {
            this._realScale = this._scale;
        }
    };

    /**
     * @static
     * @method _makeErrorHtml
     * @param {String} name
     * @param {String} message
     * @return {String}
     * @private
     */
    static _makeErrorHtml(name, message) {
        return `
            <p style="color: yellow;"><b>${name}</b></p>
            <p style="color: white;">${message}</p>
        `;
    };

    /**
     * @static
     * @method _defaultStretchMode
     * @private
     */
    static _defaultStretchMode() {
        return Utils.isNwjs() || Utils.isMobileDevice();
    };

    /**
     * @static
     * @method _testCanvasBlendModes
     * @private
     */
    static _testCanvasBlendModes() {
        let canvas, context, imageData1, imageData2;
        canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        context = canvas.getContext('2d', { willReadFrequently: true });
        context.globalCompositeOperation = 'source-over';
        context.fillStyle = 'white';
        context.fillRect(0, 0, 1, 1);
        context.globalCompositeOperation = 'difference';
        context.fillStyle = 'white';
        context.fillRect(0, 0, 1, 1);
        imageData1 = context.getImageData(0, 0, 1, 1);
        context.globalCompositeOperation = 'source-over';
        context.fillStyle = 'black';
        context.fillRect(0, 0, 1, 1);
        context.globalCompositeOperation = 'saturation';
        context.fillStyle = 'white';
        context.fillRect(0, 0, 1, 1);
        imageData2 = context.getImageData(0, 0, 1, 1);
        this._canUseDifferenceBlend = imageData1.data[0] === 0;
        this._canUseSaturationBlend = imageData2.data[0] === 0;
    };

    /**
     * @static
     * @method _modifyExistingElements
     * @private
     */
    static _modifyExistingElements() {
        for (const element of document.getElementsByTagName('*')) {
            if (element.style.zIndex > 0) {
                element.style.zIndex = 0;
            }
        }
    };

    /**
     * @static
     * @method _createErrorPrinter
     * @private
     */
    static _createErrorPrinter() {
        this._errorPrinter = document.createElement('p');
        this._errorPrinter.id = 'ErrorPrinter';
        this._updateErrorPrinter();
        document.body.appendChild(this._errorPrinter);
    };

    /**
     * @static
     * @method _updateErrorPrinter
     * @private
     */
    static _updateErrorPrinter() {
        Object.assign(this._errorPrinter.style, {
            width: `${this._width * 0.9}px`,
            height: "40px",
            textAlign: "center",
            textShadow: "1px 1px 3px #000",
            fontSize: "20px",
            zIndex: 99
        });
        this._centerElement(this._errorPrinter);
    };

    /**
     * @static
     * @method _createCanvas
     * @private
     */
    static _createCanvas() {
        this._canvas = document.createElement('canvas');
        this._canvas.id = 'GameCanvas';
        this._updateCanvas();
        document.body.appendChild(this._canvas);
    };

    /**
     * @static
     * @method _updateCanvas
     * @private
     */
    static _updateCanvas() {
        this._canvas.width = this._width;
        this._canvas.height = this._height;
        this._canvas.style.zIndex = 1;
        this._centerElement(this._canvas);
    };

    /**
     * @static
     * @method _createVideo
     * @private
     */
    static _createVideo() {
        this._video = document.createElement('video');
        this._video.id = 'GameVideo';
        this._video.style.opacity = 0;
        this._video.setAttribute('playsinline', '');
        this._video.volume = this._videoVolume;
        this._updateVideo();
        makeVideoPlayableInline(this._video);
        document.body.appendChild(this._video);
    };

    /**
     * @static
     * @method _updateVideo
     * @private
     */
    static _updateVideo() {
        this._video.width = this._width;
        this._video.height = this._height;
        this._video.style.zIndex = 2;
        this._centerElement(this._video);
    };

    /**
     * @static
     * @method _createUpperCanvas
     * @private
     */
    static _createUpperCanvas() {
        this._upperCanvas = document.createElement('canvas');
        this._upperCanvas.id = 'UpperCanvas';
        this._updateUpperCanvas();
        document.body.appendChild(this._upperCanvas);
    };

    /**
     * @static
     * @method _updateUpperCanvas
     * @private
     */
    static _updateUpperCanvas() {
        this._upperCanvas.width = this._width;
        this._upperCanvas.height = this._height;
        this._upperCanvas.style.zIndex = 3;
        this._centerElement(this._upperCanvas);
    };

    /**
     * @static
     * @method _clearUpperCanvas
     * @private
     */
    static _clearUpperCanvas() {
        const context = this._upperCanvas.getContext('2d', { willReadFrequently: true });
        context.clearRect(0, 0, this._width, this._height);
    };

    /**
     * @static
     * @method _paintUpperCanvas
     * @private
     */
    static _paintUpperCanvas() {
        this._clearUpperCanvas();
        if (this._loadingImage && this._loadingCount >= 20) {
            const context = this._upperCanvas.getContext('2d', { willReadFrequently: true });
            const dx = (this._width - this._loadingImage.width) / 2;
            const dy = (this._height - this._loadingImage.height) / 2;
            const alpha = ((this._loadingCount - 20) / 30).clamp(0, 1);
            context.save();
            context.globalAlpha = alpha;
            context.drawImage(this._loadingImage, dx, dy);
            context.restore();
        }
    };

    /**
     * @static
     * @method _createRenderer
     * @private
     */
    static _createRenderer() {
        PIXI.dontSayHello = true;
        const width = this._width;
        const height = this._height;
        const options = { view: this._canvas };
        try {
            switch (this._rendererType) {
                case 'canvas':
                    this._renderer = new PIXI.CanvasRenderer(width, height, options);
                    break;
                case 'webgl':
                    this._renderer = new PIXI.WebGLRenderer(width, height, options);
                    break;
                default:
                    this._renderer = PIXI.autoDetectRenderer(width, height, options);
                    break;
            }

            if (this._renderer && this._renderer.textureGC)
                this._renderer.textureGC.maxIdle = 1;

        } catch (e) {
            this._renderer = null;
        }
    };

    /**
     * @static
     * @method _updateRenderer
     * @private
     */
    static _updateRenderer() {
        if (this._renderer) {
            this._renderer.resize(this._width, this._height);
        }
    };

    /**
     * @static
     * @method _createFPSMeter
     * @private
     */
    static _createFPSMeter() {
        this._fpsCounter = new FPSCounter(this._modeBox);
    };

    /**
     * @static
     * @method _createModeBox
     * @private
     */
    static _createModeBox() {
        const box = document.createElement('div');
        box.style.cssText = `
            position: absolute;
            left: 5px;
            top: 5px;
            width: 119px;
            height: 58px;
            background: rgba(0,0,0,0.2);
            z-index: 9;
            display: none;
        `;

        const text = document.createElement('div');
        text.id = 'modeText';
        text.style.cssText = `
            position: absolute;
            left: 0px;
            top: 41px;
            width: 119px;
            font-size: 12px;
            font-family: monospace;
            color: white;
            text-align: center;
            text-shadow: 1px 1px 0 rgba(0,0,0,0.5);
        `;
        text.textContent = this.isWebGL() ? 'WebGL mode' : 'Canvas mode';

        document.body.appendChild(box);
        box.appendChild(text);

        this._modeBox = box;
    };

    /**
     * @static
     * @method _createGameFontLoader
     * @private
     */
    static _createGameFontLoader() {
        this._createFontLoader('GameFont');
    };

    /**
     * @static
     * @method _createFontLoader
     * @param {String} name
     * @private
     */
    static _createFontLoader(name) {
        const div = document.createElement('div');
        const text = document.createTextNode('.');
        div.style.cssText = `
            font-family: ${name};
            font-size: 0px;
            color: transparent;
            position: absolute;
            margin: auto;
            top: 0px;
            left: 0px;
            width: 1px;
            height: 1px;
        `;
        div.appendChild(text);
        document.body.appendChild(div);
    };

    /**
     * @static
     * @method _centerElement
     * @param {HTMLElement} element
     * @private
     */
    static _centerElement(element) {
        const width = element.width * this._realScale;
        const height = element.height * this._realScale;

        Object.assign(element.style, {
            position: "absolute",
            margin: "auto",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            width: `${width}px`,
            height: `${height}px`
        });
    };

    /**
     * @static
     * @method _disableTextSelection
     * @private
     */
    static _disableTextSelection() {
        document.body.style.userSelect = "none";
    };

    /**
     * @static
     * @method _disableContextMenu
     * @private
     */
    static _disableContextMenu() {
        for (const element of document.body.getElementsByTagName('*')) {
            element.oncontextmenu = () => false;
        }
    };

    /**
     * @static
     * @method _applyCanvasFilter
     * @private
     */
    static _applyCanvasFilter() {
        if (this._canvas) {
            Object.assign(this._canvas.style, {
                opacity: "0.5",
                filter: "blur(8px)",
                WebkitFilter: "blur(8px)"
            });
        }
    };

    /**
     * @static
     * @method _onVideoLoad
     * @private
     */
    static _onVideoLoad() {
        this._video.play();
        this._updateVisibility(true);
        this._videoLoading = false;
    };

    /**
     * @static
     * @method _onVideoError
     * @private
     */
    static _onVideoError() {
        this._updateVisibility(false);
        this._videoLoading = false;
    };

    /**
     * @static
     * @method _onVideoEnd
     * @private
     */
    static _onVideoEnd() {
        this._updateVisibility(false);
    };

    /**
     * @static
     * @method _updateVisibility
     * @param {Boolean} videoVisible
     * @private
     */
    static _updateVisibility(videoVisible) {
        this._video.style.opacity = videoVisible ? 1 : 0;
        this._canvas.style.opacity = videoVisible ? 0 : 1;
    };

    /**
     * @static
     * @method _isVideoVisible
     * @return {Boolean}
     * @private
     */
    static _isVideoVisible() {
        return this._video.style.opacity > 0;
    };

    /**
     * @static
     * @method _setupEventHandlers
     * @private
     */
    static _setupEventHandlers() {
        window.addEventListener('resize', this._onWindowResize.bind(this));
        document.addEventListener('keydown', this._onKeyDown.bind(this));
        document.addEventListener('keydown', this._onTouchEnd.bind(this));
        document.addEventListener('mousedown', this._onTouchEnd.bind(this));
        document.addEventListener('touchend', this._onTouchEnd.bind(this));
    };

    /**
     * @static
     * @method _onWindowResize
     * @private
     */
    static _onWindowResize() {
        this._updateAllElements();
    };

    /**
     * @static
     * @method _onKeyDown
     * @param {KeyboardEvent} event
     * @private
     */
    static _onKeyDown(event) {
        if (!event.ctrlKey && !event.altKey) {
            switch (event.keyCode) {
                case 113:   // F2
                    event.preventDefault();
                    this._switchFPSMeter();
                    break;
                case 114:   // F3
                    event.preventDefault();
                    this._switchStretchMode();
                    break;
                case 115:   // F4
                    event.preventDefault();
                    this._switchFullScreen();
                    break;
            }
        }
    };

    /**
     * @static
     * @method _onTouchEnd
     * @param {TouchEvent} event
     * @private
     */
    static _onTouchEnd(event) {
        if (!this._videoUnlocked) {
            this._video.play();
            this._videoUnlocked = true;
        }
        if (this._isVideoVisible() && this._video.paused) {
            this._video.play();
        }
    };

    /**
     * @static
     * @method _switchFPSMeter
     * @private
     */
    static _switchFPSMeter() {
        if (this._fpsCounter) {
            this._fpsCounter.switchMode();
        }
    };

    /**
     * @static
     * @method _switchStretchMode
     * @return {Boolean}
     * @private
     */
    static _switchStretchMode() {
        this._stretchEnabled = !this._stretchEnabled;
        this._updateAllElements();
    };

    /**
     * @static
     * @method _switchFullScreen
     * @private
     */
    static _switchFullScreen() {
        if (this._isFullScreen()) {
            this._requestFullScreen();
        } else {
            this._cancelFullScreen();
        }
    };

    /**
     * @static
     * @method _isFullScreen
     * @return {Boolean}
     * @private
     */
    static _isFullScreen() {
        return ((document.fullScreenElement && document.fullScreenElement !== null) ||
            (!document.mozFullScreen && !document.webkitFullscreenElement &&
                !document.msFullscreenElement));
    };

    /**
     * @static
     * @method _requestFullScreen
     * @private
     */
    static _requestFullScreen() {
        let element = document.body;
        if (element.requestFullScreen) {
            element.requestFullScreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    };

    /**
     * @static
     * @method _cancelFullScreen
     * @private
     */
    static _cancelFullScreen() {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    };
};

//-----------------------------------------------------------------------------

/**
 * The static class that handles input data from the keyboard and gamepads.
 *
 * @class Input
 */
class Input {
    /**
     * Initializes the input system.
     *
     * @static
     * @method initialize
     */
    static initialize() {
        this.clear();
        this._wrapNwjsAlert();
        this._setupEventHandlers();
    };

    /**
     * The wait time of the key repeat in frames.
     *
     * @static
     * @property keyRepeatWait
     * @type Number
     */
    static keyRepeatWait = 24;

    /**
     * The interval of the key repeat in frames.
     *
     * @static
     * @property keyRepeatInterval
     * @type Number
     */
    static keyRepeatInterval = 6;

    /**
     * A hash table to convert from a virtual key code to a mapped key name.
     *
     * @static
     * @property keyMapper
     * @type Object
     */
    static keyMapper = {
        9: 'tab',       // tab
        13: 'ok',       // enter
        16: 'shift',    // shift
        17: 'control',  // control
        18: 'control',  // alt
        27: 'escape',   // escape
        32: 'ok',       // space
        33: 'pageup',   // pageup
        34: 'pagedown', // pagedown
        37: 'left',     // left arrow
        38: 'up',       // up arrow
        39: 'right',    // right arrow
        40: 'down',     // down arrow
        45: 'escape',   // insert
        81: 'pageup',   // Q
        87: 'pagedown', // W
        88: 'escape',   // X
        90: 'ok',       // Z
        96: 'escape',   // numpad 0
        98: 'down',     // numpad 2
        100: 'left',    // numpad 4
        102: 'right',   // numpad 6
        104: 'up',      // numpad 8
        120: 'debug'    // F9
    };

    /**
     * A hash table to convert from a gamepad button to a mapped key name.
     *
     * @static
     * @property gamepadMapper
     * @type Object
     */
    static gamepadMapper = {
        0: 'ok',        // A
        1: 'cancel',    // B
        2: 'shift',     // X
        3: 'menu',      // Y
        4: 'pageup',    // LB
        5: 'pagedown',  // RB
        12: 'up',       // D-pad up
        13: 'down',     // D-pad down
        14: 'left',     // D-pad left
        15: 'right',    // D-pad right
    };

    /**
     * Clears all the input data.
     *
     * @static
     * @method clear
     */
    static clear() {
        this._currentState = {};
        this._previousState = {};
        this._gamepadStates = [];
        this._latestButton = null;
        this._pressedTime = 0;
        this._dir4 = 0;
        this._dir8 = 0;
        this._preferredAxis = '';
        this._date = 0;
    };

    /**
     * Updates the input data.
     *
     * @static
     * @method update
     */
    static update() {
        this._pollGamepads();
        if (this._currentState[this._latestButton]) {
            this._pressedTime++;
        } else {
            this._latestButton = null;
        }
        for (const name in this._currentState) {
            if (this._currentState[name] && !this._previousState[name]) {
                this._latestButton = name;
                this._pressedTime = 0;
                this._date = Date.now();
            }
            this._previousState[name] = this._currentState[name];
        }
        this._updateDirection();
    };

    /**
     * Checks whether a key is currently pressed down.
     *
     * @static
     * @method isPressed
     * @param {String} keyName The mapped name of the key
     * @return {Boolean} True if the key is pressed
     */
    static isPressed(keyName) {
        if (this._isEscapeCompatible(keyName) && this.isPressed('escape')) {
            return true;
        } else {
            return !!this._currentState[keyName];
        }
    };

    /**
     * Checks whether a key is just pressed.
     *
     * @static
     * @method isTriggered
     * @param {String} keyName The mapped name of the key
     * @return {Boolean} True if the key is triggered
     */
    static isTriggered(keyName) {
        if (this._isEscapeCompatible(keyName) && this.isTriggered('escape')) {
            return true;
        } else {
            return this._latestButton === keyName && this._pressedTime === 0;
        }
    };

    /**
     * Checks whether a key is just pressed or a key repeat occurred.
     *
     * @static
     * @method isRepeated
     * @param {String} keyName The mapped name of the key
     * @return {Boolean} True if the key is repeated
     */
    static isRepeated(keyName) {
        if (this._isEscapeCompatible(keyName) && this.isRepeated('escape')) {
            return true;
        } else {
            return (this._latestButton === keyName &&
                (this._pressedTime === 0 ||
                    (this._pressedTime >= this.keyRepeatWait &&
                        this._pressedTime % this.keyRepeatInterval === 0)));
        }
    };

    /**
     * Checks whether a key is kept depressed.
     *
     * @static
     * @method isLongPressed
     * @param {String} keyName The mapped name of the key
     * @return {Boolean} True if the key is long-pressed
     */
    static isLongPressed(keyName) {
        if (this._isEscapeCompatible(keyName) && this.isLongPressed('escape')) {
            return true;
        } else {
            return (this._latestButton === keyName &&
                this._pressedTime >= this.keyRepeatWait);
        }
    };

    /**
     * [read-only] The four direction value as a number of the numpad, or 0 for neutral.
     *
     * @static
     * @property dir4
     * @type Number
     */
    static get dir4() {
        return this._dir4;
    };

    /**
     * [read-only] The eight direction value as a number of the numpad, or 0 for neutral.
     *
     * @static
     * @property dir8
     * @type Number
     */
    static get dir8() {
        return this._dir8;
    };

    /**
     * [read-only] The time of the last input in milliseconds.
     *
     * @static
     * @property date
     * @type Number
     */
    static get date() {
        return this._date;
    };

    /**
     * @static
     * @method _wrapNwjsAlert
     * @private
     */
    static _wrapNwjsAlert() {
        if (Utils.isNwjs()) {
            const _alert = window.alert;
            window.alert = function () {
                const gui = require('nw.gui');
                const win = gui.Window.get();
                _alert.apply(this, arguments);
                win.focus();
                Input.clear();
            };
        }
    };

    /**
     * @static
     * @method _setupEventHandlers
     * @private
     */
    static _setupEventHandlers() {
        document.addEventListener('keydown', this._onKeyDown.bind(this));
        document.addEventListener('keyup', this._onKeyUp.bind(this));
        window.addEventListener('blur', this._onLostFocus.bind(this));
    };

    /**
     * @static
     * @method _onKeyDown
     * @param {KeyboardEvent} event
     * @private
     */
    static _onKeyDown(event) {
        if (this._shouldPreventDefault(event.keyCode)) {
            event.preventDefault();
        }
        if (event.keyCode === 144) {    // Numlock
            this.clear();
        }
        const buttonName = this.keyMapper[event.keyCode];
        if (ResourceHandler.exists() && buttonName === 'ok') {
            ResourceHandler.retry();
        } else if (buttonName) {
            this._currentState[buttonName] = true;
        }
    };

    /**
     * @static
     * @method _shouldPreventDefault
     * @param {Number} keyCode
     * @private
     */
    static _shouldPreventDefault(keyCode) {
        switch (keyCode) {
            case 8:     // backspace
            case 33:    // pageup
            case 34:    // pagedown
            case 37:    // left arrow
            case 38:    // up arrow
            case 39:    // right arrow
            case 40:    // down arrow
                return true;
        }
        return false;
    };

    /**
     * @static
     * @method _onKeyUp
     * @param {KeyboardEvent} event
     * @private
     */
    static _onKeyUp(event) {
        const buttonName = this.keyMapper[event.keyCode];
        if (buttonName) {
            this._currentState[buttonName] = false;
        }
        if (event.keyCode === 0) {  // For QtWebEngine on OS X
            this.clear();
        }
    };

    /**
     * @static
     * @method _onLostFocus
     * @private
     */
    static _onLostFocus() {
        this.clear();
    };

    /**
     * @static
     * @method _pollGamepads
     * @private
     */
    static _pollGamepads() {
        if (navigator.getGamepads) {
            const gamepads = navigator.getGamepads();
            if (gamepads) {
                for (const gamepad of gamepads) {
                    if (gamepad && gamepad.connected) {
                        this._updateGamepadState(gamepad);
                    }
                }
            }
        }
    };

    /**
     * @static
     * @method _updateGamepadState
     * @param {Gamepad} gamepad
     * @param {Number} index
     * @private
     */
    static _updateGamepadState(gamepad) {
        const lastState = this._gamepadStates[gamepad.index] || [];
        const newState = [];
        const buttons = gamepad.buttons;
        const axes = gamepad.axes;
        const threshold = 0.5;
        newState[12] = false;
        newState[13] = false;
        newState[14] = false;
        newState[15] = false;
        for (let i = 0; i < buttons.length; i++) {
            newState[i] = buttons[i].pressed;
        }
        if (axes[1] < -threshold) {
            newState[12] = true;    // up
        } else if (axes[1] > threshold) {
            newState[13] = true;    // down
        }
        if (axes[0] < -threshold) {
            newState[14] = true;    // left
        } else if (axes[0] > threshold) {
            newState[15] = true;    // right
        }
        for (let j = 0; j < newState.length; j++) {
            if (newState[j] !== lastState[j]) {
                const buttonName = this.gamepadMapper[j];
                if (buttonName) {
                    this._currentState[buttonName] = newState[j];
                }
            }
        }
        this._gamepadStates[gamepad.index] = newState;
    };

    /**
     * @static
     * @method _updateDirection
     * @private
     */
    static _updateDirection() {
        let x = this._signX();
        let y = this._signY();

        this._dir8 = this._makeNumpadDirection(x, y);

        if (x !== 0 && y !== 0) {
            if (this._preferredAxis === 'x') {
                y = 0;
            } else {
                x = 0;
            }
        } else if (x !== 0) {
            this._preferredAxis = 'y';
        } else if (y !== 0) {
            this._preferredAxis = 'x';
        }

        this._dir4 = this._makeNumpadDirection(x, y);
    };

    /**
     * @static
     * @method _signX
     * @private
     */
    static _signX() {
        let x = 0;

        if (this.isPressed('left')) {
            x--;
        }
        if (this.isPressed('right')) {
            x++;
        }
        return x;
    };

    /**
     * @static
     * @method _signY
     * @private
     */
    static _signY() {
        let y = 0;

        if (this.isPressed('up')) {
            y--;
        }
        if (this.isPressed('down')) {
            y++;
        }
        return y;
    };

    /**
     * @static
     * @method _makeNumpadDirection
     * @param {Number} x
     * @param {Number} y
     * @return {Number}
     * @private
     */
    static _makeNumpadDirection(x, y) {
        if (x !== 0 || y !== 0) {
            return 5 - y * 3 + x;
        }
        return 0;
    };

    /**
     * @static
     * @method _isEscapeCompatible
     * @param {String} keyName
     * @return {Boolean}
     * @private
     */
    static _isEscapeCompatible(keyName) {
        return keyName === 'cancel' || keyName === 'menu';
    };
};

//-----------------------------------------------------------------------------
/**
 * The static class that handles input data from the mouse and touchscreen.
 *
 * @class TouchInput
 */
class TouchInput {
    /**
     * Initializes the touch system.
     *
     * @static
     * @method initialize
     */
    static initialize() {
        this.clear();
        this._setupEventHandlers();
    };

    /**
     * The wait time of the pseudo key repeat in frames.
     *
     * @static
     * @property keyRepeatWait
     * @type Number
     */
    static keyRepeatWait = 24;

    /**
     * The interval of the pseudo key repeat in frames.
     *
     * @static
     * @property keyRepeatInterval
     * @type Number
     */
    static keyRepeatInterval = 6;

    /**
     * Clears all the touch data.
     *
     * @static
     * @method clear
     */
    static clear() {
        this._mousePressed = false;
        this._screenPressed = false;
        this._pressedTime = 0;
        this._events = {};
        this._events.triggered = false;
        this._events.cancelled = false;
        this._events.moved = false;
        this._events.released = false;
        this._events.wheelX = 0;
        this._events.wheelY = 0;
        this._triggered = false;
        this._cancelled = false;
        this._moved = false;
        this._released = false;
        this._wheelX = 0;
        this._wheelY = 0;
        this._x = 0;
        this._y = 0;
        this._date = 0;
    };

    /**
     * Updates the touch data.
     *
     * @static
     * @method update
     */
    static update() {
        this._triggered = this._events.triggered;
        this._cancelled = this._events.cancelled;
        this._moved = this._events.moved;
        this._released = this._events.released;
        this._wheelX = this._events.wheelX;
        this._wheelY = this._events.wheelY;
        this._events.triggered = false;
        this._events.cancelled = false;
        this._events.moved = false;
        this._events.released = false;
        this._events.wheelX = 0;
        this._events.wheelY = 0;
        if (this.isPressed()) {
            this._pressedTime++;
        }
    };

    /**
     * Checks whether the mouse button or touchscreen is currently pressed down.
     *
     * @static
     * @method isPressed
     * @return {Boolean} True if the mouse button or touchscreen is pressed
     */
    static isPressed() {
        return this._mousePressed || this._screenPressed;
    };

    /**
     * Checks whether the left mouse button or touchscreen is just pressed.
     *
     * @static
     * @method isTriggered
     * @return {Boolean} True if the mouse button or touchscreen is triggered
     */
    static isTriggered() {
        return this._triggered;
    };

    /**
     * Checks whether the left mouse button or touchscreen is just pressed
     * or a pseudo key repeat occurred.
     *
     * @static
     * @method isRepeated
     * @return {Boolean} True if the mouse button or touchscreen is repeated
     */
    static isRepeated() {
        return (this.isPressed() &&
            (this._triggered ||
                (this._pressedTime >= this.keyRepeatWait &&
                    this._pressedTime % this.keyRepeatInterval === 0)));
    };

    /**
     * Checks whether the left mouse button or touchscreen is kept depressed.
     *
     * @static
     * @method isLongPressed
     * @return {Boolean} True if the left mouse button or touchscreen is long-pressed
     */
    static isLongPressed() {
        return this.isPressed() && this._pressedTime >= this.keyRepeatWait;
    };

    /**
     * Checks whether the right mouse button is just pressed.
     *
     * @static
     * @method isCancelled
     * @return {Boolean} True if the right mouse button is just pressed
     */
    static isCancelled() {
        return this._cancelled;
    };

    /**
     * Checks whether the mouse or a finger on the touchscreen is moved.
     *
     * @static
     * @method isMoved
     * @return {Boolean} True if the mouse or a finger on the touchscreen is moved
     */
    static isMoved() {
        return this._moved;
    };

    /**
     * Checks whether the left mouse button or touchscreen is released.
     *
     * @static
     * @method isReleased
     * @return {Boolean} True if the mouse button or touchscreen is released
     */
    static isReleased() {
        return this._released;
    };

    /**
     * [read-only] The horizontal scroll amount.
     *
     * @static
     * @property wheelX
     * @type Number
     */
    static get wheelX() {
        return this._wheelX;
    };

    /**
     * [read-only] The vertical scroll amount.
     *
     * @static
     * @property wheelY
     * @type Number
     */
    static get wheelY() {
        return this._wheelY;
    };

    /**
     * [read-only] The x coordinate on the canvas area of the latest touch event.
     *
     * @static
     * @property x
     * @type Number
     */
    static get x() {
        return this._x;
    };

    /**
     * [read-only] The y coordinate on the canvas area of the latest touch event.
     *
     * @static
     * @property y
     * @type Number
     */
    static get y() {
        return this._y;
    };

    /**
     * [read-only] The time of the last input in milliseconds.
     *
     * @static
     * @property date
     * @type Number
     */
    static get date() {
        return this._date;
    };

    /**
     * @static
     * @method _setupEventHandlers
     * @private
     */
    static _setupEventHandlers() {
        const isSupportPassive = Utils.isSupportPassiveEvent();
        document.addEventListener('mousedown', this._onMouseDown.bind(this));
        document.addEventListener('mousemove', this._onMouseMove.bind(this));
        document.addEventListener('mouseup', this._onMouseUp.bind(this));
        document.addEventListener('wheel', this._onWheel.bind(this));
        document.addEventListener('touchstart', this._onTouchStart.bind(this), isSupportPassive ? { passive: false } : false);
        document.addEventListener('touchmove', this._onTouchMove.bind(this), isSupportPassive ? { passive: false } : false);
        document.addEventListener('touchend', this._onTouchEnd.bind(this));
        document.addEventListener('touchcancel', this._onTouchCancel.bind(this));
        document.addEventListener('pointerdown', this._onPointerDown.bind(this));
    };

    /**
     * @static
     * @method _onMouseDown
     * @param {MouseEvent} event
     * @private
     */
    static _onMouseDown(event) {
        if (event.button === 0) {
            this._onLeftButtonDown(event);
        } else if (event.button === 1) {
            this._onMiddleButtonDown(event);
        } else if (event.button === 2) {
            this._onRightButtonDown(event);
        }
    };

    /**
     * @static
     * @method _onLeftButtonDown
     * @param {MouseEvent} event
     * @private
     */
    static _onLeftButtonDown(event) {
        const x = Graphics.pageToCanvasX(event.pageX);
        const y = Graphics.pageToCanvasY(event.pageY);
        if (Graphics.isInsideCanvas(x, y)) {
            this._mousePressed = true;
            this._pressedTime = 0;
            this._onTrigger(x, y);
        }
    };

    /**
     * @static
     * @method _onMiddleButtonDown
     * @param {MouseEvent} event
     * @private
     */
    static _onMiddleButtonDown(event) {
    };

    /**
     * @static
     * @method _onRightButtonDown
     * @param {MouseEvent} event
     * @private
     */
    static _onRightButtonDown(event) {
        const x = Graphics.pageToCanvasX(event.pageX);
        const y = Graphics.pageToCanvasY(event.pageY);
        if (Graphics.isInsideCanvas(x, y)) {
            this._onCancel(x, y);
        }
    };

    /**
     * @static
     * @method _onMouseMove
     * @param {MouseEvent} event
     * @private
     */
    static _onMouseMove(event) {
        if (this._mousePressed) {
            const x = Graphics.pageToCanvasX(event.pageX);
            const y = Graphics.pageToCanvasY(event.pageY);
            this._onMove(x, y);
        }
    };

    /**
     * @static
     * @method _onMouseUp
     * @param {MouseEvent} event
     * @private
     */
    static _onMouseUp(event) {
        if (event.button === 0) {
            const x = Graphics.pageToCanvasX(event.pageX);
            const y = Graphics.pageToCanvasY(event.pageY);
            this._mousePressed = false;
            this._onRelease(x, y);
        }
    };

    /**
     * @static
     * @method _onWheel
     * @param {WheelEvent} event
     * @private
     */
    static _onWheel(event) {
        this._events.wheelX += event.deltaX;
        this._events.wheelY += event.deltaY;
    };

    /**
     * @static
     * @method _onTouchStart
     * @param {TouchEvent} event
     * @private
     */
    static _onTouchStart(event) {
        for (const touch of event.changedTouches) {
            const x = Graphics.pageToCanvasX(touch.pageX);
            const y = Graphics.pageToCanvasY(touch.pageY);
            if (Graphics.isInsideCanvas(x, y)) {
                this._screenPressed = true;
                this._pressedTime = 0;
                if (event.touches.length >= 2) {
                    this._onCancel(x, y);
                } else {
                    this._onTrigger(x, y);
                }
                event.preventDefault();
            }
        }
        if (window.cordova || window.navigator.standalone) {
            event.preventDefault();
        }
    };

    /**
     * @static
     * @method _onTouchMove
     * @param {TouchEvent} event
     * @private
     */
    static _onTouchMove(event) {
        for (const touch of event.changedTouches) {
            const x = Graphics.pageToCanvasX(touch.pageX);
            const y = Graphics.pageToCanvasY(touch.pageY);
            this._onMove(x, y);
        }
    };

    /**
     * @static
     * @method _onTouchEnd
     * @param {TouchEvent} event
     * @private
     */
    static _onTouchEnd(event) {
        for (const touch of event.changedTouches) {
            const x = Graphics.pageToCanvasX(touch.pageX);
            const y = Graphics.pageToCanvasY(touch.pageY);
            this._screenPressed = false;
            this._onRelease(x, y);
        }
    };

    /**
     * @static
     * @method _onTouchCancel
     * @param {TouchEvent} event
     * @private
     */
    static _onTouchCancel(event) {
        this._screenPressed = false;
    };

    /**
     * @static
     * @method _onPointerDown
     * @param {PointerEvent} event
     * @private
     */
    static _onPointerDown(event) {
        if (event.pointerType === 'touch' && !event.isPrimary) {
            const x = Graphics.pageToCanvasX(event.pageX);
            const y = Graphics.pageToCanvasY(event.pageY);
            if (Graphics.isInsideCanvas(x, y)) {
                // For Microsoft Edge
                this._onCancel(x, y);
                event.preventDefault();
            }
        }
    };

    /**
     * @static
     * @method _onTrigger
     * @param {Number} x
     * @param {Number} y
     * @private
     */
    static _onTrigger(x, y) {
        this._events.triggered = true;
        this._x = x;
        this._y = y;
        this._date = Date.now();
    };

    /**
     * @static
     * @method _onCancel
     * @param {Number} x
     * @param {Number} y
     * @private
     */
    static _onCancel(x, y) {
        this._events.cancelled = true;
        this._x = x;
        this._y = y;
    };

    /**
     * @static
     * @method _onMove
     * @param {Number} x
     * @param {Number} y
     * @private
     */
    static _onMove(x, y) {
        this._events.moved = true;
        this._x = x;
        this._y = y;
    };

    /**
     * @static
     * @method _onRelease
     * @param {Number} x
     * @param {Number} y
     * @private
     */
    static _onRelease(x, y) {
        this._events.released = true;
        this._x = x;
        this._y = y;
    };
};

//-----------------------------------------------------------------------------

/**
 * The basic object that is rendered to the game screen.
 *
 * @class Sprite
 * @constructor
 * @param {Bitmap} bitmap The image for the sprite
 */
class Sprite extends PIXI.Sprite {
    constructor(...args) {
        super();

        this._renderCanvas_PIXI = this._renderCanvas;
        this._renderWebGL_PIXI = this._renderWebGL;

        this.initialize(...args);
    };

    static voidFilter = new PIXI.filters.AlphaFilter();

    initialize(bitmap) {
        const texture = new PIXI.Texture(new PIXI.BaseTexture());
        PIXI.Sprite.call(this, texture);

        this._bitmap = null;
        this._frame = new Rectangle();
        this._realFrame = new Rectangle();
        this._blendColor = [0, 0, 0, 0];
        this._colorTone = [0, 0, 0, 0];
        this._canvas = null;
        this._context = null;
        this._tintTexture = null;

        /**
         * use heavy renderer that will reduce border artifacts and apply advanced blendModes
         * @type {boolean}
         * @private
         */
        this._isPicture = false;

        this.spriteId = Sprite._counter++;
        this.opaque = false;

        this.bitmap = bitmap;
    };

    // Number of the created objects.
    static _counter = 0;

    /**
     * The image for the sprite.
     *
     * @property bitmap
     * @type Bitmap
     */
    get bitmap() {
        return this._bitmap;
    };
    set bitmap(value) {
        if (this._bitmap !== value) {
            this._bitmap = value;

            if (value) {
                this._refreshFrame = true;
                value.addLoadListener(this._onBitmapLoad.bind(this));
            } else {
                this._refreshFrame = false;
                this.texture.frame = Rectangle.emptyRectangle;
            }
        }
    };

    /**
     * The width of the sprite without the scale.
     *
     * @property width
     * @type Number
     */
    get width() {
        return this._frame.width;
    };
    set width(value) {
        this._frame.width = value;
        this._refresh();
    };

    /**
     * The height of the sprite without the scale.
     *
     * @property height
     * @type Number
     */
    get height() {
        return this._frame.height;
    };
    set height(value) {
        this._frame.height = value;
        this._refresh();
    };

    /**
     * The opacity of the sprite (0 to 255).
     *
     * @property opacity
     * @type Number
     */
    get opacity() {
        return this.alpha * 255;
    };
    set opacity(value) {
        this.alpha = value.clamp(0, 255) / 255;
    };

    /**
     * Updates the sprite for each frame.
     *
     * @method update
     */
    update() {
        for (const child of this.children) {
            child.update && child.update();
        }
    };

    /**
     * Sets the x and y at once.
     *
     * @method move
     * @param {Number} x The x coordinate of the sprite
     * @param {Number} y The y coordinate of the sprite
     */
    move(x, y) {
        this.x = x;
        this.y = y;
    };

    /**
     * Sets the rectagle of the bitmap that the sprite displays.
     *
     * @method setFrame
     * @param {Number} x The x coordinate of the frame
     * @param {Number} y The y coordinate of the frame
     * @param {Number} width The width of the frame
     * @param {Number} height The height of the frame
     */
    setFrame(x, y, width, height) {
        this._refreshFrame = false;
        const frame = this._frame;
        if (x !== frame.x || y !== frame.y ||
            width !== frame.width || height !== frame.height) {
            frame.x = x;
            frame.y = y;
            frame.width = width;
            frame.height = height;
            this._refresh();
        }
    };

    /**
     * Gets the blend color for the sprite.
     *
     * @method getBlendColor
     * @return {Array} The blend color [r, g, b, a]
     */
    getBlendColor() {
        return this._blendColor.clone();
    };

    /**
     * Sets the blend color for the sprite.
     *
     * @method setBlendColor
     * @param {Array} color The blend color [r, g, b, a]
     */
    setBlendColor(color) {
        if (!(color instanceof Array)) {
            throw new Error('Argument must be an array');
        }
        if (!this._blendColor.equals(color)) {
            this._blendColor = color.clone();
            this._refresh();
        }
    };

    /**
     * Gets the color tone for the sprite.
     *
     * @method getColorTone
     * @return {Array} The color tone [r, g, b, gray]
     */
    getColorTone() {
        return this._colorTone.clone();
    };

    /**
     * Sets the color tone for the sprite.
     *
     * @method setColorTone
     * @param {Array} tone The color tone [r, g, b, gray]
     */
    setColorTone(tone) {
        if (!(tone instanceof Array)) {
            throw new Error('Argument must be an array');
        }
        if (!this._colorTone.equals(tone)) {
            this._colorTone = tone.clone();
            this._refresh();
        }
    };

    /**
     * @method _onBitmapLoad
     * @private
     */
    _onBitmapLoad(bitmapLoaded) {
        if (bitmapLoaded === this._bitmap) {
            if (this._refreshFrame && this._bitmap) {
                this._refreshFrame = false;
                this._frame.width = this._bitmap.width;
                this._frame.height = this._bitmap.height;
            }
        }

        this._refresh();
    };

    /**
     * @method _refresh
     * @private
     */
    _refresh() {
        const frameX = Math.floor(this._frame.x);
        const frameY = Math.floor(this._frame.y);
        const frameW = Math.floor(this._frame.width);
        const frameH = Math.floor(this._frame.height);
        const bitmapW = this._bitmap ? this._bitmap.width : 0;
        const bitmapH = this._bitmap ? this._bitmap.height : 0;
        const realX = frameX.clamp(0, bitmapW);
        const realY = frameY.clamp(0, bitmapH);
        const realW = (frameW - realX + frameX).clamp(0, bitmapW - realX);
        const realH = (frameH - realY + frameY).clamp(0, bitmapH - realY);

        this._realFrame.x = realX;
        this._realFrame.y = realY;
        this._realFrame.width = realW;
        this._realFrame.height = realH;
        this.pivot.x = frameX - realX;
        this.pivot.y = frameY - realY;

        if (realW > 0 && realH > 0) {
            if (this._needsTint()) {
                this._createTinter(realW, realH);
                this._executeTint(realX, realY, realW, realH);
                this._tintTexture.update();
                this.texture.baseTexture = this._tintTexture;
                this.texture.frame = new Rectangle(0, 0, realW, realH);
            } else {
                if (this._bitmap) {
                    this.texture.baseTexture = this._bitmap.baseTexture;
                }
                this.texture.frame = this._realFrame;
            }
        } else if (this._bitmap) {
            this.texture.frame = Rectangle.emptyRectangle;
        } else {
            this.texture.baseTexture.width = Math.max(this.texture.baseTexture.width, this._frame.x + this._frame.width);
            this.texture.baseTexture.height = Math.max(this.texture.baseTexture.height, this._frame.y + this._frame.height);
            this.texture.frame = this._frame;
        }
        this.texture._updateID++;
    };

    /**
     * @method _isInBitmapRect
     * @param {Number} x
     * @param {Number} y
     * @param {Number} w
     * @param {Number} h
     * @return {Boolean}
     * @private
     */
    _isInBitmapRect(x, y, w, h) {
        return (this._bitmap && x + w > 0 && y + h > 0 &&
            x < this._bitmap.width && y < this._bitmap.height);
    };

    /**
     * @method _needsTint
     * @return {Boolean}
     * @private
     */
    _needsTint() {
        const tone = this._colorTone;
        return tone[0] || tone[1] || tone[2] || tone[3] || this._blendColor[3] > 0;
    };

    /**
     * @method _createTinter
     * @param {Number} w
     * @param {Number} h
     * @private
     */
    _createTinter(w, h) {
        if (!this._canvas) {
            this._canvas = document.createElement('canvas');
            this._context = this._canvas.getContext('2d', { willReadFrequently: true });
        }

        this._canvas.width = w;
        this._canvas.height = h;

        if (!this._tintTexture) {
            this._tintTexture = new PIXI.BaseTexture(this._canvas);
        }

        this._tintTexture.width = w;
        this._tintTexture.height = h;
        this._tintTexture.scaleMode = this._bitmap.baseTexture.scaleMode;
    };

    /**
     * @method _executeTint
     * @param {Number} x
     * @param {Number} y
     * @param {Number} w
     * @param {Number} h
     * @private
     */
    _executeTint(x, y, w, h) {
        const context = this._context;
        const tone = this._colorTone;
        const color = this._blendColor;

        context.globalCompositeOperation = 'copy';
        context.drawImage(this._bitmap.canvas, x, y, w, h, 0, 0, w, h);

        if (Graphics.canUseSaturationBlend()) {
            const gray = Math.max(0, tone[3]);
            context.globalCompositeOperation = 'saturation';
            context.fillStyle = `rgba(255,255,255,${gray / 255})`;
            context.fillRect(0, 0, w, h);
        }

        const r1 = Math.max(0, tone[0]);
        const g1 = Math.max(0, tone[1]);
        const b1 = Math.max(0, tone[2]);
        context.globalCompositeOperation = 'lighter';
        context.fillStyle = Utils.rgbToCssColor(r1, g1, b1);
        context.fillRect(0, 0, w, h);

        if (Graphics.canUseDifferenceBlend()) {
            context.globalCompositeOperation = 'difference';
            context.fillStyle = 'white';
            context.fillRect(0, 0, w, h);

            const r2 = Math.max(0, -tone[0]);
            const g2 = Math.max(0, -tone[1]);
            const b2 = Math.max(0, -tone[2]);
            context.globalCompositeOperation = 'lighter';
            context.fillStyle = Utils.rgbToCssColor(r2, g2, b2);
            context.fillRect(0, 0, w, h);

            context.globalCompositeOperation = 'difference';
            context.fillStyle = 'white';
            context.fillRect(0, 0, w, h);
        }

        const r3 = Math.max(0, color[0]);
        const g3 = Math.max(0, color[1]);
        const b3 = Math.max(0, color[2]);
        const a3 = Math.max(0, color[3]);
        context.globalCompositeOperation = 'source-atop';
        context.fillStyle = Utils.rgbToCssColor(r3, g3, b3);
        context.globalAlpha = a3 / 255;
        context.fillRect(0, 0, w, h);

        context.globalCompositeOperation = 'destination-in';
        context.globalAlpha = 1;
        context.drawImage(this._bitmap.canvas, x, y, w, h, 0, 0, w, h);
    };

    /**
     * @method _renderCanvas
     * @param {Object} renderer
     * @private
     */
    _renderCanvas(renderer) {
        if (this.bitmap) {
            this.bitmap.touch();
        }
        if (this.bitmap && !this.bitmap.isReady()) {
            return;
        }

        if (this.texture.frame.width > 0 && this.texture.frame.height > 0) {
            this._renderCanvas_PIXI(renderer);
        }
    };

    /**
     * checks if we need to speed up custom blendmodes
     * @param renderer
     * @private
     */
    _speedUpCustomBlendModes(renderer) {
        const picture = renderer.plugins.picture;
        const blend = this.blendMode;
        if (renderer.renderingToScreen && renderer._activeRenderTarget.root) {
            if (picture.drawModes[blend]) {
                const stage = renderer._lastObjectRendered;
                let f = stage._filters;
                if (!f || !f[0]) {
                    setTimeout(() => {
                        f = stage._filters;
                        if (!f || !f[0]) {
                            stage.filters = [Sprite.voidFilter];
                            stage.filterArea = new PIXI.Rectangle(0, 0, Graphics.width, Graphics.height);
                        }
                    }, 0);
                }
            }
        }
    };

    /**
     * @method _renderWebGL
     * @param {Object} renderer
     * @private
     */
    _renderWebGL(renderer) {
        if (this.bitmap) {
            this.bitmap.touch();
        }
        if (this.bitmap && !this.bitmap.isReady()) {
            return;
        }
        if (this.texture.frame.width > 0 && this.texture.frame.height > 0) {
            if (this._bitmap) {
                this._bitmap.checkDirty();
            }

            //copy of pixi-v4 internal code
            this.calculateVertices();

            if (this.pluginName === 'sprite' && this._isPicture) {
                // use heavy renderer, which reduces artifacts and applies corrent blendMode,
                // but does not use multitexture optimization
                this._speedUpCustomBlendModes(renderer);
                renderer.setObjectRenderer(renderer.plugins.picture);
                renderer.plugins.picture.render(this);
            } else {
                // use pixi super-speed renderer
                renderer.setObjectRenderer(renderer.plugins[this.pluginName]);
                renderer.plugins[this.pluginName].render(this);
            }
        }
    };
};

//-----------------------------------------------------------------------------

/**
 * The tilemap which displays 2D tile-based game map.
 *
 * @class Tilemap
 * @constructor
 */
class Tilemap extends PIXI.Container {
    constructor(...args) {
        super();
        this.initialize(...args);
    };

    initialize() {
        PIXI.Container.call(this);

        this._margin = 20;
        this._width = Graphics.width + this._margin * 2;
        this._height = Graphics.height + this._margin * 2;
        this._tileWidth = 48;
        this._tileHeight = 48;
        this._mapWidth = 0;
        this._mapHeight = 0;
        this._mapData = null;
        this._layerWidth = 0;
        this._layerHeight = 0;
        this._lastTiles = [];

        /**
         * The bitmaps used as a tileset.
         *
         * @property bitmaps
         * @type Array
         */
        this.bitmaps = [];

        /**
         * The origin point of the tilemap for scrolling.
         *
         * @property origin
         * @type Point
         */
        this.origin = new Point();

        /**
         * The tileset flags.
         *
         * @property flags
         * @type Array
         */
        this.flags = [];

        /**
         * The animation count for autotiles.
         *
         * @property animationCount
         * @type Number
         */
        this.animationCount = 0;

        /**
         * Whether the tilemap loops horizontal.
         *
         * @property horizontalWrap
         * @type Boolean
         */
        this.horizontalWrap = false;

        /**
         * Whether the tilemap loops vertical.
         *
         * @property verticalWrap
         * @type Boolean
         */
        this.verticalWrap = false;

        this._createLayers();
        this.refresh();
    };

    /**
     * The width of the screen in pixels.
     *
     * @property width
     * @type Number
     */
    get width() {
        return this._width;
    };
    set width(value) {
        if (this._width !== value) {
            this._width = value;
            this._createLayers();
        }
    };

    /**
     * The height of the screen in pixels.
     *
     * @property height
     * @type Number
     */
    get height() {
        return this._height;
    };
    set height(value) {
        if (this._height !== value) {
            this._height = value;
            this._createLayers();
        }
    };

    /**
     * The width of a tile in pixels.
     *
     * @property tileWidth
     * @type Number
     */
    get tileWidth() {
        return this._tileWidth;
    };
    set tileWidth(value) {
        if (this._tileWidth !== value) {
            this._tileWidth = value;
            this._createLayers();
        }
    };

    /**
     * The height of a tile in pixels.
     *
     * @property tileHeight
     * @type Number
     */
    get tileHeight() {
        return this._tileHeight;
    };
    set tileHeight(value) {
        if (this._tileHeight !== value) {
            this._tileHeight = value;
            this._createLayers();
        }
    };

    /**
     * Sets the tilemap data.
     *
     * @method setData
     * @param {Number} width The width of the map in number of tiles
     * @param {Number} height The height of the map in number of tiles
     * @param {Array} data The one dimensional array for the map data
     */
    setData(width, height, data) {
        this._mapWidth = width;
        this._mapHeight = height;
        this._mapData = data;
    };

    /**
     * Checks whether the tileset is ready to render.
     *
     * @method isReady
     * @type Boolean
     * @return {Boolean} True if the tilemap is ready
     */
    isReady() {
        for (const bitmaps of this.bitmaps) {
            if (bitmaps && !bitmaps.isReady()) {
                return false;
            }
        }
        return true;
    };

    /**
     * Updates the tilemap for each frame.
     *
     * @method update
     */
    update() {
        this.animationCount++;
        this.animationFrame = Math.floor(this.animationCount / 30);
        for (const child of this.children) {
            child.update && child.update();
        }
        for (const bitmap of this.bitmaps) {
            bitmap?.touch();
        }
    };

    /**
     * Forces to repaint the entire tilemap.
     *
     * @method refresh
     */
    refresh() {
        this._lastTiles.length = 0;
    };

    /**
     * Forces to refresh the tileset
     *
     * @method refresh
     */
    refreshTileset() {

    };

    /**
     * @method updateTransform
     * @private
     */
    updateTransform() {
        const ox = Math.floor(this.origin.x);
        const oy = Math.floor(this.origin.y);
        const startX = Math.floor((ox - this._margin) / this._tileWidth);
        const startY = Math.floor((oy - this._margin) / this._tileHeight);
        this._updateLayerPositions(startX, startY);
        if (this._needsRepaint || this._lastAnimationFrame !== this.animationFrame ||
            this._lastStartX !== startX || this._lastStartY !== startY) {
            this._frameUpdated = this._lastAnimationFrame !== this.animationFrame;
            this._lastAnimationFrame = this.animationFrame;
            this._lastStartX = startX;
            this._lastStartY = startY;
            this._paintAllTiles(startX, startY);
            this._needsRepaint = false;
        }
        this._sortChildren();
        super.updateTransform();
    };

    /**
     * @method _createLayers
     * @private
     */
    _createLayers() {
        const width = this._width;
        const height = this._height;
        const margin = this._margin;
        const tileCols = Math.ceil(width / this._tileWidth) + 1;
        const tileRows = Math.ceil(height / this._tileHeight) + 1;
        const layerWidth = tileCols * this._tileWidth;
        const layerHeight = tileRows * this._tileHeight;
        this._lowerBitmap = new Bitmap(layerWidth, layerHeight);
        this._upperBitmap = new Bitmap(layerWidth, layerHeight);
        this._layerWidth = layerWidth;
        this._layerHeight = layerHeight;

        /*
         * Z coordinate:
         *
         * 0 : Lower tiles
         * 1 : Lower characters
         * 3 : Normal characters
         * 4 : Upper tiles
         * 5 : Upper characters
         * 6 : Airship shadow
         * 7 : Balloon
         * 8 : Animation
         * 9 : Destination
         */

        this._lowerLayer = new Sprite();
        this._lowerLayer.move(-margin, -margin, width, height);
        this._lowerLayer.z = 0;

        this._upperLayer = new Sprite();
        this._upperLayer.move(-margin, -margin, width, height);
        this._upperLayer.z = 4;

        for (let i = 0; i < 4; i++) {
            this._lowerLayer.addChild(new Sprite(this._lowerBitmap));
            this._upperLayer.addChild(new Sprite(this._upperBitmap));
        }

        this.addChild(this._lowerLayer);
        this.addChild(this._upperLayer);
    };

    /**
     * @method _updateLayerPositions
     * @param {Number} startX
     * @param {Number} startY
     * @private
     */
    _updateLayerPositions(startX, startY) {
        const m = this._margin;
        const ox = Math.floor(this.origin.x);
        const oy = Math.floor(this.origin.y);
        const x2 = (ox - m).mod(this._layerWidth);
        const y2 = (oy - m).mod(this._layerHeight);
        const w1 = this._layerWidth - x2;
        const h1 = this._layerHeight - y2;
        const w2 = this._width - w1;
        const h2 = this._height - h1;

        for (let i = 0; i < 2; i++) {
            let children;
            if (i === 0) {
                children = this._lowerLayer.children;
            } else {
                children = this._upperLayer.children;
            }
            children[0].move(0, 0, w1, h1);
            children[0].setFrame(x2, y2, w1, h1);
            children[1].move(w1, 0, w2, h1);
            children[1].setFrame(0, y2, w2, h1);
            children[2].move(0, h1, w1, h2);
            children[2].setFrame(x2, 0, w1, h2);
            children[3].move(w1, h1, w2, h2);
            children[3].setFrame(0, 0, w2, h2);
        }
    };

    /**
     * @method _paintAllTiles
     * @param {Number} startX
     * @param {Number} startY
     * @private
     */
    _paintAllTiles(startX, startY) {
        const tileCols = Math.ceil(this._width / this._tileWidth) + 1;
        const tileRows = Math.ceil(this._height / this._tileHeight) + 1;
        for (let y = 0; y < tileRows; y++) {
            for (let x = 0; x < tileCols; x++) {
                this._paintTiles(startX, startY, x, y);
            }
        }
    };

    /**
     * @method _paintTiles
     * @param {Number} startX
     * @param {Number} startY
     * @param {Number} x
     * @param {Number} y
     * @private
     */
    _paintTiles(startX, startY, x, y) {
        const tableEdgeVirtualId = 10000;
        const mx = startX + x;
        const my = startY + y;
        const dx = (mx * this._tileWidth).mod(this._layerWidth);
        const dy = (my * this._tileHeight).mod(this._layerHeight);
        const lx = dx / this._tileWidth;
        const ly = dy / this._tileHeight;
        const tileId0 = this._readMapData(mx, my, 0);
        const tileId1 = this._readMapData(mx, my, 1);
        const tileId2 = this._readMapData(mx, my, 2);
        const tileId3 = this._readMapData(mx, my, 3);
        const shadowBits = this._readMapData(mx, my, 4);
        const upperTileId1 = this._readMapData(mx, my - 1, 1);
        const lowerTiles = [];
        const upperTiles = [];

        if (this._isHigherTile(tileId0)) {
            upperTiles.push(tileId0);
        } else {
            lowerTiles.push(tileId0);
        }
        if (this._isHigherTile(tileId1)) {
            upperTiles.push(tileId1);
        } else {
            lowerTiles.push(tileId1);
        }

        lowerTiles.push(-shadowBits);

        if (this._isTableTile(upperTileId1) && !this._isTableTile(tileId1)) {
            if (!Tilemap.isShadowingTile(tileId0)) {
                lowerTiles.push(tableEdgeVirtualId + upperTileId1);
            }
        }

        if (this._isOverpassPosition(mx, my)) {
            upperTiles.push(tileId2);
            upperTiles.push(tileId3);
        } else {
            if (this._isHigherTile(tileId2)) {
                upperTiles.push(tileId2);
            } else {
                lowerTiles.push(tileId2);
            }
            if (this._isHigherTile(tileId3)) {
                upperTiles.push(tileId3);
            } else {
                lowerTiles.push(tileId3);
            }
        }

        const lastLowerTiles = this._readLastTiles(0, lx, ly);
        if (!lowerTiles.equals(lastLowerTiles) ||
            (Tilemap.isTileA1(tileId0) && this._frameUpdated)) {
            this._lowerBitmap.clearRect(dx, dy, this._tileWidth, this._tileHeight);
            for (const lowerTileId of lowerTiles) {
                if (lowerTileId < 0) {
                    this._drawShadow(this._lowerBitmap, shadowBits, dx, dy);
                } else if (lowerTileId >= tableEdgeVirtualId) {
                    this._drawTableEdge(this._lowerBitmap, upperTileId1, dx, dy);
                } else {
                    this._drawTile(this._lowerBitmap, lowerTileId, dx, dy);
                }
            }
            this._writeLastTiles(0, lx, ly, lowerTiles);
        }

        const lastUpperTiles = this._readLastTiles(1, lx, ly);
        if (!upperTiles.equals(lastUpperTiles)) {
            this._upperBitmap.clearRect(dx, dy, this._tileWidth, this._tileHeight);
            for (const tiles of upperTiles) {
                this._drawTile(this._upperBitmap, tiles, dx, dy);
            }
            this._writeLastTiles(1, lx, ly, upperTiles);
        }
    };

    /**
     * @method _readLastTiles
     * @param {Number} i
     * @param {Number} x
     * @param {Number} y
     * @private
     */
    _readLastTiles(i, x, y) {
        const tiles = this._lastTiles[i]?.[y]?.[x];
        return tiles ? tiles : [];
    };

    /**
     * @method _writeLastTiles
     * @param {Number} i
     * @param {Number} x
     * @param {Number} y
     * @param {Array} tiles
     * @private
     */
    _writeLastTiles(i, x, y, tiles) {
        const array1 = this._lastTiles[i] ||= [];
        const array2 = array1[y] ||= [];
        array2[x] = tiles;
    };

    /**
     * @method _drawTile
     * @param {Bitmap} bitmap
     * @param {Number} tileId
     * @param {Number} dx
     * @param {Number} dy
     * @private
     */
    _drawTile(bitmap, tileId, dx, dy) {
        if (Tilemap.isVisibleTile(tileId)) {
            if (Tilemap.isAutotile(tileId)) {
                this._drawAutotile(bitmap, tileId, dx, dy);
            } else {
                this._drawNormalTile(bitmap, tileId, dx, dy);
            }
        }
    };

    /**
     * @method _drawNormalTile
     * @param {Bitmap} bitmap
     * @param {Number} tileId
     * @param {Number} dx
     * @param {Number} dy
     * @private
     */
    _drawNormalTile(bitmap, tileId, dx, dy) {
        let setNumber = 0;

        if (Tilemap.isTileA5(tileId)) {
            setNumber = 4;
        } else {
            setNumber = 5 + Math.floor(tileId / 256);
        }

        const w = this._tileWidth;
        const h = this._tileHeight;
        const sx = (Math.floor(tileId / 128) % 2 * 8 + tileId % 8) * w;
        const sy = (Math.floor(tileId % 256 / 8) % 16) * h;

        const source = this.bitmaps[setNumber];
        if (source) {
            bitmap.bltImage(source, sx, sy, w, h, dx, dy, w, h);
        }
    };

    /**
     * @method _drawAutotile
     * @param {Bitmap} bitmap
     * @param {Number} tileId
     * @param {Number} dx
     * @param {Number} dy
     * @private
     */
    _drawAutotile(bitmap, tileId, dx, dy) {
        let autotileTable = Tilemap.FLOOR_AUTOTILE_TABLE;
        const kind = Tilemap.getAutotileKind(tileId);
        const shape = Tilemap.getAutotileShape(tileId);
        const tx = kind % 8;
        const ty = Math.floor(kind / 8);
        let bx = 0;
        let by = 0;
        let setNumber = 0;
        let isTable = false;

        if (Tilemap.isTileA1(tileId)) {
            let waterSurfaceIndex = [0, 1, 2, 1][this.animationFrame % 4];
            setNumber = 0;
            if (kind === 0) {
                bx = waterSurfaceIndex * 2;
                by = 0;
            } else if (kind === 1) {
                bx = waterSurfaceIndex * 2;
                by = 3;
            } else if (kind === 2) {
                bx = 6;
                by = 0;
            } else if (kind === 3) {
                bx = 6;
                by = 3;
            } else {
                bx = Math.floor(tx / 4) * 8;
                by = ty * 6 + Math.floor(tx / 2) % 2 * 3;
                if (kind % 2 === 0) {
                    bx += waterSurfaceIndex * 2;
                }
                else {
                    bx += 6;
                    autotileTable = Tilemap.WATERFALL_AUTOTILE_TABLE;
                    by += this.animationFrame % 3;
                }
            }
        } else if (Tilemap.isTileA2(tileId)) {
            setNumber = 1;
            bx = tx * 2;
            by = (ty - 2) * 3;
            isTable = this._isTableTile(tileId);
        } else if (Tilemap.isTileA3(tileId)) {
            setNumber = 2;
            bx = tx * 2;
            by = (ty - 6) * 2;
            autotileTable = Tilemap.WALL_AUTOTILE_TABLE;
        } else if (Tilemap.isTileA4(tileId)) {
            setNumber = 3;
            bx = tx * 2;
            by = Math.floor((ty - 10) * 2.5 + (ty % 2 === 1 ? 0.5 : 0));
            if (ty % 2 === 1) {
                autotileTable = Tilemap.WALL_AUTOTILE_TABLE;
            }
        }

        const table = autotileTable[shape];
        const source = this.bitmaps[setNumber];

        if (table && source) {
            const w1 = this._tileWidth / 2;
            const h1 = this._tileHeight / 2;
            for (let i = 0; i < 4; i++) {
                const qsx = table[i][0];
                const qsy = table[i][1];
                const sx1 = (bx * 2 + qsx) * w1;
                const sy1 = (by * 2 + qsy) * h1;
                const dx1 = dx + (i % 2) * w1;
                let dy1 = dy + Math.floor(i / 2) * h1;
                if (isTable && (qsy === 1 || qsy === 5)) {
                    let qsx2 = qsx;
                    const qsy2 = 3;
                    if (qsy === 1) {
                        qsx2 = [0, 3, 2, 1][qsx];
                    }
                    const sx2 = (bx * 2 + qsx2) * w1;
                    const sy2 = (by * 2 + qsy2) * h1;
                    bitmap.bltImage(source, sx2, sy2, w1, h1, dx1, dy1, w1, h1);
                    dy1 += h1 / 2;
                    bitmap.bltImage(source, sx1, sy1, w1, h1 / 2, dx1, dy1, w1, h1 / 2);
                } else {
                    bitmap.bltImage(source, sx1, sy1, w1, h1, dx1, dy1, w1, h1);
                }
            }
        }
    };

    /**
     * @method _drawTableEdge
     * @param {Bitmap} bitmap
     * @param {Number} tileId
     * @param {Number} dx
     * @param {Number} dy
     * @private
     */
    _drawTableEdge(bitmap, tileId, dx, dy) {
        if (Tilemap.isTileA2(tileId)) {
            const autotileTable = Tilemap.FLOOR_AUTOTILE_TABLE;
            const kind = Tilemap.getAutotileKind(tileId);
            const shape = Tilemap.getAutotileShape(tileId);
            const tx = kind % 8;
            const ty = Math.floor(kind / 8);
            const setNumber = 1;
            const bx = tx * 2;
            const by = (ty - 2) * 3;
            const table = autotileTable[shape];

            if (table) {
                const source = this.bitmaps[setNumber];
                const w1 = this._tileWidth / 2;
                const h1 = this._tileHeight / 2;
                for (let i = 0; i < 2; i++) {
                    const qsx = table[2 + i][0];
                    const qsy = table[2 + i][1];
                    const sx1 = (bx * 2 + qsx) * w1;
                    const sy1 = (by * 2 + qsy) * h1 + h1 / 2;
                    const dx1 = dx + (i % 2) * w1;
                    const dy1 = dy + Math.floor(i / 2) * h1;
                    bitmap.bltImage(source, sx1, sy1, w1, h1 / 2, dx1, dy1, w1, h1 / 2);
                }
            }
        }
    };

    /**
     * @method _drawShadow
     * @param {Bitmap} bitmap
     * @param {Number} shadowBits
     * @param {Number} dx
     * @param {Number} dy
     * @private
     */
    _drawShadow(bitmap, shadowBits, dx, dy) {
        if (shadowBits & 0x0f) {
            const w1 = this._tileWidth / 2;
            const h1 = this._tileHeight / 2;
            const color = 'rgba(0,0,0,0.5)';
            for (let i = 0; i < 4; i++) {
                if (shadowBits & (1 << i)) {
                    const dx1 = dx + (i % 2) * w1;
                    const dy1 = dy + Math.floor(i / 2) * h1;
                    bitmap.fillRect(dx1, dy1, w1, h1, color);
                }
            }
        }
    };

    /**
     * @method _readMapData
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     * @return {Number}
     * @private
     */
    _readMapData(x, y, z) {
        if (this._mapData) {
            const width = this._mapWidth;
            const height = this._mapHeight;
            if (this.horizontalWrap) {
                x = x.mod(width);
            }
            if (this.verticalWrap) {
                y = y.mod(height);
            }
            if (x >= 0 && x < width && y >= 0 && y < height) {
                return this._mapData[(z * height + y) * width + x] || 0;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    };

    /**
     * @method _isHigherTile
     * @param {Number} tileId
     * @return {Boolean}
     * @private
     */
    _isHigherTile(tileId) {
        return this.flags[tileId] & 0x10;
    };

    /**
     * @method _isTableTile
     * @param {Number} tileId
     * @return {Boolean}
     * @private
     */
    _isTableTile(tileId) {
        return Tilemap.isTileA2(tileId) && (this.flags[tileId] & 0x80);
    };

    /**
     * @method _isOverpassPosition
     * @param {Number} mx
     * @param {Number} my
     * @return {Boolean}
     * @private
     */
    _isOverpassPosition(mx, my) {
        return false;
    };

    /**
     * @method _sortChildren
     * @private
     */
    _sortChildren() {
        this.children.sort(this._compareChildOrder.bind(this));
    };

    /**
     * @method _compareChildOrder
     * @param {Object} a
     * @param {Object} b
     * @private
     */
    _compareChildOrder(a, b) {
        if (a.z !== b.z) {
            return a.z - b.z;
        } else if (a.y !== b.y) {
            return a.y - b.y;
        } else {
            return a.spriteId - b.spriteId;
        }
    };

    // Tile type checkers

    static TILE_ID_B = 0;
    static TILE_ID_C = 256;
    static TILE_ID_D = 512;
    static TILE_ID_E = 768;
    static TILE_ID_A5 = 1536;
    static TILE_ID_A1 = 2048;
    static TILE_ID_A2 = 2816;
    static TILE_ID_A3 = 4352;
    static TILE_ID_A4 = 5888;
    static TILE_ID_MAX = 8192;

    static isVisibleTile(tileId) {
        return tileId > 0 && tileId < this.TILE_ID_MAX;
    };

    static isAutotile(tileId) {
        return tileId >= this.TILE_ID_A1;
    };

    static getAutotileKind(tileId) {
        return Math.floor((tileId - this.TILE_ID_A1) / 48);
    };

    static getAutotileShape(tileId) {
        return (tileId - this.TILE_ID_A1) % 48;
    };

    static makeAutotileId(kind, shape) {
        return this.TILE_ID_A1 + kind * 48 + shape;
    };

    static isSameKindTile(tileID1, tileID2) {
        if (this.isAutotile(tileID1) && this.isAutotile(tileID2)) {
            return this.getAutotileKind(tileID1) === this.getAutotileKind(tileID2);
        } else {
            return tileID1 === tileID2;
        }
    };

    static isTileA1(tileId) {
        return tileId >= this.TILE_ID_A1 && tileId < this.TILE_ID_A2;
    };

    static isTileA2(tileId) {
        return tileId >= this.TILE_ID_A2 && tileId < this.TILE_ID_A3;
    };

    static isTileA3(tileId) {
        return tileId >= this.TILE_ID_A3 && tileId < this.TILE_ID_A4;
    };

    static isTileA4(tileId) {
        return tileId >= this.TILE_ID_A4 && tileId < this.TILE_ID_MAX;
    };

    static isTileA5(tileId) {
        return tileId >= this.TILE_ID_A5 && tileId < this.TILE_ID_A1;
    };

    static isWaterTile(tileId) {
        if (this.isTileA1(tileId)) {
            return !(tileId >= this.TILE_ID_A1 + 96 && tileId < this.TILE_ID_A1 + 192);
        } else {
            return false;
        }
    };

    static isWaterfallTile(tileId) {
        if (tileId >= this.TILE_ID_A1 + 192 && tileId < this.TILE_ID_A2) {
            return this.getAutotileKind(tileId) % 2 === 1;
        } else {
            return false;
        }
    };

    static isGroundTile(tileId) {
        return this.isTileA1(tileId) || this.isTileA2(tileId) || this.isTileA5(tileId);
    };

    static isShadowingTile(tileId) {
        return this.isTileA3(tileId) || this.isTileA4(tileId);
    };

    static isRoofTile(tileId) {
        return this.isTileA3(tileId) && this.getAutotileKind(tileId) % 16 < 8;
    };

    static isWallTopTile(tileId) {
        return this.isTileA4(tileId) && this.getAutotileKind(tileId) % 16 < 8;
    };

    static isWallSideTile(tileId) {
        return (this.isTileA3(tileId) || this.isTileA4(tileId)) &&
            this.getAutotileKind(tileId) % 16 >= 8;
    };

    static isWallTile(tileId) {
        return this.isWallTopTile(tileId) || this.isWallSideTile(tileId);
    };

    static isFloorTypeAutotile(tileId) {
        return (this.isTileA1(tileId) && !this.isWaterfallTile(tileId)) ||
            this.isTileA2(tileId) || this.isWallTopTile(tileId);
    };

    static isWallTypeAutotile(tileId) {
        return this.isRoofTile(tileId) || this.isWallSideTile(tileId);
    };

    static isWaterfallTypeAutotile(tileId) {
        return this.isWaterfallTile(tileId);
    };

    // Autotile shape number to coordinates of tileset images

    static FLOOR_AUTOTILE_TABLE = [
        [[2, 4], [1, 4], [2, 3], [1, 3]], [[2, 0], [1, 4], [2, 3], [1, 3]],
        [[2, 4], [3, 0], [2, 3], [1, 3]], [[2, 0], [3, 0], [2, 3], [1, 3]],
        [[2, 4], [1, 4], [2, 3], [3, 1]], [[2, 0], [1, 4], [2, 3], [3, 1]],
        [[2, 4], [3, 0], [2, 3], [3, 1]], [[2, 0], [3, 0], [2, 3], [3, 1]],
        [[2, 4], [1, 4], [2, 1], [1, 3]], [[2, 0], [1, 4], [2, 1], [1, 3]],
        [[2, 4], [3, 0], [2, 1], [1, 3]], [[2, 0], [3, 0], [2, 1], [1, 3]],
        [[2, 4], [1, 4], [2, 1], [3, 1]], [[2, 0], [1, 4], [2, 1], [3, 1]],
        [[2, 4], [3, 0], [2, 1], [3, 1]], [[2, 0], [3, 0], [2, 1], [3, 1]],
        [[0, 4], [1, 4], [0, 3], [1, 3]], [[0, 4], [3, 0], [0, 3], [1, 3]],
        [[0, 4], [1, 4], [0, 3], [3, 1]], [[0, 4], [3, 0], [0, 3], [3, 1]],
        [[2, 2], [1, 2], [2, 3], [1, 3]], [[2, 2], [1, 2], [2, 3], [3, 1]],
        [[2, 2], [1, 2], [2, 1], [1, 3]], [[2, 2], [1, 2], [2, 1], [3, 1]],
        [[2, 4], [3, 4], [2, 3], [3, 3]], [[2, 4], [3, 4], [2, 1], [3, 3]],
        [[2, 0], [3, 4], [2, 3], [3, 3]], [[2, 0], [3, 4], [2, 1], [3, 3]],
        [[2, 4], [1, 4], [2, 5], [1, 5]], [[2, 0], [1, 4], [2, 5], [1, 5]],
        [[2, 4], [3, 0], [2, 5], [1, 5]], [[2, 0], [3, 0], [2, 5], [1, 5]],
        [[0, 4], [3, 4], [0, 3], [3, 3]], [[2, 2], [1, 2], [2, 5], [1, 5]],
        [[0, 2], [1, 2], [0, 3], [1, 3]], [[0, 2], [1, 2], [0, 3], [3, 1]],
        [[2, 2], [3, 2], [2, 3], [3, 3]], [[2, 2], [3, 2], [2, 1], [3, 3]],
        [[2, 4], [3, 4], [2, 5], [3, 5]], [[2, 0], [3, 4], [2, 5], [3, 5]],
        [[0, 4], [1, 4], [0, 5], [1, 5]], [[0, 4], [3, 0], [0, 5], [1, 5]],
        [[0, 2], [3, 2], [0, 3], [3, 3]], [[0, 2], [1, 2], [0, 5], [1, 5]],
        [[0, 4], [3, 4], [0, 5], [3, 5]], [[2, 2], [3, 2], [2, 5], [3, 5]],
        [[0, 2], [3, 2], [0, 5], [3, 5]], [[0, 0], [1, 0], [0, 1], [1, 1]]
    ];

    static WALL_AUTOTILE_TABLE = [
        [[2, 2], [1, 2], [2, 1], [1, 1]], [[0, 2], [1, 2], [0, 1], [1, 1]],
        [[2, 0], [1, 0], [2, 1], [1, 1]], [[0, 0], [1, 0], [0, 1], [1, 1]],
        [[2, 2], [3, 2], [2, 1], [3, 1]], [[0, 2], [3, 2], [0, 1], [3, 1]],
        [[2, 0], [3, 0], [2, 1], [3, 1]], [[0, 0], [3, 0], [0, 1], [3, 1]],
        [[2, 2], [1, 2], [2, 3], [1, 3]], [[0, 2], [1, 2], [0, 3], [1, 3]],
        [[2, 0], [1, 0], [2, 3], [1, 3]], [[0, 0], [1, 0], [0, 3], [1, 3]],
        [[2, 2], [3, 2], [2, 3], [3, 3]], [[0, 2], [3, 2], [0, 3], [3, 3]],
        [[2, 0], [3, 0], [2, 3], [3, 3]], [[0, 0], [3, 0], [0, 3], [3, 3]]
    ];

    static WATERFALL_AUTOTILE_TABLE = [
        [[2, 0], [1, 0], [2, 1], [1, 1]], [[0, 0], [1, 0], [0, 1], [1, 1]],
        [[2, 0], [3, 0], [2, 1], [3, 1]], [[0, 0], [3, 0], [0, 1], [3, 1]]
    ];
};

//-----------------------------------------------------------------------------

// we need this constant for some platforms (Samsung S4, S5, Tab4, HTC One H8)
PIXI.glCore.VertexArrayObject.FORCE_NATIVE = true;
PIXI.settings.GC_MODE = PIXI.GC_MODES.AUTO;
PIXI.tilemap.TileRenderer.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
PIXI.tilemap.TileRenderer.DO_CLEAR = true;

/**
 * The tilemap which displays 2D tile-based game map using shaders
 *
 * @class Tilemap
 * @constructor
 */
class ShaderTilemap extends Tilemap {
    constructor(...args) {
        super(...args);
        this.roundPixels = true;
    };

    /**
     * Uploads animation state in renderer
     *
     * @method _hackRenderer
     * @private
     */
    _hackRenderer(renderer) {
        let af = this.animationFrame % 4;
        if (af == 3) af = 1;
        renderer.plugins.tilemap.tileAnim[0] = af * this._tileWidth;
        renderer.plugins.tilemap.tileAnim[1] = (this.animationFrame % 3) * this._tileHeight;
        return renderer;
    };

    /**
     * PIXI render method
     *
     * @method renderCanvas
     * @param {Object} pixi renderer
     */
    renderCanvas(renderer) {
        this._hackRenderer(renderer);
        PIXI.Container.prototype.renderCanvas.call(this, renderer);
    };


    /**
     * PIXI render method
     *
     * @method renderWebGL
     * @param {Object} pixi renderer
     */
    renderWebGL(renderer) {
        this._hackRenderer(renderer);
        PIXI.Container.prototype.renderWebGL.call(this, renderer);
    };

    /**
     * Forces to repaint the entire tilemap AND update bitmaps list if needed
     *
     * @method refresh
     */
    refresh() {
        if (this._lastBitmapLength !== this.bitmaps.length) {
            this._lastBitmapLength = this.bitmaps.length;
            this.refreshTileset();
        };
        this._needsRepaint = true;
    };

    /**
     * Call after you update tileset
     *
     * @method updateBitmaps
     */
    refreshTileset() {
        const bitmaps = this.bitmaps.map(x => x._baseTexture ? new PIXI.Texture(x._baseTexture) : x);
        this.lowerLayer.setBitmaps(bitmaps);
        this.upperLayer.setBitmaps(bitmaps);
    };

    /**
     * @method updateTransform
     * @private
     */
    updateTransform() {
        let ox, oy;
        if (this.roundPixels) {
            ox = Math.floor(this.origin.x);
            oy = Math.floor(this.origin.y);
        } else {
            ox = this.origin.x;
            oy = this.origin.y;
        }
        const startX = Math.floor((ox - this._margin) / this._tileWidth);
        const startY = Math.floor((oy - this._margin) / this._tileHeight);
        this._updateLayerPositions(startX, startY);
        if (this._needsRepaint ||
            this._lastStartX !== startX || this._lastStartY !== startY) {
            this._lastStartX = startX;
            this._lastStartY = startY;
            this._paintAllTiles(startX, startY);
            this._needsRepaint = false;
        }
        this._sortChildren();
        PIXI.Container.prototype.updateTransform.call(this);
    };

    /**
     * @method _createLayers
     * @private
     */
    _createLayers() {
        const width = this._width;
        const height = this._height;
        const margin = this._margin;
        const tileCols = Math.ceil(width / this._tileWidth) + 1;
        const tileRows = Math.ceil(height / this._tileHeight) + 1;
        const layerWidth = this._layerWidth = tileCols * this._tileWidth;
        const layerHeight = this._layerHeight = tileRows * this._tileHeight;
        this._needsRepaint = true;

        if (!this.lowerZLayer) {
            //@hackerham: create layers only in initialization. Doesn't depend on width/height
            this.addChild(this.lowerZLayer = new PIXI.tilemap.ZLayer(this, 0));
            this.addChild(this.upperZLayer = new PIXI.tilemap.ZLayer(this, 4));

            const parameters = PluginManager.parameters('ShaderTilemap');
            const useSquareShader = Number(parameters.hasOwnProperty('squareShader') ? parameters['squareShader'] : 0);

            this.lowerZLayer.addChild(this.lowerLayer = new PIXI.tilemap.CompositeRectTileLayer(0, [], useSquareShader));
            this.lowerLayer.shadowColor = new Float32Array([0.0, 0.0, 0.0, 0.5]);
            this.upperZLayer.addChild(this.upperLayer = new PIXI.tilemap.CompositeRectTileLayer(4, [], useSquareShader));
        }
    };

    /**
     * @method _updateLayerPositions
     * @param {Number} startX
     * @param {Number} startY
     * @private
     */
    _updateLayerPositions(startX, startY) {
        let ox, oy;
        if (this.roundPixels) {
            ox = Math.floor(this.origin.x);
            oy = Math.floor(this.origin.y);
        } else {
            ox = this.origin.x;
            oy = this.origin.y;
        }
        this.lowerZLayer.position.x = startX * this._tileWidth - ox;
        this.lowerZLayer.position.y = startY * this._tileHeight - oy;
        this.upperZLayer.position.x = startX * this._tileWidth - ox;
        this.upperZLayer.position.y = startY * this._tileHeight - oy;
    };

    /**
     * @method _paintAllTiles
     * @param {Number} startX
     * @param {Number} startY
     * @private
     */
    _paintAllTiles(startX, startY) {
        this.lowerZLayer.clear();
        this.upperZLayer.clear();
        const tileCols = Math.ceil(this._width / this._tileWidth) + 1;
        const tileRows = Math.ceil(this._height / this._tileHeight) + 1;
        for (let y = 0; y < tileRows; y++) {
            for (let x = 0; x < tileCols; x++) {
                this._paintTiles(startX, startY, x, y);
            }
        }
    };

    /**
     * @method _paintTiles
     * @param {Number} startX
     * @param {Number} startY
     * @param {Number} x
     * @param {Number} y
     * @private
     */
    _paintTiles(startX, startY, x, y) {
        const mx = startX + x;
        const my = startY + y;
        const dx = x * this._tileWidth, dy = y * this._tileHeight;
        const tileId0 = this._readMapData(mx, my, 0);
        const tileId1 = this._readMapData(mx, my, 1);
        const tileId2 = this._readMapData(mx, my, 2);
        const tileId3 = this._readMapData(mx, my, 3);
        const shadowBits = this._readMapData(mx, my, 4);
        const upperTileId1 = this._readMapData(mx, my - 1, 1);
        const lowerLayer = this.lowerLayer.children[0];
        const upperLayer = this.upperLayer.children[0];

        if (this._isHigherTile(tileId0)) {
            this._drawTile(upperLayer, tileId0, dx, dy);
        } else {
            this._drawTile(lowerLayer, tileId0, dx, dy);
        }
        if (this._isHigherTile(tileId1)) {
            this._drawTile(upperLayer, tileId1, dx, dy);
        } else {
            this._drawTile(lowerLayer, tileId1, dx, dy);
        }

        this._drawShadow(lowerLayer, shadowBits, dx, dy);
        if (this._isTableTile(upperTileId1) && !this._isTableTile(tileId1)) {
            if (!Tilemap.isShadowingTile(tileId0)) {
                this._drawTableEdge(lowerLayer, upperTileId1, dx, dy);
            }
        }

        if (this._isOverpassPosition(mx, my)) {
            this._drawTile(upperLayer, tileId2, dx, dy);
            this._drawTile(upperLayer, tileId3, dx, dy);
        } else {
            if (this._isHigherTile(tileId2)) {
                this._drawTile(upperLayer, tileId2, dx, dy);
            } else {
                this._drawTile(lowerLayer, tileId2, dx, dy);
            }
            if (this._isHigherTile(tileId3)) {
                this._drawTile(upperLayer, tileId3, dx, dy);
            } else {
                this._drawTile(lowerLayer, tileId3, dx, dy);
            }
        }
    };

    /**
     * @method _drawTile
     * @param {Array} layers
     * @param {Number} tileId
     * @param {Number} dx
     * @param {Number} dy
     * @private
     */
    _drawTile(layer, tileId, dx, dy) {
        if (Tilemap.isVisibleTile(tileId)) {
            if (Tilemap.isAutotile(tileId)) {
                this._drawAutotile(layer, tileId, dx, dy);
            } else {
                this._drawNormalTile(layer, tileId, dx, dy);
            }
        }
    };

    /**
     * @method _drawNormalTile
     * @param {Array} layers
     * @param {Number} tileId
     * @param {Number} dx
     * @param {Number} dy
     * @private
     */
    _drawNormalTile(layer, tileId, dx, dy) {
        let setNumber = 0;

        if (Tilemap.isTileA5(tileId)) {
            setNumber = 4;
        } else {
            setNumber = 5 + Math.floor(tileId / 256);
        }

        const w = this._tileWidth;
        const h = this._tileHeight;
        const sx = (Math.floor(tileId / 128) % 2 * 8 + tileId % 8) * w;
        const sy = (Math.floor(tileId % 256 / 8) % 16) * h;

        layer.addRect(setNumber, sx, sy, dx, dy, w, h);
    };

    /**
     * @method _drawAutotile
     * @param {Array} layers
     * @param {Number} tileId
     * @param {Number} dx
     * @param {Number} dy
     * @private
     */
    _drawAutotile(layer, tileId, dx, dy) {
        let autotileTable = Tilemap.FLOOR_AUTOTILE_TABLE;
        const kind = Tilemap.getAutotileKind(tileId);
        const shape = Tilemap.getAutotileShape(tileId);
        const tx = kind % 8;
        const ty = Math.floor(kind / 8);
        let bx = 0;
        let by = 0;
        let setNumber = 0;
        let isTable = false;
        let animX = 0, animY = 0;

        if (Tilemap.isTileA1(tileId)) {
            setNumber = 0;
            if (kind === 0) {
                animX = 2;
                by = 0;
            } else if (kind === 1) {
                animX = 2;
                by = 3;
            } else if (kind === 2) {
                bx = 6;
                by = 0;
            } else if (kind === 3) {
                bx = 6;
                by = 3;
            } else {
                bx = Math.floor(tx / 4) * 8;
                by = ty * 6 + Math.floor(tx / 2) % 2 * 3;
                if (kind % 2 === 0) {
                    animX = 2;
                }
                else {
                    bx += 6;
                    autotileTable = Tilemap.WATERFALL_AUTOTILE_TABLE;
                    animY = 1;
                }
            }
        } else if (Tilemap.isTileA2(tileId)) {
            setNumber = 1;
            bx = tx * 2;
            by = (ty - 2) * 3;
            isTable = this._isTableTile(tileId);
        } else if (Tilemap.isTileA3(tileId)) {
            setNumber = 2;
            bx = tx * 2;
            by = (ty - 6) * 2;
            autotileTable = Tilemap.WALL_AUTOTILE_TABLE;
        } else if (Tilemap.isTileA4(tileId)) {
            setNumber = 3;
            bx = tx * 2;
            by = Math.floor((ty - 10) * 2.5 + (ty % 2 === 1 ? 0.5 : 0));
            if (ty % 2 === 1) {
                autotileTable = Tilemap.WALL_AUTOTILE_TABLE;
            }
        }

        const table = autotileTable[shape];
        const w1 = this._tileWidth / 2;
        const h1 = this._tileHeight / 2;
        for (let i = 0; i < 4; i++) {
            const qsx = table[i][0];
            const qsy = table[i][1];
            const sx1 = (bx * 2 + qsx) * w1;
            const sy1 = (by * 2 + qsy) * h1;
            const dx1 = dx + (i % 2) * w1;
            const dy1 = dy + Math.floor(i / 2) * h1;
            if (isTable && (qsy === 1 || qsy === 5)) {
                let qsx2 = qsx;
                const qsy2 = 3;
                if (qsy === 1) {
                    //qsx2 = [0, 3, 2, 1][qsx];
                    qsx2 = (4 - qsx) % 4;
                }
                const sx2 = (bx * 2 + qsx2) * w1;
                const sy2 = (by * 2 + qsy2) * h1;
                layer.addRect(setNumber, sx2, sy2, dx1, dy1, w1, h1, animX, animY);
                layer.addRect(setNumber, sx1, sy1, dx1, dy1 + h1 / 2, w1, h1 / 2, animX, animY);
            } else {
                layer.addRect(setNumber, sx1, sy1, dx1, dy1, w1, h1, animX, animY);
            }
        }
    };

    /**
     * @method _drawTableEdge
     * @param {Array} layers
     * @param {Number} tileId
     * @param {Number} dx
     * @param {Number} dy
     * @private
     */
    _drawTableEdge(layer, tileId, dx, dy) {
        if (Tilemap.isTileA2(tileId)) {
            const autotileTable = Tilemap.FLOOR_AUTOTILE_TABLE;
            const kind = Tilemap.getAutotileKind(tileId);
            const shape = Tilemap.getAutotileShape(tileId);
            const tx = kind % 8;
            const ty = Math.floor(kind / 8);
            const setNumber = 1;
            const bx = tx * 2;
            const by = (ty - 2) * 3;
            const table = autotileTable[shape];
            const w1 = this._tileWidth / 2;
            const h1 = this._tileHeight / 2;
            for (let i = 0; i < 2; i++) {
                const qsx = table[2 + i][0];
                const qsy = table[2 + i][1];
                const sx1 = (bx * 2 + qsx) * w1;
                const sy1 = (by * 2 + qsy) * h1 + h1 / 2;
                const dx1 = dx + (i % 2) * w1;
                const dy1 = dy + Math.floor(i / 2) * h1;
                layer.addRect(setNumber, sx1, sy1, dx1, dy1, w1, h1 / 2);
            }
        }
    };

    /**
     * @method _drawShadow
     * @param {Number} shadowBits
     * @param {Number} dx
     * @param {Number} dy
     * @private
     */
    _drawShadow(layer, shadowBits, dx, dy) {
        if (shadowBits & 0x0f) {
            const w1 = this._tileWidth / 2;
            const h1 = this._tileHeight / 2;
            for (let i = 0; i < 4; i++) {
                if (shadowBits & (1 << i)) {
                    const dx1 = dx + (i % 2) * w1;
                    const dy1 = dy + Math.floor(i / 2) * h1;
                    layer.addRect(-1, 0, 0, dx1, dy1, w1, h1);
                }
            }
        }
    };
};

//-----------------------------------------------------------------------------

/**
 * The sprite object for a tiling image.
 *
 * @class TilingSprite
 * @constructor
 * @param {Bitmap} bitmap The image for the tiling sprite
 */
class TilingSprite extends PIXI.extras.PictureTilingSprite {
    constructor(...args) {
        super(new PIXI.Texture(new PIXI.BaseTexture()));

        this._renderCanvas_PIXI = super._renderCanvas;
        this._renderWebGL_PIXI = super._renderWebGL;

        this.updateTransformTS = PIXI.extras.TilingSprite.prototype.updateTransform;
        this._speedUpCustomBlendModes = Sprite.prototype._speedUpCustomBlendModes;

        this.initialize(...args);
    };

    initialize(bitmap) {
        this._bitmap = null;
        this._width = 0;
        this._height = 0;
        this._frame = new Rectangle();
        this.spriteId = Sprite._counter++;
        /**
         * The origin point of the tiling sprite for scrolling.
         *
         * @property origin
         * @type Point
         */
        this.origin = new Point();

        this.bitmap = bitmap;
    };

    /**
     * @method _renderCanvas
     * @param {Object} renderer
     * @private
     */
    _renderCanvas(renderer) {
        if (this._bitmap) {
            this._bitmap.touch();
        }
        if (this.texture.frame.width > 0 && this.texture.frame.height > 0) {
            this._renderCanvas_PIXI(renderer);
        }
    };

    /**
     * @method _renderWebGL
     * @param {Object} renderer
     * @private
     */
    _renderWebGL(renderer) {
        if (this._bitmap) {
            this._bitmap.touch();
        }
        if (this.texture.frame.width > 0 && this.texture.frame.height > 0) {
            if (this._bitmap) {
                this._bitmap.checkDirty();
            }
            this._renderWebGL_PIXI(renderer);
        }
    };

    /**
     * The image for the tiling sprite.
     *
     * @property bitmap
     * @type Bitmap
     */
    get bitmap() {
        return this._bitmap;
    };
    set bitmap(value) {
        if (this._bitmap !== value) {
            this._bitmap = value;
            if (this._bitmap) {
                this._bitmap.addLoadListener(this._onBitmapLoad.bind(this));
            } else {
                this.texture.frame = Rectangle.emptyRectangle;
            }
        }
    };

    /**
     * The opacity of the tiling sprite (0 to 255).
     *
     * @property opacity
     * @type Number
     */
    get opacity() {
        return this.alpha * 255;
    };
    set opacity(value) {
        this.alpha = value.clamp(0, 255) / 255;
    };

    /**
     * Updates the tiling sprite for each frame.
     *
     * @method update
     */
    update() {
        for (const child of this.children) {
            child.update && child.update();
        }
    };

    /**
     * Sets the x, y, width, and height all at once.
     *
     * @method move
     * @param {Number} x The x coordinate of the tiling sprite
     * @param {Number} y The y coordinate of the tiling sprite
     * @param {Number} width The width of the tiling sprite
     * @param {Number} height The height of the tiling sprite
     */
    move(x, y, width, height) {
        this.x = x || 0;
        this.y = y || 0;
        this._width = width || 0;
        this._height = height || 0;
    };

    /**
     * Specifies the region of the image that the tiling sprite will use.
     *
     * @method setFrame
     * @param {Number} x The x coordinate of the frame
     * @param {Number} y The y coordinate of the frame
     * @param {Number} width The width of the frame
     * @param {Number} height The height of the frame
     */
    setFrame(x, y, width, height) {
        this._frame.x = x;
        this._frame.y = y;
        this._frame.width = width;
        this._frame.height = height;
        this._refresh();
    };

    /**
     * @method updateTransform
     * @private
     */
    updateTransform() {
        this.tilePosition.x = Math.round(-this.origin.x);
        this.tilePosition.y = Math.round(-this.origin.y);
        this.updateTransformTS();
    };

    /**
     * @method _onBitmapLoad
     * @private
     */
    _onBitmapLoad() {
        this.texture.baseTexture = this._bitmap.baseTexture;
        this._refresh();
    };

    /**
     * @method _refresh
     * @private
     */
    _refresh() {
        const frame = this._frame.clone();
        if (frame.width === 0 && frame.height === 0 && this._bitmap) {
            frame.width = this._bitmap.width;
            frame.height = this._bitmap.height;
        }
        this.texture.frame = frame;
        this.texture._updateID++;
        this.tilingTexture = null;
    };

    /**
     * @method _renderWebGL
     * @param {Object} renderer
     * @private
     */
    _renderWebGL(renderer) {
        if (this._bitmap) {
            this._bitmap.touch();
            this._bitmap.checkDirty();
        }

        this._speedUpCustomBlendModes(renderer);

        this._renderWebGL_PIXI(renderer);
    };
};

//-----------------------------------------------------------------------------

/**
 * The sprite which covers the entire game screen.
 *
 * @class ScreenSprite
 * @constructor
 */
class ScreenSprite extends PIXI.Container {
    constructor(...args) {
        super();
        this.initialize(...args);
    };

    initialize() {
        PIXI.Container.call(this);

        this._graphics = new PIXI.Graphics();
        this.addChild(this._graphics);
        this.opacity = 0;

        this._red = -1;
        this._green = -1;
        this._blue = -1;
        this._colorText = '';
        this.setBlack();
    };

    /**
     * The opacity of the sprite (0 to 255).
     *
     * @property opacity
     * @type Number
     */
    get opacity() {
        return this.alpha * 255;
    };
    set opacity(value) {
        this.alpha = value.clamp(0, 255) / 255;
    };

    static YEPWarned = false;
    static warnYep() {
        if (!ScreenSprite.YEPWarned) {
            console.log("Deprecation warning. Please update YEP_CoreEngine. ScreenSprite is not a sprite, it has graphics inside.");
            ScreenSprite.YEPWarned = true;
        }
    };

    get anchor() {
        ScreenSprite.warnYep();
        this.scale.x = 1;
        this.scale.y = 1;
        return { x: 0, y: 0 };
    };
    set anchor(value) {
        this.alpha = value.clamp(0, 255) / 255;
    };

    get blendMode() {
        this.alpha = value.clamp(0, 255) / 255;
    };
    set blendMode(value) {
        this._graphics.blendMode = value;
    };

    /**
     * Sets black to the color of the screen sprite.
     *
     * @method setBlack
     */
    setBlack() {
        this.setColor(0, 0, 0);
    };

    /**
     * Sets white to the color of the screen sprite.
     *
     * @method setWhite
     */
    setWhite() {
        this.setColor(255, 255, 255);
    };

    /**
     * Sets the color of the screen sprite by values.
     *
     * @method setColor
     * @param {Number} r The red value in the range (0, 255)
     * @param {Number} g The green value in the range (0, 255)
     * @param {Number} b The blue value in the range (0, 255)
     */
    setColor(r, g, b) {
        if (this._red !== r || this._green !== g || this._blue !== b) {
            r = Math.round(r || 0).clamp(0, 255);
            g = Math.round(g || 0).clamp(0, 255);
            b = Math.round(b || 0).clamp(0, 255);
            this._red = r;
            this._green = g;
            this._blue = b;
            this._colorText = Utils.rgbToCssColor(r, g, b);

            const graphics = this._graphics;
            graphics.clear();
            const intColor = (r << 16) | (g << 8) | b;
            graphics.beginFill(intColor, 1);
            //whole screen with zoom. BWAHAHAHAHA
            graphics.drawRect(-Graphics.width * 5, -Graphics.height * 5, Graphics.width * 10, Graphics.height * 10);
        }
    };
};

//-----------------------------------------------------------------------------

/**
 * The window in the game.
 *
 * @class Window
 * @constructor
 */
class Window extends PIXI.Container {
    constructor(...args) {
        super();
        this.initialize(...args);
    };

    initialize() {
        PIXI.Container.call(this);

        this._isWindow = true;
        this._windowskin = null;
        this._width = 0;
        this._height = 0;
        this._cursorRect = new Rectangle();
        this._openness = 255;
        this._animationCount = 0;

        this._padding = 18;
        this._margin = 4;
        this._colorTone = [0, 0, 0];

        this._windowSpriteContainer = null;
        this._windowBackSprite = null;
        this._windowCursorSprite = null;
        this._windowFrameSprite = null;
        this._windowContentsSprite = null;
        this._windowArrowSprites = [];
        this._windowPauseSignSprite = null;

        this._createAllParts();

        /**
         * The origin point of the window for scrolling.
         *
         * @property origin
         * @type Point
         */
        this.origin = new Point();

        /**
         * The active state for the window.
         *
         * @property active
         * @type Boolean
         */
        this.active = true;

        /**
         * The visibility of the down scroll arrow.
         *
         * @property downArrowVisible
         * @type Boolean
         */
        this.downArrowVisible = false;

        /**
         * The visibility of the up scroll arrow.
         *
         * @property upArrowVisible
         * @type Boolean
         */
        this.upArrowVisible = false;

        /**
         * The visibility of the pause sign.
         *
         * @property pause
         * @type Boolean
         */
        this.pause = false;
    };

    /**
     * The image used as a window skin.
     *
     * @property windowskin
     * @type Bitmap
     */
    get windowskin() {
        return this._windowskin;
    };
    set windowskin(value) {
        if (this._windowskin !== value) {
            this._windowskin = value;
            this._windowskin.addLoadListener(this._onWindowskinLoad.bind(this));
        }
    };

    /**
     * The bitmap used for the window contents.
     *
     * @property contents
     * @type Bitmap
     */
    get contents() {
        return this._windowContentsSprite.bitmap;
    };
    set contents(value) {
        this._windowContentsSprite.bitmap = value;
    };

    /**
     * The width of the window in pixels.
     *
     * @property width
     * @type Number
     */
    get width() {
        return this._width;
    };
    set width(value) {
        this._width = value;
        this._refreshAllParts();
    };

    /**
     * The height of the window in pixels.
     *
     * @property height
     * @type Number
     */
    get height() {
        return this._height;
    };
    set height(value) {
        this._height = value;
        this._refreshAllParts();
    };

    /**
     * The size of the padding between the frame and contents.
     *
     * @property padding
     * @type Number
     */
    get padding() {
        return this._padding;
    };
    set padding(value) {
        this._padding = value;
        this._refreshAllParts();
    };

    /**
     * The size of the margin for the window background.
     *
     * @property margin
     * @type Number
     */
    get margin() {
        return this._margin;
    };
    set margin(value) {
        this._margin = value;
        this._refreshAllParts();
    };

    /**
     * The opacity of the window without contents (0 to 255).
     *
     * @property opacity
     * @type Number
     */
    get opacity() {
        return this._windowSpriteContainer.alpha * 255;
    };
    set opacity(value) {
        this._windowSpriteContainer.alpha = value.clamp(0, 255) / 255;
    };

    /**
     * The opacity of the window background (0 to 255).
     *
     * @property backOpacity
     * @type Number
     */
    get backOpacity() {
        return this._windowBackSprite.alpha * 255;
    };
    set backOpacity(value) {
        this._windowBackSprite.alpha = value.clamp(0, 255) / 255;
    };

    /**
     * The opacity of the window contents (0 to 255).
     *
     * @property contentsOpacity
     * @type Number
     */
    get contentsOpacity() {
        return this._windowContentsSprite.alpha * 255;
    };
    set contentsOpacity(value) {
        this._windowContentsSprite.alpha = value.clamp(0, 255) / 255;
    };

    /**
     * The openness of the window (0 to 255).
     *
     * @property openness
     * @type Number
     */
    get openness() {
        return this._openness;
    };
    set openness(value) {
        if (this._openness !== value) {
            this._openness = value.clamp(0, 255);
            this._windowSpriteContainer.scale.y = this._openness / 255;
            this._windowSpriteContainer.y = this.height / 2 * (1 - this._openness / 255);
        }
    };

    /**
     * Updates the window for each frame.
     *
     * @method update
     */
    update() {
        if (this.active) {
            this._animationCount++;
        }
        for (const child of this.children) {
            child.update && child.update();
        }
    };

    /**
     * Sets the x, y, width, and height all at once.
     *
     * @method move
     * @param {Number} x The x coordinate of the window
     * @param {Number} y The y coordinate of the window
     * @param {Number} width The width of the window
     * @param {Number} height The height of the window
     */
    move(x, y, width, height) {
        this.x = x || 0;
        this.y = y || 0;
        if (this._width !== width || this._height !== height) {
            this._width = width || 0;
            this._height = height || 0;
            this._refreshAllParts();
        }
    };

    /**
     * Returns true if the window is completely open (openness == 255).
     *
     * @method isOpen
     */
    isOpen() {
        return this._openness >= 255;
    };

    /**
     * Returns true if the window is completely closed (openness == 0).
     *
     * @method isClosed
     */
    isClosed() {
        return this._openness <= 0;
    };

    /**
     * Sets the position of the command cursor.
     *
     * @method setCursorRect
     * @param {Number} x The x coordinate of the cursor
     * @param {Number} y The y coordinate of the cursor
     * @param {Number} width The width of the cursor
     * @param {Number} height The height of the cursor
     */
    setCursorRect(x, y, width, height) {
        const cx = Math.floor(x || 0);
        const cy = Math.floor(y || 0);
        const cw = Math.floor(width || 0);
        const ch = Math.floor(height || 0);
        const rect = this._cursorRect;
        if (rect.x !== cx || rect.y !== cy || rect.width !== cw || rect.height !== ch) {
            this._cursorRect.x = cx;
            this._cursorRect.y = cy;
            this._cursorRect.width = cw;
            this._cursorRect.height = ch;
            this._refreshCursor();
        }
    };

    /**
     * Changes the color of the background.
     *
     * @method setTone
     * @param {Number} r The red value in the range (-255, 255)
     * @param {Number} g The green value in the range (-255, 255)
     * @param {Number} b The blue value in the range (-255, 255)
     */
    setTone(r, g, b) {
        const tone = this._colorTone;
        if (r !== tone[0] || g !== tone[1] || b !== tone[2]) {
            this._colorTone = [r, g, b];
            this._refreshBack();
        }
    };

    /**
     * Adds a child between the background and contents.
     *
     * @method addChildToBack
     * @param {Object} child The child to add
     * @return {Object} The child that was added
     */
    addChildToBack(child) {
        const containerIndex = this.children.indexOf(this._windowSpriteContainer);
        return this.addChildAt(child, containerIndex + 1);
    };

    /**
     * @method updateTransform
     * @private
     */
    updateTransform() {
        this._updateCursor();
        this._updateArrows();
        this._updatePauseSign();
        this._updateContents();
        super.updateTransform();
    };

    /**
     * @method _createAllParts
     * @private
     */
    _createAllParts() {
        this._windowSpriteContainer = new PIXI.Container();
        this._windowBackSprite = new Sprite();
        this._windowCursorSprite = new Sprite();
        this._windowFrameSprite = new Sprite();
        this._windowContentsSprite = new Sprite();
        this._downArrowSprite = new Sprite();
        this._upArrowSprite = new Sprite();
        this._windowPauseSignSprite = new Sprite();
        this._windowBackSprite.bitmap = new Bitmap(1, 1);
        this._windowBackSprite.alpha = 192 / 255;
        this.addChild(this._windowSpriteContainer);
        this._windowSpriteContainer.addChild(this._windowBackSprite);
        this._windowSpriteContainer.addChild(this._windowFrameSprite);
        this.addChild(this._windowCursorSprite);
        this.addChild(this._windowContentsSprite);
        this.addChild(this._downArrowSprite);
        this.addChild(this._upArrowSprite);
        this.addChild(this._windowPauseSignSprite);
    };

    /**
     * @method _onWindowskinLoad
     * @private
     */
    _onWindowskinLoad() {
        this._refreshAllParts();
    };

    /**
     * @method _refreshAllParts
     * @private
     */
    _refreshAllParts() {
        this._refreshBack();
        this._refreshFrame();
        this._refreshCursor();
        this._refreshContents();
        this._refreshArrows();
        this._refreshPauseSign();
    };

    /**
     * @method _refreshBack
     * @private
     */
    _refreshBack() {
        const m = this._margin;
        const w = this._width - m * 2;
        const h = this._height - m * 2;
        const bitmap = new Bitmap(w, h);

        this._windowBackSprite.bitmap = bitmap;
        this._windowBackSprite.setFrame(0, 0, w, h);
        this._windowBackSprite.move(m, m);

        if (w > 0 && h > 0 && this._windowskin) {
            const p = 96;
            bitmap.blt(this._windowskin, 0, 0, p, p, 0, 0, w, h);
            for (let y = 0; y < h; y += p) {
                for (let x = 0; x < w; x += p) {
                    bitmap.blt(this._windowskin, 0, p, p, p, x, y, p, p);
                }
            }
            const tone = this._colorTone;
            bitmap.adjustTone(tone[0], tone[1], tone[2]);
        }
    };

    /**
     * @method _refreshFrame
     * @private
     */
    _refreshFrame() {
        const w = this._width;
        const h = this._height;
        const m = 24;
        const bitmap = new Bitmap(w, h);

        this._windowFrameSprite.bitmap = bitmap;
        this._windowFrameSprite.setFrame(0, 0, w, h);

        if (w > 0 && h > 0 && this._windowskin) {
            const skin = this._windowskin;
            const p = 96;
            const q = 96;
            bitmap.blt(skin, p + m, 0 + 0, p - m * 2, m, m, 0, w - m * 2, m);
            bitmap.blt(skin, p + m, 0 + q - m, p - m * 2, m, m, h - m, w - m * 2, m);
            bitmap.blt(skin, p + 0, 0 + m, m, p - m * 2, 0, m, m, h - m * 2);
            bitmap.blt(skin, p + q - m, 0 + m, m, p - m * 2, w - m, m, m, h - m * 2);
            bitmap.blt(skin, p + 0, 0 + 0, m, m, 0, 0, m, m);
            bitmap.blt(skin, p + q - m, 0 + 0, m, m, w - m, 0, m, m);
            bitmap.blt(skin, p + 0, 0 + q - m, m, m, 0, h - m, m, m);
            bitmap.blt(skin, p + q - m, 0 + q - m, m, m, w - m, h - m, m, m);
        }
    };

    /**
     * @method _refreshCursor
     * @private
     */
    _refreshCursor() {
        const pad = this._padding;
        const x = this._cursorRect.x + pad - this.origin.x;
        const y = this._cursorRect.y + pad - this.origin.y;
        const w = this._cursorRect.width;
        const h = this._cursorRect.height;
        const m = 4;
        const x2 = Math.max(x, pad);
        const y2 = Math.max(y, pad);
        const ox = x - x2;
        const oy = y - y2;
        const w2 = Math.min(w, this._width - pad - x2);
        const h2 = Math.min(h, this._height - pad - y2);
        const bitmap = new Bitmap(w2, h2);

        this._windowCursorSprite.bitmap = bitmap;
        this._windowCursorSprite.setFrame(0, 0, w2, h2);
        this._windowCursorSprite.move(x2, y2);

        if (w > 0 && h > 0 && this._windowskin) {
            const skin = this._windowskin;
            const p = 96;
            const q = 48;
            bitmap.blt(skin, p + m, p + m, q - m * 2, q - m * 2, ox + m, oy + m, w - m * 2, h - m * 2);
            bitmap.blt(skin, p + m, p + 0, q - m * 2, m, ox + m, oy + 0, w - m * 2, m);
            bitmap.blt(skin, p + m, p + q - m, q - m * 2, m, ox + m, oy + h - m, w - m * 2, m);
            bitmap.blt(skin, p + 0, p + m, m, q - m * 2, ox + 0, oy + m, m, h - m * 2);
            bitmap.blt(skin, p + q - m, p + m, m, q - m * 2, ox + w - m, oy + m, m, h - m * 2);
            bitmap.blt(skin, p + 0, p + 0, m, m, ox + 0, oy + 0, m, m);
            bitmap.blt(skin, p + q - m, p + 0, m, m, ox + w - m, oy + 0, m, m);
            bitmap.blt(skin, p + 0, p + q - m, m, m, ox + 0, oy + h - m, m, m);
            bitmap.blt(skin, p + q - m, p + q - m, m, m, ox + w - m, oy + h - m, m, m);
        }
    };

    /**
     * @method _refreshContents
     * @private
     */
    _refreshContents() {
        this._windowContentsSprite.move(this.padding, this.padding);
    };

    /**
     * @method _refreshArrows
     * @private
     */
    _refreshArrows() {
        const w = this._width;
        const h = this._height;
        const p = 24;
        const q = p / 2;
        const sx = 96 + p;
        const sy = 0 + p;
        this._downArrowSprite.bitmap = this._windowskin;
        this._downArrowSprite.anchor.x = 0.5;
        this._downArrowSprite.anchor.y = 0.5;
        this._downArrowSprite.setFrame(sx + q, sy + q + p, p, q);
        this._downArrowSprite.move(w / 2, h - q);
        this._upArrowSprite.bitmap = this._windowskin;
        this._upArrowSprite.anchor.x = 0.5;
        this._upArrowSprite.anchor.y = 0.5;
        this._upArrowSprite.setFrame(sx + q, sy, p, q);
        this._upArrowSprite.move(w / 2, q);
    };

    /**
     * @method _refreshPauseSign
     * @private
     */
    _refreshPauseSign() {
        const sx = 144;
        const sy = 96;
        const p = 24;
        this._windowPauseSignSprite.bitmap = this._windowskin;
        this._windowPauseSignSprite.anchor.x = 0.5;
        this._windowPauseSignSprite.anchor.y = 1;
        this._windowPauseSignSprite.move(this._width / 2, this._height);
        this._windowPauseSignSprite.setFrame(sx, sy, p, p);
        this._windowPauseSignSprite.alpha = 0;
    };

    /**
     * @method _updateCursor
     * @private
     */
    _updateCursor() {
        const blinkCount = this._animationCount % 40;
        let cursorOpacity = this.contentsOpacity;
        if (this.active) {
            if (blinkCount < 20) {
                cursorOpacity -= blinkCount * 8;
            } else {
                cursorOpacity -= (40 - blinkCount) * 8;
            }
        }
        this._windowCursorSprite.alpha = cursorOpacity / 255;
        this._windowCursorSprite.visible = this.isOpen();
    };

    /**
     * @method _updateContents
     * @private
     */
    _updateContents() {
        const w = this._width - this._padding * 2;
        const h = this._height - this._padding * 2;
        if (w > 0 && h > 0) {
            this._windowContentsSprite.setFrame(this.origin.x, this.origin.y, w, h);
            this._windowContentsSprite.visible = this.isOpen();
        } else {
            this._windowContentsSprite.visible = false;
        }
    };

    /**
     * @method _updateArrows
     * @private
     */
    _updateArrows() {
        this._downArrowSprite.visible = this.isOpen() && this.downArrowVisible;
        this._upArrowSprite.visible = this.isOpen() && this.upArrowVisible;
    };

    /**
     * @method _updatePauseSign
     * @private
     */
    _updatePauseSign() {
        const sprite = this._windowPauseSignSprite;
        const x = Math.floor(this._animationCount / 16) % 2;
        const y = Math.floor(this._animationCount / 16 / 2) % 2;
        const sx = 144;
        const sy = 96;
        const p = 24;
        if (!this.pause) {
            sprite.alpha = 0;
        } else if (sprite.alpha < 1) {
            sprite.alpha = Math.min(sprite.alpha + 0.1, 1);
        }
        sprite.setFrame(sx + x * p, sy + y * p, p, p);
        sprite.visible = this.isOpen();
    };
};

//-----------------------------------------------------------------------------

/**
 * The layer which contains game windows.
 *
 * @class WindowLayer
 * @constructor
 */
class WindowLayer extends PIXI.Container {
    constructor(...args) {
        super();
        this.initialize(...args);
    };

    initialize() {
        PIXI.Container.call(this);

        this._width = 0;
        this._height = 0;
        this._tempCanvas = null;
        this._translationMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];

        this._windowMask = new PIXI.Graphics();
        this._windowMask.beginFill(0xffffff, 1);
        this._windowMask.drawRect(0, 0, 0, 0);
        this._windowMask.endFill();
        this._windowRect = this._windowMask.graphicsData[0].shape;

        this._renderSprite = null;
        this.filterArea = new PIXI.Rectangle();
        this.filters = [WindowLayer.voidFilter];

        //temporary fix for memory leak bug
        this.on('removed', this.onRemoveAsAChild);
    };

    onRemoveAsAChild() {
        this.removeChildren();
    }

    static voidFilter = new PIXI.filters.AlphaFilter();

    /**
     * The width of the window layer in pixels.
     *
     * @property width
     * @type Number
     */
    get width() {
        return this._width;
    };
    set width(value) {
        this._width = value;
    };

    /**
     * The height of the window layer in pixels.
     *
     * @property height
     * @type Number
     */
    get height() {
        return this._height;
    };
    set height(value) {
        this._height = value;
    };

    /**
     * Sets the x, y, width, and height all at once.
     *
     * @method move
     * @param {Number} x The x coordinate of the window layer
     * @param {Number} y The y coordinate of the window layer
     * @param {Number} width The width of the window layer
     * @param {Number} height The height of the window layer
     */
    move(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    };

    /**
     * Updates the window layer for each frame.
     *
     * @method update
     */
    update() {
        for (const child of this.children) {
            child.update && child.update();
        }
    };

    /**
     * @method _renderCanvas
     * @param {Object} renderSession
     * @private
     */
    renderCanvas(renderer) {
        if (!this.visible || !this.renderable) {
            return;
        }

        if (!this._tempCanvas) {
            this._tempCanvas = document.createElement('canvas');
        }

        this._tempCanvas.width = Graphics.width;
        this._tempCanvas.height = Graphics.height;

        const realCanvasContext = renderer.context;
        const context = this._tempCanvas.getContext('2d', { willReadFrequently: true });

        context.save();
        context.clearRect(0, 0, Graphics.width, Graphics.height);
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.closePath();
        context.clip();

        renderer.context = context;

        for (let i = 0; i < this.children.length; i++) {
            const child = this.children[i];
            if (child._isWindow && child.visible && child.openness > 0) {
                this._canvasClearWindowRect(renderer, child);
                context.save();
                child.renderCanvas(renderer);
                context.restore();
            }
        }

        context.restore();

        renderer.context = realCanvasContext;
        renderer.context.setTransform(1, 0, 0, 1, 0, 0);
        renderer.context.globalCompositeOperation = 'source-over';
        renderer.context.globalAlpha = 1;
        renderer.context.drawImage(this._tempCanvas, 0, 0);

        for (const child of this.children) {
            if (!child._isWindow) {
                child.renderCanvas(renderer);
            }
        }
    };

    /**
     * @method _canvasClearWindowRect
     * @param {Object} renderSession
     * @param {Window} window
     * @private
     */
    _canvasClearWindowRect(renderSession, window) {
        const rx = this.x + window.x;
        const ry = this.y + window.y + window.height / 2 * (1 - window._openness / 255);
        const rw = window.width;
        const rh = window.height * window._openness / 255;
        renderSession.context.clearRect(rx, ry, rw, rh);
    };

    /**
     * @method _renderWebGL
     * @param {Object} renderSession
     * @private
     */
    renderWebGL(renderer) {
        if (!this.visible || !this.renderable) {
            return;
        }

        if (this.children.length == 0) {
            return;
        }

        renderer.flush();
        this.filterArea.copy(this);
        renderer.filterManager.pushFilter(this, this.filters);
        renderer.currentRenderer.start();

        const shift = new PIXI.Point();
        const rt = renderer._activeRenderTarget;
        const projectionMatrix = rt.projectionMatrix;
        shift.x = Math.round((projectionMatrix.tx + 1) / 2 * rt.sourceFrame.width);
        shift.y = Math.round((projectionMatrix.ty + 1) / 2 * rt.sourceFrame.height);

        for (const child of this.children) {
            if (child._isWindow && child.visible && child.openness > 0) {
                this._maskWindow(child, shift);
                renderer.maskManager.pushScissorMask(this, this._windowMask);
                renderer.clear();
                renderer.maskManager.popScissorMask();
                renderer.currentRenderer.start();
                child.renderWebGL(renderer);
                renderer.currentRenderer.flush();
            }
        }

        renderer.flush();
        renderer.filterManager.popFilter();
        renderer.maskManager.popScissorMask();

        for (const child of this.children) {
            if (!child._isWindow) {
                child.renderWebGL(renderer);
            }
        }
    };

    /**
     * @method _maskWindow
     * @param {Window} window
     * @private
     */
    _maskWindow(window, shift) {
        this._windowMask._currentBounds = null;
        this._windowMask.boundsDirty = true;
        const rect = this._windowRect;
        rect.x = this.x + shift.x + window.x;
        rect.y = this.x + shift.y + window.y + window.height / 2 * (1 - window._openness / 255);
        rect.width = window.width;
        rect.height = window.height * window._openness / 255;
    };
};

//-----------------------------------------------------------------------------

/**
 * The weather effect which displays rain, storm, or snow.
 *
 * @class Weather
 * @constructor
 */
class Weather extends PIXI.Container {
    constructor(...args) {
        super();
        this.initialize(...args);
    };

    initialize() {
        PIXI.Container.call(this);

        this._width = Graphics.width;
        this._height = Graphics.height;
        this._sprites = [];

        this._createBitmaps();
        this._createDimmer();

        /**
         * The type of the weather in ['none', 'rain', 'storm', 'snow'].
         *
         * @property type
         * @type String
         */
        this.type = 'none';

        /**
         * The power of the weather in the range (0, 9).
         *
         * @property power
         * @type Number
         */
        this.power = 0;

        /**
         * The origin point of the weather for scrolling.
         *
         * @property origin
         * @type Point
         */
        this.origin = new Point();
    };

    /**
     * Updates the weather for each frame.
     *
     * @method update
     */
    update() {
        this._updateDimmer();
        this._updateAllSprites();
    };

    /**
     * @method _createBitmaps
     * @private
     */
    _createBitmaps() {
        this._rainBitmap = new Bitmap(1, 60);
        this._rainBitmap.fillAll('white');
        this._stormBitmap = new Bitmap(2, 100);
        this._stormBitmap.fillAll('white');
        this._snowBitmap = new Bitmap(9, 9);
        this._snowBitmap.drawCircle(4, 4, 4, 'white');
    };

    /**
     * @method _createDimmer
     * @private
     */
    _createDimmer() {
        this._dimmerSprite = new ScreenSprite();
        this._dimmerSprite.setColor(80, 80, 80);
        this.addChild(this._dimmerSprite);
    };

    /**
     * @method _updateDimmer
     * @private
     */
    _updateDimmer() {
        this._dimmerSprite.opacity = Math.floor(this.power * 6);
    };

    /**
     * @method _updateAllSprites
     * @private
     */
    _updateAllSprites() {
        const maxSprites = Math.floor(this.power * 10);
        while (this._sprites.length < maxSprites) {
            this._addSprite();
        }
        while (this._sprites.length > maxSprites) {
            this._removeSprite();
        }
        for (const sprite of this._sprites) {
            this._updateSprite(sprite);
            sprite.x = sprite.ax - this.origin.x;
            sprite.y = sprite.ay - this.origin.y;
        }
    };

    /**
     * @method _addSprite
     * @private
     */
    _addSprite() {
        const sprite = new Sprite(this.viewport);
        sprite.opacity = 0;
        this._sprites.push(sprite);
        this.addChild(sprite);
    };

    /**
     * @method _removeSprite
     * @private
     */
    _removeSprite() {
        this.removeChild(this._sprites.pop());
    };

    /**
     * @method _updateSprite
     * @param {Sprite} sprite
     * @private
     */
    _updateSprite(sprite) {
        switch (this.type) {
            case 'rain':
                this._updateRainSprite(sprite);
                break;
            case 'storm':
                this._updateStormSprite(sprite);
                break;
            case 'snow':
                this._updateSnowSprite(sprite);
                break;
        }
        if (sprite.opacity < 40) {
            this._rebornSprite(sprite);
        }
    };

    /**
     * @method _updateRainSprite
     * @param {Sprite} sprite
     * @private
     */
    _updateRainSprite(sprite) {
        sprite.bitmap = this._rainBitmap;
        sprite.rotation = Math.PI / 16;
        sprite.ax -= 6 * Math.sin(sprite.rotation);
        sprite.ay += 6 * Math.cos(sprite.rotation);
        sprite.opacity -= 6;
    };

    /**
     * @method _updateStormSprite
     * @param {Sprite} sprite
     * @private
     */
    _updateStormSprite(sprite) {
        sprite.bitmap = this._stormBitmap;
        sprite.rotation = Math.PI / 8;
        sprite.ax -= 8 * Math.sin(sprite.rotation);
        sprite.ay += 8 * Math.cos(sprite.rotation);
        sprite.opacity -= 8;
    };

    /**
     * @method _updateSnowSprite
     * @param {Sprite} sprite
     * @private
     */
    _updateSnowSprite(sprite) {
        sprite.bitmap = this._snowBitmap;
        sprite.rotation = Math.PI / 16;
        sprite.ax -= 3 * Math.sin(sprite.rotation);
        sprite.ay += 3 * Math.cos(sprite.rotation);
        sprite.opacity -= 3;
    };

    /**
     * @method _rebornSprite
     * @param {Sprite} sprite
     * @private
     */
    _rebornSprite(sprite) {
        sprite.ax = Math.randomInt(Graphics.width + 100) - 100 + this.origin.x;
        sprite.ay = Math.randomInt(Graphics.height + 200) - 200 + this.origin.y;
        sprite.opacity = 160 + Math.randomInt(60);
    };
};

//-----------------------------------------------------------------------------

/**
 * The color matrix filter for WebGL.
 *
 * @class ToneFilter
 * @extends PIXI.Filter
 * @constructor
 */
class ToneFilter extends PIXI.filters.ColorMatrixFilter {
    constructor() {
        super();
    };

    /**
     * Changes the hue.
     *
     * @method adjustHue
     * @param {Number} value The hue value in the range (-360, 360)
     */
    adjustHue(value) {
        this.hue(value, true);
    };

    /**
     * Changes the saturation.
     *
     * @method adjustSaturation
     * @param {Number} value The saturation value in the range (-255, 255)
     */
    adjustSaturation(value) {
        value = (value || 0).clamp(-255, 255) / 255;
        this.saturate(value, true);
    };

    /**
     * Changes the tone.
     *
     * @method adjustTone
     * @param {Number} r The red strength in the range (-255, 255)
     * @param {Number} g The green strength in the range (-255, 255)
     * @param {Number} b The blue strength in the range (-255, 255)
     */
    adjustTone(r, g, b) {
        r = (r || 0).clamp(-255, 255) / 255;
        g = (g || 0).clamp(-255, 255) / 255;
        b = (b || 0).clamp(-255, 255) / 255;

        if (r !== 0 || g !== 0 || b !== 0) {
            const matrix = [
                1, 0, 0, r, 0,
                0, 1, 0, g, 0,
                0, 0, 1, b, 0,
                0, 0, 0, 1, 0
            ];

            this._loadMatrix(matrix, true);
        }
    };
};

//-----------------------------------------------------------------------------

/**
 * The sprite which changes the screen color in 2D canvas mode.
 *
 * @class ToneSprite
 * @constructor
 */
class ToneSprite extends PIXI.Container {
    constructor(...args) {
        super();
        this.initialize(...args);
    };

    initialize() {
        PIXI.Container.call(this);
        this.clear();
    };

    /**
     * Clears the tone.
     *
     * @method reset
     */
    clear() {
        this._red = 0;
        this._green = 0;
        this._blue = 0;
        this._gray = 0;
    };

    /**
     * Sets the tone.
     *
     * @method setTone
     * @param {Number} r The red strength in the range (-255, 255)
     * @param {Number} g The green strength in the range (-255, 255)
     * @param {Number} b The blue strength in the range (-255, 255)
     * @param {Number} gray The grayscale level in the range (0, 255)
     */
    setTone(r, g, b, gray) {
        this._red = Math.round(r || 0).clamp(-255, 255);
        this._green = Math.round(g || 0).clamp(-255, 255);
        this._blue = Math.round(b || 0).clamp(-255, 255);
        this._gray = Math.round(gray || 0).clamp(0, 255);
    };

    /**
     * @method _renderCanvas
     * @param {Object} renderSession
     * @private
     */
    _renderCanvas(renderer) {
        if (this.visible) {
            const context = renderer.context;
            const t = this.worldTransform;
            const r = renderer.resolution;
            const width = Graphics.width;
            const height = Graphics.height;
            context.save();
            context.setTransform(t.a, t.b, t.c, t.d, t.tx * r, t.ty * r);
            if (Graphics.canUseSaturationBlend() && this._gray > 0) {
                context.globalCompositeOperation = 'saturation';
                context.globalAlpha = this._gray / 255;
                context.fillStyle = '#ffffff';
                context.fillRect(0, 0, width, height);
            }
            context.globalAlpha = 1;
            const r1 = Math.max(0, this._red);
            const g1 = Math.max(0, this._green);
            const b1 = Math.max(0, this._blue);
            if (r1 || g1 || b1) {
                context.globalCompositeOperation = 'lighter';
                context.fillStyle = Utils.rgbToCssColor(r1, g1, b1);
                context.fillRect(0, 0, width, height);
            }
            if (Graphics.canUseDifferenceBlend()) {
                const r2 = Math.max(0, -this._red);
                const g2 = Math.max(0, -this._green);
                const b2 = Math.max(0, -this._blue);
                if (r2 || g2 || b2) {
                    context.globalCompositeOperation = 'difference';
                    context.fillStyle = '#ffffff';
                    context.fillRect(0, 0, width, height);
                    context.globalCompositeOperation = 'lighter';
                    context.fillStyle = Utils.rgbToCssColor(r2, g2, b2);
                    context.fillRect(0, 0, width, height);
                    context.globalCompositeOperation = 'difference';
                    context.fillStyle = '#ffffff';
                    context.fillRect(0, 0, width, height);
                }
            }
            context.restore();
        }
    };

    /**
     * @method _renderWebGL
     * @param {Object} renderSession
     * @private
     */
    _renderWebGL(renderer) {
        // Not supported
    };
};

//-----------------------------------------------------------------------------

/**
 * The root object of the display tree.
 *
 * @class Stage
 * @constructor
 */
class Stage extends PIXI.Container {
    constructor(...args) {
        super();
        this.initialize(...args);
    };

    initialize() {
        PIXI.Container.call(this);

        // The interactive flag causes a memory leak.
        this.interactive = false;
    };
};

//-----------------------------------------------------------------------------

/**
 * The audio object of Web Audio API.
 *
 * @class WebAudio
 * @constructor
 * @param {String} url The url of the audio file
 */
class WebAudio {
    constructor(...args) {
        this.initialize(...args);
    };

    static _standAlone(top) {
        return !top.ResourceHandler;
    };

    initialize(url) {
        if (!WebAudio._initialized) {
            WebAudio.initialize();
        }
        this.clear();

        if (!WebAudio._standAlone) {
            this._loader = ResourceHandler.createLoader(url, this._load.bind(this, url), () => {
                this._hasError = true;
            });
        }
        this._load(url);
        this._url = url;
    };

    static _masterVolume = 1;
    static _context = null;
    static _masterGainNode = null;
    static _initialized = false;
    static _unlocked = false;

    /**
     * Initializes the audio system.
     *
     * @static
     * @method initialize
     * @param {Boolean} noAudio Flag for the no-audio mode
     * @return {Boolean} True if the audio system is available
     */
    static initialize(noAudio) {
        if (!this._initialized) {
            if (!noAudio) {
                this._createContext();
                this._detectCodecs();
                this._createMasterGainNode();
                this._setupEventHandlers();
            }
            this._initialized = true;
        }
        return !!this._context;
    };

    /**
     * Checks whether the browser can play ogg files.
     *
     * @static
     * @method canPlayOgg
     * @return {Boolean} True if the browser can play ogg files
     */
    static canPlayOgg() {
        if (!this._initialized) {
            this.initialize();
        }
        return !!this._canPlayOgg;
    };

    /**
     * Checks whether the browser can play m4a files.
     *
     * @static
     * @method canPlayM4a
     * @return {Boolean} True if the browser can play m4a files
     */
    static canPlayM4a() {
        if (!this._initialized) {
            this.initialize();
        }
        return !!this._canPlayM4a;
    };

    /**
     * Sets the master volume of the all audio.
     *
     * @static
     * @method setMasterVolume
     * @param {Number} value Master volume (min: 0, max: 1)
     */
    static setMasterVolume(value) {
        this._masterVolume = value;
        if (this._masterGainNode) {
            this._masterGainNode.gain.setValueAtTime(this._masterVolume, this._context.currentTime);
        }
    };

    /**
     * @static
     * @method _createContext
     * @private
     */
    static _createContext() {
        try {
            if (typeof AudioContext !== 'undefined') {
                this._context = new AudioContext();
            } else if (typeof webkitAudioContext !== 'undefined') {
                this._context = new webkitAudioContext();
            }
        } catch (e) {
            this._context = null;
        }
    };

    /**
     * @static
     * @method _detectCodecs
     * @private
     */
    static _detectCodecs() {
        const audio = document.createElement('audio');
        if (audio.canPlayType) {
            this._canPlayOgg = audio.canPlayType('audio/ogg');
            this._canPlayM4a = audio.canPlayType('audio/ogg');
        }
    };

    /**
     * @static
     * @method _createMasterGainNode
     * @private
     */
    static _createMasterGainNode() {
        const context = WebAudio._context;
        if (context) {
            this._masterGainNode = context.createGain();
            this._masterGainNode.gain.setValueAtTime(this._masterVolume, context.currentTime);
            this._masterGainNode.connect(context.destination);
        }
    };

    /**
     * @static
     * @method _setupEventHandlers
     * @private
     */
    static _setupEventHandlers() {
        const resumeHandler = function () {
            const context = WebAudio._context;
            if (context && context.state === "suspended" && typeof context.resume === "function") {
                context.resume().then(() => {
                    WebAudio._onTouchStart();
                })
            } else {
                WebAudio._onTouchStart();
            }
        };
        document.addEventListener("keydown", resumeHandler);
        document.addEventListener("mousedown", resumeHandler);
        document.addEventListener("touchend", resumeHandler);
        document.addEventListener('touchstart', this._onTouchStart.bind(this));
        document.addEventListener('visibilitychange', this._onVisibilityChange.bind(this));
    };

    /**
     * @static
     * @method _onTouchStart
     * @private
     */
    static _onTouchStart() {
        const context = WebAudio._context;
        if (context && !this._unlocked) {
            // Unlock Web Audio on iOS
            const node = context.createBufferSource();
            node.start(0);
            this._unlocked = true;
        }
    };

    /**
     * @static
     * @method _onVisibilityChange
     * @private
     */
    static _onVisibilityChange() {
        if (document.visibilityState === 'hidden') {
            this._onHide();
        } else {
            this._onShow();
        }
    };

    /**
     * @static
     * @method _onHide
     * @private
     */
    static _onHide() {
        if (this._shouldMuteOnHide()) {
            this._fadeOut(1);
        }
    };

    /**
     * @static
     * @method _onShow
     * @private
     */
    static _onShow() {
        if (this._shouldMuteOnHide()) {
            this._fadeIn(0.5);
        }
    };

    /**
     * @static
     * @method _shouldMuteOnHide
     * @private
     */
    static _shouldMuteOnHide() {
        return Utils.isMobileDevice();
    };

    /**
     * @static
     * @method _fadeIn
     * @param {Number} duration
     * @private
     */
    static _fadeIn(duration) {
        if (this._masterGainNode) {
            const gain = this._masterGainNode.gain;
            const currentTime = WebAudio._context.currentTime;
            gain.setValueAtTime(0, currentTime);
            gain.linearRampToValueAtTime(this._masterVolume, currentTime + duration);
        }
    };

    /**
     * @static
     * @method _fadeOut
     * @param {Number} duration
     * @private
     */
    static _fadeOut(duration) {
        if (this._masterGainNode) {
            const gain = this._masterGainNode.gain;
            const currentTime = WebAudio._context.currentTime;
            gain.setValueAtTime(this._masterVolume, currentTime);
            gain.linearRampToValueAtTime(0, currentTime + duration);
        }
    };

    /**
     * Clears the audio data.
     *
     * @method clear
     */
    clear() {
        this.stop();
        this._buffer = null;
        this._sourceNode = null;
        this._gainNode = null;
        this._pannerNode = null;
        this._totalTime = 0;
        this._sampleRate = 0;
        this._loopStart = 0;
        this._loopLength = 0;
        this._startTime = 0;
        this._volume = 1;
        this._pitch = 1;
        this._pan = 0;
        this._endTimer = null;
        this._loadListeners = [];
        this._stopListeners = [];
        this._hasError = false;
        this._autoPlay = false;
    };

    /**
     * [read-only] The url of the audio file.
     *
     * @property url
     * @type String
     */
    get url() {
        return this._url;
    };

    /**
     * The volume of the audio.
     *
     * @property volume
     * @type Number
     */
    get volume() {
        return this._volume;
    };
    set volume(value) {
        this._volume = value;
        if (this._gainNode) {
            this._gainNode.gain.setValueAtTime(this._volume, WebAudio._context.currentTime);
        }
    };

    /**
     * The pitch of the audio.
     *
     * @property pitch
     * @type Number
     */
    get pitch() {
        return this._pitch;
    };
    set pitch(value) {
        if (this._pitch !== value) {
            this._pitch = value;
            if (this.isPlaying()) {
                this.play(this._sourceNode.loop, 0);
            }
        }
    };

    /**
     * The pan of the audio.
     *
     * @property pan
     * @type Number
     */
    get pan() {
        return this._pan;
    };
    set pan(value) {
        this._pan = value;
        this._updatePanner();
    };

    /**
     * Checks whether the audio data is ready to play.
     *
     * @method isReady
     * @return {Boolean} True if the audio data is ready to play
     */
    isReady() {
        return !!this._buffer;
    };

    /**
     * Checks whether a loading error has occurred.
     *
     * @method isError
     * @return {Boolean} True if a loading error has occurred
     */
    isError() {
        return this._hasError;
    };

    /**
     * Checks whether the audio is playing.
     *
     * @method isPlaying
     * @return {Boolean} True if the audio is playing
     */
    isPlaying() {
        return !!this._sourceNode;
    };

    /**
     * Plays the audio.
     *
     * @method play
     * @param {Boolean} loop Whether the audio data play in a loop
     * @param {Number} offset The start position to play in seconds
     */
    play(loop, offset) {
        if (this.isReady()) {
            offset = offset || 0;
            this._startPlaying(loop, offset);
        } else if (WebAudio._context) {
            this._autoPlay = true;
            this.addLoadListener(() => {
                if (this._autoPlay) {
                    this.play(loop, offset);
                }
            });
        }
    };

    /**
     * Stops the audio.
     *
     * @method stop
     */
    stop() {
        this._autoPlay = false;
        this._removeEndTimer();
        this._removeNodes();
        if (this._stopListeners) {
            while (this._stopListeners.length > 0) {
                const listner = this._stopListeners.shift();
                listner();
            }
        }
    };

    /**
     * Performs the audio fade-in.
     *
     * @method fadeIn
     * @param {Number} duration Fade-in time in seconds
     */
    fadeIn(duration) {
        if (this.isReady()) {
            if (this._gainNode) {
                const gain = this._gainNode.gain;
                const currentTime = WebAudio._context.currentTime;
                gain.setValueAtTime(0, currentTime);
                gain.linearRampToValueAtTime(this._volume, currentTime + duration);
            }
        } else if (this._autoPlay) {
            this.addLoadListener(() => {
                this.fadeIn(duration);
            });
        }
    };

    /**
     * Performs the audio fade-out.
     *
     * @method fadeOut
     * @param {Number} duration Fade-out time in seconds
     */
    fadeOut(duration) {
        if (this._gainNode) {
            const gain = this._gainNode.gain;
            const currentTime = WebAudio._context.currentTime;
            gain.setValueAtTime(this._volume, currentTime);
            gain.linearRampToValueAtTime(0, currentTime + duration);
        }
        this._autoPlay = false;
    };

    /**
     * Gets the seek position of the audio.
     *
     * @method seek
     */
    seek() {
        if (WebAudio._context) {
            let pos = (WebAudio._context.currentTime - this._startTime) * this._pitch;
            if (this._loopLength > 0) {
                while (pos >= this._loopStart + this._loopLength) {
                    pos -= this._loopLength;
                }
            }
            return pos;
        } else {
            return 0;
        }
    };

    /**
     * Add a callback function that will be called when the audio data is loaded.
     *
     * @method addLoadListener
     * @param {Function} listner The callback function
     */
    addLoadListener(listner) {
        this._loadListeners.push(listner);
    };

    /**
     * Add a callback function that will be called when the playback is stopped.
     *
     * @method addStopListener
     * @param {Function} listner The callback function
     */
    addStopListener(listner) {
        this._stopListeners.push(listner);
    };

    /**
     * @method _load
     * @param {String} url
     * @private
     */
    _load(url) {
        if (WebAudio._context) {
            const xhr = new XMLHttpRequest();
            if (Decrypter.hasEncryptedAudio) url = Decrypter.extToEncryptExt(url);
            xhr.open('GET', url);
            xhr.responseType = 'arraybuffer';
            xhr.onload = function () {
                if (xhr.status < 400) {
                    this._onXhrLoad(xhr);
                }
            }.bind(this);
            xhr.onerror = this._loader || function () { this._hasError = true; }.bind(this);
            xhr.send();
        }
    };

    /**
     * @method _onXhrLoad
     * @param {XMLHttpRequest} xhr
     * @private
     */
    _onXhrLoad(xhr) {
        let array = xhr.response;
        if (Decrypter.hasEncryptedAudio) array = Decrypter.decryptArrayBuffer(array);
        this._readLoopComments(new Uint8Array(array));
        WebAudio._context.decodeAudioData(array, buffer => {
            this._buffer = buffer;
            this._totalTime = buffer.duration;
            if (this._loopLength > 0 && this._sampleRate > 0) {
                this._loopStart /= this._sampleRate;
                this._loopLength /= this._sampleRate;
            } else {
                this._loopStart = 0;
                this._loopLength = this._totalTime;
            }
            this._onLoad();
        });
    };

    /**
     * @method _startPlaying
     * @param {Boolean} loop
     * @param {Number} offset
     * @private
     */
    _startPlaying(loop, offset) {
        if (this._loopLength > 0) {
            while (offset >= this._loopStart + this._loopLength) {
                offset -= this._loopLength;
            }
        }
        this._removeEndTimer();
        this._removeNodes();
        this._createNodes();
        this._connectNodes();
        this._sourceNode.loop = loop;
        this._sourceNode.start(0, offset);
        this._startTime = WebAudio._context.currentTime - offset / this._pitch;
        this._createEndTimer();
    };

    /**
     * @method _createNodes
     * @private
     */
    _createNodes() {
        const context = WebAudio._context;
        this._sourceNode = context.createBufferSource();
        this._sourceNode.buffer = this._buffer;
        this._sourceNode.loopStart = this._loopStart;
        this._sourceNode.loopEnd = this._loopStart + this._loopLength;
        this._sourceNode.playbackRate.setValueAtTime(this._pitch, context.currentTime);
        this._gainNode = context.createGain();
        this._gainNode.gain.setValueAtTime(this._volume, context.currentTime);
        this._pannerNode = context.createPanner();
        this._pannerNode.panningModel = 'equalpower';
        this._updatePanner();
    };

    /**
     * @method _connectNodes
     * @private
     */
    _connectNodes() {
        this._sourceNode.connect(this._gainNode);
        this._gainNode.connect(this._pannerNode);
        this._pannerNode.connect(WebAudio._masterGainNode);
    };

    /**
     * @method _removeNodes
     * @private
     */
    _removeNodes() {
        if (this._sourceNode) {
            this._sourceNode.stop(0);
            this._sourceNode = null;
            this._gainNode = null;
            this._pannerNode = null;
        }
    };

    /**
     * @method _createEndTimer
     * @private
     */
    _createEndTimer() {
        if (this._sourceNode && !this._sourceNode.loop) {
            const endTime = this._startTime + this._totalTime / this._pitch;
            const delay = endTime - WebAudio._context.currentTime;
            this._endTimer = setTimeout(() => {
                this.stop();
            }, delay * 1000);
        }
    };

    /**
     * @method _removeEndTimer
     * @private
     */
    _removeEndTimer() {
        if (this._endTimer) {
            clearTimeout(this._endTimer);
            this._endTimer = null;
        }
    };

    /**
     * @method _updatePanner
     * @private
     */
    _updatePanner() {
        if (this._pannerNode) {
            const x = this._pan;
            const z = 1 - Math.abs(x);
            this._pannerNode.setPosition(x, 0, z);
        }
    };

    /**
     * @method _onLoad
     * @private
     */
    _onLoad() {
        while (this._loadListeners.length > 0) {
            const listner = this._loadListeners.shift();
            listner();
        }
    };

    /**
     * @method _readLoopComments
     * @param {Uint8Array} array
     * @private
     */
    _readLoopComments(array) {
        this._readOgg(array);
        this._readMp4(array);
    };

    /**
     * @method _readOgg
     * @param {Uint8Array} array
     * @private
     */
    _readOgg(array) {
        let index = 0;
        while (index < array.length) {
            if (this._readFourCharacters(array, index) === 'OggS') {
                index += 26;
                let vorbisHeaderFound = false;
                const numSegments = array[index++];
                const segments = [];
                for (let i = 0; i < numSegments; i++) {
                    segments.push(array[index++]);
                }
                for (let i = 0; i < numSegments; i++) {
                    if (this._readFourCharacters(array, index + 1) === 'vorb') {
                        const headerType = array[index];
                        if (headerType === 1) {
                            this._sampleRate = this._readLittleEndian(array, index + 12);
                        } else if (headerType === 3) {
                            this._readMetaData(array, index, segments[i]);
                        }
                        vorbisHeaderFound = true;
                    }
                    index += segments[i];
                }
                if (!vorbisHeaderFound) {
                    break;
                }
            } else {
                break;
            }
        }
    };

    /**
     * @method _readMp4
     * @param {Uint8Array} array
     * @private
     */
    _readMp4(array) {
        if (this._readFourCharacters(array, 4) === 'ftyp') {
            let index = 0;
            while (index < array.length) {
                const size = this._readBigEndian(array, index);
                const name = this._readFourCharacters(array, index + 4);
                if (name === 'moov') {
                    index += 8;
                } else {
                    if (name === 'mvhd') {
                        this._sampleRate = this._readBigEndian(array, index + 20);
                    }
                    if (name === 'udta' || name === 'meta') {
                        this._readMetaData(array, index, size);
                    }
                    index += size;
                    if (size <= 1) {
                        break;
                    }
                }
            }
        }
    };

    /**
     * @method _readMetaData
     * @param {Uint8Array} array
     * @param {Number} index
     * @param {Number} size
     * @private
     */
    _readMetaData(array, index, size) {
        for (let i = index; i < index + size - 10; i++) {
            if (this._readFourCharacters(array, i) === 'LOOP') {
                let text = '';
                while (array[i] > 0) {
                    text += String.fromCharCode(array[i++]);
                }
                if (text.match(/LOOPSTART=([0-9]+)/)) {
                    this._loopStart = parseInt(RegExp.$1);
                }
                if (text.match(/LOOPLENGTH=([0-9]+)/)) {
                    this._loopLength = parseInt(RegExp.$1);
                }
                if (text == 'LOOPSTART' || text == 'LOOPLENGTH') {
                    let text2 = '';
                    i += 16;
                    while (array[i] > 0) {
                        text2 += String.fromCharCode(array[i++]);
                    }
                    if (text == 'LOOPSTART') {
                        this._loopStart = parseInt(text2);
                    } else {
                        this._loopLength = parseInt(text2);
                    }
                }
            }
        }
    };

    /**
     * @method _readLittleEndian
     * @param {Uint8Array} array
     * @param {Number} index
     * @private
     */
    _readLittleEndian(array, index) {
        return (array[index + 3] * 0x1000000 + array[index + 2] * 0x10000 +
            array[index + 1] * 0x100 + array[index + 0]);
    };

    /**
     * @method _readBigEndian
     * @param {Uint8Array} array
     * @param {Number} index
     * @private
     */
    _readBigEndian(array, index) {
        return (array[index + 0] * 0x1000000 + array[index + 1] * 0x10000 +
            array[index + 2] * 0x100 + array[index + 3]);
    };

    /**
     * @method _readFourCharacters
     * @param {Uint8Array} array
     * @param {Number} index
     * @private
     */
    _readFourCharacters(array, index) {
        let string = '';
        for (let i = 0; i < 4; i++) {
            string += String.fromCharCode(array[index + i]);
        }
        return string;
    };
};

//-----------------------------------------------------------------------------

/**
 * The static class that handles HTML5 Audio.
 *
 * @class Html5Audio
 * @constructor
 */
class Html5Audio {
    static _initialized = false;
    static _unlocked = false;
    static _audioElement = null;
    static _gainTweenInterval = null;
    static _tweenGain = 0;
    static _tweenTargetGain = 0;
    static _tweenGainStep = 0;
    static _staticSePath = null;

    /**
     * Sets up the Html5 Audio.
     *
     * @static
     * @method setup
     * @param {String} url The url of the audio file
     */
    static setup(url) {
        if (!this._initialized) this.initialize();

        this.clear();
        if (Decrypter.hasEncryptedAudio && this._audioElement.src) {
            window.URL.revokeObjectURL(this._audioElement.src);
        }
        this._url = url;
    };

    /**
     * Initializes the audio system.
     *
     * @static
     * @method initialize
     * @return {Boolean} True if the audio system is available
     */
    static initialize() {
        if (!this._initialized) {
            if (!this._audioElement) {
                try {
                    this._audioElement = new Audio();
                } catch (e) {
                    this._audioElement = null;
                }
            }
            if (!!this._audioElement) this._setupEventHandlers();
            this._initialized = true;
        }
        return !!this._audioElement;
    };

    /**
     * @static
     * @method _setupEventHandlers
     * @private
     */
    static _setupEventHandlers() {
        document.addEventListener('touchstart', this._onTouchStart.bind(this));
        document.addEventListener('visibilitychange', this._onVisibilityChange.bind(this));
        this._audioElement.addEventListener("loadeddata", this._onLoadedData.bind(this));
        this._audioElement.addEventListener("error", this._onError.bind(this));
        this._audioElement.addEventListener("ended", this._onEnded.bind(this));
    };

    /**
     * @static
     * @method _onTouchStart
     * @private
     */
    static _onTouchStart() {
        if (this._audioElement && !this._unlocked) {
            if (this._isLoading) {
                this._load(this._url);
                this._unlocked = true;
            } else {
                if (this._staticSePath) {
                    this._audioElement.src = this._staticSePath;
                    this._audioElement.volume = 0;
                    this._audioElement.loop = false;
                    this._audioElement.play();
                    this._unlocked = true;
                }
            }
        }
    };

    /**
     * @static
     * @method _onVisibilityChange
     * @private
     */
    static _onVisibilityChange() {
        if (document.visibilityState === 'hidden') {
            this._onHide();
        } else {
            this._onShow();
        }
    };

    /**
     * @static
     * @method _onLoadedData
     * @private
     */
    static _onLoadedData() {
        this._buffered = true;
        if (this._unlocked) this._onLoad();
    };

    /**
     * @static
     * @method _onError
     * @private
     */
    static _onError() {
        this._hasError = true;
    };

    /**
     * @static
     * @method _onEnded
     * @private
     */
    static _onEnded() {
        if (!this._audioElement.loop) {
            this.stop();
        }
    };

    /**
     * @static
     * @method _onHide
     * @private
     */
    static _onHide() {
        this._audioElement.volume = 0;
        this._tweenGain = 0;
    };

    /**
     * @static
     * @method _onShow
     * @private
     */
    static _onShow() {
        this.fadeIn(0.5);
    };

    /**
     * Clears the audio data.
     *
     * @static
     * @method clear
     */
    static clear() {
        this.stop();
        this._volume = 1;
        this._loadListeners = [];
        this._hasError = false;
        this._autoPlay = false;
        this._isLoading = false;
        this._buffered = false;
    };

    /**
     * Set the URL of static se.
     *
     * @static
     * @param {String} url
     */
    static setStaticSe(url) {
        if (!this._initialized) {
            this.initialize();
            this.clear();
        }
        this._staticSePath = url;
    };

    /**
     * [read-only] The url of the audio file.
     *
     * @property url
     * @type String
     */
    get url() {
        return Html5Audio._url;
    };

    /**
     * The volume of the audio.
     *
     * @property volume
     * @type Number
     */
    get volume() {
        return Html5Audio._volume;
    };
    set volume(value) {
        Html5Audio._volume = value;
        if (Html5Audio._audioElement) {
            Html5Audio._audioElement.volume = this._volume;
        }
    };

    /**
     * Checks whether the audio data is ready to play.
     *
     * @static
     * @method isReady
     * @return {Boolean} True if the audio data is ready to play
     */
    static isReady() {
        return this._buffered;
    };

    /**
     * Checks whether a loading error has occurred.
     *
     * @static
     * @method isError
     * @return {Boolean} True if a loading error has occurred
     */
    static isError() {
        return this._hasError;
    };

    /**
     * Checks whether the audio is playing.
     *
     * @static
     * @method isPlaying
     * @return {Boolean} True if the audio is playing
     */
    static isPlaying() {
        return !this._audioElement.paused;
    };

    /**
     * Plays the audio.
     *
     * @static
     * @method play
     * @param {Boolean} loop Whether the audio data play in a loop
     * @param {Number} offset The start position to play in seconds
     */
    static play(loop, offset) {
        if (this.isReady()) {
            offset = offset || 0;
            this._startPlaying(loop, offset);
        } else if (Html5Audio._audioElement) {
            this._autoPlay = true;
            this.addLoadListener(() => {
                if (this._autoPlay) {
                    this.play(loop, offset);
                    if (this._gainTweenInterval) {
                        clearInterval(this._gainTweenInterval);
                        this._gainTweenInterval = null;
                    }
                }
            });
            if (!this._isLoading) this._load(this._url);
        }
    };

    /**
     * Stops the audio.
     *
     * @static
     * @method stop
     */
    static stop() {
        if (this._audioElement) this._audioElement.pause();
        this._autoPlay = false;
        if (this._tweenInterval) {
            clearInterval(this._tweenInterval);
            this._tweenInterval = null;
            this._audioElement.volume = 0;
        }
    };

    /**
     * Performs the audio fade-in.
     *
     * @static
     * @method fadeIn
     * @param {Number} duration Fade-in time in seconds
     */
    static fadeIn(duration) {
        if (this.isReady()) {
            if (this._audioElement) {
                this._tweenTargetGain = this._volume;
                this._tweenGain = 0;
                this._startGainTween(duration);
            }
        } else if (this._autoPlay) {
            this.addLoadListener(() => {
                this.fadeIn(duration);
            });
        }
    };

    /**
     * Performs the audio fade-out.
     *
     * @static
     * @method fadeOut
     * @param {Number} duration Fade-out time in seconds
     */
    static fadeOut(duration) {
        if (this._audioElement) {
            this._tweenTargetGain = 0;
            this._tweenGain = this._volume;
            this._startGainTween(duration);
        }
    };

    /**
     * Gets the seek position of the audio.
     *
     * @static
     * @method seek
     */
    static seek() {
        if (this._audioElement) {
            return this._audioElement.currentTime;
        } else {
            return 0;
        }
    };

    /**
     * Add a callback function that will be called when the audio data is loaded.
     *
     * @static
     * @method addLoadListener
     * @param {Function} listner The callback function
     */
    static addLoadListener(listner) {
        this._loadListeners.push(listner);
    };

    /**
     * @static
     * @method _load
     * @param {String} url
     * @private
     */
    static _load(url) {
        if (this._audioElement) {
            this._isLoading = true;
            this._audioElement.src = url;
            this._audioElement.load();
        }
    };

    /**
     * @static
     * @method _startPlaying
     * @param {Boolean} loop
     * @param {Number} offset
     * @private
     */
    static _startPlaying(loop, offset) {
        this._audioElement.loop = loop;
        if (this._gainTweenInterval) {
            clearInterval(this._gainTweenInterval);
            this._gainTweenInterval = null;
        }
        if (this._audioElement) {
            this._audioElement.volume = this._volume;
            this._audioElement.currentTime = offset;
            this._audioElement.play();
        }
    };

    /**
     * @static
     * @method _onLoad
     * @private
     */
    static _onLoad() {
        this._isLoading = false;
        while (this._loadListeners.length > 0) {
            const listener = this._loadListeners.shift();
            listener();
        }
    };

    /**
     * @static
     * @method _startGainTween
     * @params {Number} duration
     * @private
     */
    static _startGainTween(duration) {
        this._audioElement.volume = this._tweenGain;
        if (this._gainTweenInterval) {
            clearInterval(this._gainTweenInterval);
            this._gainTweenInterval = null;
        }
        this._tweenGainStep = (this._tweenTargetGain - this._tweenGain) / (60 * duration);
        this._gainTweenInterval = setInterval(() => {
            Html5Audio._applyTweenValue(Html5Audio._tweenTargetGain);
        }, 1000 / 60);
    };

    /**
     * @static
     * @method _applyTweenValue
     * @param {Number} volume
     * @private
     */
    static _applyTweenValue(volume) {
        Html5Audio._tweenGain += Html5Audio._tweenGainStep;
        if (Html5Audio._tweenGain < 0 && Html5Audio._tweenGainStep < 0) {
            Html5Audio._tweenGain = 0;
        }
        else if (Html5Audio._tweenGain > volume && Html5Audio._tweenGainStep > 0) {
            Html5Audio._tweenGain = volume;
        }

        if (Math.abs(Html5Audio._tweenTargetGain - Html5Audio._tweenGain) < 0.01) {
            Html5Audio._tweenGain = Html5Audio._tweenTargetGain;
            clearInterval(Html5Audio._gainTweenInterval);
            Html5Audio._gainTweenInterval = null;
        }

        Html5Audio._audioElement.volume = Html5Audio._tweenGain;
    };
};

//-----------------------------------------------------------------------------

/**
 * The static class that handles JSON with object information.
 *
 * @class JsonEx
 */
class JsonEx {
    /**
     * The maximum depth of objects.
     *
     * @static
     * @property maxDepth
     * @type Number
     * @default 100
     */
    static maxDepth = 100;

    static _id = 1;
    static _generateId() {
        return JsonEx._id++;
    };

    /**
     * Converts an object to a JSON string with object information.
     *
     * @static
     * @method stringify
     * @param {Object} object The object to be converted
     * @return {String} The JSON string
     */
    static stringify(object) {
        const circular = [];
        JsonEx._id = 1;
        const json = JSON.stringify(this._encode(object, circular, 0));
        this._cleanMetadata(object);
        this._restoreCircularReference(circular);

        return json;
    };

    static _restoreCircularReference(circulars) {
        for (const [key, value, content] of circulars) {
            value[key] = content;
        }
    };

    /**
     * Parses a JSON string and reconstructs the corresponding object.
     *
     * @static
     * @method parse
     * @param {String} json The JSON string
     * @return {Object} The reconstructed object
     */
    static parse(json) {
        const circular = [];
        const registry = {};
        const contents = this._decode(JSON.parse(json), circular, registry);
        this._cleanMetadata(contents);
        this._linkCircularReference(contents, circular, registry);

        return contents;
    };

    static _linkCircularReference(contents, circulars, registry) {
        for (const [key, value, id] of circulars) {
            value[key] = registry[id];
        }
    };

    static _cleanMetadata(object) {
        if (!object) return;

        delete object['@'];
        delete object['@c'];

        if (typeof object === 'object') {
            for (const value of Object.values(object)) {
                if (typeof value === 'object') {
                    JsonEx._cleanMetadata(value);
                }
            }
        }
    };


    /**
     * Makes a deep copy of the specified object.
     *
     * @static
     * @method makeDeepCopy
     * @param {Object} object The object to be copied
     * @return {Object} The copied object
     */
    static makeDeepCopy(object) {
        return this.parse(this.stringify(object));
    };

    /**
     * @static
     * @method _encode
     * @param {Object} value
     * @param {Array} circular
     * @param {Number} depth
     * @return {Object}
     * @private
     */
    static _encode(value, circular, depth) {
        depth = depth || 0;
        if (++depth >= this.maxDepth) {
            throw new Error('Object too deep');
        }
        const type = Object.prototype.toString.call(value);
        if (type === '[object Object]' || type === '[object Array]') {
            value['@c'] = JsonEx._generateId();

            const constructorName = this._getConstructorName(value);
            if (constructorName !== 'Object' && constructorName !== 'Array') {
                value['@'] = constructorName;
            }
            for (const key in value) {
                if (value.hasOwnProperty(key) && !key.match(/^@./)) {
                    if (value[key] && typeof value[key] === 'object') {
                        if (value[key]['@c']) {
                            circular.push([key, value, value[key]]);
                            value[key] = { '@r': value[key]['@c'] };
                        } else {
                            value[key] = this._encode(value[key], circular, depth + 1);

                            if (value[key] instanceof Array) {
                                //wrap array
                                circular.push([key, value, value[key]]);

                                value[key] = {
                                    '@c': value[key]['@c'],
                                    '@a': value[key]
                                };
                            }
                        }
                    } else {
                        value[key] = this._encode(value[key], circular, depth + 1);
                    }
                }
            }
        }
        depth--;
        return value;
    };

    /**
     * @static
     * @method _decode
     * @param {Object} value
     * @param {Array} circular
     * @param {Object} registry
     * @return {Object}
     * @private
     */
    static _decode(value, circular, registry) {
        const type = Object.prototype.toString.call(value);
        if (type === '[object Object]' || type === '[object Array]') {
            registry[value['@c']] = value;

            if (value['@']) {
                const constructor = window[value['@']];
                if (constructor) {
                    value = this._resetPrototype(value, constructor.prototype);
                }
            }
            for (const key in value) {
                if (value.hasOwnProperty(key)) {
                    if (value[key] && value[key]['@a']) {
                        //object is array wrapper
                        const body = value[key]['@a'];
                        body['@c'] = value[key]['@c'];
                        value[key] = body;
                    }
                    if (value[key] && value[key]['@r']) {
                        //object is reference
                        circular.push([key, value, value[key]['@r']])
                    }
                    value[key] = this._decode(value[key], circular, registry);
                }
            }
        }
        return value;
    };

    /**
     * @static
     * @method _getConstructorName
     * @param {Object} value
     * @return {String}
     * @private
     */
    static _getConstructorName(value) {
        let name = value.constructor.name;
        if (name === undefined) {
            const func = /^\s*function\s*([A-Za-z0-9_$]*)/;
            name = func.exec(value.constructor)[1];
        }
        return name;
    };

    /**
     * @static
     * @method _resetPrototype
     * @param {Object} value
     * @param {Object} prototype
     * @return {Object}
     * @private
     */
    static _resetPrototype(value, prototype) {
        if (Object.setPrototypeOf !== undefined) {
            Object.setPrototypeOf(value, prototype);
        } else if ('__proto__' in value) {
            value.__proto__ = prototype;
        } else {
            const newValue = Object.create(prototype);
            for (const key in value) {
                if (value.hasOwnProperty(key)) {
                    newValue[key] = value[key];
                }
            }
            value = newValue;
        }
        return value;
    };
};

//-----------------------------------------------------------------------------

class Decrypter {
    static hasEncryptedImages = false;
    static hasEncryptedAudio = false;
    static _requestImgFile = [];
    static _headerlength = 16;
    static _xhrOk = 400;
    static _encryptionKey = "";
    static _ignoreList = [
        "img/system/Window.png"
    ];
    static SIGNATURE = "5250474d56000000";
    static VER = "000301";
    static REMAIN = "0000000000";

    static checkImgIgnore(url) {
        return this._ignoreList.some(ignore => ignore === url);
    };

    static decryptImg(url, bitmap) {
        url = this.extToEncryptExt(url);

        const requestFile = new XMLHttpRequest();
        requestFile.open("GET", url);
        requestFile.responseType = "arraybuffer";
        requestFile.send();

        requestFile.onload = function () {
            if (this.status < Decrypter._xhrOk) {
                const arrayBuffer = Decrypter.decryptArrayBuffer(requestFile.response);
                bitmap._image.src = Decrypter.createBlobUrl(arrayBuffer);
                bitmap._image.addEventListener('load', bitmap._loadListener = Bitmap.prototype._onLoad.bind(bitmap));
                bitmap._image.addEventListener('error', bitmap._errorListener = bitmap._loader || Bitmap.prototype._onError.bind(bitmap));
            }
        };

        requestFile.onerror = function () {
            if (bitmap._loader) {
                bitmap._loader();
            } else {
                bitmap._onError();
            }
        };
    };

    static decryptHTML5Audio(url, bgm, pos) {
        const requestFile = new XMLHttpRequest();
        requestFile.open("GET", url);
        requestFile.responseType = "arraybuffer";
        requestFile.send();

        requestFile.onload = function () {
            if (this.status < Decrypter._xhrOk) {
                const arrayBuffer = Decrypter.decryptArrayBuffer(requestFile.response);
                const url = Decrypter.createBlobUrl(arrayBuffer);
                AudioManager.createDecryptBuffer(url, bgm, pos);
            }
        };
    };

    static cutArrayHeader(arrayBuffer, length) {
        return arrayBuffer.slice(length);
    };

    static decryptArrayBuffer(arrayBuffer) {
        if (!arrayBuffer) return null;
        const header = new Uint8Array(arrayBuffer, 0, this._headerlength);

        let i;
        let ref = this.SIGNATURE + this.VER + this.REMAIN;
        const refBytes = new Uint8Array(16);
        for (i = 0; i < this._headerlength; i++) {
            refBytes[i] = parseInt("0x" + ref.substr(i * 2, 2), 16);
        }
        for (i = 0; i < this._headerlength; i++) {
            if (header[i] !== refBytes[i]) {
                throw new Error("Header is wrong");
            }
        }

        arrayBuffer = this.cutArrayHeader(arrayBuffer, Decrypter._headerlength);
        const view = new DataView(arrayBuffer);
        this.readEncryptionkey();
        if (arrayBuffer) {
            const byteArray = new Uint8Array(arrayBuffer);
            for (i = 0; i < this._headerlength; i++) {
                byteArray[i] = byteArray[i] ^ parseInt(Decrypter._encryptionKey[i], 16);
                view.setUint8(i, byteArray[i]);
            }
        }

        return arrayBuffer;
    };

    static createBlobUrl(arrayBuffer) {
        const blob = new Blob([arrayBuffer]);
        return window.URL.createObjectURL(blob);
    };

    static extToEncryptExt(url) {
        const ext = url.split('.').pop();
        let encryptedExt = ext;

        if (ext === "ogg") encryptedExt = ".rpgmvo";
        else if (ext === "m4a") encryptedExt = ".rpgmvo";
        else if (ext === "png") encryptedExt = ".rpgmvp";
        else encryptedExt = ext;

        return url.slice(0, url.lastIndexOf(ext) - 1) + encryptedExt;
    };

    static readEncryptionkey() {
        this._encryptionKey = $dataSystem.encryptionKey.split(/(.{2})/).filter(Boolean);
    };
};

//-----------------------------------------------------------------------------

/**
 * The static class that handles resource loading.
 *
 * @class ResourceHandler
 */
class ResourceHandler {
    static _reloaders = [];
    static _defaultRetryInterval = [500, 1000, 3000];

    static createLoader(url, retryMethod, resignMethod, retryInterval) {
        retryInterval = retryInterval || this._defaultRetryInterval;
        const reloaders = this._reloaders;
        let retryCount = 0;
        return function () {
            if (retryCount < retryInterval.length) {
                setTimeout(retryMethod, retryInterval[retryCount]);
                retryCount++;
            } else {
                if (resignMethod) {
                    resignMethod();
                }
                if (url) {
                    if (reloaders.length === 0) {
                        Graphics.printLoadingError(url);
                        SceneManager.stop();
                    }
                    reloaders.push(() => {
                        retryCount = 0;
                        retryMethod();
                    });
                }
            }
        };
    };

    static exists() {
        return this._reloaders.length > 0;
    };

    static retry() {
        if (this._reloaders.length > 0) {
            Graphics.eraseLoadingError();
            SceneManager.resume();
            for (const reloader of this._reloaders) {
                reloader();
            }
            this._reloaders.length = 0;
        }
    };
};

//=============================================================================