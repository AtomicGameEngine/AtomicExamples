//set texture filter mode to the nearest to see pure pixels
Atomic.renderer.textureFilterMode = Atomic.FILTER_NEAREST;
//load a new main scene
var scene = Atomic.player.loadScene("Scenes/Scene.scene");
//get main camera from the loaded scene
var camera = scene.getMainCamera();
//calculate ortho size
camera.setOrthoSize(Atomic.graphics.height * Atomic.PIXEL_SIZE);
