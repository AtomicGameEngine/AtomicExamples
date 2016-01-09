"atomic component";

var WIDTH = 1080;
var HEIGHT = 600;

// Create the UI view
var view = new Atomic.UIView();

//UI component
exports.component = function(self) {

  function createTab(url) {

    var button = new Atomic.UIButton();
    button.text = url;
    button.urlEnabled = false;
    tabLayout.addChild(button);

    var webView = new WebView.UIWebView(url);
    contentRoot.addChild(webView);

  }

  var window = new Atomic.UIWindow();
  window.text = "UIWebView Example Browser";
  window.setSize(WIDTH, HEIGHT);

  var tabContainer = new Atomic.UITabContainer();
  tabContainer.gravity = Atomic.UI_GRAVITY_ALL;

  var contentRoot = tabContainer.contentRoot;
  var tabLayout = tabContainer.tabLayout;

  createTab("http://atomicgameengine.com/blog/development-digest-4/");
  createTab("https://store.steampowered.com/");
  createTab("https://github.com/AtomicGameEngine/AtomicGameEngine");

  tabContainer.currentPage = 0;

  // Add to main UI view and center
  window.addChild(tabContainer);
  view.addChild(window);
  window.center();

}

// The Web View
//var webView = new WebView.UIWebView("https://ace.c9.io/build/kitchen-sink.html");
//var webView = new WebView.UIWebView("https://store.steampowered.com");
//var webView = new WebView.UIWebView("https://pixlcore.com/demos/webcamjs/demos/basic.html");
//var webView = new WebView.UIWebView("https://getmosh.io/");
//var webView = new WebView.UIWebView("http://www.w3schools.com/tags/tryit.asp?filename=tryhtml_textarea");
