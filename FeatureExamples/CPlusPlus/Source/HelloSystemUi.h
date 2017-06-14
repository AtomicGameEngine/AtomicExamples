//
// Copyright (c) 2017 the Atomic project.
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

#include "Sample.h"
#include <Atomic/UI/SystemUI/MessageBox.h>


class HelloSystemUi : public Sample
{
    ATOMIC_OBJECT(HelloSystemUi, Sample)
public:
    /// Construct.
    HelloSystemUi(Context* context);
    /// Setup after engine initialization and before running the main loop.
    virtual void Start();

private:
    /// Creates scene that gives screen a background color.
    void CreateScene();
    /// Subscribe to application-wide logic update events.
    void SubscribeToEvents();
    /// Render SystemUi.
    void RenderUi(StringHash eventType, VariantMap& eventData);
    /// Handle keyboard events.
    void HandleKeyDown(StringHash eventType, VariantMap& eventData);

    /// Reference holding message box.
    SharedPtr<SystemUI::MessageBox> messageBox_;
};
