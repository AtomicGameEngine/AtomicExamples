// UIContainer application source code
#include "PeriodicApp.h"

void PeriodicApp::setup_uicontainer( UIWidget *layout )
{
    PODVector<UIWidget*> dest;
    layout->SearchWidgetClass( "TBButton", dest );
    for (unsigned ii = 0; ii < dest.Size(); ii++)
        SubscribeToEvent(dest[ii], E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUicontainerEvent ));
}

void PeriodicApp::HandleUicontainerEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace WidgetEvent;
    UIWidget* widget = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
    if ( widget == NULL ) return;
    if (eventData[P_TYPE] == UI_EVENT_TYPE_CLICK)
    {
        if (widget->GetId() == "uicontainercode" )
        {
            AppLog( "UIContainer support : " + widget->GetId() + " was pressed " );
            ViewCode ( "Components/code_uicontainer.cpp", widget->GetParent() );
        }
        if (widget->GetId() ==  "uicontainerlayout" )
        {
            AppLog( "UIContainer support : " + widget->GetId() + " was pressed ");
            ViewCode ( "Scenes/layout_uicontainer.ui.txt", widget->GetParent() );
        }
    }
}

