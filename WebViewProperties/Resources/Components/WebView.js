'atomic component';

var WIDTH = Atomic.graphics.width - 100;
var HEIGHT = Atomic.graphics.height - 100;

// Setup some global JS properties that will be available on every page loaded
// into the WebView
WebView.browserHost.setGlobalBoolProperty("WebViewExample", "boolValue", true);
WebView.browserHost.setGlobalNumberProperty("WebViewExample", "numberValue", 42);
WebView.browserHost.setGlobalStringProperty("WebViewExample", "stringValue", "Hello World!");

//UI component
exports.component = function(self) {

  //create a new UIView
  var view = new Atomic.UIView();

  // Create a UIWindow
  var window = new Atomic.UIWindow();
  // It will only have a title bar and won't be resizeable or have a close button
  window.settings = Atomic.UI_WINDOW_SETTINGS_TITLEBAR;
  window.text = "WebView Properties";
  window.setSize(WIDTH, HEIGHT);

  var webView = new WebView.UIWebView("");
  webView.webClient.loadString(getHTML());
  webView.gravity = Atomic.UI_GRAVITY_ALL;
  window.addChild(webView);

  // Add to main UI view and center
  view.addChild(window);
  window.center();

}

// Simple example of access global properties
function getHTML() {

  return "<!DOCTYPE html>\
  <html>\
  <body>\
  \
  <h1>WebView Properties!</h1>\
  \
  <p id=\"boolValue\"></p>\
  <p id=\"numberValue\"></p>\
  <p id=\"stringValue\"></p>\
  \
  <script>\
  document.getElementById(\"boolValue\").innerHTML = \"WebViewExample.boolValue = \" + WebViewExample.boolValue; \
  document.getElementById(\"numberValue\").innerHTML = \"WebViewExample.numberValue = \" + WebViewExample.numberValue; \
  document.getElementById(\"stringValue\").innerHTML = \"WebViewExample.stringValue = \" + WebViewExample.stringValue; \
  </script>\
  \
  </body>\
  </html>"

}
