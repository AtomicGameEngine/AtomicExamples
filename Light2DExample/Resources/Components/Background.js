var node = self.node;
var game = Atomic.game;
var cameraNode = game.cameraNode;
var camera = game.camera;

function start() {

    var sprite2D = node.createComponent("StaticSprite2D");
    sprite2D.sprite = game.cache.getResource("Sprite2D", "Backgrounds/background.jpg");
    sprite2D.layer = -100;

    var width = sprite2D.texture.width;
    var height = sprite2D.texture.height;

    var viewWidth = game.viewport.width;
    var viewHeight = game.viewport.height;

    node.scale2D = [viewWidth / width, viewHeight / height];

}


// fixme must have an update
function update(timeStep) {

}