// This is necessary if you want to take advantage of setTimeout/clearTimeout, setInterval/clearInterval, setImmediate/clearImmediate
require('AtomicEventLoop');

var num_times_to_connect = 5;

// Get the web subsystem
var web = Atomic.getWeb();

// Make the ws:// request
var ws = web.makeWebSocket("ws://echo.websocket.org");

// Listen for when the websocket is open
ws.subscribeToEvent("open", function() {

    console.log("WebSocket Opened");
    ws.send(JSON.stringify({
    	"test_key": "test_value",
    	"life_the_universe_and_everything": 42
    }, undefined, 2));

});

// Listen for messages
ws.subscribeToEvent("message", function (event) {

    console.log("WebSocket Message: " + event.data);

    // We would normally keep the WebSocket open for a long time, but
    // here we are demonstrating how to use ws.openAgain() below, so
    // we'll close the WebSocket after 5 seconds of getting the message.
    setTimeout(function() {
        ws.close();
    }, 2000);

});

// Listen for when the websocket is closed
ws.subscribeToEvent("close", function() {

    console.log("WebSocket Closed");

    if (num_times_to_connect) {
        num_times_to_connect--;

        // Open the websocket again after 5 more seconds.
        setTimeout(function() {
            ws.openAgain();
        }, 2000);
    } else {
        console.log("Done!");
    }

});
