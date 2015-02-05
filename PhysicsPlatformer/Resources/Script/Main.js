var game = Atomic.game
cache = game.cache;
graphics = game.graphics;
renderer = game.renderer;
engine = game.engine;
input = game.input;


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
    
   //physicsWorld.drawDebugGeometry();

}


function CreateScene() {

    daytime = false;

    game.createScene2D();
    scene = game.scene;
    cameraNode = game.cameraNode;
    camera = game.camera;

    
    physicsWorld = scene.createComponent("PhysicsWorld2D");
    
    physicsWorld.continuousPhysics = false;
    physicsWorld.subStepping = false;

        
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
    
    //uiNode = scene.createChild("UI");
    //uiNode.createJSComponent("UI");
 
    levelNode = scene.createChild("Level");
    levelNode.createJSComponent("Level");
    avatarNode = scene.createChild("Avatar");
    avatarNode.createJSComponent("Avatar");
    backgroundNode = scene.createChild("Background");
    backgroundNode .createJSComponent("Background");       
    
    

}