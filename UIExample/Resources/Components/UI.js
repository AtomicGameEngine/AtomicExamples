
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
windowTitle.setText("Star Maker!");
titleBar.addChild(windowTitle);

window.addChild(titleBar);

var button = new Atomic.Button();
button.setName ("Star Button");
button.setMinHeight(24);

var buttonText = new Atomic.Text();

buttonText.text = "Add Star";
var font = game.cache.getResource("Font", "Fonts/Anonymous Pro.ttf");

buttonText.setFont(font, 12);
buttonText.color = [0, 1, 0, 1];

buttonText.horizontalAlignment = Atomic.HA_CENTER;
buttonText.verticalAlignment = Atomic.VA_CENTER;
button.addChild(buttonText);

window.addChild(button);

window.movable = true;
window.resizeable = true;

window.setStyleAuto();
titleBar.setStyleAuto();
windowTitle.setStyleAuto();
button.setStyleAuto();

self.onMouseClick = function(element) {

    var width = game.graphics.width * Atomic.PIXEL_SIZE * 0.5;
    var height = game.graphics.height * Atomic.PIXEL_SIZE * 0.5;
    
    var x = -width/2 + width * Math.random();
    var y = -height/2 + height * Math.random();

   if (element.name == "Star Button") {
        var starNode = game.scene.createChild("Star");
        starNode.createJSComponent("Star");
        starNode.position2D = [x, y];
   }
    
}

function start() {

    self.listenToEvent(null, "UIMouseClick", self.onMouseClick );

}

function update(timeStep) {

    
    
}

