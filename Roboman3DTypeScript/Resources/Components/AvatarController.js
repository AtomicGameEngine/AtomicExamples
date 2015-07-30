/// <reference path="../TypeScript/Atomic.d.ts"/>
/// <reference path="../TypeScript/AtomicWork.d.ts" />
/// <reference path="../Modules/gl-matrix.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var gl_matrix_1 = require('gl-matrix');
"atomic component";
var MOVE_FORCE = 1.8;
var BRAKE_FORCE = 0.2;
var YAW_SENSITIVITY = 0.1;
var PITCH_SENSITIVITY = 0.1;
var AvatarController = (function (_super) {
    __extends(AvatarController, _super);
    function AvatarController() {
        _super.apply(this, arguments);
        this.inspectorFields = {
            speed: 1.0,
            cameraDist: 12
        };
        this.yaw = 0;
        this.pitch = 0;
        this.mouseMoveX = 0;
        this.mouseMoveY = 0;
        this.moveForward = false;
        this.moveBackwards = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.idle = true;
        this.speed = 1;
        this.cameraDist = 12;
    }
    AvatarController.prototype.start = function () {
        this.camera = this.node.scene.getMainCamera();
        this.cameraNode = this.camera.node;
        this.body = this.node.createComponent("RigidBody");
        this.body.mass = 1.0;
        this.body.angularFactor = [0, 0, 0];
        this.body.collisionEventMode = Atomic.COLLISION_ALWAYS;
        var shape = this.node.createComponent("CollisionShape");
        shape.setCapsule(2, 4, [0, 2, 0]);
    };
    AvatarController.prototype.update = function (timeStep) {
        this.updateControls();
    };
    AvatarController.prototype.fixedUpdate = function (timestep) {
        var rot = this.node.getRotation();
        var moveDir = [0, 0, 0];
        var velocity = this.body.getLinearVelocity();
        var planeVelocity = [velocity[0], 0.0, velocity[2]];
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
        if (gl_matrix_1.vec3.length(moveDir) > 0.0)
            gl_matrix_1.vec3.normalize(moveDir, moveDir);
        gl_matrix_1.vec3.transformQuat(moveDir, moveDir, [rot[1], rot[2], rot[3], rot[0]]);
        gl_matrix_1.vec3.scale(moveDir, moveDir, (MOVE_FORCE));
        gl_matrix_1.vec3.scale(moveDir, moveDir, this.speed);
        this.body.applyImpulse(moveDir);
        gl_matrix_1.vec3.negate(planeVelocity, planeVelocity);
        gl_matrix_1.vec3.scale(planeVelocity, planeVelocity, BRAKE_FORCE);
        this.body.applyImpulse(planeVelocity);
        if (gl_matrix_1.vec3.length(moveDir) > 0.0)
            this.idle = false;
        else
            this.idle = true;
    };
    AvatarController.prototype.updateControls = function () {
        var input = Atomic.input;
        this.moveForward = false;
        this.moveBackwards = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.mouseMoveX = 0.0;
        this.mouseMoveY = 0.0;
        var MOVE_SPEED = 20.0;
        var MOUSE_SENSITIVITY = 0.1;
        if (input.getKeyDown(Atomic.KEY_W))
            this.moveForward = true;
        if (input.getKeyDown(Atomic.KEY_S))
            this.moveBackwards = true;
        if (input.getKeyDown(Atomic.KEY_A))
            this.moveLeft = true;
        if (input.getKeyDown(Atomic.KEY_D))
            this.moveRight = true;
        this.yaw += input.mouseMoveX * YAW_SENSITIVITY;
        this.pitch += input.mouseMoveY * PITCH_SENSITIVITY;
        if (this.pitch < -80)
            this.pitch = -80;
        if (this.pitch > 80)
            this.pitch = 80;
    };
    AvatarController.prototype.postUpdate = function (timestep) {
        var rot = this.node.getRotation();
        var dir = gl_matrix_1.quat.create();
        gl_matrix_1.quat.setAxisAngle(dir, [1, 0, 0], (this.pitch * Math.PI / 180.0));
        gl_matrix_1.quat.multiply(dir, [rot[1], rot[2], rot[3], rot[0]], dir);
        var headNode = this.node.getChild("Head_Tip", true);
        var aimPoint = this.node.getWorldPosition();
        var aimOffset = [0, 1.7, 0];
        gl_matrix_1.vec3.transformQuat(aimOffset, aimOffset, dir);
        gl_matrix_1.vec3.add(aimPoint, aimPoint, aimOffset);
        var rayDir = gl_matrix_1.vec3.create();
        gl_matrix_1.vec3.transformQuat(rayDir, [0, 0, -1], dir);
        gl_matrix_1.vec3.scale(rayDir, rayDir, this.cameraDist);
        gl_matrix_1.vec3.add(aimPoint, aimPoint, rayDir);
        this.cameraNode.setPosition(aimPoint);
        this.cameraNode.setRotation([dir[3], dir[0], dir[1], dir[2]]);
        gl_matrix_1.quat.setAxisAngle(dir, [0, 1, 0], (this.yaw * Math.PI / 180.0));
        this.node.setRotation([dir[3], dir[0], dir[1], dir[2]]);
    };
    return AvatarController;
})(Atomic.JSComponent);
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
