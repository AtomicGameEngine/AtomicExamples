// UIPulldownMenu application source code
'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger) {

    //
    // widget event functions
    //

    var filemenu = mylayout.getWidget("FileMenu");
    filemenu.onChanged = function () {
        mylogger.setText( "UIPulldownMenu event : " + filemenu.id + " selected id = " + filemenu.getSelectedId());
    };

    var editmenu = mylayout.getWidget("EditMenu");
    editmenu.onChanged = function () {
        mylogger.setText( "UIPulldownMenu event : " + editmenu.id + " selected id = " + editmenu.getSelectedId());
    };

    var viewmenu = mylayout.getWidget("ViewMenu");
    viewmenu.onChanged = function () {
        mylogger.setText( "UIPulldownMenu event : " + viewmenu.id + " selected id = " + viewmenu.getSelectedId());
    };

    var helpmenu = mylayout.getWidget("HelpMenu");
    helpmenu.onChanged = function () {
        mylogger.setText( "UIPulldownMenu event : " + helpmenu.id + " selected id = " + helpmenu.getSelectedId());
    };

    //
    // support functions
    //

    var button1 = mylayout.getWidget("uipulldownmenucode");
    button1.onClick = function () {
        mylogger.setText( "UIPulldownMenu support : " +  button1.id + " was pressed ");
        utils.viewCode ( "Components/code_uipulldownmenu.js", mylayout );
    };

    var button2 = mylayout.getWidget("uipulldownmenulayout");
    button2.onClick = function () {
        mylogger.setText( "UIPulldownMenu support : " +  button2.id + " was pressed ");
        utils.viewCode ( "Scenes/layout_uipulldownmenu.ui.txt", mylayout );
    };


};

