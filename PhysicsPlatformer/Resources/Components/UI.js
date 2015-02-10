
var game = Atomic.game;
var ui = game.ui;
var root = ui.getRoot();

var uiStyle = game.cache.getResource("XMLFile", "UI/DefaultStyle.xml");
root.defaultStyle = uiStyle;

var window = new Atomic.Window();
root.addChild(window);

window.setMinSize(384, 192);

window.setAlignment(Atomic.HA_CENTER, Atomic.VA_CENTER);

window.setLayout(Atomic.LM_VERTICAL, 6, [6, 6, 6, 6]);
window.setName("Window");

var titleBar = new Atomic.UIElement();
titleBar.setMinSize(0, 24);
titleBar.setVerticalAlignment(Atomic.VA_TOP);
titleBar.setLayoutMode(Atomic.LM_HORIZONTAL);

// Create the Window title Text
var windowTitle = new Atomic.Text();
windowTitle.setName("WindowTitle");
windowTitle.setText("Please select Daytime of Nighttime");
titleBar.addChild(windowTitle);

window.addChild(titleBar);

// Daytime button
var button = new Atomic.Button();
button.setName ("Daytime");
button.setMinHeight(48);

var buttonText = new Atomic.Text();

buttonText.text = "Daytime";
var font = game.cache.getResource("Font", "Fonts/Anonymous Pro.ttf");

buttonText.setFont(font, 12);
buttonText.color = [1, 1, 0, 1];

buttonText.horizontalAlignment = Atomic.HA_CENTER;
buttonText.verticalAlignment = Atomic.VA_CENTER;
button.addChild(buttonText);

window.addChild(button);
button.setStyleAuto();

// Nighttime button
button = new Atomic.Button();
button.setName ("Nighttime");
button.setMinHeight(48);

buttonText = new Atomic.Text();

buttonText.text = "Nighttime";

buttonText.setFont(font, 12);
buttonText.color = [0, 1, 1, 1];

buttonText.horizontalAlignment = Atomic.HA_CENTER;
buttonText.verticalAlignment = Atomic.VA_CENTER;
button.addChild(buttonText);

window.addChild(button);
button.setStyleAuto();

window.movable = true;
window.resizeable = true;

window.setStyleAuto();
titleBar.setStyleAuto();
windowTitle.setStyleAuto();


self.onMouseClick = function(element) {

    var go = 0;
    
    if (element.name == "Daytime") {
        go = 1;
    }
    
    if (element.name == "Nighttime") {
        go = 2;    
    }
   
    if (go) {
    
        root.removeChild(window);
        
        var musicFile = game.cache.getResource("Sound", "Sounds/JumpingBat.ogg");
        musicFile.looped = true;
        var musicNode = game.scene.createChild("MusicNode");
        var musicSource = musicNode.createComponent("SoundSource");
        musicSource.gain = 1.0;
        musicSource.soundType = Atomic.SOUND_MUSIC;
        musicSource.play(musicFile);
        
    
        var platformerNode = game.scene.createChild("Platformer");
        var platformer = platformerNode.createJSComponent("Platformer");
        
        platformer.init(go == 1);
    
    }
    
}

function start() {
    

    self.listenToEvent(null, "UIMouseClick", self.onMouseClick );

}

function update(timeStep) {

    
    
}

