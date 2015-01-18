
var game = Atomic.game;
var scene = game.scene;

// expose ourselves as a global
SpaceGame = self;

self.halfWidth = game.graphics.width * Atomic.PIXEL_SIZE * 0.5;
self.halfHeight = game.graphics.height * Atomic.PIXEL_SIZE * 0.5;

var enemyBaseDir = false;
var enemyBaseNode = scene.createChild("EnemyBaseNode");
var enemyBasePosX = 0;
self.enemies = [];

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

function spawnEnemies()
{
    var pos = [0, 0];

    pos[1] = self.halfHeight - 2.5;

    for (var y = 0; y < 3; y++) {

        pos[0] = -4.5;

        for (var x = 0; x < 12; x++) {

            var enemyNode = enemyBaseNode.createChild("Enemy");
            enemy = enemyNode.createComponent("JSComponent");
            enemy.spriteName = Math.random() < .85 ? "spaceship_louse" : "spaceship_scarab";
            enemy.spawnPosition = [pos[0], pos[1]];
            enemy.className = "Enemy"; 
            self.enemies.push(enemy);

            pos[0] += 0.75;

        }

        pos[1] -= 0.75;

    }

}


function spawnPlayer() {

    self.playerNode = scene.createChild("Player");
    self.player = self.playerNode.createJSComponent("Player");
}    


function start() {

	spawnSpace();
	spawnPlayer();
	spawnEnemies();
}


function update(timeStep) {


}