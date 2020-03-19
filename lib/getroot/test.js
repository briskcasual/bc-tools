let getRoot = require('./index.js').getRoot,
log = require('../log/index.js');

getRoot(process.cwd())
.then((dir)=>{
    log(dir, 'success');
})
.catch((e)=>{
    log(e, 'error');
});