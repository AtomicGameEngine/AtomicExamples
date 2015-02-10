
// This script is the main entry point of the game
require("AtomicGame");

Atomic.game.init(start, update);


// called at the start of play
function start() {

	var game = Atomic.game;

	// create a 2D scene
	game.createScene2D();

    var ui = game.scene.createChild("UI");
    ui.createJSComponent("UI");
    
    var node = game.scene.createChild("ParticleSystem");
    ParticleSystem = node.createJSComponent("ParticleSystem");

}

// called per frame
function update(timeStep) {


}
