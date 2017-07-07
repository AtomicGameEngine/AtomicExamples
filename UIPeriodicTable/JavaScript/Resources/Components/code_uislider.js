'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger) {

    var slider1 = mylayout.getWidget("sliderdemo");
    slider1.onChanged = function(ev) {
        mylogger.setText( "UISlider action : " + slider1.id + " changed value to " +  slider1.value);
    };

    var button1 = mylayout.getWidget("uislidercode");
    button1.onClick = function () {
        mylogger.setText( "UISlider action : " +  button1.id + " was pressed ");
        utils.viewCode ( "Components/code_uislider.js", mylayout );
    };

    var button2 = mylayout.getWidget("uisliderlayout");
    button2.onClick = function () {
        mylogger.setText( "UISlider action : " +  button2.id + " was pressed ");
        utils.viewCode ( "Scenes/layout_uislider.ui.txt", mylayout );
    };

};

