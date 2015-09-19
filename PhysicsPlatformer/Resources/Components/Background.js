"atomic component";

//A Background
var component = function(self) {
    //getting a main camera of current scene
    var camera = self.node.scene.getMainCamera();
    var cameraNode = camera.node;

    //This function will be called each frame after the update function
    self.postUpdate = function() {
        //get position of our camera
        //position2D returns an array, which has 3 elements, the first is x, second is y, third is z
        var pos = cameraNode.position2D;
        pos[1] -= 4;
        //set position to the current node
        self.node.position2D = pos;
        //get camera's zoom, and changing it to make a nice paralax effect
        var zoom = 4.0 - camera.zoom;
        //scale2D is an array with two elements, the first is x, the second is y
        self.node.scale2D = [zoom , zoom];
    }

}

exports.component = component;
