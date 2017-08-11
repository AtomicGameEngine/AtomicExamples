// UILayout application source code
using System;
using AtomicEngine;

public class code_uilayout : CSComponent {

    private static string layoutomaticstr; // LAYOUT-O-MATIC string

    private static void ReplaceChar( int index, char newChar)
    {
        char[] array = layoutomaticstr.ToCharArray();
        array[index] =  newChar;
        layoutomaticstr  = new string(array);
    }

    public void Setup( UIWidget  layout )
    {

        layoutomaticstr = "XGCPC";

        var dest = new AtomicEngine.Vector<AtomicEngine.UIWidget>();
        layout.SearchWidgetClass( "TBButton", dest );
        for (var ii = 0; ii < dest.Size; ii++) {
            dest[ii].SubscribeToEvent<WidgetEvent> (dest [ii], HandleUilayoutEvent );
        }

        UILayout  myc = (UILayout)layout.GetWidget("uilayoutcontainer"); // get the container layout
        UIButton  tf0 = new UIButton();  // the layout-o-matic spawner
        tf0.SetText( "LAYOUT-O-MATIC");
        tf0.SetId( "go_layout_config");
        UILayout lo0 = new UILayout();
        lo0.SetId( "target_layout");
        lo0.SetLayoutConfig ( "-----" );
        lo0.Load("Scenes/simp_button.ui.txt");
        lo0.AddChildBefore(tf0, lo0.GetFirstChild() );
        myc.AddChild(lo0);  // drop it in
        tf0.SubscribeToEvent<WidgetEvent> (tf0, HandleUilayoutEvent );

        UITextField  tf1 = new UITextField();
        tf1.SetText( "layout config XACAC");
        UILayout  lo1 = new UILayout();
        lo1.SetLayoutConfig ( "XACAC" );
        lo1.Load("Scenes/simp_button.ui.txt");
        lo1.AddChildBefore(tf1, lo1.GetFirstChild() );
        myc.AddChild(lo1);

        UITextField  tf2 = new UITextField();
        tf2.SetText( "layout config XGCAC");
        UILayout  lo2 = new UILayout();
        lo2.SetLayoutConfig ( "XGCAC" );
        lo2.Load("Scenes/simp_button.ui.txt");
        lo2.AddChildBefore(tf2, lo2.GetFirstChild() );
        myc.AddChild(lo2);

        UITextField  tf3 = new UITextField();
        tf3.SetText( "layout config XPCAC");
        UILayout  lo3 = new UILayout();
        lo3.SetLayoutConfig ( "XPCAC" );
        lo3.Load("Scenes/simp_button.ui.txt");
        lo3.AddChildBefore(tf3, lo3.GetFirstChild() );
        myc.AddChild(lo3);

        UITextField  tf4 = new UITextField();
        tf4.SetText( "layout config XACGC");
        UILayout  lo4 = new UILayout();
        lo4.SetLayoutConfig ( "XACGC" );
        lo4.Load("Scenes/simp_button.ui.txt");
        lo4.AddChildBefore(tf4, lo4.GetFirstChild() );
        myc.AddChild(lo4);

        UITextField  tf5 = new UITextField();
        tf5.SetText( "layout config XGRGC");
        UILayout  lo5 = new UILayout();
        lo5.SetLayoutConfig ( "XGRGC" );
        lo5.Load("Scenes/simp_button.ui.txt");
        lo5.AddChildBefore(tf5, lo5.GetFirstChild() );
        myc.AddChild(lo5);

        UITextField  tf6 = new UITextField();
        tf6.SetText( "layout config XPLGC");
        UILayout  lo6 = new UILayout();
        lo6.SetLayoutConfig ( "XPLGC" );
        lo6.Load("Scenes/simp_button.ui.txt");
        lo6.AddChildBefore(tf6, lo6.GetFirstChild() );
        myc.AddChild(lo6);

        UITextField  tf7 = new UITextField();
        tf7.SetText( "layout config XACPC");
        UILayout  lo7 = new UILayout();
        lo7.SetLayoutConfig ( "XACPC" );
        lo7.Load("Scenes/simp_button.ui.txt");
        lo7.AddChildBefore(tf7, lo7.GetFirstChild() );
        myc.AddChild(lo7);

        UITextField  tf8 = new UITextField();
        tf8.SetText( "layout config XGLPL");
        UILayout  lo8 = new UILayout();
        lo8.SetLayoutConfig ( "XGLPL" );
        lo8.Load("Scenes/simp_button.ui.txt");
        lo8.AddChildBefore(tf8, lo8.GetFirstChild() );
        myc.AddChild(lo8);

        UITextField  tf9 = new UITextField();
        tf9.SetText( "layout config XPCPR");
        UILayout  lo9 = new UILayout();
        lo9.SetLayoutConfig ( "XPCPR" );
        lo9.Load("Scenes/simp_button.ui.txt");
        lo9.AddChildBefore(tf9, lo9.GetFirstChild() );
        myc.AddChild(lo9);
    }

    private static void HandleUilayoutEvent ( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        if ( widget.Equals(null)) return;
        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK) {
            if (widget.GetId() == "go_layout_config" ) { // its LAYOUT-O-MATIC time.
                AtomicMain.AppLog( "UILayout action : " + widget.GetId() + " was pressed, its LAYOUT-O-MATIC time");
                UIView someview = widget.GetView();
                UIWindow  window = new UIWindow();
                window.SetSettings ( UI_WINDOW_SETTINGS.UI_WINDOW_SETTINGS_DEFAULT );
                window.SetText( "LAYOUT-O-MATIC(tm)");
                window.Load("Scenes/view_layout.ui.txt");
                window.ResizeToFitContent();
                someview.AddChild(window);

                UIWidget okbutt = window.GetWidget("ok");
                okbutt.SubscribeToEvent<WidgetEvent> (okbutt, HandleUilayoutEvent );

                var lox = new AtomicEngine.Vector<AtomicEngine.UIWidget>();
                window.SearchWidgetClass( "TBRadioButton", lox );
                for (var ii = 0; ii < lox.Size; ii++) {
                    lox[ii].SubscribeToEvent<WidgetEvent> (lox [ii],HandleUilayoutEvent  );
                }
            }
            if (widget.GetId() ==  "ok" ) {
                UIWindow mywindow = (UIWindow)AtomicMain.FindTheWindowParent(widget);
                if (!mywindow.Equals(null))
                    mywindow.Close();
            }
            if (widget.GetId() ==  "set_ax" ) {
                UILayout targetl = (UILayout)widget.FindWidget("target_layout"); // who to operate on.
                UIRadioButton setla = (UIRadioButton)widget; // who we are
                if (!targetl.Equals(null) && !setla.Equals(null)) {
                    if ( setla.GetValue() == 1 ) {
                        ReplaceChar(0, 'X');
                        targetl.SetLayoutConfig(layoutomaticstr);
                    }
                }
            }
            if (widget.GetId() ==  "set_ay" ) {
                UILayout targetl = (UILayout)widget.FindWidget("target_layout"); // who to operate on.
                UIRadioButton  setla = (UIRadioButton)widget; // who we are
                if (!targetl.Equals(null) && !setla.Equals(null)) {
                    if ( setla.GetValue() == 1) {
                        ReplaceChar(0, 'Y');
                        targetl.SetLayoutConfig(layoutomaticstr);
                    }
                }
            }

            if (widget.GetId() ==  "set_sza" ) {
                UILayout targetl = (UILayout)widget.FindWidget("target_layout"); // who to operate on.
                UIRadioButton  setla = (UIRadioButton)widget; // who we are
                if (!targetl.Equals(null) && !setla.Equals(null)) {
                    if ( setla.GetValue() == 1) {
                        ReplaceChar( 1, 'A');
                        targetl.SetLayoutConfig(layoutomaticstr);
                    }
                }
            }
            if (widget.GetId() ==  "set_szg" ) {
                UILayout targetl = (UILayout)widget.FindWidget("target_layout"); // who to operate on.
                UIRadioButton  setla = (UIRadioButton)widget; // who we are
                if (!targetl.Equals(null) && !setla.Equals(null)) {
                    if ( setla.GetValue() == 1) {
                        ReplaceChar( 1, 'G');
                        targetl.SetLayoutConfig(layoutomaticstr);
                    }
                }
            }
            if (widget.GetId() ==  "set_szp" ) {
                UILayout targetl = (UILayout)widget.FindWidget("target_layout"); // who to operate on.
                UIRadioButton  setla = (UIRadioButton)widget; // who we are
                if (!targetl.Equals(null) && !setla.Equals(null)) {
                    if ( setla.GetValue() == 1) {
                        ReplaceChar(  1, 'P');
                        targetl.SetLayoutConfig(layoutomaticstr);
                    }
                }
            }


            if (widget.GetId() ==  "set_posc" ) {
                UILayout targetl = (UILayout)widget.FindWidget("target_layout"); // who to operate on.
                UIRadioButton  setla = (UIRadioButton)widget; // who we are
                if (!targetl.Equals(null) && !setla.Equals(null)) {
                    if ( setla.GetValue() == 1) {
                        ReplaceChar( 2, 'C');
                        targetl.SetLayoutConfig(layoutomaticstr);
                    }
                }
            }
            if (widget.GetId() ==  "set_posg" ) {
                UILayout targetl = (UILayout)widget.FindWidget("target_layout"); // who to operate on.
                UIRadioButton  setla = (UIRadioButton)widget; // who we are
                if (!targetl.Equals(null) && !setla.Equals(null)) {
                    if ( setla.GetValue() == 1) {
                        ReplaceChar( 2, 'G');
                        targetl.SetLayoutConfig(layoutomaticstr);
                    }
                }
            }
            if (widget.GetId() ==  "set_posl" ) {
                UILayout targetl = (UILayout)widget.FindWidget("target_layout"); // who to operate on.
                UIRadioButton  setla = (UIRadioButton)widget; // who we are
                if (!targetl.Equals(null) && !setla.Equals(null)) {
                    if ( setla.GetValue() == 1) {
                        ReplaceChar( 2, 'L');
                        targetl.SetLayoutConfig(layoutomaticstr);
                    }
                }
            }
            if (widget.GetId() ==  "set_posr" ) {
                UILayout targetl = (UILayout)widget.FindWidget("target_layout"); // who to operate on.
                UIRadioButton  setla = (UIRadioButton)widget; // who we are
                if (!targetl.Equals(null) && !setla.Equals(null)) {
                    if ( setla.GetValue() == 1) {
                        ReplaceChar( 2, 'R');
                        targetl.SetLayoutConfig(layoutomaticstr);
                    }
                }
            }

            if (widget.GetId() ==  "set_dista" ) {
                UILayout targetl = (UILayout)widget.FindWidget("target_layout"); // who to operate on.
                UIRadioButton  setla = (UIRadioButton)widget; // who we are
                if (!targetl.Equals(null) && !setla.Equals(null)) {
                    if ( setla.GetValue() == 1) {
                        ReplaceChar(3, 'A');
                        targetl.SetLayoutConfig(layoutomaticstr);
                    }
                }
            }
            if (widget.GetId() ==  "set_distg" ) {
                UILayout targetl = (UILayout)widget.FindWidget("target_layout"); // who to operate on.
                UIRadioButton  setla = (UIRadioButton)widget; // who we are
                if (!targetl.Equals(null) && !setla.Equals(null)) {
                    if ( setla.GetValue() == 1) {
                        ReplaceChar(3, 'G');
                        targetl.SetLayoutConfig(layoutomaticstr);
                    }
                }
            }
            if (widget.GetId() ==  "set_distp" ) {
                UILayout targetl = (UILayout)widget.FindWidget("target_layout"); // who to operate on.
                UIRadioButton  setla = (UIRadioButton)widget; // who we are
                if (!targetl.Equals(null) && !setla.Equals(null)) {
                    if ( setla.GetValue() == 1) {
                        ReplaceChar(3, 'P');
                        targetl.SetLayoutConfig(layoutomaticstr);
                    }
                }
            }

            if (widget.GetId() ==  "set_dpc" ) {
                UILayout targetl = (UILayout)widget.FindWidget("target_layout"); // who to operate on.
                UIRadioButton  setla = (UIRadioButton)widget; // who we are
                if (!targetl.Equals(null) && !setla.Equals(null)) {
                    if ( setla.GetValue() == 1) {
                        ReplaceChar( 4, 'C');
                        targetl.SetLayoutConfig(layoutomaticstr);
                    }
                }
            }
            if (widget.GetId() ==  "set_dpl" ) {
                UILayout targetl = (UILayout)widget.FindWidget("target_layout"); // who to operate on.
                UIRadioButton  setla = (UIRadioButton)widget; // who we are
                if (!targetl.Equals(null) && !setla.Equals(null)) {
                    if ( setla.GetValue() == 1) {
                        ReplaceChar( 4, 'L');
                        targetl.SetLayoutConfig(layoutomaticstr);
                    }
                }
            }
            if (widget.GetId() ==  "set_dpr" ) {
                UILayout targetl = (UILayout)widget.FindWidget("target_layout"); // who to operate on.
                UIRadioButton  setla = (UIRadioButton)widget; // who we are
                if (!targetl.Equals(null) && !setla.Equals(null)) {
                    if ( setla.GetValue() == 1) {
                        ReplaceChar( 4, 'R');
                        targetl.SetLayoutConfig(layoutomaticstr);

                    }
                }
            }
        }
    }
}

