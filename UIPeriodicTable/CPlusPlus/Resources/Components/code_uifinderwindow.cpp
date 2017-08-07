// UIFinderWindow application source code
#include <Atomic/UI/UIEvents.h>
#include <Atomic/UI/UIFinderWindow.h>
#include "PeriodicApp.h"

void PeriodicApp::setup_uifinderwindow( UIWidget *layout, UIView *uiview )
{
    PODVector<UIWidget*> dest;
    layout->SearchWidgetClass( "TBButton", dest );
    for (unsigned ii = 0; ii < dest.Size(); ii++)
        SubscribeToEvent(dest[ii], E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUifinderwindowEvent ));
}

void PeriodicApp::HandleFinderCompleteEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace UIFinderComplete;
    AppLog( "UIFinderWindow event : the window " + eventData[P_TITLE].GetString()
            + " file was " + eventData[P_SELECTED].GetString()
            + ", the button pressed was " + eventData[P_REASON].GetString());
}

void PeriodicApp::HandleUifinderwindowEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace WidgetEvent;
    UIWidget* widget = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
    if ( widget == NULL ) return;
    if (eventData[P_TYPE] == UI_EVENT_TYPE_CLICK)
    {
        if (widget->GetId() == "uifinderwindowcode" )
        {
            AppLog( "UIFinderWindow support : " + widget->GetId() + " was pressed " );
            ViewCode ( "Components/code_uifinderwindow.cpp", widget->GetParent() );
        }
        if (widget->GetId() ==  "uifinderwindowlayout" )
        {
            AppLog( "UIFinderWindow support : " + widget->GetId() + " was pressed ");
            ViewCode ( "Scenes/layout_uifinderwindow.ui.txt", widget->GetParent() );
        }

        if (widget->GetId() == "filefinder" )
        {
            AppLog( "UIFinderWindow action : " + widget->GetId() + " was pressed ");
            UIWidget *someview = (UIWidget *)widget->GetView();
            UIFinderWindow *windowf = new UIFinderWindow(context_, someview, widget->GetId());
            SubscribeToEvent( windowf, E_UIFINDERCOMPLETE, ATOMIC_HANDLER(PeriodicApp, HandleFinderCompleteEvent ));
            windowf->FindFile("Find a File", "", 0, 0, 0);
        }
        if (widget->GetId() ==  "folderfinder" )
        {
            AppLog( "UIFinderWindow action : " + widget->GetId() + " was pressed ");
            UIWidget *someview = (UIWidget *)widget->GetView();
            UIFinderWindow *windowd = new UIFinderWindow(context_, someview, widget->GetId() );
            SubscribeToEvent( windowd, E_UIFINDERCOMPLETE, ATOMIC_HANDLER(PeriodicApp, HandleFinderCompleteEvent ));
            windowd->FindPath("Find a Folder", "", 0, 0, 0);
        }
    }
}

