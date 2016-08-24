using AtomicEngine;
using AtomicPlayer;

public static class AtomicMain
{
    /// <summary>
    /// The main entry point for the application.
    /// </summary>
    static void Main(string[] args)
    {        
        var scene = AtomicNET.GetSubsystem<Player>().LoadScene("Scenes/Scene.scene");
    }

}
