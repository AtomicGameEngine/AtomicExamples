'atomic component';

exports.component = function(self) {

    var node = self.node;

    var emitter = node.getComponent("ParticleEmitter2D");

    self.subscribeToEvent("PlayHearts", function() {
        emitter.effect = Atomic.cache.getResource("ParticleEffect2D", "Particles/love.pex");
    });

    self.subscribeToEvent("PlaySpark", function() {
        emitter.effect = Atomic.cache.getResource("ParticleEffect2D", "Particles/explode.pex");
    });

    self.subscribeToEvent("PlaySnow", function() {
        emitter.effect = Atomic.cache.getResource("ParticleEffect2D", "Particles/snow.pex");
    });

}