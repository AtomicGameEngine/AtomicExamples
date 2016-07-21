// This script is the main entry point of the game


var scene = Atomic.player.loadScene("Scenes/TheScene.scene");
var camera = scene.getChild("Camera").getComponent("Camera");
camera.setOrthoSize(Atomic.graphics.height * .7 * Atomic.PIXEL_SIZE);

/*

// create a scene
var scene = new Atomic.Scene();

// create an octree component
scene.createComponent("Octree");

// create out camera
var cameraNode = scene.createChild("Camera");
var camera = cameraNode.createComponent("Camera");

// setup as 2D
camera.setOrthographic(true);
//Atomic.PIXEL_SIZE / 2 means that our pixels are doubled up
camera.setOrthoSize(Atomic.graphics.height * Atomic.PIXEL_SIZE / 2);

// create a viewport
var viewport = new Atomic.Viewport(scene, camera);
Atomic.renderer.setViewport(0, viewport);

// create our spawner component
scene.createJSComponent("Components/Spawner.js");

createInstructions();

function createInstructions() {

    var view = new Atomic.UIView();

    // Create a layout, otherwise child widgets won't know how to size themselves
    // and would manually need to be sized
    var layout = new Atomic.UILayout();

    // specify the layout region
    layout.rect = view.rect;

    view.addChild(layout);

    // we're laying out on the X axis so "position" controls top and bottom alignment
    layout.layoutPosition = Atomic.UI_LAYOUT_POSITION_RIGHT_BOTTOM;
    // while "distribution" handles the Y axis
    layout.layoutDistributionPosition = Atomic.UI_LAYOUT_DISTRIBUTION_POSITION_RIGHT_BOTTOM;

    var fd = new Atomic.UIFontDescription();
    fd.id = "Vera";
    fd.size = 18;

    var scoreText = new Atomic.UIEditField();
    scoreText.fontDescription = fd;
    scoreText.readOnly = true;
    scoreText.multiline = true;
    scoreText.adaptToContentSize = true;
    scoreText.text = "Atomic Butterflies\nLeft Mouse - Spawn Butterflies\nRight Click - Spawn Particles";
    layout.addChild(scoreText);


}

*/
