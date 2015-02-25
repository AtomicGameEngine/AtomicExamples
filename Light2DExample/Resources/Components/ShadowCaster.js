var game = Atomic.game;
var node = self.node;

var body = node.createComponent("RigidBody2D");
body.bodyType = Atomic.BT_STATIC;
body.castShadows = true;

var circle = node.createComponent("CollisionCircle2D");
circle.radius = .35;

var sprite2D = game.cache.getResource("Sprite2D", "Sprites/ball" + (Math.round(Math.random() * 7) + 1) + ".png");
var sprite = node.createComponent("StaticSprite2D");
sprite.setSprite(sprite2D);

var x = -Light2DExample.halfWidth + (Light2DExample.halfWidth * 2) * Math.random();
var y = -Light2DExample.halfHeight + (Light2DExample.halfHeight * 2) * Math.random();

// tolerance towards the middle of screen
x *= .7;
y *= .7;

node.position2D = [x, y];

function start() {


}

function update(timeStep) {


}