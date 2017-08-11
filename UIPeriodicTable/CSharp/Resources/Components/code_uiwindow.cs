// UIWindow application source code
using System;
using AtomicEngine;

public class code_uiwindow  : CSComponent {

    public void Setup( UIWidget  layout )
    {
        var dest = new AtomicEngine.Vector<AtomicEngine.UIWidget>();
        layout.SearchWidgetClass( "TBButton", dest );
        for (var ii = 0; ii < dest.Size; ii++) {
            dest[ii].SubscribeToEvent<WidgetEvent> (dest [ii], HandleUiwindowEvent );
        }
    }

    private static void HandleUiwindowEvent ( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        if ( widget.Equals(null)) return;
        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK) {
            if (widget.GetId() == "uiwindowcode" ) {
                AtomicMain.AppLog( "UIWindow support : " + widget.GetId() + " was pressed " );
                AtomicMain.ViewCode ( "Components/code_uiwindow.cs", widget.GetParent() );
            }
            if (widget.GetId() ==  "uiwindowlayout" ) {
                AtomicMain.AppLog( "UIWindow support : " + widget.GetId() + " was pressed ");
                AtomicMain.ViewCode ( "Scenes/layout_uiwindow.ui.txt", widget.GetParent() );
            }

            if (widget.GetId() == "windowdemo" ) {
                AtomicMain.AppLog( "UIWindow action : " + widget.GetId() + " was pressed " );
                UIView someview = widget.GetView();
                UIWindow window = new UIWindow();
                window.SetSettings (UI_WINDOW_SETTINGS.UI_WINDOW_SETTINGS_DEFAULT );
                window.SetText("UIWindow demo (a login dialog)");
                window.Load("Scenes/login_dialog.ui.txt");
                window.ResizeToFitContent();
                someview.AddChild(window);
                window.Center();
                UIWidget login = window.GetWidget("login");
                login.SubscribeToEvent<WidgetEvent> (login, HandleUiwindowEvent );
                UIWidget cancel = window.GetWidget("cancel");
                cancel.SubscribeToEvent<WidgetEvent> (cancel, HandleUiwindowEvent );
            }
            if (widget.GetId() == "login" ) {
                AtomicMain.AppLog( "UIWindow action : " + widget.GetId() + " was pressed " );
                UIWindow  mywindow = (UIWindow)AtomicMain.FindTheWindowParent(widget);
                if (!mywindow.Equals(null))
                    mywindow.Close();
            }
            if (widget.GetId() == "cancel" ) {
                AtomicMain.AppLog( "UIWindow action : " + widget.GetId() + " was pressed " );
                UIWindow  mywindow = (UIWindow)AtomicMain.FindTheWindowParent(widget);
                if (!mywindow.Equals(null))
                    mywindow.Close();
            }
            if (widget.GetId() == "windowdemo1" ) {
                AtomicMain.AppLog( "UIWindow action : " + widget.GetId() + " was pressed " );
                UIView  someview = widget.GetView();
                UIWindow  window = new UIWindow();
                window.SetSettings ( UI_WINDOW_SETTINGS.UI_WINDOW_SETTINGS_DEFAULT );
                window.SetText("UIWindow demo (a table)" );
                window.Load("Scenes/sheet.ui.txt");
                window.ResizeToFitContent();
                someview.AddChild(window);
                window.Center();
            }
        }
    }
}

