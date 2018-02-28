const {promisify} = require('util');
const fsextra = require('fs-extra');
const path = require('path');
const ejs = require('ejs');
const sass = require('node-sass');
const frontMatter = require('front-matter');
const marked = require('marked');
const chokidar = require('chokidar');
const ejsRenderFile = promisify(ejs.renderFile);
const promisifiedGlob = promisify(require('glob'));

const srcPath = `${process.cwd()}/src`;

/*
Utility functions
*/
const ignoreSassDir = function(path){
    return path.indexOf('sass') === -1
}


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
const buildSass = function(){
    fsextra.ensureFile(`${srcPath}/assets/css/main.css`)
    .then(function(){
        fsextra.removeSync(`${srcPath}/assets/css/main.css`)
    })
    .catch(function(error){
        return console.error(error);
    })
    promisifiedGlob('**/*.@(scss|sass)', {ignore: [`partials/*.scss`], cwd: `${srcPath}/assets/sass`})
    .then(function(files){
        files.forEach(function(file){
            const fileData = path.parse(file)
            sass.render({
                file: `${srcPath}/assets/sass/${file}`,
                },
                function(error, result){
                    if(!error){
                        fsextra.writeFile(`${srcPath}/assets/css/main.css`, result.css, {flag: 'a'})
                        .then(function(){
                            console.log(`Processing ${file}`);
                        })
                        .catch(function(error){
                            console.error(error);
                        })
                    }
                }
            )
        })
    })
    .catch(function(error){
        console.error(error)
    })
}
const buildSite = function(){
    const projectConfig = require(`${srcPath}/config/project.config`);
    const config = require(`${srcPath}/config/site.config`);
    const distPath = projectConfig.buildPath || './public';
    console.log(`Emptying ${distPath}`);
    fsextra.emptyDirSync(distPath);
    console.log(`Emptied ${distPath}`);
    console.log(`Copying ${srcPath}/assets to ${distPath}/assets`)
    fsextra.copy(`${srcPath}/assets`, `${distPath}/assets`, {filter: ignoreSassDir})
    .then(function(){
        console.log(`Copied ${srcPath}/assets to ${distPath}/assets`);
        return render(distPath, config)
    })
    .catch(function(error){
        console.log(`Error copying ${srcPath}/assets to ${distPath}/assets. The error was ${error.message}. Aborting build.`)
    })    
}

const build = function(){
    const projectConfig = require(`${srcPath}/config/project.config`);
    if(projectConfig.sass){
        buildSass();
    }
    return buildSite();
}
const buildW = function(){
    const buildWatcher = chokidar.watch(srcPath);
buildWatcher
.on('add', function(path){
    console.log('added', path)
    
})
.on('change', function(path){
    console.log('changed', path)
    return build();
})
}


module.exports = {buildSite, buildSass, build, buildW};