// UISelectItem and UISelectItemSource application source code
using System;
using AtomicEngine;

public class code_uiselectitem  : CSComponent {

    private static UISelectItemSource sis;

    public void Setup( UIWidget  layout )
    {
        var dest = new AtomicEngine.Vector<AtomicEngine.UIWidget>();
        layout.SearchWidgetClass( "TBButton", dest );
        for (var ii = 0; ii < dest.Size; ii++) {
            dest[ii].SubscribeToEvent<WidgetEvent> (dest [ii], HandleUiselectitemEvent );
        }

        UISelectList  mylist = new UISelectList();
        mylist.SetId( "UISelectItemList"); // tag it, in case we want to get it again later
        UILayoutParams lpx = new UILayoutParams();
        lpx.SetWidth (200);
        lpx.SetHeight(256);
        lpx.SetMinWidth(200);
        lpx.SetMinHeight(256);
        lpx.SetMaxWidth (200);
        lpx.SetMaxHeight(256);
        mylist.SetLayoutParams(lpx);
        UIWidget lower = layout.GetWidget("selectitemlower");
        UIWidget mysvc = layout.GetWidget("selectitemlayout");
        mysvc.AddChildBefore(mylist, lower);
        mylist.SubscribeToEvent<WidgetEvent> (mylist, HandleUiselectitemEvent );

        sis = new UISelectItemSource();
        sis.AddItem( new UISelectItem( "UISelectItem1", "sitem1" ) );
        sis.AddItem( new UISelectItem( "UISelectItem2", "sitem2" ) );
        sis.AddItem( new UISelectItem( "UISelectItem3", "sitem3", "DuckButton" ) );
        sis.AddItem( new UISelectItem( "UISelectItem4", "sitem4", "LogoAtomic" ) );

        mylist.SetSource(sis); // assign this into the list
    }


    private static void HandleUiselectitemEvent ( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        string refid  = (string)ev.RefID;
        if ( widget.Equals(null)) return;
        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK) {
            if (widget.GetId() == "uiselectitemcode" ) {
                AtomicMain.AppLog( "UISelectItem support : " + widget.GetId() + " was pressed " );
                AtomicMain.ViewCode ( "Components/code_uiselectitem.cs", widget.GetParent() );
            }
            if (widget.GetId() ==  "uiselectitemlayout" ) {
                AtomicMain.AppLog( "UISelectItem support : " + widget.GetId() + " was pressed ");
                AtomicMain.ViewCode ( "Scenes/layout_uiselectitem.ui.txt", widget.GetParent() );
            }

            if (widget.GetId() ==  "UISelectItemList" ) {
                AtomicMain.AppLog( "UISelectItem event : " + widget.GetId() + " and " + refid + " was selected ");
            }

            if (widget.GetId() ==  "uisi1" ) {
                AtomicMain.AppLog( "UISelectItem action : " + widget.GetId() + " was pressed ");
                UISelectList  slist = (UISelectList)widget.FindWidget("UISelectItemList");
                sis.AddItem( new UISelectItem( "New UISelectItem") );
                slist.SetSource(sis);
            }
            if (widget.GetId() ==  "uisi2" ) {
                AtomicMain.AppLog( "UISelectItem action : " + widget.GetId() + " was pressed ");
                UISelectList  slist = (UISelectList)widget.FindWidget("UISelectItemList");
                sis.AddItem( new UISelectItem( "Newer UISelectItem", "neweritem" ) );
                slist.SetSource(sis);
            }
            if (widget.GetId() ==  "uisi3" ) {
                AtomicMain.AppLog( "UISelectItem action : " + widget.GetId() + " was pressed ");
                UISelectList  slist = (UISelectList)widget.FindWidget("UISelectItemList");
                sis.AddItem( new UISelectItem( "A Duck", "aduck", "DuckButton" ) );
                slist.SetSource(sis);
            }
            if (widget.GetId() ==  "uisi4" ) {
                AtomicMain.AppLog( "UISelectItem action : " + widget.GetId() + " was pressed ");
                UISelectList  slist = (UISelectList)widget.FindWidget("UISelectItemList");
                sis.AddItem( new UISelectItem( "Atomic!", "atomic", "LogoAtomic" ) );
                slist.SetSource(sis);
            }
            if (widget.GetId() ==  "uisi5" ) {
                AtomicMain.AppLog( "UISelectItem action : " + widget.GetId() + " was pressed ");
                UISelectList  slist = (UISelectList)widget.FindWidget("UISelectItemList");
                sis.Clear();
                slist.SetSource(sis);
            }
        }
    }
}

