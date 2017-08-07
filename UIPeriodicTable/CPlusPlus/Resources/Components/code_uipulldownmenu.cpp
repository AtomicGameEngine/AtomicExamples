// UIPulldownMenu application source code
#include <Atomic/UI/UIPulldownMenu.h>
#include "PeriodicApp.h"

void PeriodicApp::setup_uipulldownmenu( UIWidget *layout )
{
    unsigned ii = 0;
    PODVector<UIWidget*> dest;
    layout->SearchWidgetClass( "TBButton", dest );
    for ( ii = 0; ii < dest.Size(); ii++)
        SubscribeToEvent(dest[ii], E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUipulldownmenuEvent ));
    layout->SearchWidgetClass( "TBPulldownMenu", dest );
    for ( ii = 0;  ii < dest.Size(); ii++)
        SubscribeToEvent(dest[ii], E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUipulldownmenuEvent ));
}

void PeriodicApp::HandleUipulldownmenuEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace WidgetEvent;
    UIWidget* widget = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
    if ( widget == NULL ) return;
    if (eventData[P_TYPE] == UI_EVENT_TYPE_CLICK)
    {
        if (widget->GetId() == "uipulldownmenucode" )
        {
            AppLog( "UIPulldownMenu support : " + widget->GetId() + " was pressed " );
            ViewCode ( "Components/code_uipulldownmenu.cpp", widget->GetParent() );
        }
        if (widget->GetId() ==  "uipulldownmenulayout" )
        {
            AppLog( "UIPulldownMenu support : " + widget->GetId() + " was pressed ");
            ViewCode ( "Scenes/layout_uipulldownmenu.ui.txt", widget->GetParent() );
        }
    }
    else if (eventData[P_TYPE] == UI_EVENT_TYPE_CHANGED )
    {
        if (widget->GetId() ==  "FileMenu" )
        {
            UIPulldownMenu *pdm = static_cast<UIPulldownMenu*>(widget);
            if ( pdm)
                AppLog( "UIPulldownMenu event : " + widget->GetId() + " selected entry = " + String( pdm->GetSelectedId()) );
        }
        if (widget->GetId() ==  "EditMenu" )
        {
            UIPulldownMenu *pdm = static_cast<UIPulldownMenu*>(widget);
            if ( pdm)
                AppLog( "UIPulldownMenu event : " + widget->GetId() + " selected entry = " + String( pdm->GetSelectedId()) );
        }
        if (widget->GetId() ==  "ViewMenu" )
        {
            UIPulldownMenu *pdm = static_cast<UIPulldownMenu*>(widget);
            if ( pdm)
                AppLog( "UIPulldownMenu event : " + widget->GetId() + " selected entry = " + String( pdm->GetSelectedId()) );
        }
        if (widget->GetId() ==  "HelpMenu" )
        {
            UIPulldownMenu *pdm = static_cast<UIPulldownMenu*>(widget);
            if ( pdm)
                AppLog( "UIPulldownMenu event : " + widget->GetId() + " selected entry = " + String( pdm->GetSelectedId()) );
        }
    }
}

