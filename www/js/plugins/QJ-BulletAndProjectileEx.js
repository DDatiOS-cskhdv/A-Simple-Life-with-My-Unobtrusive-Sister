//=============================================================================
// RPG Maker MV
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc QJ-Bullet.js与QJ-MapProjectileMZ.js插件的扩展程序[v1.1]
 * @author Qiu Jiu
 * 
 *
 * @help
 *一.基础说明：
 *  1.此插件为QJ-Bullet.js与QJ-MapProjectileMZ.js插件的扩展程序，不可单独工作，不使用本
 *插件的功能时也可卸载此插件，QJ-Bullet.js与QJ-MapProjectileMZ.js可正常运行。
 *  2.此插件需放在QJ-Bullet.js与QJ-MapProjectileMZ.js的下面。
 *  3.为了方便理解，这个插件里的指令均使用相对简单的语法。
 *  4.QJ.BL开头的是QJ-Bullet.js的扩展指令。
 *    QJ.MPMZ开头的是QJ-MapProjectileMZ.js的扩展指令。
 *  5.此插件在RMMV中使用时，QJ-Bullet.js与QJ-MapProjectileMZ.js插件的扩展程序都能使用。
 *    但在RMMZ中使用时，只能使用QJ-MapProjectileMZ.js插件的扩展程序。
 *    因为QJ-Bullet.js只能用于rmmv，但QJ-MapProjectileMZ.js能用于mv和mz。
 *
 *二.用法：
 *
 *1.获取玩家/事件身边的弹幕数量：
 *  以下的指令可写在事件指令-变量-脚本中，懂脚本的人也可以直接使用，此函数返回弹幕数。
 *
 *  (1)获取QJ-Bullet.js插件中指定玩家/事件周围指定碰撞体内的弹幕数量。
 *     QJ.BL.getBulletNumberBM(characterId,collisionBox,name);或者
 *     QJ.BL.getBulletNumberBM(characterId,collisionBox);
 *     含义：
 *     characterId:-1代表玩家 0代表本事件 大于0的数字代表事件编号
 *     collisionBox:碰撞体积
 *     name:可写可不写，代表弹幕的name属性，当写此值时，此函数只计算有对应name属性的弹幕。
 *     例如：
 *     获取玩家方圆144像素内的弹幕数：
 *     QJ.BL.getBulletNumberBM(-1,"C[144]");
 *
 *  (2)获取QJ-MapProjectileMZ.js插件中指定玩家/事件周围指定碰撞体内的弹幕数量。
 *     QJ.MPMZ.getBulletNumberBM(characterId,collisionBox,groupName);或者
 *     QJ.MPMZ.getBulletNumberBM(characterId,collisionBox);
 *     含义：
 *     characterId:-1代表玩家 0代表本事件 大于0的数字代表事件编号
 *     collisionBox:碰撞体积
 *     groupName:可写可不写，代表弹幕的groupName属性，当写此值时，此函数只计算有对应groupName属性的弹幕。
 *     例如：
 *     获取玩家方圆144像素内的弹幕数：
 *     QJ.MPMZ.getBulletNumberBM(-1,['C',144]);
 *
 *2.让弹幕能够控制图块的通行：
 *  在QJ-MapProjectileMZ.js插件中使用QJ.MPMZ.Shoot发射的弹幕，可以使用一个额外的属性：
 *
 *mapPassable:[朝下是否可通行,朝左是否可通行,朝右是否可通行,朝上是否可通行]
 *
 *  使用这个属性后，此弹幕所在的格子（注意，具体来说是这个弹幕的锚点所在的格子）可以设置额外的通行度。
 *
 *【朝下/左/右/上是否可通行】可以写true或者false，写false就可以使此弹幕所在的格子的对应方向无法通行。
 *
 *  注意，这只能使原本可以通行的格子变得不可通行，但不能反过来。
 *
 *
*/
//=============================================================================
//
//=============================================================================
(($ = {})=>{
//==============================================================================================================================================
//
//==============================================================================================================================================
if (window.Imported && Imported.QJBullet) {
//=============================================================================
//
//=============================================================================
QJ.BL.getBulletNumberBM = function(characterId,collisionBox,name = "") {
    let allBulletList = $gameMap._mapBullets;
    let searchBulletList = [];
    if (name && name.length>0) {
        if ($gameMap._mapBulletsName[name]) {
            for (let i of $gameMap._mapBulletsName[name]) {
                if (allBulletList[i]) {
                    searchBulletList.push(allBulletList[i]);
                }
            }
        }
    } else {
        for (let i in allBulletList) {
            if (allBulletList[i]) {
                searchBulletList.push(allBulletList[i]);
            }
        }
    }
    if (searchBulletList.length==0) {
        return 0;
    }
    let character = QJ.BL.dealCharacter(characterId);
    let x = character.screenX()+$gameMap.displayX()*48;
    let y = character.screenY()+$gameMap.displayY()*48;
    let body = QJ.BL.box(x,y,QJ.BL.dealCollisionBox(collisionBox));
    let number = 0;
    for (let bullet of searchBulletList) {
        if (bullet && QJ.BL.judge(body,bullet.QJBody).result) {
            number++;
        }
    }
    return number;
};
//=============================================================================
//
//=============================================================================
}
//==============================================================================================================================================
//
//==============================================================================================================================================
if (window.Imported && Imported.QJMapProjectile) {
//=============================================================================
//
//=============================================================================
QJ.MPMZ.getBulletNumberBM = function(characterId, collisionBox, name = "") {
    let allBulletList = $gameMap._mapBulletsQJ;
    let searchBulletList = [];

    if (name && name.length > 0) {
        let bulletArray = $gameMap._mapBulletsNameQJ[name] || {};
        bulletArray = Object.values(bulletArray);

        for (let i of bulletArray) {
            if (allBulletList[i]) {
                searchBulletList.push(allBulletList[i]);
            }
        }
    } else {
        for (let i in allBulletList) {
            if (allBulletList[i]) {
                searchBulletList.push(allBulletList[i]);
            }
        }
    }

    if (searchBulletList.length == 0) {
        return 0;
    }

    let character = QJ.getCharacter(characterId);
    let x = character.screenX() + $gameMap.displayX() * 48;
    let y = character.screenY() + $gameMap.displayY() * 48;
    let body = QJ.SAT.box(x, y, collisionBox);
    let number = 0;

    for (let bullet of searchBulletList) {
        if (bullet && QJ.SAT.judge(body, bullet.QJBody).result) {
            number++;
        }
    }

    return number;
};

//=============================================================================
//增加属性 mapPassable:[false,false,false,false],
//=============================================================================
QJ.MPMZ.defaultData1["mapPassable"] = null;//此条必须写，不然弹幕不会记录这个属性。
$.Game_QJBulletMZ_update = Game_QJBulletMZ.prototype.update;
Game_QJBulletMZ.prototype.update = function (ifInit) {
    if ($.Game_QJBulletMZ_update.apply(this,arguments)) return true;
    if (this.data.mapPassable!==null) {
        $gameMap.addProjectileNotPassableMPMZ(this.x,this.y,this.data.mapPassable);
    }
    return false;
};
$.Game_Map_updateProjectilesQJ = Game_Map.prototype.updateProjectilesQJ;
Game_Map.prototype.updateProjectilesQJ = function() {
    this._cannotPassableMPMZ = {};//清空已有数据
    $.Game_Map_updateProjectilesQJ.apply(this,arguments);
};
Game_Map.prototype.addProjectileNotPassableMPMZ = function(x,y,data) {
    if (data.length===4) {
        x = Math.floor(x/48);
        y = Math.floor(y/48);
        this._cannotPassableMPMZ[x+","+y] = data;
    }
};
Game_Map.prototype.getProjectileNotPassableMPMZ = function(x,y,dir) {
    if (this._cannotPassableMPMZ===undefined) return true;
    let d = this._cannotPassableMPMZ[x+","+y];
    return d===undefined?true:d[dir/2-1];
};
$.Game_Map_isPassable = Game_Map.prototype.isPassable;
Game_Map.prototype.isPassable = function(x, y, d) {
    return $.Game_Map_isPassable.apply(this,arguments) && this.getProjectileNotPassableMPMZ(x,y,d);
};
//==============================================================================================================================================
//
//==============================================================================================================================================
}
//=============================================================================
//
//=============================================================================
})();
//=============================================================================
//
//=============================================================================