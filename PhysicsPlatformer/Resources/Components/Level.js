/*
 * The Level
 */

var glmatrix = require("gl-matrix");
var vec2 = glmatrix.vec2;

TheLevel = self;

var node = self.node;

var tmxFile = cache.getResource("TmxFile2D", "Levels/Level1.tmx");

var tileMapNode = scene.createChild("TileMap");
tileMapNode.setPosition([0.0, 0.0, 0.0]);

var tileMap = tileMapNode.createComponent("TileMap2D");
tileMap.setTmxFile(tmxFile);

PlayerSpawnPoint = [0, 0];

var platforms = {};

self.coinNodes = [];
self.batNodes = [];

// vec2
self.batWaypoints = [];

// parsed coins
var coins = [];
var bats = [];

var beginContactCallbacks = {};


self.onPhysicsBeginContact2D = function(world, bodyA, bodyB, nodeA, nodeB) {

    if (beginContactCallbacks.hasOwnProperty(nodeA)) {
        beginContactCallbacks[nodeA](world, bodyA, bodyB, nodeA, nodeB);
    }

}


// create a platform based on start and stop TileMapObject2D

function createPlatform(start, stop) {

    var platformNode = scene.createChild("Platform");
    platform = platformNode.createComponent("JSComponent");

    // setting the classname calls start, we need a way to provide
    // component values before this, as anything is the component function
    // will override the values set before className is set
    // for now, this works
    platform.startPos = start.position;
    platform.stopPos = stop.position;
    platform.className = "Platform";

}

function createCoin(obj) {

    var coinNode = scene.createChild("Coin");
    coinNode.position2D = obj.position;
    coinNode.createJSComponent("Coin");
    self.coinNodes.push(coinNode);
}

function createBat(obj) {

    var batNode = scene.createChild("Bat");
    batNode.position2D = obj.position;
    batNode.createJSComponent("Bat");
    self.batNodes.push(batNode);
}


function parseEntities() {

    entityLayer = tileMap.getLayerByName("Entities");

    if (entityLayer) {

        for (var i = 0; i < entityLayer.numObjects; i++) {

            var o = entityLayer.getObject(i);
            var onode = entityLayer.getObjectNode(i);

            if (o.type == "PlayerSpawn")
                PlayerSpawnPoint = onode.position2D;
            else if (o.type == "PlatformStart") {
                var pnum = Number(o.getProperty("Platform"));

                if (!platforms.hasOwnProperty(pnum))
                    platforms[pnum] = [null, null];

                platforms[pnum][0] = o;
            } else if (o.type == "PlatformStop") {
                var pnum = Number(o.getProperty("Platform"));

                if (!platforms.hasOwnProperty(pnum))
                    platforms[pnum] = [null, null];

                platforms[pnum][1] = o;
            } else if (o.type == "Coin") {

                coins.push(o);

            } else if (o.type == "Bat") {

                bats.push(o);

            } else if (o.type == "BatWaypoint") {

                self.batWaypoints.push(o.position);

            }

        }
    }

    for (var pnum in platforms) {

        createPlatform(platforms[pnum][0], platforms[pnum][1]);

    }

    for (var i in coins) {

        createCoin(coins[i]);

    }

    for (var i in bats) {

        createBat(bats[i]);

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
                        shape.friction = 1.0;
                        shape.restitution = .1;

                        if (o.type == "Crate") {
                            /*
                            var soundSource = onode.createComponent("SoundSource");
                            soundSource.soundType = Atomic.SOUND_EFFECT;
                            soundSource.gain = .25;
                            var crateSound = cache.getResource("Sound", "Sounds/CrateHit.ogg");
                            beginContactCallbacks[onode] = function(world, bodyA, bodyB, nodeA, nodeB) {

                                var vel = obody.linearVelocity;
                                if (vec2.length(vel) > 2) {
                                    soundSource.play(crateSound);
                                }
                            }
                            */
                        }
                    }
                }
            }
        }
    }
}

function start() {
    self.listenToEvent(null, "PhysicsBeginContact2D", self.onPhysicsBeginContact2D);
    parsePhysics();
    parseEntities();

}