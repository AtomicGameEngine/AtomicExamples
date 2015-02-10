// Atomic Component

var game = Atomic.game;
var node = self.node;
var cameraNode = game.cameraNode;
var input = game.input;

var MAX_VELOCITY = 3;
var anim = "Idle";
var flipped = false;
var contactCount = 0;
var jumpDelta = 0;
var control = false;

var lastAnimDelta = 0;

var spawnPosition = [0, 0];

var sprite;
var animationSet;
var jumpSound;

// physics
var body;
var circle;

self.init = function(position) {

    spawnPosition = node.position2D = position;
    
    jumpSound = game.cache.getResource("Sound", "Sounds/Jump13.ogg");

    animationSet = game.cache.getResource("AnimationSet2D", "Sprites/Hero/Hero.scml");
    sprite = node.createComponent("AnimatedSprite2D");
    sprite.setAnimation(animationSet, "Idle");
    sprite.setLayer(100);

    body = node.createComponent("RigidBody2D");
    body.setBodyType(Atomic.BT_DYNAMIC);
    body.fixedRotation = true;
    body.bullet = true;
    body.castShadows = false;

    circle = node.createComponent("CollisionCircle2D");
    // Set radius
    circle.setRadius(.5);
    // Set density
    circle.setDensity(1.0);
    // Set friction.
    circle.friction = .2;
    // Set restitution
    circle.setRestitution(0.1);


}

function setAnimation(animName) {

    if (anim == animName || lastAnimDelta > 0)
        return;

    lastAnimDelta = .25;

    sprite.setAnimation(animationSet, animName);
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

    var left = input.getKeyDown(Atomic.KEY_LEFT);
    var right = input.getKeyDown(Atomic.KEY_RIGHT);
    var jump = input.getKeyDown(Atomic.KEY_UP);

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
        self.soundSource.gain = 0.45;
        self.soundSource.play(jumpSound);

        vel[1] = 0;
        body.linearVelocity = vel;
        body.applyLinearImpulse([0, 6], pos, true);
    }

}

self.onPhysicsBeginContact2D = function(world, bodyA, bodyB, nodeA, nodeB) {

    if (nodeB == node) {
        contactCount++;
    }


}

self.onPhysicsEndContact2D = function(world, bodyA, bodyB, nodeA, nodeB) {

    if (nodeB == node) {
        contactCount--;
    }
}


function start() {

    if (!Platformer.daytime) {
    
        var light = node.createComponent("PointLight2D");
        
        light.color = [1, 1, 1, .75];
        light.softShadowLength = 20;
        light.radius = 20;
        light.castShadows = true;
        light.softShadows = true;
        light.numRays = 256;
        light.backtrace = true;
        self.light = light;
        
        Platformer.lightGroup.addLight(light);
        
        node.createJSComponent("LightFlicker");
    
    }
    
    self.soundSource = node.createComponent("SoundSource");
    self.soundSource.soundType = Atomic.SOUND_EFFECT;

    // TODO: only listen to collisions for our node
    self.listenToEvent(null, "PhysicsBeginContact2D", self.onPhysicsBeginContact2D);
    self.listenToEvent(null, "PhysicsEndContact2D", self.onPhysicsEndContact2D);
}


function update(timeStep) {

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

function postUpdate() {
    // may have to set this post update
    cameraNode.position = node.position;

}