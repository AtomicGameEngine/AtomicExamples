//
// Copyright (c) 2008-2015 the Urho3D project.
// Copyright (c) 2015 Xamarin Inc
// Copyright (c) 2016 THUNDERBEAST GAMES LLC
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

using AtomicEngine;

namespace FeatureExamples
{ 
	public class MultipleViewportsSample : Sample
	{
		Scene scene;
		bool drawDebug;
		Node rearCameraNode;

		public MultipleViewportsSample() : base() { }

        public override void Start()
        {
			base.Start();
			CreateScene();
			SimpleCreateInstructionsWithWasd(
				"\nB to toggle bloom, F to toggle FXAA\n" +
				"Space to toggle debug geometry\n");
			SetupViewport();
			SubscribeToEvents();
		}

		void SubscribeToEvents()
		{
			SubscribeToEvent<PostRenderUpdateEvent>(e =>
				{
					// If draw debug mode is enabled, draw viewport debug geometry, which will show eg. drawable bounding boxes and skeleton
					// bones. Note that debug geometry has to be separately requested each frame. Disable depth test so that we can see the
					// bones properly
					if (drawDebug)
						GetSubsystem<Renderer>().DrawDebugGeometry(false);
				});
		}

        protected override void Update(float timeStep)
        {
			base.Update(timeStep);
			SimpleMoveCamera3D(timeStep);

            var input = GetSubsystem<Input>();
			var effectRenderPath = GetSubsystem<Renderer>().GetViewport(0).GetRenderPath();

			if (input.GetKeyPress(Constants.KEY_B))
				effectRenderPath.ToggleEnabled("Bloom");
			if (input.GetKeyPress(Constants.KEY_F))
				effectRenderPath.ToggleEnabled("FXAA2");

			if (input.GetKeyPress(Constants.KEY_SPACE))
				drawDebug = !drawDebug;
		}

		void SetupViewport()
		{
			var renderer = GetSubsystem<Renderer>();
			var graphics = GetSubsystem<Graphics>();

			renderer.NumViewports = 2;

			// Set up the front camera viewport
			Viewport viewport = new Viewport(scene, CameraNode.GetComponent<Camera>());
			renderer.SetViewport(0, viewport);

			// Clone the default render path so that we do not interfere with the other viewport, then add
			// bloom and FXAA post process effects to the front viewport. Render path commands can be tagged
			// for example with the effect name to allow easy toggling on and off. We start with the effects
			// disabled.
			var cache = GetSubsystem<ResourceCache>();
			RenderPath effectRenderPath = viewport.GetRenderPath().Clone();
			effectRenderPath.Append(cache.Get<XMLFile>("PostProcess/Bloom.xml"));
			effectRenderPath.Append(cache.Get<XMLFile>("PostProcess/FXAA2.xml"));
			// Make the bloom mixing parameter more pronounced
			effectRenderPath.SetShaderParameter("BloomMix", new Vector2(0.9f, 0.6f));

			effectRenderPath.SetEnabled("Bloom", false);
			effectRenderPath.SetEnabled("FXAA2", false);
			viewport.SetRenderPath(effectRenderPath);

			// Set up the rear camera viewport on top of the front view ("rear view mirror")
			// The viewport index must be greater in that case, otherwise the view would be left behind
			IntRect rect = new IntRect(graphics.Width*2/3, 32, graphics.Width - 32, graphics.Height/3);
			Viewport rearViewport = new Viewport(scene, rearCameraNode.GetComponent<Camera>(), rect);

			renderer.SetViewport(1, rearViewport);
		}

		void CreateScene()
		{
			var cache = GetSubsystem<ResourceCache>();
			scene = new Scene();

			// Create octree, use default volume (-1000, -1000, -1000) to (1000, 1000, 1000)
			// Also create a DebugRenderer component so that we can draw debug geometry
			scene.CreateComponent<Octree>();
			scene.CreateComponent<DebugRenderer>();

			// Create scene node & StaticModel component for showing a static plane
			var planeNode = scene.CreateChild("Plane");
			planeNode.Scale =new Vector3(100.0f, 1.0f, 100.0f);
			var planeObject = planeNode.CreateComponent<StaticModel>();
			planeObject.Model=cache.Get<Model>("Models/Plane.mdl");
			planeObject.SetMaterial(cache.Get<Material>("Materials/StoneTiled.xml"));

			// Create a Zone component for ambient lighting & fog control
			var zoneNode = scene.CreateChild("Zone");
			var zone = zoneNode.CreateComponent<Zone>();
			zone.SetBoundingBox(new BoundingBox(-1000.0f, 1000.0f));
			zone.AmbientColor=new Color(0.15f, 0.15f, 0.15f);
			zone.FogColor=new Color(0.5f, 0.5f, 0.7f);
			zone.FogStart=100.0f;
			zone.FogEnd=300.0f;

			// Create a directional light to the world. Enable cascaded shadows on it
			var lightNode = scene.CreateChild("DirectionalLight");
			lightNode.SetDirection(new Vector3(0.6f, -1.0f, 0.8f));
			var light = lightNode.CreateComponent<Light>();
			light.LightType = LightType.LIGHT_DIRECTIONAL;
			light.CastShadows=true;
			light.ShadowBias=new BiasParameters(0.00025f, 0.5f);
			// Set cascade splits at 10, 50 and 200 world units, fade shadows out at 80% of maximum shadow distance
			light.ShadowCascade=new CascadeParameters(10.0f, 50.0f, 200.0f, 0.0f, 0.8f);

			// Create some mushrooms
			const uint numMushrooms = 240;
			for (uint i = 0; i < numMushrooms; ++i)
			{
				var mushroomNode = scene.CreateChild("Mushroom");
				mushroomNode.Position = new Vector3(NextRandom(90.0f) - 45.0f, 0.0f, NextRandom(90.0f) - 45.0f);
				mushroomNode.Rotation = new Quaternion(0.0f, NextRandom(360.0f), 0.0f);
				mushroomNode.SetScale(0.5f + NextRandom(2.0f));
				StaticModel mushroomObject = mushroomNode.CreateComponent<StaticModel>();
				mushroomObject.Model=cache.Get<Model>("Models/Mushroom.mdl");
				mushroomObject.SetMaterial(cache.Get<Material>("Materials/Mushroom.xml"));
				mushroomObject.CastShadows=true;
			}

			// Create randomly sized boxes. If boxes are big enough, make them occluders
			const uint numBoxes = 20;
			for (uint i = 0; i < numBoxes; ++i)
			{
				var boxNode = scene.CreateChild("Box");
				float size = 1.0f + NextRandom(10.0f);
				boxNode.Position=new Vector3(NextRandom(80.0f) - 40.0f, size * 0.5f, NextRandom(80.0f) - 40.0f);
				boxNode.SetScale(size);
				StaticModel boxObject = boxNode.CreateComponent<StaticModel>();
				boxObject.Model = cache.Get<Model>("Models/Box.mdl");
				boxObject.SetMaterial(cache.Get<Material>("Materials/Stone.xml"));
				boxObject.CastShadows=true;
				if (size >= 3.0f)
					boxObject.Occluder=true;
			}

			// Create the cameras. Limit far clip distance to match the fog
			CameraNode = scene.CreateChild("Camera");
			Camera camera = CameraNode.CreateComponent<Camera>();
			camera.FarClip = 300.0f;

			// Parent the rear camera node to the front camera node and turn it 180 degrees to face backward
			// Here, we use the angle-axis constructor for Quaternion instead of the usual Euler angles
			rearCameraNode = CameraNode.CreateChild("RearCamera");
			rearCameraNode.Rotate(Quaternion.FromAxisAngle(Vector3.UnitY, 180.0f), TransformSpace.TS_LOCAL);

			Camera rearCamera = rearCameraNode.CreateComponent<Camera>();
			rearCamera.FarClip = 300.0f;

			// Because the rear viewport is rather small, disable occlusion culling from it. Use the camera's
			// "view override flags" for this. We could also disable eg. shadows or force low material quality
			// if we wanted
			rearCamera.ViewOverrideFlags = Constants.VO_DISABLE_OCCLUSION;

			// Set an initial position for the front camera scene node above the plane
			CameraNode.Position = new Vector3(0.0f, 5.0f, 0.0f);
		}

	}
}
