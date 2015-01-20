
var game = Atomic.game;
var node = self.node;


function start() {

	var scene = game.scene;

    var lightNode = scene.createChild("Directional Light");
    lightNode.direction = [0.6, -1.0, 0.8];
    var light = lightNode.createComponent("Light")
    light.lightType = Atomic.LIGHT_DIRECTIONAL;

    // add the roboman
    var roboman = node.createChild("TheRoboMan");
    roboman.createJSComponent("RoboMan");


}

// we need an update or it doesn't run the start, fix in JSVM
function update(timeStep) {

}