"atomic component";

//A paddle component
exports.component = function(self) {
    self.start = function() {
        self.node.name = "Paddle";
        self.startBall = self.scene.createChildPrefab("Ball", "Prefabs/Ball.prefab");
    }

    self.update = function(delta) {
        if(!self.started) {
            if(Atomic.input.getMouseButtonPress(Atomic.MOUSEB_LEFT)) {
                self.started = true;
                var body = self.startBall.getComponent("RigidBody2D");
                body.applyForceToCenter([20 + Math.random(), 20 + Math.random()], true);
            }
            self.startBall.position2D = [self.node.position2D[0], self.node.position2D[1]+64*Atomic.PIXEL_SIZE];
        }
        var pos = Atomic.renderer.getViewport(0).screenToWorldPoint(Atomic.input.getMousePosition()[0], 0, 0);
        pos[1] = -3;
        self.node.position2D = pos;
    }
}
