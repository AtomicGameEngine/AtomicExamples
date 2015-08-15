'atomic component';

exports.component = function(self) {

    var node = self.node;

    var camera = node.scene.getMainCamera();
    camera.orthoSize = Atomic.graphics.height * Atomic.PIXEL_SIZE;

    var sprite2D = node.getComponent("StaticSprite2D");

    console.log(sprite2D);

    var width = sprite2D.sprite.texture.width;
    var height = sprite2D.sprite.texture.height;

    var viewWidth = Atomic.graphics.width;
    var viewHeight = Atomic.graphics.height;

    node.scale2D = [viewWidth / width, viewHeight / height];


}