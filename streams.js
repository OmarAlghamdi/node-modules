const fs = require('fs');

/**
 * Demo of using streams to process large files.
 * 
 * The data I used is ~1 GB dataset. It will not fit in memory without changing the default heap size of node.
 * Even if the machine running node has enough memory, it is not recommended to increase heap size just to process file in memory.
 * 
 * If you want to run the code yourself replace the file name
 */


// creating streams 
readStream = fs.createReadStream('10-million.csv', {encoding: 'utf8'});
writeStream = fs.createWriteStream('10-million-processed-stream.csv');

// measuring processing time
console.time('stream-processing');

// processing the data
readStream.on('data', (chunk) => {
    writeStream.write(chunk.replace(/,/g, ';'));
})
readStream.on('end', () => {
    writeStream.end();
    console.timeEnd('stream-processing');
})