// Atomic Script

LevelParser = function(tileMap) {

    this.tileMap = tileMap;

    this.entities = [];
    this.parseEntities();

}

LevelParser.prototype = {

    parseEntities: function() {

        entityLayer = this.tileMap.getLayerByName("Entities");

        var platforms = {};

        if (entityLayer) {

            for (var i = 0; i < entityLayer.numObjects; i++) {

                var o = entityLayer.getObject(i);
                var onode = entityLayer.getObjectNode(i);

                var entity = {
                    type: null
                };

                if (o.type == "PlayerSpawn") {

                    entity.type = "PlayerSpawn";
                    entity.position = onode.position2D;

                } else if (o.type == "Vine") {

                    entity.type = "Vine";
                    entity.position = onode.position2D;

                } else if (o.type == "Coin") {

                    entity.type = "Coin";
                    entity.position = onode.position2D;

                } else if (o.type == "Bat") {

                    entity.type = "Bat";
                    entity.position = onode.position2D;

                } else if (o.type == "BatWaypoint") {

                    entity.type = "BatWaypoint";
                    entity.position = onode.position2D;

                } else if (o.type == "PlatformStart") {


                    var pnum = Number(o.getProperty("Platform"));

                    if (!platforms.hasOwnProperty(pnum))
                        platforms[pnum] = [null, null];

                    platforms[pnum][0] = o;

                } else if (o.type == "PlatformStop") {

                    var pnum = Number(o.getProperty("Platform"));

                    if (!platforms.hasOwnProperty(pnum))
                        platforms[pnum] = [null, null];

                    platforms[pnum][1] = o;
                }

                if (entity.type)
                    this.entities.push(entity);

            }

            for (var pnum in platforms) {

                var entity = {
                    type: "MovingPlatform",
                    start: platforms[pnum][0].position,
                    stop: platforms[pnum][1].position
                }

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

    getEntities: function(type) {

        var entities = [];

        for (var i = 0; i < this.entities.length; i++)
            if (this.entities[i].type == type)
                entities.push(this.entities[i]);

        return entities;

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