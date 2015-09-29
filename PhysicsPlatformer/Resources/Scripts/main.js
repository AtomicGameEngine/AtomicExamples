// This script is the main entry point of the game

// create the start ui programmatically, we could also
// use a ui template
//create  main view
var view = new Atomic.UIView();
//create a window
var window = new Atomic.UIWindow();
//disable tile bard and make it non resizeable
window.settings = Atomic.UI_WINDOW_SETTINGS_TITLEBAR;
window.text = "Physics Platformer";

// Create a layout, otherwise child widgets won't know how to size themselves
// and would manually need to be sized
var layout = new Atomic.UILayout();
layout.rect = view.rect;
// give ourselves a little more spacing
layout.spacing = 18;
//axis to y
layout.axis = Atomic.UI_AXIS_Y;
//add ours layout to window
window.addChild(layout);

//create a text field
var text = new Atomic.UITextField();
text.text = "Please select the time of day:";
layout.addChild(text);

// Buttons layout
var buttonLayout = new Atomic.UILayout();
buttonLayout.axis = Atomic.UI_AXIS_X;
layout.addChild(buttonLayout);
var buttonDaytime = new Atomic.UIButton();
buttonDaytime.text = "Play Daytime";
buttonDaytime.onClick = function () {
  run(true);
  //we need to return value here, otherwise we will be GC'ed
  return true;
}
buttonLayout.addChild(buttonDaytime);

var buttonNightTime = new Atomic.UIButton();
buttonNightTime.text = "Play Nighttime";
buttonNightTime.onClick = function () {
  run(false);
  //we need to return value here, otherwise we will be GC'ed
  return true;
}
buttonLayout.addChild(buttonNightTime);

window.resizeToFitContent();

// add to the root view and center
view.addChild(window);
window.center();
var dayTime;
function run(daytime) {
  //ok, then remove ours window
  view.removeChild(window);
  //require GlobalVariables module, and set its dayTime value to the current daytime
  require("GlobalVariables").dayTime = daytime;
  //load main scene!
  var scene = Atomic.player.loadScene("Scenes/Scene.scene");
  //if we are running ours game on android
  if(Atomic.platform == "Android" || Atomic.platform == "iOS") {
    //requiring a dpad module
    var DPad = require("DPad");
    //creating a new DPad
    var dpad = new DPad();
    //adding horizontal and vertical buttons
    dpad.addAll();
    //ok, then we could init ours dpad
    dpad.init();
    //create a jump button
    var jumpButton = new Atomic.UIButton();
    //unset its skin, because we will use UIImageWidget
    jumpButton.skinBg = "";
    //create ours jump button image
    var jumpButtonImage = new Atomic.UIImageWidget();
    //load image
    jumpButtonImage.setImage("UI/jumpButton.png");
    //resize ours image by 2x
    var jumpButtonWidth = jumpButtonImage.imageWidth*2;
    var jumpButtonHeight = jumpButtonImage.imageHeight*2;
    //calculate position
    var posX = Atomic.graphics.width - Atomic.graphics.width/6;
    var posY = Atomic.graphics.height - Atomic.graphics.height/2.5;

    //sets jumpButton rect, specify position and end position
    jumpButton.rect = [posX, posY, posX+jumpButtonWidth, posY+jumpButtonHeight];
    //sets jumpButtonImage rect, we specify there only end position
    jumpButtonImage.rect = [0, 0, jumpButtonWidth, jumpButtonHeight];
    //adds image to jumpButton
    jumpButton.addChild(jumpButtonImage);
    //adds jumpButton to the dpad view
    dpad.view.addChild(jumpButton);
    //sets jumpButton capturing to false, because we wanna make it multitouchable
    jumpButton.setCapturing(false);
    //binds jumpButton to KEY_SPACE
    Atomic.input.bindButton(jumpButton, Atomic.KEY_SPACE);
  }
}
