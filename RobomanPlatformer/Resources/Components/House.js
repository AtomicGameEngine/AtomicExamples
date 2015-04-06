var game = Atomic.game;
var node = self.node;

House = self;

var idle = true;

node.position = [0, 0, 0];

node.scale = [11.9, 6, 6];

function start() {

    var cache = game.cache;

    var model = node.createComponent("StaticModel");
    model.setModel(cache.getResource("Model", "Models/House.mdl"));
    model.setMaterial(cache.getResource("Material", "Materials/House.xml"));

    model.castShadows = true;   
     
    var body = node.createComponent("RigidBody");
    body.isKinematic = true;
    body.collisionEventMode = Atomic.COLLISION_ALWAYS;
    
    var shape = node.createComponent("CollisionShape");
    shape.setTriangleMesh(model.getModel());
    shape.size = [1, 1, 1];
    shape.position = [0, 0, 0];
}

function update(timeStep) {

}