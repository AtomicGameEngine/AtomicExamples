
// This script is the main entry point of the game

require("AtomicGame");

Atomic.game.init(start, update);


// called at the start of play
function start() {

	var game = Atomic.game;

	// create a 2D scene
	game.createScene3D();

	var scene = game.scene;

	// zone
	var zoneNode = scene.createChild("Zone")
    var zone = zoneNode.createComponent("Zone");
    zone.boundingBox = [-1000, -1000, -1000, 1000, 1000 , 1000];
    zone.ambientColor = [0.35, 0.35, 0.35];
    zone.fogColor = [0.1, 0.1, 0.1, 1.0];
    zone.fogStart = 10;
    zone.fogEnd = 100;

    game.cameraNode.position = [0, 2.5, -6];
    game.cameraNode.pitch(20);

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
    

	// create the game component
	var node = game.scene.createChild("Roboman");
	TheRoboman = node.createJSComponent("Roboman");
	
	var ui = game.scene.createChild("UI");
	ui.createJSComponent("UI");

}

// called per frame
function update(timeStep) {


}
