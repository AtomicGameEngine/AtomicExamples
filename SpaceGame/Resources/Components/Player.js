/* global SpaceGame */
'atomic component';

exports.component = function(self) {

  var game = Atomic.game;
  var input = game.input;

  var node = self.node;

  self.allowMove = true;
  self.allowShoot = true;
  self.shootDelta = 0;

  self.health = 10;

  // joystick support
  self.js_fire = false;
  self.js_left = false;
  self.js_right = false;

  if ( Atomic.input.numJoysticks > 0 ) {

        var scene = SpaceGame.myscene;

        scene.subscribeToEvent("JoystickButtonDown", function(ev) {
           if ( ev.Button == Atomic.CONTROLLER_BUTTON_X
                || ev.Button == Atomic.CONTROLLER_BUTTON_Y
                || ev.Button == Atomic.CONTROLLER_BUTTON_A
	            || ev.Button == Atomic.CONTROLLER_BUTTON_B 
                || ev.Button == Atomic.CONTROLLER_BUTTON_LEFTSHOULDER
                || ev.Button == Atomic.CONTROLLER_BUTTON_RIGHTSHOULDER )
                    self.fire();

            if ( ev.Button == Atomic.CONTROLLER_BUTTON_DPAD_LEFT )
                self.moveLeft();
            if ( ev.Button == Atomic.CONTROLLER_BUTTON_DPAD_RIGHT )
                self.moveRight();
        });

        scene.subscribeToEvent("JoystickButtonUp", function(ev) {
            if ( ev.Button == Atomic.CONTROLLER_BUTTON_DPAD_LEFT 
            || ev.Button == Atomic.CONTROLLER_BUTTON_DPAD_RIGHT )
                self.moveStop();
        });

  }

  self.onHit = function() {

    if ( game.jsid >= 0 ) // has js and not muted
        Atomic.input.joystickRumble (game.jsid, 0.75, 250 );

    var expNode = SpaceGame.myscene.createChild("Explosion");
    var exp = expNode.createJSComponent("Components/Explosion.js", {
      spawnPosition: node.worldPosition2D
    });

    self.health--;

    SpaceGame.hud.updateHealth(self.health);

    if (self.health == 0) {

      SpaceGame.lose();

    }

  };

  function doShooting(timeStep) {
    if (self.shootDelta > 0) {

      self.shootDelta -= timeStep;
      if (self.shootDelta < 0)
        self.shootDelta = 0;

      return;
    }

    if (!input.getKeyDown(Atomic.KEY_W) 
        && !input.getKeyDown(Atomic.KEY_UP) 
        && !input.getKeyDown(Atomic.KEY_SPACE)
        && !self.js_fire )
      return;

    self.shootDelta = 0.15;

    var pos = node.position2D;
    pos[1] += .5;

    SpaceGame.spawnBullet(pos, true);

    self.js_fire = false; // reset js request
  }

  function moveShip(timeStep) {
    var speed = 3.0 * timeStep;

    var pos = node.position2D;

    var left = false;
    var right = false;


    if (input.getKeyDown(Atomic.KEY_A) || input.getKeyDown(Atomic.KEY_LEFT) || self.js_left )
      pos[0] -= speed;

    if (input.getKeyDown(Atomic.KEY_D) || input.getKeyDown(Atomic.KEY_RIGHT) || self.js_right )
      pos[0] += speed;

    if (pos[0] < -SpaceGame.halfWidth + 2)
      pos[0] = -SpaceGame.halfWidth + 2;

    if (pos[0] > SpaceGame.halfWidth - 2)
      pos[0] = SpaceGame.halfWidth - 2;


    node.position2D = pos;

  }

  self.start = function() {

    var spaceSheet = game.getSpriteSheet("Sprites/spacegame_sheet.xml");

    var sprite2D = node.createComponent("StaticSprite2D");
    sprite2D.sprite = spaceSheet.getSprite("spaceship_mantis");
    sprite2D.blendMode = Atomic.BLEND_ALPHA;

    node.position2D = [0, -SpaceGame.halfHeight + .65];

  };

  self.update = function(timeStep) {

    if (self.allowShoot)
      doShooting(timeStep);

    if (self.allowMove)
      moveShip(timeStep);

  };

  self.moveStop = function() {
    self.js_right = false;  // reset js move requests
    self.js_left = false;
  }

  self.moveLeft = function() {
      self.js_left = true;
  }

  self.moveRight = function() {
      self.js_right = true;
  }

  self.fire = function() {
      self.js_fire = true;
  }

};
