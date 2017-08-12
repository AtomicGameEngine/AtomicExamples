// UIPulldownMenu application source code
using System;
using AtomicEngine;

public class code_uipulldownmenu  : CSComponent {

    public void Setup( UIWidget  layout )
    {
        var dest = new AtomicEngine.Vector<AtomicEngine.UIWidget>();
        layout.SearchWidgetClass( "TBButton", dest );
        for (var ii = 0; ii < dest.Size; ii++) {
            dest[ii].SubscribeToEvent<WidgetEvent> (dest [ii], HandleUipulldownmenuEvent );
        }
        layout.SearchWidgetClass( "TBPulldownMenu", dest );
        for (var ii = 0; ii < dest.Size; ii++) {
            dest[ii].SubscribeToEvent<WidgetEvent> (dest [ii], HandleUipulldownmenuEvent );
        }
    }

    private static void HandleUipulldownmenuEvent ( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        if ( widget.Equals(null)) return;
        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK) {
            if (widget.GetId() == "uipulldownmenucode" ) {
                AtomicMain.AppLog( "UIPulldownMenu support : " + widget.GetId() + " was pressed " );
                AtomicMain.ViewCode ( "Components/code_uipulldownmenu.cs", widget.GetParent() );
            }
            if (widget.GetId() ==  "uipulldownmenulayout" ) {
                AtomicMain.AppLog( "UIPulldownMenu support : " + widget.GetId() + " was pressed ");
                AtomicMain.ViewCode ( "Scenes/layout_uipulldownmenu.ui.txt", widget.GetParent() );
            }
        } else if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CHANGED ) {
            if (widget.GetId() ==  "FileMenu" ) {
                UIPulldownMenu  pdm = (UIPulldownMenu)widget;
                if ( !pdm.Equals(null))
                    AtomicMain.AppLog( "UIPulldownMenu event : " + widget.GetId() + " selected entry = " + pdm.GetSelectedId() );
            }
            if (widget.GetId() ==  "EditMenu" ) {
                UIPulldownMenu  pdm = (UIPulldownMenu)widget;
                if ( !pdm.Equals(null))
                    AtomicMain.AppLog( "UIPulldownMenu event : " + widget.GetId() + " selected entry = " + pdm.GetSelectedId() );
            }
            if (widget.GetId() ==  "ViewMenu" ) {
                UIPulldownMenu  pdm = (UIPulldownMenu)widget;
                if ( !pdm.Equals(null))
                    AtomicMain.AppLog( "UIPulldownMenu event : " + widget.GetId() + " selected entry = " +  pdm.GetSelectedId() );
            }
            if (widget.GetId() ==  "HelpMenu" ) {
                UIPulldownMenu  pdm = (UIPulldownMenu)widget;
                if ( !pdm.Equals(null))
                    AtomicMain.AppLog( "UIPulldownMenu event : " + widget.GetId() + " selected entry = " + pdm.GetSelectedId() );
            }
        }
    }
}

