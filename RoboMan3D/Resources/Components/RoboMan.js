
var game = Atomic.game;
var node = self.node;

RoboMan = self;

var controller = node.createJSComponent("AvatarController");
var animCtrl = node.createComponent("AnimationController");

var idle = true;

function start() {

    var cache = game.cache;

    var model = node.createComponent("AnimatedModel");
    model.setModel(cache.getResource("Model", "Models/RoboMan.mdl"));
    model.setMaterial(cache.getResource("Material", "Materials/Robot_01_Diffuse.xml"));

    model.castShadows = true;
    
    animCtrl.playExclusive("Models/RoboMan_Normal_Idle.ani", 0, true, 0.0);

    game.cameraNode.position = [0, 5.5, -10];
    game.cameraNode.pitch(20);
    
}

// we need an update or it doesn't run the start, fix in JSVM
function update(timeStep) {

    if (idle != controller.idle) {
    
        idle = controller.idle;
        
        if (idle)
            animCtrl.playExclusive("Models/RoboMan_Normal_Idle.ani", 0, true, 0.1);
        else
            animCtrl.playExclusive("Models/RoboMan_Normal_Run.ani", 0, true, 0.1);
        
    
    }

    

}