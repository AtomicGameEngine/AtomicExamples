// UIMenuItem and UIMenuItemSource application source code
#include <ThirdParty/TurboBadger/tb_widgets.h>
#include <Atomic/UI/UIMenuWindow.h>
#include <Atomic/UI/UIMenubar.h>
#include "PeriodicApp.h"

void PeriodicApp::setup_uimenuitem( UIWidget *layout )
{
    PODVector<UIWidget*> dest;
    layout->SearchWidgetClass( "TBButton", dest );
    for (unsigned ii = 0; ii < dest.Size(); ii++)
        SubscribeToEvent(dest[ii], E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUimenuitemEvent ));

    UIMenuItemSource *mis = new UIMenuItemSource(context_);
    mis->AddItem( new UIMenuItem( context_,"UISelectItem1", "item1" ) );
    mis->AddItem( new UIMenuItem( context_,"UISelectItem2", "item2", "Ctrl+." ) );
    mis->AddItem( new UIMenuItem( context_,"UISelectItem3", "item3", "Ctrl+A", "DuckButton" ) );
    mis->AddItem( new UIMenuItem( context_,"UISelectItem4", "item4", "Ctrl+O", "LogoAtomic" ) );
    context_->SetGlobalVar( "menuitemptr", mis );
}

void PeriodicApp::HandleUimenuitemEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace WidgetEvent;
    UIWidget* widget = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
    String refid = eventData[P_REFID].GetString();
    if ( widget == NULL ) return;
    if (eventData[P_TYPE] == UI_EVENT_TYPE_CLICK)
    {
        if (widget->GetId() == "uimenuitemcode" )
        {
            AppLog( "UIMenuItem support : " + widget->GetId() + " was pressed " );
            ViewCode ( "Components/code_uimenuitem.cpp", widget->GetParent() );
        }
        if (widget->GetId() ==  "uimenuitemlayout" )
        {
            AppLog( "UIMenuItem support : " + widget->GetId() + " was pressed ");
            ViewCode ( "Scenes/layout_uimenuitem.ui.txt", widget->GetParent() );
        }

        if (widget->GetId() ==  "uimenuitempush" )
        {
            UIMenuItemSource *gmis = (UIMenuItemSource*)context_->GetGlobalVar("menuitemptr").GetPtr();
            UIMenuWindow* mymenuwindow = new UIMenuWindow( context_, widget, "MenuItemDemo");
            int xx = widget->GetX() + (widget->GetWidth()/2);
            int yy = widget->GetY() + (widget->GetHeight()/2);
            SubscribeToEvent(mymenuwindow, E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUimenuitemEvent ));
            mymenuwindow->Show(gmis, xx, yy);
        }

        if (widget->GetId() ==  "MenuItemDemo" )
        {
            AppLog( "UIMenuItem event : " + widget->GetId() + " and " + refid + " was selected ");
        }

        if (widget->GetId() ==  "uimi1" )
        {
            AppLog( "UIMenuItem action : " + widget->GetId() + " was pressed ");
            UIMenuItemSource *gmis = (UIMenuItemSource*)context_->GetGlobalVar("menuitemptr").GetPtr();
            gmis->AddItem( new UIMenuItem( context_, "New UIMenuItem") );
        }
        if (widget->GetId() ==  "uimi2" )
        {
            AppLog( "UIMenuItem action : " + widget->GetId() + " was pressed ");
            UIMenuItemSource *gmis = (UIMenuItemSource*)context_->GetGlobalVar("menuitemptr").GetPtr();
            gmis->AddItem( new UIMenuItem( context_, "Newer UIMenuItem", "neweritem" ) );
        }
        if (widget->GetId() ==  "uimi3" )
        {
            AppLog( "UIMenuItem action : " + widget->GetId() + " was pressed ");
            UIMenuItemSource *gmis = (UIMenuItemSource*)context_->GetGlobalVar("menuitemptr").GetPtr();
            gmis->AddItem( new UIMenuItem( context_, "A Duck", "aduck", "", "DuckButton" ) );
        }
        if (widget->GetId() ==  "uimi4" )
        {
            AppLog( "UIMenuItem action : " + widget->GetId() + " was pressed ");
            UIMenuItemSource *gmis = (UIMenuItemSource*)context_->GetGlobalVar("menuitemptr").GetPtr();
            gmis->AddItem( new UIMenuItem( context_, "Atomic!", "atomic", "", "LogoAtomic" ) );
        }
        if (widget->GetId() ==  "uimi5" )
        {
            AppLog( "UIMenuItem action : " + widget->GetId() + " was pressed ");
            UIMenuItemSource *gmis = (UIMenuItemSource*)context_->GetGlobalVar("menuitemptr").GetPtr();
            gmis->Clear();
        }
    }
}

