"atomic component";

//DayTime component
var component = function(self) {

  var dayTime = require("GlobalVariables").dayTime;

  self.start = function() {
    if(!dayTime) {
      //if it's night, make TheSun color darker - ambient isn't being set properly, see GitHub issue: https://github.com/AtomicGameEngine/AtomicGameEngine/issues/340
      self.scene.getComponent("Zone").ambientColor = [0, 0, 0, 0.2];
      var sun = self.node.getChild("TheSun").getComponent("DirectionalLight2D");
      sun.enabled = false;
    }
  };
};

exports.component = component;
