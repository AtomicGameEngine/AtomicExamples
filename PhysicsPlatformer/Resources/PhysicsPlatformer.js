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
    
    // physicsWorld.drawDebugGeometry();

}


function CreateScene() {

    scene = new Atomic.Scene();
    scene.createComponent("Octree");
    scene.createComponent("DebugRenderer");
    
    physicsWorld = scene.createComponent("PhysicsWorld2D");
    
    physicsWorld.continuousPhysics = false;
    physicsWorld.subStepping = false;
        
    cameraNode = scene.createChild("Camera");
    cameraNode.position = [0.0, 0.0, -10.0];
    camera = cameraNode.createComponent("Camera");
    camera.orthographic = true;
    camera.orthoSize = graphics.height * Atomic.PIXEL_SIZE;       
    
    var viewport = new Atomic.Viewport(scene, camera);
    renderer.setViewport(0, viewport);

    // currently lightgroup must be created after viewport 0 is set
    lightGroupNode = scene.createChild("LightGroup");
    lightGroup = lightGroupNode.createComponent("Light2DGroup");
    lightGroup.setPhysicsWorld(physicsWorld);
    lightGroup.ambientColor = [.8, .8, .8, .5];
        
    
    uiNode = scene.createChild("UI");
    uiNode.createJSComponent("UI");
 
    levelNode = scene.createChild("Level");
    levelNode.createJSComponent("Level");
    avatarNode = scene.createChild("Avatar");
    avatarNode.createJSComponent("Avatar");
    backgroundNode = scene.createChild("Background");
    backgroundNode .createJSComponent("Background");       
    
    

}