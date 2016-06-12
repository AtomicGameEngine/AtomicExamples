// Atomic Script
//It's just a module, so it don't need atomic component string

//Define a constructor
var LevelParser = function(tileMap) {

    this.tileMap = tileMap;

    this.entities = [];
    this.parseEntities();

};
//Define a prototype
LevelParser.prototype = {

    //parsing our entities from tileMap object
    parseEntities: function() {

        var entityLayer = this.tileMap.getLayerByName("Entities");

        var platforms = {};
        //if layer Entities exists
        if (entityLayer) {
            //iterating through each object
            for (var i = 0; i < entityLayer.numObjects; i++) {
                //get object itself
                var o = entityLayer.getObject(i);
                //get node of object
                var onode = entityLayer.getObjectNode(i);

                var entity = {
                    type: null
                };
                //checks for type of object
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
                //if type was found, then push an object to the entities array
                if (entity.type)
                    this.entities.push(entity);

            }

            for (var pnum in platforms) {

                var entity = {
                    type: "MovingPlatform",
                    start: platforms[pnum][0].position,
                    stop: platforms[pnum][1].position
                };

                this.entities.push(entity);
            }

        }

    },

    //returns the first found entity of the given type
    getEntity: function(type) {

        for (var i = 0; i < this.entities.length; i++)
            if (this.entities[i].type == type)
                return this.entities[i];

        return null;

    },

    //returns an array of entities of the given type
    getEntities: function(type) {

        var entities = [];

        for (var i = 0; i < this.entities.length; i++)
            if (this.entities[i].type == type)
                entities.push(this.entities[i]);

        return entities;

    },

    //returns spawnpoint
    getSpawnpoint: function(type) {

        var pos = [0, 0];

        var entity = this.getEntity("PlayerSpawn");
        return entity ? entity.position : pos;

    },

    createPhysics: function(tileMap, tmxFile) {
        //get Physics layer
        var physicsLayer = tileMap.getLayerByName("Physics");

        //if layer exists
        if (physicsLayer) {
            //iterate through each object
            for (var i = 0; i < physicsLayer.numObjects; i++) {
                //get object
                var o = physicsLayer.getObject(i);
                //get node
                var onode = physicsLayer.getObjectNode(i);
                //returns object group
                var group = tmxFile.getTileObjectGroup(o.tileGid);
                var obody = null;
                //if group exists
                if (group) {
                    //iterate through each group object
                    for (var j = 0; j < group.numObjects; j++) {

                        var go = group.getObject(j);

                        if (go.validCollisionShape()) {

                            if (!obody) {
                                //create rigid body
                                obody = onode.createComponent("RigidBody2D");
                                obody.bodyType = Atomic.BT_DYNAMIC;
                                obody.awake = false;
                            }
                            //create a collision shape for our object
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

module.exports = LevelParser;
