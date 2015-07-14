// Water component
"use strict";
"atomic component";

exports.fields = {
  myBooleanField: true,
  myStringField: "Default",
  myNumberField: 42,
  myVector3Field: [ Atomic.VAR_VECTOR3, [1,2,3] ]
}

module.exports = function(self) {

  var game = Atomic.game;
  var node = self.node;

  print (self.myBooleanField);
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
