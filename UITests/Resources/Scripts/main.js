// This script is the main entry point of the game

require("AtomicGame");

Atomic.script("utils.js");

Atomic.game.init(start, update);

// called at the start of play
function start() {

    var game = Atomic.game;

    // create a 2D scene
    game.createScene2D();

    TheView = new Atomic.UIView();

    var uiNode = game.scene.createChild("UI");

    uiNode.createJSComponent("TestButtons");

}

// called per frame
function update(timeStep) {


}
