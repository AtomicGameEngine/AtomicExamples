// UIEditField application source code
#include <Atomic/Resource/ResourceCache.h>
#include <Atomic/UI/UIEditField.h>
#include "PeriodicApp.h"

void PeriodicApp::setup_uieditfield( UIWidget *layout )
{
    PODVector<UIWidget*> dest;
    layout->SearchWidgetClass( "TBButton", dest );
    for (unsigned ii = 0; ii < dest.Size(); ii++)
        SubscribeToEvent(dest[ii], E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUieditfieldEvent ));

    UIWidget *ed1 = layout->GetWidget("editfieldsingle");
    if ( ed1)
        SubscribeToEvent(ed1, E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUieditfieldEvent ));
    UIWidget *ed2 = layout->GetWidget("editfieldmulti");
    if ( ed2)
        SubscribeToEvent(ed2, E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUieditfieldEvent ));
}

void PeriodicApp::HandleUieditfieldEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace WidgetEvent;
    UIWidget* widget = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
    if ( widget == NULL ) return;
    if (eventData[P_TYPE] == UI_EVENT_TYPE_CLICK)
    {
        if (widget->GetId() == "uieditfieldcode" )
        {
            AppLog( "UIEditField support : " + widget->GetId() + " was pressed " );
            ViewCode ( "Components/code_uieditfield.cpp", widget->GetParent() );
        }
        if (widget->GetId() ==  "uieditfieldlayout" )
        {
            AppLog( "UIEditField support : " + widget->GetId() + " was pressed ");
            ViewCode ( "Scenes/layout_uieditfield.ui.txt", widget->GetParent() );
        }

        if (widget->GetId() ==  "editfieldadd" )
        {
            AppLog( "UIEditField action : " + widget->GetId() + " was pressed ");
            UIEditField *ef1 = static_cast<UIEditField*>(widget->FindWidget("editfieldmulti"));
            if(ef1)
            {
                ResourceCache* cache = GetSubsystem<ResourceCache>();
                SharedPtr<File> filex = cache->GetFile("Scenes/layout_uieditfield.ui.txt");
                String textx = filex->ReadText();
                filex->Close();
                ef1->SetText(textx);
            }
        }
        if (widget->GetId() ==  "editfieldclr" )
        {
            AppLog( "UIEditField action : " + widget->GetId() + " was pressed ");
            UIEditField *ef2 = static_cast<UIEditField*>(widget->FindWidget("editfieldmulti"));
            if(ef2)
                ef2->SetText("");
        }
    }
    else
    {
        if ( widget->GetId() ==  "editfieldsingle" )
        {
            UIEditField *efx = static_cast<UIEditField*>(widget);
            AppLog( "UIEditField event : " + widget->GetId() + " text = `" + efx->GetText() + "` event type = " + EventReport(eventData[P_TYPE].GetInt()));
        }
        if ( widget->GetId() ==  "editfieldmulti" )
        {
            UIEditField *efx = static_cast<UIEditField*>(widget);
            AppLog( "UIEditField event : " + widget->GetId() + " text = `" + efx->GetText() + "` event type = " + EventReport(eventData[P_TYPE].GetInt()));
        }
    }
}

