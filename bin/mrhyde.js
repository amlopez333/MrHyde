#!/usr/bin/env node
const program = require('commander');
const {prompt} = require('inquirer');
const siteConfig = require('./siteConfigQuestions');
const projectConfig = require('./projectConfigQuestions');
const {create} = require('../scripts/create');
const {buildSite, buildSass, build, buildW} = require('../scripts/build');

program
.description('A static site builder like Jekyll')
.version('0.1.0');


program
.command('buildsite')
.alias('bs')
.description('Process all templates and partials to create site pages.')
.option('-w, --watch', 'Watches src/* for changes.')
.action(function(cmd){
    if(cmd.watch){
        buildW();
    }
    return buildSite()
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
.command('init')
.alias('i')
.description('Creates a new MrHyde Project from scratch')
.action(function(){
    console.log('To start, we are going to ask you some questions about your site.')
    prompt(siteConfig)
    .then(function(siteAnswers){
        console.log('Now we are going to ask you questions about the project setup and architecture.')
        prompt(projectConfig)
        .then(function(projectAnswers){
            create(siteAnswers, projectAnswers);
        })
        .catch(function(error){
            console.error(error);
        })
    })
    .catch(function(error){
        console.log(error)
    });
});
program
.command('buildwatch')
.alias('bw')
.description('builds entire project and watches for changes')
.action(function(){
    buildW();
})



program.parse(process.argv);