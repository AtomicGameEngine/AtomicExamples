'atomic component';

//define font description style
var fd = new Atomic.UIFontDescription();
fd.id = "Vera";
fd.size = 22;

var particleEmitter;

function createButton(self, text, peffectName, layout) {
    //create UIButton element
    var button = new Atomic.UIButton();
    //set its text and font description style
    button.text = text;
    button.fontDescription = fd;
    //laying on the right side
    button.gravity = Atomic.UI_GRAVITY.UI_GRAVITY_RIGHT;
    //this event will be called when buttons is clicked
    button.onClick = function() {

        particleEmitter.effect = Atomic.cache.getResource("ParticleEffect", "Particles/" + peffectName + ".peffect");

    };
    //add button
    layout.addChild(button);

}
//UI component
exports.component = function(self) {

    particleEmitter = self.getComponent("ParticleEmitter");

    // root view
    self.uiView = new Atomic.UIView();
    // Create a layout, otherwise child widgets won't know how to size themselves
    // and would manually need to be sized
    var layout = new Atomic.UILayout();
    layout.rect = self.uiView.rect;

    layout.axis = Atomic.UI_AXIS.UI_AXIS_Y;

    layout.layoutPosition = Atomic.UI_LAYOUT_POSITION.UI_LAYOUT_POSITION_GRAVITY;
    //add our layout
    self.uiView.addChild(layout);
    //create buttons
    createButton(self, "Disco", "Disco", layout);
    createButton(self, "Fire", "Fire", layout);
    createButton(self, "Smoke", "Smoke", layout);
    createButton(self, "SmokeStack", "SmokeStack", layout);
    createButton(self, "SnowExplosion", "SnowExplosion", layout);

};
