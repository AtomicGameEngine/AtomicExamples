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

            Scene = AtomicNET.GetSubsystem<Player>().LoadScene("Scenes/Scene.scene");

            CustomRenderer.Initialize();

        }

        void HandleUpdate(uint eventType, ScriptVariantMap eventData)
        {
            float time = eventData.GetFloat("timestep");
            ElapsedTime += time;

            // Input.Update();

            if (!paused)
            {
                PlayerStatus.Update();
                EntityManager.Update();
                EnemySpawner.Update();
                ParticleManager.Update();
                Grid.Update();
            }

            Draw();

        }

        void Draw()
        {
            EntityManager.Draw();

            Grid.Draw();
            ParticleManager.Draw();

        }


    }

}