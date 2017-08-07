// UIScrollBar application source code
#include <Atomic/UI/UIScrollBar.h>
#include "PeriodicApp.h"

void PeriodicApp::setup_uiscrollbar( UIWidget *layout )
{
    PODVector<UIWidget*> dest;
    layout->SearchWidgetClass( "TBButton", dest );
    for (unsigned ii = 0; ii < dest.Size(); ii++)
        SubscribeToEvent(dest[ii], E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUiscrollbarEvent ));

    UIWidget *sbx = layout->GetWidget("scrollbardemo");
    if (sbx)  // warning - this will route for all scrollbar instances events into this event handler.
        sbx->SubscribeToEvent( E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleAllScrollcontainerEvent ));
}

void PeriodicApp::HandleAllScrollcontainerEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace WidgetEvent;
    UIWidget* widget = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
    if ( widget == NULL ) return;

    UIWidget *sbx = widget->FindWidget("scrollbardemo");  // find our scrollbar
    if ( widget != sbx ) return; // if its not ours, bail

    if (eventData[P_TYPE] == UI_EVENT_TYPE_CHANGED )
    {
        if (widget->GetId() ==  "scrollbardemo" )
        {
            AppLog( "UIScrollBar action : " + widget->GetId() + " changed value to " + String (widget->GetValue()));
        }
    }
}

void PeriodicApp::HandleUiscrollbarEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace WidgetEvent;
    UIWidget* widget = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
    if ( widget == NULL ) return;

    if (eventData[P_TYPE] == UI_EVENT_TYPE_CLICK)
    {
        if (widget->GetId() == "uiscrollbarcode" )
        {
            AppLog( "UIScrollBar support : " + widget->GetId() + " was pressed " );
            ViewCode ( "Components/code_uiscrollbar.cpp", widget->GetParent() );
        }
        if (widget->GetId() ==  "uiscrollbarlayout" )
        {
            AppLog( "UIScrollBar support : " + widget->GetId() + " was pressed ");
            ViewCode ( "Scenes/layout_uiscrollbar.ui.txt", widget->GetParent() );
        }
    }
}

