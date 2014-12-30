

var node = self.node;

node.scale2D = [.2, .2];
var fire = node.createComponent("ParticleEmitter2D");
fire.setEffect(cache.getResource("ParticleEffect2D", "Particles/fire.pex"));