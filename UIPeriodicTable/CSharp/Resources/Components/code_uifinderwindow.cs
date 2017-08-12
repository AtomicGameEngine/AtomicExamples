// UIFinderWindow application source code
using System;
using AtomicEngine;

public class code_uifinderwindow  : CSComponent {

    public void Setup( UIWidget  layout )
    {
        var dest = new AtomicEngine.Vector<AtomicEngine.UIWidget>();
        layout.SearchWidgetClass( "TBButton", dest );
        for (var ii = 0; ii < dest.Size; ii++) {
            dest[ii].SubscribeToEvent<WidgetEvent> (dest [ii], HandleUifinderwindowEvent );
        }
    }

    private static void HandleFinderCompleteEvent ( UIFinderCompleteEvent ev )
    {
        AtomicMain.AppLog( "UIFinderWindow event : the window " + ev.Title
                           + " file was " + ev.Selected  + ", the button pressed was " + ev.Reason);
    }

    private static void HandleUifinderwindowEvent ( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        if ( widget.Equals(null)) return;
        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK) {
            if (widget.GetId() == "uifinderwindowcode" ) {
                AtomicMain.AppLog( "UIFinderWindow support : " + widget.GetId() + " was pressed " );
                AtomicMain.ViewCode ( "Components/code_uifinderwindow.cs", widget.GetParent() );
            }
            if (widget.GetId() ==  "uifinderwindowlayout" ) {
                AtomicMain.AppLog( "UIFinderWindow support : " + widget.GetId() + " was pressed ");
                AtomicMain.ViewCode ( "Scenes/layout_uifinderwindow.ui.txt", widget.GetParent() );
            }

            if (widget.GetId() == "filefinder" ) {
                AtomicMain.AppLog( "UIFinderWindow action : " + widget.GetId() + " was pressed ");
                UIWidget someview = (UIWidget)widget.GetView();
                UIFinderWindow windowf = new UIFinderWindow(someview, widget.GetId());
                windowf.SubscribeToEvent<UIFinderCompleteEvent> (windowf, HandleFinderCompleteEvent );
                windowf.FindFile("Find a File", "", 0, 0, 0);
            }
            if (widget.GetId() ==  "folderfinder" ) {
                AtomicMain.AppLog( "UIFinderWindow action : " + widget.GetId() + " was pressed ");
                UIWidget  someview = (UIWidget)widget.GetView();
                UIFinderWindow  windowd = new UIFinderWindow( someview, widget.GetId() );
                windowd.SubscribeToEvent<UIFinderCompleteEvent> (windowd, HandleFinderCompleteEvent );
                windowd.FindPath("Find a Folder", "", 0, 0, 0);
            }
        }
    }
}

