"atomic component";

exports.component  = function(self) {

    var camera     = self.node.scene.getComponent("Camera", true);
    var octree     = self.node.scene.getComponent("Octree", true);
    var model      = self.node.getComponent("StaticModel");

    self.uiOsView  = new Atomic.UIOffscreenView();
    model.material = self.uiOsView.material;
    self.uiOsView.registerInput(camera, octree, model);

    // The material property above creates a default material
    // that uses the UIOffscreenView's texture2D. Using the
    // texture2D in a custom material is also possible.

    var widget     = new Atomic.UIWidget();
    widget.load("UI/stuff.tb.txt");
    widget.width   = self.uiOsView.width;
    widget.height  = self.uiOsView.height;
    widget.getWidget("stuff").onClick = function() {
        // Save a PNG of the UI to use as the texture in
        // a geometry editor to give depth to your UI!
        self.uiOsView.savePNG("stuff.png");
    };
    self.uiOsView.addChild(widget);
};
