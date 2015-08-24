// This script is the main entry point of the game
// Require in the event loop handler
// This is necessary if you want to take advantage of setTimeout/clearTimeout, setInterval/clearInterval, setImmediate/clearImmediate
require('AtomicEventLoop');

// it appears that scene needs to be stored in a global so it's not GC'd
var scene;

function createScene() {
    // create a 2D scene
    var scene = new Atomic.Scene();
    scene.createComponent("Octree");

    var cameraNode = scene.createChild("Camera");
    cameraNode.position = [0.0, 0.0, -10.0];

    var camera = cameraNode.createComponent("Camera");
    camera.orthographic = true;
    camera.orthoSize = Atomic.graphics.height * Atomic.PIXEL_SIZE;

    var viewport = null;

    viewport = new Atomic.Viewport(scene, camera);
    Atomic.renderer.setViewport(0, viewport);

    return scene;
}


// Set up the scene, create the star, and set some scheduled events via setTimeout and setInterval
function main() {
    // create a 2D scene
    scene = createScene();

    // create the star node.
    var starNode = scene.createChild('Star');
    var star = starNode.createJSComponent('Components/Star.js');
    starNode.position2D = [0, 0];

    // reverse direction after 2 seconds
    setTimeout(function () {
        star.speed = -100;
    }, 2000);

    // start moving the star after 3 seconds
    setTimeout(function () {
        var currentX = 0,
            currentY = 0;
        starNode.position2D = [currentX, currentY];

        // every 5ms second move the star a little bit more in a diagonal
        // NOTE, you are not going to want to do animations this way,...this is just an example.  Doing it this way ends up introducing a stutter
        var movementId = setInterval(function () {
            currentX += 0.05;
            currentY += 0.05;
            starNode.position2D = [currentX, currentY];
            // stop moving when we get in position
            if (currentX > 2.5 || currentY > 2.5) {
                clearInterval(movementId);
                // handle at the end of this update cycle
                setImmediate(function() {
                    star.speed = 1000;
                });
                
                // set up something that we are going to immediately cancel so it doesn't happen
                var wonthappen  = setImmediate(function() {
                    star.speed = 100;
                });
                
                clearImmediate(wonthappen);
            }
        }, 5);
    }, 3000);
}
main();

// we don't need an update handler here, but if we don't set one up, then main gets GC'd
module.exports.update = function(timeStep) {};
