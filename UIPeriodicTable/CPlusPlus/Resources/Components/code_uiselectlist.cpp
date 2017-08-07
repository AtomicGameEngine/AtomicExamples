// UISelectList application source code
#include <ThirdParty/TurboBadger/tb_widgets.h>
#include <Atomic/UI/UISelectItem.h>
#include <Atomic/UI/UISelectList.h>
#include <Atomic/UI/UILayout.h>
#include "PeriodicApp.h"

void PeriodicApp::setup_uiselectlist( UIWidget *layout )
{
    PODVector<UIWidget*> dest;
    layout->SearchWidgetClass( "TBButton", dest );
    for (unsigned ii = 0; ii < dest.Size(); ii++)
        SubscribeToEvent(dest[ii], E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUiselectlistEvent ));

    UIWidget *slist = layout->GetWidget ("UISelectListDemo");
    if ( slist)
        SubscribeToEvent(slist, E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUiselectlistEvent ));
}

void PeriodicApp::HandleUiselectlistEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace WidgetEvent;
    UIWidget* widget = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
    String refid = eventData[P_REFID].GetString();
    if ( widget == NULL ) return;
    if (eventData[P_TYPE] == UI_EVENT_TYPE_CLICK)
    {
        if (widget->GetId() == "uiselectlistcode" )
        {
            AppLog( "UISelectList support : " + widget->GetId() + " was pressed " );
            ViewCode ( "Components/code_uiselectlist.cpp", widget->GetParent() );
        }
        if (widget->GetId() ==  "uiselectlistlayout" )
        {
            AppLog( "UISelectList support : " + widget->GetId() + " was pressed ");
            ViewCode ( "Scenes/layout_uiselectlist.ui.txt", widget->GetParent() );
        }

        if (widget->GetId() ==  "UISelectListDemo" )
        {
            AppLog( "UISelectList event : " + widget->GetId() + " and " + refid + " was selected ");
        }

        if (widget->GetId() ==  "selectlistadd" )
        {
            AppLog( "UISelectList action : " + widget->GetId() + " was pressed ");
            UISelectList* slist = static_cast<UISelectList*>(widget->FindWidget("UISelectListDemo"));
            slist->AddItem(slist->GetNumItems(), "New Entry");
        }
        if (widget->GetId() ==  "selectlistdel" )
        {
            AppLog( "UISelectList action : " + widget->GetId() + " was pressed ");
            UISelectList* slist = static_cast<UISelectList*>(widget->FindWidget("UISelectListDemo"));
            int si = slist->GetValue(); // this is the selected index
            slist->DeleteItem(si);
        }
        if (widget->GetId() ==  "selectlistdelall" )
        {
            AppLog( "UISelectList action : " + widget->GetId() + " was pressed ");
            UISelectList* slist = static_cast<UISelectList*>(widget->FindWidget("UISelectListDemo"));
            slist->DeleteAllItems();
        }
        if (widget->GetId() ==  "selectlistnew" )
        {
            AppLog( "UISelectList action : " + widget->GetId() + " was pressed ");
            UISelectList* slist = static_cast<UISelectList*>(widget->FindWidget("UISelectListDemo"));
            UISelectItemSource *sis = new UISelectItemSource(context_);
            sis->AddItem( new UISelectItem( context_, "list 1","list1", "LogoAtomic" ));
            sis->AddItem( new UISelectItem( context_, "list 2","list2", "" ));
            sis->AddItem( new UISelectItem( context_, "list 3","list3", "" ));
            sis->AddItem( new UISelectItem( context_, "list 4","list4", "" ));
            sis->AddItem( new UISelectItem( context_, "list 5","list5", "" ));
            sis->AddItem( new UISelectItem( context_, "list 6","list6", "" ));
            slist->SetSource(sis);
        }
    }
}

