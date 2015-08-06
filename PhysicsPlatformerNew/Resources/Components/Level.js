
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

  }

  self.update = function(timeStep) {

  }

}

module.exports = component;
