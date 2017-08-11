// UIColorWidget application source code
using System;
using AtomicEngine;

public class code_uicolorwidget : CSComponent {

    public void Setup( UIWidget  layout )
    {
        var dest = new AtomicEngine.Vector<AtomicEngine.UIWidget>();
        layout.SearchWidgetClass( "TBButton", dest );
        for (var ii = 0; ii < dest.Size; ii++) {
            dest[ii].SubscribeToEvent<WidgetEvent> (dest [ii], HandleUicolorwidgetEvent );
        }
    }

    private static void HandleUicolorwidgetEvent ( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        if ( widget.Equals(null)) return;
        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK) {
            if (widget.GetId() == "uicolorwidgetcode" ) {
                AtomicMain.AppLog( "UIColorWidget support : " + widget.GetId() + " was pressed " );
                AtomicMain.ViewCode ( "Components/code_uicolorwidget.cs", widget.GetParent() );
            }
            if (widget.GetId() == "uicolorwidgetlayout" ) {
                AtomicMain.AppLog( "UIColorWidget support : " + widget.GetId() + " was pressed ");
                AtomicMain.ViewCode ( "Scenes/layout_uicolorwidget.ui.txt", widget.GetParent() );
            }

            if (widget.GetId() == "uicolorwidgetred" ) {
                AtomicMain.AppLog( "UIColorWidget action : " + widget.GetId() + " was pressed ");
                UIColorWidget clw = (UIColorWidget)widget.FindWidget("colorwidgetdemo");
                if ( !clw.Equals(null))
                    clw.SetColorString("#FF1111");
            }
            if (widget.GetId() == "uicolorwidgetgreen" ) {
                AtomicMain.AppLog( "UIColorWidget action : " + widget.GetId() + " was pressed ");
                UIColorWidget clw = (UIColorWidget)widget.FindWidget("colorwidgetdemo");
                if ( !clw.Equals(null))
                    clw.SetColorString("#11FF11");
            }
            if (widget.GetId() == "uicolorwidgetblue" ) {
                AtomicMain.AppLog( "UIColorWidget action : " + widget.GetId() + " was pressed ");
                UIColorWidget clw = (UIColorWidget)widget.FindWidget("colorwidgetdemo");
                if ( !clw.Equals(null))
                    clw.SetColorString("#1111FF");
            }
        }
    }
}

