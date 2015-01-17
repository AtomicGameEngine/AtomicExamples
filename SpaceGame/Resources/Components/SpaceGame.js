
var game = Atomic.game;
var scene = game.scene;

// expose ourselves as a global
SpaceGame = self;

self.halfWidth = game.graphics.width * Atomic.PIXEL_SIZE * 0.5;
self.halfHeight = game.graphics.height * Atomic.PIXEL_SIZE * 0.5;

self.spawnBullet = function(pos, isPlayer) {

    var bulletNode = scene.createChild("Bullet");
    bullet = bulletNode.createComponent("JSComponent");
    bullet.isPlayer = isPlayer;
    bullet.spawnPosition = pos;
    bullet.className = "Bullet";    
}

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