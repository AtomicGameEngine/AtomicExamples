'atomic component';

exports.component = function(self) {

    var node = self.node;

    var animationController = node.getComponent("AnimationController");

    animationController.playExclusive("Idle", 0, true);

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
        
        node.yaw(timeStep * 10);

    }

}