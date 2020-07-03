const fs = require('fs');
const util = require('util');

// wrapping fs.readFile & fs.writeFile inside promises
const wrappedReadFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        })
    })
};

const wrappedWriteFile = (filePath, data, option) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, option, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        })
    })
};

// calling the wrapped functions
wrappedWriteFile('test.txt', 'Hello from wrapped\n', {encoding: 'utf8', flag: 'a'})
    .then( () => {
        console.log('finished writing to file');
        return wrappedReadFile('test.txt');
    })
    .then(content => console.log('file contains:\n', content.toString()))
    .catch(err => console.error(err));


// doing the same using node's util.promisify()
const promisifiedReadFile = util.promisify(fs.readFile);
const promisifiedWriteFile = util.promisify(fs.writeFile);

// calling the promisified functions
promisifiedWriteFile('test.txt', 'Hello from promisfied\n',  {encoding: 'utf8', flag: 'a'})
    .then( () => {
        console.log('finished writing to file');
        return promisifiedReadFile('test.txt');
    })
    .then(content => console.log('file contains:\n', content.toString()))
    .catch(err => console.error(err));

