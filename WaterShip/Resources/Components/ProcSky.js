
"atomic component";

var component = function (self) {
    
  var scene = self.node;
  var time = 12;
  
  // create the procedural sky
  var pnode = scene.createChild();
  self.procSky = pnode.createComponent("ProcSky");
  self.procSky.setDayTime(time);
  

  self.start = function() {

  }

  self.update = function(timeStep) {
      
      time += timeStep * .5;
      self.procSky.setDayTime(time);

  }

}

exports.component = component;
