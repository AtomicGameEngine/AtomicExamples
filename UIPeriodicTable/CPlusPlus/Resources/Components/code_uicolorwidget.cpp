// UIColorWidget application source code
#include <Atomic/UI/UIColorWidget.h>
#include "PeriodicApp.h"

void PeriodicApp::setup_uicolorwidget( UIWidget *layout )
{
    PODVector<UIWidget*> dest;
    layout->SearchWidgetClass( "TBButton", dest );
    for (unsigned ii = 0; ii < dest.Size(); ii++)
        SubscribeToEvent(dest[ii], E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUicolorwidgetEvent ));
}

void PeriodicApp::HandleUicolorwidgetEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace WidgetEvent;
    UIWidget* widget = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
    if ( widget == NULL ) return;
    if (eventData[P_TYPE] == UI_EVENT_TYPE_CLICK)
    {
        if (widget->GetId() == "uicolorwidgetcode" )
        {
            AppLog( "UIColorWidget support : " + widget->GetId() + " was pressed " );
            ViewCode ( "Components/code_uicolorwidget.cpp", widget->GetParent() );
        }
        if (widget->GetId() == "uicolorwidgetlayout" )
        {
            AppLog( "UIColorWidget support : " + widget->GetId() + " was pressed ");
            ViewCode ( "Scenes/layout_uicolorwidget.ui.txt", widget->GetParent() );
        }

        if (widget->GetId() == "uicolorwidgetred" )
        {
            AppLog( "UIColorWidget action : " + widget->GetId() + " was pressed ");
            UIColorWidget *clw = static_cast<UIColorWidget*>(widget->FindWidget("colorwidgetdemo"));
            if (clw)
                clw->SetColorString("#FF1111");
        }
        if (widget->GetId() == "uicolorwidgetgreen" )
        {
            AppLog( "UIColorWidget action : " + widget->GetId() + " was pressed ");
            UIColorWidget *clw = static_cast<UIColorWidget*>(widget->FindWidget("colorwidgetdemo"));
            if (clw)
                clw->SetColorString("#11FF11");
        }
        if (widget->GetId() == "uicolorwidgetblue" )
        {
            AppLog( "UIColorWidget action : " + widget->GetId() + " was pressed ");
            UIColorWidget *clw = static_cast<UIColorWidget*>(widget->FindWidget("colorwidgetdemo"));
            if (clw)
                clw->SetColorString("#1111FF");
        }
    }
}

