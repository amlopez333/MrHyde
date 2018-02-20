#!/usr/bin/env node
const program = require('commander');
const {createProject} = require('../scripts/create');

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

program.parse(process.argv);