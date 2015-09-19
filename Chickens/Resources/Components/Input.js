"atomic component";

var component = function(self) {

    var yaw = 0;
    var pitch = 0;
    var node = self.node;

    // Movement speed as world units per second
    var MOVE_SPEED = 20.0;
    // Mouse sensitivity as degrees per pixel
    var MOUSE_SENSITIVITY = 0.1;

    //start function called when component attached to the node, after constructor
    self.start = function() {

        Atomic.audio.listener = node.getComponent("SoundListener");

    }

    //update function called once per each frame
    self.update = function(timeStep) {

        // Use this frame's mouse motion to adjust camera node yaw and pitch. Clamp the pitch between -90 and 90 degrees
        var mouseMove = Atomic.input.mouseMove;

        yaw += MOUSE_SENSITIVITY * mouseMove[0];
        pitch += MOUSE_SENSITIVITY * mouseMove[1];

        if (pitch < -90)
            pitch = 90;
        if (pitch > 90)
            pitch = 90;

        // Construct new orientation for the camera scene node from yaw and pitch. Roll is fixed to zero

        node.rotation = QuatFromEuler(pitch, yaw, 0.0);

        // Read WASD keys and move the camera scene node to the corresponding direction if they are pressed
        if (Atomic.input.getKeyDown(Atomic.KEY_W))
            node.translate([0, 0, MOVE_SPEED * timeStep]);
        if (Atomic.input.getKeyDown(Atomic.KEY_S))
            node.translate([0, 0, -MOVE_SPEED * timeStep]);
        if (Atomic.input.getKeyDown(Atomic.KEY_D))
            node.translate([MOVE_SPEED * timeStep, 0, 0]);
        if (Atomic.input.getKeyDown(Atomic.KEY_A))
            node.translate([-MOVE_SPEED * timeStep, 0, 0]);


    }

}

//Math function to get Quaternion from Euler angles
function QuatFromEuler(x, y, z) {
    var M_PI = 3.14159265358979323846264338327950288;
    var q = [0, 0, 0, 0];
    x *= (M_PI / 360);
    y *= (M_PI / 360);
    z *= (M_PI / 360);
    var sinX = Math.sin(x);
    var cosX = Math.cos(x);
    var sinY = Math.sin(y);
    var cosY = Math.cos(y);
    var sinZ = Math.sin(z);
    var cosZ = Math.cos(z);
    q[0] = cosY * cosX * cosZ + sinY * sinX * sinZ;
    q[1] = cosY * sinX * cosZ + sinY * cosX * sinZ;
    q[2] = sinY * cosX * cosZ - cosY * sinX * sinZ;
    q[3] = cosY * cosX * sinZ - sinY * sinX * cosZ;
    return q;
}


exports.component = component;
