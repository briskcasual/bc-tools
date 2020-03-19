#!/usr/bin/env node

let copyDir = require('../../lib/copydir/index.js').copyDir,
path = require('path'),
log = require('../../lib/log/index.js');


let source = path.join(__dirname, 'site-start'),
target = path.resolve(process.argv[2] || path.join(process.cwd(), 'site-demo'));
copyDir(source, target)
.then(()=>{
    log('done', 'success');
});