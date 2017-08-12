// UIPromptWindow application source code
using System;
using AtomicEngine;

public class code_uipromptwindow : CSComponent {

    public void Setup( UIWidget  layout )
    {
        var dest = new AtomicEngine.Vector<AtomicEngine.UIWidget>();
        layout.SearchWidgetClass( "TBButton", dest );
        for (var ii = 0; ii < dest.Size; ii++) {
            dest[ii].SubscribeToEvent<WidgetEvent> (dest [ii], HandleUipromptwindowEvent );
        }
    }

    private static void HandlePromptCompleteEvent ( UIPromptCompleteEvent ev )
    {
        AtomicMain.AppLog( "UIPromptWindow event : the window " + ev.Title
                           + " file was " + ev.Selected  + ", the button pressed was " + ev.Reason);
    }

    private static void HandleUipromptwindowEvent ( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        if ( widget.Equals(null)) return;
        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK) {
            if (widget.GetId() == "uipromptwindowcode" ) {
                AtomicMain.AppLog( "UIPromptWindow support : " + widget.GetId() + " was pressed " );
                AtomicMain.ViewCode ( "Components/code_uipromptwindow.cs", widget.GetParent() );
            }
            if (widget.GetId() ==  "uipromptwindowlayout" ) {
                AtomicMain.AppLog( "UIPromptWindow support : " + widget.GetId() + " was pressed ");
                AtomicMain.ViewCode ( "Scenes/layout_uipromptwindow.ui.txt", widget.GetParent() );
            }

            if (widget.GetId() == "stringfinder" ) {
                AtomicMain.AppLog( "UIPromptWindow action : " + widget.GetId() + " was pressed ");
                UIWidget someview = (UIWidget  )widget.GetView();
                UIPromptWindow  windowp = new  UIPromptWindow( someview, widget.GetId());
                windowp.SubscribeToEvent<UIPromptCompleteEvent> (windowp, HandlePromptCompleteEvent );
                windowp.Show( "WindowTitle", "Message in window", "preset value", 0, 0, 0);
            }
        }
    }
}

