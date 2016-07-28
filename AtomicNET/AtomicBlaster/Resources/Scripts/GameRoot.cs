//---------------------------------------------------------------------------------
// Written by Michael Hoffman
// Find the full tutorial at: http://gamedev.tutsplus.com/series/vector-shooter-xna/
//----------------------------------------------------------------------------------

using System;
using AtomicEngine;
using AtomicPlayer;

namespace AtomicBlaster
{

    class GameRoot : NETScriptObject
    {
        public static Scene Scene { get; private set; }

        public static float ElapsedTime { get; private set; }

        public static Vector2 ScreenSize { get; private set; }
        public static IntRect ScreenBounds { get; private set; }

        public static Grid Grid { get; private set; }
        public static ParticleManager<ParticleState> ParticleManager { get; private set; }

        bool paused = false;

        public GameRoot()
        {
            Art.Load();

            var graphics = AtomicNET.GetSubsystem<Graphics>();

            ScreenSize = new Vector2(graphics.Width, graphics.Height);

            ScreenBounds = new IntRect(0, 0, (int)ScreenSize.X, (int)ScreenSize.Y);

            ParticleManager = new ParticleManager<ParticleState>(1024 * 20, ParticleState.UpdateParticle);

            const int maxGridPoints = 1600;
            float amt = (float)Math.Sqrt(ScreenBounds.Width * ScreenBounds.Height / maxGridPoints);
            Vector2 gridSpacing = new Vector2(amt, amt);
            Grid = new Grid(ScreenBounds, gridSpacing);

            EntityManager.Add(PlayerShip.Instance);

            SubscribeToEvent("Update", HandleUpdate);

            SubscribeToEvent("RenderPathEvent", HandleRenderPathEvent);

            Scene = AtomicNET.GetSubsystem<Player>().LoadScene("Scenes/Scene.scene");

            var renderer = AtomicNET.GetSubsystem<Renderer>();
            var viewport = renderer.GetViewport(0);

            renderer.HDRRendering = true;

            var renderpath = viewport.GetRenderPath().Clone();
            renderpath.Append(AtomicNET.Cache.GetResource<XMLFile>("RenderPath/BloomHDR.xml"));
            renderpath.Append(AtomicNET.Cache.GetResource<XMLFile>("RenderPath/Blur.xml"));
            viewport.SetRenderPath(renderpath);

            CustomRenderer.Initialize();

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


    }

}