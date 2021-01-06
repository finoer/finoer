
//引入shelljs
const shell = require('shelljs')
const { getTargetPath, fuzzyMatchTarget } = require('./utils')

const args = require('minimist')(process.argv.slice(2))
const mode = args._.length ? args._[0] : 'package'
const target = args._.length ? fuzzyMatchTarget(args._)[0] : 'finoer-core'

const rootPath = getTargetPath(args, '');
const configFile = getTargetPath(args, 'rollup.config.js');

// return
if(mode === 'package') {
  shell.exec(`concurrently \"lerna run start\" \"node scripts/dev.js ${target}\"`, {  })
}else {
  // shell.exec(`concurrently \"tsc -b -w --force\" \"node scripts/template.js ${target}\"`)
  shell.exec(`concurrently \"npm run dev finoer-invoke\" \"node scripts/template.js ${target}\"`)

}
