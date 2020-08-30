
const execa = require('execa');
const { getTargetPath, fuzzyMatchTarget } = require('./utils')

const args = require('minimist')(process.argv.slice(2))
console.log('rootPath-------', args)

const rootPath = getTargetPath(args, '', 'templates');


execa('npm', ['run', 'dev'],
  {
    cwd: rootPath,
    stdio: 'inherit'
  }
).then(result => {
})

