'atomic component';

exports.component = function(self) {

  var game = Atomic.game;
  var node = self.node;

  node.scale2D = [1.5, 1.5];
  node.position2D = [0, 12];

  self.start  = function() {

    var spaceSprite = game.cache.getResource("Sprite2D", "Sprites/space_background.png");

    // add a sprite component to our node
    var sprite2D = node.createComponent("StaticSprite2D");

    sprite2D.orderInLayer = -200;
    sprite2D.blendMode = Atomic.BLEND_ADDALPHA;
    sprite2D.sprite = spaceSprite;

  }

  self.update = function(timeStep) {

    if (node.position[1] < -19)
    node.position2D = [0, 18];

    var speed = .75;
    node.translate([0, -timeStep * speed, 0]);

  }

}
