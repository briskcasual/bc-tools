let copyDir = require('./index.js').copyDir,
log = require('../log/index.js');

copyDir('./sourceFolder', './targetFolder')
.then(()=>{
    log('looks good!', 'success');
});