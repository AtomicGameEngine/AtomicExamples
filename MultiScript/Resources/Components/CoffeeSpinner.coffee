
# CoffeeScript component

inspectorFields = {
  speed: 1.0
}

class CoffeeSpinner extends Atomic.JSComponent
  constructor: () ->
    super()

  update:(timeStep) ->
    this.node.yaw(timeStep * 75 * this.speed)

module.exports = CoffeeSpinner
