'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger) {

    var button1 = mylayout.getWidget("uicontainercode");
    button1.onClick = function () {
        mylogger.setText( "UIContainer action : " +  button1.id + " was pressed ");
        utils.viewCode ( "Components/code_uicontainer.js", mylayout );
    };

    var button2 = mylayout.getWidget("uicontainerlayout");
    button2.onClick = function () {
        mylogger.setText( "UIContainer action : " +  button2.id + " was pressed ");
        utils.viewCode ( "Scenes/layout_uicontainer.ui.txt", mylayout );
    };


};

