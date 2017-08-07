// UISelectItem and UISelectItemSource application source code
#include <ThirdParty/TurboBadger/tb_widgets.h>
#include <Atomic/UI/UISelectItem.h>
#include <Atomic/UI/UISelectList.h>
#include <Atomic/UI/UILayout.h>
#include "PeriodicApp.h"

void PeriodicApp::setup_uiselectitem( UIWidget *layout )
{
    PODVector<UIWidget*> dest;
    layout->SearchWidgetClass( "TBButton", dest );
    for (unsigned ii = 0; ii < dest.Size(); ii++)
        SubscribeToEvent(dest[ii], E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUiselectitemEvent ));

    UISelectList *mylist = new UISelectList(context_);
    mylist->SetId( "UISelectItemList"); // tag it, in case we want to get it again later
    UILayoutParams *lpx = new UILayoutParams(context_);
    lpx->SetWidth (200);
    lpx->SetHeight(256);
    lpx->SetMinWidth(200);
    lpx->SetMinHeight(256);
    lpx->SetMaxWidth (200);
    lpx->SetMaxHeight(256);
    mylist->SetLayoutParams(lpx);
    UIWidget* lower = layout->GetWidget("selectitemlower");
    UIWidget* mysvc = layout->GetWidget("selectitemlayout");
    mysvc->AddChildBefore(mylist, lower);
    SubscribeToEvent(mylist, E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUiselectitemEvent ));

    UISelectItemSource *sis = new UISelectItemSource(context_);
    sis->AddItem( new UISelectItem( context_, "UISelectItem1", "sitem1" ) );
    sis->AddItem( new UISelectItem( context_, "UISelectItem2", "sitem2" ) );
    sis->AddItem( new UISelectItem( context_, "UISelectItem3", "sitem3", "DuckButton" ) );
    sis->AddItem( new UISelectItem( context_, "UISelectItem4", "sitem4", "LogoAtomic" ) );
    context_->SetGlobalVar( "selectitemptr", sis );  // make a global reference.

    mylist->SetSource(sis); // assign this into the list
}

void PeriodicApp::HandleUiselectitemEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace WidgetEvent;
    UIWidget* widget = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
    String refid = eventData[P_REFID].GetString();
    if ( widget == NULL ) return;
    if (eventData[P_TYPE] == UI_EVENT_TYPE_CLICK)
    {
        if (widget->GetId() == "uiselectitemcode" )
        {
            AppLog( "UISelectItem support : " + widget->GetId() + " was pressed " );
            ViewCode ( "Components/code_uiselectitem.cpp", widget->GetParent() );
        }
        if (widget->GetId() ==  "uiselectitemlayout" )
        {
            AppLog( "UISelectItem support : " + widget->GetId() + " was pressed ");
            ViewCode ( "Scenes/layout_uiselectitem.ui.txt", widget->GetParent() );
        }

        if (widget->GetId() ==  "UISelectItemList" )
        {
            AppLog( "UISelectItem event : " + widget->GetId() + " and " + refid + " was selected ");
        }

        if (widget->GetId() ==  "uisi1" )
        {
            AppLog( "UISelectItem action : " + widget->GetId() + " was pressed ");
            UISelectItemSource *gsis = (UISelectItemSource*)context_->GetGlobalVar("selectitemptr").GetPtr();
            UISelectList* slist = static_cast<UISelectList*>(widget->FindWidget("UISelectItemList"));
            gsis->AddItem( new UISelectItem( context_, "New UISelectItem") );
            slist->SetSource(gsis);
        }
        if (widget->GetId() ==  "uisi2" )
        {
            AppLog( "UISelectItem action : " + widget->GetId() + " was pressed ");
            UISelectItemSource *gsis = (UISelectItemSource*)context_->GetGlobalVar("selectitemptr").GetPtr();
            UISelectList* slist = static_cast<UISelectList*>(widget->FindWidget("UISelectItemList"));
            gsis->AddItem( new UISelectItem( context_,"Newer UISelectItem", "neweritem" ) );
            slist->SetSource(gsis);
        }
        if (widget->GetId() ==  "uisi3" )
        {
            AppLog( "UISelectItem action : " + widget->GetId() + " was pressed ");
            UISelectItemSource *gsis = (UISelectItemSource*)context_->GetGlobalVar("selectitemptr").GetPtr();
            UISelectList* slist = static_cast<UISelectList*>(widget->FindWidget("UISelectItemList"));
            gsis->AddItem( new UISelectItem(context_,  "A Duck", "aduck", "DuckButton" ) );
            slist->SetSource(gsis);
        }
        if (widget->GetId() ==  "uisi4" )
        {
            AppLog( "UISelectItem action : " + widget->GetId() + " was pressed ");
            UISelectItemSource *gsis = (UISelectItemSource*)context_->GetGlobalVar("selectitemptr").GetPtr();
            UISelectList* slist = static_cast<UISelectList*>(widget->FindWidget("UISelectItemList"));
            gsis->AddItem( new UISelectItem(context_, "Atomic!", "atomic", "LogoAtomic" ) );
            slist->SetSource(gsis);
        }
        if (widget->GetId() ==  "uisi5" )
        {
            AppLog( "UISelectItem action : " + widget->GetId() + " was pressed ");
            UISelectItemSource *gsis = (UISelectItemSource*)context_->GetGlobalVar("selectitemptr").GetPtr();
            UISelectList* slist = static_cast<UISelectList*>(widget->FindWidget("UISelectItemList"));
            gsis->Clear();
            slist->SetSource(gsis);
        }
    }
}

