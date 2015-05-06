var UI = require("UI/ui");

var game = Atomic.game;

// expose ourselves as a global, this is invalid in "use strict"; which perhaps we should be using
// to enforce better form
SpaceGame = self;

createScene();

self.halfWidth = game.graphics.width * Atomic.PIXEL_SIZE * 0.5;
self.halfHeight = game.graphics.height * Atomic.PIXEL_SIZE * 0.5;

var enemyBaseDir = false;
var enemyBaseNode = self.myscene.createChild("EnemyBaseNode");
var enemyBasePosX = 0;

var score = 0;

self.enemies = [];
self.gameOver = false;

self.random = function random(min, max) {
    return Math.random() * (max - min) + min;
}

self.spawnBullet = function(pos, isPlayer) {

    var bulletNode = self.myscene.createChild("Bullet");
    var bullet = bulletNode.createJSComponent("Bullet");
    bullet.init(isPlayer, pos);
}

self.removeEnemy = function(enemy) {

    score += 10;
    self.hud.updateScore(score);
    self.enemies.splice(self.enemies.indexOf(enemy), 1);

    Atomic.destroy(enemy.node);
}

self.capitalShipDestroyed = function() {

    score += 1000;

    self.hud.updateScore(score);

    Atomic.destroy(self.capitalShipNode);
    self.capitalShipNode = self.capitalShip = null;

}


function spawnEnemies() {

    self.capitalShipNode = self.myscene.createChild("CapitalShip");
    self.capitalShip = self.capitalShipNode.createJSComponent("CapitalShip");

    var pos = [0, 0];

    pos[1] = self.halfHeight - 2.5;

    for (var y = 0; y < 3; y++) {

        pos[0] = -4.5;

        for (var x = 0; x < 12; x++) {

            var enemyNode = enemyBaseNode.createChild("Enemy");
            // nasty, a lack of var was holding a global reference, hm
            var enemy = enemyNode.createJSComponent("Enemy");
            enemy.spriteName = Math.random() < .85 ? "spaceship_louse" : "spaceship_scarab";
            enemy.spawnPosition = [pos[0], pos[1]];
            self.enemies.push(enemy);

            pos[0] += 0.75;

        }

        pos[1] -= 0.75;

    }

}

function updateEnemies(timeStep) {

    if (!enemyBaseDir)
        enemyBasePosX += timeStep;
    else
        enemyBasePosX -= timeStep;

    var xvalue = 2;

    if (enemyBasePosX > xvalue) {
        enemyBasePosX = xvalue;
        enemyBaseDir = !enemyBaseDir;
    }

    if (enemyBasePosX < -xvalue) {
        enemyBasePosX = -xvalue;
        enemyBaseDir = !enemyBaseDir;
    }

    enemyBaseNode.position2D = [enemyBasePosX, 0];

}

self.cleanup = function() {

  game.renderer.setViewport(1, null);
  Atomic.destroy(self.myscene);

  // our node is in the main scene
  Atomic.destroy(self.node);

  SpaceGame = null;


}

self.win = function() {

    self.hud.updateGameText("YOU WIN!!!!");
    self.gameOver = true;
    UI.showGameOver();
    //self.cleanup();

}

self.lose = function() {

    self.hud.updateGameText("YOU LOSE!!!!");
    self.gameOver = true;
    UI.showGameOver();
    //self.cleanup();

}

function spawnPlayer() {

    self.playerNode = self.myscene.createChild("Player");
    self.player = self.playerNode.createJSComponent("Player");
}

function createScene() {

  var scene = new Atomic.Scene();
  scene.createComponent("Octree");

  var cameraNode = scene.createChild("Camera");
  cameraNode.position = [0.0, 0.0, -10.0];

  var camera = cameraNode.createComponent("Camera");
  camera.orthographic = true;
  camera.orthoSize = game.graphics.height * Atomic.PIXEL_SIZE;

  var viewport = new Atomic.Viewport(scene, camera);

  // assign a render path to our viewport which doesn't clear the screen
  // so can be used to composite
  var renderPathXML = game.cache.getResource("XMLFile", "Data/RenderPath.xml");
  viewport.renderPath = renderPathXML;

  // Example of appending a post process filter
  //viewport.renderPath.append(game.cache.getResource("XMLFile", "PostProcess/GreyScale.xml"));

  game.renderer.setViewport(1, viewport);

  // this is component getScene property (there is no setter on it)
  // this should be an error, think I saw somewhere you can raise errors on
  // get/set of a prop when the get/set missing
  self.myscene = scene;
  self.cameraNode = cameraNode;
  self.camera = camera;
  self.viewport = viewport;

}


function start() {

    var hudnode = self.myscene.createChild();
    self.hud = hudnode.createJSComponent("HUD");

    spawnPlayer();
    spawnEnemies();

}


function update(timeStep) {

    updateEnemies(timeStep);


}
