var glmatrix = require("gl-matrix");
var vec2 = glmatrix.vec2;

var game = Atomic.game;
var cameraNode = game.cameraNode;
var cache = game.cache;

var node = self.node;

// Resources
var animationSet = cache.getResource("AnimationSet2D", "Sprites/GoldIcon.scml");
var coinSound = cache.getResource("Sound", "Sounds/Pickup_Coin8.ogg");
var coinBounceSound = cache.getResource("Sound", "Sounds/Coin_Bounce.ogg");

var sprite = node.createComponent("AnimatedSprite2D");
sprite.setAnimation(animationSet, "idle");
sprite.setLayer(100);

var activated = false;
var body;
var light;

function onPlayerHit() {

    // sprite enabled is not removing the sprite
    if (light)
        light.enabled = false;
    node.scale2D = [0, 0];
    sprite.enabled = false;
    body.enabled = false;
    self.soundSource.gain = 1.0;
    self.soundSource.play(coinSound);

}

self.onPhysicsBeginContact2D = function(world, bodyA, bodyB, nodeA, nodeB) {

    if (nodeA == Platformer.level.player.node && nodeB == node) {
        onPlayerHit();
    } else if (nodeB == node) {
        var vel = body.linearVelocity;
        if (vec2.length(vel) > 3) {
            self.soundSource.gain = .3;
            self.soundSource.play(coinBounceSound);
        }
    }

}


function start() {

    self.soundSource = node.createComponent("SoundSource");
    self.soundSource.soundType = Atomic.SOUND_EFFECT;

    if (!Platformer.daytime) {
        light = node.createComponent("PointLight2D");
        light.color = [1, 1, .56, .8];
        light.radius = .85;
        Platformer.lightGroup.addLight(light);

    }



    // would just like to listen to body collisions here
    self.listenToEvent(null, "PhysicsBeginContact2D", self.onPhysicsBeginContact2D);


}

function update(timeStep) {

    if (activated)
        return false;

    if (vec2.distance(cameraNode.position2D, node.position2D) < 3.0) {

        activated = true;

        body = node.createComponent("RigidBody2D");
        body.setBodyType(Atomic.BT_DYNAMIC);
        body.fixedRotation = true;
        body.castShadows = false;

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