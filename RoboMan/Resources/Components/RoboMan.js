
var game = Atomic.game;
var node = self.node;

RoboMan = self;


function start() {

    var cache = game.cache;

    var model = node.createComponent("AnimatedModel");
    model.setModel(cache.getResource("Model", "Models/RoboMan.mdl"));
    model.setMaterial(cache.getResource("Material", "Materials/Robot_01_Diffuse.xml"));
    
    var animCtrl = node.createComponent("AnimationController");
    animCtrl.playExclusive("Models/RoboMan_Normal_Run.ani", 0, true, 0.0);

    game.cameraNode.position = [0, 2, -10];
    
    node.yaw(180);


}

// we need an update or it doesn't run the start, fix in JSVM
function update(timeStep) {

    node.yaw(timeStep * 100);

}