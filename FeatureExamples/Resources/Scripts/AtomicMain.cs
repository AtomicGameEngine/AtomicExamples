using System;
using AtomicEngine;
using AtomicPlayer;

using FeatureExamples;

public class AtomicMain : AppDelegate
{
    public override void Start()
    {
        sample = new RagdollSample();
        sample.Start();
        
    }

    Sample sample;

}
