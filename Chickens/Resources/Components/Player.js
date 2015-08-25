"atomic component";

var MODEL_MOVE_SPEED = .75;
var MODEL_ROTATE_SPEED = 100.0;

var component = function(self) {


    var node = self.node;
    var cluckDelta = Math.random() * 30;

    var animationController = node.getComponent("AnimationController");
    var soundSource = node.getComponent("SoundSource3D");

    animationController.playExclusive("Walk", 0, true);
    animationController.setTime("Walk", Math.random() * 2);
    

    self.start = function() {
              
    }

    self.update = function(timeStep) {
    
        if (cluckDelta > 0.0) {
        
            cluckDelta -= timeStep;
        
        } else {
        
            soundSource.play(soundSource.sound);
            cluckDelta = Math.random() * 30 + 2;
                    
        }
       

        node.translate([0, 0, -MODEL_MOVE_SPEED * timeStep]);

        var pos = node.position;

        if (pos[0] < -20 || pos[0] > 20 || pos[2] < -20 || pos[2] > 20)
            node.yaw(MODEL_ROTATE_SPEED * timeStep);

    }

}

exports.component = component;