'atomic component';

exports.component = function(self) {

    var node = self.node;

    var animatedSprite = node.getComponent("AnimatedSprite2D");

    self.subscribeToEvent("PlayRun", function() {
        animatedSprite.setAnimation("run");
    });

    self.subscribeToEvent("PlayIdle", function() {
        animatedSprite.setAnimation("idle");
    });

    self.subscribeToEvent("PlayAttack", function() {
        animatedSprite.setAnimation("attack");
    });

    self.subscribeToEvent("PlayHit", function() {
        animatedSprite.setAnimation("hit");
    });

    self.subscribeToEvent("PlayDead", function() {
        animatedSprite.setAnimation("dead");
    });

}