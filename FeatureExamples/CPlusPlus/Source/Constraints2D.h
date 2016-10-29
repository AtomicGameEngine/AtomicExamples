//
// Copyright (c) 2008-2016 the Urho3D project.
// Copyright (c) 2014-2016, THUNDERBEAST GAMES LLC All rights reserved
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

namespace Atomic
{
    class Node;
    class Scene;
    class Camera;
    class ConstraintDistance2D;
    class ConstraintFriction2D;
    class ConstraintGear2D;
    class ConstraintMotor2D;
    class ConstraintMouse2D;
    class ConstraintPrismatic2D;
    class ConstraintPulley2D;
    class ConstraintRevolute2D;
    class ConstraintRope2D;
    class ConstraintWeld2D;
    class ConstraintWheel2D;
}

using namespace Atomic;

/// Urho2D constraints sample.
/// This sample is designed to help understanding and chosing the right constraint.
/// This sample demonstrates:
///     - Creating physics constraints
///     - Creating Edge and Polygon Shapes from vertices
///     - Displaying physics debug geometry and constraints' joints
///     - Using SetOrderInLayer to alter the way sprites are drawn in relation to each other
///     - Using Text3D to display some text affected by zoom
///     - Setting the background color for the scene
class Constraints2D : public Sample
{
    ATOMIC_OBJECT(Constraints2D, Sample)

public:
    /// Construct.
    Constraints2D(Context* context);

    /// Setup after engine initialization and before running the main loop.
    virtual void Start();

protected:

private:
    /// Construct the scene content.
    void CreateScene();
    /// Construct an instruction text to the UI.
    void CreateInstructions();
    /// Create Tex3D flag.
    void CreateFlag(const String& text, float x, float y);
    /// Read input and moves the camera.
    void MoveCamera(float timeStep);
    /// Subscribe to application-wide logic update events.
    void SubscribeToEvents();
    /// Handle the logic update event.
    void HandleUpdate(StringHash eventType, VariantMap& eventData);
    /// Handle the post render update event during which we request debug geometry.
    void HandlePostRenderUpdate(StringHash eventType, VariantMap& eventData);
    /// Handle the mouse click event.
    void HandleMouseButtonDown(StringHash eventType, VariantMap& eventData);
    /// Handle the mouse button up event.
    void HandleMouseButtonUp(StringHash eventType, VariantMap& eventData);
    /// Handle the mouse move event.
    void HandleMouseMove(StringHash eventType, VariantMap& eventData);
    /// Handle the touch begin event.
    void HandleTouchBegin3(StringHash eventType, VariantMap& eventData);
    /// Handle the touch move event.
    void HandleTouchMove3(StringHash eventType, VariantMap& eventData);
    /// Handle the touch end event.
    void HandleTouchEnd3(StringHash eventType, VariantMap& eventData);
    /// Get mouse position in 2D world coordinates.
    Vector2 GetMousePositionXY();
    /// Flag for drawing debug geometry.
    bool drawDebug_;
    /// Camera object.
    Camera* camera_;
};
