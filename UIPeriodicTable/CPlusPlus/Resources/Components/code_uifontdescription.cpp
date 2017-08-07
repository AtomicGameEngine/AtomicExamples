// UIFontdescription application source code
#include <Atomic/UI/UISlider.h>
#include <Atomic/UI/UIFontDescription.h>
#include <Atomic/UI/UITextField.h>
#include "PeriodicApp.h"

void PeriodicApp::setup_uifontdescription( UIWidget *layout )
{
    PODVector<UIWidget*> dest;
    layout->SearchWidgetClass( "TBButton", dest );
    for (unsigned ii = 0; ii < dest.Size(); ii++)
        SubscribeToEvent(dest[ii], E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUifontdescriptionEvent ));

    UISlider *steps = static_cast<UISlider*>(layout->GetWidget("fontstep"));
    if(steps)
        SubscribeToEvent(steps, E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUifontdescriptionEvent ));
}

void PeriodicApp::HandleUifontdescriptionEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace WidgetEvent;
    UIWidget* widget = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
    if ( widget == NULL ) return;
    if (eventData[P_TYPE] == UI_EVENT_TYPE_CLICK)
    {
        if (widget->GetId() == "uifontdescriptioncode" )
        {
            AppLog( "UIFontdescription support : " + widget->GetId() + " was pressed " );
            ViewCode ( "Components/code_uifontdescription.cpp", widget->GetParent() );
        }
        if (widget->GetId() ==  "uifontdescriptionlayout" )
        {
            AppLog( "UIFontdescription support : " + widget->GetId() + " was pressed ");
            ViewCode ( "Scenes/layout_uifontdescription.ui.txt", widget->GetParent() );
        }
    }
    else if (eventData[P_TYPE] == UI_EVENT_TYPE_CHANGED )
    {
        if ( widget->GetId() ==  "fontstep" )
        {
            UISlider *uis = static_cast<UISlider*>(widget);
            if (uis)
            {
                UITextField *mytext = static_cast<UITextField*>(widget->FindWidget("changetext"));
                UIFontDescription *myfont = new UIFontDescription(context_);
                myfont->SetSize(int(uis->GetValue()));
                myfont->SetId("Vera");
                mytext->SetFontDescription (myfont);
                mytext->SetText ( "Size " + String (int (uis->GetValue())));
                AppLog( "UIFontdescription action : " + widget->GetId() + " step size changed to " + String (uis->GetValue()));
            }
        }
    }
}

