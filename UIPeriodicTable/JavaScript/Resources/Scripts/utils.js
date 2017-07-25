// code viewer utility

exports.viewCode = function(codeFile, mylayout) {

        var window = new Atomic.UIWindow();
        window.setSettings ( Atomic.UI_WINDOW_SETTINGS_DEFAULT );
        window.text = "Code Viewer";
        window.load("Scenes/view_code.ui.txt");

        var filex = Atomic.cache.getFile(codeFile);
        var textx = filex.readText();
        filex.close();
        window.getWidget("viewCodeText").text = textx;

        window.resizeToFitContent();
        mylayout.view.addChild(window);
        window.center();
        window.getWidget("viewCodeOK").onClick = function () {
            window.die();
            window = null;
        };
};

exports.eventReport = function(eventNumber) {
    switch ( eventNumber ) {
        case 0: return "UI_EVENT_TYPE_CLICK";
        case 1: return "UI_EVENT_TYPE_LONG_CLICK";
        case 2: return "UI_EVENT_TYPE_POINTER_DOWN";
        case 3: return "UI_EVENT_TYPE_POINTER_UP";
        case 4: return "UI_EVENT_TYPE_POINTER_MOVE";
        case 5: return "UI_EVENT_TYPE_RIGHT_POINTER_DOWN";
        case 6: return "UI_EVENT_TYPE_RIGHT_POINTER_UP";
        case 7: return "UI_EVENT_TYPE_WHEEL";
        case 8: return "UI_EVENT_TYPE_CHANGED";
        case 9: return "UI_EVENT_TYPE_KEY_DOWN";
        case 10: return "UI_EVENT_TYPE_KEY_UP";
        case 11: return "UI_EVENT_TYPE_SHORTCUT";
        case 12: return "UI_EVENT_TYPE_CONTEXT_MENU";
        case 13: return "UI_EVENT_TYPE_FILE_DROP";
        case 14: return "UI_EVENT_TYPE_TAB_CHANGED";
        case 15: return "UI_EVENT_TYPE_CUSTOM";
    }
    return "Unknown";
};

