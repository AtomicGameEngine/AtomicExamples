var node = self.node;

var tmxFile = cache.getResource("TmxFile2D", "Levels/Level1.tmx");

var tileMapNode = scene.createChild("TileMap");
tileMapNode.setPosition([0.0, 0.0, 0.0]);

var tileMap = tileMapNode.createComponent("TileMap2D");
tileMap.setTmxFile(tmxFile);

PlayerSpawnPoint = [0, 0];

function parseEntities() {

    entityLayer = tileMap.getLayerByName("Entities");

    if (entityLayer) {

        for (var i = 0; i < entityLayer.numObjects; i++) {
        
            var o = entityLayer.getObject(i);
            var onode = entityLayer.getObjectNode(i);
            
            if ( o.type == "PlayerSpawn")
                PlayerSpawnPoint = onode.position2D;                            

        }
    }
}

function parsePhysics() {

    physicsLayer = tileMap.getLayerByName("Physics");

    if (physicsLayer) {

        for (var i = 0; i < physicsLayer.numObjects; i++) {

            var o = physicsLayer.getObject(i);

            var onode = physicsLayer.getObjectNode(i);
            var group = tmxFile.getTileObjectGroup(o.tileGid);
            var obody = null;

            if (group) {

                for (var j = 0; j < group.numObjects; j++) {

                    var go = group.getObject(j);

                    if (go.validCollisionShape()) {

                        if (!obody) {
                            obody = onode.createComponent("RigidBody2D");
                            obody.bodyType = Atomic.BT_DYNAMIC;
                            obody.awake = false;

                        }

                        var shape = go.createCollisionShape(onode);
                        shape.density = 1.0;
                        shape.friction = .5;
                        shape.restitution = .1;

                    }
                }
            }
        }
    }
}

parsePhysics();
parseEntities();

cameraNode.setPosition([8, 12, 0]);
camera.setZoom(.75);