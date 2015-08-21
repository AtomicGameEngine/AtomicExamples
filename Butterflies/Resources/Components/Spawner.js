'atomic component';

var viewport = Atomic.renderer.getViewport(0);

var particleEffect = Atomic.cache.getResource("ParticleEffect2D", "Particles/particle.pex");

exports.component = function(self) {

    self.update = function(timeStep) {

        if (Atomic.input.getMouseButtonDown(Atomic.MOUSEB_LEFT)) {

            var mpos = Atomic.input.getMousePosition();
            var pos = viewport.screenToWorldPoint(mpos[0], mpos[1], 0);

            var butterfly = self.scene.createChild("Butterfly");
            butterfly.position2D = pos;
            butterfly.createJSComponent("Components/Butterfly.js");

        } else if (Atomic.input.getMouseButtonPress(Atomic.MOUSEB_RIGHT)) {

            var emitter = self.scene.createChild("ButterflyEmitter");
            var mpos = Atomic.input.getMousePosition();
            var pos = viewport.screenToWorldPoint(mpos[0], mpos[1], 0);
            emitter.position2D = pos;
            var pex = emitter.createComponent("ParticleEmitter2D");
            pex.effect = particleEffect;

        }

    }

}