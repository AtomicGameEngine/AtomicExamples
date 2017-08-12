// UITabContainer application source code
using System;
using AtomicEngine;

public class code_uitabcontainer  : CSComponent {

    public void Setup( UIWidget  layout )
    {
        var dest = new AtomicEngine.Vector<AtomicEngine.UIWidget>();
        layout.SearchWidgetClass( "TBButton", dest );
        for (var ii = 0; ii < dest.Size; ii++) {
            dest[ii].SubscribeToEvent<WidgetEvent> (dest [ii], HandleUitabcontainerEvent );
        }
        UITabContainer demo = (UITabContainer)layout.GetWidget ("UITabContainerDemo");
        if ( !demo.Equals(null)) {
            demo.SetCurrentPage(0);
            //spammy    demo.SubscribeToEvent<WidgetEvent>( HandleAllTabcontainerEvent );
        }
    }

    private static void HandleAllTabcontainerEvent ( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        if ( widget.Equals(null)) return;

        if (widget.GetId() ==  "UITabContainerDemo" && ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_TAB_CHANGED ) {
            UITabContainer  tcx = (UITabContainer)widget;  // check the focus & stuff, or it gets a little spammy
            AtomicMain.AppLog( "UITabContainer event : " + widget.GetId() + " UI_EVENT_TYPE_TAB_CHANGED to " + tcx.GetCurrentPage().ToString()
                               + " id: " + tcx.GetCurrentPageWidget().GetId() );
        }
    }

    private static void HandleUitabcontainerEvent ( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        string refid  = (string)ev.RefID;
        if ( widget.Equals(null)) return;
        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK) {
            if (widget.GetId() == "uitabcontainercode" ) {
                AtomicMain.AppLog( "UITabContainer support : " + widget.GetId() + " was pressed " );
                AtomicMain.ViewCode ( "Components/code_uitabcontainer.cs", widget.GetParent() );
            }
            if (widget.GetId() ==  "uitabcontainerlayout" ) {
                AtomicMain.AppLog( "UITabContainer support : " + widget.GetId() + " was pressed ");
                AtomicMain.ViewCode ( "Scenes/layout_uitabcontainer.ui.txt", widget.GetParent() );
            }


            if (widget.GetId() ==  "uitabcontainerremove" ) {
                AtomicMain.AppLog( "UITabContainer action : " + widget.GetId() + " was pressed ");
                UITabContainer  tcx = (UITabContainer)widget.FindWidget("UITabContainerDemo");
                int current = tcx.GetCurrentPage();
                tcx.DeletePage(current);
            }
            if (widget.GetId() ==  "uitabcontaineradd" ) {
                AtomicMain.AppLog( "UITabContainer action : " + widget.GetId() + " was pressed ");
                UITabContainer  tcx = (UITabContainer)widget.FindWidget("UITabContainerDemo");
                tcx.AddTabPageFile("New File", "Scenes/sheet.ui.txt" );
            }
            if (widget.GetId() ==  "uitabcontainermake" ) {
                AtomicMain.AppLog( "UITabContainer action : " + widget.GetId() + " was pressed ");
                var cache = GetSubsystem<ResourceCache>();
                UITabContainer  tcx = (UITabContainer)widget.FindWidget("UITabContainerDemo");
                UILayout  lo = new UILayout();
                lo.SetLayoutConfig ( "YAGAC" );  // YACAC!
                UIEditField  myeditfield = new UIEditField();
                myeditfield.SetGravity( UI_GRAVITY.UI_GRAVITY_ALL);
                myeditfield.SetMultiline(true);
                File filex = cache.GetFile("Components/code_uitabcontainer.cs");
                String textx = filex.ReadText();
                filex.Close();
                myeditfield.SetText(textx);
                UIFontDescription  myfont = new UIFontDescription(); // put in a coder font
                myfont.SetSize(16);
                myfont.SetId("Vera");
                myeditfield.SetFontDescription (myfont);
                lo.AddChild (myeditfield);
                tcx.AddTabPageWidget("New Code", lo);
            }
            if (widget.GetId() ==  "uitabcontainerundock" ) {
                AtomicMain.AppLog( "UITabContainer action : " + widget.GetId() + " was pressed ");
                UITabContainer  tcx = (UITabContainer)widget.FindWidget("UITabContainerDemo");
                int current = tcx.GetCurrentPage();
                tcx.UndockPage(current);
            }
            if (widget.GetId() ==  "uitabcontainerredock" ) {
                AtomicMain.AppLog( "UITabContainer action : " + widget.GetId() + " was pressed ");
                UITabContainer  tcx = (UITabContainer)widget.FindWidget("UITabContainerDemo");
                if ( !tcx.DockWindow ( "tab1" ) )
                    if ( !tcx.DockWindow ( "tab2" ) )
                        if ( !tcx.DockWindow ( "tab3" ) )
                            if ( !tcx.DockWindow ( "New File" ) )
                                if ( !tcx.DockWindow ( "New Code" ) )
                                    AtomicMain.AppLog( "UITabContainer action : no more windows to dock.");
            }
        }
    }
}

