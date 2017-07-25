// UIFontdescription application source code
'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger) {

    //
    // action functions
    //

   var steps = mylayout.getWidget("fontstep");
    steps.onChanged = function(ev) {
        var mytext = mylayout.getWidget("changetext");
        var myfont = new Atomic.UIFontDescription();
        myfont.setSize(Math.round (steps.value));
        myfont.setId("Vera");
        mytext.setFontDescription (myfont);
        mytext.setText ( "Size " + String (Math.round (steps.value) ));
        mylogger.setText( "UIFontdescription action : " + steps.id + " step size changed to " + String (steps.value));
    };

    //
    // support functions
    //

    var button5 = mylayout.getWidget("uifontdescriptioncode");
    button5.onClick = function () {
        mylogger.setText( "UIFontdescription support : " +  button5.id + " was pressed ");
        utils.viewCode ( "Components/code_uifontdescription.js", mylayout );
    };

    var button6 = mylayout.getWidget("uifontdescriptionlayout");
    button6.onClick = function () {
        mylogger.setText( "UIFontdescription support : " +  button6.id + " was pressed ");
        utils.viewCode ( "Scenes/layout_uifontdescription.ui.txt", mylayout );
    };

};

