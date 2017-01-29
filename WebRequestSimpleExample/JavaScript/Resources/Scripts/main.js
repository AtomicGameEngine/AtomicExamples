
// Non-blocking http request runs asynchronously.
var request = new Atomic.WebRequest("GET", "https://httpbin.org/get", 0);

// Listen for the "complete" event to see when the response is complete.
request.subscribeToEvent(Atomic.WebRequestCompleteEvent(function (event) {

    if (event.error) {
        // When something goes wrong, print the error, then return.
        console.log("Error:\n" + event.error);
        return;
    }

    // We're done, so print the data.
    console.log("Downloaded:\n" + event.download.readString());

}));

// Nothing happens until send() is called.
console.log("Sending . . .\n");
request.send();
