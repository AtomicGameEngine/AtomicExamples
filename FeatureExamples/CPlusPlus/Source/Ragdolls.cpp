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
#include <Atomic/Graphics/AnimatedModel.h>
#include <Atomic/Graphics/Camera.h>
#include <Atomic/Graphics/DebugRenderer.h>
#include <Atomic/Graphics/Graphics.h>
#include <Atomic/Graphics/Light.h>
#include <Atomic/Graphics/Material.h>
#include <Atomic/Graphics/Octree.h>
#include <Atomic/Graphics/Renderer.h>
#include <Atomic/Graphics/Zone.h>
#include <Atomic/Input/Input.h>
#include <Atomic/IO/File.h>
#include <Atomic/IO/FileSystem.h>
#include <Atomic/Physics/CollisionShape.h>
#include <Atomic/Physics/PhysicsWorld.h>
#include <Atomic/Physics/RigidBody.h>
#include <Atomic/Resource/ResourceCache.h>
#include <Atomic/Scene/Scene.h>
#include <Atomic/UI/UI.h>
#include <Atomic/Atomic2D/StaticSprite2D.h>
#include <Atomic/Atomic2D/AnimationSet2D.h>
#include <Atomic/Atomic2D/AnimatedSprite2D.h>
#include <Atomic/Atomic2D/Sprite2D.h>
#include <Atomic/Graphics/RenderPath.h>
#include <Atomic/Resource/XMLFile.h>

#include "CreateRagdoll.h"
#include "Ragdolls.h"

#include <Atomic/DebugNew.h>

Ragdolls::Ragdolls(Context* context) :
    Sample(context),
    drawDebug_(false)
{
    // Register an object factory for our custom CreateRagdoll component so that we can create them to scene nodes
    context->RegisterFactory<CreateRagdoll>();
    
    massCount = 2;
    speedCount = 2;
    sizeCount = 2;

    bulletMass.Push(1.0f);
    bulletMass.Push(10.0f);
    bulletMass.Push(50.0f);
    bulletMass.Push(100.0f);
    bulletMass.Push(300.0f);
    bulletMass.Push(666.0f);
    bulletMass.Push(1000.0f);
    bulletSpeed.Push(10.0f);
    bulletSpeed.Push(22.0f);
    bulletSpeed.Push(41.0f);
    bulletSpeed.Push(72.0f);
    bulletSpeed.Push(116.0f);
    bulletSpeed.Push(200.0f);
    bulletSpeed.Push(450.0f);
    bulletSize.Push(0.25f);
    bulletSize.Push(0.5f);
    bulletSize.Push(1.25f);
    bulletSize.Push(3.25f);
    bulletSize.Push(5.25f);
    bulletSize.Push(7.25f);
    bulletSize.Push(11.25f);
    bulletSize.Push(16.25f);

    bulletArc = 0.25f;

}

void Ragdolls::Start()
{
    // Execute base class startup
    Sample::Start();

    // Create the scene content
    CreateScene();

    // add an overlay HUD that tells you settings
    CreateHUD();

    // Create the UI content
    CreateInstructions();

    // Setup the viewport for displaying the scene
    SetupViewport();

    // Hook up to the frame update and render post-update events
    SubscribeToEvents();

    // Set the mouse mode to use in the sample
    Sample::InitMouseMode(MM_ABSOLUTE);
    
    RestartJacks ();

    UpdateSpeedHud (speedCount);
    UpdateMassHud (massCount);
    UpdateSizeHud (sizeCount);

    GetSubsystem<Input>()->SetMouseVisible (false);

}

void Ragdolls::CreateScene()
{
    ResourceCache* cache = GetSubsystem<ResourceCache>();

    scene_ = new Scene(context_);

    // Create octree, use default volume (-1000, -1000, -1000) to (1000, 1000, 1000)
    // Create a physics simulation world with default parameters, which will update at 60fps. Like the Octree must
    // exist before creating drawable components, the PhysicsWorld must exist before creating physics components.
    // Finally, create a DebugRenderer component so that we can draw physics debug geometry
    scene_->CreateComponent<Octree>();
    scene_->CreateComponent<PhysicsWorld>();
    scene_->CreateComponent<DebugRenderer>();

    // Create a Zone component for ambient lighting & fog control
    Node* zoneNode = scene_->CreateChild("Zone");
    Zone* zone = zoneNode->CreateComponent<Zone>();
    zone->SetBoundingBox(BoundingBox(-1000.0f, 1000.0f));
    zone->SetAmbientColor(Color(0.15f, 0.15f, 0.15f));
    zone->SetFogColor(Color(0.5f, 0.5f, 0.7f));
    zone->SetFogStart(100.0f);
    zone->SetFogEnd(300.0f);

    // Create a directional light to the world. Enable cascaded shadows on it
    Node* lightNode = scene_->CreateChild("DirectionalLight");
    lightNode->SetDirection(Vector3(0.6f, -1.0f, 0.8f));
    Light* light = lightNode->CreateComponent<Light>();
    light->SetLightType(LIGHT_DIRECTIONAL);
    light->SetCastShadows(true);
    light->SetShadowBias(BiasParameters(0.00025f, 0.5f));
    // Set cascade splits at 10, 50 and 200 world units, fade shadows out at 80% of maximum shadow distance
    light->SetShadowCascade(CascadeParameters(10.0f, 50.0f, 200.0f, 0.0f, 0.8f));

    // Create a floor object, 500 x 500 world units. Adjust position so that the ground is at zero Y
    Node* floorNode = scene_->CreateChild("Floor");
    floorNode->SetPosition(Vector3(0.0f, -0.5f, 0.0f));
    floorNode->SetScale(Vector3(500.0f, 1.0f, 500.0f));
    StaticModel* floorObject = floorNode->CreateComponent<StaticModel>();
    floorObject->SetModel(cache->GetResource<Model>("Models/Box.mdl"));
    floorObject->SetMaterial(cache->GetResource<Material>("Materials/StoneTiled.xml"));

    // Make the floor physical by adding RigidBody and CollisionShape components
    RigidBody* body = floorNode->CreateComponent<RigidBody>();
    // We will be spawning spherical objects in this sample. The ground also needs non-zero rolling friction so that
    // the spheres will eventually come to rest
    body->SetRollingFriction(0.15f);
    CollisionShape* shape = floorNode->CreateComponent<CollisionShape>();
    // Set a box shape of size 1 x 1 x 1 for collision. The shape will be scaled with the scene node scale, so the
    // rendering and physics representation sizes should match (the box model is also 1 x 1 x 1.)
    shape->SetBox(Vector3::ONE);

    // Create the camera. Limit far clip distance to match the fog. Note: now we actually create the camera node outside
    // the scene, because we want it to be unaffected by scene load / save
    cameraNode_ = new Node(context_);
    Camera* camera = cameraNode_->CreateComponent<Camera>();
    camera->SetFarClip(300.0f);

    // Set an initial position for the camera scene node above the floor
    cameraNode_->SetPosition(Vector3(0.0f, 3.0f, -20.0f));
}

void Ragdolls::CreateInstructions()
{
    SimpleCreateInstructions (
        "Use WASD keys and mouse/touch to move\n"
        "LMB to spawn physics objects\n"
        "F5 to save scene, F7 to load\n"
        "Space to toggle physics debug geometry"
    );
}

void Ragdolls::SetupViewport()
{
    Renderer* renderer = GetSubsystem<Renderer>();
    ResourceCache* cache = GetSubsystem<ResourceCache>();
   
    renderer->SetNumViewports(2);  // use 2 viewports, 1 for 3d and 1 for the 2d hud
    Viewport* viewport2_ = new Viewport(context_, hudScene, hudCamera );  // hud orthographic viewport, scene and camera
    RenderPath *overlayRenderPath = new RenderPath(); 
    overlayRenderPath->Load(cache->GetResource<XMLFile>("PostProcess/FrontPath.xml"));  //special renderpath that does not clear
    viewport2_->SetRenderPath(overlayRenderPath);  // apply to hud viewport, so the background is transparent
    renderer->SetViewport(0, new Viewport(context_, scene_, cameraNode_->GetComponent<Camera>())); // perspective viewport, scene and camera
    renderer->SetViewport(1, viewport2_);  // and add in the HUD viewport
}

void Ragdolls::MoveCamera(float timeStep)
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
    if (input->GetKeyDown(KEY_W))
        cameraNode_->Translate(Vector3::FORWARD * MOVE_SPEED * timeStep);
    if (input->GetKeyDown(KEY_S))
        cameraNode_->Translate(Vector3::BACK * MOVE_SPEED * timeStep);
    if (input->GetKeyDown(KEY_A))
        cameraNode_->Translate(Vector3::LEFT * MOVE_SPEED * timeStep);
    if (input->GetKeyDown(KEY_D))
        cameraNode_->Translate(Vector3::RIGHT * MOVE_SPEED * timeStep);

    // "Shoot" a physics object with left mousebutton
    if (input->GetMouseButtonPress(MOUSEB_LEFT))
        SpawnObject();

    // Check for loading / saving the scene
    if (input->GetKeyPress(KEY_F5))
    {
        File saveFile(context_, GetSubsystem<FileSystem>()->GetProgramDir() + "Data/Scenes/Ragdolls.xml", FILE_WRITE);
        scene_->SaveXML(saveFile);
    }
    if (input->GetKeyPress(KEY_F7))
    {
        File loadFile(context_, GetSubsystem<FileSystem>()->GetProgramDir() + "Data/Scenes/Ragdolls.xml", FILE_READ);
        scene_->LoadXML(loadFile);
    }

    // Toggle physics debug geometry with space
    if (input->GetKeyPress(KEY_SPACE))
        drawDebug_ = !drawDebug_;
        
    if (input->GetKeyPress (KEY_U)) {
        massCount++;
        if ( massCount > 5 )
            massCount = 0;
        UpdateMassHud (massCount);
    }

    if (input->GetKeyPress (KEY_I)) {
        speedCount++;
        if ( speedCount> 5 )
            speedCount = 0;
        UpdateSpeedHud (speedCount);
    }

    if (input->GetKeyPress (KEY_O)) {
        sizeCount++;
        if ( sizeCount > 5 )
            sizeCount = 0;
        UpdateSizeHud (sizeCount);
    }

    if (input->GetKeyPress (KEY_P)) {
        if ( bulletArc == 0.0 )
            bulletArc = 0.25f;
        else if ( bulletArc > 0.0 )
            bulletArc = 0.0f;
    }

    if (input->GetKeyPress (KEY_R)) {
        RestartJacks ();
    }

    UpdateFps ();
    CleanUpSome ();

}

void Ragdolls::SpawnObject()
{
    ResourceCache* cache = GetSubsystem<ResourceCache>();

    Node* boxNode = scene_->CreateChild("Sphere");
    boxNode->SetPosition(cameraNode_->GetPosition());
    boxNode->SetRotation(cameraNode_->GetRotation());
    boxNode->SetScale(bulletSize[sizeCount]);
    StaticModel* boxObject = boxNode->CreateComponent<StaticModel>();
    boxObject->SetModel(cache->GetResource<Model>("Models/Sphere.mdl"));
    boxObject->SetMaterial(cache->GetResource<Material>("Materials/StoneSmall.xml"));
    boxObject->SetCastShadows(true);

    RigidBody* body = boxNode->CreateComponent<RigidBody>();
    body->SetMass(bulletMass[massCount]);
    body->SetRollingFriction(0.15f);
    CollisionShape* shape = boxNode->CreateComponent<CollisionShape>();
    shape->SetSphere(1.0f);

    const float OBJECT_VELOCITY = bulletSpeed[speedCount];

    // Set initial velocity for the RigidBody based on camera forward vector. Add also a slight up component
    // to overcome gravity better
    body->SetLinearVelocity(cameraNode_->GetRotation() * Vector3(0.0f, bulletArc, 1.0f) * OBJECT_VELOCITY);
}

void Ragdolls::SubscribeToEvents()
{
    // Subscribe HandleUpdate() function for processing update events
    SubscribeToEvent(E_UPDATE, ATOMIC_HANDLER(Ragdolls, HandleUpdate));

    // Subscribe HandlePostRenderUpdate() function for processing the post-render update event, during which we request
    // debug geometry
    SubscribeToEvent(E_POSTRENDERUPDATE, ATOMIC_HANDLER(Ragdolls, HandlePostRenderUpdate));
}

void Ragdolls::HandleUpdate(StringHash eventType, VariantMap& eventData)
{
    using namespace Update;

    // Take the frame time step, which is stored as a float
    float timeStep = eventData[P_TIMESTEP].GetFloat();

    // Move the camera, scale movement with time step
    MoveCamera(timeStep);
}

void Ragdolls::HandlePostRenderUpdate(StringHash eventType, VariantMap& eventData)
{
    // If draw debug mode is enabled, draw physics debug geometry. Use depth test to make the result easier to interpret
    if (drawDebug_)
        scene_->GetComponent<PhysicsWorld>()->DrawDebugGeometry(true);
}

    // support for 2D hud and new features
void Ragdolls::CreateHUD()
{
     float hscal = 0.4f;
    //
    // create a 2nd viewport and scene for a hud with sprites.
    //
    hudScene = new Scene(context_);
    hudScene->CreateComponent<Octree>();
    // Create camera node
    Node* hudCam = hudScene->CreateChild("HudCamera");
    // Set camera's position
    hudCam->SetPosition( Vector3(0.0f, 0.0f, -10.0f));
    hudCamera = hudCam->CreateComponent<Camera>();
    hudCamera->SetOrthographic(true);
    Graphics* graphics = GetSubsystem<Graphics>();
    hudCamera->SetOrthoSize ((float)graphics->GetHeight () * 0.01f ); //PIXEL_SIZE

    ResourceCache *cache = GetSubsystem<ResourceCache>();

    // add a crosshair in the center of the screen
    Sprite2D* sprite = cache->GetResource<Sprite2D>("Textures/NinjaSnowWar/Sight.png");
    Node* targetSprite_ = hudScene->CreateChild("targetSprite");
    targetSprite_->SetPosition2D(Vector2(0,0));
    targetSprite_->SetScale2D(Vector2(0.75f, 0.75f));
    StaticSprite2D* staticSprite = targetSprite_->CreateComponent<StaticSprite2D>();
    staticSprite->SetSprite(sprite);   // Set sprite
    staticSprite->SetBlendMode( BLEND_ALPHA ); // Set blend mode
    staticSprite->SetAlpha(0.3f);  

    // borrow the spinning coin from the 2DSprite example to show what the possibilities are
    float halfWidth = graphics->GetWidth() * 0.5f * 0.01;
    float halfHeight = graphics->GetHeight() * 0.5f * 0.01;
    // Get animation set
    AnimationSet2D* animationSet = cache->GetResource<AnimationSet2D>("Urho2D/GoldIcon.scml");
    if (animationSet == NULL) return;
    Node* spriteNode2 = hudScene->CreateChild("AnimatedSprite2D");
    AnimatedSprite2D* animatedSprite = spriteNode2->CreateComponent<AnimatedSprite2D>();
    animatedSprite->SetAnimationSet(animationSet);         // Set animation
    animatedSprite->SetAnimation("idle", LM_DEFAULT);
    spriteNode2->SetPosition2D( Vector2(halfWidth - 0.4f, halfHeight - 0.4f));

    // (bullet) mass, speed size feature huds
    filler.Push ( cache->GetResource<Sprite2D>("Textures/hudfill1.png") );
    filler.Push ( cache->GetResource<Sprite2D>("Textures/hudfill2.png") );
    filler.Push ( cache->GetResource<Sprite2D>("Textures/hudfill3.png") );
    filler.Push ( cache->GetResource<Sprite2D>("Textures/hudfill4.png") );
    filler.Push ( cache->GetResource<Sprite2D>("Textures/hudfill5.png") );
    filler.Push ( cache->GetResource<Sprite2D>("Textures/hudfill6.png") );

    Sprite2D* spritem = cache->GetResource<Sprite2D>("Textures/hudmass.png");
    Node* hudm = hudScene->CreateChild("hudMass");
    hudm->SetScale2D( Vector2(hscal,hscal));
    hudm->SetPosition2D( Vector2( 0 - (halfWidth/3.0), halfHeight - 0.4)); 
    StaticSprite2D* hudSpritem = hudm->CreateComponent<StaticSprite2D>();
    hudSpritem->SetSprite(spritem);
    hudSpritem->SetAlpha(0.9);
    hudSpritem->SetBlendMode( BLEND_ALPHA);
    hudSpritem->SetOrderInLayer(3); 
    Node* hudfm = hudm->CreateChild("hudMassFill");
    hudfm->SetScale2D( Vector2(1,1));
    hudfm->SetPosition2D(  Vector2( 0, 0)); 
    StaticSprite2D* hudSpritefm = hudfm->CreateComponent<StaticSprite2D>();
    hudSpritefm->SetSprite(filler[0]);
    hudSpritefm->SetAlpha(0.9);
    hudSpritefm->SetBlendMode( BLEND_ALPHA);
    hudSpritefm->SetOrderInLayer(-3); 

    Sprite2D* sprites = cache->GetResource<Sprite2D>("Textures/hudspeed.png");
    Node* huds = hudScene->CreateChild("hudSpeed");
    huds->SetScale2D( Vector2(hscal,hscal));
    huds->SetPosition2D(  Vector2( 0, halfHeight - 0.4)); 
    StaticSprite2D* hudSprites = huds->CreateComponent<StaticSprite2D>();
    hudSprites->SetSprite(sprites);
    hudSprites->SetAlpha(0.9);
    hudSprites->SetBlendMode( BLEND_ALPHA);
    hudSprites->SetOrderInLayer(3); 
    Node* hudsm = huds->CreateChild("hudSpeedFill");
    hudsm->SetScale2D( Vector2(1,1));
    hudsm->SetPosition2D( Vector2( 0, 0)); 
    StaticSprite2D* hudSpritesm = hudsm->CreateComponent<StaticSprite2D>();
    hudSpritesm->SetSprite(filler[0]);
    hudSpritesm->SetAlpha(0.9);
    hudSpritesm->SetBlendMode( BLEND_ALPHA);
    hudSpritesm->SetOrderInLayer(-3); 

    Sprite2D* spritez = cache->GetResource<Sprite2D>("Textures/hudsize.png");
    Node* hudz = hudScene->CreateChild("hudSize");
    hudz->SetScale2D( Vector2(hscal,hscal));
    hudz->SetPosition2D(  Vector2( 0 + (halfWidth/3.0), halfHeight - 0.4)); 
    StaticSprite2D* hudSpritez = hudz->CreateComponent<StaticSprite2D>();
    hudSpritez->SetSprite(spritez);
    hudSpritez->SetAlpha(0.9);
    hudSpritez->SetBlendMode( BLEND_ALPHA);
    hudSpritez->SetOrderInLayer(3); 
    Node* hudzm = hudz->CreateChild("hudSizeFill");
    hudzm->SetScale2D( Vector2(1,1));
    hudzm->SetPosition2D( Vector2( 0, 0)); 
    StaticSprite2D* hudSpritezm = hudzm->CreateComponent<StaticSprite2D>();
    hudSpritezm->SetSprite(filler[0]);
    hudSpritezm->SetAlpha(0.9);
    hudSpritezm->SetBlendMode( BLEND_ALPHA);
    hudSpritezm->SetOrderInLayer(-3);
}

void Ragdolls::RestartJacks()
{
    PODVector< Node * >allnodes;
    scene_->GetChildren (allnodes, true);

    for ( int ii=0; ii<allnodes.Size() ; ii++ ) 
    { 
        if ( allnodes[ii]->GetName().Compare ("Sphere") == 0) allnodes[ii]->Remove ();
        else if ( allnodes[ii]->GetName().Compare ("Stuffing") == 0 ) allnodes[ii]->Remove ();
        else if ( allnodes[ii]->GetName().Compare ("Jack") == 0 ) allnodes[ii]->Remove ();
    }

    ResourceCache *cache = GetSubsystem<ResourceCache>();
    // Create animated models, you dont know ... jack
   for (int z = -1; z <= 1; ++z)
    {
        for (int x = -4; x <= 4; ++x)
        {
            Node* modelNode = scene_->CreateChild("Jack");
            modelNode->SetPosition(Vector3(x * 5.0f, 0.0f, z * 5.0f));
            modelNode->SetRotation(Quaternion(0.0f, 180.0f, 0.0f));
            AnimatedModel* modelObject = modelNode->CreateComponent<AnimatedModel>();
            modelObject->SetModel(cache->GetResource<Model>("Models/Jack.mdl"));
            modelObject->SetMaterial(cache->GetResource<Material>("Materials/Jack.xml"));
            modelObject->SetCastShadows(true);
            // Set the model to also update when invisible to avoid staying invisible when the model should come into
            // view, but does not as the bounding box is not updated
            modelObject->SetUpdateInvisible(true);

            // Create a rigid body and a collision shape. These will act as a trigger for transforming the
            // model into a ragdoll when hit by a moving object
            RigidBody* body = modelNode->CreateComponent<RigidBody>();
            // The Trigger mode makes the rigid body only detect collisions, but impart no forces on the
            // colliding objects
            body->SetTrigger(true);
            CollisionShape* shape = modelNode->CreateComponent<CollisionShape>();
            // Create the capsule shape with an offset so that it is correctly aligned with the model, which
            // has its origin at the feet
            shape->SetCapsule(0.7f, 2.0f, Vector3(0.0f, 1.0f, 0.0f));

            // Create a custom component that reacts to collisions and creates the ragdoll
            modelNode->CreateComponent<CreateRagdoll>();
        }
    }    
}

void Ragdolls::CleanUpSome()
{
    Node* cam = cameraNode_; // note - the camera isnt in the scene
    if ( cam == NULL )
        return;

    PODVector< Node * >allnodes;
    scene_->GetChildren (allnodes, true);
    for ( int ii=0; ii<allnodes.Size() ; ii++ ) 
    { 
        if ( allnodes[ii]->GetName().Compare ("Sphere") == 0 ) 
        {
            if (( allnodes[ii]->GetWorldPosition() - cam->GetWorldPosition() ).Length() > 270.0f)
            {
                allnodes[ii]->Remove ();
            }
        }
    }    
}

void Ragdolls::UpdateFps ()
{
    Engine* eng = GetSubsystem<Engine>();
    String mystr = "FPS: " + String(eng->GetFps());
    mystr += "\nUse WASD keys and mouse/touch to move\n";
    mystr += "LMB to spawn physics objects\n";
    mystr += "U=Mass, I=Speed, O=Size, R=Restart\n";
    mystr += "Space to toggle physics debug geometry";
    SetInstructions ( mystr );
}

void Ragdolls::UpdateMassHud ( int value )
{
    Node* xNode = hudScene->GetChild("hudMass", true);
    if (xNode) {
        Node* fillx = xNode->GetChild("hudMassFill");
        if (fillx) {
            StaticSprite2D* hudSprite = fillx->GetComponent<StaticSprite2D>();
            hudSprite->SetSprite(filler[value]);
        }
    }
}

void Ragdolls::UpdateSpeedHud ( int value )
{
    Node* xNode = hudScene->GetChild("hudSpeed", true);
    if (xNode) {
        Node* fillx = xNode->GetChild("hudSpeedFill");
        if (fillx) {
            StaticSprite2D* hudSprite = fillx->GetComponent<StaticSprite2D>();
            hudSprite->SetSprite(filler[value]);
        }
    }
}

void Ragdolls::UpdateSizeHud ( int value )
{
    Node* xNode = hudScene->GetChild("hudSize", true);
    if (xNode) {
        Node* fillx = xNode->GetChild("hudSizeFill");
        if (fillx) {
            StaticSprite2D* hudSprite = fillx->GetComponent<StaticSprite2D>();
            hudSprite->SetSprite(filler[value]);
        }
    }
}
