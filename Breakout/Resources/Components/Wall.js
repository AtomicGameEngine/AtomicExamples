"atomic component";

//A Wall component
exports.component = function(self) {
    self.start = function() {
        //get rigid body component
        self.rigidBody = self.node.getComponent("RigidBody2D");

        //create a new chain to define a wall
        var chain = new Atomic.CollisionChain2D();
        chain.loop = false;
        //set vertex cound to 4
        chain.setVertexCount(4);
        var zoom = self.node.scene.getMainCamera().zoom;
        var halfWidth = Atomic.graphics.width / 2 * Atomic.PIXEL_SIZE / zoom;
        var halfHeight = Atomic.graphics.height / 2 * Atomic.PIXEL_SIZE / zoom;
        //define vertexes
        chain.setVertex(0, [-halfWidth, -halfHeight]);
        chain.setVertex(1, [-halfWidth, halfHeight]);
        chain.setVertex(2, [halfWidth, halfHeight]);
        chain.setVertex(3, [halfWidth, -halfHeight]);
        //add a CollisionChain2D component
        self.node.addComponent(chain, 0, Atomic.LOCAL);
    }
}
