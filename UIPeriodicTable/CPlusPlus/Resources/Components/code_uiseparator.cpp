// UISeparator application source code
#include "PeriodicApp.h"

void PeriodicApp::setup_uiseparator( UIWidget *layout )
{
    PODVector<UIWidget*> dest;
    layout->SearchWidgetClass( "TBButton", dest );
    for (unsigned ii = 0; ii < dest.Size(); ii++)
        SubscribeToEvent(dest[ii], E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUiseparatorEvent ));
}

void PeriodicApp::HandleUiseparatorEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace WidgetEvent;
    UIWidget* widget = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
    if ( widget == NULL ) return;
    if (eventData[P_TYPE] == UI_EVENT_TYPE_CLICK)
    {
        if (widget->GetId() == "uiseparatorcode" )
        {
            AppLog( "UISeparator support : " + widget->GetId() + " was pressed " );
            ViewCode ( "Components/code_uiseparator.cpp", widget->GetParent() );
        }
        if (widget->GetId() ==  "uiseparatorlayout" )
        {
            AppLog( "UISeparator support : " + widget->GetId() + " was pressed ");
            ViewCode ( "Scenes/layout_uiseparator.ui.txt", widget->GetParent() );
        }
    }
}

