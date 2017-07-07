'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger) {

    var button3 = mylayout.getWidget("imagecolor");
    button3.onClick = function () {
        mylogger.setText( "UIImageWidget action : " +  button3.id + " was pressed ");
        var img = mylayout.getWidget("imagewidgetdemo" );
        img.setImage("Textures/HSV21.png");
    };
    var button4 = mylayout.getWidget("imagenewbuild");
    button4.onClick = function () {
        mylogger.setText( "UIImageWidget action : " +  button4.id + " was pressed ");
        var img = mylayout.getWidget("imagewidgetdemo" );
        img.setImage("Textures/newbuilddetected_header.jpg");
    };

    var button5 = mylayout.getWidget("uiimagewidgetcode");
    button5.onClick = function () {
        mylogger.setText( "UIImageWidget action : " +  button5.id + " was pressed ");
        utils.viewCode ( "Components/code_uiimagewidget.js", mylayout );
    };

    var button6 = mylayout.getWidget("uiimagewidgetlayout");
    button6.onClick = function () {
        mylogger.setText( "UIImageWidget action : " +  button6.id + " was pressed ");
        utils.viewCode ( "Scenes/layout_uiimagewidget.ui.txt", mylayout );
    };
};

