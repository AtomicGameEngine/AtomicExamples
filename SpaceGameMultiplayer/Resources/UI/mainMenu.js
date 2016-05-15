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

  // create a main 2D scene, which will persist
  // the space game itself uses a separate scene we can
  // bring up and tear down
  game.createScene2D();

  var spaceNode = game.scene.createChild("SpaceBackground");
  spaceNode.createJSComponent("Components/SpaceBackground.js");
  
  window.load("UI/mainMenu.ui.txt");
  window.resizeToFitContent();
  view.addChild(window);
  window.center();

  //Explicitly quitting an app is not allowed on iOS
  if(Atomic.platform == "iOS") {
   window.getWidget("quit").visibility = Atomic.UI_WIDGET_VISIBILITY_GONE;
  }
    

  window.getWidget("new_game").onClick = function () {

    closeWindow();

    game.createScene2D();

    var node = game.scene.createChild("SpaceGame");
    node.createJSComponent("Components/SpaceGame.js");
  }

  window.getWidget("about").onClick = function () {
    
    // disable ourselves until ok is clicked on about
    window.setState(UI.WIDGET_STATE_DISABLED, true);

    var ui = require("./ui");
    ui.showAbout(function() {window.setState(UI.WIDGET_STATE_DISABLED, false);});
  }

  window.getWidget("join_server").onClick = function() {
    // disable ourselves until ok is clicked on about
    window.setState(UI.WIDGET_STATE_DISABLED, true);

    var ui = require("./ui");
    ui.showJoinServer(function() {window.setState(UI.WIDGET_STATE_DISABLED, false);});
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

  window.getWidget("join_server").onClick = function () {
    // disable ourselves until ok is clicked on about
    window.setState(UI.WIDGET_STATE_DISABLED, true);

    var ui = require("./ui");
    ui.showJoinServer(function() {window.setState(UI.WIDGET_STATE_DISABLED, false);});
  }

}

exports.shutdown = function() {

  closeWindow();

}

exports.closeMainMenu = function() {
  closeWindow();
}
