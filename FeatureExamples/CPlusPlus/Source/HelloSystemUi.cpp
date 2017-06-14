//
// Copyright (c) 2017 the Atomic project.
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
#include <Atomic/Graphics/Octree.h>
#include <Atomic/Graphics/Zone.h>
#include <Atomic/Graphics/Camera.h>
#include <Atomic/Graphics/Renderer.h>
#include <Atomic/Resource/ResourceCache.h>
#include <Atomic/Scene/Scene.h>
#include <Atomic/UI/SystemUI/SystemUI.h>
#include <Atomic/UI/SystemUI/SystemUIEvents.h>
#include <Atomic/UI/SystemUI/Console.h>

#include "FeatureExamples.h"
#include "HelloSystemUi.h"

#include <Atomic/DebugNew.h>


HelloSystemUi::HelloSystemUi(Context* context) :
    Sample(context)
{
}

void HelloSystemUi::Start()
{
    // Execute base class startup
    Sample::Start();

    SimpleCreateInstructions();

    // Scene is only required to give screen a background color.
    CreateScene();

    // Finally subscribe to the update event. Note that by subscribing events at this point we have already missed some events
    // like the ScreenMode event sent by the Graphics subsystem when opening the application window. To catch those as well we
    // could subscribe in the constructor instead.
    SubscribeToEvents();

    // Set the mouse mode to use in the sample
    Sample::InitMouseMode(MM_FREE);
}

void HelloSystemUi::SubscribeToEvents()
{
    SubscribeToEvent(E_KEYDOWN, ATOMIC_HANDLER(HelloSystemUi, HandleKeyDown));
    SubscribeToEvent(E_SYSTEMUIFRAME, ATOMIC_HANDLER(HelloSystemUi, RenderUi));
}

void HelloSystemUi::RenderUi(StringHash eventType, VariantMap& eventData)
{
    ImGui::SetNextWindowSize(ImVec2(200, 300), ImGuiSetCond_FirstUseEver);
    ImGui::SetNextWindowPos(ImVec2(200, 300), ImGuiSetCond_FirstUseEver);
    if (ImGui::Begin("Sample SystemUI", 0, ImGuiWindowFlags_NoSavedSettings))
    {
        if (messageBox_.NotNull())
        {
            if (ImGui::Button("Close message box"))
                messageBox_ = nullptr;
        }
        else
        {
            if (ImGui::Button("Show message box"))
            {
                messageBox_ = new SystemUI::MessageBox(context_, "Hello from SystemUI", "Sample Message Box");
                SubscribeToEvent(SystemUI::E_MESSAGEACK, [&](StringHash, VariantMap&) {
                    messageBox_ = nullptr;
                });
            }
        }

        if (ImGui::Button("Toggle console"))
            GetSubsystem<SystemUI::Console>()->Toggle();
    }
    ImGui::End();
}

void HelloSystemUi::HandleKeyDown(StringHash eventType, VariantMap& eventData)
{
    if (eventData[KeyDown::P_KEY].GetUInt() == KEY_BACKQUOTE)
        GetSubsystem<SystemUI::Console>()->Toggle();
}

void HelloSystemUi::CreateScene()
{
    scene_ = new Scene(context_);

    // Create the Octree component to the scene so that drawable objects can be rendered. Use default volume
    // (-1000, -1000, -1000) to (1000, 1000, 1000)
    scene_->CreateComponent<Octree>();

    // Create a Zone component into a child scene node. The Zone controls ambient lighting and fog settings. Like the Octree,
    // it also defines its volume with a bounding box, but can be rotated (so it does not need to be aligned to the world X, Y
    // and Z axes.) Drawable objects "pick up" the zone they belong to and use it when rendering; several zones can exist
    Node* zoneNode = scene_->CreateChild("Zone");
    Zone* zone = zoneNode->CreateComponent<Zone>();
    // Set same volume as the Octree, set a close bluish fog and some ambient light
    zone->SetBoundingBox(BoundingBox(-1000.0f, 1000.0f));
    zone->SetAmbientColor(Color(0.15f, 0.15f, 0.15f));
    zone->SetFogColor(Color(0.5f, 0.5f, 0.7f));
    zone->SetFogStart(100.0f);
    zone->SetFogEnd(300.0f);

    cameraNode_ = scene_->CreateChild("Camera");
    auto camera = cameraNode_->CreateComponent<Camera>();
    GetSubsystem<Renderer>()->SetViewport(0, new Viewport(context_, scene_, camera));
}
