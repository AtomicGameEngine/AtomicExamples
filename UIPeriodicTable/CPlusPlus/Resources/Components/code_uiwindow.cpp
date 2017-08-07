// UIWindow application source code
#include <Atomic/UI/UIWindow.h>
#include <Atomic/UI/UIView.h>
#include "PeriodicApp.h"

void PeriodicApp::setup_uiwindow( UIWidget *layout, UIView *uiview )
{
    PODVector<UIWidget*> dest;
    layout->SearchWidgetClass( "TBButton", dest );
    for (unsigned ii = 0; ii < dest.Size(); ii++)
        SubscribeToEvent(dest[ii], E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUiwindowEvent ));
}

void PeriodicApp::HandleUiwindowEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace WidgetEvent;
    UIWidget* widget = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
    if ( widget == NULL ) return;
    if (eventData[P_TYPE] == UI_EVENT_TYPE_CLICK)
    {
        if (widget->GetId() == "uiwindowcode" )
        {
            AppLog( "UIWindow support : " + widget->GetId() + " was pressed " );
            ViewCode ( "Components/code_uiwindow.cpp", widget->GetParent() );
        }
        if (widget->GetId() ==  "uiwindowlayout" )
        {
            AppLog( "UIWindow support : " + widget->GetId() + " was pressed ");
            ViewCode ( "Scenes/layout_uiwindow.ui.txt", widget->GetParent() );
        }

        if (widget->GetId() == "windowdemo" )
        {
            AppLog( "UIWindow action : " + widget->GetId() + " was pressed " );
            UIView *someview = widget->GetView();
            UIWindow *window = new UIWindow(context_);
            window->SetSettings ( UI_WINDOW_SETTINGS_DEFAULT );
            window->SetText("UIWindow demo (a login dialog)");
            window->Load("Scenes/login_dialog.ui.txt");
            window->ResizeToFitContent();
            someview->AddChild(window);
            window->Center();
            UIWidget *login = window->GetWidget("login");
            SubscribeToEvent(login, E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUiwindowEvent ));
            UIWidget *cancel = window->GetWidget("cancel");
            SubscribeToEvent(cancel, E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUiwindowEvent ));
        }
        if (widget->GetId() == "login" )
        {
            AppLog( "UIWindow action : " + widget->GetId() + " was pressed " );
            UIWindow *mywindow = static_cast<UIWindow *>(FindTheWindowParent(widget));
            if (mywindow)
                mywindow->Close();
        }
        if (widget->GetId() == "cancel" )
        {
            AppLog( "UIWindow action : " + widget->GetId() + " was pressed " );
            UIWindow *mywindow = static_cast<UIWindow *>(FindTheWindowParent(widget));
            if (mywindow)
                mywindow->Close();
        }
        if (widget->GetId() == "windowdemo1" )
        {
            AppLog( "UIWindow action : " + widget->GetId() + " was pressed " );
            UIView *someview = widget->GetView();
            UIWindow *window = new UIWindow(context_);
            window->SetSettings ( UI_WINDOW_SETTINGS_DEFAULT );
            window->SetText("UIWindow demo (a table)" );
            window->Load("Scenes/sheet.ui.txt");
            window->ResizeToFitContent();
            someview->AddChild(window);
            window->Center();
        }
    }
}

