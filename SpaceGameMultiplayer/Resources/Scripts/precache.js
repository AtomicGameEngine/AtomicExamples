

var resources =  {
  "Sprites/space_background.png" : "Texture2D",
  "Music/battle.ogg" : "Sound",
  "Sounds/boom0.wav" : "Sound",
  "Sounds/boom1.wav" : "Sound",
  "Sounds/laser01.wav" : "Sound",
  "Sounds/laser02.wav" : "Sound",
  "Sprites/explosions_sheet.xml" : "SpriteSheet2D"
}

// precache resources so they are ready to go
exports.precache = function(verbose) {

  var game = Atomic.game;

  Object.keys(resources).forEach(function(key) {
    game.cache.getResource(resources[key], key);
    if (verbose)
      print("Precaching: ", resources[key], " ", key);
  });

}
