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
        Renderer renderer = AtomicNET.GetSubsystem<Renderer>();
        graphics = AtomicNET.GetSubsystem<Graphics>();
        viewport = renderer.GetViewport(0);
        
        scene = new Scene();
        scene.CreateComponent<Octree>();
        viewport.Scene = scene;

        camera = scene.CreateChild("Camera").CreateComponent<Camera>();
        camera.Node.Position = new Vector3(0.5f, 0.5f, 0.0f);
        camera.Orthographic = true;
        camera.OrthoSize = 1.5f;
        viewport.Camera = camera;

        // We create a XML from string so this code is fully self-contained
        XMLFile xml = new XMLFile();
        xml.FromString("<renderpath><command type=\"sendevent\"/></renderpath>");

        RenderPath renderpath = new RenderPath();
        renderpath.Append(xml);
        viewport.SetRenderPath(renderpath);
        SubscribeToEvent("RenderPathEvent", (u, e) => { Render(); });

        ShaderVariation pixelShader = graphics.GetShader(ShaderType.PS, "Basic", "DIFFMAP");
        ShaderVariation vertexShader = graphics.GetShader(ShaderType.VS, "Basic", "DIFFMAP");
        graphics.SetShaders(vertexShader, pixelShader);
        graphics.SetShaderParameter(ShaderParams.VSP_MODEL, Matrix3x4.IDENTITY);
        graphics.SetShaderParameter(ShaderParams.PSP_MATDIFFCOLOR, Color.White);
        graphics.SetCullMode(CullMode.CULL_NONE);

        // We create a texture from literal data so this code is fully self-contained
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
                image.SetPixel(x,15-y,imageData[y,x]);
            }
        }

        texture = new Texture2D();
        texture.SetData(image);
        
        vertexBuffer = new VertexBuffer();
        vertexBuffer.SetSize(6, Constants.MASK_POSITION | Constants.MASK_TEXCOORD1, true);
    }

    unsafe void Render()
    {
        System.IntPtr vertexData = vertexBuffer.Lock(0, 6, true);
        {
            float* vout = (float*)vertexData;

            *vout++ = 0;
            *vout++ = 0;
            *vout++ = 0;
            *vout++ = 0;
            *vout++ = 0;

            *vout++ = 0;
            *vout++ = 1;
            *vout++ = 0;
            *vout++ = 0;
            *vout++ = 1;

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
        vertexBuffer.Unlock();
        
        graphics.Clear(0x1, Color.White);
        viewport.View.SetCameraShaderParameters(camera);
        graphics.SetTexture((uint)TextureUnit.TU_DIFFUSE, texture);
        graphics.SetVertexBuffer(vertexBuffer);
        graphics.Draw(PrimitiveType.TRIANGLE_LIST, 0, 6);
    }
}
