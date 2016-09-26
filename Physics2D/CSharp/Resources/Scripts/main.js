// This script is the main entry point of the game


var scene = Atomic.player.loadScene("Scenes/TheScene.scene");
var camera = scene.getChild("Camera").getComponent("Camera");
camera.setOrthoSize(Atomic.graphics.height * Atomic.PIXEL_SIZE);
camera.setZoom(.75 * Math.min(Atomic.graphics.width / 1280.0, Atomic.graphics.height / 800.0));
