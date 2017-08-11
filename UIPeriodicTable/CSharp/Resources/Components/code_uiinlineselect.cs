// UIInlineSelect application source code
using System;
using AtomicEngine;

public class code_uiinlineselect  : CSComponent {

    public void Setup( UIWidget  layout )
    {
        var dest = new AtomicEngine.Vector<AtomicEngine.UIWidget>();
        layout.SearchWidgetClass( "TBButton", dest );
        for (var ii = 0; ii < dest.Size; ii++) {
            dest[ii].SubscribeToEvent<WidgetEvent> (dest [ii], HandleUiinlineselectEvent );
        }
        UIWidget demo1 = layout.GetWidget ("ilsstep");
        if ( !demo1.Equals(null))
            demo1.SubscribeToEvent<WidgetEvent> ( demo1, HandleUiinlineselectEvent );
        UIWidget demo2 = layout.GetWidget ("inlineselectdemo");
        if ( !demo2.Equals(null))
            demo2.SubscribeToEvent<WidgetEvent> ( demo2, HandleUiinlineselectEvent );
    }

    private static void HandleUiinlineselectEvent ( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        if ( widget.Equals(null)) return;
        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK) {
            if (widget.GetId() == "uiinlineselectcode" ) {
                AtomicMain.AppLog( "UIInlineSelect support : " + widget.GetId() + " was pressed " );
                AtomicMain.ViewCode ( "Components/code_uiinlineselect.cs", widget.GetParent() );
            }
            if (widget.GetId() ==  "uiinlineselectlayout" ) {
                AtomicMain.AppLog( "UIInlineSelect support : " + widget.GetId() + " was pressed ");
                AtomicMain.ViewCode ( "Scenes/layout_uiinlineselect.ui.txt", widget.GetParent() );
            }
        } else if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CHANGED ) {
            if (widget.GetId() == "inlineselectdemo" ) {
                UIInlineSelect  ils = (UIInlineSelect)widget;
                if ( !ils.Equals(null)) {
                    AtomicMain.AppLog( "UIInlineSelect event : " + widget.GetId() + " changed value to " + ils.GetValue().ToString() );
                }
            }
            if (widget.GetId() == "ilsstep" ) {
                UISlider  steps = (UISlider)widget;
                if ( !steps.Equals(null)) {
                    UIInlineSelect  ils = (UIInlineSelect)widget.FindWidget("inlineselectdemo");
                    if ( !ils.Equals(null)) {
                        ils.SetStepSize (steps.GetValue());
                    }
                    AtomicMain.AppLog( "UIInlineSelect event : " + widget.GetId() + " step size changed to " + steps.GetValue().ToString() );
                }
            }
        }
    }
}

