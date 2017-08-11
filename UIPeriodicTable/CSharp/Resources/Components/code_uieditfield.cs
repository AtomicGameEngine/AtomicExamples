// UIEditField application source code
using System;
using AtomicEngine;

public class code_uieditfield  : CSComponent {

    public void Setup( UIWidget  layout )
    {
        var dest = new AtomicEngine.Vector<AtomicEngine.UIWidget>();
        layout.SearchWidgetClass( "TBButton", dest );
        for (var ii = 0; ii < dest.Size; ii++) {
            dest[ii].SubscribeToEvent<WidgetEvent> (dest [ii], HandleUieditfieldEvent );
        }
        UIWidget demo1 = layout.GetWidget ("editfieldsingle");
        if ( !demo1.Equals(null))
            demo1.SubscribeToEvent<WidgetEvent> ( demo1, HandleUieditfieldEvent );
        UIWidget demo2 = layout.GetWidget ("editfieldmulti");
        if ( !demo2.Equals(null))
            demo2.SubscribeToEvent<WidgetEvent> ( demo2, HandleUieditfieldEvent );
    }

    private static void HandleUieditfieldEvent( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        if ( widget.Equals(null)) return;
        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK) {
            if (widget.GetId() == "uieditfieldcode" ) {
                AtomicMain.AppLog( "UIEditField support : " + widget.GetId() + " was pressed " );
                AtomicMain.ViewCode ( "Components/code_uieditfield.cs", widget.GetParent() );
            }
            if (widget.GetId() ==  "uieditfieldlayout" ) {
                AtomicMain.AppLog( "UIEditField support : " + widget.GetId() + " was pressed ");
                AtomicMain.ViewCode ( "Scenes/layout_uieditfield.ui.txt", widget.GetParent() );
            }

            if (widget.GetId() ==  "editfieldadd" ) {
                AtomicMain.AppLog( "UIEditField action : " + widget.GetId() + " was pressed ");
                UIEditField ef1 = (UIEditField)widget.FindWidget("editfieldmulti");
                if ( !ef1.Equals(null)) {
                    var  cache = GetSubsystem<ResourceCache>();
                    File filex = cache.GetFile("Scenes/layout_uieditfield.ui.txt");
                    String textx = filex.ReadText();
                    filex.Close();
                    ef1.SetText(textx);
                }
            }
            if (widget.GetId() ==  "editfieldclr" ) {
                AtomicMain.AppLog( "UIEditField action : " + widget.GetId() + " was pressed ");
                UIEditField ef1 = (UIEditField)widget.FindWidget("editfieldmulti");
                if ( !ef1.Equals(null))
                    ef1.SetText("");
            }
        } else {
            if ( widget.GetId() ==  "editfieldsingle" ) {
                UIEditField efx = (UIEditField)widget;
                AtomicMain.AppLog( "UIEditField event : " + widget.GetId() + " text = `" + efx.GetText() + "` event type = " + AtomicMain.EventReport((int)ev.Type));
            }
            if ( widget.GetId() ==  "editfieldmulti" ) {
                UIEditField efx = (UIEditField)widget;
                AtomicMain.AppLog( "UIEditField event : " + widget.GetId() + " text = `" + efx.GetText() + "` event type = " + AtomicMain.EventReport((int)ev.Type) );
            }
        }
    }
}

