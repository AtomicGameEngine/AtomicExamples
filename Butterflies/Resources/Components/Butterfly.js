'atomic component';

var halfWidth = Atomic.graphics.width * Atomic.PIXEL_SIZE * 0.5;
var halfHeight = Atomic.graphics.height * Atomic.PIXEL_SIZE * 0.5;

exports.component = function(self) {

    var node = self.node;
    self.speed = 1 + 2 * Math.random();
    self.rotationSpeed = 10;
    self.direction = Math.random() * Math.PI * 2;
    self.time = 0.0;

    self.start = function() {

        self.pos = node.getPosition2D();
        self.spr = node.getComponent("AnimatedSprite2D");

    }

    self.update = function(timeStep) {

        self.time += timeStep;
        if (self.time % 1000 / 1000 < 0.5) self.desiredDirection = Math.random() * Math.PI * 2;
        self.direction = self.circWrapTo(self.direction, self.desiredDirection, self.rotationSpeed * timeStep);
        self.pos[0] += Math.cos(self.direction) * self.speed * timeStep;
        self.pos[1] += Math.sin(self.direction) * self.speed * timeStep;
        node.position2D = self.pos;
        node.rotation2D = (self.direction + Math.PI * 3 / 2) * (180 / Math.PI);
        if (self.pos[0] < -halfWidth || self.pos[1] < -halfHeight || self.pos[0] > halfWidth || self.pos[1] > halfHeight)
            node.remove();
    }

    self.circWrapTo = function(value, target, step) {
        if (value == target) return target;
        var max = Math.PI * 2;
        var result = value;
        var d = self.wrappedDistance(value, target, max);
        if (Math.abs(d) < step) return target;
        result += (d < 0 ? -1 : 1) * step;
        if (result > max) result = result - max;
        else if (result < 0) result = max + result;
        return result;
    };
    self.wrappedDistance = function(a, b, max) {

        if (a == b) return 0;
        var l;
        var r;
        if (a < b) {
            l = -a - max + b;
            r = b - a;
        } else {
            l = b - a;
            r = max - a + b;
        }
        if (Math.abs(l) > Math.abs(r)) return r;
        else return l;
    };


}