
// Render Box which has a


var game = Atomic.game;
var node = self.node;

var chestScene;
var chestNode;
var chestCamera;


// Create a scene which get's rendered to texture
function createChestScene() {

  chestScene = new Atomic.Scene();

  chestScene.createComponent("Octree");

  // zone
  var zoneNode = chestScene.createChild("Zone")
  var zone = zoneNode.createComponent("Zone");

  zone.boundingBox = [-1000, -1000, -1000, 1000, 1000 , 1000];
  zone.ambientColor = [0.0, 0.0, 0.0];
  zone.fogColor = [.2, .2, .2, 1.0];
  zone.fogStart = 10;
  zone.fogEnd = 100;

  chestNode = chestScene.createChild("Chest");
  chestNode.pitch(-90);

  var model = chestNode.createComponent("StaticModel");
  model.setModel(game.cache.getResource("Model", "Models/Chest.mdl"));
  model.setMaterial(game.cache.getResource("Material", "Materials/Chest.xml"));

  // Create a camera for the render-to-texture scene. Simply leave it at the world origin and let it observe the scene
  var cameraNode = chestScene.createChild("Camera");
  chestCamera = cameraNode.createComponent("Camera");

  cameraNode.position = [0, .5, -4];
  cameraNode.pitch(0);

  chestCamera.farClip = 100;

  // Create a point light to the camera scene node
  var light = cameraNode.createComponent("Light");
  light.lightType = Atomic.LIGHT_POINT;
  light.range = 30;

}


function start() {

    createChestScene();

    var cache = game.cache;

    var model = node.createComponent("StaticModel");
    model.setModel(cache.getResource("Model", "Models/Box.mdl"));

    // Create a renderable texture (1024x1024, RGB format), enable bilinear filtering on it
    var renderTexture = new Atomic.Texture2D();

    renderTexture.setSize(1024, 1024, game.graphics.getRGBFormat(), Atomic.TEXTURE_RENDERTARGET);
    renderTexture.filterMode = Atomic.FILTER_BILINEAR;

    // Create a new material from scratch, use the diffuse unlit technique, assign the render texture
    // as its diffuse texture, then assign the material to the screen plane object
    var renderMaterial = new Atomic.Material();
    renderMaterial.setTechnique(0, game.cache.getResource("Technique", "Techniques/Diff.xml"));
    renderMaterial.setTexture(Atomic.TU_DIFFUSE, renderTexture);
    model.setMaterial(renderMaterial);

    // Get the texture's RenderSurface object (exists when the texture has been created in rendertarget mode)
    // and define the viewport for rendering the second scene, similarly as how backbuffer viewports are defined
    // to the Renderer subsystem. By default the texture viewport will be updated when the texture is visible
    // in the main view
    var surface = renderTexture.getRenderSurface();
    var rttViewport = new Atomic.Viewport(chestScene, chestCamera);
    surface.setViewport(0, rttViewport);

    node.pitch(-90);

}


function update(timeStep) {

   node.roll(timeStep * 15);
   chestNode.roll(timeStep * 75);

}
