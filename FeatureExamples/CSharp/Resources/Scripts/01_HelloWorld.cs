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

using AtomicEngine;

namespace FeatureExamples
{
    public class HelloWorldSample : Sample
    {
        public HelloWorldSample() : base() { }

        public override void Start()
        {
            var cache = GetSubsystem<ResourceCache>();
            var graphics = GetSubsystem<Graphics>();
            var ui = GetSubsystem<UI>();


            graphics.SetWindowIcon(cache.Get<Image>("Textures/UrhoIcon.png"));
            graphics.WindowTitle = "Atomic Game Engine Feature Example";

            // Subscribe to Esc key:
            SubscribeToEvent<KeyDownEvent>(e => { if (e.Key == Constants.KEY_ESCAPE) BackToSelector(); });

            // Say Hello

            var layout = new UILayout();
            layout.Rect = UIView.Rect;

            layout.LayoutPosition = UI_LAYOUT_POSITION.UI_LAYOUT_POSITION_CENTER;
            layout.LayoutDistributionPosition = UI_LAYOUT_DISTRIBUTION_POSITION.UI_LAYOUT_DISTRIBUTION_POSITION_CENTER;

            var fontDesc = new UIFontDescription();
            fontDesc.Id = "Vera";
            fontDesc.Size = 24;

            var label = new UITextField();
            label.FontDescription = fontDesc;
            label.Text = "Hello World, from the Atomic Game Engine";
            layout.AddChild(label);

            UIView.AddChild(layout);

        }
    }
}