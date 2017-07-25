// UISection application source code
'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger) {

    //
    // widget event functions
    //

    var sec1 = mylayout.getWidget("UISectionDemo");
    sec1.subscribeToEvent( sec1, "WidgetEvent", function (ev) {
        mylogger.setText( "UISection event : " + sec1.id + " generated event type = " + utils.eventReport(ev.type) + " value = " + sec1.value);
    });

    var sec2 = mylayout.getWidget("UISection2Demo");
    sec2.subscribeToEvent( sec2, "WidgetEvent", function (ev) {
        mylogger.setText( "UISection event : " + sec2.id + " generated event type = " + utils.eventReport(ev.type) + " value = " + sec2.value);
    });

    //
    // support functions
    //

    var button4 = mylayout.getWidget("uisectioncode");
    button4.onClick = function () {
        mylogger.setText( "UISection support : " +  button4.id + " was pressed");
        utils.viewCode ( "Components/code_uisection.js", mylayout );
    };

    var button5 = mylayout.getWidget("uisectionlayout");
    button5.onClick = function () {
        mylogger.setText( "UISection support : " +  button5.id + " was pressed ");
        utils.viewCode ( "Scenes/layout_uisection.ui.txt", mylayout );
    };


};

