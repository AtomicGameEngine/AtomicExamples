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
// UIPeriodicTable example

using System;
using AtomicEngine;
using AtomicPlayer;

// list all the classes
using static code_table;
using static code_uibargraph;
using static code_uibutton;
using static code_uicheckbox;
using static code_uiclicklabel;
using static code_uicolorwheel;
using static code_uicolorwidget;
using static code_uicontainer;
using static code_uieditfield;
using static code_uifinderwindow;
using static code_uifontdescription;
using static code_uiimagewidget;
using static code_uiinlineselect;
using static code_uilayout;
using static code_uilayoutparams;
using static code_uimenuitem;
using static code_uimenuwindow;
using static code_uimessagewindow;
using static code_uipromptwindow;
using static code_uipulldownmenu;
using static code_uiradiobutton;
using static code_uisceneview;
using static code_uiscrollbar;
using static code_uiscrollcontainer;
using static code_uisection;
using static code_uiselectdropdown;
using static code_uiselectitem;
using static code_uiselectlist;
using static code_uiseparator;
using static code_uiskinimage;
using static code_uislider;
using static code_uitabcontainer;
using static code_uitextfield;
using static code_uitexturewidget;
using static code_uiwidget;
using static code_uiwindow;

public class AtomicMain : AppDelegate {
    public static UIView myuivew;
    public static UITextField mylog;
    public static UILayout mylayout;

    public override void Start ()
    {
        AtomicNET.GetSubsystem<Player> ().LoadScene ("Scenes/Scene.scene");

        var ui = GetSubsystem<UI> ();
        ui.AddFont ("Textures/BrokenGlass.ttf", "BrokenGlass"); // add a gooder font
        ui.LoadSkin ("Textures/desktop.tb.txt"); // load in the app skin

        ResourceCache cache = GetSubsystem<ResourceCache> ();
        Graphics graphics = GetSubsystem<Graphics> ();
        graphics.SetWindowTitle ("PeriodicApp");
        Image icon = cache.GetResource<Image> ("Textures/AtomicLogo32.png");
        graphics.SetWindowIcon (icon);

        myuivew = new UIView ();
        mylayout = new UILayout ();  // make the host widget for all visible ui
        mylayout.SetId ("UIPeriodicTable"); // tag it, like a big game scientist
        mylayout.SetRect (myuivew.GetRect ()); //size it to fill the screen area
        mylayout.SetLayoutConfig ("YAGAC");  //all-in-one setting
        mylayout.SetSkinBg ("background_solid");  // make it look gooder
        mylayout.Load ("Scenes/main_layout.ui.txt"); // load the main layout
        myuivew.AddChild (mylayout); // And make it show up.

        UITabContainer maintb = (UITabContainer)mylayout.GetWidget ("maintabs");
        UITabContainer acttb = (UITabContainer)mylayout.GetWidget ("primarytabs");
        UITabContainer semitb = (UITabContainer)mylayout.GetWidget ("moretabs");
        UITabContainer viewtb = (UITabContainer)mylayout.GetWidget ("supporttabs");
        UITabContainer supporttb = (UITabContainer)mylayout.GetWidget ("atomictabs");
        supporttb.SetCurrentPage (0);
        viewtb.SetCurrentPage (0);
        semitb.SetCurrentPage (0);
        acttb.SetCurrentPage (0);
        maintb.SetCurrentPage (0); // do this or else the tab contents look like crap!
        mylog = (UITextField)mylayout.GetWidget ("LogText");
        UIWidget ea = mylayout.GetWidget ("exitapp");

        var cota = new code_table ();
        cota.Setup (mylayout);
        var cobg = new code_uibargraph ();
        cobg.Setup (mylayout.GetWidget ("pageuibargraph"));
        var cobu = new code_uibutton ();
        cobu.Setup (mylayout.GetWidget ("pageuibutton"));
        var cocb = new code_uicheckbox ();
        cocb.Setup (mylayout.GetWidget ("pageuicheckbox"));
        var cocl = new code_uiclicklabel ();
        cocl.Setup (mylayout.GetWidget ("pageuiclicklabel"));
        var coch = new code_uicolorwheel ();
        coch.Setup (mylayout.GetWidget ("pageuicolorwheel"));
        var cocw = new code_uicolorwidget ();
        cocw.Setup (mylayout.GetWidget ("pageuicolorwidget"));
        var coco = new code_uicontainer ();
        coco.Setup (mylayout.GetWidget ("pageuicontainer"));
        var coef = new code_uieditfield ();
        coef.Setup (mylayout.GetWidget ("pageuieditfield"));
        var cofw = new code_uifinderwindow ();
        cofw.Setup (mylayout.GetWidget ("pageuifinderwindow"));
        var cofd = new code_uifontdescription ();
        cofd.Setup (mylayout.GetWidget ("pageuifontdescription"));
        var coiw = new code_uiimagewidget ();
        coiw.Setup (mylayout.GetWidget ("pageuiimagewidget"));
        var cois = new code_uiinlineselect ();
        cois.Setup (mylayout.GetWidget ("pageuiinlineselect"));
        var colo = new code_uilayout ();
        colo.Setup (mylayout.GetWidget ("pageuilayout"));
        var colp = new code_uilayoutparams ();
        colp.Setup (mylayout.GetWidget ("pageuilayoutparams"));
        var comi = new code_uimenuitem ();
        comi.Setup (mylayout.GetWidget ("pageuimenuitem"));
        var comw = new code_uimenuwindow ();
        comw.Setup (mylayout.GetWidget ("pageuimenuwindow"));
        var come = new code_uimessagewindow ();
        come.Setup (mylayout.GetWidget ("pageuimessagewindow"));
        var copw = new code_uipromptwindow ();
        copw.Setup (mylayout.GetWidget ("pageuipromptwindow"));
        var copd = new code_uipulldownmenu ();
        copd.Setup (mylayout.GetWidget ("pageuipulldownmenu"));
        var corb = new code_uiradiobutton ();
        corb.Setup (mylayout.GetWidget ("pageuiradiobutton"));
        var cosv = new code_uisceneview ();
        cosv.Setup (mylayout.GetWidget ("pageuisceneview"));
        var cosb = new code_uiscrollbar ();
        cosb.Setup (mylayout.GetWidget ("pageuiscrollbar"));
        var cosc = new code_uiscrollcontainer ();
        cosc.Setup (mylayout.GetWidget ("pageuiscrollcontainer"));
        var cose = new code_uisection ();
        cose.Setup (mylayout.GetWidget ("pageuisection"));
        var cosd = new code_uiselectdropdown ();
        cosd.Setup (mylayout.GetWidget ("pageuiselectdropdown"));
        var cosi = new code_uiselectitem ();
        cosi.Setup (mylayout.GetWidget ("pageuiselectitem"));
        var cosl = new code_uiselectlist ();
        cosl.Setup (mylayout.GetWidget ("pageuiselectlist"));
        var cosp = new code_uiseparator ();
        cosp.Setup (mylayout.GetWidget ("pageuiseparator"));
        var cosk = new code_uiskinimage ();
        cosk.Setup (mylayout.GetWidget ("pageuiskinimage"));
        var cosa = new code_uislider ();
        cosa.Setup (mylayout.GetWidget ("pageuislider"));
        var cotc = new code_uitabcontainer ();
        cotc.Setup (mylayout.GetWidget ("pageuitabcontainer"));
        var cotf = new code_uitextfield ();
        cotf.Setup (mylayout.GetWidget ("pageuitextfield"));
        var cotw = new code_uitexturewidget ();
        cotw.Setup (mylayout.GetWidget ("pageuitexturewidget"));
        var cowd = new code_uiwidget ();
        cowd.Setup (mylayout.GetWidget ("pageuiwidget"));
        var cowi = new code_uiwindow ();
        cowi.Setup (mylayout.GetWidget ("pageuiwindow"));

        SubscribeToEvent<WidgetEvent> (ea, ev => {
            if (ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK) {
                GetSubsystem<Engine> ().Exit ();
            }
        });

        SubscribeToEvent<KeyDownEvent> (e => {
            if (e.Key == Constants.KEY_ESCAPE)
                GetSubsystem<Engine> ().Exit ();
        });

    }

    public static void AppLog (string logtext)
    {
        mylog.SetText (logtext);
    }

    public static void ViewCode (String filename, UIWidget layoutParent)
    {
        var cache = GetSubsystem<ResourceCache> ();
        UIWindow window = new UIWindow ();
        window.SetSettings (UI_WINDOW_SETTINGS.UI_WINDOW_SETTINGS_DEFAULT);
        window.SetText ("Code Viewer");
        window.Load ("Scenes/view_code.ui.txt");
        File filex = cache.GetFile (filename);
        string textx = filex.ReadText ();
        filex.Close ();
        UIWidget coder = window.GetWidget ("viewCodeText");
        coder.SetText (textx);
        window.ResizeToFitContent ();
        myuivew.AddChild (window);
        window.Center ();
        UIWidget someok = window.GetWidget ("viewCodeOK");
        someok.SubscribeToEvent<WidgetEvent> (someok, ev => {
            if (ev.Type == UI_EVENT_TYPE.UI_EVENT_TYPE_CLICK) {
                UIWindow mywindow = (UIWindow)FindTheWindowParent (ev.Target);
                if (!mywindow.Equals (null))
                    mywindow.Close ();
            }
        });
    }

    public static UIWidget FindTheWindowParent (UIWidget fromThisWidget)
    {
        if (fromThisWidget.Equals (null))
            return null;
        string tname = fromThisWidget.GetTypeName ();
        if (tname == "UIWindow" || tname == "UIDockWindow")
            return fromThisWidget;
        UIWidget tbw = fromThisWidget.GetParent ();
        while (!tbw.Equals (null)) {
            string stname = tbw.GetTypeName ();
            if (stname == "UIWindow" || stname == "UIDockWindow")
                return tbw;
            tbw = tbw.GetParent ();
        }
        return null;
    }

    public static string EventReport (int eventNumber)
    {
        switch (eventNumber) {
        case 0:
            return "UI_EVENT_TYPE_CLICK";
        case 1:
            return "UI_EVENT_TYPE_LONG_CLICK";
        case 2:
            return "UI_EVENT_TYPE_POINTER_DOWN";
        case 3:
            return "UI_EVENT_TYPE_POINTER_UP";
        case 4:
            return "UI_EVENT_TYPE_POINTER_MOVE";
        case 5:
            return "UI_EVENT_TYPE_RIGHT_POINTER_DOWN";
        case 6:
            return "UI_EVENT_TYPE_RIGHT_POINTER_UP";
        case 7:
            return "UI_EVENT_TYPE_WHEEL";
        case 8:
            return "UI_EVENT_TYPE_CHANGED";
        case 9:
            return "UI_EVENT_TYPE_KEY_DOWN";
        case 10:
            return "UI_EVENT_TYPE_KEY_UP";
        case 11:
            return "UI_EVENT_TYPE_SHORTCUT";
        case 12:
            return "UI_EVENT_TYPE_CONTEXT_MENU";
        case 13:
            return "UI_EVENT_TYPE_FILE_DROP";
        case 14:
            return "UI_EVENT_TYPE_TAB_CHANGED";
        case 15:
            return "UI_EVENT_TYPE_CUSTOM";
        }
        return "EVENT_UKNOWN";
    }

}
