// UITabContainer application source code
'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger) {

    var tb = mylayout.getWidget("UITabContainerDemo");
    tb.setCurrentPage(0);   // fix or it looks like crap

    //
    // widget event functions
    //

    tb.subscribeToEvent( "WidgetEvent", function (ev) {
        if ( ev.type == Atomic.UI_EVENT_TYPE_TAB_CHANGED && tb == ev.target ) {
            mylogger.setText( "UITabContainer event : " + tb.id + " UI_EVENT_TYPE_TAB_CHANGED to " + tb.getCurrentPage() + " id: " + tb.getCurrentPageWidget().id);
        }
    });

    //
    // action functions
    //

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
        lo.setLayoutConfig ( "YAGAC" );  // YACAC!
        
        var myeditfield = new Atomic.UIEditField();
        myeditfield.setGravity( Atomic.UI_GRAVITY_ALL);
        myeditfield.setMultiline(true);
        var filex = Atomic.cache.getFile("Components/code_uitabcontainer.js");
        var textx = filex.readText();
        filex.close(); 
        myeditfield.text = textx;

        var myfont = new Atomic.UIFontDescription(); // put in a coder font
        myfont.setSize(16);
        myfont.setId("Vera");
        myeditfield.setFontDescription (myfont);

        lo.addChild (myeditfield);
        tb.addTabPageWidget("New Code", lo);
    };

    var button0 = mylayout.getWidget("uitabcontainerundock");
    button0.onClick = function () {
        mylogger.setText( "UITabContainer action : " +  button0.id + " was pressed ");
        var current = tb.getCurrentPage();
        tb.undockPage(current);
    };
    var button00 = mylayout.getWidget("uitabcontainerredock");
    button00.onClick = function () {
        mylogger.setText( "UITabContainer action : " +  button00.id + " was pressed ");
        if ( !tb.dockWindow ( "tab1" ) )
            if ( !tb.dockWindow ( "tab2" ) )
                if ( !tb.dockWindow ( "tab3" ) )
                    if ( !tb.dockWindow ( "New File" ) )
                        if ( !tb.dockWindow ( "New Code" ) )
                                mylogger.setText( "UITabContainer action : no more windows to dock.");
    };

    //
    // support functions
    //

    var button4 = mylayout.getWidget("uitabcontainercode");
    button4.onClick = function () {
        mylogger.setText( "UITabContainer support : " +  button4.id + " was pressed ");
        utils.viewCode ( "Components/code_uitabcontainer.js", mylayout );
    };

    var button5 = mylayout.getWidget("uitabcontainerlayout");
    button5.onClick = function () {
        mylogger.setText( "UITabContainer support : " +  button5.id + " was pressed ");
        utils.viewCode ( "Scenes/layout_uitabcontainer.ui.txt", mylayout );
    };

};

