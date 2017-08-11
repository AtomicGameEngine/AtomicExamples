// UIFontdescription application source code
using System;
using AtomicEngine;

public class code_uifontdescription  : CSComponent {

    public void Setup( UIWidget  layout )
    {
        var dest = new AtomicEngine.Vector<AtomicEngine.UIWidget>();
        layout.SearchWidgetClass( "TBButton", dest );
        for (var ii = 0; ii < dest.Size; ii++) {
            dest[ii].SubscribeToEvent<WidgetEvent> (dest [ii], HandleUifontdescriptionEvent );
        }
        UIWidget demo = layout.GetWidget ("fontstep");
        if ( !demo.Equals(null))
            demo.SubscribeToEvent<WidgetEvent> ( demo, HandleUifontdescriptionEvent );
    }

    private static void HandleUifontdescriptionEvent ( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        if ( widget.Equals(null)) return;
        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK) {
            if (widget.GetId() == "uifontdescriptioncode" ) {
                AtomicMain.AppLog( "UIFontdescription support : " + widget.GetId() + " was pressed " );
                AtomicMain.ViewCode ( "Components/code_uifontdescription.cs", widget.GetParent() );
            }
            if (widget.GetId() ==  "uifontdescriptionlayout" ) {
                AtomicMain.AppLog( "UIFontdescription support : " + widget.GetId() + " was pressed ");
                AtomicMain.ViewCode ( "Scenes/layout_uifontdescription.ui.txt", widget.GetParent() );
            }
        } else if (ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CHANGED ) {
            if ( widget.GetId() ==  "fontstep" ) {
                UISlider uis = (UISlider)widget;
                if ( !uis.Equals(null)) {
                    UITextField mytext = (UITextField)widget.FindWidget("changetext");
                    UIFontDescription myfont = new UIFontDescription();
                    int mysize = (int)uis.GetValue();
                    myfont.SetSize( mysize );
                    myfont.SetId("Vera");
                    mytext.SetFontDescription (myfont);
                    mytext.SetText ( "Size " + mysize);
                    AtomicMain.AppLog( "UIFontdescription action : " + widget.GetId() + " step size changed to " + mysize );
                }
            }
        }
    }
}

