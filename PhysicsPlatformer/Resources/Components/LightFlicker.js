
// a flickering light component

var node = self.node;
self.light = node.getComponent("PointLight2D");
var baseRange = self.light.radius;
var targetValue = baseRange;


flicker = "mmmaaaammmaaaabcdefgabcdefg";
var index = Math.random() * (flicker.length - 1);

// make sure first update catches
time = 100;

self.light.radius = baseRange * flicker.charCodeAt(index)/255;

function update(timestep) {

	time += timestep;
	if (time > .025)
	{
		index++;
		time = 0.0;
		if (index >= flicker.length)
			index = 0;

		targetValue = baseRange * (flicker.charCodeAt(index)/255);
		
	}

	if (self.light.radius< targetValue)
		self.light.radius += timestep * 2;

	if (self.light.radius > targetValue)
		self.light.radius -= timestep * 2;
		
    self.light.softShadowLength = self.light.radius;
		

}

