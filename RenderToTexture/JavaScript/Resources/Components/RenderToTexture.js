"atomic component";
//RenderToTexture component
exports.component = function(self) {
    //Load the current scene, but don't set it as main scene to the player
    var scene = Atomic.player.loadScene("Scenes/RenderToTextureScene.scene");

    self.start = function() {
      //link to the current node
      var node = self.node;

      var model = node.getComponent("StaticModel");

      // Create a renderable texture (1024x1024, RGB format), enable bilinear filtering on it
      var renderTexture = new Atomic.Texture2D();
      renderTexture.setSize(1024, 1024, Atomic.graphics.getRGBFormat(), Atomic.TextureUsage.TEXTURE_RENDERTARGET);
      renderTexture.filterMode = Atomic.TextureFilterMode.FILTER_BILINEAR;

      // Create a new material from scratch, use the diffuse unlit technique, assign the render texture
      // as its diffuse texture, then assign the material box object
      var renderMaterial = new Atomic.Material();
      renderMaterial.setTechnique(0, Atomic.cache.getResource("Technique", "Techniques/Diff.xml"));
      renderMaterial.setTexture(Atomic.TextureUnit.TU_DIFFUSE, renderTexture);
      model.setMaterial(renderMaterial);

      // Get the texture's RenderSurface object (exists when the texture has been created in rendertarget mode)
      // and define the viewport for rendering the second scene, similarly as how backbuffer viewports are defined
      // to the Renderer subsystem. By default the texture viewport will be updated when the texture is visible
      // in the main view

      var camera = scene.getComponents("Camera", true)[0];
      //get surface of the render texture
      var surface = renderTexture.getRenderSurface();
      //create a new viewport
      var rttViewport = new Atomic.Viewport(scene, camera);
      //set rttViewport as a main viewport in the surface
      surface.setViewport(0, rttViewport);

    };

};
