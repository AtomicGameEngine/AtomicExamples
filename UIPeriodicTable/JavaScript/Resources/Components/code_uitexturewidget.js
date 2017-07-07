'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger) {


    var mytexturewidget = new Atomic.UITextureWidget();  // make a widget
    mytexturewidget.id = "UITextureWidgetDemo"; // tag it, in case we want to get it again later
    if ( mytexturewidget !== null ) {
        var mytex = new Atomic.Texture2D();
        if ( mytex !== null ) {
            mytex = Atomic.cache.getResource("Texture2D", "Textures/planet.jpg");
            mytexturewidget.setTexture(mytex);
        } else mylogger.setText( "UITextureWidget : Cant set texture");
    } else mylogger.setText( "UITextureWidget : Didnt create UITextureWidgetDemo widget");

    var lpx = new Atomic.UILayoutParams();  // size it just right
    lpx.width = 256;
    lpx.height = 256;
    lpx.minWidth = 256;
    lpx.minHeight = 256;
    lpx.maxWidth = 256;
    lpx.maxHeight = 256;
    mytexturewidget.layoutParams = lpx;

    var myc = mylayout.getWidget("uitwcontainer"); // get the container layout
    myc.addChild(mytexturewidget);  // drop it in

    var b1 = new Atomic.UIButton();
    b1.id = "uitexturewidgetch1";
    b1.text = "Change texture to new build";
    myc.addChild(b1);
    b1.onClick = function () {
        mylogger.setText( "UITextureWidget action : " +  b1.id + " was pressed ");
        var tex1 = mylayout.getWidget("UITextureWidgetDemo" );
        tex1.setTexture(Atomic.cache.getResource("Texture2D", "Textures/newbuilddetected_header.jpg") );
    };

    var b2 = new Atomic.UIButton();
    b2.id = "uitexturewidgetch2";
    b2.text = "Change texture to colorwheel";
    myc.addChild(b2);
    b2.onClick = function () {
        mylogger.setText( "UITextureWidget action : " +  b2.id + " was pressed ");
        var tex1 = mylayout.getWidget("UITextureWidgetDemo" );
        tex1.setTexture(Atomic.cache.getResource("Texture2D", "Textures/HSV21.png") );
    };

    var b3 = new Atomic.UIButton();
    b3.id = "uitexturewidgetch3";
    b3.text = "Change texture to planet";
    myc.addChild(b3);
    b3.onClick = function () {
        mylogger.setText( "UITextureWidget action : " +  b3.id + " was pressed ");
        var tex1 = mylayout.getWidget("UITextureWidgetDemo" );
        tex1.setTexture(Atomic.cache.getResource("Texture2D", "Textures/planet.jpg") );
    };

};

