var game = Atomic.game;
var node = self.node;
var scene = game.scene;

self.allowShoot = true;
self.shootDelta = 0;

self.health = 10;

self.onHit = function(pos) {


    var expNode = game.scene.createChild("Explosion");
    var exp = expNode.createJSComponent("Explosion");
    exp.init(pos);

    var expNode = game.scene.createChild("Explosion");
    exp = expNode.createComponent("JSComponent");
    exp.spawnPosition = pos;
    exp.node.scale2D = [2.0, 2.0];

    self.health--;
    if (!self.health) {
        die();
        SpaceGame.win();
    }

}

function die() {

    SpaceGame.capitalShipDestroyed();

    for (var i = 0; i < 16; i++) {
        var pos = node.position2D;
        pos[0] += SpaceGame.random(-2, 2);
        pos[1] += SpaceGame.random(-2, 2);

        var expNode = scene.createChild("Explosion");
        var exp = expNode.createJSComponent("Explosion");
        exp.init(pos);

        var randomSize = SpaceGame.random(4, 8);
        exp.node.scale2D = [randomSize, randomSize];
    }


}


// using start to initialize the script component
function start() {

    // install AI
    var ai = node.createJSComponent("AI");
    ai.canMove = true;



    var spaceSheet = game.getSpriteSheet("Sprites/spacegame_sheet.xml");

    // add a sprite component to our node
    var sprite2D = node.createComponent("StaticSprite2D");
    sprite2D.blendMode = Atomic.BLEND_ALPHA;
    sprite2D.sprite = spaceSheet.getSprite("spaceship_locust");

    node.position2D = [-4, SpaceGame.halfHeight - 1];
    node.roll(180);

}

// update function called per frame with delta time
function update(timeStep) {


}
