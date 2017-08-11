// UIRadioButton application source code
using System;
using AtomicEngine;

public class code_uiradiobutton  : CSComponent {

    public void Setup( UIWidget  layout )
    {
        var dest = new AtomicEngine.Vector<AtomicEngine.UIWidget>();
        layout.SearchWidgetClass( "TBButton", dest );
        for (var ii = 0; ii < dest.Size; ii++) {
            dest[ii].SubscribeToEvent<WidgetEvent> (dest [ii], HandleUiradiobuttonEvent );
        }
        UIWidget demochk = layout.GetWidget ("demoradio");
        if ( !demochk.Equals(null))
            demochk.SubscribeToEvent<WidgetEvent> ( demochk, HandleUiradiobuttonEvent );
    }

    private static void HandleUiradiobuttonEvent ( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        if ( widget.Equals(null)) return;
        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK) {
            if (widget.GetId() == "uiradiobuttoncode" ) {
                AtomicMain.AppLog( "UIRadioButton support : " + widget.GetId() + " was pressed " );
                AtomicMain.ViewCode ( "Components/code_uiradiobutton.cs", widget.GetParent() );
            }
            if (widget.GetId() ==  "uiradiobuttonlayout" ) {
                AtomicMain.AppLog( "UIRadioButton support : " + widget.GetId() + " was pressed ");
                AtomicMain.ViewCode ( "Scenes/layout_uiradiobutton.ui.txt", widget.GetParent() );
            }

            if (widget.GetId() == "demoradio" ) {
                AtomicMain.AppLog( "UIRadioButton event : " + widget.GetId() + " was pressed, state = " + widget.GetValue().ToString());
            }

            if (widget.GetId() ==  "radioset" ) {
                UIWidget demochk = widget.FindWidget ("demoradio");
                if (!demochk.Equals(null)) {
                    demochk.SetValue (1);
                    AtomicMain.AppLog( "UIRadioButton action : " + widget.GetId() + " was pressed, set state to 1" );
                }
            }
            if (widget.GetId() ==  "radiounset" ) {
                UIWidget demochk = widget.FindWidget ("demoradio");
                if (!demochk.Equals(null)) {
                    demochk.SetValue (0);
                    AtomicMain.AppLog( "UIRadioButton action : " + widget.GetId() + " was pressed, set state to 0" );
                }
            }
        }
    }
}

