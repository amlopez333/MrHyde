const serve = require('serve');
const server = function(path){
    serve(path || './public', {
    port: 1337,
    ignore: ['node_modules']
  })
}