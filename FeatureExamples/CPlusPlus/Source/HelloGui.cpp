//
// Copyright (c) 2008-2016 the Urho3D project.
// Copyright (c) 2014-2016, THUNDERBEAST GAMES LLC All rights reserved
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//

#include <Atomic/Core/CoreEvents.h>
#include <Atomic/Core/ProcessUtils.h>
#include <Atomic/Input/Input.h>
#include <Atomic/Graphics/Graphics.h>
#include <Atomic/UI/UI.h>
#include <Atomic/UI/UIEvents.h>
#include <Atomic/UI/UIFontDescription.h>
#include <Atomic/UI/UIView.h>
#include <Atomic/UI/UILayout.h>
#include <Atomic/UI/UICheckBox.h>
#include <Atomic/UI/UITextField.h>
#include <Atomic/UI/UIButton.h>
#include <Atomic/UI/UIEditField.h>
#include <Atomic/UI/UIWindow.h>
#include <Atomic/Resource/ResourceCache.h>
#include <Atomic/Scene/Scene.h>

#include "FeatureExamples.h"
#include "HelloGui.h"

#include <Atomic/DebugNew.h>

HelloGui::HelloGui(Context* context) :
    Sample(context)
{
}

void HelloGui::Start()
{
    // Execute base class startup
    Sample::Start();

    // Create "Hello GUI"
    CreateUI();

    // Finally subscribe to the update event. Note that by subscribing events at this point we have already missed some events
    // like the ScreenMode event sent by the Graphics subsystem when opening the application window. To catch those as well we
    // could subscribe in the constructor instead.
    SubscribeToEvents();

    // Set the mouse mode to use in the sample
    Sample::InitMouseMode(MM_FREE);
}

void HelloGui::CreateUI()
{
    UILayout* layout = new UILayout(context_);
    layout->SetAxis(UI_AXIS_Y);

    UICheckBox* checkBox = new UICheckBox(context_);
    checkBox->SetId("Checkbox");

    layout->AddChild(checkBox);

    UIButton* button = new UIButton(context_);
    button->SetText("Button");
    button->SetId("Button");

    layout->AddChild(button);

    UIEditField* edit = new UIEditField(context_);
    layout->AddChild(edit);
    edit->SetId("EditField");

    window_ = new UIWindow(context_);
    window_->SetSettings( (UI_WINDOW_SETTINGS) (UI_WINDOW_SETTINGS_TITLEBAR | UI_WINDOW_SETTINGS_CLOSE_BUTTON));

    window_->SetText("Hello Atomic GUI!");

    window_->AddChild(layout);

    window_->ResizeToFitContent();

    FeatureExamples::GetUIView()->AddChild(window_);
    window_->Center();
}

void HelloGui::SubscribeToEvents()
{
    // Subscribe HandleUpdate() function for processing update events
    SubscribeToEvent(E_UPDATE, ATOMIC_HANDLER(HelloGui, HandleUpdate));

    SubscribeToEvent(E_WIDGETEVENT, ATOMIC_HANDLER(HelloGui, HandleWidgetEvent));
    SubscribeToEvent(E_WIDGETDELETED, ATOMIC_HANDLER(HelloGui, HandleWidgetDeleted));
}

void HelloGui::HandleWidgetEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace WidgetEvent;

    if (eventData[P_TYPE] == UI_EVENT_TYPE_CLICK)
    {
        UIWidget* widget = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
        if (widget)
        {
            window_->SetText(ToString("Hello: %s", widget->GetId().CString()));
        }

    }
}

void HelloGui::HandleWidgetDeleted(StringHash eventType, VariantMap& eventData)
{
    BackToSelector();
}


void HelloGui::HandleUpdate(StringHash eventType, VariantMap& eventData)
{
    // Do nothing for now, could be extended to eg. animate the display
}
