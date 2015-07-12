
exports.fields = {
  speed: 1.0
}

exports.component = function(self) {

  var node = self.node;

  self.start = function() {

  }

  self.update = function(timeStep) {

    node.yaw(timeStep * 75 * self.speed);

  }

}
