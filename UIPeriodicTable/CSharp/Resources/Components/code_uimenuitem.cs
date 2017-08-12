// UIMenuItem and UIMenuItemSource application source code
using System;
using AtomicEngine;

public class code_uimenuitem  : CSComponent {

    private static UIMenuItemSource mis;

    public void Setup( UIWidget  layout )
    {
        var dest = new AtomicEngine.Vector<AtomicEngine.UIWidget>();
        layout.SearchWidgetClass( "TBButton", dest );
        for (var ii = 0; ii < dest.Size; ii++) {
            dest[ii].SubscribeToEvent<WidgetEvent> (dest [ii], HandleUimenuitemEvent );
        }

        mis = new UIMenuItemSource();
        mis.AddItem( new UIMenuItem( "UISelectItem1", "item1" ) );
        mis.AddItem( new UIMenuItem( "UISelectItem2", "item2", "Ctrl+." ) );
        mis.AddItem( new UIMenuItem( "UISelectItem3", "item3", "Ctrl+A", "DuckButton" ) );
        mis.AddItem( new UIMenuItem( "UISelectItem4", "item4", "Ctrl+O", "LogoAtomic" ) );
    }

    private static void HandleUimenuitemEvent ( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        string refid  = (string)ev.RefID;
        if ( widget.Equals(null)) return;
        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK) {
            if (widget.GetId() == "uimenuitemcode" ) {
                AtomicMain.AppLog( "UIMenuItem support : " + widget.GetId() + " was pressed " );
                AtomicMain.ViewCode ( "Components/code_uimenuitem.cs", widget.GetParent() );
            }
            if (widget.GetId() ==  "uimenuitemlayout" ) {
                AtomicMain.AppLog( "UIMenuItem support : " + widget.GetId() + " was pressed ");
                AtomicMain.ViewCode ( "Scenes/layout_uimenuitem.ui.txt", widget.GetParent() );
            }

            if (widget.GetId() ==  "uimenuitempush" ) {
                UIMenuWindow  mymenuwindow = new UIMenuWindow( widget, "MenuItemDemo");
                int xx = widget.GetX() + (widget.GetWidth()/2);
                int yy = widget.GetY() + (widget.GetHeight()/2);
                mymenuwindow.SubscribeToEvent<WidgetEvent> (mymenuwindow, HandleUimenuitemEvent );
                mymenuwindow.Show(mis, xx, yy);
            }

            if (widget.GetId() ==  "MenuItemDemo" ) {
                AtomicMain.AppLog( "UIMenuItem event : " + widget.GetId() + " and " + refid + " was selected ");
            }

            if (widget.GetId() ==  "uimi1" ) {
                AtomicMain.AppLog( "UIMenuItem action : " + widget.GetId() + " was pressed ");
                mis.AddItem( new UIMenuItem( "New UIMenuItem") );
            }
            if (widget.GetId() ==  "uimi2" ) {
                AtomicMain.AppLog( "UIMenuItem action : " + widget.GetId() + " was pressed ");
                mis.AddItem( new UIMenuItem( "Newer UIMenuItem", "neweritem" ) );
            }
            if (widget.GetId() ==  "uimi3" ) {
                AtomicMain.AppLog( "UIMenuItem action : " + widget.GetId() + " was pressed ");
                mis.AddItem( new UIMenuItem( "A Duck", "aduck", "", "DuckButton" ) );
            }
            if (widget.GetId() ==  "uimi4" ) {
                AtomicMain.AppLog( "UIMenuItem action : " + widget.GetId() + " was pressed ");
                mis.AddItem( new UIMenuItem( "Atomic!", "atomic", "", "LogoAtomic" ) );
            }
            if (widget.GetId() ==  "uimi5" ) {
                AtomicMain.AppLog( "UIMenuItem action : " + widget.GetId() + " was pressed ");
                mis.Clear();
            }
        }
    }
}

