"atomic component";

// First create a web texture and set filtering mode
var webTexture = new WebView.WebTexture2D();
var texture2D = webTexture.texture2D;
texture2D.filterMode = Atomic.FILTER_TRILINEAR;

// Setup a simple material for the web texture
var webMaterial = new Atomic.Material();
webMaterial.setTechnique(0, Atomic.cache.getResource("Technique", "Techniques/Diff.xml"));
webMaterial.setTexture(Atomic.TU_DIFFUSE, texture2D);

// Create web client with pluggable handlers
var webClient = new WebView.WebClient();
// Set our render handler to be the WebTexture2D we created above
webClient.webRenderHandler = webTexture;
// Create the browser!
webClient.createBrowser("http://www.atomicgameengine.com", 1024, 1024);

exports.component = function(self) {

  // assign the web material to our model component
  var model = self.node.getComponent("StaticModel");
  model.setMaterial(webMaterial);

}
