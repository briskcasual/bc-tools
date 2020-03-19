#!/usr/bin/env node

let copyDir = require('../../lib/copydir/index.js').copyDir,
log = require('../../lib/log/index.js');

copyDir('./site-start', './site-demo')
.then(()=>{

});