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
using System.Linq;
using AtomicEngine;

namespace FeatureExamples
{
	public class SoundEffectsSample : Sample
	{
		readonly Dictionary<string, string> sounds = new Dictionary<string, string>
			{
				{"Fist",      "Sounds/PlayerFistHit.wav"},
				{"Explosion", "Sounds/BigExplosion.wav"},
				{"Power-up",  "Sounds/Powerup.wav"},
			};

		public SoundEffectsSample() : base() { }

        public override void Start()
        {
			base.Start();			
			CreateUI();
		}

		void CreateUI()
		{
			var cache = GetSubsystem<ResourceCache>();

            var layout = new UILayout() { Axis = UI_AXIS.UI_AXIS_Y };
            layout.Rect = UIView.Rect;
            UIView.AddChild(layout); 

            // Create a scene which will not be actually rendered, but is used to hold SoundSource components while they play sounds
            scene = new Scene();

			// Create buttons for playing back sounds
			foreach (var item in sounds)
			{
                var button = new UIButton();
                layout.AddChild(button);
                button.Text = item.Key; 

				button.SubscribeToEvent<WidgetEvent>(button, e => {

                    if (e.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK)
                    {
                        // Get the sound resource
                        Sound sound = cache.Get<Sound>(item.Value);
                        if (sound != null)
                        {
                            // Create a scene node with a SoundSource component for playing the sound. The SoundSource component plays
                            // non-positional audio, so its 3D position in the scene does not matter. For positional sounds the
                            // SoundSource3D component would be used instead
                            Node soundNode = scene.CreateChild("Sound");
                            SoundSource soundSource = soundNode.CreateComponent<SoundSource>();
                            soundSource.Play(sound);
                            // In case we also play music, set the sound volume below maximum so that we don't clip the output
                            soundSource.Gain = 0.75f;
                            // Set the sound component to automatically remove its scene node from the scene when the sound is done playing
                        }
                    }

                });
			}

            // Create buttons for playing/stopping music
            var playMusicButton = new UIButton();
            layout.AddChild(playMusicButton);
            playMusicButton.Text = "Play Music";
			playMusicButton.SubscribeToEvent<WidgetEvent> (playMusicButton, e => {

                if (e.Type != UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK)
                    return;

				if (scene.GetChild ("Music", false) != null)
					return;

				var music = cache.Get<Sound>("Music/StoryTime.ogg");
				music.Looped = true;
				Node musicNode = scene.CreateChild ("Music");
				SoundSource musicSource = musicNode.CreateComponent<SoundSource> ();
				// Set the sound type to music so that master volume control works correctly
				musicSource.SetSoundType ("Music");
				musicSource.Play (music);
			});

            var audio = GetSubsystem<Audio>();

            // FIXME: Removing the music node is not stopping music
			var stopMusicButton = new UIButton();
            layout.AddChild(stopMusicButton);
            stopMusicButton.Text = "Stop Music";
            stopMusicButton.SubscribeToEvent<WidgetEvent>(stopMusicButton, e =>
            {
                if (e.Type != UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK)
                    return;

                scene.RemoveChild(scene.GetChild("Music", false));
            });

            // Effect Volume Slider
            var slider = new UISlider();
            layout.AddChild(slider);
            slider.SetLimits(0, 1);
            slider.Text = "Sound Volume";

            slider.SubscribeToEvent<WidgetEvent>(slider, e =>
            {
                if (e.Type != UI_EVENT_TYPE.UI_EVENT_TYPE_CHANGED)
                    return;

                Log.Info($"Setting Effects to {slider.Value}");
                audio.SetMasterGain("Effect", slider.Value);
            });

            // Music Volume Slider
            var slider2 = new UISlider();
            layout.AddChild(slider2);
            slider2.SetLimits(0, 1);
            slider2.Text = "Music Volume";

            slider2.SubscribeToEvent<WidgetEvent>(slider2, e =>
            {
                if (e.Type != UI_EVENT_TYPE.UI_EVENT_TYPE_CHANGED)
                    return;

                Log.Info($"Setting Music to {slider2.Value}");
                audio.SetMasterGain("Music", slider2.Value);
            });
        }

    }
}
