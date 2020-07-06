
console.log(`child process started. pid: ${process.pid}`);

// listening for messages from parent process

process.on('message', (message, sendHandle) => {
    console.log(`received message from parent process`);
    console.log('message: ', message);
    process.exit(0);
})

// sending message to parent process

process.send({msg: `hello from child ${process.pid}`});

