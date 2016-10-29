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
#include <Atomic/Engine/Engine.h>
#include <Atomic/Graphics/Camera.h>
#include <Atomic/Graphics/Graphics.h>
#include <Atomic/Graphics/Octree.h>
#include <Atomic/Graphics/Renderer.h>
#include <Atomic/Graphics/Zone.h>
#include <Atomic/Input/Input.h>
#include <Atomic/Resource/ResourceCache.h>
#include <Atomic/Scene/Scene.h>
#include <Atomic/Scene/SceneEvents.h>
#include <Atomic/Atomic2D/AnimatedSprite2D.h>
#include <Atomic/Atomic2D/AnimationSet2D.h>

#include "SpriterAnimation.h"

#include <Atomic/DebugNew.h>

SpriterAnimation::SpriterAnimation(Context* context) :
    Sample(context),
    spriterAnimationIndex_(0)
{
}

void SpriterAnimation::Start()
{
    // Execute base class startup
    Sample::Start();

    // Create the scene content
    CreateScene();

    // Create the UI content
    CreateInstructions();

    // Setup the viewport for displaying the scene
    SetupViewport();

    // Set the mouse mode to use in the sample
    Sample::InitMouseMode(MM_FREE);

    // Hook up to the frame update events
    SubscribeToEvents();
}

void SpriterAnimation::CreateScene()
{
    scene_ = new Scene(context_);
    scene_->CreateComponent<Octree>();

    // Create camera node
    cameraNode_ = scene_->CreateChild("Camera");
    // Set camera's position
    cameraNode_->SetPosition(Vector3(0.0f, 0.0f, -10.0f));

    Camera* camera = cameraNode_->CreateComponent<Camera>();
    camera->SetOrthographic(true);

    Graphics* graphics = GetSubsystem<Graphics>();
    camera->SetOrthoSize((float)graphics->GetHeight() * PIXEL_SIZE);
    camera->SetZoom(1.5f * Min((float)graphics->GetWidth() / 1280.0f, (float)graphics->GetHeight() / 800.0f)); // Set zoom according to user's resolution to ensure full visibility (initial zoom (1.5) is set for full visibility at 1280x800 resolution)

    ResourceCache* cache = GetSubsystem<ResourceCache>();
    AnimationSet2D* spriterAnimationSet = cache->GetResource<AnimationSet2D>("Urho2D/imp/imp.scml");
    if (!spriterAnimationSet)
        return;

    spriterNode_ = scene_->CreateChild("SpriterAnimation");
    AnimatedSprite2D* spriterAnimatedSprite = spriterNode_->CreateComponent<AnimatedSprite2D>();
    spriterAnimatedSprite->SetAnimationSet(spriterAnimationSet);
    spriterAnimatedSprite->SetAnimation(spriterAnimationSet->GetAnimation(spriterAnimationIndex_));
}

void SpriterAnimation::CreateInstructions()
{
    SimpleCreateInstructions("Mouse click to play next animation, \nUse WASD keys to move, use PageUp PageDown keys to zoom.");
}

void SpriterAnimation::SetupViewport()
{
    Renderer* renderer = GetSubsystem<Renderer>();

    // Set up a viewport to the Renderer subsystem so that the 3D scene can be seen
    SharedPtr<Viewport> viewport(new Viewport(context_, scene_, cameraNode_->GetComponent<Camera>()));
    renderer->SetViewport(0, viewport);
}

void SpriterAnimation::MoveCamera(float timeStep)
{
    Input* input = GetSubsystem<Input>();

    // Movement speed as world units per second
    const float MOVE_SPEED = 4.0f;

    // Read WASD keys and move the camera scene node to the corresponding direction if they are pressed
    if (input->GetKeyDown(KEY_W))
        cameraNode_->Translate(Vector3::UP * MOVE_SPEED * timeStep);
    if (input->GetKeyDown(KEY_S))
        cameraNode_->Translate(Vector3::DOWN * MOVE_SPEED * timeStep);
    if (input->GetKeyDown(KEY_A))
        cameraNode_->Translate(Vector3::LEFT * MOVE_SPEED * timeStep);
    if (input->GetKeyDown(KEY_D))
        cameraNode_->Translate(Vector3::RIGHT * MOVE_SPEED * timeStep);

    if (input->GetKeyDown(KEY_PAGEUP))
    {
        Camera* camera = cameraNode_->GetComponent<Camera>();
        camera->SetZoom(camera->GetZoom() * 1.01f);
    }

    if (input->GetKeyDown(KEY_PAGEDOWN))
    {
        Camera* camera = cameraNode_->GetComponent<Camera>();
        camera->SetZoom(camera->GetZoom() * 0.99f);
    }
}

void SpriterAnimation::SubscribeToEvents()
{
    // Subscribe HandleUpdate() function for processing update events
    SubscribeToEvent(E_UPDATE, ATOMIC_HANDLER(SpriterAnimation, HandleUpdate));
    SubscribeToEvent(E_MOUSEBUTTONDOWN, ATOMIC_HANDLER(SpriterAnimation, HandleMouseButtonDown));

    // Unsubscribe the SceneUpdate event from base class to prevent camera pitch and yaw in 2D sample
    UnsubscribeFromEvent(E_SCENEUPDATE);
}

void SpriterAnimation::HandleUpdate(StringHash eventType, VariantMap& eventData)
{
    using namespace Update;

    // Take the frame time step, which is stored as a float
    float timeStep = eventData[P_TIMESTEP].GetFloat();

    // Move the camera, scale movement with time step
    MoveCamera(timeStep);
}

void SpriterAnimation::HandleMouseButtonDown(StringHash eventType, VariantMap& eventData)
{
    AnimatedSprite2D* spriterAnimatedSprite = spriterNode_->GetComponent<AnimatedSprite2D>();
    AnimationSet2D* spriterAnimationSet = spriterAnimatedSprite->GetAnimationSet();
    spriterAnimationIndex_ = (spriterAnimationIndex_ + 1) % spriterAnimationSet->GetNumAnimations();
    spriterAnimatedSprite->SetAnimation(spriterAnimationSet->GetAnimation(spriterAnimationIndex_), LM_FORCE_LOOPED);
}
