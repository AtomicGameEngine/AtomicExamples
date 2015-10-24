"atomic component";

//A Paddle component
exports.component = function(self) {
    self.start = function() {
        //define node name
        self.node.name = "Paddle";
        //create startBall prefab
        self.startBall = self.scene.createChildPrefab("Ball", "Prefabs/Ball.prefab");
        //also get a Ball component
        self.startBallComponent = self.startBall.getJSComponent("Ball");
    }

    self.update = function(delta) {
        //if we haven't ball started
        if(!self.started) {
            //check mouse button click
            if(Atomic.input.getMouseButtonPress(Atomic.MOUSEB_LEFT)) {
                //get rigidBody component of ours ball
                var body = self.startBall.getComponent("RigidBody2D");
                //let's run our ball!
                body.applyForceToCenter([20 + Math.random(), 20 + Math.random()], true);
                self.startBallComponent.started = true;
                self.started = true;
            }
            //if we haven't started yet, move our ball with the paddle
            self.startBall.position2D = [self.node.position2D[0], self.node.position2D[1]+64*Atomic.PIXEL_SIZE];
        }
        //get current mouse position, and project screen coordinates to the world coordinates
        var pos = Atomic.renderer.getViewport(0).screenToWorldPoint(Atomic.input.getMousePosition()[0], 0, 0);
        //set y value to -3
        pos[1] = -Atomic.graphics.height/2.5*Atomic.PIXEL_SIZE;
        //set paddle position to the calculated one
        self.node.position2D = pos;
    }
}
