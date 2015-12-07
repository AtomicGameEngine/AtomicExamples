
// Get the web subsystem.
var web = Atomic.getWeb();

// Non-blocking http request runs asynchronously.
var request = web.makeWebRequest("GET", "https://httpbin.org/get");

// Add some request headers.
request.setRequestHeader("Some-Special-Header", "Special header value");
request.setRequestHeader("A-Magic-Header", "Magic header value");

// Listen for the "complete" event to see when the response is complete.
request.subscribeToEvent("complete", function (event) {

    if (event.error) {
        // When something goes wrong, print the error, then return.
        console.log("Error:\n" + event.error);
        return;
    }

    // We're done, so print the response headers, then the content.

    // The getAllResponseHeaders() function gives a single string will all response headers.
    console.log("Headers:\n" + request.getAllResponseHeaders());

    // The "httpbin.org/get" call will show request headers in the response content.
    console.log("Content:\n" + event.download.readString());

});

// Nothing happens until send() is called.
console.log("Sending . . .\n");
request.send();

