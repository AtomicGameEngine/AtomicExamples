// UILayout application source code
'use strict';
var utils = require("Scripts/utils");

exports.init = function(mylayout,mylogger,myview) {

    var myc = mylayout.getWidget("uilayoutcontainer"); // get the container layout

    //
    // support functions
    //

    var tf0 = new Atomic.UIButton();  // the layout-o-matic spawner
    tf0.text = "LAYOUT-O-MATIC";
    tf0.id = "go_layout_config";
    var lo0 = new Atomic.UILayout();
    lo0.id = "target_layout";
    lo0.setLayoutConfig ( "-----" );
    lo0.load("Scenes/simp_button.ui.txt");
    lo0.addChildBefore(tf0, lo0.getFirstChild() );
    myc.addChild(lo0);  // drop it in

    var tf1 = new Atomic.UITextField();
    tf1.text = "layout config XACAC";
    var lo1 = new Atomic.UILayout();
    lo1.setLayoutConfig ( "XACAC" );
    lo1.load("Scenes/simp_button.ui.txt");
    lo1.addChildBefore(tf1, lo1.getFirstChild() );
    myc.addChild(lo1);

    var tf2 = new Atomic.UITextField();
    tf2.text = "layout config XGCAC";
    var lo2 = new Atomic.UILayout();
    lo2.setLayoutConfig ( "XGCAC" );
    lo2.load("Scenes/simp_button.ui.txt");
    lo2.addChildBefore(tf2, lo2.getFirstChild() );
    myc.addChild(lo2);

    var tf3 = new Atomic.UITextField();
    tf3.text = "layout config XPCAC";
    var lo3 = new Atomic.UILayout();
    lo3.setLayoutConfig ( "XPCAC" );
    lo3.load("Scenes/simp_button.ui.txt");
    lo3.addChildBefore(tf3, lo3.getFirstChild() );
    myc.addChild(lo3);

    var tf4 = new Atomic.UITextField();
    tf4.text = "layout config XACGC";
    var lo4 = new Atomic.UILayout();
    lo4.setLayoutConfig ( "XACGC" );
    lo4.load("Scenes/simp_button.ui.txt");
    lo4.addChildBefore(tf4, lo4.getFirstChild() );
    myc.addChild(lo4);

    var tf5 = new Atomic.UITextField();
    tf5.text = "layout config XGRGC";
    var lo5 = new Atomic.UILayout();
    lo5.setLayoutConfig ( "XGRGC" );
    lo5.load("Scenes/simp_button.ui.txt");
    lo5.addChildBefore(tf5, lo5.getFirstChild() );
    myc.addChild(lo5);

    var tf6 = new Atomic.UITextField();
    tf6.text = "layout config XPLGC";
    var lo6 = new Atomic.UILayout();
    lo6.setLayoutConfig ( "XPLGC" );
    lo6.load("Scenes/simp_button.ui.txt");
    lo6.addChildBefore(tf6, lo6.getFirstChild() );
    myc.addChild(lo6);

    var tf7 = new Atomic.UITextField();
    tf7.text = "layout config XACPC";
    var lo7 = new Atomic.UILayout();
    lo7.setLayoutConfig ( "XACPC" );
    lo7.load("Scenes/simp_button.ui.txt");
    lo7.addChildBefore(tf7, lo7.getFirstChild() );
    myc.addChild(lo7);

    var tf8 = new Atomic.UITextField();
    tf8.text = "layout config XGLPL";
    var lo8 = new Atomic.UILayout();
    lo8.setLayoutConfig ( "XGLPL" );
    lo8.load("Scenes/simp_button.ui.txt");
    lo8.addChildBefore(tf8, lo8.getFirstChild() );
    myc.addChild(lo8);

    var tf9 = new Atomic.UITextField();
    tf9.text = "layout config XPCPR";
    var lo9 = new Atomic.UILayout();
    lo9.setLayoutConfig ( "XPCPR" );
    lo9.load("Scenes/simp_button.ui.txt");
    lo9.addChildBefore(tf9, lo9.getFirstChild() );
    myc.addChild(lo9);

    // its LAYOUT-O-MATIC time.
    var buttonl = mylayout.getWidget("go_layout_config");
    buttonl.onClick = function () {
        mylogger.setText( "UILayout action : " +  buttonl.id + " was pressed ");
        var window = new Atomic.UIWindow();
        window.setSettings ( Atomic.UI_WINDOW_SETTINGS_TITLEBAR + Atomic.UI_WINDOW_SETTINGS_RESIZABLE + Atomic.UI_WINDOW_SETTINGS_CLOSE_BUTTON );
        window.text = "LAYOUT-O-MATIC(tm)";
        window.load("Scenes/view_layout.ui.txt");
        window.resizeToFitContent();
        myview.addChild(window);
        window.center();
        window.getWidget("ok").onClick = function () {
            mylogger.setText( "UILayout action : the window `" + window.text + "` was closed with ok");
            window.die();
            window = null;
        };

        var str = "XGCPC"; // all defaults
        var targetl = mylayout.getWidget("target_layout"); // who to operate on.

        var buttonax = window.getWidget("set_ax");   // oh, strings are immutable in javascript.
        buttonax.onClick = function() {
            if ( buttonax.getValue() == 1) {
                str = str.split('');
                str[0] = 'X';
                str = str.join('');
                targetl.setLayoutConfig(str);
            }
        };
        var buttonay = window.getWidget("set_ay");
        buttonay.onClick = function() {
            if ( buttonay.getValue() == 1)  {
                str = str.split('');
                str[0] = 'Y';
                str = str.join('');
                targetl.setLayoutConfig(str);
            }
        };
        var buttonsza = window.getWidget("set_sza");
        buttonsza.onClick = function() {
            if ( buttonsza.getValue() == 1) {
                str = str.split('');
                str[1] = 'A';
                str = str.join('');
                targetl.setLayoutConfig(str);
            }
        };
        var buttonszg = window.getWidget("set_szg");
        buttonszg.onClick = function() {
            if ( buttonszg.getValue() == 1)   {
                str = str.split('');
                str[1] = 'G';
                str = str.join('');
                targetl.setLayoutConfig(str);
            }
        };
        var buttonszp= window.getWidget("set_szp");
        buttonszp.onClick = function() {
            if ( buttonszp.getValue() == 1)  {
                str = str.split('');
                str[1] = 'P';
                str = str.join('');
                targetl.setLayoutConfig(str);
            }
        };
        var buttonposc = window.getWidget("set_posc");
        buttonposc.onClick = function() {
            if ( buttonposc.getValue() == 1)  {
                str = str.split('');
                str[2] = 'C';
                str = str.join('');
                targetl.setLayoutConfig(str);
            }
        };
        var buttonposg = window.getWidget("set_posg");
        buttonposg.onClick = function() {
            if ( buttonposg.getValue() == 1)  {
                str = str.split('');
                str[2] = 'G';
                str = str.join('');
                targetl.setLayoutConfig(str);
            }
        };
        var buttonposl = window.getWidget("set_posl");
        buttonposl.onClick = function() {
            if ( buttonposl.getValue() == 1) {
                str = str.split('');
                str[2] = 'L';
                str = str.join('');
                targetl.setLayoutConfig(str);
            }
        };
        var buttonposr = window.getWidget("set_posr");
        buttonposr.onClick = function() {
            if ( buttonposr.getValue() == 1)  {
                str = str.split('');
                str[2] = 'R';
                str = str.join('');
                targetl.setLayoutConfig(str);
            }
        };
        var buttondista = window.getWidget("set_dista");
        buttondista.onClick = function() {
            if ( buttondista.getValue() == 1)   {
                str = str.split('');
                str[3] = 'A';
                str = str.join('');
                targetl.setLayoutConfig(str);
            }
        };
        var buttondistg = window.getWidget("set_distg");
        buttondistg.onClick = function() {
            if ( buttondistg.getValue() == 1)  {
                str = str.split('');
                str[3] = 'G';
                str = str.join('');
                targetl.setLayoutConfig(str);
            }
        };
        var buttondistp = window.getWidget("set_distp");
        buttondistp.onClick = function() {
            if ( buttondistp.getValue() == 1)   {
                str = str.split('');
                str[3] = 'P';
                str = str.join('');
                targetl.setLayoutConfig(str);
            }
        };
        var buttondpc = window.getWidget("set_dpc");
        buttondpc.onClick = function() {
            if ( buttondpc.getValue() == 1)  {
                str = str.split('');
                str[4] = 'C';
                str = str.join('');
                targetl.setLayoutConfig(str);
            }
        };
        var buttondpl = window.getWidget("set_dpl");
        buttondpl.onClick = function() {
            if ( buttondpl.getValue() == 1)  {
                str = str.split('');
                str[4] = 'L';
                str = str.join('');
                targetl.setLayoutConfig(str);
            }
        };
        var buttondpr = window.getWidget("set_dpr");
        buttondpr.onClick = function() {
            if ( buttondpr.getValue() == 1)  {
                str = str.split('');
                str[4] = 'R';
                str = str.join('');
                targetl.setLayoutConfig(str);
            }
        };
    };
};

