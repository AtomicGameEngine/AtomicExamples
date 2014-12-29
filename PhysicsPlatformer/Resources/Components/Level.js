var node = self.node;

var tmxFile = cache.getResource("TmxFile2D", "Levels/Level1.tmx");



var tileMapNode = scene.createChild("TileMap");
tileMapNode.setPosition([0.0, 0.0, 0.0]);
var tileMap = tileMapNode.createComponent("TileMap2D");
tileMap.setTmxFile(tmxFile);

print(tileMap.numLayers);

cameraNode.setPosition([8, 12, 0]);
camera.setZoom(1.0);

/*

    TileMap2D* tileMap = tileMapNode->CreateComponent<TileMap2D>();
    // Set animation
    tileMap->SetTmxFile(tmxFile);

    // Set camera's position
    const TileMapInfo2D& info = tileMap->GetInfo();
    float x = info.GetMapWidth() * 0.5f;
    float y = info.GetMapHeight() * 0.5f;
    cameraNode_->SetPosition(Vector3(x, y, -10.0f));
    
*/