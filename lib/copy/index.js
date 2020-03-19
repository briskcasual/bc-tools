let fs = require('fs'),
promisify = require('util').promisify,
readFile = promisify(fs.readFile),
writeFile = promisify(fs.writeFile),
log = function(data){
	process.stdout.write(data + '\n');
};

// just a simple copy file
let copy = function(source, target){
	return readFile(source)
	.then((data)=>{
		return writeFile(target, data);
	})
	.catch((e)=>{
		log(e.message);
	});
};

// export
exports.copy = copy;
//expoirts.copyDir = copyDir;