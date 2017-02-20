// This script is the main entry point of the game

//Load a Scene
Atomic.player.loadScene("Scenes/Scene.scene");

//init DPad if its a mobile platform
if(Atomic.platform == "Android" || Atomic.platform == "iOS") {
  var DPad = require("DPad");
  var dpad = new DPad();
  dpad.addAll();
  dpad.init();
}
