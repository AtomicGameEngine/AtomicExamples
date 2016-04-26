/// <reference path="../../typings/Atomic/AtomicWork.d.ts" />
/// <reference path="../../typings/Atomic/EditorWork.d.ts" />

const ExamplePluginUILabel = "TS Example Plugin";
const ExamplePluginTBPath = "EditorData/Example.tb.txt";
const InfoboxTBPath = "EditorData/Infobox.tb.txt";

class TSExamplePluginService implements Editor.HostExtensions.HostEditorService, Editor.HostExtensions.ProjectServicesEventListener, Editor.HostExtensions.UIServicesEventListener {

    name: string = "TSExampleService";
    description: string = "This service demonstrates plugin functionality functionality.";

    private serviceLocator: Editor.HostExtensions.HostServiceLocator = null;
    private extensionWindow: Editor.Modal.ExtensionWindow = null;

    private helloLabel: Atomic.UITextField;
    private nameField: Atomic.UIEditField;

    private lastObjectName: string = null;

    initialize(serviceLoader: Editor.HostExtensions.HostServiceLocator) {
        Atomic.print("TSExamplePluginService.initialize");

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

        Atomic.print("TSExamplePluginService.projectUnloaded");
        if (this.serviceLocator) {
            this.serviceLocator.projectServices.unregister(this);
            this.serviceLocator.uiServices.unregister(this);
        }
    }
    projectLoaded(ev: Editor.EditorEvents.LoadProjectEvent) {
        Atomic.print("TSExamplePluginService.projectLoaded");
        this.serviceLocator.uiServices.createPluginMenuItemSource(ExamplePluginUILabel, { "Open" : ["tsexampleplugin open"] });
        this.serviceLocator.uiServices.createHierarchyContextMenuItemSource(ExamplePluginUILabel, { "Get name" : ["tsexampleplugin hierarchy context"]});
        this.serviceLocator.uiServices.createProjectContextMenuItemSource(ExamplePluginUILabel, { "Get name" : ["tsexampleplugin project context"]});
    }
    playerStarted() {
        Atomic.print("TSExamplePluginService.playerStarted");
    }

    menuItemClicked(refId: string): boolean {
        Atomic.print("TSExamplePluginService.menuItemClicked: " + refId);

        if (refId == "tsexampleplugin open") {
            this.extensionWindow = this.serviceLocator.uiServices.showModalWindow(
                ExamplePluginUILabel, ExamplePluginTBPath, this.handleWidgetEvent);
            this.getWidgets();
            return true;
        }

        return false;
    }

    hierarchyContextItemClicked(node: Atomic.Node, refid: string): boolean {
        Atomic.print("TSExamplePluginService.hierarchyContextItemClicked: " + node.name + " " + refid);

        if (refid == "tsexampleplugin hierarchy context") {
            this.lastObjectName = "node " + node.name;

            this.showInfobox("Hierarchy Item Selected ", `Node: '${node.name}' was selected.`);
            return true;
        }

        return false;
    }

    projectContextItemClicked(asset: ToolCore.Asset, refid: string): boolean {
        Atomic.print("TSExamplePluginService.projectContextItemClicked: " + asset.name + " " + refid);

        if (refid == "tsexampleplugin project context") {
            this.lastObjectName = "asset " + asset.name;
            this.showInfobox("Project Asset Selected", `Asset: '${asset.name}' was selected.`);
            return true;
        }

        return false;
    }

    getWidgets() {
        if (!this.extensionWindow) {
            return;
        }

        this.helloLabel = <Atomic.UITextField>this.extensionWindow.getWidget("example_hello");
        this.nameField = <Atomic.UIEditField>this.extensionWindow.getWidget("example_name");

        if (this.lastObjectName) {
            this.nameField.text = this.lastObjectName;
            this.lastObjectName = null;
        }
    }

    showInfobox(title: string, msg: string) {
        const infobox = this.serviceLocator.uiServices.showModalWindow(
            title, InfoboxTBPath, (ev: Atomic.UIWidgetEvent) => {
                if (ev.type == Atomic.UI_EVENT_TYPE_CLICK && ev.target.id == "infobox_ok") {
                    infobox.hide();
                    return true;
                }
            });
        const msgLabel = <Atomic.UITextField>infobox.getWidget("infobox_msg");
        msgLabel.text = msg;
    }

    handleWidgetEvent = (ev: Atomic.UIWidgetEvent): boolean => { // => notation used to bind "this" to the method
        if (!this.extensionWindow) {
            return;
        }

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

    };

}

export default new TSExamplePluginService();
