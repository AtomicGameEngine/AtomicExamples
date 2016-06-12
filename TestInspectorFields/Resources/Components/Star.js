"atomic component";

var inspectorFields = {
  booleanField: true,
  numberField: 1.0,
  stringField: "Hello",
  intEnumField: [Atomic.VAR_INT, ["Peaceful", "Friendly", "Aggressive"], 0],
  varField: [Atomic.VAR_INT, 42],
  vector2Field: [Atomic.VAR_VECTOR2, [1, 2]],
  vector3Field: [Atomic.VAR_VECTOR3, [1, 2, 3]],
  quaternionField: [Atomic.VAR_QUATERNION, [1, 0, 0, 0]],
  colorField: [Atomic.VAR_COLOR, [1, 2, 3, 4]],
  texture2DNoDefault: ["Texture2D"],
  sprite2D: ["Sprite2D", "Sprites/star.png"]
};

exports.component = function(self) {

  self.update = function(timeStep) {

    self.node.rotate2D(timeStep * 75 * self.numberField);

  };

};
