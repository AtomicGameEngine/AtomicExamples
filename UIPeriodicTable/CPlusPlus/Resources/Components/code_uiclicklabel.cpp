// UIClickLabel application source code
#include "PeriodicApp.h"


void PeriodicApp::setup_uiclicklabel( UIWidget *layout )
{
    PODVector<UIWidget*> dest;
    layout->SearchWidgetClass( "TBButton", dest );
    for (unsigned ii = 0; ii < dest.Size(); ii++)
        SubscribeToEvent(dest[ii], E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUiclicklabelEvent ));

    UIWidget *chk1 = layout->GetWidget ("somecheck");
    if (chk1)
        SubscribeToEvent(chk1, E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUiclicklabelEvent ));

    UIWidget *chk2 = layout->GetWidget ("someradio");
    if (chk2)
        SubscribeToEvent(chk2, E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUiclicklabelEvent ));
}

void PeriodicApp::HandleUiclicklabelEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace WidgetEvent;
    UIWidget* widget = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
    if ( widget == NULL ) return;
    if (eventData[P_TYPE] == UI_EVENT_TYPE_CLICK)
    {
        if (widget->GetId() == "uiclicklabelcode" )
        {
            AppLog( "UIClickLabel support : " + widget->GetId() + " was pressed " );
            ViewCode ( "Components/code_uiclicklabel.cpp", widget->GetParent() );
        }
        if (widget->GetId() ==  "uiclicklabellayout" )
        {
            AppLog( "UIClickLabel support : " + widget->GetId() + " was pressed ");
            ViewCode ( "Scenes/layout_uiclicklabel.ui.txt", widget->GetParent() );
        }

        if (widget->GetId() == "somecheck" )
        {
            AppLog( "UIClickLabel event : " + widget->GetId() + " was pressed, state = " + String ( widget->GetValue() ) );
        }
        if (widget->GetId() == "someradio" )
        {
            AppLog( "UIClickLabel event : " + widget->GetId() + " was pressed, state = " + String ( widget->GetValue() ) );
        }
    }
}

