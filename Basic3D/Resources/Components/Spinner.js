"atomic component";

//define inspector fields
var inspectorFields = {
    //value speed will be able to be edited from editor
    //default value sets to the 1.0, so speed has a number type
    speed: 1.0
};

exports.component = function(self) {

    //update function calls each frame
    self.update = function(timeStep) {
        //rotate node around Y axis
        self.node.yaw(timeStep * 75 * self.speed);

    };

};
