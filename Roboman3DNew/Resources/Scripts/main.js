
// This script is the main entry point of the game

require("AtomicGame");

Atomic.game.init(start, update);

// called at the start of play
function start() {

	var game = Atomic.game;

	// create a 2D scene
	game.createScene3D("Scenes/Test.scene");

	game.camera.position = [0, 0, -10];

  game.renderer.shadowMapSize = 2048;

	game.input.setMouseVisible(false);


}

// called per frame
function update(timeStep) {


}
