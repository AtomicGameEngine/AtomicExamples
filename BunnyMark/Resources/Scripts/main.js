// This script is the main entry point of the game

var halfWidth = Atomic.graphics.width * Atomic.PIXEL_SIZE * 0.5;
var halfHeight = Atomic.graphics.height * Atomic.PIXEL_SIZE * 0.5;


var maxX = halfWidth;
var minX = -halfWidth;
var maxY = halfHeight;
var minY = -halfHeight;


Atomic.player.loadScene("Scenes/Scene.scene");

var scene = Atomic.player.currentScene;

var sheet = Atomic.cache.getResource("SpriteSheet2D", "Sprites/bunnys_sheet.xml");

var bunny1 = sheet.getSprite("bunny1");
var bunny2 = sheet.getSprite("bunny2");
var bunny3 = sheet.getSprite("bunny3");
var bunny4 = sheet.getSprite("bunny4");
var bunny5 = sheet.getSprite("bunny5");

var bunnyTextures = [bunny1, bunny2, bunny3, bunny4, bunny5];
var bunnyType = 2;
var currentTexture = bunnyTextures[bunnyType];

var bunnys = [];
var count = 0;
var amount = 10;
var gravity = -0.5;

// TODO: we hold a reference to the node in script, otherwise it is GC'd
// and the object rewrapped every time bunny.node is accessed!

var nodes = [];

var isAdding = false;

scene.subscribeToEvent("MouseButtonDown", function() {

    isAdding = true;

});

scene.subscribeToEvent("MouseButtonUp", function() {

    isAdding = false;
    bunnyType++;
    bunnyType %= 5;
    currentTexture = bunnyTextures[bunnyType];
});


exports.update = function() {

    var scale = [0, 0];

    if (isAdding) {

        if (count < 200000) {

            for (var i = 0; i < amount; i++) {

                var node = scene.createChild();
                nodes.push(node);
                var bunny = node.createComponent("StaticSprite2D");
                bunny.blendMode = Atomic.BLEND_ALPHA;
                bunny.sprite = currentTexture;

                bunny.position = [minX, maxY];
                bunny.speedX = Math.random() * 10;
                bunny.speedY = (Math.random() * 10) - 5;

                //bunny.anchor.y = 1;

                bunnys.push(bunny);


                scale[0] = scale[1] = (0.5 + Math.random() * 0.5);
                bunny.scale2D = scale;

                bunny.rotation2D = (Math.random() - 0.5)
                count++;
            }
        }

    }

    for (var i = 0; i < bunnys.length; i++) {

        var bunny = bunnys[i];
        var p = bunny.position;

        p[0] += bunny.speedX * .002;
        p[1] += bunny.speedY * .002;

        bunny.speedY += gravity;

        if (p[0] > maxX) {
            bunny.speedX *= -1;
            p[0] = maxX;
        } else if (p[0] < minX) {
            bunny.speedX *= -1;
            p[0] = minX;
        }

        if (p[1] > maxY) {
            bunny.speedY = 0;
            p[1] = maxY;
        } else if (p[1] < minY) {
            bunny.speedY *= -0.95;
            //bunny.spin = (Math.random() - 0.5) * 0.2

            if (Math.random() > 0.5) {
                bunny.speedY -= Math.random() * 6;
            }

            p[1] = minY;
        }

        bunny.node.position2D = p;

    }

}


;
