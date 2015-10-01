// designate component
"atomic component";
//import gl-matrix library
//https://github.com/toji/gl-matrix for more information
var glmatrix = require("gl-matrix");
var quat = glmatrix.quat;
var vec3 = glmatrix.vec3;

//define an inspectorFields to make variables visible in editor
var inspectorFields = {
  //needs default value to make editor understand type of that value
  speed: 1.0
}
//define a component AvatarController
exports.component = function(self) {
  //link to the current node
  var node = self.node;

  var cameraNode;

  var onGround = true;
  var okToJump = true;
  var inAirTime = 0;

  //define constans
  var MOVE_FORCE = 1.8;
  var INAIR_MOVE_FORCE = 0.02;
  var BRAKE_FORCE = 0.2;
  var JUMP_FORCE = 7.0;
  var YAW_SENSITIVITY = 0.1;
  var INAIR_THRESHOLD_TIME = 0.1;

  var cameraMode = 0;

  var yaw = 0;
  var pitch = 0;

  var moveForward = false;
  var moveBackwards = false;
  var moveLeft = false;
  var moveRight = false;
  var mouseMoveX = 0.0;
  var mouseMoveY = 0.0;
  var button0 = false;
  var button1 = false;

  var lastButton0 = false;
  var lastButton1 = false;

  self.idle = true;

  self.start = function() {
    //get main camera and set its node to cameraNode
    var camera = node.scene.getMainCamera();
    cameraNode = camera.node;

    // Create rigidbody, and set non-zero mass so that the body becomes dynamic
    var body = node.createComponent("RigidBody");
    body.mass = 1.0;

    // Set zero angular factor so that physics doesn't turn the character on its own.
    // Instead we will control the character yaw manually
    body.angularFactor = [0, 0, 0];

    // Set the rigidbody to signal collision also when in rest, so that we get ground collisions properly
    body.collisionEventMode = Atomic.COLLISION_ALWAYS;

    // Set a capsule shape for collision
    var shape = node.createComponent("CollisionShape");
    shape.setCapsule(2, 4, [0, 2, 0]);

  }

  self.fixedUpdate = function(timestep) {

    //get a RigidBody component from the current node
    var body = node.getComponent("RigidBody");

    // Update the in air timer. Reset if grounded
    if (!onGround)
    inAirTimer += timeStep;
    else
    inAirTimer = 0.0;

    // When character has been in air less than 1/10 second, it's still interpreted as being on ground
    var softGrounded = inAirTimer < INAIR_THRESHOLD_TIME;

    // Get rotation of the current node
    var rot = node.getRotation();

    var moveDir = [0, 0, 0];

    // Update movement & animation
    var velocity = body.getLinearVelocity();

    // Velocity on the XZ plane
    var planeVelocity = [velocity[0], 0.0, velocity[2]];

    if (cameraMode != 2) {
      if (moveForward) {
        vec3.add(moveDir, moveDir, [0, 0, 1])
      }
      if (moveBackwards) {
        vec3.add(moveDir, moveDir, [0, 0, -1])
      }
      if (moveLeft) {
        vec3.add(moveDir, moveDir, [-1, 0, 0])
      }
      if (moveRight) {
        vec3.add(moveDir, moveDir, [1, 0, 0])
      }
    }

    if (vec3.length(moveDir) > 0.0)
    vec3.normalize(moveDir, moveDir);

    vec3.transformQuat(moveDir, moveDir, [rot[1], rot[2], rot[3], rot[0]]);
    vec3.scale(moveDir, moveDir, (softGrounded ? MOVE_FORCE : INAIR_MOVE_FORCE));

    if (softGrounded)
      vec3.scale(moveDir, moveDir, self.speed);

    body.applyImpulse(moveDir);

    if (softGrounded) {

      // When on ground, apply a braking force to limit maximum ground velocity
      vec3.negate(planeVelocity, planeVelocity);
      vec3.scale(planeVelocity, planeVelocity, BRAKE_FORCE);
      body.applyImpulse(planeVelocity);

      // Jump. Must release jump control inbetween jumps
      if (button1) {
        if (okToJump) {
          var jumpforce = [0, 1, 0];
          vec3.scale(jumpforce, jumpforce, JUMP_FORCE);
          //Apply impulse to the body
          body.applyImpulse(jumpforce);
          okToJump = false;
        }
      } else {
        okToJump = true;
      }
    }


    if (softGrounded && vec3.length(moveDir) > 0.0)
      self.idle = false;
    else
      self.idle = true;


    // Reset grounded flag for next frame
    onGround = true;

  }

  function MoveCamera(timeStep) {

    // Movement speed as world units per second
    var MOVE_SPEED = 10.0;
    // Mouse sensitivity as degrees per pixel
    var MOUSE_SENSITIVITY = 0.1;

    yaw = yaw + MOUSE_SENSITIVITY * mouseMoveX;
    pitch = pitch + MOUSE_SENSITIVITY * mouseMoveY;

    if (pitch < -90)
      pitch = -90;

    if (pitch > 90)
      pitch = 90;

    // Construct new orientation for the camera scene node from yaw and pitch. Roll is fixed to zero
    cameraNode.rotation = QuatFromEuler(pitch, yaw, 0.0);

    var speed = MOVE_SPEED * timeStep;

    //translate camera on the amount of speed value
    if (moveForward)
      cameraNode.translate([0.0, 0.0, speed])
    if (moveBackwards)
      cameraNode.translate([0.0, 0.0, -speed])
    if (moveLeft)
      cameraNode.translate([-speed, 0.0, 0.0])
    if (moveRight)
      cameraNode.translate([speed, 0.0, 0.0])

  }

  function UpdateControls() {

    var input = Atomic.input;

    moveForward = false;
    moveBackwards = false;
    moveLeft = false;
    moveRight = false;
    mouseMoveX = 0.0;
    mouseMoveY = 0.0;
    button0 = false;
    button1 = false;

    // Movement speed as world units per second
    var MOVE_SPEED = 20.0;
    // Mouse sensitivity as degrees per pixel
    var MOUSE_SENSITIVITY = 0.1;

    //check input
    if (input.getKeyDown(Atomic.KEY_W) || input.getKeyDown(Atomic.KEY_UP))
        moveForward = true;
    if (input.getKeyDown(Atomic.KEY_S) || input.getKeyDown(Atomic.KEY_DOWN))
        moveBackwards = true;
    if (input.getKeyDown(Atomic.KEY_A) || input.getKeyDown(Atomic.KEY_LEFT))
        moveLeft = true;
    if (input.getKeyDown(Atomic.KEY_D) || input.getKeyDown(Atomic.KEY_RIGHT))
        moveRight = true;

    if (input.getKeyPress(Atomic.KEY_F))
        button0 = true;
    if (input.getKeyPress(Atomic.KEY_SPACE))
        button1 = true;

    //if we are on mobile
    if(Atomic.platform == "Android" || Atomic.platform == "iOS") {
      //iterate through each TouchState, if it doesn't touch any widgets, use it as a `mouse`
      for(var i = 0; i < Atomic.input.getNumTouches(); i++) {
        var touchState = Atomic.input.getTouch(i);
        if(touchState.touchedWidget == null) {
          var delta = touchState.delta;
          mouseMoveX = delta[0];
          mouseMoveY = delta[1];
        }
      }
    //if its a desktop
    } else {
      // update mouse coordinates
      mouseMoveX = input.getMouseMoveX();
      mouseMoveY = input.getMouseMoveY();
    }

  }

  self.update = function(timeStep) {

    UpdateControls();

    //if it's a free view
    if (cameraMode != 2) {
      yaw += mouseMoveX * YAW_SENSITIVITY;
      pitch += mouseMoveY * YAW_SENSITIVITY;
    }

    if (pitch < -80)
      pitch = -80;
    if (pitch > 80)
      pitch = 80;

    if (button0) {
      cameraMode++;
      if (cameraMode == 3)
        cameraMode = 0;
    }

  }

  //that function called right after update function
  self.postUpdate = function(timestep) {

    // Get camera lookat dir from character yaw + pitch
    var rot = node.getRotation();

    //create quaternion
    dir = quat.create();
    //set X value
    quat.setAxisAngle(dir, [1, 0, 0], (pitch * Math.PI / 180.0));

    quat.multiply(dir, [rot[1], rot[2], rot[3], rot[0]], dir);

    var headNode = node.getChild("Head_Tip", true);

    //if it's a FPS view
    if (cameraMode == 1) {

      var headPos = headNode.getWorldPosition();
      var offset = [0.0, 0.15, 0.2];
      vec3.add(headPos, headPos, vec3.transformQuat(offset, offset, [rot[1], rot[2], rot[3], rot[0]]));
      cameraNode.setPosition(headPos);
      cameraNode.setRotation([dir[3], dir[0], dir[1], dir[2]]);
      quat.setAxisAngle(dir, [0, 1, 0], (yaw * Math.PI / 180.0));
      node.setRotation([dir[3], dir[0], dir[1], dir[2]]);

    }
    //if it's a third person view
    if (cameraMode == 0) {

      var aimPoint = node.getWorldPosition();
      var aimOffset = [0, 1.7, 0];
      vec3.transformQuat(aimOffset, aimOffset, dir);
      vec3.add(aimPoint, aimPoint, aimOffset);

      var rayDir = vec3.create();
      vec3.transformQuat(rayDir, [0, 0, -1], dir);
      vec3.scale(rayDir, rayDir, 8);

      vec3.add(aimPoint, aimPoint, rayDir);

      cameraNode.setPosition(aimPoint);
      cameraNode.setRotation([dir[3], dir[0], dir[1], dir[2]]);
      quat.setAxisAngle(dir, [0, 1, 0], (yaw * Math.PI / 180.0));
      node.setRotation([dir[3], dir[0], dir[1], dir[2]]);

    }
    else{
      MoveCamera(timestep);
    }
  }
}

function QuatFromEuler(x, y, z) {
    var M_PI = 3.14159265358979323846264338327950288;
    var q = [0, 0, 0, 0];
    x *= (M_PI / 360);
    y *= (M_PI / 360);
    z *= (M_PI / 360);
    var sinX = Math.sin(x);
    var cosX = Math.cos(x);
    var sinY = Math.sin(y);
    var cosY = Math.cos(y);
    var sinZ = Math.sin(z);
    var cosZ = Math.cos(z);
    q[0] = cosY * cosX * cosZ + sinY * sinX * sinZ;
    q[1] = cosY * sinX * cosZ + sinY * cosX * sinZ;
    q[2] = sinY * cosX * cosZ - cosY * sinX * sinZ;
    q[3] = cosY * cosX * sinZ - sinY * sinX * cosZ;
    return q;
}
