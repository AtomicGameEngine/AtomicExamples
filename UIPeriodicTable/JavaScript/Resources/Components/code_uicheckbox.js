'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger) {

    var button1 = mylayout.getWidget("democheck");
    button1.onClick = function () {
        mylogger.setText( "UICheckBox action : " +  button1.id + " state is " + button1.value);
    };

    var button2 = mylayout.getWidget("checkset");
    button2.onClick = function () {
        mylayout.getWidget("democheck").value = 1;
        mylogger.setText( "UICheckBox action : " +  button1.id + " set to 1");
    };

    var button3 = mylayout.getWidget("checkunset");
    button3.onClick = function () {
        mylayout.getWidget("democheck").value = 0;
        mylogger.setText( "UICheckBox action : " +  button1.id + " set to 0");
    };

    var button4 = mylayout.getWidget("uicheckboxcode");
    button4.onClick = function () {
        mylogger.setText( "UICheckBox action : " +  button4.id + " was pressed ");
        utils.viewCode ( "Components/code_uicheckbox.js", mylayout );
    };

    var button5 = mylayout.getWidget("uicheckboxlayout");
    button5.onClick = function () {
        mylogger.setText( "UICheckBox action : " +  button5.id + " was pressed ");
        utils.viewCode ( "Scenes/layout_uicheckbox.ui.txt", mylayout );
    };




};

