exports.playMusic = function(soundFile) {

  var game = Atomic.game;
  var musicFile = game.cache.getResource("Sound", soundFile);
	musicFile.looped = true;
	var musicNode = game.scene.createChild("MusicNode");
	var musicSource = musicNode.createComponent("SoundSource");
	musicSource.gain = .5;
	musicSource.soundType = Atomic.SOUND_MUSIC;
	musicSource.play(musicFile);


}
