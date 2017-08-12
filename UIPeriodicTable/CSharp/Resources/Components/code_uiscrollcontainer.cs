// UIScrollContainer application source code
using System;
using AtomicEngine;

public class code_uiscrollcontainer  : CSComponent {

    public void Setup( UIWidget  layout )
    {
        var dest = new AtomicEngine.Vector<AtomicEngine.UIWidget>();
        layout.SearchWidgetClass( "TBButton", dest );
        for (var ii = 0; ii < dest.Size; ii++) {
            dest[ii].SubscribeToEvent<WidgetEvent> (dest [ii], HandleUiscrollcontainerEvent );
        }
    }

    private static void HandleUiscrollcontainerEvent ( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        if ( widget.Equals(null)) return;
        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK) {
            if (widget.GetId() == "uiscrollcontainercode" ) {
                AtomicMain.AppLog( " support : " + widget.GetId() + " was pressed " );
                AtomicMain.ViewCode ( "Components/code_uiscrollcontainer.cs", widget.GetParent() );
            }
            if (widget.GetId() ==  "uiscrollcontainerlayout" ) {
                AtomicMain.AppLog( " support : " + widget.GetId() + " was pressed ");
                AtomicMain.ViewCode ( "Scenes/layout_uiscrollcontainer.ui.txt", widget.GetParent() );
            }
        }
    }
}

