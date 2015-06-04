// This script is the main entry point of the game

require("AtomicGame");

// bring in our native plugin
var NativePlugin = require("MyNativePlugin");

Atomic.game.init(start, update);

// called at the start of play
function start() {

	// call our native method
	var answer = NativePlugin.getAnswer();
	print("The answer is: ", answer, " which is " , NativePlugin.checkAnswer(answer) ? "correct" : "incorrect"); 
	var game = Atomic.game;

	// create a 2D scene
	game.createScene2D();

    var spaceNode = game.scene.createChild("Star");
    spaceNode.createJSComponent("Star");

}

// called per frame
function update(timeStep) {


}
