
// This script is the main entry point of the game

Light2DExample = {};

// called at the start of play
function Start() {

	var game = Atomic.game;
	
	Light2DExample.halfWidth = game.graphics.width * Atomic.PIXEL_SIZE * 0.5;
    Light2DExample.halfHeight = game.graphics.height * Atomic.PIXEL_SIZE * 0.5;

	// create a 2D scene
	game.createScene2D();
		
	var scene = game.scene;
	
    var physicsWorld = scene.createComponent("PhysicsWorld2D");        
    physicsWorld.continuousPhysics = false;
    physicsWorld.subStepping = false;
    
    var lightGroupNode = scene.createChild("LightGroup");
    
    var lightGroup = lightGroupNode.createComponent("Light2DGroup");
    lightGroup.setPhysicsWorld(physicsWorld);
    lightGroup.ambientColor = [.8, .8, .8, .5];
    
    Light2DExample.lightGroup = lightGroup;
    
	var node = game.scene.createChild();
	node.createJSComponent("Background");
	node.createJSComponent("Physics");
	
	for (var i = 0; i < 4; i++) {
	
	    var lightNode = scene.createChild("LightNode");
        lightNode.createJSComponent("Light");

	}
	
	for (var i = 0; i < 16; i++) {
	
	    var shadowCasterNode = scene.createChild("ShadowCaster");
        shadowCasterNode.createJSComponent("ShadowCaster");

	}
	

}

// called per frame
function Update(timeStep) {

    physicsWorld.drawDebugGeometry();

}
