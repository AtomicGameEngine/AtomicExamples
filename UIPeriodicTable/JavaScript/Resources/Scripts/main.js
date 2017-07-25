// This script is the main entry point of the example 

//Load scene
Atomic.player.loadScene("Scenes/Scene.scene");

// build host for GUI, which there will be a lot of.
var view = new Atomic.UIView();

var layout = new Atomic.UILayout();
layout.rect = view.rect;
layout.axis = Atomic.UI_AXIS_Y;
layout.layoutSize = Atomic.UI_LAYOUT_SIZE_AVAILABLE;
layout.layoutDistribution = Atomic.UI_LAYOUT_DISTRIBUTION_AVAILABLE;
layout.layoutPosition = Atomic.UI_LAYOUT_POSITION_GRAVITY;
layout.setSkinBg ("background_solid");  // make it look presentable.

// example of adding a font, will be used later
Atomic.ui.addFont("Textures/BrokenGlass.ttf", "BrokenGlass");

// set up some stuff for mobile, so we can use the same app code & layouts
// by lying about the device DPI. Everyone lies about DPI.
if (( Atomic.platform == "Android" ) || Atomic.platform == "iOS") {
    Atomic.ui.loadSkin("Textures/mobile.tb.txt");
         if (Atomic.graphics.width > 1200)
            Atomic.ui.setDefaultFont("Vera", 14);
        else 
            Atomic.ui.setDefaultFont("Vera", 10);
}
else {
    Atomic.ui.loadSkin("Textures/desktop.tb.txt");
}

// load the main UI layout
layout.load("Scenes/main_layout.ui.txt");
view.addChild(layout);

// and get going
var maintb = layout.getWidget("maintabs");
var acttb = layout.getWidget("primarytabs");
var semitb = layout.getWidget("moretabs");
var viewtb = layout.getWidget("supporttabs");
var supporttb = layout.getWidget("atomictabs");

supporttb.setCurrentPage(0); 
viewtb.setCurrentPage(0); 
semitb.setCurrentPage(0); 
acttb.setCurrentPage(0);
maintb.setCurrentPage(0); // do this or esle the tab contents look like crap!

// exit by pressing the atomic logo button
layout.getWidget("exitapp").onClick = function ()
{ 
    Atomic.engine.exit();
};

//hookup code on all the pages, thats how the javascript example rolls.
var logger = layout.getWidget("LogText");
var someview = layout.view;

require("Components/code_table").init(layout, logger);
require("Components/code_uiwidget").init(layout.getWidget("pageuiwidget"), logger);
require("Components/code_uibargraph").init(layout.getWidget("pageuibargraph"), logger);
require("Components/code_uibutton").init(layout.getWidget("pageuibutton"), logger);
require("Components/code_uicheckbox").init(layout.getWidget("pageuicheckbox"), logger);
require("Components/code_uiclicklabel").init(layout.getWidget("pageuiclicklabel"), logger);
require("Components/code_uicolorwheel").init(layout.getWidget("pageuicolorwheel"), logger);
require("Components/code_uicolorwidget").init(layout.getWidget("pageuicolorwidget"), logger);
require("Components/code_uicontainer").init(layout.getWidget("pageuicontainer"), logger);
require("Components/code_uieditfield").init(layout.getWidget("pageuieditfield"), logger);
require("Components/code_uifinderwindow").init(layout.getWidget("pageuifinderwindow"), logger, someview);
require("Components/code_uifontdescription").init(layout.getWidget("pageuifontdescription"), logger);
require("Components/code_uiimagewidget").init(layout.getWidget("pageuiimagewidget"), logger);
require("Components/code_uiinlineselect").init(layout.getWidget("pageuiinlineselect"), logger);
require("Components/code_uilayoutparams").init(layout.getWidget("pageuilayoutparams"), logger);
require("Components/code_uilayout").init(layout.getWidget("pageuilayout"), logger, someview);
require("Components/code_uimenuitem").init(layout.getWidget("pageuimenuitem"), logger);
require("Components/code_uimenuwindow").init(layout.getWidget("pageuimenuwindow"), logger);
require("Components/code_uimessagewindow").init(layout.getWidget("pageuimessagewindow"), logger);
require("Components/code_uipromptwindow").init(layout.getWidget("pageuipromptwindow"), logger, someview);
require("Components/code_uipulldownmenu").init(layout.getWidget("pageuipulldownmenu"), logger);
require("Components/code_uiradiobutton").init(layout.getWidget("pageuiradiobutton"), logger);
require("Components/code_uisceneview").init(layout.getWidget("pageuisceneview"), logger);
require("Components/code_uiscrollbar").init(layout.getWidget("pageuiscrollbar"), logger);
require("Components/code_uiscrollcontainer").init(layout.getWidget("pageuiscrollcontainer"), logger);
require("Components/code_uisection").init(layout.getWidget("pageuisection"), logger);
require("Components/code_uiselectdropdown").init(layout.getWidget("pageuiselectdropdown"), logger);
require("Components/code_uiselectitem").init(layout.getWidget("pageuiselectitem"), logger);
require("Components/code_uiselectlist").init(layout.getWidget("pageuiselectlist"), logger);
require("Components/code_uiseparator").init(layout.getWidget("pageuiseparator"), logger);
require("Components/code_uiskinimage").init(layout.getWidget("pageuiskinimage"), logger);
require("Components/code_uislider").init(layout.getWidget("pageuislider"), logger);
require("Components/code_uitabcontainer").init(layout.getWidget("pageuitabcontainer"), logger);
require("Components/code_uitextfield").init(layout.getWidget("pageuitextfield"), logger);
require("Components/code_uitexturewidget").init(layout.getWidget("pageuitexturewidget"), logger);
require("Components/code_uiwindow").init(layout.getWidget("pageuiwindow"), logger, someview);

