// UISeparator application source code
using System;
using AtomicEngine;

public class code_uiseparator  : CSComponent {

    public void Setup( UIWidget  layout )
    {
        var dest = new AtomicEngine.Vector<AtomicEngine.UIWidget>();
        layout.SearchWidgetClass( "TBButton", dest );
        for (var ii = 0; ii < dest.Size; ii++) {
            dest[ii].SubscribeToEvent<WidgetEvent> (dest [ii], HandleUiseparatorEvent );
        }
    }

    private static void HandleUiseparatorEvent ( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        if ( widget.Equals(null)) return;
        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK) {
            if (widget.GetId() == "uiseparatorcode" ) {
                AtomicMain.AppLog( "UISeparator support : " + widget.GetId() + " was pressed " );
                AtomicMain.ViewCode ( "Components/code_uiseparator.cs", widget.GetParent() );
            }
            if (widget.GetId() ==  "uiseparatorlayout" ) {
                AtomicMain.AppLog( "UISeparator support : " + widget.GetId() + " was pressed ");
                AtomicMain.ViewCode ( "Scenes/layout_uiseparator.ui.txt", widget.GetParent() );
            }
        }
    }
}

