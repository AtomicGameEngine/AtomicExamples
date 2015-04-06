var game = Atomic.game;
var node = self.node;

var world;

var drawDebug = false;
var debugRenderer;

function start() {

    var scene = game.scene;

    // debug renderer for showing physics
    if (drawDebug)
        debugRenderer = scene.createComponent("DebugRenderer");


    // zone
    var zoneNode = scene.createChild("Zone")
    var zone = zoneNode.createComponent("Zone");
    zone.boundingBox = [-1000, -1000, -1000, 1000, 1000, 1000];
    zone.ambientColor = [0.15, 0.15, 0.15];
    zone.fogColor = [0.5, 0.5, 0.7, 1.0];
    zone.fogStart = 10;
    zone.fogEnd = 100;

    var lightNode = scene.createChild("Directional Light");
    lightNode.direction = [0.6, -1.0, 0.8];
    var light = lightNode.createComponent("Light")
    light.lightType = Atomic.LIGHT_DIRECTIONAL;

    light.castShadows = true;

    // If we're running on android tweak the shadows
    if (Atomic.platform == "Android") {

        light.setShadowCascade(20.0, 50.0, 200.0, 0.0, 0.9);
        light.shadowIntensity = 0.33;
    } else {
        light.setShadowCascade(10.0, 50.0, 200.0, 0.0, 0.8);
    }

    light.setShadowBias(0.00025, 0.5);
    light.specularIntensity = 8;

    // add the roboman
    var roboman = node.createChild("TheRoboMan");
    roboman.createJSComponent("RoboMan");
    roboman.position = [0, 0, -10];
    roboman.scale = [.5, .5, .5];

    // Adding scene elements
    var barrels = node.createChild("Barrels");
    barrels.createJSComponent("Barrels");
    
    var barrels = node.createChild("Barrels02");
    barrels.createJSComponent("Barrels02");
    
    var ground = node.createChild("Ground");
    ground.createJSComponent("Ground");
    
    var fence = node.createChild("Fence");
    fence.createJSComponent("Fence");
    
    var fence = node.createChild("Fence02");
    fence.createJSComponent("Fence02");
    
    var fence = node.createChild("Fence03");
    fence.createJSComponent("Fence03");
    
    var house = node.createChild("House");
    house.createJSComponent("House");
    
    var house = node.createChild("House02");
    house.createJSComponent("House02");
    
    var house = node.createChild("House03");
    house.createJSComponent("House03");
    
    // Adding the bgm
    var musicFile = game.cache.getResource("Sound", "Music/StoryTime.ogg");
    musicFile.looped = true;
    var musicNode = scene.createChild("MusicNode");
    var musicSource = musicNode.createComponent("SoundSource");
    musicSource.gain = .5;
    musicSource.soundType = Atomic.SOUND_MUSIC;
    musicSource.play(musicFile);

}

function postRenderUpdate() {

    world.drawDebugGeometry(debugRenderer, true);

}

// we need an update or it doesn't run the start, fix in JSVM
function update(timeStep) {

    if (drawDebug)
        self.listenToEvent(null, "PostRenderUpdate", postRenderUpdate);

}