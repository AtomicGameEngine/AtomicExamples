/**
* Used to send a notification message to the host
* @param {string} messageType
* @param {object} data
* @return {Promise} will resolve when the host has handled the message
*/
function atomicHostEvent(messageType, data) {
    let queryMessage;

    // if we have a data element, then we need to structure the message so that the host understands it
    // by adding the message to the object and then stringify-ing the whole thing
    if (data) {
        // stringify and reparse since we need to modify the data, but don't want to modify the passed in object
        queryMessage = JSON.parse(JSON.stringify(data));
        queryMessage.message = messageType;
    } else {
        queryMessage = {
            message
        };
    }

    return new Promise((resolve, reject) => {
        window.atomicQuery({
            request: JSON.stringify(queryMessage),
            persistent: true,
            onSuccess: (result) => resolve(),
            onFailure: (error_code, error_message) => {
                console.log(error_code);
                console.log(error_message);
                reject({ error_code, error_message });
            }
        });
    });
}

/**
 * Used to send a request to the server.  The server will send back the results in the promise
 * @param  {string} messageType
 * @param  {object} data
 * @return {Promise}
 */
function atomicHostRequest(messageType, data) {
    let queryMessage;

    // if we have a data element, then we need to structure the message so that the host understands it
    // by adding the message to the object and then stringify-ing the whole thing
    if (data) {
        // stringify and reparse since we need to modify the data, but don't want to modify the passed in object
        queryMessage = JSON.parse(JSON.stringify(data));
        queryMessage.message = messageType;
    } else {
        queryMessage = {
            message
        };
    }

    return new Promise((resolve, reject) => {
        window.atomicQuery({
            request: JSON.stringify(queryMessage),
            persistent: false,
            onSuccess: (s) => {
                // unwrap the message that was returned
                let o = JSON.parse(s);
                resolve(o);
            },
            onFailure: (error_code, error_message) => reject({ error_code, error_message })
        });
    });
}