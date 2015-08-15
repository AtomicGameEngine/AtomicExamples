'atomic component';

exports.component = function(self) {

    var node = self.node;

    self.start = function() {

        var sprite2D = node.createComponent("StaticSprite2D");
        sprite2D.sprite = Atomic.cache.getResource("Sprite2D", "Sprites/star.png");
        sprite2D.blendMode = Atomic.BLEND_ALPHA;

    }

    self.update = function(timeStep) {

        node.roll(timeStep * 100);

    }


}