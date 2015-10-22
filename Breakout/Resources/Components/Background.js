"atomic component";

function random(min, max) {
    return (Math.random() * (max - min + 1)) + min;
}

exports.component = function(self) {
    self.start = function() {
        var zone = Atomic.renderer.getDefaultZone();
        zone.setFogColor([0.282, 0.361, 0.557]);
        for(var i = 0; i < 100; i++) {
            var starNode = self.node.createChild("Star");
            starNode.position2D = [random(-Atomic.graphics.width/2, Atomic.graphics.width/2)*Atomic.PIXEL_SIZE, random(-Atomic.graphics.height/2, Atomic.graphics.height/2)*Atomic.PIXEL_SIZE];
            var star = starNode.createComponent("StaticSprite2D");
            star.layer = -100;
            star.sprite = Atomic.cache.getResource("Sprite2D", "Sprites/star.png");
        }
    }

    self.update = function() {

    }
}
