"atomic component";

//Define a Scene component
exports.component = function(self) {
    //we are attaching that component to the Scene, so we are sure that ours node is a scene
    var scene = self.node;
    var time = 12.25;

    self.start = function() {

        // Add light flickers
        var lightNodes = scene.getChildrenWithComponent("Light", true);
        for (var i = 0; i < lightNodes.length; i++) {
            lightNodes[i].createJSComponent("Components/LightFlicker.js");
        }

        // create the procedural sky
        var pnode = scene.createChild();
        self.procSky = pnode.createComponent("ProcSky");
        self.procSky.setDayTime(time);
        self.procSky.autoUpdate = false;

        //Create music
        var musicFile = Atomic.cache.getResource("Sound", "Music/StoryTime.ogg");
        //Set it looped
        musicFile.looped = true;
        var musicNode = scene.createChild("MusicNode");
        var musicSource = musicNode.createComponent("SoundSource");
        musicSource.gain = .5;
        musicSource.soundType = Atomic.SOUND_MUSIC;
        musicSource.play(musicFile);

        //init DPad if its a mobile platform
        if(Atomic.platform == "Android" || Atomic.platform == "iOS") {
            var DPad = require("DPad");
            var dpad = new DPad();
            dpad.addAll();
            dpad.init();

            var jumpView = new Atomic.UIView();

            var jumpButton = new Atomic.UIButton();
            //unset its skin, because we will use UIImageWidget
            jumpButton.skinBg = "";
            //create ours jump button image
            var jumpButtonImage = new Atomic.UIImageWidget();
            //load image
            jumpButtonImage.setImage("UI/jumpButton.png");
            //resize ours image by 2.2x
            var jumpButtonWidth = jumpButtonImage.imageWidth*2.2;
            var jumpButtonHeight = jumpButtonImage.imageHeight*2.2;
            //calculate position
            var posX = Atomic.graphics.width - Atomic.graphics.width/8-jumpButtonWidth/2;
            var posY = Atomic.graphics.height - Atomic.graphics.height/4-jumpButtonHeight/2;

            //sets jumpButton rect, specify position and end position
            jumpView.rect = [posX, posY, posX+jumpButtonWidth, posY+jumpButtonHeight];
            jumpButton.rect = [0, 0, jumpButtonWidth, jumpButtonHeight];
            //sets jumpButtonImage rect, we specify there only end position
            jumpButtonImage.rect = [0, 0, jumpButtonWidth, jumpButtonHeight];
            //adds image to jumpButton
            jumpButton.addChild(jumpButtonImage);
            //adds jumpButton to the dpad view
            jumpView.addChild(jumpButton);
            //sets jumpButton capturing to false, because we wanna make it multitouchable
            jumpButton.setCapturing(false);
            //binds jumpButton to KEY_SPACE
            Atomic.input.bindButton(jumpButton, Atomic.KEY_SPACE);
        }
    };

    self.update = function(timeStep) {

        if (Atomic.input.getKeyDown(Atomic.KEY_LEFTBRACKET)) {
            time -= timeStep * 0.1;
            self.procSky.setDayTime(time);
        } else if (Atomic.input.getKeyDown(Atomic.KEY_RIGHTBRACKET)) {
            time += timeStep * 0.1;
            self.procSky.setDayTime(time);
        }
    };
};
