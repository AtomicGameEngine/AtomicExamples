using System;
using AtomicEngine;
using AtomicPlayer;

public class AtomicMain : AppDelegate
{
    public override void Start()
    {
        var scene = GetSubsystem<Player>().LoadScene("Scenes/TheScene.scene");
        var camera = scene.GetChild("Camera").GetComponent<Camera>();
        var graphics = GetSubsystem<Graphics>();
        camera.SetOrthoSize(graphics.Height * Constants.PIXEL_SIZE);
        camera.SetZoom(.75f * Math.Min(graphics.Width / 1280.0f, graphics.Height / 800.0f));

    }

}
