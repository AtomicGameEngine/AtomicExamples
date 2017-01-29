"atomic component";
//requiring gl-matrix module
var glmatrix = require("gl-matrix");
var vec2 = glmatrix.vec2;

//settings some fields to make them visible from editor
//the first parameter is a type, the second is a default value
var inspectorFields = {

  pickupSound: ["Sound", "Sounds/Pickup_Coin8.ogg"],
  bounceSound: ["Sound"]

};

//A Coin
var component = function(self) {

  var node = self.node;
  //getting main camera from our current scene
  var camera = self.node.scene.getMainCamera();
  var cameraNode = camera.node;

  // Resources
  //getting AnimatedSprite2D component
  var sprite = node.getComponent("AnimatedSprite2D");
  sprite.setAnimation("idle");
  //getting SoundSource component
  var soundSource = node.getComponent("SoundSource");

  var activated = false;
  var body;

  self.start = function() {
    //get current dayTime by requiring GlobalVariables object
    var dayTime = require("GlobalVariables").dayTime;
    if(!dayTime) {
      //ok, it's a night, then create a light
      var light = node.createComponent("PointLight2D");
      light.color = [1, 1, .56, .6];
      light.radius = .85;

      node.createJSComponent("Components/LightFlicker.js");
    }
  };

  self.update = function(timeStep) {

    if (activated)
      return false;

    if (vec2.distance(cameraNode.position2D, node.position2D) < 3.0) {
      activated = true;
      //setting rigid body
      body = node.createComponent("RigidBody2D");
      //our body is Dynamic
      body.setBodyType(Atomic.BodyType2D.BT_DYNAMIC);
      //fix rotation
      body.fixedRotation = true;
      //don't make our body to cast shadows
      body.castShadows = false;

      //subscribing to PhysicsBeginContact2D event, and specifying a callback
      self.subscribeToEvent(Atomic.PhysicsBeginContact2DEvent(function(ev) {
        //checking if nodeB is our current node
        if (ev.nodeB == node) {
          //checking if nodeA(another node) is a Player
          if (ev.nodeA && ev.nodeA.name == "Player") {
            //picking up a coin
            if (self.pickupSound) {
              soundSource.gain = 1.0;
              //playing pickupSound
              soundSource.play(self.pickupSound);
              //ok, remove itself from the parent node
              node.remove();
            }
          //if it's not a player, and we have bounceSound, then play it
          } else if (self.bounceSound) {

            var vel = body.linearVelocity;
            if (vec2.length(vel) > 3) {
              soundSource.gain = .3;
              soundSource.play(self.bounceSound);
            }
          }
        }
      }));

      //adding circle colision shape
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

  };

};

exports.component = component;
