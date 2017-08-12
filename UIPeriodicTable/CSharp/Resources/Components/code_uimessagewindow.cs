// UIMessageWindow application source code
using System;
using AtomicEngine;

public class code_uimessagewindow : CSComponent {

    public void Setup( UIWidget  layout )
    {
        var dest = new AtomicEngine.Vector<AtomicEngine.UIWidget>();
        layout.SearchWidgetClass( "TBButton", dest );
        for (var ii = 0; ii < dest.Size; ii++) {
            dest[ii].SubscribeToEvent<WidgetEvent> (dest [ii], HandleUimessagewindowEvent );
        }
    }

    private static void HandleUimessagewindowEvent ( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        string refid  = (string)ev.RefID;
        if ( widget.Equals(null)) return;
        UIWidget  mylayout = (UIWidget)widget.FindWidget("pageuimessagewindow");
        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK) {
            if (widget.GetId() == "uimessagewindowcode" ) {
                AtomicMain.AppLog( "UIMessageWindow support : " + widget.GetId() + " was pressed " );
                AtomicMain.ViewCode ( "Components/code_uimessagewindow.cs", widget.GetParent() );
            }
            if (widget.GetId() ==  "uimessagewindowlayout" ) {
                AtomicMain.AppLog( "UIMessageWindow support : " + widget.GetId() + " was pressed ");
                AtomicMain.ViewCode ( "Scenes/layout_uimessagewindow.ui.txt", widget.GetParent() );
            }

            if (widget.GetId() ==  "msgnone" ) {
                AtomicMain.AppLog( "UIMessageWindow support : " + widget.GetId() + " was pressed ");
                UIMessageWindow  mess1 = new UIMessageWindow( mylayout, "mymess1");
                mess1.Show("MessageWindow - NONE", "this is a MessageWindow - None button", (UI_MESSAGEWINDOW_SETTINGS)0, false, 0, 0);
            }
            if (widget.GetId() ==  "msgok" ) {
                AtomicMain.AppLog( "UIMessageWindow support : " + widget.GetId() + " was pressed ");
                UIMessageWindow  mess2 = new UIMessageWindow( mylayout, "mymess2");
                mess2.SubscribeToEvent<WidgetEvent> (mess2, HandleUimessagewindowEvent );
                mess2.Show("MessageWindow - OK", "this is a MessageWindow - OK button", UI_MESSAGEWINDOW_SETTINGS.UI_MESSAGEWINDOW_SETTINGS_OK, false, 0, 0);
            }
            if (widget.GetId() ==  "msgkcancel" ) {
                AtomicMain.AppLog( "UIMessageWindow support : " + widget.GetId() + " was pressed ");
                UIMessageWindow  mess3 = new UIMessageWindow( mylayout, "mymess3");
                mess3.SubscribeToEvent<WidgetEvent> (mess3, HandleUimessagewindowEvent );
                mess3.Show("MessageWindow - OK CANCEL", "this is a MessageWindow - OK CANCEL buttons", UI_MESSAGEWINDOW_SETTINGS.UI_MESSAGEWINDOW_SETTINGS_OK_CANCEL, false, 0, 0);
            }
            if (widget.GetId() ==  "msgyesno" ) {
                AtomicMain.AppLog( "UIMessageWindow support : " + widget.GetId() + " was pressed ");
                UIMessageWindow  mess4 = new UIMessageWindow( mylayout, "mymess4");
                mess4.SubscribeToEvent<WidgetEvent> (mess4, HandleUimessagewindowEvent );
                mess4.Show( "MessageWindow - YES NO", "this is a MessageWindow - YES NO buttons", UI_MESSAGEWINDOW_SETTINGS.UI_MESSAGEWINDOW_SETTINGS_YES_NO, false, 0, 0);
            }

            if (refid ==  "TBMessageWindow.ok" ) {
                AtomicMain.AppLog( "UIMessageWindow event : " + refid + " closed the UIMessageWindow");
            }
            if (refid ==  "TBMessageWindow.cancel" ) {
                AtomicMain.AppLog( "UIMessageWindow event : " + refid + " closed the UIMessageWindow");
            }
            if (refid ==  "TBMessageWindow.yes" ) {
                AtomicMain.AppLog( "UIMessageWindow event : " + refid + " closed the UIMessageWindow");
            }
            if (refid ==  "TBMessageWindow.no" ) {
                AtomicMain.AppLog( "UIMessageWindow event : " + refid + " closed the UIMessageWindow");
            }
        } else {
            AtomicMain.AppLog( "UIMessageWindow event : " + widget.GetId() + " event type = " + AtomicMain.EventReport((int)ev.Type));
        }
    }
}

