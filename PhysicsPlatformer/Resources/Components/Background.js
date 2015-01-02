// FIXME
keepAlive = typeof(keepAlive) == "undefined" ? [] : keepAlive;
keepAlive.push(self);

var node = self.node;

function start() {

    var sprite2D = node.createComponent("StaticSprite2D");
    sprite2D.sprite = cache.getResource("Sprite2D", "Sprites/BG.png");
    node.scale2D = [2, 2];
    sprite2D.layer = -100;

}


function postUpdate() {

    var pos = cameraNode.position2D; 
    pos[1] -= 4;
    node.position2D = pos;
    var zoom = 4.0 - camera.zoom;
    node.scale2D = [zoom, zoom];
    
    

}
