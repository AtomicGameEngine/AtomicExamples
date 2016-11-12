//
// Copyright (c) 2008-2015 the Urho3D project.
// Copyright (c) 2015 Xamarin Inc
// Copyright (c) 2016 THUNDERBEAST GAMES LLC
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

using System.Collections.Generic;
using AtomicEngine;

namespace FeatureExamples
{
    public class RagdollSample : Sample
    {
        Scene scene;     // perspective (3d) scene, you know, where the ragdolls are.
        Camera camera;   // the regular camera
        bool drawDebug;  // bool to turn on/off debug hud.

        // the  2nd scene for the hud "overlay"
        Scene hudScene;   // the hud scene
        Camera hudCamera;  // ortho cam for the (pixel perfect) hud
        Vector <Sprite2D> filler;  // for bargraph display

        // more fun features...
        List <float> bulletMass;   // how heavy the bullet is
        List <float> bulletSpeed;  // how fast the bullet is
        List <float> bulletSize;   // how big the bullet is
        int massCount, speedCount, sizeCount; // counters

        float bulletArc;    // shooting inclination

        public RagdollSample() : base() { }

        public override void Start()
        {
            massCount = 2;
            speedCount = 2;
            sizeCount = 2;

            bulletMass = new List<float>();
            bulletSpeed = new List<float>();
            bulletSize = new List<float>();

            filler = new Vector <Sprite2D>();

            bulletMass.Add(1.0f);
            bulletMass.Add(10.0f);
            bulletMass.Add(50.0f);
            bulletMass.Add(100.0f);
            bulletMass.Add(300.0f);
            bulletMass.Add(666.0f);
            bulletMass.Add(1000.0f);
            bulletSpeed.Add(10.0f);
            bulletSpeed.Add(22.0f);
            bulletSpeed.Add(41.0f);
            bulletSpeed.Add(72.0f);
            bulletSpeed.Add(116.0f);
            bulletSpeed.Add(200.0f);
            bulletSpeed.Add(450.0f);
            bulletSize.Add(0.25f);
            bulletSize.Add(0.5f);
            bulletSize.Add(1.25f);
            bulletSize.Add(3.25f);
            bulletSize.Add(5.25f);
            bulletSize.Add(7.25f);
            bulletSize.Add(11.25f);
            bulletSize.Add(16.25f);

            bulletArc = 0.25f;

            base.Start();
            CreateScene();
            CreateHUD(); // add an overlay HUD that tells you settings
            SimpleCreateInstructionsWithWasd(
                "LMB to spawn physics objects\n" +
                "U=Mass, I=Speed, O=Size, R=Restart\n" +
                "Space to toggle physics debug geometry\n");
            SetupViewport();
            SubscribeToEvents();

            RestartJacks ();

            UpdateSpeedHud (speedCount);
            UpdateMassHud (massCount);
            UpdateSizeHud (sizeCount);

            GetSubsystem<Input>().SetMouseVisible (false);
        }

        void SubscribeToEvents()
        {
            SubscribeToEvent<PostRenderUpdateEvent>(e =>
            {
                // If draw debug mode is enabled, draw viewport debug geometry, which will show eg. drawable bounding boxes and skeleton
                // bones. Note that debug geometry has to be separately requested each frame. Disable depth test so that we can see the
                // bones properly
                if (drawDebug)
                    GetSubsystem<Renderer>().DrawDebugGeometry(false);
            });
        }

        protected override void Update(float timeStep)
        {
            base.Update(timeStep);

            SimpleMoveCamera3D(timeStep);

            var input = GetSubsystem<Input>();

            if (input.GetMouseButtonPress(Constants.MOUSEB_LEFT))
                SpawnObject();

            /* TODO: Scene.SaveXML/Scene.LoadXML
            if (input.GetKeyPress(Constants.KEY_F5))
                scene.SaveXml(fileSystem.UserDocumentsDir + "/Scenes/Physics.xml");
            if (input.GetKeyPress(Constants.KEY_F7))
                scene.LoadXml(fileSystem.UserDocumentsDir + "/Scenes/Physics.xml");
            */

            if (input.GetKeyPress (Constants.KEY_U)) {
                massCount++;
                if ( massCount > 5 )
                    massCount = 0;
                UpdateMassHud (massCount);
            }

            if (input.GetKeyPress (Constants.KEY_I)) {
                speedCount++;
                if ( speedCount> 5 )
                    speedCount = 0;
                UpdateSpeedHud (speedCount);
            }

            if (input.GetKeyPress (Constants.KEY_O)) {
                sizeCount++;
                if ( sizeCount > 5 )
                    sizeCount = 0;
                UpdateSizeHud (sizeCount);
            }

            if (input.GetKeyPress (Constants.KEY_P)) {
                if ( bulletArc == 0.0 )
                    bulletArc = 0.25f;
                else if ( bulletArc > 0.0 )
                    bulletArc = 0.0f;
            }

            if (input.GetKeyPress (Constants.KEY_R)) {
                RestartJacks ();
            }

            if (input.GetKeyPress(Constants.KEY_SPACE))
                drawDebug = !drawDebug;

            UpdateFps ();
            CleanUpSome ();
        }

        void UpdateFps ()
        {
            var eng = GetSubsystem<Engine>();
            string mystr = "FPS: " + eng.GetFps ().ToString ();
            mystr += "\nUse WASD keys and mouse/touch to move\n"
                + "LMB to spawn physics objects\n" 
                + "U=Mass, I=Speed, O=Size, R=Restart\n" 
                + "Space to toggle physics debug geometry";
            SetInstructions ( mystr );
        }

        void SetupViewport()
        {
            var renderer = GetSubsystem<Renderer>();
            var cache = GetSubsystem<ResourceCache>();

            renderer.SetNumViewports(2);  // use 2 viewports, 1 for 3d and 1 for the 2d hud
            var viewport2_ = new Viewport(hudScene, hudCamera );  // hud orthographic viewport, scene and camera
            var overlayRenderPath = new RenderPath(); 
            overlayRenderPath.Load(cache.GetResource<XMLFile>("PostProcess/FrontPath.xml"));  //special renderpath that does not clear
            viewport2_.SetRenderPath(overlayRenderPath);  // apply to hud viewport, so the background is transparent
            renderer.SetViewport(0, new Viewport(scene, camera)); // perspective viewport, scene and camera
            renderer.SetViewport(1, viewport2_);  // and add in the HUD viewport
        }

        void CreateScene()
        {
            var cache = GetSubsystem<ResourceCache>();
            scene = new Scene();

            // Create octree, use default volume (-1000, -1000, -1000) to (1000, 1000, 1000)
            // Create a physics simulation world with default parameters, which will update at 60fps. Like the Octree must
            // exist before creating drawable components, the PhysicsWorld must exist before creating physics components.
            // Finally, create a DebugRenderer component so that we can draw physics debug geometry
            scene.CreateComponent<Octree>();
            scene.CreateComponent<PhysicsWorld>();
            scene.CreateComponent<DebugRenderer>();

            // Create a Zone component for ambient lighting & fog control
            Node zoneNode = scene.CreateChild("Zone");
            Zone zone = zoneNode.CreateComponent<Zone>();
            zone.SetBoundingBox(new BoundingBox(-1000.0f, 1000.0f));
            zone.AmbientColor = (new Color(0.15f, 0.15f, 0.15f));
            zone.FogColor = new Color(0.5f, 0.5f, 0.7f);
            zone.FogStart = 100.0f;
            zone.FogEnd = 300.0f;

            // Create a directional light to the world. Enable cascaded shadows on it
            Node lightNode = scene.CreateChild("DirectionalLight");
            lightNode.SetDirection(new Vector3(0.6f, -1.0f, 0.8f));
            Light light = lightNode.CreateComponent<Light>();
            light.LightType = LightType.LIGHT_DIRECTIONAL;
            light.CastShadows = true;
            light.ShadowBias = new BiasParameters(0.00025f, 0.5f);
            // Set cascade splits at 10, 50 and 200 world units, fade shadows out at 80% of maximum shadow distance
            light.ShadowCascade = new CascadeParameters(10.0f, 50.0f, 200.0f, 0.0f, 0.8f);

            {
                // Create a floor object, 500 x 500 world units. Adjust position so that the ground is at zero Y
                Node floorNode = scene.CreateChild("Floor");
                floorNode.Position = new Vector3(0.0f, -0.5f, 0.0f);
                floorNode.Scale = new Vector3(500.0f, 1.0f, 500.0f);
                StaticModel floorObject = floorNode.CreateComponent<StaticModel>();
                floorObject.Model = cache.Get<Model>("Models/Box.mdl");
                floorObject.SetMaterial(cache.Get<Material>("Materials/StoneTiled.xml"));

                // Make the floor physical by adding RigidBody and CollisionShape components
                RigidBody body = floorNode.CreateComponent<RigidBody>();
                // We will be spawning spherical objects in this sample. The ground also needs non-zero rolling friction so that
                // the spheres will eventually come to rest
                body.RollingFriction = 0.15f;
                CollisionShape shape = floorNode.CreateComponent<CollisionShape>();
                // Set a box shape of size 1 x 1 x 1 for collision. The shape will be scaled with the scene node scale, so the
                // rendering and physics representation sizes should match (the box model is also 1 x 1 x 1.)
                shape.SetBox(Vector3.One, Vector3.Zero, Quaternion.Identity);
            }

            // Create the camera. Limit far clip distance to match the fog
            CameraNode = new Node();
            CameraNode.SetName("Camera");
            camera = CameraNode.CreateComponent<Camera>();
            camera.FarClip = 300.0f;
            // Set an initial position for the camera scene node above the plane
            CameraNode.Position = new Vector3(0.0f, 3.0f, -20.0f);
        }

        void RestartJacks()
        {
            var ll = new Vector <Node>();  //get rid of some old objects
            scene.GetChildrenWithName ( ll, "Sphere", true); 
            for ( int ii=0; ii<ll.Size; ii++ ) { 
                ll[ii].Remove ();
            }

            var nn = new Vector <Node>();
            scene.GetChildrenWithName ( nn, "Stuffing", true);
            for ( int ii=0; ii<nn.Size; ii++ ) { 
                nn[ii].Remove ();
            }

            var mm = new Vector <Node>();
            scene.GetChildrenWithName ( mm, "Jack", true); 
            for ( int ii=0; ii<mm.Size; ii++ ) { 
                    mm[ii].Remove ();
                }

            // Create animated models, you dont know ... jack
            var cache = GetSubsystem<ResourceCache>();
            for (int z = -1; z <= 1; ++z)
            {
                for (int x = -4; x <= 4; ++x)
                {
                    Node modelNode = scene.CreateChild("Jack");
                    modelNode.Position = new Vector3(x * 5.0f, 0.0f, z * 5.0f);
                    modelNode.Rotation = new Quaternion(0.0f, 180.0f, 0.0f);
                    AnimatedModel modelObject = modelNode.CreateComponent<AnimatedModel>();
                    modelObject.Model = cache.Get<Model>("Models/Jack.mdl");
                    modelObject.SetMaterial(cache.Get<Material>("Materials/Jack.xml"));
                    modelObject.CastShadows = true;
                    // Set the model to also update when invisible to avoid staying invisible when the model should come into
                    // view, but does not as the bounding box is not updated
                    modelObject.UpdateInvisible = true;

                    // Create a rigid body and a collision shape. These will act as a trigger for transforming the
                    // model into a ragdoll when hit by a moving object
                    RigidBody body = modelNode.CreateComponent<RigidBody>();
                    // The Trigger mode makes the rigid body only detect collisions, but impart no forces on the
                    // colliding objects
                    body.Trigger = true;
                    CollisionShape shape = modelNode.CreateComponent<CollisionShape>();
                    // Create the capsule shape with an offset so that it is correctly aligned with the model, which
                    // has its origin at the feet
                    shape.SetCapsule(0.7f, 2.0f, new Vector3(0.0f, 1.0f, 0.0f), Quaternion.Identity);

                    // Create a custom component that reacts to collisions and creates the ragdoll
                    modelNode.AddComponent(new Ragdoll());
                }
            }
        }

        void CreateHUD()
        {
            float hscal = 0.4f;
            //
            // create a 2nd viewport and scene for a hud with sprites.
            //
            hudScene = new Scene();
            hudScene.CreateComponent<Octree>();
            // Create camera node
            var hudCam = hudScene.CreateChild("HudCamera");
            // Set camera's position
            hudCam.SetPosition(new Vector3(0.0f, 0.0f, -10.0f));
            hudCamera = hudCam.CreateComponent<Camera>();
            hudCamera.SetOrthographic(true);
            var graphics = GetSubsystem<Graphics>();
            hudCamera.SetOrthoSize ((float)graphics.GetHeight () * PixelSize ); //PIXEL_SIZE

            var cache = GetSubsystem<ResourceCache>();

            // add a crosshair in the center of the screen
            var sprite = cache.GetResource<Sprite2D>("Textures/NinjaSnowWar/Sight.png");
            var targetSprite_ = hudScene.CreateChild("targetSprite");
            targetSprite_.SetPosition2D(new Vector2(0,0));
            targetSprite_.SetScale2D( new Vector2(0.75f, 0.75f));
            var staticSprite = targetSprite_.CreateComponent<StaticSprite2D>();
            staticSprite.SetSprite(sprite);   // Set sprite
            staticSprite.SetBlendMode( AtomicEngine.BlendMode.BLEND_ALPHA ); // Set blend mode
            staticSprite.SetAlpha(0.3f);  

            // borrow the spinning coin from the 2DSprite example to show what the possibilities are
            float halfWidth = graphics.Width * 0.5f * PixelSize;
            float halfHeight = graphics.Height * 0.5f * PixelSize;
            // Get animation set
            AnimationSet2D animationSet = cache.Get<AnimationSet2D>("Urho2D/GoldIcon.scml");
            if (animationSet == null) return;
            var spriteNode2 = hudScene.CreateChild("AnimatedSprite2D");
            AnimatedSprite2D animatedSprite = spriteNode2.CreateComponent<AnimatedSprite2D>();
            animatedSprite.AnimationSet = animationSet;         // Set animation
            animatedSprite.SetAnimation("idle", LoopMode2D.LM_DEFAULT);
            spriteNode2.SetPosition2D(new Vector2(halfWidth - 0.4f, halfHeight - 0.4f));

            // (bullet) mass, speed size feature huds
            filler.Push ( cache.GetResource<Sprite2D>("Textures/hudfill1.png") );
            filler.Push ( cache.GetResource<Sprite2D>("Textures/hudfill2.png") );
            filler.Push ( cache.GetResource<Sprite2D>("Textures/hudfill3.png") );
            filler.Push ( cache.GetResource<Sprite2D>("Textures/hudfill4.png") );
            filler.Push ( cache.GetResource<Sprite2D>("Textures/hudfill5.png") );
            filler.Push ( cache.GetResource<Sprite2D>("Textures/hudfill6.png") );

            Sprite2D spritem = cache.GetResource<Sprite2D>("Textures/hudmass.png");
            Node hudm = hudScene.CreateChild("hudMass");
            hudm.SetScale2D(new Vector2(hscal,hscal));
            hudm.SetPosition2D( new Vector2( 0f - (halfWidth/3.0f), halfHeight - 0.4f)); 
            StaticSprite2D hudSpritem = hudm.CreateComponent<StaticSprite2D>();
            hudSpritem.SetSprite(spritem);
            hudSpritem.SetAlpha(0.9f);
            hudSpritem.SetBlendMode(AtomicEngine.BlendMode.BLEND_ALPHA);
            hudSpritem.SetOrderInLayer(3); 
            Node hudfm = hudm.CreateChild("hudMassFill");
            hudfm.SetScale2D(new Vector2(1f,1f));
            hudfm.SetPosition2D( new Vector2( 0f, 0f)); 
            StaticSprite2D hudSpritefm = hudfm.CreateComponent<StaticSprite2D>();
            hudSpritefm.SetSprite(filler[0]);
            hudSpritefm.SetAlpha(0.9f);
            hudSpritefm.SetBlendMode(AtomicEngine.BlendMode.BLEND_ALPHA);
            hudSpritefm.SetOrderInLayer(-3); 

            Sprite2D sprites = cache.GetResource<Sprite2D>("Textures/hudspeed.png");
            Node huds = hudScene.CreateChild("hudSpeed");
            huds.SetScale2D(new Vector2(hscal,hscal));
            huds.SetPosition2D( new Vector2( 0f, halfHeight - 0.4f)); 
            StaticSprite2D hudSprites = huds.CreateComponent<StaticSprite2D>();
            hudSprites.SetSprite(sprites);
            hudSprites.SetAlpha(0.9f);
            hudSprites.SetBlendMode(AtomicEngine.BlendMode.BLEND_ALPHA);
            hudSprites.SetOrderInLayer(3); 
            Node hudsm = huds.CreateChild("hudSpeedFill");
            hudsm.SetScale2D(new Vector2(1f,1f));
            hudsm.SetPosition2D( new Vector2( 0f, 0f)); 
            StaticSprite2D hudSpritesm = hudsm.CreateComponent<StaticSprite2D>();
            hudSpritesm.SetSprite(filler[0]);
            hudSpritesm.SetAlpha(0.9f);
            hudSpritesm.SetBlendMode(AtomicEngine.BlendMode.BLEND_ALPHA);
            hudSpritesm.SetOrderInLayer(-3); 

            Sprite2D spritez = cache.GetResource<Sprite2D>("Textures/hudsize.png");
            Node hudz = hudScene.CreateChild("hudSize");
            hudz.SetScale2D(new Vector2(hscal,hscal));
            hudz.SetPosition2D( new Vector2( 0f + (halfWidth/3.0f), halfHeight - 0.4f)); 
            StaticSprite2D hudSpritez = hudz.CreateComponent<StaticSprite2D>();
            hudSpritez.SetSprite(spritez);
            hudSpritez.SetAlpha(0.9f);
            hudSpritez.SetBlendMode(AtomicEngine.BlendMode.BLEND_ALPHA);
            hudSpritez.SetOrderInLayer(3); 
            Node hudzm = hudz.CreateChild("hudSizeFill");
            hudzm.SetScale2D(new Vector2(1f,1f));
            hudzm.SetPosition2D( new Vector2( 0f, 0f)); 
            StaticSprite2D hudSpritezm = hudzm.CreateComponent<StaticSprite2D>();
            hudSpritezm.SetSprite(filler[0]);
            hudSpritezm.SetAlpha(0.9f);
            hudSpritezm.SetBlendMode(AtomicEngine.BlendMode.BLEND_ALPHA);
            hudSpritezm.SetOrderInLayer(-3);
        }

        void UpdateMassHud ( int value )
        {
            Node xNode = hudScene.GetChild("hudMass", true);
            if (xNode != null) {
                Node fillx = xNode.GetChild("hudMassFill");
                if (fillx != null) {
                    StaticSprite2D hudSprite = fillx.GetComponent<StaticSprite2D>();
                    hudSprite.SetSprite(filler[value]);
                }
            }
        }

        void UpdateSpeedHud ( int value )
        {
            Node xNode = hudScene.GetChild("hudSpeed", true);
            if (xNode != null) {
                Node fillx = xNode.GetChild("hudSpeedFill");
                if (fillx != null) {
                    StaticSprite2D hudSprite = fillx.GetComponent<StaticSprite2D>();
                    hudSprite.SetSprite(filler[value]);
                }
            }
        }

        void UpdateSizeHud ( int value )
        {
            Node xNode = hudScene.GetChild("hudSize", true);
            if (xNode != null) {
                Node fillx = xNode.GetChild("hudSizeFill");
                if (fillx != null) {
                    StaticSprite2D hudSprite = fillx.GetComponent<StaticSprite2D>();
                    hudSprite.SetSprite(filler[value]);
                }
            }
        }

        void SpawnObject()
        {
            var cache = GetSubsystem<ResourceCache>();

            Node boxNode = scene.CreateChild("Sphere");
            boxNode.Position = CameraNode.Position;
            boxNode.Rotation = CameraNode.Rotation;
            boxNode.SetScale(bulletSize[sizeCount]);
            StaticModel boxObject = boxNode.CreateComponent<StaticModel>();
            boxObject.Model = cache.Get<Model>("Models/Sphere.mdl");
            boxObject.SetMaterial(cache.Get<Material>("Materials/StoneSmall.xml"));
            boxObject.CastShadows = true;

            RigidBody body = boxNode.CreateComponent<RigidBody>();
            body.Mass = bulletMass[massCount];
            body.RollingFriction = 0.15f;
            CollisionShape shape = boxNode.CreateComponent<CollisionShape>();
            shape.SetSphere(1.0f, Vector3.Zero, Quaternion.Identity);

            float objectVelocity = bulletSpeed[speedCount];

            // Set initial velocity for the RigidBody based on camera forward vector. Add also a slight up component
            // to overcome gravity better
            body.SetLinearVelocity(CameraNode.Rotation * new Vector3(0.0f, bulletArc, 1.0f) * objectVelocity);
        }

        void CleanUpSome() // destroy the bullets when they get far enough away
        {
            Node cam = CameraNode; // note - the camera isnt in the scene
            if ( cam == null )
                return;
            var mm = new Vector <Node>();
            scene.GetChildrenWithName ( mm, "Sphere", true);
            for ( int ii=0; ii<mm.Size; ii++ ) { 
              float dist = ( mm[ii].GetWorldPosition() - cam.GetWorldPosition() ).Length;
                if (dist > 270.0f) {
                    mm[ii].Remove ();
                }
            }
        }
    }

}