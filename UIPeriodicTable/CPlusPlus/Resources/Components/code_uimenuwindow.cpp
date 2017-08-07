// UIMenuWindow application source code
#include <ThirdParty/TurboBadger/tb_widgets.h>
#include <Atomic/UI/UIMenuWindow.h>
#include <Atomic/UI/UIMenubar.h>
#include "PeriodicApp.h"

void PeriodicApp::setup_uimenuwindow( UIWidget *layout )
{
    PODVector<UIWidget*> dest;
    layout->SearchWidgetClass( "TBButton", dest );
    for (unsigned ii = 0; ii < dest.Size(); ii++)
        SubscribeToEvent(dest[ii], E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUimenuwindowEvent ));
}

void PeriodicApp::HandleUimenuwindowEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace WidgetEvent;
    UIWidget* widget = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
    String refid = eventData[P_REFID].GetString();
    if ( widget == NULL) return;
    if (eventData[P_TYPE] == UI_EVENT_TYPE_CLICK)
    {
        if (widget->GetId() == "uimenuwindowcode" )
        {
            AppLog( "UIMenuWindow support : " + widget->GetId() + " was pressed " );
            ViewCode ( "Components/code_uimenuwindow.cpp", widget->GetParent() );
        }
        if (widget->GetId() ==  "uimenuwindowlayout" )
        {
            AppLog( "UIMenuWindow support : " + widget->GetId() + " was pressed ");
            ViewCode ( "Scenes/layout_.uimenuwindowui.txt", widget->GetParent() );
        }

        if (widget->GetId() ==  "uimenuwindowpush" )
        {
            AppLog( "UIMenuWindow action : " + widget->GetId() + " was pressed " );
            UIMenuWindow* mymenuwindow = new UIMenuWindow( context_, widget, "MenuWindowDemo");
            UIMenuItemSource *mis = new UIMenuItemSource(context_);
            mis->AddItem( new UIMenuItem( context_,"UISelectItem1", "item1" ) );
            mis->AddItem( new UIMenuItem( context_,"UISelectItem2", "item2", "Ctrl+C" ) );
            mis->AddItem( new UIMenuItem( context_,"UISelectItem3", "item3", "Ctrl+A", "DuckButton" ) );
            mis->AddItem( new UIMenuItem( context_,"UISelectItem4", "item4", "Ctrl+O", "LogoAtomic" ) );
            int xx = widget->GetX() + (widget->GetWidth()/2);
            int yy = widget->GetY() + (widget->GetHeight()/2);
            SubscribeToEvent(mymenuwindow, E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUimenuwindowEvent ));
            mymenuwindow->Show(mis, xx, yy);
        }

        if (widget->GetId() ==  "MenuWindowDemo" )
        {
            AppLog( "UIMenuWindow event : " + widget->GetId() + " and " + refid + " was selected ");
        }
    }
    else
    {
        if (widget->GetId() ==  "MenuWindowDemo" )
        {
            AppLog( "UIMenuWindow event : " + widget->GetId() +  " refid=" + refid + " event type=" + EventReport(eventData[P_TYPE].GetInt()));
        }
    }
}

