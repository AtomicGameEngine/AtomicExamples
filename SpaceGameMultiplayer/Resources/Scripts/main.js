
// This script is the main entry point of the game

require("Game");
require("LocalStorage");

// relative require not working for main.js due to how it is being loaded (however, does work elsewhere)
var precache = require("Scripts/precache");
var utils = require("Scripts/utils");
var UI = require("UI/ui");

Atomic.game.init(start, update);

// called at the start of play
function start() {

	precache.precache(true);

	var game = Atomic.game;

	UI.showMainMenu();

	// play some music!
	utils.playMusic("Music/battle.ogg");
	
}

// called per frame
function update(timeStep) {

  UI.update(timeStep);

}
