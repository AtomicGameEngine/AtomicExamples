// UILayoutParams application source code
'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger) {

    //
    // support functions
    //

    var button1 = mylayout.getWidget("uilayoutparamscode");
    button1.onClick = function () {
        mylogger.setText( "UILayoutParams support : " +  button1.id + " was pressed ");
        utils.viewCode ( "Components/code_uilayoutparams.js", mylayout );
    };

    var button2 = mylayout.getWidget("uilayoutparamslayout");
    button2.onClick = function () {
        mylogger.setText( "UILayoutParams support : " +  button2.id + " was pressed ");
        utils.viewCode ( "Scenes/layout_uilayoutparams.ui.txt", mylayout );
    };

};

