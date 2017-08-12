// UILayoutParams application source code
using System;
using AtomicEngine;

public class code_uilayoutparams  : CSComponent {

    public void Setup( UIWidget  layout )
    {
        var dest = new AtomicEngine.Vector<AtomicEngine.UIWidget>();
        layout.SearchWidgetClass( "TBButton", dest );
        for (var ii = 0; ii < dest.Size; ii++) {
            dest[ii].SubscribeToEvent<WidgetEvent> (dest [ii], HandleUilayoutparamsEvent );
        }
    }

    private static void HandleUilayoutparamsEvent ( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        if ( widget.Equals(null)) return;
        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK) {
            if (widget.GetId() == "uilayoutparamscode" ) {
                AtomicMain.AppLog( "UILayoutParams support : " + widget.GetId() + " was pressed " );
                AtomicMain.ViewCode ( "Components/code_uilayoutparams.cs", widget.GetParent() );
            }
            if (widget.GetId() ==  "uilayoutparamslayout" ) {
                AtomicMain.AppLog( "UILayoutParams support : " + widget.GetId() + " was pressed ");
                AtomicMain.ViewCode ( "Scenes/layout_uilayoutparams.ui.txt", widget.GetParent() );
            }
        }
    }
}

