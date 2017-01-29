'atomic component';

var halfWidth = Atomic.graphics.width * Atomic.PIXEL_SIZE * 0.5;
var halfHeight = Atomic.graphics.height * Atomic.PIXEL_SIZE * 0.5;

//ShadowCaster component
exports.component = function(self) {
    //Link to the current node
    var node = self.node;

    //Create RigidBody2D component on the current node and make its static and cast shadows
    var body = node.createComponent("RigidBody2D");
    body.bodyType = Atomic.BodyType2D.BT_STATIC;
    body.castShadows = true;

    //Create circle collision and set its radius
    var circle = node.createComponent("CollisionCircle2D");
    circle.radius = .35;

    //Create sprite
    var sprite = node.createComponent("StaticSprite2D");
    var sprite2D = Atomic.cache.getResource("Sprite2D", "Sprites/ball" + (Math.round(Math.random() * 7) + 1) + ".png");
    sprite.setSprite(sprite2D);

    var x = -halfWidth + (halfWidth * 2) * Math.random();
    var y = -halfHeight + (halfHeight * 2) * Math.random();

    // tolerance towards the middle of screen
    x *= .7;
    y *= .7;
    //Set position of the current node in 2D space
    node.position2D = [x, y];

};
