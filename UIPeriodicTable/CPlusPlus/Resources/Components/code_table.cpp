// handle the periodic table jumps
#include <Atomic/UI/UIView.h>
#include <Atomic/UI/UITabContainer.h>
#include "PeriodicApp.h"

void PeriodicApp::setup_table( UIWidget *mylayout )
{
    UITabContainer *pgtable = (UITabContainer *)mylayout->GetWidget("pagetable");

    PODVector<UIWidget*> dest;
    pgtable->SearchWidgetClass( "TBButton", dest );
    for (unsigned ii = 0; ii < dest.Size(); ii++)  // set bulk event handlers on all buttons -- boom!
        SubscribeToEvent(dest[ii], E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleTableEvent));
}

// handle table clicks
void PeriodicApp::HandleTableEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace WidgetEvent;
    UIWidget* widget = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
    if ( widget == NULL ) return;

    if (eventData[P_TYPE] == UI_EVENT_TYPE_CLICK)
    {
        UITabContainer *maintb = (UITabContainer *)uiview_->FindWidget("maintabs");
        UITabContainer *acttb = (UITabContainer *)uiview_->FindWidget("primarytabs");
        UITabContainer *semitb = (UITabContainer *)uiview_->FindWidget("moretabs");
        UITabContainer *viewtb = (UITabContainer *)uiview_->FindWidget("supporttabs");
        UITabContainer *supporttb = (UITabContainer *)uiview_->FindWidget("atomictabs");

        if (widget->GetId() ==  "A1" )
        {
            maintb->SetCurrentPage(1);
            acttb->SetCurrentPage(0);
        }
        if (widget->GetId() ==  "A2" )
        {
            maintb->SetCurrentPage(1);
            acttb->SetCurrentPage(1);
        }
        if (widget->GetId() ==  "A3" )
        {
            maintb->SetCurrentPage(1);
            acttb->SetCurrentPage(2);
        }
        if (widget->GetId() ==  "A4" )
        {
            maintb->SetCurrentPage(1);
            acttb->SetCurrentPage(3);
        }
        if (widget->GetId() ==  "A5" )
        {
            maintb->SetCurrentPage(1);
            acttb->SetCurrentPage(4);
        }
        if (widget->GetId() ==  "A6" )
        {
            maintb->SetCurrentPage(1);
            acttb->SetCurrentPage(5);
        }
        if (widget->GetId() ==  "A7" )
        {
            maintb->SetCurrentPage(1);
            acttb->SetCurrentPage(6);
        }
        if (widget->GetId() ==  "A8" )
        {
            maintb->SetCurrentPage(1);
            acttb->SetCurrentPage(7);
        }
        if (widget->GetId() ==  "A9" )
        {
            maintb->SetCurrentPage(1);
            acttb->SetCurrentPage(8);
        }

        if (widget->GetId() ==  "B1" )
        {
            maintb->SetCurrentPage(2);
            semitb->SetCurrentPage(0);
        }
        if (widget->GetId() ==  "B2" )
        {
            maintb->SetCurrentPage(2);
            semitb->SetCurrentPage(1);
        }
        if (widget->GetId() ==  "B3" )
        {
            maintb->SetCurrentPage(2);
            semitb->SetCurrentPage(2);
        }
        if (widget->GetId() ==  "B4" )
        {
            maintb->SetCurrentPage(2);
            semitb->SetCurrentPage(3);
        }
        if (widget->GetId() ==  "B5" )
        {
            maintb->SetCurrentPage(2);
            semitb->SetCurrentPage(4);
        }
        if (widget->GetId() ==  "B6" )
        {
            maintb->SetCurrentPage(2);
            semitb->SetCurrentPage(5);
        }
        if (widget->GetId() ==  "B7" )
        {
            maintb->SetCurrentPage(2);
            semitb->SetCurrentPage(6);
        }
        if (widget->GetId() ==  "B8" )
        {
            maintb->SetCurrentPage(2);
            semitb->SetCurrentPage(7);
        }
        if (widget->GetId() ==  "B9" )
        {
            maintb->SetCurrentPage(2);
            semitb->SetCurrentPage(8);
        }

        if (widget->GetId() ==  "C1" )
        {
            maintb->SetCurrentPage(3);
            viewtb->SetCurrentPage(0);
        }
        if (widget->GetId() ==  "C2" )
        {
            maintb->SetCurrentPage(3);
            viewtb->SetCurrentPage(1);
        }
        if (widget->GetId() ==  "C3" )
        {
            maintb->SetCurrentPage(3);
            viewtb->SetCurrentPage(2);
        }
        if (widget->GetId() ==  "C4" )
        {
            maintb->SetCurrentPage(3);
            viewtb->SetCurrentPage(3);
        }
        if (widget->GetId() ==  "C5" )
        {
            maintb->SetCurrentPage(3);
            viewtb->SetCurrentPage(4);
        }
        if (widget->GetId() ==  "C6" )
        {
            maintb->SetCurrentPage(3);
            viewtb->SetCurrentPage(5);
        }
        if (widget->GetId() ==  "C7" )
        {
            maintb->SetCurrentPage(3);
            viewtb->SetCurrentPage(6);
        }
        if (widget->GetId() ==  "C8" )
        {
            maintb->SetCurrentPage(3);
            viewtb->SetCurrentPage(7);
        }
        if (widget->GetId() ==  "C9" )
        {
            maintb->SetCurrentPage(3);
            viewtb->SetCurrentPage(8);
        }

        if (widget->GetId() ==  "D2" )
        {
            maintb->SetCurrentPage(4);
            supporttb->SetCurrentPage(0);
        }
        if (widget->GetId() ==  "D3" )
        {
            maintb->SetCurrentPage(4);
            supporttb->SetCurrentPage(1);
        }
        if (widget->GetId() ==  "D4" )
        {
            maintb->SetCurrentPage(4);
            supporttb->SetCurrentPage(2);
        }
        if (widget->GetId() ==  "D5" )
        {
            maintb->SetCurrentPage(4);
            supporttb->SetCurrentPage(3);
        }
        if (widget->GetId() ==  "D6" )
        {
            maintb->SetCurrentPage(4);
            supporttb->SetCurrentPage(4);
        }
        if (widget->GetId() ==  "D7" )
        {
            maintb->SetCurrentPage(4);
            supporttb->SetCurrentPage(5);
        }
        if (widget->GetId() ==  "D8" )
        {
            maintb->SetCurrentPage(4);
            supporttb->SetCurrentPage(6);
        }
        if (widget->GetId() ==  "D9" )
        {
            maintb->SetCurrentPage(4);
            supporttb->SetCurrentPage(7);
        }
    }
}

