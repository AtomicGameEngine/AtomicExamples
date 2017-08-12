// handle the periodic table jumps
using System;
using AtomicEngine;

public class code_table : CSComponent {

    public void Setup( UILayout mylayout )
    {
        UILayout pgtable = (UILayout) mylayout.GetWidget("pagetable");
        var dest = new AtomicEngine.Vector<AtomicEngine.UIWidget>();
        pgtable.SearchWidgetClass( "TBButton", dest );
        for (var ii = 0; ii < dest.Size; ii++) {  // set bulk event handlers on all buttons -- boom!
            dest[ii].SubscribeToEvent<WidgetEvent> (dest [ii], HandleTableEvent);
        }
    }

    // handle table clicks
    private static void HandleTableEvent ( WidgetEvent ev )
    {
        UIWidget widget = (UIWidget)ev.Target;
        if ( widget.Equals(null)) return;
        if ( ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK) {
            UITabContainer  maintb = (UITabContainer)widget.FindWidget("maintabs");
            UITabContainer  acttb = (UITabContainer)widget.FindWidget("primarytabs");
            UITabContainer  semitb = (UITabContainer)widget.FindWidget("moretabs");
            UITabContainer  viewtb = (UITabContainer)widget.FindWidget("supporttabs");
            UITabContainer  supporttb = (UITabContainer)widget.FindWidget("atomictabs");

            if (widget.GetId() ==  "A1" ) {
                maintb.SetCurrentPage(1);
                acttb.SetCurrentPage(0);
            }
            if (widget.GetId() ==  "A2" ) {
                maintb.SetCurrentPage(1);
                acttb.SetCurrentPage(1);
            }
            if (widget.GetId() ==  "A3" ) {
                maintb.SetCurrentPage(1);
                acttb.SetCurrentPage(2);
            }
            if (widget.GetId() ==  "A4" ) {
                maintb.SetCurrentPage(1);
                acttb.SetCurrentPage(3);
            }
            if (widget.GetId() ==  "A5" ) {
                maintb.SetCurrentPage(1);
                acttb.SetCurrentPage(4);
            }
            if (widget.GetId() ==  "A6" ) {
                maintb.SetCurrentPage(1);
                acttb.SetCurrentPage(5);
            }
            if (widget.GetId() ==  "A7" ) {
                maintb.SetCurrentPage(1);
                acttb.SetCurrentPage(6);
            }
            if (widget.GetId() ==  "A8" ) {
                maintb.SetCurrentPage(1);
                acttb.SetCurrentPage(7);
            }
            if (widget.GetId() ==  "A9" ) {
                maintb.SetCurrentPage(1);
                acttb.SetCurrentPage(8);
            }

            if (widget.GetId() ==  "B1" ) {
                maintb.SetCurrentPage(2);
                semitb.SetCurrentPage(0);
            }
            if (widget.GetId() ==  "B2" ) {
                maintb.SetCurrentPage(2);
                semitb.SetCurrentPage(1);
            }
            if (widget.GetId() ==  "B3" ) {
                maintb.SetCurrentPage(2);
                semitb.SetCurrentPage(2);
            }
            if (widget.GetId() ==  "B4" ) {
                maintb.SetCurrentPage(2);
                semitb.SetCurrentPage(3);
            }
            if (widget.GetId() ==  "B5" ) {
                maintb.SetCurrentPage(2);
                semitb.SetCurrentPage(4);
            }
            if (widget.GetId() ==  "B6" ) {
                maintb.SetCurrentPage(2);
                semitb.SetCurrentPage(5);
            }
            if (widget.GetId() ==  "B7" ) {
                maintb.SetCurrentPage(2);
                semitb.SetCurrentPage(6);
            }
            if (widget.GetId() ==  "B8" ) {
                maintb.SetCurrentPage(2);
                semitb.SetCurrentPage(7);
            }
            if (widget.GetId() ==  "B9" ) {
                maintb.SetCurrentPage(2);
                semitb.SetCurrentPage(8);
            }

            if (widget.GetId() ==  "C1" ) {
                maintb.SetCurrentPage(3);
                viewtb.SetCurrentPage(0);
            }
            if (widget.GetId() ==  "C2" ) {
                maintb.SetCurrentPage(3);
                viewtb.SetCurrentPage(1);
            }
            if (widget.GetId() ==  "C3" ) {
                maintb.SetCurrentPage(3);
                viewtb.SetCurrentPage(2);
            }
            if (widget.GetId() ==  "C4" ) {
                maintb.SetCurrentPage(3);
                viewtb.SetCurrentPage(3);
            }
            if (widget.GetId() ==  "C5" ) {
                maintb.SetCurrentPage(3);
                viewtb.SetCurrentPage(4);
            }
            if (widget.GetId() ==  "C6" ) {
                maintb.SetCurrentPage(3);
                viewtb.SetCurrentPage(5);
            }
            if (widget.GetId() ==  "C7" ) {
                maintb.SetCurrentPage(3);
                viewtb.SetCurrentPage(6);
            }
            if (widget.GetId() ==  "C8" ) {
                maintb.SetCurrentPage(3);
                viewtb.SetCurrentPage(7);
            }
            if (widget.GetId() ==  "C9" ) {
                maintb.SetCurrentPage(3);
                viewtb.SetCurrentPage(8);
            }

            if (widget.GetId() ==  "D2" ) {
                maintb.SetCurrentPage(4);
                supporttb.SetCurrentPage(0);
            }
            if (widget.GetId() ==  "D3" ) {
                maintb.SetCurrentPage(4);
                supporttb.SetCurrentPage(1);
            }
            if (widget.GetId() ==  "D4" ) {
                maintb.SetCurrentPage(4);
                supporttb.SetCurrentPage(2);
            }
            if (widget.GetId() ==  "D5" ) {
                maintb.SetCurrentPage(4);
                supporttb.SetCurrentPage(3);
            }
            if (widget.GetId() ==  "D6" ) {
                maintb.SetCurrentPage(4);
                supporttb.SetCurrentPage(4);
            }
            if (widget.GetId() ==  "D7" ) {
                maintb.SetCurrentPage(4);
                supporttb.SetCurrentPage(5);
            }
            if (widget.GetId() ==  "D8" ) {
                maintb.SetCurrentPage(4);
                supporttb.SetCurrentPage(6);
            }
            if (widget.GetId() ==  "D9" ) {
                maintb.SetCurrentPage(4);
                supporttb.SetCurrentPage(7);
            }
        }
    }
}

