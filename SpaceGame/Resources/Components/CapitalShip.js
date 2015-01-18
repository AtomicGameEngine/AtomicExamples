
var game = Atomic.game;
var node = self.node;

self.allowShoot = true;
self.shootDelta = 0;

self.health = 60;


// using start to initialize the script component
function start() {

    var spaceSheet = game.getSpriteSheet("Sprites/spacegame_sheet.xml");

    // add a sprite component to our node
    var sprite2D = node.createComponent("StaticSprite2D");
    sprite2D.blendMode = Atomic.BLEND_ALPHA;    
    sprite2D.sprite = spaceSheet.getSprite("spaceship_locust");

    node.position2D =  [-4, SpaceGame.halfHeight - 1];
    node.roll(180);
    
}

// update function called per frame with delta time
function update(timeStep) {

    var pos = node.position2D;
    var ppos = SpaceGame.playerNode.position2D;
    
    if (Math.abs(pos[0] - ppos[0]) > .25)
    {
        if (pos[0] < ppos[0])
            pos[0] += timeStep * .95;
        else
            pos[0] -= timeStep * .95;

        node.position2D = pos;
    }
    else
    {
    	//aiShoot(timeStep);

    }



}
