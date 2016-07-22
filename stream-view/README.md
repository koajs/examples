# stream-view

This is a "Hello World" application, using a view that inherits from a Readable stream.

To invoke, the following command begins listening on localhost:3000.

    node app.js

To see results:

    http://localhost:3000

## Interesting points

1. The main function of app.js instantiates a "View" from the view.js file.
2. The View overrides the Readable's _read() function with an empty function.
3. The View also overrides the Readable's render() function to do the following:
  1. Immediately push out the text for the \<head> of the page
  2. Yield to a function that will ultimately (in the next tick) return the "Hello World" text. The render() function pauses at that point.
  3. When that function returns, render() resumes, and assigns the return value to the `body` variable
  4. Push out the returned text wrapped in \<body> tags
  5. Push out the closing \</html> tag and
  6. Close the connection with push(null)
