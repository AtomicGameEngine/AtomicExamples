'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger) {

    var button1 = mylayout.getWidget("uiskinimagecode");
    button1.onClick = function () {
        mylogger.setText( "UISkinImage action : " +  button1.id + " was pressed ");
        utils.viewCode ( "Components/code_uiskinimage.js", mylayout );
    };

    var button2 = mylayout.getWidget("uiskinimagelayout");
    button2.onClick = function () {
        mylogger.setText( "UISkinImage action : " +  button2.id + " was pressed ");
        utils.viewCode ( "Scenes/layout_uiskinimage.ui.txt", mylayout );
    };

};

