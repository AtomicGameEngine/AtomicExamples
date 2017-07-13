// UIScrollBar application source code
'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger) {

    var sb = mylayout.getWidget("scrollbardemo");

    //
    // widget event functions
    //

    sb.subscribeToEvent( "WidgetEvent", function (ev) {
        if ( ev.type == Atomic.UI_EVENT_TYPE_CHANGED && sb == ev.target )
            mylogger.setText( "UIScrollBar event : " + sb.id + " changed value = `" + sb.value + "` event type = " + utils.eventReport(ev.type));
    });

    //
    // support functions
    //

    var button5 = mylayout.getWidget("uiscrollbarcode");
    button5.onClick = function () {
        mylogger.setText( "UIScrollBar support : " +  button5.id + " was pressed ");
        utils.viewCode ( "Components/code_uiscrollbar.js", mylayout );
    };

    var button6 = mylayout.getWidget("uiscrollbarlayout");
    button6.onClick = function () {
        mylogger.setText( "UIScrollBar support : " +  button6.id + " was pressed ");
        utils.viewCode ( "Scenes/layout_uiscrollbar.ui.txt", mylayout );
    };

};

