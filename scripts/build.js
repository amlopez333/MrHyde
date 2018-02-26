const {promisify} = require('util');
const fsextra = require('fs-extra');
const path = require('path');
const ejs = require('ejs');
const frontMatter = require('front-matter');
const marked = require('marked');
const ejsRenderFile = promisify(ejs.renderFile);
const promisifiedGlob = promisify(require('glob'));

const srcPath = './src';


const render = function(distPath, config){
    promisifiedGlob('**/*.@(ejs|md|html)', {cwd: `${srcPath}/pages`})
    .then(function(files){
        files.forEach(function(file){
            const fileData = path.parse(file);
            const destPath = path.join(distPath, fileData.dir);
            fsextra.mkdirs(destPath)
            .then(function(){
                return fsextra.readFile(`${srcPath}/pages/${file}`, 'utf-8');
            })
            .then(function(data){
                //considerar casos de archihvo y eso. 
                const pageData = frontMatter(data);
                const templateConfig = Object.assign({}, config, {page: pageData.attributes});
                console.log(`Rendering ${fileData.dir}/${fileData.name}${fileData.ext}`);
                let content;
                switch(fileData.ext){
                    case '.md':
                        content = marked(pageData.body);
                        break;
                    case '.ejs':
                        content = ejs.render(pageData.body, templateConfig);
                        break;
                    default:
                        content = pageData.body;
                }
                const layout = pageData.attributes.layout || 'default';
                console.log(`Applying ${layout} to rendered ${fileData.dir}/${fileData.name}${fileData.ext}`)
                return ejsRenderFile(`${srcPath}/layouts/${layout}.ejs`, Object.assign({}, templateConfig, { body: content }));
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

const buildSite = function(){
    const projectConfig = require('../src/config/project.config');
    const config = require('../src/config/site.config');
    const distPath = projectConfig.build.path || './public';
    console.log(`Emptying ${distPath}`);
    fsextra.emptyDirSync(distPath);
    console.log(`Emptied ${distPath}`);
//check for sass and less
    console.log(`Copying ${srcPath}/assets to ${distPath}/assets`)
    fsextra.copy(`${srcPath}/assets`, `${distPath}/assets`)
    .then(function(){
        console.log(`Copied ${srcPath}/assets to ${distPath}/assets`);
        return render(distPath, config)
    })
    .catch(function(error){
        console.log(`Error copying ${srcPath}/assets to ${distPath}/assets. The error was ${error.message}. Aborting build.`)
    })
    
    
}


module.exports = {buildSite}