// UIClickLabel application source code
'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger) {

    //
    // widget event functions
    //

    var button1 = mylayout.getWidget("somecheck");
    button1.onClick = function () {
        mylogger.setText( "UIClickLabel event : on " +  button1.id + " state is " + button1.value);
    };

    var button4 = mylayout.getWidget("someradio");
    button4.onClick = function () {
        mylogger.setText( "UIClickLabel event : on " +  button4.id + " state is " + button1.value);
    };

    //
    // support functions
    //

   var button2 = mylayout.getWidget("uiclicklabelcode");
   button2.onClick = function () {
        mylogger.setText( "UIClickLabel support : " +  button2.id + " was pressed ");
        utils.viewCode ( "Components/code_uiclicklabel.js", mylayout );
    };

    var button3 = mylayout.getWidget("uiclicklabellayout");
    button3.onClick = function () {
        mylogger.setText( "UIClickLabel support : " +  button3.id + " was pressed ");
        utils.viewCode ( "Scenes/layout_uiclicklabel.ui.txt", mylayout );
    };

};

