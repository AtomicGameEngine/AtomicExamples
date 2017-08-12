var WIDTH = 1280;
var HEIGHT = 720;
//set texture filter mode to the nearest to see pure pixels
Atomic.renderer.textureFilterMode = Atomic.FILTER_NEAREST;
//load a new main scene
var scene = Atomic.player.loadScene("Scenes/Scene.scene");
//get main camera from the loaded scene
var camera = scene.getMainCamera();
//calculate ortho size
camera.setOrthoSize(Atomic.graphics.height * Atomic.PIXEL_SIZE);
camera.setZoom(Math.min(Atomic.graphics.width / WIDTH, Atomic.graphics.height / HEIGHT));

exports.update = function() {

    if (Atomic.input.getKeyDown(Atomic.KEY_ESCAPE)) {
        Atomic.engine.exit();
    }

}
