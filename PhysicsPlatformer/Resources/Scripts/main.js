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
  Atomic.player.loadScene("Scenes/Scene.scene");
}
