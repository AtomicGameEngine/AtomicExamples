
var game = Atomic.game;
var view = game.uiView;
var UI = Atomic.UI;
var UIButton = Atomic.UIButton;
var UITextField = Atomic.UITextField;
var UILayout = Atomic.UILayout;

// create the start ui programmatically, we could also
// use a ui template
var window = new Atomic.UIWindow();
// disable close button
window.settings = UI.WINDOW_SETTINGS_DEFAULT & ~UI.WINDOW_SETTINGS_CLOSE_BUTTON;
window.text = "Physics Platformer";

// root content layout
var layout = new UILayout();
layout.axis = UI.AXIS_Y;
// give ourselves a little more spacing
layout.spacing = 18;
layout.layoutSize = UI.LAYOUT_SIZE_AVAILABLE;
window.contentRoot.addChild(layout);

var text = new UITextField();
text.text = "Please select the time of day:";
layout.addChild(text);

// Buttons layout
var buttonLayout = new UILayout();
buttonLayout.layoutDistribution = UI.LAYOUT_DISTRIBUTION_GRAVITY;
layout.addChild(buttonLayout);

var button = new UIButton();
button.text = "Daytime";
button.onClick = function () {
  runPlatformer(true);
  // must return handled, as we're being GC'd here (window is being removed)
  return true;
}
buttonLayout.addChild(button);

button = new UIButton();
button.text = "Nighttime";
button.onClick = function () {
  runPlatformer(false);
  // must return handled, as we're being GC'd here (window is being removed)
  return true;
}
buttonLayout.addChild(button);

window.resizeToFitContent();

// add to the root view and center
view.addChild(window);
window.center();

function runPlatformer(daytime) {

  view.removeChild(window)

  var musicFile = game.cache.getResource("Sound", "Sounds/JumpingBat.ogg");
  musicFile.looped = true;
  var musicNode = game.scene.createChild("MusicNode");
  var musicSource = musicNode.createComponent("SoundSource");
  musicSource.gain = 1.0;
  musicSource.soundType = Atomic.SOUND_MUSIC;
  musicSource.play(musicFile);


  var platformerNode = game.scene.createChild("Platformer");
  var platformer = platformerNode.createJSComponent("Platformer");

  platformer.init(daytime);

}

function start() {

}

function update(timeStep) {



}
