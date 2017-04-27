"atomic component";

/**
 * A new component
 */
export default class UI extends Atomic.JSComponent {

    /**
     * Fields witihin the inspectorFields object will be exposed to the editor
     */
    inspectorFields = {
    };

    /**
     * Called when the component is first added to the node
     */
    start() {

        //creates a new scene, but doesn't load it to the player
        let scene = Atomic.player.loadScene("Scenes/Scene.scene");
        //get camera from the scene
        let camera = <Atomic.Camera>scene.getComponents("Camera", true)[0];
        //create a new UIView
        let view = new Atomic.UIView();

        // Create a UIWindow
        let window = new Atomic.UIWindow();
        // It will only have a title bar and won't be resizeable or have a close button
        window.settings = Atomic.UI_WINDOW_SETTINGS.UI_WINDOW_SETTINGS_TITLEBAR;
        window.text = "ShaderParameters";
        window.setSize(UI.WIDTH, UI.HEIGHT);

        let layout = new Atomic.UILayout();

        let slider = new Atomic.UISlider();
        slider.layoutWidth = 100;
        slider.setLimits(.1, 1.0);
        slider.value = 1;

        // The Scene View
        let sceneView = new Atomic.UISceneView();        
        sceneView.setView(scene, camera);
        sceneView.autoUpdate = true;
        sceneView.layoutWidth = 512;
        sceneView.layoutHeight = 384;

        layout.addChild(sceneView);
        layout.addChild(slider);

        window.addChild(layout);

        // Add to main UI view and center
        view.addChild(window);
        window.center();

        let viewport = sceneView.viewport;
        let renderPath = viewport.renderPath;        

        // Add a blur post process effect
        viewport.renderPath.append(Atomic.cache.getResource<Atomic.XMLFile>("XMLFile", "PostProcess/MyBlur.xml"));
        
        // Get the individual blur commands from MyBlur.xml
        let rpc = new Atomic.RenderPathCommand();
        let commands:Array<Atomic.RenderPathCommand> = [];

        for (let i = 0; i < renderPath.numCommands; i++) {

            renderPath.getCommand(i, rpc);

            if (rpc.tag == "Blur1" || rpc.tag == "Blur2" || 
                rpc.tag == "Blur3" || rpc.tag == "Blur4") {
                
                // store off the command index so we can update it later
                rpc["cmdIndex"] = i;
                commands.push(rpc);
                rpc = new Atomic.RenderPathCommand();
            }

        }        

        this.subscribeToEvent(slider, Atomic.UIWidgetEvent((ev) => {

            if (ev.type == Atomic.UI_EVENT_TYPE.UI_EVENT_TYPE_CHANGED) {

                let value = 2.0 * slider.value;

                // This works, can set globally
                //renderPath.setShaderParameter("BlurSigma", value);

                // Though, for this example set per command
                for (let i = 0; i < commands.length; i++) {

                    let cmd = commands[i];

                    cmd.setShaderParameter("BlurSigma", value);                    

                    // update in the renderPath
                    renderPath.setCommand(cmd["cmdIndex"], cmd);

                }

            }
            
        }));
                

    }

    /**
     * Update called every cycle with timeStep containing the delta between calls
     * @param timeStep time since last call to update
     */
    update(timeStep: number) {

    }

    private static readonly WIDTH:number = 640;
    private static readonly HEIGHT:number = 480;
}
