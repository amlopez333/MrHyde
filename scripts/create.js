const fsextra = require('fs-extra');
const path = require('path');

const srcDir = 'src';
const assetsDir  = 'src/assets';
const partialsDir  = 'src/partials';
const pagesDir  = 'src/pages';
const dataDir  = 'src/data';
const layoutsDir = 'src/layouts';
const configDir = 'src/config';
const publicDir = 'public';
const cssDir = 'src/assets/css';
const sass = 'src/assets/sass';
const less = 'src/assets/less';

const makeChildDir = function(directory){
    fsextra.mkdirs(directory)
    .then(function(){
        console.log(`Created directory ${directory}.`);
    })
    .catch(function(error){
        console.log(`Error creating directory ${directory}. The error was: ${error.message}`)
    })
}
const createProject = function(){
    fsextra.mkdirs(srcDir)
    .then(function(){
        makeChildDir(assetsDir);
        makeChildDir(partialsDir);
        makeChildDir(pagesDir);
        makeChildDir(dataDir);
        makeChildDir(layoutsDir);
        makeChildDir(configDir);
        makeChildDir(publicDir);
    })
    .catch(function(error){
        console.log(`Error creating directory ${directory}. The error was: ${error.message}`)
    })
}
const makeProjectConfig = function(configObject, filename){
    Object.keys(configObject).forEach(function(key){
        if(configObject[key] === 'n'){
            return configObject[key] = false;
        }
        configObject[key] = true;
    })
    const configString = 
    `project = {${Object.keys(configObject).map(function(key){
            return `
            ${key}: ${configObject[key]}`
        })}
}
module.exports = project
    `
    console.log(configString);
    fsextra.ensureFile(`${configDir}/${filename}.config.js`)
    .then(function(){
        saveConfigFile(configString, filename)
    })
    .catch(function(error){
        console.log(`Failed to create project.config file. The error was: ${error.message}`)
    })
}
const makeSiteConfig = function(configObject, filename){
    const configString = 
    `module.exports = {
        site: {${Object.keys(configObject).map(function(key){
            return `
            ${key}: "${configObject[key]}"`
    })}
    }
}
`
    fsextra.ensureFile(`${configDir}/${filename}.config.js`)
    .then(function(){
        saveConfigFile(configString, filename)
    })
    .catch(function(error){
        console.log(`Failed to create project.config file. The error was: ${error.message}`)
    })
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
module.exports = {createProject, makeProjectConfig, makeSiteConfig};