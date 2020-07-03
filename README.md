# node-modules
Sample codes on using Node.js core modules

## Modules
 
### os
`sysInfo.js` is a sample code using os modules to get information about he computer running node. 

Run `node sysInfo` to see computer details on the console. 
![example](https://github.com/OmarAlghamdi/node-modules/blob/master/img/sysInfo-sample.png)

### Exercise
I did the exercise given during the July/2nd meeting (wrapping fs functions in promises)

I wrapped  both `fs.readFile()` and `fs.writeFile()` once using `util.promisify()` and another time manually.

The code is in `fs-promisify.js`. Run `node fs-promisify` to see the output on the console.