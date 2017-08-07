// UIRadioButton application source code
#include <Atomic/UI/UIRadioButton.h>
#include "PeriodicApp.h"

void PeriodicApp::setup_uiradiobutton( UIWidget *layout)
{
    PODVector<UIWidget*> dest;
    layout->SearchWidgetClass( "TBButton", dest );
    for (unsigned ii = 0; ii < dest.Size(); ii++)
        SubscribeToEvent(dest[ii], E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUiradiobuttonEvent ));

    UIWidget *demochk = layout->GetWidget ("demoradio");
    if ( demochk)
        SubscribeToEvent( demochk, E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUiradiobuttonEvent ));
}

void PeriodicApp::HandleUiradiobuttonEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace WidgetEvent;
    UIWidget* widget = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
    if ( widget == NULL ) return;
    if (eventData[P_TYPE] == UI_EVENT_TYPE_CLICK)
    {
        if (widget->GetId() == "uiradiobuttoncode" )
        {
            AppLog( "UIRadioButton support : " + widget->GetId() + " was pressed " );
            ViewCode ( "Components/code_uiradiobutton.cpp", widget->GetParent() );
        }
        if (widget->GetId() ==  "uiradiobuttonlayout" )
        {
            AppLog( "UIRadioButton support : " + widget->GetId() + " was pressed ");
            ViewCode ( "Scenes/layout_uiradiobutton.ui.txt", widget->GetParent() );
        }

        if (widget->GetId() == "demoradio" )
        {
            AppLog( "UIRadioButton event : " + widget->GetId() + " was pressed, state = " + String ( widget->GetValue() ) );
        }

        if (widget->GetId() ==  "radioset" )
        {
            UIWidget *demochk = widget->FindWidget ("demoradio");
            if (demochk)
            {
                demochk->SetValue (1);
                AppLog( "UIRadioButton action : " + widget->GetId() + " was pressed, set state to 1" );
            }
        }
        if (widget->GetId() ==  "radiounset" )
        {
            UIWidget *demochk = widget->FindWidget ("demoradio");
            if (demochk)
            {
                demochk->SetValue (0);
                AppLog( "UIRadioButton action : " + widget->GetId() + " was pressed, set state to 0" );
            }
        }
    }
}

