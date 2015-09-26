var component = function(self) {

    var width = Atomic.graphics.width;
    var height = Atomic.graphics.height;
    var ratio = width/height;
    var rect = [width/10, height/2, width/2, height];
    // var rect = [0, 0, 200, 200];
    self.start = function() {
      //load a special skin
      Atomic.ui.loadSkin("Ui/touchButtonsSkin.ui");
      //create a new UIView special for ours ui
      var view = new Atomic.UIView();
      view.setPosition(-width/8, height/10);

      var dpad = new Atomic.UILayout();
      dpad.rect = view.rect;
      // dpad.rect = rect;
      //dpad.load("Ui/touchButtonsUI.ui");
      var layoutParamsUpDown = new Atomic.UILayoutParams();
      layoutParamsUpDown.minWidth = 61;
      layoutParamsUpDown.minHeight = 75;
      layoutParamsUpDown.width = 61*2;
      layoutParamsUpDown.height = 75*2;
      layoutParamsUpDown.maxWidth = 61*6;
      layoutParamsUpDown.maxHeight = 75*6;

      var layoutParamsLeftRight = new Atomic.UILayoutParams();
      layoutParamsLeftRight.minWidth = 75;
      layoutParamsLeftRight.minHeight = 61;
      layoutParamsLeftRight.width = 75*2;
      layoutParamsLeftRight.height = 61*2;
      layoutParamsLeftRight.maxWidth = 75*6;
      layoutParamsLeftRight.maxHeight = 61*6;

      self.leftLayout = new Atomic.UILayout();
      self.leftLayout.rect = dpad.rect;
      self.leftButton = new Atomic.UIButton();
      self.leftButton.skinBg = "TouchButtonLeft";
      self.leftButton.layoutParams = layoutParamsLeftRight;
      self.leftLayout.addChild(self.leftButton);
      self.rightLayout = new Atomic.UILayout();
      self.rightButton = new Atomic.UIButton();
      self.rightButton.skinBg = "TouchButtonRight";
      self.rightButton.layoutParams = layoutParamsLeftRight;
      self.rightLayout.addChild(self.rightButton);

      self.upDownLayout = new Atomic.UILayout();
      self.upDownLayout.rect = dpad.rect;
      self.upDownLayout.axis = Atomic.UI_AXIS_Y;
      self.upDownLayout.spacing = 50;
      self.upButton = new Atomic.UIButton();
      self.upButton.skinBg = "TouchButtonUp";
      self.upButton.layoutParams = layoutParamsUpDown;
      self.upDownLayout.addChild(self.upButton);
      self.downButton = new Atomic.UIButton();
      self.downButton.skinBg = "TouchButtonDown";
      self.downButton.layoutParams = layoutParamsUpDown;
      self.upDownLayout.addChild(self.downButton);

      self.rightLayout.layoutSize = Atomic.UI_LAYOUT_SIZE_PREFERRED;
      self.leftLayout.layoutSize = Atomic.UI_LAYOUT_SIZE_PREFERRED;
      self.upDownLayout.layoutSize = Atomic.UI_LAYOUT_SIZE_PREFERRED;

      dpad.addChild(self.leftLayout);
      dpad.addChild(self.upDownLayout);
      dpad.addChild(self.rightLayout);

      view.addChild(dpad);

      self.leftButton.setCapturing(false);
      self.rightButton.setCapturing(false);
      self.upButton.setCapturing(false);

      Atomic.input.bindButton(self.rightButton, Atomic.KEY_D);
      Atomic.input.bindButton(self.leftButton, Atomic.KEY_A);
      Atomic.input.bindButton(self.upButton, Atomic.KEY_SPACE);

      Atomic.input.setTouchEmulation(true);
    }
}

exports.component = component;
