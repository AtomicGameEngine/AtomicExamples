var ExamplePluginUILabel = "Example Plugin";
var ExamplePluginTBPath = "EditorData/Example.tb.txt";
var ExamplePluginService = (function () {
    function ExamplePluginService() {
        var _this = this;
        this.name = "ExampleService";
        this.description = "This service demonstrates plugin functionality functionality.";
        this.serviceLocator = null;
        this.extensionWindow = null;
        this.lastObjectName = null;
        this.handleWidgetEvent = function (ev) {
            if (!_this.extensionWindow)
                return;
            if (ev.type == Atomic.UI_EVENT_TYPE_CLICK) {
                if (ev.target.id == "example_cancel") {
                    _this.extensionWindow.hide();
                    _this.extensionWindow = null;
                    return true;
                }
                if (ev.target.id == "example_speak") {
                    _this.helloLabel.text = "Hello " + _this.nameField.text;
                    return true;
                }
            }
            return false;
        };
    }
    ExamplePluginService.prototype.initialize = function (serviceLoader) {
        Atomic.print("ExamplePluginService.initialize");
        this.serviceLocator = (serviceLoader);
        if (this.serviceLocator) {
            this.serviceLocator.projectServices.register(this);
            this.serviceLocator.uiServices.register(this);
        }
    };
    ExamplePluginService.prototype.projectUnloaded = function () {
        this.serviceLocator.uiServices.removeProjectContextMenuItemSource(ExamplePluginUILabel);
        this.serviceLocator.uiServices.removeHierarchyContextMenuItemSource(ExamplePluginUILabel);
        this.serviceLocator.uiServices.removePluginMenuItemSource(ExamplePluginUILabel);
        Atomic.print("ExamplePluginService.projectUnloaded");
        if (this.serviceLocator) {
            this.serviceLocator.projectServices.unregister(this);
            this.serviceLocator.uiServices.unregister(this);
        }
    };
    ExamplePluginService.prototype.projectLoaded = function (ev) {
        Atomic.print("ExamplePluginService.projectLoaded");
        this.serviceLocator.uiServices.createPluginMenuItemSource(ExamplePluginUILabel, { "Open": ["exampleplugin open"] });
        this.serviceLocator.uiServices.createHierarchyContextMenuItemSource(ExamplePluginUILabel, { "Get name": ["exampleplugin hierarchy context"] });
        this.serviceLocator.uiServices.createProjectContextMenuItemSource(ExamplePluginUILabel, { "Get name": ["exampleplugin project context"] });
    };
    ExamplePluginService.prototype.playerStarted = function () {
        Atomic.print("ExamplePluginService.playerStarted");
    };
    ExamplePluginService.prototype.menuItemClicked = function (refId) {
        Atomic.print("ExamplePluginService.menuItemClicked: " + refId);
        if (refId == "exampleplugin open") {
            this.extensionWindow = this.serviceLocator.uiServices.showModalWindow(ExamplePluginUILabel, ExamplePluginTBPath, this.handleWidgetEvent);
            this.getWidgets();
            return true;
        }
        return false;
    };
    ExamplePluginService.prototype.hierarchyContextItemClicked = function (node, refid) {
        Atomic.print("ExamplePluginService.hierarchyContextItemClicked: " + node.name + " " + refid);
        if (refid == "exampleplugin hierarchy context") {
            this.lastObjectName = "node " + node.name;
            return true;
        }
        return false;
    };
    ExamplePluginService.prototype.projectContextItemClicked = function (asset, refid) {
        Atomic.print("ExamplePluginService.projectContextItemClicked: " + asset.name + " " + refid);
        if (refid == "exampleplugin project context") {
            this.lastObjectName = "asset " + asset.name;
            return true;
        }
        return false;
    };
    ExamplePluginService.prototype.getWidgets = function () {
        if (!this.extensionWindow)
            return;
        this.helloLabel = this.extensionWindow.getWidget("example_hello");
        this.nameField = this.extensionWindow.getWidget("example_name");
        if (this.lastObjectName) {
            this.nameField.text = this.lastObjectName;
            this.lastObjectName = null;
        }
    };
    return ExamplePluginService;
})();
var examplePluginService = new ExamplePluginService();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = examplePluginService;
