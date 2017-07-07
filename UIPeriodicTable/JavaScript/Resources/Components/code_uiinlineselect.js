'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger) {

    var ils = mylayout.getWidget("inlineselectdemo");
    ils.onChanged = function(ev) {
        mylogger.setText( "UIInlineSelect action : " + ils.id + " changed value to " + String (ils.value));
    };

    var steps = mylayout.getWidget("ilsstep");
    steps.onChanged = function(ev) {
        ils.setStepSize (steps.value);
        mylogger.setText( "UIInlineSelect action : " + steps.id + " step size changed to " + String (steps.value));
    };

    var button5 = mylayout.getWidget("uiinlineselectcode");
    button5.onClick = function () {
        mylogger.setText( "UIInlineSelect action : " +  button5.id + " was pressed ");
        utils.viewCode ( "Components/code_uiinlineselect.js", mylayout );
    };

    var button6 = mylayout.getWidget("uiinlineselectlayout");
    button6.onClick = function () {
        mylogger.setText( "UIInlineSelect action : " +  button6.id + " was pressed ");
        utils.viewCode ( "Scenes/layout_uiinlineselect.ui.txt", mylayout );
    };
};

