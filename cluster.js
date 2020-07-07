const http = require('http');
const os = require('os');
const cluster = require('cluster');

/**
 * demo of cluster of simple http servers.
 * 
 * - the number of processes is determined based on the number of the CPUs.
 * - if a worker process dies, the master process will spawn a new one.
 * - url path '/kill' is used to make it easy to simulate process dies.
 */


// this line is used to enforce 'Round-robin' scheduling policy on windows to demo all the workers. otherwise the OS uses its default scheduling policy
cluster.schedulingPolicy = cluster.SCHED_RR;

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
    console.log(`master process id: ${process.pid}`);
    console.log(`CPUs: ${numCPUs}`);

    // create worker processes
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // if a process dies, create a new one
    cluster.on('exit', worker => {
        console.log(`worker process ${worker.process.pid} is dead`);
        console.log(`starting a new process...`);
        cluster.fork();
    })

} else {
    console.log(`started process worker: ${process.pid}`);
    http.createServer((req, res) => {

        const msg = `Hello from process ${process.pid}!`;
        console.log(msg);
        res.end(msg);

        // to be able to kill processes randomly without the task manager
        if (req.url === '/kill') {
            process.exit();
        }

    }).listen(3000);
}