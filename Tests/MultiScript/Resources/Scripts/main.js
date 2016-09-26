
// This script is the main entry point of the game

require("AtomicGame");

Atomic.game.init(start, update);

// called at the start of play
function start() {

	var game = Atomic.game;

	game.createScene3D("Scenes/TheScene.scene");

	game.cameraNode.position = [0, -.5, -8];

}

// called per frame
function update(timeStep) {


}
