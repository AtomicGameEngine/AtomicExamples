//requiring gl-matrix module
var glmatrix = require("gl-matrix");
var vec2 = glmatrix.vec2;

"atomic component";

// A moving platform
var component = function (self) {

var node = self.node;

var MAX_VELOCITY = 2;

var movingToStop = true;

//Get RigidBody2D component
var body = self.getComponent("RigidBody2D");
//update function called each frame
self.update = function(timeStep) {
    //get node position
    var pos = node.position2D;
    var dir = vec2.create();
    var dist = 0.0;

    if (movingToStop) {

        dist = vec2.distance(pos, node.stopPos);

        vec2.subtract(dir, node.stopPos, pos);
        vec2.normalize(dir, dir);

        if (dist < 0.5) {
            movingToStop = false;
            return;
        }

    } else {

        dist = vec2.distance(pos, node.startPos);
        vec2.subtract(dir, node.startPos, pos);
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
    //set velocity of our body(node) to the dir value
    body.setLinearVelocity(dir);

}
}

exports.component = component;
