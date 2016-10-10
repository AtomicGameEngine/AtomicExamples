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
    // TODO: Show drag and drop example

	public class HelloGUISample : Sample
	{

        UIWindow window;

		public HelloGUISample() : base() { }

        public override void Start()
        {
			base.Start();

			// Initialize Window
			InitWindow();

		}

		void InitWindow()
		{

            var layout = new UILayout();
            layout.Axis = UI_AXIS.UI_AXIS_Y;

            var checkBox = new UICheckBox();
            checkBox.Id = "Checkbox";

            layout.AddChild(checkBox);

            var button = new UIButton();
            button.Text = "Button";
            button.Id = "Button";

            layout.AddChild(button);

            var edit = new UIEditField();
            layout.AddChild(edit);
            edit.Id = "EditField";

            window = new UIWindow();
            window.Settings = UI_WINDOW_SETTINGS.UI_WINDOW_SETTINGS_TITLEBAR | UI_WINDOW_SETTINGS.UI_WINDOW_SETTINGS_CLOSE_BUTTON;

            window.Text = "Hello Atomic GUI!";

            window.AddChild(layout);

            window.ResizeToFitContent();

            UIView.AddChild(window);
            window.Center();

            SubscribeToEvent<WidgetEvent>(window, e =>
            {
                if (e.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK)
                {
                    var target = e.Target;
                    if (target != null)
                    {
                        window.Text = $"Hello: {target.Id}";
                    }
                    
                }                

            });

            SubscribeToEvent<WidgetDeletedEvent>(window, e =>
            {
                BackToSelector();
            });

        }
		
	}
}
