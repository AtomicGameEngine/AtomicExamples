// UILayout application source code
#include <Atomic/UI/UIView.h>
#include <Atomic/UI/UILayout.h>
#include <Atomic/UI/UICheckBox.h>
#include <Atomic/UI/UIRadioButton.h>
#include <Atomic/UI/UITextField.h>
#include <Atomic/UI/UIButton.h>
#include <Atomic/UI/UIEditField.h>
#include <Atomic/UI/UITabContainer.h>
#include <Atomic/UI/UIWindow.h>
#include "PeriodicApp.h"

void PeriodicApp::setup_uilayout( UIWidget *layout, UIView *uiview )
{
    PODVector<UIWidget*> dest;
    layout->SearchWidgetClass( "TBButton", dest );
    for (unsigned ii = 0; ii < dest.Size(); ii++)
        SubscribeToEvent(dest[ii], E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUilayoutEvent ));

    UILayout *myc = static_cast<UILayout *>(layout->GetWidget("uilayoutcontainer")); // get the container layout

    UIButton *tf0 = new UIButton(context_);  // the layout-o-matic spawner
    tf0->SetText( "LAYOUT-O-MATIC");
    tf0->SetId( "go_layout_config");
    UILayout *lo0 = new UILayout(context_);
    lo0->SetId( "target_layout");
    lo0->SetLayoutConfig ( "-----" );
    lo0->Load("Scenes/simp_button.ui.txt");
    lo0->AddChildBefore(tf0, lo0->GetFirstChild() );
    myc->AddChild(lo0);  // drop it in
    SubscribeToEvent(tf0, E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUilayoutEvent ));

    UITextField *tf1 = new UITextField(context_);
    tf1->SetText( "layout config XACAC");
    UILayout *lo1 = new UILayout(context_);
    lo1->SetLayoutConfig ( "XACAC" );
    lo1->Load("Scenes/simp_button.ui.txt");
    lo1->AddChildBefore(tf1, lo1->GetFirstChild() );
    myc->AddChild(lo1);

    UITextField *tf2 = new UITextField(context_);
    tf2->SetText( "layout config XGCAC");
    UILayout *lo2 = new UILayout(context_);
    lo2->SetLayoutConfig ( "XGCAC" );
    lo2->Load("Scenes/simp_button.ui.txt");
    lo2->AddChildBefore(tf2, lo2->GetFirstChild() );
    myc->AddChild(lo2);

    UITextField *tf3 = new UITextField(context_);
    tf3->SetText( "layout config XPCAC");
    UILayout *lo3 = new UILayout(context_);
    lo3->SetLayoutConfig ( "XPCAC" );
    lo3->Load("Scenes/simp_button.ui.txt");
    lo3->AddChildBefore(tf3, lo3->GetFirstChild() );
    myc->AddChild(lo3);

    UITextField *tf4 = new UITextField(context_);
    tf4->SetText( "layout config XACGC");
    UILayout *lo4 = new UILayout(context_);
    lo4->SetLayoutConfig ( "XACGC" );
    lo4->Load("Scenes/simp_button.ui.txt");
    lo4->AddChildBefore(tf4, lo4->GetFirstChild() );
    myc->AddChild(lo4);

    UITextField *tf5 = new UITextField(context_);
    tf5->SetText( "layout config XGRGC");
    UILayout *lo5 = new UILayout(context_);
    lo5->SetLayoutConfig ( "XGRGC" );
    lo5->Load("Scenes/simp_button.ui.txt");
    lo5->AddChildBefore(tf5, lo5->GetFirstChild() );
    myc->AddChild(lo5);

    UITextField *tf6 = new UITextField(context_);
    tf6->SetText( "layout config XPLGC");
    UILayout *lo6 = new UILayout(context_);
    lo6->SetLayoutConfig ( "XPLGC" );
    lo6->Load("Scenes/simp_button.ui.txt");
    lo6->AddChildBefore(tf6, lo6->GetFirstChild() );
    myc->AddChild(lo6);

    UITextField *tf7 = new UITextField(context_);
    tf7->SetText( "layout config XACPC");
    UILayout *lo7 = new UILayout(context_);
    lo7->SetLayoutConfig ( "XACPC" );
    lo7->Load("Scenes/simp_button.ui.txt");
    lo7->AddChildBefore(tf7, lo7->GetFirstChild() );
    myc->AddChild(lo7);

    UITextField *tf8 = new UITextField(context_);
    tf8->SetText( "layout config XGLPL");
    UILayout *lo8 = new UILayout(context_);
    lo8->SetLayoutConfig ( "XGLPL" );
    lo8->Load("Scenes/simp_button.ui.txt");
    lo8->AddChildBefore(tf8, lo8->GetFirstChild() );
    myc->AddChild(lo8);

    UITextField *tf9 = new UITextField(context_);
    tf9->SetText( "layout config XPCPR");
    UILayout *lo9 = new UILayout(context_);
    lo9->SetLayoutConfig ( "XPCPR" );
    lo9->Load("Scenes/simp_button.ui.txt");
    lo9->AddChildBefore(tf9, lo9->GetFirstChild() );
    myc->AddChild(lo9);

    context_->SetGlobalVar("layoutomaticstr", "XGCPC" ); // LAYOUT-O-MATIC string, cheating, using a globalvar

}

void PeriodicApp::HandleUilayoutEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace WidgetEvent;
    UIWidget* widget = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
    if ( widget == NULL ) return;
    if (eventData[P_TYPE] == UI_EVENT_TYPE_CLICK)
    {
        if (widget->GetId() == "go_layout_config" ) // its LAYOUT-O-MATIC time.
        {
            AppLog( "UILayout action : " + widget->GetId() + " was pressed, its LAYOUT-O-MATIC time");
            UIView *someview = widget->GetView();
            UIWindow* window = new UIWindow(context_);
            window->SetSettings ( UI_WINDOW_SETTINGS_DEFAULT );
            window->SetText( "LAYOUT-O-MATIC(tm)");
            window->Load("Scenes/view_layout.ui.txt");
            window->ResizeToFitContent();
            someview->AddChild(window);

            UIWidget *okbutt = window->GetWidget("ok");
            SubscribeToEvent(okbutt, E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUilayoutEvent ));

            PODVector<UIWidget*> lox;
            window->SearchWidgetClass( "TBRadioButton", lox );
            for (unsigned ii = 0; ii < lox.Size(); ii++)
                SubscribeToEvent(lox[ii], E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUilayoutEvent ));
        }
        if (widget->GetId() ==  "ok" )
        {
            UIWindow *mywindow = static_cast<UIWindow *>(FindTheWindowParent(widget));
            if (mywindow)
                mywindow->Close();
        }
        if (widget->GetId() ==  "set_ax" )
        {
            UILayout *targetl = static_cast<UILayout *>(widget->FindWidget("target_layout")); // who to operate on.
            UIRadioButton *setax = static_cast< UIRadioButton*>(widget); // who we are
            if (targetl && setax)
            {
                if ( setax->GetValue() == 1)
                {
                    String current = context_->GetGlobalVar("layoutomaticstr").GetString();
                    current.Replace (0, 1, "X");
                    targetl->SetLayoutConfig(current);
                    context_->SetGlobalVar("layoutomaticstr", current );
                }
            }
        }
        if (widget->GetId() ==  "set_ay" )
        {
            UILayout *targetl = static_cast<UILayout *>(widget->FindWidget("target_layout")); // who to operate on.
            UIRadioButton *setay = static_cast< UIRadioButton*>(widget); // who we are
            if (targetl && setay)
            {
                if ( setay->GetValue() == 1)
                {
                    String current = context_->GetGlobalVar("layoutomaticstr").GetString();
                    current.Replace (0, 1, "Y");
                    targetl->SetLayoutConfig(current );
                    context_->SetGlobalVar("layoutomaticstr", current );
                }
            }
        }

        if (widget->GetId() ==  "set_sza" )
        {
            UILayout *targetl = static_cast<UILayout *>(widget->FindWidget("target_layout")); // who to operate on.
            UIRadioButton *setay = static_cast< UIRadioButton*>(widget); // who we are
            if (targetl && setay)
            {
                if ( setay->GetValue() == 1)
                {
                    String current = context_->GetGlobalVar("layoutomaticstr").GetString();
                    current.Replace (1, 1, "A");
                    targetl->SetLayoutConfig(current );
                    context_->SetGlobalVar("layoutomaticstr", current );
                }
            }
        }
        if (widget->GetId() ==  "set_szg" )
        {
            UILayout *targetl = static_cast<UILayout *>(widget->FindWidget("target_layout")); // who to operate on.
            UIRadioButton *setay = static_cast< UIRadioButton*>(widget); // who we are
            if (targetl && setay)
            {
                if ( setay->GetValue() == 1)
                {
                    String current = context_->GetGlobalVar("layoutomaticstr").GetString();
                    current.Replace (1, 1, "G");
                    targetl->SetLayoutConfig(current );
                    context_->SetGlobalVar("layoutomaticstr", current );
                }
            }
        }
        if (widget->GetId() ==  "set_szp" )
        {
            UILayout *targetl = static_cast<UILayout *>(widget->FindWidget("target_layout")); // who to operate on.
            UIRadioButton *setay = static_cast< UIRadioButton*>(widget); // who we are
            if (targetl && setay)
            {
                if ( setay->GetValue() == 1)
                {
                    String current = context_->GetGlobalVar("layoutomaticstr").GetString();
                    current.Replace (1, 1, "P");
                    targetl->SetLayoutConfig(current );
                    context_->SetGlobalVar("layoutomaticstr", current );
                }
            }
        }


        if (widget->GetId() ==  "set_posc" )
        {
            UILayout *targetl = static_cast<UILayout *>(widget->FindWidget("target_layout")); // who to operate on.
            UIRadioButton *setay = static_cast< UIRadioButton*>(widget); // who we are
            if (targetl && setay)
            {
                if ( setay->GetValue() == 1)
                {
                    String current = context_->GetGlobalVar("layoutomaticstr").GetString();
                    current.Replace (2, 1, "C");
                    targetl->SetLayoutConfig(current );
                    context_->SetGlobalVar("layoutomaticstr", current );
                }
            }
        }
        if (widget->GetId() ==  "set_posg" )
        {
            UILayout *targetl = static_cast<UILayout *>(widget->FindWidget("target_layout")); // who to operate on.
            UIRadioButton *setay = static_cast< UIRadioButton*>(widget); // who we are
            if (targetl && setay)
            {
                if ( setay->GetValue() == 1)
                {
                    String current = context_->GetGlobalVar("layoutomaticstr").GetString();
                    current.Replace (2, 1, "G");
                    targetl->SetLayoutConfig(current );
                    context_->SetGlobalVar("layoutomaticstr", current );
                }
            }
        }
        if (widget->GetId() ==  "set_posl" )
        {
            UILayout *targetl = static_cast<UILayout *>(widget->FindWidget("target_layout")); // who to operate on.
            UIRadioButton *setay = static_cast< UIRadioButton*>(widget); // who we are
            if (targetl && setay)
            {
                if ( setay->GetValue() == 1)
                {
                    String current = context_->GetGlobalVar("layoutomaticstr").GetString();
                    current.Replace (2, 1, "L");
                    targetl->SetLayoutConfig(current );
                    context_->SetGlobalVar("layoutomaticstr", current );
                }
            }
        }
        if (widget->GetId() ==  "set_posr" )
        {
            UILayout *targetl = static_cast<UILayout *>(widget->FindWidget("target_layout")); // who to operate on.
            UIRadioButton *setay = static_cast< UIRadioButton*>(widget); // who we are
            if (targetl && setay)
            {
                if ( setay->GetValue() == 1)
                {
                    String current = context_->GetGlobalVar("layoutomaticstr").GetString();
                    current.Replace (2, 1, "R");
                    targetl->SetLayoutConfig(current );
                    context_->SetGlobalVar("layoutomaticstr", current );
                }
            }
        }

        if (widget->GetId() ==  "set_dista" )
        {
            UILayout *targetl = static_cast<UILayout *>(widget->FindWidget("target_layout")); // who to operate on.
            UIRadioButton *setay = static_cast< UIRadioButton*>(widget); // who we are
            if (targetl && setay)
            {
                if ( setay->GetValue() == 1)
                {
                    String current = context_->GetGlobalVar("layoutomaticstr").GetString();
                    current.Replace (3, 1, "A");
                    targetl->SetLayoutConfig(current );
                    context_->SetGlobalVar("layoutomaticstr", current );
                }
            }
        }
        if (widget->GetId() ==  "set_distg" )
        {
            UILayout *targetl = static_cast<UILayout *>(widget->FindWidget("target_layout")); // who to operate on.
            UIRadioButton *setay = static_cast< UIRadioButton*>(widget); // who we are
            if (targetl && setay)
            {
                if ( setay->GetValue() == 1)
                {
                    String current = context_->GetGlobalVar("layoutomaticstr").GetString();
                    current.Replace (3, 1, "G");
                    targetl->SetLayoutConfig(current );
                    context_->SetGlobalVar("layoutomaticstr", current );
                }
            }
        }
        if (widget->GetId() ==  "set_distp" )
        {
            UILayout *targetl = static_cast<UILayout *>(widget->FindWidget("target_layout")); // who to operate on.
            UIRadioButton *setay = static_cast< UIRadioButton*>(widget); // who we are
            if (targetl && setay)
            {
                if ( setay->GetValue() == 1)
                {
                    String current = context_->GetGlobalVar("layoutomaticstr").GetString();
                    current.Replace (3, 1, "P");
                    targetl->SetLayoutConfig(current );
                    context_->SetGlobalVar("layoutomaticstr", current );
                }
            }
        }

        if (widget->GetId() ==  "set_dpc" )
        {
            UILayout *targetl = static_cast<UILayout *>(widget->FindWidget("target_layout")); // who to operate on.
            UIRadioButton *setay = static_cast< UIRadioButton*>(widget); // who we are
            if (targetl && setay)
            {
                if ( setay->GetValue() == 1)
                {
                    String current = context_->GetGlobalVar("layoutomaticstr").GetString();
                    current.Replace (4, 1, "C");
                    targetl->SetLayoutConfig(current );
                    context_->SetGlobalVar("layoutomaticstr", current );
                }
            }
        }
        if (widget->GetId() ==  "set_dpl" )
        {
            UILayout *targetl = static_cast<UILayout *>(widget->FindWidget("target_layout")); // who to operate on.
            UIRadioButton *setay = static_cast< UIRadioButton*>(widget); // who we are
            if (targetl && setay)
            {
                if ( setay->GetValue() == 1)
                {
                    String current = context_->GetGlobalVar("layoutomaticstr").GetString();
                    current.Replace (4, 1, "L");
                    targetl->SetLayoutConfig(current );
                    context_->SetGlobalVar("layoutomaticstr", current );
                }
            }
        }
        if (widget->GetId() ==  "set_dpr" )
        {
            UILayout *targetl = static_cast<UILayout *>(widget->FindWidget("target_layout")); // who to operate on.
            UIRadioButton *setay = static_cast< UIRadioButton*>(widget); // who we are
            if (targetl && setay)
            {
                if ( setay->GetValue() == 1)
                {
                    String current = context_->GetGlobalVar("layoutomaticstr").GetString();
                    current.Replace (4, 1, "R");
                    targetl->SetLayoutConfig(current );
                    context_->SetGlobalVar("layoutomaticstr", current );
                }
            }
        }
    }
}

