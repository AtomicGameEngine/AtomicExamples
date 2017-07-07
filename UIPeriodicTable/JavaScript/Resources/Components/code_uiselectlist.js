'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger) {

    var button1 = mylayout.getWidget("selectlistadd");
    button1.onClick = function () {
        var list1 = mylayout.getWidget("UISelectListDemo");
        list1.addItem(list1.numItems, "New Entry");
        mylogger.setText( "UISelectList action : " + list1.id + " appended New Entry");
    };

    var button2 = mylayout.getWidget("selectlistdel");
    button2.onClick = function () {
        var list1 = mylayout.getWidget("UISelectListDemo");
        var si = list1.value; // this is the selected index
        list1.deleteItem(si);
        mylogger.setText( "UISelectList action : " + list1.id + " deleted item " + String(si));
    };

    var button3 = mylayout.getWidget("selectlistdelall");
    button3.onClick = function () {
        var list1 = mylayout.getWidget("UISelectListDemo");
        list1.deleteAllItems();
        mylogger.setText( "UISelectList action : " + list1.id + " deleted all items");
    };

    var button4 = mylayout.getWidget("selectlistnew");
    button4.onClick = function () {
        var listSrc = new Atomic.UISelectItemSource();
        listSrc.addItem(new Atomic.UISelectItem( "list 1","list1", "LogoAtomic" ));
        listSrc.addItem(new Atomic.UISelectItem( "list 2","list2", "" ));
        listSrc.addItem(new Atomic.UISelectItem( "list 3","list3", "" ));
        listSrc.addItem(new Atomic.UISelectItem( "list 4","list4", "" ));
        listSrc.addItem(new Atomic.UISelectItem( "list 5","list5", "" ));
        listSrc.addItem(new Atomic.UISelectItem( "list 6","list6", "" ));
        var list1 = mylayout.getWidget("UISelectListDemo");
        list1.setSource(listSrc);
        mylogger.setText( "UISelectList action : " + list1.id + " added new list entries");
    };

    var mylist = mylayout.getWidget("UISelectListDemo");
    mylist.subscribeToEvent( mylist, "WidgetEvent", function (ev) {
        if ( ev.type == Atomic.UI_EVENT_TYPE_CLICK)
            mylogger.setText( "UISelectList action : " + mylist.id + " selected entry = `" + mylist.getSelectedItemString() + "` value = " + mylist.value);
    });

    var button5 = mylayout.getWidget("uiselectlistcode");
    button5.onClick = function () {
        mylogger.setText( "UISelectList action : " +  button5.id + " was pressed ");
        utils.viewCode ( "Components/code_uiselectlist.js", mylayout );
    };

    var button6 = mylayout.getWidget("uiselectlistlayout");
    button6.onClick = function () {
        mylogger.setText( "UISelectList action : " +  button6.id + " was pressed ");
        utils.viewCode ( "Scenes/layout_uiselectlist.ui.txt", mylayout );
    };

};

