//UIListView application source code
'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger) {

    var mlvw = mylayout.getWidget("UIListViewDemo"); // get the container
    if (mlvw !== null) {
        mylogger.setText( "UIListView : already initialized");
        return; // already initialized.
    }

// note : the UIListView widget does not have a corresponding Turbobadger widget, its ALL Atomic.
// so we have to build it in source code / scripting

    //
    // action functions
    //

    var myListview = new Atomic.UIListView();  // make a List...view
    myListview.id = "UIListViewDemo"; // tag it, in case we want to get it again later

    var lpx = new Atomic.UILayoutParams();  // size it just right
    lpx.width = 256;
    lpx.height = 256;
    lpx.minWidth = 256;
    lpx.minHeight = 256;
    lpx.maxWidth = 256;
    lpx.maxHeight = 256;
    myListview.layoutParams = lpx;

    var lower = mylayout.getWidget("uilistviewlower");
    var mylvc = mylayout.getWidget("listviewcontainer"); // get the container layout
    mylvc.addChildBefore(myListview, lower);  // drop it in


    // OMG what the heck was he thinking!
   
    // there is no external way of converting a name to an itemLookup_ ???

    var rootsids = [];  // now fill it up

    var id1 = myListview.addRootItem("root1", "", "root1");
    rootsids.push(id1);
    var id2 = myListview.addChildItem(id1, "rootish2", "", "root2");
    rootsids.push(id2);
    var id3 = myListview.addChildItem(id1, "rootish3", "", "root3");
    rootsids.push(id3);
    var id4 = myListview.addChildItem(id1, "rootish4", "", "root4");
    rootsids.push(id4);
    var id5 = myListview.addChildItem(id1, "rootish5", "", "root5");
    rootsids.push(id5);

    var nn;
    for ( nn=7; nn<55; nn++)
        rootsids.push( myListview.addChildItem(id2, "child " + nn, "", "child " + nn ) );

    myListview.setExpanded(id1,true);
    myListview.setExpanded(id2,false);

    //
    // widget event functions
    //


     myListview.subscribeToEvent("UIListViewSelectionChanged", function (ev) {
             var selectedId = myListview.selectedItemID; /// hmmm same as the refid...
             mylogger.setText( "UIListView event : " + myListview.id + "  refid=" +  ev.refid + "  selected=" +  ev.selected + " sid=" + selectedId );
        });

    //
    // support functions
    //

    var button1 = mylayout.getWidget("uilistviewcode");
    button1.onClick = function () {
        mylogger.setText( "UIListView support : " +  button1.id + " was pressed ");
        utils.viewCode ( "Components/code_uilistview.js", mylayout );
    };

    var button2 = mylayout.getWidget("uilistviewlayout");
    button2.onClick = function () {
        mylogger.setText( "UIListView support : " +  button2.id + " was pressed ");
        utils.viewCode ( "Scenes/layout_uilistview.ui.txt", mylayout );
    };

};

