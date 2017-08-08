// UISceneView application source code
// some code from UISceneview2D sample program
#include <Atomic/UI/UISceneView.h>
#include <Atomic/UI/UILayout.h>
#include <Atomic/Scene/Scene.h>
#include <Atomic/Graphics/Camera.h>
#include <Atomic/Resource/ResourceCache.h>
#include "PeriodicApp.h"
#include "Spinner.h"

void PeriodicApp::setup_uisceneview( UIWidget *layout)
{
    PODVector<UIWidget*> dest;
    layout->SearchWidgetClass( "TBButton", dest );
    for (unsigned ii = 0; ii < dest.Size(); ii++)
        SubscribeToEvent(dest[ii], E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUisceneviewEvent ));

    UISceneView * mysceneview = new UISceneView(context_);  // make a scene...view
    mysceneview->SetId( "UISceneViewDemo"); // tag it, in case we want to get it again later
    SubscribeToEvent(mysceneview, E_WIDGETEVENT, ATOMIC_HANDLER(PeriodicApp, HandleUisceneviewEvent ));

    /*
        Scene *myscene = GetSubsystem<AtomicPlayer::Player>()->LoadScene("Scenes/sceneview.scene");
    	DONT DO IT THIS WAY for C++! Make a scene, then LoadXML!
    */

    ResourceCache* cache = GetSubsystem<ResourceCache>();
    Scene *myscene = new Scene(context_);
    if ( myscene )
    {
        if ( myscene->LoadXML(*(cache->GetFile("Scenes/sceneview.scene"))))
        {
            Node *cameraNode = myscene->GetChild("Camera", true);
            Camera* mycamera = cameraNode->GetComponent<Camera>();
            Node* planetNode = myscene->GetChild("TheWorld", true);
            if(planetNode) // spin-o-rama, c++ style
            {
                Rotator* rotator = planetNode->CreateComponent<Rotator>();
                rotator->SetRotationSpeed(Vector3(0.0f, 20.0f, 1.0f));
            }
            mysceneview->SetView(myscene, mycamera);
            mysceneview->SetAutoUpdate(true);
        }
    }

    UILayoutParams *lpx = new UILayoutParams(context_);
    lpx->SetWidth (640);
    lpx->SetHeight(320);
    lpx->SetMinWidth(640);
    lpx->SetMinHeight(320);
    lpx->SetMaxWidth (640);
    lpx->SetMaxHeight(320);
    mysceneview->SetLayoutParams(lpx);

    UIWidget* lower = layout->GetWidget("uisceneviewlower");
    UIWidget* mysvc = layout->GetWidget("sceneviewcontainer");
    mysvc->AddChildBefore(mysceneview, lower);

}

void PeriodicApp::HandleUisceneviewEvent(StringHash eventType, VariantMap& eventData)
{
    using namespace WidgetEvent;
    UIWidget* widget = static_cast<UIWidget*>(eventData[P_TARGET].GetPtr());
    if ( widget == NULL ) return;
    if (eventData[P_TYPE] == UI_EVENT_TYPE_CLICK)
    {
        if (widget->GetId() == "uisceneviewcode" )
        {
            AppLog( "UISceneView support : " + widget->GetId() + " was pressed " );
            ViewCode ( "Components/code_uisceneview.cpp", widget->GetParent() );
        }
        if (widget->GetId() ==  "uisceneviewlayout" )
        {
            AppLog( "UISceneView support : " + widget->GetId() + " was pressed ");
            ViewCode ( "Scenes/layout_uisceneview.ui.txt", widget->GetParent() );
        }
    }
    if ( widget->GetId() ==  "UISceneViewDemo" )
    {
        AppLog( "UISceneView event : " + widget->GetId() + " got event= "+ EventReport(eventData[P_TYPE].GetInt()) );
    }
}

