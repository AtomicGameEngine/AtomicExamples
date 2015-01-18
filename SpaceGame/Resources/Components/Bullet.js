var game = Atomic.game;
var node = self.node;

self.isPlayer = false;

self.init = function (isPlayer, spawnPosition) {

    self.isPlayer = isPlayer;

    var laserSound = game.getSound(self.isPlayer ? "Sounds/laser01.wav" : "Sounds/laser02.wav");
    var sprite2D = node.createComponent("StaticSprite2D");

    if (self.isPlayer)    
        sprite2D.sprite = game.getSprite2D("Sprites/blue_beam.png");
    else
        sprite2D.sprite = game.getSprite2D("Sprite2D", "Sprites/green_beam.png");

    sprite2D.blendMode = Atomic.BLEND_ADDALPHA;

    self.soundSource = node.createComponent("SoundSource");
    self.soundSource.soundType = Atomic.SOUND_EFFECT;
    self.soundSource.gain = 0.75;
    self.soundSource.play(laserSound);

    node.position2D =  spawnPosition;

    if (!self.isPlayer)
    {
        node.roll(180);
    }

}

function start() {

	
}

function update(timeStep) {	

	var speed = self.isPlayer ? 8 : 5;	
	speed *= timeStep;
	node.translate2D([0, speed]);

    if (self.isPlayer) {        

        var bpos = node.position2D;

        // off the top of the screen
        if (bpos[1] > SpaceGame.halfHeight)
        {
            Atomic.destroy(node);
            return;
        }
    }

}
