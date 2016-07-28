using System;
using AtomicEngine;

namespace AtomicBlaster
{
    static class ShipInput
    {
        private static bool isAimingWithMouse = false;

        public static void Update()
        {
            isAimingWithMouse = true;
        }
    
        public static Vector2 GetMovementDirection()
        {

            var input = AtomicNET.GetSubsystem<Input>();

            Vector2 direction = new Vector2(0, 0);

            if (input.GetKeyDown((int) SDL.SDL_Keycode.SDLK_a))
                direction.X -= 1;
            if (input.GetKeyDown((int)SDL.SDL_Keycode.SDLK_d))
                direction.X += 1;
            if (input.GetKeyDown((int)SDL.SDL_Keycode.SDLK_s))
                direction.Y -= 1;
            if (input.GetKeyDown((int)SDL.SDL_Keycode.SDLK_w))
                direction.Y += 1;

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

            Vector2 direction = new Vector2((float)input.GetMousePosition().X, (float)input.GetMousePosition().Y);            

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