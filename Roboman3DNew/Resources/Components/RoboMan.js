// designate component
"atomic component";

module.exports = function(self) {

  var game = Atomic.game;
  var node = self.node;

  RoboMan = self;

  var animCtrl = node.getComponent("AnimationController");
  var controller = node.createJSComponent("Components/AvatarController.js");

  var idle = true;

  self.start = function() {

    game.cameraNode.position = [0, 5.5, -10];
    game.cameraNode.pitch(20);
    animCtrl.playExclusive("Idle", 0, true, 0.0);

    node.yaw(180);

  }

  // we need an update or it doesn't run the start, fix in JSVM
  self.update = function(timeStep) {

    node.yaw(180);


    if (idle != controller.idle) {

      idle = controller.idle;

      if (idle)
        animCtrl.playExclusive("Idle", 0, true, 0.1);
      else
        animCtrl.playExclusive("Run", 0, true, 0.1);


    }

  }

}
