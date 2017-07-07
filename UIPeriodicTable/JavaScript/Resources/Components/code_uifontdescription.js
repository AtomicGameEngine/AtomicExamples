'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger) {

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

    var button5 = mylayout.getWidget("uifontdecsriptioncode");
    button5.onClick = function () {
        mylogger.setText( "UIFontdescription action : " +  button5.id + " was pressed ");
        utils.viewCode ( "Components/code_uifontdecsription.js", mylayout );
    };

    var button6 = mylayout.getWidget("uifontdecsriptionlayout");
    button6.onClick = function () {
        mylogger.setText( "UIFontdescription action : " +  button6.id + " was pressed ");
        utils.viewCode ( "Scenes/layout_uifontdecsription.ui.txt", mylayout );
    };

};

