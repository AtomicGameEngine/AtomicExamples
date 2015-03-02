var game = Atomic.game;
var node = self.node;

var time = 12;

function start() {

    var scene = game.scene;
    
    // Add light flickers
    var lightNodes = scene.getChildrenWithComponent("Light", true);
    for (var i = 0; i < lightNodes.length; i++) {
        lightNodes[i].createJSComponent("LightFlicker");
    }
    
    // create the procedural sky
    var pnode = scene.createChild();
    var procSky = self.procSky = pnode.createComponent("ProcSky");
    
    procSky.setDayTime(time);

    // add the roboman

    var spawnPoint = scene.getChild("PlayerInfoStart", true);

    var roboman = node.createChild("TheRoboMan");
    roboman.createJSComponent("RoboMan");
    if (spawnPoint) {
        roboman.position = spawnPoint.position;
    }

    var musicFile = game.cache.getResource("Sound", "Music/StoryTime.ogg");
    musicFile.looped = true;
    var musicNode = scene.createChild("MusicNode");
    var musicSource = musicNode.createComponent("SoundSource");
    musicSource.gain = .5;
    musicSource.soundType = Atomic.SOUND_MUSIC;
    musicSource.play(musicFile);

}

function update(timeStep) {

    time += timeStep * .08;
    self.procSky.setDayTime(time);
}