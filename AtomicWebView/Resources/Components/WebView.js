"atomic component";

var WIDTH = 900;
var HEIGHT = 640;
//UI component
exports.component = function(self) {

    //create a new UIView
    var view = new Atomic.UIView();

    // Create a UIWindow
    var window = new Atomic.UIWindow();
    // It will only have a title bar and won't be resizeable or have a close button
    // window.settings = Atomic.UI_WINDOW_SETTINGS_TITLEBAR;
    window.text = "UIWebView";
    window.setSize(WIDTH, HEIGHT);

    // The Web View
    var webView = new WebView.UIWebView("https://ace.c9.io/build/kitchen-sink.html");
    //var webView = new WebView.UIWebView("https://store.steampowered.com");
    //var webView = new WebView.UIWebView("https://pixlcore.com/demos/webcamjs/demos/basic.html");
    //var webView = new WebView.UIWebView("https://getmosh.io/");

    //var webView = new WebView.UIWebView("http://www.w3schools.com/tags/tryit.asp?filename=tryhtml_textarea");


    window.addChild(webView);

    // Add to main UI view and center
    view.addChild(window);
    window.center();

}


/*
var webClient = new WebView.WebClient();
var webTexture2D = new WebView.WebTexture2D(512, 512);

webClient.webRenderHandler = webTexture2D;
WebView.browserHost.createBrowser(webClient);

var inspectorFields = {
    speed: 1.0,
    url: "https://www.youtube.com/watch?v=sGbxmsDFVnE"
}

exports.component = function(self) {

    var sprite = self.node.getComponent("StaticSprite2D");
    sprite.customMaterial = webTexture2D.material;

    self.update = function(timeStep) {

        //self.node.rotate2D(timeStep * 75 * self.speed);

    }

}

*/
