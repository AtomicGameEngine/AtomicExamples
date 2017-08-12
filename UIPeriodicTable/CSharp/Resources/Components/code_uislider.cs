// UISlider application source code
using System;
using AtomicEngine;

public class code_uislider : CSComponent {

    public void Setup( UIWidget  layout )
    {
        var dest = new AtomicEngine.Vector<AtomicEngine.UIWidget>();
        layout.SearchWidgetClass( "TBButton", dest );
        for (var ii = 0; ii < dest.Size; ii++) {
            dest[ii].SubscribeToEvent<WidgetEvent> (dest [ii], HandleUisliderEvent );
        }
        UIWidget demo = layout.GetWidget ("sliderdemo");
        if ( !demo.Equals(null))
            demo.SubscribeToEvent<WidgetEvent> ( demo, HandleAllSliderEvent );
    }

    private static void HandleAllSliderEvent ( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        if ( widget.Equals(null)) return;

        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CHANGED ) {
            if (widget.GetId() ==  "sliderdemo" ) {
                AtomicMain.AppLog( "UISlider action : " + widget.GetId() + " changed value to " + widget.GetValue().ToString());
            }
        }
    }

    private static void HandleUisliderEvent ( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        if ( widget.Equals(null)) return;
        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK) {

            if (widget.GetId() == "uislidercode" ) {
                AtomicMain.AppLog( "UISlider support : " + widget.GetId() + " was pressed " );
                AtomicMain.ViewCode ( "Components/code_uislider.cs", widget.GetParent() );
            }
            if (widget.GetId() ==  "uisliderlayout" ) {
                AtomicMain.AppLog( "UISlider support : " + widget.GetId() + " was pressed ");
                AtomicMain.ViewCode ( "Scenes/layout_uislider.ui.txt", widget.GetParent() );
            }
        }
    }
}

