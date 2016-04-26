"use strict";
var ExamplePluginUILabel = "TS Example Plugin";
var ExamplePluginTBPath = "EditorData/Example.tb.txt";
var InfoboxTBPath = "EditorData/Infobox.tb.txt";
var TSExamplePluginService = (function () {
    function TSExamplePluginService() {
        var _this = this;
        this.name = "TSExampleService";
        this.description = "This service demonstrates plugin functionality functionality.";
        this.serviceLocator = null;
        this.extensionWindow = null;
        this.lastObjectName = null;
        this.handleWidgetEvent = function (ev) {
            if (!_this.extensionWindow) {
                return;
            }
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
    TSExamplePluginService.prototype.initialize = function (serviceLoader) {
        Atomic.print("TSExamplePluginService.initialize");
        this.serviceLocator = (serviceLoader);
        if (this.serviceLocator) {
            this.serviceLocator.projectServices.register(this);
            this.serviceLocator.uiServices.register(this);
        }
    };
    TSExamplePluginService.prototype.projectUnloaded = function () {
        this.serviceLocator.uiServices.removeProjectContextMenuItemSource(ExamplePluginUILabel);
        this.serviceLocator.uiServices.removeHierarchyContextMenuItemSource(ExamplePluginUILabel);
        this.serviceLocator.uiServices.removePluginMenuItemSource(ExamplePluginUILabel);
        Atomic.print("TSExamplePluginService.projectUnloaded");
        if (this.serviceLocator) {
            this.serviceLocator.projectServices.unregister(this);
            this.serviceLocator.uiServices.unregister(this);
        }
    };
    TSExamplePluginService.prototype.projectLoaded = function (ev) {
        Atomic.print("TSExamplePluginService.projectLoaded");
        this.serviceLocator.uiServices.createPluginMenuItemSource(ExamplePluginUILabel, { "Open": ["tsexampleplugin open"] });
        this.serviceLocator.uiServices.createHierarchyContextMenuItemSource(ExamplePluginUILabel, { "Get name": ["tsexampleplugin hierarchy context"] });
        this.serviceLocator.uiServices.createProjectContextMenuItemSource(ExamplePluginUILabel, { "Get name": ["tsexampleplugin project context"] });
    };
    TSExamplePluginService.prototype.playerStarted = function () {
        Atomic.print("TSExamplePluginService.playerStarted");
    };
    TSExamplePluginService.prototype.menuItemClicked = function (refId) {
        Atomic.print("TSExamplePluginService.menuItemClicked: " + refId);
        if (refId == "tsexampleplugin open") {
            this.extensionWindow = this.serviceLocator.uiServices.showModalWindow(ExamplePluginUILabel, ExamplePluginTBPath, this.handleWidgetEvent);
            this.getWidgets();
            return true;
        }
        return false;
    };
    TSExamplePluginService.prototype.hierarchyContextItemClicked = function (node, refid) {
        Atomic.print("TSExamplePluginService.hierarchyContextItemClicked: " + node.name + " " + refid);
        if (refid == "tsexampleplugin hierarchy context") {
            this.lastObjectName = "node " + node.name;
            this.showInfobox("Hierarchy Item Selected ", "Node: '" + node.name + "' was selected.");
            return true;
        }
        return false;
    };
    TSExamplePluginService.prototype.projectContextItemClicked = function (asset, refid) {
        Atomic.print("TSExamplePluginService.projectContextItemClicked: " + asset.name + " " + refid);
        if (refid == "tsexampleplugin project context") {
            this.lastObjectName = "asset " + asset.name;
            this.showInfobox("Project Asset Selected", "Asset: '" + asset.name + "' was selected.");
            return true;
        }
        return false;
    };
    TSExamplePluginService.prototype.getWidgets = function () {
        if (!this.extensionWindow) {
            return;
        }
        this.helloLabel = this.extensionWindow.getWidget("example_hello");
        this.nameField = this.extensionWindow.getWidget("example_name");
        if (this.lastObjectName) {
            this.nameField.text = this.lastObjectName;
            this.lastObjectName = null;
        }
    };
    TSExamplePluginService.prototype.showInfobox = function (title, msg) {
        var infobox = this.serviceLocator.uiServices.showModalWindow(title, InfoboxTBPath, function (ev) {
            if (ev.type == Atomic.UI_EVENT_TYPE_CLICK && ev.target.id == "infobox_ok") {
                infobox.hide();
                return true;
            }
        });
        var msgLabel = infobox.getWidget("infobox_msg");
        msgLabel.text = msg;
    };
    return TSExamplePluginService;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new TSExamplePluginService();
