let getRoot = require('./index.js').getRoot,
path = require('path'),
log = require('../log/index.js');

getRoot(path.join(__dirname,'site-demo'))
.then((dir)=>{
    log(dir, 'success');
})
.catch((e)=>{
    log(e, 'error');
});