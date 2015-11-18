
using AtomicEngine;
using System;

namespace Basic3D
{
    public class Spinner : CSComponent
    {
        [Inspector]
        float speed = 1.0f;

        [Inspector]
        float pitchSpeed = 0.0f;

        public override void Update(float timeStep)
        {
            Node.Yaw(timeStep * speed * 75.0f);
            Node.Pitch(timeStep * pitchSpeed * 75.0f);
        }
    }

}
