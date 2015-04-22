

// This script is the main entry point of the game

require("AtomicGame");

Atomic.script("LevelParser");

var uiConfig = {

	//tbui->Initialize("UI/language/lng_en.tb.txt");
	//tbui->LoadSkin("UI/default_skin/skin.tb.txt", "Skin/skin.tb.txt");
	//tbui->AddFont("UI/fonts/vera.ttf", "Vera");
	//tbui->SetDefaultFont("Vera", 12);

}



Atomic.game.init(start, update);

// called at the start of play
function start() {

	var game = Atomic.game;

	game.input.setMouseVisible(true);

	// create a 2D scene
	game.createScene2D();

	var uiNode = game.scene.createChild("UI");

	if (Atomic.platform == "iOS" || Atomic.platform == "Android")
	    uiNode.createJSComponent("TouchInput");

	uiNode.createJSComponent("UI");

}

// called per frame
function update(timeStep) {


}
