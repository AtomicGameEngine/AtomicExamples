// UIContainer application source code
using System;
using AtomicEngine;

public class code_uicontainer : CSComponent {

    public void Setup( UIWidget  layout )
    {
        var dest = new AtomicEngine.Vector<AtomicEngine.UIWidget>();
        layout.SearchWidgetClass( "TBButton", dest );
        for (var ii = 0; ii < dest.Size; ii++) {
            dest[ii].SubscribeToEvent<WidgetEvent> (dest [ii], HandleUicontainerEvent );
        }
    }

    private static void HandleUicontainerEvent ( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        if ( widget.Equals(null)) return;
        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK) {
            if (widget.GetId() == "uicontainercode" ) {
                AtomicMain.AppLog( "UIContainer support : " + widget.GetId() + " was pressed " );
                AtomicMain.ViewCode ( "Components/code_uicontainer.cs", widget.GetParent() );
            }
            if (widget.GetId() ==  "uicontainerlayout" ) {
                AtomicMain.AppLog( "UIContainer support : " + widget.GetId() + " was pressed ");
                AtomicMain.ViewCode ( "Scenes/layout_uicontainer.ui.txt", widget.GetParent() );
            }
        }
    }
}

