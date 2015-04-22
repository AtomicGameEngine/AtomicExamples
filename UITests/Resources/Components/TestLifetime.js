var view = Atomic.game.uiView;

var windows = [];

function loadUIWindows() {

  for (var idx in windows) {

    var window = windows[idx];

    window.destroy();

  }

  windows = [];

  var x = 5;

  for (var i = 0; i < 10; i++, x += 260) {

    var window = new Atomic.UIWindow();
    windows.push(window);
    window.load("UI/TestLifetime.ui.txt");
    window.text = "Turbo Badger";
    window.setSize(250, 630);
    window.setPosition(x, 50);
    view.addChild(window);
  }

}

var deltaTime = 0;


function start() {


}

function update(timeStep) {

  deltaTime += timeStep;

  if (deltaTime > .5) {

    loadUIWindows();

    try {

      MyAssert(Atomic.UI.debugGetWrappedWidgetCount() == 191);
      MyAssert(Atomic.UI.debugGetUIKeepAliveCount() == Atomic.UI.debugGetWrappedWidgetCount());

    } catch (e) {

      print (e);

    }

    deltaTime = 0;

  }

}
