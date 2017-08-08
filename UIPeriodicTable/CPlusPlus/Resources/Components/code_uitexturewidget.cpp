// UITextureWidget application source code
#include <Atomic/UI/UITextureWidget.h>
#include <Atomic/Resource/ResourceCache.h>
#include <Atomic/UI/UILayout.h>
#include <Atomic/UI/UIButton.h>
#include <Atomic/Graphics/Texture2D.h>
#include "PeriodicApp.h"

void PeriodicApp::setup_uitexturewidget( UIWidget *layout )
{
    PODVector<UIWidget*> dest;
    layout->SearchWidgetClass( "TBButton", dest );
    for (unsigned ii = 0; ii < dest.Size(); ii++)
        SubscribeToEvent(dest[ii], E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUitexturewidgetEvent ));

    ResourceCache* cache = GetSubsystem<ResourceCache>();
    UITextureWidget* mytexturewidget = new UITextureWidget(context_);
    mytexturewidget->SetId( "UITextureWidgetDemo");
    if ( mytexturewidget )
    {
        Texture2D *mytex = new Texture2D(context_);
        if ( mytex )
        {
            mytex = cache->GetResource<Texture2D>("Textures/planet.jpg");
            mytexturewidget->SetTexture(mytex);
        }
    }
    SubscribeToEvent( mytexturewidget, E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUitexturewidgetEvent ));
    UILayoutParams *lpx = new UILayoutParams(context_);
    lpx->SetWidth (256);
    lpx->SetHeight(256);
    lpx->SetMinWidth(256);
    lpx->SetMinHeight(256);
    lpx->SetMaxWidth (256);
    lpx->SetMaxHeight(256);
    mytexturewidget->SetLayoutParams(lpx);
    UIWidget* lower = layout->GetWidget("uitexturewidgetlower");
    UIWidget* mysvc = layout->GetWidget("uitwcontainer");
    mysvc->AddChildBefore( mytexturewidget, lower);

    UILayout *lo1 = new UILayout(context_);
    mysvc->AddChildBefore(lo1, lower);

    UIButton *b1 = new UIButton(context_);
    b1->SetId( "uitexturewidgetch1");
    b1->SetText("Change texture to new build");
    lo1->AddChild(b1);
    SubscribeToEvent( b1, E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUitexturewidgetEvent ));
    UIButton *b2 = new UIButton(context_);
    b2->SetId( "uitexturewidgetch2");
    b2->SetText("Change texture to colorwheel");
    lo1->AddChild(b2);
    SubscribeToEvent( b2, E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUitexturewidgetEvent ));
    UIButton *b3 = new UIButton(context_);
    b3->SetId( "uitexturewidgetch3");
    b3->SetText("Change texture to planet");
    lo1->AddChild(b3);
    SubscribeToEvent( b3, E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUitexturewidgetEvent ));

}

void PeriodicApp::HandleUitexturewidgetEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace WidgetEvent;
    UIWidget* widget = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
    if ( widget == NULL ) return;
    if (eventData[P_TYPE] == UI_EVENT_TYPE_CLICK)
    {
        if (widget->GetId() == "uitexturewidgetcode" )
        {
            AppLog( "UITextureWidget support : " + widget->GetId() + " was pressed " );
            ViewCode ( "Components/code_uitexturewidget.cpp", widget->GetParent() );
        }
        if (widget->GetId() ==  "uitexturewidgetlayout" )
        {
            AppLog( "UITextureWidget support : " + widget->GetId() + " was pressed ");
            ViewCode ( "Scenes/layout_uitexturewidget.ui.txt", widget->GetParent() );
        }

        if (widget->GetId() ==  "uitexturewidgetch1" )
        {
            AppLog( "UITextureWidget support : " + widget->GetId() + " was pressed ");
            ResourceCache* cache = GetSubsystem<ResourceCache>();
            UITextureWidget *tw = static_cast<UITextureWidget*>(widget->FindWidget("UITextureWidgetDemo"));
            tw->SetTexture( cache->GetResource<Texture2D>("Textures/newbuilddetected_header.jpg") );
        }
        if (widget->GetId() ==  "uitexturewidgetch2" )
        {
            AppLog( "UITextureWidget support : " + widget->GetId() + " was pressed ");
            ResourceCache* cache = GetSubsystem<ResourceCache>();
            UITextureWidget *tw = static_cast<UITextureWidget*>(widget->FindWidget("UITextureWidgetDemo"));
            tw->SetTexture( cache->GetResource<Texture2D>("Textures/HSV21.png") );
        }
        if (widget->GetId() ==  "uitexturewidgetch3" )
        {
            AppLog( "UITextureWidget support : " + widget->GetId() + " was pressed ");
            ResourceCache* cache = GetSubsystem<ResourceCache>();
            UITextureWidget *tw = static_cast<UITextureWidget*>(widget->FindWidget("UITextureWidgetDemo"));
            tw->SetTexture( cache->GetResource<Texture2D>("Textures/planet.jpg") );
        }
    }
}

