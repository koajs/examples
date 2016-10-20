# stream-file

Stream a file from the local directory. To invoke, the following command begins listening on localhost:3000. 

    node --harmony app.js

To see results:

    http://localhost:3000/README.md  or
    http://localhost:3000/other-file-in-the-directory

## Interesting points

1. The stat() function at the bottom of app.js returns another function that will call the normal fs.stat() to get information about the named file. (The function stat() is a promise - it will ultimately return a value, although it may take a while.)
2. When any program *yields* to a function, it pauses while that function proceeds asynchronously, and eventually returns a value. When the function returns, the program resumes at that point. 
3. In the example, app.use() starts everything off with `fstat = yield stat(fpath)`. We say it "yields to the stat() function." That is, app.use() pauses while the stat() function begins to execute (asynchronously), and the node interpreter goes off to work on other tasks. When the fs.stat() call completes and returns a value, app.use() resumes, and sets the value of `fstat` to the value returned by stat().  
4. This example also uses the createReadStream() function to create a stream which is another way to handle data (asynchronously) from a file. 
5. `this.body` gets the result of the fs.createReadStream() (which is the stream's data) and sends it to the web browser client that has connected in to the URL above.  
