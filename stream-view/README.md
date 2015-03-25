# stream-view

This is a "Hello World" application, using a view that inherits from a Readable stream. 

To invoke, the following command begins listening on localhost:3000.

    node --harmony app.js

To see results:

    http://localhost:3000

## Interesting points

1. The main function app.js instantiates a "View" from the view.js file.
2. The View overrides the Readable's _read() function with an empty function.
3. The View also overrides the Readable's render() function to do the following:

    a. Immediately push out the <head> of the page
    b. Assigns to `body` variable a promise that will soon (in the next tick) return the Hello World text.
    c. Yields to that promise, which returns the desired text
    d. After the promise returns, it pushes out the <body> tags with the returned text
    e. It pushes out the closing </html> tag and
    f. Closes the connection with push(null)
