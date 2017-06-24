//
// Copyright (c) 2014-2017, THUNDERBEAST GAMES LLC All rights reserved
// Copyright (c) 2008-2016 the Urho3D project.
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
#include <Atomic/Graphics/Camera.h>
#include <Atomic/Graphics/Graphics.h>
#include <Atomic/Graphics/Material.h>
#include <Atomic/Graphics/Model.h>
#include <Atomic/Graphics/Octree.h>
#include <Atomic/Graphics/Renderer.h>
#include <Atomic/Graphics/StaticModel.h>
#include <Atomic/Graphics/Texture2D.h>
#include <Atomic/Graphics/Technique.h>
#include <Atomic/UI/UI.h>
#include <Atomic/UI/UIEvents.h>
#include <Atomic/UI/UIFontDescription.h>
#include <Atomic/UI/UIView.h>
#include <Atomic/UI/UIComponent.h>
#include <Atomic/UI/UILayout.h>
#include <Atomic/UI/UICheckBox.h>
#include <Atomic/UI/UITextField.h>
#include <Atomic/UI/UIButton.h>
#include <Atomic/UI/UIEditField.h>
#include <Atomic/UI/UIWindow.h>
#include <Atomic/Resource/ResourceCache.h>
#include <Atomic/Scene/Scene.h>

#include "FeatureExamples.h"
#include "HelloGui3D.h"

#include <Atomic/DebugNew.h>

HelloGui3D::HelloGui3D(Context* context) :
    Sample(context)
{
}

void HelloGui3D::Start()
{
    // Execute base class startup
    Sample::Start();

    SimpleCreateInstructions();

    // Create 2D "Hello GUI"
    CreateUI();

    // Create the scene content
    CreateScene();

    SetupViewport();

    // Finally subscribe to the update event. Note that by subscribing events at this point we have already missed some events
    // like the ScreenMode event sent by the Graphics subsystem when opening the application window. To catch those as well we
    // could subscribe in the constructor instead.
    SubscribeToEvents();

    // Set the mouse mode to use in the sample
    Sample::InitMouseMode(MM_FREE);
}

void HelloGui3D::SetupViewport()
{
    Renderer* renderer = GetSubsystem<Renderer>();

    // Set up a viewport to the Renderer subsystem so that the 3D scene can be seen. We need to define the scene and the camera
    // at minimum. Additionally we could configure the viewport screen size and the rendering path (eg. forward / deferred) to
    // use, but now we just use full screen and default render path configured in the engine command line options
    SharedPtr<Viewport> viewport(new Viewport(context_, scene_, cameraNode_->GetComponent<Camera>()));
    renderer->SetViewport(0, viewport);
}


void HelloGui3D::MoveCamera(float timeStep)
{
    Input* input = GetSubsystem<Input>();

    // Movement speed as world units per second
    const float MOVE_SPEED = 20.0f;
    // Mouse sensitivity as degrees per pixel
    const float MOUSE_SENSITIVITY = 0.1f;

    // Use this frame's mouse motion to adjust camera node yaw and pitch. Clamp the pitch between -90 and 90 degrees
    IntVector2 mouseMove = input->GetMouseMove();
    yaw_ += MOUSE_SENSITIVITY * mouseMove.x_;
    pitch_ += MOUSE_SENSITIVITY * mouseMove.y_;
    pitch_ = Clamp(pitch_, -90.0f, 90.0f);

    // Construct new orientation for the camera scene node from yaw and pitch. Roll is fixed to zero
    cameraNode_->SetRotation(Quaternion(pitch_, yaw_, 0.0f));

    // Read WASD keys and move the camera scene node to the corresponding direction if they are pressed
    // Use the Translate() function (default local space) to move relative to the node's orientation.
    if (input->GetKeyDown(KEY_W))
        cameraNode_->Translate(Vector3::FORWARD * MOVE_SPEED * timeStep);
    if (input->GetKeyDown(KEY_S))
        cameraNode_->Translate(Vector3::BACK * MOVE_SPEED * timeStep);
    if (input->GetKeyDown(KEY_A))
        cameraNode_->Translate(Vector3::LEFT * MOVE_SPEED * timeStep);
    if (input->GetKeyDown(KEY_D))
        cameraNode_->Translate(Vector3::RIGHT * MOVE_SPEED * timeStep);
}


void HelloGui3D::CreateScene()
{
    ResourceCache* cache = GetSubsystem<ResourceCache>();

    scene_ = new Scene(context_);

    // Create the Octree component to the scene. This is required before adding any drawable components, or else nothing will
    // show up. The default octree volume will be from (-1000, -1000, -1000) to (1000, 1000, 1000) in world coordinates; it
    // is also legal to place objects outside the volume but their visibility can then not be checked in a hierarchically
    // optimizing manner
    scene_->CreateComponent<Octree>();

    // Create a child scene node (at world origin) and a StaticModel component into it. Set the StaticModel to show a simple
    // plane mesh with a "stone" material. Note that naming the scene nodes is optional. Scale the scene node larger
    // (100 x 100 world units)
    Node* planeNode = scene_->CreateChild("Plane");
    planeNode->SetScale(Vector3(5.0f, 1.0f, 5.0f));
    StaticModel* planeObject = planeNode->CreateComponent<StaticModel>();
    planeObject->SetModel(cache->GetResource<Model>("Models/Plane.mdl"));

    // Create a directional light to the world so that we can see something. The light scene node's orientation controls the
    // light direction; we will use the SetDirection() function which calculates the orientation from a forward direction vector.
    // The light will use default settings (white light, no shadows)
    Node* lightNode = scene_->CreateChild("DirectionalLight");
    lightNode->SetDirection(Vector3(0.6f, -1.0f, 0.8f)); // The direction vector does not need to be normalized
    Light* light = lightNode->CreateComponent<Light>();
    light->SetLightType(LIGHT_DIRECTIONAL);

    uiComponent_ = planeNode->CreateComponent<UIComponent>();
    uiComponent_->SetStaticModel(planeObject);
    uiComponent_->SetUIView(CreateUI(true));

    // Create a scene node for the camera, which we will move around
    // The camera will use default settings (1000 far clip distance, 45 degrees FOV, set aspect ratio automatically)
    cameraNode_ = scene_->CreateChild("Camera");
    cameraNode_->CreateComponent<Camera>();

    // Set an initial position for the camera scene node above the plane
    cameraNode_->SetPosition(Vector3(0.0f, 5.0f, 0.0f));
}


UIView* HelloGui3D::CreateUI(bool renderToTexture)
{
    UIView* view = renderToTexture ? new UIView(context_) : FeatureExamples::GetUIView();

    if (renderToTexture)
    {
        view3D_ = view;
        view->SetRenderToTexture(true);
    }

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
    edit->SetText("This is a test");

    SharedPtr<UIWindow> window( new UIWindow(context_) );
    window->SetSettings( (UI_WINDOW_SETTINGS) (UI_WINDOW_SETTINGS_TITLEBAR | UI_WINDOW_SETTINGS_CLOSE_BUTTON));

    window->SetText("Hello Atomic GUI!");

    window->AddChild(layout);

    window->SetSize(renderToTexture ? view->GetWidth() : 512, renderToTexture ? view->GetHeight() : 512);

    view->AddChild(window);
    window->Center();

    return view;

}

bool HelloGui3D::Raycast(float maxDistance, Vector3& hitPos, Drawable*& hitDrawable)
{
    hitDrawable = 0;

    Input* input = GetSubsystem<Input>();
    IntVector2 pos = input->GetMousePosition();
    // Check the cursor is visible and there is no UI element in front of the cursor
    if (!input->IsMouseVisible())
        return false;

    Graphics* graphics = GetSubsystem<Graphics>();
    Camera* camera = cameraNode_->GetComponent<Camera>();
    Ray cameraRay = camera->GetScreenRay((float)pos.x_ / graphics->GetWidth(), (float)pos.y_ / graphics->GetHeight());
    // Pick only geometry objects, not eg. zones or lights, only get the first (closest) hit
    PODVector<RayQueryResult> results;
    RayOctreeQuery query(results, cameraRay, RAY_TRIANGLE, maxDistance, DRAWABLE_GEOMETRY);
    scene_->GetComponent<Octree>()->RaycastSingle(query);
    if (results.Size())
    {
        RayQueryResult& result = results[0];
        hitPos = result.position_;
        hitDrawable = result.drawable_;
        return uiComponent_->GetStaticModel() == hitDrawable;
    }

    return false;
}


void HelloGui3D::SubscribeToEvents()
{
    // Subscribe HandleUpdate() function for processing update events
    SubscribeToEvent(E_UPDATE, ATOMIC_HANDLER(HelloGui3D, HandleUpdate));

    SubscribeToEvent(E_WIDGETEVENT, ATOMIC_HANDLER(HelloGui3D, HandleWidgetEvent));
    SubscribeToEvent(E_WIDGETDELETED, ATOMIC_HANDLER(HelloGui3D, HandleWidgetDeleted));
}

void HelloGui3D::HandleWidgetEvent(StringHash eventType, VariantMap& eventData)
{
    /*
    using namespace WidgetEvent;

    if (eventData[P_TYPE] == UI_EVENT_TYPE_CLICK)
    {
        UIWidget* widget = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
        if (widget)
        {
            window_->SetText(ToString("Hello: %s", widget->GetId().CString()));
        }

    }
    */
}

void HelloGui3D::HandleWidgetDeleted(StringHash eventType, VariantMap& eventData)
{
    BackToSelector();
}


void HelloGui3D::HandleUpdate(StringHash eventType, VariantMap& eventData)
{
    using namespace Update;

    // Take the frame time step, which is stored as a float
    float timeStep = eventData[P_TIMESTEP].GetFloat();

    Vector3 hitPos;
    Drawable* hitDrawable;

    if (Raycast(250.0f, hitPos, hitDrawable))
    {
        view3D_->SetActive(true);
    }
    else
    {
        view3D_->SetActive(false);
    }

    // Move the camera, scale movement with time step
    MoveCamera(timeStep);
}
