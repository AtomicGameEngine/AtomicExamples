
var game = Atomic.game;
var view = game.uiView;
var UI = Atomic.UI;
var UIButton = Atomic.UIButton;
var UITextField = Atomic.UITextField;
var UILayout = Atomic.UILayout;

var layout = new Atomic.UIWidget();
layout.load("UI/Hud.ui.txt");
layout.setSize(1280, 720);
view.addChild(layout);

SpaceGame.viewport.rect = layout.getWidget("viewport").rect;

var scoretext = layout.getWidget("scoretext");

//UI.debugShowSettingsWindow(view);

self.updateScore = function (value) {

	scoretext.text = "Score: " + value;

}

self.updateHealth = function (value) {

    //healthText.text = "Health: " + value;

}

self.updateGameText = function (text) {

    //gameText.text = text;

}

function start() {

}

function update(timeStep) {

}
