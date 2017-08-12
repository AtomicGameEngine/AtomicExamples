// UIClickLabel application source code
using System;
using AtomicEngine;

public class code_uiclicklabel : CSComponent {

    public void Setup( UIWidget  layout )
    {
        var dest = new AtomicEngine.Vector<AtomicEngine.UIWidget>();
        layout.SearchWidgetClass( "TBButton", dest );
        for (var ii = 0; ii < dest.Size; ii++) {
            dest[ii].SubscribeToEvent<WidgetEvent> (dest [ii], HandleUiclicklabelEvent );
        }
        UIWidget demochk = layout.GetWidget ("somecheck");
        if ( !demochk.Equals(null))
            demochk.SubscribeToEvent<WidgetEvent> ( demochk, HandleUiclicklabelEvent );
        UIWidget demorad = layout.GetWidget ("someradio");
        if ( !demorad.Equals(null))
            demorad.SubscribeToEvent<WidgetEvent> ( demorad, HandleUiclicklabelEvent );
    }

    private static void HandleUiclicklabelEvent( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        if ( widget.Equals(null)) return;
        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK) {
            if (widget.GetId() == "uiclicklabelcode" ) {
                AtomicMain.AppLog( "UIClickLabel support : " + widget.GetId() + " was pressed " );
                AtomicMain.ViewCode ( "Components/code_uiclicklabel.cs", widget.GetParent() );
            }
            if (widget.GetId() ==  "uiclicklabellayout" ) {
                AtomicMain.AppLog( "UIClickLabel support : " + widget.GetId() + " was pressed ");
                AtomicMain.ViewCode ( "Scenes/layout_uiclicklabel.ui.txt", widget.GetParent() );
            }

            if (widget.GetId() == "somecheck" ) {
                AtomicMain.AppLog( "UIClickLabel event : " + widget.GetId() + " was pressed, state = " +  widget.GetValue().ToString() );
            }
            if (widget.GetId() == "someradio" ) {
                AtomicMain.AppLog( "UIClickLabel event : " + widget.GetId() + " was pressed, state = " + widget.GetValue().ToString() );
            }
        }
    }
}

