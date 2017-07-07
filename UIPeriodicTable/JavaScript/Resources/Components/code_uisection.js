'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger) {


    var sec1 = mylayout.getWidget("UISectionDemo");
    sec1.subscribeToEvent( sec1, "WidgetEvent", function (ev) {
        mylogger.setText( "UISection action : " + sec1.id + " generated event type = " + ev.type + " value = " + sec1.value);
    });

    var sec2 = mylayout.getWidget("UISection2Demo");
    sec2.subscribeToEvent( sec2, "WidgetEvent", function (ev) {
        mylogger.setText( "UISection action : " + sec2.id + " generated event type = " + ev.type + " value = " + sec2.value);
    });

    var button4 = mylayout.getWidget("uisectioncode");
    button4.onClick = function () {
        mylogger.setText( "UISection action : " +  button4.id + " was pressed");
        utils.viewCode ( "Components/code_uisection.js", mylayout );
    };

    var button5 = mylayout.getWidget("uisectionlayout");
    button5.onClick = function () {
        mylogger.setText( "UISection action : " +  button5.id + " was pressed ");
        utils.viewCode ( "Scenes/layout_uisection.ui.txt", mylayout );
    };


};

