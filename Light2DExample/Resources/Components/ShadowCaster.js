'atomic component';

var halfWidth = Atomic.graphics.width * Atomic.PIXEL_SIZE * 0.5;
var halfHeight = Atomic.graphics.height * Atomic.PIXEL_SIZE * 0.5;

exports.component = function(self) {

    var node = self.node;

    var body = node.createComponent("RigidBody2D");
    body.bodyType = Atomic.BT_STATIC;
    body.castShadows = true;

    var circle = node.createComponent("CollisionCircle2D");
    circle.radius = .35;

    var sprite2D = Atomic.cache.getResource("Sprite2D", "Sprites/ball" + (Math.round(Math.random() * 7) + 1) + ".png");
    var sprite = node.createComponent("StaticSprite2D");
    sprite.setSprite(sprite2D);

    var x = -halfWidth + (halfWidth * 2) * Math.random();
    var y = -halfHeight + (halfHeight * 2) * Math.random();

    // tolerance towards the middle of screen
    x *= .7;
    y *= .7;

    node.position2D = [x, y];


}

/*
var game = Atomic.game;
var node = self.node;

var body = node.createComponent("RigidBody2D");
body.bodyType = Atomic.BT_STATIC;
body.castShadows = true;

var circle = node.createComponent("CollisionCircle2D");
circle.radius = .35;


function start() {


}

function update(timeStep) {


}
*/