

var deltaTime = 0;

var buttonClicked = null;
var widgetClicked = false;


function start() {

  // will go out of scope,  however will be held while the
  // button is in a UI heirarchy

  var widget = new Atomic.UIWidget();
  widget.setSize(256, 256);
  TheView.addChild(widget);

  var button = new Atomic.UIButton();
  button.text = "Click Me To Destroy";
  button.setSize(256, 256);
  widget.addChild(button);

  widget.onClick = function() {
    widgetClicked = true;
    print ("Error: Widget on Click!");
  }


  button.onClick = function() {

    print ("Button on Click!");

    // can't destroy the button in it's own callback
    buttonClicked = button;

    // returning true signals the event was handled and  stops event bubble
    // so parent widget should not get event
    return true;
  }

}

function update(timeStep) {

  if (buttonClicked) {

    buttonClicked.parent.destroy();

    try {

      // widget onClicked handler should not have been called
      MyAssert(!widgetClicked);

      // just the view should be alive
      MyAssert(Atomic.UI.debugGetWrappedWidgetCount() == 1);
      MyAssert(Atomic.UI.debugGetUIKeepAliveCount() == Atomic.UI.debugGetWrappedWidgetCount());

    } catch (e) {

      print (e);

    }

    buttonClicked = null;

  }

  deltaTime += timeStep;

  if (deltaTime > .5) {

    deltaTime = 0;

  }

}
