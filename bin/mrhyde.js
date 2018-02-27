#!/usr/bin/env node
const program = require('commander');
const {prompt} = require('inquirer');
const siteConfig = require('./siteConfigQuestions');
const projectConfig = require('./projectConfigQuestions');
const {createProject, makeProjectConfig, makeSiteConfig} = require('../scripts/create');
const {buildSite, buildSass, build} = require('../scripts/build');

program
.description('A static site builder like Jekyll')
.version('0.1.0');

program
.command('create')
.alias('c')
.description('Create a new project')
.action(function(){
    createProject()
});
program
.command('buildsite')
.alias('bs')
.description('Process all templates and partials to create site pages.')
.action(function(){
    buildSite()
});
program
.command('buildsass')
.alias('bsass')
.description('If project is using sass, it generates the corresponding css.')
.action(function(){
    buildSass();
})
program
.command('build')
.alias('b')
.description('Builds entire project')
.action(function(){
    build();
})
program
.command('pconf')
.alias('pcf')
.description('If non-existant, creates project.config file. This file is used in order to determine how to build the project.')
.action(function(){
    prompt(projectConfig)
    .then(function(answers){
        makeProjectConfig(answers, 'project');
    })
    .catch(function(error){
        console.log(error)
    });
});
program
.command('sconf')
.alias('scf')
.description('If non-existant, creates site.config file. This file will contain all the information used to build the templates.')
.action(function(){
    prompt(siteConfig)
    .then(function(answers){
        makeSiteConfig(answers, 'site');
    })
    .catch(function(error){
        console.log(error)
    });
});




program.parse(process.argv);