'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger) {


    var button1 = mylayout.getWidget("demobutton");
    button1.onClick = function () {
        mylogger.setText( "UIButton action : " +  button1.id + " was pressed ");
    };

    var button2 = mylayout.getWidget("buttonducky");
    button2.onClick = function () {
        mylogger.setText( "UIButton action : " +  button2.id + " was pressed ");
    };

    var button3 = mylayout.getWidget("buttonready");
    button3.onClick = function () {
        mylogger.setText( "UIButton action : " +  button3.id + " was pressed ");
    };

    var button4 = mylayout.getWidget("buttonatomic");
    button4.onClick = function () {
        mylogger.setText( "UIButton action : " +  button4.id + " was pressed ");
    };

    var button7 = mylayout.getWidget("buttongreen");
    button7.onClick = function () {
        mylogger.setText( "UIButton action : " +  button7.id + " was pressed ");
    };

    var button5 = mylayout.getWidget("uibuttoncode");
    button5.onClick = function () {
        mylogger.setText( "UIButton action : " +  button5.id + " was pressed ");
        utils.viewCode ( "Components/code_uibutton.js", mylayout );
    };

    var button6 = mylayout.getWidget("uibuttonlayout");
    button6.onClick = function () {
        mylogger.setText( "UIButton action : " +  button6.id + " was pressed ");
        utils.viewCode ( "Scenes/layout_uibutton.ui.txt", mylayout );
    };
};

