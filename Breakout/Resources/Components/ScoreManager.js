"atomic component";

exports.component = function(self) {
    self.start = function() {
        self.scores = 0;
        self.subscribeToEvent("PhysicsBeginContact2D", function(data){
            //check if a ball collide with brick
            if ((data.nodeA.name == "Ball" && data.nodeB.name.indexOf("Brick")>-1) || (data.nodeB.name == "Ball" && data.nodeA.name.indexOf("Brick")>-1)) {
                //add scores
                self.scores += 10;
                self.updateText();
            }
        });

        var view = new Atomic.UIView();
        // Create a layout, otherwise child widgets won't know how to size themselves
        // and would manually need to be sized
        var layout = new Atomic.UILayout();

        // specify the layout region
        layout.rect = view.rect;

        view.addChild(layout);

        // we're laying out on the X axis so "position" controls top and bottom alignment
        layout.layoutPosition = Atomic.UI_LAYOUT_POSITION_LEFT_TOP;
        // while "distribution" handles the Y axis
        layout.layoutDistributionPosition = Atomic.UI_LAYOUT_DISTRIBUTION_POSITION_LEFT_TOP;

        var fd = new Atomic.UIFontDescription();
        fd.id = "Vera";
        fd.size = 18;

        self.scoreText = new Atomic.UIEditField();
        self.scoreText.fontDescription = fd;
        self.scoreText.readOnly = true;
        self.scoreText.multiline = true;
        self.scoreText.adaptToContentSize = true;
        self.scoreText.text = "Scores: ";
        layout.addChild(self.scoreText);

        self.updateText();
    };

    self.updateText = function() {
        self.scoreText.text = "Score: " + self.scores;
    };
};
