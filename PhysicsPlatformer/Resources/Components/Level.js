var node = self.node;

var tmxFile = cache.getResource("TmxFile2D", "Levels/Level1.tmx");

var tileMapNode = scene.createChild("TileMap");
tileMapNode.setPosition([0.0, 0.0, 0.0]);
var tileMap = tileMapNode.createComponent("TileMap2D");
tileMap.setTmxFile(tmxFile);

cameraNode.setPosition([8, 12, 0]);
camera.setZoom(1.0);
