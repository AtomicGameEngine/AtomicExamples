"atomic component";

var inspectorFields = {

    jumpSound: ["Sound"]

}

//A Player
exports.component = function(self) {

    var node = self.node;
    //get main camera of the current scene
    var camera = self.node.scene.getMainCamera();
    var cameraNode = camera.node;
    //link to Atomic.Input
    var input = Atomic.input;
    //get SoundSource component
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

    //function called after the component attached to the node
    self.start = function() {

        //get components
        sprite = node.getComponent("AnimatedSprite2D");
        body = node.getComponent("RigidBody2D");
        circle = node.getComponent("CollisionCircle2D");

        setAnimation("Idle");

        //subscribe to PhysicsPostStep2D
        self.subscribeToEvent("PhysicsPostStep2D", function(event) {
            //set camera position to the current node position
            cameraNode.position = node.position;
        });
        //subscribe to PhysicsBeginContact2D
        self.subscribeToEvent("PhysicsBeginContact2D", function(event) {
            //if bodyB is our body, so increment contactCount
            if (event.bodyB == body)
                contactCount++;
        });
        //subscribe to
        self.subscribeToEvent("PhysicsEndContact2D", function(event) {
            //if bodyB is our body, so decrement contactCount
            if (event.bodyB == body)
                contactCount--;
        });

        //get current dayTime by requiring GlobalVariables object
        var dayTime = require("GlobalVariables").dayTime;
        if(!dayTime) {
          //ok, it's a night, then create a light
          var light = node.createComponent("PointLight2D");
          light.color = [1, 0.5, 0.7, 0.8];
          light.backtrace = true;
          light.castShadows = true;
          light.numRays = 256;
        }

    }

    self.update = function(timeStep) {
        //handle our input and animation stuff
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

    function setAnimation(animName) {

        if (anim == animName || lastAnimDelta > 0)
            return;

        lastAnimDelta = .25;
        //sprite is an AnimatedSprite2D object, set its animation to the given animName
        sprite.setAnimation(animName);
        anim = animName;

    }

    function handleAnimation(timeStep) {

        lastAnimDelta -= timeStep;

        var vel = body.linearVelocity;
        //if we have a contact with something
        if (contactCount) {
            //if velocity by X less than zero
            if (vel[0] < -0 && control) {
                if (!flipped) {
                    sprite.flipX = true;
                    flipped = true;
                }
                //set current animation to Run animation
                setAnimation("Run");
            //if velocity by X is greater than zero
            } else if (vel[0] > 0 && control) {
                if (flipped) {
                    sprite.flipX = false;
                    flipped = false;
                }
                //set current animation to Run animation
                setAnimation("Run");
            } else {
                //if our velocity equals to zero, so set current animation to Idle animation
                setAnimation("Idle");
            }
        } else {
            //if velocity by Y greater than 1, so we are jumping
            if (vel[1] > 1.0) {
                setAnimation("Jump");
            //if velocity by Y is less than 1, so we are falling
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
            //set body linear velocity to the current velocity
            body.setLinearVelocity(vel);
        }
        //input stuff
        var left = input.getKeyDown(Atomic.KEY_LEFT) || input.getKeyDown(Atomic.KEY_A);
        var right = input.getKeyDown(Atomic.KEY_RIGHT) || input.getKeyDown(Atomic.KEY_D);

        var jump = input.getKeyDown(Atomic.KEY_UP) || input.getKeyDown(Atomic.KEY_SPACE) || input.getKeyDown(Atomic.KEY_W);

        control = false;
        //if left or right is pressed
        if (left || right)
            control = true;

        //applying linear impulses to the left and right
        if (left && vel[0] > -MAX_VELOCITY) {
            body.applyLinearImpulse([-2, 0], pos, true);
        } else if (right && vel[0] < MAX_VELOCITY) {
            body.applyLinearImpulse([2, 0], pos, true);
        }
        //if we are not pressing any buttons, so enable friction
        if (!left && !right) {
            vel[0] *= 0.9;
            body.linearVelocity = vel;
            circle.friction = 1000.0;
        } else {
            circle.friction = .2;
        }

        if (!contactCount)
            circle.friction = 0.0;

        //if we are jumping and colliding with something
        if (jump && jumpDelta <= 0 && contactCount) {

            jumpDelta = .25;
            //is sound exists
            if (self.jumpSound) {
                soundSource.gain = 0.45;
                //playing sound
                soundSource.play(self.jumpSound);
            }

            vel[1] = 0;
            body.linearVelocity = vel;
            //applying linear impuls to the Y
            body.applyLinearImpulse([0, 6], pos, true);
        }

    }

}
