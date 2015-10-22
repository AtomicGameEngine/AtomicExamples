Atomic.renderer.textureFilterMode = Atomic.FILTER_NEAREST;
var scene = Atomic.player.loadScene("Scenes/Scene.scene");
var camera = scene.getMainCamera();
camera.setOrthographic(true);
camera.setOrthoSize(Atomic.graphics.height * Atomic.PIXEL_SIZE);
