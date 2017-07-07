// code viewer utility
// shows project relative text files
exports.viewCode = function(codeFile, mylayout) {

 	    var window = new Atomic.UIWindow();
    	window.setSettings ( Atomic.UI_WINDOW_SETTINGS_TITLEBAR + Atomic.UI_WINDOW_SETTINGS_RESIZABLE + Atomic.UI_WINDOW_SETTINGS_CLOSE_BUTTON );
    	window.text = "Code Viewer";
   	 	window.load("Scenes/view_code.ui.txt");

    	var filex = Atomic.cache.getFile(codeFile);
    	var textx = filex.readText();
    	window.getWidget("viewCodeText").text = textx;

    	window.resizeToFitContent();
    	mylayout.view.addChild(window);
 	   	window.center();
 		window.getWidget("viewCodeOK").onClick = function () {
       		window.die();
        	window = null;
    	};

};
