// UISceneView application source code
// some code from UISceneview2D sample program
using System;
using AtomicEngine;

public class code_uisceneview  : CSComponent {

    public void Setup( UIWidget  layout )
    {
        var dest = new AtomicEngine.Vector<AtomicEngine.UIWidget>();
        layout.SearchWidgetClass( "TBButton", dest );
        for (var ii = 0; ii < dest.Size; ii++) {
            dest[ii].SubscribeToEvent<WidgetEvent> (dest [ii], HandleUisceneviewEvent );
        }

        UISceneView mysceneview = new UISceneView();  // make a scene...view
        mysceneview.SetId( "UISceneViewDemo"); // tag it, in case we want to get it again later
        mysceneview.SubscribeToEvent<WidgetEvent> (mysceneview, HandleUisceneviewEvent );

        var cache = GetSubsystem<ResourceCache>();
        Scene  myscene = new Scene();
        if ( !myscene.Equals(null) ) {
            if ( myscene.LoadXML( (cache.GetFile("Scenes/sceneview.scene")))) {
                Node cameraNode = myscene.GetChild("Camera", true);
                Camera mycamera = cameraNode.GetComponent<Camera>();
                mysceneview.SetView(myscene, mycamera);
                mysceneview.SetAutoUpdate(true);
            }
        }

        UILayoutParams lpx = new UILayoutParams();
        lpx.SetWidth (640);
        lpx.SetHeight(320);
        lpx.SetMinWidth(640);
        lpx.SetMinHeight(320);
        lpx.SetMaxWidth (640);
        lpx.SetMaxHeight(320);
        mysceneview.SetLayoutParams(lpx);

        UIWidget lower = layout.GetWidget("uisceneviewlower");
        UIWidget mysvc = layout.GetWidget("sceneviewcontainer");
        mysvc.AddChildBefore(mysceneview, lower);
    }

    private static void HandleUisceneviewEvent( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        if ( widget.Equals(null)) return;
        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK) {
            if (widget.GetId() == "uisceneviewcode" ) {
                AtomicMain.AppLog( "UISceneView support : " + widget.GetId() + " was pressed " );
                AtomicMain.ViewCode ( "Components/code_uisceneview.cs", widget.GetParent() );
            }
            if (widget.GetId() ==  "uisceneviewlayout" ) {
                AtomicMain.AppLog( "UISceneView support : " + widget.GetId() + " was pressed ");
                AtomicMain.ViewCode ( "Scenes/layout_uisceneview.ui.txt", widget.GetParent() );
            }
        }
        if ( widget.GetId() ==  "UISceneViewDemo" ) {
            AtomicMain.AppLog( "UISceneView event : " + widget.GetId() + " got event= "+ AtomicMain.EventReport((int)ev.Type) );
        }
    }
}

