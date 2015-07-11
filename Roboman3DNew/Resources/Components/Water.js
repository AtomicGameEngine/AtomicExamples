
// Water component

"use strict";
"atomic component";

// fields
"myBoolField boolean";
"myStringField string";
"myNumberField number";
"myVector3Field Vector3";

exports.component = function(self) {

  var game = Atomic.game;
  var node = self.node;

  print (self.myBoolField);
  print (self.myStringField);
  print (self.myNumberField);
  print (self.myVector3Field);

  self.start = function() {

    var water = node.getComponent("StaticModel");
    water.material = game.cache.getResource("Material", "Materials/Water.xml");

  }

  self.update = function(timeStep) {

  }

}
