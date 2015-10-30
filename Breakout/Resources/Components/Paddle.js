"atomic component";

var inspectorFields = {
    keyboard: false
}

var PADDLE_SPEED = 0.03;

//A Paddle component
exports.component = function(self) {
    self.start = function() {
        //define node name
        self.node.name = "Paddle";

        self.rigidBody = self.getComponent("RigidBody2D");

        self.createStartBall();

        self.subscribeToEvent("CreateNewBall", function(_) {
            self.createStartBall();
            self.started = false;
        });

        self.subscribeToEvent("MultiGesture", function(event) {
            if(event.numFingers >= 2 && !self.started) {
                self.runBall();
            }
        });

        self.zoom = self.node.scene.getMainCamera().zoom;
        self.node.position2D = [self.node.position2D[0], -Atomic.graphics.height/2.5*Atomic.PIXEL_SIZE/self.zoom];
    }
    self.createStartBall = function() {
        //create startBall prefab
        self.startBall = self.scene.createChildPrefab("Ball", "Prefabs/Ball.prefab");
        //move the ball off screen, because we will change its position later
        self.startBall.position2D = [-100, -100];
        //also get a Ball component
        self.startBallComponent = self.startBall.getJSComponent("Ball");
    }

    self.runBall = function() {
        //get rigidBody component of ours ball
        var body = self.startBall.getComponent("RigidBody2D");
        //let's run our ball!
        body.applyForceToCenter([20/self.zoom + Math.random(), 20/self.zoom + Math.random()], true);
        self.startBallComponent.started = true;
        self.started = true;
    }

    self.update = function(delta) {
        //if we haven't ball started
        if (!self.started) {
            //check mouse button click
            if(Atomic.input.getMouseButtonPress(Atomic.MOUSEB_LEFT) || Atomic.input.getKeyDown(Atomic.KEY_SPACE)) {
                self.runBall();
            }
            //if we haven't started yet, move our ball with the paddle
            self.startBall.position2D = [self.node.position2D[0], self.node.position2D[1]+64*Atomic.PIXEL_SIZE];
        }
        if (Atomic.platform == "Android" || Atomic.platform == "iOS") {
            //get touches
            var numTouches = Atomic.input.getNumTouches();
            //we want use only one finger, so return if there's more
            if (numTouches != 1) return;
            //get the first touch state
            var touchState = Atomic.input.getTouch(0);
            //get current mouse position, and project screen coordinates to the world coordinates
            var pos = Atomic.renderer.getViewport(0).screenToWorldPoint(touchState.position[0], 0, 0);
            //set y value to -3
            pos[1] = -Atomic.graphics.height/2.5*Atomic.PIXEL_SIZE/self.zoom;
            // set paddle position to the calculated one
            self.node.position2D = pos;
        } else {
            if (self.keyboard) {
                var pos = self.node.position2D;
                if (Atomic.input.getKeyDown(Atomic.KEY_A) || Atomic.input.getKeyDown(Atomic.KEY_LEFT)) {
                    pos[0] -= PADDLE_SPEED;
                    self.node.position2D = pos;
                    // self.rigidBody.setLinearVelocity([-5, 0]);
                } else if (Atomic.input.getKeyDown(Atomic.KEY_D) || Atomic.input.getKeyDown(Atomic.KEY_RIGHT)) {
                    pos[0] += PADDLE_SPEED;
                    self.node.position2D = pos;
                }
            } else {
                //get current mouse position, and project screen coordinates to the world coordinates
                var pos = Atomic.renderer.getViewport(0).screenToWorldPoint(Atomic.input.getMousePosition()[0], 0, 0);
                //set y value to -3
                pos[1] = -Atomic.graphics.height/2.5*Atomic.PIXEL_SIZE/self.zoom;
                // set paddle position to the calculated one
                self.node.position2D = pos;
            }
        }
        if(self.node.position2D[0] < -Atomic.graphics.width / 2*Atomic.PIXEL_SIZE/self.zoom) {
            self.node.position2D = [-Atomic.graphics.width / 2*Atomic.PIXEL_SIZE/self.zoom, -Atomic.graphics.height/2.5*Atomic.PIXEL_SIZE/self.zoom];
        }
        if(self.node.position2D[0] > Atomic.graphics.width / 2*Atomic.PIXEL_SIZE/self.zoom) {
            self.node.position2D = [Atomic.graphics.width / 2*Atomic.PIXEL_SIZE/self.zoom, -Atomic.graphics.height/2.5*Atomic.PIXEL_SIZE/self.zoom];
        }
    }
}
