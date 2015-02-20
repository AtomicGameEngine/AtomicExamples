
// Atomic Component

var game = Atomic.game;
var node = self.node;
var input = game.input;

function start() {

	// input.setTouchEmulation(true);
    var layout = game.cache.getResource("XMLFile", "XML/ScreenJoystick_Platformer.xml");
    var uiStyle = game.cache.getResource("XMLFile", "UI/DefaultStyle.xml");    
    input.addScreenJoystick(layout, uiStyle);

}

function update(timeStep) {

}

/*

input.AddScreenJoystick(layout, cache.GetResource("XMLFile", "UI/DefaultStyle.xml"));

*/
