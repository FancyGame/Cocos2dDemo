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
        this._tileMap = cc.TMXTiledMap.create(s_tmx001);
        this.addChild(this._tileMap);

        this.schedule(this.timeCallback,2);

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

        //处理角色动画
        var spRect = {width:53,height:75};
        var texture = cc.textureCache.addImage(s_role);    //读取我们需要的图片
        var animFrames = [];     //将之前的每一帧保存到数组中
        for(var i=0;i<4;++i) {
            for(var j=0;j<9;++j) {
                var frame = cc.SpriteFrame.create(texture, cc.rect(spRect.width*j, spRect.height*i, spRect.width, spRect.height));  //将图片中每一帧利用rect切出来保存到精灵帧中
                animFrames.push(frame);
            }
        }

        var sprite = cc.Sprite.create(animFrames[0]);    //从图片帧中创建一个精灵
        sprite.setPosition(cc.p(WinSize.width/2, WinSize.height/2));
        this.addChild(sprite);

        var animation = cc.Animation.create(animFrames, 0.2);  //创建动画， 第一个参数帧数组， 第二个参数是延迟时间，即每帧图片间隔多少播放
        var animate = cc.Animate.create(animation);  //创建动画动作
        sprite.runAction(cc.RepeatForever.create(animate));


        //处理角色动画
        (function(thisLayer){
            var spRect2 = {width:67,height:100};
            var texture = cc.textureCache.addImage(s_explosion);    //读取我们需要的图片
            var animFrames = [];     //将之前的每一帧保存到数组中
            for(var i=0;i<11;++i) {
                var frame = cc.SpriteFrame.create(texture, cc.rect(spRect2.width*i, 0, spRect2.width, spRect2.height));  //将图片中每一帧利用rect切出来保存到精灵帧中
                animFrames.push(frame);
            }

            var sprite = cc.Sprite.create(animFrames[0]);    //从图片帧中创建一个精灵
            sprite.setPosition(cc.p(WinSize.width/2, WinSize.height/4));
            thisLayer.addChild(sprite);

            var animation = cc.Animation.create(animFrames, 0.15);  //创建动画， 第一个参数帧数组， 第二个参数是延迟时间，即每帧图片间隔多少播放
            var animate = cc.Animate.create(animation);  //创建动画动作
            sprite.runAction(cc.RepeatForever.create(animate));
        })(this);
    },
    timeCallback: function (dt) {
        console.log('timeCallback', new Date(), dt);
        //改变timer的间隔时间
        if (this.repeatCount++ == 5) {
//            this.unschedule(this.timeCallback);
            this.schedule(this.timeCallback, 1);
        }
    },
    endFunc: function() {
        ;
    }
});

var MyScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new MyLayer();
        this.addChild(layer);
        layer.init();
    }
});
