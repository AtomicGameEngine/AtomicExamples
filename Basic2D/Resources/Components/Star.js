'atomic component';

//A star component
exports.component = function(self) {

    //link to the current node
    var node = self.node;

    //start function calls when component attached to the node, calls after constructor
    self.start = function() {

        //create StaticSprite2D component to the current node
        var sprite2D = node.createComponent("StaticSprite2D");
        //get star.png sprite from cache
        sprite2D.sprite = Atomic.cache.getResource("Sprite2D", "Sprites/star.png");
        //set blend mode to BLEND_ALPHA
        sprite2D.blendMode = Atomic.BLEND_ALPHA;

    }

    //update function calls each frame
    self.update = function(timeStep) {
        //roll a node
        node.roll(timeStep * 100);

    }


}
