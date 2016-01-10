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

  var layout = new Atomic.UILayout();
  layout.axis = Atomic.UI_AXIS_Y;
  layout.layoutDistribution = Atomic.UI_LAYOUT_DISTRIBUTION_GRAVITY;
  layout.gravity = Atomic.UI_GRAVITY_ALL;

  // address bar
  var addressLayout = new Atomic.UILayout();
  addressLayout.gravity = Atomic.UI_GRAVITY_ALL;
  addressLayout.layoutDistribution = Atomic.UI_LAYOUT_DISTRIBUTION_GRAVITY;

  var backButton = new Atomic.UIButton();
  backButton.text = "Back";
  addressLayout.addChild(backButton);

  var fwdButton = new Atomic.UIButton();
  fwdButton.text = "Forward";
  addressLayout.addChild(fwdButton);

  var reloadButton = new Atomic.UIButton();
  reloadButton.text = "Reload";
  addressLayout.addChild(reloadButton);

  var homeButton = new Atomic.UIButton();
  homeButton.text = "Home";
  addressLayout.addChild(homeButton);

  var addressEdit = new Atomic.UIEditField();
  addressEdit.gravity = Atomic.UI_GRAVITY_ALL;
  addressLayout.addChild(addressEdit);

  layout.addChild(addressLayout);

  // bookmark bar
  var bookmarkLayout = new Atomic.UILayout();
  bookmarkLayout.gravity = Atomic.UI_GRAVITY_ALL;

  var atomicButton = new Atomic.UIButton();
  atomicButton.text = "Atomic Game Engine";
  atomicButton.skinBg = "TBButton.flat";
  bookmarkLayout.addChild(atomicButton);

  var youtubeButton = new Atomic.UIButton();
  youtubeButton.text = "YouTube";
  youtubeButton.skinBg = "TBButton.flat";
  bookmarkLayout.addChild(youtubeButton);

  layout.addChild(bookmarkLayout);

  var tabContainer = new Atomic.UITabContainer();
  tabContainer.gravity = Atomic.UI_GRAVITY_ALL;

  var contentRoot = tabContainer.contentRoot;
  var tabLayout = tabContainer.tabLayout;

  createTab("http://atomicgameengine.com/blog/development-digest-4/");
  createTab("https://store.steampowered.com/");
  createTab("https://github.com/AtomicGameEngine/AtomicGameEngine");

  // Add to main UI view and center
  layout.addChild(tabContainer);
  window.addChild(layout);
  view.addChild(window);
  window.center();

  tabContainer.currentPage = 0;

}

// The Web View
//var webView = new WebView.UIWebView("https://ace.c9.io/build/kitchen-sink.html");
//var webView = new WebView.UIWebView("https://store.steampowered.com");
//var webView = new WebView.UIWebView("https://pixlcore.com/demos/webcamjs/demos/basic.html");
//var webView = new WebView.UIWebView("https://getmosh.io/");
//var webView = new WebView.UIWebView("http://www.w3schools.com/tags/tryit.asp?filename=tryhtml_textarea");
