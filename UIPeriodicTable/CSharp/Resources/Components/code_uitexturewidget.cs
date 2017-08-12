// UITextureWidget application source code
using System;
using AtomicEngine;

public class code_uitexturewidget : CSComponent {

    public void Setup( UIWidget  layout )
    {
        var dest = new AtomicEngine.Vector<AtomicEngine.UIWidget>();
        layout.SearchWidgetClass( "TBButton", dest );
        for (var ii = 0; ii < dest.Size; ii++) {
            dest[ii].SubscribeToEvent<WidgetEvent> (dest [ii], HandleUitexturewidgetEvent );
        }

        var cache = GetSubsystem<ResourceCache>();
        UITextureWidget  mytexturewidget = new UITextureWidget();
        mytexturewidget.SetId( "UITextureWidgetDemo");
        Texture2D  mytex = new Texture2D();
        if ( !mytex.Equals(null) ) {
            mytex = cache.GetResource<Texture2D>("Textures/planet.jpg");
            mytexturewidget.SetTexture(mytex);
        }
        mytexturewidget.SubscribeToEvent<WidgetEvent> ( mytexturewidget, HandleUitexturewidgetEvent );
        UILayoutParams  lpx = new UILayoutParams();
        lpx.SetWidth (256);
        lpx.SetHeight(256);
        lpx.SetMinWidth(256);
        lpx.SetMinHeight(256);
        lpx.SetMaxWidth (256);
        lpx.SetMaxHeight(256);
        mytexturewidget.SetLayoutParams(lpx);
        UIWidget  lower = layout.GetWidget("uitexturewidgetlower");
        UIWidget  mysvc = layout.GetWidget("uitwcontainer");
        mysvc.AddChildBefore( mytexturewidget, lower);

        UILayout  lo1 = new UILayout();
        mysvc.AddChildBefore(lo1, lower);

        UIButton  b1 = new UIButton();
        b1.SetId( "uitexturewidgetch1");
        b1.SetText("Change texture to new build");
        lo1.AddChild(b1);
        b1.SubscribeToEvent<WidgetEvent> ( b1, HandleUitexturewidgetEvent );
        UIButton  b2 = new UIButton();
        b2.SetId( "uitexturewidgetch2");
        b2.SetText("Change texture to colorwheel");
        lo1.AddChild(b2);
        b2.SubscribeToEvent<WidgetEvent> ( b2, HandleUitexturewidgetEvent );
        UIButton  b3 = new UIButton();
        b3.SetId( "uitexturewidgetch3");
        b3.SetText("Change texture to planet");
        lo1.AddChild(b3);
        b3.SubscribeToEvent<WidgetEvent> ( b3, HandleUitexturewidgetEvent );
    }

    private static void HandleUitexturewidgetEvent( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        if ( widget.Equals(null)) return;
        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK) {
            if (widget.GetId() == "uitexturewidgetcode" ) {
                AtomicMain.AppLog( "UITextureWidget support : " + widget.GetId() + " was pressed " );
                AtomicMain.ViewCode ( "Components/code_uitexturewidget.cs", widget.GetParent() );
            }
            if (widget.GetId() ==  "uitexturewidgetlayout" ) {
                AtomicMain.AppLog( "UITextureWidget support : " + widget.GetId() + " was pressed ");
                AtomicMain.ViewCode ( "Scenes/layout_uitexturewidget.ui.txt", widget.GetParent() );
            }

            if (widget.GetId() ==  "uitexturewidgetch1" ) {
                AtomicMain.AppLog( "UITextureWidget support : " + widget.GetId() + " was pressed ");
                var cache = GetSubsystem<ResourceCache>();
                UITextureWidget tw = (UITextureWidget)widget.FindWidget("UITextureWidgetDemo");
                tw.SetTexture( cache.GetResource<Texture2D>("Textures/newbuilddetected_header.jpg") );
            }
            if (widget.GetId() ==  "uitexturewidgetch2" ) {
                AtomicMain.AppLog( "UITextureWidget support : " + widget.GetId() + " was pressed ");
                var cache = GetSubsystem<ResourceCache>();
                UITextureWidget tw = (UITextureWidget)widget.FindWidget("UITextureWidgetDemo");
                tw.SetTexture( cache.GetResource<Texture2D>("Textures/HSV21.png") );
            }
            if (widget.GetId() ==  "uitexturewidgetch3" ) {
                AtomicMain.AppLog( "UITextureWidget support : " + widget.GetId() + " was pressed ");
                var cache = GetSubsystem<ResourceCache>();
                UITextureWidget tw = (UITextureWidget)widget.FindWidget("UITextureWidgetDemo");
                tw.SetTexture( cache.GetResource<Texture2D>("Textures/planet.jpg") );
            }
        }
    }
}

