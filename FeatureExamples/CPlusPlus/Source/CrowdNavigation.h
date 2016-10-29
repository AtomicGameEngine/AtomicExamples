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

class Drawable;
class Node;
class Scene;
class DynamicNavigationMesh;

}

/// CrowdNavigation example.
/// This sample demonstrates:
///     - Generating a dynamic navigation mesh into the scene
///     - Performing path queries to the navigation mesh
///     - Adding and removing obstacles/agents at runtime
///     - Raycasting drawable components
///     - Crowd movement management
///     - Accessing crowd agents with the crowd manager
///     - Using off-mesh connections to make boxes climbable
///     - Using agents to simulate moving obstacles
class CrowdNavigation : public Sample
{
    ATOMIC_OBJECT(CrowdNavigation, Sample)

public:
    /// Construct.
    CrowdNavigation(Context* context);

    /// Setup after engine initialization and before running the main loop.
    virtual void Start();

protected:

private:
    /// Construct the scene content.
    void CreateScene();
    /// Construct user interface elements.
    void CreateUI();
    /// Set up a viewport for displaying the scene.
    void SetupViewport();
    /// Subscribe to application-wide logic update and post-render update events.
    void SubscribeToEvents();
    /// Read input and moves the camera.
    void MoveCamera(float timeStep);
    /// Set crowd agents target or spawn another jack.
    void SetPathPoint(bool spawning);
    /// Add new obstacle or remove existing obstacle/agent.
    void AddOrRemoveObject();
    /// Create a "Jack" object at position.
    void SpawnJack(const Vector3& pos, Node* jackGroup);
    /// Create a mushroom object at position.
    void CreateMushroom(const Vector3& pos);
    /// Create an off-mesh connection for each box to make it climbable.
    void CreateBoxOffMeshConnections(DynamicNavigationMesh* navMesh, Node* boxGroup);
    /// Create some movable barrels as crowd agents.
    void CreateMovingBarrels(DynamicNavigationMesh* navMesh);
    /// Utility function to raycast to the cursor position. Return true if hit.
    bool Raycast(float maxDistance, Vector3& hitPos, Drawable*& hitDrawable);
    /// Handle the logic update event.
    void HandleUpdate(StringHash eventType, VariantMap& eventData);
    /// Handle the post-render update event.
    void HandlePostRenderUpdate(StringHash eventType, VariantMap& eventData);
    /// Handle problems with crowd agent placement.
    void HandleCrowdAgentFailure(StringHash eventType, VariantMap& eventData);
    /// Handle crowd agent reposition.
    void HandleCrowdAgentReposition(StringHash eventType, VariantMap& eventData);
    /// Handle crowd agent formation.
    void HandleCrowdAgentFormation(StringHash eventType, VariantMap& eventData);

    /// Flag for drawing debug geometry.
    bool drawDebug_;
};
