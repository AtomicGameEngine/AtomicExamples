
var game = Atomic.game;
var node = self.node;


function start() {

	var scene = game.scene;
	var cache = game.cache;

	// zone
	var zoneNode = scene.createChild("Zone")
    var zone = zoneNode.createComponent("Zone");
    zone.boundingBox = [-1000, -1000, -1000, 1000, 1000 , 1000];
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

    // create the grid plane
    var planeNode = scene.createChild("Plane");
    planeNode.scale = [100.0, 1.0, 100.0];
    var planeObject = planeNode.createComponent("StaticModel");

    var model = cache.getResource("Model", "Models/Plane.mdl");
    var material = cache.getResource("Material", "Materials/BlueGrid.xml");

    planeObject.model  = model;
    planeObject.material = material;

    

    // add the roboman
    var roboman = node.createChild("TheRoboMan");
    roboman.createJSComponent("RoboMan");


}

// we need an update or it doesn't run the start, fix in JSVM
function update(timeStep) {

}