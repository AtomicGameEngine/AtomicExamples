// a flickering light component

var node = self.node;
self.light = node.getComponent("Light");
var baseRange = 45;
var targetValue = baseRange;

flicker = "mmmaaaammmaaaabcdefgabcdefg";
var index = Math.random() * (flicker.length - 1);

// make sure first update catches
time = 100;

function update(timestep) {

	time += timestep;
	if (time > .05)
	{
		index++;
		time = 0.0;
		if (index >= flicker.length)
			index = 0;

		targetValue = baseRange * (flicker.charCodeAt(index)/255);
		
	}
		
	if (self.light.range < targetValue)
		self.light.range += timestep * 10;

	if (self.light.range > targetValue)
		self.light.range -= timestep * 10;

}


