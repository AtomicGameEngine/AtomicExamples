// CONSTANTS
var MAX_VELOCITY = 3;

ThePlayer = self;

var node = self.node;

var animationSet = cache.getResource("AnimationSet2D", "Spriter.scml");

var sprite = node.createComponent("AnimatedSprite2D");
sprite.setAnimation(animationSet, "Idle");
sprite.setLayer(100);


node.setPosition(PlayerSpawnPoint);
node.scale2D = [.25, .25];

var body = node.createComponent("RigidBody2D");
body.setBodyType(Atomic.BT_DYNAMIC);
body.fixedRotation = true;

var circle = node.createComponent("CollisionCircle2D");
// Set radius
circle.setRadius(2);
// Set density
circle.setDensity(1.0);
// Set friction.
circle.friction = .2;
// Set restitution
circle.setRestitution(0.1);

var anim = "Idle";
var flipped = false;

var contactCount = 0;

self.onPhysicsBeginContact2D = function(world, bodyA, bodyB, nodeA, nodeB) {

    if (nodeB == node)
    {
        contactCount++;
    }
    

}

self.onPhysicsEndContact2D = function(world, bodyA, bodyB, nodeA, nodeB) {

    if (nodeB == node)
    {
        contactCount--;
    }
}


function start() {

    self.listenToEvent(null, "PhysicsBeginContact2D", self.onPhysicsBeginContact2D);
    self.listenToEvent(null, "PhysicsEndContact2D", self.onPhysicsEndContact2D);
}

function handleAnimation() {

    var vel = body.linearVelocity;

    if (vel[0] < -0.75) {
        if (!flipped) {
            sprite.flipX = true;
            flipped = true;

        }
        if (anim != "Run") {
            sprite.setAnimation(animationSet, "Run");
            anim = "Run";
        }
    } else if (vel[0] > 0.75) {

        if (flipped) {
            sprite.flipX = false;
            flipped = false;

        }
        if (anim != "Run") {
            sprite.setAnimation(animationSet, "Run");
            anim = "Run";
        }
    } else {
        if (anim != "Idle") {
            sprite.setAnimation(animationSet, "Idle");
            anim = "Idle";
        }
    }


}

function handleInput(timeStep) {

    var vel = body.linearVelocity;
    var pos = node.position2D;

    if (Math.abs(vel[0]) > MAX_VELOCITY) {
        vel[0] = (vel[0] ? vel[0] < 0 ? -1 : 1 : 0) * MAX_VELOCITY;
        body.setLinearVelocity(vel);
    }

    var left = input.getKeyDown(Atomic.KEY_A);
    var right = input.getKeyDown(Atomic.KEY_D);
    var jump = input.getKeyDown(Atomic.KEY_SPACE);

    if (input.getNumJoysticks()) {
        var state = GetGamepadState(0);
        if (state.axis0 < -0.5)
            left = true;
        if (state.axis0 > 0.5)
            right = true;

        if (state.button0)
            jump = true;
    }

    if (left && vel[0] > -MAX_VELOCITY) {
        body.applyLinearImpulse([-2, 0], pos, true);
    } else if (right && vel[0] < MAX_VELOCITY) {
        body.applyLinearImpulse([2, 0], pos, true);
    }

    if (!left && !right) {
        vel[0] *= 0.9;
        body.linearVelocity = vel;
        circle.friction = 1000.0;
    }
    else
    {
       circle.friction = .2;    
    }
   
    if (!contactCount)
        circle.friction = 0.0;
    
    if (jump && contactCount) {
        vel[1] = 0;
        body.linearVelocity = vel;
        body.applyLinearImpulse([0, 3], pos, true);
    }

}

function postUpdate() {
    // may have to set this post update
    cameraNode.position = node.position;

}

function update(timeStep) {

    handleInput();
    handleAnimation();


}