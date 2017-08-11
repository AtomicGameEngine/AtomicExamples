// UIImageWidget application source code
using System;
using AtomicEngine;

public class code_uiimagewidget : CSComponent {

    public void Setup( UIWidget  layout )
    {
        var dest = new AtomicEngine.Vector<AtomicEngine.UIWidget>();
        layout.SearchWidgetClass( "TBButton", dest );
        for (var ii = 0; ii < dest.Size; ii++) {
            dest[ii].SubscribeToEvent<WidgetEvent> (dest [ii], HandleUiimagewidgetEvent );
        }
    }

    private static void HandleUiimagewidgetEvent ( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        if ( widget.Equals(null)) return;
        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK) {
            if (widget.GetId() == "uiimagewidgetcode" ) {
                AtomicMain.AppLog( "UIImageWidget support : " + widget.GetId() + " was pressed " );
                AtomicMain.ViewCode ( "Components/code_uiimagewidget.cs", widget.GetParent() );
            }
            if (widget.GetId() ==  "uiimagewidgetlayout" ) {
                AtomicMain.AppLog( "UIImageWidget support : " + widget.GetId() + " was pressed ");
                AtomicMain.ViewCode ( "Scenes/layout_uiimagewidget.ui.txt", widget.GetParent() );
            }

            if (widget.GetId() ==  "imagecolor" ) {
                AtomicMain.AppLog( "UIImageWidget action : " + widget.GetId() + " was pressed ");
                UIImageWidget img1 = (UIImageWidget)widget.FindWidget("imagewidgetdemo");
                img1.SetImage("Textures/HSV21.png");
            }
            if (widget.GetId() ==  "imagenewbuild" ) {
                AtomicMain.AppLog( "UIImageWidget action : " + widget.GetId() + " was pressed ");
                UIImageWidget img1 = (UIImageWidget)widget.FindWidget("imagewidgetdemo");
                img1.SetImage("Textures/newbuilddetected_header.jpg");
            }
        }
    }
}

