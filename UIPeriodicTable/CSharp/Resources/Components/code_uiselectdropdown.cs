// UISelectDropdown application source code
using System;
using AtomicEngine;

public class code_uiselectdropdown  : CSComponent {

    public void Setup( UIWidget  layout )
    {
        var dest = new AtomicEngine.Vector<AtomicEngine.UIWidget>();
        layout.SearchWidgetClass( "TBButton", dest );
        for (var ii = 0; ii < dest.Size; ii++) {
            dest[ii].SubscribeToEvent<WidgetEvent> (dest [ii], HandleUiselectdropdownEvent );
        }
        UIWidget demo = layout.GetWidget("selectdropdowndemo");
        if ( !demo.Equals(null))
            demo.SubscribeToEvent<WidgetEvent> ( HandleAllSelectdropdownEvent );
    }

    private static void HandleAllSelectdropdownEvent ( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        if ( widget.Equals(null)) return;

        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CHANGED) {
            if (widget.GetId() ==  "selectdropdowndemo" ) {
                AtomicMain.AppLog( "UISelectDropdown event : " + widget.GetId() + " changed value to " + widget.GetText());
            }
        }
    }

    private static void HandleUiselectdropdownEvent ( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        if ( widget.Equals(null)) return;
        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK) {
            if (widget.GetId() == "uiselectdropdowncode" ) {
                AtomicMain.AppLog( "UISelectDropdown support : " + widget.GetId() + " was pressed " );
                AtomicMain.ViewCode ( "Components/code_uiselectdropdown.cs", widget.GetParent() );
            }
            if (widget.GetId() ==  "uiselectdropdownlayout" ) {
                AtomicMain.AppLog( "UISelectDropdown support : " + widget.GetId() + " was pressed ");
                AtomicMain.ViewCode ( "Scenes/layout_uiselectdropdown.ui.txt", widget.GetParent() );
            }
        }
    }
}

