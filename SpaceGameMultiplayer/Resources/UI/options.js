'use strict';

var game = Atomic.game;
var view = game.uiView;
var UI = Atomic.UI;
var UIWindow = Atomic.UIWindow;
var localStorage = Atomic.localStorage;

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

  
  window.getWidget("server_name").setText(localStorage.getServerName());
  window.getWidget("player_name").setText(localStorage.getPlayerName());


  blur.onChanged = function() {

    blurSetting = blur.value;

  }

  window.getWidget("ok").onClick = function () {
    
    var serverName = window.getWidget("server_name").getText();
    var playerName = window.getWidget("player_name").getText();
    
    localStorage.setServerName(serverName);
    localStorage.setPlayerName(playerName);
    
    closeWindow();
    onClose();

  }



}

exports.shutdown = function() {

  closeWindow();

}
