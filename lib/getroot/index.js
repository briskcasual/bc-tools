let fs = require('fs'),
path = require('path'),
promisify = require('util').promisify,
readFile = promisify(fs.readFile),
readdir = promisify(fs.readdir),
log = require('../log/index.js');

let checkdir = (dir) =>{
    return readdir(dir)
    .then((items)=>{
        let files = items.filter((item)=>{
            return item.toLowerCase() === 'config.json';
        });
        log(dir + ' : ' + files.length);
        return files;
    });
};

let getRoot = (dir) => {

    return new Promise((resolve, reject)=>{
        checkdir(dir)
        .then((files)=>{
            if(files.length >= 1){
                resolve(dir);
            }
            if(dir === '/'){
                reject(new Error('not a project folder'));
            }else{
                return getRoot(path.resolve(dir, '..'));
            }
        });
    })
    .catch((e)=>{
        log(e, 'error');
        return false;
    })
};

//let dir_start = process.cwd();
exports.getRoot = getRoot;