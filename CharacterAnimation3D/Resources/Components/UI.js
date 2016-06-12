'atomic component';

//define font description style
var fd = new Atomic.UIFontDescription();
fd.id = "Vera";
fd.size = 22;

function createButton(self, text, event, layout) {
    //create UIButton element
    var button = new Atomic.UIButton();
    //set its text and font description style
    button.text = text;
    button.fontDescription = fd;
    //laying on the right side
    button.gravity = Atomic.UI_GRAVITY_RIGHT;
    //this event will be called when buttons is clicked
    button.onClick = function() {

        self.sendEvent(event);

    };
    //add button
    layout.addChild(button);

}
//UI component
exports.component = function(self) {

    // create a root view
    self.uiView = new Atomic.UIView();
    // Create a layout, otherwise child widgets won't know how to size themselves
    // and would manually need to be sized
    var layout = new Atomic.UILayout();
    layout.rect = self.uiView.rect;

    layout.axis = Atomic.UI_AXIS_Y;

    layout.layoutPosition = Atomic.UI_LAYOUT_POSITION_GRAVITY;
    //add layout to the root view
    self.uiView.addChild(layout);

    createButton(self, "Play Idle", "PlayIdle", layout);
    createButton(self, "Play Walk", "PlayWalk", layout);
    createButton(self, "Play Run", "PlayRun", layout);
    createButton(self, "Play Attack", "PlayAttack", layout);

};
