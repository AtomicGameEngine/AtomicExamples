//---------------------------------------------------------------------------------
// Ported to the Atomic Game Engine
// Originally written for XNA by Michael Hoffman
// Find the full tutorial at: http://gamedev.tutsplus.com/series/vector-shooter-xna/
//----------------------------------------------------------------------------------

using System;
using System.IO;
using AtomicEngine;

namespace AtomicBlaster
{
    static class ShipInput
    {
        private static bool isAimingWithMouse = false;
        static IntVector2 lastTouchPos = IntVector2.Zero;

        public static void Update()
        {
            isAimingWithMouse = true;
        }
    
        public static Vector2 GetMovementDirection()
        {

            var input = AtomicNET.GetSubsystem<Input>();

            Vector2 direction = new Vector2(0, 0);

#if ATOMIC_DESKTOP
            if (input.GetKeyDown((int) SDL.SDL_Keycode.SDLK_a))
                direction.X -= 1;
            if (input.GetKeyDown((int)SDL.SDL_Keycode.SDLK_d))
                direction.X += 1;
            if (input.GetKeyDown((int)SDL.SDL_Keycode.SDLK_s))
                direction.Y -= 1;
            if (input.GetKeyDown((int)SDL.SDL_Keycode.SDLK_w))
                direction.Y += 1;
#endif      

#if ATOMIC_MOBILE

            var touchPos = lastTouchPos;

            if (input.NumTouches == 1)
            {
                touchPos = input.GetTouchPosition(0);
                lastTouchPos = touchPos;

            }

            if (touchPos != IntVector2.Zero)
            {
                direction = new Vector2((float)touchPos.X, (float)touchPos.Y);
            }


            Vector2 shipPos = PlayerShip.Instance.Position;

            shipPos.Y = GameRoot.ScreenBounds.Height - shipPos.Y;

            direction -= shipPos;

            direction.Y = -direction.Y;

            if (touchPos == IntVector2.Zero || direction.Length < 4.0f)
                direction = Vector2.Zero;

#endif

#if ATOMIC_IOS
            uint numJoySticks = 0;
#else
            uint numJoySticks = input.GetNumJoysticks();
#endif

            if (numJoySticks > 0)
            {
                var state = input.GetJoystickByIndex(0);

                float x = state.GetAxisPosition(0);
                float y = state.GetAxisPosition(1);

                if (x < -0.15f)
                    direction.X = x;
                if (x > 0.15f)
                    direction.X = x;

                if (y < -0.15f)
                    direction.Y = -y;
                if (y > 0.15f)
                    direction.Y = -y;

            }

            // Clamp the length of the vector to a maximum of 1.
            if (direction.LengthSquared > 1)
                direction.Normalize();

            return direction;
        }

        public static Vector2 GetAimDirection()
        {
            return GetMouseAimDirection();
        }

        private static Vector2 GetMouseAimDirection()
        {
            var input = AtomicNET.GetSubsystem<Input>();

            Vector2 direction = new Vector2();

#if ATOMIC_DESKTOP
            direction = new Vector2((float)input.GetMousePosition().X, (float)input.GetMousePosition().Y);            

#endif

#if ATOMIC_IOS
            uint numJoySticks = 0;
#else
            uint numJoySticks = input.GetNumJoysticks();
#endif

            if (numJoySticks > 0)
            {
                Vector2 dir = new Vector2(0, 0);

                var state = input.GetJoystickByIndex(0);

                float x = state.GetAxisPosition(0);
                float y = state.GetAxisPosition(1);

                if (x < -0.15f)
                    dir.X = x;
                if (x > 0.15f)
                    dir.X = x;

                if (y < -0.15f)
                    dir.Y = -y;
                if (y > 0.15f)
                    dir.Y = -y;

                // Clamp the length of the vector to a maximum of 1.
                if (dir.LengthSquared > 1)
                    dir.Normalize();

                return dir;

            }

#if !ATOMIC_MOBILE
                direction = new Vector2((float)input.GetMousePosition().X, (float)input.GetMousePosition().Y);
#else
            {
                direction = PlayerShip.Instance.Velocity;
                return Vector2.Normalize(direction);
            }
#endif

            Vector2 shipPos = PlayerShip.Instance.Position;

            shipPos.Y = GameRoot.ScreenBounds.Height - shipPos.Y;          

            direction -= shipPos;

            direction.Y = -direction.Y;
           
            if (direction == Vector2.Zero)
                return Vector2.Zero;
            else
                return Vector2.Normalize(direction);
        }

        public static bool WasBombButtonPressed()
        {
            var input = AtomicNET.GetSubsystem<Input>();
            return input.GetKeyPress((int)SDL.SDL_Keycode.SDLK_SPACE);
        }
    }

}