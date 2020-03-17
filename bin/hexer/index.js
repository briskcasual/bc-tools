#!/usr/bin/env node

const fs = require('fs'),
	  path = require('path'),
	  promsify = require('util').promisify,
	  readFile = promsify(fs.readFile),
	  writeFile = promsify(fs.writeFile),
	  EOL = '\n';

const targetDir = process.argv[3] === undefined ? process.cwd(): path.resolve(process.argv[3]);

if(!process.argv[2]){
	console.log('no file given');
	console.log('use example: $ bc-hexer foo.md hex');
}else{

	let filePath = path.resolve(process.argv[2]),
		extName = path.extname(filePath),
		fileName = path.basename(filePath, extName);

	readFile(filePath, 'utf8')
	.then((data)=>{
		let mode = extName === '.hexer' ? 'unhex' : 'hex',
		lines = data.split(/\r\n|\n/),
		text = lines.map(function(line){
			if(mode === 'hex'){
				return Buffer.from(line, 'utf8').toString('hex') + EOL;
			}
			return Buffer.from(line, 'hex').toString('utf8') + EOL;
		}).join('');
		let ext = mode === 'unhex' ? '' : extName + '.hexer';
		return writeFile(path.join(targetDir, fileName + ext), text );
	})
	.then(()=>{
	    console.log('done');
	})
	.catch((e)=>{
		console.log(e.message);
	});
}
