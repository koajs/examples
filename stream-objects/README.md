# stream-objects

Stream a out Javascript objects. To invoke, the following command begins listening on localhost:3000.

    node --harmony app.js

To see results:

    http://localhost:3000

## Interesting points

1. In app.js, the setImmediate() function writes out a JS object { id: 1 } to the stream, then declares another setImmediate function.
2. The second setImmediate() function writes a second JS object { id: 2 } to the stream, then declares a third setImmediate() function.
3. The final setImmediate() calls stream.end() to indicate that there is no more data.
4. Note that the setImmediate() calls do **not** happen at the same moment. The first setImmediate() call is executed sometime after the initial request arrived. That setImmediate() call then declares the second setImmediate() call, which happens at least one tick later, and the third setImmediate() call happens in a separate tick.
4. The resulting web page shows an array containing both the JS objects, in the order they were initiated, like this:

    [
{"id":1}
,
{"id":2}
]
