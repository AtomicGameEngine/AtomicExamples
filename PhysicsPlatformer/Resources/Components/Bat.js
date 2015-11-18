//requiring gl-matrix module
//https://github.com/toji/gl-matrix for more information
var glmatrix = require("gl-matrix");
var vec2 = glmatrix.vec2;

"atomic component";

var component = function (self) {

  var node = self.node;

  //get a component from our current node
  var sprite = node.getComponent("AnimatedSprite2D")
  sprite.setAnimation("Fly");

  var cwaypoint = -1;

  var time = Math.random() * 10000;

  self.start = function() {
    var dayTime = require("GlobalVariables").dayTime;
    if(!dayTime) {
      //ok, it's a night, then create a light
      var light = node.createComponent("PointLight2D");
      light.color = [1, 0.1, 0.8, .85];
      light.radius = 1;
    }
  }

  self.update = function(timestep) {

      time += timestep * 4;

      var waypoints = node.waypoints;
      //get node position, returns an array with two elements, the first is x, the second is y
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
      //set position of our node
      node.position2D = pos;

  }

}

exports.component = component;
