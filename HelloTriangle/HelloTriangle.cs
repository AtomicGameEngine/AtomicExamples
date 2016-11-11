using AtomicEngine;

public class Program
{
    public static void Main(string[] args)
    {
        Application.Run<Game>(args);
    }
}

public class Game : AppDelegate
{
    // Scene reference kept here so it won't be collected by the GC
    Scene scene;
    Camera camera;
    Graphics graphics;
    Viewport viewport;

    VertexBuffer vertexBuffer;
    ShaderVariation pixelShader;
    ShaderVariation vertexShader;

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

        pixelShader = graphics.GetShader(ShaderType.PS, "Basic", "VERTEXCOLOR");
        vertexShader = graphics.GetShader(ShaderType.VS, "Basic", "VERTEXCOLOR");
        graphics.SetShaders(vertexShader, pixelShader);
        graphics.SetShaderParameter(ShaderParams.VSP_MODEL, Matrix3x4.IDENTITY);
        graphics.SetShaderParameter(ShaderParams.PSP_MATDIFFCOLOR, Color.White);
        graphics.SetCullMode(CullMode.CULL_NONE);

        vertexBuffer = new VertexBuffer();
        vertexBuffer.SetSize(3, Constants.MASK_POSITION | Constants.MASK_COLOR, true);
    }

    unsafe void Render()
    {
        System.IntPtr vertexData = vertexBuffer.Lock(0, 3, true);
        {
            float* vout = (float*)vertexData;

            vout[0] = 0;
            vout[1] = 0;
            vout[2] = 0;
            *(uint*)(vout+3) = 0xFFFF0000;

            vout[4] = 1;
            vout[5] = 0;
            vout[6] = 0;
            *(uint*)(vout+7) = 0xFF00FF00;

            vout[8] = 0.5f;
            vout[9] = 1;
            vout[10] = 0;
            *(uint*)(vout+11) = 0xFF0000FF;
        }
        vertexBuffer.Unlock();
        
        graphics.Clear(0x1, Color.White);
        viewport.View.SetCameraShaderParameters(camera);
        graphics.SetVertexBuffer(vertexBuffer);
        graphics.Draw(PrimitiveType.TRIANGLE_LIST, 0, 3);
    }
}
