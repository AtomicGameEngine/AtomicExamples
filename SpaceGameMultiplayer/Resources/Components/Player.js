'atomic component';

exports.component = function(self) {

  var game = Atomic.game;
  var input = game.input;

  var node = self.node;

  self.allowMove = true;
  self.allowShoot = true;
  self.shootDelta = 0;

  self.health = 10;

  self.onHit = function() {

    var expNode = SpaceGame.myscene.createChild("Explosion");
    var exp = expNode.createJSComponent("Components/Explosion.js", {
      spawnPosition: node.worldPosition2D
    });

    self.health--;

    SpaceGame.hud.updateHealth(self.health);

    //if (self.health == 0) {
    //
    //  SpaceGame.lose();
    //
    //}

  }

  function doShooting(timeStep) {
    if (self.shootDelta > 0) {

      self.shootDelta -= timeStep;
      if (self.shootDelta < 0)
        self.shootDelta = 0;

      return;
    }

    if (!input.getKeyDown(Atomic.KEY_W) && !input.getKeyDown(Atomic.KEY_UP) && !input.getKeyDown(Atomic.KEY_SPACE))
      return;

    self.shootDelta = 0.15;

    var pos = node.position2D;
    pos[1] += .5;

    SpaceGame.spawnBullet(pos, true);

  }

  function moveShip(timeStep) {
    var speed = 3.0 * timeStep;

    var pos = node.position2D;

    var left = false;
    var right = false;


    if (input.getKeyDown(Atomic.KEY_A) || input.getKeyDown(Atomic.KEY_LEFT))
      pos[0] -= speed;

    if (input.getKeyDown(Atomic.KEY_D) || input.getKeyDown(Atomic.KEY_RIGHT))
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

  }

  self.update = function(timeStep) {

    if (self.allowShoot)
      doShooting(timeStep);

    if (self.allowMove)
      moveShip(timeStep);

  }

}
