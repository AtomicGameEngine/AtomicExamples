

// This script is the main entry point of the game

require("AtomicGame");

Atomic.script("LevelParser");

Atomic.game.init(start, update);

// called at the start of play
function start() {

	var game = Atomic.game;
	
	game.input.setMouseVisible(true);

	// create a 2D scene
	game.createScene2D();
	
	var uiNode = game.scene.createChild("UI");
	uiNode.createJSComponent("UI");
		
}

// called per frame
function update(timeStep) {


}




