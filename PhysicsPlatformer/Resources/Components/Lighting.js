
// Atomic Component

var game = Atomic.game;
var scene = game.scene;
var node = self.node;

var daytime = Platformer.daytime;

function start() {

    // currently lightgroup must be created after viewport 0 is set
    var lightGroup = node.createComponent("Light2DGroup");    
    lightGroup.setPhysicsWorld(Platformer.physicsWorld);
    Platformer.lightGroup = lightGroup;
    
    if (daytime)
        lightGroup.ambientColor = [1, 1, 1, 1];
    else
        lightGroup.ambientColor = [.8, .8, .8, .25];    
    
    if (daytime)
    {
        TheSun = scene.createComponent("DirectionalLight2D");
        TheSun.color = [1, 1, 1, 0.15];
        TheSun.castShadows = true;
        TheSun.numRays = 1024;
        TheSun.backtrace = false;        
        lightGroup.addLight(TheSun);
    }


}

function update(timeStep) {

}