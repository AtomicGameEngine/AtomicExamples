// UIPromptWindow application source code
'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger,myview) {

    //
    // widget event functions
    //

    var button1 = mylayout.getWidget("stringfinder");
    button1.onClick = function () {
        var prompt = new Atomic.UIPromptWindow(myview, "myprompt");
        prompt.show(  "WindowTitle", "Message in window", "preset value", 0, 0, 0);
        prompt.subscribeToEvent( prompt, "UIPromptComplete", function (ev) {
            mylogger.setText( "UIPromptWindow event : " + prompt.id + "the window `" + ev.title + "` string was `" + ev.selected + "`, the button pressed was " + ev.reason);
        });
    };
    
    //
    // support functions
    //

    var button3 = mylayout.getWidget("uipromptwindowcode");
    button3.onClick = function () {
        mylogger.setText( "UIPromptWindow support : " +  button3.id + " was pressed ");
        utils.viewCode ( "Components/code_uipromptwindow.js", mylayout );
    };

    var button2 = mylayout.getWidget("uipromptwindowlayout");
    button2.onClick = function () {
        mylogger.setText( "UIPromptWindow support : " +  button2.id + " was pressed ");
        utils.viewCode ( "Scenes/layout_uipromptwindow.ui.txt", mylayout );
    };

};

