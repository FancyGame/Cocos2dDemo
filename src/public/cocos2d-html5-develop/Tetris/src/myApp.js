var GameLayer = cc.Layer.extend({
    helloLabel: null,
    sprite: null,
    repeatCount: 0,
    KEY_CODE: {UP:87,DOWN:83,LEFT:65,RIGHT:68},

    init: function () {

        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask director the window size
        var WinSize = cc.director.getWinSize();
        this.winSize = WinSize;

        // add "Helloworld" splash screen"
        this.sp_bgpic = cc.Sprite.create(s_bgpic);
        this.sp_bgpic.setAnchorPoint(0.5, 0.5);
        this.sp_bgpic.setPosition(WinSize.width / 2, WinSize.height / 2);
        this.rate = WinSize.height / this.sp_bgpic.getContentSize().height;
        this.sp_bgpic.setScale(this.rate);
        this.addChild(this.sp_bgpic, 0);

        this.sp_block = cc.Sprite.create(s_block);
        this.sp_block.setAnchorPoint(0.5, 0.5);
        this.sp_block.setPosition(WinSize.width / 2, WinSize.height / 2);
        this.sp_block.setScale(this.rate);
        this.addChild(this.sp_block, 0);

        cc._renderContext.fillStyle = "rgba(255,255,255,1)";//上下文填充颜色
        cc._renderContext.strokeStyle = "rgba(255,255,255,1)";
        cc._drawingUtil.drawLine(cc.p(0,0), cc.p(100, 100));//画一条线
//        this.draw = new cc.DrawingPrimitiveCanvas();
//        cc._drawingUtil.setDrawColor(255,0,0,255);
//        cc._drawingUtil.drawLine(cc.p(10,10),cc.p(100,100));

//        this.schedule(this.timeCallback,2);

        //播放背景音乐
//        cc.audioEngine.playMusic(s_bg_music,true);

        // 添加事件监听
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
                console.log("Key " + keyCode.toString() + " was pressed!");
                var layer = event.getCurrentTarget();
                var tileMapContentSize = layer._tileMap.getContentSize();
                if(keyCode==layer.KEY_CODE.UP) {

                }
                else if(keyCode==layer.KEY_CODE.DOWN) {
                }
                else if(keyCode==layer.KEY_CODE.LEFT) {
                }
                else if(keyCode==layer.KEY_CODE.RIGHT) {
                }
            },
            onKeyReleased: function (keyCode, event) {
//                console.log("Key " + keyCode.toString() + " was released!");
            }
        }, this);

//        cc.eventManager.addListener({
//            event: cc.EventListener.MOUSE,
//            onMouseMove: function (event) {
//                var str = "Mouse Move Position X: " + event.getLocationX() + "  Y:" + event.getLocationY();
//                console.log(str);
//            },
//            onMouseUp: function (event) {
//                var str = "Mouse Up detected, Key: " + event.getButton();
//                console.log(str);
//            },
//            onMouseDown: function (event) {
//                var str = "Mouse Down detected, Key: " + event.getButton();
//                console.log(str);
//            },
//            onMouseScroll: function (event) {
//                var str = "Mouse Scroll detected, X: " + event.getLocationX() + "  Y:" + event.getLocationY();
//                console.log(str);
//            }
//        }, this);

    },
    timeCallback: function (dt) {
        console.log('timeCallback', new Date(), dt);
        if(this.sp_block.y-this.sp_block.getContentSize().height*this.rate>0)
            this.sp_block.y -= this.sp_block.getContentSize().height*this.rate;
        //改变timer的间隔时间
//        if (this.repeatCount++ == 5) {
////            this.unschedule(this.timeCallback);
//            this.schedule(this.timeCallback, 1);
//        }
    },
    __END__ : null
});

var MyScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
        layer.init();
    }
});
