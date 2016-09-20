using Foundation;
using UIKit;
using System.Threading.Tasks;

using AtomicEngine;
using AtomicBlaster;

namespace AtomicPlayer
{
	[Register("AppUIDelegate")]
	public partial class AppUIDelegate : UIApplicationDelegate
	{
		public override bool FinishedLaunching(UIApplication app, NSDictionary options)
		{
			LaunchGame();
			return true;
		}

		async void LaunchGame()
		{
			await Task.Yield();
			Application.Run<GameRoot>(new string[0]);
		}
	}
}
