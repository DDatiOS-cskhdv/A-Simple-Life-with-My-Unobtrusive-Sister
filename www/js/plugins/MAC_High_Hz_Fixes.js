/*:
 * @plugindesc (v1.1) Fixes various issues on high refresh rate monitors
 * @author Mac15001900
 * 
 * @help
 * This plugin fixes various issues on high refresh rate monitors.
 * No configuration is needed.
 * 
 * ----------------------------------- Terms ------------------------------------
 *
 * This plugin is available under the MIT Licence. You're free to use it in any
 * games, commercial or not, or use the code in your own plugins. Credit is
 * appreciated, but not required. If your credits include links, please link to
 * https://mac15001900.itch.io/
 * 
 */

(() => {
    if (typeof Utils !== 'undefined' && Utils.isMobileDevice && Utils.isMobileDevice() && Utils.isMobileSafari && Utils.isMobileSafari()) {
        return;
    }
    const DEFAULT_DELTA_TIME = 1.0 / 60.0;
    const MAX_FRAME_TIME = 0.25;
    const MAX_UPDATES_PER_FRAME = 10;

    let dt = DEFAULT_DELTA_TIME;
    let baseFrameTimeMs = dt * 1000;
    let invBaseFrameTimeMs = 1 / baseFrameTimeMs;

    Object.assign(SceneManager, {
        update() {
            const isLocked = !!ConfigManager.FPS_LOCK_MODE;
            const tickOutsideMain = !isLocked;

            try {
                if (tickOutsideMain) this.tickStart();

                this.updateManagers();
                this.updateMain();

                if (tickOutsideMain) this.tickEnd();
            } catch (e) {
                this.catchException(e);
            }
        },
        updateMain() {
            const nowMs = performance.now();
            if (this._currentTime === undefined) this._currentTime = nowMs;

            let frameTimeSeconds = (nowMs - this._currentTime) * 0.001;
            if (frameTimeSeconds > MAX_FRAME_TIME) frameTimeSeconds = MAX_FRAME_TIME;

            this._currentTime = nowMs;

            dt = this._deltaTime > 0 ? this._deltaTime : DEFAULT_DELTA_TIME;
            baseFrameTimeMs = dt * 1000;
            invBaseFrameTimeMs = 1 / baseFrameTimeMs;

            const maxAccumulatedTime = dt * MAX_UPDATES_PER_FRAME;
            let accumulator = this._accumulator + frameTimeSeconds;
            if (accumulator > maxAccumulatedTime) accumulator = maxAccumulatedTime;

            const isLocked = !!ConfigManager.FPS_LOCK_MODE;
            const shouldTickInsideMain = isLocked && accumulator >= dt;
            if (shouldTickInsideMain) this.tickStart();

            let updateCount = 0;

            while (accumulator >= dt && updateCount < MAX_UPDATES_PER_FRAME) {
                this.updateInputData();
                this.changeScene();
                this.updateScene();
                Graphics.frameCount++;

                accumulator -= dt;
                updateCount++;
            }

            if (accumulator >= dt) accumulator = 0;
            this._accumulator = accumulator;

            this.renderScene();
            if (shouldTickInsideMain) {
                if (Graphics._fpsCounter) {
                    const hadRendered = Graphics._rendered;
                    if (!hadRendered) Graphics._rendered = true;
                    this.tickEnd();
                    if (!hadRendered) Graphics._rendered = false;
                } else {
                    this.tickEnd();
                }
            }
            this.requestUpdate();
        },
    })

    Graphics.render = function (stage) {
        if (this._skipCount <= 0) {

            const start = performance.now();
            const renderer = this._renderer;
            if (stage) {
                renderer.render(stage);
                const gl = renderer.gl;
                if (gl && gl.flush) {
                    gl.flush();
                }
            }

            const elapsed = performance.now() - start;
            if (elapsed > baseFrameTimeMs) {
                let skip = ((elapsed * invBaseFrameTimeMs) | 0) - 1;
                if (skip < 0) skip = 0;
                this._skipCount = skip;
                if (this._skipCount > this._maxSkip) this._skipCount = this._maxSkip;
            } else {
                this._skipCount = 0;
            }
            this._rendered = true;

        } else {
            this._skipCount--;
            this._rendered = false;
        }
    };
})();
