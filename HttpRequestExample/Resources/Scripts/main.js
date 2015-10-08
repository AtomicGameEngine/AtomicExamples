

// get the network subsystem
var network = Atomic.getNetwork();

// non blocking http request runs on it's own thread
var request = network.makeHttpRequest("http://cdnjs.cloudflare.com/ajax/libs/Base64/0.3.0/base64.js", "GET", [
    "Custom-Header: some value"
]);

var output = "";

// listen in to engine update
network.subscribeToEvent("Update", function () {

	print(request.getAvailableSize());

	if (request.getAvailableSize() != 0) {
		output += request.read();
	}

	if (request.state == Atomic.HTTP_CLOSED) {

		print(output);

		Atomic.getEngine().exit();

	}

});
