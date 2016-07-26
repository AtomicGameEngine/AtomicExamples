using System;
using AtomicEngine;

public class PhysicsSpawner : CSComponent
{
    public void Start()
    {

        viewport = AtomicNET.GetSubsystem<Renderer>().GetViewport(0);

        boxSprite = AtomicNET.Cache.GetResource<Sprite2D>("Sprites/Box.png");
        ballSprite = AtomicNET.Cache.GetResource<Sprite2D>("Sprites/Ball.png");

        var ground = Scene.CreateChild("Ground");

        ground.Position = new Vector3(0.0f, -5.0f, 0.0f);
        ground.Scale = new Vector3(200.0f, 1.0f, 0.0f);

        ground.CreateComponent<RigidBody2D>();
        ground.CreateComponent<StaticSprite2D>().Sprite = boxSprite;

        // Create box collider for ground
        var groundShape = ground.CreateComponent<CollisionBox2D>();
        // Set box size
        groundShape.Size = new Vector2(0.32f, 0.32f);
        // Set friction
        groundShape.Friction = 0.5f; 

    }


    void Update(float timeStep)
    {
        if (spawnDelta > 0)
        {
            spawnDelta -= timeStep;
            return;
        }

        var input = AtomicNET.GetSubsystem<Input>();

        if (input.GetMouseButtonDown(Constants.MOUSEB_LEFT))
        {
            var mousePos = input.GetMousePosition();

            var screenPos = viewport.ScreenToWorldPoint(mousePos.X, mousePos.Y, 0);

            if ((lastSpawn - screenPos).Length < 0.35)
                return;

            lastSpawn = screenPos;
            spawnDelta = .025f;

            var node = Scene.CreateChild("RigidBody");

            node.SetPosition(new Vector3(screenPos.X, screenPos.Y, 0.0f));

            // Create rigid body
            var body = node.CreateComponent<RigidBody2D>();

            body.BodyType = BodyType2D.BT_DYNAMIC;

            var staticSprite = node.CreateComponent<StaticSprite2D>();

            if (spawnCount % 2 == 0)
            {
                staticSprite.Sprite = boxSprite;

                // Create box
                var box = node.CreateComponent<CollisionBox2D>();
                // Set size
                box.Size = new Vector2(0.32f, 0.32f);
                // Set density
                box.Density = 1.0f;
                // Set friction
                box.Friction = 0.5f;
                // Set restitution
                box.Restitution = 0.1f;
            }
            else
            {
                staticSprite.Sprite = ballSprite;

                // Create circle
                var circle = node.CreateComponent<CollisionCircle2D>();
                // Set radius
                circle.Radius = 0.16f;
                // Set density
                circle.Density = 1.0f;
                // Set friction.
                circle.Friction = 0.5f;
                // Set restitution
                circle.Restitution = 0.1f;
            }

            spawnCount++;

        }

    }

    float Random()
    {
        return (float)random.NextDouble();
    }

    Sprite2D boxSprite;
    Sprite2D ballSprite;
    Viewport viewport;

    float spawnDelta = 0;
    Vector3 lastSpawn = new Vector3(1000, 1000, 0);

    Random random = new Random();
    uint spawnCount = 0;

}


