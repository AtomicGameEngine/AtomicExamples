'use strict';

var mainMenu = require("./mainMenu");
var gameOver = require("./gameOver");
var about = require("./about");
var options = require("./options");
var joinServer = require("./joinServer");

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

exports.showJoinServer = function(onClose) {

    joinServer.init(onClose);
}

exports.update = function(timeStep) {


}

exports.closeMainMenu = function() {
    mainMenu.closeMainMenu();
}
