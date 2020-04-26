
const execa = require('execa');
const { getTargetPath } = require('./utils')

const args = require('minimist')(process.argv.slice(2))

const rootPath = getTargetPath(args, '');
const configFile = getTargetPath(args, 'rollup.config.js');

execa(
    'rollup', 
    [
        `-c${configFile}`,
    ],
    {
        cwd: rootPath,
        stdio: 'inherit'
    }
).then(res => {
  console.log(res.stdio)
})


