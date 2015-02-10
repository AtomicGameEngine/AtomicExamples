var game = Atomic.game;
var node = self.node;

var emitter;

self.setEffect = function(name) {

    emitter.effect = game.cache.getResource("ParticleEffect2D", "Particles/" + name + ".pex");

}

function start() {

	emitter = node.createComponent("ParticleEmitter2D");
	
	self.setEffect("love");
	
}

function update(timeStep) {	


}