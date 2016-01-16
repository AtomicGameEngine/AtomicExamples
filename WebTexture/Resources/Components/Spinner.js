
"atomic component";

var inspectorFields = {
  speed: 1.0
}

exports.component = function(self) {

  self.update = function(timeStep) {

    self.node.yaw(timeStep * 15 * self.speed);
    //self.node.roll(timeStep * 5 * self.speed);

  }

}
