// UIRadioButton application source code
'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger) {

    //
    // widget event functions
    //

    var button1 = mylayout.getWidget("demoradio");
    button1.onClick = function () {
        mylogger.setText( "UIRadioButton event : " +  button1.id + " state is " + button1.value);
    };

    //
    // action functions
    //

   var button2 = mylayout.getWidget("radioset");
    button2.onClick = function () {
        mylayout.getWidget("demoradio").value = 1;
        mylogger.setText( "UIRadioButton action : " +  button1.id + " set to 1");
    };

    var button3 = mylayout.getWidget("radiounset");
    button3.onClick = function () {
        mylayout.getWidget("demoradio").value = 0;
        mylogger.setText( "UIRadioButton action : " +  button1.id + " set to 0");
    };
    
    //
    // support functions
    //

    var button5 = mylayout.getWidget("uiradiobuttoncode");
    button5.onClick = function () {
        mylogger.setText( "UIRadioButton support : " +  button5.id + " was pressed ");
        utils.viewCode ( "Components/code_uiradiobutton.js", mylayout );
    };

    var button6 = mylayout.getWidget("uiradiobuttonlayout");
    button6.onClick = function () {
        mylogger.setText( "UIRadioButton support : " +  button6.id + " was pressed ");
        utils.viewCode ( "Scenes/layout_uiradiobutton.ui.txt", mylayout );
    };


};

