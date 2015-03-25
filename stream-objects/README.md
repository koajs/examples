# stream-objects

Stream a out Javascript objects. To invoke, the following command begins listening on localhost:3000.

    node --harmony app.js

To see results:

    http://localhost:3000

## Interesting points

1. In app.js, the setImmediate() function writes out a JS object ({ id: 1}) to the stream, then declares another setImmediate function.
2. That setImmediate() function writes a second JS object ({ id: 2}) to the stream, then declares a third setImmediate()
3. The final setImmediate() calls stream.end() to indicate that there is no more data.
4. The resulting web page shows an array of both the JS objects, like this:

    [
{"id":1}
,
{"id":2}
]
