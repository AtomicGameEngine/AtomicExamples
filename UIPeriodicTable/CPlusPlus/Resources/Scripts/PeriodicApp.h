//
// Copyright (c) 2008-2016 the Urho3D project.
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

#pragma once

#include <Atomic/Engine/Application.h>
#include <Atomic/Input/Input.h>
#include <Atomic/UI/UIEvents.h>
#include <Atomic/UI/UIWidget.h>
#include <Atomic/IO/Log.h>

namespace Atomic
{
class Node;
class Scene;
class UIView;
class UITextField;
}

using namespace Atomic;

class PeriodicApp : public Application
{
    ATOMIC_OBJECT(PeriodicApp, Application)

public:
    /// Constructor
    PeriodicApp(Context* context);
    /// Setup before engine initialization. Modifies the engine parameters.
    virtual void Setup();
    /// Setup after engine initialization. Creates the logo, console & debug HUD.
    virtual void Start();
    /// Cleanup after the main loop. Called by Application.
    virtual void Stop();

    void setup_table( UIWidget *layout);
    void setup_uibargraph( UIWidget *layout);
    void setup_uibutton( UIWidget *layout);
    void setup_uicheckbox( UIWidget *layout);
    void setup_uiclicklabel( UIWidget *layout);
    void setup_uicolorwheel( UIWidget *layout);
    void setup_uicolorwidget( UIWidget *layout);
    void setup_uicontainer( UIWidget *layout);
    void setup_uieditfield( UIWidget *layout);
    void setup_uifinderwindow( UIWidget *layout, UIView *someview);
    void setup_uifontdescription( UIWidget *layout);
    void setup_uiimagewidget( UIWidget *layout);
    void setup_uiinlineselect( UIWidget *layout);
    void setup_uilayoutparams( UIWidget *layout);
    void setup_uilayout( UIWidget *layout, UIView *someview);
    void setup_uimenuitem( UIWidget *layout);
    void setup_uimenuwindow( UIWidget *layout);
    void setup_uimessagewindow( UIWidget *layout);
    void setup_uipromptwindow( UIWidget *layout, UIView *someview);
    void setup_uipulldownmenu( UIWidget *layout);
    void setup_uiradiobutton( UIWidget *layout);
    void setup_uisceneview( UIWidget *layout);
    void setup_uiscrollbar( UIWidget *layout);
    void setup_uiscrollcontainer( UIWidget *layout);
    void setup_uisection( UIWidget *layout);
    void setup_uiselectdropdown( UIWidget *layout);
    void setup_uiselectitem( UIWidget *layout);
    void setup_uiselectlist( UIWidget *layout);
    void setup_uiseparator( UIWidget *layout);
    void setup_uiskinimage( UIWidget *layout);
    void setup_uislider( UIWidget *layout);
    void setup_uitabcontainer( UIWidget *layout);
    void setup_uitextfield( UIWidget *layout);
    void setup_uitexturewidget( UIWidget *layout);
    void setup_uiwidget( UIWidget *layout);
    void setup_uiwindow( UIWidget *layout, UIView *someview);

protected:

    void HandleExitEvent(StringHash eventType, VariantMap& eventData);  // handle exit (atomic logo) button.

    void HandleTableEvent(StringHash eventType, VariantMap& eventData);  // handle table clicks
    void HandleUibargraphEvent(StringHash eventType, VariantMap& eventData);
    void HandleUibuttonEvent(StringHash eventType, VariantMap& eventData);
    void HandleUicheckboxEvent(StringHash eventType, VariantMap& eventData);
    void HandleUiclicklabelEvent(StringHash eventType, VariantMap& eventData);
    void HandleUicolorwheelEvent(StringHash eventType, VariantMap& eventData);
    void HandleUicolorwidgetEvent(StringHash eventType, VariantMap& eventData);
    void HandleUicontainerEvent(StringHash eventType, VariantMap& eventData);
    void HandleUieditfieldEvent(StringHash eventType, VariantMap& eventData);
    void HandleUifinderwindowEvent(StringHash eventType, VariantMap& eventData);
    void HandleUifontdescriptionEvent(StringHash eventType, VariantMap& eventData);
    void HandleUiimagewidgetEvent(StringHash eventType, VariantMap& eventData);
    void HandleUiinlineselectEvent(StringHash eventType, VariantMap& eventData);
    void HandleUilayoutparamsEvent(StringHash eventType, VariantMap& eventData);
    void HandleUilayoutEvent(StringHash eventType, VariantMap& eventData);
    void HandleUimenuitemEvent(StringHash eventType, VariantMap& eventData);
    void HandleUimenuwindowEvent(StringHash eventType, VariantMap& eventData);
    void HandleUimessagewindowEvent(StringHash eventType, VariantMap& eventData);
    void HandleUipromptwindowEvent(StringHash eventType, VariantMap& eventData);
    void HandleUipulldownmenuEvent(StringHash eventType, VariantMap& eventData);
    void HandleUiradiobuttonEvent(StringHash eventType, VariantMap& eventData);
    void HandleUisceneviewEvent(StringHash eventType, VariantMap& eventData);
    void HandleUiscrollbarEvent(StringHash eventType, VariantMap& eventData);
    void HandleUiscrollcontainerEvent(StringHash eventType, VariantMap& eventData);
    void HandleUisectionEvent(StringHash eventType, VariantMap& eventData);
    void HandleUiselectdropdownEvent(StringHash eventType, VariantMap& eventData);
    void HandleUiselectitemEvent(StringHash eventType, VariantMap& eventData);
    void HandleUiselectlistEvent(StringHash eventType, VariantMap& eventData);
    void HandleUiseparatorEvent(StringHash eventType, VariantMap& eventData);
    void HandleUiskinimageEvent(StringHash eventType, VariantMap& eventData);
    void HandleUisliderEvent(StringHash eventType, VariantMap& eventData);
    void HandleUitabcontainerEvent(StringHash eventType, VariantMap& eventData);
    void HandleUitextfieldEvent(StringHash eventType, VariantMap& eventData);
    void HandleUitexturewidgetEvent(StringHash eventType, VariantMap& eventData);
    void HandleUiwidgetEvent(StringHash eventType, VariantMap& eventData);
    void HandleUiwindowEvent(StringHash eventType, VariantMap& eventData);

    void HandleFinderCompleteEvent(StringHash eventType, VariantMap& eventData);
    void HandlePromptCompleteEvent(StringHash eventType, VariantMap& eventData);
    void HandleMessageCompleteEvent(StringHash eventType, VariantMap& eventData);

    // for widget class event handlers
    void HandleAllScrollcontainerEvent(StringHash eventType, VariantMap& eventData);
    void HandleAllSelectdropdownEvent(StringHash eventType, VariantMap& eventData);
    void HandleAllSliderEvent(StringHash eventType, VariantMap& eventData);
    void HandleAllTabcontainerEvent(StringHash eventType, VariantMap& eventData);

    void AppLog ( const String &logtext );
    void ViewCode ( String filename, UIWidget *layoutParent );
    void HandleViewCodeEvent(StringHash eventType, VariantMap& eventData);
    String EventReport ( int eventNumber );
    UIWidget *FindTheWindowParent( UIWidget* fromThisWidget ); // for use with close buttons in windows
     
private:

    void HandleKeyDown(StringHash eventType, VariantMap& eventData); // basic service to collect keys
    void SetWindowTitleAndIcon(); // basic service to fix up window

    void DoSomething();  // This is your game, any questions?
    WeakPtr<Scene> scene_;  // scene support for your game
    WeakPtr<UIView> uiview_; // widget support for your game
    WeakPtr<UITextField> uilog_; // widget support for your game

};

