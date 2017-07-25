// UIColorWidget application source code
'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger) {

    //
    // action functions
    //

    var button4 = mylayout.getWidget("uicolorwidgetred");
    button4.onClick = function () {
        mylogger.setText( "UIColorWidget action : " +  button4.id + " was pressed ");
        mylayout.getWidget("colorwidgetdemo").setColorString("#FF1111");
    };

    var button5 = mylayout.getWidget("uicolorwidgetgreen");
    button5.onClick = function () {
        mylogger.setText( "UIColorWidget action : " +  button5.id + " was pressed ");
        mylayout.getWidget("colorwidgetdemo").setColorString("#11FF11");
    };

    var button6 = mylayout.getWidget("uicolorwidgetblue");
    button6.onClick = function () {
        mylogger.setText( "UIColorWidget action : " +  button6.id + " was pressed ");
        mylayout.getWidget("colorwidgetdemo").setColorString("#1111FF");
    };

    //
    // support functions
    //

    var button1 = mylayout.getWidget("uicolorwidgetcode");
    button1.onClick = function () {
        mylogger.setText( "UIColorWidget support : " +  button1.id + " was pressed ");
        utils.viewCode ( "Components/code_uicolorwidget.js", mylayout );
    };

    var button2 = mylayout.getWidget("uicolorwidgetlayout");
    button2.onClick = function () {
        mylogger.setText( "UIColorWidget support : " +  button2.id + " was pressed ");
        utils.viewCode ( "Scenes/layout_uicolorwidget.ui.txt", mylayout );
    };

};

