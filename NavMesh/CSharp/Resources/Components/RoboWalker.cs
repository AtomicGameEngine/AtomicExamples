using System;
using AtomicEngine;

public class RoboWalker : CSComponent
{
    void Start()
    {
        // Create the CrowdAgent
        var agent = Node.CreateComponent<CrowdAgent>();
        agent.Height = 2.0f;
        agent.MaxSpeed = 3.0f;
        agent.MaxAccel = 3.0f;

    }

    void Update(float timeStep)
    {

    }

}
