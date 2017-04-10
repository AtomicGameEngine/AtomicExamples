using System;
using AtomicEngine;
using AtomicPlayer;

using FeatureExamples;

public class AtomicMain : AppDelegate
{
    public override void Start()
    {

        var metricsEnabled = false;

        if (metricsEnabled)
        {
            var ui = GetSubsystem<UI>();

            // set up the DebugHud to show metrics and update at 10hz
            ui.SetDebugHudProfileMode(DebugHudProfileMode.DEBUG_HUD_PROFILE_METRICS);
            ui.ShowDebugHud(true);
            GetSubsystem<Metrics>().Enable();
        }

        SampleSelector.UIView = new UIView();
        new SampleSelector();
    }

}
