'atomic component';

exports.component = function(self) {

  var game = Atomic.game;
  var view = game.uiView;
  var UI = Atomic.UI;
  var UIButton = Atomic.UIButton;
  var UITextField = Atomic.UITextField;
  var UILayout = Atomic.UILayout;

  var layout = new Atomic.UIWidget();
  layout.load("UI/Hud.ui.txt");
  layout.setSize(game.graphics.width, game.graphics.height);
  view.addChild(layout);
  
  self.cleanup = function() {
    view.removeChild(layout);
  }

  var scoretext = layout.getWidget("scoretext");

  //UI.debugShowSettingsWindow(view);

  self.updateScore = function(value) {

    scoretext.text = "Score: " + value;

  }

  self.updateHealth = function(value) {

    //healthText.text = "Health: " + value;

  }

  self.updateGameText = function(text) {

    //gameText.text = text;

  }

}
