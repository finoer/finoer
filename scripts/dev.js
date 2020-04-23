const execa = require('execa');
const { fuzzyMatchTarget } = require('./utils')

const args = require('minimist')(process.argv.slice(2))
const target = args._.length ? fuzzyMatchTarget(args._)[0] : 'finoer-core'
const sourceMap = args.sourcemap || args.s

execa(
    'rollup', 
    [
        '-c',
        '-w',
        '--environment',
        `TARGET:${target}`,
    ],
    {
        stdio: 'inherit'
    }
).then(result => {
    console.log(result.stdout)
})

