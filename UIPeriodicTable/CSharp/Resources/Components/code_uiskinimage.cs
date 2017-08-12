// UISkinImage application source code
using System;
using AtomicEngine;

public class code_uiskinimage  : CSComponent {

    public void Setup( UIWidget  layout )
    {
        var dest = new AtomicEngine.Vector<AtomicEngine.UIWidget>();
        layout.SearchWidgetClass( "TBButton", dest );
        for (var ii = 0; ii < dest.Size; ii++) {
            dest[ii].SubscribeToEvent<WidgetEvent> (dest [ii], HandleUiskinimageEvent );
        }
    }

    private static void HandleUiskinimageEvent ( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        if ( widget.Equals(null)) return;
        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK) {
            if (widget.GetId() == "uiskinimagecode" ) {
                AtomicMain.AppLog( "UISkinImage support : " + widget.GetId() + " was pressed " );
                AtomicMain.ViewCode ( "Components/code_uiskinimage.cs", widget.GetParent() );
            }
            if (widget.GetId() ==  "uiskinimagelayout" ) {
                AtomicMain.AppLog( "UISkinImage support : " + widget.GetId() + " was pressed ");
                AtomicMain.ViewCode ( "Scenes/layout_uiskinimage.ui.txt", widget.GetParent() );
            }
        }
    }
}

