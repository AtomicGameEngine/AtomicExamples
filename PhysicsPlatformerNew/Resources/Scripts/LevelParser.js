// Atomic Script

LevelParser = function(tileMap) {

    this.tileMap = tileMap;

    this.entities = [];
    this.parseEntities();

}

LevelParser.prototype = {

    parseEntities: function() {

        entityLayer = this.tileMap.getLayerByName("Entities");

        if (entityLayer) {

            for (var i = 0; i < entityLayer.numObjects; i++) {

                var o = entityLayer.getObject(i);
                var onode = entityLayer.getObjectNode(i);

                entity = {};

                if (o.type == "PlayerSpawn") {

                    entity.type = "PlayerSpawn";
                    entity.position = onode.position2D;
                }

                if (entity.type)
                    this.entities.push(entity);

            }

        }

    },

    getEntity: function(type) {

        for (var i = 0; i < this.entities.length; i++)
            if (this.entities[i].type == type)
                return this.entities[i];

        return null;

    },

    getSpawnpoint: function(type) {

        var pos = [0, 0];

        var entity = this.getEntity("PlayerSpawn");
        return entity ? entity.position : pos;

    },

    createPhysics: function(tileMap, tmxFile) {

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
                            shape.friction = 1.0;
                            shape.restitution = .1;

                        }
                    }
                }
            }
        }
    }
};