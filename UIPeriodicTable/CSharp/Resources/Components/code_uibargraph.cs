// UIBargraph application source code
using System;
using AtomicEngine;

public class code_uibargraph  : CSComponent {

    public void Setup( UIWidget layout )
    {
        var dest = new AtomicEngine.Vector<AtomicEngine.UIWidget>();
        layout.SearchWidgetClass( "TBButton", dest );
        for (var ii = 0; ii < dest.Size; ii++) {  // set bulk event handlers on all buttons -- boom!
            dest[ii].SubscribeToEvent<WidgetEvent> (dest [ii], HandleUibargraphEvent );
        }
    }

    private static void HandleUibargraphEvent( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        if ( widget.Equals(null)) return;
        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK) {
            if (widget.GetId() == "uibargraphcode" ) {
                AtomicMain.AppLog( "UIBargraph support : " + widget.GetId() + " was pressed " );
                AtomicMain.ViewCode ( "Components/code_uibargraph.cs", widget.GetParent() );
            }
            if (widget.GetId() ==  "uibargraphlayout" ) {
                AtomicMain.AppLog( "UIBargraph support : " + widget.GetId() + " was pressed ");
                AtomicMain.ViewCode ( "Scenes/layout_uibargraph.ui.txt", widget.GetParent() );
            }
        }
    }
}

