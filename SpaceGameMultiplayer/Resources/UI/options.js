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

    
    // Open a file in write mode
    var file = new Atomic.File(documentsDir + PREFS_FILE, Atomic.FILE_WRITE);
    
    var serverName = window.getWidget("server_name").getText();
    var playerName = window.getWidget("player_name").getText();
    
    print(serverName);
    print(playerName);
    
    var mydata = {
      server_name: serverName,
      player_name: playerName
    };
        
    // Convert the data object to a string and write it
    file.writeString(JSON.stringify(mydata));

    // close the file
    file.close();
    
    
    closeWindow();
    onClose();

  }



}

exports.shutdown = function() {

  closeWindow();

}
