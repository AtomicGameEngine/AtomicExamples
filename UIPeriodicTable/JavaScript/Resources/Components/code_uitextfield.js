'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger) {

    var button1 = mylayout.getWidget("uitextfieldcode");
    button1.onClick = function () {
        mylogger.setText( "UITextField action : " +  button1.id + " was pressed ");
        utils.viewCode ( "Components/code_uitextfield.js", mylayout );
    };

    var button2 = mylayout.getWidget("uitextfieldlayout");
    button2.onClick = function () {
        mylogger.setText( "UITextField action : " +  button2.id + " was pressed ");
        utils.viewCode ( "Scenes/layout_uitextfield.ui.txt", mylayout );
    };


};

