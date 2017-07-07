// some code from UISceneview2D sample program
'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger) {

    var msvw = mylayout.getWidget("UISceneViewDemo"); // get the container
    if (msvw !== null) {
        mylogger.setText( "UISceneView : already initialized");
        return; // already initialized.
    }

// note : the UISceneView widget does not have a corresponding Turbobadger widget, its ALL Atomic.
// so we have to build it in source code / scripting

    var mysceneview = new Atomic.UISceneView();  // make a scene...view
    mysceneview.id = "UISceneViewDemo"; // tag it, in case we want to get it again later
    if ( mysceneview !== null ) {
        var myscene = Atomic.player.loadScene("Scenes/sceneview.scene"); // creates a new scene, but doesn't load it to the player
        if ( myscene !== null ) {
            var mycamera = myscene.getComponents("Camera", true)[0]; // get camera from the scene
            mysceneview.setView(myscene, mycamera);
            mysceneview.autoUpdate = true;
        } else mylogger.setText( "UISceneView: Cant load Scenes/sceneview.scene");
    } else mylogger.setText( "UISceneView: Didnt create UISceneViewDemo widget");

    var lpx = new Atomic.UILayoutParams();  // size it just right
    lpx.width = 256;
    lpx.height = 256;
    lpx.minWidth = 256;
    lpx.minHeight = 256;
    lpx.maxWidth = 256;
    lpx.maxHeight = 256;
    mysceneview.layoutParams = lpx;

    var mysvc = mylayout.getWidget("sceneviewcontainer"); // get the container layout
    mysvc.addChild(mysceneview);  // drop it in

};

