require('AtomicEventLoop');

setTimeout(function() {
    Atomic.player.loadScene("Scenes/Blank.scene");
}, 1);

function update(timeStep) {

}

exports.update = update;
