let fs = require('fs'),
path = require('path'),
promisify = require('util').promisify,
readFile = promisify(fs.readFile),
writeFile = promisify(fs.writeFile),
stat = promisify(fs.stat),
readdir = promisify(fs.readdir),
log = require('../log/index.js');


let copyDir = function(source, target){

    source = path.resolve(source);
    target = path.resolve(target);

    readdir(source)
    .then((items)=>{
        return Promise.all(items.map((item)=>{
            return stat(path.join(source, item))
            .then((stats)=>{
                return {
                    item: item,
                    stats: stats
                }
            });
            
        }));
    })
    .then((itemStats)=>{
        log(itemStats[0].item);
        log(itemStats[0].stats.isFile());
     })
    .catch((e)=>{
        log(e.message, 'error');
    });

};

exports.copyDir = copyDir;