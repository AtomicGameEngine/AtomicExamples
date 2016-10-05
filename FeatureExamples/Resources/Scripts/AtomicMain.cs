using System;
using AtomicEngine;
using AtomicPlayer;

using FeatureExamples;

public class AtomicMain : AppDelegate
{
    public override void Start()
    {
        // AtomicNET.GetSubsystem<Player>().LoadScene("Scenes/Scene.scene");

        sample = new AnimatingScene();
        sample.Start();
        
    }

    Sample sample;

}
