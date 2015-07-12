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

  window.load("UI/mainMenu.ui.txt");
  window.resizeToFitContent();
  view.addChild(window);
  window.center();

  window.getWidget("new_game").onClick = function () {

    closeWindow();

  	var node = game.scene.createChild("SpaceGame");
  	node.createJSComponent("Components/SpaceGame.js");

  }

  window.getWidget("about").onClick = function () {

    // disable ourselves until ok is clicked on about
    window.setState(UI.WIDGET_STATE_DISABLED, true);

    var ui = require("./ui");
    ui.showAbout(function() {window.setState(UI.WIDGET_STATE_DISABLED, false);});

  }

  window.getWidget("options").onClick = function () {

    // disable ourselves until ok is clicked on about
    window.setState(UI.WIDGET_STATE_DISABLED, true);

    var ui = require("./ui");
    ui.showOptions(function() {window.setState(UI.WIDGET_STATE_DISABLED, false);});

  }


  window.getWidget("quit").onClick = function () {

    game.engine.exit();

  }


}

exports.shutdown = function() {

  closeWindow();

}
