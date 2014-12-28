cache = GetResourceCache();
graphics = GetGraphics();
renderer = GetRenderer();
engine = GetEngine();
input = GetInput();
ui = GetUI();
gameui = GetGameUI();

var halfWidth = graphics.width * Atomic.PIXEL_SIZE * 0.5;
var halfHeight = graphics.height * Atomic.PIXEL_SIZE * 0.5;
var enableDebugHud = false;

function Start() {

    if (enableDebugHud) {
        var uiStyle = cache.getResource("XMLFile", "UI/DefaultStyle.xml");
        var debugHud = engine.createDebugHud();
        debugHud.defaultStyle = uiStyle;
        debugHud.toggleAll();        
    }

    CreateScene();
}

function Update() {

}


function CreateScene() {

    scene = new Atomic.Scene();
    scene.createComponent("Octree");

    var cameraNode = scene.createChild("Camera");
    cameraNode.position = [0.0, 0.0, -10.0];
    var camera = cameraNode.createComponent("Camera");
    camera.orthographic = true;
    camera.orthoSize = graphics.height * Atomic.PIXEL_SIZE;

    var viewport = new Atomic.Viewport(scene, camera);
    renderer.setViewport(0, viewport);

}