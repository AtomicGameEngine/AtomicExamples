'atomic component';

var viewport = Atomic.renderer.getViewport(0);

//cache resource
var particleEffect = Atomic.cache.getResource("ParticleEffect2D", "Particles/particle.pex");

exports.component = function(self) {

    self.start = function() {
        //touch control
        self.subscribeToEvent("TouchMove", function(event) {
            createButterflyNode([event.x, event.y]);
        });
        self.subscribeToEvent("MultiGesture", function(event) {
            if(event.numFingers >= 2) {
                createButterflyParticle([event.centerX, event.centerY]);
            }
        });
    };

    self.update = function(timeStep) {
        //if Left mouse button is pressed
        if (Atomic.input.getMouseButtonDown(Atomic.MOUSEB_LEFT)) {
            var mousePos = Atomic.input.getMousePosition();
            createButterflyNode(mousePos);
        //if Right mouse button WAS pressed once
        } else if (Atomic.input.getMouseButtonPress(Atomic.MOUSEB_RIGHT)) {
            var mousePos = Atomic.input.getMousePosition();
            createButterflyParticle(mousePos);
        }
    };

    function createButterflyNode(pos) {
      //project mouse screen position to the world position
      pos = viewport.screenToWorldPoint(pos[0], pos[1], 0);
      //create butterfly node
      var butterfly = self.scene.createChild("Butterfly");
      butterfly.position2D = pos;
      butterfly.createJSComponent("Components/Butterfly.js");
    }

    function createButterflyParticle(pos) {
      //create particle emitter
      var emitter = self.scene.createChild("ButterflyEmitter");
      //project mouse screen position to the world position
      pos = viewport.screenToWorldPoint(pos[0], pos[1], 0);
      emitter.position2D = pos;
      var pex = emitter.createComponent("ParticleEmitter2D");
      pex.effect = particleEffect;
    }
};
