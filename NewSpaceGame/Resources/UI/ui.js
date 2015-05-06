'use strict';

var mainMenu = require("./mainMenu");
var gameOver = require("./gameOver");
var about = require("./about");

exports.showMainMenu = function() {

    mainMenu.init();
}

exports.showGameOver = function() {

    gameOver.init();
}

exports.showAbout = function(onClose) {

    about.init(onClose);
}


exports.update = function(timeStep) {


}
