// CommonJS compatible components
"use strict";
"atomic component";

exports.component = function(self) {

  var game = Atomic.game;
  var node = self.node;

  self.start = function() {

    var water = node.getComponent("StaticModel");
    water.material = game.cache.getResource("Material", "Materials/Water.xml");

  }

  self.update = function(timeStep) {

  }

}
