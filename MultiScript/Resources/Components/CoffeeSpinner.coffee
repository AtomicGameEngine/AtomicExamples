
# CoffeeScript component

inspectorFields = {
  speed: 1.0
}

class CoffeeSpinner extends Atomic.JSComponent

  update:(timeStep) ->
    this.node.yaw(timeStep * 75 * this.speed)

module.exports = CoffeeSpinner
