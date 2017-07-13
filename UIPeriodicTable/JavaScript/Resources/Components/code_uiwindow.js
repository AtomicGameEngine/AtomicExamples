// UIWindow application source code
'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger,myview) {

    //
    // action functions
    //

    var button1 = mylayout.getWidget("windowdemo");
    button1.onClick = function () {
        var window = new Atomic.UIWindow();
        window.setSettings ( Atomic.UI_WINDOW_SETTINGS_TITLEBAR + Atomic.UI_WINDOW_SETTINGS_RESIZABLE + Atomic.UI_WINDOW_SETTINGS_CLOSE_BUTTON );
        window.text = "UIWindow demo (a login dialog)";
        window.load("Scenes/login_dialog.ui.txt");
        window.resizeToFitContent();
        myview.addChild(window);
        window.center();
        window.getWidget("login").onClick = function () {
            mylogger.setText( "UIWindow action : the window `" + window.text + "` was closed with login");
            window.die();
            window = null;
        };
        window.getWidget("cancel").onClick = function () {
            mylogger.setText( "UIWindow action : the window `" + window.text + "` was closed with cancel");
            window.die();
            window = null;
        };
    };

    var button2 = mylayout.getWidget("windowdemo1");
    button2.onClick = function () {
        var window2 = new Atomic.UIWindow();
        window2.setSettings ( Atomic.UI_WINDOW_SETTINGS_TITLEBAR + Atomic.UI_WINDOW_SETTINGS_RESIZABLE + Atomic.UI_WINDOW_SETTINGS_CLOSE_BUTTON );
        window2.text = "UIWindow demo (a table)";
        window2.load("Scenes/sheet.ui.txt");
        window2.resizeToFitContent();
        myview.addChild(window2);
        window2.center();
    };

    //
    // support functions
    //

    var button3 = mylayout.getWidget("uiwindowcode");
    button3.onClick = function () {
        mylogger.setText( "UIWindow support : " +  button3.id + " was pressed ");
        utils.viewCode ( "Components/code_uiwindow.js", mylayout );
    };

    var button4 = mylayout.getWidget("uiwindowlayout");
    button4.onClick = function () {
        mylogger.setText( "UIWindow support : " +  button4.id + " was pressed ");
        utils.viewCode ( "Scenes/layout_uiwindow.ui.txt", mylayout );
    };

};

