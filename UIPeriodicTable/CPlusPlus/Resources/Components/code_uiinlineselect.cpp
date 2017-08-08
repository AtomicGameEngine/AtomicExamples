// UIInlineSelect application source code
#include <Atomic/UI/UIInlineSelect.h>
#include <Atomic/UI/UISlider.h>
#include "PeriodicApp.h"

void PeriodicApp::setup_uiinlineselect( UIWidget *layout )
{
    PODVector<UIWidget*> dest;
    layout->SearchWidgetClass( "TBButton", dest );
    for (unsigned ii = 0; ii < dest.Size(); ii++)
        SubscribeToEvent(dest[ii], E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUiinlineselectEvent ));

    UISlider *steps = static_cast<UISlider*>(layout->GetWidget("ilsstep"));
    if(steps)
        SubscribeToEvent(steps, E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUiinlineselectEvent ));

    UIInlineSelect *ils = static_cast<UIInlineSelect*>(layout->GetWidget("inlineselectdemo"));
    if (ils)
        SubscribeToEvent( ils, E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUiinlineselectEvent ));
}

void PeriodicApp::HandleUiinlineselectEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace WidgetEvent;
    UIWidget* widget = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
    if ( widget == NULL ) return;
    if (eventData[P_TYPE] == UI_EVENT_TYPE_CLICK)
    {
        if (widget->GetId() == "uiinlineselectcode" )
        {
            AppLog( "UIInlineSelect support : " + widget->GetId() + " was pressed " );
            ViewCode ( "Components/code_uiinlineselect.cpp", widget->GetParent() );
        }
        if (widget->GetId() ==  "uiinlineselectlayout" )
        {
            AppLog( "UIInlineSelect support : " + widget->GetId() + " was pressed ");
            ViewCode ( "Scenes/layout_uiinlineselect.ui.txt", widget->GetParent() );
        }
    }
    else if (eventData[P_TYPE] == UI_EVENT_TYPE_CHANGED )
    {
        if (widget->GetId() == "inlineselectdemo" )
        {
            UIInlineSelect *ils = static_cast<UIInlineSelect*>(widget);
            if(ils)
            {
                AppLog( "UIInlineSelect event : " + widget->GetId() + " changed value to " + String (ils->GetValue()) );
            }
        }

        if (widget->GetId() == "ilsstep" )
        {
            UISlider *steps = static_cast<UISlider*>(widget);
            if(steps)
            {
                UIInlineSelect *ils = static_cast<UIInlineSelect*>(widget->FindWidget("inlineselectdemo"));
                if(ils)
                {
                    ils->SetStepSize (steps->GetValue());
                }
                AppLog( "UIInlineSelect event : " + widget->GetId() + " step size changed to " + String (steps->GetValue()));
            }
        }
    }
}

