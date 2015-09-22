"atomic component";

//DayTime component
var component = function(self) {

  var dayTime = require("GlobalVariables").dayTime;

  self.start = function() {
    if(!dayTime) {
      //if it's night, make TheSun color darker
      var sun = self.node.getChild("TheSun").getComponent("DirectionalLight2D");
      sun.color = [0.05, 0.05, 0.07, 0.1];
    }
  }
}

exports.component = component;
