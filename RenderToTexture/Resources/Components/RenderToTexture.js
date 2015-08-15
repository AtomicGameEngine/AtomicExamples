"atomic component";

var component = function(self) {

    var node = self.node;
    var model = node.getComponent("StaticModel");

    var scene = Atomic.player.loadScene("Scenes/RenderToTextureScene.scene");

    // Create a renderable texture (1024x1024, RGB format), enable bilinear filtering on it

    var renderTexture = new Atomic.Texture2D();
    renderTexture.setSize(1024, 1024, Atomic.graphics.getRGBFormat(), Atomic.TEXTURE_RENDERTARGET);
    renderTexture.filterMode = Atomic.FILTER_BILINEAR;

    // Create a new material from scratch, use the diffuse unlit technique, assign the render texture
    // as its diffuse texture, then assign the material box object
    var renderMaterial = new Atomic.Material();
    renderMaterial.setTechnique(0, Atomic.cache.getResource("Technique", "Techniques/Diff.xml"));
    renderMaterial.setTexture(Atomic.TU_DIFFUSE, renderTexture);
    model.setMaterial(renderMaterial);

    // Get the texture's RenderSurface object (exists when the texture has been created in rendertarget mode)
    // and define the viewport for rendering the second scene, similarly as how backbuffer viewports are defined
    // to the Renderer subsystem. By default the texture viewport will be updated when the texture is visible
    // in the main view

    var cameras = scene.getComponents("Camera", true);

    var surface = renderTexture.getRenderSurface();
    var rttViewport = new Atomic.Viewport(scene, cameras[0]);
    surface.setViewport(0, rttViewport);

    self.start = function() {

    }

    self.update = function(timeStep) {

    }

}

exports.component = component;