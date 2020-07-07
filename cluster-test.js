const cp = require('child_process');

/**
 * demo of using child_process.spawn() to launch a cluster and test is.
 * - cluster is 'cluster.js', a simple http server.
 * - testing using 'loadtest' with 500 requests.
 */

const cluster = cp.spawn('node', ['cluster']);

// listening for cluster exit
cluster.on('exit', (code, signal) => {
    if (signal === 'SIGTERM') {
        console.log('cluster was terminated successfully');
    }
});


const loadtest = cp.spawn('loadtest', ['-n', '500', 'http://localhost:3000'], {shell: true});

// listening for loadtest's stdout stream to print test result to the console
loadtest.stdout.on('data', (data) => {
    console.log(data.toString());
});

// listen when loadtest is done to terminate the cluster
loadtest.on('exit', () => {
    console.log('test is over. terminating the cluster...');
    cluster.kill('SIGTERM');
});