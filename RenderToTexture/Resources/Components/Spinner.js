"atomic component";
//inspector fields to make speed variable visible in editor
var inspectorFields = {
    speed: 1.0
}

exports.component = function(self) {

    self.update = function(timeStep) {
        //rotate current node around Y axis
        self.node.yaw(timeStep * 75 * self.speed);
        //rotate current node around X axis
        self.node.pitch(-timeStep * 25 * self.speed);
    }

}
