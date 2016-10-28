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

#include <Atomic/IO/Log.h>

#include <Atomic/UI/UI.h>
#include <Atomic/UI/UIEvents.h>
#include <Atomic/UI/UIView.h>
#include <Atomic/UI/UILayout.h>
#include <Atomic/UI/UIButton.h>

#include "FeatureExamples.h"
#include "SampleSelector.h"

#include "HelloWorld.h"
#include "HelloGui.h"
#include "2DSprite.h"
#include "Physics2D.h"
#include "Constraints2D.h"
#include "StaticScene.h"
#include "AnimatingScene.h"
#include "SkeletalAnimation.h"
#include "CharacterDemo.h"
#include "Physics3D.h"
#include "Ragdolls.h"
#include "VehicleDemo.h"
#include "CrowdNavigation.h"
#include "DynamicGeometry.h"
#include "Water.h"
#include "Billboards.h"
#include "MultipleViewports.h"
#include "Decals.h"
#include "PhysicsRope2D.h"
#include "RenderToTexture.h"
#include "SpriterAnimation.h"
#include "LightAnimation.h"
#include "Particles3D.h"


SampleSelector::SampleSelector(Context* context) :
    Object(context)
{
    UIView* view = FeatureExamples::GetUIView();

    UILayout* rootLayout = new UILayout(context_);
    rootLayout->SetAxis(UI_AXIS_Y);
    rootLayout->SetRect(view->GetRect());
    view->AddChild(rootLayout);

    const char* examples[] = {
        "Hello World",
        "Hello GUI",
        "Render to Texture",
        "2D Sprite",
        "2D Physics",
        "2D Constraints",
        "2D Rope",
        "2D Spriter Animation",
        "3D Static Scene",
        "3D Animating Scene",
        "3D Light Animation",
        "3D Billboards",
        "3D Particles",
        "3D Physics",
        "3D Skeletal Animation",
        "3D Decals",
        "3D Character",
        "3D Dynamic Geometry",
        "3D Ragdolls",
        "3D Vehicle Demo",
        "3D Crowd Navigation",
        "3D Water",
        "3D Multiple Viewports"
    };

    for (size_t i = 0; i < sizeof(examples) / sizeof(examples[0]); i++)
    {
        UIButton* button = new UIButton(context_);
        button->SetLayoutMinWidth(128);
        button->SetText(examples[i]);
        button->SetId(examples[i]);
        button->SubscribeToEvent(button, E_WIDGETEVENT, ATOMIC_HANDLER(SampleSelector, HandleWidgetEvent));
        rootLayout->AddChild(button);
    }

    Input* input = GetSubsystem<Input>();
    input->SetMouseVisible(true);
    input->SetMouseMode(MM_FREE);

    // Subscribe key up event
    SubscribeToEvent(E_KEYUP, ATOMIC_HANDLER(SampleSelector, HandleKeyUp));

    context->RegisterSubsystem(this);
}

void SampleSelector::HandleKeyUp(StringHash eventType, VariantMap& eventData)
{
    using namespace KeyUp;

    int key = eventData[P_KEY].GetInt();

    // Close console (if open) or exit when ESC is pressed
    if (key == KEY_ESCAPE)
    {
        GetSubsystem<Engine>()->Exit();
    }
}

void SampleSelector::HandleWidgetEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace WidgetEvent;

    if (eventData[P_TYPE].GetUInt() == UI_EVENT_TYPE_CLICK)
    {
        UIWidget* target = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
        String exampleName = target->GetId().CString();

        // Make sure we mark event handled, as we're deleting the button
        eventData[P_HANDLED] = true;

        // Goodbye UI
        FeatureExamples::GetUIView()->DeleteAllChildren();

        currentSample_ = 0;

        if (exampleName == "Hello World")
        {
            currentSample_ = new HelloWorld(context_);
        }
        else if (exampleName == "Hello GUI")
        {
            currentSample_ = new HelloGui(context_);
        }
        else if (exampleName == "2D Sprite")
        {
            currentSample_ = new Atomic2DSprite(context_);
        }
        else if (exampleName == "2D Physics")
        {
            currentSample_ = new Physics2D(context_);
        }
        else if (exampleName == "2D Constraints")
        {
            currentSample_ = new Constraints2D(context_);
        }
        else if (exampleName == "2D Spriter Animation")
        {
            currentSample_ = new SpriterAnimation(context_);
        }
        else if (exampleName == "3D Static Scene")
        {
            currentSample_ = new StaticScene(context_);
        }
        else if (exampleName == "3D Animating Scene")
        {
            currentSample_ = new AnimatingScene(context_);
        }
        else if (exampleName == "3D Physics")
        {
            currentSample_ = new Physics3D(context_);
        }
        else if (exampleName == "3D Skeletal Animation")
        {
            currentSample_ = new SkeletalAnimation(context_);
        }
        else if (exampleName == "3D Character")
        {
            currentSample_ = new CharacterDemo(context_);
        }
        else if (exampleName == "3D Ragdolls")
        {
            currentSample_ = new Ragdolls(context_);
        }
        else if (exampleName == "3D Vehicle Demo")
        {
            currentSample_ = new VehicleDemo(context_);
        }
        else if (exampleName == "3D Crowd Navigation")
        {
            currentSample_ = new CrowdNavigation(context_);
        }
        else if (exampleName == "3D Dynamic Geometry")
        {
            currentSample_ = new DynamicGeometry(context_);
        }
        else if (exampleName == "3D Water")
        {
            currentSample_ = new Water(context_);
        }
        else if (exampleName == "3D Billboards")
        {
            currentSample_ = new Billboards(context_);
        }
        else if (exampleName == "3D Multiple Viewports")
        {
            currentSample_ = new MultipleViewports(context_);
        }
        else if (exampleName == "3D Decals")
        {
            currentSample_ = new Decals(context_);
        }
        else if (exampleName == "2D Rope")
        {
            currentSample_ = new PhysicsRope2D(context_);
        }
        else if (exampleName == "Render to Texture")
        {
            currentSample_ = new RenderToTexture(context_);
        }
        else if (exampleName == "3D Light Animation")
        {
            currentSample_ = new LightAnimation(context_);
        }
        else if (exampleName == "3D Particles")
        {
            currentSample_ = new Particles3D(context_);
        }

        if (currentSample_.NotNull())
        {
            UnsubscribeFromEvent(E_KEYUP);
            currentSample_->Start();
        }

    }

}
