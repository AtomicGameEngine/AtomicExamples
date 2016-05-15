'atomic component';

exports.component = function(self) {

  var game = Atomic.game;
  var node = self.node;

  self.isPlayer = false;

  self.init = function(isPlayer, spawnPosition) {

    self.isPlayer = isPlayer;

    var laserSound = game.getSound(self.isPlayer ? "Sounds/laser01.wav" : "Sounds/laser02.wav");
    var sprite2D = node.createComponent("StaticSprite2D");

    if (self.isPlayer)
      sprite2D.sprite = game.getSprite2D("Sprites/blue_beam.png");
    else
      sprite2D.sprite = game.getSprite2D("Sprites/green_beam.png");

    sprite2D.blendMode = Atomic.BLEND_ADDALPHA;

    self.soundSource = node.createComponent("SoundSource");
    self.soundSource.soundType = Atomic.SOUND_EFFECT;
    self.soundSource.gain = 0.75;
    self.soundSource.play(laserSound);

    node.position2D = spawnPosition;

    if (!self.isPlayer) {
      node.roll(180);
    }

  }

  function updateEnemyBullet() {

    var bpos = node.position2D;

    // off the bottom of the screen
    if (bpos[1] < -SpaceGame.halfHeight) {
      return true;
    }

    if (SpaceGame.player) {

      var epos = SpaceGame.player.node.worldPosition2D;

      if (Math.abs(epos[0] - bpos[0]) < 0.25 &&
        Math.abs(epos[1] - bpos[1]) < 0.25) {

        SpaceGame.player.onHit();

        return true;
      }

    }

  }

  function updatePlayerBullet() {

    var bpos = node.position2D;

    // off the top of the screen
    if (bpos[1] > SpaceGame.halfHeight) {
      return true;
    }

    for (var i = 0; i < SpaceGame.enemies.length; i++) {

      var enemy = SpaceGame.enemies[i];

      var epos = enemy.node.worldPosition2D;

      if (Math.abs(epos[0] - bpos[0]) < 0.25 &&
        Math.abs(epos[1] - bpos[1]) < 0.25) {

        enemy.onHit();
        return true;
      }

    }

    if (SpaceGame.capitalShip) {

      var epos = SpaceGame.capitalShip.node.worldPosition2D;

      if (Math.abs(epos[0] - bpos[0]) < 0.75 &&
        Math.abs(epos[1] - bpos[1]) < 0.75) {

        SpaceGame.capitalShip.onHit(bpos);

        return true;
      }

    }

  }

  self.update = function(timeStep) {

    if (!SpaceGame) {
      Atomic.destroy(node);
      return;
    }

    var speed = self.isPlayer ? 8 : 5;
    speed *= timeStep;
    node.translate2D([0, speed]);

    if (self.isPlayer) {
      if (updatePlayerBullet()) {
        Atomic.destroy(node);
      }
    } else {
      if (updateEnemyBullet()) {
        Atomic.destroy(node);
      }
    }

  }

}
