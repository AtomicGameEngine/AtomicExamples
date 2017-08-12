// UIColorWheel application source code
using System;
using AtomicEngine;

public class code_uicolorwheel : CSComponent {

    public void Setup( UIWidget  layout )
    {
        var dest = new AtomicEngine.Vector<AtomicEngine.UIWidget>();
        layout.SearchWidgetClass( "TBButton", dest );
        for (var ii = 0; ii < dest.Size; ii++) {
            dest[ii].SubscribeToEvent<WidgetEvent> (dest [ii], HandleUicolorwheelEvent );
        }
        UIWidget demo = layout.GetWidget ("colorwheeldemo");
        if ( !demo.Equals(null))
            demo.SubscribeToEvent<WidgetEvent> ( demo, HandleUicolorwheelEvent );
    }

    private static void HandleUicolorwheelEvent( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        if ( widget.Equals(null)) return;
        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK) {
            if (widget.GetId() ==  "uicolorwheelcode" ) {
                AtomicMain.AppLog( "UIColorWheel support : " + widget.GetId() + " was pressed " );
                AtomicMain.ViewCode ( "Components/code_uicolorwheel.cs", widget.GetParent() );
            }
            if (widget.GetId() ==  "uicolorwheellayout" ) {
                AtomicMain.AppLog( "UIColorWheel support : " + widget.GetId() + " was pressed ");
                AtomicMain.ViewCode ( "Scenes/layout_uicolorwheel.ui.txt", widget.GetParent() );
            }
        } else if (  ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CHANGED ) {
            if (widget.GetId() ==  "colorwheeldemo" ) {
                UIColorWheel cwx = (UIColorWheel)widget; // collect click color info
                if ( !cwx.Equals(null)) {
                    AtomicMain.AppLog( "UIColorWheel event : " + widget.GetId() + " hue = " + cwx.GetHue().ToString() + " saturation = " + cwx.GetSaturation().ToString() );
                }
            }
        }
    }
}

