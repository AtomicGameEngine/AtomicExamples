// UIWidget application source code
'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger) {

    //
    // support functions
    //

    var button1 = mylayout.getWidget("uiwidgetcode");
    button1.onClick = function () {
        mylogger.setText( "UIWidget support : " +  button1.id + " was pressed ");
        utils.viewCode ( "Components/code_uiwidget.js", mylayout );
    };

    var button2 = mylayout.getWidget("uiwidgetlayout");
    button2.onClick = function () {
        mylogger.setText( "UIWidget support : " +  button2.id + " was pressed ");
        utils.viewCode ( "Scenes/layout_uiwidget.ui.txt", mylayout );
    };


};

