
var game = Atomic.game;
var node = self.node;

RoboMan = self;

self.animCtrl = node.createComponent("AnimationController");

var idle = true;

self.playAnimation = function(animation) {

    self.animCtrl.playExclusive("Models/" + animation, 0, true, 0.1);
}

function start() {

    var cache = game.cache;

    var model = node.createComponent("AnimatedModel");
    model.setModel(cache.getResource("Model", "Models/RoboMan.mdl"));
    model.setMaterial(cache.getResource("Material", "Materials/Robot_01_Diffuse.xml"));

    model.castShadows = true;
    
    self.animCtrl.playExclusive("Models/RoboMan_Normal_Walk.ani", 0, true, 0.0);

    game.cameraNode.position = [0, 6.0, -12];
    game.cameraNode.pitch(0);
        
    // Grid Plane
    planeNode = game.scene.createChild("Plane");
    planeNode.scale = [100.0, 1.0, 100.0];
    
    var planeObject = planeNode.createComponent("StaticModel");    
    var planeModel = game.cache.getResource("Model", "Models/Plane.mdl");
    var gridMaterial = game.cache.getResource("Material", "Materials/BlueGrid.xml");

    planeObject.model = planeModel;
    planeObject.material = gridMaterial;
    
    
    node.yaw(120);
    
}

// we need an update or it doesn't run the start, fix in JSVM
function update(timeStep) {

    node.yaw(timeStep * 50);
    planeNode.yaw(timeStep * 50);
    

}