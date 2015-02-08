
// This script is the main entry point of the game

require("AtomicGame");

Atomic.game.init(start, update);

// called at the start of play
function start() {

	var game = Atomic.game;

	// create a 2D scene
	game.createScene2D();

	// create the game component
	var node = game.scene.createChild("SpaceGame");
	node.createJSComponent("SpaceGame");
	
}

// called per frame
function update(timeStep) {


}
