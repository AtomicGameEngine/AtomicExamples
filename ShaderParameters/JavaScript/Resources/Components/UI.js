"atomic component";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * A new component
 */
var UI = (function (_super) {
    __extends(UI, _super);
    function UI() {
        var _this = _super.apply(this, arguments) || this;
        /**
         * Fields witihin the inspectorFields object will be exposed to the editor
         */
        _this.inspectorFields = {};
        return _this;
    }
    /**
     * Called when the component is first added to the node
     */
    UI.prototype.start = function () {
        //creates a new scene, but doesn't load it to the player
        var scene = Atomic.player.loadScene("Scenes/Scene.scene");
        //get camera from the scene
        var camera = scene.getComponents("Camera", true)[0];
        //create a new UIView
        var view = new Atomic.UIView();
        // Create a UIWindow
        var window = new Atomic.UIWindow();
        // It will only have a title bar and won't be resizeable or have a close button
        window.settings = Atomic.UI_WINDOW_SETTINGS.UI_WINDOW_SETTINGS_TITLEBAR;
        window.text = "ShaderParameters";
        window.setSize(UI.WIDTH, UI.HEIGHT);
        var layout = new Atomic.UILayout();
        var slider = new Atomic.UISlider();
        slider.layoutWidth = 100;
        slider.setLimits(.1, 1.0);
        slider.value = 1;
        // The Scene View
        var sceneView = new Atomic.UISceneView();
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
        var viewport = sceneView.viewport;
        var renderPath = viewport.renderPath;
        // Add a blur post process effect
        viewport.renderPath.append(Atomic.cache.getResource("XMLFile", "PostProcess/MyBlur.xml"));
        // Get the individual blur commands from MyBlur.xml
        var rpc = new Atomic.RenderPathCommand();
        var commands = [];
        for (var i = 0; i < renderPath.numCommands; i++) {
            renderPath.getCommand(i, rpc);
            if (rpc.tag == "Blur1" || rpc.tag == "Blur2" ||
                rpc.tag == "Blur3" || rpc.tag == "Blur4") {
                // store off the command index so we can update it later
                rpc["cmdIndex"] = i;
                commands.push(rpc);
                rpc = new Atomic.RenderPathCommand();
            }
        }
        this.subscribeToEvent(slider, Atomic.UIWidgetEvent(function (ev) {
            if (ev.type == Atomic.UI_EVENT_TYPE.UI_EVENT_TYPE_CHANGED) {
                var value = 2.0 * slider.value;
                // This works, can set globally
                //renderPath.setShaderParameter("BlurSigma", value);
                // Though, for this example set per command
                for (var i = 0; i < commands.length; i++) {
                    var cmd = commands[i];
                    cmd.setShaderParameter("BlurSigma", value);
                    // update in the renderPath
                    renderPath.setCommand(cmd["cmdIndex"], cmd);
                }
            }
        }));
    };
    /**
     * Update called every cycle with timeStep containing the delta between calls
     * @param timeStep time since last call to update
     */
    UI.prototype.update = function (timeStep) {
    };
    return UI;
}(Atomic.JSComponent));
UI.WIDTH = 640;
UI.HEIGHT = 480;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UI;
