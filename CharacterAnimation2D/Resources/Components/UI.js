'atomic component';

var fd = new Atomic.UIFontDescription();
fd.id = "Vera";
fd.size = 22;

function createButton(self, text, event, layout) {

    var button = new Atomic.UIButton();
    button.text = text;
    button.fontDescription = fd;

    button.gravity = Atomic.UI_GRAVITY_RIGHT;

    button.onClick = function() {

        self.sendEvent(event);

    }

    layout.addChild(button);

}

exports.component = function(self) {

    // TODO: fixme
    Atomic.UI.__init();

    // root view
    self.uiView = new Atomic.UIView();

    var layout = new Atomic.UILayout();
    layout.rect = self.uiView.rect;

    layout.axis = Atomic.UI_AXIS_Y;

    layout.layoutPosition = Atomic.UI_LAYOUT_POSITION_GRAVITY;

    self.uiView.addChild(layout);

    createButton(self, "Play Idle", "PlayIdle", layout);
    createButton(self, "Play Run", "PlayRun", layout);
    createButton(self, "Play Attack", "PlayAttack", layout);
    createButton(self, "Play Hit", "PlayHit", layout);
    createButton(self, "Play Dead", "PlayDead", layout);

}