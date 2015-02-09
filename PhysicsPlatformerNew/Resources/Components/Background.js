var game = Atomic.game;
var node = self.node;

function start() {

    var sprite2D = node.createComponent("StaticSprite2D");
    sprite2D.sprite = game.cache.getResource("Sprite2D", "Levels/Background.png");
    node.scale2D = [2, 2];
    sprite2D.layer = -100;

}


function postUpdate() {

    var pos = game.cameraNode.position2D;
    pos[1] -= 4;
    node.position2D = pos;
    var zoom = 4.0 - camera.zoom;
    node.scale2D = [zoom, zoom];
}

// fixme must have an update
function update(timeStep) {

}