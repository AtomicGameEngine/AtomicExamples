
"atomic component";
//requiring LevelParser module
var LevelParser = require("LevelParser");

//A Level
var component = function (self) {
  //start function will be excecuted, after connecting our component to the node, after the constructor
  self.start = function() {
    //get TileMap2D component from our current node
    var tileMap = self.node.getComponent("TileMap2D");
    var tmxFile = tileMap.tmxFile;
    
    //looping main game song
    var music = Atomic.cache.getResource("Sound", "Sounds/JumpingBat.ogg");
    music.looped = true;

    //create LevelParser object
    var levelParser = new LevelParser(tileMap);
    levelParser.createPhysics(tileMap, tmxFile);

    var position = levelParser.getSpawnpoint();
    position[1] += 1.5;

    //create a child prefab
    var node = self.scene.createChildPrefab("Player", "Prefabs/Hero.prefab");
    //set it position to the current node position
    node.position2D = position;

    //get all entities from our map which names MovingPlatform
    var platforms = levelParser.getEntities("MovingPlatform");
    for (var i = 0; i < platforms.length; i++) {

        var p = platforms[i];
        var node = self.scene.createChildPrefab("MovingPlatform", "Prefabs/MovingPlatform.prefab");

        node.position2D = p.start;
        node.startPos = p.start;
        node.stopPos = p.stop;
    }

    //get all entities from our map which names Coin
    var coins = levelParser.getEntities("Coin");
    for (var i = 0; i < coins.length; i++) {
        var node = self.scene.createChildPrefab("Coin", "Prefabs/Coin.prefab");
        node.position2D = coins[i].position;
    }

    //get all entities from our map which names BatWaypoint
    var waypoints = [];
    var batWaypoints = levelParser.getEntities("BatWaypoint");
    for (var i = 0; i < batWaypoints.length; i++) {
        waypoints.push(batWaypoints[i].position);
    }

    //get all entities from our map which names Bat
    var bats = levelParser.getEntities("Bat");
    for (var i = 0; i < bats.length; i++) {
        var node = self.scene.createChildPrefab("Bat", "Prefabs/Bat.prefab");
        node.position2D = bats[i].position;
        node.scale2D = [.5, .5];
        node.waypoints = waypoints;
    }

    //get all entities from our map which names Vine
    var vines = levelParser.getEntities("Vine");
    for (var i = 0; i < vines.length; i++) {
        var vnode  = self.scene.createChild("Vine");
        vnode.createJSComponent("Components/Vine.js", {startPosition : vines[i].position});
    }

  }

}

exports.component = component;
