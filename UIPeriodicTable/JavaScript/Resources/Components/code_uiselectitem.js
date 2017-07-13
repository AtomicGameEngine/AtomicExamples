// UISelectItem and UISelectItemSource application source code
'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger) {

    //
    // action functions
    //

    var mylist = new Atomic.UISelectList();
    mylist.id = "UISelectItemList"; // tag it, in case we want to get it again later

    var lpx = new Atomic.UILayoutParams();  // size it just right
    lpx.width = 200;
    lpx.height = 256;
    lpx.minWidth = 200;
    lpx.minHeight = 256;
    lpx.maxWidth = 200;
    lpx.maxHeight = 256;
    mylist.layoutParams = lpx;

    var lower = mylayout.getWidget("selectitemlower"); // get the container layout
    var myc = mylayout.getWidget("selectitemlayout"); // get the container layout
    myc.addChildBefore(mylist, lower);  // drop it in

    var sis = new Atomic.UISelectItemSource();  // make the selectitemsource

    // put in some default UISelectItems
    sis.addItem( new Atomic.UISelectItem( "UISelectItem1", "item1" ) );
    sis.addItem( new Atomic.UISelectItem( "UISelectItem2", "item2", "DuckButton" ) );
    sis.addItem( new Atomic.UISelectItem( "UISelectItem3", "item3", "LogoAtomic" ) );
    mylist.setSource(sis);

    var button1 = mylayout.getWidget("uisi1");
    button1.onClick = function () {
        mylogger.setText( "UISelectItem action : " +  button1.id + " was pressed ");
        sis.addItem( new Atomic.UISelectItem( "New UISelectItem") );
        mylist.setSource(sis);
    };

    var button2 = mylayout.getWidget("uisi2");
    button2.onClick = function () {
        mylogger.setText( "UISelectItem action : " +  button2.id + " was pressed ");
        sis.addItem( new Atomic.UISelectItem( "Newer UISelectItem", "neweritem" ) );
        mylist.setSource(sis);
    };

    var button3 = mylayout.getWidget("uisi3");
    button3.onClick = function () {
        mylogger.setText( "UISelectItem action : " +  button3.id + " was pressed ");
        sis.addItem( new Atomic.UISelectItem( "A Duck", "aduck", "DuckButton" ) );
        mylist.setSource(sis);
    };

    var button4 = mylayout.getWidget("uisi4");
    button4.onClick = function () {
        mylogger.setText( "UISelectItem action : " +  button4.id + " was pressed ");
        sis.addItem( new Atomic.UISelectItem( "Atomic!", "atomic", "LogoAtomic" ) );
        mylist.setSource(sis);
    };

    var button5 = mylayout.getWidget("uisi5");
    button5.onClick = function () {
        mylogger.setText( "UISelectItem action : " +  button5.id + " was pressed ");
        sis.clear();
        mylist.setSource(sis);
    };

    //
    // widget event functions
    //

    mylist.subscribeToEvent( mylist, "WidgetEvent", function (ev) {
        if ( ev.type == Atomic.UI_EVENT_TYPE_CLICK)
            mylogger.setText( "UISelectItem event : " + mylist.id + " selected entry = `" + mylist.getSelectedItemString() + "` value = " + mylist.value);
    });

    //
    // support functions
    //

    var button9 = mylayout.getWidget("uiselectitemcode");
    button9.onClick = function () {
        mylogger.setText( "UISelectItem support : " +  button9.id + " was pressed ");
        utils.viewCode ( "Components/code_uiselectitem.js", mylayout );
    };

    var button8 = mylayout.getWidget("uiselectitemlayout");
    button8.onClick = function () {
        mylogger.setText( "UISelectItem support : " +  button8.id + " was pressed ");
        utils.viewCode ( "Scenes/layout_uiselectitem.ui.txt", mylayout );
    };


};

