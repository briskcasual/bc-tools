let fs = require('fs'),
promisify = require('util').promisify,
readFile = promisify(fs.readFile),
writeFile = promisify(fs.writeFile),
log = function(data){
	process.stdout.write(data + '\n');
};

let copy = function(source, target){

	readFile(source)
	.then((data)=>{
		return writeFile(target);
	})
	.catch((e)=>{
		log(e.message);
	});
};

// export
exports.copy = Copy;
//expoirts.copyDir = copyDir;