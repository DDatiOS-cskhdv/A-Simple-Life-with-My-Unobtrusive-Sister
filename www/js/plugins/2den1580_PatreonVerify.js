/*:
 * @plugindesc Patreon Verify for RPG Maker MV (UI improved)
 * @author 2den1580
 *
 * @help
 * - Shows avatar + name/ID + sponsor status after login
 * - Verify button switches to Logout immediately after successful login
 */

(() => {
  'use strict';

  const GAS_BASE = appScript;
  const AUTH_STORAGE_KEY = 'gm_patreon_verify';
  const POLL_INTERVAL_MS = 1000;
  const POLL_TIMEOUT_MS = 60000;

  const CFG = {
    avatarRatio: 0.20,
    button: { wFactor: 0.50, h: 64, fontSize: 32 },
    titleY: 0.3,
    avatarY: 0.06,
    nameYGap: 16,
    infoYGap: 34,
  };
  // ---- UI scale (MV default: 816x624) ----
  const BASE_W = 1920;
  const BASE_H = 1080;
  const getUiScale = () => {
	  const w = (Graphics.boxWidth || Graphics.width || 1920);
	  const h = (Graphics.boxHeight || Graphics.height || 1080);
	  return Math.min(w / BASE_W, h / BASE_H, 2.20);
  };

  const fs = (n) => Math.max(12, Math.round(n * getUiScale())); // font size
  const vh = (n) => Math.max(24, Math.round(n * getUiScale())); // bitmap/button height
  // ====== auth storage (same style as Drive plugin) ======
  const auth = {
    set(data) {
      try { localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data)); }
      catch (e) { console.error(e); }
    },
    get() {
      try {
        const data = localStorage.getItem(AUTH_STORAGE_KEY);
        return data ? JSON.parse(data) : null;
      } catch (e) {
        console.error(e);
        return null;
      }
    },
    del() { try { localStorage.removeItem(AUTH_STORAGE_KEY); } catch (e) {} }
  };

  // ====== http wrapper ======
  const httpSend = (() => {
    const send = ({ url, method = 'GET' }) =>
      new Promise((resolve, reject) => {
        if (typeof httpRequest === 'function') {
          httpRequest(url, { method, responseType: 'json' }).then(resolve).catch(reject);
        } else {
          fetch(url, { method, cache: 'no-store' })
            .then(r => r.json())
            .then(resolve)
            .catch(reject);
        }
      });
    return { getJson: (url) => send({ url, method: 'GET' }) };
  })();

  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  function loadLocalization(tag) { 
    if (window?.systemFeatureText?.memberMenu?.[String(tag)])  {
        let textArray = window.systemFeatureText.memberMenu[String(tag)];
        let text = Array.isArray(textArray) ? textArray.join("\n") : (textArray ?? "");
        return String(text);
    }
    return String(tag); 
  }

  // ====== UI helpers (ported from Drive plugin style) ======
  const drawCircleBitmap = (size, bgColor, imageUrl, onReady) => {
    const bmp = new Bitmap(size, size);
    const ctx = bmp._context;
    ctx.clearRect(0, 0, size, size);

    // 背景圆
    ctx.save();
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = bgColor || '#555';
    ctx.fill();
    ctx.restore();

    // 兜底默认头像
    const defBmp = ImageManager.loadBitmap('img/system/', 'PFP_default', 0, true);

    // 如果传进来本来就是 Bitmap就走原来的 bitmap 分支
    if (imageUrl && typeof imageUrl === 'object' && imageUrl.isReady) {
      const srcBmp = imageUrl;
      const tryDraw = () => {
        if (!srcBmp.isReady()) return false;
        const src = srcBmp._canvas;
        if (!src) return false;

        ctx.save();
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(src, 0, 0, srcBmp.width, srcBmp.height, 0, 0, size, size);
        ctx.restore();

        bmp._setDirty();
        onReady && onReady(bmp);
        return true;
      };

      if (!tryDraw()) srcBmp.addLoadListener(() => tryDraw());
      return bmp;
    }

    // 传入为空：直接用默认头像
    if (!imageUrl) {
      drawCircleBitmap(size, bgColor, defBmp, onReady);
      return bmp;
    }

    // 传入 string：远程 URL
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      const aspect = img.width / img.height;
      let sx = 0, sy = 0, sw = img.width, sh = img.height;
      if (aspect > 1) { sw = img.height; sx = Math.floor((img.width - img.height) / 2); }
      else if (aspect < 1) { sh = img.width; sy = Math.floor((img.height - img.width) / 2); }

      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, size, size);
      ctx.restore();

      bmp._setDirty();
      onReady && onReady(bmp);
    };

    img.onerror = () => {
      // 无论什么原因失败：回退到默认头像
      drawCircleBitmap(size, bgColor, defBmp, onReady);
    };

    img.src = String(imageUrl);
    return bmp;
  };

  const makeButtonBitmap = (label, w, h, fontSize) => {
    const BW = Math.max(64, w | 0), BH = Math.max(32, h | 0);
    const bmp = new Bitmap(BW, BH);
    const ctx = bmp._context;
    const r = Math.min(12, Math.floor(BH / 2));

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.arcTo(BW, 0, BW, r, r);
    ctx.arcTo(BW, BH, BW - r, BH, r);
    ctx.arcTo(0, BH, 0, BH - r, r);
    ctx.arcTo(0, 0, r, 0, r);
    ctx.closePath();
    ctx.fillStyle = '#2a2a2a';
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.fillStyle = '#fff';
    ctx.font = `${fontSize || 20}px ${DrillUp.g_DFF_fontFace}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, BW / 2, BH / 2);
    ctx.restore();

    bmp._setDirty();
    return bmp;
  };

  // ====== Normalize GAS response => cache ======
  function normalizeResultToCache(res) {
    // 兼容 res.user 可能是 string / object
    let userName = '';
    let userId = '';
    let avatarUrl = '';

    const u = res ? res.user : null;
    if (u && typeof u === 'object') {
      userName = String(u.full_name || u.name || u.display_name || u.username || '');
      userId = String(u.id || u.user_id || '');
      avatarUrl = String(u.avatar ||'');
    } else if (typeof u === 'string') {
      userName = u;
    }

    // 有些后端可能直接放在 res 里
    if (!userId) userId = String(res.user_id || res.id || '');
    if (!userName) userName = String(res.user_name || res.name || '');
    if (!avatarUrl) avatarUrl = String(res.avatar || res.avatar_url || res.picture || '');

    return {
      ts: Date.now(),
      subscribed: !!res.subscribed,
      tier_id: res.tier_id || '',
      device_id: res.device_id || '',
      userName,
      userId,
      avatarUrl,
      rawUser: res.user || null,
    };
  }

  function openAuthUrlExternal(url, fallbackStyle) {
    // 只做最小清理：去掉首尾空白、把非法空格变成 %20
    let authUrl = String(url || '').trim();
    authUrl = authUrl.replace(/ /g, '%20');

    // console.log('[PatreonVerify] open authUrl=', authUrl);

    if (Utils.isMobileDevice()) {
      if (window.cordova && window.cordova.InAppBrowser) {
        window.cordova.InAppBrowser.open(authUrl, "_system");
        return null;
      }
      window.location.href = authUrl;
      return null;
    }

    try {
      return window.open(authUrl, "_blank", fallbackStyle);
    } catch (e) {
      return null;
    }
  }

  async function startVerifyFlowInteractive(scene) {
    scene._setHint(loadLocalization('RequestingLogin'));

    const start = await httpSend.getJson(`${GAS_BASE}?mode=start`);
    if (!start || !start.ok || !start.authorize_url || !start.session) {
      throw new Error('start_failed: ' + JSON.stringify(start));
    }

    const session = String(start.session);
    scene._setHint(loadLocalization('openingWindow'));

    //try { popup = window.open(start.authorize_url, '_blank', scene._authWindowStyle); } catch (e) { popup = null; }
    //scene._popupWindow = popup;
    let popup = openAuthUrlExternal(start.authorize_url, scene._authWindowStyle);
    scene._popupWindow = openAuthUrlExternal(start.authorize_url, scene._authWindowStyle);
	
    const startedAt = Date.now();
    while (Date.now() - startedAt < POLL_TIMEOUT_MS) {
      if (popup && popup.closed) {
          // 玩家主动选择关掉窗口
          scene._setButtonLabelByKind('majorUpdate', loadLocalization('CheckUpdates')); 
          throw new Error('verify_canceled');
      };
      const res = await httpSend.getJson(`${GAS_BASE}?mode=result&session=${encodeURIComponent(session)}`);
      // console.log('[PatreonVerify] poll result:', res);

      if (res && res.ok && !res.pending) {
        const cache = normalizeResultToCache(res);
        auth.set(cache);
        // close popup
      try {
        if (popup && !popup.closed) {
          setTimeout(() => {
            try { if (popup && !popup.closed) popup.close(); } catch (e) {}
          }, 2000);
        }
      } catch (e) {}

        return { res, cache };
      }

      scene._setHint(loadLocalization('waitingLogin'));
      await sleep(POLL_INTERVAL_MS);
    }

    throw new Error('verify_timeout');
  }

  class Scene_PatreonVerify extends Scene_MenuBase {
    constructor() {
      super();
      this._btnObjs = [];
      this._popupWindow = null;
      this._busy = false;

      // UI sprites
      this._titleSprite = null;
      this._avatarSprite = null;
      this._nameSprite = null;
      this._infoSprite = null;
      this._hintSprite = null;
      // first-time notice
      this._noticeSprite = null;
      this._noticeStartedAt = 0;
      this._noticeDurationMs = 22000;   // 提示文本显示时长     

      const authW = 520, authH = 760;
      const authLeft = (window.screen.width - authW) / 2;
      const authTop = (window.screen.height - authH) / 2;
      this._authWindowStyle = `width=${authW},height=${authH},left=${authLeft},top=${authTop}`;
    }

    create() {
      super.create();
      this._createUI();
      this._applyCacheToUI();      // 初次进来就刷新一次
      this._updateButtonsState();  // 修复：确保按钮初始显示正确
      if (this._shouldShowFirstTimeNotice()) {
        this._showFirstTimeNotice();
      }      
    }

    terminate() {
      super.terminate();
      if (!this._isSponsor()) {
          this._notSponsor = undefined;
          auth.del();
      }
      // 离场清滤镜（noticeSprite 在 _createUI 里被套了 GlowFilter）
      if (this._noticeSprite) {
        this._noticeSprite.filters = null;
        // 可选：不复用该 sprite，可以直接从场景移除
        if (this._noticeSprite.parent) this._noticeSprite.parent.removeChild(this._noticeSprite);
        this._noticeSprite = null;
      }
      if (this._popupWindow && !this._popupWindow.closed) {
        try { this._popupWindow.close(); } catch (e) {}
      }
    }

	_createUI() {
	  const w = Graphics.width, h = Graphics.height;
	  const minSide = Math.min(w, h);

	  // avatar size (keep your CFG ratio, but you can also scale it if you want)
	  const avatarSize = Math.floor(minSide * CFG.avatarRatio);

	  // ---- Text sprites (increase bitmap height to avoid clipping on 1920x1080) ----
	  this._titleSprite = new Sprite(new Bitmap(w, vh(48)));
	  this._titleSprite.x = 0;
	  this._titleSprite.y = Math.floor(h * CFG.titleY);
	  this.addChild(this._titleSprite);

	  this._avatarSprite = new Sprite(new Bitmap(avatarSize, avatarSize));
	  this._avatarSprite.anchor.set(0.5, 0);
	  this._avatarSprite.x = Math.floor(w / 2);
	  this._avatarSprite.y = Math.floor(h * CFG.avatarY);
	  this.addChild(this._avatarSprite);

	  this._nameSprite = new Sprite(new Bitmap(w, vh(56)));
	  this._nameSprite.x = 0;
	  this._nameSprite.y = this._avatarSprite.y + avatarSize + Math.round(CFG.nameYGap * getUiScale());
	  this.addChild(this._nameSprite);

	  this._infoSprite = new Sprite(new Bitmap(w, vh(56)));
	  this._infoSprite.x = 0;
	  this._infoSprite.y = this._nameSprite.y + Math.round(CFG.infoYGap * getUiScale());
	  this.addChild(this._infoSprite);

	  this._hintSprite = new Sprite(new Bitmap(w, vh(84)));
	  this._hintSprite.x = 0;
	  this._hintSprite.y = this._infoSprite.y + vh(40);
	  this.addChild(this._hintSprite);

	  // ---- Buttons (3 rows): Cloud Save (top) -> Major Update (mid) -> Verify/Logout (bottom) ----
	  const btnW = Math.floor(w * CFG.button.wFactor);
	  const btnH = vh(CFG.button.h);
	  const gapY = vh(18);

	  // Move the main button further down to make room for 2 buttons above it
	  const mainY = Math.floor(h * 0.80);
	  const updateY = mainY - (btnH + gapY);
	  const cloudY = updateY - (btnH + gapY);

	  // ① Cloud Save (top)
	  const cloudSpr = new Sprite(makeButtonBitmap(loadLocalization('cloudSave'), btnW, btnH, fs(CFG.button.fontSize)));
	  cloudSpr.anchor.set(0.5, 0.5);
	  cloudSpr.x = Math.floor(w / 2);
	  cloudSpr.y = cloudY;
	  this.addChild(cloudSpr);

	  this._btnObjs.push({
		spr: cloudSpr,
		hover: false,
		onClick: this._onCloudSaveClick.bind(this),
		kind: 'cloudSave',
	  });

	  // ② Major Update (mid)
	  const updateSpr = new Sprite(makeButtonBitmap(loadLocalization('CheckUpdates'), btnW, btnH, fs(CFG.button.fontSize)));
	  updateSpr.anchor.set(0.5, 0.5);
	  updateSpr.x = Math.floor(w / 2);
	  updateSpr.y = updateY;
	  this.addChild(updateSpr);

	  this._btnObjs.push({
		spr: updateSpr,
		hover: false,
		onClick: this._onMajorUpdateClick.bind(this),
		kind: 'majorUpdate',
	  });

	  // ③ Verify / Logout (bottom)
    /*
	  const mainSpr = new Sprite(makeButtonBitmap('Verify', btnW, btnH, fs(CFG.button.fontSize)));
	  mainSpr.anchor.set(0.5, 0.5);
	  mainSpr.x = Math.floor(w / 2);
	  mainSpr.y = mainY;
	  this.addChild(mainSpr);

	  this._btnObjs.push({
		spr: mainSpr,
		hover: false,
		onClick: this._onMainButtonClick.bind(this),
		kind: 'main',
	  });
    */
	  // Initial text
	  this._setTitle('Patreon verification');
	  this._setHint('Ready');
    // ---- First-time notice  ----
    const noticeW = Math.floor(w * 0.4);
    const noticeH = Math.floor(h * 0.6);

    this._noticeSprite = new Sprite(new Bitmap(noticeW, noticeH));
    this._noticeSprite.x = Math.floor(w * 0.013);   // 右侧区域起点
    this._noticeSprite.y = Math.floor(h * 0.1);     // 顶部偏下
    this._noticeSprite.visible = false;            // 默认不显示
    this._noticeSprite.opacity = 0;
    if (PIXI.filters && PIXI.filters.GlowFilter) {
      // 套滤镜
      this._noticeSprite.filters = [
        new PIXI.filters.GlowFilter(8, 1, 0, 0xf3a64a, 0.66)
      ];
    }    
    this.addChild(this._noticeSprite);    
	}


    _setTitle(text) {
      const bmp = this._titleSprite.bitmap;
      bmp.clear(); bmp.fontSize = fs(28);
      bmp.drawText(String(text || ''), 0, 0, bmp.width, bmp.height, 'center');
    }

    _setHint(text) {
      const bmp = this._hintSprite.bitmap;
      bmp.clear(); bmp.fontSize = fs(25);
      bmp.drawText(String(text || ''), 0, 0, bmp.width, bmp.height, 'center');
    }

    _shouldShowFirstTimeNotice() {
      // 第一次进入时显示的提示文本
      return !this._isLoggedIn();
    }

    _drawMultilineText(bmp, text, x, y, width, lineHeight, align = 'left') {
      const ctx = bmp._context;
      const raw = String(text || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
      const paragraphs = raw.split('\n');

      const lines = [];
      for (const p of paragraphs) {
        if (!p) { lines.push(''); continue; }

        // 简易按字符折行（避免没空格的语言不换行）
        let cur = '';
        for (let i = 0; i < p.length; i++) {
          const ch = p[i];
          const next = cur + ch;
          const w = ctx.measureText(next).width;
          if (w > width && cur.length > 0) {
            lines.push(cur);
            cur = ch;
          } else {
            cur = next;
          }
        }
        if (cur.length > 0) lines.push(cur);
      }

      let yy = y;
      for (const line of lines) {
        bmp.drawText(line, x, yy, width, lineHeight, align);
        yy += lineHeight;
      }
    }

    // 显示提示文本（仅首次进入时显示）
    _showFirstTimeNotice() {
      if (!this._noticeSprite) return;

      const bmp = this._noticeSprite.bitmap;
      bmp.clear();

      const text = loadLocalization('firstTimeNotice'); 
      bmp.fontSize = fs(26);
      bmp.fontFace = DrillUp.g_DFF_fontFace;
      bmp.textColor = '#ffffff';
      //bmp.outlineColor = 'rgba(0,0,0,0.5)';
      //bmp.outlineWidth = 3;

      const pad = vh(10);
      const lineH = vh(34);
      this._drawMultilineText(
        bmp,
        text,
        pad,
        pad,
        bmp.width - pad * 2,
        lineH,
        'left'
      );
      bmp._setDirty();
      this._noticeSprite.visible = true;
      this._noticeSprite.opacity = 0;
      this._noticeStartedAt = Date.now();
    }    

    _setNameLine(text) {
      const bmp = this._nameSprite.bitmap;
      bmp.clear(); bmp.fontSize = fs(28);
      bmp.drawText(String(text || ''), 0, 0, bmp.width, bmp.height, 'center');
    }

    _setInfoLine(text, color) {
      const bmp = this._infoSprite.bitmap;
      bmp.clear();
      bmp.fontSize = fs(25);

      // 默认白色
      bmp.textColor = color || '#ffffff';
      bmp.outlineColor = 'rgba(0,0,0,0.6)';
      bmp.outlineWidth = 4;

      bmp.drawText(String(text || ''), 0, 0, bmp.width, bmp.height, 'center');

      // 保险：避免影响后续其他 drawText
      bmp.textColor = '#ffffff';
    }


    _isLoggedIn() {
      const c = auth.get();
      // 也可以加一个“过期时间”的判断，这里先按“有缓存就算已登录”
      return !!(c && (c.userName || c.userId || c.avatarUrl || c.ts));
    }

	_isSponsor() {
	  const c = auth.get();
	  return !!(c && c.subscribed);
	}
  _setButtonLabelByKind(kind, labelText) {
    const b = this._btnObjs.find(x => x && x.kind === kind);
    if (!b || !b.spr || !b.spr.bitmap) return;

    const bw = b.spr.bitmap.width;
    const bh = b.spr.bitmap.height;
    b.spr.bitmap = makeButtonBitmap(String(labelText || ''), bw, bh, fs(CFG.button.fontSize));
  }

  _updateButtonsState() {
    const logged = this._isLoggedIn();
    const sponsor = this._isSponsor();

    const getBtn = (kind) => this._btnObjs.find(b => b && b.kind === kind);

    const bCloud  = getBtn('cloudSave');
    const bUpdate = getBtn('majorUpdate');
    const bMain   = getBtn('main');

    // 主按钮：Verify / Logout
    if (bMain && bMain.spr && bMain.spr.bitmap) {
      const bw = bMain.spr.bitmap.width;
      const bh = bMain.spr.bitmap.height;
      const label = logged ? 'Logout' : 'Verify';
      bMain.spr.bitmap = makeButtonBitmap(label, bw, bh, fs(CFG.button.fontSize));
      bMain.spr.opacity = 255;
    }

    // 云存档：目前完全开放
    if (bCloud && bCloud.spr) {
      const enabled = true; // logged;
      bCloud.spr.opacity = enabled ? 255 : 140;
    }

    // 大版本更新：需登录 + 赞助者才可用
    if (bUpdate && bUpdate.spr) {
      const enabled = true;  // logged && sponsor;
      bUpdate.spr.opacity = enabled ? 255 : 140;

      // 可选：如果想在“不可用时”强制保持原文案，也可以在这里重画一次按钮名
      // const bw = bUpdate.spr.bitmap.width;
      // const bh = bUpdate.spr.bitmap.height;
      // const label = enabled ? loadLocalization('checkLatestVersion') : 'Check for updates';
      // bUpdate.spr.bitmap = makeButtonBitmap(label, bw, bh, fs(CFG.button.fontSize));
    }
  }

    _applyCacheToUI() {
      const w = Graphics.width, h = Graphics.height;
      const minSide = Math.min(w, h);
      const avatarSize = Math.floor(minSide * CFG.avatarRatio);

      const cached = auth.get();
      if (!cached) {
		this._titleSprite.visible = true;        // 未登录显示标题
        this._setTitle('Patreon verification');	
        const defBmp = ImageManager.loadBitmap('img/system/', 'PFP_default', 0, true);
        drawCircleBitmap(avatarSize, '#555', defBmp, (bmp) => { this._avatarSprite.bitmap = bmp; });	
        //drawCircleBitmap(avatarSize, '#555', null, (bmp) => { this._avatarSprite.bitmap = bmp; });
        this._setNameLine('');
        this._setInfoLine('');
        this._setHint(loadLocalization('notLoggedIn'));
        return;
      }
      this._titleSprite.visible = false;         // 已登录隐藏标题
      // avatar
      drawCircleBitmap(avatarSize, '#555', cached.avatarUrl || null, (bmp) => { this._avatarSprite.bitmap = bmp; });

      // name
      const name = cached.userName || '';
      const nameLine = (name) ? `${name}` : '？？？';
      this._setNameLine(nameLine);

      // sponsor status
      const subLine = cached.subscribed ? loadLocalization('Subscribed') : loadLocalization('NotSubscribed');
      const color   = cached.subscribed ? '#ffd700' : '#ea7e30eb'; 
      this._setInfoLine(subLine, color);

      // hint
      const last = cached.ts ? new Date(cached.ts).toLocaleString() : '';
      this._setHint(last ? (loadLocalization('lastCheck') + last) : 'OK');
    }

	async _onMajorUpdateClick() {
	  // 没有登录信息就走登录流程
    if (!this._isLoggedIn()) {
      this._setButtonLabelByKind('majorUpdate', loadLocalization('waitingLogin'));
      await this._onMainButtonClick();
      if (this._isLoggedIn() && !this._isSponsor()) {
        this._setButtonLabelByKind('majorUpdate', loadLocalization('notSponsor')); 
        this._notSponsor = true;
      }
      return;
    }
    // 必须是赞助者才执行功能
    if (!this._isSponsor()) {
      SoundManager.playOk();
      chahuiUtil.openOfficialWebsite({from:'nonSubscriber'});
      return;
    }
    if (this._busy || this._isLatestVersion) return;   
    this._busy = true;
    SoundManager.playOk();
    this._setButtonLabelByKind('majorUpdate', loadLocalization('checkLatestVersion'));
    const result = await chahuiUtil.autoUpdataCheck();
    if ( result && result.ok && result.version) {
        let version = result.version;
        const needBusy =  await chahuiUtil.showUpdateNotification(version);
        if (needBusy) return;
        this._setButtonLabelByKind('majorUpdate', loadLocalization('CheckUpdates'));
    } else {
        // 未能捕获到最新版本信息,一般意味着是最新版本
        this._isLatestVersion = true;
        this._setButtonLabelByKind('majorUpdate', loadLocalization('isLatestVersion'));
    }
    this._busy = false;
	}
	_onCloudSaveClick() {
    SoundManager.playOk();
		SceneManager.push(Scene_GoogleDrive);
	}
	
    async _onMainButtonClick() {
      if (this._busy) return;
      this._busy = true;

      try {
        /*
        // 已登录 => Logout
        if (this._isLoggedIn()) {
          SoundManager.playCancel();
          auth.del();
          this._applyCacheToUI();
          this._updateButtonsState(); // ✅ 关键：立刻切回 Verify
          return;
        }
        */

        // 未登录 => Verify
        // SoundManager.playOk();
        const { res, cache } = await startVerifyFlowInteractive(this);

        // 根据结果提示
        this._setHint(cache.subscribed ? loadLocalization('Subscribed') : loadLocalization('NotSubscribed'));

        // ✅ 关键：立刻刷新 UI + 按钮变 Logout
        this._applyCacheToUI();
        this._updateButtonsState();
      } catch (e) {
        console.error(e);
        this._setHint('Verify failed: ' + (e && e.message ? e.message : String(e)));
        // 出错也保证按钮状态一致
        this._updateButtonsState();
      } finally {
        this._busy = false;
      }
    }

    update() {
      super.update();
      // ---- first-time notice blinking & auto-hide ----
      if (this._noticeSprite && this._noticeSprite.visible) {
        const elapsed = Date.now() - (this._noticeStartedAt || 0);

        // 3 秒后自动消失
        if (elapsed >= this._noticeDurationMs) {
          this._noticeSprite.visible = false;
          this._noticeSprite.opacity = 0;
        } else {
          // 闪烁：opacity 在 [80, 255] 来回变化
          const t = elapsed / 1000; // seconds
          const wave = 0.5 + 0.5 * Math.sin(t * Math.PI * 2 * 0.4); 
          this._noticeSprite.opacity = Math.floor(40 + wave * 215);
        }
      }

      if (this._busy) return;

      const mx = TouchInput.x, my = TouchInput.y;
      for (const b of this._btnObjs) {
        const bmp = b.spr.bitmap;
        const w = bmp.width, h = bmp.height;
        const x = b.spr.x - w * b.spr.anchor.x;
        const y = b.spr.y - h * b.spr.anchor.y;
        b.hover = (mx >= x && mx <= x + w && my >= y && my <= y + h);
      }

	  if (TouchInput.isTriggered()) {
		  for (let i = 0; i < this._btnObjs.length; i++) {
			const b = this._btnObjs[i];
			if (!b.hover) continue;

			// 0: Cloud Save（暂时：仅需登录）
			if (i === 0) {
			  const enabled = true;
			  if (!enabled) { SoundManager.playBuzzer(); break; }
			}
			// 1: Major Update（需登录+赞助）
			if (i === 1) {
			  const enabled = true; // this._isLoggedIn() && this._isSponsor();
			  if (!enabled) { SoundManager.playBuzzer(); break; }
			}

			b.onClick();
			break;
		  }
	  }

      if (Input.isTriggered('cancel') || TouchInput.isCancelled()) {
        SoundManager.playCancel();
        SceneManager.pop();
      }
    }
  }

  window.Scene_PatreonVerify = Scene_PatreonVerify;

})();

