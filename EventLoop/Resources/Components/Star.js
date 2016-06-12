'atomic component';

module.exports.component = function (self) {

    // Inspector fields will show up in the Atomic Editor scene view to allow editing
    var inspectorFields = {
        speed: 100
    };
    //link to the current node
    var node = self.node;

    // Start will be called when component is instantiated
    self.start = function () {
        //create a new sprite
        var sprite2D = node.createComponent("StaticSprite2D");
        sprite2D.sprite = Atomic.cache.getResource("Sprite2D", "Sprites/star.png");
        sprite2D.blendMode = Atomic.BLEND_ALPHA;
    };

    // Update will be called every cycle
    self.update = function (timeStep) {
        node.roll(timeStep * self.speed);
    };
};
