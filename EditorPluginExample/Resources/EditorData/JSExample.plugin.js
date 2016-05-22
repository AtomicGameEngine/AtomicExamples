var ExamplePluginUILabel = "JS Example Plugin";
var ExamplePluginTBPath = "EditorData/Example.tb.txt";
var InfoboxTBPath = "EditorData/Infobox.tb.txt";

// Private variables
var serviceLocator = null;
var extensionWindow = null;
var helloLabel = null;
var nameField = null;
var lastObjectName = null;
var totalUses = 0;

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
            serviceLocator.projectServices.setUserPreference("JSExamplePlugin", "UsageCount", ++totalUses);
            helloLabel.text = "Hello " + nameField.text + ", This was used " + totalUses + " times.";
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

/**
 * Full path is the fully qualified path from the root of the filesystem.  In order to take advantage
 * of the resource caching system, let's trim it down to just the path inside the resources directory
 * including the Resources directory so that the casing is correct
 */
function getNormalizedPath(path) {
    var RESOURCES_MARKER = "resources/";
    return path.substring(path.toLowerCase().indexOf(RESOURCES_MARKER));
}

var CustomEditorBuilder = { }

/**
 * Returns true if this builder can generate an editor for this resource type
 */
CustomEditorBuilder.canHandleResource = function(resourcePath) {
    return resourcePath.indexOf("custom.editorjs.json") > 0;
}

/**
 * Generates a resource editor for the provided resource type
 * @param  resourcePath
 * @param  tabContainer
 */
CustomEditorBuilder.getEditor = function(resourceFrame, resourcePath, tabContainer) {

    // point to a custom page
    var editorUrl = "atomic://" + ToolCore.toolSystem.project.resourcePath + "EditorData/customEditor.html";
    var editor = new Editor.JSResourceEditor(resourcePath, tabContainer, editorUrl);

    // one time subscriptions waiting for the web view to finish loading.  This event
    // actually hits the editor instance before we can hook it, so listen to it on the
    // frame and then unhook it
    editor.subscribeToEvent("WebViewLoadEnd", function(data) {
        editor.unsubscribeFromEvent("WebViewLoadEnd");

        var webClient = editor.webView.webClient;
        webClient.executeJavaScript('HOST_loadCode("atomic://' + getNormalizedPath(editor.fullPath) + '");');
    });

    editor.subscribeToEvent("DeleteResourceNotification", function(data){
        var webClient = editor.webView.webClient;
        webClient.executeJavaScript('HOST_resourceDeleted("atomic://' + getNormalizedPath(data.path) + '");');
    });

    editor.subscribeToEvent("UserPreferencesChangedNotification", function(data) {
        var prefsPath = ToolCore.toolSystem.project.userPrefsFullPath;
        if (Atomic.fileSystem.fileExists(prefsPath)) {
            // Get a reference to the web client so we can call the load preferences method
            var webClient = editor.webView.webClient;
            webClient.executeJavaScript('HOST_loadPreferences("atomic://' + prefsPath + '");');
        }
    });

    return editor;
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
    serviceLocator.uiServices.unregisterCustomEditor(CustomEditorBuilder);

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

    serviceLocator.uiServices.registerCustomEditor(CustomEditorBuilder);

    totalUses = serviceLocator.projectServices.getUserPreference("JSExamplePlugin", "UsageCount", 0);
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
