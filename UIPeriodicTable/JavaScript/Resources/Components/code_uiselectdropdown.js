// UISelectDropdown application source code
'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger) {

    var dropdown = mylayout.getWidget("selectdropdowndemo");

    //
    // widget event functions
    //

    dropdown.subscribeToEvent( "WidgetEvent", function (ev) {
        if ( ev.type == Atomic.UI_EVENT_TYPE_CHANGED && dropdown == ev.target )
            mylogger.setText( "UISelectDropdown event : " + dropdown.id + " changed value to " + dropdown.text);
    });

    //
    // support functions
    //

    var button5 = mylayout.getWidget("uiselectdropdowncode");
    button5.onClick = function () {
        mylogger.setText( "UISelectDropdown support : " +  button5.id + " was pressed ");
        utils.viewCode ( "Components/code_uiselectdropdown.js", mylayout );
    };

    var button6 = mylayout.getWidget("uiselectdropdownlayout");
    button6.onClick = function () {
        mylogger.setText( "UISelectDropdown support : " +  button6.id + " was pressed ");
        utils.viewCode ( "Scenes/layout_uiselectdropdown.ui.txt", mylayout );
    };

};

