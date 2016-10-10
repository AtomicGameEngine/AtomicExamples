using System;
using AtomicEngine;

public class CharacterExample : CSComponent
{
    void Start()
    {

        SubscribeToEvent<KeyDownEvent>(e =>
        {
            if (e.Key == Constants.KEY_ESCAPE)
                GetSubsystem<Engine>().Exit();
        });

        Node objectNode = Scene.CreateChild("AtomicMutant");

        objectNode.Scale = new Vector3(1.5f, 1.5f, 1.5f);
        objectNode.Position = Node.Position;

        // spin node
        Node adjustNode = objectNode.CreateChild("AdjNode");
        adjustNode.Rotation = Quaternion.FromAxisAngle(new Vector3(0, 1, 0), 180);

        // Create the rendering component + animation controller
        AnimatedModel animatedModel = adjustNode.CreateComponent<AnimatedModel>();

        animatedModel.Model = AtomicNET.Cache.GetResource<Model>("Models/Mutant/Mutant.mdl");
        animatedModel.Material = AtomicNET.Cache.GetResource<Material>("Models/Mutant/Materials/mutant_M.material");
        animatedModel.CastShadows = true;

        // Create animation controller
        adjustNode.CreateComponent<AnimationController>();

        // Create rigidbody, and set non-zero mass so that the body becomes dynamic
        RigidBody body = objectNode.CreateComponent<RigidBody>();
        body.CollisionLayer = 1;
        body.Mass = 1.0f;

        // Set zero angular factor so that physics doesn't turn the character on its own.
        // Instead we will control the character yaw manually
        body.AngularFactor = Vector3.Zero;

        // Set the rigidbody to signal collision also when in rest, so that we get ground collisions properly
        body.CollisionEventMode = CollisionEventMode.COLLISION_ALWAYS;

        // Set a capsule shape for collision
        CollisionShape shape = objectNode.CreateComponent<CollisionShape>();
        shape.SetCapsule(1.5f, 1.8f, new Vector3(0.0f, 0.9f, 0.0f));

        character = objectNode.CreateComponent<Character>();


        AtomicNET.GetSubsystem<Renderer>().ShadowMapSize = 2048;

        // Get Camera from Scene
        Vector<Node> children = new Vector<Node>();
        Scene.GetChildrenWithComponent<Camera>(children, true);
        if (children.Size > 0)
        {
            cameraNode = children[0];
        }
    }

    Node cameraNode;
    Character character;

    float pitch = 0.0f;
    float yaw = 0.0f;

    void Update(float timeStep)
    {
        var input = GetSubsystem<Input>();

        input.SetMouseVisible(false);

        yaw += (float)input.MouseMoveX * PITCH_SENSITIVITY;
        pitch += (float)input.MouseMoveY * YAW_SENSITIVITY;

        // Limit pitch
        pitch = Clamp<float>(pitch, -80.0f, 80.0f);

        // Set rotation already here so that it's updated every rendering frame instead of every physics frame
        character.Node.Rotation = Quaternion.FromAxisAngle(Vector3.Up, yaw);

        if (input.GetKeyPress(Constants.KEY_F))
        {
            viewMode += 1;

            if (viewMode == 2)
                viewMode = 0;
        }

    }

    void PostUpdate(float timeStep)
    {
        if (cameraNode == null)
            return;

        Node characterNode = character.Node;

        // Get camera lookat dir from character yaw + pitch
        Quaternion rot = characterNode.Rotation;

        Quaternion dir = rot * Quaternion.FromAxisAngle(Vector3.Right, pitch);

        // Turn head to camera pitch, but limit to avoid unnatural animation

        Node headNode = characterNode.GetChild("Mutant:Head", true);

        float limitPitch = Clamp<float>(pitch, -45.0f, 45.0f);
        Quaternion headDir = rot * Quaternion.FromAxisAngle(new Vector3(1.0f, 0.0f, 0.0f), limitPitch);

        // This could be expanded to look at an arbitrary target, now just look at a point in front
        Vector3 headWorldTarget = headNode.WorldPosition + headDir * (new Vector3(0.0f, 0.0f, -1.0f));
        headNode.LookAt(headWorldTarget, new Vector3(0.0f, 1.0f, 0.0f));

        if (firstPerson)
        {
            cameraNode.Position = headNode.WorldPosition + rot * (new Vector3(0.0f, 0.15f, 0.2f));
            cameraNode.Rotation = dir;
        }
        else
        {
            // Third person camera: position behind the character
            Vector3 aimPoint;
            aimPoint = characterNode.Position + rot * (new Vector3(0.0f, 1.7f, 0.0f));

            // Collide camera ray with static physics objects (layer bitmask 2) to ensure we see the character properly
            Vector3 rayDir;

            if (viewMode == 0)
                rayDir = dir * Vector3.Back;
            else
            {
                dir = rot *  Quaternion.FromAxisAngle(Vector3.Up, 180.0f);
                rayDir = dir * Vector3.Back;
            }

            float rayDistance = CAMERA_INITIAL_DIST;

            //PhysicsRaycastResult result;
            //scene_->GetComponent<PhysicsWorld>()->RaycastSingle(result, Ray(aimPoint, rayDir), rayDistance, 2);
            //if (result.body_)
            //    rayDistance = Min(rayDistance, result.distance_);


            rayDistance = Clamp<float>(rayDistance, CAMERA_MIN_DIST, CAMERA_MAX_DIST);

            cameraNode.Position = aimPoint + rayDir * rayDistance;
            cameraNode.Rotation = dir;
        }


    }

    static T Clamp<T>(T val, T min, T max) where T : IComparable<T>
    {
        if (val.CompareTo(min) < 0) return min;
        else if (val.CompareTo(max) > 0) return max;
        else return val;
    }

    const float CAMERA_MIN_DIST = 1.0f;
    const float CAMERA_INITIAL_DIST = 6.0f;
    const float CAMERA_MAX_DIST = 20.0f;
    const float YAW_SENSITIVITY = 0.1f;
    const float PITCH_SENSITIVITY = 0.1f;


    int viewMode;
    bool firstPerson = false;

}
