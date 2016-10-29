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

#include <Atomic/Core/ProcessUtils.h>
#include <Atomic/IO/FileSystem.h>
#include <Atomic/Graphics/Graphics.h>
#include <Atomic/Graphics/Renderer.h>
#include <Atomic/Resource/Image.h>
#include <Atomic/Scene/Scene.h>

#include <Atomic/UI/UI.h>
#include <Atomic/UI/UIEvents.h>
#include <Atomic/UI/UIFontDescription.h>
#include <Atomic/UI/UIView.h>
#include <Atomic/UI/UILayout.h>
#include <Atomic/UI/UIEditField.h>

#include "Sample.h"
#include "SampleSelector.h"
#include "FeatureExamples.h"

Sample::Sample(Context* context) :
    Object(context),
    yaw_(0.0f),
    pitch_(0.0f),
    touchEnabled_(false),
    paused_(false),
    useMouseMode_(MM_ABSOLUTE)
{

}

void Sample::Start()
{
    SubscribeToEvent(E_KEYUP, ATOMIC_HANDLER(Sample, HandleKeyDown));
}

void Sample::Stop()
{

}

void Sample::InitMouseMode(MouseMode mode)
{
    useMouseMode_ = mode;

    Input* input = GetSubsystem<Input>();

    if (GetPlatform() != "Web")
    {
        if (useMouseMode_ == MM_FREE)
            input->SetMouseVisible(true);

        // ATOMIC: FIXME
        // Console* console = GetSubsystem<Console>();

        if (useMouseMode_ != MM_ABSOLUTE)
        {
            input->SetMouseMode(useMouseMode_);

            // ATOMIC: FIXME
            /*
            if (console && console->IsVisible())
                input->SetMouseMode(MM_ABSOLUTE, true);
            */
        }
    }
    else
    {
        input->SetMouseVisible(true);
        SubscribeToEvent(E_MOUSEBUTTONDOWN, ATOMIC_HANDLER(Sample, HandleMouseModeRequest));
        SubscribeToEvent(E_MOUSEMODECHANGED, ATOMIC_HANDLER(Sample, HandleMouseModeChange));
    }
}

void Sample::BackToSelector()
{
    UnsubscribeFromAllEvents();
    Renderer* renderer = GetSubsystem<Renderer>();
    for (unsigned i = 0; i <  renderer->GetNumViewports(); i++)
    {
        renderer->SetViewport(i, 0);
    }

    FeatureExamples::GetUIView()->DeleteAllChildren();

    new SampleSelector(context_);
}

void Sample::HandleKeyDown(StringHash eventType, VariantMap& eventData)
{
    using namespace KeyDown;

    int key = eventData[P_KEY].GetInt();

    if (key == KEY_ESCAPE )
    {
        BackToSelector();
        return;
    }

    // Common rendering quality controls, only when UI has no focused element
    Renderer* renderer = GetSubsystem<Renderer>();

    // Texture quality
    if (key == '1')
    {
        int quality = renderer->GetTextureQuality();
        ++quality;
        if (quality > QUALITY_HIGH)
            quality = QUALITY_LOW;
        renderer->SetTextureQuality(quality);
    }

    // Material quality
    else if (key == '2')
    {
        int quality = renderer->GetMaterialQuality();
        ++quality;
        if (quality > QUALITY_HIGH)
            quality = QUALITY_LOW;
        renderer->SetMaterialQuality(quality);
    }

    // Specular lighting
    else if (key == '3')
        renderer->SetSpecularLighting(!renderer->GetSpecularLighting());

    // Shadow rendering
    else if (key == '4')
        renderer->SetDrawShadows(!renderer->GetDrawShadows());

    // Shadow map resolution
    else if (key == '5')
    {
        int shadowMapSize = renderer->GetShadowMapSize();
        shadowMapSize *= 2;
        if (shadowMapSize > 2048)
            shadowMapSize = 512;
        renderer->SetShadowMapSize(shadowMapSize);
    }

    // Shadow depth and filtering quality
    else if (key == '6')
    {
        ShadowQuality quality = renderer->GetShadowQuality();
        quality = (ShadowQuality)(quality + 1);
        if (quality > SHADOWQUALITY_BLUR_VSM)
            quality = SHADOWQUALITY_SIMPLE_16BIT;
        renderer->SetShadowQuality(quality);
    }

    // Occlusion culling
    else if (key == '7')
    {
        bool occlusion = renderer->GetMaxOccluderTriangles() > 0;
        occlusion = !occlusion;
        renderer->SetMaxOccluderTriangles(occlusion ? 5000 : 0);
    }

    // Instancing
    else if (key == '8')
        renderer->SetDynamicInstancing(!renderer->GetDynamicInstancing());

    // Take screenshot
    else if (key == '9')
    {
        Graphics* graphics = GetSubsystem<Graphics>();
        Image screenshot(context_);
        graphics->TakeScreenShot(&screenshot);
        // Here we save in the Data folder with date and time appended
        screenshot.SavePNG(GetSubsystem<FileSystem>()->GetProgramDir() + "Data/Screenshot_" +
            Time::GetTimeStamp().Replaced(':', '_').Replaced('.', '_').Replaced(' ', '_') + ".png");
    }
}

void Sample::SimpleCreateInstructionsWithWasd(const String& extra)
{
    SimpleCreateInstructions("Use WASD keys and mouse/touch to move" + extra);
}

void Sample::SimpleCreateInstructions(const String& text)
{

    UILayout* layout = new UILayout(context_);

    layout->SetRect(FeatureExamples::GetUIView()->GetRect());

    layout->SetLayoutPosition (UI_LAYOUT_POSITION_RIGHT_BOTTOM);
    layout->SetLayoutDistributionPosition (UI_LAYOUT_DISTRIBUTION_POSITION_RIGHT_BOTTOM);

    SharedPtr<UIFontDescription> fontDesc(new UIFontDescription(context_));
    fontDesc->SetId("Vera");
    fontDesc->SetSize(18);

    UIEditField* label = new UIEditField(context_);
    label->SetFontDescription(fontDesc);
    label->SetReadOnly(true);
    label->SetMultiline(true);
    label->SetAdaptToContentSize(true);
    label->SetText(text);
    layout->AddChild(label);

    FeatureExamples::GetUIView()->AddChild(layout);

}


// If the user clicks the canvas, attempt to switch to relative mouse mode on web platform
void Sample::HandleMouseModeRequest(StringHash eventType, VariantMap& eventData)
{
    // ATOMIC: FIXME
    /*
    Console* console = GetSubsystem<Console>();
    if (console && console->IsVisible())
        return;
    */

    Input* input = GetSubsystem<Input>();
    if (useMouseMode_ == MM_ABSOLUTE)
        input->SetMouseVisible(false);
    else if (useMouseMode_ == MM_FREE)
        input->SetMouseVisible(true);
    input->SetMouseMode(useMouseMode_);
}

void Sample::HandleMouseModeChange(StringHash eventType, VariantMap& eventData)
{
    Input* input = GetSubsystem<Input>();
    bool mouseLocked = eventData[MouseModeChanged::P_MOUSELOCKED].GetBool();
    input->SetMouseVisible(!mouseLocked);
}



