'atomic component';

var WIDTH = 512;
var HEIGHT = 512;

exports.component = function(self) {

    var scene = Atomic.player.loadScene("Scenes/2DScene.scene");
    var cameras = scene.getComponents("Camera", true);

    var view = new Atomic.UIView();

    // Create a UIWindow
    var window = new Atomic.UIWindow();
    // It will only have a title bar and won't be resizeable or have a close button
    window.settings = Atomic.UI_WINDOW_SETTINGS_TITLEBAR;
    window.text = "UISceneView2D";
    window.setSize(WIDTH, HEIGHT);

    // The Scene View
    var sceneView = new Atomic.UISceneView();
    sceneView.setView(scene, cameras[0]);
    sceneView.autoUpdate = true;
    window.addChild(sceneView);

    // Add to main UI view and center
    view.addChild(window);
    window.center();

}