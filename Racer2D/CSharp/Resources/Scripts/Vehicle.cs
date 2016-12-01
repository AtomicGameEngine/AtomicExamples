using System;
using System.Collections.Generic;
using System.Diagnostics;
using AtomicEngine;

public class Vehicle : CSComponent
{
    private List<Wheel> _wheels = new List<Wheel>();
    private Input _input = AtomicNET.GetSubsystem<Input>();
    private RigidBody2D _rigidBody;
    private ParticleEmitter2D _exhaustParticles;
    private SoundSource3D _soundSource;
    private SoundSource3D _suspensionSoundSource;
    private Sound _accelSound;
    private Sound _brakeSound;
    private Sound[] _suspensionSounds;
    private int _horsePower;
    private int _maxSpdFwd;
    private int _maxSpdBwd;
    private int _rollForce;

    //private float lastSuspensionSound; //TODO there's no Time subsystem?
    private DateTime lastSuspensionSound = DateTime.Now;

    // We use this for the wheel logic
    private class Wheel
    {
        private readonly RigidBody2D _rigidBody;
        private readonly ConstraintWheel2D _constraint;
        private readonly ParticleEmitter2D _particleEmitter;
        private readonly float _particlesDistance;

        // This struct is used to pass wheel dynamics data
        public struct DynamicsData
        {
            public bool IsInContact;
            public float Resistance;
            public float AngularVelocity;
        }

        public Wheel(RigidBody2D rigidBody, ConstraintWheel2D constraint, ParticleEmitter2D particleEmitter, float particlesDistance)
        {
            _rigidBody = rigidBody; _constraint = constraint; _particleEmitter = particleEmitter; _particlesDistance = particlesDistance;
        }

        // Applies force and returns the work (normalized) necessary to reach the target speed
        public DynamicsData ApplyNonLinearTorque(int power, int targetSpeed, bool onlyInContact = false)
        {
            bool inContact = EmitSurfaceParticles();
            float fraction = _rigidBody.AngularVelocity/targetSpeed;
            float mult = fraction > 0 ? 1-fraction : 1;
            if (!onlyInContact || inContact)
                _rigidBody.ApplyTorque(mult*power, true);
            return new DynamicsData
            {
                Resistance = fraction*mult, AngularVelocity = _rigidBody.AngularVelocity, IsInContact = inContact
            };
        }
        // Emit particles if close to a surface point and returns true if positive
        public bool EmitSurfaceParticles()
        {
            Vector3 nearestSurfPoint = AtomicMain.GetSurfacePointClosestToPoint(_rigidBody.Node);
            float contactDistance = Vector3.Distance(_rigidBody.Node.Position, nearestSurfPoint);
            if (contactDistance > _particlesDistance)
            {
                _particleEmitter.Effect.StartColor = new Color(0, 0, 0, 0);
                return false;
            }
            _particleEmitter.Effect.StartColor = Color.White;
            _particleEmitter.Node.Position = nearestSurfPoint;
            return true;
        }
        // Returns current suspension compression for the wheel
        public float CurrentSuspensionCompression()
        {
            Vector2 anchorPosition = new Vector2(_constraint.OwnerBody.Node.WorldPosition +
                                     _constraint.OwnerBody.Node.WorldRotation*new Vector3(_constraint.Anchor));
            return Vector2.Distance(_constraint.OtherBody.Node.Position2D, anchorPosition);
        }
    }
    
    public Vehicle CreateChassis(Vector2 colliderCenter, float colliderRadius, int massDensity, Vector3 exhaustPosition,
        ParticleEffect2D exhaustParticles, Sound engineSound, Sound tireSound, Sound[] suspensionSounds,
        int horsePower, int maxSpeedFwd, int maxSpeedBwd, int rollForce)
    {
        // We set out private fields
        _horsePower = horsePower;
        _maxSpdFwd = maxSpeedFwd;
        _maxSpdBwd = maxSpeedBwd;
        _rollForce = rollForce;
        _rigidBody = GetComponent<RigidBody2D>();

        // We add the collider (circle collider at the moment)
        var col = AtomicMain.AddCollider<CollisionCircle2D>(Node, dens:massDensity, fric:0);
        col.SetRadius(colliderRadius);
        col.SetCenter(colliderCenter);
        
        // We create the exhaust particle system
        var exhaustParticlesNode = Node.CreateChild();
        exhaustParticlesNode.SetPosition(exhaustPosition);
        _exhaustParticles = exhaustParticlesNode.CreateComponent<ParticleEmitter2D>();
        _exhaustParticles.SetEffect(exhaustParticles);
        
        // We setup the engine sound and other sound effect
        engineSound.SetLooped(true);
        _soundSource = Node.CreateComponent<SoundSource3D>();
        _soundSource.SetNearDistance(10);
        _soundSource.SetFarDistance(50);
        _accelSound = engineSound;
        _brakeSound = tireSound;
        _suspensionSoundSource = Node.CreateComponent<SoundSource3D>();
        _suspensionSounds = suspensionSounds;

        // We return the Vehicle for convenience, since this function is intended to be the vehicle's init function
        return this;
    }

    public Node CreateWheel(Sprite2D sprite, Vector2 relativePosition, float radius, int suspensionFrequency, float suspensionDamping,
        ParticleEffect2D particles, float distanceToEmitParticles)
    {
        Node wheelNode = AtomicMain.CreateSpriteNode(sprite);
        wheelNode.SetPosition2D(relativePosition);

        // CreateSpriteNode adds a RigidBody for us, so we get it here
        RigidBody2D wheelRigidBody = wheelNode.GetComponent<RigidBody2D>();
        // We activate CCD
        wheelRigidBody.SetBullet(true);

        AtomicMain.AddCollider<CollisionCircle2D>(wheelNode).SetRadius(radius);
        
        // The Box2D wheel joint provides spring for simulating suspension
        ConstraintWheel2D wheelJoint = Node.CreateComponent<ConstraintWheel2D>();
        wheelJoint.SetOtherBody(wheelRigidBody);
        wheelJoint.SetAnchor(relativePosition);
        wheelJoint.SetAxis(Vector2.UnitY);
        wheelJoint.SetFrequencyHz(suspensionFrequency);
        wheelJoint.SetDampingRatio(suspensionDamping);

        // Each wheel has a particle emitter to emit particles when it's in contact with the surface
        Node particlesNode = Node.Scene.CreateChild();
        particlesNode.SetPosition(new Vector3(relativePosition.X, relativePosition.Y, 14));
        ParticleEmitter2D particleEmitter = particlesNode.CreateComponent<ParticleEmitter2D>();
        particleEmitter.SetEffect(particles);

        // We create a new Wheel struct and add to the _wheels list
        _wheels.Add(new Wheel(wheelRigidBody, wheelJoint, particleEmitter, distanceToEmitParticles));

        return wheelNode;
    }

    public Node CreateHead(Sprite2D sprite, Vector3 relativePosition, float colliderRadius, Vector2 neckAnchor)
    {
        Node head = AtomicMain.CreateSpriteNode(sprite);
        head.SetPosition(relativePosition);
        AtomicMain.AddCollider<CollisionCircle2D>(head).SetRadius(colliderRadius);

        // This is the actual neck joint
        ConstraintRevolute2D joint = head.CreateComponent<ConstraintRevolute2D>();
        joint.SetOtherBody(_rigidBody);
        joint.SetAnchor(neckAnchor);
        
        // This is the spring, it's attached to the body with an offset
        ConstraintDistance2D spring = head.CreateComponent<ConstraintDistance2D>();
        spring.SetOtherBody(_rigidBody);
        spring.SetOwnerBodyAnchor(-Vector2.UnitY*2);
        spring.SetOtherBodyAnchor(Node.WorldToLocal2D(head.WorldPosition2D-Vector2.UnitY*2));
        spring.SetFrequencyHz(3);
        spring.SetDampingRatio(0.4f);

        return head;
    }

    // Update is called once per frame
    private void Update(float dt)
    {
        // Wheel controls
        bool isBraking = _input.GetKeyDown((int) SDL.SDL_Keycode.SDLK_DOWN);
        bool isAccelerating = _input.GetKeyDown((int) SDL.SDL_Keycode.SDLK_UP);
        
        foreach (Wheel wheel in _wheels)
        {
            // We give priority to braking
            if (isBraking)
            {
                // This function also emit particles
                Wheel.DynamicsData wheelDynamics = wheel.ApplyNonLinearTorque(_horsePower, _maxSpdBwd, true);
                if (wheelDynamics.IsInContact)
                {
                    // If the wheel is in contact, we play the braking sound according to the current work in the wheel
                    if (_soundSource.Sound != _brakeSound || !_soundSource.IsPlaying())
                        _soundSource.Play(_brakeSound);
                    _soundSource.SetFrequency(48000);
                    _soundSource.Gain = wheelDynamics.Resistance*-1;
                    if (_soundSource.Gain > 1) _soundSource.Gain = 1;
                }
                else
                {
                    _soundSource.Stop();
                }
            }
            else if (isAccelerating)
            {
                Wheel.DynamicsData wheelDynamics = wheel.ApplyNonLinearTorque(-_horsePower, -_maxSpdFwd);
                // We set the sound frequency according to the speed and gain according to the work being done
                _soundSource.SetFrequency((wheelDynamics.AngularVelocity/-40+1)*48000);
                _soundSource.Gain += 0.03f;
                if (_soundSource.Gain > 1) _soundSource.Gain = 1;
                _soundSource.Gain += Math.Abs(1-wheelDynamics.Resistance*5);
                if (_soundSource.Sound != _accelSound || !_soundSource.IsPlaying())
                    _soundSource.Play(_accelSound);
            }
            else
            {
                // If it's not receiving any input, fades out engine sound or stop other sounds
                if (_soundSource.Sound == _accelSound)
                {
                    _soundSource.SetFrequency(48000);
                    _soundSource.Gain -= 0.01f;
                    if (_soundSource.Gain < 0.3f) _soundSource.Gain = 0.3f;
                }
                else
                    _soundSource.Stop();

                // We emit surface particles anyway
                wheel.EmitSurfaceParticles();
            }
        }

        // Roll controls
        if (_input.GetKeyDown((int) SDL.SDL_Keycode.SDLK_LEFT))
            _rigidBody.ApplyTorque(_rollForce,true);
        if (_input.GetKeyDown((int) SDL.SDL_Keycode.SDLK_RIGHT))
            _rigidBody.ApplyTorque(_rollForce*-1,true);
        // Debug control for when you rolled over
        if (_input.GetKeyDown((int) SDL.SDL_Keycode.SDLK_SPACE))
            _rigidBody.SetAngularVelocity(2);

        // We apply bit of the vehicle's velocity to the exhaust particles so they look OK
        Vector2 currentVelocity = _rigidBody.GetLinearVelocity();
        _exhaustParticles.Effect.Speed = Math.Abs(100 + currentVelocity.LengthFast * 20);
        _exhaustParticles.Effect.SpeedVariance = currentVelocity.LengthFast * 10;
        _exhaustParticles.Effect.Angle = -Node.Rotation2D + 
            (float)(Math.Atan2(currentVelocity.X - 5, -currentVelocity.Y) * (360 / (Math.PI * 2))) - 90;

        // Suspension sounds
        foreach (Wheel wheel in _wheels)
        {
            if (wheel.CurrentSuspensionCompression() > 0.7f)
            {
                if (DateTime.Now - lastSuspensionSound > TimeSpan.FromMilliseconds(500))
                {
                    lastSuspensionSound=DateTime.Now;
                    _suspensionSoundSource.Play(_suspensionSounds[new Random().Next(_suspensionSounds.Length)]);
                }
            }
        }
    }
}