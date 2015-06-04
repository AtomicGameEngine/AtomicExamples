
var view = Atomic.game.uiView;

var window = new Atomic.UIWindow();
window.load("UI/Test.ui.txt");
window.text = "Turbo Badger";
window.setSize(250, 630);
window.setPosition(10, 50);
view.addChild(window);

var edit = new Atomic.UIWindow();
edit.load("UI/EditWindow.ui.txt");
edit.text = "Edit Window";
edit.setSize(450, 630);
edit.setPosition(280, 50);
view.addChild(edit);

window.getWidget("test-image").onClick = function() {

  var testImage = new Atomic.UIWindow();
  testImage.load("UI/TestImageWidget.ui.txt");
  testImage.text = "Image Widget";

  testImage.setSize(350, 500);

  view.addChild(testImage);

  testImage.center();

  testImage.onEvent = function(evt) {

    if (evt.target && evt.target.id == "remove") {
      var image = evt.target.parent;
      image.parent.removeChild(image);
    }
  }

}

window.getWidget("test-layout").onClick = function() {

  var testLayout = new Atomic.UIWindow();
  testLayout.load("UI/TestRadioCheckbox.ui.txt");
  testLayout.text = "Radio & Checkbox";

  var rect = testLayout.getResizeToFitContentRect();

  testLayout.setSize(rect.width, rect.height);

  view.addChild(testLayout);

  testLayout.center();
}

var editfield = edit.getWidget("editfield");
var menubutton = edit.getWidget("menu");

edit.getWidget("clear").onClick = function() {

  editfield.text = "";

}

menubutton.onClick = function() {

  menubutton.popup({
    "Toggle wrapping" : "toggle wrapping",
    "-" : "",
    "Align selected left" : "align left",
    "Align selected center" : "align center",
    "Align selected right" : "align right"
  }, function(id) {

    switch(id) {
      case "align right":
        editfield.textAlign = Atomic.TEXT_ALIGN_RIGHT;
        break;
      case "align center":
        editfield.textAlign = Atomic.TEXT_ALIGN_CENTER;
        break;
      case "align left":
        editfield.textAlign = Atomic.TEXT_ALIGN_LEFT;
        break;
      case "toggle wrapping":
        editfield.wrapping = !editfield.wrapping;
        break;
    }

  });

}


function start() {


}

function update(timeStep) {



}
