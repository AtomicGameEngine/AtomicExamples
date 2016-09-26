'atomic component';
//Roboman component
exports.component = function(self) {
    //link to the current node
    var node = self.node;
    //get aniomatio controller component
    var animationController = node.getComponent("AnimationController");

    animationController.playExclusive("Idle", 0, true);
    //Listen events and play animation
    self.subscribeToEvent("PlayRun", function() {
        animationController.playExclusive("Run", 0, true);
    });

    self.subscribeToEvent("PlayIdle", function() {
        animationController.playExclusive("Idle", 0, true);
    });

    self.subscribeToEvent("PlayAttack", function() {
        animationController.playExclusive("Attack", 0, true);
    });

    self.subscribeToEvent("PlayWalk", function() {
        animationController.playExclusive("Walk", 0, true);
    });


    self.update = function(timeStep) {
        //rotate ours node around Y axis
        node.yaw(timeStep * 10);

    };

};
