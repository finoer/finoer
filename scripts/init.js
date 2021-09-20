
const execa = require('execa');
const shell = require('shelljs')
const { getTargetPath, fuzzyMatchTarget } = require('./utils')

const args = require('minimist')(process.argv.slice(2))
const target = args._.length ? fuzzyMatchTarget(args._)[0] : 'finoer-core'
const rootPath = getTargetPath(args, '');

// execa(
//     'cnpm install', [ "" ],
//     {
//         cwd: rootPath,
//         stdio: 'inherit'
//     }
// ).then(result => {
//     console.log(result.stdout)
// })

shell.cd('./templates/fino-base')

const child = shell.exec('cnpm install', { silent: false }, (code, stdout, stderr) => {
  console.log('Exit code:', code);
  console.log('Program output:', stdout);
  console.log('Program stderr:', stderr);
})

child.stdout.on('data', function(data) {
  // /* ... do something with data ... */
  console.log('Program output:', data);

});

