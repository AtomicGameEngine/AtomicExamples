var game = Atomic.game;
var node = self.node;

var light = node.createComponent("PointLight2D");
light.color = [.1 + Math.random() * .9, .1 + Math.random() * .9, .1 + Math.random() * .9, 1];
light.radius = 4;
light.castShadows = true;
light.softShadows = true;
light.numRays = 512;


Light2DExample.lightGroup.addLight(light);

var x = -Light2DExample.halfWidth + (Light2DExample.halfWidth * 2) * Math.random();
var y = -Light2DExample.halfHeight + (Light2DExample.halfHeight * 2) * Math.random();

node.position2D = [x, y];

var movex = -2 + (Math.random() * 4);
var movey = -2 + (Math.random() * 4);

function start() {


}

function update(timeStep) {

    var prev = node.position2D;

    node.translate2D([movex * timeStep, movey * timeStep]);

    var p = node.position2D;

    if (p[0] < -Light2DExample.halfWidth || p[0] > Light2DExample.halfWidth) {
        node.position2D = prev;
        movex = -movex;
    }
    
    if (p[1] < -Light2DExample.halfHeight || p[1] > Light2DExample.halfHeight) {
        node.position2D = prev;
        movey = -movey;
    }

}