// UIScrollContainer application source code
'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger) {

    //
    // support functions
    //

    var button1 = mylayout.getWidget("uiscrollcontainercode");
    button1.onClick = function () {
        mylogger.setText( "UIScrollContainer support : " +  button1.id + " was pressed ");
        utils.viewCode ( "Components/code_uiscrollcontainer.js", mylayout );
    };

    var button2 = mylayout.getWidget("uiscrollcontainerlayout");
    button2.onClick = function () {
        mylogger.setText( "UIScrollContainer support : " +  button2.id + " was pressed ");
        utils.viewCode ( "Scenes/layout_uiscrollcontainer.ui.txt", mylayout );
    };


};

