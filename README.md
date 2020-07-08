# node-modules
Sample codes on using Node.js core modules

## Modules
 
### os
`sysInfo.js` is a sample code using os modules to get information about he computer running node. 

Run `node sysInfo` to see computer details on the console. 
![example](https://github.com/OmarAlghamdi/node-modules/blob/master/img/sysInfo-sample.png)

### child_process - Inter-Process Communication
The files `ipc.js` and `child.js` are sample code on using `child_process` module to achieve Inter-Process Communication between a parent-child node processes.

Both the parent process `ipc` and the child process `child` send message to the other process. Also the parent process listen for exit event on the child process to exit as soon as its child finishes.

### child_process - exec()
`list-files.js` is a sample code that uses `child_process.exec()` to invoke either `ls` on unix-based systems or `dir` on windows to list the files in the working directory and print the output to the console. 

### cluster
`cluster.js` is a sample code that uses `cluster` and `os` modules to launch a simple cluster of http servers on port `3000`. Then number of the processes depends on the number of the CPUs in the system.

The cluster also make create a new process in case one dies. To try that yourself send a request to `localhost:3000/kill`.

### child_process - spawn()
`cluster-test.js` is a sample code that uses `child_process.spawn()` to launch the simple cluster (explained above) and [loadtest](https://www.npmjs.com/package/loadtest) to test the cluster with 500 requests.

NOTE: running this script requires `loadtest` to be installed globally. run `npm install -g loadtest` if you do not already have it.

### Streams
`streams.js` is sample code that uses `stream.readable` & `stream.writeable` to process large dataset about 1 GB in size (not included in the repo). the process is simple (just replacing comas with semicolons). ****

## Exercise
### promisify
I did the exercise given during the July/2nd meeting (wrapping fs functions in promises)

I wrapped  both `fs.readFile()` and `fs.writeFile()` once using `util.promisify()` and another time manually.

The code is in `fs-promisify.js`. Run `node fs-promisify` to see the output on the console.