const {promisify} = require('util');
const fsextra = require('fs-extra');
const path = require('path');
const ejsRenderFile = promisify(require('ejs').renderFile);
const promisifiedGlob = promisify(require('glob'));

const srcPath = './src';
const distPath = './public';



const buildSite = function(){
    const projectConfig = require('../src/config/project.config');
    const config = require('../src/config/site.config');
    console.log(`Emptying ${distPath}`)
    fsextra.emptyDirSync(distPath);
    console.log(`Emptied ${distPath}`)
//check for sass and less
    console.log(`Copying ${srcPath}/assets to ${distPath}/assets`)
    fsextra.copy(`${srcPath}/assets`, `${distPath}/assets`);
    console.log(`Copied ${srcPath}/assets to ${distPath}/assets`)
    promisifiedGlob('**/*.@(ejs|md|html)', {cwd: `${srcPath}/pages`})
    .then(function(files){
        files.forEach(function(file){
            const fileData = path.parse(file);
            const destPath = path.join(distPath, fileData.dir);
            fsextra.mkdirs(destPath)
            .then(function(){
                console.log(`Rendering ${fileData.dir}/${fileData.name}${fileData.ext}`)
                return ejsRenderFile(`${srcPath}/pages/${file}`, Object.assign({}, config));
            })
            .then(function(renderedPage){
                console.log(`Applying layout to rendered ${fileData.dir}/${fileData.name}`)
                return ejsRenderFile(`${srcPath}/layouts/layout.ejs`, Object.assign({}, config, { body: renderedPage}));
            })
            .then(function(renderedLayout){
                console.log(`Saving ${fileData.dir}/${fileData.name}.html`)
                return fsextra.writeFile(`${destPath}/${fileData.name}.html`, renderedLayout);
            })
            .catch(function(error){
                console.log(error);
            })
        })
    })
    .catch(function(error){
        console.log(error);
    })
}


module.exports = {buildSite}