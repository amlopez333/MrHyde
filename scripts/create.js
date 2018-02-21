const fsextra = require('fs-extra');
const path = require('path');

const srcDir = 'src';
const assetsDir  = 'src/assets';
const partialsDir  = 'src/partials';
const pagesDir  = 'src/pages';
const dataDir  = 'src/data';
const layoutsDir = 'src/layouts';
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
        makeChildDir(publicDir);
    })
    .catch(function(error){
        console.log(`Error creating directory ${directory}. The error was: ${error.message}`)
    })
}
module.exports = {createProject};