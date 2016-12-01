using System.Collections.Generic;
using AtomicEngine;

internal static class Cache
{
    private static readonly ResourceCache _cache = AtomicNET.GetSubsystem<ResourceCache>();

    public static T Get<T>(string path) where T : Resource
    {
        return _cache.Get<T>(path);
    }
}

public class AtomicMain : AppDelegate
{
    private static Scene _scene;
    private static Terrain _terrain;

    private Viewport _viewport;
    private Camera _camera;
    private Vehicle _vehicle;
    private Clouds _clouds;

    public override void Start()
    {
        // We setup our scene, main camera and viewport
        _viewport = GetSubsystem<Renderer>().GetViewport(0);
        _scene = new Scene();
        _scene.CreateComponent<Octree>().SetSize(new BoundingBox(1,100), 3);
        _viewport.Scene = _scene;
        _camera = _scene.CreateChild("Camera").CreateComponent<Camera>();
        _camera.Node.Position = new Vector3(50, 10, -1);
        _camera.Orthographic = true;
        _camera.OrthoSize = 26;
        _viewport.Camera = _camera;

        // We create a sound source for the music and the music
        SoundSource musicSource = _scene.CreateComponent<SoundSource>();
        Sound music = Cache.Get<Sound>("Music/Happy_Bee.ogg");
        music.SetLooped(true);
        musicSource.Play(music);
        musicSource.SetSoundType("Music");

        // We don't need a sound listener for the above, but we add one for the sounds and adjust the music gain
        Audio audioSystem = GetSubsystem<Audio>();
        audioSystem.SetListener(_camera.Node.CreateComponent<SoundListener>());
        audioSystem.SetMasterGain("Music", 0.3f);

        // We create a background node which is a child of the camera so it won't move relative to it
        Node bg = _camera.Node.CreateChild("Background");
        StaticSprite2D bgspr = bg.CreateComponent<StaticSprite2D>();
        bgspr.SetSprite(Cache.Get<Sprite2D>("Scenarios/grasslands/BG.png"));
        bg.SetPosition(new Vector3(0,0,100));
        bg.SetScale2D(Vector2.One*5.2f);
        
        // We add a physics world so we can simulate physics, and enable CCD
        PhysicsWorld2D pw = _scene.CreateComponent<PhysicsWorld2D>();
        pw.SetContinuousPhysics(true);

        // We create a terrain, vehicle and cloud system
        _terrain = new Terrain(_scene);
        _vehicle = CreateVehicle(new Vector2(50,10));
        _clouds = new Clouds(50, 5, 40, 16, 40);

        // We subscribe to the PostUpdateEvent
        SubscribeToEvent<PostUpdateEvent>(PostUpdate);
        
        // If we're building a debug release, we draw debug data
        #if DEBUG
        DebugRenderer dbr = _scene.CreateComponent<DebugRenderer>();
        pw.SetDrawCenterOfMass(true); pw.SetDrawJoint(true); pw.SetDrawPair(true); pw.SetDrawShape(true);
        SubscribeToEvent<PostRenderUpdateEvent>(e => {_scene.GetComponent<PhysicsWorld2D>().DrawDebugGeometry(dbr,false);});
        #endif
    }

    // This function is called after all nodes positions were updated for the current frame (UpdateEvent)
    void PostUpdate(PostUpdateEvent eventData)
    {
        // We lerp the camera so it follows the vehicle smoothly
        _camera.Node.SetPosition(
            new Vector3(LerpVector2(_camera.Node.Position2D, _vehicle.Node.Position2D+Vector2.UnitX*10, 5*eventData.TimeStep)) + 
            Vector3.Back*10);
        // We tick the cloud system
        _clouds.Tick(eventData.TimeStep, _vehicle.Node.Position.X);
    }

    #region Static Utils

    // Convenience function to create node with sprite and rigidbody (optional)
    static Vehicle CreateVehicle(Vector2 position)
    {
        Node vehicleNode = CreateSpriteNode(Cache.Get<Sprite2D>("Characters/truck/vehicle.png"), 1.4f);

        // We create the vehicle and the chassis (CreateChassis returns the Vehicle for convenience)
        Vehicle vehicle = vehicleNode.CreateComponent<Vehicle>().CreateChassis(
            new Vector2(-0.1f, 0.4f), 1.4f, 5,
            new Vector3(-2f, -1, 1), Cache.Get<ParticleEffect2D>("Particles/smoke.pex"),
            Cache.Get<Sound>("Sounds/engine_sound_crop.wav"), Cache.Get<Sound>("Sounds/tires_squal_loop.wav"),
            new [] {Cache.Get<Sound>("Sounds/susp_1.wav"), Cache.Get<Sound>("Sounds/susp_3.wav")},
            300, 50, 5, 500);

        // We create the wheels
        Sprite2D wspr = Cache.Get<Sprite2D>("Characters/truck/wheel.png");
        Node w1 = vehicle.CreateWheel(
            wspr, new Vector2(1.5f,-1.5f), 1.25f, 4, 0.4f, Cache.Get<ParticleEffect2D>("Particles/dust.pex"), 2.6f);
        Node w2 = vehicle.CreateWheel(
            wspr, new Vector2(-1.8f,-1.5f), 1.25f, 4, 0.4f, Cache.Get<ParticleEffect2D>("Particles/dust.pex"), 2.6f);

        // We create the head
        Node head = vehicle.CreateHead(
            Cache.Get<Sprite2D>("Characters/truck/head.png"), new Vector3(-1,2.7f,-1), 1f, new Vector2(-1,1.8f));

        // We position the vehicle
        foreach (Node node in new []{vehicleNode, w1, w2, head})
            node.Translate2D(position);

        return vehicle;
    }

    // Create a node with a sprite and optionally set scale and add a RigidBody2D component
    public static Node CreateSpriteNode(Sprite2D sprite, Node parent, float scale = 1f, bool addRigidBody = true)
    {
        Node n = parent.CreateChild();
        n.SetScale2D(Vector2.One*scale);
        n.CreateComponent<StaticSprite2D>().SetSprite(sprite);
        if (addRigidBody) n.CreateComponent<RigidBody2D>().SetBodyType(BodyType2D.BT_DYNAMIC);
        return n;
    }

    // Convenience overload
    public static Node CreateSpriteNode(Sprite2D sprite, float scale = 1f, bool addRigidBody = true)
    {
        return CreateSpriteNode(sprite, _scene, scale, addRigidBody);
    }

    // Convenience function to add a collider to a given node
    public static T AddCollider<T>(Node node, float fric = 1, float dens = 1, float elas = 0) where T: CollisionShape2D
    {
        CollisionShape2D s = node.CreateComponent<T>();
        s.SetFriction(fric);
        s.SetDensity(dens);
        s.SetRestitution(elas);
        return (T)s;
    }

    // This returns the surface point closest to wheel's center
    public static Vector3 GetSurfacePointClosestToPoint(Node wheel)
    {
        // We sample various points near the wheel position
        List<Vector2> points = new List<Vector2>();
        for (float xOffset = -1; xOffset < 1; xOffset+=0.02f)
        {
            float y = _terrain.SampleSurface(wheel.Position.X + xOffset);
            points.Add(new Vector2(wheel.Position.X + xOffset, y));
        }

        // We get the closest one
        float lastDist = float.MaxValue;
        Vector2 closestPoint = Vector2.Zero;
        foreach (Vector2 point in points)
        {
            float pointDist = Vector2.Distance(wheel.Position2D, point);
            if (pointDist < lastDist)
            {
                closestPoint = point;
                lastDist = pointDist;
            }
        }

        return new Vector3(closestPoint.X, closestPoint.Y, 2);
    }

    public static Vector2 LerpVector2(Vector2 vecA, Vector2 vecB, float t)
    {
        Vector2 ipo;
        ipo.X = vecA.X + t * (vecB.X - vecA.X);
        ipo.Y = vecA.Y + t * (vecB.Y - vecA.Y);
        return ipo;
    }

    #endregion
}
