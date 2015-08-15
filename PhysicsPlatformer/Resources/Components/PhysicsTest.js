
"atomic component";

var component = function (self) {

    var node = self.node;
    var body = node.createComponent("RigidBody2D");
    body.setBodyType(Atomic.BT_DYNAMIC);
    body.fixedRotation = true;
    body.bullet = true;
    body.castShadows = false;

    var circle = node.createComponent("CollisionCircle2D");
    // Set radius
    circle.setRadius(.5);
    // Set density
    circle.setDensity(1.0);
    // Set friction.
    circle.friction = .2;
    // Set restitution
    circle.setRestitution(0.1);



  self.start = function() {

  }

  self.update = function(timeStep) {

  }

}

exports.component = component;
