// UIMenuItem and UIMenuItemSource application source code
'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger) {

    //
    // action functions
    //

    // make the MenuItemSource to use with the menu
    var mis = new Atomic.UIMenuItemSource();  

    // put in some default UIMenuItems in the MenuItemSource
    mis.addItem( new Atomic.UIMenuItem( "UIMenuItem1", "item1" ) );
    mis.addItem( new Atomic.UIMenuItem( "UIMenuItem2", "item2", "Ctrl+." ) );
    mis.addItem( new Atomic.UIMenuItem( "UIMenuItem2", "item2", "", "DuckButton" ) );
    mis.addItem( new Atomic.UIMenuItem( "UIMenuItem3", "item3", "CTrl+A", "LogoAtomic" ) );

    var button1 = mylayout.getWidget("uimenuitempush");
    button1.onClick = function () {
        mylogger.setText( "UIMenuWindow action : " +  button1.id + " was pressed ");

        var mymenuwindow = new Atomic.UIMenuWindow( mylayout, "MenuItemDemo");

        var xx = button1.x + (button1.width/2);
        var yy = button1.y + (button1.height/2);

        mymenuwindow.show(mis, xx, yy);   // use the existing menuitem source, show in the middle of the button, if possible

    //
    // widget event functions
    //

        mymenuwindow.subscribeToEvent( "WidgetEvent", function (ev) {
            if ( ev.type == Atomic.UI_EVENT_TYPE_CLICK && ev.target == mymenuwindow )
                mylogger.setText( "UIMenuItem event : " + mymenuwindow.id + " selected entry id = " + ev.refID + " event type = " + utils.eventReport(ev.type));
            if ( ev.type == Atomic.UI_EVENT_TYPE_SHORTCUT )
                mylogger.setText( "UIMenuItem event : " + mymenuwindow.id + " Shortcut id = " + ev.refID + " event type = " + utils.eventReport(ev.type));
        });

        mymenuwindow.subscribeToEvent( "UIShortcut", function (ev) {
               mylogger.setText( "UIMenuItem event : " + mymenuwindow.id + " Shortcut key = " + ev.key + " qualifiers = " +  ev.qualifiers );
        });

        mymenuwindow.subscribeToEvent( "UIUnhandledShortcut", function (ev) {
               mylogger.setText( "UIMenuItem event : " + mymenuwindow.id + " UIUnhandledShortcut id = " + ev.refid );
        });

    };

    var button2 = mylayout.getWidget("uimi1");
    button2.onClick = function () {
        mylogger.setText( "UIMenuItem action : " +  button2.id + " was pressed ");
        mis.addItem( new Atomic.UIMenuItem( "New UIMenuItem") );
    };

    var button3 = mylayout.getWidget("uimi2");
    button3.onClick = function () {
        mylogger.setText( "UIMenuItem action : " +  button3.id + " was pressed ");
        mis.addItem( new Atomic.UIMenuItem( "Newer UIMenuItem", "neweritem" ) );
    };

    var button4 = mylayout.getWidget("uimi3");
    button4.onClick = function () {
        mylogger.setText( "UIMenuItem action : " +  button4.id + " was pressed ");
        mis.addItem( new Atomic.UIMenuItem( "A Duck", "aduck", "", "DuckButton" ) );
    };

    var button5 = mylayout.getWidget("uimi4");
    button5.onClick = function () {
        mylogger.setText( "UIMenuItem action : " +  button5.id + " was pressed ");
        mis.addItem( new Atomic.UIMenuItem( "Atomic!", "atomic", "", "LogoAtomic" ) );
    };

    var button6 = mylayout.getWidget("uimi5");
    button6.onClick = function () {
        mylogger.setText( "UIMenuItem action : " +  button6.id + " was pressed ");
        mis.clear();
    };

    //
    // support functions
    //

    var button8 = mylayout.getWidget("uimenuitemcode");
    button8.onClick = function () {
        mylogger.setText( "UIMenuItem support : " +  button8.id + " was pressed ");
        utils.viewCode ( "Components/code_uimenuitem.js", mylayout );
    };

    var button9 = mylayout.getWidget("uimenuitemlayout");
    button9.onClick = function () {
        mylogger.setText( "UIMenuItem support : " +  button9.id + " was pressed ");
        utils.viewCode ( "Scenes/layout_uimenuitem.ui.txt", mylayout );
    };

};

