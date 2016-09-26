'atomic component';
//ParticleSystem component
exports.component = function(self) {
    //link to the current node
    var node = self.node;
    //get emitter
    var emitter = node.getComponent("ParticleEmitter2D");
    //listen to events and set an effect
    self.subscribeToEvent("PlayHearts", function() {
        emitter.effect = Atomic.cache.getResource("ParticleEffect2D", "Particles/love.pex");
    });

    self.subscribeToEvent("PlaySpark", function() {
        emitter.effect = Atomic.cache.getResource("ParticleEffect2D", "Particles/explode.pex");
    });

    self.subscribeToEvent("PlaySnow", function() {
        emitter.effect = Atomic.cache.getResource("ParticleEffect2D", "Particles/snow.pex");
    });

};
