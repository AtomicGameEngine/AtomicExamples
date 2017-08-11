// UITextField application source code
using System;
using AtomicEngine;

public class code_uitextfield  : CSComponent {

    public void Setup( UIWidget  layout )
    {
        var dest = new AtomicEngine.Vector<AtomicEngine.UIWidget>();
        layout.SearchWidgetClass( "TBButton", dest );
        for (var ii = 0; ii < dest.Size; ii++) {
            dest[ii].SubscribeToEvent<WidgetEvent> (dest [ii], HandleUitextfieldEvent );
        }
    }

    private static void HandleUitextfieldEvent( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        if ( widget.Equals(null)) return;
        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK) {
            if (widget.GetId() == "uitextfieldcode" ) {
                AtomicMain.AppLog( " support : " + widget.GetId() + " was pressed " );
                AtomicMain.ViewCode ( "Components/code_uitextfield.cs", widget.GetParent() );
            }
            if (widget.GetId() ==  "uitextfieldlayout" ) {
                AtomicMain.AppLog( " support : " + widget.GetId() + " was pressed ");
                AtomicMain.ViewCode ( "Scenes/layout_uitextfield.ui.txt", widget.GetParent() );
            }
        }
    }
}

