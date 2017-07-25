// UISeparator application source code
'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger) {

    //
    // support functions
    //

    var button1 = mylayout.getWidget("uiseparatorcode");
    button1.onClick = function () {
        mylogger.setText( "UISeparator support : " +  button1.id + " was pressed ");
        utils.viewCode ( "Components/code_uiseparator.js", mylayout );
    };

    var button2 = mylayout.getWidget("uiseparatorlayout");
    button2.onClick = function () {
        mylogger.setText( "UISeparator support : " +  button2.id + " was pressed ");
        utils.viewCode ( "Scenes/layout_uiseparator.ui.txt", mylayout );
    };


};

