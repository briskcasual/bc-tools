let fs = require('fs'),
path = require('path'),
promisify = require('util').promisify,
readFile = promisify(fs.readFile),
writeFile = promisify(fs.writeFile),
readdir = promisify(fs.readdir),
log = require('../log/index.js');


let copyDir = function(source, target){

    source = path.resolve(source);
    target = path.resolve(target);

    let itemIndex = 0; // index of item in root of source folder

    readdir(source)
    .then((files)=>{
        log(files);
    })
    .catch((e)=>{
        log(e.message, 'error');
    });

};

exports.copyDir = copyDir;