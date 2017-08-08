// UIPromptWindow application source code
#include <Atomic/UI/UIEvents.h>
#include <Atomic/UI/UIPromptWindow.h>
#include "PeriodicApp.h"

void PeriodicApp::setup_uipromptwindow( UIWidget *layout, UIView *uiview )
{
    PODVector<UIWidget*> dest;
    layout->SearchWidgetClass( "TBButton", dest );
    for (unsigned ii = 0; ii < dest.Size(); ii++)
        SubscribeToEvent(dest[ii], E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUipromptwindowEvent ));
}

void PeriodicApp::HandlePromptCompleteEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace UIPromptComplete;

    AppLog( "UIPromptWindow event : the window " + eventData[P_TITLE].GetString()
            + " file was " + eventData[P_SELECTED].GetString()
            + ", the button pressed was " + eventData[P_REASON].GetString());
}

void PeriodicApp::HandleUipromptwindowEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace WidgetEvent;
    UIWidget* widget = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
    if ( widget == NULL ) return;
    if (eventData[P_TYPE] == UI_EVENT_TYPE_CLICK)
    {
        if (widget->GetId() == "uipromptwindowcode" )
        {
            AppLog( "UIPromptWindow support : " + widget->GetId() + " was pressed " );
            ViewCode ( "Components/code_uipromptwindow.cpp", widget->GetParent() );
        }
        if (widget->GetId() ==  "uipromptwindowlayout" )
        {
            AppLog( "UIPromptWindow support : " + widget->GetId() + " was pressed ");
            ViewCode ( "Scenes/layout_uipromptwindow.ui.txt", widget->GetParent() );
        }

        if (widget->GetId() == "stringfinder" )
        {
            AppLog( "UIPromptWindow action : " + widget->GetId() + " was pressed ");
            UIWidget *someview = (UIWidget *)widget->GetView();
            UIPromptWindow *windowp = new  UIPromptWindow(context_, someview, widget->GetId());
            SubscribeToEvent( windowp, E_UIPROMPTCOMPLETE, ATOMIC_HANDLER(PeriodicApp, HandlePromptCompleteEvent ));
            windowp->Show( "WindowTitle", "Message in window", "preset value", 0, 0, 0);
        }
    }
}

