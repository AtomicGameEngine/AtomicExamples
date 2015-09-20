"atomic component"

//Define a Scene component
exports.component = function(self) {
  //we are attaching that component to the Scene, so we are sure that ours node is a scene
  var scene = self.node;
  var time = 12;

  self.start = function() {

      // Add light flickers
      var lightNodes = scene.getChildrenWithComponent("Light", true);
      for (var i = 0; i < lightNodes.length; i++) {
          lightNodes[i].createJSComponent("Components/LightFlicker.js");
      }

      // create the procedural sky
      var pnode = scene.createChild();
      self.procSky = pnode.createComponent("ProcSky");
      self.procSky.setDayTime(time);

      //Create music
      var musicFile = Atomic.cache.getResource("Sound", "Music/StoryTime.ogg");
      //Set it looped
      musicFile.looped = true;
      var musicNode = scene.createChild("MusicNode");
      var musicSource = musicNode.createComponent("SoundSource");
      musicSource.gain = .5;
      musicSource.soundType = Atomic.SOUND_MUSIC;
      musicSource.play(musicFile);

  }

  self.update = function(timeStep) {

      time += timeStep * .08;
      self.procSky.setDayTime(time);
  }
}
