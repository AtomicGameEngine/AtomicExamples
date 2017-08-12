// UIWidgetapplication source code
using System;
using AtomicEngine;

public class code_uiwidget : CSComponent {

    public void Setup( UIWidget  layout )
    {
        var dest = new AtomicEngine.Vector<AtomicEngine.UIWidget>();
        layout.SearchWidgetClass( "TBButton", dest );
        for (var ii = 0; ii < dest.Size; ii++) {
            dest[ii].SubscribeToEvent<WidgetEvent> (dest [ii], HandleUiwidgetEvent );
        }
    }

    private static void HandleUiwidgetEvent ( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        if ( widget.Equals(null)) return;
        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK) {
            if (widget.GetId() == "uiwidgetcode" ) {
                AtomicMain.AppLog( "UIWidgetsupport : " + widget.GetId() + " was pressed " );
                AtomicMain.ViewCode ( "Components/code_uiwidget.cs", widget.GetParent() );
            }
            if (widget.GetId() ==  "uiwidgetlayout" ) {
                AtomicMain.AppLog( "UIWidgetsupport : " + widget.GetId() + " was pressed ");
                AtomicMain.ViewCode ( "Scenes/layout_uiwidget.ui.txt", widget.GetParent() );
            }
        }
    }
}

