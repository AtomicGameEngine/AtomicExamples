
// JavaScript prototype inheritance Component

'atomic component';

var inspectorFields = {
  speed: 1.0
}

function ProtoSpinner() {

    Atomic.JSComponent.call(this);

}

ProtoSpinner.prototype = Object.create(Atomic.JSComponent.prototype);
ProtoSpinner.prototype.constructor = ProtoSpinner;

ProtoSpinner.prototype.update = function(timeStep) {

  this.node.yaw(timeStep * 75 * this.speed);

}

module.exports = ProtoSpinner
