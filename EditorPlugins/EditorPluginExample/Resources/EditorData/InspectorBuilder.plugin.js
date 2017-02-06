"use strict";
var InspectorBuilderServiceUILabel = "Inspector Builder";
//Add custom inspectors here
var ExampleInspector = require("./ExampleInspectors/ExampleInspector");
var InspectorBuilderService = (function () {
    function InspectorBuilderService() {
        this.name = "InspectorBuilderService";
        this.description = "This service provides custom inspector functionality.";
        this.serviceLocator = null;
    }
    InspectorBuilderService.prototype.initialize = function (serviceLoader) {
        Atomic.print("InspectorBuilder.initialize");
        this.serviceLocator = (serviceLoader);
        if (this.serviceLocator) {
            this.serviceLocator.projectServices.register(this);
            this.serviceLocator.uiServices.register(this);
        }
    };
    InspectorBuilderService.prototype.projectUnloaded = function () {
        this.serviceLocator.uiServices.removePluginMenuItemSource(InspectorBuilderServiceUILabel);
        Atomic.print("InspectorBuilder.projectUnloaded");
        if (this.serviceLocator) {
            this.serviceLocator.projectServices.unregister(this);
            this.serviceLocator.uiServices.unregister(this);
        }
    };
    InspectorBuilderService.prototype.projectAssetClicked = function (asset) {
        Atomic.print("Inspector.projectAssetClicked with extension: " + asset.extension);
        if (asset.extension == ".example") {
            var exampleInspector = new ExampleInspector();
            this.serviceLocator.uiServices.loadCustomInspector(exampleInspector);
            exampleInspector.inspect(asset);
            return true;
        }
        return false;
    };
    return InspectorBuilderService;
}());
var inspectorBuilderService = new InspectorBuilderService();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = inspectorBuilderService;
