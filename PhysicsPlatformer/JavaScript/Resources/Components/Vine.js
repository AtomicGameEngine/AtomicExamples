"atomic component";

// Rope Vine
var component = function (self) {

var NUM_OBJECTS = 10;

var node = self.node;

//set current node position to 0, 0, 0
node.position = [0, 0, 0];

self.start = function() {

        var x = self.startPosition[0];
        var y = self.startPosition[1];

        // create the node body
        var groundBody = node.createComponent("RigidBody2D");
        //do not cast shadows
        groundBody.castShadows = false;

        var prevBody = groundBody;

        for (var i = 0; i < NUM_OBJECTS; i++) {
            //create a new vine node
            var vnode = node.scene.createChild("RigidBody");
            //add StaticSprite2D to the created node
            var sprite2D = vnode.createComponent("StaticSprite2D");
            //set its sprite
            sprite2D.sprite = Atomic.cache.getResource("Sprite2D", "Sprites/vine.png");

            //create rigid body component
            var vbody = vnode.createComponent("RigidBody2D");
            //do not cast shadows
            vbody.castShadows = false;
            //set body type to Dynamic
            vbody.bodyType = Atomic.BT_DYNAMIC;

            // Create box
            var vbox = vnode.createComponent("CollisionBox2D");
            // Set friction
            vbox.friction = .2;
            // Set mask bits.
            vbox.maskBits = 0xFFFF & ~0x0002;
            //set vine node position
            vnode.position = [x + 0.5 + 1.0 * i, y, 0.0];
            //set box collision size
            vbox.size = [1.0, 0.1];
            //set density
            vbox.density = 5.0;
            //set category bits
            vbox.categoryBits = 0x0001;

            if (i == NUM_OBJECTS - 1)
                vbody.angularDamping = 0.4;

            //create joint component
            var joint = vnode.createComponent("ConstraintRevolute2D");
            //join it to the previous body
            joint.otherBody = prevBody;
            //set ancor
            joint.anchor = [x + i, y];
            joint.collideConnected = false;
            prevBody = vbody;

        }
        //create ConstraintRope2D component
        var constraintRope = node.createComponent("ConstraintRope2D");
        //set other body to the previous body
        constraintRope.otherBody = prevBody;
        constraintRope.ownerBodyAnchor = [x, y];
        constraintRope.maxLength = (NUM_OBJECTS + 0.01);


    };

};

exports.component = component;
