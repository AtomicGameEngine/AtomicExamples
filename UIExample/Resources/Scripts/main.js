// This script is the main entry point of the game

var game = Atomic.game;

// called at the start of play
function Start() {

    var game = Atomic.game;

    // create a 2D scene
    game.createScene2D();
    
    var uiNode = game.scene.createChild("UI");
    uiNode.createJSComponent("UI");

}

// called per frame
function Update(timeStep) {


}