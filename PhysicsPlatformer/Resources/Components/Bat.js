
var glmatrix = require("gl-matrix");
var vec2 = glmatrix.vec2;

"atomic component";

var component = function (self) {

  var node = self.node;

  var sprite = node.getComponent("AnimatedSprite2D")
  sprite.setAnimation("Fly");

  var cwaypoint = -1;

  var time = Math.random() * 10000;

  self.update = function(timestep) {

      time += timestep * 4;

      var waypoints = node.waypoints;
      var pos = node.position2D;

      if (cwaypoint == -1 || vec2.distance(pos, waypoints[cwaypoint]) < .5) {
          cwaypoint = Math.round(Math.random() * (waypoints.length - 1));
          return;
      }

      var dir = vec2.create();
      var goal = waypoints[cwaypoint];

      vec2.subtract(dir, goal, pos);
      vec2.normalize(dir, dir);
      vec2.scale(dir, dir, timestep * 2);

      if (dir[0] < 0)
          sprite.flipX = true;
      else
          sprite.flipX = false;

      vec2.add(pos, pos, dir);
      node.position2D = pos;

  }

}

exports.component = component;
