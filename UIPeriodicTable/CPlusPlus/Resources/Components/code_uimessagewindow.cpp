// UIMessageWindow application source code
#include <Atomic/UI/UIMessageWindow.h>
#include "PeriodicApp.h"

void PeriodicApp::setup_uimessagewindow( UIWidget *layout )
{
    PODVector<UIWidget*> dest;
    layout->SearchWidgetClass( "TBButton", dest );
    for (unsigned ii = 0; ii < dest.Size(); ii++)
        SubscribeToEvent(dest[ii], E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUimessagewindowEvent ));
}

void PeriodicApp::HandleUimessagewindowEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace WidgetEvent;
    UIWidget* widget = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
    if ( widget == NULL ) return;
    UIWidget* mylayout = static_cast<UIWidget*>(widget->FindWidget("pageuimessagewindow"));
    String refid = eventData[P_REFID].GetString();
    if (eventData[P_TYPE] == UI_EVENT_TYPE_CLICK)
    {
        if (widget->GetId() == "uimessagewindowcode" )
        {
            AppLog( "UIMessageWindow support : " + widget->GetId() + " was pressed " );
            ViewCode ( "Components/code_uimessagewindow.cpp", widget->GetParent() );
        }
        if (widget->GetId() ==  "uimessagewindowlayout" )
        {
            AppLog( "UIMessageWindow support : " + widget->GetId() + " was pressed ");
            ViewCode ( "Scenes/layout_uimessagewindow.ui.txt", widget->GetParent() );
        }

        if (widget->GetId() ==  "msgnone" )
        {
            AppLog( "UIMessageWindow support : " + widget->GetId() + " was pressed ");
            UIMessageWindow *mess1 = new UIMessageWindow(context_, mylayout, "mymess1");
            mess1->Show("MessageWindow - NONE", "this is a MessageWindow - None button", (UI_MESSAGEWINDOW_SETTINGS)0, 0, 0, 0);
        }
        if (widget->GetId() ==  "msgok" )
        {
            AppLog( "UIMessageWindow support : " + widget->GetId() + " was pressed ");
            UIMessageWindow *mess2 = new UIMessageWindow(context_, mylayout, "mymess2");
            SubscribeToEvent(mess2, E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUimessagewindowEvent ));
            mess2->Show("MessageWindow - OK", "this is a MessageWindow - OK button", UI_MESSAGEWINDOW_SETTINGS_OK, 0, 0, 0);
        }
        if (widget->GetId() ==  "msgkcancel" )
        {
            AppLog( "UIMessageWindow support : " + widget->GetId() + " was pressed ");
            UIMessageWindow *mess3 = new UIMessageWindow(context_, mylayout, "mymess3");
            SubscribeToEvent(mess3, E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUimessagewindowEvent ));
            mess3->Show("MessageWindow - OK CANCEL", "this is a MessageWindow - OK CANCEL buttons", UI_MESSAGEWINDOW_SETTINGS_OK_CANCEL, 0, 0, 0);
        }
        if (widget->GetId() ==  "msgyesno" )
        {
            AppLog( "UIMessageWindow support : " + widget->GetId() + " was pressed ");
            UIMessageWindow *mess4 = new UIMessageWindow(context_, mylayout, "mymess4");
            SubscribeToEvent(mess4, E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUimessagewindowEvent ));
            mess4->Show( "MessageWindow - YES NO", "this is a MessageWindow - YES NO buttons", UI_MESSAGEWINDOW_SETTINGS_YES_NO, 0, 0, 0);
        }

        if (refid ==  "TBMessageWindow.ok" )
        {
            AppLog( "UIMessageWindow event : " + refid + " closed the UIMessageWindow");
        }
        if (refid ==  "TBMessageWindow.cancel" )
        {
            AppLog( "UIMessageWindow event : " + refid + " closed the UIMessageWindow");
        }
        if (refid ==  "TBMessageWindow.yes" )
        {
            AppLog( "UIMessageWindow event : " + refid + " closed the UIMessageWindow");
        }
        if (refid ==  "TBMessageWindow.no" )
        {
            AppLog( "UIMessageWindow event : " + refid + " closed the UIMessageWindow");
        }
    }
    else
    {
        AppLog( "UIMessageWindow event : " + widget->GetId() + " event type = " + EventReport(eventData[P_TYPE].GetInt()));
    }
}

