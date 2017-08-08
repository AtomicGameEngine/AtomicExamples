// UIImageWidget application source code
#include <Atomic/UI/UIImageWidget.h>
#include "PeriodicApp.h"

void PeriodicApp::setup_uiimagewidget( UIWidget *layout )
{
    PODVector<UIWidget*> dest;
    layout->SearchWidgetClass( "TBButton", dest );
    for (unsigned ii = 0; ii < dest.Size(); ii++)
        SubscribeToEvent(dest[ii], E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUiimagewidgetEvent ));
}

void PeriodicApp::HandleUiimagewidgetEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace WidgetEvent;
    UIWidget* widget = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
    if ( widget == NULL ) return;
    if (eventData[P_TYPE] == UI_EVENT_TYPE_CLICK)
    {
        if (widget->GetId() == "uiimagewidgetcode" )
        {
            AppLog( "UIImageWidget support : " + widget->GetId() + " was pressed " );
            ViewCode ( "Components/code_uiimagewidget.cpp", widget->GetParent() );
        }
        if (widget->GetId() ==  "uiimagewidgetlayout" )
        {
            AppLog( "UIImageWidget support : " + widget->GetId() + " was pressed ");
            ViewCode ( "Scenes/layout_uiimagewidget.ui.txt", widget->GetParent() );
        }

        if (widget->GetId() ==  "imagecolor" )
        {
            AppLog( "UIImageWidget action : " + widget->GetId() + " was pressed ");
            UIImageWidget *img1 = static_cast<UIImageWidget*>( widget->FindWidget("imagewidgetdemo") );
            img1->SetImage("Textures/HSV21.png");
        }
        if (widget->GetId() ==  "imagenewbuild" )
        {
            AppLog( "UIImageWidget action : " + widget->GetId() + " was pressed ");
            UIImageWidget *img2 = static_cast<UIImageWidget*>( widget->FindWidget("imagewidgetdemo") );
            img2->SetImage("Textures/newbuilddetected_header.jpg");
        }
    }
}

