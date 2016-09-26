"atomic component";

//A PhysicsDebug component
exports.component = function(self) {
    self.start = function() {
        //we get a debugRenderer from the scene, if scene doesn't have one, it won't work
        var debug = self.scene.getComponent("DebugRenderer");
        var world = self.scene.getComponent("PhysicsWorld2D");
        //we excecute drawDebugGeometry function to render world debug geometry
        self.subscribeToEvent("PostRenderUpdate",function(_) {
            world.drawDebugGeometry();
        });
    };
};
