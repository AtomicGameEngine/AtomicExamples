'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger) {

    var button1 = mylayout.getWidget("msgnone");
    button1.onClick = function () {
        var mess1 = new Atomic.UIMessageWindow(mylayout, "mymess1");
        mess1.show("MessageWindow - NONE", "this is a MessageWindow - None button", 0, 0, 0, 0);
    };

    var button2 = mylayout.getWidget("msgok");
    button2.onClick = function () {
        var mess2 = new Atomic.UIMessageWindow(mylayout, "mymess2");
        mess2.show("MessageWindow - OK", "this is a MessageWindow - OK button", Atomic.UI_MESSAGEWINDOW_SETTINGS_OK, 0, 0, 0);
        mess2.onEvent = function (ev) {
            mylogger.setText( "UIMessageWindow action : " + mess2.id +  " was closed by " + ev.refID);
        };

    };

    var button3 = mylayout.getWidget("msgkcancel");
    button3.onClick = function () {
        var mess3 = new Atomic.UIMessageWindow(mylayout, "mymess3");
        mess3.show("MessageWindow - OK CANCEL", "this is a MessageWindow - OK CANCEL buttons", Atomic.UI_MESSAGEWINDOW_SETTINGS_OK_CANCEL, 0, 0, 0);
        mess3.onEvent = function (ev) {
            mylogger.setText( "UIMessageWindow action : " + mess3.id + " was closed by " + ev.refID);
        };
    };

    var button4 = mylayout.getWidget("msgyesno");
    button4.onClick = function () {
        var mess4 = new Atomic.UIMessageWindow(mylayout, "mymess4");
        mess4.show("MessageWindow - YES NO", "this is a MessageWindow - YES NO buttons", Atomic.UI_MESSAGEWINDOW_SETTINGS_YES_NO, 0, 0, 0);
        mess4.onEvent = function (ev) {
            mylogger.setText( "UIMessageWindow action : " +mess4.id + " was closed by " + ev.refID);
        };
    };

    var button5 = mylayout.getWidget("uimessagewindowcode");
    button5.onClick = function () {
        mylogger.setText( "UIMessageWindow action : " +  button5.id + " was pressed ");
        utils.viewCode ( "Components/code_uimessagewindow.js", mylayout );
    };

    var button6 = mylayout.getWidget("uimessagewindowlayout");
    button6.onClick = function () {
        mylogger.setText( "UIMessageWindow action : " +  button6.id + " was pressed ");
        utils.viewCode ( "Scenes/layout_uimessagewindow.ui.txt", mylayout );
    };

};

