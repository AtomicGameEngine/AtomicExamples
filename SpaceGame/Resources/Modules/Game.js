/* global __js_atomicgame_update */
Atomic.editor = null;

function Game() {

	this.engine = Atomic.getEngine();
	this.cache = Atomic.getResourceCache();
	this.renderer = Atomic.getRenderer();
	this.graphics = Atomic.getGraphics();
	this.input = Atomic.getInput();
    this.jsid = -1;  // joystick, rumble start off
    this.xsim = 0.0;
    this.ysim = 0.0;

  this.input.setMouseVisible(true);

  if (Atomic.platform == "Android") {
      this.renderer.reuseShadowMaps = false;
      this.renderer.shadowQuality = Atomic.SHADOWQUALITY_LOW_16BIT;
  }

	// root view
	this.uiView = new Atomic.UIView();

}

Game.prototype.init = function(start, update) {

	this.update = update;

	// register global to get at quickly
	__js_atomicgame_update = update;

    if (typeof(start) === "function")
        start();

};

Game.prototype.getSpriteSheet2D = function(xmlFile) {

	return this.cache.getResource("SpriteSheet2D", xmlFile);

};

Game.prototype.getSpriteSheet = Game.prototype.getSpriteSheet2D;

Game.prototype.getSound = function(soundFile) {

    return this.cache.getResource("Sound", soundFile);

};

Game.prototype.getSprite2D = function(spriteFile) {

    return this.cache.getResource("Sprite2D", spriteFile);

};


Game.prototype.showDebugHud = function() {

	var uiStyle = this.cache.getResource("XMLFile", "UI/DefaultStyle.xml");
    var debugHud = this.engine.createDebugHud();
    debugHud.defaultStyle = uiStyle;
    debugHud.toggleAll();

};

Game.prototype.createScene2D = function() {

		var scene = new Atomic.Scene();
    scene.createComponent("Octree");

    var cameraNode = scene.createChild("Camera");
    cameraNode.position = [0.0, 0.0, -10.0];

    var camera = cameraNode.createComponent("Camera");
    camera.orthographic = true;
    camera.orthoSize = this.graphics.height * Atomic.PIXEL_SIZE;

    var viewport = null;

    if (Atomic.editor) {
        viewport = Atomic.editor.setView(scene, camera);
    } else {
        viewport = new Atomic.Viewport(scene, camera);
        this.renderer.setViewport(0, viewport);
    }

    this.scene = scene;
    this.cameraNode = cameraNode;
    this.camera = camera;
    this.viewport = viewport;

    if ( Atomic.input.numJoysticks > 0 ) {

         this.jsid = 0

        scene.subscribeToEvent("JoystickConnected", function(ev) {
            this.jsid = ev.JoystickID; // get the joystick id for future calls.
        });

        // have the joystick drive the UI
        scene.subscribeToEvent("JoystickButtonDown", function(ev) {
 
           if ( ev.Button == Atomic.CONTROLLER_BUTTON_X 
                    || ev.Button == Atomic.CONTROLLER_BUTTON_LEFTSTICK )
                {
                    Atomic.input.joystickSimulateMouseButton(1); // mouse button 1 press
                }

        });

       scene.subscribeToEvent("JoystickAxisMove", function(ev) {

            var joyLookDeadZone = 0.05;
            var joyMoveDistance = 1.7;

             if ( ev.Button < 2 )
             {
                    var look1 = 0.0
                    var look2 = 0.0;
                    if ( ev.Button == 0) look1 = ev.Position;
                    if ( ev.Button == 1) look2 = ev.position;

                    if (look1 < -joyLookDeadZone || look1 > joyLookDeadZone) // has a value other than 0
                        this.xsim += joyMoveDistance * look1;
                    else this.xsim = 0;
                    if (look2 < -joyLookDeadZone || look2 > joyLookDeadZone)
                        this.ysim += joyMoveDistance * look2;
                    else this.ysim = 0;                       
            }
        });
    }


   scene.subscribeToEvent("SceneUpdate", function(ev) {

       if ( Atomic.input.numJoysticks > 0 && Atomic.input.isMouseVisible()) {

            if ( this.xsim == undefined || this.ysim == undefined ) return;  
            if ( this.xsim != 0.0 || this.ysim != 0.0 )
            {
                var nowx = Atomic.input.mousePosition; // ui.cursor.screenPosition; // readonysim        
                Atomic.input.joystickSimulateMouseMove( nowx[0] + this.xsim,  nowx[1] + this.ysim);
            }
       }
  });

    return scene;

};

Game.prototype.dumpMetrics = function() {

	var metrics = Atomic.getVM().metrics;
  metrics.capture();
  print("--------------");
  print("Object Instances:");
  print("--------------");
  metrics.dump();
	print("--------------");
  print("Nodes:");
  print("--------------");
  metrics.dumpNodes();
  print("--------------");
  print("JS Components:");
  print("--------------");
  metrics.dumpJSComponents();

};

Game.prototype.createScene3D = function(filename) {

    var scene = new Atomic.Scene();

		// FIXME: Node should take a string name in constructor
		var cameraNode = new Atomic.Node();
		cameraNode.name = "Camera";
    cameraNode.position = [0.0, 0.0, -10.0];

    var camera = cameraNode.createComponent("Camera");

		this.cameraNode = cameraNode;
    this.camera = camera;

    if (typeof(filename) == "string")
        scene.loadXML(filename);
    else
        scene.createComponent("Octree");

		scene.addChild(cameraNode);

    var viewport = null;
    if (Atomic.editor) {
        viewport = Atomic.editor.setView(scene, camera);
    } else {
        viewport = new Atomic.Viewport(scene, camera);
        this.renderer.setViewport(0, viewport);
    }

    this.scene = scene;
    this.viewport = viewport;

    return scene;

};


Atomic.game = exports.game = new Game();
