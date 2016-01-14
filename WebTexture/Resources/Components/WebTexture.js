"atomic component";

var webClient = new WebView.WebClient();
var webTexture = new WebView.WebTexture2D();
var texture2D = webTexture.texture2D;
texture2D.filterMode = Atomic.FILTER_TRILINEAR;
webClient.webRenderHandler = webTexture;
webClient.createBrowser("http://www.atomicgameengine.com", 1224, 1224);
var renderMaterial = new Atomic.Material();
renderMaterial.setTechnique(0, Atomic.cache.getResource("Technique", "Techniques/Diff.xml"));
renderMaterial.setTexture(Atomic.TU_DIFFUSE, texture2D);

exports.component = function(self) {

  var model = self.node.getComponent("StaticModel");
  model.setMaterial(renderMaterial);

}
