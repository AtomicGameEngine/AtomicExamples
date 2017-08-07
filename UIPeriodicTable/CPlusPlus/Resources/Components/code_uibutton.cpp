// UIButton application source code
#include "PeriodicApp.h"

void PeriodicApp::setup_uibutton( UIWidget *layout)
{
    PODVector<UIWidget*> dest;
    layout->SearchWidgetClass( "TBButton", dest );
    for (unsigned ii = 0; ii < dest.Size(); ii++)
        SubscribeToEvent(dest[ii], E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUibuttonEvent ));
}

void PeriodicApp::HandleUibuttonEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace WidgetEvent;
    UIWidget* widget = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
    if ( widget == NULL ) return;
    if (eventData[P_TYPE] == UI_EVENT_TYPE_CLICK)
    {
        if (widget->GetId() == "uibuttoncode" )
        {
            AppLog( "UIButton support : " + widget->GetId() + " was pressed " );
            ViewCode ( "Components/code_uibutton.cpp", widget->GetParent() );
        }
        if (widget->GetId() == "uibuttonlayout" )
        {
            AppLog( "UIButton support : " + widget->GetId() + " was pressed ");
            ViewCode ( "Scenes/layout_uibutton.ui.txt", widget->GetParent() );
        }

        if (widget->GetId() == "demobutton" )
        {
            AppLog( "UIButton action : " + widget->GetId() + " was pressed ");
        }
        if (widget->GetId() == "buttonducky" )
        {
            AppLog( "UIButton action : " + widget->GetId() + " was pressed ");
        }
        if (widget->GetId() == "buttonready" )
        {
            AppLog( "UIButton action : " + widget->GetId() + " was pressed ");
        }
        if (widget->GetId() == "buttonatomic" )
        {
            AppLog( "UIButton action : " + widget->GetId() + " was pressed ");
        }
        if (widget->GetId() == "buttongreen" )
        {
            AppLog( "UIButton action : " + widget->GetId() + " was pressed ");
        }
    }
}

