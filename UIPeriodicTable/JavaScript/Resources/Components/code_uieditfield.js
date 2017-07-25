// UIEditField application source code
'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger) {

    var ef1 = mylayout.getWidget("editfieldsingle");

    //
    // widget event functions
    //

    // this will tell you something occured, just not what it was...
    ef1.subscribeToEvent( ef1, "WidgetEvent", function (ev) {
        mylogger.setText( "UIEditField event : " + ef1.id + " text = `" + ef1.text + "` event type = " + utils.eventReport(ev.type));
    });

    // insert a file into the editfield
    var ef2 = mylayout.getWidget("editfieldmulti");
    ef2.subscribeToEvent( ef2, "WidgetEvent", function (ev) {
        mylogger.setText( "UIEditField event : " + ef2.id + " text = `" + ef2.text + "` event type = " + utils.eventReport(ev.type));
    });

    //
    // action functions
    //

    var button1 = mylayout.getWidget("editfieldadd");
    button1.onClick = function () {
        var filex = Atomic.cache.getFile("Scenes/layout_uieditfield.ui.txt");
        var textx = filex.readText();
        mylayout.getWidget("editfieldmulti").text = textx;
        mylogger.setText( "UIEditField action : " + ef2.id + " added file Scenes/layout_uieditfield.ui.txt");
    };

    var button2 = mylayout.getWidget("editfieldclr");
    button2.onClick = function () {
        mylayout.getWidget("editfieldmulti").text = "";
        mylogger.setText( "UIEditField action : cleared " + ef2.id);
    };

    //
    // support functions
    //

    var button4 = mylayout.getWidget("uieditfieldcode");
    button4.onClick = function () {
        mylogger.setText( "UIEditField support : " +  button4.id + " was pressed ");
        utils.viewCode ( "Components/code_uieditfield.js", mylayout );
    };

    var button5 = mylayout.getWidget("uieditfieldlayout");
    button5.onClick = function () {
        mylogger.setText( "UIEditField support : " +  button5.id + " was pressed ");
        utils.viewCode ( "Scenes/layout_uieditfield.ui.txt", mylayout );
    };


};

