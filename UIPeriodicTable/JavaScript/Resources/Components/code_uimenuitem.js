'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger) {

    var button1 = mylayout.getWidget("uimenuitemcode");
    button1.onClick = function () {
        mylogger.setText( "UIMenuItem action : " +  button1.id + " was pressed ");
        utils.viewCode ( "Components/code_uimenuitem.js", mylayout );
    };

    var button2 = mylayout.getWidget("uimenuitemlayout");
    button2.onClick = function () {
        mylogger.setText( "UIMenuItem action : " +  button2.id + " was pressed ");
        utils.viewCode ( "Scenes/layout_uimenuitem.ui.txt", mylayout );
    };


};

