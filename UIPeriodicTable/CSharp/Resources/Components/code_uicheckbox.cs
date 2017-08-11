// UICheckBox application source code
using System;
using AtomicEngine;

public class code_uicheckbox : CSComponent {

    public void Setup( UIWidget  layout )
    {
        var dest = new AtomicEngine.Vector<AtomicEngine.UIWidget>();
        layout.SearchWidgetClass( "TBButton", dest );
        for (var ii = 0; ii < dest.Size; ii++) {
            dest[ii].SubscribeToEvent<WidgetEvent> (dest [ii], HandleUicheckboxEvent );
        }
        UIWidget demochk = layout.GetWidget ("democheck");
        if ( !demochk.Equals(null))
            demochk.SubscribeToEvent<WidgetEvent> ( demochk, HandleUicheckboxEvent );
    }

    private static void HandleUicheckboxEvent( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        if ( widget.Equals(null)) return;
        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK) {
            if (widget.GetId() == "uicheckboxcode" ) {
                AtomicMain.AppLog( "UICheckBox support : " + widget.GetId() + " was pressed " );
                AtomicMain.ViewCode ( "Components/code_uicheckbox.cs", widget.GetParent() );
            }
            if (widget.GetId() ==  "uicheckboxlayout" ) {
                AtomicMain.AppLog( "UICheckBox support : " + widget.GetId() + " was pressed ");
                AtomicMain.ViewCode ( "Scenes/layout_uicheckbox.ui.txt", widget.GetParent() );
            }

            if (widget.GetId() ==  "democheck" ) {
                AtomicMain.AppLog( "UICheckBox event : " + widget.GetId() + " was pressed, state = " + widget.GetValue().ToString() );
            }

            if (widget.GetId() ==  "checkset" ) {
                UIWidget demochk = widget.FindWidget ("democheck");
                if ( !demochk.Equals(null)) {
                    demochk.SetValue (1);
                    AtomicMain.AppLog( "UICheckBox action : " + widget.GetId() + " was pressed, set state to 1" );
                }
            }
            if (widget.GetId() ==  "checkunset" ) {
                UIWidget demochk = widget.FindWidget ("democheck");
                if ( !demochk.Equals(null)) {
                    demochk.SetValue (0);
                    AtomicMain.AppLog( "UICheckBox action : " + widget.GetId() + " was pressed, set state to 0" );
                }
            }
        }
    }
}

