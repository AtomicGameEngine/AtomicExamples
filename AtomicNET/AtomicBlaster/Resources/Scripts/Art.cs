//---------------------------------------------------------------------------------
// Ported to the Atomic Game Engine
// Originally written for XNA by Michael Hoffman
// Find the full tutorial at: http://gamedev.tutsplus.com/series/vector-shooter-xna/
//----------------------------------------------------------------------------------

using AtomicEngine;

namespace AtomicBlaster
{
    static class Art
    {
        public static Texture2D Player { get; private set; }
        public static Texture2D Seeker { get; private set; }
        public static Texture2D Wanderer { get; private set; }
        public static Texture2D Bullet { get; private set; }
        public static Texture2D Pointer { get; private set; }
        public static Texture2D BlackHole { get; private set; }

        public static Texture2D LineParticle { get; private set; }
        public static Texture2D Glow { get; private set; }
        public static Texture2D Pixel { get; private set; }     // a single white pixel


        public static void Load()
        {
            var cache = AtomicNET.Cache;

            Player = cache.GetResource<Texture2D>("Sprites/Player.png");
            Seeker = cache.GetResource<Texture2D>("Sprites/Seeker.png");
            Wanderer = cache.GetResource<Texture2D>("Sprites/Wanderer.png");
            Bullet = cache.GetResource<Texture2D>("Sprites/Bullet.png");
            Pointer = cache.GetResource<Texture2D>("Sprites/Pointer.png");
            BlackHole = cache.GetResource<Texture2D>("Sprites/BlackHole.png");

            LineParticle = cache.GetResource<Texture2D>("Sprites/Laser.png");
            Glow = cache.GetResource<Texture2D>("Sprites/Glow.png");
            Pixel = cache.GetResource<Texture2D>("Sprites/Pixel.png");

        }
    }
}
