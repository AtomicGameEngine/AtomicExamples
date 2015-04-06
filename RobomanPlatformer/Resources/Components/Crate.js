// Atomic Component

var game = Atomic.game;
var node = self.node;

function start() {

    var cache = game.cache;

    var model = node.createComponent("StaticModel");
    model.setModel(cache.getResource("Model", "Models/Crate.mdl"));
    model.setMaterial(cache.getResource("Material", "Materials/Crate.xml"));
    model.castShadows = true;
    
    var body = node.createComponent("RigidBody");
    body.mass = 1;
    body.friction = 1;
    body.collisionEventMode = Atomic.COLLISION_NEVER;
    var shape = node.createComponent("CollisionShape");
    shape.setBox([2, 2, 2]);
    
}

function update(timeStep) {

}