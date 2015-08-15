// designate component
"atomic component";

exports.component = function(self) {

  var node = self.node;

  var animCtrl = node.getComponent("AnimationController");
  var controller = node.getJSComponent("AvatarController");

  var idle = true;

  self.start = function() {

    var camera = node.scene.getMainCamera();

    if (camera) {

      camera.node.position = [0, 0, -10];
      camera.node.pitch(20);

    }

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
