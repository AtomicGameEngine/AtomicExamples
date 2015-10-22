"atomic component";

//A ball component
exports.component = function(self) {
    var brickDestroySound = self.scene.getChild("BrickSound").getComponent("SoundSource");
    function playBrickDestroySound() {
        brickDestroySound.play(brickDestroySound.sound);
    }
    self.start = function() {
        //define node name
        self.node.name = "Ball";
        self.rigidBody = self.getComponent("RigidBody2D");
        self.subscribeToEvent("PhysicsBeginContact2D", function(data){
            //get a brick
            var brick = (data.nodeA == self.node) ? data.nodeB : data.nodeA;
            //in that case we are on 100% sure, that we could have only ball collided with brick, so we don't really need any checks
            if (brick.name.indexOf("Brick") >= 0) {
                playBrickDestroySound();
                brick.remove();
            }
        });
    }

    self.update = function(delta) {
        if (self.node.position2D[1] <= -4) {
            self.rigidBody.remove();
            self.gameOver = true;
        }
        if (self.gameOver) {
            if(Atomic.input.getMouseButtonPress(Atomic.MOUSEB_LEFT)) {
                self.gameOver = false;
                Atomic.player.loadScene("Scenes/Scene.scene");
            }
        }
    }
}
