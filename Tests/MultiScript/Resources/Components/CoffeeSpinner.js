(function() {
  'atomic component';
  var CoffeeSpinner, inspectorFields,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  inspectorFields = {
    speed: 1.0
  };

  CoffeeSpinner = (function(_super) {
    __extends(CoffeeSpinner, _super);

    function CoffeeSpinner() {
      return CoffeeSpinner.__super__.constructor.apply(this, arguments);
    }

    CoffeeSpinner.prototype.update = function(timeStep) {
      return this.node.yaw(timeStep * 75 * this.speed);
    };

    return CoffeeSpinner;

  })(Atomic.JSComponent);

  module.exports = CoffeeSpinner;

}).call(this);
