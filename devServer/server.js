const serve = require('serve');
const server = function(path){
    serve(path || './public', {
    port: 1338,
    ignore: ['node_modules']
  })
}
module.exports = {server};