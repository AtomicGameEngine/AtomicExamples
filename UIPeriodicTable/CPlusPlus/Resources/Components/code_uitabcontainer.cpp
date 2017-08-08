// UITabContainer application source code
#include <Atomic/Resource/ResourceCache.h>
#include <Atomic/IO/FileSystem.h>
#include <Atomic/UI/UITabContainer.h>
#include <Atomic/UI/UIWindow.h>
#include <Atomic/UI/UILayout.h>
#include <Atomic/UI/UIEditField.h>
#include <Atomic/UI/UIButton.h>
#include <Atomic/UI/UIFontDescription.h>
#include "PeriodicApp.h"

void PeriodicApp::setup_uitabcontainer( UIWidget *layout )
{
    PODVector<UIWidget*> dest;
    layout->SearchWidgetClass( "TBButton", dest );
    for (unsigned ii = 0; ii < dest.Size(); ii++)
        SubscribeToEvent(dest[ii], E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUitabcontainerEvent ));

    UITabContainer *tcx = static_cast<UITabContainer*>(layout->GetWidget("UITabContainerDemo"));
    if ( tcx)
    {
        tcx->SetCurrentPage(0);   // fix or it looks like crap
        tcx->SubscribeToEvent( E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleAllTabcontainerEvent ));
        // warning - this will route for all UITabContainer instances events into this event handler.
    }
}

void PeriodicApp::HandleAllTabcontainerEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace WidgetEvent;
    UIWidget* widget = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
    String refid = eventData[P_REFID].GetString();
    if ( widget == NULL ) return;

    UIWidget *demo = widget->FindWidget("UITabContainerDemo");  // find our specific widget
    if ( widget != demo ) return; // if its not ours, bail

    if (eventData[P_TYPE] == UI_EVENT_TYPE_TAB_CHANGED )
    {
        if ( widget->GetId() ==  "UITabContainerDemo" )
        {
            UITabContainer *tcx = static_cast<UITabContainer*>(widget);  // check the focus & stuff, or it gets a little spammy
            if ( tcx && ( tcx->GetState(UI_WIDGET_STATE_FOCUSED) == true ) )
                AppLog( "UITabContainer event : " + widget->GetId() + " UI_EVENT_TYPE_TAB_CHANGED to " + String( tcx->GetCurrentPage() )
                        + " id: " + tcx->GetCurrentPageWidget()->GetId() );
        }
    }
}


void PeriodicApp::HandleUitabcontainerEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace WidgetEvent;
    UIWidget* widget = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
    String refid = eventData[P_REFID].GetString();
    if ( widget == NULL ) return;
    if (eventData[P_TYPE] == UI_EVENT_TYPE_CLICK)
    {
        if (widget->GetId() == "uitabcontainercode" )
        {
            AppLog( "UITabContainer support : " + widget->GetId() + " was pressed " );
            ViewCode ( "Components/code_uitabcontainer.cpp", widget->GetParent() );
        }
        if (widget->GetId() ==  "uitabcontainerlayout" )
        {
            AppLog( "UITabContainer support : " + widget->GetId() + " was pressed ");
            ViewCode ( "Scenes/layout_uitabcontainer.ui.txt", widget->GetParent() );
        }


        if (widget->GetId() ==  "uitabcontainerremove" )
        {
            AppLog( "UITabContainer action : " + widget->GetId() + " was pressed ");
            UITabContainer *tcx = static_cast<UITabContainer*>(widget->FindWidget("UITabContainerDemo"));
            int current = tcx->GetCurrentPage();
            tcx->DeletePage(current);
        }
        if (widget->GetId() ==  "uitabcontaineradd" )
        {
            AppLog( "UITabContainer action : " + widget->GetId() + " was pressed ");
            UITabContainer *tcx = static_cast<UITabContainer*>(widget->FindWidget("UITabContainerDemo"));
            tcx->AddTabPageFile("New File", "Scenes/sheet.ui.txt" );
        }
        if (widget->GetId() ==  "uitabcontainermake" )
        {
            AppLog( "UITabContainer action : " + widget->GetId() + " was pressed ");
            ResourceCache* cache = GetSubsystem<ResourceCache>();
            UITabContainer *tcx = static_cast<UITabContainer*>(widget->FindWidget("UITabContainerDemo"));
            UILayout *lo = new UILayout(context_);
            lo->SetLayoutConfig ( "YAGAC" );  // YACAC!
            UIEditField *myeditfield = new UIEditField(context_);
            myeditfield->SetGravity( UI_GRAVITY_ALL);
            myeditfield->SetMultiline(true);
            SharedPtr<File> filex = cache->GetFile("Components/code_uitabcontainer.cpp");
            String textx = filex->ReadText();
            filex->Close();
            myeditfield->SetText(textx);
            UIFontDescription *myfont = new UIFontDescription(context_); // put in a coder font
            myfont->SetSize(16);
            myfont->SetId("Vera");
            myeditfield->SetFontDescription (myfont);
            lo->AddChild (myeditfield);
            tcx->AddTabPageWidget("New Code", lo);
        }
        if (widget->GetId() ==  "uitabcontainerundock" )
        {
            AppLog( "UITabContainer action : " + widget->GetId() + " was pressed ");
            UITabContainer *tcx = static_cast<UITabContainer*>(widget->FindWidget("UITabContainerDemo"));
            int current = tcx->GetCurrentPage();
            tcx->UndockPage(current);
        }
        if (widget->GetId() ==  "uitabcontainerredock" )
        {
            AppLog( "UITabContainer action : " + widget->GetId() + " was pressed ");
            UITabContainer *tcx = static_cast<UITabContainer*>(widget->FindWidget("UITabContainerDemo"));
            if ( !tcx->DockWindow ( "tab1" ) )
                if ( !tcx->DockWindow ( "tab2" ) )
                    if ( !tcx->DockWindow ( "tab3" ) )
                        if ( !tcx->DockWindow ( "New File" ) )
                            if ( !tcx->DockWindow ( "New Code" ) )
                                AppLog( "UITabContainer action : no more windows to dock.");
        }
    }
}

