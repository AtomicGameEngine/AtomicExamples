var ExamplePluginUILabel = "JS Example Plugin";
var ExamplePluginTBPath = "EditorData/Example.tb.txt";

// Private variables
var serviceLocator = null;
var extensionWindow = null;
var helloLabel = null;
var nameField = null;

// Private functions
function getWidgets() {
    if (!extensionWindow) {
        return;
    }

    helloLabel = extensionWindow.getWidget("example_hello");
    nameField = extensionWindow.getWidget("example_name");
}

function handleWidgetEvent(ev) {
    if (!extensionWindow) {
        return;
    }

    if (ev.type == Atomic.UI_EVENT_TYPE_CLICK) {
        if (ev.target.id == "example_cancel") {
            extensionWindow.hide();
            extensionWindow = null;
            return true;
        }

        if (ev.target.id == "example_speak") {
            helloLabel.text = "Hello " + nameField.text;
            return true;
        }
    }

    return false;
}

// Definition of the plugin
var JSExamplePlugin = {
    name: "JSExamplePlugin",
    description: "This service demonstrates plugin functionality"
};

JSExamplePlugin.initialize = function(serviceLoader) {
    Atomic.print("JSExamplePluginService.initialize");

    serviceLocator = serviceLoader;
    if (serviceLocator) {
        serviceLocator.projectServices.register(JSExamplePlugin);
        serviceLocator.uiServices.register(JSExamplePlugin);
    }
};

JSExamplePlugin.projectUnloaded = function() {
    serviceLocator.uiServices.removePluginMenuItemSource(ExamplePluginUILabel);

    Atomic.print("JSExamplePluginService.projectUnloaded");
    if (serviceLocator) {
        serviceLocator.projectServices.unregister(JSExamplePlugin);
        serviceLocator.uiServices.unregister(JSExamplePlugin);
    }
};

JSExamplePlugin.projectLoaded = function(ev) {
    Atomic.print("JSExamplePluginService.projectLoaded");
    var menu = serviceLocator.uiServices.createPluginMenuItemSource(ExamplePluginUILabel, {
        "Open": ["exampleplugin open"]
    });
};

JSExamplePlugin.playerStarted = function() {
    Atomic.print("JSExamplePluginService.playerStarted");
};

JSExamplePlugin.menuItemClicked = function(refId) {
    Atomic.print("JSExamplePluginService.menuItemClicked: " + refId);

    if (refId == "exampleplugin open") {
        extensionWindow = serviceLocator.uiServices.showModalWindow(
            ExamplePluginUILabel, ExamplePluginTBPath, handleWidgetEvent);
        getWidgets();
        return true;
    }

    return false;
};


module.exports = JSExamplePlugin;
