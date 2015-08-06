"atomic component";

var glmatrix = require("gl-matrix");
var vec2 = glmatrix.vec2;

var component = function (self) {

var node = self.node;
var camera = self.node.scene.getMainCamera();
var cameraNode = camera.node;

// Resources

var sprite = node.getComponent("AnimatedSprite2D")
sprite.setAnimation("idle");


//sprite.setLayer(100);

var activated = false;
var body;

function onPlayerHit() {

    node.scale2D = [0, 0];
    sprite.enabled = false;
    body.enabled = false;

}


self.start = function() {

}

self.update =  function(timeStep) {

    if (activated)
        return false;

    if (vec2.distance(cameraNode.position2D, node.position2D) < 3.0) {

        activated = true;

        body = node.createComponent("RigidBody2D");
        body.setBodyType(Atomic.BT_DYNAMIC);
        body.fixedRotation = true;
        body.castShadows = false;

        var circle = node.createComponent("CollisionCircle2D");

        // Set radius
        circle.setRadius(.3);
        // Set density
        circle.setDensity(1.0);
        // Set friction.
        circle.friction = .2;
        // Set restitution
        circle.setRestitution(.8);


    }

}

}

module.exports = component;
