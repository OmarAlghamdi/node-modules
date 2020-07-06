const cp = require('child_process');

/**
 * demo of inter-process communication using messages between parent and child process.
 * 
 * this is the parent process. the child process is 'child.js'
 */

console.log(`parent process started. pid: ${process.pid}`);

const child = cp.fork('./child');

// listening for child process exit
child.on('exit', (code, signal) => {
    if (signal) {
        console.log(`child process was terminated with signal: ${signal}`);
    } else {
        console.log(`child process exited with code: ${code}`);
    }
});

// listening for messages from child process
child.on('message', (message, sendHandle) => {
    console.log(`received message from child process: ${child.pid}`);
    console.log('message: ', message);
});

// sending message to child process
child.send({msg: `hello from parent ${process.pid}`});


