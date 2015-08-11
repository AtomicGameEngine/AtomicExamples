"atomic component";

var inspectorFields = {

  // resource ref
  pickupSound: ["Sound", "Sounds/Pickup_Coin8.ogg"],
  bounceSound: ["Sound"]

}

var glmatrix = require("gl-matrix");
var vec2 = glmatrix.vec2;

var component = function(self) {

  var node = self.node;
  var camera = self.node.scene.getMainCamera();
  var cameraNode = camera.node;

  // Resources

  var sprite = node.getComponent("AnimatedSprite2D")
  sprite.setAnimation("idle");

  var soundSource = node.getComponent("SoundSource");

  var activated = false;
  var body;

  self.start = function() {

  }

  self.update = function(timeStep) {

    if (activated)
      return false;

    if (vec2.distance(cameraNode.position2D, node.position2D) < 3.0) {

      activated = true;

      body = node.createComponent("RigidBody2D");
      body.setBodyType(Atomic.BT_DYNAMIC);
      body.fixedRotation = true;
      body.castShadows = false;

      self.subscribeToEvent("PhysicsBeginContact2D", function(ev) {

        if (ev.nodeB == node) {

          if (ev.nodeA && ev.nodeA.name == "Player") {

            node.scale2D = [0, 0];
            sprite.enabled = false;
            body.enabled = false;
            if (self.pickupSound) {
              soundSource.gain = 1.0;
              soundSource.play(self.pickupSound);
            }

          } else if (self.bounceSound) {

            var vel = body.linearVelocity;
            if (vec2.length(vel) > 3) {
              soundSource.gain = .3;
              soundSource.play(self.bounceSound);
            }
          }
        }
      });

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
