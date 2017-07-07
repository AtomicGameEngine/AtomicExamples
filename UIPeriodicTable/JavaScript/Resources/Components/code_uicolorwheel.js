'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger) {

    var cwx = mylayout.getWidget("colorwheeldemo");
    cwx.onEvent = function(ev) {
        mylogger.setText( "UIColorWheel action : " + cwx.id +  " hue = " +cwx.getHue() + " saturation = " + cwx.getSaturation());
    };

    var button1 = mylayout.getWidget("uicolorwheelcode");
    button1.onClick = function () {
        mylogger.setText( "UIColorWheel action : " +  button1.id + " was pressed ");
        utils.viewCode ( "Components/code_uicolorwheel.js", mylayout );
    };

    var button2 = mylayout.getWidget("uicolorwheellayout");
    button2.onClick = function () {
        mylogger.setText( "UIColorWheel action : " +  button2.id + " was pressed ");
        utils.viewCode ( "Scenes/layout_uicolorwheel.ui.txt", mylayout );
    };

};

