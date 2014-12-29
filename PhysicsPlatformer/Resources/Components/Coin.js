// FIXME
keepAlive = typeof(keepAlive) == "undefined" ? [] : keepAlive;
keepAlive.push(self);


var glmatrix = require("gl-matrix");
var vec2 = glmatrix.vec2;

var node = self.node;

var animationSet = cache.getResource("AnimationSet2D", "Sprites/GoldIcon.scml");

var sprite = node.createComponent("AnimatedSprite2D");
sprite.setAnimation(animationSet, "idle");
sprite.setLayer(100);

var activated = false;

var body;

self.onPlayerHit = function() {
    
    // sprite enabled is not removing the sprite
    node.scale2D = [0, 0];
    sprite.enabled = false;
    body.enabled = false;

}

function update(timeStep) {

    if (activated)
        return false;

    if (vec2.distance(cameraNode.position2D, node.position2D) < 3.0) {
        activated = true;

        body = node.createComponent("RigidBody2D");
        body.setBodyType(Atomic.BT_DYNAMIC);
        body.fixedRotation = true;

        var circle = node.createComponent("CollisionCircle2D");
        // Set radius
        circle.setRadius(.3);
        // Set density
        circle.setDensity(1.0);
        // Set friction.
        circle.friction = .2;
        // Set restitution
        circle.setRestitution(1.1);


    }

}