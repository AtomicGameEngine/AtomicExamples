'atomic component';
//ParticleSystem component
exports.component = function(self) {
    //link to the current node
    var node = self.node;
    //get emitter
    var emitter = node.getComponent("ParticleEmitter2D");
    //listen to events and set an effect
    self.subscribeToEvent(Atomic.ScriptEvent("PlayHearts", function() {
        emitter.effect = Atomic.cache.getResource("ParticleEffect2D", "Particles/love.pex");
    }));

    self.subscribeToEvent(Atomic.ScriptEvent("PlaySpark", function() {
        emitter.effect = Atomic.cache.getResource("ParticleEffect2D", "Particles/explode.pex");
    }));

    self.subscribeToEvent(Atomic.ScriptEvent("PlaySnow", function() {
        emitter.effect = Atomic.cache.getResource("ParticleEffect2D", "Particles/snow.pex");
    }));

};
