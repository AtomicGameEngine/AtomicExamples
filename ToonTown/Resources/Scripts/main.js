
// This script is the main entry point of the game

require("AtomicGame");
Atomic.script("Utils.js");

Atomic.game.init(start, update);

// called at the start of play
function start() {

	var game = Atomic.game;

	// create a 2D scene
	game.createScene3D("Scenes/ToonTown.scene");
	
	// create the game component
	var node = game.scene.createChild("TheScene");
	node.createJSComponent("Scene");
	
    if (Atomic.platform == "iOS" || Atomic.platform == "Android")
    {        
	    node.createJSComponent("TouchInput");
	}
	else
	{
	    // bump the shadowmap size up so it is crisper
	    game.renderer.shadowMapSize = 2048;
	}
	

}

// called per frame
function update(timeStep) {
       

}
