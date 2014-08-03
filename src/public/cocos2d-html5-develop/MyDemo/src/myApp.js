var MyLayer = cc.Layer.extend({
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

        // add a "close" icon to exit the progress. it's an autorelease object
        var closeItem = cc.MenuItemImage.create(
            s_CloseNormal,
            s_CloseSelected,
            function () {
                cc.log("close");
            },
            this
        );
        closeItem.setAnchorPoint(0.5, 0.5);

        var menu = cc.Menu.create(closeItem);
        menu.setPosition(0, 0);
        this.addChild(menu, 1);
        closeItem.setPosition(WinSize.width - 20, 20);

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        this.helloLabel = cc.LabelTTF.create("Hello World", "Arial", 38);
        // position the label on the center of the screen
        this.helloLabel.setPosition(WinSize.width / 2, WinSize.height - 40);
        // add the label as a child to this layer
        this.addChild(this.helloLabel, 5);

        // add "Helloworld" splash screen"
        this.sprite = cc.Sprite.create(s_HelloWorld);
        this.sprite.setAnchorPoint(0.5, 0.5);
        this.sprite.setPosition(WinSize.width / 2, WinSize.height / 2);
        this.sprite.setScale(WinSize.height / this.sprite.getContentSize().height);
        this.addChild(this.sprite, 0);

        // 加载tmx
        var tileMap = cc.TMXTiledMap.create(s_tmx001);
        this._tileMap = tileMap;
//        console.log(tileMap.getContentSize());
        this.addChild(this._tileMap);

        //this.schedule(this.timeCallback,2);

        //Play back ground music
        cc.audioEngine.playMusic(s_bg_music,true);

        // 添加事件监听
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
                console.log("Key " + keyCode.toString() + " was pressed!");
                var layer = event.getCurrentTarget();
                var tileMapContentSize = layer._tileMap.getContentSize();
                if(keyCode==layer.KEY_CODE.UP) {
                    if(layer._tileMap.y+tileMapContentSize.height > layer.winSize.height)
                        layer._tileMap.y -= 32;
                }
                else if(keyCode==layer.KEY_CODE.DOWN) {
                    if(layer._tileMap.y<0)
                        layer._tileMap.y += 32;
                }
                else if(keyCode==layer.KEY_CODE.LEFT) {
                    if(layer._tileMap.x<0)
                        layer._tileMap.x += 32;
                }
                else if(keyCode==layer.KEY_CODE.RIGHT) {
                    if(layer._tileMap.x+tileMapContentSize.width > layer.winSize.width)
                        layer._tileMap.x -=32;
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
        if (this.repeatCount++ == 5) {
//            this.unschedule(this.timeCallback);
            this.schedule(this.timeCallback, 1);
        }
    },
    registerWithTouchDispatcher: function () {
        // CCDirector::sharedDirector()->getTouchDispatcher()->addTargetedDelegate(this, 0, true);
        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, 0, true);
    },
    onTouchEnded: function (touch, event) {
        var touchLocation = touch.getLocation();
        touchLocation = this.convertToNodeSpace(touchLocation);
        console.log('onTouchEnded', touchLocation);
    },
    onTouchBegan: function (touches, event) {
        // 返回true表明接受这个触摸
        return true;
    }
});

var MyScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new MyLayer();
        this.addChild(layer);
        layer.init();
//        // 加载tmx
//        var tileMap = cc.TMXTiledMap.create(s_tmx001);
//        this._tileMap = tileMap;
//        this.addChild(this._tileMap);
        // 获得对象层
//        var objectLayer = tileMap.getLayer("Ground");
//        if(!objectLayer) {
//            console.log("No this layer");
//        }
//        else {
//            console.log(objectLayer);
////            this.addChild(objectLayer);
//        }
    }
});
