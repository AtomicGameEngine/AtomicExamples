// UIButton application source code
using System;
using AtomicEngine;

public class code_uibutton : CSComponent {

    public void Setup( UIWidget layout )
    {
        var dest = new AtomicEngine.Vector<AtomicEngine.UIWidget>();
        layout.SearchWidgetClass( "TBButton", dest );
        for (var ii = 0; ii < dest.Size; ii++) {  // set bulk event handlers on all buttons -- boom!
            dest[ii].SubscribeToEvent<WidgetEvent> (dest [ii], HandleUibuttonEvent );
        }
    }

    private static void HandleUibuttonEvent( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        if ( widget.Equals(null)) return;
        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK) {
            if (widget.GetId() == "uibuttoncode" ) {
                AtomicMain.AppLog( "UIButton support : " + widget.GetId() + " was pressed " );
                AtomicMain.ViewCode ( "Components/code_uibutton.cs", widget.GetParent() );
            }
            if (widget.GetId() == "uibuttonlayout" ) {
                AtomicMain.AppLog( "UIButton support : " + widget.GetId() + " was pressed ");
                AtomicMain.ViewCode ( "Scenes/layout_uibutton.ui.txt", widget.GetParent() );
            }

            if (widget.GetId() == "demobutton" ) {
                AtomicMain.AppLog( "UIButton action : " + widget.GetId() + " was pressed ");
            }
            if (widget.GetId() == "buttonducky" ) {
                AtomicMain.AppLog( "UIButton action : " + widget.GetId() + " was pressed ");
            }
            if (widget.GetId() == "buttonready" ) {
                AtomicMain.AppLog( "UIButton action : " + widget.GetId() + " was pressed ");
            }
            if (widget.GetId() == "buttonatomic" ) {
                AtomicMain.AppLog( "UIButton action : " + widget.GetId() + " was pressed ");
            }
            if (widget.GetId() == "buttongreen" ) {
                AtomicMain.AppLog( "UIButton action : " + widget.GetId() + " was pressed ");
            }
        }
    }
}

