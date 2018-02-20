const {promisify} = require('util');
const fsextra = require('fs-extra');
const path = require('path');
const ejsRenderFile = promisify(require('ejs').renderFile);
const promisifiedGlob = promisify(require('glob'));
const config = require('../config/site.config');
const srcPath = './src';
const distPath = './public';

fsextra.emptyDirSync('distPath');
//check for sass and less
fsextra.copy(`${srcPath}/assets`, `${dirPath}/assets`);

promisifiedGlob('**/*.(ejs|md|html)', {cwd: `${srcPath}/pages`})
.then(function(files){
    files.forEach(function(file){
        const fileData = path.parse(file);
        const destPath = path.join(distPath, fileData.dir);
        fsextra.mkdirs(destPath)
        .then(function(){
            return ejsRenderFile(`${srcPath}/pages/${file}`, config);
        })
        .then(function(renderedPage){
            return ejsRenderFile(`${srcPath}/layout.ejs`, Object.assign({}, {config, body: renderedPage}));
        })
        .then(function(renderedLayout){
            return fsextra.writeFile(`${distPath}/${fileData.name}.html`, renderedLayout);
        })
        .catch(function(error){
            console.log(error);
        })
    })
    .catch(function(error){
            console.log(error);
    })
})
