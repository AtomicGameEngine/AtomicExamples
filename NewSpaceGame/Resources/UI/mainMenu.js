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
  window.text = "Main Menu";

  window.load("UI/MainMenu.ui.txt");
  window.resizeToFitContent();
  view.addChild(window);
  window.center();

  window.getWidget("new_game").onClick = function () {

    closeWindow();
    
  	var node = game.scene.createChild("SpaceGame");
  	node.createJSComponent("SpaceGame");

  }

}

exports.shutdown = function() {

  closeWindow();

}
