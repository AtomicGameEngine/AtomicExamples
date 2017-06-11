"atomic component";

var glmatrix = require("gl-matrix");
var quat = glmatrix.quat;
var vec3 = glmatrix.vec3;
var MATH_RAD_TO_DEG = 360 / Math.PI
exports.component = function(self) {
    var BRAKE_FORCE = 0.028;
    var MOVE_FORCE = 0.3;

    var camNode
    var charNode
    var charBody
    var charAnimCtrl

    var cameraToCharVector
    var camera
    var screenWidth
    var screenHeight
    self.start = function() {
        charNode = self.node
        camera = charNode.scene.getMainCamera()
        camNode = camera.node

        cameraToCharVector = [0, 0, 0]
        var charPos = [0, 0, 0]

        // We define the cameraToCharVector as the vector with origin in the character
        // and that ends up on the camera position.
        // Initial vector value is computed from the initial state of the scene.
        vec3.add(cameraToCharVector, camNode.getWorldPosition(), vec3.negate(charPos, charNode.getWorldPosition()))

        charBody = charNode.getComponent("RigidBody")
        charBody.angularFactor = [0, 0, 0]
        charAnimCtrl = charNode.getComponent("AnimationController");
        // Set the rigidbody to signal collision also when in rest, so that we get ground collisions properly
        charBody.collisionEventMode = Atomic.COLLISION_ALWAYS;

        screenWidth = Atomic.graphics.width
        screenHeight = Atomic.graphics.height
    }

    self.update = function(timeStep) {
        var mousePos = Atomic.input.getMousePosition()

        var inputData = updateInputData()

        // Update movement & animation
        var velocity = charBody.getLinearVelocity();

        var moveDir = [0, 0, 0];

        if (inputData.moveUp) {
            vec3.add(moveDir, moveDir, [0, 0, -1]);
        }
        if (inputData.moveDown) {
            vec3.add(moveDir, moveDir, [0, 0, 1]);
        }
        if (inputData.moveLeft) {
            vec3.add(moveDir, moveDir, [1, 0, 0]);
        }
        if (inputData.moveRight) {
            vec3.add(moveDir, moveDir, [-1, 0, 0]);
        }

        // Scale the vector to match the acceleration of the character
        vec3.normalize(moveDir, moveDir)
        vec3.scale(moveDir, moveDir, MOVE_FORCE);
        charBody.applyImpulse(moveDir)

        // Velocity on the XZ plane
        var planeVelocity = [velocity[0], 0.0, velocity[2]]
        vec3.negate(planeVelocity, planeVelocity)
        vec3.scale(planeVelocity, planeVelocity, BRAKE_FORCE)
        charBody.applyImpulse(planeVelocity)

        var newCamPos = [0, 0, 0]
        vec3.add(newCamPos, charNode.getWorldPosition(), cameraToCharVector)
        camNode.setWorldPosition(newCamPos)

        var scene = self.node.scene
        var octree = scene.getComponent("Octree")

        var origin = camNode.getWorldPosition()

        var mouseX = inputData.mousePos[0]
        var mouseY = inputData.mousePos[1]

        // Create a ray from the origin (users POV) that passes through the (mouseX, mouseY) point
        // in the near plane of the camera.
        var ray = camera.getScreenRay(mouseX / screenWidth, mouseY / screenHeight)

        // Perform raycasting
        var rayCastHits = octree.rayCastSingle(ray, Atomic.RAY_TRIANGLE, 250, Atomic.DRAWABLE_GEOMETRY)

        // If we hit something we take into account the XZ coordinates of the
        // hit object and get the vector describing the direction to which the
        // character is heading
        if (rayCastHits) {
          var charHeadingPlaneXZ = [0, 0,- 1]
          var rayHitPosPlaneXZ = rayCastHits.position
          rayHitPosPlaneXZ[1] = 0
          var charPosPlaneXZ = charNode.getWorldPosition()
          charPosPlaneXZ[1] = 0
          var charHeading = vec3.add([0, 0, 0], rayHitPosPlaneXZ, vec3.negate([0, 0, 0], charPosPlaneXZ))
          charHeadingPlaneXZ = charHeading
          charHeadingPlaneXZ[1] = 0

          var initHeading = [0, 0, -1]
          vec3.normalize(initHeading, initHeading)
          vec3.normalize(charHeadingPlaneXZ, charHeadingPlaneXZ)
          // Create a rotation quaternion to describe rotation from characters initial
          // heading to the computed char heading direction
          var rotationQ = quat.rotationTo([0, 0, 0, 0], [0, 0, -1], charHeadingPlaneXZ)

          // Here there is a little gotcha with quaternion math and JS
          // The engine expects the quaternion components to be ordered
          // differently than gl-matrix order so we just switch the order to match
          // the engines before appling rotation.
          quat.set(rotationQ, rotationQ[3], rotationQ[0], rotationQ[1], rotationQ[2])
          charNode.rotation = rotationQ
        }

        var idle = !(Math.abs(velocity[0]) >= 0.01 || Math.abs(velocity[2]) > 0.01)
        if (idle)
          charAnimCtrl.playExclusive("Idle", 0, true, 0.0)
        else
          charAnimCtrl.playExclusive("Run", 0, true, 0.0)
    }
}

function updateInputData() {
    var input = Atomic.input;

    moveUp = false;
    moveDown = false;
    moveLeft = false;
    moveRight = false;
    button0 = false;
    button1 = false;

    //check input
    if (input.getKeyDown(Atomic.KEY_W) || input.getKeyDown(Atomic.KEY_UP))
        moveUp = true;
    if (input.getKeyDown(Atomic.KEY_S) || input.getKeyDown(Atomic.KEY_DOWN))
        moveDown = true;
    if (input.getKeyDown(Atomic.KEY_A) || input.getKeyDown(Atomic.KEY_LEFT))
        moveLeft = true;
    if (input.getKeyDown(Atomic.KEY_D) || input.getKeyDown(Atomic.KEY_RIGHT))
        moveRight = true;

    if (input.getKeyPress(Atomic.KEY_F))
        button0 = true;
    if (input.getKeyPress(Atomic.KEY_SPACE))
        button1 = true;

    return {
        moveUp: moveUp,
        moveDown: moveDown,
        moveLeft: moveLeft,
        moveRight: moveRight,
        mousePos: input.getMousePosition()
    }
}
