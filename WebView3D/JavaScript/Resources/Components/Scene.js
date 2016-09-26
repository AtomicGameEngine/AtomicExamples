"atomic component";

//Define a Scene component
exports.component = function(self) {
  //we are attaching that component to the Scene, so we are sure that ours node is a scene
  var scene = self.node;
  var time = 12;

  self.start = function() {

      // create the procedural sky
      var pnode = scene.createChild();
      self.procSky = pnode.createComponent("ProcSky");
      self.procSky.setDayTime(time);
  };

  self.update = function(timeStep) {

      time += timeStep * .08;
      self.procSky.setDayTime(time);
  };
};
