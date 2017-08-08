//
// Copyright (c) 2014-2017, THUNDERBEAST GAMES LLC All rights reserved
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//

#include <Atomic/Engine/Application.h>
#include <Atomic/Core/CoreEvents.h>
#include <Atomic/Graphics/Camera.h>
#include <Atomic/Engine/Engine.h>
#include <Atomic/IO/FileSystem.h>
#include <Atomic/Graphics/Graphics.h>
#include <Atomic/Input/Input.h>
#include <Atomic/Input/InputEvents.h>
#include <Atomic/Graphics/Renderer.h>
#include <Atomic/Resource/ResourceCache.h>
#include <Atomic/Scene/Scene.h>
#include <Atomic/Scene/SceneEvents.h>
#include <Atomic/Graphics/Texture2D.h>
#include <Atomic/Graphics/Zone.h>
#include <Atomic/Graphics/Material.h>
#include <Atomic/Graphics/Model.h>
#include <Atomic/Graphics/Octree.h>
#include <Atomic/Graphics/Renderer.h>
#include <Atomic/Graphics/StaticModel.h>
#include <Atomic/Core/Timer.h>
#include <Atomic/UI/UI.h>
#include <Atomic/UI/UIEvents.h>
#include <Atomic/UI/UIView.h>
#include <Atomic/UI/UILayout.h>
#include <Atomic/UI/UICheckBox.h>
#include <Atomic/UI/UITextField.h>
#include <Atomic/UI/UIButton.h>
#include <Atomic/UI/UIEditField.h>
#include <Atomic/UI/UITabContainer.h>
#include <Atomic/UI/UIWindow.h>
#include <Atomic/UI/UIFinderWindow.h>
#include <Atomic/UI/UIPromptWindow.h>
#include <Atomic/Resource/XMLFile.h>
#include <Atomic/IO/Log.h>

#include "PeriodicApp.h"
#include "Spinner.h"

ATOMIC_DEFINE_APPLICATION_MAIN(PeriodicApp)

PeriodicApp::PeriodicApp(Context* context) :
    Application(context)
{
    // Register an object factory for the Rotator component
    context->RegisterFactory<Rotator>();
}


void PeriodicApp::Setup()
{
    engineParameters_["WindowWidth"] = 1280; // Modify engine startup parameters
    engineParameters_["WindowHeight"] = 720;
    engineParameters_["FullScreen"]  = false;
    engineParameters_["Headless"]    = false;
    engineParameters_["Sound"]       = false;
    engineParameters_["LogName"]     = GetSubsystem<FileSystem>()->GetAppPreferencesDir("atomic", "logs") + GetTypeName() + ".log";
    engineParameters_["ResourcePaths"] = "Data;PlayerData;CoreData";

    // Construct a search path to find the resource prefix with two entries:
    // The first entry is an empty path which will be substituted with program/bin directory -- this entry is for binary when it is still in build tree
    // The second and third entries are possible relative paths from the installed program/bin directory to the asset directory -- these entries are for binary when it is in the Atomic SDK installation location
    if (!engineParameters_.Contains(EP_RESOURCE_PREFIX_PATHS))
    {
        // TODO: This is dependent on a source build
        String resourcePrefix = ToString("%s/Resources;%s/Submodules/AtomicExamples/FeatureExamples/CPlusPlus", ATOMIC_ROOT_SOURCE_DIR, ATOMIC_ROOT_SOURCE_DIR);
        engineParameters_[EP_RESOURCE_PREFIX_PATHS] = resourcePrefix;
    }
}

void PeriodicApp::Start()
{
    UI* ui = GetSubsystem<UI>();
    ui->Initialize("DefaultUI/language/lng_en.tb.txt");
    ui->LoadDefaultPlayerSkin();
    uiview_ = new UIView(context_); // create new UIView

    SetWindowTitleAndIcon(); // Set custom window Title & Icon

    SubscribeToEvent(E_KEYDOWN, ATOMIC_HANDLER(PeriodicApp, HandleKeyDown));  // to handle the keys

    DoSomething(); // your game code goes here
}

void PeriodicApp::Stop()
{
    // possibly clean up allocated memory
}

void PeriodicApp::HandleKeyDown(StringHash eventType, VariantMap& eventData)
{
    using namespace KeyDown;

    int key = eventData[P_KEY].GetInt();
    if(key == KEY_ESCAPE)
    {
        engine_->Exit();
    }
    else if (key == KEY_F1)    // Toggle console with F1
    {
        GetSubsystem<UI>()->ToggleConsole();
    }
    else if (key == KEY_F2)    // Toggle debug HUD with F2
    {
        GetSubsystem<UI>()->ToggleDebugHud();
    }

}

void PeriodicApp::SetWindowTitleAndIcon()
{
    ResourceCache* cache = GetSubsystem<ResourceCache>();
    Graphics* graphics = GetSubsystem<Graphics>();
    graphics->SetWindowTitle("PeriodicApp");
    Image* icon = cache->GetResource<Image>("Textures/AtomicLogo32.png");
    graphics->SetWindowIcon(icon);
}

//
// This is the entry point for your 3d game
//
void PeriodicApp::DoSomething()
{
    ResourceCache* cache = GetSubsystem<ResourceCache>();
    scene_ = new Scene(context_);
    scene_->CreateComponent<Octree>();
    Node* lightNode = scene_->CreateChild("DirectionalLight");
    lightNode->SetDirection(Vector3(0.6f, -1.0f, 0.8f));
    Light* light = lightNode->CreateComponent<Light>();
    light->SetLightType(LIGHT_DIRECTIONAL);
    Node *cameraNode_ = scene_->CreateChild("Camera");
    cameraNode_->CreateComponent<Camera>();
    cameraNode_->SetPosition(Vector3(-4.7f, 3.6f, -16.2f));
    cameraNode_->SetRotation(Quaternion(11.4f, 15.8f, 0.0f));
    Renderer* renderer = GetSubsystem<Renderer>();
    SharedPtr<Viewport> viewport(new Viewport(context_, scene_, cameraNode_->GetComponent<Camera>()));
    renderer->SetViewport(0, viewport);

    UI* ui = GetSubsystem<UI>();  // get the ui pointer
    ui->AddFont("Textures/BrokenGlass.ttf", "BrokenGlass"); // add a gooder font
 
    // set up some stuff for mobile, so we can use the same app code & layouts, when we can deploy on mobile
    ui->LoadSkin("Textures/desktop.tb.txt"); // load in the app skin

    UILayout* lo0 = new UILayout(context_);  // make the host widget for all visible ui
    lo0->SetRect ( uiview_->GetRect ()); //size it to fill the screen area
    lo0->SetLayoutConfig( "YAGAC" );  //all-in-one setting
    lo0->SetSkinBg ("background_solid");  // make it look gooder
    lo0->Load("Scenes/main_layout.ui.txt"); // load the main layout
    uiview_->AddChild(lo0); // And make it show up.

    UITabContainer *maintb = (UITabContainer *)lo0->GetWidget("maintabs");
    UITabContainer *acttb = (UITabContainer *)lo0->GetWidget("primarytabs");
    UITabContainer *semitb = (UITabContainer *)lo0->GetWidget("moretabs");
    UITabContainer *viewtb = (UITabContainer *)lo0->GetWidget("supporttabs");
    UITabContainer *supporttb = (UITabContainer *)lo0->GetWidget("atomictabs");
    supporttb->SetCurrentPage(0); 
    viewtb->SetCurrentPage(0); 
    semitb->SetCurrentPage(0); 
    acttb->SetCurrentPage(0);
    maintb->SetCurrentPage(0); // do this or else the tab contents look like crap!
    
    uilog_ = (UITextField*)lo0->GetWidget("LogText");
    UIView *someview = lo0->GetView();
    UIWidget *ea = lo0->GetWidget("exitapp");
    SubscribeToEvent(ea, E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleExitEvent));
 
    setup_table( lo0 );
    setup_uiwidget(  lo0->GetWidget("pageuiwidget") );
    setup_uibargraph(  lo0->GetWidget("pageuibargraph") );
    setup_uibutton(  lo0->GetWidget("pageuibutton") );
    setup_uicheckbox( lo0->GetWidget("pageuicheckbox"));
    setup_uiclicklabel(  lo0->GetWidget("pageuiclicklabel") );
    setup_uicolorwheel(  lo0->GetWidget("pageuicolorwheel") );
    setup_uicolorwidget( lo0->GetWidget("pageuicolorwidget") );
    setup_uicontainer( lo0->GetWidget("pageuicontainer"));
    setup_uieditfield(  lo0->GetWidget("pageuieditfield") );
    setup_uifinderwindow( lo0->GetWidget("pageuifinderwindow"), someview );
    setup_uifontdescription(  lo0->GetWidget("pageuifontdescription") );
    setup_uiimagewidget(  lo0->GetWidget("pageuiimagewidget") );
    setup_uiinlineselect(  lo0->GetWidget("pageuiinlineselect") );
    setup_uilayoutparams(  lo0->GetWidget("pageuilayoutparams") );
    setup_uilayout(  lo0->GetWidget("pageuilayout"), someview );
    setup_uimenuitem( lo0->GetWidget("pageuimenuitem") );
    setup_uimenuwindow(  lo0->GetWidget("pageuimenuwindow") );
    setup_uimessagewindow(  lo0->GetWidget("pageuimessagewindow") );
    setup_uipromptwindow(  lo0->GetWidget("pageuipromptwindow"), someview );
    setup_uipulldownmenu(  lo0->GetWidget("pageuipulldownmenu") );
    setup_uiradiobutton(  lo0->GetWidget("pageuiradiobutton") );
    setup_uisceneview(  lo0->GetWidget("pageuisceneview") );
    setup_uiscrollbar(  lo0->GetWidget("pageuiscrollbar") );
    setup_uiscrollcontainer(  lo0->GetWidget("pageuiscrollcontainer") );
    setup_uisection(  lo0->GetWidget("pageuisection") );
    setup_uiselectdropdown(  lo0->GetWidget("pageuiselectdropdown") );
    setup_uiselectitem(  lo0->GetWidget("pageuiselectitem") );
    setup_uiselectlist(  lo0->GetWidget("pageuiselectlist") );
    setup_uiseparator(  lo0->GetWidget("pageuiseparator") );
    setup_uiskinimage(  lo0->GetWidget("pageuiskinimage") );
    setup_uislider(  lo0->GetWidget("pageuislider") );
    setup_uitabcontainer(  lo0->GetWidget("pageuitabcontainer") );
    setup_uitextfield(  lo0->GetWidget("pageuitextfield") );
    setup_uitexturewidget(  lo0->GetWidget("pageuitexturewidget") );
    setup_uiwindow(  lo0->GetWidget("pageuiwindow"), someview );
    AppLog ( "Ready" );
}

void PeriodicApp::AppLog( const String &logtext )
{
    if (uilog_ )
        uilog_->SetText ( logtext );
}

void PeriodicApp::ViewCode ( String filename, UIWidget *layoutParent )
{
    ResourceCache* cache = GetSubsystem<ResourceCache>();
    UIView *someview = layoutParent->GetView();
    UIWindow *window = new UIWindow(context_);
    window->SetSettings ( UI_WINDOW_SETTINGS_DEFAULT );
    window->SetText( "Code Viewer");
    window->Load("Scenes/view_code.ui.txt");
    SharedPtr<File> filex = cache->GetFile(filename);
    String textx = filex->ReadText();
    filex->Close();
    UIWidget *coder = window->GetWidget("viewCodeText");
    coder->SetText(textx);
    window->ResizeToFitContent();
    someview->AddChild(window);
    window->Center();
    UIWidget *someok = window->GetWidget("viewCodeOK");
    SubscribeToEvent(someok, E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleViewCodeEvent ));
}

void PeriodicApp::HandleViewCodeEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace WidgetEvent;
    if (eventData[P_TYPE] == UI_EVENT_TYPE_CLICK)
    {
        UIWidget* widget = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
        if (widget)
        {
            UIWindow *mywindow = static_cast<UIWindow *>(FindTheWindowParent(widget)); 
            if (mywindow)     
                mywindow->Close();
        }
    }
}

void PeriodicApp::HandleExitEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace WidgetEvent;

    if (eventData[P_TYPE] == UI_EVENT_TYPE_CLICK)
    {
        UIWidget* widget = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
        if (widget)
        {
            engine_->Exit();
        }
    }
}

String PeriodicApp::EventReport( int eventNumber)
{
    switch ( eventNumber ) {
        case 0: return "UI_EVENT_TYPE_CLICK";
        case 1: return "UI_EVENT_TYPE_LONG_CLICK";
        case 2: return "UI_EVENT_TYPE_POINTER_DOWN";
        case 3: return "UI_EVENT_TYPE_POINTER_UP";
        case 4: return "UI_EVENT_TYPE_POINTER_MOVE";
        case 5: return "UI_EVENT_TYPE_RIGHT_POINTER_DOWN";
        case 6: return "UI_EVENT_TYPE_RIGHT_POINTER_UP";
        case 7: return "UI_EVENT_TYPE_WHEEL";
        case 8: return "UI_EVENT_TYPE_CHANGED";
        case 9: return "UI_EVENT_TYPE_KEY_DOWN";
        case 10: return "UI_EVENT_TYPE_KEY_UP";
        case 11: return "UI_EVENT_TYPE_SHORTCUT";
        case 12: return "UI_EVENT_TYPE_CONTEXT_MENU";
        case 13: return "UI_EVENT_TYPE_FILE_DROP";
        case 14: return "UI_EVENT_TYPE_TAB_CHANGED";
        case 15: return "UI_EVENT_TYPE_CUSTOM";
    }
    return "EVENT_UKNOWN";
}

UIWidget *PeriodicApp::FindTheWindowParent( UIWidget* fromThisWidget )
{
    tb::TBWidget *widgetx = fromThisWidget->GetInternalWidget();
    UI* ui = GetSubsystem<UI>();
 
    if (widgetx == NULL)
        return 0;

    if ( widgetx->GetClassName() == "TBWindow" || widgetx->GetClassName() == "TBDockWindow" ) 
        return ui->WrapWidget(widgetx);
    
    tb::TBWidget* tbw = widgetx->GetParent();
    while(tbw)
    {
        if ( tbw->GetClassName() == "TBWindow" || tbw->GetClassName() == "TBDockWindow" ) 
            return ui->WrapWidget(tbw);
        tbw = tbw->GetParent();
    }

    return 0; 
}
