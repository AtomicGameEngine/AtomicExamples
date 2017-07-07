'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger) {

    var tb = mylayout.getWidget("UITabContainerDemo");
    tb.setCurrentPage(0);   // fix or it looks like crap

    tb.subscribeToEvent( "WidgetEvent", function (ev) {
        if ( ev.type == Atomic.UI_EVENT_TYPE_TAB_CHANGED && tb == ev.target ) {
            mylogger.setText( "UITabContainer action : " + tb.id + " UI_EVENT_TYPE_TAB_CHANGED to " + tb.getCurrentPage() + " id: " + tb.getCurrentPageWidget().id);
        }
    });

    var button1 = mylayout.getWidget("uitabcontainerremove");
    button1.onClick = function () {
        mylogger.setText( "UITabContainer action : " +  button1.id + " was pressed ");
        var current = tb.getCurrentPage();
        tb.deletePage(current);
    };

    var button2 = mylayout.getWidget("uitabcontaineradd");
    button2.onClick = function () {
        mylogger.setText( "UITabContainer action : " +  button2.id + " was pressed ");
        tb.addTabPageFile("New File", "Scenes/sheet.ui.txt" );
    };

    var button3 = mylayout.getWidget("uitabcontainermake");
    button3.onClick = function () {
        mylogger.setText( "UITabContainer action : " +  button3.id + " was pressed ");
        var lo = new Atomic.UILayout();
        lo.setLayoutConfig ( "YACAC" );  // YACAC!
        lo.addChild ( new Atomic.UIButton() );
        lo.addChild ( new Atomic.UIButton() );
        lo.addChild ( new Atomic.UIButton() );
        lo.addChild ( new Atomic.UIButton() );
        lo.addChild ( new Atomic.UIButton() );
        tb.addTabPageWidget("New Code", lo );
    };

    var button4 = mylayout.getWidget("uitabcontainercode");
    button4.onClick = function () {
        mylogger.setText( "UITabContainer action : " +  button4.id + " was pressed ");
        utils.viewCode ( "Components/code_uitabcontainer.js", mylayout );
    };

    var button5 = mylayout.getWidget("uitabcontainerlayout");
    button5.onClick = function () {
        mylogger.setText( "UITabContainer action : " +  button5.id + " was pressed ");
        utils.viewCode ( "Scenes/layout_uitabcontainer.ui.txt", mylayout );
    };

};

