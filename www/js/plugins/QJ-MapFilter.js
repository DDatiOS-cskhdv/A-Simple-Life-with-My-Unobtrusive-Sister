//=============================================================================
//
//=============================================================================
/*:
 * @target MZ MV
 * @plugindesc [MapFilter For QJ-MapProjectileMZ][24-12-2]
 * @author Qiu Jiu
 * @base QJ-MapProjectileMZ
 * @orderAfter QJ-MapProjectileMZ
 *
 * @help 
 * need QJ-MapProjectileMZ
 * set the attribute z of projectile or laser to:
 *"MF_BR"     Transform the current projectile to a distorted effect and place it below the player
 *"MF_BG"     Transform the current projectile to a exposure effect and place it below the player
 *"MF_UR"     Transform the current projectile to a distorted effect and place it above the player
 *"MF_UG"     Transform the current projectile to a exposure effect and place it above the player
 *
 *
*/

/*:zh
 * @target MZ MV
 * @plugindesc [QJ-MapProjectileMZ滤镜弹幕][24-12-2]
 * @author Qiu Jiu
 *
 * @help 
 * 需要有QJ-MapProjectileMZ
 * 在发射弹幕时将z值设置成如下值即可将弹幕变成对应的功能：
 *"MF_BR"     将当前弹幕变成扭曲效果，且在玩家之下
 *"MF_BG"     将当前弹幕变成曝光效果，且在玩家之下
 *"MF_UR"     将当前弹幕变成扭曲效果，且在玩家之上
 *"MF_UG"     将当前弹幕变成曝光效果，且在玩家之上
 *
 *
*/
//=============================================================================
//
//=============================================================================
QJ.mapFilter = {reWrite:{}};
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
(($ = {}) => {
//=============================================================================
//
//=============================================================================
var isMV = Utils.RPGMAKER_NAME === 'MV';
//=============================================================================
//
//=============================================================================
$.Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
Spriteset_Map.prototype.createLowerLayer = function() {

    this.addChild(this._mapFilterContainer0 = new Sprite_ProjectileContainerQJMZ());
    this.addChild(this._mapFilterContainer1 = new Sprite_ProjectileContainerQJMZ());
    this._mapFilterBelow = new MapEffectFilter(this._mapFilterContainer0,this._mapFilterContainer1);

    this.addChild(this._mapFilterContainer2 = new Sprite_ProjectileContainerQJMZ());
    this.addChild(this._mapFilterContainer3 = new Sprite_ProjectileContainerQJMZ());

    this._mapFilterContainer0.visible = false;
    this._mapFilterContainer1.visible = false;
    this._mapFilterContainer2.visible = false;
    this._mapFilterContainer3.visible = false;

    this._mapFilterUpper = new MapEffectFilter(this._mapFilterContainer2,this._mapFilterContainer3);
    $.Spriteset_Map_createLowerLayer.call(this);

    if (isMV) {
        if (this._tilemap.lowerZLayer) this.addFilterTo(this._mapFilterBelow,this._tilemap.lowerZLayer);
        this.addFilterTo(this._mapFilterUpper,this);
    }
};
if (!isMV) {
$.Spriteset_Base_createOverallFilters = Spriteset_Base.prototype.createOverallFilters;
Spriteset_Base.prototype.createOverallFilters = function() {
    $.Spriteset_Base_createOverallFilters.call(this);
    if (this._tilemap._lowerLayer) this.addFilterTo(this._mapFilterBelow,this._tilemap._lowerLayer);
    this.addFilterTo(this._mapFilterUpper,this);
};
}
$.Spriteset_Map_createBulletQJExtra_Lightning = Spriteset_Map.prototype.createBulletQJExtra;
Spriteset_Map.prototype.createBulletQJExtra = function(index,type,data,spriteData) {
    $.Spriteset_Map_createBulletQJExtra_Lightning.apply(this,arguments);
	let z = data && data.data ? data.data.z : null;
    if        (z==="MF_BR") {//Below charter, Replace filter
        this._mapFilterContainer0.addChild(spriteData);
    } else if (z==="MF_BG") {//Below charter, Glow filter
        this._mapFilterContainer1.addChild(spriteData);
    } else if (z==="MF_UR") {//Upper charter, Replace filter
        this._mapFilterContainer2.addChild(spriteData);
    } else if (z==="MF_UG") {//Upper charter, Glow filter
        this._mapFilterContainer3.addChild(spriteData);
    }
};
$.Spriteset_Map_findBulletContainerQJ = Spriteset_Map.prototype.findBulletContainerQJ;
Spriteset_Map.prototype.findBulletContainerQJ = function(index) {
    let data = $gameMap.bulletQJ(index);
    let container = $.Spriteset_Map_findBulletContainerQJ.apply(this,arguments);
    if (!!container) return container;
	if (!data || !data.data) return null;  // <- 关键保护
	let z = data.data.z;
    if      (z==="MF_BR") return this._mapFilterContainer0;
    else if (z==="MF_BG") return this._mapFilterContainer1;
    else if (z==="MF_UR") return this._mapFilterContainer2;
    else if (z==="MF_UG") return this._mapFilterContainer3;
    else return null;
};
$.Spriteset_Map_update = Spriteset_Map.prototype.update;
Spriteset_Map.prototype.update = function() {
    $.Spriteset_Map_update.call(this);
    this._mapFilterBelow.update();
    this._mapFilterUpper.update();
};
Spriteset_Map.prototype.addFilterTo = function(filter,target) {
    if (target.filters) {
        target.filters.push(filter);
        target.filters = target.filters;
    } else {
        target.filters = [filter];
    }
    let margin = 20;
    target.filterArea = new PIXI.Rectangle(-margin,-margin,Graphics.width+margin*2,Graphics.height+margin*2);
};
//=============================================================================
//
//=============================================================================
if (isMV) {
//=============================================================================
//
//=============================================================================
var vertex = `
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;
uniform vec4 colorTone;

varying vec2 vTextureCoord;

void main(void) {
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}
`;

var fragment = `
varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform vec2 rate;
uniform sampler2D replaceTexture;
uniform sampler2D glowTexture;

void main(void) {
    float x = vTextureCoord.x;
    float y = vTextureCoord.y;

    vec2 effectCoord = vec2(vTextureCoord.x/rate.x,vTextureCoord.y/rate.y);

    vec4 e0 = texture2D(replaceTexture, effectCoord);
    float ox = (e0.r - 0.5) * 0.1 * e0.a;
    float oy = (e0.g - 0.5) * 0.1 * e0.a;

    if (x + ox >= rate.x) {
        x += e0.r * (rate.x - x);
    } else if (x + ox <= 0.0) {
        x += e0.r * x;
    } else {
        x += ox;
    }

    if (y + oy >= rate.y) {
        y += e0.g * (rate.y - y);
    } else if (y + oy <= 0.0) {
        y += e0.g * y;
    } else {
        y += oy;
    }

    vec4 c = texture2D(uSampler, vec2(x,y));

    float r = c.r;
    float g = c.g;
    float b = c.b;
    float a = c.a;

    vec4 e1 = texture2D(glowTexture, effectCoord);

    if (e1.r >= 1.0) r = 1.0;
    else r *= e1.r/(1.0-e1.r);

    if (e1.g >= 1.0) g = 1.0;
    else g *= e1.g/(1.0-e1.g);

    if (e1.b >= 1.0) b = 1.0;
    else b *= e1.b/(1.0-e1.b);

    gl_FragColor = vec4(r,g,b,a);
}
`;
//=============================================================================
//
//=============================================================================
function MapEffectFilter() {
    this.initialize.apply(this,arguments);
}
window.MapEffectFilter = MapEffectFilter;
MapEffectFilter.prototype = Object.create(PIXI.Filter.prototype);
MapEffectFilter.prototype.constructor = MapEffectFilter;
MapEffectFilter.prototype.initialize = function(replaceContainer,glowContainer) {
    PIXI.Filter.call(this,vertex,fragment);
    this.uniforms.rate = [1,1];
    this._replaceContainer = replaceContainer;
    this._glowContainer = glowContainer;
    this.uniforms.replaceTexture = PIXI.RenderTexture.create(Graphics.width,Graphics.height);
    this.uniforms.glowTexture = PIXI.RenderTexture.create(Graphics.width,Graphics.height);
    this._needInitGlowTexture = true;
};
MapEffectFilter.prototype.update = function() {
    //===============================================================
    let renderer = Graphics._renderer;
    //===============================================================
    this._replaceContainer.visible = true;
    this._glowContainer.visible = true;

    if (this._needInitGlowTexture) {
        this._needInitGlowTexture = false;
        renderer.textureManager.updateTexture(this.uniforms.glowTexture.baseTexture,0);
        let rendererTarget = this.uniforms.glowTexture.baseTexture._glRenderTargets[renderer.CONTEXT_UID];
        rendererTarget.clearColor = [0.5,0.5,0.5,1.0];
    }

    this._replaceContainer.updateTransform();
    this._glowContainer.updateTransform();
    renderer.render(this._replaceContainer,this.uniforms.replaceTexture,true,null,true);
    renderer.render(this._glowContainer,this.uniforms.glowTexture,true,null,true);

    this._replaceContainer.visible = false;
    this._glowContainer.visible = false;
    //===============================================================
};
MapEffectFilter.prototype.apply = function(filterManager, input, output, clear, currentState) {
    this.uniforms.rate[0] = Graphics.width/input.size.width;
    this.uniforms.rate[1] = Graphics.height/input.size.height;
    PIXI.Filter.prototype.apply.call(this,filterManager, input, output, clear, currentState);
};
//=============================================================================
//
//=============================================================================
} else {
//=============================================================================
//
//=============================================================================
var vertex = `
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;
uniform vec4 colorTone;

varying vec2 vTextureCoord;

void main(void) {
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}
`;

var fragment = `
varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform sampler2D replaceTexture;
uniform sampler2D glowTexture;

void main(void) {
    float x = vTextureCoord.x;
    float y = vTextureCoord.y;

    vec4 e0 = texture2D(replaceTexture, vTextureCoord);
    float ox = (e0.r - 0.5) * 0.1 * e0.a;
    float oy = (e0.g - 0.5) * 0.1 * e0.a;

    x += ox;

    y += oy;

    vec4 c = texture2D(uSampler, vec2(x,y));

    float r = c.r;
    float g = c.g;
    float b = c.b;
    float a = c.a;

    vec4 e1 = texture2D(glowTexture, vTextureCoord);

    if (e1.r >= 1.0) r = 1.0;
    else r *= e1.r/(1.0-e1.r);

    if (e1.g >= 1.0) g = 1.0;
    else g *= e1.g/(1.0-e1.g);

    if (e1.b >= 1.0) b = 1.0;
    else b *= e1.b/(1.0-e1.b);

    gl_FragColor = vec4(r,g,b,a);
}
`;
//=============================================================================
//
//=============================================================================
function MapEffectFilter() {
    this.initialize.apply(this,arguments);
}
window.MapEffectFilter = MapEffectFilter;
MapEffectFilter.prototype = Object.create(PIXI.Filter.prototype);
MapEffectFilter.prototype.constructor = MapEffectFilter;
MapEffectFilter.prototype.initialize = function(replaceContainer,glowContainer) {
    PIXI.Filter.call(this,vertex,fragment);
    this._replaceContainer = replaceContainer;
    this._glowContainer = glowContainer;
    this.uniforms.replaceTexture = PIXI.RenderTexture.create(Graphics.width,Graphics.height);
    this.uniforms.glowTexture = PIXI.RenderTexture.create(Graphics.width,Graphics.height);
    this.uniforms.glowTexture.baseTexture.clearColor = [0.5,0.5,0.5,1.0];
};
MapEffectFilter.prototype.update = function() {
    //===============================================================
    let renderer = Graphics._app.renderer;
    //===============================================================
    this._replaceContainer.visible = true;
    this._glowContainer.visible = true;

    this._replaceContainer.updateTransform();
    this._glowContainer.updateTransform();
    renderer.render(this._replaceContainer,this.uniforms.replaceTexture,true,null,true);
    renderer.render(this._glowContainer,this.uniforms.glowTexture,true,null,true);

    this._replaceContainer.visible = false;
    this._glowContainer.visible = false;
    //===============================================================
};
//=============================================================================
//
//=============================================================================
}
//=============================================================================
//
//=============================================================================
/*
QJ.sssssss = function() {
    QJ.MPMZ.Shoot({
        img:"normalMap0",
        initialRotation:['M'],
        existData:[{t:["Time",300]}],
        moveType:["S",0],
        z:"MF_UR"
    });
};
*/
//=============================================================================
//
//=============================================================================
})(QJ.mapFilter.reWrite);
//=============================================================================
//
//=============================================================================