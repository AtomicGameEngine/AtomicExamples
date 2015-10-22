"atomic component";

//A paddle component
exports.component = function(self) {
    self.start = function() {
        self.rigidBody = self.node.getComponent("RigidBody2D");

        var chain = new Atomic.CollisionChain2D();
        chain.loop = false;
        chain.setVertexCount(4);
        var halfWidth = Atomic.graphics.width / 2 * Atomic.PIXEL_SIZE;
        var halfHeight = Atomic.graphics.height / 2 * Atomic.PIXEL_SIZE;
        chain.setVertex(0, [-halfWidth, -halfHeight]);
        chain.setVertex(1, [-halfWidth, halfHeight]);
        chain.setVertex(2, [halfWidth, halfHeight]);
        chain.setVertex(3, [halfWidth, -halfHeight]);
        self.node.addComponent(chain, 0, Atomic.LOCAL);
    }
}
