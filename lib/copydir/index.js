let fs = require('fs'),
path = require('path'),
promisify = require('util').promisify,
readFile = promisify(fs.readFile),
writeFile = promisify(fs.writeFile),
stat = promisify(fs.stat),
readdir = promisify(fs.readdir),

copy = require('../copy/index.js').copy,
mkdirp = require('../mkdirp/index.js'),
log = require('../log/index.js')({modName: 'copydir'});


let copyDir = function(source, target){

    source = path.resolve(source);
    target = path.resolve(target);

    return mkdirp(target) // make sure target folder is there
    .then(() => { // read dir
        return readdir(source);
    })
    .then((items) => { // get dir stats
        return Promise.all(items.map((itemName) => {
            let itemPath = path.join(source, itemName);
            return stat(itemPath)
            .then((stats) => {
                return {
                    itemPath: itemPath,
                    itemName: itemName,
                    stats: stats
                }
            });
            
        }));
    })
    .then((itemObjs) => { // copy files
        let files = itemObjs.filter((itemObj) => {
            return itemObj.stats.isFile();
        });
        return Promise.all(files.map((itemObj) => {
            return copy(itemObj.itemPath, path.join(target, itemObj.itemName));
        }))
        .then(() => {
            return itemObjs;
        });
     })
    .then((itemObjs) => { // copy folders
        let folders = itemObjs.filter((itemObj) => {
            return itemObj.stats.isDirectory();
        });
        return Promise.all(folders.map((itemObj) => {
            return copyDir(itemObj.itemPath, path.join(target, itemObj.itemName));
        }));
    })
    .catch((e) => {
        log(e.message, 'error');
        return e;
    });

};

exports.copyDir = copyDir;