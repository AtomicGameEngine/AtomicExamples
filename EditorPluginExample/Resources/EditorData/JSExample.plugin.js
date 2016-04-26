var ExamplePluginUILabel = "JS Example Plugin";
var ExamplePluginTBPath = "EditorData/Example.tb.txt";
var InfoboxTBPath = "EditorData/Infobox.tb.txt";

// Private variables
var serviceLocator = null;
var extensionWindow = null;
var helloLabel = null;
var nameField = null;
var lastObjectName = null;

// Private functions
function getWidgets() {
    if (!extensionWindow) {
        return;
    }

    helloLabel = extensionWindow.getWidget("example_hello");
    nameField = extensionWindow.getWidget("example_name");

    if (lastObjectName) {
        nameField.text = lastObjectName;
        lastObjectName = null;
    }
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

function showInfobox(title, msg) {
    var infobox = serviceLocator.uiServices.showModalWindow(
        title, InfoboxTBPath,
        function(ev) {
            if (ev.type == Atomic.UI_EVENT_TYPE_CLICK && ev.target.id == "infobox_ok") {
                infobox.hide();
                return true;
            }
        });
    var msgLabel = infobox.getWidget("infobox_msg");
    msgLabel.text = msg;
}

// Definition of the plugin
var JSExamplePlugin = {
    name: "JSExamplePlugin",
    description: "This service demonstrates plugin functionality"
};

JSExamplePlugin.initialize = function(serviceLoader) {
    console.log("JSExamplePluginService.initialize");

    serviceLocator = serviceLoader;
    if (serviceLocator) {
        serviceLocator.projectServices.register(JSExamplePlugin);
        serviceLocator.uiServices.register(JSExamplePlugin);
    }
};

JSExamplePlugin.projectUnloaded = function() {
    serviceLocator.uiServices.removeProjectContextMenuItemSource(ExamplePluginUILabel);
    serviceLocator.uiServices.removeHierarchyContextMenuItemSource(ExamplePluginUILabel);
    serviceLocator.uiServices.removePluginMenuItemSource(ExamplePluginUILabel);

    console.log("JSExamplePluginService.projectUnloaded");
    if (serviceLocator) {
        serviceLocator.projectServices.unregister(JSExamplePlugin);
        serviceLocator.uiServices.unregister(JSExamplePlugin);
    }
};

JSExamplePlugin.projectLoaded = function(ev) {
    console.log("JSExamplePluginService.projectLoaded");
    serviceLocator.uiServices.createPluginMenuItemSource(ExamplePluginUILabel, {
        "Open": ["jsexampleplugin open"]
    });
    serviceLocator.uiServices.createHierarchyContextMenuItemSource(ExamplePluginUILabel, {
        "Get name": ["jsexampleplugin hierarchy context"]
    });
    serviceLocator.uiServices.createProjectContextMenuItemSource(ExamplePluginUILabel, {
        "Get name": ["jsexampleplugin project context"]
    });
};

JSExamplePlugin.playerStarted = function() {
    console.log("JSExamplePluginService.playerStarted");
};

JSExamplePlugin.menuItemClicked = function(refId) {
    console.log("JSExamplePluginService.menuItemClicked: " + refId);

    if (refId == "jsexampleplugin open") {
        extensionWindow = serviceLocator.uiServices.showModalWindow(
            ExamplePluginUILabel, ExamplePluginTBPath, handleWidgetEvent);
        getWidgets();
        return true;
    }

    return false;
};

JSExamplePlugin.hierarchyContextItemClicked = function(node, refid) {
    console.log("JSExamplePluginService.hierarchyContextItemClicked: " + node.name + " " + refid);

    if (refid == "jsexampleplugin hierarchy context") {
        lastObjectName = "node " + node.name;

        showInfobox("Hierarchy Item Selected ", "Node: '" + node.name + "' was selected.");
        return true;
    }

    return false;
}

JSExamplePlugin.projectContextItemClicked = function(asset, refid) {
    console.log("JSExamplePluginService.projectContextItemClicked: " + asset.name + " " + refid);

    if (refid == "jsexampleplugin project context") {
        lastObjectName = "asset " + asset.name;

        showInfobox("Project Item Selected ", "Asset: '" + asset.name + "' was selected.");
        return true;
    }

    return false;
}


module.exports = JSExamplePlugin;
