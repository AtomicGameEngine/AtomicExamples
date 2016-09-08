//---------------------------------------------------------------------------------
// Ported to the Atomic Game Engine
// Originally written for XNA by Michael Hoffman
// Find the full tutorial at: http://gamedev.tutsplus.com/series/vector-shooter-xna/
//----------------------------------------------------------------------------------

using System;
using AtomicEngine;
using AtomicPlayer;

namespace AtomicBlaster
{

    public class GameRoot : AppDelegate 
    {

        public override void Start()
        {
            Art.Load();

            var graphics = AtomicNET.GetSubsystem<Graphics>();
            float width = graphics.Width;
            float height = graphics.Height;

            ScreenSize = new Vector2(width, height);
            ScreenBounds = new IntRect(0, 0, (int)ScreenSize.X, (int)ScreenSize.Y);

            var renderer = AtomicNET.GetSubsystem<Renderer>();
            var viewport = renderer.GetViewport(0);

            renderer.HDRRendering = true;

            var renderpath = viewport.GetRenderPath().Clone();
            renderpath.Append(AtomicNET.Cache.GetResource<XMLFile>("RenderPath/BloomHDR.xml"));
            renderpath.Append(AtomicNET.Cache.GetResource<XMLFile>("RenderPath/Blur.xml"));
            viewport.SetRenderPath(renderpath);

            Scene = new Scene();
            Scene.CreateComponent<Octree>();

            var camera = Scene.CreateChild("Camera").CreateComponent<Camera>();
            camera.Node.Position = new Vector3(width / 2.0f, height / 2.0f, 0.0f);
            camera.Orthographic = true;
            camera.OrthoSize = height;

            viewport.Scene = Scene;
            viewport.Camera = camera;

            CustomRenderer.Initialize();

            ParticleManager = new ParticleManager<ParticleState>(1024 * 20, ParticleState.UpdateParticle);

#if ATOMIC_DESKTOP
            const int maxGridPoints = 1600;
#else
            const int maxGridPoints = 400;
#endif

            float amt = (float)Math.Sqrt(ScreenBounds.Width * ScreenBounds.Height / maxGridPoints);
            Vector2 gridSpacing = new Vector2(amt, amt);
            Grid = new Grid(ScreenBounds, gridSpacing);

            EntityManager.Add(PlayerShip.Instance);

            SubscribeToEvent("Update", HandleUpdate);
            SubscribeToEvent("RenderPathEvent", HandleRenderPathEvent);
        }

        void HandleRenderPathEvent(uint eventType, ScriptVariantMap eventData)
        {

            if (eventData.GetString("name") != "customrender")
                return;

            CustomRenderer.Begin();

            Draw();

            CustomRenderer.End();

        }

        float deltaTime = 0.0f;

        void HandleUpdate(uint eventType, ScriptVariantMap eventData)
        {
            
            float time = eventData.GetFloat("timestep");

            deltaTime += time;

            ElapsedTime += time;// / 2.0f;

            if (deltaTime < 1.0f / 60.0f)
                return;

            deltaTime = 0.0f;

            ShipInput.Update();

            if (!paused)
            {
                PlayerStatus.Update();
                EntityManager.Update();
                EnemySpawner.Update();
                ParticleManager.Update();
                Grid.Update();
            }

        }

        void Draw()
        {
            EntityManager.Draw();
            Grid.Draw();
            ParticleManager.Draw();

        }

        // GodMode by default as the game is really hard :)
        public static bool GodMode = true;

        public static Scene Scene { get; private set; }

        public static float ElapsedTime { get; private set; }

        public static Vector2 ScreenSize { get; private set; }
        public static IntRect ScreenBounds { get; private set; }

        public static Grid Grid { get; private set; }
        public static ParticleManager<ParticleState> ParticleManager { get; private set; }

        bool paused = false;


    }

}