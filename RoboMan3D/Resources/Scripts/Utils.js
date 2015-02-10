


function CreateCrateStack(x, z, crates) {

    var scene = Atomic.game.scene;

    y = 1;

    for (var i = 0; i < crates; i++) {
        
        var crate = scene.createChild("Crate");
        crate.position = [x, y, z]; 
        crate.createJSComponent("Crate");
        
        y += 2;
        
    }

}

function QuatFromEuler(x, y, z) {

    M_PI = 3.14159265358979323846264338327950288;

    var q = [0, 0, 0, 0];

    // Order of rotations: Z first, then X, then Y (mimics typical FPS camera with gimbal lock at top/bottom)
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


