// designate component
"atomic component";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//import gl-matrix library
//https://github.com/toji/gl-matrix for more information
var gl_matrix_1 = require("gl-matrix");
//define constans
var MOVE_FORCE = 1.8;
var INAIR_MOVE_FORCE = 0.02;
var BRAKE_FORCE = 0.2;
var JUMP_FORCE = 7.0;
var YAW_SENSITIVITY = 0.1;
var INAIR_THRESHOLD_TIME = 0.1;
//define a component AvatarController
var AvatarController = (function (_super) {
    __extends(AvatarController, _super);
    function AvatarController() {
        var _this = _super.apply(this, arguments) || this;
        //define an inspectorFields to make variables visible in editor
        _this.inspectorFields = {
            //needs default value to make editor understand type of that value
            speed: 1.0
        };
        _this.speed = 1.0;
        _this.onGround = true;
        _this.okToJump = true;
        _this.inAirTime = 0.0;
        _this.softGrounded = true;
        _this.cameraMode = 0;
        _this.yaw = 0;
        _this.pitch = 0;
        _this.moveForward = false;
        _this.moveBackwards = false;
        _this.moveLeft = false;
        _this.moveRight = false;
        _this.mouseMoveX = 0.0;
        _this.mouseMoveY = 0.0;
        _this.button0 = false;
        _this.button1 = false;
        _this.lastButton0 = false;
        _this.lastButton1 = false;
        _this.idle = true;
        return _this;
    }
    AvatarController.prototype.start = function () {
        //get main camera and set its node to cameraNode
        var camera = this.node.scene.getMainCamera();
        this.cameraNode = camera.node;
        // Create rigidbody, and set non-zero mass so that the body becomes dynamic
        var body = this.node.createComponent("RigidBody");
        body.mass = 1.0;
        // Set zero angular factor so that physics doesn't turn the character on its own.
        // Instead we will control the character yaw manually
        body.angularFactor = [0, 0, 0];
        // Set the rigidbody to signal collision also when in rest, so that we get ground collisions properly
        body.collisionEventMode = Atomic.CollisionEventMode.COLLISION_ALWAYS;
        // Set a capsule shape for collision
        var shape = this.node.createComponent("CollisionShape");
        shape.setCapsule(2, 4, [0, 2, 0]);
    };
    AvatarController.prototype.fixedUpdate = function (timeStep) {
        //get a RigidBody component from the current node
        var body = this.node.getComponent("RigidBody");
        // Update the in air timer. Reset if grounded
        if (!this.onGround) {
            this.inAirTime += timeStep;
        }
        else {
            this.inAirTime = 0.0;
        }
        // When character has been in air less than 1/10 second, it's still interpreted as being on ground
        var softGrounded = this.inAirTime < INAIR_THRESHOLD_TIME;
        // Get rotation of the current node
        var rot = this.node.getRotation();
        var moveDir = [0, 0, 0];
        // Update movement & animation
        var velocity = body.getLinearVelocity();
        // Velocity on the XZ plane
        var planeVelocity = [velocity[0], 0.0, velocity[2]];
        if (this.cameraMode != 2) {
            if (this.moveForward) {
                gl_matrix_1.vec3.add(moveDir, moveDir, [0, 0, 1]);
            }
            if (this.moveBackwards) {
                gl_matrix_1.vec3.add(moveDir, moveDir, [0, 0, -1]);
            }
            if (this.moveLeft) {
                gl_matrix_1.vec3.add(moveDir, moveDir, [-1, 0, 0]);
            }
            if (this.moveRight) {
                gl_matrix_1.vec3.add(moveDir, moveDir, [1, 0, 0]);
            }
        }
        if (gl_matrix_1.vec3.length(moveDir) > 0.0) {
            gl_matrix_1.vec3.normalize(moveDir, moveDir);
        }
        gl_matrix_1.vec3.transformQuat(moveDir, moveDir, [rot[1], rot[2], rot[3], rot[0]]);
        gl_matrix_1.vec3.scale(moveDir, moveDir, (softGrounded ? MOVE_FORCE : INAIR_MOVE_FORCE));
        if (this.softGrounded) {
            gl_matrix_1.vec3.scale(moveDir, moveDir, this.speed);
        }
        body.applyImpulse(moveDir);
        if (this.softGrounded) {
            // When on ground, apply a braking force to limit maximum ground velocity
            gl_matrix_1.vec3.negate(planeVelocity, planeVelocity);
            gl_matrix_1.vec3.scale(planeVelocity, planeVelocity, BRAKE_FORCE);
            body.applyImpulse(planeVelocity);
            // Jump. Must release jump control inbetween jumps
            if (this.button1) {
                if (this.okToJump) {
                    var jumpforce = [0, 1, 0];
                    gl_matrix_1.vec3.scale(jumpforce, jumpforce, JUMP_FORCE);
                    //Apply impulse to the body
                    body.applyImpulse(jumpforce);
                    this.okToJump = false;
                }
            }
            else {
                this.okToJump = true;
            }
        }
        if (this.softGrounded && gl_matrix_1.vec3.length(moveDir) > 0.0) {
            this.idle = false;
        }
        else {
            this.idle = true;
        }
        // Reset grounded flag for next frame
        this.onGround = true;
    };
    AvatarController.prototype.MoveCamera = function (timeStep) {
        // Movement speed as world units per second
        var MOVE_SPEED = 10.0;
        // Mouse sensitivity as degrees per pixel
        var MOUSE_SENSITIVITY = 0.1;
        this.yaw = this.yaw + MOUSE_SENSITIVITY * this.mouseMoveX;
        this.pitch = this.pitch + MOUSE_SENSITIVITY * this.mouseMoveY;
        if (this.pitch < -90) {
            this.pitch = -90;
        }
        if (this.pitch > 90) {
            this.pitch = 90;
        }
        // Construct new orientation for the camera scene node from yaw and pitch. Roll is fixed to zero
        this.cameraNode.rotation = QuatFromEuler(this.pitch, this.yaw, 0.0);
        var speed = MOVE_SPEED * timeStep;
        //translate camera on the amount of speed value
        if (this.moveForward) {
            this.cameraNode.translate([0.0, 0.0, this.speed]);
        }
        if (this.moveBackwards) {
            this.cameraNode.translate([0.0, 0.0, -this.speed]);
        }
        if (this.moveLeft) {
            this.cameraNode.translate([-speed, 0.0, 0.0]);
        }
        if (this.moveRight) {
            this.cameraNode.translate([speed, 0.0, 0.0]);
        }
    };
    AvatarController.prototype.UpdateControls = function () {
        var input = Atomic.input;
        this.moveForward = false;
        this.moveBackwards = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.mouseMoveX = 0.0;
        this.mouseMoveY = 0.0;
        this.button0 = false;
        this.button1 = false;
        // Movement speed as world units per second
        // let MOVE_SPEED = 20.0; -- unused
        // Mouse sensitivity as degrees per pixel
        // let MOUSE_SENSITIVITY = 0.1; -- unused
        //check input
        if (input.getKeyDown(Atomic.KEY_W) || input.getKeyDown(Atomic.KEY_UP)) {
            this.moveForward = true;
        }
        if (input.getKeyDown(Atomic.KEY_S) || input.getKeyDown(Atomic.KEY_DOWN)) {
            this.moveBackwards = true;
        }
        if (input.getKeyDown(Atomic.KEY_A) || input.getKeyDown(Atomic.KEY_LEFT)) {
            this.moveLeft = true;
        }
        if (input.getKeyDown(Atomic.KEY_D) || input.getKeyDown(Atomic.KEY_RIGHT)) {
            this.moveRight = true;
        }
        if (input.getKeyPress(Atomic.KEY_F)) {
            this.button0 = true;
        }
        if (input.getKeyPress(Atomic.KEY_SPACE)) {
            this.button1 = true;
        }
        //if we are on mobile
        if (Atomic.platform == "Android" || Atomic.platform == "iOS") {
            //iterate through each TouchState, if it doesn't touch any widgets, use it as a `mouse`
            for (var i = 0; i < Atomic.input.getNumTouches(); i++) {
                var touchState = Atomic.input.getTouch(i);
                if (touchState.touchedWidget == null) {
                    var delta = touchState.delta;
                    this.mouseMoveX = delta[0];
                    this.mouseMoveY = delta[1];
                }
            }
        }
        else {
            // update mouse coordinates
            this.mouseMoveX = input.getMouseMoveX();
            this.mouseMoveY = input.getMouseMoveY();
        }
    };
    AvatarController.prototype.update = function (timeStep) {
        this.UpdateControls();
        //if it's a free view
        if (this.cameraMode != 2) {
            this.yaw += this.mouseMoveX * YAW_SENSITIVITY;
            this.pitch += this.mouseMoveY * YAW_SENSITIVITY;
        }
        if (this.pitch < -80) {
            this.pitch = -80;
        }
        if (this.pitch > 80) {
            this.pitch = 80;
        }
        if (this.button0) {
            this.cameraMode++;
            if (this.cameraMode == 3) {
                this.cameraMode = 0;
            }
        }
    };
    //that function called right after update function
    AvatarController.prototype.postUpdate = function (timestep) {
        // Get camera lookat dir from character yaw + pitch
        var rot = this.node.getRotation();
        //create quaternion
        var dir = gl_matrix_1.quat.create();
        //set X value
        gl_matrix_1.quat.setAxisAngle(dir, [1, 0, 0], (this.pitch * Math.PI / 180.0));
        gl_matrix_1.quat.multiply(dir, [rot[1], rot[2], rot[3], rot[0]], dir);
        var headNode = this.node.getChild("Head_Tip", true);
        //if it's a FPS view
        if (this.cameraMode == 1) {
            var headPos = headNode.getWorldPosition();
            var offset = [0.0, 0.15, 0.2];
            gl_matrix_1.vec3.add(headPos, headPos, gl_matrix_1.vec3.transformQuat(offset, offset, [rot[1], rot[2], rot[3], rot[0]]));
            this.cameraNode.setPosition(headPos);
            this.cameraNode.setRotation([dir[3], dir[0], dir[1], dir[2]]);
            gl_matrix_1.quat.setAxisAngle(dir, [0, 1, 0], (this.yaw * Math.PI / 180.0));
            this.node.setRotation([dir[3], dir[0], dir[1], dir[2]]);
        }
        //if it's a third person view
        if (this.cameraMode == 0) {
            var aimPoint = this.node.getWorldPosition();
            var aimOffset = [0, 1.7, 0];
            gl_matrix_1.vec3.transformQuat(aimOffset, aimOffset, dir);
            gl_matrix_1.vec3.add(aimPoint, aimPoint, aimOffset);
            var rayDir = gl_matrix_1.vec3.create();
            gl_matrix_1.vec3.transformQuat(rayDir, [0, 0, -1], dir);
            gl_matrix_1.vec3.scale(rayDir, rayDir, 8);
            gl_matrix_1.vec3.add(aimPoint, aimPoint, rayDir);
            this.cameraNode.setPosition(aimPoint);
            this.cameraNode.setRotation([dir[3], dir[0], dir[1], dir[2]]);
            gl_matrix_1.quat.setAxisAngle(dir, [0, 1, 0], (this.yaw * Math.PI / 180.0));
            this.node.setRotation([dir[3], dir[0], dir[1], dir[2]]);
        }
        else {
            this.MoveCamera(timestep);
        }
    };
    return AvatarController;
}(Atomic.JSComponent));
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
module.exports = AvatarController;
