
"atomic component";

var LevelParser = require("LevelParser");

var component = function (self) {

  self.start = function() {

    var tileMap = self.node.getComponent("TileMap2D");
    var tmxFile = tileMap.tmxFile;

    var levelParser = new LevelParser(tileMap);
    levelParser.createPhysics(tileMap, tmxFile);

    var position = levelParser.getSpawnpoint();
    position[1] += 1.5;

    var node = self.scene.createChildPrefab("Player", "Prefabs/Hero.prefab");
    node.position2D = position;

    var platforms = levelParser.getEntities("MovingPlatform");

    for (var i = 0; i < platforms.length; i++) {

        var p = platforms[i];
        var node = self.scene.createChildPrefab("MovingPlatform", "Prefabs/MovingPlatform.prefab");

        node.position2D = p.start;
        node.startPos = p.start;
        node.stopPos = p.stop;
    }

    var coins = levelParser.getEntities("Coin");
    for (var i = 0; i < coins.length; i++) {
        var node = self.scene.createChildPrefab("Coin", "Prefabs/Coin.prefab");
        node.position2D = coins[i].position;
    }

    var waypoints = [];
    var batWaypoints = levelParser.getEntities("BatWaypoint");
    for (var i = 0; i < batWaypoints.length; i++) {
        waypoints.push(batWaypoints[i].position);
    }

    var bats = levelParser.getEntities("Bat");

    for (var i = 0; i < bats.length; i++) {
        var node = self.scene.createChildPrefab("Bat", "Prefabs/Bat.prefab");
        node.position2D = bats[i].position;
        node.scale2D = [.5, .5];
        node.waypoints = waypoints;
    }

    var vines = levelParser.getEntities("Vine");
    for (var i = 0; i < vines.length; i++) {
        var vnode  = self.scene.createChild("Vine");
        vnode.createJSComponent("Components/Vine.js", {startPosition : vines[i].position});
    }



  }

  self.update = function(timeStep) {

  }

}

exports.component = component;
