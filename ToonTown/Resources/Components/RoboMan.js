// designate component
"atomic component";

//A RoboMan component
exports.component = function(self) {
  //link to the current node
  var node = self.node;

  //get Animation and Avatar controller components
  var animCtrl = node.getComponent("AnimationController");
  var controller = node.getJSComponent("AvatarController");

  var idle = true;

  self.start = function() {
    //get main camera of the current scene
    var camera = node.scene.getMainCamera();
    //if it exist
    if (camera) {

      camera.node.position = [0, 0, -10];
      camera.node.pitch(20);

    }

    animCtrl.playExclusive("Idle", 0, true, 0.0);

  };

  self.update = function(timeStep) {

    if (idle != controller.idle) {

      idle = controller.idle;

      if (idle)
        animCtrl.playExclusive("Idle", 0, true, 0.1);
      else
        animCtrl.playExclusive("Run", 0, true, 0.1);


    }

  };

};
