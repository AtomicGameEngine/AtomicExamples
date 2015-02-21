

var game = Atomic.game;
var node = self.node;

var animationSet = game.cache.getResource("AnimationSet2D", "Sprites/imp.scml");
var sprite2D = node.createComponent("AnimatedSprite2D");

self.playAnimation = function(animation) {

    sprite2D.setAnimation(animationSet, animation, Atomic.LM_FORCE_LOOPED);
}

function start() {
	
	sprite2D.setAnimation(animationSet, "idle");
	
}

