var game = Atomic.game;
var node = self.node;

var time = 12;

function start() {

    var scene = game.scene;
    
    var procSky = self.procSky = scene.createComponent("ProcSky");
    procSky.setDayTime(time); 
    
    var lightNodes = scene.getChildrenWithComponent("Light", true); 
    for (var i = 0; i < lightNodes.length; i++)  {
        lightNodes[i].createJSComponent("LightFlicker");  
    } 

    /*
    // If we're running on android tweak the shadows
    if (Atomic.platform == "Android") {

        light.setShadowCascade(20.0, 50.0, 200.0, 0.0, 0.9);
        light.shadowIntensity = 0.33;
    } else {
        light.setShadowCascade(10.0, 50.0, 200.0, 0.0, 0.8);
    }

    light.setShadowBias(0.00025, 0.5);
    */

    // add the roboman
    var roboman = node.createChild("TheRoboMan");
    roboman.createJSComponent("RoboMan");
    roboman.position = [0, 40, 0];

}

function update(timeStep) {

    time += timeStep * .1;
    self.procSky.setDayTime(time); 
}