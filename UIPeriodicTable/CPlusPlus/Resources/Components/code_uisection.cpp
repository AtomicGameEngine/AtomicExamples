// UISection application source code
#include <Atomic/UI/UISection.h>
#include "PeriodicApp.h"

void PeriodicApp::setup_uisection( UIWidget *layout )
{
    PODVector<UIWidget*> dest;
    layout->SearchWidgetClass( "TBButton", dest );
    for (unsigned ii = 0; ii < dest.Size(); ii++)
        SubscribeToEvent(dest[ii], E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUisectionEvent ));

    UIWidget *sec1 = layout->GetWidget("UISectionDemo");
    if (sec1)
        SubscribeToEvent( sec1, E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUisectionEvent ));
    UIWidget *sec2 = layout->GetWidget("UISection2Demo");
    if (sec2)
        SubscribeToEvent( sec2, E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUisectionEvent ));
}

void PeriodicApp::HandleUisectionEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace WidgetEvent;
    UIWidget* widget = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
    if ( widget == NULL ) return;

    if (eventData[P_TYPE] == UI_EVENT_TYPE_CLICK)
    {
        if (widget->GetId() == "uisectioncode" )
        {
            AppLog( "UISection support : " + widget->GetId() + " was pressed " );
            ViewCode ( "Components/code_uisection.cpp", widget->GetParent() );
        }
        if (widget->GetId() ==  "uisectionlayout" )
        {
            AppLog( "UISection support : " + widget->GetId() + " was pressed ");
            ViewCode ( "Scenes/layout_uisection.ui.txt", widget->GetParent() );
        }
    }
    if (eventData[P_TYPE] == UI_EVENT_TYPE_CHANGED )
    {
        UIWidget *demo1 = widget->FindWidget("UISectionDemo"); // event comes in on child widget!
        if ( demo1->IsAncestorOf(widget) )
            AppLog( "UISection event : " +  demo1->GetId() + " changed to value = " + String(demo1->GetValue()));

        UIWidget *demo2 = widget->FindWidget("UISection2Demo");
        if ( demo2->IsAncestorOf(widget)  )
            AppLog( "UISection event : " +  demo2->GetId() + " changed to value = " + String(demo2->GetValue()));
    }
}

