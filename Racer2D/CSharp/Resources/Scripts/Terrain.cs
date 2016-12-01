using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtomicEngine;
using OpenSimplex;

public class Terrain
{
    private readonly Scene _scene;
    private readonly Material _surfaceMaterial;
    private readonly Material _chunkMaterial;
    private readonly DecorationLibrary<Sprite2D> _decorationLib;
    private readonly List<CollisionChain2D> _chunks = new List<CollisionChain2D>();

    // Generator configuration
    private const int Chunksize = 20;
    private const int Chunkheight = -100;
    private int chunksToGenerate = 200;
    private const float NoiseScaleX = .05f;
    private const float NoiseScaleY = 6;
    private const int SurfaceRepeatPerChunk = 6;
    private const float SurfaceSegmentSize = 0.5f;
    private const int PercentageOfChunksWithCrates = 4;

    // Generation working variables
    private OpenSimplexNoise _noise = new OpenSimplexNoise();
    private Random _rng = new Random();
    private Vector3 _lastSurfaceExtrusion = Vector3.Right*Chunksize;
    private int _discard = 0;

    private class DecorationLibrary<T>
    {
        private T[][] _groups;
        private Random _rng = new Random();

        public DecorationLibrary(params T[][] spritesGroups)
        {
            _groups = spritesGroups;
        }

        public T GetRandomFromGroup(int group)
        {
            if (group >= _groups.Length)
                throw new Exception($"There's no group with index {group} in this library");
            return _groups[group][_rng.Next(_groups[group].Length)];
        }

        public List<T> GetAllResources()
        {
            List <T> allList = new List<T>();
            foreach (T[] group in _groups)
            {
                allList = allList.Concat(group).ToList();
            }
            return allList;
        }

    }

    public Terrain(Scene scene)
    {
        _scene = scene;

        // We load the materials, the ones in this example only use built in techniques, we use diffuse for the ground for performance
        _surfaceMaterial = Cache.Get<Material>("Materials/UnlitAlpha.xml");
        _surfaceMaterial.SetTexture(0, Cache.Get<Texture2D>("Scenarios/grasslands/surface.png"));
        _chunkMaterial = Cache.Get<Material>("Materials/Unlit.xml");
        _chunkMaterial.SetTexture(0,Cache.Get<Texture2D>("Scenarios/grasslands/ground.png"));

        // We create and populate a library with the decorations
        Func<string, Sprite2D> GetSprite = file => Cache.Get<Sprite2D>($"Scenarios/grasslands/Object/{file}");
        _decorationLib = new DecorationLibrary<Sprite2D>(
            new [] {GetSprite("Bush (1).png"), GetSprite("Bush (2).png"), GetSprite("Bush (3).png"), GetSprite("Bush (4).png")}, 
            new [] {GetSprite("Mushroom_1.png"), GetSprite("Mushroom_2.png"), GetSprite("Stone.png"), GetSprite("Sign_2.png")}, 
            new [] {GetSprite("Tree_1.png"), GetSprite("Tree_2.png"), GetSprite("Tree_3.png")}
            );

        // We setup the hotstop/origin of each sprite to be next to its bottom
        foreach (Sprite2D sprite in _decorationLib.GetAllResources())
        {
            sprite.SetHotSpot(new Vector2(0.5f, 0.1f));
        }

        // We generate the chunks and add some boxes randomly
        Sprite2D crateSprite = Cache.Get<Sprite2D>("Scenarios/grasslands/Object/Crate.png");
        for (int i = 0; i < Chunksize*chunksToGenerate; i+=Chunksize)
        {
            GenerateChunk(i);

            // Crates
            if (_rng.Next(100) < PercentageOfChunksWithCrates)
            {
                Node crateNode = AtomicMain.CreateSpriteNode(crateSprite, 3);
                crateNode.SetPosition(new Vector3(i + _rng.Next(8), 20, -5));
                CollisionBox2D crateCollider = crateNode.CreateComponent<CollisionBox2D>();
                crateCollider.SetSize(0.76f, 0.76f);
                crateCollider.SetDensity(1.0f);
                crateCollider.SetRestitution(0.6f);
                crateCollider.SetFriction(0.4f);
            }
        }
    }

    public float SampleSurface(float posX)
    {
        return (float)_noise.Evaluate(posX*NoiseScaleX, 0)*NoiseScaleY;
    }

    void GenerateChunk(int startx)
    {
        // We create a node and position where the chunk starts
        Node node = _scene.CreateChild();
        node.SetPosition2D(startx, 0);

        // We create components to render the geometries of the surface and the ground
        var groundComponent = node.CreateComponent<CustomGeometry>();
        groundComponent.SetMaterial(_chunkMaterial);
        groundComponent.BeginGeometry(0, PrimitiveType.TRIANGLE_LIST);

        var surfaceComponent = node.CreateComponent<CustomGeometry>();
        surfaceComponent.SetMaterial(_surfaceMaterial);
        surfaceComponent.BeginGeometry(0, PrimitiveType.TRIANGLE_LIST);
        
        // We initialize and add a single entry to the surface collider points list
        List<Vector2> surfacePoints = new List<Vector2>() {new Vector2(0,
            (float)_noise.Evaluate(startx*NoiseScaleX, 0)*NoiseScaleY
            )
        };

        // We translate the last surface extrusion point so it's local relative to the chunk we're creating
        _lastSurfaceExtrusion += Vector3.Left*Chunksize;

        // We loop all the segments in this chunk
        float incr = SurfaceSegmentSize;
        for (float x = 0; x < Chunksize-float.Epsilon*8; x+=incr)
        {
            // We store vars for the position for the current segment end point x position and for the y position of the 4 points
            float xEnd = x+incr;
            float tlY = SampleSurface(startx + x);
            float trY = SampleSurface(startx + xEnd);
            float blY = tlY + Chunkheight;
            float brY = trY + Chunkheight;

            // We create vectors that represent 
            Vector3 bl = new Vector3(x, blY, -10);
            Vector3 tl = new Vector3(x, tlY, -10);
            Vector3 br = new Vector3(xEnd, brY, -10);
            Vector3 tr = new Vector3(xEnd, trY, -10);

            // We add the top right point to the surface points list (remember we added the first point in the list init)
            surfacePoints.Add(new Vector2(tr));

            // We call the CreateDecor function passing the global position of the current segment end point and the segment angle
            CreateDecor(tr+Vector3.Right*startx, tl-tr);

            // We create the geometry of the surface (UV os oriented according to the surface)
            Vector2 startV = Vector2.UnitX*(x/Chunksize)*SurfaceRepeatPerChunk;
            Vector2 endV = Vector2.UnitX*(xEnd/Chunksize*SurfaceRepeatPerChunk);
            //bl
            surfaceComponent.DefineVertex(_lastSurfaceExtrusion);
            surfaceComponent.DefineTexCoord(startV);
            //tl
            surfaceComponent.DefineVertex(tl);
            surfaceComponent.DefineTexCoord(startV-Vector2.UnitY);
            //tr
            surfaceComponent.DefineVertex(tr);
            surfaceComponent.DefineTexCoord(-Vector2.UnitY+endV);
            //bl
            surfaceComponent.DefineVertex(_lastSurfaceExtrusion);
            surfaceComponent.DefineTexCoord(startV);
            //tr
            surfaceComponent.DefineVertex(tr);
            surfaceComponent.DefineTexCoord(-Vector2.UnitY+endV);
            //br - We store the last point to use for continuity
            _lastSurfaceExtrusion = tr + Quaternion.FromAxisAngle(Vector3.Back, 90)*Vector3.NormalizeFast(tr - tl);
            surfaceComponent.DefineVertex(_lastSurfaceExtrusion);
            surfaceComponent.DefineTexCoord(endV);

            // We create the geometry of the ground (UV is in world coordinates)
            //bl
            groundComponent.DefineVertex(bl);
            groundComponent.DefineTexCoord(new Vector2(bl/Chunksize));
            //tl
            groundComponent.DefineVertex(tl);
            groundComponent.DefineTexCoord(new Vector2(tl/Chunksize));
            //tr
            groundComponent.DefineVertex(tr);
            groundComponent.DefineTexCoord(new Vector2(tr/Chunksize));
            //bl
            groundComponent.DefineVertex(bl);
            groundComponent.DefineTexCoord(new Vector2(bl/Chunksize));
            //tr
            groundComponent.DefineVertex(tr);
            groundComponent.DefineTexCoord(new Vector2(tr/Chunksize));
            //br
            groundComponent.DefineVertex(br);
            groundComponent.DefineTexCoord(new Vector2(br/Chunksize));
        }
        // We commit the geometry data we just created
        surfaceComponent.Commit();
        groundComponent.Commit();
        
        // We create the collider component for the chunk surface
        CollisionChain2D surfaceCollider = node.CreateComponent<CollisionChain2D>();
        surfaceCollider.SetLoop(false);
        surfaceCollider.SetFriction(1);
        surfaceCollider.SetVertexCount((uint) surfacePoints.Count+1);
        _chunks.Add(surfaceCollider);

        // We add a small overlapping segment with a bit of negative offset in y so the wheel passes smoothly over chunk seams
        Vector2 smoother = new Vector2(-incr*.5f, (float) _noise.Evaluate((startx-incr*.5f)*NoiseScaleX, 0)*NoiseScaleY-.005f);
        surfaceCollider.SetVertex(0,smoother);

        // Finally, we set the vertex of the surface collider
        for (int c = 0; c < surfacePoints.Count; c++)
        {
            Vector2 surfacePoint = surfacePoints[c];
            surfaceCollider.SetVertex((uint)c+1, surfacePoint);
        }
        
        // A collider must have a rigid body to interact with other bodies, even if static which is the case
        node.CreateComponent<RigidBody2D>().SetBodyType(BodyType2D.BT_STATIC);
    }

    void CreateDecor(Vector3 position, Vector3 leftVector)
    {
        // We discard a few calls
        _discard++;
        if (_discard % 3 != 0)
            return;

        // We use the simplex noise to evaluate chances with smooth transition
        double chance = _noise.Evaluate(position.X * 0.2f, 0)+1;
        Node node = null;
        bool isTree = false;

        // Common decorations (grasses)
        if (chance < 1.2f)
        {
            // We discard a few of these too
            if (_rng.Next(6) < 4)
                node = AtomicMain.CreateSpriteNode(_decorationLib.GetRandomFromGroup(0), 3, false);
        }
        else if (chance < 1.3f)
            node = AtomicMain.CreateSpriteNode(_decorationLib.GetRandomFromGroup(1), 4, false);
        else if (chance < 1.7f)
        {
            // We only spawn trees if the surface isn't too steep
            if (Math.Abs(leftVector.Y) < 0.1f)
            {
                node = AtomicMain.CreateSpriteNode(_decorationLib.GetRandomFromGroup(2), 4, false);
                node.Scale2D = node.Scale2D *= 1 + _rng.Next(30)/100f;
                isTree = true;
            }
        }

        if (node != null)
        {
            // We position the node on the surface, if the node is a tree we don't rotate it AND offset it a bit
            node.SetPosition(position+Vector3.Forward*15);
            if (!isTree)
            {
                Quaternion transformation = Quaternion.FromRotationTo(Vector3.Left, leftVector);
                node.SetRotation(transformation);
            }
            else
                node.Translate(-node.Up*0.1f);
        }
    }
}

