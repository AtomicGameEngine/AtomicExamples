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

    daytime = false;

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
    if (daytime)
        lightGroup.ambientColor = [1, 1, 1, 1];
    else
        lightGroup.ambientColor = [.8, .8, .8, .25];
    
    
    if (daytime)
    {
        TheSun = scene.createComponent("DirectionalLight2D");
        TheSun.color = [1, 1, 1, 0.15];
        TheSun.castShadows = true;
        TheSun.numRays = 1024;
        TheSun.backtrace = false;        
        lightGroup.addLight(TheSun);
    }
    
    uiNode = scene.createChild("UI");
    uiNode.createJSComponent("UI");
 
    levelNode = scene.createChild("Level");
    levelNode.createJSComponent("Level");
    avatarNode = scene.createChild("Avatar");
    avatarNode.createJSComponent("Avatar");
    backgroundNode = scene.createChild("Background");
    backgroundNode .createJSComponent("Background");       
    
    

}