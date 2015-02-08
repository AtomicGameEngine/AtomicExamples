var game = Atomic.game;
var node = self.node;
var cache = game.cache;
var scene = game.scene;

self.init = function(level) {

    self.tmxFile = cache.getResource("TmxFile2D", "Levels/" + level);
    self.tileMap = node.createComponent("TileMap2D");
    self.tileMap.setTmxFile(self.tmxFile);
    self.levelParser = new LevelParser(self.tileMap);
}

function spawnPlayer() {

    var position = self.levelParser.getSpawnpoint();

    self.playerNode = node.createChild("PlayerNode");
    self.player = self.playerNode.createJSComponent("Player");
    self.player.init(position);

}

function start() {

    // create the physics
    self.levelParser.createPhysics(self.tileMap, self.tmxFile);

    // spawn the player
    spawnPlayer();

}

function update(timeStep) {

}