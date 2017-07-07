'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger) {

    var button1 = mylayout.getWidget("uiseparatorcode");
    button1.onClick = function () {
        mylogger.setText( "UISeparator action : " +  button1.id + " was pressed ");
        utils.viewCode ( "Components/code_uicontainer.js", mylayout );
    };

    var button2 = mylayout.getWidget("uiseparatorlayout");
    button2.onClick = function () {
        mylogger.setText( "UISeparator action : " +  button2.id + " was pressed ");
        utils.viewCode ( "Scenes/layout_uiseparator.ui.txt", mylayout );
    };


};

