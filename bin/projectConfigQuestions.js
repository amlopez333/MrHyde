const projectConfigQuestions = [
    {
        type: 'confirm',
        name: 'sass',
        message: 'Do you want to use SASS?',
        default: false
    },
    {
        type: 'input',
        name: 'buildPath',
        message: 'What is the name of the output path? Default is',
        default: 'public'
    },
];

module.exports = projectConfigQuestions