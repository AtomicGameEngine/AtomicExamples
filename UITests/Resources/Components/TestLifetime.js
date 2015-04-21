

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
    window.load("UI/Test.ui.txt");
    window.text = "Turbo Badger";
    window.setSize(250, 630);
    window.setPosition(x, 50);
    windows.push(window);
    TheView.addChild(window);
  }

}

var deltaTime = 0;


function start() {


}

function update(timeStep) {

  deltaTime += timeStep;

  if (deltaTime > .5) {

    loadUIWindows();

    MyAssert(Atomic.UI.debugGetWrappedWidgetCount() == 180);

    // print ("# wrapped widgets ", Atomic.UI.debugGetWrappedWidgetCount());

    deltaTime = 0;

  }

}
