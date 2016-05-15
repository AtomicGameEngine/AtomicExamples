'atomic component';

exports.component = function(self) {

  var game = Atomic.game;
  var node = self.node;

  self.canMove = false;
  self.allowShoot = true;
  self.shootDelta = 0;

  self.start = function() {


  }

  self.update = function(timeStep) {

    if (SpaceGame.gameOver)
      return;

    var pos = node.worldPosition2D;
    var ppos = SpaceGame.playerNode.worldPosition2D;

    if (self.canMove) {

      if (Math.abs(pos[0] - ppos[0]) > .25) {
        if (pos[0] < ppos[0])
          pos[0] += timeStep * .95;
        else
          pos[0] -= timeStep * .95;

        node.position2D = pos;
      }
    }

    if (self.shootDelta > 0) {

      self.shootDelta -= timeStep;

      if (self.shootDelta < 0)
        self.shootDelta = 0;

      return;
    }

    if (Math.abs(pos[0] - ppos[0]) < .25) {

      self.shootDelta = 0.5;

      if (Math.random() > .1)
        return;

      var pos = node.worldPosition2D;
      pos[1] -= .25;
      SpaceGame.spawnBullet(pos, false);
    }

  }

}
