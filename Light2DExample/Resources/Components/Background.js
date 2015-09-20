'atomic component';

//A Background component
exports.component = function(self) {
    //Link to the current node
    var node = self.node;
    //Get main camera of the current scene
    var camera = node.scene.getMainCamera();
    //set its ortho size
    camera.orthoSize = Atomic.graphics.height * Atomic.PIXEL_SIZE;

    //Get StaticSprite2D component from the current node
    var sprite2D = node.getComponent("StaticSprite2D");

    var width = sprite2D.sprite.texture.width;
    var height = sprite2D.sprite.texture.height;

    var viewWidth = Atomic.graphics.width;
    var viewHeight = Atomic.graphics.height;

    //scale the current node with X and Y
    node.scale2D = [viewWidth / width, viewHeight / height];

}
