
using System;
using System.Linq;
using AtomicEngine;


namespace FeatureExamples
{

    class SampleSelector : NETScriptObject
    {
        public static UIView UIView;

        public static Sample sampleRef = null;

        public SampleSelector()
        {
            sampleRef = null;            

            var rootLayout = new UILayout();
            rootLayout.Axis = UI_AXIS.UI_AXIS_Y;
            rootLayout.Rect = UIView.Rect;
            UIView.AddChild(rootLayout);

            SubscribeToEvent<KeyDownEvent>(e =>
            {
                if (e.Key == Constants.KEY_ESCAPE)
                    GetSubsystem<Engine>().Exit();
            });

#if ATOMIC_DESKTOP || ATOMIC_MOBILE
            var sampleTypes = typeof(Sample).Assembly.GetTypes().Where(t => t.IsSubclassOf(typeof(Sample)) && t != typeof(Sample) ).ToArray();
            foreach (var sample in sampleTypes)
            {
                var button = new UIButton();
                button.Text = sample.Name;

                button.SubscribeToEvent<WidgetEvent>( button,  e => 
                {
                    // We're only interested in clicks
                    if (e.Type != UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK)
                        return;

                    // set the event as handled, as the UI is about to go away
                    e.Handled = true;
               
                    // Goodbye UI
                    UIView.RemoveChild(rootLayout);
                    
                    sampleRef = (Sample) Activator.CreateInstance(sample);
                    sampleRef.Start();

                    UnsubscribeFromEvent<KeyDownEvent>();


                });


                rootLayout.AddChild(button);
                   
            }
#endif

        }

    }

}