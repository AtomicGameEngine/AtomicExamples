// UISelectList application source code
using System;
using AtomicEngine;

public class code_uiselectlist  : CSComponent {

    public void Setup( UIWidget  layout )
    {
        var dest = new AtomicEngine.Vector<AtomicEngine.UIWidget>();
        layout.SearchWidgetClass( "TBButton", dest );
        for (var ii = 0; ii < dest.Size; ii++) {
            dest[ii].SubscribeToEvent<WidgetEvent> (dest [ii], HandleUiselectlistEvent );
        }
        UIWidget demo = layout.GetWidget("UISelectListDemo");
        if ( !demo.Equals(null))
            demo.SubscribeToEvent<WidgetEvent> (demo, HandleUiselectlistEvent );
    }

    private static void HandleUiselectlistEvent ( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        string refid  = (string)ev.RefID;
        if ( widget.Equals(null)) return;
        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK) {
            if (widget.GetId() == "uiselectlistcode" ) {
                AtomicMain.AppLog( "UISelectList support : " + widget.GetId() + " was pressed " );
                AtomicMain.ViewCode ( "Components/code_uiselectlist.cs", widget.GetParent() );
            }
            if (widget.GetId() ==  "uiselectlistlayout" ) {
                AtomicMain.AppLog( "UISelectList support : " + widget.GetId() + " was pressed ");
                AtomicMain.ViewCode ( "Scenes/layout_uiselectlist.ui.txt", widget.GetParent() );
            }

            if (widget.GetId() ==  "UISelectListDemo" ) {
                AtomicMain.AppLog( "UISelectList event : " + widget.GetId() + " and " + refid + " was selected ");
            }

            if (widget.GetId() ==  "selectlistadd" ) {
                AtomicMain.AppLog( "UISelectList action : " + widget.GetId() + " was pressed ");
                UISelectList  slist = (UISelectList)widget.FindWidget("UISelectListDemo");
                slist.AddItem(slist.GetNumItems(), "New Entry");
            }
            if (widget.GetId() ==  "selectlistdel" ) {
                AtomicMain.AppLog( "UISelectList action : " + widget.GetId() + " was pressed ");
                UISelectList  slist = (UISelectList)widget.FindWidget("UISelectListDemo");
                int si = (int)slist.GetValue(); // this is the selected index
                slist.DeleteItem(si);
            }
            if (widget.GetId() ==  "selectlistdelall" ) {
                AtomicMain.AppLog( "UISelectList action : " + widget.GetId() + " was pressed ");
                UISelectList  slist = (UISelectList)widget.FindWidget("UISelectListDemo");
                slist.DeleteAllItems();
            }
            if (widget.GetId() ==  "selectlistnew" ) {
                AtomicMain.AppLog( "UISelectList action : " + widget.GetId() + " was pressed ");
                UISelectList  slist = (UISelectList)widget.FindWidget("UISelectListDemo");
                UISelectItemSource  sis = new UISelectItemSource();
                sis.AddItem( new UISelectItem( "list 1","list1", "LogoAtomic" ));
                sis.AddItem( new UISelectItem( "list 2","list2", "" ));
                sis.AddItem( new UISelectItem( "list 3","list3", "" ));
                sis.AddItem( new UISelectItem( "list 4","list4", "" ));
                sis.AddItem( new UISelectItem( "list 5","list5", "" ));
                sis.AddItem( new UISelectItem( "list 6","list6", "" ));
                slist.SetSource(sis);
            }
        }
    }
}

