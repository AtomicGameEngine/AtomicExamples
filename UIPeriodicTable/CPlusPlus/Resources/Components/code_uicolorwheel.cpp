// UIColorWheel application source code
#include <Atomic/UI/UIColorWheel.h>
#include "PeriodicApp.h"

void PeriodicApp::setup_uicolorwheel( UIWidget *layout )
{
    PODVector<UIWidget*> dest;
    layout->SearchWidgetClass( "TBButton", dest );
    for (unsigned ii = 0; ii < dest.Size(); ii++)
        SubscribeToEvent(dest[ii], E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUicolorwheelEvent ));

    UIWidget *cwx = layout->GetWidget("colorwheeldemo");
    if (cwx)
        SubscribeToEvent(cwx, E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUicolorwheelEvent ));
}

void PeriodicApp::HandleUicolorwheelEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace WidgetEvent;
    UIWidget* widget = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
    if ( widget == NULL ) return;
    if (eventData[P_TYPE] == UI_EVENT_TYPE_CLICK)
    {
        if (widget->GetId() ==  "uicolorwheelcode" )
        {
            AppLog( "UIColorWheel support : " + widget->GetId() + " was pressed " );
            ViewCode ( "Components/code_uicolorwheel.cpp", widget->GetParent() );
        }
        if (widget->GetId() ==  "uicolorwheellayout" )
        {
            AppLog( "UIColorWheel support : " + widget->GetId() + " was pressed ");
            ViewCode ( "Scenes/layout_uicolorwheel.ui.txt", widget->GetParent() );
        }
    }
    else if (eventData[P_TYPE] == UI_EVENT_TYPE_CHANGED )
    {
        if (widget->GetId() ==  "colorwheeldemo" )
        {
            UIColorWheel *cwx = static_cast<UIColorWheel*>(widget); // collect click color info
            if (cwx)
            {
                AppLog( "UIColorWheel event : " + widget->GetId() + " hue = " + String(cwx->GetHue()) + " saturation = " + String(cwx->GetSaturation()) );
            }
        }
    }
}

