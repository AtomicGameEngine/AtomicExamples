using System;
using AtomicEngine;
using AtomicPlayer;

using FeatureExamples;

public class AtomicMain : AppDelegate
{
    public override void Start()
    {
        // AtomicNET.GetSubsystem<Player>().LoadScene("Scenes/Scene.scene");

        sample = new SkeletalAnimationSample();
        sample.Start();
        
    }

    Sample sample;

}
