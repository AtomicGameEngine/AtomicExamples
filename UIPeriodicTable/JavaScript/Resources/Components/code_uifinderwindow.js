// UIFinderWindow application source code
'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger,myview) {

    //
    // widget event and action functions
    //
    var button1 = mylayout.getWidget("filefinder");
    button1.onClick = function () {
        var finder = new Atomic.UIFinderWindow(myview, "myfinder");
        finder.findFile("Find a File", "", 0, 0, 0);
        finder.subscribeToEvent(finder, "UIFinderComplete", function (ev) {
            mylogger.setText( "UIFinderWindow event : " + finder.id +  " the window " + ev.title + " file was " + ev.selected + ", the button pressed was " + ev.reason);
        });
    };

    var button2 = mylayout.getWidget("folderfinder");
    button2.onClick = function () {
        var finder = new Atomic.UIFinderWindow(myview, "myfinder");
        finder.findPath("Find a Folder", "", 0, 0, 0);
        finder.subscribeToEvent(finder, "UIFinderComplete", function (ev) {
            mylogger.setText( "UIFinderWindow event : " + finder.id +  " the window " + ev.title + " folder was " + ev.selected + ", the button pressed was " + ev.reason);

        });
    };

    //
    // support functions
    //

    var button3 = mylayout.getWidget("uifinderwindowcode");
    button3.onClick = function () {
        mylogger.setText( "UIFinderWindow support : " +  button3.id + " was pressed ");
        utils.viewCode ( "Components/code_uifinderwindow.js", mylayout );
    };

    var button4 = mylayout.getWidget("uifinderwindowlayout");
    button4.onClick = function () {
        mylogger.setText( "UIFinderWindow support : " +  button4.id + " was pressed ");
        utils.viewCode ( "Scenes/layout_uifinderwindow.ui.txt", mylayout );
    };

};

