using System;
using AtomicEngine;


class FloatRandom : Random
{
    public float Random() { return (float)NextDouble(); }
}

public class Butterfly : CSComponent
{

    float speed;
    float direction;
    float desiredDirection;
    float rotationSpeed = 10.0f;
    float time = 0.0f;

    Vector2 pos;
    AnimatedSprite2D sprite;

    public void Start()
    {

        if (halfWidth == 0.0f)
        {
            random = new FloatRandom();

            var graphics = AtomicNET.GetSubsystem<Graphics>();
            halfWidth = graphics.Width * Constants.PIXEL_SIZE * 0.5f;
            halfHeight = graphics.Height * Constants.PIXEL_SIZE * 0.5f;

            var cache = GetSubsystem<ResourceCache>();
            animationSet = cache.GetResource<AnimationSet2D>("Sprites/butterfly.scml");
        }

        speed = 1 + 2.0f * random.Random();
        direction = random.Random() * (float)Math.PI * 2.0f;

        pos = Node.Position2D;

        sprite = (AnimatedSprite2D)Node.CreateComponent("AnimatedSprite2D");
        sprite.Speed = .1f + random.Random() * 2.0f;
        sprite.AnimationSet = animationSet;
        sprite.SetAnimation("idle");
        sprite.Color = new Color(.1f + random.Random() * .9f, .1f + random.Random() * .9f, .1f + random.Random() * .9f, 1);
        sprite.BlendMode = BlendMode.BLEND_ALPHA;
    }

    void Update(float timeStep)
    {
        time += timeStep;

        if (time % 1000 / 1000 < 0.5f)
            desiredDirection = random.Random() * (float)Math.PI * 2;

        direction = circWrapTo(direction, desiredDirection, rotationSpeed * timeStep);
        pos.X += (float)Math.Cos(direction) * speed * timeStep;
        pos.Y += (float)Math.Sin(direction) * speed * timeStep;
        Node.Position2D = pos;
        Node.Rotation2D = (direction + (float)Math.PI * 3 / 2) * (180 / (float)Math.PI);

        //check if our butterfly is out of bounds
        if (pos.X < -halfWidth || pos.Y < -halfHeight || pos.X > halfWidth || pos.Y > halfHeight)
        {
            // TODO: We need to remove the component first, then the Node
            // The component removal removes the component from the scene Update
            // Which at the time of writing this comment, Node.Remove is not
            var node = Node;
            Remove();
            node.Remove();
        }

    }

    float circWrapTo(float value, float target, float step)
    {
        if (value == target)
            return target;

        var max = (float)Math.PI * 2;

        var result = value;

        var d = wrappedDistance(value, target, max);

        if (Math.Abs(d) < step)
            return target;

        result += (d < 0 ? -1 : 1) * step;

        if (result > max)
            result = result - max;
        else if (result < 0)
            result = max + result;

        return result;
    }

    float wrappedDistance(float a, float b, float max)
    {
        if (a == b) return 0;

        float l;
        float r;

        if (a < b)
        {
            l = -a - max + b;
            r = b - a;
        }
        else
        {
            l = b - a;
            r = max - a + b;
        }
        if (Math.Abs(l) > Math.Abs(r))
            return r;
        else
            return l;
    }


    static FloatRandom random;
    static float halfWidth = 0.0f;
    static float halfHeight = 0.0f;
    static AnimationSet2D animationSet;

}
