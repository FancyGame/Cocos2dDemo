/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var MyLayer = cc.Layer.extend({
    isMouseDown: false,
    helloImg: null,
    helloLabel: null,
    circle: null,
    sprite: null,
    size: null,
    _tileMap: null,
    player: null,
    init: function () {
        this._super();
        // ask director the window size
        this.size = cc.Director.getInstance().getWinSize();
        // 加载tmx
        var tileMap = cc.TMXTiledMap.create(tmx_001);
        this._tileMap = tileMap;
        this.addChild(this._tileMap, 1, 0);
        // 获得对象层
        var objectLayer = tileMap.getObjectGroup("Objects");
        var array = objectLayer.getObjects();
        var spawnPoint = array[0];
        var objX = spawnPoint["x"];
        var objY = spawnPoint["y"];
        var width = spawnPoint["width"];
        var height = spawnPoint["height"];

        this.player = cc.Sprite.create(s_Player);
        this.player.setPosition(cc.p(objX, objY));
        this.addChild(this.player, 1, 0);
        this.setViewpointCenter(this.player.getPosition());

        // 添加事件监听
        this.setTouchEnabled(true);
    },
    registerWithTouchDispatcher: function () {
        // CCDirector::sharedDirector()->getTouchDispatcher()->addTargetedDelegate(this, 0, true);
        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, 0, true);
    },
    onTouchEnded: function (touch, event) {
        var touchLocation = touch.getLocation();
        touchLocation = this.convertToNodeSpace(touchLocation);

        //获得精灵当前位置
        var playerPos = this.player.getPosition();
        console.log("touchLocation.x: " + touchLocation.x);
        console.log("touchLocation.y: " + touchLocation.y);
        console.log("playerPos.x :" + playerPos.x);
        console.log("playerPos.y :" + playerPos.y);

        /*
         计算出touch点和精灵的位置之差。我们必须基于touch位置选择一个方向，因此，
         首先，我们需要计算出是上下移动还是左右移动。然后，我们比较正负值，决定具体的方向。
         */
        var diff = cc.pSub(touchLocation, playerPos);
        if (Math.abs(diff.x) > Math.abs(diff.y)) {
            if (diff.x > 0) {
                playerPos.x += this._tileMap.getTileSize().width;
            } else {
                playerPos.x -= this._tileMap.getTileSize().width;
            }
        } else {
            if (diff.y > 0) {
                playerPos.y += this._tileMap.getTileSize().height;
            } else {
                playerPos.y -= this._tileMap.getTileSize().height;

            }

        }

        if (playerPos.x <= (this._tileMap.getMapSize().width * this._tileMap.getTileSize().width) &&
            playerPos.y <= (this._tileMap.getMapSize().height * this._tileMap.getTileSize().height) &&
            playerPos.y >= 0 && playerPos.x >= 0) {

            // 设置精灵位置
            this.setPlayerPosition(playerPos);
        }
        this.setViewpointCenter(this.player.getPosition());
    },
    onTouchBegan: function (touches, event) {
        // 返回true表明接受这个触摸
        return true;
    },
    /**
     * 设置玩家所在的视窗
     * @param position
     * @returns {*}
     */
    setViewpointCenter: function (position) {
        // 屏幕大小
        var winSize = this.size;
        var x = Math.max(position.x, winSize.width / 2);
        var y = Math.max(position.y, winSize.height / 2);
        x = Math.min(x, (this._tileMap.getMapSize().width * this._tileMap.getTileSize().width) - winSize.width / 2);
        y = Math.min(y, (this._tileMap.getMapSize().height * this._tileMap.getTileSize().height) - winSize.height / 2);
        //console.log("x2 is : " + x + "    y2 is : " + y);
        // 实际位置
        var actualPosition = cc.p(x, y);

        // 坐标中心
        var centerOfView = cc.p(winSize.width / 2, winSize.height / 2);

        //console.log("centerOfView x" + centerOfView.x + "y " + centerOfView.y);
        // 计算两点间的差分。
        var viewPoint = cc.pSub(centerOfView, actualPosition);
        console.log("视窗 x ：" + viewPoint.x + " 视窗 y ：" + viewPoint.y);
        // 设置当前层的视窗
        this.setPosition(viewPoint);
    },
    setPlayerPosition: function (viewPoint) {
        console.log("精灵位置 x " + viewPoint.x);
        console.log("精灵位置 y " + viewPoint.y);
        this.player.setPosition(viewPoint);
    }
});


var MyScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
        layer.init();
    }
});
