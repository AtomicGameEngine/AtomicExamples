// UICheckBox application source code
#include "PeriodicApp.h"

void PeriodicApp::setup_uicheckbox( UIWidget *layout )
{
    PODVector<UIWidget*> dest;
    layout->SearchWidgetClass( "TBButton", dest );
    for (unsigned ii = 0; ii < dest.Size(); ii++)
        SubscribeToEvent(dest[ii], E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUicheckboxEvent ));

    UIWidget *demochk = layout->GetWidget ("democheck");
    if (demochk)
        SubscribeToEvent(demochk, E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUicheckboxEvent ));
}

void PeriodicApp::HandleUicheckboxEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace WidgetEvent;
    UIWidget* widget = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
    if ( widget == NULL ) return;
    if (eventData[P_TYPE] == UI_EVENT_TYPE_CLICK)
    {
        if (widget->GetId() == "uicheckboxcode" )
        {
            AppLog( "UICheckBox support : " + widget->GetId() + " was pressed " );
            ViewCode ( "Components/code_uicheckbox.cpp", widget->GetParent() );
        }
        if (widget->GetId() ==  "uicheckboxlayout" )
        {
            AppLog( "UICheckBox support : " + widget->GetId() + " was pressed ");
            ViewCode ( "Scenes/layout_uicheckbox.ui.txt", widget->GetParent() );
        }

        if (widget->GetId() == "democheck" )
        {
            AppLog( "UICheckBox event : " + widget->GetId() + " was pressed, state = " + String ( widget->GetValue() ) );
        }

        if (widget->GetId() ==  "checkset" )
        {
            UIWidget *demochk = widget->FindWidget ("democheck");
            if (demochk)
            {
                demochk->SetValue (1);
                AppLog( "UICheckBox action : " + widget->GetId() + " was pressed, set state to 1" );
            }
        }
        if (widget->GetId() ==  "checkunset" )
        {
            UIWidget *demochk = widget->FindWidget ("democheck");
            if (demochk)
            {
                demochk->SetValue (0);
                AppLog( "UICheckBox action : " + widget->GetId() + " was pressed, set state to 0" );
            }
        }
    }
}

