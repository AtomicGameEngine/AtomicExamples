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

var blackAndWhiteSetting = false;
var blurSetting = false;

exports.getOptions = function() {
  return {
    "blackAndWhite": blackAndWhiteSetting,
    "blur": blurSetting,
  }
}

exports.init = function(onClose) {

  window = new UIWindow();

  window.settings = Atomic.UI.WINDOW_SETTINGS_TITLEBAR;
  window.text = "Options";

  window.load("UI/options.ui.txt");
  window.resizeToFitContent();
  view.addChild(window);
  window.center();

  var blackAndWhite = window.getWidget("ppbw");
  var blur = window.getWidget("ppblur");

  blackAndWhite.value = blackAndWhiteSetting;
  blur.value = blurSetting;

  blackAndWhite.onChanged = function() {

    blackAndWhiteSetting = blackAndWhite.value;

  }

  blur.onChanged = function() {

    blurSetting = blur.value;

  }

  window.getWidget("ok").onClick = function () {

    closeWindow();
    onClose();

  }



}

exports.shutdown = function() {

  closeWindow();

}
