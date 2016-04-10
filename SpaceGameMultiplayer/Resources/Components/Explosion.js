'atomic component';

exports.component = function(self) {

  var game = Atomic.game;
  var node = self.node;
  var cache = game.cache;

  var expSheet = cache.getResource("SpriteSheet2D", "Sprites/explosions_sheet.xml");
  var boomSound = cache.getResource("Sound", "Sounds/boom" + Math.round(Math.random(0, 1)) + ".wav");


  var sprites = [];
  var frame = 0;
  var frameTime = 0;

  // using start to initialize the script component
  self.start = function() {

    var i = Math.round(Math.random() * 7);

    for (var j = 0; j < 16; j++) {
      sprites.push(expSheet.getSprite(i + "_" + j));
    }

    // add a sprite component to our node
    var sprite2D = self.sprite2D = node.createComponent("StaticSprite2D");
    sprite2D.blendMode = Atomic.BLEND_ADDALPHA
    sprite2D.sprite = sprites[0];
    node.position2D = self.spawnPosition;
    node.scale2D = [1.5, 1.5];
    sprite2D.orderInLayer = 200;

    self.soundSource = node.createComponent("SoundSource");
    self.soundSource.soundType = Atomic.SOUND_EFFECT;
    self.soundSource.gain;

    self.soundSource.play(boomSound);

  }

  // update function called per frame with delta time
  self.update = function(timeStep) {

    frameTime += timeStep;
    if (frameTime > .05) {
      frameTime = 0;
      frame++;
      if (frame == 16) {
        Atomic.destroy(node);
        return;
      }

      self.sprite2D.sprite = sprites[frame];
    }

  }

}
