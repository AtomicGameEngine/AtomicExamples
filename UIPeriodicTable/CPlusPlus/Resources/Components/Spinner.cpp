#include <Atomic/Scene/Node.h>
#include "Spinner.h"

//
//  this class is for eye candy-ization only
//
Rotator::Rotator(Context* context) :
    LogicComponent(context),
    rotationSpeed_(Vector3::ZERO)
{
    SetUpdateEventMask(USE_UPDATE);
}

void Rotator::SetRotationSpeed(const Vector3& speedxyz)
{
    rotationSpeed_ = speedxyz;
}

void Rotator::Update(float timeStep)
{
    node_->Rotate(Quaternion(rotationSpeed_.x_ * timeStep, rotationSpeed_.y_ * timeStep, rotationSpeed_.z_ * timeStep));
}





/*
"atomic component";

//define inspector fields
var inspectorFields = {
    //value speed will be able to be edited from editor
    //default value sets to the 1.0, so speed has a number type
    speed: 1.0
};

exports.component = function(self) {

    //update function calls each frame
    self.update = function(timeStep) {
        //rotate node around Y axis
        self.node.yaw(timeStep * 75 * self.speed);
    };

};

*/
