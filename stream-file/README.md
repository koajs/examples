# stream-file

Stream a file from the local directory. To invoke, the following command begins listening on localhost:3000. 

    node --harmony app.js

To see results:

    http://localhost:3000/README.md  or
    http://localhost:3000/other-file-in-the-directory

## Interesting points

1. In app.js, the function stat() returns a thunk. When app.use() yields to fstat(), the app.use() function pauses while node (asynchronously) performs the stat() call and gets the result. When that result is available, app.use() resumes immediately  
2. This example also uses the createReadStream() function to create a stream that reads data (asynchronously) from the file. 
3. this.body gets that stream's data, and sends it to the web browser client that has connected in to the URL above.  
