/// <reference path="../../typings/Atomic/Atomic.d.ts" />
/// <reference path="../../typings/Atomic/EditorWork.d.ts" />

const InspectorBuilderServiceUILabel = "Inspector Builder";

//Add custom inspectors here
import ExampleInspector = require("./ExampleInspectors/ExampleInspector");

class InspectorBuilderService implements
    Editor.HostExtensions.HostEditorService,
    Editor.HostExtensions.ProjectServicesEventListener,
    Editor.HostExtensions.UIServicesEventListener{

    name: string = "InspectorBuilderService";
    description: string = "This service provides custom inspector functionality.";

    private serviceLocator: Editor.HostExtensions.HostServiceLocator = null;

    initialize(serviceLoader: Editor.Extensions.ServiceLoader) {
        Atomic.print("InspectorBuilder.initialize");
        this.serviceLocator = <Editor.HostExtensions.HostServiceLocator>(serviceLoader);
        if (this.serviceLocator) {
            this.serviceLocator.projectServices.register(this);
            this.serviceLocator.uiServices.register(this);

        }
    }

    projectUnloaded() {
        this.serviceLocator.uiServices.removePluginMenuItemSource(InspectorBuilderServiceUILabel);

        Atomic.print("InspectorBuilder.projectUnloaded");
        if (this.serviceLocator) {
            this.serviceLocator.projectServices.unregister(this);
            this.serviceLocator.uiServices.unregister(this);
        }
    }

    projectAssetClicked(asset: ToolCore.Asset): boolean {
        Atomic.print("Inspector.projectAssetClicked with extension: " + asset.extension);

        if (asset.extension == ".example") {
            
            var exampleInspector = new ExampleInspector();
            this.serviceLocator.uiServices.loadCustomInspector(<Atomic.UIWidget>exampleInspector);

            exampleInspector.inspect(asset);
            return true;
        }
        return false;
    }

}
const inspectorBuilderService = new InspectorBuilderService();
export default inspectorBuilderService;