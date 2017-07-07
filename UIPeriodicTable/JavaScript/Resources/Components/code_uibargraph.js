'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger) {

    var button1 = mylayout.getWidget("uibargraphcode");
    button1.onClick = function () {
        mylogger.setText( "UIBargraph action : " +  button1.id + " was pressed ");
        utils.viewCode ( "Components/code_uibargraph.js", mylayout );
    };

    var button2 = mylayout.getWidget("uibargraphlayout");
    button2.onClick = function () {
        mylogger.setText( "UIBargraph action : " +  button2.id + " was pressed ");
        utils.viewCode ( "Scenes/layout_uibargraph.ui.txt", mylayout );
    };

};

