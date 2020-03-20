let fs = require('fs'),
path = require('path'),
promisify = require('util').promisify,
readFile = promisify(fs.readFile),
writeFile = promisify(fs.writeFile),
log = require('../log/index.js')({modName: 'copy' });

// just a simple copy file
let copy = function(source, target){
	source = path.resolve(source);
	target = path.resolve(target);
	return readFile(source)
	.then((data)=>{
		return writeFile(target, data);
	})
	.then(()=>{
		log('Copy: ' + source + ' > ' + target, 'info');
	})
	.catch((e)=>{
		log(e.message, 'error');
	});
};

exports.copy = copy;