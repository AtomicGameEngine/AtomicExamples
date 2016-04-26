'use strict';

var game = Atomic.game;
var view = game.uiView;
var UI = Atomic.UI;
var UIWindow = Atomic.UIWindow;

var window;

function closeWindow() {
    if (window)
        window.die();
    window = null;
}

exports.init = function(onClose) {

    window = new UIWindow();

    window.settings = Atomic.UI.WINDOW_SETTINGS_TITLEBAR;
    window.text = "Join Server";

    window.load("UI/joinServer.ui.txt");

    // Build select list
    var serverSelect = new Atomic.UISelectList();
    var serverSelectSource = new Atomic.UISelectItemSource();
    serverSelectSource.addItem(new Atomic.UISelectItem("Server 1"));
    serverSelectSource.addItem(new Atomic.UISelectItem("Server 2"));
    serverSelectSource.addItem(new Atomic.UISelectItem("Server 3"));
    serverSelect.setSource(serverSelectSource);
    
    var lp = new Atomic.UILayoutParams();
    lp.minWidth = 300;
    lp.minHeight = 250;
    lp.maxHeight = 250;
    serverSelect.layoutParams = lp;
    
    var serverContainer = window.getWidget("servercontainer");
    serverContainer.addChild(serverSelect);
    
    window.getWidget("cancel").onClick = function () {
        closeWindow();
        onClose();
    }
    
    window.resizeToFitContent();
    view.addChild(window);
    window.center();


}

exports.shutdown = function() {

    closeWindow();

}
