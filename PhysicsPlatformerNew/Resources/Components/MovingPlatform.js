// A moving platform

var game = Atomic.game;
var glmatrix = require("gl-matrix");
var vec2 = glmatrix.vec2;
var node = self.node;

var MAX_VELOCITY = 2;

var movingToStop = true;

var body;

self.init = function(start, stop) {

    print(start);
    self.startPos = start;
    self.stopPos = stop;

}

function start() {

    var sprite2D = node.createComponent("StaticSprite2D");
    sprite2D.sprite = game.cache.getResource("Sprite2D", "Sprites/platform.png");

    // start at the start positon
    node.position2D = self.startPos;

    body = node.createComponent("RigidBody2D");
    body.setBodyType(Atomic.BT_KINEMATIC);
    body.fixedRotation = true;

    // Create box
    var box = node.createComponent("CollisionBox2D");
    // Set size
    box.setSize([2.5, .55]);
    // Set density
    box.setDensity(1.0);
    // Set friction
    box.setFriction(1.0);
    // Set restitution
    box.setRestitution(0.1);


}

function update(timeStep) {

    var pos = node.position2D;
    var dir = vec2.create();
    var dist = 0.0;

    if (movingToStop) {

        dist = vec2.distance(pos, self.stopPos);

        vec2.subtract(dir, self.stopPos, pos);
        vec2.normalize(dir, dir);

        if (dist < 0.5) {
            movingToStop = false;
            return;
        }

    } else {

        dist = vec2.distance(pos, self.startPos);
        vec2.subtract(dir, self.startPos, pos);
        vec2.normalize(dir, dir);

        if (dist < 0.5) {
            movingToStop = true;
            return;
        }

    }

    vec2.scale(dir, dir, dist);

    if (vec2.length(dir) > MAX_VELOCITY) {
        vec2.normalize(dir, dir);
        vec2.scale(dir, dir, MAX_VELOCITY);
    }

    body.setLinearVelocity(dir);

}