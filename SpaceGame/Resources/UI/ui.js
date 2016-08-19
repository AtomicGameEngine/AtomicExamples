'use strict';

var mainMenu = require("./mainMenu");
var gameOver = require("./gameOver");
var about = require("./about");
var options = require("./options");

exports.showMainMenu = function() {

   if ( !Atomic.input.isMouseVisible() )
         Atomic.input.setMouseVisible(true);

    mainMenu.init();
};

exports.showGameOver = function() {

   if ( !Atomic.input.isMouseVisible() )
         Atomic.input.setMouseVisible(true);

    gameOver.init();
};

exports.showAbout = function(onClose) {

   if ( !Atomic.input.isMouseVisible() )
         Atomic.input.setMouseVisible(true);

    about.init(onClose);
};

exports.showOptions = function(onClose) {

   if ( !Atomic.input.isMouseVisible() )
         Atomic.input.setMouseVisible(true);

    options.init(onClose);
};


exports.update = function(timeStep) {


};
