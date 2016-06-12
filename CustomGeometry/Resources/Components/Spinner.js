'atomic component';

//Spinner component
exports.component = function(self) {
    self.update = function(timeStep) {
        //Roll the node
        self.node.roll(timeStep * 75);
  };
};
