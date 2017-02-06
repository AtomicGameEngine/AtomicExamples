'atomic component';

//Imp component
exports.component = function(self) {
    //Link to the current node
    var node = self.node;

    var animatedSprite = node.getComponent("AnimatedSprite2D");

    //Listen events and set animation
    self.subscribeToEvent(Atomic.ScriptEvent("PlayRun", function() {
        animatedSprite.setAnimation("run");
    }));

    self.subscribeToEvent(Atomic.ScriptEvent("PlayIdle", function() {
        animatedSprite.setAnimation("idle");
    }));

    self.subscribeToEvent(Atomic.ScriptEvent("PlayAttack", function() {
        animatedSprite.setAnimation("attack");
    }));

    self.subscribeToEvent(Atomic.ScriptEvent("PlayHit", function() {
        animatedSprite.setAnimation("hit");
    }));

    self.subscribeToEvent(Atomic.ScriptEvent("PlayDead", function() {
        animatedSprite.setAnimation("dead");
    }));

};
