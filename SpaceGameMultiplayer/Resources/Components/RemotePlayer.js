'atomic component';

exports.component = function(self) {

  var game = Atomic.game;
  var input = game.input;

  var KEY_LEFT = 1;
  var KEY_RIGHT = 2;
  var KEY_SHOOT = 4;

  var node = self.node;

  self.allowMove = true;
  self.allowShoot = true;
  self.shootDelta = 0;

  self.health = 10;

  self.serverToClientConnection = null;

  self.init = function(_serverToClientConnection) {
    print("RemotePlayer is now intialized!!!");
    self.serverToClientConnection = _serverToClientConnection;

    print("Testing Port");
    print( self.serverToClientConnection.getPort());
  }

  self.onHit = function() {

    var expNode = SpaceGame.myscene.createChild("Explosion");
    var exp = expNode.createJSComponent("Components/Explosion.js", {
      spawnPosition: node.worldPosition2D
    });

    self.health--;

    SpaceGame.hud.updateHealth(self.health);

    if (self.health == 0) {

      SpaceGame.lose();

    }

  }

  function isKeyDown(key) {
    if (!self.serverToClientConnection) {
      return false;
    }

    return self.serverToClientConnection.isControlButtonDown(key);
  }

  function doShooting(timeStep) {
    if (self.shootDelta > 0) {

      self.shootDelta -= timeStep;
      if (self.shootDelta < 0)
        self.shootDelta = 0;

      return;
    }

    if (!isKeyDown(KEY_SHOOT))
      return;

    self.shootDelta = 0.15;

    var pos = node.position2D;
    pos[1] += .5;

    SpaceGame.spawnBullet(pos, true);

  }

  function moveShip(timeStep) {
    var speed = 3.0 * timeStep;

    var pos = node.position2D;

    if (isKeyDown(KEY_LEFT))
      pos[0] -= speed;

    if (isKeyDown(KEY_RIGHT))
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

    node.position2D = [SpaceGame.halfWidth, -SpaceGame.halfHeight + .65];

  }

  self.update = function(timeStep) {

    if (!self.serverToClientConnection) {
      return;
    }

    if (self.allowShoot)
      doShooting(timeStep);

    if (self.allowMove)
      moveShip(timeStep);

  }

}
