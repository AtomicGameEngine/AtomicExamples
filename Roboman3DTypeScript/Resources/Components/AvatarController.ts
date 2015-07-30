/// <reference path="../TypeScript/Atomic.d.ts"/>
/// <reference path="../TypeScript/AtomicWork.d.ts" />
/// <reference path="../Modules/gl-matrix.d.ts" />

import {vec3, quat} from 'gl-matrix';

"atomic component";

const MOVE_FORCE = 1.8;
const BRAKE_FORCE = 0.2;
const YAW_SENSITIVITY = 0.1;
const PITCH_SENSITIVITY = 0.1;

class AvatarController extends Atomic.JSComponent {

    // define inspector fields
    inspectorFields = {
        speed: 1.0,
        cameraDist: 12
    }

    camera: Atomic.Camera;
    cameraNode: Atomic.Node;
    body: Atomic.RigidBody;

    yaw: number = 0;
    pitch: number = 0;

    mouseMoveX: number = 0;
    mouseMoveY: number = 0;

    moveForward: boolean = false;
    moveBackwards: boolean = false;
    moveLeft: boolean = false;
    moveRight: boolean = false;

    idle: boolean = true;

    speed: number = 1;
    cameraDist = 12;

    start() {

        this.camera = this.node.scene.getMainCamera();

        this.cameraNode = this.camera.node;

        // Create rigidbody, and set non-zero mass so that the body becomes dynamic
        this.body = <Atomic.RigidBody> this.node.createComponent("RigidBody");
        this.body.mass = 1.0;

        // Set zero angular factor so that physics doesn't turn the character on its own.
        // Instead we will control the character yaw manually
        this.body.angularFactor = [0, 0, 0];

        // Set the rigidbody to signal collision also when in rest, so that we get ground collisions properly
        this.body.collisionEventMode = Atomic.COLLISION_ALWAYS;

        // Set a capsule shape for collision
        var shape = <Atomic.CollisionShape> this.node.createComponent("CollisionShape");
        shape.setCapsule(2, 4, [0, 2, 0]);


    }

    update(timeStep: number) {

        this.updateControls();

    }

    fixedUpdate(timestep) {

        var rot = this.node.getRotation();

        var moveDir = [0, 0, 0];

        // Update movement & animation
        var velocity = this.body.getLinearVelocity();

        // Velocity on the XZ plane
        var planeVelocity = [velocity[0], 0.0, velocity[2]];

        if (this.moveForward) {
            vec3.add(moveDir, moveDir, [0, 0, 1])
        }
        if (this.moveBackwards) {
            vec3.add(moveDir, moveDir, [0, 0, -1])
        }
        if (this.moveLeft) {
            vec3.add(moveDir, moveDir, [-1, 0, 0])
        }
        if (this.moveRight) {
            vec3.add(moveDir, moveDir, [1, 0, 0])
        }

        if (vec3.length(moveDir) > 0.0)
            vec3.normalize(moveDir, moveDir);

        vec3.transformQuat(moveDir, moveDir, [rot[1], rot[2], rot[3], rot[0]]);
        vec3.scale(moveDir, moveDir, (MOVE_FORCE));

        vec3.scale(moveDir, moveDir, this.speed);

        this.body.applyImpulse(moveDir);

        vec3.negate(planeVelocity, planeVelocity);
        vec3.scale(planeVelocity, planeVelocity, BRAKE_FORCE);
        this.body.applyImpulse(planeVelocity);

        if (vec3.length(moveDir) > 0.0)
            this.idle = false;
        else
            this.idle = true;

    }


    updateControls() {

        var input = Atomic.input;

        this.moveForward = false;
        this.moveBackwards = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.mouseMoveX = 0.0;
        this.mouseMoveY = 0.0;

        // Movement speed as world units per second
        var MOVE_SPEED = 20.0;
        // Mouse sensitivity as degrees per pixel
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

    }

    postUpdate(timestep) {

        // Get camera lookat dir from character yaw + pitch
        var rot = this.node.getRotation();

        var dir = quat.create();

        quat.setAxisAngle(dir, [1, 0, 0], (this.pitch * Math.PI / 180.0));

        quat.multiply(dir, [rot[1], rot[2], rot[3], rot[0]], dir);

        var headNode = this.node.getChild("Head_Tip", true);

        var aimPoint = <number[]> this.node.getWorldPosition();
        var aimOffset = [0, 1.7, 0];
        vec3.transformQuat(aimOffset, aimOffset, dir);
        vec3.add(aimPoint, aimPoint, aimOffset);

        var rayDir = vec3.create();
        vec3.transformQuat(rayDir, [0, 0, -1], dir);
        vec3.scale(rayDir, rayDir, this.cameraDist);

        vec3.add(aimPoint, aimPoint, rayDir);

        this.cameraNode.setPosition(aimPoint);
        this.cameraNode.setRotation([dir[3], dir[0], dir[1], dir[2]]);
        quat.setAxisAngle(dir, [0, 1, 0], (this.yaw * Math.PI / 180.0));
        this.node.setRotation([dir[3], dir[0], dir[1], dir[2]]);

    }


}

function QuatFromEuler(x, y, z) {

    var M_PI = 3.14159265358979323846264338327950288;

    var q = [0, 0, 0, 0];

    // Order of rotations: Z first, then X, then Y (mimics typical FPS camera with gimbal lock at top/bottom)
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


export = AvatarController;
