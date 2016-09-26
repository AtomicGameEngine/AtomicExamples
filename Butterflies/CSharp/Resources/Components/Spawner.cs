using System;
using AtomicEngine;

public class Spawner : CSComponent
{

    void Start()
    {
        viewport = AtomicNET.GetSubsystem<Renderer>().GetViewport(0);
    }

    void Update(float timeStep)
    {

        var input = AtomicNET.GetSubsystem<Input>();

        if (input.GetMouseButtonDown(Constants.MOUSEB_LEFT))
        {
            var mousePos = input.GetMousePosition();

            for (var i = 0; i < 10; i++)
                createButterflyNode(new Vector2(mousePos.X, mousePos.Y));
        }        

    }

    void createButterflyNode(Vector2 pos)
    {
        //project mouse screen position to the world position
        var screenPos = viewport.ScreenToWorldPoint((int) pos.X, (int) pos.Y, 0);

        //create butterfly node
        var node = Scene.CreateChild("Butterfly");

        node.Position2D = new Vector2(screenPos.X, screenPos.Y);

        var butterfly = node.CreateComponent<Butterfly>();

    }

    Viewport viewport;


}
