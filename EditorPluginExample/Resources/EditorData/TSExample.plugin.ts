/// <reference path="../../typings/Atomic/AtomicWork.d.ts" />
/// <reference path="../../typings/Atomic/EditorWork.d.ts" />

const ExamplePluginUILabel = "TS Example Plugin";
const ExamplePluginTBPath = "EditorData/Example.tb.txt";

class TSExamplePluginService implements Editor.HostExtensions.HostEditorService, Editor.HostExtensions.ProjectServicesEventListener, Editor.HostExtensions.UIServicesEventListener {

    name: string = "TSExampleService";
    description: string = "This service demonstrates plugin functionality written in TypeScript.";

    private serviceLocator: Editor.HostExtensions.HostServiceLocator = null;
    private extensionWindow: Editor.Modal.ExtensionWindow = null;

    private helloLabel: Atomic.UITextField;
    private nameField: Atomic.UIEditField;

    initialize(serviceLoader: Editor.HostExtensions.HostServiceLocator) {
        Atomic.print("ExamplePluginService.initialize");

        this.serviceLocator = (serviceLoader);
        if (this.serviceLocator) {
            this.serviceLocator.projectServices.register(this);
            this.serviceLocator.uiServices.register(this);
        }
    }
    projectUnloaded() {
        this.serviceLocator.uiServices.removePluginMenuItemSource(ExamplePluginUILabel);

        Atomic.print("ExamplePluginService.projectUnloaded");
        if (this.serviceLocator) {
            this.serviceLocator.projectServices.unregister(this);
            this.serviceLocator.uiServices.unregister(this);
        }
    }
    projectLoaded(ev: Editor.EditorEvents.LoadProjectEvent) {
        Atomic.print("ExamplePluginService.projectLoaded");
        let menu = this.serviceLocator.uiServices.createPluginMenuItemSource(ExamplePluginUILabel, { "Open" : ["tsexampleplugin open"] });
    }
    playerStarted() {
        Atomic.print("ExamplePluginService.playerStarted");
    }

    menuItemClicked(refId: string): boolean {
        Atomic.print("ExamplePluginService.menuItemClicked: " + refId);

        if (refId == "tsexampleplugin open") {
            this.extensionWindow = this.serviceLocator.uiServices.showModalWindow(
                ExamplePluginUILabel, ExamplePluginTBPath, this.handleWidgetEvent);
            this.getWidgets();
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

const examplePluginService = new TSExamplePluginService();
export default examplePluginService;
