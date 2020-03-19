let fs = require('fs'),
promisify = require('util').promisify,
readFile = promisify(fs.readFile),
writeFile = promisify(fs.writeFile),
log = require('../log/index.js');

// just a simple copy file
let copy = function(source, target){
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

// export
exports.copy = copy;
//expoirts.copyDir = copyDir;