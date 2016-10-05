//
// Copyright (c) 2008-2015 the Urho3D project.
// Copyright (c) 2015 Xamarin Inc
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

using System;
using System.Globalization;
using AtomicEngine;

namespace FeatureExamples
{
    public class Sample : NETScriptObject
    {
        protected const float PixelSize = 0.01f;
        protected const float TouchSensitivity = 2;
        protected float Yaw { get; set; }
        protected float Pitch { get; set; }
        protected bool TouchEnabled { get; set; }
        protected Node CameraNode { get; set; }

        protected Sample() { }

        static readonly Random random = new Random();
        /// Return a random float between 0.0 (inclusive) and 1.0 (exclusive.)
        public static float NextRandom() { return (float)random.NextDouble(); }
        /// Return a random float between 0.0 and range, inclusive from both ends.
        public static float NextRandom(float range) { return (float)random.NextDouble() * range; }
        /// Return a random float between min and max, inclusive from both ends.
        public static float NextRandom(float min, float max) { return (float)((random.NextDouble() * (max - min)) + min); }
        /// Return a random integer between min and max - 1.
        public static int NextRandom(int min, int max) { return random.Next(min, max); }


        public virtual void Start()
        {
            SubscribeToEvent<UpdateEvent>((e) => { Update(e.TimeStep); });

            SubscribeToEvent<KeyDownEvent>(HandleKeyDown);


            
        }

        protected virtual void Update(float timeStep)
        {
            MoveCameraByTouches(timeStep);
        }

        /// <summary>
        /// Move camera for 2D samples
        /// </summary>
        protected void SimpleMoveCamera2D(float timeStep)
        {
            // Movement speed as world units per second
            const float moveSpeed = 4.0f;

            var input = GetSubsystem<Input>();

            // Read WASD keys and move the camera scene node to the corresponding direction if they are pressed
            if (input.GetKeyDown(Constants.KEY_W)) CameraNode.Translate(Vector3.UnitY * moveSpeed * timeStep);
            if (input.GetKeyDown(Constants.KEY_S)) CameraNode.Translate(-Vector3.UnitY * moveSpeed * timeStep);
            if (input.GetKeyDown(Constants.KEY_A)) CameraNode.Translate(-Vector3.UnitX * moveSpeed * timeStep);
            if (input.GetKeyDown(Constants.KEY_D)) CameraNode.Translate(Vector3.UnitX * moveSpeed * timeStep);

            if (input.GetKeyDown(Constants.KEY_PAGEUP))
            {
                Camera camera = CameraNode.GetComponent<Camera>();
                camera.Zoom = camera.Zoom * 1.01f;
            }

            if (input.GetKeyDown(Constants.KEY_PAGEDOWN))
            {
                Camera camera = CameraNode.GetComponent<Camera>();
                camera.Zoom = camera.Zoom * 0.99f;
            }
        }

        /// <summary>
        /// Move camera for 3D samples
        /// </summary>
        protected void SimpleMoveCamera3D(float timeStep, float moveSpeed = 10.0f)
        {
            const float mouseSensitivity = .1f;

            var input = GetSubsystem<Input>();

            var mouseMove = input.MouseMove;
            Yaw += mouseSensitivity * mouseMove.X;
            Pitch += mouseSensitivity * mouseMove.Y;
            Pitch = MathHelper.Clamp(Pitch, -90, 90);

            CameraNode.Rotation = new Quaternion(Pitch, Yaw, 0);

            if (input.GetKeyDown(Constants.KEY_W)) CameraNode.Translate(Vector3.UnitZ * moveSpeed * timeStep);
            if (input.GetKeyDown(Constants.KEY_S)) CameraNode.Translate(-Vector3.UnitZ * moveSpeed * timeStep);
            if (input.GetKeyDown(Constants.KEY_A)) CameraNode.Translate(-Vector3.UnitX * moveSpeed * timeStep);
            if (input.GetKeyDown(Constants.KEY_D)) CameraNode.Translate(Vector3.UnitX * moveSpeed * timeStep);
        }

        protected void MoveCameraByTouches(float timeStep)
        {
            if (!TouchEnabled || CameraNode == null)
                return;

            var input = GetSubsystem<Input>();
            for (uint i = 0, num = input.NumTouches; i < num; ++i)
            {
                var delta = input.GetTouchDelta(i);

                if (delta.X != 0 || delta.Y != 0)
                {
                    var camera = CameraNode.GetComponent<Camera>();

                    if (camera == null)
                        return;

                    var graphics = GetSubsystem<Graphics>();
                    Yaw += TouchSensitivity * camera.Fov / graphics.Height * delta.X;
                    Pitch += TouchSensitivity * camera.Fov / graphics.Height * delta.Y;
                    CameraNode.Rotation = new Quaternion(Pitch, Yaw, 0);
                }
                else
                {
                    //var cursor = UI.Cursor;

                    //if (cursor != null && cursor.Visible)
                    //    cursor.Position = state.Position;
                }
            }
        }

        protected void SimpleCreateInstructionsWithWasd(string extra = "")
        {
            SimpleCreateInstructions("Use WASD keys and mouse/touch to move" + extra);
        }

        protected void SimpleCreateInstructions(string text = "")
        {
        }

        void CreateLogo()
        {
        }

        void SetWindowAndTitleIcon()
        {
        }

        void CreateConsoleAndDebugHud()
        {
        }

        void HandleKeyDown(KeyDownEvent e)
        {
            switch (e.Key)
            {
                case Constants.KEY_ESCAPE:
                    GetSubsystem<Engine>().Exit();
                    return;
                case Constants.KEY_F1:
                    // console.Toggle();
                    return;
                case Constants.KEY_F2:
                    // debugHud.ToggleAll();
                    return;
            }

            var renderer = GetSubsystem<Renderer>();

            switch (e.Key)
            {
                case Constants.KEY_1:
                    var quality = renderer.TextureQuality;
                    ++quality;
                    if (quality > 2)
                        quality = 0;
                    renderer.TextureQuality = quality;
                    break;

                case Constants.KEY_2:
                    var mquality = renderer.MaterialQuality;
                    ++mquality;
                    if (mquality > 2)
                        mquality = 0;
                    renderer.MaterialQuality = mquality;
                    break;

                case Constants.KEY_3:
                    renderer.SpecularLighting = !renderer.SpecularLighting;
                    break;

                case Constants.KEY_4:
                    renderer.DrawShadows = !renderer.DrawShadows;
                    break;

                case Constants.KEY_5:
                    var shadowMapSize = renderer.ShadowMapSize;
                    shadowMapSize *= 2;
                    if (shadowMapSize > 2048)
                        shadowMapSize = 512;
                    renderer.ShadowMapSize = shadowMapSize;
                    break;

                // shadow depth and filtering quality
                case Constants.KEY_6:
                    var q = (int)renderer.ShadowQuality++;
                    if (q > 3)
                        q = 0;
                    renderer.ShadowQuality = (ShadowQuality)q;
                    break;

                // occlusion culling
                case Constants.KEY_7:
                    var o = !(renderer.MaxOccluderTriangles > 0);
                    renderer.MaxOccluderTriangles = o ? 5000 : 0;
                    break;

                // instancing
                case Constants.KEY_8:
                    renderer.DynamicInstancing = !renderer.DynamicInstancing;
                    break;

                case Constants.KEY_9:
                    Image screenshot = new Image();
                    GetSubsystem<Graphics>().TakeScreenShot(screenshot);
                    screenshot.SavePNG(GetSubsystem<FileSystem>().ProgramDir + $"Data/Screenshot_{GetType().Name}_{DateTime.Now.ToString("yyyy-MM-dd-HH-mm-ss", CultureInfo.InvariantCulture)}.png");
                    break;
            }
        }

        void InitTouchInput()
        {
            TouchEnabled = true;
        }
    }
}
