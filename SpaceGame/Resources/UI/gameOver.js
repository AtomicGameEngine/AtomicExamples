'use strict';

var game = Atomic.game;
var view = game.uiView;
var UI = Atomic.UI;
var UIWindow = Atomic.UIWindow;

var window;

function closeWindow() {

  if (window)
    window.die();
  window = null;

}

exports.init = function() {

  window = new UIWindow();

  window.settings = Atomic.UI.WINDOW_SETTINGS_TITLEBAR;
  window.text = "Game Over";

  window.load("UI/gameOver.ui.txt");
  window.resizeToFitContent();
  view.addChild(window);
  window.center();

  window.getWidget("ok").onClick = function () {

    SpaceGame.cleanup();
    closeWindow();
    var ui = require("./ui");
    ui.showMainMenu();
  }


}

exports.shutdown = function() {

  closeWindow();

}
