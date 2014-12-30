gameui = GetGameUI();

var hearts = [];

var count = 0;

function update(timeStep) {


}

function start() {

    var musicFile = cache.getResource("Sound", "Sounds/JumpingBat.ogg");
    musicFile.looped = true;
    var musicNode = scene.createChild("MusicNode");
    var musicSource = musicNode.createComponent("SoundSource");
    musicSource.gain = 1.0;
    musicSource.soundType = Atomic.SOUND_MUSIC;
    musicSource.play(musicFile);


    // Construct new Text object
    scoreText = new Atomic.Text();

    scoreText.text = "Score: 0";
    var font = cache.getResource("Font", "Fonts/Anonymous Pro.ttf");

    scoreText.setFont(font, 30);
    scoreText.color = [0, 1, 0, 1];

    //-- Align Text center-screen
    scoreText.horizontalAlignment = Atomic.HA_LEFT;
    scoreText.verticalAlignment = Atomic.VA_TOP;

    gameui.addChild(scoreText);

    var heartContainer = new Atomic.UIElement();
    heartContainer.setPosition(-16, 48);
    heartContainer.horizontalAlignment = Atomic.HA_RIGHT;
    heartContainer.layoutMode = Atomic.LM_HORIZONTAL;
    heartContainer.layoutSpacing = 16;
    gameui.addChild(heartContainer);

    var heart = cache.getResource("Texture2D", "UI/UI_HEART_FULL.png");

    for (var i = 0; i < 3; i++) {
        image = new Atomic.Sprite();
        image.setTexture(heart);
        image.setFixedSize(48, 48);
        heartContainer.addChild(image);
        hearts.push(image);
    }

}