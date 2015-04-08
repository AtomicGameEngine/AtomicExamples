var game = Atomic.game;
var node = self.node;

RoboMan = self;

var controller = node.createJSComponent("AvatarController");
var animCtrl = node.createComponent("AnimationController");

var idle = true;
var walk = false;
var run = false;
var jump = false;

function start() {

    var cache = game.cache;

    var model = node.createComponent("AnimatedModel");
    model.setModel(cache.getResource("Model", "Models/RoboMan.mdl"));
    model.setMaterial(cache.getResource("Material", "Materials/Robot_01_Diffuse.xml"));

    model.castShadows = true;

    animCtrl.playExclusive("Models/RoboMan_Normal_Idle.ani", 0, true, 0.0);

    game.cameraNode.position = [0, 5.5, -10];
    
}

// we need an update or it doesn't run the start, fix in JSVM
function update(timeStep) {

    if (idle != controller.idle) {

        idle = controller.idle;

        if (idle)
            animCtrl.playExclusive("Models/RoboMan_Normal_Idle.ani", 0, true, 0.1);
        else if (!idle && walk)
        {
            animCtrl.playExclusive("Models/RoboMan_Normal_Walk.ani", 0, true, 0.1);
        }
        else if (!idle && run)
        {
            animCtrl.playExclusive("Models/RoboMan_Normal_Run.ani", 0, true, 0.1);
        }
        else if (!idle && jump)
        {
            animCtrl.playExclusive("Models/RoboMan_Normal_JumpFall.ani", 0, true, 0.02);
        }
    }

    if (walk != controller.walk) {

        walk = controller.walk;
        jump = controller.jump;
        
        if (walk)
            animCtrl.playExclusive("Models/RoboMan_Normal_Walk.ani", 0, true, 0.1);
        else if (!walk && jump)
        {
            animCtrl.playExclusive("Models/RoboMan_Normal_JumpFall.ani", 0, true, 0.02);
        }
    }

    if (run != controller.run) {

        run = controller.run;
        jump = controller.jump;
        walk = controller.walk;
        
        if (run)
            animCtrl.playExclusive("Models/RoboMan_Normal_Run.ani", 0, true, 0.1);
        else if (!run && walk)
        {
            animCtrl.playExclusive("Models/RoboMan_Normal_Walk.ani", 0, true, 0.1);
        }
        else if (!run && jump)
        {
            animCtrl.playExclusive("Models/RoboMan_Normal_JumpFall.ani", 0, true, 0.02);
        }
    }

    // Plays the jump animation (atm it is just the run animation)
    if (jump != controller.jump) {
    
        jump = controller.jump;

        if (jump) {
            animCtrl.playExclusive("Models/RoboMan_Normal_JumpFall.ani", 0, true, 0.02);
        } else if (!jump && run) {
            animCtrl.playExclusive("Models/RoboMan_Normal_Run.ani", 0, true, 0.1);
            } else if (!jump && walk){
            animCtrl.playExclusive("Models/RoboMan_Normal_Walk.ani", 0, true, 0.1);
            } else {
            animCtrl.playExclusive("Models/RoboMan_Normal_Idle.ani", 0, true, 0.1);
        }
    }
}