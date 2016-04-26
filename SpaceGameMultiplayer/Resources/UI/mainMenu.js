'use strict';

var game = Atomic.game;
var view = game.uiView;
var UI = Atomic.UI;
var UIWindow = Atomic.UIWindow;

var window;
var clientToServerConnection;

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

    closeWindow();

    // disable ourselves until ok is clicked on about
    //window.setState(UI.WIDGET_STATE_DISABLED, true);

    //var ui = require("./ui");
    //ui.showAbout(function() {window.setState(UI.WIDGET_STATE_DISABLED, false);});

    game.createScene2D();

    Atomic.network.connectToMaster("52.37.100.204", 41234);
    //Atomic.network.connectToMaster("127.0.0.1", 41234);

    Atomic.network.subscribeToEvent("MasterConnectionReady", function() {
      Atomic.network.requestServerListFromMaster();
    });
    
    Atomic.network.subscribeToEvent("MasterServerMessage", function(message) {
      print('In Javascript, MasterServerMessage received');

      var msg = JSON.parse(message['data']);

      if (msg.cmd === 'serverList') {
        var serverList = JSON.parse(msg.servers);

        var server = serverList[0];

        print('First server: ' + JSON.stringify(server));        

        Atomic.network.connectToServerViaMaster(server.connectionId, server.externalIP, server.externalUDPPort, game.scene);
      }
    });

    Atomic.network.subscribeToEvent("ServerConnected", function(data) {
      print("Client Connected to server!");

      clientToServerConnection = Atomic.network.getServerConnection();

      var node = game.scene.createChild("RemotePlayerClient");
      var remotePlayerClient = node.createJSComponent("Components/RemotePlayerClient.js");
      remotePlayerClient.init(clientToServerConnection);
    });
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
