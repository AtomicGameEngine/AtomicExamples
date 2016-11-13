using AtomicEngine;

public class Program
{
    public static void Main(string[] args)
    {
        Application.Run<HelloQuad>(args);
    }
}

public class HelloQuad : AppDelegate
{
    // Scene reference kept here so it won't be collected by the GC
    Scene scene;
    Camera camera;
    Graphics graphics;
    Viewport viewport;

    Texture2D texture;
    VertexBuffer vertexBuffer;

    public override void Start()
    {
        // We get the variables we are going to use in this example
        Renderer renderer = GetSubsystem<Renderer>();
        graphics = GetSubsystem<Graphics>();
        viewport = renderer.GetViewport(0);

        // We create a new Scene
        scene = new Scene();
        // The Octree should be added to the root scene node (mandatory?)
        scene.CreateComponent<Octree>();
        // We tell the current viewport to display the scene we just created
        viewport.Scene = scene;

        // We create a new camera on the scene, called "Camera"
        // - Scene.CreateChild(string name) returns a new Node with that name.
        // - Node.CreateComponent<ComponentType>() returns a component attached to that Node
        camera = scene.CreateChild("Camera").CreateComponent<Camera>();
        // We can access the Node any component is attached to using Component.Node
        camera.Node.Position = new Vector3(0.5f, 0.5f, 0.0f);
        // Remember, 'camera' is a Camera component, so we access it directly here
        camera.Orthographic = true;
        camera.OrthoSize = 1.5f;
        // We tell the Viewport to use our newly created camera to display our scene
        viewport.Camera = camera;

        // We create an XML from string so this code is fully self-contained
        XMLFile xml = new XMLFile();
        xml.FromString("<renderpath><command type=\"sendevent\"/></renderpath>");

        // We create a new RenderPath. A Viewport comes by default with some events, and you can use viewport.GetRenderPath().Clone()
        // to clone the default RenderPath and Append instructions to it instead (see AtomicBlaster for effects)
        RenderPath renderpath = new RenderPath();
        renderpath.Append(xml);
        // We repace the viewport's default renderpath by the one we just created
        viewport.SetRenderPath(renderpath);
        // We subscribe to the RenderPathEvent. Here we pass an anonymous function that just absorbs the argument and calls Render()
        SubscribeToEvent<RenderPathEvent>(e => { Render(); });

        // Here we setup our shaders, here we are using the BasicVColUnlitAlpha and selecting only DIFFMAP (diffuse texture pass)
        // See this link: github.com/AtomicGameEngine/AtomicGameEngine/tree/master/Resources/CoreData/Techniques
        ShaderVariation pixelShader = graphics.GetShader(ShaderType.PS, "Basic", "DIFFMAP");
        ShaderVariation vertexShader = graphics.GetShader(ShaderType.VS, "Basic", "DIFFMAP");
        graphics.SetShaders(vertexShader, pixelShader);
        // This vertex shader parameter just applies no transformation (Identity Matrix means no transformation) so the vertices
        // display in world coordinates what allow us to use the camera properly
        graphics.SetShaderParameter(ShaderParams.VSP_MODEL, Matrix3x4.IDENTITY);
        // We set the pixel shader diffuse color to be white. You can change this to 'tint' the texture similar to vertex colors
        // but this applies to the whole material
        graphics.SetShaderParameter(ShaderParams.PSP_MATDIFFCOLOR, Color.White);
        // We set cull mode to NONE so our geometry won't be culled (ignored), for this example we don't really need any culling
        graphics.SetCullMode(CullMode.CULL_NONE);

        // We create a texture from literal data so this code is fully self-contained, you can safely skip the lines below
        // In your real projects you're most likely going to load textures from the disk using Texture.Load
        Image image = new Image();
        image.SetSize(16, 16, 3);

        Color z = Color.Yellow;
        Color M = Color.Blue;
        Color k = Color.Black;

        Color[,] imageData =
        {
            { k,k,k,k,k,k,k,k,k,k,k,k,k,k,k,k },
            { k,z,z,z,z,z,z,z,z,z,z,z,z,z,M,k },
            { k,z,z,z,z,z,z,M,M,z,z,z,z,z,z,k },
            { k,z,z,z,z,z,z,M,M,z,z,z,z,z,z,k },
            { k,z,z,z,z,z,M,z,z,M,z,z,z,z,z,k },
            { k,z,z,z,z,z,M,z,z,M,z,z,z,z,z,k },
            { k,z,z,z,z,M,z,z,z,z,M,z,z,z,z,k },
            { k,z,z,z,z,M,z,z,z,z,M,z,z,z,z,k },
            { k,z,z,z,M,z,z,z,z,z,z,M,z,z,z,k },
            { k,z,z,z,M,z,z,z,z,z,z,M,z,z,z,k },
            { k,z,z,M,M,M,M,M,M,M,M,M,M,z,z,k },
            { k,z,z,M,z,z,z,z,z,z,z,z,M,z,z,k },
            { k,z,M,z,z,z,z,z,z,z,z,z,z,M,z,k },
            { k,z,M,z,z,z,z,z,z,z,z,z,z,M,z,k },
            { k,z,z,z,z,z,z,z,z,z,z,z,z,z,z,k },
            { k,k,k,k,k,k,k,k,k,k,k,k,k,k,k,k },
        };

        for (int x = 0; x < 16; x++)
        {
            for (int y = 0; y < 16; y++)
            {
                image.SetPixel(x, 15 - y, imageData[y, x]);
            }
        }

        texture = new Texture2D();
        texture.SetData(image);

        // We call this function that creates the quad geometry
        CreateQuad();

    }

    // We use unsafe code only to access the vertex buffer data
    private unsafe void CreateQuad()
    {
        // We create a new VertexBuffer object, it holds our vertices and is passed to the GPU
        vertexBuffer = new VertexBuffer();
        // We set its size and the elements it's containing, the 3rd optional argument (dynamic) should be 'true' if you're planning
        // to update the VertexBuffer constantly, that will improve performance in those cases.
        vertexBuffer.SetSize(6, Constants.MASK_POSITION | Constants.MASK_TEXCOORD1, false);

        // Here we lock the vertexBuffer what returns a pointer (IntPtr) to its data (vertexData here), I'm using a code block for clarity
        System.IntPtr vertexData = vertexBuffer.Lock(0, 6, true);
        {
            // We can cast the data pointer to whatever data type we want, here we are only using floats but ideally you will want
            // to cast it to an object (struct) with properly offsetted fields and maybe unions for things like colors
            float* vout = (float*) vertexData;

            // Our first vertex, here we set the x position of it
            *vout++ = 0;
            // Here we set the y position
            *vout++ = 0;
            // Here we set the z position (depth in this case, useful for sorting in orthographic projection)
            *vout++ = 0;
            // Here we set it's texture x coordinate, commonly called u;
            *vout++ = 0;
            // Here we set it's texture y coordinate, commonly called v;
            // UVs are simply cartesian coordinates: 0,0 is bottom-left; 1,1 is top-right
            *vout++ = 0;

            // Each of these blocks is a vertex, same concept apply:
            *vout++ = 0; // x
            *vout++ = 1; // y
            *vout++ = 0; // z
            *vout++ = 0; // u
            *vout++ = 1; // v

            *vout++ = 1;
            *vout++ = 1;
            *vout++ = 0;
            *vout++ = 1;
            *vout++ = 1;

            *vout++ = 0;
            *vout++ = 0;
            *vout++ = 0;
            *vout++ = 0;
            *vout++ = 0;

            *vout++ = 1;
            *vout++ = 1;
            *vout++ = 0;
            *vout++ = 1;
            *vout++ = 1;

            *vout++ = 1;
            *vout++ = 0;
            *vout++ = 0;
            *vout++ = 1;
            *vout++ = 0;
        }
        // Don't forget to unlock the VertexBuffer after you modify it
        vertexBuffer.Unlock();
    }

    void Render()
    {
        // We clear the whole screen white before drawing anything
        graphics.Clear(Constants.CLEAR_COLOR, Color.White);
        // The 3 lines below don't have to be set every frame in this specific example, but you'll most likely be changing the often
        viewport.View.SetCameraShaderParameters(camera);
        // We set the Texture to be used in the next draw call
        graphics.SetTexture((uint)TextureUnit.TU_DIFFUSE, texture);
        // We set the VertexBuffer to be used on the next draw call
        graphics.SetVertexBuffer(vertexBuffer);
        // We finally call Draw passing the primitive type our VertexBuffer uses, TRIANGLE_LIST basically means that each 2 vertex 
        // in the buffer should have a face (triangle) between them
        graphics.Draw(PrimitiveType.TRIANGLE_LIST, 0, 6);
    }
}
