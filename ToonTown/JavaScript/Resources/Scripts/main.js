// This script is the main entry point of the game
//Load scene
if(Atomic.platform == "Android" || Atomic.platform == "iOS") {
    Atomic.renderer.reuseShadowMaps = false;
    Atomic.renderer.shadowQuality = Atomic.ShadowQuality.SHADOWQUALITY_SIMPLE_16BIT;
} else {
    Atomic.renderer.shadowMapSize = 2048;
}

Atomic.input.setMouseVisible(false);

Atomic.player.loadScene("Scenes/ToonTown.scene");
