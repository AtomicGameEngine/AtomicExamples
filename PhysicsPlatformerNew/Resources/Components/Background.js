"atomic component";

var component = function(self) {

    var camera = self.node.scene.getMainCamera();
    var cameraNode = camera.node;

    self.postUpdate = function() {

        //var pos = cameraNode.position2D;
        //pos[1] -= 4;
        //self.node.position2D = pos;
        //var zoom = 4.0 - camera.zoom;
        //self.node.scale2D = [zoom , zoom];

    }

}

exports.component = component;
