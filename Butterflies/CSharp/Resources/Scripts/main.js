// This script is the main entry point of the game


var scene = Atomic.player.loadScene("Scenes/TheScene.scene");
var camera = scene.getChild("Camera").getComponent("Camera");
camera.setOrthoSize(Atomic.graphics.height * .7 * Atomic.PIXEL_SIZE);
