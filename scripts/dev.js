
const execa = require('execa');
const { getTargetPath, fuzzyMatchTarget } = require('./utils')

const args = require('minimist')(process.argv.slice(2))
const target = args._.length ? fuzzyMatchTarget(args._)[0] : 'finoer-core'

const rootPath = getTargetPath(args, '');
const configFile = getTargetPath(args, 'rollup.config.js');

execa(
    'rollup',
    [
        `-c${configFile}`,
        '-w',
        `--environment`,
        `TARGET:${target}`
    ],
    {
        cwd: rootPath,
        stdio: 'inherit'
    }
).then(result => {
    console.log(result.stdout)
})

