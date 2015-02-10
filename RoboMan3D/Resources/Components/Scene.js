var game = Atomic.game;
var node = self.node;

var world;

var drawDebug = false;
var debugRenderer;

function createPhysics() {

    var scene = game.scene;
    world = scene.createComponent("PhysicsWorld");

    // create the grid plane
    var planeNode = scene.createChild("Plane");
    planeNode.scale = [100.0, 1.0, 100.0];
    planeNode.position = [0, -.5, 0];
    var planeObject = planeNode.createComponent("StaticModel");

    var model = game.cache.getResource("Model", "Models/Box.mdl");
    var material = game.cache.getResource("Material", "Materials/BlueGrid.xml");

    planeObject.model = model;
    planeObject.material = material;

    planeNode.createComponent("RigidBody");
    var shape = planeNode.createComponent("CollisionShape");
    shape.setBox([1, 1, 1]);

    CreateCrateStack(10, 10, 10);
    CreateCrateStack(-10, 10, 10);
    CreateCrateStack(10, -10, 10);
    CreateCrateStack(-10, -10, 10);

}


function start() {

    var scene = game.scene;

    // debug renderer for showing physics
    if (drawDebug)
        debugRenderer = scene.createComponent("DebugRenderer");


    // zone
    var zoneNode = scene.createChild("Zone")
    var zone = zoneNode.createComponent("Zone");
    zone.boundingBox = [-1000, -1000, -1000, 1000, 1000, 1000];
    zone.ambientColor = [0.15, 0.15, 0.15];
    zone.fogColor = [0.5, 0.5, 0.7, 1.0];
    zone.fogStart = 10;
    zone.fogEnd = 100;

    var lightNode = scene.createChild("Directional Light");
    lightNode.direction = [0.6, -1.0, 0.8];
    var light = lightNode.createComponent("Light")
    light.lightType = Atomic.LIGHT_DIRECTIONAL;

    light.castShadows = true;

    // If we're running on android tweak the shadows
    if (Atomic.platform == "Android") {

        light.setShadowCascade(20.0, 50.0, 200.0, 0.0, 0.9);
        light.shadowIntensity = 0.33;
    } else {
        light.setShadowCascade(10.0, 50.0, 200.0, 0.0, 0.8);
    }

    light.setShadowBias(0.00025, 0.5);
    light.specularIntensity = 8;

    createPhysics();

    // add the roboman
    var roboman = node.createChild("TheRoboMan");
    roboman.createJSComponent("RoboMan");
    roboman.position = [0, 0, 0];

}

function postRenderUpdate() {

    world.drawDebugGeometry(debugRenderer, true);

}

// we need an update or it doesn't run the start, fix in JSVM
function update(timeStep) {

    if (drawDebug)
        self.listenToEvent(null, "PostRenderUpdate", postRenderUpdate);

}