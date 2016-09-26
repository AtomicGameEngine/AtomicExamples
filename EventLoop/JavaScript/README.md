## Example of using an Event Loop ##

Including an EventLoop allows you to schedule actions to occur in the future, or 
actions to occur every # of milliseconds.  

in order to use, you need to require the ```AtomicEventLoop``` module in your ```main.js```

```
require("AtomicEventLoop");
```

This mirrors the eventloop available in
the web browser and provides the following global functions.

### setTimeout ###
```timer_id = setTimeout(func, delay, [params...])```
This will allow you to schedule a function to execute ```delay``` number of milliseconds
in the future.

By providing the optional ```params```, you can specify what parameters to pass to the function
when it is called.

timer_id will be passed back to allow you to cancel the timer before it executes.

### clearTimeout ###
```
clearTimeout(timer_id)
```

Cancels a previously scheduled timeout.

### setInterval ###
```
timer_id = setInterval(func, delay, [params...])
```
This will allow you to schedule a function to execute every ```delay``` number of milliseconds
in the future.

By providing the optional ```params```, you can specify what parameters to pass to the function
when it is called.

timer_id will be passed back to allow you to cancel the timer before it executes.

### clearInterval ###
```
clearInterval(timer_id)
```
Cancels a previously scheduled interval.

### setImmediate ###
```
timer_id = setImmediate(func,[params...])
```
This will allow you to schedule a function to execute immediately after the current
update loop.

By providing the optional ```params```, you can specify what parameters to pass to the function
when it is called.

timer_id will be passed back to allow you to cancel the function before it executes.

### clearImmediate ###
```
clearImmediate(timer_id)
```
Cancels a previously scheduled setImmediate.
