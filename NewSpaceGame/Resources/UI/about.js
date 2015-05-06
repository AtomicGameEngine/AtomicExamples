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

exports.init = function(onClose) {

  window = new UIWindow();

  window.settings = UI.WINDOW_SETTINGS_TITLEBAR;
  window.text = "About Atomic Space Game";

  window.load("UI/about.ui.txt");
  window.resizeToFitContent();
  view.addChild(window);
  window.center();

  window.getWidget("ok").onClick = function () {

    closeWindow();
    onClose();

  }

}

exports.shutdown = function() {

  closeWindow();

}
