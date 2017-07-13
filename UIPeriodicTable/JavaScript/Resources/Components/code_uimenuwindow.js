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
        mis.addItem( new Atomic.UIMenuItem( "UISelectItem2", "item3", "Ctrl+A", "DuckButton" ) );
        mis.addItem( new Atomic.UIMenuItem( "UISelectItem3", "item4", "Ctrl+O", "LogoAtomic" ) );

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

