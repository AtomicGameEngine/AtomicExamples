'atomic component';

var halfWidth = Atomic.graphics.width * Atomic.PIXEL_SIZE * 0.5;
var halfHeight = Atomic.graphics.height * Atomic.PIXEL_SIZE * 0.5;

//Light component
exports.component = function(self) {
    //Link to the current node
    var node = self.node;
    //Get PointLight2D component and set its color
    var light = node.getComponent("PointLight2D");
    light.color = [.1 + Math.random() * .9, .1 + Math.random() * .9, .1 + Math.random() * .9, 1];

    var x = -halfWidth + (halfWidth * 2) * Math.random();
    var y = -halfHeight + (halfHeight * 2) * Math.random();

    //Set position of the current node in the 2D space
    node.position2D = [x, y];

    var movex = -2 + (Math.random() * 4);
    var movey = -2 + (Math.random() * 4);

    // Update function calls one per each frame
    self.update = function(timeStep) {

        var prev = node.position2D;
        //translate node in 2D space on X and Y values
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
