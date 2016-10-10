using AtomicEngine;
using AtomicPlayer;

public class AtomicMain : AppDelegate
{
    public override void Start()
    {
        var scene = GetSubsystem<Player>().LoadScene("Scenes/TheScene.scene");
        var camera = scene.GetChild("Camera").GetComponent<Camera>();
        var graphics = GetSubsystem<Graphics>();
        camera.SetOrthoSize(graphics.Height * .7f * Constants.PIXEL_SIZE);
    }

}
