'atomic component';

var UI = require("UI/ui");
var options = require("UI/options")

exports.component = function(self) {

  var game = Atomic.game;
  var network;

  // expose ourselves as a global, this is invalid in "use strict"; which perhaps we should be using
  // to enforce better form
  SpaceGame = self;

  createScene();

  self.halfWidth = game.graphics.width * Atomic.PIXEL_SIZE * 0.5;
  self.halfHeight = game.graphics.height * Atomic.PIXEL_SIZE * 0.5;

  var enemyBaseDir = false;
  var enemyBaseNode = self.myscene.createChild("EnemyBaseNode");
  var enemyBasePosX = 0;

  var score = 0;

  self.enemies = [];
  self.gameOver = false;

  self.random = function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  self.spawnBullet = function(pos, isPlayer) {

    var bulletNode = self.myscene.createChild("Bullet");
    var bullet = bulletNode.createJSComponent("Components/Bullet.js");
    bullet.init(isPlayer, pos);
  }

  self.removeEnemy = function(enemy) {

    score += 10;
    self.hud.updateScore(score);
    self.enemies.splice(self.enemies.indexOf(enemy), 1);

    Atomic.destroy(enemy.node);
  }

  self.capitalShipDestroyed = function() {

    score += 1000;

    self.hud.updateScore(score);

    Atomic.destroy(self.capitalShipNode);
    self.capitalShipNode = self.capitalShip = null;

  }


  function spawnEnemies() {

    self.capitalShipNode = self.myscene.createChild("CapitalShip");
    self.capitalShip = self.capitalShipNode.createJSComponent("Components/CapitalShip.js");

    var pos = [0, 0];

    pos[1] = self.halfHeight - 2.5;

    for (var y = 0; y < 2; y++) {

      pos[0] = -4.5;

      for (var x = 0; x < 12; x++) {

        var enemyNode = enemyBaseNode.createChild("Enemy");

        var enemy = enemyNode.createJSComponent("Components/Enemy.js", {
          spriteName: Math.random() < .85 ? "spaceship_louse" : "spaceship_scarab",
          spawnPosition: [pos[0], pos[1]]
        });

        self.enemies.push(enemy);

        pos[0] += 0.75;

      }

      pos[1] -= 0.75;

    }

  }

  function updateEnemies(timeStep) {

    if (!enemyBaseDir)
      enemyBasePosX += timeStep;
    else
      enemyBasePosX -= timeStep;

    var xvalue = 2;

    if (enemyBasePosX > xvalue) {
      enemyBasePosX = xvalue;
      enemyBaseDir = !enemyBaseDir;
    }

    if (enemyBasePosX < -xvalue) {
      enemyBasePosX = -xvalue;
      enemyBaseDir = !enemyBaseDir;
    }

    enemyBaseNode.position2D = [enemyBasePosX, 0];

  }

  self.cleanup = function() {
    //if its a mobile
    if(Atomic.platform == "Android" || Atomic.platform == "iOS") {
      //remove dpad
      Atomic.game.dpad.remove();
      //remove fireButton
      Atomic.game.uiView.removeChild(self.fireButton);
    }
    game.renderer.setViewport(1, null);

    self.hud.cleanup();
    Atomic.destroy(self.myscene);

    // our node is in the main scene
    Atomic.destroy(self.node);

    SpaceGame = null;


  }

  self.win = function() {

    self.hud.updateGameText("YOU WIN!!!!");
    self.gameOver = true;
    UI.showGameOver();
    //self.cleanup();

  }

  self.lose = function() {

    self.hud.updateGameText("YOU LOSE!!!!");
    self.gameOver = true;
    UI.showGameOver();
    //self.cleanup();

  }

  function spawnPlayer() {

    self.playerNode = self.myscene.createChild("Player");
    self.player = self.playerNode.createJSComponent("Components/Player.js");
  }

  function createScene() {

    var scene = new Atomic.Scene();
    scene.createComponent("Octree");

    var cameraNode = scene.createChild("Camera");
    cameraNode.position = [0.0, 0.0, -10.0];

    var camera = cameraNode.createComponent("Camera");
    camera.orthographic = true;
    camera.orthoSize = game.graphics.height * Atomic.PIXEL_SIZE;

    var viewport = new Atomic.Viewport(scene, camera);

    // assign a render path to our viewport which doesn't clear the screen
    // so can be used to composite
    var renderPathXML = game.cache.getResource("XMLFile", "Data/RenderPath.xml");
    viewport.renderPath = renderPathXML;

    // Example of appending a post process filter
    if (options.getOptions().blackAndWhite)
      viewport.renderPath.append(game.cache.getResource("XMLFile", "PostProcess/GreyScale.xml"));
    if (options.getOptions().blur)
      viewport.renderPath.append(game.cache.getResource("XMLFile", "PostProcess/Blur.xml"));


    game.renderer.setViewport(1, viewport);

    // this is component getScene property (there is no setter on it)
    // this should be an error, think I saw somewhere you can raise errors on
    // get/set of a prop when the get/set missing
    self.myscene = scene;
    self.cameraNode = cameraNode;
    self.camera = camera;
    self.viewport = viewport;

  }


  self.start = function() {

    var hudnode = self.myscene.createChild();
    self.hud = hudnode.createJSComponent("Components/HUD.js");
    //if its a mobile
    if(Atomic.platform == "Android" || Atomic.platform == "iOS") {
      //require ours dpad module
      var DPad = require("DPad");
      //create dpad
      var dpad = new DPad();
      //add only horizontal buttons
      dpad.addHorizontal();
      //init with existing ui
      dpad.init(Atomic.game.uiView);
      //set X spacing
      dpad.setSpacingX(50);

      Atomic.game.dpad = dpad;

      //create a jump button
      self.fireButton = new Atomic.UIButton();
      //unset its skin, because we will use UIImageWidget
      self.fireButton.skinBg = "";
      //create ours fire button image
      var fireButtonImage = new Atomic.UIImageWidget();
      //load image
      fireButtonImage.setImage("UI/fireButton.png");
      //resize ours image by 2.2x
      var fireButtonWidth = fireButtonImage.imageWidth*2.2;
      var fireButtonHeight = fireButtonImage.imageHeight*2.2;
      //calculate position
      var posX = Atomic.graphics.width - Atomic.graphics.width/8-fireButtonWidth/2;
      var posY = Atomic.graphics.height - Atomic.graphics.height/4-fireButtonHeight/2;

      //sets fireButton rect, specify position and end position
      self.fireButton.rect = [posX, posY, posX+fireButtonWidth, posY+fireButtonHeight];
      //sets fireButtonImage rect, we specify there only end position
      fireButtonImage.rect = [0, 0, fireButtonWidth, fireButtonHeight];
      //adds image to fireButton
      self.fireButton.addChild(fireButtonImage);
      //adds fireButton to the dpad view
      dpad.view.addChild(self.fireButton);
      //sets fireButton capturing to false, because we wanna make it multitouchable
      self.fireButton.setCapturing(false);
      //binds fireButton to KEY_SPACE
      Atomic.input.bindButton(self.fireButton, Atomic.KEY_SPACE);
    }

    var spaceNode =self.myscene.createChild("SpaceBackground");
    spaceNode.createJSComponent("Components/SpaceBackground.js");

    spawnPlayer();
    spawnEnemies();

    // Start server
    network = new Atomic.Network();

    network.startServer(27000, self.myscene);

    network.subscribeToEvent("ClientConnected", function(data) {
      var connection = data["Connection"];

      print("Client Connected!");
      print(connection.getPort());

      connection.setScene(self.myscene);
    });
  }


  self.update = function(timeStep) {

    updateEnemies(timeStep);

  }
}
