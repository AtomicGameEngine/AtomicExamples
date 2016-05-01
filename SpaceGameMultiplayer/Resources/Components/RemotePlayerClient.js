'atomic component';

exports.component = function(self) {

  var KEY_LEFT = 1;
  var KEY_RIGHT = 2;
  var KEY_SHOOT = 4;

  var game = Atomic.game;
  var input = game.input;

  self.clientToServerConnection = null;

  self.init = function(_clientToServerConnection) {
    self.clientToServerConnection = _clientToServerConnection;

    var hudnode = game.scene.createChild();
    self.hud = hudnode.createJSComponent("Components/HUD.js");
    
    Atomic.network.subscribeToEvent("NetworkStringMessage", function(msg) {
      var data = JSON.parse(msg['Data']);

      if (data.score) {
        self.updateScore(data.score);
      }
    });
  }

  self.updateScore = function(score) {
    self.hud.updateScore(score);
  }
  
  self.update = function(timeStep) {
    if (!self.clientToServerConnection) {
      return;
    }
    
    var leftKeyDown = false;
    var rightKeyDown = false;
    var shootKeyDown = false;

    if (input.getKeyDown(Atomic.KEY_A) || input.getKeyDown(Atomic.KEY_LEFT))
      leftKeyDown = true;

    if (input.getKeyDown(Atomic.KEY_D) || input.getKeyDown(Atomic.KEY_RIGHT))
      rightKeyDown = true;

    if (input.getKeyDown(Atomic.KEY_W) || input.getKeyDown(Atomic.KEY_UP) || input.getKeyDown(Atomic.KEY_SPACE))
      shootKeyDown = true;

    // Update the connection controls
    self.clientToServerConnection.setControlButtons(KEY_LEFT,leftKeyDown);
    self.clientToServerConnection.setControlButtons(KEY_RIGHT,rightKeyDown);
    self.clientToServerConnection.setControlButtons(KEY_SHOOT,shootKeyDown);
  }

}
