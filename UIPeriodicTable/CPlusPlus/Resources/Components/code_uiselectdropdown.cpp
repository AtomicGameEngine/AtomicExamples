// UISelectDropdown application source code
#include "PeriodicApp.h"

void PeriodicApp::setup_uiselectdropdown( UIWidget *layout )
{
    PODVector<UIWidget*> dest;
    layout->SearchWidgetClass( "TBButton", dest );
    for (unsigned ii = 0; ii < dest.Size(); ii++)
        SubscribeToEvent(dest[ii], E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUiselectdropdownEvent ));

    UIWidget *demo = layout->GetWidget("selectdropdowndemo");
    if ( demo) // warning - this will route for all UISelectDropdown instances events into this event handler.
        demo->SubscribeToEvent(E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleAllSelectdropdownEvent ));
}

void PeriodicApp::HandleAllSelectdropdownEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace WidgetEvent;
    UIWidget* widget = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
    if ( widget == NULL ) return;

    UIWidget *demo = widget->FindWidget("selectdropdowndemo");  // find our specific widget
    if ( widget != demo ) return; // if its not ours, bail

    if (eventData[P_TYPE] == UI_EVENT_TYPE_CHANGED )
    {
        if (widget->GetId() ==  "selectdropdowndemo" )
        {
            AppLog( "UISelectDropdown event : " + widget->GetId() + " changed value to " + widget->GetText());
        }
    }
}

void PeriodicApp::HandleUiselectdropdownEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace WidgetEvent;
    UIWidget* widget = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
    if ( widget == NULL ) return;
    if (eventData[P_TYPE] == UI_EVENT_TYPE_CLICK)
    {
        if (widget->GetId() == "uiselectdropdowncode" )
        {
            AppLog( "UISelectDropdown support : " + widget->GetId() + " was pressed " );
            ViewCode ( "Components/code_uiselectdropdown.cpp", widget->GetParent() );
        }
        if (widget->GetId() ==  "uiselectdropdownlayout" )
        {
            AppLog( "UISelectDropdown support : " + widget->GetId() + " was pressed ");
            ViewCode ( "Scenes/layout_uiselectdropdown.ui.txt", widget->GetParent() );
        }

    }
}

