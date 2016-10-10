using System;
using AtomicEngine;
using AtomicPlayer;

using FeatureExamples;

public class AtomicMain : AppDelegate
{
    public override void Start()
    {
        SampleSelector.UIView = new UIView();
        new SampleSelector();        
    }

}
