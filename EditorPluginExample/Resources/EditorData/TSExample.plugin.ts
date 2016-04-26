/// <reference path="../../typings/Atomic/AtomicWork.d.ts" />
/// <reference path="../../typings/Atomic/EditorWork.d.ts" />

const ExamplePluginUILabel = "Example Plugin";
const ExamplePluginTBPath = "EditorData/Example.tb.txt";

class ExamplePluginService implements Editor.HostExtensions.HostEditorService, Editor.HostExtensions.ProjectServicesEventListener, Editor.HostExtensions.UIServicesEventListener {

    name: string = "ExampleService";
    description: string = "This service demonstrates plugin functionality functionality.";

    private serviceLocator: Editor.HostExtensions.HostServiceLocator = null;
    private extensionWindow: Editor.Modal.ExtensionWindow = null;

    private helloLabel: Atomic.UITextField;
    private nameField: Atomic.UIEditField;

    private lastObjectName: string = null;

    initialize(serviceLoader: Editor.HostExtensions.HostServiceLocator) {
        Atomic.print("ExamplePluginService.initialize");

        this.serviceLocator = (serviceLoader);
        if (this.serviceLocator) {
            this.serviceLocator.projectServices.register(this);
            this.serviceLocator.uiServices.register(this);
        }
    }
    projectUnloaded() {
        this.serviceLocator.uiServices.removeProjectContextMenuItemSource(ExamplePluginUILabel);
        this.serviceLocator.uiServices.removeHierarchyContextMenuItemSource(ExamplePluginUILabel);
        this.serviceLocator.uiServices.removePluginMenuItemSource(ExamplePluginUILabel);

        Atomic.print("ExamplePluginService.projectUnloaded");
        if (this.serviceLocator) {
            this.serviceLocator.projectServices.unregister(this);
            this.serviceLocator.uiServices.unregister(this);
        }
    }
    projectLoaded(ev: Editor.EditorEvents.LoadProjectEvent) {
        Atomic.print("ExamplePluginService.projectLoaded");
        this.serviceLocator.uiServices.createPluginMenuItemSource(ExamplePluginUILabel, { "Open" : ["exampleplugin open"] });
        this.serviceLocator.uiServices.createHierarchyContextMenuItemSource(ExamplePluginUILabel, { "Get name" : ["exampleplugin hierarchy context"]});
        this.serviceLocator.uiServices.createProjectContextMenuItemSource(ExamplePluginUILabel, { "Get name" : ["exampleplugin project context"]});
    }
    playerStarted() {
        Atomic.print("ExamplePluginService.playerStarted");
    }

    menuItemClicked(refId: string): boolean {
        Atomic.print("ExamplePluginService.menuItemClicked: " + refId);
        
        if (refId == "exampleplugin open") {
            this.extensionWindow = this.serviceLocator.uiServices.showModalWindow(
                ExamplePluginUILabel, ExamplePluginTBPath, this.handleWidgetEvent);
            this.getWidgets();
            return true;
        }

        return false;
    }

    hierarchyContextItemClicked(node: Atomic.Node, refid: string): boolean {
        Atomic.print("ExamplePluginService.hierarchyContextItemClicked: " + node.name + " " + refid);

        if (refid == "exampleplugin hierarchy context") {
            this.lastObjectName = "node " + node.name;

            return true;
        }

        return false;
    }

    projectContextItemClicked(asset: ToolCore.Asset, refid: string): boolean {
        Atomic.print("ExamplePluginService.projectContextItemClicked: " + asset.name + " " + refid);

        if (refid == "exampleplugin project context") {
            this.lastObjectName = "asset " + asset.name;

            return true;
        }

        return false;
    }

    getWidgets() {
        if (!this.extensionWindow)
            return;

        this.helloLabel = <Atomic.UITextField>this.extensionWindow.getWidget("example_hello");
        this.nameField = <Atomic.UIEditField>this.extensionWindow.getWidget("example_name");

        if (this.lastObjectName) {
            this.nameField.text = this.lastObjectName;
            this.lastObjectName = null;
        }
    }

    handleWidgetEvent = (ev: Atomic.UIWidgetEvent): boolean => { // => notation used to bind "this" to the method
        if (!this.extensionWindow)
            return;

        if (ev.type == Atomic.UI_EVENT_TYPE_CLICK) {

            if (ev.target.id == "example_cancel") {
                this.extensionWindow.hide();
                this.extensionWindow = null;
                return true;
            }

            if (ev.target.id == "example_speak") {

                this.helloLabel.text = "Hello " + this.nameField.text;

                return true;
            }
        }

        return false;

    }
}

const examplePluginService = new ExamplePluginService();
export default examplePluginService;