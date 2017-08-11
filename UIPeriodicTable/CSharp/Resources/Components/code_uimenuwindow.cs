// UIMenuWindow application source code
using System;
using AtomicEngine;

public class code_uimenuwindow  : CSComponent {

    public void Setup( UIWidget  layout )
    {
        var dest = new AtomicEngine.Vector<AtomicEngine.UIWidget>();
        layout.SearchWidgetClass( "TBButton", dest );
        for (var ii = 0; ii < dest.Size; ii++) {
            dest[ii].SubscribeToEvent<WidgetEvent> (dest [ii], HandleUimenuwindowEvent );
        }
    }

    private static void HandleUimenuwindowEvent ( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        string refid  = (string)ev.RefID;
        if ( widget.Equals(null)) return;
        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK) {
            if (widget.GetId() == "uimenuwindowcode" ) {
                AtomicMain.AppLog( "UIMenuWindow support : " + widget.GetId() + " was pressed " );
                AtomicMain.ViewCode ( "Components/code_uimenuwindow.cs", widget.GetParent() );
            }
            if (widget.GetId() ==  "uimenuwindowlayout" ) {
                AtomicMain.AppLog( "UIMenuWindow support : " + widget.GetId() + " was pressed ");
                AtomicMain.ViewCode ( "Scenes/layout_uimenuwindow.ui.txt", widget.GetParent() );
            }

            if (widget.GetId() ==  "uimenuwindowpush" ) {
                AtomicMain.AppLog( "UIMenuWindow action : " + widget.GetId() + " was pressed " );
                UIMenuWindow  mymenuwindow = new UIMenuWindow( widget, "MenuWindowDemo");
                UIMenuItemSource  mis = new UIMenuItemSource();
                mis.AddItem( new UIMenuItem( "UISelectItem1", "item1" ) );
                mis.AddItem( new UIMenuItem( "UISelectItem2", "item2", "Ctrl+C" ) );
                mis.AddItem( new UIMenuItem( "UISelectItem3", "item3", "Ctrl+A", "DuckButton" ) );
                mis.AddItem( new UIMenuItem( "UISelectItem4", "item4", "Ctrl+O", "LogoAtomic" ) );
                int xx = widget.GetX() + (widget.GetWidth()/2);
                int yy = widget.GetY() + (widget.GetHeight()/2);
                mymenuwindow.SubscribeToEvent<WidgetEvent> (mymenuwindow, HandleUimenuwindowEvent );
                mymenuwindow.Show(mis, xx, yy);
            }

            if (widget.GetId() ==  "MenuWindowDemo" ) {
                AtomicMain.AppLog( "UIMenuWindow event : " + widget.GetId() + " and " + refid + " was selected ");
            }
        } else {
            if (widget.GetId() ==  "MenuWindowDemo" ) {
                AtomicMain.AppLog( "UIMenuWindow event : " + widget.GetId() +  " refid=" + refid + " event type=" + AtomicMain.EventReport((int)ev.Type));
            }
        }
    }
}

