// Atomic Component

var game = Atomic.game;
var view = game.uiView;
var UI = Atomic.UI;

var WIDTH = 512;
var HEIGHT = 512;

// Create the render scene
var scene = new Atomic.Scene();
scene.createComponent("Octree");

// Create the camera node
var cameraNode = scene.createChild("Camera");
cameraNode.position = [0.0, 0.0, -10.0];

// 2D orthographic camera
var camera = cameraNode.createComponent("Camera");
camera.orthographic = true;
camera.orthoSize = HEIGHT * Atomic.PIXEL_SIZE;

// background color
var zone = cameraNode.createComponent("Zone");
zone.fogColor = [0, 0.2, 0.3];

// 2D animated Imp
var node = scene.createChild("Imp");
var animationSet = game.cache.getResource("AnimationSet2D", "Sprites/imp.scml");
var sprite2D = node.createComponent("AnimatedSprite2D");
sprite2D.setAnimation(animationSet, "idle", Atomic.LM_FORCE_LOOPED);

function start() {

  // Create a UIWindow
  var window = new Atomic.UIWindow();
  // It will only have a title bar and won't be resizeable or have a close button
  window.settings = Atomic.UI.WINDOW_SETTINGS_TITLEBAR;
  window.text = "UISceneView2D";
  window.setSize(WIDTH, HEIGHT);

  // The Scene View
  var sceneView = new Atomic.UISceneView();
  sceneView.setView(scene, camera);
  sceneView.autoUpdate = true;
  window.addChild(sceneView);

  // Add to main UI view and center
  view.addChild(window);
  window.center();

}

function update(timeStep) {


}
