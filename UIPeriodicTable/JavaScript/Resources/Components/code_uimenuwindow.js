// UIMenuWindow application source code
'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger) {

    //
    // action functions
    //

    var button1 = mylayout.getWidget("uimenuwindowpush");
    button1.onClick = function () {
        mylogger.setText( "UIMenuWindow action : " +  button1.id + " was pressed ");

        var mymenuwindow = new Atomic.UIMenuWindow( mylayout, "MenuWindowDemo");

        var mis = new Atomic.UIMenuItemSource();

        mis.addItem( new Atomic.UIMenuItem( "UISelectItem1", "item1" ) );
        mis.addItem( new Atomic.UIMenuItem( "UISelectItem2", "item2", "Ctrl+C" ) );
        mis.addItem( new Atomic.UIMenuItem( "UISelectItem3", "item3", "Ctrl+A", "DuckButton" ) );
        mis.addItem( new Atomic.UIMenuItem( "UISelectItem4", "item4", "Ctrl+O", "LogoAtomic" ) );

        var xx = button1.x + (button1.width/2);
        var yy = button1.y + (button1.height/2);
        mymenuwindow.show(mis, xx, yy);

    //
    // widget event functions
    //

        mymenuwindow.subscribeToEvent( "WidgetEvent", function (ev) {
            if ( ev.type == Atomic.UI_EVENT_TYPE_CLICK && ev.target == mymenuwindow )
                mylogger.setText( "UIMenuWindow event : " + mymenuwindow.id + " selected entry id = " + ev.refID + " event type = " + utils.eventReport(ev.type));
            if ( ev.type == Atomic.UI_EVENT_TYPE_SHORTCUT )
                mylogger.setText( "UIMenuWindow event : " + mymenuwindow.id + " Shortcut id = " + ev.refID + " event type = " + utils.eventReport(ev.type));
        });

        mymenuwindow.subscribeToEvent( "UIShortcut", function (ev) {
               mylogger.setText( "UIMenuWindow event : " + mymenuwindow.id + " Shortcut key = " + ev.key + " qualifiers = " +  ev.qualifiers );
        });

        mymenuwindow.subscribeToEvent( "UIUnhandledShortcut", function (ev) {
               mylogger.setText( "UIMenuWindow event : " + mymenuwindow.id + " UIUnhandledShortcut id = " + ev.refid );
        });

    };

    var topw = mylayout.getWidget("uimenuwindowtop");
    topw.subscribeToEvent( "WidgetEvent", function (ev) {
        if ( ev.type == Atomic.UI_EVENT_TYPE_RIGHT_POINTER_UP && ev.target == topw ) {
                mylogger.setText( "UIMenuWindow event : " + topw.id + " target id = " + ev.target.id + " event type = " + utils.eventReport(ev.type));
            var mypoppup = new Atomic.UIMenuWindow( mylayout, "MenuPopupDemo");
            var mix = new Atomic.UIMenuItemSource();
            mix.addItem( new Atomic.UIMenuItem( "UISelectItem1", "popup1", "Ctrl+A", "DuckButton" ) );
            mix.addItem( new Atomic.UIMenuItem( "UISelectItem2", "popup2", "Ctrl+C" ) );
            mix.addItem( new Atomic.UIMenuItem( "UISelectItem3", "popup3" ) );
            mix.addItem( new Atomic.UIMenuItem( "UISelectItem4", "popup4", "Ctrl+O", "LogoAtomic" ) );
            var xx = ev.x;
            var yy = ev.y;
            mypoppup.show(mix, xx, yy);
            mypoppup.subscribeToEvent( "WidgetEvent", function (ev) {
                if ( ev.type == Atomic.UI_EVENT_TYPE_CLICK && ev.target == mypoppup )
                    mylogger.setText( "UIMenuWindow event : " + mypoppup.id + " popup entry id = " + ev.refID + " event type = " + utils.eventReport(ev.type));
            });
        }
    });


    //
    // support functions
    //

    var button2 = mylayout.getWidget("uimenuwindowcode");
    button2.onClick = function () {
        mylogger.setText( "UIMenuWindow support : " +  button2.id + " was pressed ");
        utils.viewCode ( "Components/code_uimenuwindow.js", mylayout );
    };

    var button3 = mylayout.getWidget("uimenuwindowlayout");
    button3.onClick = function () {
        mylogger.setText( "UIMenuWindow support : " +  button3.id + " was pressed ");
        utils.viewCode ( "Scenes/layout_uimenuwindow.ui.txt", mylayout );
    };

};

