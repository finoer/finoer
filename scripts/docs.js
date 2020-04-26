
const execa = require('execa');
const { getTargetPath } = require('./utils')

const args = require('minimist')(process.argv.slice(2))
const docsFile = getTargetPath(args, 'docs');
const docsGet = getTargetPath(args, 'src');
const rootPath = getTargetPath(args, '');

execa(
    'typedoc', 
    [
        `--out`,
        `${docsFile}`,
        `${docsGet}`
    ],
    {
        cwd: rootPath,
        stdio: 'inherit'
    }
).then(result => {
    console.log(result.stdout)
})

