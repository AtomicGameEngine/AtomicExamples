
// Script instantianted "child" component

var inspectorFields = {
  speed: 1.0
}

exports.component = function(self) {

  self.start = function() {

    self.instantated = self.node.createJSComponent("Components/ProtoSpinner.js", { speed: self.speed } );

  }

}
