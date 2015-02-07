var game = Atomic.game;
var node = self.node;

var body = node.createComponent("RigidBody2D");
body.bodyType = Atomic.BT_STATIC;
body.castShadows = true;

var circle = node.createComponent("CollisionCircle2D");
circle.radius = .25;

var x = -Light2DExample.halfWidth + (Light2DExample.halfWidth * 2) * Math.random();
var y = -Light2DExample.halfHeight + (Light2DExample.halfHeight * 2) * Math.random();

node.position2D = [x, y];

function start() {

	
}

function update(timeStep) {	


}