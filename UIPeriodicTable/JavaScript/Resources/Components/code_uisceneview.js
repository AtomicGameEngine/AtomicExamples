// UISceneView application source code
// some code from UISceneview2D sample program
'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger) {

    var msvw = mylayout.getWidget("UISceneViewDemo"); // get the container
    if (msvw !== null) {
        mylogger.setText( "UISceneView : already initialized");
        return; // already initialized.
    }


    //
    // action functions
    //

// note : the UISceneView widget does not have a corresponding Turbobadger widget, its ALL Atomic.
// so we have to build it in source code / scripting, no problem.

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
    lpx.width = 640;
    lpx.height = 320;
    lpx.minWidth = 640;
    lpx.minHeight = 320;
    lpx.maxWidth = 640;
    lpx.maxHeight = 320;
    mysceneview.layoutParams = lpx;

    var lower = mylayout.getWidget("uisceneviewlower");
    var mysvc = mylayout.getWidget("sceneviewcontainer"); // get the container layout
    mysvc.addChildBefore(mysceneview, lower);  // drop it in

    //
    // support functions
    //

    var button1 = mylayout.getWidget("uisceneviewcode");
    button1.onClick = function () {
        mylogger.setText( "UISceneView support : " +  button1.id + " was pressed ");
        utils.viewCode ( "Components/code_uisceneview.js", mylayout );
    };

    var button2 = mylayout.getWidget("uisceneviewlayout");
    button2.onClick = function () {
        mylogger.setText( "UISceneView support : " +  button2.id + " was pressed ");
        utils.viewCode ( "Scenes/layout_uisceneview.ui.txt", mylayout );
    };

};

