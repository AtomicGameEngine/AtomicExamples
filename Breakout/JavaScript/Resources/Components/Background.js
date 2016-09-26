"atomic component";

//random function returns a random float number from min to max
function random(min, max) {
    return (Math.random() * (max - min + 1)) + min;
}

//A Background component
exports.component = function(self) {
    self.start = function() {
        //looping main game song
        var music = Atomic.cache.getResource("Sound", "Sounds/crazy-space.ogg");
        music.looped = true;
        //get default zone
        var zone = Atomic.renderer.getDefaultZone();
        //fog color with ortho camera is a clear clear
        //so we set a clear color
        zone.setFogColor([0.282, 0.361, 0.557]);
        //add stars on a background
        for (var i = 0; i < 100; i++) {
            //create a star node
            var starNode = self.node.createChild("Star");
            //set its position to a random number
            starNode.position2D = [random(-Atomic.graphics.width/2, Atomic.graphics.width/2)*Atomic.PIXEL_SIZE, random(-Atomic.graphics.height/2, Atomic.graphics.height/2)*Atomic.PIXEL_SIZE];
            //add static sprite component to display a 2d sprite
            var star = starNode.createComponent("StaticSprite2D");
            //set layer of a star to -100
            //it means that we move star node to 'background' layer
            star.layer = -100;
            //load a sprite2D
            star.sprite = Atomic.cache.getResource("Sprite2D", "Sprites/star.png");
        }
    };
};
