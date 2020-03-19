let colors = {
	normal: '\u001b[37m',
	info: '\u001b[36m',
	success: '\u001b[32m',
	error: '\u001b[31m',
	reset: '\u001b[0m'
};
module.exports = function(data, type){
	type = type === undefined ? 'normal' : type;
	process.stdout.write(colors[type]);
	process.stdout.write(data + '\n');
	process.stdout.write(colors.reset);
};
