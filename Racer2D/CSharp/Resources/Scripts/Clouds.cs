using System;
using AtomicEngine;

public class Clouds
{
    private int _currentIndex;
    private readonly int _range;
    private readonly int _deviation;
    private readonly int _minY;
    private readonly Node[] _clouds;
    private readonly Random rng = new Random();

    public Clouds(float startX, int minY, int deviation, int amount, int range)
    {
        _minY = minY;
        _deviation = deviation;
        _range = range;

        Sprite2D[] cloudSprites = {
            Cache.Get<Sprite2D>("Scenarios/cloud1.png"),
            Cache.Get<Sprite2D>("Scenarios/cloud2.png"),
            Cache.Get<Sprite2D>("Scenarios/cloud3.png")};

        // We pre-fill the screen with clouds
        float cloudSpacing = range*2/amount;
        _clouds = new Node[amount];
        for (int i = 0; i < amount; i++)
        {
            _clouds[i] = AtomicMain.CreateSpriteNode(cloudSprites[rng.Next(cloudSprites.Length)], 4, false);
            RecycleCloud(startX-=cloudSpacing, _clouds[i]);
        }
    }

    private void RecycleCloud(float currentX, Node cloud)
    {
        // Position cloud at rightmost edge of the range
        cloud.SetPosition(new Vector3(currentX+_range, rng.Next(_deviation) + _minY, 15));
    }

    public void Tick(float dt, float currentX)
    {
        // We lazily check clouds and recycle them
        _currentIndex++;
        Node currentCloud = _clouds[_currentIndex%_clouds.Length];
        if (currentCloud.Position.X < currentX - _range)
        {
            RecycleCloud(currentX, currentCloud);
        }

        // We translate all clouds according to their height
        foreach (Node cloud in _clouds)
        {
            cloud.Translate2D(-Vector2.UnitX*dt*((cloud.Position2D.Y-_minY)*0.3f+1));
        }
    }
}
