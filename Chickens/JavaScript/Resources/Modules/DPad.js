function DPad() {

    var width = Atomic.graphics.width;
    var height = Atomic.graphics.height;
    //create a new view for ours dpad
    //horizontal buttons sizeX, sizeY
    var horizButtonsSize = [75, 61];
    var verticButtonsSize = [61, 75];
    var dpadSpacingX = -30;
    var dpadSpacingY = 30;
    //init function should be called adding vertical/horizontal buttons
    //it's like we are commiting ours buttons
    this.init = function(view) {
      if (view) this.view = view;
      else this.view = new Atomic.UIView();
      //if  touch buttons skin is not loaded
      if(!DPad.skinLoaded) {
        //load skin
        Atomic.ui.loadSkin("UI/DPadSkin.ui");
        DPad.skinLoaded = true;
      }
      //create a dpad layout
      this.dpad = new Atomic.UILayout();
      this.dpad.rect = this.view.rect;
      if(this.leftLayout)
        this.leftLayout.rect = this.dpad.rect;
      if(this.rightLayout)
        this.rightLayout.rect = this.dpad.rect;
      if(this.upDownLayout)
        this.upDownLayout.rect = this.dpad.rect;
      //sets dpad position
      //move buttons a bit closer to each other
      this.dpad.spacing = dpadSpacingX;
      if(this.upDownLayout)
        this.upDownLayout.spacing = dpadSpacingY;
      //if layouts are exists, add them
      if(this.leftLayout)
        this.dpad.addChild(this.leftLayout);
      if(this.upDownLayout)
        this.dpad.addChild(this.upDownLayout);
      if(this.rightLayout)
        this.dpad.addChild(this.rightLayout);
      //ok, add ours dpad to the view
      this.view.addChild(this.dpad);
      //if we are using special view for dpad
      if(!view) {
        //update its size and position
        this.updateViewSize();
        this.setPosition(width/20, height/2);
      } else {
        //if we are using custom view, then just set dpad position
        this.dpad.setPosition(-width/3, height/4);
      }
    };
    //adds horizontal and vertical buttons
    this.addAll = function() {
      //adds horizontal buttons
      this.addHorizontal();
      //adds vertical buttons
      this.addVertical();

    };
    //adds horizontal buttons
    this.addHorizontal = function() {
      //if layout params doesn't exist create a new one
      if(!this.layoutParamsLeftRight) this.initLeftRightLayoutParams();
      //new layout for left button
      this.leftLayout = new Atomic.UILayout();
      this.leftLayout.layoutSize = Atomic.UI_LAYOUT_SIZE_PREFERRED;
      //create a left button
      this.leftButton = new Atomic.UIButton();
      this.leftButton.skinBg = "TouchButtonLeft";
      this.leftButton.layoutParams = this.layoutParamsLeftRight;
      this.leftLayout.addChild(this.leftButton);
      //new layout for right button
      this.rightLayout = new Atomic.UILayout();
      this.rightLayout.layoutSize = Atomic.UI_LAYOUT_SIZE_PREFERRED;
      //create a right button
      this.rightButton = new Atomic.UIButton();
      this.rightButton.skinBg = "TouchButtonRight";
      this.rightButton.layoutParams = this.layoutParamsLeftRight;
      this.rightLayout.addChild(this.rightButton);


      //it makes ours buttons uncaptured, this is used for the multiTouch, to don't `concentrate` only on one button
      this.leftButton.setCapturing(false);
      this.rightButton.setCapturing(false);

      //bind our ui button to the specified Keyboard Key
      Atomic.input.bindButton(this.rightButton, Atomic.KEY_RIGHT);
      Atomic.input.bindButton(this.leftButton, Atomic.KEY_LEFT);

    };
    //adds vertical buttons
    this.addVertical = function() {
      //if layout params doesn't exist create a new one
      if(!this.layoutParamsUpDown) this.initUpDownLayoutParams();
      //create a new layout for up and down buttons
      this.upDownLayout = new Atomic.UILayout();
      this.upDownLayout.axis = Atomic.UI_AXIS_Y;
      this.upDownLayout.spacing = 50;
      //create an up buttons
      this.upButton = new Atomic.UIButton();
      this.upButton.skinBg = "TouchButtonUp";
      this.upButton.layoutParams = this.layoutParamsUpDown;
      this.upDownLayout.addChild(this.upButton);
      //create a down button
      this.downButton = new Atomic.UIButton();
      this.downButton.skinBg = "TouchButtonDown";
      this.downButton.layoutParams = this.layoutParamsUpDown;
      this.upDownLayout.addChild(this.downButton);

      this.upDownLayout.layoutSize = Atomic.UI_LAYOUT_SIZE_PREFERRED;

      //it makes ours buttons uncaptured, this is used for the multiTouch, to don't `concentrate` only on one button
      this.upButton.setCapturing(false);
      this.downButton.setCapturing(false);

      //bind our ui button to the specified Keyboard Button
      Atomic.input.bindButton(this.upButton, Atomic.KEY_UP);
      Atomic.input.bindButton(this.downButton, Atomic.KEY_DOWN);

    };

    //inits layout prams for up/down buttons
    this.initUpDownLayoutParams = function() {

      this.layoutParamsUpDown = new Atomic.UILayoutParams();

      this.layoutParamsUpDown.minWidth = verticButtonsSize[0];
      this.layoutParamsUpDown.minHeight = verticButtonsSize[1];

      this.layoutParamsUpDown.width = verticButtonsSize[0]*2;
      this.layoutParamsUpDown.height = verticButtonsSize[1]*2;

      this.layoutParamsUpDown.maxWidth = verticButtonsSize[0]*6;
      this.layoutParamsUpDown.maxHeight = verticButtonsSize[1]*6;

    };

    //inits layout params for left/right buttons
    this.initLeftRightLayoutParams = function() {

      this.layoutParamsLeftRight = new Atomic.UILayoutParams();

      this.layoutParamsLeftRight.minWidth = horizButtonsSize[0];
      this.layoutParamsLeftRight.minHeight = horizButtonsSize[1];

      this.layoutParamsLeftRight.width = horizButtonsSize[0]*2;
      this.layoutParamsLeftRight.height = horizButtonsSize[1]*2;

      this.layoutParamsLeftRight.maxWidth = horizButtonsSize[0]*6;
      this.layoutParamsLeftRight.maxHeight = horizButtonsSize[1]*6;

    };

    //set horizontal spacing
    this.setSpacingX = function(spacing) {
      dpadSpacingX = spacing;
      this.dpad.spacing = spacing;
    };

    //set vertical spacing
    this.setSpacingY = function(spacing) {
      dpadSpacingY = spacing;
      this.upDownLayout.spacing = spacing;
    };

    //set view position
    this.setPosition = function(x, y) {
      this.view.setPosition(x, y);
    };

    this.updateViewSize = function() {
      this.view.setSize(horizButtonsSize[0]*4+verticButtonsSize[0]*2+dpadSpacingX, horizButtonsSize[1]*2+verticButtonsSize[1]*4+dpadSpacingY);
    };

    this.remove = function() {
      this.view.removeChild(this.dpad);
    };
}

module.exports = DPad;
