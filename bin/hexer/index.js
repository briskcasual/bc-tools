const fs = require('fs'),
	  path = require('path'),
	  promsify = require('util').promisify,
	  readFile = promsify(fs.readFile),
	  writeFile = promsify(fs.writeFile);

// let mode = process.argv[3] === undefined ? 'hex' : 'unhex';

if(!process.argv[2]){
	console.log('no file given');
	console.log('use example: $ bc-hexer foo.md hex');
}else{
	
	let filePath = path.resolve(process.argv[2]),
		extname = path.extname(filePath),
		fileName = path.basename(filePath, extname);
	
	readFile(filePath, 'utf8')
	
	.then((data)=>{
		
		let mode = extname === '.hexer' ? 'unhex' : 'hex',
		lines = data.split(/\r\n|\n/);
		
		lines.map(function(line){
		
			console.log(line);
			
		});
	});

}