const fsextra = require('fs-extra');
const path = require('path');

const srcDir = 'src';
const assetsDir  = 'src/assets';
const partialsDir  = 'src/partials';
const pagesDir  = 'src/pages';
const dataDir  = 'src/data';
const layoutsDir = 'src/layouts';
const configDir = 'src/config';
const cssDir = 'src/assets/css';
const sassDir = 'src/assets/sass';


const makeChildDir = function(directory){
    fsextra.mkdirs(directory)
    .then(function(){
        console.log(`Created directory ${directory}.`);
    })
    .catch(function(error){
        console.log(`Error creating directory ${directory}. The error was: ${error.message}`)
    })
}
const createProject = function(projectConfig){
    fsextra.mkdirs(srcDir)
    .then(function(){
        makeChildDir(assetsDir);
        makeChildDir(partialsDir);
        makeChildDir(pagesDir);
        makeChildDir(dataDir);
        makeChildDir(layoutsDir);
        makeChildDir(configDir);
        makeChildDir(projectConfig.buildPath);
        makeChildDir(cssDir);
        if(projectConfig.sass){
            makeChildDir(sassDir);
        }
    })
    .catch(function(error){
        console.log(`Error creating directory ${directory}. The error was: ${error.message}`)
    })
}

const makeProjectConfig = function(configObject){
    
    const configString = 
    `project = {${Object.keys(configObject).map(function(key){
            return `
            ${key}: ${typeof(configObject[key]) === 'string' ? `"${configObject[key]}"` : configObject[key]}`
        })}
}
module.exports = project
    `
    return configString
}
const makeSiteConfig = function(configObject){
    const configString = 
    `module.exports = {
        site: {${Object.keys(configObject).map(function(key){
            return `
            ${key}: "${configObject[key]}"`
    })}
    }
}
`
    return configString
    
}
const saveConfigFile = function(configString, filename){
    fsextra.outputFile(`${configDir}/${filename}.config.js`, configString)
    .then(function(){
        console.log(`Created ${filename}.config. You can find the config files at ${configDir}.`)
    })
    .catch(function(error){
        console.log(`Failed to create project.config file. The error was: ${error.message}`)
    })
}
const create = function(siteConfig, projectConfig){
    createProject(projectConfig);
    const projectConfigString = makeProjectConfig(projectConfig);
    const siteConfigString = makeSiteConfig(siteConfig);
    fsextra.ensureFile(`${configDir}/site.config.js`)
    .then(function(){
        saveConfigFile(siteConfigString, 'site')
    })
    .catch(function(error){
        console.log(`Failed to create siste.config file. The error was: ${error.message}`)
    })
    fsextra.ensureFile(`${configDir}/project.config.js`)
    .then(function(){
        saveConfigFile(projectConfigString, 'project')
    })
    .catch(function(error){
        console.log(`Failed to create project.config file. The error was: ${error.message}`)
    })
}


module.exports = {create};
