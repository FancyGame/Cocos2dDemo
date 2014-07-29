var MyLayer = cc.Layer.extend({
    helloLabel:null,
    sprite:null,
    repeatCount:0,

    init:function () {

        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask director the window size
        var size = cc.director.getWinSize();

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
        closeItem.setPosition(size.width - 20, 20);

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        this.helloLabel = cc.LabelTTF.create("Hello World", "Arial", 38);
        // position the label on the center of the screen
        this.helloLabel.setPosition(size.width / 2, size.height - 40);
        // add the label as a child to this layer
        this.addChild(this.helloLabel, 5);

        // add "Helloworld" splash screen"
        this.sprite = cc.Sprite.create(s_HelloWorld);
        this.sprite.setAnchorPoint(0.5, 0.5);
        this.sprite.setPosition(size.width / 2, size.height / 2);
        this.sprite.setScale(size.height/this.sprite.getContentSize().height);
        this.addChild(this.sprite, 0);

        this.schedule(this.timeCallback,2);
        // 加载tmx
        var tileMap = cc.TMXTiledMap.create(tmx_001);
        this._tileMap = tileMap;
        this.addChild(this._tileMap, 1, 0);
        // 获得对象层
        var objectLayer = tileMap.getObjectGroup("Objects");
        var array = objectLayer.getObjects();

        // 添加事件监听
        this.setTouchEnabled(true);
    },
    timeCallback:function(dt) {
        console.log('timeCallback',new Date(),dt);
        if(this.repeatCount++>=5) {
//            this.unschedule(this.timeCallback);
            this.schedule(this.timeCallback,1);
        }
    }
});

var MyScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MyLayer();
        this.addChild(layer);
        layer.init();
    }
});
