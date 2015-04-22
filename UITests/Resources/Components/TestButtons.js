var view = Atomic.game.uiView;

var deltaTime = 0;

var widgetClicked = false;


function start() {

  // will go out of scope,  however will be held while the
  // button is in a UI heirarchy

  var widget = new Atomic.UIWidget();
  widget.setSize(256, 256);
  view.addChild(widget);

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

    button.parent.destroy();

    try {

      // widget onClicked handler should not have been called
      MyAssert(!widgetClicked);

      // just the view should be alive
      MyAssert(Atomic.UI.debugGetWrappedWidgetCount() == 1);
      MyAssert(Atomic.UI.debugGetUIKeepAliveCount() == Atomic.UI.debugGetWrappedWidgetCount());

      print("success");

    } catch (e) {

      print (e);

    }


    // returning true signals the event was handled and  stops event bubble
    // so parent widget should not get event, which is important as it is destroyed here
    return true;
  }

}

function update(timeStep) {

  deltaTime += timeStep;

  if (deltaTime > .5) {

    deltaTime = 0;

  }

}
