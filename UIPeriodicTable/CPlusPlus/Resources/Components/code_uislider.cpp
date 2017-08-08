// UISlider application source code
#include <Atomic/UI/UISlider.h>
#include "PeriodicApp.h"

void PeriodicApp::setup_uislider( UIWidget *layout )
{
    PODVector<UIWidget*> dest;
    layout->SearchWidgetClass( "TBButton", dest );
    for (unsigned ii = 0; ii < dest.Size(); ii++)
        SubscribeToEvent(dest[ii], E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUisliderEvent ));

    UISlider *slider = static_cast<UISlider*>(layout->GetWidget("sliderdemo"));
    if (slider) // warning - this will route for all UISlider instances events into this event handler.
        slider->SubscribeToEvent( E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleAllSliderEvent ));
}

void PeriodicApp::HandleAllSliderEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace WidgetEvent;
    UIWidget* widget = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
    if ( widget == NULL ) return;

    UIWidget *demo = widget->FindWidget("sliderdemo");  // find our specific widget
    if ( widget != demo ) return; // if its not ours, bail

    if (eventData[P_TYPE] == UI_EVENT_TYPE_CHANGED )
    {
        if (widget->GetId() ==  "sliderdemo" )
        {
            AppLog( "UISlider event : " + widget->GetId() + " changed value to " + String (widget->GetValue()));
        }
    }
}

void PeriodicApp::HandleUisliderEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace WidgetEvent;
    UIWidget* widget = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
    if ( widget == NULL ) return;
    if (eventData[P_TYPE] == UI_EVENT_TYPE_CLICK)
    {
        if (widget->GetId() == "uislidercode" )
        {
            AppLog( "UISlider support : " + widget->GetId() + " was pressed " );
            ViewCode ( "Components/code_uislider.cpp", widget->GetParent() );
        }
        if (widget->GetId() ==  "uisliderlayout" )
        {
            AppLog( "UISlider support : " + widget->GetId() + " was pressed ");
            ViewCode ( "Scenes/layout_uislider.ui.txt", widget->GetParent() );
        }
    }
}

