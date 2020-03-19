let fs = require('fs'),
path = require('path'),
promisify = require('util').promisify,
readFile = promisify(fs.readFile),
writeFile = promisify(fs.writeFile),
stat = promisify(fs.stat),
readdir = promisify(fs.readdir),

copy = require('../copy/index.js').copy,
mkdirp = require('../mkdirp/index.js'),
log = require('../log/index.js');


let copyDir = function(source, target){

    source = path.resolve(source);
    target = path.resolve(target);

    mkdirp(target)
    .then(()=>{
        return readdir(source);
    })
    .then((items)=>{
        return Promise.all(items.map((itemName)=>{
            let itemPath = path.join(source, itemName);
            return stat(itemPath)
            .then((stats)=>{
                return {
                    itemPath: itemPath,
                    itemName: itemName,
                    stats: stats
                }
            });
            
        }));
    })
    .then((itemStats)=>{
        let files = itemStats.filter((itemObj)=>{
            return itemObj.stats.isFile();
        });
        return Promise.all(files.map((itemObj)=>{
            return copy(itemObj.itemPath, path.join(target, itemObj.itemName));
        }));
     })
    .catch((e)=>{
        log(e.message, 'error');
    });

};

exports.copyDir = copyDir;