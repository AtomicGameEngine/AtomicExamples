'use strict';

var mainMenu = require("./mainMenu");
var gameOver = require("./gameOver");
var about = require("./about");
var options = require("./options");

exports.showMainMenu = function() {

    mainMenu.init();
}

exports.showGameOver = function() {

    gameOver.init();
}

exports.showAbout = function(onClose) {

    about.init(onClose);
}

exports.showOptions = function(onClose) {

    options.init(onClose);
}


exports.update = function(timeStep) {


}
