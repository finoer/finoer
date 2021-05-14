const fs = require('fs')
const chalk = require('chalk')

const path = require('path');
const args = require('minimist')(process.argv.slice(2))

// get all packages
let targets = (exports.targets = fs.readdirSync('packages').filter(f => {
  return getChildProject(f, 'packages')
}))

// get all templates
let templates = (exports.targets = fs.readdirSync('templates').filter(f => {
  return getChildProject(f, 'templates')
}))

targets = targets.concat(templates);

function getChildProject(flodar, name) {
  if (!fs.statSync(`${name}/${flodar}`).isDirectory()) {
    return false
  }
  let pkg
  try {
    pkg = require(`../${name}/${flodar}/package.json`)
  } catch {
    return false
  } finally {
    if (pkg && pkg.private && !pkg.buildOptions) {
      return false
    }
    return true
  }

}

function fuzzyMatchTarget(partialTargets, includeAllMatching) {
  const matched = []
  partialTargets.forEach(partialTarget => {
    for (const target of targets) {

      if (target.match(partialTarget)) {
        matched.push(target)
      }
    }
  })

  console.log('partialTargets', partialTargets, targets)

  if (matched.length) {
    return matched
  } else {
    console.log()
    console.error(
      `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
        `Target ${chalk.underline(partialTargets)} not found!`
      )}`
    )
    console.log()
    process.exit(1)
  }
}

function getTargetPath(args, fileName, fileType) {

  console.log('getTargetPath------', args, fileName)

  const target = args._.length ? fuzzyMatchTarget(args._)[0] : 'finoer-core'
  const fileParentFlodar = fileType || 'packages'

  // 定位包所在的目录
  const packagesDir = path.resolve(__dirname, `../${fileParentFlodar}`);

  const packageDir = path.resolve(packagesDir, target)
  const resolve = p => path.resolve(packageDir, p);

  const configFile = resolve(fileName);

  return configFile
}

module.exports = {
  getTargetPath,
  fuzzyMatchTarget
}
