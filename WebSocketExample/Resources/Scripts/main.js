

// get the network subsystem
var network = Atomic.getNetwork();

// make the ws:// request
var ws = network.makeWebSocket("ws://echo.websocket.org");

var nextSendTime = Date.now();

// listen in to engine update
network.subscribeToEvent("Update", function () {

	while (ws.getNumberOfMessages() != 0) {

		print(ws.getNextMessage());

	}

	if (ws.state == Atomic.WS_CLOSED || ws.state == Atomic.WS_FAIL_TO_CONNECT) {

		ws.openAgain();

	}

	if (ws.state == Atomic.WS_OPEN) {

		var now = Date.now();

		if (now >= nextSendTime) {

			nextSendTime = new Date(now);
			nextSendTime.setSeconds(nextSendTime.getSeconds() + 5);

			ws.send(JSON.stringify({
				"test_key": "test_value",
				"life_the_universe_and_everything": 42
			}, undefined, 2));

		}

	}

});

