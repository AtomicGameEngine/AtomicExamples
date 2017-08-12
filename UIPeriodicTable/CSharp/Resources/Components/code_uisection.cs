// UISection application source code
using System;
using AtomicEngine;

public class code_uisection : CSComponent {

    public void Setup( UIWidget  layout )
    {
        var dest = new AtomicEngine.Vector<AtomicEngine.UIWidget>();
        layout.SearchWidgetClass( "TBButton", dest );
        for (var ii = 0; ii < dest.Size; ii++) {
            dest[ii].SubscribeToEvent<WidgetEvent> (dest [ii], HandleUisectionEvent );
        }
        UIWidget  sec1 = layout.GetWidget("UISectionDemo");
        if ( !sec1.Equals(null))
            sec1.SubscribeToEvent<WidgetEvent> (sec1, HandleUisectionEvent );
        UIWidget  sec2 = layout.GetWidget("UISection2Demo");
        if ( !sec2.Equals(null))
            sec2.SubscribeToEvent<WidgetEvent> (sec2, HandleUisectionEvent );
    }

    private static void HandleUisectionEvent ( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        if ( widget.Equals(null)) return;
        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK) {
            if (widget.GetId() == "uisectioncode" ) {
                AtomicMain.AppLog( "UISection support : " + widget.GetId() + " was pressed " );
                AtomicMain.ViewCode ( "Components/code_uisection.cs", widget.GetParent() );
            }
            if (widget.GetId() ==  "uisectionlayout" ) {
                AtomicMain.AppLog( "UISection support : " + widget.GetId() + " was pressed ");
                AtomicMain.ViewCode ( "Scenes/layout_uisection.ui.txt", widget.GetParent() );
            }
        }
        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CHANGED ) {
            UIWidget  demo1 = widget.FindWidget("UISectionDemo"); // event comes in on child widget!
            if ( demo1.IsAncestorOf(widget) )
                AtomicMain.AppLog( "UISection event : " +  demo1.GetId() + " changed to value = " + demo1.GetValue().ToString());

            UIWidget  demo2 = widget.FindWidget("UISection2Demo");
            if ( demo2.IsAncestorOf(widget)  )
                AtomicMain.AppLog( "UISection event : " +  demo2.GetId() + " changed to value = " + demo2.GetValue().ToString());
        }
    }
}

