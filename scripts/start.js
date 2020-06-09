
const execa = require('execa');
const { getTargetPath, fuzzyMatchTarget } = require('./utils')

const args = require('minimist')(process.argv.slice(2))

console.log('args', args)

const rootPath = getTargetPath(args, '', 'templates');

console.log('rootpath', rootPath)

execa(
    'npm',
    [
        `run`,
        'dev'
    ],
    {
        cwd: rootPath,
        stdio: 'inherit'
    }
).then(result => {
    console.log(result.stdout)
})

