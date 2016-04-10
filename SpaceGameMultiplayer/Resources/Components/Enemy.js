'atomic component';

exports.component = function(self) {

  var game = Atomic.game;
  var node = self.node;

  self.allowShoot = true;
  self.shootDelta = 0;

  var moveDelta = 0;

  var dead = false;

  self.onHit = function() {

    var expNode = SpaceGame.myscene.createChild("Explosion");

    var exp = expNode.createJSComponent("Components/Explosion.js", {
      spawnPosition: node.worldPosition2D
    });

    SpaceGame.removeEnemy(self);

  }

  self.start = function() {

    // install AI
    node.createJSComponent("Components/AI.js");

    var spaceSheet = game.getSpriteSheet("Sprites/spacegame_sheet.xml");

    // add a sprite component to our node
    var sprite2D = self.sprite2D = node.createComponent("StaticSprite2D");
    sprite2D.blendMode = Atomic.BLEND_ALPHA;
    sprite2D.sprite = spaceSheet.getSprite(self.spriteName);

    node.position2D = self.spawnPosition;
    node.roll(180);
    node.scale2D = [0.65, 0.65];

    sprite2D.alpha = 0.0;

    self.dir = (Math.random() > .5);


  }

  // update function called per frame with delta time
  self.update = function(timeStep) {

    // fade in
    var alpha = self.sprite2D.alpha;

    if (alpha < 1) {
      alpha += timeStep * 1.5;
      if (alpha > 1)
        alpha = 1;

      self.sprite2D.alpha = alpha;

    }

    var pos = node.position2D;
    var ppos = SpaceGame.playerNode.position2D;

    if (Math.random() > .98) {
      self.dir = !self.dir;
    }

    moveDelta += (self.dir ? timeStep * 4 : -timeStep * 4);

    pos = [self.spawnPosition[0], self.spawnPosition[1]];
    pos[1] += Math.sin(moveDelta) * .1;
    node.position2D = pos;

  }

}
