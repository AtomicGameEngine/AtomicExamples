// Rope Vine

var NUM_OBJECTS = 10;

var node = self.node;

var x = node.position2D[0];
var y = node.position2D[1];
node.position = [0, 0, 0];

function start() {

    // create the node body
    var groundBody = node.createComponent("RigidBody2D");
    groundBody.castShadows = false;

    var prevBody = groundBody;

    for (var i = 0; i < NUM_OBJECTS; i++) {

        // can we create off our node instead of scene?
        var vnode = scene.createChild("RigidBody");
        
        var sprite2D = vnode.createComponent("StaticSprite2D");
        sprite2D.sprite = cache.getResource("Sprite2D", "Sprites/vine.png");
        
        var vbody = vnode.createComponent("RigidBody2D");
        vbody.castShadows = false;
        vbody.bodyType = Atomic.BT_DYNAMIC;

        // Create box
        var vbox = vnode.createComponent("CollisionBox2D");
        // Set friction
        vbox.friction = .2;
        // Set mask bits.
        vbox.maskBits = 0xFFFF & ~0x0002;

        vnode.position = [x + 0.5 + 1.0 * i, y, 0.0];
        vbox.size = [1.0, 0.1];
        vbox.density = 5.0;
        vbox.categoryBits = 0x0001;
        
        if (i == NUM_OBJECTS - 1)
            vbody.angularDamping = 0.4;
        
        var joint = vnode.createComponent("ConstraintRevolute2D");
        joint.otherBody = prevBody;
        joint.anchor = [x + i, y];
        joint.collideConnected = false;
        prevBody = vbody;

    }

    var constraintRope = node.createComponent("ConstraintRope2D");
    constraintRope.otherBody = prevBody;
    constraintRope.ownerBodyAnchor = [x, y];
    constraintRope.maxLength = (NUM_OBJECTS + 0.01);
    
    
}
    // fixme must have an update
function update(timeStep) {
}
