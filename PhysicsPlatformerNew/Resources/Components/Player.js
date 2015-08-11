
"atomic component";

var inspectorFields = {

  jumpSound: ["Sound"]

}


module.exports = function(self) {

  var node = self.node;
  var camera = self.node.scene.getMainCamera();
  var cameraNode = camera.node;
  var input = Atomic.input;
  var soundSource = node.getComponent("SoundSource");

  var MAX_VELOCITY = 3;
  var anim = "";
  var flipped = false;
  var contactCount = 0;
  var jumpDelta = 0;
  var control = false;

  var lastAnimDelta = 0;

  var spawnPosition = node.position2D;

  var sprite;
  var animationSet;
  var jumpSound;

  // physics
  var body;
  var circle;

  self.start = function() {

    sprite = node.getComponent("AnimatedSprite2D");
    body = node.getComponent("RigidBody2D");
    circle = node.getComponent("CollisionCircle2D");

    setAnimation("Idle");

    self.subscribeToEvent("PhysicsBeginContact2D", function(event) {
      if (event.bodyB == body)
        contactCount++;
    });

    self.subscribeToEvent("PhysicsEndContact2D", function(event) {
      if (event.bodyB == body)
        contactCount--;
    });

  }

  self.update = function(timeStep) {

    handleInput(timeStep);
    handleAnimation(timeStep);

    if (node.position[1] < 14) {
        //TODO: FIX, I have to set scale to 0 and the back to 1 to force
        // setposition catching dirty
        node.scale2D = [0, 0];
        node.position2D = spawnPosition;
        node.scale2D = [1, 1];

    }

  }

  self.postUpdate = function() {

    cameraNode.position = node.position;
  }

  function setAnimation(animName) {

      if (anim == animName || lastAnimDelta > 0)
          return;

      lastAnimDelta = .25;

      sprite.setAnimation(animName);
      anim = animName;

  }

  function handleAnimation(timeStep) {

      lastAnimDelta -= timeStep;

      var vel = body.linearVelocity;

      if (contactCount) {

          if (vel[0] < -0 && control) {
              if (!flipped) {
                  sprite.flipX = true;
                  flipped = true;

              }
              setAnimation("Run");
          } else if (vel[0] > 0 && control) {

              if (flipped) {
                  sprite.flipX = false;
                  flipped = false;

              }
              setAnimation("Run");
          } else {

              setAnimation("Idle");
          }
      } else {

          if (vel[1] > 1.0) {
              setAnimation("Jump");
          } else if (vel[1] < -1.0) {
              setAnimation("Land");
          }

      }

  }

  function handleInput(timeStep) {

      var vel = body.linearVelocity;
      var pos = node.position2D;

      jumpDelta -= timeStep;

      if (Math.abs(vel[0]) > MAX_VELOCITY) {
          vel[0] = (vel[0] ? vel[0] < 0 ? -1 : 1 : 0) * MAX_VELOCITY;
          body.setLinearVelocity(vel);
      }

      var left = input.getKeyDown(Atomic.KEY_LEFT) || input.getKeyDown(Atomic.KEY_A);
      var right = input.getKeyDown(Atomic.KEY_RIGHT) || input.getKeyDown(Atomic.KEY_D);

      var jump = input.getKeyDown(Atomic.KEY_UP) || input.getKeyDown(Atomic.KEY_SPACE) || input.getKeyDown(Atomic.KEY_W);

      control = false;

      if (left || right)
          control = true;

      if (left && vel[0] > -MAX_VELOCITY) {
          body.applyLinearImpulse([-2, 0], pos, true);
      } else if (right && vel[0] < MAX_VELOCITY) {
          body.applyLinearImpulse([2, 0], pos, true);
      }

      if (!left && !right) {
          vel[0] *= 0.9;
          body.linearVelocity = vel;
          circle.friction = 1000.0;
      } else {
          circle.friction = .2;
      }

      if (!contactCount)
          circle.friction = 0.0;

      if (jump && jumpDelta <= 0 && contactCount) {

          jumpDelta = .25;
          if (self.jumpSound) {          
              soundSource.gain = 0.45;
              soundSource.play(self.jumpSound);          
          }

          vel[1] = 0;
          body.linearVelocity = vel;
          body.applyLinearImpulse([0, 6], pos, true);
      }

  }

}
