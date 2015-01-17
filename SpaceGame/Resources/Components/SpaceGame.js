

var game = Atomic.game;
var scene = game.scene;

function spawnSpace() {

    var spaceNode = scene.createChild("Space");
    spaceNode.createJSComponent("Space");
}    

function spawnPlayer() {

    self.playerNode = scene.createChild("Player");
    self.player = self.playerNode.createJSComponent("Player");
}    


function start() {

	spawnSpace();
	spawnPlayer();
}


function update(timeStep) {


}