#pragma once

#include <Atomic/Engine/Application.h>

namespace Atomic
{
class Node;
class Scene;
class UIView;
}

using namespace Atomic;

//
// for eye candy-ization only 
//
#include <Atomic/Scene/LogicComponent.h>

/// Custom logic component for rotating a scene node. From Urho3D samples
class Rotator : public LogicComponent
{
    ATOMIC_OBJECT(Rotator, LogicComponent);

public:
    Rotator(Context* context); /// Construct.
    void SetRotationSpeed(const Vector3& speedxyz); /// Set rotation speed about the Euler axes. Will be scaled with scene update time step.
    virtual void Update(float timeStep);  /// Handle scene update. Called by LogicComponent base class.
    const Vector3& GetRotationSpeed() const
    {
        return rotationSpeed_;    /// Return rotation speed.
    }
private:
    Vector3 rotationSpeed_;  /// Rotation speed.
};

