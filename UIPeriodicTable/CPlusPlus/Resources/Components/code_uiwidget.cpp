// UIWidget application source code
#include "PeriodicApp.h"

void PeriodicApp::setup_uiwidget( UIWidget *layout )
{
    PODVector<UIWidget*> dest;
    layout->SearchWidgetClass( "TBButton", dest );
    for (unsigned ii = 0; ii < dest.Size(); ii++)
        SubscribeToEvent(dest[ii], E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUiwidgetEvent ));
}

void PeriodicApp::HandleUiwidgetEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace WidgetEvent;
    UIWidget* widget = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
    if ( widget == NULL ) return;
    if (eventData[P_TYPE] == UI_EVENT_TYPE_CLICK)
    {
        if (widget->GetId() == "uiwidgetcode" )
        {
            AppLog( "UIWidget support : " + widget->GetId() + " was pressed " );
            ViewCode ( "Components/code_uiwidget.cpp", widget->GetParent() );
        }
        if (widget->GetId() ==  "uiwidgetlayout" )
        {
            AppLog( "UIWidget support : " + widget->GetId() + " was pressed ");
            ViewCode ( "Scenes/layout_uiwidget.ui.txt", widget->GetParent() );
        }
    }
}

