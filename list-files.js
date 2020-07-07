const cp = require('child_process');
const osType = require('os').type();

/**
 * demo of using child_process.exec() to print files in the current directory
 * 
 * - on unix based systems 'ls' command is used
 * - on window systems 'dir' command is used
 */

const command = osType === 'Windows_NT'? 'dir' : 'ls';

console.log(`this is the parent process, pid: ${process.pid}`);

// using exec() to get the list of files
console.log(`invoking ${command} using exec()...`);
cp.exec(command, (err, stdout, stderr) => {
    if (err) {
        console.error(err);
    } else {
        // print command output
        console.log(stdout);
    }
});

