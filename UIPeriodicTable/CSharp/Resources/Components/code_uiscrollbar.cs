// UIScrollBar application source code
using System;
using AtomicEngine;

public class code_uiscrollbar  : CSComponent {

    public void Setup( UIWidget  layout )
    {
        var dest = new AtomicEngine.Vector<AtomicEngine.UIWidget>();
        layout.SearchWidgetClass( "TBButton", dest );
        for (var ii = 0; ii < dest.Size; ii++) {
            dest[ii].SubscribeToEvent<WidgetEvent> (dest [ii], HandleUiscrollbarEvent );
        }
        UIWidget demo = layout.GetWidget ("scrollbardemo");
        if ( !demo.Equals(null))
            demo.SubscribeToEvent<WidgetEvent> ( HandleAllScrollcontainerEvent );
    }

    private static void HandleAllScrollcontainerEvent ( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        if ( widget.Equals(null)) return;

        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CHANGED ) {
            if (widget.GetId() ==  "scrollbardemo" ) {
                AtomicMain.AppLog( "UIScrollBar action : " + widget.GetId() + " changed value to " + widget.GetValue().ToString());
            }
        }
    }

    private static void HandleUiscrollbarEvent ( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        if ( widget.Equals(null)) return;
        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK) {
            if (widget.GetId() == "uiscrollbarcode" ) {
                AtomicMain.AppLog( "UIScrollBar support : " + widget.GetId() + " was pressed " );
                AtomicMain.ViewCode ( "Components/code_uiscrollbar.cs", widget.GetParent() );
            }
            if (widget.GetId() ==  "uiscrollbarlayout" ) {
                AtomicMain.AppLog( "UIScrollBar support : " + widget.GetId() + " was pressed ");
                AtomicMain.ViewCode ( "Scenes/layout_uiscrollbar.ui.txt", widget.GetParent() );
            }
        }
    }
}

