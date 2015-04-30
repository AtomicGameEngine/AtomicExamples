

var resources =  {
  "Sprites/space_background.png" : "Texture2D",
  "Music/battle.ogg" : "Sound"
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
