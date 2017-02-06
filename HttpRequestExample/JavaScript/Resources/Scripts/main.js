

// get the network subsystem
var network = Atomic.getNetwork();

// non blocking http request runs on it's own thread
var request = network.makeHttpRequest("http://www.google.com");

// listen in to engine update
network.subscribeToEvent(Atomic.UpdateEvent( function () {

	if (request.state == Atomic.HttpRequestState.HTTP_CLOSED) {

		 print(request.read());

		 Atomic.getEngine().exit();

		}

}));