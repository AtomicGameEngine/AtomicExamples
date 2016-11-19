using System.Runtime.InteropServices;
using AtomicEngine;

public class Program
{
    public static void Main(string[] args)
    {
        Application.Run<HelloQuad>(args);
    }
}

// This struct represents a vertex in our geometry, its layout should be sequential and we're specifying the size although it's
// not necessary in this example. They hold the vertex position in 3D, the color channels, and the texture coordinates (UV)
[StructLayout(LayoutKind.Sequential, Size = 24)]
public struct VertexUVColor
{
    // These are the vertex position in each individual axis. z is depth in this case, useful for sorting in orthographic projection
    public float x, y, z; // 3 elements of 4 bytes each (single precision 32-bit): 3x4 = 12 bytes
    // Individual color channels: red, green, blue, alpha (transparency; 0 = transparent, 255 = opaque)
    public byte r, g, b, a; // 4 elements of 1 byte
    // These are the texture x and y coordinates, commonly called u and v respectively; they are simply normalized cartesian coordinates
    public float u, v; // 2x4 = 8 bytes here, totalling 12+4+6 bytes = 24 bytes (total size of this struct)
}

public class HelloQuad : AppDelegate
{
    // Scene reference kept here so it won't be collected by the GC
    Scene scene;
    Graphics graphics;
    Viewport viewport;
    Camera camera;
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
        // The Octree should be added to the root scene node (mandatory?) TODO: answer this
        scene.CreateComponent<Octree>();
        // We pass the scene we just created to be displayed in the viewport
        viewport.Scene = scene;

        // We create a new camera on the scene, called "Camera". Tip: you can think of a camera as a glorified projection matrix
        // - Scene.CreateChild(string name) returns a new Node with that name.
        // - Node.CreateComponent<ComponentType>() returns a component attached to that Node
        camera = scene.CreateChild("Camera").CreateComponent<Camera>();
        // We can access the Node any component is attached to using Component.Node
        camera.Node.Position = new Vector3(0.5f, 0.5f, 0.0f);
        // Remember, 'camera' is a Camera component, so we access it directly here
        camera.Orthographic = true;
        camera.OrthoSize = 1.5f;
        // We pass our newly created camera to the viewport so it's used to display our scene
        viewport.Camera = camera;

        // We create an XML from string so this code is fully self-contained
        XMLFile xml = new XMLFile(); xml.FromString("<renderpath><command type=\"sendevent\"/></renderpath>");

        // We create a new RenderPath. A Viewport comes by default with some events, and you can use viewport.GetRenderPath().Clone()
        // to clone the default RenderPath and Append instructions to it instead (see AtomicBlaster for examples on how to do effects)
        RenderPath renderpath = new RenderPath();
        renderpath.Append(xml);
        // We replace the viewport's default renderpath by the one we just created
        viewport.SetRenderPath(renderpath);
        // We subscribe to the RenderPathEvent. Here we pass an anonymous function that just absorbs the argument and calls Render()
        SubscribeToEvent<RenderPathEvent>(e => { Render(); });

        // Here we setup our shaders, we are using the BasicVColUnlitAlpha "technique" and selecting DIFFMAP and VERTEXCOLOR
        // DIFFMAP is the diffuse texture and VERTEXCOLOR is a color each vertex holds that is used to 'tint' the surface
        // See this link: github.com/AtomicGameEngine/AtomicGameEngine/tree/master/Resources/CoreData/Techniques
        ShaderVariation pixelShader = graphics.GetShader(ShaderType.PS, "Basic", "DIFFMAP VERTEXCOLOR");
        ShaderVariation vertexShader = graphics.GetShader(ShaderType.VS, "Basic", "DIFFMAP VERTEXCOLOR");
        graphics.SetShaders(vertexShader, pixelShader);
        // This vertex shader parameter just applies no transformation (Identity Matrix means no transformation) so the vertices
        // display in world coordinates what allow us to use the camera properly. NOTE: Identity Matrix is also called Unit Matrix
        graphics.SetShaderParameter(ShaderParams.VSP_MODEL, Matrix3x4.IDENTITY);
        // We set the pixel shader diffuse color to be white. You can change this to 'tint' the texture similar to vertex colors
        // but this applies to the whole material and in this example vertex colors will also affect it
        graphics.SetShaderParameter(ShaderParams.PSP_MATDIFFCOLOR, Color.White);
        // We set cull mode to NONE so our geometry won't be culled (ignored), for this example we don't really need any culling
        graphics.SetCullMode(CullMode.CULL_NONE);

        // We create a texture from literal data so this code is fully self-contained, you can safely skip the lines below.
        // In your real projects you're most likely going to load textures from the disk using Texture.Load
        Image image = new Image();
        image.SetSize(16, 16, 3);

        Color z = Color.White;
        Color M = Color.Blue;
        Color k = Color.Black;

        Color[] imageData =
        {
            k,k,k,k,k,k,k,k,k,k,k,k,k,k,k,k,
            k,z,z,z,z,z,z,z,z,z,z,z,z,z,M,k,
            k,z,z,z,z,z,z,M,M,z,z,z,z,z,z,k,
            k,z,z,z,z,z,z,M,M,z,z,z,z,z,z,k,
            k,z,z,z,z,z,M,z,z,M,z,z,z,z,z,k,
            k,z,z,z,z,z,M,z,z,M,z,z,z,z,z,k,
            k,z,z,z,z,M,z,z,z,z,M,z,z,z,z,k,
            k,z,z,z,z,M,z,z,z,z,M,z,z,z,z,k,
            k,z,z,z,M,z,z,z,z,z,z,M,z,z,z,k,
            k,z,z,z,M,z,z,z,z,z,z,M,z,z,z,k,
            k,z,z,M,M,M,M,M,M,M,M,M,M,z,z,k,
            k,z,z,M,z,z,z,z,z,z,z,z,M,z,z,k,
            k,z,M,z,z,z,z,z,z,z,z,z,z,M,z,k,
            k,z,M,z,z,z,z,z,z,z,z,z,z,M,z,k,
            k,z,z,z,z,z,z,z,z,z,z,z,z,z,z,k,
            k,k,k,k,k,k,k,k,k,k,k,k,k,k,k,k,
        };

        for (int pixel = 0; pixel < imageData.Length; pixel++)
        {
            image.SetPixel(pixel % 16, 15 - pixel / 16, imageData[pixel]);
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
        vertexBuffer.SetSize(6, Constants.MASK_POSITION | Constants.MASK_TEXCOORD1 | Constants.MASK_COLOR, false);

        // Here we lock the vertexBuffer what returns a pointer (IntPtr) to its data (vertexData here), I'm using a code block for clarity
        System.IntPtr vertexData = vertexBuffer.Lock(0, 6, true);
        {
            // We can cast the data pointer to whatever data type we want, here we are using the custom VertexUVColor struct
            VertexUVColor* vertex = (VertexUVColor*) vertexData;

            // Each of these blocks is a vertex, we set the their position (x and y), texture coordinate (u and v) and color in individual
            // red, green and blue channels (r, g, b), alpha has no effect in this example because there's no transparency in the shader
            vertex[0] = new VertexUVColor{ x = 0, y = 0, u = 0, v = 0, r = 255, g = 0, b = 255 };
            vertex[1] = new VertexUVColor{ x = 0, y = 1, u = 0, v = 1, r = 255, g = 255, b = 0 };
            vertex[2] = new VertexUVColor{ x = 1, y = 1, u = 1, v = 1, r = 255, g = 255, b = 255 };
            vertex[3] = new VertexUVColor{ x = 0, y = 0, u = 0, v = 0, r = 255, g = 0, b = 255 };
            vertex[4] = new VertexUVColor{ x = 1, y = 1, u = 1, v = 1, r = 255, g = 255, b = 255 };
            vertex[5] = new VertexUVColor{ x = 1, y = 0, u = 1, v = 0, r = 0, g = 255, b = 0 };
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
        // We set the Texture to be used in the next draw call and we are also setting the filter to nearest neighbor so it looks sharp
        graphics.SetTexture((uint)TextureUnit.TU_DIFFUSE, texture);
        graphics.SetDefaultTextureFilterMode(TextureFilterMode.FILTER_NEAREST);
        // We set the VertexBuffer to be used on the next draw call
        graphics.SetVertexBuffer(vertexBuffer);
        // We finally call Draw passing the primitive type our VertexBuffer uses, TRIANGLE_LIST basically means that every 3 vertices
        // in the buffer should have a face (triangle) between them (see: http://math.hws.edu/graphicsbook/c3/triangle-primitives.png)
        graphics.Draw(PrimitiveType.TRIANGLE_LIST, 0, 6);
    }
}
