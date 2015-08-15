'atomic component';

var halfWidth = Atomic.graphics.width * Atomic.PIXEL_SIZE * 0.5;
var halfHeight = Atomic.graphics.height * Atomic.PIXEL_SIZE * 0.5;

exports.component = function(self) {

    var node = self.node;
    var light = node.getComponent("PointLight2D");

    light.color = [.1 + Math.random() * .9, .1 + Math.random() * .9, .1 + Math.random() * .9, 1];

    var x = -halfWidth + (halfWidth * 2) * Math.random();
    var y = -halfHeight + (halfHeight * 2) * Math.random();

    node.position2D = [x, y];

    var movex = -2 + (Math.random() * 4);
    var movey = -2 + (Math.random() * 4);

    // Update
    self.update = function(timeStep) {

        var prev = node.position2D;

        node.translate2D([movex * timeStep, movey * timeStep]);

        var p = node.position2D;

        if (p[0] < -halfWidth || p[0] > halfWidth) {
            node.position2D = prev;
            movex = -movex;
        }

        if (p[1] < -halfHeight || p[1] > halfHeight) {
            node.position2D = prev;
            movey = -movey;
        }

    }

}

